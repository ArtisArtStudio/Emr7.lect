/* Matematik etkinlikleri — ders kitabının etkinliklerinden türetilir.
   Her hafta, kitaptaki bölüm zincirindeki sorular (BAŞLAYALIM, DÜŞÜN-TARTIŞ-AÇIKLA,
   KATIL-UYGULA-KEŞFET, PROBLEM, TEMA ÖLÇME) etkinlik kartına dönüşür. Etkinlik = soru:
   öğrenci cevabını yazar, açıklaması zorunludur ve yapay zekâ ile ölçütlere göre değerlendirilir.
   Model cevap (thinking) hiçbir koşulda öğrenciye gösterilmez; yalnızca değerlendirmede kullanılır. */
(() => {
  'use strict';

  const KITAP = window.MATEMATIK_KITAP;
  if (!KITAP) return;

  const STAGE_LABEL = {
    warmup: 'NELER BİLİYORUZ?',
    start: 'BAŞLAYALIM',
    learn: 'ÖĞRENELİM',
    discuss: 'DÜŞÜN-TARTIŞ-AÇIKLA',
    explore: 'KATIL-UYGULA-KEŞFET',
    problem: 'PROBLEM',
    exam: 'TEMA ÖLÇME',
  };

  /* Açıklama ölçütleri bölüme göre yazılır; model cevabı asla sızdırmaz. */
  const RUBRIC = {
    warmup: ['Önceki bilgini hangi kavrama dayandırdığını yaz', 'Sonucu sayı ya da ifadeyle belirt'],
    start: ['Soruyu kendi cümlelerinle yeniden ifade et', 'Sonucu yaz ve nasıl bulduğunu bir cümleyle açıkla'],
    learn: ['Tanımı kendi cümlelerinle yaz', 'Sonucu işlemle birlikte göster'],
    discuss: ['Düşünceni gerekçesiyle yaz', 'Karşıt görüşün neden yanlış olduğunu belirt'],
    explore: ['Gözlemini veya ölçümünü yaz', 'Sonucu sayı, tablo ya da çizimle destekle'],
    problem: ['Hangi bilgilerin verildiğini yaz', 'Kullandığın bağıntıyı ve sonucu birlikte göster'],
    exam: ['Sorunun ne istediğini yaz', 'Kuralı ve sonucu birlikte açıkla'],
  };

  const clampText = (value) => String(value == null ? '' : value);

  function weekOf(weekId) {
    return KITAP.weeks[Number(weekId)] || null;
  }

  function stageList(weekId) {
    const week = weekOf(weekId);
    return week && Array.isArray(week.stages) ? week.stages : [];
  }

  function makeActivity(weekId, stage, stageIndex, item, itemIndex, kind) {
    const prompt = clampText(item.prompt);
    if (!prompt) return null;
    const section = kind || stage.kind;
    return {
      id: `m${weekId}-s${stageIndex}-${itemIndex}`,
      week: Number(weekId),
      stageIndex,
      stageKind: section,
      stageTitle: stage.title || '',
      section: STAGE_LABEL[section] || 'ETKİNLİK',
      title: stage.title || STAGE_LABEL[section] || 'Etkinlik',
      prompt,
      hint: clampText(item.hint),
      thinking: clampText(item.thinking),
      rubric: (RUBRIC[section] || RUBRIC.learn).slice(),
      minChars: 40,
      scene: item.scene || stage.scene || null,
      figure: item.figure || null,
    };
  }

  function stageActivities(weekId, stageIndex) {
    const stages = stageList(weekId);
    const stage = stages[stageIndex];
    if (!stage) return [];
    const out = [];
    const add = (list, kind) => {
      (Array.isArray(list) ? list : []).forEach((item, index) => {
        const activity = makeActivity(weekId, stage, stageIndex, item, out.length, kind);
        if (activity) out.push(activity);
      });
    };
    if (stage.kind === 'problem') return out; // problem adımları çözümlü örnek olarak gösterilir
    add(stage.questions, stage.kind);
    add(stage.items, stage.kind);
    add(stage.checks, 'learn');
    return out;
  }

  function examActivities(weekId) {
    const week = weekOf(weekId);
    if (!week || !week.exam || !Array.isArray(week.exam.items)) return [];
    return week.exam.items
      .map((item, index) => (typeof item === 'string' ? null : makeActivity(
        weekId,
        { kind: 'exam', title: week.exam.title || 'Tema ölçme' },
        'exam',
        item,
        index,
        'exam',
      )))
      .filter(Boolean);
  }

  function forWeek(weekId) {
    const out = [];
    stageList(weekId).forEach((stage, index) => {
      stageActivities(weekId, index).forEach((activity) => out.push(activity));
    });
    examActivities(weekId).forEach((activity) => out.push(activity));
    return out;
  }

  function forStage(weekId, stageIndex) {
    return stageActivities(weekId, stageIndex);
  }

  function stageInfo(weekId, stageIndex) {
    const stage = stageList(weekId)[stageIndex];
    if (!stage) return null;
    return {
      kind: stage.kind,
      label: STAGE_LABEL[stage.kind] || 'ETKİNLİK',
      title: stage.title || '',
    };
  }

  window.MATEMATIK_ETKINLIKLER = Object.freeze({
    forWeek,
    forStage,
    stageInfo,
    examActivities,
    STAGE_LABEL: Object.freeze(STAGE_LABEL),
  });
})();
