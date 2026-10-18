# 7. Sınıf Öğrenme Rotası

Türkçe dersi için haftalık çalışma planını, okuma etkinliklerini, kısa değerlendirmeleri ve Phaser mini oyunlarını tek sayfada bir araya getiren statik bir öğrenme uygulaması.

**Canlı uygulama:** <https://artisartstudio.github.io/Emr7.lect/>

## Neler var?

- 2026–2027 taslak haftalık plana dayalı Türkçe çalışma rotası.
- Metin odakları, çoktan seçmeli etkinlikler, yazılı yanıtlar ve isteğe bağlı yapay zekâ geri bildirimi.
- Phaser tabanlı mini oyunlar.
- İlerlemeyi tarayıcıda saklama ve JSON yedeği alıp geri yükleme.
- İsteğe bağlı Groq geri bildirimi ve ElevenLabs seslendirme; ElevenLabs kullanılamadığında cihazın `speechSynthesis` sesi yedek olarak kullanılabilir.

## Yerelde çalıştırma

Derleme veya paket kurulumu gerekmez. Depo kökünde:

```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

Ardından `http://localhost:8080/` adresini açın. Sayfa GitHub Pages alt yolunda da çalışması için yerel dosyalara göreli yollar kullanır.

## Groq ve ElevenLabs anahtarları — önemli

- **API anahtarları kaynak dosyalara, GitHub'a veya GitHub Pages ayarlarına eklenmez.** Her kullanıcı kendi anahtarını uygulamanın ayarlarına girer.
- “Bu cihazda hatırla” seçeneği kapalıysa anahtar yalnızca açık sayfanın belleğinde kalır. Seçenek açılıp ayarlar kaydedilirse anahtar o tarayıcının `localStorage` alanında, bu cihazda ve bu site kökeninde tutulur. Uygulama anahtarı GitHub'a veya uygulamanın bir sunucusuna yüklemez.
- Anahtar tarayıcıdan doğrudan Groq/ElevenLabs'e gönderilir. `localStorage` şifrelenmiş bir kasa değildir; cihazı veya tarayıcı geliştirici araçlarını kullanan biri, ayrıca aynı kökendeki sayfa kodu anahtarı görebilir. Yalnızca güvendiğiniz kişisel cihazda saklayın; paylaşılan cihazda “hatırla” seçeneğini kullanmayın ve işiniz bittiğinde ayarlardaki **Anahtarı sil** düğmesini kullanın.
- Sağlayıcılar istekleri ve ilgili metinleri alır. Kullanım sağlayıcının hesabınıza ait limit ve ücretlerine tabidir.
- İlerleme JSON yedeği API anahtarlarını içermez. Tarayıcı kökeni değişirse (ör. `localhost` ile GitHub Pages arasında) yerel depolama da değişir.
- GitHub Pages tarayıcıda çalışan herkese açık JavaScript sunar. `.env`, GitHub Actions secret'ı veya derleme değişkeni kullanarak ön yüz uygulamasındaki bir anahtarı gizlemek mümkün değildir. Uygulama sahibi adına ortak anahtar gerekiyorsa yetkilendirme, kısıtlama ve hız sınırı olan ayrı bir sunucu tarafı servis kurulmalıdır.

Yerel anahtar dosyaları ve proje aktarım arşivleri `.gitignore` ile dışarıda tutulur. `scripts/check-secrets.py` olası Groq/ElevenLabs anahtarlarının kaynak koda eklenmesini CI sırasında da kontrol eder.

## GitHub Pages

Depo herkese açıktır ve GitHub Pages ile şu adresten sunulur:

<https://artisartstudio.github.io/Emr7.lect/>

Sayfanın ana dosyaları `index.html`, `arcade.js` ve yerel `assets/phaser.min.js` dosyasıdır. `.nojekyll`, Pages'in alt çizgiyle başlayan dosyaları Jekyll filtresinden geçirmemesini sağlar. Proje statiktir; yayın için uygulama sunucusu veya API anahtarı gerekmez.

## Kontroller

```bash
python3 scripts/check-secrets.py
python3 scripts/check-static.py
```

`check-static.py`, yerel dosya yollarını ve satır içi JavaScript sözdizimini denetler; bunun için Node.js gerekir.

## İçerik ve dağıtım notu

GitHub Pages paketi kaynak PDF'leri, ham metin dökümlerini ve çalışma planı arşivlerini içermez. Uygulama sayfasında projeden gelen bazı metin ve görseller gömülü durumdadır. Herkese açık dağıtım öncesinde bunların yayımlanma/dağıtım izinlerinin doğrulanması gerekir. Uygulama resmî bir MEB ürünü değildir; haftalık taslak plan ve içerikler öğretmenle kontrol edilmelidir.
