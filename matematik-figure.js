/* Matematik şekilleri — bağımlılıksız, çevrimdışı SVG.
   Her şekil 340×190 tuvaline sığacak biçimde çizilir; etiketler kutuya göre ölçülür.
   Geometri gerçek oranlarla kurulur (yansıma gerçek ayna simetrisi, prizma tutarlı izometri). */
(() => {
  'use strict';

  const INK = '#1b2f49';
  const MUTED = '#5b6b80';
  const ACCENT = '#7056c9';
  const SOFT = '#e6dffb';
  const GREEN = '#2f8a63';
  const GOLD = '#b8791a';
  const FONT = 'font-family="system-ui,-apple-system,Segoe UI,sans-serif"';

  let counter = 0;
  const nextId = () => { counter += 1; return `mf${counter}`; };

  const esc = (value) => String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  /* Metni kutuya sığdırır: gerekirse punto küçülür, sonra kısaltılır. */
  function fitText(value, maxWidth, size) {
    const text = String(value == null ? '' : value);
    let current = size;
    while (current > 8 && text.length * current * 0.53 > maxWidth) current -= 0.5;
    const maxChars = Math.floor(maxWidth / (current * 0.53));
    return { text: text.length > maxChars ? `${text.slice(0, Math.max(4, maxChars - 1))}…` : text, size: current };
  }

  function txt(x, y, value, options = {}) {
    const size = options.size || 12;
    const limit = options.maxWidth || 320;
    const fitted = fitText(value, limit, size);
    const anchor = options.anchor || 'start';
    return `<text x="${x}" y="${y}" ${FONT} font-size="${fitted.size}" font-weight="${options.weight || 500}" fill="${options.fill || INK}" text-anchor="${anchor}">${esc(fitted.text)}</text>`;
  }

  function line(x1, y1, x2, y2, options = {}) {
    const dash = options.dash ? ` stroke-dasharray="${options.dash}"` : '';
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${options.stroke || INK}" stroke-width="${options.width || 1.5}"${dash} stroke-linecap="round"/>`;
  }

  function rect(x, y, w, h, options = {}) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${options.fill || '#fff'}" stroke="${options.stroke || INK}" stroke-width="${options.width || 1.3}"${options.rx ? ` rx="${options.rx}"` : ''}/>`;
  }

  function circle(x, y, r, options = {}) {
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${options.fill || ACCENT}" stroke="${options.stroke || '#fff'}" stroke-width="${options.width || 2}"/>`;
  }

  function poly(points, options = {}) {
    const list = points.map(([x, y]) => `${Math.round(x * 10) / 10},${Math.round(y * 10) / 10}`).join(' ');
    return `<polygon points="${list}" fill="${options.fill || 'none'}" stroke="${options.stroke || INK}" stroke-width="${options.width || 1.4}"${options.dash ? ` stroke-dasharray="${options.dash}"` : ''}/>`;
  }

  function arrowLine(id, x1, y1, x2, y2, color = ACCENT) {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const size = 6.5;
    const ax = x2 - size * Math.cos(angle - 0.45);
    const ay = y2 - size * Math.sin(angle - 0.45);
    const bx = x2 - size * Math.cos(angle + 0.45);
    const by = y2 - size * Math.sin(angle + 0.45);
    return `${line(x1, y1, x2, y2, { stroke: color, width: 1.3, dash: '4 3' })}`
      + `<polygon points="${x2},${y2} ${ax.toFixed(1)},${ay.toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)}" fill="${color}" marker-end="url(#${id})"/>`;
  }

  function frame(parts, title, viewBox = '0 0 340 190') {
    const id = nextId();
    return `<svg class="math-figure" viewBox="${viewBox}" role="img" aria-label="${esc(title)}" xmlns="http://www.w3.org/2000/svg">`
      + `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${ACCENT}"/></marker></defs>`
      + parts + '</svg>';
  }

  /* --- 1. Etiketli kesir: PAY üstte, PAYDA altta --- */
  function fractionLabels(options = {}) {
    const num = options.num == null ? 3 : options.num;
    const den = options.den == null ? 4 : options.den;
    const mark = options.mark || 'all';
    const parts = [
      rect(18, 20, 118, 150, { fill: '#fbfaff', stroke: '#e3dffb', rx: 12 }),
      `<text x="77" y="82" ${FONT} font-size="34" font-weight="700" fill="${INK}" text-anchor="middle">${num}</text>`,
      line(45, 94, 109, 94, { width: 2.4 }),
      `<text x="77" y="136" ${FONT} font-size="34" font-weight="700" fill="${INK}" text-anchor="middle">${den}</text>`,
    ];
    if (mark === 'all' || mark === 'num') {
      parts.push(arrowLine(nextId(), 96, 68, 150, 56));
      parts.push(txt(156, 50, 'PAY', { weight: 800, fill: ACCENT, size: 12.5 }));
      parts.push(txt(156, 66, 'üstteki sayı: kaç parça alındı', { size: 10.5, fill: MUTED, maxWidth: 175 }));
    }
    if (mark === 'all' || mark === 'den') {
      parts.push(arrowLine(nextId(), 96, 124, 150, 136));
      parts.push(txt(156, 132, 'PAYDA', { weight: 800, fill: ACCENT, size: 12.5 }));
      parts.push(txt(156, 148, 'alttaki sayı: kaç eş parça var', { size: 10.5, fill: MUTED, maxWidth: 175 }));
    }
    if (mark === 'line') {
      parts.push(arrowLine(nextId(), 120, 94, 150, 92));
      parts.push(txt(156, 88, 'KESİR ÇİZGİSİ', { weight: 800, fill: ACCENT, size: 12.5, maxWidth: 175 }));
      parts.push(txt(156, 104, 'bölme anlamı taşır', { size: 10.5, fill: MUTED }));
    }
    parts.push(txt(156, 174, 'Kesir çizgisi “böl” demektir.', { size: 11, fill: GREEN }));
    return frame(parts.join(''), `Kesir ${num} bölü ${den}: pay ve payda etiketli`);
  }

  /* --- 2. Kesir şeridi --- */
  function fractionBar(options = {}) {
    const total = options.total || 4;
    const shaded = options.shaded == null ? 3 : options.shaded;
    const left = 24;
    const width = 292;
    const cell = width / total;
    const parts = [];
    for (let index = 0; index < total; index += 1) {
      parts.push(rect(left + index * cell, 62, cell, 46, { fill: index < shaded ? '#c9bff2' : '#fbfaff' }));
      parts.push(txt(left + index * cell + cell / 2, 90, String(index + 1), { size: 10, anchor: 'middle', fill: MUTED }));
    }
    parts.push(txt(left, 48, `${shaded} parça boyandı`, { weight: 700, size: 12.5 }));
    parts.push(txt(left, 132, `Bütün ${total} eş parçaya ayrıldı → payda = ${total}`, { size: 11.5, maxWidth: 300 }));
    parts.push(txt(left, 152, `Boyanan parça sayısı → pay = ${shaded}`, { size: 11.5, maxWidth: 300 }));
    parts.push(txt(left, 176, `Kesir: ${shaded}/${total}`, { size: 13, weight: 800, fill: ACCENT }));
    return frame(parts.join(''), `Bir bütünün ${total} eş parçasından ${shaded} tanesi boyalı`);
  }

  /* --- 3. Sayı doğrusu --- */
  function numberLine(options = {}) {
    const from = options.from == null ? -6 : options.from;
    const to = options.to == null ? 6 : options.to;
    const mark = options.mark == null ? -3 : options.mark;
    const left = 26;
    const width = 288;
    const axisY = 96;
    const px = (value) => left + ((value - from) / (to - from)) * width;
    const parts = [line(left - 6, axisY, left + width + 6, axisY, { width: 1.8 })];
    parts.push(`<polygon points="${left + width + 12},${axisY} ${left + width + 2},${axisY - 5} ${left + width + 2},${axisY + 5}" fill="${INK}"/>`);
    for (let value = from; value <= to; value += 1) {
      const zero = value === 0;
      parts.push(line(px(value), axisY - (zero ? 8 : 5), px(value), axisY + (zero ? 8 : 5), { width: zero ? 2 : 1 }));
      if ((to - from) <= 12 || value % 2 === 0) {
        parts.push(txt(px(value), axisY + 24, String(value), { size: 10, anchor: 'middle', fill: zero ? INK : MUTED, weight: zero ? 800 : 500 }));
      }
    }
    parts.push(txt(left, 34, 'sola: küçülür', { size: 11, fill: GOLD }));
    parts.push(txt(left + width, 34, 'sağa: büyür', { size: 11, fill: GREEN, anchor: 'end' }));
    parts.push(circle(px(mark), axisY, 5.5));
    parts.push(txt(px(mark), axisY - 14, String(mark), { size: 12, anchor: 'middle', weight: 800, fill: ACCENT }));
    parts.push(txt(left, 158, 'Sıfır ne pozitif ne negatiftir: başlangıç noktasıdır.', { size: 11, maxWidth: 300 }));
    return frame(parts.join(''), 'Tam sayılar sayı doğrusunda');
  }

  /* --- 4. Dikdörtgenler prizması (tutarlı izometri) --- */
  function prism(options = {}) {
    const A = Math.max(1, Number(options.a) || 5);
    const B = Math.max(1, Number(options.b) || 3);
    const C = Math.max(1, Number(options.c) || 2);
    const scale = Math.min(112 / A, 66 / B, 34 / C);
    const w = A * scale;
    const h = B * scale;
    const d = C * scale;
    const x0 = 46;
    const y0 = 140;
    const dx = d * 0.72;
    const dy = d * 0.55;
    const front = [[x0, y0], [x0 + w, y0], [x0 + w, y0 - h], [x0, y0 - h]];
    const top = [[x0, y0 - h], [x0 + w, y0 - h], [x0 + w + dx, y0 - h - dy], [x0 + dx, y0 - h - dy]];
    const side = [[x0 + w, y0], [x0 + w + dx, y0 - dy], [x0 + w + dx, y0 - h - dy], [x0 + w, y0 - h]];
    const parts = [
      poly(top, { fill: '#e2d9fb' }),
      poly(side, { fill: '#f2eefe' }),
      poly(front, { fill: SOFT }),
      line(x0, y0, x0 + dx, y0 - dy, { stroke: '#a99ec9', dash: '4 3', width: 1 }),
      line(x0 + dx, y0 - dy, x0 + dx, y0 - h - dy, { stroke: '#a99ec9', dash: '4 3', width: 1 }),
      line(x0 + dx, y0 - dy, x0 + w + dx, y0 - dy, { stroke: '#a99ec9', dash: '4 3', width: 1 }),
      txt(x0 + w / 2, y0 + 18, `${A} br`, { size: 10.5, anchor: 'middle', fill: MUTED }),
      txt(x0 + w + dx + 6, y0 - h / 2 + 4, `${B} br`, { size: 10.5, fill: MUTED, maxWidth: 60 }),
      txt(x0 + w / 2 + dx, y0 - h - dy - 8, `${C} br`, { size: 10.5, anchor: 'middle', fill: MUTED }),
      txt(16, 24, `Hacim ${A * B * C} br³ · Yüzey ${2 * (A * B + A * C + B * C)} br²`, { size: 11, weight: 700, maxWidth: 300 }),
    ];
    return frame(parts.join(''), `Dikdörtgenler prizması ${A} × ${B} × ${C}`);
  }

  /* --- 5. Hacim: katmanlı birim küpler --- */
  function volumeCubes(options = {}) {
    const cols = options.cols || 3;
    const rows = options.rows || 2;
    const layers = options.layers || 2;
    const size = Math.min(30, 190 / Math.max(cols + rows * 0.5, layers + rows * 0.4));
    const parts = [];
    for (let layer = layers - 1; layer >= 0; layer -= 1) {
      for (let row = rows - 1; row >= 0; row -= 1) {
        for (let col = 0; col < cols; col += 1) {
          const x = 70 + col * size + row * size * 0.34;
          const y = 150 - row * size * 0.26 - layer * size;
          parts.push(poly([[x, y - size], [x + size, y - size], [x + size + size * 0.34, y - size - size * 0.26], [x + size * 0.34, y - size - size * 0.26]], { fill: '#efeafd', width: 0.9 }));
          parts.push(rect(x, y - size, size, size, { fill: layer === 0 ? '#c9bff2' : '#ded5fb', width: 0.9 }));
        }
      }
    }
    parts.push(txt(16, 24, `${cols} × ${rows} × ${layers} birim küp`, { size: 12, weight: 700, maxWidth: 200 }));
    parts.push(txt(16, 176, `Hacim = ${cols * rows * layers} birimküp · her katman ${cols * rows} küp`, { size: 11, fill: ACCENT, maxWidth: 310 }));
    return frame(parts.join(''), 'Birim küplerle hacim');
  }

  /* --- 6. Yansıma: gerçek ayna simetrisi --- */
  function reflection(options = {}) {
    const axisX = 170;
    const triangle = [[100, 150], [150, 150], [100, 96]];
    const mirrored = triangle.map(([x, y]) => [2 * axisX - x, y]);
    const parts = [
      line(axisX, 30, axisX, 168, { stroke: ACCENT, width: 1.8, dash: '7 5' }),
      poly(triangle, { fill: SOFT }),
      poly(mirrored, { fill: '#dcf2e8', stroke: GREEN, dash: '5 3' }),
      txt(axisX + 6, 24, 'ayna doğrusu', { size: 10.5, fill: ACCENT, weight: 700 }),
      txt(100, 164, 'şekil', { size: 10.5, fill: MUTED }),
      txt(246, 164, 'görüntü', { size: 10.5, fill: GREEN }),
      txt(150, 174, '', { size: 10 }),
      txt(16, 186, 'Uzaklıklar eşit; kenar ve açılar korunur, yönelim ters döner.', { size: 10.5, maxWidth: 310 }),
    ];
    triangle.forEach(([x, y], index) => {
      parts.push(line(x, y, 2 * axisX - x, y, { stroke: '#a99ec9', width: 0.9, dash: '3 3' }));
      parts.push(circle(x, y, 3.4));
      parts.push(circle(2 * axisX - x, y, 3.4, { fill: GREEN }));
      parts.push(txt(x - 9, y - 5, ['A', 'B', 'C'][index], { size: 10, weight: 700, fill: ACCENT }));
      parts.push(txt(2 * axisX - x + 5, y - 5, `${['A', 'B', 'C'][index]}′`, { size: 10, weight: 700, fill: GREEN }));
    });
    return frame(parts.join(''), 'Ayna doğrusuna göre yansıma; görüntü gerçek simetriktir');
  }

  /* --- 7. Orta dikme --- */
  function bisector() {
    const A = [60, 148];
    const B = [270, 74];
    const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    const nx = -(B[1] - A[1]);
    const ny = B[0] - A[0];
    const len = Math.hypot(nx, ny);
    const unit = [nx / len, ny / len];
    const parts = [
      line(A[0], A[1], B[0], B[1], { width: 1.8 }),
      line(mid[0] - unit[0] * 70, mid[1] - unit[1] * 70, mid[0] + unit[0] * 70, mid[1] + unit[1] * 70, { stroke: '#c03744', width: 1.8, dash: '7 5' }),
      circle(A[0], A[1], 4), circle(B[0], B[1], 4), circle(mid[0], mid[1], 4, { fill: '#c03744' }),
      txt(A[0] - 14, A[1] + 4, 'A', { size: 11, weight: 700 }),
      txt(B[0] + 8, B[1] + 4, 'B', { size: 11, weight: 700 }),
      txt(mid[0] + 8, mid[1] + 14, 'M', { size: 11, weight: 700, fill: '#c03744' }),
      txt(mid[0] + unit[0] * 74, mid[1] + unit[1] * 74 - 4, 'orta dikme', { size: 10.5, weight: 700, fill: '#c03744', maxWidth: 100 }),
      txt(16, 184, 'Orta dikme üzerindeki her nokta A ve B’ye eşit uzaklıktadır.', { size: 10.5, maxWidth: 312 }),
    ];
    return frame(parts.join(''), 'AB doğru parçası ve orta dikmesi');
  }

  /* --- 8. Açıortay --- */
  function angleBisector() {
    const cx = 66;
    const cy = 158;
    const angle = 62;
    const rad = (angle * Math.PI) / 180;
    const r = Math.min(190, (cy - 34) / Math.sin(rad), (300 - cx) / Math.cos(rad));
    const B = [cx + r * Math.cos(rad), cy - r * Math.sin(rad)];
    const half = rad / 2;
    const M = [cx + r * Math.cos(half), cy - r * Math.sin(half)];
    const arcPath = (radius, a1, a2) => {
      const p1 = [cx + radius, cy];
      const p2 = [cx + radius * Math.cos(a2), cy - radius * Math.sin(a2)];
      return `<path d="M ${p1[0]} ${p1[1]} A ${radius} ${radius} 0 0 0 ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}" fill="none" stroke="${MUTED}" stroke-width="1.3"/>`;
    };
    const parts = [
      line(cx, cy, cx + r + 10, cy, { width: 1.8 }),
      line(cx, cy, B[0], B[1], { width: 1.8 }),
      line(cx, cy, M[0], M[1], { stroke: '#c03744', width: 1.8, dash: '7 5' }),
      circle(cx, cy, 4.5, { fill: INK }),
      arcPath(Math.min(88, r - 12), 0, rad),
      arcPath(Math.min(62, r - 34), 0, half),
      arcPath(Math.min(62, r - 34), half, rad),
      txt(M[0] + 6, M[1] + 4, 'açıortay', { size: 10.5, weight: 700, fill: '#c03744' }),
      txt(cx + (Math.min(88, r - 12) + 20) * Math.cos(half / 2), cy - (Math.min(88, r - 12) + 20) * Math.sin(half / 2) - 4, 'eş açı', { size: 10.5, fill: MUTED }),
      txt(cx + (Math.min(88, r - 12) + 20) * Math.cos(half + half / 2), cy - (Math.min(88, r - 12) + 20) * Math.sin(half + half / 2) - 4, 'eş açı', { size: 10.5, fill: MUTED }),
      txt(16, 186, 'Açıortay açıyı iki eş açıya böler; kollara uzaklık eşittir.', { size: 10.5, maxWidth: 312 }),
    ];
    return frame(parts.join(''), 'Bir açı ve açıortayı');
  }

  /* --- 9. Sütun grafiği --- */
  function barChart(options = {}) {
    const values = (options.values || [5, 3, 6]).slice(0, 6);
    const names = options.names || values.map((_, index) => `${index + 1}`);
    const base = 156;
    const max = Math.max(...values, 1);
    const available = 258;
    const gap = values.length > 3 ? 10 : 22;
    const slot = Math.min(46, available / values.length - gap);
    const parts = [
      line(40, base, 320, base, { width: 1.5 }),
      line(40, 28, 40, base, { width: 1.5 }),
      txt(44, 24, 'sıklık', { size: 10, fill: MUTED }),
    ];
    values.forEach((value, index) => {
      const height = (value / max) * 104;
      const x = 56 + index * (slot + gap);
      parts.push(rect(x, base - height, slot, height, { fill: '#c9bff2' }));
      parts.push(txt(x + slot / 2, base - height - 5, String(value), { size: 10, anchor: 'middle', weight: 700 }));
      parts.push(txt(x + slot / 2, base + 15, String(names[index] || ''), { size: 9.5, anchor: 'middle', fill: MUTED, maxWidth: slot + 16 }));
    });
    parts.push(txt(16, 184, 'Dikey eksen sıfırdan başlar; sütun yükseklikleri doğrudan karşılaştırılabilir.', { size: 10.5, maxWidth: 312 }));
    return frame(parts.join(''), 'Sütun grafiği: sıklıklar');
  }

  /* --- 10. Kesir çarpımı: alan modeli --- */
  function fractionProduct() {
    const rows = 3;
    const cols = 4;
    const cell = 42;
    const left = 60;
    const top = 52;
    const parts = [
      txt(16, 26, '2/3 × 3/4 alan modeli', { size: 12, weight: 700, maxWidth: 300 }),
    ];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const inside = row < 2 && col < 3;
        parts.push(rect(left + col * cell, top + row * cell, cell, cell, { fill: inside ? '#c9bff2' : '#fbfaff', width: 1 }));
      }
    }
    parts.push(txt(left + 3 * cell / 2, top - 8, '3/4', { size: 10.5, anchor: 'middle', weight: 700, fill: ACCENT }));
    parts.push(txt(left - 10, top + 2 * cell + 4, '2/3', { size: 10.5, anchor: 'end', weight: 700, fill: GREEN }));
    parts.push(txt(16, 184, 'Satır 3’e, sütun 4’e bölünmüş; kesişen 6 kare boyanır.', { size: 10.5, maxWidth: 312 }));
    return frame(parts.join(''), 'Kesirlerde çarpmanın alan modeli');
  }

  const BUILDERS = {
    'pay-payda': fractionLabels,
    'kesir-serit': fractionBar,
    'sayi-dogrusu': numberLine,
    prizma: prism,
    hacim: volumeCubes,
    yansima: reflection,
    ortadikme: bisector,
    aciortay: angleBisector,
    'sutun-grafik': barChart,
    'kesir-carpim': fractionProduct,
  };

  function render(type, options = {}) {
    const builder = BUILDERS[type];
    if (!builder) return '';
    try {
      return builder(options || {});
    } catch (error) {
      return '';
    }
  }

  function types() {
    return Object.keys(BUILDERS);
  }

  window.MATEMATIK_FIGURE = Object.freeze({ render, types });
})();
