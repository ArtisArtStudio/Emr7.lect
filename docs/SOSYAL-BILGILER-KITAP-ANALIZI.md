# 7. Sınıf Sosyal Bilgiler Ders Kitabı — İnceleme Raporu

Kaynak: MEB 7. Sınıf Sosyal Bilgiler Ders Kitabı (2026), dört PDF parçası.
İnceleme tarihi: 22 Ekim 2026. Yöntem: PDF metin katmanı + gömülü bağlantı (karekod hedefi) çözümlemesi.
Kitabın metni, soruları ve görselleri uygulamaya kopyalanmaz; bu rapor yalnız yapı, teknik ve kaynak envanteri çıkarır.

## 1. Dosyalar ve sayfa aralıkları

| Dosya | Sayfa | Kitaptaki sayfalar | İçerik |
|---|---|---|---|
| `sosyalbilgiler7-1.pdf` | 39 | 1–39 | Künye, İstiklal Marşı, Gençliğe Hitabe, içindekiler, 1. öğrenme alanının ilk yarısı |
| `sosyalbilgiler7-2.pdf` | 44 | 40–83 | 1. öğrenme alanının sonu, 2. öğrenme alanının tamamı |
| `sosyalbilgiler7-3.pdf` | 34 | 84–117 | 3. öğrenme alanı: giriş ve 1. alt konunun büyük kısmı, 2. alt konunun başı |
| `sosyalbilgiler7-4.pdf` | 47 | 118–164 | 3. öğrenme alanının sonu, sözlük, kaynakça, cevap anahtarları |

Toplam 164 sayfa. Dört dosya tek kitabın ardışık bölümleridir; ayrı kitap değildir (kapaktaki “1. Kitap” ifadesi tek kitap adıdır).

> Not: 1. dosyanın metin katmanında Türkçe karakter bozulması var (`Õ`→ı, `ú`→ş, `÷`→ğ, `ø`→İ, `ù`→Ş, `ö`→Ğ yalnız “GENÇLİĞE” içinde). 2–4. dosyalar temiz. Okuma sırasında düzeltildi; uygulamaya alınacak metinler bu dosyadan birebir kopyalanmayacak.

## 2. Kitabın yapısı

Üç öğrenme alanı, sekiz alt konu, üç ölçme-değerlendirme bölümü:

| Öğrenme alanı | Alt konu | Sayfa | Uygulamadaki birim |
|---|---|---|---|
| 1. Birlikte Yaşamak | Gruplarda ve sosyal hayatta iletişimin önemi | 12–29 | `together` |
| | Özel gereksinimli bireyler için fırsat eşitliği | 30–39 | `together` |
| | Millî meseleler karşısında Türk toplumunun tutum ve davranışları | 40–50 | `together` |
| | 1. Öğrenme Alanı – Kendimi Değerlendiriyorum | 51–55 | — |
| 2. Evimiz Dünya | Küreselleşmenin insan ve toplum hayatına etkisi | 58–67 | `world` |
| | Bölgesel ve küresel sorunların çözümünde ülkemizin rolü | 68–79 | `world` |
| | 2. Öğrenme Alanı – Kendimi Değerlendiriyorum | 80–83 | — |
| 3. Ortak Mirasımız | Osmanlı Devleti’nin cihan devleti hâline gelmesini sağlayan politikalar | 86–109 | `heritage` |
| | Osmanlı Devleti’nin uygulamaya koyduğu yenilikler | 110–135 | `heritage` |
| | Osmanlı kültür ve medeniyeti | 136–154 | `heritage` |
| | 3. Öğrenme Alanı – Kendimi Değerlendiriyorum | 155–159 | — |
| Ekler | Origami görev oyunu (EK-1), sözlük, kaynakça, cevap anahtarları | 159–164 | — |

Sayfa aralıkları `UNITS` içinde kitaba göre düzeltilmiştir: 1. alan 10–55, 2. alan 56–83, 3. alan 84–159. `scripts/check-social-studies.js` bu üç değeri doğrular; kaynak künyesi (hafta kartındaki atıf) bu aralıkları kullanır.

## 3. Ders işleme şablonu

2. öğrenme alanında bölüm etiketleri açıkça basılmış; 1 ve 3. alanlarda aynı döngü etiketsiz ilerliyor:

