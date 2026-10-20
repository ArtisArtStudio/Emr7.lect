#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const storage = new Map();
global.window = {
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value)),
  },
  print() {},
};
const mockElements = {};
global.document = {
  getElementById: (id) => mockElements[id] ?? null,
  querySelector: () => null,
};

class MockElement {
  constructor(id) {
    this.id = id;
    this.hidden = false;
    this.innerHTML = '';
    this.textContent = '';
    this.dataset = {};
    this.style = {};
    this.attributes = {};
    this.listeners = {};
    this.classList = { toggle() {} };
  }
  addEventListener(name, callback) { this.listeners[name] = callback; }
  setAttribute(name, value) { this.attributes[name] = value; }
  removeAttribute(name) { delete this.attributes[name]; }
  focus() {}
}

require('../social-studies-content.js');
require('../social-studies.js');
const social = global.window.SOCIAL_STUDIES;
assert.ok(social, 'The Social Studies workspace should expose its module API.');
assert.equal(social.weeks.length, 37, 'The plan must retain 37 individually tracked weeks.');
assert.deepEqual(social.weeks.map((week) => week.id), Array.from({ length: 37 }, (_, index) => index + 1));
assert.deepEqual(social.units.map((unit) => unit.title), [
  'Birlikte Yaşamak', 'Evimiz Dünya', 'Ortak Mirasımız', 'Tekrar ve paylaşım',
]);
assert.deepEqual(
  Object.fromEntries(social.units.map((unit) => [unit.id, social.weeks.filter((week) => week.unitId === unit.id).length])),
  { together: 12, world: 6, heritage: 17, review: 2 },
);
assert.ok(social.weeks.some((week) => week.topic === 'Büyük deniz seyahatleri ve Osmanlı ekonomisi'), 'The third learning area should include the textbook topic on sea routes and Ottoman economic effects.');
assert.ok(social.weeks.every((week) => week.date && week.topic && week.focus && week.tasks.length === 3));
assert.ok(social.weeks.every((week) => week.summary.length > 100 && week.summaryPoints.length >= 3 && week.keyTerms.length >= 3), 'Every week needs a meaningful topic summary, learning points, and key terms.');
assert.ok(social.weeks.every((week) => week.source.includes('MEB 7. Sınıf') || week.unitId === 'review'));

