#!/usr/bin/env node
/* Matematik alanı içerik ve uygulama denetimi.
   Konu anlatımlarının kapsamı, sınav takvimi, sahne tanımları ve index.html bağlantısı doğrulanır. */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

// 1. İçeriği ve dizgi motorunu yükle
const sandbox = { window: {} };
new Function('window', read('matematik-math.js'))(sandbox.window);
new Function('window', read('matematik-figure.js'))(sandbox.window);
new Function('window', read('matematik-content.js'))(sandbox.window);
new Function('window', read('matematik-kitap.js'))(sandbox.window);
new Function('window', read('matematik-etkinlikler.js'))(sandbox.window);
new Function('window', read('matematik-sahne.js'))(sandbox.window);
const content = sandbox.window.MATEMATIK_CONTENT;
const M = sandbox.window.MATEMATIK_MATH;
const FIG = sandbox.window.MATEMATIK_FIGURE;
const ACT = sandbox.window.MATEMATIK_ETKINLIKLER;
const SAHNE = sandbox.window.MATEMATIK_SAHNE2;
const KITAP = sandbox.window.MATEMATIK_KITAP;
assert.ok(SAHNE && typeof SAHNE.mount === 'function' && typeof SAHNE.types === 'function',
  'MATEMATIK_SAHNE2 yerel sahne motoru bulunamadı.');
assert.ok(FIG && typeof FIG.render === 'function', 'MATEMATIK_FIGURE.render bulunamadı.');
assert.ok(ACT && typeof ACT.forWeek === 'function', 'MATEMATIK_ETKINLIKLER.forWeek bulunamadı.');
assert.ok(M && typeof M.render === 'function', 'MATEMATIK_MATH.render bulunamadı.');
assert.ok(content && Array.isArray(content.weeks), 'MATEMATIK_CONTENT.weeks bulunamadı.');
assert.ok(KITAP && KITAP.weeks, 'MATEMATIK_KITAP (kitabın bölüm akışı) bulunamadı.');

const EXPECTED_DATES = [
  '14–18 Eyl', '21–25 Eyl', '28 Eyl–2 Eki', '5–9 Eki', '12–16 Eki', '19–23 Eki',
  '26–30 Eki', '2–6 Kas', '9–13 Kas', '23–27 Kas', '30 Kas–4 Ara', '7–11 Ara',
  '14–18 Ara', '21–25 Ara', '28–31 Ara',
];

// 2. Hafta yapısı
assert.equal(content.weeks.length, 15, 'Matematik 15 hafta olmalı.');
const themes = new Map(content.themes.map((theme) => [theme.id, theme]));
assert.equal(themes.size, 4, 'Dört tema tanımlı olmalı.');

content.weeks.forEach((week, index) => {
  const expectedId = index + 1;
  assert.equal(week.id, expectedId, `Hafta ${expectedId} sırası bozuk.`);
  assert.equal(week.date, EXPECTED_DATES[index], `Hafta ${week.id} tarihi takvimle uyuşmuyor: ${week.date}`);
  assert.ok(themes.has(week.theme), `Hafta ${week.id} geçersiz tema: ${week.theme}`);
  assert.ok(week.topic && week.topic.length > 5, `Hafta ${week.id} konusu eksik.`);

  // Konu anlatımı + çözümlü örnekler birlikte sayılır: metin belirgin biçimde derin olmalı.
  const prose = [...week.summary,
    ...week.examples.flatMap((item) => [...item.steps, item.answer])];
  const words = prose.join(' ').split(/\s+/).filter(Boolean).length;
  assert.ok(words >= 320, `Hafta ${week.id} konu anlatımı çok kısa (${words} kelime).`);
  assert.ok(words <= 800, `Hafta ${week.id} konu anlatımı çok uzun (${words} kelime).`);
  assert.ok(week.summary.length >= 4, `Hafta ${week.id} en az dört paragraf içermeli.`);

  // Her haftada en az iki çözümlü örnek, numaralı adımlar ve sonuç satırı olmalı.
  assert.ok(Array.isArray(week.examples) && week.examples.length >= 2,
    `Hafta ${week.id} en az iki çözümlü örnek içermeli.`);
  week.examples.forEach((item, exampleIndex) => {
    assert.ok(item.title && item.title.length > 3, `Hafta ${week.id} ${exampleIndex + 1}. örnek başlığı eksik.`);
    assert.ok(Array.isArray(item.steps) && item.steps.length >= 3,
      `Hafta ${week.id} ${exampleIndex + 1}. örnek adımları eksik.`);
    assert.ok(item.answer && item.answer.length > 1, `Hafta ${week.id} ${exampleIndex + 1}. örnek sonucu eksik.`);
  });

  assert.ok(week.points.length >= 3 && week.points.length <= 5, `Hafta ${week.id} ana nokta sayısı 3–5 olmalı.`);
  assert.ok(week.terms.length >= 3 && week.terms.length <= 4, `Hafta ${week.id} kavram sayısı 3–4 olmalı.`);
  week.terms.forEach((item) => {
    assert.ok(item.word && item.definition && item.definition.length > 15, `Hafta ${week.id} kavram tanımı eksik.`);
  });
  assert.ok(!Array.isArray(week.tasks) || week.tasks.length === 0,
    `Hafta ${week.id} görev listesi kaldırıldı; görevler etkinlik sorusu olarak yazılır.`);

  // Terimler tek tek anlatılır: her terimin tanımı, yeri ve çoğunda şekli olur.
  week.terms.forEach((item) => {
    assert.ok(item.definition && item.definition.length > 15, `Hafta ${week.id} terim tanımı zayıf: ${item.word}`);
    assert.ok(typeof item.where === 'string', `Hafta ${week.id} teriminde “nerede” alanı yok: ${item.word}`);
    if (item.visual) {
      assert.ok(FIG.types().includes(item.visual), `Hafta ${week.id} bilinmeyen terim şekli: ${item.visual}`);
      assert.ok(FIG.render(item.visual, {}).includes('<svg'), `Hafta ${week.id} terim şekli çizilemedi: ${item.word}`);
    }
  });
  assert.ok(week.terms.filter((item) => item.visual).length >= 2,
    `Hafta ${week.id} en az iki terim şekli göstermeli.`);
  assert.ok(week.checks.length === 2, `Hafta ${week.id} iki kısa kontrol sorusu içermeli.`);
  week.checks.forEach((item, checkIndex) => {
    assert.equal(item.options.length, 3, `Hafta ${week.id} ${checkIndex + 1}. soruda üç seçenek olmalı.`);
    assert.ok(item.correct >= 0 && item.correct < 3, `Hafta ${week.id} doğru şık indeksi hatalı.`);
    assert.ok(item.hint && item.hint.length > 15, `Hafta ${week.id} ${checkIndex + 1}. soruda ipucu zayıf.`);
    assert.ok(item.explain && item.explain.length > 20, `Hafta ${week.id} ${checkIndex + 1}. soruda açıklama zayıf.`);
  });
});

