#!/usr/bin/env node
/* Matematik alanı içerik ve uygulama denetimi.
   Konu anlatımlarının kapsamı, sınav takvimi, sahne tanımları ve index.html bağlantısı doğrulanır. */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

// 1. İçeriği ve dizgi motorunu yükle
const sandbox = { window: {} };
new Function('window', read('matematik-math.js'))(sandbox.window);
new Function('window', read('matematik-figure.js'))(sandbox.window);
new Function('window', read('matematik-content.js'))(sandbox.window);
new Function('window', read('matematik-etkinlikler.js'))(sandbox.window);
new Function('window', read('matematik-sahne.js'))(sandbox.window);
const content = sandbox.window.MATEMATIK_CONTENT;
const M = sandbox.window.MATEMATIK_MATH;
const FIG = sandbox.window.MATEMATIK_FIGURE;
const ACT = sandbox.window.MATEMATIK_ETKINLIKLER;
const SAHNE = sandbox.window.MATEMATIK_SAHNE2;
assert.ok(SAHNE && typeof SAHNE.mount === 'function' && typeof SAHNE.types === 'function',
  'MATEMATIK_SAHNE2 yerel sahne motoru bulunamadı.');
assert.ok(FIG && typeof FIG.render === 'function', 'MATEMATIK_FIGURE.render bulunamadı.');
assert.ok(ACT && typeof ACT.forWeek === 'function', 'MATEMATIK_ETKINLIKLER.forWeek bulunamadı.');
assert.ok(M && typeof M.render === 'function', 'MATEMATIK_MATH.render bulunamadı.');
assert.ok(content && Array.isArray(content.weeks), 'MATEMATIK_CONTENT.weeks bulunamadı.');

const EXPECTED_DATES = [
  '14–18 Eyl', '21–25 Eyl', '28 Eyl–2 Eki', '5–9 Eki', '12–16 Eki', '19–23 Eki',
  '26–30 Eki', '2–6 Kas', '9–13 Kas', '23–27 Kas', '30 Kas–4 Ara', '7–11 Ara',
  '14–18 Ara', '21–25 Ara', '28–31 Ara',
];

// 2. Hafta yapısı
assert.equal(content.weeks.length, 15, 'Matematik 15 hafta olmalı.');
const themes = new Map(content.themes.map((theme) => [theme.id, theme]));
assert.equal(themes.size, 4, 'Dört tema tanımlı olmalı.');

