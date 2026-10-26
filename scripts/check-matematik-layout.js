#!/usr/bin/env node
/* Matematik yerleşim denetimi — sahne ve şekillerde taşma ve etiket çakışması arar.
   Ağ ve tarayıcı gerektirmez: SVG metin kutuları yaklaşık genişlikle hesaplanır.
   Her sahne varsayılan ayarlarda, her sürgünün en küçük/en büyük değerinde ve
   tüm sürgülerin uç değerlerinde ayrı ayrı çizilip denetlenir. */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const sandbox = { window: {} };
const load = (file) => new Function('window', read(file))(sandbox.window);
load('matematik-figure.js');
load('matematik-sahne.js');
const SAHNE = sandbox.window.MATEMATIK_SAHNE2;
const FIG = sandbox.window.MATEMATIK_FIGURE;

const CHAR_RATIO = 0.53; // system-ui için yaklaşık ortalama karakter genişliği

function textBoxes(svg) {
  const boxes = [];
  const pattern = /<text\b([^>]*)>([^<]*)<\/text>/g;
  let match;
  while ((match = pattern.exec(svg))) {
    const attrs = match[1];
    const label = match[2].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    if (!label.trim()) continue;
    const pick = (name, fallback) => {
      const found = new RegExp(`${name}="([^"]*)"`).exec(attrs);
      return found ? found[1] : fallback;
    };
    const x = Number(pick('x', '0'));
    const y = Number(pick('y', '0'));
    const size = Number(pick('font-size', '12'));
    const anchor = pick('text-anchor', 'start');
    const width = label.length * size * CHAR_RATIO;
    let x0 = x;
    if (anchor === 'middle') x0 = x - width / 2;
    if (anchor === 'end') x0 = x - width;
    boxes.push({ label, x0, x1: x0 + width, y0: y - size * 0.85, y1: y + size * 0.2 });
  }
  return boxes;
}

function problems(svg, width, height) {
  const found = [];
  const boxes = textBoxes(svg);
  boxes.forEach((box) => {
    if (box.x0 < -1 || box.x1 > width + 1 || box.y0 < -1 || box.y1 > height + 1) {
      found.push(`taşma: "${box.label}" (${Math.round(box.x0)}–${Math.round(box.x1)}, ${Math.round(box.y0)}–${Math.round(box.y1)})`);
    }
  });
  for (let i = 0; i < boxes.length; i += 1) {
    for (let j = i + 1; j < boxes.length; j += 1) {
      const a = boxes[i];
      const b = boxes[j];
      const overlapX = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0);
      const overlapY = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
      if (overlapX > 3 && overlapY > 3) found.push(`çakışma: "${a.label}" ↔ "${b.label}"`);
    }
  }
  return found;
}

function configs(params) {
  const list = [params.map((param) => ({ ...param }))];
  params.forEach((param, index) => {
    list.push(params.map((item, position) => ({ ...item, value: position === index ? item.min : item.value })));
    list.push(params.map((item, position) => ({ ...item, value: position === index ? item.max : item.value })));
  });
  list.push(params.map((param) => ({ ...param, value: param.min })));
  list.push(params.map((param) => ({ ...param, value: param.max })));
  return list;
}

let checked = 0;
const failures = [];

SAHNE.types().forEach((type) => {
  const params = SAHNE.params(type);
  configs(params).forEach((configuration) => {
    const values = {};
    configuration.forEach((param) => { values[param.name] = param.value; });
    const svg = SAHNE.render(type, values);
    assert.ok(svg && svg.length > 40, `${type} sahnesi çizilemedi.`);
    assert.ok(!/NaN|undefined|Infinity/.test(svg), `${type} sahnesinde sayısal bozukluk var.`);
    checked += 1;
    const issues = problems(svg, SAHNE.width, SAHNE.height);
    if (issues.length) failures.push(`${type} [${configuration.map((param) => `${param.name}=${param.value}`).join(', ')}]\n  ${issues.join('\n  ')}`);
  });
});

const FIGURE_OPTIONS = {
  prizma: [{ a: 6, b: 4, c: 3 }, { a: 1, b: 1, c: 1 }],
  hacim: [{ cols: 4, rows: 4, layers: 4 }, { cols: 1, rows: 1, layers: 1 }],
  'sutun-grafik': [{ values: [8, 8, 8, 8, 8, 8], names: ['A', 'B', 'C', 'D', 'E', 'F'] }],
  'pay-payda': [{ num: 12, den: 18, mark: 'all' }],
  'kesir-serit': [{ total: 10, shaded: 10 }],
  'sayi-dogrusu': [{ from: -9, to: 9, mark: -9 }],
  'kesir-carpim': [{ n1: 4, d1: 5, n2: 4, d2: 5 }],
};
FIG.types().forEach((type) => {
  const variants = [{}].concat(FIGURE_OPTIONS[type] || []);
  variants.forEach((options) => {
    const svg = FIG.render(type, options);
    assert.ok(svg.startsWith('<svg') && svg.endsWith('</svg>'), `${type} şekli geçerli SVG üretmeli.`);
    assert.ok(!/NaN|undefined|Infinity/.test(svg), `${type} şeklinde sayısal bozukluk var.`);
    checked += 1;
    const issues = problems(svg, 340, 190);
    if (issues.length) failures.push(`${type} ${JSON.stringify(options)}\n  ${issues.join('\n  ')}`);
  });
});

if (failures.length) {
  console.error(`Matematik yerleşim denetimi ${failures.length} sorun buldu:\n\n${failures.join('\n\n')}`);
  process.exit(1);
}

console.log(`Matematik yerleşimi temiz: ${SAHNE.types().length} sahne türü (${checked - FIG.types().length} çizim) `
  + `ve ${FIG.types().length} şekil türü; metinler tuval içinde, etiketler çakışmıyor.`);
