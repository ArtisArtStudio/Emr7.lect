#!/usr/bin/env python3
"""Check GitHub Pages file paths and JavaScript syntax without a build step."""

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
            if attributes.get("src"):
                self._inline_script = None
            else:
                self._inline_script = []

    def handle_data(self, data):
        if self._inline_script is not None:
            self._inline_script.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "script" and self._inline_script is not None:
            self.inline_scripts.append("".join(self._inline_script))
            self._inline_script = None


def main() -> int:
    errors = []
    if not HTML_FILE.is_file():
        print("Missing index.html", file=sys.stderr)
        return 1
    if not (ROOT / ".nojekyll").is_file():
        errors.append("Missing .nojekyll for GitHub Pages")

    parser = SiteParser()
    parser.feed(HTML_FILE.read_text(encoding="utf-8"))
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
        errors.append("Node.js is required to check JavaScript syntax")
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

    if errors:
        print("Static site checks failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print("Static site checks passed: Pages paths resolve and JavaScript syntax is valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
