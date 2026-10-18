#!/usr/bin/env python3
"""Check GitHub Pages file paths, JavaScript syntax, and merged-week behavior."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import shutil
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

    if errors:
        print("Static site checks failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print("Static site checks passed: Pages paths, JavaScript, week grouping, and progress migration are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
