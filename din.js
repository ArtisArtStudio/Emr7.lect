/* Din Kültürü ve Ahlak Bilgisi · 1. ünite çalışma soruları uygulaması.
   - Sorular kaynaktaki metniyle gösterilir.
   - "Kontrol et": Groq yanıtı değerlendirir, yalnızca ipucu ve yönlendirme verir.
   - "Cevabı göster": şifre ister; şifre doğruysa örnek cevap açılır.
   - Soru ve cevap ElevenLabs Türkçe sesle okunabilir. */
(() => {
  'use strict';

  const EXAM = window.DIN_EXAM;
  if (!EXAM || !Array.isArray(EXAM.questions)) return;

  const STORE_KEY = 'emr7lect.din.sinav.v1';
  const ANSWER_PASSWORD = 'Alone815185';
  const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

  const STATUS_TEXT = {
    dogru: 'DOĞRU YÖNDE',
    kismen: 'KISMEN TAMAM',
    eksik: 'EKSİK',
    bos: 'YANIT YOK',
  };

  /* ---------------- Durum ---------------- */

  function loadState() {
    let parsed = {};
    try {
      parsed = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {};
    } catch {
      parsed = {};
    }
    return {
      answers: parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {},
      checks: parsed.checks && typeof parsed.checks === 'object' ? parsed.checks : {},
      /* Açılan cevaplar yalnızca bu oturum için açık kalır; sayfa yenilenince
         şifre yeniden istenir. */
      revealed: {},
      index: Number.isInteger(parsed.index) ? parsed.index : 0,
    };
  }

  let state = loadState();
  let unlocked = false;

  function save() {
    try {
      const { revealed, ...persisted } = state;
      localStorage.setItem(STORE_KEY, JSON.stringify(persisted));
    } catch {
      /* Depolama kapalıysa çalışmayı sürdür; yalnızca kayıt yapılamaz. */
    }
    updateProgress();
    const note = document.getElementById('dinSaved');
    if (note) {
      note.textContent = '✓ Kaydedildi';
      window.setTimeout(() => {
        note.textContent = 'Yanıtlar bu tarayıcıda saklanır';
      }, 1200);
    }
  }

  function readAnswers(no) {
    return state.answers[no] || {};
  }

  function answersOf(no) {
    state.answers[no] = state.answers[no] || {};
    return state.answers[no];
  }

  function questionAt(index) {
    return EXAM.questions[Math.min(Math.max(index, 0), EXAM.questions.length - 1)];
  }

  function answeredCount(question) {
    const values = readAnswers(question.no);
    return question.tasks.filter((task) => String(values[task.id] || '').trim().length > 0).length;
  }

  function isAnswered(question) {
    return answeredCount(question) > 0;
  }

  /* ---------------- Yardımcılar ---------------- */

  const escapeHTML = (value) =>
    String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  function plainTextOf(question) {
    const parts = [question.stem.join(' '), question.ask];
    (question.notes || []).forEach((note) => parts.push(note.text));
    (question.cards || []).forEach((card) => parts.push(`${card.title}: ${card.text}`));
    return parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
  }

  function answerTextOf(question) {
    const lines = [];
    (question.answer.blocks || []).forEach((block) => {
      if (block.t === 'p') lines.push(block.text);
      else if (block.t === 'ul') block.items.forEach((item) => lines.push(`• ${item}`));
      else if (block.t === 'table') {
        lines.push(block.columns.join(' · '));
        block.rows.forEach((row) => lines.push(row.join(': ')));
      }
    });
    return lines.join('\n');
  }

  /* ---------------- Sesli okuma (ElevenLabs) ---------------- */

  function speak(text, statusEl) {
    if (!text) return;
    if (typeof window.speakEleven === 'function') {
      window.speakEleven(text, statusEl);
      return;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'tr-TR';
      utter.rate = 0.95;
      const voice = window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase().startsWith('tr'));
      if (voice) utter.voice = voice;
      window.speechSynthesis.speak(utter);
      if (statusEl) statusEl.textContent = 'Cihazın Türkçe sesi okuyor.';
    }
  }

  function stopSpeaking() {
    if (typeof window.stopEleven === 'function') window.stopEleven();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  /* ---------------- Çizim ---------------- */

  function taskField(task, values) {
    const value = values[task.id] || '';
    if (task.short) {
      return `<label class="din-field din-field--short"><span>${escapeHTML(task.label)}</span><input type="text" class="din-input" data-din-field="${escapeHTML(task.id)}" value="${escapeHTML(value)}" autocomplete="off" placeholder="Yaz…"></label>`;
    }
    return `<label class="din-field"><span>${escapeHTML(task.label)}</span><textarea class="din-input din-textarea" rows="${task.rows || 3}" data-din-field="${escapeHTML(task.id)}" placeholder="Yanıtını buraya yaz…">${escapeHTML(value)}</textarea></label>`;
  }

  function tableMarkup(table, values, labels) {
    const rows = table.rows
      .map((row) => {
        const cells = row.fields
          ? row.fields
              .map(
                (field) =>
                  `<td><input type="text" class="din-input din-input--cell" data-din-field="${escapeHTML(field)}" value="${escapeHTML(values[field] || '')}" autocomplete="off" aria-label="${escapeHTML(`${row.label} ${labels[field] || ''}`)}"></td>`,
              )
              .join('')
          : (row.fixed || []).map((cell) => `<td class="din-cell-fixed">${escapeHTML(cell)}</td>`).join('');
        return `<tr><th scope="row">${escapeHTML(row.label)}</th>${cells}</tr>`;
      })
      .join('');
    return `<div class="din-table-wrap"><p class="din-table-caption">${escapeHTML(table.caption || '')}</p><table class="din-table"><thead><tr><th scope="col">#</th>${table.columns.map((column) => `<th scope="col">${escapeHTML(column)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function blocksMarkup(blocks) {
    return blocks
      .map((block) => {
        if (block.t === 'p') return `<p>${escapeHTML(block.text)}</p>`;
        if (block.t === 'h') return `<h4>${escapeHTML(block.text)}</h4>`;
        if (block.t === 'ul') return `<ul>${block.items.map((item) => `<li>${escapeHTML(item)}</li>`).join('')}</ul>`;
        if (block.t === 'table') {
          return `<div class="din-table-wrap"><table class="din-table din-table--answer"><thead><tr>${block.columns.map((column) => `<th scope="col">${escapeHTML(column)}</th>`).join('')}</tr></thead><tbody>${block.rows
            .map((row) => `<tr>${row.map((cell) => `<td>${escapeHTML(cell)}</td>`).join('')}</tr>`)
            .join('')}</tbody></table></div>`;
        }
        return '';
      })
      .join('');
  }

  function questionMarkup(question) {
    const values = answersOf(question.no);
    const labels = Object.fromEntries(question.tasks.map((task) => [task.id, task.label]));
    const parts = [];

    parts.push(`<div class="din-q-head">
      <span class="din-q-no">Soru ${question.no}</span>
      <div class="din-q-meta"><span>${escapeHTML(question.outcome)}</span><span>${escapeHTML(question.skill)}</span></div>
    </div>`);
    parts.push(`<h2 id="dinQuestionTitle" tabindex="-1">${escapeHTML(question.heading)}</h2>`);

    if (question.stem.length) {
      parts.push(`<div class="din-stem">${question.stem.map((item) => `<p>${escapeHTML(item)}</p>`).join('')}</div>`);
    }

    if (question.notes) {
      parts.push(
        `<div class="din-notes">${question.notes
          .map(
            (note) =>
              `<blockquote class="din-quote"><p>${escapeHTML(note.text)}</p>${note.source ? `<cite>${escapeHTML(note.source)}</cite>` : ''}</blockquote>`,
          )
          .join('')}</div>`,
      );
    }

    if (question.cards) {
      parts.push(
        `<div class="din-cards">${question.cards
          .map((card) => `<div class="din-card"><b>${escapeHTML(card.title)}</b><p>${escapeHTML(card.text)}</p></div>`)
          .join('')}</div>`,
      );
    }

    if (question.words) {
      parts.push(
        `<div class="din-words"><span>Kelime havuzu:</span>${question.words.map((word) => `<b>${escapeHTML(word)}</b>`).join('')}</div>`,
      );
    }

    if (question.lines) {
      parts.push(
        `<ol class="din-lines">${question.lines
          .map(
            (line) =>
              `<li><span>${escapeHTML(line.text.replace('………', ''))}</span><input type="text" class="din-input din-input--line" data-din-field="${escapeHTML(line.field)}" value="${escapeHTML(values[line.field] || '')}" autocomplete="off" aria-label="${escapeHTML(labels[line.field] || 'Boşluk')}"></li>`,
          )
          .join('')}</ol>`,
      );
    }

    parts.push(`<p class="din-ask"><strong>Yönerge:</strong> ${escapeHTML(question.ask)}</p>`);

    parts.push(
      `<div class="din-actions">
        <button class="din-btn" type="button" data-din-read="question">🔊 Soruyu sesli oku</button>
        <button class="din-btn" type="button" data-din-stop>Durdur</button>
        <span class="din-status" id="dinReadStatus" role="status" aria-live="polite"></span>
      </div>`,
    );

    if (question.tables) {
      parts.push(`<div class="din-tables">${question.tables.map((table) => tableMarkup(table, values, labels)).join('')}</div>`);
      const loose = question.tasks.filter((task) => !question.tables.some((table) => table.rows.some((row) => (row.fields || []).includes(task.id))));
      if (loose.length) parts.push(`<div class="din-fields">${loose.map((task) => taskField(task, values)).join('')}</div>`);
    } else if (!question.lines) {
      parts.push(`<div class="din-fields">${question.tasks.map((task) => taskField(task, values)).join('')}</div>`);
    }

    parts.push(
      `<div class="din-check-actions">
        <button class="din-btn din-btn--primary" type="button" data-din-check>Kontrol et</button>
        <button class="din-btn" type="button" data-din-reveal>${state.revealed[question.no] ? 'Cevabı yeniden göster' : 'Cevabı göster'}</button>
        <span class="din-hint">Kontrol, cevabı söylemez; yalnızca eksiğini ve bir sonraki adımı gösterir.</span>
      </div>`,
    );

    parts.push(`<div class="din-feedback" id="dinFeedback" role="status" aria-live="polite"${state.checks[question.no] ? '' : ' hidden'}>${state.checks[question.no] ? escapeHTML(state.checks[question.no].text) : ''}</div>`);

    parts.push(`<div class="din-gate" id="dinGate" hidden>
      <label for="dinPassword">Cevabı görmek için şifre</label>
      <div class="din-gate-row"><input type="password" id="dinPassword" autocomplete="off" placeholder="Şifre"><button class="din-btn din-btn--primary" type="button" data-din-unlock>Aç</button></div>
      <p class="din-status" id="dinGateStatus" role="status" aria-live="polite"></p>
    </div>`);

    parts.push(`<div class="din-answer" id="dinAnswer"${state.revealed[question.no] ? '' : ' hidden'}>
      <h3>Örnek cevap</h3>
      ${blocksMarkup(question.answer.blocks)}
      <div class="din-actions">
        <button class="din-btn" type="button" data-din-read="answer">🔊 Cevabı sesli oku</button>
        <button class="din-btn" type="button" data-din-stop>Durdur</button>
        <span class="din-status" id="dinAnswerStatus" role="status" aria-live="polite"></span>
      </div>
    </div>`);

    return parts.join('\n');
  }

  function renderNav() {
    const host = document.getElementById('dinQuestionList');
    if (!host) return;
    host.innerHTML = EXAM.questions
      .map((question, index) => {
        const status = state.revealed[question.no] ? 'revealed' : state.checks[question.no] ? 'checked' : isAnswered(question) ? 'written' : 'empty';
        return `<button type="button" class="din-nav-item" data-din-index="${index}" data-state="${status}"${index === state.index ? ' aria-current="step"' : ''}>
          <span class="din-nav-no">${question.no}</span>
          <span class="din-nav-copy"><b>${escapeHTML(question.heading)}</b><small>${escapeHTML(question.outcome.split('·')[1]?.trim() || question.outcome)}</small></span>
          <span class="din-nav-dot" aria-hidden="true"></span>
        </button>`;
      })
      .join('');
  }

  function updateProgress() {
    const total = EXAM.questions.length;
    const written = EXAM.questions.filter(isAnswered).length;
    const checked = EXAM.questions.filter((question) => state.checks[question.no]).length;
    const bar = document.getElementById('dinProgressBar');
    if (bar) bar.style.width = `${Math.round((written / total) * 100)}%`;
    const track = document.getElementById('dinProgressTrack');
    if (track) track.setAttribute('aria-valuenow', String(written));
    const label = document.getElementById('dinProgressCount');
    if (label) label.textContent = `${written} / ${total} soru yanıtlandı · ${checked} kontrol edildi`;
  }

  function renderQuestion() {
    const host = document.getElementById('dinQuestionBody');
    if (!host) return;
    const question = questionAt(state.index);
    host.innerHTML = questionMarkup(question);
    bindQuestion(question);
    renderNav();
    updateProgress();
  }

  /* ---------------- Alanlar ve düğmeler ---------------- */

  function bindQuestion(question) {
    const values = answersOf(question.no);
    document.querySelectorAll('[data-din-field]').forEach((input) => {
      input.addEventListener('input', () => {
        values[input.dataset.dinField] = input.value;
        save();
        const item = document.querySelector(`.din-nav-item[data-din-index="${state.index}"]`);
        if (item && !state.checks[question.no] && !state.revealed[question.no] && item.dataset.state === 'empty' && input.value.trim()) item.dataset.state = 'written';
      });
    });

    document.querySelectorAll('[data-din-read]').forEach((button) => {
      button.addEventListener('click', () => {
        if (button.dataset.dinRead === 'answer') speak(answerTextOf(question), document.getElementById('dinAnswerStatus'));
        else speak(plainTextOf(question), document.getElementById('dinReadStatus'));
      });
    });

    document.querySelectorAll('[data-din-stop]').forEach((button) => {
      button.addEventListener('click', () => {
        stopSpeaking();
        document.querySelectorAll('.din-status').forEach((status) => {
          status.textContent = 'Sesli okuma durduruldu.';
        });
      });
    });

    const checkButton = document.querySelector('[data-din-check]');
    if (checkButton) checkButton.addEventListener('click', () => checkAnswer(question, checkButton));

    const revealButton = document.querySelector('[data-din-reveal]');
    if (revealButton) revealButton.addEventListener('click', () => requestAnswer(question));

    const unlockButton = document.querySelector('[data-din-unlock]');
    if (unlockButton) unlockButton.addEventListener('click', () => tryUnlock(question));

    const password = document.getElementById('dinPassword');
    if (password) {
      password.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          tryUnlock(question);
        }
      });
    }

    if (state.revealed[question.no]) revealAnswer(question);
  }

  function showFeedback(text, kind) {
    const box = document.getElementById('dinFeedback');
    if (!box) return;
    box.hidden = false;
    box.dataset.kind = kind || 'info';
    box.textContent = text;
  }

  /* ---------------- Groq ile kontrol (ipucu) ---------------- */

  function groqKey() {
    const field = document.getElementById('apiKey');
    return (field && field.value.trim()) || localStorage.getItem('turkceGroqKey2026') || '';
  }

  function groqModel() {
    const select = document.getElementById('model');
    return (select && select.value) || localStorage.getItem('turkceGroqModel2026') || 'openai/gpt-oss-20b';
  }

  function normalize(text) {
    return String(text || '')
      .toLocaleLowerCase('tr-TR')
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* Cevap metnindeki sözcük dizileri ipucuna kopyalanmışsa ipucu gösterilmez.
     Böylece modelin örnek cevabı ele vermesi engellenir. */
  function secretShingles(question) {
    const secret = [answerTextOf(question), ...(question.keyPoints || [])].join(' ').toLocaleLowerCase('tr-TR');
    const words = secret.replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);
    const set = new Set();
    for (let i = 0; i + 5 < words.length; i += 1) set.add(words.slice(i, i + 6).join(' '));
    return set;
  }

  function leaksAnswer(text, question, shingles) {
    const words = normalize(text).split(' ').filter(Boolean);
    if (words.length < 4) return false;
    let hits = 0;
    for (let i = 0; i + 5 < words.length; i += 1) {
      if (shingles.has(words.slice(i, i + 6).join(' '))) hits += 1;
    }
    if (hits >= 2) return true;
    for (let i = 0; i + 3 < words.length; i += 1) {
      if (shingles.has(words.slice(i, i + 4).join(' '))) hits += 1;
    }
    return hits >= 4;
  }

  function buildFeedback(question, result, answered, total) {
    const durum = STATUS_TEXT[result.durum] || 'DEĞERLENDİRİLDİ';
    const lines = [`DURUM: ${durum} · ${answered}/${total} alan dolduruldu`];
    if (Array.isArray(result.eksikler) && result.eksikler.length) {
      lines.push(`EKSİK: ${result.eksikler.slice(0, 3).join(' ')}`);
    } else {
      lines.push('EKSİK: Belirgin bir eksik görülmedi.');
    }
    if (result.ipucu) lines.push(`YOL GÖSTERİCİ: ${result.ipucu}`);
    if (result.yonlendirme) lines.push(`SIRA SENDE: ${result.yonlendirme}`);
    if (result.baslangic) lines.push(`YAZMAYA BAŞLA: ${result.baslangic}`);
    lines.push('TEŞVİK: Yanıtını yüksek sesle oku; anlaşılmayan bir cümle varsa yeniden yaz.');
    return lines.join('\n');
  }

  async function checkAnswer(question, button) {
    const values = answersOf(question.no);
    const answers = question.tasks
      .map((task) => ({ label: task.label, value: String(values[task.id] || '').trim() }))
      .filter((item) => item.value.length > 0);

    if (!answers.length) {
      showFeedback('DURUM: YANIT YOK\nEKSİK: Hiçbir alan doldurulmamış.\nYOL GÖSTERİCİ: Soruyu bir kez okuyup metindeki ilgili cümleyi bul; sonra en az bir alana kendi cümlelerinle yaz.', 'empty');
      return;
    }

    const apiKey = groqKey();
    if (!apiKey) {
      showFeedback('DURUM: YAPAY ZEKÂ KAPALI\nEKSİK: Groq API anahtarı girilmemiş.\nYOL GÖSTERİCİ: Sayfanın üstündeki “Ortak yapay zekâ ayarları” bölümünden anahtarını gir. Anahtar yalnızca senin cihazında tutulur.', 'warning');
      const settings = document.getElementById('apiSettings');
      if (settings) settings.open = true;
      return;
    }

    button.disabled = true;
    const label = button.textContent;
    button.textContent = 'Kontrol ediliyor…';
    showFeedback('Yanıtın ölçütlere göre inceleniyor…', 'info');

    const systemPrompt = [
      'Sen 7. sınıf Din Kültürü ve Ahlak Bilgisi dersinde açık uçlu soruları değerlendiren bir öğretmensin.',
      'Amacın öğrenciyi yönlendirmek; cevabı vermek değildir. Cevap anahtarı ve örnek cevap yalnızca iç değerlendirme içindir.',
      'Hiçbir alanda doğru cevabı, kavram adını, kişi/melek adını, ayet numarasını veya örnek cevabın bir cümlesini yazma.',
      'Eksikleri, öğrencinin ne yapması gerektiğini anlatan kısa ifadelerle yaz; “şunu yaz” diyerek cevabı söyleme.',
      'Çıktı yalnızca geçerli JSON olsun: {"durum":"dogru|kismen|eksik","eksikler":["en çok 3 kısa madde"],"ipucu":"en çok 200 karakter, tek cümle, öğrenciye soru soran ya da yön veren","yonlendirme":"en çok 160 karakter, öğrencinin atacağı somut adım","baslangic":"en çok 120 karakter, öğrencinin tamamlayacağı yarım cümle"}',
      'Markdown, açıklama veya JSON dışı metin ekleme.',
    ].join('\n');

    const userPrompt = [
      `Soru: ${question.stem.join(' ')} ${question.ask}`,
      question.notes ? `Metin/ayetler: ${question.notes.map((note) => note.text).join(' ')}` : '',
      `Beklenen kazanım: ${question.outcome} · ${question.skill}`,
      `Değerlendirme ölçütleri (iç kullanım):\n- ${question.keyPoints.join('\n- ')}`,
      `Örnek cevap (iç kullanım, asla kopyalanmayacak):\n${answerTextOf(question)}`,
      `Öğrencinin yanıtları:\n${answers.map((item) => `- ${item.label}: ${item.value}`).join('\n')}`,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const response = await fetch(GROQ_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: groqModel(),
          temperature: 0.2,
          max_completion_tokens: 500,
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          ...(groqModel().startsWith('openai/gpt-oss') ? { reasoning_effort: 'low', reasoning_format: 'hidden' } : {}),
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload?.error?.message || `HTTP ${response.status}`);
      const raw = JSON.parse(payload?.choices?.[0]?.message?.content || '{}');
      const shingles = secretShingles(question);
      const safe = (value) => (leaksAnswer(value, question, shingles) ? '' : String(value || ''));
      const result = {
        durum: ['dogru', 'kismen', 'eksik', 'bos'].includes(raw.durum) ? raw.durum : 'kismen',
        eksikler: (Array.isArray(raw.eksikler) ? raw.eksikler : []).map((item) => safe(item).slice(0, 160)).filter(Boolean),
        ipucu: safe(raw.ipucu).slice(0, 220),
        yonlendirme: safe(raw.yonlendirme).slice(0, 180),
        baslangic: safe(raw.baslangic).slice(0, 140),
      };
      if (!result.ipucu && !result.yonlendirme) {
        result.ipucu = 'Yanıtını ölçütlerle karşılaştır: soru kaç şey istiyor, hepsini ayrı ayrı yanıtladın mı?';
      }
      const text = buildFeedback(question, result, answers.length, question.tasks.length);
      state.checks[question.no] = { text, at: Date.now(), durum: result.durum };
      save();
      showFeedback(text, result.durum);
      const item = document.querySelector(`.din-nav-item[data-din-index="${state.index}"]`);
      if (item && !state.revealed[question.no]) item.dataset.state = 'checked';
    } catch (error) {
      const message = String(error?.message || error);
      showFeedback(
        `DURUM: KONTROL EDİLEMEDİ\nEKSİK: İstek tamamlanamadı (${message.slice(0, 90)}).\nYOL GÖSTERİCİ: Bağlantını ve anahtarı denetleyip birkaç saniye sonra yeniden dene. Yazdıkların kaybolmadı.`,
        'warning',
      );
    } finally {
      button.disabled = false;
      button.textContent = label;
    }
  }

  /* ---------------- Cevabı gösterme (şifreli) ---------------- */

  function requestAnswer(question) {
    if (state.revealed[question.no] || unlocked) {
      state.revealed[question.no] = true;
      save();
      revealAnswer(question);
      return;
    }
    const gate = document.getElementById('dinGate');
    if (!gate) return;
    gate.hidden = false;
    const status = document.getElementById('dinGateStatus');
    if (status) status.textContent = 'Cevap yalnızca şifre girildiğinde gösterilir.';
    const password = document.getElementById('dinPassword');
    if (password) {
      password.value = '';
      password.focus();
    }
  }

  function tryUnlock(question) {
    const field = document.getElementById('dinPassword');
    const status = document.getElementById('dinGateStatus');
    if (!field) return;
    if (field.value.trim() === ANSWER_PASSWORD) {
      unlocked = true;
      const gate = document.getElementById('dinGate');
      if (gate) gate.hidden = true;
      state.revealed[question.no] = true;
      save();
      revealAnswer(question);
      const nav = document.querySelector(`.din-nav-item[data-din-index="${state.index}"]`);
      if (nav) nav.dataset.state = 'revealed';
    } else {
      if (status) status.textContent = 'Şifre yanlış. Cevap gösterilmedi.';
      field.value = '';
      field.focus();
    }
  }

  function revealAnswer(question) {
    const box = document.getElementById('dinAnswer');
    if (box) box.hidden = false;
    const button = document.querySelector('[data-din-reveal]');
    if (button) button.textContent = 'Cevabı yeniden göster';
    const gate = document.getElementById('dinGate');
    if (gate) gate.hidden = true;
    const nav = document.querySelector(`.din-nav-item[data-din-index="${state.index}"]`);
    if (nav) nav.dataset.state = 'revealed';
  }

  /* ---------------- Gezinme ---------------- */

  function goTo(index) {
    state.index = Math.min(Math.max(index, 0), EXAM.questions.length - 1);
    save();
    renderQuestion();
    const title = document.getElementById('dinQuestionTitle');
    if (title) title.focus({ preventScroll: true });
  }

  function bindShell() {
    const list = document.getElementById('dinQuestionList');
    if (list) {
      list.addEventListener('click', (event) => {
        const button = event.target.closest('[data-din-index]');
        if (button) goTo(Number(button.dataset.dinIndex));
      });
    }
    const prev = document.getElementById('dinPrev');
    const next = document.getElementById('dinNext');
    if (prev) prev.addEventListener('click', () => goTo(state.index - 1));
    if (next) next.addEventListener('click', () => goTo(state.index + 1));
    const reset = document.getElementById('dinReset');
    if (reset) {
      reset.addEventListener('click', () => {
        const sure = window.confirm('Bu tarayıcıdaki Din Kültürü yanıtları, kontroller ve açılan cevaplar silinsin mi?');
        if (!sure) return;
        state = { answers: {}, checks: {}, revealed: {}, index: 0 };
        unlocked = false;
        save();
        renderQuestion();
      });
    }
    const back = document.getElementById('dinBackToTurkish');
    if (back) {
      back.addEventListener('click', () => {
        const button = document.querySelector('.subject-btn[data-subject="turkce"]');
        if (button) button.click();
      });
    }
  }

  function render() {
    const workspace = document.getElementById('dinWorkspace');
    if (workspace && workspace.hidden) return;
    renderQuestion();
  }

  function init() {
    bindShell();
    renderNav();
    updateProgress();
    renderQuestion();
  }

  function exportProgress() {
    return { answers: state.answers, checks: state.checks, index: state.index };
  }

  function importProgress(payload) {
    if (!payload || typeof payload !== 'object') return;
    state.answers = payload.answers && typeof payload.answers === 'object' ? payload.answers : {};
    state.checks = payload.checks && typeof payload.checks === 'object' ? payload.checks : {};
    state.index = Number.isInteger(payload.index) ? payload.index : 0;
    state.revealed = {};
    save();
    renderQuestion();
  }

  window.DIN = Object.freeze({
    render,
    goTo,
    exportProgress,
    importProgress,
    reset: () => {
      state = { answers: {}, checks: {}, revealed: {}, index: 0 };
      unlocked = false;
      save();
      renderQuestion();
    },
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
