# GeoGebra kaynakları — konu başlığı eşlemesi

**Tarih:** 27 Ekim 2026 · **Kapsam:** Matematik, geometri haftaları (h8–h11, h14)

Bu belge, GeoGebra'nın resmî "Math Resources" sayfalarındaki konu başlıklarını bizim hafta
planımıza eşler. Kaynak sayfalar yalnız **konu başlığı ve pedagojik yaklaşım** için okunmuştur;
uygulama (applet) bizimdir, gömme yapılmaz. GeoGebra sahneleri **yalnız üç boyutlu cisimlerde**
kullanılır; iki boyutlu anlatımlar birinci taraf SVG motoruyla çizilir.

## 1. Okunan kaynak sayfalar

| Sayfa | Adres | Bizim için çıkan başlıklar |
|---|---|---|
| Volume | https://www.geogebra.org/math/volume | *Volume of a Cube and Cubic Units*: **Composing Prisms by Stacking Cubes**, **Calculating Volume with Invisible Cubes** · *Volume of Composite Figures*: **Calculating the Volume of Composite Solids**, **Finding Composite Volume Word Problems** · *Finding Volume with Base and Height*: **Volumes of Rectangular Prisms** |
| Solids | https://www.geogebra.org/math/solids | *Nets of Solids*: **Unfolding Shapes in 3D**, **Unfolding Prisms** · *Cross Sections of Solids*: **Making Cross Sections of a Prism** |
| Symmetry | https://www.geogebra.org/math/symmetry | *Lines of Symmetry*: **Visualizing Lines of Symmetry**, **Symmetric Patterns in Nature**, **Drawing Symmetrical Polygons** |

## 2. Eşleme tablosu

| GeoGebra başlığı | Hafta / bölüm | Bizim karşılığımız | Sahne türü |
|---|---|---|---|
| Volume of a Cube and Cubic Units — *Composing Prisms by Stacking Cubes* | h10 ÖĞRENELİM (Hacim) | Her birim küp ayrı nesne; ön sıradakiler numaralı, katman katman sayma | `hacim` (GeoGebra 3B + yerel yedek) |
| *Calculating Volume with Invisible Cubes* | h8 ÖĞRENELİM (Gizli küp) | Arkada kalan küplerin görünmediği düzensiz yığın; üç görünüm = gerçek siluet | `duzensiz-yigin` (bölünmüş GeoGebra) |
| *Volume of Composite Figures* — *Calculating the Volume of Composite Solids* | h10 KATIL-UYGULA-KEŞFET | Bütün bloktan kesilen köşe prizması; hacim = bütün − kesilen, küpler tek tek görünür | `bilesik-hacim` (GeoGebra 3B + yerel yedek) |
| *Finding Composite Volume Word Problems* | h10 UYGULAYALIM | 18 eş küple prizma kurma + bileşik cisim problemi | `prizma3b` (sorunun kendi sahnesi) |
| *Unfolding Prisms* / *Unfolding Shapes in 3D* | h9 KATIL-UYGULA-KEŞFET · ÖĞRENELİM | Kapalı kutu ↔ haç biçiminde açınım; dokunmayla açılır | `acim` (GeoGebra 3B + yerel yedek) |
| *Volumes of Rectangular Prisms* | h8 ÖĞRENELİM (Prizma) · h10 UYGULAYALIM | Yüz–ayrıt–köşe, dik izdüşüm düğmeleri | `prizma3b` |
| *Lines of Symmetry* — *Visualizing Lines of Symmetry* | h14 ÖĞRENELİM | Ayna doğrusu 15° adımlarla döner; görüntü şeklin üstüne oturduğunda o açı bir simetri doğrusudur | `simetri-dogru` (yerel SVG; 2B olduğu için GeoGebra kullanılmaz) |
| Ön · yan · üst görünüm (Solids / görünüm konusu) | h8 ÖĞRENELİM (Görünüm eşleşmesi) | Düzgün prizmada üç görünüm dolu dikdörtgen; **düzensiz yığında basamaklı siluet** | `uc-gorunum` ve `duzensiz-yigin` (bölünmüş GeoGebra) |

## 3. Hafta bazında sahne dağılımı

| Hafta | Konu | ÖĞRENELİM (her bilgi kutusu için) | KATIL-UYGULA-KEŞFET |
|---|---|---|---|
| h8 | Cisimlerin farklı yönlerden görünümleri | 1) `prizma3b` · 2) `uc-gorunum` · 3) `duzensiz-yigin` | `hacim` (numaralı birim küpler) |
| h9 | Açınım ve yüzey alanı | 1) `acim-cizim` şekli · 2) `birim-kup` şekli · 3) `prizma` şekli | `acim` |
| h10 | Hacim: eş nesneler ve bağıntı | 1) `hacim` · 2) `birim-kup` şekli · 3) `katman` şekli | `bilesik-hacim` |
| h11 | Hacim ölçme birimleri | 1) `birim-merdiven` şekli · 2) `litre-kup` şekli · 3) `duzensiz-yigin` | `birim-donusum` |
| h14 | Yansıma ve simetri | 1) `simetri-dogrusu` şekli · 2) `yansima` şekli · 3) metin · 4) `simetri-dogru` sahnesi | `yansima` |

Kural: **aynı haftada aynı sahne türü iki kez kullanılmaz**; her bilgi kutusunun kendi bloğu,
kendi görseli ve en az bir kontrol sorusu vardır. Denetim: `scripts/check-matematik-content.js`
(4e/4f bölümleri).

## 4. Uygulama notları

- GeoGebra applet sayısı **7**: `prizma3b`, `hacim`, `birim-donusum`, `uc-gorunum`,
  `bilesik-hacim`, `duzensiz-yigin`, `acim`. Hepsinin yerel SVG yedeği vardır.
- Bölünmüş görünüm (`uc-gorunum`, `duzensiz-yigin`): solda döndürülebilir 3B cisim, sağda
  ön/yan/üst dik izdüşümleri. Düzensiz yığında izdüşümler yükseklik tablosundan üretilir;
  boş kareler beyaz kalır, siluet basamaklı görünür.
- Birim küpler `Cube(A, B, Vector((0,0,1)))` ile z eksenine oturtulur: ızgara kaymaz,
  komşu küpler birbirine değer. Her küp ayrı nesnedir; öğrenci tek tek sayabilir.
- Lisans: GeoGebra ticari olmayan kullanım; atıf sahnede ve `THIRD-PARTY-NOTICES.md` içinde.
