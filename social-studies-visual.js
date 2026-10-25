/*
 * Sosyal Bilgiler 3. tur katmanı — haftalık GÖRSEL OKUMA adımı, öğrenme alanı sonu
 * "Kendimi Değerlendiriyorum" adımı ve her hafta için "Gelecek haftaya hazırlık" cümlesi.
 *
 * Görseller koda gömülü çizimlerdir (grafik / gazete haberi / kronoloji şeridi); ayrı
 * görsel dosyası gerektirmez. Veriler özgündür, ders kitabından kopyalanmamıştır.
 * Görsel, sorunun yanıtını metin olarak vermez; öğrenci veriyi okuyup çıkarım yapar.
 */
(function () {
  "use strict";

  const choice = (id, label, options, answer, explanation, hint) => ({
    id, label, kind: "choice",
    options: options.map((text, index) => ({ id: `option-${index + 1}`, label: text })),
    answer: `option-${answer + 1}`,
    explanation, hint,
  });
  const write = (id, label, placeholder, minChars = 20) => ({ id, label, placeholder, kind: "textarea", minChars });
  const check = (id, label, options) => ({ id, label, kind: "checklist", options });

  const visualStep = (id, sourceStyle, title, prompt, visual, fields, hint) => ({
    id, sourceStyle, format: sourceStyle, title, prompt, visual, fields, hint,
  });
  const reviewStep = (id, sourceStyle, title, prompt, fields, hint) => ({
    id, sourceStyle, format: sourceStyle, title, prompt, fields, hint,
  });

  const weeks = {
    1: {
      nextPrep: "Gelecek hafta iletişim sürecini ve iletişim türlerini inceleyeceğiz; bu hafta gözlemlediğin iki iletişim örneğini yanında getir.",
      visual: visualStep(
        "v1-communication-chart",
        "Görsel okuma · grafik",
        "Grafik: bir sınıfta bir haftada kurulan iletişim yolları",
        "Grafiği incele; sütunlar bir hafta boyunca kaydedilen iletişim sayısını gösteriyor. Önce veriyi oku, sonra verinin göstermediği yönü düşün.",
        {
          type: "chart",
          title: "Bir haftada kurulan iletişim yolları",
          unit: "kayıt sayısı",
          source: "Sınıf gözlem defteri, örnek veri (özgün)",
          items: [
            { label: "Yüz yüze konuşma", value: 46 },
            { label: "Yazılı mesaj", value: 32 },
            { label: "Sesli arama", value: 14 },
            { label: "E-posta", value: 8 },
          ],
          note: "Toplam 100 kayıt. Sözsüz iletişim ayrı bir kayıt olarak tutulmamıştır.",
        },
        [
          choice("v1q1", "Grafikten hangi sonuç doğrudan çıkarılabilir?", [
            "Yüz yüze konuşma, kaydedilen yollar içinde en sık kullanılandır.",
            "Sözsüz iletişim bu sınıfta hiç kullanılmamaktadır.",
            "E-posta kullanımı sesli aramadan daha yaygındır.",
          ], 0, "Sütun uzunlukları yalnızca kayıt sayısını gösterir; en uzun sütun yüz yüze konuşmadır.", "Önce en uzun ve en kısa sütunu karşılaştır."),
          write("v1q2", "Grafik neden sözsüz iletişimi göstermiyor? Bir örnekle açıkla.", "Örn. Yüz yüze konuşurken kullanılan jest ve yüz ifadesi ayrı bir kayıt olarak tutulmadığı için…"),
        ],
        "Grafikte görünen sayı, görünmeyen davranışı yok saymak anlamına gelmez.",
      ),
    },

    2: {
      nextPrep: "Gelecek hafta empati ve ben dilini çalışacağız; bu hafta bir iletiyi farklı yollarla iletme denemesi yap.",
      visual: visualStep(
        "v2-news-notice",
        "Görsel okuma · gazete haberi",
        "Haber: duyuru mesajla gitti, iki öğrenci değişikliği öğrenemedi",
        "Haberi oku; iletişim sürecindeki hangi unsurun eksik kaldığını belirle.",
        {
          type: "news",
          masthead: "OKUL GAZETESİ",
          source: "Okul haber bülteni · örnek olay (özgün)",
          headline: "Gezi saati değişti: duyuru mesajla gitti, iki öğrenci sabah okulda bekledi",
          lead: "Sınıf temsilcisi gezi saatindeki değişikliği akşam saat 21.00’de gruba yazdı. Telefonu kapalı olan iki öğrenci mesajı görmedi ve ertesi sabah eski saatte okula geldi. Öğretmen değişikliği öğrenince öğrencilerle birlikte yeni bir duyuru planı yaptı: yazılı mesaj, sözlü hatırlatma ve sınıf panosuna asılan not.",
        },
        [
          choice("v2q1", "Haberin anlattığı olayda iletişim sürecinde en çok hangi unsur eksik kalmıştır?", [
            "İletinin kaynağı",
            "Alıcının iletiyi alıp almadığını gösteren geri bildirim",
            "Kullanılan dilin kuralları",
          ], 1, "Gönderen mesajı yazdı; ancak herkesin alıp anladığını kontrol eden bir geri bildirim yoktu.", "Gönderen ile alan arasındaki onay adımını düşün."),
          write("v2q2", "Aynı duyuruyu iki farklı iletişim yoluyla nasıl kurardın? Anlaşıldığını nasıl kontrol ederdin?", "Örn. Yazılı mesaj + sınıfta sözlü hatırlatma; herkesin okuduğunu…"),
        ],
        "Birden fazla yol kullanmak, tek yolun ulaşmadığı kişiye ulaşmayı sağlar.",
      ),
    },

    3: {
      nextPrep: "Gelecek hafta anlaşmazlık çözümünü çalışacağız; bu hafta bir grupta kimin ne kadar söz aldığını gözlemle.",
      visual: visualStep(
        "v3-chart-turn-taking",
        "Görsel okuma · grafik",
        "Grafik: bir grup çalışmasında söz alma sayıları",
        "Grafik beş öğrencinin bir ders saatindeki söz alma sayılarını gösteriyor. Veriyi oku, sonra verinin arkasındaki durumu yorumla.",
        {
          type: "chart",
          title: "Grup çalışmasında söz alma sayıları",
          unit: "söz alma",
          source: "Grup gözlem formu, örnek veri (özgün)",
          items: [
            { label: "Ela", value: 12 },
            { label: "Mert", value: 9 },
            { label: "Sude", value: 8 },
            { label: "Kerem", value: 3 },
            { label: "Ada", value: 0 },
          ],
          note: "Toplam 32 söz alma. Grup beş kişidir ve karar çoğunlukla ilk üç kişinin konuşmalarıyla alınmıştır.",
        },
        [
          choice("v3q1", "Grafikteki veri neyi gösterir?", [
            "Öğrencilerin konu hakkındaki bilgi düzeyini",
            "Söz alma dağılımının dengeli olmadığını",
            "Grubun kararının yanlış olduğunu",
          ], 1, "Sayılar konuşma sıklığını gösterir; bilgi düzeyi veya kararın doğruluğu bu veriden çıkarılamaz.", "Sayı ile bilgi düzeyi aynı şey midir?"),
          write("v3q2", "Ada’nın katılımını desteklemek için ben diliyle bir cümle yaz. Cümlende durumu, kendi duygunu ve isteğini belirt.", "Örn. Ada konuşurken sözü kesildiğinde…"),
        ],
        "Veri bir durumu görünür kılar; nedeni ve çözümü ayrıca düşünmek gerekir.",
      ),
    },

    4: {
      nextPrep: "Gelecek hafta fırsat eşitliğini çalışacağız; bu hafta bir anlaşmazlıkta iki tarafın ihtiyacını yazmayı dene.",
      visual: visualStep(
        "v4-news-conflict",
        "Görsel okuma · gazete haberi",
        "Haber: görev paylaşımı krizi büyüdü",
        "Haberi oku; anlaşmazlığın hangi adımda büyüdüğünü ve yapıcı seçeneğin ne olabileceğini belirle.",
        {
          type: "news",
          masthead: "SINIF BÜLTENİ",
          source: "Sınıf bülteni · örnek olay (özgün)",
          headline: "Sunum görevi kimde? Tartışma büyüdü, sunum bir gün gecikti",
          lead: "Grup, sunumun hangi bölümünü kimin hazırlayacağını konuşmaya başladı. İki öğrenci aynı bölümü seçti; biri “Ben zaten başladım” dedi, diğeri “Bana sormadınız” diye yanıt verdi. Konuşma kısa sürede kişisel suçlamalara döndü ve grup dağıldı. Ertesi gün öğretmenin önerisiyle görevler yazılı olarak paylaşıldı ve herkesin hangi bölümü istediği sırayla soruldu.",
        },
        [
          choice("v4q1", "Haberin olayında anlaşmazlığı büyüten davranış hangisidir?", [
            "Görevlerin yazılı olarak paylaşılması",
            "Kişiyi suçlayan bir dille konuşulması",
            "Herkesin sırayla söz alması",
          ], 1, "Suçlayıcı dil, sorunun kendisi yerine kişiyi hedef aldığı için anlaşmazlığı büyütmüştür.", "Cümleler kişiye mi, duruma mı yöneliyor?"),
          write("v4q2", "İki tarafın ihtiyacı neydi? Bu ihtiyaçları gözeten adil bir çözüm yaz.", "Örn. Bir taraf hazırladığı işin görülmesini, diğeri…"),
        ],
        "Sorunu kişiden ayırmak, çözümün ilk adımıdır.",
      ),
    },

    5: {
      nextPrep: "Gelecek hafta küreselleşmeye geçiyoruz; bu hafta çevrende erişimi kolaylaştıran bir düzenlemeyi gözlemle.",
      visual: visualStep(
        "v5-chart-access",
        "Görsel okuma · grafik",
        "Grafik: okul binasında belirlenen erişim engelleri",
        "Grafik, bir okulda öğrencilerin bildirdiği erişim engellerinin sayısını gösteriyor. En kalabalık sütun her zaman en önemli sorun mudur?",
        {
          type: "chart",
          title: "Okulda bildirilen erişim engelleri",
          unit: "bildirim sayısı",
          source: "Okul erişim taraması, örnek veri (özgün)",
          items: [
            { label: "Basamak ve kot farkı", value: 9 },
            { label: "Anlaşılmayan duyuru", value: 7 },
            { label: "Yönlendirme levhası eksikliği", value: 5 },
            { label: "Ses düzeneği yetersizliği", value: 3 },
          ],
          note: "Bildirimler öğrencilerin kendi gözlemlerine dayanır; her engelin etkilediği kişi sayısı ayrıca sorulmalıdır.",
        },
        [
          choice("v5q1", "Yalnızca bu grafiğe bakarak hangi sonuca varmak yanıltıcı olur?", [
            "Basamak ve kot farkı en çok bildirilen engeldir.",
            "En çok bildirilen engel, en çok kişiyi etkileyen engeldir.",
            "Ses düzeneği en az bildirilen başlıktır.",
          ], 1, "Bildirim sayısı, etkilenen kişi sayısını göstermez; bir engel tek kişiyi de çok kişiyi de etkileyebilir.", "Bildirim sayısı ile etkilenen kişi sayısı aynı mı?"),
          write("v5q2", "Bu okulda ilk yapılacak düzenlemeyi seç ve gerekçelendir. Karar verirken kimlerin görüşü alınmalı?", "Örn. Önce anlaşılmayan duyuru; çünkü her gün…"),
        ],
        "Erişilebilirlik, sayıların çokluğuyla değil, katılımın gerçekleşmesiyle ölçülür.",
      ),
      review: reviewStep(
        "r1-unit-review",
        "Öz değerlendirme · öğrenme alanı sonu",
        "Kendimi Değerlendiriyorum · Birlikte Yaşamak",
        "Bu öğrenme alanında iletişim, empati, anlaşmazlık çözümü ve fırsat eşitliği üzerinde çalıştın. Aşağıdaki ölçütleri kendi durumuna göre işaretle.",
        [
          check("r1check", "Bu alanda kendimi değerlendiriyorum", [
            { id: "listen", label: "Bir görüşü sözünü kesmeden dinleyip özetleyebiliyorum." },
            { id: "ben", label: "Bir isteğimi suçlamadan, ben diliyle anlatabiliyorum." },
            { id: "conflict", label: "Anlaşmazlıkta sorunu kişiden ayırıp seçenek üretebiliyorum." },
            { id: "access", label: "Bir engelin kişiden değil ortamdan kaynaklanabileceğini fark ediyorum." },
            { id: "evidence", label: "Görüşümü bir örnek veya gözlemle destekleyebiliyorum." },
          ]),
          write("r1q2", "Bu alanda en çok geliştirdiğin beceri hangisi? Bir örnekle açıkla.", "Örn. Ben dili kullanmakta zorlanıyordum; şimdi…"),
        ],
        "İşaretlemediğin ölçüt, sonraki tekrar çalışman için bir hatırlatmadır.",
      ),
    },

    6: {
      nextPrep: "Gelecek hafta bağlantıların fırsat ve sorumluluk yönünü ve sorunların ölçeğini çalışacağız; bu hafta bir ürünün nerede üretildiğine bak.",
      visual: visualStep(
        "v6-chart-corridor",
        "Görsel okuma · grafik",
        "Grafik: Orta Koridor üzerinden taşınan yük",
        "Grafik, Orta Koridor üzerinden taşınan yük miktarının yıllara göre değişimini gösteriyor. Artışı oku, sonra bu artışın neyi gösterip neyi göstermediğini düşün.",
        {
          type: "chart",
          title: "Orta Koridor üzerinden taşınan yük",
          unit: "milyon ton",
          source: "Ulaştırma istatistikleri, örnek veri (özgün)",
          items: [
            { label: "2019", value: 2.1 },
            { label: "2021", value: 3.4 },
            { label: "2023", value: 5.6 },
          ],
          note: "Tüm yıllarda aynı ölçüm yöntemi kullanılmıştır; veri yalnızca taşınan yük miktarını gösterir.",
        },
        [
          choice("v6q1", "Grafiğe göre hangi ifade doğrudur?", [
            "Taşınan yük her dönemde artmıştır.",
            "Taşınan yük 2021’de azalmıştır.",
            "Yük miktarı yıllar içinde değişmemiştir.",
          ], 0, "Üç ölçüm de bir öncekinden yüksektir; bu, taşınan yükün arttığını gösterir.", "Sütunları soldan sağa karşılaştır."),
          write("v6q2", "Bu artışın ülke ekonomisi için iki olası sonucunu yaz. Sonuçlarını hangi ek bilgiyle doğrulamak isterdin?", "Örn. Ticaret geliri artabilir; ancak…"),
        ],
        "Bir grafik eğilimi gösterir; nedenini ve sonucunu göstermez.",
      ),
    },

    7: {
      nextPrep: "Gelecek hafta küresel sorunlara çözümleri ve Türkiye’nin rolünü çalışacağız; bu hafta bir sorunun kaç ülkeyi etkilediğini araştır.",
      visual: visualStep(
        "v7-chart-food-index",
        "Görsel okuma · grafik",
        "Grafik: küresel gıda fiyat endeksi",
        "Endeks, 2019 yılı 100 kabul edilerek hesaplanmıştır. Değerin 100’ün üzerinde olması fiyatların 2019’a göre arttığını gösterir.",
        {
          type: "chart",
          title: "Küresel gıda fiyat endeksi (2019 = 100)",
          unit: "endeks değeri",
          source: "Uluslararası fiyat endeksi, örnek veri (özgün)",
          items: [
            { label: "2020", value: 96 },
            { label: "2021", value: 118 },
            { label: "2022", value: 143 },
            { label: "2023", value: 132 },
          ],
          note: "Endeks tek bir ülkeyi değil, uluslararası pazarlarda işlem gören temel gıda ürünlerini kapsar.",
        },
        [
          choice("v7q1", "Grafikteki değişimi en iyi açıklayan ifade hangisidir?", [
            "Fiyatlar 2020’de 2019’un altına inmiş, sonra hızla yükselmiştir.",
            "Fiyatlar her yıl düzenli olarak düşmüştür.",
            "Endeks yalnızca bir ülkenin fiyatlarını gösterir.",
          ], 0, "2020’de endeks 100’ün altındadır; 2021 ve 2022’de belirgin biçimde yükselmiştir.", "100 çizgisinin altı ve üstü ne anlama geliyor?"),
          write("v7q2", "Bu veri bir bölgesel mi yoksa küresel sorunu mu gösteriyor? İki gerekçeyle açıkla.", "Örn. Endeks birçok ülkenin girdiği pazarları kapsadığı için…"),
        ],
        "Endeksin kapsamı, sorunun ölçeğini belirlemenin anahtarıdır.",
      ),
    },

    8: {
      nextPrep: "İkinci öğrenme alanı tamamlandı; gelecek hafta Anadolu’daki siyasi değişimle başlıyoruz, harita okumaya hazırlan.",
      visual: visualStep(
        "v8-chart-aid",
        "Görsel okuma · grafik",
        "Grafik: yurt dışı insani yardımın alanlara dağılımı",
        "Grafik, bir ülkenin yurt dışında yürüttüğü insani yardım projelerinin alanlara göre dağılımını yüzde olarak gösteriyor.",
        {
          type: "chart",
          title: "İnsani yardım projelerinin alanlara dağılımı",
          unit: "yüzde (%)",
          source: "Kurum faaliyet raporu, örnek veri (özgün)",
          items: [
            { label: "Eğitim", value: 34 },
            { label: "Sağlık", value: 26 },
            { label: "Barınma", value: 22 },
            { label: "Su ve hijyen", value: 18 },
          ],
          note: "Yüzdeler proje sayısına göre hesaplanmıştır; bütçe dağılımı farklı olabilir.",
        },
        [
          choice("v8q1", "Grafikten hangi sonuç çıkarılabilir?", [
            "En çok proje eğitim alanında yürütülmüştür.",
            "Sağlık alanına en çok bütçe ayrılmıştır.",
            "Su ve hijyen projeleri hiç yapılmamıştır.",
          ], 0, "Grafik proje sayısına göre dağılımı verir; en büyük pay eğitimdedir. Bütçe bilgisi bu grafikte yoktur.", "Grafik hangi ölçüte göre çizilmiş?"),
          write("v8q2", "Bu dağılım hangi ihtiyaca cevap verildiğini gösterir? Değerlendirmeni hangi kaynakla desteklerdin?", "Örn. Eğitim projelerinin payı, uzun süreli…"),
        ],
        "Bir katkıyı değerlendirmek için ölçütün ne olduğunu bilmek gerekir.",
      ),
      review: reviewStep(
        "r2-unit-review",
        "Öz değerlendirme · öğrenme alanı sonu",
        "Kendimi Değerlendiriyorum · Evimiz Dünya",
        "Küreselleşme, bağlantıların etkileri, sorunların ölçeği ve Türkiye’nin rolü üzerinde çalıştın. Ölçütleri kendi durumuna göre işaretle.",
        [
          check("r2check", "Bu alanda kendimi değerlendiriyorum", [
            { id: "link", label: "Bir ürün veya bilginin farklı ülkelerle bağlantısını açıklayabiliyorum." },
            { id: "effect", label: "Bir küresel bağlantının kimin için fırsat, kimin için risk olduğunu ayırabiliyorum." },
            { id: "scale", label: "Bir sorunun bölgesel mi küresel mi olduğunu ölçütle gerekçelendirebiliyorum." },
            { id: "plan", label: "Sorun–kanıt–paydaş–eylem–sonuç sırasıyla bir çözüm planı kurabiliyorum." },
            { id: "role", label: "Türkiye’nin bir katkısını kaynağa dayanarak değerlendirebiliyorum." },
          ]),
          write("r2q2", "Hangi konuda kanıt kullanmakta zorlandın? Bir sonraki tekrar için ne yapacaksın?", "Örn. Ölçek ayrımında zorlandım; her sorunda…"),
        ],
        "Kanıt kullanmak, yorumu tahminden ayırır.",
      ),
    },

    9: {
      nextPrep: "Gelecek hafta Osmanlı’nın büyüme politikalarını çalışacağız; bu hafta Anadolu haritasında bir beylik yerini bul.",
      visual: visualStep(
        "v9-timeline-anatolia",
        "Görsel okuma · kronoloji şeridi",
        "Kronoloji: Anadolu’da siyasi değişim",
        "Şeritteki olayları sırayla oku. Hangi olayın hangi sonucu hazırladığını belirle.",
        {
          type: "timeline",
          title: "Anadolu’da siyasi değişim (1071–1299)",
          source: "Ders kitabı kronolojisi, özgün özet",
          items: [
            { year: "1071", text: "Malazgirt Savaşı; Bizans’ın Anadolu denetimi zayıflar." },
            { year: "1176", text: "Miryokefalon Savaşı; Anadolu’nun Türk yurdu olduğu pekişir." },
            { year: "1243", text: "Kösedağ Savaşı; Anadolu Selçuklu Devleti Moğol baskısı altına girer." },
            { year: "1299", text: "Söğüt çevresinde Osmanlı Beyliği kurulur." },
          ],
        },
        [
          choice("v9q1", "Şeritte Anadolu Selçuklu Devleti’nin zayıflamasını gösteren olay hangisidir?", [
            "1071 Malazgirt Savaşı",
            "1243 Kösedağ Savaşı",
            "1299 Osmanlı Beyliği’nin kurulması",
          ], 1, "Kösedağ yenilgisiyle merkezî otorite çözülmüş, uç bölgelerde beylikler doğmuştur.", "Merkezî otoritenin çözüldüğü tarihi ara."),
          write("v9q2", "Beyliklerin doğuşunu hazırlayan iki etkeni şeritten yararlanarak yaz.", "Örn. Moğol baskısı ve merkezî otoritenin zayıflaması…"),
        ],
        "Kronoloji tek başına neden göstermez; olaylar arasındaki bağı sen kurmalısın.",
      ),
    },

    10: {
      nextPrep: "Gelecek hafta Balkanlarda genişlemeyi ve İstanbul’un fethini çalışacağız; bu hafta bir harita üzerinde yön belirle.",
      visual: visualStep(
        "v10-news-settlement",
        "Görsel okuma · gazete haberi",
        "Haber: yeni yerleşimde ilk hasat",
        "Haberi oku; anlatılan uygulamanın hangi politikaya karşılık geldiğini ve hangi sonuçları doğurduğunu belirle.",
        {
          type: "news",
          masthead: "TARİH SAYFASI",
          source: "Tarih sayfası · özgün kurgu haber",
          headline: "Yeni yerleşimde ilk hasat: 60 hane, iki değirmen, bir pazar",
          lead: "Fethedilen bölgeye yerleştirilen 60 hane, ilk yılın sonunda ürününü topladı. Köyde iki değirmen ve haftalık bir pazar kuruldu; bölgedeki eski yerleşimciler de pazara ürün getirdi. Yönetim, vergi düzeninin aksamaması için ölçü ve tartı kurallarını hatırlatan bir ferman yayımladı. Yerleşimin ikinci yılında bölgedeki yol güvenliğinin arttığı, kervanların güzergâhı değiştirdiği kaydedildi.",
        },
        [
          choice("v10q1", "Haberde anlatılan uygulama hangi politikaya karşılık gelir?", [
            "İstimâlet",
            "İskân",
            "Gaza",
          ], 1, "Konargöçer toplulukların fethedilen bölgeye yerleştirilmesi iskân politikasıdır.", "Yerleştirme ile hoşgörü ayrı kavramlardır."),
          write("v10q2", "Bu uygulamanın üretim, güvenlik ve kültürel yaşam açısından iki sonucunu yaz.", "Örn. Üretim arttı; çünkü…"),
        ],
        "Bir politikayı, doğurduğu somut sonuçlarla açıklamak gerekir.",
      ),
    },

    11: {
      nextPrep: "Gelecek hafta deniz seyahatlerini ve Osmanlı ekonomisini çalışacağız; bu hafta bir haritada ticaret yolu çiz.",
      visual: visualStep(
        "v11-timeline-balkans",
        "Görsel okuma · kronoloji şeridi",
        "Kronoloji: merkezin değişmesi ve fetih",
        "Şeritteki olayları incele; hangi olayın ilerleme, hangisinin kesinti olduğunu ayırt et.",
        {
          type: "timeline",
          title: "Bursa’dan İstanbul’a (1326–1453)",
          source: "Ders kitabı kronolojisi, özgün özet",
          items: [
            { year: "1326", text: "Bursa alınır ve başkent olur." },
            { year: "1361", text: "Edirne alınır; başkent Balkanlar’a taşınır." },
            { year: "1389", text: "I. Kosova Savaşı; Balkanlar’daki üstünlük pekişir." },
            { year: "1402", text: "Ankara Savaşı; Fetret Devri başlar." },
            { year: "1453", text: "İstanbul fethedilir; başkent İstanbul olur." },
          ],
        },
        [
          choice("v11q1", "Şeritte devletin ilerlemesini kesintiye uğratan olay hangisidir?", [
            "1361 Edirne’nin alınması",
            "1389 I. Kosova Savaşı",
            "1402 Ankara Savaşı",
          ], 2, "Ankara Savaşı’nın ardından on bir yıl süren Fetret Devri başlamıştır.", "Kesintiden sonra devletin toparlanması gerekti."),
          write("v11q2", "Başkentin Bursa’dan Edirne’ye, sonra İstanbul’a taşınmasının iki nedenini yaz.", "Örn. Yeni fethedilen bölgeye yakınlık ve denetim kolaylığı…"),
        ],
        "Kronolojide kesintiler, dönemin koşullarını anlamanın anahtarıdır.",
      ),
    },

    12: {
      nextPrep: "Gelecek hafta Rönesans, Reform ve Aydınlanma’yı çalışacağız; bu hafta Avrupa’daki bir gelişmenin Osmanlı’ya etkisini not et.",
      visual: visualStep(
        "v12-chart-trade",
        "Görsel okuma · grafik",
        "Grafik: ticaret gelirlerinin yön değiştirmesi",
        "Grafik iki bölgenin liman gelirlerini 1500 ve 1600 yılları için endeks olarak gösteriyor (1500 = 100 kabul edilmiştir).",
        {
          type: "chart",
          title: "Liman gelirleri endeksi (1500 = 100)",
          unit: "endeks değeri",
          source: "Ekonomi tarihi verileri, örnek veri (özgün)",
          items: [
            { label: "Akdeniz limanları · 1500", value: 100 },
            { label: "Akdeniz limanları · 1600", value: 62 },
            { label: "Atlas limanları · 1500", value: 100 },
            { label: "Atlas limanları · 1600", value: 188 },
          ],
          note: "Her iki bölge için de 1500 yılı 100 kabul edilmiştir; böylece değişim karşılaştırılabilir.",
        },
        [
          choice("v12q1", "Grafik hangi değişimi gösterir?", [
            "Her iki bölgenin gelirleri aynı oranda artmıştır.",
            "Akdeniz limanlarının geliri azalırken Atlas limanlarının geliri artmıştır.",
            "Atlas limanlarının geliri 1600’de değişmemiştir.",
          ], 1, "Akdeniz 100’den 62’ye gerilerken Atlas 100’den 188’e yükselmiştir.", "İki bölgenin 1600 değerlerini karşılaştır."),
          write("v12q2", "Bu değişimin Osmanlı ekonomisi için sonucunu yaz ve görseldeki hangi sayıya dayandığını belirt.", "Örn. Akdeniz liman gelirlerinin 62’ye düşmesi…"),
        ],
        "Yorumunu mutlaka verideki bir sayıya bağla.",
      ),
    },

    13: {
      nextPrep: "Gelecek hafta Sanayi İnkılabı, Fransız İhtilali ve Lale Devri’ni birlikte çalışacağız; bu hafta üç akımı ayırt eden bir tablo hazırla.",
      visual: visualStep(
        "v13-timeline-europe",
        "Görsel okuma · kronoloji şeridi",
        "Kronoloji: Avrupa’da bilgi ve düşünce değişimi",
        "Şeritteki olaylardan hangisinin bilginin yayılma hızını doğrudan etkilediğini belirle.",
        {
          type: "timeline",
          title: "Avrupa’da değişim (1450–1687)",
          source: "Ders kitabı kronolojisi, özgün özet",
          items: [
            { year: "1450", text: "Matbaa yaygınlaşmaya başlar." },
            { year: "1492", text: "Yeni kıtaya deniz yolculuğu yapılır." },
            { year: "1517", text: "Reform hareketi başlar." },
            { year: "1543", text: "Evrenin yapısına ilişkin yerleşik kabul sorgulanır." },
            { year: "1687", text: "Doğa yasalarını açıklayan bilimsel yapıt yayımlanır." },
          ],
        },
        [
          choice("v13q1", "Bilginin yayılma hızını doğrudan etkileyen gelişme hangisidir?", [
            "Matbaanın yaygınlaşması",
            "Yeni kıtaya yapılan yolculuk",
            "Reform hareketinin başlaması",
          ], 0, "Matbaa, aynı metnin çok sayıda kopyasını kısa sürede üretmeyi sağladı.", "Aynı metni çoğaltan araç hangisi?"),
          write("v13q2", "Bu gelişmelerden birinin Osmanlı’ya yansımasını yaz; yansımanın neden gecikmiş olabileceğini bir gerekçeyle açıkla.", "Örn. Matbaa Osmanlı’da çok daha geç kullanıldı; çünkü…"),
        ],
        "Aynı gelişme her yerde aynı hızda yaşanmaz; koşullar belirleyicidir.",
      ),
    },

    14: {
      nextPrep: "Gelecek hafta Osmanlı kültür ve medeniyetini çalışacağız; bu hafta çevrendeki bir tarihî yapıyı gözlemle.",
      visual: visualStep(
        "v14-chart-urban",
        "Görsel okuma · grafik",
        "Grafik: sanayileşen ülkede şehir nüfusu",
        "Grafik, sanayileşmenin yaşandığı bir ülkede şehirlerde yaşayan nüfusu milyon olarak gösteriyor.",
        {
          type: "chart",
          title: "Şehirlerde yaşayan nüfus",
          unit: "milyon kişi",
          source: "Nüfus sayımı verileri, örnek veri (özgün)",
          items: [
            { label: "1750", value: 0.7 },
            { label: "1800", value: 1.1 },
            { label: "1850", value: 2.4 },
            { label: "1900", value: 4.3 },
          ],
          note: "Veriler aynı ülkenin şehir nüfusunu gösterir; kırsal nüfus grafikte yer almaz.",
        },
        [
          choice("v14q1", "Grafiğe göre artış hangi dönemde hızlanmıştır?", [
            "1750–1800 arasında",
            "1800–1850 arasında",
            "Artış her dönemde aynı hızdadır.",
          ], 1, "1800–1850 arasındaki artış (1,1 → 2,4) önceki dönemden belirgin biçimde büyüktür.", "Dönemlerin farkını hesapla."),
          write("v14q2", "Bu artışın sanayileşmeyle ilişkisini açıkla; hangi toplumsal sorunların doğabileceğini yaz.", "Örn. Fabrikaların çevresinde…"),
        ],
        "Grafikteki eğim, dönemin toplumsal değişimini okumanı sağlar.",
      ),
    },

    15: {
      nextPrep: "Dönem tamamlandı; tatilde üç öğrenme alanından bir konu seçip kısa bir tekrar kartı hazırlayabilirsin.",
      visual: visualStep(
        "v15-news-heritage",
        "Görsel okuma · gazete haberi",
        "Haber: 120 yıllık çeşme yeniden akıyor",
        "Haberi oku; mirasın korunmasında hangi adımların atıldığını ve değerlendirmenin hangi kanıta dayandığını belirle.",
        {
          type: "news",
          masthead: "MAHALLE GAZETESİ",
          source: "Mahalle gazetesi · özgün kurgu haber",
          headline: "120 yıllık çeşme yeniden akıyor: onarım mahallelinin başvurusuyla başladı",
          lead: "Mahalledeki tarihî çeşmenin suyu yıllardır akmıyordu. Lise öğrencileri çeşmenin kitabesini okuyup yapım yılını ve yaptıran kişiyi kayda geçirdi; ardından belediyeye ve muhtarlığa başvuru yapıldı. Onarımda özgün taşlar korundu, eksik parçalar aynı malzemeyle tamamlandı. Açılışta öğrenciler hazırladıkları kısa sunumu sundu; mahalle sakinleri çeşmenin çevresinin de düzenlenmesini önerdi.",
        },
        [
          choice("v15q1", "Haberde koruma sürecinin ilk adımı hangisidir?", [
            "Onarımın tamamlanması",
            "Kitabenin okunup yapının kayda geçirilmesi",
            "Açılışta sunum yapılması",
          ], 1, "Öğrenciler önce yapının kimliğini belgelemiş, sonra başvuru yapmıştır.", "Bir işi yapmadan önce neyi biliyor olmak gerekir?"),
          write("v15q2", "Bu haberdeki koruma çalışmasını değerlendir: hangi kanıt kullanılmış, hangi adım eksik kalmış olabilir?", "Örn. Kitabe ve yerinde gözlem kanıt olarak kullanılmış; ancak…"),
        ],
        "Koruma; belgeleme, başvuru, uygulama ve izleme adımlarından oluşur.",
      ),
      review: reviewStep(
        "r3-unit-review",
        "Öz değerlendirme · öğrenme alanı sonu",
        "Kendimi Değerlendiriyorum · Ortak Mirasımız",
        "Osmanlı’nın büyüme politikaları, yenilikleri ve kültür–medeniyeti üzerinde çalıştın. Ölçütleri kendi durumuna göre işaretle ve dönemi bütün olarak değerlendir.",
        [
          check("r3check", "Bu alanda kendimi değerlendiriyorum", [
            { id: "map", label: "Haritadan bir yerin konumunu okuyup çıkarım yapabiliyorum." },
            { id: "policy", label: "Büyüme politikalarını örnekle ve sonuçlarıyla açıklayabiliyorum." },
            { id: "cause", label: "Bir olayın neden, hazırlık ve sonuçlarını ayırabiliyorum." },
            { id: "source", label: "Bir kaynaktaki kanıtı yorumumdan ayrı yazabiliyorum." },
            { id: "institution", label: "Osmanlı kurumlarını günümüzdeki karşılıklarıyla eşleştirebiliyorum." },
            { id: "heritage", label: "Bir miras öğesi için sorun–kanıt–öneri içeren bir plan yapabiliyorum." },
          ]),
          write("r3q2", "Dönem boyunca öğrendiğin en önemli bağlantı hangisi? İki konu arasındaki ilişkiyi açıkla.", "Örn. İskân politikası ile Balkanlardaki mimari miras arasında…"),
        ],
        "Kendini değerlendirmek, eksiğini bilerek çalışmanın başlangıcıdır.",
      ),
    },
  };

  window.SOCIAL_STUDIES_VISUAL = Object.freeze({ weeks });
})();
