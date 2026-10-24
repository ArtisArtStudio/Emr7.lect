/*
 * Sosyal Bilgiler karekod çalışmaları — MEB 7. sınıf ders kitabının (2026) gömülü
 * EBA bağlantılarından çözülmüş içerikler. Kart düzeni Türkçe'deki `TURKCE_QR`
 * ile aynıdır: izleme öncesi hazırlık → izlerken not → izledikten sonra düşünme →
 * yazma görevi.
 *
 * İçerik sınırı: Video dosyaları depoda yok. İki kartta (s. 15 ve s. 23) kullanıcının
 * sağladığı Gemini video analizi `analysis` alanına işlendi ve sorular bu rapora
 * dayandırıldı; kalan kartlarda sorular videoda geçtiği iddia edilen ayrıntılara değil,
 * öğrencinin izleme sürecini planlamasına ve konuyla bağ kurmasına dayanır.
 * Cevap anahtarı gösterilmez.
 *
 * Kapsam dışı bırakılan karekod: s. 34 "Engelleri Aşıyorum". Bu bir video değil,
 * sürükle-bırak etkinliğidir (engelli bireylerin işini kolaylaştıran/zorlaştıran
 * durumların resimlerini sınıflandırma). Kullanıcı talimatıyla şimdilik atlandı;
 * ileride `sort` (sürükle-bırak sınıflandırma) etkinliği olarak eklenecek.
 */
