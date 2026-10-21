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

require('../ai-grader.js');
require('../science-content.js');
require('../science-term-notes.js');
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
  [...socialStudiesSource.matchAll(/\{\s*id:\s*(\d+),\s*date:\s*'([^']+)'/g)].map(([, id, date]) => [Number(id), date]),
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
assert.ok(!/ders kitab|MEB Fen Bilimleri|s\. \d+–\d+|kitabın (vurguladığı|anlattığı|belirttiği)/i.test(JSON.stringify(science.weeks)), 'Lesson texts must not cite the textbook: the everyday phrase "bir kitabı rafa kaldırmak" is allowed, citations are not.');

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
assert.deepEqual(Object.keys(activityData.weeks).map(Number).sort((a, b) => a - b), [1, 2, 3], 'The analysed activity rounds should cover the first three weeks.');
for (const weekId of [1, 2, 3]) {
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
assert.equal(science.practiceSummaryFor(3).total, 14, 'Week 3 should carry its own activity set.');
assert.equal(science.practiceSummaryFor(4).total, 0, 'Weeks without an analysed set should not fake activities.');
const week3Groups = global.window.SCIENCE_ACTIVITIES.weeks[3].groups;
assert.equal(week3Groups.length, 3, 'Week 3 should be organised in three sections.');
assert.deepEqual(week3Groups.map((group) => group.activities.length), [4, 4, 6], 'Week 3 sections should keep the shared 4-4-6 layout.');
assert.ok(week3Groups.flatMap((group) => group.activities).every((activity) => activity.count && activity.format && activity.skill), 'Week 3 activities need count, format and skill chips.');
assert.ok(!/kitap|ders kitab|sayfa \d/i.test(JSON.stringify(global.window.SCIENCE_ACTIVITIES.weeks[3])), 'Week 3 activities must not cite the textbook.');

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
assert.ok(activityHTML.includes('ETKİNLİK 1 / 14'), 'Activity headers should use the shared ETKİNLİK n / N kicker.');
assert.ok(!activityHTML.includes('<svg'), 'Activity widgets should be HTML controls, not drawings.');
const fillInputs = activityHTML.match(/<input[^>]*data-practice-input[^>]*>/g) || [];
assert.ok(fillInputs.length >= 5, 'Fill-in-the-blank activities should render text inputs.');
assert.ok(fillInputs.every((tag) => !tag.includes('placeholder=')), 'Fill inputs must not carry hint text that gives the answer away.');
assert.equal((activityHTML.match(/science-activity-icon/g) || []).length, 14, 'Every activity card should carry its type icon.');
assert.equal((activityHTML.match(/science-quest-path/g) || []).length, 14, 'Every activity card should show its three-step path.');
assert.ok(activityHTML.includes('science-practice-meter') && activityHTML.includes('science-practice-bar'), 'The set should show a completion meter.');


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

// Kavram kartları: her kavram kendi tanımını ve tek bir örneğini göstermeli. Aynı cümlenin
// iki karta birden düşmesi ve kelime içinde eşleşme ("iş" ↔ "değiştiren") gerilemesi burada yakalanır.
const termNotes = global.window.SCIENCE_TERM_NOTES;
assert.ok(termNotes && typeof termNotes === 'object', 'Concept definitions should come from the dedicated science-term-notes module.');
for (const week of science.weeks) {
  const map = termNotes[week.id] || {};
  for (const term of week.terms) {
    const note = map[term];
    assert.ok(note, `Week ${week.id} is missing a dedicated definition for "${term}".`);
    assert.ok(note.length >= 90, `The definition for "${term}" is too short to define the concept and give an example.`);
    assert.ok((note.match(/[.!?]/g) || []).length >= 2, `"${term}" needs a definition sentence plus its own example.`);
    assert.notEqual(note, week.focus, `"${term}" must not fall back to the weekly focus line.`);
    assert.match(note, /[çğıöşüÇĞİÖŞÜ]/, `The definition for "${term}" should read as Turkish.`);
  }
  const weekNotes = week.terms.map((term) => map[term]);
  assert.equal(new Set(weekNotes).size, weekNotes.length, `Week ${week.id} shows the same text on more than one concept card.`);
  assert.deepEqual(Object.keys(map).filter((term) => !week.terms.includes(term)), [], `Week ${week.id} defines concepts that are not in its strip.`);
}
const allConceptNotes = science.weeks.flatMap((week) => week.terms.map((term) => termNotes[week.id][term]));
assert.equal(allConceptNotes.length, 146, 'Every concept card in the fifteen weeks should be covered.');
assert.equal(new Set(allConceptNotes).size, 146, 'No two concept cards anywhere should share the same definition text.');

const decodeCardText = (value) => value
  .replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const readConceptCards = (html) => [...html.matchAll(/<li class="science-concept-card[^"]*">[\s\S]*?<strong>([^<]+)<\/strong>\s*<p>([^<]+)<\/p>/g)]
  .map(([, term, text]) => ({ term: decodeCardText(term), text: decodeCardText(text) }));
for (const weekId of [6, 7, 8]) {
  science.importProgress({ selectedWeek: weekId, weeks: {} });
  const cards = readConceptCards(mockElements.scienceWeekContent.innerHTML);
  const week = science.weeks.find((item) => item.id === weekId);
  assert.equal(cards.length, week.terms.length, `Week ${weekId} should render one card per concept.`);
  assert.deepEqual(cards.map((card) => card.text), week.terms.map((term) => termNotes[weekId][term]), `Week ${weekId} cards should print their own definitions.`);
  assert.equal(new Set(cards.map((card) => card.text)).size, cards.length, `Week ${weekId} cards should not repeat text.`);
}
science.importProgress({ selectedWeek: 6, weeks: {} });
const workCard = readConceptCards(mockElements.scienceWeekContent.innerHTML).find((card) => card.term === 'iş');
assert.ok(workCard && workCard.text.startsWith('İş, uygulanan kuvvet'), 'The "iş" card must define work, not match the syllable inside "değiştiren".');
assert.ok(!workCard.text.includes('değiştiren'), 'Concept matching must respect word boundaries.');
science.importProgress({ selectedWeek: 7, weeks: {} });
const kineticCards = readConceptCards(mockElements.scienceWeekContent.innerHTML);
assert.ok(kineticCards.every((card) => card.text !== science.weeks[6].focus), 'Kinetik/potansiyel week cards must each carry their own definition.');
assert.equal(new Set(kineticCards.map((card) => card.text)).size, 8, 'The kinetic and potential energy week should show eight different concept texts.');

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
const starHTML = mockElements.scienceWeekContent.innerHTML;
assert.match(starHTML, /science-star-map/, 'The star week should render a real step diagram, not only an arrow sentence.');
assert.match(starHTML, /Bulutsudan yıldızın sonuna: iki yol/);
assert.match(starHTML, /Küçük kütleli yol/);
assert.match(starHTML, /Büyük kütleli yol/);
assert.equal((starHTML.match(/class="science-star-step"/g) || []).length, 10, 'Two shared stages plus four stages per path should render as ten diagram steps.');
assert.equal((starHTML.match(/class="science-star-path is-/g) || []).length, 2, 'The diagram should split into two mass-dependent lanes.');
assert.equal((starHTML.match(/class="science-star-arrow"[^>]*>[→↓]</g) || []).length, 7, 'Every stage except the last of each chain needs an arrow.');
const starImages = starHTML.match(/<img [^>]*class="science-star-image"[^>]*>/g) || [];
assert.equal(starImages.length, 10, 'Each diagram stage should carry its own illustration.');
assert.ok(starImages.every((tag) => tag.includes('srcset=') && tag.includes('loading="lazy"') && /\.webp/.test(tag) && /alt="[^"]{40,}"/.test(tag)), 'Diagram illustrations need responsive WebP sources and descriptive alternative text.');
const smallLane = starHTML.slice(starHTML.indexOf('is-small'), starHTML.indexOf('is-large'));
['Kırmızı dev', 'Gezegenimsi bulutsu', 'Beyaz cüce'].reduce((previous, name) => {
  const at = smallLane.indexOf(name);
  assert.ok(at > previous, `The small-mass lane should order ${name} after the previous stage.`);
  return at;
}, -1);
assert.ok(!smallLane.includes('Süpernova'), 'The small-mass lane must not borrow the supernova ending.');
assert.ok(starHTML.indexOf('Ortak başlangıç') < starHTML.indexOf('Kütle belirleyici'), 'The shared start should come before the split into two paths.');
assert.match(starHTML, /şema, sırayı görebilmek için aşamaları sadeleştirir/);
assert.ok(!starHTML.includes('science-visual-routes'), 'The diagram replaces the old duplicate arrow-text row.');

// Metin bir şemaya gönderme yapıyorsa o hafta gerçekten şema render etmeli; aksi hâlde metin
// var olmayan bir görsele işaret eder.
for (const week of science.weeks) {
  const prose = [...week.summary, ...week.points, week.focus, week.researchBrief?.takeaway || '', week.researchBrief?.intro || ''].join(' ');
  if (/aşağıdaki şema|şemada|bu şema/i.test(prose)) {
    science.importProgress({ selectedWeek: week.id, weeks: {} });
    assert.match(mockElements.scienceWeekContent.innerHTML, /science-star-map/, `Week ${week.id} promises a diagram in its text but renders none.`);
  }
}
// Arayüzde ders kitabı ya da sayfa numarası atfı görünmemeli.
for (const weekId of [1, 4, 8, 15]) {
  science.importProgress({ selectedWeek: weekId, weeks: {} });
  const weekHTML = mockElements.scienceWeekContent.innerHTML;
  assert.ok(!/Ders kitabı|MEB Fen Bilimleri|s\. \d+–\d+/i.test(weekHTML), `Week ${weekId} must not cite the textbook or page ranges in the interface.`);
  assert.match(weekHTML, /Haftada 4 ders saati/, 'The week badge should describe the schedule, not a textbook page.');
  assert.match(weekHTML, /kazanımlara göre özgün/, 'The footer must describe the content without attributing it to the textbook.');
}
assert.match(starHTML, /loading="lazy"/);
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


async function checkActivityAssessment() {

const feedbackElement = new MockElement('science-feedback-f1-a04');
const pillElement = new MockElement('science-pill-f1-a04');
mockElements['science-feedback-f1-a04'] = feedbackElement;
mockElements['science-pill-f1-a04'] = pillElement;
mockElements['science-card-f1-a04'] = new MockElement('science-card-f1-a04');
mockElements['science-state-f1-a04'] = new MockElement('science-state-f1-a04');
mockElements.apiKey.value = 'test-anahtar';
let capturedPracticeRequest = null;
const previousFetch = global.fetch;
global.fetch = async (_url, options) => {
  capturedPracticeRequest = JSON.parse(options.body);
  return {
    ok: true,
    status: 200,
    json: async () => ({ choices: [{ message: { content: JSON.stringify({ status: 'partial', issues: ['selection'], hint: 'match' }) } }] }),
  };
};
science.importProgress({ selectedWeek: 1, weeks: { '1': { activities: { 'f1-a04': { values: { 's:c1': 'goz', 's:c2': 'goz' } } } } } });
await science.checkActivity('f1-a04', new MockElement('check-button'));
global.fetch = previousFetch;
assert.ok(capturedPracticeRequest, 'Non-multiple-choice activities should be assessed through Groq.');
assert.equal(capturedPracticeRequest.temperature, 0.1);
assert.match(capturedPracticeRequest.messages[0].content, /Fen Bilimleri/);
assert.match(capturedPracticeRequest.messages[0].content, /GİZLİ CEVAP KORUMASI/);
assert.match(capturedPracticeRequest.messages[0].content, /"status"/);
assert.match(capturedPracticeRequest.messages[1].content, /gizli anahtar/);
assert.match(feedbackElement.textContent, /KISMEN DOĞRU/);
assert.match(feedbackElement.textContent, /İPUCU/);
assert.equal(feedbackElement.dataset.state, 'partial');
assert.equal(pillElement.textContent, 'KISMEN DOĞRU');
for (const leak of ['Haberleşme uydusu', 'Gözlem uydusu', 'Televizyon yayını iletmek', 'Orman yangını alanını görüntülemek']) {
  assert.ok(!feedbackElement.textContent.includes(leak), 'Safe feedback must not name the correct card or the wrong card.');
}
assert.equal(science.exportProgress().weeks['1'].activities['f1-a04'].assessment.state, 'partial', 'The AI verdict should persist with the activity answers.');

// Yazılı yanıt koçluğu: guide/starter alanları geri bildirime girer, sınır ve güvenlik kuralları uygulanır.
const textActivityId = 'f1-a09';
for (const suffix of ['feedback', 'pill', 'card', 'state']) {
  mockElements[`science-${suffix}-${textActivityId}`] = new MockElement(`science-${suffix}-${textActivityId}`);
}
const grader = global.window.EMR7_AI_GRADER;
assert.ok(grader, 'The shared AI grader module should be loaded before the science workspace.');
assert.equal(grader.LIMITS.guide, 220);
assert.equal(grader.LIMITS.starter, 140);
assert.match(grader.GUIDE_CONTRACT, /guide/);
assert.match(grader.COACH_RULES, /YAZMA KOÇLUĞU/);

science.importProgress({ selectedWeek: 1, weeks: { '1': { activities: { [textActivityId]: { values: { x: 'Uzay çalışmaları günlük yaşamı etkiler çünkü haberleşme kolaylaşır.' } } } } } });
let coachResponse = null;
global.fetch = async (_url, options) => {
  coachResponse = JSON.parse(options.body);
  return {
    ok: true,
    status: 200,
    json: async () => ({ choices: [{ message: { content: JSON.stringify({
      status: 'partial',
      issues: ['evidence'],
      hint: 'evidence',
      guide: 'Konu anlatımındaki “Uzay kirliliği” paragrafına dön ve nedeni kendi cümlelerinle kur.',
      starter: 'Bunun nedeni …, çünkü …',
    }) } }] }),
  };
};
await science.checkActivity(textActivityId, new MockElement('coach-button'));
global.fetch = previousFetch;
const coachText = mockElements[`science-feedback-${textActivityId}`].textContent;
assert.match(coachResponse.messages[0].content, /YAZMA KOÇLUĞU/, 'The system prompt should carry the shared coaching rules.');
assert.match(coachResponse.messages[0].content, /"guide"/, 'The contract should ask for the guidance fields.');
assert.match(coachText, /YOL GÖSTERİCİ: Konu anlatımındaki/, 'The guided next step should reach the student.');
assert.match(coachText, /YAZMAYA BAŞLA: Bunun nedeni/, 'The sentence starter should reach the student.');
assert.match(coachText, /YAZMA HEDEFİ: Şu an \d+\/220 karakter/, 'The writing target should state the remaining length.');
for (const leak of ['Haberleşme uydusu', 'Gözlem uydusu', 'Televizyon yayını iletmek']) {
  assert.ok(!coachText.includes(leak), 'Coaching feedback must not leak the answer key.');
}

// Cevap sızdıran ya da kitaba gönderme yapan koçluk metni atılır; güvenli yedek kullanılır.
science.importProgress({ selectedWeek: 1, weeks: { '1': { activities: { [textActivityId]: { values: { x: 'Kısa yanıt.' } } } } } });
global.fetch = async () => ({
  ok: true,
  status: 200,
  json: async () => ({ choices: [{ message: { content: JSON.stringify({
    status: 'incomplete',
    issues: ['completeness'],
    hint: 'count',
    guide: 'Ders kitabının 42. sayfasındaki doğru cevabı yaz.',
    starter: 'Doğru cevap: haberleşme uydusu',
  }) } }] }),
});
await science.checkActivity(textActivityId, new MockElement('coach-button'));
global.fetch = previousFetch;
const safeCoachText = mockElements[`science-feedback-${textActivityId}`].textContent;
assert.match(safeCoachText, /YOL GÖSTERİCİ: Konu anlatımındaki ilgili paragrafa dön/, 'Unsafe guidance should fall back to the safe coaching line.');
assert.match(safeCoachText, /YAZMAYA BAŞLA: Bunun nedeni/, 'Unsafe starters should fall back to the safe sentence frame.');
assert.ok(!/42\. sayfa|Ders kitab|Doğru cevap/.test(safeCoachText), 'Book references and answer leaks must never reach the student.');

  mockElements.apiKey.value = '';
  console.log('Fen konu etkinlikleri: boşluklarda ipucu yok, çoktan seçmeli dışındaki etkinlikler güvenli Groq değerlendirmesiyle kontrol ediliyor.');
}

checkAICheckAndStaleResponse().then(checkActivityAssessment).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