// 2b. Matematik dizgisi: düz metin kesir yok, dengeli $ ve {} var
const studentStrings = content.weeks.flatMap((week) => [
  ...week.summary, ...week.points,
  ...week.terms.map((item) => `${item.word} ${item.definition}`),
  ...week.examples.flatMap((item) => [item.title, ...item.steps, item.answer]),
  ...week.checks.map((item) => `${item.prompt} ${item.options.join(' ')} ${item.hint} ${item.explain}`),
  ...(week.scene ? [week.scene.title, week.scene.hint] : []),
]);
assert.ok(studentStrings.length > 300, 'Öğrenci metinleri eksik.');
studentStrings.forEach((text) => {
  const problems = M.lint(text);
  assert.equal(problems.length, 0, `Dizgi hatası (${problems.join(', ')}): ${text.slice(0, 60)}`);
  const rendered = M.render(text);
  assert.ok(!rendered.includes('$'), `Eşleşmeyen $ işareti: ${text.slice(0, 60)}`);
  assert.ok(!/\\[a-zA-Z]/.test(rendered), `Çözülemeyen TeX komutu kaldı: ${text.slice(0, 60)}`);
});

// Düz metin kesir yazımı (2/3 gibi) kabul edilmez; $ içinde \frac kullanılmalı.
const flatFraction = studentStrings.filter((text) => /(^|[^\d/])\d+\s*\/\s*\d+([^\d/]|$)/.test(text));
assert.equal(flatFraction.length, 0, `Düz metin kesir kullanılmış: ${flatFraction.slice(0, 2).join(' | ')}`);
const typedFraction = studentStrings.filter((text) => text.includes('\\frac')).length;
assert.ok(typedFraction >= 40, `Dizgiyle yazılmış kesir sayısı az (${typedFraction}).`);

// Doğru şıklar tek konumda toplanmamalı.
const correctPositions = new Set(content.weeks.flatMap((week) => week.checks.map((item) => item.correct)));
assert.ok(correctPositions.size >= 2, 'Doğru seçenekler tek konumda toplanmamalı.');

// 3. Öğrenci metninde kitap/sayfa atfı olmamalı
const studentText = content.weeks.map((week) => [
  ...week.summary, ...week.points,
  ...week.terms.map((item) => `${item.word} ${item.definition}`),
  ...week.checks.map((item) => `${item.prompt} ${item.options.join(' ')} ${item.hint} ${item.explain}`),
].join(' ')).join(' ');
assert.ok(!/\bs\.\s?\d/.test(studentText), 'Öğrenci metninde sayfa atfı olmamalı.');
assert.ok(!/ders kitab[ıi]/i.test(studentText), 'Öğrenci metninde ders kitabı atfı olmamalı.');