content.weeks.forEach((week, index) => {
  const expectedId = index + 1;
  assert.equal(week.id, expectedId, `Hafta ${expectedId} sırası bozuk.`);
  assert.equal(week.date, EXPECTED_DATES[index], `Hafta ${week.id} tarihi takvimle uyuşmuyor: ${week.date}`);
  assert.ok(themes.has(week.theme), `Hafta ${week.id} geçersiz tema: ${week.theme}`);
  assert.ok(week.topic && week.topic.length > 5, `Hafta ${week.id} konusu eksik.`);

  // Konu anlatımı + çözümlü örnekler birlikte sayılır: metin belirgin biçimde derin olmalı.
  const prose = [...week.summary,
    ...week.examples.flatMap((item) => [...item.steps, item.answer])];
  const words = prose.join(' ').split(/\s+/).filter(Boolean).length;
  assert.ok(words >= 320, `Hafta ${week.id} konu anlatımı çok kısa (${words} kelime).`);
  assert.ok(words <= 800, `Hafta ${week.id} konu anlatımı çok uzun (${words} kelime).`);
  assert.ok(week.summary.length >= 4, `Hafta ${week.id} en az dört paragraf içermeli.`);

  // Her haftada en az iki çözümlü örnek, numaralı adımlar ve sonuç satırı olmalı.
  assert.ok(Array.isArray(week.examples) && week.examples.length >= 2,
    `Hafta ${week.id} en az iki çözümlü örnek içermeli.`);
  week.examples.forEach((item, exampleIndex) => {
    assert.ok(item.title && item.title.length > 3, `Hafta ${week.id} ${exampleIndex + 1}. örnek başlığı eksik.`);
    assert.ok(Array.isArray(item.steps) && item.steps.length >= 3,
      `Hafta ${week.id} ${exampleIndex + 1}. örnek adımları eksik.`);
    assert.ok(item.answer && item.answer.length > 1, `Hafta ${week.id} ${exampleIndex + 1}. örnek sonucu eksik.`);
  });

  assert.ok(week.points.length >= 3 && week.points.length <= 5, `Hafta ${week.id} ana nokta sayısı 3–5 olmalı.`);
  assert.ok(week.terms.length >= 3 && week.terms.length <= 4, `Hafta ${week.id} kavram sayısı 3–4 olmalı.`);
  week.terms.forEach((item) => {
    assert.ok(item.word && item.definition && item.definition.length > 15, `Hafta ${week.id} kavram tanımı eksik.`);
  });
  assert.ok(!Array.isArray(week.tasks) || week.tasks.length === 0,
    `Hafta ${week.id} görev listesi kaldırıldı; görevler etkinlik sorusu olarak yazılır.`);

  // Terimler tek tek anlatılır: her terimin tanımı, yeri ve çoğunda şekli olur.
  week.terms.forEach((item) => {
    assert.ok(item.definition && item.definition.length > 15, `Hafta ${week.id} terim tanımı zayıf: ${item.word}`);
    assert.ok(typeof item.where === 'string', `Hafta ${week.id} teriminde “nerede” alanı yok: ${item.word}`);
    if (item.visual) {
      assert.ok(FIG.types().includes(item.visual), `Hafta ${week.id} bilinmeyen terim şekli: ${item.visual}`);
      assert.ok(FIG.render(item.visual, {}).includes('<svg'), `Hafta ${week.id} terim şekli çizilemedi: ${item.word}`);
    }
  });
  assert.ok(week.terms.filter((item) => item.visual).length >= 2,
    `Hafta ${week.id} en az iki terim şekli göstermeli.`);
  assert.ok(week.checks.length === 2, `Hafta ${week.id} iki kısa kontrol sorusu içermeli.`);
  week.checks.forEach((item, checkIndex) => {
    assert.equal(item.options.length, 3, `Hafta ${week.id} ${checkIndex + 1}. soruda üç seçenek olmalı.`);
    assert.ok(item.correct >= 0 && item.correct < 3, `Hafta ${week.id} doğru şık indeksi hatalı.`);
    assert.ok(item.hint && item.hint.length > 15, `Hafta ${week.id} ${checkIndex + 1}. soruda ipucu zayıf.`);
    assert.ok(item.explain && item.explain.length > 20, `Hafta ${week.id} ${checkIndex + 1}. soruda açıklama zayıf.`);
  });
});

// 2b. Matematik dizgisi: düz metin kesir yok, dengeli $ ve {} var
const studentStrings = content.weeks.flatMap((week) => [
  ...week.summary, ...week.points,
  ...week.terms.map((item) => `${item.word} ${item.definition}`),
  ...week.examples.flatMap((item) => [item.title, ...item.steps, item.answer]),
  ...week.checks.map((item) => `${item.prompt} ${item.options.join(' ')} ${item.hint} ${item.explain}`),
  ...(week.scene ? [week.scene.title, week.scene.hint] : []),
]);
assert.ok(studentStrings.length > 300, 'Öğrenci metinleri eksik.');
studentStrings.forEach((text) => {
  const problems = M.lint(text);
  assert.equal(problems.length, 0, `Dizgi hatası (${problems.join(', ')}): ${text.slice(0, 60)}`);
  const rendered = M.render(text);
  assert.ok(!rendered.includes('$'), `Eşleşmeyen $ işareti: ${text.slice(0, 60)}`);
  assert.ok(!/\\[a-zA-Z]/.test(rendered), `Çözülemeyen TeX komutu kaldı: ${text.slice(0, 60)}`);
});

// Düz metin kesir yazımı (2/3 gibi) kabul edilmez; $ içinde \frac kullanılmalı.
const flatFraction = studentStrings.filter((text) => /(^|[^\d/])\d+\s*\/\s*\d+([^\d/]|$)/.test(text));
assert.equal(flatFraction.length, 0, `Düz metin kesir kullanılmış: ${flatFraction.slice(0, 2).join(' | ')}`);
const typedFraction = studentStrings.filter((text) => text.includes('\\frac')).length;
assert.ok(typedFraction >= 40, `Dizgiyle yazılmış kesir sayısı az (${typedFraction}).`);

// Doğru şıklar tek konumda toplanmamalı.
const correctPositions = new Set(content.weeks.flatMap((week) => week.checks.map((item) => item.correct)));
assert.ok(correctPositions.size >= 2, 'Doğru seçenekler tek konumda toplanmamalı.');

