(() => {
  "use strict";

  const STORE_KEY = "turkceRota2026";
  const GROQ_KEY = "turkceGroqKey2026";
  const GROQ_MODEL = "turkceGroqModel2026";
  const DEFAULT_MODEL = "openai/gpt-oss-20b";
  const units = window.THEME1_PRACTICE?.units || [];
  const unitMap = new Map(units.map(unit => [Number(unit.weekId), unit]));
  const forms = window.THEME1_FORMS || {};

  const section = document.getElementById("theme1Practice");
  const titleNode = document.getElementById("theme1PracticeTitle");
  const metaNode = document.getElementById("theme1PracticeMeta");
  const stepTrack = document.getElementById("step-track");
  const stepTitle = document.getElementById("flow-step-title");
  const flowCount = document.getElementById("flow-count");
  const progressTrack = document.getElementById("progress-track");
  const progressValue = document.getElementById("progress-value");
  const stage = document.getElementById("activity-stage");
  const previousButton = document.getElementById("previous-step");
  const nextButton = document.getElementById("next-step");
  const savedNote = document.getElementById("theme1PracticeSaved");

  let activeUnit = null;
  let allSteps = [];
  let stepIndex = 0;
  let saveTimer = 0;

  const activitySourceKeys = {
    "marti-a01": ["marti"], "marti-a02": ["marti"], "marti-a03": ["marti"],
    "marti-a04": ["marti"], "marti-a05": ["marti"], "marti-a06": ["marti"], "marti-a07": ["marti"],
    "genclik-a01": ["gencligin"], "genclik-a03": ["gencligin"],
    "adiny-a01": ["adini"], "adiny-a02": ["adini"], "adiny-a03": ["adini"], "adiny-a04": ["adini"]
  };
  const storyReaderLinks = {
    marti: { weekId: 1, title: "Martı Jonathan Livingston" },
    gencligin: { weekId: 3, title: "Gençliğin Kıymeti" },
    adini: { weekId: 5, title: "Adını Göklere Yazdıran Çocuk" }
  };

  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const normaliseOptions = options => (options || []).map(option => typeof option === "string"
    ? { value: option, label: option }
    : { value: String(option.value), label: String(option.label) });

  function getProgressRoot() {
    if (window.turkceProgressData && typeof window.turkceProgressData === "object") {
      return window.turkceProgressData;
    }
    try {
      const parsed = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function flowState(unitId = activeUnit?.weekId) {
    const root = getProgressRoot();
    if (!root[unitId] || typeof root[unitId] !== "object") root[unitId] = {};
    const week = root[unitId];
    if (!week.theme1PracticeFlow || typeof week.theme1PracticeFlow !== "object") {
      week.theme1PracticeFlow = { answers: {}, feedback: {}, stepIndex: 0 };
    }
    const flow = week.theme1PracticeFlow;
    flow.answers = flow.answers && typeof flow.answers === "object" ? flow.answers : {};
    flow.feedback = flow.feedback && typeof flow.feedback === "object" ? flow.feedback : {};
    window.turkceProgressData = root;
    return flow;
  }

  function persist() {
    try {
      if (typeof window.turkceStore === "function") window.turkceStore();
      else localStorage.setItem(STORE_KEY, JSON.stringify(getProgressRoot()));
      savedNote.textContent = "✓ Yanıt kaydedildi";
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => { savedNote.textContent = "Yanıtlar bu tarayıcıda saklanır"; }, 1300);
    } catch (error) {
      savedNote.textContent = "Tarayıcı depolaması dolu; ilerleme kaydedilemedi.";
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
    const legacyValue = getProgressRoot()[activeUnit.weekId]?.theme1Practice?.[activity.id];
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
      return `<div class="form-field full"><span class="form-field-label">${label}</span><div class="radio-options">${options}</div></div>`;
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
      return `<div class="form-field full"><span class="form-field-label">${label}</span><div class="radio-options">${options}</div></div>`;
    }

    if (type === "sort") {
      const assignments = value && typeof value === "object" && !Array.isArray(value) ? value : {};
      const categories = field.categories || [];
      const validCategories = new Set(categories.map(category => category.id));
      const items = field.items || [];
      const placed = item => validCategories.has(assignments[item.id]);
      const card = item => `<button type="button" class="sort-item" draggable="true" data-sort-item="${escapeHTML(item.id)}" aria-pressed="false">${escapeHTML(item.label)}</button>`;
      const bankItems = items.filter(item => !placed(item)).map(card).join("");
      const categoriesHTML = categories.map(category => {
        const inside = items.filter(item => assignments[item.id] === category.id).map(card).join("");
        return `<section class="sort-category"><h4>${escapeHTML(category.label)}</h4><div class="sort-dropzone" data-sort-target="${escapeHTML(category.id)}" role="group" tabindex="0" aria-keyshortcuts="Enter Space" aria-roledescription="kart bırakma alanı" aria-label="${escapeHTML(category.label)} hedefi; seçili kartı buraya taşımak için Enter veya Boşluk tuşuna bas">${inside || `<span class="sort-placeholder">Kartı buraya bırak</span>`}</div></section>`;
      }).join("");
      const assignedCount = items.filter(placed).length;
      return `<div class="form-field full sort-field"><span class="form-field-label">${label}</span><p class="sort-instructions">Kartı sürükleyebilirsin. Dokunmatik ekranda karta, sonra hedef gruba dokun; klavyede kartı Enter/Boşluk ile seç, hedef gruba odaklanıp Enter/Boşluk’a bas. Gerekirse kartı “Kartlar” alanına geri taşı.</p><div class="sort-widget" data-sort-widget="1" data-qkey="${escapeHTML(qKey)}" data-field-id="${escapeHTML(field.id)}" data-unit-id="${unitId}" data-assignments="${escapeHTML(JSON.stringify(assignments))}"><div class="sort-bank-wrap"><h4>Kartlar <span>${items.length - assignedCount} kaldı</span></h4><div class="sort-bank sort-dropzone" data-sort-target="bank" role="group" tabindex="0" aria-keyshortcuts="Enter Space" aria-roledescription="kart bırakma alanı" aria-label="Taşınmamış kartlar alanı; seçili kartı buraya geri taşımak için Enter veya Boşluk tuşuna bas">${bankItems || `<span class="sort-placeholder">Bütün kartlar gruplara yerleştirildi</span>`}</div></div><div class="sort-categories">${categoriesHTML}</div><p class="sort-status" data-sort-status aria-live="polite">${assignedCount} / ${items.length} kart yerleştirildi</p></div></div>`;
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
      if (field.type === "sort") return value && typeof value === "object" && Object.keys(value).length > 0;
      return Array.isArray(value) ? value.length > 0 : String(value ?? "").trim().length > 0;
    });
  }

  function sourceDescription(activity) {
    return activitySourceKeys[activity.id] || [];
  }

  function readerLink() {
    return "#bookText";
  }

  function readerLinksFor(activity) {
    return sourceDescription(activity).map(key => storyReaderLinks[key]).filter(Boolean).map(item =>
      `<a class="source-link" href="${readerLink()}">${escapeHTML(item.title)} metnini aç ↗</a>`
    ).join("");
  }

  function sourceLinkMarkup(sourceUrl, label = "QR içeriğini aç") {
    if (!sourceUrl) return "";
    let url;
    try {
      url = new URL(String(sourceUrl).trim(), window.location.href);
    } catch {
      return "";
    }
    if (!['https:', 'http:'].includes(url.protocol)) return "";
    return `<a class="source-link qr-source-link" href="${escapeHTML(url.href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} ↗</a>`;
  }

  function renderStepTrack() {
    stepTrack.innerHTML = allSteps.map((step, index) => {
      const questions = questionList(step.activity);
      const hasAnswer = questions.some((question, questionIndex) => answered(question, currentAnswer(step.activity, question, questionIndex)));
      const label = `${step.activity.number}. ${step.activity.title}`;
      return `<button type="button" class="step-dot${hasAnswer ? " is-answered" : ""}" data-step-index="${index}" aria-label="Etkinlik ${index + 1}: ${escapeHTML(label)}" title="${escapeHTML(label)}" ${index === stepIndex ? 'aria-current="step"' : ""}>${index + 1}</button>`;
    }).join("");
    stepTrack.querySelectorAll("[data-step-index]").forEach(button => {
      button.addEventListener("click", () => goToStep(Number(button.dataset.stepIndex)));
    });
  }

  function renderStep() {
    if (!activeUnit || !allSteps.length) return;
    const step = allSteps[stepIndex];
    const { activity, groupTitle } = step;
    const questions = questionList(activity);
    const progress = Math.round(((stepIndex + 1) / allSteps.length) * 100);
    const answeredCount = questions.filter((question, index) => answered(question, currentAnswer(activity, question, index))).length;
    stepTitle.textContent = `Etkinlik ${stepIndex + 1} / ${allSteps.length} · ${activity.title}`;
    flowCount.textContent = `${answeredCount}/${questions.length} soru yanıtlandı`;
    progressValue.style.width = `${progress}%`;
    progressTrack.setAttribute("aria-valuenow", String(progress));
    previousButton.disabled = stepIndex === 0;
    nextButton.textContent = stepIndex === allSteps.length - 1 ? "Çalışmayı tamamla ✓" : "Sonraki etkinlik →";

    const questionHTML = questions.map((question, index) => {
      const qKey = questionKey(activity, question);
      const answers = currentAnswer(activity, question, index);
      const feedback = savedFeedback(activity, question);
      const fields = question.fields || [{ id: "answer", label: "Yanıtın", type: "textarea", rows: 4 }];
      const fieldHTMLContent = fields.map(field => fieldHTML(field, answers[field.id], qKey, activeUnit.weekId)).join("");
      const questionSourceLink = sourceLinkMarkup(question.sourceUrl, question.sourceLinkLabel || "İlgili QR kaydını aç");
      const widgetName = question.responseType === "matching"
        ? (fields.some(field => field.type === "sort") ? "Sürükle-bırak eşleştirme" : "Eşleştirme / sınıflandırma")
        : fields.some(field => field.type === "radio" || field.type === "select")
          ? "Seçim ve gerekçe"
          : "Yazılı yanıt";
      return `<article class="question-card" data-question-key="${escapeHTML(qKey)}">
        <div class="question-heading"><span class="question-number">${index + 1}</span><div class="question-copy"><p class="question-prompt">${escapeHTML(question.prompt)}</p>${questionSourceLink ? `<div class="question-source-links">${questionSourceLink}</div>` : ""}</div></div>
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
    const qrQuestions = questions.filter(question => question.sourceMode === "qr" || question.videoSource || activity.videoSource);
    const hasUntranscribedQR = qrQuestions.some(question => !String(question.sourceTranscript || activity.sourceTranscript || "").trim());
    const sourceModeNote = qrQuestions.length ? `<span>QR video/dinleme kaynağı</span>` : "";
    const activitySourceLink = sourceLinkMarkup(activity.sourceUrl, activity.sourceLinkLabel || "QR videosunu / dinleme kaydını aç");
    const questionLimitNote = hasUntranscribedQR
      ? `<p class="source-limit-note" role="note"><strong>Yapay zekâ sınırı:</strong> Link verilse bile Groq videoyu açıp izleyemez. Yalnızca uygulamada bu soru için sağlanan transkript veya cevap anahtarıyla karşılaştırabilir; bunlar yoksa videoya ait bilgilerin doğruluğunu doğrulayamaz ve sadece yanıtın istenen bölümlerini/açıklamasını değerlendirebilir. Bu, video içeriğinin doğru olduğu onayı değildir.</p>`
      : "";

    stage.innerHTML = `<article class="activity-card">
      <header class="activity-top">
        <p class="activity-kicker">${escapeHTML(groupTitle)} · Etkinlik ${escapeHTML(activity.number)}</p>
        <h2 class="activity-title">${escapeHTML(activity.title)}</h2>
        <p class="activity-instruction">${escapeHTML(activity.instruction || "Soruları sırayla yanıtla.")}</p>
      </header>
      ${sourceHTML}
      <div class="activity-meta"><span>${escapeHTML(activity.format || "Çalışma")}</span><span>${escapeHTML(activity.count || "")}</span><span>Kaynak: ${escapeHTML(activity.source || "Tema 1")}</span>${sourceModeNote}</div>
      ${readerHTML || activitySourceLink ? `<div class="reader-links">${readerHTML}${activitySourceLink}</div>` : ""}
      ${questionLimitNote}
      <div class="question-list">${questionHTML}</div>
    </article>`;

    stage.querySelectorAll("[data-answer-field]").forEach(control => {
      const saveAnswer = () => {
        const key = control.dataset.qkey;
        const fieldId = control.dataset.fieldId;
        if (!key || !fieldId) return;
        const flow = flowState(activeUnit.weekId);
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
        persist();
        flowCount.textContent = `${questions.filter((question, index) => answered(question, currentAnswer(activity, question, index))).length}/${questions.length} soru yanıtlandı`;
        renderStepTrack();
      };
      control.addEventListener("input", saveAnswer);
      control.addEventListener("change", saveAnswer);
    });

    stage.querySelectorAll("[data-sort-widget]").forEach(board => bindSortWidget(board));
    stage.querySelectorAll("[data-check-question]").forEach(button => {
      button.addEventListener("click", () => {
        const question = questions.find(candidate => questionKey(activity, candidate) === button.dataset.checkQuestion);
        if (question) checkQuestion(activity, question, button);
      });
    });
    renderStepTrack();
  }

  function bindSortWidget(board) {
    const qKey = board.dataset.qkey;
    const fieldId = board.dataset.fieldId;
    const unitId = Number(board.dataset.unitId);
    const question = allSteps[stepIndex] && questionList(allSteps[stepIndex].activity)
      .find(item => questionKey(allSteps[stepIndex].activity, item) === qKey);
    const field = question?.fields?.find(item => item.id === fieldId);
    if (!field) return;

    let assignments = {};
    try { assignments = JSON.parse(board.dataset.assignments || "{}"); } catch (error) { assignments = {}; }
    let selectedItemId = null;
    const status = board.querySelector("[data-sort-status]");
    const categories = new Map((field.categories || []).map(category => [category.id, category]));
    const items = new Map((field.items || []).map(item => [item.id, item]));

    const refreshStatus = () => {
      const placedCount = (field.items || []).filter(item => categories.has(assignments[item.id])).length;
      status.textContent = `${placedCount} / ${(field.items || []).length} kart yerleştirildi`;
      const bankHeader = board.querySelector(".sort-bank-wrap h4 span");
      if (bankHeader) bankHeader.textContent = `${(field.items || []).length - placedCount} kaldı`;
    };
    const saveAssignments = () => {
      const flow = flowState(unitId);
      if (!flow.answers[qKey] || typeof flow.answers[qKey] !== "object") flow.answers[qKey] = {};
      flow.answers[qKey][fieldId] = { ...assignments };
      persist();
      const current = allSteps[stepIndex];
      if (current) {
        const qs = questionList(current.activity);
        flowCount.textContent = `${qs.filter((item, index) => answered(item, currentAnswer(current.activity, item, index))).length}/${qs.length} soru yanıtlandı`;
      }
      renderStepTrack();
    };
    const clearSelected = () => {
      if (selectedItemId) {
        const selected = board.querySelector(`[data-sort-item="${selectedItemId}"]`);
        selected?.classList.remove("is-selected");
        selected?.setAttribute("aria-pressed", "false");
      }
      selectedItemId = null;
    };
    const moveItem = (itemId, targetId) => {
      if (!items.has(itemId)) return;
      const target = board.querySelector(`[data-sort-target="${targetId}"]`);
      const item = board.querySelector(`[data-sort-item="${itemId}"]`);
      if (!target || !item) return;
      if (targetId === "bank") delete assignments[itemId];
      else if (categories.has(targetId)) assignments[itemId] = targetId;
      else return;
      target.querySelector(".sort-placeholder")?.remove();
      target.appendChild(item);
      clearSelected();
      board.dataset.assignments = JSON.stringify(assignments);
      refreshStatus();
      saveAssignments();
    };

    board.querySelectorAll("[data-sort-item]").forEach(item => {
      item.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        if (selectedItemId === item.dataset.sortItem) clearSelected();
        else {
          clearSelected();
          selectedItemId = item.dataset.sortItem;
          item.classList.add("is-selected");
          item.setAttribute("aria-pressed", "true");
          status.textContent = "Şimdi bir hedef grubu seç veya kartı sürükle.";
        }
      });
      item.addEventListener("dragstart", event => {
        event.dataTransfer?.setData("text/plain", item.dataset.sortItem);
        if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
        item.classList.add("is-dragging");
      });
      item.addEventListener("dragend", () => item.classList.remove("is-dragging"));
    });

    board.querySelectorAll("[data-sort-target]").forEach(target => {
      target.addEventListener("click", event => {
        if (event.target.closest?.("[data-sort-item]")) return;
        if (selectedItemId) moveItem(selectedItemId, target.dataset.sortTarget);
        else status.textContent = "Önce bir kart seç, sonra hedef gruba tıkla.";
      });
      target.addEventListener("keydown", event => {
        if ((event.key === "Enter" || event.key === " ") && selectedItemId) {
          event.preventDefault();
          moveItem(selectedItemId, target.dataset.sortTarget);
        }
      });
      target.addEventListener("dragover", event => {
        event.preventDefault();
        target.classList.add("drag-over");
        if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      });
      target.addEventListener("dragleave", () => target.classList.remove("drag-over"));
      target.addEventListener("drop", event => {
        event.preventDefault();
        target.classList.remove("drag-over");
        const itemId = event.dataTransfer?.getData("text/plain");
        if (itemId) moveItem(itemId, target.dataset.sortTarget);
      });
    });
    refreshStatus();
  }

  function sourceContext(activity, question) {
    const mode = question.sourceMode || (activity.sourceText ? "activity" : "story");
    const transcript = String(question.sourceTranscript || activity.sourceTranscript || "").trim();
    const hasVideoSource = mode === "qr" || Boolean(question.videoSource || activity.videoSource);
    const activityQuestionKey = activity.answerKey && typeof activity.answerKey === "object" ? activity.answerKey[question.id] : undefined;
    const hasExplicitAnswerKey = question.answerKey !== undefined || question.expectedAnswer !== undefined || activityQuestionKey !== undefined;
    const answerKeyAvailable = hasExplicitAnswerKey || (question.fields || []).some(field => field.expectedAssignments && Object.keys(field.expectedAssignments).length);
    const videoUnavailable = hasVideoSource && !transcript && !answerKeyAvailable;
    if (mode === "none") return { text: "", note: "Bu soru için ek kaynak metin kullanılmıyor.", videoUnavailable: false, hasVideoSource: false, answerKeyAvailable };
    if (mode === "qr") return {
      text: transcript,
      note: transcript
        ? "QR video/dinleme kaynağının öğretmen tarafından sağlanan dökümü aşağıdadır. Yalnızca bu dökümde doğrulanabilen bilgileri kontrol et; görüntü/ses ayrıntısı dökümde yoksa uydurma."
        : answerKeyAvailable
          ? "Groq QR video/dinleme kaydını açıp izleyemez. Bu soruda ayrı bir öğretmen anahtarı yanıt verisine eklenmiş; yalnızca o anahtara göre kontrol et ve bunu videoyu bağımsız izleyerek doğrulamış gibi sunma."
          : "Kaynak, kitaptaki QR video/dinleme kaydıdır. Groq bağlantıyı açıp izleyemez; döküm veya cevap anahtarı verilmediği için video ayrıntılarının doğruluğunu doğrulayamaz.",
      videoUnavailable,
      hasVideoSource,
      answerKeyAvailable
    };
    if (mode === "book") return {
      text: "",
      note: "Kaynak Türkçe 7 kitabının 47. sayfasındaki iki şiirdir; şiirlerin tam metni uygulamaya eklenmemiştir. Dize veya şiir ayrıntısı uydurma; öğrencinin alıntı ve inceleme dayanağını değerlendir.",
      videoUnavailable,
      hasVideoSource,
      answerKeyAvailable
    };
    if (mode === "activity") return {
      text: activity.sourceText || "",
      note: "Etkinlik sayfasında görünen özgün kısa kaynak metin.",
      videoUnavailable,
      hasVideoSource,
      answerKeyAvailable
    };

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
      return { text, note: [baseNote, question.sourceNote].filter(Boolean).join(" "), videoUnavailable, hasVideoSource, answerKeyAvailable };
    }
    if (activity.sourceText) return { text: activity.sourceText, note: "Etkinlikte görünen özgün kısa kaynak metin.", videoUnavailable, hasVideoSource, answerKeyAvailable };
    return { text: "", note: "Bu etkinlikte öğrenci kendi gözlem, deneyim veya kaynak notunu kullanır.", videoUnavailable, hasVideoSource, answerKeyAvailable };
  }

  function answerForAI(activity, question, index) {
    const answers = currentAnswer(activity, question, index);
    const fieldResponses = (question.fields || []).map(field => {
      const value = answers[field.id];
      if (field.type === "sort") {
        const choices = new Map((field.categories || []).map(category => [category.id, category.label]));
        const pairs = (field.items || []).map(item => `${item.label} → ${choices.get(value?.[item.id]) || "(henüz eşleştirilmedi)"}`);
        const privateKey = field.expectedAssignments
          ? `\nÖğretmen değerlendirme anahtarı (öğrenciye doğru eşleşmeleri açıklama): ${JSON.stringify(Object.fromEntries(Object.entries(field.expectedAssignments).map(([itemId, categoryId]) => [field.items?.find(item => item.id === itemId)?.label || itemId, choices.get(categoryId) || categoryId])))}\n`
          : "";
        return `${field.label || field.id}:\n${pairs.join("\n")}${privateKey}`;
      }
      const printable = Array.isArray(value) ? value.join(", ") : String(value ?? "").trim();
      return `${field.label || field.id}: ${printable || "(boş)"}`;
    });
    const activityQuestionKey = activity.answerKey && typeof activity.answerKey === "object" ? activity.answerKey[question.id] : undefined;
    const explicitKey = question.answerKey ?? question.expectedAnswer ?? activityQuestionKey;
    if (explicitKey !== undefined) fieldResponses.push(`Öğretmen değerlendirme anahtarı (öğrenciye doğru yanıtı açıklama): ${JSON.stringify(explicitKey)}`);
    return fieldResponses.join("\n");
  }

  function showFeedback(card, text, state) {
    const feedback = card?.querySelector(".feedback-box");
    if (!feedback) return;
    feedback.textContent = text;
    feedback.dataset.state = state;
    feedback.hidden = false;
  }

  function openGroqSettings() {
    const settings = document.getElementById("apiSettings");
    if (settings) settings.open = true;
    const input = document.getElementById("apiKey");
    if (input) input.focus({ preventScroll: true });
    settings?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function checkQuestion(activity, question, button) {
    const qKey = questionKey(activity, question);
    const index = questionList(activity).indexOf(question);
    const answer = currentAnswer(activity, question, index);
    const card = button.closest(".question-card");
    const response = answerForAI(activity, question, index);
    const hasResponse = (question.fields || []).some(field => {
      const value = answer[field.id];
      if (field.type === "sort") return value && typeof value === "object" && Object.keys(value).length > 0;
      return Array.isArray(value) ? value.length > 0 : String(value ?? "").trim().length > 0;
    });
    if (!hasResponse) {
      showFeedback(card, "Önce yanıt alanını doldur ya da en az bir kartı yerleştir; sonra yeniden kontrol et.", "error");
      return;
    }

    const keyInput = document.getElementById("apiKey");
    const modelInput = document.getElementById("model");
    const apiKey = keyInput?.value.trim();
    if (!apiKey) {
      showFeedback(card, "Bu yanıtı kontrol etmek için önce üstteki Groq ayarlarına API anahtarını gir. Anahtar GitHub’a gönderilmez.", "error");
      openGroqSettings();
      return;
    }

    button.disabled = true;
    button.textContent = "Ölçütlere göre inceleniyor…";
    const prior = card?.querySelector(".feedback-box");
    if (prior) {
      prior.hidden = false;
      prior.dataset.state = "success";
      prior.textContent = "Yanıt istenen ölçütler ve sağlanan kaynak bağlamı açısından kontrol ediliyor…";
    }

    const context = sourceContext(activity, question);
    const rubric = question.rubric ? `\nSoruya özel öğretmen ölçütü: ${question.rubric}` : "";
    const systemPrompt = [
      "Sen 7. sınıf Türkçe dersi için adil ama ölçütleri sıkı uygulayan bir öğretmensin.",
      "Bağlam: 7. sınıf Türkçe, Tema 1 · Hayat Boyu Gelişim. Maarif/MEB yönelimine ve yaş düzeyine uygun, açık ve kanıta dayalı değerlendir.",
      "Öğrencinin yazdığı yanıtı aynen incele. Yanıtta bulunmayan bir sözü, davranışı, alıntıyı veya kanıtı asla varmış gibi gösterme. Kaynak metinde olmayan ayrıntı uydurma.",
      "Her zaman soruya uygunluğu, istenen sayıdaki öğeyi kapsama ve gerekçe/kanıtın yeterliliğini kontrol et. Olgusal doğruluğu yalnızca sana gerçekten sağlanan kaynakla karşılaştır; seçim/eşleştirmelerde her kartı ayrı kontrol et.",
      "Yanıt yanlış, ilgisiz veya eksikse bunu nazik ama doğrudan söyle. O durumda ‘Harika’, ‘çok iyi’, ‘doğru’ gibi övgü kullanma. Yanlış olan kısmı/karşılanmayan ölçütü belirt; ardından doğru yanıtı, doğru seçeneği, örnek yanıtı veya metinden doğru alıntıyı VERME. Öğrenciyi tek bir somut ipucu ya da metne geri götüren soru ile yönlendir.",
      "Yanıt yalnızca tüm doğrulanabilir temel ölçütleri karşılıyorsa ‘Tam doğru’ de; kısmen karşılıyorsa ‘Kısmen doğru’, yanlış/ilgisizse ‘Yanlış’, boşlukları varsa ‘Eksik’ olarak sınıflandır. QR video doğruluğu doğrulanamıyorsa video kısmına ‘Tam doğru’ deme; açık anahtar kullanıldıysa sonucu yalnızca ‘sağlanan anahtara göre’ nitele. Gereksiz teselli ve genel övgü verme.",
      "Öğrencinin yanıtında hata varsa önce hatayı ve nedenini göster, sonra cevabı söylemeden bir sonraki düşünme adımını ver. Yanıtın yerine yeni bir cevap yazma.",
      context.note,
      context.videoUnavailable
        ? "KAYNAK SINIRI: QR video/dinleme kaydına erişimin yok; URL verilse bile bağlantıyı açıp izleyemezsin. Transkript/cevap anahtarı olmayan video iddialarını doğru ya da yanlış olarak sınıflandırma. Yalnızca görevin istenen parçalarının bulunup bulunmadığını ve öğrencinin sunduğu açıklamanın tutarlılığını değerlendir; videodaki olgusal doğruluğun kontrol edilemediğini açıkça yaz. Karşılaştırmalı soruda yalnızca sana verilmiş öykü metnine dayalı kısmı doğrula; video tarafını doğrulanmamış olarak bırak."
        : context.hasVideoSource && context.answerKeyAvailable
          ? "QR video bağlantısını açıp izleyemezsin. Bu soruda sana açık bir öğretmen anahtarı verildi; yalnızca yanıtı bu anahtara göre karşılaştır. Sonucun anahtar-temelli olduğunu, videoyu bağımsız izleyerek doğrulamadığını belirt ve anahtar dışında video ayrıntısı hakkında hüküm verme."
          : context.text ? "Kaynak metin aşağıdadır; değerlendirmeyi bu metne dayandır. Doğru cevabı öğrenciye doğrudan verme." : "Sağlanmış kaynak yoksa kesin bilgi iddiasında bulunma. Eksik kaynak hakkında uydurma; öğrencinin notunu değerlendiremediğinde bunu açıkça söyle.",
      "Geri bildirimi Türkçe ve 3–5 kısa cümleyle, şu başlıklarla ver: DURUM:, HATA/EKSİK:, İPUCU:. Tam doğru yanıtta hata uydurma; kısa ve ölçüt temelli açıklama yap."
    ].join("\n");
    const userPrompt = [
      "Ders: Türkçe · 7. sınıf",
      "Tema: Tema 1 · Hayat Boyu Gelişim",
      `Etkinlik: ${activity.title} (${activity.format || "çalışma"})`,
      `Kaynak: ${activity.source || "Tema 1 etkinliği"}`,
      `Soru: ${question.prompt}`,
      `Öğrencinin yanıtı:\n${response}`,
      rubric,
      context.videoUnavailable ? "Video erişimi: Model QR bağlantısını açıp izleyemez/dinleyemez. Transkript/cevap anahtarı yoksa video içeriği doğrulanamaz; bu sınırlamayı geri bildirimde açıkça belirt." : context.hasVideoSource && context.answerKeyAvailable ? "Video erişimi: Bağlantı izlenemez; yanıtı yalnızca sağlanan öğretmen anahtarına göre denetle ve bunu açıkça söyle." : "Video/metin için sağlanan kaynak varsa yalnızca onu kullan.",
      context.text ? `\nİlgili kaynak metin:\n${context.text}` : `\nKaynak bilgisi: ${context.note}`,
      "Sıkı kontrol et: yanlış/ilgisiz cevabı doğruymuş gibi yorumlama, öğrencinin vermediği doğru davranışları onun cevabına ekleme ve doğru cevabı doğrudan yazma."
    ].join("\n");

    try {
      const model = modelInput?.value || DEFAULT_MODEL;
      const result = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
        body: JSON.stringify({
          model,
          temperature: 0.1,
          max_completion_tokens: 450,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          ...(model.startsWith("openai/gpt-oss") ? { reasoning_effort: "low", reasoning_format: "hidden" } : {})
        })
      });
      const payload = await result.json().catch(() => ({}));
      if (!result.ok) throw new Error(payload.error?.message || `Groq isteği başarısız oldu (HTTP ${result.status}).`);
      const content = payload.choices?.[0]?.message?.content?.trim();
      if (!content) throw new Error("Groq yanıtında geri bildirim bulunamadı.");
      flowState(activeUnit.weekId).feedback[qKey] = { state: "success", text: content, checkedAt: new Date().toISOString() };
      persist();
      showFeedback(card, content, "success");
    } catch (error) {
      const message = String(error?.message || error || "Bilinmeyen hata");
      const friendly = /failed to fetch|networkerror|load failed/i.test(message)
        ? "Groq’a ulaşılamadı. İnternet bağlantısını ve API erişimini kontrol et; anahtar bu cihazda kalır."
        : `Kontrol tamamlanamadı: ${message}`;
      flowState(activeUnit.weekId).feedback[qKey] = { state: "error", text: friendly, checkedAt: new Date().toISOString() };
      persist();
      showFeedback(card, friendly, "error");
    } finally {
      button.disabled = false;
      button.textContent = "✦ Kontrol et";
    }
  }

  function saveStepIndex() {
    flowState(activeUnit.weekId).stepIndex = stepIndex;
    persist();
  }

  function goToStep(index) {
    if (!Number.isInteger(index) || index < 0 || index >= allSteps.length) return;
    stepIndex = index;
    saveStepIndex();
    renderStep();
    const target = section;
    if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + 10, behavior: "smooth" });
  }

  function renderFlow(weekId) {
    const nextUnit = unitMap.get(Number(weekId));
    if (!nextUnit || !section) return;
    activeUnit = nextUnit;
    allSteps = activeUnit.groups.flatMap(group => group.activities.map(activity => ({ groupTitle: group.title, activity })));
    const flow = flowState(activeUnit.weekId);
    stepIndex = Math.max(0, Math.min(allSteps.length - 1, Number(flow.stepIndex) || 0));
    titleNode.textContent = `${activeUnit.label} · ${activeUnit.title}`;
    const questionTotal = allSteps.reduce((sum, item) => sum + questionList(item.activity).length, 0);
    metaNode.textContent = `${activeUnit.inventoryCount} · ${allSteps.length} etkinlik · ${questionTotal} soru · PDF ${activeUnit.pages}`;
    savedNote.textContent = "Yanıtlar bu tarayıcıda saklanır";
    section.hidden = false;
    renderStep();
  }

  previousButton.addEventListener("click", () => goToStep(stepIndex - 1));
  nextButton.addEventListener("click", () => {
    if (stepIndex < allSteps.length - 1) goToStep(stepIndex + 1);
    else {
      saveStepIndex();
      savedNote.textContent = "Bu çalışma birimini tamamladın. İstersen yanıtlarını yeniden gözden geçir.";
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY + 10, behavior: "smooth" });
    }
  });

  window.renderTheme1PracticeFlow = renderFlow;
})();
