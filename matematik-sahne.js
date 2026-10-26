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

  function plotter(bounds, box = { x: 46, y: 34, w: W - 96, h: H - 96 }) {
    const [xmin, xmax, ymin, ymax] = bounds;
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

    'acim': {
      params: [
        { name: 'a', label: 'Genişlik', min: 1, max: 5, step: 1, value: 4 },
        { name: 'b', label: 'Derinlik', min: 1, max: 5, step: 1, value: 3 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 5, step: 1, value: 2 },
      ],
      draw(state) {
        const a = state.a;
        const b = state.b;
        const h = state.h;
        const unit = Math.max(12, Math.min(26, 540 / (2 * b + a), 280 / (2 * h + 2 * b)));
        const parts = [];
        parts.push(note(40, 34, 'Açınım: altı dikdörtgen. Karşılıklı yüzler eştir.', { size: 12.5 }));
        // dikey gövde: ön (a×h), üst (a×b), arka (a×h), alt (a×b)
        const totalWidth = (2 * b + a) * unit;
        const x0 = (640 - totalWidth) / 2 + b * unit;
        const y0 = 70;
        const wA = a * unit;
        const hH = h * unit;
        const hB = b * unit;
        parts.push(rect(x0, y0, wA, hH, { fill: '#c9bff2' }));
        parts.push(rect(x0, y0 + hH, wA, hB, { fill: '#ded5fb' }));
        parts.push(rect(x0, y0 + hH + hB, wA, hH, { fill: '#e8e2fb' }));
        parts.push(rect(x0, y0 + 2 * hH + hB, wA, hB, { fill: '#f3effe' }));
        // yan yüzler
        parts.push(rect(x0 - hB, y0, hB, hH, { fill: '#d7ccf7' }));
        parts.push(rect(x0 + wA, y0, hB, hH, { fill: '#d7ccf7' }));
        parts.push(text(x0 + wA / 2, y0 + hH / 2, `ön ${num(a)}×${num(h)}`, { size: 10.5, anchor: 'middle', fill: '#33265f' }));
        parts.push(text(x0 + wA / 2, y0 + hH + hB / 2 + 4, `üst ${num(a)}×${num(b)}`, { size: 11.5, anchor: 'middle', fill: '#33265f' }));
        parts.push(text(x0 + wA / 2, y0 + 2 * hH + hB - 8, `alt ${num(a)}×${num(b)}`, { size: 11.5, anchor: 'middle', fill: '#33265f' }));
        parts.push(text(x0 - 4, y0 + hH / 2, `yan ${num(b)}×${num(h)}`, { size: 9.5, anchor: 'end', fill: '#33265f' }));
        parts.push(panel(404, 66, 214, 132));
        const surface = 2 * (a * b + a * h + b * h);
        parts.push(text(422, 94, 'Yüzey alanı', { size: 12.5, weight: 800, fill: '#33265f' }));
        parts.push(note(422, 118, '2·(a·b + a·h + b·h)', { size: 12 }));
        parts.push(text(422, 148, '= ?', { size: 18, weight: 800, fill: '#5b46a8' }));
        parts.push(note(422, 172, 'her yüz çiftinden iki tane', { size: 11.5 }));
        parts.push(note(40, H - 20, 'Kapaksız kutuda üst yüz hesaba katılmaz.', { size: 12 }));
        return parts.join('');
      },
    },

    /* Cisimlerin üç yönden görünümü: ön · yan · üst. Sonuç yazılmaz. */
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
      draw(state) {
        const a = state.a;
        const b = state.b;
        const h = state.h;
        const size = 42;
        const parts = [];
        parts.push(note(40, 34, 'Hacim = taban alanı × yükseklik; her katman taban alanı kadar birim küp taşır.', { size: 12.5 }));
        for (let layer = 0; layer < h; layer += 1) {
          for (let row = 0; row < b; row += 1) {
            for (let col = 0; col < a; col += 1) {
              const x = 80 + col * size + row * 16;
              const y = 300 - layer * size - row * 16;
              const fill = layer % 2 === 0 ? '#c9bff2' : '#ded5fb';
              parts.push(polygon([[x, y], [x + size, y], [x + size + 10, y - 7], [x + 10, y - 7]], { fill: '#efeafd', width: 1 }));
              parts.push(rect(x, y - size, size, size, { fill, stroke: '#4a3d7a', width: 1 }));
            }
          }
        }
        parts.push(panel(392, 70, 224, 104));
        parts.push(text(410, 100, `Taban: ${num(a)} × ${num(b)} = ?`, { size: 12.5, weight: 700 }));
        parts.push(text(410, 126, `Katman: ${num(h)}`, { size: 12.5, weight: 700 }));
        parts.push(text(410, 156, 'Hacim = ?', { size: 14, weight: 800, fill: '#5b46a8' }));
        parts.push(note(40, H - 20, 'Katman sayısı arttıkça hacim taban alanı kadar artar.', { size: 12 }));
        return parts.join('');
      },
    },

    'birim-donusum': {
      params: [{ name: 's', label: 'Ayrıt (dm)', min: 1, max: 6, step: 1, value: 2 }],
      draw(state) {
        const s = state.s;
        const size = 40 + s * 22;
        const parts = [];
        parts.push(note(40, 34, 'Kenarı 1 dm olan küp 1 litre alır. Ayrıt iki katına çıkarsa hacim sekiz katına çıkar.', { size: 12.5 }));
        const x = 70;
        const y = 300;
        const d = size * 0.42;
        parts.push(polygon([[x, y - size], [x + size, y - size], [x + size + d, y - size - d * 0.6], [x + d, y - size - d * 0.6]], { fill: '#ded5fb' }));
        parts.push(polygon([[x + size, y], [x + size + d, y - d * 0.6], [x + size + d, y - size - d * 0.6], [x + size, y - size]], { fill: '#f1ecfd' }));
        parts.push(polygon([[x, y], [x + size, y], [x + size, y - size], [x, y - size]], { fill: '#c9bff2' }));
        parts.push(text(x + size / 2, y + 20, `ayrıt = ${num(s)} dm`, { size: 12.5, anchor: 'middle', weight: 700 }));
        parts.push(panel(348, 70, 268, 132));
        parts.push(text(366, 100, `Hacim = ${num(s)}³ = ? dm³`, { size: 13.5, weight: 800, fill: '#33265f' }));
        parts.push(text(366, 128, '= ? litre', { size: 14, weight: 800, fill: '#2f8a63' }));
        parts.push(text(366, 156, '= ? cm³', { size: 12.5, fill: '#5b46a8' }));
        parts.push(note(366, 182, '1 dm³ = 1 L = 1000 cm³', { size: 11.5 }));
        return parts.join('');
      },
    },

    /* 12-13. Veri */
    'veri-grafik': {
      params: [
        { name: 'a', label: '1. grup', min: 1, max: 8, step: 1, value: 5 },
        { name: 'b', label: '2. grup', min: 1, max: 8, step: 1, value: 3 },
        { name: 'c', label: '3. grup', min: 1, max: 8, step: 1, value: 6 },
      ],
      draw(state) {
        const values = [state.a, state.b, state.c];
        const names = ['1. grup', '2. grup', '3. grup'];
        const base = 300;
        const max = 8;
        const parts = [];
        parts.push(note(40, 34, 'Sütun yüksekliği sıklığı gösterir; dikey eksen sıfırdan başlar.', { size: 12.5 }));
        for (let tick = 0; tick <= max; tick += 1) {
          const y = base - (tick / max) * 200;
          parts.push(line(90, y, 560, y, { stroke: tick === 0 ? '#1b2f49' : '#eef0f6', width: tick === 0 ? 1.8 : 1 }));
          parts.push(text(80, y + 4, String(tick), { size: 11, anchor: 'end', fill: '#6b7a90' }));
        }
        values.forEach((value, index) => {
          const height = (value / max) * 200;
          const x = 150 + index * 140;
          parts.push(rect(x, base - height, 70, height, { fill: index === 2 ? '#c9bff2' : '#ded5fb' }));
          parts.push(text(x + 35, base - height - 8, String(value), { size: 13, anchor: 'middle', weight: 800 }));
          parts.push(text(x + 35, base + 20, names[index], { size: 11.5, anchor: 'middle', fill: '#41506a' }));
        });
        const total = values.reduce((sum, value) => sum + value, 0);
        parts.push(text(90, 344, 'Toplam ? · ortalama ? · açıklık ?', { size: 12.5, fill: '#41506a' }));
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
        const p = plotter([-2, 9, -1, 8], { x: 46, y: 40, w: W - 96, h: H - 140 });
        const A = [state.ax, 1];
        const B = [5, state.by];
        const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
        const dx = B[0] - A[0];
        const dy = B[1] - A[1];
        const length = Math.hypot(dx, dy) || 1;
        const normal = [-dy / length, dx / length];
        const far = 4.6;
        const parts = [grid(p, { ylabels: false })];
        parts.push(line(p.px(A[0]), p.py(A[1]), p.px(B[0]), p.py(B[1]), { width: 2 }));
        parts.push(line(p.px(mid[0] - normal[0] * far), p.py(mid[1] - normal[1] * far), p.px(mid[0] + normal[0] * far), p.py(mid[1] + normal[1] * far), { stroke: '#c03744', width: 2, dash: '7 5' }));
        [[A, 'A'], [B, 'B']].forEach(([point, label]) => {
          parts.push(circle(p.px(point[0]), p.py(point[1]), 6, { fill: '#5b46a8' }));
          parts.push(text(p.px(point[0]) + 9, p.py(point[1]) - 9, label, { size: 12, weight: 800, fill: '#5b46a8' }));
        });
        parts.push(circle(p.px(mid[0]), p.py(mid[1]), 5, { fill: '#c03744' }));
        parts.push(text(p.px(mid[0]) + 9, p.py(mid[1]) + 16, 'M (orta nokta)', { size: 11, fill: '#c03744' }));
        const P = [mid[0] + normal[0] * 2.4, mid[1] + normal[1] * 2.4];
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
