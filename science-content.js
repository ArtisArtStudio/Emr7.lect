/*
 * 7. sınıf Fen Bilimleri için özgün haftalık konu akışı.
 *
 * Metinler; ünite kazanımları ile ders kitabındaki bilgi kutusu türlerinin (Haber, Bağlantı
 * Noktası, Keşif Noktası, Kontrol Noktası etkinliği, Bilgi Bankası, Tarihe Not Düşenler,
 * Performans Görevi) tema tema incelenmesinden yararlanılarak yazılmıştır. Anlatımda kitaba
 * atıf yapılmaz, sayfa numarası verilmez; tanımlar, tarihsel örnekler, bilim insanlarının
 * yaşamları ve kavramlar doğrudan konunun akışı içinde verilir.
 *
 * Çalışma takvimi: 2026–2027 döneminde Fen Bilimleri haftada 4 ders saati görülür.
 * Ders 14–18 Eylül'de başlar, 28–31 Aralık haftasında sona erer (15 ders haftası).
 * Her hafta 4–6 anlatım bloğu, hatırlanacak maddeler, kavram şeridi, görevler ve bir quiz içerir.
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
      "visualNote": "Görsel, Dünya çevresindeki yörüngesinde görev yapan bir gözlem uydusunu gösterir: güneş panelleri elektrik üretir, gövdeye bağlı algılayıcı yeryüzüne bakar ve topladığı veriyi yer istasyonuna iletir.",
      "focus": "Bir uzay araştırmasının merak sorusundan gözleme, ölçüme ve kanıta nasıl ilerlediğini; Türkiye'nin uydu görevlerini haberleşme ve Dünya gözlemi ayrımıyla açıklar.",
      "summary": [
        "**Uzay**, Dünya atmosferinin dışında kalan ve gök cisimlerinin bulunduğu ortamdır. **Evren** ise uzayı, içindeki bütün gök cisimlerini, gaz-toz bulutlarını ve galaksileri kapsayan bütünü ifade eder; bu yüzden uzay evrenin yalnızca bir parçasıdır. Gök cisimleri arasındaki uzaklıklar günlük ölçülerle anlatılamayacak kadar büyük olduğu için astronomide **ışık yılı** gibi birimler kullanılır. **Yapay uydu**, Dünya'nın ya da başka bir gök cisminin çevresinde belirli bir **yörünge** üzerinde görev yapmak üzere insanlar tarafından üretilip uzaya gönderilen araçtır. Ay gibi doğal cisimler uydu değil, doğal uydudur; iki kavram karıştırılmamalıdır. Uyduların çoğu güneş panelleriyle elektrik üretir, komutlarını yer istasyonlarından alır ve topladığı veriyi yine bu istasyonlara iletir. **Gözlem**, bir olayın duyu organları ya da ölçüm aletleriyle doğrudan kaydedilmesidir; **veri**, bu kayıtların sayı, görüntü veya ölçüm biçimindeki hâlidir. **Kanıt** ise bir açıklamayı desteklemek için kullanılan veridir. Gözlem ile çıkarım arasındaki ayrım burada başlar: görüntüde kıyı çizgisinin yer değiştirmesi gözlem, bunun erozyondan kaynaklandığı düşüncesi çıkarımdır.",
        "Bilimsel bir uzay araştırması merak sorusuyla başlar: “Bu bölgede bitki örtüsü son beş yılda değişti mi?” sorusu, hangi verinin, hangi aralıkla ve hangi araçla toplanacağını belirler. Araştırmacı uygun aracı seçer, ölçümleri kaydeder, aynı ölçümü farklı tarihlerde yineler ve sonuçları karşılaştırır. Karşılaştırmada bulutluluk, mevsim ve gölge gibi etkenlerin görüntüyü değiştirebileceği hesaba katılır; bu yüzden tek görüntü yerine düzenli aralıklarla alınan görüntü dizisi kullanılır. Yeni kanıt önceki açıklamayı destekliyorsa açıklama güçlenir, çelişiyorsa değiştirilir. Uyduların görevleri de bu sorulara göre ayrılır: **haberleşme** uyduları televizyon, telefon ve internet sinyallerini alıp güçlendirerek yeniden iletir; **gözlem uydusu** ise yüzeyden görüntü ve ölçüm toplayarak tarım, orman, kuraklık ve afet izlemeye veri sağlar. Bir uydunun alçak ya da yüksek yörüngede bulunması, hedef bölgenin ne sıklıkla ve hangi çözünürlükle görüntüleneceğini belirler.",
        "Türkiye'nin uzay çalışmaları bu iki görev türünü açıkça ayırır. **Türksat 6A**, 8 Temmuz 2024'te fırlatılan yerli ve millî haberleşme uydusudur ve yayın ile internet trafiğini geniş bir coğrafyaya taşır. **Göktürk-2** (2012) ve **Göktürk-1** (2016) yüksek çözünürlüklü görüntü sağlayan Dünya gözlem uydularıdır. **İMECE**, 15 Nisan 2023'te yörüngeye yerleşen ve metre altı çözünürlükte görüntü alabilen gözlem uydusudur; afet sonrası hasar tespiti, tarım alanlarının izlenmesi ve haritalama çalışmalarında kullanılır. **Rasat** (2011) ve **Bilsat** (2003) daha önceki gözlem uydularıdır. Bu veriler yalnızca fotoğraf üretmez: bir orman yangınının sınırı, bir baraj gölündeki seviye değişimi ya da bir kentin büyümesi, aynı bölgenin farklı tarihlerdeki görüntüleri karşılaştırılarak izlenir. Uydu sinyalleri hava araçlarının konum bulmasına, gemi ve kamyon takibine, navigasyon uygulamalarına da temel sağlar; bu nedenle bir haberleşme uydusundaki kesinti günlük yaşamda fark edilmeyen birçok hizmeti etkileyebilir.",
        "Uzay çağı, 4 Ekim 1957'de Sputnik 1 adlı ilk yapay uydunun yörüngeye yerleştirilmesiyle başladı. 12 Nisan 1961'de **Yuri Gagarin** Vostok 1 aracıyla uzaya çıkan ilk insan oldu; 20 Temmuz 1969'da Apollo 11 göreviyle insanlar Ay'a ayak bastı. Türkiye'nin astronomi tarihinde **Nüzhet Gökdoğan** önemli bir yer tutar: İstanbul Üniversitesi Gözlemevi'nin kuruluşunda çalışmış, astronomi ve matematik dersleri vermiş, bu alanda akademik kadroya giren ilk Türk kadınlarından biri olmuştur. Ocak 2024'te **Alper Gezeravcı**, Axiom-3 göreviyle Uluslararası Uzay İstasyonu'na giderek Türkiye'nin ilk astronotu oldu ve istasyonda 13 bilimsel deney gerçekleştirdi. Bu örnekler, uzay araştırmalarının yalnızca teknik değil, merak ve uluslararası iş birliğiyle ilerleyen bir süreç olduğunu gösterir."
      ],
      "blockLabels": [
        "UZAY, EVREN VE UYDU",
        "ARAŞTIRMA SÜRECİ",
        "TÜRKİYE’NİN UZAY ÇALIŞMALARI",
        "BİLİM İNSANLARI VE TARİH"
      ],
      "points": [
        "Uzay, evrenin yalnızca bir parçasıdır; gök cisimleri arası uzaklıklar ışık yılıyla ifade edilir.",
        "Uydu, yörüngesinde görev yapar; haberleşme ve gözlem uydularının amaçları farklıdır.",
        "Araştırma sorusu, toplanacak veriyi ve seçilecek aracı belirler.",
        "Gözlem doğrudan kaydedilen özellik, çıkarım ise bu özelliğe getirilen açıklamadır.",
        "Türksat haberleşme, Göktürk ve İMECE Dünya gözlemi görevini temsil eder."
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
        "Uzay konusunda bildiklerini ve merak ettiklerini iki ayrı listeye ayır.",
        "Bir uydu veya teleskop görüntüsünde gözlemleyebileceğin iki özelliği yaz.",
        "Bir gözlem cümlesi ile ona ait olası bir çıkarımı ayrı ayrı kur.",
        "Türkiye'nin uzay çalışmalarını haberleşme ve görev türlerine göre sınıflandır.",
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
      "visualNote": "Görsel, aynı görevin farklı araçlarını yan yana getirir: roket yükü taşır, sonda uzaktaki bir cismi inceler, uydu yörüngede çalışır, istasyon astronotlara yaşam ve deney ortamı sağlar, teleskop ise ışık toplar.",
      "focus": "Roket, uydu, sonda, mekik, istasyon ve teleskopu görevlerine göre ayırt eder; teleskop türlerini ve gözlem yerinin niteliklerini açıklar.",
      "summary": [
        "Uzay araştırmalarında kullanılan araçlar, yaptıkları işe göre birbirinden ayrılır. **Roket** bir taşıma sistemidir; uzay aracını ve yükünü yerden yörüngeye ya da daha uzağa götürür, yakıt ile oksijen karışımını yakarak itme kuvveti üretir. **Uzay sondası** uzaktaki bir gök cismine ya da uzay olayına gönderilen, çoğunlukla güneş panelleriyle çalışan robotik araçtır; yüzeye yaklaşır, ölçüm yapar, görüntü gönderir ve gerektiğinde örnek toplar. **Yapay uydu** yörüngede kalır, **uzay istasyonu** astronotların aylarca yaşayıp deney yapabildiği yörünge laboratuvarıdır. **Uzay mekiği** kanatlı, yeniden kullanılabilen ve insanla birlikte yük taşıyabilen bir araçtır. **Teleskop** ise gök cisimlerinden gelen ışığı toplayıp odaklayarak görüntü oluşturur; uzay teleskobu atmosferin dışında, yer teleskobu ise yeryüzünde çalışır. Bir görev çoğu zaman birden çok aracı birlikte kullanır: roket teleskobu yörüngeye taşır, uydu topladığı veriyi yer istasyonuna iletir, sonda bir gezegenin yörüngesine girip yüzeye iniş aracı bırakabilir.",
        "Teleskopun ayırt edici özelliği, açıklığının (ana aynasının ya da merceğinin) büyüklüğüdür; açıklık büyüdükçe daha sönük ve daha ayrıntılı görüntü elde edilir. Yer teleskopları için en büyük engel atmosferdir: hava katmanları yıldız ışığını kırar ve titretir, su buharı kızılötesi ışığın bir bölümünü yutar. Bu nedenle gözlemevleri yüksek, kuru, bulutsuz, ışık kirliliğinin az olduğu ve kent ışıklarından uzak yerlere kurulur; atmosferin üstündeki uzay teleskopları ise bu engellerden kurtulur. **Hubble** uzay teleskobu 1990'da yörüngeye yerleştirildi ve görünür ışıkta bugüne kadar çok sayıda derin uzay görüntüsü üretti. **James Webb** uzay teleskobu 2021'de fırlatıldı, kızılötesi ışıkla çalışır ve Güneş ile Dünya'dan yaklaşık 1,5 milyon kilometre uzakta, gölge sağlayan bir noktada durur. Türkiye'de **TUG** (TÜBİTAK Ulusal Gözlemevi) Antalya Saklıkent'teki Bakırlıtepe'de, **DAG** (Doğu Anadolu Gözlemevi) ise Erzurum'da yüksek ve kuru bir konumda kurulmuştur; ikisi de atmosferin gözleme etkisini azaltmak için seçilmiş yerlerdir.",
        "Teleskopların çoğu gözle görülen ışığı toplar; ancak gök cisimleri radyo dalgalarından gama ışınlarına kadar geniş bir aralıkta ışıma yapar. Radyo teleskoplar çanak antenlerle bu dalgaları toplar, kızılötesi teleskoplar soğuk gaz ve toz bulutlarını, X-ışını teleskopları çok sıcak ortamları inceler. Aynı gök cismi farklı dalga boylarında farklı görünür: tozun içine gömülü genç yıldızlar görünür ışıkta görünmezken kızılötesinde belirginleşir. Gözlem yerinin nitelikleri de sonucu değiştirir: bulutsuz ve sakin hava daha keskin görüntü, karanlık gökyüzü daha sönük cisimlerin görülmesi anlamına gelir. Teleskop görüntüsü doğrudan gözlem değildir; sensörlerin kaydettiği ışık, işlenerek renklendirilir ve bilimsel olarak yorumlanır. Bu nedenle bir gök ada fotoğrafındaki renklerin bir bölümü, insan gözünün göremeyeceği dalga boylarının temsili olabilir.",
        "Teleskopun tarihi, gökyüzüne bakışı değiştiren bir dizi buluşla ilerledi. 1608'de Hollanda'da yapılan ilk teleskobu 1609'da **Galileo Galilei** geliştirerek Ay'ın kraterlerini, Jüpiter'in dört uydusunu ve Venüs'ün evrelerini gözledi; bu gözlemler gök cisimlerinin kusursuz ve değişmez olduğu görüşünü sarstı. 1668'de **Isaac Newton** ayna kullanan yansıtmalı teleskobu yaptı; bugünkü büyük teleskopların çoğu bu ilkeyle çalışır. 20. yüzyılda **Edwin Hubble**, büyük teleskoplarla yaptığı ölçümlerde başka galaksilerin varlığını ve evrenin genişlediğini gösterdi; onun adı bugün yörüngedeki teleskoba verilmiştir. Türkiye'de gözlemevi geleneği Cumhuriyet döneminde başladı; İstanbul Üniversitesi Gözlemevi'nin kuruluşunda çalışan **Nüzhet Gökdoğan** gibi bilim insanları, gökyüzü gözlemlerinin üniversite düzeyinde kurumsallaşmasına öncülük etti. Bugün amatör astronomlar da küçük teleskoplarla değişen yıldızları ve Güneş lekelerini izleyerek bilime katkı sağlayabilir."
      ],
      "blockLabels": [
        "UZAY ARAÇLARI",
        "TELESKOPLAR VE GÖZLEM YERLERİ",
        "FARKLI DALGA BOYLARI",
        "BİLİM İNSANLARI VE TARİH"
      ],
      "points": [
        "Roket taşır, sonda uzaktan inceler, uydu yörüngede çalışır, istasyon araştırma ortamı sağlar.",
        "Uzay mekiği insan ve yük taşıyabilen, yeniden kullanılabilen bir araçtır.",
        "Teleskopun gücü açıklığına bağlıdır; atmosfer görüntü kalitesini düşürür.",
        "Uzay teleskopları atmosferin soğurma ve titretme etkisinden kurtulur.",
        "Gözlemevleri yüksek, kuru, karanlık ve bulutsuz yerlere kurulur."
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
      "visualNote": "Görsel, alçak yörüngede biriken işlevini yitirmiş uydu gövdelerini ve roket parçalarını, aralarından geçen çalışan bir uyduyla birlikte gösterir; yoğunluk arttıkça çarpışma riski de artar.",
      "focus": "Uzay teknolojilerinin günlük yaşama aktarımını örneklerle açıklar; uzay kirliliğinin oluşumunu, çarpışma riskini ve önleme yollarını değerlendirir.",
      "summary": [
        "Uzay araştırmaları sırasında geliştirilen birçok teknoloji, zamanla günlük yaşamın parçası olur; bu sürece **teknoloji aktarımı** denir. Uyduların yeryüzünü görüntülemesi için geliştirilen algılayıcılar, hastanelerdeki **görüntüleme** cihazlarının temelini oluşturur: MR/tomografi/ultrason cihazları dokudan gelen sinyalleri işleyerek görüntü üretir. Konum belirleme sistemleri (GPS) uydu sinyalleriyle çalışır ve iletişim, navigasyon, harita, kargo takibi, tarım makinesi yönlendirmesi gibi hizmetleri mümkün kılar. Uzay araçlarında elektrik üretmek için geliştirilen güneş panelleri, çatılardaki sistemlerin verimliliğini artırdı. Isı yalıtımı, su filtreleme, hafızalı köpük, çizilmeye dayanıklı mercek kaplamaları ve dondurularak kurutulmuş gıda da uzay çalışmalarından aktarılan örnekler arasındadır. **Uydu verisi** bu aktarımın en geniş alanıdır: hava tahmini, kuraklık izleme, deniz yüzeyi sıcaklığı, şehir planlaması ve afet yönetimi aynı görüntü arşivinden yararlanır.",
        "Uydular yörüngede kaldıkları sürece birer hizmet aracıdır; görevleri bittiğinde ise yeni bir sorunun parçası olabilir. Yakıtı biten uydular, ayrılan roket aşamaları ve çarpışmalarda kopan parçalar yörüngede birikerek **uzay kirliliği** oluşturur. Alçak yörüngede cisimler saniyede yaklaşık 7-8 kilometre hızla hareket eder; bu hızda birkaç milimetrelik bir parça bile güneş paneline ya da gövdeye ciddi zarar verebilir. **Çarpışma riski** yalnızca çarpışmanın kendisinden değil, çarpışma sonrası ortaya çıkan binlerce yeni parçadan kaynaklanır: her çarpışma yeni enkaz üretir ve zincirleme bir artış başlatabilir. 2009'da kullanım dışı bir Rus uydusu ile çalışan bir Amerikan haberleşme uydusu çarpıştı ve binlerce izlenebilir parça oluştu; bu olay sorunun gerçekliğini gösteren en bilinen örnektir. Bugün 10 santimetreden büyük on binlerce cisim düzenli izlenmekte, daha küçük milyonlarca parça ise yalnızca istatistiksel olarak tahmin edilmektedir.",
        "Uzay kirliliğini azaltmanın en etkili yolu, yeni enkaz üretmemektir. Bunun için uyduların görev bitiminde yakıtının bir bölümünü yörüngeden çıkmaya ayırması, alçak yörüngedeki araçların 25 yıl içinde atmosfere girip yanmasını sağlayacak biçimde tasarlanması, yüksek yörüngedeki araçların ise kullanılmayan bir “mezarlık yörüngeye” taşınması gerekir. Batarya ve yakıt tanklarının boşaltılması, patlamaları önlediği için ayrıca önemlidir. Bu önlemlerin tümü **görev sonu planı** başlığı altında toplanır ve fırlatmadan önce tasarıma eklenir. Mevcut enkaz için ise onu izleme, yörünge değiştirmesini sağlayacak temaslar kurma ve büyük parçaları güvenli biçimde yakalayıp atmosfere yönlendirme yöntemleri geliştirilmektedir. Tek bir temizleme görevi pahalıdır; bu nedenle uluslararası iş birliği ve ortak standartlar zorunlu hâle gelir. Bir sorunun çözümü aranırken altı şapkalı düşünme gibi yöntemler, konuyu olgular, duygular, riskler, yararlar, yaratıcı fikirler ve süreç açısından ayrı ayrı ele almayı kolaylaştırır.",
        "Uzay kirliliği kavramını bilim dünyasına kazandıran kişi **Donald Kessler**'dir; 1978'de yayımladığı çalışmada, belirli bir yoğunluğa ulaşıldığında çarpışmaların kendi kendini besleyerek zincirleme bir enkaz artışına yol açabileceğini öngördü. Bu öngörü bugün “Kessler sendromu” olarak anılır. Uzay teknolojilerinin gündelik yaşama aktarımı ise farklı bir tarihsel çizgide ilerledi: 1960'larda haberleşme uyduları kıtalar arası telefon görüşmesini mümkün kıldı, 1970'lerde görüntüleme algılayıcıları tıbbi cihazlara uyarlandı, 1990'larda konum belirleme sistemleri sivil kullanıma açıldı. Türkiye'de **TÜBİTAK UZAY** uydu teknolojileri araştırmalarını yürütür, **TUSAŞ** hava ve uzay araçları geliştirir, **TEKNOFEST** ise öğrencilerin model uydu ve roket projelerini sergilediği bir ortam sunar. Bu ekosistem, bir araştırmanın üründen çok daha fazlasını ürettiğini; ölçüm, yazılım ve malzeme bilgisinin başka alanlara yayıldığını gösterir."
      ],
      "blockLabels": [
        "TEKNOLOJİ AKTARIMI",
        "UZAY KİRLİLİĞİ",
        "ÖNLEME VE GÖREV SONU PLANI",
        "BİLİM İNSANLARI VE TARİH"
      ],
      "points": [
        "Teknoloji aktarımı, uzay araştırmalarında geliştirilen bilginin günlük kullanıma geçmesidir.",
        "MR, tomografi ve ultrason görüntüleme yöntemleri uzay algılayıcılarıyla aynı ilkeleri paylaşır.",
        "Uzay kirliliği, işlevini yitirmiş araç ve parçaların yörüngede birikmesidir.",
        "Yüksek hız nedeniyle küçük parçalar bile büyük hasar verebilir; çarpışmalar yeni enkaz üretir.",
        "Görev sonu planı, enkaz oluşumunu kaynağında önleyen tasarım önlemidir."
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
        "intro": "Uzay çalışmalarının doğurabileceği sorunları belirleyip bunlardan birine çözüm önermek bu haftanın araştırma görevidir. Aşağıdaki sonuç, uzay enkazı sorununu kaynağı, önemi ve çözüm yollarıyla birlikte ele alır.",
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
        "takeaway": "Araştırmanın sonucu, uzay araştırmalarını durdurmak değil; yörüngedeki atıkları azaltan, görevleri izleyen ve uzun vadeli güvenliği gözeten teknolojiler geliştirmektir."
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
      "visualNote": "Görsel, yıldızların doğduğu gaz ve toz bulutsusundan başlayıp kütleye göre ayrılan iki sona uzanır: küçük kütlede kırmızı dev, gezegenimsi bulutsu ve beyaz cüce; büyük kütlede süpernova, nötron yıldızı ya da kara delik.",
      "focus": "Işık kirliliğinin gökyüzü gözlemine etkisini değerlendirir; bulutsudan önyıldıza, kütleye bağlı yıldız sonlarına kadar yıldız oluşumunu ve evrimini açıklar.",
      "summary": [
        "**Işık kirliliği**, gereksiz ya da yanlış yönlendirilmiş **yapay ışık** kaynaklarının gökyüzünü aydınlatmasıdır. Dört biçimde ortaya çıkar: kentlerin üzerinde oluşan turuncu parlaklık (gökyüzü parlaması), göz kamaştıran aşırı parlak kaynaklar, komşu alanları aydınlatan taşan ışık ve gereksiz reklam ışıkları. Yukarı yönelen ışık atmosferdeki moleküller ve toz tarafından saçılır; bu parlaklık sönük yıldızların görülmesini engeller ve **gökyüzü gözlemi** için gereken karanlığı yok eder. Etkisi yalnızca astronomlarla sınırlı değildir: gece yön bulmak için yıldızlardan yararlanan kuşlar ve deniz kaplumbağaları yollarını şaşırabilir, bitkilerin mevsim döngüleri bozulabilir, insanlarda uyku düzeni etkilenebilir. Çözüm basittir: ışığı yalnızca gereken yere ve gereken miktarda vermek. Aşağı yönlendirilmiş, yansıtıcı başlıklı, düşük renk sıcaklığına sahip ve zaman ayarlı **aydınlatma** kullanmak, aynı güvenlik düzeyini korurken gökyüzünü karartır.",
        "Yıldızlar, uzaydaki gaz ve toz bulutlarının içinde doğar. **Bulutsu**, hidrojen ve helyum gazı ile toz taneciklerinden oluşan geniş buluttur; ışığı kendisi üretmiyorsa karanlık bulutsu, yakınındaki sıcak yıldızları yansıtıyorsa yansıma bulutsusu, kendi ışıması varsa ışıma bulutsusu olarak adlandırılır. Bir bulutsunun her bölgesi aynı yoğunlukta değildir. Yoğun bir bölgede **kütle çekimi**, gaz ve tozu merkeze doğru çeker; madde sıkıştıkça merkez ısınır ve basınç artar. Bu sıkışmış, henüz çekirdek kaynaşması başlamamış cisme **önyıldız** denir. Önyıldızın çevresinde kalan madde bir disk oluşturur; merkezde sıcaklık yaklaşık 10 milyon kelvin düzeyine ulaştığında hidrojen çekirdekleri kaynaşarak helyuma dönüşür ve açığa çıkan enerji yıldızı dengeli bir evreye taşır. **Yıldız oluşumu** bu nedenle tek bir anda değil, milyonlarca yıl süren bir süreçte gerçekleşir; aynı bulutsuda farklı evrelerdeki yıldızlar bir arada bulunabilir.",
        "Bir yıldızın sonu, doğarken sahip olduğu kütleye bağlıdır. Güneş'in kütlesinin yaklaşık sekiz katından küçük yıldızlar, yakıtlarını tükettiklerinde genişleyerek **kırmızı dev** evresine girer. Dış katmanlarını uzaya atarak bir gezegenimsi bulutsu oluşturur; geride kalan sıcak, yoğun ve küçük çekirdek **beyaz cüce** olur. Beyaz cüce artık kaynaşma yapmaz, yalnızca kalan ısısını yavaşça yayar. Güneş'ten belirgin biçimde büyük kütleli yıldızlar ise kırmızı süperdev evresine kadar şişer ve çekirdekleri çöktüğünde **süpernova** adı verilen çok parlak bir patlamayla dağılır. Patlama sonrası geriye kalan çekirdek, kütlesine göre **nötron yıldızı** ya da **kara delik** olur. Nötron yıldızı bir kent büyüklüğünde olmasına karşın Güneş'ten daha ağırdır ve dönerek düzenli radyo sinyalleri yayabilir. Kara deliğin çekim alanı o kadar güçlüdür ki ışık bile kaçamaz. Bu iki yol, tüm yıldızların aynı biçimde sonlanmadığını gösterir.",
        "Gökyüzünün en tanınmış bulutsuları, yıldız oluşumunun farklı aşamalarını gözlemeye imkân verir. **Avcı Bulutsusu** (Orion), Dünya'dan yaklaşık 1.300 ışık yılı uzaklıkta genç yıldızların doğduğu parlak bir bölgedir; **Atbaşı Bulutsusu** karanlık bir toz bulutunun parlayan gazın önünde durmasıyla tanınır; **Tarantula Bulutsusu** ise Büyük Macellan Bulutu'nda yer alan, çok sayıda büyük kütleli yıldızın oluştuğu bir bölgedir. Yıldızların kütlesine göre farklı sonlarını ilk kez ayrıntılı biçimde hesaplayan bilim insanlarından biri **Subrahmanyan Chandrasekhar**'dır; beyaz cücelerin belirli bir kütlenin (yaklaşık 1,4 Güneş kütlesi) üzerine çıkamayacağını gösteren bu sınıra onun adı verilmiştir. **Cecilia Payne** ise 1925'te yıldızların büyük ölçüde hidrojen ve helyumdan oluştuğunu ortaya koydu; bugün yıldızların iç yapısı bu bilgiye dayanarak modellenir. Atmosferin gözleme etkisini anlamak da bu zincirin parçasıdır: yeryüzünden bakıldığında yıldızların titremesi, atmosferdeki sıcaklık farklarının ışığı kırmasından kaynaklanır."
      ],
      "blockLabels": [
        "IŞIK KİRLİLİĞİ VE GÖZLEM",
        "YILDIZ OLUŞUMU",
        "YILDIZLARIN SONU",
        "BULUTSULAR VE BİLİM İNSANLARI"
      ],
      "points": [
        "Işık kirliliği, yukarı yönelen yapay ışığın atmosferde saçılmasıyla oluşur.",
        "Aşağı yönlü, başlıklı ve zaman ayarlı aydınlatma gökyüzünü korur.",
        "Bulutsudaki yoğun bölgeler kütle çekimiyle çöker, merkez ısınır ve önyıldız oluşur.",
        "Küçük kütleli yıldızlar kırmızı dev, gezegenimsi bulutsu ve beyaz cüce evrelerinden geçer.",
        "Büyük kütleli yıldızlar süpernova ile dağılır; geriye nötron yıldızı ya da kara delik kalır."
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
        "intro": "Yıldızların oluşum basamaklarını kaynaklarla araştırıp birbiriyle ilişkilendirmek bu haftanın keşif görevidir. Aşağıdaki sonuç, süreci oluşturan aşamaları sırayla gösterir.",
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
        "takeaway": "Araştırma sonucu: bulutsu → kütle çekimiyle yoğunlaşma ve ısınma → önyıldız → enerji üretmeye başlayan yıldız. Bu süreç çok uzun sürer; şemalar aşamaları anlaşılır kılmak için sadeleştirir."
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
      "visualNote": "Görsel, uzay çağının ana fikirlerini bir arada tutar: araştırma uydusu, yörünge güvenliği, yıldızların yaşamı ve sarmal bir galaksinin ölçeği aynı sayfada karşılaştırılır.",
      "focus": "Yıldızların renk, parlaklık ve uzaklık özelliklerini; takımyıldız kavramını; galaksi, Samanyolu ve evren ölçeklerini ilişkilendirir.",
      "summary": [
        "Bir **yıldız**, kendi ışığını üreten, çok sıcak gazdan oluşan gök cismidir. Yıldızın rengi yüzey sıcaklığını verir: mavi-beyaz yıldızlar en sıcak (yaklaşık 25.000 K ve üzeri), sarı yıldızlar orta sıcaklıkta (Güneş yaklaşık 5.800 K), turuncu ve kırmızı yıldızlar ise daha soğuktur (3.000 K civarı). Renk ile sıcaklık ilişkisi günlük yaşamdaki bir deneyimle de tutarlıdır: ısınan bir metal önce kırmızı, sonra sarı, en sonunda mavi-beyaz ışır. Yıldızların parlaklığı ise hem gerçek ışıma gücüne hem de uzaklığına bağlıdır; bu nedenle gökyüzünde en parlak görünen yıldız, gerçekte en güçlü olan değildir. Yıldızlar arasındaki uzaklık **ışık yılı** ile ölçülür: ışığın bir yılda aldığı yol yaklaşık 9,46 trilyon kilometredir. Güneş'e en yakın yıldız olan **Proxima Centauri** yaklaşık 4,24 ışık yılı uzaklıktadır; bu, ışığın bile 4 yıldan fazla yol aldığı anlamına gelir. Gök bilimciler yakın yıldızların uzaklığını, Dünya'nın yörüngedeki hareketi nedeniyle oluşan küçük açı kaymasından (**ıraklık açısı**) yararlanarak ölçer.",
        "**Takımyıldız**, gökyüzünde birbirine yakın görünen yıldızların oluşturduğu örüntüdür. Bu yakınlık yalnızca bakış açımızdan kaynaklanır; aynı takımyıldızdaki yıldızlar birbirinden çok farklı uzaklıklarda bulunur ve fiziksel olarak bir arada değildir. Gökyüzü, tarih boyunca bu örüntülerle adlandırılmıştır: Büyükayı, Küçükayı, Avcı, Başak, Ejderha ve Çoban en bilinenler arasındadır. Büyükayı'nın kepçe biçimindeki son iki yıldızı, yaklaşık beş katı uzatıldığında **Kutup Yıldızı**'nı gösterir; Kutup Yıldızı neredeyse dönme ekseninin üzerinde bulunduğu için gece boyunca yerini korur ve kuzeyi bulmada kullanılır. Kuzey yarımkürede yıldızlar Kutup Yıldızı çevresinde döner; bu görünür hareket, Dünya'nın kendi ekseni etrafında dönmesinden kaynaklanır. Takımyıldız bir yıldız kümesi değildir: kümeler gerçekten birbirine yakın ve aynı bulutsudan doğmuş yıldız gruplarıdır.",
        "Yıldızlar galaksiler içinde toplanır. **Galaksi**, milyarlarca yıldız, gaz, toz ve karanlık maddeden oluşan, kütle çekimiyle bir arada tutulan dev sistemdir. Biçimlerine göre sarmal, eliptik ve düzensiz olarak sınıflandırılır. İçinde bulunduğumuz **Samanyolu**, yaklaşık 100.000 ışık yılı çapında sarmal bir galaksidir ve Güneş, merkezden yaklaşık 26.000 ışık yılı uzaklıkta bir kolda yer alır. Samanyolu'nu gece gökyüzünde bant biçiminde görürüz; çünkü disk içinden, kendi galaksimizin düzlemine bakıyoruz. En yakın büyük galaksi olan **Andromeda**, yaklaşık 2,5 milyon ışık yılı uzaklıktadır ve Samanyolu'na doğru yaklaşmaktadır. **Evren**, bütün galaksileri ve aralarındaki boşluğu kapsayan bütünlüktür; gözlenebilir evrenin çapı yaklaşık 93 milyar ışık yılı, yaşı ise 13,8 milyar yıldır. Ölçek sıralaması şöyledir: gezegen, yıldız, güneş sistemi, galaksi, galaksi kümeleri, evren. Bir yıldızın doğumundan sonuna kadar geçirdiği evrelerin bütünü **yıldız yaşam döngüsü** olarak adlandırılır.",
        "Bu büyük ölçekleri anlamamızı sağlayan gözlemler yirminci yüzyılda yapıldı. 1920'lere kadar Samanyolu'nun evrenin tamamı olduğu düşünülüyordu; **Edwin Hubble**, Andromeda'daki değişen yıldızları ölçerek bunun çok uzak bir galaksi olduğunu gösterdi ve galaksilerin bizden uzaklaşma hızının uzaklıkla arttığını buldu. Bu bulgu, evrenin genişlediği fikrinin temelini attı. **Albert Einstein**'ın genel görelilik kuramı, kütle çekiminin uzay-zamanı bükmesini açıklayarak kara deliklerin ve galaksi kümelerinin anlaşılmasını sağladı. **Robert Goddard**, 1926'da sıvı yakıtlı ilk roketi uçurarak uzay çağının teknolojik temelini hazırladı. Gökyüzüyle ilgili bu bilgiler yüzyıllar boyunca gözlem ve model kurma ile ilerledi: bir model, gözlemle çeliştiğinde değiştirilir, yeni gözlemler yeni modelleri doğurur. Uzay Çağı ünitesinin bütünü bu ilkeyi izler; uydular, teleskoplar ve sondalar gibi **uzay teknolojisi** ürünleri aynı gökyüzünü farklı araçlarla okumayı sağlar. Her model, gözlemden elde edilen **kanıt** ile sınanır ve kanıtla çelişen açıklama değiştirilir."
      ],
      "blockLabels": [
        "YILDIZLARIN ÖZELLİKLERİ",
        "TAKIMYILDIZLAR",
        "GALAKSİLER VE EVREN",
        "BİLİM İNSANLARI VE TARİH"
      ],
      "points": [
        "Yıldız rengi yüzey sıcaklığını gösterir; mavi-beyaz sıcak, kırmızı serindir.",
        "Işık yılı bir uzaklık birimidir; Proxima Centauri 4,24 ışık yılı uzaktadır.",
        "Takımyıldız, farklı uzaklıktaki yıldızların gökyüzünde oluşturduğu örüntüdür.",
        "Samanyolu sarmal bir galaksidir; Güneş merkezden yaklaşık 26.000 ışık yılı uzaktadır.",
        "Evren bütün galaksileri kapsar; ölçek gezegenden evrene doğru genişler."
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
      "visualNote": "Görsel, yatay yönde itilen ağır bir yükü gösterir: uygulanan kuvvet ile cismin kuvvet yönünde aldığı yolun çarpımı fiziksel işi verir; kuvvet ile yer değiştirme aynı doğrultuda değilse iş yapılmaz.",
      "focus": "Kuvvetin hareketi nasıl değiştirdiğini; işin kuvvet ile yolun çarpımı olduğunu; iş biriminin joule olduğunu ve günlük yaşamdaki karşılıklarını açıklar.",
      "summary": [
        "**Kuvvet**, bir cismin hareketini değiştiren, yönünü ya da biçimini etkileyen itme veya çekmedir. Birimini, adını kendisi koymasa da büyük ölçüleri ona dayanan **Isaac Newton**'dan alan newton (N) ile ifade edilir; 1 N, 1 kilogramlık bir kütleye saniyede 1 metre/saniye hızlanma kazandıran kuvvettir. Kuvvetler temas gerektiren ve uzaktan etki eden kuvvetler olarak ikiye ayrılır: sürtünme, hava direnci, itme-çekme ve yay kuvveti temas sonucu; kütle çekimi, manyetik kuvvet ve elektrik kuvveti belirli bir uzaklıktan etki eder. Kuvvetin üç özelliği vardır: büyüklüğü, **kuvvet yönü** ve uygulama noktası. Bu üçü değiştiğinde etki de değişir; aynı büyüklükte iki kuvvet farklı yönlerde uygulandığında sonuç aynı olmaz. Cisimlerin hareket durumunu inceleyen **dinamik**, kuvvet ile hareket arasındaki ilişkiyi kurar.",
        "Bir cismin hızı, yönü ya da ikisi birden değişiyorsa hareket değişiyor demektir. Duran bir cismi hareket ettiren, hızlanan bir aracı yavaşlatan, dönen bir cismin yönünü değiştiren ve biçimini bozan her etki kuvvetin sonucudur. Cisme etki eden kuvvetler dengede olduğunda cisim durur ya da sabit hızla hareketine devam eder; yani dengelenmiş kuvvetler hareketi değiştirmez. Dengelenmemiş kuvvet ise harekette mutlaka bir değişiklik oluşturur. Bu ilke **Newton'ın birinci hareket yasası** olarak bilinir ve **eylemsizlik** olarak adlandırılan direnci açıklar: otobüs ani fren yaptığında ayakta duran yolcuların öne savrulması, aracın yavaşlamasına karşın gövdenin hareketini sürdürmesinden kaynaklanır. Emniyet kemeri bu eylemsizliğin zarar vermesini engeller. İkinci yasa ise kuvvet ile ivme arasındaki ilişkiyi verir: aynı kuvvet daha küçük kütleye daha büyük ivme kazandırır. Bu nedenle kütlesi fazla olan bir cismi aynı hıza çıkarmak daha zordur.",
        "**İş**, bir kuvvetin bir cismi kendi yönünde hareket ettirmesiyle yapılır. Ölçütü nettir: uygulanan kuvvet ile cismin kuvvet **doğrultusunda** aldığı yol, yani **yer değiştirme** çarpılır. Bu nedenle iş, kuvvetin ve yolun büyüklüğüne bağlıdır; kuvvet uygulanmasına rağmen cisim yerinde kalıyorsa fiziksel anlamda iş yapılmamıştır. Bir çantayı havada sabit tutmak kaslarımızı yorar ama **fiziksel iş** olarak sayılmaz, çünkü çantanın **yer değiştirme yönü**nde aldığı yol sıfırdır. İşin birimi **joule**'dür (J) ve 1 joule, 1 newtonluk kuvvetle 1 metrelik yol alındığında yapılan iştir. 1800'lü yıllarda ısı ve mekanik iş arasındaki ilişkiyi ölçümlerle ortaya koyan **James Prescott Joule**'un adı bu birime verilmiştir. Bir kitabı rafa kaldırmak, çekmeceyi açmak, market arabasını itmek iş yapılan durumlara örnektir; duvara kuvvet uygulamak ya da ağırlığı kucağımızda sabit tutmak iş yapılmayan durumlardır.",
        "İşin günlük yaşamdaki karşılığını hesaplayarak görmek mümkündür. 20 kilogramlık bir çuvalı 1 metre yükseğe kaldırmak için yer çekimine karşı yaklaşık 196 N kuvvet uygulanır ve yaklaşık 196 J iş yapılır; aynı çuval 5 metre yukarı taşındığında iş beş katına çıkar. Bir cismi eğik bir yüzeyden (rampadan) çıkarmak, aynı yüksekliğe dik olarak kaldırmaktan daha az kuvvet gerektirir; çünkü kuvvet daha uzun bir yola dağılır. İki farklı rampanın gerektirdiği kuvveti **karşılaştırmak**, eğimin işi nasıl dağıttığını gösterir. Bu nedenle engelli rampaları, merdiven yerine eğik geçişler ve tekerlekli taşıma araçları işi kolaylaştırır; bu düzeneklere **basit makine** denir. Kaldıraç, makara, eğik düzlem ve dişli çark, uygulanan kuvveti ya da kuvvetin yönünü değiştirerek işi kolaylaştıran araçlardır. Hiçbiri işi yoktan var etmez; yalnızca daha küçük kuvvetle daha uzun yolda çalışmayı sağlar. Bu denge, enerji konusunun da temelini oluşturur.",
        "Kuvvet ve hareket üzerine düşünceler, günlük deneyimlerin ötesine geçen ölçümlerle olgunlaştı. **Aristoteles**, cisimlerin doğal yerlerine dönmeye çalıştığını ve hareketin sürmesi için sürekli bir kuvvet gerektiğini savundu; bu görüş yüzyıllarca kabul gördü. **Galileo Galilei**, 17. yüzyılın başında eğik düzlemlerle yaptığı deneylerde sürtünmenin azaltıldığı ortamda hareketin kendiliğinden sürdüğünü gösterdi ve serbest düşmenin kütleden bağımsız olduğunu öne sürdü. Efsaneye göre Pisa Kulesi'nden farklı ağırlıkta cisimler bırakarak bu düşünceyi sınamıştır. **Isaac Newton**, 1687'de yayımlanan çalışmasında hareketin üç yasasını ve genel çekim yasasını bir araya getirerek kuvvet, kütle ve ivme arasındaki ilişkiyi tek bir çerçevede topladı. Bu çerçeve bugün de mühendislik hesaplarında kullanılır. Ülkemizde **Cezerî**, 12. yüzyılda su saatleri, otomatik düzenekler ve kaplar tasarlayarak kuvvet aktarımı ve denge üzerine uygulamalı bilgiyi belgelemiştir; onun çizimleri, mekanik düzeneklerin işleyişini anlatan erken mühendislik örnekleri arasındadır."
      ],
      "blockLabels": [
        "KUVVET",
        "HAREKET VE DENGE",
        "İŞ VE JOULE",
        "BASİT MAKİNELER",
        "BİLİM İNSANLARI VE TARİH"
      ],
      "points": [
        "Kuvvet, hareketi ya da biçimi değiştiren itme veya çekmedir; birimi newtondur.",
        "Dengelenmiş kuvvetler hareketi değiştirmez; dengelenmemiş kuvvetler değiştirir.",
        "İş, kuvvet ile kuvvet yönünde alınan yolun çarpımıdır.",
        "İşin birimi joule'dür; yol almayan cisme uygulanan kuvvet iş yapmaz.",
        "Basit makineler işi kolaylaştırır, işi yoktan var etmez."
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
      "visualNote": "Görsel, hareket eden cisimlerin kinetik enerjisini ve yüksekte duran cisimlerin depoladığı potansiyel enerjiyi karşılaştırır; kütle ve hız arttıkça kinetik enerji, yükseklik arttıkça potansiyel enerji büyür.",
      "focus": "Enerjinin varlığını iş yapabilme yeteneği olarak tanımlar; kinetik ve potansiyel enerjiyi hesaplama mantığıyla ilişkilendirir, enerji çeşitlerini örneklendirir.",
      "summary": [
        "**Enerji**, bir sistemin iş yapabilme yeteneğidir. Enerji de iş gibi joule ile ölçülür; ancak enerji bir cisimde bulunan, iş ise bir süreçte gerçekleşen niceliktir. Bir cismin enerjisi varsa uygun koşullarda iş yapabilir: yüksekte duran bir taş düştüğünde, gerilmiş bir yay serbest bırakıldığında, hareket eden bir araba çarpıştığında iş yapılır. Enerji, **kinetik** ve **potansiyel** olmak üzere iki temel biçimde incelenir. Kinetik enerji hareketten, potansiyel enerji ise konumdan veya biçim değişikliğinden kaynaklanır. Günlük dilde kullanılan ısı, ışık, ses ve elektrik enerjisi de bu iki temel biçimin farklı görünümleridir; örneğin ısı, taneciklerin kinetik enerjisinin toplam etkisidir. Enerji skaler bir büyüklüktür, yani yönü yoktur; yalnızca miktarı ve türü vardır.",
        "**Kinetik enerji**, hareket eden her cismin sahip olduğu enerjidir. Bir cismin kütlesi arttıkça ve hızı arttıkça kinetik enerjisi artar; ancak hızın etkisi daha büyüktür, çünkü kinetik enerji hızın karesiyle birlikte büyür. Bu nedenle hız iki katına çıktığında kinetik enerji dört katına çıkar. Aynı hızla giden bir kamyonun otomobilden çok daha fazla kinetik enerjiye sahip olması kütle etkisidir; aynı aracın hızının iki katına çıkması ise durma mesafesini belirgin biçimde uzatır. Bu ilişki trafik güvenliğinin temelini oluşturur: hız sınırları, fren mesafesi ve çarpışma şiddeti doğrudan kinetik enerjiyle ilgilidir. Hareket eden bir cismin kinetik enerjisi, kütlesi ile hızının karesinin çarpımının yarısı olarak hesaplanır. 2 kilogramlık bir cismin 3 m/s hızla kinetik enerjisi bu bağıntıyla 9 joule bulunur; aynı cisim 6 m/s ile hareket ettiğinde enerjisi 36 joule olur.",
        "**Potansiyel enerji**, bir cismin konumu ya da biçimi nedeniyle depoladığı enerjidir. Yer çekimi potansiyel enerjisi, cismin kütlesine, yer çekimi ivmesine ve **yükseklik** değerine bağlıdır; bu nedenle bir cismi yukarı kaldırmak enerji depolamak demektir. 2 kilogramlık bir cismi 3 metre yükseğe kaldırdığınızda, yer çekimi ivmesi yaklaşık 10 m/s² alındığında 60 joule enerji depolanır. **Esneklik potansiyel enerjisi** ise gerilen ya da sıkıştırılan yay, lastik ve okçuluk yayı gibi esnek cisimlerde birikir; yayın sertliği ve ne kadar gerildiği bu enerjiyi belirler. Salıncakta sallanan bir çocuk bu iki biçim arasında sürekli geçiş yapar: en yüksek noktada hız sıfıra yaklaşır, potansiyel enerji en büyüktür; en alt noktada ise potansiyel enerji en küçük, kinetik enerji en büyüktür. Sarkaç da aynı salınımı gösterir ve bu düzenek, enerji dönüşümünü gözlemek için en sade araçtır.",
        "Enerji çeşitleri, aynı dönüşüm zincirinin farklı halkalarıdır. **Isı enerjisi**, taneciklerin hareketinden kaynaklanır ve sıcaklık farkı olan iki ortam arasında aktarılır. **Işık enerjisi**, elektromanyetik dalgalarla taşınır ve bitkilerde fotosentez için gereklidir. **Ses enerjisi**, bir ortamda titreşimlerin yayılmasıyla oluşur; boşlukta yayılmaz. **Elektrik enerjisi**, yüklü taneciklerin hareketinden doğar ve evlerde ısıtma, aydınlatma ve hareket için kullanılır. **Kimyasal enerji**, atomlar arasındaki bağlarda depolanır; besinlerde, yakıtlarda ve pillerde bulunur. **Nükleer enerji**, atom çekirdeğindeki bağlardan açığa çıkar ve Güneş'in enerji kaynağıdır. Bu çeşitler birbirine dönüşebilir: yakıttaki kimyasal enerji motorlarda ısı ve harekete, elektrik enerjisi ampulde ışık ve ısıya, güneş panellerinde ışık enerjisi elektrik enerjisine dönüşür. Enerjinin korunumu ilkesi, dönüşümlerin toplamının değişmediğini söyler.",
        "Enerji kavramının bilimsel temeli, ısı ile iş arasındaki ilişkinin ölçülmesiyle kuruldu. **James Prescott Joule**, 1840'larda yaptığı deneylerde düşen ağırlıkların bir çarkı döndürerek suyu ısıttığını gösterdi ve mekanik iş ile ısı arasında sabit bir oran olduğunu ortaya koydu; böylece ısının ayrı bir “madde” değil, enerji aktarımı olduğu anlaşıldı. **Hermann von Helmholtz**, 1847'de enerjinin korunumu ilkesini genel bir yasa olarak formüle etti. **William Rankine** ise buhar makinelerinin verimini incelerken enerji kavramının mühendislikte yerleşmesine katkı sağladı. **Galileo Galilei**, sarkacın salınım süresinin genliğe çok az bağlı olduğunu gözleyerek salınım hareketinin düzenliliğini gösterdi; bu gözlem saat yapımından enerji dönüşümlerinin ölçülmesine kadar geniş bir alanda kullanıldı. Bugün enerji hesapları bu birikimin üzerine kurulur: bir cismin kütlesi, hızı ve yüksekliği bilindiğinde enerjisi hesaplanabilir; hesaplanan değer, dönüşümler sırasında kaybolmaz, yalnızca biçim değiştirir."
      ],
      "blockLabels": [
        "ENERJİ VE BİRİMİ",
        "KİNETİK ENERJİ",
        "POTANSİYEL ENERJİ",
        "ENERJİ ÇEŞİTLERİ",
        "BİLİM İNSANLARI VE TARİH"
      ],
      "points": [
        "Enerji, iş yapabilme yeteneğidir ve joule ile ölçülür.",
        "Kinetik enerji harekete, potansiyel enerji konum veya biçime bağlıdır.",
        "Kinetik enerji hızın karesiyle artar; hız iki katına çıkınca enerji dört katına çıkar.",
        "Yer çekimi potansiyel enerjisi kütle ve yükseklikle artar.",
        "Enerji çeşitleri birbirine dönüşür; toplam enerji korunur."
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
      "visualNote": "Görsel, pürüzlü zeminde yavaşlayan bir top ile tekerlekten çevreye yayılan ısıyı bir araya getirir; sürtünme hareket enerjisinin bir bölümünü ısıya dönüştürür, toplam enerji korunur.",
      "focus": "Enerji dönüşümlerini ve korunumunu örnekler üzerinden açıklar; sürtünme kuvvetinin enerjiye etkisini ve sürtünmeyi artırıp azaltma yollarını değerlendirir.",
      "summary": [
        "**Enerji dönüşümü**, enerjinin bir biçimden başka bir biçime geçmesidir. Bir elektrikli su ısıtıcısında elektrik enerjisi ısıya, bir ampulde ışık ve ısıya, bir mikserde harekete dönüşür. Bir bisikletli pedal çevirdiğinde kaslarındaki kimyasal enerji hareket enerjisine, yokuş çıkarken bu enerji **çekim potansiyel enerjisine** dönüşür; inişte ise potansiyel enerji yeniden kinetik enerjiye geçer. Dönüşümler her zaman aynı yönde ve tek adımda gerçekleşmez; bir zincir içinde birkaç kez biçim değiştirebilir. Kömürle çalışan bir termik santralde yakıttaki kimyasal enerji ısıya, ısı buharın hareketine, hareket türbinin dönmesine, türbin jeneratörü çevirmesiyle elektrik enerjisine dönüşür. Her adımda enerjinin bir bölümü ortama ısı olarak yayılır; bu nedenle bir dönüşüm zincirinin verimi hiçbir zaman yüzde yüz değildir.",
        "**Enerjinin korunumu**, bir sistemdeki toplam enerjinin dönüşümler sırasında değişmediğini söyler: enerji yoktan var olmaz, var olan enerji yok olmaz. Bu ilke, “kaybolan” enerjinin aslında başka bir biçime geçtiğini anlamamızı sağlar. Sürtünmeli bir yüzeyde kayan bir blok yavaşlar; kinetik enerjisi azalır, ancak bu enerji yok olmaz, blok ve yüzey taneciklerinin hareketine yani ısıya dönüşür. Bir **salıncak** ya da sarkaç salınırken genliği her turda biraz azalır; kaybedilen mekanik enerji hava direnci ve sürtünme nedeniyle ısıya geçer. Bu nedenle gerçek sistemlerde mekanik enerji korunumu yaklaşıktır; toplam enerji ise her zaman korunur. Korunum ilkesi, enerji hesaplarında bir denetim aracı olarak kullanılır: başlangıçtaki ve sonundaki enerji toplamları karşılaştırılarak dönüşümün tutarlılığı sınanır.",
        "**Sürtünme kuvveti**, iki yüzey birbirine göre hareket ederken ya da hareket etmeye çalışırken oluşan, harekete zıt yönde etki eden kuvvettir. Yüzeylerin pürüzlülüğü, birbirine bastıran kuvvet ve yüzeylerin türü sürtünmenin büyüklüğünü etkiler. Sürtünme çoğu zaman istenmeyen bir kayıp gibi görünse de hayatın sürmesi için zorunludur: yürürken ayakkabının yere tutunmasını, aracın fren yapmasını, kalemin kâğıda iz bırakmasını, düğümün çözülmemesini sağlar. Sürtünme olmasaydı bir yüzeyde yürümek, bir bardağı tutmak bile mümkün olmazdı. Öte yandan makine parçalarında **ısı enerjisi** olarak kayba ve aşınmaya, hareketin yavaşlamasına yol açar; gıcırdayan bir kapı menteşesinde duyulan **ses enerjisi** de aynı dönüşümün parçasıdır. Bu nedenle mühendislikte sürtünmeyi azaltmak için yağlama, rulmanlı yataklar, cilalı yüzeyler ve kaygan kaplamalar kullanılır; artırmak gerektiğinde ise dişli yüzeyler, kauçuk kaplama ve fren balataları tercih edilir.",
        "Sürtünmenin yönü ve etkisi, hareketin türüne göre değişir. Bir cismi iterek hareket ettirmeye çalışırken sürtünme harekete ters yönde etki eder; cisim hareket etmeye başladığında ise **kayma sürtünmesi** devreye girer ve genellikle başlangıçtaki **statik sürtünmeden** daha küçüktür. Bu yüzden ağır bir dolabı yerinden kımıldatmak, kımıldadıktan sonra itmeye devam etmekten daha zordur. Tekerlekli araçlarda ise yuvarlanma sürtünmesi devreye girer ve kayma sürtünmesinden çok daha küçüktür; tekerleğin bulunması bu nedenle taşımacılıkta devrim yarattı. Hava ve suda hareket eden cisimlerde ise **direnç kuvveti** oluşur; bu kuvvet cismin biçimine, yüzey alanına ve hızına bağlıdır. Paraşüt bu direnci artırarak düşüşü yavaşlatır; uçak ve yarış arabaları ise aerodinamik biçimleriyle direnci azaltır. Yüzey alanı ile basınç ilişkisi de burada devreye girer: aynı kuvvet küçük bir alana uygulandığında basınç artar, bu nedenle kar ayakkabısı geniş tabanıyla batmayı engeller.",
        "Enerji ve sürtünme üzerine bilgi, ölçüm yapan bilim insanlarının katkısıyla birikti. **Galileo Galilei**, eğik düzlemde bırakılan cismin hızının yoldan bağımsız olarak yalnızca yükseklik değişimine bağlı olduğunu göstererek enerji dönüşümünün temel bir özelliğini ortaya koydu. **James Prescott Joule**, 1840'larda mekanik iş ile ısı arasındaki eşdeğerliği ölçtü; düşen ağırlıklarla döndürülen çarkın suyu ısıttığını gösteren düzeneği, sürtünmenin enerjiyi yok etmediğini kanıtlayan en açık deneylerden biridir. **Hermann von Helmholtz**, enerjinin korunumunu tüm fiziksel süreçlere yayarak genel bir ilke hâline getirdi. **William Rankine**, ısı makinelerinin verimini incelerken enerjinin kullanılabilirliği kavramına öncülük etti. Bu birikim, bugün enerji verimliliği dediğimiz yaklaşımın temelini oluşturur: aynı işi daha az enerjiyle yapmak, kayıpların büyük bölümünün sürtünme ve ısı olarak ortaya çıktığını bilmek demektir. Evlerde yalıtım, ulaşımda toplu taşıma, sanayide atık ısı geri kazanımı bu ilkenin uygulamalarıdır."
      ],
      "blockLabels": [
        "ENERJİ DÖNÜŞÜMÜ",
        "ENERJİNİN KORUNUMU",
        "SÜRTÜNME KUVVETİ",
        "SÜRTÜNME VE DİRENÇ",
        "BİLİM İNSANLARI VE TARİH"
      ],
      "points": [
        "Enerji dönüşümü, enerjinin biçim değiştirmesidir; her adımda bir bölümü ısıya geçer.",
        "Enerjinin korunumu ilkesine göre enerji yoktan var olmaz, yok olmaz.",
        "Sürtünme harekete zıt yönde etki eder ve mekanik enerjinin bir bölümünü ısıya dönüştürür.",
        "Sürtünme yürüme ve frenleme için gereklidir; makine parçalarında ise azaltılır.",
        "Yağlama, rulman ve aerodinamik biçim sürtünme kaybını azaltır."
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
      "visualNote": "Görsel, ağızdan başlayıp mide, ince bağırsak ve kalın bağırsağa uzanan sindirim kanalını dengeli bir öğünle birlikte gösterir; kanal organları sırayla çalışır.",
      "focus": "Sindirim sisteminin görevini, sindirim türlerini ve organların sıralı işleyişini; mekanik ve kimyasal sindirimin farkını açıklar.",
      "summary": [
        "**Sindirim**, besinlerin vücudun kullanabileceği kadar küçük moleküllere parçalanmasıdır. Bu süreç iki temel biçimde gerçekleşir. **Fiziksel (mekanik) sindirim**, besinlerin çiğneme, öğütme, karıştırma ve parçalama ile daha küçük parçalara ayrılmasıdır; burada besinin kimyasal yapısı değişmez, yalnızca yüzey alanı artar. **Kimyasal sindirim** ise **enzim** adı verilen salgıların etkisiyle besin moleküllerinin bağlarının koparılmasıdır; besin, emilebilecek küçük moleküllere dönüşür. Fiziksel sindirim kimyasal sindirimi kolaylaştırır: daha küçük parçalara ayrılan besinin yüzey alanı arttığı için enzimler daha etkili çalışır. Sindirim sonucu oluşan küçük moleküllerin kana geçmesine **emilim** denir. Sindirimin amacı, alınan besini hücrelerin kullanabileceği hâle getirmek ve atık maddeleri ayırmaktır.",
        "Sindirim kanalı ağızda başlar. Dişler besini keser, yırtar ve öğütür; dil besini karıştırıp yutmayı sağlar. **Tükürük bezleri** nişastanın bir bölümünü parçalayan enzim içeren tükürük salgılar; bu nedenle ekmek uzun süre çiğnendiğinde tatlılaşır. Lokma **yutaktan** geçerek yemek borusuna ulaşır; **yemek borusu**, kasılma hareketleriyle besini mideye iletir. Bu hareket **peristaltik hareket** olarak adlandırılır ve yer çekiminden bağımsız çalışır. **Mide**, kaslı bir torba olarak besini çalkalar, fiziksel olarak parçalar ve içerdiği asit ile proteinlerin sindirimini başlatır. Mide asidi besinlerle gelen mikropların bir bölümünü de etkisiz hâle getirir. Mideden sonra besin, ince bağırsağa geçer ve burada sindirimin en yoğun bölümü gerçekleşir.",
        "**İnce bağırsak**, sindirimin tamamlandığı ve besinlerin büyük bölümünün emildiği organdır. Yüzeyi **villus** adı verilen milyonlarca küçük çıkıntıyla kaplıdır; bu yapı emilim yüzeyini çok büyütür. Villusların içinde kılcal damarlar bulunur ve emilen besinler buradan kana geçer. Sindirime **pankreas** ve **karaciğer** gibi yardımcı organlar katkı verir: pankreas, karbonhidrat, protein ve yağları parçalayan enzimleri ince bağırsağa gönderir; **karaciğer** ise **safra** salgılayarak yağların küçük damlacıklara ayrılmasını sağlar, yani yağların fiziksel sindirimine yardımcı olur. Safra, yağları kimyasal olarak parçalamaz; yalnızca yüzey alanını artırarak enzimlerin işini kolaylaştırır. **Kalın bağırsak** ise su ve minerallerin geri emilimini yapar, sindirilemeyen artıkları yoğunlaştırarak dışarı atılmaya hazırlar. Bu bölümde yaşayan yararlı bakteriler bazı vitaminlerin üretimine de katkı sağlar.",
        "Organların sıralı çalışması, besinin izlediği yolun anlaşılmasıyla görülür: ağız, yemek borusu, mide, ince bağırsak, kalın bağırsak ve anüs. Bu sıralamada her organın salgısı bir sonraki aşamaya hazırlık yapar; örneğin ağızda başlayan nişasta sindirimi midede asit nedeniyle durur, ince bağırsakta ise pankreas enzimleriyle sürer. Sindirim sistemi sinirler ve hormonlar tarafından düzenlenir; besin geldiğinde salgılar otomatik olarak artar. Sindirim sağlığı için besinleri iyi çiğnemek, öğünleri düzenli tutmak, yeterli su içmek ve lifli besinler tüketmek önemlidir. Lifli besinler sindirilmez ancak bağırsak hareketlerini düzenler. Aşırı yağlı ve işlenmiş gıdalar, düzensiz yemek ve yetersiz su sindirim sistemi üzerinde olumsuz etki yapar; uzun süreli dengesiz beslenme obezite ve sindirim rahatsızlıkları riskini artırır.",
        "Sindirim üzerine bilgi, yüzyıllar süren gözlem ve deneyle birikti. 11. yüzyılda yaşayan **İbn Sina**, tıp alanındaki kapsamlı eserinde sindirim organlarını ve beslenmenin bedene etkisini sistemli biçimde ele aldı; yüzyıllar boyunca tıp eğitiminde temel kaynak olarak kullanıldı. 17. yüzyılda **William Harvey**, kan dolaşımını deneylerle açıklayarak organların birbirine nasıl bağlı çalıştığını gösterdi; bu yaklaşım sindirim sisteminin damar yoluyla ilişkisinin anlaşılmasına da katkı sağladı. 18. yüzyılda **Lazzaro Spallanzani**, mide özsuyunun besinleri kimyasal olarak parçaladığını deneylerle gösterdi. 19. yüzyılda **Claude Bernard**, karaciğerin kan şekeri dengesindeki rolünü ortaya koydu. Bu birikim, bugün sindirimin hem mekanik hem kimyasal bir süreç olduğu bilgisinin temelini oluşturur. Besinlerin içerdiği enerjinin ölçülmesi de aynı çizgide gelişti: besinlerin joule cinsinden enerji değerleri, kalorimetre deneyleriyle belirlenir."
      ],
      "blockLabels": [
        "SİNDİRİM VE ENZİM",
        "SİNDİRİM KANALI",
        "İNCE BAĞIRSAK VE YARDIMCI ORGANLAR",
        "SİNDİRİM SAĞLIĞI",
        "BİLİM İNSANLARI VE TARİH"
      ],
      "points": [
        "Sindirim, besinlerin kullanılabilir küçük moleküllere parçalanmasıdır.",
        "Fiziksel sindirim yüzey alanını artırır, kimyasal sindirim bağları koparır.",
        "Enzimler kimyasal sindirimi gerçekleştirir; emilim ince bağırsakta yoğunlaşır.",
        "Karaciğer safra üretir, pankreas enzim salgılar; ikisi de yardımcı organdır.",
        "Sindirim ağızda başlar ve kalın bağırsakta su emilimiyle sürer."
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
        "intro": "Sindirim organlarının görevlerini araştırıp besin yolunu bir bütün olarak açıklamak bu haftanın görevidir. Sonuç, kanal organlarını yardımcı organlarla birlikte ele alır.",
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
        "takeaway": "Besin yolu ağız → yutak → yemek borusu → mide → ince bağırsak → kalın bağırsak → anüstür. Sindirim, emilim ve atıkların uzaklaştırılması farklı basamaklardır; organlar görev paylaşımıyla çalışır."
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
      "visualNote": "Görsel, ince bağırsak yüzeyindeki villusları ve besin moleküllerinin kılcal damara geçişini gösterir; emilim yüzeyi villuslarla genişler ve sindirilmiş besinler burada kana karışır.",
      "focus": "Fiziksel ve kimyasal sindirimin besin gruplarına göre işleyişini, emilimi ve sindirim sağlığını korumaya yönelik davranışları açıklar.",
      "summary": [
        "Besinler karbonhidrat, protein, yağ, vitamin, mineral ve su olarak gruplandırılır. **Karbonhidratlar** öncelikle enerji kaynağıdır; ekmek, pirinç, makarna ve patateste bulunur. Sindirimleri ağızda başlar, ince bağırsakta glikoz gibi basit şekerlere kadar sürer. **Proteinler** yapıcı ve onarıcı besinlerdir; et, süt, yumurta, kuru baklagillerde bulunur ve midede başlayan sindirimleri ince bağırsakta **amino asitlere** kadar tamamlanır. **Yağlar** enerji deposu olarak görev yapar ve yağda çözünen vitaminlerin taşınmasını sağlar; sindirimleri ince bağırsakta safranın yardımıyla gerçekleşir ve **yağ asidi** ile **gliserol**e ayrılır. **Vitaminler** ve **mineraller** ise enerji vermez, düzenleyici görev yapar; sindirime uğramadan doğrudan emilir. **Su**, besinlerin taşınması ve vücut sıcaklığının düzenlenmesi için gereklidir.",
        "Fiziksel ve kimyasal sindirim, besin grubuna göre farklı yerlerde ve farklı yoğunlukta gerçekleşir. Çiğneme, mide kaslarının çalkalaması ve safranın yağ damlacıklarını küçültmesi fiziksel sindirimdir; tükürük, mide özsuyu, pankreas özsuyu ve bağırsak özsuyundaki enzimler ise kimyasal sindirimi yürütür. Her enzim belirli bir besine etki eder; bu nedenle sindirim tek bir salgıyla değil, bir dizi salgının sırayla devreye girmesiyle tamamlanır. Enzimler sıcaklık ve asitlikten etkilenir; mide asidinin çok yüksek olması ince bağırsaktaki enzimlerin çalışmasını engelleyeceği için pankreas salgısı asitliği dengeler. Bu düzenek, sindirim sisteminin birbirini tamamlayan bölümlerden oluştuğunu gösterir. Sindirimin tamamlanması saatler alır; besinlerin midede kalma süresi içeriğe göre değişir, yağlı besinler daha uzun süre kalır.",
        "**Emilim**, sindirilmiş besin moleküllerinin bağırsak duvarından kana geçmesidir. İnce bağırsağın yüzeyindeki villuslar bu iş için özelleşmiştir; her villusun içinde kan ve lenf kılcalları bulunur. Glikoz ve amino asitler doğrudan kana geçerken yağların büyük bölümü lenf yoluna geçer ve oradan kana karışır. Kalın bağırsakta ise su ve mineral emilimi yapılır; emilmeyen artıklar dışkı olarak atılır. Emilim verimliliği, bağırsak yüzeyinin sağlığına bağlıdır; iltihaplı ya da hasarlı bir bağırsakta emilim azalır ve besinler yeterince kullanılamaz. Bu nedenle sindirim sağlığı yalnızca mide rahatsızlığıyla değil, besinlerden yararlanma düzeyiyle de ilgilidir. Emilim tamamlandığında besin molekülleri kan yoluyla hücrelere taşınır ve enerji üretimi ya da yapı onarımı için kullanılır.",
        "Sindirim sağlığını korumak günlük alışkanlıklarla doğrudan ilişkilidir. **Dengeli beslenme**, öğünleri düzenli tutmak, besinleri yavaş ve iyi çiğnemek, yeterli su içmek ve lifli besinleri ihmal etmemek sindirim sisteminin yükünü azaltır. Aşırı yağlı, çok tuzlu ve işlenmiş gıdalar, gazlı içecekler ve düzensiz yemek alışkanlığı sindirim şikâyetlerini artırır. Yemekten hemen sonra yoğun egzersiz yapmak mide rahatsızlığına yol açabilir; buna karşılık düzenli hareket bağırsak hareketlerini destekler. **Hijyen** kuralları gereği sebze ve meyveler yıkanmalı, et ürünleri iyice pişirilmeli, açıkta satılan gıdalardan kaçınılmalıdır. Uzun süreli karın ağrısı, şişkinlik veya kilo kaybı gibi belirtiler bir sağlık kuruluşuna başvurmayı gerektirir.",
        "Beslenme ve sindirim üzerine bilgi, farklı dönemlerde yapılan gözlemlerle birikti. 11. yüzyılda **İbn Sina**, besinlerin niteliği ve sindirim süreci üzerine ayrıntılı değerlendirmeler yaptı; eserleri Orta Çağ boyunca hem Doğu'da hem Avrupa'da okutuldu. 17. yüzyılda **William Harvey**, kanın dolaştığını göstererek besinlerin bağırsaktan dokulara nasıl taşındığı sorusuna zemin hazırladı. 18. yüzyılda **Lazzaro Spallanzani**, mide salgısının besinleri kimyasal olarak değiştirdiğini deneylerle kanıtladı. 19. yüzyılda **Claude Bernard**, vücudun iç dengesini koruyan süreçleri inceledi ve karaciğerin rolünü ortaya koydu. 20. yüzyılda vitaminlerin keşfi, eksiklik hastalıklarının beslenmeyle ilişkisini açıkladı; **Casimir Funk**'un 1912'de öne sürdüğü “vitamin” kavramı bu alanın adını belirledi. Bugün sindirim ve beslenme bilgisi, hem bireysel sağlık hem de toplum sağlığı politikalarının temelini oluşturur."
      ],
      "blockLabels": [
        "BESİN GRUPLARI",
        "FİZİKSEL VE KİMYASAL SİNDİRİM",
        "EMİLİM",
        "SİNDİRİM SAĞLIĞI",
        "BİLİM İNSANLARI VE TARİH"
      ],
      "points": [
        "Karbonhidratlar enerji, proteinler yapı ve onarım, yağlar depo ve taşıma görevi yapar.",
        "Protein sindirimi midede başlar, ince bağırsakta amino asitlere tamamlanır.",
        "Safra yağları küçük damlacıklara ayırır; kimyasal parçalanmayı enzimler yapar.",
        "Glikoz ve amino asitler doğrudan, yağların büyük bölümü lenf yoluyla emilir.",
        "Düzenli öğün, yeterli su ve lifli besin sindirim sağlığını korur."
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
        "intro": "Sindirim sağlığını koruyan günlük alışkanlıkları güvenilir kaynaklardan derlemek bu haftanın görevidir. Aşağıdaki sonuçlar, tek tek öneriler yerine birbirini destekleyen davranışları bir araya getirir.",
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
        "takeaway": "Araştırma sonucu: tek bir yiyecek ya da alışkanlık sindirim sağlığını tek başına belirlemez. Çeşitli beslenme, sıvı, hareket ve hijyen birlikte değerlendirilir; kişiye özel sağlık sorusunda bir yetişkin ve sağlık uzmanına danışılır."
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
      "visualNote": "Görsel, kalbi merkeze alarak atardamar, toplardamar ve kılcal damarlarla vücuda yayılan dolaşım ağını gösterir; küçük dolaşım akciğerlere, büyük dolaşım vücuda uzanır.",
      "focus": "Kalp, damar ve kanın yapısını ve görevlerini; küçük ve büyük dolaşımın izlediği yolu ve aralarındaki farkı açıklar.",
      "summary": [
        "**Dolaşım sistemi**, besin ve oksijenin hücrelere taşınmasını, atık maddelerin uzaklaştırılmasını sağlayan sistemdir. Üç temel öğeden oluşur: **kalp**, **damarlar** ve **kan**. Kalp, kasılıp gevşeyerek kanı damarlara pompalayan kaslı organdır; göğüs boşluğunun ortasında, hafifçe sola yerleşmiştir. Dört odacığı vardır: üstteki iki küçük odacık **kulakçık**, alttaki iki büyük odacık **karıncık** olarak adlandırılır. Kulakçıklar kanı toplar, karıncıklar pompalar. Kalbin sol tarafı daha kalın kaslıdır; çünkü kanı tüm vücuda göndermek zorundadır. Kalp kapakçıkları **kan akışını** tek yönde tutar ve kanın geri kaçmasını engeller. Kalbin kasılması sırasında oluşan basınç dalgası nabız olarak hissedilir; dinlenme hâlinde dakikada yaklaşık 60-100 atış normal kabul edilir.",
        "**Damarlar** üç türdür. **Atardamarlar** kanı kalpten organlara taşır; duvarları kalın ve esnektir, çünkü yüksek basınca dayanmaları gerekir. **Toplardamarlar** kanı organlardan kalbe getirir; duvarları daha incedir ve içlerinde kanın geri akmasını engelleyen kapakçıklar bulunur. **Kılcal damarlar** ise atardamar ve toplardamarları birbirine bağlayan, tek katman hücreden oluşan çok ince damarlardır; madde alışverişi burada gerçekleşir. Besin, oksijen ve atık maddeler kılcal damar duvarından geçerek hücrelere ulaşır ya da hücrelerden uzaklaştırılır. Bu üç damar türü birlikte bir ağ oluşturur: atardamarlar organa kan getirir, kılcal damarlar dokuyu besler, toplardamarlar kanı geri taşır. Damar yapısındaki bu farklılık, görev farklılığının doğrudan sonucudur.",
        "**Kan**, plazma adı verilen sıvı içinde dağılmış hücrelerden oluşur. **Alyuvarlar** (kırmızı kan hücreleri) oksijen taşır; içlerindeki **hemoglobin** demir içeren bir protein olup oksijene bağlanarak kana kırmızı rengini verir. **Akyuvarlar** (beyaz kan hücreleri) vücudu mikroplara karşı savunur ve bağışıklıkta görev alır. **Kan pulcukları** (trombositler) ise kanamayı durduran pıhtılaşmayı sağlar. Plazma; su, besin maddeleri, hormonlar, atık ürünler ve proteinler taşır. Kanın görevleri arasında oksijen ve besin taşımak, karbondioksit ve üre gibi atıkları boşaltım organlarına götürmek, vücut sıcaklığını düzenlemeye yardımcı olmak ve hastalıklara karşı savunma yapmak sayılabilir. Yetişkin bir insanda yaklaşık 4,5-6 litre kan bulunur ve bu kanın yaklaşık yarısından fazlası plazmadır.",
        "Dolaşım iki ayrı devreden oluşur. **Küçük kan dolaşımı** (akciğer dolaşımı), kalbin sağ karıncığından çıkan kanın akciğerlere gidip orada oksijen alması ve kalbin sol kulakçığına dönmesiyle tamamlanır. Bu devre kısa ve düşük basınçlıdır; amacı kanın temizlenmesi, yani oksijen kazanması ve karbondioksitten arınmasıdır. **Büyük kan dolaşımı** (sistemik dolaşım), kalbin sol karıncığından çıkan temiz kanın tüm vücuda dağılıp organlarda oksijen ve besin bırakması, kirlenen kanın toplardamarlarla kalbin sağ kulakçığına dönmesiyle tamamlanır. Bu devre uzun ve yüksek basınçlıdır. İki devrenin birleştiği nokta kalptir; kan bir devreyi bitirip diğerine geçerken iki kez kalpten geçer. Bu düzen, oksijenden zengin ve yoksun kanın karışmasını büyük ölçüde önler.",
        "Kan dolaşımının keşfi, tıp tarihinin en önemli dönüm noktalarından biridir. 2. yüzyılda **Galen**, kanın karaciğerde üretilip vücutta tüketildiğini ve kalpte gözenekler aracılığıyla geçtiğini öne sürmüştü; bu görüş 1400 yıl boyunca kabul gördü. 13. yüzyılda yaşayan **İbnü'n Nefîs**, kalbin septumunda gözenek bulunmadığını ve kanın akciğerler üzerinden geçtiğini açıklayarak küçük dolaşımı tanımladı; bu, deneysel değil gözleme dayalı bir açıklamaydı ancak modern bilgiyle uyuşur. 1628'de **William Harvey**, damarların yönünü ve kalbin pompalama işlevini deneylerle göstererek kanın sürekli dolaştığını kanıtladı. 1661'de **Marcello Malpighi**, mikroskopla kılcal damarları görerek atardamar ve toplardamar arasındaki bağı doğruladı. Bu zincir, bir görüşün nasıl ölçüm ve gözlemle değiştiğini gösterir; İbnü'n Nefîs'in gözlemi ile Harvey'in deneyi aynı sorunun farklı aşamalarında ilerledi."
      ],
      "blockLabels": [
        "KALBİN YAPISI",
        "DAMARLAR",
        "KANIN GÖREVLERİ",
        "KÜÇÜK VE BÜYÜK DOLAŞIM",
        "BİLİM İNSANLARI VE TARİH"
      ],
      "points": [
        "Dolaşım sistemi kalp, damarlar ve kandan oluşur.",
        "Kalpte kulakçıklar kanı toplar, karıncıklar pompalar; sol karıncık daha kalın kaslıdır.",
        "Atardamarlar kalpten, toplardamarlar kalbe taşır; alışveriş kılcal damarlarda olur.",
        "Küçük dolaşım akciğerlerde temizlenmeyi, büyük dolaşım vücuda dağıtımı sağlar.",
        "İbnü'n Nefîs küçük dolaşımı, Harvey kanın sürekli dolaştığını göstermiştir."
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
      "visualNote": "Görsel, sağlık çalışanının gözetiminde alınan bir kan bağışını gösterir; alınan kan bileşenlerine ayrılarak farklı hastalarda kullanılır.",
      "focus": "Kan bağışının toplumsal yararını ve sürecini; dolaşım sistemi sağlığını korumaya yönelik davranışları ve risk etkenlerini açıklar.",
      "summary": [
        "Kan, laboratuvarda tam olarak üretilemeyen bir dokudur; bu nedenle tedavi için gereken kan yalnızca bağış yoluyla sağlanır. **Kan bağışı**, sağlıklı bir yetişkinden belirli aralıklarla kan alınmasıdır. Bağışın temeli **gönüllülüktür**; hiç kimse bağışa zorlanamaz. Bir bağış işlemi yaklaşık 10-15 dakika sürer, alınan miktar yaklaşık 450 mililitredir ve vücut bu sıvıyı birkaç gün içinde yerine koyar. Bağıştan önce bağışçının sağlık durumu, hemogram değerleri ve bulaşıcı hastalık riskleri değerlendirilir; bu tarama hem bağışçının hem alıcının güvenliğini korur. Alınan kanın **kan bileşenleri** ayrı ayrı kullanılır: alyuvarlar, plazma ve trombositler farklı hastalara verilebilir. Böylece tek bir bağış birden çok hastaya yarar sağlar. Kanın raf ömrü sınırlıdır; alyuvarlar yaklaşık 35-42 gün saklanabildiği için bağışın düzenli olması gerekir.",
        "Kan bağışı, acil durumlardan kronik hastalıklara kadar geniş bir alanda hayat kurtarır. Trafik kazası, ameliyat, doğum sonrası kanama ve yanık gibi durumlarda hızlı kan ihtiyacı doğar. Lösemi, talasemi ve bazı kansızlık türlerinde ise hastalar düzenli transfüzyona bağımlıdır. Kan ürünleri ayrıca pıhtılaşma bozuklukları ve bağışıklık yetersizliği tedavisinde kullanılır. Türkiye'de kan temini **Kızılay** aracılığıyla yürütülür; bağışçı sayısının artması, acil durumlarda kan bulunabilirliğini doğrudan etkiler. Bağış yapmak bağışçı için de yararlıdır: işlem öncesi yapılan sağlık taraması, kişinin kan değerlerini ve genel sağlığını öğrenmesini sağlar. Ancak asıl kazanç toplumsaldır; kan bağışı **toplumsal dayanışmanın** en somut örneklerinden biridir ve düzenli bağış alışkanlığı kan stoklarının yıl boyunca yeterli kalmasını sağlar.",
        "Dolaşım sağlığını korumak, kalp ve damar hastalıklarının riskini azaltır. Bu hastalıkların başlıca etkenleri arasında hareketsiz yaşam, aşırı tuz ve doymuş yağ tüketimi, sigara, aşırı kilo, stres ve düzensiz uyku bulunur. **Hipertansiyon** (yüksek tansiyon) damarlara sürekli baskı uygulayarak zamanla hasar verir; çoğu zaman belirti vermeden ilerlediği için düzenli ölçüm önemlidir. **Ateroskleroz**, damar içinde yağ ve kolesterol birikmesiyle damarın daralmasıdır ve kalp krizi ile inme riskini artırır. Düzenli hareket kalbi güçlendirir, tuz alımını sınırlamak kan basıncını dengeler, sigara bırakmak damar sağlığını hızla iyileştirir. Sebze, meyve, tam tahıl ve balık ağırlıklı beslenme; şekerli içeceklerden ve işlenmiş gıdalardan uzak durmak koruyucudur. Bu değişiklikler ilaç tedavisi gerektiren durumlarda bile sürecin parçasıdır. Sağlıkla ilgili bilgiler **güvenilir kaynaklardan**, özellikle Sağlık Bakanlığı ve yetkili sağlık kuruluşlarının yayınlarından edinilmelidir.",
        "Dolaşım sağlığını izlemenin basit göstergeleri vardır: dinlenme nabzı, kan basıncı, bel çevresi ve düzenli kan değerleri. Nabzın dinlenmede sürekli yüksek olması ya da kan basıncının 140/90 mmHg'nin üzerinde seyretmesi bir sağlık kuruluşuna başvurmayı gerektirir. Göğüs ağrısı, nefes darlığı, bacaklarda şişme ve ani baş dönmesi gibi belirtiler ihmal edilmemelidir. İlk yardım açısından da dolaşım bilgisi kritiktir: bilinci kapalı ve solunumu durmuş bir kişide erken **kalp masajı** ve suni solunum, beyin hasarını önlemede belirleyicidir. Türkiye'de 112 acil hattı aranarak profesyonel yardım istenmelidir. Toplumda temel yaşam desteği eğitiminin yaygınlaşması, ani kalp durması vakalarında hayatta kalma oranını artırır.",
        "Dolaşım sisteminin anlaşılması, anatomik gözlem ile deneysel yöntemin birleşmesiyle ilerledi. 13. yüzyılda **İbnü'n Nefîs**, küçük dolaşımı tanımlayarak kanın akciğerlerden geçtiğini gösterdi. 1628'de **William Harvey**, kanın miktarı ve dolaşım süresi üzerine yaptığı hesaplarla kanın sürekli dolaştığını kanıtladı. 1661'de **Marcello Malpighi**, mikroskopla kılcal damarları görüntüledi. 17. yüzyılda **Jean-Baptiste Denys** hayvan kanıyla ilk nakil denemelerini yaptı; bu denemeler başarısız oldu ancak kan grupları bilinmediği için neden başarısız oldukları ancak 20. yüzyılda anlaşıldı. 1901'de **Karl Landsteiner**, kan gruplarını (A, B, AB, 0) keşfederek güvenli naklin önünü açtı; bu buluş için 1930'da Nobel Ödülü aldı. Bu zincir, bir uygulamanın (kan nakli) ancak temel bir bilgi (kan grupları) elde edildikten sonra güvenli hâle gelebildiğini gösterir."
      ],
      "blockLabels": [
        "KAN BAĞIŞI",
        "BAĞIŞIN TOPLUMSAL YARARI",
        "DOLAŞIM SAĞLIĞI",
        "İZLEME VE İLK YARDIM",
        "BİLİM İNSANLARI VE TARİH"
      ],
      "points": [
        "Kan laboratuvarda üretilemez; tedavi için gereken kan bağışla sağlanır.",
        "Bağış öncesi sağlık taraması hem bağışçıyı hem alıcıyı korur.",
        "Kan bileşenlerine ayrılarak birden çok hastada kullanılabilir.",
        "Hareketsizlik, tuzlu beslenme ve sigara dolaşım hastalığı riskini artırır.",
        "Landsteiner kan gruplarını keşfederek güvenli kan naklini mümkün kılmıştır."
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
        "intro": "Bağış konusunda farkındalık oluşturmak için kan ve organ bağışının toplumsal katkısını ve güvenli işleyişini araştırmak bu haftanın görevidir. Sonuç, sürecin gönüllülük ve güvenlik üzerine kurulu olduğunu gösterir.",
        "items": [
          {
            "name": "Kan bağışı",
            "role": "Gönüllü kan bağışı, ameliyat, kaza veya bazı tedavilerde kana ya da kan bileşenlerine gereksinim duyan kişilere destek olabilir. Bağışlanan kan yetkili sağlık kuruluşlarında kontrol edilir, uygun biçimde işlenir ve saklanır."
          },
          {
            "name": "Uygunluk ve güvenlik",
            "role": "Bağış yapıp yapamayacağına kişinin sağlık durumu ve güncel resmî ölçütler doğrultusunda sağlık personeli karar verir. Yaş ve kilo ölçütleri zaman içinde değişebildiği için başvuru sırasında yetkili kurumun güncel bilgisi esas alınır."
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
        "takeaway": "Farkındalık çalışmasının temel sonucu: bağış yaşam kurtarabilir; güvenli tarama, güncel resmî bilgi, gönüllülük ve adil tıbbi değerlendirme sürecin vazgeçilmez parçalarıdır."
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
      "visualNote": "Görsel, burundan başlayıp yutak, gırtlak, soluk borusu ve bronşlarla akciğerlere ulaşan hava yolunu gösterir; gaz alışverişi akciğerlerin içindeki alveollerde yapılır.",
      "focus": "Solunum sisteminin organlarını, diyaframın görevini ve gaz alışverişinin alveollerde gerçekleşmesini; solunum sağlığını koruma yollarını açıklar.",
      "summary": [
        "**Solunum sistemi**, vücuda oksijen alınmasını ve karbondioksitin dışarı verilmesini sağlar. Hava sırasıyla **burun**, **yutak**, **gırtlak**, **soluk borusu**, **bronşlar** ve **akciğerler**den geçer. Burun boşluğundaki kıllar ve salgılar havayı temizler, nemlendirir ve ısıtır. Gırtlak, ses tellerini barındırır ve soluk borusunu korur; yutma sırasında gırtlak kapağı (epiglot) soluk yolunu kapatarak besinin yemek borusuna gitmesini sağlar. Soluk borusu, C biçimindeki kıkırdak halkalarla desteklenir ve iç yüzeyindeki tüylerle toz tutar. **Bronşlar** soluk borusunu ikiye ayırarak akciğerlere girer; her akciğerde bronşlar giderek incelen **bronşçuklara** ayrılır ve sonunda milyonlarca hava kesesine ulaşır. Bu keselere **alveol** denir; çevreleri kılcal damarlarla sarılıdır ve duvarları tek katman hücreden oluşur. Gaz alışverişi burada gerçekleşir: oksijen alveolden kana, karbondioksit kandan alveole geçer.",
        "Soluk alıp verme, kasların ve **diyaframın** çalışmasıyla gerçekleşir. Diyafram, göğüs boşluğunu karın boşluğundan ayıran kubbemsi kastır. Soluk alırken diyafram kasılır ve düzleşir, kaburgalar arası kaslar göğüs kafesini genişletir; göğüs boşluğunun hacmi artar, iç basınç düşer ve hava akciğerlere dolar. Soluk verirken diyafram gevşeyerek kubbeleşir, göğüs kafesi daralır ve hava dışarı çıkar. Bu nedenle soluk alma aktif, soluk verme büyük ölçüde pasif bir süreçtir. Dinlenme hâlinde dakikada yaklaşık 12-20 soluk alınır; egzersiz sırasında hem solunum hızı hem derinliği artar. Solunum hızı, kandaki karbondioksit düzeyine göre beyin sapındaki merkez tarafından düzenlenir; bu yüzden nefesimizi bir süre tuttuğumuzda kendiliğinden derin bir soluk alma isteği duyarız.",
        "Gaz alışverişinin verimliliği, alveollerin toplam yüzey alanına bağlıdır. Yaklaşık 300 milyon alveol, bir tenis kortu büyüklüğüne yakın bir yüzey oluşturur; bu geniş alan, oksijenin kana hızla geçmesini sağlar. Alveol duvarı ile kılcal damar duvarı arasındaki geçiş bölgesi çok incedir, bu da difüzyonu kolaylaştırır. Oksijen kanda büyük ölçüde hemoglobinle taşınırken karbondioksit plazmada ve alyuvarlarda taşınır. Akciğerlerin kendisi kasılmaz; hareketi sağlayan göğüs kafesi ve diyaframdır. Akciğer dokusunun esnekliği, soluk verme sırasında akciğerlerin kendiliğinden büzülmesine yardımcı olur. Sigara dumanı alveollerin esnekliğini bozar, tüylerin temizleme işini felce uğratır ve zamanla **amfizem** ile **kronik bronşit** gibi hastalıklara yol açar.",
        "Solunum sağlığını korumak için **zararlı madde** içeren tütün ürünlerinden uzak durmak ve **temiz hava** solumak ilk adımdır; pasif içicilik de aynı derecede zararlıdır. Hava kirliliğinin yoğun olduğu günlerde açık havada uzun süre kalmamak, kapalı ortamları düzenli havalandırmak ve maske kullanmak koruyucudur. Düzenli egzersiz, solunum kaslarını güçlendirir ve akciğer kapasitesini artırır. Üst solunum yolu enfeksiyonları sık görüldüğü için el temizliği ve kalabalık ortamlarda önlem önemlidir. Astım gibi kronik hastalıklarda tetikleyicilerden (toz, polen, kimyasal buhar) kaçınmak ve ilaçları düzenli kullanmak gerekir. Sürekli öksürük, nefes darlığı, göğüste sıkışma ya da balgamda kan gibi belirtiler vakit kaybetmeden değerlendirilmelidir. Bağımlılık yapan maddelerle mücadelede **Yeşilay**, koruyucu eğitim ve danışmanlık hizmetleri sunar.",
        "Solunumun anlaşılması, gazların ölçülmesine dayanan deneylerle ilerledi. 17. yüzyılda **Robert Boyle**, gazların hacim ve basınç ilişkisini ortaya koyarak solunumun fiziksel temelini hazırladı. 18. yüzyılda **Joseph Priestley**, oksijeni elde ederek yanma ve solunumun aynı gazla ilişkili olduğunu gösterdi. **Antoine Lavoisier**, solunumun yavaş bir yanmaya benzediğini ve karbondioksit ürettiğini ölçümlerle açıkladı; bu, solunumun kimyasal bir süreç olduğunu ortaya koydu. 19. yüzyılda **Claude Bernard**, iç ortamın dengede tutulmasında gaz alışverişinin rolünü inceledi. 20. yüzyılda **Willem Einthoven**'ın geliştirdiği ölçüm yöntemleri ve görüntüleme teknikleri, göğüs hastalıklarının tanısını ilerletti. Bugün solunum fonksiyon testleri, akciğer kapasitesini sayısal olarak ölçerek tanı ve tedaviye yol gösterir."
      ],
      "blockLabels": [
        "SOLUNUM ORGANLARI",
        "SOLUK ALIP VERME",
        "GAZ ALIŞVERİŞİ",
        "SOLUNUM SAĞLIĞI",
        "BİLİM İNSANLARI VE TARİH"
      ],
      "points": [
        "Solunum yolu burun, yutak, gırtlak, soluk borusu, bronşlar ve akciğerlerden oluşur.",
        "Diyafram kasılınca düzleşir, göğüs hacmi artar ve hava içeri girer.",
        "Gaz alışverişi alveollerde gerçekleşir; alveol yüzeyi çok geniştir.",
        "Oksijen hemoglobinle, karbondioksit plazma ve alyuvarlarla taşınır.",
        "Sigara alveol esnekliğini bozar; pasif içicilik de zararlıdır."
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
        "intro": "Solunum sağlığını koruma yollarını araştırmak bu haftanın görevidir. Sonuçlar, kişisel alışkanlıkları ve çevre koşullarını birlikte ele alır.",
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
        "takeaway": "Araştırma sonucu: solunum sağlığı için temiz hava, dumansız ortam, uygun havalandırma ve çevresel kirleticilerin azaltılması birlikte ele alınmalıdır."
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
      "visualNote": "Görsel, böbrekleri, üreterleri, idrar kesesini ve üretrayı gösterir; kan böbreklerde süzülür, oluşan idrar üreterle keseye taşınır ve üretradan dışarı atılır.",
      "focus": "Bağımlılık yapan maddelerin solunum ve dolaşım üzerindeki etkilerini; boşaltım sisteminin organlarını ve süzülme sürecini açıklar.",
      "summary": [
        "**Bağımlılık**, bir maddenin ya da davranışın kullanımının kontrolünü yitirme, onsuz yapamama ve olumsuz sonuçlara rağmen sürdürme durumudur. Sigara, alkol ve uyuşturucu maddeler bağımlılık yapar; bunların ortak özelliği, beyindeki ödül sistemini doğrudan etkileyerek tekrarlama isteği oluşturmasıdır. Sigara dumanında nikotin, katran ve karbonmonoksit bulunur. **Nikotin** bağımlılığın temel nedenidir ve damarları daraltarak kalp hızını ve tansiyonu yükseltir. **Katran** solunum yollarında birikerek tüylerin temizleme işini bozar ve akciğer kanseri riskini artırır. **Karbonmonoksit** hemoglobinin oksijen taşıma kapasitesini azaltır; bu nedenle sigara içenlerin dokuları daha az oksijen alır. Alkol, karaciğer ve sinir sistemi üzerinde kalıcı hasar bırakabilir; uyuşturucular ise bilinç, algı ve davranış üzerinde denetimi kaybettirir. Sigara hem **solunum sağlığını** hem **dolaşım sağlığını** bozar. Bağımlılık bir irade sorunu değil, tedavi edilebilir bir sağlık sorunudur.",
        "Bağımlılıkla mücadelede önleme, tedaviden daha etkilidir. Merak ve arkadaş baskısı, ergenlik döneminde başlamanın en yaygın nedenleri arasındadır; bu nedenle “hayır” demeyi öğrenmek, riskli ortamlardan uzak durmak ve güvenilir yetişkinlerle konuşmak koruyucudur. Türkiye'de **Yeşilay**, bağımlılık türleriyle ilgili eğitim, danışmanlık ve rehabilitasyon desteği sunar; 115 hattı üzerinden danışmanlık alınabilir. Sigarayı bırakmada ilk günlerde yoksunluk belirtileri görülebilir; bu belirtiler zamanla azalır ve vücut kendini onarmaya başlar. Kan dolaşımı bırakmadan sonraki saatlerde, akciğer kapasitesi ise haftalar içinde belirgin biçimde iyileşir. Bağımlılığın tedavisinde tıbbi destek, psikolojik danışmanlık ve sosyal destek birlikte kullanılır; tek başına iradeye bırakılan bırakma denemeleri daha sık başarısız olur.",
        "**Boşaltım sistemi**, hücrelerde oluşan atık maddelerin vücuttan uzaklaştırılmasını sağlar. En önemli organ **böbreklerdir**; karın boşluğunun arka duvarında, bel hizasında iki tanedir. Böbrekler kanı sürekli süzer; günde yaklaşık 180 litre sıvı süzülür, bunun büyük bölümü geri emilir ve yaklaşık 1,5 litre **idrar** oluşur. **Nefron**, böbreğin süzme birimidir; her böbrekte yaklaşık bir milyon nefron bulunur. Nefronlarda önce süzülme, sonra geri emilim ve son olarak salgılama gerçekleşir. Bu üç aşama sayesinde vücut, su ve tuz dengesini korurken üre ve fazla iyonları uzaklaştırır. Oluşan idrar, **üreter** ile idrar kesesine (**mesane**) taşınır ve **üretra** yoluyla dışarı atılır.",
        "Boşaltıma yardımcı organlar da katkı sağlar. **Akciğerler** karbondioksit ve bir miktar suyu, **deri** terle su ve tuzu, **karaciğer** ise protein yıkımı sonucu oluşan amonyağı daha az zararlı olan **üreye** çevirerek böbreklere gönderir; safra yoluyla da atık maddeleri bağırsağa iletir. Bu nedenle boşaltım yalnızca idrar üretmek değildir; birden çok organın paylaştığı bir görevdir. **Homeostazi**, yani **iç denge**, vücudun iç ortamının (su, tuz, sıcaklık, pH) belirli sınırlar içinde tutulmasıdır ve boşaltım sistemi bunun merkezindedir. Yeterli su içmemek idrarı yoğunlaştırır, böbrek taşı ve idrar yolu enfeksiyonu riskini artırır. Aşırı tuzlu beslenme ise kan basıncını yükselterek böbrekleri yorar.",
        "Boşaltım ve sağlık bilgisi, anatomi gözlemlerinden modern fizyolojiye uzanan bir çizgide gelişti. 10. yüzyılda yaşayan **Zehrâvî**, cerrahi aletleri ve yöntemleri tanımlayan eserinde idrar yollarına ilişkin uygulamaları da ele aldı; eserleri yüzyıllarca Avrupa'da temel başvuru kaynağı olarak okutuldu. 15. yüzyılda **Sabuncuoğlu Şerefeddin**, Anadolu'da yazdığı cerrahi kitabında aletleri resimlerle gösterdi ve uygulamaları ayrıntılı biçimde anlattı. 17. yüzyılda **Marcello Malpighi**, mikroskopla böbrek yapısını inceleyerek süzme birimlerinin varlığını gösterdi. 19. yüzyılda **William Bowman**, böbrekteki süzme yapısını tanımladı ve bugün onun adıyla anılan kapsül, nefronun temel parçası olarak bilinir. Bu katkılar, bir organın işlevinin ancak yapısının ayrıntılı biçimde görülmesiyle anlaşılabildiğini gösterir; mikroskop bu geçişin en belirleyici aracı oldu."
      ],
      "blockLabels": [
        "BAĞIMLILIK",
        "BAĞIMLILIKLA MÜCADELE",
        "BOŞALTIM SİSTEMİ",
        "BOŞALTIMA YARDIMCI ORGANLAR",
        "BİLİM İNSANLARI VE TARİH"
      ],
      "points": [
        "Bağımlılık, kullanım denetiminin yitirilmesi ve olumsuz sonuçlara rağmen sürmesidir.",
        "Nikotin damarları daraltır, katran solunum yollarını bozar, karbonmonoksit oksijen taşınmasını azaltır.",
        "Böbrekler kanı süzerek üre ve fazla iyonları idrarla uzaklaştırır.",
        "Nefronda süzülme, geri emilim ve salgılama aşamaları gerçekleşir.",
        "Karaciğer amonyağı üreye çevirir; deri ve akciğerler de boşaltıma katkı verir."
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
        "intro": "Solunum sağlığını koruma konusunda farkındalık oluşturmak bu haftanın görevidir. Bu araştırma sonucu, bağımlılık ve dumansız yaşam başlıklarını bilgi temelli biçimde ele alır.",
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
            "role": "Farkındalık çalışması doğru bilgiyi, dumansız ortamları ve yardım alınabilecek güvenilir yetişkin/kurumları tanıtır. Yeşilay, bağımlılıkla mücadele ve bilgilendirme alanında başvurulabilecek kurumlardan biridir."
          },
          {
            "name": "İletişim ilkesi",
            "role": "Kişiyi suçlayan veya damgalayan dil yardım istemeyi zorlaştırabilir. Saygılı, kanıta dayalı ve destekleyici iletişim hem bilgiyi anlaşılır kılar hem de mahremiyeti korur."
          }
        ],
        "takeaway": "Araştırma sonucu: etkili farkındalık, korkutucu ya da yargılayıcı sloganlar yerine doğrulanmış bilgi, dumansız ortam ve güvenilir destek yollarını birlikte sunar."
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
      "visualNote": "Görsel, sindirim, dolaşım, solunum ve boşaltım sistemlerini bir arada gösterir; besin, oksijen ve atıklar bu dört sistemin ortak dolaşımıyla taşınır.",
      "focus": "Boşaltım sağlığını koruma yollarını; sindirim, dolaşım, solunum ve boşaltım sistemlerinin birlikte çalışmasını ve bu bilginin sağlıklı yaşamla ilişkisini açıklar.",
      "summary": [
        "**Böbrek sağlığını** korumak, böbreklerin yükünü azaltan günlük alışkanlıklarla başlar. Günde yaklaşık 1,5-2 litre su içmek idrarın yoğunlaşmasını önler ve böbrek taşı riskini azaltır; sıcak havada ve egzersiz sırasında bu miktar artar. Aşırı tuzlu beslenme kan basıncını yükselterek böbrek damarlarını yorar; bu nedenle tuz alımını sınırlamak koruyucudur. Ağrı kesici ve benzeri ilaçların doktor önerisi olmadan, özellikle uzun süre kullanılması böbreklere zarar verebilir. İdrarı uzun süre tutmak idrar yolu enfeksiyonu riskini artırır; düzenli boşaltım alışkanlığı edinmek gerekir. İdrar rengindeki koyulaşma, idrarda kan, yanma, sık idrara çıkma ve bel ağrısı gibi belirtiler değerlendirilmelidir. **Organ bağışı**, böbrek yetmezliği gibi durumlarda nakil imkânı sağladığı için boşaltım sağlığıyla doğrudan ilişkilidir; Türkiye'de beyin ölümü gerçekleşen kişilerden aile onayıyla nakil yapılabilmektedir.",
        "Vücut, tek tek organların toplamı değil, birbirine bağımlı sistemlerin bütünüdür. Sindirim sistemi besinleri küçük moleküllere ayırır ve kana verir; dolaşım sistemi bu molekülleri ve oksijeni hücrelere taşır; solunum sistemi kanı oksijenle yükler ve karbondioksiti uzaklaştırır; boşaltım sistemi ise hücrelerde oluşan atıkları kandan süzer. Hücrelerle kan arasındaki **madde alışverişi** kılcal damarlarda gerçekleşir; **atık madde**ler ise boşaltım organlarına taşınır. Bir sistemdeki aksama diğerlerini etkiler: sindirim yeterli olmadığında hücrelere besin gitmez ve enerji üretimi düşer; solunum yetersiz olduğunda kan yeterince oksijen taşıyamaz ve dolaşım zorlanır; böbrekler çalışmadığında kanda biriken atıklar tüm organları etkiler. Bu karşılıklı bağımlılık, sağlığın bir bütün olarak ele alınması gerektiğini gösterir. **Homeostazi** dediğimiz iç denge, bu sistemlerin eşgüdümüyle korunur.",
        "Sistemlerin eşgüdümünü bir gün içindeki sıradan bir olayla izlemek mümkündür. Yemek yendiğinde sindirim başlar, kana geçen glikoz düzeyi yükselir; pankreas hormon salgılayarak bu düzeyi dengeler. Yürüyüşe çıkıldığında kaslar daha çok oksijen ister, solunum hızlanır ve kalp daha hızlı pompalar; terleme ile vücut sıcaklığı düzenlenir ve kaybedilen su böbreklerin idrar miktarını azaltmasıyla dengelenir. Bu düzenlemeler bilinçli çabayla değil, sinir ve hormon sistemlerinin geri bildirimiyle gerçekleşir. Geri bildirim, bir değişikliğin algılanıp düzeltici yanıt üretilmesidir. Sistemler arası bu denge, dış koşullar değişse bile iç ortamın belirli sınırlarda kalmasını sağlar; dengenin bozulması hastalık belirtilerinin ortaya çıkmasıyla sonuçlanır.",
        "Sağlıklı yaşam, bu bilginin günlük davranışa dönüşmesidir. Dengeli beslenme, düzenli hareket, yeterli uyku, yeterli su, tütün ve alkolden uzak durmak ve **hijyen** kurallarına (el ile gıda temizliğine) özen göstermek dört sistemi birlikte korur. Egzersiz hem solunum kapasitesini hem kalp gücünü artırır, sindirim ve boşaltım işleyişini destekler. Aşılanma, bulaşıcı hastalıklara karşı toplumsal koruma sağlar. Sağlık okuryazarlığı da en az bu alışkanlıklar kadar önemlidir: belirtileri tanımak, ne zaman sağlık kuruluşuna başvurulacağını bilmek ve **sağlık kaynağı** olarak yetkili kurumların bilgisine ulaşmak gerekir. Bu ünitede öğrenilenler, bedenin bir makine gibi değil, sürekli dengelenen bir sistemler bütünü olduğunu gösterir.",
        "Bu bilgi birikimi, farklı çağlarda ve coğrafyalarda çalışan hekimlerin ve bilim insanlarının katkısıyla oluştu. 10. yüzyılda **Zehrâvî**, cerrahi aletleri çizimleriyle tanıtarak uygulamalı tıbbın temelini attı. 11. yüzyılda **İbn Sina**, tıbbı sistemli bir bütün olarak ele alan eseriyle yüzyıllarca temel kaynak oldu. 13. yüzyılda **İbnü'n Nefîs**, küçük dolaşımı tanımladı. 15. yüzyılda **Sabuncuoğlu Şerefeddin**, Anadolu'da cerrahi bilgisini resimli bir eserle kayda geçirdi. 17. yüzyılda **William Harvey** kan dolaşımını, **Marcello Malpighi** ise mikroskopla kılcal damarları ve böbrek yapısını gösterdi. 19. yüzyılda **Karl Landsteiner** kan gruplarını keşfederek güvenli nakli mümkün kıldı. Türkiye'den **Nüzhet Gökdoğan**, Cumhuriyet döneminde astronomi alanında akademik çalışmalarıyla bilime kurumsal katkı sağladı; **Alper Gezeravcı** ise 2024'te uzayda deney yapan ilk Türk astronot oldu. Bu isimler, bilimin kuşaklar boyunca biriken ve her kuşağın kendi sorusunu eklediği bir süreç olduğunu gösterir.",
        "Bu yıl boyunca uzay, kuvvet-enerji ve vücut sistemleri ünitelerinde aynı bilgi üretme yolu izlendi: önce **gözlem** yapılır, ölçümler kaydedilir ve bu kayıtlardan **kanıt** elde edilir. Kanıt, bir **açıklama**yı desteklemek ya da çürütmek için kullanılır; açıklama yeni kanıtla çeliştiğinde değiştirilir. Karmaşık sistemleri anlamak için **bilimsel model** kurulur; model, gerçeğin kendisi değil, temel ilişkileri öne çıkaran sadeleştirilmiş bir temsildir. Dolaşım şeması da bir modeldir, bir gezegenin yörünge çizimi de; her modelin hangi ayrıntıyı dışarıda bıraktığını bilmek yorumu güvenilir kılar. **Bilim tarihi**, bu modellerin nasıl değiştiğini gösterir: kanın vücutta tüketildiği görüşü, İbnü’n Nefîs’in gözlemi ve Harvey’in deneyleriyle yerini dolaşım bilgisine bıraktı. Aynı yöntem kendi öğrenmemizi değerlendirmek için de kullanılır: bir açıklamayı hangi kanıta dayandırdığımızı yazmak, **öz değerlendirme** yapmanın en somut yoludur."
      ],
      "blockLabels": [
        "BÖBREK SAĞLIĞI",
        "SİSTEMLERİN BİRLİKTE ÇALIŞMASI",
        "GÜN İÇİNDE DENGE",
        "SAĞLIKLI YAŞAM",
        "BİLİM İNSANLARI VE TARİH",
        "BİLİMSEL BİLGİ VE YIL SONU"
      ],
      "points": [
        "Yeterli su, sınırlı tuz ve düzenli boşaltım alışkanlığı böbrek sağlığını korur.",
        "İlaçların doktor önerisi olmadan kullanılması böbreklere zarar verebilir.",
        "Sindirim, dolaşım, solunum ve boşaltım sistemleri birbirine bağımlı çalışır.",
        "Homeostazi, iç ortamın geri bildirimle dengede tutulmasıdır.",
        "Dengeli beslenme, hareket ve temizlik dört sistemi birlikte korur."
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
        "intro": "Boşaltım sisteminin sağlığını korumayı güvenilir kaynaklardan araştırıp raporlaştırmak bu haftanın görevidir. Temel bulgular şöyledir:",
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
        "takeaway": "Araştırma sonucu: boşaltım sistemi sağlığı tek bir yiyecek ya da su miktarına bağlanmaz; dengeli yaşam, kişiye uygun sıvı dengesi, hareket, hijyen ve güvenilir sağlık desteği birlikte düşünülür."
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
