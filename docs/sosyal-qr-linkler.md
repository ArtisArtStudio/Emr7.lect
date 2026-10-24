# Sosyal Bilgiler 7 — karekod bağlantıları

> **Amaç:** Ders kitabındaki karekodların EBA hedeflerini tek yerde toplamak. Uygulama kartlarından **yalnızca EBA adresine** gidilir; öğrenci EBA oturumuyla izler.

## 1. Neden EBA bağlantıları “ulaşılamıyor” diyor?

Kitaptaki karekodlar `ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=…` adresine gider. Bu adres, tarayıcıda EBA oturumu yoksa **EBA giriş sayfasına** yönlendirir. Doğrulama: geçersiz bir kimlikle (`resourceId=000…dead`) denendiğinde de aynı giriş sayfası açılır — yani bağlantı kırık değil, sunucu önce oturum istiyor. EBA hesabıyla giriş yapıldığında aynı adres doğrudan içeriği açar.

**Uygulama davranışı (Türkçe kartlarıyla aynı):** Her karta tek bağlantı konur — türüne göre simge (🎥 video, 🎧 ses, 📄 harita/metin), içeriğin adı ve “Videoyu aç / Dinlemeyi aç / Haritayı aç” düğmesi. Bağlantı doğrudan EBA adresine gider. İkinci bir YouTube/Drive bağlantısı, arama düğmesi veya bağlantı notu gösterilmez.

## 2. Karekod kartları ve bağlantılar

Aşağıdaki “YouTube (yalnızca kayıt)” kolonu uygulamada **kullanılmaz**; video analizi yapılırken hangi videonun izlendiğini belgelemek için tutulur. Karta bağlanan tek adres EBA kolonundaki `resourceId`'dir.

| Sayfa | İçerik | Hafta | YouTube (yalnızca kayıt) | EBA `resourceId` |
|---|---|---|---|---|
| 15 | İletişim videosu (okul-veli iletişimi) · **analiz eklendi** | 1 | https://youtu.be/9sazRBBv21A | `2d41a7a29aa74f64bbc61e22fca5a389` |
| 23 | Olumlu ve olumsuz iletişim yolları (etkili iletişim ve unsurları) · **analiz eklendi** | 2 | — (yayımlanmamış) | `da18b420babd56dfbcf9da975fd86b01` |
| 27 | “Uzlaşmanın Gücü” hikâyesinin devamı (ses kaydı) · **analiz eklendi** | 2 | — (yayımlanmamış) | `026223ec3b49bfa0b7fa72a539a4a1d9` |
| 32 | **Paralimpik kahramanlar** · **analiz eklendi** | 3 | — (yayımlanmamış) | `63c076451e7fbbd14870627408def2c4` |
| 32 | **Engelleri aşan üç genç** · **analiz eklendi** | 3 | https://youtu.be/E3lz6LefMys | `2edd5069ff032e00a221a9a0545791bf` |
| 32 | **Engellerine rağmen büyük başarılara imza atmış altı isim** · **analiz eklendi** | 3 | — (yayımlanmamış) | `c5c2fbcab508be24681e00d60dabd6ac` |
| 34 | “Engelleri Aşıyorum” — **video değil, sürükle-bırak etkinliği** (karta bağlanmadı) | 3 | — | `b3ec73b3a189e78a00451537774edb5f` |
| 45 | **Millî Meselelerde Biz** · **analiz eklendi** | 4–5 | https://youtu.be/CP8diE-CstI | `6e1f6955aeff331cc85451f6a8231cc5` |
| 45 | **15 Temmuz Darbe Girişimi** (sayfadaki ikinci karekod) | 4–5 | — (yayımlanmamış) | `b14529259e0b211f8d6ae3a4bb6ab951` |
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

## 2b. Analizi eklenen videolar

Kullanıcı tarafından sağlanan Gemini video analizleri depoya işlendi; yedi kartın izleme öncesi soruları, not alanları, çoktan seçmeli soruları ve yazma görevi artık videonun gerçek içeriğine dayanıyor.

