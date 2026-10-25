/* GeoGebra applet yükleyicisi — 7. sınıf matematik alanı.
   Amaç: konu anlatımındaki keşif sahnelerini tek bir yerden, tembel yükleme ile açmak;
   GeoGebra'ya ulaşılamazsa aynı sahnenin statik karşılığını göstermek. */
(() => {
  'use strict';

  const DEPLOY_URL = 'https://www.geogebra.org/apps/deployggb.js';
  const DEFAULT_TIMEOUT = 12000;

  // Yalnız keşif için gereken en küçük arayüz: menü, cebir girişi ve araç çubuğu kapalı.
  const BASE_PARAMS = Object.freeze({
    language: 'tr',
    showMenuBar: false,
    showToolBar: false,
    showAlgebraInput: false,
    showResetIcon: true,
    showZoomButtons: true,
    enableRightClick: false,
    enableLabelDrags: true,
    errorDialogsActive: false,
    useBrowserForJS: true,
    preventFocus: true,
    borderColor: '#e3e9f1',
  });

  let deployPromise = null;

  function loadDeploy(timeout = DEFAULT_TIMEOUT) {
    if (typeof window === 'undefined') return Promise.reject(new Error('no-window'));
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

  function buildParams(spec, host) {
    const height = Number(spec.height) || 360;
    const measured = host && host.clientWidth ? Math.round(host.clientWidth) : 0;
    const width = Math.max(240, measured || Number(spec.width) || 640);
    const params = Object.assign({}, BASE_PARAMS, {
      appName: spec.appName || 'geometry',
      width,
      height,
      appletOnLoad: (api) => {
        const failures = runCommands(api, spec.commands || []);
        if (typeof spec.setup === 'function') spec.setup(api, failures);
        if (spec.hidden && spec.hidden.length) {
          spec.hidden.forEach((label) => api.setVisible(label, false));
        }
      },
    }, spec.params || {});
    return params;
  }

  // GeoGebra komut adları İngilizce olmak zorunda; hata olursa sahne yine açılır.
  function runCommands(api, commands) {
    const failures = [];
    commands.forEach((command) => {
      try {
        if (!api.evalCommand(command)) failures.push(command);
      } catch (error) {
        failures.push(command);
      }
    });
    return failures;
  }

  function showFallback(host, message) {
    if (!host) return;
    host.classList.add('ggb-failed');
    const note = host.querySelector('.ggb-fallback');
    if (note) {
      note.hidden = false;
      if (message) note.dataset.reason = message;
      return;
    }
    const box = document.createElement('div');
    box.className = 'ggb-fallback';
    box.setAttribute('role', 'status');
    box.innerHTML = '<b>Etkileşimli sürüm açılamadı.</b> Aynı şekli aşağıdaki statik görselden inceleyebilirsin; sorular bu görselle çözülebilir.';
    host.appendChild(box);
  }

  /**
   * host: applet'in yerleşeceği boş kapsayıcı
   * spec: { appName, height, commands, hidden, setup(api, failures), fallback }
   */
  function createApplet(host, spec = {}) {
    if (!host) return Promise.reject(new Error('no-host'));
    if (host.dataset.ggbState === 'loading' || host.dataset.ggbState === 'ready') {
      return Promise.reject(new Error('already-mounted'));
    }
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      host.dataset.ggbState = 'failed';
      showFallback(host, 'offline');
      return Promise.reject(new Error('offline'));
    }

    host.dataset.ggbState = 'loading';
    const stage = document.createElement('div');
    stage.className = 'ggb-stage';
    host.prepend(stage);

    return loadDeploy(spec.timeout)
      .then((GGBApplet) => new Promise((resolve, reject) => {
        let settled = false;
        const params = buildParams(spec, stage);
        const originalOnLoad = params.appletOnLoad;
        params.appletOnLoad = (api) => {
          settled = true;
          host.dataset.ggbState = 'ready';
          host.classList.add('ggb-ready');
          originalOnLoad(api);
          resolve(api);
        };
        const applet = new GGBApplet(params, true);
        applet.inject(stage);
        setTimeout(() => {
          if (settled) return;
          host.dataset.ggbState = 'failed';
          showFallback(host, 'slow');
          reject(new Error('applet-timeout'));
        }, (Number(spec.timeout) || DEFAULT_TIMEOUT) + 6000);
      }))
      .catch((error) => {
        if (host.dataset.ggbState !== 'failed') {
          host.dataset.ggbState = 'failed';
          showFallback(host, error.message);
        }
        throw error;
      });
  }

  window.MATEMATIK_GEOGEBRA = Object.freeze({
    DEPLOY_URL,
    BASE_PARAMS,
    loadDeploy,
    buildParams,
    runCommands,
    createApplet,
  });
})();
