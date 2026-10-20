# 7. Sınıf Öğrenme Rotası

Türkçe için tema bazlı okuma rotası ve etkinlik paketleri; Sosyal Bilgiler 7 için ders kitabına dayalı, 37 ayrı haftalık konu planı ve özgün etkinlikler sunan statik bir öğrenme uygulaması.

**Yayımlanan uygulama:** <https://artisartstudio.github.io/Emr7.lect/>

## Neler var?

- 2026–2027 taslak haftalık plana dayalı Türkçe çalışma rotası.
- MEB 2026 7. sınıf Sosyal Bilgiler ders kitabındaki **Birlikte Yaşamak**, **Evimiz Dünya** ve **Ortak Mirasımız** öğrenme alanlarına dayalı 37 haftalık ayrı rota.
- Sosyal Bilgilerde her hafta konu özeti, anahtar kavramlar ve konuya göre değişen etkinlik akışı vardır. İlk iki iletişim haftası özgün okumalar, sohbet, trafik örneği, gözlem/merak, araştırma sorusu ve kaynak incelemesiyle ilerler. 3–12. haftalar ben dili ve empati sınıflandırması, “arkası yarın” tahmini, fırsat eşitliği için beyin yazımı, erişilebilirlik eşleştirmesi, proje taslağı/kontrol listesi, kelime bulutu, ulusal bayram/anma günü kartları, Millî Mücadele kaynak incelemesi, dayanışma örneği karşılaştırması ve öğrenme alanı tekrarıyla yenilendi. 13–18. haftalar da Evimiz Dünya için kelime bulutu ve küreselleşme tanımı, etki örnekleri/tablosu, kaynak-iddia değerlendirme, bölgesel/küresel ölçek sınıflandırması, paydaş-çözüm haritası, komşularla iş birliği ve Türkiye’nin katkısını kaynakla değerlendirme etkinlikleriyle yenilendi; 19. hafta ve sonrası değiştirilmedi. Sürükle-bırak etkinlikleri dokunmatik ve klavyeyle de kullanılabilir; seçim, çoklu seçim, açık yanıt ve kontrol listeleri konuya göre karıştırılır. Ders kitabı metinleri, görselleri veya soruları kopyalanmaz.
- Açık uçlu Sosyal Bilgiler yanıtlarında isteğe bağlı **✦ Kontrol et** düğmesi ortak Türkçe/Groq ayarlarını ve seçili modeli kullanır. Değerlendirme güvenli durum/ipuçları kodlarıyla sunulur; seçmeli ve sınıflandırmalı alanlar uygulama içinde yerel olarak kontrol edilir. Yanıtlar Groq’a doğrudan gönderilir; API anahtarı yalnızca kullanıcının cihazında ayarlanır ve tarayıcı/ağ incelemesinde görülebileceği uyarısı korunur.
- Aynı metin veya konunun art arda işlendiği Türkçe haftalar tek çalışma sayfasında birleştirilir; iki haftanın tarih aralığı, odağı ve görevleri birlikte gösterilir. Sosyal Bilgiler haftaları ise tarih, konu ve ilerleme takibinde birbirinden ayrı tutulur.
- EBA ve MEBİ çizelge bağlantıları kullanıcı tarafından sağlanan 7. sınıf Sosyal Bilgiler adreslerine gider; Tonguç araması her haftanın konusunu içerir.
- Tema bazında gruplanmış haftalık rota ve PDF’deki kaynak metinleri paragraf/dize düzeniyle sunan okuyucu.
- Tema 1’de PDF etkinlik türleri ve sayılarıyla eşleştirilmiş 43 özgün çalışma; seçilen haftanın numaralı paketi aynı okuma sayfasında sırayla açılır.
- Kaynak görevine uygun yazılı yanıt, seçim ve erişilebilir sürükle-bırak / dokunarak eşleştirme araçları; her soru için isteğe bağlı Groq geri bildirimi.
- Türkçe ve Sosyal Bilgiler ilerlemesini ayrı tarayıcı alanlarında saklama; ikisini birlikte JSON yedeğine alıp geri yükleme. Sosyal Bilgilerde mini plan ve o haftanın tüm etkinlikleri tamamlanınca uygulama kutusu otomatik işaretlenir; seçimli, çoklu seçimli ve sınıflandırma yanıtları doğru kontrol edilmelidir. EBA/Tonguç/MEBİ kutuları öğrenci tarafından işaretlenir. Etkinlik akışları yenilenirken artık kullanılmayan yanıtlar ve AI geri bildirimleri de JSON yedeğinde korunur.
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

Depo ve uygulama herkese açıktır; mevcut GitHub Pages yayını şu adrestedir:

<https://artisartstudio.github.io/Emr7.lect/>

Ana dosyalar `index.html`, `book-texts.js`, `social-studies-content.js`, `social-studies.js`, `social-studies.css`, `theme1-practice.css`, `theme1-practice-app.js` ve `theme1-practice-forms.js` dosyalarıdır. Sosyal Bilgiler alanı ayrı bir istemci modülünde çalışır ve Türkçe ilerlemesini etkilemez. Theme 1 akışı ayrı bir sayfa açmadan `index.html` içinde gösterilir; hafta seçilince diğer tema/haftalar gizlenir ve hafta listesine dönüş kontrolü sunulur. `.nojekyll`, Pages'in alt çizgiyle başlayan dosyaları Jekyll filtresinden geçirmemesini sağlar. Proje statiktir; uygulama sunucusu veya gömülü API anahtarı gerekmez.

## Kontroller

```bash
python3 scripts/check-secrets.py
python3 scripts/check-static.py
```

`check-static.py`, yerel yolları, JavaScript sözdizimini, haftaya odaklanma/dönüş akışını, 43 Türkçe etkinliğinin form türlerini, Sosyal Bilgilerdeki 37 haftanın konu özetlerini, ilk iletişim konusunun değişken etkinlik ve okuma akışını, kalan haftaların etkinliklerini, ilerleme/yedek geçişini ve bağlantılarını, gömülü paket akışını, sürükle-bırak kontrollerini, soru başına Groq yönergelerini ve okuma duraklarını denetler; bunun için Node.js gerekir.

## İçerik ve dağıtım notu

GitHub Pages paketi kaynak PDF'leri, ham metin dökümlerini ve çalışma planı arşivlerini içermez. Uygulama sayfasında projeden gelen bazı metin ve görseller gömülü durumdadır. Herkese açık dağıtım öncesinde bunların yayımlanma/dağıtım izinlerinin doğrulanması gerekir. Uygulama resmî bir MEB ürünü değildir; haftalık taslak plan ve içerikler öğretmenle kontrol edilmelidir.
