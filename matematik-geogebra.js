/* GeoGebra applet yükleyicisi — 7. sınıf matematik alanı (v2).
   Tembel yükler, sahneyi kurar, kurulumu doğrular ve başarısızlığı ekranda görünür kılar.
   Amaç: "açıldı ama tuval boş" durumunu bir daha sessizce yaşamamak. */
(() => {
  'use strict';

  const DEPLOY_URL = 'https://www.geogebra.org/apps/deployggb.js';
  const SCRIPT_TIMEOUT = 15000;
  const READY_TIMEOUT = 25000;
  const RETRY_DELAYS = [0, 300, 900, 2000];

  const BASE_PARAMS = Object.freeze({
    language: 'tr',
    showMenuBar: false,
    showToolBar: false,
    showToolBarHelp: false,
    // GeoGebra'nın kendi giriş çubuğu: çizim alanının altında, ayrı bir bant olarak.
    showAlgebraInput: true,
    algebraInputPosition: 'bottom',
    showResetIcon: false,
    showZoomButtons: false,
    showFullscreenButton: false,
    showStartTooltip: false,
    allowStyleBar: false,
    autoHeight: false,
    perspective: 'G',
    showAxes: true,
    showGrid: true,
    enableRightClick: false,
    enableLabelDrags: true,
    errorDialogsActive: false,
    useBrowserForJS: true,
    preventFocus: true,
    showKeyboardOnFocus: 'auto',
    borderColor: '#e3e9f1',
  });

  let deployPromise = null;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function report(spec, state, payload) {
    if (typeof spec.onStatus === 'function') spec.onStatus(state, payload || {});
  }

  function loadDeploy(timeout = SCRIPT_TIMEOUT) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return Promise.reject(new Error('no-window'));
    if (window.GGBApplet) return Promise.resolve(window.GGBApplet);
    if (deployPromise) return deployPromise;

    deployPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const timer = setTimeout(() => {
        deployPromise = null;
        reject(new Error('timeout'));
      }, timeout);
      const fail = (reason) => {
        clearTimeout(timer);
        deployPromise = null;
        reject(new Error(reason));
      };
      script.src = DEPLOY_URL;
      script.async = true;
      script.onload = () => {
        clearTimeout(timer);
        if (window.GGBApplet) resolve(window.GGBApplet);
        else fail('missing-api');
      };
      script.onerror = () => fail('network');
      document.head.appendChild(script);
    });

    return deployPromise;
  }

  function measure(host, fallbackWidth, fallbackHeight) {
    const rect = host && host.getBoundingClientRect ? host.getBoundingClientRect() : null;
    const width = Math.max(240, Math.round((rect && rect.width) || (host && host.clientWidth) || fallbackWidth || 640));
    const height = Math.max(280, Math.round((rect && rect.height) || (host && host.clientHeight) || fallbackHeight || 420));
    return { width, height };
  }

  // Applet kutuyu tam doldursun: ekran döndürme ve klavye açılması sonrası yeniden ölçülür.
  function fitToStage(api, stage) {
    if (!api || typeof api.setSize !== 'function' || !stage) return null;
    const size = measure(stage, 0, 0);
    try { api.setSize(size.width, size.height); } catch (error) { return null; }
    return size;
  }

  function watchSize(api, stage) {
    if (typeof window === 'undefined' || !window.addEventListener) return () => {};
    let timer = null;
    const update = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => { timer = null; fitToStage(api, stage); }, 220);
    };
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    if (typeof window.ResizeObserver === 'function') {
      const observer = new window.ResizeObserver(update);
      observer.observe(stage);
      return () => {
        window.removeEventListener('resize', update);
        window.removeEventListener('orientationchange', update);
        observer.disconnect();
      };
    }
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }

  // Tanılama: kutu ile gerçek çizim alanının ölçüsü (çizim kutuyu dolduruyor mu?).
  function measureCanvas(stage) {
    if (!stage) return null;
    const box = stage.getBoundingClientRect ? stage.getBoundingClientRect() : null;
    const graphics = stage.querySelector('.graphicsView, canvas.ggBkCanvas, canvas');
    const inner = graphics && graphics.getBoundingClientRect ? graphics.getBoundingClientRect() : null;
    return {
      box: box ? { width: Math.round(box.width), height: Math.round(box.height) } : null,
      canvas: inner ? { width: Math.round(inner.width), height: Math.round(inner.height) } : null,
    };
  }

  // Appletin alt şeridi (GeoGebra logosu + bağlantı) sahne alanını daraltıyor.
  // Atıf yükümlülüğü sayfadaki kendi atıf satırımızla karşılanır.
  const BRANDING_SELECTOR = '[class*="footer" i],[class*="Footer"],[class*="branding" i],[id*="footer" i],[id*="Footer"]';

  function hideBranding(stage) {
    if (!stage) return 0;
    let hidden = 0;
    const candidates = stage.querySelectorAll(BRANDING_SELECTOR);
    candidates.forEach((element) => {
      if (element.querySelector('canvas') || element.querySelector('.graphicsView')) return;
      element.style.display = 'none';
      element.setAttribute('data-branding-hidden', 'true');
      hidden += 1;
    });
    return hidden;
  }

  function buildParams(spec, host) {
    const measuredSize = measure(host, spec.width, spec.height);
    const width = measuredSize.width;
    const height = measuredSize.height;
    return Object.assign({}, BASE_PARAMS, {
      appName: spec.appName || 'geometry',
      width,
      height,
    }, spec.params || {});
  }

  // GeoGebra komut adları İngilizce olmak zorunda; hata olursa sahne yine açılır.
  function runCommands(api, commands) {
    const failures = [];
    (commands || []).forEach((command) => {
      try {
        if (!api.evalCommand(command)) failures.push(command);
      } catch (error) {
        failures.push(command);
      }
    });
    return failures;
  }

  function objectCount(api) {
    try {
      if (typeof api.getObjectNumber === 'function') return api.getObjectNumber();
    } catch (error) {
      return -1;
    }
    return -1;
  }

  // Geometri uygulaması kendi araç çubuğunu ve alt bilgi şeridini getiriyor; bunlar sabit
  // yükseklik kapladığı için çizim alanı kutuya sığmıyordu. SetPerspective("G") yalnız
  // Graphics View'i bırakır (GeoGebra kılavuzu, SetPerspective komutu).
  function applyPerspective(api, stage, appName) {
    // 3B uygulamasında grafik görünümü yalnız başına açılırsa tuval boş kalıyor:
    // üç boyutlu görünüm "T" harfiyle istenir.
    const perspective = appName === '3d' ? 'T' : 'G';
    try { api.evalCommand(`SetPerspective("${perspective}")`); } catch (error) { /* eski sürümlerde yok */ }
    fitToStage(api, stage);
  }

  function applyView(api, spec) {
    ['ShowAxes(true)', 'ShowGrid(true)'].forEach((command) => {
      try { api.evalCommand(command); } catch (error) { /* görünüm komutu kritik değil */ }
    });
    if (spec.appName !== '3d' && spec.bounds && typeof api.setCoordSystem === 'function') {
      try { api.setCoordSystem(spec.bounds[0], spec.bounds[1], spec.bounds[2], spec.bounds[3]); } catch (error) { /* yoksay */ }
    }
  }

  // Android Chrome'da appletOnLoad, grafik görünümü hazır olmadan tetiklenebiliyor:
  // komutlar sessizce başarısız olup tuval boş kalıyor. Birkaç kez yeniden dene ve doğrula.
  async function prepare(api, spec, stage) {
    applyPerspective(api, stage, spec.appName);
    applyView(api, spec);
    let failures = [];
    let count = objectCount(api);
    for (let i = 0; i < RETRY_DELAYS.length; i += 1) {
      if (count > 0 && i > 0) break;
      if (RETRY_DELAYS[i]) await sleep(RETRY_DELAYS[i]);
      failures = runCommands(api, spec.commands);
      count = objectCount(api);
      if (count > 0) break;
    }
    applyPerspective(api, stage, spec.appName);
    applyView(api, spec);
    (spec.hidden || []).forEach((label) => {
      try { api.setVisible(label, false); } catch (error) { /* yoksay */ }
    });
    return { count, failures };
  }

  function ensureStage(host) {
    let stage = host.querySelector('.ggb-stage');
    if (!stage) {
      stage = document.createElement('div');
      stage.className = 'ggb-stage';
      host.prepend(stage);
    }
    return stage;
  }

  function showFallback(host, reason) {
    if (!host) return;
    host.classList.add('ggb-failed');
    let note = host.querySelector('.ggb-fallback');
    if (!note) {
      note = document.createElement('div');
      note.className = 'ggb-fallback';
      note.setAttribute('role', 'status');
      note.innerHTML = '<b>GeoGebra sahnesi açılamadı.</b> Aynı kazanım yerel sahne ile sürüyor.';
      host.appendChild(note);
    }
    note.hidden = false;
    if (reason) note.dataset.reason = reason;
  }

  /**
   * host : applet'in yerleşeceği kapsayıcı
   * spec : { appName, height, width, bounds, commands, hidden, onStatus, onFallback, timeout }
   * dönüş: Promise<{ api, count, failures }>
   */
  function createApplet(host, spec = {}) {
    if (!host) return Promise.reject(new Error('no-host'));
    if (host.dataset.ggbState === 'loading' || host.dataset.ggbState === 'ready') {
      return Promise.reject(new Error('already-mounted'));
    }

    const finish = (state, payload) => {
      host.dataset.ggbState = state;
      report(spec, state, payload);
    };

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      showFallback(host, 'offline');
      finish('failed', { reason: 'offline' });
      if (spec.onFallback) spec.onFallback('offline');
      return Promise.reject(new Error('offline'));
    }

    host.dataset.ggbState = 'loading';
    host.classList.add('is-loading');
    const stage = ensureStage(host);
    report(spec, 'loading');

    return loadDeploy(spec.scriptTimeout)
      .then((GGBApplet) => new Promise((resolve, reject) => {
        let loaded = false;
        const params = buildParams(spec, stage);
        params.appletOnLoad = (api) => {
          if (loaded) return;
          loaded = true;
          host.classList.remove('is-loading');
          finish('booting');
          prepare(api, spec, stage).then((result) => {
            if (!result.count) {
              reject(Object.assign(new Error('empty-construction'), { failures: result.failures }));
              return;
            }
            fitToStage(api, stage);
            hideBranding(stage);
            // Alt şerit bazen applet hazır olduktan sonra ekleniyor: kısa süre izle.
            if (typeof window !== 'undefined' && window.MutationObserver) {
              const watcher = new window.MutationObserver(() => hideBranding(stage));
              watcher.observe(stage, { childList: true, subtree: true });
              setTimeout(() => watcher.disconnect(), 8000);
            }
            const stopWatching = watchSize(api, stage);
            const measureNow = () => measureCanvas(stage);
            // Perspektif değişikliği bazen tuvali yeniden ölçekliyor: kısa süre sonra bir kez daha oturt.
            setTimeout(() => {
              applyPerspective(api, stage, spec.appName);
              hideBranding(stage);
              styleInputBand(stage);
            }, 500);
            finish('ready', result);
            resolve({
              api,
              count: result.count,
              failures: result.failures,
              stopWatching,
              measure: measureNow,
              fit: () => { applyPerspective(api, stage, spec.appName); return measureNow(); },
            });
          }).catch(reject);
        };

        const applet = new GGBApplet(params, true);
        applet.inject(stage);

        setTimeout(() => {
          if (loaded) return;
          reject(new Error('applet-timeout'));
        }, Number(spec.readyTimeout) || READY_TIMEOUT);
      }))
      .catch((error) => {
        host.classList.remove('is-loading');
        showFallback(host, error.message);
        finish('failed', { reason: error.message, failures: error.failures || [] });
        if (spec.onFallback) spec.onFallback(error.message, error.failures || []);
        throw error;
      });
  }

  // GeoGebra'nın kendi giriş çubuğunu bir "bant" gibi işaretler: çizim alanı üstte,
  // giriş alanı altta kalır. DOM yapısı sürüme göre değişebildiği için ölçüyle aranır.
  function hasNativeInput(stage) {
    if (!stage) return false;
    try {
      return Boolean(stage.querySelector('input:not([type="hidden"]), textarea, [contenteditable="true"]'));
    } catch (error) {
      return false;
    }
  }

  function styleInputBand(stage) {
    if (!stage) return false;
    let input = null;
    try {
      input = stage.querySelector('input:not([type="hidden"]), textarea, [contenteditable="true"]');
    } catch (error) {
      return false;
    }
    if (!input) return false;
    const stageHeight = stage.clientHeight || stage.getBoundingClientRect().height || 0;
    let node = input;
    let band = null;
    for (let depth = 0; depth < 6 && node && node !== stage; depth += 1) {
      const rect = node.getBoundingClientRect();
      if (rect.height > 0 && stageHeight > 0 && rect.height <= stageHeight * 0.6) band = node;
      node = node.parentElement;
    }
    if (!band) return false;
    try {
      band.classList.add('ggb-input-band');
      if (stageHeight > 0) band.style.minHeight = `${Math.round(stageHeight / 3)}px`;
      band.style.display = 'flex';
      band.style.alignItems = 'center';
    } catch (error) {
      return false;
    }
    return true;
  }

  // Sahne parametreleri: HTML sürgüleri GeoGebra'daki serbest sayıları sürer.
  function setParam(api, name, value) {
    try {
      api.setValue(name, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  function setParams(api, params) {
    (params || []).forEach((param) => setParam(api, param.name, param.value));
  }

  window.MATEMATIK_GEOGEBRA = Object.freeze({
    setParam,
    setParams,
    hasNativeInput,
    styleInputBand,
    DEPLOY_URL,
    BASE_PARAMS,
    BRANDING_SELECTOR,
    loadDeploy,
    buildParams,
    measure,
    measureCanvas,
    applyPerspective,
    fitToStage,
    watchSize,
    hideBranding,
    runCommands,
    objectCount,
    createApplet,
  });
})();
