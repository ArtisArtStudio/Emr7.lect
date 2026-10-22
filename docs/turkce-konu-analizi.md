# Türkçe 7 · 1. Dönem Konu ve Kapsam Analizi

**Amaç:** Uygulamada Türkçe alanında şu an ne olduğunu, ders kitabında bunun karşılığında ne bulunduğunu ve **hangi bileşenlerin eksik kaldığını** tek belgede göstermek. Fen Bilimleri'nde yaptığımız haftalık set disiplininin Türkçe için de kurulabilmesi bu analize dayanıyor.

**Veri kaynakları**

| Kaynak | Kapsam | Güvenilirlik |
| --- | --- | --- |
| `index.html` · `sourceWeeks` + `BOOK_MAP` | 15 haftalık plan, hafta–eser eşleşmesi | Uygulamanın kendi verisi |
| `book-texts.js` | 9 kitap metni (toplam 37.315 karakter) | Uygulamaya alınmış metinler |
| `index.html` · `BOOK_QUIZZES`, `specific` | 8 quiz seti (48 soru), 4 haftada yazma görevi | Uygulamanın kendi verisi |
| `theme1-practice.js` + `-forms.js` | Tema 1 için 43 özgün etkinlik | Uygulamanın kendi verisi |
| `docs/theme1-activity-inventory.md` | Tema 1, PDF s. 11–73, etkinlik etkinlik döküm | Kitaptan çıkarılmış, doğrulanmış envanter |
| `docs/video-analysis/*` | 13 dinleme/izleme/medya içeriğinin Gemini raporu (Tema 3'ün beş videosu dahil) | Kullanıcı sağladı; bağımsız doğrulanmadı |

> **Sınır:** `turkce7-1.pdf` depoda yok. Tema 1 için sayfa düzeyinde envanter var; **Tema 2 ve Tema 3 için sayfa düzeyinde envanter henüz çıkarılmadı.** Bu belgede Tema 2–3, plandaki eser adları, uygulamadaki metinler ve kitabın bilinen yapısı üzerinden değerlendirildi; sayfa numarası verilen yerler yalnızca Tema 1'e aittir.

---

## 1. Kitapta "ana metin" dışında ne var?

Kitap bir metinler derlemesi değil; her tema **yedi ayrı bileşen türü** içeriyor. Uygulama bugün bunlardan yalnızca ikisini tam karşılıyor.

| # | Bileşen türü | Kitaptaki örnekler | Uygulamada bugün |
| --- | --- | --- | --- |
| 1 | **Ana metin** (öykü, deneme, anı, biyografi) | Martı Jonathan Livingston, Gençliğin Kıymeti, Adını Göklere Yazdıran Çocuk, Bayrağımızın Altında, Mustafa 1881–1920, Eskici, Ya Hayır Söyle… | ✅ 9 metin okuma alanında |
| 2 | **Şiir** | Mustafa Kemal'in Kağnısı, Öğüt, **Zafer**, **Uçun Kuşlar**, **Ağaç ve Sen** (serbest okuma) | ⚠️ Yalnız 2 şiir var; 3 şiir **metin olarak yok** |
| 3 | **Dinleme/izleme metni** | Hayat Büyük Bir Okuldur, Bir İyilik Hikâyesi, Yiğit Caner Aydın söyleşisi, Ali Kuşçu, Millî Mücadele Sergisi, Dijital Tayfa | ⚠️ 4'ü QR bağlantısı + Gemini raporu; 2'si (h9, h14) **tamamen boş** |
| 4 | **Kısa bilgilendirici metin** | Öğrenmenin Bitmeyen Yolculuğu, İyiliğin Zincirleme Etkisi, Saygın Bir Birey Olmak | ❌ Yalnız bir tanesi özgün metinle temsil ediliyor (`cause-effect-a01`) |
| 5 | **Dil bilgisi / noktalama** | Noktalı virgülün 3 işlevi, üç nokta, ikilemelerin yazımı | ✅ Tema 1'de 4 etkinlik (h1, h3–4) |
| 6 | **Yazma türleri** | E-posta, ikna paragrafı, meslek tahmini yazısı, neden-sonuç paragrafı, yaratıcı hikâye | ⚠️ Tema 1'de 5 tür var; haftalık yazma istemi ise yalnız 5. haftada |
| 7 | **Ölçme ve öz değerlendirme** | Tema sonu 8 soru; 4 öz değerlendirme formu (dinleme, okuma, yazma, konuşma) × 5 madde = 20 madde | ⚠️ Tema 1'de 8 soruluk review var; **4 form yok**; Tema 2–3 ölçmesi yok |

---

## 2. Hafta hafta kapsam tablosu

`node scripts/turkce-coverage.js` komutu bu tabloyu her zaman güncel üretir.

| Hafta | Tema | Eser | Metin | Quiz | Etkinlik | Yazma |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Hayat Boyu Gelişim | Martı Jonathan Livingston | 6.274 kr | 6 soru | 12 | — |
| 2 | Hayat Boyu Gelişim | Martı Jonathan Livingston | 6.274 kr | 6 soru | 12 | — |
| 3 | Hayat Boyu Gelişim | Gençliğin Kıymeti | 4.557 kr | 6 soru | 19 | — |
| 4 | Hayat Boyu Gelişim | Sen Sor O Yanıtlasın | 4.557 kr | 6 soru | 19 | — |
| 5 | Hayat Boyu Gelişim | Adını Göklere Yazdıran Çocuk | 4.794 kr | 6 soru | 12 | var |
| 6 | Bir Hilal Uğruna | Bayrağımızın Altında | 2.548 kr | 6 soru | 12 | — |
| 7 | Bir Hilal Uğruna | Mustafa 1881–1920 | 6.784 kr | **—** | **0** | **—** |
| 8 | Bir Hilal Uğruna | Mustafa 1881–1920 | 6.784 kr | **—** | **0** | **—** |
| 9 | Bir Hilal Uğruna | Millî Mücadele Sergisi | **dinleme/izleme** | **—** | **0** | **—** |
| 10 | İletişim ve Sosyal İlişkiler | Mustafa Kemal'in Kağnısı (şiir) | 1.525 kr | 6 soru | **0** | **—** |
| 11 | İletişim ve Sosyal İlişkiler | Eskici | 6.577 kr | 6 soru | **0** | **—** |
| 12 | İletişim ve Sosyal İlişkiler | Ya Hayır Söyle… | 3.647 kr | 6 soru | **0** | **—** |
| 13 | İletişim ve Sosyal İlişkiler | Ya Hayır Söyle… | 3.647 kr | 6 soru | **0** | **—** |
| 14 | İletişim ve Sosyal İlişkiler | Dijital Tayfa | **dinleme/izleme** | **—** | **0** | **—** |
| 15 | İletişim ve Sosyal İlişkiler | Öğüt (şiir) | 609 kr | 6 soru | **0** | **—** |

**Özet:** Metin 13/15 hafta · Quiz 11/15 hafta (48 soru) · **Etkinlik 6/15 hafta (43 etkinlik)** · Yazma görevi **1/15 hafta** (yalnız 5. hafta).

---

## 3. Eksikler ve öncelik sırası

### P1 · Haftalık etkinlik seti olmayan 9 hafta (7, 8, 9, 10, 11, 12, 13, 14, 15)

Bu haftalarda öğrenci metni okuyor, 6 soruluk quizi çözüyor ve bitiyor. Kitaptaki söz varlığı, anlama, dil bilgisi, konuşma ve yazma çalışmalarının karşılığı yok. Tema 2 ve Tema 3 fiilen **"oku + test çöz"** düzeyinde.

### P2 · Metni olmayan iki dinleme/izleme haftası (9 ve 14)

Bu haftalarda okuma alanı "PDF'de ayrı bir basılı metin bulunmuyor" mesajını gösteriyor; etkinlik ve quiz de yok. Öğrenci uygulamada tek başına hiçbir şey yapamıyor. Kitapta bu haftalar bir dinleme/izleme içeriği + yönerge + sorular içeriyor.

### P3 · Etkinlikte sorulan ama metni olmayan şiirler

`sport-a07` etkinliği "PDF s. 47'deki iki şiir" (Zafer, Uçun Kuşlar) ve "Ağaç ve Sen" serbest okuma şiiri üzerinden söz sanatı, dize/kıta, hece ve ortak ses incelemesi istiyor. **Bu üç metin uygulamada yok.** Öğrenci ya kitaba bakmak zorunda ya da etkinliği yapamıyor. Bu, mevcut setteki tek somut tutarsızlık.

### P4 · Serbest okuma ve kısa metin katmanı yok

Kitapta her temanın sonunda serbest okuma metni (Tema 1'de "Ağaç ve Sen"), ayrıca neden-sonuç çalışması için üç kısa metin var. Uygulamada bunları gösterecek bir bölüm yok; yalnız `cause-effect-a01` içinde tek bir özgün metin var.

### P5 · Tema sonu ölçme ve öz değerlendirme

Tema 1 için 8 soruluk review var. Kitaptaki **4 öz değerlendirme formu** (dinleme, okuma, yazma, konuşma; 20 madde) uygulamada yok. Tema 2 ve Tema 3 için tema sonu ölçmesi hiç yok.

### P6 · Yazma ve konuşma görevlerinin dağılımı dengesiz

Haftalık yazma istemi yalnız 5. haftada var (Tema 1'in kendi paketinde 5 yazma çalışması bulunuyor). Konuşma görevi de yalnız Tema 1'de. Kitap her temada hem yazma hem konuşma istiyor. Öğrencinin "yazmada zorlandığı" geri bildirimi de bu boşluğu doğruluyor.

---

## 4. Önerilen hedef yapı (hafta başına)

Türkçe için Fen'deki 14–15 etkinlik yükü fazla; kitabın kendi ritmi haftada **8–10 çalışma**, tema sonunda **8 soruluk ölçme** ve **4 öz değerlendirme formu**. Önerilen standart:

| Bileşen | Hafta başına | Dayanak |
| --- | --- | --- |
| Metin okuma (duraklı tahmin) | 1 | Mevcut okuma alanı |
| Söz varlığı (bağlam → sözlük → ilişki) | 1 | Kitabın her metinde yaptığı ilk çalışma |
| Anlama ve çıkarım | 2 | Kitaptaki 5 soruluk setler |
| Dil bilgisi / noktalama | 0–1 | Temaya bağlı (noktalı virgül, üç nokta, ikileme) |
| Yazma (tür odaklı) | 1 | E-posta, ikna paragrafı, özet, hikâye |
| Konuşma (hazırlıklı) | 1 | Her temada var |
| Quiz (yerel, 6 soru) | 1 | Mevcut yapı korunur |
| Görsel/şiir incelemesi | 0–1 | Şiir haftalarında zorunlu |

Yani haftada **8–10 etkinlik + 6 soruluk quiz**; 9 eksik hafta için yaklaşık **80–90 yeni etkinlik** gerekiyor. Tema sonunda ayrıca **8 soruluk ölçme** ve **4 öz değerlendirme formu** eklenir.

---

## 5. Yol haritası (öneri)

| Adım | İş | Çıktı | Bağımlılık |
| --- | --- | --- | --- |
| 1 | Tema 2 envanteri (s. 74–…) ve Tema 3 envanteri çıkar | `docs/theme2-activity-inventory.md`, `theme3-…` | PDF sayfa aralığı |
| 2 | Hafta 7–8 (Mustafa 1881–1920) seti: 10 etkinlik + quiz | `turkce-tema2` paketi | Adım 1 |
| 3 | Hafta 9 ve 14 dinleme/izleme paketi: kısa özet + not çizelgesi + 6 soru | dinleme kartı | İçerik dökümü |
| 4 | Hafta 10–15 (Tema 3) setleri: şiir incelemesi, Eskici, Ya Hayır Söyle, Öğüt | `turkce-tema3` paketi | Adım 1 |
| 5 | Şiir metinleri: Zafer, Uçun Kuşlar, Ağaç ve Sen | okuma alanına 3 şiir | **Metin sağlanmalı** (Tema 1 için özgün şiir yazıldı) |
| 6 | Tema 2–3 ölçmesi + 4 öz değerlendirme formu | ölçme kartı | Adım 2–4 |
| 7 | `turkce-coverage.js --strict` CI'ya bağlanır | eksik hafta kalmadığını garanti eder | Tüm adımlar |

---

> Karekodla açılan içeriklerin ayrıntılı dökümü ve uygulama kapsamı: [`turkce-qr-envanteri.md`](turkce-qr-envanteri.md).

## 5b. Uygulanan ilk adım: Tema 1 ek okuma ve etkinlikler

Tema 1'in ana metinlerinden **sonra** gelen ek okuma ve etkinlikler (`theme1-extras.js`) ana etkinlik akışının içine alındı. Ek metin, aynı akışta bir okuma adımı olarak açılır; ek etkinlikler ana metnin etkinliklerinden sonra aynı kart biçimiyle numaralanır. Ayrı bir ek bölüm/kart yoktur.

| Hafta | Tür | Ek metin | Etkinlikler | Beceri odağı |
| --- | --- | --- | --- | --- |
| 1 | Kısa hikâye | Yirmi Yedinci Deneme | eşleştirme (4) · seçim (3) · yazma (150 kr) | azim, geri bildirim, metinden kanıt |
| 3 | Bilgilendirici metin | Bir Dakikanın Defteri | eşleştirme (4) · seçim (3) · yazma (160 kr) | düşünceyi geliştirme yolları, plan |
| 5 | Şiir (4 kıta) | Yıldız Sayan Çocuk | eşleştirme (4) · seçim (3) · yazma (150 kr) | benzetme, kişileştirme, abartma, konuşturma |

Tasarım kuralları:

- Metinler özgün yazıldı; kitaptaki metin kopyalanmadı ve **öğrenciye dönük metinde kitap/sayfa referansı yok**.
- Her eşleştirmede 4 kavram + 1 çeldirici bulunur; seçim sorularında doğru şık yönergeye yazılmaz.
- **Cevap anahtarı gösterilmez.** Geri bildirim `DURUM` · `YOL GÖSTERİCİ` · `İPUCU/ÖLÇÜTLER` başlıklarıyla yol gösterir; yazmada metinden bir örnek işaret edilir ve öğrenci yeniden yazmaya teşvik edilir.
- Yanıtlar `data[...].extras[activityId]` altında saklanır; mevcut Tema 1 ilerlemesinden ayrıdır.
- Doğrulama: `node scripts/check-turkce-extras.js` (kapsam, tür dengesi, söz sanatları, cevap sızması ve ana etkinlik alanının değişmediği denetimi).

## 5c. Karekod içerikleri

Karekodla açılan izleme/dinleme içeriklerinin dökümü ve kapsamı [`turkce-qr-envanteri.md`](turkce-qr-envanteri.md) içinde. Birinci dönemde 12 metin/video/ses içeriğinden 4'ü mevcut Tema 1 akışında, 8'i yeni karekod kartlarında çalışılıyor; konuşma etkinliği (s. 93) kapsam dışı. Kartlar izleme öncesi hazırlık, not çizelgesi, iki seçim sorusu ve bir yazma görevinden oluşur; içerik dökümü olmadığı için videoda geçtiği iddia edilen ayrıntılara dayanmaz.

---

## 6. Şiir metinleri: alınan karar

Kanun gereği kitap metinlerini kendimiz yeniden üretemeyiz ve depoda PDF olmadığı için "Zafer", "Uçun Kuşlar" ve "Ağaç ve Sen" metinlerini alamıyoruz. Tema 1 için **2. seçenek uygulandı**: söz sanatları çalışmasını karşılayan özgün bir şiir ("Yıldız Sayan Çocuk") yazıldı ve ana metinden sonraki ek bölüme yerleştirildi. Tema 2–3 şiirleri için seçenekler hâlâ açık:

1. **Metinleri siz sağlayın** (PDF sayfaları veya düz metin). En doğru seçenek; kitaptaki metnin aynısı okuma alanına girer, `sport-a07` gerçek metinle çalışır.
2. **Özgün eşdeğer metin yazalım.** Aynı temada, aynı ölçütlerle incelenebilecek 3 yeni şiir yazarız; etkinlik "kitaptaki şiir" yerine "uygulamadaki şiir" der. İçerik tamamlanır ama kitabın metni olmaz.
3. **Etkinliği metinsiz bırakalım.** Öğrenci kitabından okur; uygulama yalnız yönerge verir. Bugünkü durum budur ve önerilmez.

Aynı soru dinleme/izleme içerikleri için de geçerli: Ali Kuşçu ve Yiğit Caner Aydın için elimizde kullanıcı raporları var, Millî Mücadele Sergisi ve Dijital Tayfa için **hiç yok**.

---

## 7. Özet

- Türkçe alanında **Tema 1** (hafta 1–6) iyi durumda: metin + 43 etkinlik + quiz; ayrıca hafta 1, 3 ve 5 için ana metinden sonra gelen **9 ek etkinlik** (3 ek metin, 3 yazma görevi) hazır.
- **Tema 2 ve Tema 3** (hafta 7–15) büyük ölçüde boş: 9 haftada etkinlik yok, 4 haftada quiz yok, 2 haftada metin bile yok.
- Kitaptaki **şiir, serbest okuma, kısa metin, tema ölçmesi ve öz değerlendirme** katmanları uygulamada ya yok ya eksik.
- Öncelik: Tema 2–3 envanteri → haftalık setler → dinleme haftaları → şiir metinleri → ölçme/öz değerlendirme.
- Tema 1 ek katmanı tamamlandı; aynı düzen (ana metin → mevcut etkinlikler → ek okuma) Tema 2–3 setlerine de uygulanabilir.