// 3. Öğrenci metninde kitap/sayfa atfı olmamalı
const studentText = content.weeks.map((week) => [
  ...week.summary, ...week.points,
  ...week.terms.map((item) => `${item.word} ${item.definition}`),
  ...week.checks.map((item) => `${item.prompt} ${item.options.join(' ')} ${item.hint} ${item.explain}`),
].join(' ')).join(' ');
assert.ok(!/\bs\.\s?\d/.test(studentText), 'Öğrenci metninde sayfa atfı olmamalı.');
assert.ok(!/ders kitab[ıi]/i.test(studentText), 'Öğrenci metninde ders kitabı atfı olmamalı.');

// 4. Etkileşimli sahneler: birinci taraf SVG motoru (GeoGebra'ya bağımlı değil)
const sceneWeeks = content.weeks.filter((week) => (week.scenes || []).length);
assert.equal(sceneWeeks.length, 15, 'On beş haftanın hepsinde etkileşimli sahne olmalı.');
const allScenes = sceneWeeks.flatMap((week) => week.scenes.map((scene) => ({ week, scene })));
assert.ok(allScenes.length >= 16, `Sahne sayısı az: ${allScenes.length}`);
const sahneTypes = new Set(SAHNE.types());
allScenes.forEach(({ week, scene }) => {
  assert.ok(sahneTypes.has(scene.type), `Hafta ${week.id} bilinmeyen sahne türü: ${scene.type}`);
  assert.ok(scene.title && scene.title.length > 5, `Hafta ${week.id} sahne başlığı eksik.`);
  assert.ok(scene.hint && scene.hint.length > 15, `Hafta ${week.id} sahne ipucu zayıf.`);
  assert.ok(!('commands' in scene) && !('app' in scene),
    `Hafta ${week.id} sahnesi hâlâ GeoGebra komutu kullanıyor; yerel çizim olmalı.`);
  const defaults = new Map(SAHNE.params(scene.type).map((param) => [param.name, param]));
  const params = scene.params || [];
  assert.ok(params.length >= 1, `Hafta ${week.id} sahnesinde oynanabilir parametre olmalı.`);
  params.forEach((param) => {
    assert.ok(defaults.has(param.name), `Hafta ${week.id} ${scene.type} sahnesinde tanımsız parametre: ${param.name}`);
    const base = defaults.get(param.name);
    assert.ok(Number.isFinite(param.min) && Number.isFinite(param.max) && Number.isFinite(param.step),
      `Hafta ${week.id} sürgü tanımı hatalı: ${param.name}`);
    assert.ok(param.min <= base.min && param.max <= base.max && param.min >= base.min,
      `Hafta ${week.id} sürgü aralığı sahne sınırlarını aşıyor: ${param.name}`);
    assert.ok(param.value >= param.min && param.value <= param.max,
      `Hafta ${week.id} sürgü değeri aralık dışında: ${param.name}`);
    assert.ok(param.label && param.label.length > 2, `Hafta ${week.id} sürgü etiketi eksik: ${param.name}`);
  });
});
const sceneTypeList = new Set(allScenes.map((item) => item.scene.type));
assert.ok(sceneTypeList.size >= 16, `Sahne çeşitliliği az: ${sceneTypeList.size} farklı sahne.`);

