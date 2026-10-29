/* Matematik: GeoGebra köprüsü — yalnız üç boyutlu cisimler.
 *
 * Kural (27 Ekim 2026, 3. sürüm): GeoGebra **sadece 3B cisimlerde** kullanılır:
 *   prizma3b · hacim · birim-donusum · uc-gorunum · acim · bilesik-hacim · duzensiz-yigin
 * Diğer sahneler yerel SVG ile çizilir. Gerekçe: 2B sahnelerde
 * yerel çizim daha hızlı, çevrimdışı ve cevap sızdırmıyor; GeoGebra'nın pencere/ölçek
 * davranışı 2B'de ek yük getiriyordu.
 *
 * Çerçeve kuralları (eski hatalar):
 * - “GeoGebra hazırlanıyor” yazısı **kaplama**dır (absolute); applet gelince kaldırılır,
 *   üstte boş şerit bırakmaz.
 * - Tuval **kare**ye yakın ölçülür (en az 300×300); dar/uzun ince pencere oluşmaz.
 * - Cisim **orijine ortalanır**; böylece yakınlaştırma/uzaklaştırma cismi kırpmaz.
 * - Görünüm düğmeleri (Eğik · Ön · Arka · Sağ · Sol · Alt · Üst) `SetViewDirection` ile
 *   çalışır; varsayılan bakış yukarıdan eğiktir, öğrenci cismi parmağıyla döndürebilir.
 * - `kup-dondur` düz (flat) gölgeli çizilir: her küpün her yüzü ayrı poligon ve ayrı ton,
 *   dolgu tam; köşe noktaları/etiketler ve zemin düzlemi gizlenir.
 * - Eksenler `setAxesVisible(-1, false, false, false)` ile kapatılır. Üç argümanlı
 *   `setAxesVisible(false, false, false)` çağrısı **etkisizdir**: ilk argüman görünüm
 *   numarası sanılır (0 → geçersiz) ve sahnede dikey z ekseni görünür kalırdı.
 * - `kup-kur-ggb` etkileşimlidir: 3 × 3 tabanda boş sütunun zeminine, dolu sütunun
 *   yüzüne dokununca o sütuna bir küp eklenir (silme modunda bir küp eksilir).
 *   Tıklama `registerClickListener` ile alınır; nesne adı sütunu taşır. Cisim
 *   GeoGebra'nın kendi nesneleridir, öğrenci parmağıyla döndürür; kadraj sabittir.
 * - `acim` sahnesinde “Katla / Aç” düğmesi ve tuvale dokunma, kapalı kutu ile düz açınım
 *   arasında geçirir.
 * - `uc-gorunum` ve `duzensiz-yigin` sahneleri **bölünmüş** çalışır: solda döndürülebilir
 *   3B cisim, sağda ön/yan/üst dik izdüşümleri aynı sürgülerle eşzamanlı güncellenir.
 *   Düzensiz yığında izdüşümler gerçek siluettir (boşluklar ve basamaklar görünür).
 * - Hacim sahnelerinde **her birim küp ayrı nesnedir**: prizma tek blok olarak değil,
 *   sayılabilir küpler toplamı olarak çizilir (`hacim`, `bilesik-hacim`, `duzensiz-yigin`).
 *
 * Yedek: ağ yoksa, CDN engelliyse ya da nesneler kurulamazsa aynı sahne yerel SVG ile çizilir.
 * Ticari olmayan kullanım; atıf sahnede ve THIRD-PARTY-NOTICES.md içinde.
 */
