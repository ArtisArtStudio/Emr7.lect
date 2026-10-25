/* Matematik şekilleri — dış bağımlılıksız, çevrimdışı SVG üretici.
   Terim kartlarında ve sorularda kullanılır. Etiketler Türkçe ve doğrudan
   şeklin üzerine yazılır (pay, payda, ayrıt, yükseklik gibi). */
(() => {
  'use strict';

  const FONT = 'font-family="system-ui,-apple-system,Segoe UI,sans-serif"';
  const INK = '#1b2f49';
  const MUTED = '#5b6b80';
  const ACCENT = '#7056c9';
  const SOFT = '#efeaff';
  const LINE = '#8a7fb5';
  const GREEN = '#2f8a63';
  const GOLD = '#b8791a';

  const esc = (value) => String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const text = (x, y, value, extra = '') => `<text x="${x}" y="${y}" ${FONT} font-size="12" fill="${extra.fill || INK}" ${extra.weight ? `font-weight="${extra.weight}"` : ''} ${extra.anchor ? `text-anchor="${extra.anchor}"` : ''}>${esc(value)}</text>`;
  const label = (x, y, value, extra = '') => `<text x="${x}" y="${y}" ${FONT} font-size="11" fill="${extra.fill || MUTED}"${extra.anchor ? ` text-anchor="${extra.anchor}"` : ''}>${esc(value)}</text>`;
  const arrow = (x1, y1, x2, y2, color = LINE) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.4" stroke-dasharray="3 3" marker-end="url(#mathfig-arrow)"/>`;

  const defs = `<defs><marker id="mathfig-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${LINE}"/></marker></defs>`;

  function wrap(inner, viewBox = '0 0 340 190', title = '') {
    return `<svg class="math-figure" viewBox="${viewBox}" role="img" aria-label="${esc(title)}" xmlns="http://www.w3.org/2000/svg">${defs}${inner}</svg>`;
  }

  /* --- Pay / payda / kesir çizgisi: etiketli kesir --- */
  function fractionLabels(options) {
    const num = options.num == null ? 3 : options.num;
    const den = options.den == null ? 4 : options.den;
    const show = options.show || 'all';
    const parts = [];
    parts.push(`<rect x="16" y="16" width="150" height="158" rx="14" fill="#fbfaff" stroke="#e3dffb"/>`);
    parts.push(`<text x="86" y="72" ${FONT} font-size="34" font-weight="700" fill="${INK}" text-anchor="middle">${esc(num)}</text>`);
    parts.push(`<line x1="56" y1="86" x2="118" y2="86" stroke="${INK}" stroke-width="2.4"/>`);
    parts.push(`<text x="86" y="132" ${FONT} font-size="34" font-weight="700" fill="${INK}" text-anchor="middle">${esc(den)}</text>`);
    if (show === 'all' || show === 'num') {
      parts.push(arrow(96, 62, 176, 52));
      parts.push(text(182, 50, 'PAY', { weight: 800, fill: ACCENT }));
      parts.push(label(182, 65, 'üstteki sayı: kaç parça alındı'));
    }
    if (show === 'all' || show === 'den') {
      parts.push(arrow(96, 124, 176, 132));
      parts.push(text(182, 130, 'PAYDA', { weight: 800, fill: ACCENT }));
      parts.push(label(182, 145, 'alttaki sayı: kaç eş parça var'));
    }
    if (show === 'line') {
      parts.push(arrow(126, 86, 176, 82));
      parts.push(text(182, 80, 'KESİR ÇİZGİSİ', { weight: 800, fill: ACCENT }));
      parts.push(label(182, 95, 'bölme anlamı taşır'));
    }
    if (show === 'all') {
      parts.push(label(182, 168, 'Kesir çizgisi “böl” demektir.', { fill: GREEN }));
    }
    return wrap(parts.join(''), '0 0 340 190', `Kesir ${num} bölü ${den}; pay ve payda etiketli`);
  }

  /* --- Pay/payda kavramı: boyalı şerit --- */
  function fractionBar(options = {}) {
    const total = options.total || 4;
    const shaded = options.shaded == null ? 3 : options.shaded;
    const width = 280;
    const cell = width / total;
    const cells = Array.from({ length: total }, (_, index) => {
      const fill = index < shaded ? '#c9bff2' : '#fbfaff';
      return `<rect x="${30 + index * cell}" y="60" width="${cell}" height="46" fill="${fill}" stroke="${INK}" stroke-width="1.3"/>`;
    }).join('');
    return wrap([
      cells,
      text(30, 52, `${shaded} parça boyandı`, { weight: 700 }),
      label(30, 126, `Bütün ${total} eş parçaya ayrıldı. Payda = ${total}`),
      label(30, 144, `Boyanan parça sayısı = ${shaded}. Pay = ${shaded}`),
      text(30, 172, `${shaded}/${total}`, { weight: 800, fill: ACCENT }),
    ].join(''), '0 0 340 190', `Bir bütünün ${total} eş parçasından ${shaded} tanesi boyalı`);
  }

  /* --- Sayı doğrusu --- */
  function numberLine(options = {}) {
    const from = options.from == null ? -6 : options.from;
    const to = options.to == null ? 6 : options.to;
    const mark = options.mark == null ? -3 : options.mark;
    const x = (value) => 30 + ((value - from) / (to - from)) * 280;
    const ticks = [];
    for (let value = from; value <= to; value += 1) {
      const isZero = value === 0;
      ticks.push(`<line x1="${x(value)}" y1="${isZero ? 62 : 74}" x2="${x(value)}" y2="96" stroke="${isZero ? INK : MUTED}" stroke-width="${isZero ? 2 : 1}"/>`);
      ticks.push(`<text x="${x(value)}" y="114" ${FONT} font-size="11" text-anchor="middle" fill="${isZero ? INK : MUTED}" font-weight="${isZero ? 800 : 500}">${value}</text>`);
    }
    return wrap([
      `<line x1="24" y1="86" x2="318" y2="86" stroke="${INK}" stroke-width="1.6"/>`,
      `<path d="M318,86 l-9,-4 l0,8 z" fill="${INK}"/>`,
      ticks.join(''),
      label(30, 40, 'sola: küçülür', { fill: GOLD }),
      label(240, 40, 'sağa: büyür', { fill: GREEN }),
      `<circle cx="${x(mark)}" cy="86" r="5.5" fill="${ACCENT}"/>`,
      text(x(mark), 148, `${mark}`, { weight: 800, fill: ACCENT, anchor: 'middle' }),
      label(30, 172, 'Sıfır ne pozitif ne negatiftir; yönü olmayan başlangıçtır.'),
    ].join(''), '0 0 340 190', 'Tam sayılar sayı doğrusunda');
  }

  /* --- Dikdörtgenler prizması (izometrik) --- */
  function prism(options = {}) {
    const w = options.w || 120;
    const h = options.h || 70;
    const d = options.d || 46;
    const x0 = 70;
    const y0 = 118;
    const front = `<polygon points="${x0},${y0} ${x0 + w},${y0} ${x0 + w},${y0 - h} ${x0},${y0 - h}" fill="${SOFT}" stroke="${INK}" stroke-width="1.5"/>`;
    const top = `<polygon points="${x0},${y0 - h} ${x0 + w},${y0 - h} ${x0 + w + d},${y0 - h - d * 0.55} ${x0 + d},${y0 - h - d * 0.55}" fill="#ded5fb" stroke="${INK}" stroke-width="1.5"/>`;
    const side = `<polygon points="${x0 + w},${y0} ${x0 + w + d},${y0 - d * 0.55} ${x0 + w + d},${y0 - h - d * 0.55} ${x0 + w},${y0 - h}" fill="#f3effe" stroke="${INK}" stroke-width="1.5"/>`;
    const dashed = `<line x1="${x0}" y1="${y0}" x2="${x0 + d}" y2="${y0 - d * 0.55}" stroke="${LINE}" stroke-width="1.1" stroke-dasharray="4 3"/>`
      + `<line x1="${x0 + d}" y1="${y0 - d * 0.55}" x2="${x0 + d}" y2="${y0 - h - d * 0.55}" stroke="${LINE}" stroke-width="1.1" stroke-dasharray="4 3"/>`
      + `<line x1="${x0 + d}" y1="${y0 - d * 0.55}" x2="${x0 + w + d}" y2="${y0 - d * 0.55}" stroke="${LINE}" stroke-width="1.1" stroke-dasharray="4 3"/>`;
    return wrap([
      top, side, front, dashed,
      label(x0 + w / 2 - 18, y0 + 16, `genişlik ${options.a || 5} br`, { fill: MUTED }),
      label(x0 + w + 8, y0 - h / 2 + 4, `yükseklik ${options.b || 3} br`, { fill: MUTED }),
      label(x0 + w + 20, y0 - 12, `derinlik ${options.c || 2} br`, { fill: MUTED }),
      text(20, 24, '6 yüz · 12 ayrıt · 8 köşe', { weight: 700 }),
    ].join(''), '0 0 340 190', 'Dikdörtgenler prizması ve boyutları');
  }

  /* --- Hacim: katmanlı birim küpler --- */
  function volumeCubes(options = {}) {
    const cols = options.cols || 3;
    const rows = options.rows || 2;
    const layers = options.layers || 2;
    const size = 26;
    const parts = [];
    for (let layer = layers - 1; layer >= 0; layer -= 1) {
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const x = 60 + col * size + row * 12;
          const y = 132 - layer * size - row * 12;
          const opacity = layer === layers - 1 ? 1 : 0.82;
          parts.push(`<polygon points="${x},${y} ${x + size},${y} ${x + size + 9},${y - 6} ${x + 9},${y - 6}" fill="#e4dcfb" stroke="${INK}" stroke-width="1" opacity="${opacity}"/>`);
          parts.push(`<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${layer === 0 ? '#c9bff2' : '#ded5fb'}" stroke="${INK}" stroke-width="1" opacity="${opacity}"/>`);
        }
      }
    }
    return wrap([
      parts.join(''),
      text(20, 24, `${cols} × ${rows} × ${layers} birim küp`, { weight: 700 }),
      label(20, 44, 'Her katmanda taban alanı kadar küp var.'),
      label(20, 62, `Hacim = ${cols * rows * layers} birimküp`, { fill: ACCENT }),
      label(200, 172, 'katman = yükseklik', { fill: MUTED }),
    ].join(''), '0 0 340 190', 'Birim küplerle hacim');
  }

  /* --- Yansıma --- */
  function reflection(options = {}) {
    const axisX = 170;
    const triangle = (kx, fill) => `<polygon points="${axisX + kx * 60},${132} ${axisX + kx * 60 + 46},${132} ${axisX + kx * 60},${132 - 56}" fill="${fill}" stroke="${INK}" stroke-width="1.5"/>`;
    return wrap([
      `<line x1="${axisX}" y1="26" x2="${axisX}" y2="168" stroke="${ACCENT}" stroke-width="1.8" stroke-dasharray="7 5"/>`,
      triangle(-1, SOFT),
      triangle(1, '#e8f5ee'),
      arrow(axisX - 34, 62, axisX - 6, 62),
      arrow(axisX + 34, 62, axisX + 6, 62),
      label(axisX + 6, 22, 'ayna doğrusu', { fill: ACCENT }),
      label(axisX - 66, 152, 'şekil'),
      label(axisX + 22, 152, 'görüntü'),
      label(20, 176, 'Uzaklıklar eşit, kenar uzunlukları korunur; yönelim ters döner.'),
    ].join(''), '0 0 340 190', 'Ayna doğrusuna göre yansıma');
  }

  /* --- Orta dikme --- */
  function bisector() {
    return wrap([
      `<line x1="50" y1="130" x2="270" y2="66" stroke="${INK}" stroke-width="2"/>`,
      `<line x1="196" y1="24" x2="118" y2="176" stroke="${ACCENT}" stroke-width="1.8" stroke-dasharray="7 5"/>`,
      `<circle cx="50" cy="130" r="4.5" fill="${INK}"/>`,
      `<circle cx="270" cy="66" r="4.5" fill="${INK}"/>`,
      `<circle cx="160" cy="98" r="4" fill="${ACCENT}"/>`,
      text(36, 148, 'A', { weight: 700 }),
      text(276, 62, 'B', { weight: 700 }),
      text(150, 92, 'M', { weight: 700, fill: ACCENT }),
      label(200, 40, 'orta dikme', { fill: ACCENT }),
      label(24, 176, 'Orta dikme üzerindeki her nokta A ve B’ye eşit uzaklıktadır.'),
    ].join(''), '0 0 340 190', 'AB doğru parçası ve orta dikmesi');
  }

  /* --- Açıortay --- */
  function angleBisector() {
    return wrap([
      `<line x1="60" y1="150" x2="300" y2="150" stroke="${INK}" stroke-width="1.6"/>`,
      `<line x1="60" y1="150" x2="250" y2="42" stroke="${INK}" stroke-width="1.6"/>`,
      `<line x1="60" y1="150" x2="290" y2="96" stroke="${ACCENT}" stroke-width="1.8" stroke-dasharray="7 5"/>`,
      `<path d="M110,150 A50,50 0 0 0 96,120" fill="none" stroke="${MUTED}" stroke-width="1.2"/>`,
      `<path d="M96,120 A50,50 0 0 0 84,110" fill="none" stroke="${MUTED}" stroke-width="1.2"/>`,
      label(150, 168, 'kollar arasındaki açı iki eş parçaya bölünür', { fill: MUTED }),
      text(52, 168, 'köşe', { weight: 700 }),
      label(214, 100, 'açıortay', { fill: ACCENT }),
    ].join(''), '0 0 340 190', 'Bir açı ve açıortayı');
  }

  /* --- Sütun grafiği (veri) --- */
  function barChart(options = {}) {
    const values = options.values || [5, 3, 6];
    const names = options.names || ['1. grup', '2. grup', '3. grup'];
    const width = 46;
    const gap = 30;
    const base = 140;
    const max = Math.max(...values);
    const bars = values.map((value, index) => {
      const height = (value / max) * 92;
      const x = 60 + index * (width + gap);
      return `<rect x="${x}" y="${base - height}" width="${width}" height="${height}" fill="#c9bff2" stroke="${INK}" stroke-width="1.2"/>`
        + `<text x="${x + width / 2}" y="${base - height - 6}" ${FONT} font-size="11" text-anchor="middle" fill="${INK}" font-weight="700">${value}</text>`
        + label(x + width / 2, base + 16, names[index] || '', { anchor: 'middle' });
    }).join('');
    return wrap([
      bars,
      `<line x1="40" y1="${base}" x2="320" y2="${base}" stroke="${INK}" stroke-width="1.4"/>`,
      `<line x1="40" y1="30" x2="40" y2="${base}" stroke="${INK}" stroke-width="1.4"/>`,
      label(44, 24, 'sıklık'),
      label(24, 168, 'Dikey eksen sıfırdan başlar; sütun yükseklikleri doğrudan karşılaştırılabilir.'),
    ].join(''), '0 0 340 190', 'Üç grubun sıklıklarını gösteren sütun grafiği');
  }

  /* --- Kesirlerde çarpım: alan modeli --- */
  function fractionProduct() {
    const cells = [];
    const cell = 60;
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        const shaded = row < 2 && col < 3;
        cells.push(`<rect x="${60 + col * cell}" y="${24 + row * cell}" width="${cell}" height="${cell}" fill="${shaded ? '#c9bff2' : '#fbfaff'}" stroke="${INK}" stroke-width="1.1"/>`);
      }
    }
    return wrap([
      cells.join(''),
      text(60, 18, '2/3 × 3/4 alan modeli', { weight: 700 }),
      label(60, 216, ''),
      label(20, 214, 'Satırlar 3’e, sütunlar 4’e bölünmüş; kesişen 6 kare boyanır.'),
    ].join(''), '0 0 340 200', 'Kesirlerde çarpmanın alan modeli');
  }

  const BUILDERS = {
    'pay-payda': (options) => fractionLabels(options),
    'kesir-serit': (options) => fractionBar(options),
    'sayi-dogrusu': (options) => numberLine(options),
    prizma: (options) => prism(options),
    hacim: (options) => volumeCubes(options),
    yansima: () => reflection(),
    ortadikme: () => bisector(),
    aciortay: () => angleBisector(),
    'sutun-grafik': (options) => barChart(options),
    'kesir-carpim': () => fractionProduct(),
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
