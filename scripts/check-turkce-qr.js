#!/usr/bin/env node
'use strict';

// Türkçe karekod çalışmaları denetimi.
// Amaç: eksik QR içeriklerinin gerçekten çalışmaya bağlandığını, konuşma etkinliklerinin
// kapsam dışında kaldığını, cevap anahtarının sızmadığını ve mevcut etkinlik alanının
// değişmediğini doğrulamak.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(ROOT, name), 'utf8');

const elements = new Map();
class MockElement {
  constructor(id) {
    this.id = id;
    this.hidden = true;
    this.innerHTML = '';
    this.textContent = '';
    this.dataset = {};
  }
  addEventListener() {}
  querySelectorAll() { return []; }
  querySelector() { return null; }
  setAttribute() {}
  focus() {}
}

global.window = {};
global.document = {
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, new MockElement(id));
    return elements.get(id);
  },
  querySelector() { return null; },
  querySelectorAll() { return []; },
  addEventListener() {},
};

require('../turkce-qr.js');
require('../turkce-qr-app.js');

const data = global.window.TURKCE_QR;
assert.ok(data && Array.isArray(data.units), 'TURKCE_QR.units bulunamadı.');
assert.equal(data.units.length, 8, `Beklenen 8 karekod çalışması var, bulunan: ${data.units.length}`);

const ids = new Set();
const seenWeeks = new Set();
for (const unit of data.units) {
  assert.ok(!ids.has(unit.id), `Tekrarlanan çalışma kimliği: ${unit.id}`);
  ids.add(unit.id);
  assert.ok(/^qr-[a-z0-9-]+$/.test(unit.id), `${unit.id} kimliği qr- önekiyle yazılmalı.`);
  for (const field of ['title', 'kind', 'where', 'focus', 'intro', 'skill']) {
    assert.ok(unit[field] && String(unit[field]).trim().length > 2, `${unit.id} için ${field} eksik.`);
  }
  assert.ok(Array.isArray(unit.weekIds) && unit.weekIds.length >= 1, `${unit.id} en az bir haftaya bağlanmalı.`);
  for (const week of unit.weekIds) {
    assert.ok(Number.isInteger(week) && week >= 1 && week <= 15, `${unit.id}: geçersiz hafta ${week}`);
    seenWeeks.add(week);
  }
  assert.ok(unit.minutes >= 4 && unit.minutes <= 15, `${unit.id}: süre bilgisi gerçekçi olmalı.`);
  assert.equal(unit.before.length, 2, `${unit.id}: iki izleme öncesi sorusu olmalı.`);
  assert.equal(unit.notes.length, 4, `${unit.id}: dört not alanı olmalı.`);
  assert.equal(unit.questions.length, 2, `${unit.id}: iki seçim sorusu olmalı.`);
  for (const question of unit.questions) {
    assert.ok(question.prompt && question.prompt.length > 12, `${unit.id}/${question.id}: soru metni kısa.`);
    assert.equal(question.options.length, 4, `${unit.id}/${question.id}: dört seçenek olmalı.`);
    assert.equal(new Set(question.options).size, 4, `${unit.id}/${question.id}: seçenekler tekrar ediyor.`);
    assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4, `${unit.id}/${question.id}: cevap indeksi geçersiz.`);
    assert.ok(!question.prompt.includes(question.options[question.answer]), `${unit.id}/${question.id}: cevap soru metnine yazılmamalı.`);
  }
  const write = unit.write;
  assert.ok(write && write.title && write.instruction, `${unit.id}: yazma görevi eksik.`);
  assert.ok(write.minChars >= 120, `${unit.id}: yazma görevi en az 120 karakter istemeli.`);
  assert.ok(write.criteria.length >= 3, `${unit.id}: en az üç ölçüt gerekli.`);
  assert.ok(write.guide && write.starter, `${unit.id}: yol gösterici ve başlangıç cümlesi gerekli.`);
  assert.ok(!/konuşma|sözlü anlat|sunum yap/i.test(`${unit.title} ${unit.kind} ${unit.focus} ${write.title}`), `${unit.id}: konuşma etkinlikleri kapsam dışı olmalı.`);
}

