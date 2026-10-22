# Karekod video linkleri ve Gemini analiz şablonu

> **Amaç:** Uygulamada çalışması olan ama videosu/transkripti elimizde olmayan 8 karekod içeriğinin bağlantısını tek yerde toplamak; Gemini'ye verilecek hazır istemi ve bana geri gönderilecek biçimi tanımlamak.
> **Neden gerekli:** Uygulamadaki sorular şu an bilinçli olarak “videoda şu geçiyor” iddiası taşımıyor. Video dökümü/analizi geldiğinde hem sorular içeriğe bağlanacak hem de yapay zekâ öğrencinin yazılı yanıtını **kaynağa dayanarak** değerlendirebilecek.

---

## 1. Eksik 8 içeriğin bağlantıları

Aşağıdaki bağlantılar, 1. kitabın karekodlu içerik listesinin yayımlanmış hâlinden alındı (MEB 2026–2027 listesi). **Kitaptaki karekod doğrudan EBA'ya gider**; buradakiler aynı içeriğin yayımlanmış kopyasıdır. Kalıcı ve resmî olan, PDF'te gömülü EBA bağlantısıdır — onu da aynı tabloya ekleyebilirsin (bkz. bölüm 2).

| # | İçerik | Hafta | Yer | Bağlantı (yayımlanmış kopya) | Kitaptaki EBA bağlantısı |
|---|---|---|---|---|---|
| 1 | Beyhan Budak ile Motivasyon Defteri | 5 | s. 69 · 4. etkinlik | [Drive](https://drive.google.com/file/d/1Dpfaf26LDPkfXzLS7Gk2CphFGY-30zqa/view) · [YouTube](https://youtu.be/d8LR9BPEd_0) | ✅ analiz alındı |
| 2 | Sakarya Zaferi | 7–8 | s. 80 · 5. etkinlik | [Drive](https://drive.google.com/file/d/1usInrv7jmJTtB-yHiluRAfZMyRgOjmVF/view) | ✅ analiz alındı |
| 3 | Çanakkale Geçilmez | 9 | s. 91 · 5. etkinlik | [Drive](https://drive.google.com/file/d/1MjggTtbiExqqTYC9lLgXQzdJHvglXsqv/view) | ✅ analiz alındı |
| 4 | Hey Onbeşli — Bir Çanakkale Ağıdı | 9 | s. 95 · Hazırlık | [Drive](https://drive.google.com/file/d/1wdkHc_BktLSuAUv6SghlJOCIVBVjWAUm/view) | ✅ analiz alındı |
| 5 | Millî Mücadele Sergisi · Kahraman Çocuklar | 9 | s. 95 | [Drive](https://drive.google.com/file/d/1lZY_YFOXgvlnOjcGwKLDQ3Ok7qxrBr6T/view) | ✅ analiz alındı |
| 6 | Çanakkale (tanıtım medya metni) | 9 | s. 100 · 6. etkinlik | [Drive](https://drive.google.com/file/d/1pmgStt4DIz_4gj6kWng_DXQUxXgSI-5g/view) | — |
| 7 | 18 Mart Şehitleri Anma Günü ve Çanakkale Deniz Zaferi | 10 | s. 107 · 6. etkinlik | [Drive](https://drive.google.com/file/d/1yf1mO-SSyOZ5V2c9c5Bm1oznN__LPZ4a/view) | — |
| 8 | Çanakkale (5. soru) | 10 | s. 116 · 5. soru | [Drive](https://drive.google.com/file/d/1V_xuE7jAr9DXqmRp7p-qg7DFPeZbR2t9/view) | — |

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
6. Kalan üç Çanakkale içeriği: tanıtım metni (s. 100), 18 Mart (s. 107), Çanakkale (s. 116)