s. 32’deki üç video tek raporda geldiği için tek dosyada toplandı; üç kart bu dosyayı paylaşıyor.

s. 45’te **iki** karekod vardır: “Millî Meselelerde Biz” videosu (analizli) ve “15 Temmuz Darbe Girişimi” videosu (henüz analiz yok; kart kitap metnine ve izleme planlamasına dayanır).

| Sayfa | Kart | Video | Analiz dosyası |
|---|---|---|---|
| 15 | `qr-iletisim-video` | Okul-veli iletişimi (Özlem Hanım, Şebnem Hanım, okul müdürü, Can) | `docs/video-analysis/okul-veli-iletisimi-gemini-analysis.md` |
| 23 | `qr-iletisim-yollari` | Etkili iletişim ve unsurları (ben dili–sen dili, empati, beden dili, etkin dinleme, farklılıklara saygı) | `docs/video-analysis/etkili-iletisim-ve-unsurlari-gemini-analysis.md` |
| 32 | `qr-paralimpik-kahramanlar` | Türkiye’nin gururu paralimpik kahramanlarımız | `docs/video-analysis/sayfa32-uc-video-gemini-analysis.md` |
| 32 | `qr-engelleri-asanlar` | Engelleri aşan üç genç | `docs/video-analysis/sayfa32-uc-video-gemini-analysis.md` |
| 32 | `qr-engellerine-ragmen-alti-isim` | Engellerine rağmen büyük başarılara imza atmış altı isim | `docs/video-analysis/sayfa32-uc-video-gemini-analysis.md` |
| 45 | `qr-milli-meseleler` | Millî Meselelerde Biz (Yakup Kadri, İstiklal Yolu) | `docs/video-analysis/milli-meselelerde-biz-gemini-analysis.md` |
| 27 | `qr-uzlasma-hikayesi` | Uzlaşmanın Gücü hikâyesinin devamı (Ahmet ve Merve, proje anlaşmazlığı) — **ses kaydı** | `docs/video-analysis/uzlasmanin-gucu-devami-gemini-analysis.md` |

Ses kaydı olan kartlarda bölüm başlıkları “Dinlemeden önce / Dinlerken not al / Dinledikten sonra” biçimine geçer.

Kural: analiz metni öğrenciye gösterilmez. `analysis.summary` ve `analysis.keyPoints` yalnızca içerik kaynağı ve ileride yapay zekâ değerlendirmesi için tutulur; öğrenci yüzeyinde yalnızca izleme adımları, sorular ve yönlendirici ipuçları görünür. Cevap anahtarı gösterilmez.

Diğer karekod kartları için analiz gelirse aynı yol izlenir: rapor `docs/video-analysis/` altına konur, karta `analysis` alanı eklenir, sorular rapordaki doğrulanabilir bilgilere dayandırılır.

## 2c. Karta bağlanmayan karekodlar

| Sayfa | İçerik | Neden karta bağlanmadı? | Plan |
|---|---|---|---|
| 34 | “Engelleri Aşıyorum” (`b3ec73b3a189e78a00451537774edb5f`) | Video değil; engelli bireylerin işini **kolaylaştıran / zorlaştıran** durumların resimlerini sürükleyip bırakarak sınıflandırılan etkileşimli bir etkinlik. | Kullanıcı talimatıyla şimdilik atlandı. İleride aynı kazanımla bir `sort` (sürükle-bırak sınıflandırma) etkinliği olarak yazılacak: iki kategori “kolaylaştıran” / “zorlaştıran”, öğrenci metninde kitap–sayfa referansı olmadan. |

Bu içerik uygulamada **kart olarak listelenmez**; envanterde yalnızca kayıt amacıyla durur. Video/etkinlik eklendiğinde `social-studies-qr.js` içine yeni bir kart olarak girer.

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
