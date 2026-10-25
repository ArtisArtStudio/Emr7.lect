# EMR7LECT — İçerik ve Geliştirme Standartları

> Bu dosya yeni bir sohbete devir teslim dosyasıdır. Bir ajan bu depoda çalışmaya başladığında
> **önce bu dosyayı**, sonra `README.md` ve `docs/` klasörünü okur.
> Son güncelleme: 21 Ekim 2026 · Fen Bilimleri kavram sözlüğü yayınlandı (PR #7 sonrası).

---

## 0. Yeni sohbete başlangıç

Kopyala-yapıştır:

```
/EMR7LECT-STANDARTLAR.md dosyasını oku ve bu standartlara göre devam et.
Bu turda: <yapılacak iş>
```

Ajanın ilk dört adımı:

1. `git status` + `git log --oneline -3` ile dalın `main` ile aynı olduğunu doğrula.
2. `python3 scripts/check-static.py && node scripts/check-science.js && node scripts/check-social-studies.js`
   çalıştır; kırık varsa önce onu düzelt.
3. Önizleme sunucusunu başlat: `python3 -m http.server 8000 --bind 0.0.0.0` (repo kökünde).
4. İşi bitirince 7 zorunlu kontrolü çalıştır, commit → PR → merge → `main`'i doğrula.

---

## 1. Dosya haritası

| Dosya | Görev |
|---|---|
| `index.html` | Tek sayfa uygulama: ders seçici, Türkçe okuyucu, ortak ayarlar paneli, `speakEleven/stopEleven` |
| `book-texts.js` | Türkçe kitap metinleri |
| `theme1-practice*.js/css` | Türkçe tema etkinlikleri (şablonun kaynağı) |
| `social-studies-content.js`, `social-studies.js`, `social-studies.css` | Sosyal Bilgiler alanı (1. dönem, 15 hafta; `TERM_PLAN` + kaynak hafta içeriği) |
| `science-content.js` | Fen Bilimleri 15 haftalık konu akışı: `summary`, `blockLabels`, `points`, `terms`, `tasks`, `quiz`, `focus` |
| **`science-term-notes.js`** | **Kavram şeridi sözlüğü: 146 kavram → tanım + tek örnek** |
| `science-activities.js` | Haftalık etkinlik setleri (`window.SCIENCE_ACTIVITIES`) |
| `science.js` | Fen işlevselliği: render, kavram eşleştirme, Groq kontrolü, ilerleme |
| `science.css` | Fen görünümü |
| `scripts/check-static.py` | HTML/CSS/varlık/bağlantı denetimi |
| `scripts/check-science.js` | Fen veri + render + değerlendirme + kavram testleri |
| `scripts/check-social-studies.js` | Sosyal Bilgiler testleri |
| `scripts/check-secrets.py` | Anahtar sızıntısı taraması |
| `docs/` | Analiz, envanter, eşleştirme ve stil kılavuzları |

---

## 2. Dokuz adımlı çalışma akışı

1. **Hafta taraması** — konunun hangi haftaya, hangi üniteye ve hangi kazanıma düştüğünü belirle.
2. **Sınav tarihi** — o hafta yazılı varsa kırmızı rozeti kontrol et (bkz. 4. bölüm).
3. **Metin** — konu anlatımını yaz/güncelle (bkz. 5. bölüm).
4. **Görsel** — hafta görseli ve kavram görselleri (bkz. 6. bölüm).
5. **Kavram şeridi** — `science-term-notes.js` içine tanım + örnek (bkz. 5b).
6. **Etkinlikler** — haftanın etkinlik seti (bkz. 7. bölüm).
7. **Groq** — değerlendirme sözleşmesi bozulmadı mı (bkz. 8. bölüm).
8. **ElevenLabs** — sesli okuma metinleri (bkz. 9. bölüm).
9. **Kontrol + yayın** — 7 kontrol, commit, PR, merge (bkz. 12–13).

---

## 3. Fen Bilimleri hafta takvimi

2026–2027, haftada 4 ders saati, 14–18 Eylül → 28–31 Aralık (15 hafta).

| Ünite | Haftalar | Konu |
|---|---|---|
| 1. Uzay Çağı | 1–5 | Uydu ve araştırma → uzay araçları → teknoloji aktarımı ve uzay kirliliği → ışık kirliliği ve yıldız oluşumu → yıldızlar, galaksiler, ünite tekrarı |
| 2. Kuvvet ve Enerji | 6–8 | Kuvvet/hareket/iş → kinetik ve potansiyel enerji → enerji dönüşümleri ve sürtünme |
| 3. Vücudumuzdaki Sistemler | 9–15 | Sindirim (9–10) → dolaşım (11–12) → solunum (13) → bağımlılık + boşaltım (14) → sağlık, sistemlerin birlikteliği, yıl sonu (15) |

Ara tatil: 16–20 Kasım (10. hafta ile 11. hafta arası boşluk).

---

## 3b. Dönem, hafta ve ders saati standardı

Her ders için haftalık konu dağılımı **kitabın kapsamına** göre kurulur; tahminle bütün yıla yayılmaz.

**1. Kitabın kapsamını belirle.** Kitap yalnız 1. dönem mi, yıl boyu mu? 1. Kitap kapsamındaki bir ders
(Fen, Türkçe, Sosyal Bilgiler) **yalnız 1. dönemde** bitirilir; 2. dönem konusu eklenmez.

**2. Dönem takvimini yaz.** 2026–2027 1. dönem: **14 Eylül – 22 Ocak**. Ara tatil **16–20 Kasım**
(10. ve 11. hafta arası) ders haftası sayılmaz → **18 öğretim haftası**.

**3. Bitiş haftasını erken al.** Konular dönem sonundan **yaklaşık 3 hafta önce** biter
(tekrar, sınav ve telafi için boşluk kalır) → **15 konu haftası** (14–18 Eylül → 28–31 Aralık).

**4. Haftalık ders saatini yaz.** Toplam saat = hafta × haftalık saat.

| Ders | Haftalık saat | 15 hafta | Konu dağılımı |
|---|---|---|---|
| Fen Bilimleri | 4 | 60 saat | 3 ünite: 5 + 3 + 7 hafta |
| Türkçe | 5 | 75 saat | 3 tema: 5 + 5 + 5 hafta, 11 çalışma sayfası (12 metin) |
| Sosyal Bilgiler | 3 | 45 saat | 3 öğrenme alanı: 5 + 3 + 7 hafta |

**5. Konuları haftaya böl.** `hafta sayısı × haftalık saat` bütçesini konu sayısına böl:
- Bir konu ~1–2 hafta; haftada **en çok iki konu** (Türkçede haftada 1 metin, 5 saat).
- Aynı metnin iki haftalık işlenişi tek çalışma sayfasında birleşir (`mergeDuplicateWeeks`).
- Sosyal Bilgilerde iki (gerekiyorsa üç) kazanım tek haftada birleşir; konu anlatımı, sınamalar ve
  etkinlikler kaynak haftalardan **sırayla** birleştirilir (`TERM_PLAN`, `mergedLesson`, `mergedActivities`).

**6. Kitapta olmayanı çıkar.** Hafta yetmiyorsa önce şu bölümler kaldırılır:
- "Dönem sonu", "Yıl sonu tekrar", "Sosyal etkinlik", "öğrenme alanı tekrarı" gibi **tekrar** haftaları,
- kitapta karşılığı olmayan ek konular.
Kitapta olan hiçbir kazanım bu sırada silinmez; yalnızca haftalara sıkıştırılır.

**7. Takvimi tek yerde tut.** Tarih listesi Sosyal Bilgiler `TERM_PLAN` içindedir; Fen ve Türkçe
takvimi bu listeyle aynı olmak zorundadır (`scripts/check-science.js` karşılaştırır).

---

## 4. Yazılı (sınav) tarihleri

| Ders | Hafta | Tarih | Kod | Renk |
|---|---|---|---|---|
| Türkçe | 9 | 10 Kasım 2026 | `EXAM_DATES_BY_WEEK=Object.freeze({9:'10 Kasım 2026'})` (`index.html`) | `#b42318` |
| Sosyal Bilgiler | 8 | 6 Kasım 2026 | `EXAM_DATES_BY_WEEK = Object.freeze({ 8: '6 Kasım 2026' })` | `#b42318` |
| Fen Bilimleri | 8 | 3 Kasım 2026 | `EXAM_DATES_BY_WEEK = Object.freeze({ 8: '3 Kasım 2026' })` | `#bd2632` |

Kurallar:
- Rozet **yalnızca** ilgili haftada görünür; başka haftaya kopyalanmaz.
- Hafta listesinde `.science-week-exam`, hafta başlığında `.science-exam-notice` kullanılır.
- Metin biçimi: `1. sınav (3 Kasım 2026)`.
- Tarih değişirse üç dosyada birlikte değişir; `check-static.py` Türkçe tarihini, `check-science.js`
  ve `check-social-studies.js` kendi tarihlerini doğrular.

**Sınav kartları ve ortak kart biçimi**

**Sınav kartları (haftalık görünüm).** Her dersin sol panelinde sıra şöyledir:
1. kırmızı **1. Sınav: <tarih>** kartı (`.term-exam-plan--first`),
2. **2. Sınav: tahmini 4–8 Ocak 2027** kartı (`.term-exam-plan`),
3. tema/hafta listesi; listenin **son maddesinin altında** kırmızı küçük satır:
   `2. sınav: 4–8 Ocak 2027 (tahmini)`.

Kartlar tek satırdır; açıklama paragrafı taşımaz. 1. sınav tarihleri ders bazında yukarıdaki
tablodadır. Liste sonundaki satır ayrı bir kart değildir, son haftanın rozetiyle aynı biçimdedir.

**Etkinlik kartı biçimi (tek ölçü).** Tema 1'in 1. haftası ölçüdür. Tema 2, Tema 3 ve karekod
çalışmaları aynı yapıyı kullanır:

- `activity-card` → `activity-top` (ikon + `activity-kicker` + `activity-title` + `activity-instruction`),
- `activity-meta` rozetleri (tür, süre/odak, kaynak),
- kaynağı olan etkinliklerde kartın üstünde `reader-links` + `source-link` (🎥/🎧/📄),
- her bölüm `question-card`, düğmeler `check-button` (**✦ Kontrol et**) ve `ai-button`
  (**Yapay zekâ ile değerlendir**).

Ortak biçim `activity-cards.css` içinde tanımlıdır ve sayfada **en son** yüklenir; yeni bir
etkinlik alanı eklenirse bu dosyaya seçici eklenir, ayrı bir görünüm yazılmaz.

**Video işareti.** Video/dinleme kaynağı olan her yerde 🎥 (dinlemede 🎧, metinde 📄) görünür:
- hafta listesinde hafta numarası rozetinin solunda (`🎥 9`),
- etkinlik akışındaki numara dairesinde küçük rozet olarak (`.step-media`),
- etkinlik kartının başlığında ve üstteki kaynak bağlantısında,
- haftalık çalışma çizelgesindeki Tonguç video araması bağlantısında.

İçeriği olmayan derse video işareti eklenmez; bağlantı uydurulmaz.

**Ek okuma ve etkinlikler.** Ana metinden sonra gelen ek metinler ayrı bölüm açmaz. Ek metin,
aynı akışta bir **okuma adımı** (`reading-card`) olarak gösterilir; ek etkinlikler ana metnin
etkinliklerinden sonra aynı kart biçimiyle numaralanır. Okuma adımı tamamlanma hesabına etkinlik
gibi girmez.

---

## 5. Metin standardı (konu anlatımı)

- Hafta başına **4–6 anlatım bloğu**, toplam **≥ 2800 karakter**.
- `blockLabels` sayısı `summary` uzunluğuna **eşit** olmalı.
- Her hafta `focus` (tek cümle kazanım) + `points` (en az 3 hatırlanacak madde) taşır.
- Metin konuyu **doğrudan anlatır**; "ders kitabında", "sayfa 42" gibi atıf yapılmaz.
- Yasak başlıklar: `Kavram sözlüğü`, `Süreç bağlantısı` (kavramlar anlatının içinde kalır).
- 7. sınıf düzeyi: günlük hayattan örnek, ölçülebilir sayı, kısa cümle.
- Sayısal değerler doğrulanmış olmalı (ör. 1 kg'a 1 m/s² → 1 N; 2 kg × 9,8 × 3 m ≈ 59 J).
- Tarihsel/bilim insanı bölümü ayrı bir blok olarak korunur.
- Anatomi metinlerinde uygun olmayan ayrıntı verilmez.

### 5b. Kavram şeridi (146 kart)

Ayrıntı: `docs/science-concept-definitions.md`.

- Her kavram **tanım + kendine özgü tek örnek** (en az iki cümle, ≥ 90 karakter).
- Örnek hiçbir haftada tekrar etmez; 146 kartın 146'sı farklı metindir.
- Eşleştirme `science.js → conceptContext`: **önce sözlük**, sonra anlatı.
- Anlatıdan eşleşmede Türkçe harf katlaması + **tam kelime sınırı** kullanılır. `iş` kavramı
  *değiştiren*, `kan` kavramı *kanıt* içinde eşleşmez.
- Cümlecikler `.!?`, `;`, `:` üzerinden bölünür; aynı cümledeki iki kavram aynı metni paylaşmaz.
- Haftanın `focus` cümlesi hiçbir karta düşmez.

---

## 5c. Şema standardı (adım adım akış)

Bir süreç anlatılıyorsa (yıldızın yaşam döngüsü, enerji dönüşümü, besinin yolu) metinde
"aşağıdaki şema" deniyorsa **o şema gerçekten çizilmelidir**. Var olmayan görsele gönderme yapmak
yasaktır; `check-science.js` bunu denetler.

Kurallar:
- Şema, sıralı bir listedir (`<ol>`) ve her adımda **görsel + tek cümlelik açıklama** taşır.
- Adımlar arasında **yön oku** bulunur (`→` yatay, `↓` dikey). Oklar `aria-hidden` olur.
- Ayrışan dallar (ör. kütleye göre iki yıldız yolu) **ayrı şeritler** olarak yan yana gösterilir;
  ortak başlangıç ayrı bir blokta durur.
- Şema sadeleştiriyorsa bunu kendi notunda söyler: "Evreler milyonlarca yıl sürer ve keskin
  çizgilerle ayrılmaz; şema, sırayı görebilmek için aşamaları sadeleştirir."
- Mobilde tek sütuna iner, yazdırmada bölünmez (`break-inside: avoid`).
- Veri koddan ayrı tutulur (`STAR_START`, `STAR_PATHS`), görsel anahtarları `CONCEPT_IMAGES` içinden gelir.

## 6. Görsel standardı

- **Raster zorunlu** (WebP); SVG yasak. Tek konu, tek stil, tercihen fotogerçekçi.
- Hafta görseli 1600×893, kavram görseli 896×672 + `-450` küçük sürüm.
- Anahtar: `assets/science-week-<hafta>.webp`, `assets/science-concept-<kavram>.webp`.
- `srcset` + `loading="lazy"` + anlamlı `alt` (≥ 40 karakter) zorunlu.
- Etiketler Türkçe ve yalnızca gerekiyorsa eklenir (model İngilizce yazıyorsa etiketsiz üret,
  Türkçe etiketi `convert` ile yerleştir).
- **12 yaş kuralı:** cinsel veya uygunsuz içerik yasak; insan/kol/el içeren kurgudan kaçın.
- Anatomi görsellerinde izole organ kesiti kullan: "no external genitalia, no pelvis, no body".
- Kapsam testi: her `terms` kavramı için görsel var mı — 146/146, 133 dosya.

---

## 7. Etkinlik standardı

- Konu başına **10–15 etkinlik**; tür dağılımı: eşleştirme, boşluk doldurma, doğru–yanlış,
  sıralama, sınıflandırma (sürükle-bırak), çoktan seçmeli, kısa metin yazma.

**Etkinlik türü rozeti (üç alanda ortak ölçü).** Her adımın türü tek bakışta görünür olmalı:
öğrenci hangi adımda video izleyeceğini, metin okuyacağını, kart eşleştireceğini veya yazacağını
rozetten anlar. Fen'de `science-activity-icon` + üç rozet (tür, kapsam, beceri), Türkçe'de
`activityKind()` + görev yolu, Sosyal'de `social-activity-icon` + `social-kind-chip` aynı işi yapar.

| Tür | Sosyal simge | Nerede görünür |
|---|---|---|
| Video | 🎥 | şerit adımı, kart başlığı, hafta lejantı |
| Ses kaydı | 🎧 | aynı |
| Harita | 🗺️ | aynı |
| Etkileşimli içerik (AR, etkileşimli video) | 🧭 | aynı |
| Okuma (kaynak metin, ek okuma, sohbet, örnek durum) | 📖 | aynı |
| Görsel okuma (grafik, gazete haberi, kronoloji şeridi) | 🖼️ | aynı |
| Etkileşim (sınıflandırma, balık kılçığı, kavram haritası, bulmaca) | 🧩 | aynı |
| Seçim (çoktan seçmeli) | 🎯 | aynı |
| Yazma (açık uçlu) | ✍️ | aynı |

- Hafta başlığındaki **lejant** o haftada hangi türlerden kaçar adım olduğunu yazar; seçili tür vurgulanır.
- Görev yolu türe göre değişir (video: izle → not al → yanıtla; okuma: oku → kanıtı bul → yanıtla → yaz; görsel okuma: görseli incele → veriyi oku → yanıtla → yorumunu yaz).
- Video/harita adımları konu etkinliklerinden **sonra** gelir ve tek akışın parçasıdır; ayrı bölüm açılmaz.
- **Görsel okuma adımı** her haftada birdir ve kısa sınamanın hemen ardından gelir: grafik, gazete haberi
  veya kronoloji şeridi (koda gömülü çizim, ayrı görsel dosyası yok) + 1 veri okuma sorusu + 1 yazılı çıkarım.
  Görsel, sorunun yanıtını metin olarak vermez; kaynak satırı ve birim/not alanı zorunludur.
- **Öğrenme alanı sonu:** 5, 8 ve 15. haftaların akışı "Kendimi Değerlendiriyorum" adımıyla kapanır
  (≥5 ölçütlü kontrol listesi + yazılı öz değerlendirme). Bu adım karekod etkinliklerinden sonra gelir.
- **Gelecek haftaya hazırlık:** her haftanın mini planının altında tek cümlelik hazırlık notu bulunur.
- İlk iki hafta tamam: **14 + 14**. Kalan haftalar sırada.
- **Boşluk doldurmada `placeholder` yoktur.** İpucu metni yazılmaz.
- Her etkinlik: `id`, `type`, `prompt`, `task` (görev yolu), `items`/`pairs`/`options`, `hint`.
- Kayıt anahtarları: `m:<id>` (eşleştirme), `s:<id>` (bank), `b:<i>` (boşluk), `o:<id>` (sıralama),
  `t:<id>` (doğru–yanlış), `c:<id>` (seçmeli), `x` (metin).
- İlerleme: `progress.weeks[w].activities[act] = { values, checked, assessment }`.
- Yazdırma için kartlar açık/kapalı durumunu korur; `@media print` etkinlik kartlarını açar.

---

## 8. Groq değerlendirme sözleşmesi

- Uç nokta: `POST https://api.groq.com/openai/v1/chat/completions`
- `temperature: 0.1`, `response_format: {type:'json_object'}`, gpt-oss modellerinde `reasoning_effort:'low'`.
- 429'da **bir kez** yeniden dene.
- Çoktan seçmeli **yerel** değerlendirilir; `match/fill/sort/order/tf/text` Groq'a gider.
- Anahtar yoksa `text` için ayar uyarısı + `openGroqSettings()`, diğerlerinde güvenli yerel özet.

Yanıt sözleşmesi:

```json
{"status":"correct|partial|wrong|incomplete|unverified",
 "issues":["selection|accuracy|completeness|reasoning|evidence|relevance|source"],
 "hint":"reread|match|sequence|count|context|connect|evidence|explain|justify|compare|keyword|unit|recheck"}
```

Gizli cevap koruması:
- Doğru seçenek, doğru kart/eşleşme, doğru sıra ve **yanlış maddenin adı** hiçbir koşulda yazılmaz.
- "İki grup varsa şunu gözden geçir" gibi cevabı ima eden ifade yasaktır.
- Ekranda uygulamanın kurduğu metin görünür: `DURUM: …` / `HATA/EKSİK: …` / `İPUCU: …`.
- Renkler: correct yeşil, partial/incomplete amber, wrong kırmızı, pending mavi.
- Anahtar yalnızca cihazda (`localStorage`) tutulur; paylaşılan cihaz uyarısı korunur.

---

## 9. ElevenLabs sesli okuma

Kapsam: **Fen Bilimleri, Sosyal Bilgiler, Türkçe** — yalnızca **yazılı (metin) soruların geri bildirimi**.
Konu metni, sayfa metni veya çoktan seçmeli cevap anahtarı okunmaz.

| Ders | Düğme | Kimlik |
|---|---|---|
| Fen | `🔊 Geri bildirimi sesli oku` | `science-tts-<etkinlik>` (yalnız `activity.type === 'text'`) |
| Sosyal | `🔊 Geri bildirimi sesli oku` | `social-ai-feedback-…-tts` |
| Türkçe | `🔊 Geri bildirimi sesli oku` | `theme1-tts` (`.feedback-box` altında) |

- Ortak delege `index.html` içinde: `[data-tts-read]` hedef kutunun `textContent`'ini okur,
  `[data-tts-status]` alanına durum yazar, `[data-tts-stop]` okumayı durdurur.
- `POST https://api.elevenlabs.io/v1/text-to-speech/<voiceId>`, `xi-api-key` başlığı.
- Gövde: `{ text, model_id:'eleven_multilingual_v2', voice_settings:{stability:0.45, similarity_boost:0.75} }`.
- `402 paid_plan_required` → cihaz sesine (`speechSynthesis`, `tr-TR`) düşer ve durumu yazar.
- `stopEleven` hem `speechSynthesis`'i hem `Audio` nesnesini durdurur, `ObjectURL`'i serbest bırakır.
- Yiğin metin yalnız **güvenli** geri bildirimdir (`DURUM / HATA-EKSİK / İPUCU`); ham model yanıtı okunmaz.
- Anahtar yoksa düğme uyarı verir; düğme geri bildirim görünür olduğunda açılır.

---

## 9b. Yazılı yanıt koçluğu (ortak modül)

Yazılı yanıt geri bildirimi üç derste de `ai-grader.js` (`window.EMR7_AI_GRADER`) üzerinden üretilir.
Amaç: öğrenciyi yazmaya teşvik etmek ve bir sonraki cümleyi nasıl kuracağını göstermek — cevabı söylemek değil.

Model hâlâ yalnızca güvenli kodlar döndürür; bunlara iki yol gösterici alan eklenir:

| Alan | Sınır | İçerik |
|---|---|---|
| `guide` | 220 karakter | Öğrencinin bir sonraki adımı; haftanın konu anlatımındaki bir başlığa, metindeki bir bölüme ya da öğrencinin kendi sözüne işaret edebilir |
| `starter` | 140 karakter | Öğrencinin tamamlayacağı yarım cümle: “Bunun nedeni …, çünkü …” |

- `sanitizeGuidance`: satır sonlarını temizler, sınırı aşanı kısaltır; `HTML/{ }` içeren, **ders kitabı / sayfa numarası**, “cevap anahtarı / doğru cevap / doğru seçenek” geçen metni **atar**.
- Güvenli metin yoksa derse özgü yedek kullanılır (Fen: konu anlatımındaki paragrafa dön; Sosyal: durum → neden → sonuç; Türkçe: metindeki cümleye dön).
- Geri bildirim blokları: `YOL GÖSTERİCİ`, `YAZMAYA BAŞLA`, `TEŞVİK`; yazılı yanıtta ayrıca `YAZMA HEDEFİ: Şu an 120/220 karakter…` (`lengthCoach`).
- `COACH_RULES` sistem mesajına eklenir; doğru yanıtta “bir örnek/karşı örnek ekle” genişletmesi istenir.
- Kural: koçluk **nereye bakılacağını** ve **cümlenin nasıl kurulacağını** söyler; cevabın içeriğini, sayısal sonucu veya anahtar kavramı söylemez.
- Testler: `check-science.js` ve `check-social-studies.js` sınırları, güvenli yedeği ve sızıntı yasağını doğrular; `check-static.py` üç dersin de modülü kullandığını denetler.

---

## 9c. Dönem, hafta ve ders saati standardı

Yeni bir ders ya da kitap eklendiğinde haftalık plan **tahminle** değil şu sırayla kurulur:

1. **Kapsam:** Kitap tek dönemlik mi, yıl boyu mu? Yalnız 1. dönem kitabı varsa plan 1. dönemde biter; 2. dönem temaları plana eklenmez.
2. **Dönem takvimi:** 2026–2027 1. dönem **14 Eylül – 22 Ocak**. Ara tatil **16–20 Kasım** haftası plana sayılmaz → **18 öğretim haftası**.
3. **Bitiş haftası:** Konular dönem sonundan **~3 hafta önce** biter (sınav/pekiştirme payı) → **15 konu haftası**.
4. **Haftalık ders saati:** Fen **4**, Türkçe **5**, Sosyal Bilgiler **3** saat.
5. **Saat bütçesi:** `hafta × haftalık saat` = toplam ders saati (Fen 60, Türkçe 75, Sosyal 45). Konu ve etkinlik yükü bu bütçeye göre bölünür.
6. **Haftalık konu dağılımı:** Bir haftaya en çok **2 konu** (Sosyal'de 2–3 kısa konu) düşer. Kitapta olmayan ek konu, “tekrar/review”, “dönem sonu”, “yıl sonu” bölümleri **çıkarılır**.
7. **Tek kaynak:** Tarihler tek yerde tutulur (`TERM_PLAN` / hafta listesi); Fen ve Türkçe takvimi bu listeyle karşılaştırılır.

| Ders | Hafta | Haftalık saat | Toplam | Dağılım |
|---|---|---|---|---|
| Fen Bilimleri | 15 | 4 | 60 | Uzay 1–5 · Kuvvet-Enerji 6–8 · Sistemler 9–15 |
| Türkçe | 15 | 5 | 75 | Hayat Boyu Gelişim 1–5 · Bir Hilal Uğruna 6–10 · İletişim ve Sosyal İlişkiler 11–15 (11 çalışma sayfası, 12 metin) |
| Sosyal Bilgiler | 15 | 3 | 45 | Birlikte Yaşamak 1–5 · Evimiz Dünya 6–8 · Ortak Mirasımız 9–15 |

- Haftalık konu sayısı arttığında etkinlik akışı **birleşik** yazılır: aynı haftanın etkinlikleri tek listede, alan kimlikleri çakışmayacak biçimde (`-2` soneki).
- Bir dönem 18 haftaysa ve konu 15 haftada bitiyorsa kalan 3 hafta **sınav ve pekiştirme** için boş bırakılır; plana uydurma konu eklenmez.

---

## 10. Arayüz standardı

- Türkçe çalışma alanı iskeleti şablondur: görev yolu, ikon, durum pill'i, geri bildirim kutusu,
  renkli kenarlık, `✦ Kontrol et` dolgulu birincil düğme.
- Derse özgü **yalnızca palet** değişir (Fen mavi-camgöbeği, Sosyal yeşil).
- Kavram kartları yatay kaydırma yapmaz; parent kartın içine akar (`grid` + `auto-fill`).
- Erişilebilirlik: `aria-live` durum alanları, `role="progressbar"`, `:focus-visible`,
  `@media (prefers-reduced-motion: reduce)`.
- Mobil (≤ 600 px) ve yazdırma görünümü her değişiklikte kontrol edilir.

---

## 11. İlerleme ve yedekleme

- Üç ders ayrı `localStorage` anahtarı kullanır; biri diğerini etkilemez.
- JSON yedeği üç dersi birlikte taşır (`{version, data, socialStudies, science}`).
- `WEEK_GROUP_VERSION = 2` birleştirilmiş haftaların yedeğe geçişini yönetir.
- Şema değişirse eski yedeklerin okunabilirliği korunur.

---

## 12. Zorunlu kontroller (her turda, yayın öncesi)

```bash
python3 scripts/check-static.py
node scripts/check-science.js
node scripts/check-social-studies.js
python3 scripts/check-secrets.py
node --check science.js
node --check science-content.js
node --check science-term-notes.js
node --check ai-grader.js
git diff --check
```

Hepsi **exit 0** olmalı. `check-science.js` ayrıca kavram sözlüğünü doğrular: eksik tanım, tekrar
eden metin, odak cümlesine düşen kart, `iş`/`değiştiren` tipi kelime içi eşleşme.

---

## 13. Yayın adımları

1. `index.html` içindeki ilgili `?v=` sürümünü **artır** (görünüm değiştiyse CSS'i de).
2. Commit: `git add -A && git commit -m "<özet>"`.
3. Push: `git push origin <dal>`.
4. PR: `gh pr create --base main --head <dal> --title … --body …`.
5. Merge: `gh pr merge <numara> --merge`.
6. Doğrula: `fetch_page https://artisartstudio.github.io/Emr7.lect/science.js?v=<yeni>`.
   - CDN gecikmesi ~10 dakika; sürüm sorgusu şart.
   - Sandbox'tan `curl` github.io'ya **erişemez**; `fetch_page` kullan.

---

## 14. Bilinen tuzaklar

- **Dal adı sabittir**; farklı adla push reddedilir. `pr_merged` durumundaki dala commit atılamaz →
  PR'ın yanındaki **Continue** ile yeni dal açılır.
- `gh pr merge` sonrası eski dala atılan commit `main`'e gitmez; yeni PR gerekir.
- `science-content.js` Node'da `window` ister: `global.window={}` ile yükle.
- `check-science.js` içinde top-level `await` + `require` → `ERR_AMBIGUOUS_MODULE_SYNTAX`; async
  fonksiyona sar.
- Test anahtarı gizli anahtar desenine benzemesin (`gsk_…` yasak → `test-anahtar`).
- `generate_image` tur başına 10 görsel.
- Bu ortamda tarayıcı yok; CSS değişikliği **kod + smoke test** ile doğrulanır, ekran görüntüsü alınamaz.
- `git stash -u` + `reset --hard` çalışmıyor → `reset --hard origin/<dal>` + değişikliği yeniden uygula.
- Kavram eşleştirmesinde `includes()` kullanmak "iş" ↔ "değiştiren" hatasını geri getirir.
- Metinde "şema" demek yetmez; şema render edilmezse içerik var olmayan bir görsele işaret eder.
- Görsel notu (`visualNote`) ile görselin `alt` metni aynı sahneyi anlatmalı; ikisi ayrı yazıldığında sık sık çelişir.
- Ders kitabı/sayfa atfı arayüzde de yasak: hafta rozeti ve alt bilgi artık kitap/sayfa içermez.

---

## 15. Yapılan işin özeti

- 15 haftalık Fen konu akışı, 37 konu başlığı birleştirilerek yazıldı; her hafta ≥ 2800 karakter.
- 146 kavram, 133 görsel dosyası (WebP, `srcset`, `alt`), 2 hafta × 14 etkinlik.
- Etkinlik motoru Türkçe çalışma alanı düzeyine çıkarıldı: görev yolu, durum pill'i, ölçer,
  dolgulu `✦ Kontrol et`, boşlukta ipucu yok, çoktan seçmeli dışı Groq.
- **Kavram sözlüğü (`science-term-notes.js`) eklendi:** 146 kart, her biri tanım + tek örnek;
  kelime sınırlı eşleştirme ve cümlecik bölme ile yanlış/tekrarlı kart üretimi kapatıldı.
- Yazılı tarihleri: Türkçe 10 Kasım, Sosyal 6 Kasım, Fen 3 Kasım 2026 (kırmızı rozet).
- Testler: statik denetim, üç ders testi, secret taraması, sözdizimi, kavram gerileme testleri.

---

## 16. Sıradaki işler

1. **Fen 3–15. hafta etkinlik setleri** — her hafta 10–15 etkinlik + `docs/science-activity-analysis-<hafta>.md`.
3. Arayüzün tarayıcıda göz kontrolü (bu ortamda mümkün değil; kullanıcı kontrolü).
4. Görsel kapsamını yeni kavramlarda sürdürme (yeni kavram → yeni görsel anahtarı).

---

## 17. Yazım biçimi

- Türkçe, 7. sınıf düzeyi, kısa cümle; teknik terim ilk geçtiğinde tanımlanır.
- Sayı + birim arası boşluk: `3 metre`, `59 J`, `9,8 N/kg`; ondalık ayırıcı virgül.
- Özel ad kesme işareti: `Dünya’nın`, `Ay’a`, `Türksat 6A’nın`.
- Metinlerde ders kitabına atıf yok; "kaynak" yalnızca bilimsel kanıt anlamında kullanılır.
- Kod içi yorumlar Türkçe, kısa ve **neden**'i açıklar.
