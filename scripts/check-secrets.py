#!/usr/bin/env python3
"""Fail when common Groq/ElevenLabs API-key patterns appear in source files."""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
TEXT_SUFFIXES = {
    ".css",
    ".env",
    ".html",
    ".js",
    ".json",
    ".md",
    ".py",
    ".sh",
    ".toml",
    ".txt",
    ".yaml",
    ".yml",
}
SKIP_DIRS = {".git", ".venv", "node_modules", "__pycache__"}

PATTERNS = (
    ("Groq API key", re.compile(rb"\bgsk_[A-Za-z0-9_-]{20,}\b")),
    (
        "API-key assignment",
        re.compile(
            rb"\b(?:API|GROQ|ELEVENLABS|ELEVEN_LABS|XI)[A-Z0-9_-]*(?:KEY|TOKEN)"
            rb"\s*[:=]\s*['\"]?([A-Za-z0-9_-]{20,})",
            re.IGNORECASE,
        ),
    ),
    (
        "ElevenLabs key in request header",
        re.compile(
            rb"['\"]xi-api-key['\"]\s*:\s*['\"]([A-Za-z0-9_-]{20,})['\"]",
            re.IGNORECASE,
        ),
    ),
)


def source_files():
    for path in ROOT.rglob("*"):
        if any(part in SKIP_DIRS for part in path.relative_to(ROOT).parts):
            continue
        if path.is_file() and path.suffix.lower() in TEXT_SUFFIXES:
            yield path


def main() -> int:
    findings = []
    for path in source_files():
        try:
            contents = path.read_bytes()
        except OSError as exc:
            print(f"Could not read {path.relative_to(ROOT)}: {exc}", file=sys.stderr)
            return 2
        for label, pattern in PATTERNS:
            for match in pattern.finditer(contents):
                line = contents.count(b"\n", 0, match.start()) + 1
                # Never print matched text: the match may itself be a credential.
                findings.append((path.relative_to(ROOT), line, label))

    if findings:
        print("Possible API key material found; remove it and rotate the key:")
        for path, line, label in findings:
            print(f"  {path}:{line}: {label}")
        return 1

    print("Secret scan passed: no common Groq/ElevenLabs key patterns found.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
