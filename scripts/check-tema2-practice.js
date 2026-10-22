#!/usr/bin/env node
'use strict';

// Türkçe Tema 2 (Bir Hilal Uğruna, hafta 6–10) etkinlik paketi denetimi.
// Amaç: dört birimin haftalara doğru bağlandığını, etkinlik kimliklerinin tekil olduğunu,
// cevap anahtarlarının tutarlı ve gizli kaldığını, görselli soruların bulunduğunu,
// konuşma etkinliği eklenmediğini ve akışın sayfaya doğru sırada bağlandığını doğrulamak.

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

require('../tema2-practice.js');
require('../tema2-practice-app.js');

const data = global.window.TEMA2_PRACTICE;
assert.ok(data && Array.isArray(data.units), 'TEMA2_PRACTICE.units bulunamadı.');
assert.equal(data.theme, 'Tema 2 · Bir Hilal Uğruna', 'Tema adı beklenen biçimde değil.');
assert.equal(data.units.length, 4, `Beklenen 4 birim var, bulunan: ${data.units.length}`);

const expectedWeeks = { bayrak: [6], mustafa: [7, 8], sergi: [9], kagni: [10] };
const unitIds = new Set();
const activityIds = new Set();
const questionIds = new Set();
const answerPositions = new Set();
const imageFiles = [];
let activityTotal = 0;

