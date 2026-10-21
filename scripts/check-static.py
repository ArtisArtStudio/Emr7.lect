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

# Uzay istasyonu ve teleskop illüstrasyonlarının raster sürümleri hazırlanana kadar
# eski SVG çizimleri geçici olarak kullanılır; rasterler bağlanınca bu değer 0 olur.
PENDING_RASTER_MIGRATIONS = 0
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
    renderer_end = html.find("\nfunction buildSafeQuizFeedback", renderer_start)
    escape_start = html.find("function escapeQuizFeedbackHTML(text){")
    escape_end = html.find("\n", escape_start)
    schedule_start = html.find("const EBA_STUDY_URL=")
    schedule_end = html.find("\nfunction render(){", schedule_start)
    if min(groups_start, groups_end, migration_start, migration_end, practice_renderer_start, practice_renderer_end, renderer_start, renderer_end, escape_start, escape_end, schedule_start, schedule_end) < 0:
        raise ValueError("Could not find the week-grouping, theme-practice, or study-schedule code to test")

    grouping = html[groups_start:groups_end]
    migration = html[migration_start:migration_end]
    practice_data = (ROOT / "theme1-practice.js").read_text(encoding="utf-8")
    practice_forms = (ROOT / "theme1-practice-forms.js").read_text(encoding="utf-8")
    practice_renderer = html[practice_renderer_start:practice_renderer_end]
    renderer = html[renderer_start:renderer_end]
    harness = r"""
const quizStub = Array.from({length: 5}, (_, index) => [`Soru ${index + 1}`, [], 0, '']);
const BOOK_QUIZZES = {
  marti: quizStub, gencligin: quizStub, adini: quizStub, hayir: quizStub
};
"""
    # The preceding grouping snippet declares weeks, specific, and groupTaskOrigins.
    harness += r"""
const expectedGroups = [[1,2],[3,4],[7,8],[12,13]];
const actualGroups = weeks.filter((w) => w[5].length > 1).map((w) => w[5]);
const equal = (a,b) => JSON.stringify(a) === JSON.stringify(b);
if (weeks.length !== 11) throw new Error(`Expected 11 study pages, got ${weeks.length}`);
if (!equal(actualGroups, expectedGroups)) throw new Error(`Unexpected merged groups: ${JSON.stringify(actualGroups)}`);
const themes = groupWeeksByTheme(weeks);
if (themes.length !== 3 || themes[0].number !== 1 || themes[0].name !== 'Hayat Boyu Gelişim') throw new Error('Theme navigation is missing its first theme or special sections');
if (!equal(themes[0].rows.map((w) => w[0]), [1,3,5]) || themes[0].weekCount !== 5) throw new Error('Theme 1 does not contain the three grouped study units from weeks 1–5');
if (THEME_NUMBER_BY_NAME.get('Bir Hilal Uğruna') !== 2 || themeDisplayName('Yıl sonu tekrar') !== 'Yıl sonu tekrar') throw new Error('Theme numbering includes a non-theme section or is out of order');
const byId = new Map(weeks.map((w) => [w[0], w]));
for (const [id, date] of [[1,'14–25 Eyl'],[3,'28 Eyl–9 Eki'],[5,'12–16 Eki'],[7,'26 Eki–6 Kas'],[12,'7–18 Ara'],[15,'28 Ara–1 Oca']]) {
  if (byId.get(id)?.[1] !== date) throw new Error(`Wrong combined date for week group ${id}: ${byId.get(id)?.[1]}`);
}
if (!byId.get(3)[3].includes('Sen Sor O Yanıtlasın')) throw new Error('The merged Gençliğin Kıymeti page lost its listening item');
if (specific[1].tasks.length !== 4 || specific[5].tasks.length !== 4) throw new Error('Merged task lists are not correct');

const oldProgress = {
  1: { done: [true,false,true,false], answers: {0:1}, aiAnswer: '', studySchedule: {1: {eba: true}} },
  2: { done: [false,true,false,true], answers: {1:0}, aiAnswer: 'week 2 answer', studySchedule: {2: {tonguc: true}} },
  7: { done: [true,false,false,false], answers: {0:0}, phaserGame: {} },
  8: { done: [false,true,false,true], answers: {1:2,5:1}, extraQuiz: [['new question']], phaserGame: {gate:2} }
};
const migrated = mergeGroupedProgress(oldProgress);
if (!equal(migrated[1].done, [true,true,true,true])) throw new Error('Progress from weeks 1–2 was not combined');
if (migrated[1].answers[0] !== 1 || migrated[1].answers[1] !== 0) throw new Error('Quiz answers from weeks 1–2 were not preserved');
if (migrated[1].aiAnswer !== 'week 2 answer') throw new Error('A written answer from week 2 was lost');
if (!equal(migrated[1].studySchedule, {1:{eba:true},2:{tonguc:true}})) throw new Error('External platform checks from merged weeks were not preserved separately');
if (!equal(migrated[7].done, [true,false,false,false,false,true,false,true])) throw new Error('Progress from weeks 7–8 was not mapped to merged tasks');
if (!migrated[7].extraQuiz || migrated[7].answers[5] !== 1) throw new Error('Generated quiz data from week 8 was not preserved');
if (migrated[7].phaserGame.gate !== 2) throw new Error('Mini-game progress from week 8 was not preserved');
if ('2' in migrated || '4' in migrated || '8' in migrated || '13' in migrated) throw new Error('Obsolete duplicate-week progress keys remain');
if (mergeGroupedProgress(migrated) !== migrated) throw new Error('Week progress migration is not idempotent');
console.log('Week grouping and saved-progress migration passed.');
let current = 1;
let data = {};
let renderedPracticeUnit = null;
function store() {}
class ThemeNode {
  constructor(tag) { this.tag = tag; this.children = []; this.listeners = {}; this.attributes = {}; this.dataset = {}; this.className = ''; this.textContent = ''; this.open = false; this.hidden = false; this.innerHTML = ''; this.checked = false; this.classList = {toggle() {}}; }
  append(...children) { this.children.push(...children); }
  replaceChildren() { this.children = []; this.innerHTML = ''; }
  addEventListener(name, callback) { this.listeners[name] = callback; }
  setAttribute(name, value) { this.attributes[name] = value; }
  querySelectorAll() { return []; }
}
const themeRoot = new ThemeNode('div');
const themePracticeCard = new ThemeNode('section');
const scheduleRows = new ThemeNode('div');
const makeScheduleInput = (provider, weekId) => { const input = new ThemeNode('input'); input.dataset = {studyProvider: provider, scheduleWeek: String(weekId)}; return input; };
const ownScheduleInputs = [makeScheduleInput('our', 1), makeScheduleInput('our', 2)];
const externalScheduleInputs = ['eba','tonguc','mebi'].flatMap(provider => [makeScheduleInput(provider, 1), makeScheduleInput(provider, 2)]);
scheduleRows.querySelectorAll = (selector) => selector === 'input[data-study-provider="our"]' ? ownScheduleInputs : selector.includes(':not(') ? externalScheduleInputs : [];
window.renderTheme1PracticeFlow = (unitId) => { renderedPracticeUnit = Number(unitId); };
global.document = {
  getElementById: (id) => ({weeklist: themeRoot, theme1Practice: themePracticeCard, studyScheduleRows: scheduleRows}[id]),
  createElement: (tag) => new ThemeNode(tag)
};
renderList();
const sections = themeRoot.children;
if (sections.length !== 3 || sections[0].className !== 'theme-group' || !sections[0].open || sections[1].open) throw new Error('Theme navigation did not open only the active theme');
if (sections[0].children[0].children[0].textContent !== 'Tema 1 · Hayat Boyu Gelişim') throw new Error('Theme 1 label is missing from the navigation');
if (sections[0].children[0].children[1].textContent !== '3 çalışma · 5 hafta') throw new Error('Theme 1 study/week count is incorrect');
const theme1Buttons = sections[0].children[1].children;
if (!equal(theme1Buttons.map((button) => button.children[0].textContent), ['1–2','3–4','5'])) throw new Error('Theme 1 weeks are not ordered and grouped correctly');
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

const studyGroup = weeks.find((week) => week[0] === 1);
renderStudySchedule(studyGroup);
const initialScheduleMarkup = scheduleRows.innerHTML;
if ((initialScheduleMarkup.match(/class="schedule-week"/g) || []).length !== 2) throw new Error('The merged 1–2 week study page must render two independent weekly trackers');
for (const required of ['1. HAFTA · 14–18 Eyl 2026–2027','2. HAFTA · 21–25 Eyl 2026–2027','Tahmin, motivasyon, çalışkanlık ve söz varlığı','Metni anlama, kahramanın hedefi ve çaba','Bizim etkinlikler','EBA','Tonguç','MEBİ',EBA_STUDY_URL.replace(/&/g,'&amp;'),MEBI_STUDY_URL]) {
  if (!initialScheduleMarkup.includes(required)) throw new Error(`The study schedule is missing a required week, topic, provider, or link: ${required}`);
}
const youtubeLinks = [...initialScheduleMarkup.matchAll(/href="(https:\/\/www\.youtube\.com\/results\?search_query=[^"]+)"/g)].map((match) => new URL(match[1]));
if (youtubeLinks.length !== 2 || !youtubeLinks[0].searchParams.get('search_query').includes('Tonguç 7. sınıf Türkçe Tahmin, motivasyon') || !youtubeLinks[1].searchParams.get('search_query').includes('Tonguç 7. sınıf Türkçe Metni anlama')) throw new Error('Tonguç links must search YouTube with the matching week topic');
if (!/data-study-provider="our"[^>]*disabled/.test(initialScheduleMarkup) || /data-study-provider="eba"[^>]*disabled/.test(initialScheduleMarkup)) throw new Error('Our work must be read-only/automatic while external provider checkboxes remain manual');
if (isOurStudyScheduleComplete(1, 1) || isOurStudyScheduleComplete(1, 2)) throw new Error('Our activity tracker was completed before the learner finished the in-app work');
const ebaWeek1 = externalScheduleInputs.find((input) => input.dataset.studyProvider === 'eba' && input.dataset.scheduleWeek === '1');
const tongucWeek2 = externalScheduleInputs.find((input) => input.dataset.studyProvider === 'tonguc' && input.dataset.scheduleWeek === '2');
ebaWeek1.checked = true; ebaWeek1.listeners.change();
tongucWeek2.checked = true; tongucWeek2.listeners.change();
if (!data[1].studySchedule['1'].eba || !data[1].studySchedule['2'].tonguc || data[1].studySchedule['2'].eba) throw new Error('External provider checks are not persisted separately for each week');
const unit1 = window.THEME1_PRACTICE.units.find((unit) => Number(unit.weekId) === 1);
const feedback = {};
for (const activity of unit1.groups.flatMap((group) => group.activities)) {
  for (const question of window.THEME1_FORMS[activity.id]) feedback[`${activity.id}::${question.id}`] = {state: 'correct', text: 'DURUM: TAM DOĞRU'};
}
const allQuizAnswers = Object.fromEntries(studyQuizItems(1).map((_, index) => [index, 0]));
data[1] = {...data[1], done: Array(specific[1].tasks.length).fill(true), answers: allQuizAnswers, theme1PracticeFlow: {feedback}};
if (!isOurStudyScheduleComplete(1, 1) || !isOurStudyScheduleComplete(1, 2)) throw new Error('The automatic tracker did not recognize completed mini-plan, quiz, and Theme 1 practice progress');
renderStudySchedule(studyGroup);
if (!ownScheduleInputs.every((input) => input.checked)) throw new Error('Completed in-app activities did not auto-check the corresponding weekly rows');
const firstQuestion = window.THEME1_FORMS[unit1.groups[0].activities[0].id][0];
feedback[`${unit1.groups[0].activities[0].id}::${firstQuestion.id}`].state = 'partial';
if (isOurStudyScheduleComplete(1, 1) || !isOurStudyScheduleComplete(1, 2)) throw new Error('Automatic completion must follow the practice unit belonging to each week');
renderStudySchedule(studyGroup);
if (ownScheduleInputs[0].checked || !ownScheduleInputs[1].checked) throw new Error('The automatic checkbox did not refresh independently for each week');
if (!data[1].studySchedule['1'].eba || !data[1].studySchedule['2'].tonguc) throw new Error('Re-rendering the weekly chart lost separate external-platform progress');
console.log('Per-week study schedules, YouTube topic links, manual platform checks, and automatic in-app completion passed.');
"""
    escape_function = html[escape_start:escape_end]
    schedule_code = html[schedule_start:schedule_end]
    return "global.window = {};\n" + grouping + "\n" + migration + "\n" + practice_data + "\n" + practice_forms + "\n" + practice_renderer + "\n" + escape_function + "\n" + schedule_code + "\n" + renderer + "\n" + harness



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
  getElementById(id) { return id === 'title' ? title : id === 'theme1Practice' ? practice : id === 'theme1PracticeTitle' ? practiceTitle : null; },
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
context.selectReadingWeek(99);
if (current !== 3 || !focusMode || pushes.length !== 1) throw new Error('An invalid week unexpectedly changed the reader state');
browserWindow.location.search = '?week=5';
listeners.popstate();
if (current !== 5 || !focusMode || practiceTitle.focusCount !== 2 || practice.scrollCount !== 2) throw new Error('Browser history did not restore focused-week mode and the selected package');
browserWindow.location.search = '';
listeners.popstate();
if (focusMode || activeWeek.focusCount !== 1 || renderCount !== 3) throw new Error('Browser history did not return to the week list while retaining the reader navigation');
context.selectReadingWeek(7);
if (current !== 7 || !focusMode || practiceTitle.focusCount !== 2 || title.focusCount !== 1 || scrollCount !== 1) throw new Error('A non-Theme 1 week did not retain its standard reader focus and scroll behavior');
console.log('Focused-week selection, persistent sidebar, browser history, Theme 1 practice visibility, and keyboard focus passed.');
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
  const foodPressureQuestion = viewpointQuestions.find((question) => question.id === 'problem');
  if (!foodPressureQuestion?.answerKey?.effect?.includes('avlanmaya') || !foodPressureQuestion.rubric.includes('doğru kabul et')) throw new Error('The Martı hardship evaluator must accept the text-supported hunger/food-search answer');
  const hayatTopicQuestion = context.window.THEME1_FORMS['marti-a08'].find((question) => question.id === 'topic');
  if (!hayatTopicQuestion?.answerKey?.mainIdea?.includes('Öğrenmenin yaşı yoktur') || !hayatTopicQuestion.rubric.includes('hayat çok zordur') || !hayatTopicQuestion.fields[0].label.includes('ana fikri')) throw new Error('The Hayat video question needs its correct main-idea label, answer key, and unrelated-answer rejection criterion');
  const keywordQuestion = context.window.THEME1_FORMS['marti-a08'].find((question) => question.id === 'keywords');
  if (!keywordQuestion || keywordQuestion.fields.map((field) => field.id).join(',') !== 'word-1,word-2,word-3,word-4,word-5' || !keywordQuestion.rubric.includes('birbirinden bağımsız değerlendir') || !keywordQuestion.sourceNotesSummary?.includes('kullanıcı tarafından sağlanan Gemini')) throw new Error('The five video keyword entries need independent grading and a compact, attributed source summary');
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
      if (html.includes('source-limit-note') || html.includes('Yapay zekâ sınırı')) throw new Error('The user-facing pre-video AI warning card should be removed');
    }}
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
    source_notes = {
        path.relative_to(ROOT).as_posix(): path.read_text(encoding="utf-8")
        for path in sorted((ROOT / "docs/video-analysis").iterdir())
        if path.is_file()
    }
    template = r"""
const vm = require('node:vm');
const sources = __SOURCES__;
const mockSourceNotes = __NOTES__;
const saved = {
  1: {theme1PracticeFlow: {
    stepIndex: 0,
    answers: {
      'marti-a03::evidence-1': {behaviors: ['Yiyecek aramak yerine uçuş hareketlerini tekrar tekrar denemesi', 'Hız ve süzülme üzerinde çalışıp becerisini geliştirmesi'], evidence: 'Jonathan tests a new way of turning.'},
      'marti-a05::problem': {challenge: 'Aç kalma ve yiyecek arama baskısı', effect: 'Ailesi yiyecek bulamamasından endişelenir; Jonathan başını itaatkâr biçimde eğer ve bir süre avlanmaya çalışır.'},
      'marti-a08::topic': {answer: 'Hayat çok zordur.'},
      'marti-a08::keywords': {
        'word-1': 'öğrenme — farklı alanlarda sürer',
        'word-2': 'yaş — her yaştan insan öğrenebilir',
        'word-3': 'okul — öğrenmenin bir alanı',
        'word-4': 'deneyim — yeni bilgiler kazandırır',
        'word-5': 'merak — öğrenmeye yöneltir'
      }
    },
    feedback: {'marti-a01::stop-1': {}, 'marti-a08::topic': {state: 'wrong', text: 'SECRET_LEGACY_ANSWER_9Z'}}
  }},
  3: {theme1PracticeFlow: {stepIndex: 3, answers: {'genclik-a04::visual-link': {photo: 'Sahil fotoğrafı.', video: 'Bir çocuk çöp topluyor.', link: 'İkisi de doğayı korumayı anlatıyor.'}}, feedback: {}}},
  5: {theme1PracticeFlow: {stepIndex: 2, answers: {'adiny-a03::compare-1': {kaoru: 'Kaoru teleskop yaptı.', athlete: 'Sporcu okçulukta çalıştı.', comparison: 'İkisi de emek verdi.'}, 'adiny-a05::note-1': {answer: 'Semerkant'}}, feedback: {}}}
};
const storage = new Map([
  ['turkceRota2026', JSON.stringify(saved)],
  ['turkceGroqKey2026', 'unit-test-key']
]);
const elements = new Map();
let capturedRequest = null;
let mockRateLimitOnce = false;
let rateLimitResponseCount = 0;
let mockJSONValidationOnce = false;
let jsonValidationResponseCount = 0;
let mockResponseQueue = null;
const sentGroqBodies = [];
const responseFor = (status, issues, hint, fields, extra = {}) => JSON.stringify({status, issues, hint, fields, ...extra});
let mockResponse = responseFor('correct', [], 'recheck', [
  {id: 'behaviors', status: 'correct', issue: 'none', hint: 'recheck'},
  {id: 'evidence', status: 'correct', issue: 'none', hint: 'recheck'}
], {leakedAnswer: 'SECRET_MODEL_ANSWER_7Q'});
const element = (id) => {
  if (!elements.has(id)) {
    const item = {
      id, innerHTML: '', textContent: '', dataset: {}, value: '', checked: false,
      disabled: false, hidden: false, attributes: {}, listeners: {}, style: {},
      setAttribute(name, value) { this.attributes[name] = value; },
      addEventListener(name, callback) { this.listeners[name] = callback; },
      getBoundingClientRect() { return {top: 0}; }
    };
    item.querySelectorAll = (selector) => {
      if (id === 'activity-stage' && selector === '[data-check-question]') {
        const matches = [...item.innerHTML.matchAll(/data-check-question="([^"]+)"/g)];
        item.checkButtons = matches.map((match) => {
          const feedback = {dataset: {}, hidden: true, textContent: ''};
          const pill = {dataset: {}, hidden: true, textContent: ''};
          const card = {dataset: {}, querySelector: (name) => name === '.feedback-box' ? feedback : name === '[data-result-pill]' ? pill : null};
          return {dataset: {checkQuestion: match[1]}, disabled: false, textContent: '', listeners: {}, closest: () => card, addEventListener(name, callback) { this.listeners[name] = callback; }, card, feedback, pill};
        });
        return item.checkButtons;
      }
      return [];
    };
    elements.set(id, item);
  }
  return elements.get(id);
};
const loadedNotes = [];
const animationCallbacks = [];
const confettiStats = {canvases: [], currentFrameRects: 0};
const canvasContext = {
  setTransform() {}, clearRect() {}, save() {}, translate() {}, rotate() {}, restore() {},
  fillRect() { confettiStats.currentFrameRects += 1; }
};
const browserWindow = {
  location: {href: 'https://example.github.io/Emr7.lect/?unit=1', search: '?unit=1'},
  scrollY: 0, innerWidth: 800, innerHeight: 600, devicePixelRatio: 1,
  scrollTo() {}, setTimeout(callback, delay) { if (typeof callback === 'function' && delay !== 1300) callback(); return 1; }, clearTimeout() {}, cancelAnimationFrame() {},
  requestAnimationFrame(callback) { animationCallbacks.push(callback); return animationCallbacks.length; }
};
const documentBody = {appendChild(canvas) { confettiStats.canvases.push(canvas); }};
const browserDocument = {
  title: '', body: documentBody, documentElement: {clientWidth: 800, clientHeight: 600}, getElementById: element,
  createElement(tag) {
    if (tag !== 'canvas') throw new Error(`Unexpected DOM element in test: ${tag}`);
    return {style: {}, width: 0, height: 0, setAttribute() {}, getContext() { return canvasContext; }, remove() { this.removed = true; }};
  }
};
function flushConfettiFrames() {
  const frameCounts = [];
  let elapsed = 0;
  let turns = 0;
  while (animationCallbacks.length && turns < 12) {
    const callback = animationCallbacks.shift();
    confettiStats.currentFrameRects = 0;
    callback(elapsed);
    frameCounts.push(confettiStats.currentFrameRects);
    elapsed += 800;
    turns += 1;
  }
  if (animationCallbacks.length) throw new Error('Confetti animation did not stop within the expected duration');
  return frameCounts;
}
const context = vm.createContext({
  window: browserWindow,
  document: browserDocument,
  localStorage: {getItem: (key) => storage.get(key) || null, setItem: (key, value) => storage.set(key, value), removeItem: (key) => storage.delete(key)},
  URL, URLSearchParams, Date, console,
  fetch: async (url, options = {}) => {
    if (!options.body) {
      const sourcePath = new URL(String(url)).pathname.split('/').slice(-3).join('/');
      const notes = mockSourceNotes[sourcePath];
      if (!notes) throw new Error(`No mock Gemini report for ${sourcePath}`);
      loadedNotes.push(sourcePath);
      return {ok: true, text: async () => notes};
    }
    const requestBody = JSON.parse(options.body);
    sentGroqBodies.push(requestBody);
    if (mockJSONValidationOnce) {
      mockJSONValidationOnce = false;
      jsonValidationResponseCount += 1;
      return {ok: false, status: 400, json: async () => ({error: {message: 'Failed to validate JSON. Please adjust your prompt. See failed_generation.'}})};
    }
    if (mockRateLimitOnce) {
      mockRateLimitOnce = false;
      rateLimitResponseCount += 1;
      return {
        ok: false, status: 429, headers: {get: () => null},
        json: async () => ({error: {message: 'Rate limit reached for tokens per minute (TPM). Please try again in 0.01s.'}})
      };
    }
    capturedRequest = {url, body: requestBody};
    const content = mockResponseQueue?.length ? mockResponseQueue.shift() : mockResponse;
    return {ok: true, json: async () => ({choices: [{message: {content}}]})};
  }
});
for (const source of sources) vm.runInContext(source, context);
element('apiKey').value = 'unit-test-key';
context.window.renderTheme1PracticeFlow(1);
const stage = element('activity-stage');
if (stage.innerHTML.includes('DURUM: SONUÇ SINIFLANDIRILAMADI')) throw new Error('Unchecked questions must not render a default unclassified-result card');
const next = () => element('next-step').listeners.click();
const advance = (count) => { for (let index = 0; index < count; index += 1) next(); };
const findButton = (key) => stage.checkButtons.find((item) => item.dataset.checkQuestion === key);
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));
async function check(button) {
  if (!button) throw new Error('Could not find the requested question check button');
  button.listeners.click();
  await tick();
  await tick();
}
async function run() {
  advance(2);
  const storyButton = findButton('marti-a03::evidence-1');
  await check(storyButton);
  if (!capturedRequest) throw new Error('Kontrol et did not send a Groq request');
  const system = capturedRequest.body.messages.find((message) => message.role === 'system').content;
  let prompt = capturedRequest.body.messages.find((message) => message.role === 'user').content;
  if (!system.includes('7. sınıf Türkçe') || !system.includes('Tema 1 · Hayat Boyu Gelişim') || !system.includes('Maarif/MEB')) throw new Error('Groq system message omitted grade, theme, or Maarif/MEB context');
  const strictPromptChecks = ['GİZLİ CEVAP KORUMASI', 'Yalnızca geçerli bir JSON nesnesi', 'status', 'Doğru cevabı', 'issues=[]'].map((phrase) => system.includes(phrase));
  if (strictPromptChecks.some((passed) => !passed)) throw new Error(`Groq prompt does not require a closed, non-disclosing JSON response: ${JSON.stringify(strictPromptChecks)}`);
  if (capturedRequest.body.response_format?.type !== 'json_object') throw new Error('Groq assessment request does not enforce JSON mode');
  if (capturedRequest.body.max_completion_tokens !== 320) throw new Error('Groq output-token budget is not scaled to the number of answer fields');
  if (!prompt.includes('Jonathan tests a new way of turning.') || !prompt.includes('Durgun denizin minik dalgacıkları')) throw new Error('Groq request omitted the student answer or relevant story source text');
  if (storyButton.card.dataset.checkState !== 'correct' || storyButton.pill.textContent !== '✓ Tam doğru') throw new Error('A fully correct AI result did not set the green status');
  if (!storyButton.feedback.textContent.includes('DURUM: TAM DOĞRU') || storyButton.feedback.textContent.includes('İPUCU') || storyButton.feedback.textContent.includes('SECRET_')) throw new Error('A fully correct response shows a hint or leaked model text');
  mockResponse = responseFor('partial', ['evidence'], 'connect', [
    {id: 'behaviors', status: 'correct', issue: 'none', hint: 'recheck'},
    {id: 'evidence', status: 'partial', issue: 'evidence', hint: 'connect'}
  ], {leakedAnswer: 'SECRET_PARTIAL_4F'});
  const previousRateLimitResponses = rateLimitResponseCount;
  mockRateLimitOnce = true;
  await check(storyButton);
  if (rateLimitResponseCount !== previousRateLimitResponses + 1) throw new Error('The Groq TPM response was not retried once after its suggested wait');
  if (storyButton.card.dataset.checkState !== 'partial' || storyButton.pill.textContent !== '◐ Kısmen doğru') throw new Error('A partially correct AI result did not set the yellow status');
  if (storyButton.feedback.textContent.includes('SECRET_') || !storyButton.feedback.textContent.includes("Jonathan'ın karar ve davranışlarının anlatıldığı bölüme dön") || !storyButton.feedback.textContent.includes('Seçtiğin ayrıntının sorudaki ölçütü nasıl karşıladığını kendin açıkla')) throw new Error('Text-based feedback did not provide a source-linked, non-answer-revealing hint or exposed model text');
  mockResponse = responseFor('wrong', ['relevance'], 'recheck', [
    {id: 'behaviors', status: 'wrong', issue: 'relevance', hint: 'recheck'},
    {id: 'evidence', status: 'wrong', issue: 'accuracy', hint: 'reread'}
  ], {fullAnswer: 'SECRET_WRONG_5Q'});
  await check(storyButton);
  if (storyButton.card.dataset.checkState !== 'wrong' || storyButton.pill.textContent !== '✕ Yanlış') throw new Error('A wrong AI result did not set the red status');
  if (storyButton.feedback.textContent.includes('SECRET_')) throw new Error('A wrong response exposed an extra model answer field');

  advance(2);
  mockResponse = responseFor('correct', [], 'recheck', [
    {id: 'challenge', status: 'correct', issue: 'none', hint: 'recheck'},
    {id: 'effect', status: 'correct', issue: 'none', hint: 'recheck'}
  ], {leakedAnswer: 'SECRET_FOOD_6T'});
  const foodButton = findButton('marti-a05::problem');
  await check(foodButton);
  prompt = capturedRequest.body.messages.find((message) => message.role === 'user').content;
  if (!prompt.includes('Aç kalma ve yiyecek arama baskısı') || !prompt.includes('Jonathan başını itaatkâr biçimde eğer') || !prompt.includes('doğru kabul et')) throw new Error('The Martı hunger/food-search evidence and fair grading rule were omitted from the Groq prompt');
  if (foodButton.card.dataset.checkState !== 'correct' || foodButton.feedback.textContent.includes('SECRET_')) throw new Error('The text-supported Martı hardship answer was rejected or model text leaked');

  advance(3);
  if (stage.innerHTML.includes('SECRET_LEGACY_ANSWER_9Z')) throw new Error('Previously saved free-form AI feedback still exposes an answer after migration');
  if (!stage.innerHTML.includes('Videodaki farklı ortamlarda geçen iki sahneyi yan yana getir')) throw new Error('Previously saved video feedback did not upgrade to a contextual, non-disclosing hint when rendered');
  mockResponse = responseFor('wrong', ['relevance'], 'context', [
    {id: 'answer', status: 'wrong', issue: 'relevance', hint: 'context'}
  ], {answer: 'Öğrenmenin yaşı yoktur; insanlar farklı yaşlarda öğrenir.'});
  const hayatButton = findButton('marti-a08::topic');
  await check(hayatButton);
  const mediaSystem = capturedRequest.body.messages.find((message) => message.role === 'system').content;
  prompt = capturedRequest.body.messages.find((message) => message.role === 'user').content;
  if (!loadedNotes.includes('docs/video-analysis/hayat-buyuk-bir-okuldur-gemini-analysis.txt') || !prompt.includes('Hayat çok zordur') || !prompt.includes('Öğrenmenin yaşı yoktur')) throw new Error('The Hayat video notes, student response, or private main-idea key were omitted from the Groq prompt');
  if (!mediaSystem.includes('MEDYA KAYNAĞI (iç değerlendirme)') || !mediaSystem.includes('bağımsız medya doğrulaması')) throw new Error('Groq was not told the user-provided video report is not independent verification');
  if (hayatButton.card.dataset.checkState !== 'wrong' || hayatButton.feedback.textContent.includes('Öğrenmenin yaşı yoktur') || hayatButton.feedback.textContent.includes('SECRET_')) throw new Error('The wrong Hayat answer received feedback that leaked the correct main idea');
  if (hayatButton.feedback.textContent.includes('ALAN ALAN') || hayatButton.feedback.textContent.includes('Videonun ana fikri:') || hayatButton.feedback.textContent.includes('Kelimenin geçtiği cümleyi')) throw new Error('A single video answer was split into a field list or received an unrelated context hint');
  if (!hayatButton.feedback.textContent.includes('Videodaki farklı ortamlarda geçen iki sahneyi yan yana getir') || !hayatButton.feedback.textContent.includes('Ortak yönü kendin çıkar')) throw new Error('The incorrect video-topic answer did not receive a source-linked, non-answer-revealing hint');
  if (stage.innerHTML.includes('source-limit-note') || stage.innerHTML.includes('Yapay zekâ sınırı')) throw new Error('The removed user-facing AI warning card still appears before a video activity');

  mockResponse = responseFor('partial', ['completeness', 'reasoning'], 'keyword', [
    {id: 'word-1', status: 'correct', issue: 'none', hint: 'recheck'},
    {id: 'word-2', status: 'wrong', issue: 'relevance', hint: 'keyword'},
    {id: 'word-3', status: 'incomplete', issue: 'completeness', hint: 'count'},
    {id: 'word-4', status: 'partial', issue: 'reasoning', hint: 'connect'},
    {id: 'word-5', status: 'correct', issue: 'none', hint: 'recheck'}
  ], {answer: 'SECRET_FIVE_KEYWORDS_2P'});
  const keywordsButton = findButton('marti-a08::keywords');
  const firstKeywordRequest = sentGroqBodies.length;
  const previousJSONValidationResponses = jsonValidationResponseCount;
  mockJSONValidationOnce = true;
  await check(keywordsButton);
  const keywordRequestAttempts = sentGroqBodies.slice(firstKeywordRequest);
  if (jsonValidationResponseCount !== previousJSONValidationResponses + 1 || keywordRequestAttempts.length !== 2 || keywordRequestAttempts[0].response_format?.type !== 'json_object' || keywordRequestAttempts[0].max_completion_tokens !== 590 || keywordRequestAttempts[1].response_format || keywordRequestAttempts[1].max_completion_tokens < 480) throw new Error('A Groq JSON-validation failure was not retried once with the safe fallback format and field-sized token budget');
  prompt = capturedRequest.body.messages.find((message) => message.role === 'user').content;
  if (!prompt.includes('kısa iç kullanım özeti') || !prompt.includes('satranç') || prompt.length > 5000) throw new Error('The five-keyword prompt did not use its compact, attributed Gemini source summary');
  const keywordFeedback = keywordsButton.feedback.textContent;
  if (!prompt.includes('alan kimliği: word-1') || !prompt.includes('alan kimliği: word-5')) throw new Error('The five keyword inputs were not identified separately in the assessment prompt');
  for (const marker of ['Anahtar kelime 1 ve ana düşünceyle bağı: TAM DOĞRU', 'Anahtar kelime 2 ve ana düşünceyle bağı: YANLIŞ', 'Anahtar kelime 3 ve ana düşünceyle bağı: EKSİK', 'Anahtar kelime 4 ve ana düşünceyle bağı: KISMEN DOĞRU', 'Anahtar kelime 5 ve ana düşünceyle bağı: TAM DOĞRU']) if (!keywordFeedback.includes(marker)) throw new Error(`Per-field video keyword feedback is missing ${marker}`);
  if (!keywordFeedback.includes('YANIT BÖLÜMLERİ:') || keywordFeedback.includes('ALAN ALAN')) throw new Error('Multi-answer feedback uses a confusing field-by-field heading');
  if (keywordsButton.card.dataset.checkState !== 'partial' || keywordFeedback.includes('SECRET_FIVE_KEYWORDS_2P') || !keywordFeedback.includes('Raporda birbirinden farklı etkinlik örnekleri var') || !keywordFeedback.includes('kelimeyle ortak düşünce arasındaki bağı kendin açıkla') || keywordFeedback.includes('satranç') || keywordFeedback.includes('Öğrenmenin yaşı yoktur')) throw new Error('Per-field keyword feedback lacks source-specific, non-answer-revealing hints or exposed free model text');
  const firstThreeFieldsOnly = responseFor('partial', ['relevance'], 'keyword', [
    {id: 'word-1', status: 'partial', issue: 'relevance', hint: 'keyword'},
    {id: 'word-2', status: 'partial', issue: 'relevance', hint: 'keyword'},
    {id: 'word-3', status: 'partial', issue: 'relevance', hint: 'keyword'}
  ]);
  const missingFieldRetryStart = sentGroqBodies.length;
  mockResponseQueue = [firstThreeFieldsOnly, responseFor('partial', ['accuracy'], 'keyword', [
    {id: 'word-4', status: 'wrong', issue: 'relevance', hint: 'keyword'},
    {id: 'word-5', status: 'incomplete', issue: 'completeness', hint: 'count'}
  ])];
  await check(keywordsButton);
  const missingFieldRetryBodies = sentGroqBodies.slice(missingFieldRetryStart);
  const rescuedKeywordFeedback = keywordsButton.feedback.textContent;
  const missingFieldRetryPrompt = missingFieldRetryBodies[1]?.messages[1]?.content || '';
  if (missingFieldRetryBodies.length !== 2 || missingFieldRetryBodies[1].response_format || missingFieldRetryBodies[1].max_completion_tokens < 480 || !missingFieldRetryPrompt.includes('alan kimliği: word-4') || !missingFieldRetryPrompt.includes('alan kimliği: word-5') || missingFieldRetryPrompt.includes('alan kimliği: word-1') || missingFieldRetryPrompt.includes('alan kimliği: word-3')) throw new Error('The app did not retry only the missing keyword fields with a sufficiently sized output budget');
  if (!rescuedKeywordFeedback.includes('Anahtar kelime 4 ve ana düşünceyle bağı: YANLIŞ') || !rescuedKeywordFeedback.includes('Anahtar kelime 5 ve ana düşünceyle bağı: EKSİK') || rescuedKeywordFeedback.includes('SONUÇ SINIFLANDIRILAMADI')) throw new Error('The targeted retry did not restore field-level results or preserve the partial overall state');
  mockResponseQueue = [firstThreeFieldsOnly, responseFor('partial', ['relevance'], 'keyword', [])];
  await check(keywordsButton);
  if (keywordsButton.card.dataset.checkState !== 'partial' || keywordsButton.feedback.textContent.includes('SONUÇ SINIFLANDIRILAMADI')) throw new Error('Unrated trailing fields incorrectly erased the overall partial result');
  mockResponse = responseFor('correct', [], 'recheck', [], {leakedAnswer: 'SECRET_UNRATED_8B'});
  await check(keywordsButton);
  if (keywordsButton.card.dataset.checkState !== 'unrated' || keywordsButton.feedback.textContent.includes('SECRET_UNRATED_8B') || keywordsButton.pill.textContent.includes('Tam doğru')) throw new Error('A response omitting the per-field results was incorrectly accepted as fully correct');
  mockResponse = responseFor('wrong', ['accuracy'], 'reread', ['word-1', 'word-2', 'word-3', 'word-4', 'word-5'].map((id) => ({id, status: 'correct', issue: 'none', hint: 'recheck'})));
  await check(keywordsButton);
  if (keywordsButton.card.dataset.checkState !== 'unrated' || keywordsButton.pill.textContent.includes('Tam doğru')) throw new Error('Conflicting overall and per-field assessments were incorrectly accepted');

  const progressRoot = context.window.turkceProgressData || {};
  progressRoot[3] = progressRoot[3] || {};
  progressRoot[3].theme1PracticeFlow = progressRoot[3].theme1PracticeFlow || {answers: {}, feedback: {}, stepIndex: 3};
  progressRoot[3].theme1PracticeFlow.feedback = progressRoot[3].theme1PracticeFlow.feedback || {};
  progressRoot[3].theme1PracticeFlow.feedback['genclik-a04::shared-message'] = {state: 'correct', text: 'DURUM: TAM DOĞRU'};
  progressRoot[3].theme1PracticeFlow.celebratedActivities = [];
  context.window.turkceProgressData = progressRoot;
  context.window.renderTheme1PracticeFlow(3);
  mockResponse = responseFor('correct', [], 'recheck', [
    {id: 'photo', status: 'correct', issue: 'none', hint: 'recheck'},
    {id: 'video', status: 'correct', issue: 'none', hint: 'recheck'},
    {id: 'link', status: 'correct', issue: 'none', hint: 'recheck'}
  ]);
  const kindnessButton = findButton('genclik-a04::visual-link');
  await check(kindnessButton);
  const kindnessSystem = capturedRequest.body.messages.find((message) => message.role === 'system').content;
  const kindnessPrompt = capturedRequest.body.messages.find((message) => message.role === 'user').content;
  if (!loadedNotes.includes('docs/video-analysis/bir-iyilik-hikayesi-gemini-analysis.md') || !kindnessPrompt.includes('933 yuvalama sahası')) throw new Error('Bir İyilik Hikâyesi Gemini notes were not loaded into the Groq prompt');
  if (!kindnessSystem.includes('MEDYA KAYNAĞI (iç değerlendirme)') || !kindnessSystem.includes('bağımsız medya doğrulaması')) throw new Error('The internal media source-limit instruction is missing');
  if (!context.window.turkceProgressData[3].theme1PracticeFlow.celebratedActivities.includes('genclik-a04')) throw new Error('A fully correct activity did not record its one-time celebration');
  const activityConfettiFrames = flushConfettiFrames();
  if (confettiStats.canvases.length !== 1 || activityConfettiFrames[0] !== 72 || !confettiStats.canvases[0].removed) throw new Error('A completed activity did not display and clean up the smaller confetti animation');

  context.window.renderTheme1PracticeFlow(5);
  mockResponse = responseFor('correct', [], 'recheck', [
    {id: 'kaoru', status: 'correct', issue: 'none', hint: 'recheck'},
    {id: 'athlete', status: 'correct', issue: 'none', hint: 'recheck'},
    {id: 'comparison', status: 'correct', issue: 'none', hint: 'recheck'}
  ]);
  const compareButton = findButton('adiny-a03::compare-1');
  await check(compareButton);
  const comparisonPrompt = capturedRequest.body.messages.find((message) => message.role === 'user').content;
  if (!loadedNotes.includes('docs/video-analysis/yigit-caner-aydin-gemini-analysis.md') || !comparisonPrompt.includes('Bentenjima') || !comparisonPrompt.includes('2013 yılında üniversite öğrencisiyken')) throw new Error('The Kaoru story and user-provided Yiğit Caner Aydın report were not both sent as source context');
  advance(2);
  const listeningButton = findButton('adiny-a05::note-1');
  mockResponse = responseFor('unverified', ['source'], 'recheck', [
    {id: 'answer', status: 'unverified', issue: 'source', hint: 'recheck'}
  ]);
  await check(listeningButton);
  const listeningPrompt = capturedRequest.body.messages.find((message) => message.role === 'user').content;
  if (!loadedNotes.includes('docs/video-analysis/ali-kuscu-gemini-analysis.md') || !listeningPrompt.includes('Semerkant') || !listeningPrompt.includes('Kullanıcı tarafından sağlanan Gemini dinleme kaydı analiz raporu')) throw new Error('Ali Kuşçu audio analysis was not loaded or labeled as user-provided listening context');

  const completeProgress = context.window.turkceProgressData || {};
  for (const unit of context.window.THEME1_PRACTICE.units) {
    completeProgress[unit.weekId] = completeProgress[unit.weekId] || {};
    const flow = completeProgress[unit.weekId].theme1PracticeFlow || {answers: {}, feedback: {}, stepIndex: 0};
    flow.answers = flow.answers || {};
    flow.feedback = {};
    flow.themeCelebrated = false;
    const activitiesInUnit = unit.groups.flatMap((group) => group.activities || []);
    for (const activity of activitiesInUnit) {
      const configured = context.window.THEME1_FORMS[activity.id];
      const prompts = activity.prompts?.length ? activity.prompts : [activity.instruction || activity.title];
      const questions = Array.isArray(configured) && configured.length ? configured : prompts.map((prompt, index) => ({id: `response-${index + 1}`}));
      for (const question of questions) flow.feedback[`${activity.id}::${question.id}`] = {state: 'correct', text: 'DURUM: TAM DOĞRU'};
    }
    flow.stepIndex = 0;
    completeProgress[unit.weekId].theme1PracticeFlow = flow;
  }
  context.window.turkceProgressData = completeProgress;
  const finalUnit = context.window.THEME1_PRACTICE.units.at(-1);
  const finalActivityCount = finalUnit.groups.flatMap((group) => group.activities || []).length;
  context.window.renderTheme1PracticeFlow(finalUnit.weekId);
  for (let index = 1; index < finalActivityCount; index += 1) next();
  next();
  const finalFlow = completeProgress[finalUnit.weekId].theme1PracticeFlow;
  const finalConfettiFrames = flushConfettiFrames();
  if (!finalFlow.themeCelebrated || !element('theme1PracticeSaved').textContent.includes('Tema 1’deki bütün çalışma birimlerini')) throw new Error('The final Theme 1 celebration did not require and record complete theme progress');
  if (confettiStats.canvases.length !== 2 || finalConfettiFrames[0] !== 220 || !confettiStats.canvases[1].removed) throw new Error('The final Theme 1 completion did not show the larger confetti animation');
  console.log('Question and field states, targeted safe hints, one-time TPM retry, JSON-validation fallback, activity and full-theme confetti celebrations, no hint on correct answers, fair Martı evidence, media-source attribution, and hidden warning-card removal passed.');
}
run().catch((error) => { console.error(error.stack || error); process.exitCode = 1; });
"""
    return template.replace("__SOURCES__", json.dumps(sources, ensure_ascii=False)).replace(
        "__NOTES__", json.dumps(source_notes, ensure_ascii=False)
    )

