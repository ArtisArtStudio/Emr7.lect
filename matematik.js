/* 7. sınıf matematik alanı — ders kitabının bölüm akışını izleyen çalışma alanı.
   Her hafta kitaptaki sırayla ilerler:
   NELER BİLİYORUZ? → BAŞLAYALIM → ÖĞRENELİM (BİLGİ KUTUSU) → DÜŞÜN-TARTIŞ-AÇIKLA →
   KATIL-UYGULA-KEŞFET → PROBLEM → PERFORMANS GÖREVİ → NELER ÖĞRENDİK? → TEMA ÖLÇME.
   Etkinlik = soru: her soruda yazılı açıklama zorunludur, değerlendirme yapay zekâ ile yapılır.
   Sahne ve şekiller yerel SVG motorlarıyla çizilir; sürgüler çizimin altındadır. */
(() => {
  'use strict';

  const CONTENT = window.MATEMATIK_CONTENT;
  const KITAP = window.MATEMATIK_KITAP;
  if (!CONTENT || !KITAP) return;

  const STORAGE_KEY = 'emr7lect.matematik.v1';
  const EXAM_BY_WEEK = Object.freeze({ 8: '5 Kasım 2026' });
  const THEME_BY_ID = new Map(CONTENT.themes.map((theme) => [theme.id, theme]));

  const STAGE = Object.freeze({
    warmup: 'NELER BİLİYORUZ?',
    start: 'BAŞLAYALIM',
    learn: 'ÖĞRENELİM',
    discuss: 'DÜŞÜN-TARTIŞ-AÇIKLA',
    explore: 'KATIL-UYGULA-KEŞFET',
    problem: 'PROBLEM',
  });

  const STAGE_NOTE = Object.freeze({
    warmup: 'Önceki bilgilerini yokla; cevabı yazmadan geçme.',
    start: 'Kitabın açılış etkinliği. Soruyu kendi cümlelerinle yeniden kur.',
    learn: 'Konu anlatımı ve bilgi kutuları; her kutu bir kuralı tek başına anlatır.',
    discuss: 'Tartışma sorusu: düşünceni gerekçesiyle açıkla.',
    explore: 'Katıl, uygula, keşfet: ölç, çiz, kaydet.',
    problem: 'Problem çözme basamakları: anla → planla → çöz → kontrol et.',
  });

  let state = loadState();
  let currentWeek = null;

  function loadState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && typeof parsed === 'object') {
        return {
          done: Array.isArray(parsed.done) ? parsed.done.filter(Number.isFinite) : [],
          checks: parsed.checks && typeof parsed.checks === 'object' ? parsed.checks : {},
        };
      }
    } catch (error) { /* bozuk kayıt: sıfırdan başla */ }
    return { done: [], checks: {} };
  }

  function saveState() {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) { /* kota dolu olabilir */ }
  }

  const escapeHTML = (value) => String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const MATH = window.MATEMATIK_MATH || null;
  const typeset = (segment) => {
    if (MATH && typeof MATH.render === 'function') {
      try { return MATH.render(segment); } catch (error) { /* dizgi hatasında düz metne dön */ }
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

  const weekById = (id) => CONTENT.weeks.find((week) => week.id === Number(id)) || null;
  const bookOf = (id) => KITAP.weeks[Number(id)] || null;

  function renderWeekList() {
    const list = document.getElementById('mathWeekList');
    if (!list) return;
    const groups = CONTENT.themes.map((theme) => {
      const weeks = CONTENT.weeks.filter((week) => week.theme === theme.id);
      const buttons = weeks.map((week) => {
        const done = state.done.includes(week.id);
        const exam = EXAM_BY_WEEK[week.id];
        return `<button type="button" class="math-week-btn${done ? ' is-done' : ''}" data-math-week="${week.id}">
          <span class="math-week-no">${week.id}</span>
          <span class="math-week-meta">
            <span class="math-week-topic">${escapeHTML(week.topic)}</span>
            <span class="math-week-date">${escapeHTML(week.date)}</span>
            ${exam ? `<span class="math-week-exam">1. sınav (${exam})</span>` : ''}
          </span>
        </button>`;
      }).join('');
      return `<div class="math-theme">
        <p class="math-theme-title"><span>${theme.no}. Tema</span>${escapeHTML(theme.short)}</p>
        <div class="math-week-list">${buttons}</div>
      </div>`;
    }).join('');
    list.innerHTML = groups;
    list.querySelectorAll('[data-math-week]').forEach((button) => {
      button.addEventListener('click', () => selectWeek(Number(button.dataset.mathWeek)));
    });
  }

  function renderProgress() {
    const bar = document.getElementById('mathProgressBar');
    const text = document.getElementById('mathProgressText');
    if (!bar || !text) return;
    const total = CONTENT.weeks.length;
    const done = state.done.length;
    bar.style.width = `${Math.round((done / total) * 100)}%`;
    text.textContent = `${done} / ${total} hafta tamamlandı`;
    const track = document.getElementById('mathProgressTrack');
    if (track) track.setAttribute('aria-valuenow', String(done));
  }

  /* ---------------- Bölüm parçaları ---------------- */

  function sceneFrame(scene, id) {
    if (!scene || !window.MATEMATIK_SAHNE2) return '';
    return `<div class="math-scene-frame">
      <div class="math-scene-stage" id="${id}-stage"></div>
      <div class="math-scene-controls" id="${id}-controls"></div>
    </div>
    <div class="math-scene-actions">
      <button type="button" id="${id}-reset">Başa al</button>
      <span class="math-scene-tip">Sürgüler çizimin altında; bazı noktaları doğrudan sürükleyebilirsin.</span>
    </div>`;
  }

  function figureBlock(figure) {
    if (!figure || !window.MATEMATIK_FIGURE) return '';
    const svg = window.MATEMATIK_FIGURE.render(figure.type, figure.options || {});
    return svg ? `<figure class="math-check-figure">${svg}</figure>` : '';
  }

  function boxesMarkup(boxes) {
    if (!Array.isArray(boxes) || !boxes.length) return '';
    return `<div class="math-knowledge">
      <p class="math-knowledge-title">BİLGİ KUTUSU</p>
      <div class="math-knowledge-grid">
        ${boxes.map((box) => `<div class="math-knowledge-box">
          <p class="math-knowledge-head">${rich(box.title)}</p>
          <p>${rich(box.body)}</p>
        </div>`).join('')}
      </div>
    </div>`;
  }

  function blocksMarkup(blocks, scenes) {
    if (!Array.isArray(blocks) || !blocks.length) return '';
    return blocks.map((block, index) => {
      const sceneId = `mathSceneInline-${scenes.week}-${scenes.stage}-${index}`;
      if (block.scene) scenes.list.push({ scene: block.scene, id: sceneId });
      return `<div class="math-block">
        <h4>${rich(block.heading)}</h4>
        ${(block.paragraphs || []).map((paragraph) => `<p>${rich(paragraph)}</p>`).join('')}
        ${block.scene ? sceneFrame(block.scene, sceneId) : ''}
        ${block.figure ? figureBlock(block.figure) : ''}
      </div>`;
    }).join('');
  }

  function stepsMarkup(steps, result) {
    if (!Array.isArray(steps) || !steps.length) return '';
    return `<ol class="math-example-steps">${steps.map((step) => `<li><strong>${rich(step.title)}:</strong> ${rich(step.body)}</li>`).join('')}</ol>
      ${result ? `<p class="math-example-answer"><span>Sonuç</span>${rich(result)}</p>` : ''}`;
  }

  function stageCard(week, stage, index, scenes) {
    const label = STAGE[stage.kind] || 'ETKİNLİK';
    const sceneId = `mathScene-${week.id}-${index}`;
    if (stage.scene) scenes.list.push({ scene: stage.scene, id: sceneId });
    const questions = (window.MATEMATIK_ETKINLIKLER
      ? window.MATEMATIK_ETKINLIKLER.forStage(week.id, index) : []);
    const questionHost = questions.length
      ? `<div class="math-etkinlik-list" id="mathQuestions-${week.id}-${index}"></div>`
      : '';
    return `<section class="math-card math-stage-card" data-kind="${stage.kind}" aria-labelledby="mathStage-${week.id}-${index}">
      <h3 id="mathStage-${week.id}-${index}"><span class="math-step">${index + 1}</span><span class="math-scene-kind">${label}</span><span class="math-scene-name">${rich(stage.title || '')}</span></h3>
      <p class="math-note">${STAGE_NOTE[stage.kind] || ''}</p>
      ${(stage.context || []).map((paragraph) => `<p class="math-stage-context">${rich(paragraph)}</p>`).join('')}
      ${stage.materials ? `<p class="math-materials"><strong>Malzeme:</strong> ${rich(stage.materials)}</p>` : ''}
      ${stage.intro ? stage.intro.map((paragraph) => `<p class="math-stage-context">${rich(paragraph)}</p>`).join('') : ''}
      ${blocksMarkup(stage.blocks, scenes)}
      ${boxesMarkup(stage.boxes)}
      ${stage.scene ? sceneFrame(stage.scene, sceneId) : ''}
      ${stage.figure ? figureBlock(stage.figure) : ''}
      ${stepsMarkup(stage.steps, stage.result)}
      ${questionHost}
    </section>`;
  }

  function performanceMarkup(week, performance) {
    if (!performance) return '';
    return `<section class="math-card math-performance">
      <h3><span class="math-step">★</span><span class="math-scene-kind">PERFORMANS GÖREVİ</span><span class="math-scene-name">${rich(performance.title)}</span></h3>
      ${(performance.context || []).map((paragraph) => `<p class="math-stage-context">${rich(paragraph)}</p>`).join('')}
      <p class="math-knowledge-title">YAPILACAKLAR</p>
      <ul class="math-points">${(performance.tasks || []).map((task) => `<li>${rich(task)}</li>`).join('')}</ul>
      <p class="math-knowledge-title">DEĞERLENDİRME ÖLÇÜTLERİ</p>
      <ul class="math-points">${(performance.criteria || []).map((item) => `<li>${rich(item)}</li>`).join('')}</ul>
    </section>`;
  }

  function learnedMarkup(week, book) {
    const titles = (book.stages || []).map((stage, index) => `<li><strong>${index + 1}. ${STAGE[stage.kind] || 'ETKİNLİK'}:</strong> ${rich(stage.title || '')}</li>`).join('');
    const boxes = (book.stages || []).flatMap((stage) => (stage.boxes || []).map((box) => box.title));
    return `<section class="math-card math-learned">
      <h3><span class="math-step">✓</span><span class="math-scene-kind">NELER ÖĞRENDİK?</span><span class="math-scene-name">Bu haftanın kazanımları</span></h3>
      <ol class="math-points math-learned-list">${titles}</ol>
      ${boxes.length ? `<p class="math-note">Bu haftanın bilgi kutuları: ${boxes.map((title) => rich(title)).join(' · ')}</p>` : ''}
      <p class="math-note" data-math-week-score="${week.id}"></p>
    </section>`;
  }

  function examMarkup(week, book) {
    if (!book.exam) return '';
    const hasQuestions = (window.MATEMATIK_ETKINLIKLER
      ? window.MATEMATIK_ETKINLIKLER.examActivities(week.id).length : 0);
    return `<section class="math-card math-exam">
      <h3><span class="math-step">◆</span><span class="math-scene-kind">TEMA ÖLÇME</span><span class="math-scene-name">${rich(book.exam.title)}</span></h3>
      <p class="math-note">${rich(book.exam.note || '')}</p>
      ${hasQuestions ? `<div class="math-etkinlik-list" id="mathExam-${week.id}"></div>` : ''}
    </section>`;
  }

  function termsMarkup(week) {
    const terms = Array.isArray(week.terms) ? week.terms : [];
    if (!terms.length) return '';
    const cards = terms.map((item) => {
      const figure = item.visual && window.MATEMATIK_FIGURE
        ? `<div class="math-term-figure">${window.MATEMATIK_FIGURE.render(item.visual, item.visualOptions || {})}</div>` : '';
      return `<article class="math-term-card">
        <div class="math-term-head">
          <h4>${rich(item.word)}</h4>
          ${item.where ? `<p class="math-term-where">Nerede karşımıza çıkar: ${rich(item.where)}</p>` : ''}
        </div>
        <p class="math-term-def">${rich(item.definition)}</p>
        ${figure}
      </article>`;
    }).join('');
    return `<section class="math-card" aria-labelledby="mathTermsTitle">
      <h3 id="mathTermsTitle"><span class="math-step">T</span>Terimler, tek tek</h3>
      <p class="math-note">Her terim kendi kartında: adı, tanımı ve nerede karşımıza çıktığı.</p>
      <div class="math-terms">${cards}</div>
    </section>`;
  }

  function weekMarkup(week, book) {
    const theme = THEME_BY_ID.get(week.theme);
    const exam = EXAM_BY_WEEK[week.id];
    const done = state.done.includes(week.id);
    const scenes = { week: week.id, stage: 0, list: [] };
    const stages = (book.stages || []).map((stage, index) => {
      scenes.stage = index;
      return stageCard(week, stage, index, scenes);
    }).join('');
    return {
      html: `
      <article class="math-week-head">
        <div class="tag">${escapeHTML(theme ? `${theme.no}. TEMA · ${theme.short.toUpperCase()}` : 'MATEMATİK')}</div>
        <h2 id="mathWeekTitle" tabindex="-1">${week.id}. hafta · ${escapeHTML(week.topic)}</h2>
        <p class="math-week-sub">${escapeHTML(week.date)} · haftada 5 ders saati</p>
        <p class="math-week-book">Kitaptaki akış: ${escapeHTML(book.bookTopic || '')}</p>
        ${exam ? `<p class="math-week-exam" style="margin:8px 0 0">1. Sınav: ${escapeHTML(exam)}</p>` : ''}
      </article>
      ${stages}
      ${performanceMarkup(week, book.performance)}
      ${learnedMarkup(week, book)}
      ${examMarkup(week, book)}
      ${termsMarkup(week)}
      <section class="math-card">
        <div class="math-done">
          <p>Haftayı bitirdiysen işaretle; ilerleme bu tarayıcıya kaydedilir.</p>
          <button type="button" id="mathDoneBtn" class="${done ? 'is-done' : ''}">${done ? 'Tamamlandı ✓' : 'Bu haftayı tamamladım'}</button>
        </div>
      </section>`,
      scenes: scenes.list,
    };
  }

  /* ---------------- Bağlama ---------------- */

  function mountScene(entry) {
    const stage = document.getElementById(`${entry.id}-stage`);
    const controls = document.getElementById(`${entry.id}-controls`);
    const reset = document.getElementById(`${entry.id}-reset`);
    if (!stage || !window.MATEMATIK_SAHNE2) return;
    const instance = window.MATEMATIK_SAHNE2.mount(stage, controls, entry.scene);
    if (reset && instance) reset.addEventListener('click', () => instance.reset());
  }

  function weekScore(week) {
    const activitySource = window.MATEMATIK_ETKINLIKLER;
    const engine = window.MATEMATIK_ETKINLIK;
    if (!activitySource || !engine) return '';
    const activities = activitySource.forWeek(week.id);
    const answered = engine.answeredCount(activities);
    return `${answered} / ${activities.length} etkinliği açıklamasıyla tamamladın.`;
  }

  function bindQuestions(week) {
    const source = window.MATEMATIK_ETKINLIKLER;
    const engine = window.MATEMATIK_ETKINLIK;
    if (!source || !engine) return;
    (bookOf(week.id).stages || []).forEach((stage, index) => {
      const host = document.getElementById(`mathQuestions-${week.id}-${index}`);
      const items = source.forStage(week.id, index);
      if (!host || !items.length) return;
      engine.mountQuestions(host, items);
    });
    const examHost = document.getElementById(`mathExam-${week.id}`);
    const examItems = source.examActivities(week.id);
    if (examHost && examItems.length) engine.mountQuestions(examHost, examItems);
    const score = document.querySelector(`[data-math-week-score="${week.id}"]`);
    if (score) score.textContent = weekScore(week);
  }

  function bindDone(week) {
    const button = document.getElementById('mathDoneBtn');
    if (!button) return;
    button.addEventListener('click', () => {
      const index = state.done.indexOf(week.id);
      if (index >= 0) state.done.splice(index, 1);
      else state.done.push(week.id);
      state.done.sort((a, b) => a - b);
      saveState();
      renderWeekList();
      renderProgress();
      button.classList.toggle('is-done', state.done.includes(week.id));
      button.textContent = state.done.includes(week.id) ? 'Tamamlandı ✓' : 'Bu haftayı tamamladım';
    });
  }

  function selectWeek(id) {
    const week = weekById(id);
    if (!week) return;
    const book = bookOf(week.id);
    if (!book) return;
    currentWeek = week.id;
    const list = document.getElementById('mathWeekList');
    if (list) {
      list.querySelectorAll('[data-math-week]').forEach((button) => {
        const active = Number(button.dataset.mathWeek) === week.id;
        button.classList.toggle('is-active', active);
        if (active) button.setAttribute('aria-current', 'step');
        else button.removeAttribute('aria-current');
      });
    }
    const prompt = document.getElementById('mathWeekPrompt');
    const content = document.getElementById('mathWeekContent');
    if (!content) return;
    if (prompt) prompt.hidden = true;
    content.hidden = false;
    const markup = weekMarkup(week, book);
    content.innerHTML = markup.html;
    markup.scenes.forEach(mountScene);
    bindQuestions(week);
    bindDone(week);
    const title = document.getElementById('mathWeekTitle');
    if (title) title.focus({ preventScroll: true });
  }

  function render() {
    renderWeekList();
    renderProgress();
    if (currentWeek) selectWeek(currentWeek);
  }

  window.MATEMATIK = Object.freeze({
    render,
    selectWeek,
    weekById,
    getState: () => JSON.parse(JSON.stringify(state)),
    resetProgress() {
      state = { done: [], checks: {} };
      saveState();
      renderWeekList();
      renderProgress();
    },
  });
})();
