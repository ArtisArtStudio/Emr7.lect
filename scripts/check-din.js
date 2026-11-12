#!/usr/bin/env node
/* Din Kültürü 1. ünite sınav çalışması denetimi:
   - kaynaktaki 15 soru eksiksiz ve sıralı mı,
   - her soruda yanıt alanı, örnek cevap ve ölçüt var mı,
   - "Kontrol et" cevabı sızdırmıyor, cevap şifreyle açılıyor mu,
   - soru ve cevap ElevenLabs ile okunabiliyor mu,
   - index.html ders alanını, stilleri ve betikleri doğru sırayla yüklüyor mu. */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const assert = require('assert');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(read('din-content.js'), sandbox, { filename: 'din-content.js' });
const exam = sandbox.window.DIN_EXAM;
const din = read('din.js');
const html = read('index.html');

assert.ok(exam && Array.isArray(exam.questions), 'DIN_EXAM yüklenemedi.');
assert.strictEqual(exam.questions.length, 15, 'Kaynakta 15 soru var; çalışma 15 soru içermeli.');
assert.ok(exam.source.includes('Din Öğretimi Genel Müdürlüğü'), 'Kaynak bilgisi eksik.');

const numbers = exam.questions.map((question) => question.no);
assert.strictEqual(JSON.stringify(numbers), JSON.stringify(Array.from({ length: 15 }, (_, index) => index + 1)), 'Soru numaraları 1–15 sırasıyla olmalı.');

const outcomes = new Set();
exam.questions.forEach((question) => {
  assert.ok(question.heading && question.heading.length > 4, `Soru ${question.no}: başlık eksik.`);
  assert.ok(/^DKAB\.7\.1\.[1-4]/.test(question.outcome), `Soru ${question.no}: kazanım kodu eksik.`);
  assert.ok(/^KB2\.|^DAB4\./.test(question.skill), `Soru ${question.no}: beceri eksik.`);
  assert.ok(Array.isArray(question.tasks) && question.tasks.length >= 1, `Soru ${question.no}: yanıt alanı yok.`);
  assert.ok(question.ask && question.ask.length > 10, `Soru ${question.no}: yönerge eksik.`);
  assert.ok(question.answer && Array.isArray(question.answer.blocks) && question.answer.blocks.length, `Soru ${question.no}: örnek cevap yok.`);
  assert.ok(Array.isArray(question.keyPoints) && question.keyPoints.length, `Soru ${question.no}: değerlendirme ölçütü yok.`);
  const ids = question.tasks.map((task) => task.id);
  assert.strictEqual(new Set(ids).size, ids.length, `Soru ${question.no}: yinelenen alan kimliği var.`);
  const known = new Set(ids);
  (question.tables || []).forEach((table) => {
    table.rows.forEach((row) => {
      (row.fields || []).forEach((field) => assert.ok(known.has(field), `Soru ${question.no}: tablo alanı ${field} görev listesinde yok.`));
    });
  });
  (question.lines || []).forEach((line) => assert.ok(known.has(line.field), `Soru ${question.no}: boşluk alanı ${line.field} görev listesinde yok.`));
  outcomes.add(question.outcome.split('·')[0].trim());
});

assert.strictEqual(JSON.stringify([...outcomes].sort()), JSON.stringify(['DKAB.7.1.1', 'DKAB.7.1.2', 'DKAB.7.1.3', 'DKAB.7.1.4']), 'Dört kazanım da kapsanmalı.');

/* Kaynaktaki ayırt edici ifadeler korunmuş mu? */
const joined = JSON.stringify(exam.questions);
[
  'Varlıklar âlemi',
  'kiramen kâtibin',
  'Münker ve Nekir',
  'Adn cennetleri',
  'tohum ekme mevsimi',
  'Ḳul eûẕü birabbinnâs',
  'Minel cinneti vennâs',
  'Ordunuz dağıldı',
].forEach((needle) => {
  assert.ok(joined.toLocaleLowerCase('tr-TR').includes(needle.toLocaleLowerCase('tr-TR')), `Kaynak ifadesi eksik: ${needle}`);
});
assert.strictEqual(exam.questions[13].lines.length, 6, '14. soruda altı boşluk olmalı.');
assert.strictEqual(exam.questions[13].words.length, 6, '14. soruda altı kelime olmalı.');
assert.strictEqual(exam.questions[11].tables[0].rows.length, 5, '12. soruda beş ayet satırı olmalı.');
assert.strictEqual(exam.questions[4].cards.length, 6, '5. soruda altı kart olmalı.');

/* Uygulama davranışı */
assert.ok(din.includes("const ANSWER_PASSWORD = 'Alone815185'"), 'Cevap şifresi tanımlı değil.');
assert.ok(din.includes('api.groq.com'), 'Groq uç noktası yok.');
assert.ok(din.includes('cevabı vermek değildir'), 'Groq isteminde “cevabı verme” kuralı yok.');
assert.ok(din.includes('leaksAnswer'), 'Cevap sızıntısı filtresi yok.');
assert.ok(din.includes('secretShingles'), 'Cevap sızıntısı ölçütü (shingle) yok.');
assert.ok(!/Cevap:\s/.test(din), 'Arayüzde cevap ipucu metni olmamalı.');
assert.ok(din.includes("data-din-reveal"), 'Cevabı göster düğmesi yok.');
assert.ok(din.includes("data-din-unlock"), 'Şifre açma düğmesi yok.');
assert.ok(din.includes("window.speakEleven"), 'ElevenLabs sesli okuma bağlanmamış.');
assert.ok(din.includes("data-din-read=\"question\"") || din.includes('data-din-read="question"'), 'Soruyu sesli okuma düğmesi yok.');
assert.ok(din.includes("data-din-read=\"answer\""), 'Cevabı sesli okuma düğmesi yok.');
assert.ok(din.includes('localStorage'), 'Yanıtlar kaydedilmiyor.');

/* Sayfa bağlantıları */
assert.ok(html.includes('id="dinWorkspace"'), 'Din Kültürü çalışma alanı index.html içinde yok.');
assert.ok(/<link rel="stylesheet" href="din\.css\?v=\d+">/.test(html), 'din.css sürümüyle bağlanmamış.');
assert.ok(/<script src="din-content\.js\?v=\d+"><\/script><script src="din\.js\?v=\d+"><\/script>/.test(html), 'Din Kültürü betikleri sürümüyle bağlanmamış.');
assert.ok(html.indexOf('din-content.js') < html.indexOf('din.js?v='), 'din-content.js, din.js’den önce yüklenmeli.');
assert.ok(!/data-subject="din"[\s\S]{0,200}Yakında/.test(html), 'Din Kültürü düğmesi hâlâ “Yakında” diyor.');
assert.ok(html.includes("const din=document.getElementById('dinWorkspace')"), 'selectSubject Din Kültürü alanını açmıyor.');
assert.ok(html.includes('window.DIN?.render()'), 'Seçimde Din Kültürü çizilmiyor.');

const css = read('din.css');
['.din-hero', '.din-nav-item', '.din-table', '.din-feedback', '.din-gate', '.din-answer'].forEach((selector) => {
  assert.ok(css.includes(selector), `din.css içinde ${selector} yok.`);
});
assert.ok(/@media\(max-width:900px\)/.test(css), 'Mobil tek kolon kuralı yok.');

console.log(`Din Kültürü çalışma denetimi geçti: ${exam.questions.length} soru, ${[...outcomes].length} kazanım, şifreli cevap ve ElevenLabs sesli okuma bağlı.`);
