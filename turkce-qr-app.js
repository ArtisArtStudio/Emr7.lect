/*
 * Türkçe karekod çalışmaları — arayüz ve değerlendirme.
 *
 * Kurallar:
 * - Doğru cevap hiçbir durumda gösterilmez; geri bildirim DURUM / HATA-EKSİK / YOL GÖSTERİCİ başlıklarıyla yol gösterir.
 * - Not alanları değerlendirilmez, yalnızca saklanır; yazma görevinde uzunluk ve ölçüt hatırlatması yapılır.
 * - Yanıtlar `data[current].qr[unitId]` altında, diğer çalışma alanlarından ayrı tutulur.
 */
(function () {
  "use strict";

  const LETTERS = ["A", "B", "C", "D", "E"];

  function escape(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);
  }

  function entryFor(store, unitId) {
    const all = store.get();
    all[unitId] = all[unitId] || { values: {}, quizChecked: false, writeChecked: false, quizState: "none", writeState: "none", quizFeedback: "", writeFeedback: "" };
    return all[unitId];
  }

  function labelMarkup(state, text, hidden) {
    return `<span class="qr-pill" data-state="${escape(state)}"${hidden ? " hidden" : ""}>${escape(text)}</span>`;
  }

  function cardMarkup(unit, entry) {
    const notes = unit.notes.map((note, index) => {
      const value = entry.values[`n:${note.id}`] || "";
      return `<label class="qr-note"><span class="qr-note-label"><span class="qr-number">${index + 1}</span>${escape(note.label)}</span><span class="qr-hint">${escape(note.hint)}</span><textarea class="qr-textarea" data-qr-note="${escape(note.id)}" data-qr-unit="${escape(unit.id)}" rows="2">${escape(value)}</textarea></label>`;
    }).join("");

    const before = unit.before.map((prompt, index) => {
      const value = entry.values[`b:${index}`] || "";
      return `<li class="qr-before-item"><span>${escape(prompt)}</span><textarea class="qr-textarea qr-before-input" data-qr-before="${index}" data-qr-unit="${escape(unit.id)}" rows="2" aria-label="${escape(prompt)}">${escape(value)}</textarea></li>`;
    }).join("");

    const questions = unit.questions.map((question, index) => {
      const chosen = entry.values[`q:${question.id}`];
      const options = question.options.map((option, optionIndex) => `<label class="qr-choice"><input type="radio" name="qr-${escape(unit.id)}-${escape(question.id)}" value="${optionIndex}" data-qr-question="${escape(question.id)}" data-qr-unit="${escape(unit.id)}"${String(chosen) === String(optionIndex) ? " checked" : ""}><span><b>${LETTERS[optionIndex]})</b> ${escape(option)}</span></label>`).join("");
      return `<fieldset class="qr-question"><legend><span class="qr-number">${index + 1}</span>${escape(question.prompt)}</legend><div class="qr-choices">${options}</div></fieldset>`;
    }).join("");

    const criteria = unit.write.criteria.map((item) => `<li>${escape(item)}</li>`).join("");
    const writeValue = entry.values.w || "";

    return `
<article class="qr-card" data-qr-card="${escape(unit.id)}">
  <header class="qr-head">
    <span class="qr-kind">${escape(unit.kind)}</span>
    <h4>${escape(unit.title)}</h4>
    <p class="qr-meta">${escape(unit.where)} · yaklaşık ${unit.minutes} dk · ${escape(unit.focus)}</p>
  </header>
  <p class="qr-intro">${escape(unit.intro)}</p>
  <div class="qr-block">
    <h5>İzlemeden önce</h5>
    <ul class="qr-before">${before}</ul>
  </div>
  <div class="qr-block">
    <h5>İzlerken not al</h5>
    <div class="qr-notes">${notes}</div>
  </div>
  <div class="qr-block">
    <div class="qr-block-head"><h5>İzledikten sonra</h5>${labelMarkup(entry.quizState, entry.quizPill || "", !entry.quizChecked)}</div>
    <div class="qr-quiz">${questions}</div>
    <div class="qr-actions"><button class="btn qr-check" type="button" data-qr-check="quiz" data-qr-unit="${escape(unit.id)}">Seçimlerimi kontrol et</button></div>
    <p class="qr-feedback" data-qr-feedback="quiz" data-qr-unit="${escape(unit.id)}" aria-live="polite"${entry.quizChecked ? "" : " hidden"}>${escape(entry.quizFeedback)}</p>
  </div>
  <div class="qr-block">
    <div class="qr-block-head"><h5>${escape(unit.write.title)}</h5>${labelMarkup(entry.writeState, entry.writePill || "", !entry.writeChecked)}</div>
    <p class="qr-instruction">${escape(unit.write.instruction)}</p>
    <ul class="qr-criteria">${criteria}</ul>
    <textarea class="qr-textarea qr-write" data-qr-write="1" data-qr-unit="${escape(unit.id)}" rows="6" aria-label="${escape(unit.write.title)}">${escape(writeValue)}</textarea>
    <div class="qr-actions"><button class="btn qr-check" type="button" data-qr-check="write" data-qr-unit="${escape(unit.id)}">Yazımı kontrol et</button>${unit.analysis ? `<button class="btn qr-ai" type="button" data-qr-ai="${escape(unit.id)}">Yapay zekâ ile değerlendir</button>` : ""}<span class="qr-count" data-qr-count="${escape(unit.id)}">${writeValue.trim().length}/${unit.write.minChars} karakter</span></div>
    <p class="qr-feedback" data-qr-feedback="write" data-qr-unit="${escape(unit.id)}" aria-live="polite"${entry.writeChecked ? "" : " hidden"}>${escape(entry.writeFeedback)}</p>
  </div>
</article>`;
  }

  function quizVerdict(unit, entry) {
    const answered = unit.questions.filter((question) => entry.values[`q:${question.id}`] !== undefined).length;
    const total = unit.questions.length;
    if (answered < total) {
      return {
        state: "none",
        pill: "YANIT EKSİK",
        checked: false,
        text: `DURUM: YANIT EKSİK · ${answered}/${total}\nHATA/EKSİK: Bazı sorular boş kaldı.\nYOL GÖSTERİCİ: Boş soruya dön, izlediğin bölümü zihninde canlandır ve seçenekleri tek tek ele.`,
      };
    }
    const correct = unit.questions.filter((question) => Number(entry.values[`q:${question.id}`]) === question.answer).length;
    if (correct === total) {
      return {
        state: "correct",
        pill: "TAM DOĞRU",
        checked: true,
        text: `DURUM: TAM DOĞRU · ${correct}/${total}\nTüm seçimlerin ölçütlerle örtüşüyor. Şimdi notlarındaki bir ayrıntıyı yazına taşı.\nYOL GÖSTERİCİ: ${unit.focus} · Not çizelgende boş alan bırakma.`,
      };
    }
    const state = correct === 0 ? "wrong" : "partial";
    return {
      state,
      pill: correct === 0 ? "YENİDEN BAK" : "KISMEN DOĞRU",
      checked: true,
      text: `DURUM: ${correct === 0 ? "YENİDEN BAK" : "KISMEN DOĞRU"} · ${correct}/${total}\nHATA/EKSİK: ${correct === 0 ? "Seçimlerin ölçütlerle örtüşmüyor." : "Bazı seçimler ölçütlerle örtüşmüyor."}\nYOL GÖSTERİCİ: ${unit.focus} · Yanlış olabilecek soruya dön; hangi seçenek izlediğin içerikte gördüğün bir kanıta dayanıyor, hangisi yalnızca tahmin?`,
    };
  }

  function writeVerdict(unit, value) {
    const length = String(value || "").trim().length;
    if (length < unit.write.minChars) {
      return {
        state: "none",
        pill: "YANIT EKSİK",
        checked: false,
        text: `DURUM: YANIT EKSİK · ${length}/${unit.write.minChars} karakter\nHATA/EKSİK: Yanıt beklenen uzunluğa ulaşmadı.\nYOL GÖSTERİCİ: ${unit.write.guide}\nYAZMAYA BAŞLA: ${unit.write.starter}`,
      };
    }
    return {
      state: "correct",
      pill: "YAZIN KAYDEDİLDİ",
      checked: true,
      text: `DURUM: YAZIN KAYDEDİLDİ · ${length} karakter\nÖLÇÜTLERİ KENDİN DENETLE: Yukarıdaki ölçütlerin tamamı karşılandı mı? Yanıtını yüksek sesle oku; anlaşılmayan bir cümle varsa yeniden yaz.\nYOL GÖSTERİCİ: ${unit.write.guide}\nTEŞVİK: Yazdığın bölümü izlerken aldığın notlarla karşılaştır; eksik kalan bir ayrıntıyı ekle.`,
    };
  }

  /* Yapay zekâ değerlendirmesi yalnız dökümü/analizi olan içeriklerde açılır.
     Model yalnızca kapalı kodlar döndürür; öğrenciye gösterilen metin bu kodlardan üretilir,
     böylece doğru cevap hiçbir koşulda ekrana gelmez. */
  const AI_STATUS = {
    correct: "TAM DOĞRU",
    partial: "KISMEN DOĞRU",
    wrong: "YENİDEN BAK",
    incomplete: "YANIT EKSİK",
    unverified: "DOĞRULANAMADI",
  };
  const AI_ISSUES = {
    relevance: "Yanıtın soruyla ilişkisi zayıf kalmış.",
    evidence: "Görüşün videodaki bir örneğe dayandırılmamış.",
    completeness: "İstenen öğelerden en az biri eksik.",
    reasoning: "Gerekçe ile sonuç arasındaki bağ açık değil.",
    accuracy: "Bir bilgi videodaki anlatımla örtüşmüyor.",
    source: "Bu bilgi videodan doğrulanamıyor.",
    selection: "Seçim ile gerekçe birbirini tutmuyor.",
  };
  const AI_HINTS = {
    reread: "Videonun ilgili bölümünü bir kez daha izle; notlarınla yan yana koy.",
    count: "İstediğin öğeleri tek tek say: hepsi yanıtında var mı?",
    evidence: "Her görüşün yanına videodan somut bir örnek ekle.",
    explain: "Bir cümleyi “çünkü” ile genişlet; nedeni görünür olsun.",
    connect: "Videodaki öneriyi kendi günlük düzeninle ilişkilendir.",
    justify: "Seçtiğin yöntemin sana neden uyduğunu gerekçelendir.",
    context: "Yanıtı kendi hayatından bir durumla somutlaştır.",
    compare: "İki durumu yan yana koy: benzerlik ve farkı ayrı yaz.",
  };

  function aiFeedbackText(result, length) {
    const statusLabel = AI_STATUS[result.status] || AI_STATUS.unverified;
    const issues = (result.issues || []).map((code) => AI_ISSUES[code]).filter(Boolean);
    const hint = AI_HINTS[result.hint] || "";
    const lines = [`DURUM: ${statusLabel} · ${length} karakter`];
    lines.push(`HATA/EKSİK: ${issues.length ? issues.join(" ") : "Belirgin bir eksik görülmedi."}`);
    if (result.guide || hint) lines.push(`YOL GÖSTERİCİ: ${result.guide || hint}`);
    if (result.starter) lines.push(`YAZMAYA BAŞLA: ${result.starter}`);
    lines.push("TEŞVİK: Yanıtını yüksek sesle oku; anlaşılmayan bir cümle varsa yeniden yaz.");
    return lines.join("\n");
  }

  function aiContext(unit) {
    const analysis = unit.analysis;
    const segments = analysis.segments.map((segment) => `${segment.at} · ${segment.note}`).join("\n");
    return [
      `Video: ${unit.title} (${analysis.speaker})`,
      `Konu: ${analysis.summary}`,
      `Bölümler:\n${segments}`,
      `Değerlendirmede beklenen öğeler:\n- ${unit.write.answerKey.join("\n- ")}`,
    ].join("\n\n");
  }

  async function aiGrade(unit, entry, host, button, api) {
    const value = String(entry.values.w || "");
    const length = value.trim().length;
    const box = host.querySelector(`[data-qr-feedback="write"][data-qr-unit="${unit.id}"]`);
    if (length < unit.write.minChars) {
      const local = writeVerdict(unit, value);
      entry.writeState = local.state;
      entry.writePill = local.pill;
      entry.writeChecked = false;
      entry.writeFeedback = local.text;
      api.store.save();
      api.rerender?.();
      const fresh = document.querySelector(`[data-qr-feedback="write"][data-qr-unit="${unit.id}"]`);
      if (fresh) { fresh.textContent = local.text; fresh.hidden = false; }
      return;
    }
    const apiKey = document.getElementById("apiKey")?.value.trim();
    if (!apiKey) {
      if (box) {
        box.hidden = false;
        box.textContent = "DURUM: AI KAPALI\nYOL GÖSTERİCİ: Bu yanıtı yapay zekâ ile değerlendirmek için sayfanın üstündeki ortak yapay zekâ ayarlarına Groq API anahtarını gir. Anahtar bu tarayıcıdan dışarı kaydedilmez.";
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
    if (box) {
      box.hidden = false;
      box.textContent = "Yanıtın videodaki anlatıma ve ölçütlere göre inceleniyor…";
    }
    const systemPrompt = [
      "Sen 7. sınıf Türkçe dersi için adil, kanıta dayalı bir değerlendiricisin. Kaynak, öğrencinin izlediği videonun kullanıcı tarafından sağlanan analizidir; videoyu izlemedin.",
      "Öğrencinin yanıtını yalnızca verilen analizdeki bilgilerle ve ölçütlerle karşılaştır. Analizde olmayan ayrıntıyı doğrulanmış sayma; böyle bir iddia varsa status=unverified ve issue=source kullan.",
      "Cevabı, doğru seçeneği veya örnek yanıtı hiçbir alanda yazma; yalnızca öğrencinin bir sonraki adımını anlatan kısa bir yol gösterici cümle ve tamamlanacak yarım cümle ver.",
      "Çıktı yalnızca geçerli JSON olsun: {\"status\":\"correct|partial|wrong|incomplete|unverified\",\"issues\":[\"relevance|evidence|completeness|reasoning|accuracy|source|selection\"],\"hint\":\"reread|count|evidence|explain|connect|justify|context|compare\",\"guide\":\"en çok 220 karakter, tek cümle\",\"starter\":\"en çok 140 karakter, yarım cümle\"}.",
      "Markdown, açıklama veya JSON dışı metin ekleme.",
    ].join("\n");
    const userPrompt = [
      `Görev: ${unit.write.title}`,
      `Yönerge: ${unit.write.instruction}`,
      `Ölçütler:\n- ${unit.write.criteria.join("\n- ")}`,
      `Öğrencinin yanıtı:\n${value}`,
      `\nVideo analizi (kaynak):\n${aiContext(unit)}`,
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
      const result = {
        status: AI_STATUS[raw.status] ? raw.status : "unverified",
        issues: Array.isArray(raw.issues) ? raw.issues.slice(0, 3) : [],
        hint: typeof raw.hint === "string" ? raw.hint : "",
        guide: guidance.guide,
        starter: guidance.starter,
      };
      const text = aiFeedbackText(result, length);
      entry.writeState = result.status === "correct" ? "correct" : result.status === "incomplete" ? "none" : result.status === "partial" ? "partial" : "wrong";
      entry.writePill = AI_STATUS[result.status];
      entry.writeChecked = true;
      entry.writeFeedback = text;
      api.store.save();
      api.rerender?.();
      const fresh = document.querySelector(`[data-qr-feedback="write"][data-qr-unit="${unit.id}"]`);
      if (fresh) { fresh.textContent = text; fresh.hidden = false; }
    } catch (error) {
      if (box) {
        box.hidden = false;
        box.textContent = `DURUM: DEĞERLENDİRİLEMEDİ\nHATA/EKSİK: İstek tamamlanamadı (${String(error.message || error).slice(0, 80)}).\nYOL GÖSTERİCİ: Bağlantını ve anahtarını denetle; gerekirse birkaç saniye sonra yeniden dene. Yazdıkların kaybolmadı.`;
      }
    } finally {
      button.disabled = false;
      button.textContent = original;
    }
  }

  function render(unitIds, api) {
    const host = document.getElementById("turkceQrBody");
    if (!host) return;
    const units = window.TURKCE_QR.units.filter((unit) => unitIds.includes(unit.id));
    const store = api.store;
    host.innerHTML = units.map((unit) => cardMarkup(unit, entryFor(store, unit.id))).join("");

    host.querySelectorAll("[data-qr-before]").forEach((area) => {
      area.addEventListener("input", () => {
        const entry = entryFor(store, area.dataset.qrUnit);
        entry.values[`b:${area.dataset.qrBefore}`] = area.value;
        store.save();
      });
    });
    host.querySelectorAll("[data-qr-note]").forEach((area) => {
      area.addEventListener("input", () => {
        const entry = entryFor(store, area.dataset.qrUnit);
        entry.values[`n:${area.dataset.qrNote}`] = area.value;
        store.save();
      });
    });
    host.querySelectorAll("[data-qr-question]").forEach((input) => {
      input.addEventListener("change", () => {
        const entry = entryFor(store, input.dataset.qrUnit);
        entry.values[`q:${input.dataset.qrQuestion}`] = Number(input.value);
        entry.quizChecked = false;
        store.save();
      });
    });
    host.querySelectorAll("[data-qr-write]").forEach((area) => {
      area.addEventListener("input", () => {
        const entry = entryFor(store, area.dataset.qrUnit);
        entry.values.w = area.value;
        const unit = window.TURKCE_QR.units.find((item) => item.id === area.dataset.qrUnit);
        const counter = host.querySelector(`[data-qr-count="${area.dataset.qrUnit}"]`);
        if (counter && unit) counter.textContent = `${area.value.trim().length}/${unit.write.minChars} karakter`;
        store.save();
      });
    });
    host.querySelectorAll("[data-qr-ai]").forEach((button) => {
      button.addEventListener("click", () => {
        const unit = window.TURKCE_QR.units.find((item) => item.id === button.dataset.qrAi);
        if (!unit) return;
        aiGrade(unit, entryFor(store, unit.id), host, button, api);
      });
    });
    host.querySelectorAll("[data-qr-check]").forEach((button) => {
      button.addEventListener("click", () => {
        const unit = window.TURKCE_QR.units.find((item) => item.id === button.dataset.qrUnit);
        if (!unit) return;
        const kind = button.dataset.qrCheck;
        const entry = entryFor(store, unit.id);
        const result = kind === "quiz" ? quizVerdict(unit, entry) : writeVerdict(unit, entry.values.w);
        if (kind === "quiz") {
          entry.quizState = result.state;
          entry.quizPill = result.pill;
          entry.quizChecked = result.checked;
          entry.quizFeedback = result.text;
        } else {
          entry.writeState = result.state;
          entry.writePill = result.pill;
          entry.writeChecked = result.checked;
          entry.writeFeedback = result.text;
        }
        store.save();
        api.rerender?.();
        const box = document.querySelector(`[data-qr-feedback="${kind}"][data-qr-unit="${unit.id}"]`);
        if (box) {
          box.textContent = result.text;
          box.hidden = false;
        }
      });
    });
    host.querySelectorAll("[data-qr-card]").forEach((card) => {
      const entry = entryFor(store, card.dataset.qrCard);
      card.dataset.quizState = entry.quizState || "none";
      card.dataset.writeState = entry.writeState || "none";
    });
  }

  window.renderTurkceQrFlow = function (units, api) {
    render(units.map((unit) => unit.id), api);
  };
})();
