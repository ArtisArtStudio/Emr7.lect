#!/usr/bin/env node
'use strict';

// Tema 1 ek okuma/etkinlik denetimi.
// Amaç: ana metinden sonra gelen ek bölümün her hafta için doğru metni, en az üç etkinliği,
// söz sanatı çalışmasını ve cevap anahtarı göstermeyen geri bildirimi koruduğunu doğrulamak.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(ROOT, name), 'utf8');

const storage = new Map();
const elements = new Map();
class MockElement {
  constructor(id) {
    this.id = id;
    this.hidden = false;
    this.innerHTML = '';
    this.textContent = '';
    this.value = '';
    this.dataset = {};
    this.listeners = {};
    this.classList = { toggle() {}, add() {}, remove() {} };
  }
  addEventListener(name, callback) { this.listeners[name] = callback; }
  setAttribute() {}
  querySelectorAll() { return []; }
  append() {}
  replaceChildren() {}
  focus() {}
  scrollIntoView() {}
}
const documentMock = {
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, new MockElement(id));
    return elements.get(id);
  },
  querySelectorAll() { return []; },
  addEventListener() {},
  createElement(tag) { return new MockElement(tag); },
};

global.window = { localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) } };
global.document = documentMock;

require('../theme1-extras.js');

const extras = global.window.THEME1_EXTRAS;
assert.ok(extras && Array.isArray(extras.units), 'Theme 1 extras must expose a units list.');

// Tema 1'in üç birleşik çalışma birimi: 1, 3 ve 5.
assert.deepEqual(extras.units.map((unit) => unit.weekId), [1, 3, 5], 'Extras should cover the three Theme 1 units.');

const ALLOWED = new Set(['match', 'choice', 'write']);
const ids = new Set();
let poemUnits = 0;
let activityTotal = 0;

for (const unit of extras.units) {
  assert.ok(unit.kind && unit.title && unit.subtitle, `Unit ${unit.weekId} needs kind, title and subtitle.`);
  assert.ok(unit.after, `Unit ${unit.weekId} should name the main text it follows.`);
  assert.ok(unit.readingNote && unit.readingNote.length > 30, `Unit ${unit.weekId} needs a reading note.`);
  const body = unit.poem ? unit.poem.flat().join(' ') : (unit.paragraphs || []).join(' ');
  const minLength = unit.poem ? 360 : 600;
  assert.ok(body.length >= minLength, `Unit ${unit.weekId} extra text is too short to read (${body.length} < ${minLength}).`);
  if (unit.poem) {
    poemUnits += 1;
    assert.ok(unit.poem.length >= 3, `Unit ${unit.weekId} poem needs at least three stanzas.`);
    assert.ok(unit.poem.every((stanza) => stanza.length >= 2), `Unit ${unit.weekId} stanzas need at least two lines.`);
  }
  assert.ok(!/(kitap|ders kitab|sayfa\s*\d)/i.test(body), `Unit ${unit.weekId} extra text must not cite the textbook.`);

  assert.ok(unit.activities.length >= 3 && unit.activities.length <= 4, `Unit ${unit.weekId} should carry three or four extras activities, found ${unit.activities.length}.`);
  activityTotal += unit.activities.length;
  assert.deepEqual([...new Set(unit.activities.map((activity) => activity.type))].sort(), ['choice', 'match', 'write'], `Unit ${unit.weekId} extras should use match, choice and write.`);

  for (const activity of unit.activities) {
    assert.ok(!ids.has(activity.id), `Duplicate extras activity id: ${activity.id}`);
    ids.add(activity.id);
    assert.ok(ALLOWED.has(activity.type), `${activity.id} uses an unsupported type.`);
    assert.ok(activity.title && activity.instruction && activity.format && activity.skill, `${activity.id} needs title, instruction, format and skill.`);
    assert.ok(!/(kitap|ders kitab|sayfa\s*\d)/i.test(JSON.stringify(activity)), `${activity.id} must not cite the textbook.`);
    if (activity.type === 'match') {
      assert.equal(Object.keys(activity.answers).length, activity.items.length, `${activity.id} needs one answer per item.`);
      const answerValues = new Set(Object.values(activity.answers));
      assert.equal(answerValues.size, activity.items.length, `${activity.id} must not reuse the same option twice.`);
      for (const option of answerValues) {
        assert.ok(activity.options.some((item) => item.id === option), `${activity.id} points at a missing option.`);
      }
      assert.ok(activity.options.length > activity.items.length, `${activity.id} needs a distractor option.`);
    }
    if (activity.type === 'choice') {
      assert.ok(activity.questions.length >= 2, `${activity.id} should ask at least two questions.`);
      for (const question of activity.questions) {
        assert.ok(question.options.length >= 3, `${activity.id}/${question.id} needs three options.`);
        assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length, `${activity.id}/${question.id} needs a valid answer index.`);
        assert.ok(!question.prompt.includes(question.options[question.answer]), `${activity.id}/${question.id} must not print its answer in the prompt.`);
      }
    }
    if (activity.type === 'write') {
      assert.ok(activity.criteria.length >= 3, `${activity.id} needs at least three criteria.`);
      assert.ok(activity.minChars >= 120, `${activity.id} should ask for a substantial piece of writing.`);
      assert.ok(activity.guide && activity.starter, `${activity.id} needs a coaching guide and a sentence starter.`);
      assert.ok(!activity.guide.includes(activity.starter), `${activity.id} guide and starter should differ.`);
    }
  }
}