// 4. Etkileşimli sahneler: birinci taraf SVG motoru (GeoGebra'ya bağımlı değil)
const sceneWeeks = content.weeks.filter((week) => (week.scenes || []).length);
assert.equal(sceneWeeks.length, 15, 'On beş haftanın hepsinde etkileşimli sahne olmalı.');
const allScenes = sceneWeeks.flatMap((week) => week.scenes.map((scene) => ({ week, scene })));
assert.ok(allScenes.length >= 16, `Sahne sayısı az: ${allScenes.length}`);
const sahneTypes = new Set(SAHNE.types());
allScenes.forEach(({ week, scene }) => {
  assert.ok(sahneTypes.has(scene.type), `Hafta ${week.id} bilinmeyen sahne türü: ${scene.type}`);
  assert.ok(scene.title && scene.title.length > 5, `Hafta ${week.id} sahne başlığı eksik.`);
  assert.ok(scene.hint && scene.hint.length > 15, `Hafta ${week.id} sahne ipucu zayıf.`);
  assert.ok(!('commands' in scene) && !('app' in scene),
    `Hafta ${week.id} sahnesi hâlâ GeoGebra komutu kullanıyor; yerel çizim olmalı.`);
  const defaults = new Map(SAHNE.params(scene.type).map((param) => [param.name, param]));
  const params = scene.params || [];
  assert.ok(params.length >= 1, `Hafta ${week.id} sahnesinde oynanabilir parametre olmalı.`);
  params.forEach((param) => {
    assert.ok(defaults.has(param.name), `Hafta ${week.id} ${scene.type} sahnesinde tanımsız parametre: ${param.name}`);
    const base = defaults.get(param.name);
    assert.ok(Number.isFinite(param.min) && Number.isFinite(param.max) && Number.isFinite(param.step),
      `Hafta ${week.id} sürgü tanımı hatalı: ${param.name}`);
    assert.ok(param.min <= base.min && param.max <= base.max && param.min >= base.min,
      `Hafta ${week.id} sürgü aralığı sahne sınırlarını aşıyor: ${param.name}`);
    assert.ok(param.value >= param.min && param.value <= param.max,
      `Hafta ${week.id} sürgü değeri aralık dışında: ${param.name}`);
    assert.ok(param.label && param.label.length > 2, `Hafta ${week.id} sürgü etiketi eksik: ${param.name}`);
  });
});
// Kitabın kendi KATIL-UYGULA-KEŞFET sahneleri de sahne motorunun sınırlarına uymalı;
// sürgü aralığı sahnenin dışına taşarsa çizim tuvalden çıkar ("sayılar sapıtıyor").
const bookScenes = [];
Object.keys(KITAP.weeks).forEach((key) => {
  (KITAP.weeks[key].stages || []).forEach((stage) => {
    if (stage.scene) bookScenes.push({ key, scene: stage.scene });
  });
});
assert.ok(bookScenes.length >= 15, `Kitap akışında etkileşimli sahne az: ${bookScenes.length}`);
bookScenes.forEach(({ key, scene }) => {
  assert.ok(sahneTypes.has(scene.type), `${key} sahnesi bilinmeyen tür: ${scene.type}`);
  const base = new Map(SAHNE.params(scene.type).map((param) => [param.name, param]));
  const params = scene.params || [];
  assert.ok(params.length >= 1, `${key} ${scene.type} sahnesinde oynanabilir parametre olmalı.`);
  params.forEach((param) => {
    const def = base.get(param.name);
    assert.ok(def, `${key} ${scene.type} sahnesinde tanımsız parametre: ${param.name}`);
    assert.ok(param.min >= def.min && param.max <= def.max,
      `${key} ${scene.type} sürgü aralığı sahne sınırlarını aşıyor: ${param.name}`);
    assert.ok(param.value >= param.min && param.value <= param.max,
      `${key} ${scene.type} sürgü değeri aralık dışında: ${param.name}`);
    assert.ok(!/\$/.test(param.label || ''), `${key} ${scene.type} sürgü etiketi dizgi işareti içermemeli.`);
  });
});
const sceneTypeList = new Set(allScenes.map((item) => item.scene.type));
assert.ok(sceneTypeList.size >= 16, `Sahne çeşitliliği az: ${sceneTypeList.size} farklı sahne.`);
// Katıl-Uygula-Keşfet: her haftada sahne var ve sahne sahnenin sorularıyla aynı konuyu anlatıyor.
const exploreStages = [];
Object.keys(KITAP.weeks).forEach((key) => {
  (KITAP.weeks[key].stages || []).forEach((stage) => {
    if (stage.kind === 'explore') exploreStages.push({ week: key, stage });
  });
});
assert.equal(exploreStages.length, 15, `On beş haftada katıl-uygula bölümü olmalı: ${exploreStages.length}`);
exploreStages.forEach(({ week, stage }) => {
  assert.ok(stage.scene && stage.scene.type, `h${week} katıl-uygula sahnesi eksik.`);
  assert.ok(SAHNE.types().includes(stage.scene.type), `h${week} sahnesi tanınmıyor: ${stage.scene.type}`);
  assert.ok((stage.steps || []).length >= 2, `h${week} katıl-uygula bölümünde en az iki adım olmalı.`);
  (stage.steps || []).forEach((step, index) => {
    assert.ok(step.prompt && step.hint, `h${week} katıl-uygula ${index + 1}. adımında soru veya ipucu eksik.`);
  });
  assert.ok((stage.intro || []).length >= 1, `h${week} katıl-uygula bölümünde giriş cümlesi olmalı.`);
});

