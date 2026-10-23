/*
 * Sosyal Bilgiler karekod çalışmaları — arayüz ve değerlendirme.
 *
 * Kurallar Türkçe'deki karekod çalışmalarıyla aynıdır:
 * - Doğru cevap hiçbir durumda gösterilmez; geri bildirim DURUM / HATA-EKSİK / YOL GÖSTERİCİ
 *   başlıklarıyla yalnızca bir sonraki adımı anlatır.
 * - Not alanları değerlendirilmez, yalnızca saklanır.
 * - Yanıtlar `emr7lect.socialQr.v1` anahtarında, ders ilerlemesinden ayrı tutulur.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "emr7lect.socialQr.v1";
  const LETTERS = ["A", "B", "C", "D", "E"];

  function escape(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[char]);
  }

  function readStore() {
    try {
      const raw = window.localStorage?.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function saveStore(all) {
    try {
      window.localStorage?.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch (error) {
      /* Depolama kapalıysa yanıtlar yalnızca bu oturumda kalır. */
    }
  }

  let store = readStore();

  function entryFor(unitId) {
    store[unitId] = store[unitId] || {};
    store[unitId].values = store[unitId].values || {};
    return store[unitId];
  }

  function chipIcon(unit) {
    const type = String(unit.sourceLinkType || "").toLowerCase();
    if (type === "harita" || type === "pdf") return "📄";
    if (type === "audio") return "🎧";
    return "🎥";
  }

  // EBA derin bağlantıları oturum ister: giriş yapılmamış tarayıcıda bağlantı
  // EBA giriş sayfasına düşer. Bu yüzden her kartta EBA bağlantısının yanına,
  // giriş gerektirmeyen bir arama bağlantısı ve varsa Drive kopyası eklenir.
  function chipLink(url, label, action, icon, className) {
    return `<a class="source-link qr-source-link ${className}" href="${escape(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(action)}: ${escape(label)}"><span class="qr-link-icon" aria-hidden="true">${icon}</span><span class="qr-link-title">${escape(label)}</span><strong class="qr-link-action">${escape(action)}</strong><span class="qr-link-external" aria-hidden="true">↗</span></a>`;
  }

  function searchUrl(unit) {
    const query = `${unit.title} 7. sınıf Sosyal Bilgiler`.replace(/\s+/g, " ").trim();
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  }

  function sourceChip(unit) {
    const chips = [];
    const driveUrl = String(unit.driveUrl || "").trim();
    if (driveUrl) {
      chips.push(chipLink(driveUrl, `${unit.sourceLinkLabel || unit.title} · Drive kopyası`, "Drive'dan aç", chipIcon(unit), "video-source-link drive-source-link"));
    }
    const url = String(unit.sourceUrl || "").trim();
    if (url) {
      const type = String(unit.sourceLinkType || "").toLowerCase();
      const action = type === "harita" ? "Haritayı aç" : type === "pdf" ? "Metni aç" : type === "audio" ? "Dinlemeyi aç" : "Videoyu aç";
      const className = type === "harita" || type === "pdf" ? "pdf-source-link" : type === "audio" ? "audio-source-link" : "video-source-link";
      chips.push(chipLink(url, `${unit.sourceLinkLabel || unit.title} · EBA hesabı gerekir`, action, chipIcon(unit), className));
    }
    if (!driveUrl) {
      chips.push(chipLink(searchUrl(unit), `${unit.title} · girişsiz arama`, "Ara", "🔎", "search-source-link"));
    }
    if (!chips.length) return "";
    return `<div class="reader-links">${chips.join("")}<p class="qr-link-note">EBA bağlantısı hesap istiyorsa “Ara” düğmesi aynı başlıkla girişsiz sonuçları açar; kitabındaki karekodu okutmak da aynı içeriğe gider.</p></div>`;
  }

  function labelMarkup(state, text, hidden) {
    return `<span class="qr-pill" data-state="${escape(state)}"${hidden ? " hidden" : ""}>${escape(text)}</span>`;
  }

  function cardMarkup(unit, entry) {
    const notes = unit.notes.map((note, index) => {
      const value = entry.values[`n:${note.id}`] || "";
      return `<label class="qr-note"><span class="qr-note-label"><span class="qr-number">${index + 1}</span>${escape(note.label)}</span><span class="qr-hint">${escape(note.hint)}</span><textarea class="qr-textarea" data-sqr-note="${escape(note.id)}" data-sqr-unit="${escape(unit.id)}" rows="2">${escape(value)}</textarea></label>`;
    }).join("");

    const before = unit.before.map((prompt, index) => {
      const value = entry.values[`b:${index}`] || "";
      return `<li class="qr-before-item"><span>${escape(prompt)}</span><textarea class="qr-textarea qr-before-input" data-sqr-before="${index}" data-sqr-unit="${escape(unit.id)}" rows="2" aria-label="${escape(prompt)}">${escape(value)}</textarea></li>`;
    }).join("");

    const questions = unit.questions.map((question, index) => {
      const chosen = entry.values[`q:${question.id}`];
      const options = question.options.map((option, optionIndex) => `<label class="qr-choice"><input type="radio" name="sqr-${escape(unit.id)}-${escape(question.id)}" value="${optionIndex}" data-sqr-question="${escape(question.id)}" data-sqr-unit="${escape(unit.id)}"${String(chosen) === String(optionIndex) ? " checked" : ""}><span><b>${LETTERS[optionIndex]})</b> ${escape(option)}</span></label>`).join("");
      return `<fieldset class="qr-question"><legend><span class="qr-number">${index + 1}</span>${escape(question.prompt)}</legend><div class="qr-choices">${options}</div></fieldset>`;
    }).join("");

    const criteria = unit.write.criteria.map((item) => `<li>${escape(item)}</li>`).join("");
    const writeValue = entry.values.w || "";

    return `
<article class="qr-card activity-card social-qr-card" data-sqr-card="${escape(unit.id)}" data-kind="media">
  <header class="activity-top">
    <div class="activity-heading-row"><span class="activity-icon" aria-hidden="true">${chipIcon(unit)}</span><div class="activity-title-copy">
      <p class="activity-kicker">${escape(unit.kind)} · ${escape(unit.where)}</p>
      <h2 class="activity-title">${escape(unit.title)}</h2>
    </div></div>
    <p class="activity-instruction">${escape(unit.intro)}</p>
  </header>
  <div class="activity-meta"><span>${escape(unit.kind)}</span><span>yaklaşık ${Number(unit.minutes)} dk</span><span>${escape(unit.focus)}</span></div>
  ${sourceChip(unit)}
  <div class="question-list">
  <article class="question-card">
    <h5>İzlemeden önce</h5>
    <ul class="qr-before">${before}</ul>
  </article>
  <article class="question-card">
    <h5>İzlerken not al</h5>
    <div class="qr-notes">${notes}</div>
  </article>
  <article class="question-card"${entry.quizState && entry.quizState !== "none" ? ` data-state="${escape(entry.quizState)}"` : ""}>
    <div class="qr-block-head"><h5>İzledikten sonra</h5>${labelMarkup(entry.quizState, entry.quizPill || "", !entry.quizChecked)}</div>
    <div class="qr-quiz">${questions}</div>
    <div class="qr-actions"><button class="btn qr-check check-button" type="button" data-sqr-check="quiz" data-sqr-unit="${escape(unit.id)}">✦ Kontrol et</button></div>
    <p class="qr-feedback" data-sqr-feedback="quiz" data-sqr-unit="${escape(unit.id)}" aria-live="polite"${entry.quizChecked ? "" : " hidden"}>${escape(entry.quizFeedback || "")}</p>
  </article>
  <article class="question-card"${entry.writeState && entry.writeState !== "none" ? ` data-state="${escape(entry.writeState)}"` : ""}>
    <div class="qr-block-head"><h5>${escape(unit.write.title)}</h5>${labelMarkup(entry.writeState, entry.writePill || "", !entry.writeChecked)}</div>
    <p class="qr-instruction">${escape(unit.write.instruction)}</p>
    <ul class="qr-criteria">${criteria}</ul>
    <textarea class="qr-textarea qr-write" data-sqr-write="1" data-sqr-unit="${escape(unit.id)}" rows="6" aria-label="${escape(unit.write.title)}">${escape(writeValue)}</textarea>
    <div class="qr-actions"><button class="btn qr-check check-button" type="button" data-sqr-check="write" data-sqr-unit="${escape(unit.id)}">✦ Kontrol et</button><span class="qr-count" data-sqr-count="${escape(unit.id)}">${writeValue.trim().length}/${unit.write.minChars} karakter</span></div>
    <p class="qr-feedback" data-sqr-feedback="write" data-sqr-unit="${escape(unit.id)}" aria-live="polite"${entry.writeChecked ? "" : " hidden"}>${escape(entry.writeFeedback || "")}</p>
  </article>
  </div>
</article>`;
  }

  function quizVerdict(unit, entry) {
    const total = unit.questions.length;
    const answered = unit.questions.filter((question) => entry.values[`q:${question.id}`] !== undefined).length;
    if (answered < total) {
      return {
        state: "none",
        pill: "YANIT EKSİK",
        checked: false,
        text: `DURUM: YANIT EKSİK · ${answered}/${total}\nHATA/EKSİK: Bazı sorular boş kaldı.\nYOL GÖSTERİCİ: Boş soruya dön; izlediğin bölümü zihninde canlandır ve seçenekleri tek tek ele.`,
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
    return {
      state: correct === 0 ? "wrong" : "partial",
      pill: correct === 0 ? "YENİDEN BAK" : "KISMEN DOĞRU",
      checked: true,
      text: `DURUM: ${correct === 0 ? "YENİDEN BAK" : "KISMEN DOĞRU"} · ${correct}/${total}\nHATA/EKSİK: ${correct === 0 ? "Seçimlerin ölçütlerle örtüşmüyor." : "Bazı seçimler ölçütlerle örtüşmüyor."}\nYOL GÖSTERİCİ: ${unit.focus} · Yanlış olabilecek soruya dön; hangi seçenek gördüğün bir kanıta dayanıyor, hangisi yalnızca tahmin?`,
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

  function unitById(id) {
    return (window.SOCIAL_QR?.units || []).find((unit) => unit.id === id);
  }

  function rerenderFor(host, weekId) {
    saveStore(store);
    const fresh = document.getElementById("socialQrBody");
    if (fresh) render(weekId, fresh);
    return host;
  }

  function bind(host, weekId) {
    host.querySelectorAll("[data-sqr-before]").forEach((area) => {
      area.addEventListener("input", () => {
        const entry = entryFor(area.dataset.sqrUnit);
        entry.values[`b:${area.dataset.sqrBefore}`] = area.value;
        saveStore(store);
      });
    });
    host.querySelectorAll("[data-sqr-note]").forEach((area) => {
      area.addEventListener("input", () => {
        const entry = entryFor(area.dataset.sqrUnit);
        entry.values[`n:${area.dataset.sqrNote}`] = area.value;
        saveStore(store);
      });
    });
    host.querySelectorAll("[data-sqr-question]").forEach((input) => {
      input.addEventListener("change", () => {
        const entry = entryFor(input.dataset.sqrUnit);
        entry.values[`q:${input.dataset.sqrQuestion}`] = Number(input.value);
        entry.quizChecked = false;
        saveStore(store);
      });
    });
    host.querySelectorAll("[data-sqr-write]").forEach((area) => {
      area.addEventListener("input", () => {
        const entry = entryFor(area.dataset.sqrUnit);
        entry.values.w = area.value;
        const unit = unitById(area.dataset.sqrUnit);
        const counter = host.querySelector(`[data-sqr-count="${area.dataset.sqrUnit}"]`);
        if (counter && unit) counter.textContent = `${area.value.trim().length}/${unit.write.minChars} karakter`;
        saveStore(store);
      });
    });
    host.querySelectorAll("[data-sqr-check]").forEach((button) => {
      button.addEventListener("click", () => {
        const unit = unitById(button.dataset.sqrUnit);
        if (!unit) return;
        const kind = button.dataset.sqrCheck;
        const entry = entryFor(unit.id);
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
        saveStore(store);
        render(weekId, host);
        const box = host.querySelector(`[data-sqr-feedback="${kind}"][data-sqr-unit="${unit.id}"]`);
        if (box) {
          box.textContent = result.text;
          box.hidden = false;
        }
      });
    });
  }

  function render(weekId, hostElement) {
    const host = hostElement || document.getElementById("socialQrBody");
    if (!host) return;
    const units = (window.SOCIAL_QR?.units || []).filter((unit) => (unit.weekIds || []).includes(Number(weekId)));
    const section = host.closest("#socialQr");
    if (section) section.hidden = units.length === 0;
    if (!units.length) {
      host.innerHTML = "";
      return;
    }
    host.innerHTML = units.map((unit) => cardMarkup(unit, entryFor(unit.id))).join("");
    bind(host, weekId);
  }

  window.renderSocialQrFlow = render;
  window.SOCIAL_QR_API = {
    exportAnswers: () => JSON.parse(JSON.stringify(store)),
    storageKey: STORAGE_KEY,
  };
})();
