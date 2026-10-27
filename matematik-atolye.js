/* Matematik atölyesi — görünüm sorularının etkileşimli parçaları.
   Buradaki görevler yazılı açıklama istemez; öğrenci sayı yazar, kare boyar,
   eşleştirir ya da doğru-yanlış işaretler. Cevap anahtarı ekranda hiç görünmez;
   öğrenciye yalnızca “hangi yön hatalı” bilgisi döner.
   Üç cevap hakkı, yapay zekâ kontrolü ve şifreyle sıfırlama bu dosyadadır. */
(() => {
  'use strict';

  const SAHNE = window.MATEMATIK_SAHNE2;
  if (!SAHNE) return;

  const STORAGE_KEY = 'emr7lect.matematik.atolye.v1';
  const RESET_PASSWORD = 'Alone815185';
  const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
  const DEFAULT_MODEL = 'openai/gpt-oss-20b';
  const VIEW_LABEL = { on: 'ön', arka: 'arka', sag: 'sağ', sol: 'sol', ust: 'üst', alt: 'alt' };

  const escapeHTML = (value) => String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* ---------------- Kayıt ---------------- */

  const store = {
    data: {},
    load() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        if (parsed && typeof parsed === 'object') this.data = parsed;
      } catch (error) { this.data = {}; }
    },
    save() {
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data)); } catch (error) { /* kota */ }
    },
    item(id) {
      if (!this.data[id] || typeof this.data[id] !== 'object') {
        this.data[id] = { solved: [], attempts: {}, answers: {}, grids: {}, unlocked: [], done: false };
      }
      const entry = this.data[id];
      if (!Array.isArray(entry.solved)) entry.solved = [];
      if (!entry.attempts || typeof entry.attempts !== 'object') entry.attempts = {};
      if (!entry.answers || typeof entry.answers !== 'object') entry.answers = {};
      if (!entry.grids || typeof entry.grids !== 'object') entry.grids = {};
      if (!Array.isArray(entry.unlocked)) entry.unlocked = [];
      return entry;
    },
  };
  store.load();

  /* ---------------- Yardımcılar ---------------- */

  const cellsOf = (heights) => SAHNE.gorunumOf(heights);

  function countCells(cells) {
    return (cells || []).reduce((total, row) => total + row.filter(Boolean).length, 0);
  }

  function inlineSvg(type, values, extraClass) {
    const body = SAHNE.render(type, values);
    if (!body) return '';
    return `<svg class="atolye-svg${extraClass ? ` ${extraClass}` : ''}" viewBox="0 0 ${SAHNE.width} ${SAHNE.height}" role="img" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  }

  /* Boş kareyi kırparak desen karşılaştırması: öğrenci ızgaranın herhangi bir
     yerine çizebilir, desen aynıysa doğru sayılır. */
  function normalize(cells) {
    const rows = [];
    cells.forEach((row, r) => row.forEach((on, c) => { if (on) rows.push([r, c]); }));
    if (!rows.length) return '';
    const minR = Math.min(...rows.map((pair) => pair[0]));
    const maxR = Math.max(...rows.map((pair) => pair[0]));
    const minC = Math.min(...rows.map((pair) => pair[1]));
    const maxC = Math.max(...rows.map((pair) => pair[1]));
    const out = [];
    for (let r = minR; r <= maxR; r += 1) {
      let line = '';
      for (let c = minC; c <= maxC; c += 1) line += cells[r][c] ? '#' : '.';
      out.push(line);
    }
    return out.join('/');
  }

  const mirror = (cells) => cells.map((row) => row.slice().reverse());

  /* ---------------- Sahne yerleştirme ---------------- */

  function mountScene(host, controls, spec, onState) {
    if (!host || !spec) return null;
    return SAHNE.mount(host, controls, Object.assign({}, spec, {
      onChange: (state) => { if (onState) onState(state); },
    }));
  }

  /* Döndürülebilir görev: GeoGebra varsa cisim parmakla döner; yoksa aynı yapı
     yerel çizimle, döndürme sürgüsüyle açılır. İki motor da aynı `set` arayüzünü verir. */
  function mountEngine(host, controls, item, onState) {
    const GG = window.MATEMATIK_GEOGEBRA;
    const geoScene = item.geoScene;
    const canGeo = Boolean(GG && geoScene && GG.supports(geoScene) && GG.prefers());
    const holder = { instance: null };
    const proxy = {
      get state() { return holder.instance ? holder.instance.state : {}; },
      set(name, value) {
        if (holder.instance && typeof holder.instance.set === 'function') holder.instance.set(name, value);
      },
      reset() {
        if (holder.instance && typeof holder.instance.reset === 'function') holder.instance.reset();
      },
    };
    const mountLocal = () => {
      holder.instance = mountScene(host, controls, item.scene, onState);
      if (holder.instance && onState) onState(holder.instance.state);
      return proxy;
    };
    if (canGeo) {
      const made = GG.mount(host, controls, geoScene, { fallback: mountLocal, onStatus: () => {} });
      if (made) {
        holder.instance = made;
        /* 3B motorda sürgü değişimi sahne geri çağrısı vermez: soru numarası
           sürgüyle birlikte ilerlesin diye kontrolü buradan dinliyoruz. */
        if (controls) {
          controls.addEventListener('input', (event) => {
            if (!event.target || !event.target.matches('[data-scene-param]')) return;
            if (onState) onState(made.state);
          });
        }
        return proxy;
      }
    }
    return mountLocal();
  }

  /* ---------------- Cevap hakları ---------------- */

  function attemptsLeft(entry, key, limit) {
    if (!limit) return null;
    const used = Number(entry.attempts[key]) || 0;
    return Math.max(0, limit - used);
  }

  function useAttempt(entry, key) {
    entry.attempts[key] = (Number(entry.attempts[key]) || 0) + 1;
    store.save();
  }

  /* ---------------- Boyama ızgarası (8 × 8) ---------------- */

  function gridMarkup(id, label) {
    const cells = Array.from({ length: 64 }, (_, index) => (
      `<button type="button" class="atolye-cell" data-grid="${id}" data-index="${index}" aria-label="${label} ${index + 1}. kare" aria-pressed="false"></button>`
    )).join('');
    return `<div class="atolye-grid-block">
      <p class="atolye-grid-label">${label}</p>
      <div class="atolye-grid" data-grid-host="${id}" role="group" aria-label="${label} görünümünü 8 × 8 kareye çiz">${cells}</div>
      <div class="atolye-grid-actions">
        <button type="button" class="atolye-mini" data-grid-clear="${id}">Temizle</button>
        <button type="button" class="atolye-mini" data-grid-check="${id}">Bu görünümü kontrol et</button>
      </div>
      <p class="atolye-grid-note" data-grid-note="${id}" role="status" aria-live="polite"></p>
    </div>`;
  }

  function bindGrids(root, item, expected, onSolved) {
    const entry = store.item(item.id);
    const states = {};
    const n = 8;

    const readGrid = (key) => {
      const raw = entry.grids[key] || [];
      const cells = [];
      for (let r = 0; r < n; r += 1) {
        cells.push(Array.from({ length: n }, (_, c) => Boolean(raw[r * n + c])));
      }
      return cells;
    };

    const paintCell = (key, index, value) => {
      const raw = (entry.grids[key] || []).slice();
      while (raw.length < n * n) raw.push(0);
      raw[index] = value ? 1 : 0;
      entry.grids[key] = raw;
      const button = root.querySelector(`[data-grid="${key}"][data-index="${index}"]`);
      if (button) {
        button.classList.toggle('is-on', Boolean(value));
        button.setAttribute('aria-pressed', String(Boolean(value)));
      }
      store.save();
    };

    Object.keys(expected).forEach((key) => {
      const host = root.querySelector(`[data-grid-host="${key}"]`);
      if (!host) return;
      states[key] = readGrid(key);
      states[key].forEach((row, r) => row.forEach((on, c) => {
        if (!on) return;
        const button = host.querySelector(`[data-index="${r * n + c}"]`);
        if (button) { button.classList.add('is-on'); button.setAttribute('aria-pressed', 'true'); }
      }));

      let mode = null;
      const apply = (index) => {
        if (index == null) return;
        const value = mode;
        paintCell(key, index, value);
        cellsOfState(key)[Math.floor(index / n)][index % n] = value;
      };
      const cellsOfState = (k) => states[k];
      const start = (event) => {
        const target = event.target.closest('.atolye-cell');
        if (!target) return;
        event.preventDefault();
        const index = Number(target.dataset.index);
        mode = !states[key][Math.floor(index / n)][index % n];
        apply(index);
      };
      host.addEventListener('pointerdown', start);
      host.addEventListener('pointerover', (event) => {
        if (mode == null) return;
        const target = event.target.closest('.atolye-cell');
        if (!target) return;
        apply(Number(target.dataset.index));
      });
      window.addEventListener('pointerup', () => { mode = null; });
      host.addEventListener('pointerleave', () => { mode = null; });

      const clear = root.querySelector(`[data-grid-clear="${key}"]`);
      if (clear) {
        clear.addEventListener('click', () => {
          for (let index = 0; index < n * n; index += 1) {
            paintCell(key, index, false);
            states[key][Math.floor(index / n)][index % n] = false;
          }
          root.querySelector(`[data-grid-note="${key}"]`).textContent = '';
        });
      }

      const check = root.querySelector(`[data-grid-check="${key}"]`);
      if (check) {
        check.addEventListener('click', () => {
          const note = root.querySelector(`[data-grid-note="${key}"]`);
          const drawn = normalize(states[key]);
          const target = normalize(expected[key]);
          const label = VIEW_LABEL[key] || key;
          if (!drawn) {
            note.textContent = `${label} görünümü için hiç kare boyamadın.`;
            note.dataset.state = 'wrong';
            return;
          }
          if (drawn === target) {
            note.textContent = `${label} görünümü doğru.`;
            note.dataset.state = 'correct';
            if (!entry.solved.includes(item.id)) entry.solved.push(item.id);
            store.save();
            if (onSolved) onSolved();
            return;
          }
          if (drawn === normalize(mirror(expected[key]))) {
            note.textContent = `Kareler doğru ama ayna gibi: ${label} görünümünde sağ–sol yer değiştirmiş. Ters yönden bak.`;
            note.dataset.state = 'wrong';
            return;
          }
          note.textContent = `Kare sayısı ya da dizilişi tutmuyor. Cismi bir kez daha incele, dolu sütunları say.`;
          note.dataset.state = 'wrong';
        });
      }
    });
  }

  /* ---------------- Yapay zekâ kontrolü ---------------- */

  async function aiHint(item, values) {
    const apiKey = document.getElementById('apiKey')?.value?.trim?.() || '';
    if (!apiKey) throw Object.assign(new Error('missing-key'), { code: 'missing-key' });
    const model = document.getElementById('model')?.value || DEFAULT_MODEL;
    const lines = (item.views || []).map((view) => `${VIEW_LABEL[view]}: ${values[view] ?? '(boş)'}`).join(', ');
    const prompt = [
      'Öğrenci, eş küplerle kurulmuş bir yapının değişik yönlerden görünen kare sayılarını tahmin ediyor.',
      `Öğrencinin tahminleri — ${lines}.`,
      `Yapının yükseklik tablosu (satır = derinlik, sütun = genişlik): ${JSON.stringify(item.yapi)}.`,
      'Tahminleri yükseklik tablosundan yararlanarak denetle.',
      'Doğru sayıları ASLA yazma. Yalnızca hangi yönlerin hatalı olduğunu ve o yöne bakarken neye dikkat etmesi gerektiğini tek cümlede söyle.',
      'Yanıtı en fazla iki cümle tut.',
    ].join('\n');
    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: 'Sen bir matematik öğretmenisin. Cevabı vermeden, yalnızca hatayı ve dikkat edilecek noktayı söylersin.' },
          { role: 'user', content: prompt },
        ],
      }),
    });
    if (!response.ok) throw new Error(`Yapay zekâ yanıt vermedi (${response.status}).`);
    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || '';
    if (!text.trim()) throw new Error('Yapay zekâ boş yanıt döndürdü.');
    return text.trim();
  }

  /* ---------------- Görev 1–2: görünümde kaçar küp ---------------- */

  function sayimMarkup(item) {
    const views = item.views || ['on', 'arka', 'sag', 'sol', 'ust'];
    const inputs = views.map((view) => `<label class="atolye-field">
        <span>${VIEW_LABEL[view]}</span>
        <input type="number" inputmode="numeric" min="0" max="60" data-view="${view}" aria-label="${VIEW_LABEL[view]} görünümünde kaç küp">
      </label>`).join('');
    const shapeButtons = Array.from({ length: item.shapes || 5 }, (_, index) => (
      `<button type="button" class="atolye-shape" data-shape="${index + 1}">${index + 1}</button>`
    )).join('');
    const limit = Number(item.attempts) || 0;
    return `${item.title ? `<h4 class="atolye-title">${escapeHTML(item.title)}</h4>` : ''}
      ${item.intro ? `<p class="atolye-intro">${escapeHTML(item.intro)}</p>` : ''}
      <div class="math-scene-frame atolye-scene">
        <div class="math-scene-stage" data-scene-stage="${item.id}"></div>
        <div class="math-scene-controls" data-scene-controls="${item.id}"></div>
      </div>
      <div class="atolye-shapes" role="group" aria-label="Şekil seçimi">${shapeButtons}</div>
      <p class="atolye-prompt">Şekil <strong data-shape-no>1</strong>: bu yapı önden, arkadan, sağdan, soldan ve üstten bakıldığında <strong>kaçar küp</strong> görünür?</p>
      <div class="atolye-fields">${inputs}</div>
      <div class="atolye-actions">
        <button type="button" class="atolye-check" data-sayim-check="${item.id}">Kontrol et</button>
        ${item.ai ? `<button type="button" class="atolye-ai" data-sayim-ai="${item.id}">Yapay zekâ kontrolü</button>` : ''}
        ${limit ? `<span class="atolye-attempts" data-sayim-attempts="${item.id}">Kalan hak: ${limit}</span>` : ''}
      </div>
      <p class="atolye-feedback" data-sayim-feedback="${item.id}" role="status" aria-live="polite"></p>
      ${limit ? `<div class="atolye-lock">
        <label class="atolye-field atolye-field--password">
          <span>Şifre</span>
          <input type="password" data-sayim-password="${item.id}" autocomplete="off" aria-label="Cevap hakkını sıfırlama şifresi">
        </label>
        <button type="button" class="atolye-mini" data-sayim-reset="${item.id}">Hakları sıfırla</button>
        <span class="atolye-lock-note">Haklar şifreyle sıfırlanır; şifreyi öğretmen verir.</span>
      </div>` : ''}`;
  }

  function bindSayim(root, item) {
    const entry = store.item(item.id);
    const limit = Number(item.attempts) || 0;
    const views = item.views || ['on', 'arka', 'sag', 'sol', 'ust'];
    const stage = root.querySelector(`[data-scene-stage="${item.id}"]`);
    const controls = root.querySelector(`[data-scene-controls="${item.id}"]`);
    const feedback = root.querySelector(`[data-sayim-feedback="${item.id}"]`);
    const promptNo = root.querySelector('[data-shape-no]');
    let current = 1;

    const inputs = {};
    root.querySelectorAll('[data-view]').forEach((input) => { inputs[input.dataset.view] = input; });

    const expectedFor = (shape) => {
      const heights = SAHNE.yapiOfSet(item.set || 1, shape);
      const viewsMap = cellsOf(heights);
      const out = {};
      views.forEach((view) => { out[view] = countCells(viewsMap[view]); });
      return out;
    };

    const remember = () => {
      entry.answers[String(current)] = {};
      views.forEach((view) => { entry.answers[String(current)][view] = inputs[view] ? inputs[view].value : ''; });
      store.save();
    };

    const load = (shape) => {
      const saved = entry.answers[String(shape)] || {};
      views.forEach((view) => {
        if (inputs[view]) inputs[view].value = saved[view] == null ? '' : saved[view];
      });
      if (promptNo) promptNo.textContent = String(shape);
      root.querySelectorAll('[data-shape]').forEach((button) => {
        button.classList.toggle('is-active', Number(button.dataset.shape) === shape);
        button.classList.toggle('is-solved', entry.solved.includes(Number(button.dataset.shape)));
      });
      const left = attemptsLeft(entry, String(shape), limit);
      const badge = root.querySelector(`[data-sayim-attempts="${item.id}"]`);
      if (badge) badge.textContent = `Kalan hak: ${left}`;
      const check = root.querySelector(`[data-sayim-check="${item.id}"]`);
      if (check) check.disabled = Boolean(limit) && left === 0 && !entry.solved.includes(shape);
      feedback.textContent = '';
      feedback.dataset.state = '';
    };

    const instance = mountEngine(stage, controls, item, (state) => {
      const shape = Number(state.sekil) || 1;
      if (shape === current) return;
      remember();
      current = shape;
      load(shape);
    });

    root.querySelectorAll('[data-shape]').forEach((button) => {
      button.addEventListener('click', () => {
        const shape = Number(button.dataset.shape);
        if (shape === current) return;
        remember();
        current = shape;
        if (instance && typeof instance.set === 'function') instance.set('sekil', shape);
        load(shape);
      });
    });

    views.forEach((view) => {
      if (inputs[view]) inputs[view].addEventListener('input', remember);
    });

    const check = root.querySelector(`[data-sayim-check="${item.id}"]`);
    if (check) {
      check.addEventListener('click', () => {
        const expected = expectedFor(current);
        const empty = views.filter((view) => String(inputs[view].value).trim() === '');
        if (empty.length) {
          feedback.dataset.state = 'wrong';
          feedback.textContent = `Beş yönün hepsine sayı yaz: ${empty.map((view) => VIEW_LABEL[view]).join(', ')} boş kaldı.`;
          return;
        }
        const wrong = views.filter((view) => Number(inputs[view].value) !== expected[view]);
        if (!wrong.length) {
          if (!entry.solved.includes(current)) entry.solved.push(current);
          store.save();
          load(current);
          feedback.dataset.state = 'correct';
          feedback.textContent = `Şekil ${current}: beş yön de doğru. Sıradaki şekle geç.`;
          return;
        }
        if (limit) {
          useAttempt(entry, String(current));
          const left = attemptsLeft(entry, String(current), limit);
          feedback.dataset.state = left ? 'wrong' : 'locked';
          feedback.textContent = left
            ? `Hatalı yön var: ${wrong.map((view) => VIEW_LABEL[view]).join(', ')}. ${left} hakkın kaldı.`
            : `Hakkın kalmadı. Şifreyle sıfırlamadan yeni deneme yapılamaz.`;
          load(current);
          if (!left) {
            feedback.dataset.state = 'locked';
            feedback.textContent = 'Hakkın kalmadı. Şifreyle sıfırlamadan yeni deneme yapılamaz.';
            const button = root.querySelector(`[data-sayim-check="${item.id}"]`);
            if (button) button.disabled = true;
          }
          return;
        }
        feedback.dataset.state = 'wrong';
        feedback.textContent = `Hatalı yön var: ${wrong.map((view) => VIEW_LABEL[view]).join(', ')}. Sayıları yeniden denetle.`;
      });
    }

    const ai = root.querySelector(`[data-sayim-ai="${item.id}"]`);
    if (ai) {
      ai.addEventListener('click', async () => {
        const values = {};
        views.forEach((view) => { values[view] = String(inputs[view].value).trim() || '0'; });
        const previous = ai.textContent;
        ai.disabled = true;
        ai.textContent = 'Denetleniyor…';
        feedback.dataset.state = '';
        try {
          feedback.textContent = await aiHint(Object.assign({}, item, { yapi: SAHNE.yapiOfSet(item.set || 1, current) }), values);
        } catch (error) {
          const message = String(error?.message || error);
          feedback.dataset.state = 'wrong';
          feedback.textContent = error?.code === 'missing-key'
            ? 'Yapay zekâ kontrolü için anahtar gerekiyor; anahtar girilmedi.'
            : `Kontrol yapılamadı: ${message}`;
        } finally {
          ai.disabled = false;
          ai.textContent = previous;
        }
      });
    }

    const reset = root.querySelector(`[data-sayim-reset="${item.id}"]`);
    if (reset) {
      reset.addEventListener('click', () => {
        const field = root.querySelector(`[data-sayim-password="${item.id}"]`);
        if (String(field?.value || '') !== RESET_PASSWORD) {
          feedback.dataset.state = 'wrong';
          feedback.textContent = 'Şifre yanlış. Haklar sıfırlanmadı.';
          return;
        }
        entry.attempts = {};
        store.save();
        field.value = '';
        load(current);
        feedback.dataset.state = 'correct';
        feedback.textContent = 'Haklar sıfırlandı; her şekil için üç deneme yeniden açıldı.';
      });
    }

    load(1);
  }

  /* ---------------- Görev 3–4: 8 × 8 kareye çizim ---------------- */

  function cizimMarkup(item) {
    const grids = (item.views || ['on', 'arka', 'ust']).map((view) => gridMarkup(view, `${VIEW_LABEL[view]} görünüm`)).join('');
    return `${item.title ? `<h4 class="atolye-title">${escapeHTML(item.title)}</h4>` : ''}
      ${item.intro ? `<p class="atolye-intro">${escapeHTML(item.intro)}</p>` : ''}
      <div class="math-scene-frame atolye-scene atolye-scene--narrow">
        <div class="math-scene-stage" data-scene-stage="${item.id}"></div>
        <div class="math-scene-controls" data-scene-controls="${item.id}"></div>
      </div>
      <p class="atolye-hint">Fareyle karelerin üzerinden geçerek boya; aynı kareye yeniden dokununca temizlenir.</p>
      <div class="atolye-grids">${grids}</div>
      <p class="atolye-feedback" data-cizim-feedback="${item.id}" role="status" aria-live="polite"></p>`;
  }

  function bindCizim(root, item) {
    const entry = store.item(item.id);
    const heights = SAHNE.yapiOfSet(item.set || 1, item.sekil || 4);
    const viewsMap = cellsOf(heights);
    const expected = {};
    (item.views || ['on', 'arka', 'ust']).forEach((view) => { expected[view] = viewsMap[view]; });

    mountScene(root.querySelector(`[data-scene-stage="${item.id}"]`), root.querySelector(`[data-scene-controls="${item.id}"]`), item.scene, null);

    bindGrids(root, item, expected, () => {
      const feedback = root.querySelector(`[data-cizim-feedback="${item.id}"]`);
      if (feedback) {
        feedback.dataset.state = 'correct';
        feedback.textContent = 'Bir görünüm tamam. Öteki görünümleri de çiz.';
      }
    });
  }

  /* ---------------- Görev 5: en az küp + çizim + kilitli 3B ---------------- */

  function enazMarkup(item) {
    const gridList = Array.isArray(item.grids) ? item.grids : ['arka', 'sol', 'alt'];
    const grids = gridList.map((view) => gridMarkup(view, `${VIEW_LABEL[view]} görünüm`)).join('');
    return `${item.title ? `<h4 class="atolye-title">${escapeHTML(item.title)}</h4>` : ''}
      ${item.intro ? `<p class="atolye-intro">${escapeHTML(item.intro)}</p>` : ''}
      <div class="math-scene-frame atolye-scene"><div class="math-scene-stage" data-scene-stage="${item.id}"></div></div>
      <div class="atolye-actions">
        <label class="atolye-field atolye-field--wide">
          <span>Bu yapı için en az kaç küp gerekir?</span>
          <input type="number" inputmode="numeric" min="1" max="60" data-enaz-value="${item.id}">
        </label>
        <button type="button" class="atolye-check" data-enaz-check="${item.id}">Kontrol et</button>
      </div>
      <p class="atolye-feedback" data-enaz-feedback="${item.id}" role="status" aria-live="polite"></p>
      ${grids ? `<p class="atolye-hint">Şimdi aynı yapının ${gridList.map((view) => VIEW_LABEL[view]).join(', ')} görünümünü 8 × 8 kareye çiz.</p>
      <div class="atolye-grids">${grids}</div>` : ''}
      ${item.lock === false ? '' : `<div class="atolye-lock">
        <label class="atolye-field atolye-field--password">
          <span>Çözümün 3B gösterimi için şifre</span>
          <input type="password" data-enaz-password="${item.id}" autocomplete="off" aria-label="Çözümü açma şifresi">
        </label>
        <button type="button" class="atolye-mini" data-enaz-unlock="${item.id}">Çözümü göster</button>
        <span class="atolye-lock-note">Çözüm yalnız öğretmen şifresiyle açılır.</span>
      </div>`}
      <div class="atolye-solution" data-enaz-solution="${item.id}" hidden>
        <div class="math-scene-frame atolye-scene"><div class="math-scene-stage" data-enaz-stage="${item.id}"></div></div>
        <p class="atolye-solution-note" data-enaz-static="${item.id}"></p>
      </div>`;
  }

  function bindEnaz(root, item) {
    const entry = store.item(item.id);
    const feedback = root.querySelector(`[data-enaz-feedback="${item.id}"]`);
    const heights = item.yapi || [[3, 1, 2], [1, 2, 0]];
    const viewsMap = cellsOf(heights);
    const expected = {};
    (Array.isArray(item.grids) ? item.grids : ['arka', 'sol', 'alt']).forEach((view) => { expected[view] = viewsMap[view]; });

    mountScene(root.querySelector(`[data-scene-stage="${item.id}"]`), null, item.scene, null);

    const input = root.querySelector(`[data-enaz-value="${item.id}"]`);
    if (input && entry.answers.sayi) input.value = entry.answers.sayi;
    if (input) {
      input.addEventListener('input', () => { entry.answers.sayi = input.value; store.save(); });
    }

    const check = root.querySelector(`[data-enaz-check="${item.id}"]`);
    if (check) {
      check.addEventListener('click', () => {
        const value = Number(input?.value);
        if (!Number.isFinite(value) || String(input.value).trim() === '') {
          feedback.dataset.state = 'wrong';
          feedback.textContent = 'Önce en az küp sayısını yaz.';
          return;
        }
        if (value === Number(item.answer)) {
          feedback.dataset.state = 'correct';
          feedback.textContent = 'Doğru: en az bu kadar küp gerekir. Şimdi öteki yönlerin görünümünü çiz.';
        } else if (value > Number(item.answer)) {
          feedback.dataset.state = 'wrong';
          feedback.textContent = 'Fazla küp kullandın. Aynı sütunlarda daha az küple aynı görünüm elde edilebilir mi?';
        } else {
          feedback.dataset.state = 'wrong';
          feedback.textContent = 'Bu sayıda küp verilen görünümleri oluşturamazsın; bazı sütunlar istenen yüksekliğe ulaşmıyor.';
        }
      });
    }

    if (Object.keys(expected).length) bindGrids(root, item, expected, null);

    const unlock = root.querySelector(`[data-enaz-unlock="${item.id}"]`);
    if (unlock) {
      const reveal = () => {
        root.querySelector(`[data-enaz-solution="${item.id}"]`).hidden = false;
        const stage = root.querySelector(`[data-enaz-stage="${item.id}"]`);
        if (stage && !stage.dataset.mounted) {
          stage.dataset.mounted = '1';
          mountScene(stage, null, item.solution || { type: 'yapi-cozum' }, null);
        }
      };
      if (entry.unlocked.includes('solution')) reveal();
      unlock.addEventListener('click', () => {
        const field = root.querySelector(`[data-enaz-password="${item.id}"]`);
        if (String(field?.value || '') !== RESET_PASSWORD) {
          feedback.dataset.state = 'wrong';
          feedback.textContent = 'Şifre yanlış; çözüm açılmadı.';
          return;
        }
        field.value = '';
        if (!entry.unlocked.includes('solution')) entry.unlocked.push('solution');
        store.save();
        reveal();
        feedback.dataset.state = 'correct';
        feedback.textContent = 'Çözüm açıldı: 3B yapıyı inceleyip çizimini karşılaştır.';
      });
    }
  }

  /* ---------------- Görev 6: eşleştirme ---------------- */

  function eslestirmeMarkup(item) {
    const shapes = (item.shapes || ['A', 'B', 'C', 'D']).map((key, index) => `<figure class="atolye-shape-card">
        <figcaption>${key} yapısı</figcaption>
        ${inlineSvg('yapi-tek', { secim: index + 1 }, 'atolye-svg--small')}
      </figure>`).join('');
    const options = (item.options || [1, 2, 3]).map((_, index) => `<figure class="atolye-option-card">
        <figcaption>${index + 1}. seçenek</figcaption>
        ${inlineSvg('gorunum-panelleri', { grup: index + 1 }, 'atolye-svg--small')}
      </figure>`).join('');
    const selects = (item.options || [1, 2, 3]).map((_, index) => `<label class="atolye-field">
        <span>${index + 1}. seçenek hangi yapı?</span>
        <select data-esles-option="${index + 1}">
          <option value="">Seç…</option>
          ${(item.shapes || ['A', 'B', 'C', 'D']).map((key) => `<option value="${key}">${key}</option>`).join('')}
        </select>
      </label>`).join('');
    return `${item.title ? `<h4 class="atolye-title">${escapeHTML(item.title)}</h4>` : ''}
      ${item.intro ? `<p class="atolye-intro">${escapeHTML(item.intro)}</p>` : ''}
      <div class="atolye-shape-row">${shapes}</div>
      <div class="atolye-option-row">${options}</div>
      <div class="atolye-fields atolye-fields--stack">${selects}
        <label class="atolye-field">
          <span>Seçeneklerin hiçbiri hangi yapıya ait değil?</span>
          <select data-esles-none><option value="">Seç…</option>${(item.shapes || []).map((key) => `<option value="${key}">${key}</option>`).join('')}</select>
        </label>
      </div>
      <div class="atolye-actions"><button type="button" class="atolye-check" data-esles-check="${item.id}">Kontrol et</button></div>
      <p class="atolye-feedback" data-esles-feedback="${item.id}" role="status" aria-live="polite"></p>`;
  }

  function bindEslestirme(root, item) {
    const entry = store.item(item.id);
    const feedback = root.querySelector(`[data-esles-feedback="${item.id}"]`);
    const keys = Object.keys(item.answer || {});
    root.querySelectorAll('[data-esles-option]').forEach((select) => {
      const saved = entry.answers[`o${select.dataset.eslesOption}`];
      if (saved) select.value = saved;
      select.addEventListener('change', () => {
        entry.answers[`o${select.dataset.eslesOption}`] = select.value;
        store.save();
      });
    });
    const none = root.querySelector('[data-esles-none]');
    if (none) {
      if (entry.answers.none) none.value = entry.answers.none;
      none.addEventListener('change', () => { entry.answers.none = none.value; store.save(); });
    }
    const check = root.querySelector(`[data-esles-check="${item.id}"]`);
    if (check) {
      check.addEventListener('click', () => {
        const wrong = keys.filter((key) => root.querySelector(`[data-esles-option="${key}"]`)?.value !== item.answer[key]);
        const noneValue = none ? none.value : '';
        const noneOk = !item.unmatched || noneValue === item.unmatched;
        if (!wrong.length && noneOk) {
          feedback.dataset.state = 'correct';
          feedback.textContent = 'Eşleştirme doğru: seçeneklerdeki görünümler doğru yapılara ait, artan yapıyı da buldun.';
          return;
        }
        feedback.dataset.state = 'wrong';
        const parts = [];
        if (wrong.length) parts.push(`${wrong.join(', ')}. seçenekte eşleşme tutmuyor`);
        if (!noneOk) parts.push('seçeneklerin hiçbirine uymayan yapıyı yeniden belirle');
        feedback.textContent = `${parts.join('; ')}. Görünümleri tek tek yapıyla karşılaştır.`;
      });
    }
  }

  /* ---------------- Görev 7: doğru–yanlış ---------------- */

  function dogruYanlisMarkup(item) {
    const rows = (item.statements || []).map((statement, index) => `<li class="atolye-statement" data-statement="${index}">
        <p>${escapeHTML(statement.text)}</p>
        <div class="atolye-dy" role="group" aria-label="${index + 1}. cümle doğru mu yanlış mı">
          <button type="button" data-dy="${index}" data-value="D">Doğru</button>
          <button type="button" data-dy="${index}" data-value="Y">Yanlış</button>
        </div>
      </li>`).join('');
    return `${item.title ? `<h4 class="atolye-title">${escapeHTML(item.title)}</h4>` : ''}
      ${item.intro ? `<p class="atolye-intro">${escapeHTML(item.intro)}</p>` : ''}
      <div class="math-scene-frame atolye-scene atolye-scene--narrow">
        <div class="math-scene-stage" data-scene-stage="${item.id}"></div>
      </div>
      <ol class="atolye-statements">${rows}</ol>
      <div class="atolye-actions"><button type="button" class="atolye-check" data-dy-check="${item.id}">Kontrol et</button></div>
      <p class="atolye-feedback" data-dy-feedback="${item.id}" role="status" aria-live="polite"></p>`;
  }

  function bindDogruYanlis(root, item) {
    const entry = store.item(item.id);
    const feedback = root.querySelector(`[data-dy-feedback="${item.id}"]`);
    mountScene(root.querySelector(`[data-scene-stage="${item.id}"]`), null, item.scene, null);
    root.querySelectorAll('[data-dy]').forEach((button) => {
      const index = button.dataset.dy;
      if (entry.answers[`s${index}`] === button.dataset.value) button.classList.add('is-active');
      button.addEventListener('click', () => {
        entry.answers[`s${index}`] = button.dataset.value;
        store.save();
        root.querySelectorAll(`[data-dy="${index}"]`).forEach((peer) => peer.classList.toggle('is-active', peer === button));
      });
    });
    const check = root.querySelector(`[data-dy-check="${item.id}"]`);
    if (check) {
      check.addEventListener('click', () => {
        const statements = item.statements || [];
        const missing = statements.filter((_, index) => !entry.answers[`s${index}`]).length;
        if (missing) {
          feedback.dataset.state = 'wrong';
          feedback.textContent = `${missing} cümle işaretlenmedi. Hepsine doğru ya da yanlış yaz.`;
          return;
        }
        const wrong = statements.map((statement, index) => (
          entry.answers[`s${index}`] === statement.answer ? null : index + 1
        )).filter(Boolean);
        if (!wrong.length) {
          feedback.dataset.state = 'correct';
          feedback.textContent = 'Dört cümlenin hepsi doğru işaretlendi.';
          return;
        }
        feedback.dataset.state = 'wrong';
        feedback.textContent = `${wrong.join(', ')}. cümlede işaret yanlış. Numaralı küpleri tek tek yerinden oynatıp görünümü yeniden düşün.`;
      });
    }
  }

  /* ---------------- Montaj ---------------- */

  const RENDER = {
    sayim: { markup: sayimMarkup, bind: bindSayim },
    cizim: { markup: cizimMarkup, bind: bindCizim },
    enaz: { markup: enazMarkup, bind: bindEnaz },
    eslestirme: { markup: eslestirmeMarkup, bind: bindEslestirme },
    'dogru-yanlis': { markup: dogruYanlisMarkup, bind: bindDogruYanlis },
  };

  function mount(host, items) {
    if (!host) return;
    const list = (Array.isArray(items) ? items : []).filter((item) => item && RENDER[item.type]);
    if (!list.length) return;
    host.innerHTML = list.map((item) => `<section class="atolye" data-atolye="${item.id}">${RENDER[item.type].markup(item)}</section>`).join('');
    list.forEach((item) => {
      const section = host.querySelector(`[data-atolye="${item.id}"]`);
      if (!section) return;
      try {
        RENDER[item.type].bind(section, item);
      } catch (error) {
        section.insertAdjacentHTML('beforeend', '<p class="atolye-feedback" data-state="wrong">Bu görev yüklenemedi; sayfayı tazeleyince yeniden kurulur.</p>');
      }
    });
  }

  window.MATEMATIK_ATOLYE = Object.freeze({
    mount,
    password: RESET_PASSWORD,
    normalize,
    countCells,
  });
})();
