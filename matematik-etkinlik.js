/* Matematik etkinlik motoru — açıklamalı soru kartları (kitabın etkinlik akışı).
   Her kartta soru, ipucu ve ZORUNLU açıklama alanı vardır. Değerlendirme iki aşamalıdır:
   yerel ölçüt kontrolü ve Groq ile yapay zekâ değerlendirmesi. Model cevap hiçbir koşulda
   gösterilmez; geri bildirim yalnızca yol gösterir. Görünüm Türkçe/Fen/Sosyal etkinlik
   kartlarıyla aynıdır (.activity-card). */
(() => {
  'use strict';

  const SOURCE = window.MATEMATIK_ETKINLIKLER;
  if (!SOURCE) return;

  const STORAGE_KEY = 'emr7lect.matematik.acik.v2';
  const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
  const DEFAULT_MODEL = 'openai/gpt-oss-20b';

  const SYSTEM_PROMPT = [
    'Sen 7. sınıf matematik öğretmenisin. Öğrenci, ders kitabındaki bir etkinlik sorusuna yazılı cevap verdi.',
    'Görevin yalnızca öğrencinin cevabını ve gerekçesini ölçütlerle karşılaştırmak.',
    'Doğru cevabı, doğru sayısal sonucu, çözümü veya cevap anahtarını ASLA yazma; sonucun ne olduğunu söyleme.',
    'Yanlış cevapta yalnızca “sonucu yeniden düşün” düzeyinde yol göster; doğrusunu söyleme.',
    'Açıklama ölçüsü soruya göre değişir: karar sorularında (eşit mi, hangisi büyük, katılıyor musun) kısa karar + tek cümlelik gerekçe yeterlidir; hesap, örnek, tanım ya da karşılaştırma gerekçe sayılır.',
    'Öğrenciden ASLA adlandırılmış bir kural, kuralın kanıtı ya da ekstra “neden bu kural geçerli” açıklaması isteme. Kalıp cümle kullanma; “hangi kuralı kullandığını ve neden geçerli olduğunu ekle” gibi hazır ifadeler yasak.',
    'Bir gerekçe yeterliyse correct ver; daha fazlasını isteme. Eksik varsa yalnızca gerçekten eksik olan tek şeyi, öğrencinin kendi ifadesine bağlayarak iste.',
    'Geri bildirim öğrencinin yazdığına gönderme yapsın (kendi sözcükleri ya da sayısıyla); her cevaba uyan genel tavsiye yazma.',
    'Yanıtın Türkçe, kısa (en çok 320 karakter) ve tek paragraf olsun.',
    'Yalnızca şu JSON biçimini döndür: {"state":"correct|partial|wrong","feedback":"...","missing":["eksik ölçüt"]}',
    'state: cevap ve gerekçe birlikte yeterliyse correct, kısmen doğruysa partial, yanlışsa wrong.',
    'missing alanına en çok iki eksik ölçüt yaz; eksik yoksa boş dizi bırak.',
  ].join('\n');

  const store = {
    data: load(),
    save() {
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data)); } catch (error) { /* kota */ }
    },
  };

  function load() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && typeof parsed === 'object') return parsed;
    } catch (error) { /* bozuk kayıt */ }
    return {};
  }

  const escapeHTML = (value) => String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const MATH = window.MATEMATIK_MATH || null;
  const FIGURE = window.MATEMATIK_FIGURE || null;

  const typeset = (segment) => {
    if (MATH && typeof MATH.render === 'function') {
      try { return MATH.render(segment); } catch (error) { /* düz metin */ }
    }
    return escapeHTML(segment);
  };

  function rich(value) {
    const text = value == null ? '' : String(value);
    return text.split(/(\*\*[^*]+\*\*)/g).map((segment) => (
      segment.length > 4 && segment.startsWith('**') && segment.endsWith('**')
        ? `<strong>${typeset(segment.slice(2, -2))}</strong>`
        : typeset(segment)
    )).join('');
  }

  function entryFor(id) {
    if (!store.data[id] || typeof store.data[id] !== 'object') {
      store.data[id] = { text: '', state: '', feedback: '', checkedAt: '' };
    }
    return store.data[id];
  }

  /* ---------------- Değerlendirme ---------------- */

  const STOP = new Set(['bir', 've', 'ile', 'için', 'olan', 'olarak', 'daha', 'gibi', 'bu', 'da', 'de', 'ki', 'mi', 'çok', 'az', 'her', 'sonra', 'göre', 'kadar', 'ise', 'ama', 'yani', 'elde', 'olur', 'bulunur']);

  function numbersIn(text) {
    return (String(text).match(/-?\d+(?:[.,]\d+)?/g) || []).map((value) => value.replace(',', '.'));
  }

  function keywordOverlap(criterion, text) {
    const lower = String(text).toLocaleLowerCase('tr');
    const words = String(criterion).toLocaleLowerCase('tr')
      .replace(/[^\p{L}\s]/gu, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 3 && !STOP.has(word));
    return words.filter((word) => lower.includes(word.slice(0, Math.max(4, word.length - 2)))).length;
  }

  /* Yerel yedek mesajlar: soru türüne göre, kural ezberi istemeyen tek cümlelik yönlendirme. */
  const REASON_FEEDBACK = {
    karar: 'Kararını yazdın. Şimdi neden böyle olduğunu bir örnek, hesap ya da tanımla tek cümlede göster.',
    gerekce: 'Görüşünü yazdın. Nedenini bir örnek ya da hesapla tek cümlede destekle.',
    islem: 'Sonucu yazdın. Hangi adımlarla bulduğunu tek cümlede ekle.',
    sonuc: 'Sonucu yazdın. Onu nasıl bulduğunu tek cümleyle ekle.',
  };

  /* Yerel kontrol: uzunluk + model cevaptaki sayıların ve kavramların varlığı. */
  function localVerdict(activity, entry) {
    const text = String(entry.text || '').trim();
    if (text.length < activity.minChars) {
      return {
        state: 'partial',
        feedback: `Açıklaman ${text.length} karakter; en az ${activity.minChars} karakter gerekiyor. Sonucu ve kısa gerekçeni aynı paragrafta yaz.`,
      };
    }
    const expected = numbersIn(activity.thinking);
    const given = numbersIn(text);
    const numberHit = expected.length === 0
      ? true
      : expected.some((value) => given.includes(value));
    const keywordHit = keywordOverlap(activity.thinking, text);
    if (numberHit && (keywordHit >= 1 || expected.length === 0)) {
      return {
        state: 'correct',
        feedback: 'Açıklaman sonucu ve gerekçeyi birlikte içeriyor. Aynı soruyu farklı sayılarla kendin kurup bir kez daha çöz.',
      };
    }
    if (!numberHit) {
      return {
        state: 'partial',
        feedback: 'Gerekçen var ama sonuç eksik ya da farklı. İşlemi bir kez daha yapıp sonucu sayıyla yaz.',
      };
    }
    return {
      state: 'partial',
      feedback: REASON_FEEDBACK[activity.reason] || REASON_FEEDBACK.sonuc,
    };
  }

  async function askAI(activity, entry) {
    const apiKey = document.getElementById('apiKey')?.value?.trim?.() || '';
    if (!apiKey) throw Object.assign(new Error('missing-key'), { code: 'missing-key' });
    const model = document.getElementById('model')?.value || DEFAULT_MODEL;
    const userPrompt = [
      `Bölüm: ${activity.section}`,
      `Soru: ${activity.prompt}`,
      `Bu soruda beklenen açıklama: ${activity.reasonHint || 'Kısa bir gerekçe yeterli.'}`,
      `Öğretmenin model cevabı (öğrenciye gösterme): ${activity.thinking}`,
      `Öğrencinin cevabı: ${entry.text}`,
      `Ölçütler: ${activity.rubric.join('; ')}`,
      'Öğrencinin cevabını model cevapla karşılaştır. Gerekçe ölçüyü karşılıyorsa correct ver; eksik olan tek şeyi söyle.',
      'Yalnızca istenen JSON biçimini döndür.',
    ].join('\n');
    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        temperature: 0.1,
        max_completion_tokens: 320,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        ...(model.startsWith('openai/gpt-oss') ? { reasoning_effort: 'low', reasoning_format: 'hidden' } : {}),
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload?.error?.message || `HTTP ${response.status}`);
    const content = payload.choices?.[0]?.message?.content?.trim();
    if (!content) throw new Error('Değerlendirme boş döndü.');
    const parsed = JSON.parse(content);
    const state = ['correct', 'partial', 'wrong'].includes(parsed.state) ? parsed.state : 'partial';
    let feedback = String(parsed.feedback || '').replace(/[<>]/g, '').slice(0, 360);
    if (/(doğru (cevap|sonuç|seçenek)|cevap anahtar|sonuç \d)/i.test(feedback)) {
      feedback = 'Cevabını ölçütlerle karşılaştırdım. Sonucu ve kısa gerekçeni kendi cümlelerinle bir kez daha yaz.';
    }
    if (Array.isArray(parsed.missing) && parsed.missing.length) {
      feedback += ` Eksik kalan: ${parsed.missing.slice(0, 2).map((item) => String(item).replace(/[<>]/g, '').slice(0, 90)).join('; ')}.`;
    }
    return { state, feedback };
  }

  /* ---------------- Görünüm ---------------- */

  function figureMarkup(activity) {
    if (!FIGURE || !activity.figure) return '';
    const svg = FIGURE.render(activity.figure.type, activity.figure.options || {});
    if (!svg) return '';
    return `<figure class="math-etkinlik-figure">${svg}</figure>`;
  }

  function sceneMarkup(activity) {
    if (!activity.scene) return '';
    const id = escapeHTML(activity.id);
    return `<div class="math-etkinlik-scene">
        <p class="math-etkinlik-scene-title">${escapeHTML(activity.scene.title || 'İnteraktif inceleme')}</p>
        <div class="math-scene-frame is-compact">
          <div class="math-scene-stage" id="mathEtkinlikStage-${id}"></div>
          <div class="math-scene-controls" id="mathEtkinlikControls-${id}"></div>
        </div>
      </div>`;
  }

  function cardMarkup(activity, index, total) {
    const entry = entryFor(activity.id);
    const text = entry.text || '';
    const count = text.trim().length;
    const state = entry.state || '';
    const pill = `<span class="math-etkinlik-pill" data-state="${escapeHTML(state)}"${state ? '' : ' hidden'}>${
      state === 'correct' ? 'Açıklama yeterli' : state === 'partial' ? 'Geliştirilebilir' : state === 'wrong' ? 'Yeniden düşün' : ''
    }</span>`;
    return `<article class="activity-card math-etkinlik-card" data-math-act="${escapeHTML(activity.id)}" data-state="${escapeHTML(state)}">
      <header class="activity-top">
        <div class="activity-heading-row">
          <span class="activity-icon" aria-hidden="true">✎</span>
          <div class="activity-title-copy">
            <p class="activity-kicker">Etkinlik ${index + 1} / ${total}</p>
            <h4 class="activity-title">${escapeHTML(activity.title)}</h4>
          </div>
        </div>
        ${pill}
      </header>
      <article class="question-card">
        <fieldset class="math-etkinlik-question">
          <legend><span class="math-etkinlik-no">${index + 1}</span><span class="math-etkinlik-qtext">${rich(activity.prompt)}</span></legend>
          ${figureMarkup(activity)}
        </fieldset>
        ${sceneMarkup(activity)}
        <div class="math-etkinlik-write">
          <textarea id="mathEtkinlikText-${escapeHTML(activity.id)}" rows="3" maxlength="1200"
            aria-label="Cevabın ve kısa gerekçen"
            data-math-etkinlik-text="${escapeHTML(activity.id)}"
            placeholder="Sonucu ve gerekçeni yaz…">${escapeHTML(text)}</textarea>
          <div class="math-etkinlik-actions">
            <button type="button" class="btn check-button" data-math-etkinlik-check="${escapeHTML(activity.id)}">✦ Kontrol et</button>
            <span class="math-etkinlik-count" data-math-etkinlik-count="${escapeHTML(activity.id)}">${count}/${activity.minChars}</span>
          </div>
          <p class="math-etkinlik-hint" data-math-etkinlik-hint="${escapeHTML(activity.id)}" hidden>İpucu: ${rich(activity.hint)}</p>
          <div class="math-etkinlik-feedback" data-state="${escapeHTML(state)}" aria-live="polite"${entry.feedback ? '' : ' hidden'}>${entry.feedback ? rich(entry.feedback) : ''}</div>
        </div>
      </article>
    </article>`;
  }

  function paint(host, activity, entry) {
    const card = host.querySelector(`[data-math-act="${activity.id}"]`);
    if (!card) return;
    card.dataset.state = entry.state || '';
    const pill = card.querySelector('.math-etkinlik-pill');
    if (pill) {
      const label = entry.state === 'correct' ? 'Açıklama yeterli'
        : entry.state === 'partial' ? 'Geliştirilebilir'
          : entry.state === 'wrong' ? 'Yeniden düşün' : '';
      pill.textContent = label;
      pill.dataset.state = entry.state || '';
      pill.hidden = !label;
    }
    const box = card.querySelector('.math-etkinlik-feedback');
    if (box) {
      box.hidden = !entry.feedback;
      box.dataset.state = entry.state || '';
      box.innerHTML = entry.feedback ? rich(entry.feedback) : '';
    }
  }

  function bind(host, activities) {
    host.querySelectorAll('[data-math-etkinlik-text]').forEach((area) => {
      area.addEventListener('input', () => {
        const id = area.dataset.mathEtkinlikText;
        const entry = entryFor(id);
        entry.text = area.value;
        store.save();
        const activity = activities.find((item) => item.id === id);
        const counter = host.querySelector(`[data-math-etkinlik-count="${id}"]`);
        if (counter && activity) counter.textContent = `${area.value.trim().length}/${activity.minChars}`;
      });
    });

    /* Tek düğme: “Kontrol et” doğrudan yapay zekâ değerlendirmesini çalıştırır.
       Anahtar yoksa ya da ağ kesilirse aynı düğme yerel ölçüt kontrolüne düşer. */
    host.querySelectorAll('[data-math-etkinlik-check]').forEach((button) => {
      button.addEventListener('click', async () => {
        const id = button.dataset.mathEtkinlikCheck;
        const activity = activities.find((item) => item.id === id);
        if (!activity) return;
        const entry = entryFor(id);
        const hint = host.querySelector(`[data-math-etkinlik-hint="${id}"]`);
        if (String(entry.text || '').trim().length < activity.minChars) {
          entry.state = '';
          entry.feedback = `Açıklama zorunlu: en az ${activity.minChars} karakter yazmadan değerlendirme başlamaz.`;
          paint(host, activity, entry);
          return;
        }
        const previous = button.textContent;
        button.disabled = true;
        button.textContent = 'Değerlendiriliyor…';
        try {
          const result = await askAI(activity, entry);
          entry.state = result.state;
          entry.feedback = result.feedback;
        } catch (error) {
          const message = String(error?.message || error);
          if (error?.code === 'missing-key' || /failed to fetch|networkerror|load failed|cors/i.test(message)) {
            const fallback = localVerdict(activity, entry);
            entry.state = fallback.state;
            entry.feedback = error?.code === 'missing-key'
              ? `Yapay zekâ anahtarı girilmediği için cevabın yerel ölçütlerle kontrol edildi. ${fallback.feedback}`
              : `Yapay zekâya ulaşılamadı; cevabın yerel ölçütlerle kontrol edildi. ${fallback.feedback}`;
          } else {
            entry.state = '';
            entry.feedback = `Değerlendirme tamamlanamadı: ${message}`;
          }
        } finally {
          button.disabled = false;
          button.textContent = previous;
        }
        entry.checkedAt = new Date().toISOString();
        if (entry.state && entry.state !== 'correct' && hint) hint.hidden = false;
        store.save();
        paint(host, activity, entry);
      });
    });

    if (window.MATEMATIK_SAHNE2) {
      activities.forEach((activity) => {
        if (!activity.scene) return;
        const stage = host.querySelector(`#mathEtkinlikStage-${activity.id}`);
        const controls = host.querySelector(`#mathEtkinlikControls-${activity.id}`);
        if (stage) window.MATEMATIK_SAHNE2.mount(stage, controls, activity.scene);
      });
    }
  }

  /* host: kartların basılacağı yer; activities: etkinlik listesi */
  function mountQuestions(host, activities, options = {}) {
    if (!host) return;
    const list = Array.isArray(activities) ? activities : [];
    if (!list.length) {
      host.innerHTML = `<p class="math-etkinlik-empty">${escapeHTML(options.empty || 'Bu bölümde yazılı cevap isteyen soru yok.')}</p>`;
      return;
    }
    host.innerHTML = list.map((activity, index) => cardMarkup(activity, index, list.length)).join('');
    bind(host, list);
  }

  function mount(host, weekId) {
    if (!host) return;
    mountQuestions(host, SOURCE.forWeek(weekId), { empty: 'Bu haftanın etkinlikleri hazırlanıyor.' });
  }

  function answeredCount(activities) {
    return (Array.isArray(activities) ? activities : []).filter((activity) => {
      const entry = store.data[activity.id];
      return entry && entry.state === 'correct';
    }).length;
  }

  function doneCount(weekId) {
    return answeredCount(SOURCE.forWeek(weekId));
  }

  window.MATEMATIK_ETKINLIK = Object.freeze({ mount, mountQuestions, doneCount, answeredCount });
})();
