/* QR-backed activity metadata may include sourceUrl/sourceLinkLabel at activity level or question level. Add sourceTranscript/answerKey separately for factual Groq checking; a link alone is student-facing only. */
window.THEME1_QR_SOURCES = Object.freeze({
  hayatBuyuk: "https://www.eba.gov.tr/c?q=UEX7a3e23fb", // PDF s. 22
  birIyilikHikayesi: "https://www.eba.gov.tr/c?q=UEXff7ff4bd", // PDF s. 33
  yigitCanerAydin: "https://www.eba.gov.tr/c?q=UEX5afb21e6", // PDF s. 42
  aliKuscu: "https://www.eba.gov.tr/c?q=UEX3d0cd83c" // PDF s. 57
});
window.THEME1_PRACTICE = {
  version: 1,
  source: "Türkçe 7 · 1. Tema: Hayat Boyu Gelişim · turkce7-1.pdf, basılı sayfalar 11–73",
  units: [
    {
      weekId: 1,
      label: "1–2. haftalar",
      title: "Martı Jonathan Livingston",
      pages: "PDF s. 12–29",
      inventoryCount: "12 numaralı etkinlik",
      groups: [
        {
          title: "Martı Jonathan Livingston · özgün etkinlikler",
          activities: [
            {
              id: "marti-a01",
              number: "1",
              title: "Tahmin et, duraklarda güncelle, sonunda karşılaştır",
              format: "İki numaralı tahmin durağı + okuma sonrası kontrol",
              count: "2 tahmin durağı · 1 kontrol",
              source: "Martı Jonathan Livingston öyküsü",
              skill: "Okuma öncesi tahmin, metin ipucu kullanma, öz değerlendirme",
              instruction: "İlk tahminini ve gerekçeni, iki durakta yaptığın güncellemeyi ve okuma sonundaki karşılaştırmanı yaz."
            },
            {
              id: "marti-a02",
              number: "2",
              title: "Anahtar söz varlığını incele",
              format: "Anahtar kelime seçimi ve söz varlığı tablosu",
              count: "4 sözcük × 3 anlam alanı · 4 sözcük ilişkisi",
              source: "Martı Jonathan Livingston öyküsü",
              skill: "Anahtar söz varlığı, bağlamdan anlam, sözlük, çağrışım ve anlam ilişkisi",
              instruction: "Dört sözcükten anahtar söz varlığına uygun olanları belirle. Her biri için metindeki anlamı, sözlükteki anlamı ve çağrıştırdığı kelimeleri yaz; sonra sözcüklerin birbiriyle ilişkisini açıkla.",
              prompts: ["özgür", "sınırlarını zorlamak", "sıra dışı", "tutku"]
            },
            {
              id: "marti-a03",
              number: "3",
              title: "Metinden kanıtla cevapla",
              format: "Kısa yanıtlı okuduğunu anlama",
              count: "5 soru",
              source: "Martı Jonathan Livingston öyküsü",
              skill: "Açık bilgi bulma, neden-sonuç ve çıkarım",
              instruction: "Her cevabına öyküden en az bir ayrıntı ekle.",
              prompts: [
                "Jonathan’ın sıradan uçuşların ötesine geçmek istediğini gösteren iki davranış nedir?",
                "Bir denemesi başarısız olduğunda yöntemini nasıl değiştirdiğini anlat.",
                "Ailesinin kaygısının kaynağı ile Jonathan’ın önceliği arasındaki fark nedir?",
                "Hangi olay onun uçuş hedefini daha belirgin hâle getirir? Olayın etkisini açıkla.",
                "Sürüden uzak kalması Jonathan’ın öğrenme biçimini nasıl etkiler? Metinden kanıtla."
              ]
            },
            {
              id: "marti-a04",
              number: "4",
              title: "Olay örgüsünü düzenle",
              format: "Serim–düğüm–çözüm ve tutarlılık değerlendirmesi",
              count: "3 bölüm özeti · 3 değerlendirme",
              source: "Martı Jonathan Livingston öyküsü",
              skill: "Metin yapısı, olay akışı, neden-sonuç, tutarlılık",
              instruction: "Üç bölümün her birini kısa biçimde özetle. Ardından aşağıdaki üç yargıyı gerekçelendir.",
              prompts: [
                "Serim: Kişiyi, ortamı ve başlangıçtaki amacı tanıt.",
                "Düğüm: Amaca ulaşırken yaşanan temel güçlüğü ve önemli bir denemeyi yaz.",
                "Çözüm: Öykünün sonunda Jonathan’ın durumunda ne değiştiğini belirt.",
                "Önemli olaylar birbirini hazırlıyor mu? Bir örnekle açıkla.",
                "Bir olayın sonucu sonraki olaya neden oluyor mu? Bir neden-sonuç zinciri kur.",
                "Kişi, zaman ve olay akışında tutarsız bulduğun ya da tutarlı gördüğün bir yeri gerekçelendir."
              ]
            },
            {
              id: "marti-a05",
              number: "5",
              title: "Farklı bakış açılarından sonuç çıkar",
              format: "Problem belirleme ve bakış açısı",
              count: "1 problem · 2 sonuç",
              source: "Martı Jonathan Livingston öyküsü",
              skill: "Problem tanımlama, bakış açısı, çıkarım",
              instruction: "Jonathan’ın yaşadığı zorluğu bir cümleyle tanımla. Sonra iki farklı kişinin bakış açısından çıkarım yap.",
              prompts: [
                "Jonathan’ın aç kalmasına, canının yanmasına veya sürüden ayrı görülmesine yol açan durumu yaz.",
                "Jonathan’ın bakış açısından çıkarılabilecek bir sonucu gerekçesiyle yaz.",
                "Onu seven bir yakının bakış açısından çıkarılabilecek farklı bir sonucu yaz."
              ]
            },
            {
              id: "marti-a06",
              number: "6",
              title: "Çözüm yolları üret ve seç",
              format: "Problem çözme önerileri",
              count: "1 problem · 3 öneri · 1 seçim",
              source: "Martı Jonathan Livingston öyküsü ve sınıf tartışması",
              skill: "Alternatif üretme, uygulanabilirliği değerlendirme, sözlü gerekçe",
              instruction: "Jonathan’ın çevresinden destek alamaması sorununa üç farklı çözüm öner. En uygulanabilir olanı seçip nedenini açıkla.",
              prompts: ["Problemli durumu kısaca özetle.", "Öneri 1", "Öneri 2", "Öneri 3", "Seçtiğin öneri ve gerekçen"]
            },
            {
              id: "marti-a07",
              number: "7",
              title: "Davranışları ölçüte göre sınıflandır",
              format: "İki gruplu sınıflandırma",
              count: "2 grup · her grupta 4 davranış",
              source: "Martı Jonathan Livingston öyküsü",
              skill: "Ölçüt belirleme, sınıflandırma, metinden örnek seçme",
              instruction: "Aşağıdaki davranışları ‘uçuşu günlük gereksinim için kullanma’ ve ‘uçuşu öğrenme/deneme alanı olarak görme’ gruplarına ayır. Her grupta dört davranış olmalı.",
              prompts: [
                "Bir balıkçı teknesini izleyip yiyeceğe ulaşmaya çalışmak",
                "Yiyecek aramıyorken belirli bir manevrayı tekrar etmek",
                "Sürünün alışılmış rotasını izleyerek kıyıya dönmek",
                "Hızını denetlemek için kanat açısını değiştirmek",
                "Günün çoğunu balıkçı teknesinin çevresinde yiyecek arayarak geçirmek",
                "Düşüşün nedenini inceleyip yeni bir yöntem denemek",
                "Uçuşu yalnızca karın doyurmanın aracı saymak",
                "Bir sonraki gün için öğrenilecek bir uçuş hareketi seçmek"
              ]
            },
            {
              id: "marti-a08",
              number: "8",
              title: "Videonun anahtar kelimelerini yakala",
              format: "Dinleme/izleme notu",
              count: "1 konu · 5 anahtar kelime · 1 ilişki açıklaması",
              source: "Kitaptaki QR: ‘Hayat Büyük Bir Okuldur’ videosu",
              sourceUrl: window.THEME1_QR_SOURCES.hayatBuyuk,
              sourceLinkLabel: "‘Hayat Büyük Bir Okuldur’ videosunu aç",
              sourceNotesUrl: "docs/video-analysis/hayat-buyuk-bir-okuldur-gemini-analysis.txt",
              skill: "Dinlediğini/izlediğini anlama, ana fikir, anahtar kelime",
              instruction: "Kitabınızdaki QR içeriğini izledikten sonra cevapla. Video uygulamaya gömülü değildir.",
              prompts: [
                "İçeriğin konusunu tek cümleyle yaz.",
                "İçerikten beş anahtar kelime seç.",
                "Seçtiğin kelimelerden ikisinin ana fikirle ilişkisini açıkla."
              ]
            },
            {
              id: "marti-a09",
              number: "9",
              title: "İçeriği üç ölçüte göre değerlendir",
              format: "Video değerlendirme",
              count: "3 ölçüt",
              source: "Kitaptaki QR: ‘Hayat Büyük Bir Okuldur’ videosu",
              sourceUrl: window.THEME1_QR_SOURCES.hayatBuyuk,
              sourceLinkLabel: "‘Hayat Büyük Bir Okuldur’ videosunu aç",
              sourceNotesUrl: "docs/video-analysis/hayat-buyuk-bir-okuldur-gemini-analysis.txt",
              skill: "Medya okuryazarlığı, ölçüt kullanma, gerekçelendirme",
              instruction: "Her başlık için bir karar ver ve kararını duyduğun/gördüğün bir ayrıntıyla gerekçelendir.",
              prompts: [
                "Başlık, içeriğin ana düşüncesini yansıtıyor mu?",
                "Öğrenme örnekleri konuyu anlamak için yeterli mi; hangi tür bir örnek eklenebilirdi?",
                "Örneklerin sırası izleyenin ilgisini ve anlamasını destekliyor mu?"
              ]
            },
            {
              id: "marti-a10",
              number: "10",
              title: "Öğrenme deneyimini konuşmaya dönüştür",
              format: "Not tablosu ve kısa konuşma",
              count: "2 deneyim türü · 1 konuşma",
              source: "Öğrencinin kendi yaşamı",
              skill: "Konuşma planlama, deneyim aktarma, amaca uygun anlatım",
              instruction: "Biri eğlenceli, biri başkasına örnek olabilecek iki öğrenme deneyimini not et. Birini seçip yaklaşık bir dakikalık konuşma yap.",
              prompts: [
                "Her deneyim için: ne zaman oldu, ne öğrenmeye çalışıyordun, ne yaptın ve sonuç ne oldu?",
                "Seçtiğin deneyim dinleyiciyi eğlendirmek mi, yol göstermek mi? Amacını ve konuşma türünü belirt.",
                "Konuşmanda hangi ayrıntıyı özellikle vurgulayacaksın?"
              ]
            },
            {
              id: "marti-a11",
              number: "11",
              title: "Noktalı virgülün işlevlerini ayırt et",
              format: "Cümleleri gruplama, kural çıkarma, örnek yazma",
              count: "9 cümle · 3 işlev · 3 kural · 3 yeni cümle",
              source: "Özgün örnek cümleler",
              skill: "Noktalama, sınıflandırma, kuralı yeni örneğe aktarma",
              instruction: "Dokuz cümleyi noktalı virgülün üç kullanımına göre üç gruba ayır. Her grup için kuralını yazıp bir yeni örnek cümle kur.",
              prompts: [
                "Atölyede resim, seramik, ebru; sahnede müzik, şiir ve dans çalışmaları vardı.",
                "Kamp çantasına harita, pusula, yağmurluk; mutfak kutusuna tabak, bardak, kaşık kondu.",
                "Araştırma için dergi, kitap, ansiklopedi; sunum için grafik, fotoğraf ve çizelge hazırlandı.",
                "Zil çaldı, öğrenciler sınıfa geçti; öğretmen yoklamayı aldı, dersi başlattı.",
                "Kütüphanede kaynakları taradık, not aldık; eve dönünce planı gözden geçirip düzenledik.",
                "Önce soruyu okudum, anahtar sözcükleri çizdim; sonra kanıtı buldum, cevabımı yazdım.",
                "Öğrencilerden Nehir, Mert, Ela; afişleri zamanında hazırladılar.",
                "Antrenörler Arda, Defne, Selin; çalışma takvimini birlikte düzenlediler.",
                "Doğa gözlem ekibinden Ege, Lara, Can; fotoğrafları ve notları sınıfa sundular.",
                "Yanıtını ‘1–3, 4–6, 7–9’ biçiminde grupla; ardından her kullanım için bir kural ve örnek yaz."
              ]
            },
            {
              id: "marti-a12",
              number: "12",
              title: "Bir e-postaya uygun yanıt yaz",
              format: "Kaynak e-postayı okuyup cevap e-postası oluşturma",
              count: "1 kaynak mesaj · 1 yanıt",
              source: "Aşağıdaki özgün kısa e-posta",
              skill: "Yazma amacı, gerekçe, çözüm önerisi, hitap ve kapanış",
              instruction: "Bir gençlik merkezi yöneticisi olduğunuzu düşünün. E-postayı yanıtlayın; önerinizin nasıl uygulanacağını açık ve nazik biçimde belirtin.",
              sourceText: "Konu: Hafta Sonu Sessiz Çalışma Alanı\n\nMerhaba,\nMahallemizdeki gençlik merkezinin çalışma salonu hafta sonları kapalı oluyor. Sınavlara hazırlanan ve kitap okumak isteyen öğrenciler için cumartesi sabahları iki saat sessiz çalışma alanı açılması mümkün mü? Kullanıcılar salonu düzenli bırakmayı ve sessizlik kurallarına uymayı kabul edebilir.\n\nSaygılarımla,\nAda",
              prompts: ["E-postanın konusu ve yanıtınızın amacı", "Gerekçeniz ve uygulanabilir çözümünüz", "Uygun selamlama, hitap ve kapanış içeren tam yanıt"]
            }
          ]
        }
      ]
    },
    {
      weekId: 3,
      label: "3–4. haftalar",
      title: "Gençliğin Kıymeti · Sen Sor O Yanıtlasın",
      pages: "PDF s. 30–50",
      inventoryCount: "8 + 10 numaralı etkinlik; ayrıca neden-sonuç metin yapısı çalışması",
      groups: [
        {
          title: "Gençliğin Kıymeti · 8 etkinlik",
          activities: [
            {
              id: "genclik-a01", number: "1", title: "Sözcükleri bağlamdan çöz", format: "Bağlam tahmini ve sözlük kontrolü", count: "4 kelime grubu", source: "‘Gençliğin Kıymeti’ denemesi", skill: "Söz varlığı ve bağlamdan anlam", instruction: "Her kelime için metindeki bağlamı dikkate alarak anlam tahmini yaz; sonra sözlük anlamıyla karşılaştır.", prompts: ["hüsran", "ihtimam", "dağarcık", "umursamazlık"]
            },
            {
              id: "genclik-a02", number: "2", title: "Düşünceyi geliştirme yollarını tanı", format: "Dört örneği sınıflandırma ve anlatıma katkısını açıklama", count: "4 yol · 1 açıklama", source: "Özgün örnek cümleler; tanık örneği kurmacadır", skill: "Tanık gösterme, benzetme, örneklendirme, karşılaştırma", instruction: "Her cümlede baskın olan yolu seç. Ardından bu yolların bir düşünceyi nasıl güçlendirebildiğini açıkla. İlk cümle, bu tekniği örneklemek için yazılmış kurmaca bir görüştür; gerçek bir alıntı değildir.", prompts: ["Bir eğitim araştırmacısının görüşü, düzenli okumanın düşünme becerilerini beslediğini vurguluyor.", "Bir hedefe emek vermek, her gün sulanan bir fidanı büyütmeye benzer.", "Bir öğrenci kitap okuyarak, enstrüman öğrenerek veya takım çalışmasına katılarak kendini geliştirebilir.", "Plansız çalışma dağınık ilerler; küçük hedeflere ayrılan çalışma daha kolay izlenir."]
            },
            {
              id: "genclik-a03", number: "3", title: "Denemenin düşüncesini yorumla", format: "Sözlü kısa yanıt", count: "5 soru", source: "‘Gençliğin Kıymeti’ denemesi", skill: "Ana düşünce, benzetme, çıkarım ve kişisel bağlantı", instruction: "Cevaplarında denemenin düşünce akışından bir dayanak göster.", prompts: ["Metinde ilkbahar imgesi insan yaşamının hangi dönemini anlatmak için kullanılıyor?", "Nehir benzetmesi zaman hakkında hangi düşünceyi destekliyor?", "Yazar, gençlikte edinilen alışkanlıkların ileriki yaşlara etkisini nasıl kuruyor?", "Bahçıvan ve meyve imgesindeki sorumluluğu iki farklı kişi açısından açıkla.", "Kendi yaşamında geleceğe hazırlık için bugün atabileceğin bir adımı gerekçelendir."]
            },
            {
              id: "genclik-a04", number: "4", title: "Görsel ve videodaki ortak mesajı bul", format: "Görsel–video ilişkilendirme", count: "2 görev", source: "Kitaptaki ‘Bir İyilik Hikâyesi’ QR videosu ve fotoğrafları", sourceUrl: window.THEME1_QR_SOURCES.birIyilikHikayesi, sourceLinkLabel: "‘Bir İyilik Hikâyesi’ videosunu aç", skill: "Görsel okuma, ortak mesaj, dinleme/izleme", instruction: "Kitabınızdaki QR içeriğini izleyin; uygulama videoyu barındırmaz.", prompts: ["Bir fotoğraf ile videodaki bir an arasında nasıl bir anlam bağı kurdun?", "Fotoğrafları çeken kişi ile video hazırlayanların ortak iletisi ne olabilir? Kanıtla."]
            },
            {
              id: "genclik-a05", number: "5", title: "İkilemelerin yazımını denetle", format: "Doğru/yanlış işaretleme ve düzeltme", count: "10 cümle", source: "Özgün örnek cümleler", skill: "İkilemelerin yazımı ve düzeltme", instruction: "Her cümlenin yanına D veya Y yaz. Yanlış yazılan ikilemenin doğru biçimini belirt.", prompts: ["Ara sıra kısa bir mola vermek dikkatimizi tazeleyebilir.", "Elif, arkadaşıyla doğru-dürüst konuşup sorunu çözdü.", "Yeni kavramları tekrar tekrar gözden geçirdi.", "Çoluk-çocuk hep birlikte kitaplık için kutu taşıdı.", "Takım arkadaşları omuz omuza çalıştı.", "Planını günden güne geliştirdi.", "Öğrenciler irili ufaklı yaprakları sınıflandırdı.", "Çantamızı baştan başa gözden geçirip eksikleri tamamladık.", "Arada sırada değil, düzenli olarak notlarını yeniledi.", "Gönüllüler proje boyunca el-ele çalıştı."]
            },
            {
              id: "genclik-a06", number: "6", title: "Üç noktanın görevini belirle", format: "Noktalama işlevi sınıflandırma ve örnek yazma", count: "4 örnek · 2 yeni cümle", source: "Özgün diyalog ve cümleler", skill: "Üç noktanın işlevleri, noktalama", instruction: "Örnekleri eksik bırakılan yanıt, seslenme/vurgu veya tamamlanmamış anlatım işlevlerinden uygun olana ayır; sonra iki farklı işlev için yeni cümle yaz.", prompts: ["— Bu kararı sen mi verdin? — Ben…", "Duru!.. Bir dakika, seni bekliyoruz!", "Yolun sonunda kapı açıldı ve karşısında…", "— Kiminle konuşmak istiyorsun? — Öğretmenimle…"]
            },
            {
              id: "genclik-a07", number: "7", title: "Hedefleri karşılaştıran sunum hazırla", format: "Araştırma notu ve sözlü sunum", count: "3 akran · 3 yetişkin · 1 sunum", source: "Yakın çevreyle kısa görüşmeler", skill: "Bilgi toplama, karşılaştırma, çoklu ortam ve konuşma", instruction: "Üç akran ve üç yetişkinle görüş. Önümüzdeki beş yıl için hedeflerini ve bu hedeflere yönelik çalışmalarını not et; benzerlik/farklılıkları bir tablo ya da şemayla sun.", prompts: ["Görüşme notları: hedef ve hedefe yönelik çalışma", "Gençler ve yetişkinler arasındaki iki benzerlik ve iki fark", "Sunumun ana düşüncesi ve kullanacağın görsel/şema"]
            },
            {
              id: "genclik-a08", number: "8", title: "Kendini beş ölçüte göre değerlendir", format: "Ölçüt listesi ve kısa değerlendirme yazısı", count: "5 ölçüt · 1 yazı", source: "Kendi son iki yıllık deneyimin", skill: "Öz değerlendirme, örnekle gerekçelendirme, yazma", instruction: "Ortaokul yıllarında gelişimi destekleyecek beş ölçüt oluştur. Son iki yıldan örneklerle kendini değerlendir.", prompts: ["Ölçüt 1", "Ölçüt 2", "Ölçüt 3", "Ölçüt 4", "Ölçüt 5", "Her ölçüt için yaşamından örnek ve ulaştığın sonuç"]
            }
          ]
        },
        {
          title: "Metin yapısı · neden-sonuç uygulaması",
          activities: [
            {
              id: "cause-effect-a01", number: "Ek", title: "Kısa metindeki neden-sonuç zincirini kur", format: "Kısa kaynak metin ve grafik düzenleyici", count: "1 neden-sonuç zinciri · 3 sonuç", source: "Özgün kısa bilgilendirici metin", skill: "Neden-sonuç ilişkisi, önemli bilgiyi düzenleme, özetleme", instruction: "Kaynak metni ayrı okuyun. Bir başlangıç nedeni, üç sonuç ve zincirdeki bağlantı ifadelerini not edin.", sourceText: "Mahalle kitaplığı haftada iki akşam daha geç kapanmaya başladı. Sessiz çalışma saatleri sayesinde öğrenciler ödevlerini tamamlayabildi ve gönüllüler kaynak bulmalarına yardım etti. Bu kolaylık, araştırma kulübüne katılanların sayısını artırdı. Kulüp üyeleri de yeni gelenlere kitapları tanıttı; böylece ziyaretçiler aradıkları kaynağa daha çabuk ulaştı.", prompts: ["Başlangıç nedeni", "Sonuç 1 → bu sonucun sonraki adıma etkisi", "Sonuç 2 → zincirin devamı", "Sonuç 3", "Metindeki iki neden-sonuç bağlantı ifadesi", "Zinciri 3 cümleyle özetle"]
            }
          ]
        },
        {
          title: "Sen Sor O Yanıtlasın · 10 etkinlik",
          activities: [
            {
              id: "sport-a01", number: "1", title: "Altı kelimeyi bağlamdan tahmin et", format: "Dinleme notu ve sözlük kontrolü", count: "6 kelime grubu", source: "Kitaptaki Yiğit Caner Aydın QR/video söyleşisi", sourceUrl: window.THEME1_QR_SOURCES.yigitCanerAydin, sourceLinkLabel: "Yiğit Caner Aydın söyleşisini aç", skill: "Dinleme/izleme ve söz varlığı", instruction: "Videoda anlamını bilmediğin altı kelimeyi not et; her birinin anlamını bağlamdan tahmin edip kaynakla doğrula. Video uygulamaya gömülü değildir.", prompts: ["Kelime 1–6: duyduğun bağlam, tahminin ve doğruladığın anlam"]
            },
            {
              id: "sport-a02", number: "2", title: "Söyleşiyi beş soruyla çözümle", format: "Dinlediğini anlama ve yorum", count: "5 soru", source: "Kitaptaki Yiğit Caner Aydın QR/video söyleşisi", sourceUrl: window.THEME1_QR_SOURCES.yigitCanerAydin, sourceLinkLabel: "Yiğit Caner Aydın söyleşisini aç", skill: "Açık bilgi, amaç, yorum ve kişisel tepki", instruction: "Her cevabını videoda duyduğun ya da gördüğün bir ayrıntıyla destekle.", prompts: ["Sporcunun hedefini sürdürmesine yardım eden bir alışkanlık neydi?", "Karşılaştığı bir engel, çalışma planını nasıl değiştirmiş olabilir?", "Söyleşide başarıyı açıklayan hangi düşünce sende karşılık buldu?", "İçeriği hazırlayanlar izleyicinin hangi konuda düşünmesini istiyor olabilir?", "Söyleşiden aklında kalan bir anı seç; sende oluşturduğu düşünceyi açıkla."]
            },
            {
              id: "sport-a03", number: "3", title: "Duygu ve kişilik çıkarımını kanıtla", format: "Duygu çıkarımı ve kanıt tablosu", count: "1 duygu çıkarımı · 4 kanıt/özellik eşleştirmesi", source: "Video söyleşisi", sourceUrl: window.THEME1_QR_SOURCES.yigitCanerAydin, sourceLinkLabel: "Yiğit Caner Aydın söyleşisini aç", skill: "Beden dili/ses tonu, kanıt, kişilik özelliği çıkarma", instruction: "Söyleşideki sözlerden, davranışlardan ya da ses tonundan kanıt seç. Kanıtla desteklenmeyen özelliği yazma.", prompts: ["Anlatılan bir anıda sporcunun hissediyor olabileceği duygu ve iki kanıt", "Kanıt 1 → kişilik özelliği → bu bağlantının nedeni", "Kanıt 2 → kişilik özelliği → bu bağlantının nedeni", "Kanıt 3 → kişilik özelliği → bu bağlantının nedeni", "Kanıt 4 → kişilik özelliği → bu bağlantının nedeni"]
            },
            {
              id: "sport-a04", number: "4", title: "Yazı, ses ve görüntünün görevini incele", format: "Doğru/yanlış ve kanıt", count: "4 yargı", source: "Video söyleşisinin yazı, ses ve görüntü bileşenleri", sourceUrl: window.THEME1_QR_SOURCES.yigitCanerAydin, sourceLinkLabel: "Yiğit Caner Aydın söyleşisini aç", skill: "Çoklu ortam okuryazarlığı, kanıta dayalı değerlendirme", instruction: "Her yargı için D/Y seç ve videodan bir örnek ver.", prompts: ["Ekrandaki soru yazıları, konuşmanın hangi konuya yöneldiğini gösterebilir.", "Konuşmacının yüz ifadesi ve ses tonu duyguya ilişkin ipucu taşıyabilir.", "Bir bölümde yazı görünmesi, ses ve görüntünün anlam katkısını ortadan kaldırır.", "Yazı, ses ve görüntü aynı mesajı destekleyecek biçimde birlikte kullanılabilir."]
            },
            {
              id: "sport-a05", number: "5", title: "Spor yaşamının iki dönemini karşılaştır", format: "Önce/sonra karşılaştırma tablosu", count: "2 dönem · 4 karşılaştırma boyutu", source: "Video söyleşisi", sourceUrl: window.THEME1_QR_SOURCES.yigitCanerAydin, sourceLinkLabel: "Yiğit Caner Aydın söyleşisini aç", skill: "Benzerlik ve farklılıkları düzenleme, karşılaştırma", instruction: "Sporcunun millî takıma katılmadan önceki ve sonraki dönemini dört boyutta karşılaştır.", prompts: ["Hedefler", "Günlük çalışmalar", "Karşılaştığı sorumluluklar", "Başarıyı değerlendirme biçimi", "İki benzerlik ve iki farklılık"]
            },
            {
              id: "sport-a06", number: "6", title: "Önemli bilgileri kısa özete dönüştür", format: "Önemli/önemsiz bilgi ayırma ve özet", count: "1 özet", source: "Video söyleşisi", sourceUrl: window.THEME1_QR_SOURCES.yigitCanerAydin, sourceLinkLabel: "Yiğit Caner Aydın söyleşisini aç", skill: "Önemli bilgiyi seçme, sıralama, özetleme", instruction: "Önce gerekli olmayan ayrıntıları ayır. Sonra içeriğin akışını koruyarak 4–5 cümlelik bir özet yaz.", prompts: ["Önemli bilgiler", "Özet (4–5 cümle)"]
            },
            {
              id: "sport-a07", number: "7", title: "Şiirin anlamını ve ahengini incele", format: "Söz sanatı, dize/kıta, hece ve ses incelemesi", count: "2 şiir · 3 biçim ölçütü", source: "PDF s. 47’deki iki şiir; ayrıca uygulamadaki ‘Ağaç ve Sen’ serbest okuma şiiri", skill: "Şiir çözümleme, söz sanatı, ölçü ve ahenk", instruction: "Önce kitapta s.47’deki iki şiiri kullan. İstersen uygulamadaki ‘Ağaç ve Sen’ şiirinde aynı incelemeyi ek çalışma olarak yap.", prompts: ["Her şiirde bulduğun bir söz sanatını ve anlam katkısını yaz.", "İkinci şiirde dize ve kıta düzenini belirt.", "İkinci şiirde iki dizedeki hece sayısını ve ortak sesleri incele.", "Hece ve ses tekrarlarının şiirin ahengine katkısını açıkla."]
            },
            {
              id: "sport-a08", number: "8", title: "Bir erişilebilirlik sorununa çözüm öner", format: "Hazırlıklı konuşma", count: "1 konuşma · 1 sorun · 3 çözüm", source: "Öğrencinin çevre gözlemi ve kısa araştırması", skill: "Problem tanımı, neden/etki, gerekçeli çözüm, sunum", instruction: "Okul veya mahallede özel gereksinimli bireylerin karşılaşabileceği bir engel seç. En uygulanabilir öneriyi özellikle vurgula.", prompts: ["Sorunun tanımı", "İki olası neden ve günlük yaşama iki etkisi", "Üç çözüm önerisi", "En uygulanabilir çözüm ve gerekçesi", "Konuşmanın başlangıç ve kapanış cümleleri"]
            },
            {
              id: "sport-a09", number: "9", title: "Noktalı virgülün üç işlevini uygula", format: "İşlev eşleştirme ve özgün cümle yazma", count: "3 örnek · 3 yeni cümle", source: "Özgün örnek cümleler", skill: "Noktalı virgül, dil bilgisi ve yazma", instruction: "Her cümlenin kullanım işlevini belirt; ardından aynı üç işleve uygun yeni birer cümle yaz.", prompts: ["Okulda Ece, Mert ve Can şiir; Duru, Alp ve Nehir sunum hazırladı.", "Sabah araştırdık, kaynakları seçtik; öğleden sonra notları düzenleyip paylaştık.", "Doğa gözlem ekibinden Lara, Deniz, Ozan; fotoğrafları ve çizelgeleri sergilediler.", "Üç işlev için kendi cümlelerin"]
            },
            {
              id: "sport-a10", number: "10", title: "Bir arkadaşın için gelecek mesleği yazısı oluştur", format: "Giriş–gelişme–sonuç yazısı", count: "1 metin · 3 bölüm", source: "Akran hakkındaki gözlem ve deneyim", skill: "Betimleme, kanıt, neden-sonuç ve yazılı anlatım", instruction: "Bir arkadaşının güçlü yönlerinden yola çıkarak ileride başarılı olabileceği bir alan hakkında yaz. Her bölümün görevini koru.", prompts: ["Giriş: kişiyi kısaca tanıt ve meslek tahminini belirt.", "Gelişme: gözlem/deneyimlerinden en az iki kanıtla tahminini destekle.", "Sonuç: bu alanda başarılı olabileceğine dair net bir yargı yaz."]
            }
          ]
        }
      ]
    },
    {
      weekId: 5,
      label: "5–6. haftalar",
      title: "Adını Göklere Yazdıran Çocuk",
      pages: "PDF s. 51–71",
      inventoryCount: "8 numaralı etkinlik; üretim, konuşma ve 8 soruluk tema sonu ölçmesi",
      groups: [
        {
          title: "Adını Göklere Yazdıran Çocuk · 8 etkinlik",
          activities: [
            {
              id: "adiny-a01", number: "1", title: "Öyküyü beş soruyla yorumla", format: "Kısa yanıtlı okuduğunu anlama", count: "5 soru", source: "Kaoru İkeya öyküsü", skill: "Açık bilgi, çıkarım, ders çıkarma", instruction: "Cevaplarına öyküdeki olaylardan dayanak ekle.", prompts: ["Kaoru’nun gökyüzüne ilgisini sürdürdüğünü gösteren iki seçim nedir?", "Kendi teleskopunu yapabilmek için hangi bilgi ve malzemeleri bir araya getirdi?", "Minoru Honda’nın tavsiyesi Kaoru’nun gözlem biçiminde neyi değiştirdi?", "İş ve gözlemi birlikte sürdürmesi onun planlılığı hakkında ne düşündürüyor?", "Öykünün sonunda değişen bir durumu ve bunun nedenini açıkla."]
            },
            {
              id: "adiny-a02", number: "2", title: "Davranıştan kişilik özelliğine ulaş", format: "Kanıt–özellik eşleştirmesi", count: "4 kanıt", source: "Kaoru İkeya öyküsü", skill: "Metinden kanıt, karakter çözümleme, gerekçe", instruction: "Dört davranış seç. Her birinin yanına desteklediği kişilik özelliğini ve bağlantının nedenini yaz.", prompts: ["Davranış/kanıt 1 → özellik → gerekçe", "Davranış/kanıt 2 → özellik → gerekçe", "Davranış/kanıt 3 → özellik → gerekçe", "Davranış/kanıt 4 → özellik → gerekçe"]
            },
            {
              id: "adiny-a03", number: "3", title: "Kaoru ile Yiğit Caner Aydın’ı karşılaştır", format: "Öykü–video karşılaştırma tablosu", count: "2 kişi · 4 boyut · 2 benzerlik · 2 farklılık", source: "Kaoru İkeya öyküsü ve Yiğit Caner Aydın video söyleşisi", sourceUrl: window.THEME1_QR_SOURCES.yigitCanerAydin, sourceLinkLabel: "Yiğit Caner Aydın söyleşisini aç", videoSource: true, skill: "Karşılaştırma, sentez, kanıt seçme", instruction: "Öyküden ve kitaptaki video söyleşisinden birer kanıt kullanarak karşılaştır. Video uygulamaya gömülü değildir.", prompts: ["Başlangıçtaki amaçları", "Karşılaştıkları engeller", "Engellere verdikleri tepkiler", "Öğrenme/çalışma yöntemleri", "İki benzerlik ve iki farklılık"]
            },
            {
              id: "adiny-a04", number: "4", title: "Öykü bölümleri için ölçüt oluştur", format: "Dört ölçüt grubu ve metin değerlendirmesi", count: "Serim, düğüm, çözüm, bağlantılar: 4 grup", source: "Kaoru İkeya öyküsü", skill: "Öykü yapısı, olay örgüsü, tutarlılık", instruction: "İyi bir öyküde her bölümde bulunması gereken bir ölçüt yaz. Sonra Kaoru öyküsünü ölçütlerinle değerlendir.", prompts: ["Serim bölümü ölçütü", "Düğüm bölümü ölçütü", "Çözüm bölümü ölçütü", "Bölümler arası bağlantı ölçütü", "Öyküden bir örnekle güçlü bulduğun ya da geliştireceğin yön"]
            },
            {
              id: "adiny-a05", number: "5", title: "Ali Kuşçu dinlemesinden yedi not tamamla", format: "Dinlerken boşluk doldurma", count: "7 bilgi", source: "Kitaptaki Ali Kuşçu QR dinleme içeriği", sourceUrl: window.THEME1_QR_SOURCES.aliKuscu, sourceLinkLabel: "Ali Kuşçu dinleme kaydını aç", skill: "Dinleme, önemli bilgi seçme, not alma", instruction: "Kitabınızdaki QR içeriğini dinleyin. Uygulama bu kaydı barındırmaz; aşağıdaki boşlukları dinlediklerinize göre tamamlayın.", prompts: ["Ali Kuşçu’nun doğduğu şehir: ______", "Ailesinin ‘Kuşçu’ adını almasıyla ilişkili meslek: ______", "Uluğ Bey’den aldığı bilim alanları: ______", "Tamamlanmasına katkı verdiği astronomi tablosunun adı: ______", "Uluğ Bey’in ölümünden sonra yaptığı hac yolculuğunda uğradığı şehir: ______", "Uzun Hasan’ın ona önerdiği diplomatik görev: ______", "Fatih Camisi için yaptığı zaman ölçme aracı: ______"]
            },
            {
              id: "adiny-a06", number: "6", title: "Bilgileri giriş–gelişme–sonuçta düzenle", format: "Sekiz bilgiyi üç bölüme ayırma", count: "8 bilgi · 3 bölüm · 1 tutarlılık açıklaması", source: "Ali Kuşçu dinleme içeriği", sourceUrl: window.THEME1_QR_SOURCES.aliKuscu, sourceLinkLabel: "Ali Kuşçu dinleme kaydını aç", skill: "Metin yapısı, kronoloji, bilgi düzenleme", instruction: "Aşağıdaki bilgileri dinleme içeriğindeki akışa göre giriş, gelişme veya sonuç grubuna yerleştir. Bölümler arasındaki tutarlılığı bir cümleyle açıkla.", prompts: ["Ailesi Semerkant’taki bilim çevreleriyle ilişkiliydi.", "Uluğ Bey ve çevresindeki bilim insanlarından eğitim aldı.", "Gözlemevi çalışmalarında sorumluluk üstlendi.", "Uluğ Bey’in ölümünden sonra Semerkant’tan ayrıldı.", "Hac yolculuğu sırasında Tebriz’e uğradı.", "Fatih Sultan Mehmet’in daveti üzerine İstanbul’a geldi.", "Ayasofya Medresesi’nde görev aldı ve farklı alanlarda eserler yazdı.", "Fatih Camisi için güneş saati hazırladı.", "Bu bilgilerin hangi sırayla ilerlemesi, anlatımın tutarlılığını nasıl sağlıyor?"]
            },
            {
              id: "adiny-a07", number: "7", title: "Başarı üzerine kanıtlı tartışma yap", format: "İki görüşten birini savunma ve karşı görüşü yanıtlama", count: "2 görüş · 1 tartışma", source: "Sınıf tartışması ve günlük yaşam örnekleri", skill: "Sav geliştirme, güvenilir kanıt, karşı görüşe yanıt", instruction: "Şu iki görüşten birini seçin; günlük yaşamdan bir örnek ve güvenilir bir kaynaktan destek hazırlayın. Karşı görüşteki doğru noktayı da adil biçimde özetleyin.", prompts: ["Görüş A: Başarıyı başlatan en güçlü etken merak ve gözlem becerisidir.", "Görüş B: Başarıyı kalıcı kılan en güçlü etken eğitim ve düzenli çalışmadır.", "Savın, iki dayanağın ve karşı görüşe vereceğin saygılı yanıt"]
            },
            {
              id: "adiny-a08", number: "8", title: "İkna paragrafı planla ve yaz", format: "Dört parçalı plan ve ikna paragrafı", count: "4 plan alanı · 1 paragraf", source: "Günlük yaşam / okul kulübü önerisi", skill: "İstek, gerekçe, itiraza yanıt, fayda, ikna edici yazma", instruction: "Okulda ayda bir gökyüzü gözlem akşamı düzenlenmesi için okul yönetimine yazacağınızı düşünün. Planı doldurup paragrafınızı yazın.", prompts: ["İstek veya öneri", "Öneri için gerekçeler", "Olası çekinceye vereceğin yanıt", "Gerçekleşmesinin sağlayacağı faydalar", "Selamlama ve kapanış içeren ikna paragrafı"]
            }
          ]
        },
        {
          title: "İkna paragrafı atölyesi · üretim · konuşma",
          activities: [
            {
              id: "adiny-workshop", number: "Ek", title: "İki yeni durumda ikna planı hazırla", format: "Grup çalışması: plan, taslak, gözden geçirme", count: "2 durum · 4 plan alanı", source: "Aile ve okul yaşamına ilişkin özgün durumlar", skill: "İkna edici yazma, iş birliği, düzenleme", instruction: "Her durum için aynı dört parçalı planı kullanın; bir taslak yazıp anlaşılır olana kadar gözden geçirin.", prompts: ["Ailenizi hafta sonu bilim şenliğine katılmaya ikna edin.", "Öğretmeninizi sınıfta ayda bir öğrenci kitap/araştırma tanıtımı saati ayırmaya ikna edin.", "Her durum için: öneri, gerekçe, olası itiraza yanıt, beklenen fayda"]
            },
            {
              id: "adiny-production", number: "Üretim", title: "Gelecekteki bir hedefe giden yolu öyküleştir", format: "Dört aşamalı yaratıcı yazma", count: "4 olay ipucu · 1 öykü", source: "Öğrencinin gelecek planı ve hayal gücü", skill: "Planlama, öz denetim, öyküleme", instruction: "Aşağıdaki dört aşamayı kullanarak on yıl sonraki yaşamına giden yolu anlatan özgün bir öykü yaz.", prompts: ["Bir hedefi ilk kez ciddiye aldığın an", "Küçük adımları takvime dönüştürdüğün dönem", "Bir engelle karşılaşıp yöntemini değiştirdiğin an", "Sonucu değerlendirip yeni hedef belirlediğin bölüm"]
            },
            {
              id: "adiny-speaking", number: "Konuşma", title: "Durumlardan birini seçip çözüm yolunu anlat", format: "Seçmeli hazırlıklı konuşma", count: "2 durumdan 1 seçim", source: "Gelecek planı veya grup projesi", skill: "Konuşma planlama, örnek, vurgu ve beden dili", instruction: "Bir durumu seç. Amacını, konuşma süreni ve örneklerini belirle; bir dakikalık konuşma yap.", prompts: ["Kendi uzun vadeli hedefin için izlediğin yolu ve motivasyonunu anlat.", "Bir grup projesini planlarken görevleri ve arkadaşlarının motivasyonunu nasıl düzenleyeceğini anlat."]
            }
          ]
        },
        {
          title: "Tema sonu ölçme · 8 özgün soru",
          activities: [
            {
              id: "adiny-review", number: "1–8", title: "Tema becerilerini karışık biçimde gözden geçir", format: "Kısa metin, seçimli soru, dinleme, konuşma ve yazma", count: "8 soru", source: "Özgün kısa metin + kitaptaki Ali Kuşçu QR içeriği", skill: "Okuma, söz varlığı, dinleme, konuşma, dil bilgisi ve yazma", instruction: "Önce aşağıdaki özgün kısa metni oku. Sonra sekiz görevi tamamla; QR gerektiren 4. görev için kitabındaki içeriği kullan.", sourceText: "Ece, dönem başında araştırma ödevlerini son güne bırakıyordu. Bir gün aynı haftaya üç sunumun denk geldiğini fark edince işlerini küçük parçalara ayırdı ve her akşam kısa bir çalışma saati belirledi. Bir arkadaşının önerisiyle kaynaklarını konu başlıklarına göre düzenledi. Böylece hazırlık sırasında aradığı bilgiyi daha çabuk buldu; sunumdan önce prova yapmaya da zaman ayırdı. Ece, planını her hafta gözden geçirip yetişmeyen işler için yeni bir sıra oluşturdu.", prompts: ["1. Metne göre Ece çalışma biçiminde hangi değişikliği yaptı? Bir ayrıntıyla açıkla.", "2. Ana düşünceyi seç: A) Son güne bırakmak işleri kolaylaştırır. B) Planı gözden geçirmek çalışmayı daha düzenli kılabilir. C) Kaynak düzenlemek sunumla ilişkisizdir. D) Prova yapmak zaman kaybıdır.", "3. ‘İşlerini küçük parçalara ayırdı’ ifadesi metinde nasıl bir çalışma yöntemini anlatıyor? Kendi sözlerinle açıkla.", "4. Ali Kuşçu dinleme içeriğinden zaman sırasını gösteren bir bilgi, bir önemli buluş ve ana mesajı not et.", "5. ‘Planlı çalışmanın öğrenmeye katkısı’ üzerine örnek ve gerekçe içeren kısa bir konuşma yap.", "6. Metindeki bir neden-sonuç zincirini kullanarak planlı çalışmanın yararı üzerine kısa bir paragraf yaz.", "7. Noktalı virgülün üç farklı işlevini ayrı ayrı belirt ve her biri için özgün bir cümle yaz.", "8. Şu başlangıcı kullanarak iki bölüm yaz: ‘Bilim kulübünün sunum günü yaklaşırken, kullandığımız düzenek çalışmayı bıraktı…’ Düğüm ve çözüm bölümlerini tutarlı biçimde tamamla."]
            }
          ]
        }
      ]
    }
  ]
};
