(() => {
  "use strict";

  const STORE_KEY = "turkceRota2026";
  const GROQ_KEY = "turkceGroqKey2026";
  const GROQ_MODEL = "turkceGroqModel2026";
  const DEFAULT_MODEL = "openai/gpt-oss-20b";
  const units = window.THEME1_PRACTICE?.units || [];
  const unitMap = new Map(units.map(unit => [Number(unit.weekId), unit]));
  const params = new URLSearchParams(window.location.search);
  const requestedUnit = Number(params.get("unit"));
  const selectedUnit = unitMap.get(requestedUnit) || units[0];
  if (!selectedUnit) return;

  let savedData = {};
  try {
    const parsed = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) savedData = parsed;
  } catch (error) {
    savedData = {};
  }

  const flowState = () => {
    if (!savedData[selectedUnit.weekId] || typeof savedData[selectedUnit.weekId] !== "object") {
      savedData[selectedUnit.weekId] = {};
    }
    const week = savedData[selectedUnit.weekId];
    if (!week.theme1PracticeFlow || typeof week.theme1PracticeFlow !== "object") {
      week.theme1PracticeFlow = { answers: {}, feedback: {}, stepIndex: 0 };
    }
    const flow = week.theme1PracticeFlow;
    flow.answers = flow.answers && typeof flow.answers === "object" ? flow.answers : {};
    flow.feedback = flow.feedback && typeof flow.feedback === "object" ? flow.feedback : {};
    return flow;
  };

  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const normaliseOptions = options => (options || []).map(option => typeof option === "string"
    ? { value: option, label: option }
    : { value: String(option.value), label: String(option.label) });
  const allSteps = selectedUnit.groups.flatMap(group => group.activities.map(activity => ({
    groupTitle: group.title,
    activity
  })));
  const forms = window.THEME1_FORMS || {};
  let stepIndex = Math.max(0, Math.min(allSteps.length - 1, Number(flowState().stepIndex) || 0));

  const activitySourceKeys = {
    "marti-a01": ["marti"], "marti-a02": ["marti"], "marti-a03": ["marti"],
    "marti-a04": ["marti"], "marti-a05": ["marti"], "marti-a06": ["marti"], "marti-a07": ["marti"],
    "genclik-a01": ["gencligin"], "genclik-a03": ["gencligin"],
    "adiny-a01": ["adini"], "adiny-a02": ["adini"], "adiny-a03": ["adini"], "adiny-a04": ["adini"]
  };
  const packageNav = document.getElementById("package-nav");
  const overview = document.getElementById("package-overview");
  const stage = document.getElementById("activity-stage");
  const stepTrack = document.getElementById("step-track");
  const stepTitle = document.getElementById("flow-step-title");
  const flowCount = document.getElementById("flow-count");
  const progressTrack = document.getElementById("progress-track");
  const progressValue = document.getElementById("progress-value");
  const previousButton = document.getElementById("previous-step");
  const nextButton = document.getElementById("next-step");
  const keyInput = document.getElementById("groq-key");
  const modelInput = document.getElementById("groq-model");
  const rememberInput = document.getElementById("remember-key");
  const groqStatus = document.getElementById("groq-status");
  const saveIndicator = document.getElementById("save-indicator");
  let saveTimer = 0;

  const savedKey = localStorage.getItem(GROQ_KEY) || "";
  const savedModel = localStorage.getItem(GROQ_MODEL) || DEFAULT_MODEL;
  keyInput.value = savedKey;
  rememberInput.checked = Boolean(savedKey);
  modelInput.value = ["openai/gpt-oss-20b", "openai/gpt-oss-120b"].includes(savedModel)
    ? savedModel : DEFAULT_MODEL;

  function persist() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(savedData));
      saveIndicator.textContent = "✓ Kaydedildi";
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => {
        saveIndicator.textContent = "Yanıtlar bu tarayıcıda kaydedilir";
      }, 1300);
    } catch (error) {
      saveIndicator.textContent = "Tarayıcı depolaması dolu; ilerleme kaydedilemedi.";
    }
  }

  function questionList(activity) {
    const configured = forms[activity.id];
    if (Array.isArray(configured) && configured.length) return configured;
    const prompts = activity.prompts?.length ? activity.prompts : [activity.instruction || activity.title];
    return prompts.map((prompt, index) => ({
      id: `response-${index + 1}`,
      prompt,
      fields: [{ id: "answer", label: "Yanıtın", type: "textarea", rows: 4 }]
    }));
  }

  function questionKey(activity, question) {
    return `${activity.id}::${question.id}`;
  }

  function currentAnswer(activity, question, index) {
    const flow = flowState();
    const key = questionKey(activity, question);
    if (flow.answers[key] && typeof flow.answers[key] === "object") return flow.answers[key];
    const legacyValue = savedData[selectedUnit.weekId]?.theme1Practice?.[activity.id];
    if (index === 0 && typeof legacyValue === "string" && legacyValue.trim()) {
      const firstField = question.fields?.find(item => ["textarea", "text", "number"].includes(item.type || "textarea"));
      if (firstField) return { [firstField.id]: legacyValue };
    }
    return {};
  }

  function fieldHTML(field, value, qKey, unitId) {
    const fieldId = `${qKey}-${field.id}`;
    const label = escapeHTML(field.label || "Yanıt");
    const type = field.type || "textarea";
    const baseAttrs = `class="answer-control" data-answer-field="1" data-qkey="${escapeHTML(qKey)}" data-field-id="${escapeHTML(field.id)}" data-unit-id="${unitId}"`;
    const rowClass = field.rows ? ` data-rows="${Number(field.rows)}"` : "";

    if (type === "radio") {
      const checkedValue = String(value ?? "");
      const options = normaliseOptions(field.options).map((option, index) => {
        const inputId = `${fieldId}-${index}`;
        return `<label class="radio-option" for="${escapeHTML(inputId)}"><input id="${escapeHTML(inputId)}" type="radio" name="${escapeHTML(fieldId)}" value="${escapeHTML(option.value)}" data-answer-field="1" data-qkey="${escapeHTML(qKey)}" data-field-id="${escapeHTML(field.id)}" data-unit-id="${unitId}" ${checkedValue === option.value ? "checked" : ""}><span>${escapeHTML(option.label)}</span></label>`;
      }).join("");
      return `<div class="form-field full"><span>${label}</span><div class="radio-options">${options}</div></div>`;
    }

    if (type === "select") {
      const options = normaliseOptions(field.options).map(option =>
        `<option value="${escapeHTML(option.value)}" ${String(value ?? "") === option.value ? "selected" : ""}>${escapeHTML(option.label)}</option>`
      ).join("");
      return `<label class="form-field" for="${escapeHTML(fieldId)}"${rowClass}>${label}<select id="${escapeHTML(fieldId)}" ${baseAttrs}><option value="">Seçiniz…</option>${options}</select></label>`;
    }

    if (type === "text" || type === "number") {
      return `<label class="form-field" for="${escapeHTML(fieldId)}"${rowClass}>${label}<input id="${escapeHTML(fieldId)}" type="${type}" ${baseAttrs} value="${escapeHTML(value)}"${type === "number" ? " inputmode=\"numeric\"" : ""}></label>`;
    }

    if (type === "checkboxes") {
      const selected = Array.isArray(value) ? value.map(String) : [];
      const options = normaliseOptions(field.options).map((option, index) => {
        const inputId = `${fieldId}-${index}`;
        return `<label class="radio-option" for="${escapeHTML(inputId)}"><input id="${escapeHTML(inputId)}" type="checkbox" name="${escapeHTML(fieldId)}" value="${escapeHTML(option.value)}" data-answer-field="1" data-qkey="${escapeHTML(qKey)}" data-field-id="${escapeHTML(field.id)}" data-unit-id="${unitId}" ${selected.includes(option.value) ? "checked" : ""}><span>${escapeHTML(option.label)}</span></label>`;
      }).join("");
      return `<div class="form-field full"><span>${label}</span><div class="radio-options">${options}</div></div>`;
    }

    const rows = Math.max(2, Math.min(9, Number(field.rows) || 3));
    return `<label class="form-field${rows >= 4 ? " full" : ""}" for="${escapeHTML(fieldId)}"${rowClass}>${label}<textarea id="${escapeHTML(fieldId)}" rows="${rows}" ${baseAttrs}>${escapeHTML(value)}</textarea></label>`;
  }

  function savedFeedback(activity, question) {
    return flowState().feedback[questionKey(activity, question)] || null;
  }

  function answered(question, answer) {
    return (question.fields || []).some(field => {
      const value = answer[field.id];
      return Array.isArray(value) ? value.length > 0 : String(value ?? "").trim().length > 0;
    });
  }

  function sourceDescription(activity) {
    return activitySourceKeys[activity.id] || [];
  }

  function readerLink(weekId = selectedUnit.weekId) {
    return `./index.html?week=${encodeURIComponent(weekId)}#bookText`;
  }

  const storyReaderLinks = {
    marti: { weekId: 1, title: "Martı Jonathan Livingston" },
    gencligin: { weekId: 3, title: "Gençliğin Kıymeti" },
    adini: { weekId: 5, title: "Adını Göklere Yazdıran Çocuk" }
  };

  function readerLinksFor(activity) {
    const keys = sourceDescription(activity);
    return keys.map(key => storyReaderLinks[key]).filter(Boolean).map(item =>
      `<a class="source-link" href="${readerLink(item.weekId)}">${escapeHTML(item.title)} metnini aç ↗</a>`
    ).join("");
  }

  function renderPackageTabs() {
    packageNav.innerHTML = units.map(unit => {
      const current = Number(unit.weekId) === Number(selectedUnit.weekId);
      return `<a class="package-tab" href="./theme1-practice.html?unit=${encodeURIComponent(unit.weekId)}" ${current ? 'aria-current="page"' : ""}><strong>${escapeHTML(unit.label)} · ${escapeHTML(unit.title)}</strong><span>${escapeHTML(unit.inventoryCount)} · ${escapeHTML(unit.pages)}</span></a>`;
    }).join("");
  }

  function renderOverview() {
    const totalQuestions = allSteps.reduce((sum, step) => sum + questionList(step.activity).length, 0);
    overview.innerHTML = `<div><h2>${escapeHTML(selectedUnit.label)} · ${escapeHTML(selectedUnit.title)}</h2><p>${escapeHTML(selectedUnit.inventoryCount)} · PDF ${escapeHTML(selectedUnit.pages)} · Bu pakette ${allSteps.length} etkinlik ve ${totalQuestions} soru adımı var.</p><div class="package-facts"><span>${escapeHTML(selectedUnit.groups.length)} çalışma bölümü</span><span>Sırayla ilerleyen etkinlik akışı</span><span>Her soru için ayrı kontrol</span></div></div><a class="source-link" href="${readerLink()}">İlgili okuma metnini aç ↗</a>`;
  }

  function getStepInfo(index) {
    const step = allSteps[index];
    return { ...step, questions: questionList(step.activity) };
  }

  function renderStepTrack() {
    stepTrack.innerHTML = allSteps.map((step, index) => {
      const info = getStepInfo(index);
      const hasAnswer = info.questions.some((question, questionIndex) => answered(question, currentAnswer(info.activity, question, questionIndex)));
      const label = `${step.activity.number}. ${step.activity.title}`;
      return `<button type="button" class="step-dot${hasAnswer ? " is-answered" : ""}" data-step-index="${index}" aria-label="Adım ${index + 1}: ${escapeHTML(label)}" title="${escapeHTML(label)}" ${index === stepIndex ? 'aria-current="step"' : ""}>${index + 1}</button>`;
    }).join("");
    stepTrack.querySelectorAll("[data-step-index]").forEach(button => {
      button.addEventListener("click", () => goToStep(Number(button.dataset.stepIndex)));
    });
  }

  function renderStep() {
    const info = getStepInfo(stepIndex);
    const { activity, groupTitle, questions } = info;
    const progress = Math.round(((stepIndex + 1) / allSteps.length) * 100);
    const answeredCount = questions.filter((question, index) => answered(question, currentAnswer(activity, question, index))).length;
    stepTitle.textContent = `Adım ${stepIndex + 1} / ${allSteps.length} · ${activity.title}`;
    flowCount.textContent = `${answeredCount}/${questions.length} soru yanıtlandı`;
    progressValue.style.width = `${progress}%`;
    progressTrack.setAttribute("aria-valuenow", String(progress));
    previousButton.disabled = stepIndex === 0;
    nextButton.textContent = stepIndex === allSteps.length - 1 ? "Paketi tamamla ✓" : "Sonraki adım →";

    const questionHTML = questions.map((question, index) => {
      const qKey = questionKey(activity, question);
      const answers = currentAnswer(activity, question, index);
      const feedback = savedFeedback(activity, question);
      const fieldHTMLContent = (question.fields || [{ id: "answer", label: "Yanıtın", type: "textarea", rows: 4 }])
        .map(field => fieldHTML(field, answers[field.id], qKey, selectedUnit.weekId)).join("");
      const widgetName = question.responseType === "matching"
        ? "Eşleştirme / sınıflandırma"
        : (question.fields || []).some(field => field.type === "radio" || field.type === "select")
          ? "Seçim ve gerekçe"
          : "Yazılı yanıt";
      return `<article class="question-card" data-question-key="${escapeHTML(qKey)}">
        <div class="question-heading"><span class="question-number">${index + 1}</span><p class="question-prompt">${escapeHTML(question.prompt)}</p></div>
        <span class="response-type">${widgetName}</span>
        <div class="answer-box"><p class="answer-box-title">Yanıt alanı</p><div class="form-fields">${fieldHTMLContent}</div></div>
        <div class="question-actions"><button type="button" class="check-button" data-check-question="${escapeHTML(qKey)}">✦ Kontrol et</button><span class="question-save-status">Yanıt otomatik kaydedilir.</span></div>
        <div class="feedback-box" data-feedback-key="${escapeHTML(qKey)}" data-state="${escapeHTML(feedback?.state || "success")}" ${feedback?.text ? "" : "hidden"}>${escapeHTML(feedback?.text || "")}</div>
      </article>`;
    }).join("");

    const sourceHTML = activity.sourceText
      ? `<blockquote class="activity-source"><strong>Bu etkinliğin özgün kaynak metni</strong>${escapeHTML(activity.sourceText)}</blockquote>`
      : "";
    const readerHTML = readerLinksFor(activity);
    const sourceModeNote = questions.some(question => question.sourceMode === "qr")
      ? `<span>QR video/dinleme kaydı kitapta açılır</span>`
      : "";

    stage.innerHTML = `<article class="activity-card">
      <header class="activity-top">
        <p class="activity-kicker">${escapeHTML(groupTitle)} · Etkinlik ${escapeHTML(activity.number)}</p>
        <h2 class="activity-title">${escapeHTML(activity.title)}</h2>
        <p class="activity-instruction">${escapeHTML(activity.instruction || "Soruları sırayla yanıtla.")}</p>
      </header>
      ${sourceHTML}
      <div class="activity-meta"><span>${escapeHTML(activity.format || "Çalışma")}</span><span>${escapeHTML(activity.count || "")}</span><span>Kaynak: ${escapeHTML(activity.source || "Tema 1")}</span>${sourceModeNote}</div>
      ${readerHTML ? `<div class="reader-links">${readerHTML}</div>` : ""}
      <div class="question-list">${questionHTML}</div>
    </article>`;

    stage.querySelectorAll("[data-answer-field]").forEach(control => {
      const saveAnswer = () => {
        const key = control.dataset.qkey;
        const fieldId = control.dataset.fieldId;
        if (!key || !fieldId) return;
        const flow = flowState();
        if (!flow.answers[key] || typeof flow.answers[key] !== "object") flow.answers[key] = {};
        let value;
        if (control.type === "radio") {
          if (!control.checked) return;
          value = control.value;
        } else if (control.type === "checkbox") {
          const group = Array.from(stage.querySelectorAll("[data-qkey][data-field-id]"))
            .filter(item => item.dataset.qkey === key && item.dataset.fieldId === fieldId);
          value = group.filter(item => item.checked).map(item => item.value);
        } else {
          value = control.value;
        }
        flow.answers[key][fieldId] = value;
        flow.feedback[key] = flow.feedback[key] || null;
        persist();
        flowCount.textContent = `${questions.filter((question, index) => answered(question, currentAnswer(activity, question, index))).length}/${questions.length} soru yanıtlandı`;
        renderStepTrack();
      };
      control.addEventListener("input", saveAnswer);
      control.addEventListener("change", saveAnswer);
    });

    stage.querySelectorAll("[data-check-question]").forEach(button => {
      button.addEventListener("click", () => {
        const question = questions.find(candidate => questionKey(activity, candidate) === button.dataset.checkQuestion);
        if (question) checkQuestion(activity, question, button);
      });
    });
    renderStepTrack();
  }

  function saveStepIndex() {
    flowState().stepIndex = stepIndex;
    persist();
  }

  function goToStep(index) {
    if (!Number.isInteger(index) || index < 0 || index >= allSteps.length) return;
    stepIndex = index;
    saveStepIndex();
    renderStep();
    window.scrollTo({ top: document.getElementById("flow-step-title").getBoundingClientRect().top + window.scrollY - 25, behavior: "smooth" });
  }

  function sourceContext(activity, question) {
    const mode = question.sourceMode || (activity.sourceText ? "activity" : "story");
    if (mode === "none") return { text: "", note: "Bu soru için ek kaynak metin kullanılmıyor." };
    if (mode === "qr") return { text: "", note: "Kaynak, öğrencinin kitabındaki QR video/dinleme kaydıdır. Uygulamada video veya döküm bulunmadığından ayrıntı uydurma; öğrencinin sunduğu kanıtı ve açıklamasını değerlendirmeye odaklan." };
    if (mode === "book") return { text: "", note: "Kaynak Türkçe 7 kitabının 47. sayfasındaki iki şiirdir; şiirlerin tam metni uygulamaya eklenmemiştir. Dize veya şiir ayrıntısı uydurma; öğrencinin alıntı ve inceleme dayanağını değerlendir." };
    if (mode === "activity") return { text: activity.sourceText || "", note: "Etkinlik sayfasında görünen özgün kısa kaynak metin." };

    const keys = question.sourceKeys || (question.sourceKey ? [question.sourceKey] : activitySourceKeys[activity.id] || []);
    const textParts = keys.map(key => window.BOOK_TEXTS?.[key]).filter(Boolean);
    if (textParts.length) {
      let text = textParts.join("\n\n--- Karşılaştırılan başka bir öykü ---\n\n");
      if (question.sourceStage && keys.includes("marti")) {
        const marker = question.sourceStage === "pause1" ? "[[PAUSE:1]]" : question.sourceStage === "pause2" ? "[[PAUSE:2]]" : "";
        if (marker) {
          const markerPosition = text.indexOf(marker);
          if (markerPosition >= 0) text = text.slice(0, markerPosition);
        }
      }
      text = text.replace(/\[\[PAUSE:\d+\]\]/g, "").slice(0, 18000);
      const baseNote = "İlgili ders kitabı öyküsü / okuma metni aşağıda bağlam olarak verilmiştir.";
      return { text, note: question.sourceNote ? `${baseNote} ${question.sourceNote}` : baseNote };
    }
    if (activity.sourceText) return { text: activity.sourceText, note: "Etkinlikte görünen özgün kısa kaynak metin." };
    return { text: "", note: "Bu etkinlikte öğrenci kendi gözlem, deneyim veya kaynak notunu kullanır." };
  }

  function answerForAI(activity, question, index) {
    const answers = currentAnswer(activity, question, index);
    return (question.fields || []).map(field => {
      const value = answers[field.id];
      const printable = Array.isArray(value) ? value.join(", ") : String(value ?? "").trim();
      return `${field.label || field.id}: ${printable || "(boş)"}`;
    }).join("\n");
  }

  function showFeedback(card, text, state) {
    const feedback = card?.querySelector(".feedback-box");
    if (!feedback) return;
    feedback.textContent = text;
    feedback.dataset.state = state;
    feedback.hidden = false;
  }

  function saveGroqSettings() {
    const key = keyInput.value.trim();
    if (rememberInput.checked && key) localStorage.setItem(GROQ_KEY, key);
    else localStorage.removeItem(GROQ_KEY);
    localStorage.setItem(GROQ_MODEL, modelInput.value);
    groqStatus.dataset.state = "success";
    groqStatus.textContent = rememberInput.checked && key
      ? "Ayarlar bu cihazda saklandı. Anahtar GitHub’a gönderilmez."
      : "Model ayarlandı. Anahtar bu cihazda kalıcı olarak saklanmıyor.";
  }

  async function checkQuestion(activity, question, button) {
    const key = questionKey(activity, question);
    const index = questionList(activity).indexOf(question);
    const answer = currentAnswer(activity, question, index);
    const card = button.closest(".question-card");
    const response = answerForAI(activity, question, index);
    const hasResponse = Object.values(answer).some(value => Array.isArray(value)
      ? value.length > 0
      : String(value ?? "").trim().length > 0);
    if (!hasResponse) {
      showFeedback(card, "Önce yanıt alanını doldur; sonra yeniden kontrol et.", "error");
      return;
    }
    const apiKey = keyInput.value.trim();
    if (!apiKey) {
      showFeedback(card, "Groq API anahtarını yukarıdaki alana ekle. Anahtar yalnızca bu tarayıcıda tutulur; istersen “Bu cihazda hatırla” seçimini kapalı bırak.", "error");
      return;
    }

    if (rememberInput.checked) saveGroqSettings();
    button.disabled = true;
    button.textContent = "Kontrol ediliyor…";
    const prior = card?.querySelector(".feedback-box");
    if (prior) {
      prior.hidden = false;
      prior.dataset.state = "success";
      prior.textContent = "Yanıtın 7. sınıf düzeyinde gözden geçiriliyor…";
    }

    const context = sourceContext(activity, question);
    const expected = question.expected ? `\nÖğretmen notu / beklenen sınıflandırma: ${question.expected}` : "";
    const systemPrompt = [
      "Sen Türkçe dersi için öğrenciye yardımcı olan nazik ve ölçülü bir geri bildirim rehberisin.",
      "Değerlendirme bağlamı: 7. sınıf Türkçe, Tema 1 · Hayat Boyu Gelişim. Maarif/MEB yönelimine uygun biçimde yaş düzeyini, anlam kurmayı, metin kanıtını, akıl yürütmeyi, iletişimi ve süreç içinde gelişimi gözet.",
      "Yanıtı yaşa uygun, açık ve kısa tut. Öğrenciyi utandırma, resmî not/puan verme ve cevabı baştan sona onun yerine yazma.",
      "Önce doğru yaptığı belirgin bir noktayı söyle. Sonra varsa eksik, kanıt veya açıklama sorununu belirt; öğrenciye kendi yanıtını geliştirecek tek somut adım ya da düşündürücü bir soru ver.",
      "Eşleştirme/seçim görevlerinde her alanı ayrı değerlendir; boş alanları açıkça belirt. Yaratıcı veya kişisel yanıtlarda tek bir doğru cevap dayatma.",
      context.note,
      context.text ? "Kaynak metin yalnızca aşağıdaki metindir; kaynakla çelişen bilgi uydurma." : "Sağlanmış bir metin yoksa metinden alıntı veya olay uydurma. QR içeriğine dair ayrıntıları ancak öğrencinin kendi notu olarak değerlendir."
    ].join("\n");
    const userPrompt = [
      "Ders: Türkçe · 7. sınıf",
      "Tema: Tema 1 · Hayat Boyu Gelişim",
      `Etkinlik: ${activity.title} (${activity.format || "çalışma"})`,
      `Kaynak: ${activity.source || "Tema 1 etkinliği"}`,
      `Soru: ${question.prompt}`,
      `Öğrencinin yanıtı:\n${response}`,
      expected,
      context.text ? `\nİlgili kaynak metin:\n${context.text}` : `\nKaynak bilgisi: ${context.note}`,
      "Lütfen 3–5 cümlelik geri bildirim ver: güçlü yan, gerekiyorsa geliştirme noktası ve öğrencinin kendi başına deneyebileceği bir sonraki adım."
    ].join("\n");

    try {
      const result = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelInput.value || DEFAULT_MODEL,
          temperature: 0.2,
          max_completion_tokens: 500,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          ...(modelInput.value.startsWith("openai/gpt-oss")
            ? { reasoning_effort: "low", reasoning_format: "hidden" }
            : {})
        })
      });
      const payload = await result.json().catch(() => ({}));
      if (!result.ok) throw new Error(payload.error?.message || `Groq isteği başarısız oldu (HTTP ${result.status}).`);
      const content = payload.choices?.[0]?.message?.content?.trim();
      if (!content) throw new Error("Groq yanıtında geri bildirim bulunamadı.");
      flowState().feedback[key] = { state: "success", text: content, checkedAt: new Date().toISOString() };
      persist();
      showFeedback(card, content, "success");
    } catch (error) {
      const message = String(error?.message || error || "Bilinmeyen hata");
      const friendly = /failed to fetch|networkerror|load failed/i.test(message)
        ? "Groq’a ulaşılamadı. İnternet bağlantısını ve API erişimini kontrol et; anahtarın bu cihazda kalır."
        : `Kontrol tamamlanamadı: ${message}`;
      flowState().feedback[key] = { state: "error", text: friendly, checkedAt: new Date().toISOString() };
      persist();
      showFeedback(card, friendly, "error");
    } finally {
      button.disabled = false;
      button.textContent = "✦ Kontrol et";
    }
  }

  document.getElementById("save-settings").addEventListener("click", saveGroqSettings);
  previousButton.addEventListener("click", () => goToStep(stepIndex - 1));
  nextButton.addEventListener("click", () => {
    if (stepIndex < allSteps.length - 1) goToStep(stepIndex + 1);
    else {
      saveStepIndex();
      saveIndicator.textContent = "Paket tamamlandı. Yanıtların bu tarayıcıda kayıtlı.";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  renderPackageTabs();
  renderOverview();
  renderStep();
  const title = `${selectedUnit.label} · ${selectedUnit.title} · Türkçe 7`;
  document.title = `${title} · Tema 1`;
})();