// 4b. Etkinlikler: kitabın bölüm soruları, zorunlu açıklama + yapay zekâ değerlendirmesi
const allActivities = content.weeks.flatMap((week) => ACT.forWeek(week.id).map((activity) => ({ week, activity })));
assert.ok(allActivities.length >= 150, `Etkinlik (soru) sayısı az: ${allActivities.length}`);
content.weeks.forEach((week) => {
  const list = ACT.forWeek(week.id);
  assert.ok(list.length >= 6, `Hafta ${week.id} en az altı açıklamalı soru içermeli (${list.length}).`);
});
const activityIds = new Set();
allActivities.forEach(({ week, activity }) => {
  assert.ok(!activityIds.has(activity.id), `Etkinlik kimliği tekrar ediyor: ${activity.id}`);
  activityIds.add(activity.id);
  assert.ok(activity.section && activity.title, `Hafta ${week.id} etkinliğinde bölüm/başlık eksik: ${activity.id}`);
  assert.ok(activity.prompt && activity.prompt.length > 8, `${activity.id} soru kökü eksik.`);
  assert.ok(activity.hint && activity.hint.length > 8, `${activity.id} ipucu eksik.`);
  assert.ok(activity.thinking && activity.thinking.length > 3, `${activity.id} model cevap (değerlendirme için) eksik.`);
  assert.ok(activity.minChars >= 40, `${activity.id} açıklama alt sınırı çok düşük.`);
  assert.ok(Array.isArray(activity.rubric) && activity.rubric.length >= 2, `${activity.id} ölçüt listesi eksik.`);
  assert.ok(!activity.options, `${activity.id} çoktan seçmeli seçenek taşımamalı; etkinlik = yazılı soru.`);
  assert.ok(!('correct' in activity), `${activity.id} doğru şık saklamamalı; cevap anahtarı gösterilmez.`);
  // Öğrenciye gösterilen metinlerde dizgi hatası ve sayfa atfı olmamalı.
  [activity.prompt, activity.hint, ...activity.rubric].forEach((text) => {
    assert.equal(M.lint(text).length, 0, `${activity.id} dizgi hatası: ${text.slice(0, 50)}`);
    assert.ok(!/\bs\.\s?\d/.test(text), `${activity.id} sayfa atfı içeriyor.`);
    assert.ok(!/ders kitab[ıi]/i.test(text), `${activity.id} kitap atfı içeriyor.`);
    assert.ok(!/\d+\s*\/\s*\d+/.test(text), `${activity.id} düz metin kesir içeriyor.`);
  });
  if (activity.figure) {
    assert.ok(FIG.types().includes(activity.figure.type), `${activity.id} bilinmeyen şekil: ${activity.figure.type}`);
    assert.ok(FIG.render(activity.figure.type, activity.figure.options || {}).includes('<svg'),
      `${activity.id} şekli çizilemedi.`);
  }
  if (activity.scene) {
    assert.ok(sahneTypes.has(activity.scene.type), `${activity.id} bilinmeyen sahne türü: ${activity.scene.type}`);
    const defaults = new Map(SAHNE.params(activity.scene.type).map((param) => [param.name, param]));
    (activity.scene.params || []).forEach((param) => {
      assert.ok(defaults.has(param.name), `${activity.id} tanımsız sahne parametresi: ${param.name}`);
      assert.ok(param.value >= param.min && param.value <= param.max, `${activity.id} sürgü değeri aralık dışında: ${param.name}`);
    });
  }
});
// Geometri temasında her hafta en az bir sahnede 3B cisim incelenir; sorular şekilsiz kalmaz.
content.weeks.filter((week) => week.theme === 'geometri').forEach((week) => {
  const stages = KITAP.weeks[week.id].stages;
  const withVisual = stages.filter((stage) => stage.scene
    || stage.figure
    || (stage.blocks || []).some((block) => block.scene || block.figure));
  assert.ok(withVisual.length >= 2, `Hafta ${week.id} geometri haftası ama sahne/şekil yok.`);
});

// 4c. Kitabın bölüm zinciri: her hafta aynı sırayı izlemeli
const STAGE_ORDER = ['warmup', 'start', 'learn', 'discuss', 'explore', 'practice', 'problem'];
const STAGE_LABEL = { warmup: 'NELER BİLİYORUZ?', start: 'BAŞLAYALIM', learn: 'ÖĞRENELİM', discuss: 'DÜŞÜN-TARTIŞ-AÇIKLA', explore: 'KATIL-UYGULA-KEŞFET', practice: 'UYGULAYALIM', problem: 'PROBLEM' };
assert.equal(Object.keys(KITAP.weeks).length, 15, 'Kitap akışı 15 hafta içermeli.');
content.weeks.forEach((week) => {
  const book = KITAP.weeks[week.id];
  assert.ok(book, `Hafta ${week.id} kitap akışında yok.`);
  assert.ok(book.bookTopic && book.bookTopic.length > 5, `Hafta ${week.id} kitap konusu eksik.`);
  assert.ok(Array.isArray(book.stages) && book.stages.length === 7,
    `Hafta ${week.id} yedi bölüm içermeli (${(book.stages || []).length}).`);
  book.stages.forEach((stage, index) => {
    assert.equal(stage.kind, STAGE_ORDER[index], `Hafta ${week.id} ${index + 1}. bölüm sırası bozuk: ${stage.kind}`);
    assert.ok(STAGE_LABEL[stage.kind], `Hafta ${week.id} bilinmeyen bölüm: ${stage.kind}`);
    assert.ok(stage.title && stage.title.length > 3, `Hafta ${week.id} ${index + 1}. bölüm başlığı eksik.`);
  });
  const learn = book.stages[2];
  assert.ok(Array.isArray(learn.blocks) && learn.blocks.length >= 2, `Hafta ${week.id} ÖĞRENELİM bölümü sığ.`);
  assert.ok(Array.isArray(learn.boxes) && learn.boxes.length >= 2, `Hafta ${week.id} bilgi kutusu eksik.`);
  assert.ok(Array.isArray(learn.checks) && learn.checks.length >= 1, `Hafta ${week.id} ÖĞRENELİM kontrol sorusu yok.`);
  const problem = book.stages[6];
  assert.ok(Array.isArray(problem.steps) && problem.steps.length >= 4,
    `Hafta ${week.id} PROBLEM bölümü anla-planla-çöz-kontrol adımlarını içermeli.`);
  // Sahne ve şekil türleri gerçek motorlarla çizilebilmeli.
  book.stages.forEach((stage) => {
    const specs = [stage.scene, stage.figure, ...(stage.blocks || []).flatMap((block) => [block.scene, block.figure])].filter(Boolean);
    specs.forEach((spec) => {
      if (spec.type && SAHNE.types().includes(spec.type)) {
        (spec.params || []).forEach((param) => {
          const defaults = new Map(SAHNE.params(spec.type).map((item) => [item.name, item]));
          assert.ok(defaults.has(param.name), `Hafta ${week.id} ${spec.type} sahnesinde tanımsız parametre: ${param.name}`);
        });
      } else if (spec.type) {
        assert.ok(FIG.types().includes(spec.type), `Hafta ${week.id} bilinmeyen görsel türü: ${spec.type}`);
      }
    });
  });
});
// Performans görevi beş haftada, tema ölçme iki temada bulunur.
const perfWeeks = Object.values(KITAP.weeks).filter((book) => book.performance);
assert.equal(perfWeeks.length, 5, `Performans görevi beş haftada olmalı (${perfWeeks.length}).`);
perfWeeks.forEach((book) => {
  assert.ok(book.performance.tasks.length >= 3 && book.performance.criteria.length >= 2,
    `Performans görevi eksik: ${book.performance.title}`);
});
const examWeeks = Object.values(KITAP.weeks).filter((book) => book.exam);
assert.ok(examWeeks.length >= 2, 'Tema ölçme bölümü en az iki temada olmalı.');
examWeeks.forEach((book) => {
  assert.ok(book.exam.items.every((item) => typeof item === 'object' && item.prompt && item.thinking),
    `Tema ölçme soruları model cevaplı olmalı: ${book.exam.title}`);
  assert.ok(book.exam.items.every((item) => item.thinking.length > 3), `Tema ölçme model cevabı eksik: ${book.exam.title}`);
});


