/* Matematik: GeoGebra köprüsü — yalnız üç boyutlu cisimler.
 *
 * Kural (27 Ekim 2026, 3. sürüm): GeoGebra **sadece 3B cisimlerde** kullanılır:
 *   prizma3b · hacim · birim-donusum · uc-gorunum · acim · bilesik-hacim · duzensiz-yigin
 * Diğer sahneler yerel SVG ile çizilir. Gerekçe: 2B sahnelerde
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
 * - `uc-gorunum` ve `duzensiz-yigin` sahneleri **bölünmüş** çalışır: solda döndürülebilir
 *   3B cisim, sağda ön/yan/üst dik izdüşümleri aynı sürgülerle eşzamanlı güncellenir.
 *   Düzensiz yığında izdüşümler gerçek siluettir (boşluklar ve basamaklar görünür).
 * - Hacim sahnelerinde **her birim küp ayrı nesnedir**: prizma tek blok olarak değil,
 *   sayılabilir küpler toplamı olarak çizilir (`hacim`, `bilesik-hacim`, `duzensiz-yigin`).
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

  /* Yüz renkleri: ön, yan ve üst yüz birbirinden ayrılsın diye üç ayrı ton.
     (Bkz. referans GeoGebra materyali: katı cisim tek renk değil, yüzleri ayrı okunur.) */
  const FACE_COLORS = {
    front: [72, 129, 176],
    back: [150, 176, 200],
    side: [95, 78, 168],
    top: [120, 160, 210],
    bottom: [176, 170, 196],
  };

  /* Birim küplerin dönüşümlü renkleri: komşu küpler birbirine karışmaz.
     Kat yükseldikçe ton değişir; üst katman maviye yaklaşır (üst yüz okunur). */
  const LEVEL_COLORS = [
    [[186, 176, 232], [206, 198, 240]],
    [[176, 214, 196], [199, 232, 214]],
    [[172, 203, 235], [199, 221, 244]],
    [[199, 186, 232], [221, 210, 243]],
  ];
  const cubeTint = (i, j, level) => {
    const band = LEVEL_COLORS[level % LEVEL_COLORS.length];
    return band[(i + j) % band.length];
  };

  /* Bakış yönleri. “Üst” tam dik (0,0,1) verilmez: dünya yukarı vektörüyle
     çakışınca GeoGebra döndürme eksenini bulamayıp donuyordu; küçük eğim
     görüntüyü bozmaz, donmayı önler. */
  const VIEWS = {
    egik: 'Vector((1.6, -2.4, 1.3))',
    on: 'Vector((0.001, -1, 0.002))',
    yan: 'Vector((1, 0.001, 0.002))',
    ust: 'Vector((0.04, -0.05, 1))',
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
      /* Yön verilmiş küp: kenarı z ekseni boyunca ilerler, böylece birim küpler
         taban düzlemine dik ve birbirine bitişik oturur (ızgara kaymaz). */
      cubeUp(name, x, y, z, edge) {
        box.mark(name, false);
        run(`${name} = Cube(${P(x, y, z)}, ${P(x + edge, y, z)}, Vector((0, 0, 1)))`);
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
      /* Dikdörtgen prizmanın altı yüzü ayrı nesne: ön/yan/üst farklı renkte.
         Kenar çizgileri koyu; yüz dolgusu yarı saydam ki birim küpler görünsün. */
      faces(x0, y0, z0, dx, dy, dz) {
        const list = [
          ['on', [[x0, y0, z0], [x0 + dx, y0, z0], [x0 + dx, y0, z0 + dz], [x0, y0, z0 + dz]], FACE_COLORS.front, 0.5],
          ['arka', [[x0, y0 + dy, z0], [x0 + dx, y0 + dy, z0], [x0 + dx, y0 + dy, z0 + dz], [x0, y0 + dy, z0 + dz]], FACE_COLORS.back, 0.38],
          ['sol', [[x0, y0, z0], [x0, y0 + dy, z0], [x0, y0 + dy, z0 + dz], [x0, y0, z0 + dz]], FACE_COLORS.side, 0.46],
          ['sag', [[x0 + dx, y0, z0], [x0 + dx, y0 + dy, z0], [x0 + dx, y0 + dy, z0 + dz], [x0 + dx, y0, z0 + dz]], FACE_COLORS.side, 0.46],
          ['taban', [[x0, y0, z0], [x0 + dx, y0, z0], [x0 + dx, y0 + dy, z0], [x0, y0 + dy, z0]], FACE_COLORS.bottom, 0.42],
          ['ust', [[x0, y0, z0 + dz], [x0 + dx, y0, z0 + dz], [x0 + dx, y0 + dy, z0 + dz], [x0, y0 + dy, z0 + dz]], FACE_COLORS.top, 0.42],
        ];
        list.forEach(([name, points, color, opacity]) => {
          box.polygon3(name, points);
          box.color(name, color);
          box.fill(name, opacity);
        });
      },
      /* Nokta işaretleri küçültülür, etiketler kapatılır: sahnede cisim görünür,
         işaret kalabalığı değil. Eksenler ve ızgara da kapanır. */
      polish() {
        names.slice().forEach((name) => {
          if (!labeled.has(name)) run(`SetLabelVisible(${name}, false)`);
          run(`SetPointSize(${name}, 1)`);
        });
        run('ShowAxes(false)');
        run('ShowGrid(false)');
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
      required: ['taban', 'ust', 'on', 'arka', 'sol', 'sag', 'birim'],
      build(b, v) {
        const a = Number(v.a);
        const b0 = Number(v.b);
        const h = Number(v.h);
        /* Cisim orijine ortalanır: görünüm ne olursa olsun kadrajda kalır. */
        const x0 = -a / 2;
        const y0 = -b0 / 2;
        const z0 = -h / 2;
        b.faces(x0, y0, z0, a, b0, h);
        /* Ölçek küpü: prizmanın köşesinde duran tek birim küp. */
        b.cubeUp('birim', x0, y0, z0, 1);
        b.color('birim', COLOR.amber);
        b.fill('birim', 0.9);
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
        b.color('taban', FACE_COLORS.bottom);
        b.color('ust', FACE_COLORS.top);
        b.fill('taban', 0.35);
        b.fill('ust', 0.3);
        /* Her birim küp ayrı bir nesne: öğrenci tek tek sayar, katmanı görür.
           Renkler komşu küpleri ayırır; ilk küp (birim) sarı kalır. */
        let count = 0;
        for (let level = 0; level < h; level += 1) {
          for (let j = 0; j < b0; j += 1) {
            for (let i = 0; i < a; i += 1) {
              count += 1;
              const name = count === 1 ? 'birim' : `k${count}`;
              b.cubeUp(name, x0 + i, y0 + j, z0 + level, 1);
              b.color(name, count === 1 ? COLOR.amber : cubeTint(i, j, level));
              b.fill(name, 0.92);
            }
          }
        }
      },
    },

    'birim-donusum': {
      label: 'Birim küp (3B)',
      views: true,
      params: [{ name: 's', label: 'Ayrıt (dm)', min: 1, max: 6, step: 1, value: 2 }],
      required: ['on', 'arka', 'sol', 'sag', 'taban', 'ust', 'birim'],
      build(b, v) {
        const s = Number(v.s);
        const half = s / 2;
        /* Ayrıtı s dm olan küp; içinde 1 dm³'lük birim küp köşede durur.
           Yüzler ayrı renkte; ayrıt ölçüsü yazı olarak sahnede durur. */
        b.faces(-half, -half, -half, s, s, s);
        b.cube('birim', -half, -half, -half, 1);
        b.color('birim', COLOR.amber);
        b.fill('birim', 0.85);
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
      required: ['taban', 'ust', 'on', 'arka', 'sol', 'sag'],
      build(b, v) {
        const a = Number(v.a);
        const b0 = Number(v.b);
        const h = Number(v.h);
        const x0 = -a / 2;
        const y0 = -b0 / 2;
        const z0 = -h / 2;
        b.faces(x0, y0, z0, a, b0, h);
      },
    },

    /* Bileşik (L) cisim: bütün bloktan bir köşe prizması kesilmiş gibi düşünülür.
       Cisim birim küplerden kurulur; hacim = kalan küplerin sayısı. */
    'bilesik-hacim': {
      label: 'Bileşik cisim (3B)',
      views: true,
      params: [
        { name: 'a', label: 'Genişlik', min: 3, max: 4, step: 1, value: 4 },
        { name: 'b', label: 'Derinlik', min: 2, max: 4, step: 1, value: 3 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 3, step: 1, value: 2 },
        { name: 'k', label: 'Kesilen parça', min: 1, max: 2, step: 1, value: 2 },
      ],
      required: ['taban', 'ust', 'kesik', 'birim'],
      build(b, v) {
        const a = Number(v.a);
        const b0 = Number(v.b);
        const h = Number(v.h);
        const k = Math.max(1, Math.min(Number(v.k), a - 1));
        const x0 = -a / 2;
        const y0 = -b0 / 2;
        const z0 = -h / 2;
        const solid = (i, j) => !(i >= a - k && j >= 1);
        const at = (i, j) => [x0 + i, y0 + j];
        /* Taban ve üst: L biçimli çevre. */
        const outline = [
          at(0, 0), at(a, 0), at(a, 1), at(a - k, 1), at(a - k, b0), at(0, b0),
        ];
        b.polygon3('taban', outline.map(([x, y]) => [x, y, z0]));
        b.polygon3('ust', outline.map(([x, y]) => [x, y, z0 + h]));
        /* Kesilen parçanın yeri: zeminde boş kalan dikdörtgen. */
        b.polygon3('kesik', [
          [x0 + a - k, y0 + 1, z0], [x0 + a, y0 + 1, z0], [x0 + a, y0 + b0, z0], [x0 + a - k, y0 + b0, z0],
        ]);
        let count = 0;
        for (let level = 0; level < h; level += 1) {
          for (let j = 0; j < b0; j += 1) {
            for (let i = 0; i < a; i += 1) {
              if (!solid(i, j)) continue;
              count += 1;
              const name = count === 1 ? 'birim' : `k${count}`;
              b.cubeUp(name, x0 + i, y0 + j, z0 + level, 1);
              b.color(name, count === 1 ? COLOR.amber : cubeTint(i, j, level));
              b.fill(name, 0.92);
            }
          }
        }
        b.color('taban', FACE_COLORS.bottom);
        b.color('ust', FACE_COLORS.top);
        b.color('kesik', COLOR.gray);
        b.fill('taban', 0.16);
        b.fill('ust', 0.1);
        b.fill('kesik', 0.22);
      },
    },

    /* Düzensiz küp yığını: sütun yükseklikleri desene göre değişir; ön, yan ve üst
       görünümler bu yüzden düz dikdörtgen değil, basamaklı siluetlerdir. */
    'duzensiz-yigin': {
      label: 'Düzensiz yığın (3B)',
      views: true,
      split: true,
      params: [
        { name: 'desen', label: 'Yapı', min: 1, max: 4, step: 1, value: 1 },
        { name: 'h', label: 'En yüksek sütun', min: 1, max: 3, step: 1, value: 3 },
      ],
      ortho(values) {
        return stackViewPanels(stackHeights(values));
      },
      required: ['taban', 'k1'],
      build(b, v) {
        const heights = stackHeights(v);
        const depth = heights.length;
        const width = heights[0].length;
        const top = Math.max(1, ...heights.flat());
        const x0 = -width / 2;
        const y0 = -depth / 2;
        const z0 = -top / 2;
        b.polygon3('taban', [
          [x0, y0, z0], [x0 + width, y0, z0], [x0 + width, y0 + depth, z0], [x0, y0 + depth, z0],
        ]);
        b.color('taban', FACE_COLORS.bottom);
        b.fill('taban', 0.35);
        let count = 0;
        heights.forEach((row, j) => {
          row.forEach((height, i) => {
            for (let level = 0; level < height; level += 1) {
              count += 1;
              const name = `k${count}`;
              b.cubeUp(name, x0 + i, y0 + j, z0 + level, 1);
              b.color(name, cubeTint(i, j, level));
              b.fill(name, 0.92);
            }
          });
        });
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
        }
      },
    },
  };

  /* ---------- düzensiz yığın: desen, yükseklik ve gerçek izdüşümler ---------- */

  /* Desenler 3 × 3 taban üzerinde tanımlıdır; satır 0 en öndeki sıradır.
     0 = boş kare. Seçilen en yüksek sütun değeri bütün yükseklikleri sınırlar. */
  const STACK_PATTERNS = {
    1: [[3, 2, 1], [2, 1, 1], [1, 1, 0]],
    2: [[1, 1, 1], [1, 3, 1], [0, 1, 0]],
    3: [[2, 2, 2], [0, 0, 2], [0, 0, 2]],
    4: [[2, 0, 2], [1, 0, 1], [1, 1, 1]],
  };

  function clampInt(value, min, max) {
    const number = Math.round(Number(value));
    if (!Number.isFinite(number)) return min;
    return Math.max(min, Math.min(max, number));
  }

  function stackHeights(values) {
    const source = values || {};
    const key = clampInt(source.desen === undefined ? 1 : source.desen, 1, 4);
    const cap = clampInt(source.h === undefined ? 3 : source.h, 1, 3);
    const pattern = STACK_PATTERNS[key] || STACK_PATTERNS[1];
    return pattern.map((row) => row.map((value) => Math.min(value, cap)));
  }

  /* Ön görünüm: her sütunda en yüksek küp silueti görünür.
     Yan görünüm: derinlik boyunca her sıranın en yüksek küpü.
     Üst görünüm: dolu kareler (yüksekliği 0 olan hücre boş kalır). */
  function stackViewPanels(heights) {
    const depth = heights.length;
    const width = heights[0].length;
    const top = Math.max(1, ...heights.flat());
    const front = [];
    for (let level = top; level >= 1; level -= 1) {
      const line = [];
      for (let i = 0; i < width; i += 1) line.push(heights.some((row) => row[i] >= level));
      front.push(line);
    }
    const side = [];
    for (let level = top; level >= 1; level -= 1) {
      const line = [];
      for (let j = 0; j < depth; j += 1) line.push(heights[j].some((value) => value >= level));
      side.push(line);
    }
    const plan = heights.map((row) => row.map((value) => value > 0));
    return [
      { key: 'on', title: 'Ön', cells: front, fill: '#d7ccf7' },
      { key: 'yan', title: 'Yan', cells: side, fill: '#cfe4f7' },
      { key: 'ust', title: 'Üst', cells: plan, fill: '#d5efdf' },
    ];
  }

  /* Düzgün prizmada üç görünüm de dolu dikdörtgendir. */
  function prismViewPanels(values) {
    const a = clampInt(values && values.a === undefined ? 1 : values.a, 1, 6);
    const b = clampInt(values && values.b === undefined ? 1 : values.b, 1, 5);
    const h = clampInt(values && values.h === undefined ? 1 : values.h, 1, 5);
    const full = (cols, rows) => Array.from({ length: rows }, () => Array.from({ length: cols }, () => true));
    return [
      { key: 'on', title: 'Ön', cells: full(a, h), fill: '#d7ccf7' },
      { key: 'yan', title: 'Yan', cells: full(b, h), fill: '#cfe4f7' },
      { key: 'ust', title: 'Üst', cells: full(a, b), fill: '#d5efdf' },
    ];
  }

  /* ---------- küçük dik izdüşüm panelleri (bölünmüş görünüm) ---------- */

  function orthographicSvg(values, conf) {
    const panels = conf && typeof conf.ortho === 'function'
      ? conf.ortho(values)
      : prismViewPanels(values);
    const cell = 18;
    const width = 3 * 96;
    const height = 132;
    const parts = [`<svg viewBox="0 0 ${width} ${height}" class="math-ggb-ortho" aria-hidden="true">`];
    panels.forEach((panel, index) => {
      const cells = Array.isArray(panel.cells) ? panel.cells : [];
      const rows = cells.length;
      const cols = rows ? cells[0].length : 0;
      const x0 = index * 96 + (96 - cols * cell) / 2;
      parts.push(`<rect x="${index * 96 + 4}" y="4" width="88" height="124" rx="10" fill="#fbfaff" stroke="#ded8f2"/>`);
      parts.push(`<text x="${index * 96 + 48}" y="21" text-anchor="middle" font-size="11" font-weight="800" fill="#33265f">${panel.title}</text>`);
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const filled = Boolean(cells[row][col]);
          parts.push(`<rect x="${x0 + col * cell}" y="${28 + row * cell}" width="${cell - 1.5}" height="${cell - 1.5}" rx="3" fill="${filled ? panel.fill : '#ffffff'}" stroke="${filled ? '#7056c9' : '#e6e1f6'}" stroke-width="${filled ? 0.9 : 0.7}"/>`);
        }
      }
      parts.push(`<text x="${index * 96 + 48}" y="${32 + rows * cell + 10}" text-anchor="middle" font-size="9.5" fill="#6b7a90">${cols} × ${rows} · kaç kare?</text>`);
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

  /* Applet çerçevesini sadeleştirir: cebir paneli, araç çubuğu ve giriş alanı
     kapatılır; yalnız 3B görünüm kalır. API sürümüne göre sessizce atlanır. */
  function stripChrome(target) {
    const attempts = [
      () => target.setPerspective && target.setPerspective('T'),
      () => target.setPerspective && target.setPerspective('-A'),
      () => target.evalCommand && target.evalCommand('SetPerspective("T")'),
      () => target.evalCommand && target.evalCommand('SetPerspective("-A")'),
      () => target.setAxesVisible && target.setAxesVisible(false, false, false),
      () => target.setGridVisible && target.setGridVisible(false),
    ];
    attempts.forEach((attempt) => {
      try {
        attempt();
      } catch (error) {
        /* sürüm desteklemiyorsa görünüm olduğu gibi kalır */
      }
    });
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
    if (viewsHost) viewsHost.innerHTML = orthographicSvg(values, conf);
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
      /* Nokta/etiket kalabalığı ve eksenler kapatılır: cisim öne çıkar. */
      if (typeof box.polish === 'function') box.polish();
    }

    function build(attempt) {
      if (done || destroyed || !api) return;
      const delay = BUILD_DELAYS[Math.min(attempt, BUILD_DELAYS.length - 1)];
      buildTimer = window.setTimeout(() => {
        if (done || destroyed) return;
        try {
          if (typeof api.setAxesVisible === 'function') api.setAxesVisible(false, false, false);
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
      if (viewsHost) viewsHost.innerHTML = orthographicSvg(values, conf);
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
        perspective: 'T',
        appletOnLoad(nextApi) {
          api = nextApi;
          if (destroyed) return;
          /* Yalnız 3B görünüm kalsın: soldaki cebir/nesne paneli (points, sliders
             listesi) kalabalık yapıyordu; referans materyalde de yalnız cisim var. */
          stripChrome(api);
          build(0);
          if (typeof window.ResizeObserver === 'function') {
            let debounce = null;
            let lastSize = `${width}x${height}`;
            observer = new window.ResizeObserver(() => {
              if (debounce) window.clearTimeout(debounce);
              debounce = window.setTimeout(() => {
                if (!api || destroyed || typeof api.setSize !== 'function') return;
                const w = Math.max(300, Math.round(canvas.clientWidth || width));
                const h = Math.max(300, Math.round(canvas.clientHeight || height));
                /* Ölçü değişmediyse yeniden boyutlandırma yok: setSize kutuyu
                   büyütüp yeniden tetikleyerek sonsuz döngü (donma) yapmasın. */
                const size = `${w}x${h}`;
                if (size === lastSize) return;
                lastSize = size;
                observer.disconnect();
                try {
                  api.setSize(w, h);
                } catch (error) {
                  /* ölçü değişimi başarısızsa mevcut boyut kalır */
                }
                window.setTimeout(() => {
                  if (!destroyed && observer) observer.observe(canvas);
                }, 300);
              }, 250);
            });
            observer.observe(canvas);
          }
        },
      };
      try {
        const applet = new GGBApplet(appletParams, true);
        applet.inject(canvas.id);
        /* Bekçi: applet hiç açılmazsa ekran “hazırlanıyor” yazısında kilitli
           kalmasın; süre dolunca durum yazılır ve yerel çizim gösterilir. */
        window.setTimeout(() => {
          if (destroyed || done || api) return;
          fail('GeoGebra açılmadı; yerel çizim gösteriliyor.');
        }, LOAD_TIMEOUT + 6000);
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
        if (viewsHost) viewsHost.innerHTML = orthographicSvg(values, conf);
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
    if (typeof box.polish === 'function') box.polish();
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
