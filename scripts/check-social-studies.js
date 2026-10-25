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

require('../ai-grader.js');
require('../ai-grader.js');
require('../social-studies-content.js');
require('../social-studies-extras.js');
require('../social-studies-visual.js');
require('../social-studies.js');
require('../social-studies-qr.js');
const social = global.window.SOCIAL_STUDIES;
assert.ok(social, 'The Social Studies workspace should expose its module API.');
assert.equal(social.weeks.length, 15, 'The first-term plan must fit 15 teaching weeks.');
assert.deepEqual(social.weeks.map((week) => week.id), Array.from({ length: 15 }, (_, index) => index + 1));
assert.deepEqual(social.units.map((unit) => unit.title), [
  'Birlikte Yaşamak', 'Evimiz Dünya', 'Ortak Mirasımız',
]);
assert.deepEqual(
  Object.fromEntries(social.units.map((unit) => [unit.id, social.weeks.filter((week) => week.unitId === unit.id).length])),
  { together: 5, world: 3, heritage: 7 },
);
assert.deepEqual(social.weeks.map((week) => week.sourceIds.length), [2,2,2,2,3,2,2,2,2,2,2,2,3,3,2], 'Every week must record the textbook weeks it merges.');
assert.ok(social.weeks.every((week) => week.date && week.date !== '16–20 Kas'), 'The autumn break must stay out of the calendar.');
assert.ok(social.weeks.some((week) => /deniz seyahatleri/i.test(week.topic)), 'The third learning area should include the textbook topic on sea routes and Ottoman economic effects.');
assert.ok(social.weeks.every((week) => week.date && week.topic && week.focus && week.tasks.length >= 4));
assert.ok(social.weeks.every((week) => week.summary.length > 100 && week.summaryPoints.length >= 3 && week.keyTerms.length >= 3), 'Every week needs a meaningful topic summary, learning points, and key terms.');
assert.ok(social.weeks.every((week) => week.source.includes('MEB 7. Sınıf')));

// Ders kitabının (2026) sayfa aralıkları: 1. alan 10–55, 2. alan 56–83, 3. alan 84–159.
assert.deepEqual(social.units.map((unit) => unit.pages), ['10–55', '56–83', '84–159'], 'Unit page ranges must match the textbook.');

// Kitaptaki sıraya göre sonradan eklenen konular ilgili haftalarda geçmeli.
const heritageText = (id) => { const week = social.weeks.find((item) => item.id === id); return `${week.topic} ${week.focus} ${week.tasks.join(' ')} ${week.summary}`; };
assert.ok(/sömürgecilik/i.test(heritageText(12)), 'Week 12 should cover colonialism as in the textbook (p. 113–116).');
assert.ok(/Fransız İhtilali/i.test(heritageText(14)) && /Lale Devri/i.test(heritageText(14)), 'Week 14 should cover the French Revolution and the Tulip Period in textbook order.');
assert.ok(/vakıf/i.test(heritageText(15)) && /ahi/i.test(heritageText(15)), 'Week 15 should cover waqf culture and the Akhi order.');
assert.ok(social.weeks.filter((week) => week.id >= 9).every((week) => week.summary.length > 900), 'Weeks 9–15 need a full topic summary, not a stub.');

// 2. öğrenme alanı (küreselleşme, bölgesel/küresel sorunlar) kitabın en yoğun bölümü:
// 6–8. haftalar kısa özet değil, alan alan işlenmiş konu anlatımı olmalı.
assert.ok(social.weeks.filter((week) => week.id >= 6 && week.id <= 8).every((week) => week.summary.length > 2500), 'Weeks 6–8 (globalisation and global issues) need full topic summaries, not stubs.');
assert.ok(social.weeks.filter((week) => week.id >= 6 && week.id <= 8).every((week) => week.summary.split(/\n\s*\n/).length >= 8), 'Weeks 6–8 summaries must be built from multiple subject paragraphs.');
assert.ok(/Orta Koridor/.test(heritageText(6)) && /TİKA/.test(heritageText(6)), 'Week 6 should use the textbook transport and health cooperation examples.');
assert.ok(/gıda|tahıl/i.test(heritageText(7)), 'Week 7 should show a regional problem growing global (food crisis).');
assert.ok(/arabulucu|TİKA/.test(heritageText(8)), 'Week 8 should cover Türkiye’s mediation and humanitarian aid roles.');

// 9–15. haftalar da tek paragraflık özet değil, kitaptaki derinlikte konu anlatımı olmalı.
assert.ok(social.weeks.filter((week) => week.id >= 9).every((week) => week.summary.split(/\s+/).filter(Boolean).length >= 420), 'Weeks 9–15 need textbook-depth topic summaries (420+ words).');
assert.ok(social.weeks.filter((week) => week.id >= 9).every((week) => week.summary.split(/\n\s*\n/).length >= 8), 'Weeks 9–15 summaries must be built from multiple subject paragraphs.');

// Ders kayıtları: 13–37 arasındaki yer tutucular onarıldı; her kayıt başlık ve yeterli metin taşır.
const lessonRecords = Object.entries(window.SOCIAL_STUDIES_CONTENT.lessons).map(([id, item]) => ({ id: Number(id), ...item }));
const repairedLessons = lessonRecords.filter((item) => item.id >= 13 && item.id <= 37);
assert.ok(repairedLessons.length === 25, 'Lessons 13–37 must all exist.');
assert.ok(repairedLessons.every((item) => item.summary.trim().split(/\s+/).length >= 100), 'Lessons 13–37 need at least 100 words of topic explanation.');
assert.ok(repairedLessons.every((item) => typeof item.summaryTitle === 'string' && item.summaryTitle.length > 8), 'Lessons 13–37 need a filled summaryTitle.');
assert.ok(repairedLessons.every((item) => item.points.length >= 3 && item.terms.length >= 3), 'Lessons 13–37 need at least three learning points and three key terms.');
assert.ok(/Rönesans/.test(heritageText(13)) && /Reform/.test(heritageText(13)) && /Aydınlanma/.test(heritageText(13)), 'Week 13 should cover Renaissance, Reformation and Enlightenment.');
assert.ok(/Sanayi İnkılabı/.test(heritageText(14)) && /Lale Devri/.test(heritageText(14)), 'Week 14 should cover the Industrial Revolution and the Tulip Period.');
assert.ok(/Divan-ı Hümâyun/.test(heritageText(15)) && /vakıf/.test(heritageText(15)) && /ahilik/i.test(heritageText(15)), 'Week 15 should cover Ottoman institutions, waqf and the Akhi order.');


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
const secondLearningAreaFlows = {
  13: ['global-word-cloud', 'globalization-definition', 'global-connection-sort'],
  14: ['global-impact-cases', 'global-impact-sort', 'impact-balance-table'],
  15: ['trace-global-connection', 'source-claim-sort', 'responsible-global-choice'],
  16: ['problem-scale-sort', 'compare-problem-scales', 'problem-impact-map'],
  17: ['stakeholder-sort', 'shared-action-map', 'solution-plan-review'],
  18: ['neighbor-map-source', 'turkey-role-sort', 'turkey-contribution-report'],
};

