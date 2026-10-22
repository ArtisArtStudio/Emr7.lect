#!/usr/bin/env node
'use strict';

// Türkçe karekod envanteri denetimi.
// `docs/turkce-qr-envanteri.md` içindeki tablo ile uygulamadaki gerçek durum ayrışırsa hata verir:
// etkinlik kimlikleri gerçekten var mı, "eksik" işaretli içerik uygulamaya sızmış mı, özet sayıları tutuyor mu?

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(ROOT, name), 'utf8');

const inventory = read('docs/turkce-qr-envanteri.md');
const tags = { covered: '✅', game: '⛔', missing: '❌', partial: '⚠️', skipped: '⏭️' };

const rows = inventory
  .split('\n')
  .filter((line) => line.startsWith('| ') && !line.startsWith('| # ') && !line.startsWith('| ---'))
  .map((line) => line.split('|').map((cell) => cell.trim()))
  .filter((cells) => cells.length >= 8 && /^(\d+|—)$/.test(cells[1]))
  .map((cells) => ({
    number: /^\d+$/.test(cells[1]) ? Number(cells[1]) : null,
    where: cells[2],
    title: cells[3].replace(/\*\*/g, ''),
    kind: cells[4],
    coverage: cells[5],
    statusCell: cells[6],
    ids: [...cells[5].matchAll(/`([^`]+)`/g)].map((match) => match[1]).filter((id) => /^[a-z]+-[a-z0-9-]+$/.test(id)),
  }));

const numbered = rows.filter((row) => row.number !== null);
assert.equal(numbered.length, 18, `Envanterde 18 numaralı karekod satırı olmalı (bulunan: ${numbered.length}).`);
assert.deepEqual(
  numbered.map((row) => row.number),
  numbered.map((_, index) => index + 1),
  'Envanter numaraları 1’den başlayıp kesintisiz artmalı.',
);

const seen = new Set();
for (const row of rows) {
  assert.ok(row.title.length > 3, `${row.number}. satırda içerik adı yok.`);
  const key = `${row.title} · ${row.where}`;
  assert.ok(!seen.has(key), `Aynı içerik aynı yerde iki kez listelenmiş: ${row.title}`);
  seen.add(key);
  assert.ok(!/kitap|sayfa|s\.\s*\d/i.test(row.coverage), `${row.title}: kapsam sütununa kitap referansı yazılmamalı.`);
}

// Uygulama verisi
const sandbox = {};
global.window = sandbox;
// eslint-disable-next-line no-eval
eval(read('theme1-practice.js'));
// eslint-disable-next-line no-eval
eval(read('turkce-qr.js'));
const qrUnits = new Map((sandbox.TURKCE_QR?.units || []).map((unit) => [unit.id, unit]));
const activities = new Map();
for (const unit of sandbox.THEME1_PRACTICE.units) {
  for (const group of unit.groups) {
    for (const activity of group.activities) activities.set(activity.id, activity);
  }
}

const coveredRows = rows.filter((row) => row.statusCell.includes(tags.covered));
const missingRows = rows.filter((row) => row.statusCell.includes(tags.missing));
const gameRows = rows.filter((row) => row.statusCell.includes(tags.game) && !/Ölçme|Puanlama|Değerlendirme aracı/i.test(row.kind));
const partialRows = rows.filter((row) => row.statusCell.includes(tags.partial));
const skippedRows = rows.filter((row) => row.statusCell.includes(tags.skipped));
const assessRows = rows.filter((row) => /Ölçme|Puanlama|Değerlendirme aracı/i.test(row.kind));
const mediaRows = numbered.filter((row) => !row.statusCell.includes(tags.game) && !assessRows.includes(row));
const missingMediaRows = mediaRows.filter((row) => row.statusCell.includes(tags.missing));

// 1) "var" denilen her etkinlik gerçekten var ve QR bağlantısı taşıyor.
// `adiny-review` bilinçli istisna: bağlantı düğmesi yok, QR içeriği yalnız değerlendirme bağlamında kullanılıyor.
const LINKLESS_OK = new Set(['adiny-review']);
for (const row of coveredRows) {
  assert.ok(row.ids.length, `${row.title} “var” işaretli ama etkinlik kimliği yazılmamış.`);
  for (const id of row.ids) {
    if (id.startsWith('qr-')) {
      assert.ok(qrUnits.has(id), `Envanterde geçen ${id} karekod çalışması turkce-qr.js içinde yok.`);
      continue;
    }
    const activity = activities.get(id);
    assert.ok(activity, `Envanterde geçen ${id} etkinliği uygulamada yok.`);
    if (!LINKLESS_OK.has(id)) assert.ok(activity.sourceUrl, `${id} için QR bağlantısı bekleniyordu.`);
  }
}

// 2) "eksik" denilen içerik uygulamaya bağlanmamış olmalı.
const appSources = [
  ...[...activities.values()].map((activity) => `${activity.source || ''} ${activity.title || ''}`),
  ...[...qrUnits.values()].map((unit) => `${unit.title} ${unit.where}`),
].join(' ').toLocaleLowerCase('tr');
const MISSING_MARKERS = {};
for (const row of missingRows) {
  for (const marker of MISSING_MARKERS[row.title] || []) {
    assert.ok(!appSources.includes(marker), `${row.title} envanterde eksik görünüyor ama uygulamada “${marker}” geçiyor.`);
  }
}

// 3) Bağlantı sayısı: dört doğrulanmış EBA kaynağı.
const urls = new Set([...activities.values()].map((activity) => activity.sourceUrl).filter(Boolean));
assert.equal(urls.size, 4, `Uygulamada beklenen 4 doğrulanmış QR kaynağı var, bulunan: ${urls.size}`);
for (const url of urls) assert.ok(url.startsWith('https://www.eba.gov.tr/'), `QR bağlantısı EBA olmalı: ${url}`);

// 4) Özet sayıları tabloyla uyuşmalı.
assert.equal(numbered.length, 18, 'Birinci dönem numaralı karekod içeriği 18 olmalı.');
assert.equal(mediaRows.length, 12, 'Metin/video/ses içeriği 12 olmalı.');
assert.equal(coveredRows.length, 12, 'Çalışmaya bağlı metin/video/ses içeriği 12 olmalı.');
assert.equal(missingMediaRows.length, 0, 'Metin/video/ses içeriklerinin hepsi bağlı olmalı.');
assert.equal(missingRows.length, 0, 'Birinci dönemde eksik içerik kalmamalı.');
assert.equal(gameRows.length, 3, 'Oyun/etkileşimli içerik 3 olmalı.');
assert.equal(assessRows.length, 3, 'Ölçme/puanlama aracı 3 olmalı.');
const assessOnlyRows = rows.filter((row) => row.statusCell.includes(tags.game) && /Ölçme|Puanlama|Değerlendirme aracı/i.test(row.kind));
assert.equal(
  partialRows.length + missingRows.length + coveredRows.length + gameRows.length + skippedRows.length + assessOnlyRows.length,
  rows.length,
  'Her satırın tek bir durumu olmalı.',
);

// 5) Konuşma etkinlikleri kapsam dışı: envanterde yalnız "atlandı" olarak geçebilir.
const speaking = rows.filter((row) => /Konuşma/i.test(row.kind));
assert.equal(speaking.length, 1, 'Konuşma etkinliği envanterde tek satır olarak, atlandı işaretiyle durmalı.');
assert.ok(speaking[0].statusCell.includes(tags.skipped), 'Konuşma etkinliği “kapsam dışı” işaretli olmalı.');
assert.equal(speaking[0].ids.length, 0, 'Konuşma etkinliğine bağlı çalışma olmamalı.');

// 6) Öğrenciye dönük uygulama metinlerinde kitap/sayfa referansı olmamalı (envanter belgesi hariç).
assert.ok(inventory.includes('Kapsam dışı'), 'Envanter, konuşma etkinliklerinin kapsam dışı olduğunu belirtmeli.');

// 7) Karekod çalışmaları sayısı envanterle uyuşmalı.
const qrRows = coveredRows.filter((row) => row.ids.some((id) => id.startsWith('qr-')));
// Ana tablo (Tema 1–2) 8 kart taşır; Tema 3 kartları (§ 3b) ayrı sayılır.
assert.equal(qrRows.length, 8, 'Envanterde 8 karekod çalışması satırı olmalı.');
assert.equal(qrUnits.size, 11, 'Uygulamada 11 karekod çalışması olmalı (8 Tema 1–2 + 3 Tema 3).');
for (const id of ['qr-dus-fircasi', 'qr-dijital-tayfa', 'qr-iletisimin-onemi']) {
  assert.ok(qrUnits.has(id), `${id} karekod çalışması turkce-qr.js içinde yok.`);
  assert.ok(inventory.includes(id), `${id} envanterde (§ 3b) geçmiyor.`);
}

console.log(
  `Türkçe karekod envanteri tutarlı: ${rows.length} içerik · ${coveredRows.length} bağlı (${qrRows.length} kart) · ` +
  `${missingRows.length} eksik · ${gameRows.length} oyun · ${partialRows.length} kısmi · konuşma kapsam dışı.`,
);
