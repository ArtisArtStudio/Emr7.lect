#!/usr/bin/env python3
"""Check GitHub Pages assets, focused-week navigation, Theme 1 practice, and reader behavior."""

import json
import re
import shutil
import subprocess
import sys
import tempfile
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
HTML_FILE = ROOT / "index.html"


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.local_refs = []
        self.inline_scripts = []
        self._inline_script = None

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        for attr in ("src", "href"):
            value = attributes.get(attr)
            if value:
                self.local_refs.append((tag, attr, value))
        if tag.lower() == "script":
            self._inline_script = None if attributes.get("src") else []

    def handle_data(self, data):
        if self._inline_script is not None:
            self._inline_script.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "script" and self._inline_script is not None:
            self.inline_scripts.append("".join(self._inline_script))
            self._inline_script = None


def grouping_test_source(html: str) -> str:
    groups_start = html.find("const BOOK_MAP={")
    groups_end = html.find("const BOOK_QUIZZES={", groups_start)
    migration_start = html.find("const WEEK_GROUP_VERSION=", groups_end)
    migration_end = html.find("const requestedReadingWeek=", migration_start)
    practice_renderer_start = html.find("function renderTheme1Practice(w){")
    practice_renderer_end = html.find("\nfunction renderList()", practice_renderer_start)
    renderer_start = html.find("function renderList(){")
    renderer_end = html.find("\nfunction render(){", renderer_start)
    if min(groups_start, groups_end, migration_start, migration_end, practice_renderer_start, practice_renderer_end, renderer_start, renderer_end) < 0:
        raise ValueError("Could not find the week-grouping or theme-practice code to test")

    grouping = html[groups_start:groups_end]
    migration = html[migration_start:migration_end]
    practice_data = (ROOT / "theme1-practice.js").read_text(encoding="utf-8")
    practice_forms = (ROOT / "theme1-practice-forms.js").read_text(encoding="utf-8")
    practice_renderer = html[practice_renderer_start:practice_renderer_end]
    renderer = html[renderer_start:renderer_end]
    harness = r"""
const BOOK_QUIZZES = {
  marti: Array(5), gencligin: Array(5), adini: Array(5), hayir: Array(5)
};
"""
    # The preceding grouping snippet declares weeks, specific, and groupTaskOrigins.
    harness += r"""
const expectedGroups = [[1,2],[3,4],[5,6],[10,11],[14,15],[20,21],[23,24],[31,32]];
const actualGroups = weeks.filter((w) => w[5].length > 1).map((w) => w[5]);
const equal = (a,b) => JSON.stringify(a) === JSON.stringify(b);
if (weeks.length !== 29) throw new Error(`Expected 29 study pages, got ${weeks.length}`);
if (!equal(actualGroups, expectedGroups)) throw new Error(`Unexpected merged groups: ${JSON.stringify(actualGroups)}`);
const themes = groupWeeksByTheme(weeks);
if (themes.length !== 9 || themes[0].number !== 1 || themes[0].name !== 'Hayat Boyu Gelişim') throw new Error('Theme navigation is missing its first theme or special sections');
if (!equal(themes[0].rows.map((w) => w[0]), [1,3,5]) || themes[0].weekCount !== 6) throw new Error('Theme 1 does not contain the three grouped study units from weeks 1–6');
if (THEME_NUMBER_BY_NAME.get('Bir Hilal Uğruna') !== 2 || themeDisplayName('Dönem sonu') !== 'Dönem sonu') throw new Error('Theme numbering includes a non-theme section or is out of order');
const byId = new Map(weeks.map((w) => [w[0], w]));
for (const [id, date] of [[1,'14–25 Eyl'],[3,'28 Eyl–9 Eki'],[5,'12–23 Eki'],[10,'23 Kas–4 Ara'],[14,'21–31 Ara'],[20,'15–26 Şub'],[23,'15–26 Mar'],[31,'10–21 May']]) {
  if (byId.get(id)?.[1] !== date) throw new Error(`Wrong combined date for week group ${id}: ${byId.get(id)?.[1]}`);
}
if (!byId.get(3)[3].includes('Sen Sor O Yanıtlasın')) throw new Error('The merged Gençliğin Kıymeti page lost its listening item');
if (specific[1].tasks.length !== 4 || specific[5].tasks.length !== 8) throw new Error('Merged task lists are not correct');

const oldProgress = {
  1: { done: [true,false,true,false], answers: {0:1}, aiAnswer: '' },
  2: { done: [false,true,false,true], answers: {1:0}, aiAnswer: 'week 2 answer' },
  5: { done: [true,false,false,false], answers: {0:0}, phaserGame: {} },
  6: { done: [false,true,false,true], answers: {1:2,5:1}, extraQuiz: [['new question']], phaserGame: {gate:2} }
};
const migrated = mergeGroupedProgress(oldProgress);
if (!equal(migrated[1].done, [true,true,true,true])) throw new Error('Progress from weeks 1–2 was not combined');
if (migrated[1].answers[0] !== 1 || migrated[1].answers[1] !== 0) throw new Error('Quiz answers from weeks 1–2 were not preserved');
if (migrated[1].aiAnswer !== 'week 2 answer') throw new Error('A written answer from week 2 was lost');
if (!equal(migrated[5].done, [true,false,false,false,false,true,false,true])) throw new Error('Progress from weeks 5–6 was not mapped to merged tasks');
if (!migrated[5].extraQuiz || migrated[5].answers[5] !== 1) throw new Error('Generated quiz data from week 6 was not preserved');
if (migrated[5].phaserGame.gate !== 2) throw new Error('Mini-game progress from week 6 was not preserved');
if ('2' in migrated || '4' in migrated || '6' in migrated || '11' in migrated) throw new Error('Obsolete duplicate-week progress keys remain');
if (mergeGroupedProgress(migrated) !== migrated) throw new Error('Week progress migration is not idempotent');
console.log('Week grouping and saved-progress migration passed.');
let current = 1;
let data = {};
let renderedPracticeUnit = null;
function store() {}
class ThemeNode {
  constructor(tag) { this.tag = tag; this.children = []; this.listeners = {}; this.attributes = {}; this.dataset = {}; this.className = ''; this.textContent = ''; this.open = false; this.hidden = false; this.innerHTML = ''; }
  append(...children) { this.children.push(...children); }
  replaceChildren() { this.children = []; this.innerHTML = ''; }
  addEventListener(name, callback) { this.listeners[name] = callback; }
  setAttribute(name, value) { this.attributes[name] = value; }
}
const themeRoot = new ThemeNode('div');
const themePracticeCard = new ThemeNode('section');
window.renderTheme1PracticeFlow = (unitId) => { renderedPracticeUnit = Number(unitId); };
global.document = {
  getElementById: (id) => ({weeklist: themeRoot, theme1Practice: themePracticeCard}[id]),
  createElement: (tag) => new ThemeNode(tag)
};
renderList();
const sections = themeRoot.children;
if (sections.length !== 9 || sections[0].className !== 'theme-group' || !sections[0].open || sections[1].open) throw new Error('Theme navigation did not open only the active theme');
if (sections[0].children[0].children[0].textContent !== 'Tema 1 · Hayat Boyu Gelişim') throw new Error('Theme 1 label is missing from the navigation');
if (sections[0].children[0].children[1].textContent !== '3 çalışma · 6 hafta') throw new Error('Theme 1 study/week count is incorrect');
const theme1Buttons = sections[0].children[1].children;
if (!equal(theme1Buttons.map((button) => button.children[0].textContent), ['1–2','3–4','5–6'])) throw new Error('Theme 1 weeks are not ordered and grouped correctly');
if (theme1Buttons[0].attributes['aria-current'] !== 'page') throw new Error('The active Theme 1 week is not marked accessibly');
console.log('Theme navigation renders Theme 1 with its grouped weeks.');

const practiceUnits = window.THEME1_PRACTICE.units;
const activityCounts = practiceUnits.map((unit) => unit.groups.map((group) => group.activities.length));
if (!equal(practiceUnits.map((unit) => unit.weekId), [1,3,5])) throw new Error('The original activity set is not limited to Theme 1 study units');
if (!equal(activityCounts, [[12],[8,1,10],[8,3,1]])) throw new Error(`Unexpected Theme 1 activity coverage: ${JSON.stringify(activityCounts)}`);
const allPracticeActivities = practiceUnits.flatMap((unit) => unit.groups.flatMap((group) => group.activities));
if (allPracticeActivities.length !== 43) throw new Error(`Expected 43 Theme 1 activities, got ${allPracticeActivities.length}`);
if (!allPracticeActivities.every((activity) => activity.id && activity.title && activity.count && activity.format && activity.source && activity.skill && activity.instruction)) throw new Error('A Theme 1 practice task is missing type, count, source, or skill metadata');
if (allPracticeActivities.some((activity) => activity.game || /mini game|mini oyun/i.test(activity.format || ''))) throw new Error('A game was added to the Theme 1 practice set');
const activityIds = new Set(allPracticeActivities.map((activity) => activity.id));
const configuredIds = new Set(Object.keys(window.THEME1_FORMS));
if (activityIds.size !== configuredIds.size || [...activityIds].some((id) => !configuredIds.has(id))) throw new Error('Every activity needs an explicit, source-matched question form');
for (const [activityId, questions] of Object.entries(window.THEME1_FORMS)) {
  if (!questions.length || questions.some((question) => !question.id || !question.prompt || !question.fields?.length)) throw new Error(`An activity question is incomplete: ${activityId}`);
  for (const question of questions) {
    if (question.fields.some((field) => !field.id || !field.label)) throw new Error(`A response widget is missing a label: ${activityId}/${question.id}`);
  }
}
const vocabulary = window.THEME1_FORMS['marti-a02'];
if (!vocabulary.some((question) => question.id === 'word-context-match' && question.responseType === 'matching' && question.fields.some((field) => field.type === 'sort'))) throw new Error('Anahtar söz varlığı needs context matching');
if (!vocabulary.some((question) => question.id === 'dictionary-meanings' && question.fields.filter((field) => field.type === 'select').length === 4)) throw new Error('Anahtar söz varlığı needs four dictionary-meaning choices');
if (!vocabulary.some((question) => question.id === 'word-relationships' && question.fields.filter((field) => field.type === 'textarea').length >= 3)) throw new Error('Anahtar söz varlığı word-relationship work is missing');
const genclikVocabulary = window.THEME1_FORMS['genclik-a01'];
if (!genclikVocabulary.some((question) => question.responseType === 'matching' && question.fields.some((field) => field.type === 'sort')) || !genclikVocabulary.some((question) => question.fields.some((field) => field.type === 'textarea'))) throw new Error('Gençliğin Kıymeti vocabulary needs dictionary matching and text-context notes');
const genclikComprehension = window.THEME1_FORMS['genclik-a03'];
if (genclikComprehension.length !== 5 || !genclikComprehension.some((question) => question.responseType === 'matching') || !genclikComprehension.some((question) => question.fields.some((field) => field.type === 'radio')) || !genclikComprehension.some((question) => question.fields.some((field) => field.type === 'select')) || !genclikComprehension.some((question) => question.fields.some((field) => field.type === 'textarea'))) throw new Error('Gençliğin Kıymeti comprehension needs varied types across five PDF-aligned questions');
for (const section of ['serim','dugum','cozum']) {
  if (!window.THEME1_FORMS['marti-a04'].some((question) => question.id === section && question.fields.some((field) => field.type === 'textarea'))) throw new Error(`Olay örgüsü needs a separate written ${section} response`);
}
if (!window.THEME1_FORMS['sport-a10'].some((question) => question.id === 'dugum') || !window.THEME1_FORMS['sport-a10'].some((question) => question.id === 'cozum')) throw new Error('The written story sections are not separate response fields');
const matchingQuestions = Object.values(window.THEME1_FORMS).flat().filter((question) => question.responseType === 'matching');
if (matchingQuestions.length < 6 || matchingQuestions.some((question) => !question.fields.some((field) => ['select','sort'].includes(field.type)))) throw new Error('Source matching/classification tasks must use matching or sorting widgets');
const sortingFields = Object.values(window.THEME1_FORMS).flat().flatMap((question) => question.fields.filter((field) => field.type === 'sort'));
if (sortingFields.length < 6 || sortingFields.some((field) => !field.categories?.length || !field.items?.length || new Set(field.items.map((item) => item.id)).size !== field.items.length)) throw new Error('Drag-and-drop sorting fields need categories and unique, labelled cards');
if (!window.THEME1_FORMS['adiny-review'].some((question) => question.id === 'review-2' && question.fields.some((field) => field.type === 'radio'))) throw new Error('The theme review multiple-choice item is not a real selection widget');
if (!window.THEME1_FORMS['adiny-a03'].every((question) => question.sourceKeys?.includes('adini') && question.sourceNote?.includes('QR'))) throw new Error('The Kaoru–Yiğit Caner Aydın comparison must use the story text and note the QR-only video limit');

renderTheme1Practice(weeks.find((week) => week[0] === 1));
if (themePracticeCard.hidden || renderedPracticeUnit !== 1) throw new Error('The selected Theme 1 week did not open its embedded package');
renderTheme1Practice(weeks.find((week) => week[0] === 7));
if (!themePracticeCard.hidden || renderedPracticeUnit !== 1) throw new Error('Theme 1 practice appeared for another theme or changed the previous unit');
console.log('Theme 1 practice inventory, typed forms, embedded package selection, and game-card removal passed.');
"""
    return "global.window = {};\n" + grouping + "\n" + migration + "\n" + practice_data + "\n" + practice_forms + "\n" + practice_renderer + "\n" + renderer + "\n" + harness



