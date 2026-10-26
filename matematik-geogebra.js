/* Matematik: GeoGebra köprüsü — yalnız üç boyutlu cisimler.
 *
 * Kural (26 Ekim 2026, 2. sürüm): GeoGebra **sadece 3B cisimlerde** kullanılır:
 *   prizma3b · hacim · birim-donusum · uc-gorunum · acim
 * Diğer on dokuz sahne yerel SVG ile çizilir (GeoGebra kaldırıldı). Gerekçe: 2B sahnelerde
 * yerel çizim daha hızlı, çevrimdışı ve cevap sızdırmıyor; GeoGebra'nın pencere/ölçek
 * davranışı 2B'de ek yük getiriyordu.
 *
 * Çerçeve kuralları (eski hatalar):
 * - “GeoGebra hazırlanıyor” yazısı **kaplama**dır (absolute); applet gelince kaldırılır,
 *   üstte boş şerit bırakmaz.
 * - Tuval **kare**ye yakın ölçülür (en az 300×300); dar/uzun ince pencere oluşmaz.
 * - Cisim **orijine ortalanır**; böylece yakınlaştırma/uzaklaştırma cismi kırpmaz.
 * - Görünüm düğmeleri (Eğik · Ön · Yan · Üst) `SetViewDirection` ile çalışır; öğrenci
 *   cismi parmağıyla döndürebilir.
 * - `acim` sahnesinde “Katla / Aç” düğmesi ve tuvale dokunma, kapalı kutu ile düz açınım
 *   arasında geçirir.
 * - `uc-gorunum` sahnesi **bölünmüş** çalışır: solda döndürülebilir 3B cisim, sağda
 *    ön/yan/üst dik izdüşümleri (kareler) aynı sürgülerle eşzamanlı güncellenir.
 *
 * Yedek: ağ yoksa, CDN engelliyse ya da nesneler kurulamazsa aynı sahne yerel SVG ile çizilir.
 * Ticari olmayan kullanım; atıf sahnede ve THIRD-PARTY-NOTICES.md içinde.
 */
