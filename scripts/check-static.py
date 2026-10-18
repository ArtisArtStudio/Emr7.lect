#!/usr/bin/env python3
"""Check GitHub Pages file paths, JavaScript syntax, and merged-week behavior."""

import json
import re
import shutil
import subprocess
import sys
import tempfile
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import subprocess
import sys
import tempfile

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
    migration_end = html.find("let current=5;", migration_start)
    if min(groups_start, groups_end, migration_start, migration_end) < 0:
        raise ValueError("Could not find the week-grouping code to test")

    grouping = html[groups_start:groups_end]
    migration = html[migration_start:migration_end]
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
"""
    return grouping + "\n" + migration + "\n" + harness


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

    texts = json_constant("BOOK_TEXTS", "BOOK_MAP")
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
    parser = SiteParser()
    parser.feed(html)
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
        js_files = [(ROOT / "arcade.js", (ROOT / "arcade.js").read_text(encoding="utf-8"))]
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
                    errors.append(f"Week grouping test failed:\n{result.stderr.strip()}")
                elif "Week grouping and saved-progress migration passed." not in result.stdout:
                    errors.append("Week grouping test did not report success")

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

    print("Static site checks passed: Pages paths, JavaScript, week grouping, progress migration, and the PDF story reader are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
