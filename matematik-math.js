/* Matematik yazım motoru — küçük, bağımlılıksız TeX-benzeri gösterim.
   Amaç: kesirleri, üsleri, kökleri ve işlemleri düz metin yerine dizgiyle göstermek.
   Kural: $...$ arası matematik, dışı düz metin. Dış kütüphane yok, çevrimdışı çalışır. */
(() => {
  'use strict';

  const SYMBOLS = {
    times: '×', div: '÷', cdot: '·', pm: '±', mp: '∓',
    le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠',
    approx: '≈', equiv: '≡', lt: '<', gt: '>',
    degree: '°', circ: '°', pi: 'π', alpha: 'α', beta: 'β', gamma: 'γ',
    theta: 'θ', mu: 'μ', infty: '∞', angle: '∠', perp: '⊥', parallel: '∥',
    triangle: '△', square: '□', percent: '%', mid: '|',
    ldots: '…', dots: '…', cdots: '⋯', prime: '′',
    leftarrow: '←', rightarrow: '→', Rightarrow: '⇒',
  };
  const FUNCTIONS = new Set(['sin', 'cos', 'tan', 'log', 'ln', 'abs', 'max', 'min', 'EKOK', 'EBOB']);

  const escapeHTML = (value) => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  function readGroup(source, index) {
    // index, '{' karakterinin konumudur.
    if (source[index] !== '{') {
      const single = source[index] || '';
      return { value: single, next: index + 1 };
    }
    let depth = 0;
    let start = index + 1;
    for (let i = index; i < source.length; i += 1) {
      if (source[i] === '{') depth += 1;
      else if (source[i] === '}') {
        depth -= 1;
        if (depth === 0) return { value: source.slice(start, i), next: i + 1 };
      }
    }
    return { value: source.slice(start), next: source.length };
  }

  const wrap = (className, inner) => `<span class="${className}">${inner}</span>`;

  // Matematik parçasını HTML'e çevirir (özyinelemeli).
  function renderExpression(source) {
    let out = '';
    let index = 0;
    while (index < source.length) {
      const char = source[index];

      if (char === '\\') {
        // \, \; \! ve ters bölü + boşluk: görünmez ince aralık.
        if (/[ ,;:!]/.test(source[index + 1] || '')) {
          out += ' ';
          index += 2;
          continue;
        }
        let end = index + 1;
        while (end < source.length && /[a-zA-Z]/.test(source[end])) end += 1;
        const name = source.slice(index + 1, end);

        if (name === '') {
          // \% gibi kaçışlı işaretler: ters bölü görünmez.
          out += escapeHTML(source[end] || '');
          index = end + 1;
          continue;
        }

        if (name === 'frac' || name === 'dfrac' || name === 'tfrac') {
          const first = readGroup(source, end);
          const second = readGroup(source, first.next);
          out += `<span class="m-frac"><span class="m-num">${renderExpression(first.value)}</span>`
            + `<span class="m-den">${renderExpression(second.value)}</span></span>`;
          index = second.next;
          continue;
        }
        if (name === 'sqrt') {
          const group = readGroup(source, end);
          out += `<span class="m-sqrt"><span class="m-radical">√</span>`
            + `<span class="m-radicand">${renderExpression(group.value)}</span></span>`;
          index = group.next;
          continue;
        }
        if (name === 'text' || name === 'mathrm') {
          const group = readGroup(source, end);
          out += `<span class="m-text">${escapeHTML(group.value)}</span>`;
          index = group.next;
          continue;
        }
        if (name === 'left' || name === 'right') {
          // \left( ... \right) yalnız parantez boyutu komutudur; ayraç aynen yazılır.
          index = end;
          continue;
        }
        if (name === 'overline' || name === 'bar') {
          const group = readGroup(source, end);
          out += wrap('m-overline', renderExpression(group.value));
          index = group.next;
          continue;
        }
        if (FUNCTIONS.has(name)) {
          out += `<span class="m-fn">${escapeHTML(name)}</span>`;
          index = end;
          continue;
        }
        if (SYMBOLS[name]) {
          out += `<span class="m-op">${SYMBOLS[name]}</span>`;
          index = end;
          continue;
        }
        // Bilinmeyen komut: olduğu gibi yaz, sessizce kaybolmasın.
        out += escapeHTML(source.slice(index, end));
        index = end;
        continue;
      }

      if (char === '^' || char === '_') {
        const group = readGroup(source, index + 1);
        out += char === '^'
          ? `<sup>${renderExpression(group.value)}</sup>`
          : `<sub>${renderExpression(group.value)}</sub>`;
        index = group.next;
        continue;
      }

      if (/[a-zA-Z]/.test(char)) {
        let end = index;
        while (end < source.length && /[a-zA-Z]/.test(source[end])) end += 1;
        const word = source.slice(index, end);
        if (word.length === 1) out += `<i class="m-var">${word}</i>`;
        else if (FUNCTIONS.has(word)) out += `<span class="m-fn">${word}</span>`;
        else out += `<span class="m-text">${escapeHTML(word)}</span>`;
        index = end;
        continue;
      }

      if (char === '{') {
        // TeX gruplaması: süslü parantezler görünmez (2{,}5 → 2,5).
        const group = readGroup(source, index);
        out += renderExpression(group.value);
        index = group.next;
        continue;
      }

      if (char === '}') {
        index += 1;
        continue;
      }

      if (char === ' ') {
        out += ' ';
        index += 1;
        continue;
      }

      if (char === '-') {
        out += '<span class="m-op">−</span>';
        index += 1;
        continue;
      }

      out += escapeHTML(char);
      index += 1;
    }
    return out;
  }

  /** Düz metni, $...$ arasındaki matematik dizgiye çevirerek HTML'e dönüştürür. */
  function render(text) {
    if (text === null || text === undefined) return '';
    const source = String(text);
    const parts = source.split('$');
    return parts.map((part, index) => (index % 2 === 1
      ? `<span class="m">${renderExpression(part)}</span>`
      : escapeHTML(part))).join('');
  }

  /** Matematik parçalarındaki dengesiz süslü parantezleri yakalar (denetim için). */
  function lint(text) {
    const problems = [];
    const parts = String(text).split('$');
    parts.forEach((part, index) => {
      if (index % 2 === 0) {
        if (part.includes('\\frac') || part.includes('\\sqrt')) problems.push('Matematik komutu $ dışında');
        return;
      }
      let depth = 0;
      for (const char of part) {
        if (char === '{') depth += 1;
        if (char === '}') depth -= 1;
        if (depth < 0) break;
      }
      if (depth !== 0) problems.push(`Dengesiz süslü parantez: $${part}$`);
    });
    if (parts.length % 2 === 0) problems.push('$ işaretleri eşleşmiyor');
    return problems;
  }

  window.MATEMATIK_MATH = Object.freeze({ render, lint, renderExpression });
})();