for (const unit of data.units) {
  assert.ok(!unitIds.has(unit.id), `Tekrarlanan birim kimliği: ${unit.id}`);
  unitIds.add(unit.id);
  assert.deepEqual(unit.weekIds, expectedWeeks[unit.id], `${unit.id}: hafta eşlemesi beklenenle uyuşmuyor.`);
  assert.ok(unit.title && unit.title.trim().length > 8, `${unit.id}: birim başlığı eksik.`);
  assert.ok(unit.overview && unit.overview.trim().length > 40, `${unit.id}: birim tanıtımı eksik veya kısa.`);
  assert.equal(unit.groups.length, 3, `${unit.id}: üç çalışma grubu bekleniyor.`);

  const activities = unit.groups.flatMap((group) => group.activities);
  assert.equal(activities.length, 8, `${unit.id}: sekiz etkinlik bekleniyor, bulunan ${activities.length}`);
  activityTotal += activities.length;
  const types = activities.map((activity) => activity.type);
  for (const type of ['choice', 'order', 'match', 'write']) {
    assert.ok(types.includes(type), `${unit.id}: ${type} türünde etkinlik yok.`);
  }
  assert.ok(types.filter((type) => type === 'write').length >= 3, `${unit.id}: en az üç yazma etkinliği olmalı.`);

  let unitImages = 0;
  for (const activity of activities) {
    assert.ok(!activityIds.has(activity.id), `Tekrarlanan etkinlik kimliği: ${activity.id}`);
    activityIds.add(activity.id);
    assert.ok(activity.title && activity.instruction && activity.skill, `${activity.id}: başlık/yönerge/beceri eksik.`);
    assert.ok(!/konuşma|sözlü anlat|hazırlıklı konuş|sunum yap/i.test(`${activity.title} ${activity.instruction}`),
      `${activity.id}: konuşma etkinlikleri kapsam dışı olmalı.`);

    if (activity.type === 'choice') {
      assert.ok(Array.isArray(activity.questions) && activity.questions.length >= 2, `${activity.id}: en az iki soru gerekli.`);
      for (const question of activity.questions) {
        const key = `${activity.id}::${question.id}`;
        assert.ok(!questionIds.has(key), `Tekrarlanan soru kimliği: ${key}`);
        questionIds.add(key);
        assert.ok(question.prompt && question.prompt.length > 12, `${key}: soru metni kısa.`);
        assert.equal(question.options.length, 4, `${key}: dört seçenek olmalı.`);
        assert.equal(new Set(question.options).size, 4, `${key}: seçenekler tekrar ediyor.`);
        assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4, `${key}: cevap indeksi geçersiz.`);
        assert.ok(question.guide && question.guide.length > 10, `${key}: ipucu eksik.`);
        answerPositions.add(question.answer);
        const correct = question.options[question.answer];
        assert.ok(!question.prompt.includes(correct), `${key}: doğru seçenek soru metnine yazılmış.`);
        if (question.image) {
          unitImages += 1;
          for (const field of ['src', 'alt', 'caption']) {
            assert.ok(question.image[field], `${key}: görselin ${field} alanı eksik.`);
          }
          assert.ok(question.image.alt.length >= 25, `${key}: görsel alternatif metni açıklayıcı olmalı.`);
          assert.ok(question.image.caption.length <= 90, `${key}: görsel alt yazısı kısa olmalı.`);
          assert.ok(!question.image.caption.includes(correct), `${key}: görsel alt yazısı cevabı veriyor.`);
          assert.ok(fs.existsSync(path.join(ROOT, question.image.src)), `${key}: görsel dosyası yok (${question.image.src}).`);
          imageFiles.push(question.image.src);
        }
      }
    }

    if (activity.type === 'match') {
      assert.ok(activity.items.length >= 4, `${activity.id}: en az dört kavram gerekli.`);
      assert.ok(activity.options.length >= activity.items.length + 1, `${activity.id}: bir seçenek açıkta kalmalı.`);
      assert.ok(activity.guide && activity.guide.length > 15, `${activity.id}: yol gösterici cümle eksik.`);
      const itemIds = new Set(activity.items.map((item) => item.id));
      const optionIds = new Set(activity.options.map((option) => option.id));
      assert.equal(optionIds.size, activity.options.length, `${activity.id}: eşleştirme seçenekleri tekrar ediyor.`);
      assert.equal(Object.keys(activity.answers).length, itemIds.size, `${activity.id}: her kavramın bir cevabı olmalı.`);
      const used = new Set();
      for (const item of activity.items) {
        const target = activity.answers[item.id];
        assert.ok(target, `${activity.id}/${item.id}: cevap tanımsız.`);
        assert.ok(optionIds.has(target), `${activity.id}/${item.id}: cevap var olmayan bir seçeneğe bağlı.`);
        assert.ok(!used.has(target), `${activity.id}: aynı seçenek iki kavrama bağlanmış (${target}).`);
        used.add(target);
      }
    }

    if (activity.type === 'order') {
      assert.ok(activity.items.length >= 4, `${activity.id}: en az dört öğe gerekli.`);
      assert.equal(activity.answer.length, activity.items.length, `${activity.id}: sıralama uzunluğu öğe sayısıyla eşleşmeli.`);
      assert.equal(new Set(activity.answer).size, activity.answer.length, `${activity.id}: sıralamada tekrar var.`);
      const itemIds = new Set(activity.items.map((item) => item.id));
      for (const id of activity.answer) assert.ok(itemIds.has(id), `${activity.id}: sıralamada bilinmeyen öğe (${id}).`);
      assert.ok(activity.guide && activity.guide.length > 15, `${activity.id}: yol gösterici cümle eksik.`);
    }

    if (activity.type === 'write') {
      assert.ok(activity.minChars >= 120, `${activity.id}: en az 120 karakter istenmeli.`);
      assert.ok(Array.isArray(activity.criteria) && activity.criteria.length >= 3, `${activity.id}: en az üç ölçüt gerekli.`);
      assert.ok(activity.guide && activity.starter && activity.rubric, `${activity.id}: yol gösterici, başlangıç cümlesi ve ölçüt (rubric) gerekli.`);
      assert.ok(Array.isArray(activity.answerKey) && activity.answerKey.length >= 2, `${activity.id}: değerlendirme anahtarı gerekli.`);
      assert.ok(activity.answerKey.length <= 4, `${activity.id}: anahtar maddeleri dörtten fazla olmamalı.`);
      assert.ok(!/ders kitab|sayfa \d|s\. \d/i.test(`${activity.instruction} ${activity.guide}`), `${activity.id}: öğrenciye dönük metinde kitap/sayfa referansı olmamalı.`);
    }
  }

  assert.ok(unitImages >= 1 && unitImages <= 2, `${unit.id}: haftada bir–iki görselli soru bekleniyor, bulunan ${unitImages}.`);
}

