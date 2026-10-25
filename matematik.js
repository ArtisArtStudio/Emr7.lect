/* 7. sınıf matematik alanı — haftalık konu anlatımı, GeoGebra keşfi, kısa kontrol ve görevler. */
(() => {
  'use strict';

  const CONTENT = window.MATEMATIK_CONTENT;
  if (!CONTENT) return;

  const STORAGE_KEY = 'emr7lect.matematik.v1';
  const EXAM_BY_WEEK = Object.freeze({ 8: '5 Kasım 2026' });
  const LOCAL_SCENES = new Set(['ortadikme', 'yansima']);
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
          tasks: parsed.tasks && typeof parsed.tasks === 'object' ? parsed.tasks : {},
        };
      }
    } catch (error) { /* bozuk kayıt: sıfırdan başla */ }
    return { done: [], checks: {}, tasks: {} };
  }

  function saveState() {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) { /* kota dolu olabilir */ }
  }

  const escapeHTML = (value) => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

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

  function sceneMarkup(week) {
    if (!week.scene) return '';
    const scene = week.scene;
    return `<section class="math-card" aria-labelledby="mathSceneTitle">
      <h3 id="mathSceneTitle"><span class="math-step">Keşif</span>${escapeHTML(scene.title)}</h3>
      <p class="math-note">${escapeHTML(scene.hint || '')}</p>
      <div class="math-scene-host" id="mathSceneHost" data-scene-type="${escapeHTML(scene.type)}"></div>
      <div class="math-scene-actions">
        <button type="button" class="primary" id="mathSceneStart" data-scene="${escapeHTML(scene.type)}">Etkileşimli sahneyi aç</button>
        <button type="button" id="mathSceneReset" disabled>Sıfırla</button>
      </div>
      <p class="math-status" id="mathSceneStatus" data-state="idle">Sahne henüz açılmadı; açtığında noktaları sürükleyebilirsin.</p>
      <p class="math-credit">Geogebra® — geogebra.org · ticari olmayan kullanım, atıf ile.</p>
    </section>`;
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
          <span class="key">${'ABCD'[optionIndex]}</span><span>${escapeHTML(option)}</span>
        </button>`;
      }).join('');
      const feedback = saved && saved.solved
        ? `<p class="math-feedback" data-state="correct" data-feedback="${key}">${escapeHTML(item.explain)}</p>`
        : saved && Number.isFinite(saved.wrong)
          ? `<p class="math-feedback" data-state="hint" data-feedback="${key}">İpucu: ${escapeHTML(item.hint)}</p>`
          : `<p class="math-feedback" data-feedback="${key}" hidden></p>`;
      return `<div class="math-check-q" data-question="${key}">
        <p class="prompt">${index + 1}. ${escapeHTML(item.prompt)}</p>
        <div class="math-options">${options}</div>
        ${feedback}
      </div>`;
    }).join('');
  }

  function tasksMarkup(week) {
    return week.tasks.map((task, index) => {
      const key = `${week.id}-${index}`;
      const checked = Boolean(state.tasks[key]);
      return `<li class="math-task">
        <input type="checkbox" id="mathTask-${key}" data-task="${key}"${checked ? ' checked' : ''}>
        <label for="mathTask-${key}">${escapeHTML(task)}</label>
      </li>`;
    }).join('');
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
        ${week.summary.map((paragraph) => `<p>${paragraph}</p>`).join('')}
      </section>

      <section class="math-card" aria-labelledby="mathPointsTitle">
        <h3 id="mathPointsTitle"><span class="math-step">2</span>Ana noktalar</h3>
        <ul class="math-points">${week.points.map((point) => `<li>${escapeHTML(point)}</li>`).join('')}</ul>
      </section>

      <section class="math-card" aria-labelledby="mathTermsTitle">
        <h3 id="mathTermsTitle"><span class="math-step">3</span>Kavramlar</h3>
        <dl class="math-terms">${week.terms.map((item) => `<div><dt>${escapeHTML(item.word)}</dt><dd>${escapeHTML(item.definition)}</dd></div>`).join('')}</dl>
      </section>

      ${sceneMarkup(week)}

      <section class="math-card" aria-labelledby="mathCheckTitle">
        <h3 id="mathCheckTitle"><span class="math-step">4</span>Kısa kontrol</h3>
        <div class="math-check">${checksMarkup(week)}</div>
      </section>

      <section class="math-card" aria-labelledby="mathTasksTitle">
        <h3 id="mathTasksTitle"><span class="math-step">5</span>Bu haftanın görevleri</h3>
        <ul class="math-tasks">${tasksMarkup(week)}</ul>
      </section>

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
            feedback.textContent = item.explain;
          }
        } else {
          state.checks[key] = { wrong: chosen };
          saveState();
          button.classList.add('is-wrong');
          const feedback = document.querySelector(`[data-feedback="${key}"]`);
          if (feedback) {
            feedback.hidden = false;
            feedback.dataset.state = 'hint';
            feedback.textContent = `İpucu: ${item.hint}`;
          }
        }
      });
    });
  }

  function bindTasks(week) {
    document.querySelectorAll('[data-task]').forEach((input) => {
      input.addEventListener('change', () => {
        state.tasks[input.dataset.task] = input.checked;
        saveState();
        if (!input.checked) delete state.tasks[input.dataset.task];
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

  function localSceneKey(week) {
    return LOCAL_SCENES.has(week.scene && week.scene.type) ? week.scene.type : null;
  }

  function bindScene(week) {
    const start = document.getElementById('mathSceneStart');
    const reset = document.getElementById('mathSceneReset');
    const host = document.getElementById('mathSceneHost');
    const status = document.getElementById('mathSceneStatus');
    if (!start || !host || !status) return;

    const setStatus = (stateName, text) => {
      status.dataset.state = stateName;
      status.textContent = text;
    };

    let adapter = null;
    let mounted = false;

    const mountLocal = (reason) => {
      const key = localSceneKey(week);
      if (!key || !window.MATEMATIK_SAHNE) {
        setStatus('failed', `Etkileşimli sahne açılamadı (${reason}). Konu anlatımı ve kısa kontrol ile devam edebilirsin.`);
        return;
      }
      const local = window.MATEMATIK_SAHNE.mount(host, key);
      adapter = {
        show() {
          if (typeof local.setBisector === 'function') local.setBisector(true);
          if (typeof local.setImage === 'function') local.setImage(true);
          setStatus('local', 'Yerel yedek sahne açık: noktaları parmakla sürükle, ok tuşları da çalışır.');
          return true;
        },
        reset() { local.reset(); setStatus('local', 'Yerel sahne başa alındı.'); },
      };
      setStatus('local', `GeoGebra açılamadı (${reason}). Yerel sahne hazır.`);
      start.disabled = false;
      reset.disabled = false;
    };

    start.addEventListener('click', () => {
      if (mounted) return;
      mounted = true;
      start.disabled = true;
      const GGB = window.MATEMATIK_GEOGEBRA;
      if (!GGB || !week.scene) { mountLocal('yükleyici yok'); return; }
      host.classList.add('is-loading');
      setStatus('idle', 'GeoGebra yükleniyor…');
      GGB.createApplet(host, {
        appName: week.scene.app || 'graphing',
        commands: week.scene.commands || [],
        hidden: week.scene.hidden || [],
        bounds: week.scene.bounds,
        onStatus: (stateName, payload) => {
          if (stateName === 'ready') {
            host.classList.remove('is-loading');
            setStatus('ready', `Hazır: ${payload.count} nesne çizildi · yalnız grafik görünümü.`);
          }
          if (stateName === 'failed') {
            host.classList.remove('is-loading');
            setStatus('failed', `GeoGebra açılamadı (${payload.reason}).`);
          }
        },
      }).then((result) => {
        host.classList.remove('is-loading');
        const api = result.api;
        const hidden = (week.scene.hidden || [])[0];
        adapter = {
          show() {
            if (!hidden) return true;
            try { api.setVisible(hidden, true); } catch (error) { return false; }
            setStatus('ready', 'İnşa açıldı; noktaları sürükleyebilirsin.');
            return true;
          },
          reset() {
            if (!hidden) return;
            try { api.setVisible(hidden, false); } catch (error) { /* yoksay */ }
          },
        };
        start.disabled = false;
        reset.disabled = false;
        start.textContent = hidden ? 'İnşayı göster' : 'Sahne hazır';
        setStatus('ready', `Hazır: ${result.count} nesne çizildi · yalnız grafik görünümü.`);
      }).catch((error) => {
        host.classList.remove('is-loading');
        mounted = false;
        mountLocal(error.message || 'bağlantı');
      });
    });

    reset.addEventListener('click', () => { if (adapter) adapter.reset(); });
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
    bindScene(week);
    bindChecks(week);
    bindTasks(week);
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
      state = { done: [], checks: {}, tasks: {} };
      saveState();
      renderWeekList();
      renderProgress();
    },
  });
})();