// 4d. Sıfır/dizgi/etkinlik motoru ayrıntıları
const allStudentText = [
  ...content.weeks.flatMap((week) => [...week.summary, ...week.points]),
  ...Object.values(KITAP.weeks).flatMap((book) => book.stages.flatMap((stage) => [
    ...(stage.context || []), ...(stage.intro || []), stage.title,
    ...(stage.blocks || []).flatMap((block) => [block.heading, ...block.paragraphs]),
    ...(stage.questions || stage.items || stage.steps || stage.checks || []).map((item) => `${item.prompt || item.body || ''}`),
  ])),
].join(' ');
// Matematik dizgisinde desteklenmeyen komut kullanılmamalı (\mathbb gibi).
assert.ok(!/\\mathbb/.test(allStudentText), 'Desteklenmeyen TeX komutu (\\mathbb) öğrenci metninde olmamalı.');
assert.ok(!/\$\s*\\\{/.test(allStudentText), 'Kaçışlı süslü parantez dizgiyi bozar.');
// Sıfırın anlamları ve doğal sayılar açıkça anlatılmalı.
const week1Text = JSON.stringify(KITAP.weeks[1].stages);
assert.ok(/doğal sayı/i.test(week1Text), 'Birinci haftada doğal sayılar anlatılmalı.');
assert.ok(/başlangıç noktası/i.test(week1Text) && /yokluk/i.test(week1Text),
  'Sıfırın yokluk ve başlangıç noktası anlamları birlikte anlatılmalı.');
// Her haftada terim görselleri birbirinden farklı olmalı.
content.weeks.forEach((week) => {
  const visuals = week.terms.map((item) => item.visual).filter(Boolean);
  assert.equal(new Set(visuals).size, visuals.length,
    `Hafta ${week.id} terimlerinde aynı görsel tekrar ediyor: ${visuals.join(', ')}`);
});
// Etkinlik kartında tek kontrol düğmesi vardır ve doğrudan yapay zekâya gider.
const etkinlikMotoru = read('matematik-etkinlik.js');
assert.ok(/data-math-etkinlik-check/.test(etkinlikMotoru), 'Etkinlikte “Kontrol et” düğmesi olmalı.');
assert.ok(!/data-math-etkinlik-ai/.test(etkinlikMotoru), 'Ayrı “yapay zekâ ile değerlendir” düğmesi kaldırılmalı.');
assert.ok(/await askAI\(activity, entry\)/.test(etkinlikMotoru), 'Kontrol et düğmesi yapay zekâ değerlendirmesini çağırmalı.');
assert.ok(/localVerdict\(activity, entry\)/.test(etkinlikMotoru), 'Anahtar yokken yerel kontrole düşülmeli.');
// Açıklama ölçüsü soruya göre değişmeli; kural ezberi isteyen kalıp geri gelmemeli.
const feedbackLines = (etkinlikMotoru.match(/feedback[^\n]*/g) || []).filter((line) => !/[Aa]SLA|yasak/.test(line));
assert.ok(feedbackLines.every((line) => !/kural/i.test(line)),
  'Etkinlik geri bildirimi kural ezberi istememeli.');
assert.ok(/REASON_FEEDBACK/.test(etkinlikMotoru), 'Gerekçe isteği soru türüne göre yazılmalı.');
const reasonTypes = new Set(['karar', 'gerekce', 'islem', 'sonuc']);
const everyActivity = [];
for (let week = 1; week <= 15; week += 1) everyActivity.push(...ACT.forWeek(week));
assert.ok(everyActivity.length >= 150, `Etkinlik sayısı az: ${everyActivity.length}`);
everyActivity.forEach((activity) => {
  assert.ok(reasonTypes.has(activity.reason), `${activity.id} için gerekçe türü tanımsız.`);
  assert.ok(typeof activity.reasonHint === 'string' && activity.reasonHint.length > 20,
    `${activity.id} için beklenen açıklama ölçüsü yazılmalı.`);
  assert.ok(!/(hangi kural|kural[ıi]n[ıi] yaz|kural[ıi] kullan)/i.test(activity.reasonHint),
    `${activity.id} açıklama ölçüsü kural adı istememeli.`);
  assert.ok(activity.rubric.every((item) => !/hangi kuralı|kuralın neden/i.test(item)),
    `${activity.id} ölçütü kural ezberi istememeli.`);
});
// Karar soruları (eşit mi, hangisi büyük, katılıyor musun) “karar” türünde olmalı.
const decisionPrompt = everyActivity.find((activity) => /katılıyor|eşit mi|hangisi büyük/i.test(activity.prompt));
assert.ok(decisionPrompt && decisionPrompt.reason === 'karar',
  'Karar sorularında beklenen açıklama “karar + gerekçe” olmalı.');
// Konu anlatımı kartı haftanın başında geri gelmeli.
assert.ok(/Konu anlatımı/.test(read('matematik.js')) && /math-summary/.test(read('matematik.js')),
  'Hafta başında konu anlatımı kartı olmalı.');
// Aynı haftada iki etkinlik aynı sahneyi kullanamaz; her etkinlik kendi görselini kurar.
Object.values(KITAP.weeks).forEach((book) => {
  const weekId = book.id;
  const scenes = book.stages.flatMap((stage) => [
    stage.scene ? { type: stage.scene.type, label: stage.title } : null,
    ...(stage.blocks || []).map((block) => (block.scene ? { type: block.scene.type, label: block.heading } : null)),
  ]).filter(Boolean);
  const used = new Map();
  scenes.forEach((item) => {
    assert.ok(!used.has(item.type),
      `Hafta ${weekId} aynı sahneyi iki etkinlikte kullanıyor: ${item.type} (“${used.get(item.type)}” ve “${item.label}”).`);
    used.set(item.type, item.label);
  });
});
// Soruda/metinde geçen sayılar sahnede işaretli olmalı: sayı doğrusu sahnelerinin
// varsayılan değerleri, yanındaki metinde geçen sayılarla aynı olmalı.
const TEXT_ONLY = new Set(['sayi-dogrusu', 'iki-sayi', 'sicaklik']);
Object.values(KITAP.weeks).forEach((book) => {
  book.stages.forEach((stage) => {
    const pairs = [];
    if (stage.scene) pairs.push({ spec: stage.scene, text: [stage.title, ...(stage.intro || []), ...(stage.steps || []).flatMap((step) => [step.prompt, step.hint, step.thinking])].join(' ') });
    (stage.blocks || []).forEach((block) => {
      if (block.scene) pairs.push({ spec: block.scene, text: [block.heading, ...block.paragraphs].join(' ') });
    });
    pairs.filter((item) => TEXT_ONLY.has(item.spec.type)).forEach((item) => {
      const numbers = new Set((item.text.replace(/\$/g, ' ').replace(/\\[a-zA-Z]+/g, ' ').match(/-?\d+/g) || []).map(Number));
      (item.spec.params || []).forEach((param) => {
        assert.ok(numbers.has(Number(param.value)),
          `Hafta ${book.id} ${item.spec.type} sahnesinde ${param.name}=${param.value} işaretli ama metinde bu sayı geçmiyor.`);
      });
    });
  });
});
// Sahne türleri: iki sayıyı birlikte gösteren ve toplama yolunu gösteren sahneler bulunmalı.
assert.ok(SAHNE.types().includes('iki-sayi'), 'İki noktayı birlikte gösteren sahne bulunmalı.');
assert.ok(SAHNE.types().includes('sicaklik'), 'Negatif ve pozitif sıcaklıkları birlikte okuyan sahne bulunmalı.');
assert.ok(SAHNE.types().includes('sifir-toplama'), 'Toplayarak sıfıra ulaşma sahnesi bulunmalı.');

// 4e. Geometrik nicelikler: her bilgi kutusu kendi bloğu, görseli ve sorusuyla eşleşmeli.
// Aynı sahnenin hafta içinde ikinci kez kullanılması yasak (yukarıda); burada kutuların
// sahnesiz kalmaması ve görsel türlerinin çeşitlenmesi aranır.
const GEOMETRY_BOX_WEEKS = [8, 9, 10, 11];
GEOMETRY_BOX_WEEKS.forEach((id) => {
  const learn = KITAP.weeks[id].stages[2];
  assert.ok(Array.isArray(learn.boxes) && learn.boxes.length >= 3,
    `Hafta ${id} bilgi kutuları eksik.`);
  const kinds = new Set();
  learn.boxes.forEach((box) => {
    const block = (learn.blocks || []).find((item) => String(item.heading || '').startsWith(box.title));
    assert.ok(block, `Hafta ${id} “${box.title}” bilgi kutusunun kendi bloğu yok.`);
    const spec = block.scene || block.figure;
    assert.ok(spec && spec.type, `Hafta ${id} “${box.title}” bloğunda sahne ya da şekil yok.`);
    kinds.add(`${block.scene ? 'scene' : 'figure'}:${spec.type}`);
  });
  assert.ok(kinds.size >= 3, `Hafta ${id} bilgi kutularında görsel çeşitliliği az: ${[...kinds].join(', ')}`);
  assert.ok((learn.checks || []).length >= learn.boxes.length,
    `Hafta ${id} her bilgi kutusuna en az bir kontrol sorusu düşmeli.`);
});

// 4f. Birim küpler tek tek sayılabilmeli ve düzensiz görünüm GeoGebra sahnesinde olmalı.
const sahneSource = read('matematik-sahne.js');
assert.ok(/stackHeights/.test(sahneSource) && /viewPanels/.test(sahneSource),
  'Düzensiz yığın görünümleri yükseklik tablosundan üretilmeli.');
assert.ok(/\b0, 0, 0\b|\], \[0, 0, 0\]|0\]\]/.test(sahneSource) || /STACK_PATTERNS/.test(sahneSource),
  'Düzensiz yığın desenleri boşluk (0) içermeli.');
