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
require('../science.js');
const science = global.window.SCIENCE;
assert.ok(science, 'The Fen Bilimleri workspace should expose its course API.');
assert.equal(science.weeks.length, 37, 'The Fen plan should track 37 individually dated weeks.');
assert.deepEqual(science.weeks.map((week) => week.id), Array.from({ length: 37 }, (_, index) => index + 1));
assert.deepEqual(science.units.map((unit) => unit.title), [
  'Uzay Çağı', 'Kuvvet ve Enerjiyi Keşfedelim', 'Vücudumuzdaki Sistemler',
]);
assert.deepEqual(
  Object.fromEntries(science.units.map((unit) => [unit.id, science.weeks.filter((week) => week.unitId === unit.id).length])),
  { space: 12, energy: 7, systems: 18 },
);
assert.deepEqual(science.units.map((unit) => unit.pages), ['14–52', '58–81', '88–148']);
const socialStudiesSource = fs.readFileSync(path.join(__dirname, '../social-studies.js'), 'utf8');
const canonicalDates = Object.fromEntries(
  [...socialStudiesSource.matchAll(/\bweek\((\d+),\s*'([^']+)'/g)].map(([, id, date]) => [Number(id), date]),
);
assert.deepEqual(
  Object.fromEntries(science.weeks.map((week) => [week.id, week.date])),
  canonicalDates,
  'Every Fen week date should match the canonical Social Studies course calendar.',
);
assert.equal(science.weeks[7].date, '2–6 Kas');
assert.equal(science.weeks[8].date, '9–13 Kas');
assert.equal(science.weeks[9].date, '23–27 Kas', 'The mid-November break should remain in the existing school calendar.');
assert.equal(science.weeks[31].date, '20–21 May');
assert.equal(science.weeks[36].date, '21–25 Haz');

const expectedTopics = [
  'Uzay araştırmalarına giriş ve gözlem soruları',
  'Yıldızların yaşam döngüsü ve kütleye bağlı sonlar',
  'Enerjinin korunumu ve sürtünmenin etkisi',
  'Sindirim sistemini oluşturan organlar ve görevleri',
  'Küçük ve büyük kan dolaşımı',
  'Solunum sisteminin organları ve hava yolu',
  'Boşaltım sistemi: böbrekler ve idrar yolu',
];
for (const topic of expectedTopics) assert.ok(science.weeks.some((week) => week.topic === topic), `Missing textbook-aligned science topic: ${topic}`);
assert.ok(science.weeks.every((week) => week.date && week.topic && week.focus && week.pages));
assert.ok(science.weeks.every((week) => week.summary.join(' ').length >= 220 && week.points.length >= 3 && week.terms.length >= 3));
assert.ok(science.weeks.every((week) => week.tasks.length === 3 && week.activity.criteria.length >= 3));
assert.ok(science.weeks.every((week) => week.quiz.options.length === 4 && Number.isInteger(week.quiz.answer) && week.quiz.answer >= 0 && week.quiz.answer < week.quiz.options.length));
assert.ok(science.weeks.every((week) => week.activity.minChars >= 15 && week.activity.title && week.activity.format && week.activity.prompt));
assert.ok(science.weeks.every((week) => ['orbit', 'space-risk', 'star-life', 'energy', 'digestion', 'circulation', 'respiration', 'excretion', 'systems'].includes(week.visual)));
assert.ok(new Set(science.weeks.map((week) => week.activity.title)).size === 37, 'Each week should have its own original activity title.');

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
assert.equal(mockElements.scienceProgressCount.textContent, '0 / 37 hafta tamamlandı');

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
assert.deepEqual(normalized.weeks['1'].tasks, [true, false, true]);
assert.equal(normalized.weeks['1'].quizAnswer, null);
assert.equal(normalized.weeks['1'].activityAnswer.length, 5000);
assert.equal(normalized.weeks['1'].providers.eba, true);
assert.equal(normalized.weeks['1'].providers.mebi, false);
assert.equal(normalized.weeks['1'].aiFeedback.state, 'correct');

const week1 = science.weeks[0];
const completeWeek1 = {
  tasks: [true, true, true], quizAnswer: week1.quiz.answer, quizChecked: true,
  activityAnswer: `Bu hafta için kendi örneğim ve gerekçem: ${'kanıt '.repeat(8)}`,
};
assert.equal(science.isQuizCorrect(week1, completeWeek1), true);
assert.equal(science.isActivityComplete(week1, completeWeek1), true);
assert.equal(science.isWeekComplete(week1, completeWeek1), true);
assert.equal(science.isWeekComplete(week1, { ...completeWeek1, tasks: [true, false, true] }), false);
assert.equal(science.isWeekComplete(week1, { ...completeWeek1, quizAnswer: (week1.quiz.answer + 1) % 4 }), false);
assert.equal(science.isWeekComplete(week1, { ...completeWeek1, activityAnswer: 'Kısa.' }), false);

science.importProgress({ selectedWeek: 1, weeks: { '1': completeWeek1 } });
assert.ok(storage.has('emr7lect.science.v1'), 'Science progress should have its own localStorage namespace.');
assert.equal(mockElements.scienceWeekPrompt.hidden, true);
assert.equal(mockElements.scienceWeekContent.hidden, false);
assert.match(mockElements.scienceWeekContent.innerHTML, /Uzay araştırmalarına giriş/);
assert.match(mockElements.scienceWeekContent.innerHTML, /<svg/);
assert.match(mockElements.scienceWeekContent.innerHTML, /ÖZGÜN UYGULAMA/);
assert.match(mockElements.scienceWeekContent.innerHTML, /Kontrol et/);
assert.equal(mockElements.scienceProgressCount.textContent, '1 / 37 hafta tamamlandı');

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
  assert.ok(storage.has('emr7lect.science.v1'));
  console.log('Fen Bilimleri 37-week book map, calendar alignment, original topic/activity data, accessible rendering, safe Groq checks, progress isolation, completion rules, and backup API passed.');
}

checkAICheckAndStaleResponse().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