1. **DÜŞÜNELİM** — görsel/örnek olayla ısınma, kavramı kendi sözcükleriyle tanımlama (s. 58, 68).
2. **KEŞFEDELİM** — kaynak metin + boşluk doldurma, çıkarım (s. 59, 69).
3. **ÖĞRENELİM** — ana anlatım; grafik, gazete haberi, harita, “Karekodla verilen içeriği inceleyiniz” kutuları (s. 60–66).
4. **UYGULAYALIM** — tartışma, kavram haritası, sınıflama şeması (s. 66).
5. **DEĞERLENDİRELİM** — boşluklu kavram haritası + karekodlu kontrol listesi (s. 67).
6. **Gelecek Derse Hazırlık** — bir sonraki konuya veri toplama ödevi (s. 67).

3. alanda döngü şöyle: harita/görsel inceleme → metin → “Uygulama Adımları” ile yönergeli etkinlik → çalışma yaprağı → rubrik/öz değerlendirme → gelecek derse hazırlık.

## 4. Etkinlik çeşitleri

Kitapta 25’ten fazla farklı teknik var. Uygulamanın etkinlik motoru şu alan türlerini destekliyor: `text`, `textarea`, `words`, `checklist`, `choice`, `multi`, `sort` + yapay zekâ ile değerlendirme. Buna göre eşleme:

| Kitaptaki teknik | Örnek sayfa | Uygulama karşılığı |
|---|---|---|
| Yapboz parçası tamamlama | 12 | `text` alanları (hafta 1’de kullanıldı) |
| Çevrim içi yazışmayı inceleme | 13 | Hazır (hafta 1) |
| Örnek olay / kısa öykü | 14, 15 | Hazır |
| Jest–mimik–emoji eşleştirme | 21 | `sort` |
| Beyin fırtınası / beyin yazımı | 22, 31 | `text` çoklu alan |
| Balık kılçığı (neden analizi) | 23, 28, 109 | `textarea` + başlıklı alanlar |
| Ben dili–sen dili dönüştürme | 19, 22 | Hazır (hafta 3) |
| Kavram haritası doldurma | 30, 67 | `words` / `text` |
| Kolaj + pano sergisi | 31 | `textarea` (plan) |
| Slogan, şiir, özlü söz üretme | 24, 25, 29 | `textarea` |
| Proje taslağı, ürün dosyası | 26, 35–38 | Hazır (hafta 7) |
| Konuşma halkası | 32 | **Kapsam dışı** (konuşma etkinlikleri) |
| GZFT (swot) analizi | 87 | `textarea` (hafta 9 planında var) |
| Soru kartı + araştırma raporu | 91 | Hazır (hafta 15 kaynağı) |
| Tarih şeridi / zaman şeridi | 112 | `sort` |
| Neden sınıflandırma (siyasi/dinî/ekonomik) | 97 | `sort` |
| Çoklu bakış açısı (yerli–denizci–devlet) | 115 | `textarea` üç alan |
| “Öğrendiğim 3 / Merak ettiğim 2 / Benzeyen 1” | 117 | `text` üçlü |
| Tablo tamamlama (neden–sonuç) | 121, 131 | `textarea` |
| Tanılayıcı dallanmış ağaç | 51, 55, 158 | `choice` zinciri |
| Kavram oyunu | 55, 83, 158 | `choice` / `match` benzeri |
| Bulmaca | 156 | `words` |
| Kelime bulutu | 144 | `words` (hafta 5’te kullanıldı) |
| Forum / panel | 132, 49–50 | **Kapsam dışı** (konuşma) |
| Drama + hikâye yazma | 152–153 | `textarea` |
| Origami görev oyunu | 154, 159 | Uygulamada yok; istenirse `checklist` |
| Dijital harita uygulaması | 137 | Yönergeli `text` |
| Artırılmış gerçeklik (3D) | 147 | Yalnız bağlantı |
| Etkileşimli harita / video | 106, 151 | Yalnız bağlantı |
| Kontrol listesi (7 yerde) | 22, 37, 50, 64, 67, 79, 132 | `checklist` |
| Bütüncül dereceli puanlama anahtarı (4) | 29, 39, 135, 152 | Değerlendirme ölçütü metni |
| Öz değerlendirme / akran değerlendirme | 28, 153, 154 | `checklist` |

## 5. Karekod envanteri

Kitaplardaki 52 karekodun tamamı çözüldü. Hepsi EBA’ya (`ders.eba.gov.tr`) gidiyor; hiçbiri harici site değil. Bu, uygulamaya **tıklanır bağlantı** olarak alınabilecek gerçek kaynak listesidir.