for (const week of social.weeks) {
  assert.equal(week.activities.length, 3, `Week ${week.id} should have a three-part learning/application/reflection flow.`);
  assert.deepEqual(week.activities.map((activity) => activity.id), ['self-check', 'book', 'apply']);
  const ids = new Set();
  for (const activity of week.activities) {
    assert.ok(activity.sourceStyle && activity.title && activity.prompt && activity.fields.length >= 2, `Week ${week.id} is missing a substantial activity step.`);
    const fieldIds = activity.fields.map((field) => field.id);
    assert.equal(new Set(fieldIds).size, fieldIds.length, `Week ${week.id}, ${activity.id} has duplicate field IDs.`);
    for (const field of activity.fields) {
      assert.ok(field.id && field.label && ['text', 'textarea', 'words', 'checklist', 'choice'].includes(field.kind), `Week ${week.id} has an unsupported/missing field.`);
      assert.ok(!ids.has(`${activity.id}:${field.id}`), `Week ${week.id} has a repeated activity field key.`);
      ids.add(`${activity.id}:${field.id}`);
      if (field.kind === 'checklist') assert.ok(field.options.length > 0 && field.options.every((option) => option.id && option.label));
      if (field.kind === 'choice') {
        assert.ok(field.options.length >= 3 && field.options.every((option) => option.id && option.label));
        assert.ok(field.options.some((option) => option.id === field.answer), `Week ${week.id} has a self-check with no valid answer.`);
        assert.ok(field.explanation && field.hint, `Week ${week.id} needs useful right/wrong feedback.`);
      }
    }
  }
  assert.equal(week.activities[0].fields.length, 2, `Week ${week.id} should include two topic-specific self-check questions.`);
  assert.ok(week.activities[0].fields.every((field) => field.kind === 'choice'));
  assert.ok(week.activities[1].fields.length >= 2, `Week ${week.id} must keep its PDF-aligned core activity.`);
  assert.equal(week.activities[2].fields.length, 2, `Week ${week.id} needs two application/reflection responses.`);

  const responses = Object.fromEntries(week.activities.map((activity) => [activity.id, Object.fromEntries(activity.fields.map((field) => {
    if (field.kind === 'checklist') return [field.id, Object.fromEntries(field.options.map((option) => [option.id, true]))];
    if (field.kind === 'words') return [field.id, 'saygı, dayanışma, sorumluluk'];
    if (field.kind === 'choice') return [field.id, field.answer];
    return [field.id, 'Öğrenci yanıtı: kaynakta gördüğüm bilgi ve gerekçem.'];
  }))]));
  const choiceChecks = Object.fromEntries(week.activities.map((activity) => [activity.id, Object.fromEntries(activity.fields.filter((field) => field.kind === 'choice').map((field) => [field.id, true]))]));
  const completeRecord = { tasks: week.tasks.map(() => true), responses, choiceChecks };
  assert.equal(social.isActivityComplete(week, completeRecord), true, `Week ${week.id} should complete with all responses and checked self-assessments.`);
  assert.equal(social.isWeekComplete(week, completeRecord), true, `Week ${week.id} should auto-complete after tasks and activities.`);
  assert.equal(social.isActivityComplete(week, { ...completeRecord, choiceChecks: {} }), false, `Week ${week.id} must require the student to check self-assessment feedback.`);
  const wrongResponses = structuredClone(responses);
  const firstChoice = week.activities[0].fields[0];
  wrongResponses['self-check'][firstChoice.id] = firstChoice.options.find((option) => option.id !== firstChoice.answer).id;
  assert.equal(social.isActivityComplete(week, { ...completeRecord, responses: wrongResponses }), false, `Week ${week.id} must not complete while a self-check answer is wrong.`);
  assert.equal(social.isWeekComplete(week, { ...completeRecord, tasks: week.tasks.map(() => false) }), false, `Week ${week.id} must require all mini-plan tasks.`);
  const incompleteResponses = structuredClone(responses);
  const requiredField = week.activities[1].fields.find((field) => field.kind !== 'checklist');
  if (requiredField) incompleteResponses.book[requiredField.id] = '';
  else if (week.activities[1].fields[0]?.kind === 'checklist') incompleteResponses.book[week.activities[1].fields[0].id] = {};
  assert.equal(social.isActivityComplete(week, { responses: incompleteResponses, choiceChecks }), false, `Week ${week.id} must require its activity responses.`);

  const links = social.getProviderLinks(week);
  const search = new URL(links.tonguc).searchParams.get('search_query');
  assert.ok(search.includes('Sosyal Bilgiler') && search.includes(week.topic), `Week ${week.id} Tonguç search must include its topic.`);
  assert.equal(links.eba, 'https://eba.gov.tr/dersler/detay/17-sosyal-bilgiler?duzey=Ortaokul&okulTuru=6&sinif=15&genelMudurluk=33&ders=17&program=1131&kazanimlar=310150');
  assert.equal(links.mebi, 'https://mebi.eba.gov.tr/student/section/upper-subjects/bee82e4d-de71-4a3e-0884-08ddc2afb3ce');
}

const week1 = social.weeks[0];
const imported = social.normalizeProgress({
  version: 1,
  selectedWeek: 7,
  weeks: { '1': { tasks: [true], responses: { respect: '<script>not markup</script>' }, platforms: { eba: true } } },
});
assert.equal(imported.version, 2);
assert.equal(imported.selectedWeek, 7);
assert.equal(imported.weeks['1'].tasks.length, week1.tasks.length);
assert.equal(imported.weeks['1'].tasks[0], true);
assert.equal(imported.weeks['1'].tasks[1], false);
assert.equal(imported.weeks['1'].responses.book.respect, '<script>not markup</script>', 'v1 activity responses should migrate into the book activity without loss.');
assert.equal(imported.weeks['1'].responses['self-check']['self-check-1'], '');
assert.equal(imported.weeks['1'].choiceChecks['self-check']['self-check-1'], false);
assert.equal(imported.weeks['1'].platforms.eba, true);
assert.equal(imported.weeks['1'].platforms.tonguc, false);

social.importProgress(imported);
const exported = social.exportProgress();
assert.equal(exported.selectedWeek, 7);
assert.equal(exported.weeks['1'].platforms.eba, true);
assert.equal(exported.weeks['1'].responses.book.respect, '<script>not markup</script>');
assert.ok(storage.has('emr7lect.socialStudies.v1'), 'Progress should persist in its subject-specific localStorage key.');
social.resetProgress();
assert.equal(social.exportProgress().selectedWeek, 1);

const sourceStyles = new Set(social.weeks.map((week) => week.activities[1].sourceStyle));
for (const sourceStyle of ['Yapboz parçaları', 'Örnek olay inceleme', 'Cümle dönüştürme', 'Beyin yazımı', 'Proje taslağı ve kontrol listesi', 'Kelime bulutu', 'Kaynak inceleme ve tablo', 'Harita inceleme', 'Harita inceleme ve neden–sonuç tablosu', 'GZFT analizi', 'Soru–cevap', 'Kısa haber metni', 'Neden–sonuç tablosu']) {
  assert.ok(sourceStyles.has(sourceStyle), `The PDF-aligned activity pattern is missing: ${sourceStyle}`);
}
assert.ok(social.weeks[1].activities[2].scenario.includes('İki öğrenci'), 'The activity flow should include an original predict-the-continuation case.');
assert.ok(social.weeks[10].activities[1].sourceStyle.includes('Karşılaştırma'), 'PDF-inspired source comparison should remain available.');

