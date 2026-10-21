#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const storage = new Map();
const mockElements = {};

class MockElement {
  constructor(id) {
    this.id = id;
    this.hidden = false;
    this.innerHTML = '';
    this.textContent = '';
    this.value = '';
    this.dataset = {};
    this.style = {};
    this.attributes = {};
    this.listeners = {};
    this.open = false;
    this.disabled = false;
    this.className = '';
    this.classList = { toggle() {}, add() {}, remove() {} };
  }
  addEventListener(name, callback) { this.listeners[name] = callback; }
  setAttribute(name, value) { this.attributes[name] = value; }
  removeAttribute(name) { delete this.attributes[name]; }
  hasAttribute(name) { return Object.prototype.hasOwnProperty.call(this.attributes, name); }
  focus() {}
  scrollIntoView() {}
}

for (const id of [
  'scienceWorkspace', 'scienceWeekList', 'scienceWeekPrompt', 'scienceWeekContent',
  'scienceProgressBar', 'scienceProgressTrack', 'scienceProgressCount',
  'apiKey', 'model', 'apiSettings',
]) mockElements[id] = new MockElement(id);
mockElements.apiKey.value = '';
mockElements.model.value = 'openai/gpt-oss-20b';

global.window = {
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value)),
  },
  confirm: () => true,
  print() {},
};
global.document = {
  getElementById: (id) => mockElements[id] ?? null,
};