| Tür | Adet | Sayfalar |
|---|---|---|
| Öğrenme alanı / özet karekodu | 6 | 10 (×2), 56 (×2), 84 (×2) |
| Video, etkileşimli harita/video, 3D | 24 | 15, 23, 27 (×2), 32 (×3), 34, 45 (×2), 60, 63, 72, 75, 76, 96, 105, 106, 130 (×2), 146, 147, 150, 151 |
| Kontrol listesi / rubrik / cevap anahtarı | 12 | 22, 29, 37, 39, 50, 64, 67, 79, 132, 135, 152, 164 |
| Etkinlik, e-içerik, kavram oyunu | 9 | 37, 55 (×2), 83 (×2), 132, 158 (×2), 164 |
| Etiketsiz (fetih anlatımı sayfası) | 1 | 101 |

İçerik adları (uygulamaya alınacak başlıklar):

- **s. 15** İletişim ile ilgili video · **s. 23** Olumlu ve olumsuz iletişim yolları · **s. 27** “Uzlaşmanın Gücü” hikâyesinin devamı
- **s. 32** Engelleri aşan üç genç · Paralimpik kahramanlar · Altı isim (3 video) · **s. 34** “Engelleri Aşıyorum” *(video değil, sürükle-bırak etkinliği; karta bağlanmadı)*
- **s. 45** “Millî Meselelerde Biz” videosu + 15 Temmuz içeriği
- **s. 60** Küreselleşme içeriği · **s. 63** “Kahvenin Yolculuğu”
- **s. 72** Türkiye’nin jeopolitik konumu ve dış politikası · **s. 75** İnsani yardım ve girişimci dış politika · **s. 76** “İyilik Gemileri”
- **s. 96** Osmanlı Devleti’nin mimarları · **s. 105** Barbaros Hayreddin Paşa ve deniz kuvvetleri · **s. 106** Etkileşimli harita
- **s. 130** Osmanlı’da sanayileşme · Osmanlı’da yenilikler (2 içerik)
- **s. 146** Fetih Marşı · **s. 147** 3D artırılmış gerçeklik: günlük yaşam ve toplum hayatı · **s. 150** Ahi teşkilatı · **s. 151** Etkileşimli video

Önceki turda “Sosyal’de video yok” demiştim; doğrusu: **uygulamada yok, kitapta 24 tane var.** Hepsini kullanıma açabiliriz.

## 6. Uygulamadaki durum

| Ölçüt | Kitap | Uygulama |
|---|---|---|
| Öğrenme alanı / alt konu | 3 / 8 | 3 / 15 hafta (34 kaynak haftadan birleştirme) |
| Konu özeti | her alt konuda 2–6 sayfa | hafta 1–12: 870–1.320 karakter; hafta 13–15: 250–320 karakter |
| Etkinlik akışı | her alt konuda 4–8 etkinlik | **yalnız hafta 1–8** (59 etkinlik, 127 soru) |
| Karekod | 52 | **0** (Sosyal’de karekod kartı yok) |
| Video | 24 | 0 (çizelgede yalnız EBA/MEBİ/Tonguç araması) |

**Boşluk:** 9–15. haftalar (Ortak Mirasımız’ın tamamı) yalnız özet + puan + 4–6 kontrol sorusu içeriyor; etkinlik, karekod ve video yok.

**Kapsam dışı kalan konular** (kitapta başlık var, uygulama planında yok):

- Fransız İhtilali ve Osmanlı’ya etkisi (s. 123–124)
- Sömürgecilik ve büyük deniz seyahatleri (s. 113–116) — deniz yolları anlatılıyor, sömürgecilik boyutu yok
- Lale Devri (s. 125–126)
- III. Selim / Nizam-ı Cedid ve II. Mahmud dönemleri ayrı başlık olarak (s. 127–128)
- Vakıf kültürü (s. 148–150), Ahi teşkilatı ve lonca (s. 150), Divan teşkilatı (s. 140–141), Türk modası (s. 133)

**Öksüz kayıt:** içerik dosyasında 35–37 numaralı dersler var, dönem planı en fazla 34’ü kullanıyor. Temizlenmeli ya da plana bağlanmalı.

## 7. Hafta 9–15 için öneri

Kitabın kendi tekniğiyle, uygulamanın alan türleriyle yazılabilir:

| Hafta | Kitap | Önerilen etkinlik türleri | Karekod |
|---|---|---|---|
| 9 | s. 86–92 | Harita okuma (`sort`), GZFT (`textarea`), soru kartı | — |
| 10 | s. 88–95 | Balık kılçığı (`textarea`), sınıflandırma (`sort`), zaman şeridi (`sort`) | s. 96 dönemler ve hükümdarlar |
| 11 | s. 96–102 | Neden sınıflandırma (`sort`), hazırlık–sonuç eşleştirme (`multi`), çalışma yaprağı | s. 101 (etiketsiz) |
| 12 | s. 103–109 | Harita + ticaret yolu (`sort`), balık kılçığı, Mısır Seferi sonuç tablosu | s. 105 Barbaros, s. 106 etkileşimli harita |
| 13 | s. 112–122 | Zaman şeridi (`sort`), “3-2-1” (`text`), neden–sonuç tablosu | s. 130 yenilikler |
| 14 | s. 123–135 | Tablo tamamlama, forum yerine yazılı tartışma (`textarea`), sanayi öncesi/sonrası karşılaştırma | s. 130 sanayileşme |
| 15 | s. 136–154 | Kelime bulutu (`words`), divan–bakanlık eşleştirme (`sort`), vakıf/ahi, araştırma raporu | s. 146 Fetih Marşı, s. 147 3D, s. 150 Ahi, s. 151 etkileşimli video |

Her hafta için hedef: 3 etkinlik + 1 görselli soru + en az 1 karekod bağlantısı; konu özeti 900–1.300 karaktere çıkarılmalı (hafta 1–12 düzeyi).

## 8. Uygulanan kararlar (2026-10-22)

Dört karar sorusu yanıtlandı ve içerik uygulandı. 15 haftalık dönem planı korunmuş, eksik konular kitaptaki sıraya göre mevcut haftalara iliştirilmiştir.

### 8.1 Birim sayfa aralıkları

| Öğrenme alanı | Eski | Yeni (kitap) |
|---|---|---|
| 1. Birlikte Yaşamak | 12–58 | **10–55** |
| 2. Evimiz Dünya | 68–83 | **56–83** |
| 3. Ortak Mirasımız | 86–155 | **84–159** |

Kitapta 4. öğrenme alanı yoktur; `KİTABIMIZI TANIYALIM` sayfasındaki “4. Öğrenme Alanı” yalnızca gösterge örneğidir. EK-1 (origami, s. 159) ve sözlük–kaynakça–cevap anahtarı (s. 161–164) öğretim süresine dâhil edilmemiştir.

### 8.2 Eksik konuların yerleşimi (kitaptaki sıra korunarak)

| Konu | Kitap yeri | Eklendiği hafta |
|---|---|---|
| Sömürgecilik ve yerli halklar | s. 113–116 | 12 |
| Fransız İhtilali | s. 123–124 | 14 |
| Lale Devri | s. 125–126 | 14 |
| III. Selim / Nizam-ı Cedid, II. Mahmud | s. 127–131 | 14 |
| Türk modası ve yerli üretim tartışması | s. 133 | 14 |
| Divan teşkilatı | s. 140–141 | 15 |
| Vakıf kültürü ve ahi-lonca teşkilatı | s. 148–150 | 15 |

### 8.3 Etkinlik akışı (15 hafta)

Her hafta temel akışın ardına dört ek çalışma eklenir: bir ek okuma (özgün metin + sorular) ve üç teknik çalışması. Teknikler konuya göre dağıtılmıştır (balık kılçığı, GZFT, tanılayıcı dallanmış ağaç, zaman şeridi, kelime bulutu, bulmaca, kavram haritası, tanılayıcı test, sınıflandırma). Toplam 60 ek çalışma; dönem genelinde 139 etkinlik adımı.

| Hafta | Etkinlik adımı | Teknikler |
|---|---|---|
| 1 | 14 | Balık kılçığı, dallanmış ağaç |
| 2 | 10 | Dallanmış ağaç, kavram haritası |
| 3 | 10 | GZFT, bulmaca |
| 4 | 10 | Kavram haritası, kelime bulutu |
| 5 | 13 | Zaman şeridi, balık kılçığı |
| 6 | 11 | GZFT, tanılayıcı test |
| 7 | 11 | Balık kılçığı, kavram haritası |
| 8 | 11 | Bulmaca, dallanmış ağaç |
| 9 | 7 | GZFT, zaman şeridi |
| 10 | 7 | Balık kılçığı, kavram haritası |
| 11 | 7 | Zaman şeridi, tanılayıcı test |
| 12 | 7 | Balık kılçığı, kavram haritası |
| 13 | 7 | Kavram haritası, tanılayıcı test |
| 14 | 7 | Dallanmış ağaç, zaman şeridi |
| 15 | 7 | Bulmaca, kavram haritası |

### 8.4 Karekod kartları

`social-studies-qr.js` (18 kart) ve `social-qr-app.js` (Türkçe’deki `TURKCE_QR` düzeni: izlemeden önce → izlerken not al → izledikten sonra quiz + yazma). Kartlar 14 haftaya bağlıdır; yalnızca 13. haftada kitaba ait karekod içeriği yoktur ve bölüm gizlenir.

