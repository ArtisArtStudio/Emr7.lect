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
global.document = { getElementById: (id) => mockElements[id] ?? null, querySelector: () => null };

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
  focus() {}
}

require('../social-studies.js');
const social = global.window.SOCIAL_STUDIES;
assert.ok(social, 'The Social Studies workspace should expose its module API.');
assert.equal(social.weeks.length, 37, 'The plan must retain 37 raw weeks.');
assert.deepEqual(social.weeks.map((week) => week.id), Array.from({ length: 37 }, (_, index) => index + 1));
assert.deepEqual(social.units.map((unit) => unit.title), [
  'Birlikte Yaşamak', 'Evimiz Dünya', 'Ortak Mirasımız', 'Tekrar ve paylaşım',
]);
assert.deepEqual(
  Object.fromEntries(social.units.map((unit) => [unit.id, social.weeks.filter((week) => week.unitId === unit.id).length])),
  { together: 12, world: 6, heritage: 17, review: 2 },
);
assert.ok(social.weeks.every((week) => week.date && week.topic && week.focus && week.tasks.length === 3 && week.activity.fields.length));
assert.ok(social.weeks.every((week) => week.source.includes('MEB 7. Sınıf') || week.unitId === 'review'));

for (const week of social.weeks) {
  const fieldIds = week.activity.fields.map((field) => field.id);
  assert.equal(new Set(fieldIds).size, fieldIds.length, `Week ${week.id} has duplicate activity field IDs.`);
  assert.ok(week.activity.sourceStyle && week.activity.title && week.activity.prompt, `Week ${week.id} is missing an activity description.`);
  for (const field of week.activity.fields) {
    assert.ok(field.id && field.label && ['text', 'textarea', 'words', 'checklist'].includes(field.kind), `Week ${week.id} has an unsupported/missing field.`);
    if (field.kind === 'checklist') assert.ok(field.options.length > 0 && field.options.every((option) => option.id && option.label));
  }

  const responses = Object.fromEntries(week.activity.fields.map((field) => {
    if (field.kind === 'checklist') return [field.id, Object.fromEntries(field.options.map((option) => [option.id, true]))];
    if (field.kind === 'words') return [field.id, 'saygı, dayanışma, sorumluluk'];
    return [field.id, 'Öğrenci yanıtı: kaynakta gördüğüm bilgi ve gerekçem.'];
  }));
  const completeRecord = { tasks: week.tasks.map(() => true), responses };
  assert.equal(social.isActivityComplete(week, completeRecord), true, `Week ${week.id} should complete with all responses.`);
  assert.equal(social.isWeekComplete(week, completeRecord), true, `Week ${week.id} should auto-complete after tasks and activity.`);
  assert.equal(social.isWeekComplete(week, { tasks: week.tasks.map(() => false), responses }), false, `Week ${week.id} must require all mini-plan tasks.`);
  const incompleteResponses = { ...responses };
  const requiredField = week.activity.fields.find((field) => field.kind !== 'checklist');
  if (requiredField) incompleteResponses[requiredField.id] = '';
  else if (week.activity.fields[0]?.kind === 'checklist') incompleteResponses[week.activity.fields[0].id] = {};
  assert.equal(social.isActivityComplete(week, { responses: incompleteResponses }), false, `Week ${week.id} must require its activity responses.`);

  const links = social.getProviderLinks(week);
  const search = new URL(links.tonguc).searchParams.get('search_query');
  assert.ok(search.includes('Sosyal Bilgiler') && search.includes(week.topic), `Week ${week.id} Tonguç search must include its topic.`);
  assert.equal(links.eba, 'https://www.eba.gov.tr/');
  assert.equal(links.mebi, 'https://mebi.eba.gov.tr/');
}

