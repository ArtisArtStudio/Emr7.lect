# Sosyal Bilgiler 7 — karekod bağlantıları (EBA + girişsiz kopya)

> **Amaç:** Ders kitabındaki karekodların hedefini ve bu içeriklere **giriş yapmadan** ulaşmanın yolunu tek yerde toplamak.

## 1. Neden EBA bağlantıları “ulaşılamıyor” diyor?

Kitaptaki karekodlar `ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=…` adresine gider. Bu adres, tarayıcıda EBA oturumu yoksa **EBA giriş sayfasına** yönlendirir. Doğrulama: geçersiz bir kimlikle (`resourceId=000…dead`) denendiğinde de aynı giriş sayfası açılır — yani bağlantı kırık değil, sunucu önce oturum istiyor. EBA hesabıyla giriş yapıldığında aynı adres doğrudan içeriği açar.

Uygulamada bu yüzden her karekod kartında iki bağlantı bulunur: **girişsiz kopya** (varsa) ve **EBA bağlantısı** (“EBA hesabı gerekir” notuyla).

## 2. Karekod kartları ve bağlantılar

Girişsiz kopyalar, ders kitabının karekodlarını sayfa sayfa yayımlayan **sosyalbilgiler.biz** forumundaki konulardan alındı; videolar aynı sitede YouTube'a yüklenmiş hâlde duruyor. Kalan içerikler için o sitede yayımlanmış video yok, bu nedenle uygulama kartında arama bağlantısı gösterilir.

| Sayfa | İçerik | Hafta | Girişsiz kopya | EBA `resourceId` |
|---|---|---|---|---|
| 15 | İletişim videosu | 1 | https://youtu.be/9sazRBBv21A | `2d41a7a29aa74f64bbc61e22fca5a389` |
| 23 | Olumlu ve olumsuz iletişim yolları | 2 | — (yayımlanmamış) | `da18b420babd56dfbcf9da975fd86b01` |
| 27 | “Uzlaşmanın Gücü” hikâyesinin devamı | 2 | — (ses kaydı, .rar) | `026223ec3b49bfa0b7fa72a539a4a1d9` |
| 32 | Engelleri aşan üç genç | 3 | https://youtu.be/E3lz6LefMys | `2edd5069ff032e00a221a9a0545791bf` |
| 34 | “Engelleri Aşıyorum” | 3 | — (yayımlanmamış) | `b3ec73b3a189e78a00451537774edb5f` |
| 45 | Millî Meselelerde Biz | 4–5 | https://youtu.be/CP8diE-CstI | `6e1f6955aeff331cc85451f6a8231cc5` |
| 60 | Küreselleşme | 6 | — (yayımlanmamış) | `a9e7ce50bc4c0fa37a38be23b4a8af35` |
| 63 | Kahvenin yolculuğu | 6 | https://youtu.be/pSoAZkgKTP4 | `0a91216d32df2405b32be9c6a740c34a` |
| 72 | Jeopolitik konum ve dış politika | 7 | https://youtu.be/093b1nTbSmo | `d8e6ad2d9687967f09a69ce26cff8a2e` |
| 75–76 | İnsani yardım ve girişimci dış politika | 8 | — (yayımlanmamış) | `a1da14c0d38310a7068eefd025ec8f8f` |
| 96 | Dönemler ve hükümdarlar | 9–11 | https://youtu.be/Gab9bD-3kug | `3bb79a4a924568a745198daba651f7c8` |
| 101 | Gemilerin karadan yürütülmesi | 11 | — (yayımlanmamış) | `ae0929a323ecdf570f064b5d0c1900cb` |
| 105 | Barbaros Hayreddin Paşa | 12 | — (yayımlanmamış) | `64347117dac0957fbdbc54a5c18d6e50` |
| 106 | XVI. yüzyıl etkileşimli haritası | 12 | — (etkileşimli içerik) | `1761fd63303ecc07765ffc8e7d22ac92` |
| 130 | Sanayileşme / yenilikler | 14 | — (yayımlanmamış) | `ea26c7d6df42f305e0ec140ccf58402d` |
| 146 | Fetih Marşı | 15 | — (yayımlanmamış) | `8bb724f386e46afc6d07b4cf1094ab70` |
| 147 | 3D günlük yaşam | 15 | — (yayımlanmamış) | `a1ed545e12246ab79b8cf219aeb4b619` |
| 150 | Ahi teşkilatı | 15 | — (yayımlanmamış) | `218994cef89cb74b5ae00d91da2c821d` |
| 151 | Kültür-medeniyet etkileşimli video | 15 | — (yayımlanmamış) | `c2768a5382050f9c7ec0b81934dcd743` |

Kalıp: `https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=<id>&resourceType=1&resourceLocation=2`

## 3. Google Drive durumu

Kullanıcının Drive'ında **Sosyal Bilgiler videosu yok**. Bulunan 7 video Türkçe dersine aittir ve `turkce-qr.js` içinde kullanılır. Drive'daki Sosyal Bilgiler dosyaları yalnızca ders kitabının dört PDF'idir.

Bir video Drive'a yüklenirse karta `driveUrl` alanı eklenir; kartta “Drive'dan aç” düğmesi otomatik görünür (Türkçe'deki düzenin aynısı). Örnek:

```js
{
  id: "qr-barbaros",
  driveUrl: "https://drive.google.com/file/d/<FILE_ID>/view",
  // …
}
```

## 4. Yeni bağlantı eklerken

1. EBA kimliği kitabın PDF'inden `page.get_links()` ile alınır (gömülü bağlantı katmanı).
2. Girişsiz kopya varsa `publicUrl`, yoksa uygulama otomatik olarak YouTube araması gösterir.
3. Drive kopyası varsa `driveUrl` eklenir; girişsiz kopyadan sonra, EBA'dan önce gösterilir.
4. `node scripts/check-social-studies.js` çalıştırılır; kart alanları ve EBA adres biçimi doğrulanır.
