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

const CACHE = 'ggb-runtime-v1';
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
  if (!isGeoGebra(request.url)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(request, { ignoreSearch: false });
    if (cached) {
      /* Önbellekten hemen ver. Sürümlü dosyalar hiç tazelenmez; sürümsüz
         başlatıcı ise oturumda yalnız bir kez arka planda tazelenir. Böylece
         ikinci açılış ne ağ bekler ne de gereksiz indirme yapar. */
      const needsRefresh = !isVersioned(request.url) && !revalidated.has(request.url);
      if (needsRefresh) {
        revalidated.add(request.url);
        event.waitUntil((async () => {
          try {
            const fresh = await fetch(request);
            if (fresh && (fresh.ok || fresh.type === 'opaque')) {
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
      if (response && (response.ok || response.type === 'opaque')) {
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

/* Süresi çok eski kayıtları temizle (nadiren çalışır, ucuzdur). */
self.addEventListener('message', (event) => {
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