const stackUses = [];
Object.keys(KITAP.weeks).forEach((key) => {
  (KITAP.weeks[key].stages || []).forEach((stage) => {
    if (stage.scene) stackUses.push({ key, type: stage.scene.type, where: stage.title });
    (stage.blocks || []).forEach((block) => {
      if (block.scene) stackUses.push({ key, type: block.scene.type, where: block.heading });
    });
  });
});
assert.ok(stackUses.some((item) => item.type === 'duzensiz-yigin' && Number(item.key) === 8),
  'Görünüm haftasında düzensiz küp yığını sahnesi olmalı.');
assert.ok(stackUses.some((item) => item.type === 'bilesik-hacim'),
  'Bileşik cisim sahnesi hacim haftalarında kullanılmalı.');
assert.ok(/numaralanır|Numaralar/.test(sahneSource),
  'Birim küpler numaralanmalı; hacim tek blok olarak gösterilmemeli.');

// 5. Uygulama tarafı
const app = read('matematik.js');
const html = read('index.html');
const css = read('matematik.css');

// Etkinlik kartı sade: uzun yönerge, ölçüt listesi ve tekrar eden açıklama olmamalı.
assert.ok(!/activity-instruction/.test(etkinlikMotoru), 'Kartta uzun yönerge paragrafı olmamalı.');
assert.ok(!/math-etkinlik-rubric/.test(etkinlikMotoru), 'Ölçüt listesi kartta tekrar edilmemeli.');
assert.ok(!/math-etkinlik-instruction|activity-meta/.test(etkinlikMotoru), 'Kartta gereksiz meta satırı olmamalı.');
assert.ok(/math-etkinlik-qtext/.test(etkinlikMotoru), 'Soru metni tek blokta olmalı (legend flex satır kırıyordu).');
assert.ok(/placeholder="Sonucu ve gerekçeni yaz…"/.test(etkinlikMotoru), 'Yazma alanının yer tutucusu kısa olmalı.');
assert.ok(!/<label for="mathEtkinlikText/.test(etkinlikMotoru), 'Yer tutucu varken ikinci açıklama etiketi olmamalı.');
assert.ok(/aria-label="Cevabın ve kısa gerekçen"/.test(etkinlikMotoru), 'Yazma alanı erişilebilir ad taşımalı.');
// Çözüm doğrudan görünmemeli, “Cevabı göster” ile açılmalı.
assert.ok(/details class="math-solution"/.test(read('matematik.js')), 'Çözüm “Cevabı göster” paneli içinde olmalı.');
assert.ok(/summary>Cevabı göster</.test(read('matematik.js')), 'Panelin düğmesi “Cevabı göster” olmalı.');
assert.ok(!/details class="math-solution" open/.test(read('matematik.js')), 'Çözüm kapalı gelmeli.');
assert.ok(/\.math-solution/.test(css), 'Çözüm paneli stili tanımlı olmalı.');
// Terim şekillerinde yazı okunaklı olmalı (11 puntodan küçük etiket yok).
FIG.types().forEach((type) => {
  const svg = FIG.render(type, {});
  const sizes = [...svg.matchAll(/font-size="([\d.]+)"/g)].map((match) => Number(match[1]));
  const smallest = Math.min(...sizes);
  assert.ok(smallest >= 10.9, `${type} şeklinde yazı çok küçük: ${smallest} punto.`);
});
assert.ok(/minmax\(300px,1fr\)/.test(css), 'Terim kartları yeterince geniş olmalı (görsel küçülmesin).');

assert.ok(/id="mathWorkspace"/.test(html), 'index.html matematik çalışma alanını içermeli.');
assert.ok(/id="mathWeekList"/.test(html), 'Hafta listesi kapsayıcısı bulunmalı.');
assert.ok(/id="mathWeekContent"/.test(html), 'Hafta içeriği kapsayıcısı bulunmalı.');
assert.ok(/matematik-content\.js/.test(html) && /matematik\.js/.test(html), 'Matematik scriptleri index.html içinde olmalı.');
assert.ok(html.indexOf('matematik-math.js') >= 0 && html.indexOf('matematik-math.js') < html.indexOf('matematik-content.js'),
  'Dizgi motoru içerikten önce yüklenmeli.');
assert.ok(/matematik\.css/.test(html), 'Matematik stil dosyası bağlanmalı.');
assert.ok(/isMath/.test(html), 'Ders seçimi matematik alanını göstermeli.');
assert.ok(!/data-subject="matematik"[\s\S]{0,120}Yakında/.test(html), 'Matematik düğmesi artık “Yakında” olmamalı.');
assert.ok(/<b>1\. Sınav:<\/b> <strong>5 Kasım 2026<\/strong>/.test(html), 'Matematik 1. sınav kartı 5 Kasım 2026 olmalı.');
assert.ok(/<b>2\. Sınav:<\/b> <strong>tahmini 4–8 Ocak 2027<\/strong>/.test(html), 'Matematik 2. sınav kartı tahmini tarih olmalı.');

assert.ok(/5 Kasım 2026/.test(app), 'Uygulama sınav tarihini bilmeli.');
assert.ok(/emr7lect\.matematik\.v1/.test(app), 'İlerleme ayrı anahtarda saklanmalı.');
assert.ok(/MATEMATIK_SAHNE2/.test(app), 'Uygulama yerel sahne motorunu kullanmalı.');
assert.ok(/MATEMATIK_GEOGEBRA/.test(app) && /MATEMATIK_SAHNE2/.test(app),
  'Uygulama sahneleri GeoGebra ile açmalı, yerel motor yedek kalmalı.');
assert.ok(/if \(canGeo && GG\.prefers\(\)\) mountGeo\(\)/.test(app),
  'GeoGebra destekli sahnelerde applet açılmalı; yerel çizim yedek.');
assert.ok(/MATEMATIK_GEOGEBRA\.supports\(scene\)/.test(app),
  'GeoGebra yalnız desteklediği (3B) sahnelerde kullanılmalı.');
/* Çözüm adımları ile etkinlik soruları karışmamalı: numara boş kalmaz. */
assert.ok(/\.filter\(\(step\) => step && step\.title && step\.body\)/.test(app),
  'Çözüm adımları yalnız başlık + gövde taşıyanlardan seçilmeli.');
assert.ok(/item && item\.prompt/.test(read('matematik-etkinlikler.js')),
  'KATIL-UYGULA adımları soru olarak etkinliğe dönüşmeli.');
assert.ok(/matematik-sahne\.js/.test(html), 'index.html yerel sahne motorunu yüklemeli.');
assert.ok(html.indexOf('matematik-sahne.js') < html.indexOf('matematik.js'),
  'Sahne motoru uygulamadan önce yüklenmeli.');
assert.ok(/matematik-geogebra\.js/.test(html), 'index.html GeoGebra köprüsünü yüklemeli.');
assert.ok(html.indexOf('matematik-sahne.js') < html.indexOf('matematik-geogebra.js')
  && html.indexOf('matematik-geogebra.js') < html.indexOf('matematik.js'),
  'Sıra: yerel sahne motoru → GeoGebra köprüsü → uygulama.');
assert.ok(!/youtube\.com|youtu\.be/.test(app + css), 'Matematik alanında YouTube bağlantısı olmamalı.');
assert.ok(/math-week-content\{display:grid/.test(css), 'Hafta içeriği ızgara yerleşimi tanımlı olmalı.');
assert.ok(/\.math-scene-svg\{/.test(css), 'Yerel sahne SVG stili tanımlı olmalı.');
assert.ok(/\.math-scene-stage\{/.test(css), 'Sahne çizim alanı stili tanımlı olmalı.');
assert.ok(/\.scene-slider\{/.test(css), 'Sahne sürgü bandı stili tanımlı olmalı.');
assert.ok(/\.m-frac\{/.test(css) && /\.m-num\{/.test(css) && /\.m-den\{/.test(css) && /\.m-radicand\{/.test(css),
  'Dizgi sınıflarının stilleri tanımlı olmalı.');
assert.ok(/\.math-scene-frame\{display:flex;flex-direction:column/.test(css),
  'Sahne çerçevesi dikey yerleşimde olmalı: çizim üstte, giriş bandı altta.');
assert.ok(/\.math-scene-controls\{flex:0 0 auto/.test(css),
  'Yedek sürgü paneli sahnenin altında kalmalı.');
assert.ok(/\.math-example\{/.test(css) && /\.math-example-steps\{/.test(css), 'Çözümlü örnek kartı stilleri tanımlı olmalı.');
assert.ok(/math-scene-controls/.test(app), 'Sürgü bandı sahnenin altında tanımlı olmalı.');
assert.ok(/math-scene-frame/.test(app) && /math-scene-frame/.test(css), 'Sahne çerçevesi (çizim + giriş bandı) tanımlı olmalı.');
assert.ok(/math-etkinlik-list|mathQuestions-/.test(app), 'Etkinlik bölümü hafta içeriğine bağlanmalı.');
assert.ok(/MATEMATIK_ETKINLIK/.test(app), 'Etkinlik modülü çağrılmalı.');
const etkinlik = read('matematik-etkinlik.js');
assert.ok(/EKR7|EMR7_AI_GRADER|api\/groq|api\.groq\.com/.test(etkinlik), 'Etkinlik değerlendirmesi ortak Groq ayarlarını kullanmalı.');
assert.ok(/#apiKey|getElementById\('apiKey'\)/.test(etkinlik), 'Etkinlik değerlendirmesi ortak API anahtarını okumalı.');
assert.ok(/doğru (cevap|cevab|sonuç|seçenek|şık)/i.test(etkinlik) && /ASLA/.test(etkinlik),
  'Yapay zekâ istemi cevabı sızdırmamalı.');
assert.ok(/cevap anahtar/i.test(etkinlik), 'İstem cevap anahtarını yazmayı yasaklamalı.');
assert.ok(/data-math-etkinlik-text/.test(read('matematik-etkinlik.js')) || /textarea/.test(read('matematik-etkinlik.js')), 'Etkinlikte açıklama alanı olmalı.');
assert.ok(/figure|MATEMATIK_FIGURE/.test(app), 'Hafta içeriğinde şekiller kullanılmalı.');
assert.ok(/\.math-term-card\{/.test(css) && /\.math-etkinlik-option\{/.test(css), 'Terim ve etkinlik stilleri tanımlı olmalı.');
assert.ok(/\.math-activities/.test(read('activity-cards.css')), 'Etkinlik kartı görünümü matematik alanına da uygulanmalı.');
assert.ok(/math-etkinlik-list math-activities/.test(app), 'Etkinlik listesi ortak kart kapsamına girmeli.');
assert.ok(/MATEMATIK_MATH/.test(app), 'Uygulama dizgi motorunu kullanmalı.');

console.log(`Matematik içeriği geçti: 15 hafta, 4 tema, ${allScenes.length} etkileşimli sahne, `
  + `${allActivities.length} açıklamalı soru (kitabın bölüm akışından), `
  + `${content.weeks.reduce((total, week) => total + week.checks.length, 0)} kısa kontrol sorusu, `
  + `${content.weeks.reduce((total, week) => total + week.terms.filter((item) => item.visual).length, 0)} terim şekli; `
  + 'dizgi, sınav takvimi ve index.html bağlantıları doğru.');
