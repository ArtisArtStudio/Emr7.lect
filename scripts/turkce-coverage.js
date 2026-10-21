#!/usr/bin/env node
'use strict';

// Türkçe 1. dönem kapsam denetimi: her hafta için kitap metni, quiz, etkinlik seti ve
// yazma görevinin var olup olmadığını tek tabloda gösterir. Varsayılan kip rapor üretir;
// --strict verildiğinde eksik hafta varsa çıkış kodu 1 olur (setler tamamlanınca CI'ya bağlanır).

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(ROOT, name), 'utf8');

const bookTexts = JSON.parse(read('book-texts.js').replace(/^window\.BOOK_TEXTS=/, '').replace(/;\s*$/, ''));
const html = read('index.html');

const weeks = [...html.matchAll(/\[(\d+),'([^']*)','([^']*)','([^']*)','([^']*)'\]/g)]
  .map((match) => ({ id: Number(match[1]), date: match[2], theme: match[3], work: match[4], focus: match[5] }))
  .filter((week) => week.theme && !/Dönem sonu|Yıl sonu|Sosyal etkinlik/.test(week.theme));

const bookMap = new Map([...html.matchAll(/(\d+):\["([^"]+)", "([^"]+)"\]/g)].map((m) => [Number(m[1]), { title: m[2], key: m[3] }]));

const quizBlock = html.match(/const BOOK_QUIZZES=\{([\s\S]*?)\n\};/);
const quizCounts = new Map();
if (quizBlock) {
  const starts = [...quizBlock[1].matchAll(/^([a-z]+):\[/gm)];
  starts.forEach((match, index) => {
    const end = index + 1 < starts.length ? starts[index + 1].index : quizBlock[1].length;
    const body = quizBlock[1].slice(match.index, end);
    quizCounts.set(match[1], (body.match(/\n\['/g) || []).length + 1);
  });
}

const specificBlock = html.match(/const specific=\{([\s\S]*?)\};\nconst DEFAULT_TASKS/);
const writingWeeks = new Set();
if (specificBlock) {
  const starts = [...specificBlock[1].matchAll(/(\d+):\{/g)];
  starts.forEach((match, index) => {
    const end = index + 1 < starts.length ? starts[index + 1].index : specificBlock[1].length;
    if (/\bwrite:/.test(specificBlock[1].slice(match.index, end))) writingWeeks.add(Number(match[1]));
  });
}

const sandbox = {};
global.window = sandbox;
// eslint-disable-next-line no-eval
eval(read('theme1-practice.js'));
const practiceUnits = sandbox.THEME1_PRACTICE.units.map((unit) => ({
  weekId: unit.weekId,
  span: unit.groups.reduce((total, group) => total + group.activities.length, 0),
  title: unit.title,
}));

function activityCountFor(weekId) {
  const unit = practiceUnits.find((item) => weekId === item.weekId || weekId === item.weekId + 1);
  return unit ? unit.span : 0;
}

const PASSIVE_WEEKS = new Set(weeks.filter((week) => !bookMap.has(week.id)).map((week) => week.id));
const rows = weeks.map((week) => {
  const book = bookMap.get(week.id);
  const key = book?.key;
  const hasText = Boolean(key && bookTexts[key]);
  return {
    ...week,
    book: book?.title || week.work,
    text: hasText ? `${bookTexts[key].length} kr` : PASSIVE_WEEKS.has(week.id) ? 'dinleme/izleme' : '—',
    quiz: key && quizCounts.has(key) ? `${quizCounts.get(key)} soru` : '—',
    activities: activityCountFor(week.id),
    writing: writingWeeks.has(week.id) ? 'var' : '—',
  };
});

const pad = (value, width) => String(value).padEnd(width);
console.log(`${pad('Hafta', 6)}${pad('Tema', 30)}${pad('Eser', 44)}${pad('Metin', 16)}${pad('Quiz', 9)}${pad('Etkinlik', 9)}Yazma`);
console.log('-'.repeat(122));
for (const row of rows) {
  console.log(`${pad(row.id, 6)}${pad(row.theme, 30)}${pad(row.book.slice(0, 42), 44)}${pad(row.text, 16)}${pad(row.quiz, 9)}${pad(row.activities, 9)}${row.writing}`);
}

const gaps = {
  text: rows.filter((row) => !PASSIVE_WEEKS.has(row.id) && row.text === '—'),
  quiz: rows.filter((row) => row.quiz === '—'),
  activities: rows.filter((row) => row.activities === 0),
  writing: rows.filter((row) => row.writing === '—'),
};

const totalActivities = practiceUnits.reduce((total, unit) => total + unit.span, 0);
const totalQuiz = [...quizCounts.values()].reduce((total, count) => total + count, 0);
console.log(`\nMetin: ${rows.filter((row) => row.text !== '—' && row.text !== 'dinleme/izleme').length}/${rows.length} hafta · ` +
  `Quiz: ${rows.filter((row) => row.quiz !== '—').length}/${rows.length} hafta (${totalQuiz} soru) · ` +
  `Etkinlik: ${rows.filter((row) => row.activities > 0).length}/${rows.length} hafta (${totalActivities} etkinlik) · ` +
  `Yazma görevi: ${rows.filter((row) => row.writing === 'var').length}/${rows.length} hafta`);

const report = [
  ['Metinsiz (dinleme/izleme dışı) hafta', gaps.text],
  ['Quiz olmayan hafta', gaps.quiz],
  ['Etkinlik seti olmayan hafta', gaps.activities],
  ['Yazma görevi olmayan hafta', gaps.writing],
];
for (const [label, list] of report) {
  if (list.length) console.log(`EKSİK · ${label}: ${list.map((row) => row.id).join(', ')}`);
}

if (process.argv.includes('--strict') && (gaps.text.length || gaps.quiz.length || gaps.activities.length)) {
  console.error('\nTürkçe kapsam denetimi başarısız: eksik haftalar var.');
  process.exitCode = 1;
}
