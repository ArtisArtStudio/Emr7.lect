/*
 * Tema 2 etkinlik akışı: adım adım ilerleme, yerel değerlendirme ve isteğe bağlı yapay zekâ koçluğu.
 *
 * Kurallar:
 * - Seçim, eşleştirme ve sıralamada değerlendirme tamamen yereldir; doğru cevap gösterilmez.
 * - Yazmada önce uzunluk/ölçüt denetimi yapılır; "Yapay zekâ ile değerlendir" yalnızca anahtarı olan
 *   etkinliklerde görünür ve yalnızca kapalı kod döndüren bir sözleşme kullanır.
 * - Geri bildirim DURUM / HATA-EKSİK / YOL GÖSTERİCİ başlıklarıyla verilir.
 * - Metin (yazma) geri bildiriminde ElevenLabs sesli okuma düğmesi bulunur.
 */
(function () {
  "use strict";

  const LETTERS = ["A", "B", "C", "D", "E"];
  const AI_STATUS = { correct: "TAM DOĞRU", partial: "KISMEN DOĞRU", wrong: "YENİDEN BAK", incomplete: "YANIT EKSİK", unverified: "DOĞRULANAMADI" };
  const AI_ISSUES = {
    relevance: "Yanıtın soruyla ilişkisi zayıf kalmış.",
    evidence: "Görüşün metinden bir kanıta dayandırılmamış.",
    completeness: "İstenen öğelerden en az biri eksik.",
    reasoning: "Gerekçe ile sonuç arasındaki bağ açık değil.",
    accuracy: "Bir bilgi metinle örtüşmüyor.",
    selection: "Seçim ile gerekçe birbirini tutmuyor.",
  };
  const AI_HINTS = {
    reread: "Metnin ilgili bölümüne dön ve yanıtınla yan yana koy.",
    count: "İstenen öğeleri tek tek say: hepsi yanıtında var mı?",
    evidence: "Her görüşün yanına metinden somut bir ayrıntı ekle.",
    explain: "Bir cümleyi “çünkü” ile genişlet; nedeni görünür olsun.",
    connect: "Metindeki durumu kendi yaşantınla ilişkilendir.",
    compare: "İki durumu yan yana koy; benzerlik ve farkı ayrı yaz.",
  };

  function escape(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);
  }

  function activitiesOf(unit) {
    return unit.groups.flatMap((group) => group.activities.map((activity) => ({ ...activity, group: group.label })));
  }

  function entryFor(store, activityId) {
    const unit = store.get();
    if (!unit[activityId] || typeof unit[activityId] !== "object") {
      unit[activityId] = { values: {}, checked: false, state: "none", pill: "", feedback: "" };
    }
    unit[activityId].values = unit[activityId].values || {};
    return unit[activityId];
  }

  /* Sıralama etkinliklerinde başlangıç dizilişi sabit ama karışık olmalı; her açılışta değişmesin. */
  function shuffledIds(activity, entry) {
    if (Array.isArray(entry?.values?.order) && entry.values.order.length === activity.items.length) return entry.values.order.slice();
    const ids = activity.items.map((item) => item.id);
    if (ids.length < 3) return ids;
    const out = ids.slice();
    out.push(out.shift());
    out.reverse();
    return out;
  }

  function statusPill(entry) {
    return `<span class="t2-pill" data-state="${escape(entry.state)}"${entry.checked ? "" : " hidden"}>${escape(entry.pill || "")}</span>`;
  }

  function choiceMarkup(activity, entry) {
    return activity.questions.map((question, index) => {
      const chosen = entry.values[`q:${question.id}`];
      const figure = question.image
        ? `<figure class="t2-figure"><img src="${escape(question.image.src)}" alt="${escape(question.image.alt)}" loading="lazy" width="640" height="360"><figcaption>${escape(question.image.caption || "")}</figcaption></figure>`
        : "";
      const options = question.options.map((option, optionIndex) => `
        <label class="t2-choice"><input type="radio" name="t2-${escape(activity.id)}-${escape(question.id)}" value="${optionIndex}" data-t2-question="${escape(question.id)}" data-t2-activity="${escape(activity.id)}"${String(chosen) === String(optionIndex) ? " checked" : ""}><span><b>${LETTERS[optionIndex]})</b> ${escape(option)}</span></label>`).join("");
      return `<fieldset class="t2-question"><legend><span class="t2-number">${index + 1}</span>${escape(question.prompt)}</legend>${figure}<div class="t2-choices">${options}</div></fieldset>`;
    }).join("");
  }

  function matchMarkup(activity, entry) {
    const rows = activity.items.map((item) => {
      const value = entry.values[`m:${item.id}`] || "";
      const options = activity.options.map((option) => `<option value="${escape(option.id)}"${value === option.id ? " selected" : ""}>${escape(option.label)}</option>`).join("");
      return `<div class="t2-match-row"><span class="t2-match-label">${escape(item.label)}</span><select class="t2-select" data-t2-match="${escape(item.id)}" data-t2-activity="${escape(activity.id)}" aria-label="${escape(item.label)}"> <option value="">Seç…</option>${options}</select></div>`;
    }).join("");
    return `<div class="t2-match">${rows}</div>`;
  }

  function orderMarkup(activity, entry) {
    const base = shuffledIds(activity, entry);
    const rows = base.map((id, index) => {
      const item = activity.items.find((candidate) => candidate.id === id) || { label: id };
      return `<li class="t2-order-row"><span class="t2-order-pos">${index + 1}</span><span class="t2-order-label">${escape(item.label)}</span><span class="t2-order-buttons"><button type="button" class="t2-move" data-t2-move="up" data-t2-index="${index}" data-t2-activity="${escape(activity.id)}" aria-label="Yukarı taşı"${index === 0 ? " disabled" : ""}>↑</button><button type="button" class="t2-move" data-t2-move="down" data-t2-index="${index}" data-t2-activity="${escape(activity.id)}" aria-label="Aşağı taşı"${index === base.length - 1 ? " disabled" : ""}>↓</button></span></li>`;
    }).join("");
    return `<ol class="t2-order">${rows}</ol>`;
  }

  function writeMarkup(activity, entry) {
    const value = entry.values.text || "";
    const criteria = activity.criteria.map((item) => `<li>${escape(item)}</li>`).join("");
    return `
      <ul class="t2-criteria">${criteria}</ul>
      <textarea class="t2-textarea" data-t2-write="1" data-t2-activity="${escape(activity.id)}" rows="7" maxlength="3000" aria-label="${escape(activity.title)} yanıtı">${escape(value)}</textarea>
      <div class="t2-actions">
        <button class="check-button btn t2-check" type="button" data-t2-check="write" data-t2-activity="${escape(activity.id)}">✦ Kontrol et</button>
        ${activity.answerKey && activity.answerKey.length ? `<button class="btn t2-ai ai-button" type="button" data-t2-ai="${escape(activity.id)}">Yapay zekâ ile değerlendir</button>` : ""}
        <span class="t2-count" data-t2-count="${escape(activity.id)}">${value.trim().length}/${activity.minChars} karakter</span>
      </div>`;
  }

  function bodyMarkup(activity, entry) {
    if (activity.type === "choice") return choiceMarkup(activity, entry);
    if (activity.type === "match") return matchMarkup(activity, entry);
    if (activity.type === "order") return orderMarkup(activity, entry);
    return writeMarkup(activity, entry);
  }

  function feedbackMarkup(activity, entry) {
    const tts = activity.type === "write"
      ? `<div class="t2-tts"><button class="btn t2-tts-btn" type="button" data-tts-read="t2-feedback-${escape(activity.id)}" data-tts-status="t2-tts-status-${escape(activity.id)}">🔊 Geri bildirimi sesli oku</button><button class="btn t2-tts-btn" type="button" data-tts-stop>Durdur</button><span class="t2-tts-status" id="t2-tts-status-${escape(activity.id)}" role="status" aria-live="polite"></span></div>`
      : "";
    return `<p class="t2-feedback" id="t2-feedback-${escape(activity.id)}" data-t2-feedback data-t2-activity="${escape(activity.id)}" aria-live="polite"${entry.feedback ? "" : " hidden"}>${escape(entry.feedback || "")}</p>${tts}`;
  }

  /* ---------------- Değerlendirme (yerel, cevap göstermez) ---------------- */

  function guideFor(activity) {
    if (activity.guide) return activity.guide;
    return "Yanlış kalan soruyu seç, iki seçeneği metindeki bir cümleyle karşılaştır ve seçimini yeniden gerekçelendir.";
  }

  function choiceVerdict(activity, entry) {
    const total = activity.questions.length;
    const answered = activity.questions.filter((question) => entry.values[`q:${question.id}`] !== undefined).length;
    if (answered < total) {
      return { state: "none", pill: "YANIT EKSİK", checked: false, text: `DURUM: YANIT EKSİK · ${answered}/${total}\nHATA/EKSİK: Bazı sorular boş kaldı.\nYOL GÖSTERİCİ: Boş soruya dön, seçenekleri tek tek ele ve metinden bir kanıt bul.` };
    }
    const correct = activity.questions.filter((question) => Number(entry.values[`q:${question.id}`]) === question.answer).length;
    if (correct === total) {
      return { state: "correct", pill: "TAM DOĞRU", checked: true, text: `DURUM: TAM DOĞRU · ${correct}/${total}\nTüm seçimlerin metne dayanıyor. Şimdi bir soruyu kendi cümlenle yeniden kur.\nYOL GÖSTERİCİ: ${guideFor(activity)}` };
    }
    return {
      state: correct === 0 ? "wrong" : "partial",
      pill: correct === 0 ? "YENİDEN BAK" : "KISMEN DOĞRU",
      checked: true,
      text: `DURUM: ${correct === 0 ? "YENİDEN BAK" : "KISMEN DOĞRU"} · ${correct}/${total}\nHATA/EKSİK: ${correct === 0 ? "Seçimlerin metinle örtüşmüyor." : "Bazı seçimler metinle örtüşmüyor."}\nYOL GÖSTERİCİ: ${guideFor(activity)}`,
    };
  }

  function matchVerdict(activity, entry) {
    const total = activity.items.length;
    const answered = activity.items.filter((item) => entry.values[`m:${item.id}`]).length;
    if (answered < total) {
      return { state: "none", pill: "YANIT EKSİK", checked: false, text: `DURUM: YANIT EKSİK · ${answered}/${total}\nHATA/EKSİK: Bazı satırlarda seçim yapılmadı.\nYOL GÖSTERİCİ: Boş satıra dön; kavramı metindeki kullanımıyla karşılaştır.` };
    }
    const correct = activity.items.filter((item) => entry.values[`m:${item.id}`] === activity.answers[item.id]).length;
    if (correct === total) return { state: "correct", pill: "TAM DOĞRU", checked: true, text: `DURUM: TAM DOĞRU · ${correct}/${total}\nBütün eşleştirmeler tutarlı.\nYOL GÖSTERİCİ: ${guideFor(activity)}` };
    return {
      state: correct === 0 ? "wrong" : "partial",
      pill: correct === 0 ? "YENİDEN BAK" : "KISMEN DOĞRU",
      checked: true,
      text: `DURUM: ${correct === 0 ? "YENİDEN BAK" : "KISMEN DOĞRU"} · ${correct}/${total}\nHATA/EKSİK: ${correct === 0 ? "Eşleştirmelerin metinle örtüşmüyor." : "Bazı eşleştirmeler metinle örtüşmüyor."}\nYOL GÖSTERİCİ: ${guideFor(activity)}`,
    };
  }

  function orderVerdict(activity, entry) {
    const base = shuffledIds(activity, entry);
    const correct = base.filter((id, index) => id === activity.answer[index]).length;
    if (correct === base.length) return { state: "correct", pill: "SIRA DOĞRU", checked: true, text: `DURUM: SIRA DOĞRU · ${correct}/${base.length}\nOlay akışı metne uygun.\nYOL GÖSTERİCİ: ${guideFor(activity)}` };
    return {
      state: correct === 0 ? "wrong" : "partial",
      pill: correct === 0 ? "YENİDEN BAK" : "KISMEN DOĞRU",
      checked: true,
      text: `DURUM: ${correct === 0 ? "YENİDEN BAK" : "KISMEN DOĞRU"} · ${correct}/${base.length}\nHATA/EKSİK: Bazı olaylar yanlış yerde.\nYOL GÖSTERİCİ: ${guideFor(activity)}`,
    };
  }

  function writeVerdict(activity, value) {
    const length = String(value || "").trim().length;
    if (length < activity.minChars) {
      return { state: "none", pill: "YANIT EKSİK", checked: false, text: `DURUM: YANIT EKSİK · ${length}/${activity.minChars} karakter\nHATA/EKSİK: Yanıt beklenen uzunluğa ulaşmadı.\nYOL GÖSTERİCİ: ${guideFor(activity)}\nYAZMAYA BAŞLA: ${activity.starter}` };
    }
    return { state: "correct", pill: "YAZIN KAYDEDİLDİ", checked: true, text: `DURUM: YAZIN KAYDEDİLDİ · ${length} karakter\nÖLÇÜTLERİ KENDİN DENETLE: Yukarıdaki ölçütlerin tamamı karşılandı mı? Yanıtını yüksek sesle oku.\nYOL GÖSTERİCİ: ${guideFor(activity)}` };
  }

  function verdictFor(activity, entry) {
    if (activity.type === "choice") return choiceVerdict(activity, entry);
    if (activity.type === "match") return matchVerdict(activity, entry);
    if (activity.type === "order") return orderVerdict(activity, entry);
    return writeVerdict(activity, entry.values.text);
  }

  function applyVerdict(store, activity, entry, result) {
    entry.state = result.state;
    entry.pill = result.pill;
    entry.checked = result.checked;
    entry.feedback = result.text;
    store.save();
  }

  function showFeedback(activity, entry) {
    const box = document.getElementById(`t2-feedback-${activity.id}`);
    if (box) {
      box.textContent = entry.feedback;
      box.hidden = false;
    }
  }

  /* ---------------- Yapay zekâ koçluğu (yalnızca yazma) ---------------- */

  async function aiGrade(activity, entry, unit, api, button) {
    const value = String(entry.values.text || "");
    const length = value.trim().length;
    if (length < activity.minChars) {
      applyVerdict(api.store, activity, entry, writeVerdict(activity, value));
      showFeedback(activity, entry);
      api.rerender?.();
      return;
    }
    const apiKey = document.getElementById("apiKey")?.value.trim();
    if (!apiKey) {
      const box = document.getElementById(`t2-feedback-${activity.id}`);
      if (box) {
        box.hidden = false;
        box.textContent = "DURUM: AI KAPALI\nHATA/EKSİK: Groq API anahtarı girilmemiş.\nYOL GÖSTERİCİ: Sayfanın üstündeki ortak ayarlara anahtarını gir; anahtar bu cihazdan dışarı kaydedilmez.";
      }
      const settings = document.getElementById("apiSettings");
      if (settings) settings.open = true;
      document.getElementById("apiKey")?.focus?.({ preventScroll: true });
      return;
    }
    const model = document.getElementById("model")?.value || "openai/gpt-oss-20b";
    button.disabled = true;
    const original = button.textContent;
    button.textContent = "Değerlendiriliyor…";
    const box = document.getElementById(`t2-feedback-${activity.id}`);
    if (box) { box.hidden = false; box.textContent = "Yanıtın ölçütlere ve metne göre inceleniyor…"; }
    const systemPrompt = [
      "Sen 7. sınıf Türkçe dersi için adil, kanıta dayalı bir değerlendiricisin. Kaynak, öğrencinin okuduğu metin ve etkinlik ölçütleridir.",
      "Değerlendirmeyi yalnızca verilen ölçütlere ve anahtara dayandır. Metinde/anahtarda olmayan bilgiyi doğrulanmış sayma.",
      "Cevabı, doğru seçeneği veya örnek yanıtı hiçbir alanda yazma; yalnızca bir sonraki adımı anlatan kısa bir yol gösterici cümle ve tamamlanacak yarım cümle ver.",
      "Öğrenciye dönük metinde ders kitabına, sayfaya veya etkinlik numarasına gönderme yapma.",
      "Çıktı yalnızca geçerli JSON olsun: {\"status\":\"correct|partial|wrong|incomplete|unverified\",\"issues\":[\"relevance|evidence|completeness|reasoning|accuracy|selection\"],\"hint\":\"reread|count|evidence|explain|connect|compare\",\"guide\":\"en çok 220 karakter, tek cümle\",\"starter\":\"en çok 140 karakter, yarım cümle\"}.",
      "Markdown, açıklama veya JSON dışı metin ekleme.",
    ].join("\n");
    const userPrompt = [
      `Ders: Türkçe · 7. sınıf · ${unit.title}`,
      `Etkinlik: ${activity.title}`,
      `Yönerge: ${activity.instruction}`,
      `Ölçütler:\n- ${activity.criteria.join("\n- ")}`,
      `Öğrencinin yanıtı:\n${value}`,
      `Değerlendirme anahtarı (iç kullanım):\n- ${(activity.answerKey || []).join("\n- ")}`,
    ].join("\n");
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model,
          temperature: 0.1,
          max_completion_tokens: 500,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          ...(model.startsWith("openai/gpt-oss") ? { reasoning_effort: "low", reasoning_format: "hidden" } : {}),
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload?.error?.message || `HTTP ${response.status}`);
      const raw = JSON.parse(payload?.choices?.[0]?.message?.content || "{}");
      const grader = window.EMR7_AI_GRADER;
      const guidance = grader?.sanitizeGuidance ? grader.sanitizeGuidance(raw) : { guide: "", starter: "" };
      const status = AI_STATUS[raw.status] ? raw.status : "unverified";
      const issues = (Array.isArray(raw.issues) ? raw.issues : []).slice(0, 3).map((code) => AI_ISSUES[code]).filter(Boolean);
      const lines = [`DURUM: ${AI_STATUS[status]} · ${length} karakter`];
      lines.push(`HATA/EKSİK: ${issues.length ? issues.join(" ") : "Belirgin bir eksik görülmedi."}`);
      const guide = guidance.guide || AI_HINTS[raw.hint] || "";
      if (guide) lines.push(`YOL GÖSTERİCİ: ${guide}`);
      if (guidance.starter) lines.push(`YAZMAYA BAŞLA: ${guidance.starter}`);
      lines.push("TEŞVİK: Yanıtını yüksek sesle oku; anlaşılmayan bir cümle varsa yeniden yaz.");
      const text = lines.join("\n");
      entry.state = status === "correct" ? "correct" : status === "incomplete" ? "none" : status === "partial" ? "partial" : "wrong";
      entry.pill = AI_STATUS[status];
      entry.checked = status !== "incomplete";
      entry.feedback = text;
      api.store.save();
      showFeedback(activity, entry);
      api.rerender?.();
    } catch (error) {
      if (box) {
        box.hidden = false;
        box.textContent = `DURUM: DEĞERLENDİRİLEMEDİ\nHATA/EKSİK: İstek tamamlanamadı (${String(error.message || error).slice(0, 80)}).\nYOL GÖSTERİCİ: Bağlantını ve anahtarı denetle; birkaç saniye sonra yeniden dene. Yazdıkların kaybolmadı.`;
      }
    } finally {
      button.disabled = false;
      button.textContent = original;
    }
  }

  /* ---------------- Çizim ---------------- */

  function render(unit, api) {
    const host = document.getElementById(api.bodyId || "tema2PracticeBody");
    if (!host) return;
    const store = api.store;
    const activities = activitiesOf(unit);
    const flow = store.get();
    flow.__index = Number.isInteger(flow.__index) ? Math.min(Math.max(flow.__index, 0), activities.length - 1) : 0;
    const index = flow.__index;
    const activity = activities[index];
    const entry = entryFor(store, activity.id);

    const track = activities.map((item, itemIndex) => {
      const state = store.get()[item.id]?.state || "none";
      return `<button type="button" class="t2-step" data-t2-step="${itemIndex}" data-state="${escape(state)}"${itemIndex === index ? ' aria-current="step"' : ""} aria-label="${itemIndex + 1}. etkinlik: ${escape(item.title)}">${itemIndex + 1}</button>`;
    }).join("");
    const done = activities.filter((item) => store.get()[item.id]?.checked).length;

    host.innerHTML = `
      <div class="t2-head">
        <div>
          <p class="t2-eyebrow">${escape(unit.overview)}</p>
          <h4 class="t2-title">${escape(activity.title)}</h4>
          <p class="t2-meta">${escape(activity.group)} · ${escape(activity.skill)}</p>
        </div>
        <div class="t2-progress-wrap">
          <span class="t2-progress-text">${index + 1}/${activities.length} · ${done} tamamlandı</span>
          <div class="t2-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${activities.length}" aria-valuenow="${done}" aria-label="Etkinlik ilerlemesi"><div class="t2-progress-value" style="width:${Math.round((done / activities.length) * 100)}%"></div></div>
        </div>
      </div>
      <nav class="t2-track" aria-label="Bu birimin etkinlikleri">${track}</nav>
      <article class="t2-card activity-card" data-t2-card="${escape(activity.id)}" data-state="${escape(entry.state)}" data-kind="${escape(activity.type === "write" ? "writing" : activity.type === "choice" ? "choice" : "puzzle")}">
        <header class="activity-top">
          <div class="activity-heading-row">
            <span class="activity-icon" aria-hidden="true">${escape(activity.type === "write" ? "✍️" : activity.type === "choice" ? "🎯" : activity.type === "match" ? "🧩" : "🔀")}</span>
            <div class="activity-title-copy">
              <p class="activity-kicker">${escape(activity.group || unit.title)} · Etkinlik ${index + 1}</p>
              <h2 class="activity-title">${escape(activity.title)}</h2>
            </div>
          </div>
          <p class="activity-instruction">${escape(activity.instruction)}</p>
        </header>
        <div class="activity-meta">
          <span>${escape(activity.type === "write" ? "Yazma" : activity.type === "choice" ? "Seçim" : activity.type === "match" ? "Eşleştirme" : "Sıralama")}</span>
          <span>${escape(activity.skill || "")}</span>
          <span>Kaynak: ${escape(unit.title)}</span>
          ${statusPill(entry)}
        </div>
        <div class="question-list">
          <article class="question-card" data-state="${escape(entry.state)}">
            <div class="t2-body">${bodyMarkup(activity, entry)}</div>
            ${activity.type === "write" ? "" : `<div class="question-actions"><button class="check-button btn t2-check" type="button" data-t2-check="activity" data-t2-activity="${escape(activity.id)}">✦ Kontrol et</button></div>`}
            ${feedbackMarkup(activity, entry)}
          </article>
        </div>
      </article>
      <div class="t2-controls">
        <button class="btn" type="button" data-t2-nav="prev"${index === 0 ? " disabled" : ""}>← Önceki etkinlik</button>
        <button class="btn t2-next" type="button" data-t2-nav="next"${index === activities.length - 1 ? " disabled" : ""}>Sonraki etkinlik →</button>
      </div>`;

    host.querySelectorAll("[data-t2-question]").forEach((input) => {
      input.addEventListener("change", () => {
        entry.values[`q:${input.dataset.t2Question}`] = Number(input.value);
        entry.checked = false;
        store.save();
      });
    });
    host.querySelectorAll("[data-t2-match]").forEach((select) => {
      select.addEventListener("change", () => {
        entry.values[`m:${select.dataset.t2Match}`] = select.value;
        entry.checked = false;
        store.save();
      });
    });
    host.querySelectorAll("[data-t2-write]").forEach((area) => {
      area.addEventListener("input", () => {
        entry.values.text = area.value;
        const counter = host.querySelector(`[data-t2-count="${activity.id}"]`);
        if (counter) counter.textContent = `${area.value.trim().length}/${activity.minChars} karakter`;
        store.save();
      });
    });
    host.querySelectorAll("[data-t2-move]").forEach((button) => {
      button.addEventListener("click", () => {
        const order = shuffledIds(activity, entry);
        const from = Number(button.dataset.t2Index);
        const to = button.dataset.t2Move === "up" ? from - 1 : from + 1;
        if (to < 0 || to >= order.length) return;
        [order[from], order[to]] = [order[to], order[from]];
        entry.values.order = order;
        entry.checked = false;
        store.save();
        api.rerender?.();
      });
    });
    host.querySelectorAll("[data-t2-step]").forEach((button) => {
      button.addEventListener("click", () => {
        flow.__index = Number(button.dataset.t2Step);
        store.save();
        api.rerender?.();
      });
    });
    host.querySelectorAll("[data-t2-nav]").forEach((button) => {
      button.addEventListener("click", () => {
        const next = button.dataset.t2Nav === "next" ? index + 1 : index - 1;
        if (next < 0 || next >= activities.length) return;
        flow.__index = next;
        store.save();
        api.rerender?.();
        document.getElementById(api.bodyId || "tema2PracticeBody")?.scrollIntoView?.({ behavior: "smooth", block: "start" });
      });
    });
    host.querySelectorAll('[data-t2-check="activity"]').forEach((button) => {
      button.addEventListener("click", () => {
        applyVerdict(store, activity, entry, verdictFor(activity, entry));
        api.rerender?.();
        showFeedback(activity, entry);
      });
    });
    host.querySelectorAll('[data-t2-check="write"]').forEach((button) => {
      button.addEventListener("click", () => {
        applyVerdict(store, activity, entry, writeVerdict(activity, entry.values.text));
        api.rerender?.();
        showFeedback(activity, entry);
      });
    });
    host.querySelectorAll("[data-t2-ai]").forEach((button) => {
      button.addEventListener("click", () => aiGrade(activity, entry, unit, api, button));
    });
  }


  /* ---------------- Tema 2 ek ölçme ve değerlendirme (s. 117 karşılığı) ---------------- */

  function assessmentState(store) {
    const flow = store.get();
    if (!flow.__assessment || typeof flow.__assessment !== "object") {
      flow.__assessment = { answers: {}, selfCheck: {}, checked: false, feedback: "" };
    }
    flow.__assessment.answers = flow.__assessment.answers || {};
    flow.__assessment.selfCheck = flow.__assessment.selfCheck || {};
    return flow.__assessment;
  }

  function renderAssessment(api) {
    const host = document.getElementById(api.assessmentHostId || "tema2AssessmentBody");
    if (!host) return;
    const assessment = api.assessment || window.TEMA2_PRACTICE?.assessment;
    if (!assessment) { host.innerHTML = ""; return; }
    const store = api.assessmentStore || api.store;
    const state = assessmentState(store);
    const total = assessment.questions.length;
    const answered = assessment.questions.filter((question) => state.answers[question.id] !== undefined).length;

    const questions = assessment.questions.map((question, index) => {
      const options = question.options.map((option, optionIndex) => `
        <label class="t2-choice"><input type="radio" name="t2a-${escape(question.id)}" value="${optionIndex}" data-t2a-question="${escape(question.id)}"${String(state.answers[question.id]) === String(optionIndex) ? " checked" : ""}><span><b>${LETTERS[optionIndex]})</b> ${escape(option)}</span></label>`).join("");
      return `<fieldset class="t2-question"><legend><span class="t2-number">${index + 1}</span>${escape(question.prompt)}</legend><div class="t2-choices">${options}</div></fieldset>`;
    }).join("");

    const selfCheck = assessment.selfCheck.map((item, index) => `
      <label class="t2-selfcheck-item"><input type="checkbox" data-t2a-self="${index}"${state.selfCheck[index] ? " checked" : ""}><span>${escape(item)}</span></label>`).join("");

    host.innerHTML = `
      <article class="t2-card t2-assessment" data-state="${escape(state.checked ? "checked" : "none")}">
        <div class="t2-card-head">
          <span class="t2-kind">Tema ölçmesi</span>
          <span class="t2-pill" data-state="${escape(state.checked ? "partial" : "none")}"${state.checked ? "" : " hidden"}>${escape(state.pill || "DEĞERLENDİRİLDİ")}</span>
        </div>
        <h4 class="t2-title">${escape(assessment.title)}</h4>
        <p class="t2-instruction">${escape(assessment.intro)}</p>
        <div class="t2-body">${questions}</div>
        <div class="t2-selfcheck">
          <p class="t2-selfcheck-title">Öz değerlendirme · işaretlediklerin yalnızca sana görünür</p>
          <div class="t2-selfcheck-grid">${selfCheck}</div>
        </div>
        <div class="t2-actions">
          <button class="btn t2-check" type="button" data-t2a-check="1">Yanıtlarımı değerlendir</button>
          <span class="t2-count">${answered}/${total} yanıtlandı</span>
        </div>
        <p class="t2-feedback" data-t2a-feedback aria-live="polite"${state.feedback ? "" : " hidden"}>${escape(state.feedback || "")}</p>
      </article>`;

    host.querySelectorAll("[data-t2a-question]").forEach((input) => {
      input.addEventListener("change", () => {
        state.answers[input.dataset.t2aQuestion] = Number(input.value);
        state.checked = false;
        store.save();
        const counter = host.querySelector(".t2-count");
        if (counter) counter.textContent = `${assessment.questions.filter((question) => state.answers[question.id] !== undefined).length}/${total} yanıtlandı`;
      });
    });
    host.querySelectorAll("[data-t2a-self]").forEach((box) => {
      box.addEventListener("change", () => {
        state.selfCheck[box.dataset.t2aSelf] = box.checked;
        store.save();
      });
    });
    host.querySelectorAll("[data-t2a-check]").forEach((button) => {
      button.addEventListener("click", () => {
        const missing = assessment.questions.filter((question) => state.answers[question.id] === undefined);
        const box = host.querySelector("[data-t2a-feedback]");
        if (missing.length) {
          state.checked = false;
          state.feedback = `DURUM: YANIT EKSİK · ${total - missing.length}/${total}\nHATA/EKSİK: ${missing.map((question) => assessment.questions.indexOf(question) + 1).join(", ")}. soru boş.\nYOL GÖSTERİCİ: Boş soruya dön, iki seçeneği metindeki bir cümleyle karşılaştır.`;
        } else {
          const correct = assessment.questions.filter((question) => Number(state.answers[question.id]) === question.answer).length;
          const wrongs = assessment.questions
            .map((question, index) => (Number(state.answers[question.id]) === question.answer ? null : index + 1))
            .filter(Boolean);
          state.checked = true;
          state.pill = correct === total ? "TAM DOĞRU" : correct === 0 ? "YENİDEN BAK" : "KISMEN DOĞRU";
          state.feedback = correct === total
            ? `DURUM: TAM DOĞRU · ${correct}/${total}\nHATA/EKSİK: Yok; temanın tamamını doğru yanıtladın.\nYOL GÖSTERİCİ: ${assessment.guide}`
            : `DURUM: ${state.pill} · ${correct}/${total}\nHATA/EKSİK: Şu sorulara yeniden bak: ${wrongs.join(", ")}.\nYOL GÖSTERİCİ: ${assessment.guide}`;
        }
        store.save();
        if (box) { box.textContent = state.feedback; box.hidden = false; }
        const pill = host.querySelector(".t2-pill");
        if (pill) {
          pill.hidden = !state.checked;
          pill.textContent = state.pill || "";
          pill.dataset.state = state.checked ? (state.pill === "TAM DOĞRU" ? "correct" : state.pill === "YENİDEN BAK" ? "wrong" : "partial") : "none";
        }
      });
    });
  }

  window.renderTemaFlow = function (unit, api) {
    render(unit, api);
    if (api.assessment || unit.themeAssessment) renderAssessment(api);
  };

  window.renderTema2Flow = function (unit, api) {
    window.renderTemaFlow(unit, api);
  };
})();
