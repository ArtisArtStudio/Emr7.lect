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

  /* Metni kutuya sığdırır. Punto 11'in altına inmez: okunmayan küçük yazı yerine
     metin kısalır. Şekillerdeki etiketler bu yüzden kısa tutulur. */
  const MIN_POINT = 11;
  function fitText(value, maxWidth, size) {
    const text = String(value == null ? '' : value);
    let current = size;
    while (current > MIN_POINT && text.length * current * 0.53 > maxWidth) current -= 0.5;
    current = Math.max(MIN_POINT, Math.round(current * 100) / 100);
    const maxChars = Math.floor(maxWidth / (current * 0.53));
    return { text: text.length > maxChars ? `${text.slice(0, Math.max(4, maxChars - 1))}…` : text, size: current };
  }

  function txt(x, y, value, options = {}) {
    /* Şekil yazısı taban olarak okunaklı: 10–11 punto yerine 12–13 punto. */
    const size = (options.size || 12) * 1.12;
    const limit = options.maxWidth || 322;
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
    parts.push(txt(150, 174, 'Kesir çizgisi “böl” demek.', { size: 11, fill: GREEN, maxWidth: 176 }));
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
    parts.push(txt(left, 158, 'Sıfırın işareti yoktur; başlangıç noktasıdır.', { size: 11, maxWidth: 300 }));
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

  /* --- 5. Hacim: katmanlı birim küpler (arkadan öne, binmeyen izometri) --- */
  function volumeCubes(options = {}) {
    const cols = Math.max(1, Number(options.cols) || 3);
    const rows = Math.max(1, Number(options.rows) || 2);
    const layers = Math.max(1, Number(options.layers) || 2);
    const u = Math.min(28, 210 / (cols + rows * 0.55), 118 / (layers + rows * 0.42));
    const du = u * 0.5;
    const dv = u * 0.36;
    const totalW = cols * u + rows * du;
    const totalH = layers * u + rows * dv;
    const x0 = 24 + Math.max(0, (250 - totalW) / 2);
    const y0 = 60 + totalH;
    const parts = [];
    for (let layer = 0; layer < layers; layer += 1) {
      for (let row = rows - 1; row >= 0; row -= 1) {
        for (let col = 0; col < cols; col += 1) {
          const x = x0 + col * u + row * du;
          const y = y0 - row * dv - layer * u;
          const front = layer % 2 === 0 ? '#c9bff2' : '#ded5fb';
          parts.push(poly([[x, y - u], [x + u, y - u], [x + u + du, y - u - dv], [x + du, y - u - dv]], { fill: '#efeafd', width: 0.8 }));
          parts.push(poly([[x + u, y], [x + u + du, y - dv], [x + u + du, y - u - dv], [x + u, y - u]], { fill: '#e4dcfa', width: 0.8 }));
          parts.push(rect(x, y - u, u, u, { fill: front, width: 0.8 }));
        }
      }
    }
    parts.push(txt(16, 24, `${cols} × ${rows} × ${layers} birim küp`, { size: 12, weight: 700, maxWidth: 200 }));
    parts.push(txt(16, 178, `Her katman ${cols * rows} küp; katman sayısı ${layers}.`, { size: 11, fill: ACCENT, maxWidth: 310 }));
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
      txt(16, 186, 'Uzaklıklar eşit; yönelim ters döner.', { size: 10.5, maxWidth: 310 }),
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
      txt(mid[0] + 8, mid[1] - 66, 'orta dikme', { size: 10.5, weight: 700, fill: '#c03744', maxWidth: 100 }),
      txt(16, 184, 'Her nokta A ve B’ye eşit uzaklıkta.', { size: 10.5, maxWidth: 312 }),
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
      txt(16, 186, 'Açıortay, açıyı iki eş açıya böler.', { size: 10.5, maxWidth: 312 }),
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
    parts.push(txt(16, 184, 'Eksen sıfırdan başlar; yükseklik doğrudan okunur.', { size: 10.5, maxWidth: 312 }));
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

  /* --- 11. Sayı kümeleri: doğal sayılar ⊂ tam sayılar --- */
  function numberSets() {
    const parts = [
      txt(16, 26, 'Doğal sayılar: 0, 1, 2, 3, …', { size: 12, weight: 700, fill: GREEN }),
      rect(16, 34, 308, 26, { fill: '#eefaf3', stroke: '#b9e0cc', rx: 8 }),
      txt(28, 52, '0, 1, 2, 3, 4, …', { size: 12, fill: INK }),
      txt(16, 78, 'Tam sayılar: doğal sayılar + negatifler', { size: 12, weight: 700, fill: ACCENT }),
      rect(16, 86, 308, 30, { fill: SOFT, stroke: '#cfc5f2', rx: 8 }),
      txt(28, 106, '…, −2, −1, 0, 1, 2, …', { size: 12.5, weight: 700, fill: INK }),
      txt(30, 136, 'Negatifler', { size: 10.5, anchor: 'start', fill: GREEN }),
      txt(150, 136, 'Sıfır', { size: 10.5, anchor: 'middle', fill: MUTED }),
      txt(232, 136, 'Pozitifler', { size: 10.5, anchor: 'start', fill: ACCENT }),
      line(16, 142, 300, 142, { stroke: '#d8d2ee', width: 1 }),
    ];
    parts.push(txt(16, 168, 'Sıfırın işareti yoktur; sayı doğrusunun başlangıcıdır.', { size: 11, fill: MUTED }));
    return frame(parts.join(''), 'Doğal sayılar tam sayıların içindedir');
  }

  /* --- 12. Ters (zıt) sayı: sıfıra göre simetri --- */
  function oppositeNumbers() {
    const y = 92;
    const cx = 170;
    const half = 96;
    const parts = [
      txt(16, 26, 'Ters sayılar sıfıra göre simetriktir.', { size: 12, weight: 700 }),
      line(28, y, 312, y, { width: 1.8 }),
      line(cx, y - 10, cx, y + 10, { width: 2 }),
      txt(cx, y + 26, '0', { size: 11, anchor: 'middle', weight: 800 }),
      circle(cx - half, y, 6, { fill: GREEN }),
      circle(cx + half, y, 6, { fill: ACCENT }),
      txt(cx - half, y - 16, '−3', { size: 13, anchor: 'middle', weight: 800, fill: GREEN }),
      txt(cx + half, y - 16, '+3', { size: 13, anchor: 'middle', weight: 800, fill: ACCENT }),
      line(cx - half, y + 40, cx, y + 40, { stroke: GREEN, width: 1.4, dash: '4 3' }),
      line(cx, y + 40, cx + half, y + 40, { stroke: ACCENT, width: 1.4, dash: '4 3' }),
      txt(cx, y + 56, 'uzaklık 3 birim · uzaklık 3 birim', { size: 11, anchor: 'middle', fill: MUTED }),
      txt(16, 172, '(−3) + (+3) = 0: ters sayıların toplamı sıfırdır.', { size: 11, weight: 700, fill: ACCENT }),
    ];
    return frame(parts.join(''), 'Ters sayı çifti −3 ve +3');
  }

  /* --- 13. Mutlak değer: sıfıra uzaklık --- */
  function absoluteValue() {
    const y = 96;
    const left = 30;
    const px = (value) => left + ((value + 6) / 12) * 280;
    const parts = [txt(16, 26, 'Mutlak değer = sıfıra uzaklık', { size: 12, weight: 700 })];
    parts.push(line(left, y, left + 284, y, { width: 1.8 }));
    for (let value = -6; value <= 6; value += 1) {
      parts.push(line(px(value), y - 5, px(value), y + 5, { width: value === 0 ? 2 : 1 }));
      parts.push(txt(px(value), y + 22, String(value), { size: 9.5, anchor: 'middle', fill: MUTED }));
    }
    parts.push(circle(px(-4), y, 6, { fill: GREEN }));
    parts.push(txt(px(-4), y - 16, '−4', { size: 12, anchor: 'middle', weight: 800, fill: GREEN }));
    parts.push(line(px(-4), y + 38, px(0), y + 38, { stroke: GREEN, width: 1.6, dash: '5 3' }));
    parts.push(line(px(-4), y + 33, px(-4), y + 43, { width: 1.4 }));
    parts.push(line(px(0), y + 33, px(0), y + 43, { width: 1.4 }));
    parts.push(txt((px(-4) + px(0)) / 2, y + 56, '|−4| = 4', { size: 12, anchor: 'middle', weight: 800, fill: GREEN }));
    parts.push(txt(16, 172, 'Uzaklık negatif olamaz: |−4| = |4| = 4.', { size: 10.5, fill: MUTED }));
    return frame(parts.join(''), 'Sayı doğrusunda −4 sayısının sıfıra uzaklığı 4');
  }

  /* --- 14. Payda: bütün eş parçalara ayrılıyor --- */
  function wholeParts() {
    const parts = [txt(16, 26, 'Bütün 4 eş parçaya ayrılıyor → payda 4', { size: 11.5, weight: 700, fill: GREEN })];
    for (let index = 0; index < 4; index += 1) {
      parts.push(rect(24 + index * 72, 44, 72, 46, { fill: '#f2f8f5', stroke: GREEN, width: 1.3 }));
      parts.push(txt(60 + index * 72, 74, String(index + 1), { size: 11, anchor: 'middle', fill: MUTED }));
    }
    parts.push(txt(24, 116, 'Parçalar eşit: her biri bütünün 1/4’ü.', { size: 11, fill: INK }));
    parts.push(txt(24, 140, 'Kaç eş parça olduğunu payda söyler.', { size: 11, fill: GREEN, weight: 700 }));
    parts.push(txt(24, 166, 'Pay: alınan parça sayısı.', { size: 11, fill: MUTED }));
    return frame(parts.join(''), 'Bir bütünün dört eş parçaya ayrılması');
  }

  /* --- 15. Devirli ondalık: 1 ÷ 3 --- */
  function repeatingDecimal() {
    const parts = [
      txt(16, 26, '1 ÷ 3 = 0,333… → 0,3̅', { size: 13, weight: 800, fill: ACCENT }),
      rect(24, 40, 292, 34, { fill: '#fbfaff', stroke: '#ddd7f5', rx: 8 }),
      txt(36, 62, '1 : 3 = 0,3333…', { size: 12.5 }),
      txt(24, 98, 'Kalan her adımda 1 olduğu için bölme bitmez.', { size: 11, fill: MUTED }),
      txt(24, 122, 'Tekrar eden basamak 3; devreden kısım 3.', { size: 11, fill: INK }),
      txt(24, 146, 'Devreden basamak üzerine çizgi konur: 0,3̅', { size: 11, weight: 700, fill: GOLD }),
      txt(24, 170, 'Devirli ondalık da bir kesirdir.', { size: 11, fill: GREEN }),
    ];
    return frame(parts.join(''), 'Bir bölü üçün devirli ondalık gösterimi');
  }

  /* --- 16. Sadeleştirme: 12/18 → 2/3 --- */
  function simplifying() {
    const parts = [
      txt(16, 26, 'Pay ve payda aynı sayıya bölünür', { size: 12, weight: 700, fill: ACCENT }),
      txt(60, 78, '12', { size: 24, anchor: 'middle', weight: 800 }),
      line(34, 88, 88, 88, { width: 2 }),
      txt(60, 118, '18', { size: 24, anchor: 'middle', weight: 800 }),
      txt(112, 104, '÷ 6', { size: 12, anchor: 'middle', fill: GOLD, weight: 700 }),
      line(126, 96, 168, 96, { stroke: GOLD, width: 1.6, dash: '4 3' }),
      txt(214, 78, '2', { size: 24, anchor: 'middle', weight: 800, fill: GREEN }),
      line(188, 88, 242, 88, { width: 2 }),
      txt(214, 118, '3', { size: 24, anchor: 'middle', weight: 800, fill: GREEN }),
      txt(258, 104, '=', { size: 16, anchor: 'middle', weight: 800 }),
      txt(16, 150, 'Değer değişmedi: 12/18 ile 2/3 aynı sayıdır.', { size: 11 }),
      txt(16, 172, 'En sade hâl: pay ile payda aralarında asal.', { size: 11, fill: MUTED }),
    ];
    return frame(parts.join(''), 'On iki bölü on sekiz kesrinin sadeleştirilmesi');
  }

  /* --- 17. Toplanan: toplama çıkarma ilişkisi --- */
  function addends() {
    const parts = [
      txt(16, 26, 'Toplanan + toplanan = toplam', { size: 12, weight: 700 }),
      txt(20, 76, '4', { size: 26, weight: 800, fill: ACCENT }),
      txt(56, 76, '+', { size: 22, weight: 700, fill: MUTED }),
      txt(88, 76, '(−3)', { size: 26, weight: 800, fill: GREEN }),
      txt(178, 76, '=', { size: 22, weight: 700, fill: MUTED }),
      txt(210, 76, '1', { size: 26, weight: 800, fill: INK }),
      line(20, 90, 236, 90, { stroke: '#e2dcf6', width: 1.4 }),
      txt(20, 112, 'Toplananlar: 4 ve −3', { size: 11.5, fill: INK }),
      txt(20, 134, 'Toplam: 1', { size: 11.5, fill: INK }),
      txt(20, 160, 'Çıkarmada toplananlardan biri eksiktir: 4 − 1 = 3.', { size: 11, fill: MUTED }),
    ];
    return frame(parts.join(''), 'Toplama işleminde toplananlar ve toplam');
  }

  /* --- 18. İşaret kuralı: çarpma tablosu --- */
  function signRule() {
    const rows = [['+', '+', '+'], ['+', '−', '−'], ['−', '+', '−'], ['−', '−', '+']];
    const parts = [txt(16, 26, 'Çarpma ve bölmede işaret kuralı', { size: 12, weight: 700, fill: ACCENT })];
    parts.push(txt(40, 52, '1. sayı', { size: 10, anchor: 'middle', fill: MUTED }));
    parts.push(txt(104, 52, '2. sayı', { size: 10, anchor: 'middle', fill: MUTED }));
    parts.push(txt(190, 52, 'sonuç', { size: 10, anchor: 'middle', fill: MUTED }));
    rows.forEach((row, index) => {
      const y = 72 + index * 24;
      parts.push(txt(40, y, row[0], { size: 15, anchor: 'middle', weight: 800, fill: row[0] === '+' ? GREEN : ACCENT }));
      parts.push(txt(104, y, row[1], { size: 15, anchor: 'middle', weight: 800, fill: row[1] === '+' ? GREEN : ACCENT }));
      parts.push(txt(190, y, row[2], { size: 15, anchor: 'middle', weight: 800, fill: row[2] === '+' ? GREEN : ACCENT }));
    });
    parts.push(txt(232, 72, '(−4)·(−6) = 24', { size: 11, fill: INK }));
    parts.push(txt(232, 96, '(−4)·6 = −24', { size: 11, fill: INK }));
    parts.push(txt(16, 172, 'Aynı işaret → pozitif, zıt işaret → negatif.', { size: 10.5, fill: MUTED }));
    return frame(parts.join(''), 'İşaret kuralı tablosu');
  }

  /* --- 19. İşlem önceliği: sıra --- */
  function operationOrder() {
    const steps = ['1. Üslü ifadeler', '2. Parantez içi', '3. Çarpma veya bölme', '4. Toplama veya çıkarma'];
    const parts = [txt(16, 24, 'İşlem sırası', { size: 12, weight: 700, fill: ACCENT })];
    steps.forEach((label, index) => {
      const y = 36 + index * 32;
      parts.push(rect(20, y, 300, 26, { fill: index === 0 ? '#efeafd' : '#fbfaff', stroke: '#ded8f5', rx: 8 }));
      parts.push(txt(34, y + 18, label, { size: 11.5, weight: 700, fill: index === 0 ? ACCENT : INK }));
    });
    parts.push(txt(16, 176, 'Aynı öncelikteki işlemler soldan sağa yapılır.', { size: 10.5, fill: MUTED }));
    return frame(parts.join(''), 'İşlem önceliği sırası');
  }

  /* --- 20. EKOK: paydalar 4 ve 6 --- */
  function lcmFigure() {
    const parts = [txt(16, 26, 'Paydalar 4 ve 6 → EKOK 12', { size: 12, weight: 700, fill: GREEN })];
    parts.push(txt(24, 60, '4’ün katları:', { size: 11, fill: MUTED }));
    parts.push(txt(120, 60, '4, 8, 12, 16, 20 …', { size: 11.5 }));
    parts.push(txt(24, 86, '6’nın katları:', { size: 11, fill: MUTED }));
    parts.push(txt(120, 86, '6, 12, 18, 24 …', { size: 11.5 }));
    parts.push(rect(105, 100, 75, 28, { fill: '#eefaf3', stroke: GREEN, rx: 8 }));
    parts.push(txt(142, 119, 'ortak: 12', { size: 11.5, anchor: 'middle', weight: 800, fill: GREEN }));
    parts.push(txt(24, 152, '1/4 = 3/12 ve 1/6 = 2/12: paydalar eşitlendi.', { size: 11, fill: INK }));
    parts.push(txt(24, 174, 'İki kesir toplanabilir: 3/12 + 2/12 = 5/12.', { size: 10.5, fill: MUTED }));
    return frame(parts.join(''), 'Dört ve altının en küçük ortak katı on ikidir');
  }

  /* --- 21. Tam sayılı kesir --- */
  function mixedNumber() {
    const parts = [
      txt(16, 26, 'Tam sayılı kesir: 2 tam 1/3', { size: 12, weight: 700, fill: ACCENT }),
      txt(34, 84, '2', { size: 26, weight: 800, fill: INK }),
      txt(66, 66, '1', { size: 16, anchor: 'middle', weight: 800 }),
      line(54, 72, 88, 72, { width: 1.6 }),
      txt(66, 90, '3', { size: 16, anchor: 'middle', weight: 800 }),
      txt(120, 84, '=', { size: 18, weight: 800, fill: MUTED }),
      txt(150, 66, '7', { size: 18, anchor: 'middle', weight: 800, fill: GREEN }),
      line(136, 72, 176, 72, { width: 1.6 }),
      txt(150, 90, '3', { size: 18, anchor: 'middle', weight: 800, fill: GREEN }),
      txt(196, 84, 'bileşik kesir', { size: 11, fill: MUTED }),
      txt(16, 130, '2 · 3 + 1 = 7: tam kısım paydayla çarpılır, pay eklenir.', { size: 10.5 }),
      txt(16, 158, 'Bileşik kesirde pay paydadan büyüktür.', { size: 10.5, fill: MUTED }),
    ];
    return frame(parts.join(''), 'İki tam bir bölü üç kesrinin bileşik kesre çevrilmesi');
  }

  /* --- 22. Ayrıt: küpün ayrıtları --- */
  function edges() {
    const parts = [txt(16, 24, 'Küp: 8 köşe, 12 ayrıt, 6 yüz', { size: 12, weight: 700, fill: ACCENT })];
    const x = 96;
    const y = 128;
    const s = 64;
    const dx = 38;
    const dy = 26;
    parts.push(poly([[x, y], [x + s, y], [x + s + dx, y - dy], [x + dx, y - dy]], { fill: '#e2d9fb' }));
    parts.push(poly([[x + s, y], [x + s + dx, y - dy], [x + s + dx, y - dy - s], [x + s, y - s]], { fill: '#f2eefe' }));
    parts.push(poly([[x, y], [x + s, y], [x + s, y - s], [x, y - s]], { fill: SOFT }));
    parts.push(line(x, y, x + dx, y - dy, { stroke: GREEN, width: 2, dash: '4 3' }));
    parts.push(line(x + dx, y - dy, x + dx, y - dy - s, { stroke: GREEN, width: 2, dash: '4 3' }));
    parts.push(line(x + dx, y - dy, x + s + dx, y - dy, { stroke: GREEN, width: 2, dash: '4 3' }));
    parts.push(txt(x + s / 2, y + 20, 'ayrıt', { size: 10.5, anchor: 'middle', fill: GREEN, weight: 700 }));
    parts.push(txt(16, 172, 'Ayrıt, iki yüzün kesiştiği doğru parçasıdır.', { size: 10.5, fill: MUTED }));
    return frame(parts.join(''), 'Küpün ayrıtları, köşeleri ve yüzleri');
  }

  /* --- 23. Ön, yan, üst görünüm --- */
  function views() {
    const parts = [txt(16, 24, 'Aynı yapı, üç farklı görünüm', { size: 12, weight: 700, fill: ACCENT })];
    const draws = [
      { x: 16, label: 'ön', cells: [[0, 0], [1, 0], [2, 0], [0, 1]] },
      { x: 136, label: 'yan', cells: [[0, 0], [0, 1]] },
      { x: 252, label: 'üst', cells: [[0, 0], [1, 0], [2, 0]] },
    ];
    draws.forEach((view) => {
      view.cells.forEach(([cx, cy]) => {
        parts.push(rect(view.x + cx * 22, 122 - cy * 22, 22, 22, { fill: SOFT, stroke: ACCENT, width: 1 }));
      });
      parts.push(txt(view.x + 4, 148, `${view.label} görünüm`, { size: 10.5, fill: INK }));
    });
    parts.push(txt(16, 176, 'Önden genişlik, yandan derinlik, üstten taban görülür.', { size: 10.5, fill: MUTED }));
    return frame(parts.join(''), 'Ön, yan ve üst görünümler');
  }

  /* --- 24. Birim küp --- */
  function unitCube() {
    const parts = [txt(16, 24, 'Birim küp: her ayrıtı 1 birim', { size: 12, weight: 700, fill: ACCENT })];
    const x = 40;
    const y = 154;
    const s = 74;
    const dx = 40;
    const dy = 26;
    /* Üst yüz üst kenardan, yan yüz sağ kenardan yükselir: küp kapalı görünür. */
    parts.push(poly([[x, y - s], [x + s, y - s], [x + s + dx, y - s - dy], [x + dx, y - s - dy]], { fill: '#ded5fb' }));
    parts.push(poly([[x + s, y], [x + s + dx, y - dy], [x + s + dx, y - s - dy], [x + s, y - s]], { fill: '#f2eefe' }));
    parts.push(poly([[x, y], [x + s, y], [x + s, y - s], [x, y - s]], { fill: SOFT }));
    parts.push(txt(x + s / 2, y + 17, '1 birim', { size: 10.5, anchor: 'middle', fill: MUTED }));
    parts.push(txt(x + s / 2 + dx / 2, y - s - dy - 7, '1 birim', { size: 10.5, anchor: 'middle', fill: MUTED }));
    parts.push(txt(196, 82, 'Hacim = 1 birim³', { size: 11.5, weight: 800, fill: ACCENT, maxWidth: 138 }));
    parts.push(txt(196, 104, '6 yüz · 12 ayrıt', { size: 10.5, fill: INK, maxWidth: 138 }));
    parts.push(txt(196, 124, '8 köşe', { size: 10.5, fill: INK, maxWidth: 138 }));
    parts.push(txt(196, 146, 'Kenarı 1 birim', { size: 10.5, fill: MUTED, maxWidth: 138 }));
    parts.push(txt(196, 164, 'hacim birimi.', { size: 10.5, fill: MUTED, maxWidth: 138 }));
    return frame(parts.join(''), 'Ayrıtları bir birim olan küp');
  }

  /* --- 25. Açınım: prizmanın yüzey açınımı --- */
  function net() {
    const parts = [txt(16, 24, 'Açınım: 6 yüz tek düzlemde', { size: 12, weight: 700, fill: ACCENT })];
    parts.push(rect(120, 50, 90, 54, { fill: SOFT, stroke: ACCENT, width: 1.2 }));
    parts.push(rect(30, 104, 90, 54, { fill: '#e2d9fb', stroke: ACCENT, width: 1.2 }));
    parts.push(rect(120, 104, 90, 54, { fill: '#e2d9fb', stroke: ACCENT, width: 1.2 }));
    parts.push(rect(210, 104, 90, 54, { fill: '#e2d9fb', stroke: ACCENT, width: 1.2 }));
    parts.push(rect(120, 158, 90, 26, { fill: SOFT, stroke: ACCENT, width: 1.2 }));
    parts.push(txt(16, 62, 'üst', { size: 10, fill: MUTED }));
    parts.push(txt(120, 76, 'üst yüz', { size: 9.5, anchor: 'middle', fill: MUTED }));
    parts.push(txt(300, 76, 'katlanır →', { size: 10, anchor: 'end', fill: GOLD }));
    return frame(parts.join(''), 'Dikdörtgenler prizmasının açınımı');
  }

  /* --- 26. Yüzey alanı: 2(ab + ac + bc) --- */
  function surfaceArea() {
    const parts = [
      txt(16, 26, 'Yüzey alanı = 2 · (a·b + a·c + b·c)', { size: 12, weight: 700, fill: ACCENT }),
      txt(20, 60, 'a = 6 cm, b = 4 cm, c = 3 cm', { size: 11.5, fill: INK }),
      txt(20, 86, 'a·b = 24   a·c = 18   b·c = 12', { size: 11.5, fill: INK }),
      rect(20, 98, 300, 30, { fill: '#fbfaff', stroke: '#ded8f5', rx: 8 }),
      txt(34, 118, 'A = 2 · (24 + 18 + 12) = 108 cm²', { size: 12, weight: 800, fill: GREEN }),
      txt(20, 150, 'Karşılıklı yüzler eş; her yüz iki kez sayılır.', { size: 10.5, fill: MUTED }),
      txt(20, 172, 'Birim cm²: alan iki boyutludur.', { size: 10.5, fill: MUTED }),
    ];
    return frame(parts.join(''), 'Dikdörtgenler prizmasının yüzey alanı hesabı');
  }

  /* --- 27. Kare birim --- */
  function squareUnit() {
    const parts = [txt(16, 24, 'Kare birim: kenarı 1 birim olan kare', { size: 12, weight: 700, fill: GREEN })];
    for (let r = 0; r < 3; r += 1) {
      for (let c = 0; c < 4; c += 1) {
        parts.push(rect(40 + c * 40, 56 + r * 36, 40, 36, { fill: c === 0 && r === 0 ? '#d7f0e3' : '#fbfaff', stroke: '#c9d6e5', width: 1 }));
      }
    }
    parts.push(txt(40, 176, '12 kare birim → alan 12 birim²', { size: 11.5, weight: 700, fill: GREEN }));
    parts.push(txt(220, 68, '1 birim²', { size: 11, fill: GREEN }));
    return frame(parts.join(''), 'Kare birimlerle alan ölçümü');
  }

  /* --- 28. Hacim birimleri merdiveni --- */
  function unitLadder() {
    const steps = [['m³', 'metreküp'], ['dm³', 'desimetreküp'], ['cm³', 'santimetreküp']];
    const parts = [txt(16, 24, 'Hacim birimleri: her adım ×1000', { size: 12, weight: 700, fill: ACCENT })];
    steps.forEach((step, index) => {
      const y = 44 + index * 40;
      parts.push(rect(30 + index * 18, y, 120, 30, { fill: index === 1 ? SOFT : '#fbfaff', stroke: '#cfc5f2', rx: 8 }));
      parts.push(txt(90 + index * 18, y + 20, step[0], { size: 13, anchor: 'middle', weight: 800, fill: index === 1 ? ACCENT : INK }));
      parts.push(txt(170 + index * 18, y + 20, step[1], { size: 10.5, fill: MUTED }));
      if (index < 2) parts.push(txt(96 + index * 18, y + 36, '×1000 ↓', { size: 10, fill: GOLD }));
    });
    parts.push(txt(16, 176, '1 dm³ = 1 L ve 1 cm³ = 1 mL’dir.', { size: 10.5, fill: GREEN }));
    return frame(parts.join(''), 'Metreküp, desimetreküp ve santimetreküp arasındaki geçiş');
  }

  /* --- 29. Desimetreküp = litre --- */
  function litreCube() {
    const parts = [txt(16, 24, '1 dm³ = 1 litre', { size: 12, weight: 700, fill: GREEN })];
    /* 1 dm = 10 cm; küpün bir yüzü 10 × 10 cm = 100 cm², hacim 1000 cm³. */
    const x = 28;
    const y = 150;
    const s = 74;
    const dx = 34;
    const dy = 22;
    parts.push(poly([[x, y - s], [x + s, y - s], [x + s + dx, y - s - dy], [x + dx, y - s - dy]], { fill: '#c9ecd9' }));
    parts.push(poly([[x + s, y], [x + s + dx, y - dy], [x + s + dx, y - s - dy], [x + s, y - s]], { fill: '#e8f7ee' }));
    parts.push(poly([[x, y], [x + s, y], [x + s, y - s], [x, y - s]], { fill: '#d7f0e3' }));
    for (let i = 1; i < 10; i += 1) {
      parts.push(line(x + (s / 10) * i, y, x + (s / 10) * i, y - s, { stroke: '#8fc7a8', width: 0.6 }));
      parts.push(line(x, y - (s / 10) * i, x + s, y - (s / 10) * i, { stroke: '#8fc7a8', width: 0.6 }));
    }
    parts.push(txt(x + s / 2, y + 16, '10 cm', { size: 10.5, anchor: 'middle', fill: MUTED }));
    parts.push(txt(x + s + dx + 6, y - s / 2, '10 cm', { size: 10.5, fill: MUTED }));
    parts.push(txt(16, 184, '10 × 10 × 10 = 1000 cm³ = 1 dm³ = 1 L', { size: 10.5, weight: 700, fill: GREEN }));
    parts.push(txt(196, 66, '1 L', { size: 15, weight: 800, fill: GREEN }));
    parts.push(txt(196, 88, '1 dm³ = 1000 cm³', { size: 10.5, fill: INK }));
    parts.push(txt(196, 110, '1 dm = 10 cm', { size: 10.5, fill: INK }));
    parts.push(txt(196, 132, 'Yüz: 10 × 10 = 100 cm²', { size: 10.5, fill: INK }));
    return frame(parts.join(''), 'Desimetreküp ile litrenin eşitliği');
  }

  /* --- 30. Ölçekli kap: mililitre --- */
  function beaker() {
    const parts = [txt(16, 24, 'Mililitre: litrenin binde biri', { size: 12, weight: 700, fill: GOLD })];
    parts.push(rect(60, 44, 80, 110, { fill: '#fffdf6', stroke: '#c9b98a', width: 1.5, rx: 8 }));
    parts.push(rect(62, 104, 76, 48, { fill: '#fbf0cf', stroke: 'none' }));
    for (let i = 0; i < 5; i += 1) {
      const y = 60 + i * 20;
      parts.push(line(126, y, 140, y, { stroke: '#c9b98a', width: 1 }));
      parts.push(txt(146, y + 4, `${(5 - i) * 50} mL`, { size: 9, fill: MUTED }));
    }
    parts.push(txt(190, 84, '1 L = 1000 mL', { size: 11.5, weight: 700, fill: INK }));
    parts.push(txt(190, 108, '1 mL = 1 cm³', { size: 11, fill: GREEN }));
    parts.push(txt(16, 172, 'İlaç ve içecek etiketlerinde mililitre kullanılır.', { size: 10.5, fill: MUTED }));
    return frame(parts.join(''), 'Dereceli kap ve mililitre ölçeği');
  }

  /* --- 31. Aritmetik ortalama: eşit paylaştırma --- */
  function meanArrow() {
    const values = [4, 6, 8, 2];
    const mean = 5;
    const parts = [txt(16, 24, 'Ortalama = toplam ÷ veri sayısı', { size: 12, weight: 700, fill: ACCENT })];
    const px = (value) => 40 + (value / 10) * 260;
    parts.push(line(40, 110, 300, 110, { width: 1.6 }));
    for (let value = 0; value <= 10; value += 2) {
      parts.push(line(px(value), 106, px(value), 114, { width: 1 }));
      parts.push(txt(px(value), 128, String(value), { size: 9.5, anchor: 'middle', fill: MUTED }));
    }
    values.forEach((value, index) => {
      parts.push(circle(px(value), 110, 5, { fill: [ACCENT, GREEN, GOLD, '#4b6b8a'][index] }));
    });
    parts.push(line(px(mean), 64, px(mean), 110, { stroke: '#c03744', width: 1.6, dash: '4 3' }));
    parts.push(txt(px(mean), 54, 'ortalama 5', { size: 11, anchor: 'middle', weight: 800, fill: '#c03744' }));
    parts.push(txt(16, 152, '(4 + 6 + 8 + 2) ÷ 4 = 20 ÷ 4 = 5', { size: 11.5, weight: 700 }));
    parts.push(txt(16, 174, 'Toplam dört kişiye eşit dağıtılırsa her biri 5 alır.', { size: 10.5, fill: MUTED }));
    return frame(parts.join(''), 'Dört verinin aritmetik ortalaması beştir');
  }

  /* --- 32. Ortanca: sıralı veride ortadaki --- */
  function medianFigure() {
    const sorted = [3, 5, 7, 9, 12];
    const parts = [txt(16, 24, 'Sıralı veride ortadaki değer', { size: 12, weight: 700, fill: GREEN })];
    sorted.forEach((value, index) => {
      const x = 26 + index * 60;
      const middle = index === 2;
      parts.push(rect(x, 54, 48, 44, { fill: middle ? '#d7f0e3' : '#fbfaff', stroke: middle ? GREEN : '#d8d2ee', width: middle ? 1.6 : 1, rx: 8 }));
      parts.push(txt(x + 24, 84, String(value), { size: 15, anchor: 'middle', weight: 800, fill: middle ? GREEN : INK }));
    });
    parts.push(txt(170, 122, '5 veri → 3. değer ortanca', { size: 11, anchor: 'middle', fill: INK }));
    parts.push(txt(170, 146, 'Çift sayıda: ortadaki iki değerin ortalaması.', { size: 10.5, anchor: 'middle', fill: MUTED }));
    parts.push(txt(16, 176, 'Ortanca uç değerlerden etkilenmez.', { size: 10.5, fill: GREEN }));
    return frame(parts.join(''), 'Üç, beş, yedi, dokuz ve on ikiden oluşan veride ortanca yedidir');
  }

  /* --- 33. Açıklık: en büyük − en küçük --- */
  function rangeFigure() {
    const parts = [txt(16, 24, 'Açıklık = en büyük − en küçük', { size: 12, weight: 700, fill: GOLD })];
    const px = (value) => 40 + (value / 25) * 260;
    parts.push(line(40, 110, 300, 110, { width: 1.6 }));
    [5, 12, 18, 23].forEach((value) => parts.push(circle(px(value), 110, 5, { fill: ACCENT })));
    parts.push(line(px(5), 140, px(23), 140, { stroke: GOLD, width: 1.8 }));
    parts.push(line(px(5), 134, px(5), 146, { stroke: GOLD, width: 1.4 }));
    parts.push(line(px(23), 134, px(23), 146, { stroke: GOLD, width: 1.4 }));
    parts.push(txt(px(5), 96, 'en küçük 5', { size: 10.5, anchor: 'middle', fill: MUTED }));
    parts.push(txt(px(23), 96, 'en büyük 23', { size: 10.5, anchor: 'middle', fill: MUTED }));
    parts.push(txt(170, 164, '23 − 5 = 18 birim', { size: 12, anchor: 'middle', weight: 800, fill: GOLD }));
    return frame(parts.join(''), 'Veri grubunun açıklığı on sekizdir');
  }

  /* --- 34. Kategorik veri --- */
  function categorical() {
    const groups = [['kış', 4], ['yaz', 9], ['ilkbahar', 3], ['sonbahar', 5]];
    const parts = [txt(16, 24, 'Kategorik veri: gruplar sayılır', { size: 12, weight: 700, fill: ACCENT })];
    groups.forEach(([label, count], index) => {
      const y = 44 + index * 30;
      parts.push(txt(20, y + 16, label, { size: 10.5, fill: INK }));
      parts.push(rect(96, y, count * 16, 20, { fill: SOFT, stroke: ACCENT, width: 1 }));
      parts.push(txt(102 + count * 16, y + 15, String(count), { size: 10.5, weight: 700, fill: ACCENT }));
    });
    parts.push(txt(16, 176, 'Ortalama alınmaz; en çok tekrar eden grup seçilir.', { size: 9.5, fill: MUTED }));
    return frame(parts.join(''), 'Kategorik veride sıklık sayımı');
  }

  /* --- 35. Ortalama mutlak sapma --- */
  function deviation() {
    const parts = [txt(16, 24, 'Ortalama mutlak sapma', { size: 12, weight: 700, fill: GOLD })];
    const px = (value) => 40 + (value / 8) * 250;
    parts.push(line(40, 118, 296, 118, { width: 1.6 }));
    [2, 4, 6, 8].forEach((value) => {
      parts.push(circle(px(value), 118, 5, { fill: ACCENT }));
      const distance = Math.abs(value - 5);
      parts.push(line(px(value), 118, px(5), 118, { stroke: GOLD, width: distance ? 1.4 : 0.8, dash: '3 3' }));
      parts.push(txt(px(value), 138, `${distance}`, { size: 10, anchor: 'middle', fill: GOLD }));
    });
    parts.push(line(px(5), 74, px(5), 118, { stroke: '#c03744', width: 1.5, dash: '4 3' }));
    parts.push(txt(px(5), 64, 'ortalama 5', { size: 10.5, anchor: 'middle', weight: 800, fill: '#c03744' }));
    parts.push(txt(16, 164, '(3 + 1 + 1 + 3) ÷ 4 = 2 → sapma 2', { size: 11, weight: 700 }));
    return frame(parts.join(''), 'Her verinin ortalamadan uzaklığı ve ortalama mutlak sapma');
  }

  /* --- 36. Tepe değer --- */
  function modeFigure() {
    const values = [3, 5, 5, 5, 7, 8];
    const parts = [txt(16, 24, 'Tepe değer: en çok tekrar eden', { size: 12, weight: 700, fill: GREEN })];
    values.forEach((value, index) => {
      const x = 24 + index * 50;
      parts.push(rect(x, 50, 42, 40, { fill: value === 5 ? '#d7f0e3' : '#fbfaff', stroke: value === 5 ? GREEN : '#d8d2ee', width: value === 5 ? 1.6 : 1, rx: 8 }));
      parts.push(txt(x + 21, 76, String(value), { size: 14, anchor: 'middle', weight: 800, fill: value === 5 ? GREEN : INK }));
    });
    parts.push(txt(16, 122, '5 üç kez tekrar etti → tepe değer 5', { size: 11.5, weight: 700, fill: GREEN }));
    parts.push(txt(16, 148, 'Bir veri grubunda birden fazla tepe değer olabilir.', { size: 10.5, fill: MUTED }));
    parts.push(txt(16, 172, 'Kategorik veride en çok seçilen grup tepe değerdir.', { size: 10.5, fill: MUTED }));
    return frame(parts.join(''), 'Veri grubunda üç kez tekrar eden beş tepe değerdir');
  }

  /* --- 37. Daire grafiği: merkez açı --- */
  function pieChart() {
    const cx = 100;
    const cy = 96;
    const r = 62;
    const angle = 158.4;
    const rad = (angle / 360) * Math.PI * 2;
    const x2 = cx + r * Math.cos(rad);
    const y2 = cy + r * Math.sin(rad);
    const large = angle > 180 ? 1 : 0;
    const parts = [
      txt(16, 24, 'Daire grafiği: merkez açı', { size: 12, weight: 700, fill: ACCENT }),
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#efeafd" stroke="${ACCENT}" stroke-width="1.2"/>`,
      `<path d="M ${cx} ${cy} L ${cx + r} ${cy} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${SOFT}" stroke="${ACCENT}" stroke-width="1.2"/>`,
      txt(cx + 26, cy + 30, '%44', { size: 11, anchor: 'middle', weight: 800, fill: ACCENT }),
      txt(180, 60, 'Bütün: 360°', { size: 11, fill: INK }),
      txt(180, 84, '%44 → 0,44 · 360°', { size: 10.5, fill: INK }),
      txt(180, 106, '= 158,4°', { size: 11.5, weight: 800, fill: ACCENT }),
      txt(180, 132, 'Dilim açısı payı gösterir.', { size: 10, fill: MUTED }),
      txt(16, 176, 'Yüzdeler toplamı %100, açılar toplamı 360° olmalı.', { size: 10, fill: MUTED }),
    ];
    return frame(parts.join(''), 'Daire grafiğinde yüzde kırk dörtlük dilim');
  }

  /* --- Apartman katları: zemin 0, alt katlar negatif --- */
  function buildingFloors() {
    const rows = [
      ['+5', 'Boş daire', 'other'],
      ['+4', 'Demir', 'other'],
      ['+3', '', 'other'],
      ['+2', 'Asya', 'other'],
      ['+1', 'Elif', 'other'],
      ['0', 'Zemin kat', 'zero'],
      ['−1', 'Sığınak', 'under'],
      ['−2', 'Otopark', 'under'],
    ];
    const parts = [txt(16, 18, 'Zemin kat 0; altındaki katlar negatif', { size: 10.5, weight: 700, fill: ACCENT })];
    rows.forEach((row, index) => {
      const y = 28 + index * 19;
      const fill = row[2] === 'zero' ? '#ded5fb' : row[2] === 'under' ? '#e8f6ee' : '#fbfaff';
      const stroke = row[2] === 'zero' ? ACCENT : row[2] === 'under' ? GREEN : '#d8d2ec';
      parts.push(rect(58, y, 250, 18, { fill, stroke, width: 1.1 }));
      parts.push(txt(48, y + 13, row[0], { size: 11, anchor: 'end', weight: 800, fill: row[2] === 'under' ? GREEN : row[2] === 'zero' ? ACCENT : INK }));
      if (row[1]) parts.push(txt(68, y + 13, row[1], { size: 11, fill: row[2] === 'under' ? '#1f6b4c' : INK }));
    });
    return frame(parts.join(''), 'Zemin katı sıfır olan apartmanda katlar: otopark eksi ikide, sığınak eksi birde');
  }

  /* --- 38. Simetri doğrusu --- */
  function symmetryAxis() {
    const parts = [txt(16, 24, 'Simetri doğrusu: katla, çakışıyor mu?', { size: 11.5, weight: 700, fill: ACCENT })];
    parts.push(line(170, 34, 170, 156, { stroke: '#c03744', width: 1.8, dash: '6 4' }));
    parts.push(poly([[170, 130], [110, 130], [110, 70], [146, 70], [146, 92], [170, 92]], { fill: SOFT, stroke: ACCENT }));
    parts.push(poly([[170, 130], [230, 130], [230, 70], [194, 70], [194, 92], [170, 92]], { fill: '#e2d9fb', stroke: ACCENT }));
    parts.push(txt(64, 152, 'sol yarı', { size: 10, fill: MUTED }));
    parts.push(txt(204, 152, 'sağ yarı', { size: 10, fill: MUTED }));
    parts.push(txt(16, 176, 'Katlanınca yarılar üst üste geliyorsa simetri doğrusu.', { size: 9.5, fill: MUTED }));
    return frame(parts.join(''), 'Bir şeklin simetri doğrusu boyunca iki eş yarısı');
  }

  /* --- 39. Yönelim --- */
  function orientation() {
    const parts = [txt(16, 24, 'Yönelim: köşe sırası ters döner', { size: 11.5, weight: 700, fill: ACCENT })];
    parts.push(poly([[30, 140], [120, 140], [30, 70]], { fill: SOFT, stroke: ACCENT }));
    parts.push(txt(34, 160, 'A → B → C saat yönü', { size: 9.5, fill: GREEN }));
    parts.push(line(160, 105, 190, 105, { stroke: GOLD, width: 1.6, dash: '4 3' }));
    parts.push(txt(175, 96, 'yansıt', { size: 9.5, anchor: 'middle', fill: GOLD }));
    parts.push(poly([[230, 140], [320, 140], [320, 70]], { fill: '#e2d9fb', stroke: ACCENT, dash: '4 3' }));
    parts.push(txt(232, 160, 'ters yön', { size: 9.5, fill: '#c03744' }));
    parts.push(txt(16, 180, 'Uzunluklar korunur, yönelim tersine döner.', { size: 10, fill: MUTED }));
    return frame(parts.join(''), 'Yansımada üçgenin yönelimi tersine döner');
  }

  /* --- 40. İnşa: pergel ve cetvel --- */
  function construction() {
    const parts = [txt(16, 24, 'İnşa: pergel + ölçüsüz cetvel', { size: 11.5, weight: 700, fill: ACCENT })];
    const A = [70, 130];
    const B = [250, 130];
    const r = 118;
    parts.push(line(A[0], A[1], B[0], B[1], { width: 1.8 }));
    parts.push(`<path d="M ${A[0] - 40} ${A[1]} A ${r} ${r} 0 0 1 ${A[0] + r} ${A[1] - 20}" fill="none" stroke="${ACCENT}" stroke-width="1.1" stroke-dasharray="4 3"/>`);
    parts.push(`<path d="M ${B[0] + 40} ${B[1]} A ${r} ${r} 0 0 0 ${B[0] - r} ${B[1] - 20}" fill="none" stroke="${GREEN}" stroke-width="1.1" stroke-dasharray="4 3"/>`);
    parts.push(circle(A[0], A[1], 4, { fill: ACCENT }));
    parts.push(circle(B[0], B[1], 4, { fill: GREEN }));
    parts.push(line(160, 40, 160, 176, { stroke: GOLD, width: 1.6 }));
    parts.push(txt(A[0] - 12, A[1] + 18, 'A', { size: 11, weight: 800, fill: ACCENT }));
    parts.push(txt(B[0] + 6, B[1] + 18, 'B', { size: 11, weight: 800, fill: GREEN }));
    parts.push(txt(166, 52, 'orta dikme', { size: 10, fill: GOLD }));
    parts.push(txt(16, 178, 'Eş yarıçaplı yayların kesişimi orta dikmeyi verir.', { size: 9.5, fill: MUTED }));
    return frame(parts.join(''), 'Pergel ve cetvelle orta dikme inşası');
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
    'sayi-kumeleri': numberSets,
    'ters-sayi': oppositeNumbers,
    'mutlak-deger': absoluteValue,
    'bolum-parca': wholeParts,
    devirli: repeatingDecimal,
    sadelestirme: simplifying,
    toplama: addends,
    'isaret-kurali': signRule,
    'islem-onceligi': operationOrder,
    ekok: lcmFigure,
    'tam-sayili': mixedNumber,
    ayrit: edges,
    gorunum: views,
    'birim-kup': unitCube,
    'acim-cizim': net,
    'yuzey-alani': surfaceArea,
    'kare-birim': squareUnit,
    'birim-merdiven': unitLadder,
    'litre-kup': litreCube,
    'olcek-kap': beaker,
    'ortalama-ok': meanArrow,
    'ortanca-ok': medianFigure,
    'aciklik-ok': rangeFigure,
    kategori: categorical,
    sapma: deviation,
    tepe: modeFigure,
    'daire-dilim': pieChart,
    'simetri-dogrusu': symmetryAxis,
    'kat-plani': buildingFloors,
    yonelim: orientation,
    insa: construction,
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