const week1 = social.weeks[0];
const imported = social.normalizeProgress({
  version: 9,
  selectedWeek: 7,
  weeks: { '1': { tasks: [true], responses: { respect: '<script>not markup</script>' }, platforms: { eba: true } } },
});
assert.equal(imported.selectedWeek, 7);
assert.equal(imported.weeks['1'].tasks.length, week1.tasks.length);
assert.equal(imported.weeks['1'].tasks[0], true);
assert.equal(imported.weeks['1'].tasks[1], false);
assert.equal(imported.weeks['1'].responses.respect, '<script>not markup</script>');
assert.equal(imported.weeks['1'].platforms.eba, true);
assert.equal(imported.weeks['1'].platforms.tonguc, false);

social.importProgress(imported);
const exported = social.exportProgress();
assert.equal(exported.selectedWeek, 7);
assert.equal(exported.weeks['1'].platforms.eba, true);
assert.ok(storage.has('emr7lect.socialStudies.v1'), 'Progress should persist in its subject-specific localStorage key.');
social.resetProgress();
assert.equal(social.exportProgress().selectedWeek, 1);

const sourceStyles = new Set(social.weeks.map((week) => week.activity.sourceStyle));
for (const sourceStyle of ['Yapboz parçaları', 'Beyin yazımı', 'Proje taslağı ve kontrol listesi', 'Kelime bulutu', 'Harita inceleme', 'GZFT analizi', 'Soru–cevap', 'Kısa haber metni', 'Neden–sonuç tablosu']) {
  assert.ok(sourceStyles.has(sourceStyle), `The PDF-aligned activity pattern is missing: ${sourceStyle}`);
}

for (const id of ['socialWorkspace', 'socialWeekList', 'socialWeekPrompt', 'socialWeekContent', 'socialProgressBar', 'socialProgressTrack', 'socialProgressCount']) {
  mockElements[id] = new MockElement(id);
}
social.resetProgress();
const root = mockElements.socialWorkspace;
assert.ok(root.listeners.click && root.listeners.input && root.listeners.change, 'Social activity interactions should be delegated from the workspace.');
assert.equal((mockElements.socialWeekList.innerHTML.match(/data-social-select=/g) || []).length, 37, 'The UI should render every raw week separately.');
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Gruplarda ve sosyal hayatta iletişim'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('14–18 Eyl 2026–2027 · 1. ham hafta'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('EBA Sosyal Bilgiler') && mockElements.socialWeekContent.innerHTML.includes('MEBİ çalışmaları'));
assert.equal(mockElements.socialWeekPrompt.hidden, true);
assert.equal(mockElements.socialWeekContent.hidden, false);
assert.equal(mockElements.socialProgressCount.textContent, '0 / 37 hafta tamamlandı');

const week20Button = { dataset: { socialSelect: '20' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-select]' ? week20Button : null } });
assert.equal(social.exportProgress().selectedWeek, 20);
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Osmanlı Beyliği’nin kuruluş yeri ve GZFT'));
const responseInput = {
  dataset: { socialWeek: '20', socialResponse: 'strength' },
  value: 'Kuruluş konumu gelişme için fırsatlar sunabilir.',
  closest(selector) { return selector === '[data-social-response]' ? this : null; },
};
root.listeners.input({ target: responseInput });
assert.equal(social.exportProgress().weeks['20'].responses.strength, responseInput.value);
const taskInput = { dataset: { socialWeek: '20', socialTask: '0' }, checked: true };
root.listeners.change({ target: taskInput });
const providerInput = { dataset: { socialWeek: '20', socialProvider: 'eba' }, checked: true };
root.listeners.change({ target: providerInput });
assert.equal(social.exportProgress().weeks['20'].tasks[0], true);
assert.equal(social.exportProgress().weeks['20'].platforms.eba, true);
assert.notEqual(social.exportProgress().weeks['21']?.platforms.eba, true, 'External platform progress must stay separate for raw weeks.');
assert.equal(social.isWeekComplete(social.weeks[19]), false, 'The app tracker must stay incomplete until every task and activity field is done.');
console.log('Social Studies raw-week plan, PDF-aligned activity formats, completion rules, links, and subject-isolated backup passed.');