// Dönem planı iki (kimi yerde üç) kaynak haftayı tek haftada birleştirir; etkinlik akışı
// kaynak haftaların akışlarının sırasıyla birleşimidir.
const mergedFlows = {
  1: [
    'communication-importance', 'phone-conversation', 'traffic-communication',
    'four-communication-cases', 'learner-generated-questions', 'communication-source-research',
    'communication-process-and-types', 'classify-communication-types',
    'same-message-three-ways', 'choose-communication-channel',
  ],
  2: [...renewedWeekFlows[3], ...renewedWeekFlows[4]],
  3: [...renewedWeekFlows[5], ...renewedWeekFlows[6]],
  4: [...renewedWeekFlows[7], ...renewedWeekFlows[8]],
  5: [...renewedWeekFlows[9], ...renewedWeekFlows[10], ...renewedWeekFlows[11]],
  6: ['self-check', ...secondLearningAreaFlows[13], ...secondLearningAreaFlows[14]],
  7: ['self-check', ...secondLearningAreaFlows[15], ...secondLearningAreaFlows[16]],
  8: ['self-check', ...secondLearningAreaFlows[17], ...secondLearningAreaFlows[18]],
};

const visualLayer = global.window.SOCIAL_STUDIES_VISUAL;
assert.ok(visualLayer && visualLayer.weeks, 'The visual layer (social-studies-visual.js) should expose weekly steps.');

// --- Görsel okuma, öz değerlendirme ve gelecek hafta hazırlığı ---
const visualWeeks = Object.keys(visualLayer.weeks).map(Number).sort((a, b) => a - b);
assert.deepEqual(visualWeeks, Array.from({ length: 15 }, (_, index) => index + 1), 'Every week needs a visual reading step.');
assert.ok(social.weeks.every((week) => typeof week.nextPrep === 'string' && week.nextPrep.length > 20), 'Every week needs a "Gelecek haftaya hazırlık" sentence.');
const visualTypes = new Set(['chart', 'news', 'timeline']);
const visualSteps = social.weeks.flatMap((week) => week.activities.filter((activity) => activity.visual));
assert.equal(visualSteps.length, 15, 'Each week should carry exactly one visual reading step.');
assert.ok(visualSteps.every((activity) => visualTypes.has(activity.visual.type)), 'Visual steps must be a chart, news item or timeline.');
assert.ok(visualSteps.every((activity) => (activity.visual.title || activity.visual.headline) && activity.visual.source), 'Every visual needs a title and a source line.');
assert.ok(visualSteps.every((activity) => Array.isArray(activity.visual.items) || activity.visual.lead), 'Every visual needs data or news text to read.');
assert.ok(visualSteps.every((activity) => activity.fields.length === 2 && activity.fields.some((field) => field.kind === 'choice') && activity.fields.some((field) => field.kind === 'textarea')), 'A visual step needs one data-reading choice and one written inference.');
const visualAnswerPositions = new Set(visualSteps.map((activity) => activity.fields.find((field) => field.kind === 'choice').answer));
assert.ok(visualAnswerPositions.size >= 2, 'Correct visual answers must not all sit in the same position.');
assert.ok(visualSteps.every((activity) => /Görsel okuma/.test(activity.sourceStyle)), 'Visual steps must be labelled as visual reading.');
const reviewWeeks = visualWeeks.filter((id) => visualLayer.weeks[id].review);
assert.deepEqual(reviewWeeks, [5, 8, 15], 'Each learning area must end with a self-assessment step.');
assert.ok(reviewWeeks.every((id) => {
  const review = visualLayer.weeks[id].review;
  const checklist = review.fields.find((field) => field.kind === 'checklist');
  return checklist && checklist.options.length >= 5 && review.fields.some((field) => field.kind === 'textarea');
}), 'Self-assessment steps need a five-item checklist and a written reflection.');

const everyActivity = social.weeks.flatMap((week) => week.activities);
const findActivity = (id) => {
  const found = everyActivity.find((activity) => activity.id === id);
  assert.ok(found, `Missing activity: ${id}`);
  return found;
};

const reading = findActivity('communication-importance');
const phone = findActivity('phone-conversation');
const traffic = findActivity('traffic-communication');
const cases = findActivity('four-communication-cases');
const learnerQuestions = findActivity('learner-generated-questions');
const research = findActivity('communication-source-research');
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

const typesReading = findActivity('communication-process-and-types');
assert.ok(typesReading.sourceText.split(/\s+/).length > 180, 'Week-two communication-types explanation should be substantial.');
assert.ok(typesReading.sourceText.includes('Sözlü iletişim') && typesReading.sourceText.includes('Yazılı iletişim') && typesReading.sourceText.includes('Sözsüz iletişim'));
assert.equal(findActivity('classify-communication-types').questions.length, 6, 'Week two should have six varied examples to classify.');
assert.ok(findActivity('same-message-three-ways').questions.some((question) => question.id === 'nonverbal-version'));

// Ek katman (ek okuma + kitap teknikleriyle çalışma) her haftanın akışının sonuna eklenir.
const extras = global.window.SOCIAL_EXTRAS;
assert.ok(extras && extras.weeks, 'The extras layer (social-studies-extras.js) should expose weekly activities.');
assert.deepEqual(Object.keys(extras.weeks).map(Number).sort((a, b) => a - b), Array.from({ length: 15 }, (_, index) => index + 1), 'Every teaching week should have an extras entry.');

