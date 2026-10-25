#!/usr/bin/env node
/* Matematik alanı içerik ve uygulama denetimi.
   Konu anlatımlarının kapsamı, sınav takvimi, sahne tanımları ve index.html bağlantısı doğrulanır. */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

// 1. İçeriği yükle
const sandbox = { window: {} };
const contentCode = read('matematik-content.js');
new Function('window', contentCode)(sandbox.window);
const content = sandbox.window.MATEMATIK_CONTENT;
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

  const words = week.summary.join(' ').split(/\s+/).filter(Boolean).length;
  assert.ok(words >= 250, `Hafta ${week.id} konu anlatımı çok kısa (${words} kelime).`);
  assert.ok(words <= 520, `Hafta ${week.id} konu anlatımı çok uzun (${words} kelime).`);
  assert.ok(week.summary.length >= 4, `Hafta ${week.id} en az dört paragraf içermeli.`);

  assert.ok(week.points.length >= 3 && week.points.length <= 5, `Hafta ${week.id} ana nokta sayısı 3–5 olmalı.`);
  assert.ok(week.terms.length >= 3 && week.terms.length <= 4, `Hafta ${week.id} kavram sayısı 3–4 olmalı.`);
  week.terms.forEach((item) => {
    assert.ok(item.word && item.definition && item.definition.length > 15, `Hafta ${week.id} kavram tanımı eksik.`);
  });
  assert.ok(week.tasks.length === 3, `Hafta ${week.id} üç görev içermeli.`);
  assert.ok(week.checks.length === 2, `Hafta ${week.id} iki kısa kontrol sorusu içermeli.`);
  week.checks.forEach((item, checkIndex) => {
    assert.equal(item.options.length, 3, `Hafta ${week.id} ${checkIndex + 1}. soruda üç seçenek olmalı.`);
    assert.ok(item.correct >= 0 && item.correct < 3, `Hafta ${week.id} doğru şık indeksi hatalı.`);
    assert.ok(item.hint && item.hint.length > 15, `Hafta ${week.id} ${checkIndex + 1}. soruda ipucu zayıf.`);
    assert.ok(item.explain && item.explain.length > 20, `Hafta ${week.id} ${checkIndex + 1}. soruda açıklama zayıf.`);
  });
});

// Doğru şıklar tek konumda toplanmamalı.
const correctPositions = new Set(content.weeks.flatMap((week) => week.checks.map((item) => item.correct)));
assert.ok(correctPositions.size >= 2, 'Doğru seçenekler tek konumda toplanmamalı.');

// 3. Öğrenci metninde kitap/sayfa atfı olmamalı
const studentText = content.weeks.map((week) => [
  ...week.summary, ...week.points, ...week.tasks,
  ...week.terms.map((item) => `${item.word} ${item.definition}`),
  ...week.checks.map((item) => `${item.prompt} ${item.options.join(' ')} ${item.hint} ${item.explain}`),
].join(' ')).join(' ');
assert.ok(!/\bs\.\s?\d/.test(studentText), 'Öğrenci metninde sayfa atfı olmamalı.');
assert.ok(!/ders kitab[ıi]/i.test(studentText), 'Öğrenci metninde ders kitabı atfı olmamalı.');

// 4. Sahne tanımları
const scenes = content.weeks.filter((week) => week.scene);
assert.ok(scenes.length >= 10, 'En az on haftada GeoGebra sahnesi olmalı.');
scenes.forEach((week) => {
  const scene = week.scene;
  assert.ok(['graphing', 'geometry', '3d'].includes(scene.app), `Hafta ${week.id} geçersiz uygulama: ${scene.app}`);
  assert.ok(Array.isArray(scene.commands) && scene.commands.length >= 3, `Hafta ${week.id} sahne komutları eksik.`);
  assert.ok(Array.isArray(scene.bounds) && scene.bounds.length === 4, `Hafta ${week.id} sahne çerçevesi hatalı.`);
  assert.ok(scene.title && scene.hint, `Hafta ${week.id} sahne başlığı/ipucu eksik.`);
  scene.commands.forEach((command) => {
    assert.ok(/^[A-Za-z]/.test(command), `Hafta ${week.id} komutu İngilizce komut adıyla başlamalı.`);
    assert.ok(!/youtube|http/i.test(command), `Hafta ${week.id} komutunda dış bağlantı olmamalı.`);
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
assert.ok(/matematik\.css/.test(html), 'Matematik stil dosyası bağlanmalı.');
assert.ok(/isMath/.test(html), 'Ders seçimi matematik alanını göstermeli.');
assert.ok(!/data-subject="matematik"[\s\S]{0,120}Yakında/.test(html), 'Matematik düğmesi artık “Yakında” olmamalı.');
assert.ok(/<b>1\. Sınav:<\/b> <strong>5 Kasım 2026<\/strong>/.test(html), 'Matematik 1. sınav kartı 5 Kasım 2026 olmalı.');
assert.ok(/<b>2\. Sınav:<\/b> <strong>tahmini 4–8 Ocak 2027<\/strong>/.test(html), 'Matematik 2. sınav kartı tahmini tarih olmalı.');

assert.ok(/5 Kasım 2026/.test(app), 'Uygulama sınav tarihini bilmeli.');
assert.ok(/emr7lect\.matematik\.v1/.test(app), 'İlerleme ayrı anahtarda saklanmalı.');
assert.ok(/LOCAL_SCENES\s*=\s*new Set\(\['ortadikme', 'yansima'\]\)/.test(app), 'Yerel yedek sahneler tanımlı olmalı.');
assert.ok(/MATEMATIK_SAHNE/.test(app) && /MATEMATIK_GEOGEBRA/.test(app), 'Uygulama GeoGebra ve yerel sahne modüllerini kullanmalı.');
assert.ok(!/youtube\.com|youtu\.be/.test(app + css), 'Matematik alanında YouTube bağlantısı olmamalı.');
assert.ok(/math-week-content\{display:grid/.test(css), 'Hafta içeriği ızgara yerleşimi tanımlı olmalı.');
assert.ok(/math-scene-host \.ggb-stage\{width:100%;height:300px\}/.test(css), 'Sahne kutusu 300 px yüksekliğinde olmalı.');

console.log(`Matematik içeriği geçti: 15 hafta, 4 tema, ${scenes.length} GeoGebra sahnesi, `
  + `${content.weeks.reduce((total, week) => total + week.checks.length, 0)} kısa kontrol sorusu; `
  + 'sınav takvimi, sahne tanımları ve index.html bağlantısı doğru.');
