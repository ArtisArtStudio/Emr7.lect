# Subject UI style guide

This is the shared interface contract for current and future course workspaces, including Fen Bilimleri. Keep course identity in a light accent and keep the learning flow, navigation, progress rules, and AI-check interaction consistent with the Turkish and Social Studies workspaces.

## Shared palette and course accents

The core reader palette in `index.html` is the source of truth:

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#102238` | Main headings and readable text |
| `--muted` | `#46576b` | Supporting text; keep it legible |
| `--paper` | `#f5f7fb` | Shared page paper |
| `--line` | `#e3e9f1` | Neutral card and control borders |
| `--blue` | `#245cdb` | Existing shared Turkish/action blue |
| `--mint` | `#c9f2df` | Existing progress accent |
| `--gold` | `#ffda83` | Existing warm highlight |

The current page selects a small per-course accent with `body[data-subject]`. Use that accent for the active subject tab, the selected week or step, and a very light page wash—not as a reason to recolor every card. Current assignments are:

| `data-subject` | Course | Accent | Pale wash |
| --- | --- | --- | --- |
| `turkce` | Türkçe | `#245cdb` | `#f5f7fc` |
| `matematik` | Matematik | `#7056c9` | `#f8f6fc` |
| `fen` | Fen Bilimleri | `#36865b` | `#f4f9f5` |
| `sosyal` | Sosyal Bilgiler | `#287b68` | `#f3f9f6` |
| `ingilizce` | İngilizce | `#c76a33` | `#fbf7f3` |
| `din` | Din Kültürü ve Ahlak Bilgisi | `#a27a22` | `#faf8f0` |

Keep study cards neutral white (`#fff`) and long reading/topic-summary panels warm and readable (`#fffdf6`, dark text). Do not use the pale course wash behind text if it reduces contrast. Existing exam notices use a separate red semantic treatment.

## Shared page flow

1. Keep the subject selector at the top. Put course-wide tools directly below it so they remain reachable from every course. The shared Groq/ElevenLabs settings belong here behind the gear control; never copy the settings panel or embed/duplicate an API key in an individual course.
2. Use a two-column study layout on desktop: a week/learning-area navigation panel at the left and the selected-week reader at the right. Keep the left navigation sticky while the learner studies. On narrow screens, stack the navigation before the reader and let the page scroll normally.
3. If no week is selected, show a short week-selection prompt. Once a week is selected, keep the navigation visible and show only that week's reader in the main column. Browser history may return to the prompt; a separate “return to week selection” button is not needed.
4. Start the selected-week content with its title, date, and any applicable semantic notice. Follow with the topic summary/reading, the week's learning or practice flow, a short student plan, progress tracking, and course-resource links.
5. Use the same visual language for interactive checks: clearly label the action (for example, “Kontrol et”), show a local missing-key reminder that opens the shared settings, and provide an accessible pending/result state. Reuse the shared AI settings/model and preserve existing safe-feedback rules; do not add course-specific API keys.
6. Keep progress namespaced per course and keep import/export and reset behavior explicit. A new course must not overwrite Turkish or Social Studies progress.

## Component and accessibility rules

- Reuse `.card`, `.panel`, `.weeks`, `.content`, `.weekhead`, `.weekbtn`, `.print`, and the Social Studies practice-flow patterns where they fit. Prefer shared tokens over hard-coded near-duplicate colors.
- Make selected states clear by more than color alone (for example, `aria-current`, step labels, or completion marks). Keep visible keyboard focus and useful accessible names on icon-only controls.
- Use semantic `<button>` elements for actions and real links for external course resources. External links opened in a new tab should use `rel="noopener noreferrer"`.
- Keep text readable at mobile widths: avoid fixed-width cards, allow long exam labels to wrap, and keep focus outlines visible.
- Keep the topic text dark on its warm reading surface; leave summary points and metadata outside the reading panel when they serve as navigation or reminders.

## Exam-date notices

Show first-term exam notices only in courses explicitly requested for them. Map each date to the course week that actually contains it, verify the week/date mapping before changing the data, and show the same `1. sınav (date)` text in that week's navigation entry and a prominent red notice at the top of its selected-week header. Other courses should not inherit exam notices by accident.

## Adding a future course (especially Fen Bilimleri)

- Add its subject identity and accent/wash to `index.html`; use the same top-level course selector and shared tools.
- Build the desktop sidebar + reader and mobile stacked layout described above; keep week selection available during study.
- Add a course-owned progress namespace, week data, activity renderer, and regression tests. Keep “Kontrol et,” progress, backup, reset, and page navigation consistent with the existing subjects.
- Keep most surfaces neutral. Use the course accent only for identity and active states, and use the warm reading panel for long instructional text.
- Document any intentional course-specific component in its course stylesheet rather than changing shared behavior for all subjects.