def focus_week_test_source(html: str) -> str:
    route_start = html.find("function updateWeekRoute(){")
    route_end = html.find("\ndocument.getElementById('clearWeek').onclick=", route_start)
    if route_start < 0 or route_end < 0:
        raise ValueError("Could not find focused-week route handlers")
    route_code = html[route_start:route_end]
    return r"""
const vm = require('node:vm');
let current = 1;
let focusMode = false;
let renderCount = 0;
let scrollCount = 0;
const weeks = [[1], [3], [5], [7]];
const listeners = {};
const pushes = [];
const title = {focusCount: 0, focus() { this.focusCount += 1; }};
const practiceTitle = {focusCount: 0, focus() { this.focusCount += 1; }};
const practice = {hidden: true, scrollCount: 0, scrollIntoView() { this.scrollCount += 1; }};
const activeWeek = {focusCount: 0, scrollCount: 0, focus() { this.focusCount += 1; }, scrollIntoView() { this.scrollCount += 1; }};
const backButton = {listeners: {}, addEventListener(name, callback) { this.listeners[name] = callback; }};
const browserWindow = {
  location: {href: 'https://example.test/Emr7.lect/', search: '', hash: ''},
  history: {pushState(state, title, url) {
    pushes.push({state, url: String(url)});
    const parsed = new URL(String(url));
    browserWindow.location.href = parsed.href;
    browserWindow.location.search = parsed.search;
    browserWindow.location.hash = parsed.hash;
  }},
  addEventListener(name, callback) { listeners[name] = callback; },
  scrollTo() { scrollCount += 1; }
};
const document = {
  getElementById(id) { return id === 'title' ? title : id === 'theme1Practice' ? practice : id === 'theme1PracticeTitle' ? practiceTitle : id === 'backToWeeks' ? backButton : null; },
  querySelector(selector) { return selector === '#weeklist .weekbtn.active' ? activeWeek : null; }
};
const context = vm.createContext({window: browserWindow, document, URL, URLSearchParams, weeks,
  get current() { return current; }, set current(value) { current = value; },
  get focusMode() { return focusMode; }, set focusMode(value) { focusMode = value; },
  render() { renderCount += 1; practice.hidden = !focusMode || ![3,5].includes(current); }
});
vm.runInContext(__ROUTE_CODE__, context);
context.selectReadingWeek(3);
if (current !== 3 || !focusMode || !new URL(browserWindow.location.href).searchParams.has('week')) throw new Error('Selecting a week did not enter focused mode or create a week route');
if (renderCount !== 1 || title.focusCount !== 0 || practiceTitle.focusCount !== 1 || practice.scrollCount !== 1 || scrollCount !== 0) throw new Error('Theme 1 selection did not scroll and move keyboard focus to its first practice package');
backButton.listeners.click();
if (focusMode || new URL(browserWindow.location.href).searchParams.has('week')) throw new Error('The return control did not restore the week-selection route');
if (activeWeek.focusCount !== 1 || activeWeek.scrollCount !== 1 || renderCount !== 2) throw new Error('Returning to the list did not restore accessible focus');
context.selectReadingWeek(99);
if (current !== 3 || focusMode || pushes.length !== 2) throw new Error('An invalid week unexpectedly changed the reader state');
browserWindow.location.search = '?week=5';
listeners.popstate();
if (current !== 5 || !focusMode || practiceTitle.focusCount !== 2 || practice.scrollCount !== 2) throw new Error('Browser history did not restore focused-week mode and the selected package');
browserWindow.location.search = '';
listeners.popstate();
if (focusMode || activeWeek.focusCount !== 2 || renderCount !== 4) throw new Error('Browser history did not return to the week list');
context.selectReadingWeek(7);
if (current !== 7 || !focusMode || practiceTitle.focusCount !== 2 || title.focusCount !== 1 || scrollCount !== 1) throw new Error('A non-Theme 1 week did not retain its standard reader focus and scroll behavior');
console.log('Focused-week selection, return control, browser history, Theme 1 practice visibility, and keyboard focus passed.');
""".replace("__ROUTE_CODE__", json.dumps(route_code))