for (const id of ['socialWorkspace', 'socialWeekList', 'socialWeekPrompt', 'socialWeekContent', 'socialProgressBar', 'socialProgressTrack', 'socialProgressCount']) {
  mockElements[id] = new MockElement(id);
}
social.resetProgress();
const root = mockElements.socialWorkspace;
assert.ok(root.listeners.click && root.listeners.input && root.listeners.change, 'Social activity interactions should be delegated from the workspace.');
assert.equal((mockElements.socialWeekList.innerHTML.match(/data-social-select=/g) || []).length, 37, 'The UI should render every week separately.');
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Gruplarda ve sosyal hayatta iletişim'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('14–18 Eyl 2026–2027 · 1. hafta'));
assert.ok(!mockElements.socialWeekContent.innerHTML.includes('ham hafta'), 'The user interface must not call a week a “ham hafta”.');
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Haftalık çalışma çizelgesi'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Haftanın kısa konu özeti'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Anahtar kavramlar'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('data-social-activity-select="0"') && mockElements.socialWeekContent.innerHTML.includes('data-social-activity-select="2"'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Seçimimi kontrol et'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('EBA Sosyal Bilgiler') && mockElements.socialWeekContent.innerHTML.includes('MEBİ çalışmaları'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('https://eba.gov.tr/dersler/detay/17-sosyal-bilgiler?duzey=Ortaokul&amp;okulTuru=6&amp;sinif=15&amp;genelMudurluk=33&amp;ders=17&amp;program=1131&amp;kazanimlar=310150'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('https://mebi.eba.gov.tr/student/section/upper-subjects/bee82e4d-de71-4a3e-0884-08ddc2afb3ce'));
assert.equal(mockElements.socialWeekPrompt.hidden, true);
assert.equal(mockElements.socialWeekContent.hidden, false);
assert.equal(mockElements.socialProgressCount.textContent, '0 / 37 hafta tamamlandı');

const week20Button = { dataset: { socialSelect: '20' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-select]' ? week20Button : null } });
assert.equal(social.exportProgress().selectedWeek, 20);
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Osmanlı Beyliği’nin kuruluş yeri ve GZFT'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('GZFT’yi gerekçeyle doldur'));
const responseInput = {
  dataset: { socialWeek: '20', socialActivity: 'book', socialResponse: 'strength' },
  value: 'Kuruluş konumu gelişme için fırsatlar sunabilir.',
  type: 'textarea',
  closest(selector) { return selector === '[data-social-response]' ? this : null; },
};
root.listeners.input({ target: responseInput });
assert.equal(social.exportProgress().weeks['20'].responses.book.strength, responseInput.value);
const taskInput = { dataset: { socialWeek: '20', socialTask: '0' }, checked: true };
root.listeners.change({ target: taskInput });
const providerInput = { dataset: { socialWeek: '20', socialProvider: 'eba' }, checked: true };
root.listeners.change({ target: providerInput });
assert.equal(social.exportProgress().weeks['20'].tasks[0], true);
assert.equal(social.exportProgress().weeks['20'].platforms.eba, true);
assert.notEqual(social.exportProgress().weeks['21']?.platforms.eba, true, 'External platform progress must stay separate by week.');
assert.equal(social.isWeekComplete(social.weeks[19]), false, 'The app tracker must stay incomplete until every task and activity field is done.');

const radioInput = {
  dataset: { socialWeek: '20', socialActivity: 'self-check', socialResponse: 'self-check-1' },
  type: 'radio',
  value: social.weeks[19].activities[0].fields[0].answer,
};
root.listeners.change({ target: radioInput });
assert.equal(social.exportProgress().weeks['20'].responses['self-check']['self-check-1'], radioInput.value);
const checkChoiceButton = { dataset: { socialWeek: '20', socialActivity: 'self-check', socialCheckChoice: 'self-check-1' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-check-choice]' ? checkChoiceButton : null } });
assert.equal(social.exportProgress().weeks['20'].choiceChecks['self-check']['self-check-1'], true, 'Checking a self-assessment should persist its feedback state.');
const activityStepButton = { dataset: { socialActivitySelect: '2' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? activityStepButton : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('GZFT’yi gerekçeyle dold'), 'The student should be able to navigate to the transfer/reflection step.');

console.log('Social Studies summaries, three-step activities, PDF-aligned formats, migration, completion rules, exact links, and isolated backups passed.');