assert.ok(answerPositions.size >= 3, `Doğru cevaplar tek bir seçenek konumunda toplanmamalı (bulunan konumlar: ${[...answerPositions].join(', ')}).`);
assert.equal(activityTotal, 32, `Toplam 32 etkinlik bekleniyor, bulunan ${activityTotal}.`);
assert.equal(imageFiles.length, 4, `Dört görsel bekleniyor, bulunan ${imageFiles.length}.`);

// Kaynak metin kuralları.
const source = read('tema2-practice.js');
assert.ok(!/Konuşma Yapalım/i.test(source), 'Konuşma Yapalım çalışmaya alınmamalı.');
assert.ok(!/sözlü anlatım|hazırlıklı konuşma/i.test(source), 'Konuşma türü etkinlik eklenmemeli.');

// Arayüz cevap anahtarı göstermemeli; geri bildirim başlıkları zorunlu.
const app = read('tema2-practice-app.js');
assert.ok(app.includes('DURUM:') && app.includes('HATA/EKSİK:') && app.includes('YOL GÖSTERİCİ:'), 'Geri bildirim DURUM / HATA-EKSİK / YOL GÖSTERİCİ başlıklarını kullanmalı.');
assert.ok(!/CEVAP ANAHTARI|Doğru cevap:/.test(app), 'Arayüz cevap anahtarı göstermemeli.');
for (const unit of data.units) {
  for (const activity of unit.groups.flatMap((group) => group.activities)) {
    if (activity.type !== 'choice') continue;
    for (const question of activity.questions) {
      const correct = question.options[question.answer];
      if (correct.length < 12) continue;
      assert.ok(!app.includes(correct), `${activity.id}: arayüz doğru cevabı yazıyor (“${correct}”).`);
    }
  }
}
assert.ok(app.includes('api.groq.com') && app.includes('response_format'), 'Yapay zekâ değerlendirmesi Groq JSON sözleşmesini kullanmalı.');
assert.ok(app.includes('EMR7_AI_GRADER') && app.includes('sanitizeGuidance'), 'Yol gösterici metinler ortak güvenli denetimden geçmeli.');
assert.ok(app.includes('data-tts-read'), 'Yazma geri bildiriminde sesli okuma düğmesi bulunmalı.');
assert.ok(app.includes('store.save()') && app.includes('store.get()'), 'Akış depolama köprüsünü kullanmalı.');

// Sayfa bağlantısı: bölüm ana metinden sonra, mevcut etkinlik alanından önce.
const html = read('index.html');
assert.ok(html.includes('id="tema2Practice"'), 'Tema 2 bölümü sayfada yok.');
assert.ok(html.includes('tema2-practice.css?v='), 'Tema 2 stil dosyası sürüm etiketiyle yüklenmeli.');
assert.ok(html.includes('tema2-practice.js?v=') && html.includes('tema2-practice-app.js?v='), 'Tema 2 betikleri sürüm etiketiyle yüklenmeli.');
assert.ok(html.includes('function renderTema2Practice(w)'), 'renderTema2Practice tanımlı değil.');
const practiceCall = html.indexOf('renderTheme1Practice(w);');
const tema2Call = html.indexOf('renderTema2Practice(w);');
const tema3Call = html.indexOf('renderTema3Practice(w);');
assert.ok(practiceCall >= 0 && tema2Call > practiceCall && tema3Call > tema2Call, 'Tema 2 akışı ana etkinlik alanından sonra, Tema 3 akışından önce çizilmeli.');
assert.ok(html.indexOf('id="bookCard"') < html.indexOf('id="tema2Practice"'), 'Tema 2 etkinlik alanı ana metinden sonra gelmeli.');
assert.ok(html.indexOf('id="tema2Practice"') < html.indexOf('id="theme1Practice"'), 'Tema 2 alanı mevcut etkinlik alanını itmemeli.');
assert.ok(html.includes('window.renderTema2Flow?.(unit'), 'Akış birimini ve depolama köprüsünü almalı.');
assert.ok(html.includes("data[current].tema2PracticeFlow"), 'Tema 2 yanıtları haftanın kaydında ayrı tutulmalı.');
assert.ok(html.includes('function tema2UnitComplete('), 'Tema 2 tamamlanması haftalık çizelgeye bağlanmalı.');
assert.ok(html.includes('tema2UnitComplete(baseWeekId,memberWeekId)'), 'Haftalık çizelgede Tema 2 tamamlanması hesaba katılmalı.');