(function () {
  'use strict';

  const CDN = 'https://www.geogebra.org/apps/deployggb.js';
  const LOAD_TIMEOUT = 12000;
  const BUILD_DELAYS = [0, 300, 900, 2000];
  const PREF_KEY = 'emr7lect.matematik.geogebra';

  let loader = null;
  let uid = 0;
  let loadFailed = false;

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

  /* ---------- sayı ve komut biçimi ---------- */

  /* GeoGebra komutları nokta ondalığı ve ASCII eksi ister; virgül ya da U+2212
     komutu sessizce düşürür (yerel SVG'de yaşanan hatanın aynısı). */
  function f(value) {
    const number = Math.round(Number(value) * 1000) / 1000;
    if (!Number.isFinite(number)) return '0';
    return String(number);
  }

  function co(value) {
    if (typeof value === 'string' && value.trim() !== '') return value;
    return f(value);
  }

  function P(x, y, z) {
    if (z === undefined) return `(${co(x)}, ${co(y)})`;
    return `(${co(x)}, ${co(y)}, ${co(z)})`;
  }

  function S(text) {
    return JSON.stringify(String(text));
  }

  const COLOR = {
    ink: [27, 47, 73],
    purple: [91, 70, 168],
    light: [201, 191, 242],
    green: [47, 138, 99],
    mint: [215, 240, 227],
    red: [192, 55, 68],
    gray: [139, 151, 168],
    amber: [184, 121, 26],
    white: [255, 255, 255],
  };

  const VIEWS = {
    egik: 'Vector((1.6, -2.4, 1.3))',
    on: 'Vector((0, -1, 0))',
    yan: 'Vector((1, 0, 0))',
    ust: 'Vector((0, 0, 1))',
  };

  const VIEW_LABELS = [
    ['egik', 'Eğik'],
    ['on', 'Ön'],
    ['yan', 'Yan'],
    ['ust', 'Üst'],
  ];

  /* ---------- ortak çizim kapısı ---------- */

  function builder(api) {
    const names = [];
    const labeled = new Set();
    const run = (command) => {
      try {
        api.evalCommand(command);
      } catch (error) {
        /* komut hatası doğrulamada yakalanır */
      }
    };
    const box = {
      api,
      names,
      labeled,
      run,
      mark(name, showLabel) {
        names.push(name);
        if (showLabel) labeled.add(name);
        return name;
      },
      point(name, x, y, z) {
        box.mark(name, false);
        run(`${name} = ${P(x, y, z)}`);
      },
      segment(name, x1, y1, z1, x2, y2, z2) {
        box.mark(name, false);
        run(`${name} = Segment(${P(x1, y1, z1)}, ${P(x2, y2, z2)})`);
      },
      polygon3(name, points) {
        box.mark(name, false);
        run(`${name} = Polygon(${points.map(([x, y, z]) => P(x, y, z)).join(', ')})`);
      },
      polygon(name, points) {
        box.mark(name, false);
        run(`${name} = Polygon(${points.map(([x, y]) => P(x, y)).join(', ')})`);
      },
      cube(name, x, y, z, edge) {
        box.mark(name, false);
        run(`${name} = Cube(${P(x, y, z)}, ${P(x + edge, y, z)})`);
      },
      slider(name, min, max, step) {
        run(`${name} = Slider(${f(min)}, ${f(max)}, ${f(step)})`);
      },
      set(name, value) {
        run(`SetValue(${name}, ${f(value)})`);
      },
      color(name, rgb) {
        try {
          api.setColor(name, rgb[0], rgb[1], rgb[2]);
        } catch (error) {
          /* renk verilemezse varsayılan kalır */
        }
      },
      thickness(name, width) {
        run(`SetLineThickness(${name}, ${f(width)})`);
      },
      lineStyle(name, style) {
        run(`SetLineStyle(${name}, ${f(style)})`);
      },
      fill(name, opacity) {
        run(`SetFilling(${name}, ${f(opacity)})`);
      },
      hide(name) {
        run(`SetVisibleInView(${name}, 1, false)`);
      },
      caption(name, text, mode) {
        labeled.add(name);
        run(`SetCaption(${name}, ${S(text)})`);
        run(`SetLabelMode(${name}, ${f(mode === undefined ? 3 : mode)})`);
      },
      fixed(name) {
        run(`SetFixed(${name}, true)`);
      },
      text(name, text, x, y, z) {
        box.remove(name);
        box.mark(name, false);
        run(`${name} = Text(${S(text)}, ${P(x, y, z)})`);
      },
      remove(name) {
        let exists = false;
        try {
          exists = typeof api.exists === 'function' ? api.exists(name) : false;
        } catch (error) {
          exists = false;
        }
        if (!exists) return;
        try {
          api.deleteObject(name);
        } catch (error) {
          run(`Delete(${name})`);
        }
      },
      view(name) {
        run(`SetViewDirection(${VIEWS[name] || VIEWS.egik})`);
      },
      clear() {
        box.names.slice().forEach((name) => box.remove(name));
        box.names.length = 0;
        box.labeled.clear();
      },
    };
    return box;
  }

  /* ---------- applet tanımları: yalnız 3B cisimler ---------- */

  const APPLETS = {
    prizma3b: {
      label: 'Prizma (3B)',
      views: true,
      params: [
        { name: 'a', label: 'Genişlik', min: 1, max: 6, step: 1, value: 4 },
        { name: 'b', label: 'Derinlik', min: 1, max: 5, step: 1, value: 2 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 5, step: 1, value: 3 },
      ],
      required: ['taban', 'ust', 'y1', 'y2', 'y3', 'y4'],
      build(b, v) {
        const a = Number(v.a);
        const b0 = Number(v.b);
        const h = Number(v.h);
        /* Cisim orijine ortalanır: görünüm ne olursa olsun kadrajda kalır. */
        const x0 = -a / 2;
        const y0 = -b0 / 2;
        const z0 = -h / 2;
        b.polygon3('taban', [[x0, y0, z0], [x0 + a, y0, z0], [x0 + a, y0 + b0, z0], [x0, y0 + b0, z0]]);
        b.polygon3('ust', [[x0, y0, z0 + h], [x0 + a, y0, z0 + h], [x0 + a, y0 + b0, z0 + h], [x0, y0 + b0, z0 + h]]);
        b.segment('y1', x0, y0, z0, x0, y0, z0 + h);
        b.segment('y2', x0 + a, y0, z0, x0 + a, y0, z0 + h);
        b.segment('y3', x0 + a, y0 + b0, z0, x0 + a, y0 + b0, z0 + h);
        b.segment('y4', x0, y0 + b0, z0, x0, y0 + b0, z0 + h);
        b.color('taban', COLOR.purple);
        b.color('ust', [168, 155, 226]);
        ['y1', 'y2', 'y3', 'y4'].forEach((name) => b.color(name, COLOR.purple));
        b.fill('taban', 0.75);
        b.fill('ust', 0.75);
        b.text('etiket', 'Genişlik · derinlik · yükseklik: üç ayrıt, üç soru.', x0, y0 + b0 + 0.6, z0);
      },
    },

    hacim: {
      label: 'Hacim (3B)',
      views: true,
      params: [
        { name: 'a', label: 'Taban uzunluğu', min: 1, max: 4, step: 1, value: 3 },
        { name: 'b', label: 'Taban genişliği', min: 1, max: 4, step: 1, value: 2 },
        { name: 'h', label: 'Katman sayısı', min: 1, max: 4, step: 1, value: 2 },
      ],
      required: ['taban', 'ust', 'birim'],
      build(b, v) {
        const a = Number(v.a);
        const b0 = Number(v.b);
        const h = Number(v.h);
        const x0 = -a / 2;
        const y0 = -b0 / 2;
        const z0 = -h / 2;
        b.polygon3('taban', [[x0, y0, z0], [x0 + a, y0, z0], [x0 + a, y0 + b0, z0], [x0, y0 + b0, z0]]);
        b.polygon3('ust', [[x0, y0, z0 + h], [x0 + a, y0, z0 + h], [x0 + a, y0 + b0, z0 + h], [x0, y0 + b0, z0 + h]]);
        /* Katman sınırları: her katman taban alanı kadar birim küp taşır. */
        if (h > 1) {
          for (let k = 1; k < h; k += 1) {
            const z = z0 + k;
            b.polygon3(`katman${k}`, [[x0, y0, z], [x0 + a, y0, z], [x0 + a, y0 + b0, z], [x0, y0 + b0, z]]);
            b.color(`katman${k}`, COLOR.gray);
            b.fill(`katman${k}`, 0.12);
          }
        }
        /* Hacim birimi: köşede tek birim küp. */
        b.cube('birim', x0, y0, z0, 1);
        b.color('birim', COLOR.amber);
        b.fill('birim', 0.9);
        b.color('taban', COLOR.purple);
        b.color('ust', [168, 155, 226]);
        b.fill('taban', 0.45);
        b.fill('ust', 0.45);
        b.text('etiket', 'Taban a·b birim kare; katman sayısı h.', x0, y0 + b0 + 0.7, z0);
      },
    },

    'birim-donusum': {
      label: 'Birim küp (3B)',
      views: true,
      params: [{ name: 's', label: 'Ayrıt (dm)', min: 1, max: 6, step: 1, value: 2 }],
      required: ['kup', 'birim'],
      build(b, v) {
        const s = Number(v.s);
        const half = s / 2;
        /* Ayrıtı s dm olan küp; içinde 1 dm³'lük birim küp köşede durur. */
        b.cube('kup', -half, -half, -half, s);
        b.cube('birim', -half, -half, -half, 1);
        b.color('kup', COLOR.purple);
        b.fill('kup', 0.35);
        b.color('birim', COLOR.amber);
        b.fill('birim', 0.9);
        b.text('etiket', 'Birim küp 1 dm³ = 1 L', -half, -half + s + 0.5, -half);
      },
    },

    'uc-gorunum': {
      label: 'Üç görünüm (3B)',
      views: true,
      split: true,
      params: [
        { name: 'a', label: 'Genişlik (ön görünüm)', min: 1, max: 4, step: 1, value: 3 },
        { name: 'b', label: 'Derinlik (yan görünüm)', min: 1, max: 3, step: 1, value: 2 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 3, step: 1, value: 2 },
      ],
      required: ['taban', 'ust', 'y1', 'y2', 'y3', 'y4'],
      build(b, v) {
        const a = Number(v.a);
        const b0 = Number(v.b);
        const h = Number(v.h);
        const x0 = -a / 2;
        const y0 = -b0 / 2;
        const z0 = -h / 2;
        b.polygon3('taban', [[x0, y0, z0], [x0 + a, y0, z0], [x0 + a, y0 + b0, z0], [x0, y0 + b0, z0]]);
        b.polygon3('ust', [[x0, y0, z0 + h], [x0 + a, y0, z0 + h], [x0 + a, y0 + b0, z0 + h], [x0, y0 + b0, z0 + h]]);
        b.segment('y1', x0, y0, z0, x0, y0, z0 + h);
        b.segment('y2', x0 + a, y0, z0, x0 + a, y0, z0 + h);
        b.segment('y3', x0 + a, y0 + b0, z0, x0 + a, y0 + b0, z0 + h);
        b.segment('y4', x0, y0 + b0, z0, x0, y0 + b0, z0 + h);
        b.color('taban', COLOR.purple);
        b.color('ust', [168, 155, 226]);
        ['y1', 'y2', 'y3', 'y4'].forEach((name) => b.color(name, COLOR.purple));
        b.fill('taban', 0.5);
        b.fill('ust', 0.5);
      },
    },

    acim: {
      label: 'Açınım (3B)',
      views: true,
      net: true,
      params: [
        { name: 'a', label: 'Genişlik', min: 1, max: 5, step: 1, value: 4 },
        { name: 'b', label: 'Derinlik', min: 1, max: 5, step: 1, value: 3 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 5, step: 1, value: 2 },
      ],
      required: ['on', 'arka', 'sol', 'sag', 'ust', 'alt'],
      build(b, v, mode) {
        const a = Number(v.a);
        const b0 = Number(v.b);
        const h = Number(v.h);
        if (mode === 'acik') {
          /* Düz açınım: z = 0 düzleminde haç biçimi, orijine ortalanmış. */
          const cx = a;
          const cy = h / 2;
          const faces = [
            ['on', [[0, 0], [a, 0], [a, h], [0, h]], COLOR.purple],
            ['arka', [[a + b0, 0], [a + b0 + a, 0], [a + b0 + a, h], [a + b0, h]], COLOR.light],
            ['sag', [[a, 0], [a + b0, 0], [a + b0, h], [a, h]], COLOR.mint],
            ['sol', [[-b0, 0], [0, 0], [0, h], [-b0, h]], COLOR.mint],
            ['ust', [[0, h], [a, h], [a, h + b0], [0, h + b0]], COLOR.light],
            ['alt', [[0, -b0], [a, -b0], [a, 0], [0, 0]], COLOR.light],
          ];
          faces.forEach(([name, points, color]) => {
            b.polygon3(name, points.map(([x, y]) => [x - cx, y - cy, 0]));
            b.color(name, color);
            b.fill(name, 0.7);
          });
          b.text('etiket', 'Açık hâl: altı yüz tek düzlemde.', 0, h + b0, 0);
        } else {
          /* Kapalı kutu: altı yüz. */
          const x0 = -a / 2;
          const y0 = -b0 / 2;
          const z0 = -h / 2;
          b.polygon3('on', [[x0, y0, z0], [x0 + a, y0, z0], [x0 + a, y0, z0 + h], [x0, y0, z0 + h]]);
          b.polygon3('arka', [[x0, y0 + b0, z0], [x0 + a, y0 + b0, z0], [x0 + a, y0 + b0, z0 + h], [x0, y0 + b0, z0 + h]]);
          b.polygon3('sol', [[x0, y0, z0], [x0, y0 + b0, z0], [x0, y0 + b0, z0 + h], [x0, y0, z0 + h]]);
          b.polygon3('sag', [[x0 + a, y0, z0], [x0 + a, y0 + b0, z0], [x0 + a, y0 + b0, z0 + h], [x0 + a, y0, z0 + h]]);
          b.polygon3('ust', [[x0, y0, z0 + h], [x0 + a, y0, z0 + h], [x0 + a, y0 + b0, z0 + h], [x0, y0 + b0, z0 + h]]);
          b.polygon3('alt', [[x0, y0, z0], [x0 + a, y0, z0], [x0 + a, y0 + b0, z0], [x0, y0 + b0, z0]]);
          ['on', 'arka', 'sol', 'sag'].forEach((name) => {
            b.color(name, COLOR.purple);
            b.fill(name, 0.5);
          });
          ['ust', 'alt'].forEach((name) => {
            b.color(name, [168, 155, 226]);
            b.fill(name, 0.5);
          });
          b.text('etiket', 'Kapalı kutu: altı yüz. Dokun: açınım açılsın.', 0, 0, z0 + h + 0.6);
        }
      },
    },
  };

  /* ---------- küçük dik izdüşüm panelleri (uc-gorunum) ---------- */

  function orthographicSvg(values) {
    const a = Number(values.a) || 1;
    const b = Number(values.b) || 1;
    const h = Number(values.h) || 1;
    const panels = [
      { key: 'on', title: 'Ön', cols: a, rows: h, fill: '#d7ccf7' },
      { key: 'yan', title: 'Yan', cols: b, rows: h, fill: '#cfe4f7' },
      { key: 'ust', title: 'Üst', cols: a, rows: b, fill: '#d5efdf' },
    ];
    const cell = 22;
    const pad = 12;
    const width = 3 * 96;
    const height = 108;
    const parts = [`<svg viewBox="0 0 ${width} ${height}" class="math-ggb-ortho" aria-hidden="true">`];
    panels.forEach((panel, index) => {
      const x0 = index * 96 + pad;
      const w = panel.cols * cell;
      const hh = panel.rows * cell;
      parts.push(`<rect x="${index * 96 + 4}" y="4" width="88" height="100" rx="10" fill="#fbfaff" stroke="#ded8f2"/>`);
      parts.push(`<text x="${index * 96 + 48}" y="22" text-anchor="middle" font-size="11" font-weight="800" fill="#33265f">${panel.title}</text>`);
      for (let row = 0; row < panel.rows; row += 1) {
        for (let col = 0; col < panel.cols; col += 1) {
          parts.push(`<rect x="${x0 + col * cell}" y="${32 + row * cell}" width="${cell - 1.5}" height="${cell - 1.5}" rx="3" fill="${panel.fill}" stroke="#7056c9" stroke-width="0.8"/>`);
        }
      }
      parts.push(`<text x="${index * 96 + 48}" y="${34 + Math.max(hh, 0) + 12}" text-anchor="middle" font-size="9.5" fill="#6b7a90">${panel.cols} × ${panel.rows} kare?</text>`);
    });
    parts.push('</svg>');
    return parts.join('');
  }

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

  /* ---------- sürgü paneli ---------- */

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

  /* ---------- dışa açılan tanıtıcılar ---------- */

  function spec(type) {
    return APPLETS[type] || null;
  }

  function supports(scene) {
    return Boolean(scene && APPLETS[scene.type]);
  }

  function types() {
    return Object.keys(APPLETS);
  }

  function params(type) {
    const found = spec(type);
    return found ? found.params.map((param) => ({ ...param })) : [];
  }

  function paramsOf(scene) {
    const found = spec(scene && scene.type);
    if (!found) return [];
    if (scene.params && scene.params.length) {
      return scene.params.map((param) => {
        const base = found.params.find((item) => item.name === param.name) || {};
        return {
          name: param.name,
          label: param.label || base.label || param.name,
          min: Number(param.min),
          max: Number(param.max),
          step: Number(param.step) || 1,
          value: Number(param.value),
        };
      });
    }
    return found.params.map((param) => ({ ...param }));
  }

  function applyLabels(box) {
    if (!box || !box.api || typeof box.api.setLabelVisible !== 'function') return;
    box.names.forEach((name) => {
      try {
        box.api.setLabelVisible(name, box.labeled.has(name));
      } catch (error) {
        /* etiket ayarı başarısızsa varsayılan kalır */
      }
    });
  }

  /* ---------- ana giriş ---------- */

  function mount(host, controls, scene, options) {
    if (!host || !scene || !APPLETS[scene.type]) return null;
    if (loadFailed) return null;
    const conf = APPLETS[scene.type];
    const settings = options || {};
    const fallback = typeof settings.fallback === 'function' ? settings.fallback : function () {};
    const status = typeof settings.onStatus === 'function' ? settings.onStatus : function () {};
    uid += 1;
    const scope = `ggb${uid}`;
    const params = paramsOf(scene);
    const values = {};
    params.forEach((param) => { values[param.name] = param.value; });
    let mode = conf.net ? 'kapali' : '';

    let api = null;
    let box = null;
    let done = false;
    let destroyed = false;
    let buildTimer = null;
    let observer = null;

    /* Kaplama: applet gelince kaldırılır, üstte boş şerit bırakmaz. */
    host.innerHTML = `<div class="math-ggb-shell${conf.split ? ' is-split' : ''}">
      <div class="math-ggb-canvas" id="ggb-${scope}"></div>
      <div class="math-ggb-loading">GeoGebra hazırlanıyor… <span>Üç boyutlu cisim yükleniyor.</span></div>
      ${conf.split ? '<div class="math-ggb-views" aria-hidden="true"></div>' : ''}
      <div class="math-ggb-bar">
        ${VIEW_LABELS.map(([key, label]) => `<button type="button" data-ggb-view="${key}">${label}</button>`).join('')}
        ${conf.net ? '<button type="button" data-ggb-net="1">Açınımı aç</button>' : ''}
      </div>
    </div>`;
    const canvas = host.querySelector('.math-ggb-canvas');
    const loading = host.querySelector('.math-ggb-loading');
    const viewsHost = host.querySelector('.math-ggb-views');
    const bar = host.querySelector('.math-ggb-bar');
    renderControls(controls, params, values, scope);
    if (viewsHost) viewsHost.innerHTML = orthographicSvg(values);
    status('GeoGebra hazırlanıyor…');

    function hideLoading() {
      if (loading) loading.hidden = true;
      host.classList.add('is-ready');
    }

    function fail(message) {
      if (done || destroyed) return;
      done = true;
      if (buildTimer) window.clearTimeout(buildTimer);
      if (observer) observer.disconnect();
      host.innerHTML = '';
      host.classList.remove('is-ready');
      if (controls) controls.innerHTML = '';
      status(message);
      fallback(message);
    }

    function verify() {
      if (!api) return false;
      const total = typeof api.getObjectNumber === 'function' ? api.getObjectNumber() : 0;
      const missing = conf.required.filter((label) => (
        typeof api.exists === 'function' ? !api.exists(label) : true
      ));
      return total >= conf.required.length && missing.length === 0;
    }

    function rebuild() {
      if (!api) return;
      if (box) box.clear();
      box = builder(api);
      conf.build(box, values, mode);
      applyLabels(box);
    }

    function build(attempt) {
      if (done || destroyed || !api) return;
      const delay = BUILD_DELAYS[Math.min(attempt, BUILD_DELAYS.length - 1)];
      buildTimer = window.setTimeout(() => {
        if (done || destroyed) return;
        try {
          if (typeof api.setAxesVisible === 'function') api.setAxesVisible(true, true, true);
          if (typeof api.setGridVisible === 'function') api.setGridVisible(false);
          rebuild();
          box.view('egik');
        } catch (error) {
          /* komut hatası aşağıdaki doğrulamada yakalanır */
        }
        if (verify()) {
          done = true;
          hideLoading();
          if (observer) observer.disconnect();
          const count = typeof api.getObjectNumber === 'function' ? api.getObjectNumber() : conf.required.length;
          status(`GeoGebra hazır · ${count} nesne · cismi parmağınla döndürebilirsin.`);
          window.setTimeout(() => {
            if (destroyed || !api) return;
            try {
              if (typeof api.setSize === 'function') {
                api.setSize(
                  Math.max(300, Math.round(canvas.clientWidth || 340)),
                  Math.max(300, Math.round(canvas.clientHeight || 340)),
                );
              }
            } catch (error) {
              /* oturtma başarısızsa mevcut görünüm kalır */
            }
          }, 400);
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
      params.forEach((param) => {
        const input = controls ? controls.querySelector(`[data-scene-param="${param.name}"]`) : null;
        const out = controls ? controls.querySelector(`#scene-out-${scope}-${param.name}`) : null;
        if (!input) return;
        values[param.name] = Number(input.value);
        if (out) out.textContent = String(values[param.name]);
      });
      if (viewsHost) viewsHost.innerHTML = orthographicSvg(values);
      if (!api) return;
      params.forEach((param) => {
        try {
          api.setValue(param.name, values[param.name]);
        } catch (error) {
          /* nesne henüz yoksa sessiz geç */
        }
      });
      rebuild();
      if (done) status('GeoGebra hazır · sürgüler cismi güncelliyor.');
    }

    if (controls) {
      controls.addEventListener('input', (event) => {
        if (event.target && event.target.matches('[data-scene-param]')) syncFromControls();
      });
    }

    if (bar) {
      bar.addEventListener('click', (event) => {
        const view = event.target.closest('[data-ggb-view]');
        if (view) {
          bar.querySelectorAll('[data-ggb-view]').forEach((node) => node.classList.remove('is-active'));
          view.classList.add('is-active');
          if (box) box.view(view.getAttribute('data-ggb-view'));
          return;
        }
        const net = event.target.closest('[data-ggb-net]');
        if (net) {
          mode = mode === 'acik' ? 'kapali' : 'acik';
          net.textContent = mode === 'acik' ? 'Kutuyu kapat' : 'Açınımı aç';
          if (api) {
            rebuild();
            if (box) box.view(mode === 'acik' ? 'ust' : 'egik');
            status(mode === 'acik'
              ? 'Açınım açık: altı yüzü tek düzlemde say.'
              : 'Kutu kapalı: yüzleri karşılıklı eşle.');
          }
        }
      });
    }

    /* Dokunma ile açınım: sürükleme (döndürme) ile karışmasın diye hareket eşiği var. */
    if (conf.net && canvas) {
      let start = null;
      canvas.addEventListener('pointerdown', (event) => {
        start = { x: event.clientX, y: event.clientY };
      });
      canvas.addEventListener('pointerup', (event) => {
        if (!start) return;
        const moved = Math.hypot(event.clientX - start.x, event.clientY - start.y);
        start = null;
        if (moved > 12 || !api || !box) return;
        mode = mode === 'acik' ? 'kapali' : 'acik';
        const net = bar ? bar.querySelector('[data-ggb-net]') : null;
        if (net) net.textContent = mode === 'acik' ? 'Kutuyu kapat' : 'Açınımı aç';
        rebuild();
        box.view(mode === 'acik' ? 'ust' : 'egik');
        status(mode === 'acik' ? 'Açınım açık.' : 'Kutu kapalı.');
      });
    }

    loadDeployGGB().then((GGBApplet) => {
      if (destroyed) return;
      const width = Math.max(300, Math.round(canvas.clientWidth || host.clientWidth || 340));
      const height = Math.max(300, Math.round(canvas.clientHeight || 340));
      const appletParams = {
        appName: '3d',
        language: 'en',
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
        enableLabelDrags: false,
        enableShiftDragZoom: true,
        errorDialogsActive: false,
        showLogging: false,
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
                const w = Math.max(300, Math.round(canvas.clientWidth || width));
                const h = Math.max(300, Math.round(canvas.clientHeight || height));
                try {
                  api.setSize(w, h);
                } catch (error) {
                  /* ölçü değişimi başarısızsa mevcut boyut kalır */
                }
              }, 250);
            });
            observer.observe(canvas);
          }
        },
      };
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
      state: values,
      mode: () => mode,
      reset() {
        params.forEach((param) => { values[param.name] = param.value; });
        mode = conf.net ? 'kapali' : '';
        renderControls(controls, params, values, scope);
        if (viewsHost) viewsHost.innerHTML = orthographicSvg(values);
        const net = bar ? bar.querySelector('[data-ggb-net]') : null;
        if (net) net.textContent = 'Açınımı aç';
        if (api) {
          params.forEach((param) => {
            try {
              api.setValue(param.name, values[param.name]);
            } catch (error) {
              /* yok say */
            }
          });
          rebuild();
          if (box) box.view('egik');
        }
      },
      destroy() {
        destroyed = true;
        done = true;
        if (buildTimer) window.clearTimeout(buildTimer);
        if (observer) observer.disconnect();
        host.innerHTML = '';
        host.classList.remove('is-ready');
      },
    };
  }

  /* Denetimler için: üretilen GeoGebra komutlarını DOM olmadan döndürür. */
  function script(type, values, mode) {
    const conf = APPLETS[type];
    if (!conf) return [];
    const commands = [];
    const record = (command) => { commands.push(command); };
    const fake = {
      evalCommand: record,
      setColor() {},
      exists: () => false,
      deleteObject(name) { record(`Delete(${name})`); },
    };
    const state = {};
    conf.params.forEach((param) => {
      const raw = values && values[param.name];
      state[param.name] = Number(raw === undefined ? param.value : raw);
    });
    if (typeof conf.normalize === 'function') conf.normalize(state);
    const box = builder(fake);
    conf.build(box, state, mode || (conf.net ? 'kapali' : ''));
    return commands;
  }

  window.MATEMATIK_GEOGEBRA = Object.freeze({
    mount,
    supports,
    types,
    params,
    paramsOf,
    script,
    required: (type) => (APPLETS[type] ? APPLETS[type].required.slice() : []),
    label: (type) => (APPLETS[type] ? APPLETS[type].label : ''),
    hasNet: (type) => Boolean(APPLETS[type] && APPLETS[type].net),
    hasSplit: (type) => Boolean(APPLETS[type] && APPLETS[type].split),
    prefers,
    setPrefers,
    cdn: CDN,
  });
})();