def practice_app_test_source() -> str:
    sources = [
        (ROOT / name).read_text(encoding="utf-8")
        for name in (
            "book-texts.js",
            "theme1-practice.js",
            "theme1-practice-forms.js",
            "theme1-practice-app.js",
        )
    ]
    return f"""
const vm = require('node:vm');
const sources = {json.dumps(sources, ensure_ascii=False)};
for (const unitId of [1,3,5]) {{
  const elements = new Map();
  const element = (id) => {{
    if (!elements.has(id)) elements.set(id, {{
      id, innerHTML: '', textContent: '', dataset: {{}}, value: '', checked: false,
      disabled: false, attributes: {{}}, listeners: {{}}, style: {{}},
      setAttribute(name, value) {{ this.attributes[name] = value; }},
      addEventListener(name, callback) {{ this.listeners[name] = callback; }},
      querySelectorAll() {{ return []; }},
      getBoundingClientRect() {{ return {{top: 0}}; }}
    }});
    return elements.get(id);
  }};
  const store = new Map();
  const browserWindow = {{
    location: {{search: `?unit=${{unitId}}`}}, scrollY: 0,
    scrollTo() {{}}, setTimeout() {{ return 1; }}, clearTimeout() {{}}
  }};
  const browserDocument = {{title: '', getElementById: element}};
  const context = vm.createContext({{
    window: browserWindow,
    document: browserDocument,
    localStorage: {{
      getItem: (key) => store.get(key) || null,
      setItem: (key, value) => store.set(key, value),
      removeItem: (key) => store.delete(key)
    }},
    URL, URLSearchParams, Date, console
  }});
  for (const source of sources) vm.runInContext(source, context);
  const qr = context.window.THEME1_QR_SOURCES;
  const decodedQRs = {{
    hayatBuyuk: 'https://www.eba.gov.tr/c?q=UEX7a3e23fb',
    birIyilikHikayesi: 'https://www.eba.gov.tr/c?q=UEXff7ff4bd',
    yigitCanerAydin: 'https://www.eba.gov.tr/c?q=UEX5afb21e6',
    aliKuscu: 'https://www.eba.gov.tr/c?q=UEX3d0cd83c'
  }};
  for (const [key, url] of Object.entries(decodedQRs)) if (qr[key] !== url) throw new Error(`Decoded QR destination changed or is missing: ${{key}}`);
  const allActivities = context.window.THEME1_PRACTICE.units.flatMap((unit) => unit.groups.flatMap((group) => group.activities));
  const byActivityId = new Map(allActivities.map((activity) => [activity.id, activity]));
  const expectedSources = [
    ['marti-a08', qr.hayatBuyuk], ['marti-a09', qr.hayatBuyuk],
    ['genclik-a04', qr.birIyilikHikayesi],
    ...['sport-a01','sport-a02','sport-a03','sport-a04','sport-a05','sport-a06','adiny-a03'].map((id) => [id, qr.yigitCanerAydin]),
    ['adiny-a05', qr.aliKuscu], ['adiny-a06', qr.aliKuscu]
  ];
  for (const [id, url] of expectedSources) if (!url || byActivityId.get(id)?.sourceUrl !== url) throw new Error(`QR source link missing or assigned to wrong activity: ${{id}}`);
  const geminiNotesPath = 'docs/video-analysis/hayat-buyuk-bir-okuldur-gemini-analysis.txt';
  for (const id of ['marti-a08', 'marti-a09']) if (byActivityId.get(id)?.sourceNotesUrl !== geminiNotesPath) throw new Error(`Gemini analysis notes are not attached to ${{id}}`);
  const vocabularyQuestions = context.window.THEME1_FORMS['marti-a02'];
  const comprehensionQuestions = context.window.THEME1_FORMS['marti-a03'];
  const plotQuestions = context.window.THEME1_FORMS['marti-a04'];
  const viewpointQuestions = context.window.THEME1_FORMS['marti-a05'];
  const solutionQuestions = context.window.THEME1_FORMS['marti-a06'];
  if (!vocabularyQuestions.some((question) => question.responseType === 'matching' && question.fields.some((field) => field.type === 'sort')) || !vocabularyQuestions.some((question) => question.fields.some((field) => field.type === 'select'))) throw new Error('The Jonathan vocabulary task needs word matching and dictionary choices');
  if (!comprehensionQuestions.some((question) => question.fields.some((field) => field.type === 'checkboxes')) || !comprehensionQuestions.some((question) => question.fields.some((field) => field.type === 'radio')) || !comprehensionQuestions.some((question) => question.responseType === 'matching')) throw new Error('The Jonathan comprehension tasks need selection, matching, and written evidence');
  if (!plotQuestions.some((question) => question.responseType === 'matching' && question.fields.some((field) => field.type === 'sort')) || !plotQuestions.some((question) => question.fields.some((field) => field.type === 'radio')) || !plotQuestions.some((question) => question.fields.some((field) => field.type === 'textarea'))) throw new Error('The Jonathan story-structure task needs sorting, judgement, and writing');
  if (!viewpointQuestions.some((question) => question.responseType === 'matching' && question.fields.some((field) => field.type === 'sort')) || !viewpointQuestions.some((question) => question.fields.some((field) => field.type === 'textarea'))) throw new Error('The Jonathan perspective task needs matching and written inference');
  if (!solutionQuestions.some((question) => question.fields.some((field) => field.type === 'select')) || !solutionQuestions.some((question) => question.fields.some((field) => field.type === 'textarea'))) throw new Error('The Jonathan problem-solving task needs a choice and a written rationale');
  const nextVocabulary = context.window.THEME1_FORMS['genclik-a01'];
  const nextComprehension = context.window.THEME1_FORMS['genclik-a03'];
  if (!nextVocabulary.some((question) => question.responseType === 'matching' && question.fields.some((field) => field.type === 'sort'))) throw new Error('The next text vocabulary task needs matching');
  if (nextComprehension.length !== 5 || !nextComprehension.some((question) => question.responseType === 'matching') || !nextComprehension.some((question) => question.fields.some((field) => field.type === 'select'))) throw new Error('The next text needs five varied comprehension tasks');
  const emailQuestions = context.window.THEME1_FORMS['marti-a12'];
  if (JSON.stringify(emailQuestions.map((question) => question.id)) !== JSON.stringify(['email-purpose','email-plan','email-write']) || !emailQuestions.find((question) => question.id === 'email-write')?.fields.some((field) => field.id === 'answer' && field.rows === 7)) throw new Error('The existing Martı email activity must remain intact');
  const semicolonQuestions = context.window.THEME1_FORMS['marti-a11'];
  const semicolonSort = semicolonQuestions.find((question) => question.id === 'sort-examples')?.fields.find((field) => field.type === 'sort');
  if (!semicolonSort || semicolonSort.categories.length !== 3 || semicolonSort.items.length !== 9 || semicolonSort.categories.some((category) => !category.label || !category.description)) throw new Error('The page-11 semicolon sort needs three clearly explained groups and nine examples');
  const semicolonDistribution = semicolonSort.categories.map((category) => semicolonSort.items.filter((item) => semicolonSort.expectedAssignments?.[item.id] === category.id).length);
  if (!semicolonSort.expectedAssignments || semicolonDistribution.some((count) => count !== 3)) throw new Error(`The page-11 semicolon examples are not evenly assigned to the three stated uses: ${{semicolonDistribution}}`);
  if (semicolonQuestions.some((question) => /bu kullanım için kuralı ve yeni bir örneği yaz/i.test(question.prompt))) throw new Error('The page-11 semicolon exercise still uses the repeated rule-and-example prompt');
  const semicolonPuzzle = semicolonQuestions.find((question) => question.id === 'punctuation-puzzle');
  const semicolonWriting = semicolonQuestions.find((question) => question.id === 'write-your-own');
  if (!semicolonPuzzle?.fields.some((field) => field.type === 'radio') || !semicolonPuzzle.fields.some((field) => field.type === 'textarea') || !semicolonWriting?.diagram || !semicolonWriting.fields.some((field) => field.type === 'textarea')) throw new Error('The page-11 semicolon activity needs varied selection, explanation, and guided writing');
  const reviewQRQuestion = context.window.THEME1_FORMS['adiny-review'].find((question) => question.id === 'review-4');
  if (!reviewQRQuestion || reviewQRQuestion.sourceUrl !== qr.aliKuscu) throw new Error('Ali Kuşçu QR link is missing from the relevant theme-review question');
  const selected = context.window.THEME1_PRACTICE.units.find((unit) => unit.weekId === unitId);
  const activities = selected.groups.flatMap((group) => group.activities);
  const qrActivity = activities.find((item) => item.id === 'marti-a08');
  if (qrActivity) {{
    qrActivity.sourceUrl = 'https://example.test/hayat-buyuk';
    qrActivity.sourceLinkLabel = 'Hayat Büyük Bir Okuldur';
    context.window.THEME1_FORMS['marti-a08'][0].sourceUrl = 'https://example.test/soru-videosu';
    context.window.THEME1_FORMS['marti-a08'][0].sourceLinkLabel = 'Etkinlik videosu';
  }}
  context.window.renderTheme1PracticeFlow(unitId);
  for (let index = 0; index < activities.length; index += 1) {{
    const activity = activities[index];
    const expectedChecks = context.window.THEME1_FORMS[activity.id].length;
    const actualChecks = (element('activity-stage').innerHTML.match(/data-check-question=/g) || []).length;
    if (actualChecks !== expectedChecks) throw new Error(`Unit ${{unitId}} activity ${{activity.id}}: expected ${{expectedChecks}} question checks, got ${{actualChecks}}`);
    const expectedSorts = context.window.THEME1_FORMS[activity.id].flatMap((question) => question.fields).filter((field) => field.type === 'sort').length;
    const actualSorts = (element('activity-stage').innerHTML.match(/data-sort-widget=/g) || []).length;
    if (actualSorts !== expectedSorts) throw new Error(`Unit ${{unitId}} activity ${{activity.id}}: expected ${{expectedSorts}} sorting widgets, got ${{actualSorts}}`);
    const renderedHTML = element('activity-stage').innerHTML;
    if (activity.sourceUrl && !renderedHTML.includes(`href="${{activity.sourceUrl}}"`)) throw new Error(`Unit ${{unitId}} activity ${{activity.id}} source link was not rendered`);
    if (activity.sourceUrl) {{
      const mediaClass = activity.sourceLinkType === 'audio' ? 'audio-source-link' : 'video-source-link';
      const icon = activity.sourceLinkType === 'audio' ? '🎧' : '🎥';
      const action = activity.sourceLinkType === 'audio' ? 'Dinlemeyi aç' : 'Videoyu aç';
      if (!renderedHTML.includes(mediaClass) || !renderedHTML.includes(icon) || !renderedHTML.includes(action) || !renderedHTML.includes(activity.sourceLinkLabel || '')) throw new Error(`Unit ${{unitId}} activity ${{activity.id}} source link lacks its media icon, title, or open action`);
    }}
    for (const question of context.window.THEME1_FORMS[activity.id]) if (question.sourceUrl) {{
      if (!renderedHTML.includes(`href="${{question.sourceUrl}}"`)) throw new Error(`Unit ${{unitId}} activity ${{activity.id}} question ${{question.id}} source link was not rendered`);
      const isAudio = question.sourceLinkType === 'audio' || /dinleme|ses kayd/i.test(question.sourceLinkLabel || '');
      const mediaClass = isAudio ? 'audio-source-link' : 'video-source-link';
      const icon = isAudio ? '🎧' : '🎥';
      const action = isAudio ? 'Dinlemeyi aç' : 'Videoyu aç';
      if (!renderedHTML.includes(mediaClass) || !renderedHTML.includes(icon) || !renderedHTML.includes(action) || !renderedHTML.includes(question.sourceLinkLabel || '')) throw new Error(`Unit ${{unitId}} activity ${{activity.id}} question ${{question.id}} source link lacks its media icon, title, or open action`);
    }}
    if (activity.id === 'marti-a08') {{
      const html = element('activity-stage').innerHTML;
      if (!html.includes('href="https://example.test/hayat-buyuk"') || !html.includes('href="https://example.test/soru-videosu"')) throw new Error('QR video links were not rendered at activity and question level');
      if (!html.includes('Groq QR bağlantısını açıp videoyu izleyemez/dinleyemez') || !html.includes('Gemini analiz notları')) throw new Error('QR activity does not identify the Gemini source notes and Groq video-access limit');
    }}
    if (activity.id === 'adiny-a03' && !element('activity-stage').innerHTML.includes('video içeriğinin doğru olduğu onayı değildir')) throw new Error('Mixed story/video comparison lacks an explicit verification limit');
    if (activity.id === 'adiny-review') {{
      const html = element('activity-stage').innerHTML;
      const start = html.indexOf('data-question-key="adiny-review::review-4"');
      const end = html.indexOf('</article>', start);
      if (start < 0 || !html.slice(start, end).includes(`href="${{qr.aliKuscu}}"`)) throw new Error('The Ali Kuşçu QR link was not shown on its relevant review question');
    }}
    if (activity.id === 'marti-a11') {{
      const html = element('activity-stage').innerHTML;
      for (const phrase of ['sort-visual-guide', 'Virgüllü iki listeyi ayırır', 'Bağlantılı iki cümleyi ayırır', 'İçinde virgüllü liste olan iki cümleyi ayırır', 'question-diagram', 'Planla ve kendi cümleni yaz']) if (!html.includes(phrase)) throw new Error(`The page-11 redesign is missing ${{phrase}}`);
      if (!html.includes('data-kind="puzzle"') || !html.includes('İşareti seç · gerekçeni yaz')) throw new Error('The page-11 activity is missing its interactive puzzle/choice flows');
    }}
    if (!element('activity-stage').innerHTML.includes('Yanıt alanı')) throw new Error(`Unit ${{unitId}} activity ${{activity.id}} is missing a response area`);
    if (index < activities.length - 1) element('next-step').listeners.click();
  }}
  const totalChecks = activities.reduce((sum, activity) => sum + context.window.THEME1_FORMS[activity.id].length, 0);
  console.log(`Unit ${{unitId}} rendered ${{activities.length}} activities and ${{totalChecks}} question checks.`);
}}
"""


