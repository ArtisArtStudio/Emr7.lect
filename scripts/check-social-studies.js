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
  querySelectorAll() { return []; }
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

const renewedWeekFlows = {
  3: ['perspective-reading', 'language-sort', 'rewrite-and-reflect'],
  4: ['pause-and-predict', 'behavior-sort', 'shared-solution'],
  5: ['equality-reading', 'access-barrier-sort', 'brainwriting'],
  6: ['accessibility-match', 'event-access-review', 'access-audit'],
  7: ['project-draft', 'project-cycle-sort', 'project-review'],
  8: ['word-cloud-values', 'value-action-sort', 'shared-issue-brainstorm'],
  9: ['national-days-sort', 'flag-brainstorm', 'shared-memory-story'],
  10: ['national-struggle-reading', 'solidarity-contributions-sort', 'historical-source-table'],
  11: ['solidarity-case-comparison', 'contribution-domain-sort', 'solidarity-mini-report'],
  12: ['unit-concept-sort', 'unit-review-quiz', 'unit-concept-map', 'unit-self-review'],
};

for (const week of social.weeks) {
  assert.ok(week.activities.length >= 3, `Week ${week.id} should have a complete activity flow.`);
  if (week.id === 1) {
    assert.deepEqual(week.activities.map((activity) => activity.id), [
      'communication-importance', 'phone-conversation', 'traffic-communication',
      'four-communication-cases', 'learner-generated-questions', 'communication-source-research',
    ], 'The first communication week should follow the requested textbook-like sequence.');
  } else if (week.id === 2) {
    assert.deepEqual(week.activities.map((activity) => activity.id), [
      'communication-process-and-types', 'classify-communication-types',
      'same-message-three-ways', 'choose-communication-channel',
    ], 'Week two should continue into communication and communication types.');
  } else if (week.id <= 12) {
    assert.deepEqual(week.activities.map((activity) => activity.id), renewedWeekFlows[week.id], `Week ${week.id} should have its renewed first-area activity sequence.`);
    assert.equal(week.activities.length, week.id === 12 ? 4 : 3, `Week ${week.id} should retain the planned activity count.`);
  } else {
    assert.equal(week.activities.length, 3, `Week ${week.id} should retain its existing flow outside the first learning area.`);
    assert.deepEqual(week.activities.map((activity) => activity.id), ['self-check', 'book', 'apply']);
  }

  const ids = new Set();
  for (const activity of week.activities) {
    assert.ok(activity.sourceStyle && activity.title && activity.prompt && activity.fields.length >= 1, `Week ${week.id} is missing a substantial activity step.`);
    const fieldIds = activity.fields.map((field) => field.id);
    assert.equal(new Set(fieldIds).size, fieldIds.length, `Week ${week.id}, ${activity.id} has duplicate field IDs.`);
    for (const field of activity.fields) {
      assert.ok(field.id && field.label && ['text', 'textarea', 'words', 'checklist', 'choice', 'multi', 'sort'].includes(field.kind), `Week ${week.id} has an unsupported/missing field.`);
      assert.ok(!ids.has(`${activity.id}:${field.id}`), `Week ${week.id} has a repeated activity field key.`);
      ids.add(`${activity.id}:${field.id}`);
      if (field.kind === 'checklist') assert.ok(field.options.length > 0 && field.options.every((option) => option.id && option.label));
      if (field.kind === 'choice' || field.kind === 'multi') {
        assert.ok(field.options.length >= 3 && field.options.every((option) => option.id && option.label));
        if (field.kind === 'choice') assert.ok(field.options.some((option) => option.id === field.answer), `Week ${week.id} has a self-check with no valid answer.`);
        else assert.ok(Array.isArray(field.answer) && field.answer.length > 0 && field.answer.every((optionId) => field.options.some((option) => option.id === optionId)), `Week ${week.id} has a multi-select with invalid answers.`);
        assert.ok(field.explanation && field.hint, `Week ${week.id} needs useful right/wrong feedback.`);
      }
      if (field.kind === 'sort') {
        const categoryIds = field.categories.map((category) => category.id);
        const itemIds = field.items.map((item) => item.id);
        assert.ok(field.categories.length >= 2 && new Set(categoryIds).size === categoryIds.length, `Week ${week.id} needs distinct sort categories.`);
        assert.ok(field.items.length >= 4 && new Set(itemIds).size === itemIds.length, `Week ${week.id} needs distinct sort cards.`);
        assert.deepEqual(Object.keys(field.expectedAssignments).sort(), [...itemIds].sort(), `Week ${week.id} needs an answer category for every sort card.`);
        assert.ok(itemIds.every((itemId) => categoryIds.includes(field.expectedAssignments[itemId])), `Week ${week.id} has a sort answer with an unknown category.`);
        assert.ok(field.instructions && activity.hint, `Week ${week.id} needs accessible sorting instructions and a hint.`);
      }
    }
    if (Array.isArray(activity.questions)) {
      assert.ok(activity.questions.length > 0, `${activity.id} should contain question cards.`);
      for (const question of activity.questions) {
        assert.ok(question.id && question.prompt && question.fields.length > 0, `${activity.id} has a missing question prompt or response field.`);
      }
    }
  }

  if (week.id === 1) {
    const [reading, phone, traffic, cases, learnerQuestions, research] = week.activities;
    assert.ok(reading.sourceText.split(/\s+/).length > 180, 'Week-one explanatory reading should be substantial.');
    assert.ok(reading.questions.some((question) => question.id === 'communication-factors'), 'Week one should ask learners to identify factors that affect communication.');
    assert.equal(phone.dialogue.length, 8, 'The original cellphone conversation should be visible.');
    assert.equal(phone.questions.length, 3, 'The cellphone conversation should have three topic questions.');
    assert.ok(traffic.sourceText.includes('Trafik ışıkları') && traffic.questions.length === 3, 'The traffic communication reading should include exactly three questions.');
    assert.equal(cases.caseStudies.length, 4, 'The observation activity should show four original cases.');
    assert.ok(cases.questions.some((question) => question.id === 'observations') && cases.questions.some((question) => question.id === 'wonders'));
    assert.equal(learnerQuestions.questions.length, 3, 'Learners should create their own research questions.');
    const researchText = [research.prompt, ...research.questions.map((question) => question.prompt)].join(' ').toLocaleLowerCase('tr-TR');
    for (const term of ['ben dili', 'empati', 'farklılıklara saygı', 'etkin dinleme', 'beden dili', 'sen dili']) {
      assert.ok(researchText.includes(term), `The research activity should include ${term}.`);
    }
    assert.ok(research.questions.some((question) => question.id === 'research-source-record'), 'The research activity should provide a source-record structure.');
  }
  if (week.id === 2) {
    assert.ok(week.activities[0].sourceText.split(/\s+/).length > 180, 'Week-two communication-types explanation should be substantial.');
    assert.ok(week.activities[0].sourceText.includes('Sözlü iletişim') && week.activities[0].sourceText.includes('Yazılı iletişim') && week.activities[0].sourceText.includes('Sözsüz iletişim'));
    assert.equal(week.activities[1].questions.length, 6, 'Week two should have six varied examples to classify.');
    assert.ok(week.activities[2].questions.some((question) => question.id === 'nonverbal-version'));
  }

  const responses = Object.fromEntries(week.activities.map((activity) => [activity.id, Object.fromEntries(activity.fields.map((field) => {
    if (field.kind === 'checklist') return [field.id, Object.fromEntries(field.options.map((option) => [option.id, true]))];
    if (field.kind === 'words') return [field.id, 'saygı, dayanışma, sorumluluk'];
    if (field.kind === 'choice' || field.kind === 'multi') return [field.id, field.answer];
    if (field.kind === 'sort') return [field.id, field.expectedAssignments];
    return [field.id, 'Öğrenci yanıtı: kaynakta gördüğüm bilgi ve gerekçem.'];
  }))]));
  const choiceChecks = Object.fromEntries(week.activities.map((activity) => [activity.id, Object.fromEntries(activity.fields.filter((field) => ['choice', 'multi', 'sort'].includes(field.kind)).map((field) => [field.id, true]))]));
  const completeRecord = { tasks: week.tasks.map(() => true), responses, choiceChecks };
  assert.equal(social.isActivityComplete(week, completeRecord), true, `Week ${week.id} should complete with all responses and checked self-assessments.`);
  assert.equal(social.isWeekComplete(week, completeRecord), true, `Week ${week.id} should auto-complete after tasks and activities.`);
  const firstChoiceActivity = week.activities.find((activity) => activity.fields.some((field) => field.kind === 'choice'));
  if (firstChoiceActivity) {
    const unchecked = structuredClone(choiceChecks);
    unchecked[firstChoiceActivity.id] = {};
    assert.equal(social.isActivityComplete(week, { ...completeRecord, choiceChecks: unchecked }), false, `Week ${week.id} must require the student to check self-assessment feedback.`);
    const wrongResponses = structuredClone(responses);
    const firstChoice = firstChoiceActivity.fields.find((field) => field.kind === 'choice');
    wrongResponses[firstChoiceActivity.id][firstChoice.id] = firstChoice.options.find((option) => option.id !== firstChoice.answer).id;
    assert.equal(social.isActivityComplete(week, { ...completeRecord, responses: wrongResponses }), false, `Week ${week.id} must not complete while a self-check answer is wrong.`);
  }
  const multiActivity = week.activities.find((activity) => activity.fields.some((field) => field.kind === 'multi'));
  if (multiActivity) {
    const multiField = multiActivity.fields.find((field) => field.kind === 'multi');
    const wrongMulti = structuredClone(responses);
    wrongMulti[multiActivity.id][multiField.id] = multiField.answer.slice(0, -1);
    assert.equal(social.isActivityComplete(week, { ...completeRecord, responses: wrongMulti }), false, `Week ${week.id} must require an exact multi-select answer.`);
  }
  const sortActivity = week.activities.find((activity) => activity.fields.some((field) => field.kind === 'sort'));
  if (sortActivity) {
    const sortField = sortActivity.fields.find((field) => field.kind === 'sort');
    const wrongSort = structuredClone(responses);
    const firstItem = sortField.items[0];
    const alternate = sortField.categories.find((category) => category.id !== sortField.expectedAssignments[firstItem.id]);
    wrongSort[sortActivity.id][sortField.id][firstItem.id] = alternate.id;
    assert.equal(social.isActivityComplete(week, { ...completeRecord, responses: wrongSort }), false, `Week ${week.id} must not complete a sort activity with a misplaced card.`);
    const uncheckedSort = structuredClone(choiceChecks);
    uncheckedSort[sortActivity.id][sortField.id] = false;
    assert.equal(social.isActivityComplete(week, { ...completeRecord, choiceChecks: uncheckedSort }), false, `Week ${week.id} must require checking the sort feedback.`);
  }
  assert.equal(social.isWeekComplete(week, { ...completeRecord, tasks: week.tasks.map(() => false) }), false, `Week ${week.id} must require all mini-plan tasks.`);
  const incompleteResponses = structuredClone(responses);
  const requiredActivity = week.activities.find((activity) => activity.fields.some((field) => ['text', 'textarea', 'words'].includes(field.kind)));
  const requiredField = requiredActivity?.fields.find((field) => ['text', 'textarea', 'words'].includes(field.kind));
  assert.ok(requiredField, `Week ${week.id} should require at least one open response.`);
  incompleteResponses[requiredActivity.id][requiredField.id] = '';
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
assert.equal(imported.version, 3);
assert.equal(imported.selectedWeek, 7);
assert.equal(imported.weeks['1'].tasks.length, week1.tasks.length);
assert.equal(imported.weeks['1'].tasks[0], true);
assert.equal(imported.weeks['1'].tasks[1], false);
assert.equal(imported.weeks['1'].legacyResponses.book.respect, '<script>not markup</script>', 'v1 responses should remain available in the legacy backup record after the first-topic flow expands.');
assert.equal(imported.weeks['1'].responses['communication-importance'].contributions, '');
assert.equal(imported.weeks['1'].platforms.eba, true);
assert.equal(imported.weeks['1'].platforms.tonguc, false);

const priorVersionTwo = social.normalizeProgress({
  version: 2,
  selectedWeek: 1,
  weeks: { '1': {
    tasks: [true, false, true],
    responses: {
      'self-check': { 'self-check-1': 'option-2' },
      book: { respect: 'Eski kitap yanıtı', help: 'Eski yardım yanıtı' },
      apply: { 'transfer-1': 'Eski uygulama yanıtı' },
    },
    choiceChecks: { 'self-check': { 'self-check-1': true } },
    platforms: { mebi: true },
  } },
});
assert.equal(priorVersionTwo.weeks['1'].legacyResponses['self-check']['self-check-1'], 'option-2');
assert.equal(priorVersionTwo.weeks['1'].legacyResponses.book.respect, 'Eski kitap yanıtı');
assert.equal(priorVersionTwo.weeks['1'].legacyResponses.apply['transfer-1'], 'Eski uygulama yanıtı');
assert.equal(priorVersionTwo.weeks['1'].legacyChoiceChecks['self-check']['self-check-1'], true);
assert.deepEqual(priorVersionTwo.weeks['1'].tasks, [true, false, true]);
assert.equal(priorVersionTwo.weeks['1'].platforms.mebi, true);

social.importProgress(imported);
const exported = social.exportProgress();
assert.equal(exported.selectedWeek, 7);
assert.equal(exported.weeks['1'].platforms.eba, true);
assert.equal(exported.weeks['1'].legacyResponses.book.respect, '<script>not markup</script>');
assert.ok(storage.has('emr7lect.socialStudies.v1'), 'Progress should persist in its subject-specific localStorage key.');
social.resetProgress();
assert.equal(social.exportProgress().selectedWeek, 1);

for (const week of social.weeks.slice(2, 12)) {
  const kinds = new Set(week.activities.flatMap((activity) => activity.fields.map((field) => field.kind)));
  assert.ok(kinds.has('sort'), `Week ${week.id} should include an accessible textbook-aligned sorting activity.`);
  assert.ok(week.activities.every((activity) => activity.format && activity.hint), `Week ${week.id} needs an activity-specific format and guidance.`);
}
assert.ok(social.weeks[2].activities[1].sourceStyle.includes('Sürükle-bırak'), 'Week three should classify original I-language and respectful-question examples.');
assert.ok(social.weeks[3].activities[0].sourceStyle.includes('arkası yarın'), 'Week four should use a predict-the-continuation activity.');
assert.ok(social.weeks[4].activities[2].sourceStyle.includes('Beyin yazımı'), 'Week five should retain a textbook-aligned brainwriting stage.');
assert.ok(social.weeks[6].activities[1].sourceStyle.includes('Sürükle-bırak'), 'Week seven should sequence a small accessibility project.');
assert.ok(social.weeks[7].activities[0].sourceStyle.includes('Kelime bulutu'), 'Week eight should use a word-cloud activity.');
assert.ok(social.weeks[8].activities[0].sourceStyle.includes('Sürükle-bırak'), 'Week nine should classify national holidays and commemoration days.');
assert.ok(social.weeks[9].activities[0].sourceText.includes('Tekâlif-i Milliye'), 'Week ten should ground solidarity work in an original historical explanation.');
assert.ok(social.weeks[10].activities[0].caseStudies.length === 4, 'Week eleven should compare four original social-solidarity examples.');
assert.ok(social.weeks[11].activities.length === 4, 'Week twelve should review the full first learning area with several activity types.');
assert.ok(social.weeks[12].activities.map((activity) => activity.id).join(',') === 'self-check,book,apply', 'Week thirteen and later flows should remain unchanged.');
assert.ok(social.weeks[1].activities[2].scenario.includes('Proje grubunun'), 'Week two should use an original communication-types transfer situation.');
assert.ok(social.weeks[10].activities[0].sourceStyle.includes('karşılaştırma'), 'Week eleven should compare contributions across different textbook-linked areas.');

for (const id of ['socialWorkspace', 'socialWeekList', 'socialWeekPrompt', 'socialWeekContent', 'socialProgressBar', 'socialProgressTrack', 'socialProgressCount']) {
  mockElements[id] = new MockElement(id);
}
social.resetProgress();
const root = mockElements.socialWorkspace;
assert.ok(root.listeners.click && root.listeners.input && root.listeners.change && root.listeners.dragstart && root.listeners.dragover && root.listeners.drop && root.listeners.keydown, 'Text, selection, drag-and-drop, and keyboard interactions should be delegated from the workspace.');
assert.equal((mockElements.socialWeekList.innerHTML.match(/data-social-select=/g) || []).length, 37, 'The UI should render every week separately.');
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Gruplarda ve sosyal hayatta iletişimin önemi'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('14–18 Eyl 2026–2027 · 1. hafta'));
assert.ok(!mockElements.socialWeekContent.innerHTML.includes('ham hafta'), 'The user interface must not call a week a “ham hafta”.');
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Haftalık çalışma çizelgesi'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Konu anlatımı · iletişim neden önemlidir?'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Anahtar kavramlar'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('data-social-activity-select="0"') && mockElements.socialWeekContent.innerHTML.includes('data-social-activity-select="5"'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Metinde iletişimi etkileyen hangi etmenler sıralanıyor?'));
assert.ok(!mockElements.socialWeekContent.innerHTML.includes('Önce kısa sınama'), 'The first communication week must not be forced into the generic three-step template.');
assert.ok(mockElements.socialWeekContent.innerHTML.includes('EBA Sosyal Bilgiler') && mockElements.socialWeekContent.innerHTML.includes('MEBİ çalışmaları'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('https://eba.gov.tr/dersler/detay/17-sosyal-bilgiler?duzey=Ortaokul&amp;okulTuru=6&amp;sinif=15&amp;genelMudurluk=33&amp;ders=17&amp;program=1131&amp;kazanimlar=310150'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('https://mebi.eba.gov.tr/student/section/upper-subjects/bee82e4d-de71-4a3e-0884-08ddc2afb3ce'));
assert.equal(mockElements.socialWeekPrompt.hidden, true);
assert.equal(mockElements.socialWeekContent.hidden, false);
assert.equal(mockElements.socialProgressCount.textContent, '0 / 37 hafta tamamlandı');

const phoneStepButton = { dataset: { socialActivitySelect: '1' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? phoneStepButton : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Cep telefonu sohbetindeki mesajları incele'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Zeynep') && mockElements.socialWeekContent.innerHTML.includes('Kerem'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Tamamdır.'));
const phoneInput = {
  dataset: { socialWeek: '1', socialActivity: 'phone-conversation', socialResponse: 'ambiguous-message' },
  value: 'Kerem kısa yanıtı yalnızca gördüğünü belirtmek için kullandı; Zeynep bunu görevi kabul etti sanabilir.',
  type: 'textarea',
  closest(selector) { return selector === '[data-social-response]' ? this : null; },
};
root.listeners.input({ target: phoneInput });
assert.equal(social.exportProgress().weeks['1'].responses['phone-conversation']['ambiguous-message'], phoneInput.value);

const casesStepButton = { dataset: { socialActivitySelect: '3' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? casesStepButton : null } });
assert.equal((mockElements.socialWeekContent.innerHTML.match(/class="social-case-study"/g) || []).length, 4, 'The four original cases should render as separate stimuli.');
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Gözlemlerim') && mockElements.socialWeekContent.innerHTML.includes('Merak ettiklerim'));
const researchStepButton = { dataset: { socialActivitySelect: '5' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? researchStepButton : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Ben dili') && mockElements.socialWeekContent.innerHTML.includes('Beden dili'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('EBA Sosyal Bilgiler ↗') && mockElements.socialWeekContent.innerHTML.includes('MEBİ öğrenci bölümü ↗'));

const week2Button = { dataset: { socialSelect: '2' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-select]' ? week2Button : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Konu anlatımı · iletişim süreci ve türleri'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Sözlü iletişim') && mockElements.socialWeekContent.innerHTML.includes('Sözsüz iletişim'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('data-social-activity-select="3"'));
const classifyStepButton = { dataset: { socialActivitySelect: '1' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? classifyStepButton : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Seçimimi kontrol et'));
const customRadio = {
  dataset: { socialWeek: '2', socialActivity: 'classify-communication-types', socialResponse: 'type-choice-1' },
  type: 'radio',
  value: 'spoken',
};
root.listeners.change({ target: customRadio });
assert.equal(social.exportProgress().weeks['2'].responses['classify-communication-types']['type-choice-1'], 'spoken');
const customCheckButton = { dataset: { socialWeek: '2', socialActivity: 'classify-communication-types', socialCheckChoice: 'type-choice-1' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-check-choice]' ? customCheckButton : null } });
assert.equal(social.exportProgress().weeks['2'].choiceChecks['classify-communication-types']['type-choice-1'], true);

const week3Button = { dataset: { socialSelect: '3' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-select]' ? week3Button : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Empati, ben dili ve farklılıklara saygı'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Ben dili, suçlayıcı söz ve saygılı soruyu sınıflandır'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Grup çalışmasında söz hakkı'));
const languageSortStep = { dataset: { socialActivitySelect: '1' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? languageSortStep : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('data-social-sort-widget="true"'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('draggable="true"') && mockElements.socialWeekContent.innerHTML.includes('aria-keyshortcuts="Enter Space"'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Sürükle') && mockElements.socialWeekContent.innerHTML.includes('hedef gruba'));

const sortStatus = { textContent: '' };
const sortWidget = {
  dataset: { socialWeek: '3', socialActivity: 'language-sort', socialField: 'language-groups' },
  querySelector: () => sortStatus,
};
const sortCard = {
  dataset: { socialSortItem: 'i-one' },
  classList: { toggle() {}, add() {}, remove() {} },
  setAttribute() {},
  closest(selector) {
    if (selector === '[data-social-sort-item]') return this;
    if (selector === '[data-social-sort-widget]') return sortWidget;
    return null;
  },
};
root.querySelectorAll = () => [sortCard];
root.listeners.click({ target: sortCard });
assert.ok(sortStatus.textContent.includes('seçildi'), 'Touch and click sorting should announce the selected card.');
const sortTarget = {
  dataset: { socialSortTarget: 'i-language' },
  closest(selector) {
    if (selector === '[data-social-sort-target]') return this;
    if (selector === '[data-social-sort-widget]') return sortWidget;
    return null;
  },
};
root.listeners.click({ target: sortTarget });
assert.equal(social.exportProgress().weeks['3'].responses['language-sort']['language-groups']['i-one'], 'i-language');

const dragPayload = { value: '', effectAllowed: '', setData(_type, value) { this.value = value; }, getData() { return this.value; } };
const dragCard = {
  dataset: { socialSortItem: 'you-one' },
  classList: { toggle() {}, add() {}, remove() {} },
  closest(selector) {
    if (selector === '[data-social-sort-item]') return this;
    if (selector === '[data-social-sort-widget]') return sortWidget;
    return null;
  },
};
root.listeners.dragstart({ target: dragCard, dataTransfer: dragPayload });
const dragTarget = {
  dataset: { socialSortTarget: 'blaming-you' },
  classList: { add() {}, remove() {} },
  closest(selector) {
    if (selector === '[data-social-sort-target]') return this;
    if (selector === '[data-social-sort-widget]') return sortWidget;
    return null;
  },
};
root.listeners.drop({ target: dragTarget, dataTransfer: dragPayload, preventDefault() {} });
assert.equal(social.exportProgress().weeks['3'].responses['language-sort']['language-groups']['you-one'], 'blaming-you', 'Native drag-and-drop should persist the dropped category.');

const keyboardCard = {
  dataset: { socialSortItem: 'ask-one' },
  classList: { toggle() {}, add() {}, remove() {} },
  setAttribute() {},
  closest(selector) {
    if (selector === '[data-social-sort-item]') return this;
    if (selector === '[data-social-sort-widget]') return sortWidget;
    return null;
  },
};
root.listeners.click({ target: keyboardCard });
const keyboardTarget = {
  dataset: { socialSortTarget: 'respectful' },
  closest(selector) {
    if (selector === '[data-social-sort-target]') return this;
    if (selector === '[data-social-sort-widget]') return sortWidget;
    return null;
  },
};
root.listeners.keydown({ target: keyboardTarget, key: 'Enter', preventDefault() {} });
assert.equal(social.exportProgress().weeks['3'].responses['language-sort']['language-groups']['ask-one'], 'respectful', 'Keyboard target activation should persist the selected card.');

const multiStep = { dataset: { socialActivitySelect: '2' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? multiStep : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Seçimlerimi kontrol et'));
const multiInput = {
  dataset: { socialWeek: '3', socialActivity: 'rewrite-and-reflect', socialResponse: 'parts', socialMulti: 'parts', socialOption: 'situation' },
  type: 'checkbox',
  value: 'situation',
  checked: true,
};
root.listeners.change({ target: multiInput });
assert.deepEqual(social.exportProgress().weeks['3'].responses['rewrite-and-reflect'].parts, ['situation']);
const multiCheckButton = { dataset: { socialWeek: '3', socialActivity: 'rewrite-and-reflect', socialCheckChoice: 'parts' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-check-choice]' ? multiCheckButton : null } });
assert.equal(social.exportProgress().weeks['3'].choiceChecks['rewrite-and-reflect'].parts, true);

const renewedBackup = social.normalizeProgress({
  version: 3,
  selectedWeek: 3,
  weeks: { '3': {
    responses: {
      book: { rewrite1: 'Eski yanıt korunuyor.' },
      'language-sort': { 'language-groups': { 'i-one': 'i-language', unknown: 'not-a-category' } },
      'rewrite-and-reflect': { parts: ['situation', 'invalid'] },
    },
    choiceChecks: { 'language-sort': { 'language-groups': true }, 'rewrite-and-reflect': { parts: true } },
  } },
});
assert.equal(renewedBackup.weeks['3'].legacyResponses.book.rewrite1, 'Eski yanıt korunuyor.', 'Old post-week-two answers must remain in the backup record.');
assert.deepEqual(renewedBackup.weeks['3'].responses['language-sort']['language-groups']['i-one'], 'i-language');
assert.equal(renewedBackup.weeks['3'].responses['language-sort']['language-groups'].unknown, undefined, 'Unknown sort-card IDs must not be imported.');
assert.deepEqual(renewedBackup.weeks['3'].responses['rewrite-and-reflect'].parts, ['situation'], 'Multi-select backups should retain only valid options.');

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

console.log('Social Studies summaries, variable textbook-aligned flows, first-topic reading and activity sequence, progress migration, completion rules, exact links, and backups passed.');