// 4b. Etkinlikler: çoktan seçmeli + zorunlu açıklama + yapay zekâ değerlendirmesi
const allActivities = content.weeks.flatMap((week) => ACT.forWeek(week.id).map((activity) => ({ week, activity })));
assert.equal(allActivities.length, 30, `Etkinlik sayısı 30 olmalı, ${allActivities.length} bulundu.`);
content.weeks.forEach((week) => {
  const list = ACT.forWeek(week.id);
  assert.ok(list.length >= 2, `Hafta ${week.id} en az iki etkinlik içermeli.`);
});
allActivities.forEach(({ week, activity }) => {
  assert.ok(activity.title && activity.instruction, `Hafta ${week.id} etkinliğinde başlık/yönerge eksik: ${activity.id}`);
  assert.equal(activity.options.length, 3, `${activity.id} üç seçenek içermeli.`);
  assert.ok(activity.correct >= 0 && activity.correct < 3, `${activity.id} doğru şık indeksi hatalı.`);
  assert.ok(activity.minChars >= 40, `${activity.id} açıklama alt sınırı çok düşük.`);
  assert.ok(Array.isArray(activity.rubric) && activity.rubric.length >= 2, `${activity.id} ölçüt listesi eksik.`);
  assert.ok(activity.hint && activity.hint.length > 15, `${activity.id} ipucu eksik.`);
  [activity.prompt, activity.instruction, ...activity.options, ...activity.rubric]
    .forEach((text) => assert.equal(M.lint(text).length, 0, `${activity.id} dizgi hatası: ${text.slice(0, 50)}`));
  if (activity.figure) {
    assert.ok(FIG.types().includes(activity.figure.type), `${activity.id} bilinmeyen şekil: ${activity.figure.type}`);
    assert.ok(FIG.render(activity.figure.type, activity.figure.options || {}).includes('<svg'),
      `${activity.id} şekli çizilemedi.`);
  }
  assert.ok(!('geogebra' in activity), `${activity.id} hâlâ GeoGebra komutu taşıyor.`);
  if (activity.scene) {
    assert.ok(sahneTypes.has(activity.scene.type), `${activity.id} bilinmeyen sahne türü: ${activity.scene.type}`);
    assert.ok(activity.scene.title && activity.scene.title.length > 5, `${activity.id} sahne başlığı eksik.`);
    const defaults = new Map(SAHNE.params(activity.scene.type).map((param) => [param.name, param]));
    (activity.scene.params || []).forEach((param) => {
      assert.ok(defaults.has(param.name), `${activity.id} tanımsız sahne parametresi: ${param.name}`);
      assert.ok(param.value >= param.min && param.value <= param.max, `${activity.id} sürgü değeri aralık dışında: ${param.name}`);
    });
  }
});
const actPositions = new Set(allActivities.map(({ activity }) => activity.correct));
assert.ok(actPositions.size >= 2, 'Etkinliklerde doğru şık tek konumda toplanmamalı.');
// Geometri / 3B haftalarında sorular şekil ya da GeoGebra ile desteklenir.
['geometri'].forEach((themeId) => {
  const items = allActivities.filter(({ week }) => week.theme === themeId);
  const withVisual = items.filter(({ activity }) => activity.figure || activity.scene);
  assert.equal(withVisual.length, items.length,
    `Geometri etkinliklerinde şekil ya da sahne yok: ${items.filter(({ activity }) => !(activity.figure || activity.scene)).map(({ activity }) => activity.id).join(', ')}`);
});
// Kısa kontrol sorularında geometri haftaları şekilsiz kalmamalı.
content.weeks.filter((week) => week.theme === 'geometri').forEach((week) => {
  assert.ok(week.checks.some((item) => item.figure), `Hafta ${week.id} kısa kontrolünde şekil yok.`);
  week.checks.filter((item) => item.figure).forEach((item) => {
    assert.ok(FIG.types().includes(item.figure), `Hafta ${week.id} bilinmeyen soru şekli: ${item.figure}`);
  });
});

// 5. Uygulama tarafı
const app = read('matematik.js');
const html = read('index.html');
const css = read('matematik.css');

assert.ok(/id="mathWorkspace"/.test(html), 'index.html matematik çalışma alanını içermeli.');
assert.ok(/id="mathWeekList"/.test(html), 'Hafta listesi kapsayıcısı bulunmalı.');
assert.ok(/id="mathWeekContent"/.test(html), 'Hafta içeriği kapsayıcısı bulunmalı.');
assert.ok(/matematik-content\.js/.test(html) && /matematik\.js/.test(html), 'Matematik scriptleri index.html içinde olmalı.');
assert.ok(html.indexOf('matematik-math.js') >= 0 && html.indexOf('matematik-math.js') < html.indexOf('matematik-content.js'),
  'Dizgi motoru içerikten önce yüklenmeli.');
assert.ok(/matematik\.css/.test(html), 'Matematik stil dosyası bağlanmalı.');
assert.ok(/isMath/.test(html), 'Ders seçimi matematik alanını göstermeli.');
assert.ok(!/data-subject="matematik"[\s\S]{0,120}Yakında/.test(html), 'Matematik düğmesi artık “Yakında” olmamalı.');
assert.ok(/<b>1\. Sınav:<\/b> <strong>5 Kasım 2026<\/strong>/.test(html), 'Matematik 1. sınav kartı 5 Kasım 2026 olmalı.');
assert.ok(/<b>2\. Sınav:<\/b> <strong>tahmini 4–8 Ocak 2027<\/strong>/.test(html), 'Matematik 2. sınav kartı tahmini tarih olmalı.');