def quiz_feedback_test_source(html: str) -> str:
    start = html.find("function buildSafeQuizFeedback(")
    end = html.find("function render(){", start)
    if start < 0 or end < 0:
        raise ValueError("The safe end-of-week quiz feedback formatter is missing")
    helper_source = html[start:end]
    template = r"""
const vm = require('node:vm');
const context = vm.createContext({console});
const helpers = __HELPERS__;
const checks = `
  const wrong = buildSafeQuizFeedback(0, 3, {issues: ['accuracy', 'SECRET_ISSUE'], hint: 'reread', answer: 'SECRET_ANSWER'});
  if (!wrong.includes('DURUM: YANLIŞ · 0/3') || wrong.includes('SECRET_')) throw new Error('Wrong quiz feedback leaked free model text or lost the local score');
  const partial = buildSafeQuizFeedback(2, 3, {issues: ['evidence'], hint: 'compare', correctAnswer: 'LEAKED_ANSWER'});
  if (!partial.includes('DURUM: KISMEN DOĞRU') || !partial.includes('İPUCU:') || partial.includes('LEAKED_ANSWER')) throw new Error('Partial quiz feedback was not safely rendered');
  const correct = buildSafeQuizFeedback(3, 3, {issues: ['evidence'], hint: 'evidence', answer: 'SECRET_ANSWER'});
  if (!correct.includes('DURUM: TAM DOĞRU') || correct.includes('İPUCU') || correct.includes('SECRET_')) throw new Error('A fully correct quiz result should have no hint or model prose');
  if (escapeQuizFeedbackHTML('<script>unsafe</script>').includes('<script>')) throw new Error('Saved quiz feedback is not escaped before insertion into HTML');
  console.log('End-of-week quiz feedback is score-grounded and safe from free-text answer leaks.');
`;
vm.runInContext(helpers, context);
vm.runInContext(checks, context);
"""
    return template.replace("__HELPERS__", json.dumps(helper_source, ensure_ascii=False))


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
    if not re.search(r"#bookText\s*\{[^}]*font-size:\s*18px", html):
        raise ValueError("The reading text font was not increased to 18px")
    if "background:#fffdf6" not in html or "#bookText{font-size:18px;line-height:1.78;color:#111111}" not in html:
        raise ValueError("The reader needs a warm neutral background and high-contrast charcoal text")
    foreground = re.search(r"#bookText\s*\{[^}]*color:(#[0-9a-fA-F]{6})", html)
    reader_box = re.search(r'<div id="bookText"[^>]*style="([^"]+)"', html)
    background = re.search(r"background:(#[0-9a-fA-F]{6})", reader_box.group(1) if reader_box else "")
    def luminance(color: str) -> float:
        channels = [int(color[index:index + 2], 16) / 255 for index in (1, 3, 5)]
        linear = [channel / 12.92 if channel <= 0.04045 else ((channel + 0.055) / 1.055) ** 2.4 for channel in channels]
        return sum(weight * channel for weight, channel in zip((0.2126, 0.7152, 0.0722), linear))
    if not foreground or not background:
        raise ValueError("The reader text/background colors could not be measured")
    contrast = (luminance(background.group(1)) + 0.05) / (luminance(foreground.group(1)) + 0.05)
    if contrast < 7:
        raise ValueError(f"The reader's text contrast ratio is too low: {contrast:.2f}:1")
    if "#bookText{font-size:16px" in html:
        raise ValueError("The mobile reading text font is too small")

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
        'id="weekExamNotice"', 'id="weekExamDate"', 'id="apiSettings"', 'id="courseTools"',
        'id="theme1Practice"', 'id="step-track"',
        'id="activity-stage"', 'id="previous-step"', 'id="next-step"',
        'id="weeklyStudySchedule"', 'id="studyScheduleRows"',
        'id="socialWorkspace"', 'id="socialWeekList"', 'id="socialWeekContent"',
        'id="socialProgressBar"', 'social-studies-content.js', 'social-studies.js', 'social-studies.css',
        'theme1-practice-forms.js', 'theme1-practice-app.js', 'theme1-practice.css',
    ):
        if marker not in html:
            errors.append(f"The reader is missing integrated/focused-week markup: {marker}")
    if "function selectReadingWeek" not in html or "function focusSelectedWeek" not in html or "window.setTimeout(focusSelectedWeek,0)" not in html or "week-focused" not in html or "renderTheme1PracticeFlow" not in html:
        errors.append("The focused-week selection or embedded package flow is not wired")
    if 'id="backToWeeks"' in html or 'function returnToWeekSelection' in html:
        errors.append("Turkish still has an unnecessary return-to-week-selection control")
    if '#readerLayout.week-focused>.weeks{display:none}' in html or '#readerLayout.week-focused{grid-template-columns:minmax(250px,305px) minmax(0,1fr)}' not in html or '#readerLayout>.weeks{position:sticky;top:12px' not in html or '@media(max-width:800px){#readerLayout.week-focused{grid-template-columns:minmax(0,1fr)}' not in html:
        errors.append("The Turkish week navigation must stay visible and sticky on desktop, then stack on mobile")
    if html.count('https://mebi.eba.gov.tr/student/exam/midterm') != 1 or '<strong>Deneme Sınavları</strong>' not in html or 'aria-hidden="true">⚙</span>' not in html:
        errors.append("The shared MEBİ mock-exam link or gear-based AI settings panel is missing")
    if "const EXAM_DATES_BY_WEEK=Object.freeze({9:'10 Kasım 2026'});" not in html or "[9,'9–13 Kas'" not in html or '1. sınav (${examDate})' not in html or 'id="weekExamNotice"' not in html:
        errors.append("Turkish first-term exam notices must map to the user-provided date inside week nine only")
    if html.count('class="term-exam-plan"') != 3 or "4–8 Ocak 2027" not in html or "22 Ocak 2027’de bitiyor" not in html or ".term-exam-plan{" not in html:
        errors.append("All three courses must show the tentative second-exam window (two weeks before 22 January)")
    if html.index('id="apiSettings"') > html.index('<section class="hero">'):
        errors.append("Groq/ElevenLabs settings must live in the shared course-tools area, not the Turkish hero")
    if "practice.scrollIntoView" not in html or 'id="theme1PracticeTitle" tabindex="-1"' not in html:
        errors.append("Selecting a Theme 1 week does not focus and reveal its first practice package")
    for asset in ("theme1-practice.css?v=", "theme1-practice.js?v=", "theme1-practice-forms.js?v=", "theme1-practice-app.js?v=", "social-studies.css?v=", "social-studies-content.js?v=", "social-studies.js?v=", "science.css?v=", "science-content.js?v=", "science-term-notes.js?v=", "science.js?v=", "ai-grader.js?v="):
        if asset not in html:
            errors.append(f"Client assets need a cache-busting version: {asset}")
    grader_path = ROOT / "ai-grader.js"
    grader = grader_path.read_text(encoding="utf-8") if grader_path.is_file() else ""
    if not grader:
        errors.append("The shared AI feedback coach (ai-grader.js) is missing")
    else:
        for required in ("YOL GÖSTERİCİ", "YAZMAYA BAŞLA", "TEŞVİK", "GUIDE_CONTRACT", "COACH_RULES", "sanitizeGuidance", "composeCoachBlock", "lengthCoach"):
            if required not in grader:
                errors.append(f"The shared AI feedback coach is missing: {required}")
        if "window.EMR7_AI_GRADER" not in grader:
            errors.append("The shared AI feedback coach must expose itself as window.EMR7_AI_GRADER")
    if html.index("ai-grader.js?v=") > html.index("social-studies-content.js?v="):
        errors.append("ai-grader.js must load before the course scripts")
    for course_file, label in (("science.js", "Fen Bilimleri"), ("social-studies.js", "Sosyal Bilgiler"), ("theme1-practice-app.js", "Türkçe")):
        course_path = ROOT / course_file
        course_source = course_path.read_text(encoding="utf-8") if course_path.is_file() else ""
        if "window.EMR7_AI_GRADER" not in course_source and "GRADER =" not in course_source:
            errors.append(f"{label} must use the shared AI feedback coach")
        if "composeCoachBlock" not in course_source:
            errors.append(f"{label} must render the guided coaching block")
        if "GUIDE_CONTRACT" not in course_source:
            errors.append(f"{label} must request the guidance fields from the model")
    for required in ("function selectSubject(id)", "social.hidden=!isSocial", "window.SOCIAL_STUDIES?.render()", "science.hidden=!isScience", "window.SCIENCE?.render()", "socialStudies:window.SOCIAL_STUDIES?.exportProgress()", "science:window.SCIENCE?.exportProgress()", "window.SOCIAL_STUDIES?.importProgress(obj.socialStudies)", "window.SCIENCE?.importProgress(obj.science)", "function renderStudySchedule(week)", "renderStudySchedule(w)", "sourceWeeks.find(row=>Number(row[0])===Number(memberWeekId))", "Tonguç 7. sınıf Türkçe ${focus||topic}", "data[baseWeekId].studySchedule[id]", "const WEEK_GROUP_VERSION=2", "PLAN_VERSION=2", "turkcePlanVersion", ".eskiPlan", "EBA_STUDY_URL", "MEBI_STUDY_URL"):
        if required not in html:
            errors.append(f"Per-week study tracking or its saved-progress migration is missing: {required}")
    if "--ink:#102238" not in html or "--muted:#46576b" not in html:
        errors.append("The weekly reader text and muted text colors must use the darker contrast palette")
    if html.count('id="apiSettings"') != 1 or 'body[data-subject="fen"]' not in html or 'body[data-subject="sosyal"]' not in html:
        errors.append("Shared AI settings and the reusable per-course palette must be defined once at the course-navigation level")
    fen_accent = re.search(r'body\[data-subject="fen"\]\{--subject-accent:([^;]+)', html)
    social_accent = re.search(r'body\[data-subject="sosyal"\]\{--subject-accent:([^;]+)', html)
    if not fen_accent or not social_accent or fen_accent.group(1) == social_accent.group(1):
        errors.append("Fen Bilimleri and Social Studies need visibly distinct course accent colors")
    if 'id="scienceWorkspace"' not in html or 'id="scienceWeekList"' not in html or 'id="scienceWeekContent"' not in html:
        errors.append("Fen Bilimleri needs its own weekly course workspace, navigation, and reader")
    science_js_path = ROOT / "science.js"
    science_css_path = ROOT / "science.css"
    science_js = science_js_path.read_text(encoding="utf-8") if science_js_path.is_file() else ""
    science_css = science_css_path.read_text(encoding="utf-8") if science_css_path.is_file() else ""
    science_images = set(re.findall(r"src: '(assets/science-[^']+)'", science_js))
    if any(image.endswith(".jpg") for image in science_images):
        errors.append("Fen lessons must not depend on the old JPEG illustrations")
    raster_images = {image for image in science_images if image.endswith(".webp")}
    # 2. hafta araç galerisini, 5. ve 15. haftalar ünite karşılaştırma galerilerini kullanır.
    gallery_weeks = {2, 5, 15}
    week_block = re.search(r"const WEEK_IMAGE_SOURCES = \{(.*?)\n  \};", science_js, re.S)
    if not week_block:
        errors.append("Fen lessons need a weekly illustration table")
    else:
        week_images = {
            int(week): asset
            for week, asset in re.findall(r"(\d+): \{ src: '(assets/science-week-[^']+)'", week_block.group(1))
        }
        expected_weeks = set(range(1, 16)) - gallery_weeks
        if set(week_images) != expected_weeks:
            errors.append(f"Fen lessons need one illustration for each of weeks {sorted(expected_weeks)}")
        for week, asset in sorted(week_images.items()):
            if not (ROOT / asset).is_file():
                errors.append(f"Missing Fen weekly illustration for week {week}: {asset}")
    gallery_blocks = re.findall(r"\n    (\d+): \{ title: '[^']*', items: \[(.*?)\n    \] \},", science_js, re.S)
    for gallery_week, body in gallery_blocks:
        if len(re.findall(r"label: '", body)) != 4:
            errors.append(f"Fen review week {gallery_week} should show four labelled comparison images")
    if {int(week) for week, _ in gallery_blocks} != {5, 15}:
        errors.append("Fen review weeks 5 and 15 need their own comparison galleries")
    if len(re.findall(r"label: '[^']+'", science_js)) < 7:
        errors.append("The seven space-vehicle diagrams need their own labelled raster illustrations")
    for image in science_images:
        if not (ROOT / image).is_file():
            errors.append(f"Missing Fen science image: {image}")
        elif image.endswith(".webp"):
            variants = [ROOT / image.replace(".webp", suffix) for suffix in ("-800.webp", "-450.webp")]
            if not any(variant.is_file() for variant in variants):
                errors.append(f"Missing responsive variant for {image}")
    if "srcset=" not in science_js or 'loading="lazy"' not in science_js or "science-concept-flow" not in science_js:
        errors.append("Fen illustrations need responsive srcset sources, lazy loading, and in-flow concept cards")
    if "science-concept-flow" not in science_css or ".science-concept-strip" not in science_css:
        errors.append("Fen concept cards need the horizontal, in-flow strip styling")
    if "science-visual-image" not in science_js or "science-explain-block" not in science_js or "science-explain-block" not in science_css:
        errors.append("Fen lessons need accessible image rendering and structured explanation cards")
    science_activities = (ROOT / "science-activities.js").read_text(encoding="utf-8")
    if "renderVisualQuestion" not in science_js or "science-visual-question-figure" not in science_js or ".science-practice-visual" not in science_css:
        errors.append("Fen visual questions need their own renderer, figure markup, and styling")
    if science_activities.count("type: 'visual'") != 15 or "Görsel sorular" not in science_activities:
        errors.append("Every Fen week needs one visual question section that keeps a 10-15 activity load")
    if "spaceVehicles" not in science_js or ".science-visual-gallery.is-vehicles" not in science_css:
        errors.append("Space-vehicle concepts need their own labelled, responsive illustration gallery")
    if "renderTermDefinitions" in science_js or "Kavram sözlüğü" in science_js or "science-key-terms" in science_css or "science-glossary" in science_css:
        errors.append("Science concepts should be explained within the lesson narrative, not in a separate glossary panel")
    if ".science-schedule,.science-visual,.science-research-brief{break-inside:avoid;box-shadow:none}" not in science_css:
        errors.append("Fen print styles must keep schedules, visuals, and research briefs together without shadows")
    if ".science-summary-text{display:grid" not in science_css or "background:#fffdf6" in science_css:
        errors.append("Fen topic summaries must keep their rose-berry identity, distinct from Social Studies")
    style_guide = ROOT / "docs" / "subject-ui-style-guide.md"
    if not style_guide.is_file() or "Fen Bilimleri" not in style_guide.read_text(encoding="utf-8"):
        errors.append("The reusable subject UI guide for future courses is missing")
    social_css = (ROOT / "social-studies.css").read_text(encoding="utf-8") if (ROOT / "social-studies.css").is_file() else ""
    summary_style = re.search(r"\.social-summary-text\{([^}]+)\}", social_css)
    reading_style = re.search(r"\.social-reading-text\{([^}]+)\}", social_css)
    if not summary_style or "background:#fffdf6" not in summary_style.group(1) or "color:#111" not in summary_style.group(1):
        errors.append("Social Studies topic summaries must use the warm yellow reading surface and dark text")
    if not reading_style or "background:#fffdf6" not in reading_style.group(1) or "color:#111" not in reading_style.group(1):
        errors.append("Social Studies source-reading panels must keep the same accessible yellow surface")
    if ".social-exam-notice" not in social_css or ".social-week-exam" not in social_css:
        errors.append("Social Studies exam notices need visible red card and week-list treatments")
    app_js = (ROOT / "theme1-practice-app.js").read_text(encoding="utf-8") if (ROOT / "theme1-practice-app.js").is_file() else ""
    practice_css = (ROOT / "theme1-practice.css").read_text(encoding="utf-8") if (ROOT / "theme1-practice.css").is_file() else ""
    if "--practice-ink: #102238" not in practice_css or "--practice-muted: #46576b" not in practice_css:
        errors.append("Embedded practice text must use the darker high-contrast palette")
    app_runtime_requirements = (
        "function launchConfetti(finalCelebration = false)", "prefers-reduced-motion: reduce",
        "particleCount = finalCelebration ? 220 : 72", "celebrateActivityIfCompleted(activity)",
        "flow.celebratedActivities.includes(activity.id)", 'assessmentState === "correct"',
        "function isThemeFullyCorrect()", "function isFinalThemeUnit()", "flow.themeCelebrated", "launchConfetti(true)",
        "function groqRateLimitRetryDelay(response, payload)", "max_completion_tokens: maxTokens",
        "const completionTokenBudget = Math.min(600", "Groq geçici hız sınırına ulaştı",
        "requestWithRateLimitRetry(false, Math.max(480, completionTokenBudget))", "failed to validate json|failed_generation",
    )
    for requirement in app_runtime_requirements:
        if requirement not in app_js:
            errors.append(f"Practice runtime recovery or completion flow is missing: {requirement}")
    if "data-question-tone" in app_js or "data-question-tone" in practice_css:
        errors.append("Question cards must not cycle through unrelated colors by question number")
    for state in ("correct", "partial", "incomplete", "wrong", "unverified"):
        if f'data-check-state="{state}"' not in practice_css or f'data-state="{state}"' not in practice_css:
            errors.append(f"AI assessment needs matching card and feedback colors for {state}")
    if ".form-fields > .form-field:only-child { grid-column: 1 / -1; }" not in practice_css:
        errors.append("A lone writing field must span the full answer-card width")
    video_analysis_path = ROOT / "docs/video-analysis/hayat-buyuk-bir-okuldur-gemini-analysis.txt"
    if not video_analysis_path.is_file():
        errors.append("Missing Gemini video analysis text used by the Hayat Büyük Bir Okuldur checks")
    else:
        video_analysis = video_analysis_path.read_text(encoding="utf-8")
        if len(video_analysis) < 3000 or not all(section in video_analysis for section in ("1. VİDEONUN KONUSU", "2. SAHNE SAHNE AKIŞ", "5. KONUŞMA VE SES", "6. VİDEONUN ANLATMAK İSTEDİĞİ", "7. KANITLAR VE BELİRSİZLİKLER")):
            errors.append("Gemini video analysis text is incomplete or missing its transcript/visual analysis sections")
    practice_data = (ROOT / "theme1-practice.js").read_text(encoding="utf-8") if (ROOT / "theme1-practice.js").is_file() else ""
    forms_data = (ROOT / "theme1-practice-forms.js").read_text(encoding="utf-8") if (ROOT / "theme1-practice-forms.js").is_file() else ""
    expected_video_notes = 'sourceNotesUrl: "docs/video-analysis/hayat-buyuk-bir-okuldur-gemini-analysis.txt"'
    if practice_data.count(expected_video_notes) != 2 or 'id: "marti-a08"' not in practice_data or 'id: "marti-a09"' not in practice_data:
        errors.append("The Gemini source notes must be attached to both Hayat Büyük Bir Okuldur QR activities")
    analysis_reports = {
        "docs/video-analysis/bir-iyilik-hikayesi-gemini-analysis.md": (practice_data, 1),
        "docs/video-analysis/yigit-caner-aydin-gemini-analysis.md": (practice_data, 7),
        "docs/video-analysis/ali-kuscu-gemini-analysis.md": (practice_data, 2),
    }
    for relative, (data_source, expected_references) in analysis_reports.items():
        report_path = ROOT / relative
        if not report_path.is_file():
            errors.append(f"Missing user-supplied Gemini source analysis: {relative}")
            continue
        report_text = report_path.read_text(encoding="utf-8")
        if len(report_text) < 2500 or "kullanıcı tarafından sağlanan gemini analiz" not in report_text.lower() or "bağımsız" not in report_text:
            errors.append(f"Gemini analysis report is incomplete or missing its source limitation: {relative}")
        reference = f'sourceNotesUrl: "{relative}"'
        count = data_source.count(reference)
        if count != expected_references:
            errors.append(f"Expected {expected_references} activity references to {relative}; found {count}")
    ali_notes_reference = 'sourceNotesUrl: "docs/video-analysis/ali-kuscu-gemini-analysis.md"'
    if forms_data.count(ali_notes_reference) != 1:
        errors.append("The Ali Kuşçu review question must load its Gemini listening-analysis report")
    if 'sourceLinkType: "audio"' not in practice_data or 'sourceLinkType: "audio"' not in forms_data:
        errors.append("The Ali Kuşçu QR must remain visibly typed and labeled as an audio/listening source")
    if "quizFeedbackVersion===2" not in html or "response_format:{type:'json_object'}" not in html or "buildSafeQuizFeedback(score,q.length,codes)" not in html:
        errors.append("The end-of-week Groq quiz must hide legacy free text and render only safe JSON-coded feedback")
    for required_prompt in (
        "7. sınıf Türkçe", "Tema 1 · Hayat Boyu Gelişim", "Maarif/MEB",
        "sourceContext", "sourceLinkMarkup", "sourceUrl", "sourceTranscript", "sourceNotesUrl", "loadSourceNotes", "hasVideoAnalysis", "videoUnavailable", "videoContextText", "mediaLabel",
        "MEDYA KAYNAĞI (iç değerlendirme)", "bağlantı", "doğru/yanlış", "GİZLİ CEVAP KORUMASI",
        "response_format: { type: \"json_object\" }", "structuredAssessmentResult", "assessmentIssueMessages", "assessmentHintMessages",
        "data-check-question", "data-sort-target", "aria-keyshortcuts",
        "Metinle desteklenen doğru bir açıklamayı", "öğrenciye aktarılmamalıdır", "JSON nesnesi", "data-result-pill",
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
        for relative in ("book-texts.js", "social-studies-content.js", "social-studies.js", "science-content.js", "science.js", "theme1-practice.js", "theme1-practice-forms.js", "theme1-practice-app.js"):
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
                elif "Per-week study schedules, YouTube topic links, manual platform checks, and automatic in-app completion passed." not in result.stdout:
                    errors.append("Weekly study schedule test did not report success")

            if not errors:
                social_test = subprocess.run(
                    [node, str(ROOT / "scripts/check-social-studies.js")],
                    capture_output=True,
                    text=True,
                    check=False,
                )
                if social_test.returncode:
                    errors.append(f"Social Studies workspace test failed:\n{social_test.stderr.strip()}")
                elif "Social Studies summaries, Week 8 exam notice, merged first-term textbook-aligned flows, Groq checks and stale-response protection, progress migration, completion rules, exact links, and backups passed." not in social_test.stdout:
                    errors.append("Social Studies workspace test did not report success")

            if not errors:
                science_test = subprocess.run(
                    [node, str(ROOT / "scripts/check-science.js")],
                    capture_output=True,
                    text=True,
                    check=False,
                )
                if science_test.returncode:
                    errors.append(f"Fen Bilimleri workspace test failed:\n{science_test.stderr.strip()}")
                elif "Fen Bilimleri 15-week first-term calendar with merged topics, four-part in-context explanations, task-gated research results, original seven-vehicle gallery and weekly visuals, rose-berry palette, unchanged tasks/quizzes/activities, safe Groq checks, progress isolation, completion rules, and backup API passed." not in science_test.stdout:
                    errors.append("Fen Bilimleri workspace test did not report success")

            if not errors:
                extras_test = subprocess.run(
                    [node, str(ROOT / "scripts/check-turkce-extras.js")],
                    capture_output=True,
                    text=True,
                    check=False,
                )
                if extras_test.returncode:
                    errors.append(f"Theme 1 extras test failed:\n{extras_test.stderr.strip()}")
                elif "Tema 1 ek okuma ve etkinlikler hazır" not in extras_test.stdout:
                    errors.append("Theme 1 extras test did not report success")

            if not errors:
                qr_test = subprocess.run(
                    [node, str(ROOT / "scripts/check-qr-inventory.js")],
                    capture_output=True,
                    text=True,
                    check=False,
                )
                if qr_test.returncode:
                    errors.append(f"Turkish QR inventory test failed:\n{qr_test.stderr.strip()}")
                elif "Türkçe karekod envanteri tutarlı" not in qr_test.stdout:
                    errors.append("Turkish QR inventory test did not report success")

            if not errors:
                qr_flow_test = subprocess.run(
                    [node, str(ROOT / "scripts/check-turkce-qr.js")],
                    capture_output=True,
                    text=True,
                    check=False,
                )
                if qr_flow_test.returncode:
                    errors.append(f"Turkish QR practice test failed:\n{qr_flow_test.stderr.strip()}")
                elif "Türkçe karekod çalışmaları hazır" not in qr_flow_test.stdout:
                    errors.append("Turkish QR practice test did not report success")

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
                    elif "Focused-week selection, persistent sidebar, browser history, Theme 1 practice visibility, and keyboard focus passed." not in result.stdout:
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
                    elif "Question and field states, targeted safe hints, one-time TPM retry, JSON-validation fallback, activity and full-theme confetti celebrations, no hint on correct answers, fair Martı evidence, media-source attribution, and hidden warning-card removal passed." not in result.stdout:
                        errors.append("Groq prompt test did not report success")

            if not errors:
                try:
                    quiz_test = quiz_feedback_test_source(html)
                except ValueError as exc:
                    errors.append(str(exc))
                else:
                    with tempfile.NamedTemporaryFile(
                        mode="w", encoding="utf-8", suffix=".js"
                    ) as temp:
                        temp.write(quiz_test)
                        temp.flush()
                        result = subprocess.run(
                            [node, temp.name], capture_output=True, text=True, check=False
                        )
                    if result.returncode:
                        errors.append(f"End-of-week quiz feedback test failed:\\n{result.stderr.strip()}")
                    elif "End-of-week quiz feedback is score-grounded and safe from free-text answer leaks." not in result.stdout:
                        errors.append("End-of-week quiz feedback test did not report success")

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

    print("Static site checks passed: assets, distinct Fen/Social course accents, focused-week navigation, darker text contrast, per-week tracking, a 15-week first-term Social Studies plan with merged topics and variable activity flows, the date-aligned 15-week Fen curriculum, refined lesson explanations and original science illustrations, safe assessment, progress isolation and backups, targeted hints, TPM retry, JSON-validation fallback, accessible sorting, correct-completion celebrations, Gemini video/audio notes, Theme 1 packages, and the PDF reader are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
