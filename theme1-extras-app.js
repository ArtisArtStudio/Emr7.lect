/* Tema 1 ek okuma ve etkinlik akışı.
   Ana metinden sonra gösterilir; mevcut etkinlik alanını (theme1-practice-app.js) değiştirmez.
   Yanıtlar haftanın ilerleme kaydındaki "extras" alanında saklanır. Doğru cevap hiçbir
   durumda gösterilmez; geri bildirim yalnızca durum + kaç doğru + yönlendirici ipucu verir. */
(function () {
  'use strict';

  const ESCAPE = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ESCAPE[ch]);

  function stateFor(store, id) {
    const all = store.get();
    if (!all[id] || typeof all[id] !== 'object') all[id] = { values: {}, checked: false, feedback: '', state: 'none' };
    all[id].values = all[id].values || {};
    return all[id];
  }

  function pill(entry) {
    const labels = { correct: 'TAM DOĞRU', partial: 'KISMEN DOĞRU', wrong: 'YENİDEN BAK', none: '' };
    const label = labels[entry.state] || '';
    return `<span class="extra-pill" data-state="${escape(entry.state || 'none')}"${label ? '' : ' hidden'}>${escape(label)}</span>`;
  }

  function feedbackBox(unit, activity, entry) {
    const hidden = entry.feedback ? '' : ' hidden';
    const tts = activity.type === 'write' && entry.feedback
      ? `<div class="extra-tts"><button type="button" class="print" data-tts-read="extra-feedback-${escape(activity.id)}" data-tts-status="extra-tts-status-${escape(activity.id)}">🔊 Geri bildirimi sesli oku</button><button type="button" class="print" data-tts-stop>Durdur</button><span class="savehint" id="extra-tts-status-${escape(activity.id)}" role="status" aria-live="polite"></span></div>`
      : '';
    return `<div class="extra-feedback" id="extra-feedback-${escape(activity.id)}" role="status" aria-live="polite"${hidden}>${escape(entry.feedback || '')}</div>${tts}`;
  }

  function matchBody(activity, entry) {
    const rows = activity.items.map((item) => {
      const chosen = entry.values[`m:${item.id}`] || '';
      const options = [`<option value="">Seç…</option>`]
        .concat(activity.options.map((option) => `<option value="${escape(option.id)}"${chosen === option.id ? ' selected' : ''}>${escape(option.label)}</option>`))
        .join('');
      return `<div class="extra-match-row"><span class="extra-match-label">${escape(item.label)}</span><select data-extra-match="${escape(item.id)}" data-extra-activity="${escape(activity.id)}" aria-label="${escape(item.label)} için tanım seç">${options}</select></div>`;
    }).join('');
    return `<div class="extra-match">${rows}</div>`;
  }

  function choiceBody(activity, entry) {
    return activity.questions.map((question, index) => {
      const chosen = entry.values[`c:${question.id}`];
      const options = question.options.map((option, optionIndex) => {
        const id = `extra-${activity.id}-${question.id}-${optionIndex}`;
        return `<label class="extra-choice" for="${id}"><input type="radio" id="${id}" name="extra-${activity.id}-${question.id}" value="${optionIndex}" data-extra-choice="${escape(question.id)}" data-extra-activity="${escape(activity.id)}"${String(chosen) === String(optionIndex) ? ' checked' : ''}><span>${escape(option)}</span></label>`;
      }).join('');
      return `<fieldset class="extra-question"><legend><span class="extra-number">${index + 1}</span> ${escape(question.prompt)}</legend><div class="extra-choices">${options}</div></fieldset>`;
    }).join('');
  }

  function writeBody(activity, entry) {
    const criteria = `<ul class="extra-criteria">${activity.criteria.map((item) => `<li>${escape(item)}</li>`).join('')}</ul>`;
    return `${criteria}<textarea class="extra-textarea" rows="6" maxlength="3000" data-extra-write="${escape(activity.id)}" aria-label="${escape(activity.title)} yanıtı" placeholder="${escape(activity.placeholder || 'Yanıtını kendi cümlelerinle yaz…')}">${escape(entry.values.x || '')}</textarea><p class="savehint">Yazdıkların bu tarayıcıya otomatik kaydedilir.</p>`;
  }

  function activityCard(unit, activity, store) {
    const entry = stateFor(store, activity.id);
    const body = activity.type === 'match' ? matchBody(activity, entry)
      : activity.type === 'choice' ? choiceBody(activity, entry)
        : writeBody(activity, entry);
    const checkLabel = activity.type === 'write' ? '✓ Yazımı gözden geçir' : '✓ Kontrol et';
    return `<article class="extra-activity" id="extra-activity-${escape(activity.id)}" data-extra-kind="${escape(activity.type)}" data-check-state="${escape(entry.state || 'none')}">
      <div class="extra-activity-head"><div><strong>${escape(activity.title)}</strong><span class="extra-meta">${escape(activity.format)}${activity.count ? ` · ${escape(activity.count)}` : ''} · ${escape(activity.skill)}</span></div>${pill(entry)}</div>
      <p class="extra-instruction">${escape(activity.instruction)}</p>
      <div class="extra-response">${body}</div>
      <div class="extra-actions"><button type="button" class="print extra-check" data-extra-check="${escape(activity.id)}" data-extra-unit="${unit.weekId}">${checkLabel}</button><span class="savehint">Yanıtın doğrudan gösterilmez; yalnızca yönlendirici geri bildirim verilir.</span></div>
      ${feedbackBox(unit, activity, entry)}
    </article>`;
  }

  function textBlock(unit) {
    const note = unit.readingNote ? `<p class="extra-reading-note">${escape(unit.readingNote)}</p>` : '';
    if (unit.poem) {
      const stanzas = unit.poem.map((stanza) => `<p class="extra-stanza">${stanza.map((line) => escape(line)).join('<br>')}</p>`).join('');
      return `${note}<div class="extra-text extra-poem" role="group" aria-label="${escape(unit.title)} şiiri">${stanzas}</div>`;
    }
    const paragraphs = unit.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join('');
    return `${note}<div class="extra-text">${paragraphs}</div>`;
  }

  function evaluate(activity, values) {
    if (activity.type === 'match') {
      const total = activity.items.length;
      const correct = activity.items.filter((item) => values[`m:${item.id}`] === activity.answers[item.id]).length;
      return { total, correct };
    }
    const total = activity.questions.length;
    const correct = activity.questions.filter((question) => String(values[`c:${question.id}`]) === String(question.answer)).length;
    return { total, correct };
  }

  function verdict(activity, result) {
    if (result.correct === result.total) {
      return {
        state: 'correct',
        text: `DURUM: TAM DOĞRU · ${result.correct}/${result.total}\nTüm seçimlerin ölçütlerle örtüşüyor. Bir sonraki adım: ${activity.type === 'match' ? 'eşleştirdiğin tanımlardan birini kendi cümlenle arkadaşına anlat.' : 'sorulardan birine kendi gerekçeni ekleyerek yeniden yanıtla.'}`,
      };
    }
    if (result.correct === 0) {
      return {
        state: 'wrong',
        text: `DURUM: YENİDEN BAK · 0/${result.total}\nHATA/EKSİK: Seçimlerin ölçütlerle örtüşmüyor.\nYOL GÖSTERİCİ: Metnin ilgili paragrafına dön; her seçeneği metindeki tek bir cümleyle karşılaştır.\nİPUCU: Cevabı tahmin etmek yerine, seçtiğin ifadenin metinde geçtiği yeri bul.`,
      };
    }
    return {
      state: 'partial',
      text: `DURUM: KISMEN DOĞRU · ${result.correct}/${result.total}\nHATA/EKSİK: Bazı seçimler gözden geçirilmeli.\nYOL GÖSTERİCİ: Doğru olduğunu düşündüğün seçimlerin dayanağını metinde işaretle, kalanları yeniden oku.\nİPUCU: Eşleştirmelerde tanımın tamamını oku; tek kelimeye bakıp karar verme.`,
    };
  }

  function writeVerdict(activity, value) {
    const length = String(value || '').trim().length;
    if (length === 0) {
      return { state: 'none', text: 'YAZMAYA BAŞLA: İlk cümleyi yaz; düzeltmeyi sonra yaparız.\nYOL GÖSTERİCİ: Önce bir ayrıntı seç, sonra neden önemli olduğunu söyle.' };
    }
    if (length < activity.minChars) {
      return {
        state: 'partial',
        text: `DURUM: YANIT EKSİK · ${length}/${activity.minChars} karakter\nHATA/EKSİK: Yanıt beklenen uzunluğa ulaşmadı.\nYOL GÖSTERİCİ: ${activity.guide}\nYAZMAYA BAŞLA: ${activity.starter || 'Bir sonraki cümleye şu sözlerle başla: “Bunun nedeni…”'}`,
      };
    }
    return {
      state: 'correct',
      text: `DURUM: YAZIN KAYDEDİLDİ · ${length} karakter\nÖLÇÜTLERİ KENDİN DENETLE: Ölçütlerin tamamını karşıladığını düşünüyor musun? Yanıtını yüksek sesle oku; anlaşılmayan bir cümle varsa yeniden yaz.\nYOL GÖSTERİCİ: ${activity.guide}\nTEŞVİK: Yazdıklarını arkadaşınla paylaş; ondan tek bir soru iste.`,
    };
  }

  function render(unit, api) {
    const host = document.getElementById('theme1ExtrasBody');
    if (!host) return;
    const store = api.store;
    host.innerHTML = `
      <div class="extra-head"><span class="extra-kind">${escape(unit.kind)}</span><h4>${escape(unit.title)}</h4><p class="extra-subtitle">${escape(unit.subtitle)}</p></div>
      ${textBlock(unit)}
      <div class="extra-activities">${unit.activities.map((activity) => activityCard(unit, activity, store)).join('')}</div>
      <p class="savehint extra-origin">${escape(window.THEME1_EXTRAS?.note || '')}</p>`;

    host.querySelectorAll('[data-extra-choice]').forEach((input) => {
      input.addEventListener('change', () => {
        const entry = stateFor(store, input.dataset.extraActivity);
        entry.values[`c:${input.dataset.extraChoice}`] = input.value;
        entry.checked = false;
        store.save();
      });
    });
    host.querySelectorAll('[data-extra-match]').forEach((select) => {
      select.addEventListener('change', () => {
        const entry = stateFor(store, select.dataset.extraActivity);
        entry.values[`m:${select.dataset.extraMatch}`] = select.value;
        entry.checked = false;
        store.save();
      });
    });
    host.querySelectorAll('[data-extra-write]').forEach((area) => {
      area.addEventListener('input', () => {
        const entry = stateFor(store, area.dataset.extraWrite);
        entry.values.x = area.value;
        store.save();
      });
    });
    host.querySelectorAll('[data-extra-check]').forEach((button) => {
      button.addEventListener('click', () => {
        const activity = unit.activities.find((item) => item.id === button.dataset.extraCheck);
        if (!activity) return;
        const entry = stateFor(store, activity.id);
        if (activity.type === 'write') {
          const result = writeVerdict(activity, entry.values.x);
          entry.state = result.state;
          entry.feedback = result.text;
          entry.checked = true;
          store.save();
          window.renderTheme1Extras?.(Number(unit.weekId), api);
          const box = document.getElementById(`extra-feedback-${activity.id}`);
          if (box) box.hidden = false;
          return;
        }
        const answered = activity.type === 'match'
          ? activity.items.filter((item) => entry.values[`m:${item.id}`]).length
          : activity.questions.filter((question) => entry.values[`c:${question.id}`] !== undefined).length;
        const total = activity.type === 'match' ? activity.items.length : activity.questions.length;
        if (answered < total) {
          entry.feedback = `DURUM: YANIT EKSİK · ${answered}/${total}\nHATA/EKSİK: Bazı sorular boş kaldı.\nYOL GÖSTERİCİ: Boş bıraktığın satıra dön, metinden bir ipucu bul ve seçimini yap.`;
          entry.state = 'none';
          entry.checked = false;
          store.save();
          const box = document.getElementById(`extra-feedback-${activity.id}`);
          if (box) {
            box.hidden = false;
            box.textContent = entry.feedback;
          }
          return;
        }
        const result = evaluate(activity, entry.values);
        const verdictResult = verdict(activity, result);
        entry.state = verdictResult.state;
        entry.feedback = verdictResult.text;
        entry.checked = true;
        store.save();
        window.renderTheme1Extras?.(Number(unit.weekId), api);
      });
    });
  }

  window.renderTheme1ExtrasFlow = function (unit, api) {
    render(unit, api);
  };
})();
