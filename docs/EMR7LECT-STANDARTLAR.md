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
| `social-studies-content.js`, `social-studies.js`, `social-studies.css` | Sosyal Bilgiler alanı (37 hafta) |
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

| Ders | Durum |
|---|---|
| Türkçe | **VAR** — `index.html` içinde `speakEleven(text, status)` + `stopEleven(update)`, quiz yorumunu okur |
| Sosyal Bilgiler | **YOK** |
| Fen Bilimleri | **YOK** |

Mevcut Türkçe davranış (şablon):
- `POST https://api.elevenlabs.io/v1/text-to-speech/<voiceId>`, `xi-api-key` başlığı.
- Gövde: `{ text, model_id:'eleven_multilingual_v2', voice_settings:{stability:0.45, similarity_boost:0.75} }`.
- `402 paid_plan_required` → cihaz sesine (`speechSynthesis`, `tr-TR`) düşer ve durumu yazar.
- `stopEleven` hem `speechSynthesis`'i hem `Audio` nesnesini durdurur, `ObjectURL`'i serbest bırakır.
- Düğmeler: `🔊 Yorumu sesli oku` / `Durdur`, durum metni `aria-live="polite"` bir alanda.

Fen ve Sosyal'e eklenecek davranış:
1. Ortak yardımcıya çıkar (`window.speakEleven = ...`), iki ders de aynı işlevi çağırsın.
2. Yalnızca **güvenli** metin okunur: `DURUM / HATA-EKSİK / İPUCU`; ham model yanıtı okunmaz.
3. Düğme geri bildirim kutusunun altında; anahtar yoksa düğme görünür ama uyarı verir.
4. Metin 1500 karakteri geçerse cümle sınırından bölünür.

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

1. **ElevenLabs sesli okuma** — Fen geri bildirimi ve Sosyal'e ekle (9. bölüm).
2. **Fen 3–15. hafta etkinlik setleri** — her hafta 10–15 etkinlik + `docs/science-activity-analysis-<hafta>.md`.
3. Arayüzün tarayıcıda göz kontrolü (bu ortamda mümkün değil; kullanıcı kontrolü).
4. Görsel kapsamını yeni kavramlarda sürdürme (yeni kavram → yeni görsel anahtarı).

---

## 17. Yazım biçimi

- Türkçe, 7. sınıf düzeyi, kısa cümle; teknik terim ilk geçtiğinde tanımlanır.
- Sayı + birim arası boşluk: `3 metre`, `59 J`, `9,8 N/kg`; ondalık ayırıcı virgül.
- Özel ad kesme işareti: `Dünya’nın`, `Ay’a`, `Türksat 6A’nın`.
- Metinlerde ders kitabına atıf yok; "kaynak" yalnızca bilimsel kanıt anlamında kullanılır.
- Kod içi yorumlar Türkçe, kısa ve **neden**'i açıklar.
