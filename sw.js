/* Hizmet çalışanı (service worker): GeoGebra CDN dosyalarını bu cihazda
   saklar. GeoGebra 3B çalışma ortamı ~8 MB'tır; her açılışta indirmek
   sayfayı saniyelerce bekletiyordu. Bir kez indirilen dosyalar sonraki
   günlerde ağdan değil, cihazdan okunur.

   Kapsam bilinçli olarak dar:
   - Yalnız geogebra.org / cdn.geogebra.org adresleri önbelleğe alınır.
   - Sitenin kendi dosyalarına (HTML, JS, CSS) hiç karışılmaz: güncelleme
     yayınlandığında tarayıcı her zamanki gibi en yeni sürümü alır.
   - Ağ hatasında önbellekteki kopya verilir; önbellek yoksa istek normal
     şekilde ağa gider. */

'use strict';

/* Sürüm damgası: davranış değiştiğinde artırılır. Eski önbellek etkinleştirmede
   silinir; böylece bozuk/eski kayıtlar kullanıcıda takılı kalmaz. */
const CACHE = 'ggb-runtime-v2';
/* Önbellek iki yıl tutulur; GeoGebra sürüm yolları sürümle damgalıdır. */
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 730;
/* Depolamayı şişirmemek için üst sınır: GeoGebra 3B çalışma ortamı ~40 MB
   açılmış hâliyle; 300 dosya / 60 MB yeterli bir tavandır. */
const MAX_ENTRIES = 300;

const isGeoGebra = (url) => /^https:\/\/([a-z0-9-]+\.)?(geogebra\.org|geogebra\.com)\//i.test(url);

/* Sürümle damgalı yollar (/apps/5.4.920.0/web3d/…) hiç değişmez: bunlar
   ağdan bir daha istenmez. Yalnız sürümsüz dosya (deployggb.js) oturumda bir
   kez arka planda tazelenir; böylece her açılışta yüzlerce dosya yeniden
   indirilmez. */
const isVersioned = (url) => /\/apps\/\d+(\.\d+){2,}\//.test(url);
const revalidated = new Set();

/* Hangi istekler önbelleğe alınır?
   - Betik, stil, resim ve yazı tipi istekleri: bunlar CORS istemez (no-cors),
     bayt bayt saklanabilir. GeoGebra'nın ~8 MB'lık çalışma ortamı buradadır.
   - `fetch`/XHR ile yapılan CORS istekleri **alınmaz**: önbellekteki saydam
     (opaque) yanıt CORS denetimini geçemez, applet boş kalırdı. Bu istekler
     her zaman ağa gider.
   - Parçalı (Range) istekler de alınmaz. */
const CACHEABLE_DEST = new Set(['script', 'style', 'image', 'font']);
function isCacheable(request) {
  if (!isGeoGebra(request.url)) return false;
  try {
    if (request.headers && typeof request.headers.get === 'function' && request.headers.get('range')) return false;
  } catch (error) { /* başlık okunamıyorsa aşağıdaki kurallar geçerli */ }
  if (request.destination) return CACHEABLE_DEST.has(request.destination);
  /* destination boş: fetch/XHR. Yalnız no-cors istekleri saklanabilir. */
  return request.mode === 'no-cors';
}

/* Önbellekten verilebilecek yanıt mı? Hata sayfaları (4xx/5xx) asla verilmez. */
function usable(response) {
  if (!response) return false;
  if (response.type === 'opaque') return true;
  return response.ok === true && response.status >= 200 && response.status < 300;
}

async function trim(cache) {
  const keys = await cache.keys();
  if (keys.length <= MAX_ENTRIES) return;
  /* En eski kayıtlar önce silinir (Cache API ekleme sırasını korur). */
  const drop = keys.slice(0, keys.length - MAX_ENTRIES);
  await Promise.all(drop.map((key) => cache.delete(key)));
}

self.addEventListener('install', (event) => {
  /* Yeni çalışan hemen devreye girsin: kullanıcı bir sonraki açılışta
     önbellekten yararlansın. */
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter((name) => name.startsWith('ggb-runtime-') && name !== CACHE)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (!isCacheable(request)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(request, { ignoreSearch: false });
    if (usable(cached)) {
      /* Önbellekten hemen ver. Sürümlü dosyalar hiç tazelenmez; sürümsüz
         başlatıcı ise oturumda yalnız bir kez arka planda tazelenir. Böylece
         ikinci açılış ne ağ bekler ne de gereksiz indirme yapar. */
      const needsRefresh = !isVersioned(request.url) && !revalidated.has(request.url);
      if (needsRefresh) {
        revalidated.add(request.url);
        event.waitUntil((async () => {
          try {
            const fresh = await fetch(request);
            if (usable(fresh)) {
              await cache.put(request, fresh.clone());
              await trim(cache);
            }
          } catch (error) {
            /* çevrimdışı: önbellekteki kopya yeterli */
          }
        })());
      }
      return cached;
    }
    try {
      const response = await fetch(request);
      /* Saydam (opaque) yanıtlar da saklanabilir: script etiketleri CORS
         istemez, bu yüzden içerik okunamasa da tarayıcıya aynen verilebilir. */
      if (usable(response)) {
        event.waitUntil(cache.put(request, response.clone()).then(() => trim(cache)).catch(() => {}));
      }
      return response;
    } catch (error) {
      const stale = await cache.match(request);
      if (stale) return stale;
      throw error;
    }
  })());
});

/* Önbelleği tümüyle boşalt: applet açılmadıysa (bozuk/eski kayıt) sayfa bunu
   ister, ardından yeniden denemede dosyalar ağdan taze gelir. */
async function clearCache() {
  try {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith('ggb-runtime-'))
      .map((name) => caches.delete(name)));
  } catch (error) { /* yok say */ }
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'ggb-reset') {
    event.waitUntil(clearCache());
    return;
  }
  if (!event.data || event.data.type !== 'ggb-prune') return;
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const keys = await cache.keys();
    const now = Date.now();
    await Promise.all(keys.map(async (key) => {
      const response = await cache.match(key);
      const stamp = Number(response && response.headers.get('date') ? Date.parse(response.headers.get('date')) : 0);
      if (stamp && now - stamp > MAX_AGE_MS) await cache.delete(key);
    }));
  })());
});
