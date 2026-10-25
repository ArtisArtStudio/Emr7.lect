/* Matematik etkinlikleri — soru + zorunlu açıklama + yapay zekâ değerlendirmesi.
   Diğer çalışma alanlarındaki (Türkçe/Fen/Sosyal) etkinlik kartı diliyle aynı görünümü kullanır.
   Kural: doğru seçenek hiçbir koşulda gösterilmez; geri bildirim yalnızca yol gösterir. */
(() => {
  'use strict';

  const SOURCE = window.MATEMATIK_ETKINLIKLER;
  if (!SOURCE) return;

  const STORAGE_KEY = 'emr7lect.matematik.etkinlik.v1';
  const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
  const DEFAULT_MODEL = 'openai/gpt-oss-20b';
  const LETTERS = ['A', 'B', 'C'];

  const SYSTEM_PROMPT = [
    'Sen 7. sınıf matematik öğretmenisin. Öğrenci çoktan seçmeli bir soruyu yanıtladı ve seçiminin gerekçesini yazdı.',
    'Görevin yalnızca YAZILI AÇIKLAMAYI ölçütlerle karşılaştırmak.',
    'Doğru seçeneği, doğru sayısal sonucu, cevap anahtarını veya bunların eş anlamlısını ASLA yazma; hangi şıkkın doğru olduğunu söyleme.',
    'Yanlış seçim varsa bunu yalnızca "seçimini yeniden düşün" düzeyinde belirt, doğrusunu söyleme.',
    'Yanıtın Türkçe, kısa (en çok 320 karakter) ve tek paragraf olsun.',
    'Yalnızca şu JSON biçimini döndür: {"state":"correct|partial|wrong","feedback":"...","missing":["eksik ölçüt"]}',
    'state: açıklama ölçütlerin tamamını karşılıyorsa correct, bir kısmını karşılıyorsa partial, hiçbirini karşılamıyorsa wrong.',
    'missing alanına en çok iki eksik ölçüt yaz.',
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

  function rich(value) {
    const text = value == null ? '' : String(value);
    const typeset = (segment) => {
      if (MATH && typeof MATH.render === 'function') {
        try { return MATH.render(segment); } catch (error) { /* düz metin */ }
      }
      return escapeHTML(segment);
    };
    return text.split(/(\*\*[^*]+\*\*)/g).map((segment) => (
      segment.length > 4 && segment.startsWith('**') && segment.endsWith('**')
        ? `<strong>${typeset(segment.slice(2, -2))}</strong>`
        : typeset(segment)
    )).join('');
  }

  function entryFor(id) {
    if (!store.data[id] || typeof store.data[id] !== 'object') {
      store.data[id] = { choice: null, text: '', state: '', feedback: '', checkedAt: '' };
    }
    return store.data[id];
  }

  function figureMarkup(activity) {
    if (!FIGURE || !activity.figure) return '';
    const svg = FIGURE.render(activity.figure.type, activity.figure.options || {});
    if (!svg) return '';
    return `<figure class="math-etkinlik-figure">${svg}</figure>`;
  }

  function inlineAppletMarkup(activity) {
    if (!activity.geogebra) return '';
    return `<div class="math-etkinlik-scene">
        <div class="math-etkinlik-scene-head">
          <span>${escapeHTML(activity.geogebra.title || 'GeoGebra’da incele')}</span>
          <button type="button" class="btn" data-math-etkinlik-scene="${escapeHTML(activity.id)}">Sahneyi aç</button>
        </div>
        <div class="math-scene-frame is-compact">
          <div class="math-scene-host" id="mathEtkinlikHost-${escapeHTML(activity.id)}" data-app="${escapeHTML(activity.geogebra.app || 'graphing')}"></div>
        </div>
        <p class="math-scene-caption" data-math-etkinlik-status="${escapeHTML(activity.id)}">Şekli GeoGebra’da döndürüp inceleyebilirsin; alt banttaki giriş alanına değer yazabilirsin.</p>
      </div>`;
  }

  function activityMarkup(activity, index, total) {
    const entry = entryFor(activity.id);
    const options = activity.options.map((option, optionIndex) => `
      <label class="math-etkinlik-option${String(entry.choice) === String(optionIndex) ? ' is-chosen' : ''}">
        <input type="radio" name="math-${escapeHTML(activity.id)}" value="${optionIndex}"
          data-math-etkinlik-choice="${escapeHTML(activity.id)}"${String(entry.choice) === String(optionIndex) ? ' checked' : ''}>
        <span><b>${LETTERS[optionIndex]})</b> ${rich(option)}</span>
      </label>`).join('');
    const rubric = activity.rubric.map((item) => `<li>${rich(item)}</li>`).join('');
    const text = entry.text || '';
    const count = text.trim().length;
    const state = entry.state || '';
    const pill = state ? `<span class="math-etkinlik-pill" data-state="${escapeHTML(state)}">${state === 'correct' ? 'Açıklama yeterli' : state === 'partial' ? 'Geliştirilebilir' : 'Yeniden düşün'}</span>` : '';
    const feedback = entry.feedback
      ? `<div class="math-etkinlik-feedback" data-state="${escapeHTML(state)}" aria-live="polite">${rich(entry.feedback)}</div>`
      : `<div class="math-etkinlik-feedback" data-state="" aria-live="polite" hidden></div>`;

    return `<article class="activity-card math-etkinlik-card" data-math-act="${escapeHTML(activity.id)}" data-state="${escapeHTML(state)}">
      <header class="activity-top">
        <div class="activity-heading-row">
          <span class="activity-icon" aria-hidden="true">✎</span>
          <div class="activity-title-copy">
            <p class="activity-kicker">Etkinlik ${index + 1} / ${total} · ${escapeHTML(activity.skill)}</p>
            <h4 class="activity-title">${escapeHTML(activity.title)}</h4>
          </div>
        </div>
        <p class="activity-instruction">${rich(activity.instruction)}</p>
      </header>
      <div class="activity-meta">
        <span>Çoktan seçmeli + açıklama</span>
        <span>${escapeHTML(activity.skill)}</span>
        <span>Yapay zekâ değerlendirmesi</span>
        ${pill}
      </div>
      <div class="question-list">
        <article class="question-card">
          <fieldset class="math-etkinlik-question">
            <legend><span class="math-etkinlik-no">${index + 1}</span>${rich(activity.prompt)}</legend>
            ${figureMarkup(activity)}
            <div class="math-etkinlik-options">${options}</div>
          </fieldset>
          ${inlineAppletMarkup(activity)}
          <div class="math-etkinlik-write">
            <label for="mathEtkinlikText-${escapeHTML(activity.id)}">Açıklaman (zorunlu): neden bu seçeneği seçtin?</label>
            <ul class="math-etkinlik-rubric">${rubric}</ul>
            <textarea id="mathEtkinlikText-${escapeHTML(activity.id)}" rows="4" maxlength="1200"
              data-math-etkinlik-text="${escapeHTML(activity.id)}"
              placeholder="Seçimini kendi cümlelerinle gerekçelendir…">${escapeHTML(text)}</textarea>
            <div class="math-etkinlik-actions">
              <button type="button" class="btn check-button" data-math-etkinlik-check="${escapeHTML(activity.id)}">✦ Kontrol et</button>
              <button type="button" class="btn ai-button" data-math-etkinlik-ai="${escapeHTML(activity.id)}">Yapay zekâ ile değerlendir</button>
              <span class="math-etkinlik-count" data-math-etkinlik-count="${escapeHTML(activity.id)}">${count}/${activity.minChars} karakter</span>
            </div>
            <p class="math-etkinlik-hint" data-math-etkinlik-hint="${escapeHTML(activity.id)}" hidden>İpucu: ${rich(activity.hint)}</p>
            ${feedback}
          </div>
        </article>
      </div>
    </article>`;
  }

  /* ---------------- Değerlendirme ---------------- */

  function localVerdict(activity, entry) {
    const text = String(entry.text || '').trim();
    if (entry.choice === null || entry.choice === undefined) {
      return { state: '', feedback: 'Önce bir seçenek işaretle, sonra seçimini gerekçelendir.' };
    }
    if (text.length < activity.minChars) {
      return {
        state: 'partial',
        feedback: `Açıklaman ${text.length} karakter; en az ${activity.minChars} karakterlik bir gerekçe gerekiyor. “Çünkü…” diye başlayıp hangi kuralı kullandığını yaz.`,
      };
    }
    const hit = activity.rubric.filter((item) => keywordOverlap(item, text) > 0);
    const choiceRight = Number(entry.choice) === Number(activity.correct);
    if (!choiceRight) {
      return {
        state: 'wrong',
        feedback: 'Açıklamanı yazdın ama seçimini bir kez daha düşün: seçenekleri elerken kullandığın kuralı tek tek kontrol et. İpucunu açabilirsin.',
      };
    }
    if (hit.length >= Math.max(1, activity.rubric.length - 1)) {
      return {
        state: 'correct',
        feedback: 'Gerekçen ölçütleri karşılıyor: kullandığın kuralı ve sonucu birlikte açıkladın. Şimdi aynı soruyu farklı sayılarla kendin kurup çöz.',
      };
    }
    return {
      state: 'partial',
      feedback: `Gerekçen kısmen yeterli. Şunları ekle: ${activity.rubric.filter((item) => keywordOverlap(item, text) === 0).slice(0, 2).join('; ')}.`,
    };
  }

  const STOP = new Set(['bir', 've', 'ile', 'için', 'olan', 'olarak', 'daha', 'gibi', 'bu', 'da', 'de', 'ki', 'mi', 'çok', 'az', 'her', 'sonra', 'göre', 'kadar']);

  function keywordOverlap(criterion, text) {
    const lower = text.toLocaleLowerCase('tr');
    const words = String(criterion).toLocaleLowerCase('tr')
      .replace(/[^\p{L}\s]/gu, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 3 && !STOP.has(word));
    return words.filter((word) => lower.includes(word.slice(0, Math.max(4, word.length - 2)))).length;
  }

  function paint(host, activity, entry) {
    const card = host.querySelector(`[data-math-act="${activity.id}"]`);
    const box = host.querySelector(`[data-math-etkinlik-hint="${activity.id}"]`)?.parentElement
      ?.querySelector('.math-etkinlik-feedback');
    if (card) card.dataset.state = entry.state || '';
    const pill = card?.querySelector('.math-etkinlik-pill');
    const label = entry.state === 'correct' ? 'Açıklama yeterli' : entry.state === 'partial' ? 'Geliştirilebilir' : entry.state === 'wrong' ? 'Yeniden düşün' : '';
    if (pill) {
      pill.textContent = label;
      pill.dataset.state = entry.state || '';
      pill.hidden = !label;
    }
    if (box) {
      box.hidden = !entry.feedback;
      box.dataset.state = entry.state || '';
      box.innerHTML = entry.feedback ? rich(entry.feedback) : '';
    }
  }

  async function askAI(activity, entry) {
    const apiKey = document.getElementById('apiKey')?.value?.trim?.() || '';
    if (!apiKey) throw Object.assign(new Error('missing-key'), { code: 'missing-key' });
    const model = document.getElementById('model')?.value || DEFAULT_MODEL;
    const userPrompt = [
      `Soru: ${activity.prompt}`,
      `Seçenekler: ${activity.options.map((option, index) => `${LETTERS[index]}) ${option}`).join(' | ')}`,
      `Öğrencinin seçimi: ${LETTERS[entry.choice]} (doğru olup olmadığını söyleme)`,
      `Açıklaması: ${entry.text}`,
      `Ölçütler: ${activity.rubric.join('; ')}`,
      'Açıklamayı ölçütlerle karşılaştır; yalnızca istenen JSON biçimini döndür.',
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
    // Cevabı sızdıran ifadeler temizlenir.
    if (/doğru (cevap|seçenek|şık)|cevap anahtar|doğrusu [A-C]\b/i.test(feedback)) {
      feedback = 'Açıklamanı ölçütlerle karşılaştırdım. Hangi kuralı kullandığını ve sonucu nasıl bulduğunu birer cümleyle yeniden yaz.';
    }
    if (Array.isArray(parsed.missing) && parsed.missing.length) {
      feedback += ` Eksik kalan: ${parsed.missing.slice(0, 2).map((item) => String(item).replace(/[<>]/g, '').slice(0, 90)).join('; ')}.`;
    }
    if (Number(entry.choice) !== Number(activity.correct)) {
      feedback += ' Seçimini bir kez daha düşün: her seçeneği sırayla ele ve kurala uyup uymadığını kontrol et.';
    }
    return { state, feedback };
  }

  function bind(host, weekId) {
    const activities = SOURCE.forWeek(weekId);
    if (!activities.length) return;

    host.querySelectorAll('[data-math-etkinlik-choice]').forEach((input) => {
      input.addEventListener('change', () => {
        const entry = entryFor(input.dataset.mathEtkinlikChoice);
        entry.choice = Number(input.value);
        entry.state = '';
        entry.feedback = '';
        store.save();
        host.querySelectorAll(`input[name="math-${input.dataset.mathEtkinlikChoice}"]`).forEach((radio) => {
          radio.closest('.math-etkinlik-option')?.classList.toggle('is-chosen', radio.checked);
        });
        paint(host, activities.find((item) => item.id === input.dataset.mathEtkinlikChoice), entry);
      });
    });

    host.querySelectorAll('[data-math-etkinlik-text]').forEach((area) => {
      area.addEventListener('input', () => {
        const id = area.dataset.mathEtkinlikText;
        const entry = entryFor(id);
        entry.text = area.value;
        store.save();
        const activity = activities.find((item) => item.id === id);
        const counter = host.querySelector(`[data-math-etkinlik-count="${id}"]`);
        if (counter && activity) counter.textContent = `${area.value.trim().length}/${activity.minChars} karakter`;
      });
    });

    host.querySelectorAll('[data-math-etkinlik-check], [data-math-etkinlik-ai]').forEach((button) => {
      button.addEventListener('click', async () => {
        const id = button.dataset.mathEtkinlikCheck || button.dataset.mathEtkinlikAi;
        const activity = activities.find((item) => item.id === id);
        if (!activity) return;
        const entry = entryFor(id);
        const hint = host.querySelector(`[data-math-etkinlik-hint="${id}"]`);
        const wantAI = Boolean(button.dataset.mathEtkinlikAi);
        if (entry.choice === null || entry.choice === undefined) {
          entry.state = '';
          entry.feedback = 'Önce bir seçenek işaretle; ardından neden onu seçtiğini yaz.';
          paint(host, activity, entry);
          return;
        }
        if (String(entry.text || '').trim().length < 24) {
          entry.state = '';
          entry.feedback = `Açıklama zorunlu: en az ${activity.minChars} karakterlik bir gerekçe yazmadan değerlendirme başlamaz.`;
          paint(host, activity, entry);
          return;
        }
        const previous = button.textContent;
        if (wantAI) {
          button.disabled = true;
          button.textContent = 'Değerlendiriliyor…';
        }
        try {
          if (wantAI) {
            const result = await askAI(activity, entry);
            entry.state = result.state;
            entry.feedback = result.feedback;
          } else {
            const result = localVerdict(activity, entry);
            entry.state = result.state;
            entry.feedback = result.feedback;
          }
          entry.checkedAt = new Date().toISOString();
          if (entry.state && entry.state !== 'correct' && hint) hint.hidden = false;
          store.save();
          paint(host, activity, entry);
        } catch (error) {
          const message = String(error?.message || error);
          const friendly = error?.code === 'missing-key'
            ? 'Yapay zekâ değerlendirmesi için sayfa başındaki “Ortak yapay zekâ ayarları” bölümüne Groq API anahtarını gir. Anahtar yokken yerel kontrol çalışır.'
            : /failed to fetch|networkerror|load failed|cors/i.test(message)
              ? 'Groq’a ulaşılamadı; internet bağlantısını kontrol edip yeniden dene. Yanıtın kayıtlı.'
              : `Değerlendirme tamamlanamadı: ${message}`;
          entry.state = '';
          entry.feedback = friendly;
          store.save();
          paint(host, activity, entry);
        } finally {
          if (wantAI) {
            button.disabled = false;
            button.textContent = previous;
          }
        }
      });
    });

    host.querySelectorAll('[data-math-etkinlik-scene]').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.dataset.mathEtkinlikScene;
        const activity = activities.find((item) => item.id === id);
        if (!activity || !activity.geogebra) return;
        const sceneHost = document.getElementById(`mathEtkinlikHost-${id}`);
        const status = host.querySelector(`[data-math-etkinlik-status="${id}"]`);
        const GGB = window.MATEMATIK_GEOGEBRA;
        if (!sceneHost || !GGB) {
          if (status) status.textContent = 'GeoGebra yüklenemedi; yukarıdaki şekli kullanabilirsin.';
          return;
        }
        button.disabled = true;
        button.textContent = 'Yükleniyor…';
        sceneHost.classList.add('is-loading');
        GGB.createApplet(sceneHost, {
          appName: activity.geogebra.app || 'graphing',
          commands: activity.geogebra.commands || [],
          bounds: activity.geogebra.bounds,
          height: 260,
          onStatus: (state, payload) => {
            if (state === 'ready' && status) status.textContent = `Hazır: ${payload.count} nesne · giriş alanı altta.`;
          },
        }).then(() => {
          sceneHost.classList.remove('is-loading');
          button.textContent = 'Sahne açık';
        }).catch((error) => {
          sceneHost.classList.remove('is-loading');
          button.disabled = false;
          button.textContent = 'Yeniden dene';
          if (status) status.textContent = `GeoGebra açılamadı (${error.message}); yukarıdaki şekil aynı soruyu çözmeye yeter.`;
        });
      });
    });
  }

  function mount(host, weekId) {
    if (!host) return;
    const activities = SOURCE.forWeek(weekId);
    if (!activities.length) {
      host.innerHTML = '<p class="math-etkinlik-empty">Bu haftanın etkinlikleri hazırlanıyor.</p>';
      return;
    }
    host.innerHTML = activities.map((activity, index) => activityMarkup(activity, index, activities.length)).join('');
    bind(host, weekId);
  }

  function doneCount(weekId) {
    return SOURCE.forWeek(weekId).filter((activity) => {
      const entry = store.data[activity.id];
      return entry && entry.state === 'correct';
    }).length;
  }

  window.MATEMATIK_ETKINLIK = Object.freeze({ mount, doneCount });
})();