def sort_interaction_test_source() -> str:
    sources = [
        (ROOT / name).read_text(encoding="utf-8")
        for name in (
            "book-texts.js",
            "theme1-practice.js",
            "theme1-practice-forms.js",
            "theme1-practice-app.js",
        )
    ]
    return r"""
const vm = require('node:vm');
const sources = __SOURCES__;
const elements = new Map();
const storage = new Map();
let board = null;
const element = (id) => {
  if (!elements.has(id)) {
    const item = {
      id, innerHTML: '', textContent: '', dataset: {}, value: '', checked: false,
      disabled: false, hidden: false, attributes: {}, listeners: {}, style: {},
      setAttribute(name, value) { this.attributes[name] = value; },
      addEventListener(name, callback) { this.listeners[name] = callback; },
      querySelectorAll() { return []; },
      getBoundingClientRect() { return {top: 0}; }
    };
    elements.set(id, item);
  }
  return elements.get(id);
};
const stage = element('activity-stage');
stage.querySelectorAll = (selector) => selector === '[data-sort-widget]' && board ? [board] : [];
const browserWindow = {
  location: {search: '?week=1'}, scrollY: 0, scrollTo() {},
  setTimeout() { return 1; }, clearTimeout() {}
};
const context = vm.createContext({
  window: browserWindow,
  document: {title: '', getElementById: element},
  localStorage: {
    getItem: (key) => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key)
  },
  URLSearchParams, Date, console
});
for (const source of sources) vm.runInContext(source, context);
const unit = context.window.THEME1_PRACTICE.units.find((item) => item.weekId === 1);
const activity = unit.groups.flatMap((group) => group.activities).find((item) => context.window.THEME1_FORMS[item.id].some((question) => question.fields.some((field) => field.type === 'sort')));
const question = context.window.THEME1_FORMS[activity.id].find((item) => item.fields.some((field) => field.type === 'sort'));
const field = question.fields.find((item) => item.type === 'sort');
const qKey = `${activity.id}::${question.id}`;
const items = new Map();
const targets = new Map();
const status = {textContent: ''};
const bankCount = {textContent: ''};
const makeTarget = (id) => {
  const target = {
    dataset: {sortTarget: id}, listeners: {}, children: [],
    classList: {add() {}, remove() {}},
    addEventListener(name, callback) { this.listeners[name] = callback; },
    querySelector() { return null; },
    appendChild(item) {
      if (item.parent) item.parent.children = item.parent.children.filter((child) => child !== item);
      this.children.push(item);
      item.parent = this;
    }
  };
  targets.set(id, target);
  return target;
};
const bank = makeTarget('bank');
for (const category of field.categories) makeTarget(category.id);
for (const definition of field.items) {
  const item = {
    dataset: {sortItem: definition.id}, listeners: {}, attributes: {}, parent: null,
    classList: {add() {}, remove() {}},
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(name, callback) { this.listeners[name] = callback; }
  };
  items.set(definition.id, item);
  bank.children.push(item);
  item.parent = bank;
}
board = {
  dataset: {qkey: qKey, fieldId: field.id, unitId: '1', assignments: '{}'},
  querySelectorAll(selector) {
    if (selector === '[data-sort-item]') return [...items.values()];
    if (selector === '[data-sort-target]') return [...targets.values()];
    return [];
  },
  querySelector(selector) {
    if (selector === '[data-sort-status]' || selector === '.sort-status') return status;
    if (selector === '.sort-bank-count') return bankCount;
    const targetMatch = selector.match(/^\[data-sort-target="([^"]+)"\]$/);
    if (targetMatch) return targets.get(targetMatch[1]);
    const itemMatch = selector.match(/^\[data-sort-item="([^"]+)"\]$/);
    if (itemMatch) return items.get(itemMatch[1]);
    return null;
  }
};
context.window.renderTheme1PracticeFlow(1);
const activityIndex = unit.groups.flatMap((group) => group.activities).findIndex((item) => item.id === activity.id);
for (let index = 0; index < activityIndex; index += 1) element('next-step').listeners.click();
const firstId = field.items[0].id;
const secondId = field.items[1].id;
const thirdId = field.items[2].id;
const categoryOne = field.categories[0].id;
const categoryTwo = field.categories[1].id;
items.get(firstId).listeners.click({preventDefault() {}, stopPropagation() {}});
targets.get(categoryOne).listeners.click({target: {closest() { return null; }}});
items.get(secondId).listeners.click({preventDefault() {}, stopPropagation() {}});
targets.get(categoryTwo).listeners.keydown({key: 'Enter', preventDefault() {}});
let draggedId = '';
items.get(thirdId).listeners.dragstart({dataTransfer: {setData(type, value) { draggedId = value; }, effectAllowed: ''}});
targets.get(categoryOne).listeners.drop({preventDefault() {}, dataTransfer: {getData() { return draggedId; }}});
items.get(firstId).listeners.click({preventDefault() {}, stopPropagation() {}});
targets.get('bank').listeners.click({target: {closest() { return null; }}});
const saved = JSON.parse(storage.get('turkceRota2026'));
const assignments = saved[1].theme1PracticeFlow.answers[qKey][field.id];
if (assignments[firstId] !== undefined || assignments[secondId] !== categoryTwo || assignments[thirdId] !== categoryOne) {
  throw new Error(`Tap, keyboard, drag, or return-to-bank sorting did not persist correctly: ${JSON.stringify(assignments)}`);
}
if (!status.textContent.includes('2 /')) throw new Error('Sorting status did not announce placed cards');
console.log('Accessible sort widget supports tap-to-place, keyboard placement, drag-and-drop, and returning cards.');
""".replace("__SOURCES__", json.dumps(sources, ensure_ascii=False))



