#!/usr/bin/env node
/* Matematik alanı: yerel sahne motoru, şekiller ve yerleşim denetimi.
   Ağ gerektirmez; dosyaları okuyup kuralları doğrular. */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const sandbox = { window: {} };
const load = (file) => new Function('window', read(file))(sandbox.window);
load('matematik-sahne.js');
load('matematik-figure.js');
const SAHNE = sandbox.window.MATEMATIK_SAHNE2;
const FIG = sandbox.window.MATEMATIK_FIGURE;

const scene = read('matematik-sahne.js');
const figure = read('matematik-figure.js');
const app = read('matematik.js');
const css = read('matematik.css');
const html = read('index.html');

// 1. Motor sözleşmesi
assert.ok(SAHNE && typeof SAHNE.mount === 'function', 'MATEMATIK_SAHNE2.mount bulunamadı.');
assert.ok(typeof SAHNE.types === 'function' && typeof SAHNE.params === 'function', 'Sahne motoru tür ve parametre listesi vermeli.');
assert.equal(SAHNE.width, 640, 'Sahne tuvali 640 birim geniş olmalı.');
assert.equal(SAHNE.height, 380, 'Sahne tuvali 380 birim yüksek olmalı.');
assert.ok(SAHNE.types().length >= 16, `Sahne türü sayısı az: ${SAHNE.types().length}`);
SAHNE.types().forEach((type) => {
  const params = SAHNE.params(type);
  assert.ok(params.length >= 1, `${type} sahnesinde oynanabilir sürgü olmalı.`);
  params.forEach((param) => {
    assert.ok(param.name && param.label, `${type} sürgü adı/etiketi eksik.`);
    assert.ok(Number.isFinite(param.min) && Number.isFinite(param.max) && Number.isFinite(param.step) && Number.isFinite(param.value),
      `${type} ${param.name} sürgü değerleri sayı olmalı.`);
  });
});

