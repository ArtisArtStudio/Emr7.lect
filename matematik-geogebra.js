/* Matematik: GeoGebra köprüsü.
 *
 * Kural: GeoGebra **isteğe bağlı** bir katmandır, zorunlu değil.
 * - Yalnız bu dosyada tanımlı dört sahne GeoGebra ile açılır; kalan yirmi sahne yerel SVG.
 * - Applet geç yüklenir (görünüme girince), 12 sn içinde açılmazsa ya da nesneleri
 *   oluşturamazsa aynı sahne yerel SVG motoruyla çizilir; kutu hiçbir zaman boş kalmaz.
 * - Nesne sayısı `getObjectNumber()` ve `exists()` ile doğrulanır; "sadece eksen" durumu
 *   sessiz kalmaz, ekrandaki durum satırına yazılır.
 * - Ticari olmayan kullanım; atıf sahnede ve THIRD-PARTY-NOTICES.md içinde.
 */
(function () {
  'use strict';

  const CDN = 'https://www.geogebra.org/apps/deployggb.js';
  const LOAD_TIMEOUT = 8000;
  const BUILD_DELAYS = [0, 300, 900, 2000];
  const PREF_KEY = 'emr7lect.matematik.geogebra';

  let loader = null;
  let uid = 0;
  let loadFailed = false;

  /* ---------- tercih: GeoGebra açık mı? ---------- */

  function prefers() {
    try {
      return window.localStorage.getItem(PREF_KEY) !== 'off';
    } catch (error) {
      return true;
    }
  }

  function setPrefers(on) {
    try {
      window.localStorage.setItem(PREF_KEY, on ? 'on' : 'off');
    } catch (error) {
      /* depolama kapalıysa varsayılan açık kalır */
    }
  }

  /* ---------- applet tanımları ---------- */

  const APPLETS = {
    yansima: {
      label: 'Yansıma',
      appName: 'geometry',
      perspective: 'G',
      bounds: [-5, 8, -3, 7],
      params: [
        { name: 'k', label: 'Ayna doğrusu (x = k)', min: -3, max: 4, step: 1, value: 1 },
      ],
      required: ['A', 'B', 'C', 'ucgen', 'ayna', 'A1', 'B1', 'C1', 'goruntu'],
      build(api, values) {
        const k = Number(values.k);
        api.evalCommand(`k = Slider(-3, 4, 1)`);
        api.evalCommand(`SetValue(k, ${k})`);
        api.evalCommand('ayna = Line((k, -4), (k, 6))');
        api.evalCommand('A = (2, 1)');
        api.evalCommand('B = (3, 3)');
        api.evalCommand('C = (2, 4)');
        api.evalCommand('ucgen = Polygon(A, B, C)');
        api.evalCommand('A1 = Reflect(A, ayna)');
        api.evalCommand('B1 = Reflect(B, ayna)');
        api.evalCommand('C1 = Reflect(C, ayna)');
        api.evalCommand('goruntu = Polygon(A1, B1, C1)');
        api.evalCommand('k1 = Segment(A, A1)');
        api.evalCommand('k2 = Segment(B, B1)');
        api.evalCommand('k3 = Segment(C, C1)');
        ['k1', 'k2', 'k3'].forEach((name) => {
          api.evalCommand(`SetLineStyle(${name}, 1)`);
          api.setColor(name, 139, 151, 168);
        });
        api.setColor('ayna', 192, 55, 68);
        api.setLineThickness('ayna', 5);
        api.setColor('ucgen', 91, 70, 168);
        api.setColor('goruntu', 47, 138, 99);
      },
    },

    ortadikme: {
      label: 'Orta dikme',
      appName: 'geometry',
      perspective: 'G',
      bounds: [-2, 8, -1, 7],
      params: [
        { name: 'ax', label: 'A noktası (x)', min: 0, max: 4, step: 1, value: 2 },
        { name: 'by', label: 'B noktası (y)', min: 1, max: 5, step: 1, value: 4 },
      ],
      required: ['A', 'B', 'AB', 'd', 'M', 'P', 'PA', 'PB'],
      build(api, values) {
        api.evalCommand('ax = Slider(0, 4, 1)');
        api.evalCommand('by = Slider(1, 5, 1)');
        api.evalCommand(`SetValue(ax, ${Number(values.ax)})`);
        api.evalCommand(`SetValue(by, ${Number(values.by)})`);
        api.evalCommand('A = (ax, 1)');
        api.evalCommand('B = (5, by)');
        api.evalCommand('AB = Segment(A, B)');
        api.evalCommand('c1 = Circle(A, B)');
        api.evalCommand('c2 = Circle(B, A)');
        api.evalCommand('d = PerpendicularBisector(A, B)');
        api.evalCommand('M = Midpoint(AB)');
        api.evalCommand('P = Point(d)');
        api.evalCommand('PA = Segment(P, A)');
        api.evalCommand('PB = Segment(P, B)');
        api.setColor('c1', 139, 151, 168);
        api.setColor('c2', 139, 151, 168);
        api.evalCommand('SetLineStyle(c1, 1)');
        api.evalCommand('SetLineStyle(c2, 1)');
        api.setColor('d', 192, 55, 68);
        api.setLineThickness('d', 5);
        api.setColor('PA', 47, 138, 99);
        api.setColor('PB', 47, 138, 99);
      },
    },

    aciortay: {
      label: 'Açıortay',
      appName: 'geometry',
      perspective: 'G',
      bounds: [-1, 7, -1, 7],
      params: [
        { name: 'aci', label: 'Açı (derece)', min: 20, max: 150, step: 5, value: 80 },
      ],
      required: ['K', 'A', 'B', 'r1', 'r2', 'b1'],
      build(api, values) {
        api.evalCommand('aci = Slider(20, 150, 5)');
        api.evalCommand(`SetValue(aci, ${Number(values.aci)})`);
        api.evalCommand('K = (0, 0)');
        api.evalCommand('A = (6, 0)');
        api.evalCommand('B = (5 cos(aci * pi / 180), 5 sin(aci * pi / 180))');
        api.evalCommand('r1 = Ray(K, A)');
        api.evalCommand('r2 = Ray(K, B)');
        api.evalCommand('b1 = AngleBisector(A, K, B)');
        api.setColor('b1', 192, 55, 68);
        api.setLineThickness('b1', 5);
        api.setColor('r1', 27, 47, 73);
        api.setColor('r2', 27, 47, 73);
      },
    },

    prizma3b: {
      label: 'Prizma (3B)',
      appName: '3d',
      bounds: null,
      params: [
        { name: 'a', label: 'Genişlik', min: 1, max: 4, step: 1, value: 3 },
        { name: 'b', label: 'Derinlik', min: 1, max: 3, step: 1, value: 2 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 3, step: 1, value: 2 },
      ],
      required: ['taban', 'ust', 'y1', 'y2', 'y3', 'y4'],
      build(api, values) {
        api.evalCommand('a = Slider(1, 4, 1)');
        api.evalCommand('b = Slider(1, 3, 1)');
        api.evalCommand('h = Slider(1, 3, 1)');
        api.evalCommand(`SetValue(a, ${Number(values.a)})`);
        api.evalCommand(`SetValue(b, ${Number(values.b)})`);
        api.evalCommand(`SetValue(h, ${Number(values.h)})`);
        /* Yalnız temel komutlar: Polygon + Segment. Prism komutu sürüm değişince
           nesne üretmeyebiliyor; o durumda tuval boş kalıyordu. */
        api.evalCommand('P1 = (0, 0, 0)');
        api.evalCommand('P2 = (a, 0, 0)');
        api.evalCommand('P3 = (a, b, 0)');
        api.evalCommand('P4 = (0, b, 0)');
        api.evalCommand('Q1 = (0, 0, h)');
        api.evalCommand('Q2 = (a, 0, h)');
        api.evalCommand('Q3 = (a, b, h)');
        api.evalCommand('Q4 = (0, b, h)');
        api.evalCommand('taban = Polygon(P1, P2, P3, P4)');
        api.evalCommand('ust = Polygon(Q1, Q2, Q3, Q4)');
        api.evalCommand('y1 = Segment(P1, Q1)');
        api.evalCommand('y2 = Segment(P2, Q2)');
        api.evalCommand('y3 = Segment(P3, Q3)');
        api.evalCommand('y4 = Segment(P4, Q4)');
        api.setColor('taban', 112, 86, 201);
        api.setColor('ust', 168, 155, 226);
        ['y1', 'y2', 'y3', 'y4'].forEach((name) => api.setColor(name, 91, 70, 168));
      },
    },
  };

  /* ---------- yükleyici ---------- */

  function loadDeployGGB() {
    if (window.GGBApplet) return Promise.resolve(window.GGBApplet);
    if (loader) return loader;
    loader = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = CDN;
      script.async = true;
      const timer = window.setTimeout(() => reject(new Error('timeout')), LOAD_TIMEOUT);
      script.onload = () => {
        window.clearTimeout(timer);
        if (window.GGBApplet) resolve(window.GGBApplet);
        else reject(new Error('GGBApplet yok'));
      };
      script.onerror = () => {
        window.clearTimeout(timer);
        reject(new Error('ağ'));
      };
      document.head.appendChild(script);
    });
    return loader;
  }

  /* ---------- sürgü paneli (yerel motorla aynı görünüm) ---------- */

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, (ch) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
    ));
  }

  function renderControls(controls, params, values, scope) {
    if (!controls) return;
    controls.innerHTML = params.map((param) => `<div class="scene-slider">
        <label for="scene-${scope}-${escapeHtml(param.name)}">${escapeHtml(param.label)}
          <output id="scene-out-${scope}-${escapeHtml(param.name)}">${values[param.name]}</output>
        </label>
        <input type="range" id="scene-${scope}-${escapeHtml(param.name)}" data-scene-param="${escapeHtml(param.name)}"
          min="${param.min}" max="${param.max}" step="${param.step || 1}" value="${values[param.name]}">
      </div>`).join('');
  }

  /* ---------- ana giriş ---------- */

  function supports(scene) {
    return Boolean(scene && APPLETS[scene.type]);
  }

  function types() {
    return Object.keys(APPLETS);
  }

  function params(type) {
    const spec = APPLETS[type];
    return spec ? spec.params.map((param) => ({ ...param })) : [];
  }

  function mount(host, controls, scene, options) {
    if (!host || !scene || !APPLETS[scene.type]) return null;
    /* Yükleme bir kez başarısız olduysa sayfa boyunca yeniden denenmez:
       her sahnede 8 sn beklemek yerine doğrudan yerel çizim açılır. */
    if (loadFailed) return null;
    const spec = APPLETS[scene.type];
    const settings = options || {};
    const fallback = typeof settings.fallback === 'function' ? settings.fallback : function () {};
    const status = typeof settings.onStatus === 'function' ? settings.onStatus : function () {};
    uid += 1;
    const scope = `ggb${uid}`;
    const values = {};
    spec.params.forEach((param) => { values[param.name] = param.value; });

    let api = null;
    let done = false;
    let destroyed = false;
    let buildTimer = null;
    let observer = null;

    host.innerHTML = `<div class="math-ggb-loading">GeoGebra hazırlanıyor… <span>Açılmazsa “Yerel çizime geç” ile devam edebilirsin.</span></div>`;
    const canvas = document.createElement('div');
    canvas.className = 'math-ggb-canvas';
    canvas.id = `ggb-${scope}`;
    host.appendChild(canvas);
    renderControls(controls, spec.params, values, scope);
    status('GeoGebra hazırlanıyor…');

    function fail(message) {
      if (done || destroyed) return;
      done = true;
      if (buildTimer) window.clearTimeout(buildTimer);
      if (observer) observer.disconnect();
      host.innerHTML = '';
      if (controls) controls.innerHTML = '';
      status(message);
      fallback(message);
    }

    function verify() {
      if (!api) return false;
      const total = typeof api.getObjectNumber === 'function' ? api.getObjectNumber() : 0;
      const missing = spec.required.filter((label) => (
        typeof api.exists === 'function' ? !api.exists(label) : true
      ));
      return total >= spec.required.length && missing.length === 0;
    }

    function build(attempt) {
      if (done || destroyed || !api) return;
      const delay = BUILD_DELAYS[Math.min(attempt, BUILD_DELAYS.length - 1)];
      buildTimer = window.setTimeout(() => {
        if (done || destroyed) return;
        try {
          if (spec.appName === '3d') {
            /* 3B uygulamasında perspektif komutu uygulanmaz: tuval boş kalıyordu. */
          } else {
            api.evalCommand('SetPerspective("G")');
          }
          if (spec.bounds) api.setCoordSystem(...spec.bounds);
          if (typeof api.setAxesVisible === 'function') api.setAxesVisible(true, true);
          if (typeof api.setGridVisible === 'function') api.setGridVisible(false);
          spec.build(api, values);
        } catch (error) {
          /* komut hatası aşağıdaki doğrulamada yakalanır */
        }
        if (verify()) {
          done = true;
          if (observer) observer.disconnect();
          const count = typeof api.getObjectNumber === 'function' ? api.getObjectNumber() : spec.required.length;
          status(`GeoGebra hazır · ${count} nesne · noktaları sürükleyebilirsin.`);
          /* Perspektif değişimi tuvali yeniden ölçekleyebiliyor: bir kez daha oturt. */
          window.setTimeout(() => {
            if (destroyed || !api) return;
            try {
              if (spec.appName !== '3d') api.evalCommand('SetPerspective("G")');
              if (typeof api.setSize === 'function') {
                api.setSize(
                  Math.max(320, Math.round(host.clientWidth || 560)),
                  Math.max(280, Math.round(host.clientHeight || 340)),
                );
              }
            } catch (error) {
              /* oturtma başarısızsa mevcut görünüm kalır */
            }
          }, 500);
          return;
        }
        if (attempt + 1 < BUILD_DELAYS.length) {
          build(attempt + 1);
          return;
        }
        fail('GeoGebra çizimi oluşturamadı; yerel çizim gösteriliyor.');
      }, delay);
    }

    function syncFromControls() {
      if (!api) return;
      spec.params.forEach((param) => {
        const input = controls ? controls.querySelector(`[data-scene-param="${param.name}"]`) : null;
        const out = controls ? controls.querySelector(`#scene-out-${scope}-${param.name}`) : null;
        if (!input) return;
        const value = Number(input.value);
        values[param.name] = value;
        if (out) out.textContent = String(value);
        try {
          api.setValue(param.name, value);
        } catch (error) {
          /* nesne henüz yoksa sessiz geç */
        }
      });
    }

    if (controls) {
      controls.addEventListener('input', (event) => {
        if (event.target && event.target.matches('[data-scene-param]')) syncFromControls();
      });
    }

    loadDeployGGB().then((GGBApplet) => {
      if (destroyed) return;
      const width = Math.max(320, Math.round(host.clientWidth || 560));
      const height = Math.max(280, Math.round(host.clientHeight || 340));
      const appletParams = {
        appName: spec.appName,
        language: 'tr',
        width,
        height,
        showMenuBar: false,
        showToolBar: false,
        showToolBarHelp: false,
        showAlgebraInput: false,
        showResetIcon: false,
        showZoomButtons: false,
        showFullscreenButton: false,
        allowStyleBar: false,
        enableRightClick: false,
        enableLabelDrags: true,
        enableShiftDragZoom: true,
        borderColor: '#ded8f2',
        appletOnLoad(nextApi) {
          api = nextApi;
          if (destroyed) return;
          build(0);
          if (typeof window.ResizeObserver === 'function') {
            let debounce = null;
            observer = new window.ResizeObserver(() => {
              if (debounce) window.clearTimeout(debounce);
              debounce = window.setTimeout(() => {
                if (!api || destroyed || typeof api.setSize !== 'function') return;
                const w = Math.max(320, Math.round(host.clientWidth || width));
                const h = Math.max(280, Math.round(host.clientHeight || height));
                try {
                  api.setSize(w, h);
                } catch (error) {
                  /* ölçü değişimi başarısızsa mevcut boyut kalır */
                }
              }, 250);
            });
            observer.observe(host);
          }
        },
      };
      if (spec.perspective && spec.appName !== '3d') appletParams.perspective = spec.perspective;
      try {
        const applet = new GGBApplet(appletParams, true);
        applet.inject(canvas.id);
      } catch (error) {
        fail('GeoGebra başlatılamadı; yerel çizim gösteriliyor.');
      }
    }).catch(() => {
      loadFailed = true;
      fail('GeoGebra yüklenemedi (çevrimdışı ya da ağ engeli); yerel çizim gösteriliyor.');
    });

    return {
      engine: 'geogebra',
      reset() {
        spec.params.forEach((param) => { values[param.name] = param.value; });
        renderControls(controls, spec.params, values, scope);
        if (api) {
          spec.params.forEach((param) => {
            try {
              api.setValue(param.name, param.value);
            } catch (error) {
              /* yok say */
            }
          });
        }
      },
      destroy() {
        destroyed = true;
        done = true;
        if (buildTimer) window.clearTimeout(buildTimer);
        if (observer) observer.disconnect();
        host.innerHTML = '';
      },
    };
  }

  window.MATEMATIK_GEOGEBRA = Object.freeze({
    mount,
    supports,
    types,
    params,
    prefers,
    setPrefers,
    cdn: CDN,
  });
})();
