/* Matematik: GeoGebra köprüsü.
 *
 * Kural (26 Ekim 2026): **yirmi dört sahnenin hepsi GeoGebra ile açılır**; yerel SVG
 * yalnız yedektir. Sahneler elle çizilmiş koordinat üretmediği için "sayı ekran dışında"
 * türü hatalar oluşmaz: eksenler, çentikler ve etiketler GeoGebra'nın kendi motorundan gelir.
 *
 * - Applet görünüme girince yüklenir; 12 sn içinde açılmazsa ya da nesneleri oluşturamazsa
 *   aynı sahne yerel SVG motoruyla çizilir, kutu hiçbir zaman boş kalmaz.
 * - Nesne sayısı `getObjectNumber()` ve `exists()` ile doğrulanır; "sadece eksen" durumu
 *   sessiz kalmaz, ekrandaki durum satırına yazılır.
 * - Sürgüler GeoGebra içinde de vardır (2B'de gizlenir); HTML sürgü bandı `SetValue` ile
 *   aynı değişkeni sürer. Değer yazan metinler `refresh()` ile yeniden kurulur.
 * - Applet dili bilinçli olarak `en`: komut adları (Segment, Polygon…) yerelleştirilmiş
 *   arayüzde değişmesin. Arayüz zaten görünmüyor (araç çubuğu, menü, cebir girişi kapalı).
 * - Ticari olmayan kullanım; atıf sahnede ve THIRD-PARTY-NOTICES.md içinde.
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

  /* ---------- tercih ---------- */

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

  /* ---------- komut üretimi ---------- */

  /* GeoGebra komut sözdizimi her zaman nokta ondalığı kullanır; virgül ve U+2212
     geçerse komut sessizce düşer (yerel SVG'de yaşanan hatanın aynısı). */
  function f(value) {
    const number = Math.round(Number(value) * 1000) / 1000;
    if (!Number.isFinite(number)) return '0';
    return String(number);
  }

  /* Koordinat ve dizi sınırları sayı ya da GeoGebra ifadesi olabilir (ör. "a + b"). */
  function co(value) {
    if (typeof value === 'string' && value.trim() !== '') return value;
    return f(value);
  }

  function P(x, y) {
    return `(${co(x)}, ${co(y)})`;
  }

  function S(text) {
    return JSON.stringify(String(text));
  }

  function geogebraText(value) {
    return String(value);
  }

  function builder(api) {
    const run = (command) => {
      try {
        api.evalCommand(command);
      } catch (error) {
        /* komut hatası doğrulamada yakalanır */
      }
    };
    /* Etiketler: noktalar adlarıyla görünür, çizgi/çokgen/dairelerde etiket kalabalığı olmaz. */
    const names = [];
    const labeled = new Set();
    const box = {
      api,
      names,
      labeled,
      mark(name, showLabel) {
        names.push(name);
        if (showLabel) labeled.add(name);
        return name;
      },
      run,
      raw(name, command, showLabel) {
        box.mark(name, Boolean(showLabel));
        run(command);
      },
      point(name, x, y) {
        box.mark(name, true);
        run(`${name} = ${P(x, y)}`);
      },
      vector(name, x1, y1, x2, y2) {
        run(`${name} = Vector(${P(x1, y1)}, ${P(x2, y2)})`);
      },
      segment(name, x1, y1, x2, y2) {
        box.mark(name, false);
        run(`${name} = Segment(${P(x1, y1)}, ${P(x2, y2)})`);
      },
      polygon(name, points) {
        box.mark(name, false);
        run(`${name} = Polygon(${points.map(([x, y]) => P(x, y)).join(', ')})`);
      },
      circle(name, x, y, r) {
        box.mark(name, false);
        run(`${name} = Circle(${P(x, y)}, ${co(r)})`);
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
      pointSize(name, size) {
        run(`SetPointSize(${name}, ${f(size)})`);
      },
      fill(name, opacity) {
        run(`SetFilling(${name}, ${f(opacity)})`);
      },
      hide(name) {
        run(`SetVisibleInView(${name}, 1, false)`);
      },
      caption(name, text, mode) {
        box.labeled.add(name);
        run(`SetCaption(${name}, ${S(text)})`);
        run(`SetLabelMode(${name}, ${f(mode === undefined ? 3 : mode)})`);
      },
      fixed(name) {
        run(`SetFixed(${name}, true)`);
      },
      text(name, text, x, y) {
        box.remove(name);
        run(`${name} = Text(${S(text)}, ${P(x, y)})`);
      },
      latex(name, tex, x, y) {
        box.text(name, `$${tex}$`, x, y);
      },
      remove(name) {
        /* Var olmayan nesneyi silmeye çalışmak komut hatası üretir. */
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
      sequence(name, expression, variable, from, to) {
        box.mark(name, false);
        run(`${name} = Sequence(${expression}, ${variable}, ${co(from)}, ${co(to)})`);
      },
    };
    return box;
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
    blue: [44, 111, 168],
  };

  /* ---------- applet tanımları (24 sahnenin tamamı) ---------- */

  const APPLETS = {
    'sayi-dogrusu': {
      label: 'Sayı doğrusu',
      bounds: [-9, 9, -4, 4],
      axes: [true, false],
      params: [{ name: 'a', label: 'Sayı (a)', min: -7, max: 7, step: 1, value: 3 }],
      /* PA/PT a = 0 iken sıfır uzunlukta olur: zorunlu nesne sayılmaz. */
      required: ['sifir', 'P', 'ters'],
      build(b, values) {
        b.slider('a', -7, 7, 1);
        b.set('a', values.a);
        b.hide('a');
        b.point('sifir', 0, 0);
        b.point('P', 'a', 0);
        b.point('ters', '-a', 0);
        b.segment('PA', 0, 0, 'a', 0);
        b.segment('PT', 0, 0, '-a', 0);
        b.color('PA', COLOR.purple);
        b.color('PT', COLOR.green);
        b.thickness('PA', 5);
        b.thickness('PT', 5);
        b.pointSize('P', 6);
        b.pointSize('ters', 6);
        b.color('P', COLOR.purple);
        b.color('ters', COLOR.green);
        b.caption('P', 'a');
        b.caption('ters', '−a');
        b.caption('sifir', '0');
        b.pointSize('sifir', 4);
      },
    },

    'iki-sayi': {
      label: 'İki sayı',
      bounds: [-9, 9, -4, 4],
      axes: [true, false],
      params: [
        { name: 'a', label: '1. sayı (a)', min: -7, max: 7, step: 1, value: -7 },
        { name: 'b', label: '2. sayı (b)', min: -7, max: 7, step: 1, value: -3 },
      ],
      required: ['A', 'B'],
      build(b, values) {
        b.slider('a', -7, 7, 1);
        b.slider('b', -7, 7, 1);
        b.set('a', values.a);
        b.set('b', values.b);
        b.hide('a');
        b.hide('b');
        b.point('A', 'a', 0);
        b.point('B', 'b', 0);
        b.segment('uzaklik', 'a', 0, 'b', 0);
        b.thickness('uzaklik', 6);
        b.color('uzaklik', COLOR.purple);
        b.pointSize('A', 6);
        b.pointSize('B', 6);
        b.color('A', COLOR.purple);
        b.color('B', COLOR.green);
        b.caption('A', 'a');
        b.caption('B', 'b');
      },
    },

    sicaklik: {
      label: 'Sıcaklıklar',
      bounds: [-170, 70, -2, 2],
      axes: [true, false],
      params: [
        { name: 't1', label: 'A gezegeni (°C)', min: -150, max: 0, step: 10, value: -120 },
        { name: 't2', label: 'B gezegeni (°C)', min: -150, max: 0, step: 10, value: -60 },
        { name: 't3', label: 'C gezegeni (°C)', min: 0, max: 50, step: 5, value: 15 },
      ],
      required: ['A', 'B', 'C'],
      build(b, values) {
        b.slider('t1', -150, 0, 10);
        b.slider('t2', -150, 0, 10);
        b.slider('t3', 0, 50, 5);
        b.set('t1', values.t1);
        b.set('t2', values.t2);
        b.set('t3', values.t3);
        b.hide('t1');
        b.hide('t2');
        b.hide('t3');
        b.point('A', 't1', 0.35);
        b.point('B', 't2', 0.35);
        b.point('C', 't3', 0.35);
        b.segment('fark', 't1', 0.35, 't2', 0.35);
        b.thickness('fark', 5);
        b.color('fark', COLOR.blue);
        b.pointSize('A', 6);
        b.pointSize('B', 6);
        b.pointSize('C', 6);
        b.color('A', COLOR.blue);
        b.color('B', COLOR.blue);
        b.color('C', COLOR.red);
        b.caption('A', 'A');
        b.caption('B', 'B');
        b.caption('C', 'C');
      },
    },

    'sifir-toplama': {
      label: 'Kartlarla toplama',
      bounds: [-18, 18, -3, 3],
      axes: [true, false],
      params: [
        { name: 's1', label: '1. kart', min: -5, max: 5, step: 1, value: 3 },
        { name: 's2', label: '2. kart', min: -5, max: 5, step: 1, value: -3 },
        { name: 's3', label: '3. kart', min: -5, max: 5, step: 1, value: 2 },
      ],
      required: ['P0', 'P1', 'P2', 'P3'],
      build(b, values) {
        ['s1', 's2', 's3'].forEach((name) => b.slider(name, -5, 5, 1));
        b.set('s1', values.s1);
        b.set('s2', values.s2);
        b.set('s3', values.s3);
        ['s1', 's2', 's3'].forEach((name) => b.hide(name));
        b.point('P0', 0, 0);
        b.point('P1', 's1', 0);
        b.point('P2', 's1 + s2', 0);
        b.point('P3', 's1 + s2 + s3', 0);
        b.vector('v1', 0, 0.75, 's1', 0.75);
        b.vector('v2', 's1', 1.05, 's1 + s2', 1.05);
        b.vector('v3', 's1 + s2', 1.35, 's1 + s2 + s3', 1.35);
        b.color('v1', COLOR.purple);
        b.color('v2', COLOR.green);
        b.color('v3', COLOR.amber);
        b.thickness('v1', 5);
        b.thickness('v2', 5);
        b.thickness('v3', 5);
        b.pointSize('P3', 6);
        b.color('P3', COLOR.red);
        b.caption('P1', '1. kart', 2);
        b.caption('P2', '2. kart', 2);
        b.caption('P3', 'toplam', 2);
      },
    },

    'mutlak-deger': {
      label: 'Mutlak değer',
      bounds: [-11, 11, -4, 4],
      axes: [true, false],
      params: [{ name: 'a', label: 'Sayı (a)', min: -9, max: 9, step: 1, value: -6 }],
      required: ['O', 'P', 'ters'],
      build(b, values) {
        b.slider('a', -9, 9, 1);
        b.set('a', values.a);
        b.hide('a');
        b.point('O', 0, 0);
        b.point('P', 'a', 0);
        b.point('ters', '-a', 0);
        b.segment('uzaklik', 0, 0, 'a', 0);
        b.circle('cevre', 0, 0, 'abs(a)');
        b.thickness('uzaklik', 6);
        b.color('uzaklik', COLOR.green);
        b.color('cevre', COLOR.gray);
        b.lineStyle('cevre', 1);
        b.pointSize('P', 6);
        b.color('P', COLOR.purple);
        b.caption('P', 'a');
        b.caption('ters', '−a');
        b.caption('O', '0', 2);
      },
    },

    'kesir-serit': {
      label: 'Kesir şeridi',
      bounds: [-1, 11, -2, 2.4],
      axes: [false, false],
      params: [
        { name: 'd', label: 'Payda (kaç eş parça)', min: 2, max: 10, step: 1, value: 4 },
        { name: 'n', label: 'Pay (kaç parça boyandı)', min: 0, max: 10, step: 1, value: 3 },
      ],
      required: ['serit', 'bolme'],
      normalize(values) {
        values.d = Math.min(10, Math.max(2, Math.round(values.d)));
        values.n = Math.min(values.d, Math.max(0, Math.round(values.n)));
      },
      build(b, values) {
        b.slider('d', 2, 10, 1);
        b.slider('n', 0, 10, 1);
        b.set('d', values.d);
        b.set('n', values.n);
        b.hide('d');
        b.hide('n');
        b.polygon('serit', [[0, 0], [10, 0], [10, 1], [0, 1]]);
        b.color('serit', COLOR.light);
        b.sequence('bolme', 'Segment((i, 0), (i, 1))', 'i', 1, 'd - 1');
        b.color('bolme', COLOR.ink);
        b.sequence('boyali', 'Polygon((i, 0), (i + 1, 0), (i + 1, 1), (i, 1))', 'i', 0, 'n - 1');
        b.color('boyali', COLOR.purple);
        b.fill('boyali', 0.85);
        b.text('etiket', 'şerit d eş parçaya bölünür; boyanan parça sayısı paydır', 0, -0.9);
        b.color('etiket', COLOR.purple);
        b.fixed('etiket');
      },
    },

    'sayma-pullari': {
      label: 'Sayma pulları',
      bounds: [-2, 8, -3, 3],
      axes: [false, false],
      params: [
        { name: 'p', label: 'Pozitif pul (+)', min: 0, max: 6, step: 1, value: 4 },
        { name: 'n', label: 'Negatif pul (−)', min: 0, max: 6, step: 1, value: 6 },
      ],
      required: ['ust', 'alt'],
      build(b, values) {
        b.slider('p', 0, 6, 1);
        b.slider('n', 0, 6, 1);
        b.set('p', values.p);
        b.set('n', values.n);
        b.hide('p');
        b.hide('n');
        b.sequence('pozitif', 'Circle((i, 1), 0.32)', 'i', 0, 'p - 1');
        b.sequence('negatif', 'Circle((i, -1), 0.32)', 'i', 0, 'n - 1');
        b.sequence('ciftler', 'Segment((i, 0.65), (i, -0.65))', 'i', 0, 'Min(p, n) - 1');
        b.color('pozitif', COLOR.purple);
        b.color('negatif', COLOR.green);
        b.color('ciftler', COLOR.gray);
        b.lineStyle('ciftler', 1);
        b.fill('pozitif', 0.9);
        b.fill('negatif', 0.9);
        b.text('ust', 'pozitif pullar', -1.6, 1);
        b.text('alt', 'negatif pullar', -1.6, -1);
        b.color('ust', COLOR.purple);
        b.color('alt', COLOR.green);
        b.fixed('ust');
        b.fixed('alt');
      },
    },

    'kesir-isaret': {
      label: 'Eksi işaretinin yeri',
      bounds: [-6, 6, -4.5, 4.5],
      axes: [false, false],
      params: [
        { name: 'pay', label: 'Pay', min: 1, max: 9, step: 1, value: 8 },
        { name: 'payda', label: 'Payda', min: 2, max: 9, step: 1, value: 4 },
        { name: 'yer', label: 'Eksi işaretinin yeri', min: 0, max: 2, step: 1, value: 0 },
      ],
      required: ['kutu1', 'kutu2', 'kutu3', 'kesir'],
      build(b, values) {
        b.slider('pay', 1, 9, 1);
        b.slider('payda', 2, 9, 1);
        b.slider('yer', 0, 2, 1);
        b.set('pay', values.pay);
        b.set('payda', values.payda);
        b.set('yer', values.yer);
        ['pay', 'payda', 'yer'].forEach((name) => b.hide(name));
        b.polygon('kutu1', [[-5, -4], [-1.6, -4], [-1.6, -2.8], [-5, -2.8]]);
        b.polygon('kutu2', [[-1.2, -4], [2.2, -4], [2.2, -2.8], [-1.2, -2.8]]);
        b.polygon('kutu3', [[2.6, -4], [6, -4], [6, -2.8], [2.6, -2.8]]);
        b.text('t1', 'kesrin önü', -3.3, -3.55);
        b.text('t2', 'pay', 0.5, -3.55);
        b.text('t3', 'payda', 4.3, -3.55);
        ['t1', 't2', 't3'].forEach((name) => b.fixed(name));
      },
      /* Kutu rengi ve kesir yazımı sürgüye bağlıdır. */
      refresh(b, values) {
        const pick = Number(values.yer);
        const pay = Math.round(values.pay);
        const payda = Math.round(values.payda);
        const tex = pick === 0 ? `-\\frac{${pay}}{${payda}}`
          : pick === 1 ? `\\frac{-${pay}}{${payda}}`
            : `\\frac{${pay}}{-${payda}}`;
        b.latex('kesir', tex, -1.2, 1);
        b.color('kesir', COLOR.ink);
        b.fixed('kesir');
        [0, 1, 2].forEach((index) => {
          b.color(`kutu${index + 1}`, index === pick ? COLOR.light : [255, 255, 255]);
          b.thickness(`kutu${index + 1}`, index === pick ? 5 : 2);
        });
      },
    },

    'kesir-dogru': {
      label: 'Sayı doğrusunda kesir',
      bounds: [-5, 5, -2.6, 2.6],
      axes: [true, false],
      params: [
        { name: 'tam', label: 'Tam kısım', min: -3, max: 3, step: 1, value: 0 },
        { name: 'pay', label: 'Pay', min: 0, max: 9, step: 1, value: 3 },
        { name: 'payda', label: 'Payda', min: 2, max: 8, step: 1, value: 5 },
      ],
      normalize(values) {
        values.payda = Math.min(8, Math.max(2, Math.round(values.payda)));
        values.tam = Math.min(3, Math.max(-3, Math.round(values.tam)));
        values.pay = Math.min(values.payda - 1, Math.max(0, Math.round(values.pay)));
      },
      required: ['M', 'ana', 'ara'],
      build(b, values) {
        b.slider('tam', -3, 3, 1);
        b.slider('pay', 0, 9, 1);
        b.slider('payda', 2, 8, 1);
        b.set('tam', values.tam);
        b.set('pay', values.pay);
        b.set('payda', values.payda);
        ['tam', 'pay', 'payda'].forEach((name) => b.hide(name));
        /* İşaretin yeri: negatifse tam kısım da negatif yönde eklenir. */
        b.run('hedef = If(tam < 0, tam - pay / payda, tam + pay / payda)');
        b.hide('hedef');
        b.sequence('ana', 'Segment((w, -0.13), (w, 0.13))', 'w', -4, 4);
        /* İki değişkenli dizi: tam sayılar arası payda kadar eş parça. */
        b.run('ara = Sequence(Segment((w + j / payda, -0.08), (w + j / payda, 0.08)), w, -4, 3, j, 1, payda - 1)');
        b.color('ana', COLOR.ink);
        b.color('ara', COLOR.gray);
        b.point('M', 'hedef', 0);
        b.pointSize('M', 7);
        b.color('M', COLOR.purple);
        b.segment('ip', 'hedef', 0.35, 'hedef', 0);
        b.lineStyle('ip', 1);
        b.color('ip', COLOR.purple);
      },
      refresh(b, values) {
        const tam = Math.round(values.tam);
        const pay = Math.round(values.pay);
        const payda = Math.round(values.payda);
        let tex;
        if (pay === 0) tex = tam === 0 ? '0' : String(tam);
        else {
          const frac = `\\frac{${pay}}{${payda}}`;
          if (tam === 0) tex = frac;
          else if (tam < 0) tex = `-${Math.abs(tam)}${frac}`;
          else tex = `${tam}${frac}`;
        }
        b.caption('M', `$${tex}$`);
      },
    },

    'kat-yerlestir': {
      label: 'Sığınak katı',
      bounds: [-1, 8, -4.2, 5.2],
      axes: [false, false],
      params: [{ name: 'kat', label: 'Sığınağın katı', min: -3, max: 4, step: 1, value: 1 }],
      required: ['siginak'],
      build(b, values) {
        b.slider('kat', -3, 4, 1);
        b.set('kat', values.kat);
        b.hide('kat');
        for (let floor = -3; floor <= 4; floor += 1) {
          const name = `kat${floor < 0 ? 'a' : 'b'}${Math.abs(floor)}`;
          b.polygon(name, [[0, floor - 0.4], [5, floor - 0.4], [5, floor + 0.4], [0, floor + 0.4]]);
          b.color(name, floor === 0 ? COLOR.light : [255, 255, 255]);
          b.text(`y${name}`, floor === 0 ? '0 · zemin' : String(floor), -0.6, floor - 0.18);
          b.color(`y${name}`, COLOR.ink);
          b.fixed(`y${name}`);
        }
        b.point('siginak', 6.2, 'kat');
        b.pointSize('siginak', 8);
        b.color('siginak', COLOR.amber);
        b.caption('siginak', 'sığınak');
      },
    },

    'asansor-kat': {
      label: 'Asansör',
      bounds: [-1, 8, -4.2, 7.2],
      axes: [false, false],
      params: [{ name: 'kat', label: 'Asansörün katı', min: -3, max: 6, step: 1, value: 4 }],
      required: ['kabin'],
      build(b, values) {
        b.slider('kat', -3, 6, 1);
        b.set('kat', values.kat);
        b.hide('kat');
        for (let floor = -3; floor <= 6; floor += 1) {
          const name = `kat${floor < 0 ? 'a' : 'b'}${Math.abs(floor)}`;
          b.polygon(name, [[0, floor - 0.4], [5, floor - 0.4], [5, floor + 0.4], [0, floor + 0.4]]);
          b.color(name, floor === 0 ? COLOR.light : [255, 255, 255]);
          b.text(`y${name}`, String(floor), -0.6, floor - 0.18);
          b.color(`y${name}`, COLOR.ink);
          b.fixed(`y${name}`);
        }
        b.point('kabin', 6.2, 'kat');
        b.pointSize('kabin', 8);
        b.color('kabin', COLOR.purple);
        b.caption('kabin', 'asansör');
      },
    },

    'kesir-toplam': {
      label: 'Payda eşitleme',
      bounds: [-0.5, 7, -0.6, 5],
      axes: [false, false],
      params: [
        { name: 'a', label: '1. kesirde boyanan parça (pay)', min: 0, max: 2, step: 1, value: 1 },
        { name: 'c', label: '2. kesirde boyanan parça (pay)', min: 0, max: 3, step: 1, value: 1 },
      ],
      required: ['serit1', 'serit2', 'serit3', 'bolme3'],
      build(b, values) {
        b.slider('a', 0, 2, 1);
        b.slider('c', 0, 3, 1);
        b.set('a', values.a);
        b.set('c', values.c);
        b.hide('a');
        b.hide('c');
        b.polygon('serit1', [[0, 0], [2, 0], [2, 1], [0, 1]]);
        b.sequence('bolme1', 'Segment((i, 0), (i, 1))', 'i', 1, 1);
        b.sequence('boyali1', 'Polygon((i, 0), (i + 1, 0), (i + 1, 1), (i, 1))', 'i', 0, 'a - 1');
        b.polygon('serit2', [[0, 1.6], [3, 1.6], [3, 2.6], [0, 2.6]]);
        b.sequence('bolme2', 'Segment((i, 1.6), (i, 2.6))', 'i', 1, 2);
        b.sequence('boyali2', 'Polygon((i, 1.6), (i + 1, 1.6), (i + 1, 2.6), (i, 2.6))', 'i', 0, 'c - 1');
        b.polygon('serit3', [[0, 3.2], [6, 3.2], [6, 4.2], [0, 4.2]]);
        b.sequence('bolme3', 'Segment((i, 3.2), (i, 4.2))', 'i', 1, 5);
        b.color('serit1', COLOR.light);
        b.color('serit2', COLOR.mint);
        b.color('serit3', [255, 255, 255]);
        b.color('boyali1', COLOR.purple);
        b.color('boyali2', COLOR.green);
        b.fill('boyali1', 0.85);
        b.fill('boyali2', 0.85);
        b.thickness('bolme1', 2);
        b.thickness('bolme2', 2);
        b.thickness('bolme3', 2);
        b.text('e1', '1. şerit: 1/2', -0.4, -0.4);
        b.text('e2', '2. şerit: 1/3', -0.4, 1.2);
        b.text('e3', 'eşit parçalara bölünmüş ortak şerit', -0.4, 2.8);
        ['e1', 'e2', 'e3'].forEach((name) => {
          b.color(name, COLOR.ink);
          b.fixed(name);
        });
      },
    },

    'kesir-carpim': {
      label: 'Kesirlerde çarpma',
      bounds: [-1, 7.5, -1, 6.5],
      axes: [false, false],
      params: [
        { name: 'n1', label: 'Birinci kesrin payı', min: 1, max: 4, step: 1, value: 2 },
        { name: 'd1', label: 'Birinci kesrin paydası', min: 2, max: 5, step: 1, value: 3 },
        { name: 'n2', label: 'İkinci kesrin payı', min: 1, max: 4, step: 1, value: 3 },
        { name: 'd2', label: 'İkinci kesrin paydası', min: 2, max: 5, step: 1, value: 4 },
      ],
      required: ['kare', 'dikey', 'yatay', 'boyali'],
      build(b, values) {
        b.slider('n1', 1, 4, 1);
        b.slider('d1', 2, 5, 1);
        b.slider('n2', 1, 4, 1);
        b.slider('d2', 2, 5, 1);
        ['n1', 'd1', 'n2', 'd2'].forEach((name) => {
          b.set(name, values[name]);
          b.hide(name);
        });
        b.polygon('kare', [[0, 0], [5, 0], [5, 5], [0, 5]]);
        b.color('kare', [255, 255, 255]);
        b.sequence('dikey', 'Segment((5 i / d2, 0), (5 i / d2, 5))', 'i', 1, 'd2 - 1');
        b.sequence('yatay', 'Segment((0, 5 i / d1), (5, 5 i / d1))', 'i', 1, 'd1 - 1');
        b.polygon('boyali', [[0, 0], ['5 n2 / d2', 0], ['5 n2 / d2', '5 n1 / d1'], [0, '5 n1 / d1']]);
        b.color('boyali', COLOR.purple);
        b.fill('boyali', 0.55);
        b.color('dikey', COLOR.gray);
        b.color('yatay', COLOR.gray);
        b.text('etiket', 'satır: birinci kesir · sütun: ikinci kesir', 0, 5.4);
        b.color('etiket', COLOR.ink);
        b.fixed('etiket');
      },
    },

    'isaret-kurali': {
      label: 'İşaret kuralı',
      bounds: [-8, 8, -8, 8],
      axes: [true, false],
      params: [
        { name: 'a', label: 'Birinci sayı (a)', min: -6, max: 6, step: 1, value: -4 },
        { name: 'b', label: 'İkinci sayı (b)', min: -6, max: 6, step: 1, value: 3 },
      ],
      required: ['A', 'B', 'toplam'],
      build(b, values) {
        b.slider('a', -6, 6, 1);
        b.slider('b', -6, 6, 1);
        b.set('a', values.a);
        b.set('b', values.b);
        b.hide('a');
        b.hide('b');
        b.point('A', 'a', 0);
        b.point('B', 'b', 0);
        b.point('toplam', 'a + b', 0);
        b.polygon('alan', [[0, 0], ['a', 0], ['a', 'b'], [0, 'b']]);
        b.color('alan', COLOR.light);
        b.fill('alan', 0.65);
        b.segment('v1', 0, 0, 'a', 0);
        b.segment('v2', 0, 0, 0, 'b');
        b.thickness('v1', 4);
        b.thickness('v2', 4);
        b.color('v1', COLOR.purple);
        b.color('v2', COLOR.green);
        b.pointSize('A', 6);
        b.pointSize('B', 6);
        b.color('A', COLOR.purple);
        b.color('B', COLOR.green);
        b.color('toplam', COLOR.red);
        b.pointSize('toplam', 6);
        b.caption('A', 'a');
        b.caption('B', 'b');
        b.caption('toplam', 'a + b');
      },
    },

    prizma3b: {
      label: 'Prizma (3B)',
      appName: '3d',
      bounds: null,
      params: [
        { name: 'a', label: 'Genişlik', min: 1, max: 6, step: 1, value: 4 },
        { name: 'b', label: 'Derinlik', min: 1, max: 5, step: 1, value: 2 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 5, step: 1, value: 3 },
      ],
      required: ['taban', 'ust', 'y1', 'y2', 'y3', 'y4'],
      build(b, values) {
        b.slider('a', 1, 6, 1);
        b.slider('b', 1, 5, 1);
        b.slider('h', 1, 5, 1);
        b.set('a', values.a);
        b.set('b', values.b);
        b.set('h', values.h);
        /* Yalnız temel komutlar: Polygon + Segment. Prism komutu sürüm değişince
           nesne üretmeyebiliyor; o durumda tuval boş kalıyordu. */
        b.run('P1 = (0, 0, 0)');
        b.run('P2 = (a, 0, 0)');
        b.run('P3 = (a, b, 0)');
        b.run('P4 = (0, b, 0)');
        b.run('Q1 = (0, 0, h)');
        b.run('Q2 = (a, 0, h)');
        b.run('Q3 = (a, b, h)');
        b.run('Q4 = (0, b, h)');
        b.run('taban = Polygon(P1, P2, P3, P4)');
        b.run('ust = Polygon(Q1, Q2, Q3, Q4)');
        b.run('y1 = Segment(P1, Q1)');
        b.run('y2 = Segment(P2, Q2)');
        b.run('y3 = Segment(P3, Q3)');
        b.run('y4 = Segment(P4, Q4)');
        b.color('taban', COLOR.purple);
        b.color('ust', [168, 155, 226]);
        ['y1', 'y2', 'y3', 'y4'].forEach((name) => b.color(name, COLOR.purple));
        b.fill('taban', 0.8);
        b.fill('ust', 0.8);
      },
    },

    acim: {
      label: 'Açınım',
      bounds: [-1, 11, -1, 9],
      axes: [false, false],
      params: [
        { name: 'a', label: 'Genişlik', min: 1, max: 5, step: 1, value: 4 },
        { name: 'b', label: 'Derinlik', min: 1, max: 5, step: 1, value: 3 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 5, step: 1, value: 2 },
      ],
      required: ['on', 'ust', 'alt', 'sag', 'sol'],
      build(b, values) {
        b.slider('a', 1, 5, 1);
        b.slider('b', 1, 5, 1);
        b.slider('h', 1, 5, 1);
        b.set('a', values.a);
        b.set('b', values.b);
        b.set('h', values.h);
        ['a', 'b', 'h'].forEach((name) => b.hide(name));
        b.polygon('on', [[0, 0], ['a', 0], ['a', 'h'], [0, 'h']]);
        b.polygon('ust', [[0, 'h'], ['a', 'h'], ['a', 'h + b'], [0, 'h + b']]);
        b.polygon('alt', [[0, '-b'], ['a', '-b'], ['a', 0], [0, 0]]);
        b.polygon('sag', [['a', 0], ['a + b', 0], ['a + b', 'h'], ['a', 'h']]);
        b.polygon('sol', [['-b', 0], [0, 0], [0, 'h'], ['-b', 'h']]);
        b.color('on', COLOR.purple);
        b.color('ust', COLOR.mint);
        b.color('alt', COLOR.light);
        b.color('sag', COLOR.mint);
        b.color('sol', COLOR.light);
        ['on', 'ust', 'alt', 'sag', 'sol'].forEach((name) => b.fill(name, 0.75));
        b.text('etiket', 'Karşılıklı yüzler eştir; açınım katlanınca kutu olur.', 0, 8.4);
        b.color('etiket', COLOR.ink);
        b.fixed('etiket');
      },
    },

    'uc-gorunum': {
      label: 'Üç görünüm',
      bounds: [-1, 13, -1, 7],
      axes: [false, false],
      params: [
        { name: 'a', label: 'Genişlik (ön görünüm)', min: 1, max: 4, step: 1, value: 3 },
        { name: 'b', label: 'Derinlik (yan görünüm)', min: 1, max: 3, step: 1, value: 2 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 3, step: 1, value: 2 },
      ],
      required: ['on', 'yan', 'tepe'],
      build(b, values) {
        b.slider('a', 1, 4, 1);
        b.slider('b', 1, 3, 1);
        b.slider('h', 1, 3, 1);
        b.set('a', values.a);
        b.set('b', values.b);
        b.set('h', values.h);
        ['a', 'b', 'h'].forEach((name) => b.hide(name));
        b.run('on = Sequence(Sequence(Polygon((i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1)), i, 0, a - 1), j, 0, h - 1)');
        b.run('yan = Sequence(Sequence(Polygon((a + 1 + i, j), (a + 1 + i + 1, j), (a + 1 + i + 1, j + 1), (a + 1 + i, j + 1)), i, 0, b - 1), j, 0, h - 1)');
        b.run('tepe = Sequence(Sequence(Polygon((i, h + 1 + j), (i + 1, h + 1 + j), (i + 1, h + 2 + j), (i, h + 2 + j)), i, 0, a - 1), j, 0, b - 1)');
        b.color('on', COLOR.purple);
        b.color('yan', COLOR.green);
        b.color('tepe', COLOR.amber);
        b.text('l1', 'ön', 0, -0.5);
        b.text('l2', 'yan', 'a + 1', -0.5);
        b.text('l3', 'üst', 0, 'h + 0.6');
        ['l1', 'l2', 'l3'].forEach((name) => {
          b.color(name, COLOR.ink);
          b.fixed(name);
        });
      },
    },

    hacim: {
      label: 'Hacim',
      bounds: [-1, 9, -1, 8],
      axes: [false, false],
      params: [
        { name: 'a', label: 'Taban uzunluğu', min: 1, max: 4, step: 1, value: 3 },
        { name: 'b', label: 'Taban genişliği', min: 1, max: 4, step: 1, value: 2 },
        { name: 'h', label: 'Katman sayısı', min: 1, max: 4, step: 1, value: 2 },
      ],
      required: ['katman'],
      build(b, values) {
        b.slider('a', 1, 4, 1);
        b.slider('b', 1, 4, 1);
        b.slider('h', 1, 4, 1);
        b.set('a', values.a);
        b.set('b', values.b);
        b.set('h', values.h);
        ['a', 'b', 'h'].forEach((name) => b.hide(name));
        b.polygon('taban', [[0, 0], ['a', 0], ['a', 'b'], [0, 'b']]);
        b.color('taban', COLOR.light);
        /* Katmanlar kaydırılmış kareler olarak üst üste: her katman a·b birim küp taşır. */
        b.run('katman = Sequence(Polygon((0.3 k, 0.3 k), (a + 0.3 k, 0.3 k), (a + 0.3 k, b + 0.3 k), (0.3 k, b + 0.3 k)), k, 1, h)');
        b.color('katman', COLOR.purple);
        b.fill('katman', 0.35);
        b.text('etiket', 'Taban a·b birim kare; her katman taban kadar küp taşır.', 0, -0.7);
        b.color('etiket', COLOR.ink);
        b.fixed('etiket');
      },
    },

    'birim-donusum': {
      label: 'Birim dönüşümü',
      appName: '3d',
      bounds: null,
      params: [{ name: 's', label: 'Ayrıt (dm)', min: 1, max: 6, step: 1, value: 2 }],
      required: ['kup', 'birim'],
      build(b, values) {
        b.slider('s', 1, 6, 1);
        b.set('s', values.s);
        b.run('kup = Cube((0, 0, 0), (s, 0, 0))');
        b.run('birim = Cube((0, 0, 0), (1, 0, 0))');
        b.color('kup', COLOR.purple);
        b.color('birim', COLOR.amber);
        b.fill('kup', 0.6);
        b.fill('birim', 0.9);
        b.text('etiket', '1 dm³ = 1 L = 1000 cm³', 0, 0);
      },
    },

    'veri-grafik': {
      label: 'Sütun grafiği',
      bounds: [-1, 9, -1.5, 10],
      axes: [true, true],
      params: [
        { name: 'a', label: '1. grup', min: 1, max: 8, step: 1, value: 4 },
        { name: 'b', label: '2. grup', min: 1, max: 8, step: 1, value: 6 },
        { name: 'c', label: '3. grup', min: 1, max: 8, step: 1, value: 8 },
      ],
      required: ['grafik'],
      build(b, values) {
        ['a', 'b', 'c'].forEach((name) => b.slider(name, 1, 8, 1));
        ['a', 'b', 'c'].forEach((name) => {
          b.set(name, values[name]);
          b.hide(name);
        });
        /* BarChart ham veriyi sıklığa çevirir; sütunlar doğrudan değerle çizilir. */
        b.run('seri = {a, b, c}');
        b.run('grafik = Sequence(Polygon((i, 0), (i + 1, 0), (i + 1, Element(seri, i + 1)), (i, Element(seri, i + 1))), i, 1, 3)');
        b.color('grafik', COLOR.purple);
        b.fill('grafik', 0.75);
        b.text('l1', '1. grup', 0, -0.9);
        b.text('l2', '2. grup', 1, -0.9);
        b.text('l3', '3. grup', 2, -0.9);
        ['l1', 'l2', 'l3'].forEach((name) => {
          b.color(name, COLOR.ink);
          b.fixed(name);
        });
      },
    },

    ortalama: {
      label: 'Ortalama',
      bounds: [-1, 11, -3, 3],
      axes: [true, false],
      params: [
        { name: 'a', label: '1. değer', min: 1, max: 9, step: 1, value: 5 },
        { name: 'b', label: '2. değer', min: 1, max: 9, step: 1, value: 7 },
        { name: 'c', label: '3. değer', min: 1, max: 9, step: 1, value: 9 },
      ],
      required: ['P1', 'P2', 'P3', 'O'],
      build(b, values) {
        ['a', 'b', 'c'].forEach((name) => b.slider(name, 1, 9, 1));
        ['a', 'b', 'c'].forEach((name) => {
          b.set(name, values[name]);
          b.hide(name);
        });
        b.point('P1', 'a', 0.6);
        b.point('P2', 'b', 0.6);
        b.point('P3', 'c', 0.6);
        b.point('O', '(a + b + c) / 3', 0);
        b.segment('cizgi1', 'a', 0.6, 'a', 0);
        b.segment('cizgi2', 'b', 0.6, 'b', 0);
        b.segment('cizgi3', 'c', 0.6, 'c', 0);
        ['P1', 'P2', 'P3'].forEach((name) => {
          b.color(name, COLOR.purple);
          b.pointSize(name, 6);
        });
        b.color('O', COLOR.red);
        b.pointSize('O', 8);
        b.caption('P1', '1. değer');
        b.caption('P2', '2. değer');
        b.caption('P3', '3. değer');
        b.caption('O', 'ortalama');
      },
    },

    yansima: {
      label: 'Yansıma',
      bounds: [-5.5, 4.5, -0.5, 4.5],
      axes: [true, true],
      params: [{ name: 'k', label: 'Ayna doğrusu (x = k)', min: -1, max: 2, step: 1, value: 0 }],
      required: ['A', 'B', 'C', 'ucgen', 'ayna', 'A1', 'B1', 'C1', 'goruntu'],
      build(b, values) {
        b.slider('k', -1, 2, 1);
        b.set('k', values.k);
        b.hide('k');
        b.run('ayna = Line((k, -2), (k, 6))');
        b.point('A', 1, 1);
        b.point('B', 2, 1);
        b.point('C', 1, 3);
        b.run('ucgen = Polygon(A, B, C)');
        b.run('A1 = Reflect(A, ayna)');
        b.run('B1 = Reflect(B, ayna)');
        b.run('C1 = Reflect(C, ayna)');
        b.run('goruntu = Polygon(A1, B1, C1)');
        b.run('k1 = Segment(A, A1)');
        b.run('k2 = Segment(B, B1)');
        b.run('k3 = Segment(C, C1)');
        ['k1', 'k2', 'k3'].forEach((name) => {
          b.lineStyle(name, 1);
          b.color(name, COLOR.gray);
        });
        b.color('ayna', COLOR.red);
        b.thickness('ayna', 5);
        b.color('ucgen', COLOR.purple);
        b.color('goruntu', COLOR.green);
        b.fill('ucgen', 0.5);
        b.fill('goruntu', 0.5);
      },
    },

    ortadikme: {
      label: 'Orta dikme',
      bounds: [-2, 8, -1, 7],
      axes: [true, true],
      params: [
        { name: 'ax', label: 'A noktası (x)', min: 0, max: 4, step: 1, value: 2 },
        { name: 'by', label: 'B noktası (y)', min: 1, max: 5, step: 1, value: 4 },
      ],
      required: ['A', 'B', 'AB', 'd', 'M', 'P', 'PA', 'PB'],
      build(b, values) {
        b.slider('ax', 0, 4, 1);
        b.slider('by', 1, 5, 1);
        b.set('ax', values.ax);
        b.set('by', values.by);
        b.hide('ax');
        b.hide('by');
        b.run('A = (ax, 1)');
        b.run('B = (5, by)');
        b.run('AB = Segment(A, B)');
        b.run('c1 = Circle(A, B)');
        b.run('c2 = Circle(B, A)');
        b.run('d = PerpendicularBisector(A, B)');
        b.run('M = Midpoint(AB)');
        b.run('P = Point(d)');
        b.run('PA = Segment(P, A)');
        b.run('PB = Segment(P, B)');
        b.color('c1', COLOR.gray);
        b.color('c2', COLOR.gray);
        b.lineStyle('c1', 1);
        b.lineStyle('c2', 1);
        b.color('d', COLOR.red);
        b.thickness('d', 5);
        b.color('PA', COLOR.green);
        b.color('PB', COLOR.green);
      },
    },

    aciortay: {
      label: 'Açıortay',
      bounds: [-1, 7, -1, 7],
      axes: [true, true],
      params: [{ name: 'aci', label: 'Açı ölçüsü (°)', min: 30, max: 150, step: 10, value: 80 }],
      required: ['K', 'A', 'B', 'r1', 'r2', 'b1'],
      build(b, values) {
        b.slider('aci', 30, 150, 10);
        b.set('aci', values.aci);
        b.hide('aci');
        b.run('K = (0, 0)');
        b.run('A = (6, 0)');
        b.run('B = (5 cos(aci * pi / 180), 5 sin(aci * pi / 180))');
        b.run('r1 = Ray(K, A)');
        b.run('r2 = Ray(K, B)');
        b.run('b1 = AngleBisector(A, K, B)');
        b.color('b1', COLOR.red);
        b.thickness('b1', 5);
        b.color('r1', COLOR.ink);
        b.color('r2', COLOR.ink);
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

  /* Sahne tanımı kendi sürgülerini verebilir (kitap akışındaki etiketler/aralıklar). */
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

  function normalizeValues(found, values) {
    if (found && typeof found.normalize === 'function') found.normalize(values);
    return values;
  }

  /* Nesne etiketleri: noktalar görünür, çizgi/çokgen/daire etiketleri kapalı. */
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

  function mount(host, controls, scene, options) {
    if (!host || !scene || !APPLETS[scene.type]) return null;
    /* Yükleme bir kez başarısız olduysa sayfa boyunca yeniden denenmez:
       her sahnede 12 sn beklemek yerine doğrudan yerel çizim açılır. */
    if (loadFailed) return null;
    const conf = APPLETS[scene.type];
    const settings = options || {};
    const fallback = typeof settings.fallback === 'function' ? settings.fallback : function () {};
    const status = typeof settings.onStatus === 'function' ? settings.onStatus : function () {};
    const withGeo = settings.withGeo === undefined ? 'GeoGebra' : settings.withGeo;
    uid += 1;
    const scope = `ggb${uid}`;
    const params = paramsOf(scene);
    const values = {};
    params.forEach((param) => { values[param.name] = param.value; });
    normalizeValues(conf, values);

    let api = null;
    let done = false;
    let destroyed = false;
    let buildTimer = null;
    let observer = null;

    host.innerHTML = `<div class="math-ggb-loading">${withGeo} hazırlanıyor… <span>Açılmazsa “Yerel çizime geç” ile devam edebilirsin.</span></div>`;
    const canvas = document.createElement('div');
    canvas.className = 'math-ggb-canvas';
    canvas.id = `ggb-${scope}`;
    host.appendChild(canvas);
    renderControls(controls, params, values, scope);
    status(`${withGeo} hazırlanıyor…`);

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
      const missing = conf.required.filter((label) => (
        typeof api.exists === 'function' ? !api.exists(label) : true
      ));
      return total >= conf.required.length && missing.length === 0;
    }

    function build(attempt) {
      if (done || destroyed || !api) return;
      const delay = BUILD_DELAYS[Math.min(attempt, BUILD_DELAYS.length - 1)];
      buildTimer = window.setTimeout(() => {
        if (done || destroyed) return;
        try {
          if (conf.appName === '3d') {
            /* 3B uygulamasında perspektif komutu uygulanmaz: tuval boş kalıyordu. */
          } else {
            api.evalCommand('SetPerspective("G")');
          }
          if (conf.bounds) api.setCoordSystem(...conf.bounds);
          const axes = conf.axes || [true, true];
          if (typeof api.setAxesVisible === 'function') api.setAxesVisible(axes[0], axes[1]);
          if (typeof api.setGridVisible === 'function') api.setGridVisible(false);
          const box = builder(api);
          conf.build(box, values);
          if (typeof conf.refresh === 'function') conf.refresh(box, values);
          applyLabels(box);
        } catch (error) {
          /* komut hatası aşağıdaki doğrulamada yakalanır */
        }
        if (verify()) {
          done = true;
          if (observer) observer.disconnect();
          const count = typeof api.getObjectNumber === 'function' ? api.getObjectNumber() : conf.required.length;
          status(`${withGeo} hazır · ${count} nesne · sürgüleri ve noktaları deneyebilirsin.`);
          /* Perspektif değişimi tuvali yeniden ölçekleyebiliyor: bir kez daha oturt. */
          window.setTimeout(() => {
            if (destroyed || !api) return;
            try {
              if (conf.appName !== '3d') api.evalCommand('SetPerspective("G")');
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
      const sliders = controls ? controls.querySelectorAll('[data-scene-param]') : [];
      params.forEach((param) => {
        const input = controls ? controls.querySelector(`[data-scene-param="${param.name}"]`) : null;
        const out = controls ? controls.querySelector(`#scene-out-${scope}-${param.name}`) : null;
        if (!input) return;
        values[param.name] = Number(input.value);
        if (out) out.textContent = String(values[param.name]);
      });
      normalizeValues(conf, values);
      params.forEach((param) => {
        const input = controls ? controls.querySelector(`[data-scene-param="${param.name}"]`) : null;
        if (input && Number(input.value) !== values[param.name]) {
          input.value = String(values[param.name]);
          const out = controls.querySelector(`#scene-out-${scope}-${param.name}`);
          if (out) out.textContent = String(values[param.name]);
        }
      });
      if (!api) return;
      params.forEach((param) => {
        try {
          api.setValue(param.name, values[param.name]);
        } catch (error) {
          /* nesne henüz yoksa sessiz geç */
        }
      });
      if (typeof conf.refresh === 'function') {
        try {
          const box = builder(api);
          conf.refresh(box, values);
          applyLabels(box);
        } catch (error) {
          /* metin yenilenemezse çizim olduğu gibi kalır */
        }
      }
      if (sliders.length) status(`${withGeo} hazır · sürgüler çizimi güncelliyor.`);
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
        appName: conf.appName || 'geometry',
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
      if (conf.appName !== '3d') appletParams.perspective = 'G';
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
      reset() {
        params.forEach((param) => { values[param.name] = param.value; });
        normalizeValues(conf, values);
        renderControls(controls, params, values, scope);
        if (api) {
          params.forEach((param) => {
            try {
              api.setValue(param.name, values[param.name]);
            } catch (error) {
              /* yok say */
            }
          });
          if (typeof conf.refresh === 'function') {
            try {
              conf.refresh(builder(api), values);
            } catch (error) {
              /* yok say */
            }
          }
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

  /* Denetimler için: sahnenin ürettiği GeoGebra komutlarını DOM olmadan döndürür. */
  function script(type, values) {
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
    const params = conf.params;
    params.forEach((param) => {
      const raw = values && values[param.name];
      state[param.name] = Number(raw === undefined ? param.value : raw);
    });
    if (typeof conf.normalize === 'function') conf.normalize(state);
    const box = builder(fake);
    conf.build(box, state);
    if (typeof conf.refresh === 'function') conf.refresh(box, state);
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
    prefers,
    setPrefers,
    cdn: CDN,
  });
})();
