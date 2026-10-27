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
assert.ok(!/geogebra/i.test(scene + figure + kitap), 'Yerel sahne, şekil ve kitap dosyaları GeoGebra çağırmamalı.');
assert.ok(!fs.existsSync(path.join(root, 'matematik-yerel-sahne.js')), 'Eski yedek sahne dosyası geri gelmemeli.');

// 2b. GeoGebra yalnız üç boyutlu cisimlerde; her zaman yerel yedekli
const ggbPath = path.join(root, 'matematik-geogebra.js');
assert.ok(fs.existsSync(ggbPath), 'GeoGebra köprüsü (matematik-geogebra.js) bulunmalı.');
const ggb = read('matematik-geogebra.js');
assert.ok(/deployggb\.js/.test(ggb), 'GeoGebra resmî yükleyicisinden gelmeli (deployggb.js).');
assert.ok(/const LOAD_TIMEOUT = 12000/.test(ggb), 'Yükleme için 12 sn zaman aşımı olmalı.');
assert.ok(/BUILD_DELAYS = \[0, 300, 900, 2000\]/.test(ggb), 'Komutlar kademeli yeniden denenmeli.');
assert.ok(/getObjectNumber\(\)/.test(ggb) && /api\.exists\(/.test(ggb), 'Nesne sayısı ve varlığı doğrulanmalı.');
assert.ok(/çizimi oluşturamadı/.test(ggb), 'Boş tuval sessiz kalmamalı, durum satırına yazılmalı.');
assert.ok(/fallback/.test(ggb) && /MATEMATIK_SAHNE2\.mount/.test(app),
  'GeoGebra açılamazsa aynı sahne yerel SVG ile çizilmeli.');
assert.ok(/math-ggb-credit/.test(app) && /ticari olmayan kullanım/.test(app), 'Atıf satırı sahnede görünmeli.');
assert.ok(/showFullscreenButton: false/.test(ggb), 'GeoGebra tam ekran düğmesi kapalı olmalı.');
assert.ok(/showToolBar: false/.test(ggb) && /showAlgebraInput: false/.test(ggb), 'Araç çubuğu ve cebir girişi kapalı olmalı.');
assert.ok(/showMenuBar: false/.test(ggb) && /allowStyleBar: false/.test(ggb), 'Menü ve stil çubuğu kapalı olmalı.');
assert.ok(/setPrefers/.test(ggb) && /localStorage/.test(ggb), 'GeoGebra açma/kapama tercihi saklanmalı.');
assert.ok(/Yerel çizime geç/.test(app) && /GeoGebra ile aç/.test(app), 'Sahne içinde motor değiştirme düğmesi olmalı.');
/* Komut adları yerelleştirilmiş arayüzde değişmesin diye applet dili sabit. */
assert.ok(/language: 'en'/.test(ggb), 'GeoGebra komutları için applet dili sabitlenmeli.');
assert.ok(/is-ggb/.test(css), 'GeoGebra kutusu için ayrı yerleşim sınıfı tanımlı olmalı.');
/* 3B uygulamasına perspektif komutu uygulanmaz: tuval boş kalıyordu. */
const ggb3d = ggb.slice(ggb.indexOf("appName: '3d'") - 200, ggb.indexOf("appName: '3d'") + 2400);
assert.ok(!/SetPerspective\("G"\)/.test(ggb3d) || /3B uygulamasında perspektif/.test(ggb),
  '3B sahnede grafik perspektifi zorlanmamalı.');
/* GeoGebra yalnız 3B cisimlerde: prizma, hacim, birim küp, üç görünüm, açınım.
   Diğer sahneler yerel SVG ile çizilir; her 3B sahnenin de yerel yedeği vardır. */
load('matematik-geogebra.js');
const GG = sandbox.window.MATEMATIK_GEOGEBRA;
assert.ok(GG && typeof GG.mount === 'function' && typeof GG.script === 'function',
  'MATEMATIK_GEOGEBRA köprüsü yüklenemedi.');
const localTypes = SAHNE.types();
const geoTypes = GG.types();
/* kup-dondur: eş küp yapısı serbest döndürülerek incelenir (görünüm sorusu). */
const GEO_3D = ['prizma3b', 'hacim', 'birim-donusum', 'uc-gorunum', 'bilesik-hacim', 'kup-dondur', 'duzensiz-yigin', 'acim'];
assert.deepEqual(geoTypes.slice().sort(), GEO_3D.slice().sort(),
  `GeoGebra yalnız 3B cisim sahnelerinde olmalı: ${geoTypes.join(', ')}`);
GEO_3D.forEach((type) => {
  assert.ok(localTypes.includes(type), `${type} için yerel yedek sahne korunmalı.`);
  const local = SAHNE.params(type).map((param) => param.name);
  const geo = GG.params(type).map((param) => param.name);
  assert.deepEqual(geo, local, `${type} sürgüleri iki motorda aynı olmalı.`);
});
/* 2B sahneler GeoGebra'ya bağlanmamalı. */
localTypes.filter((type) => !GEO_3D.includes(type)).forEach((type) => {
  assert.ok(!geoTypes.includes(type), `${type} 2B sahnesi GeoGebra ile açılmamalı.`);
});
assert.ok(/\.is-ggb/.test(css) || /is-ggb/.test(css), 'GeoGebra kutusu için yerleşim sınıfı tanımlı olmalı.');
/* Çerçeve: yükleme yazısı kaplama, tuval kareye yakın ve en az 300 px. */
assert.ok(/\.math-ggb-loading\{position:absolute/.test(css), 'Yükleme yazısı kaplama olmalı; üstte şerit bırakmamalı.');
assert.ok(/height:clamp\(300px/.test(css), 'GeoGebra tuvali en az 300 px yüksekliğinde olmalı.');
assert.ok(/max-width:480px/.test(css), 'Tuval dar ve uzun olmamalı; genişlik sınırlı olmalı.');
/* 3B görünüm düğmeleri ve açınım düğmesi. */
assert.ok(/SetViewDirection/.test(ggb) && /data-ggb-view/.test(ggb), 'Ön/yan/üst görünüm düğmeleri olmalı.');
assert.ok(/data-ggb-net/.test(ggb) && /Açınımı aç/.test(ggb), 'Açınım düğmesi ve dokunma ile katlama olmalı.');
assert.ok(/math-ggb-ortho/.test(ggb) && /math-ggb-views/.test(ggb), 'Üç görünüm bölünmüş panelde gösterilmeli.');
assert.ok(GG.hasSplit('uc-gorunum') && GG.hasNet('acim'), 'Bölünmüş görünüm ve açınım sahneleri tanımlı olmalı.');
assert.ok(GG.hasSplit('duzensiz-yigin'), 'Düzensiz yığın da bölünmüş görünümle açılmalı (ön · yan · üst).');

/* Birim küpler tek tek görünmeli: hacim sahneleri her küpü ayrı nesne olarak kurar. */
['hacim', 'bilesik-hacim', 'duzensiz-yigin'].forEach((type) => {
  const commands = GG.script(type, {});
  const cubes = commands.filter((command) => /=\s*Cube\(/.test(command));
  assert.ok(cubes.length >= 4, `${type}: birim küpler ayrı ayrı kurulmalı (${cubes.length} küp).`);
  assert.ok(cubes.every((command) => /Vector\(\(0, 0, 1\)\)/.test(command)),
    `${type}: küpler z eksenine oturmalı, ızgara kaymamalı.`);
});
/* Düzensiz yığının izdüşümleri gerçek siluet olmalı: boş kare bulunmalı. */
/* GeoGebra çerçevesi sade olmalı: soldaki cebir/parametre paneli kapatılır. */
assert.ok(/function stripChrome/.test(ggb), 'GeoGebra çerçevesi sadeleştirilmeli (stripChrome).');
assert.ok(/perspective: 'T'/.test(ggb), 'Applet 3B görünümle açılmalı (perspective: T).');
assert.ok(/setPerspective\('-A'\)/.test(ggb), 'Soldaki cebir paneli kapatılmalı.');

/* Ön, yan ve üst yüzler ayrı tonlarda: tek renkli blok kabul edilmez. */
const frontColor = /front: \[(\d+), (\d+), (\d+)\]/.exec(ggb);
const sideColor = /side: \[(\d+), (\d+), (\d+)\]/.exec(ggb);
const topColor = /top: \[(\d+), (\d+), (\d+)\]/.exec(ggb);
assert.ok(frontColor && sideColor && topColor, 'Yüz renkleri (ön/yan/üst) tanımlı olmalı.');
assert.notDeepEqual(frontColor.slice(1), sideColor.slice(1), 'Ön ve yan yüz aynı renkte olmamalı.');
assert.notDeepEqual(sideColor.slice(1), topColor.slice(1), 'Yan ve üst yüz aynı renkte olmamalı.');
assert.ok(/faces\(/.test(ggb), 'Prizma yüzleri ayrı ayrı çizilmeli (faces).');
/* Tam dik “üst” bakış GeoGebra’yı donduruyordu; yön küçük eğimli olmalı.
   Ayrıca SetViewDirection(Vector(v)) gözü -v yönüne koyar: üst bakış için v aşağıyı
   göstermeli (-1), alt bakış için yukarıyı (+1). Alt/üst karışmasın. */
assert.ok(/ust: 'Vector\(\(0\.\d+, -0\.\d+, -1\)\)'/.test(ggb),
  'Üst görünümde bakış vektörü aşağıyı göstermeli (göz yukarıda).');
assert.ok(/alt: 'Vector\(\(0\.\d+, -0\.\d+, 1\)\)'/.test(ggb),
  'Alt görünümde bakış vektörü yukarıyı göstermeli (göz aşağıda).');
assert.ok(/egik: 'Vector\(\(-[\d.]+, [\d.]+, -[\d.]+\)\)'/.test(ggb),
  'Eğik bakış yukarıdan olmalı (bakış vektörünün z değeri negatif).');

assert.ok(/stackViewPanels/.test(ggb) && /stackHeights/.test(ggb),
  'Düzensiz yığın görünümleri yükseklik tablosundan üretilmeli.');
assert.ok(/ortho\(values\)/.test(ggb) || /conf\.ortho/.test(ggb),
  'Bölünmüş panel appletin kendi izdüşümünü kullanmalı.');

/* Sürgü yoklaması: her sahne için uç değerlerde üretilen GeoGebra komutları denetlenir.
   Nokta ondalığı, dengeli parantez, beyaz listedeki komutlar ve tanımlı nesne adları. */
const GEO_COMMANDS = new Set([
  'Slider', 'SetValue', 'SetVisibleInView', 'SetCaption', 'SetLabelMode', 'SetFixed',
  'SetLineThickness', 'SetLineStyle', 'SetPointSize', 'SetFilling', 'Delete', 'Text',
  'SetLabelVisible', 'ShowAxes', 'ShowGrid', 'SetViewDirection', 'SetColor',
  'Segment', 'Polygon', 'Circle', 'Vector', 'BarChart', 'Sequence', 'Cube', 'If',
  'Ray', 'Line', 'Reflect', 'Midpoint', 'PerpendicularBisector', 'AngleBisector', 'Min',
  'Element', 'SetColor',
  'abs', 'cos', 'sin', 'pi', 'Point',
]);
GEO_3D.forEach((type) => {
  const base = GG.params(type);
  const combos = [{}];
  base.forEach((param) => {
    combos.push({ [param.name]: param.min });
    combos.push({ [param.name]: param.max });
  });
  combos.push(Object.fromEntries(base.map((param) => [param.name, param.min])));
  combos.push(Object.fromEntries(base.map((param) => [param.name, param.max])));
  combos.forEach((values) => {
    const commands = GG.script(type, values);
    const where = `${type} ${JSON.stringify(values)}`;
    assert.ok(commands.length >= 4, `${where}: GeoGebra komutu üretilmedi.`);
    const defined = new Set();
    commands.forEach((command) => {
      /* Etiket metinleri (tırnak içi) serbest; sayısal ifadeler nokta ondalıklı ve ASCII olmalı. */
      const bare = command.replace(/"[^"]*"/g, '""');
      assert.ok(!/[−–—]/.test(bare), `${where}: tipografik eksi GeoGebra komutunda geçersiz → ${command}`);
      assert.ok(!/\d,\d/.test(bare), `${where}: virgüllü ondalık GeoGebra komutunda geçersiz → ${command}`);
      const open = (bare.match(/\(/g) || []).length;
      const close = (bare.match(/\)/g) || []).length;
      assert.equal(open, close, `${where}: parantezler dengeli değil → ${command}`);
      assert.ok(!/undefined|NaN|null/.test(bare), `${where}: tanımsız değer → ${command}`);
      const assign = /^([A-Za-z_][A-Za-z0-9_]*)\s*=/.exec(command);
      if (assign) defined.add(assign[1]);
      [...bare.matchAll(/\b([A-Za-z][A-Za-z0-9]*)\s*\(/g)].forEach((match) => {
        const name = match[1];
        assert.ok(GEO_COMMANDS.has(name), `${where}: bilinmeyen GeoGebra komutu → ${name} (${command})`);
      });
    });
    GG.required(type).forEach((label) => {
      assert.ok(defined.has(label), `${where}: zorunlu nesne tanımlanmadı → ${label}`);
    });
    /* Görsel kalite: eksen ve ızgara kapalı, nokta işaretleri küçük ve etiketsiz,
       yüzler tek renk değil (ön/yan/üst ayrı ton). */
    assert.ok(commands.includes('ShowAxes(false)'), `${where}: eksen kapatılmalı.`);
    assert.ok(commands.includes('ShowGrid(false)'), `${where}: ızgara kapatılmalı.`);
    assert.ok(commands.some((command) => /^SetPointSize\(/.test(command)), `${where}: nokta boyutu ayarlanmalı.`);
    assert.ok(commands.some((command) => /^SetLabelVisible\(/.test(command)), `${where}: nesne etiketleri kapatılmalı.`);
  });
});

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
assert.ok((axisSvg.match(/<line[^>]*stroke="#5f6f86"/g) || []).length >= 30, 'Sayı doğrusunda ara çentikler çizilmeli.');
assert.ok(/ana çentik/i.test(sceneText('kesir-dogru')), 'Sayı doğrusu ana/ara çentik ayrımını anlatmalı.');
// Kesir etiketi kesir çizgisiyle birlikte çizilir (çizgi görünmezse etiket "alakasız sayı" gibi durur).
assert.ok(/stroke="#4a3d7a" stroke-width="2.6"/.test(axisSvg), 'Kesir etiketinde kesir çizgisi görünür kalınlıkta olmalı.');
assert.ok(!/işaret [−-]?\d+,\d+ noktasında/.test(sceneText('kesir-dogru')), 'Sahne işaretin ondalık değerini yazmamalı.');
// Sürgü ile çizim aynı sayıyı göstersin: pay paydadan büyük olamaz.
assert.ok(/normalize\(state\)/.test(scene), 'kesir-dogru sürgü değerlerini kendi düzeltmeli.');
const overflow = sceneText('kesir-dogru', { tam: 0, pay: 9, payda: 2 });
assert.ok(!/\b9\b/.test(overflow), 'Pay paydadan büyükse sürgü değeri kırpılmalı (pay en çok payda-1).');
assert.ok(/1 ÷ 2/.test(overflow), 'Ara çentik ölçüsü paydaya göre yazılmalı.');
// Çizim cevap yazmaz: hacim birimküp sayısını, kesir şeridi ondalık/yüzdeyi söylemez.
assert.ok(!/= \d+ birimküp/.test(SAHNE.render('hacim', { a: 3, b: 2, h: 2 })), 'Hacim sahnesi cevabı yazmamalı.');
assert.ok(!/%\d/.test(SAHNE.render('kesir-serit', { d: 4, n: 3 })), 'Kesir şeridi yüzde karşılığını yazmamalı.');
// Sürükleme yalnız ara çentiklere oturur.
assert.ok(/clampValue\(raw, min \+ 1 \/ payda, max - 1, 1 \/ payda\)/.test(scene), 'Kesir işareti yalnız $1/payda$ adımlarına oturmalı.');
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

/* SVG koordinatları nokta ondalıklı olmalı: "126,5" ve tipografik eksi geçersizdir,
   tarayıcı özniteliği atar ve nesne (0,0)'a düşer. Bu, "sayılar sapıtıyor" hatasının köküydü. */
const PLAIN_ATTRS = /(?:^|\s)(x|y|cx|cy|r|x1|y1|x2|y2|width|height)="([^"]*)"/g;
const POINTS_ATTR = /points="([^"]*)"/g;
const numericOk = (value) => /^-?\d+(\.\d+)?$/.test(value);
function assertCleanCoords(kind, svg) {
  let match;
  PLAIN_ATTRS.lastIndex = 0;
  while ((match = PLAIN_ATTRS.exec(svg))) {
    assert.ok(numericOk(match[2]), `${kind}: ${match[1]}="${match[2]}" geçersiz koordinat.`);
  }
  POINTS_ATTR.lastIndex = 0;
  while ((match = POINTS_ATTR.exec(svg))) {
    match[1].trim().split(/\s+/).forEach((pair) => {
      const parts = pair.split(',');
      assert.equal(parts.length, 2, `${kind}: "${pair}" nokta çifti bozuk.`);
      parts.forEach((value) => assert.ok(numericOk(value), `${kind}: nokta değeri "${value}" geçersiz.`));
    });
  }
}
SAHNE.types().forEach((type) => {
  const params = SAHNE.params(type);
  const combos = [{}];
  params.forEach((param) => {
    combos.push({ [param.name]: param.min });
    combos.push({ [param.name]: param.max });
  });
  combos.push(Object.fromEntries(params.map((param) => [param.name, param.min])));
  combos.push(Object.fromEntries(params.map((param) => [param.name, param.max])));
  combos.forEach((values) => assertCleanCoords(type, SAHNE.render(type, values)));
});
FIG.types().forEach((type) => assertCleanCoords(`şekil ${type}`, FIG.render(type, {})));
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
assert.ok(/ticari olmayan/i.test(notices) && /geogebra\.org/i.test(notices),
  'Atıf notu ticari olmayan kullanım ve geogebra.org bağlantısını içermeli.');
assert.ok(/yerel SVG/.test(analysis), 'Analiz dokümanı yerel sahne kararını anlatmalı.');

console.log(`Matematik denetimi geçti: ${GG.types().length} GeoGebra 3B appleti, `
  + `${SAHNE.types().length} yerel sahne, ${FIG.types().length} şekil türü; sürgü koordinatları, `
  + 'sürükleme, tek kolon mobil yerleşim, GeoGebra komut geçerliliği ve yerel yedek kuralı doğru.');