(function () {
  'use strict';

  const CDN = 'https://www.geogebra.org/apps/deployggb.js';
  const LOAD_TIMEOUT = 12000;
  const BUILD_DELAYS = [0, 300, 900, 2000];
  const PREF_KEY = 'emr7lect.matematik.geogebra';

  let loader = null;
  let uid = 0;
  let loadFailed = false;

  function prefers() {
    try {
      return window.localStorage.getItem(PREF_KEY) !== 'off';
    } catch (error) {
      return true;
    }
  }

  function setPrefers(on) {
    try {
      window.localStorage.setItem(PREF_KEY, on ? 'on' : 'off');
    } catch (error) {
      /* depolama kapalıysa varsayılan açık kalır */
    }
  }

  /* ---------- sayı ve komut biçimi ---------- */

  /* GeoGebra komutları nokta ondalığı ve ASCII eksi ister; virgül ya da U+2212
     komutu sessizce düşürür (yerel SVG'de yaşanan hatanın aynısı). */
  function f(value) {
    const number = Math.round(Number(value) * 1000) / 1000;
    if (!Number.isFinite(number)) return '0';
    return String(number);
  }

  function co(value) {
    if (typeof value === 'string' && value.trim() !== '') return value;
    return f(value);
  }

  function P(x, y, z) {
    if (z === undefined) return `(${co(x)}, ${co(y)})`;
    return `(${co(x)}, ${co(y)}, ${co(z)})`;
  }

  function S(text) {
    return JSON.stringify(String(text));
  }

  const COLOR = {
    ink: [27, 47, 73],
    purple: [91, 70, 168],
    light: [201, 191, 242],
    green: [47, 138, 99],
    mint: [215, 240, 227],
    red: [192, 55, 68],
    gray: [139, 151, 168],
    amber: [184, 121, 26],
    white: [255, 255, 255],
  };

  /* Yüz renkleri: ön, yan ve üst yüz birbirinden ayrılsın diye üç ayrı ton.
     (Bkz. referans GeoGebra materyali: katı cisim tek renk değil, yüzleri ayrı okunur.) */
  const FACE_COLORS = {
    front: [72, 129, 176],
    back: [150, 176, 200],
    side: [95, 78, 168],
    top: [120, 160, 210],
    bottom: [176, 170, 196],
  };

  /* Birim küplerin dönüşümlü renkleri: komşu küpler birbirine karışmaz.
     Kat yükseldikçe ton değişir; üst katman maviye yaklaşır (üst yüz okunur). */
  const LEVEL_COLORS = [
    [[186, 176, 232], [206, 198, 240]],
    [[176, 214, 196], [199, 232, 214]],
    [[172, 203, 235], [199, 221, 244]],
    [[199, 186, 232], [221, 210, 243]],
  ];
  const cubeTint = (i, j, level) => {
    const band = LEVEL_COLORS[level % LEVEL_COLORS.length];
    return band[(i + j) % band.length];
  };

  /* Bakış yönleri. “Üst” tam dik (0,0,1) verilmez: dünya yukarı vektörüyle
     çakışınca GeoGebra döndürme eksenini bulamayıp donuyordu; küçük eğim
     görüntüyü bozmaz, donmayı önler. */
  /* GeoGebra `SetViewDirection(Vector(v))` komutu gözü **-v** yönüne koyar
     (kaynak: CmdSetViewDirection → setRotAnimation(-v); b açısı gözün yükselişidir).
     Bu yüzden v, bakışın yönüdür: göz yukarıdaysa v aşağıyı gösterir.
     Eğik bakış yukarıdan ve önden gelir; cisim alttan görünmez. */
  const VIEWS = {
    egik: 'Vector((-1.1, 1.7, -2.1))',
    on: 'Vector((0.001, 1, 0.002))',
    arka: 'Vector((-0.001, -1, 0.002))',
    sag: 'Vector((-1, 0.001, 0.002))',
    sol: 'Vector((1, 0.001, 0.002))',
    alt: 'Vector((0.04, -0.05, 1))',
    ust: 'Vector((0.04, -0.05, -1))',
    yan: 'Vector((-1, 0.001, 0.002))',
  };

  /* Yüz renkleri: düğmelerin doğru yönü göstermesi bu renklerden okunur. */
  const FACE_LEGEND = [
    ['üst', '#d62d20'], ['alt', '#8e96a4'], ['sol', '#2e7d32'],
    ['sağ', '#f2c200'], ['ön', '#7030a0'], ['arka', '#ef8fae'],
  ];

  const VIEW_LABELS = [
    ['egik', 'Eğik'],
    ['on', 'Ön'],
    ['arka', 'Arka'],
    ['sag', 'Sağ'],
    ['sol', 'Sol'],
    ['alt', 'Alt'],
    ['ust', 'Üst'],
  ];

  /* GeoGebra 3B görünümünün varsayılan merkezi orijin DEĞİL: kaynakta
     `ZZERO_SCENE_STANDARD = -1.5` (EuclidianView3DInterface). Yani ekranın tam
     ortası dünya koordinatında (0, 0, -1.5) noktası. Cismi orijine ortalayınca
     kadrajda 1.5 birim yukarıda kalıyordu. Cisim bu yüzden bu noktaya orta­lanır;
     eksenler kapalı olduğu için sahnede başka hiçbir şey kalmaz. */
  const VIEW_CENTER_Z = -1.5;

  /* Birim küp kenarı: siyah, ince. Küplerin sınırı böylece her bakışta okunur. */
  const EDGE_RGB = [0, 0, 0];

  /* Düz (flat) gölgeleme: her yüz tek renk, dolgu tam; küpün altı yüzü altı ayrı renk.
     Renkler sabittir: üst kırmızı, alt gri, sol yeşil, sağ sarı, ön mor, arka pembe.
     Alt yüz siyah değil gri: siyah zemin küpün çizgilerini yutuyor, gölgede
     kayboluyordu. Gri, siyah kenarları ve küpün biçimini okunur tutar. */
  const FLAT_FACES = {
    top: [214, 45, 32],
    bottom: [142, 150, 164],
    left: [46, 125, 50],
    right: [242, 194, 0],
    front: [112, 48, 160],
    back: [239, 143, 174],
  };

  /* ---------- ortak çizim kapısı ---------- */

  function builder(api) {
    const names = [];
    const labeled = new Set();
    /* Çizilen her noktanın sınırları: sahne bu kutunun merkezine ortalanır. */
    const bounds = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity, minZ: Infinity, maxZ: -Infinity };
    const grow = (points) => {
      points.forEach((point) => {
        const [x, y, z] = point;
        if (![x, y, z].every((value) => Number.isFinite(Number(value)))) return;
        bounds.minX = Math.min(bounds.minX, Number(x)); bounds.maxX = Math.max(bounds.maxX, Number(x));
        bounds.minY = Math.min(bounds.minY, Number(y)); bounds.maxY = Math.max(bounds.maxY, Number(y));
        bounds.minZ = Math.min(bounds.minZ, Number(z)); bounds.maxZ = Math.max(bounds.maxZ, Number(z));
      });
    };
    const run = (command) => {
      try {
        api.evalCommand(command);
      } catch (error) {
        /* komut hatası doğrulamada yakalanır */
      }
    };
    const box = {
      api,
      names,
      labeled,
      run,
      mark(name, showLabel) {
        names.push(name);
        if (showLabel) labeled.add(name);
        return name;
      },
      point(name, x, y, z) {
        box.mark(name, false);
        grow([[x, y, z]]);
        run(`${name} = ${P(x, y, z)}`);
      },
      segment(name, x1, y1, z1, x2, y2, z2) {
        box.mark(name, false);
        grow([[x1, y1, z1], [x2, y2, z2]]);
        run(`${name} = Segment(${P(x1, y1, z1)}, ${P(x2, y2, z2)})`);
      },
      polygon3(name, points) {
        box.mark(name, false);
        grow(points);
        run(`${name} = Polygon(${points.map(([x, y, z]) => P(x, y, z)).join(', ')})`);
      },
      /* Çizilen her şeyin sınır kutusu; sahne bu kutunun merkezine alınır. */
      bounds() {
        if (!Number.isFinite(bounds.minX)) return null;
        return { ...bounds };
      },
      polygon(name, points) {
        box.mark(name, false);
        run(`${name} = Polygon(${points.map(([x, y]) => P(x, y)).join(', ')})`);
      },
      cube(name, x, y, z, edge) {
        box.mark(name, false);
        run(`${name} = Cube(${P(x, y, z)}, ${P(x + edge, y, z)})`);
      },
      /* Yön verilmiş küp: kenarı z ekseni boyunca ilerler, böylece birim küpler
         taban düzlemine dik ve birbirine bitişik oturur (ızgara kaymaz). */
      cubeUp(name, x, y, z, edge) {
        box.mark(name, false);
        run(`${name} = Cube(${P(x, y, z)}, ${P(x + edge, y, z)}, Vector((0, 0, 1)))`);
      },
      slider(name, min, max, step) {
        run(`${name} = Slider(${f(min)}, ${f(max)}, ${f(step)})`);
      },
      set(name, value) {
        run(`SetValue(${name}, ${f(value)})`);
      },
      color(name, rgb) {
        try {
          api.setColor(name, rgb[0], rgb[1], rgb[2]);
        } catch (error) {
          /* renk verilemezse varsayılan kalır */
        }
      },
      /* Biçim komutları doğrudan API'den verilir: `evalCommand` metni yeniden
         ayrıştırır, her küp yüzü için onlarca kez çağrılınca dokunuş gecikir.
         Eski sürümlerde yöntem yoksa komut yoluna düşülür. */
      thickness(name, width) {
        if (typeof api.setLineThickness === 'function') {
          try { api.setLineThickness(name, width); return; } catch (error) { /* yok say */ }
        }
        run(`SetLineThickness(${name}, ${f(width)})`);
      },
      lineStyle(name, style) {
        if (typeof api.setLineStyle === 'function') {
          try { api.setLineStyle(name, style); return; } catch (error) { /* yok say */ }
        }
        run(`SetLineStyle(${name}, ${f(style)})`);
      },
      fill(name, opacity) {
        if (typeof api.setFilling === 'function') {
          try { api.setFilling(name, opacity); return; } catch (error) { /* yok say */ }
        }
        run(`SetFilling(${name}, ${f(opacity)})`);
      },
      hide(name) {
        run(`SetVisibleInView(${name}, 1, false)`);
      },
      /* Dikdörtgen prizmanın altı yüzü ayrı nesne: ön/yan/üst farklı renkte.
         Kenar çizgileri koyu; yüz dolgusu yarı saydam ki birim küpler görünsün. */
      faces(x0, y0, z0, dx, dy, dz) {
        const list = [
          ['on', [[x0, y0, z0], [x0 + dx, y0, z0], [x0 + dx, y0, z0 + dz], [x0, y0, z0 + dz]], FACE_COLORS.front, 0.5],
          ['arka', [[x0, y0 + dy, z0], [x0 + dx, y0 + dy, z0], [x0 + dx, y0 + dy, z0 + dz], [x0, y0 + dy, z0 + dz]], FACE_COLORS.back, 0.38],
          ['sol', [[x0, y0, z0], [x0, y0 + dy, z0], [x0, y0 + dy, z0 + dz], [x0, y0, z0 + dz]], FACE_COLORS.side, 0.46],
          ['sag', [[x0 + dx, y0, z0], [x0 + dx, y0 + dy, z0], [x0 + dx, y0 + dy, z0 + dz], [x0 + dx, y0, z0 + dz]], FACE_COLORS.side, 0.46],
          ['taban', [[x0, y0, z0], [x0 + dx, y0, z0], [x0 + dx, y0 + dy, z0], [x0, y0 + dy, z0]], FACE_COLORS.bottom, 0.42],
          ['ust', [[x0, y0, z0 + dz], [x0 + dx, y0, z0 + dz], [x0 + dx, y0 + dy, z0 + dz], [x0, y0 + dy, z0 + dz]], FACE_COLORS.top, 0.42],
        ];
        list.forEach(([name, points, color, opacity]) => {
          box.polygon3(name, points);
          box.color(name, color);
          box.fill(name, opacity);
        });
      },
      /* Düz küp: her yüz ayrı poligon, dolgu tam (saydamlık yok), komşuya bakan
         iç yüzler hiç çizilmez (z-çakışması ve titreme olmaz). */
      flatCube(prefix, x, y, z, faces) {
        const corners = {
          bottom: [[x, y, z], [x + 1, y, z], [x + 1, y + 1, z], [x, y + 1, z]],
          top: [[x, y, z + 1], [x + 1, y, z + 1], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]],
          front: [[x, y, z], [x + 1, y, z], [x + 1, y, z + 1], [x, y, z + 1]],
          back: [[x, y + 1, z], [x + 1, y + 1, z], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]],
          left: [[x, y, z], [x, y + 1, z], [x, y + 1, z + 1], [x, y, z + 1]],
          right: [[x + 1, y, z], [x + 1, y + 1, z], [x + 1, y + 1, z + 1], [x + 1, y, z + 1]],
        };
        const suffix = { top: 'u', bottom: 'a', front: 'o', back: 'r', left: 'l', right: 'g' };
        /* Kenarlar siyah çizilir: birim küpler birbirinden ayrılsın.
           GeoGebra'da poligonun kenar rengi dolgu renginden türer, ayrı
           ayarlanamaz; bu yüzden birim küpün sınırları ayrı Segment olarak
           eklenir. İki incelik:
           - Segmentler yüzeyin **biraz dışına** taşınır (merkezden %1,2 oranında
             dışa ölçekleme). Tam aynı düzlemde kalınca poligon onları örtüyor,
             siyah çizgiler görünmüyordu.
           - Kalınlık 2: 1 kalınlık 3B görünümde tek pikselin altına düşüp
             kayboluyordu. */
        const cx = x + 0.5;
        const cy = y + 0.5;
        const cz = z + 0.5;
        const lift = 1.012;
        const out = (point) => [
          cx + (point[0] - cx) * lift,
          cy + (point[1] - cy) * lift,
          cz + (point[2] - cz) * lift,
        ];
        const edges = [];
        const seen = new Set();
        faces.forEach((face) => {
          const name = `${prefix}${suffix[face]}`;
          box.polygon3(name, corners[face]);
          box.color(name, FLAT_FACES[face]);
          box.fill(name, 1);
          box.thickness(name, 1);
          corners[face].forEach((start, index, list) => {
            const end = list[(index + 1) % list.length];
            const key = [start.join(','), end.join(',')].sort().join('|');
            if (seen.has(key)) return;
            seen.add(key);
            edges.push([out(start), out(end)]);
          });
        });
        edges.forEach(([start, end], index) => {
          const name = `${prefix}c${index + 1}`;
          box.segment(name, start[0], start[1], start[2], end[0], end[1], end[2]);
          box.color(name, EDGE_RGB);
          box.thickness(name, 2);
        });
      },
      /* Nokta işaretleri küçültülür, etiketler kapatılır: sahnede cisim görünür,
         işaret kalabalığı değil. Eksenler ve ızgara da kapanır. */
      polish() {
        names.slice().forEach((name) => {
          if (!labeled.has(name)) run(`SetLabelVisible(${name}, false)`);
          run(`SetPointSize(${name}, 1)`);
        });
        run('ShowAxes(false)');
        run('ShowGrid(false)');
      },
      caption(name, text, mode) {
        labeled.add(name);
        run(`SetCaption(${name}, ${S(text)})`);
        run(`SetLabelMode(${name}, ${f(mode === undefined ? 3 : mode)})`);
      },
      fixed(name) {
        run(`SetFixed(${name}, true)`);
      },
      text(name, text, x, y, z) {
        box.remove(name);
        box.mark(name, false);
        run(`${name} = Text(${S(text)}, ${P(x, y, z)})`);
      },
      remove(name) {
        let exists = false;
        try {
          exists = typeof api.exists === 'function' ? api.exists(name) : false;
        } catch (error) {
          exists = false;
        }
        if (!exists) return;
        try {
          api.deleteObject(name);
        } catch (error) {
          run(`Delete(${name})`);
        }
      },
      view(name) {
        run(`SetViewDirection(${VIEWS[name] || VIEWS.egik})`);
      },
      clear() {
        box.names.slice().forEach((name) => box.remove(name));
        box.names.length = 0;
        box.labeled.clear();
      },
    };
    return box;
  }

  /* ---------- dokunarak küp kurma: sütun sütun çizim ---------- */

  /* Her sütunun kendi nesne adları vardır (k<satır><sütun>…, t<satır><sütun>).
     Ad sütunu taşıdığı için tek bir sütun silinip yeniden çizilebilir; sahnenin
     tamamını yeniden kurmak gereksiz yere yüzlerce komut üretiyordu. */
  const kupKurColumns = () => [0, 1, 2, 3, 4, 5, 6, 7, 8];

  function kupKurCubes(data) {
    const source = data && Array.isArray(data.cubes) ? data.cubes : [];
    return Array.from({ length: 9 }, (_, index) => (
      Math.max(0, Math.min(3, Math.round(Number(source[index]) || 0)))
    ));
  }

  /* Tek sütun: küpler (yalnız görünen yüzler) + sütunun görünen üst yüzeyindeki
     tıklama levhası. Koordinatlar sabittir; kadraj `frame` ile kilitli. */
  function kupKurColumn(b, cubes, index) {
    const x0 = -1.5;
    const y0 = -1.5;
    const z0 = VIEW_CENTER_Z;
    const r = Math.floor(index / 3);
    const c = index % 3;
    const at = (rr, cc) => cubes[rr * 3 + cc] || 0;
    const height = at(r, c);
    for (let level = 0; level < height; level += 1) {
      const faces = [];
      if (level === height - 1) faces.push('top');
      if (level === 0) faces.push('bottom');
      if (r === 0 || at(r - 1, c) <= level) faces.push('front');
      if (r === 2 || at(r + 1, c) <= level) faces.push('back');
      if (c === 0 || at(r, c - 1) <= level) faces.push('left');
      if (c === 2 || at(r, c + 1) <= level) faces.push('right');
      /* Ad, sütunu taşır: tıklamada hangi sütuna ekleneceği buradan okunur. */
      b.flatCube(`k${r}${c}L${level}`, x0 + c, y0 + r, z0 + level, faces);
    }
    /* Her sütunun **görünen üst yüzeyi** tıklama levhasıdır.
       - Boş sütunda levha zeminde: boş kareye dokununca küp eklenir.
       - Dolu sütunda levha en üstteki küpün üst yüzünde: küpün üstüne
         dokunmak da küp ekler.
       Levha dolgusu 0,18: tamamen saydam (0,02) levhaları GeoGebra
       tıklamada güvenilir biçimde yakalamıyordu. Renk, altındaki yüzün
       rengine yakın seçilir ki siyah kenarlar örtülmesin. */
    const top = z0 + height;
    b.polygon3(`t${r}${c}`, [
      [x0 + c, y0 + r, top], [x0 + c + 1, y0 + r, top],
      [x0 + c + 1, y0 + r + 1, top], [x0 + c, y0 + r + 1, top],
    ]);
    b.color(`t${r}${c}`, height === 0 ? [246, 244, 252] : FLAT_FACES.top);
    b.fill(`t${r}${c}`, 0.18);
    /* Levhanın kenarı çizilmez: küpün siyah kenarının üstüne binmesin. */
    b.lineStyle(`t${r}${c}`, 0);
  }

  /* ---------- applet tanımları: yalnız 3B cisimler ---------- */

  const APPLETS = {
    prizma3b: {
      label: 'Prizma (3B)',
      views: true,
      params: [
        { name: 'a', label: 'Genişlik', min: 1, max: 6, step: 1, value: 4 },
        { name: 'b', label: 'Derinlik', min: 1, max: 5, step: 1, value: 2 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 5, step: 1, value: 3 },
      ],
      required: ['taban', 'ust', 'on', 'arka', 'sol', 'sag', 'birim'],
      build(b, v) {
        const a = Number(v.a);
        const b0 = Number(v.b);
        const h = Number(v.h);
        /* Cisim kadraj merkezine ortalanır: görünüm ne olursa olsun ortada kalır. */
        const x0 = -a / 2;
        const y0 = -b0 / 2;
        const z0 = VIEW_CENTER_Z - h / 2;
        b.faces(x0, y0, z0, a, b0, h);
        /* Ölçek küpü: prizmanın köşesinde duran tek birim küp. */
        b.cubeUp('birim', x0, y0, z0, 1);
        b.color('birim', COLOR.amber);
        b.fill('birim', 0.9);
      },
    },

    hacim: {
      label: 'Hacim (3B)',
      views: true,
      params: [
        { name: 'a', label: 'Taban uzunluğu', min: 1, max: 4, step: 1, value: 3 },
        { name: 'b', label: 'Taban genişliği', min: 1, max: 4, step: 1, value: 2 },
        { name: 'h', label: 'Katman sayısı', min: 1, max: 4, step: 1, value: 2 },
      ],
      required: ['taban', 'ust', 'birim'],
      build(b, v) {
        const a = Number(v.a);
        const b0 = Number(v.b);
        const h = Number(v.h);
        const x0 = -a / 2;
        const y0 = -b0 / 2;
        const z0 = VIEW_CENTER_Z - h / 2;
        b.polygon3('taban', [[x0, y0, z0], [x0 + a, y0, z0], [x0 + a, y0 + b0, z0], [x0, y0 + b0, z0]]);
        b.polygon3('ust', [[x0, y0, z0 + h], [x0 + a, y0, z0 + h], [x0 + a, y0 + b0, z0 + h], [x0, y0 + b0, z0 + h]]);
        b.color('taban', FACE_COLORS.bottom);
        b.color('ust', FACE_COLORS.top);
        b.fill('taban', 0.35);
        b.fill('ust', 0.3);
        /* Her birim küp ayrı bir nesne: öğrenci tek tek sayar, katmanı görür.
           Renkler komşu küpleri ayırır; ilk küp (birim) sarı kalır. */
        let count = 0;
        for (let level = 0; level < h; level += 1) {
          for (let j = 0; j < b0; j += 1) {
            for (let i = 0; i < a; i += 1) {
              count += 1;
              const name = count === 1 ? 'birim' : `k${count}`;
              b.cubeUp(name, x0 + i, y0 + j, z0 + level, 1);
              b.color(name, count === 1 ? COLOR.amber : cubeTint(i, j, level));
              b.fill(name, 0.92);
            }
          }
        }
      },
    },

    'birim-donusum': {
      label: 'Birim küp (3B)',
      views: true,
      params: [{ name: 's', label: 'Ayrıt (dm)', min: 1, max: 6, step: 1, value: 2 }],
      required: ['on', 'arka', 'sol', 'sag', 'taban', 'ust', 'birim'],
      build(b, v) {
        const s = Number(v.s);
        const half = s / 2;
        /* Ayrıtı s dm olan küp; içinde 1 dm³'lük birim küp köşede durur.
           Yüzler ayrı renkte; ayrıt ölçüsü yazı olarak sahnede durur. */
        b.faces(-half, -half, -half, s, s, s);
        b.cube('birim', -half, -half, -half, 1);
        b.color('birim', COLOR.amber);
        b.fill('birim', 0.85);
      },
    },

    'uc-gorunum': {
      label: 'Üç görünüm (3B)',
      views: true,
      split: true,
      params: [
        { name: 'a', label: 'Genişlik (ön görünüm)', min: 1, max: 4, step: 1, value: 3 },
        { name: 'b', label: 'Derinlik (yan görünüm)', min: 1, max: 3, step: 1, value: 2 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 3, step: 1, value: 2 },
      ],
      required: ['taban', 'ust', 'on', 'arka', 'sol', 'sag'],
      build(b, v) {
        const a = Number(v.a);
        const b0 = Number(v.b);
        const h = Number(v.h);
        const x0 = -a / 2;
        const y0 = -b0 / 2;
        const z0 = VIEW_CENTER_Z - h / 2;
        b.faces(x0, y0, z0, a, b0, h);
      },
    },

    /* Bileşik (L) cisim: bütün bloktan bir köşe prizması kesilmiş gibi düşünülür.
       Cisim birim küplerden kurulur; hacim = kalan küplerin sayısı. */
    'bilesik-hacim': {
      label: 'Bileşik cisim (3B)',
      views: true,
      params: [
        { name: 'a', label: 'Genişlik', min: 3, max: 4, step: 1, value: 4 },
        { name: 'b', label: 'Derinlik', min: 2, max: 4, step: 1, value: 3 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 3, step: 1, value: 2 },
        { name: 'k', label: 'Kesilen parça', min: 1, max: 2, step: 1, value: 2 },
      ],
      required: ['taban', 'ust', 'kesik', 'birim'],
      build(b, v) {
        const a = Number(v.a);
        const b0 = Number(v.b);
        const h = Number(v.h);
        const k = Math.max(1, Math.min(Number(v.k), a - 1));
        const x0 = -a / 2;
        const y0 = -b0 / 2;
        const z0 = VIEW_CENTER_Z - h / 2;
        const solid = (i, j) => !(i >= a - k && j >= 1);
        const at = (i, j) => [x0 + i, y0 + j];
        /* Taban ve üst: L biçimli çevre. */
        const outline = [
          at(0, 0), at(a, 0), at(a, 1), at(a - k, 1), at(a - k, b0), at(0, b0),
        ];
        b.polygon3('taban', outline.map(([x, y]) => [x, y, z0]));
        b.polygon3('ust', outline.map(([x, y]) => [x, y, z0 + h]));
        /* Kesilen parçanın yeri: zeminde boş kalan dikdörtgen. */
        b.polygon3('kesik', [
          [x0 + a - k, y0 + 1, z0], [x0 + a, y0 + 1, z0], [x0 + a, y0 + b0, z0], [x0 + a - k, y0 + b0, z0],
        ]);
        let count = 0;
        for (let level = 0; level < h; level += 1) {
          for (let j = 0; j < b0; j += 1) {
            for (let i = 0; i < a; i += 1) {
              if (!solid(i, j)) continue;
              count += 1;
              const name = count === 1 ? 'birim' : `k${count}`;
              b.cubeUp(name, x0 + i, y0 + j, z0 + level, 1);
              b.color(name, count === 1 ? COLOR.amber : cubeTint(i, j, level));
              b.fill(name, 0.92);
            }
          }
        }
        b.color('taban', FACE_COLORS.bottom);
        b.color('ust', FACE_COLORS.top);
        b.color('kesik', COLOR.gray);
        b.fill('taban', 0.16);
        b.fill('ust', 0.1);
        b.fill('kesik', 0.22);
      },
    },

    /* Döndürülebilir eş küp yapısı: yalnız 3B görünüm, görünüm düğmeleri ve
       serbest döndürme. Küpler tek tek nesnedir; öğrenci yapıyı her yönden inceler. */
    'kup-dondur': {
      label: 'Küp yapısı (döndürülebilir 3B)',
      views: true,
      clean: true,
      legend: true,
      params: [
        { name: 'sekil', label: 'Yapı (1–5)', min: 1, max: 5, step: 1, value: 1 },
      ],
      required: ['cap'],
      build(b, v) {
        const heights = rotateShape(Number(v.sekil));
        const depth = heights.length;
        const width = heights[0].length;
        const top = Math.max(1, ...heights.flat());
        /* Cisim kadrajın merkezine ortalanır (x, y = 0 ve z = VIEW_CENTER_Z). */
        const x0 = -width / 2;
        const y0 = -depth / 2;
        const z0 = VIEW_CENTER_Z - top / 2;
        /* Doğrulama çapası: gizlenen tek nokta. Küp yüzleri komşuluğa göre
           oluştuğu için sabit isim garanti değil; bu nokta her zaman vardır. */
        b.point('cap', 0, 0, z0);
        const solid = (j, i, level) => j >= 0 && j < depth && i >= 0 && i < width
          && (heights[j][i] || 0) > level;
        let count = 0;
        heights.forEach((row, j) => {
          row.forEach((height, i) => {
            for (let level = 0; level < height; level += 1) {
              count += 1;
              const faces = [];
              if (level === height - 1) faces.push('top');
              if (level === 0) faces.push('bottom');
              if (!solid(j - 1, i, level)) faces.push('front');
              if (!solid(j + 1, i, level)) faces.push('back');
              if (!solid(j, i - 1, level)) faces.push('left');
              if (!solid(j, i + 1, level)) faces.push('right');
              b.flatCube(`k${count}`, x0 + i, y0 + j, z0 + level, faces);
            }
          });
        });
      },
    },

    /* Dokunarak küp kurma: 3 × 3 taban, en çok üç kat. Her sütunun görünen üst
       yüzü (ya da ön yüzü) tıklanınca o sütuna bir küp eklenir; “sil” modunda
       bir küp eksilir. Küpler GeoGebra'nın kendi nesneleridir; öğrenci cismi
       parmağıyla döndürerek her yönden inceler, eklediği küpü yerinde görür.
       Tıklama hedefi her sütunun üst yüzüne konan saydam levhadır; böylece
       öndeki sütun arkadakini örtse bile tıklama doğru sütuna gider. */
    'kup-kur-ggb': {
      label: 'Küp kurma (3B, dokunarak)',
      views: true,
      clean: true,
      legend: true,
      interactive: true,
      /* Sütun sütun çizilir: tıklamada bütün sahne değil, yalnız değişen
         sütunlar yeniden kurulur. */
      incremental: true,
      params: [],
      required: ['cap'],
      /* Kadraj sabit: küp eklendikçe görüntü zıplamaz, cisim ortada kalır. */
      frame: { x: 1.9, y: 1.9, zMin: -0.15, zMax: 3.15 },
      build(b, v, mode, data) {
        const cubes = kupKurCubes(data);
        /* Doğrulama çapası: gizli tek nokta. */
        b.point('cap', 0, 0, VIEW_CENTER_Z);
        kupKurColumns().forEach((index) => kupKurColumn(b, cubes, index));
      },
      /* Artımlı çizim: yalnız verilen sütunlar yeniden kurulur. */
      buildColumns(b, v, mode, data, indexes) {
        const cubes = kupKurCubes(data);
        indexes.forEach((index) => kupKurColumn(b, cubes, index));
      },
      /* Bir sütunun yüksekliği değişince komşularının ona bakan yüzleri de
         değişir — ama yalnız bu sütunun yüksekliğini aşan katlarda. Komşu daha
         alçaksa hiçbir yüzü değişmez, boşuna yeniden çizilmez. */
      touch(index, before, after, data) {
        const cubes = kupKurCubes(data);
        const row = Math.floor(index / 3);
        const col = index % 3;
        const low = Math.min(Number(before) || 0, Number(after) || 0);
        const list = [index];
        const neighbours = [];
        if (row > 0) neighbours.push(index - 3);
        if (row < 2) neighbours.push(index + 3);
        if (col > 0) neighbours.push(index - 1);
        if (col < 2) neighbours.push(index + 1);
        neighbours.forEach((neighbour) => {
          if ((cubes[neighbour] || 0) > low) list.push(neighbour);
        });
        return list;
      },
    },

    /* Düzensiz küp yığını: sütun yükseklikleri desene göre değişir; ön, yan ve üst
       görünümler bu yüzden düz dikdörtgen değil, basamaklı siluetlerdir. */
    'duzensiz-yigin': {
      label: 'Düzensiz yığın (3B)',
      views: true,
      split: true,
      params: [
        { name: 'desen', label: 'Yapı', min: 1, max: 4, step: 1, value: 1 },
        { name: 'h', label: 'En yüksek sütun', min: 1, max: 3, step: 1, value: 3 },
      ],
      ortho(values) {
        return stackViewPanels(stackHeights(values));
      },
      required: ['taban', 'k1'],
      build(b, v) {
        const heights = stackHeights(v);
        const depth = heights.length;
        const width = heights[0].length;
        const top = Math.max(1, ...heights.flat());
        const x0 = -width / 2;
        const y0 = -depth / 2;
        const z0 = VIEW_CENTER_Z - top / 2;
        b.polygon3('taban', [
          [x0, y0, z0], [x0 + width, y0, z0], [x0 + width, y0 + depth, z0], [x0, y0 + depth, z0],
        ]);
        b.color('taban', FACE_COLORS.bottom);
        b.fill('taban', 0.35);
        let count = 0;
        heights.forEach((row, j) => {
          row.forEach((height, i) => {
            for (let level = 0; level < height; level += 1) {
              count += 1;
              const name = `k${count}`;
              b.cubeUp(name, x0 + i, y0 + j, z0 + level, 1);
              b.color(name, cubeTint(i, j, level));
              b.fill(name, 0.92);
            }
          });
        });
      },
    },

    acim: {
      label: 'Açınım (3B)',
      views: true,
      net: true,
      params: [
        { name: 'a', label: 'Genişlik', min: 1, max: 5, step: 1, value: 4 },
        { name: 'b', label: 'Derinlik', min: 1, max: 5, step: 1, value: 3 },
        { name: 'h', label: 'Yükseklik', min: 1, max: 5, step: 1, value: 2 },
      ],
      required: ['on', 'arka', 'sol', 'sag', 'ust', 'alt'],
      build(b, v, mode) {
        const a = Number(v.a);
        const b0 = Number(v.b);
        const h = Number(v.h);
        if (mode === 'acik') {
          /* Düz açınım: z = 0 düzleminde haç biçimi, orijine ortalanmış. */
          const cx = a;
          const cy = h / 2;
          const faces = [
            ['on', [[0, 0], [a, 0], [a, h], [0, h]], COLOR.purple],
            ['arka', [[a + b0, 0], [a + b0 + a, 0], [a + b0 + a, h], [a + b0, h]], COLOR.light],
            ['sag', [[a, 0], [a + b0, 0], [a + b0, h], [a, h]], COLOR.mint],
            ['sol', [[-b0, 0], [0, 0], [0, h], [-b0, h]], COLOR.mint],
            ['ust', [[0, h], [a, h], [a, h + b0], [0, h + b0]], COLOR.light],
            ['alt', [[0, -b0], [a, -b0], [a, 0], [0, 0]], COLOR.light],
          ];
          faces.forEach(([name, points, color]) => {
            b.polygon3(name, points.map(([x, y]) => [x - cx, y - cy, 0]));
            b.color(name, color);
            b.fill(name, 0.7);
          });
        } else {
          /* Kapalı kutu: altı yüz. */
          const x0 = -a / 2;
          const y0 = -b0 / 2;
          const z0 = VIEW_CENTER_Z - h / 2;
          b.polygon3('on', [[x0, y0, z0], [x0 + a, y0, z0], [x0 + a, y0, z0 + h], [x0, y0, z0 + h]]);
          b.polygon3('arka', [[x0, y0 + b0, z0], [x0 + a, y0 + b0, z0], [x0 + a, y0 + b0, z0 + h], [x0, y0 + b0, z0 + h]]);
          b.polygon3('sol', [[x0, y0, z0], [x0, y0 + b0, z0], [x0, y0 + b0, z0 + h], [x0, y0, z0 + h]]);
          b.polygon3('sag', [[x0 + a, y0, z0], [x0 + a, y0 + b0, z0], [x0 + a, y0 + b0, z0 + h], [x0 + a, y0, z0 + h]]);
          b.polygon3('ust', [[x0, y0, z0 + h], [x0 + a, y0, z0 + h], [x0 + a, y0 + b0, z0 + h], [x0, y0 + b0, z0 + h]]);
          b.polygon3('alt', [[x0, y0, z0], [x0 + a, y0, z0], [x0 + a, y0 + b0, z0], [x0, y0 + b0, z0]]);
          ['on', 'arka', 'sol', 'sag'].forEach((name) => {
            b.color(name, COLOR.purple);
            b.fill(name, 0.5);
          });
          ['ust', 'alt'].forEach((name) => {
            b.color(name, [168, 155, 226]);
            b.fill(name, 0.5);
          });
        }
      },
    },
  };

  /* ---------- düzensiz yığın: desen, yükseklik ve gerçek izdüşümler ---------- */

  /* Desenler 3 × 3 taban üzerinde tanımlıdır; satır 0 en öndeki sıradır.
     0 = boş kare. Seçilen en yüksek sütun değeri bütün yükseklikleri sınırlar. */
  const STACK_PATTERNS = {
    1: [[3, 2, 1], [2, 1, 1], [1, 1, 0]],
    2: [[1, 1, 1], [1, 3, 1], [0, 1, 0]],
    3: [[2, 2, 2], [0, 0, 2], [0, 0, 2]],
    4: [[2, 0, 2], [1, 0, 1], [1, 1, 1]],
  };

  function clampInt(value, min, max) {
    const number = Math.round(Number(value));
    if (!Number.isFinite(number)) return min;
    return Math.max(min, Math.min(max, number));
  }

  function stackHeights(values) {
    const source = values || {};
    const key = clampInt(source.desen === undefined ? 1 : source.desen, 1, 4);
    const cap = clampInt(source.h === undefined ? 3 : source.h, 1, 3);
    const pattern = STACK_PATTERNS[key] || STACK_PATTERNS[1];
    return pattern.map((row) => row.map((value) => Math.min(value, cap)));
  }

  /* Ön görünüm: her sütunda en yüksek küp silueti görünür.
     Yan görünüm: derinlik boyunca her sıranın en yüksek küpü.
     Üst görünüm: dolu kareler (yüksekliği 0 olan hücre boş kalır). */
  function stackViewPanels(heights) {
    const depth = heights.length;
    const width = heights[0].length;
    const top = Math.max(1, ...heights.flat());
    const front = [];
    for (let level = top; level >= 1; level -= 1) {
      const line = [];
      for (let i = 0; i < width; i += 1) line.push(heights.some((row) => row[i] >= level));
      front.push(line);
    }
    const side = [];
    for (let level = top; level >= 1; level -= 1) {
      const line = [];
      for (let j = 0; j < depth; j += 1) line.push(heights[j].some((value) => value >= level));
      side.push(line);
    }
    const plan = heights.map((row) => row.map((value) => value > 0));
    return [
      { key: 'on', title: 'Ön', cells: front, fill: '#d7ccf7' },
      { key: 'yan', title: 'Yan', cells: side, fill: '#cfe4f7' },
      { key: 'ust', title: 'Üst', cells: plan, fill: '#d5efdf' },
    ];
  }

  /* Düzgün prizmada üç görünüm de dolu dikdörtgendir. */
  function prismViewPanels(values) {
    const a = clampInt(values && values.a === undefined ? 1 : values.a, 1, 6);
    const b = clampInt(values && values.b === undefined ? 1 : values.b, 1, 5);
    const h = clampInt(values && values.h === undefined ? 1 : values.h, 1, 5);
    const full = (cols, rows) => Array.from({ length: rows }, () => Array.from({ length: cols }, () => true));
    return [
      { key: 'on', title: 'Ön', cells: full(a, h), fill: '#d7ccf7' },
      { key: 'yan', title: 'Yan', cells: full(b, h), fill: '#cfe4f7' },
      { key: 'ust', title: 'Üst', cells: full(a, b), fill: '#d5efdf' },
    ];
  }

  /* ---------- küçük dik izdüşüm panelleri (bölünmüş görünüm) ---------- */

  function orthographicSvg(values, conf) {
    const panels = conf && typeof conf.ortho === 'function'
      ? conf.ortho(values)
      : prismViewPanels(values);
    const cell = 18;
    const width = 3 * 96;
    const height = 132;
    const parts = [`<svg viewBox="0 0 ${width} ${height}" class="math-ggb-ortho" aria-hidden="true">`];
    panels.forEach((panel, index) => {
      const cells = Array.isArray(panel.cells) ? panel.cells : [];
      const rows = cells.length;
      const cols = rows ? cells[0].length : 0;
      const x0 = index * 96 + (96 - cols * cell) / 2;
      parts.push(`<rect x="${index * 96 + 4}" y="4" width="88" height="124" rx="10" fill="#fbfaff" stroke="#ded8f2"/>`);
      parts.push(`<text x="${index * 96 + 48}" y="21" text-anchor="middle" font-size="11" font-weight="800" fill="#33265f">${panel.title}</text>`);
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const filled = Boolean(cells[row][col]);
          parts.push(`<rect x="${x0 + col * cell}" y="${28 + row * cell}" width="${cell - 1.5}" height="${cell - 1.5}" rx="3" fill="${filled ? panel.fill : '#ffffff'}" stroke="${filled ? '#7056c9' : '#e6e1f6'}" stroke-width="${filled ? 0.9 : 0.7}"/>`);
        }
      }
      parts.push(`<text x="${index * 96 + 48}" y="${32 + rows * cell + 10}" text-anchor="middle" font-size="9.5" fill="#6b7a90">${cols} × ${rows} · kaç kare?</text>`);
    });
    parts.push('</svg>');
    return parts.join('');
  }

  /* ---------- yükleyici ---------- */

  function loadDeployGGB() {
    if (window.GGBApplet) return Promise.resolve(window.GGBApplet);
    if (loader) return loader;
    loader = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = CDN;
      script.async = true;
      const timer = window.setTimeout(() => reject(new Error('timeout')), LOAD_TIMEOUT);
      script.onload = () => {
        window.clearTimeout(timer);
        if (window.GGBApplet) resolve(window.GGBApplet);
        else reject(new Error('GGBApplet yok'));
      };
      script.onerror = () => {
        window.clearTimeout(timer);
        reject(new Error('ağ'));
      };
      document.head.appendChild(script);
    });
    return loader;
  }

  /* ---------- sürgü paneli ---------- */

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, (ch) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
    ));
  }

  function renderControls(controls, params, values, scope) {
    if (!controls) return;
    controls.innerHTML = params.map((param) => `<div class="scene-slider">
        <label for="scene-${scope}-${escapeHtml(param.name)}">${escapeHtml(param.label)}
          <output id="scene-out-${scope}-${escapeHtml(param.name)}">${values[param.name]}</output>
        </label>
        <input type="range" id="scene-${scope}-${escapeHtml(param.name)}" data-scene-param="${escapeHtml(param.name)}"
          min="${param.min}" max="${param.max}" step="${param.step || 1}" value="${values[param.name]}">
      </div>`).join('');
  }

  /* ---------- dışa açılan tanıtıcılar ---------- */

  function spec(type) {
    return APPLETS[type] || null;
  }

  /* Döndürülebilir yapı verisi yerel sahne motorundan gelir; iki yerde veri tutulmaz. */
  function rotateShape(index) {
    const source = window.MATEMATIK_SAHNE2;
    if (source && typeof source.yapiOfSet === 'function') {
      return source.yapiOfSet(3, Number(index) || 1);
    }
    return [[3, 1, 1], [2, 2, 1], [1, 1, 1]];
  }

  function supports(scene) {
    return Boolean(scene && APPLETS[scene.type]);
  }

  function types() {
    return Object.keys(APPLETS);
  }

  function params(type) {
    const found = spec(type);
    return found ? found.params.map((param) => ({ ...param })) : [];
  }

  function paramsOf(scene) {
    const found = spec(scene && scene.type);
    if (!found) return [];
    if (scene.params && scene.params.length) {
      return scene.params.map((param) => {
        const base = found.params.find((item) => item.name === param.name) || {};
        return {
          name: param.name,
          label: param.label || base.label || param.name,
          min: Number(param.min),
          max: Number(param.max),
          step: Number(param.step) || 1,
          value: Number(param.value),
        };
      });
    }
    return found.params.map((param) => ({ ...param }));
  }

  /* Applet çerçevesini sadeleştirir: cebir paneli, araç çubuğu ve giriş alanı
     kapatılır; yalnız 3B görünüm kalır. API sürümüne göre sessizce atlanır. */
  /* Eksenler ve ızgara kapatılır. DİKKAT: `setAxesVisible(false, false, false)`
     çağrısı GeoGebra'da **hiçbir şey yapmaz** — üç argümanlı sürüm dört
     argümanlıya düşer ve ilk argümanı görünüm numarası sanar (`view = 0` →
     geçersiz, sessizce döner). 3B görünümün numarası **-1**'dir. Kapatılmadığı
     için sahnede ortadan geçen dikey z ekseni görünüyordu. */
  function hideAxes(target) {
    if (!target) return;
    /* Sıra önemli: önce eksen bayrağı, sonra somut nesneler.
       `ShowAxes` bazı sürümlerde yalnız eksen çizgisini kapatıp **ok başını**
       bırakıyor; ortada aşağı bakan ok olarak görünen şey buydu. Eksen
       nesneleri tek tek görünmez yapılıyor, ardından 3B görünüm için
       SetVisibleInView(-1) ile de kapatılıyor. */
    try { target.setAxesVisible(-1, false, false, false); } catch (error) { /* eski sürüm */ }
    ['xAxis', 'yAxis', 'zAxis', 'xOyPlane', 'xOzPlane', 'yOzPlane'].forEach((name) => {
      try { target.setVisible(name, false); } catch (error) { /* yok say */ }
      try { target.evalCommand(`SetVisibleInView(${name}, -1, false)`); } catch (error) { /* yok say */ }
      try { target.evalCommand(`SetVisibleInView(${name}, 1, false)`); } catch (error) { /* yok say */ }
    });
    try { target.evalCommand('ShowAxes(false, false, false)'); } catch (error) { /* yok say */ }
    try { target.evalCommand('ShowAxes(false)'); } catch (error) { /* yok say */ }
    try { target.setGridVisible && target.setGridVisible(false); } catch (error) { /* yok say */ }
  }

  /* Eksenler kimi zaman çizimden hemen sonra geri gelir (GeoGebra görünümü
     yeniden kurar). Kapatma birkaç kez tazelenir; ucuz bir işlemdir. */
  function hideAxesLater(target, delays) {
    (delays || [120, 420, 900]).forEach((delay) => {
      window.setTimeout(() => { try { hideAxes(target); } catch (error) { /* yok say */ } }, delay);
    });
  }

  function stripChrome(target) {
    const attempts = [
      () => target.setPerspective && target.setPerspective('T'),
      () => target.setPerspective && target.setPerspective('-A'),
      () => target.evalCommand && target.evalCommand('SetPerspective("T")'),
      () => target.evalCommand && target.evalCommand('SetPerspective("-A")'),
      () => hideAxes(target),
    ];
    attempts.forEach((attempt) => {
      try {
        attempt();
      } catch (error) {
        /* sürüm desteklemiyorsa görünüm olduğu gibi kalır */
      }
    });
  }

  /* Sade 3B görünüm: cisim dışında hiçbir şey görünmez.
     - Küp komutlarının ürettiği köşe noktaları (A, B, C…) gizlenir.
     - İstenmeyen etiketler kapatılır, çizgi kalınlığı tek kalem inceliğinde kalır.
     - z = 0 düzlemindeki yatay zemin ve eksenler kapatılır. */
  function quietScene(box) {
    const api = box && box.api;
    if (!api) return;
    const labeled = box.labeled || new Set();
    let names = [];
    try {
      names = typeof api.getAllObjectNames === 'function' ? api.getAllObjectNames() : [];
    } catch (error) {
      names = [];
    }
    names.forEach((name) => {
      let type = '';
      try {
        type = typeof api.getObjectType === 'function' ? api.getObjectType(name) : '';
      } catch (error) {
        type = '';
      }
      if (type === 'point') {
        try { api.setVisible(name, false); } catch (error) { /* yok say */ }
        return;
      }
      if (!labeled.has(name)) {
        try { api.setLabelVisible(name, false); } catch (error) { /* yok say */ }
      }
      try { api.setLineThickness(name, 1); } catch (error) { /* yok say */ }
    });
    /* Yatay zemin düzlemi ve eksenler: cismin altında gri bir levha görünmesin.
       3B görünümün numarası -1'dir; 1 verilirse düzlem görünür kalır. */
    hideAxes(api);
  }

  /* Cisim kadraja ortalanır. GeoGebra 3B görünümünün merkezi orijin değil
     (z = ZZERO_SCENE_STANDARD = -1.5); ayrıca döndürme her zaman bu merkezin
     çevresinde olur. Bu yüzden cisim, çizilen nesnelerin sınır kutusunun
     merkezine taşınır: `setCoordSystem` görünümün sıfırını ve ölçeğini
     kutunun merkezine oturtur. Böylece öğrenci cismi çevirdikçe de ortada kalır.
     Kutu bir miktar genişletilir ki cisim kenarlara yapışmasın. */
  function frameView(api, box, conf) {
    if (!api || typeof api.setCoordSystem !== 'function') return;
    /* Dokunarak kurulan sahnede kadraj sabittir: her küp eklendiğinde cisim
       yeniden çerçevelenirse görüntü zıplar. Kutu 3 × 3 × 3 hacmin tamamıdır. */
    const fixed = conf && conf.frame;
    const bounds = fixed
      ? {
        minX: -fixed.x,
        maxX: fixed.x,
        minY: -fixed.y,
        maxY: fixed.y,
        minZ: VIEW_CENTER_Z + fixed.zMin,
        maxZ: VIEW_CENTER_Z + fixed.zMax,
      }
      : (box && typeof box.bounds === 'function' ? box.bounds() : null);
    if (!bounds) return;
    const span = Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY, bounds.maxZ - bounds.minZ, 1);
    /* Sabit kadrajda pay zaten verilmiş: ikinci kez genişletilirse cisim küçülür.
       Öteki cisimlerde döndürme payı eklenir ki çevirirken kenardan taşmasın. */
    const pad = fixed ? 0 : span * 0.2 + 0.2;
    try {
      api.setCoordSystem(
        bounds.minX - pad, bounds.maxX + pad,
        bounds.minY - pad, bounds.maxY + pad,
        bounds.minZ - pad, bounds.maxZ + pad,
        false,
      );
    } catch (error) {
      /* oturtma desteklenmiyorsa GeoGebra'nın kendi kadrajı kalır */
    }
    /* Kadraj ayarı eksenleri geri getirebilir: kapatmayı burada tazeliyoruz. */
    hideAxes(api);
  }

  function applyLabels(box) {
    if (!box || !box.api || typeof box.api.setLabelVisible !== 'function') return;
    box.names.forEach((name) => {
      try {
        box.api.setLabelVisible(name, box.labeled.has(name));
      } catch (error) {
        /* etiket ayarı başarısızsa varsayılan kalır */
      }
    });
  }

  /* ---------- ana giriş ---------- */

  function mount(host, controls, scene, options) {
    if (!host || !scene || !APPLETS[scene.type]) return null;
    if (loadFailed) return null;
    const conf = APPLETS[scene.type];
    const settings = options || {};
    const fallback = typeof settings.fallback === 'function' ? settings.fallback : function () {};
    const status = typeof settings.onStatus === 'function' ? settings.onStatus : function () {};
    uid += 1;
    const scope = `ggb${uid}`;
    const params = paramsOf(scene);
    const values = {};
    params.forEach((param) => { values[param.name] = param.value; });
    let mode = conf.net ? 'kapali' : '';
    /* Dokunarak kurulan appletlerde durum JS'te tutulur: kaç sütunda kaç kat
       olduğu ve ekleme/silme modu. Her tıklamada cisim yeniden kurulur. */
    const data = conf.interactive ? {
      cubes: Array.from({ length: 9 }, (_, index) => {
        const source = settings.cubes;
        return Math.max(0, Math.min(3, Math.round(Number(source && source[index]) || 0)));
      }),
      mod: Number(settings.mod) === 0 ? 0 : 1,
    } : null;
    const onCubes = typeof settings.onCubes === 'function' ? settings.onCubes : function () {};
    /* Artımlı çizim: her sütunun nesne adları tutulur. Tıklamada yalnız
       değişen sütunlar silinip yeniden çizilir; kadraj, eksen temizliği ve
       etiket taraması tekrar çalışmaz. */
    const incremental = Boolean(conf.incremental && typeof conf.buildColumns === 'function');
    const columnNames = new Map();
    const dirtyColumns = new Set();
    let patchTimer = null;

    let api = null;
    let box = null;
    let done = false;
    let destroyed = false;
    let buildTimer = null;
    let observer = null;

    /* Kaplama: applet gelince kaldırılır, üstte boş şerit bırakmaz. */
    host.innerHTML = `<div class="math-ggb-shell${conf.split ? ' is-split' : ''}">
      <div class="math-ggb-canvas" id="ggb-${scope}"></div>
      <div class="math-ggb-loading">GeoGebra hazırlanıyor… <span>Üç boyutlu cisim yükleniyor.</span></div>
      ${conf.split ? '<div class="math-ggb-views" aria-hidden="true"></div>' : ''}
      <div class="math-ggb-bar">
        ${VIEW_LABELS.map(([key, label]) => `<button type="button" data-ggb-view="${key}"${key === 'egik' ? ' class="is-active"' : ''}>${label}</button>`).join('')}
        ${conf.net ? '<button type="button" data-ggb-net="1">Açınımı aç</button>' : ''}
      </div>
      ${conf.legend ? `<p class="math-ggb-legend">${FACE_LEGEND.map(([label, color]) => `<span><i style="background:${color}"></i>${label}</span>`).join('')}</p>` : ''}
    </div>`;
    const canvas = host.querySelector('.math-ggb-canvas');
    const loading = host.querySelector('.math-ggb-loading');
    const viewsHost = host.querySelector('.math-ggb-views');
    const bar = host.querySelector('.math-ggb-bar');
    renderControls(controls, params, values, scope);
    if (viewsHost) viewsHost.innerHTML = orthographicSvg(values, conf);
    status('GeoGebra hazırlanıyor…');

    /* Tıklanan nesnenin adından sütun okunur:
       `k<satır><sütun>L<kat><yüz>` küp yüzü, `t<satır><sütun>` tıklama levhası. */
    function columnOf(name) {
      const label = String(name || '');
      const plate = /^t([0-2])([0-2])$/.exec(label);
      if (plate) return Number(plate[1]) * 3 + Number(plate[2]);
      const cube = /^k([0-2])([0-2])L([0-3])/.exec(label);
      if (cube) return Number(cube[1]) * 3 + Number(cube[2]);
      return -1;
    }

    function onCubeClick(name) {
      if (!data || destroyed) return;
      const index = columnOf(name);
      if (index < 0) return;
      const current = Number(data.cubes[index]) || 0;
      const next = data.mod === 0 ? Math.max(0, current - 1) : Math.min(3, current + 1);
      /* Sınıra dayanmış sütunda değişiklik yok: boşuna yeniden çizim yapılmaz. */
      if (next === current) {
        status(data.mod === 0
          ? 'Bu sütunda küp yok: silinecek bir şey kalmadı.'
          : 'Bu sütun üç katına ulaştı; daha yükseğe küp eklenemez.');
        return;
      }
      data.cubes[index] = next;
      /* Sayaç hemen güncellenir; cisim bir sonraki karede çizilir. */
      try { onCubes(data.cubes.slice()); } catch (error) { /* geri çağrı hatası sahneyi durdurmaz */ }
      status(`${Math.floor(index / 3) + 1}. sıra ${(index % 3) + 1}. sütun: ${data.cubes[index]} kat.`);
      if (incremental) {
        /* İlk çizim bitmeden gelen dokunuş yok sayılır: veri zaten tazelenir,
           çizim ilk kurulumda bu veriyle yapılır. */
        if (done) {
          const dirty = typeof conf.touch === 'function'
            ? conf.touch(index, current, data.cubes[index], data)
            : [index];
          schedulePatch(dirty);
        }
        return;
      }
      rebuild();
    }

    /* GeoGebra tıklama dinleyicisi global bir işlev adı ister. */
    function registerClick() {
      if (!data || !api || typeof api.registerClickListener !== 'function') return;
      const handler = `ggbKupClick_${scope}`;
      window[handler] = (name) => { onCubeClick(name); };
      try { api.registerClickListener(handler); } catch (error) { /* sürüm desteklemiyorsa sessiz geç */ }
    }

    function hideLoading() {
      if (loading) loading.hidden = true;
      host.classList.add('is-ready');
    }

    function fail(message) {
      if (done || destroyed) return;
      done = true;
      if (buildTimer) window.clearTimeout(buildTimer);
      if (observer) observer.disconnect();
      host.innerHTML = '';
      host.classList.remove('is-ready');
      if (controls) controls.innerHTML = '';
      status(message);
      fallback(message);
    }

    function verify() {
      if (!api) return false;
      const total = typeof api.getObjectNumber === 'function' ? api.getObjectNumber() : 0;
      const missing = conf.required.filter((label) => (
        typeof api.exists === 'function' ? !api.exists(label) : true
      ));
      return total >= conf.required.length && missing.length === 0;
    }

    /* Nesne adından sütun numarası: `k<satır><sütun>L<kat>…` ve `t<satır><sütun>`.
       Başka adlar (ör. `cap`) sütuna bağlı değildir. */
    function columnOfName(name) {
      const match = /^[kt]([0-2])([0-2])/.exec(String(name || ''));
      return match ? Number(match[1]) * 3 + Number(match[2]) : -1;
    }

    function collectColumns(names) {
      columnNames.clear();
      names.forEach((name) => {
        const index = columnOfName(name);
        if (index < 0) return;
        if (!columnNames.has(index)) columnNames.set(index, []);
        columnNames.get(index).push(name);
      });
    }

    /* Çizim sırasında yeniden boyama kapatılır: her komutta bütün 3B görünüm
       yeniden çizilmesin. Tek bir açma/kapama, onlarca çizimi tek kareye indirir. */
    function withPaintingPaused(task) {
      let paused = false;
      if (api && typeof api.setRepaintingActive === 'function') {
        try { api.setRepaintingActive(false); paused = true; } catch (error) { paused = false; }
      }
      try {
        task();
      } finally {
        if (paused) {
          try { api.setRepaintingActive(true); } catch (error) { /* yok say */ }
        }
      }
    }

    function dropColumn(index) {
      (columnNames.get(index) || []).forEach((name) => {
        try {
          if (typeof api.deleteObject === 'function') api.deleteObject(name);
          else api.evalCommand(`Delete(${name})`);
        } catch (error) {
          /* nesne zaten yoksa sessiz geç */
        }
      });
      columnNames.set(index, []);
    }

    /* Yalnız verilen sütunları yeniden çiz. */
    function patchColumns(indexes) {
      if (!api || destroyed) return;
      const unique = Array.from(new Set(indexes)).filter((index) => index >= 0 && index <= 8);
      if (!unique.length) return;
      withPaintingPaused(() => {
        unique.forEach(dropColumn);
        const patch = builder(api);
        conf.buildColumns(patch, values, mode, data, unique);
        patch.names.forEach((name) => {
          const index = columnOfName(name);
          if (index < 0) return;
          if (!columnNames.has(index)) columnNames.set(index, []);
          columnNames.get(index).push(name);
          try { api.setLabelVisible(name, false); } catch (error) { /* yok say */ }
        });
      });
    }

    /* Hızlı art arda dokunuşlarda tek karede bir çizim: her dokunuş için ayrı
       tam çizim yapılırsa kuyruk birikir ve sahne donar. */
    function schedulePatch(indexes) {
      indexes.forEach((index) => dirtyColumns.add(index));
      if (patchTimer != null) return;
      const run = () => {
        patchTimer = null;
        const list = Array.from(dirtyColumns);
        dirtyColumns.clear();
        patchColumns(list);
      };
      if (typeof window.requestAnimationFrame === 'function') {
        patchTimer = window.requestAnimationFrame(run);
      } else {
        patchTimer = window.setTimeout(run, 16);
      }
    }

    function rebuild() {
      if (!api) return;
      /* Tam çizim bekleyen artımlı işi geçersiz kılar. */
      if (patchTimer != null) {
        if (typeof window.cancelAnimationFrame === 'function') window.cancelAnimationFrame(patchTimer);
        window.clearTimeout(patchTimer);
        patchTimer = null;
      }
      dirtyColumns.clear();
      if (box) box.clear();
      withPaintingPaused(() => {
        box = builder(api);
        conf.build(box, values, mode, data);
      });
      if (incremental) collectColumns(box.names);
      applyLabels(box);
      /* Nokta/etiket kalabalığı ve eksenler kapatılır: cisim öne çıkar.
         Bu tarama bütün nesneleri gezer; artık yalnız ilk çizimde çalışır. */
      if (typeof box.polish === 'function') box.polish();
      if (conf.clean) quietScene(box);
      /* Kadraj yalnız 3B appletlerde ortalanır; 2B çizimler kendi ölçeğini korur. */
      if (conf.clean || conf.views) frameView(api, box, conf);
      /* Kadraj/çizim sonrası eksenler geri gelebilir: tazele. */
      hideAxesLater(api);
    }

    function build(attempt) {
      if (done || destroyed || !api) return;
      const delay = BUILD_DELAYS[Math.min(attempt, BUILD_DELAYS.length - 1)];
      buildTimer = window.setTimeout(() => {
        if (done || destroyed) return;
        try {
          hideAxes(api);
          rebuild();
          box.view('egik');
        } catch (error) {
          /* komut hatası aşağıdaki doğrulamada yakalanır */
        }
        if (verify()) {
          done = true;
          /* Varsayılan bakış: yukarıdan eğik. Öğrenci isterse döndürür. */
          if (box) box.view('egik');
          hideLoading();
          if (observer) observer.disconnect();
          const count = typeof api.getObjectNumber === 'function' ? api.getObjectNumber() : conf.required.length;
          status(`GeoGebra hazır · ${count} nesne · cismi parmağınla döndürebilirsin.`);
          window.setTimeout(() => {
            if (destroyed || !api) return;
            try {
              if (typeof api.setSize === 'function') {
                api.setSize(
                  Math.max(300, Math.round(canvas.clientWidth || 340)),
                  Math.max(300, Math.round(canvas.clientHeight || 340)),
                );
              }
            } catch (error) {
              /* oturtma başarısızsa mevcut görünüm kalır */
            }
          }, 400);
          return;
        }
        if (attempt + 1 < BUILD_DELAYS.length) {
          build(attempt + 1);
          return;
        }
        fail('GeoGebra çizimi oluşturamadı; yerel çizim gösteriliyor.');
      }, delay);
    }

    function syncFromControls() {
      params.forEach((param) => {
        const input = controls ? controls.querySelector(`[data-scene-param="${param.name}"]`) : null;
        const out = controls ? controls.querySelector(`#scene-out-${scope}-${param.name}`) : null;
        if (!input) return;
        values[param.name] = Number(input.value);
        if (out) out.textContent = String(values[param.name]);
      });
      if (viewsHost) viewsHost.innerHTML = orthographicSvg(values, conf);
      if (!api) return;
      params.forEach((param) => {
        try {
          api.setValue(param.name, values[param.name]);
        } catch (error) {
          /* nesne henüz yoksa sessiz geç */
        }
      });
      rebuild();
      if (done) status('GeoGebra hazır · sürgüler cismi güncelliyor.');
    }

    if (controls) {
      controls.addEventListener('input', (event) => {
        if (event.target && event.target.matches('[data-scene-param]')) syncFromControls();
      });
    }

    if (bar) {
      bar.addEventListener('click', (event) => {
        const view = event.target.closest('[data-ggb-view]');
        if (view) {
          bar.querySelectorAll('[data-ggb-view]').forEach((node) => node.classList.remove('is-active'));
          view.classList.add('is-active');
          if (box) box.view(view.getAttribute('data-ggb-view'));
          return;
        }
        const net = event.target.closest('[data-ggb-net]');
        if (net) {
          mode = mode === 'acik' ? 'kapali' : 'acik';
          net.textContent = mode === 'acik' ? 'Kutuyu kapat' : 'Açınımı aç';
          if (api) {
            rebuild();
            if (box) box.view(mode === 'acik' ? 'ust' : 'egik');
            status(mode === 'acik'
              ? 'Açınım açık: altı yüzü tek düzlemde say.'
              : 'Kutu kapalı: yüzleri karşılıklı eşle.');
          }
        }
      });
    }

    /* Dokunma ile açınım: sürükleme (döndürme) ile karışmasın diye hareket eşiği var. */
    if (conf.net && canvas) {
      let start = null;
      canvas.addEventListener('pointerdown', (event) => {
        start = { x: event.clientX, y: event.clientY };
      });
      canvas.addEventListener('pointerup', (event) => {
        if (!start) return;
        const moved = Math.hypot(event.clientX - start.x, event.clientY - start.y);
        start = null;
        if (moved > 12 || !api || !box) return;
        mode = mode === 'acik' ? 'kapali' : 'acik';
        const net = bar ? bar.querySelector('[data-ggb-net]') : null;
        if (net) net.textContent = mode === 'acik' ? 'Kutuyu kapat' : 'Açınımı aç';
        rebuild();
        box.view(mode === 'acik' ? 'ust' : 'egik');
        status(mode === 'acik' ? 'Açınım açık.' : 'Kutu kapalı.');
      });
    }

    loadDeployGGB().then((GGBApplet) => {
      if (destroyed) return;
      const width = Math.max(300, Math.round(canvas.clientWidth || host.clientWidth || 340));
      const height = Math.max(300, Math.round(canvas.clientHeight || 340));
      const appletParams = {
        appName: '3d',
        language: 'en',
        width,
        height,
        showMenuBar: false,
        showToolBar: false,
        showToolBarHelp: false,
        showAlgebraInput: false,
        showResetIcon: false,
        showZoomButtons: false,
        showFullscreenButton: false,
        allowStyleBar: false,
        enableRightClick: false,
        enableLabelDrags: false,
        enableShiftDragZoom: true,
        errorDialogsActive: false,
        showLogging: false,
        borderColor: '#ded8f2',
        perspective: 'T',
        appletOnLoad(nextApi) {
          api = nextApi;
          if (destroyed) return;
          /* Yalnız 3B görünüm kalsın: soldaki cebir/nesne paneli (points, sliders
             listesi) kalabalık yapıyordu; referans materyalde de yalnız cisim var. */
          stripChrome(api);
          registerClick();
          build(0);
          if (typeof window.ResizeObserver === 'function') {
            let debounce = null;
            let lastSize = `${width}x${height}`;
            observer = new window.ResizeObserver(() => {
              if (debounce) window.clearTimeout(debounce);
              debounce = window.setTimeout(() => {
                if (!api || destroyed || typeof api.setSize !== 'function') return;
                const w = Math.max(300, Math.round(canvas.clientWidth || width));
                const h = Math.max(300, Math.round(canvas.clientHeight || height));
                /* Ölçü değişmediyse yeniden boyutlandırma yok: setSize kutuyu
                   büyütüp yeniden tetikleyerek sonsuz döngü (donma) yapmasın. */
                const size = `${w}x${h}`;
                if (size === lastSize) return;
                lastSize = size;
                observer.disconnect();
                try {
                  api.setSize(w, h);
                } catch (error) {
                  /* ölçü değişimi başarısızsa mevcut boyut kalır */
                }
                window.setTimeout(() => {
                  if (!destroyed && observer) observer.observe(canvas);
                }, 300);
              }, 250);
            });
            observer.observe(canvas);
          }
        },
      };
      try {
        const applet = new GGBApplet(appletParams, true);
        applet.inject(canvas.id);
        /* Bekçi: applet hiç açılmazsa ekran “hazırlanıyor” yazısında kilitli
           kalmasın; süre dolunca durum yazılır ve yerel çizim gösterilir. */
        window.setTimeout(() => {
          if (destroyed || done || api) return;
          fail('GeoGebra açılmadı; yerel çizim gösteriliyor.');
        }, LOAD_TIMEOUT + 6000);
      } catch (error) {
        fail('GeoGebra başlatılamadı; yerel çizim gösteriliyor.');
      }
    }).catch(() => {
      loadFailed = true;
      fail('GeoGebra yüklenemedi (çevrimdışı ya da ağ engeli); yerel çizim gösteriliyor.');
    });

    return {
      engine: 'geogebra',
      state: values,
      mode: () => mode,
      /* Dokunarak kurma: sütun yükseklikleri ve mod. */
      cubes: () => (data ? data.cubes.slice() : []),
      setMod(value) { if (data) data.mod = Number(value) === 0 ? 0 : 1; },
      /* Dışarıdan (şekil düğmeleri) değer değiştirme: sürgüyle aynı yolu kullanır. */
      set(name, value) {
        if (data && name === 'mod') {
          data.mod = Number(value) === 0 ? 0 : 1;
          return;
        }
        if (data && name === 'cubes') {
          const list = Array.isArray(value) ? value : [];
          data.cubes = Array.from({ length: 9 }, (_, index) => Math.max(0, Math.min(3, Math.round(Number(list[index]) || 0))));
          /* “Temizle” gibi toplu değişimlerde de tam yeniden kurulum yerine
             sütun tazeleme yolu kullanılır: eksen/etiket taraması tekrar etmez. */
          if (api && incremental && done) schedulePatch([0, 1, 2, 3, 4, 5, 6, 7, 8]);
          else if (api) rebuild();
          return;
        }
        if (!(name in values)) return;
        values[name] = Number(value);
        const input = controls ? controls.querySelector(`[data-scene-param="${name}"]`) : null;
        const out = controls ? controls.querySelector(`#scene-out-${scope}-${name}`) : null;
        if (input) input.value = String(values[name]);
        if (out) out.textContent = String(values[name]);
        if (viewsHost) viewsHost.innerHTML = orthographicSvg(values, conf);
        if (!api) return;
        try {
          api.setValue(name, values[name]);
        } catch (error) {
          /* nesne henüz yoksa sessiz geç */
        }
        rebuild();
      },
      reset() {
        params.forEach((param) => { values[param.name] = param.value; });
        mode = conf.net ? 'kapali' : '';
        renderControls(controls, params, values, scope);
        if (viewsHost) viewsHost.innerHTML = orthographicSvg(values, conf);
        const net = bar ? bar.querySelector('[data-ggb-net]') : null;
        if (net) net.textContent = 'Açınımı aç';
        if (api) {
          params.forEach((param) => {
            try {
              api.setValue(param.name, values[param.name]);
            } catch (error) {
              /* yok say */
            }
          });
          rebuild();
          if (box) box.view('egik');
        }
      },
      destroy() {
        destroyed = true;
        done = true;
        if (buildTimer) window.clearTimeout(buildTimer);
        if (patchTimer != null) {
          if (typeof window.cancelAnimationFrame === 'function') window.cancelAnimationFrame(patchTimer);
          window.clearTimeout(patchTimer);
          patchTimer = null;
        }
        if (observer) observer.disconnect();
        host.innerHTML = '';
        host.classList.remove('is-ready');
      },
    };
  }

  /* Denetimler için: üretilen GeoGebra komutlarını DOM olmadan döndürür. */
  function script(type, values, mode) {
    const conf = APPLETS[type];
    if (!conf) return [];
    const commands = [];
    const record = (command) => { commands.push(command); };
    const fake = {
      evalCommand: record,
      setColor() {},
      exists: () => false,
      deleteObject(name) { record(`Delete(${name})`); },
    };
    const state = {};
    conf.params.forEach((param) => {
      const raw = values && values[param.name];
      state[param.name] = Number(raw === undefined ? param.value : raw);
    });
    if (typeof conf.normalize === 'function') conf.normalize(state);
    const box = builder(fake);
    const data = conf.interactive ? { cubes: Array(9).fill(0), mod: 1 } : null;
    conf.build(box, state, mode || (conf.net ? 'kapali' : ''), data);
    if (typeof box.polish === 'function') box.polish();
    return commands;
  }

  window.MATEMATIK_GEOGEBRA = Object.freeze({
    mount,
    supports,
    types,
    params,
    paramsOf,
    script,
    required: (type) => (APPLETS[type] ? APPLETS[type].required.slice() : []),
    label: (type) => (APPLETS[type] ? APPLETS[type].label : ''),
    hasNet: (type) => Boolean(APPLETS[type] && APPLETS[type].net),
    interactive: (type) => Boolean(APPLETS[type] && APPLETS[type].interactive),
    hasSplit: (type) => Boolean(APPLETS[type] && APPLETS[type].split),
    prefers,
    setPrefers,
    cdn: CDN,
  });
})();
