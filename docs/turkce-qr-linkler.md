# Karekod video linkleri ve Gemini analiz şablonu

> **Amaç:** Uygulamada çalışması olan ama videosu/transkripti elimizde olmayan 8 karekod içeriğinin bağlantısını tek yerde toplamak; Gemini'ye verilecek hazır istemi ve bana geri gönderilecek biçimi tanımlamak.
> **Neden gerekli:** Uygulamadaki sorular şu an bilinçli olarak “videoda şu geçiyor” iddiası taşımıyor. Video dökümü/analizi geldiğinde hem sorular içeriğe bağlanacak hem de yapay zekâ öğrencinin yazılı yanıtını **kaynağa dayanarak** değerlendirebilecek.

---

## 1. Eksik 8 içeriğin bağlantıları

Aşağıdaki bağlantılar, 1. kitabın karekodlu içerik listesinin yayımlanmış hâlinden alındı (MEB 2026–2027 listesi). **Kitaptaki karekod doğrudan EBA'ya gider**; buradakiler aynı içeriğin yayımlanmış kopyasıdır. Kalıcı ve resmî olan, PDF'te gömülü EBA bağlantısıdır — onu da aynı tabloya ekleyebilirsin (bkz. bölüm 2).

| # | İçerik | Hafta | Yer | Bağlantı (yayımlanmış kopya) | Analiz durumu |
|---|---|---|---|---|---|
| 1 | Beyhan Budak ile Motivasyon Defteri | 5 | s. 69 · 4. etkinlik | [Drive](https://drive.google.com/file/d/1Dpfaf26LDPkfXzLS7Gk2CphFGY-30zqa/view) · [YouTube](https://youtu.be/d8LR9BPEd_0) | ✅ analiz alındı |
| 2 | Sakarya Zaferi | 7–8 | s. 80 · 5. etkinlik | [Drive](https://drive.google.com/file/d/1usInrv7jmJTtB-yHiluRAfZMyRgOjmVF/view) | ✅ analiz alındı |
| 3 | Çanakkale Geçilmez | 9 | s. 91 · 5. etkinlik | [Drive](https://drive.google.com/file/d/1MjggTtbiExqqTYC9lLgXQzdJHvglXsqv/view) | ✅ analiz alındı |
| 4 | Hey Onbeşli — Bir Çanakkale Ağıdı | 9 | s. 95 · Hazırlık | [Drive](https://drive.google.com/file/d/1wdkHc_BktLSuAUv6SghlJOCIVBVjWAUm/view) | ✅ analiz alındı |
| 5 | Millî Mücadele Sergisi · Kahraman Çocuklar | 9 | s. 95 | [Drive](https://drive.google.com/file/d/1lZY_YFOXgvlnOjcGwKLDQ3Ok7qxrBr6T/view) | ✅ analiz alındı |
| 6 | Çanakkale (tanıtım medya metni) | 9 | s. 100 · 6. etkinlik | [Drive](https://drive.google.com/file/d/1pmgStt4DIz_4gj6kWng_DXQUxXgSI-5g/view) | ✅ özet analiz |
| 7 | 18 Mart Şehitleri Anma Günü ve Çanakkale Deniz Zaferi | 10 | s. 107 · 6. etkinlik | [Drive](https://drive.google.com/file/d/1yf1mO-SSyOZ5V2c9c5Bm1oznN__LPZ4a/view) | ✅ özet analiz |
| 8 | Çanakkale (5. soru) | 10 | s. 116 · 5. soru | [Drive](https://drive.google.com/file/d/1V_xuE7jAr9DXqmRp7p-qg7DFPeZbR2t9/view) | ✅ özet analiz |

Uygulamada hâlihazırda bağlı olan dört içerik (karşılaştırma için): Hayat Büyük Bir Okuldur, Bir İyilik Hikâyesi, Yiğit Caner Aydın söyleşisi, Ali Kuşçu dinlemesi. Bunların EBA bağlantıları PDF'ten çözümlenmişti:

- Hayat Büyük Bir Okuldur — https://www.eba.gov.tr/c?q=UEX7a3e23fb
- Bir İyilik Hikâyesi — https://www.eba.gov.tr/c?q=UEXff7ff4bd
- Yiğit Caner Aydın söyleşisi — https://www.eba.gov.tr/c?q=UEX5afb21e6
- Ali Kuşçu dinlemesi — https://www.eba.gov.tr/c?q=UEX3d0cd83c

---

## 2. PDF'teki gömülü EBA bağlantısını çıkarma

PDF elindeyse en sağlıklı yol; çıkan `eba.gov.tr/c?q=...` bağlantısı kalıcıdır ve üçüncü taraf kopyaya bağlı kalmaz.

1. **Masaüstü okuyucu (en kolay):** İlgili sayfayı aç, karekodun üstüne gel. Bağlantı varsa imleç el işaretine döner. Sağ tık → **Bağlantıyı kopyala**. (Adobe Acrobat: *Görünüm → Gösterge Paneli → Bağlantılar* panelinde sayfadaki tüm bağlantılar listelenir.)
2. **Chrome/Edge:** PDF'i tarayıcıda aç, karekoda tıkla; açılan adres çubuğundaki `eba.gov.tr/c?q=...` adresini kopyala.
3. **Telefon:** Karekodu okut; açılan sayfanın adresini paylaş.
4. **Toplu çıkarma (istersen):** PDF'i `turkce7-1.pdf` adıyla depoya koyarsan tüm gömülü bağlantıları tek seferde çıkarıp tabloyu ve uygulamayı kendim güncellerim. (`python3 -m pip install pymupdf` ile `page.get_links()`.)

Bana **yalnızca içerik adı + URL** olarak yazman yeterli; gerisini ben eşleştiririm.

---

## 3. Gemini'ye verilecek istem (kopyala–yapıştır)

> Aşağıdaki videoyu baştan sona izle. Çıktıyı **birebir Türkçe** ve şu yapıda ver. Uydurma yok: duyulmayan/ görülmeyen ayrıntıyı yazma, emin olmadığın yeri “belirsiz” diye işaretle.
>
> **video:** `<bağlantı>` · **içerik adı:** `<ad>` · **kullanım:** 7. sınıf Türkçe dersi
>
> 1. **Döküm (transkript):** Konuşmaları sırayla, zaman damgasıyla (00:00 biçiminde) yaz. Cümleleri sadeleştirme, konuşmacı değişimlerini belirt.
> 2. **Ekran metinleri:** Videoda yazı olarak görünen başlık, tarih, yer adı, alıntı varsa ayrı liste hâlinde ver.
> 3. **Bölümler:** Videoyu konu değişimlerine göre bölümlere ayır; her bölüm için başlangıç zamanı + bir cümlelik özet.
> 4. **Öne çıkan olgular:** Tarih, kişi, yer, olay, sayı — madde madde. Her maddede zaman damgası olsun.
> 5. **Görsel anlatım:** Kullanılan görüntüler, müzik, seslendirme tonu; hangi duyguyu kurduğu.
> 6. **Ana mesaj:** Tek cümle.
> 7. **Etkinlik bağlantısı:** Bu içerikle aynı sayfadaki kitap etkinliklerinin (not çizelgesi, boşluk doldurma, karşılaştırma, yazma) **örnek cevaplarını** ayrı bir başlıkta ver.
> 8. **Belirsizlikler:** Net duyulmayan, tartışmalı veya görüntüde hızlı geçen yerler.
>
> Çıktıyı düz metin olarak ver; Markdown tablo kullanma.

İkinci bir istem (istersen tek seferde): *“Bu dökümden 7. sınıf düzeyinde 8 doğru/yanlış, 6 çoktan seçmeli ve 2 açık uçlu soru üret; cevaplarını ayrı ver.”* — Bunu ben kullanmayacağım (sorular bizim), ama elinde ekstra soru olması zarar vermez.

---

## 4. Bana geri gönderirken

Tek dosya yeter: her içerik için

```text
### <içerik adı> · <hafta> · <link>
DÖKÜM:
00:00 ...
00:14 ...
BÖLÜMLER:
- 00:00 ... : ...
OLGULAR:
- ...
GÖRSEL/SES:
...
ANA MESAJ: ...
ETKİNLİK CEVAPLARI:
...
BELİRSİZLİK: ...
```

Bunu `docs/video-analysis/<içerik-adı>-gemini-analysis.md` olarak depoya koyarım (mevcut dört raporun yanına).

---

## 4b. Gelen analizler

| İçerik | Rapor | Durum |
|---|---|---|
| Beyhan Budak ile Motivasyon Defteri | [`video-analysis/motivasyon-defteri-gemini-analysis.md`](video-analysis/motivasyon-defteri-gemini-analysis.md) | ✅ karta bağlandı, yapay zekâ değerlendirmesi açıldı |
| Sakarya Zaferi | [`video-analysis/sakarya-zaferi-gemini-analysis.md`](video-analysis/sakarya-zaferi-gemini-analysis.md) | ✅ karta bağlandı, yapay zekâ değerlendirmesi açıldı |
| Çanakkale Geçilmez | [`video-analysis/canakkale-gecilmez-gemini-analysis.md`](video-analysis/canakkale-gecilmez-gemini-analysis.md) | ✅ karta bağlandı, yapay zekâ değerlendirmesi açıldı |
| Hey Onbeşli — Bir Çanakkale Ağıdı | [`video-analysis/hey-onbesli-gemini-analysis.md`](video-analysis/hey-onbesli-gemini-analysis.md) | ✅ karta bağlandı, yapay zekâ değerlendirmesi açıldı |
| Millî Mücadele Sergisi · Kahraman Çocuklar | [`video-analysis/kahraman-cocuklar-gemini-analysis.md`](video-analysis/kahraman-cocuklar-gemini-analysis.md) | ✅ karta bağlandı, yapay zekâ değerlendirmesi ve Sakarya karşılaştırması açık |
| Çanakkale Geçilmez (2. analiz) | [`video-analysis/canakkale-gecilmez-gemini-analysis.md`](video-analysis/canakkale-gecilmez-gemini-analysis.md) | ✅ yeni ayrıntılar eklendi (Conkbayırı, Arıburnu, Anafartalar, “Çanakkale ruhu”) |
| Çanakkale (kent tanıtımı) | [`video-analysis/canakkale-kent-tanitim-gemini-analysis.md`](video-analysis/canakkale-kent-tanitim-gemini-analysis.md) | ✅ karta bağlandı, yapay zekâ değerlendirmesi açıldı |
| 18 Mart anma · şehitlikler | [`video-analysis/18-mart-anma-gemini-analysis.md`](video-analysis/18-mart-anma-gemini-analysis.md) | ✅ karta bağlandı, yapay zekâ değerlendirmesi açıldı |
| Çanakkale · Seyit Onbaşı | [`video-analysis/seyit-onbasi-canakkale-gemini-analysis.md`](video-analysis/seyit-onbasi-canakkale-gemini-analysis.md) | ✅ karta bağlandı, yapay zekâ değerlendirmesi açıldı |

**Eşleştirme notu:** Özet raporlar başlıklarına göre eşlendi. “Çanakkale Geçilmez” raporu mevcut kartla aynı ada sahip olduğu için oraya **ek ayrıntı** olarak işlendi; “Seyit Onbaşı” raporu s. 116'daki “Çanakkale”, “Şehitlikler/Tarihî Miras” raporu s. 107'deki 18 Mart anma kartı ile eşleştirildi. Farklıysa söyle, taşırım.

Ham Gemini özetleri [`docs/video-analysis/kaynak/`](video-analysis/kaynak/) altında saklanır.

Analiz bağlanınca o kartta üç şey değişir: not alanları videonun gerçek bölümlerine bakar, seçim soruları videodan yanıtlanabilir olur, yazma görevinde **“Yapay zekâ ile değerlendir”** düğmesi çıkar (Groq anahtarı sayfanın üstündeki ortak ayarlardan okunur).

## 5. Analiz gelince ne değişecek

1. **Sorular içeriğe bağlanacak.** Şu an “izlediğini kaydet” düzeyinde olan not alanları, videonun gerçek bölümlerine ve olgularına yönelecek (ör. Sakarya'da 23 Ağustos → 12 Eylül → sonuç zinciri).
2. **Yapay zekâ değerlendirmesi açılacak.** Mevcut Groq altyapısı `sourceTranscript` ve `answerKey` alanlarını destekliyor; QR kartlarındaki yazma görevleri bu kaynakla değerlendirilecek. Kural aynı kalacak: anahtar yalnızca modelin iç bağlamında, öğrenciye asla gösterilmez; geri bildirim `DURUM / HATA-EKSİK / YOL GÖSTERİCİ` biçiminde.
3. **Ölçütler keskinleşecek.** “Metinden bir ayrıntıya gönderme var” gibi ölçütler, videodaki belirli bir olaya bağlanacak.
4. **Envanter güncellenecek.** `docs/turkce-qr-envanteri.md` içindeki satırlarda “döküm var / yok” bilgisi tutulacak; `check-qr-inventory.js` bunu denetleyecek.

---

## 6. Sıra önerisi

Vaktin sınırlıysa bu sırayla ilerle — çünkü uygulamada en çok boşluk burada:

1. ~~Millî Mücadele Sergisi · Kahraman Çocuklar~~ ✅
2. ~~Sakarya Zaferi~~ ✅
3. ~~Hey Onbeşli~~ ✅
4. ~~Motivasyon Defteri~~ ✅
5. ~~Çanakkale Geçilmez~~ ✅
6. ~~Tanıtım metni (s. 100)~~ ✅ · ~~18 Mart (s. 107)~~ ✅ · ~~Çanakkale (s. 116)~~ ✅

Sekiz karekod içeriğinin tamamı artık dökümlü ve yapay zekâ değerlendirmeli.

---

## 7. Tema 2 — Bir Hilal Uğruna (hafta 6–10) karekod listesi

Tema 2'de karekodla açılan **7 içerik** var: altısı video, biri (s. 100, medya metni) PDF. **6. haftada (Bayrağımızın Altında) karekod içeriği yok**; s. 82 dereceli puanlama anahtarı ile s. 117 ek ölçme seti etkinlik/video değil, s. 93 “Konuşma Yapalım” ise kapsam dışı. Aşağıdaki dosya adları Drive'daki özgün adlardır.

| # | Sayfa · etkinlik | İçerik | Tür | Hafta | Uygulamadaki kart | Drive |
|---|---|---|---|---|---|---|
| 1 | s. 80 · 5. etkinlik | Sakarya Zaferi | Video (mp4) | 7–8 | `qr-sakarya` | https://drive.google.com/file/d/1usInrv7jmJTtB-yHiluRAfZMyRgOjmVF/view |
| 2 | s. 91 · 5. etkinlik | Çanakkale Geçilmez | Video (mp4) | 9 | `qr-canakkale-gecilmez` | https://drive.google.com/file/d/1MjjggTtbiExqqTYC9lLgXQzdJHvglXsqv/view |
| 3 | s. 95 · Hazırlık | Hey Onbeşli — Bir Çanakkale Ağıdı | Video (mp4) | 9 | `qr-hey-onbesli` | https://drive.google.com/file/d/1wdkHc_BktLSuAUv6SghlJOCIVBVjWAUm/view |
| 4 | s. 95 | Millî Mücadele Sergisi · Kahraman Çocuklar | Video (mp4) | 9 | `qr-milli-mucadele-sergisi` | https://drive.google.com/file/d/1lZY_YFOXgvlnOjcGwKLDQ3Ok7qxrBr6T/view |
| 5 | s. 100 · 6. etkinlik | Tarih, Kültür ve Doğanın İç İçe Olduğu Bir Kent: Çanakkale | PDF | 9 | `qr-canakkale-medya` | https://drive.google.com/file/d/1pmgStt4DIz_4gj6kWng_DXQUxXgSI-5g/view |
| 6 | s. 107 · 6. etkinlik | 18 Mart Şehitleri Anma Günü ve Çanakkale Deniz Zaferi | Video (mp4) | 10 | `qr-18-mart` | https://drive.google.com/file/d/1yf1mO-SSyOZ5V2c9c5Bm1oznN__LPZ4a/view |
| 7 | s. 116 · 5. soru | Çanakkale (Seyit Onbaşı) | Video (mp4) | 10 | `qr-canakkale-son` | https://drive.google.com/file/d/1V_xuE7jAr9DXqmRp7p-qg7DFPeZbR2t9/view |

### Gemini'ye toplu verilecek bağlantılar (virgülle ayrılmış)

```text
https://drive.google.com/file/d/1usInrv7jmJTtB-yHiluRAfZMyRgOjmVF/view, https://drive.google.com/file/d/1MjjggTtbiExqqTYC9lLgXQzdJHvglXsqv/view, https://drive.google.com/file/d/1wdkHc_BktLSuAUv6SghlJOCIVBVjWAUm/view, https://drive.google.com/file/d/1lZY_YFOXgvlnOjcGwKLDQ3Ok7qxrBr6T/view, https://drive.google.com/file/d/1pmgStt4DIz_4gj6kWng_DXQUxXgSI-5g/view, https://drive.google.com/file/d/1yf1mO-SSyOZ5V2c9c5Bm1oznN__LPZ4a/view, https://drive.google.com/file/d/1V_xuE7jAr9DXqmRp7p-qg7DFPeZbR2t9/view
```

**Sıra:** 80 → 91 → 95 (Hey Onbeşli) → 95 (Sergi) → 100 (PDF) → 107 → 116. Gemini çıktısında içerik adı geçmiyorsa bu sıraya göre eşleştir.


### Tema 2 — kitaptaki karekodun gerçek hedefi (EBA)

Tema 3 listesi çıkarılırken aynı PDF taraması Tema 2 sayfalarındaki gömülü bağlantıları da verdi. Yukarıdaki Drive adresleri izleme kolaylığı için; **karekodun kitapta açtığı adres** aşağıdakiler:

| Sayfa | İçerik | EBA bağlantısı |
|---|---|---|
| s. 93 | Konuşma Yapalım (kapsam dışı) | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=c49a87fcbf6056901fa8ad6e0c3d336c&resourceType=1&resourceLocation=2 |
| s. 95 · Hazırlık | Hey Onbeşli — Bir Çanakkale Ağıdı | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=1e663948289faea80982e4c1e04f93ef&resourceType=1&resourceLocation=2 |
| s. 95 | Millî Mücadele Sergisi · Kahraman Çocuklar | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=67132a896a692f6a9cbeb7a0f5d14dbd&resourceType=1&resourceLocation=2 |
| s. 100 · 6. etkinlik | Çanakkale medya metni | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=408ee74471cdf911c3b147ff707553a8&resourceType=1&resourceLocation=2 |
| s. 107 · 6. etkinlik | 18 Mart Şehitleri Anma Günü | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=b9de66045e13bf0a84c5e281c468cfbb&resourceType=1&resourceLocation=2 |
| s. 116 · 5. soru | Çanakkale | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=4ad051e18b4f0d3636e40d818864f9bf&resourceType=1&resourceLocation=2 |
| s. 117 | Ek Ölçme ve Değerlendirme Soruları | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=22a349717e6034ab13508008db3cf7e6&resourceType=1&resourceLocation=2 |

s. 80 (Sakarya Zaferi), s. 82 (dereceli puanlama anahtarı) ve s. 91 (Çanakkale Geçilmez) 1. ciltte kaldığı için bu taramada çıkmadı; onların bağlantısı yukarıdaki Drive listesiyle veriliyor.

> Erişim notu: Bu adresler dosyanın **görüntüleme** bağlantısıdır. Gemini'nin dosyayı açabilmesi için Drive'da “bağlantıya sahip olan herkes” görüntüleyebilir olmalı; değilse Gemini erişim isteyebilir veya dosyayı açamaz.

---

## 8. Tema 3 — İletişim ve Sosyal İlişkiler (hafta 11–15) karekod listesi

Tema 3'te karekodla açılan **14 içerik** var: **5 dinleme/izleme videosu**, 5 etkileşimli EBA çalışması, 2 ölçme aracı ve 2 tema girişi. Liste **kitabın kendi PDF'inden** çıkarıldı: karekodların hedefi PDF'te bağlantı (link annotation) olarak gömülü, adresler `pymupdf` ile okundu. Sayfa numaraları kitabın basılı sayfa numaralarıdır.

| # | Kitap yeri | İçerik | Tür | Hafta | Bağlantı |
|---|---|---|---|---|---|
| 1 | s. 120 · tema girişi | 3. Tema E-Özeti | EBA içeriği | — | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=f1d3b582e8a047ebb9ee86a65d6dfa49&resourceType=1&resourceLocation=2 |
| 2 | s. 120 · tema girişi | EBA Tema Alanı | EBA alanı | — | https://www.eba.gov.tr/c?q=U19875_d8c6fb69 |
| 3 | s. 130 · 7.–8. etkinlik | Düş Fırçası — Ayşe ve dedesinin yolculuğu | Dinleme/İzleme (video) | 11 | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=c37474f2ec4a8a22af545ead325b7ad9&resourceType=1&resourceLocation=2 |
| 4 | s. 130 · Erişelim | “Ok” oyunu | Etkileşimli | 11 | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=7c9f11a45b578a42f18f26bdf0e88ca6&resourceType=1&resourceLocation=2 |
| 5 | s. 139 · 5.–6. etkinlik | Sadaka Taşı | Dinleme/İzleme (video) | 12–13 | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=96d3b5324b741511cb62bb00f3344d0f&resourceType=1&resourceLocation=2 |
| 6 | s. 140 · Erişelim | “Bağlama Oyunu” | Etkileşimli | 12–13 | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=1a2d3dc3cfeec550b909ed5806d1b002&resourceType=1&resourceLocation=2 |
| 7 | s. 144 · Hazırlık / Dinleme-İzleme | Dijital Tayfa — Komik mi Şimdi? | Dinleme/İzleme (video) | 14 | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=c72246e9ade8b155baf3316a6eac2f00&resourceType=1&resourceLocation=2 |
| 8 | s. 154 · 10. etkinlik · Erişelim | “Karagöz Fidan Dikiyor” | Etkileşimli | 14 | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=56d3ee5c72b3bc1c471f5dc80282d0c8&resourceType=1&resourceLocation=2 |
| 9 | s. 161 · 6. etkinlik | İletişimin Önemi | Dinleme/İzleme (video) | 15 | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=4a23110004f17e70a17055512a1addbc&resourceType=1&resourceLocation=2 |
| 10 | s. 161 · Erişelim | “Zamanı Bul” | Etkileşimli | 15 | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=f435c8914f904a81c9b0b201717cb18e&resourceType=1&resourceLocation=2 |
| 11 | s. 162 · 7. etkinlik (C) | Dereceli Puanlama Anahtarı (konuşma) | Değerlendirme aracı | 15 | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=79d3a6fde9274a775cdd6c0452d4f599&resourceType=1&resourceLocation=2 |
| 12 | s. 163 · 9. etkinlik · Erişelim | “Şiirde Ahenk” | Etkileşimli | 15 | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=25bb53c39838dd9e0175704eda64deb2&resourceType=1&resourceLocation=2 |
| 13 | s. 169 · 4.–6. soru | Ortak Evimiz Dünya | Dinleme/İzleme (video) | 15 | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=75e91ff4e295f41c8bd97c7b304e31dd&resourceType=1&resourceLocation=2 |
| 14 | s. 169 · tema sonu | Ek Ölçme ve Değerlendirme Soruları | Ölçme | 15 | https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=cedea51cf082783763389f668425825c&resourceType=1&resourceLocation=2 |

**Not:** Karekodun kendisi (görüntü) ayrıca çözülmeye çalışıldı; bu PDF'te karekodlar vektör olarak çizildiği için `opencv` okuyamadı. Ancak PDF'in bağlantı katmanı karekodun hedefini birebir verir; adresler buradan alındı.

### Gemini'ye toplu verilecek bağlantılar (virgülle ayrılmış)

Yalnız **dinleme/izleme videoları**, sayfa sırasıyla:

```text
https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=c37474f2ec4a8a22af545ead325b7ad9&resourceType=1&resourceLocation=2, https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=96d3b5324b741511cb62bb00f3344d0f&resourceType=1&resourceLocation=2, https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=c72246e9ade8b155baf3316a6eac2f00&resourceType=1&resourceLocation=2, https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=4a23110004f17e70a17055512a1addbc&resourceType=1&resourceLocation=2, https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=75e91ff4e295f41c8bd97c7b304e31dd&resourceType=1&resourceLocation=2
```

**Sıra:** 130 (Düş Fırçası) → 139 (Sadaka Taşı) → 144 (Dijital Tayfa) → 161 (İletişimin Önemi) → 169 (Ortak Evimiz Dünya). Gemini çıktısında içerik adı geçmiyorsa bu sıraya göre eşleştir.

> **Erişim uyarısı:** Bu adresler `ders.eba.gov.tr` yönlendirme sayfalarıdır; EBA oturumu istemeden video akışını vermez. Gemini bağlantıyı doğrudan açamazsa iki yol var: (a) içerik kitaptaki karekodla açılıp video dosyası Drive'a yüklenir ve Drive `/view` bağlantısı verilir (Tema 2'de olduğu gibi), (b) döküm/not öğrenci tarafından yapıştırılır.

### Tema 3 için düzeltilen noktalar

- Öğüt metninin 6. etkinliğinde (s. 161) anılan “izlediğiniz içerik” **“İletişimin Önemi”** videosudur; ilk envanterde eksikti.
- s. 169'daki **“Ortak Evimiz Dünya”** videosu tema ölçmesinin 4.–6. sorularına kaynaklık eder; ilk envanterde yoktu.
- s. 120'de iki karekod var: **3. Tema E-Özeti** ve **EBA Tema Alanı**. Bunlar etkinlik değil, tema girişi.
- s. 162'deki karekod **konuşma** dereceli puanlama anahtarıdır; konuşma etkinlikleri kapsam dışı olduğu için uygulamaya alınmaz.
- “Bağlama Oyunu” s. 140'ta doğrulandı (önceki notta s. 140 için ad yazılmamıştı).

> Uygulama notu: `tema3-practice.js` içinde karekod kartı **yok**; 32 etkinlik metne ve beceriye dayalı. Döküm geldiğinde 11, 12–13, 14 ve 15. haftalara Tema 2'deki şablonla kart eklenebilir.

### Ek — Tema 1–2'de PDF'ten çıkan, listede olmayan bağlantılar

Aynı PDF taraması Tema 1–2'de üç bağlantı daha gösterdi; bunlar etkinlik/video değil, tema girişi:

- s. 10 — 1. Tema E-Özeti · EBA Tema Alanı (`https://www.eba.gov.tr/c?q=U19885_f401a650`)
- s. 74 — 2. Tema E-Özeti · EBA Tema Alanı (`https://www.eba.gov.tr/c?q=U19880_06324c4b`)
- s. 22 — bir Dinleme/İzleme içeriği (`resourceId=ab2060050335dcb6bdda8ec51554453e`); envanterdeki 19 içerikle eşleştirilmedi, adı etiketlenmemiş.
