#!/usr/bin/env node
'use strict';

// Türkçe Tema 3 (İletişim ve Sosyal İlişkiler, hafta 11–15) etkinlik paketi denetimi.
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

require('../tema3-practice.js');
require('../tema2-practice-app.js');

const data = global.window.TEMA3_PRACTICE;
assert.ok(data && Array.isArray(data.units), 'TEMA3_PRACTICE.units bulunamadı.');
assert.equal(data.theme, 'Tema 3 · İletişim ve Sosyal İlişkiler', 'Tema adı beklenen biçimde değil.');
assert.equal(data.units.length, 4, `Beklenen 4 birim var, bulunan: ${data.units.length}`);

const expectedWeeks = { eskici: [11], hayir: [12, 13], dijital: [14], ogut: [15] };
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
  assert.ok(unit.title && unit.title.trim().length > 3, `${unit.id}: birim başlığı eksik.`);
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
    assert.ok(!/ders kitab|sayfa \d|s\. \d/i.test(`${activity.instruction} ${activity.guide || ""}`),
      `${activity.id}: öğrenciye dönük metinde kitap/sayfa referansı olmamalı.`);

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
    }
  }

  assert.ok(unitImages >= 1 && unitImages <= 2, `${unit.id}: haftada bir–iki görselli soru bekleniyor, bulunan ${unitImages}.`);
}

assert.equal(activityTotal, 32, `Toplam 32 etkinlik bekleniyor, bulunan ${activityTotal}.`);
assert.equal(imageFiles.length, 4, `Dört görsel bekleniyor, bulunan ${imageFiles.length}.`);
assert.ok(answerPositions.size >= 3, `Doğru cevaplar tek bir seçenek konumunda toplanmamalı (bulunan konumlar: ${[...answerPositions].join(', ')}).`);

// 14. hafta dinleme/izleme: içerikte geçtiği iddia edilen ayrıntılara dayanılmamalı.
const source = read('tema3-practice.js');
assert.ok(!/videoda|video'da|izlediğin videoda/i.test(source), 'Dijital haftasında videoda geçtiği iddia edilen ayrıntıya dayanılmamalı.');
assert.ok(!/Konuşma Yapalım/i.test(source), 'Konuşma Yapalım çalışmaya alınmamalı.');

// Arayüz cevap anahtarı göstermemeli; geri bildirim başlıkları zorunlu.
const app = read('tema2-practice-app.js');
assert.ok(app.includes('DURUM:') && app.includes('HATA/EKSİK:') && app.includes('YOL GÖSTERİCİ:'), 'Geri bildirim DURUM / HATA-EKSİK / YOL GÖSTERİCİ başlıklarını kullanmalı.');
assert.ok(!/CEVAP ANAHTARI|Doğru cevap:/.test(app), 'Arayüz cevap anahtarı göstermemeli.');
assert.ok(app.includes('api.groq.com') && app.includes('response_format'), 'Yapay zekâ değerlendirmesi Groq JSON sözleşmesini kullanmalı.');
assert.ok(app.includes('EMR7_AI_GRADER') && app.includes('sanitizeGuidance'), 'Yol gösterici metinler ortak güvenli denetimden geçmeli.');
assert.ok(app.includes('data-tts-read'), 'Yazma geri bildiriminde sesli okuma düğmesi bulunmalı.');
assert.ok(app.includes('api.bodyId'), 'Akış hedef alanını çağrıdan almalı; Tema 2 ve Tema 3 aynı çiziciyi kullanmalı.');

// Sayfa bağlantısı.
const html = read('index.html');
assert.ok(html.includes('id="tema3Practice"'), 'Tema 3 bölümü sayfada yok.');
assert.ok(html.includes('tema2-practice.css?v='), 'Tema 3, ortak stil dosyasını sürüm etiketiyle yüklemeli.');
assert.ok(html.includes('tema3-practice.js?v='), 'Tema 3 verisi sürüm etiketiyle yüklenmeli.');
assert.ok(html.includes('function renderTema3Practice(w)'), 'renderTema3Practice tanımlı değil.');
const tema2Call = html.indexOf('renderTema2Practice(w);');
const tema3Call = html.indexOf('renderTema3Practice(w);');
const qrCall = html.indexOf('renderTurkceQr(w);');
assert.ok(tema3Call > tema2Call && qrCall >= 0, 'Tema 3 akışı Tema 2 akışından sonra çizilmeli.');
assert.ok(html.indexOf('id="tema2Practice"') < html.indexOf('id="tema3Practice"'), 'Tema 3 bölümü Tema 2 bölümünden sonra gelmeli.');
assert.ok(html.includes("data[current].tema3PracticeFlow"), 'Tema 3 yanıtları haftanın kaydında ayrı tutulmalı.');
assert.ok(html.includes('function tema3UnitComplete('), 'Tema 3 tamamlanması haftalık çizelgeye bağlanmalı.');
assert.ok(html.includes('tema3UnitComplete(baseWeekId,memberWeekId)'), 'Haftalık çizelgede Tema 3 tamamlanması hesaba katılmalı.');

// Mevcut etkinlik alanı değişmemeli.
const practice = read('theme1-practice.js') + read('theme1-practice-app.js');
assert.ok(!practice.includes('TEMA3_PRACTICE'), 'Ana etkinlik alanı Tema 3 verisine bağlanmamalı.');

// Çizim dumanı testi.
const store = { get: () => ({}), save() {} };
for (const unit of data.units) {
  global.window.renderTemaFlow(unit, { store, bodyId: 'tema3PracticeBody', rerender() {} });
  const markup = elements.get('tema3PracticeBody').innerHTML;
  const first = unit.groups[0].activities[0];
  assert.ok(markup.includes(first.title), `${unit.id} çizime yansımadı.`);
  assert.ok(markup.includes('data-t2-check="activity"'), `${unit.id} için kontrol düğmesi yok.`);
  // Ortak etkinlik kartı biçimi: tema 1 ile aynı sınıflar ve aynı düğme metni.
  assert.ok(markup.includes('class="t2-card activity-card"'), `${unit.id} etkinlik kartı ortak biçimi kullanmıyor.`);
  assert.ok(markup.includes('class="activity-top"') && markup.includes('class="activity-kicker"'), `${unit.id} kart başlığı ortak düzende değil.`);
  assert.ok(markup.includes('class="question-list"') && markup.includes('class="question-card"'), `${unit.id} soru kartları ortak biçimde değil.`);
  assert.ok(markup.includes('check-button') && markup.includes('✦ Kontrol et'), `${unit.id} kontrol düğmesi ortak değil.`);
  assert.ok(!/CEVAP ANAHTARI|Doğru cevap:/.test(markup), `${unit.id} çiziminde cevap anahtarı geçiyor.`);
  for (const activity of unit.groups.flatMap((group) => group.activities)) {
    if (activity.type !== 'write') continue;
    for (const item of activity.answerKey || []) {
      assert.ok(!markup.includes(item), `${unit.id}: değerlendirme anahtarı ekranda görünüyor (“${item.slice(0, 40)}…”).`);
    }
  }
}

console.log(`Tema 3 etkinlik paketi hazır: ${data.units.length} birim, ${activityTotal} etkinlik, ${imageFiles.length} görsel, konuşma etkinliği yok.`);
