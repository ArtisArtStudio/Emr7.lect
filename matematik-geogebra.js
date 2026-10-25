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
    showAlgebraInput: false,
    showResetIcon: true,
    showZoomButtons: false,
    showFullscreenButton: true,
    allowStyleBar: false,
    autoHeight: false,
    showAxes: true,
    showGrid: true,
    enableRightClick: false,
    enableLabelDrags: true,
    errorDialogsActive: false,
    useBrowserForJS: true,
    preventFocus: true,
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

  function applyView(api, spec) {
    ['ShowAxes(true)', 'ShowGrid(true)'].forEach((command) => {
      try { api.evalCommand(command); } catch (error) { /* görünüm komutu kritik değil */ }
    });
    if (spec.bounds && typeof api.setCoordSystem === 'function') {
      try { api.setCoordSystem(spec.bounds[0], spec.bounds[1], spec.bounds[2], spec.bounds[3]); } catch (error) { /* yoksay */ }
    }
  }

  // Android Chrome'da appletOnLoad, grafik görünümü hazır olmadan tetiklenebiliyor:
  // komutlar sessizce başarısız olup tuval boş kalıyor. Birkaç kez yeniden dene ve doğrula.
  async function prepare(api, spec) {
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
          prepare(api, spec).then((result) => {
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
            if (typeof api.setAnimating === 'function') { /* yoksay: bazı sürümlerde yok */ }
            finish('ready', result);
            resolve({ api, count: result.count, failures: result.failures, stopWatching, fit: () => fitToStage(api, stage) });
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

  window.MATEMATIK_GEOGEBRA = Object.freeze({
    DEPLOY_URL,
    BASE_PARAMS,
    BRANDING_SELECTOR,
    loadDeploy,
    buildParams,
    measure,
    fitToStage,
    watchSize,
    hideBranding,
    runCommands,
    objectCount,
    createApplet,
  });
})();