| Hafta | Karekod |
|---|---|
| 1 | s. 15 iletişim videosu |
| 2 | s. 23 olumlu-olumsuz iletişim, s. 27 “Uzlaşmanın Gücü” |
| 3 | s. 32 engelleri aşan gençler, s. 34 “Engelleri Aşıyorum” |
| 4, 5 | s. 45 “Millî Meselelerde Biz” |
| 6 | s. 60 küreselleşme, s. 63 kahvenin yolculuğu |
| 7 | s. 72 jeopolitik konum |
| 8 | s. 75–76 insani yardım |
| 9, 10, 11 | s. 96 dönemler ve hükümdarlar (dijital içerik) |
| 11 | s. 96 ile birlikte fetih anlatımı |
| 12 | s. 105 Barbaros Hayreddin Paşa, s. 106 XVI. yüzyıl etkileşimli haritası |
| 14 | s. 130 sanayileşme videosu ve yenilikler etkileşimli videosu |
| 15 | s. 146 Fetih Marşı, s. 147 3D gündelik yaşam, s. 150 ahi teşkilatı, s. 151 kültür-medeniyet etkileşimli videosu |

### 8.5 Açık kalanlar

- 13. hafta (Rönesans, Reform, Aydınlanma) için kitapta karekod yok; kart eklenmedi.
- İçerik dosyasındaki 35–37 numaralı dersler dönem planında kullanılmıyor; ileride temizlenebilir veya plana bağlanabilir.
- Haftalık görselli soru (1–2) henüz Sosyal Bilgiler alanında yok; Fen’deki illüstrasyon standardı Sosyal için ayrıca üretilmeli.

## 9. Konu anlatımı yeterlilik denetimi (2026-10-25)

Kitap metni (164 sayfa) ile uygulamadaki "konu anlatımı" bölümü karşılaştırıldı. Ölçü: `WEEKS[].summary` ve `LESSONS` kayıtlarındaki kelime sayısı.

| Ölçü | Kitap | Uygulama (önce) |
|---|---|---|
| Hafta 1–4 (s. 12–50) | ~6.250 kelime | ~1.100 |
| Hafta 6–8 (s. 58–79) | ~4.760 kelime | **218** |
| Hafta 9–12 (s. 86–135) | ~5.925 kelime | ~715 |
| 15 hafta toplamı | ~17.000 kelime | 2.835 (ort. 189/hafta) |

Sonuç: konu kısmı **yetersizdi**. En büyük boşluk 2. öğrenme alanındaydı; `LESSONS` 13–37 kayıtları 28–42 kelimelik yer tutuculardı ve `summaryTitle` alanları boştu.

### 9.1 1. tur — uygulandı (6–8. hafta)

- `LESSONS` 13–18 baştan yazıldı: her kayıt 5–6 paragraf, ~250 kelime, 4 hatırlama maddesi, 4 anahtar kavram ve dolu `summaryTitle`.
- Hafta toplamları: **6. hafta 711**, **7. hafta 586**, **8. hafta 582** kelime (hedef 450–600/hafta; 6. hafta iki konuyu birden taşıdığı için üst sınırın biraz üzerinde).
- Kitaptaki somut örnekler metne girdi: Orta Koridor, e-ticaret ve görüntülü görüşme, kahvenin yolculuğu, COVID-19, TİKA–Senegal sağlık merkezi, 2022 tahıl koridoru anlaşması, mülteci sayıları, TÜRKSOY/Yunus Emre tarzı kültürel iş birlikleri.
- Öğrenci metninde kitap/sayfa atfı yok; metinler özgün yazıldı.
- `scripts/check-social-studies.js`'e üç yeni ölçü eklendi: 6–8. hafta özeti > 2500 karakter, en az 8 paragraf, konu örneklerinin (Orta Koridor, TİKA, tahıl/gıda, arabuluculuk) metinde bulunması.
- `UNITS` sayfa aralıkları zaten doğruydu (10–55 / 56–83 / 84–159); kaymış değerler yalnızca dokümanlarda kalmıştı, düzeltildi.

### 9.2 Sıradaki turlar

2. tur — `LESSONS` 13–37'nin kalanı: 28–42 kelimelik kayıtlar 100–140 kelimeye çıkarılacak, `summaryTitle` doldurulacak, 3 madde + 3 kavram standardı korunacak.
3. tur — her haftaya bir "görsel okuma" adımı (harita/grafik/gazete haberi + 2 soru), üç öğrenme alanı için "Kendimi Değerlendiriyorum" kapanış adımı ve her hafta sonuna "gelecek haftaya hazırlık" cümlesi.