def groq_prompt_test_source() -> str:
    sources = [
        (ROOT / name).read_text(encoding="utf-8")
        for name in (
            "book-texts.js",
            "theme1-practice.js",
            "theme1-practice-forms.js",
            "theme1-practice-app.js",
        )
    ]
    return f"""
const vm = require('node:vm');
const sources = {json.dumps(sources, ensure_ascii=False)};
const saved = {{
  1: {{theme1PracticeFlow: {{stepIndex: 0, answers: {{'marti-a03::evidence-1': {{behaviors: ['Yiyecek aramak yerine uçuş hareketlerini tekrar tekrar denemesi', 'Hız ve süzülme üzerinde çalışıp becerisini geliştirmesi'], evidence: 'Jonathan tests a new way of turning.'}}}}, feedback: {{}}}}}}
}};
const storage = new Map([
  ['turkceRota2026', JSON.stringify(saved)],
  ['turkceGroqKey2026', 'unit-test-key']
]);
const elements = new Map();
let capturedRequest = null;
let mockResponse = 'DURUM: TAM DOĞRU | İPUCU: Başka bir örnek ara.';
const element = (id) => {{
  if (!elements.has(id)) {{
    const item = {{
      id, innerHTML: '', textContent: '', dataset: {{}}, value: '', checked: false,
      disabled: false, hidden: false, attributes: {{}}, listeners: {{}}, style: {{}},
      setAttribute(name, value) {{ this.attributes[name] = value; }},
      addEventListener(name, callback) {{ this.listeners[name] = callback; }},
      getBoundingClientRect() {{ return {{top: 0}}; }}
    }};
    item.querySelectorAll = (selector) => {{
      if (id === 'activity-stage' && selector === '[data-check-question]') {{
        const matches = [...item.innerHTML.matchAll(/data-check-question="([^"]+)"/g)];
        item.checkButtons = matches.map((match) => {{
          const feedback = {{dataset: {{}}, hidden: true, textContent: ''}};
          const pill = {{dataset: {{}}, hidden: true, textContent: ''}};
          const card = {{dataset: {{}}, querySelector: (name) => name === '.feedback-box' ? feedback : name === '[data-result-pill]' ? pill : null}};
          return {{dataset: {{checkQuestion: match[1]}}, disabled: false, textContent: '', listeners: {{}}, closest: () => card, addEventListener(name, callback) {{ this.listeners[name] = callback; }}, card, feedback, pill}};
        }});
        return item.checkButtons;
      }}
      return [];
    }};
    elements.set(id, item);
  }}
  return elements.get(id);
}};
const browserWindow = {{
  location: {{search: '?unit=1'}}, scrollY: 0, scrollTo() {{}},
  setTimeout() {{ return 1; }}, clearTimeout() {{}}
}};
const context = vm.createContext({{
  window: browserWindow,
  document: {{title: '', getElementById: element}},
  localStorage: {{getItem: (key) => storage.get(key) || null, setItem: (key, value) => storage.set(key, value), removeItem: (key) => storage.delete(key)}},
  URLSearchParams, Date, console,
  fetch: async (url, options) => {{
    capturedRequest = {{url, body: JSON.parse(options.body)}};
    return {{ok: true, json: async () => ({{choices: [{{message: {{content: mockResponse}}}}]}})}};
  }}
}});
for (const source of sources) vm.runInContext(source, context);
element('apiKey').value = 'unit-test-key';
context.window.renderTheme1PracticeFlow(1);
element('next-step').listeners.click();
element('next-step').listeners.click();
const stage = element('activity-stage');
const button = stage.checkButtons.find(item => item.dataset.checkQuestion === 'marti-a03::evidence-1');
if (!button) throw new Error('Could not find the story question check button');
button.listeners.click();
setTimeout(() => {{
  if (!capturedRequest) throw new Error('Kontrol et did not send a Groq request');
  const system = capturedRequest.body.messages.find(message => message.role === 'system').content;
  const prompt = capturedRequest.body.messages.find(message => message.role === 'user').content;
  if (!system.includes('7. sınıf Türkçe') || !system.includes('Tema 1 · Hayat Boyu Gelişim') || !system.includes('Maarif/MEB')) throw new Error('Groq system message omitted grade, theme, or Maarif/MEB context');
  const strictPromptChecks = ['yanlış, ilgisiz veya eksik', 'Harika', 'doğru yanıtı', 'hata/eksik yoksa hiçbir ipucu verme', 'DURUM: TAM DOĞRU'].map((phrase) => system.includes(phrase));
  if (strictPromptChecks.some((passed) => !passed)) throw new Error(`Groq prompt does not require strict labels and no hints for a fully correct response: ${{JSON.stringify(strictPromptChecks)}}`);
  if (!prompt.includes('Jonathan tests a new way of turning.') || !prompt.includes('Durgun denizin minik dalgacıkları')) throw new Error('Groq request omitted the student answer or relevant story source text');
  if (button.card.dataset.checkState !== 'correct' || button.pill.textContent !== '✓ Tam doğru') throw new Error('A fully correct AI result did not turn the question card and status badge green/correct');
  if (!button.feedback.textContent.includes('DURUM: TAM DOĞRU') || button.feedback.textContent.includes('İPUCU') || button.feedback.textContent.includes('başka bir örnek')) throw new Error('A fully correct response still displays an AI hint');
  mockResponse = 'DURUM: KISMEN DOĞRU';
  button.listeners.click();
  setTimeout(() => {{
    if (button.card.dataset.checkState !== 'partial' || button.pill.textContent !== '◐ Kısmen doğru') throw new Error('A partially correct AI result did not set the yellow status');
    mockResponse = 'DURUM: YANLIŞ';
    button.listeners.click();
    setTimeout(() => {{
      if (button.card.dataset.checkState !== 'wrong' || button.pill.textContent !== '✕ Yanlış') throw new Error('A wrong AI result did not set the red status');
      console.log('Question-level Groq context, no-hint correct status, yellow partial status, and red wrong status passed.');
    }}, 0);
  }}, 0);
}}, 0);
"""


