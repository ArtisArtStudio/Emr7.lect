/* 7. sınıf matematik alanı — haftalık konu anlatımı, etkileşimli keşif sahneleri, kısa kontrol ve etkinlikler. */
(() => {
  'use strict';

  const CONTENT = window.MATEMATIK_CONTENT;
  if (!CONTENT) return;

  const STORAGE_KEY = 'emr7lect.matematik.v1';
  const EXAM_BY_WEEK = Object.freeze({ 8: '5 Kasım 2026' });
  const THEME_BY_ID = new Map(CONTENT.themes.map((theme) => [theme.id, theme]));

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

  const escapeHTML = (value) => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // Öğrenci metinleri dizgi motorundan geçer: $\frac{2}{3}$ gibi ifadeler gerçek kesre dönüşür.
  const MATH = window.MATEMATIK_MATH || null;
  const typeset = (segment) => {
    if (MATH && typeof MATH.render === 'function') {
      try { return MATH.render(segment); } catch (error) { /* dizgi hatasında düz metne dön */ }
    }
    return escapeHTML(segment);
  };

  function rich(value) {
    const text = value == null ? '' : String(value);
    // **kalın** vurgusu desteklenir; matematik parçaları dizgi motorundan geçer.
    return text.split(/(\*\*[^*]+\*\*)/g).map((segment) => (
      segment.length > 4 && segment.startsWith('**') && segment.endsWith('**')
        ? `<strong>${typeset(segment.slice(2, -2))}</strong>`
        : typeset(segment)
    )).join('');
  }

  const weekById = (id) => CONTENT.weeks.find((week) => week.id === Number(id)) || null;

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

  function sceneCard(scene, index, total) {
    return `<section class="math-card math-scene-card" aria-labelledby="mathSceneTitle-${index}">
      <h3 id="mathSceneTitle-${index}"><span class="math-step">2</span><span class="math-scene-kind">Keşif</span><span class="math-scene-name">${escapeHTML(scene.title)}</span>${total > 1 ? `<span class="math-scene-order">${index + 1}/${total}</span>` : ''}</h3>
      <p class="math-note">${rich(scene.hint || '')}</p>
      <div class="math-scene-frame">
        <div class="math-scene-stage" id="mathSceneStage-${index}"></div>
        <div class="math-scene-controls" id="mathSceneControls-${index}"></div>
      </div>
      <div class="math-scene-actions">
        <button type="button" id="mathSceneReset-${index}">Başa al</button>
        <span class="math-scene-tip">Sürgüler çizimin altında; bazı noktaları doğrudan sürükleyebilirsin.</span>
      </div>
    </section>`;
  }

  function scenesMarkup(week) {
    const scenes = Array.isArray(week.scenes) ? week.scenes : [];
    if (!scenes.length) return '';
    return scenes.map((scene, index) => sceneCard(scene, index, scenes.length)).join('');
  }

  function checksMarkup(week) {
    return week.checks.map((item, index) => {
      const key = `${week.id}-${index}`;
      const saved = state.checks[key];
      const options = item.options.map((option, optionIndex) => {
        const classes = ['math-option'];
        if (saved && saved.solved && optionIndex === item.correct) classes.push('is-correct');
        if (saved && saved.wrong === optionIndex) classes.push('is-wrong');
        return `<button type="button" class="${classes.join(' ')}" data-check="${key}" data-option="${optionIndex}"${saved && saved.solved ? ' disabled' : ''}>
          <span class="key">${'ABCD'[optionIndex]}</span><span>${rich(option)}</span>
        </button>`;
      }).join('');
      const feedback = saved && saved.solved
        ? `<p class="math-feedback" data-state="correct" data-feedback="${key}">${rich(item.explain)}</p>`
        : saved && Number.isFinite(saved.wrong)
          ? `<p class="math-feedback" data-state="hint" data-feedback="${key}">İpucu: ${rich(item.hint)}</p>`
          : `<p class="math-feedback" data-feedback="${key}" hidden></p>`;
      const figure = item.figure && window.MATEMATIK_FIGURE
        ? `<figure class="math-check-figure">${window.MATEMATIK_FIGURE.render(item.figure, {})}</figure>` : '';
      return `<div class="math-check-q" data-question="${key}">
        <p class="prompt">${index + 1}. ${rich(item.prompt)}</p>
        ${figure}
        <div class="math-options">${options}</div>
        ${feedback}
      </div>`;
    }).join('');
  }

  function termsMarkup(week) {
    return week.terms.map((item) => {
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
  }

  function activitiesMarkup(week) {
    return `<section class="math-card math-activities" aria-labelledby="mathActivitiesTitle">
        <h3 id="mathActivitiesTitle"><span class="math-step">7</span>Bu haftanın etkinlikleri</h3>
        <p class="math-note">Her etkinlikte önce seçeneği işaretle, sonra seçiminin gerekçesini yaz. Açıklama zorunlu; değerlendirme yapay zekâ ile yapılır ve doğru şık gösterilmez.</p>
        <div id="mathActivities" data-week="${week.id}"></div>
      </section>`;
  }

  function examplesMarkup(week) {
    const examples = Array.isArray(week.examples) ? week.examples : [];
    if (!examples.length) return '';
    const cards = examples.map((item, index) => `<article class="math-example">
        <h4><span class="math-example-no">Örnek ${index + 1}</span>${rich(item.title)}</h4>
        <ol class="math-example-steps">${item.steps.map((step) => `<li>${rich(step)}</li>`).join('')}</ol>
        <p class="math-example-answer"><span>Sonuç</span>${rich(item.answer)}</p>
      </article>`).join('');
    return `<section class="math-card" aria-labelledby="mathExamplesTitle">
        <h3 id="mathExamplesTitle"><span class="math-step">3</span>Çözümlü örnekler</h3>
        ${cards}
      </section>`;
  }

  function weekMarkup(week) {
    const theme = THEME_BY_ID.get(week.theme);
    const exam = EXAM_BY_WEEK[week.id];
    const done = state.done.includes(week.id);
    return `
      <article class="math-week-head">
        <div class="tag">${escapeHTML(theme ? `${theme.no}. TEMA · ${theme.short.toUpperCase()}` : 'MATEMATİK')}</div>
        <h2 id="mathWeekTitle">${week.id}. hafta · ${escapeHTML(week.topic)}</h2>
        <p class="math-week-sub">${escapeHTML(week.date)} · haftada 5 ders saati · konu anlatımı, keşif, kısa kontrol</p>
        ${exam ? `<p class="math-week-exam" style="margin:8px 0 0">1. Sınav: ${escapeHTML(exam)}</p>` : ''}
      </article>

      <section class="math-card math-summary" aria-labelledby="mathSummaryTitle">
        <h3 id="mathSummaryTitle"><span class="math-step">1</span>Konu anlatımı</h3>
        ${week.summary.map((paragraph) => `<p>${rich(paragraph)}</p>`).join('')}
      </section>

      ${scenesMarkup(week)}

      ${examplesMarkup(week)}

      <section class="math-card" aria-labelledby="mathPointsTitle">
        <h3 id="mathPointsTitle"><span class="math-step">4</span>Ana noktalar</h3>
        <ul class="math-points">${week.points.map((point) => `<li>${rich(point)}</li>`).join('')}</ul>
      </section>

      <section class="math-card" aria-labelledby="mathTermsTitle">
        <h3 id="mathTermsTitle"><span class="math-step">5</span>Terimler, tek tek</h3>
        <div class="math-terms">${termsMarkup(week)}</div>
      </section>

      <section class="math-card" aria-labelledby="mathCheckTitle">
        <h3 id="mathCheckTitle"><span class="math-step">6</span>Kısa kontrol</h3>
        <div class="math-check">${checksMarkup(week)}</div>
      </section>

      ${activitiesMarkup(week)}

      <section class="math-card">
        <div class="math-done">
          <p>Haftayı bitirdiysen işaretle; ilerleme bu tarayıcıya kaydedilir.</p>
          <button type="button" id="mathDoneBtn" class="${done ? 'is-done' : ''}">${done ? 'Tamamlandı ✓' : 'Bu haftayı tamamladım'}</button>
        </div>
      </section>`;
  }

  function bindChecks(week) {
    document.querySelectorAll('[data-check]').forEach((button) => {
      button.addEventListener('click', () => {
        const [weekId, index] = button.dataset.check.split('-').map(Number);
        if (weekId !== week.id) return;
        const item = week.checks[index];
        const chosen = Number(button.dataset.option);
        const key = button.dataset.check;
        if (chosen === item.correct) {
          state.checks[key] = { solved: true };
          saveState();
          document.querySelectorAll(`[data-check="${key}"]`).forEach((optionButton) => {
            optionButton.disabled = true;
            if (Number(optionButton.dataset.option) === item.correct) optionButton.classList.add('is-correct');
          });
          const feedback = document.querySelector(`[data-feedback="${key}"]`);
          if (feedback) {
            feedback.hidden = false;
            feedback.dataset.state = 'correct';
            feedback.innerHTML = rich(item.explain);
          }
        } else {
          state.checks[key] = { wrong: chosen };
          saveState();
          button.classList.add('is-wrong');
          const feedback = document.querySelector(`[data-feedback="${key}"]`);
          if (feedback) {
            feedback.hidden = false;
            feedback.dataset.state = 'hint';
            feedback.innerHTML = `İpucu: ${rich(item.hint)}`;
          }
        }
      });
    });
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

  function bindScene(week, index) {
    const stage = document.getElementById(`mathSceneStage-${index}`);
    const controls = document.getElementById(`mathSceneControls-${index}`);
    const reset = document.getElementById(`mathSceneReset-${index}`);
    if (!stage || !window.MATEMATIK_SAHNE2) return;
    const scene = (week.scenes || [])[index];
    if (!scene) return;
    const instance = window.MATEMATIK_SAHNE2.mount(stage, controls, scene);
    if (reset && instance) reset.addEventListener('click', () => instance.reset());
  }

  function selectWeek(id) {
    const week = weekById(id);
    if (!week) return;
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
    content.innerHTML = weekMarkup(week);
    (week.scenes || []).forEach((scene, index) => bindScene(week, index));
    bindChecks(week);
    bindDone(week);
    if (window.MATEMATIK_ETKINLIK) window.MATEMATIK_ETKINLIK.mount(document.getElementById('mathActivities'), week.id);
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
