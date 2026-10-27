/* Matematik sahneleri — birinci taraf etkileşimli SVG motoru.
   Dış servise bağlı değildir: her sahne çevrimdışı çizilir, sürgüler ve
   sürüklenebilir noktalar doğrudan çalışır. */
(() => {
  'use strict';

  const W = 640;
  const H = 380;

  const esc = (value) => String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  /* Sayı yazımı: ondalık virgülle, eksi işareti tipografik (−) olarak. */
  const num = (value) => {
    const rounded = Math.round(Number(value) * 100) / 100;
    return String(rounded).replace('.', ',').replace(/^-/, '−');
  };

  /* Ekran metni ile çizim sayısı ayrı yazılır: SVG özniteliğinde virgüllü ondalık
     ve tipografik eksi geçersizdir; tarayıcı özniteliği atar ve nesne (0,0)'a düşer. */
  const coord = (value) => {
    const number = Number(value);
    if (!Number.isFinite(number)) return '0';
    const rounded = Math.round(number * 100) / 100;
    return String(rounded);
  };

  /* ---------- ortak çizim yardımcıları ---------- */

  function text(x, y, value, options = {}) {
    const size = options.size || 13;
    const anchor = options.anchor || 'start';
    const weight = options.weight || 500;
    const fill = options.fill || '#1b2f49';
    const quotes = options.plain ? '' : 'font-family="system-ui,-apple-system,Segoe UI,sans-serif"';
    return `<text x="${coord(x)}" y="${coord(y)}" ${quotes} font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(value)}</text>`;
  }

  function line(x1, y1, x2, y2, options = {}) {
    const dash = options.dash ? ` stroke-dasharray="${options.dash}"` : '';
    return `<line x1="${coord(x1)}" y1="${coord(y1)}" x2="${coord(x2)}" y2="${coord(y2)}" stroke="${options.stroke || '#1b2f49'}" stroke-width="${options.width || 1.6}"${dash} stroke-linecap="round"/>`;
  }

  function rect(x, y, w, h, options = {}) {
    return `<rect x="${coord(x)}" y="${coord(y)}" width="${coord(w)}" height="${coord(h)}" fill="${options.fill || '#fff'}" stroke="${options.stroke || '#1b2f49'}" stroke-width="${options.width || 1.4}"${options.rx ? ` rx="${options.rx}"` : ''}/>`;
  }

  function circle(x, y, r, options = {}) {
    return `<circle cx="${coord(x)}" cy="${coord(y)}" r="${coord(r)}" fill="${options.fill || '#7056c9'}" stroke="${options.stroke || '#fff'}" stroke-width="${options.width || 2}"/>`;
  }

  function polygon(points, options = {}) {
    const list = points.map(([x, y]) => `${coord(x)},${coord(y)}`).join(' ');
    return `<polygon points="${list}" fill="${options.fill || 'none'}" stroke="${options.stroke || '#1b2f49'}" stroke-width="${options.width || 1.5}"${options.dash ? ` stroke-dasharray="${options.dash}"` : ''}/>`;
  }

  function arrow(x1, y1, x2, y2, options = {}) {
    const color = options.stroke || '#8a7fb5';
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const size = 7;
    const ax = x2 - size * Math.cos(angle - 0.42);
    const ay = y2 - size * Math.sin(angle - 0.42);
    const bx = x2 - size * Math.cos(angle + 0.42);
    const by = y2 - size * Math.sin(angle + 0.42);
    return `${line(x1, y1, x2, y2, { stroke: color, width: 1.4, dash: options.dash || '4 4' })}`
      + `<polygon points="${coord(x2)},${coord(y2)} ${coord(ax)},${coord(ay)} ${coord(bx)},${coord(by)}" fill="${color}"/>`;
  }

  function note(x, y, value, options = {}) {
    return text(x, y, value, { size: options.size || 12.5, fill: options.fill || '#41506a', weight: options.weight || 500 });
  }

  function panel(x, y, w, h) {
    return rect(x, y, w, h, { fill: '#fbfaff', stroke: '#e6e1f8', rx: 12 });
  }

  /* ---------- grafik koordinat sistemi ---------- */

  /* options.equal: yatay ve düşey ölçek eşitlenir. Dik açı, eğik kenar ve çember
     ancak bu durumda ekranda da doğru görünür (ör. orta dikme dik görünmeli). */
  function plotter(bounds, box = { x: 46, y: 34, w: W - 96, h: H - 96 }, options = {}) {
    let [xmin, xmax, ymin, ymax] = bounds;
    if (options.equal) {
      const cx = (xmin + xmax) / 2;
      const cy = (ymin + ymax) / 2;
      const scale = Math.min(box.w / (xmax - xmin), box.h / (ymax - ymin));
      const halfW = box.w / (2 * scale);
      const halfH = box.h / (2 * scale);
      xmin = cx - halfW;
      xmax = cx + halfW;
      ymin = cy - halfH;
      ymax = cy + halfH;
    }
    const px = (x) => box.x + ((x - xmin) / (xmax - xmin)) * box.w;
    const py = (y) => box.y + box.h - ((y - ymin) / (ymax - ymin)) * box.h;
    return { px, py, box, xmin, xmax, ymin, ymax };
  }

  function grid(p, options = {}) {
    const parts = [];
    const step = options.step || 1;
    const labelEvery = options.labelEvery || 1;
    for (let x = Math.ceil(p.xmin); x <= p.xmax; x += step) {
      parts.push(line(p.px(x), p.box.y, p.px(x), p.box.y + p.box.h, { stroke: x === 0 ? '#c8c2de' : '#eef0f6', width: x === 0 ? 1.5 : 1 }));
      if (labelEvery && Math.round(x / step) % labelEvery === 0 && options.labels !== false) {
        parts.push(text(p.px(x), p.box.y + p.box.h + 18, num(x), { size: 11, anchor: 'middle', fill: '#6b7a90' }));
      }
    }
    for (let y = Math.ceil(p.ymin); y <= p.ymax; y += step) {
      parts.push(line(p.box.x, p.py(y), p.box.x + p.box.w, p.py(y), { stroke: y === 0 ? '#c8c2de' : '#eef0f6', width: y === 0 ? 1.5 : 1 }));
      if (options.ylabels !== false && Math.abs(y) > 0.01) parts.push(text(p.box.x - 8, p.py(y) + 4, num(y), { size: 11, anchor: 'end', fill: '#6b7a90' }));
    }
    return parts.join('');
  }

  /* ---------- sürgü paneli (çizimin altında, ayrı bant) ---------- */

  let uid = 0;

  function controlsMarkup(params, state, scope) {
    if (!params.length) return '<p class="scene-empty">Bu sahnede ayar yok.</p>';
    return params.map((param) => `<div class="scene-slider">
        <label for="scene-${scope}-${esc(param.name)}">${esc(param.label || param.name)}
          <output id="scene-out-${scope}-${esc(param.name)}">${num(state[param.name])}</output>
        </label>
        <input type="range" id="scene-${scope}-${esc(param.name)}" data-scene-param="${esc(param.name)}"
          min="${param.min}" max="${param.max}" step="${param.step || 1}" value="${state[param.name]}">
      </div>`).join('');
  }

  /* ---------- düzensiz yığın ve simetri yardımcıları ---------- */

  /* Desenler 3 × 3 taban üzerinde tanımlıdır; satır 0 en öndeki sıradır.
     0 = boş kare. Seçilen en yüksek sütun değeri bütün yükseklikleri sınırlar. */
  const STACK_PATTERNS = {
    1: [[3, 2, 1], [2, 1, 1], [1, 1, 0]],
    2: [[1, 1, 1], [1, 3, 1], [0, 1, 0]],
    3: [[2, 2, 2], [0, 0, 2], [0, 0, 2]],
    4: [[2, 0, 2], [1, 0, 1], [1, 1, 1]],
  };

  function stackHeights(state) {
    const key = clampValue(state && state.desen, 1, 4, 1);
    const cap = clampValue(state && state.h, 1, 3, 1);
    const pattern = STACK_PATTERNS[key] || STACK_PATTERNS[1];
    return pattern.map((row) => row.map((value) => Math.min(value, cap)));
  }

  /* Ön: her sütunun en yüksek küpü. Yan: her sıranın en yüksek küpü.
     Üst: dolu kareler. Boş hücreler beyaz kalır; siluet basamaklı görünür. */
  function viewPanels(heights) {
    const depth = heights.length;
    const width = heights[0].length;
    const top = Math.max(1, ...heights.flat());
    const front = [];
    const side = [];
    for (let level = top; level >= 1; level -= 1) {
      front.push(Array.from({ length: width }, (_, i) => heights.some((row) => row[i] >= level)));
      side.push(Array.from({ length: depth }, (_, j) => heights[j].some((value) => value >= level)));
    }
    return [
      { key: 'on', title: 'Ön', cells: front, fill: '#d7ccf7' },
      { key: 'yan', title: 'Yan', cells: side, fill: '#cfe4f7' },
      { key: 'ust', title: 'Üst', cells: heights.map((row) => row.map((value) => value > 0)), fill: '#d5efdf' },
    ];
  }

  /* Simetri sahnesi için şekiller: birim çember üzerinde köşeler. */
  const SHAPES = {
    1: { name: 'Kare', points: [[1, 1], [-1, 1], [-1, -1], [1, -1]] },
    2: { name: 'Dikdörtgen', points: [[1, 0.62], [-1, 0.62], [-1, -0.62], [1, -0.62]] },
    3: { name: 'Eşkenar üçgen', points: [[0, -1], [0.87, 0.5], [-0.87, 0.5]] },
    4: { name: 'Düzgün beşgen', points: [[0, -1], [0.95, -0.31], [0.59, 0.81], [-0.59, 0.81], [-0.95, -0.31]] },
  };

  function shapeOf(index) {
    return SHAPES[clampValue(index, 1, 4, 1)] || SHAPES[1];
  }

  /* ---------- sayı ekseni ve sürükleme yardımcıları ---------- */

  /* Değeri sürgünün aralığına oturt: taşma ve adım kayması olmaz. */
  function clampValue(value, min, max, step) {
    const stepSize = step || 1;
    const number = Number(value);
    if (!Number.isFinite(number)) return min;
    const snapped = Math.round((number - min) / stepSize) * stepSize + min;
    const bounded = Math.max(min, Math.min(max, snapped));
    return Math.round(bounded * 1000) / 1000;
  }

  /* Sayı doğrusu: çizim ile sürgü aynı aralığı kullanır (ölü bölge kalmaz). */
  function numberAxis(options = {}) {
    const min = options.min == null ? -7 : options.min;
    const max = options.max == null ? 7 : options.max;
    const axisY = options.axisY == null ? 150 : options.axisY;
    const every = options.every || 1;
    const left = 52;
    const right = W - 52;
    const px = (value) => left + ((value - min) / (max - min)) * (right - left);
    const parts = [];
    parts.push(line(left - 10, axisY, right + 10, axisY, { stroke: '#1b2f49', width: 2 }));
    parts.push(`<polygon points="${coord(right + 22)},${coord(axisY)} ${coord(right + 10)},${coord(axisY - 5)} ${coord(right + 10)},${coord(axisY + 5)}" fill="#1b2f49"/>`);
    for (let value = min; value <= max; value += 1) {
      const zero = value === 0;
      parts.push(line(px(value), axisY - (zero ? 9 : 5), px(value), axisY + (zero ? 9 : 5), { stroke: zero ? '#1b2f49' : '#8b97a8', width: zero ? 2.2 : 1.2 }));
      if (value % every === 0) {
        parts.push(text(px(value), axisY + 26, num(value), { size: 12, anchor: 'middle', weight: zero ? 800 : 500, fill: zero ? '#1b2f49' : '#6b7a90' }));
      }
    }
    return {
      parts: parts.join(''),
      px,
      left,
      right,
      axisY,
      min,
      max,
      /* Ekrandaki x konumunu adımına oturmuş sayıya çevirir. */
      valueAt(x, low, high, step) {
        const raw = min + ((x - left) / (right - left)) * (max - min);
        return clampValue(raw, low == null ? min : low, high == null ? max : high, step || 1);
      },
    };
  }

  /* Sürüklenebilir nokta: görünmez büyük hedef alan + imleç + erişilebilir ad. */
  function handle(name, x, y, label) {
    return `<g data-handle="${esc(name)}" role="button" tabindex="0" aria-label="${esc(label)}" style="cursor:ew-resize">`
      + `<circle cx="${coord(x)}" cy="${coord(y)}" r="18" fill="#1b2f49" fill-opacity="0" pointer-events="all"/></g>`;
  }

  /* ---------- sahneler ---------- */

  const SCENES = {
    /* 1. Tam sayılar: sayı doğrusu, ters sayı ve sıfıra uzaklık */
    'sayi-dogrusu': {
      params: [{ name: 'a', label: 'Sayı (a)', min: -7, max: 7, step: 1, value: 3 }],
      draw(state) {
        const axis = numberAxis({ min: -7, max: 7, axisY: 150, every: 1 });
        const a = clampValue(state.a, -7, 7, 1);
        const parts = [text(W / 2, 30, 'Sayı doğrusu: sıfır başlangıç noktasıdır', { size: 14, anchor: 'middle', weight: 800, fill: '#33265f' })];
        parts.push(axis.parts);
        parts.push(text(axis.left, axis.axisY + 48, 'sola: küçülür', { size: 11.5, anchor: 'start', fill: '#b8791a' }));
        parts.push(text(axis.right, axis.axisY + 48, 'sağa: büyür', { size: 11.5, anchor: 'end', fill: '#2f8a63' }));

        const points = [{ value: a, label: `a = ${num(a)}`, color: '#5b46a8', y: 92 }];
        if (a !== 0) points.push({ value: -a, label: `−a = ${num(-a)}`, color: '#2f8a63', y: 120 });
        points.forEach((point) => {
          parts.push(line(axis.px(point.value), axis.axisY - 10, axis.px(point.value), point.y + 8, { stroke: point.color, width: 1.2, dash: '4 4' }));
          parts.push(circle(axis.px(point.value), axis.axisY, 7, { fill: point.color }));
          parts.push(text(axis.px(point.value), point.y, point.label, { size: 13, anchor: 'middle', weight: 800, fill: point.color }));
        });

        parts.push(panel(40, 214, W - 80, 96));
        const absA = Math.abs(a);
        parts.push(text(58, 242, a === 0 ? 'a = 0: sıfıra uzaklık 0, işareti yok.' : `|a| = |${num(a)}| = ${num(absA)}  ·  |−a| = ${num(absA)}`, { size: 13.5, weight: 800, fill: '#33265f' }));
        parts.push(text(58, 268, a > 0 ? 'a sıfırın sağında: a pozitif, −a negatif.' : a < 0 ? 'a sıfırın solunda: a negatif, −a pozitif.' : 'Sıfır ne pozitif ne negatiftir; başlangıç noktasıdır.', { size: 12.5, fill: '#41506a' }));
        parts.push(text(58, 294, a === 0 ? 'Ters sayı yine sıfırdır.' : `a + (−a) = ${num(a)} + (${num(-a)}) = 0`, { size: 12.5, fill: '#2f8a63', weight: 700 }));
        parts.push(text(W / 2, 344, 'Mor nokta sayıyı, yeşil nokta tersini gösterir. Noktayı sürükleyebilirsin.', { size: 12, anchor: 'middle', fill: '#6b7a90' }));
        parts.push(handle('a', axis.px(a), axis.axisY, 'a noktasını sürükle'));
        return parts.join('');
      },
      drag(svg, event, name, state) {
        const axis = numberAxis({ min: -7, max: 7, axisY: 150 });
        state.a = axis.valueAt(localPoint(svg, event).x, -7, 7, 1);
      },
      handles: [{ name: 'a', label: 'a noktasını sürükle' }],
    },

    /* 1b. Sıcaklık: negatif ve pozitif değerlerin aynı doğruda okunması */
    'sicaklik': {
      params: [
        { name: 't1', label: 'A gezegeni (°C)', min: -150, max: 0, step: 10, value: -120 },
        { name: 't2', label: 'B gezegeni (°C)', min: -150, max: 0, step: 10, value: -60 },
        { name: 't3', label: 'C gezegeni (°C)', min: 0, max: 50, step: 5, value: 15 },
      ],
      draw(state) {
        const t1 = clampValue(state.t1, -150, 0, 10);
        const t2 = clampValue(state.t2, -150, 0, 10);
        const t3 = clampValue(state.t3, 0, 50, 5);
        const axisY = 168;
        const left = 56;
        const right = W - 56;
        const px = (value) => left + ((value + 150) / 200) * (right - left);
        const parts = [text(W / 2, 32, 'Üç gezegenin yüzey sıcaklığı aynı doğruda', { size: 14, anchor: 'middle', weight: 800, fill: '#33265f' })];
        parts.push(line(left - 10, axisY, right + 10, axisY, { stroke: '#1b2f49', width: 2 }));
        for (let value = -150; value <= 50; value += 30) {
          const zero = value === 0;
          parts.push(line(px(value), axisY - (zero ? 9 : 5), px(value), axisY + (zero ? 9 : 5), { stroke: zero ? '#1b2f49' : '#8b97a8', width: zero ? 2.2 : 1.2 }));
          parts.push(text(px(value), axisY + 24, String(value), { size: 11.5, anchor: 'middle', weight: zero ? 800 : 500, fill: zero ? '#1b2f49' : '#6b7a90' }));
        }
        parts.push(text(left, axisY + 44, 'sola: daha soğuk', { size: 11.5, anchor: 'start', fill: '#2c6fa8' }));
        parts.push(text(right, axisY + 44, 'sağa: daha sıcak', { size: 11.5, anchor: 'end', fill: '#c03744' }));
        [[t1, 'A', '#2c6fa8', 96], [t2, 'B', '#5b46a8', 122], [t3, 'C', '#c03744', 148]].forEach(([value, label, color, y]) => {
          parts.push(line(px(value), y + 6, px(value), axisY - 7, { stroke: color, width: 1.2, dash: '4 4' }));
          parts.push(circle(px(value), axisY, 7, { fill: color }));
          parts.push(text(px(value), y, `${label}: ${num(value)} °C`, { size: 12.5, anchor: 'middle', weight: 800, fill: color }));
        });
        parts.push(panel(40, 216, W - 80, 96));
        parts.push(text(58, 244, `A ile B arasındaki fark: ${num(Math.max(t1, t2))} − (${num(Math.min(t1, t2))}) = ?`, { size: 12.5, weight: 800, fill: '#33265f' }));
        parts.push(text(58, 270, `C ile A arasındaki fark: ${num(t3)} − (${num(t1)}) = ?`, { size: 12.5, fill: '#41506a' }));
        const order = [['A', t1], ['B', t2], ['C', t3]].sort((x, y) => x[1] - y[1]).map((item) => `${item[0]} (${num(item[1])})`).join(' < ');
        parts.push(text(58, 296, 'Küçükten büyüğe: ?', { size: 12.5, fill: '#2f8a63', weight: 700 }));
        parts.push(text(W / 2, 344, 'Sürgüleri kaydır: fark ve sıralama birlikte güncellenir.', { size: 12, anchor: 'middle', fill: '#6b7a90' }));
        return parts.join('');
      },
    },

    /* 1a. İki sayı: karşılaştırma ve uzaklık */
    'iki-sayi': {
      params: [
        { name: 'a', label: '1. sayı (a)', min: -7, max: 7, step: 1, value: -7 },
        { name: 'b', label: '2. sayı (b)', min: -7, max: 7, step: 1, value: -3 },
      ],
      draw(state) {
        const a = clampValue(state.a, -7, 7, 1);
        const b = clampValue(state.b, -7, 7, 1);
        const axis = numberAxis({ min: -7, max: 7, axisY: 156, every: 1 });
        const parts = [text(W / 2, 34, 'İki sayı sayı doğrusunda', { size: 14, anchor: 'middle', weight: 800, fill: '#33265f' })];
        parts.push(axis.parts);
        [[a, 'a', '#5b46a8', 96], [b, 'b', '#2f8a63', 124]].forEach(([value, label, color, y]) => {
          parts.push(line(axis.px(value), axis.axisY - 9, axis.px(value), y + 8, { stroke: color, width: 1.2, dash: '4 4' }));
          parts.push(circle(axis.px(value), axis.axisY, 7, { fill: color }));
          parts.push(text(axis.px(value), y, `${label} = ${num(value)}`, { size: 13, anchor: 'middle', weight: 800, fill: color }));
        });
        const small = Math.min(a, b);
        const big = Math.max(a, b);
        const distance = Math.abs(b - a);
        parts.push(panel(40, 214, W - 80, 92));
        parts.push(text(58, 244, a === b ? 'İki sayı eşit: aynı noktadadırlar.' : `${num(small)} < ${num(big)}  ·  soldaki küçük, sağdaki büyük`, { size: 13.5, weight: 800, fill: '#33265f' }));
        parts.push(text(58, 270, `İki sayı arasındaki uzaklık: |${num(b)} − (${num(a)})| = ${num(distance)} birim`, { size: 12.5, fill: '#41506a' }));
        parts.push(text(58, 296, a < 0 && b > 0 ? 'Biri sıfırın solunda, diğeri sağında: işaretleri farklı.' : (a <= 0 && b <= 0 ? 'İkisi de sıfırın solunda: ikisi de negatif olabilir.' : 'İkisi de sıfırın sağında.'), { size: 12, fill: '#6b7a90' }));
        parts.push(handle('a', axis.px(a), axis.axisY, 'a noktasını sürükle'));
        parts.push(handle('b', axis.px(b), axis.axisY, 'b noktasını sürükle'));
        return parts.join('');
      },
      drag(svg, event, name, state) {
        const axis = numberAxis({ min: -7, max: 7, axisY: 156 });
        const field = name === 'b' ? 'b' : 'a';
        state[field] = axis.valueAt(localPoint(svg, event).x, -7, 7, 1);
      },
      handles: [{ name: 'a', label: 'a noktasını sürükle' }, { name: 'b', label: 'b noktasını sürükle' }],
    },

    /* 1c. Toplamalar sıfıra ulaşır mı? Adım adım toplama yolu */
    'sifir-toplama': {
      params: [
        { name: 's1', label: '1. kart', min: -5, max: 5, step: 1, value: 3 },
        { name: 's2', label: '2. kart', min: -5, max: 5, step: 1, value: -3 },
        { name: 's3', label: '3. kart', min: -5, max: 5, step: 1, value: 2 },
      ],
      draw(state) {
        const cards = [state.s1, state.s2, state.s3].map((value) => clampValue(value, -5, 5, 1));
        const totals = cards.reduce((list, value) => list.concat(list[list.length - 1] + value), [0]);
        const farthest = Math.max(...totals.map((value) => Math.abs(value)), 3);
        const limit = Math.min(20, Math.ceil(farthest / 2) * 2 + 2);
        const axis = numberAxis({ min: -limit, max: limit, axisY: 300, every: limit > 8 ? 2 : 1 });
        const parts = [text(W / 2, 30, 'Kartları toplayarak sıfıra ulaşabilir miyiz?', { size: 14, anchor: 'middle', weight: 800, fill: '#33265f' })];

        cards.forEach((value, index) => {
          const x = 132 + index * 128;
          parts.push(rect(x, 50, 88, 50, { fill: value < 0 ? '#d7f0e3' : '#ded5fb', stroke: value < 0 ? '#2f8a63' : '#7056c9', width: 1.4, rx: 12 }));
          parts.push(text(x + 44, 82, value > 0 ? `+${num(value)}` : num(value), { size: 17, anchor: 'middle', weight: 800, fill: value < 0 ? '#1f6b4c' : '#3c2f6b' }));
          if (index < cards.length - 1) parts.push(text(x + 108, 82, '+', { size: 16, anchor: 'middle', weight: 700, fill: '#8b97a8' }));
        });

        parts.push(axis.parts);

        /* Her adım kendi şeridinde: yaylar üst üste binmez, etiket işaretlidir. */
        cards.forEach((delta, index) => {
          const from = totals[index];
          const to = totals[index + 1];
          const lane = 236 - index * 34;
          const x1 = axis.px(from);
          const x2 = axis.px(to);
          const color = delta < 0 ? '#2f8a63' : delta > 0 ? '#5b46a8' : '#8b97a8';
          const midX = (x1 + x2) / 2;
          parts.push(`<path d="M ${coord(x1)} ${coord(axis.axisY - 10)} C ${coord(x1)} ${coord(lane)} ${coord(x2)} ${coord(lane)} ${coord(x2)} ${coord(axis.axisY - 10)}" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="6 5"/>`);
          parts.push(circle(x2, axis.axisY, 5, { fill: color }));
          parts.push(text(midX, lane - 10, `${index + 1}. kart: ${delta >= 0 ? '+' : '−'}${num(Math.abs(delta))}`, { size: 12, anchor: 'middle', weight: 700, fill: color }));
        });
        parts.push(circle(axis.px(0), axis.axisY, 6, { fill: '#1b2f49' }));

        const total = totals[totals.length - 1];
        parts.push(text(48, 342, 'Toplam = ?', { size: 15, weight: 800, fill: '#33265f' }));
        parts.push(text(186, 342, 'Kartları değiştir: son noktayı ve sıfıra dönüş koşulunu sen yaz.', { size: 12.5, fill: '#41506a' }));
        return parts.join('');
      },
    },

    /* 2. Mutlak değer */
    'mutlak-deger': {
      params: [{ name: 'a', label: 'Sayı (a)', min: -9, max: 9, step: 1, value: -6 }],
      draw(state) {
        const p = plotter([-10, 10, -2, 2], { x: 40, y: 130, w: W - 80, h: 120 });
        const a = state.a;
        const parts = [grid(p, { ylabels: false })];
        parts.push(line(p.px(-9.6), p.py(0), p.px(9.6), p.py(0), { width: 2 }));
        for (let x = -9; x <= 9; x += 1) {
          parts.push(line(p.px(x), p.py(0) - 5, p.px(x), p.py(0) + 5, { width: x === 0 ? 2 : 1 }));
          if (x % 3 === 0) parts.push(text(p.px(x), p.py(0) + 24, String(x), { size: 11, anchor: 'middle', fill: '#6b7a90' }));
        }
        parts.push(circle(p.px(a), p.py(0), 7));
        parts.push(text(p.px(a), p.py(0) - 40, `a = ${num(a)}`, { size: 13, anchor: 'middle', weight: 800, fill: '#5b46a8' }));
        const mid = (p.px(a) + p.px(0)) / 2;
        parts.push(line(p.px(a), p.py(-0.35), p.px(0), p.py(-0.35), { stroke: '#2f8a63', width: 2 }));
        parts.push(line(p.px(a), p.py(-0.35) - 5, p.px(a), p.py(-0.35) + 5, { stroke: '#2f8a63', width: 1.4 }));
        parts.push(line(p.px(0), p.py(-0.35) - 5, p.px(0), p.py(-0.35) + 5, { stroke: '#2f8a63', width: 1.4 }));
        parts.push(text(mid, p.py(-0.35) - 12, `|a| = ${num(Math.abs(a))}`, { size: 13, anchor: 'middle', weight: 800, fill: '#2f8a63' }));
        parts.push(note(40, 40, 'Mutlak değer, sayının sıfıra olan uzaklığıdır. Uzaklık negatif olamaz.', { size: 13 }));
        parts.push(panel(40, H - 118, W - 80, 74));
        parts.push(note(58, H - 92, `a = ${num(a)} için |a| = ${num(Math.abs(a))}`, { size: 14, weight: 800, fill: '#33265f' }));
        parts.push(note(58, H - 70, a < 0 ? 'Sayı negatif olduğu hâlde sonuç pozitiftir: uzaklık işaret taşımaz.' : a > 0 ? 'Sayı pozitif olduğunda mutlak değer sayının kendisidir.' : 'Sıfırın mutlak değeri sıfırdır.', { size: 12.5 }));
        return parts.join('');
      },
    },

    /* 3. Kesir şeridi: pay ve payda */
    /* 2a. Rasyonel sayıyı sayı doğrusunda gösterme: ana çentikler tam sayı,
       aralarındaki küçük çentikler payda kadar eş parça. Öğrenci işareti sürükler. */
    /* Eksi işaretinin üç yeri: kesrin önü, pay, payda. Sonuç yazılmaz. */
    'kesir-isaret': {
      params: [
        { name: 'pay', label: 'Pay', min: 1, max: 9, step: 1, value: 8 },
        { name: 'payda', label: 'Payda', min: 2, max: 9, step: 1, value: 4 },
        { name: 'yer', label: 'Eksi işaretinin yeri', min: 0, max: 2, step: 1, value: 0 },
      ],
      draw(state) {
        const pay = clampValue(state.pay, 1, 9, 1);
        const payda = clampValue(state.payda, 2, 9, 1);
        const yer = clampValue(state.yer, 0, 2, 1);
        const fx = 430;
        const numY = 112;
        const barY = 138;
        const denY = 176;
        const parts = [text(W / 2, 30, 'Eksi işaretini taşı: değeri değişir mi?', { size: 14, anchor: 'middle', weight: 800, fill: '#33265f' })];
        parts.push(rect(250, 66, 400, 148, { fill: '#fbfaff', stroke: '#ded8f2', width: 1.4, rx: 14 }));
        parts.push(text(fx, numY + 8, String(pay), { size: 34, anchor: 'middle', weight: 800, fill: '#1b2f49' }));
        parts.push(line(fx - 34, barY, fx + 34, barY, { stroke: '#1b2f49', width: 3 }));
        parts.push(text(fx, denY + 8, String(payda), { size: 34, anchor: 'middle', weight: 800, fill: '#1b2f49' }));
        const signX = yer === 0 ? fx - 74 : fx - 40;
        const signY = yer === 0 ? barY + 10 : yer === 1 ? numY + 8 : denY + 8;
        parts.push(text(signX, signY, '−', { size: yer === 0 ? 40 : 30, anchor: 'middle', weight: 800, fill: '#c03744' }));
        const slots = [
          { x: 150, label: 'kesrin önü' },
          { x: 430, label: 'pay' },
          { x: 560, label: 'payda' },
        ];
        slots.forEach((slot, index) => {
          const active = index === yer;
          parts.push(rect(slot.x - 66, 236, 132, 40, { fill: active ? '#efeafb' : '#ffffff', stroke: active ? '#5b46a8' : '#d8d2ec', width: active ? 2 : 1, rx: 10 }));
          parts.push(text(slot.x, 261, slot.label, { size: 12.5, anchor: 'middle', weight: active ? 800 : 600, fill: active ? '#4a3d7a' : '#6b7a90' }));
        });
        parts.push(text(W / 2, 300, `Şu an işaret ${yer === 0 ? 'kesrin önünde' : yer === 1 ? 'payın yanında' : 'paydanın yanında'}.`, { size: 13, anchor: 'middle', weight: 700, fill: '#33265f' }));
        parts.push(text(W / 2, 326, 'Üç yazım aynı sayıyı mı gösterir? Değerini ve nedenini sen yaz.', { size: 12.5, anchor: 'middle', fill: '#41506a' }));
        parts.push(text(W / 2, 352, 'İşareti sürükle ya da sürgüyü kullan.', { size: 11.5, anchor: 'middle', fill: '#6b7a90' }));
        parts.push(handle('yer', signX, signY - 12, 'Eksi işaretini taşı'));
        return parts.join('');
      },
      drag(svg, event, name, state) {
        const local = localPoint(svg, event);
        const slot = Math.round((local.x - 150) / 205);
        state.yer = clampValue(slot, 0, 2, 1);
      },
      handles: [{ name: 'yer', label: 'Eksi işaretini taşı' }],
    },

    'kesir-dogru': {
      params: [
        { name: 'tam', label: 'Tam kısım', min: -3, max: 3, step: 1, value: 0 },
        { name: 'pay', label: 'Pay', min: 0, max: 9, step: 1, value: 3 },
        { name: 'payda', label: 'Payda', min: 2, max: 8, step: 1, value: 5 },
      ],
      /* Sürgü ile çizim aynı sayıyı göstersin: pay paydadan büyük olamaz. */
      normalize(state) {
        state.payda = clampValue(state.payda, 2, 8, 1);
        state.tam = clampValue(state.tam, -3, 3, 1);
        state.pay = clampValue(state.pay, 0, state.payda - 1, 1);
      },
      draw(state) {
        const payda = state.payda;
        const pay = state.pay;
        const tam = state.tam;
        const deger = tam < 0 ? tam - pay / payda : tam + pay / payda;
        const min = -4;
        const max = 4;
        const axisY = 232;
        const left = 62;
        const right = W - 62;
        const px = (v) => left + ((v - min) / (max - min)) * (right - left);
        const x = px(deger);
        const x0 = px(0);
        const parts = [text(W / 2, 28, 'Ana çentikler tam sayı, aralarında ara çentikler', { size: 14, anchor: 'middle', weight: 800, fill: '#33265f' })];

        /* sıfırdan işarete kadar uzaklık bandı */
        parts.push(rect(Math.min(x0, x), axisY - 13, Math.max(2, Math.abs(x - x0)), 26, { fill: '#efeafb', stroke: 'none', width: 0 }));

        /* eksen */
        parts.push(line(left - 14, axisY, right + 14, axisY, { stroke: '#1b2f49', width: 2.4 }));
        parts.push(`<polygon points="${coord(right + 28)},${coord(axisY)} ${coord(right + 12)},${coord(axisY - 6)} ${coord(right + 12)},${coord(axisY + 6)}" fill="#1b2f49"/>`);

        /* ara çentikler: her tam sayı arası payda kadar eş parça */
        for (let whole = min; whole < max; whole += 1) {
          for (let step = 1; step < payda; step += 1) {
            const tx = px(whole + step / payda);
            parts.push(line(tx, axisY - 8, tx, axisY + 8, { stroke: '#5f6f86', width: 2 }));
          }
        }

        /* ana çentikler: tam sayılar */
        for (let whole = min; whole <= max; whole += 1) {
          parts.push(line(px(whole), axisY - 13, px(whole), axisY + 13, { stroke: '#1b2f49', width: 2.6 }));
          parts.push(text(px(whole), axisY + 34, num(whole), { size: 14, anchor: 'middle', weight: 800, fill: '#1b2f49' }));
        }

        /* işaret ve hemen üstündeki etiket */
        parts.push(line(x, axisY - 32, x, axisY - 9, { stroke: '#5b46a8', width: 1.6, dash: '4 4' }));
        parts.push(circle(x, axisY, 9, { fill: '#5b46a8', stroke: '#fff', width: 2.4 }));

        const wholeText = tam === 0 ? '' : `${tam < 0 ? '−' : ''}${Math.abs(tam)}`;
        const showFraction = pay > 0;
        const basamak = Math.max(String(pay).length, String(payda).length);
        const barLen = Math.max(30, basamak * 12 + 14);
        const wholeW = wholeText ? String(wholeText).length * 13 + 4 : 0;
        const groupW = wholeW + (showFraction ? barLen + 8 : 0);
        let groupLeft = x - groupW / 2;
        groupLeft = Math.max(16, Math.min(groupLeft, W - 16 - groupW));
        const barY = axisY - 62;
        const fracX = groupLeft + wholeW;
        if (wholeText) {
          parts.push(text(fracX - 5, barY + 9, wholeText, { size: 24, anchor: 'end', weight: 800, fill: '#4a3d7a' }));
        }
        if (showFraction) {
          parts.push(text(fracX + barLen / 2, barY - 8, String(pay), { size: 20, anchor: 'middle', weight: 800, fill: '#4a3d7a' }));
          parts.push(line(fracX + 4, barY, fracX + barLen - 4, barY, { stroke: '#4a3d7a', width: 2.6 }));
          parts.push(text(fracX + barLen / 2, barY + 24, String(payda), { size: 20, anchor: 'middle', weight: 800, fill: '#4a3d7a' }));
        } else if (!wholeText) {
          parts.push(text(x, barY + 9, '0', { size: 24, anchor: 'middle', weight: 800, fill: '#4a3d7a' }));
        }

        /* panel: değer yazılmaz, öğrenci okur */
        parts.push(panel(40, 292, W - 80, 56));
        parts.push(text(58, 316, `Bir ara çentik = 1 ÷ ${num(payda)} birim  ·  tam sayılar arası ${num(payda)} eş parça`, { size: 12.5, weight: 700, fill: '#33265f' }));
        parts.push(text(58, 338, 'İşaret hangi iki tam sayı arasında? Kaç tam, kaç parça? Sen yaz.', { size: 12, fill: '#41506a' }));
        parts.push(text(W / 2, 370, 'İşareti sürükle: yalnız ara çentiklere oturur.', { size: 11.5, anchor: 'middle', fill: '#6b7a90' }));
        parts.push(handle('nokta', x, axisY, 'Rasyonel sayının işaretini sürükle'));
        return parts.join('');
      },
      drag(svg, event, name, state) {
        const min = -4;
        const max = 4;
        const left = 62;
        const right = W - 62;
        const payda = clampValue(state.payda, 2, 8, 1);
        const raw = min + ((localPoint(svg, event).x - left) / (right - left)) * (max - min);
        const snapped = clampValue(raw, min + 1 / payda, max - 1, 1 / payda);
        const whole = snapped < 0 ? Math.ceil(snapped) : Math.floor(snapped);
        const rest = Math.abs(snapped - whole);
        state.tam = whole;
        state.pay = Math.round(rest * payda);
        if (state.pay >= payda) { state.tam = whole + 1; state.pay = 0; }
      },
      handles: [{ name: 'nokta', label: 'Rasyonel sayının işaretini sürükle' }],
    },
    'kat-yerlestir': {
      params: [{ name: 'kat', label: 'Sığınağın katı', min: -3, max: 4, step: 1, value: 1 }],
      draw(state) {
        const kat = clampValue(state.kat, -3, 4, 1);
        const top = 4;
        const bottom = -3;
        const left = 210;
        const width = 250;
        const rowH = 27;
        const topY = 62;
        const yOf = (floor) => topY + (top - floor) * rowH;
        const parts = [text(W / 2, 30, 'Sığınağı sürükle: hangi kata gelecek?', { size: 14, anchor: 'middle', weight: 800, fill: '#33265f' })];
        for (let floor = top; floor >= bottom; floor -= 1) {
          const y = yOf(floor);
          const zero = floor === 0;
          parts.push(rect(left, y, width, rowH, { fill: zero ? '#ded5fb' : floor < 0 ? '#f3f7fb' : '#fbfaff', stroke: zero ? '#7056c9' : '#d8d2ec', width: 1 }));
          parts.push(text(left - 12, y + 19, floor === 0 ? '0' : num(floor), { size: 13, anchor: 'end', weight: 800, fill: zero ? '#5b46a8' : '#1b2f49' }));
          if (zero) parts.push(text(left + 12, y + 19, 'Zemin kat', { size: 12, fill: '#4a3d7a' }));
          if (floor === -2) parts.push(text(left + 12, y + 19, 'Otopark (2 kat alt)', { size: 12, fill: '#2f8a63' }));
        }
        const chipY = yOf(kat);
        parts.push(rect(left + width - 116, chipY + 3, 108, rowH - 6, { fill: '#fff3d6', stroke: '#b8791a', width: 1.4, rx: 8 }));
        parts.push(text(left + width - 62, chipY + 19, 'Sığınak', { size: 12.5, anchor: 'middle', weight: 800, fill: '#8a5a10' }));
        parts.push(text(46, 320, 'Otoparkın bir kat üstü hangi sayı? Sığınak kutusunu oraya bırak.', { size: 12, fill: '#41506a' }));
        parts.push(text(46, 342, 'Sürüklerken kat numarası değişir; doğru katı bulunca yaz.', { size: 11.5, fill: '#6b7a90' }));
        parts.push(handle('kat', left + width - 62, chipY + rowH / 2, 'Sığınağı kata sürükle'));
        return parts.join('');
      },
      drag(svg, event, name, state) {
        const top = 4;
        const topY = 62;
        const rowH = 27;
        const local = localPoint(svg, event);
        const floor = Math.round(top - (local.y - topY - rowH / 2) / rowH);
        state.kat = clampValue(floor, -3, 4, 1);
      },
      handles: [{ name: 'kat', label: 'Sığınağı kata sürükle' }],
    },

    'kesir-serit': {
      params: [
        { name: 'd', label: 'Payda (kaç eş parça)', min: 2, max: 10, step: 1, value: 4 },
        { name: 'n', label: 'Pay (kaç parça boyandı)', min: 0, max: 10, step: 1, value: 3 },
      ],
      /* Sürgü ile çizim aynı kesri göstersin: pay paydadan büyük olamaz. */
      normalize(state) {
        state.d = clampValue(state.d, 2, 10, 1);
        state.n = clampValue(state.n, 0, state.d, 1);
      },
      draw(state) {
        const d = Math.max(2, state.d);
        const n = Math.max(0, Math.min(state.n, d));
        const left = 60;
        const width = W - 140;
        const cell = width / d;
        const top = 96;
        const height = 92;
        const parts = [];
        parts.push(note(40, 40, 'Bütün eş parçalara ayrılır; boyanan parça sayısı paydır.', { size: 13 }));
        for (let index = 0; index < d; index += 1) {
          parts.push(rect(left + index * cell, top, cell, height, { fill: index < n ? '#c9bff2' : '#fbfaff', stroke: '#4a3d7a', width: 1.3 }));
        }
        parts.push(line(left, top - 18, left + width, top - 18, { stroke: '#1b2f49', width: 2 }));
        parts.push(text(left + width / 2, top - 26, `pay = ${n}`, { size: 13, anchor: 'middle', weight: 800, fill: '#5b46a8' }));
        parts.push(line(left, top + height + 16, left + width, top + height + 16, { stroke: '#1b2f49', width: 2 }));
        parts.push(text(left + width / 2, top + height + 34, `payda = ${d}  (bütün ${d} eş parça)`, { size: 13, anchor: 'middle', weight: 800, fill: '#2f8a63' }));
        parts.push(text(left, top + height + 70, `${n}/${d}`, { size: 26, weight: 800, fill: '#33265f' }));
        parts.push(note(left + 120, top + height + 66, 'Ondalık ve yüzde karşılığını sen yaz.', { size: 13 }));
        parts.push(note(40, H - 20, n === d ? 'Pay paydaya eşitse kesir 1’dir.' : n === 0 ? 'Pay sıfırsa kesir 0’dır.' : n > d / 2 ? 'Yarıdan fazlası boyanmış.' : 'Yarısından azı boyanmış.', { size: 12 }));
        return parts.join('');
      },
    },

    /* 4. Tam sayılarda toplama: pullar */
    'sayma-pullari': {
      params: [
        { name: 'p', label: 'Pozitif pul (+)', min: 0, max: 6, step: 1, value: 4 },
        { name: 'n', label: 'Negatif pul (−)', min: 0, max: 6, step: 1, value: 6 },
      ],
      draw(state) {
        const p = clampValue(state.p, 0, 6, 1);
        const n = clampValue(state.n, 0, 6, 1);
        const pairs = Math.min(p, n);
        const left = 74;
        const gap = 58;
        const parts = [note(40, 36, 'Kırmızı pul +1, mavi pul −1. Yan yana gelen kırmızı-mavi çift sıfır olur.', { size: 12.5 })];
        const row = (count, y, color, symbol, matched) => Array.from({ length: count }, (_, index) => {
          const x = left + index * gap;
          const paired = index < matched;
          return (paired ? circle(x, y, 24, { fill: 'none', stroke: '#b8791a', width: 1.6 }) : '')
            + circle(x, y, 18, { fill: color })
            + text(x, y + 6, symbol, { size: 18, anchor: 'middle', weight: 800, fill: '#fff' });
        }).join('');
        parts.push(text(40, 96, `+${p}`, { size: 14, weight: 800, fill: '#c03744' }));
        parts.push(row(p, 132, '#c03744', '+', pairs));
        parts.push(text(40, 200, `−${n}`, { size: 14, weight: 800, fill: '#2a5da8' }));
        parts.push(row(n, 236, '#2a5da8', '−', pairs));
        parts.push(note(40, 286, 'Altın çerçeveli pullar sıfır çiftidir. Kaç çift var, kalan kaç pul? Sen yaz.', { size: 12.5 }));
        parts.push(panel(40, 302, W - 80, 56));
        parts.push(text(60, 336, `Toplam = ( +${num(p)} ) + ( −${num(n)} ) = ?`, { size: 19, weight: 800, fill: '#33265f' }));
        return parts.join('');
      },
    },

    'asansor-kat': {
      params: [{ name: 'kat', label: 'Asansörün katı', min: -3, max: 6, step: 1, value: 4 }],
      draw(state) {
        const kat = clampValue(state.kat, -3, 6, 1);
        const top = 6;
        const bottom = -3;
        const left = 232;
        const width = 214;
        const rowH = 23;
        const topY = 56;
        const yOf = (floor) => topY + (top - floor) * rowH;
        const parts = [text(W / 2, 28, 'Asansörü sürükle: hangi katta duruyor?', { size: 14, anchor: 'middle', weight: 800, fill: '#33265f' })];
        for (let floor = top; floor >= bottom; floor -= 1) {
          const y = yOf(floor);
          const zero = floor === 0;
          parts.push(rect(left, y, width, rowH, { fill: zero ? '#ded5fb' : floor < 0 ? '#f3f7fb' : '#fbfaff', stroke: zero ? '#7056c9' : '#d8d2ec', width: 1 }));
          parts.push(text(left - 12, y + 16, floor === 0 ? '0' : num(floor), { size: 12.5, anchor: 'end', weight: 800, fill: zero ? '#5b46a8' : '#1b2f49' }));
          if (zero) parts.push(text(left + 12, y + 16, 'Zemin kat', { size: 11.5, fill: '#4a3d7a' }));
          if (floor === -1) parts.push(text(left + 12, y + 16, 'Bodrum kat', { size: 11.5, fill: '#41506a' }));
          if (floor === -2) parts.push(text(left + 12, y + 16, 'Otopark (2 kat alt)', { size: 11.5, fill: '#2f8a63' }));
        }
        const chipY = yOf(kat);
        parts.push(rect(left + width - 104, chipY + 2, 96, rowH - 4, { fill: '#fff3d6', stroke: '#b8791a', width: 1.4, rx: 7 }));
        parts.push(text(left + width - 56, chipY + 16, 'Asansör', { size: 12, anchor: 'middle', weight: 800, fill: '#8a5a10' }));
        parts.push(text(44, 330, 'Asansör 4. kattan 3 kat inip 5 kat çıkıyor.', { size: 12.5, fill: '#41506a' }));
        parts.push(text(44, 352, 'Kutuyu doğru kata bırak; kat numarası hemen görünür.', { size: 11.5, fill: '#6b7a90' }));
        parts.push(handle('kat', left + width - 56, chipY + rowH / 2, 'Asansörü kata sürükle'));
        return parts.join('');
      },
      drag(svg, event, name, state) {
        const top = 6;
        const topY = 56;
        const rowH = 23;
        const local = localPoint(svg, event);
        const floor = Math.round(top - (local.y - topY - rowH / 2) / rowH);
        state.kat = clampValue(floor, -3, 6, 1);
      },
      handles: [{ name: 'kat', label: 'Asansörü kata sürükle' }],
    },

    'kesir-toplam': {
      params: [
        { name: 'a', label: '1. kesirde boyanan parça (pay)', min: 0, max: 2, step: 1, value: 1 },
        { name: 'c', label: '2. kesirde boyanan parça (pay)', min: 0, max: 3, step: 1, value: 1 },
      ],
      draw(state) {
        const a = clampValue(state.a, 0, 2, 1);
        const c = clampValue(state.c, 0, 3, 1);
        const left = 150;
        const width = 380;
        const bar = (y, total, shaded, label, color) => {
          const cell = width / total;
          const out = [text(40, y + 24, label, { size: 13, weight: 800, fill: color })];
          for (let index = 0; index < total; index += 1) {
            out.push(rect(left + index * cell, y, cell, 40, { fill: index < shaded ? '#c9bff2' : '#fbfaff', stroke: '#4a3d7a', width: 1.2 }));
          }
          return out.join('');
        };
        const parts = [note(40, 36, 'Şeritlere dokunarak boya: paydalar eşit değilken paylar toplanmaz.', { size: 12.5 })];
        parts.push(bar(74, 2, a, `1. şerit: ${a}/2`, '#33265f'));
        parts.push(bar(160, 3, c, `2. şerit: ${c}/3`, '#33265f'));
        parts.push(panel(40, 236, W - 80, 96));
        parts.push(text(58, 266, 'İki şerit kaç eş parçaya bölünürse parçalar eşitlenir?', { size: 13, weight: 800, fill: '#33265f' }));
        parts.push(text(58, 292, `1. şerit o parça sayısına bölünürse boyanan: 3 × ${num(a)} = ? parça`, { size: 12.5, fill: '#41506a' }));
        parts.push(text(58, 316, `2. şerit o parça sayısına bölünürse boyanan: 2 × ${num(c)} = ? parça`, { size: 12.5, fill: '#41506a' }));
        parts.push(text(W / 2, 352, 'Toplam kaç altıda bir? Payı sen yaz.', { size: 12, anchor: 'middle', fill: '#6b7a90' }));
        parts.push(handle('bar1', left + width / 2, 94, '1. şeridi boya'));
        parts.push(handle('bar2', left + width / 2, 180, '2. şeridi boya'));
        return parts.join('');
      },
      drag(svg, event, name, state) {
        const left = 150;
        const width = 380;
        const local = localPoint(svg, event);
        const column = name === 'bar2' ? 3 : 2;
        const cell = width / column;
        const index = Math.ceil((local.x - left) / cell);
        const value = clampValue(index, 0, column, 1);
        if (name === 'bar2') state.c = value;
        else state.a = value;
      },
      handles: [{ name: 'bar1', label: '1. şeridi boya' }, { name: 'bar2', label: '2. şeridi boya' }],
    },

    'kesir-carpim': {
      params: [
        { name: 'n1', label: 'Birinci kesrin payı', min: 1, max: 4, step: 1, value: 2 },
        { name: 'd1', label: 'Birinci kesrin paydası', min: 2, max: 5, step: 1, value: 3 },
        { name: 'n2', label: 'İkinci kesrin payı', min: 1, max: 4, step: 1, value: 3 },
        { name: 'd2', label: 'İkinci kesrin paydası', min: 2, max: 5, step: 1, value: 4 },
      ],
      draw(state) {
        const d1 = clampValue(state.d1, 2, 5, 1);
        const d2 = clampValue(state.d2, 2, 5, 1);
        const n1 = clampValue(state.n1, 1, d1, 1);
        const n2 = clampValue(state.n2, 1, d2, 1);
        const size = 240;
        const left = 74;
        const top = 78;
        const cw = size / d2;
        const ch = size / d1;
        const parts = [note(40, 36, 'Alan modeli: satır birinci kesri, sütun ikinci kesri gösterir.', { size: 12.5 })];
        parts.push(rect(left, top, size, size, { fill: '#fff', stroke: '#1b2f49', width: 1.8 }));
        for (let row = 0; row < d1; row += 1) {
          for (let col = 0; col < d2; col += 1) {
            const inside = row < n1 && col < n2;
            parts.push(rect(left + col * cw, top + row * ch, cw, ch, { fill: inside ? '#c9bff2' : 'none', stroke: '#8a7fb5', width: 1 }));
          }
        }
        parts.push(text(left + size / 2, top - 12, `${n2}/${d2} (sütun)`, { size: 12.5, anchor: 'middle', weight: 800, fill: '#5b46a8' }));
        parts.push(text(left + size + 12, top + size / 2, `${n1}/${d1}`, { size: 12.5, anchor: 'middle', weight: 800, fill: '#2f8a63' }));
        parts.push(panel(380, 110, W - 420, 150));
        parts.push(text(400, 142, `${n1}/${d1} × ${n2}/${d2}`, { size: 19, weight: 800, fill: '#33265f' }));
        parts.push(text(400, 176, `Kaç kare boyandı?`, { size: 12.5, fill: '#41506a' }));
        const total = d1 * d2;
        parts.push(text(400, 204, `Karelerin toplamı: ${num(total)}`, { size: 12.5, fill: '#41506a' }));
        parts.push(text(400, 234, `Boyanan: ${n1} × ${n2} = ?`, { size: 13, weight: 800, fill: '#5b46a8' }));
        parts.push(note(40, H - 18, 'Payda eşitlenmez: paylar ve paydalar ayrı çarpılır.', { size: 12 }));
        parts.push(handle('alan', left + size / 2, top + size / 2, 'Boyalı alanı sürükle'));
        return parts.join('');
      },
      drag(svg, event, name, state) {
        const left = 74;
        const top = 78;
        const size = 240;
        const d1 = clampValue(state.d1, 2, 5, 1);
        const d2 = clampValue(state.d2, 2, 5, 1);
        const local = localPoint(svg, event);
        state.n2 = clampValue(Math.ceil((local.x - left) / (size / d2)), 1, d2, 1);
        state.n1 = clampValue(Math.ceil((local.y - top) / (size / d1)), 1, d1, 1);
      },
      handles: [{ name: 'alan', label: 'Boyalı alanı sürükle' }],
    },

    'isaret-kurali': {
      params: [
        { name: 'a', label: 'Birinci sayı (a)', min: -6, max: 6, step: 1, value: -4 },
        { name: 'b', label: 'İkinci sayı (b)', min: -6, max: 6, step: 1, value: 3 },
      ],
      draw(state) {
        const a = state.a;
        const b = state.b;
        const p = plotter([-12, 12, -3, 3], { x: 40, y: 80, w: W - 80, h: 120 });
        const parts = [grid(p, { ylabels: false })];
        parts.push(line(p.px(-11.5), p.py(0), p.px(11.5), p.py(0), { width: 2 }));
        [[a, '#5b46a8', 'a', 0], [b, '#2f8a63', 'b', 18], [a + b, '#b8791a', 'a+b', 36]].forEach(([value, color, label, lift]) => {
          const clamped = Math.max(-11, Math.min(11, value));
          parts.push(circle(p.px(clamped), p.py(0), 6.5, { fill: color }));
          parts.push(line(p.px(clamped), p.py(0) - 6, p.px(clamped), p.py(0) - 12 - lift, { stroke: color, width: 1, dash: '3 3' }));
          parts.push(text(p.px(clamped), p.py(0) - 16 - lift, `${label} = ${num(clamped)}`, { size: 11.5, anchor: 'middle', weight: 700, fill: color }));
        });
        parts.push(panel(40, 224, W - 80, 130));
        parts.push(text(60, 258, `a + b = (${num(a)}) + (${num(b)}) = ?`, { size: 17, weight: 800, fill: '#33265f' }));
        parts.push(text(60, 292, `a · b = (${num(a)}) · (${num(b)}) = ?`, { size: 17, weight: 800, fill: '#33265f' }));
        const rule = a === 0 || b === 0 ? 'Sıfır çarpan varsa çarpım sıfırdır.'
          : (a > 0) === (b > 0) ? 'İki sayının işareti aynı: çarpım pozitif.'
            : 'İşaretler zıt: çarpım negatif.';
        parts.push(note(60, 326, rule, { size: 12.5 }));
        return parts.join('');
      },
    },

    /* 8-11. Prizma, açınım, hacim, birim dönüşümü */
    'prizma3b': {
      params: [
        { name: 'a', label: 'Genişlik', min: 1, max: 6, step: 1, value: 4 },
        { name: 'b', label: 'Derinlik', min: 1, max: 5, step: 1, value: 2 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 5, step: 1, value: 3 },
      ],
      draw(state) {
        const a = state.a;
        const b = state.b;
        const h = state.h;
        const scale = 34;
        const originX = 130;
        const originY = 300;
        const w = a * scale;
        const depth = b * 20;
        const hh = h * 34;
        const parts = [];
        parts.push(note(40, 34, 'Boyutları değiştir; yüz, ayrıt ve hacim birlikte güncellenir.', { size: 12.5 }));
        const front = [[originX, originY], [originX + w, originY], [originX + w, originY - hh], [originX, originY - hh]];
        const topFace = [[originX, originY - hh], [originX + w, originY - hh], [originX + w + depth, originY - hh - depth * 0.7], [originX + depth, originY - hh - depth * 0.7]];
        const side = [[originX + w, originY], [originX + w + depth, originY - depth * 0.7], [originX + w + depth, originY - hh - depth * 0.7], [originX + w, originY - hh]];
        parts.push(polygon(topFace, { fill: '#ded5fb' }));
        parts.push(polygon(side, { fill: '#f1ecfd' }));
        parts.push(polygon(front, { fill: '#c9bff2' }));
        parts.push(text(originX + w / 2, originY + 22, `genişlik = ${num(a)}`, { size: 12, anchor: 'middle', weight: 700 }));
        parts.push(text(originX + w + depth + 12, originY - hh / 2, `yükseklik = ${num(h)}`, { size: 12, fill: '#41506a' }));
        parts.push(text(originX + w / 2 + depth * 0.5, originY - hh - depth * 0.7 - 8, `derinlik = ${num(b)}`, { size: 11, anchor: 'middle', fill: '#41506a' }));
        parts.push(panel(392, 46, 232, 132));
        parts.push(text(410, 76, 'Yüz · ayrıt · köşe', { size: 12.5, weight: 800, fill: '#33265f' }));
        parts.push(note(410, 100, '6 yüz · 12 ayrıt · 8 köşe', { size: 12.5 }));
        parts.push(note(410, 126, `Hacim = ${num(a)}·${num(b)}·${num(h)} = ?`, { size: 12.5, fill: '#5b46a8' }));
        parts.push(note(410, 146, 'birimküp sayısını sen bul', { size: 12, fill: '#5b46a8' }));
        parts.push(note(410, 170, 'Yüzey = 2·(a·b + a·h + b·h) = ?', { size: 12.5, fill: '#2f8a63' }));
        return parts.join('');
      },
    },

    /* Açınım (yerel yedek): haç biçiminde gerçek açınım.
         [üst]
      [sol][ön][sağ][arka]
         [alt]                                                          */
    'acim': {
      params: [
        { name: 'a', label: 'Genişlik', min: 1, max: 5, step: 1, value: 4 },
        { name: 'b', label: 'Derinlik', min: 1, max: 5, step: 1, value: 3 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 5, step: 1, value: 2 },
      ],
      normalize(state) {
        state.a = clampValue(state.a, 1, 5, 1);
        state.b = clampValue(state.b, 1, 5, 1);
        state.h = clampValue(state.h, 1, 5, 1);
      },
      draw(state) {
        const a = state.a;
        const b = state.b;
        const h = state.h;
        /* Ölçek: 4 sütun (b + a + b + a) ve 3 satır (b + h + b) tuvale sığsın. */
        const unit = Math.min(18, 300 / (2 * a + 2 * b), 190 / (2 * b + h));
        const wA = a * unit;
        const wB = b * unit;
        const hH = h * unit;
        const hB = b * unit;
        const totalW = 2 * wA + 2 * wB;
        const x0 = 40 + Math.max(0, (320 - totalW) / 2);
        const yTop = 66;
        const midY = yTop + hB;
        const parts = [note(40, 34, 'Açınım: altı yüz tek düzlemde. Karşılıklı yüzler eştir.', { size: 12.5 })];
        const faces = [
          ['sol', x0, midY, wB, hH, '#d7ccf7'],
          ['ön', x0 + wB, midY, wA, hH, '#c9bff2'],
          ['sağ', x0 + wB + wA, midY, wB, hH, '#d7ccf7'],
          ['arka', x0 + 2 * wB + wA, midY, wA, hH, '#e8e2fb'],
          ['üst', x0 + wB, yTop, wA, hB, '#ded5fb'],
          ['alt', x0 + wB, midY + hH, wA, hB, '#f3effe'],
        ];
        faces.forEach(([name, x, y, w, hh, fill]) => {
          parts.push(rect(x, y, w, hh, { fill }));
          parts.push(text(x + w / 2, y + hh / 2 + 4, name, { size: 10.5, anchor: 'middle', weight: 700, fill: '#33265f' }));
        });
        parts.push(text(x0 + wB + wA / 2, yTop + hB + hH + hB + 22, `${num(a)} × ${num(b)} taban · yükseklik ${num(h)}`, { size: 11.5, anchor: 'middle', weight: 700, fill: '#4a3d7a' }));
        parts.push(panel(392, 66, 214, 116));
        parts.push(text(410, 94, 'Yüzey alanı', { size: 12.5, weight: 800, fill: '#33265f' }));
        parts.push(note(410, 118, '2·(a·b + a·h + b·h)', { size: 11.5 }));
        parts.push(text(410, 144, '= ?', { size: 18, weight: 800, fill: '#5b46a8' }));
        parts.push(note(410, 168, 'her yüz çiftinden iki tane', { size: 11 }));
        parts.push(note(40, H - 20, 'Kapaksız kutuda üst yüz hesaba katılmaz.', { size: 12 }));
        return parts.join('');
      },
    },
    'uc-gorunum': {
      params: [
        { name: 'a', label: 'Genişlik (ön görünüm)', min: 1, max: 4, step: 1, value: 3 },
        { name: 'b', label: 'Derinlik (yan görünüm)', min: 1, max: 3, step: 1, value: 2 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 3, step: 1, value: 2 },
      ],
      draw(state) {
        const a = clampValue(state.a, 1, 4, 1);
        const b = clampValue(state.b, 1, 3, 1);
        const h = clampValue(state.h, 1, 3, 1);
        const parts = [text(W / 2, 28, 'Aynı yapı üç yönden: ön · yan · üst', { size: 14, anchor: 'middle', weight: 800, fill: '#33265f' })];
        const views = [
          { x: 62, cols: a, rows: h, label: `Ön · ${num(a)} × ${num(h)}`, fill: '#d7ccf7' },
          { x: 262, cols: b, rows: h, label: `Yan · ${num(b)} × ${num(h)}`, fill: '#cfe4f7' },
          { x: 462, cols: a, rows: b, label: `Üst · ${num(a)} × ${num(b)}`, fill: '#d5efdf' },
        ];
        views.forEach((view) => {
          const size = Math.min(26, Math.floor(120 / Math.max(view.cols, view.rows)));
          const width = view.cols * size;
          const height = view.rows * size;
          const x0 = view.x + (150 - width) / 2;
          const y0 = 96;
          parts.push(rect(view.x - 8, 64, 166, 196, { fill: '#fbfaff', stroke: '#ded8f2', width: 1.2, rx: 12 }));
          parts.push(text(view.x + 75, 84, view.label, { size: 12, anchor: 'middle', weight: 800, fill: '#33265f' }));
          for (let row = 0; row < view.rows; row += 1) {
            for (let col = 0; col < view.cols; col += 1) {
              parts.push(rect(x0 + col * size, y0 + row * size, size - 1.5, size - 1.5, { fill: view.fill, stroke: '#7056c9', width: 0.8, rx: 3 }));
            }
          }
          parts.push(text(view.x + 75, 240, 'kaç kare? Sen yaz.', { size: 11.5, anchor: 'middle', fill: '#41506a' }));
        });
        parts.push(text(W / 2, 292, 'Her görünüm eş karelerden oluşur; sayıları çarparak bulabilirsin.', { size: 12.5, anchor: 'middle', fill: '#33265f' }));
        parts.push(text(W / 2, 320, 'Tek görünüm gizli küpleri göstermez; üçünü birlikte oku.', { size: 12, anchor: 'middle', fill: '#41506a' }));
        parts.push(text(W / 2, 348, 'Sürgüleri değiştir: yapı büyüdükçe üç görünüm birlikte değişir.', { size: 11.5, anchor: 'middle', fill: '#6b7a90' }));
        return parts.join('');
      },
    },

    'hacim': {
      params: [
        { name: 'a', label: 'Taban uzunluğu', min: 1, max: 4, step: 1, value: 3 },
        { name: 'b', label: 'Taban genişliği', min: 1, max: 4, step: 1, value: 2 },
        { name: 'h', label: 'Katman sayısı', min: 1, max: 4, step: 1, value: 2 },
      ],
      normalize(state) {
        state.a = clampValue(state.a, 1, 4, 1);
        state.b = clampValue(state.b, 1, 4, 1);
        state.h = clampValue(state.h, 1, 4, 1);
      },
      /* Birim küpler izometrik olarak arkadan öne çizilir: katmanlar üst üste binmez,
         her küpün üst ve yan yüzü ayrı görünür. */
      draw(state) {
        const a = state.a;
        const b = state.b;
        const h = state.h;
        const u = Math.min(48, 300 / (a + b * 0.55), 200 / (h + b * 0.42));
        const du = u * 0.5;
        const dv = u * 0.36;
        const totalW = a * u + b * du;
        const totalH = h * u + b * dv;
        const x0 = 70 + Math.max(0, (296 - totalW) / 2);
        const y0 = 98 + totalH;
        const parts = [note(40, 34, 'Hacim = taban alanı × katman sayısı; her katman taban kadar küp taşır.', { size: 12.5 })];
        for (let j = b - 1; j >= 0; j -= 1) {
          for (let k = 0; k < h; k += 1) {
            for (let i = 0; i < a; i += 1) {
              const x = x0 + i * u + j * du;
              const y = y0 - j * dv - k * u;
              const front = k % 2 === 0 ? '#c9bff2' : '#ded5fb';
              parts.push(polygon([[x, y - u], [x + u, y - u], [x + u + du, y - u - dv], [x + du, y - u - dv]], { fill: '#efeafd', stroke: '#4a3d7a', width: 1 }));
              parts.push(polygon([[x + u, y], [x + u + du, y - dv], [x + u + du, y - u - dv], [x + u, y - u]], { fill: '#e4dcfa', stroke: '#4a3d7a', width: 1 }));
              parts.push(rect(x, y - u, u, u, { fill: front, stroke: '#4a3d7a', width: 1 }));
              /* Ön sıradaki her küp numaralanır: birim küpler tek tek sayılır.
                 Numaralar katman katman artar; arka sıralar aynı sırayı gizler. */
              if (j === 0 && u >= 24) {
                parts.push(text(x + u / 2, y - u / 2 + 4, String(k * a + i + 1), {
                  size: u >= 34 ? 13 : 11, anchor: 'middle', weight: 800, fill: '#33265f',
                }));
              }
            }
          }
        }
        /* Katman sayısı ve taban ölçüleri yazıyla; sonuç öğrencide. */
        parts.push(text(x0 + totalW / 2, y0 + 20, `taban ${num(a)} × ${num(b)} · katman ${num(h)}`, { size: 12, anchor: 'middle', weight: 700, fill: '#33265f' }));
        parts.push(panel(392, 70, 224, 112));
        parts.push(text(410, 100, `Taban: ${num(a)} × ${num(b)} = ?`, { size: 12.5, weight: 700 }));
        parts.push(text(410, 128, `Her katman: ? birim küp`, { size: 12.5, weight: 700, fill: '#41506a' }));
        parts.push(text(410, 156, 'Hacim = ? birimküp', { size: 14, weight: 800, fill: '#5b46a8' }));
        parts.push(note(40, H - 20, 'Numaralar yalnız ön sıradaki küpleri sayar; her yeni katman taban alanı kadar küp ekler.', { size: 12 }));
        return parts.join('');
      },
    },
    'birim-donusum': {
      params: [{ name: 's', label: 'Ayrıt (dm)', min: 1, max: 6, step: 1, value: 2 }],
      normalize(state) {
        state.s = clampValue(state.s, 1, 6, 1);
      },
      /* Ayrıtı s dm olan küp ve köşesinde 1 dm³'lük birim küp: litre ile dm³
         eşitliği tek resimde görünür. Sonuçlar (?, ?) olarak öğrencide kalır. */
      draw(state) {
        const s = state.s;
        const u = Math.min(52, 190 / s);
        const du = u * 0.46;
        const dv = u * 0.34;
        const side = u * s;
        const totalW = side + du;
        const totalH = side + dv;
        const x0 = 66 + Math.max(0, (290 - totalW) / 2);
        const y0 = 96 + totalH;
        const parts = [note(40, 34, 'Kenarı 1 dm olan küp 1 litre alır; 1 dm = 10 cm olduğu için 1 dm³ = 1000 cm³.', { size: 12 })];
        /* Büyük küp: ön yüz + üst yüz + yan yüz, hepsi kapalı. */
        parts.push(polygon([[x0, y0 - side], [x0 + side, y0 - side], [x0 + side + du, y0 - side - dv], [x0 + du, y0 - side - dv]], { fill: '#ded5fb', stroke: '#4a3d7a', width: 1.2 }));
        parts.push(polygon([[x0 + side, y0], [x0 + side + du, y0 - dv], [x0 + side + du, y0 - side - dv], [x0 + side, y0 - side]], { fill: '#f1ecfd', stroke: '#4a3d7a', width: 1.2 }));
        parts.push(rect(x0, y0 - side, side, side, { fill: '#efeafd', stroke: '#4a3d7a', width: 1.2 }));
        /* Ön yüzde 10 × 10 cm ızgara: 1 dm = 10 cm. */
        for (let i = 1; i < 10; i += 1) {
          parts.push(line(x0 + (side / 10) * i, y0, x0 + (side / 10) * i, y0 - side, { stroke: '#d7cff2', width: 0.6 }));
          parts.push(line(x0, y0 - (side / 10) * i, x0 + side, y0 - (side / 10) * i, { stroke: '#d7cff2', width: 0.6 }));
        }
        /* Birim küp: hacmin ölçü birimi (1 dm³). */
        parts.push(polygon([[x0, y0 - u], [x0 + u, y0 - u], [x0 + u + du * (u / side), y0 - u - dv * (u / side)], [x0 + du * (u / side), y0 - u - dv * (u / side)]], { fill: '#ffe3a3', stroke: '#b8791a', width: 1.3 }));
        parts.push(rect(x0, y0 - u, u, u, { fill: '#ffd983', stroke: '#b8791a', width: 1.4 }));
        parts.push(text(x0 + u / 2, y0 - u / 2 + 4, '1 dm³', { size: 11, anchor: 'middle', weight: 800, fill: '#8a5a10' }));
        parts.push(text(x0 + u / 2, y0 + 22, 'birim küp', { size: 11, anchor: 'middle', fill: '#8a5a10' }));
        parts.push(text(x0 + side / 2, y0 + 44, `ayrıt = ${num(s)} dm = ${num(s * 10)} cm`, { size: 12, anchor: 'middle', weight: 700, fill: '#33265f' }));
        parts.push(panel(392, 70, 224, 126));
        parts.push(text(410, 100, `Hacim = ${num(s)}³ = ? dm³`, { size: 13, weight: 800, fill: '#33265f' }));
        parts.push(text(410, 128, '= ? litre', { size: 13.5, weight: 800, fill: '#2f8a63' }));
        parts.push(text(410, 156, '= ? cm³', { size: 12.5, fill: '#5b46a8' }));
        parts.push(note(410, 182, '1 dm³ = 1 L = 1000 cm³', { size: 11.5 }));
        parts.push(note(40, H - 20, 'Sarı küp ölçü birimidir: büyük küpün içinde kaç tane var?', { size: 12 }));
        return parts.join('');
      },
    },
    /* Bileşik (L) cisim: bütün bloktan bir köşe prizması kesilmiş gibi düşünülür.
       Cisim birim küplerden kurulur; hacim kesilen parça çıkarılarak bulunur. */
    'bilesik-hacim': {
      params: [
        { name: 'a', label: 'Genişlik', min: 3, max: 4, step: 1, value: 4 },
        { name: 'b', label: 'Derinlik', min: 2, max: 4, step: 1, value: 3 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 3, step: 1, value: 2 },
        { name: 'k', label: 'Kesilen parça', min: 1, max: 2, step: 1, value: 2 },
      ],
      normalize(state) {
        state.a = clampValue(state.a, 3, 4, 1);
        state.b = clampValue(state.b, 2, 4, 1);
        state.h = clampValue(state.h, 1, 3, 1);
        state.k = clampValue(state.k, 1, 2, 1);
      },
      draw(state) {
        const a = state.a;
        const b = state.b;
        const h = state.h;
        const k = state.k;
        const solid = (i, j) => !(i >= a - k && j >= 1);
        const u = Math.min(46, 250 / (a + b * 0.5), 210 / (h + b * 0.35));
        const du = u * 0.5;
        const dv = u * 0.36;
        const totalW = a * u + b * du;
        const totalH = h * u + b * dv;
        const x0 = 56 + Math.max(0, (286 - totalW) / 2);
        const y0 = 96 + totalH;
        const parts = [note(40, 34, 'Bütün blok ile kesilen parça: hacmi iki prizma gibi ayır.', { size: 12.5 })];
        /* Kesilen parçanın zemindeki yeri: boş kalan dikdörtgen. */
        for (let j = b - 1; j >= 1; j -= 1) {
          for (let i = a - 1; i >= a - k; i -= 1) {
            const x = x0 + i * u + j * du;
            const y = y0 - j * dv;
            parts.push(polygon([[x, y], [x + u, y], [x + u + du, y - dv], [x + du, y - dv]], {
              fill: '#f4f2f8', stroke: '#b9c0cc', width: 1, dash: '4 4',
            }));
          }
        }
        for (let j = b - 1; j >= 0; j -= 1) {
          for (let level = 0; level < h; level += 1) {
            for (let i = 0; i < a; i += 1) {
              if (!solid(i, j)) continue;
              const x = x0 + i * u + j * du;
              const y = y0 - j * dv - level * u;
              const fill = (i + j + level) % 2 === 0 ? '#c9bff2' : '#ded5fb';
              parts.push(polygon([[x, y - u], [x + u, y - u], [x + u + du, y - u - dv], [x + du, y - u - dv]], { fill: '#efeafd', stroke: '#4a3d7a', width: 0.9 }));
              parts.push(polygon([[x + u, y], [x + u + du, y - dv], [x + u + du, y - u - dv], [x + u, y - u]], { fill: '#e4dcfa', stroke: '#4a3d7a', width: 0.9 }));
              parts.push(rect(x, y - u, u, u, { fill, stroke: '#4a3d7a', width: 0.9 }));
            }
          }
        }
        /* Kesilen parçanın hacmi boş kalan bir kutu gibi gösterilir: zeminde ve üstte
           kesikli çerçeve, köşelerde düşey kılavuzlar. Öğrenci "eksik" bloğu görür. */
        const notch = (level) => {
          const corners = [[a - k, 1], [a, 1], [a, b], [a - k, b]];
          return corners.map(([i, j]) => [x0 + i * u + j * du, y0 - j * dv - level * u]);
        };
        parts.push(polygon(notch(h), { stroke: '#b8791a', width: 1.2, dash: '5 4' }));
        parts.push(polygon(notch(0), { stroke: '#b8791a', width: 1.2, dash: '5 4' }));
        [[a - k, 1], [a, b]].forEach(([i, j]) => {
          parts.push(line(x0 + i * u + j * du, y0 - j * dv, x0 + i * u + j * du, y0 - j * dv - h * u, { stroke: '#b8791a', width: 1, dash: '4 4' }));
        });
        parts.push(text(x0 + totalW / 2, y0 + 22, `genişlik ${num(a)} · derinlik ${num(b)} · yükseklik ${num(h)}`, { size: 11.5, anchor: 'middle', weight: 700, fill: '#33265f' }));
        parts.push(panel(392, 70, 224, 150));
        parts.push(text(410, 98, 'Bütün blok', { size: 12.5, weight: 800, fill: '#33265f' }));
        parts.push(note(410, 122, `${num(a)} · ${num(b)} · ${num(h)} = ? birimküp`, { size: 12 }));
        parts.push(text(410, 154, 'Kesilen parça', { size: 12.5, weight: 800, fill: '#8a5a10' }));
        parts.push(note(410, 178, `${num(k)} · ${num(b - 1)} · ${num(h)} = ? birimküp`, { size: 12 }));
        parts.push(text(410, 206, 'Bileşik cismin hacmi = ?', { size: 13, weight: 800, fill: '#5b46a8' }));
        parts.push(note(40, H - 20, 'Kesikli küpler boş bırakılır: hacim, kalan küplerin sayısıdır.', { size: 12 }));
        return parts.join('');
      },
    },

    /* Düzensiz küp yığını: sütun yükseklikleri desene göre değişir. Ön, yan ve üst
       görünümler dolu dikdörtgen değil, basamaklı siluetlerdir. */
    'duzensiz-yigin': {
      params: [
        { name: 'desen', label: 'Yapı', min: 1, max: 4, step: 1, value: 1 },
        { name: 'h', label: 'En yüksek sütun', min: 1, max: 3, step: 1, value: 3 },
      ],
      normalize(state) {
        state.desen = clampValue(state.desen, 1, 4, 1);
        state.h = clampValue(state.h, 1, 3, 1);
      },
      draw(state) {
        const heights = stackHeights(state);
        const depth = heights.length;
        const width = heights[0].length;
        const top = Math.max(1, ...heights.flat());
        const u = Math.min(44, 240 / (width + depth * 0.5), 208 / (top + depth * 0.35));
        const du = u * 0.5;
        const dv = u * 0.36;
        const totalW = width * u + depth * du;
        const x0 = 34 + Math.max(0, (270 - totalW) / 2);
        const y0 = 104 + top * u + depth * dv;
        const parts = [note(40, 30, 'Her sütunun yüksekliği farklı: görünümler basamaklı olur.', { size: 12 })];
        for (let j = depth - 1; j >= 0; j -= 1) {
          for (let level = 0; level < top; level += 1) {
            for (let i = 0; i < width; i += 1) {
              if (heights[j][i] <= level) continue;
              const x = x0 + i * u + j * du;
              const y = y0 - j * dv - level * u;
              const fill = (i + j + level) % 2 === 0 ? '#cfe4f7' : '#e4dcfa';
              parts.push(polygon([[x, y - u], [x + u, y - u], [x + u + du, y - u - dv], [x + du, y - u - dv]], { fill: '#eef6fc', stroke: '#2f6d9a', width: 0.9 }));
              parts.push(polygon([[x + u, y], [x + u + du, y - dv], [x + u + du, y - u - dv], [x + u, y - u]], { fill: '#dfeef9', stroke: '#2f6d9a', width: 0.9 }));
              parts.push(rect(x, y - u, u, u, { fill, stroke: '#2f6d9a', width: 0.9 }));
            }
          }
        }
        /* Üç görünüm: gerçek siluetler (dolu ve boş kareler). */
        const panels = viewPanels(heights);
        panels.forEach((panel, index) => {
          const cols = panel.cells[0].length;
          const rows = panel.cells.length;
          const cell = Math.min(18, 60 / Math.max(cols, rows));
          const boxX = 312 + index * 106;
          parts.push(rect(boxX, 62, 100, 152, { fill: '#fbfaff', stroke: '#ded8f2', width: 1.1, rx: 10 }));
          parts.push(text(boxX + 50, 82, panel.title, { size: 12, anchor: 'middle', weight: 800, fill: '#33265f' }));
          const gx = boxX + 50 - (cols * cell) / 2;
          const gy = 96;
          panel.cells.forEach((row, r) => {
            row.forEach((filled, c) => {
              parts.push(rect(gx + c * cell, gy + r * cell, cell - 1.2, cell - 1.2, {
                fill: filled ? panel.fill : '#fff', stroke: filled ? '#4a3d7a' : '#e2dcf2', width: filled ? 0.8 : 0.6, rx: 2,
              }));
            });
          });
          parts.push(text(boxX + 50, 165, `${num(cols)} × ${num(rows)} kare`, { size: 11, anchor: 'middle', weight: 700, fill: '#41506a' }));
          parts.push(text(boxX + 50, 184, 'dolu kare: ?', { size: 10.5, anchor: 'middle', fill: '#6b7a90' }));
          parts.push(text(boxX + 50, 201, 'sen say', { size: 9.5, anchor: 'middle', fill: '#8a93a3' }));
        });
        parts.push(note(40, H - 18, 'Dolu kare görünür, boş kare görünmez; üç görünüm birlikte okunur.', { size: 11.5 }));
        return parts.join('');
      },
    },

    /* Yansıma ve simetri: ayna doğrusu döner, şeklin görüntüsü çizilir.
       Görüntü şeklin üstüne oturduğunda o doğru bir simetri doğrusudur. */
    'simetri-dogru': {
      params: [
        { name: 'sekiz', label: 'Şekil', min: 1, max: 4, step: 1, value: 1 },
        { name: 'aci', label: 'Ayna doğrusu (derece)', min: 0, max: 180, step: 15, value: 0 },
      ],
      normalize(state) {
        state.sekiz = clampValue(state.sekiz, 1, 4, 1);
        state.aci = clampValue(state.aci, 0, 180, 15);
      },
      draw(state) {
        const shape = shapeOf(state.sekiz);
        const angle = (state.aci * Math.PI) / 180;
        const cx = 186;
        const cy = 196;
        const R = 84;
        const vertices = shape.points.map(([x, y]) => [cx + x * R, cy + y * R]);
        const mirrored = vertices.map(([x, y]) => {
          const dx = x - cx;
          const dy = y - cy;
          const cos = Math.cos(2 * angle);
          const sin = Math.sin(2 * angle);
          return [cx + dx * cos + dy * sin, cy + dx * sin - dy * cos];
        });
        const parts = [text(W / 2, 30, 'Ayna doğrusunu çevir: görüntü şeklin üstüne oturuyor mu?', { size: 13, anchor: 'middle', weight: 800, fill: '#33265f' })];
        parts.push(polygon(vertices, { fill: 'rgba(112,86,201,0.14)', stroke: '#5b46a8', width: 2 }));
        /* Görüntü en üstte: örtüştüğünde yeşil kesikli çizgi mor kenarın üstünde kalır. */
        parts.push(polygon(mirrored, { fill: 'none', stroke: '#2f8a63', width: 3.2, dash: '7 5' }));
        vertices.forEach(([x, y]) => parts.push(circle(x, y, 3.2, { fill: '#5b46a8', stroke: '#fff', width: 1 })));
        mirrored.forEach(([x, y]) => parts.push(circle(x, y, 3.2, { fill: '#2f8a63', stroke: '#fff', width: 1 })));
        /* Ayna doğrusu: merkezden geçen, panelin dışına taşan kesikli çizgi. */
        const long = 150;
        parts.push(line(cx - long * Math.cos(angle), cy + long * Math.sin(angle), cx + long * Math.cos(angle), cy - long * Math.sin(angle), { stroke: '#b8791a', width: 2, dash: '8 5' }));
        parts.push(circle(cx, cy, 4, { fill: '#b8791a', stroke: '#fff', width: 1.4 }));
        /* Dört simetri adayı: öğrenci hangilerinin oturduğunu dener. */
        parts.push(text(cx, 328, shape.name, { size: 12.5, anchor: 'middle', weight: 700, fill: '#33265f' }));
        parts.push(panel(392, 62, 224, 176));
        parts.push(text(410, 90, 'Ayna doğrusu', { size: 12.5, weight: 800, fill: '#33265f' }));
        parts.push(note(410, 114, `${num(state.aci)}° — turuncu kesikli çizgi`, { size: 12 }));
        parts.push(text(410, 146, 'Görüntü üst üste mi?', { size: 12.5, weight: 800, fill: '#5b46a8' }));
        parts.push(note(410, 170, 'Yeşil kesikli: aynadaki görüntü.', { size: 11.5 }));
        parts.push(note(410, 192, 'Örtüşen her açı bir simetri', { size: 11.5 }));
        parts.push(note(410, 210, 'doğrusudur; kaç tane var?', { size: 11.5 }));
        parts.push(note(40, H - 20, 'Bir şeklin simetri doğrusu sayısı, örtüşen ayna açılarının sayısıdır.', { size: 12 }));
        return parts.join('');
      },
    },

    /* 12. hafta: ortanca ve açıklık — beş değer sıralanır, ortadaki işaretlenir. */
    'sirala-ortanca': {
      params: [
        { name: 'v1', label: '1. veri', min: 0, max: 12, step: 1, value: 4 },
        { name: 'v2', label: '2. veri', min: 0, max: 12, step: 1, value: 9 },
        { name: 'v3', label: '3. veri', min: 0, max: 12, step: 1, value: 6 },
        { name: 'v4', label: '4. veri', min: 0, max: 12, step: 1, value: 2 },
        { name: 'v5', label: '5. veri', min: 0, max: 12, step: 1, value: 7 },
      ],
      normalize(state) {
        ['v1', 'v2', 'v3', 'v4', 'v5'].forEach((name) => {
          state[name] = clampValue(state[name], 0, 12, 1);
        });
      },
      draw(state) {
        const raw = [state.v1, state.v2, state.v3, state.v4, state.v5];
        const sorted = raw.slice().sort((a, b) => a - b);
        const median = sorted[2];
        const min = sorted[0];
        const max = sorted[4];
        const left = 62;
        const right = W - 62;
        const axisY = 210;
        const px = (value) => left + (value / 12) * (right - left);
        const parts = [text(W / 2, 28, 'Veriler küçükten büyüğe sıralanır, ortadaki ortancadır', { size: 14, anchor: 'middle', weight: 800, fill: '#33265f' })];
        parts.push(rect(Math.min(px(min), px(max)), axisY - 12, Math.max(2, px(max) - px(min)), 24, { fill: '#efeafb', stroke: 'none', width: 0 }));
        parts.push(line(left - 12, axisY, right + 12, axisY, { stroke: '#1b2f49', width: 2.2 }));
        for (let value = 0; value <= 12; value += 1) {
          parts.push(line(px(value), axisY - 7, px(value), axisY + 7, { stroke: '#5f6f86', width: 1.6 }));
          if (value % 2 === 0) parts.push(text(px(value), axisY + 30, String(value), { size: 11.5, anchor: 'middle', fill: '#6b7a90' }));
        }
        /* Sıralanmış veriler: her nokta kaçıncı sırada olduğuyla yazılır. */
        const seen = new Map();
        sorted.forEach((value, index) => {
          const count = seen.get(value) || 0;
          seen.set(value, count + 1);
          const y = axisY - 26 - count * 24;
          parts.push(circle(px(value), axisY, 7, { fill: index === 2 ? '#c03744' : '#5b46a8' }));
          parts.push(text(px(value), y, `${index + 1}. ${num(value)}`, { size: 11.5, anchor: 'middle', weight: index === 2 ? 800 : 600, fill: index === 2 ? '#c03744' : '#4a3d7a' }));
        });
        const stackTop = axisY - 26 - (sorted.filter((value) => value === median).length - 1) * 24;
        parts.push(line(px(median), axisY - 8, px(median), stackTop - 16, { stroke: '#c03744', width: 1.6, dash: '5 4' }));
        parts.push(text(px(median), stackTop - 24, 'ortanca', { size: 12.5, anchor: 'middle', weight: 800, fill: '#c03744' }));
        /* Açıklık: en büyük ile en küçük arası. */
        parts.push(line(px(min), axisY + 62, px(max), axisY + 62, { stroke: '#2f8a63', width: 2 }));
        parts.push(line(px(min), axisY + 54, px(min), axisY + 70, { stroke: '#2f8a63', width: 2 }));
        parts.push(line(px(max), axisY + 54, px(max), axisY + 70, { stroke: '#2f8a63', width: 2 }));
        /* Uzun etiket: ölçü çubuğunun ortasına yaslanır, tuvalden taşmaz. */
        const labelW = 'açıklık = en büyük − en küçük = ?'.length * 12 * 0.53;
        const spanX = Math.min(right - labelW / 2 - 4, Math.max(left + labelW / 2 + 4, (px(min) + px(max)) / 2));
        parts.push(text(spanX, axisY + 82, 'açıklık = en büyük − en küçük = ?', { size: 12, anchor: 'middle', weight: 700, fill: '#2f8a63' }));
        parts.push(panel(40, 300, W - 80, 48));
        parts.push(text(58, 322, `Beş veri var: sıralandığında ortadaki ${num(3)}. veridir.`, { size: 12.5, weight: 700, fill: '#33265f' }));
        parts.push(text(58, 340, 'Ortanca, ortalama ve açıklığı sen yaz.', { size: 12, fill: '#41506a' }));
        return parts.join('');
      },
    },

    'veri-grafik': {
      params: [
        { name: 'a', label: '1. grup', min: 1, max: 8, step: 1, value: 5 },
        { name: 'b', label: '2. grup', min: 1, max: 8, step: 1, value: 3 },
        { name: 'c', label: '3. grup', min: 1, max: 8, step: 1, value: 6 },
        { name: 'eksen', label: 'Eksen sıfırdan başlasın (1) / kırpılsın (0)', min: 0, max: 1, step: 1, value: 1 },
      ],
      normalize(state) {
        state.eksen = clampValue(state.eksen, 0, 1, 1);
      },
      /* Bu sahne grafiğin ölçeğini konu eder: eksen kırpılınca aynı veri
         olduğundan çok farklı görünür. Değerler yazılmaz, öğrenci okur. */
      draw(state) {
        const values = [state.a, state.b, state.c];
        const names = ['1. grup', '2. grup', '3. grup'];
        const base = 300;
        const max = 8;
        const cut = state.eksen === 0;
        const floor = cut ? 2 : 0;
        const span = max - floor;
        const parts = [];
        parts.push(note(40, 34, cut
          ? 'Dikey eksen 0’dan değil 2’den başlıyor: sütunlar arasındaki fark olduğundan büyük görünür.'
          : 'Dikey eksen sıfırdan başlıyor: sütun yüksekliği sıklığın kendisidir.', { size: 12 }));
        for (let tick = floor; tick <= max; tick += 1) {
          const y = base - ((tick - floor) / span) * 200;
          parts.push(line(90, y, 560, y, { stroke: tick === 0 ? '#1b2f49' : '#eef0f6', width: tick === 0 ? 1.8 : 1 }));
          parts.push(text(80, y + 4, String(tick), { size: 11, anchor: 'end', fill: '#6b7a90' }));
        }
        if (cut) {
          /* Kırpılmış eksen işareti: alt kısım atlandı. */
          parts.push(line(86, base - 200, 86, base, { stroke: '#c03744', width: 1.6, dash: '5 4' }));
          parts.push(text(96, base - 190, 'kesik eksen', { size: 10.5, fill: '#c03744' }));
        }
        values.forEach((value, index) => {
          const height = (Math.max(value, floor) - floor) / span * 200;
          const x = 150 + index * 140;
          parts.push(rect(x, base - height, 70, height, { fill: index === 2 ? '#c9bff2' : '#ded5fb' }));
          parts.push(text(x + 35, base - height - 8, '?', { size: 13, anchor: 'middle', weight: 800 }));
          parts.push(text(x + 35, base + 20, names[index], { size: 11.5, anchor: 'middle', fill: '#41506a' }));
        });
        parts.push(text(90, 344, cut ? 'Bu grafik yanıltıcı mı? Neden?' : 'Toplam ? · ortalama ? · açıklık ?', { size: 12.5, fill: '#41506a' }));
        return parts.join('');
      },
    },

    'ortalama': {
      params: [
        { name: 'a', label: '1. değer', min: 1, max: 9, step: 1, value: 5 },
        { name: 'b', label: '2. değer', min: 1, max: 9, step: 1, value: 7 },
        { name: 'c', label: '3. değer', min: 1, max: 9, step: 1, value: 9 },
      ],
      draw(state) {
        const values = [state.a, state.b, state.c];
        const p = plotter([0, 10, -1, 3], { x: 50, y: 120, w: W - 100, h: 120 });
        const mean = values.reduce((sum, value) => sum + value, 0) / 3;
        const parts = [grid(p, { ylabels: false })];
        parts.push(line(p.px(0), p.py(0), p.px(10), p.py(0), { width: 1.8 }));
        for (let x = 0; x <= 10; x += 1) {
          parts.push(line(p.px(x), p.py(0) - 5, p.px(x), p.py(0) + 5, { width: 1 }));
          parts.push(text(p.px(x), p.py(0) + 22, String(x), { size: 11, anchor: 'middle', fill: '#6b7a90' }));
        }
        values.forEach((value, index) => {
          parts.push(circle(p.px(value), p.py(0), 6.5, { fill: ['#5b46a8', '#2f8a63', '#b8791a'][index] }));
          parts.push(text(p.px(value), p.py(0) - 14 - index * 15, String(value), { size: 11.5, anchor: 'middle', weight: 700 }));
        });
        parts.push(line(p.px(mean), p.py(1.6), p.px(mean), p.py(0), { stroke: '#c03744', width: 2, dash: '5 4' }));
        parts.push(text(p.px(mean), p.py(1.85), 'ortalama = ?', { size: 12.5, anchor: 'middle', weight: 800, fill: '#c03744' }));
        const sorted = [...values].sort((x, y) => x - y);
        parts.push(panel(40, 250, W - 80, 100));
        parts.push(text(60, 280, `Ortalama: (${values.join(' + ')}) ÷ 3 = ?`, { size: 13.5, weight: 700 }));
        parts.push(text(60, 306, 'Ortanca: ? · Açıklık: ?', { size: 13.5, weight: 700, fill: '#2f8a63' }));
        parts.push(note(60, 330, 'Uç değerler ortalamayı daha çok etkiler; ortanca daha dayanıklıdır.', { size: 12 }));
        return parts.join('');
      },
    },

    /* 14. Yansıma */
    'yansima': {
      params: [{ name: 'k', label: 'Ayna doğrusu (x = k)', min: -1, max: 2, step: 1, value: 0 }],
      draw(state) {
        const k = state.k;
        const WINDOW = [-5.5, 4.5, -0.5, 4.5];
        const p = plotter(WINDOW, { x: 46, y: 40, w: W - 96, h: H - 120 });
        const A = [1, 1];
        const B = [2, 1];
        const C = [1, 3];
        const mirror = (point) => [2 * k - point[0], point[1]];
        /* Etiket tuvalin dışına çıkmasın: kenara yaklaşınca içe yaslanır. */
        const label = (x, y, value, color, startAnchor) => {
          const inside = x > 44 && x < W - 44;
          const anchor = inside ? startAnchor : (x <= 44 ? 'start' : 'end');
          const dx = anchor === 'end' ? -8 : 8;
          return text(x + dx, y, value, { size: 12, weight: 800, fill: color, anchor });
        };
        const parts = [grid(p)];
        parts.push(line(p.px(k), p.py(WINDOW[2]), p.px(k), p.py(WINDOW[3]), { stroke: '#c03744', width: 2, dash: '7 5' }));
        parts.push(text(p.px(k) + 8, p.py(WINDOW[3]) + 16, `ayna x = ${num(k)}`, { size: 12, weight: 800, fill: '#c03744' }));
        parts.push(polygon([A, B, C].map(([x, y]) => [p.px(x), p.py(y)]), { fill: '#c9bff2' }));
        parts.push(polygon([mirror(A), mirror(B), mirror(C)].map(([x, y]) => [p.px(x), p.py(y)]), { fill: '#d7f0e3', stroke: '#2f8a63', dash: '5 4' }));
        [['A', A], ['B', B], ['C', C]].forEach(([name, point]) => {
          const image = mirror(point);
          parts.push(line(p.px(point[0]), p.py(point[1]), p.px(image[0]), p.py(image[1]), { stroke: '#8a7fb5', width: 1, dash: '3 3' }));
          parts.push(circle(p.px(point[0]), p.py(point[1]), 5, { fill: '#5b46a8' }));
          parts.push(label(p.px(point[0]), p.py(point[1]) - 8, name, '#5b46a8', 'end'));
          parts.push(circle(p.px(image[0]), p.py(image[1]), 5, { fill: '#2f8a63' }));
          parts.push(label(p.px(image[0]), p.py(image[1]) - 8, `${name}'`, '#2f8a63', 'start'));
        });
        parts.push(note(46, H - 40, 'Her köşe aynaya dik taşınır: uzaklık ve uzunluk korunur, yönelim döner.', { size: 11.5 }));
        parts.push(note(46, H - 20, `A(${num(A[0])}, ${num(A[1])}) → A'(?, ?)  ·  ayna x = ${num(k)}`, { size: 12.5, weight: 700, fill: '#33265f' }));
        parts.push(handle('k', p.px(k), p.py(WINDOW[3]) + 16, 'ayna doğrusunu sürükle'));
        return parts.join('');
      },
      drag(svg, event, name, state) {
        const WINDOW = [-5.5, 4.5, -0.5, 4.5];
        const p = plotter(WINDOW, { x: 46, y: 40, w: W - 96, h: H - 120 });
        const local = localPoint(svg, event);
        const span = WINDOW[1] - WINDOW[0];
        const raw = WINDOW[0] + ((local.x - p.box.x) / p.box.w) * span;
        state.k = clampValue(raw, -1, 2, 1);
      },
      handles: [{ name: 'k', label: 'ayna doğrusunu sürükle' }],
    },
    'ortadikme': {
      params: [
        { name: 'ax', label: 'A noktası (x)', min: 0, max: 4, step: 1, value: 1 },
        { name: 'by', label: 'B noktası (y)', min: 1, max: 5, step: 1, value: 3 },
      ],
      draw(state) {
        /* Eşit ölçek: A ile B yatay olmasa da orta dikme ekranda gerçekten dik görünür. */
        const p = plotter([-2, 9, -1, 8], { x: 46, y: 40, w: W - 96, h: H - 140 }, { equal: true });
        const A = [state.ax, 1];
        const B = [5, state.by];
        const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
        const dx = B[0] - A[0];
        const dy = B[1] - A[1];
        const length = Math.hypot(dx, dy) || 1;
        const normal = [-dy / length, dx / length];
        const far = 4.6;
        const parts = [grid(p, { ylabels: false, labelEvery: 2 })];
        parts.push(line(p.px(A[0]), p.py(A[1]), p.px(B[0]), p.py(B[1]), { width: 2 }));
        parts.push(line(p.px(mid[0] - normal[0] * far), p.py(mid[1] - normal[1] * far), p.px(mid[0] + normal[0] * far), p.py(mid[1] + normal[1] * far), { stroke: '#c03744', width: 2, dash: '7 5' }));
        [[A, 'A'], [B, 'B']].forEach(([point, label]) => {
          parts.push(circle(p.px(point[0]), p.py(point[1]), 6, { fill: '#5b46a8' }));
          parts.push(text(p.px(point[0]) + 9, p.py(point[1]) - 9, label, { size: 12, weight: 800, fill: '#5b46a8' }));
        });
        const P = [mid[0] + normal[0] * 2.4, mid[1] + normal[1] * 2.4];
        parts.push(circle(p.px(mid[0]), p.py(mid[1]), 5, { fill: '#c03744' }));
        /* M etiketi: orta dikmeye 20 px dik kaydırılır, P'nin karşı tarafına düşer. */
        const midSx = p.px(mid[0]);
        const midSy = p.py(mid[1]);
        const farSx = p.px(mid[0] + normal[0]);
        const farSy = p.py(mid[1] + normal[1]);
        let perpX = -(farSy - midSy);
        let perpY = farSx - midSx;
        const perpLen = Math.hypot(perpX, perpY) || 1;
        perpX /= perpLen;
        perpY /= perpLen;
        const pSx = p.px(P[0]);
        const pSy = p.py(P[1]);
        if ((pSx - midSx) * perpX + (pSy - midSy) * perpY > 0) {
          perpX = -perpX;
          perpY = -perpY;
        }
        parts.push(text(midSx + perpX * 22, midSy + perpY * 22 + 4, 'M', { size: 12, anchor: 'middle', weight: 800, fill: '#c03744' }));
        parts.push(circle(p.px(P[0]), p.py(P[1]), 6, { fill: '#2f8a63' }));
        parts.push(text(p.px(P[0]) + 9, p.py(P[1]) - 8, 'P', { size: 12, weight: 800, fill: '#2f8a63' }));
        parts.push(line(p.px(P[0]), p.py(P[1]), p.px(A[0]), p.py(A[1]), { stroke: '#2f8a63', width: 1.4, dash: '3 3' }));
        parts.push(line(p.px(P[0]), p.py(P[1]), p.px(B[0]), p.py(B[1]), { stroke: '#2f8a63', width: 1.4, dash: '3 3' }));
        const dA = Math.hypot(P[0] - A[0], P[1] - A[1]);
        const dB = Math.hypot(P[0] - B[0], P[1] - B[1]);
        parts.push(note(46, H - 34, 'Orta dikme, uçlara eşit uzaklıktaki noktaların yeridir.', { size: 12 }));
        parts.push(note(46, H - 14, `|PA| = ${num(dA)}   ·   |PB| = ${num(dB)}   → eşit`, { size: 12, weight: 700, fill: '#2f8a63' }));
        return parts.join('');
      },
    },

    'aciortay': {
      params: [{ name: 'aci', label: 'Açı ölçüsü (°)', min: 30, max: 150, step: 10, value: 80 }],
      draw(state) {
        const angle = state.aci;
        const cx = 330;
        const cy = 300;
        const r = 180;
        const rad = (angle * Math.PI) / 180;
        const left = (Math.PI - rad) / 2;
        const right = (Math.PI + rad) / 2;
        const point = (theta) => [cx + r * Math.cos(theta), cy - r * Math.sin(theta)];
        const [ax, ay] = point(left);
        const [bx, by] = point(right);
        const [mx, my] = point(Math.PI / 2);
        const arc = (radius, from, to) => {
          const [sx, sy] = [cx + radius * Math.cos(from), cy - radius * Math.sin(from)];
          const [ex, ey] = [cx + radius * Math.cos(to), cy - radius * Math.sin(to)];
          const large = Math.abs(to - from) > Math.PI ? 1 : 0;
          return `<path d="M ${coord(sx)} ${coord(sy)} A ${coord(radius)} ${coord(radius)} 0 ${large} 0 ${coord(ex)} ${coord(ey)}" fill="none" stroke="#41506a" stroke-width="1.4"/>`;
        };
        const parts = [];
        parts.push(note(40, 34, 'Açıortay açıyı iki eş açıya böler.', { size: 12.5 }));
        parts.push(line(cx, cy, ax, ay, { width: 2 }));
        parts.push(line(cx, cy, bx, by, { width: 2 }));
        parts.push(line(cx, cy, mx, my, { stroke: '#c03744', width: 2, dash: '7 5' }));
        parts.push(arc(120, left, right));
        parts.push(arc(86, left, Math.PI / 2));
        parts.push(arc(86, Math.PI / 2, right));
        parts.push(text(cx + 96 * Math.cos(left + rad / 4), cy - 96 * Math.sin(left + rad / 4) - 6, `${num(angle / 2)}°`, { size: 12, anchor: 'middle', fill: '#41506a' }));
        parts.push(text(cx + 96 * Math.cos(right - rad / 4), cy - 96 * Math.sin(right - rad / 4) - 6, `${num(angle / 2)}°`, { size: 12, anchor: 'middle', fill: '#41506a' }));
        parts.push(text(mx + 10, my + 18, 'açıortay', { size: 12, weight: 800, fill: '#c03744' }));
        parts.push(circle(cx, cy, 6, { fill: '#1b2f49' }));
        parts.push(panel(40, 52, 230, 92));
        parts.push(text(58, 82, `Açı = ${num(angle)}°`, { size: 14, weight: 800, fill: '#33265f' }));
        parts.push(text(58, 110, `Yarısı = ${num(angle / 2)}°`, { size: 14, weight: 800, fill: '#c03744' }));
        parts.push(note(58, 132, 'İki eş açının toplamı bütün açıdır.', { size: 11.5 }));
        return parts.join('');
      },
    },
  };

  function localPoint(svg, event) {
    const rect = svg.getBoundingClientRect();
    const ratio = W / (rect.width || W);
    return { x: (event.clientX - rect.left) * ratio, y: (event.clientY - rect.top) * ratio };
  }

  /* ---------- bağlama ---------- */

  /* normalize(state): sürgü aralığı sahnenin sınırlarına çekilir, sürgü ile çizim aynı sayıyı
     gösterir. Bozuk bir sahne yüzünden çizim tamamen kaybolmasın diye hata yutulur. */
  function applyNormalize(scene, state) {
    if (!scene || typeof scene.normalize !== 'function') return;
    try {
      scene.normalize(state);
    } catch (error) {
      /* düzeltme yapılamazsa çizim olduğu gibi kalır */
    }
  }

  function mount(host, controls, spec) {
    if (!host || !spec || !SCENES[spec.type]) return null;
    const scene = SCENES[spec.type];
    const params = (spec.params && spec.params.length ? spec.params : scene.params) || [];
    uid += 1;
    const scope = `s${uid}`;
    const state = {};
    params.forEach((param) => {
      state[param.name] = clampValue(param.value, param.min, param.max, param.step);
    });

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('class', 'math-scene-svg');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', spec.title || 'Etkileşimli matematik sahnesi');
    host.innerHTML = '';
    host.appendChild(svg);

    /* Sahne kendi değişkenlerini düzeltebilir; sürgü ile çizim aynı sayıyı gösterir. */
    function normalize() {
      applyNormalize(scene, state);
    }

    function paint() {
      normalize();
      try {
        svg.innerHTML = scene.draw(state);
      } catch (error) {
        svg.innerHTML = `<text x="20" y="40" font-size="14" fill="#b42318">Sahne çizilemedi.</text>`;
      }
      if (scene.drag) {
        svg.querySelectorAll('[data-handle]').forEach((node) => {
          node.addEventListener('pointerdown', (downEvent) => {
            downEvent.preventDefault();
            const name = node.getAttribute('data-handle');
            const move = (moveEvent) => {
              scene.drag(svg, moveEvent, name, state);
              paint();
              syncControls();
            };
            const up = () => {
              window.removeEventListener('pointermove', move);
              window.removeEventListener('pointerup', up);
            };
            window.addEventListener('pointermove', move);
            window.addEventListener('pointerup', up);
          });
          /* Klavye: sol/sağ ok ile nokta adım adım kayar. */
          node.addEventListener('keydown', (keyEvent) => {
            const step = Math.abs(Number((params[0] || {}).step) || 1);
            if (keyEvent.key !== 'ArrowLeft' && keyEvent.key !== 'ArrowRight') return;
            keyEvent.preventDefault();
            const plain = { clientX: 0, clientY: 0 };
            const target = state[node.getAttribute('data-handle')];
            const delta = keyEvent.key === 'ArrowRight' ? step : -step;
            const next = clampValue(Number(target) + delta, params[0].min, params[0].max, params[0].step);
            scene.dragBy ? scene.dragBy(node.getAttribute('data-handle'), state, next) : (state[node.getAttribute('data-handle')] = next);
            paint();
            syncControls();
            void plain;
          });
        });
      }
    }

    function syncControls() {
      if (!controls) return;
      params.forEach((param) => {
        const input = controls.querySelector(`[data-scene-param="${param.name}"]`);
        const out = controls.querySelector(`#scene-out-${scope}-${param.name}`);
        const value = state[param.name];
        if (input && String(input.value) !== String(value)) input.value = String(value);
        if (out) out.textContent = num(value);
      });
    }

    if (controls) {
      controls.innerHTML = controlsMarkup(params, state, scope);
      controls.querySelectorAll('[data-scene-param]').forEach((input) => {
        const param = params.find((item) => item.name === input.dataset.sceneParam);
        input.addEventListener('input', () => {
          if (!param) return;
          state[param.name] = clampValue(input.value, param.min, param.max, param.step);
          paint();
          syncControls();
        });
      });
    }

    paint();
    return {
      state,
      reset() {
        params.forEach((param) => {
      state[param.name] = clampValue(param.value, param.min, param.max, param.step);
    });
        paint();
        syncControls();
      },
      set(name, value) {
        state[name] = Number(value);
        paint();
        syncControls();
      },
    };
  }

  function types() {
    return Object.keys(SCENES);
  }

  /* Denetimler için: sahneyi DOM olmadan çizip SVG parçalarını döndürür. */
  function render(type, values = {}) {
    const scene = SCENES[type];
    if (!scene) return '';
    const state = {};
    (scene.params || []).forEach((param) => {
      const raw = values[param.name];
      state[param.name] = Number(raw === undefined ? param.value : raw);
    });
    applyNormalize(scene, state);
    return scene.draw(state);
  }

  /* Türün varsayılan sürgü tanımları (denetim ve belge için). */
  function params(type) {
    const scene = SCENES[type];
    if (!scene || !scene.params) return [];
    return scene.params.map((param) => ({ ...param }));
  }

  window.MATEMATIK_SAHNE2 = Object.freeze({ mount, types, params, render, width: W, height: H });
})();