def text_reader_test_source(html: str) -> str:
    def json_constant(name: str, next_name: str):
        pattern = (
            r"const " + re.escape(name) + r"=(\{.*?\});\nconst "
            + re.escape(next_name)
            + "="
        )
        match = re.search(pattern, html, re.DOTALL)
        if not match:
            raise ValueError(f"Could not find {name} in index.html")
        try:
            return json.loads(match.group(1))
        except json.JSONDecodeError as exc:
            raise ValueError(f"Could not parse {name}: {exc}") from exc

    text_source = (ROOT / "book-texts.js").read_text(encoding="utf-8")
    text_match = re.fullmatch(r"window\.BOOK_TEXTS=(\{.*\});\s*", text_source, re.DOTALL)
    if not text_match:
        raise ValueError("Could not find the standalone BOOK_TEXTS data")
    try:
        texts = json.loads(text_match.group(1))
    except json.JSONDecodeError as exc:
        raise ValueError(f"Could not parse BOOK_TEXTS: {exc}") from exc
    credits = json_constant("BOOK_CREDITS", "BOOK_PAUSE_PROMPTS")
    prompt_match = re.search(
        r"const BOOK_PAUSE_PROMPTS=(\{.*?\});\nconst BOOK_SUBHEADINGS=", html, re.DOTALL
    )
    if not prompt_match:
        raise ValueError("Could not find BOOK_PAUSE_PROMPTS in index.html")
    prompts = prompt_match.group(1)
    map_match = re.search(
        r"const BOOK_MAP=(\{.*?\});\nconst BOOK_CREDITS=", html, re.DOTALL
    )
    if not map_match:
        raise ValueError("Could not find BOOK_MAP in index.html")
    map_source = re.sub(
        r"([{,])(\s*)(\d+):",
        lambda match: f'{match.group(1)}{match.group(2)}"{match.group(3)}":',
        map_match.group(1),
    )
    try:
        book_map = json.loads(map_source)
    except json.JSONDecodeError as exc:
        raise ValueError(f"Could not parse BOOK_MAP: {exc}") from exc

    required = {
        "marti",
        "gencligin",
        "adini",
        "bayrak",
        "mustafa",
        "kagni",
        "eskici",
        "hayir",
        "ogut",
    }
    if not required.issubset(texts):
        raise ValueError(f"Missing source passages: {sorted(required - set(texts))}")
    week_eight = book_map.get("8", [None, None])
    if week_eight[1] != "mustafa" or "Tarihe Atılan İmza" not in week_eight[0]:
        raise ValueError("The PDF's Tarihe Atılan İmza passage is not mapped to week 8")
    if any(texts["marti"].count(f"[[PAUSE:{stop}]]") != 1 for stop in (1, 2)):
        raise ValueError("Jonathan's two PDF prediction stops are missing or duplicated")
    if len(texts["mustafa"]) < 6000 or "Üç Çıkış Yolu" not in texts["mustafa"]:
        raise ValueError("The full available Mustafa passage is missing from the reader")
    if credits.get("bayrak") != "Halide Edip Adıvar · Bursa, 11 Ekim · (Kısaltılmıştır.)":
        raise ValueError("The Bayrağımız credit is missing its source date or abbreviation note")
    if (
        len(texts["ogut"].split("\n\n")) != 5
        or not texts["ogut"].startswith("Dinle sana bir nasihat edeyim")
        or not texts["ogut"].endswith("Kötülerle konup göçücü olma.")
    ):
        raise ValueError("The Öğüt poem is missing one or more source stanzas")
    if len(texts["kagni"].split("\n\n")) != 7 or "MUSTAFA KEMAL’İN KAĞNISI" in texts["kagni"]:
        raise ValueError("The Kağnı poem's source title/stanza layout is incorrect")
    if "Düşerim gerilere iyceden iyceden." not in texts["kagni"]:
        raise ValueError("A line from the Kağnı poem is missing or incomplete")
    activity_fragments = (
        "metnin etkinliklerine göz gezdiriniz",
        "hareketle okurken kullanacağınız stratejiyi",
        "okuma süreciniz istediğiniz şekilde ilerlemezse",
        "yakın çevrenizdeki insanlar birbirleriyle",
        "sizce bir toprak parçasını ‘vatan’ yapan nedir",
        "metni soru sorarak okuma yöntemiyle",
    )
    for key, text in texts.items():
        if any(fragment in text.casefold() for fragment in activity_fragments):
            raise ValueError(f"A workbook instruction was mixed into the {key} story")
    if not re.search(r"#bookText\s*\{[^}]*font-size:\s*17px", html):
        raise ValueError("The reading text font was not increased to 17px")

    reader_start = html.find("function renderBookText(bm){")
    reader_end = html.find("\nasync function speakEleven", reader_start)
    if reader_start < 0 or reader_end < 0:
        raise ValueError("The structured story-text renderer is missing")
    reader_function = html[reader_start:reader_end]
    headings_match = re.search(
        r"const BOOK_SUBHEADINGS=\{mustafa:new Set\((\[.*?\])\)\};",
        html,
        re.DOTALL,
    )
    if not headings_match:
        raise ValueError("The Mustafa passage's source subheadings are missing")
    headings = json.loads(headings_match.group(1))
    expected_headings = {
        "MUSTAFA KEMAL PAŞA SAMSUN’DA",
        "Tarihî Yolculuk Başlıyor",
        "İlk Adım",
        "‘Millî Mesai’ Başlıyor",
        "(...) Düşman",
        "Millî Bilinç Uyanıyor: Büyük İstanbul Mitingleri",
        "Üç Çıkış Yolu",
    }
    if set(headings) != expected_headings:
        raise ValueError("The Mustafa passage's PDF section headings are incomplete or changed")

    harness = f"""
const BOOK_TEXTS = {json.dumps(texts, ensure_ascii=False)};
const BOOK_CREDITS = {json.dumps(credits, ensure_ascii=False)};
const BOOK_PAUSE_PROMPTS = {prompts};
const BOOK_SUBHEADINGS = {{mustafa: new Set({json.dumps(headings, ensure_ascii=False)})}};
let current = 1;
let data = {{}};
let stored = 0;
function store() {{ stored += 1; }}
class FakeNode {{
  constructor(tag) {{
    this.tag = tag;
    this.children = [];
    this.listeners = {{}};
    this.attributes = {{}};
    this.className = '';
    this.classList = {{add: (name) => {{ this.className = (this.className + ' ' + name).trim(); }}}};
    this.hidden = false;
  }}
  append(child) {{ this.children.push(child); child.parent = this; }}
  replaceChildren() {{ this.children = []; }}
  addEventListener(name, callback) {{ this.listeners[name] = callback; }}
  setAttribute(name, value) {{ this.attributes[name] = value; }}
  focus() {{}}
  scrollIntoView() {{}}
}}
const root = new FakeNode('div');
global.document = {{getElementById: () => root, createElement: (tag) => new FakeNode(tag)}};
{reader_function}
renderBookText(['Martı Jonathan Livingston', 'marti']);
const walk = (node) => [node, ...node.children.flatMap(walk)];
const nodes = walk(root);
const stops = nodes.filter((node) => node.className === 'reading-pause');
const segments = nodes.filter((node) => node.className === 'reading-segment');
if (stops.length !== 2 || segments.length !== 2) throw new Error('Expected two numbered Jonathan pause cards and two continuation segments');
const labels = stops.map((stop) => stop.children[0].textContent);
if (labels[0] !== '⏸ DURAK 1 · TAHMİN ET' || labels[1] !== '⏸ DURAK 2 · TAHMİN ET') throw new Error('The two pause cards are not numbered in source order');
if (!segments[0].hidden || !segments[1].hidden) throw new Error('The story continuation should remain gated until a prediction is saved');
const answer = stops[0].children.find((node) => node.tag === 'textarea');
const button = stops[0].children.find((node) => node.tag === 'button');
const guess = 'Jonathan ailesine uçmayı neden sevdiğini anlatacak.';
answer.value = guess;
answer.listeners.input();
button.listeners.click();
if (data[1].readingPredictions.marti['1'] !== guess) throw new Error('The learner prediction was not saved');
if (data[1].readingStops.marti['1'] !== true || segments[0].hidden) throw new Error('Saving the first prediction did not reveal the next story section');
if (!segments[1].hidden) throw new Error('The second stop should still require its own prediction');
const answer2 = stops[1].children.find((node) => node.tag === 'textarea');
const button2 = stops[1].children.find((node) => node.tag === 'button');
answer2.value = 'Uçuş denemesi başarıyla sonuçlanacak.';
answer2.listeners.input();
button2.listeners.click();
if (data[1].readingStops.marti['2'] !== true || segments[1].hidden) throw new Error('Saving the second prediction did not reveal the final story section');
renderBookText(['Martı Jonathan Livingston', 'marti']);
const restoredNodes = walk(root);
const restoredSegments = restoredNodes.filter((node) => node.className === 'reading-segment');
const restoredAnswers = restoredNodes.filter((node) => node.tag === 'textarea');
if (restoredSegments.some((segment) => segment.hidden) || restoredAnswers[0].value !== guess || restoredAnswers[1].value !== answer2.value) throw new Error('Saved predictions or revealed story sections were not restored');
if (stored < 4) throw new Error('Reader progress was not persisted');
console.log('Structured story reader and prediction stops passed.');
"""
    return harness