require('../science-content.js');
require('../science-activities.js');
require('../science.js');
const science = global.window.SCIENCE;
assert.ok(science, 'The Fen Bilimleri workspace should expose its course API.');
assert.equal(science.weeks.length, 15, 'The Fen plan should track the 15 teaching weeks of the first term.');
assert.deepEqual(science.weeks.map((week) => week.id), Array.from({ length: 15 }, (_, index) => index + 1));
assert.equal(science.weeks.at(-1).date, '28–31 Ara', 'The Fen course should close with the 28–31 December week.');
assert.equal(science.weeks[0].date, '14–18 Eyl', 'Fifteen four-lesson weeks end about three weeks before 22 January.');
assert.deepEqual(science.units.map((unit) => unit.title), [
  'Uzay Çağı', 'Kuvvet ve Enerjiyi Keşfedelim', 'Vücudumuzdaki Sistemler',
]);
assert.deepEqual(
  Object.fromEntries(science.units.map((unit) => [unit.id, science.weeks.filter((week) => week.unitId === unit.id).length])),
  { space: 5, energy: 3, systems: 7 },
);
assert.deepEqual(science.units.map((unit) => unit.pages), ['14–52', '58–81', '88–148']);
const socialStudiesSource = fs.readFileSync(path.join(__dirname, '../social-studies.js'), 'utf8');
const canonicalDates = Object.fromEntries(
  [...socialStudiesSource.matchAll(/\bweek\((\d+),\s*'([^']+)'/g)].map(([, id, date]) => [Number(id), date]),
);
assert.deepEqual(
  Object.fromEntries(science.weeks.map((week) => [week.id, week.date])),
  Object.fromEntries(science.weeks.map((week) => [week.id, canonicalDates[week.id]])),
  'Every Fen week date should match the canonical Social Studies course calendar.',
);
assert.equal(science.weeks[7].date, '2–6 Kas');
assert.equal(science.weeks[8].date, '9–13 Kas');
assert.equal(science.weeks[9].date, '23–27 Kas', 'The mid-November break should remain in the existing school calendar.');

const expectedTopics = [
  'Uzay araştırmalarına giriş ve gözlem soruları',
  'Yıldızların yaşam döngüsü ve kütleye bağlı sonlar',
  'Enerjinin korunumu ve sürtünmenin etkisi',
  'Sindirim sistemini oluşturan organlar ve görevleri',
  'Küçük ve büyük kan dolaşımı',
  'Solunum sisteminin organları ve hava yolu',
  'Boşaltım sistemi: böbrekler ve idrar yolu',
];
for (const topic of expectedTopics) assert.ok(science.weeks.some((week) => week.topic.includes(topic)), `Missing textbook-aligned science topic: ${topic}`);
const mergedTopics = science.weeks.reduce((total, week) => total + week.topic.split(' · ').length, 0);
assert.equal(mergedTopics, 37, 'All 37 original topic titles should survive inside the 15 merged weeks.');
assert.ok(science.weeks.every((week) => week.date && week.topic && week.focus && week.pages));
assert.ok(science.weeks.every((week) => week.summary.length >= 4 && week.summary.length <= 6 && week.summary.join(' ').length >= 2800 && week.points.length >= 3 && week.terms.length >= 3 && week.visualNote));
assert.ok(science.weeks.every((week) => !Array.isArray(week.blockLabels) || week.blockLabels.length === week.summary.length), 'Per-week block headings should match the number of explanation blocks.');
assert.ok(!/kitap|ders kitab|sayfa \d/i.test(JSON.stringify(science.weeks)), 'Lesson texts should explain the topic directly instead of citing the textbook or page numbers.');
assert.ok(science.weeks.every((week) => week.terms.every((term) => week.summary.join(' ').toLocaleLowerCase('tr').includes(term.toLocaleLowerCase('tr')))), 'Every concept should be defined inside the weekly narrative, not only in the concept strip.');
assert.equal(new Set(science.weeks.flatMap((week) => week.terms.map((term) => term.toLocaleLowerCase('tr')))).size, 132, 'Every concept should still appear in the merged weekly flow.');
assert.equal(science.weeks.filter((week) => week.researchBrief).length, 8, 'Research results should be limited to the Keşif Noktası and suitable performance-task topics.');
assert.deepEqual(science.weeks.filter((week) => week.researchBrief).map((week) => week.id), [3, 4, 9, 10, 12, 13, 14, 15]);
assert.ok(science.weeks.filter((week) => week.researchBrief).every((week) => /^(KEŞİF NOKTASI|PERFORMANS GÖREVİ) · ARAŞTIRMA SONUCU$/.test(week.researchBrief.label)));
assert.ok(science.weeks.filter((week) => [1, 2, 6, 7].includes(week.id)).every((week) => !week.researchBrief), 'Model-making and research-free weeks should not gain a research brief.');
assert.ok(science.weeks.every((week) => week.tasks.length >= 3 && week.tasks.length <= 5 && week.activity.criteria.length >= 3));
assert.ok(science.weeks.every((week) => week.quiz.options.length === 4 && Number.isInteger(week.quiz.answer) && week.quiz.answer >= 0 && week.quiz.answer < week.quiz.options.length));
assert.ok(science.weeks.every((week) => week.activity.minChars >= 15 && week.activity.title && week.activity.format && week.activity.prompt));
assert.ok(science.weeks.every((week) => ['space', 'spaceVehicles', 'telescope', 'debris', 'light', 'stars', 'galaxy', 'spaceReview', 'energy', 'digestion', 'circulation', 'respiration', 'excretion', 'systemsReview'].includes(week.visual)));
assert.deepEqual(science.weeks.map((week) => week.visual), ['space', 'spaceVehicles', 'debris', 'stars', 'spaceReview', 'energy', 'energy', 'energy', 'digestion', 'digestion', 'circulation', 'circulation', 'respiration', 'excretion', 'systemsReview']);
assert.ok(science.weeks.every((week) => week.summary[0] && week.summary[1] && week.summary[2]));
assert.ok(new Set(science.weeks.map((week) => week.activity.title)).size === 15, 'Each week should have its own original activity title.');

// Sınav bildirimi: 3 Kasım 2026 tarihi yalnızca 2–6 Kasım haftasında görünür.
assert.equal(science.examDateFor(8), '3 Kasım 2026', 'The Fen exam should be announced for 3 November 2026.');
assert.equal(science.examDateFor(7), '');
assert.equal(science.examDateFor(9), '');
science.importProgress({ selectedWeek: 1, weeks: {} });
const listHTML = mockElements.scienceWeekList.innerHTML;
assert.equal((listHTML.match(/1\. sınav \(3 Kasım 2026\)/g) || []).length, 1, 'Only week eight should carry the Fen exam date in the week list.');
assert.ok(listHTML.includes('science-week-exam'), 'The exam date should use its own red badge class.');

// Konu bazlı etkinlik seti: ilk iki haftada en az 10 etkinlik, yedi etkileşim türü.
const activityData = global.window.SCIENCE_ACTIVITIES;
assert.ok(activityData, 'The activity set should be exposed for the science course.');
assert.deepEqual(Object.keys(activityData.weeks).map(Number).sort((a, b) => a - b), [1, 2], 'The first analysis round should cover exactly the first two weeks.');
for (const weekId of [1, 2]) {
  const activities = science.activitiesFor(weekId);
  assert.ok(activities.length >= 10 && activities.length <= 15, `Week ${weekId} should carry 10–15 topic activities, found ${activities.length}.`);
  assert.equal(new Set(activities.map((activity) => activity.id)).size, activities.length, `Week ${weekId} activity ids should be unique.`);
  const types = new Set(activities.map((activity) => activity.type));
  for (const type of ['match', 'fill', 'tf', 'sort', 'order', 'choice', 'text']) {
    assert.ok(types.has(type), `Week ${weekId} should include a ${type} activity.`);
  }
  assert.ok(activities.every((activity) => activity.title && activity.instruction && activity.format && activity.skill), `Week ${weekId} activities need title, format, skill and instruction.`);
  assert.ok(activities.every((activity) => !/kitap|ders kitab|sayfa \d/i.test(JSON.stringify(activity))), 'Activities must not cite the textbook or page numbers.');
  assert.ok(activities.filter((activity) => activity.type === 'text').every((activity) => activity.criteria.length >= 3 && activity.minChars >= 150), 'Writing activities need criteria and a minimum length.');
  assert.ok(activities.filter((activity) => activity.type === 'match').every((activity) => Object.keys(activity.answers).length === activity.items.length), 'Matching activities need one answer per item.');
  assert.ok(activities.filter((activity) => activity.type === 'fill').every((activity) => activity.text.split(/\{\{\d+\}\}/).length - 1 === activity.blanks.length), 'Every fill blank needs its own answer entry.');
  assert.ok(activities.filter((activity) => activity.type === 'sort').every((activity) => activity.items.every((item) => activity.categories.some((category) => category.id === item.answer))), 'Sorted cards must point at a real category.');
  assert.ok(activities.filter((activity) => activity.type === 'order').every((activity) => activity.answer.length === activity.items.length), 'Ordering activities need a full expected sequence.');
}
assert.equal(science.practiceSummaryFor(1).total, 14);
assert.equal(science.practiceSummaryFor(1).done, 0);
assert.equal(science.practiceSummaryFor(3).total, 0, 'Weeks without an analysed set should not fake activities.');

science.importProgress({ selectedWeek: 1, weeks: { '1': { activities: { 'f1-a01': { values: { 'm:k1': 'd1', 'm:k2': 'd2' }, checked: true } } } } });
assert.equal(science.exportProgress().weeks['1'].activities['f1-a01'].values['m:k1'], 'd1', 'Activity answers should persist inside the weekly progress record.');
assert.equal(science.practiceSummaryFor(1).done, 0, 'A partially answered activity is not complete.');
science.importProgress({ selectedWeek: 1, weeks: { '1': { activities: { 'f1-a01': { values: { 'm:k1': 'd1', 'm:k2': 'd2', 'm:k3': 'd3', 'm:k4': 'd4', 'm:k5': 'd5', 'm:k6': 'd6' }, checked: true } } } } });
assert.equal(science.practiceSummaryFor(1).done, 1, 'A fully correct matching activity counts as complete.');
const activityHTML = mockElements.scienceWeekContent.innerHTML;
assert.ok(activityHTML.includes('science-activity-set'), 'The week should render its activity set.');
assert.ok(activityHTML.includes('ETKİNLİK SETİ'));
assert.ok(activityHTML.includes('data-practice-card='), 'The set should include a drag-and-drop activity.');
assert.ok(activityHTML.includes('science-practice-fill'), 'The set should include fill-in-the-blank inputs.');
assert.ok(activityHTML.includes('data-practice-text='), 'The set should include a writing activity.');
assert.ok(activityHTML.includes('1 / 14 etkinlik tamamlandı') || activityHTML.includes('1 / 14'), 'The set should show its completion count.');
assert.ok(!activityHTML.includes('<svg'), 'Activity widgets should be HTML controls, not drawings.');
science.importProgress({ selectedWeek: null, weeks: {} });

const links = science.getProviderLinks(science.weeks[0]);
assert.equal(links.eba, 'https://www.eba.gov.tr/');
assert.equal(links.mebi, 'https://mebi.eba.gov.tr/');
assert.ok(new URL(links.tonguc).searchParams.get('search_query').includes('Fen Bilimleri'));
assert.ok(new URL(links.tonguc).searchParams.get('search_query').includes(science.weeks[0].topic));

science.render();
assert.match(mockElements.scienceWeekList.innerHTML, /Uzay Çağı/);
assert.match(mockElements.scienceWeekList.innerHTML, /Kuvvet ve Enerjiyi Keşfedelim/);
assert.match(mockElements.scienceWeekList.innerHTML, /Vücudumuzdaki Sistemler/);
assert.equal(mockElements.scienceWeekPrompt.hidden, false, 'The workspace should begin with the week-selection prompt.');
assert.equal(mockElements.scienceWeekContent.hidden, true);
assert.equal(mockElements.scienceProgressCount.textContent, '0 / 15 hafta tamamlandı');

for (const week of science.weeks) {
  science.importProgress({ selectedWeek: week.id, weeks: {} });
  const html = mockElements.scienceWeekContent.innerHTML;
  const imageCount = (html.match(/class="science-visual-image"/g) || []).length;
  const expectedImages = week.visual === 'spaceVehicles' ? 7 : ['spaceReview', 'systemsReview'].includes(week.visual) ? 4 : 1;
  assert.equal(imageCount, expectedImages, `Week ${week.id} should render all concept-matched science illustrations.`);
  assert.ok(html.includes('science-visual-note'), `Week ${week.id} should describe what its illustration shows.`);
  assert.ok(!/GÖRSELİ \/ KANITI OKU|KİTAPTAN SOMUT ÖRNEK/.test(html), `Week ${week.id} should use topic headings instead of instruction-style headings.`);
  assert.ok(!html.includes('Kavram sözlüğü') && !html.includes('Süreç bağlantısı'), `Week ${week.id} should keep concept definitions within the narrative rather than a separate glossary.`);
}

const normalized = science.normalizeProgress({
  version: 99,
  selectedWeek: 2,
  weeks: { '1': {
    tasks: [true, false, true, true], quizAnswer: 99, quizChecked: true,
    activityAnswer: 'x'.repeat(6000), providers: { eba: true, mebi: 'yes' },
    aiFeedback: { state: 'correct', text: 'Safe local feedback' },
  } },
});
assert.equal(normalized.version, 1);
assert.equal(normalized.selectedWeek, 2);
assert.equal(normalized.weeks['1'].tasks.length, science.weeks[0].tasks.length);
assert.deepEqual(normalized.weeks['1'].tasks.slice(0, 3), [true, false, true]);
assert.equal(normalized.weeks['1'].quizAnswer, null);
assert.equal(normalized.weeks['1'].activityAnswer.length, 5000);
assert.equal(normalized.weeks['1'].providers.eba, true);
assert.equal(normalized.weeks['1'].providers.mebi, false);
assert.equal(normalized.weeks['1'].aiFeedback.state, 'correct');

const week1 = science.weeks[0];
const completeWeek1 = {
  tasks: week1.tasks.map(() => true), quizAnswer: week1.quiz.answer, quizChecked: true,
  activityAnswer: `Bu hafta için kendi örneğim ve gerekçem: ${'kanıt '.repeat(8)}`,
};
assert.equal(science.isQuizCorrect(week1, completeWeek1), true);
assert.equal(science.isActivityComplete(week1, completeWeek1), true);
assert.equal(science.isWeekComplete(week1, completeWeek1), true);
assert.equal(science.isWeekComplete(week1, { ...completeWeek1, tasks: week1.tasks.map((_, index) => index !== 1) }), false);
assert.equal(science.isWeekComplete(week1, { ...completeWeek1, quizAnswer: (week1.quiz.answer + 1) % 4 }), false);
assert.equal(science.isWeekComplete(week1, { ...completeWeek1, activityAnswer: 'Kısa.' }), false);

science.importProgress({ selectedWeek: 1, weeks: { '1': completeWeek1 } });
assert.ok(storage.has('emr7lect.science.v2'), 'Science progress should have its own, versioned localStorage namespace.');
assert.equal(mockElements.scienceWeekPrompt.hidden, true);
assert.equal(mockElements.scienceWeekContent.hidden, false);
assert.match(mockElements.scienceWeekContent.innerHTML, /Uzay araştırmalarına giriş/);
assert.match(mockElements.scienceWeekContent.innerHTML, /class="science-visual-image"/);
assert.match(mockElements.scienceWeekContent.innerHTML, /ÖZGÜN GÖRSEL MODEL/);
assert.ok(mockElements.scienceWeekContent.innerHTML.indexOf('science-visual') < mockElements.scienceWeekContent.innerHTML.indexOf('science-topic-summary'), 'The lesson visual should introduce the explanation.');
assert.ok(!mockElements.scienceWeekContent.innerHTML.includes('<svg'), 'The generated editorial images replace the placeholder inline SVG drawings.');
assert.match(mockElements.scienceWeekContent.innerHTML, /ÖZGÜN UYGULAMA/);
assert.match(mockElements.scienceWeekContent.innerHTML, /Kontrol et/);
assert.equal(mockElements.scienceProgressCount.textContent, '1 / 15 hafta tamamlandı');

science.importProgress({ selectedWeek: 2, weeks: {} });
let visualHTML = mockElements.scienceWeekContent.innerHTML;
assert.equal((visualHTML.match(/class="science-visual-image"/g) || []).length, 7);
for (const label of ['Uzay roketi', 'Haberleşme uydusu', 'Dünya gözlem uydusu', 'Uzay sondası', 'Uzay mekiği', 'Uzay istasyonu', 'Teleskop']) assert.ok(visualHTML.includes(label), `The vehicle gallery should show ${label}.`);
assert.ok(!visualHTML.includes('science-research-brief'), 'The vehicle-model performance task should not be turned into a research brief.');
assert.match(visualHTML, /Görsel galerisine dön/);
science.importProgress({ selectedWeek: 2, weeks: {} });
assert.equal((mockElements.scienceWeekContent.innerHTML.match(/class="science-visual-image"/g) || []).length, 7, 'The merged vehicle week should keep the seven-vehicle gallery.');
science.importProgress({ selectedWeek: 3, weeks: {} });
const conceptHTML = mockElements.scienceWeekContent.innerHTML;
const conceptCards = conceptHTML.match(/class="science-concept-card[^"]*"/g) || [];
assert.equal(conceptCards.length, science.weeks[2].terms.length, 'Each concept should appear once in the in-flow concept strip.');
assert.ok(conceptHTML.indexOf('science-topic-summary') < conceptHTML.indexOf('science-concept-flow'), 'Concept cards should follow the lesson narrative they explain.');
assert.ok(conceptHTML.indexOf('science-concept-flow') < conceptHTML.indexOf('science-practice-card'), 'Concept cards should stay inside the lesson flow, before the practice card.');
assert.ok(!/science-glossary|Kavram sözlüğü/.test(conceptHTML), 'Concepts must not become a separate glossary block.');
const conceptImages = conceptHTML.match(/<img [^>]*class="science-concept-image"[^>]*>/g) || [];
assert.ok(conceptImages.length >= 1, 'Concepts with illustrations should show them inside their card.');
assert.ok(conceptImages.every((tag) => tag.includes('srcset=') && tag.includes('loading="lazy"') && /alt="[^"]{40,}"/.test(tag)), 'Concept illustrations need responsive, lazy-loaded images with meaningful alternative text.');
assert.ok(conceptHTML.includes('science-concept-image'), 'The vehicle week should reuse concept illustrations where available.');

science.importProgress({ selectedWeek: 3, weeks: {} });
const mergedTechnologyHTML = mockElements.scienceWeekContent.innerHTML;
assert.match(mergedTechnologyHTML, /MR\/tomografi\/ultrason/, 'Daily-life technology examples should stay inside the merged week narrative.');
assert.equal((mergedTechnologyHTML.match(/KONU ANLATIMI/g) || []).length, 1, 'Merged weeks keep a single in-context explanation block.');

for (const [weekId, label, phrase] of [
  [3, 'PERFORMANS GÖREVİ · ARAŞTIRMA SONUCU', 'uzay enkazı'],
  [4, 'KEŞİF NOKTASI · ARAŞTIRMA SONUCU', 'Önyıldız'],
  [9, 'PERFORMANS GÖREVİ · ARAŞTIRMA SONUCU', 'görev paylaşımı'],
  [10, 'PERFORMANS GÖREVİ · ARAŞTIRMA SONUCU', 'günlük alışkanlıklar'],
  [12, 'PERFORMANS GÖREVİ · ARAŞTIRMA SONUCU', 'Kan ve organ bağışı'],
  [13, 'PERFORMANS GÖREVİ · ARAŞTIRMA SONUCU', 'Solunum sistemini korumak'],
  [14, 'PERFORMANS GÖREVİ · ARAŞTIRMA SONUCU', 'farkındalık'],
  [15, 'PERFORMANS GÖREVİ · ARAŞTIRMA SONUCU', 'Sıvı dengesi'],
]) {
  science.importProgress({ selectedWeek: weekId, weeks: {} });
  assert.ok(mockElements.scienceWeekContent.innerHTML.includes(label), `Week ${weekId} should show only its qualifying task heading.`);
  assert.ok(mockElements.scienceWeekContent.innerHTML.includes(phrase), `Week ${weekId} should display its research result.`);
}

science.importProgress({ selectedWeek: 5, weeks: {} });
assert.equal((mockElements.scienceWeekContent.innerHTML.match(/class="science-visual-image"/g) || []).length, 4, 'The space review should show four separate source-aligned images.');
assert.match(mockElements.scienceWeekContent.innerHTML, /Yörünge güvenliği/);
science.importProgress({ selectedWeek: 15, weeks: {} });
assert.equal((mockElements.scienceWeekContent.innerHTML.match(/class="science-visual-image"/g) || []).length, 4, 'The systems review should show four separate anatomy illustrations.');
assert.match(mockElements.scienceWeekContent.innerHTML, /Boşaltım/);
science.importProgress({ selectedWeek: 4, weeks: {} });
assert.match(mockElements.scienceWeekContent.innerHTML, /Büyük kütleli yol/);
assert.match(mockElements.scienceWeekContent.innerHTML, /Gezegenimsi bulutsu/);
assert.match(mockElements.scienceWeekContent.innerHTML, /science-visual-routes/);
assert.match(mockElements.scienceWeekContent.innerHTML, /loading="lazy"/);
const lessonImages = mockElements.scienceWeekContent.innerHTML.match(/<img [^>]*class="science-visual-image"[^>]*>/g) || [];
assert.ok(lessonImages.length > 0, 'The focused week should render its own lesson illustration.');
assert.ok(lessonImages.every((tag) => /alt="[^"]{40,}"/.test(tag) && !/alt="(Görsel|Resim|Fotoğraf)"/.test(tag)), 'Every lesson illustration needs a descriptive, meaningful alternative text.');
assert.ok(lessonImages.every((tag) => tag.includes('loading="lazy"') && tag.includes('decoding="async"')), 'Lesson illustrations should lazy-load asynchronously.');
assert.ok(lessonImages.every((tag) => tag.includes('srcset=') && tag.includes('sizes=') && tag.includes('width=') && tag.includes('height=')), 'Lesson illustrations should ship responsive srcset/sizes and explicit dimensions.');
assert.ok(lessonImages.every((tag) => /\.webp"/.test(tag)), 'Lesson illustrations should be served as optimized WebP raster images.');

const assessment = science.safeScienceAssessment(JSON.stringify({
  state: 'partial', issue: 'completeness', hint: 'recheck', freeText: 'This must never appear to the learner.',
}));
assert.deepEqual(assessment, { state: 'partial', issue: 'completeness', hint: 'recheck' });
assert.match(science.safeScienceFeedbackText(assessment), /KISMEN DOĞRU/);
assert.ok(!science.safeScienceFeedbackText(assessment).includes('freeText'));
assert.equal(science.safeScienceAssessment(JSON.stringify({ state: 'unexpected', issue: 'unknown', hint: 'unknown' })).state, 'unrated');
assert.throws(() => science.safeScienceAssessment('not JSON'), /güvenli değerlendirme biçimi/);

async function checkAICheckAndStaleResponse() {
  const answer = `Bir kanıtla ilişkilendirdiğim kendi açıklamam: ${'ölçüm ve kaynak '.repeat(4)}`;
  science.importProgress({ selectedWeek: 13, weeks: { '13': { activityAnswer: answer } } });
  mockElements.apiKey.value = 'test-groq-key';
  const aiNode = new MockElement('science-ai-feedback-13');
  mockElements['science-ai-feedback-13'] = aiNode;
  const button = new MockElement('ai-check-button');
  button.dataset.scienceAiCheck = '13';
  let requestUrl = '';
  let requestOptions = null;
  global.fetch = async (url, options) => {
    requestUrl = url;
    requestOptions = options;
    return {
      ok: true,
      status: 200,
      json: async () => ({ choices: [{ message: { content: JSON.stringify({ state: 'correct', issue: 'none', hint: 'recheck', extra: 'ignored' }) } }] }),
    };
  };
  await science.runAICheck(button);
  assert.equal(requestUrl, 'https://api.groq.com/openai/v1/chat/completions');
  assert.equal(requestOptions.headers.Authorization, 'Bearer test-groq-key');
  const requestBody = JSON.parse(requestOptions.body);
  assert.equal(requestBody.model, mockElements.model.value);
  assert.equal(requestBody.response_format.type, 'json_object');
  assert.ok(requestBody.messages[1].content.includes(answer.trim()));
  const saved = science.exportProgress().weeks['13'];
  assert.equal(saved.aiFeedback.state, 'correct');
  assert.ok(aiNode.textContent.includes('TAM DOĞRU'));
  assert.ok(!JSON.stringify(saved).includes('test-groq-key'), 'The API key must never be stored in Fen progress.');

  science.importProgress({ selectedWeek: 13, weeks: { '13': { activityAnswer: answer } } });
  let resolveFetch;
  global.fetch = () => new Promise((resolve) => { resolveFetch = resolve; });
  const pending = science.runAICheck(button);
  assert.equal(typeof resolveFetch, 'function');
  science.importProgress({ selectedWeek: 13, weeks: { '13': { activityAnswer: 'The learner edited this answer while the check was pending.' } } });
  resolveFetch({
    ok: true,
    status: 200,
    json: async () => ({ choices: [{ message: { content: JSON.stringify({ state: 'partial', issue: 'completeness', hint: 'recheck' }) } }] }),
  });
  await pending;
  assert.ok(mockElements['science-ai-feedback-13'].textContent.includes('Yanıt kontrol sırasında değişti'));
  assert.equal(science.exportProgress().weeks['13'].aiFeedback, null, 'A stale assessment must not be saved against an edited response.');

  mockElements.apiKey.value = '';
  science.importProgress({ selectedWeek: 13, weeks: { '13': { activityAnswer: answer } } });
  const missingKeyButton = new MockElement('missing-key-button');
  missingKeyButton.dataset.scienceAiCheck = '13';
  await science.runAICheck(missingKeyButton);
  assert.equal(mockElements.apiSettings.open, true, 'Missing-key feedback should open the single shared settings panel.');
  assert.ok(science.exportProgress().weeks['13'].aiFeedback.text.includes('ortak Groq ayarları'));

  science.resetProgress();
  assert.equal(science.exportProgress().selectedWeek, null);
  assert.deepEqual(science.exportProgress().weeks, {});
  assert.ok(storage.has('emr7lect.science.v2'));
  console.log('Fen Bilimleri 15-week first-term calendar with merged topics, four-part in-context explanations, task-gated research results, original seven-vehicle gallery and weekly visuals, rose-berry palette, unchanged tasks/quizzes/activities, safe Groq checks, progress isolation, completion rules, and backup API passed.');
}

checkAICheckAndStaleResponse().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