for (const week of social.weeks) {
  const extraIds = (extras.weeks[week.id].activities || []).map((activity) => activity.id);
  // 9–15. haftalarda kitap çalışması kaynak hafta başına ayrı adımdır (book-<kaynak hafta>).
  const transferStep = [9, 10, 12, 13, 14, 15].includes(week.id) ? [] : ['apply'];
  const baseFlow = mergedFlows[week.id] || ['self-check', ...(week.sourceIds || []).map((sourceId) => `book-${sourceId}`), ...transferStep];
  // Görsel katman: görsel okuma adımı kısa sınamanın hemen ardından, öz değerlendirme en sonda.
  const layer = visualLayer.weeks[week.id];
  const visualIds = layer?.visual ? [layer.visual.id] : [];
  const reviewIds = layer?.review ? [layer.review.id] : [];
  assert.deepEqual(
    week.activities.map((activity) => activity.id),
    [baseFlow[0], ...visualIds, ...baseFlow.slice(1), ...extraIds, ...reviewIds],
    `Week ${week.id} should keep its merged flow, add the visual step and append the extras in order.`,
  );
  assert.ok(week.activities.length >= 5, `Week ${week.id} should have a complete activity flow of at least five steps.`);
  assert.ok(extraIds.length >= 4, `Week ${week.id} should add at least four extras activities.`);
  const extraFormats = (extras.weeks[week.id].activities || []).map((activity) => activity.format || activity.sourceStyle);
  assert.ok(new Set(extraFormats).size >= 3, `Week ${week.id} should vary its extras techniques instead of repeating one format.`);
  assert.equal(new Set(extraIds).size, extraIds.length, `Week ${week.id} has repeated extras activity ids.`);

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
assert.deepEqual(priorVersionTwo.weeks['1'].tasks, [true, false, true, false]);
assert.equal(priorVersionTwo.weeks['1'].platforms.mebi, true);

social.importProgress(imported);
const exported = social.exportProgress();
assert.equal(exported.selectedWeek, 7);
assert.equal(exported.weeks['1'].platforms.eba, true);
assert.equal(exported.weeks['1'].legacyResponses.book.respect, '<script>not markup</script>');
assert.ok(storage.has('emr7lect.socialStudies.v1'), 'Progress should persist in its subject-specific localStorage key.');
social.resetProgress();
assert.equal(social.exportProgress().selectedWeek, 1);

const guidedWeeks = social.weeks.filter((week) => week.unitId === 'together' && week.id > 1);
for (const week of guidedWeeks) {
  const kinds = new Set(week.activities.flatMap((activity) => activity.fields.map((field) => field.kind)));
  assert.ok(kinds.has('sort'), `Week ${week.id} should include an accessible textbook-aligned sorting activity.`);
  assert.ok(week.activities.every((activity) => activity.format && activity.hint), `Week ${week.id} needs an activity-specific format and guidance.`);
}
assert.ok(findActivity('language-sort').sourceStyle.includes('Sürükle-bırak'), 'The empathy week should classify original I-language and respectful-question examples.');
assert.ok(findActivity('pause-and-predict').sourceStyle.includes('arkası yarın'), 'The conflict week should use a predict-the-continuation activity.');
assert.ok(findActivity('brainwriting').sourceStyle.includes('Beyin yazımı'), 'The equality week should retain a textbook-aligned brainwriting stage.');
assert.ok(findActivity('project-cycle-sort').sourceStyle.includes('Sürükle-bırak'), 'The project week should sequence a small accessibility project.');
assert.ok(findActivity('word-cloud-values').sourceStyle.includes('Kelime bulutu'), 'The shared-values week should use a word-cloud activity.');
assert.ok(findActivity('national-days-sort').sourceStyle.includes('Sürükle-bırak'), 'The national-days week should classify holidays and commemoration days.');
assert.ok(findActivity('national-struggle-reading').sourceText.includes('Tekâlif-i Milliye'), 'The solidarity week should ground work in an original historical explanation.');
assert.ok(findActivity('solidarity-case-comparison').caseStudies.length === 4, 'The solidarity week should compare four original social-solidarity examples.');
assert.ok(findActivity('solidarity-case-comparison').sourceStyle.includes('karşılaştırma'), 'The solidarity week should compare contributions across different areas.');

const worldWeeks = social.weeks.filter((week) => week.unitId === 'world');
for (const week of worldWeeks) {
  const customActivities = week.activities.slice(1);
  const kinds = new Set(customActivities.flatMap((activity) => activity.fields.map((field) => field.kind)));
  assert.ok(kinds.has('sort'), `Week ${week.id} should include a textbook-aligned, accessible classification interaction.`);
  assert.ok(kinds.has('text') || kinds.has('textarea') || kinds.has('words'), `Week ${week.id} should include open responses for AI feedback.`);
  assert.ok(customActivities.every((activity) => activity.format && activity.hint), `Week ${week.id} needs activity-specific format and guidance.`);
}
assert.ok(findActivity('globalization-definition').questions.some((question) => question.id === 'dictionary-comparison'), 'The globalisation week should compare a learner-made definition with a dictionary explanation.');
assert.ok(findActivity('neighbor-map-source').sourceProviders.includes('eba') && findActivity('neighbor-map-source').sourceProviders.includes('mebi'), 'The Turkey-role week should offer approved source links for its map-based research.');
const extrasIdsFor = (id) => ((global.window.SOCIAL_EXTRAS?.weeks?.[id]?.activities) || []).map((activity) => activity.id);
assert.deepEqual(
  worldWeeks.map((week) => week.activities.map((activity) => activity.id)),
  [[13, 14], [15, 16], [17, 18]].map(([first, second], index) => {
    const weekId = 6 + index;
    const layer = visualLayer.weeks[weekId];
    return ['self-check', layer.visual.id, ...secondLearningAreaFlows[first], ...secondLearningAreaFlows[second], ...extrasIdsFor(weekId), ...(layer.review ? [layer.review.id] : [])];
  }),
  'The Evimiz Dünya weeks should merge their source-week flows in order and append their extras.',
);
// Ortak Mirasımız haftaları kitaptaki sırayla etkinlik akışı kazanır: temel üç adım + ek çalışmalar.
assert.deepEqual(
  social.weeks.filter((week) => week.unitId === 'heritage').map((week) => week.activities.map((activity) => activity.id)),
  social.weeks.filter((week) => week.unitId === 'heritage').map((week) => ['self-check', visualLayer.weeks[week.id].visual.id, ...(week.sourceIds || []).map((sourceId) => `book-${sourceId}`), ...([9, 10, 12, 13, 14, 15].includes(week.id) ? [] : ['apply']), ...extrasIdsFor(week.id), ...(visualLayer.weeks[week.id].review ? [visualLayer.weeks[week.id].review.id] : [])]),
  'The third learning area should build its activity flow from one textbook step per source week plus the extras.',
);
assert.ok(findActivity('same-message-three-ways').scenario.includes('Proje grubunun'), 'The communication-types week should use an original transfer situation.');

for (const id of ['socialWorkspace', 'socialWeekList', 'socialWeekPrompt', 'socialWeekContent', 'socialProgressBar', 'socialProgressTrack', 'socialProgressCount']) {
  mockElements[id] = new MockElement(id);
}
social.resetProgress();
const root = mockElements.socialWorkspace;
assert.ok(root.listeners.click && root.listeners.input && root.listeners.change && root.listeners.dragstart && root.listeners.dragover && root.listeners.drop && root.listeners.keydown, 'Text, selection, drag-and-drop, and keyboard interactions should be delegated from the workspace.');
assert.equal((mockElements.socialWeekList.innerHTML.match(/data-social-select=/g) || []).length, 15, 'The UI should render every week separately.');
assert.ok(mockElements.socialWeekContent.innerHTML.includes('gruplarda iletişimin önemi'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('14–18 Eyl 2026–2027 · 1. hafta'));
assert.ok(!mockElements.socialWeekContent.innerHTML.includes('ham hafta'), 'The user interface must not call a week a “ham hafta”.');
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Haftalık çalışma çizelgesi'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('social-quest-path'), 'Social Studies activities should carry the shared quest path.');
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Görev yolu'), 'The quest path should be labelled in Turkish like the other courses.');
assert.ok(mockElements.socialWeekContent.innerHTML.includes('social-result-pill'), 'Social Studies should show the shared verdict pill.');
assert.ok(mockElements.socialWeekContent.innerHTML.includes('konu anlatımı'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Anahtar kavramlar'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('data-social-activity-select="0"') && mockElements.socialWeekContent.innerHTML.includes('data-social-activity-select="5"'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Metinde iletişimi etkileyen hangi etmenler sıralanıyor?'));
assert.ok(!mockElements.socialWeekContent.innerHTML.includes('Önce kısa sınama'), 'The first communication week must not be forced into the generic three-step template.');
assert.ok(mockElements.socialWeekContent.innerHTML.includes('EBA Sosyal Bilgiler') && mockElements.socialWeekContent.innerHTML.includes('MEBİ çalışmaları'));
assert.equal(social.weeks[7].date, '2–6 Kas', 'Social Studies week eight should contain the user-provided 6 November exam date.');
assert.ok(mockElements.socialWeekList.innerHTML.includes('1. sınav (6 Kasım 2026)'), 'Week eight should show its first-exam date in the selection list.');
assert.equal((mockElements.socialWeekList.innerHTML.match(/1\. sınav \(6 Kasım 2026\)/g) || []).length, 1, 'Only Social Studies week eight should carry the Social Studies exam notice.');
const week8ExamButton = { dataset: { socialSelect: '8' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-select]' ? week8ExamButton : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('class="social-exam-notice"') && mockElements.socialWeekContent.innerHTML.includes('6 Kasım 2026'), 'Selecting week eight should show its red exam-date card.');
const week1AfterExamButton = { dataset: { socialSelect: '1' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-select]' ? week1AfterExamButton : null } });
assert.ok(!mockElements.socialWeekContent.innerHTML.includes('social-exam-notice'), "Weeks without an exam must not inherit another week's notice.");
assert.ok(mockElements.socialWeekContent.innerHTML.includes('https://eba.gov.tr/dersler/detay/17-sosyal-bilgiler?duzey=Ortaokul&amp;okulTuru=6&amp;sinif=15&amp;genelMudurluk=33&amp;ders=17&amp;program=1131&amp;kazanimlar=310150'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('https://mebi.eba.gov.tr/student/section/upper-subjects/bee82e4d-de71-4a3e-0884-08ddc2afb3ce'));
assert.equal(mockElements.socialWeekPrompt.hidden, true);
assert.equal(mockElements.socialWeekContent.hidden, false);
assert.equal(mockElements.socialProgressCount.textContent, '0 / 15 hafta tamamlandı');

const phoneStepButton = { dataset: { socialActivitySelect: '2' } };
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

const casesStepButton = { dataset: { socialActivitySelect: '4' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? casesStepButton : null } });
assert.equal((mockElements.socialWeekContent.innerHTML.match(/class="social-case-study"/g) || []).length, 4, 'The four original cases should render as separate stimuli.');
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Gözlemlerim') && mockElements.socialWeekContent.innerHTML.includes('Merak ettiklerim'));
const researchStepButton = { dataset: { socialActivitySelect: '6' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? researchStepButton : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Ben dili') && mockElements.socialWeekContent.innerHTML.includes('Beden dili'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('EBA Sosyal Bilgiler ↗') && mockElements.socialWeekContent.innerHTML.includes('MEBİ öğrenci bölümü ↗'));

const typesStepButton = { dataset: { socialActivitySelect: '7' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? typesStepButton : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Sözlü iletişim') && mockElements.socialWeekContent.innerHTML.includes('Sözsüz iletişim'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('data-social-activity-select="8"'));
const classifyStepButton = { dataset: { socialActivitySelect: '8' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? classifyStepButton : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Seçimimi kontrol et'));
const customRadio = {
  dataset: { socialWeek: '1', socialActivity: 'classify-communication-types', socialResponse: 'type-choice-1' },
  type: 'radio',
  value: 'spoken',
};
root.listeners.change({ target: customRadio });
assert.equal(social.exportProgress().weeks['1'].responses['classify-communication-types']['type-choice-1'], 'spoken');
const customCheckButton = { dataset: { socialWeek: '1', socialActivity: 'classify-communication-types', socialCheckChoice: 'type-choice-1' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-check-choice]' ? customCheckButton : null } });
assert.equal(social.exportProgress().weeks['1'].choiceChecks['classify-communication-types']['type-choice-1'], true);

const week3Button = { dataset: { socialSelect: '2' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-select]' ? week3Button : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Empati, ben dili ve anlaşmazlığı yapıcı çözme'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Ben dili, suçlayıcı söz ve saygılı soruyu sınıflandır'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Grup çalışmasında söz hakkı'));
const languageSortStep = { dataset: { socialActivitySelect: '2' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? languageSortStep : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('data-social-sort-widget="true"'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('draggable="true"') && mockElements.socialWeekContent.innerHTML.includes('aria-keyshortcuts="Enter Space"'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Sürükle') && mockElements.socialWeekContent.innerHTML.includes('hedef gruba'));

const sortStatus = { textContent: '' };
const sortWidget = {
  dataset: { socialWeek: '2', socialActivity: 'language-sort', socialField: 'language-groups' },
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
assert.equal(social.exportProgress().weeks['2'].responses['language-sort']['language-groups']['i-one'], 'i-language');

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
assert.equal(social.exportProgress().weeks['2'].responses['language-sort']['language-groups']['you-one'], 'blaming-you', 'Native drag-and-drop should persist the dropped category.');

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
assert.equal(social.exportProgress().weeks['2'].responses['language-sort']['language-groups']['ask-one'], 'respectful', 'Keyboard target activation should persist the selected card.');

const multiStep = { dataset: { socialActivitySelect: '3' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? multiStep : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Seçimlerimi kontrol et'));
const multiInput = {
  dataset: { socialWeek: '2', socialActivity: 'rewrite-and-reflect', socialResponse: 'parts', socialMulti: 'parts', socialOption: 'situation' },
  type: 'checkbox',
  value: 'situation',
  checked: true,
};
root.listeners.change({ target: multiInput });
assert.deepEqual(social.exportProgress().weeks['2'].responses['rewrite-and-reflect'].parts, ['situation']);
const multiCheckButton = { dataset: { socialWeek: '2', socialActivity: 'rewrite-and-reflect', socialCheckChoice: 'parts' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-check-choice]' ? multiCheckButton : null } });
assert.equal(social.exportProgress().weeks['2'].choiceChecks['rewrite-and-reflect'].parts, true);

const renewedBackup = social.normalizeProgress({
  version: 3,
  selectedWeek: 2,
  weeks: { '2': {
    responses: {
      book: { rewrite1: 'Eski yanıt korunuyor.' },
      'language-sort': { 'language-groups': { 'i-one': 'i-language', unknown: 'not-a-category' } },
      'rewrite-and-reflect': { parts: ['situation', 'invalid'] },
    },
    choiceChecks: { 'language-sort': { 'language-groups': true }, 'rewrite-and-reflect': { parts: true } },
  } },
});
assert.equal(renewedBackup.weeks['2'].legacyResponses.book.rewrite1, 'Eski yanıt korunuyor.', 'Old post-week-two answers must remain in the backup record.');
assert.deepEqual(renewedBackup.weeks['2'].responses['language-sort']['language-groups']['i-one'], 'i-language');
assert.equal(renewedBackup.weeks['2'].responses['language-sort']['language-groups'].unknown, undefined, 'Unknown sort-card IDs must not be imported.');
assert.deepEqual(renewedBackup.weeks['2'].responses['rewrite-and-reflect'].parts, ['situation'], 'Multi-select backups should retain only valid options.');
const legacyAIFeedbackBackup = social.normalizeProgress({
  version: 3,
  selectedWeek: 2,
  weeks: { '2': { aiFeedback: { book: { 'field-old-response': { state: 'correct', text: 'Önceki güvenli geri bildirim', fieldIds: ['respect'] } } } } },
});
assert.equal(legacyAIFeedbackBackup.weeks['2'].legacyAIFeedback.book['field-old-response'].text, 'Önceki güvenli geri bildirim', 'Obsolete AI feedback should remain available in the backup record.');

const week20Button = { dataset: { socialSelect: '9' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-select]' ? week20Button : null } });
assert.equal(social.exportProgress().selectedWeek, 9);
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Osmanlı Beyliği’nin kuruluşu'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Konumun güçlü ve zayıf yönleri'), 'Week nine should open with its own textbook step, not a merged prompt.');
const responseInput = {
  dataset: { socialWeek: '9', socialActivity: 'book-20', socialResponse: 'strength' },
  value: 'Kuruluş konumu gelişme için fırsatlar sunabilir.',
  type: 'textarea',
  closest(selector) { return selector === '[data-social-response]' ? this : null; },
};
root.listeners.input({ target: responseInput });
assert.equal(social.exportProgress().weeks['9'].responses['book-20'].strength, responseInput.value);
const taskInput = { dataset: { socialWeek: '9', socialTask: '0' }, checked: true };
root.listeners.change({ target: taskInput });
const providerInput = { dataset: { socialWeek: '9', socialProvider: 'eba' }, checked: true };
root.listeners.change({ target: providerInput });
assert.equal(social.exportProgress().weeks['9'].tasks[0], true);
assert.equal(social.exportProgress().weeks['9'].platforms.eba, true);
assert.notEqual(social.exportProgress().weeks['10']?.platforms.eba, true, 'External platform progress must stay separate by week.');
assert.equal(social.isWeekComplete(social.weeks[8]), false, 'The app tracker must stay incomplete until every task and activity field is done.');

const radioInput = {
  dataset: { socialWeek: '9', socialActivity: 'self-check', socialResponse: 'self-check-1' },
  type: 'radio',
  value: social.weeks[8].activities[0].fields[0].answer,
};
root.listeners.change({ target: radioInput });
assert.equal(social.exportProgress().weeks['9'].responses['self-check']['self-check-1'], radioInput.value);
const checkChoiceButton = { dataset: { socialWeek: '9', socialActivity: 'self-check', socialCheckChoice: 'self-check-1' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-check-choice]' ? checkChoiceButton : null } });
assert.equal(social.exportProgress().weeks['9'].choiceChecks['self-check']['self-check-1'], true, 'Checking a self-assessment should persist its feedback state.');
const activityStepButton = { dataset: { socialActivitySelect: '3' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? activityStepButton : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('GZFT'), 'The student should be able to navigate to the transfer/reflection step.');

const week13Button = { dataset: { socialSelect: '6' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-select]' ? week13Button : null } });
const week13DefinitionStep = { dataset: { socialActivitySelect: '3' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? week13DefinitionStep : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Kendi tanımını örnek ve sözlük açıklamasıyla karşılaştır'));
assert.equal((mockElements.socialWeekContent.innerHTML.match(/class="social-ai-check"/g) || []).length, 3, 'Each Week 13 open question should have one grouped Groq check button.');
assert.ok(mockElements.socialWeekContent.innerHTML.includes('question-dictionary-comparison'));
const week18Button = { dataset: { socialSelect: '8' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-select]' ? week18Button : null } });
const week18MapStep = { dataset: { socialActivitySelect: '5' } };
root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? week18MapStep : null } });
assert.ok(mockElements.socialWeekContent.innerHTML.includes('Harita ve güvenilir kaynaktan komşularla iş birliğini araştır'));
assert.ok(mockElements.socialWeekContent.innerHTML.includes('EBA Sosyal Bilgiler ↗') && mockElements.socialWeekContent.innerHTML.includes('MEBİ öğrenci bölümü ↗'));
assert.equal((mockElements.socialWeekContent.innerHTML.match(/class="social-ai-check"/g) || []).length, 3, 'Each Week 18 source-research question should have a Groq check button.');

async function runSocialAIRegressionChecks() {
  const week13AgainButton = { dataset: { socialSelect: '6' } };
  await root.listeners.click({ target: { closest: (selector) => selector === '[data-social-select]' ? week13AgainButton : null } });
  const week13DefinitionAgain = { dataset: { socialActivitySelect: '3' } };
  await root.listeners.click({ target: { closest: (selector) => selector === '[data-social-activity-select]' ? week13DefinitionAgain : null } });

  const reviewKey = 'question-dictionary-comparison';
  const feedbackId = 'social-ai-feedback-6-globalization-definition-question-dictionary-comparison';
  mockElements[feedbackId] = new MockElement(feedbackId);
  mockElements.apiKey = { value: '' };
  mockElements.model = { value: 'openai/gpt-oss-20b' };
  mockElements.apiSettings = { open: false };
  const button = {
    dataset: {
      socialWeek: '6',
      socialActivity: 'globalization-definition',
      socialAiKey: reviewKey,
      socialAiFields: JSON.stringify(['definition-comparison']),
      socialAiPrompt: 'Tanım benzerliğini ve farkını karşılaştır.',
    },
    disabled: false,
    textContent: '✦ Kontrol et',
  };
  const clickAIButton = () => root.listeners.click({
    target: { closest: (selector) => selector === '[data-social-ai-check]' ? button : null },
  });
  const enterAnswer = (value) => root.listeners.input({
    target: {
      dataset: { socialWeek: '6', socialActivity: 'globalization-definition', socialResponse: 'definition-comparison' },
      type: 'textarea',
      value,
      closest(selector) { return selector === '[data-social-response]' ? this : null; },
    },
  });

  enterAnswer('İkisi de insanlar ve toplumlar arasındaki bağları anlatıyor; biri daha geniş etkileşime odaklanıyor.');
  let fetchCalls = 0;
  global.fetch = async () => { fetchCalls += 1; throw new Error('fetch should not run without an API key'); };
  await clickAIButton();
  let saved = social.exportProgress().weeks['6'];
  assert.equal(saved.aiFeedback['globalization-definition'][reviewKey].state, 'system', 'Missing Groq settings should give a local settings reminder.');
  assert.equal(mockElements.apiSettings.open, true, 'A missing-key reminder should open the shared API settings.');
  assert.equal(fetchCalls, 0, 'The AI button should not call Groq without a user-provided key.');

  enterAnswer('İki tanım da toplumlar arasındaki bağlantıları anlatıyor; sözlük açıklaması daha kapsamlı.');
  assert.equal(social.exportProgress().weeks['6'].aiFeedback['globalization-definition'][reviewKey], undefined, 'Editing an open response should invalidate previously saved AI feedback.');
  assert.equal(mockElements[feedbackId].hidden, true, 'Editing an open response should hide stale feedback.');

  const testAPIKey = 'test-key-not-persisted';
  mockElements.apiKey.value = testAPIKey;
  let requestUrl = '';
  let requestOptions;
  global.fetch = async (url, options) => {
    fetchCalls += 1;
    requestUrl = url;
    requestOptions = options;
    return {
      ok: true,
      status: 200,
      json: async () => ({ choices: [{ message: { content: JSON.stringify({
        status: 'correct', issues: [], hint: 'recheck',
        guide: 'Konu özetindeki küreselleşme tanımına dön ve iki açıklamayı aynı ölçüte göre karşılaştır.',
        starter: 'İki açıklama arasındaki fark …, çünkü …',
        fields: [{ id: 'definition-comparison', status: 'correct', issue: 'none', hint: 'recheck' }],
      }) } }] }),
    };
  };
  await clickAIButton();
  assert.equal(requestUrl, 'https://api.groq.com/openai/v1/chat/completions');
  assert.equal(requestOptions.headers.Authorization, `Bearer ${testAPIKey}`, 'The control should reuse the shared Groq key setting.');
  const requestBody = JSON.parse(requestOptions.body);
  assert.equal(requestBody.model, mockElements.model.value, 'The control should reuse the shared Groq model setting.');
  assert.equal(requestBody.response_format.type, 'json_object', 'The AI request should use the constrained assessment format.');
  assert.ok(requestBody.messages[1].content.includes('daha kapsamlı'), 'The learner response should be assessed.');
  saved = social.exportProgress().weeks['6'];
  assert.equal(saved.aiFeedback['globalization-definition'][reviewKey].state, 'correct', 'A safe Groq result should be stored for the question.');
  assert.ok(mockElements[feedbackId].textContent.includes('TAM DOĞRU'));
  assert.ok(mockElements[feedbackId].textContent.includes('YOL GÖSTERİCİ: Konu özetindeki'), 'The guided next step should reach the student.');
  assert.ok(mockElements[feedbackId].textContent.includes('YAZMAYA BAŞLA: İki açıklama'), 'The sentence starter should reach the student.');
  assert.match(requestBody.messages[0].content, /YAZMA KOÇLUĞU/, 'The system prompt should carry the shared coaching rules.');
  assert.match(requestBody.messages[0].content, /"guide"/, 'The contract should ask for the guidance fields.');
  assert.match(mockElements[feedbackId].textContent, /YOL GÖSTERİCİ: Konu özetindeki/, 'The guided next step should reach the student.');
  assert.match(mockElements[feedbackId].textContent, /YAZMAYA BAŞLA: İki açıklama arasındaki fark/, 'The sentence starter should reach the student.');
  assert.ok(!JSON.stringify(saved).includes(testAPIKey), 'The Groq API key must not be saved with Social Studies progress.');

  enterAnswer('İki açıklamanın kapsamını aynı ölçüte göre yeniden karşılaştırıyorum.');
  global.fetch = async () => ({
    ok: true,
    status: 200,
    json: async () => ({ choices: [{ message: { content: JSON.stringify({ status: 'correct', issues: [], fields: [] }) } }] }),
  });
  await clickAIButton();
  saved = social.exportProgress().weeks['6'];
  assert.equal(saved.aiFeedback['globalization-definition'][reviewKey].state, 'unrated', 'An incomplete model assessment must not be presented as fully correct.');
  assert.ok(mockElements[feedbackId].textContent.includes('SONUÇ SINIFLANDIRILAMADI'));

  // Cevap sızdıran koçluk metni öğrenciye ulaşmaz; güvenli yedek kullanılır.
  enterAnswer('Güvenlik denemesi için yeniden yazıyorum.');
  global.fetch = async () => ({
    ok: true,
    status: 200,
    json: async () => ({ choices: [{ message: { content: JSON.stringify({
      status: 'incomplete', issues: ['completeness'], hint: 'explain',
      guide: 'Ders kitabının 88. sayfasındaki doğru cevabı yaz.',
      starter: 'Doğru cevap: küreselleşme',
      fields: [{ id: 'definition-comparison', status: 'incomplete', issue: 'completeness', hint: 'explain' }],
    }) } }] }),
  });
  await clickAIButton();
  const guardedText = mockElements[feedbackId].textContent;
  assert.match(guardedText, /YOL GÖSTERİCİ: Yanıtını “durum → neden → sonuç”/, 'Unsafe guidance should fall back to the safe coaching line.');
  assert.match(guardedText, /YAZMAYA BAŞLA: Bu durumda/, 'Unsafe starters should fall back to the safe sentence frame.');
  assert.ok(!/Ders kitab|88\. sayfa|Doğru cevap/.test(guardedText), 'Book references and answer leaks must never reach the student.');

  enterAnswer('Yeni yanıt: iki açıklamayı aynı ölçüte göre karşılaştırıyorum.');
  let resolveFetch;
  global.fetch = () => new Promise((resolve) => { resolveFetch = resolve; });
  const pendingAssessment = clickAIButton();
  assert.equal(typeof resolveFetch, 'function', 'The AI check should start its asynchronous Groq request.');
  enterAnswer('Yanıt değişti; kaynakla tekrar karşılaştıracağım.');
  resolveFetch({
    ok: true,
    status: 200,
    json: async () => ({ choices: [{ message: { content: JSON.stringify({
      status: 'partial', issues: ['completeness'], hint: 'compare',
      fields: [{ id: 'definition-comparison', status: 'partial', issue: 'completeness', hint: 'compare' }],
    }) } }] }),
  });
  await pendingAssessment;
  saved = social.exportProgress().weeks['6'];
  assert.equal(saved.aiFeedback['globalization-definition'][reviewKey], undefined, 'An assessment for an edited response must not be persisted.');
  assert.ok(mockElements[feedbackId].textContent.includes('Yanıt kontrol sırasında değişti'), 'A stale response should be clearly discarded.');

  console.log('Social Studies summaries, Week 8 exam notice, merged first-term textbook-aligned flows, Groq checks and stale-response protection, progress migration, completion rules, exact links, and backups passed.');
}

runSocialAIRegressionChecks().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Karekod envanteri: ders kitabının gömülü EBA bağlantılarından çözülmüş içerikler.
const qr = global.window.SOCIAL_QR;
assert.ok(qr && Array.isArray(qr.units) && qr.units.length >= 15, 'Karekod çalışmaları envanteri eksik.');
const qrIds = qr.units.map((unit) => unit.id);
assert.equal(new Set(qrIds).size, qrIds.length, 'Karekod kartı kimlikleri benzersiz olmalı.');
for (const unit of qr.units) {
  assert.ok(unit.title && unit.kind && unit.where && unit.intro, `Karekod kartı eksik alan içeriyor: ${unit.id}`);
  assert.ok(/^https:\/\/ders\.eba\.gov\.tr\//.test(unit.sourceUrl || ''), `Karekod bağlantısı EBA adresi olmalı: ${unit.id}`);
  assert.ok(unit.weekIds.length > 0 && unit.weekIds.every((id) => id >= 1 && id <= 15), `Karekod kartı geçerli haftaya bağlanmalı: ${unit.id}`);
  assert.ok(unit.before.length >= 2, `Karekod kartında izleme öncesi en az iki soru olmalı: ${unit.id}`);
  assert.ok(unit.notes.length >= 3, `Karekod kartında en az üç not alanı olmalı: ${unit.id}`);
  assert.ok(unit.questions.length >= 2, `Karekod kartında en az iki soru olmalı: ${unit.id}`);
  for (const question of unit.questions) {
    assert.ok(question.options.length >= 3 && Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length, `Karekod sorusunda geçerli yanıt yok: ${unit.id}/${question.id}`);
  }
  assert.ok(unit.write && unit.write.minChars > 0 && unit.write.criteria.length >= 2, `Karekod yazma görevi eksik: ${unit.id}`);
}
// Etkinlik türü rozeti: her adımın türü (video, okuma, etkileşim, seçim, yazma) görünür olmalı.
// Fen ve Türkçe alanlarındaki tür rozetleriyle aynı ölçü; lejant haftadaki türleri sayar.
const socialSource = require('fs').readFileSync(require('path').join(__dirname, '..', 'social-studies.js'), 'utf8');
for (const kind of ['video', 'audio', 'map', 'interactive', 'reading', 'visual', 'practice', 'choice', 'writing']) {
  assert.ok(new RegExp(`${kind}: \\{ icon:`).test(socialSource), `Etkinlik türü rozeti eksik: ${kind}`);
}
assert.ok(/socialStepKind\(/.test(socialSource), 'Adım türü tek bir yerden belirlenmeli.');
assert.ok(/social-kind-legend/.test(socialSource), 'Haftanın etkinlik türleri lejantla gösterilmeli.');
assert.ok(/social-activity-chips/.test(socialSource), 'Kart başlığında tür rozetleri bulunmalı.');
assert.ok(/social-quest-icon/.test(socialSource), 'Görev yolu adımları türe göre simge taşımalı.');

// Aynı video/harita etkinliği iki haftada birden görünmemeli; her kart tek haftaya bağlanır.
for (const unit of qr.units) {
  assert.equal(unit.weekIds.length, 1, `Karekod kartı tek haftaya bağlanmalı: ${unit.id}`);
}
const qrWeeks = [...new Set(qr.units.flatMap((unit) => unit.weekIds))].sort((a, b) => a - b);
assert.ok(qrWeeks.length >= 10, 'Karekod kartları en az on haftaya yayılmalı.');

// Kitaptaki etkinlik teknikleri dönem boyunca çeşitlenmeli; aynı teknik her hafta tekrarlanmaz.
const allFormats = social.weeks.flatMap((week) => week.activities.map((activity) => activity.format || activity.sourceStyle)).join(' | ').toLocaleLowerCase('tr-TR');
for (const technique of ['Balık kılçığı', 'GZFT', 'Dallanmış ağaç', 'Zaman şeridi', 'Kelime bulutu', 'Bulmaca', 'Kavram haritası', 'Tanılayıcı test']) {
  assert.ok(allFormats.includes(technique.toLocaleLowerCase('tr-TR')), `Dönem boyunca ${technique} tekniği en az bir kez kullanılmalı.`);
}
// Bağlantı düzeni Türkçe karekod kartlarıyla aynı: kart başına tek bağlantı, EBA adresi.
const appSource = require('fs').readFileSync(require('path').join(__dirname, '..', 'social-qr-app.js'), 'utf8');
assert.ok(!/youtube\.com\/results\?search_query/.test(appSource), 'Karekod kartları YouTube aramasına yönlendirmemeli.');
assert.ok(!/publicUrl|driveUrl/.test(appSource), 'Karekod kartlarında ikinci (YouTube/Drive) bağlantı gösterilmemeli.');
assert.ok(!/qr-link-note/.test(appSource), 'Karekod kartlarında bağlantı notu gösterilmemeli.');
assert.ok(/unit\.sourceUrl/.test(appSource), 'Karekod kartı EBA adresini kullanmalı.');
assert.ok((appSource.match(/source-link qr-source-link/g) || []).length <= 1, 'Kart başına tek bağlantı üretilmeli.');
for (const unit of qr.units) {
  assert.ok(!unit.publicUrl && !unit.driveUrl, `Kartta ikinci bağlantı alanı olmamalı: ${unit.id}`);
  assert.ok(/^https:\/\/ders\.eba\.gov\.tr\//.test(unit.sourceUrl), `Kart yalnızca EBA adresine gitmeli: ${unit.id}`);
}
// s. 45 sayfasında iki karekod vardır; ikisi de karta bağlanmalı.
const sayfa45 = qr.units.filter((unit) => String(unit.where || '').startsWith('s. 45'));
assert.equal(sayfa45.length, 2, 's. 45 sayfasındaki iki karekodun ikisi de karta bağlanmalı.');
for (const resourceId of ['6e1f6955aeff331cc85451f6a8231cc5', 'b14529259e0b211f8d6ae3a4bb6ab951']) {
  assert.ok(sayfa45.some((unit) => unit.sourceUrl.includes(resourceId)), `s. 45 karekodu eksik: ${resourceId}`);
}
const milliMeseleler = qr.units.find((unit) => unit.id === 'qr-milli-meseleler');
assert.ok(milliMeseleler && /milli-meselelerde-biz/.test(milliMeseleler.analysis.doc), 'Millî Meselelerde Biz kartı analiz dosyasına bağlanmalı.');
// s. 32 sayfasında üç karekod vardır; üçü de ayrı karta bağlanmalı.
const sayfa32 = qr.units.filter((unit) => String(unit.where || '').startsWith('s. 32'));
assert.equal(sayfa32.length, 3, 's. 32 sayfasındaki üç karekodun üçü de karta bağlanmalı.');
for (const resourceId of ['2edd5069ff032e00a221a9a0545791bf', '63c076451e7fbbd14870627408def2c4', 'c5c2fbcab508be24681e00d60dabd6ac']) {
  assert.ok(sayfa32.some((unit) => unit.sourceUrl.includes(resourceId)), `s. 32 karekodu eksik: ${resourceId}`);
}
assert.ok(sayfa32.every((unit) => unit.analysis && /sayfa32-uc-video/.test(unit.analysis.doc)), 's. 32 kartları üç videoluk analiz dosyasına bağlanmalı.');
const iletisimVideo = qr.units.find((unit) => unit.id === 'qr-iletisim-video');
const iletisimYollari = qr.units.find((unit) => unit.id === 'qr-iletisim-yollari');
assert.ok(iletisimVideo && /okul-veli-iletisimi/.test(iletisimVideo.analysis.doc), 's. 15 kartı okul-veli iletişimi analizine bağlanmalı.');
assert.ok(iletisimYollari && /etkili-iletisim/.test(iletisimYollari.analysis.doc), 's. 23 kartı etkili iletişim analizine bağlanmalı.');
// Doğru yanıtlar tek şıkta toplanmaz: her kartta yanıt konumları çeşitlenmeli.
for (const unit of qr.units.filter((item) => item.questions.length >= 2)) {
  assert.ok(new Set(unit.questions.map((question) => question.answer)).size >= 2, `Karekod kartında yanıt konumları çeşitlenmeli: ${unit.id}`);
}
console.log(`Social Studies karekod envanteri tutarlı: ${qr.units.length} kart · ${qrWeeks.length} hafta · ${qr.units.filter((unit) => unit.sourceLinkType === 'video').length} video.`);