assert.ok(poemUnits >= 1, 'Theme 1 extras must include a poem unit for the söz sanatları work.');

// Söz sanatları: şiir biriminde benzetme, kişileştirme, abartma ve konuşturma birlikte çalışılmalı.
const poemUnit = extras.units.find((unit) => unit.poem);
const soruSanatlari = poemUnit.activities.filter((activity) => activity.type === 'match')[0];
const joined = soruSanatlari.options.map((option) => option.label).join(' ').toLocaleLowerCase('tr');
for (const art of ['benzetme', 'kişileştirme', 'abartma', 'konuşturma']) {
  assert.ok(joined.includes(art), `Poem matching activity should cover ${art}.`);
}

// Uygulamaya bağlanma: ek okuma birimleri ana etkinlik akışının içine, ana metnin
// etkinliklerinden SONRA aynı kart biçimiyle eklenir. Ayrı bir bölüm/ızgara yoktur.
const html = read('index.html');
const practiceApp = read('theme1-practice-app.js');
assert.ok(!html.includes('id="theme1Extras"'), 'Ek okuma için ayrı bir bölüm kalmamalı; aynı akışa eklenmeli.');
assert.ok(!html.includes('renderTheme1Extras('), 'Ek okuma için ayrı çizim çağrısı kalmamalı.');
assert.ok(html.includes('theme1-extras.js?v='), 'Ek okuma verisi sayfaya yüklenmeli.');
assert.ok(html.includes('function renderTheme1Practice(w)'), 'Ana etkinlik alanı çizicisi korunmalı.');
assert.ok(practiceApp.includes('THEME1_EXTRAS'), 'Ana etkinlik akışı ek okuma birimlerini okumalı.');
assert.ok(/function extrasForWeek\(/.test(practiceApp) && /function extrasSteps\(/.test(practiceApp), 'Ek okuma birimleri akış adımlarına çevrilmeli.');
assert.ok(/kind: "reading"/.test(practiceApp) && /class="activity-card reading-card"/.test(practiceApp), 'Ek metin, aynı etkinlik kartı biçiminde bir okuma adımı olarak çizilmeli.');
assert.ok(practiceApp.includes('registerExtraForm'), 'Ek etkinlikler ortak soru biçimine çevrilmeli.');
for (const activityId of ids) {
  assert.ok(!new RegExp(`${activityId}["']?:`).test(read('theme1-practice-forms.js')), `${activityId} ana formlara elle eklenmemeli; dönüştürücü kullanılmalı.`);
}
// Ek etkinlikler ana metnin etkinliklerinden sonra gelmeli: adımlar önce ana gruplardan üretilir.
const mainStepsIndex = practiceApp.indexOf('activeUnit.groups.flatMap');
const extrasIndex = practiceApp.indexOf('...extrasSteps(extras');
assert.ok(mainStepsIndex >= 0 && extrasIndex > mainStepsIndex, 'Ek okuma adımları ana metin etkinliklerinden sonra eklenmeli.');
// Okuma adımı tamamlanana kadar etkinlik sayılmaz; tamamlanma hesabı yalnız etkinlik adımlarına bakar.
assert.ok(/allSteps\.filter\(step => step\.activity\)/.test(practiceApp), 'Okuma adımı tamamlanma hesabına etkinlik gibi girmemeli.');

// Aynı biçim: ek etkinlikler tema 1 etkinlik kartı sınıflarını kullanır, ayrı ek sınıf üretmez.
assert.ok(!practiceApp.includes('extra-activity'), 'Ana etkinlik alanı ayrı ek sınıflarla biçimlendirilmemeli.');

// Cevap anahtarı sızması: dönüştürücü, doğru seçeneği ekrana basmaz.
assert.ok(/answerKey: \(question\.options \|\| \[\]\)\[question\.answer\]/.test(practiceApp), 'Çoktan seçmeli ek etkinliklerin anahtarı yalnız değerlendirmeye verilmeli.');
assert.ok(/expectedAssignments: \{ \.\.\.\(activity\.answers/.test(practiceApp), 'Eşleştirme anahtarı yalnız değerlendirmeye verilmeli.');

console.log(`Tema 1 ek okuma ve etkinlikler hazır: ${extras.units.length} birim, ${activityTotal} etkinlik, ${poemUnits} şiir. Hepsi ana etkinlik akışına, aynı kart biçimiyle ekleniyor.`);
