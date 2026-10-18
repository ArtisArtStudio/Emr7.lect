#!/usr/bin/env python3
"""Check GitHub Pages assets, theme navigation, Theme 1 practice, and reader behavior."""

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
const themePracticeRoot = new ThemeNode('div');
global.document = {
  getElementById: (id) => ({weeklist: themeRoot, theme1Practice: themePracticeCard, theme1PracticeUnits: themePracticeRoot}[id]),
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
for (const fieldName of ['key-word','context-meaning','dictionary-meaning','associations']) {
  if (!vocabulary.some((question) => question.fields.some((field) => field.id === fieldName))) throw new Error(`Anahtar söz varlığı is missing ${fieldName}`);
}
if (!vocabulary.some((question) => question.id === 'word-relationships')) throw new Error('Anahtar söz varlığı word-selection/relationship work is missing');
for (const section of ['serim','dugum','cozum']) {
  if (!window.THEME1_FORMS['marti-a04'].some((question) => question.id === section && question.fields.some((field) => field.type === 'textarea'))) throw new Error(`Olay örgüsü needs a separate written ${section} response`);
}
if (!window.THEME1_FORMS['sport-a10'].some((question) => question.id === 'dugum') || !window.THEME1_FORMS['sport-a10'].some((question) => question.id === 'cozum')) throw new Error('The written story sections are not separate response fields');
const matchingQuestions = Object.values(window.THEME1_FORMS).flat().filter((question) => question.responseType === 'matching');
if (matchingQuestions.length < 10 || matchingQuestions.some((question) => !question.fields.some((field) => field.type === 'select'))) throw new Error('Source matching/classification tasks must use selection widgets');
if (!window.THEME1_FORMS['adiny-review'].some((question) => question.id === 'review-2' && question.fields.some((field) => field.type === 'radio'))) throw new Error('The theme review multiple-choice item is not a real selection widget');
if (!window.THEME1_FORMS['adiny-a03'].every((question) => question.sourceKeys?.includes('adini') && question.sourceNote?.includes('QR'))) throw new Error('The Kaoru–Yiğit Caner Aydın comparison must use the story text and note the QR-only video limit');

renderTheme1Practice(weeks.find((week) => week[0] === 1));
if (themePracticeCard.hidden || !themePracticeRoot.innerHTML.includes('theme1-practice.html?unit=1') || !themePracticeRoot.innerHTML.includes('1–2. haftalar · Martı Jonathan Livingston') || !themePracticeRoot.innerHTML.includes('12 numaralı etkinlik')) throw new Error('Theme 1 separate-package link did not render the active unit and inventory count');
if (themePracticeRoot.innerHTML.includes('<details') || themePracticeRoot.innerHTML.includes('textarea')) throw new Error('Inline collapsible practice activities are still being rendered');
renderTheme1Practice(weeks.find((week) => week[0] === 7));
if (!themePracticeCard.hidden || themePracticeRoot.innerHTML !== '') throw new Error('Theme 1 practice links appeared outside Theme 1');
console.log('Theme 1 practice inventory, typed forms, package links, and game removal passed.');
"""
    return "global.window = {};\n" + grouping + "\n" + migration + "\n" + practice_data + "\n" + practice_forms + "\n" + practice_renderer + "\n" + renderer + "\n" + harness


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
    URLSearchParams, Date, console
  }});
  for (const source of sources) vm.runInContext(source, context);
  const selected = context.window.THEME1_PRACTICE.units.find((unit) => unit.weekId === unitId);
  const activities = selected.groups.flatMap((group) => group.activities);
  for (let index = 0; index < activities.length; index += 1) {{
    const activity = activities[index];
    const expectedChecks = context.window.THEME1_FORMS[activity.id].length;
    const actualChecks = (element('activity-stage').innerHTML.match(/data-check-question=/g) || []).length;
    if (actualChecks !== expectedChecks) throw new Error(`Unit ${{unitId}} activity ${{activity.id}}: expected ${{expectedChecks}} question checks, got ${{actualChecks}}`);
    if (!element('activity-stage').innerHTML.includes('Yanıt alanı')) throw new Error(`Unit ${{unitId}} activity ${{activity.id}} is missing a response area`);
    if (index < activities.length - 1) element('next-step').listeners.click();
  }}
  const totalChecks = activities.reduce((sum, activity) => sum + context.window.THEME1_FORMS[activity.id].length, 0);
  console.log(`Unit ${{unitId}} rendered ${{activities.length}} activities and ${{totalChecks}} question checks.`);
}}
"""


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
  1: {{theme1PracticeFlow: {{stepIndex: 0, answers: {{'marti-a03::evidence-1': {{answer: 'Jonathan tests a new way of turning.'}}}}, feedback: {{}}}}}}
}};
const storage = new Map([
  ['turkceRota2026', JSON.stringify(saved)],
  ['turkceGroqKey2026', 'unit-test-key']
]);
const elements = new Map();
let capturedRequest = null;
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
          const card = {{querySelector: (name) => name === '.feedback-box' ? feedback : null}};
          return {{dataset: {{checkQuestion: match[1]}}, disabled: false, textContent: '', listeners: {{}}, closest: () => card, addEventListener(name, callback) {{ this.listeners[name] = callback; }}, feedback}};
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
    return {{ok: true, json: async () => ({{choices: [{{message: {{content: 'Geri bildirim: Metinden kanıt seçmen iyi bir başlangıç.'}}}}]}})}};
  }}
}});
for (const source of sources) vm.runInContext(source, context);
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
  if (!prompt.includes('Jonathan tests a new way of turning.') || !prompt.includes('Durgun denizin minik dalgacıkları')) throw new Error('Groq request omitted the student answer or relevant story source text');
  if (!button.feedback.textContent.includes('Geri bildirim')) throw new Error('Groq feedback was not rendered after the response');
  console.log('Question-level Groq request includes age/theme context, source passage, and feedback.');
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
    practice_html_file = ROOT / "theme1-practice.html"
    if not practice_html_file.is_file():
        errors.append("Missing separate Theme 1 study-package page")
        practice_html = ""
    else:
        practice_html = practice_html_file.read_text(encoding="utf-8")
    parser = SiteParser()
    parser.feed(html)
    practice_parser = SiteParser()
    practice_parser.feed(practice_html)
    if 'id="textGame"' in html or "TEXT_GAMES" in html or "renderTextGame" in html:
        errors.append("The old game card/runtime is still referenced from index.html")
    if "<details class=\"practice-activity\"" in html or "data-practice-id" in html:
        errors.append("Inline collapsible Theme 1 activity cards are still present")
    if "Kontrol et" not in practice_html or "theme1-practice-app.js" not in practice_html:
        errors.append("Separate practice page is missing question-level checks")
    app_js = (ROOT / "theme1-practice-app.js").read_text(encoding="utf-8") if (ROOT / "theme1-practice-app.js").is_file() else ""
    for required_prompt in ("7. sınıf Türkçe", "Tema 1 · Hayat Boyu Gelişim", "Maarif/MEB", "sourceContext", "data-check-question"):
        if required_prompt not in app_js:
            errors.append(f"Groq evaluation context or per-question checking is missing: {required_prompt}")
    for page_name, page_parser in (("index.html", parser), ("theme1-practice.html", practice_parser)):
        for tag, attr, value in page_parser.local_refs:
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
                errors.append(f"Missing local asset referenced by {page_name}: {value}")

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
                elif "Theme 1 practice inventory, typed forms, package links, and game removal passed." not in result.stdout:
                    errors.append("Theme 1 practice test did not report success")

            if not errors:
                try:
                    app_test = practice_app_test_source()
                except OSError as exc:
                    errors.append(f"Could not prepare the practice-page test: {exc}")
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
                        errors.append(f"Separate practice-page runtime test failed:\n{result.stderr.strip()}")
                    elif sum(int(value) for value in re.findall(r"rendered \d+ activities and (\d+) question checks", result.stdout)) != 220:
                        errors.append("Separate practice-page runtime test did not render all 220 question checks")

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
                    elif "Question-level Groq request includes age/theme context, source passage, and feedback." not in result.stdout:
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

    print("Static site checks passed: assets, theme navigation, saved-progress migration, separate typed Theme 1 packages, question-level Groq context, no game card, Bayrağımız credit, and the PDF reader are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
