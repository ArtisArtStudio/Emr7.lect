/* Ortak yapay zekâ geri bildirim koçu.
   Fen Bilimleri, Sosyal Bilgiler ve Türkçe aynı koçluk kurallarını kullanır:
   yazılı yanıtlarda yapay zekâ yalnızca "ne yapmalı" düzeyinde yol gösterir,
   cevabı/anahtarı söylemez; yol gösterici cümle ve yarım cümle kalıbı verir. */
(() => {
  'use strict';

  const LIMITS = Object.freeze({ guide: 220, starter: 140 });

  /* Modelden istenen alanlar: mevcut kod alanlarına iki yol gösterici alan eklenir. */
  const GUIDE_CONTRACT = '"guide":"<en çok 220 karakter, tek cümle; öğrencinin bir sonraki adımını anlat, cevabı/sonucu/anahtar sözcüğü söyleme>" ve "starter":"<en çok 140 karakter; öğrencinin tamamlayacağı yarım cümle, boşluk bırakarak yaz: \'… çünkü …\' gibi>"';

  const COACH_RULES = Object.freeze([
    'YAZMA KOÇLUĞU: Öğrenci yazılı yanıt veriyorsa geri bildirimin yol gösterici olsun; yalnızca eksiği adlandırmakla kalma, bir sonraki cümleyi nasıl kuracağını göster.',
    'guide alanında konu anlatımındaki bir başlığa, metindeki bir bölüme ya da öğrencinin kendi cümlesindeki bir sözcüğe işaret edebilirsin; kısa bir ipucu sözü vermek serbesttir.',
    'starter alanında öğrencinin dolduracağı yarım bir cümle kur; bu kalıp cevabın kendisini, sonucu, sayısal değeri veya doğru seçeneği içermemelidir.',
    'guide ve starter kısa ve somut olsun; birden çok adımı tek cümleye sığdırma, yalnızca en yararlı tek adımı seç.',
    'Yanıt doğruysa guide alanında yanıtı güçlendirecek tek bir genişletme öner (örnek, karşı örnek, neden) ve öğrenciyi yazmaya devam etmesi için yüreklendir.',
  ].join('\n'));

  function cleanText(value, limit) {
    const text = String(value ?? '')
      .replace(/[\r\n\t]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    if (!text) return '';
    if (text.length <= limit) return text;
    return `${text.slice(0, Math.max(0, limit - 1)).trimEnd()}…`;
  }

  /* Cevap sızdıran, kitaba/sayfaya gönderme yapan veya biçimlendirme içeren metinler atılır. */
  function isSafeText(text) {
    if (!text) return false;
    if (/[<>{}]/.test(text)) return false;
    if (/(ders\s*kitab|kitab[ıi]|sayfa\s*\d|s\.\s*\d{1,3}\b)/i.test(text)) return false;
    if (/(cevap anahtar|doğru cevap|doğru seçenek|anahtarın kendisi)/i.test(text)) return false;
    return true;
  }

  function sanitizeGuidance(raw) {
    const source = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
    const guide = cleanText(source.guide, LIMITS.guide);
    const starter = cleanText(source.starter, LIMITS.starter);
    return {
      guide: isSafeText(guide) ? guide : '',
      starter: isSafeText(starter) ? starter : '',
    };
  }

  /* Üç derste de aynı başlıklarla yazılan koçluk bloğu. */
  function composeCoachBlock({ guide, starter, fallbackGuide, fallbackStarter, encourage } = {}) {
    const lines = [];
    const guideText = cleanText(guide, LIMITS.guide) || cleanText(fallbackGuide, LIMITS.guide);
    if (guideText) lines.push(`YOL GÖSTERİCİ: ${guideText}`);
    const starterText = cleanText(starter, LIMITS.starter) || cleanText(fallbackStarter, LIMITS.starter);
    if (starterText) lines.push(`YAZMAYA BAŞLA: ${starterText}`);
    if (encourage) lines.push(`TEŞVİK: ${encourage}`);
    return lines.join('\n');
  }

  /* Yazılı yanıtın hedefe göre nerede olduğunu söyleyen kısa koçluk cümlesi. */
  function lengthCoach(length, minChars) {
    const written = Number(length) || 0;
    const target = Number(minChars) || 0;
    if (!target) return '';
    if (written >= target) return `Uzunluğun hedefi karşılıyor (${written}/${target} karakter); şimdi bir örnek ya da karşı örnek ekleyerek yanıtını güçlendir.`;
    const need = target - written;
    return `Şu an ${written}/${target} karakter yazdın; ${need} karakter daha gerekiyor. Bir örnek ve bir gerekçe cümlesi ekle.`;
  }

  window.EMR7_AI_GRADER = Object.freeze({
    LIMITS,
    GUIDE_CONTRACT,
    COACH_RULES,
    sanitizeGuidance,
    composeCoachBlock,
    lengthCoach,
    cleanText,
  });
})();