// Mevcut etkinlik alanı değişmemeli.
const practice = read('theme1-practice.js') + read('theme1-practice-app.js');
assert.ok(!practice.includes('TEMA2_PRACTICE'), 'Ana etkinlik alanı Tema 2 verisine bağlanmamalı.');
assert.ok(!practice.includes('t2-card'), 'Ana etkinlik alanı Tema 2 sınıflarıyla değiştirilmemeli.');

// Çizim dumanı testi: her birimin ilk etkinliği çizilmeli, cevap görünmemeli.
const store = { get: () => ({}), save() {} };
for (const unit of data.units) {
  global.window.renderTema2Flow(unit, { store, rerender() {} });
  const markup = elements.get('tema2PracticeBody').innerHTML;
  const first = unit.groups[0].activities[0];
  assert.ok(markup.includes(first.title), `${unit.id} çizime yansımadı.`);
  assert.ok(markup.includes('data-t2-check="activity"'), `${unit.id} için kontrol düğmesi yok.`);
  // Ortak etkinlik kartı biçimi: tema 1 ile aynı sınıflar ve aynı düğme metni.
  assert.ok(markup.includes('class="t2-card activity-card"'), `${unit.id} etkinlik kartı ortak biçimi kullanmıyor.`);
  assert.ok(markup.includes('class="activity-top"') && markup.includes('class="activity-kicker"'), `${unit.id} kart başlığı ortak düzende değil.`);
  assert.ok(markup.includes('class="question-list"') && markup.includes('class="question-card"'), `${unit.id} soru kartları ortak biçimde değil.`);
  assert.ok(markup.includes('check-button') && markup.includes('✦ Kontrol et'), `${unit.id} kontrol düğmesi ortak değil.`);
  assert.ok(!markup.includes('CEVAP'), `${unit.id} çiziminde cevap anahtarı geçiyor.`);
  for (const activity of unit.groups.flatMap((group) => group.activities)) {
    if (activity.type !== 'write') continue;
    for (const item of activity.answerKey || []) {
      assert.ok(!markup.includes(item), `${unit.id}: değerlendirme anahtarı ekranda görünüyor (“${item.slice(0, 40)}…”).`);
    }
  }
}

// Tema 2 ek ölçme paneli: 8 soru, cevap göstermez, öz değerlendirme içerir.
const assessment = data.assessment;
assert.ok(assessment && assessment.questions.length === 8, 'Tema 2 için sekiz soruluk ölçme seti gerekli.');
assert.ok(assessment.selfCheck.length >= 3, 'Öz değerlendirme maddeleri eksik.');
assert.ok(assessment.questions.every((question) => question.options.length === 4 && Number.isInteger(question.answer)), 'Ölçme sorularının seçenekleri ve cevabı eksik.');
assert.ok(html.includes('id="tema2AssessmentBody"'), 'Ölçme paneli için hedef alan yok.');
const assessmentStore = { data: {}, get() { return this.data; }, save() {} };
const assessmentHost = document.getElementById('tema2AssessmentBody');
global.window.renderTema2Flow(data.units[0], { store: assessmentStore, assessment, bodyId: 'tema2PracticeBody', assessmentHostId: 'tema2AssessmentBody', rerender() {} });
assert.ok(assessmentHost.innerHTML.includes('data-t2a-check'), 'Ölçme paneli çizilmedi.');
assert.ok(!assessmentHost.innerHTML.includes('CEVAP'), 'Ölçme panelinde cevap anahtarı geçiyor.');
assert.ok(!/Doğru cevap\s*:|CEVAP ANAHTARI/i.test(assessmentHost.innerHTML), 'Ölçme paneli doğru seçeneği etiketlememeli.');

console.log(`Tema 2 etkinlik paketi hazır: ${data.units.length} birim, ${activityTotal} etkinlik, ${imageFiles.length} görsel, konuşma etkinliği yok.`);