// Konuşma etkinlikleri eklenmemeli.
const source = read('turkce-qr.js');
assert.ok(!/Konuşma Yapalım/.test(source), 'Konuşma Yapalım çalışmaya alınmamalı.');
assert.ok(!/sözlü anlatım|hazırlıklı konuşma/i.test(source), 'Konuşma türü etkinlik eklenmemeli.');

// Cevap anahtarı sızması: doğru seçenek metni arayüz kodunda geçmemeli.
const app = read('turkce-qr-app.js');
for (const unit of data.units) {
  for (const question of unit.questions) {
    const correct = question.options[question.answer];
    if (correct.length < 8) continue;
    assert.ok(!app.includes(correct), `${unit.id}: arayüz doğru cevabı yazıyor (“${correct}”).`);
  }
}
assert.ok(app.includes('DURUM:') && app.includes('YOL GÖSTERİCİ:'), 'Geri bildirim DURUM ve YOL GÖSTERİCİ başlıklarını kullanmalı.');
assert.ok(!/CEVAP ANAHTARI|Doğru cevap:/.test(app), 'Arayüz cevap anahtarı göstermemeli.');

// Sayfa bağlantısı: bölüm ana metinden sonra, mevcut etkinlik alanından önce.
const html = read('index.html');
assert.ok(html.includes('id="turkceQr"'), 'Karekod bölümü sayfada yok.');
assert.ok(html.includes('turkce-qr.js?v=') && html.includes('turkce-qr-app.js?v='), 'Karekod betikleri sürüm etiketiyle yüklenmeli.');
assert.ok(html.includes('function renderTurkceQr(w)'), 'renderTurkceQr tanımlı değil.');
assert.ok(html.includes('renderTurkceQr(w);renderTheme1Practice(w);'), 'Karekod çalışmaları ana etkinlik alanından önce çizilmeli.');
assert.ok(html.indexOf('id="bookCard"') < html.indexOf('id="turkceQr"'), 'Karekod bölümü ana metinden sonra gelmeli.');
assert.ok(html.indexOf('id="turkceQr"') < html.indexOf('id="theme1Practice"'), 'Karekod bölümü mevcut etkinlik alanını itmemeli.');

// Mevcut etkinlik alanı değişmemeli.
const practice = read('theme1-practice.js') + read('theme1-practice-app.js');
assert.ok(!practice.includes('TURKCE_QR'), 'Ana etkinlik alanı karekod verisine bağlanmamalı.');
assert.ok(!practice.includes('qr-card'), 'Ana etkinlik alanı karekod sınıflarıyla değiştirilmemeli.');

// Hafta dağılımı: Tema 2 haftaları ve motivasyon haftası kapsanmalı.
for (const week of [5, 7, 8, 9, 10]) {
  assert.ok(seenWeeks.has(week), `${week}. hafta için karekod çalışması yok.`);
}

// Basit çizim dumanı testi.
const store = { get: () => ({}), save() {} };
for (const unit of data.units) {
  global.window.renderTurkceQrFlow([unit], { store, rerender() {} });
  const markup = elements.get('turkceQrBody').innerHTML;
  assert.ok(markup.includes(unit.title), `${unit.id} çizime yansımadı.`);
  assert.ok(markup.includes(`data-qr-check="quiz"`), `${unit.id} için kontrol düğmesi yok.`);
  assert.ok(!markup.includes('CEVAP'), `${unit.id} çiziminde cevap anahtarı geçiyor.`);
}

console.log(
  `Türkçe karekod çalışmaları hazır: ${data.units.length} içerik, ${data.units.reduce((total, unit) => total + unit.questions.length, 0)} seçim sorusu, ` +
  `${data.units.length} yazma görevi, ${data.units.reduce((total, unit) => total + unit.notes.length, 0)} not alanı. Konuşma etkinlikleri kapsam dışı.`,
);
