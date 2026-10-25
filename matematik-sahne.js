/* Matematik sahneleri — birinci taraf etkileşimli SVG motoru.
   Dış servise bağlı değildir: her sahne çevrimdışı çizilir, sürgüler ve
   sürüklenebilir noktalar doğrudan çalışır. */
(() => {
  'use strict';

  const W = 640;
  const H = 380;

  const esc = (value) => String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const num = (value) => {
    const rounded = Math.round(Number(value) * 100) / 100;
    return String(rounded).replace('.', ',');
  };

  /* ---------- ortak çizim yardımcıları ---------- */

  function text(x, y, value, options = {}) {
    const size = options.size || 13;
    const anchor = options.anchor || 'start';
    const weight = options.weight || 500;
    const fill = options.fill || '#1b2f49';
    const quotes = options.plain ? '' : 'font-family="system-ui,-apple-system,Segoe UI,sans-serif"';
    return `<text x="${num(x)}" y="${num(y)}" ${quotes} font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(value)}</text>`;
  }

  function line(x1, y1, x2, y2, options = {}) {
    const dash = options.dash ? ` stroke-dasharray="${options.dash}"` : '';
    return `<line x1="${num(x1)}" y1="${num(y1)}" x2="${num(x2)}" y2="${num(y2)}" stroke="${options.stroke || '#1b2f49'}" stroke-width="${options.width || 1.6}"${dash} stroke-linecap="round"/>`;
  }

  function rect(x, y, w, h, options = {}) {
    return `<rect x="${num(x)}" y="${num(y)}" width="${num(w)}" height="${num(h)}" fill="${options.fill || '#fff'}" stroke="${options.stroke || '#1b2f49'}" stroke-width="${options.width || 1.4}"${options.rx ? ` rx="${options.rx}"` : ''}/>`;
  }

  function circle(x, y, r, options = {}) {
    return `<circle cx="${num(x)}" cy="${num(y)}" r="${r}" fill="${options.fill || '#7056c9'}" stroke="${options.stroke || '#fff'}" stroke-width="${options.width || 2}"/>`;
  }

  function polygon(points, options = {}) {
    const list = points.map(([x, y]) => `${num(x)},${num(y)}`).join(' ');
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
      + `<polygon points="${num(x2)},${num(y2)} ${num(ax)},${num(ay)} ${num(bx)},${num(by)}" fill="${color}"/>`;
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

  /* ---------- sahneler ---------- */

  const SCENES = {
    /* 1. Tam sayılar: sayı doğrusu + ters sayı */
    'sayi-dogrusu': {
      params: [{ name: 'a', label: 'Sayı (a)', min: -7, max: 7, step: 1, value: 3 }],
      draw(state) {
        const p = plotter([-8, 8, -2.2, 2.2], { x: 40, y: 120, w: W - 80, h: 150 });
        const a = state.a;
        const parts = [grid(p, { labels: true, ylabels: false })];
        parts.push(line(p.px(-7.6), p.py(0), p.px(7.6), p.py(0), { width: 2 }));
        parts.push(`<polygon points="${p.px(7.8)},${p.py(0)} ${p.px(7.35)},${p.py(0) - 6} ${p.px(7.35)},${p.py(0) + 6}" fill="#1b2f49"/>`);
        for (let x = -7; x <= 7; x += 1) {
          parts.push(line(p.px(x), p.py(0) - (x === 0 ? 10 : 6), p.px(x), p.py(0) + (x === 0 ? 10 : 6), { width: x === 0 ? 2.2 : 1.2 }));
          parts.push(text(p.px(x), p.py(0) + 26, String(x), { size: 12, anchor: 'middle', weight: x === 0 ? 800 : 500, fill: x === 0 ? '#1b2f49' : '#6b7a90' }));
        }
        parts.push(note(40, 34, 'Sola gittikçe sayı küçülür, sağa gittikçe büyür.', { fill: '#5b6b80' }));
        parts.push(circle(p.px(a), p.py(0), 7));
        parts.push(text(p.px(a), p.py(0) - 16, `a = ${num(a)}`, { size: 13, anchor: 'middle', weight: 800, fill: '#5b46a8' }));
        parts.push(circle(p.px(-a), p.py(0), 6, { fill: '#2f8a63' }));
        parts.push(text(p.px(-a), p.py(0) - 16, `-a = ${num(-a)}`, { size: 12.5, anchor: 'middle', weight: 700, fill: '#2f8a63' }));
        parts.push(arrow(p.px(0), p.py(-1.1), p.px(a), p.py(-1.1), { stroke: '#7056c9' }));
        parts.push(arrow(p.px(0), p.py(-1.1), p.px(-a), p.py(-1.1), { stroke: '#2f8a63', dash: '3 3' }));
        const relation = a === 0 ? 'a = 0: ne pozitif ne negatif.' : a > 0 ? `${num(a)} > 0 ve ${num(-a)} < 0.` : `${num(a)} < 0 ve ${num(-a)} > 0.`;
        parts.push(note(360, p.py(0) + 78, relation, { fill: '#41506a' }));
        parts.push(note(360, p.py(0) + 98, `Sıfıra uzaklık: |${num(a)}| = ${num(Math.abs(a))}`, { fill: '#41506a' }));
        parts.push(note(40, H - 22, 'Pembe nokta sayıyı, yeşil nokta tersini gösterir; ikisinin toplamı sıfırdır.', { size: 12 }));
        parts.push(`<g data-handle="a" style="cursor:ew-resize">${circle(p.px(a), p.py(0), 16, { fill: 'transparent', stroke: 'none' })}</g>`);
        return parts.join('');
      },
      drag(svg, event, box, state) {
        const p = plotter([-8, 8, -2.2, 2.2], { x: 40, y: 120, w: W - 80, h: 150 });
        const local = localPoint(svg, event);
        const value = Math.round(((local.x - p.box.x) / p.box.w) * 16 - 8);
        state.a = Math.max(-7, Math.min(7, value));
      },
      handles: [{ name: 'a', label: 'a noktasını sürükle' }],
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
        parts.push(text(p.px(a), p.py(0) - 16, `a = ${num(a)}`, { size: 13, anchor: 'middle', weight: 800, fill: '#5b46a8' }));
        const mid = (p.px(a) + p.px(0)) / 2;
        parts.push(line(p.px(a), p.py(-0.9), p.px(0), p.py(-0.9), { stroke: '#2f8a63', width: 2 }));
        parts.push(text(mid, p.py(-0.9) - 8, `|a| = ${num(Math.abs(a))}`, { size: 13, anchor: 'middle', weight: 800, fill: '#2f8a63' }));
        parts.push(note(40, 40, 'Mutlak değer, sayının sıfıra olan uzaklığıdır. Uzaklık negatif olamaz.', { size: 13 }));
        parts.push(panel(40, H - 118, W - 80, 74));
        parts.push(note(58, H - 92, `a = ${num(a)} için |a| = ${num(Math.abs(a))}`, { size: 14, weight: 800, fill: '#33265f' }));
        parts.push(note(58, H - 70, a < 0 ? 'Sayı negatif olduğu hâlde sonuç pozitiftir: uzaklık işaret taşımaz.' : a > 0 ? 'Sayı pozitif olduğunda mutlak değer sayının kendisidir.' : 'Sıfırın mutlak değeri sıfırdır.', { size: 12.5 }));
        return parts.join('');
      },
    },

    /* 3. Kesir şeridi: pay ve payda */
    'kesir-serit': {
      params: [
        { name: 'd', label: 'Payda (kaç eş parça)', min: 2, max: 10, step: 1, value: 4 },
        { name: 'n', label: 'Pay (kaç parça boyandı)', min: 0, max: 10, step: 1, value: 3 },
      ],
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
        parts.push(note(left + 120, top + height + 66, `= ${num(n / d)} (ondalık)  ·  = %${num((n / d) * 100)}`, { size: 13 }));
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
        const p = Math.max(0, state.p);
        const n = Math.max(0, state.n);
        const parts = [];
        parts.push(note(40, 40, 'Bir (+) ve bir (−) pul birbirini götürür; kalan pullar toplamı verir.', { size: 13 }));
        const drawTokens = (count, startY, color, symbol) => Array.from({ length: count }, (_, index) => {
          const x = 70 + index * 62;
          return circle(x, startY, 18, { fill: color })
            + text(x, startY + 6, symbol, { size: 18, anchor: 'middle', weight: 800, fill: '#fff' });
        }).join('');
        parts.push(text(40, 90, `+${p}`, { size: 14, weight: 800, fill: '#2f8a63' }));
        parts.push(drawTokens(p, 130, '#2f8a63', '+'));
        parts.push(text(40, 190, `−${n}`, { size: 14, weight: 800, fill: '#c03744' }));
        parts.push(drawTokens(n, 230, '#c03744', '−'));
        const pairs = Math.min(p, n);
        parts.push(note(40, 286, `${pairs} çift birbirini götürür, ${Math.abs(p - n)} pul kalır.`, { size: 13 }));
        parts.push(panel(40, 300, W - 80, 58));
        const total = p - n;
        parts.push(text(60, 336, `(+${p}) + (−${n}) = ${num(total)}`, { size: 20, weight: 800, fill: '#33265f' }));
        return parts.join('');
      },
    },

    /* 5. Kesirlerde toplama: payda eşitleme */
    'kesir-toplam': {
      params: [
        { name: 'a', label: 'Birinci kesrin payı', min: 0, max: 2, step: 1, value: 1 },
        { name: 'c', label: 'İkinci kesrin payı', min: 0, max: 3, step: 1, value: 1 },
      ],
      draw(state) {
        const a = Math.max(0, Math.min(2, state.a));
        const c = Math.max(0, Math.min(3, state.c));
        const parts = [];
        const bar = (y, total, shaded, label, color) => {
          const left = 150;
          const width = 380;
          const cell = width / total;
          const out = [text(40, y + 22, label, { size: 13, weight: 800, fill: color })];
          for (let index = 0; index < total; index += 1) {
            out.push(rect(left + index * cell, y, cell, 38, { fill: index < shaded ? '#c9bff2' : '#fbfaff', stroke: '#4a3d7a', width: 1.2 }));
          }
          return out.join('');
        };
        parts.push(note(40, 36, 'Paydalar eşit değilken paylar toplanmaz: önce ortak paydaya getirilir.', { size: 13 }));
        parts.push(bar(70, 2, a, `a/2 = ${a}/2`, '#33265f'));
        parts.push(bar(140, 3, c, `c/3 = ${c}/3`, '#33265f'));
        parts.push(bar(230, 6, a * 3 + c * 2, `toplam = ${a * 3 + c * 2}/6`, '#2f8a63'));
        parts.push(text(150, 210, `a = ${a}  ·  c = ${c}`, { size: 12.5, fill: '#6b7a90' }));
        parts.push(panel(40, 292, W - 80, 66));
        const total = a * 3 + c * 2;
        parts.push(text(60, 322, `${a}/2 + ${c}/3 = ${a * 3}/6 + ${c * 2}/6 = ${total}/6`, { size: 18, weight: 800, fill: '#33265f' }));
        parts.push(note(60, 344, total === 6 ? 'Sonuç 1: iki kesir toplamı bir bütün etti.' : `${num(total / 6)} (yaklaşık)`, { size: 12.5 }));
        return parts.join('');
      },
    },

    /* 6. Kesirlerde çarpma: alan modeli */
    'kesir-carpim': {
      params: [
        { name: 'n1', label: 'Birinci kesrin payı', min: 1, max: 4, step: 1, value: 2 },
        { name: 'd1', label: 'Birinci kesrin paydası', min: 2, max: 5, step: 1, value: 3 },
        { name: 'n2', label: 'İkinci kesrin payı', min: 1, max: 4, step: 1, value: 3 },
        { name: 'd2', label: 'İkinci kesrin paydası', min: 2, max: 5, step: 1, value: 4 },
      ],
      draw(state) {
        const n1 = Math.min(state.n1, state.d1);
        const n2 = Math.min(state.n2, state.d2);
        const d1 = state.d1;
        const d2 = state.d2;
        const size = 260;
        const left = 70;
        const top = 70;
        const cw = size / d2;
        const ch = size / d1;
        const parts = [];
        parts.push(note(40, 36, 'Alan modeli: bir kesir yatay, diğeri dikey bölünür; kesişen kareler çarpımı verir.', { size: 12.5 }));
        parts.push(rect(left, top, size, size, { fill: '#fff', stroke: '#1b2f49', width: 1.8 }));
        for (let row = 0; row < d1; row += 1) {
          for (let col = 0; col < d2; col += 1) {
            const inside = row < n1 && col < n2;
            parts.push(rect(left + col * cw, top + row * ch, cw, ch, { fill: inside ? '#c9bff2' : 'none', stroke: '#8a7fb5', width: 1 }));
          }
        }
        parts.push(text(left + (n2 * cw) / 2, top - 10, `${n2}/${d2}`, { size: 13, anchor: 'middle', weight: 800, fill: '#5b46a8' }));
        parts.push(text(left + size + 26, top + (n1 * ch) / 2 + 4, `${n1}/${d1}`, { size: 13, anchor: 'middle', weight: 800, fill: '#2f8a63' }));
        parts.push(text(left + size / 2, top + size + 24, 'satır: birinci kesir · sütun: ikinci kesir', { size: 11.5, anchor: 'middle', fill: '#6b7a90' }));
        parts.push(panel(380, 110, W - 420, 190));
        const product = (n1 * n2) / (d1 * d2);
        parts.push(text(400, 146, 'Çarpım', { size: 12, weight: 800, fill: '#6b7a90' }));
        parts.push(text(400, 186, `${n1}/${d1} × ${n2}/${d2}`, { size: 19, weight: 800, fill: '#33265f' }));
        parts.push(text(400, 222, `= ${n1 * n2}/${d1 * d2}`, { size: 17, weight: 800, fill: '#5b46a8' }));
        parts.push(text(400, 258, `= ${num(product)}`, { size: 15, fill: '#2f8a63' }));
        parts.push(note(400, 282, `${n1 * n2} kare boyandı`, { size: 12 }));
        parts.push(note(40, H - 22, 'Çarpmada payda eşitlenmez: paylar çarpılır, paydalar çarpılır.', { size: 12 }));
        return parts.join('');
      },
    },

    /* 7. İşaret kuralı */
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
        [[a, '#5b46a8', 'a'], [b, '#2f8a63', 'b'], [a + b, '#b8791a', 'a+b']].forEach(([value, color, label]) => {
          const clamped = Math.max(-11, Math.min(11, value));
          parts.push(circle(p.px(clamped), p.py(0), 6.5, { fill: color }));
          parts.push(text(p.px(clamped), p.py(0) - 14, `${label} = ${num(clamped)}`, { size: 11.5, anchor: 'middle', weight: 700, fill: color }));
        });
        parts.push(panel(40, 224, W - 80, 130));
        parts.push(text(60, 258, `a + b = ${num(a)} + ${num(b)} = ${num(a + b)}`, { size: 17, weight: 800, fill: '#33265f' }));
        parts.push(text(60, 292, `a · b = ${num(a)} · ${num(b)} = ${num(a * b)}`, { size: 17, weight: 800, fill: '#33265f' }));
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
        parts.push(text(originX + w + depth * 0.7, originY - hh - depth * 0.35, `derinlik = ${num(b)}`, { size: 11.5, anchor: 'middle', fill: '#41506a' }));
        parts.push(panel(392, 46, 232, 132));
        parts.push(text(410, 76, 'Yüz · ayrıt · köşe', { size: 12.5, weight: 800, fill: '#33265f' }));
        parts.push(note(410, 100, '6 yüz · 12 ayrıt · 8 köşe', { size: 12.5 }));
        parts.push(note(410, 126, `Hacim = ${num(a)}·${num(b)}·${num(h)}`, { size: 12.5, fill: '#5b46a8' }));
        parts.push(note(410, 146, `= ${num(a * b * h)} birimküp`, { size: 12.5, fill: '#5b46a8' }));
        parts.push(note(410, 170, `Yüzey = ${num(2 * (a * b + a * h + b * h))}`, { size: 12.5, fill: '#2f8a63' }));
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
        parts.push(text(x0 + wA / 2, y0 + hH / 2, `ön ${num(a)}×${num(h)}`, { size: 11.5, anchor: 'middle', fill: '#33265f' }));
        parts.push(text(x0 + wA / 2, y0 + hH + hB / 2 + 4, `üst ${num(a)}×${num(b)}`, { size: 11.5, anchor: 'middle', fill: '#33265f' }));
        parts.push(text(x0 + wA / 2, y0 + 2 * hH + hB - 8, `alt ${num(a)}×${num(b)}`, { size: 11.5, anchor: 'middle', fill: '#33265f' }));
        parts.push(text(x0 - hB / 2, y0 + hH / 2, `yan ${num(b)}×${num(h)}`, { size: 10.5, anchor: 'middle', fill: '#33265f' }));
        parts.push(panel(404, 66, 214, 132));
        const surface = 2 * (a * b + a * h + b * h);
        parts.push(text(422, 94, 'Yüzey alanı', { size: 12.5, weight: 800, fill: '#33265f' }));
        parts.push(note(422, 118, '2·(a·b + a·h + b·h)', { size: 12 }));
        parts.push(text(422, 148, `= ${num(surface)}`, { size: 18, weight: 800, fill: '#5b46a8' }));
        parts.push(note(422, 172, 'her yüz çiftinden iki tane', { size: 11.5 }));
        parts.push(note(40, H - 20, 'Kapaksız kutuda üst yüz hesaba katılmaz.', { size: 12 }));
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
        parts.push(text(410, 100, `Taban: ${num(a)} × ${num(b)} = ${num(a * b)}`, { size: 12.5, weight: 700 }));
        parts.push(text(410, 126, `Katman: ${num(h)}`, { size: 12.5, weight: 700 }));
        parts.push(text(410, 156, `Hacim = ${num(a * b * h)}`, { size: 14, weight: 800, fill: '#5b46a8' }));
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
        parts.push(text(366, 100, `Hacim = ${num(s)}³ = ${num(s ** 3)} dm³`, { size: 13.5, weight: 800, fill: '#33265f' }));
        parts.push(text(366, 128, `= ${num(s ** 3)} litre`, { size: 14, weight: 800, fill: '#2f8a63' }));
        parts.push(text(366, 156, `= ${num(s ** 3 * 1000)} cm³`, { size: 12.5, fill: '#5b46a8' }));
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
        parts.push(text(90, 344, `Toplam ${total} · ortalama ${num(total / 3)} · en büyük ile en küçük farkı ${Math.max(...values) - Math.min(...values)}`, { size: 12.5, fill: '#41506a' }));
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
          parts.push(text(p.px(value), p.py(0) - 14 - (index % 2) * 14, String(value), { size: 11.5, anchor: 'middle', weight: 700 }));
        });
        parts.push(line(p.px(mean), p.py(1.6), p.px(mean), p.py(0), { stroke: '#c03744', width: 2, dash: '5 4' }));
        parts.push(text(p.px(mean), p.py(1.85), `ortalama = ${num(mean)}`, { size: 12.5, anchor: 'middle', weight: 800, fill: '#c03744' }));
        const sorted = [...values].sort((x, y) => x - y);
        parts.push(panel(40, 250, W - 80, 100));
        parts.push(text(60, 280, `Ortalama: (${values.join(' + ')}) ÷ 3 = ${num(mean)}`, { size: 13.5, weight: 700 }));
        parts.push(text(60, 306, `Ortanca: ${sorted[1]} · Açıklık: ${sorted[2] - sorted[0]}`, { size: 13.5, weight: 700, fill: '#2f8a63' }));
        parts.push(note(60, 330, 'Uç değerler ortalamayı daha çok etkiler; ortanca daha dayanıklıdır.', { size: 12 }));
        return parts.join('');
      },
    },

    /* 14. Yansıma */
    'yansima': {
      params: [{ name: 'k', label: 'Ayna doğrusu (x = k)', min: -3, max: 3, step: 1, value: 0 }],
      draw(state) {
        const k = state.k;
        const p = plotter([-4, 8, -2, 6], { x: 46, y: 40, w: W - 96, h: H - 110 });
        const A = [2, 1];
        const B = [5, 1];
        const C = [2, 3];
        const mirror = (point) => [2 * k - point[0], point[1]];
        const parts = [grid(p)];
        parts.push(line(p.px(k), p.py(-2), p.px(k), p.py(6), { stroke: '#c03744', width: 2, dash: '7 5' }));
        parts.push(text(p.px(k) + 8, p.py(5.6), `ayna x = ${num(k)}`, { size: 12, weight: 800, fill: '#c03744' }));
        parts.push(polygon([A, B, C].map(([x, y]) => [p.px(x), p.py(y)]), { fill: '#c9bff2' }));
        parts.push(polygon([mirror(A), mirror(B), mirror(C)].map(([x, y]) => [p.px(x), p.py(y)]), { fill: '#d7f0e3', stroke: '#2f8a63', dash: '5 4' }));
        [['A', A], ['B', B], ['C', C]].forEach(([label, point]) => {
          parts.push(circle(p.px(point[0]), p.py(point[1]), 5, { fill: '#5b46a8' }));
          parts.push(text(p.px(point[0]) - 10, p.py(point[1]) - 8, label, { size: 12, weight: 800, fill: '#5b46a8' }));
          const image = mirror(point);
          parts.push(circle(p.px(image[0]), p.py(image[1]), 5, { fill: '#2f8a63' }));
          parts.push(text(p.px(image[0]) + 8, p.py(image[1]) - 8, `${label}'`, { size: 12, weight: 800, fill: '#2f8a63' }));
          parts.push(line(p.px(point[0]), p.py(point[1]), p.px(image[0]), p.py(image[1]), { stroke: '#8a7fb5', width: 1, dash: '3 3' }));
        });
        parts.push(note(46, H - 42, 'Her köşe aynaya dik taşınır: uzaklık eşit kalır, kenar uzunlukları korunur, yönelim ters döner.', { size: 12 }));
        parts.push(note(46, H - 22, `A(${num(A[0])}, ${num(A[1])}) → A'(${num(mirror(A)[0])}, ${num(mirror(A)[1])})`, { size: 12.5, weight: 700, fill: '#33265f' }));
        return parts.join('');
      },
      drag(svg, event, box, state) {
        const p = plotter([-4, 8, -2, 6], { x: 46, y: 40, w: W - 96, h: H - 110 });
        const local = localPoint(svg, event);
        state.k = Math.max(-3, Math.min(3, Math.round(((local.x - p.box.x) / p.box.w) * 12 - 4)));
      },
      handles: [{ name: 'k', label: 'ayna doğrusunu sürükle' }],
    },

    /* 15. Orta dikme */
    'ortadikme': {
      params: [
        { name: 'ax', label: 'A noktası (x)', min: 0, max: 4, step: 1, value: 1 },
        { name: 'by', label: 'B noktası (y)', min: 1, max: 5, step: 1, value: 3 },
      ],
      draw(state) {
        const p = plotter([-2, 9, -1, 8], { x: 46, y: 40, w: W - 96, h: H - 110 });
        const A = [state.ax, 1];
        const B = [5, state.by];
        const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
        const dx = B[0] - A[0];
        const dy = B[1] - A[1];
        const length = Math.hypot(dx, dy) || 1;
        const normal = [-dy / length, dx / length];
        const far = 4.6;
        const parts = [grid(p)];
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
        parts.push(note(46, H - 44, 'Orta dikme, uçlara eşit uzaklıktaki noktaların yeridir.', { size: 12.5 }));
        parts.push(note(46, H - 22, `|PA| = ${num(dA)}   ·   |PB| = ${num(dB)}   → eşit`, { size: 12.5, weight: 700, fill: '#2f8a63' }));
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
          return `<path d="M ${num(sx)} ${num(sy)} A ${radius} ${radius} 0 ${large} 0 ${num(ex)} ${num(ey)}" fill="none" stroke="#41506a" stroke-width="1.4"/>`;
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

  function mount(host, controls, spec) {
    if (!host || !spec || !SCENES[spec.type]) return null;
    const scene = SCENES[spec.type];
    const params = (spec.params && spec.params.length ? spec.params : scene.params) || [];
    uid += 1;
    const scope = `s${uid}`;
    const state = {};
    params.forEach((param) => { state[param.name] = Number(param.value); });

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('class', 'math-scene-svg');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', spec.title || 'Etkileşimli matematik sahnesi');
    host.innerHTML = '';
    host.appendChild(svg);

    function paint() {
      try {
        svg.innerHTML = scene.draw(state);
      } catch (error) {
        svg.innerHTML = `<text x="20" y="40" font-size="14" fill="#b42318">Sahne çizilemedi.</text>`;
      }
      const handle = svg.querySelector('[data-handle]');
      if (handle && scene.drag) {
        handle.addEventListener('pointerdown', (downEvent) => {
          downEvent.preventDefault();
          const move = (moveEvent) => {
            scene.drag(svg, moveEvent, null, state);
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
        input.addEventListener('input', () => {
          state[input.dataset.sceneParam] = Number(input.value);
          paint();
          syncControls();
        });
      });
    }

    paint();
    return {
      state,
      reset() {
        params.forEach((param) => { state[param.name] = Number(param.value); });
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

  /* Türün varsayılan sürgü tanımları (denetim ve belge için). */
  function params(type) {
    const scene = SCENES[type];
    if (!scene || !scene.params) return [];
    return scene.params.map((param) => ({ ...param }));
  }

  window.MATEMATIK_SAHNE2 = Object.freeze({ mount, types, params, width: W, height: H });
})();