(function () {
  "use strict";

  const eba = (id) =>
    `https://ders.eba.gov.tr/ders//redirectContent.jsp?resourceId=${id}&resourceType=1&resourceLocation=2`;

  window.SOCIAL_QR = {
    note:
      "Kartlar izleme öncesi hazırlık, izlerken not alma ve izledikten sonra düşünme adımlarından oluşur. Yanıtların bu tarayıcıda saklanır; doğru cevap gösterilmez, yalnızca nerede düzeltme yapacağın söylenir. Bağlantı açılmazsa kitabındaki karekodu kullan.",
    units: [
      {
        id: "qr-iletisim-video",
        weekIds: [1],
        kind: "İzleme",
        where: "s. 15 · 1. öğrenme alanı",
        title: "İletişimle ilgili video",
        sourceUrl: eba("2d41a7a29aa74f64bbc61e22fca5a389"),
        sourceLinkLabel: "EBA · İletişimle ilgili video",
        sourceLinkType: "video",
        minutes: 5,
        focus: "Okul-aile iletişimi, iletişim hataları ve ders saatine saygı",
        analysis: {
          doc: "docs/video-analysis/okul-veli-iletisimi-gemini-analysis.md",
          speaker: "Canlandırma: Özlem Hanım, Şebnem Hanım, okul müdürü, Can",
          summary:
            "Veli toplantısına katılmayan ve öğretmenin mesajını görmezden gelen Özlem Hanım, ders saatinde sınıfa girerek öğretmeni meşgul etmeye çalışır. Öğretmen ders işlediğini söyleyip onu dışarı yönlendirir; müdür, toplantı tarihlerinin haftalar öncesinden duyurulduğunu ve ders saatinde öğretmenin meşgul edilmemesi gerektiğini nazik ama kararlı bir dille anlatır. Oğlu Can, annesinin ilgisizliği yüzünden üzülür.",
          segments: [
            { at: "00:00", note: "Evde akşam: Can uykusu geldiğini söyler, anne dizini gerekçe gösterip onu geçiştirir; toplantı mesajı görmezden gelinir." },
            { at: "00:42", note: "Kahvaltıda Can toplantıyı sorar; anne mesajı yeni gördüğünü söyleyip bahaneler üretir." },
            { at: "01:30", note: "Sınıfta veli toplantısı: öğretmen veli-okul iş birliğinin ve evdeki ilginin önemini anlatır." },
            { at: "02:42", note: "Ders saatinde anne sınıfa girer; öğretmen ders işlediğini belirtip onu dışarı yönlendirir." },
            { at: "03:40", note: "Müdür odası: tarihlerin önceden duyurulduğu, ders saatinde kimsenin meşgul edilmemesi gerektiği nazik ama kararlı dille açıklanır." },
          ],
          keyPoints: [
            "Toplantı mesajını görmezden gelmek ve bahane üretmek iletişimi koparır; ilgisizlikten en çok çocuk etkilenir.",
            "Ders saatinde sınıfa girip öğretmeni meşgul etmek, sınıfın düzenini ve dersin akışını bozar.",
            "Okul-aile iletişiminde sorumluluklar zamanında yerine getirilir; görüşme ders dışına planlanır.",
            "Kural hatırlatılırken hem nezaket hem kararlılık gerekir: suçlama değil, açıklama ve sınır.",
          ],
        },
        intro:
          "Videoda bir veli (Özlem Hanım), öğretmenin gönderdiği toplantı mesajını görmezden geliyor ve ders saatinde sınıfa giriyor. İzlerken iki şeyi ayır: hangi davranış iletişimi koparıyor, hangi davranış onarıyor?",
        before: [
          "Sence okul ile aile arasındaki iletişimi en çok ne zorlaştırır? İki neden yaz.",
          "Bir öğretmen ders saatinde veliyle görüşmek istemezse bu kararın gerekçesi ne olabilir? Tahminini not et.",
        ],
        notes: [
          { id: "n1", label: "Videoda kopan ilk iletişim", hint: "Akşam evde, mesaj ekranda dururken ne yapıldı?" },
          { id: "n2", label: "Velinin bahaneleri neye dayanıyor?", hint: "Mesajı ne zaman gördüğünü söylüyor?" },
          { id: "n3", label: "Ders saatinde sınıfa girmenin sınıfa etkisi", hint: "Öğretmen ne yapmak zorunda kalıyor?" },
          { id: "n4", label: "Müdürün cümlesindeki iki unsur", hint: "Bir yanda nezaket, öbür yanda kararlılık var." },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Öğretmenin (Şebnem Hanım) ders saatinde görüşme isteğine verdiği yanıt hangisidir?",
            options: [
              "Ders işlediğini belirtip görüşmeyi ders dışına yönlendirmek",
              "Dersi bırakıp veliyle sınıfın içinde uzun uzun görüşmek",
              "Veliye hiçbir açıklama yapmadan sınıftan çıkmak",
              "Sorunu görmezden gelip derse kaldığı yerden devam etmek",
            ],
            answer: 0,
            explanation:
              "Öğretmen dersin bölünmemesi için görüşmeyi ders dışına bırakır; veliyi geri çevirmez, uygun zamana yönlendirir.",
            hint: "Öğretmen veliyi reddediyor mu, yoksa zaman mı değiştiriyor?",
          },
          {
            id: "q2",
            prompt: "Okul müdürünün veliye yaklaşımını en iyi anlatan ifade hangisidir?",
            options: [
              "Kuralı yüksek sesle ve suçlayıcı bir dille hatırlatmak",
              "Tarihlerin önceden duyurulduğunu söyleyip nazik ama kararlı biçimde sınır koymak",
              "Veliyi haklı bulup öğretmeni velinin yanında uyarmak",
              "Konuyu kapatıp görüşmeyi başka bir güne ertelemek",
            ],
            answer: 1,
            explanation:
              "Müdür ne suçlar ne de konuyu geçiştirir: bilgiyi hatırlatır ve sınırı açıkça, saygılı bir dille koyar.",
            hint: "Hangi seçenekte hem açıklama hem sınır birlikte var?",
          },
        ],
        write: {
          title: "Kısa yazma: görüşmeyi yeniden kur",
          instruction:
            "Ders saatinde sınıfa giren veli ile öğretmen arasındaki konuşmayı yeniden yaz. Veli özür dileyip randevu istesin, öğretmen uygun bir zaman önersin. Sonunda bu konuşmanın ilk hâlinden farkını açıkla.",
          criteria: [
            "İki tarafın da söylediği en az birer cümle olsun.",
            "Suçlayıcı dil yerine ben dili kullan.",
            "Görüşmenin neden ders dışına alındığını gerekçelendir.",
          ],
          guide: "Durum → velinin cümlesi → öğretmenin cümlesi → ortak karar sırasını izle.",
          starter: "Öğretmenim, dersinizi böldüğüm için …",
          minChars: 160,
        },
      },
      {
        id: "qr-iletisim-yollari",
        weekIds: [2],
        kind: "İzleme",
        where: "s. 23 · 1. öğrenme alanı",
        title: "Olumlu ve olumsuz iletişim yolları",
        sourceUrl: eba("da18b420babd56dfbcf9da975fd86b01"),
        sourceLinkLabel: "EBA · Olumlu ve olumsuz iletişim yolları",
        sourceLinkType: "video",
        minutes: 6,
        focus: "Ben dili–sen dili, empati, etkin dinleme, beden dili ve farklılıklara saygı",
        analysis: {
          doc: "docs/video-analysis/etkili-iletisim-ve-unsurlari-gemini-analysis.md",
          speaker: "Anlatıcı (öğretici dış ses)",
          summary:
            "İletişim, karşılıklı anlaşabilmektir: önce anlamak, sonra uygun dille anlatmak; temeli saygıdır. Ben dili davranışı ve sorunu hedef alır, empati kurar, güven verir; sen dili kişiliği hedef alır, itham eder ve karşı tarafı savunmaya iter. Etkili iletişimin unsurları empati, beden dili (sözsüz iletişim), etkin dinleme (odaklanma, göz teması, bedenle geri bildirim) ve farklılıklara saygıdır.",
          keyPoints: [
            "İletişimin özü karşılıklı anlaşabilmektir: anlamak, sonra anlatmak.",
            "Ben dili davranışı hedef alır ve sorunu çözmeye çalışır; sen dili kişiliği hedef alır ve çatışma doğurur.",
            "Empati, beden dili, etkin dinleme ve farklılıklara saygı etkili iletişimin unsurlarıdır.",
            "Etkin dinleme pasif beklemek değildir: odaklanma, göz teması ve bedenle geri bildirim gerektirir.",
          ],
        },
        intro:
          "Video, aynı durumun “sen dili” ve “ben dili” ile nasıl kurulduğunu karşılaştırıyor; ardından empati, beden dili, etkin dinleme ve farklılıklara saygıyı açıklıyor. İzlerken iletişim problemlerinin nedenlerini biriktir: bir sonraki etkinlikte bu nedenleri balık kılçığına yerleştireceksin.",
        before: [
          "Bir arkadaşınla yaşadığın küçük bir anlaşmazlığı tek cümleyle yaz.",
          "Sence bir çatışmayı onaran ilk davranış nedir? Tahminini not et.",
        ],
        notes: [
          { id: "n1", label: "Sen dili cümlesinde ne hedef alınır?", hint: "Davranış mı, kişilik mi?" },
          { id: "n2", label: "Ben dilinde odak noktası", hint: "Kişi değil, hangi davranış anlatılıyor?" },
          { id: "n3", label: "Etkin dinlemenin iki göstergesi", hint: "Biri gözle, biri bedenle ilgili." },
          { id: "n4", label: "İletişim probleminin bir nedeni", hint: "Videodaki dört unsurdan hangisi eksik kalmışsa o neden olur." },
        ],
        questions: [
          {
            id: "q1",
            prompt: "“Sen dili” ile kurulan bir cümle genellikle hangi etkiyi yaratır?",
            options: [
              "Empati kurmayı kolaylaştırır",
              "Karşı tarafı savunmaya iter ve iletişimi keser",
              "Kişiliği değil davranışı hedef alır",
              "Karşı tarafa değer verildiğini hissettirir",
            ],
            answer: 1,
            explanation:
              "Sen dili kişiliği hedef aldığı için karşı taraf kendini savunmaya geçer; konu konuşulamaz hâle gelir.",
            hint: "Suçlanan kişi ne yapar: dinler mi, savunur mu?",
          },
          {
            id: "q2",
            prompt: "Etkin dinlemenin gereklerinden biri hangisidir?",
            options: [
              "Konuşmacının sözünü kesip kendi düşüncesini anlatmak",
              "Dinlerken başka bir işle ilgilenmek",
              "Göz teması kurup dinlediğini beden hareketleriyle hissettirmek",
              "Anlamadığı yeri gizleyip susmak",
            ],
            answer: 2,
            explanation:
              "Etkin dinleme zihinsel olarak aktif olmayı gerektirir: odaklanma, göz teması ve baş sallama gibi bedensel geri bildirim.",
            hint: "Videoda etkin dinleme için üç gerek sayılıyor; hangisi bu üçünden biri?",
          },
          {
            id: "q3",
            prompt: "Beden dili (sözsüz iletişim) için hangisi doğrudur?",
            options: [
              "Yalnızca yüz ifadelerinden oluşur",
              "Konuşulanları her zaman yalanlar",
              "Kültürden tamamen bağımsızdır",
              "Jest, mimik ve duruşlarla anlatımı sağlar, sözlerin etkisini artırır",
            ],
            answer: 3,
            explanation:
              "Beden dili jest, mimik ve duruşlarla kurulur; sözlerin yerine geçmez, onları destekler ve etkisini artırır.",
            hint: "Videoda verilen örnek: uzaktaki dostu görünce ne yapıyorsun?",
          },
          {
            id: "q4",
            prompt: "Farklı kültürlerden insanlarla iletişimde “farklılıklara saygı” neyi gerektirir?",
            options: [
              "Karşı tarafın kültürel değerlerini ve bireysel özelliklerini dikkate almayı",
              "Herkesin aynı biçimde düşünmesini beklemeyi",
              "Kendi değerlerini karşı tarafa kabul ettirmeyi",
              "Konuyu değiştirip konuşmayı kısa tutmayı",
            ],
            answer: 0,
            explanation:
              "Farklılıklara saygı, iletişimin başarıya ulaşması için karşı tarafın bireysel ve kültürel değerlerini dikkate almayı gerektirir.",
            hint: "Saygı, karşı tarafı kendine benzetmek mi, olduğu gibi kabul etmek mi?",
          },
        ],
        write: {
          title: "Kısa yazma: sen dilini ben diline çevir",
          instruction:
            "“Çok tembelsin ve sınıfını geçemeyeceksin.” cümlesini ben diliyle yeniden yaz. Ardından iki cümleyi karşılaştır: hangisi davranışı hedef alıyor, hangisi kişiliği? Son cümlede hangisinin çatışmayı azalttığını gerekçesiyle yaz.",
          criteria: [
            "Yeni cümlede suçlayıcı sıfat kullanma.",
            "Duyguyu ya da gözlemi ayrı ayrı belirt.",
            "İki cümlenin etkisini karşılaştır.",
          ],
          guide: "Gözlem → duygu → öneri sırasını izle; sonunda karşılaştırma cümlesini yaz.",
          starter: "Derslerine ayırdığın zamanı gördüğümde …",
          minChars: 150,
        },
      },
      {
        id: "qr-uzlasma-hikayesi",
        weekIds: [2],
        kind: "Dinleme",
        where: "s. 27 · 1. öğrenme alanı",
        title: "“Uzlaşmanın Gücü” hikâyesinin devamı",
        sourceUrl: eba("026223ec3b49bfa0b7fa72a539a4a1d9"),
        sourceLinkLabel: "EBA · Uzlaşmanın Gücü hikâyesinin devamı",
        sourceLinkType: "audio",
        minutes: 5,
        focus: "Çatışmayı uzlaşmaya çeviren davranışlar: düşünmeye zaman ayırma, ortak çözüm",
        analysis: {
          doc: "docs/video-analysis/uzlasmanin-gucu-devami-gemini-analysis.md",
          speaker: "Anlatıcı ve canlandırma: Ahmet, Merve",
          summary:
            "Ahmet ile Merve proje konusunda fikir ayrılığı yaşar ve aralarında kısa süreli bir gerginlik olur. Ahmet duygusal tepki vermek yerine “Çözüm yolu bulmak için biraz düşünmeliyiz” der. Kısa süre sonra Merve, yalnızca klasik bir sunumun sıkıcı olacağını, projeyi görsel ve dijital sunumla birleştirebileceklerini önerir. Ahmet fikri onaylar; projeyi ortaklaşa tamamlarlar. Sunum gününde öğretmenler ve arkadaşları çalışmayı eğlenceli ve bilgilendirici bulur.",
          segments: [
            { at: "1", note: "Fikir ayrılığı: iki arkadaşın proje yaklaşımı çatışır, gerginlik oluşur." },
            { at: "2", note: "Düşünme süreci: Ahmet “biraz düşünmeliyiz” diyerek tepki yerine çözüm önerir." },
            { at: "3", note: "Yaratıcı çözüm: Merve dijital + görsel sunum fikrini ortaya atar." },
            { at: "4", note: "Ortak çalışma: fikirler birleşir, proje tamamlanır, birbirlerini tebrik ederler." },
            { at: "5", note: "Sunum: öğretmenler ve sınıf çalışmayı eğlenceli ve bilgilendirici bulur." },
          ],
          keyPoints: [
            "Fikir ayrılığı tek başına çatışma değildir; çatışmaya dönüşmesini önleyen şey verilen tepkidir.",
            "Duygusal tepki yerine düşünmeye zaman ayırmak çözümün ilk adımıdır.",
            "Farklı ilgi alanları (teknoloji ve resim) birleştiğinde ürün zenginleşir.",
            "Ortak çözüm, taraflardan birinin fikrinden tamamen vazgeçmesi değil; iki fikrin birleşmesidir.",
          ],
        },
        intro:
          "s. 26’da hikâye yarım kalmıştı. Karekodda devamı var: iki arkadaşın proje anlaşmazlığı nasıl uzlaşmaya dönüşüyor? Önce kendi tahminini yaz, sonra dinle.",
        before: [
          "Hikâyenin nasıl biteceğini tahmin et: taraflar ne yapacak?",
          "Bir tartışmada “biraz düşünelim” demek neden işe yarar? Kısaca yaz.",
        ],
        notes: [
          { id: "n1", label: "Anlaşmazlığın konusu", hint: "İki arkadaş projeyi hangi yöntemle hazırlamak istiyordu?" },
          { id: "n2", label: "Ahmet’in gerginlik anındaki teklifi", hint: "Tepki vermek yerine ne öneriyor?" },
          { id: "n3", label: "Merve’nin çözüm fikri", hint: "İki sunum biçimi birleşiyor." },
          { id: "n4", label: "Tahminimle örtüşen ve ayrılan yön", hint: "İki sütun gibi düşün." },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Ahmet, gerginlik sırasında hangi yolu seçer?",
            options: [
              "Kendi fikrinde ısrar edip tartışmayı sürdürmeyi",
              "Projeyi tek başına yapmayı",
              "Konuyu öğretmene şikâyet etmeyi",
              "“Çözüm yolu bulmak için biraz düşünmeliyiz” demeyi",
            ],
            answer: 3,
            explanation:
              "Ahmet duygusal tepki yerine düşünmeye zaman ayırmayı önerir; çatışmayı uzlaşmaya çeviren ilk adım budur.",
            hint: "Rapordaki “düşünme süreci” adımını hatırla.",
          },
          {
            id: "q2",
            prompt: "Merve’nin önerisi iki arkadaşın fikrini nasıl birleştirir?",
            options: [
              "Yalnızca resim ve afiş kullanılır",
              "Görsel ve dijital sunum birlikte kullanılır",
              "Proje sunulmadan bırakılır",
              "Sunum yalnızca öğretmene yapılır",
            ],
            answer: 1,
            explanation:
              "Merve, klasik sunum yerine görsel ve dijital sunumu birleştirmeyi önerir; böylece iki ilgi alanı da işe katılır.",
            hint: "İki arkadaşın ilgi alanı: biri teknoloji, biri resim.",
          },
          {
            id: "q3",
            prompt: "Uzlaşmayı en iyi anlatan ifade hangisidir?",
            options: [
              "Taraflardan birinin isteğinden tamamen vazgeçmesi",
              "Anlaşmazlığın konuşulmadan kapatılması",
              "Her iki tarafın da kabul edebileceği ortak bir noktada buluşması",
              "Kararın en yaşlı kişi tarafından verilmesi",
            ],
            answer: 2,
            explanation:
              "Uzlaşmada taraflar karşılıklı adım atar; biri tamamen vazgeçmez, iki fikir birleşerek yeni bir çözüm doğar.",
            hint: "Hikâyenin sonunda kaç fikir kullanıldı?",
          },
        ],
        write: {
          title: "Kısa yazma: kendi uzlaşma sahneni kur",
          instruction:
            "İki kişinin küçük bir anlaşmazlığını yaz; uzlaşma adımlarını sırayla göster. Sonunda uzlaşmanın neden adil olduğunu açıkla.",
          criteria: [
            "Her iki tarafın isteğini de yaz.",
            "En az iki uzlaşma adımı göster.",
            "Sonuçta neden adil olduğunu gerekçelendir.",
          ],
          guide: "Kişi → istek → çatışma → adım → sonuç sırasını izle.",
          starter: "İki arkadaş aynı görevi paylaşamıyordu, çünkü …",
          minChars: 170,
        },
      },
      {
        id: "qr-engelleri-asanlar",
        weekIds: [3],
        kind: "İzleme",
        where: "s. 32 · 1. öğrenme alanı",
        title: "Engelleri aşan üç genç",
        sourceUrl: eba("2edd5069ff032e00a221a9a0545791bf"),
        sourceLinkLabel: "EBA · Engelleri aşan üç genç",
        sourceLinkType: "video",
        minutes: 5,
        focus: "Ön yargı, erişilebilirlik ve desteğin başarıya etkisi",
        analysis: {
          doc: "docs/video-analysis/sayfa32-uc-video-gemini-analysis.md",
          speaker: "Gençlerin kendi anlatımı (röportaj)",
          summary:
            "Üç genç kendi hikâyesini anlatır. Yüzme sporuyla tanışan ve 120’ye yakın madalya kazanan sporcu, havuz bulmakta zorlanmış; kulüp açarak engelli bireylere eğitim vermiş, otobüste ön yargıyla karşılaşmıştır. Paraplejik doğan hekim, lise öğretmeninin “Gidilmemiş yolu sen aç” sözüyle cesaret bulup tıp fakültesini bitirmiş; şehirde rampa ve engelli tuvaletinin işgali gibi erişilebilirlik sorunlarıyla karşılaşmaktadır. Altı yaşında elektrik kazasında iki kolunu kaybeden sanatçı, yurtta büyümüş, ağzıyla kalem tutarak çizim yapmış, moda-tekstil alanında lisans ve yüksek lisansı tamamlamıştır.",
          segments: [
            { at: "00:00", note: "Yüzücü: 14 yaşında yüzmeye başlar, yaklaşık 120 madalya; havuz bulma zorluğu ve kulüp açma." },
            { at: "01:39", note: "Hekim: paraplejik doğum, “Gidilmemiş yolu sen aç” sözü, tıp fakültesi, rampa ve engelli tuvaleti sorunu." },
            { at: "03:13", note: "Sanatçı: 6 yaşında elektrik kazası, yurtta 17 yıl, ağzıyla çizim, sergiler ve yüksek lisans." },
          ],
          keyPoints: [
            "Engel çoğu zaman bedende değil; ön yargıda, duyarsızlıkta ve erişilebilirliği düşünmeyen düzenlemelerdedir.",
            "Doğru zamanda verilen destek (aile, öğretmen, kulüp) başarıyı mümkün kılar.",
            "Bireyler acınmaya değil, eşit imkân ve haklara ihtiyaç duyar.",
            "Aktarılabilir ilke: katılımı kolaylaştıran düzenleme, kişinin çabasından önce gelir.",
          ],
        },
        intro:
          "Karekodda üç genç kendi hikâyesini anlatıyor: sporcu, hekim ve sanatçı. İzlerken iki şeyi ayır: hangi engel bedensel, hangisi toplumun kurduğu engel?",
        before: [
          "“Engel” sözcüğü sence yalnızca bedensel bir durumu mu anlatır? Kısaca yaz.",
          "Okulunda ya da mahallende bir kişinin katılımını zorlaştıran bir düzen var mı? Tahminini not et.",
        ],
        notes: [
          { id: "n1", label: "Sporcunun aşmak zorunda kaldığı iki zorluk", hint: "Biri imkânla, biri insanların bakışıyla ilgili." },
          { id: "n2", label: "Hekime cesaret veren cümle", hint: "Öğretmeninin söylediği kısa söz." },
          { id: "n3", label: "Şehirde karşılaşılan erişilebilirlik sorunları", hint: "İki örnek sayılıyor: biri rampa, biri tuvalet." },
          { id: "n4", label: "Sanatçının başarısını mümkün kılan destek", hint: "Kurum ve aile büyükleri." },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Hekimin hikâyesinde lise öğretmeninin rolü ne olmuştur?",
            options: [
              "Tıp eğitimini maddi olarak desteklemek",
              "Hekimlik hayalinden vazgeçmesini önermek",
              "“Gidilmemiş yolu sen aç” diyerek cesaret vermek",
              "Şehirdeki rampaları onartmak",
            ],
            answer: 2,
            explanation:
              "Öğretmenin sözü, hekimin hayalini sürdürmesini sağlayan dönüm noktasıdır; destek çoğu zaman tek bir cümleyle başlar.",
            hint: "Videoda öğretmenin söylediği tek cümleyi hatırla.",
          },
          {
            id: "q2",
            prompt: "Video, engelin kaynağı konusunda hangi sonuca götürür?",
            options: [
              "Engel yalnızca kişinin bedenindedir, toplumun payı yoktur",
              "Engelli bireylerin desteğe ihtiyacı yoktur",
              "Başarı yalnızca kişinin çabasına bağlıdır",
              "Engel çoğu zaman ön yargıda ve erişilebilirliği düşünmeyen düzenlemelerdedir",
            ],
            answer: 3,
            explanation:
              "Üç hikâyede de asıl zorluk, kişinin bedeni kadar toplumun bakışı ve kentin düzenlenmesidir.",
            hint: "Rampa, tuvalet ve otobüs örneklerini düşün.",
          },
        ],
        write: {
          title: "Kısa yazma: okulumda bir engel, bir çözüm",
          instruction:
            "Okulunda ya da mahallende katılımı zorlaştıran bir düzeni belirle; bu engeli kaldıracak iki somut öneri yaz. Son cümlede önerinin kime ne kazandıracağını belirt.",
          criteria: [
            "Engeli gözleme dayandır.",
            "İki öneriden birini maliyeti düşük olacak biçimde kur.",
            "Önerinin kime ne kazandıracağını yaz.",
          ],
          guide: "Engel → kim etkileniyor → öneri → beklenen katkı sırasını izle.",
          starter: "Okulumuzda … katılımı zorlaştırıyor, çünkü …",
          minChars: 170,
        },
      },
      {
        id: "qr-paralimpik-kahramanlar",
        weekIds: [3],
        kind: "İzleme",
        where: "s. 32 · 1. öğrenme alanı",
        title: "Paralimpik kahramanlar",
        sourceUrl: eba("63c076451e7fbbd14870627408def2c4"),
        sourceLinkLabel: "EBA · Paralimpik kahramanlar",
        sourceLinkType: "video",
        minutes: 7,
        focus: "Paralimpik oyunlar, Türkiye’nin katılımı ve takım başarısı",
        analysis: {
          doc: "docs/video-analysis/sayfa32-uc-video-gemini-analysis.md",
          speaker: "Anlatıcı (dış ses)",
          summary:
            "Paralimpik Oyunları 1960’ta başlar; Türkiye 2004’ten itibaren düzenli katılır. Pekin 2008’de Gizem Girişmen okçulukta Türkiye’nin ilk Paralimpik altın madalyasını kazanır. Londra 2012’de Nazmiye Muratlı halterde altın madalya alır. Rio 2016’da Kadın Golball Milli Takımı ilk takım şampiyonluğunu kazanır (Çin’i 4-1 yener); Nazmiye Muratlı ve Abdullah Öztürk de altın alır. Tokyo 2020’de takım üst üste ikinci kez şampiyon olur (ABD’yi 9-2 yener). Paris 2024’te takım üst üste üçüncü kez şampiyon olur; Mahmut Bozteke, Umut Ünlü, İbrahim Bölükbaşı ve Öznur Cüre Girdi altın madalya kazanır.",
          segments: [
            { at: "00:00", note: "Paralimpik Oyunları’nın tanımı (1960) ve Türkiye’nin 2004’ten itibaren katılımı." },
            { at: "01:04", note: "Pekin 2008: Gizem Girişmen, okçulukta ilk altın madalya." },
            { at: "01:29", note: "Londra 2012: Nazmiye Muratlı, halterde altın." },
            { at: "02:01", note: "Rio 2016: Kadın Golball Milli Takımı’nın ilk şampiyonluğu (Çin 4-1)." },
            { at: "03:29", note: "Tokyo 2020: takım üst üste ikinci kez şampiyon (ABD 9-2)." },
            { at: "04:34", note: "Paris 2024: üst üste üçüncü şampiyonluk ve dört bireysel altın." },
          ],
          keyPoints: [
            "Türkiye Paralimpik Oyunları’na 2004’ten itibaren düzenli katılır.",
            "İlk altın madalya 2008 Pekin’de okçulukta kazanılmıştır.",
            "Kadın Golball Milli Takımı Rio 2016, Tokyo 2020 ve Paris 2024’te üst üste üç kez şampiyon olmuştur.",
            "Başarı hem bireysel hem takım sporlarında sürmektedir.",
          ],
        },
        intro:
          "Karekodda Türkiye’nin Paralimpik Oyunları tarihi ve altın madalya kazanan sporcular anlatılıyor. İzlerken yılları ve branşları eşleştir: hangi başarı hangi oyunda geldi?",
        before: [
          "Paralimpik Oyunları ile olimpiyatlar arasındaki farkı biliyor musun? Tahminini yaz.",
          "Sence bir ülkenin oyunlara düzenli katılması neden önemlidir?",
        ],
        notes: [
          { id: "n1", label: "Türkiye’nin düzenli katılımının başladığı yıl", hint: "2000’lerin ortası." },
          { id: "n2", label: "İlk altın madalya: sporcu, branş ve oyun", hint: "Okçuluk, Pekin." },
          { id: "n3", label: "Üst üste üç kez şampiyon olan takım", hint: "Hangi branş, hangi takım?" },
          { id: "n4", label: "Paris 2024’te altın kazanan dört sporcu", hint: "Tekfando, yüzme, judo, okçuluk." },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Türkiye’nin ilk Paralimpik altın madalyası hangi oyunlarda kazanılmıştır?",
            options: [
              "Pekin 2008",
              "Londra 2012",
              "Rio 2016",
              "Tokyo 2020",
            ],
            answer: 0,
            explanation:
              "İlk altın madalya 2008 Pekin’de okçuluk klasik yay kategorisinde kazanılmıştır; video bunu bir dönüm noktası olarak verir.",
            hint: "Oyunların sırasını düşün: ilk altın, ilk katılımdan birkaç yıl sonra geldi.",
          },
          {
            id: "q2",
            prompt: "Kadın Golball Milli Takımı’nın Paris 2024’teki şampiyonluğu neyi gösterir?",
            options: [
              "Takımın oyunlara ilk kez katıldığını",
              "Takımın üst üste üçüncü kez şampiyon olduğunu",
              "Golballun bireysel bir spor olduğunu",
              "Takımın yalnızca bir kez altın aldığını",
            ],
            answer: 1,
            explanation:
              "Takım Rio 2016, Tokyo 2020 ve Paris 2024’te şampiyon olarak üst üste üç kez bu başarıya ulaşmıştır.",
            hint: "Video aynı takımın üç oyundaki sonucunu sıralıyor.",
          },
          {
            id: "q3",
            prompt: "Video boyunca başarılar hangi sırayla anlatılır?",
            options: [
              "Branşlara göre alfabetik",
              "Sporcuların yaşına göre",
              "Madalya sayısına göre",
              "Kronolojik olarak oyun yıllarına göre",
            ],
            answer: 3,
            explanation:
              "Anlatım Pekin 2008’den Paris 2024’e doğru ilerler; yıl sırası, başarıların gelişimini görmeyi kolaylaştırır.",
            hint: "Bölüm başlıklarındaki şehir ve yıllara bak.",
          },
        ],
        write: {
          title: "Kısa yazma: bir başarıyı duyur",
          instruction:
            "Videodaki başarılardan birini seç ve okul panosu için kısa bir duyuru metni yaz. Duyuruda sporcuyu ya da takımı, oyunu, branşı ve başarının önemini belirt; sonunda okuyucuyu harekete geçiren bir cümle kur.",
          criteria: [
            "Oyun yılı ve branş doğru yazılsın.",
            "Başarının neden önemli olduğu bir cümleyle açıklansın.",
            "Duyuru dili kısa, açık ve saygılı olsun.",
          ],
          guide: "Kim → hangi oyun → hangi branş → neden önemli → çağrı sırasını izle.",
          starter: "Okulumuzda gururla duyururuz: …",
          minChars: 150,
        },
      },
      {
        id: "qr-engellerine-ragmen-alti-isim",
        weekIds: [3],
        kind: "İzleme",
        where: "s. 32 · 1. öğrenme alanı",
        title: "Engellerine rağmen büyük başarılara imza atmış altı isim",
        sourceUrl: eba("c5c2fbcab508be24681e00d60dabd6ac"),
        sourceLinkLabel: "EBA · Engellerine rağmen altı isim",
        sourceLinkType: "video",
        minutes: 6,
        focus: "Engelin üretime engel olmadığı: sanat, edebiyat, bilim",
        analysis: {
          doc: "docs/video-analysis/sayfa32-uc-video-gemini-analysis.md",
          speaker: "Anlatıcı (belgesel tonunda dış ses)",
          summary:
            "Altı ismin engellerine rağmen üretmeyi sürdürdüğü anlatılır: Âşık Veysel 7 yaşında çiçek hastalığı sonucu görme yetisini kaybeder, bağlama çalar ve “Uzun İnce Bir Yoldayım”ı bırakır. Cemil Meriç ileri derecede miyopluk sonrası görme kaybı yaşar, “Bu Ülke” eserini yazar. Frida Kahlo ağır bir trafik kazası sonrası yatağına monte edilen şövaleyle resim yapmaya başlar. Beethoven tam sağırlığa varan işitme kaybına rağmen senfoniler besteler. Prof. Dr. Onur Güntürkün çocukluk felcine rağmen 35 yaşında profesör olur ve Leibniz Ödülü’nü kazanır. Thomas Edison işitme kaybına rağmen binden fazla patent alır.",
          segments: [
            { at: "00:00", note: "Giriş: engellerine rağmen insanlığa yön veren isimler ve azim mesajı." },
            { at: "00:47", note: "Âşık Veysel: 7 yaşında görme kaybı, bağlama, “Uzun İnce Bir Yoldayım”." },
            { at: "01:53", note: "Cemil Meriç: miyopluk sonrası görme kaybı, “Bu Ülke”." },
            { at: "02:54", note: "Frida Kahlo: trafik kazası, yatağa monte şövalye, resim." },
            { at: "03:49", note: "Beethoven: tam sağırlık, senfoniler." },
            { at: "04:47", note: "Onur Güntürkün: çocukluk felci, 35 yaşında profesörlük, Leibniz Ödülü." },
            { at: "05:41", note: "Edison: işitme kaybı, 1000’den fazla patent, ampul." },
          ],
          keyPoints: [
            "Altı isim de engelini üretimin sonu değil, koşullarından biri hâline getirmiştir.",
            "Eser ve buluşlar, engel ortaya çıktıktan sonra da üretilmiştir.",
            "Ortak nokta tutku, düzenli çalışma ve ısrardır.",
            "Engel farklı alanlarda görünür: görme, işitme, hareket.",
          ],
        },
        intro:
          "Karekodda engellerine rağmen sanat, edebiyat, bilim ve düşünce dünyasında iz bırakmış altı isim anlatılıyor. İzlerken her isim için iki şey not al: engeli neydi, engelinden sonra ne üretti?",
        before: [
          "Adını duyduğun bir sanatçı ya da bilim insanı var mı? Ne ürettiğini bir cümleyle yaz.",
          "Sence bir engel, üretmeyi nasıl etkiler? Tahminini not et.",
        ],
        notes: [
          { id: "n1", label: "Âşık Veysel’in engeli ve bıraktığı eser", hint: "Yedi yaşında ne oldu, hangi türkü anılıyor?" },
          { id: "n2", label: "Cemil Meriç’in eseri", hint: "İki sözcüklü kitap adı." },
          { id: "n3", label: "Frida Kahlo’nun resme başlamasını sağlayan düzenek", hint: "Yatağa monte edilen araç." },
          { id: "n4", label: "Ortak nokta", hint: "Altı isimde de görülen iki özellik." },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Frida Kahlo’nun resim yapmaya başlamasını sağlayan koşul hangisidir?",
            options: [
              "Bir resim okuluna bursla başlaması",
              "Ailesinin atölye açması",
              "Trafik kazası sonrası yatağına monte edilen şövalye",
              "Ünlü bir ressamdan ders alması",
            ],
            answer: 2,
            explanation:
              "Kaza sonrası yatağa bağlı kalan Kahlo, yatağına monte edilen şövalye sayesinde resim yapmaya başlar.",
            hint: "Videoda yatakla birlikte anılan nesneyi düşün.",
          },
          {
            id: "q2",
            prompt: "Prof. Dr. Onur Güntürkün ile ilgili hangi bilgi videoda verilir?",
            options: [
              "Müzik bestelediği",
              "Elektrik ampulünü icat ettiği",
              "Roman yazdığı",
              "Çocukluk felcine rağmen 35 yaşında profesör olduğu",
            ],
            answer: 3,
            explanation:
              "Güntürkün’ün çocukluk felci ve yürüme engeline rağmen 35 yaşında profesör olduğu, beyin üzerine çalıştığı ve Leibniz Ödülü’nü kazandığı anlatılır.",
            hint: "Bilim insanı olan tek isim hangisi?",
          },
          {
            id: "q3",
            prompt: "Video, altı ismin ortak yönünü nasıl açıklar?",
            options: [
              "Engellerine rağmen tutku ve çalışmayla üretmeyi sürdürmüşlerdir",
              "Hepsi aynı ülkede doğmuştur",
              "Hepsi çocukken engelini kaybetmiştir",
              "Hepsi yalnızca sanat alanında eser vermiştir",
            ],
            answer: 0,
            explanation:
              "İsimler farklı ülke, dönem ve alanlardan; ortak nokta engelin üretimi durdurmaması ve ısrarlı çalışma.",
            hint: "Alanlar farklı, dönemler farklı; geriye ne kalıyor?",
          },
        ],
        write: {
          title: "Kısa yazma: engelden sonra üretim",
          instruction:
            "Videodaki isimlerden birini seç. Engelinin ne olduğunu, engelinden sonra ne ürettiğini ve bunu nasıl başardığını kendi cümlelerinle yaz. Sonunda bu örneğin bugün bir öğrenciye ne söylediğini bir cümleyle belirt.",
          criteria: [
            "Engel ile üretim arasındaki ilişki açık kurulsun.",
            "En az bir somut eser ya da buluş adı geçsin.",
            "Sonuç cümlesi günlük hayata bağlansın.",
          ],
          guide: "Kişi → engel → üretim → yöntem → bugüne mesaj sırasını izle.",
          starter: "Seçtiğim isim …; engeli …",
          minChars: 160,
        },
      },
      {
        id: "qr-milli-meseleler",
        weekIds: [4, 5],
        kind: "İzleme",
        where: "s. 45 · 1. öğrenme alanı",
        title: "“Millî Meselelerde Biz” videosu",
        sourceUrl: eba("6e1f6955aeff331cc85451f6a8231cc5"),
        sourceLinkLabel: "EBA · Millî Meselelerde Biz",
        sourceLinkType: "video",
        minutes: 4,
        focus: "Millî Mücadele’de kadın-erkek dayanışması, İstiklal Yolu ve ortak sorumluluk",
        analysis: {
          doc: "docs/video-analysis/milli-meselelerde-biz-gemini-analysis.md",
          speaker: "Dış ses (destansı anlatım) ve canlandırma: Yakup Kadri Karaosmanoğlu, Anadolu kadını",
          summary:
            "Yakup Kadri Karaosmanoğlu cephede Anadolu kadınının mücadelesine tanık olur. Ağır yük taşıyan bir kadına yardım ederken “Sizleri böyle mücadelede görünce şaşırıyorum” der; kadın “Bu vatan sadece erkeklerin vatanı mı?” diye yanıtlar. Video, İnebolu’dan Ankara’ya uzanan 340 kilometrelik İstiklal Yolu’nda kadınların cephane taşıdığını, yaralıları tedavi ettiğini ve savaşa katıldığını anlatır. Kapanışta “ben sen yok, biz varız” anlayışıyla millî birlik ve dayanışma vurgulanır.",
          segments: [
            { at: "00:00", note: "Cephe gerisi hazırlık sahneleri; Yakup Kadri’nin Anadolu kadınına dair tanıklığı." },
            { at: "00:40", note: "Ağır yük taşıyan kadına yardım; “Bu vatan sadece erkeklerin vatanı mı?” yanıtı." },
            { at: "01:17", note: "İnebolu–Ankara 340 km: cephane taşıma, yaralı tedavisi, savaşa katılma." },
            { at: "02:01", note: "Kapanış: millî birlik, omuz omuza dayanışma, “Biz Türkiye’yiz”." },
          ],
          keyPoints: [
            "Vatan savunması kadın-erkek ayrımı olmadan topyekûn yürütülmüştür.",
            "Cephane İnebolu’dan Ankara’ya 340 kilometrelik İstiklal Yolu üzerinden taşınmıştır.",
            "“Bu vatan sadece erkeklerin vatanı mı?” sorusu sorumluluğun ortak olduğunu anlatır.",
            "“Ben sen yok, biz varız” anlayışı bireysel çıkar yerine ortak sorumluluğu öne çıkarır.",
          ],
        },
        intro:
          "Karekodda Yakup Kadri Karaosmanoğlu’nun tanıklığıyla Millî Mücadele’de kadınların üstlendiği görev anlatılıyor. İzlerken iki şeyi ayır: hangi iş yapıldı, bu işi kim ve hangi koşullarda yaptı?",
        before: [
          "“Millî mesele” ifadesini kendi cümlelerinle tanımla.",
          "Cephe gerisinde yapılan işler sence savaşın sonucunu etkiler mi? Tahminini yaz.",
        ],
        notes: [
          { id: "n1", label: "Yakup Kadri’nin şaşkınlığına verilen yanıt", hint: "Videoda geçen soru cümlesi." },
          { id: "n2", label: "Cephane taşınan hat ve uzunluğu", hint: "İki yer adı ve kilometre." },
          { id: "n3", label: "Kadınların cephe gerisinde yaptığı üç iş", hint: "Taşıma, tedavi ve biri daha." },
          { id: "n4", label: "Kapanıştaki dayanışma cümlesi", hint: "“Ben … yok, … varız.”" },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Yakup Kadri’nin “Sizleri böyle mücadelede görünce şaşırıyorum” sözüne kadın hangi yanıtı verir?",
            options: [
              "“Cepheye yalnızca askerler gider.”",
              "“Bu vatan sadece erkeklerin vatanı mı?”",
              "“Bu yükü taşımak bizim işimiz değil.”",
              "“Savaş bitince her şey düzelir.”",
            ],
            answer: 1,
            explanation:
              "Kadın, sorumluluğun cinsiyete bağlanamayacağını bir soruyla dile getirir: vatan savunması ortaktır.",
            hint: "Yanıt bir itiraz değil, karşı soru biçiminde.",
          },
          {
            id: "q2",
            prompt: "Videoda cephane taşınan hat ve uzunluğu hangisidir?",
            options: [
              "Samsun – Ankara, 200 km",
              "Trabzon – Erzurum, 500 km",
              "İzmir – Ankara, 600 km",
              "İnebolu – Ankara, 340 km",
            ],
            answer: 3,
            explanation:
              "Kadınlar İnebolu’dan Ankara’ya uzanan 340 kilometrelik İstiklal Yolu üzerinde cephane taşımıştır.",
            hint: "Video, Karadeniz kıyısındaki bir liman kasabasından başlıyor.",
          },
          {
            id: "q3",
            prompt: "Videonun kapanışındaki “ben sen yok, biz varız” anlayışı neyi anlatır?",
            options: [
              "Bireysel çıkar yerine ortak sorumluluğu",
              "Herkesin yalnızca kendi işini yapmasını",
              "Sorumluluğun yalnızca devlete ait olduğunu",
              "Zorlukların görmezden gelinmesini",
            ],
            answer: 0,
            explanation:
              "İfade, tek tek bireylerin çıkarı yerine toplumun ortak sorumluluğunu ve dayanışmasını öne çıkarır.",
            hint: "Cümlenin öznesi “ben” değil, “biz”.",
          },
        ],
        write: {
          title: "Kısa yazma: tanığın gözünden bir sahne",
          instruction:
            "Videodaki diyalogu tanık olarak yeniden yaz. Kadının taşıdığı yükü, Yakup Kadri’nin sözünü ve kadının yanıtını kendi cümlelerinle anlat; sonunda bu sahnenin millî birlik açısından ne anlattığını bir cümleyle belirt.",
          criteria: [
            "Sahne, kişiler ve yük somut olarak yer alsın.",
            "Kadının yanıtı dolaylı anlatımla da olsa kurulsun.",
            "Sonuç cümlesi dayanışmayı gerekçelendirsin.",
          ],
          guide: "Ortam → tanık → diyalog → anlam sırasını izle.",
          starter: "Cephe gerisinde, yük taşıyan bir kadına rastladım; …",
          minChars: 170,
        },
      },
      {
        id: "qr-15-temmuz",
        weekIds: [4, 5],
        kind: "İzleme",
        where: "s. 45 · 1. öğrenme alanı",
        title: "15 Temmuz Darbe Girişimi",
        sourceUrl: eba("b14529259e0b211f8d6ae3a4bb6ab951"),
        sourceLinkLabel: "EBA · 15 Temmuz Darbe Girişimi",
        sourceLinkType: "video",
        minutes: 3,
        focus: "Demokrasiye sahip çıkma, millî irade ve birlikte direnme",
        analysis: {
          doc: "docs/video-analysis/15-temmuz-darbe-girisimi-gemini-analysis.md",
          speaker: "Anlatıcı (dış ses)",
          summary:
            "15 Temmuz 2016 gecesi devletin içine sızmış terör örgütü darbe girişimi yapar; millete silah doğrulur ve Gazi Meclis bombalanır. Cumhurbaşkanının çağrısıyla meydanlara inen halk tankların önüne yatarak canı pahasına direnir; girişim bozguna uğrar. Video, “Vatan bizim, irade bizimdir” vurgusuyla milletin kazandığı demokrasi zaferini anlatır.",
          segments: [
            { at: "00:00", note: "“15 Temmuz Destanı” başlığı ve 15 Temmuz 2016 gecesine dair görüntüler." },
            { at: "00:23", note: "Silahın millete çevrilmesi ve Gazi Meclis’in bombalanması." },
            { at: "00:38", note: "Halkın çağrıyla sokaklara inmesi, tankların önüne yürümesi, şehit ve gaziler." },
            { at: "01:06", note: "Girişimin bozguna uğraması; “Vatan bizim, irade bizimdir” ile kapanış." },
          ],
          keyPoints: [
            "15 Temmuz 2016’da demokratik düzene ve iradeye yönelik bir darbe girişimi yaşanmıştır.",
            "Girişimi durduran güç, halkın meydanlarda gösterdiği birlik ve direnç olmuştur.",
            "TBMM’nin bombalanması, girişimin demokrasiyi doğrudan hedef aldığını gösterir.",
            "“Vatan bizim, irade bizimdir” sözü egemenliğin millete ait olduğunu anlatır.",
          ],
        },
        intro:
          "Karekodda 15 Temmuz 2016 gecesi ve milletin direnişi anlatılıyor. İzlerken iki şeyi ayır: girişim neyi hedef aldı, girişimi durduran ne oldu?",
        before: [
          "“Millî irade” ifadesi sence ne anlama gelir? Kısaca yaz.",
          "Bir toplumun olağanüstü bir gecede birlikte hareket etmesini sağlayan şey ne olabilir? Tahminini not et.",
        ],
        notes: [
          { id: "n1", label: "Girişimin hedef aldığı iki yer ya da değer", hint: "Biri Meclis, diğeri egemenlik." },
          { id: "n2", label: "Halkın harekete geçme biçimi", hint: "Kim çağırdı, halk ne yaptı?" },
          { id: "n3", label: "Kapanıştaki söz", hint: "“Vatan bizim, … bizimdir.”" },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Videoda darbe girişiminin demokrasiyi hedef aldığını gösteren somut olay hangisidir?",
            options: [
              "Gazi Meclis’in bombalanması",
              "Halkın meydanlara inmesi",
              "Şehit ve gazilerin anılması",
              "Köprünün trafiğe kapatılması",
            ],
            answer: 0,
            explanation:
              "Meclis, millî iradenin kurumsal karşılığıdır; meclisin bombalanması doğrudan demokrasiyi hedef alır.",
            hint: "Egemenliğin temsil edildiği kurum hangisi?",
          },
          {
            id: "q2",
            prompt: "Girişimin kısa sürede başarısız olmasında en belirleyici etken hangisidir?",
            options: [
              "Uluslararası kuruluşların açıklamaları",
              "Girişimin gece saatlerinde başlaması",
              "Halkın çağrıya uyup meydanlarda birlikte direnmesi",
              "Basının olayı bir süre duyurmaması",
            ],
            answer: 2,
            explanation:
              "Video, girişimin halkın tek vücut olup sokaklara inmesiyle bozguna uğradığını anlatır.",
            hint: "Tankların önüne kim yürüdü?",
          },
          {
            id: "q3",
            prompt: "“Vatan bizim, irade bizimdir” sözü neyi anlatır?",
            options: [
              "Kararların yalnızca yöneticilere bırakıldığını",
              "Savunmanın yalnızca güvenlik güçlerine ait olduğunu",
              "Olağanüstü hâllerde yönetimin değiştiğini",
              "Egemenliğin millete ait olduğunu",
            ],
            answer: 3,
            explanation:
              "İfade, vatanın ve iradenin millete ait olduğunu; demokrasinin kaynağının halk olduğunu söyler.",
            hint: "Cümlenin öznesi “biz”.",
          },
          {
            id: "q4",
            prompt: "Olağanüstü bir gecede bilgi kirliliğine karşı en doğru davranış hangisidir?",
            options: [
              "Doğrulanmamış iletileri hızla paylaşmak",
              "Yalnızca sosyal medyadaki yorumlara bakmak",
              "Resmî açıklamaları ve güvenilir kaynakları doğrulamak",
              "Haberi tamamen görmezden gelmek",
            ],
            answer: 2,
            explanation:
              "Kriz anlarında hız kadar doğruluk önemlidir: kaynağı belirsiz bilgi panik ve yanlış yönlendirme üretir.",
            hint: "Hangi seçenek kaynağı denetlemeyi içeriyor?",
          },
        ],
        write: {
          title: "Kısa yazma: demokrasiye sahip çıkmak ne demek?",
          instruction:
            "“Demokrasiye sahip çıkmak” ifadesini bir öğrenci gözüyle açıkla. Video ve sayfadaki metinden yararlanarak günlük hayatta bu tutumun hangi iki küçük davranışa dönüşebileceğini yaz.",
          criteria: [
            "Tanım kendi cümlelerinle kurulsun.",
            "İki örnek günlük yaşamdan seçilsin.",
            "Örneklerin neden demokrasiyle ilgili olduğu açıklansın.",
          ],
          guide: "Tanım → iki örnek → örneklerin gerekçesi sırasını izle.",
          starter: "Demokrasiye sahip çıkmak, bence …",
          minChars: 150,
        },
      },
      {
        id: "qr-kuresellesme",
        weekIds: [6],
        kind: "İzleme",
        where: "s. 60 · 2. öğrenme alanı",
        title: "Küreselleşme içeriği",
        sourceUrl: eba("a9e7ce50bc4c0fa37a38be23b4a8af35"),
        sourceLinkLabel: "EBA · Küreselleşme içeriği",
        sourceLinkType: "video",
        minutes: 3,
        focus: "Küresel köy, küreselleşmenin fırsatları ve yerel kültürü koruma dengesi",
        analysis: {
          doc: "docs/video-analysis/kuresellesme-gemini-analysis.md",
          speaker: "Anlatıcı (öğretici dış ses)",
          summary:
            "Ulaşım ve iletişim teknolojileri geliştikçe dünya “küresel bir köy” hâline gelir: internet, bilgiye hızlı erişim ve küresel ticaret ağları sayesinde ürünler kapıya kadar gelir. Ancak iklim değişikliği ve çevre kirliliği gibi ortak sorunlar büyür, yerel kültürler kaybolma riskiyle karşılaşır. Video, kendi kültürümüzü korurken dünyayla bağları koparmama dengesini önerir.",
          segments: [
            { at: "00:00", note: "Ulaşım ve iletişimle dünyanın küçülmesi; “küresel köy” kavramı." },
            { at: "00:21", note: "İnternet, bilgiye hızlı erişim, küresel ticaret; ürünlerin kapıya gelmesi." },
            { at: "00:42", note: "Ortak sorunlar (iklim, çevre), yerel kültür riski ve kültürel denge çağrısı." },
          ],
          keyPoints: [
            "Küreselleşme, ulaşım ve iletişim teknolojilerinin mesafeleri kısaltmasıyla hızlanmıştır.",
            "Bilgiye, ürünlere ve farklı kültürlere erişim kolaylaşır; bu bir fırsattır.",
            "İklim değişikliği ve çevre kirliliği gibi sorunlar küresel olduğu için ortak çözüm ister.",
            "Yerel kültürü korumak ile dünyaya açık olmak birbirinin alternatifi değildir; denge gerekir.",
          ],
        },
        intro:
          "Karekod, küreselleşmenin dünyayı nasıl küçülttüğünü ve beraberinde getirdiği sorunları anlatıyor. İzlerken fırsatları ve riskleri iki ayrı sütun gibi biriktir.",
        before: [
          "Bugün kullandığın üç ürünün nerede üretildiğini tahmin et.",
          "Sence dünya “küresel bir köy”e benziyor mu? Bir gerekçeyle yaz.",
        ],
        notes: [
          { id: "n1", label: "Videoda kullanılan benzetme", hint: "Dünya artık neye benzetiliyor?" },
          { id: "n2", label: "Küreselleşmenin getirdiği bir fırsat", hint: "Bilgi, ürün ya da kültür erişimi." },
          { id: "n3", label: "İki ortak küresel sorun", hint: "İkisi de doğayla ilgili." },
          { id: "n4", label: "Kültürümüzü korurken kurulması gereken denge", hint: "Kapanmak mı, denge mi?" },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Videoda küreselleşmeyi anlatmak için kullanılan benzetme hangisidir?",
            options: [
              "Küresel köy",
              "Dijital duvar",
              "Açık pazar",
              "Hızlı tren",
            ],
            answer: 0,
            explanation:
              "Ulaşım ve iletişimle mesafelerin kısalması, dünyanın küçük bir köy gibi birbirine bağlanmasına benzetilir.",
            hint: "Benzetmede hem “küresel” hem bir yerleşim adı var.",
          },
          {
            id: "q2",
            prompt: "Videoya göre küreselleşmenin getirdiği sorunlardan biri hangisidir?",
            options: [
              "Bilgiye erişimin yavaşlaması",
              "İklim değişikliği ve çevre kirliliği",
              "Ürünlere ulaşımın zorlaşması",
              "Ülkeler arası ticaretin azalması",
            ],
            answer: 1,
            explanation:
              "Video, küresel ekonominin büyümesiyle iklim değişikliği ve çevre kirliliği gibi ortak sorunların da büyüdüğünü söyler.",
            hint: "Sorunlardan ikisi de doğayla ilgiliydi.",
          },
          {
            id: "q3",
            prompt: "Video, yerel kültürler konusunda hangi tutumu önerir?",
            options: [
              "Kültürel bağları tamamen koparıp yalnızca küresel olanı izlemeyi",
              "Dünyaya kapanıp hiçbir dış içeriği kullanmamayı",
              "Yerel kültürü korurken dünyayla bağları sürdüren bir denge kurmayı",
              "Yerel kültürlerin kendiliğinden korunacağını varsaymayı",
            ],
            answer: 2,
            explanation:
              "Video, kültürümüzü korurken dünyayla bağları koparmama dengesini önerir; kapanmak da kopmak da çözüm değildir.",
            hint: "Kapanmak ile kopmak arasındaki üçüncü yol.",
          },
          {
            id: "q4",
            prompt: "Küresel bir ürünü değerlendirirken en sağlıklı soru hangisidir?",
            options: [
              "Bu ürün popüler mi?",
              "Bu ürün pahalı mı?",
              "Bu ürünü kimler kullanıyor?",
              "Bu ürünün üretim, taşıma ve tüketim yolculuğu nasıl?",
            ],
            answer: 3,
            explanation:
              "Üretim ve taşıma yolculuğunu sormak, ürünün ekonomik ve çevresel etkisini görünür kılar.",
            hint: "Hangi soru süreci görünür kılar?",
          },
        ],
        write: {
          title: "Kısa yazma: fırsat mı, risk mi?",
          instruction:
            "Küreselleşmenin günlük hayatındaki bir fırsatını ve bir riskini yaz. Sonunda yerel kültürümüzü koruyarak dünyaya açık kalmanın nasıl mümkün olacağını kendi cümlelerinle açıkla.",
          criteria: [
            "Fırsat ve risk ayrı ayrı örneklensin.",
            "En az bir somut ürün, alışkanlık ya da olay kullanılsın.",
            "Denge önerisi gerekçesiyle yazılsın.",
          ],
          guide: "Fırsat → risk → denge önerisi sırasını izle.",
          starter: "Küreselleşmenin bana sağladığı fırsat …; buna karşılık …",
          minChars: 170,
        },
      },
      {
        id: "qr-kahvenin-yolculugu",
        weekIds: [6],
        kind: "İzleme",
        where: "s. 63 · 2. öğrenme alanı",
        title: "Kahvenin yolculuğu",
        sourceUrl: eba("0a91216d32df2405b32be9c6a740c34a"),
        sourceLinkLabel: "EBA · Kahvenin yolculuğu",
        sourceLinkType: "video",
        minutes: 5,
        focus: "Üretim–ticaret–marka zinciri, yerel kültür ve katma değer",
        intro:
          "İçerik, ithal edilen bir ürünün yerel emek ve kültürle nasıl markaya dönüştüğünü anlatıyor. İzlerken zincirin halkalarını sırayla not et.",
        before: [
          "Bir ürünü “marka” yapan nedir? Üç özellik yaz.",
          "Ham madde ile işlenmiş ürün arasındaki fiyat farkı neden oluşur?",
        ],
        notes: [
          { id: "n1", label: "Zincirin ilk halkası", hint: "Ham madde nereden geliyor?" },
          { id: "n2", label: "Değeri artıran aşama", hint: "İşleme, sunum, kültür, tanıtım…" },
          { id: "n3", label: "Yerel kültürün kattığı fark", hint: "Sunum biçimi, gelenek, hikâye." },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Bir ürünün katma değerini artıran en güçlü adım hangisidir?",
            options: [
              "Ham maddeyi olduğu gibi satmak",
              "Yalnızca ambalaj rengini değiştirmek",
              "Üretimi tamamen durdurmak",
              "Ürünü işleyip kültürel bir anlatıyla sunmak",
            ],
            answer: 3,
            explanation: "İşleme ve kültürel anlatı, ürünün değerini ve ayırt ediciliğini artırır.",
            hint: "Hangisi hem emek hem kültür içeriyor?",
          },
          {
            id: "q2",
            prompt: "Küresel ticarette yerel üreticiyi güçlendiren yol hangisidir?",
            options: [
              "Kaliteyi ve hikâyeyi öne çıkarıp marka oluşturmak",
              "Ürün çeşitliliğini azaltmak",
              "Yalnızca iç pazara yönelmek",
              "Aracı sayısını artırmak",
            ],
            answer: 0,
            explanation: "Kalite ve anlatı birlikte marka değeri üretir; bu da üreticinin pazarlık gücünü artırır.",
            hint: "Hangisi ürüne ayırt edicilik katar?",
          },
        ],
        write: {
          title: "Kısa yazma: yerel bir ürünü markalaştırma",
          instruction:
            "Yaşadığın yerden bir ürün seç (gıda, el sanatı, dokuma vb.). Bu ürünü güçlendirecek üç adımı ve her adımın katkısını yaz.",
          criteria: [
            "Üç adımı sırayla ver.",
            "Her adımın ürünün değerine katkısını belirt.",
            "Yerel kültürle bağ kur.",
          ],
          guide: "Ürün → sorun → adım → katkı sırasını izle.",
          starter: "Yöremizde üretilen …; bu ürünü güçlendirmek için …",
          minChars: 160,
        },
      },
      {
        id: "qr-jeopolitik-konum",
        weekIds: [7],
        kind: "İzleme",
        where: "s. 72 · 2. öğrenme alanı",
        title: "Türkiye’nin jeopolitik konumu ve dış politikası",
        sourceUrl: eba("d8e6ad2d9687967f09a69ce26cff8a2e"),
        sourceLinkLabel: "EBA · Jeopolitik konum ve dış politika",
        sourceLinkType: "video",
        minutes: 6,
        focus: "Konum, ulaşım koridorları ve diplomasi",
        intro:
          "Karekod, Türkiye’nin konumunu bölgesel ve küresel sorunlardaki rolüyle ilişkilendiriyor. İzlerken konumun sağladığı üç avantajı ve bu avantajın doğurduğu bir sorumluluğu not et.",
        before: [
          "Türkiye’nin hangi iki kıtayı birleştirdiğini yaz.",
          "Bir ülkenin konumu dış politikasını nasıl etkiler? Tahminin ne?",
        ],
        notes: [
          { id: "n1", label: "Konumun sağladığı iki avantaj", hint: "Ticaret yolu, enerji hattı, ulaşım koridoru…" },
          { id: "n2", label: "Bu konumun getirdiği sorumluluk", hint: "Güvenlik, arabuluculuk, insani yardım…" },
          { id: "n3", label: "İçerikte geçen bir iş birliği örneği", hint: "Kurum ya da proje adı." },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Bir ülkenin “jeopolitik konumu” ifadesi neyi anlatır?",
            options: [
              "Coğrafi yerinin siyasi ve ekonomik etkilerini",
              "Yüzölçümünün büyüklüğünü",
              "Nüfus yoğunluğunu",
              "İklim özelliklerini",
            ],
            answer: 0,
            explanation: "Jeopolitik konum, coğrafyanın siyaset ve ekonomiyle kesişen etkisidir.",
            hint: "“Jeo” ve “politik” sözcüklerini ayır.",
          },
          {
            id: "q2",
            prompt: "Türkiye’nin insani yardım faaliyetleri dış politikada ne sağlar?",
            options: [
              "Yalnızca ekonomik kazanç",
              "Uluslararası güven ve iş birliği zemini",
              "Askerî üstünlük",
              "İç politikada istikrar",
            ],
            answer: 1,
            explanation: "İnsani yardım, güven ve iş birliği üretir; ülkenin arabuluculuk kapasitesini güçlendirir.",
            hint: "Yardım hangi ilişkiyi güçlendirir?",
          },
        ],
        write: {
          title: "Kısa yazma: konumdan role",
          instruction:
            "Türkiye’nin konumunun sağladığı bir avantajı seç; bu avantajın bölgesel bir sorunda nasıl sorumluluğa dönüştüğünü açıkla.",
          criteria: [
            "Avantajı somut bir örnekle yaz.",
            "Bir sorun ve bu sorundaki rolü belirt.",
            "Rolün gerekçesini yaz.",
          ],
          guide: "Konum → avantaj → sorun → rol sırasını izle.",
          starter: "Türkiye’nin … konumu, … sorununda … rolünü gerektiriyor.",
          minChars: 160,
        },
      },
      {
        id: "qr-insani-yardim",
        weekIds: [8],
        kind: "İzleme",
        where: "s. 75–76 · 2. öğrenme alanı",
        title: "İnsani yardım ve girişimci dış politika",
        sourceUrl: eba("a1da14c0d38310a7068eefd025ec8f8f"),
        sourceLinkLabel: "EBA · İnsani yardım ve dış politika",
        sourceLinkType: "video",
        minutes: 6,
        focus: "İnsani diplomasi, yardımın planlanması ve sürdürülebilirlik",
        intro:
          "Karekod, Türkiye’nin insani yardım alanındaki çalışmalarını gösteriyor. İzlerken yardımın hangi ihtiyaca yanıt verdiğini ve sürecin nasıl planlandığını not et.",
        before: [
          "Bir yardımın işe yaraması için önce neyin belirlenmesi gerekir?",
          "“Yardım” ile “sürdürülebilir destek” arasındaki fark ne olabilir?",
        ],
        notes: [
          { id: "n1", label: "Yardımın yanıt verdiği ihtiyaç", hint: "Sağlık, eğitim, barınma, gıda…" },
          { id: "n2", label: "Yardımı yürüten kurum ya da kuruluş", hint: "Kurum adı geçiyorsa yaz." },
          { id: "n3", label: "Süreklilik sağlayan adım", hint: "Eğitim, yerel ortaklık, kapasite…" },
        ],
        questions: [
          {
            id: "q1",
            prompt: "İnsani yardımın en temel ölçütü nedir?",
            options: [
              "Yardımı yapan ülkenin tanıtımı",
              "İhtiyacın gerçekliği ve yardımın ulaşılabilirliği",
              "Yardımın büyüklüğü",
              "Medyada görünürlüğü",
            ],
            answer: 1,
            explanation: "Yardım, gerçek ihtiyaca dayanmalı ve ihtiyaç sahibine ulaşmalıdır.",
            hint: "Kimin ihtiyacı, ne kadar ulaşıyor?",
          },
          {
            id: "q2",
            prompt: "Acil yardımın ardından atılacak en doğru adım hangisidir?",
            options: [
              "Çalışmayı sonlandırmak",
              "Yardımı yalnızca bir bölgeye yoğunlaştırmak",
              "Yerel kapasiteyi güçlendirecek kalıcı desteğe geçmek",
              "Yardımı aynı biçimde sürdürmek",
            ],
            answer: 2,
            explanation: "Kalıcı destek, yerel kapasiteyi güçlendirerek bağımlılığı azaltır.",
            hint: "İki hafta sonra ne değişmeli?",
          },
        ],
        write: {
          title: "Kısa yazma: yardım planı",
          instruction:
            "Bir ihtiyaç belirle (okul, mahalle ya da başka bir topluluk). Acil, orta ve uzun vadeli üç adımdan oluşan bir destek planı yaz.",
          criteria: [
            "İhtiyacı kanıtla tanımla.",
            "Üç zaman dilimini ayır.",
            "Kalıcılığı sağlayan adımı işaretle.",
          ],
          guide: "İhtiyaç → acil → orta → uzun vade sırasını izle.",
          starter: "Belirlediğim ihtiyaç …; ilk adım …",
          minChars: 170,
        },
      },
      {
        id: "qr-cihan-devleti-hukumdarlar",
        weekIds: [9, 10, 11],
        kind: "Dijital içerik",
        where: "s. 96 · 3. öğrenme alanı",
        title: "Cihan devletine giden dönemler ve hükümdarlar",
        sourceUrl: eba("3bb79a4a924568a745198daba651f7c8"),
        sourceLinkLabel: "EBA · Dönemler ve hükümdarlar",
        sourceLinkType: "video",
        minutes: 6,
        focus: "Kuruluştan cihan devletine: dönemler, hükümdarlar ve kurumlar",
        intro:
          "Karekod, Osmanlı Devleti’nin kuruluşundan cihan devletine uzanan dönemlerini ve bu dönemlerde öne çıkan hükümdarları anlatıyor. İzlerken her dönemin hangi soruna çözüm ürettiğini not et.",
        before: [
          "Bir devletin “cihan devleti” sayılması için hangi ölçütler gerekir? Üçünü yaz.",
          "Bir hükümdarın başarısını değerlendirirken hangi kanıtlara bakılır?",
        ],
        notes: [
          { id: "n1", label: "İçerikte ayrılan dönemler", hint: "Kuruluş, yükselme…" },
          { id: "n2", label: "Bir dönemin öne çıkan hükümdarı ve uygulaması", hint: "Fetih, iskân, teşkilatlanma…" },
          { id: "n3", label: "Dönemin çözdüğü sorun", hint: "Savunma, ticaret, merkezî otorite…" },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Dönemleri sıralarken en güvenilir ölçüt hangisidir?",
            options: [
              "Hükümdarların portrelerinin sırası",
              "Sayfaların kitaptaki yeri",
              "Olayların tarihleri ve neden–sonuç ilişkisi",
              "Dönem adlarının uzunluğu",
            ],
            answer: 2,
            explanation: "Tarihlendirme ve neden–sonuç ilişkisi dönemleri nesnel biçimde sıralamayı sağlar.",
            hint: "Tarih ve neden–sonuç.",
          },
          {
            id: "q2",
            prompt: "Bir hükümdarın uygulamasını değerlendirirken hangi soru daha verimlidir?",
            options: [
              "Uygulama kaç gün sürdü?",
              "Uygulamayı kim yazıya geçirdi?",
              "Uygulama hangi dilde adlandırıldı?",
              "Uygulama hangi soruna yanıt olarak yapıldı ve sonucu ne oldu?",
            ],
            answer: 3,
            explanation: "Amaç ve sonuç birlikte bakıldığında uygulamanın etkisi değerlendirilebilir.",
            hint: "Amaç → sonuç.",
          },
        ],
        write: {
          title: "Kısa yazma: bir dönemin çözdüğü sorun",
          instruction:
            "İçerikte adı geçen bir dönemi seç. O dönemin hangi soruna yanıt verdiğini, hangi uygulamayla bunu yaptığını ve sonucunu kendi cümlelerinle yaz.",
          criteria: [
            "Dönemi ve hükümdarı adlandır.",
            "Sorunu ve uygulamayı somutlaştır.",
            "Sonucu bir kanıtla destekle.",
          ],
          guide: "Dönem → sorun → uygulama → sonuç sırasını izle.",
          starter: "Seçtiğim dönemde … sorunu vardı; bu nedenle …",
          minChars: 170,
        },
      },
      {
        id: "qr-barbaros",
        weekIds: [12],
        kind: "İzleme",
        where: "s. 105 · 3. öğrenme alanı",
        title: "Barbaros Hayreddin Paşa ve deniz kuvvetleri",
        sourceUrl: eba("64347117dac0957fbdbc54a5c18d6e50"),
        sourceLinkLabel: "EBA · Barbaros Hayreddin Paşa",
        sourceLinkType: "video",
        minutes: 6,
        focus: "Deniz gücü, Preveze ve Akdeniz siyaseti",
        intro:
          "Karekod, Osmanlı deniz gücünün Akdeniz’deki etkisini anlatıyor. İzlerken deniz gücünün neden hem askerî hem ekonomik olduğunu not et.",
        before: [
          "Bir devlet için deniz gücü neden önemlidir? İki neden yaz.",
          "Preveze Deniz Zaferi’nin günümüzde bir gün olarak anılması ne gösterir?",
        ],
        notes: [
          { id: "n1", label: "Deniz gücünün ekonomik karşılığı", hint: "Ticaret yolları, limanlar, güvenlik." },
          { id: "n2", label: "İçerikte öne çıkan bir olay ya da sefer", hint: "Adı ve sonucu." },
          { id: "n3", label: "Deniz gücü ile kara gücü arasındaki fark", hint: "Hız, erişim, süreklilik." },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Deniz ticaret yollarını denetlemek bir devlete ne kazandırır?",
            options: [
              "Yalnızca askerî üstünlük",
              "Nüfus artışı",
              "Tarımsal verim",
              "Ekonomik gelir ve siyasi pazarlık gücü",
            ],
            answer: 3,
            explanation: "Ticaret yollarının denetimi gelir ve pazarlık gücü üretir; askerî güç bunun aracıdır.",
            hint: "Gelir ve güç ilişkisini düşün.",
          },
          {
            id: "q2",
            prompt: "Tarihî bir zaferin günümüzde anma günü olması ne sağlar?",
            options: [
              "Toplumsal hafızayı canlı tutar",
              "Olayın tarihini değiştirir",
              "Askerî gücü artırır",
              "Ekonomik gelir sağlar",
            ],
            answer: 0,
            explanation: "Anma günleri ortak hafızayı ve kuşaklar arası aktarımı canlı tutar.",
            hint: "Hatırlamak neyi korur?",
          },
        ],
        write: {
          title: "Kısa yazma: denizden gelen güç",
          instruction:
            "Osmanlı’nın denizlerde güçlenmesinin iki sonucunu yaz; bu sonuçlardan birinin günümüz Türkiye’sine uzanan izini açıkla.",
          criteria: [
            "İki sonucu ayrı yaz.",
            "Birini ekonomik, birini siyasi açıdan kur.",
            "Günümüzle bağ kur.",
          ],
          guide: "Gelişme → sonuç → günümüz bağlantısı sırasını izle.",
          starter: "Osmanlı’nın denizlerde güçlenmesi … sonucunu doğurdu.",
          minChars: 160,
        },
      },
      {
        id: "qr-etkilesimli-harita",
        weekIds: [12],
        kind: "Etkileşimli harita",
        where: "s. 106 · 3. öğrenme alanı",
        title: "Osmanlı Devleti’nin XVI. yüzyıl haritası",
        sourceUrl: eba("1761fd63303ecc07765ffc8e7d22ac92"),
        sourceLinkLabel: "EBA · Etkileşimli Osmanlı haritası",
        sourceLinkType: "harita",
        minutes: 7,
        focus: "Harita okuma, sınırlar ve ticaret yolları",
        intro:
          "Karekod, Osmanlı Devleti’nin XVI. yüzyıldaki hâkimiyet alanlarını etkileşimli olarak gösteriyor. Haritayı açmadan önce tahminini yaz; açtıktan sonra tahmininle karşılaştır.",
        before: [
          "XVI. yüzyılda Osmanlı Devleti’nin üç kıtada hangi bölgelere ulaştığını tahmin et.",
          "Haritada önce neye bakarsın: sınırlar mı, denizler mi, ticaret yolları mı? Neden?",
        ],
        notes: [
          { id: "n1", label: "Haritada gördüğüm üç bölge", hint: "Bölge ya da deniz adı yaz." },
          { id: "n2", label: "Ticaret yollarının geçtiği iki liman", hint: "Liman kenti adı." },
          { id: "n3", label: "Tahminimle örtüşmeyen nokta", hint: "Beklediğimden farklı olan yer." },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Bir haritayı okurken önce neye bakmak gerekir?",
            options: [
              "Başlığa, lejanta ve ölçeğe",
              "Renklere",
              "Yazı tipine",
              "Sayfanın boyutuna",
            ],
            answer: 0,
            explanation: "Başlık konuyu, lejant işaretlerin anlamını, ölçek mesafeyi verir; okuma bunlarla başlar.",
            hint: "Haritanın “anahtarı” hangisi?",
          },
          {
            id: "q2",
            prompt: "Ticaret yollarının yön değiştirmesi Osmanlı ekonomisini neden etkiler?",
            options: [
              "Yollar yalnızca ulaşımı ilgilendirdiği için",
              "Gelir kaynağı olan güzergâh ve limanların önemini değiştirdiği için",
              "Haritalar yeniden çizildiği için",
              "Nüfus azaldığı için",
            ],
            answer: 1,
            explanation: "Osmanlı gelirinin önemli bir kısmı ticaret yolları ve limanlardan geliyordu; yön değişimi bu geliri etkiler.",
            hint: "Gelir nereden geliyordu?",
          },
        ],
        write: {
          title: "Kısa yazma: haritadan üç çıkarım",
          instruction:
            "Etkileşimli haritayı inceledikten sonra üç çıkarım yaz: bir sınır, bir ekonomi, bir siyaset çıkarımı. Her birine haritadan kanıt ekle.",
          criteria: [
            "Üç çıkarımı ayrı yaz.",
            "Her çıkarıma bir kanıt ekle.",
            "Bir çıkarımı kendi cümlenle değerlendir.",
          ],
          guide: "Gözlem → çıkarım → kanıt sırasını izle.",
          starter: "Haritada … gördüm; bundan … çıkarımını yapıyorum.",
          minChars: 160,
        },
      },
      {
        id: "qr-osmanli-yenilikler",
        weekIds: [14],
        kind: "İzleme",
        where: "s. 130 · 3. öğrenme alanı",
        title: "Osmanlı Devleti’nde sanayileşme çabaları",
        sourceUrl: eba("ea26c7d6df42f305e0ec140ccf58402d"),
        sourceLinkLabel: "EBA · Osmanlı’da sanayileşme",
        sourceLinkType: "video",
        minutes: 6,
        focus: "Sanayi İnkılabı’nın Osmanlı ekonomisine etkisi ve yenilik arayışı",
        intro:
          "Karekod, Osmanlı’nın fabrikalaşma çabalarını ve bu çabaların neden beklenen sonucu vermediğini anlatıyor. İzlerken nedenleri ve sonuçları ayrı ayrı not et.",
        before: [
          "El tezgâhı ile fabrika üretimi arasındaki iki farkı yaz.",
          "Bir ülkenin sanayileşmesini engelleyen üç etken say.",
        ],
        notes: [
          { id: "n1", label: "Osmanlı’nın sanayileşme adımı", hint: "Mektep, fabrika, teşvik…" },
          { id: "n2", label: "Çabaları sınırlayan iki neden", hint: "Sermaye, teknoloji, nitelikli iş gücü, ulaşım." },
          { id: "n3", label: "Bu dönemin günümüze bakan sonucu", hint: "Sanayi mirası ya da eksik kalan alan." },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Sanayi İnkılabı’nın Osmanlı esnafı üzerindeki ilk etkisi ne oldu?",
            options: [
              "Üretim maliyetlerinin düşmesi",
              "Ucuz ithal mallarla rekabet edememek",
              "İhracatın artması",
              "Nüfusun köylere dönmesi",
            ],
            answer: 1,
            explanation: "Seri üretim ucuz mal üretti; el tezgâhı ürünleri rekabette geriledi.",
            hint: "Fiyat farkı kimin aleyhineydi?",
          },
          {
            id: "q2",
            prompt: "Bir yeniliğin başarısını değerlendirmek için hangi üçlü gereklidir?",
            options: [
              "Tarih, yer, kişi",
              "Ad, bütçe, süre",
              "Amaç, uygulama, sonuç",
              "Belge, fotoğraf, harita",
            ],
            answer: 2,
            explanation: "Amaç, uygulama ve sonuç birlikte okunmadan bir yenilik değerlendirilemez.",
            hint: "Neden yapıldı, nasıl yapıldı, ne oldu?",
          },
        ],
        write: {
          title: "Kısa yazma: bir yeniliğin bilançosu",
          instruction:
            "Osmanlı’nın yeniliklerinden birini seç. Amaç, uygulama ve sonucu yaz; sonucun neden beklenenden farklı olduğunu gerekçelendir.",
          criteria: [
            "Üç başlığı ayrı ayrı ele al.",
            "Bir sınırlılık belirt.",
            "Gerekçeni somut bir nedene bağla.",
          ],
          guide: "Amaç → uygulama → sonuç → gerekçe sırasını izle.",
          starter: "Seçtiğim yenilik …; amacı …",
          minChars: 170,
        },
      },
      {
        id: "qr-fetih-marsi",
        weekIds: [15],
        kind: "İzleme",
        where: "s. 146 · 3. öğrenme alanı",
        title: "Fetih Marşı videosu",
        sourceUrl: eba("8bb724f386e46afc6d07b4cf1094ab70"),
        sourceLinkLabel: "EBA · Fetih Marşı",
        sourceLinkType: "video",
        minutes: 4,
        focus: "Edebî metin, ortak hafıza ve kültürel aktarım",
        intro:
          "Karekod, Osmanlı kültür ve medeniyeti bölümünde geçen Fetih Marşı’nı seslendiriyor. Dinlerken metnin hangi duyguyu öne çıkardığını ve hangi tarihî olaya gönderme yaptığını belirle.",
        before: [
          "Bir marşın toplum hayatındaki işlevi ne olabilir? İki madde yaz.",
          "“Fetih” sözcüğü sende hangi çağrışımları uyandırıyor?",
        ],
        notes: [
          { id: "n1", label: "Marşın öne çıkardığı duygu", hint: "Coşku, gurur, kararlılık, umut…" },
          { id: "n2", label: "Gönderme yapılan olay", hint: "Hangi fetih, hangi dönem?" },
          { id: "n3", label: "Metinde tekrar eden söz ya da imge", hint: "Bir dize yeter." },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Tarihî bir olayın marş ya da şiirle aktarılması ne sağlar?",
            options: [
              "Olayın tarihini kesinleştirir",
              "Olayı belgeye dönüştürür",
              "Duyguyu ve ortak hafızayı kuşaklara taşır",
              "Olayın yorumunu tekilleştirir",
            ],
            answer: 2,
            explanation: "Edebî metinler olayı duyguyla birlikte taşır; bu da ortak hafızayı canlı tutar.",
            hint: "Marş mı, belge mi?",
          },
          {
            id: "q2",
            prompt: "Bir edebî metni tarih kaynağı olarak kullanırken neye dikkat etmelisin?",
            options: [
              "Metni olduğu gibi kanıt saymak",
              "Yalnızca kafiye düzenine bakmak",
              "Yazarın yaşını öğrenmek",
              "Metnin duygu ve yorum içerdiğini hesaba katmak",
            ],
            answer: 3,
            explanation: "Edebî metin yorum ve duygu içerir; tarihî kanıtla birlikte değerlendirilmelidir.",
            hint: "Metin neyi doğrudan kanıtlar?",
          },
        ],
        write: {
          title: "Kısa yazma: bir dizeyi yorumla",
          instruction:
            "Dinlediğin marştan bir dize seç. Bu dizenin hangi tarihî olaya, hangi duyguya ve hangi değere bağlandığını yaz.",
          criteria: [
            "Dizeyi alıntıla.",
            "Olay ve duyguyu ayrı ayrı belirt.",
            "Değerle bağlantısını kur.",
          ],
          guide: "Dize → olay → duygu → değer sırasını izle.",
          starter: "Seçtiğim dize …; bu dize … olayını hatırlatıyor.",
          minChars: 150,
        },
      },
      {
        id: "qr-3d-gunluk-yasam",
        weekIds: [15],
        kind: "Artırılmış gerçeklik",
        where: "s. 147 · 3. öğrenme alanı",
        title: "3D: günlük yaşam ve toplum hayatı",
        sourceUrl: eba("a1ed545e12246ab79b8cf219aeb4b619"),
        sourceLinkLabel: "EBA · 3D günlük yaşam içeriği",
        sourceLinkType: "video",
        minutes: 6,
        focus: "Gündelik yaşam, toplumsal roller ve mekân",
        intro:
          "Karekod, Osmanlı’da günlük yaşamı üç boyutlu olarak gösteriyor. İzlerken bir günün hangi mekânlarda geçtiğini ve kimlerin hangi rolleri üstlendiğini not et.",
        before: [
          "Bir gününü hangi mekânlarda geçiriyorsun? Üçünü yaz.",
          "Gündelik yaşamı en çok ne belirler: inanç, ekonomi, gelenek, teknoloji?",
        ],
        notes: [
          { id: "n1", label: "İçerikte görülen iki mekân", hint: "Ev, cami, çarşı, medrese, hamam…" },
          { id: "n2", label: "İki toplumsal rol", hint: "Esnaf, öğrenci, vakıf görevlisi…" },
          { id: "n3", label: "Bugünle benzerlik ve fark", hint: "Bir benzerlik, bir fark yeter." },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Gündelik yaşam tarihini incelemek ne kazandırır?",
            options: [
              "Yalnızca saray hayatını öğretir",
              "Savaşları tarihlendirir",
              "Ekonomiyi ölçer",
              "Sıradan insanın yaşamını ve toplumsal rolleri görünür kılar",
            ],
            answer: 3,
            explanation: "Gündelik yaşam, sıradan insanı ve toplumsal rolleri görünür kılar; tarih yalnızca yönetenlerden ibaret değildir.",
            hint: "Kimin hayatı görünür oluyor?",
          },
          {
            id: "q2",
            prompt: "Üç boyutlu bir içeriği incelerken hangi yaklaşım daha verimlidir?",
            options: [
              "Mekânı, kişileri ve eylemleri ayrı ayrı gözlemlemek",
              "Yalnızca görüntüyü beğenmek",
              "İçeriği hızlıca kapatmak",
              "Yalnızca sesi dinlemek",
            ],
            answer: 0,
            explanation: "Mekân, kişi ve eylem ayrımı gözlemi düzenler; not almayı ve çıkarım yapmayı kolaylaştırır.",
            hint: "Neyi, kimle, ne yaparken?",
          },
        ],
        write: {
          title: "Kısa yazma: bir günün öyküsü",
          instruction:
            "Osmanlı’da yaşayan bir kişinin bir gününü kendi cümlelerinle yaz. Üç mekân, iki rol ve bir gelenek yer alsın.",
          criteria: [
            "Üç mekânı adlandır.",
            "İki toplumsal rolü göster.",
            "Bir geleneği somut bir davranışla anlat.",
          ],
          guide: "Sabah → iş → toplumsal yaşam → akşam sırasını izle.",
          starter: "Sabah … mektebine giden …",
          minChars: 180,
        },
      },
      {
        id: "qr-ahi-teskilati",
        weekIds: [15],
        kind: "İzleme",
        where: "s. 150 · 3. öğrenme alanı",
        title: "Ahi teşkilatı",
        sourceUrl: eba("218994cef89cb74b5ae00d91da2c821d"),
        sourceLinkLabel: "EBA · Ahi teşkilatı",
        sourceLinkType: "video",
        minutes: 5,
        focus: "Esnaf örgütlenmesi, meslek ahlakı ve dayanışma",
        intro:
          "Karekod, ahilik kültürünü ve lonca teşkilatını anlatıyor. İzlerken bir esnafın uyması gereken ilkeleri ve bu ilkelerin günümüzdeki karşılığını not et.",
        before: [
          "Bir esnafın güven kazanması için ne yapması gerekir? Üç madde yaz.",
          "“Meslek ahlakı” ifadesi sana ne anlatıyor?",
        ],
        notes: [
          { id: "n1", label: "Ahiliğin iki temel ilkesi", hint: "Dürüstlük, cömertlik, kalite, dayanışma…" },
          { id: "n2", label: "Teşkilatın üstlendiği toplumsal işlev", hint: "Eğitim, denetim, yardımlaşma." },
          { id: "n3", label: "Bugünkü karşılığı", hint: "Esnaf odası, meslek lisansı, tüketici hakları…" },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Ahilikte üreticiyi denetleyen temel ölçüt neydi?",
            options: [
              "Kalite ve dürüstlük ilkelerine uygunluk",
              "Ürünün fiyatının en düşük olması",
              "Satış sayısının yüksekliği",
              "Dükkânın büyüklüğü",
            ],
            answer: 0,
            explanation: "Ahilikte kalite ve dürüstlük esastı; denetim bunlar üzerinden yapılırdı.",
            hint: "Fiyat mı, ilke mi?",
          },
          {
            id: "q2",
            prompt: "Meslek örgütlerinin günümüzdeki işlevi hangisiyle örtüşür?",
            options: [
              "Rekabeti tamamen kaldırmak",
              "Standart belirlemek ve meslek etiğini gözetmek",
              "Fiyatları tek elden saptamak",
              "Üyelerin işini devralmak",
            ],
            answer: 1,
            explanation: "Meslek örgütleri standart ve etik gözetir; rekabeti kaldırmaz.",
            hint: "Standart ve etik kelimelerine bak.",
          },
        ],
        write: {
          title: "Kısa yazma: günümüz esnafı için üç ilke",
          instruction:
            "Ahiliğin ilkelerinden yararlanarak günümüz esnafı için üç ilke yaz; her ilkeyi somut bir davranışla örneklendir.",
          criteria: [
            "Üç ilkeyi ayrı yaz.",
            "Her ilkeye bir davranış örneği ekle.",
            "Bir ilkenin neden önemli olduğunu açıkla.",
          ],
          guide: "İlke → davranış → gerekçe sırasını izle.",
          starter: "İlk ilke …; bu ilke … demektir.",
          minChars: 160,
        },
      },
      {
        id: "qr-etkilesimli-kultur-video",
        weekIds: [15],
        kind: "Etkileşimli video",
        where: "s. 151 · 3. öğrenme alanı",
        title: "Osmanlı kültür ve medeniyeti etkileşimli videosu",
        sourceUrl: eba("c2768a5382050f9c7ec0b81934dcd743"),
        sourceLinkLabel: "EBA · Kültür ve medeniyet etkileşimli video",
        sourceLinkType: "video",
        minutes: 8,
        focus: "Yönetim, eğitim, hukuk, sanat ve gündelik yaşamın birlikte okunması",
        intro:
          "Karekod, Osmanlı kültür ve medeniyetini yönetim, eğitim, hukuk, sanat ve gündelik yaşam başlıklarıyla ilişkilendiriyor. İzlerken her başlık için bir örnek not et.",
        before: [
          "“Kültür” ve “medeniyet” kavramlarını birer örnekle ayırt et.",
          "Bir toplumun gündelik yaşamından hangi bilgiler tarihe kaynaklık eder?",
        ],
        notes: [
          { id: "n1", label: "Yönetim ve hukukla ilgili bir örnek", hint: "Divan, kadı, kanun…" },
          { id: "n2", label: "Eğitim veya sanatla ilgili bir örnek", hint: "Mektep, medrese, hat, minyatür…" },
          { id: "n3", label: "Gündelik yaşamdan bir ayrıntı", hint: "Ev, mutfak, giyim, eğlence…" },
        ],
        questions: [
          {
            id: "q1",
            prompt: "Kültür ile medeniyet arasındaki ilişki hangisiyle açıklanır?",
            options: [
              "Birbirini dışlayan iki alandır.",
              "Kültür bir toplumun yaşayışını, medeniyet ortak kurum ve birikimi anlatır.",
              "İkisi de yalnızca sanatla ilgilidir.",
              "Medeniyet yalnızca yönetim biçimidir.",
            ],
            answer: 1,
            explanation: "Kültür toplumun yaşayışını, medeniyet ise kurumlar ve ortak birikimi kapsar; biri diğerini dışlamaz.",
            hint: "Yaşayış mı, kurumlar mı?",
          },
          {
            id: "q2",
            prompt: "Etkileşimli bir içerikten en iyi yararlanma yolu hangisidir?",
            options: [
              "Yalnızca başlıkları okumak",
              "İçeriği sonuna kadar hızlı geçmek",
              "Duraklatıp not almak ve soruları içerikle yanıtlamak",
              "Yalnızca görselleri izlemek",
            ],
            answer: 2,
            explanation: "Duraklayıp not almak ve yanıtları içerikte aramak kalıcı öğrenmeyi sağlar.",
            hint: "Not al ve doğrula.",
          },
        ],
        write: {
          title: "Kısa yazma: beş başlıkta Osmanlı kültürü",
          instruction:
            "Yönetim, eğitim, hukuk, sanat ve gündelik yaşam başlıklarından üçünü seç. Her biri için bir örnek ve bu örneğin bugüne kalan izini yaz.",
          criteria: [
            "Üç başlığı ayrı paragrafta ele al.",
            "Her başlıkta somut bir örnek ver.",
            "En az bir örnek için bugüne kalan izi açıkla.",
          ],
          guide: "Başlık → örnek → işlev → bugüne kalan iz sırasını izle.",
          starter: "Yönetim alanında …; bu uygulama … işlevini görüyordu.",
          minChars: 190,
        },
      },
    ],
  };
})();
