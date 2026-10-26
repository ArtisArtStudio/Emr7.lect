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
const kitap = read('matematik-kitap.js');
const etkinlikler = read('matematik-etkinlikler.js');
const css = read('matematik.css');
const html = read('index.html');

// 1. Motor sözleşmesi
assert.ok(SAHNE && typeof SAHNE.mount === 'function', 'MATEMATIK_SAHNE2.mount bulunamadı.');
assert.ok(typeof SAHNE.types === 'function' && typeof SAHNE.params === 'function', 'Sahne motoru tür ve parametre listesi vermeli.');
assert.equal(SAHNE.width, 640, 'Sahne tuvali 640 birim geniş olmalı.');
assert.equal(SAHNE.height, 380, 'Sahne tuvali 380 birim yüksek olmalı.');
assert.ok(SAHNE.types().length >= 24, `Sahne türü sayısı az: ${SAHNE.types().length}`);
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
[scene, figure, app, kitap, etkinlikler].forEach((source, index) => {
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
// Sürgü ve çizim aynı aralığı kullanmalı: değer kırpılır, adıma oturur, ölü bölge kalmaz.
assert.ok(/function clampValue/.test(scene), 'Sahne değerleri aralığa ve adıma oturtulmalı.');
assert.ok(/clampValue\(param\.value, param\.min, param\.max, param\.step\)/.test(scene), 'Sahne başlangıç değeri normalize edilmeli.');
assert.ok(/function numberAxis/.test(scene), 'Sayı doğrusu tek yardımcıdan çizilmeli.');
assert.ok(/valueAt\(/.test(scene), 'Sürükleme eksenle aynı dönüşümü kullanmalı.');
assert.ok(/querySelectorAll\('\[data-handle\]'\)/.test(scene), 'Her sürüklenebilir nokta bağlanmalı.');
['sayi-dogrusu', 'iki-sayi'].forEach((type) => {
  assert.ok(/numberAxis\(\{ min: -7, max: 7/.test(scene), `${type} ekseni sürgü aralığıyla aynı olmalı.`);
});
assert.equal(SAHNE.params('iki-sayi').length, 2, 'İki sayı sahnesinde iki sürgü olmalı.');
assert.ok(/data-handle="b"|handle\('b'/.test(scene), 'İki sayı sahnesinde b noktası da sürüklenebilmeli.');
// Toplama yolu: her adım kendi şeridinde, işaret adım farkından gelir.
assert.ok(/const lane = 236 - index \* 34/.test(scene), 'Toplama adımları ayrı şeritlerde çizilmeli.');
assert.ok(/delta >= 0 \? '\+' : '−'/.test(scene), 'Adım etiketi farkın işaretini göstermeli.');
/* Sahne değerleri kırpılır ve adıma oturur. */
const odd = SAHNE.render('sayi-dogrusu', { a: 9.6 });
assert.ok(/a = 7/.test(odd), 'Aralık dışı değer en yakın sınıra oturmalı.');

/* Katıl-Uygula sahneleri: çizimde sonuç yazılmaz, cevap öğrencide kalır. */
['kesir-dogru', 'kesir-isaret', 'kesir-toplam', 'kesir-carpim', 'kat-yerlestir', 'asansor-kat'].forEach((type) => {
  assert.ok(SAHNE.types().includes(type), `${type} sahnesi bulunamadı.`);
});
const sceneText = (type, values) => (SAHNE.render(type, values || {}).match(/<text[^>]*>[^<]*<\/text>/g) || [])
  .map((node) => node.replace(/<[^>]+>/g, '')).join(' | ');
const noResult = {
  'sifir-toplama': /Toplam = \?/,
  'sicaklik': /Küçükten büyüğe: \?/,
  'sayma-pullari': /Toplam = \( \+\d+ \) \+ \( −\d+ \) = \?/,
  'isaret-kurali': /a · b = \([−-]?\d+\) · \([−-]?\d+\) = \?/,
  'prizma3b': /Hacim = \d+·\d+·\d+ = \?/,
  'acim': /= \?/,
  'hacim': /Hacim = \?/,
  'birim-donusum': /= \? dm³/,
  'veri-grafik': /açıklık \?/,
  'ortalama': /Ortanca: \? · Açıklık: \?/,
  'yansima': /A'\(\?, \?\)/,
  'kesir-isaret': /Değerini ve nedenini sen yaz/,
  'uc-gorunum': /kaç kare\? Sen yaz/,
  'kesir-toplam': /Payı sen yaz/,
  'kesir-carpim': /Boyanan: \d+ × \d+ = \?/,
};
Object.keys(noResult).forEach((type) => {
  const drawn = sceneText(type);
  assert.ok(noResult[type].test(drawn), `${type} sahnesi sonucu öğrenciye bırakmıyor: ${drawn.slice(0, 120)}`);
});
// Payda kadar ara çentik: ana çentik tam sayı, aralar eş parça.
const axisSvg = SAHNE.render('kesir-dogru', { tam: 0, pay: 3, payda: 5 });
assert.ok((axisSvg.match(/<line[^>]*stroke="#8b97a8"/g) || []).length >= 30, 'Sayı doğrusunda ara çentikler çizilmeli.');
assert.ok(/ana çentik/i.test(sceneText('kesir-dogru')), 'Sayı doğrusu ana/ara çentik ayrımını anlatmalı.');
// Sürükleme yalnız ara çentiklere oturur.
assert.ok(/clampValue\(raw, -3 \+ 1 \/ payda, 3, 1 \/ payda\)/.test(scene), 'Kesir işareti yalnız $1/payda$ adımlarına oturmalı.');
// Eksi işareti üç yere taşınabilir, değer yazılmaz.
assert.ok(/Eksi işaretini taşı/.test(sceneText('kesir-isaret')), 'Eksi işareti sürüklenebilmeli.');
assert.ok(!/değer/i.test(sceneText('kesir-isaret')) || !/=\s*\d/.test(sceneText('kesir-isaret')), 'Eksi işareti sahnesi değeri yazmamalı.');
// Kat sahneleri: sürükle-bırak, cevap yazılmaz.
['kat-yerlestir', 'asansor-kat'].forEach((type) => {
  assert.ok(SAHNE.params(type).some((param) => /kat/i.test(param.name)), `${type} kat sürgüsü taşımalı.`);
  assert.ok(/sürükle/i.test(sceneText(type)), `${type} sürükleme yönergesi vermeli.`);
});
// Şerit toplama ve alan modeli: toplam/çarpım sonucu yazılmaz.
assert.ok(/Payı sen yaz/.test(sceneText('kesir-toplam')), 'Kesir toplamı sonucu öğrenciye bırakmalı.');
assert.ok(/=\s*\?/.test(sceneText('kesir-carpim')), 'Alan modeli çarpım sonucunu yazmamalı.');
// Aşamalı çözüm: yol haritası + ilk iki basamak açık, kalanı kapalı.
assert.ok(/math-solution-map/.test(app), 'Çözüm yol haritası basılmalı.');
assert.ok(/<details class="math-solution">/.test(app), 'Son basamaklar kapalı olmalı.');
assert.ok(/Cevabı göster/.test(app), 'Kapalı bölümün başlığı “Cevabı göster” olmalı.');


// 4. Şekil motoru: tüm türler çizilir, bozuk değer üretmez
assert.ok(FIG && typeof FIG.render === 'function', 'MATEMATIK_FIGURE.render bulunamadı.');
assert.ok(FIG.types().length >= 41, `Şekil türü sayısı az: ${FIG.types().length}`);
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

// 7. Kitabın bölüm akışı uygulamada görünür
['NELER BİLİYORUZ?', 'BAŞLAYALIM', 'ÖĞRENELİM', 'DÜŞÜN-TARTIŞ-AÇIKLA', 'KATIL-UYGULA-KEŞFET', 'UYGULAYALIM', 'PROBLEM'].forEach((label) => {
  assert.ok(app.includes(label), `Bölüm adı uygulamada yok: ${label}`);
});
assert.ok(/NELER ÖĞRENDİK\?/.test(app), 'NELER ÖĞRENDİK? bölümü basılmalı.');
assert.ok(/TEMA ÖLÇME/.test(app), 'Tema ölçme kartı basılmalı.');
assert.ok(/PERFORMANS GÖREVİ/.test(app), 'Performans görevi kartı basılmalı.');
assert.ok(/BİLGİ KUTUSU/.test(app), 'Bilgi kutuları basılmalı.');
assert.ok(/forStage/.test(app) && /forStage/.test(etkinlikler), 'Soru listesi bölüm bazında bağlanmalı.');
assert.ok(/mountQuestions/.test(app) && /mountQuestions/.test(read('matematik-etkinlik.js')),
  'Açıklamalı soru motoru bölümlere bağlanmalı.');
assert.ok(/mathWeekBook/.test(app) || /math-week-book/.test(css), 'Hafta başlığı kitap akışını göstermeli.');
assert.ok(/<p class="math-week-book">/.test(app), 'Hafta başlığında kitap akışı satırı olmalı.');
assert.ok(!/s\.\s?\d{2,3}/.test(app) && !/sayfa \d/.test(app), 'Öğrenci metninde sayfa numarası olmamalı.');
assert.ok(/matematik-kitap\.js/.test(html), 'index.html kitap akışı dosyasını yüklemeli.');
assert.ok(html.indexOf('matematik-kitap.js') < html.indexOf('matematik-etkinlikler.js'),
  'Kitap akışı etkinlik türeticisinden önce yüklenmeli.');

// 8. Belge
const notices = read('THIRD-PARTY-NOTICES.md');
const analysis = read('docs/MATEMATIK-KITAP-ANALIZI.md');
assert.ok(/GeoGebra/i.test(notices), 'THIRD-PARTY-NOTICES.md GeoGebra notunu korumalı.');
assert.ok(/yerel SVG/.test(analysis), 'Analiz dokümanı yerel sahne kararını anlatmalı.');

console.log(`Matematik denetimi geçti: ${SAHNE.types().length} yerel sahne türü, ${FIG.types().length} şekil türü; `
  + 'çevrimdışı çizim, sürgü + sürükleme, tek kolon mobil yerleşim ve GeoGebra bağımsızlığı doğru.');