// 2. Dış bağımlılık sınırı: sahne çevrimdışı çalışır
[scene, figure, app].forEach((source, index) => {
  const hosts = [...source.matchAll(/https?:\/\/([^/"'\s]+)/g)].map((match) => match[1]);
  hosts.forEach((host) => {
    assert.equal(host, 'www.w3.org', `Matematik kaynağı dış adres çağırmamalı: ${host} (${index + 1}. dosya).`);
  });
  assert.ok(!/localhost|127\.0\.0\.1/.test(source), 'Yerel adres kullanılmamalı.');
  assert.ok(!/youtube\.com|youtu\.be/.test(source), 'Matematik alanında YouTube bağlantısı olmamalı.');
});
assert.ok(!/geogebra/i.test(scene + figure + app + html), 'GeoGebra bağımlılığı tamamen kaldırılmalı.');
assert.ok(!fs.existsSync(path.join(root, 'matematik-geogebra.js')), 'GeoGebra yükleyicisi silinmiş olmalı.');
assert.ok(!fs.existsSync(path.join(root, 'matematik-yerel-sahne.js')), 'Yerel yedek sahne dosyası silinmiş olmalı.');

// 3. Sürgü + sürükleme davranışı
assert.ok(/data-scene-param/.test(scene), 'Sürgüler data-scene-param ile bağlanmalı.');
assert.ok(/scene-out-/.test(scene), 'Sürgü değeri canlı okunmalı (output).');
assert.ok(/pointerdown/.test(scene) && /pointermove/.test(scene), 'Sahne noktaları sürüklenebilmeli.');
assert.ok(/data-handle/.test(scene), 'Sürüklenebilir nokta işaretlenmeli.');
assert.ok(/touch-action/.test(css), 'Dokunmatik sürükleme için touch-action tanımlı olmalı.');
assert.ok(/aria-label/.test(scene), 'Sahne erişilebilir etiket taşımalı.');

// 4. Şekil motoru: tüm türler çizilir, bozuk değer üretmez
assert.ok(FIG && typeof FIG.render === 'function', 'MATEMATIK_FIGURE.render bulunamadı.');
assert.ok(FIG.types().length >= 10, `Şekil türü sayısı az: ${FIG.types().length}`);
FIG.types().forEach((type) => {
  const svg = FIG.render(type, {});
  assert.ok(svg.startsWith('<svg') && svg.endsWith('</svg>'), `${type} şekli geçerli SVG üretmeli.`);
  assert.ok(!/NaN|undefined|Infinity/.test(svg), `${type} şeklinde sayısal bozukluk var.`);
  assert.ok(/viewBox="0 0 340 190"/.test(svg), `${type} şekli 340×190 tuvaline oturmalı.`);
});
assert.equal(FIG.render('bilinmeyen-tur', {}), '', 'Bilinmeyen şekil boş dönmeli.');
FIG.types().forEach((type) => {
  const svg = FIG.render(type, {});
  assert.ok(/role="img"/.test(svg) && /aria-label="[^"]{6,}"/.test(svg), `${type} şekli erişilebilir etiket taşımalı.`);
  assert.ok(/<text[^>]*>[^<]+<\/text>/.test(svg), `${type} şekli en az bir okunur etiket içermeli.`);
});

// 5. Yerleşim: çizim üstte, sürgü bandı altta; mobil tek kolon
assert.ok(/math-scene-stage/.test(app) && /math-scene-controls/.test(app), 'Sahne kartı çizim + sürgü bandı içermeli.');
assert.ok(/\.math-scene-frame\{display:flex;flex-direction:column/.test(css), 'Sahne çerçevesi dikey yerleşimde olmalı.');
assert.ok(/\.math-scene-stage\{flex:1 1 auto/.test(css), 'Çizim alanı üstte esnemeli.');
assert.ok(/\.math-scene-controls\{flex:0 0 auto/.test(css), 'Sürgü bandı altta sabit kalmalı.');
assert.ok(/\.math-scene-controls\{[^}]*grid-template-columns:repeat\(auto-fit/.test(css), 'Sürgüler masaüstünde çok kolonlu olmalı.');
assert.ok(/@media\(max-width:700px\)[\s\S]{0,220}\.math-scene-controls\{grid-template-columns:1fr/.test(css),
  'Mobilde sürgüler tek kolonda olmalı.');
assert.ok(/\.math-scene-svg\{[^}]*width:100%/.test(css), 'Sahne genişliğe uyum sağlamalı.');
assert.ok(!/\.math-scene-card \.math-scene-frame\{height:/.test(css), 'Sahne kartı sabit yükseklikle kırpılmamalı.');

// 6. Bağlantılar
assert.ok(/matematik-sahne\.js/.test(html), 'index.html sahne motorunu yüklemeli.');
assert.ok(html.indexOf('matematik-sahne.js') < html.indexOf('matematik-content.js'), 'Sahne motoru içerikten önce yüklenmeli.');
assert.ok(html.indexOf('matematik-figure.js') < html.indexOf('matematik-content.js'), 'Şekil motoru içerikten önce yüklenmeli.');
assert.ok(/MATEMATIK_SAHNE2\.mount/.test(app), 'Uygulama sahneleri yerel motorla çizmeli.');
assert.ok(/Sürgüler çizimin altında/.test(app), 'Öğrenciye sürgü konumu açıklanmalı.');

// 7. Belge
const notices = read('THIRD-PARTY-NOTICES.md');
const analysis = read('docs/MATEMATIK-KITAP-ANALIZI.md');
assert.ok(/GeoGebra/i.test(notices), 'THIRD-PARTY-NOTICES.md GeoGebra notunu korumalı.');
assert.ok(/yerel SVG/.test(analysis), 'Analiz dokümanı yerel sahne kararını anlatmalı.');

console.log(`Matematik denetimi geçti: ${SAHNE.types().length} yerel sahne türü, ${FIG.types().length} şekil türü; `
  + 'çevrimdışı çizim, sürgü + sürükleme, tek kolon mobil yerleşim ve GeoGebra bağımsızlığı doğru.');
