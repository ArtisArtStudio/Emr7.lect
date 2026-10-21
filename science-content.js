/*
 * 7. sınıf Fen Bilimleri için özgün, ders kitabı temelli haftalık konu akışı.
 * Başlıklar ve sayfa aralıkları MEB Fen Bilimleri 7. Sınıf Ders Kitabı, 1. Kitap'tan
 * (2026) alınan içerik haritasına dayanır; anlatım, sorular ve çizimler bu uygulama için özgün hazırlanmıştır.
 *
 * Çalışma takvimi: 2026–2027 döneminde Fen Bilimleri haftada 4 ders saati görülür.
 * Ders 14–18 Eylül'de başlar, 28–31 Aralık haftasında sona erer (15 ders haftası).
 * Bir önceki 37 konuluk akış, bu 15 haftaya anlamlı biçimde birleştirilmiştir; her haftanın
 * konu başlıkları, anlatım blokları, kavramları ve araştırma sonuçları korunur.
 */
(() => {
  'use strict';

  const units = [
    {
      "id": "space",
      "number": 1,
      "title": "Uzay Çağı",
      "pages": "14–52"
    },
    {
      "id": "energy",
      "number": 2,
      "title": "Kuvvet ve Enerjiyi Keşfedelim",
      "pages": "58–81"
    },
    {
      "id": "systems",
      "number": 3,
      "title": "Vücudumuzdaki Sistemler",
      "pages": "88–148"
    }
  ];

  const weeks = [
    {
      "id": 1,
      "date": "14–18 Eyl",
      "unitId": "space",
      "topic": "Uzay araştırmalarına giriş ve gözlem soruları · Türkiye’nin uzay çalışmaları ve uydular",
      "pages": "14–23",
      "visual": "space",
      "visualNote": "Uydu, yeryüzünden veri toplayan veya veri ileten bir araçtır. Görselde görülen özellik ile o özelliğe ilişkin yorumunu ayrı tut. Uydu görüntüsü veya sinyali yeryüzündeki çalışmalara veri sağlayabilir; görev türünü taşıdığı araçlar belirler.",
      "focus": "Bir uzay araştırmasının merak sorusundan gözleme, ölçüme ve kanıta nasıl ilerlediğini açıkla. Türkiye’nin uzay çalışmalarını uydu görevleri ve günlük yaşamda kullanılan verilerle ilişkilendir.",
      "summary": [
        "Uzay nedir? Ders kitabı uzayı, Dünya dışında kalan gök cisimlerinin bulunduğu büyük boşluk olarak tanımlar. Yıldızlar, gezegenler, uydular ve aralarındaki uzaklıklar bu ortamın parçalarıdır. Evren daha kapsayıcı kavramdır: uzayı ve içindeki tüm gök cisimlerini, galaksileri ve yapıları birlikte düşünür. Uzay araştırması, bu yapı ve olaylar hakkında gözlem ve ölçümle bilgi aramaktır. Yapay uydu, Dünya’nın ya da başka bir gök cisminin çevresinde belirli bir yörüngede görev yapmak üzere insan eliyle üretilip gönderilen araçtır. Bütün uydular aynı işi yapmaz: haberleşme uyduları sinyalleri iletir, Dünya gözlem uyduları görüntü ve ölçüm toplar; bazı uydular bilimsel gözlem veya konum belirleme sistemlerinde kullanılır.",
        "Araştırma bir merak sorusuyla başlar. Örneğin “Bulutlar hangi yönde ilerliyor?” sorusu, görüntü veya ölçüm verisinin ne zaman ve nerede toplanacağını belirlemeye yardım eder. Araştırmacı uygun araçla veri toplar, gözlemleri kaydeder, benzer verileri karşılaştırır ve açıklamasını kanıtla sınar; yeni kanıt önceki fikri değiştirebilir. Bir gözlem uydusu Dünya yüzeyinden belirli türde veri toplar ve bu veriyi yer istasyonlarına gönderir. Uzmanlar farklı tarihlerde alınan görüntüleri karşılaştırarak arazi, bulut, tarım alanı ya da afet bölgesindeki değişimleri inceleyebilir. Görüntünün çözünürlüğü, zamanı ve ölçtüğü özellik, hangi soruya yanıt verebileceğini sınırlar.",
        "Kitabın ilk sayfaları daha önce öğrenilen yansıma bilgisini hatırlatır; ardından Türksat 6A haberiyle uzay çalışmalarının haberleşme, hava gözlemi ve konum bulma gibi alanlardaki yerini sorar. Uzay teknolojilerine geçmeden önce “bu araştırma hangi soruya yanıt arıyor?” diye düşünmek, araç seçimini anlamlı kılar. Kitap Türksat uydularını haberleşme; Göktürk ve İMECE örneklerini yüksek çözünürlüklü Dünya gözlemiyle ilişkilendirir. İMECE görüntüleri doğal afet, tarım ve hedef belirleme gibi uygulamalara katkı sağlayabilir; Türksat 6A ise yerli ve millî haberleşme uydusu olarak tanıtılır. Bunlar görev türlerinin farklı olduğuna örnektir.",
        "Bir görüntüde doğrudan seçilebilen özelliği gözlem, o özelliğin nedenine ilişkin açıklamayı çıkarım olarak yaz. Uydu görüntüsü yeryüzünün belirli bir andaki görünüşüne kanıt sağlar; tek başına bütün nedenleri açıklamaz. Görselin tarihi, kaynağı ve ölçüm türü de yorumun parçasıdır. Bir uyduyu anlatırken yalnızca adını değil; hangi yörüngede çalıştığını, hangi veriyi topladığını veya ilettiğini ve bu verinin kimlerce nasıl kullanıldığını da belirt. Kitaptaki uydu çizimleri görevleri açıklayan temsili görsellerdir; ekranda görülen uydu fotoğrafı, uydunun topladığı verinin kendisi değildir."
      ],
      "points": [
        "Araştırma sorusu gözlenebilir bir özelliğe odaklanır.",
        "Gözlem ile gözleme dayalı çıkarım farklıdır.",
        "Verinin kaynağını belirtmek açıklamayı güçlendirir.",
        "Haberleşme ve gözlem uydularının amaçları farklıdır.",
        "Yörünge ve araç donanımı görevi etkiler.",
        "Uydu verisi değerlendirilir; tek başına açıklama değildir."
      ],
      "terms": [
        "uzay araştırması",
        "gözlem",
        "veri",
        "kanıt",
        "yapay uydu",
        "haberleşme",
        "gözlem uydusu"
      ],
      "tasks": [
        "Üniteye giriş bölümünü incele; bildiğin ve merak ettiğin uzay konularını ayır.",
        "Bir uydu veya teleskop görüntüsünde gözlemleyebileceğin iki özelliği yaz.",
        "Bir gözlem cümlesi ile ona ait olası bir çıkarımı ayrı ayrı kur.",
        "Kitaptaki Türkiye uzay çalışmaları başlığını oku ve görev türlerini not et.",
        "Haberleşme ile gözlem amaçlı bir uyduyu kullanım amacı bakımından karşılaştır."
      ],
      "quiz": {
        "prompt": "Bir bilimsel gözlemle ilgili en uygun ifade hangisidir?",
        "options": [
          "Görüntüde doğrudan fark edilen özellik kaydedilir.",
          "Kanıt toplamadan ilk tahmin kesin sonuç sayılır.",
          "Her gözlem aynı anda bir açıklamayı kanıtlar.",
          "Araştırma sorusu yalnızca kişisel görüşten oluşur."
        ],
        "answer": 0,
        "explanation": "Gözlem, veriye dayalı olarak fark edilen özelliği kaydetmektir.",
        "hint": "Bir iddiayı doğrulamadan önce hangi özelliğin doğrudan görülebildiğini düşün."
      },
      "activity": {
        "title": "Bir uzay gözlemi planla",
        "format": "Araştırma sorusu ve gözlem çizelgesi",
        "prompt": "Bir uydu görüntüsünün kıyı çizgisindeki değişimi izlemek için kullanıldığını düşün. Araştırılabilecek bir soru yaz; kaydedilecek iki gözlem verisini ve bu verilerin nasıl karşılaştırılacağını belirt.",
        "placeholder": "Araştırma sorum… Kaydedeceğim veriler… Karşılaştırmam…",
        "minChars": 25,
        "criteria": [
          "Sınanabilir bir soru kur.",
          "En az iki gözlenebilir veri belirt.",
          "Verilerin nasıl karşılaştırılacağını açıkla."
        ],
        "hint": "Konu özetindeki gözlem–çıkarım ayrımını kullan; ölçülebilir bir özellik seç."
      },
      "sourceWeeks": [
        1,
        2
      ]
    },
    {
      "id": 2,
      "date": "21–25 Eyl",
      "unitId": "space",
      "topic": "Uzay araçları ve gözlem teknolojileri · Teleskoplar, gözlem yerleri ve gökyüzü gözlemi",
      "pages": "16–25",
      "visual": "spaceVehicles",
      "visualNote": "Görseldeki uyduyu araştırma araçlarından biri olarak düşün; roket, sonda ve teleskopun görevleri bundan farklıdır. Kitaptaki TUG ve DAG örneklerinde olduğu gibi yüksek, kuru ve kent ışıklarından uzak gözlem yerleri daha net gökyüzü görüntülerine katkı sağlar.",
      "focus": "Roket, uydu, uzay sondası, uzay istasyonu ve teleskopu kullanım amaçlarına göre ayırt et. Teleskop türü, atmosfer ve çevredeki yapay ışığın gökyüzü gözlemini nasıl etkilediğini açıkla.",
      "summary": [
        "Uzay araştırmalarında kullanılan araçlar görevlerine göre ayrılır. Roket bir taşıma sistemidir; uzay aracı ve yükü yeryüzünden yörüngeye veya daha uzağa götürür. Yapay uydu yörüngede çalışır, uzay sondası robotik ölçüm yapar, teleskop gök cisimlerinden gelen ışığı toplar; uzay istasyonu ise astronotların araştırma yaptığı yörünge laboratuvarıdır. Teleskop, gök cisimlerinden gelen ışığı veya başka elektromanyetik dalgaları toplayıp incelenebilir hâle getirir. Yer tabanlı teleskoplar yeryüzündeki gözlemevlerinde, uzay teleskopları atmosferin üzerinde çalışır. Araç türü araştırma sorusuna göre seçilir; her teleskop her dalga boyunu ölçmez.",
        "Araştırma sorusu önce belirlenir; ardından gerekli veri seçilir. Yakın bir gök cisminin yüzeyini incelemek için sonda, iletişim kurmak için haberleşme uydusu, gökyüzü ışığını toplamak için teleskop gerekir. Roket bu araçları hedeflerine taşır. İnsanlı görevde mekik veya istasyon, astronot ve malzemenin güvenli taşınması/çalışması için kullanılır. Atmosfer bazı ışınları soğurur veya dağıtır; bulut, su buharı ve hava koşulları da gözlemi etkiler. Kent aydınlatmasının gökyüzüne saçılması sönük yıldızları seçmeyi zorlaştırır. Bu nedenle yer gözlemevleri için yüksek, kuru, açık ve yapay ışıklardan uzak bölgeler tercih edilebilir.",
        "Kitapta sondanın Dünya’dan uzaktan kontrol edilebildiği ve çoğunlukla güneş panelleriyle elektrik aldığı; roketin yakıt ve motorla çalıştığı; bazı yeni roketlerin yeniden kullanılabildiği belirtilir. Uzay mekiği insan ve ekipman taşıyabilir; istasyon düşük yer çekimli ortamda deney yapılmasını sağlar. Bu tanımlar, araçları işlevleriyle karşılaştırmanın sonucudur. Kitap Hubble ve James Webb’i uzay teleskoplarına; TUG ve Doğu Anadolu Gözlemevi’ni (DAG) yer tabanlı gözlem örneklerine verir. Uzay teleskobu atmosfer etkisini azaltır, yer teleskobu ise bakım ve yenileme kolaylığı gibi avantajlar taşıyabilir. Gözlemevlerinin yeri, teleskopun topladığı sinyal kadar önemlidir.",
        "Araçların şekillerini değil, yaptıkları işi eşleştir. Roket bir teleskop değildir; teleskop gözlem için ışık toplar. Sonda uzaktaki cisme veri toplamak üzere gider, uydu yörüngede kalır. Kitabın TÜRKSAT, Göktürk ve İMECE örneklerini de bu görev ayrımıyla oku; bir görev birden fazla araç ve yer istasyonu gerektirebilir. Teleskopla Güneş’e doğrudan, filtresiz bakılmaz; bu gözlere kalıcı zarar verebilir. Bir gözlem yeri seçerken karanlık gökyüzü kadar hava, güvenli erişim ve ölçüm amacını da değerlendir. Kent ışığının fotoğrafta oluşturduğu parlaklık gerçek gök cisimlerinin sayısını artırmaz; yalnızca görünürlüğü değiştirir."
      ],
      "points": [
        "Roket taşıma, sonda uzaktaki cisimleri inceleme amacı taşır.",
        "Uydu yörüngede görev yapar; istasyon araştırma ortamı sağlar.",
        "Teleskop gözlem için ışık toplar.",
        "Teleskop gök cisimlerinden gelen ışığı toplar.",
        "Atmosfer, hava koşulları ve yapay ışık gözlemi etkileyebilir.",
        "Gözlem aracını araştırma sorusuna göre seç; Güneş’e doğrudan bakma."
      ],
      "terms": [
        "uzay sondası",
        "uzay istasyonu",
        "roket",
        "teleskop",
        "gözlemevi",
        "atmosfer",
        "ışık kirliliği"
      ],
      "tasks": [
        "Araç adlarını görevleriyle eşleştiren bir tablo hazırla.",
        "Bir uzay görevi için hangi verinin gerektiğini belirle.",
        "Görev–araç eşleştirmeni bir cümleyle gerekçelendir.",
        "Yer ve uzay teleskoplarının bulunduğu ortamları karşılaştır.",
        "Bir gözlemevi yeri seçerken değerlendireceğin üç özelliği yaz."
      ],
      "quiz": {
        "prompt": "Dünya’dan uzaktaki bir gök cismini yakından incelemek üzere veri toplayan robotik araca ne denir?",
        "options": [
          "Uzay sondası",
          "Haberleşme uydusu",
          "Yer gözlemevi",
          "Uzay giysisi"
        ],
        "answer": 0,
        "explanation": "Uzay sondaları gök cisimlerini veya uzay olaylarını incelemek üzere gönderilen robotik araçlardır.",
        "hint": "İnceleme yapmak için Dünya’dan gönderilen ve veri toplayan aracı düşün."
      },
      "activity": {
        "title": "Görev için doğru aracı seç",
        "format": "Tasarım kararı ve gerekçe",
        "prompt": "Bir araştırma ekibi, başka bir gezegenin yüzeyindeki sıcaklığı uzaktan ölçmek istiyor. Gereken aracı veya araçları seç; ölçümün nasıl yapılacağını ve hangi verinin Dünya’ya gönderileceğini açıkla.",
        "placeholder": "Seçeceğim araç… Ölçüm… Gönderilecek veri…",
        "minChars": 25,
        "criteria": [
          "Göreve uygun araç türünü seç.",
          "Aracın nasıl veri toplayacağını belirt.",
          "Verinin araştırma sorusuna nasıl yanıt vereceğini açıkla."
        ],
        "hint": "Taşıma, uzaktan inceleme ve Dünya’ya veri iletme görevlerini birbirinden ayır."
      },
      "sourceWeeks": [
        3,
        4
      ]
    },
    {
      "id": 3,
      "date": "28 Eyl–2 Eki",
      "unitId": "space",
      "topic": "Uzay teknolojilerinin günlük yaşama katkıları · Uzay kirliliği ve sorumlu uzay çalışmaları",
      "pages": "24–33",
      "visual": "debris",
      "visualNote": "Uydu görüntüsünün yeryüzüne ilişkin hangi veriyi sağlayabileceğini düşün; görüntüden çıkarılan yorumun ayrıca kanıtla desteklenmesi gerekir. Çalışan uydu ile işlevini yitirmiş parça farklıdır; yörüngedeki parçalar yüksek hız nedeniyle çarpışma riski yaratabilir.",
      "focus": "Uzay araştırmalarında geliştirilen ölçüm ve iletişim teknolojilerinin yeryüzündeki kullanım alanlarını örnekle. İşlevini yitirmiş uydu ve araç parçalarının yörüngede oluşturabileceği çarpışma riskini ve önleme yollarını açıkla.",
      "summary": [
        "Uzay çalışmaları için geliştirilen algılayıcılar, görüntüleme ve iletişim yöntemleri yeryüzündeki farklı ihtiyaçlarda da kullanılabilir. Bir teknolojinin yararı, hangi sorunu çözdüğüne ve hangi ölçümü yaptığına bağlıdır. Uzaydan Dünya’yı izlemek; hava, arazi, afet ve tarım çalışmaları için düzenli veri sağlayabilir. Uzay kirliliği, görevini tamamlamış veya işlevini yitirmiş yapay uyduların, roket aşamalarının ve yörüngede kalan parçaların oluşturduğu insan kaynaklı atık sorunudur. Bu nesneler doğal gök cisimleri değil, insanın uzay faaliyetleri sonucunda yörüngede bulunan parçalardır.",
        "Uydu görüntüsü belli bir zaman, konum ve çözünürlüğe ait kayıttır. Aynı bölgenin farklı tarihlerdeki görüntüleri karşılaştırıldığında değişim görülebilir; ancak görüntü tek başına nedenini açıklamaz. Uzmanlar görüntüyü saha bilgisi, ölçüm ve başka kaynaklarla birlikte yorumlar. Yörüngedeki parçalar yüksek hızla hareket edebilir. Küçük bir parça bile çalışan uyduya veya uzay aracına çarparsa donanıma zarar verebilir; çarpışma yeni parçalar oluşturup izleme ve görev planlamasını zorlaştırabilir. Bu nedenle yörüngedeki nesneleri izlemek ve görevleri çarpışma riskini gözeterek planlamak gerekir.",
        "Ders kitabının s. 25’teki araştırma örnekleri sağlıkta MR/tomografi/ultrason, dijital termometre ve dayanıklı malzemeleri; enerjide güneş panellerini; ulaşımda GPS’i; iletişimde veri aktarımını; gıdada saklama ve su filtrelerini sayar. Bunlar kitapta uzay çalışmalarından günlük yaşama aktarılan uygulama örnekleridir. Kitap, uzay enkazını izleme ağlarından söz eder; çözüm olarak görev sonu planlaması, parçaları izleme/yakalama veya güvenli biçimde yörüngeden çıkarma gibi fikirlerin araştırılmasını ister. Önerilerin uygulanabilirliği, güvenlik, maliyet ve uzun vadeli etkilerle birlikte değerlendirilmelidir.",
        "Bu örnekleri “uzay araştırması → geliştirilen ölçüm/malzeme/yazılım → günlük gereksinim” zinciriyle açıkla. Ürünün tam olarak nerede ve hangi amaçla icat edildiği ayrı bir tarihsel sorudur; kitabın örneğini, tek bir icat öyküsü gibi genelleme. Görselde görülen veri ile o veriden çıkarılan kararı da birbirinden ayır. Dünya görselinde her küçük nokta gerçek ölçekteki boyutu göstermez; çizim temsilîdir. Çalışan uyduyla işlevsiz parçayı ayır, bir önerinin hangi riski azalttığını belirt ve sonucunu ölçülebilir bir ölçütle açıkla. Uzay kirliliği şu an doğrudan yerdeki çöpler gibi görünmese de haberleşme, gözlem ve gelecekteki araştırmaları etkileyebilir."
      ],
      "points": [
        "Uydu verileri yeryüzünü gözlemlemeye yardımcı olabilir.",
        "Görüntü doğru tarih ve bağlamla birlikte yorumlanır.",
        "Teknoloji, belirli bir ihtiyaca göre seçilir.",
        "Uzay kirliliği insan yapımı atıklarla ilişkilidir.",
        "Yüksek hızlı parçalar etkin araçlar için risk oluşturabilir.",
        "Görev öncesi planlama, izleme ve görev sonu yönetimi birlikte düşünülür."
      ],
      "terms": [
        "uydu verisi",
        "görüntüleme",
        "iletişim",
        "teknoloji aktarımı",
        "uzay kirliliği",
        "yörünge",
        "çarpışma riski",
        "görev sonu planı"
      ],
      "tasks": [
        "Bir uydu verisinin yararlı olabileceği günlük yaşam alanı seç.",
        "Bu alanda hangi veriye ihtiyaç duyulacağını açıkla.",
        "Teknolojinin tek başına çözemeyeceği bir sınırlılığı belirt.",
        "Uzay kirliliğinin nasıl oluşabileceğini bir neden–sonuç zinciriyle yaz.",
        "İki çözüm önerisini güvenlik ve uygulanabilirlik açısından karşılaştır."
      ],
      "quiz": {
        "prompt": "Afet sonrası bir bölgedeki değişimi uzaktan karşılaştırmak için hangi veri türü yararlı olabilir?",
        "options": [
          "Uydu görüntülerinin farklı tarihlerde karşılaştırılması",
          "Yalnızca bir kişinin tahmini",
          "Uzay aracının renk tasarımı",
          "Bir teleskopun büyütme düğmesinin şekli"
        ],
        "answer": 0,
        "explanation": "Farklı zamanlarda alınan uydu görüntüleri yeryüzündeki değişimi incelemeye yardımcı olabilir.",
        "hint": "Yeryüzünün aynı bölgesini zaman içinde karşılaştırabilecek veriyi düşün."
      },
      "activity": {
        "title": "Teknoloji aktarım zinciri",
        "format": "Neden–sonuç şeması",
        "prompt": "Uydu görüntülerinin bir tarım alanını izlemek için kullanılmasını seç. “Araç → toplanan veri → yorum → olası karar” zincirini kendi örneğinle açıkla; verinin hangi konuda kesin hüküm vermeye yetmeyeceğini de ekle.",
        "placeholder": "Araç… Veri… Yorum… Olası karar… Sınırlılık…",
        "minChars": 30,
        "criteria": [
          "Dört basamağı sırayla bağla.",
          "Yorum ile veriyi ayır.",
          "Bir sınırlılık belirt."
        ],
        "hint": "Uydu verisini uzmanların değerlendirmesi gerektiğini unutma."
      },
      "researchBrief": {
        "label": "PERFORMANS GÖREVİ · ARAŞTIRMA SONUCU",
        "title": "Uzay araştırmalarının yol açabileceği sorunlar: uzay enkazı",
        "intro": "Kitabın s. 31’deki performans görevi, uzay çalışmalarının doğurabileceği sorunları belirleyip birine çözüm önermeyi ister. Bu araştırma sonucu, ders kitabında açıklanan uzay enkazı sorununa odaklanır.",
        "items": [
          {
            "name": "Sorun nedir?",
            "role": "Görevini tamamlamış ya da işlevini yitirmiş uydular, roket aşamaları ve çarpışmalarda kopan parçalar yörüngede kalabilir. Bu insan yapımı parçaların oluşturduğu atık uzay kirliliğidir."
          },
          {
            "name": "Neden önemlidir?",
            "role": "Yüksek hızla hareket eden küçük bir parça bile çalışan uyduya veya uzay aracına zarar verebilir. Çarpışmalar yeni parçalar oluşturup sonraki görevlerin riskini artırabilir; haberleşme ve gözlem gibi hizmetler aksayabilir."
          },
          {
            "name": "Çözüm yolları",
            "role": "Yörüngedeki cisimleri izlemek, yeni enkaz oluşumunu azaltacak görev-sonu planları yapmak ve güvenli yakalama ya da yörüngeden çıkarma yöntemleri geliştirmek başlıca yaklaşımlardır. Her öneri güvenlik, uygulanabilirlik ve maliyet açısından değerlendirilmelidir."
          },
          {
            "name": "Araştırma sonucu",
            "role": "En etkili yaklaşım iki işi birlikte yürütür: var olan parçaları takip edip çarpışmaları önlemeye çalışmak ve yeni araçların görev bittikten sonra enkaz bırakmasını önceden planlamak."
          }
        ],
        "takeaway": "Ders kitabının örneklerinden çıkan sonuç, uzay araştırmalarını durdurmak değil; yörüngedeki atıkları azaltan, görevleri izleyen ve uzun vadeli güvenliği gözeten teknolojiler geliştirmektir.",
        "source": "Kaynak özeti: ders kitabı s. 30–33; “Uzayda Neler Oluyor?” performans görevi ve uzay kirliliği çözüm örnekleri."
      },
      "sourceWeeks": [
        5,
        6
      ]
    },
    {
      "id": 4,
      "date": "5–9 Eki",
      "unitId": "space",
      "topic": "Işık kirliliği ve gökyüzünü koruma · Yıldızların oluşumu: bulutsu ve önyıldız · Yıldızların yaşam döngüsü ve kütleye bağlı sonlar",
      "pages": "24–43",
      "visual": "stars",
      "visualNote": "Kent ışığının gökyüzüne saçılması yıldızların görünürlüğünü azaltabilir; aşağı yöneltilmiş ışık bu saçılmayı sınırlar. Görselin solundaki bulutsu ve yoğunlaşmadan yıldız oluşumuna ilerle; alttaki iki yol yıldızın başlangıç kütlesine göre farklılaşır. İki olası yaşam yolunu başlangıç kütlesiyle karşılaştır; tüm yıldızların aynı biçimde sonlanmadığını hatırla.",
      "focus": "Gereksiz veya yanlış yönlendirilmiş yapay ışığın gökyüzü gözlemini ve çevreyi nasıl etkilediğini değerlendir. Bulutsudaki gaz ve tozun kütle çekimiyle yoğunlaşarak önyıldız evresine ilerlemesini açıkla. Yıldızların yaşam yollarının başlangıç kütlesine göre nasıl farklılaşabildiğini karşılaştır.",
      "summary": [
        "Işık kirliliği, yapay aydınlatmanın gereğinden fazla kullanılması, yanlış yöne çevrilmesi veya gereksiz zamanda açık kalmasıyla gece gökyüzünün doğal karanlığının bozulmasıdır. Gökyüzüne saçılan ışık, sönük yıldızların ve bazı gök cisimlerinin görülmesini zorlaştırır. Bulutsu, uzayda gaz ve toz içeren geniş bir yapıdır; yıldızların oluşabildiği bölgelerden bazıları bulutsulardır. Bulutsunun her noktası aynı yoğunlukta değildir. Bazı bölgelerde madde, kütle çekiminin etkisiyle bir araya gelerek yoğun ve sıcak bir yapı oluşturur. Yıldızlar oluşur, uzun süre enerji yayar ve yaşamlarının sonuna doğru değişir. Başlangıç kütlesi, yıldızın ne kadar süre yaşayacağını ve hangi evrelerden geçebileceğini etkiler. Bu nedenle yıldızların hepsini tek bir sonla anlatmak doğru değildir; bilimsel şemada farklı kütleler için dallanan yollar bulunur.",
        "Bir lambanın ışığı yalnızca yeri aydınlatmaz; yukarı ve yana saçılan bölüm atmosferde dağılarak gökyüzünde parlama oluşturabilir. Işığı aşağı yönlendirmek, sadece ihtiyaç duyulan alanı aydınlatmak ve kullanılmayan ışıkları kapatmak saçılmayı azaltır. Güvenli aydınlatma ile gereksiz parlaklık aynı şey değildir. Gaz ve toz yoğunlaşırken merkezde sıcaklık artar; bu erken oluşum aşamasına önyıldız denir. Zamanla merkez koşulları yıldızın enerji üretmesini sağlayan çekirdek tepkimelerinin başlamasına elverişli hâle gelir. Bu uzun süreç, tek bir anda gerçekleşmez; görsel bir model aşamaları kısaltarak gösterir. Kitaptaki modele göre Güneş’in kütlesinin yaklaşık sekiz katından daha az başlangıç kütlesine sahip yıldızlar kırmızı dev evresine ilerleyip gezegenimsi bulutsu oluşturabilir; geride beyaz cüce kalabilir. Daha büyük kütleli yıldızlar kırmızı süperdev ve süpernova evrelerine ulaşabilir; kalan çekirdek nötron yıldızı veya kara delik olabilir.",
        "Kitap, kent merkezindeki gökyüzü gözlemiyle karanlık/yüksek bölgelerdeki gözlemi karşılaştırır. TUG ve DAG gibi gözlemevlerinin konumu, açık hava ve az çevre ışığı gibi koşulların önemini gösterir. Işık kirliliği yalnızca astronomi için değil, doğal gece-gündüz döngüsüne bağlı canlılar için de çevresel bir etkendir. Kitap Atbaşı, Orion ve Tarantula bulutsularını gerçek gözlem örnekleri olarak tanıtır; yıldız oluşumunu araştırma görevi de “bulutsu, önyıldız ve sonraki aşamalar” arasında bağlantı kurmayı ister. Fotoğrafta görülen renkler, teleskopla toplanan ışığın işlenmiş gösterimi olabilir; her bulutsu gözle aynı renkte görünmez. Süpernova, büyük kütleli yıldızların yaşamlarının sonuna doğru gerçekleşebilen çok güçlü bir olaydır; gezegenimsi bulutsu ise küçük kütleli yıldızların dış katmanlarıyla ilişkili başka bir evredir. Beyaz cüce, nötron yıldızı ve kara delik aynı şey değildir; farklı koşullarda kalan yıldız çekirdeğiyle ilişkilidir.",
        "Bir fotoğrafta fazla parlak gökyüzü, yıldızların gerçekten yok olduğunu kanıtlamaz; onların ışığının kent parlamasında seçilemediğini gösterir. Gözlem planında güvenliği korurken ışığı doğru yönde ve gerektiği kadar kullan. Çözüm önerini “hangi ışığı, nerede, ne zaman ve ne kadar süreyle?” sorularıyla somutlaştır. Şemada bulutsu → yoğunlaşma → önyıldız → yıldız sırasını izle ve her oka nedenini ekle. Kütle çekimi maddenin bir araya gelmesini sağlar; ısınma ve merkez koşulları sonraki değişimlere katkı verir. Bir bulutsu fotoğrafı oluşum sürecini tek başına kaydetmez; süreç açıklaması gözlem ve bilimsel modellere dayanır. Yaşam döngüsü diyagramındaki oklar zaman içindeki evreleri gösterir; bir yıldızın gerçek yaşamı milyonlarca veya milyarlarca yıl sürebilir. Kütle bilgisini ve şemanın temsilî olduğunu not et. Evrim şemasında dallanmalar, başlangıç kütlesi farklı olan yıldızların olası sonlarını birbirinden ayırır."
      ],
      "points": [
        "Yapay ışığın yönü, şiddeti ve süresi önemlidir.",
        "Gökyüzü parlaması sönük gök cisimlerinin gözlemini zorlaştırır.",
        "Gereken alanı güvenli ve ölçülü biçimde aydınlat.",
        "Bulutsular gaz ve toz içeren uzay yapılarıdır.",
        "Kütle çekimi maddenin bir araya gelmesine katkı sağlar.",
        "Önyıldız, yıldız oluşum sürecinin erken evresidir.",
        "Yıldızın başlangıç kütlesi yaşam yolunu etkiler.",
        "Daha küçük kütleli yıldızların son yolu büyük kütlelilerden farklıdır."
      ],
      "terms": [
        "ışık kirliliği",
        "yapay ışık",
        "gökyüzü gözlemi",
        "aydınlatma",
        "bulutsu",
        "kütle çekimi",
        "önyıldız",
        "yıldız oluşumu",
        "kırmızı dev",
        "beyaz cüce",
        "süpernova",
        "nötron yıldızı",
        "kara delik"
      ],
      "tasks": [
        "Bir iç veya dış mekândaki gereksiz ışık kullanımına örnek düşün.",
        "Işığın yönü ve süresini iyileştirecek iki değişiklik öner.",
        "Gözlem için güvenli bir ortamın özelliklerini yaz.",
        "Bulutsu ile önyıldızın süreçteki yerini not et.",
        "Aşamaları neden–sonuç oklarıyla sırala."
      ],
      "quiz": {
        "prompt": "Bir okul bahçesinde ışık kirliliğini azaltmaya yönelik hangi düzenleme daha uygundur?",
        "options": [
          "Işığı yalnızca gereken alana yöneltip boş alanlarda kapatmak",
          "Bütün lambaları gökyüzüne doğru çevirmek",
          "Gereksiz ışıkları gece boyunca açık bırakmak",
          "Daha fazla ışık ekleyip hepsini aynı anda yakmak"
        ],
        "answer": 0,
        "explanation": "Gereken alanı doğru yönde ve gerektiği kadar aydınlatmak ışık kirliliğini azaltmaya yardımcı olur.",
        "hint": "Aydınlatmanın yönünü, süresini ve gerçekten gerekli olup olmadığını birlikte düşün."
      },
      "activity": {
        "title": "Karanlık gökyüzü için mini plan",
        "format": "Gözlem ve çözüm önerisi",
        "prompt": "Bir okul bahçesinin güvenliğini korurken gökyüzüne taşan ışığı azaltacak üç maddelik bir plan yaz. Her maddede hem güvenlik hem de gereksiz ışığı önleme düşüncesini gözet.",
        "placeholder": "1. … 2. … 3. …",
        "minChars": 25,
        "criteria": [
          "Üç uygulanabilir öneri yaz.",
          "Güvenlik gereksinimini koru.",
          "Işığın yönü veya süresine değin."
        ],
        "hint": "Amaç ışığı tamamen kaldırmak değil, doğru yerde ve doğru miktarda kullanmaktır."
      },
      "researchBrief": {
        "label": "KEŞİF NOKTASI · ARAŞTIRMA SONUCU",
        "title": "Keşif Noktası: Yıldızlar nasıl oluşur?",
        "intro": "Basılı s. 35’teki Keşif Noktası, yıldızların oluşum basamaklarını kaynaklarla araştırıp ilişkilendirmeyi ister. Araştırmanın sonucu, birbiriyle bağlantılı aşamaları gösterir.",
        "items": [
          {
            "name": "Bulutsu",
            "role": "Yıldız oluşumunun başlayabildiği bölgeler, uzaydaki gaz ve toz bulutlarıdır. Bu bulutsuların her bölgesi aynı yoğunlukta değildir."
          },
          {
            "name": "Yoğunlaşma",
            "role": "Bazı bölgelerde kütle çekimi gaz ve tozu bir araya toplar. Madde sıkıştıkça merkezin yoğunluğu ve sıcaklığı yükselir."
          },
          {
            "name": "Önyıldız",
            "role": "Yoğunlaşan ve ısınan merkezin oluşturduğu erken evreye önyıldız denir. Bu aşama, yıldızın oluşum sürecinde olduğunu gösterir."
          },
          {
            "name": "Yıldızın oluşması",
            "role": "Merkez yeterince sıcak ve yoğun hâle geldiğinde çekirdekte enerji üreten tepkimeler başlayabilir; yıldız enerji yayar. Başlangıç kütlesi sonraki yaşam yolunu etkiler."
          }
        ],
        "takeaway": "Araştırma sonucu: bulutsu → kütle çekimiyle yoğunlaşma ve ısınma → önyıldız → enerji üretmeye başlayan yıldız. Bu süreç çok uzun sürer; şemalar aşamaları anlaşılır kılmak için sadeleştirir.",
        "source": "Kaynak özeti: ders kitabı s. 35–36; Keşif Noktası “Yıldızların Oluşumunu Araştırın”."
      },
      "sourceWeeks": [
        7,
        8,
        9
      ]
    },
    {
      "id": 5,
      "date": "12–16 Eki",
      "unitId": "space",
      "topic": "Yıldızların özellikleri, takımyıldızlar ve uzaklık · Galaksiler, evren ve kavramlar arası ilişki · Uzay Çağı ünitesi: model, rapor ve tekrar",
      "pages": "31–52",
      "visual": "spaceReview",
      "visualNote": "Farklı renklerdeki yıldızları karşılaştır; takımyıldız gökyüzündeki görünür örüntüdür ve yıldızların gerçek uzay uzaklıklarını tek başına göstermez. Sarmal kolları olan galaksiye bakarken Güneş Sistemi’nin Samanyolu içinde, evrenin ise galaksilerden daha büyük ölçekte olduğunu düşün. Galeri araştırma aracı, yörünge güvenliği, yıldız yaşamı ve galaksi ölçeğini yan yana getirir; her görsel farklı bir kavramı temsil eder.",
      "focus": "Yıldız rengi, takımyıldız görünüşü ve ışık yılını gözlem ve uzaklık kavramlarıyla açıkla. Yıldız, galaksi ve evren kavramlarını ölçeklerine göre ilişkilendir; Samanyolu’nun yerini belirt. Uzay araçları, uzay çevresi ve gök cisimleri konularını kanıt ve model sınırlarıyla birleştir.",
      "summary": [
        "Yıldızların rengi yüzey sıcaklığı hakkında ipucu verir: mavi-beyaz görünenler daha sıcak, sarı tonlular orta, turuncu-kırmızı tonlular daha soğuk olabilir. Renk, yıldızın tek özelliği değildir; parlaklık ve uzaklık da gökyüzünde nasıl göründüğünü etkiler. Galaksi (gök ada), çok sayıda yıldız ve yıldız sistemi ile gaz ve toz gibi maddelerin kütle çekimiyle bir arada bulunduğu büyük yapıdır. Galaksiler sarmal, eliptik veya düzensiz gibi farklı görünüşlerde olabilir. Bir galaksi tek bir yıldız veya gezegen değildir; çok daha büyük bir ölçektir. Uzay ünitesinde öğrendiğin başlıklar farklı ölçekleri ve araştırma yollarını bir araya getirir: roketler araç taşır, uydular yörüngede görev yapar, teleskoplar ışık toplar; yıldızlar ve galaksiler ise çok daha büyük uzay yapılarıdır. Her kavramı bir araştırma sorusu ve kanıt türüyle ilişkilendirmek tekrar etmeyi anlamlı kılar.",
        "Takımyıldız, Dünya’dan bakıldığında belirli bir şekil oluşturuyormuş gibi görünen yıldız örüntüsüdür. O örüntüdeki yıldızlar uzayda birbirine yakın veya aynı uzaklıkta olmak zorunda değildir. Kutup Yıldızı’nı bulmaya yardım eden Büyükayı örneği, yön bulma için gökyüzü desenlerinin nasıl kullanıldığını gösterir. Güneş Sistemi, Dünya ve Güneş’le birlikte Samanyolu Galaksisi’nin içindedir; kitap bunu Avcı (Orion) koluyla ilişkilendirir. Andromeda, Samanyolu’na yakın büyük galaksilerden biridir. Ölçek sırası Dünya → Güneş Sistemi → Samanyolu → galaksiler ve evren olarak genişler. Yıldız yaşamı başlangıç kütlesine göre farklı dallara ayrılır; uzay kirliliği ise insanın yörünge kullanımıyla ortaya çıkan ve planlamayla azaltılabilecek bir sorundur. Bilimsel model, gerçek sistemi sadeleştirerek temel ilişkileri gösterir; modelin hangi özellikleri dışarıda bıraktığını da bilmek gerekir.",
        "Işık yılı, ışığın bir yılda aldığı uzaklıktır; zaman değil, mesafe birimidir. Örneğin yakın yıldızlarla aramızdaki uzaklıklar kilometreyle yazıldığında çok büyük sayılara ulaşır; ışık yılı bu uzaklıkları anlatmayı kolaylaştırır. Kitaptaki yıldız büyüklüğü çizimleri de gerçek ölçeğe göre değil, karşılaştırma amacıyla hazırlanmıştır. Kitap yıldız, galaksi ve evren kavramlarını birbirini kapsayan yapılar olarak kavram haritasına taşır. Hubble’ın galaksiler üzerine çalışmaları da tarihsel bağlamda anılır. Gök cisimleri arasındaki gerçek uzaklıklar, ders kitabındaki görseldeki aralıklardan çok daha büyüktür; bu görseller kavram ilişkisini anlatmak için küçültülmüştür. Kitaptaki görevler uzay aracı karşılaştırma, yıldız yaşamı posteri, galaksi kavram haritası ve uzay kirliliğine çözüm raporunu kapsar. Teknoloji araştırmasının sonucu; araç adı, görevi, topladığı veri ve günlük yaşamla ilişkisi birlikte yazıldığında daha açıklayıcı olur. Kaynak ve kanıt belirtilmesi, bilginin yeniden kontrol edilebilmesini sağlar.",
        "Yıldız renklerini sıcaklıkla, takımyıldızı görünür örüntüyle, ışık yılını uzaklıkla eşleştir. Gökyüzünde yan yana görünen iki yıldız için “uzayda komşular” sonucunu hemen çıkarma; gerçek konum bilgisi gerekir. Çizimdeki çizgiler yıldızlar arasında fiziksel bağ bulunduğunu değil, gözlemcinin oluşturduğu deseni gösterir. Kavram haritasında yalnızca isimleri sıralama; “içinde bulunur”, “oluşur” veya “kapsar” gibi ilişki sözcüklerini okların üzerine yaz. Dünya’nın bir şehirde/ülkede bulunduğu konumla Güneş Sistemi’nin galaksideki konumu arasında ölçek benzetmesi kurulabilir, ancak benzetmenin gerçek büyüklükleri bire bir göstermediğini belirt. Bir tekrar görselini incelerken her panelin hangi kavramı temsil ettiğini ayrı ayrı söyle. Galaksi çizimi uzaklığı, yıldız döngüsü evreleri, enkaz görseli ise yörünge riskini sadeleştirir; hiçbir çizim uzayın gerçek ölçekte fotoğrafı değildir. İddian, gözlemin ve çıkarımın arasındaki ayrımı koru."
      ],
      "points": [
        "Yıldız rengi sıcaklık hakkında bilgi verebilir.",
        "Takımyıldızdaki yıldızlar uzayda aynı uzaklıkta olmak zorunda değildir.",
        "Işık yılı uzaklık birimidir, zaman birimi değildir.",
        "Samanyolu, Güneş Sistemi’nin bulunduğu galaksidir.",
        "Galaksiler farklı biçim ve yapılara sahip olabilir.",
        "Evren, galaksileri de kapsayan daha geniş ölçektir.",
        "Araçları görevleriyle eşleştir.",
        "Yıldız yaşam yollarını başlangıç kütlesine göre karşılaştır."
      ],
      "terms": [
        "yıldız",
        "takımyıldız",
        "ışık yılı",
        "gözlem",
        "gök cismi",
        "galaksi",
        "Samanyolu",
        "evren",
        "uzay teknolojisi",
        "yıldız yaşam döngüsü",
        "kanıt"
      ],
      "tasks": [
        "Takımyıldız çiziminde yıldız noktalarını birleştirerek bir örüntü oluştur.",
        "Işık yılı ifadesinin hangi fiziksel büyüklüğü ölçtüğünü yaz.",
        "Renk veya büyüklük karşılaştırmasında kullandığın ölçütü belirt.",
        "Yıldız, gezegen, galaksi ve evren kavramlarını kartlara yaz.",
        "En kapsayıcı kavramdan daha özel olana doğru oklarla ilişki kur."
      ],
      "quiz": {
        "prompt": "Işık yılı hangi büyüklüğün ölçü birimidir?",
        "options": [
          "Uzaklık",
          "Zaman",
          "Sıcaklık",
          "Kütle"
        ],
        "answer": 0,
        "explanation": "Işık yılı, ışığın bir yılda aldığı yolu temel alan bir uzaklık birimidir.",
        "hint": "Adında “yıl” geçse de bu kavramın gök cisimleri arasındaki neyi anlattığını düşün."
      },
      "activity": {
        "title": "Gökyüzü örüntüsü ve uzaklık notu",
        "format": "Görsel model ve kavram açıklaması",
        "prompt": "Kâğıda altı yıldız noktası yerleştirip birkaçını çizgilerle birleştirerek kendi takımyıldız modelini oluşturduğunu düşün. Modelin gözlem kolaylığı sağlayan yönünü ve gerçek yıldız uzaklıkları hakkında neden tek başına kanıt olmadığını açıkla.",
        "placeholder": "Örüntüm… Gözlem kolaylığı… Gerçek uzaklıklar için gereken ek bilgi…",
        "minChars": 30,
        "criteria": [
          "Takımyıldızın görünür örüntü olduğunu belirt.",
          "Gözlemdeki yararını açıkla.",
          "Görünüşün gerçek uzaklıkları kanıtlamadığını açıkla."
        ],
        "hint": "Gökyüzündeki iki boyutlu görünüş ile yıldızların uzaydaki konumunu ayır."
      },
      "sourceWeeks": [
        10,
        11,
        12
      ]
    },
    {
      "id": 6,
      "date": "19–23 Eki",
      "unitId": "energy",
      "topic": "Kuvvet, hareket ve fiziksel anlamda iş · Kuvvet ve yer değiştirmeyi örneklerle değerlendirme",
      "pages": "58–64",
      "visual": "energy",
      "visualNote": "Eğri yol üzerindeki bilyenin hareketini izlerken, fiziksel iş için kuvvetin yönü ve yer değiştirmenin yönünü birlikte düşün. Bilyenin yoldaki yüksek ve alçak konumlarına bakarken, kuvvet ile hareket yönünün her örnekte aynı olup olmadığını sorgula.",
      "focus": "Fizikte iş yapılması için kuvvetin cisimde kuvvet doğrultusunda yer değiştirme oluşturması gerektiğini açıkla. Fiziksel iş kararını kuvvetin yönü ve cismin yer değiştirmesini karşılaştırarak ver.",
      "summary": [
        "Günlük dilde “iş yapmak” çaba harcamak anlamına gelir; fizikte iş, bir cisme kuvvet uygulanması ve cismin kuvvet doğrultusunda yer değiştirmesiyle tanımlanır. Bu nedenle yorulmak, tek başına fiziksel anlamda iş yapıldığını göstermez. Fiziksel ölçüt kişinin hissi değil, cisim üzerindeki kuvvet ve hareket ilişkisidir. Bir cisme kuvvet uygulanması, cismin mutlaka hareket ettiği anlamına gelmez. Fiziksel iş için kuvvetle birlikte yer değiştirme gerekir; ayrıca yer değiştirmenin yönü kuvvetin uygulandığı yönle karşılaştırılır. Bu koşullar, günlük yaşamdaki taşıma, itme ve kaldırma örneklerine aynı ölçütü uygulamamızı sağlar.",
        "Önce hangi cisme kuvvet uygulandığını belirle, sonra cisimde yer değiştirme olup olmadığına bak. Cismin yer değiştirmesi kuvvetin doğrultusundaysa fiziksel iş yapılır. Kuvvet uygulanıp cisim hiç hareket etmiyorsa iş yapılmış sayılmaz; kuvvet ile hareket birbirine dik doğrultudaysa kuvvetin hareket yönünde etkisi yoktur. Bir kitabı yukarı kaldırırken uygulanan kuvvet ve yer değiştirme aynı yöndedir; kitap yükselir. Yerde duran duvarı itmek kuvvet uygulamasıdır ama duvarın yer değiştirmesi yoksa iş yapılmaz. Yatay yolda yük taşırken kuvvetin hangi cisme, hangi yönde uygulandığını açıklamak gerekir; taşıyan kişinin yorulması fiziksel tanımın yerine geçmez.",
        "Kitabın sınıf öyküsünde öğretmen masayı iterek hareket ettirir, kalemleri yerden kaldırır ve bilgisayar çantasını taşır. Her sahnede aynı karar verilmez: masada yatay hareket, kalemleri kaldırmada yukarı hareket vardır; çantayı yatay taşırken destek kuvvetinin yönüyle hareket yönünü ayrıca karşılaştırmak gerekir. Kitap, çağrı merkezi çalışanının bilgisayar başındaki çalışması ile duvar örerken tuğlayı hareket ettirme örneğini karşılaştırır. Fizikte değerlendirme kişinin meslek ya da çaba düzeyine göre değil, kuvvet ve yer değiştirmenin ilişkisine göre yapılır. Bir cisme daha büyük kuvvet uygulanıp daha fazla yol aldırılırsa yapılan iş de artabilir.",
        "Bir örneği değerlendirirken kuvvet oku ile yer değiştirme okunu çiz ve ikisinin yönünü karşılaştır. Duvarı itmek, duvar hareket etmediğinde fiziksel iş değildir; buna rağmen kişi enerji harcayabilir ve yorulabilir. “Fiziksel iş yok” sonucu, hiçbir kuvvet uygulanmadığı anlamına gelmez. İşin büyüklüğünü karşılaştırırken cisme etki eden kuvveti ve kuvvet doğrultusunda alınan yolu aynı tabloya yaz. Birimler newton ve metredir; iş birimi joule’dür. Şemadaki okları izlemeden “hareket etti, demek iş yapıldı” deme; hareketin kuvvete göre yönü de önemlidir."
      ],
      "points": [
        "Fiziksel iş için kuvvet uygulanması gerekir.",
        "Cisim kuvvet doğrultusunda yer değiştirmelidir.",
        "Günlük “çaba” ile fiziksel iş kavramı aynı değildir.",
        "Kuvvet ile yer değiştirmenin yönünü karşılaştır.",
        "Kuvvet uygulanması tek başına fiziksel iş anlamına gelmez.",
        "Kararını günlük çabaya değil fiziksel ölçüte dayandır."
      ],
      "terms": [
        "kuvvet",
        "yer değiştirme",
        "fiziksel iş",
        "doğrultu",
        "kuvvet yönü",
        "yer değiştirme yönü",
        "iş",
        "karşılaştırma"
      ],
      "tasks": [
        "Günlük hayattan kuvvet uygulanan üç durum düşün.",
        "Her durumda cisimde yer değiştirme olup olmadığını kaydet.",
        "Fiziksel iş ölçütünü kullanarak sınıflandırmanı gerekçelendir.",
        "İki örnekte kuvvet ve hareket yönlerini oklarla göster.",
        "Bir “iş yapılmaz” örneğini ve nedenini yaz."
      ],
      "quiz": {
        "prompt": "Bir öğrenci ağır bir kutuyu itiyor, ancak kutu hareket etmiyor. Bu durumda kutuya fiziksel anlamda iş yapılmış mıdır?",
        "options": [
          "Hayır; kutuda kuvvet doğrultusunda yer değiştirme oluşmamıştır.",
          "Evet; kuvvet uygulamak her zaman fiziksel iş demektir.",
          "Evet; öğrencinin yorulması fiziksel iş için yeterlidir.",
          "Hayır; çünkü kutunun kütlesi bilinmiyor."
        ],
        "answer": 0,
        "explanation": "Fiziksel iş için kuvvetle birlikte kuvvet doğrultusunda yer değiştirme gerekir.",
        "hint": "Uygulanan kuvvet kadar cismin yer değiştirip değiştirmediğini de kontrol et."
      },
      "activity": {
        "title": "İş var mı? Karar kartları",
        "format": "Günlük durumları ölçütle inceleme",
        "prompt": "Üç durum yaz: hareket eden bir cisim, itilmesine rağmen yerinde kalan bir cisim ve kuvvet doğrultusuna dik yönde hareket eden bir cisim. Her durumda fiziksel iş olup olmadığını ölçütle açıkla.",
        "placeholder": "Durum 1… Kuvvet… Yer değiştirme… Sonuç…",
        "minChars": 30,
        "criteria": [
          "Üç farklı durumu ayırt et.",
          "Kuvvet ve yer değiştirme doğrultusunu kullan.",
          "Günlük çabayı fiziksel işten ayır."
        ],
        "hint": "Her örnekte kuvvetin yönü ile yer değiştirmenin yönünü birlikte incele."
      },
      "sourceWeeks": [
        13,
        14
      ]
    },
    {
      "id": 7,
      "date": "26–30 Eki",
      "unitId": "energy",
      "topic": "Enerji çeşitleri ve kinetik enerji · Potansiyel enerji: yükseklik ve esneklik",
      "pages": "64–70",
      "visual": "energy",
      "visualNote": "Bilye en alçak noktadan geçerken hareket enerjisini düşün; bir deneyde kütle ile hızı ayrı ayrı karşılaştır. Yüksek konum ile alçak konumu karşılaştır; esnek cisimlerde enerji depolanmasının farklı bir durum olduğunu hatırla.",
      "focus": "Hareketli cisimlerin kinetik enerjiye sahip olduğunu ve kütle-hız karşılaştırmalarının bu enerjiyle ilişkisini açıkla. Çekim potansiyel enerjisini kütle ve yükseklikle; esneklik potansiyel enerjisini cismin gerilme veya sıkışma durumuyla ilişkilendir.",
      "summary": [
        "Enerji, iş yapabilme yeteneği olarak tanımlanır. Hareket hâlindeki cisimler kinetik enerjiye sahiptir; hareket etmeyen bir cisim de konumundan veya esnekliğinden dolayı potansiyel enerji depolayabilir. Bir cismin enerji türünü belirlerken onun hareketine, konumuna ve şekil değişimine bakılır. Potansiyel enerji, cismin konumu veya durumuna bağlı olarak depolanmış kabul edilen enerjidir. Çekim potansiyel enerjisi cismin ağırlığı ve yüksekliğiyle ilişkilidir: aynı cisim daha yüksek noktadayken veya aynı yükseklikte daha ağır bir cisimken bu enerji daha büyük olabilir.",
        "Kinetik enerjiyi karşılaştırırken kütle ve hız önemlidir. Aynı koşullarda daha büyük kütleli ya da daha hızlı hareket eden cismin kinetik enerjisi daha fazla olabilir. Kütlenin etkisini araştırmak için hızı, hızın etkisini araştırmak için kütleyi sabit tutmak gerekir; böylece karşılaştırma adil olur. Esnek bir cisim gerildiğinde veya sıkıştırıldığında, eski şekline dönme eğilimi nedeniyle enerji depolayabilir. Yayın sıkıştırılması ya da lastiğin gerilmesi bunun örneğidir. Serbest bırakıldığında depolanan enerji cismin hareket etmesine veya başka bir değişime yol açabilir.",
        "Kitapta koşan çocuklar, yarış arabası, barajda biriken su ve denizde ilerleyen tekne gibi örnekler bulunur. Hareket eden çocuk/araç/tekne kinetik enerjiyle, yüksekte tutulan su ise çekim potansiyel enerjisiyle ilişkilidir. Bir örnek bazen birden fazla enerji türü taşıyabilir; soruda hangi enerjiye bakıldığı açık olmalıdır. Kitapta barajdaki su, yüksek bir konum, yay ve gerilmiş lastik gibi örnekler karşılaştırılır. Barajda yükseltilmiş su çekim potansiyel enerjisiyle, sıkıştırılmış yay esneklik potansiyel enerjisiyle ilişkilidir. Bu iki türün ortak yanı enerji depolamasıdır; kaynağı ve değişkenleri farklıdır.",
        "Kinetik enerji yalnızca hareket ederken anlam kazanır. Duran bir arabanın kinetik enerjisi yoktur; fakat yüksek bir konumdaysa potansiyel enerjisi olabilir. Görsellerden çıkarım yaparken kütle ve hız hakkında verilen bilgileri ara; sadece cismin büyük görünmesi veya fotoğrafta hızlıymış gibi görünmesi ölçüm değildir. Bir cismin yüksekliğini veya ağırlığını değiştirerek çekim potansiyel enerjisini karşılaştır; esnek cisimde ise gerilme/sıkışma miktarını incele. Yükseklik arttı diye her durumda enerji türü yalnızca potansiyel olmaz: cisim hareket ediyorsa kinetik enerji de bulunabilir. Model ve çizimde varsayılan koşulları belirt."
      ],
      "points": [
        "Hareketli cisimler kinetik enerjiye sahiptir.",
        "Kütle ve hız kinetik enerji karşılaştırmasını etkiler.",
        "Adil karşılaştırmada diğer değişkenler sabit tutulur.",
        "Çekim potansiyel enerjisi kütle ve yükseklikle ilişkilidir.",
        "Gerilen veya sıkışan esnek cisim enerji depolayabilir.",
        "Farklı potansiyel enerji türlerinin dayandığı durumlar farklıdır."
      ],
      "terms": [
        "enerji",
        "kinetik enerji",
        "kütle",
        "hız",
        "potansiyel enerji",
        "çekim",
        "yükseklik",
        "esneklik"
      ],
      "tasks": [
        "Farklı hızlarla hareket eden iki nesne örneği kur.",
        "Kütle etkisini incelemek için sabit tutacağın değişkeni belirt.",
        "Gözlem sonucunu bir karşılaştırma cümlesiyle yaz.",
        "Aynı yükseklikte farklı kütleleri karşılaştır.",
        "Aynı cisim için iki farklı yüksekliği karşılaştır."
      ],
      "quiz": {
        "prompt": "Aynı yolda hareket eden iki araçtan hangisinin kinetik enerjisi daha fazladır?",
        "options": [
          "Kütlesi ve hızı daha büyük olanın",
          "Daha yavaş ve daha hafif olanın",
          "Hareket etmeyenin",
          "Yalnızca rengi daha koyu olanın"
        ],
        "answer": 0,
        "explanation": "Kinetik enerji karşılaştırmasında hem kütle hem de hız önemlidir.",
        "hint": "Hareket enerjisini etkileyen iki özelliği birlikte düşün."
      },
      "activity": {
        "title": "Kinetik enerji için adil karşılaştırma",
        "format": "Değişkenleri kontrol etme",
        "prompt": "Bir oyuncak aracın kütlesi ve hızı ile kinetik enerjisini karşılaştıran iki küçük deney tasarla. İlk deneyde hangi değişkeni değiştireceğini, hangisini sabit tutacağını; ikinci deneyde de aynı bilgileri yaz.",
        "placeholder": "Deney 1… Değişen… Sabit… Beklentim…",
        "minChars": 30,
        "criteria": [
          "Kütle ve hız değişkenlerini ayırt et.",
          "Bir deneyde tek temel değişkeni değiştir.",
          "Ölçüm veya karşılaştırma yolunu belirt."
        ],
        "hint": "İki değişkeni aynı anda değiştirirsen hangi değişikliğin etkili olduğunu anlayamazsın."
      },
      "sourceWeeks": [
        15,
        16
      ]
    },
    {
      "id": 8,
      "date": "2–6 Kas",
      "unitId": "energy",
      "topic": "Kinetik ve potansiyel enerji dönüşümleri · Enerjinin korunumu ve sürtünmenin etkisi · Kuvvet ve enerji ünitesi: günlük yaşam ve tekrar",
      "pages": "59–81",
      "visual": "energy",
      "visualNote": "Bilyenin yüksek noktadan en alt noktaya inişini izle; konum ve hareket değiştikçe enerji türlerinin nasıl değiştiğini düşün. Bilye hareket ederken sürtünmenin etkisini de düşün; yavaşlaması enerjinin yok olduğu anlamına gelmez. Aynı modelde yüksekliği, hareketi ve sürtünmeyi ayrı ayrı inceleyerek ünite kavramlarını ilişkilendir.",
      "focus": "Bir cismin konumu ve hareketi değişirken kinetik enerji ile çekim potansiyel enerjisinin dönüşümünü açıkla. Enerjinin yok olmadığını, tür değiştirebildiğini ve sürtünmeyle çevreye aktarılabildiğini örnekle. Fiziksel iş, enerji türleri ve enerji dönüşümlerini günlük bir hareket örneğinde ilişkilendir.",
      "summary": [
        "Enerji dönüşümü, bir enerji türünün başka bir türe dönüşmesidir. Salıncak veya sarkaç yukarıdayken yüksekliği ve çekim potansiyel enerjisi daha fazla, hareketi yavaş olabilir; aşağı inerken hızlanır ve kinetik enerjisi artabilir. En alt noktada hız çoğu zaman en büyük, yükseklik en küçüktür. Enerjinin korunumu, enerjinin yoktan var olmadığı ve var olan enerjinin bütünüyle yok olmadığı ilkesidir. Enerji, sistem içinde tür değiştirebilir veya sistem ile çevre arasında aktarılabilir. Bu yüzden hareket azaldığında “enerji kayboldu” demek yerine hangi enerji biçimlerine dönüştüğünü ya da çevreye geçtiğini araştırırız. Kuvvet-enerji ünitesindeki temel kavramlar birbirine bağlıdır ama aynı anlama gelmez. Fiziksel iş için kuvvet ve kuvvet doğrultusunda yer değiştirme gerekir; kinetik enerji hareketle, potansiyel enerji ise konum veya esneklikle ilişkilidir. Bir olayı açıklarken hangi kavramı kullandığını açıkça adlandır.",
        "Sarkaç karşı tarafa yükselirken kinetik enerjisinin bir bölümü yeniden çekim potansiyel enerjisine dönüşebilir. Başlangıç ve uç noktalarda topuz bir an için yavaşlar; en altta ise hareketi hızlanır. Bu, cismin konumu ile hareketinin birlikte enerji değişimine yol açtığını gösterir. Sürtünmesiz bir modelde top yokuş aşağı inerken çekim potansiyel enerjisi azalır, kinetik enerjisi artar; yukarı çıkarken bunun tersi görülebilir. Sürtünme varsa mekanik enerjinin bir bölümü ısıya, bazen sese dönüşür. Topun yavaşlaması hareket enerjisinin başka türlere aktarılmasıyla açıklanır. Bir bisiklet yokuş yukarı çıkarken pedala uygulanan kuvvet bisikleti hareket ettirir; bisikletin hızı ve yüksekliği değiştikçe kinetik ve çekim potansiyel enerjisi de değişebilir. Yokuş aşağı inerken enerji dönüşümü farklı yönde görünür. Sürtünme tekerlek, yol ve havayla etkileşerek enerji aktarımına yol açar.",
        "Kitap öğrencilere salıncak öyküsü verir ve sarkaç, basketbol topu, maket araba, yay ve eğik düzlemle gözlem yapmalarını önerir. Her düzende başlangıç, en alt ve en üst gibi konumlar belirlenir; kinetik ve potansiyel enerji karşılaştırılır. Sürtünmenin ihmal edilip edilmediği sonucu etkiler. Kitap eğik düzlem, sarkaç, basketbol topu ve yaylı araba deneyleriyle bu değişimleri karşılaştırır; bazı yönergelerde sürtünme kuvvetinin ihmal edilmesini özellikle söyler. Bu, öğrencinin ideal koşulla gerçek gözlem arasındaki farkı görmesi içindir. Ölçüm yapılırken sistemin nerede başlayıp nerede bittiği açık olmalıdır. Kitabın kaykay yarım borusu, sarkaç, top, yay ve eğik düzlem örnekleri bu ilişkileri farklı durumlarda tekrar ettirir. Her soruda cisme uygulanan kuvveti, hareket yönünü, hızı, yüksekliği ve sürtünme varsayımını sırayla belirlemek çözümün dayanağını kurar.",
        "Enerji grafiğinde bir tür artarken diğeri azalabilir; bu, toplam enerjinin kaybolduğu anlamına gelmez. Gerçek salıncak zamanla durur çünkü sürtünme ve hava direnci hareket enerjisinin bir bölümünü ısı ve ses gibi biçimlere aktarır. İdeal modelde bu etkiler bazen özellikle yok sayılır. Enerji grafiğinde yalnızca kinetik ve potansiyel sütunlara bakarsan, sürtünmede ortaya çıkan ısıyı gözden kaçırabilirsin. Model varsayımlarını, ölçüm sınırlarını ve çevreye aktarılan enerjiyi yaz. Enerji tür değiştirir; toplamı izlemek için sisteme ve çevresine ilişkin tüm dönüşümleri hesaba katmak gerekir. Bir açıklama oluştururken önce gözlenen hareketi yaz, sonra enerji türlerini ve olası dönüşümleri ilişkilendir. Grafik veya çizimdeki renkler yalnızca temsil anahtarıdır; kitap görseli gerçek ölçekte enerji miktarını ölçmez. Başlangıç ve son durumları aynı ölçütle karşılaştır, eksik değişken varsa bunu belirt."
      ],
      "points": [
        "Yukarı çıkarken kinetik enerji potansiyel enerjiye dönüşebilir.",
        "Aşağı inerken potansiyel enerji kinetik enerjiye dönüşebilir.",
        "Sürtünme enerji dönüşümünü etkileyebilir.",
        "Enerji tür değiştirebilir veya sistemle çevre arasında aktarılabilir.",
        "Sürtünme mekanik enerjinin bir bölümünü ısı ve sese dönüştürebilir.",
        "Model varsayımları açıkça belirtilmelidir.",
        "Fiziksel iş, kuvvet ve yer değiştirme ölçütleriyle incelenir.",
        "Kinetik enerji hareketle; potansiyel enerji konum veya esneklikle ilişkilidir."
      ],
      "terms": [
        "enerji dönüşümü",
        "kinetik enerji",
        "çekim potansiyel enerjisi",
        "salıncak",
        "enerjinin korunumu",
        "sürtünme",
        "ısı enerjisi",
        "ses enerjisi",
        "iş",
        "potansiyel enerji"
      ],
      "tasks": [
        "Bir salıncağın en üst ve en alt konumlarını karşılaştır.",
        "Hangi enerji türünün arttığını ve azaldığını oklarla göster.",
        "Modelde sürtünme varsa sonuçta ne fark edebileceğini belirt.",
        "Bir sarkaçta enerji dönüşümünü üç konumda göster.",
        "Sürtünme ihmal edildiğinde ve edildiğinde beklenen farkı yaz."
      ],
      "quiz": {
        "prompt": "Bir top yüksek bir noktadan aşağı doğru yuvarlanırken hangi değişim beklenir?",
        "options": [
          "Çekim potansiyel enerjisi azalırken kinetik enerji artabilir.",
          "Kinetik enerji azalırken topun yüksekliği artar.",
          "Enerji türü hiçbir koşulda değişmez.",
          "Topun rengi kinetik enerjiyi belirler."
        ],
        "answer": 0,
        "explanation": "Aşağı inerken yükseklik azalır; hareket hızlanıyorsa kinetik enerji artabilir.",
        "hint": "Topun konum ve hareketindeki değişimi ayrı ayrı izle."
      },
      "activity": {
        "title": "Salıncakta enerji haritası",
        "format": "Konum–enerji tablosu",
        "prompt": "Bir salıncağın sol üst, orta-alt ve sağ üst konumlarında hareket hızını ve yüksekliğini karşılaştır. Her konumda kinetik ve çekim potansiyel enerjisinin göreli durumunu sözcüklerle belirt.",
        "placeholder": "Sol üst… Orta-alt… Sağ üst…",
        "minChars": 30,
        "criteria": [
          "En az üç konum karşılaştır.",
          "Hız ve yüksekliği birlikte kullan.",
          "Enerji dönüşümünü açıklayan bir cümle yaz."
        ],
        "hint": "En yüksek noktalarda hız, en alt noktada yükseklik nasıl değişiyor?"
      },
      "sourceWeeks": [
        17,
        18,
        19
      ]
    },
    {
      "id": 9,
      "date": "9–13 Kas",
      "unitId": "systems",
      "topic": "Sindirim sistemine giriş ve besinlerin izlediği yol · Sindirim sistemini oluşturan organlar ve görevleri",
      "pages": "88–95",
      "visual": "digestion",
      "visualNote": "Şemada ağızdan başlayan yolu takip et; besinlerin parçalanmasıyla sindirilmiş maddelerin emilmesini ayrı basamaklar olarak düşün. Besin yolunu ağızdan başlayarak izlerken karaciğer ve pankreasın yardımcı organ olduğunu, besinin içinden geçmediğini ayırt et.",
      "focus": "Sindirim sisteminin besinleri parçalama ve vücudun yararlanabileceği hâle getirme rolünü açıkla. Sindirim kanalındaki organların sırasını ve yardımcı organların katkısını model üzerinde ayırt et.",
      "summary": [
        "Sindirim, besinlerin vücudun yararlanabileceği küçük yapı taşlarına ayrılmasıdır. Canlılar besinlerden enerji ve büyüme-gelişme için gerekli maddeleri alır. Büyük besin parçaları hücrelere doğrudan geçemez; sindirim süreci onları daha küçük hâle getirir, ardından bazı yapı taşları kana emilir. Sindirim kanalındaki besin yolu ağız → yutak → yemek borusu → mide → ince bağırsak → kalın bağırsak → anüs şeklindedir. Ağız besini alır ve çiğner; yutak ile yemek borusu geçişi sağlar; mide besinleri karıştırır. Organların adını doğru sıra ve görevle öğrenmek, sistemi bir bütün olarak anlamayı kolaylaştırır.",
        "Besinler ağızdan alınır ve sindirim kanalında ilerler. Dişlerin çiğnemesi fiziksel parçalanmayı başlatır; tükürükteki enzimler bazı besinlerin kimyasal sindirimine katkı verir. Yutma, mide hareketleri, bağırsaklarda sindirim ve emilim farklı basamaklardır; tek bir organ bütün görevleri üstlenmez. İnce bağırsakta sindirim tamamlanır ve yapı taşlarının önemli bölümü kana emilir. Kalın bağırsak suyun geri kazanılmasına ve sindirilmeyen kalıntının ilerlemesine katkı sağlar; anüs atığın vücuttan çıktığı son kısımdır. Her organdaki olay aynı değildir ve sindirimin bazı türleri belirli organlarda gerçekleşir.",
        "Kitap Burçak’ın elmayı ısırıp yutmasıyla besinin vücudundaki yolunu sorar. Bu öykü, ağızdan başlayıp yutak, yemek borusu, mide ve bağırsaklara uzanan yolu incelemek için giriş sağlar. Sindirilemeyen kalıntılar sonunda vücuttan uzaklaştırılır; sindirilmiş besinlerin yapı taşları ise hücrelere taşınabilir. Karaciğer ve pankreas sindirime yardımcı organlardır; salgıları sindirime katkı verir ancak besinler bu organların içinden geçmez. Kitabın s. 95’teki büyük diyagramı, kanal üzerindeki organlarla yardımcı organları birlikte gösterir. Poster veya model hazırlarken bu iki grubu farklı renk/etiketle ayırmak yararlıdır.",
        "Besin yolunu haritada gösterirken sindirim kanalı ile yardımcı organları ayır. Sindirim, besinleri parçalama; emilim, sindirilmiş maddelerin kana geçmesi; boşaltım ise vücuttaki bazı atıkların uzaklaştırılmasıdır. Bunlar birbiriyle bağlantılı olsa da farklı süreçlerdir. Modelinde besin akışını oklarla, yardımcı organları ayrı göster. Şemayı izlerken “besin nereden geçiyor?”, “nerede parçalanıyor?” ve “nerede kana geçiyor?” sorularını ayrı sor. Yemek borusunda besin taşınır; sindirim burada gerçekleşmez. Karaciğer veya pankreası besin yolu üzerinde bir durak gibi çizmek, yapı ile işlevi karıştırır."
      ],
      "points": [
        "Sindirim besinleri küçük yapı taşlarına ayırır.",
        "Sindirim kanalındaki organlar farklı görevler üstlenir.",
        "Sindirim ve emilim birbirinden ayrı süreçlerdir.",
        "Besinlerin sindirim kanalındaki sırası korunmalıdır.",
        "İnce bağırsak sindirim ve emilimde önemli rol oynar.",
        "Yardımcı organlar kanaldan geçiş yolu değildir."
      ],
      "terms": [
        "sindirim",
        "besin",
        "sindirim kanalı",
        "organ",
        "yutak",
        "yemek borusu",
        "mide",
        "ince bağırsak",
        "kalın bağırsak"
      ],
      "tasks": [
        "Besinin vücutta izlediği yolu ilk tahmininle sırala.",
        "Yol üzerindeki organların görevlerini araştırma notu olarak ayır.",
        "Besinlerin vücuda neden küçük parçalara ayrılarak kazandırıldığını açıkla.",
        "Sindirim kanalı organlarını doğru sırada yaz.",
        "Her organ için bir görev notu ekle."
      ],
      "quiz": {
        "prompt": "Sindirim sisteminin temel işlevlerinden biri hangisidir?",
        "options": [
          "Besinleri vücudun yararlanabileceği küçük parçalara ayırmak",
          "Oksijeni akciğerlerden havaya geri vermek",
          "Kanı vücuttan tamamen uzaklaştırmak",
          "Kemiklerin boyunu aniden uzatmak"
        ],
        "answer": 0,
        "explanation": "Sindirim, besinlerin vücudun kullanabileceği küçük parçalara ayrılmasına yardım eder.",
        "hint": "Besinlerin hücrelere yararlı olabilmesi için önce hangi işlemden geçmesi gerektiğini düşün."
      },
      "activity": {
        "title": "Besin yolculuğuna ilk model",
        "format": "Ön bilgi şeması",
        "prompt": "Bir lokmanın ağızdan başlayarak sindirim kanalında izleyeceği yolu bildiğin kadarıyla sırala. Emin olmadığın bir basamağı soru işaretiyle göster ve hangi kaynaktan doğrulayacağını yaz.",
        "placeholder": "Ağız → … → …; doğrulayacağım soru…",
        "minChars": 25,
        "criteria": [
          "Besin yolunu sırayla modelle.",
          "Bilmediğin yeri tahmin gibi işaretle.",
          "Bir doğrulama kaynağı belirt."
        ],
        "hint": "Ön bilgi ile doğrulanmış bilgiyi ayrı tut; sonraki haftalarda modelini güncelleyebilirsin."
      },
      "researchBrief": {
        "label": "PERFORMANS GÖREVİ · ARAŞTIRMA SONUCU",
        "title": "Sindirim sistemi organları: görev paylaşımı",
        "intro": "Basılı s. 94’teki “Sindirim Sistemini Tanıyalım” performans görevi organların görevlerine ilişkin bilgi toplamayı ister. Sonuç, besin yolunu ve yardımcı organları birlikte açıklıyor.",
        "items": [
          {
            "name": "Ağız, yutak ve yemek borusu",
            "role": "Besin ağızdan alınır ve çiğneme ile küçük parçalara ayrılmaya başlar. Yutak besinin yemek borusuna geçişini sağlar; yemek borusu kas hareketleriyle besini mideye taşır."
          },
          {
            "name": "Mide",
            "role": "Mide besinleri kas hareketleriyle karıştırır; mide öz suyu kimyasal sindirime katkı verir. Besin burada parçalanırken sindirim kanalı boyunca ilerler."
          },
          {
            "name": "İnce bağırsak",
            "role": "Sindirim burada sürer ve büyük ölçüde tamamlanır. Sindirilmiş küçük yapı taşları bağırsak duvarından kana emilerek vücudun hücrelerine taşınabilir."
          },
          {
            "name": "Kalın bağırsak ve anüs",
            "role": "Kalın bağırsakta su ve bazı mineraller emilir; sindirilemeyen artıklar dışkı hâline gelir ve anüsten vücuttan uzaklaştırılır."
          },
          {
            "name": "Karaciğer ve pankreas",
            "role": "Bu yardımcı organlar salgılarıyla sindirime katkı verir; besinler bu organların içinden geçmez. Böylece sindirim kanalı ile yardımcı organların görevi birbirinden ayrılır."
          }
        ],
        "takeaway": "Besin yolu ağız → yutak → yemek borusu → mide → ince bağırsak → kalın bağırsak → anüstür. Sindirim, emilim ve atıkların uzaklaştırılması farklı basamaklardır; organlar görev paylaşımıyla çalışır.",
        "source": "Kaynak özeti: ders kitabı s. 91–95; “Sindirim Sistemini Tanıyalım” performans görevi ve organ şemaları."
      },
      "sourceWeeks": [
        20,
        21
      ]
    },
    {
      "id": 10,
      "date": "23–27 Kas",
      "unitId": "systems",
      "topic": "Fiziksel ve kimyasal sindirim; emilim · Sindirim sisteminin sağlığı ve dengeli alışkanlıklar",
      "pages": "90–100",
      "visual": "digestion",
      "visualNote": "Organların sırası kadar, besinin parçalanması ile yapı taşlarının kana geçişini de ayrı süreçler olarak izle. Sindirim organlarının görevlerini incelerken sağlık önerilerini genel bilgi ve güvenilir kaynakla sınırla; tek bir belirti tanı değildir.",
      "focus": "Fiziksel sindirim, kimyasal sindirim ve emilimi örneklerle karşılaştır. Sindirim sağlığını destekleyen genel alışkanlıkları güvenilir bilgi ve kişisel farklılıklarla birlikte değerlendir.",
      "summary": [
        "Fiziksel sindirim, besinlerin kimyasal yapısı değişmeden daha küçük parçalara ayrılmasıdır; çiğneme buna örnektir. Bu parçalanma besinin yüzey alanını artırır. Kimyasal sindirimde enzimler büyük besin moleküllerini hücrelerin kullanabileceği daha küçük yapı taşlarına ayırır. Sindirim sisteminin sağlığı; çeşitli ve dengeli beslenme, yeterli sıvı, gıda temizliği, düzenli hareket ve kişisel hijyen gibi genel alışkanlıklarla ilişkilidir. Her bireyin gereksinimi yaş, günlük hareket ve sağlık durumuna göre değişir; bu nedenle tek bir yiyeceği herkes için aynı biçimde sınıflandırmak doğru değildir.",
        "Sindirim kanalının farklı bölümlerinde farklı besinlerin sindirimi gerçekleşir. Ağızda çiğneme ve tükürükteki enzimler çalışmaya başlar; midede kas hareketleri ve mide öz suyu özellikle proteinlerin sindirimine katkı verir. İnce bağırsakta sindirim devam eder; sindirilmiş maddelerin kana geçmesine emilim denir. Beslenme günlüğü, kişinin öğün saatlerini, yeme biçimini ve seçimlerini fark etmesine yardım eder; tek başına hastalık tanısı koymaz. Yiyecekleri temiz ellerle tüketmek, güvenli koşullarda saklamak, çeşitli besin gruplarını almak ve hareketli kalmak genel sağlığı destekleyen örnek davranışlardır.",
        "Karaciğer ve pankreas gibi yardımcı organların salgıları kimyasal sindirime yardım eder. Kitabın organ diyagramı besinin içinden geçtiği kanal ile bu salgıları üreten yardımcı yapıları ayrı çizmiştir. Böylece “sindirilen madde hangi organdan geçiyor?” ve “hangi salgı sürece yardım ediyor?” soruları birbirinden ayrılır. Kitap düzensiz öğün, hızlı yeme, hazır gıda ve uzun süre ekranda oturma örnekleri üzerinden alışkanlıkları düşündürür. Dengeli beslenme; karbonhidrat, protein, yağ, vitamin, mineral ve suyu uygun çeşitlilikte almaktır. Sağlıkla ilgili özel gereksinimlerde güvenilir yetişkin ve sağlık uzmanının görüşü önemlidir.",
        "Fiziksel sindirim, kimyasal sindirim ve emilimi üç basamak olarak düşün: parçaların küçülmesi → moleküllerin yapı taşlarına ayrılması → yapı taşlarının kana geçmesi. Bir besinin çiğnenmesi tek başına tüm sindirim sürecini tamamlamaz. Şema çizerken her basamak için farklı ok ya da renk kullan. Bir öğün tablosunu incelerken tek bir güne bakıp kesin sonuç çıkarma; düzeni ve çeşitliliği fark etmeye çalış. Ders etkinliği tıbbi öneri yerine öz gözlem ve kaynak araştırması sağlar. Uzun süren veya kaygı veren belirtiler varsa bunu tek başına yorumlamak yerine güvenilir bir yetişkine ve sağlık uzmanına bildir."
      ],
      "points": [
        "Fiziksel sindirim parçaların boyutunu küçültür.",
        "Kimyasal sindirim enzimlerle yapı taşlarına ayırır.",
        "Emilim sindirilmiş maddelerin kana geçişidir.",
        "Çeşitli beslenme, hijyen ve hareket genel sağlığı destekler.",
        "Sağlık önerileri kişiye göre değişebilir.",
        "Belirti üzerinden kendi kendine tanı koyma."
      ],
      "terms": [
        "fiziksel sindirim",
        "kimyasal sindirim",
        "enzim",
        "emilim",
        "dengeli beslenme",
        "hijyen",
        "sindirim sağlığı",
        "alışkanlık"
      ],
      "tasks": [
        "Çiğneme örneğini fiziksel sindirim açısından açıkla.",
        "Kimyasal sindirimin neden farklı olduğunu yaz.",
        "İnce bağırsağın emilimdeki rolünü not et.",
        "Bir günlük örnek menüde besin çeşitliliğini incele.",
        "Sindirim sağlığını destekleyen iki alışkanlığı belirle."
      ],
      "quiz": {
        "prompt": "Bir besinin çiğnenerek küçük parçalara ayrılması hangi sindirim türüne örnektir?",
        "options": [
          "Fiziksel sindirim",
          "Kimyasal sindirim",
          "Emilim",
          "Dolaşım"
        ],
        "answer": 0,
        "explanation": "Çiğneme besini fiziksel olarak küçültür; kimyasal yapısını tek başına değiştirmez.",
        "hint": "Besinin boyutu mu değişiyor, yoksa moleküler yapısı mı?"
      },
      "activity": {
        "title": "Sindirim sürecini üç aşamada anlat",
        "format": "Karşılaştırma tablosu",
        "prompt": "Bir lokmanın çiğnenmesi, enzimlerle kimyasal olarak parçalanması ve yapı taşlarının kana geçmesini üç ayrı aşama olarak açıkla. Her aşamada neyin değiştiğini belirt.",
        "placeholder": "Fiziksel parçalanma… Kimyasal parçalanma… Emilim…",
        "minChars": 30,
        "criteria": [
          "Üç süreci ayrı adlandır.",
          "Fiziksel ve kimyasal değişimi karşılaştır.",
          "Emilimi kana geçiş olarak açıkla."
        ],
        "hint": "Emilim, sindirimin kendisiyle aynı olay değildir; sonraki basamaklardan biridir."
      },
      "researchBrief": {
        "label": "PERFORMANS GÖREVİ · ARAŞTIRMA SONUCU",
        "title": "Sindirim sağlığını destekleyen günlük alışkanlıklar",
        "intro": "Basılı s. 98’deki performans görevi sindirim sisteminin sağlığını korumak için bilgi toplamayı ister. Aşağıdaki sonuçlar ders kitabındaki önerileri genel eğitim bilgisi olarak bir araya getirir.",
        "items": [
          {
            "name": "Dengeli ve çeşitli beslenme",
            "role": "Farklı besin gruplarından uygun seçimler yapmak vücudun enerji ve yapı gereksinimlerini destekler. Öğün içeriği ve düzeni kişilerin gereksinimine göre değişebilir."
          },
          {
            "name": "Su, lif ve yavaş yeme",
            "role": "Yeterli sıvı ve lif içeren besinler sindirim sürecini destekleyebilir. Yemeği iyi çiğnemek ve öğünleri aceleye getirmemek de kitabın vurguladığı alışkanlıklardandır."
          },
          {
            "name": "Hareket ve günlük düzen",
            "role": "Düzenli fiziksel etkinlik ve uzun süre hareketsiz kalmaktan kaçınma sindirim sağlığını destekleyen yaşam alışkanlıklarıdır. Uyku ve stres yönetimi de genel iyilik hâliyle ilişkilidir."
          },
          {
            "name": "Gıda hijyeni",
            "role": "Yiyecekleri temiz biçimde hazırlamak ve uygun koşullarda saklamak bazı sağlık risklerini azaltır. Kişisel belirtiler veya hastalık şüphesi için genel sınıf bilgisi tanı yerine geçmez."
          }
        ],
        "takeaway": "Araştırma sonucu: tek bir yiyecek ya da alışkanlık sindirim sağlığını tek başına belirlemez. Çeşitli beslenme, sıvı, hareket ve hijyen birlikte değerlendirilir; kişiye özel sağlık sorusunda bir yetişkin ve sağlık uzmanına danışılır.",
        "source": "Kaynak özeti: ders kitabı s. 96–99; “Sindirim Sisteminin Sağlığını Koruyalım” performans görevi ve bilgi metni."
      },
      "sourceWeeks": [
        22,
        23
      ]
    },
    {
      "id": 11,
      "date": "30 Kas–4 Ara",
      "unitId": "systems",
      "topic": "Dolaşım sisteminin yapı ve organları · Küçük ve büyük kan dolaşımı",
      "pages": "101–109",
      "visual": "circulation",
      "visualNote": "Kırmızı ve mavi damar yolları görsel bir modeldir; damar adlarını kalbe göre akış yönüyle tanımla. Kalp ile akciğerler arasındaki yolu ve kalp ile vücut arasındaki yolu iki ayrı döngü olarak zihninde izle.",
      "focus": "Kalp, kan ve damarların dolaşım sistemindeki görevlerini birbirinden ayır. Küçük ve büyük kan dolaşımının kalp, akciğerler ve vücut arasındaki yollarını karşılaştır.",
      "summary": [
        "Dolaşım sistemi kalp, kan ve damarlardan oluşur; hücrelere oksijen ve besin taşınmasına, hücrelerde oluşan bazı atıkların uzaklaştırılmasına yardım eder. Kalp kasılıp gevşeyerek kanı damarlar boyunca hareket ettirir. Kan, vücut içinde farklı maddelerin taşınmasını sağlayan dokudur. Küçük kan dolaşımı, kanın kalpten akciğerlere gidip gaz alışverişinden sonra kalbe dönmesidir. Büyük kan dolaşımı, kalpten çıkan kanın vücudun diğer dokularına ulaşması ve yeniden kalbe gelmesidir. Bu iki yol birlikte çalışarak hücrelere oksijen ve besin taşınmasına, karbondioksit gibi atıkların uzaklaştırılmasına yardım eder.",
        "Atardamarlar kanı kalpten uzaklaştırır; toplardamarlar vücuttan kalbe getirir. Kılcal damarlar bu iki damar türünü birbirine bağlayan çok ince damarlardır ve kan ile hücreler arasında madde alışverişine olanak verir. Damar adları oksijen miktarından değil, kanın kalbe göre gidiş yönünden gelir. Akciğerlerde kan ile alveol havası arasında gaz alışverişi olur: oksijen kana geçer, karbondioksit kandan alveollere geçer. Büyük dolaşımda oksijence zengin kan vücuda gönderilir; hücrelerde maddeler kullanılır ve kan kalbe geri döner. Dolaşım şemasındaki oklar, kanın izlediği yolu gösterir.",
        "Kitabın s. 104’teki insan dolaşım şeması kalp ile bütün vücuda uzanan damar ağını gösterir; büyütülmüş damar çizimlerinde atardamar, toplardamar ve kılcal damar ayrımı yapılır. Kanın taşıdığı maddeler hücrelere ulaşır; atık maddeler de ilgili organlara taşınır. Kitap küçük ve büyük dolaşımı ayrı renkli devrelerle gösterir; İbnü’n Nefîs’in küçük dolaşım açıklamasını ve Harvey’nin kan dolaşımı çalışmalarını da bilim tarihi kutusunda anar. Modelde kalp, akciğer ve vücut dokularını doğru sıraya yerleştirmek, kanın iki döngüde nasıl hareket ettiğini anlamayı kolaylaştırır.",
        "Bir görselde damarları kırmızı/mavi çizmek kanın oksijen miktarını temsil edebilir; bu renk gerçek kanın damar içinde gözle görüldüğü renk değildir. Akciğere giden atardamarın oksijence düşük, akciğerden kalbe gelen toplardamarın oksijence yüksek kan taşıyabildiğini unutma. Sınıflandırmayı yön üzerinden yap. Renkli şemalar öğretim modelidir; kanın rengi gerçek damar görüntüsünde kırmızı/mavi iki ayrı renk gibi görünmez. Ayrıca atardamar ve toplardamar adları kalbe göre yönü belirtir; oksijen miktarı bu adların tanımı değildir. İki devreyi karşılaştırırken başlangıç-dönüş noktası, geçtiği organ ve gaz alışverişini ayrı ayrı yaz."
      ],
      "points": [
        "Kalp kanın dolaşmasına yardım eder.",
        "Atardamar ve toplardamar adları akış yönüyle ilgilidir.",
        "Kılcal damarlar madde alışverişinde görev alır.",
        "Küçük dolaşım kalp ile akciğerler arasındadır.",
        "Büyük dolaşım kalp ile vücut dokuları arasındadır.",
        "Damar adlandırmasında akış yönü esas alınır."
      ],
      "terms": [
        "kalp",
        "kan",
        "atardamar",
        "toplardamar",
        "kılcal damar",
        "küçük kan dolaşımı",
        "büyük kan dolaşımı",
        "akciğer",
        "kan akışı"
      ],
      "tasks": [
        "Kalp, kan ve damarları modelinde ayrı simgelerle göster.",
        "Üç damar türünün görevini karşılaştır.",
        "Damar adını kanın rengiyle değil kalbe göre yönle açıkla.",
        "Kalp–akciğer–kalp yolunu ayrı renkle göster.",
        "Kalp–vücut–kalp yolunu ikinci renkle göster."
      ],
      "quiz": {
        "prompt": "Atardamarlar kanı hangi yöne taşır?",
        "options": [
          "Kalpten uzaklaştırarak vücuda doğru",
          "Vücuttan kalbe doğru",
          "Yalnızca akciğerlerin içine",
          "Sadece sindirim kanalına"
        ],
        "answer": 0,
        "explanation": "Atardamarlar kanı kalpten uzaklaştırır; oksijen miktarı damar türünü tek başına belirlemez.",
        "hint": "Damar adındaki ölçütün kalbe göre yön olduğunu hatırla."
      },
      "activity": {
        "title": "Dolaşım sistemi modeli",
        "format": "Organ–görev eşleştirme şeması",
        "prompt": "Kalp, atardamar, toplardamar ve kılcal damarları bir şemada göster. Her birinin görevini kendi cümlenle yaz; kanın akış yönünü oklarla belirt.",
        "placeholder": "Kalp… Atardamar… Toplardamar… Kılcal damar…",
        "minChars": 30,
        "criteria": [
          "Dört yapıyı adlandır.",
          "Akış yönünü oklarla anlat.",
          "Damar görevlerini birbirinden ayır."
        ],
        "hint": "Akış yönü için önce kanın kalbe göre hangi yönde ilerlediğini belirle."
      },
      "sourceWeeks": [
        24,
        25
      ]
    },
    {
      "id": 12,
      "date": "7–11 Ara",
      "unitId": "systems",
      "topic": "Kan bağışının toplumsal dayanışmadaki yeri · Dolaşım sisteminin sağlığını koruma",
      "pages": "109–116",
      "visual": "circulation",
      "visualNote": "Kan dolaşımı görseli, kanın vücuttaki taşınma yolunu gösterir; bağışla ilgili koşullar için yetkili sağlık kaynaklarına başvurulur. Damar ağının bütün vücuda ulaştığını gözlemle; sağlıklı yaşam önerilerini güvenilir kaynak ve kişisel farklılıklarla değerlendir.",
      "focus": "Kan bağışının sağlık hizmetleri ve toplumsal dayanışma açısından önemini güvenilir kaynaklarla açıkla. Dolaşım sağlığını destekleyen günlük alışkanlıkları ve sağlık iddialarının kaynağını değerlendir.",
      "summary": [
        "Kan; oksijen ve besin taşınması, bazı atıkların ilgili organlara iletilmesi, vücudun savunması ve yaralanmalarda pıhtılaşmaya katkı gibi görevleri olan sıvı dokudur. Kan plazma ve farklı hücre/bileşenlerden oluşur; her bileşenin işi farklıdır. Bu yüzden kanı yalnızca kırmızı renkli bir sıvı olarak düşünmemek gerekir. Dolaşım sistemi sağlığı, vücudun ihtiyaç duyduğu maddelerin taşınmasıyla ilişkilidir. Düzenli hareket, yeterli dinlenme, çeşitli beslenme ve tütün ürünlerinden uzak durma genel sağlığı destekleyen davranışlardır. Bu alışkanlıklar tek başına hastalıkları önleyeceğine dair garanti değildir; bireyin gereksinimi ve sağlık durumu farklı olabilir.",
        "Gönüllü kan bağışı, ihtiyaç duyan hastalara kan veya kan bileşeni sağlanmasına yardımcı olan toplumsal dayanışma davranışıdır. Bağış süreci sağlık personeli tarafından yürütülür; kan uygun testlerden geçirilir, güvenli koşullarda saklanır ve gerektiğinde sağlık kurumlarına ulaştırılır. Fiziksel etkinlik sırasında kasların oksijen ve besin ihtiyacı artar; kalp ve solunum daha hızlı çalışabilir. Dinlenme, uyku ve günlük hareket düzeni birlikte ele alınmalıdır. Uzun süre hareketsiz kalma alışkanlığını azaltmak için günlük rutine uygun hareket araları planlanabilir.",
        "Kitap, kan bağışında kayıt, görüşme, sağlık değerlendirmesi/test ve bağış adımlarını gösterir. Ayrıca Türk Kızılay’ın gönüllü bağışçı çalışmasını örnek verir. Bağış için yaş, sağlık durumu ve aralık gibi koşullar zamanla güncellenebilir; bağış uygunluğu yalnızca yetkili sağlık kurumlarınca belirlenir. Kitap dolaşım sağlığı için bilgi toplama ve rapor hazırlama görevi verir; uyku, su, beslenme, spor ve ekran süresi gibi örnekler sunar. Öneriler genel eğitim bilgisi olarak okunmalıdır. Kişiye özel sağlık sorusunda güncel ve yetkin bir sağlık kaynağı ya da uzman görüşü gerekir.",
        "Kan bağışı hakkında bilgilendirme yaparken kişiyi zorlamadan, doğru ve güncel kaynağa yönlendir. Öğrenciler bilimsel farkındalık mesajı hazırlayabilir; kendi ya da başka bir kişinin bağış yapıp yapamayacağına karar veremez. Toplumsal dayanışma, güvenli sağlık hizmeti ve gönüllülük kavramları birlikte düşünülmelidir. Bir sağlık iddiasını değerlendirirken kaynağı kim hazırlamış, hangi kanıta dayanıyor ve ne zaman güncellenmiş diye sor. Bir belirtiyi doğrudan bir hastalığa bağlama; ders kitabı tanı koyma aracı değildir. Şemada hareket, dinlenme ve beslenmeyi ayrı etkenler olarak göster, sonra aralarındaki ilişkiyi açıkla."
      ],
      "points": [
        "Kan farklı görevleri olan bileşenlerden oluşur.",
        "Gönüllü bağış sağlık hizmetlerine katkı sağlayabilir.",
        "Bağış koşullarını yetkili sağlık kurumları belirler.",
        "Hareket, dinlenme ve dengeli beslenme birlikte düşünülür.",
        "Sağlık iddialarını güvenilir kaynakla kontrol et.",
        "Kişisel sağlık kararları uzmana danışılarak verilir."
      ],
      "terms": [
        "kan bağışı",
        "gönüllülük",
        "toplumsal dayanışma",
        "kan bileşenleri",
        "dolaşım sağlığı",
        "hareket",
        "dinlenme",
        "güvenilir kaynak"
      ],
      "tasks": [
        "Kan bağışının kimlere nasıl yardımcı olabileceğini güvenilir kaynaktan öğren.",
        "Dayanışmayı açıklayan kısa bir mesaj yaz.",
        "Bağış koşullarını yalnızca yetkili kaynaktan kontrol et.",
        "Dolaşım sağlığını destekleyen üç günlük alışkanlık yaz.",
        "Bir sağlık iddiasının kaynağını değerlendirme ölçütü belirle."
      ],
      "quiz": {
        "prompt": "Kan bağışı hakkında güvenli ve doğru yaklaşım hangisidir?",
        "options": [
          "Bağış koşullarını yetkili sağlık kurumlarından öğrenmek",
          "Her öğrencinin bağış için uygun olduğunu varsaymak",
          "İnternetteki her iddiayı doğrulamadan paylaşmak",
          "Bağış kararını yalnızca yaşına bakarak vermek"
        ],
        "answer": 0,
        "explanation": "Bağış uygunluğu ve koşulları yetkili sağlık kurumlarınca değerlendirilir.",
        "hint": "Sağlıkla ilgili uygunluk kararını hangi güvenilir kurumun verebileceğini düşün."
      },
      "activity": {
        "title": "Dayanışma için bilgilendirme kartı",
        "format": "Farkındalık mesajı taslağı",
        "prompt": "Kan bağışının toplumsal dayanışmaya katkısını anlatan kısa ve doğru bir bilgilendirme kartı planla. Bir ana mesaj, bir bilimsel dayanak ve insanların bağış koşullarını nereden öğrenebileceğini yaz.",
        "placeholder": "Ana mesaj… Bilimsel dayanak… Güvenilir bilgi kaynağı…",
        "minChars": 25,
        "criteria": [
          "Dayanışma boyutunu belirt.",
          "Kanla ilgili bilimsel bir işlevi doğru açıkla.",
          "Yetkili bilgi kaynağına yönlendir."
        ],
        "hint": "Kişisel bağış uygunluğu hakkında öneri verme; yetkili kaynağa yönlendir."
      },
      "researchBrief": {
        "label": "PERFORMANS GÖREVİ · ARAŞTIRMA SONUCU",
        "title": "Kan ve organ bağışı: dayanışma ve güvenli süreç",
        "intro": "Basılı s. 112’deki “Gönüllü Bağışçılar İş Başında” performans görevi bağış konusunda farkındalık oluşturmayı amaçlar. Araştırma sonucu, bağışın toplumsal katkısını ve güvenli işleyişini özetler.",
        "items": [
          {
            "name": "Kan bağışı",
            "role": "Gönüllü kan bağışı, ameliyat, kaza veya bazı tedavilerde kana ya da kan bileşenlerine gereksinim duyan kişilere destek olabilir. Bağışlanan kan yetkili sağlık kuruluşlarında kontrol edilir, uygun biçimde işlenir ve saklanır."
          },
          {
            "name": "Uygunluk ve güvenlik",
            "role": "Bağış yapıp yapamayacağına kişinin sağlık durumu ve güncel resmî ölçütler doğrultusunda sağlık personeli karar verir. Kitaptaki yaş/kilo bilgileri güncel başvuru koşulları yerine geçmez; başvuru sırasında yetkili kurumun bilgisi kontrol edilir."
          },
          {
            "name": "Organ bağışı",
            "role": "Organ ve doku bağışı, nakil bekleyen kişilere yaşam veya sağlık desteği sağlayabilir. Uygunluk; tıbbi değerlendirme, kan/doku uyumu ve aciliyet gibi ölçütlerle yetkili ekiplerce belirlenir."
          },
          {
            "name": "Toplumsal sonuç",
            "role": "Bağış, gönüllülük ve güvene dayalı bir dayanışma sürecidir. Doğru bilgi paylaşmak, kişilerin mahremiyetine saygı göstermek ve kararları yetkili sağlık kurumlarına bırakmak gerekir."
          }
        ],
        "takeaway": "Farkındalık çalışmasının temel sonucu: bağış yaşam kurtarabilir; güvenli tarama, güncel resmî bilgi, gönüllülük ve adil tıbbi değerlendirme sürecin vazgeçilmez parçalarıdır.",
        "source": "Kaynak özeti: ders kitabı s. 109–112; kan bağışı adımları, Kızılay bilgilendirmesi ve “Gönüllü Bağışçılar İş Başında” performans görevi."
      },
      "sourceWeeks": [
        26,
        27
      ]
    },
    {
      "id": 13,
      "date": "14–18 Ara",
      "unitId": "systems",
      "topic": "Solunum sisteminin organları ve hava yolu · Soluk alıp verme, diyafram ve gaz alışverişi · Solunum sisteminin sağlığı ve temiz hava",
      "pages": "117–128",
      "visual": "respiration",
      "visualNote": "Görsel ana solunum organlarını gösterir; alveollerde gaz alışverişini alttaki hava yolu şeması ve konu anlatımıyla birlikte incele. Diyaframın akciğerlerin altında bulunduğunu ve hareket ettiğini gözlemle; görsel bir şemadır, nefes alışverişini gerçek zamanlı göstermez. Akciğer görseli organların yapısını gösterir; temiz hava ve havalandırma gibi çevresel etkenler de sistemi etkiler.",
      "focus": "Havanın burundan akciğerlere izlediği yolu ve solunum organlarının temel görevlerini sırala. Diyafram ve göğüs boşluğu hareketlerini soluk alma-verme ile; gazların yönünü alveollerdeki alışverişle ilişkilendir. Temiz hava ve uygun havalandırmanın solunum sağlığına katkısını, gözlem sınırlarını da gözeterek açıkla.",
      "summary": [
        "Solunum sistemi, vücuda oksijen alınmasına ve hücrelerde oluşan karbondioksitin dışarı verilmesine yardım eder. Hava burundan girer; yutak ve gırtlaktan geçerek soluk borusuna ulaşır. Soluk borusu iki bronşa, bronşlar daha ince bronşçuklara ayrılır; bu yollar havayı akciğerdeki alveollere taşır. Soluk alma sırasında diyafram kasılarak aşağı doğru düzleşir; kaburgalar arasındaki kasların hareketiyle göğüs boşluğu genişler. Akciğerlerin hacmi artar ve hava içeri girer. Soluk verme sırasında diyafram gevşer, göğüs boşluğu daralır ve akciğerlerdeki hava dışarı çıkar. Solunum sistemi sağlığı için temiz hava, uygun havalandırma, tütün dumanından kaçınma ve tozlu/kirli ortamları azaltma önemlidir. Havadaki bazı kirleticiler görünmez ve kokusuz olabilir; bu nedenle ortamın güvenliğini yalnızca gözle veya koklayarak kesin belirleyemeyiz.",
        "Burun içindeki kıllar ve mukus, havadaki bazı tozları tutmaya; burun içindeki damarlar havayı ısıtmaya, mukus ise nemlendirmeye yardım eder. Akciğerler göğüs boşluğunda bulunur; diyafram göğüs ve karın boşluklarını ayıran, soluk alıp vermeye katkıda bulunan kastır. Alveollerde oksijen, solunan havadan kılcal damarlardaki kana geçer; karbondioksit kandan alveol havasına geçerek soluk vermeyle vücuttan uzaklaştırılır. Göğüs boşluğunun hacim değişimi havanın giriş-çıkışını sağlar; alveol-kılcal damar geçişi ise gaz alışverişidir. Bunlar bağlantılı ama farklı basamaklardır. Hava kalitesini etkileyen kaynaklar arasında araç trafiği, sanayi, duman ve kapalı alanlarda hava dolaşımının yetersizliği bulunabilir. Pencere açmak her durumda yeterli değildir; dış hava koşulları da dikkate alınır. Şüpheli durumlarda yetişkinlere ve ilgili yetkililere haber verilir.",
        "Kitabın solunum sistemi modelinde burun, yutak, gırtlak, soluk borusu, bronşlar, akciğerler ve diyafram etiketlenir. Bronşçukların uçlarındaki alveoller kılcal damarlarla çevrilidir; gaz alışverişi burada gerçekleşir. Ağaç dallarına benzeyen bronş dallanması, havanın iki akciğere dağılmasını zihinde canlandırabilir. Kitap bu hareketleri akciğer diyagramı, soluk alma/verme şeması ve balonlu maketle inceler. Balonlar akciğerlerin genişleyip daralmasını, alttaki esnek zar diyafram hareketini temsil edebilir. Modelin görevi belirli bir ilişkiyi görünür kılmaktır; gerçek akciğerler balon gibi çalışmaz. Kitap, Elif’in yaşadığı yoğun trafik/fabrika çevresini örnek olay olarak sunar ve çözüm yolları araştırılmasını ister. Ayrıca solunum sağlığını koruma posteri görevi verir. Bu örnekler bireysel alışkanlığın yanında çevre koşullarının da solunum sağlığını etkileyebildiğini gösterir.",
        "Hava yolunu sırayla çiz ve her yapının görevini kısa notla açıkla. Soluk borusuyla yemek borusunu karıştırma: biri havayı akciğerlere, diğeri besini mideye taşır. Maket, organların konum ve bağlantısını gösterir; gerçek dokuların esnekliğini ve gazların mikroskobik hareketini bütünüyle göstermez. Maketin zarını aşağı çekince modeldeki balonların nasıl değiştiğini gözlemle; bu değişimi göğüs boşluğunun hacmiyle ilişkilendir. Model alveollerde oksijen ve karbondioksitin kılcal damarlardan geçişini göstermez. Bilimsel açıklamada hem hava akışını hem gaz alışverişini ayrı ayrı anlat. Kirliliği azaltma önerisini açık bir eylemle yaz: kaynağı azaltma, ortamı uygun biçimde havalandırma, dumandan uzak durma veya temiz hava alanı seçme. Belirtiyi tek başına çevreye bağlayıp tanı koyma; hastalık şüphesi sağlık uzmanının değerlendirmesini gerektirir."
      ],
      "points": [
        "Hava solunum yolları boyunca akciğerlere ilerler.",
        "Gaz alışverişi alveoller ile kılcal damarlar arasında gerçekleşir.",
        "Model gerçek organların yalnızca seçilmiş özelliklerini gösterir.",
        "Diyaframın hareketi göğüs boşluğunun hacmini değiştirir.",
        "Oksijen ve karbondioksit alveollerde zıt yönlerde geçer.",
        "Soluk alıp verme ile gaz alışverişi bağlantılı ama ayrı süreçlerdir.",
        "Temiz hava ve uygun havalandırma önemlidir.",
        "Koku ve görünüş havadaki tüm kirleticileri göstermez."
      ],
      "terms": [
        "soluk borusu",
        "bronş",
        "akciğer",
        "gaz alışverişi",
        "diyafram",
        "soluk alma",
        "soluk verme",
        "oksijen",
        "karbondioksit",
        "solunum sağlığı",
        "havalandırma",
        "temiz hava",
        "zararlı madde"
      ],
      "tasks": [
        "Hava yolunu burundan akciğerlere doğru sırala.",
        "Modelinde her organın görevini bir etiketle göster.",
        "Benzetmenin bir güçlü ve bir sınırlı yönünü yaz.",
        "Soluk alma ve verme sırasında diyaframı karşılaştır.",
        "Gaz alışverişini iki yönlü okla göster."
      ],
      "quiz": {
        "prompt": "Soluk borusu iki ana bronşa ayrıldıktan sonra hava hangi organa doğru ilerler?",
        "options": [
          "Akciğerlere",
          "Mideye",
          "Böbreklere",
          "Kalın bağırsağa"
        ],
        "answer": 0,
        "explanation": "Bronşlar havayı akciğerlere taşır.",
        "hint": "Havanın vücuttaki yolunu sırayla takip et."
      },
      "activity": {
        "title": "Solunum yolu maketi için etiketler",
        "format": "Etiketli model ve görev kartı",
        "prompt": "Solunum sistemi için basit bir model hazırladığını düşün. Burun, yutak, soluk borusu, bronşlar ve akciğerleri sıralı biçimde etiketle; her biri için kısa görev açıklaması yaz.",
        "placeholder": "Burun… Yutak… Soluk borusu… Bronşlar… Akciğerler…",
        "minChars": 30,
        "criteria": [
          "Hava yolunu doğru sırala.",
          "En az dört yapıyı adlandır.",
          "Her yapı için görevi belirt."
        ],
        "hint": "Havanın girişinden gaz alışverişi bölgesine doğru ilerle."
      },
      "researchBrief": {
        "label": "PERFORMANS GÖREVİ · ARAŞTIRMA SONUCU",
        "title": "Solunum sistemini korumak için neler yapılabilir?",
        "intro": "Basılı s. 124’teki performans görevi solunum sağlığını koruma yollarını araştırmayı ister. Sonuçlar, kişisel alışkanlıkları ve çevre koşullarını birlikte ele alır.",
        "items": [
          {
            "name": "Temiz ve dumansız hava",
            "role": "Tütün dumanından uzak durmak ve kapalı alanlarda uygun havalandırma sağlamak solunum yollarını korumaya yardımcı olur. Duman, kişi kullanmasa bile çevresindekileri etkileyebilir."
          },
          {
            "name": "Hava kirliliği",
            "role": "Trafik, sanayi, toz ve duman gibi kaynaklar havadaki kirleticileri artırabilir. Bazı kirleticiler görünmez veya kokusuz olduğundan, havanın güvenliğini yalnızca kokuya bakarak belirlemek doğru değildir."
          },
          {
            "name": "Günlük yaşam",
            "role": "Düzenli hareket, genel sağlık alışkanlıkları ve kirli ortamlara maruziyeti azaltmak solunum sağlığını destekler. Çevre kirliliğini azaltmak için bireysel davranışların yanında toplumsal önlemler de gerekir."
          },
          {
            "name": "Güvenli bilgi",
            "role": "Belirtiyi tek başına hava kirliliğine bağlayıp tanı koyma. Sağlıkla ilgili kişisel kaygı ve öneriler güvenilir yetişkin ve sağlık uzmanıyla değerlendirilmelidir."
          }
        ],
        "takeaway": "Araştırma sonucu: solunum sağlığı için temiz hava, dumansız ortam, uygun havalandırma ve çevresel kirleticilerin azaltılması birlikte ele alınmalıdır.",
        "source": "Kaynak özeti: ders kitabı s. 123–124; “Solunum Sisteminin Sağlığını Koruyalım” performans görevi."
      },
      "sourceWeeks": [
        28,
        29,
        30
      ]
    },
    {
      "id": 14,
      "date": "21–25 Ara",
      "unitId": "systems",
      "topic": "Bağımlılık yapıcı maddelerin vücut sistemlerine etkisi · Boşaltım sistemi: böbrekler ve idrar yolu · Böbreklerde süzülme ve boşaltımın önemi",
      "pages": "123–134",
      "visual": "excretion",
      "visualNote": "Solunum sistemi görseli organları gösterir; zararlı maddelerin etkileri hakkında bilgi verirken kişiyi suçlamadan, güvenilir kaynağa dayan. Bu görsel idrar yoluna odaklanır; deri, akciğer ve karaciğerin boşaltıma katkısı konu anlatımında ayrıca açıklanır. Görseldeki böbrek, üreter ve idrar kesesini sırayla eşleştir; böbrekte süzülme idrarın depolanmasından farklıdır.",
      "focus": "Bağımlılık yapıcı maddelerin sağlığa etkilerini doğru bilgiyle, destekleyici ve yargılamayan bir dille açıkla. Böbrekler, üreterler, idrar kesesi ve üretranın görevlerini idrarın izlediği sırayla açıkla. Böbreklerde kanın süzülmesi ile idrarın taşınması ve depolanması arasındaki farkı açıkla.",
      "summary": [
        "Bağımlılık, bir maddenin veya davranışın kişiye fiziksel, ruhsal ya da sosyal sorunlar yaşatmasına rağmen sürmesi ve bırakma isteğine karşın kontrol edilememesi durumudur. Bu konu yargılayıcı etiketlerle değil, bilimsel bilgi ve destek yollarıyla ele alınmalıdır. Boşaltım, hücrelerde oluşan bazı atıkların ve vücuttaki fazla maddelerin uzaklaştırılmasına yardım eder. Böbrekler kanı süzer, atıkların bir bölümünü ve fazla suyu idrara aktarır. Boşaltım sistemi böbrekler, üreterler, idrar kesesi ve üretradan oluşur; bu yapılar idrarı oluşturma, taşıma, depolama ve dışarı atma görevlerini paylaşır. Böbrekler, kanı süzerek bazı atık maddeleri ve vücuttaki fazla suyu idrara aktarır; yararlı maddelerin bir bölümü yeniden kana dönebilir. Böylece kanın bileşimi ve vücudun iç dengesi korunmaya çalışılır. İdrarın oluşması, taşınması, depolanması ve atılması birbirinden ayrı aşamalardır.",
        "Tütün dumanı ve bağımlılık yapıcı maddeler solunum yollarını etkileyebilir; dolaşım sistemi ve genel sağlık da zarar görebilir. Etkiler kişiden kişiye değişebilir. Bir kişide bağımlılık bulunduğunu öğrenciler belirleyemez; tanı ve destek planı sağlık uzmanlarının işidir. İdrar böbreklerde oluşur, üreter adı verilen borularla idrar kesesine taşınır ve burada geçici olarak depolanır. İdrar kesesi dolduğunda idrar üretradan vücut dışına çıkar. Dolaşım sistemi kanı böbreklere getirir; böylece sistemler birlikte çalışır. Oluşan idrar üreterlerle idrar kesesine gelir; mesane idrarı depolar, üretra dışarı taşır. Bu sırada kan dolaşımı böbreğe madde taşımayı sürdürür. Terleme, soluk verme ve karaciğerin bazı maddeleri dönüştürmesi de kitapta boşaltıma yardımcı süreçlerle ilişkilendirilir.",
        "Kitap Yeşilay’ın bağımlılıkla mücadele ve toplum bilincini artırma çalışmalarını örnek verir. Farkındalık posteri hazırlarken doğrulanmış bilgi, açık destek mesajı ve yardım alınabilecek güvenilir yetişkin/kurum türünü belirtmek, yalnızca korkutucu slogan yazmaktan daha yararlıdır. Kitap, Bora’nın spor sonrası terlemesi ve idrara çıkma ihtiyacını sorgulayan öyküyle konuya başlar. İdrar miktarı yalnızca içilen suya bağlı değildir; terleme, ortam sıcaklığı ve vücudun durumu da sıvı dengesini etkiler. Deri ve akciğer gibi yapılar da boşaltım bağlamında ele alınır. Kitabın s. 132–134 çizimleri böbrekleri, üreterleri, idrar kesesini ve üretrayı etiketler; organ-görev tablosu ise deri, akciğer ve kalın bağırsağın katkısını sorar. Bu örnekler “vücuttan atık uzaklaştırma” kavramının yalnızca tuvalete çıkma ile sınırlı olmadığını gösterir.",
        "Bir mesajda kişiyi suçlama, küçümseme veya özel bilgisini paylaşma. Bilimsel bilgiyi güncel ve yetkili kaynaktan kontrol et; kendin ya da bir yakın için kaygı varsa güvenilir yetişkin ve sağlık uzmanından destek al. Yardım istemek güvenli bir davranıştır. İdrar yolunu böbrek → üreter → idrar kesesi → üretra sırasıyla çiz; kanın böbreğe gelişini ayrı okla göster. Böbrek idrarı süzer/oluşturur, idrar kesesi depolar; bu iki görevi karıştırma. Bir günlük örnek olay, böbreklerin vücuttaki bütün atıkları tek başına attığı anlamına gelmez. Şemada önce kanın böbreğe gelişini, sonra süzülmeyi, idrarın üreter boyunca taşınmasını ve vücuttan çıkışını göster. İdrar kesesi kanı süzmez; böbrek idrarı depolamaz. Bol veya az su içme gibi kişisel tavsiyeler vermek yerine genel süreci açıkla ve sağlık bilgisi için uzman kaynağına yönel."
      ],
      "points": [
        "Bağımlılık fiziksel, ruhsal ve sosyal yaşamı etkileyebilir.",
        "Tütün dumanı solunum ve dolaşım sağlığına zarar verebilir.",
        "Destek aramak yargılanma değil, yardım alma sürecidir.",
        "Böbrekler kanın süzülmesi ve idrar oluşumunda görev alır.",
        "İdrar böbrek → üreter → idrar kesesi yolunu izler.",
        "Üretra idrarın vücuttan çıkış yoludur.",
        "Böbrekler kandaki bazı atıkları süzer.",
        "İdrar oluşumu ile idrarın depolanması farklı işlemlerdir."
      ],
      "terms": [
        "bağımlılık",
        "solunum sağlığı",
        "dolaşım sağlığı",
        "destek",
        "böbrek",
        "üreter",
        "idrar kesesi",
        "üretra",
        "süzülme",
        "idrar",
        "atık madde",
        "iç denge"
      ],
      "tasks": [
        "Bağımlılığın olası etkilerini fiziksel, ruhsal ve sosyal olarak ayır.",
        "Bilimsel bir korunma mesajı tasarla.",
        "Destek için başvurulabilecek güvenilir bir yetişkin/kurum türü belirt.",
        "İdrar yolunu doğru sırada yaz.",
        "Her yapının bir görevini belirt."
      ],
      "quiz": {
        "prompt": "Bağımlılık konusunda farkındalık mesajı hazırlanırken hangi yaklaşım daha uygundur?",
        "options": [
          "Bilimsel bilgi verip kişiyi yargılamadan destek kaynaklarını göstermek",
          "Kişiyi suçlayıp yardım aramasını engellemek",
          "Doğrulanmamış iddiaları kesin gerçek gibi sunmak",
          "Tüm kişilerin aynı deneyimi yaşadığını varsaymak"
        ],
        "answer": 0,
        "explanation": "Bilgilendirme doğru, destekleyici ve yargılamayan bir dil kullanmalıdır.",
        "hint": "Bilgi verirken hem bilimsel doğruluğu hem de kişinin saygınlığını koru."
      },
      "activity": {
        "title": "Destekleyici farkındalık mesajı",
        "format": "Bilgi ağı ve kısa sunum taslağı",
        "prompt": "Solunum ve dolaşım sistemleriyle ilgili bir bilgilendirme posteri için üç ana kavram ve kısa bir destek mesajı yaz. Kişileri etiketlemeden, doğrulanabilir bir bilimsel bilgi ve yardım arama yolu ekle.",
        "placeholder": "Kavramlar… Bilimsel bilgi… Destek mesajı… Yardım yolu…",
        "minChars": 30,
        "criteria": [
          "İki vücut sistemiyle bağlantı kur.",
          "Yargılamayan bir dil kullan.",
          "Güvenilir destek yolunu belirt."
        ],
        "hint": "Posterin amacı korkutmak değil, doğru bilgi ve destek seçeneklerini göstermektir."
      },
      "researchBrief": {
        "label": "PERFORMANS GÖREVİ · ARAŞTIRMA SONUCU",
        "title": "Solunum sağlığı için farkındalık: güvenilir ve destekleyici bilgi",
        "intro": "Basılı s. 127’deki performans görevi solunum sisteminin sağlığını koruma konusunda farkındalık oluşturmayı ister. Bu araştırma sonucu, bağımlılık ve dumansız yaşam başlıklarını bilgi temelli biçimde ele alır.",
        "items": [
          {
            "name": "Bağımlılık nedir?",
            "role": "Bir madde ya da davranışı, zararlarına rağmen sürdürmek ve bırakmakta zorlanmak bağımlılıkla ilişkili olabilir. Değerlendirme ve destek, sağlık uzmanlarının alanıdır; öğrenciler kişilere tanı koymaz."
          },
          {
            "name": "Solunum üzerindeki etkiler",
            "role": "Tütün dumanı solunum yollarını etkileyebilir; pasif maruziyet de çevredeki kişileri etkiler. Bağımlılık yapıcı maddelerin etkileri yalnızca akciğerlerle sınırlı kalmayıp başka vücut sistemlerini de ilgilendirebilir."
          },
          {
            "name": "Farkındalık ve destek",
            "role": "Farkındalık çalışması doğru bilgiyi, dumansız ortamları ve yardım alınabilecek güvenilir yetişkin/kurumları tanıtır. Yeşilay, kitapta bağımlılıkla mücadele ve bilgilendirme örneği olarak verilir."
          },
          {
            "name": "İletişim ilkesi",
            "role": "Kişiyi suçlayan veya damgalayan dil yardım istemeyi zorlaştırabilir. Saygılı, kanıta dayalı ve destekleyici iletişim hem bilgiyi anlaşılır kılar hem de mahremiyeti korur."
          }
        ],
        "takeaway": "Araştırma sonucu: etkili farkındalık, korkutucu ya da yargılayıcı sloganlar yerine doğrulanmış bilgi, dumansız ortam ve güvenilir destek yollarını birlikte sunar.",
        "source": "Kaynak özeti: ders kitabı s. 125–127; bağımlılık bilgisi, Yeşilay ve “Solunum Sisteminin Sağlığı İçin Neler Yapabiliriz?” performans görevi."
      },
      "sourceWeeks": [
        31,
        32,
        33
      ]
    },
    {
      "id": 15,
      "date": "28–31 Ara",
      "unitId": "systems",
      "topic": "Boşaltım sisteminin sağlığını koruma · Vücudumuzdaki sistemlerin birlikte çalışması · Vücudumuzdaki sistemler: bilim insanları ve sentez · Yıl sonu: sistemler, modeller ve öz değerlendirme",
      "pages": "89–148",
      "visual": "systemsReview",
      "visualNote": "Böbrek ve idrar yolu şeması yapıyı gösterir; sağlık önerileri kişiye göre değiştiği için uzmana danışılmalıdır. Dört görsel ayrı sistemleri gösterir; besin, oksijen ve atıkların sistemler arasında nasıl taşındığını kendi şemanda birleştir. Sistem görsellerini incelerken modellerin bilim insanlarının gözlem ve araştırmalarıyla gelişen açıklamaları temsil ettiğini hatırla. Dört sistem görselini karşılaştır; öğrendiklerini uzay ve enerji ünitelerindeki model-kavram ilişkileriyle birlikte değerlendir.",
      "focus": "Boşaltım sağlığını destekleyen genel alışkanlıkları kişisel farklılık ve güvenilir kaynaklarla birlikte değerlendir. Sindirim, dolaşım, solunum ve boşaltım sistemlerinin madde alışverişi üzerinden ilişkisini açıkla. Kitaptaki bilim insanı örneklerini tarihsel bağlam, araştırma yöntemi ve kanıt üzerinden değerlendir. Üç üniteden öğrendiklerini model, kanıt ve öz değerlendirme yoluyla bir araya getir.",
      "summary": [
        "Boşaltım sisteminin sağlığını desteklemek için genel hijyen, dengeli beslenme, hareket ve vücudun gereksinimlerine uygun sıvı alımı önemlidir. Sıvı gereksinimi yaş, etkinlik, hava sıcaklığı ve sağlık durumuna göre değişebilir; herkes için geçerli tek bir miktar önerisi vermek doğru değildir. Vücut sistemleri birlikte çalışır. Sindirim sistemi besinleri yapı taşlarına ayırıp kana geçmesine yardım eder; solunum sistemi oksijeni kana kazandırır ve karbondioksitin atılmasını sağlar; dolaşım sistemi maddeleri hücrelere ve ilgili organlara taşır; boşaltım sistemi bazı atıkları uzaklaştırır. Vücut yapılarıyla ilgili bilimsel açıklamalar gözlem, inceleme, çizim, model ve kanıt birikimiyle gelişmiştir. Kitaptaki “İz Bırakanlar” sayfaları, farklı dönemlerde yaşayan bilim insanlarının anatomi, dolaşım, cerrahi ve tıp alanlarındaki katkılarını örnekler. Yıl boyunca uzay, kuvvet-enerji ve vücudumuzdaki sistemler konularını farklı içeriklerle öğrendin; ortak bilimsel beceriler ise gözlem yapmak, kavramı tanımlamak, kanıtı açıklamak ve model kurmaktır. Bir kavramı ezberden söylemek yerine yeni bir örnekte kullanmak öğrenmeyi güçlendirir.",
        "Böbreklerin işi kanı süzmek ve iç dengenin korunmasına yardım etmektir. Gereksiz ilaç kullanımı, aşırı tuz tüketimi veya kişisel hijyene dikkat etmemek sağlık riskleri oluşturabilir. Her durumda doğru değerlendirme, kişiye özgü bilgiyi sağlık uzmanıyla konuşmayı gerektirir. Örneğin kas hücresi çalışırken besin ve oksijen kullanır. Bu maddeler sindirim ve solunum sistemlerinde alınır, dolaşım sistemiyle hücreye taşınır. Hücrelerde oluşan karbondioksit kanla akciğerlere, bazı atıklar böbreklere taşınır. Bu iş birliği, her sistemin ayrı görevi olduğu hâlde diğerlerine bağlı olduğunu gösterir. Bir tarihsel çalışmayı incelerken araştırmacının hangi soruyu ele aldığını, hangi gözlem veya araçtan yararlandığını ve hangi açıklamayı geliştirdiğini sor. Bilimsel bilgi yeni kanıtlar ve yöntemlerle ayrıntılanabilir; günümüzdeki model ile geçmişteki çizim aynı teknolojiyle hazırlanmış olmayabilir. Bir bilimsel açıklama; hangi soruya yanıt verdiğini, hangi kanıta dayandığını ve süreçte nelerin değiştiğini açıklar. Model, karmaşık gerçekliği sadeleştirerek anlaşılır kılar; modelin sınırlılıklarını da belirtmek gerekir. Gözlem, çıkarım ve sonuç birbiriyle ilişkili ama farklı düşünme adımlarıdır.",
        "Kitap örnek olay, araştırma raporu ve doğru-yanlış sorularıyla alışkanlıkları sorgulatır; ekran başında uzun süre kalma, hareket ve su tüketimi gibi konuları ele alır. Bu sayfalar genel eğitim amaçlıdır; kişiye özel teşhis, ilaç veya sıvı miktarı belirlemez. Kitabın ünite sonu soruları sindirim organlarını, kan dolaşımını, solunum sağlığını, böbrekleri, organ bağışını ve bağımlılık konusunu birlikte değerlendirir. Sistemler arası ilişkiyi bir kavram haritasında göstermek, tek tek organ adlarını ezberlemekten daha açıklayıcıdır. Kitapta İbnü’n Nefîs’in küçük kan dolaşımına ilişkin açıklaması; Zehrâvî ve Sabuncuoğlu Şerefeddin’in cerrahi çalışmaları; İbn Sina ve Malpighi gibi kişilerin tıp tarihindeki katkıları yer alır. Bu örnekler, bilginin farklı kültür ve dönemlerdeki araştırmacılarla birikerek geliştiğini gösterir. Kitabın son sayfaları sindirim, dolaşım, solunum ve boşaltım sistemlerini test soruları, şemalar, günlük yaşam örnekleri ve bulmacalarla tekrar ettirir. Sözlük, kaynakça ve haritalar başvuru amacıyla eklenmiştir. Kendi çalışma portföyünde uzay teknolojisi, enerji dönüşümü ve sistemler arası madde akışı için birer kanıtlı örnek seçebilirsin.",
        "Bir çevrim içi öneriyi paylaşmadan önce kaynağın yetkinliğini, kanıtını ve güncelliğini kontrol et. Bir belirti varsa kendi kendine tanı koyma veya başkasına tedavi önerme; güvenilir bir yetişkin ve sağlık uzmanına danış. Sağlık iletişiminde doğru bilgi kadar kişinin mahremiyetini ve saygınlığını korumak da önemlidir. Dört sistemi tek çizimde gösterirken besin, oksijen, karbondioksit ve atık maddeleri ayrı renkli oklarla belirt. Okların yönünü doğru kur; sindirimden gelen yapı taşı kana geçer, kan onu hücreye taşır. Şema gerçek vücuttaki bütün damar ve kimyasal tepkimeleri çizmez; yalnızca temel madde akışını sadeleştirir. Bir biyografi özeti yazarken kanıtlanmamış alıntı veya abartılı “ilk kişi” iddiası ekleme. Kişinin katkısını bir güvenilir kaynakla doğrula, yaşadığı dönemi belirt ve kendi çalışmasının sonraki bilgiyle ilişkisini açıkla. Portre bir bilimsel kanıt değil, kişiyi tanıtan görseldir; bilimsel katkı metindeki yöntem ve kaynakla değerlendirilir. Öz değerlendirmede yalnızca doğru cevaba değil, hangi kavramı daha iyi açıklayabildiğine, hangi modelinin işe yaradığına ve neyi yeniden araştırman gerektiğine bak. Bir şema hazırlarken okların anlamını ve görselin temsilî olduğunu açıkla. Güvenilir kaynak kullandıysan adını yaz; öğrendiğin bilgiyi yeni bir örneğe aktar."
      ],
      "points": [
        "Hijyen ve genel sağlıklı alışkanlıklar önemlidir.",
        "Su gereksinimi kişiye ve koşullara göre değişebilir.",
        "Sağlık önerilerini güvenilir kaynakla doğrula.",
        "Dolaşım maddelerin hücrelere taşınmasına yardım eder.",
        "Solunum oksijen-karbondioksit alışverişine katkı verir.",
        "Boşaltım bazı atıkların uzaklaştırılmasını sağlar.",
        "Bilimsel bilgi yeni kanıtlarla gelişebilir.",
        "Araştırmacının yöntemi ve dönemi önemlidir."
      ],
      "terms": [
        "böbrek sağlığı",
        "hijyen",
        "dengeli beslenme",
        "sağlık kaynağı",
        "sistem",
        "madde alışverişi",
        "hücre",
        "atık madde",
        "bilim tarihi",
        "kanıt",
        "gözlem",
        "bilimsel model",
        "model",
        "açıklama",
        "öz değerlendirme"
      ],
      "tasks": [
        "Boşaltım sağlığını destekleyen iki genel alışkanlık yaz.",
        "Bir sağlık önerisini değerlendirmek için kaynak kontrol listesi oluştur.",
        "Kişiye özel soruda hangi uzmana danışılacağını belirt.",
        "Besin, oksijen ve atıkların izlediği yolları farklı oklarla göster.",
        "Dört sistemi bir örnek olayda ilişkilendir."
      ],
      "quiz": {
        "prompt": "Böbrek sağlığıyla ilgili bir öneriyi değerlendirirken hangi yaklaşım daha güvenlidir?",
        "options": [
          "Güvenilir sağlık kaynağına başvurup kişisel gereksinimlerin değişebileceğini kabul etmek",
          "Herkes için aynı su miktarını kesin kural saymak",
          "İnternetteki ilk paylaşımı tıbbi öneri kabul etmek",
          "Belirtiye bakarak kendi kendine tanı koymak"
        ],
        "answer": 0,
        "explanation": "Sağlık gereksinimleri değişebilir; güvenilir kaynak ve uzman görüşü önemlidir.",
        "hint": "Genel sınıf bilgisi ile kişiye özel sağlık önerisini ayır."
      },
      "activity": {
        "title": "Sağlık bilgisini doğrulama kartı",
        "format": "Kaynak güvenilirliği kontrolü",
        "prompt": "Boşaltım sağlığı hakkında çevrim içi bir öneri gördüğünü düşün. Paylaşmadan önce kontrol edeceğin üç ölçütü ve kişiye özel soru olduğunda başvurulacak güvenilir yardım yolunu yaz.",
        "placeholder": "Ölçüt 1… Ölçüt 2… Ölçüt 3… Yardım yolu…",
        "minChars": 25,
        "criteria": [
          "Üç kaynak kontrolü ölçütü belirt.",
          "Genel ve kişiye özel bilgiyi ayır.",
          "Güvenilir yardım yolunu ekle."
        ],
        "hint": "Kaynağın uzmanlığı, güncelliği ve iddianın kanıtı kontrol edilebilir."
      },
      "researchBrief": {
        "label": "PERFORMANS GÖREVİ · ARAŞTIRMA SONUCU",
        "title": "Boşaltım sisteminin sağlığını nasıl destekleriz?",
        "intro": "Basılı s. 136’daki “Boşaltım Sisteminin Sağlığını Koruyalım” performans görevi güvenilir kaynaklardan bilgi toplamayı ve raporlaştırmayı ister. Kitabın s. 137–138’deki açıklamalarıyla birlikte temel bulgular şöyledir:",
        "items": [
          {
            "name": "Sıvı dengesi",
            "role": "Sıvı gereksinimi yaşa, hareket düzeyine, hava sıcaklığına ve sağlık durumuna göre değişebilir. Uygun sıvı alımı vücudun dengesini destekler; gereğinden çok su içmek gerekmez ve herkese aynı miktar önerilemez."
          },
          {
            "name": "Beslenme ve hareket",
            "role": "Dengeli beslenme, aşırı tuz tüketiminden kaçınma, düzenli hareket ve uzun süre hareketsiz kalmaya ara verme genel sağlığı destekler. Bunlar tek başına bir böbrek rahatsızlığını önleme veya tedavi garantisi değildir."
          },
          {
            "name": "Hijyen ve güvenli ilaç kullanımı",
            "role": "Kişisel hijyene dikkat etmek ve gereksiz ilaç kullanmamak güvenli alışkanlıklardır. İlaçlar yalnızca güvenilir yetişkin ve sağlık uzmanı yönlendirmesiyle kullanılmalı; çevrim içi tavsiyeler kişiye özel tedavi yerine geçmemelidir."
          },
          {
            "name": "Kaynağı doğrulama ve destek",
            "role": "Raporunda bilginin kaynağını, uzmanlığını ve güncelliğini kontrol et; farklı güvenilir kaynakları karşılaştır. Kişisel bir sağlık sorusunda kendi kendine tanı koymak yerine güvenilir bir yetişkin ve sağlık uzmanına danış."
          }
        ],
        "takeaway": "Araştırma sonucu: boşaltım sistemi sağlığı tek bir yiyecek ya da su miktarına bağlanmaz; dengeli yaşam, kişiye uygun sıvı dengesi, hareket, hijyen ve güvenilir sağlık desteği birlikte düşünülür.",
        "source": "Kaynak özeti: ders kitabı s. 136–138; “Boşaltım Sisteminin Sağlığını Koruyalım” performans görevi."
      },
      "sourceWeeks": [
        34,
        35,
        36,
        37
      ]
    }
  ];

  window.SCIENCE_CONTENT = { units, weeks };
})();