def main() -> int:
    errors = []
    if not HTML_FILE.is_file():
        print("Missing index.html", file=sys.stderr)
        return 1
    if not (ROOT / ".nojekyll").is_file():
        errors.append("Missing .nojekyll for GitHub Pages")

    html = HTML_FILE.read_text(encoding="utf-8")
    obsolete_practice_page = ROOT / "theme1-practice.html"
    if obsolete_practice_page.exists():
        errors.append("The separate Theme 1 practice page must be removed; the flow belongs in index.html")
    parser = SiteParser()
    parser.feed(html)
    if 'id="textGame"' in html or "TEXT_GAMES" in html or "renderTextGame" in html:
        errors.append("The old game card/runtime is still referenced from index.html")
    if "<details class=\"practice-activity\"" in html or "data-practice-id" in html:
        errors.append("Inline collapsible Theme 1 activity cards are still present")
    if "theme1-practice.html" in html:
        errors.append("The main reader still links to the separate Theme 1 practice page")
    for marker in (
        'id="weekSelectionPrompt"', 'id="weekContent"', 'id="readerLayout"',
        'id="backToWeeks"', 'id="theme1Practice"', 'id="step-track"',
        'id="activity-stage"', 'id="previous-step"', 'id="next-step"',
        'theme1-practice-forms.js', 'theme1-practice-app.js', 'theme1-practice.css',
    ):
        if marker not in html:
            errors.append(f"The reader is missing integrated/focused-week markup: {marker}")
    if "function selectReadingWeek" not in html or "function focusSelectedWeek" not in html or "window.setTimeout(focusSelectedWeek,0)" not in html or "week-focused" not in html or "renderTheme1PracticeFlow" not in html:
        errors.append("The focused-week selection, return, or embedded package flow is not wired")
    if "practice.scrollIntoView" not in html or 'id="theme1PracticeTitle" tabindex="-1"' not in html:
        errors.append("Selecting a Theme 1 week does not focus and reveal its first practice package")
    for asset in ("theme1-practice.css?v=", "theme1-practice.js?v=", "theme1-practice-forms.js?v=", "theme1-practice-app.js?v="):
        if asset not in html:
            errors.append(f"Theme 1 assets need a cache-busting version after the page redesign: {asset}")
    app_js = (ROOT / "theme1-practice-app.js").read_text(encoding="utf-8") if (ROOT / "theme1-practice-app.js").is_file() else ""
    practice_css = (ROOT / "theme1-practice.css").read_text(encoding="utf-8") if (ROOT / "theme1-practice.css").is_file() else ""
    if "data-question-tone" in app_js or "data-question-tone" in practice_css:
        errors.append("Question cards must not cycle through unrelated colors by question number")
    for state in ("correct", "partial", "incomplete", "wrong", "unverified"):
        if f'data-check-state="{state}"' not in practice_css or f'data-state="{state}"' not in practice_css:
            errors.append(f"AI assessment needs matching card and feedback colors for {state}")
    video_analysis_path = ROOT / "docs/video-analysis/hayat-buyuk-bir-okuldur-gemini-analysis.txt"
    if not video_analysis_path.is_file():
        errors.append("Missing Gemini video analysis text used by the Hayat Büyük Bir Okuldur checks")
    else:
        video_analysis = video_analysis_path.read_text(encoding="utf-8")
        if len(video_analysis) < 3000 or not all(section in video_analysis for section in ("1. VİDEONUN KONUSU", "2. SAHNE SAHNE AKIŞ", "5. KONUŞMA VE SES", "6. VİDEONUN ANLATMAK İSTEDİĞİ", "7. KANITLAR VE BELİRSİZLİKLER")):
            errors.append("Gemini video analysis text is incomplete or missing its transcript/visual analysis sections")
    practice_data = (ROOT / "theme1-practice.js").read_text(encoding="utf-8") if (ROOT / "theme1-practice.js").is_file() else ""
    expected_video_notes = 'sourceNotesUrl: "docs/video-analysis/hayat-buyuk-bir-okuldur-gemini-analysis.txt"'
    if practice_data.count(expected_video_notes) != 2 or 'id: "marti-a08"' not in practice_data or 'id: "marti-a09"' not in practice_data:
        errors.append("The Gemini source notes must be attached to both Hayat Büyük Bir Okuldur QR activities")
    for required_prompt in (
        "7. sınıf Türkçe", "Tema 1 · Hayat Boyu Gelişim", "Maarif/MEB",
        "sourceContext", "sourceLinkMarkup", "sourceUrl", "sourceTranscript", "sourceNotesUrl", "loadSourceNotes", "hasVideoAnalysis", "videoUnavailable",
        "kullanıcı tarafından sağlanan Gemini analiz raporu", "bağlantıyı açıp izleyemez", "doğru ya da yanlış olarak sınıflandırma",
        "data-check-question", "data-sort-target", "aria-keyshortcuts",
        "yanlış, ilgisiz veya eksik", "Harika", "DURUM: TAM DOĞRU",
        "hata/eksik yoksa hiçbir ipucu verme", "assessmentStateFromText", "data-result-pill",
    ):
        if required_prompt not in app_js:
            errors.append(f"Groq evaluation context or strict per-question checking is missing: {required_prompt}")
    for tag, attr, value in parser.local_refs:
        parts = urlsplit(value)
        if parts.scheme or parts.netloc or value.startswith(("#", "data:")):
            continue
        path = unquote(parts.path)
        if not path:
            continue
        if path.startswith("/"):
            errors.append(f"Use a relative path for GitHub Pages: <{tag} {attr}=\"{value}\">")
            continue
        if not (ROOT / path).is_file():
            errors.append(f"Missing local asset referenced by index.html: {value}")

    node = shutil.which("node")
    if not node:
        errors.append("Node.js is required to check JavaScript syntax and week grouping")
    else:
        js_files = []
        for relative in ("book-texts.js", "theme1-practice.js", "theme1-practice-forms.js", "theme1-practice-app.js"):
            asset = ROOT / relative
            if not asset.is_file():
                errors.append(f"Missing JavaScript asset: {relative}")
            else:
                js_files.append((asset, asset.read_text(encoding="utf-8")))
        if not parser.inline_scripts:
            errors.append("No inline application script found in index.html")
        for index, script in enumerate(parser.inline_scripts, start=1):
            js_files.append((None, script))

        for source_path, source in js_files:
            if source_path is not None:
                result = subprocess.run(
                    [node, "--check", str(source_path)],
                    capture_output=True,
                    text=True,
                    check=False,
                )
            else:
                with tempfile.NamedTemporaryFile(
                    mode="w", encoding="utf-8", suffix=".js"
                ) as temp:
                    temp.write(source)
                    temp.flush()
                    result = subprocess.run(
                        [node, "--check", temp.name],
                        capture_output=True,
                        text=True,
                        check=False,
                    )
            if result.returncode:
                label = str(source_path.relative_to(ROOT)) if source_path else f"index.html inline script {index}"
                errors.append(f"JavaScript syntax error in {label}:\n{result.stderr.strip()}")

        if not errors:
            try:
                test_source = grouping_test_source(html)
            except ValueError as exc:
                errors.append(str(exc))
            else:
                with tempfile.NamedTemporaryFile(
                    mode="w", encoding="utf-8", suffix=".js"
                ) as temp:
                    temp.write(test_source)
                    temp.flush()
                    result = subprocess.run(
                        [node, temp.name],
                        capture_output=True,
                        text=True,
                        check=False,
                    )
                if result.returncode:
                    errors.append(f"Week grouping/theme navigation test failed:\n{result.stderr.strip()}")
                elif "Week grouping and saved-progress migration passed." not in result.stdout:
                    errors.append("Week grouping test did not report success")
                elif "Theme navigation renders Theme 1 with its grouped weeks." not in result.stdout:
                    errors.append("Theme navigation test did not report success")
                elif "Theme 1 practice inventory, typed forms, embedded package selection, and game-card removal passed." not in result.stdout:
                    errors.append("Theme 1 embedded practice test did not report success")

            if not errors:
                try:
                    focus_test = focus_week_test_source(html)
                except ValueError as exc:
                    errors.append(str(exc))
                else:
                    with tempfile.NamedTemporaryFile(
                        mode="w", encoding="utf-8", suffix=".js"
                    ) as temp:
                        temp.write(focus_test)
                        temp.flush()
                        result = subprocess.run(
                            [node, temp.name], capture_output=True, text=True, check=False
                        )
                    if result.returncode:
                        errors.append(f"Focused-week interaction test failed:\n{result.stderr.strip()}")
                    elif "Focused-week selection, return control, browser history, Theme 1 practice visibility, and keyboard focus passed." not in result.stdout:
                        errors.append("Focused-week interaction test did not report success")

            if not errors:
                try:
                    app_test = practice_app_test_source()
                except OSError as exc:
                    errors.append(f"Could not prepare the embedded practice test: {exc}")
                else:
                    with tempfile.NamedTemporaryFile(
                        mode="w", encoding="utf-8", suffix=".js"
                    ) as temp:
                        temp.write(app_test)
                        temp.flush()
                        result = subprocess.run(
                            [node, temp.name], capture_output=True, text=True, check=False
                        )
                    if result.returncode:
                        errors.append(f"Embedded practice runtime test failed:\n{result.stderr.strip()}")
                    else:
                        reports = re.findall(r"Unit (\d+) rendered (\d+) activities and (\d+) question checks", result.stdout)
                        if len(reports) != 3 or {int(unit) for unit, _, _ in reports} != {1, 3, 5}:
                            errors.append("Embedded practice runtime test did not render all three Theme 1 units")
                        elif sum(int(activities) for _, activities, _ in reports) != 43 or sum(int(checks) for _, _, checks in reports) < 43:
                            errors.append("Embedded practice runtime test did not cover all 43 activities and their question checks")

            if not errors:
                try:
                    sort_test = sort_interaction_test_source()
                except OSError as exc:
                    errors.append(f"Could not prepare the accessible sorting test: {exc}")
                else:
                    with tempfile.NamedTemporaryFile(
                        mode="w", encoding="utf-8", suffix=".js"
                    ) as temp:
                        temp.write(sort_test)
                        temp.flush()
                        result = subprocess.run(
                            [node, temp.name], capture_output=True, text=True, check=False
                        )
                    if result.returncode:
                        errors.append(f"Accessible sort interaction test failed:\n{result.stderr.strip()}")
                    elif "Accessible sort widget supports tap-to-place, keyboard placement, drag-and-drop, and returning cards." not in result.stdout:
                        errors.append("Accessible sort interaction test did not report success")

            if not errors:
                try:
                    prompt_test = groq_prompt_test_source()
                except OSError as exc:
                    errors.append(f"Could not prepare the Groq prompt test: {exc}")
                else:
                    with tempfile.NamedTemporaryFile(
                        mode="w", encoding="utf-8", suffix=".js"
                    ) as temp:
                        temp.write(prompt_test)
                        temp.flush()
                        result = subprocess.run(
                            [node, temp.name], capture_output=True, text=True, check=False
                        )
                    if result.returncode:
                        errors.append(f"Question-level Groq prompt test failed:\n{result.stderr.strip()}")
                    elif "Question-level Groq context, no-hint correct status, yellow partial status, and red wrong status passed." not in result.stdout:
                        errors.append("Groq prompt test did not report success")

            if not errors:
                try:
                    reader_test = text_reader_test_source(html)
                except ValueError as exc:
                    errors.append(str(exc))
                else:
                    with tempfile.NamedTemporaryFile(
                        mode="w", encoding="utf-8", suffix=".js"
                    ) as temp:
                        temp.write(reader_test)
                        temp.flush()
                        result = subprocess.run(
                            [node, temp.name],
                            capture_output=True,
                            text=True,
                            check=False,
                        )
                    if result.returncode:
                        errors.append(f"Story reader test failed:\n{result.stderr.strip()}")
                    elif "Structured story reader and prediction stops passed." not in result.stdout:
                        errors.append("Story reader test did not report success")

    if errors:
        print("Static site checks failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print("Static site checks passed: assets, focused-week navigation and return, saved-progress migration, embedded typed Theme 1 packages, accessible sorting, strict per-question Groq context, no game card, Bayrağımız credit, and the PDF reader are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