assert.ok(/5 Kasım 2026/.test(app), 'Uygulama sınav tarihini bilmeli.');
assert.ok(/emr7lect\.matematik\.v1/.test(app), 'İlerleme ayrı anahtarda saklanmalı.');
assert.ok(/MATEMATIK_SAHNE2/.test(app), 'Uygulama yerel sahne motorunu kullanmalı.');
assert.ok(!/MATEMATIK_GEOGEBRA/.test(app), 'Uygulama artık GeoGebra’ya bağımlı olmamalı.');
assert.ok(/matematik-sahne\.js/.test(html), 'index.html yerel sahne motorunu yüklemeli.');
assert.ok(html.indexOf('matematik-sahne.js') < html.indexOf('matematik.js'),
  'Sahne motoru uygulamadan önce yüklenmeli.');
assert.ok(!/matematik-geogebra\.js/.test(html), 'index.html GeoGebra betiğini yüklememeli.');
assert.ok(!/youtube\.com|youtu\.be/.test(app + css), 'Matematik alanında YouTube bağlantısı olmamalı.');
assert.ok(/math-week-content\{display:grid/.test(css), 'Hafta içeriği ızgara yerleşimi tanımlı olmalı.');
assert.ok(/\.math-scene-svg\{/.test(css), 'Yerel sahne SVG stili tanımlı olmalı.');
assert.ok(/\.math-scene-stage\{/.test(css), 'Sahne çizim alanı stili tanımlı olmalı.');
assert.ok(/\.scene-slider\{/.test(css), 'Sahne sürgü bandı stili tanımlı olmalı.');
assert.ok(/\.m-frac\{/.test(css) && /\.m-num\{/.test(css) && /\.m-den\{/.test(css) && /\.m-radicand\{/.test(css),
  'Dizgi sınıflarının stilleri tanımlı olmalı.');
assert.ok(/\.math-scene-frame\{display:flex;flex-direction:column/.test(css),
  'Sahne çerçevesi dikey yerleşimde olmalı: çizim üstte, giriş bandı altta.');
assert.ok(/\.math-scene-controls\{flex:0 0 auto/.test(css),
  'Yedek sürgü paneli sahnenin altında kalmalı.');
assert.ok(/\.math-example\{/.test(css) && /\.math-example-steps\{/.test(css), 'Çözümlü örnek kartı stilleri tanımlı olmalı.');
assert.ok(/math-scene-controls/.test(app), 'Sürgü bandı sahnenin altında tanımlı olmalı.');
assert.ok(/math-scene-frame/.test(app) && /math-scene-frame/.test(css), 'Sahne çerçevesi (çizim + giriş bandı) tanımlı olmalı.');
assert.ok(/mathEtkinlik\b|mathActivities/.test(app), 'Etkinlik bölümü hafta içeriğine bağlanmalı.');
assert.ok(/MATEMATIK_ETKINLIK/.test(app), 'Etkinlik modülü çağrılmalı.');
const etkinlik = read('matematik-etkinlik.js');
assert.ok(/EKR7|EMR7_AI_GRADER|api\/groq|api\.groq\.com/.test(etkinlik), 'Etkinlik değerlendirmesi ortak Groq ayarlarını kullanmalı.');
assert.ok(/#apiKey|getElementById\('apiKey'\)/.test(etkinlik), 'Etkinlik değerlendirmesi ortak API anahtarını okumalı.');
assert.ok(/doğru (cevap|seçenek|şık)/i.test(etkinlik) && /ASLA yazma|ASLA/.test(etkinlik), 'Yapay zekâ istemi cevabı sızdırmamalı.');
assert.ok(/data-math-etkinlik-text/.test(read('matematik-etkinlik.js')) || /textarea/.test(read('matematik-etkinlik.js')), 'Etkinlikte açıklama alanı olmalı.');
assert.ok(/figure|MATEMATIK_FIGURE/.test(app), 'Hafta içeriğinde şekiller kullanılmalı.');
assert.ok(/\.math-term-card\{/.test(css) && /\.math-etkinlik-option\{/.test(css), 'Terim ve etkinlik stilleri tanımlı olmalı.');
assert.ok(/#mathActivities/.test(read('activity-cards.css')), 'Etkinlik kartı görünümü matematik alanına da uygulanmalı.');
assert.ok(/MATEMATIK_MATH/.test(app), 'Uygulama dizgi motorunu kullanmalı.');

console.log(`Matematik içeriği geçti: 15 hafta, 4 tema, ${allScenes.length} etkileşimli sahne, `
  + `${allActivities.length} etkinlik (açıklama zorunlu), `
  + `${content.weeks.reduce((total, week) => total + week.checks.length, 0)} kısa kontrol sorusu, `
  + `${content.weeks.reduce((total, week) => total + week.terms.filter((item) => item.visual).length, 0)} terim şekli; `
  + 'dizgi, sınav takvimi ve index.html bağlantıları doğru.');
