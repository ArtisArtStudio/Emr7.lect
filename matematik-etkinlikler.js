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
    practice: 'UYGULAYALIM',
    problem: 'PROBLEM',
    exam: 'TEMA ÖLÇME',
  };

  /* Açıklama ölçütleri bölüme göre yazılır; model cevabı asla sızdırmaz.
     Ölçütler “kural adı + kuralın neden geçerli olduğu” gibi ezber kalıplar istemez:
     bir soru için tanım, hesap, örnek, karşılaştırma ya da karşı örnek yeterlidir. */
  const RUBRIC = {
    warmup: ['Bildiğin kavramı bir cümleyle hatırlat', 'Sonucu sayı ya da ifadeyle belirt'],
    start: ['Soruyu yanıtla; kararını açıkça belirt', 'Kararının nedenini bir cümleyle yaz'],
    learn: ['Tanımı ya da özelliği kendi cümlelerinle yaz', 'Sonucu işlemle birlikte göster'],
    discuss: ['Görüşünü belirt', 'Gerekçeni bir örnek, hesap ya da karşılaştırmayla destekle'],
    explore: ['Gözlemini veya ölçümünü yaz', 'Sonucu sayı, tablo ya da çizimle destekle'],
    practice: ['İşlem adımlarını sırayla yaz', 'Sonucu ve gerekçeni birlikte belirt'],
    problem: ['Hangi bilgilerin verildiğini yaz', 'Kullandığın bağıntıyı ve sonucu birlikte göster'],
    exam: ['Sonucu ya da kararı yaz', 'Kısa bir gerekçe ekle'],
  };

  /* Soru türüne göre beklenen açıklamanın ölçüsü. “Eşit mi?” gibi karar sorularında
     öğrenciden kural adı beklenmez; bir örnek, hesap ya da tanım yeterlidir. */
  const REASON = {
    karar: 'Kısa bir karar ve tek cümlelik gerekçe yeterli. Gerekçe; hesap, örnek, tanım ya da karşılaştırma olabilir. Kural adı, kuralın gerekçelendirilmesi veya uzun açıklama beklenmez.',
    gerekce: 'Düşünceyi belirtip nedenini bir örnek, hesap ya da karşılaştırmayla desteklemek yeterli. Ek kural açıklaması istenmez.',
    islem: 'İşlem basamakları ve sonuç yeterli. Sonucun yanına tek cümlelik gerekçe eklenirse açıklama tamamdır.',
    sonuc: 'Sonuç ve onu nasıl bulduğunu anlatan tek cümle yeterli.',
  };

  function reasonType(prompt) {
    const text = String(prompt || '').toLocaleLowerCase('tr');
    if (/eşit mi|eşit midir|büyük|küçük|hangisi|karşılaştır|doğru mu|yanlış mı|katılıyor|aynı mı|olabilir mi/.test(text)) return 'karar';
    if (/neden|niçin|açıkla|gerekçe|yorumla|tartış|düşün/.test(text)) return 'gerekce';
    if (/kaç|hesapla|bul|yaz|göster|çiz|ölç/.test(text)) return 'islem';
    return 'sonuc';
  }

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
    const reason = reasonType(prompt);
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
      reason,
      reasonHint: REASON[reason],
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
    /* KATIL-UYGULA-KEŞFET adımları soru biçimindedir (prompt/hint/thinking):
       çözüm adımı gibi çizilirse numaralar boş kalıyordu. Bunlar etkinlik sorusudur. */
    add((Array.isArray(stage.steps) ? stage.steps : []).filter((item) => item && item.prompt), stage.kind);
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
    reasonType,
    forWeek,
    forStage,
    stageInfo,
    examActivities,
    STAGE_LABEL: Object.freeze(STAGE_LABEL),
  });
})();
