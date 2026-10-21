/*
 * 7. sınıf Fen Bilimleri için özgün, ders kitabı temelli haftalık konu akışı.
 * Başlıklar ve sayfa aralıkları MEB Fen Bilimleri 7. Sınıf Ders Kitabı, 1. Kitap'tan
 * (2026) alınan içerik haritasına dayanır; anlatım, sorular ve çizimler bu uygulama için özgün hazırlanmıştır.
 */
(() => {
  'use strict';

  const units = [
    { id: 'space', number: 1, title: 'Uzay Çağı', pages: '14–52' },
    { id: 'energy', number: 2, title: 'Kuvvet ve Enerjiyi Keşfedelim', pages: '58–81' },
    { id: 'systems', number: 3, title: 'Vücudumuzdaki Sistemler', pages: '88–148' },
  ];

  const weeks = [
    {
      id: 1, date: '14–18 Eyl', unitId: 'space', topic: 'Uzay araştırmalarına giriş ve gözlem soruları', pages: '14–15', visual: 'space', visualNote: "Uydu, yeryüzünden veri toplayan veya veri ileten bir araçtır. Görselde görülen özellik ile o özelliğe ilişkin yorumunu ayrı tut.",
      focus: "Bir uzay araştırmasının merak sorusundan gözleme, ölçüme ve kanıta nasıl ilerlediğini açıkla.",
      summary: [
        "Uzay nedir? Ders kitabı uzayı, Dünya dışında kalan gök cisimlerinin bulunduğu büyük boşluk olarak tanımlar. Yıldızlar, gezegenler, uydular ve aralarındaki uzaklıklar bu ortamın parçalarıdır. Evren daha kapsayıcı kavramdır: uzayı ve içindeki tüm gök cisimlerini, galaksileri ve yapıları birlikte düşünür. Uzay araştırması, bu yapı ve olaylar hakkında gözlem ve ölçümle bilgi aramaktır.",
        "Araştırma bir merak sorusuyla başlar. Örneğin “Bulutlar hangi yönde ilerliyor?” sorusu, görüntü veya ölçüm verisinin ne zaman ve nerede toplanacağını belirlemeye yardım eder. Araştırmacı uygun araçla veri toplar, gözlemleri kaydeder, benzer verileri karşılaştırır ve açıklamasını kanıtla sınar; yeni kanıt önceki fikri değiştirebilir.",
        "Kitabın ilk sayfaları daha önce öğrenilen yansıma bilgisini hatırlatır; ardından Türksat 6A haberiyle uzay çalışmalarının haberleşme, hava gözlemi ve konum bulma gibi alanlardaki yerini sorar. Uzay teknolojilerine geçmeden önce “bu araştırma hangi soruya yanıt arıyor?” diye düşünmek, araç seçimini anlamlı kılar.",
        "Bir görüntüde doğrudan seçilebilen özelliği gözlem, o özelliğin nedenine ilişkin açıklamayı çıkarım olarak yaz. Uydu görüntüsü yeryüzünün belirli bir andaki görünüşüne kanıt sağlar; tek başına bütün nedenleri açıklamaz. Görselin tarihi, kaynağı ve ölçüm türü de yorumun parçasıdır."
      ],
      termDefinitions: [
        {
          "term": "Uzay",
          "definition": "Dünya dışındaki gök cisimlerinin ve aralarındaki büyük boşluğun bulunduğu ortam.",
          "connection": "Uzay araştırması, bu ortamın içindeki cisim ve olayları gözlemleyip ölçerek evreni anlamaya yarayan kanıtlar üretir."
        },
        {
          "term": "Evren",
          "definition": "Uzayı, galaksileri ve içlerindeki tüm gök cisimlerini kapsayan en geniş bütün.",
          "connection": "Evren daha kapsayıcı kavramdır: uzayı ve içindeki tüm gök cisimlerini, galaksileri ve yapıları birlikte düşünür."
        },
        {
          "term": "Uzay araştırması",
          "definition": "Uzaydaki cisim ve olaylar hakkında gözlem, ölçüm ve kanıtla bilgi arama çalışması.",
          "connection": "Uzay araştırması, bu yapı ve olaylar hakkında gözlem ve ölçümle bilgi aramaktır."
        },
        {
          "term": "Gözlem",
          "definition": "Bir olayı duyu ya da araçlarla inceleyip fark edilen özellikleri kaydetme.",
          "connection": "Araştırmacı uygun araçla veri toplar, gözlemleri kaydeder, benzer verileri karşılaştırır ve açıklamasını kanıtla sınar; yeni kanıt önceki fikri değiştirebilir."
        },
        {
          "term": "Çıkarım",
          "definition": "Gözlem ve kanıtlardan yararlanarak bir olayın olası açıklamasını kurma.",
          "connection": "Bir görüntüde doğrudan seçilebilen özelliği gözlem, o özelliğin nedenine ilişkin açıklamayı çıkarım olarak yaz."
        }
      ],
      points: ["Araştırma sorusu gözlenebilir bir özelliğe odaklanır.", "Gözlem ile gözleme dayalı çıkarım farklıdır.", "Verinin kaynağını belirtmek açıklamayı güçlendirir."],
      terms: ['uzay araştırması', 'gözlem', 'veri', 'kanıt'],
      tasks: ['Üniteye giriş bölümünü incele; bildiğin ve merak ettiğin uzay konularını ayır.', 'Bir uydu veya teleskop görüntüsünde gözlemleyebileceğin iki özelliği yaz.', 'Bir gözlem cümlesi ile ona ait olası bir çıkarımı ayrı ayrı kur.'],
      quiz: { prompt: 'Bir bilimsel gözlemle ilgili en uygun ifade hangisidir?', options: ['Görüntüde doğrudan fark edilen özellik kaydedilir.', 'Kanıt toplamadan ilk tahmin kesin sonuç sayılır.', 'Her gözlem aynı anda bir açıklamayı kanıtlar.', 'Araştırma sorusu yalnızca kişisel görüşten oluşur.'], answer: 0, explanation: 'Gözlem, veriye dayalı olarak fark edilen özelliği kaydetmektir.', hint: 'Bir iddiayı doğrulamadan önce hangi özelliğin doğrudan görülebildiğini düşün.'},
      activity: { title: 'Bir uzay gözlemi planla', format: 'Araştırma sorusu ve gözlem çizelgesi', prompt: 'Bir uydu görüntüsünün kıyı çizgisindeki değişimi izlemek için kullanıldığını düşün. Araştırılabilecek bir soru yaz; kaydedilecek iki gözlem verisini ve bu verilerin nasıl karşılaştırılacağını belirt.', placeholder: 'Araştırma sorum… Kaydedeceğim veriler… Karşılaştırmam…', minChars: 25, criteria: ['Sınanabilir bir soru kur.', 'En az iki gözlenebilir veri belirt.', 'Verilerin nasıl karşılaştırılacağını açıkla.'], hint: 'Konu özetindeki gözlem–çıkarım ayrımını kullan; ölçülebilir bir özellik seç.' },
    },
    {
      id: 2, date: '21–25 Eyl', unitId: 'space', topic: 'Türkiye’nin uzay çalışmaları ve uydular', pages: '15–23', visual: 'space', visualNote: "Uydu görüntüsü veya sinyali yeryüzündeki çalışmalara veri sağlayabilir; görev türünü taşıdığı araçlar belirler.",
      focus: "Türkiye’nin uzay çalışmalarını uydu görevleri ve günlük yaşamda kullanılan verilerle ilişkilendir.",
      summary: [
        "Yapay uydu, Dünya’nın ya da başka bir gök cisminin çevresinde belirli bir yörüngede görev yapmak üzere insan eliyle üretilip gönderilen araçtır. Bütün uydular aynı işi yapmaz: haberleşme uyduları sinyalleri iletir, Dünya gözlem uyduları görüntü ve ölçüm toplar; bazı uydular bilimsel gözlem veya konum belirleme sistemlerinde kullanılır.",
        "Bir gözlem uydusu Dünya yüzeyinden belirli türde veri toplar ve bu veriyi yer istasyonlarına gönderir. Uzmanlar farklı tarihlerde alınan görüntüleri karşılaştırarak arazi, bulut, tarım alanı ya da afet bölgesindeki değişimleri inceleyebilir. Görüntünün çözünürlüğü, zamanı ve ölçtüğü özellik, hangi soruya yanıt verebileceğini sınırlar.",
        "Kitap Türksat uydularını haberleşme; Göktürk ve İMECE örneklerini yüksek çözünürlüklü Dünya gözlemiyle ilişkilendirir. İMECE görüntüleri doğal afet, tarım ve hedef belirleme gibi uygulamalara katkı sağlayabilir; Türksat 6A ise yerli ve millî haberleşme uydusu olarak tanıtılır. Bunlar görev türlerinin farklı olduğuna örnektir.",
        "Bir uyduyu anlatırken yalnızca adını değil; hangi yörüngede çalıştığını, hangi veriyi topladığını veya ilettiğini ve bu verinin kimlerce nasıl kullanıldığını da belirt. Kitaptaki uydu çizimleri görevleri açıklayan temsili görsellerdir; ekranda görülen uydu fotoğrafı, uydunun topladığı verinin kendisi değildir."
      ],
      termDefinitions: [
        {
          "term": "Yapay uydu",
          "definition": "Bir gezegenin ya da başka bir gök cisminin çevresindeki yörüngede görev yapan insan yapımı araç.",
          "connection": "Yapay uydu, Dünya’nın ya da başka bir gök cisminin çevresinde belirli bir yörüngede görev yapmak üzere insan eliyle üretilip gönderilen araçtır."
        },
        {
          "term": "Yörünge",
          "definition": "Bir gök cisminin veya uzay aracının başka bir cismin çevresinde izlediği yol.",
          "connection": "Yapay uydu, Dünya’nın ya da başka bir gök cisminin çevresinde belirli bir yörüngede görev yapmak üzere insan eliyle üretilip gönderilen araçtır."
        },
        {
          "term": "Haberleşme uydusu",
          "definition": "Radyo, televizyon, telefon ve benzeri iletişim sinyallerini aktarmaya yardımcı olan uydu.",
          "connection": "İMECE görüntüleri doğal afet, tarım ve hedef belirleme gibi uygulamalara katkı sağlayabilir; Türksat 6A ise yerli ve millî haberleşme uydusu olarak tanıtılır."
        },
        {
          "term": "Dünya gözlem uydusu",
          "definition": "Dünya yüzeyine veya atmosferine ilişkin görüntü ve ölçüm verileri toplayan uydu.",
          "connection": "Bu uydunun farklı tarihlerde çektiği görüntüler karşılaştırılarak arazi, tarım veya afet bölgesindeki değişim izlenebilir; görüntünün zamanı ve çözünürlüğü yorumun sınırını belirler."
        },
        {
          "term": "Uydu verisi",
          "definition": "Uydudaki algılayıcıların topladığı ve yer istasyonlarına ilettiği görüntü ya da ölçüm bilgisi.",
          "connection": "Uydu verisi önce yer istasyonuna iletilir, sonra uzmanlarca başka ölçüm ve saha bilgileriyle karşılaştırılır; bu nedenle ham görüntü tek başına neden açıklamaz."
        }
      ],
      points: ["Haberleşme ve gözlem uydularının amaçları farklıdır.", "Yörünge ve araç donanımı görevi etkiler.", "Uydu verisi değerlendirilir; tek başına açıklama değildir."],
      terms: ['yapay uydu', 'haberleşme', 'gözlem uydusu', 'uzay araştırması'],
      tasks: ['Kitaptaki Türkiye uzay çalışmaları başlığını oku ve görev türlerini not et.', 'Haberleşme ile gözlem amaçlı bir uyduyu kullanım amacı bakımından karşılaştır.', 'Uydu verisinin işe yarayacağı bir Dünya gözlemi örneği oluştur.'],
      quiz: { prompt: 'Yeryüzündeki bitki örtüsünün zaman içindeki değişimini incelemek için hangi araç daha doğrudan veri sağlar?', options: ['Dünya gözlem uydusu', 'Haberleşme uydusu', 'Uzay istasyonundaki yaşam alanı', 'Uzay roketinin fırlatma rampası'], answer: 0, explanation: 'Dünya gözlem uyduları yeryüzünün görüntü ve ölçüm verilerini toplamaya yönelik olabilir.', hint: 'Görevi, yeryüzü hakkında görüntü veya ölçüm toplamak olan aracı seç.'},
      activity: { title: 'Uydu görev kartları', format: 'Örnek olay sınıflandırma', prompt: 'Üç kısa görev kartı tasarla: birinde iletişim, birinde yeryüzünü gözlemleme, birinde bilimsel ölçüm ihtiyacı olsun. Her kart için uygun araç türünü ve seçim gerekçeni yaz.', placeholder: 'Görev 1 — araç — gerekçe…', minChars: 25, criteria: ['Üç farklı ihtiyacı ayırt et.', 'Her ihtiyacı uygun görev türüyle eşleştir.', 'Seçimini görev özelliğiyle gerekçelendir.'], hint: 'Araç adından çok, hangi veriyi topladığına veya neyi ilettiğine odaklan.' },
    },
    {
      id: 3, date: '28 Eyl–2 Eki', unitId: 'space', topic: 'Uzay araçları ve gözlem teknolojileri', pages: '16–23', visual: 'space', visualNote: "Görseldeki uyduyu araştırma araçlarından biri olarak düşün; roket, sonda ve teleskopun görevleri bundan farklıdır.",
      focus: "Roket, uydu, uzay sondası, uzay istasyonu ve teleskopu kullanım amaçlarına göre ayırt et.",
      summary: [
        "Uzay araştırmalarında kullanılan araçlar görevlerine göre ayrılır. Roket bir taşıma sistemidir; uzay aracı ve yükü yeryüzünden yörüngeye veya daha uzağa götürür. Yapay uydu yörüngede çalışır, uzay sondası robotik ölçüm yapar, teleskop gök cisimlerinden gelen ışığı toplar; uzay istasyonu ise astronotların araştırma yaptığı yörünge laboratuvarıdır.",
        "Araştırma sorusu önce belirlenir; ardından gerekli veri seçilir. Yakın bir gök cisminin yüzeyini incelemek için sonda, iletişim kurmak için haberleşme uydusu, gökyüzü ışığını toplamak için teleskop gerekir. Roket bu araçları hedeflerine taşır. İnsanlı görevde mekik veya istasyon, astronot ve malzemenin güvenli taşınması/çalışması için kullanılır.",
        "Kitapta sondanın Dünya’dan uzaktan kontrol edilebildiği ve çoğunlukla güneş panelleriyle elektrik aldığı; roketin yakıt ve motorla çalıştığı; bazı yeni roketlerin yeniden kullanılabildiği belirtilir. Uzay mekiği insan ve ekipman taşıyabilir; istasyon düşük yer çekimli ortamda deney yapılmasını sağlar. Bu tanımlar, araçları işlevleriyle karşılaştırmanın sonucudur.",
        "Araçların şekillerini değil, yaptıkları işi eşleştir. Roket bir teleskop değildir; teleskop gözlem için ışık toplar. Sonda uzaktaki cisme veri toplamak üzere gider, uydu yörüngede kalır. Kitabın TÜRKSAT, Göktürk ve İMECE örneklerini de bu görev ayrımıyla oku; bir görev birden fazla araç ve yer istasyonu gerektirebilir."
      ],
      termDefinitions: [
        {
          "term": "Uzay roketi",
          "definition": "Uzay araçlarını yeryüzünden yörüngeye ya da daha uzak bölgelere taşıyan, motor ve yakıt kullanan araç.",
          "connection": "Araştırma zincirinde roket yükü hedef yörüngeye taşır; ölçüm ve görüntüyü asıl uydu ya da sonda toplar."
        },
        {
          "term": "Uzay sondası",
          "definition": "Bir gök cismini veya uzay olayını incelemek için gönderilen, ölçüm ve görüntü toplayan robotik araç.",
          "connection": "Yapay uydu yörüngede çalışır, uzay sondası robotik ölçüm yapar, teleskop gök cisimlerinden gelen ışığı toplar; uzay istasyonu ise astronotların araştırma yaptığı yörünge laboratuvarıdır."
        },
        {
          "term": "Uzay istasyonu",
          "definition": "Astronotların yörüngede yaşayıp araştırma ve deney yapabildiği donanımlı uzay aracı.",
          "connection": "Yapay uydu yörüngede çalışır, uzay sondası robotik ölçüm yapar, teleskop gök cisimlerinden gelen ışığı toplar; uzay istasyonu ise astronotların araştırma yaptığı yörünge laboratuvarıdır."
        },
        {
          "term": "Uzay mekiği",
          "definition": "Kitaptaki tanımıyla astronot ve gerekli malzemeleri taşıyabilen, yeniden kullanılmak üzere tasarlanmış uzay aracı.",
          "connection": "Uzay mekiği insan ve ekipman taşıyabilir; istasyon düşük yer çekimli ortamda deney yapılmasını sağlar."
        },
        {
          "term": "Teleskop",
          "definition": "Gök cisimlerinden gelen ışığı veya başka elektromanyetik dalgaları toplayarak gözleme yardım eden araç.",
          "connection": "Yakın bir gök cisminin yüzeyini incelemek için sonda, iletişim kurmak için haberleşme uydusu, gökyüzü ışığını toplamak için teleskop gerekir."
        }
      ],
      researchBrief: {
        "title": "Kitaptaki araştırma sorusunun yanıtı: Uzay araştırmalarında hangi teknolojiler kullanılır?",
        "intro": "Araştırma sonucu tek bir araçtan ibaret değildir. Bilim insanları soruya ve gereken veriye göre aşağıdaki araçları seçer; çoğu görevde birden fazlası birlikte çalışır.",
        "items": [
          {
            "name": "Roket",
            "role": "Uyduyu, sondaları veya başka yükleri yeryüzünden yörüngeye taşır. Yakıt ve motorla itki üretir; bazı modern tasarımlar yeniden kullanılabilir."
          },
          {
            "name": "Yapay uydu",
            "role": "Yörüngede haberleşme, Dünya gözlemi, konum belirleme veya bilimsel ölçüm görevi yapar. Türksat haberleşmeye; Göktürk ve İMECE Dünya gözlemine örnektir."
          },
          {
            "name": "Uzay sondası",
            "role": "Astronot taşımadan bir gök cismine ya da uzay olayına ilişkin ölçüm/görüntü toplar ve veriyi Dünya’ya iletir; güneş panelleri enerji sağlayabilir."
          },
          {
            "name": "Uzay mekiği",
            "role": "Astronot ve malzeme taşıma görevlerinde kullanılır; kitapta yeniden kullanılabilen araç örneği olarak anlatılır."
          },
          {
            "name": "Uzay istasyonu",
            "role": "Yörüngede yaşam ve araştırma alanı sağlar. Astronotlar burada deney yapar; istasyonlar güneş panellerinden elektrik alabilir."
          },
          {
            "name": "Uzay teleskobu",
            "role": "Atmosferin üzerindeki konumundan gök cisimlerinden gelen ışığı toplar. Hubble ve James Webb kitaptaki örneklerdir."
          },
          {
            "name": "Yer tabanlı teleskop ve gözlemevi",
            "role": "Yeryüzünde gökyüzünü gözler. TUG ve DAG örneklerinde olduğu gibi yüksek, kuru ve kent ışıklarından uzak yerler gözlemi kolaylaştırır."
          }
        ],
        "takeaway": "Günlük yaşam bağlantısı: haberleşme, hava/afet gözlemi, tarım ve navigasyon uydu verilerinden yararlanabilir. Kitabın s. 25’te verdiği sağlık, enerji, malzeme ve gıda örnekleri de uzay araştırmalarıyla ilişkilendirilen teknoloji uygulamalarıdır; bu liste, her ürünün yalnızca uzay için icat edildiği anlamına gelmez.",
        "source": "Kaynak özeti: ders kitabı s. 16–26; araç tanımları, Türkiye uydu örnekleri, gözlemevleri ve teknoloji uygulamaları."
      },
      points: ["Roket taşıma, sonda uzaktaki cisimleri inceleme amacı taşır.", "Uydu yörüngede görev yapar; istasyon araştırma ortamı sağlar.", "Teleskop gözlem için ışık toplar."],
      terms: ['uzay sondası', 'uzay istasyonu', 'roket', 'teleskop'],
      tasks: ['Araç adlarını görevleriyle eşleştiren bir tablo hazırla.', 'Bir uzay görevi için hangi verinin gerektiğini belirle.', 'Görev–araç eşleştirmeni bir cümleyle gerekçelendir.'],
      quiz: { prompt: 'Dünya’dan uzaktaki bir gök cismini yakından incelemek üzere veri toplayan robotik araca ne denir?', options: ['Uzay sondası', 'Haberleşme uydusu', 'Yer gözlemevi', 'Uzay giysisi'], answer: 0, explanation: 'Uzay sondaları gök cisimlerini veya uzay olaylarını incelemek üzere gönderilen robotik araçlardır.', hint: 'İnceleme yapmak için Dünya’dan gönderilen ve veri toplayan aracı düşün.'},
      activity: { title: 'Görev için doğru aracı seç', format: 'Tasarım kararı ve gerekçe', prompt: 'Bir araştırma ekibi, başka bir gezegenin yüzeyindeki sıcaklığı uzaktan ölçmek istiyor. Gereken aracı veya araçları seç; ölçümün nasıl yapılacağını ve hangi verinin Dünya’ya gönderileceğini açıkla.', placeholder: 'Seçeceğim araç… Ölçüm… Gönderilecek veri…', minChars: 25, criteria: ['Göreve uygun araç türünü seç.', 'Aracın nasıl veri toplayacağını belirt.', 'Verinin araştırma sorusuna nasıl yanıt vereceğini açıkla.'], hint: 'Taşıma, uzaktan inceleme ve Dünya’ya veri iletme görevlerini birbirinden ayır.' },
    },
    {
      id: 4, date: '5–9 Eki', unitId: 'space', topic: 'Teleskoplar, gözlem yerleri ve gökyüzü gözlemi', pages: '23–25', visual: 'telescope', visualNote: "Kitaptaki TUG ve DAG örneklerinde olduğu gibi yüksek, kuru ve kent ışıklarından uzak gözlem yerleri daha net gökyüzü görüntülerine katkı sağlar.",
      focus: "Teleskop türü, atmosfer ve çevredeki yapay ışığın gökyüzü gözlemini nasıl etkilediğini açıkla.",
      summary: [
        "Teleskop, gök cisimlerinden gelen ışığı veya başka elektromanyetik dalgaları toplayıp incelenebilir hâle getirir. Yer tabanlı teleskoplar yeryüzündeki gözlemevlerinde, uzay teleskopları atmosferin üzerinde çalışır. Araç türü araştırma sorusuna göre seçilir; her teleskop her dalga boyunu ölçmez.",
        "Atmosfer bazı ışınları soğurur veya dağıtır; bulut, su buharı ve hava koşulları da gözlemi etkiler. Kent aydınlatmasının gökyüzüne saçılması sönük yıldızları seçmeyi zorlaştırır. Bu nedenle yer gözlemevleri için yüksek, kuru, açık ve yapay ışıklardan uzak bölgeler tercih edilebilir.",
        "Kitap Hubble ve James Webb’i uzay teleskoplarına; TUG ve Doğu Anadolu Gözlemevi’ni (DAG) yer tabanlı gözlem örneklerine verir. Uzay teleskobu atmosfer etkisini azaltır, yer teleskobu ise bakım ve yenileme kolaylığı gibi avantajlar taşıyabilir. Gözlemevlerinin yeri, teleskopun topladığı sinyal kadar önemlidir.",
        "Teleskopla Güneş’e doğrudan, filtresiz bakılmaz; bu gözlere kalıcı zarar verebilir. Bir gözlem yeri seçerken karanlık gökyüzü kadar hava, güvenli erişim ve ölçüm amacını da değerlendir. Kent ışığının fotoğrafta oluşturduğu parlaklık gerçek gök cisimlerinin sayısını artırmaz; yalnızca görünürlüğü değiştirir."
      ],
      termDefinitions: [
        {
          "term": "Yer tabanlı teleskop",
          "definition": "Yeryüzünde bulunan ve gökyüzü gözlemi yapan teleskop.",
          "connection": "Yer tabanlı teleskoplar yeryüzündeki gözlemevlerinde, uzay teleskopları atmosferin üzerinde çalışır."
        },
        {
          "term": "Uzay teleskobu",
          "definition": "Atmosferin üzerinde, uzayda gözlem yapan teleskop.",
          "connection": "Uzay teleskobu atmosfer etkisini azaltır, yer teleskobu ise bakım ve yenileme kolaylığı gibi avantajlar taşıyabilir."
        },
        {
          "term": "Gözlemevi",
          "definition": "Teleskop ve yardımcı ölçüm araçlarıyla gök cisimlerinin incelendiği, uygun konuma kurulmuş araştırma alanı.",
          "connection": "Kitap Hubble ve James Webb’i uzay teleskoplarına; TUG ve Doğu Anadolu Gözlemevi’ni (DAG) yer tabanlı gözlem örneklerine verir."
        },
        {
          "term": "Işık kirliliği",
          "definition": "Yapay ışığın gereksiz, yanlış yönlü veya aşırı kullanımıyla gece gökyüzünün doğal karanlığının bozulması.",
          "connection": "Gökyüzüne saçılan yapay ışık sönük yıldızları görünmez kılabilir; bu yüzden gözlemevi yeri seçilirken çevrenin karanlığı da değerlendirilir."
        },
        {
          "term": "Atmosfer",
          "definition": "Dünya’yı çevreleyen gaz katmanı; bazı gök ışınlarını etkileyerek yerden gözlemi değiştirebilir.",
          "connection": "Uzay teleskobu atmosfer etkisini azaltır, yer teleskobu ise bakım ve yenileme kolaylığı gibi avantajlar taşıyabilir."
        }
      ],
      points: ["Teleskop gök cisimlerinden gelen ışığı toplar.", "Atmosfer, hava koşulları ve yapay ışık gözlemi etkileyebilir.", "Gözlem aracını araştırma sorusuna göre seç; Güneş’e doğrudan bakma."],
      terms: ['teleskop', 'gözlemevi', 'atmosfer', 'ışık kirliliği'],
      tasks: ['Yer ve uzay teleskoplarının bulunduğu ortamları karşılaştır.', 'Bir gözlemevi yeri seçerken değerlendireceğin üç özelliği yaz.', 'Güvenli gözlem kurallarından en az birini not et.'],
      quiz: { prompt: 'Yer tabanlı teleskopla yapılan bir gözlemde şehir ışıklarının azaltılması neden yararlı olabilir?', options: ['Gökyüzünden gelen soluk ışıkların fark edilmesini kolaylaştırabilir.', 'Yıldızların gerçek konumunu değiştirir.', 'Teleskopu uzay teleskopuna dönüştürür.', 'Atmosferi tamamen ortadan kaldırır.'], answer: 0, explanation: 'Yapay ışığın azalması, gökyüzündeki soluk ışıkların seçilmesini kolaylaştırabilir.', hint: 'Çevredeki ışığın gözlem görüntüsüne etkisini düşün.'},
      activity: { title: 'Gözlem yeri karşılaştırması', format: 'Kanıt tablosu', prompt: 'Bir gözlem ekibi iki yer arasında seçim yapıyor: A yeri şehir merkezinde, B yeri daha karanlık ve açık bir bölgede. Her yer için bir avantaj ve bir sınırlılık yaz; hangi bilgiyi toplamadan kesin karar vermeyeceğini belirt.', placeholder: 'A yeri… B yeri… Kararım için gereken ek bilgi…', minChars: 25, criteria: ['İki yeri aynı ölçütle karşılaştır.', 'Bir sınırlılığı da belirt.', 'Eksik veriyi adlandır.'], hint: 'Yalnızca karanlık olması yeterli değildir; hava ve güvenli erişimi de değerlendirebilirsin.' },
    },
    {
      id: 5, date: '12–16 Eki', unitId: 'space', topic: 'Uzay teknolojilerinin günlük yaşama katkıları', pages: '24–30', visual: 'space', visualNote: "Uydu görüntüsünün yeryüzüne ilişkin hangi veriyi sağlayabileceğini düşün; görüntüden çıkarılan yorumun ayrıca kanıtla desteklenmesi gerekir.",
      focus: "Uzay araştırmalarında geliştirilen ölçüm ve iletişim teknolojilerinin yeryüzündeki kullanım alanlarını örnekle.",
      summary: [
        "Uzay çalışmaları için geliştirilen algılayıcılar, görüntüleme ve iletişim yöntemleri yeryüzündeki farklı ihtiyaçlarda da kullanılabilir. Bir teknolojinin yararı, hangi sorunu çözdüğüne ve hangi ölçümü yaptığına bağlıdır. Uzaydan Dünya’yı izlemek; hava, arazi, afet ve tarım çalışmaları için düzenli veri sağlayabilir.",
        "Uydu görüntüsü belli bir zaman, konum ve çözünürlüğe ait kayıttır. Aynı bölgenin farklı tarihlerdeki görüntüleri karşılaştırıldığında değişim görülebilir; ancak görüntü tek başına nedenini açıklamaz. Uzmanlar görüntüyü saha bilgisi, ölçüm ve başka kaynaklarla birlikte yorumlar.",
        "Ders kitabının s. 25’teki araştırma örnekleri sağlıkta MR/tomografi/ultrason, dijital termometre ve dayanıklı malzemeleri; enerjide güneş panellerini; ulaşımda GPS’i; iletişimde veri aktarımını; gıdada saklama ve su filtrelerini sayar. Bunlar kitapta uzay çalışmalarından günlük yaşama aktarılan uygulama örnekleridir.",
        "Bu örnekleri “uzay araştırması → geliştirilen ölçüm/malzeme/yazılım → günlük gereksinim” zinciriyle açıkla. Ürünün tam olarak nerede ve hangi amaçla icat edildiği ayrı bir tarihsel sorudur; kitabın örneğini, tek bir icat öyküsü gibi genelleme. Görselde görülen veri ile o veriden çıkarılan kararı da birbirinden ayır."
      ],
      termDefinitions: [
        {
          "term": "Teknoloji aktarımı",
          "definition": "Bir alanda geliştirilen bilgi veya yöntemin başka bir ihtiyaca uyarlanması.",
          "connection": "Uzay görevi için geliştirilen ölçüm veya iletişim yöntemleri, ihtiyaçla eşleştirilip uyarlanarak sağlık, tarım ya da ulaşım gibi alanlarda kullanılabilir."
        },
        {
          "term": "Uzaktan algılama",
          "definition": "Bir yere doğrudan dokunmadan, sensör ve görüntülerle o yer hakkında bilgi toplama.",
          "connection": "Uydu sensörü yeryüzüne dokunmadan görüntü toplar; farklı tarihli kayıtlar karşılaştırıldığında değişim izlenir, nedenini anlamak için ek kanıt gerekir."
        },
        {
          "term": "GPS",
          "definition": "Uydulardan alınan sinyalleri kullanarak konum ve zaman belirlemeye yardım eden uydu sistemi.",
          "connection": "25’teki araştırma örnekleri sağlıkta MR/tomografi/ultrason, dijital termometre ve dayanıklı malzemeleri; enerjide güneş panellerini; ulaşımda GPS’i; iletişimde veri aktarımını; gıdada saklama ve su filtrelerini sayar."
        },
        {
          "term": "Uydu görüntüsü",
          "definition": "Uydudaki algılayıcıların belirli bir zaman ve bölge için kaydettiği görüntü verisi.",
          "connection": "Uydu görüntüsü belli bir zaman, konum ve çözünürlüğe ait kayıttır."
        },
        {
          "term": "Güneş paneli",
          "definition": "Güneş ışığını elektrik enerjisine dönüştüren düzenek.",
          "connection": "Panel ışığı elektriğe dönüştürerek uydu ya da sondanın araçlarını çalıştırabilir; böylece araç görev süresince enerji sağlar."
        }
      ],
      researchBrief: {
        "title": "Araştırma sonucu: Uzay teknolojilerinin günlük yaşamdaki örnekleri",
        "intro": "Kitap, uzay çalışmalarıyla ilişkilendirilen uygulamaları alanlara ayırır. Aşağıdaki örneklerde teknoloji ile karşıladığı ihtiyaç birlikte verilmiştir.",
        "items": [
          {
            "name": "Sağlık ve görüntüleme",
            "role": "MR, bilgisayarlı tomografi ve ultrason gibi görüntüleme araçları; dijital termometre ve bazı dayanıklı malzemeler kitapta örneklenir."
          },
          {
            "name": "Enerji ve iletişim",
            "role": "Güneş panelleri elektrik üretir; iletişim sistemleri veri/sinyal aktarır."
          },
          {
            "name": "Konum ve gözlem",
            "role": "GPS konum bulmaya yardım eder; uydu görüntüsü hava, afet, tarım ve arazi gözlemlerinde kullanılabilir."
          },
          {
            "name": "Malzeme ve yaşam",
            "role": "Termal battaniye, çizilmeye dayanıklı lens, su filtresi ve uzun süre saklanabilen/pratik gıdalar kitapta verilen diğer örneklerdir."
          }
        ],
        "takeaway": "Bu liste araştırma özeti niteliğindedir; ürünlerin kökeni ve güncel işlevi için ayrı, güvenilir kaynak kontrolü gerekir. “Uzayda kullanıldı” demek, bir ürünün yalnızca uzayda kullanılabileceği anlamına gelmez.",
        "source": "Kaynak özeti: ders kitabı s. 24–26."
      },
      points: ["Uydu verileri yeryüzünü gözlemlemeye yardımcı olabilir.", "Görüntü doğru tarih ve bağlamla birlikte yorumlanır.", "Teknoloji, belirli bir ihtiyaca göre seçilir."],
      terms: ['uydu verisi', 'görüntüleme', 'iletişim', 'teknoloji aktarımı'],
      tasks: ['Bir uydu verisinin yararlı olabileceği günlük yaşam alanı seç.', 'Bu alanda hangi veriye ihtiyaç duyulacağını açıkla.', 'Teknolojinin tek başına çözemeyeceği bir sınırlılığı belirt.'],
      quiz: { prompt: 'Afet sonrası bir bölgedeki değişimi uzaktan karşılaştırmak için hangi veri türü yararlı olabilir?', options: ['Uydu görüntülerinin farklı tarihlerde karşılaştırılması', 'Yalnızca bir kişinin tahmini', 'Uzay aracının renk tasarımı', 'Bir teleskopun büyütme düğmesinin şekli'], answer: 0, explanation: 'Farklı zamanlarda alınan uydu görüntüleri yeryüzündeki değişimi incelemeye yardımcı olabilir.', hint: 'Yeryüzünün aynı bölgesini zaman içinde karşılaştırabilecek veriyi düşün.'},
      activity: { title: 'Teknoloji aktarım zinciri', format: 'Neden–sonuç şeması', prompt: 'Uydu görüntülerinin bir tarım alanını izlemek için kullanılmasını seç. “Araç → toplanan veri → yorum → olası karar” zincirini kendi örneğinle açıkla; verinin hangi konuda kesin hüküm vermeye yetmeyeceğini de ekle.', placeholder: 'Araç… Veri… Yorum… Olası karar… Sınırlılık…', minChars: 30, criteria: ['Dört basamağı sırayla bağla.', 'Yorum ile veriyi ayır.', 'Bir sınırlılık belirt.'], hint: 'Uydu verisini uzmanların değerlendirmesi gerektiğini unutma.' },
    },
    {
      id: 6, date: '19–23 Eki', unitId: 'space', topic: 'Uzay kirliliği ve sorumlu uzay çalışmaları', pages: '24–33', visual: 'debris', visualNote: "Çalışan uydu ile işlevini yitirmiş parça farklıdır; yörüngedeki parçalar yüksek hız nedeniyle çarpışma riski yaratabilir.",
      focus: "İşlevini yitirmiş uydu ve araç parçalarının yörüngede oluşturabileceği çarpışma riskini ve önleme yollarını açıkla.",
      summary: [
        "Uzay kirliliği, görevini tamamlamış veya işlevini yitirmiş yapay uyduların, roket aşamalarının ve yörüngede kalan parçaların oluşturduğu insan kaynaklı atık sorunudur. Bu nesneler doğal gök cisimleri değil, insanın uzay faaliyetleri sonucunda yörüngede bulunan parçalardır.",
        "Yörüngedeki parçalar yüksek hızla hareket edebilir. Küçük bir parça bile çalışan uyduya veya uzay aracına çarparsa donanıma zarar verebilir; çarpışma yeni parçalar oluşturup izleme ve görev planlamasını zorlaştırabilir. Bu nedenle yörüngedeki nesneleri izlemek ve görevleri çarpışma riskini gözeterek planlamak gerekir.",
        "Kitap, uzay enkazını izleme ağlarından söz eder; çözüm olarak görev sonu planlaması, parçaları izleme/yakalama veya güvenli biçimde yörüngeden çıkarma gibi fikirlerin araştırılmasını ister. Önerilerin uygulanabilirliği, güvenlik, maliyet ve uzun vadeli etkilerle birlikte değerlendirilmelidir.",
        "Dünya görselinde her küçük nokta gerçek ölçekteki boyutu göstermez; çizim temsilîdir. Çalışan uyduyla işlevsiz parçayı ayır, bir önerinin hangi riski azalttığını belirt ve sonucunu ölçülebilir bir ölçütle açıkla. Uzay kirliliği şu an doğrudan yerdeki çöpler gibi görünmese de haberleşme, gözlem ve gelecekteki araştırmaları etkileyebilir."
      ],
      termDefinitions: [
        {
          "term": "Uzay kirliliği",
          "definition": "Dünya çevresindeki yörüngelerde biriken, insan yapımı işlevsiz cisim ve parçalar sorunu.",
          "connection": "Uzay kirliliği, görevini tamamlamış veya işlevini yitirmiş yapay uyduların, roket aşamalarının ve yörüngede kalan parçaların oluşturduğu insan kaynaklı atık sorunudur."
        },
        {
          "term": "Uzay enkazı",
          "definition": "Görevini bitirmiş araçlar, roket parçaları veya çarpışmalarla oluşan küçük cisimler.",
          "connection": "Kitap, uzay enkazını izleme ağlarından söz eder; çözüm olarak görev sonu planlaması, parçaları izleme/yakalama veya güvenli biçimde yörüngeden çıkarma gibi fikirlerin araştırılmasını ister."
        },
        {
          "term": "Çarpışma riski",
          "definition": "Yörüngedeki iki cismin birbirine çarparak hasar veya yeni parçalar oluşturma olasılığı.",
          "connection": "Bu nedenle yörüngedeki nesneleri izlemek ve görevleri çarpışma riskini gözeterek planlamak gerekir."
        },
        {
          "term": "Görev sonu planı",
          "definition": "Bir uzay aracının görevini tamamladıktan sonra güvenli biçimde nasıl yönetileceğini önceden belirleyen plan.",
          "connection": "Araç daha fırlatılmadan görev bitince yörüngede nasıl güvenli kalacağı veya uzaklaştırılacağı planlanır; bu, yeni enkaz oluşma riskini azaltmaya yardım eder."
        },
        {
          "term": "İzleme",
          "definition": "Yörüngedeki cisimlerin konumunu ve hareketini ölçerek kaydetme çalışması.",
          "connection": "Yörüngedeki cisimlerin konum ve hareketi düzenli ölçülür; izleme verisi yakın geçişleri fark edip çarpışma riskini değerlendirmeyi sağlar."
        }
      ],
      points: ["Uzay kirliliği insan yapımı atıklarla ilişkilidir.", "Yüksek hızlı parçalar etkin araçlar için risk oluşturabilir.", "Görev öncesi planlama, izleme ve görev sonu yönetimi birlikte düşünülür."],
      terms: ['uzay kirliliği', 'yörünge', 'çarpışma riski', 'görev sonu planı'],
      tasks: ['Uzay kirliliğinin nasıl oluşabileceğini bir neden–sonuç zinciriyle yaz.', 'İki çözüm önerisini güvenlik ve uygulanabilirlik açısından karşılaştır.', 'Bir önerini seç ve hangi ölçütle başarılı sayılacağını belirt.'],
      quiz: { prompt: 'Yörüngedeki işlevsiz uydu parçaları hangi nedenle yeni uzay görevleri için risk oluşturabilir?', options: ['Hızla hareket edip çalışan araçlarla çarpışabilirler.', 'Dünya’nın dönüşünü durdurabilirler.', 'Güneş ışığını tamamen engellerler.', 'Her zaman yörüngeden kendiliğinden çıkarlar.'], answer: 0, explanation: 'Yörüngedeki parçalar yüksek hızla hareket edebilir ve çalışan araçlara zarar verebilir.', hint: 'Yörüngedeki cisimlerin hareketi ile çarpışma olasılığını ilişkilendir.'},
      activity: { title: 'Uzayda atık azaltma önerisi', format: 'Çözüm raporu taslağı', prompt: 'Yeni bir uydu görevi planlayan ekip için iki önlem öner. Her önlemin hangi riski azalttığını ve başarıyı hangi gözlenebilir ölçütle izleyeceğini yaz.', placeholder: 'Önlem 1… Azalttığı risk… Ölçüt…', minChars: 25, criteria: ['İki farklı önlem sun.', 'Her önlemi bir riskle ilişkilendir.', 'İzlenebilir bir başarı ölçütü belirt.'], hint: 'Bir önleme görev başlamadan, diğerine görev biterken ihtiyaç duyulabilir.' },
    },
    {
      id: 7, date: '26–30 Eki', unitId: 'space', topic: 'Işık kirliliği ve gökyüzünü koruma', pages: '24–33', visual: 'light', visualNote: "Kent ışığının gökyüzüne saçılması yıldızların görünürlüğünü azaltabilir; aşağı yöneltilmiş ışık bu saçılmayı sınırlar.",
      focus: "Gereksiz veya yanlış yönlendirilmiş yapay ışığın gökyüzü gözlemini ve çevreyi nasıl etkilediğini değerlendir.",
      summary: [
        "Işık kirliliği, yapay aydınlatmanın gereğinden fazla kullanılması, yanlış yöne çevrilmesi veya gereksiz zamanda açık kalmasıyla gece gökyüzünün doğal karanlığının bozulmasıdır. Gökyüzüne saçılan ışık, sönük yıldızların ve bazı gök cisimlerinin görülmesini zorlaştırır.",
        "Bir lambanın ışığı yalnızca yeri aydınlatmaz; yukarı ve yana saçılan bölüm atmosferde dağılarak gökyüzünde parlama oluşturabilir. Işığı aşağı yönlendirmek, sadece ihtiyaç duyulan alanı aydınlatmak ve kullanılmayan ışıkları kapatmak saçılmayı azaltır. Güvenli aydınlatma ile gereksiz parlaklık aynı şey değildir.",
        "Kitap, kent merkezindeki gökyüzü gözlemiyle karanlık/yüksek bölgelerdeki gözlemi karşılaştırır. TUG ve DAG gibi gözlemevlerinin konumu, açık hava ve az çevre ışığı gibi koşulların önemini gösterir. Işık kirliliği yalnızca astronomi için değil, doğal gece-gündüz döngüsüne bağlı canlılar için de çevresel bir etkendir.",
        "Bir fotoğrafta fazla parlak gökyüzü, yıldızların gerçekten yok olduğunu kanıtlamaz; onların ışığının kent parlamasında seçilemediğini gösterir. Gözlem planında güvenliği korurken ışığı doğru yönde ve gerektiği kadar kullan. Çözüm önerini “hangi ışığı, nerede, ne zaman ve ne kadar süreyle?” sorularıyla somutlaştır."
      ],
      termDefinitions: [
        {
          "term": "Işık kirliliği",
          "definition": "Yapay ışığın yanlış yönlü, aşırı veya gereksiz zamanlarda kullanılmasıyla oluşan çevre ve gökyüzü sorunu.",
          "connection": "Işık kirliliği, yapay aydınlatmanın gereğinden fazla kullanılması, yanlış yöne çevrilmesi veya gereksiz zamanda açık kalmasıyla gece gökyüzünün doğal karanlığının bozulmasıdır."
        },
        {
          "term": "Gökyüzü parlaması",
          "definition": "Yukarı saçılan yapay ışığın gece göğünü aydınlık göstererek soluk yıldızları bastırması.",
          "connection": "Yukarı yönlenmiş ışık atmosferde saçılarak gece göğünü aydınlatır ve sönük yıldızların görünürlüğünü azaltır."
        },
        {
          "term": "Yapay ışık",
          "definition": "İnsanların lamba ve benzeri kaynaklarla ürettiği ışık.",
          "connection": "Lambadan çıkan ışığın yalnızca gereken yere ve zamanda yöneltilmesi, enerji israfını ve gökyüzü parlamasını azaltabilir."
        },
        {
          "term": "Gözlem koşulu",
          "definition": "Bir gözlemin kalitesini etkileyen hava, ışık, konum ve kullanılan araç özellikleri.",
          "connection": "Bir gözlemin güvenilirliği yalnızca teleskopa değil, hava durumuna, konuma ve çevredeki ışığa da bağlıdır."
        }
      ],
      points: ["Yapay ışığın yönü, şiddeti ve süresi önemlidir.", "Gökyüzü parlaması sönük gök cisimlerinin gözlemini zorlaştırır.", "Gereken alanı güvenli ve ölçülü biçimde aydınlat."],
      terms: ['ışık kirliliği', 'yapay ışık', 'gökyüzü gözlemi', 'aydınlatma'],
      tasks: ['Bir iç veya dış mekândaki gereksiz ışık kullanımına örnek düşün.', 'Işığın yönü ve süresini iyileştirecek iki değişiklik öner.', 'Gözlem için güvenli bir ortamın özelliklerini yaz.'],
      quiz: { prompt: 'Bir okul bahçesinde ışık kirliliğini azaltmaya yönelik hangi düzenleme daha uygundur?', options: ['Işığı yalnızca gereken alana yöneltip boş alanlarda kapatmak', 'Bütün lambaları gökyüzüne doğru çevirmek', 'Gereksiz ışıkları gece boyunca açık bırakmak', 'Daha fazla ışık ekleyip hepsini aynı anda yakmak'], answer: 0, explanation: 'Gereken alanı doğru yönde ve gerektiği kadar aydınlatmak ışık kirliliğini azaltmaya yardımcı olur.', hint: 'Aydınlatmanın yönünü, süresini ve gerçekten gerekli olup olmadığını birlikte düşün.'},
      activity: { title: 'Karanlık gökyüzü için mini plan', format: 'Gözlem ve çözüm önerisi', prompt: 'Bir okul bahçesinin güvenliğini korurken gökyüzüne taşan ışığı azaltacak üç maddelik bir plan yaz. Her maddede hem güvenlik hem de gereksiz ışığı önleme düşüncesini gözet.', placeholder: '1. … 2. … 3. …', minChars: 25, criteria: ['Üç uygulanabilir öneri yaz.', 'Güvenlik gereksinimini koru.', 'Işığın yönü veya süresine değin.'], hint: 'Amaç ışığı tamamen kaldırmak değil, doğru yerde ve doğru miktarda kullanmaktır.' },
    },
    {
      id: 8, date: '2–6 Kas', unitId: 'space', topic: 'Yıldızların oluşumu: bulutsu ve önyıldız', pages: '34–43', visual: 'stars', visualNote: "Görselin solundaki bulutsu ve yoğunlaşmadan yıldız oluşumuna ilerle; alttaki iki yol yıldızın başlangıç kütlesine göre farklılaşır.",
      focus: "Bulutsudaki gaz ve tozun kütle çekimiyle yoğunlaşarak önyıldız evresine ilerlemesini açıkla.",
      summary: [
        "Bulutsu, uzayda gaz ve toz içeren geniş bir yapıdır; yıldızların oluşabildiği bölgelerden bazıları bulutsulardır. Bulutsunun her noktası aynı yoğunlukta değildir. Bazı bölgelerde madde, kütle çekiminin etkisiyle bir araya gelerek yoğun ve sıcak bir yapı oluşturur.",
        "Gaz ve toz yoğunlaşırken merkezde sıcaklık artar; bu erken oluşum aşamasına önyıldız denir. Zamanla merkez koşulları yıldızın enerji üretmesini sağlayan çekirdek tepkimelerinin başlamasına elverişli hâle gelir. Bu uzun süreç, tek bir anda gerçekleşmez; görsel bir model aşamaları kısaltarak gösterir.",
        "Kitap Atbaşı, Orion ve Tarantula bulutsularını gerçek gözlem örnekleri olarak tanıtır; yıldız oluşumunu araştırma görevi de “bulutsu, önyıldız ve sonraki aşamalar” arasında bağlantı kurmayı ister. Fotoğrafta görülen renkler, teleskopla toplanan ışığın işlenmiş gösterimi olabilir; her bulutsu gözle aynı renkte görünmez.",
        "Şemada bulutsu → yoğunlaşma → önyıldız → yıldız sırasını izle ve her oka nedenini ekle. Kütle çekimi maddenin bir araya gelmesini sağlar; ısınma ve merkez koşulları sonraki değişimlere katkı verir. Bir bulutsu fotoğrafı oluşum sürecini tek başına kaydetmez; süreç açıklaması gözlem ve bilimsel modellere dayanır."
      ],
      termDefinitions: [
        {
          "term": "Bulutsu",
          "definition": "Uzayda gaz, toz ve başka maddeler içeren; bazı bölgelerinde yıldızların oluşabildiği yapı.",
          "connection": "Fotoğrafta görülen renkler, teleskopla toplanan ışığın işlenmiş gösterimi olabilir; her bulutsu gözle aynı renkte görünmez."
        },
        {
          "term": "Kütle çekimi",
          "definition": "Kütlesi olan cisimlerin birbirini çekmesine yol açan etkileşim.",
          "connection": "Kütle çekimi maddenin bir araya gelmesini sağlar; ısınma ve merkez koşulları sonraki değişimlere katkı verir."
        },
        {
          "term": "Önyıldız",
          "definition": "Gaz ve tozun yoğunlaşıp ısınmasıyla oluşan, yıldız hâline gelme sürecindeki erken yapı.",
          "connection": "Kitap Atbaşı, Orion ve Tarantula bulutsularını gerçek gözlem örnekleri olarak tanıtır; yıldız oluşumunu araştırma görevi de “bulutsu, önyıldız ve sonraki aşamalar” arasında bağlantı kurmayı ister."
        },
        {
          "term": "Çekirdek tepkimesi",
          "definition": "Yıldızın merkezinde gerçekleşen ve yıldızın enerji üretmesini sağlayan tepkimeler.",
          "connection": "Önyıldız ısınıp yoğunlaştıkça merkezinde enerji üreten tepkimeler başlayabilir; bu değişim yıldızın oluşum evresinden yıldız evresine geçişini açıklar."
        },
        {
          "term": "Yıldız oluşumu",
          "definition": "Bulutsu içindeki gaz ve tozun yoğunlaşıp ısınmasıyla yıldızın geliştiği uzun süreç.",
          "connection": "Kitap Atbaşı, Orion ve Tarantula bulutsularını gerçek gözlem örnekleri olarak tanıtır; yıldız oluşumunu araştırma görevi de “bulutsu, önyıldız ve sonraki aşamalar” arasında bağlantı kurmayı ister."
        }
      ],
      points: ["Bulutsular gaz ve toz içeren uzay yapılarıdır.", "Kütle çekimi maddenin bir araya gelmesine katkı sağlar.", "Önyıldız, yıldız oluşum sürecinin erken evresidir."],
      terms: ['bulutsu', 'kütle çekimi', 'önyıldız', 'yıldız oluşumu'],
      tasks: ['Bulutsu ile önyıldızın süreçteki yerini not et.', 'Aşamaları neden–sonuç oklarıyla sırala.', 'Bir modelin gerçek uzay sürecini hangi yönlerden basitleştirdiğini belirt.'],
      quiz: { prompt: 'Yıldız oluşum sürecinde gaz ve toz maddesinin bir araya gelmesine katkı sağlayan etki hangisidir?', options: ['Kütle çekimi', 'Ses dalgaları', 'Sürtünme kuvveti', 'Yapay ışık'], answer: 0, explanation: 'Kütle çekimi, gaz ve tozun yoğunlaşıp bir araya gelmesine katkı sağlar.', hint: 'Uzaydaki maddeyi birbirine doğru etkileyen kuvveti düşün.'},
      activity: { title: 'Yıldız oluşum şeridi', format: 'Aşama sıralama ve açıklama', prompt: 'Bulutsu ve önyıldız aşamalarını içeren küçük bir süreç şeridi tasarla. Oklarla sırayı göster ve her okun yanına değişimin nedenini bir cümleyle yaz.', placeholder: 'Bulutsu → … → …; değişimin nedeni…', minChars: 25, criteria: ['Bulutsu ve önyıldız kavramlarını doğru sırada kullan.', 'Aşamalar arasında ok kur.', 'Kütle çekiminin rolünü açıkla.'], hint: 'Sadece aşamaları listeleme; bir aşamadan diğerine neyin yol açtığını belirt.' },
    },
    {
      id: 9, date: '9–13 Kas', unitId: 'space', topic: 'Yıldızların yaşam döngüsü ve kütleye bağlı sonlar', pages: '35–43', visual: 'stars', visualNote: "İki olası yaşam yolunu başlangıç kütlesiyle karşılaştır; tüm yıldızların aynı biçimde sonlanmadığını hatırla.",
      focus: "Yıldızların yaşam yollarının başlangıç kütlesine göre nasıl farklılaşabildiğini karşılaştır.",
      summary: [
        "Yıldızlar oluşur, uzun süre enerji yayar ve yaşamlarının sonuna doğru değişir. Başlangıç kütlesi, yıldızın ne kadar süre yaşayacağını ve hangi evrelerden geçebileceğini etkiler. Bu nedenle yıldızların hepsini tek bir sonla anlatmak doğru değildir; bilimsel şemada farklı kütleler için dallanan yollar bulunur.",
        "Kitaptaki modele göre Güneş’in kütlesinin yaklaşık sekiz katından daha az başlangıç kütlesine sahip yıldızlar kırmızı dev evresine ilerleyip gezegenimsi bulutsu oluşturabilir; geride beyaz cüce kalabilir. Daha büyük kütleli yıldızlar kırmızı süperdev ve süpernova evrelerine ulaşabilir; kalan çekirdek nötron yıldızı veya kara delik olabilir.",
        "Süpernova, büyük kütleli yıldızların yaşamlarının sonuna doğru gerçekleşebilen çok güçlü bir olaydır; gezegenimsi bulutsu ise küçük kütleli yıldızların dış katmanlarıyla ilişkili başka bir evredir. Beyaz cüce, nötron yıldızı ve kara delik aynı şey değildir; farklı koşullarda kalan yıldız çekirdeğiyle ilişkilidir.",
        "Yaşam döngüsü diyagramındaki oklar zaman içindeki evreleri gösterir; bir yıldızın gerçek yaşamı milyonlarca veya milyarlarca yıl sürebilir. Kütle bilgisini ve şemanın temsilî olduğunu not et. Evrim şemasında dallanmalar, başlangıç kütlesi farklı olan yıldızların olası sonlarını birbirinden ayırır."
      ],
      termDefinitions: [
        {
          "term": "Kırmızı dev",
          "definition": "Güneş benzeri bir yıldızın yaşamının ileri evrelerinde genişleyip yüzeyi soğurken kırmızımsı görünebildiği evre.",
          "connection": "Kitaptaki modele göre Güneş’in kütlesinin yaklaşık sekiz katından daha az başlangıç kütlesine sahip yıldızlar kırmızı dev evresine ilerleyip gezegenimsi bulutsu oluşturabilir; geride beyaz cüce kalabilir."
        },
        {
          "term": "Kırmızı süperdev",
          "definition": "Büyük kütleli yıldızların yaşamlarının ileri döneminde ulaşabildiği çok büyük yıldız evresi.",
          "connection": "Daha büyük kütleli yıldızlar kırmızı süperdev ve süpernova evrelerine ulaşabilir; kalan çekirdek nötron yıldızı veya kara delik olabilir."
        },
        {
          "term": "Süpernova",
          "definition": "Bazı büyük kütleli yıldızların yaşamlarının sonunda görülen çok güçlü yıldız patlaması.",
          "connection": "Daha büyük kütleli yıldızlar kırmızı süperdev ve süpernova evrelerine ulaşabilir; kalan çekirdek nötron yıldızı veya kara delik olabilir."
        },
        {
          "term": "Beyaz cüce",
          "definition": "Küçük/orta kütleli bir yıldızın dış katmanlarını kaybettikten sonra geride kalabilen yoğun yıldız kalıntısı.",
          "connection": "Beyaz cüce, nötron yıldızı ve kara delik aynı şey değildir; farklı koşullarda kalan yıldız çekirdeğiyle ilişkilidir."
        },
        {
          "term": "Nötron yıldızı / kara delik",
          "definition": "Bazı büyük kütleli yıldızların son evrelerinde oluşabilen, özellikleri birbirinden farklı yoğun kalıntılar.",
          "connection": "Daha büyük kütleli yıldızlar kırmızı süperdev ve süpernova evrelerine ulaşabilir; kalan çekirdek nötron yıldızı veya kara delik olabilir."
        }
      ],
      points: ["Yıldızın başlangıç kütlesi yaşam yolunu etkiler.", "Daha küçük kütleli yıldızların son yolu büyük kütlelilerden farklıdır.", "Süpernova, büyük kütleli yıldızların son evreleriyle ilişkilidir."],
      terms: ['kırmızı dev', 'beyaz cüce', 'süpernova', 'nötron yıldızı', 'kara delik'],
      tasks: ['Küçük ve büyük kütleli yıldız yollarını iki sütunda karşılaştır.', 'Ortak ve farklı evreleri işaretle.', 'Süreç şemasında belirsiz kalan bir kavramı sözlükten veya güvenilir kaynaktan araştır.'],
      quiz: { prompt: 'Büyük kütleli bir yıldızın yaşamının sonlarına doğru gerçekleşebilecek olay hangisidir?', options: ['Süpernova', 'Bulutsunun aniden gezegene dönüşmesi', 'Takımyıldızın yıldız üretmesi', 'Işık yılının kısalması'], answer: 0, explanation: 'Büyük kütleli yıldızlar yaşamlarının son evrelerinde süpernova olayı yaşayabilir.', hint: 'Kütleye bağlı yıldız yaşam döngüsündeki şiddetli son olayı düşün.'},
      activity: { title: 'İki yıldız, iki yol', format: 'Dallanmış akış şeması', prompt: 'Bir yıldız yaşam döngüsü şemasını iki kola ayır: küçük kütleli ve büyük kütleli. Her kol için en az üç aşama yaz; benzer olan başlangıç aşamasını ve farklılaşan sonları bir cümleyle açıkla.', placeholder: 'Küçük kütleli yol… Büyük kütleli yol… Ortak başlangıç…', minChars: 30, criteria: ['İki ayrı yolu göster.', 'Aşamaları uygun sırada yaz.', 'Kütlenin yol ayrımındaki rolünü belirt.'], hint: 'Şemada her iki yolun başında ortak yıldız oluşum evrelerini kullan.' },
    },
    {
      id: 10, date: '23–27 Kas', unitId: 'space', topic: 'Yıldızların özellikleri, takımyıldızlar ve uzaklık', pages: '39–46', visual: 'stars', visualNote: "Farklı renklerdeki yıldızları karşılaştır; takımyıldız gökyüzündeki görünür örüntüdür ve yıldızların gerçek uzay uzaklıklarını tek başına göstermez.",
      focus: "Yıldız rengi, takımyıldız görünüşü ve ışık yılını gözlem ve uzaklık kavramlarıyla açıkla.",
      summary: [
        "Yıldızların rengi yüzey sıcaklığı hakkında ipucu verir: mavi-beyaz görünenler daha sıcak, sarı tonlular orta, turuncu-kırmızı tonlular daha soğuk olabilir. Renk, yıldızın tek özelliği değildir; parlaklık ve uzaklık da gökyüzünde nasıl göründüğünü etkiler.",
        "Takımyıldız, Dünya’dan bakıldığında belirli bir şekil oluşturuyormuş gibi görünen yıldız örüntüsüdür. O örüntüdeki yıldızlar uzayda birbirine yakın veya aynı uzaklıkta olmak zorunda değildir. Kutup Yıldızı’nı bulmaya yardım eden Büyükayı örneği, yön bulma için gökyüzü desenlerinin nasıl kullanıldığını gösterir.",
        "Işık yılı, ışığın bir yılda aldığı uzaklıktır; zaman değil, mesafe birimidir. Örneğin yakın yıldızlarla aramızdaki uzaklıklar kilometreyle yazıldığında çok büyük sayılara ulaşır; ışık yılı bu uzaklıkları anlatmayı kolaylaştırır. Kitaptaki yıldız büyüklüğü çizimleri de gerçek ölçeğe göre değil, karşılaştırma amacıyla hazırlanmıştır.",
        "Yıldız renklerini sıcaklıkla, takımyıldızı görünür örüntüyle, ışık yılını uzaklıkla eşleştir. Gökyüzünde yan yana görünen iki yıldız için “uzayda komşular” sonucunu hemen çıkarma; gerçek konum bilgisi gerekir. Çizimdeki çizgiler yıldızlar arasında fiziksel bağ bulunduğunu değil, gözlemcinin oluşturduğu deseni gösterir."
      ],
      termDefinitions: [
        {
          "term": "Yüzey sıcaklığı",
          "definition": "Bir yıldızın dış katmanlarının ne kadar sıcak olduğuna ilişkin özellik; yıldızın rengiyle ilişkilidir.",
          "connection": "Yıldızların rengi yüzey sıcaklığı hakkında ipucu verir: mavi-beyaz görünenler daha sıcak, sarı tonlular orta, turuncu-kırmızı tonlular daha soğuk olabilir."
        },
        {
          "term": "Takımyıldız",
          "definition": "Gökyüzünde belirli bir şekil oluşturuyor gibi görünen yıldızların gözlemsel örüntüsü.",
          "connection": "Takımyıldız, Dünya’dan bakıldığında belirli bir şekil oluşturuyormuş gibi görünen yıldız örüntüsüdür."
        },
        {
          "term": "Işık yılı",
          "definition": "Işığın boşlukta bir yılda aldığı uzaklığa dayalı mesafe birimi.",
          "connection": "Işık yılı, ışığın bir yılda aldığı uzaklıktır; zaman değil, mesafe birimidir."
        },
        {
          "term": "Parlaklık",
          "definition": "Bir yıldızın ne kadar ışık yaydığı veya Dünya’dan ne kadar parlak göründüğü; uzaklık da görünüşü etkiler.",
          "connection": "Renk, yıldızın tek özelliği değildir; parlaklık ve uzaklık da gökyüzünde nasıl göründüğünü etkiler."
        },
        {
          "term": "Kutup Yıldızı",
          "definition": "Kuzey gökyüzünde yön bulmaya yardım eden, gök kutbuna yakın konumdaki yıldız.",
          "connection": "Kutup Yıldızı’nı bulmaya yardım eden Büyükayı örneği, yön bulma için gökyüzü desenlerinin nasıl kullanıldığını gösterir."
        }
      ],
      points: ["Yıldız rengi sıcaklık hakkında bilgi verebilir.", "Takımyıldızdaki yıldızlar uzayda aynı uzaklıkta olmak zorunda değildir.", "Işık yılı uzaklık birimidir, zaman birimi değildir."],
      terms: ['yıldız', 'takımyıldız', 'ışık yılı', 'gözlem'],
      tasks: ['Takımyıldız çiziminde yıldız noktalarını birleştirerek bir örüntü oluştur.', 'Işık yılı ifadesinin hangi fiziksel büyüklüğü ölçtüğünü yaz.', 'Renk veya büyüklük karşılaştırmasında kullandığın ölçütü belirt.'],
      quiz: { prompt: 'Işık yılı hangi büyüklüğün ölçü birimidir?', options: ['Uzaklık', 'Zaman', 'Sıcaklık', 'Kütle'], answer: 0, explanation: 'Işık yılı, ışığın bir yılda aldığı yolu temel alan bir uzaklık birimidir.', hint: 'Adında “yıl” geçse de bu kavramın gök cisimleri arasındaki neyi anlattığını düşün.'},
      activity: { title: 'Gökyüzü örüntüsü ve uzaklık notu', format: 'Görsel model ve kavram açıklaması', prompt: 'Kâğıda altı yıldız noktası yerleştirip birkaçını çizgilerle birleştirerek kendi takımyıldız modelini oluşturduğunu düşün. Modelin gözlem kolaylığı sağlayan yönünü ve gerçek yıldız uzaklıkları hakkında neden tek başına kanıt olmadığını açıkla.', placeholder: 'Örüntüm… Gözlem kolaylığı… Gerçek uzaklıklar için gereken ek bilgi…', minChars: 30, criteria: ['Takımyıldızın görünür örüntü olduğunu belirt.', 'Gözlemdeki yararını açıkla.', 'Görünüşün gerçek uzaklıkları kanıtlamadığını açıkla.'], hint: 'Gökyüzündeki iki boyutlu görünüş ile yıldızların uzaydaki konumunu ayır.' },
    },
    {
      id: 11, date: '30 Kas–4 Ara', unitId: 'space', topic: 'Galaksiler, evren ve kavramlar arası ilişki', pages: '47–50', visual: 'galaxy', visualNote: "Sarmal kolları olan galaksiye bakarken Güneş Sistemi’nin Samanyolu içinde, evrenin ise galaksilerden daha büyük ölçekte olduğunu düşün.",
      focus: "Yıldız, galaksi ve evren kavramlarını ölçeklerine göre ilişkilendir; Samanyolu’nun yerini belirt.",
      summary: [
        "Galaksi (gök ada), çok sayıda yıldız ve yıldız sistemi ile gaz ve toz gibi maddelerin kütle çekimiyle bir arada bulunduğu büyük yapıdır. Galaksiler sarmal, eliptik veya düzensiz gibi farklı görünüşlerde olabilir. Bir galaksi tek bir yıldız veya gezegen değildir; çok daha büyük bir ölçektir.",
        "Güneş Sistemi, Dünya ve Güneş’le birlikte Samanyolu Galaksisi’nin içindedir; kitap bunu Avcı (Orion) koluyla ilişkilendirir. Andromeda, Samanyolu’na yakın büyük galaksilerden biridir. Ölçek sırası Dünya → Güneş Sistemi → Samanyolu → galaksiler ve evren olarak genişler.",
        "Kitap yıldız, galaksi ve evren kavramlarını birbirini kapsayan yapılar olarak kavram haritasına taşır. Hubble’ın galaksiler üzerine çalışmaları da tarihsel bağlamda anılır. Gök cisimleri arasındaki gerçek uzaklıklar, ders kitabındaki görseldeki aralıklardan çok daha büyüktür; bu görseller kavram ilişkisini anlatmak için küçültülmüştür.",
        "Kavram haritasında yalnızca isimleri sıralama; “içinde bulunur”, “oluşur” veya “kapsar” gibi ilişki sözcüklerini okların üzerine yaz. Dünya’nın bir şehirde/ülkede bulunduğu konumla Güneş Sistemi’nin galaksideki konumu arasında ölçek benzetmesi kurulabilir, ancak benzetmenin gerçek büyüklükleri bire bir göstermediğini belirt."
      ],
      termDefinitions: [
        {
          "term": "Galaksi (gök ada)",
          "definition": "Yıldızlar, yıldız sistemleri, gaz ve toz gibi maddelerin kütle çekimiyle bir arada bulunduğu dev yapı.",
          "connection": "Galaksi (gök ada), çok sayıda yıldız ve yıldız sistemi ile gaz ve toz gibi maddelerin kütle çekimiyle bir arada bulunduğu büyük yapıdır."
        },
        {
          "term": "Samanyolu",
          "definition": "Güneş Sistemi’nin bulunduğu sarmal galaksi.",
          "connection": "Güneş Sistemi, Dünya ve Güneş’le birlikte Samanyolu Galaksisi’nin içindedir; kitap bunu Avcı (Orion) koluyla ilişkilendirir."
        },
        {
          "term": "Güneş Sistemi",
          "definition": "Güneş ve onun çevresinde dolanan gezegenler ile diğer gök cisimlerinin oluşturduğu sistem.",
          "connection": "Güneş Sistemi, Dünya ve Güneş’le birlikte Samanyolu Galaksisi’nin içindedir; kitap bunu Avcı (Orion) koluyla ilişkilendirir."
        },
        {
          "term": "Andromeda",
          "definition": "Samanyolu’na yakın büyük galaksilerden biri.",
          "connection": "Andromeda, Samanyolu’na yakın büyük galaksilerden biridir."
        },
        {
          "term": "Ölçek",
          "definition": "Bir nesnenin veya yapının boyutunun, uzaklığının ya da kapsamının başka birine göre karşılaştırılması.",
          "connection": "Dünya’nın bir şehirde/ülkede bulunduğu konumla Güneş Sistemi’nin galaksideki konumu arasında ölçek benzetmesi kurulabilir, ancak benzetmenin gerçek büyüklükleri bire bir göstermediğini belirt."
        }
      ],
      points: ["Samanyolu, Güneş Sistemi’nin bulunduğu galaksidir.", "Galaksiler farklı biçim ve yapılara sahip olabilir.", "Evren, galaksileri de kapsayan daha geniş ölçektir."],
      terms: ['gök cismi', 'galaksi', 'Samanyolu', 'evren'],
      tasks: ['Yıldız, gezegen, galaksi ve evren kavramlarını kartlara yaz.', 'En kapsayıcı kavramdan daha özel olana doğru oklarla ilişki kur.', 'Kavram haritandaki bir oku kısa bir cümleyle açıkla.'],
      quiz: { prompt: 'Aşağıdaki kavramlardan hangisi galaksileri de kapsayan en geniş yapıyı belirtir?', options: ['Evren', 'Yıldız', 'Gezegen', 'Gök taşı'], answer: 0, explanation: 'Evren; galaksiler ve uzaydaki yapıları kapsayan en geniş kavramdır.', hint: 'Diğer seçeneklerin tümünü içine alabilecek kapsayıcı kavramı seç.'},
      activity: { title: 'Evren kavram haritası', format: 'Kavram haritası kurma', prompt: '“Evren, galaksi, yıldız, gezegen” kavramlarını kullanarak en kapsayıcıdan daha özele doğru bir harita tasarla. Her okun üstüne ilişkiyi açıklayan bir fiil veya kısa ifade ekle; Güneş Sistemi ve Samanyolu’nu da uygun yere yerleştir.', placeholder: 'Evren → … → …; okların üzerindeki açıklamalar…', minChars: 30, criteria: ['Kavramları kapsayıcılıklarına göre sırala.', 'Güneş Sistemi–Samanyolu ilişkisini kur.', 'Okların anlamını açıkla.'], hint: 'Bir kavram haritasında yalnızca liste değil, kavramlar arasındaki ilişkiyi gösteren oklar bulunur.' },
    },
    {
      id: 12, date: '7–11 Ara', unitId: 'space', topic: 'Uzay Çağı ünitesi: model, rapor ve tekrar', pages: '31–52', visual: 'spaceReview', visualNote: "Galeri araştırma aracı, yörünge güvenliği, yıldız yaşamı ve galaksi ölçeğini yan yana getirir; her görsel farklı bir kavramı temsil eder.",
      focus: "Uzay araçları, uzay çevresi ve gök cisimleri konularını kanıt ve model sınırlarıyla birleştir.",
      summary: [
        "Uzay ünitesinde öğrendiğin başlıklar farklı ölçekleri ve araştırma yollarını bir araya getirir: roketler araç taşır, uydular yörüngede görev yapar, teleskoplar ışık toplar; yıldızlar ve galaksiler ise çok daha büyük uzay yapılarıdır. Her kavramı bir araştırma sorusu ve kanıt türüyle ilişkilendirmek tekrar etmeyi anlamlı kılar.",
        "Yıldız yaşamı başlangıç kütlesine göre farklı dallara ayrılır; uzay kirliliği ise insanın yörünge kullanımıyla ortaya çıkan ve planlamayla azaltılabilecek bir sorundur. Bilimsel model, gerçek sistemi sadeleştirerek temel ilişkileri gösterir; modelin hangi özellikleri dışarıda bıraktığını da bilmek gerekir.",
        "Kitaptaki görevler uzay aracı karşılaştırma, yıldız yaşamı posteri, galaksi kavram haritası ve uzay kirliliğine çözüm raporunu kapsar. Teknoloji araştırmasının sonucu; araç adı, görevi, topladığı veri ve günlük yaşamla ilişkisi birlikte yazıldığında daha açıklayıcı olur. Kaynak ve kanıt belirtilmesi, bilginin yeniden kontrol edilebilmesini sağlar.",
        "Bir tekrar görselini incelerken her panelin hangi kavramı temsil ettiğini ayrı ayrı söyle. Galaksi çizimi uzaklığı, yıldız döngüsü evreleri, enkaz görseli ise yörünge riskini sadeleştirir; hiçbir çizim uzayın gerçek ölçekte fotoğrafı değildir. İddian, gözlemin ve çıkarımın arasındaki ayrımı koru."
      ],
      termDefinitions: [
        {
          "term": "Bilimsel model",
          "definition": "Gerçek bir sistemi veya süreci anlamaya yardım eden, seçilmiş özellikleri sadeleştirerek gösteren açıklama/temsil.",
          "connection": "Bilimsel model, gerçek sistemi sadeleştirerek temel ilişkileri gösterir; modelin hangi özellikleri dışarıda bıraktığını da bilmek gerekir."
        },
        {
          "term": "Kanıt",
          "definition": "Bir açıklamayı desteklemek veya sınamak için kullanılan gözlem, ölçüm ya da güvenilir bilgi.",
          "connection": "Her kavramı bir araştırma sorusu ve kanıt türüyle ilişkilendirmek tekrar etmeyi anlamlı kılar."
        },
        {
          "term": "Temsilî görsel",
          "definition": "Bir kavramı anlatmak için hazırlanmış çizim; gerçek boyut ve görünüşü bire bir göstermeyebilir.",
          "connection": "Görsel bir süreci anlaşılır kılmak için seçilmiş özellikleri gösterir; boyutları ve uzaklıkları gerçek ölçekle karşılaştırmadan kesin ölçü gibi kullanma."
        },
        {
          "term": "Kaynak",
          "definition": "Bilginin nereden alındığını gösteren kitap, araştırma, kurum veya güvenilir yayın.",
          "connection": "Kaynak ve kanıt belirtilmesi, bilginin yeniden kontrol edilebilmesini sağlar."
        }
      ],
      points: ["Araçları görevleriyle eşleştir.", "Yıldız yaşam yollarını başlangıç kütlesine göre karşılaştır.", "Modelin sınırını ve kullandığın kaynağı belirt."],
      terms: ['uzay teknolojisi', 'yıldız yaşam döngüsü', 'galaksi', 'kanıt'],
      tasks: ['Ünite kavramlarını kendi notlarınla tekrar et.', 'Bir uzay sorunu veya yıldız yaşam döngüsü için poster taslağı oluştur.', 'Ürünün için kaynak ve doğruluk kontrolü yap.'],
      quiz: { prompt: 'Yıldız, galaksi ve evren kavramlarını açıklayan bir harita hazırlanırken en kapsayıcı kavram hangisidir?', options: ['Evren', 'Yıldız', 'Bulutsu', 'Takımyıldız'], answer: 0, explanation: 'Evren, galaksileri ve uzaydaki yapıları kapsayan en geniş kavramdır.', hint: 'Kavramların kapsamını büyükten küçüğe düşün.'},
      activity: { title: 'Uzay bilimi sergisi için taslak', format: 'Poster veya rapor planı', prompt: 'Bir sınıf sergisi için “uzay araştırmalarının yararları ve sorumlu kullanımı” başlıklı özgün bir poster taslağını yazıyla planla. Ana mesaj, iki kanıt/örnek, bir olası sorun ve bir çözüm ölçütü belirt.', placeholder: 'Ana mesaj… Örnekler… Sorun… Çözüm ve ölçüt…', minChars: 35, criteria: ['Ana mesajı açıkla.', 'İki konu örneğini bilimsel kavramla bağla.', 'Sorun ve çözüm ölçütü sun.'], hint: 'Ünite içindeki uzay teknolojisi, ışık kirliliği veya uzay kirliliği başlıklarından yararlan.' },
    },
    {
      id: 13, date: '14–18 Ara', unitId: 'energy', topic: 'Kuvvet, hareket ve fiziksel anlamda iş', pages: '58–63', visual: 'energy', visualNote: "Eğri yol üzerindeki bilyenin hareketini izlerken, fiziksel iş için kuvvetin yönü ve yer değiştirmenin yönünü birlikte düşün.",
      focus: "Fizikte iş yapılması için kuvvetin cisimde kuvvet doğrultusunda yer değiştirme oluşturması gerektiğini açıkla.",
      summary: [
        "Günlük dilde “iş yapmak” çaba harcamak anlamına gelir; fizikte iş, bir cisme kuvvet uygulanması ve cismin kuvvet doğrultusunda yer değiştirmesiyle tanımlanır. Bu nedenle yorulmak, tek başına fiziksel anlamda iş yapıldığını göstermez. Fiziksel ölçüt kişinin hissi değil, cisim üzerindeki kuvvet ve hareket ilişkisidir.",
        "Önce hangi cisme kuvvet uygulandığını belirle, sonra cisimde yer değiştirme olup olmadığına bak. Cismin yer değiştirmesi kuvvetin doğrultusundaysa fiziksel iş yapılır. Kuvvet uygulanıp cisim hiç hareket etmiyorsa iş yapılmış sayılmaz; kuvvet ile hareket birbirine dik doğrultudaysa kuvvetin hareket yönünde etkisi yoktur.",
        "Kitabın sınıf öyküsünde öğretmen masayı iterek hareket ettirir, kalemleri yerden kaldırır ve bilgisayar çantasını taşır. Her sahnede aynı karar verilmez: masada yatay hareket, kalemleri kaldırmada yukarı hareket vardır; çantayı yatay taşırken destek kuvvetinin yönüyle hareket yönünü ayrıca karşılaştırmak gerekir.",
        "Bir örneği değerlendirirken kuvvet oku ile yer değiştirme okunu çiz ve ikisinin yönünü karşılaştır. Duvarı itmek, duvar hareket etmediğinde fiziksel iş değildir; buna rağmen kişi enerji harcayabilir ve yorulabilir. “Fiziksel iş yok” sonucu, hiçbir kuvvet uygulanmadığı anlamına gelmez."
      ],
      termDefinitions: [
        {
          "term": "Kuvvet",
          "definition": "Cisimlerin hareketini veya şeklini değiştirebilen itme ya da çekme etkisi.",
          "connection": "Kuvvet uygulanıp cisim hiç hareket etmiyorsa iş yapılmış sayılmaz; kuvvet ile hareket birbirine dik doğrultudaysa kuvvetin hareket yönünde etkisi yoktur."
        },
        {
          "term": "Yer değiştirme",
          "definition": "Bir cismin başlangıç konumundan son konumuna yönlü konum değişimi.",
          "connection": "Günlük dilde “iş yapmak” çaba harcamak anlamına gelir; fizikte iş, bir cisme kuvvet uygulanması ve cismin kuvvet doğrultusunda yer değiştirmesiyle tanımlanır."
        },
        {
          "term": "Fiziksel iş",
          "definition": "Bir kuvvetin cismi kuvvet doğrultusunda yer değiştirmesiyle gerçekleşen fiziksel etki.",
          "connection": "Duvarı itmek, duvar hareket etmediğinde fiziksel iş değildir; buna rağmen kişi enerji harcayabilir ve yorulabilir."
        },
        {
          "term": "Doğrultu",
          "definition": "Bir hareketin veya kuvvetin üzerinde bulunduğu çizgi; yön, bu çizgi üzerindeki hangi tarafı gösterir.",
          "connection": "Kuvvet uygulanıp cisim hiç hareket etmiyorsa iş yapılmış sayılmaz; kuvvet ile hareket birbirine dik doğrultudaysa kuvvetin hareket yönünde etkisi yoktur."
        },
        {
          "term": "Joule (J)",
          "definition": "Fiziksel iş ve enerji için kullanılan ölçü birimi.",
          "connection": "Kuvvetin cismi kendi doğrultusunda ne kadar yer değiştirdiğini hesaplarken işin büyüklüğü joule ile ifade edilir; enerji de aynı birimle ölçülür."
        }
      ],
      points: ["Fiziksel iş için kuvvet uygulanması gerekir.", "Cisim kuvvet doğrultusunda yer değiştirmelidir.", "Günlük “çaba” ile fiziksel iş kavramı aynı değildir."],
      terms: ['kuvvet', 'yer değiştirme', 'fiziksel iş', 'doğrultu'],
      tasks: ['Günlük hayattan kuvvet uygulanan üç durum düşün.', 'Her durumda cisimde yer değiştirme olup olmadığını kaydet.', 'Fiziksel iş ölçütünü kullanarak sınıflandırmanı gerekçelendir.'],
      quiz: { prompt: 'Bir öğrenci ağır bir kutuyu itiyor, ancak kutu hareket etmiyor. Bu durumda kutuya fiziksel anlamda iş yapılmış mıdır?', options: ['Hayır; kutuda kuvvet doğrultusunda yer değiştirme oluşmamıştır.', 'Evet; kuvvet uygulamak her zaman fiziksel iş demektir.', 'Evet; öğrencinin yorulması fiziksel iş için yeterlidir.', 'Hayır; çünkü kutunun kütlesi bilinmiyor.'], answer: 0, explanation: 'Fiziksel iş için kuvvetle birlikte kuvvet doğrultusunda yer değiştirme gerekir.', hint: 'Uygulanan kuvvet kadar cismin yer değiştirip değiştirmediğini de kontrol et.'},
      activity: { title: 'İş var mı? Karar kartları', format: 'Günlük durumları ölçütle inceleme', prompt: 'Üç durum yaz: hareket eden bir cisim, itilmesine rağmen yerinde kalan bir cisim ve kuvvet doğrultusuna dik yönde hareket eden bir cisim. Her durumda fiziksel iş olup olmadığını ölçütle açıkla.', placeholder: 'Durum 1… Kuvvet… Yer değiştirme… Sonuç…', minChars: 30, criteria: ['Üç farklı durumu ayırt et.', 'Kuvvet ve yer değiştirme doğrultusunu kullan.', 'Günlük çabayı fiziksel işten ayır.'], hint: 'Her örnekte kuvvetin yönü ile yer değiştirmenin yönünü birlikte incele.' },
    },
    {
      id: 14, date: '21–25 Ara', unitId: 'energy', topic: 'Kuvvet ve yer değiştirmeyi örneklerle değerlendirme', pages: '60–64', visual: 'energy', visualNote: "Bilyenin yoldaki yüksek ve alçak konumlarına bakarken, kuvvet ile hareket yönünün her örnekte aynı olup olmadığını sorgula.",
      focus: "Fiziksel iş kararını kuvvetin yönü ve cismin yer değiştirmesini karşılaştırarak ver.",
      summary: [
        "Bir cisme kuvvet uygulanması, cismin mutlaka hareket ettiği anlamına gelmez. Fiziksel iş için kuvvetle birlikte yer değiştirme gerekir; ayrıca yer değiştirmenin yönü kuvvetin uygulandığı yönle karşılaştırılır. Bu koşullar, günlük yaşamdaki taşıma, itme ve kaldırma örneklerine aynı ölçütü uygulamamızı sağlar.",
        "Bir kitabı yukarı kaldırırken uygulanan kuvvet ve yer değiştirme aynı yöndedir; kitap yükselir. Yerde duran duvarı itmek kuvvet uygulamasıdır ama duvarın yer değiştirmesi yoksa iş yapılmaz. Yatay yolda yük taşırken kuvvetin hangi cisme, hangi yönde uygulandığını açıklamak gerekir; taşıyan kişinin yorulması fiziksel tanımın yerine geçmez.",
        "Kitap, çağrı merkezi çalışanının bilgisayar başındaki çalışması ile duvar örerken tuğlayı hareket ettirme örneğini karşılaştırır. Fizikte değerlendirme kişinin meslek ya da çaba düzeyine göre değil, kuvvet ve yer değiştirmenin ilişkisine göre yapılır. Bir cisme daha büyük kuvvet uygulanıp daha fazla yol aldırılırsa yapılan iş de artabilir.",
        "İşin büyüklüğünü karşılaştırırken cisme etki eden kuvveti ve kuvvet doğrultusunda alınan yolu aynı tabloya yaz. Birimler newton ve metredir; iş birimi joule’dür. Şemadaki okları izlemeden “hareket etti, demek iş yapıldı” deme; hareketin kuvvete göre yönü de önemlidir."
      ],
      termDefinitions: [
        {
          "term": "Net kuvvet",
          "definition": "Bir cisme etki eden kuvvetlerin birlikte oluşturduğu toplam etki.",
          "connection": "Cisme etki eden kuvvetler birlikte değerlendirilir; net kuvvet hareketin değişimini etkilerken fiziksel iş için ayrıca kuvvet doğrultusunda yer değiştirme gerekir."
        },
        {
          "term": "Kuvvet doğrultusu",
          "definition": "Kuvvetin etkidiği çizgi; cismin yer değiştirmesiyle karşılaştırılır.",
          "connection": "İşin büyüklüğünü karşılaştırırken cisme etki eden kuvveti ve kuvvet doğrultusunda alınan yolu aynı tabloya yaz."
        },
        {
          "term": "Fiziksel iş",
          "definition": "Kuvvet etkisiyle kuvvet doğrultusunda gerçekleşen yer değiştirme.",
          "connection": "Fiziksel iş için kuvvetle birlikte yer değiştirme gerekir; ayrıca yer değiştirmenin yönü kuvvetin uygulandığı yönle karşılaştırılır."
        },
        {
          "term": "Newton (N)",
          "definition": "Kuvvetin ölçü birimi.",
          "connection": "Kuvveti ölçerken newton kullanılır; iş ve enerji ise joule ile ifade edilir, bu birimler birbirinin yerine geçmez."
        },
        {
          "term": "Joule (J)",
          "definition": "İşin ve enerjinin ölçü birimi.",
          "connection": "Bir cisme kuvvet uygulanıp kuvvet doğrultusunda yer değiştirme olduğunda yapılan fiziksel iş joule cinsinden değerlendirilir."
        }
      ],
      points: ["Kuvvet ile yer değiştirmenin yönünü karşılaştır.", "Kuvvet uygulanması tek başına fiziksel iş anlamına gelmez.", "Kararını günlük çabaya değil fiziksel ölçüte dayandır."],
      terms: ['kuvvet yönü', 'yer değiştirme yönü', 'iş', 'karşılaştırma'],
      tasks: ['İki örnekte kuvvet ve hareket yönlerini oklarla göster.', 'Bir “iş yapılmaz” örneğini ve nedenini yaz.', 'Bir “iş yapılır” örneğinde gerekli iki koşulu açıkla.'],
      quiz: { prompt: 'Yatay zeminde duran bir sandığı yatay yönde iten kişi, sandığı da aynı yönde hareket ettiriyor. Hangi sonuç uygundur?', options: ['Kuvvet doğrultusunda yer değiştirme olduğundan fiziksel iş yapılır.', 'Kişi yorulmadıkça fiziksel iş yapılmaz.', 'Sandık hareket ettiği için kuvvete gerek yoktur.', 'Hareket ve kuvvet farklı doğrultularda olmalıdır.'], answer: 0, explanation: 'Sandık kuvvet doğrultusunda yer değiştirdiği için fiziksel iş yapılır.', hint: 'Kuvvet ve yer değiştirme doğrultularının aynı olup olmadığını kontrol et.'},
      activity: { title: 'Hareket yönü gözlem tablosu', format: 'Kuvvet–hareket matrisi', prompt: 'Bir kapıyı itme, masayı sürükleme ve duvarı itme örneklerini karşılaştır. Her örnek için kuvvet yönünü, yer değiştirme olup olmadığını ve fiziksel iş kararını yaz.', placeholder: 'Örnek… Kuvvet yönü… Yer değiştirme… Kararım…', minChars: 30, criteria: ['Üç örneği karşılaştır.', 'Kuvvet yönünü belirt.', 'Kararı fiziksel iş ölçütüyle gerekçelendir.'], hint: 'Duvar örneğinde kuvvet bulunur; karar için yer değiştirme olup olmadığını ayrıca sor.' },
    },
    {
      id: 15, date: '28–31 Ara', unitId: 'energy', topic: 'Enerji çeşitleri ve kinetik enerji', pages: '64–70', visual: 'energy', visualNote: "Bilye en alçak noktadan geçerken hareket enerjisini düşün; bir deneyde kütle ile hızı ayrı ayrı karşılaştır.",
      focus: "Hareketli cisimlerin kinetik enerjiye sahip olduğunu ve kütle-hız karşılaştırmalarının bu enerjiyle ilişkisini açıkla.",
      summary: [
        "Enerji, iş yapabilme yeteneği olarak tanımlanır. Hareket hâlindeki cisimler kinetik enerjiye sahiptir; hareket etmeyen bir cisim de konumundan veya esnekliğinden dolayı potansiyel enerji depolayabilir. Bir cismin enerji türünü belirlerken onun hareketine, konumuna ve şekil değişimine bakılır.",
        "Kinetik enerjiyi karşılaştırırken kütle ve hız önemlidir. Aynı koşullarda daha büyük kütleli ya da daha hızlı hareket eden cismin kinetik enerjisi daha fazla olabilir. Kütlenin etkisini araştırmak için hızı, hızın etkisini araştırmak için kütleyi sabit tutmak gerekir; böylece karşılaştırma adil olur.",
        "Kitapta koşan çocuklar, yarış arabası, barajda biriken su ve denizde ilerleyen tekne gibi örnekler bulunur. Hareket eden çocuk/araç/tekne kinetik enerjiyle, yüksekte tutulan su ise çekim potansiyel enerjisiyle ilişkilidir. Bir örnek bazen birden fazla enerji türü taşıyabilir; soruda hangi enerjiye bakıldığı açık olmalıdır.",
        "Kinetik enerji yalnızca hareket ederken anlam kazanır. Duran bir arabanın kinetik enerjisi yoktur; fakat yüksek bir konumdaysa potansiyel enerjisi olabilir. Görsellerden çıkarım yaparken kütle ve hız hakkında verilen bilgileri ara; sadece cismin büyük görünmesi veya fotoğrafta hızlıymış gibi görünmesi ölçüm değildir."
      ],
      termDefinitions: [
        {
          "term": "Enerji",
          "definition": "İş yapabilme veya değişim oluşturabilme yeteneği olarak tanımlanan fiziksel büyüklük.",
          "connection": "Hareket hâlindeki cisimler kinetik enerjiye sahiptir; hareket etmeyen bir cisim de konumundan veya esnekliğinden dolayı potansiyel enerji depolayabilir."
        },
        {
          "term": "Kinetik enerji",
          "definition": "Bir cismin hareketinden dolayı sahip olduğu enerji.",
          "connection": "Hareket hâlindeki cisimler kinetik enerjiye sahiptir; hareket etmeyen bir cisim de konumundan veya esnekliğinden dolayı potansiyel enerji depolayabilir."
        },
        {
          "term": "Kütle",
          "definition": "Bir cisimdeki madde miktarını gösteren özellik.",
          "connection": "Görsellerden çıkarım yaparken kütle ve hız hakkında verilen bilgileri ara; sadece cismin büyük görünmesi veya fotoğrafta hızlıymış gibi görünmesi ölçüm değildir."
        },
        {
          "term": "Hız",
          "definition": "Bir cismin hareketinin süratini ve yönünü belirten büyüklük.",
          "connection": "Görsellerden çıkarım yaparken kütle ve hız hakkında verilen bilgileri ara; sadece cismin büyük görünmesi veya fotoğrafta hızlıymış gibi görünmesi ölçüm değildir."
        },
        {
          "term": "Adil karşılaştırma",
          "definition": "Bir etkene bakarken diğer önemli değişkenleri aynı tutarak yapılan karşılaştırma.",
          "connection": "İki cismin kinetik enerjisini karşılaştırırken kütle etkisini inceliyorsan hızı, hız etkisini inceliyorsan kütleyi sabit tut; böylece hangi değişkenin etkili olduğu anlaşılır."
        }
      ],
      points: ["Hareketli cisimler kinetik enerjiye sahiptir.", "Kütle ve hız kinetik enerji karşılaştırmasını etkiler.", "Adil karşılaştırmada diğer değişkenler sabit tutulur."],
      terms: ['enerji', 'kinetik enerji', 'kütle', 'hız'],
      tasks: ['Farklı hızlarla hareket eden iki nesne örneği kur.', 'Kütle etkisini incelemek için sabit tutacağın değişkeni belirt.', 'Gözlem sonucunu bir karşılaştırma cümlesiyle yaz.'],
      quiz: { prompt: 'Aynı yolda hareket eden iki araçtan hangisinin kinetik enerjisi daha fazladır?', options: ['Kütlesi ve hızı daha büyük olanın', 'Daha yavaş ve daha hafif olanın', 'Hareket etmeyenin', 'Yalnızca rengi daha koyu olanın'], answer: 0, explanation: 'Kinetik enerji karşılaştırmasında hem kütle hem de hız önemlidir.', hint: 'Hareket enerjisini etkileyen iki özelliği birlikte düşün.'},
      activity: { title: 'Kinetik enerji için adil karşılaştırma', format: 'Değişkenleri kontrol etme', prompt: 'Bir oyuncak aracın kütlesi ve hızı ile kinetik enerjisini karşılaştıran iki küçük deney tasarla. İlk deneyde hangi değişkeni değiştireceğini, hangisini sabit tutacağını; ikinci deneyde de aynı bilgileri yaz.', placeholder: 'Deney 1… Değişen… Sabit… Beklentim…', minChars: 30, criteria: ['Kütle ve hız değişkenlerini ayırt et.', 'Bir deneyde tek temel değişkeni değiştir.', 'Ölçüm veya karşılaştırma yolunu belirt.'], hint: 'İki değişkeni aynı anda değiştirirsen hangi değişikliğin etkili olduğunu anlayamazsın.' },
    },
    {
      id: 16, date: '4–8 Oca', unitId: 'energy', topic: 'Potansiyel enerji: yükseklik ve esneklik', pages: '64–70', visual: 'energy', visualNote: "Yüksek konum ile alçak konumu karşılaştır; esnek cisimlerde enerji depolanmasının farklı bir durum olduğunu hatırla.",
      focus: "Çekim potansiyel enerjisini kütle ve yükseklikle; esneklik potansiyel enerjisini cismin gerilme veya sıkışma durumuyla ilişkilendir.",
      summary: [
        "Potansiyel enerji, cismin konumu veya durumuna bağlı olarak depolanmış kabul edilen enerjidir. Çekim potansiyel enerjisi cismin ağırlığı ve yüksekliğiyle ilişkilidir: aynı cisim daha yüksek noktadayken veya aynı yükseklikte daha ağır bir cisimken bu enerji daha büyük olabilir.",
        "Esnek bir cisim gerildiğinde veya sıkıştırıldığında, eski şekline dönme eğilimi nedeniyle enerji depolayabilir. Yayın sıkıştırılması ya da lastiğin gerilmesi bunun örneğidir. Serbest bırakıldığında depolanan enerji cismin hareket etmesine veya başka bir değişime yol açabilir.",
        "Kitapta barajdaki su, yüksek bir konum, yay ve gerilmiş lastik gibi örnekler karşılaştırılır. Barajda yükseltilmiş su çekim potansiyel enerjisiyle, sıkıştırılmış yay esneklik potansiyel enerjisiyle ilişkilidir. Bu iki türün ortak yanı enerji depolamasıdır; kaynağı ve değişkenleri farklıdır.",
        "Bir cismin yüksekliğini veya ağırlığını değiştirerek çekim potansiyel enerjisini karşılaştır; esnek cisimde ise gerilme/sıkışma miktarını incele. Yükseklik arttı diye her durumda enerji türü yalnızca potansiyel olmaz: cisim hareket ediyorsa kinetik enerji de bulunabilir. Model ve çizimde varsayılan koşulları belirt."
      ],
      termDefinitions: [
        {
          "term": "Potansiyel enerji",
          "definition": "Cismin konumundan veya durumundan dolayı depoladığı kabul edilen enerji.",
          "connection": "Bir cismin yüksekliğini veya ağırlığını değiştirerek çekim potansiyel enerjisini karşılaştır; esnek cisimde ise gerilme/sıkışma miktarını incele."
        },
        {
          "term": "Çekim potansiyel enerjisi",
          "definition": "Cismin yer çekimine göre konumu ve ağırlığıyla ilişkili enerji.",
          "connection": "Bir cismin yüksekliğini veya ağırlığını değiştirerek çekim potansiyel enerjisini karşılaştır; esnek cisimde ise gerilme/sıkışma miktarını incele."
        },
        {
          "term": "Esneklik potansiyel enerjisi",
          "definition": "Gerilmiş ya da sıkışmış esnek cismin depolayabildiği enerji.",
          "connection": "Barajda yükseltilmiş su çekim potansiyel enerjisiyle, sıkıştırılmış yay esneklik potansiyel enerjisiyle ilişkilidir."
        },
        {
          "term": "Esnek cisim",
          "definition": "Kuvvet kalktığında eski şekline dönme eğilimi gösteren cisim.",
          "connection": "Bir cismin yüksekliğini veya ağırlığını değiştirerek çekim potansiyel enerjisini karşılaştır; esnek cisimde ise gerilme/sıkışma miktarını incele."
        },
        {
          "term": "Ağırlık",
          "definition": "Yer çekiminin bir cisme uyguladığı kuvvet.",
          "connection": "Ağırlık yer çekiminin cisme uyguladığı kuvvettir; çekim potansiyel enerjisini karşılaştırırken yükseklikle birlikte dikkate alınır."
        }
      ],
      points: ["Çekim potansiyel enerjisi kütle ve yükseklikle ilişkilidir.", "Gerilen veya sıkışan esnek cisim enerji depolayabilir.", "Farklı potansiyel enerji türlerinin dayandığı durumlar farklıdır."],
      terms: ['potansiyel enerji', 'çekim', 'yükseklik', 'esneklik'],
      tasks: ['Aynı yükseklikte farklı kütleleri karşılaştır.', 'Aynı cisim için iki farklı yüksekliği karşılaştır.', 'Sıkıştırılmış bir yayın enerjisinin nasıl değişebileceğini açıkla.'],
      quiz: { prompt: 'Aynı cismin çekim potansiyel enerjisini artırmak için hangi değişiklik yapılabilir?', options: ['Cisim daha yüksek bir konuma çıkarılabilir.', 'Cisim aynı yükseklikte bekletilebilir.', 'Cismin rengi değiştirilebilir.', 'Cisim hareket etmeden yerde bırakılabilir.'], answer: 0, explanation: 'Aynı cisim için yükseklik arttıkça çekim potansiyel enerjisi artar.', hint: 'Çekim potansiyel enerjisinde cismin konumuna ilişkin özelliği düşün.'},
      activity: { title: 'Enerji depolayan durumlar', format: 'Model ve karşılaştırma', prompt: 'Bir sırada bekleyen top, daha yüksek raftaki aynı top ve sıkıştırılmış yay için enerji karşılaştırması yap. Her durumda enerji türünü ve karşılaştırmada hangi özelliğin etkili olduğunu açıkla.', placeholder: 'Top 1… Top 2… Yay… Etkili özellik…', minChars: 25, criteria: ['Çekim ve esneklik potansiyel enerjisini ayırt et.', 'Yükseklik/kütle veya esneklik özelliğini kullan.', 'Karşılaştırma gerekçesi yaz.'], hint: 'Topların kütlesini aynı kabul edip yükseklik değişimini; yayda ise sıkışma durumunu düşün.' },
    },
    {
      id: 17, date: '11–15 Oca', unitId: 'energy', topic: 'Kinetik ve potansiyel enerji dönüşümleri', pages: '71–72', visual: 'energy', visualNote: "Bilyenin yüksek noktadan en alt noktaya inişini izle; konum ve hareket değiştikçe enerji türlerinin nasıl değiştiğini düşün.",
      focus: "Bir cismin konumu ve hareketi değişirken kinetik enerji ile çekim potansiyel enerjisinin dönüşümünü açıkla.",
      summary: [
        "Enerji dönüşümü, bir enerji türünün başka bir türe dönüşmesidir. Salıncak veya sarkaç yukarıdayken yüksekliği ve çekim potansiyel enerjisi daha fazla, hareketi yavaş olabilir; aşağı inerken hızlanır ve kinetik enerjisi artabilir. En alt noktada hız çoğu zaman en büyük, yükseklik en küçüktür.",
        "Sarkaç karşı tarafa yükselirken kinetik enerjisinin bir bölümü yeniden çekim potansiyel enerjisine dönüşebilir. Başlangıç ve uç noktalarda topuz bir an için yavaşlar; en altta ise hareketi hızlanır. Bu, cismin konumu ile hareketinin birlikte enerji değişimine yol açtığını gösterir.",
        "Kitap öğrencilere salıncak öyküsü verir ve sarkaç, basketbol topu, maket araba, yay ve eğik düzlemle gözlem yapmalarını önerir. Her düzende başlangıç, en alt ve en üst gibi konumlar belirlenir; kinetik ve potansiyel enerji karşılaştırılır. Sürtünmenin ihmal edilip edilmediği sonucu etkiler.",
        "Enerji grafiğinde bir tür artarken diğeri azalabilir; bu, toplam enerjinin kaybolduğu anlamına gelmez. Gerçek salıncak zamanla durur çünkü sürtünme ve hava direnci hareket enerjisinin bir bölümünü ısı ve ses gibi biçimlere aktarır. İdeal modelde bu etkiler bazen özellikle yok sayılır."
      ],
      termDefinitions: [
        {
          "term": "Enerji dönüşümü",
          "definition": "Enerjinin bir türden başka bir türe geçmesi.",
          "connection": "Enerji dönüşümü, bir enerji türünün başka bir türe dönüşmesidir."
        },
        {
          "term": "Salınım",
          "definition": "Bir cismin denge konumu çevresinde ileri-geri hareketi.",
          "connection": "Sarkaç bir uçtan aşağı inerken hızlanır; alçak noktada kinetik enerjisi büyür, yükselirken enerjinin bir bölümü yeniden çekim potansiyel enerjisine dönüşür."
        },
        {
          "term": "Sarkaç",
          "definition": "Bir ip veya çubuk ucuna asılı cismin salınım hareketi yaptığı düzenek.",
          "connection": "Salıncak veya sarkaç yukarıdayken yüksekliği ve çekim potansiyel enerjisi daha fazla, hareketi yavaş olabilir; aşağı inerken hızlanır ve kinetik enerjisi artabilir."
        },
        {
          "term": "Kinetik enerji",
          "definition": "Cismin hareketiyle ilişkili enerji.",
          "connection": "Salıncak veya sarkaç yukarıdayken yüksekliği ve çekim potansiyel enerjisi daha fazla, hareketi yavaş olabilir; aşağı inerken hızlanır ve kinetik enerjisi artabilir."
        },
        {
          "term": "Çekim potansiyel enerjisi",
          "definition": "Cismin yer çekimine göre yüksekliği ve ağırlığıyla ilişkili enerji.",
          "connection": "Salıncak veya sarkaç yukarıdayken yüksekliği ve çekim potansiyel enerjisi daha fazla, hareketi yavaş olabilir; aşağı inerken hızlanır ve kinetik enerjisi artabilir."
        }
      ],
      points: ["Yukarı çıkarken kinetik enerji potansiyel enerjiye dönüşebilir.", "Aşağı inerken potansiyel enerji kinetik enerjiye dönüşebilir.", "Sürtünme enerji dönüşümünü etkileyebilir."],
      terms: ['enerji dönüşümü', 'kinetik enerji', 'çekim potansiyel enerjisi', 'salıncak'],
      tasks: ['Bir salıncağın en üst ve en alt konumlarını karşılaştır.', 'Hangi enerji türünün arttığını ve azaldığını oklarla göster.', 'Modelde sürtünme varsa sonuçta ne fark edebileceğini belirt.'],
      quiz: { prompt: 'Bir top yüksek bir noktadan aşağı doğru yuvarlanırken hangi değişim beklenir?', options: ['Çekim potansiyel enerjisi azalırken kinetik enerji artabilir.', 'Kinetik enerji azalırken topun yüksekliği artar.', 'Enerji türü hiçbir koşulda değişmez.', 'Topun rengi kinetik enerjiyi belirler.'], answer: 0, explanation: 'Aşağı inerken yükseklik azalır; hareket hızlanıyorsa kinetik enerji artabilir.', hint: 'Topun konum ve hareketindeki değişimi ayrı ayrı izle.'},
      activity: { title: 'Salıncakta enerji haritası', format: 'Konum–enerji tablosu', prompt: 'Bir salıncağın sol üst, orta-alt ve sağ üst konumlarında hareket hızını ve yüksekliğini karşılaştır. Her konumda kinetik ve çekim potansiyel enerjisinin göreli durumunu sözcüklerle belirt.', placeholder: 'Sol üst… Orta-alt… Sağ üst…', minChars: 30, criteria: ['En az üç konum karşılaştır.', 'Hız ve yüksekliği birlikte kullan.', 'Enerji dönüşümünü açıklayan bir cümle yaz.'], hint: 'En yüksek noktalarda hız, en alt noktada yükseklik nasıl değişiyor?'},
    },
    {
      id: 18, date: '18–22 Oca', unitId: 'energy', topic: 'Enerjinin korunumu ve sürtünmenin etkisi', pages: '72–80', visual: 'energy', visualNote: "Bilye hareket ederken sürtünmenin etkisini de düşün; yavaşlaması enerjinin yok olduğu anlamına gelmez.",
      focus: "Enerjinin yok olmadığını, tür değiştirebildiğini ve sürtünmeyle çevreye aktarılabildiğini örnekle.",
      summary: [
        "Enerjinin korunumu, enerjinin yoktan var olmadığı ve var olan enerjinin bütünüyle yok olmadığı ilkesidir. Enerji, sistem içinde tür değiştirebilir veya sistem ile çevre arasında aktarılabilir. Bu yüzden hareket azaldığında “enerji kayboldu” demek yerine hangi enerji biçimlerine dönüştüğünü ya da çevreye geçtiğini araştırırız.",
        "Sürtünmesiz bir modelde top yokuş aşağı inerken çekim potansiyel enerjisi azalır, kinetik enerjisi artar; yukarı çıkarken bunun tersi görülebilir. Sürtünme varsa mekanik enerjinin bir bölümü ısıya, bazen sese dönüşür. Topun yavaşlaması hareket enerjisinin başka türlere aktarılmasıyla açıklanır.",
        "Kitap eğik düzlem, sarkaç, basketbol topu ve yaylı araba deneyleriyle bu değişimleri karşılaştırır; bazı yönergelerde sürtünme kuvvetinin ihmal edilmesini özellikle söyler. Bu, öğrencinin ideal koşulla gerçek gözlem arasındaki farkı görmesi içindir. Ölçüm yapılırken sistemin nerede başlayıp nerede bittiği açık olmalıdır.",
        "Enerji grafiğinde yalnızca kinetik ve potansiyel sütunlara bakarsan, sürtünmede ortaya çıkan ısıyı gözden kaçırabilirsin. Model varsayımlarını, ölçüm sınırlarını ve çevreye aktarılan enerjiyi yaz. Enerji tür değiştirir; toplamı izlemek için sisteme ve çevresine ilişkin tüm dönüşümleri hesaba katmak gerekir."
      ],
      termDefinitions: [
        {
          "term": "Enerjinin korunumu",
          "definition": "Enerjinin yoktan var olmayıp yok olmaması; tür değiştirmesi veya aktarılması ilkesi.",
          "connection": "Enerjinin korunumu, enerjinin yoktan var olmadığı ve var olan enerjinin bütünüyle yok olmadığı ilkesidir."
        },
        {
          "term": "Sürtünme",
          "definition": "Temas eden yüzeylerin göreli hareketine karşı koyan etki.",
          "connection": "Sürtünmesiz bir modelde top yokuş aşağı inerken çekim potansiyel enerjisi azalır, kinetik enerjisi artar; yukarı çıkarken bunun tersi görülebilir."
        },
        {
          "term": "Mekanik enerji",
          "definition": "Hareket enerjisi ile konumdan kaynaklanan potansiyel enerjinin toplamı olarak incelenen enerji.",
          "connection": "Sürtünme varsa mekanik enerjinin bir bölümü ısıya, bazen sese dönüşür."
        },
        {
          "term": "Sistem",
          "definition": "İncelenmek üzere sınırları belirlenen cisim veya cisimler grubu.",
          "connection": "Enerji tür değiştirir; toplamı izlemek için sisteme ve çevresine ilişkin tüm dönüşümleri hesaba katmak gerekir."
        },
        {
          "term": "Isı aktarımı",
          "definition": "Sıcaklık farkıyla enerjinin bir cisimden ya da ortamdan diğerine geçmesi.",
          "connection": "Sürtünme mekanik enerjinin bir bölümünü iç enerjiye dönüştürür; bu enerji daha sıcak temas yüzeyinden çevreye aktarılabilir."
        }
      ],
      points: ["Enerji tür değiştirebilir veya sistemle çevre arasında aktarılabilir.", "Sürtünme mekanik enerjinin bir bölümünü ısı ve sese dönüştürebilir.", "Model varsayımları açıkça belirtilmelidir."],
      terms: ['enerjinin korunumu', 'sürtünme', 'ısı enerjisi', 'ses enerjisi'],
      tasks: ['Bir sarkaçta enerji dönüşümünü üç konumda göster.', 'Sürtünme ihmal edildiğinde ve edildiğinde beklenen farkı yaz.', 'Enerji türlerinin bir bölümünün nerede görülebileceğine örnek ver.'],
      quiz: { prompt: 'Sürtünme nedeniyle yavaşlayan bir araçta mekanik enerjiyle ilgili hangi açıklama uygundur?', options: ['Enerjinin bir bölümü ısı ve ses gibi başka türlere dönüşebilir.', 'Enerji bütünüyle yok olur.', 'Enerji dönüşümünde hareket her zaman hızlanır.', 'Sürtünme enerjiyi ortadan kaldırır.'], answer: 0, explanation: 'Sürtünme, mekanik enerjinin bir bölümünü ısı ve ses gibi türlere aktarabilir.', hint: 'Enerji yok olmak yerine hangi başka biçimlerde çevreye aktarılabilir?'},
      activity: { title: 'Sarkaç modelinde varsayımlar', format: 'Modeli açıklama ve kanıt', prompt: 'Bir sarkacın ilk bırakıldığı, en alt noktadan geçtiği ve karşı tarafa yükseldiği konumları karşılaştır. Önce sürtünmenin ihmal edildiği modeli, sonra gerçek düzende zamanla görülebilecek değişimi açıkla.', placeholder: 'İdeal model… Gerçek düzende… Enerji aktarımı…', minChars: 30, criteria: ['Üç konumu karşılaştır.', 'İdeal varsayımı açıkça yaz.', 'Sürtünme ve enerji aktarımını ilişkilendir.'], hint: 'Bir süre sonra hareketin azalması enerjinin yok olduğu anlamına gelmez.' },
    },
    {
      id: 19, date: '8–12 Şub', unitId: 'energy', topic: 'Kuvvet ve enerji ünitesi: günlük yaşam ve tekrar', pages: '59–81', visual: 'energy', visualNote: "Aynı modelde yüksekliği, hareketi ve sürtünmeyi ayrı ayrı inceleyerek ünite kavramlarını ilişkilendir.",
      focus: "Fiziksel iş, enerji türleri ve enerji dönüşümlerini günlük bir hareket örneğinde ilişkilendir.",
      summary: [
        "Kuvvet-enerji ünitesindeki temel kavramlar birbirine bağlıdır ama aynı anlama gelmez. Fiziksel iş için kuvvet ve kuvvet doğrultusunda yer değiştirme gerekir; kinetik enerji hareketle, potansiyel enerji ise konum veya esneklikle ilişkilidir. Bir olayı açıklarken hangi kavramı kullandığını açıkça adlandır.",
        "Bir bisiklet yokuş yukarı çıkarken pedala uygulanan kuvvet bisikleti hareket ettirir; bisikletin hızı ve yüksekliği değiştikçe kinetik ve çekim potansiyel enerjisi de değişebilir. Yokuş aşağı inerken enerji dönüşümü farklı yönde görünür. Sürtünme tekerlek, yol ve havayla etkileşerek enerji aktarımına yol açar.",
        "Kitabın kaykay yarım borusu, sarkaç, top, yay ve eğik düzlem örnekleri bu ilişkileri farklı durumlarda tekrar ettirir. Her soruda cisme uygulanan kuvveti, hareket yönünü, hızı, yüksekliği ve sürtünme varsayımını sırayla belirlemek çözümün dayanağını kurar.",
        "Bir açıklama oluştururken önce gözlenen hareketi yaz, sonra enerji türlerini ve olası dönüşümleri ilişkilendir. Grafik veya çizimdeki renkler yalnızca temsil anahtarıdır; kitap görseli gerçek ölçekte enerji miktarını ölçmez. Başlangıç ve son durumları aynı ölçütle karşılaştır, eksik değişken varsa bunu belirt."
      ],
      termDefinitions: [
        {
          "term": "İş",
          "definition": "Kuvvetin cismi kuvvet doğrultusunda yer değiştirmesiyle yapılan fiziksel etki.",
          "connection": "Fizikte iş, yalnızca çaba harcamak değil; kuvvetin cismi kendi doğrultusunda yer değiştirmesiyle oluşan enerji aktarımıdır."
        },
        {
          "term": "Kinetik enerji",
          "definition": "Hareket hâlindeki cismin hareketinden kaynaklanan enerji.",
          "connection": "Fiziksel iş için kuvvet ve kuvvet doğrultusunda yer değiştirme gerekir; kinetik enerji hareketle, potansiyel enerji ise konum veya esneklikle ilişkilidir."
        },
        {
          "term": "Potansiyel enerji",
          "definition": "Konum veya esneklik gibi durumlara bağlı depolanmış enerji.",
          "connection": "Fiziksel iş için kuvvet ve kuvvet doğrultusunda yer değiştirme gerekir; kinetik enerji hareketle, potansiyel enerji ise konum veya esneklikle ilişkilidir."
        },
        {
          "term": "Enerji dönüşümü",
          "definition": "Enerjinin bir biçimden başka bir biçime dönüşmesi.",
          "connection": "Yokuş aşağı inerken enerji dönüşümü farklı yönde görünür."
        },
        {
          "term": "Sürtünme kuvveti",
          "definition": "Temas yüzeylerindeki harekete karşı koyarak hareketi ve enerji aktarımını etkileyen kuvvet.",
          "connection": "Sürtünme hareketi yavaşlatabilir ve mekanik enerjinin bir bölümünün ısıya ya da sese dönüşmesine yol açabilir."
        }
      ],
      points: ["Fiziksel iş, kuvvet ve yer değiştirme ölçütleriyle incelenir.", "Kinetik enerji hareketle; potansiyel enerji konum veya esneklikle ilişkilidir.", "Sürtünme ve çevreyle enerji aktarımı açıklamaya eklenmelidir."],
      terms: ['iş', 'kinetik enerji', 'potansiyel enerji', 'enerji dönüşümü'],
      tasks: ['Ünite kavramlarını bir örnek üzerinden tekrar et.', 'Kendi enerji dönüşüm şemanı hazırla.', 'Yanıtlarını konu özetiyle karşılaştır ve eksik kavramı düzelt.'],
      quiz: { prompt: 'Yüksek bir noktadan aşağı inen bisikletli için hangi enerji değişimi beklenebilir?', options: ['Çekim potansiyel enerjisi azalırken kinetik enerji artabilir.', 'Kinetik enerji daima sıfır kalır.', 'Yalnızca bisikletin rengi değişir.', 'Enerji dönüşümü gerçekleşemez.'], answer: 0, explanation: 'Yokuş aşağı inerken yükseklik azalırken hareket enerjisi artabilir.', hint: 'Yükseklik ile hızdaki değişimi aynı anda düşün.'},
      activity: { title: 'Günlük yaşam enerji dönüşüm şeması', format: 'Balık kılçığı veya akış şeması', prompt: 'Bir bisikletin yokuş yukarı çıkıp sonra aşağı indiği bir durum seç. Başlangıç ve dönüş noktalarındaki enerji türlerini, fiziksel iş ölçütünü ve sürtünmenin olası etkisini bir şemayla açıklayacak kısa bir plan yaz.', placeholder: 'Başlangıç… Yokuş yukarı… Yokuş aşağı… Sürtünme…', minChars: 30, criteria: ['Yokuş yukarı ve aşağı bölümlerini ayır.', 'Kinetik/potansiyel enerji dönüşümünü belirt.', 'Fiziksel iş veya sürtünmeye değin.'], hint: 'Enerji türü ile fiziksel iş kavramı birbiriyle ilişkili olsa da aynı tanım değildir.' },
    },
    {
      id: 20, date: '15–19 Şub', unitId: 'systems', topic: 'Sindirim sistemine giriş ve besinlerin izlediği yol', pages: '88–90', visual: 'digestion', visualNote: "Şemada ağızdan başlayan yolu takip et; besinlerin parçalanmasıyla sindirilmiş maddelerin emilmesini ayrı basamaklar olarak düşün.",
      focus: "Sindirim sisteminin besinleri parçalama ve vücudun yararlanabileceği hâle getirme rolünü açıkla.",
      summary: [
        "Sindirim, besinlerin vücudun yararlanabileceği küçük yapı taşlarına ayrılmasıdır. Canlılar besinlerden enerji ve büyüme-gelişme için gerekli maddeleri alır. Büyük besin parçaları hücrelere doğrudan geçemez; sindirim süreci onları daha küçük hâle getirir, ardından bazı yapı taşları kana emilir.",
        "Besinler ağızdan alınır ve sindirim kanalında ilerler. Dişlerin çiğnemesi fiziksel parçalanmayı başlatır; tükürükteki enzimler bazı besinlerin kimyasal sindirimine katkı verir. Yutma, mide hareketleri, bağırsaklarda sindirim ve emilim farklı basamaklardır; tek bir organ bütün görevleri üstlenmez.",
        "Kitap Burçak’ın elmayı ısırıp yutmasıyla besinin vücudundaki yolunu sorar. Bu öykü, ağızdan başlayıp yutak, yemek borusu, mide ve bağırsaklara uzanan yolu incelemek için giriş sağlar. Sindirilemeyen kalıntılar sonunda vücuttan uzaklaştırılır; sindirilmiş besinlerin yapı taşları ise hücrelere taşınabilir.",
        "Besin yolunu haritada gösterirken sindirim kanalı ile yardımcı organları ayır. Sindirim, besinleri parçalama; emilim, sindirilmiş maddelerin kana geçmesi; boşaltım ise vücuttaki bazı atıkların uzaklaştırılmasıdır. Bunlar birbiriyle bağlantılı olsa da farklı süreçlerdir. Modelinde besin akışını oklarla, yardımcı organları ayrı göster."
      ],
      termDefinitions: [
        {
          "term": "Sindirim",
          "definition": "Besinlerin hücrelerin kullanabileceği küçük molekül ve yapı taşlarına ayrılması süreci.",
          "connection": "Büyük besin parçaları hücrelere doğrudan geçemez; sindirim süreci onları daha küçük hâle getirir, ardından bazı yapı taşları kana emilir."
        },
        {
          "term": "Sindirim kanalı",
          "definition": "Besinlerin ağızdan girip sindirim boyunca ilerlediği organlar dizisi.",
          "connection": "Besin yolunu haritada gösterirken sindirim kanalı ile yardımcı organları ayır."
        },
        {
          "term": "Besin",
          "definition": "Canlının enerji ve yapı gereksinimleri için aldığı madde.",
          "connection": "Büyük besin parçaları hücrelere doğrudan geçemez; sindirim süreci onları daha küçük hâle getirir, ardından bazı yapı taşları kana emilir."
        },
        {
          "term": "Emilim",
          "definition": "Sindirilmiş küçük maddelerin bağırsaktan kana geçmesi.",
          "connection": "Sindirim, besinleri parçalama; emilim, sindirilmiş maddelerin kana geçmesi; boşaltım ise vücuttaki bazı atıkların uzaklaştırılmasıdır."
        },
        {
          "term": "Yardımcı organ",
          "definition": "Besinlerin içinden geçmediği hâlde salgı veya başka katkıyla sindirime yardım eden organ.",
          "connection": "Besin yolunu haritada gösterirken sindirim kanalı ile yardımcı organları ayır."
        }
      ],
      points: ["Sindirim besinleri küçük yapı taşlarına ayırır.", "Sindirim kanalındaki organlar farklı görevler üstlenir.", "Sindirim ve emilim birbirinden ayrı süreçlerdir."],
      terms: ['sindirim', 'besin', 'sindirim kanalı', 'organ'],
      tasks: ['Besinin vücutta izlediği yolu ilk tahmininle sırala.', 'Yol üzerindeki organların görevlerini araştırma notu olarak ayır.', 'Besinlerin vücuda neden küçük parçalara ayrılarak kazandırıldığını açıkla.'],
      quiz: { prompt: 'Sindirim sisteminin temel işlevlerinden biri hangisidir?', options: ['Besinleri vücudun yararlanabileceği küçük parçalara ayırmak', 'Oksijeni akciğerlerden havaya geri vermek', 'Kanı vücuttan tamamen uzaklaştırmak', 'Kemiklerin boyunu aniden uzatmak'], answer: 0, explanation: 'Sindirim, besinlerin vücudun kullanabileceği küçük parçalara ayrılmasına yardım eder.', hint: 'Besinlerin hücrelere yararlı olabilmesi için önce hangi işlemden geçmesi gerektiğini düşün.'},
      activity: { title: 'Besin yolculuğuna ilk model', format: 'Ön bilgi şeması', prompt: 'Bir lokmanın ağızdan başlayarak sindirim kanalında izleyeceği yolu bildiğin kadarıyla sırala. Emin olmadığın bir basamağı soru işaretiyle göster ve hangi kaynaktan doğrulayacağını yaz.', placeholder: 'Ağız → … → …; doğrulayacağım soru…', minChars: 25, criteria: ['Besin yolunu sırayla modelle.', 'Bilmediğin yeri tahmin gibi işaretle.', 'Bir doğrulama kaynağı belirt.'], hint: 'Ön bilgi ile doğrulanmış bilgiyi ayrı tut; sonraki haftalarda modelini güncelleyebilirsin.' },
    },
    {
      id: 21, date: '22–26 Şub', unitId: 'systems', topic: 'Sindirim sistemini oluşturan organlar ve görevleri', pages: '90–95', visual: 'digestion', visualNote: "Besin yolunu ağızdan başlayarak izlerken karaciğer ve pankreasın yardımcı organ olduğunu, besinin içinden geçmediğini ayırt et.",
      focus: "Sindirim kanalındaki organların sırasını ve yardımcı organların katkısını model üzerinde ayırt et.",
      summary: [
        "Sindirim kanalındaki besin yolu ağız → yutak → yemek borusu → mide → ince bağırsak → kalın bağırsak → anüs şeklindedir. Ağız besini alır ve çiğner; yutak ile yemek borusu geçişi sağlar; mide besinleri karıştırır. Organların adını doğru sıra ve görevle öğrenmek, sistemi bir bütün olarak anlamayı kolaylaştırır.",
        "İnce bağırsakta sindirim tamamlanır ve yapı taşlarının önemli bölümü kana emilir. Kalın bağırsak suyun geri kazanılmasına ve sindirilmeyen kalıntının ilerlemesine katkı sağlar; anüs atığın vücuttan çıktığı son kısımdır. Her organdaki olay aynı değildir ve sindirimin bazı türleri belirli organlarda gerçekleşir.",
        "Karaciğer ve pankreas sindirime yardımcı organlardır; salgıları sindirime katkı verir ancak besinler bu organların içinden geçmez. Kitabın s. 95’teki büyük diyagramı, kanal üzerindeki organlarla yardımcı organları birlikte gösterir. Poster veya model hazırlarken bu iki grubu farklı renk/etiketle ayırmak yararlıdır.",
        "Şemayı izlerken “besin nereden geçiyor?”, “nerede parçalanıyor?” ve “nerede kana geçiyor?” sorularını ayrı sor. Yemek borusunda besin taşınır; sindirim burada gerçekleşmez. Karaciğer veya pankreası besin yolu üzerinde bir durak gibi çizmek, yapı ile işlevi karıştırır."
      ],
      termDefinitions: [
        {
          "term": "Yutak",
          "definition": "Ağızdan gelen besin ve havanın ilgili yollarına geçişini sağlayan ortak bölge.",
          "connection": "Sindirim kanalındaki besin yolu ağız → yutak → yemek borusu → mide → ince bağırsak → kalın bağırsak → anüs şeklindedir."
        },
        {
          "term": "Yemek borusu",
          "definition": "Yutulan besinleri kas hareketleriyle mideye taşıyan kanal.",
          "connection": "Sindirim kanalındaki besin yolu ağız → yutak → yemek borusu → mide → ince bağırsak → kalın bağırsak → anüs şeklindedir."
        },
        {
          "term": "Mide",
          "definition": "Besinleri kas hareketleriyle karıştıran ve mide öz suyuyla sindirime katkı veren organ.",
          "connection": "Sindirim kanalındaki besin yolu ağız → yutak → yemek borusu → mide → ince bağırsak → kalın bağırsak → anüs şeklindedir."
        },
        {
          "term": "İnce bağırsak",
          "definition": "Sindirim işlemlerinin sürdüğü/tamamlandığı ve sindirilmiş maddelerin kana emildiği organ.",
          "connection": "İnce bağırsakta sindirim tamamlanır ve yapı taşlarının önemli bölümü kana emilir."
        },
        {
          "term": "Karaciğer ve pankreas",
          "definition": "Salgılarıyla sindirime katkı sağlayan yardımcı organlar; besinler içlerinden geçmez.",
          "connection": "Karaciğer ve pankreas sindirime yardımcı organlardır; salgıları sindirime katkı verir ancak besinler bu organların içinden geçmez."
        }
      ],
      points: ["Besinlerin sindirim kanalındaki sırası korunmalıdır.", "İnce bağırsak sindirim ve emilimde önemli rol oynar.", "Yardımcı organlar kanaldan geçiş yolu değildir."],
      terms: ['yutak', 'yemek borusu', 'mide', 'ince bağırsak', 'kalın bağırsak'],
      tasks: ['Sindirim kanalı organlarını doğru sırada yaz.', 'Her organ için bir görev notu ekle.', 'Yardımcı organları sindirim kanalından ayırarak modele ekle.'],
      quiz: { prompt: 'Besinlerin sindirim kanalında izlediği sıra aşağıdakilerden hangisidir?', options: ['Ağız → yutak → yemek borusu → mide → ince bağırsak', 'Mide → ağız → kalın bağırsak → yutak', 'İnce bağırsak → yemek borusu → ağız → mide', 'Ağız → akciğer → kalp → mide'], answer: 0, explanation: 'Besinler ağızdan başlayarak yutak, yemek borusu, mide ve ince bağırsak yönünde ilerler.', hint: 'Besinin vücuda girişinden sonra geçtiği kanalı sırayla izle.'},
      activity: { title: 'Sindirim sistemi modeli', format: 'Etiketli model veya poster tasarımı', prompt: 'Bir kâğıtta sindirim kanalını bir yol gibi çizdiğini düşün. Organları doğru sıraya yerleştir; mide, ince bağırsak ve kalın bağırsağın görevlerini birer kısa ifadeyle ayırt et; karaciğer ve pankreası yardımcı organ olarak göster.', placeholder: 'Organ sırası… Mide… İnce bağırsak… Kalın bağırsak…', minChars: 35, criteria: ['Organ sırasını doğru göster.', 'En az üç organın görevini ayırt et.', 'Yardımcı organları kanaldan ayrı işaretle.'], hint: 'Yardımcı organlar besinin içinden geçtiği birer kanal değildir.' },
    },
    {
      id: 22, date: '1–5 Mar', unitId: 'systems', topic: 'Fiziksel ve kimyasal sindirim; emilim', pages: '90–95', visual: 'digestion', visualNote: "Organların sırası kadar, besinin parçalanması ile yapı taşlarının kana geçişini de ayrı süreçler olarak izle.",
      focus: "Fiziksel sindirim, kimyasal sindirim ve emilimi örneklerle karşılaştır.",
      summary: [
        "Fiziksel sindirim, besinlerin kimyasal yapısı değişmeden daha küçük parçalara ayrılmasıdır; çiğneme buna örnektir. Bu parçalanma besinin yüzey alanını artırır. Kimyasal sindirimde enzimler büyük besin moleküllerini hücrelerin kullanabileceği daha küçük yapı taşlarına ayırır.",
        "Sindirim kanalının farklı bölümlerinde farklı besinlerin sindirimi gerçekleşir. Ağızda çiğneme ve tükürükteki enzimler çalışmaya başlar; midede kas hareketleri ve mide öz suyu özellikle proteinlerin sindirimine katkı verir. İnce bağırsakta sindirim devam eder; sindirilmiş maddelerin kana geçmesine emilim denir.",
        "Karaciğer ve pankreas gibi yardımcı organların salgıları kimyasal sindirime yardım eder. Kitabın organ diyagramı besinin içinden geçtiği kanal ile bu salgıları üreten yardımcı yapıları ayrı çizmiştir. Böylece “sindirilen madde hangi organdan geçiyor?” ve “hangi salgı sürece yardım ediyor?” soruları birbirinden ayrılır.",
        "Fiziksel sindirim, kimyasal sindirim ve emilimi üç basamak olarak düşün: parçaların küçülmesi → moleküllerin yapı taşlarına ayrılması → yapı taşlarının kana geçmesi. Bir besinin çiğnenmesi tek başına tüm sindirim sürecini tamamlamaz. Şema çizerken her basamak için farklı ok ya da renk kullan."
      ],
      termDefinitions: [
        {
          "term": "Fiziksel (mekanik) sindirim",
          "definition": "Besinin kimyasal yapısı değişmeden daha küçük parçalara ayrılması.",
          "connection": "Çiğneme ve mide hareketleri besini küçük parçalara ayırır; kimyasal sindirimle birlikte yüzey alanını artırıp sonraki parçalama basamaklarına yardım eder."
        },
        {
          "term": "Kimyasal sindirim",
          "definition": "Enzimlerin büyük besin moleküllerini daha küçük yapı taşlarına ayırması.",
          "connection": "Fiziksel sindirim, kimyasal sindirim ve emilimi üç basamak olarak düşün: parçaların küçülmesi → moleküllerin yapı taşlarına ayrılması → yapı taşlarının kana geçmesi."
        },
        {
          "term": "Enzim",
          "definition": "Canlıdaki belirli kimyasal tepkimeleri hızlandıran biyolojik molekül.",
          "connection": "Ağızda çiğneme ve tükürükteki enzimler çalışmaya başlar; midede kas hareketleri ve mide öz suyu özellikle proteinlerin sindirimine katkı verir."
        },
        {
          "term": "Emilim",
          "definition": "Sindirilmiş küçük yapı taşlarının bağırsaktan kana alınması.",
          "connection": "Fiziksel sindirim, kimyasal sindirim ve emilimi üç basamak olarak düşün: parçaların küçülmesi → moleküllerin yapı taşlarına ayrılması → yapı taşlarının kana geçmesi."
        },
        {
          "term": "Sindirim salgısı",
          "definition": "Sindirimde görev alan, organ veya yardımcı organlardan salgılanan sıvı.",
          "connection": "Salgılardaki enzimler kimyasal sindirime katılır; besinlerin küçük yapı taşlarına ayrılması ve ince bağırsakta emilmesi bu basamakları izler."
        }
      ],
      points: ["Fiziksel sindirim parçaların boyutunu küçültür.", "Kimyasal sindirim enzimlerle yapı taşlarına ayırır.", "Emilim sindirilmiş maddelerin kana geçişidir."],
      terms: ['fiziksel sindirim', 'kimyasal sindirim', 'enzim', 'emilim'],
      tasks: ['Çiğneme örneğini fiziksel sindirim açısından açıkla.', 'Kimyasal sindirimin neden farklı olduğunu yaz.', 'İnce bağırsağın emilimdeki rolünü not et.'],
      quiz: { prompt: 'Bir besinin çiğnenerek küçük parçalara ayrılması hangi sindirim türüne örnektir?', options: ['Fiziksel sindirim', 'Kimyasal sindirim', 'Emilim', 'Dolaşım'], answer: 0, explanation: 'Çiğneme besini fiziksel olarak küçültür; kimyasal yapısını tek başına değiştirmez.', hint: 'Besinin boyutu mu değişiyor, yoksa moleküler yapısı mı?'},
      activity: { title: 'Sindirim sürecini üç aşamada anlat', format: 'Karşılaştırma tablosu', prompt: 'Bir lokmanın çiğnenmesi, enzimlerle kimyasal olarak parçalanması ve yapı taşlarının kana geçmesini üç ayrı aşama olarak açıkla. Her aşamada neyin değiştiğini belirt.', placeholder: 'Fiziksel parçalanma… Kimyasal parçalanma… Emilim…', minChars: 30, criteria: ['Üç süreci ayrı adlandır.', 'Fiziksel ve kimyasal değişimi karşılaştır.', 'Emilimi kana geçiş olarak açıkla.'], hint: 'Emilim, sindirimin kendisiyle aynı olay değildir; sonraki basamaklardan biridir.' },
    },
    {
      id: 23, date: '15–19 Mar', unitId: 'systems', topic: 'Sindirim sisteminin sağlığı ve dengeli alışkanlıklar', pages: '96–100', visual: 'digestion', visualNote: "Sindirim organlarının görevlerini incelerken sağlık önerilerini genel bilgi ve güvenilir kaynakla sınırla; tek bir belirti tanı değildir.",
      focus: "Sindirim sağlığını destekleyen genel alışkanlıkları güvenilir bilgi ve kişisel farklılıklarla birlikte değerlendir.",
      summary: [
        "Sindirim sisteminin sağlığı; çeşitli ve dengeli beslenme, yeterli sıvı, gıda temizliği, düzenli hareket ve kişisel hijyen gibi genel alışkanlıklarla ilişkilidir. Her bireyin gereksinimi yaş, günlük hareket ve sağlık durumuna göre değişir; bu nedenle tek bir yiyeceği herkes için aynı biçimde sınıflandırmak doğru değildir.",
        "Beslenme günlüğü, kişinin öğün saatlerini, yeme biçimini ve seçimlerini fark etmesine yardım eder; tek başına hastalık tanısı koymaz. Yiyecekleri temiz ellerle tüketmek, güvenli koşullarda saklamak, çeşitli besin gruplarını almak ve hareketli kalmak genel sağlığı destekleyen örnek davranışlardır.",
        "Kitap düzensiz öğün, hızlı yeme, hazır gıda ve uzun süre ekranda oturma örnekleri üzerinden alışkanlıkları düşündürür. Dengeli beslenme; karbonhidrat, protein, yağ, vitamin, mineral ve suyu uygun çeşitlilikte almaktır. Sağlıkla ilgili özel gereksinimlerde güvenilir yetişkin ve sağlık uzmanının görüşü önemlidir.",
        "Bir öğün tablosunu incelerken tek bir güne bakıp kesin sonuç çıkarma; düzeni ve çeşitliliği fark etmeye çalış. Ders etkinliği tıbbi öneri yerine öz gözlem ve kaynak araştırması sağlar. Uzun süren veya kaygı veren belirtiler varsa bunu tek başına yorumlamak yerine güvenilir bir yetişkine ve sağlık uzmanına bildir."
      ],
      termDefinitions: [
        {
          "term": "Dengeli ve çeşitli beslenme",
          "definition": "Farklı besin gruplarından vücudun gereksinimine uygun seçim yapma alışkanlığı.",
          "connection": "Farklı besin gruplarını uygun miktarlarda seçmek, vücudun gereksinimlerini karşılamaya yardım eder; beslenme günlüğü bu alışkanlıkları gözlemlemeyi sağlar."
        },
        {
          "term": "Gıda hijyeni",
          "definition": "Yiyeceklerin hazırlanması, saklanması ve tüketiminde temizliğe dikkat etme.",
          "connection": "Yiyecekleri hazırlarken, saklarken ve tüketirken temizlik kurallarına uymak bazı sağlık risklerini azaltır; bu, sindirim sağlığını destekleyen alışkanlıklardan biridir."
        },
        {
          "term": "Öz gözlem",
          "definition": "Kendi günlük alışkanlıklarını belirli bir süre kaydedip inceleme.",
          "connection": "Ders etkinliği tıbbi öneri yerine öz gözlem ve kaynak araştırması sağlar."
        },
        {
          "term": "Sindirim sağlığı",
          "definition": "Sindirim organlarının normal işlevlerini destekleyen genel sağlık durumu.",
          "connection": "Öğün düzeni, su, hareket ve hijyen gibi günlük alışkanlıklar sindirim organlarının işleyişini destekleyebilir; örnekler tanı koymak için kullanılmaz."
        },
        {
          "term": "Güvenilir sağlık kaynağı",
          "definition": "Bilgisi yetkin uzman veya kurumlarca hazırlanmış, kanıt ve güncellik bakımından kontrol edilebilir kaynak.",
          "connection": "Beslenme veya sağlık bilgisi uygulamadan önce kaynağın uzmanlığını, kanıtını ve güncelliğini kontrol et; günlük kayıt tek başına tıbbi öneri değildir."
        }
      ],
      points: ["Çeşitli beslenme, hijyen ve hareket genel sağlığı destekler.", "Sağlık önerileri kişiye göre değişebilir.", "Belirti üzerinden kendi kendine tanı koyma."],
      terms: ['dengeli beslenme', 'hijyen', 'sindirim sağlığı', 'alışkanlık'],
      tasks: ['Bir günlük örnek menüde besin çeşitliliğini incele.', 'Sindirim sağlığını destekleyen iki alışkanlığı belirle.', 'Sağlıkla ilgili bir sorunda güvenilir yardım kaynağını yaz.'],
      quiz: { prompt: 'Sindirim sisteminin sağlığını destekleyen davranış hangisidir?', options: ['Çeşitli beslenmek ve gıda hijyenine dikkat etmek', 'Her gün yalnızca tek tür yiyecek tüketmek', 'Eller temizlenmeden yemek yemek', 'Uzun süre hareketsiz kalmak'], answer: 0, explanation: 'Çeşitlilik ve hijyen sağlıklı günlük alışkanlıkların parçasıdır.', hint: 'Besin çeşitliliği ve temizliğin birlikte önemini düşün.'},
      activity: { title: 'Alışkanlık inceleme kartı', format: 'Örnek olay ve sağlıklı seçenek', prompt: 'Bir öğrenci öğünlerini sık sık atlıyor, yeterince hareket etmiyor ve atıştırmalık seçerken temizliğe dikkat etmiyor. Yargılayıcı olmayan bir dille üç iyileştirme önerisi yaz; bunlardan biri için bir güvenilir bilgi kaynağı belirt.', placeholder: 'Öneri 1… Öneri 2… Öneri 3… Kaynak…', minChars: 30, criteria: ['Üç somut alışkanlık öner.', 'Yargılayıcı dil kullanma.', 'En az bir güvenilir kaynak/yardım yolu ekle.'], hint: 'Önerileri kişinin koşullarını gözeterek yaz; tanı veya tedavi önerme.' },
    },
    {
      id: 24, date: '22–26 Mar', unitId: 'systems', topic: 'Dolaşım sisteminin yapı ve organları', pages: '101–108', visual: 'circulation', visualNote: "Kırmızı ve mavi damar yolları görsel bir modeldir; damar adlarını kalbe göre akış yönüyle tanımla.",
      focus: "Kalp, kan ve damarların dolaşım sistemindeki görevlerini birbirinden ayır.",
      summary: [
        "Dolaşım sistemi kalp, kan ve damarlardan oluşur; hücrelere oksijen ve besin taşınmasına, hücrelerde oluşan bazı atıkların uzaklaştırılmasına yardım eder. Kalp kasılıp gevşeyerek kanı damarlar boyunca hareket ettirir. Kan, vücut içinde farklı maddelerin taşınmasını sağlayan dokudur.",
        "Atardamarlar kanı kalpten uzaklaştırır; toplardamarlar vücuttan kalbe getirir. Kılcal damarlar bu iki damar türünü birbirine bağlayan çok ince damarlardır ve kan ile hücreler arasında madde alışverişine olanak verir. Damar adları oksijen miktarından değil, kanın kalbe göre gidiş yönünden gelir.",
        "Kitabın s. 104’teki insan dolaşım şeması kalp ile bütün vücuda uzanan damar ağını gösterir; büyütülmüş damar çizimlerinde atardamar, toplardamar ve kılcal damar ayrımı yapılır. Kanın taşıdığı maddeler hücrelere ulaşır; atık maddeler de ilgili organlara taşınır.",
        "Bir görselde damarları kırmızı/mavi çizmek kanın oksijen miktarını temsil edebilir; bu renk gerçek kanın damar içinde gözle görüldüğü renk değildir. Akciğere giden atardamarın oksijence düşük, akciğerden kalbe gelen toplardamarın oksijence yüksek kan taşıyabildiğini unutma. Sınıflandırmayı yön üzerinden yap."
      ],
      termDefinitions: [
        {
          "term": "Dolaşım sistemi",
          "definition": "Kalp, kan ve damarlarla maddelerin vücutta taşınmasını sağlayan sistem.",
          "connection": "Dolaşım sistemi kalp, kan ve damarlardan oluşur; hücrelere oksijen ve besin taşınmasına, hücrelerde oluşan bazı atıkların uzaklaştırılmasına yardım eder."
        },
        {
          "term": "Atardamar",
          "definition": "Kanı kalpten uzaklaştırıp vücuda veya akciğerlere taşıyan damar.",
          "connection": "104’teki insan dolaşım şeması kalp ile bütün vücuda uzanan damar ağını gösterir; büyütülmüş damar çizimlerinde atardamar, toplardamar ve kılcal damar ayrımı yapılır."
        },
        {
          "term": "Toplardamar",
          "definition": "Kanı vücuttan veya akciğerlerden kalbe geri taşıyan damar.",
          "connection": "104’teki insan dolaşım şeması kalp ile bütün vücuda uzanan damar ağını gösterir; büyütülmüş damar çizimlerinde atardamar, toplardamar ve kılcal damar ayrımı yapılır."
        },
        {
          "term": "Kılcal damar",
          "definition": "Atardamarlarla toplardamarları bağlayan ve hücrelerle madde alışverişi sağlayan ince damar.",
          "connection": "104’teki insan dolaşım şeması kalp ile bütün vücuda uzanan damar ağını gösterir; büyütülmüş damar çizimlerinde atardamar, toplardamar ve kılcal damar ayrımı yapılır."
        },
        {
          "term": "Nabız",
          "definition": "Kalbin pompalamasıyla damarlarda hissedilebilen ritmik basınç değişimi.",
          "connection": "Kalbin pompalaması atardamarlarda ritmik basınç oluşturur; bu ritim bilekten veya göğüsten fark edilip efor öncesi ve sonrası karşılaştırılabilir."
        }
      ],
      points: ["Kalp kanın dolaşmasına yardım eder.", "Atardamar ve toplardamar adları akış yönüyle ilgilidir.", "Kılcal damarlar madde alışverişinde görev alır."],
      terms: ['kalp', 'kan', 'atardamar', 'toplardamar', 'kılcal damar'],
      tasks: ['Kalp, kan ve damarları modelinde ayrı simgelerle göster.', 'Üç damar türünün görevini karşılaştır.', 'Damar adını kanın rengiyle değil kalbe göre yönle açıkla.'],
      quiz: { prompt: 'Atardamarlar kanı hangi yöne taşır?', options: ['Kalpten uzaklaştırarak vücuda doğru', 'Vücuttan kalbe doğru', 'Yalnızca akciğerlerin içine', 'Sadece sindirim kanalına'], answer: 0, explanation: 'Atardamarlar kanı kalpten uzaklaştırır; oksijen miktarı damar türünü tek başına belirlemez.', hint: 'Damar adındaki ölçütün kalbe göre yön olduğunu hatırla.'},
      activity: { title: 'Dolaşım sistemi modeli', format: 'Organ–görev eşleştirme şeması', prompt: 'Kalp, atardamar, toplardamar ve kılcal damarları bir şemada göster. Her birinin görevini kendi cümlenle yaz; kanın akış yönünü oklarla belirt.', placeholder: 'Kalp… Atardamar… Toplardamar… Kılcal damar…', minChars: 30, criteria: ['Dört yapıyı adlandır.', 'Akış yönünü oklarla anlat.', 'Damar görevlerini birbirinden ayır.'], hint: 'Akış yönü için önce kanın kalbe göre hangi yönde ilerlediğini belirle.' },
    },
    {
      id: 25, date: '29 Mar–2 Nis', unitId: 'systems', topic: 'Küçük ve büyük kan dolaşımı', pages: '102–109', visual: 'circulation', visualNote: "Kalp ile akciğerler arasındaki yolu ve kalp ile vücut arasındaki yolu iki ayrı döngü olarak zihninde izle.",
      focus: "Küçük ve büyük kan dolaşımının kalp, akciğerler ve vücut arasındaki yollarını karşılaştır.",
      summary: [
        "Küçük kan dolaşımı, kanın kalpten akciğerlere gidip gaz alışverişinden sonra kalbe dönmesidir. Büyük kan dolaşımı, kalpten çıkan kanın vücudun diğer dokularına ulaşması ve yeniden kalbe gelmesidir. Bu iki yol birlikte çalışarak hücrelere oksijen ve besin taşınmasına, karbondioksit gibi atıkların uzaklaştırılmasına yardım eder.",
        "Akciğerlerde kan ile alveol havası arasında gaz alışverişi olur: oksijen kana geçer, karbondioksit kandan alveollere geçer. Büyük dolaşımda oksijence zengin kan vücuda gönderilir; hücrelerde maddeler kullanılır ve kan kalbe geri döner. Dolaşım şemasındaki oklar, kanın izlediği yolu gösterir.",
        "Kitap küçük ve büyük dolaşımı ayrı renkli devrelerle gösterir; İbnü’n Nefîs’in küçük dolaşım açıklamasını ve Harvey’nin kan dolaşımı çalışmalarını da bilim tarihi kutusunda anar. Modelde kalp, akciğer ve vücut dokularını doğru sıraya yerleştirmek, kanın iki döngüde nasıl hareket ettiğini anlamayı kolaylaştırır.",
        "Renkli şemalar öğretim modelidir; kanın rengi gerçek damar görüntüsünde kırmızı/mavi iki ayrı renk gibi görünmez. Ayrıca atardamar ve toplardamar adları kalbe göre yönü belirtir; oksijen miktarı bu adların tanımı değildir. İki devreyi karşılaştırırken başlangıç-dönüş noktası, geçtiği organ ve gaz alışverişini ayrı ayrı yaz."
      ],
      termDefinitions: [
        {
          "term": "Küçük kan dolaşımı",
          "definition": "Kalp ile akciğerler arasında gerçekleşen kan dolaşımı yolu.",
          "connection": "Küçük kan dolaşımı, kanın kalpten akciğerlere gidip gaz alışverişinden sonra kalbe dönmesidir."
        },
        {
          "term": "Büyük kan dolaşımı",
          "definition": "Kalp ile vücudun diğer dokuları arasında gerçekleşen kan dolaşımı yolu.",
          "connection": "Büyük kan dolaşımı, kalpten çıkan kanın vücudun diğer dokularına ulaşması ve yeniden kalbe gelmesidir."
        },
        {
          "term": "Alveol",
          "definition": "Akciğerlerde, çevresindeki kılcal damarlarla gaz alışverişinin gerçekleştiği hava keseciği.",
          "connection": "Akciğerlerde kan ile alveol havası arasında gaz alışverişi olur: oksijen kana geçer, karbondioksit kandan alveollere geçer."
        },
        {
          "term": "Oksijen",
          "definition": "Hücrelerin enerji elde etme süreçlerinde kullandığı, solunumla alınan gaz.",
          "connection": "Bu iki yol birlikte çalışarak hücrelere oksijen ve besin taşınmasına, karbondioksit gibi atıkların uzaklaştırılmasına yardım eder."
        },
        {
          "term": "Karbondioksit",
          "definition": "Hücrelerde oluşup kanla akciğerlere taşınan ve soluk vermeyle atılan gaz.",
          "connection": "Bu iki yol birlikte çalışarak hücrelere oksijen ve besin taşınmasına, karbondioksit gibi atıkların uzaklaştırılmasına yardım eder."
        }
      ],
      points: ["Küçük dolaşım kalp ile akciğerler arasındadır.", "Büyük dolaşım kalp ile vücut dokuları arasındadır.", "Damar adlandırmasında akış yönü esas alınır."],
      terms: ['küçük kan dolaşımı', 'büyük kan dolaşımı', 'akciğer', 'kan akışı'],
      tasks: ['Kalp–akciğer–kalp yolunu ayrı renkle göster.', 'Kalp–vücut–kalp yolunu ikinci renkle göster.', 'İki yolun ortak başlangıç noktasını ve amacını açıkla.'],
      quiz: { prompt: 'Kalp ile akciğerler arasındaki kan yolu hangi dolaşımdır?', options: ['Küçük kan dolaşımı', 'Büyük kan dolaşımı', 'Sindirim dolaşımı', 'Boşaltım dolaşımı'], answer: 0, explanation: 'Küçük kan dolaşımı kalp ile akciğerler arasındaki yolu kapsar.', hint: 'Akciğerlerle doğrudan bağlantılı olan dolaşım yolunu seç.'},
      activity: { title: 'İki dolaşımı karşılaştır', format: 'Oklarla yol modeli', prompt: 'Küçük ve büyük kan dolaşımını iki ayrı ok zinciri olarak yaz. Her yolun başlangıç ve dönüş noktasını, geçtiği temel bölgeyi ve hangi madde alışverişine katkı verdiğini belirt.', placeholder: 'Küçük dolaşım… Büyük dolaşım…', minChars: 30, criteria: ['İki yolu ayrı göster.', 'Kalp, akciğer ve vücudun rolünü doğru ilişkilendir.', 'Damarların akış yönünü gözet.'], hint: 'Küçük dolaşım akciğerlere, büyük dolaşım vücudun diğer bölgelerine uzanır.' },
    },
    {
      id: 26, date: '5–9 Nis', unitId: 'systems', topic: 'Kan bağışının toplumsal dayanışmadaki yeri', pages: '109–112', visual: 'circulation', visualNote: "Kan dolaşımı görseli, kanın vücuttaki taşınma yolunu gösterir; bağışla ilgili koşullar için yetkili sağlık kaynaklarına başvurulur.",
      focus: "Kan bağışının sağlık hizmetleri ve toplumsal dayanışma açısından önemini güvenilir kaynaklarla açıkla.",
      summary: [
        "Kan; oksijen ve besin taşınması, bazı atıkların ilgili organlara iletilmesi, vücudun savunması ve yaralanmalarda pıhtılaşmaya katkı gibi görevleri olan sıvı dokudur. Kan plazma ve farklı hücre/bileşenlerden oluşur; her bileşenin işi farklıdır. Bu yüzden kanı yalnızca kırmızı renkli bir sıvı olarak düşünmemek gerekir.",
        "Gönüllü kan bağışı, ihtiyaç duyan hastalara kan veya kan bileşeni sağlanmasına yardımcı olan toplumsal dayanışma davranışıdır. Bağış süreci sağlık personeli tarafından yürütülür; kan uygun testlerden geçirilir, güvenli koşullarda saklanır ve gerektiğinde sağlık kurumlarına ulaştırılır.",
        "Kitap, kan bağışında kayıt, görüşme, sağlık değerlendirmesi/test ve bağış adımlarını gösterir. Ayrıca Türk Kızılay’ın gönüllü bağışçı çalışmasını örnek verir. Bağış için yaş, sağlık durumu ve aralık gibi koşullar zamanla güncellenebilir; bağış uygunluğu yalnızca yetkili sağlık kurumlarınca belirlenir.",
        "Kan bağışı hakkında bilgilendirme yaparken kişiyi zorlamadan, doğru ve güncel kaynağa yönlendir. Öğrenciler bilimsel farkındalık mesajı hazırlayabilir; kendi ya da başka bir kişinin bağış yapıp yapamayacağına karar veremez. Toplumsal dayanışma, güvenli sağlık hizmeti ve gönüllülük kavramları birlikte düşünülmelidir."
      ],
      termDefinitions: [
        {
          "term": "Plazma",
          "definition": "Kanın hücreleri ve çözünmüş maddeleri taşıyan sıvı bölümü.",
          "connection": "Kan plazma ve farklı hücre/bileşenlerden oluşur; her bileşenin işi farklıdır."
        },
        {
          "term": "Alyuvar",
          "definition": "Oksijenin taşınmasına katkı veren kırmızı kan hücresi.",
          "connection": "Alyuvar, oksijenin akciğerlerden dokulara taşınmasına katkı verir; dolaşım sistemi böylece hücrelere gaz ulaştırır."
        },
        {
          "term": "Akyuvar",
          "definition": "Vücudun savunmasında görev alan kan hücresi.",
          "connection": "Akyuvarlar vücudun savunmasında görev alır; kandaki bileşenlerin farklı görevleri birlikte dolaşımın işleyişini destekler."
        },
        {
          "term": "Kan pulcuğu",
          "definition": "Yaralanmalarda kanın pıhtılaşmasına katkı sağlayan küçük kan bileşeni.",
          "connection": "Kan pulcukları yaralanma yerinde pıhtı oluşumuna katkı vererek kan kaybını sınırlayan sürecin parçasıdır."
        },
        {
          "term": "Gönüllü kan bağışı",
          "definition": "Sağlık kurumlarının güvenli koşullarında, karşılık beklemeden kan bağışında bulunma.",
          "connection": "Gönüllü kan bağışı, ihtiyaç duyan hastalara kan veya kan bileşeni sağlanmasına yardımcı olan toplumsal dayanışma davranışıdır."
        }
      ],
      points: ["Kan farklı görevleri olan bileşenlerden oluşur.", "Gönüllü bağış sağlık hizmetlerine katkı sağlayabilir.", "Bağış koşullarını yetkili sağlık kurumları belirler."],
      terms: ['kan bağışı', 'gönüllülük', 'toplumsal dayanışma', 'kan bileşenleri'],
      tasks: ['Kan bağışının kimlere nasıl yardımcı olabileceğini güvenilir kaynaktan öğren.', 'Dayanışmayı açıklayan kısa bir mesaj yaz.', 'Bağış koşullarını yalnızca yetkili kaynaktan kontrol et.'],
      quiz: { prompt: 'Kan bağışı hakkında güvenli ve doğru yaklaşım hangisidir?', options: ['Bağış koşullarını yetkili sağlık kurumlarından öğrenmek', 'Her öğrencinin bağış için uygun olduğunu varsaymak', 'İnternetteki her iddiayı doğrulamadan paylaşmak', 'Bağış kararını yalnızca yaşına bakarak vermek'], answer: 0, explanation: 'Bağış uygunluğu ve koşulları yetkili sağlık kurumlarınca değerlendirilir.', hint: 'Sağlıkla ilgili uygunluk kararını hangi güvenilir kurumun verebileceğini düşün.'},
      activity: { title: 'Dayanışma için bilgilendirme kartı', format: 'Farkındalık mesajı taslağı', prompt: 'Kan bağışının toplumsal dayanışmaya katkısını anlatan kısa ve doğru bir bilgilendirme kartı planla. Bir ana mesaj, bir bilimsel dayanak ve insanların bağış koşullarını nereden öğrenebileceğini yaz.', placeholder: 'Ana mesaj… Bilimsel dayanak… Güvenilir bilgi kaynağı…', minChars: 25, criteria: ['Dayanışma boyutunu belirt.', 'Kanla ilgili bilimsel bir işlevi doğru açıkla.', 'Yetkili bilgi kaynağına yönlendir.'], hint: 'Kişisel bağış uygunluğu hakkında öneri verme; yetkili kaynağa yönlendir.' },
    },
    {
      id: 27, date: '12–16 Nis', unitId: 'systems', topic: 'Dolaşım sisteminin sağlığını koruma', pages: '113–116', visual: 'circulation', visualNote: "Damar ağının bütün vücuda ulaştığını gözlemle; sağlıklı yaşam önerilerini güvenilir kaynak ve kişisel farklılıklarla değerlendir.",
      focus: "Dolaşım sağlığını destekleyen günlük alışkanlıkları ve sağlık iddialarının kaynağını değerlendir.",
      summary: [
        "Dolaşım sistemi sağlığı, vücudun ihtiyaç duyduğu maddelerin taşınmasıyla ilişkilidir. Düzenli hareket, yeterli dinlenme, çeşitli beslenme ve tütün ürünlerinden uzak durma genel sağlığı destekleyen davranışlardır. Bu alışkanlıklar tek başına hastalıkları önleyeceğine dair garanti değildir; bireyin gereksinimi ve sağlık durumu farklı olabilir.",
        "Fiziksel etkinlik sırasında kasların oksijen ve besin ihtiyacı artar; kalp ve solunum daha hızlı çalışabilir. Dinlenme, uyku ve günlük hareket düzeni birlikte ele alınmalıdır. Uzun süre hareketsiz kalma alışkanlığını azaltmak için günlük rutine uygun hareket araları planlanabilir.",
        "Kitap dolaşım sağlığı için bilgi toplama ve rapor hazırlama görevi verir; uyku, su, beslenme, spor ve ekran süresi gibi örnekler sunar. Öneriler genel eğitim bilgisi olarak okunmalıdır. Kişiye özel sağlık sorusunda güncel ve yetkin bir sağlık kaynağı ya da uzman görüşü gerekir.",
        "Bir sağlık iddiasını değerlendirirken kaynağı kim hazırlamış, hangi kanıta dayanıyor ve ne zaman güncellenmiş diye sor. Bir belirtiyi doğrudan bir hastalığa bağlama; ders kitabı tanı koyma aracı değildir. Şemada hareket, dinlenme ve beslenmeyi ayrı etkenler olarak göster, sonra aralarındaki ilişkiyi açıkla."
      ],
      termDefinitions: [
        {
          "term": "Dolaşım sağlığı",
          "definition": "Kalp, kan ve damarların görevlerini sürdürebilmesiyle ilişkili genel sağlık durumu.",
          "connection": "Kitap dolaşım sağlığı için bilgi toplama ve rapor hazırlama görevi verir; uyku, su, beslenme, spor ve ekran süresi gibi örnekler sunar."
        },
        {
          "term": "Fiziksel etkinlik",
          "definition": "Kasları çalıştıran ve enerji harcatan günlük hareket veya egzersiz.",
          "connection": "Fiziksel etkinlik sırasında kasların oksijen ve besin ihtiyacı artar; kalp ve solunum daha hızlı çalışabilir."
        },
        {
          "term": "Hareketsiz yaşam",
          "definition": "Günlük yaşamda uzun süre düşük hareket düzeyinde kalma alışkanlığı.",
          "connection": "Uzun süre az hareket etmek kalp-damar sağlığını etkileyebilecek bir alışkanlıktır; kitap uyku, su, beslenme ve fiziksel etkinlikle birlikte değerlendirmeyi önerir."
        },
        {
          "term": "Sağlık iddiası",
          "definition": "Bir davranış veya ürünün sağlık üzerindeki etkisine ilişkin, kaynağı kontrol edilmesi gereken açıklama.",
          "connection": "Bir sağlık iddiasını değerlendirirken kaynağı kim hazırlamış, hangi kanıta dayanıyor ve ne zaman güncellenmiş diye sor."
        },
        {
          "term": "Güvenilir kaynak",
          "definition": "Uzmanlık, kanıt ve güncellik bakımından doğrulanabilir bilgi kaynağı.",
          "connection": "Sağlık iddiasını uygulamadan önce kaynağın kim olduğunu, hangi kanıta dayandığını ve ne zaman güncellendiğini sorgula."
        }
      ],
      points: ["Hareket, dinlenme ve dengeli beslenme birlikte düşünülür.", "Sağlık iddialarını güvenilir kaynakla kontrol et.", "Kişisel sağlık kararları uzmana danışılarak verilir."],
      terms: ['dolaşım sağlığı', 'hareket', 'dinlenme', 'güvenilir kaynak'],
      tasks: ['Dolaşım sağlığını destekleyen üç günlük alışkanlık yaz.', 'Bir sağlık iddiasının kaynağını değerlendirme ölçütü belirle.', 'Bir alışkanlığın etkisini neden–sonuç cümlesiyle açıkla.'],
      quiz: { prompt: 'Dolaşım sağlığını destekleyen genel yaşam davranışı hangisidir?', options: ['Düzenli hareket ve yeterli dinlenme alışkanlığı geliştirmek', 'Uzun süre hareketsiz kalmayı alışkanlık yapmak', 'Sağlık önerilerini kaynağını incelemeden paylaşmak', 'Her sağlık sorununa aynı çözümü uygulamak'], answer: 0, explanation: 'Düzenli hareket ve dinlenme, sağlıklı yaşam alışkanlıklarının parçalarıdır.', hint: 'Tek bir davranış yerine sürdürülebilir günlük alışkanlıkları düşün.'},
      activity: { title: 'Sağlık alışkanlığı için kanıt notu', format: 'Kaynak ve neden–sonuç değerlendirmesi', prompt: 'Dolaşım sağlığıyla ilgili bir alışkanlık seç. Güvenilir bir kaynakta bu konuda ne tür bilgi arayacağını, alışkanlığın olası etkisini ve iddianın kişiye göre değişebileceğini nasıl belirteceğini yaz.', placeholder: 'Alışkanlık… Arayacağım bilgi… Olası etki… Sınır…', minChars: 25, criteria: ['Bir alışkanlık seç.', 'Güvenilir kaynak belirt.', 'Genel bilginin kişiye göre değişebileceğini ifade et.'], hint: 'Kesin sağlık sonucu iddia etmek yerine, kaynağa dayalı ve dikkatli bir ifade kur.' },
    },
    {
      id: 28, date: '19–23 Nis', unitId: 'systems', topic: 'Solunum sisteminin organları ve hava yolu', pages: '117–122', visual: 'respiration', visualNote: "Görsel ana solunum organlarını gösterir; alveollerde gaz alışverişini alttaki hava yolu şeması ve konu anlatımıyla birlikte incele.",
      focus: "Havanın burundan akciğerlere izlediği yolu ve solunum organlarının temel görevlerini sırala.",
      summary: [
        "Solunum sistemi, vücuda oksijen alınmasına ve hücrelerde oluşan karbondioksitin dışarı verilmesine yardım eder. Hava burundan girer; yutak ve gırtlaktan geçerek soluk borusuna ulaşır. Soluk borusu iki bronşa, bronşlar daha ince bronşçuklara ayrılır; bu yollar havayı akciğerdeki alveollere taşır.",
        "Burun içindeki kıllar ve mukus, havadaki bazı tozları tutmaya; burun içindeki damarlar havayı ısıtmaya, mukus ise nemlendirmeye yardım eder. Akciğerler göğüs boşluğunda bulunur; diyafram göğüs ve karın boşluklarını ayıran, soluk alıp vermeye katkıda bulunan kastır.",
        "Kitabın solunum sistemi modelinde burun, yutak, gırtlak, soluk borusu, bronşlar, akciğerler ve diyafram etiketlenir. Bronşçukların uçlarındaki alveoller kılcal damarlarla çevrilidir; gaz alışverişi burada gerçekleşir. Ağaç dallarına benzeyen bronş dallanması, havanın iki akciğere dağılmasını zihinde canlandırabilir.",
        "Hava yolunu sırayla çiz ve her yapının görevini kısa notla açıkla. Soluk borusuyla yemek borusunu karıştırma: biri havayı akciğerlere, diğeri besini mideye taşır. Maket, organların konum ve bağlantısını gösterir; gerçek dokuların esnekliğini ve gazların mikroskobik hareketini bütünüyle göstermez."
      ],
      termDefinitions: [
        {
          "term": "Soluk borusu",
          "definition": "Havayı gırtlaktan bronşlara taşıyan kıkırdak destekli kanal.",
          "connection": "Kitabın solunum sistemi modelinde burun, yutak, gırtlak, soluk borusu, bronşlar, akciğerler ve diyafram etiketlenir."
        },
        {
          "term": "Bronş",
          "definition": "Soluk borusunun iki akciğere uzanan ana dallarından her biri.",
          "connection": "Kitabın solunum sistemi modelinde burun, yutak, gırtlak, soluk borusu, bronşlar, akciğerler ve diyafram etiketlenir."
        },
        {
          "term": "Bronşçuk",
          "definition": "Bronşların akciğer içinde dallanmasıyla oluşan küçük hava yolu.",
          "connection": "Soluk borusu iki bronşa, bronşlar daha ince bronşçuklara ayrılır; bu yollar havayı akciğerdeki alveollere taşır."
        },
        {
          "term": "Alveol",
          "definition": "Akciğerlerde kılcal damarlarla çevrili, gaz alışverişinin olduğu küçük hava keseciği.",
          "connection": "Soluk borusu iki bronşa, bronşlar daha ince bronşçuklara ayrılır; bu yollar havayı akciğerdeki alveollere taşır."
        },
        {
          "term": "Diyafram",
          "definition": "Göğüs boşluğu ile karın boşluğunu ayıran ve solunum hareketlerine yardım eden kas.",
          "connection": "Akciğerler göğüs boşluğunda bulunur; diyafram göğüs ve karın boşluklarını ayıran, soluk alıp vermeye katkıda bulunan kastır."
        }
      ],
      points: ["Hava solunum yolları boyunca akciğerlere ilerler.", "Gaz alışverişi alveoller ile kılcal damarlar arasında gerçekleşir.", "Model gerçek organların yalnızca seçilmiş özelliklerini gösterir."],
      terms: ['soluk borusu', 'bronş', 'akciğer', 'gaz alışverişi'],
      tasks: ['Hava yolunu burundan akciğerlere doğru sırala.', 'Modelinde her organın görevini bir etiketle göster.', 'Benzetmenin bir güçlü ve bir sınırlı yönünü yaz.'],
      quiz: { prompt: 'Soluk borusu iki ana bronşa ayrıldıktan sonra hava hangi organa doğru ilerler?', options: ['Akciğerlere', 'Mideye', 'Böbreklere', 'Kalın bağırsağa'], answer: 0, explanation: 'Bronşlar havayı akciğerlere taşır.', hint: 'Havanın vücuttaki yolunu sırayla takip et.'},
      activity: { title: 'Solunum yolu maketi için etiketler', format: 'Etiketli model ve görev kartı', prompt: 'Solunum sistemi için basit bir model hazırladığını düşün. Burun, yutak, soluk borusu, bronşlar ve akciğerleri sıralı biçimde etiketle; her biri için kısa görev açıklaması yaz.', placeholder: 'Burun… Yutak… Soluk borusu… Bronşlar… Akciğerler…', minChars: 30, criteria: ['Hava yolunu doğru sırala.', 'En az dört yapıyı adlandır.', 'Her yapı için görevi belirt.'], hint: 'Havanın girişinden gaz alışverişi bölgesine doğru ilerle.' },
    },
    {
      id: 29, date: '26–30 Nis', unitId: 'systems', topic: 'Soluk alıp verme, diyafram ve gaz alışverişi', pages: '118–122', visual: 'respiration', visualNote: "Diyaframın akciğerlerin altında bulunduğunu ve hareket ettiğini gözlemle; görsel bir şemadır, nefes alışverişini gerçek zamanlı göstermez.",
      focus: "Diyafram ve göğüs boşluğu hareketlerini soluk alma-verme ile; gazların yönünü alveollerdeki alışverişle ilişkilendir.",
      summary: [
        "Soluk alma sırasında diyafram kasılarak aşağı doğru düzleşir; kaburgalar arasındaki kasların hareketiyle göğüs boşluğu genişler. Akciğerlerin hacmi artar ve hava içeri girer. Soluk verme sırasında diyafram gevşer, göğüs boşluğu daralır ve akciğerlerdeki hava dışarı çıkar.",
        "Alveollerde oksijen, solunan havadan kılcal damarlardaki kana geçer; karbondioksit kandan alveol havasına geçerek soluk vermeyle vücuttan uzaklaştırılır. Göğüs boşluğunun hacim değişimi havanın giriş-çıkışını sağlar; alveol-kılcal damar geçişi ise gaz alışverişidir. Bunlar bağlantılı ama farklı basamaklardır.",
        "Kitap bu hareketleri akciğer diyagramı, soluk alma/verme şeması ve balonlu maketle inceler. Balonlar akciğerlerin genişleyip daralmasını, alttaki esnek zar diyafram hareketini temsil edebilir. Modelin görevi belirli bir ilişkiyi görünür kılmaktır; gerçek akciğerler balon gibi çalışmaz.",
        "Maketin zarını aşağı çekince modeldeki balonların nasıl değiştiğini gözlemle; bu değişimi göğüs boşluğunun hacmiyle ilişkilendir. Model alveollerde oksijen ve karbondioksitin kılcal damarlardan geçişini göstermez. Bilimsel açıklamada hem hava akışını hem gaz alışverişini ayrı ayrı anlat."
      ],
      termDefinitions: [
        {
          "term": "Soluk alma",
          "definition": "Göğüs boşluğunun genişlemesiyle havanın akciğerlere girmesi.",
          "connection": "Soluk alma sırasında diyafram kasılarak aşağı doğru düzleşir; kaburgalar arasındaki kasların hareketiyle göğüs boşluğu genişler."
        },
        {
          "term": "Soluk verme",
          "definition": "Göğüs boşluğunun daralmasıyla havanın akciğerlerden dışarı çıkması.",
          "connection": "Alveollerde oksijen, solunan havadan kılcal damarlardaki kana geçer; karbondioksit kandan alveol havasına geçerek soluk vermeyle vücuttan uzaklaştırılır."
        },
        {
          "term": "Gaz alışverişi",
          "definition": "Oksijenin alveol havasından kana, karbondioksitin kandan alveol havasına geçmesi.",
          "connection": "Göğüs boşluğunun hacim değişimi havanın giriş-çıkışını sağlar; alveol-kılcal damar geçişi ise gaz alışverişidir."
        },
        {
          "term": "Alveol-kılcal damar ağı",
          "definition": "Akciğerlerde hava ile kan arasında gazların geçiş yaptığı ince yüzey.",
          "connection": "Alveollerin çevresindeki ince kılcal damarlar, solukla alınan oksijenin kana ve karbondioksitin alveol havasına geçmesini sağlar."
        },
        {
          "term": "Model sınırlılığı",
          "definition": "Bir modelin gerçek sistemdeki bütün özellikleri gösterememesi.",
          "connection": "Solunum modeli göğüs hacminin değişimini gösterebilir; fakat hücreleri, gazların mikroskobik geçişini ve bütün kasları aynı anda temsil edemez."
        }
      ],
      points: ["Diyaframın hareketi göğüs boşluğunun hacmini değiştirir.", "Oksijen ve karbondioksit alveollerde zıt yönlerde geçer.", "Soluk alıp verme ile gaz alışverişi bağlantılı ama ayrı süreçlerdir."],
      terms: ['diyafram', 'soluk alma', 'soluk verme', 'oksijen', 'karbondioksit'],
      tasks: ['Soluk alma ve verme sırasında diyaframı karşılaştır.', 'Gaz alışverişini iki yönlü okla göster.', 'Bir solunum modeli için bir sınırlılık yaz.'],
      quiz: { prompt: 'Soluk alma sırasında diyafram kasılıp aşağı hareket ettiğinde göğüs boşluğunda genel olarak ne olur?', options: ['Hacim artar ve hava akciğerlere girebilir.', 'Hacim azalır ve hava dışarı itilir.', 'Hacim değişmez; yalnızca kalp durur.', 'Akciğerlerden oksijen tamamen çıkar.'], answer: 0, explanation: 'Diyaframın kasılması göğüs boşluğu hacmini artırmaya yardım eder; hava akciğerlere girebilir.', hint: 'Diyafram ve göğüs boşluğunun hacim değişimini birlikte düşün.'},
      activity: { title: 'Solunum modeli: neyi gösteriyor?', format: 'Model gözlemi ve sınır analizi', prompt: 'Şişe içinde iki balon ve altta esnek bir zarla kurulan basit bir solunum modelini düşün. Zarı aşağı çekince balonlarda ne beklediğini, bunun hangi vücut hareketini temsil ettiğini ve modelin gösteremediği bir özelliği yaz.', placeholder: 'Gözlem… Temsil ettiği hareket… Modelin sınırı…', minChars: 30, criteria: ['Modeldeki gözlemi açıkla.', 'Zar ile diyaframı ilişkilendir.', 'Modelin en az bir sınırlılığını belirt.'], hint: 'Model benzetmesi, gerçek akciğerlerin yapısını bütünüyle kopyalamaz.' },
    },
    {
      id: 30, date: '3–7 May', unitId: 'systems', topic: 'Solunum sisteminin sağlığı ve temiz hava', pages: '123–128', visual: 'respiration', visualNote: "Akciğer görseli organların yapısını gösterir; temiz hava ve havalandırma gibi çevresel etkenler de sistemi etkiler.",
      focus: "Temiz hava ve uygun havalandırmanın solunum sağlığına katkısını, gözlem sınırlarını da gözeterek açıkla.",
      summary: [
        "Solunum sistemi sağlığı için temiz hava, uygun havalandırma, tütün dumanından kaçınma ve tozlu/kirli ortamları azaltma önemlidir. Havadaki bazı kirleticiler görünmez ve kokusuz olabilir; bu nedenle ortamın güvenliğini yalnızca gözle veya koklayarak kesin belirleyemeyiz.",
        "Hava kalitesini etkileyen kaynaklar arasında araç trafiği, sanayi, duman ve kapalı alanlarda hava dolaşımının yetersizliği bulunabilir. Pencere açmak her durumda yeterli değildir; dış hava koşulları da dikkate alınır. Şüpheli durumlarda yetişkinlere ve ilgili yetkililere haber verilir.",
        "Kitap, Elif’in yaşadığı yoğun trafik/fabrika çevresini örnek olay olarak sunar ve çözüm yolları araştırılmasını ister. Ayrıca solunum sağlığını koruma posteri görevi verir. Bu örnekler bireysel alışkanlığın yanında çevre koşullarının da solunum sağlığını etkileyebildiğini gösterir.",
        "Kirliliği azaltma önerisini açık bir eylemle yaz: kaynağı azaltma, ortamı uygun biçimde havalandırma, dumandan uzak durma veya temiz hava alanı seçme. Belirtiyi tek başına çevreye bağlayıp tanı koyma; hastalık şüphesi sağlık uzmanının değerlendirmesini gerektirir."
      ],
      termDefinitions: [
        {
          "term": "Hava kirliliği",
          "definition": "Havada insan ve çevre sağlığını etkileyebilecek maddelerin bulunması.",
          "connection": "Kirli hava solunum yollarını etkileyebilir; kaynakları azaltma ve temiz ortam sağlama, bireysel korunma ile çevresel çözümleri birlikte düşünmeyi gerektirir."
        },
        {
          "term": "Havalandırma",
          "definition": "İç ortam havasının yenilenip dolaşmasını sağlayan düzenleme.",
          "connection": "Kirliliği azaltma önerisini açık bir eylemle yaz: kaynağı azaltma, ortamı uygun biçimde havalandırma, dumandan uzak durma veya temiz hava alanı seçme."
        },
        {
          "term": "Solunum sağlığı",
          "definition": "Solunum yolları ve akciğerlerin görevlerini sürdürebilmesiyle ilişkili sağlık durumu.",
          "connection": "Bu örnekler bireysel alışkanlığın yanında çevre koşullarının da solunum sağlığını etkileyebildiğini gösterir."
        },
        {
          "term": "Kirletici",
          "definition": "Havaya karışarak ortamın doğal özelliklerini ve sağlığı olumsuz etkileyebilen madde.",
          "connection": "Havadaki bazı kirleticiler görünmez ve kokusuz olabilir; bu nedenle ortamın güvenliğini yalnızca gözle veya koklayarak kesin belirleyemeyiz."
        },
        {
          "term": "Koruyucu davranış",
          "definition": "Sağlık riskini azaltmak için yapılan güvenli ve bilinçli eylem.",
          "connection": "Tütün dumanından uzak durmak, ortamı uygun havalandırmak ve kirli/tozlu ortamlara maruziyeti azaltmak solunum sağlığını destekleyebilir."
        }
      ],
      points: ["Temiz hava ve uygun havalandırma önemlidir.", "Koku ve görünüş havadaki tüm kirleticileri göstermez.", "Sağlık belirtisi olduğunda uzmana danışılır."],
      terms: ['solunum sağlığı', 'havalandırma', 'temiz hava', 'zararlı madde'],
      tasks: ['Sınıf veya ev ortamında havalandırmayı destekleyen iki davranış belirle.', 'Tütün dumanından korunmaya yönelik güvenli bir mesaj yaz.', 'Hava kalitesi hakkında gözlem ile ölçümü ayır.'],
      quiz: { prompt: 'Kapalı bir sınıfta temiz hava dolaşımını destekleyen davranış hangisidir?', options: ['Güvenli koşullarda ortamı uygun biçimde havalandırmak', 'Pencereleri ve hava girişlerini sürekli kapatmak', 'Hava kalitesini yalnızca kokuyla kesin belirlemek', 'Tütün dumanını sınıfa taşımak'], answer: 0, explanation: 'Uygun ve güvenli havalandırma, kapalı ortamdaki hava dolaşımını destekler.', hint: 'Hava dolaşımını artıran ve güvenli koşulları gözeten seçeneği düşün.'},
      activity: { title: 'Sağlıklı ortam için iletişim kartı', format: 'Kamu spotu taslağı', prompt: 'Okulda solunum sağlığını destekleyecek kısa bir bilgilendirme kartı hazırla. Temiz hava veya havalandırma için iki eylem, zararlı dumandan korunma mesajı ve güvenli olmayan durumlarda kime haber verileceğini belirt.', placeholder: 'Ana mesaj… Eylemler… Yardım alınacak kişi…', minChars: 25, criteria: ['İki uygulanabilir eylem yaz.', 'Zararlı dumanlardan korunmayı belirt.', 'Güvenli yardım yolunu ekle.'], hint: 'Mesajı kısa, saygılı ve bilimsel olarak dikkatli tut.' },
    },
    {
      id: 31, date: '10–14 May', unitId: 'systems', topic: 'Bağımlılık yapıcı maddelerin vücut sistemlerine etkisi', pages: '123–128', visual: 'respiration', visualNote: "Solunum sistemi görseli organları gösterir; zararlı maddelerin etkileri hakkında bilgi verirken kişiyi suçlamadan, güvenilir kaynağa dayan.",
      focus: "Bağımlılık yapıcı maddelerin sağlığa etkilerini doğru bilgiyle, destekleyici ve yargılamayan bir dille açıkla.",
      summary: [
        "Bağımlılık, bir maddenin veya davranışın kişiye fiziksel, ruhsal ya da sosyal sorunlar yaşatmasına rağmen sürmesi ve bırakma isteğine karşın kontrol edilememesi durumudur. Bu konu yargılayıcı etiketlerle değil, bilimsel bilgi ve destek yollarıyla ele alınmalıdır.",
        "Tütün dumanı ve bağımlılık yapıcı maddeler solunum yollarını etkileyebilir; dolaşım sistemi ve genel sağlık da zarar görebilir. Etkiler kişiden kişiye değişebilir. Bir kişide bağımlılık bulunduğunu öğrenciler belirleyemez; tanı ve destek planı sağlık uzmanlarının işidir.",
        "Kitap Yeşilay’ın bağımlılıkla mücadele ve toplum bilincini artırma çalışmalarını örnek verir. Farkındalık posteri hazırlarken doğrulanmış bilgi, açık destek mesajı ve yardım alınabilecek güvenilir yetişkin/kurum türünü belirtmek, yalnızca korkutucu slogan yazmaktan daha yararlıdır.",
        "Bir mesajda kişiyi suçlama, küçümseme veya özel bilgisini paylaşma. Bilimsel bilgiyi güncel ve yetkili kaynaktan kontrol et; kendin ya da bir yakın için kaygı varsa güvenilir yetişkin ve sağlık uzmanından destek al. Yardım istemek güvenli bir davranıştır."
      ],
      termDefinitions: [
        {
          "term": "Bağımlılık",
          "definition": "Zarara rağmen sürdürülmesi ve bırakma isteğine karşın kontrol edilmesinin güçleşmesiyle tanımlanan durum.",
          "connection": "Bağımlılık, bir maddenin veya davranışın kişiye fiziksel, ruhsal ya da sosyal sorunlar yaşatmasına rağmen sürmesi ve bırakma isteğine karşın kontrol edilememesi durumudur."
        },
        {
          "term": "Tütün dumanı",
          "definition": "Tütün ürünlerinin yanmasıyla oluşup solunum ve dolaşım sağlığını etkileyebilen duman.",
          "connection": "Tütün dumanı ve bağımlılık yapıcı maddeler solunum yollarını etkileyebilir; dolaşım sistemi ve genel sağlık da zarar görebilir."
        },
        {
          "term": "Farkındalık çalışması",
          "definition": "Doğru bilgi ve destek yollarını topluma anlaşılır biçimde duyurma çalışması.",
          "connection": "Doğru bilgi ve yardım yollarını yargılamadan anlatmak, bağımlılık konusunda riskleri tanımayı ve destek aramayı kolaylaştırabilir."
        },
        {
          "term": "Destek kaynağı",
          "definition": "Güvenilir yetişkin, sağlık uzmanı veya yetkili kurum gibi yardım alınabilecek kişi/yer.",
          "connection": "Güvenilir bir yetişkin, sağlık uzmanı veya yetkili kurum, bağımlılık riski yaşayan kişinin profesyonel yardıma ulaşmasına yardımcı olabilir."
        },
        {
          "term": "Yargılamayan dil",
          "definition": "Kişiyi suçlamadan, saygılı ve destekleyici biçimde bilgi veren anlatım.",
          "connection": "Kişiyi suçlamak yerine saygılı ve destekleyici konuşmak, sağlık bilgisinin anlaşılmasını ve yardım istemeyi kolaylaştırır."
        }
      ],
      points: ["Bağımlılık fiziksel, ruhsal ve sosyal yaşamı etkileyebilir.", "Tütün dumanı solunum ve dolaşım sağlığına zarar verebilir.", "Destek aramak yargılanma değil, yardım alma sürecidir."],
      terms: ['bağımlılık', 'solunum sağlığı', 'dolaşım sağlığı', 'destek'],
      tasks: ['Bağımlılığın olası etkilerini fiziksel, ruhsal ve sosyal olarak ayır.', 'Bilimsel bir korunma mesajı tasarla.', 'Destek için başvurulabilecek güvenilir bir yetişkin/kurum türü belirt.'],
      quiz: { prompt: 'Bağımlılık konusunda farkındalık mesajı hazırlanırken hangi yaklaşım daha uygundur?', options: ['Bilimsel bilgi verip kişiyi yargılamadan destek kaynaklarını göstermek', 'Kişiyi suçlayıp yardım aramasını engellemek', 'Doğrulanmamış iddiaları kesin gerçek gibi sunmak', 'Tüm kişilerin aynı deneyimi yaşadığını varsaymak'], answer: 0, explanation: 'Bilgilendirme doğru, destekleyici ve yargılamayan bir dil kullanmalıdır.', hint: 'Bilgi verirken hem bilimsel doğruluğu hem de kişinin saygınlığını koru.'},
      activity: { title: 'Destekleyici farkındalık mesajı', format: 'Bilgi ağı ve kısa sunum taslağı', prompt: 'Solunum ve dolaşım sistemleriyle ilgili bir bilgilendirme posteri için üç ana kavram ve kısa bir destek mesajı yaz. Kişileri etiketlemeden, doğrulanabilir bir bilimsel bilgi ve yardım arama yolu ekle.', placeholder: 'Kavramlar… Bilimsel bilgi… Destek mesajı… Yardım yolu…', minChars: 30, criteria: ['İki vücut sistemiyle bağlantı kur.', 'Yargılamayan bir dil kullan.', 'Güvenilir destek yolunu belirt.'], hint: 'Posterin amacı korkutmak değil, doğru bilgi ve destek seçeneklerini göstermektir.' },
    },
    {
      id: 32, date: '20–21 May', unitId: 'systems', topic: 'Boşaltım sistemi: böbrekler ve idrar yolu', pages: '129–134', visual: 'excretion', visualNote: "Bu görsel idrar yoluna odaklanır; deri, akciğer ve karaciğerin boşaltıma katkısı konu anlatımında ayrıca açıklanır.",
      focus: "Böbrekler, üreterler, idrar kesesi ve üretranın görevlerini idrarın izlediği sırayla açıkla.",
      summary: [
        "Boşaltım, hücrelerde oluşan bazı atıkların ve vücuttaki fazla maddelerin uzaklaştırılmasına yardım eder. Böbrekler kanı süzer, atıkların bir bölümünü ve fazla suyu idrara aktarır. Boşaltım sistemi böbrekler, üreterler, idrar kesesi ve üretradan oluşur; bu yapılar idrarı oluşturma, taşıma, depolama ve dışarı atma görevlerini paylaşır.",
        "İdrar böbreklerde oluşur, üreter adı verilen borularla idrar kesesine taşınır ve burada geçici olarak depolanır. İdrar kesesi dolduğunda idrar üretradan vücut dışına çıkar. Dolaşım sistemi kanı böbreklere getirir; böylece sistemler birlikte çalışır.",
        "Kitap, Bora’nın spor sonrası terlemesi ve idrara çıkma ihtiyacını sorgulayan öyküyle konuya başlar. İdrar miktarı yalnızca içilen suya bağlı değildir; terleme, ortam sıcaklığı ve vücudun durumu da sıvı dengesini etkiler. Deri ve akciğer gibi yapılar da boşaltım bağlamında ele alınır.",
        "İdrar yolunu böbrek → üreter → idrar kesesi → üretra sırasıyla çiz; kanın böbreğe gelişini ayrı okla göster. Böbrek idrarı süzer/oluşturur, idrar kesesi depolar; bu iki görevi karıştırma. Bir günlük örnek olay, böbreklerin vücuttaki bütün atıkları tek başına attığı anlamına gelmez."
      ],
      termDefinitions: [
        {
          "term": "Boşaltım sistemi",
          "definition": "Vücuttaki bazı atıkları ve fazla maddeleri uzaklaştırmaya katkı veren yapı ve organlar.",
          "connection": "Boşaltım sistemi böbrekler, üreterler, idrar kesesi ve üretradan oluşur; bu yapılar idrarı oluşturma, taşıma, depolama ve dışarı atma görevlerini paylaşır."
        },
        {
          "term": "Böbrek",
          "definition": "Kanı süzerek idrar oluşumuna ve vücudun iç dengesine katkı sağlayan organ.",
          "connection": "Boşaltım sistemi böbrekler, üreterler, idrar kesesi ve üretradan oluşur; bu yapılar idrarı oluşturma, taşıma, depolama ve dışarı atma görevlerini paylaşır."
        },
        {
          "term": "Üreter",
          "definition": "Böbrekte oluşan idrarı idrar kesesine taşıyan boru.",
          "connection": "Boşaltım sistemi böbrekler, üreterler, idrar kesesi ve üretradan oluşur; bu yapılar idrarı oluşturma, taşıma, depolama ve dışarı atma görevlerini paylaşır."
        },
        {
          "term": "İdrar kesesi (mesane)",
          "definition": "İdrarın vücuttan atılıncaya kadar geçici olarak depolandığı kaslı yapı.",
          "connection": "Böbreklerde oluşan idrar üreterlerle mesaneye taşınır, burada geçici olarak depolanır ve sonra üretradan dışarı atılır."
        },
        {
          "term": "Üretra",
          "definition": "İdrarın idrar kesesinden vücut dışına geçtiği kanal.",
          "connection": "Boşaltım sistemi böbrekler, üreterler, idrar kesesi ve üretradan oluşur; bu yapılar idrarı oluşturma, taşıma, depolama ve dışarı atma görevlerini paylaşır."
        }
      ],
      points: ["Böbrekler kanın süzülmesi ve idrar oluşumunda görev alır.", "İdrar böbrek → üreter → idrar kesesi yolunu izler.", "Üretra idrarın vücuttan çıkış yoludur."],
      terms: ['böbrek', 'üreter', 'idrar kesesi', 'üretra'],
      tasks: ['İdrar yolunu doğru sırada yaz.', 'Her yapının bir görevini belirt.', 'Dolaşım sistemiyle bağlantıyı bir okla göster.'],
      quiz: { prompt: 'Böbreklerde oluşan idrar, idrar kesesine hangi yapılar aracılığıyla taşınır?', options: ['Üreterler', 'Bronşlar', 'Yemek borusu', 'Atardamarlar'], answer: 0, explanation: 'Üreterler idrarı böbreklerden idrar kesesine taşır.', hint: 'Böbrek ile idrar kesesi arasındaki taşıma yolunu düşün.'},
      activity: { title: 'Boşaltım sistemi maket şeması', format: 'Yapı–görev modellemesi', prompt: 'Böbrek, üreter, idrar kesesi ve üretrayı bir şemada doğru sıraya yerleştir. İdrarın izlediği yönü okla göster; böbreğin kanla ilişkisini ayrı bir okla belirt.', placeholder: 'Kan → …; idrar yolu: … → … → … → …', minChars: 25, criteria: ['Dört yapıyı doğru sırala.', 'İdrar akış yönünü göster.', 'Böbreğin kanı süzme rolünü belirt.'], hint: 'Kan böbreğe gelir; idrar ise üreter yönünde ilerler.' },
    },
    {
      id: 33, date: '24–28 May', unitId: 'systems', topic: 'Böbreklerde süzülme ve boşaltımın önemi', pages: '130–134', visual: 'excretion', visualNote: "Görseldeki böbrek, üreter ve idrar kesesini sırayla eşleştir; böbrekte süzülme idrarın depolanmasından farklıdır.",
      focus: "Böbreklerde kanın süzülmesi ile idrarın taşınması ve depolanması arasındaki farkı açıkla.",
      summary: [
        "Böbrekler, kanı süzerek bazı atık maddeleri ve vücuttaki fazla suyu idrara aktarır; yararlı maddelerin bir bölümü yeniden kana dönebilir. Böylece kanın bileşimi ve vücudun iç dengesi korunmaya çalışılır. İdrarın oluşması, taşınması, depolanması ve atılması birbirinden ayrı aşamalardır.",
        "Oluşan idrar üreterlerle idrar kesesine gelir; mesane idrarı depolar, üretra dışarı taşır. Bu sırada kan dolaşımı böbreğe madde taşımayı sürdürür. Terleme, soluk verme ve karaciğerin bazı maddeleri dönüştürmesi de kitapta boşaltıma yardımcı süreçlerle ilişkilendirilir.",
        "Kitabın s. 132–134 çizimleri böbrekleri, üreterleri, idrar kesesini ve üretrayı etiketler; organ-görev tablosu ise deri, akciğer ve kalın bağırsağın katkısını sorar. Bu örnekler “vücuttan atık uzaklaştırma” kavramının yalnızca tuvalete çıkma ile sınırlı olmadığını gösterir.",
        "Şemada önce kanın böbreğe gelişini, sonra süzülmeyi, idrarın üreter boyunca taşınmasını ve vücuttan çıkışını göster. İdrar kesesi kanı süzmez; böbrek idrarı depolamaz. Bol veya az su içme gibi kişisel tavsiyeler vermek yerine genel süreci açıkla ve sağlık bilgisi için uzman kaynağına yönel."
      ],
      termDefinitions: [
        {
          "term": "Süzülme",
          "definition": "Kan içindeki bazı maddelerin böbreklerde ayrılarak idrar oluşumuna katılması süreci.",
          "connection": "Şemada önce kanın böbreğe gelişini, sonra süzülmeyi, idrarın üreter boyunca taşınmasını ve vücuttan çıkışını göster."
        },
        {
          "term": "İdrar",
          "definition": "Böbreklerin kandan süzdüğü bazı atık ve fazla maddeleri taşıyan sıvı.",
          "connection": "İdrarın oluşması, taşınması, depolanması ve atılması birbirinden ayrı aşamalardır."
        },
        {
          "term": "Atık madde",
          "definition": "Hücre veya vücut süreçleri sonucunda oluşup uzaklaştırılması gereken madde.",
          "connection": "Böbrekler, kanı süzerek bazı atık maddeleri ve vücuttaki fazla suyu idrara aktarır; yararlı maddelerin bir bölümü yeniden kana dönebilir."
        },
        {
          "term": "İç denge",
          "definition": "Vücudun iç ortamındaki su ve maddelerin belirli sınırlar içinde tutulması.",
          "connection": "Böbrekler kandaki su ve bazı maddeleri ayarlamaya katkı verir; süzme ve geri emilim süreçleri vücudun iç ortamını belirli sınırlar içinde tutar."
        },
        {
          "term": "Yardımcı boşaltım organı",
          "definition": "Deri, akciğer ve bağırsak gibi atık uzaklaştırmaya katkıda bulunan yapı.",
          "connection": "Akciğer karbondioksiti, deri terle bazı maddeleri, bağırsak ise sindirilemeyen atıkları uzaklaştırmaya katkı verir; boşaltım idrarla sınırlı değildir."
        }
      ],
      points: ["Böbrekler kandaki bazı atıkları süzer.", "İdrar oluşumu ile idrarın depolanması farklı işlemlerdir.", "Boşaltım ve dolaşım sistemleri birlikte çalışır."],
      terms: ['süzülme', 'idrar', 'atık madde', 'iç denge'],
      tasks: ['Kan–böbrek–idrar ilişkisini şemalaştır.', 'İdrarın oluşması ile depolanmasını ayır.', 'Boşaltımın neden gerekli olduğunu açıkla.'],
      quiz: { prompt: 'İdrarın depolandığı yapı hangisidir?', options: ['İdrar kesesi', 'Böbrek üstü bezleri', 'Akciğer', 'İnce bağırsak'], answer: 0, explanation: 'İdrar, üreterlerden idrar kesesine taşınarak burada depolanır.', hint: 'İdrar yolunda böbreklerden sonra ve üretradan önce bulunan yapıyı düşün.'},
      activity: { title: 'Kan–böbrek–idrar akış modeli', format: 'Süreç diyagramı', prompt: 'Bir süreç diyagramında kanın böbreğe gelişini, süzülmeyi, idrarın oluşmasını ve vücuttan atılmasını sırayla göster. Her basamakta hangi maddenin taşındığını veya ayrıldığını yaz.', placeholder: 'Kan… Böbrek… Süzülme… İdrar… Atılma…', minChars: 30, criteria: ['Süreç aşamalarını sırala.', 'Kan ve idrar yollarını karıştırma.', 'Böbreğin süzme görevini açıkla.'], hint: 'İdrar kesesi idrarı oluşturmaz; oluşan idrarı depolar.' },
    },
    {
      id: 34, date: '31 May–4 Haz', unitId: 'systems', topic: 'Boşaltım sisteminin sağlığını koruma', pages: '135–139', visual: 'excretion', visualNote: "Böbrek ve idrar yolu şeması yapıyı gösterir; sağlık önerileri kişiye göre değiştiği için uzmana danışılmalıdır.",
      focus: "Boşaltım sağlığını destekleyen genel alışkanlıkları kişisel farklılık ve güvenilir kaynaklarla birlikte değerlendir.",
      summary: [
        "Boşaltım sisteminin sağlığını desteklemek için genel hijyen, dengeli beslenme, hareket ve vücudun gereksinimlerine uygun sıvı alımı önemlidir. Sıvı gereksinimi yaş, etkinlik, hava sıcaklığı ve sağlık durumuna göre değişebilir; herkes için geçerli tek bir miktar önerisi vermek doğru değildir.",
        "Böbreklerin işi kanı süzmek ve iç dengenin korunmasına yardım etmektir. Gereksiz ilaç kullanımı, aşırı tuz tüketimi veya kişisel hijyene dikkat etmemek sağlık riskleri oluşturabilir. Her durumda doğru değerlendirme, kişiye özgü bilgiyi sağlık uzmanıyla konuşmayı gerektirir.",
        "Kitap örnek olay, araştırma raporu ve doğru-yanlış sorularıyla alışkanlıkları sorgulatır; ekran başında uzun süre kalma, hareket ve su tüketimi gibi konuları ele alır. Bu sayfalar genel eğitim amaçlıdır; kişiye özel teşhis, ilaç veya sıvı miktarı belirlemez.",
        "Bir çevrim içi öneriyi paylaşmadan önce kaynağın yetkinliğini, kanıtını ve güncelliğini kontrol et. Bir belirti varsa kendi kendine tanı koyma veya başkasına tedavi önerme; güvenilir bir yetişkin ve sağlık uzmanına danış. Sağlık iletişiminde doğru bilgi kadar kişinin mahremiyetini ve saygınlığını korumak da önemlidir."
      ],
      termDefinitions: [
        {
          "term": "Böbrek sağlığı",
          "definition": "Böbreklerin kanı süzme ve vücudun iç dengesine katkı görevlerini sürdürebilmesi.",
          "connection": "Böbreklerin kanı süzme görevi, yeterli sıvı ve güvenli sağlık alışkanlıklarıyla ilişkilidir; sorunlarda kişisel tanı yerine sağlık uzmanına başvurulur."
        },
        {
          "term": "Kişisel hijyen",
          "definition": "Vücudu ve günlük yaşam araçlarını temiz tutmaya yönelik güvenli alışkanlıklar.",
          "connection": "Gereksiz ilaç kullanımı, aşırı tuz tüketimi veya kişisel hijyene dikkat etmemek sağlık riskleri oluşturabilir."
        },
        {
          "term": "Gereksiz ilaç kullanımı",
          "definition": "Sağlık uzmanı önerisi olmadan veya gereksinim bulunmadan ilaç kullanma davranışı.",
          "connection": "Gereksiz ilaç kullanımı, aşırı tuz tüketimi veya kişisel hijyene dikkat etmemek sağlık riskleri oluşturabilir."
        },
        {
          "term": "Sağlık kaynağını doğrulama",
          "definition": "Bilginin uzmanlık, kanıt ve güncellik açısından güvenilirliğini kontrol etme.",
          "connection": "İlaç, tuz veya böbrek sağlığıyla ilgili iddiaları uygulamadan önce yetkin ve güncel sağlık kaynaklarından kontrol et."
        },
        {
          "term": "Kişiye özel öneri",
          "definition": "Bir kişinin sağlık durumu ve gereksinimine göre sağlık uzmanının verdiği yönlendirme.",
          "connection": "İlaç ve beslenme önerileri kişinin sağlık durumuna göre değişebilir; bu yüzden kişiye özel karar sağlık uzmanına aittir."
        }
      ],
      points: ["Hijyen ve genel sağlıklı alışkanlıklar önemlidir.", "Su gereksinimi kişiye ve koşullara göre değişebilir.", "Sağlık önerilerini güvenilir kaynakla doğrula."],
      terms: ['böbrek sağlığı', 'hijyen', 'dengeli beslenme', 'sağlık kaynağı'],
      tasks: ['Boşaltım sağlığını destekleyen iki genel alışkanlık yaz.', 'Bir sağlık önerisini değerlendirmek için kaynak kontrol listesi oluştur.', 'Kişiye özel soruda hangi uzmana danışılacağını belirt.'],
      quiz: { prompt: 'Böbrek sağlığıyla ilgili bir öneriyi değerlendirirken hangi yaklaşım daha güvenlidir?', options: ['Güvenilir sağlık kaynağına başvurup kişisel gereksinimlerin değişebileceğini kabul etmek', 'Herkes için aynı su miktarını kesin kural saymak', 'İnternetteki ilk paylaşımı tıbbi öneri kabul etmek', 'Belirtiye bakarak kendi kendine tanı koymak'], answer: 0, explanation: 'Sağlık gereksinimleri değişebilir; güvenilir kaynak ve uzman görüşü önemlidir.', hint: 'Genel sınıf bilgisi ile kişiye özel sağlık önerisini ayır.'},
      activity: { title: 'Sağlık bilgisini doğrulama kartı', format: 'Kaynak güvenilirliği kontrolü', prompt: 'Boşaltım sağlığı hakkında çevrim içi bir öneri gördüğünü düşün. Paylaşmadan önce kontrol edeceğin üç ölçütü ve kişiye özel soru olduğunda başvurulacak güvenilir yardım yolunu yaz.', placeholder: 'Ölçüt 1… Ölçüt 2… Ölçüt 3… Yardım yolu…', minChars: 25, criteria: ['Üç kaynak kontrolü ölçütü belirt.', 'Genel ve kişiye özel bilgiyi ayır.', 'Güvenilir yardım yolunu ekle.'], hint: 'Kaynağın uzmanlığı, güncelliği ve iddianın kanıtı kontrol edilebilir.' },
    },
    {
      id: 35, date: '7–11 Haz', unitId: 'systems', topic: 'Vücudumuzdaki sistemlerin birlikte çalışması', pages: '89–139', visual: 'systemsReview', visualNote: "Dört görsel ayrı sistemleri gösterir; besin, oksijen ve atıkların sistemler arasında nasıl taşındığını kendi şemanda birleştir.",
      focus: "Sindirim, dolaşım, solunum ve boşaltım sistemlerinin madde alışverişi üzerinden ilişkisini açıkla.",
      summary: [
        "Vücut sistemleri birlikte çalışır. Sindirim sistemi besinleri yapı taşlarına ayırıp kana geçmesine yardım eder; solunum sistemi oksijeni kana kazandırır ve karbondioksitin atılmasını sağlar; dolaşım sistemi maddeleri hücrelere ve ilgili organlara taşır; boşaltım sistemi bazı atıkları uzaklaştırır.",
        "Örneğin kas hücresi çalışırken besin ve oksijen kullanır. Bu maddeler sindirim ve solunum sistemlerinde alınır, dolaşım sistemiyle hücreye taşınır. Hücrelerde oluşan karbondioksit kanla akciğerlere, bazı atıklar böbreklere taşınır. Bu iş birliği, her sistemin ayrı görevi olduğu hâlde diğerlerine bağlı olduğunu gösterir.",
        "Kitabın ünite sonu soruları sindirim organlarını, kan dolaşımını, solunum sağlığını, böbrekleri, organ bağışını ve bağımlılık konusunu birlikte değerlendirir. Sistemler arası ilişkiyi bir kavram haritasında göstermek, tek tek organ adlarını ezberlemekten daha açıklayıcıdır.",
        "Dört sistemi tek çizimde gösterirken besin, oksijen, karbondioksit ve atık maddeleri ayrı renkli oklarla belirt. Okların yönünü doğru kur; sindirimden gelen yapı taşı kana geçer, kan onu hücreye taşır. Şema gerçek vücuttaki bütün damar ve kimyasal tepkimeleri çizmez; yalnızca temel madde akışını sadeleştirir."
      ],
      termDefinitions: [
        {
          "term": "Sistem",
          "definition": "Belirli bir işi gerçekleştirmek için birlikte çalışan organ ve yapıların bütünü.",
          "connection": "Sistemler arası ilişkiyi bir kavram haritasında göstermek, tek tek organ adlarını ezberlemekten daha açıklayıcıdır."
        },
        {
          "term": "Madde alışverişi",
          "definition": "Maddelerin hücreler, kan ve organlar arasında taşınması veya yer değiştirmesi.",
          "connection": "Sindirim ve solunum maddeleri kana kazandırır, dolaşım bunları hücrelere taşır; atıklar da ilgili organlara götürülerek vücuttan uzaklaştırılır."
        },
        {
          "term": "Hücre",
          "definition": "Canlıların temel yapı ve görev birimi.",
          "connection": "Bu maddeler sindirim ve solunum sistemlerinde alınır, dolaşım sistemiyle hücreye taşınır."
        },
        {
          "term": "Karbondioksit",
          "definition": "Hücrelerde oluşup kanla akciğerlere taşınan atık gaz.",
          "connection": "Dört sistemi tek çizimde gösterirken besin, oksijen, karbondioksit ve atık maddeleri ayrı renkli oklarla belirt."
        },
        {
          "term": "Sistemler arası iş birliği",
          "definition": "Bir sistemin sağladığı madde veya işlevin başka sistemlerin görevini desteklemesi.",
          "connection": "Besin, oksijen ve atıkların izlediği yollar farklı sistemleri birleştirir; tek bir sistem tüm hücre gereksinimlerini kendi başına karşılamaz."
        }
      ],
      points: ["Dolaşım maddelerin hücrelere taşınmasına yardım eder.", "Solunum oksijen-karbondioksit alışverişine katkı verir.", "Boşaltım bazı atıkların uzaklaştırılmasını sağlar."],
      terms: ['sistem', 'madde alışverişi', 'hücre', 'atık madde'],
      tasks: ['Besin, oksijen ve atıkların izlediği yolları farklı oklarla göster.', 'Dört sistemi bir örnek olayda ilişkilendir.', 'Bir sistemdeki değişimin diğer sistemlerle bağlantısını açıkla.'],
      quiz: { prompt: 'Sindirim sisteminde emilen besin yapı taşlarının vücut hücrelerine taşınmasına hangi sistem yardımcı olur?', options: ['Dolaşım sistemi', 'Yalnızca iskelet sistemi', 'Solunum yolu', 'Dış ortam'], answer: 0, explanation: 'Dolaşım sistemi kan aracılığıyla besin maddelerinin hücrelere taşınmasına yardım eder.', hint: 'Maddeleri vücutta taşıyan sistemi düşün.'},
      activity: { title: 'Bir hücrenin madde yolculuğu', format: 'Sistemler arası kavram haritası', prompt: 'Bir kas hücresinin çalışması için besin ve oksijen gerektiğini varsay. Bu maddelerin hangi sistemler aracılığıyla hücreye ulaşacağını ve oluşan karbondioksit ile diğer atıkların hangi yollarla uzaklaştırılacağını oklarla anlat.', placeholder: 'Besin yolu… Oksijen yolu… Atıkların yolu…', minChars: 35, criteria: ['Sindirim ve dolaşım bağlantısını kur.', 'Solunum ve dolaşım bağlantısını kur.', 'Atıkların uzaklaştırılmasında ilgili sistemi belirt.'], hint: 'Hücreye madde götüren yollarla atıkları uzaklaştıran yolları ayır.' },
    },
    {
      id: 36, date: '14–18 Haz', unitId: 'systems', topic: 'Vücudumuzdaki sistemler: bilim insanları ve sentez', pages: '140–148', visual: 'systemsReview', visualNote: "Sistem görsellerini incelerken modellerin bilim insanlarının gözlem ve araştırmalarıyla gelişen açıklamaları temsil ettiğini hatırla.",
      focus: "Kitaptaki bilim insanı örneklerini tarihsel bağlam, araştırma yöntemi ve kanıt üzerinden değerlendir.",
      summary: [
        "Vücut yapılarıyla ilgili bilimsel açıklamalar gözlem, inceleme, çizim, model ve kanıt birikimiyle gelişmiştir. Kitaptaki “İz Bırakanlar” sayfaları, farklı dönemlerde yaşayan bilim insanlarının anatomi, dolaşım, cerrahi ve tıp alanlarındaki katkılarını örnekler.",
        "Bir tarihsel çalışmayı incelerken araştırmacının hangi soruyu ele aldığını, hangi gözlem veya araçtan yararlandığını ve hangi açıklamayı geliştirdiğini sor. Bilimsel bilgi yeni kanıtlar ve yöntemlerle ayrıntılanabilir; günümüzdeki model ile geçmişteki çizim aynı teknolojiyle hazırlanmış olmayabilir.",
        "Kitapta İbnü’n Nefîs’in küçük kan dolaşımına ilişkin açıklaması; Zehrâvî ve Sabuncuoğlu Şerefeddin’in cerrahi çalışmaları; İbn Sina ve Malpighi gibi kişilerin tıp tarihindeki katkıları yer alır. Bu örnekler, bilginin farklı kültür ve dönemlerdeki araştırmacılarla birikerek geliştiğini gösterir.",
        "Bir biyografi özeti yazarken kanıtlanmamış alıntı veya abartılı “ilk kişi” iddiası ekleme. Kişinin katkısını bir güvenilir kaynakla doğrula, yaşadığı dönemi belirt ve kendi çalışmasının sonraki bilgiyle ilişkisini açıkla. Portre bir bilimsel kanıt değil, kişiyi tanıtan görseldir; bilimsel katkı metindeki yöntem ve kaynakla değerlendirilir."
      ],
      termDefinitions: [
        {
          "term": "Bilim tarihi",
          "definition": "Bilimsel bilgi ve yöntemlerin farklı dönemlerde nasıl geliştiğini inceleyen alan.",
          "connection": "Bilim insanlarının farklı dönemlerde yaptığı gözlem ve çalışmalar, tıp bilgisinin zaman içinde nasıl biriktiğini ve değiştiğini gösterir."
        },
        {
          "term": "Bilimsel kanıt",
          "definition": "Bir açıklamayı desteklemek veya sınamak için kullanılan gözlem ve araştırma bulgusu.",
          "connection": "Portre bir bilimsel kanıt değil, kişiyi tanıtan görseldir; bilimsel katkı metindeki yöntem ve kaynakla değerlendirilir."
        },
        {
          "term": "Anatomi",
          "definition": "Canlıların vücut yapısını inceleyen bilim alanı.",
          "connection": "Kitaptaki “İz Bırakanlar” sayfaları, farklı dönemlerde yaşayan bilim insanlarının anatomi, dolaşım, cerrahi ve tıp alanlarındaki katkılarını örnekler."
        },
        {
          "term": "Bilimsel model",
          "definition": "Bir yapıyı veya süreci açıklamak için seçilmiş özellikleri gösteren temsil.",
          "connection": "Anatomik bir çizim veya model yapıları anlamaya yardım eder; gerçek dokunun tüm ayrıntılarını göstermediği için metin ve kanıtla birlikte okunur."
        },
        {
          "term": "Kaynak doğrulama",
          "definition": "Tarihsel veya bilimsel bir iddiayı güvenilir kayıtlarla karşılaştırma.",
          "connection": "Bir bilim insanına atfedilen buluşu değerlendirirken tarihsel kaydı ve güvenilir kaynakları karşılaştır; portre veya kısa biyografi tek başına kanıt değildir."
        }
      ],
      points: ["Bilimsel bilgi yeni kanıtlarla gelişebilir.", "Araştırmacının yöntemi ve dönemi önemlidir.", "Bilgi birikimine farklı araştırmacılar katkı sağlar."],
      terms: ['bilim tarihi', 'kanıt', 'gözlem', 'bilimsel model'],
      tasks: ['Kitaptaki “İz Bırakanlar” bölümünden bir bilim insanı seç.', 'Katkısını bir güvenilir kaynakla doğrula.', 'Bilginin hangi kanıta veya yönteme dayandığını yaz.'],
      quiz: { prompt: 'Tarihsel bir bilim insanının katkısını araştırırken hangi bilgi çalışmayı güçlendirir?', options: ['Kullandığı yöntemi ve dayandığı kanıtı kaynakla incelemek', 'Yalnızca yaşadığı dönemin kıyafetini anlatmak', 'Kaynağı olmayan bir sözü ona mal etmek', 'Bugünkü bilgiyi geçmişte de aynen biliniyormuş gibi göstermek'], answer: 0, explanation: 'Yöntem ve kanıt, bilimsel katkının bağlamını anlamaya yardım eder.', hint: 'Bir katkıyı yalnızca isimle değil, yöntemi ve kanıtıyla ilişkilendir.'},
      activity: { title: 'Bilim insanı için kaynak kartı', format: 'Kısa araştırma özeti', prompt: 'Vücudumuzdaki sistemler konusuyla ilişkili bir bilim insanı seç. Dönemini, araştırma konusunu, kullandığı yöntem veya kanıtı ve katkısının bugünkü bilgilerle ilişkisini güvenilir kaynak göstererek özetle.', placeholder: 'Kişi ve dönem… Araştırma… Kanıt/yöntem… Kaynak…', minChars: 35, criteria: ['Kişi ve dönemi doğru yaz.', 'Katkıyı yöntem veya kanıtla açıkla.', 'Kaynağı belirt ve iddiayı doğrula.'], hint: 'Birden fazla güvenilir kaynağı karşılaştır; doğrulanmayan alıntıyı kullanma.' },
    },
    {
      id: 37, date: '21–25 Haz', unitId: 'systems', topic: 'Yıl sonu: sistemler, modeller ve öz değerlendirme', pages: '141–148', visual: 'systemsReview', visualNote: "Dört sistem görselini karşılaştır; öğrendiklerini uzay ve enerji ünitelerindeki model-kavram ilişkileriyle birlikte değerlendir.",
      focus: "Üç üniteden öğrendiklerini model, kanıt ve öz değerlendirme yoluyla bir araya getir.",
      summary: [
        "Yıl boyunca uzay, kuvvet-enerji ve vücudumuzdaki sistemler konularını farklı içeriklerle öğrendin; ortak bilimsel beceriler ise gözlem yapmak, kavramı tanımlamak, kanıtı açıklamak ve model kurmaktır. Bir kavramı ezberden söylemek yerine yeni bir örnekte kullanmak öğrenmeyi güçlendirir.",
        "Bir bilimsel açıklama; hangi soruya yanıt verdiğini, hangi kanıta dayandığını ve süreçte nelerin değiştiğini açıklar. Model, karmaşık gerçekliği sadeleştirerek anlaşılır kılar; modelin sınırlılıklarını da belirtmek gerekir. Gözlem, çıkarım ve sonuç birbiriyle ilişkili ama farklı düşünme adımlarıdır.",
        "Kitabın son sayfaları sindirim, dolaşım, solunum ve boşaltım sistemlerini test soruları, şemalar, günlük yaşam örnekleri ve bulmacalarla tekrar ettirir. Sözlük, kaynakça ve haritalar başvuru amacıyla eklenmiştir. Kendi çalışma portföyünde uzay teknolojisi, enerji dönüşümü ve sistemler arası madde akışı için birer kanıtlı örnek seçebilirsin.",
        "Öz değerlendirmede yalnızca doğru cevaba değil, hangi kavramı daha iyi açıklayabildiğine, hangi modelinin işe yaradığına ve neyi yeniden araştırman gerektiğine bak. Bir şema hazırlarken okların anlamını ve görselin temsilî olduğunu açıkla. Güvenilir kaynak kullandıysan adını yaz; öğrendiğin bilgiyi yeni bir örneğe aktar."
      ],
      termDefinitions: [
        {
          "term": "Gözlem",
          "definition": "Bir olayı veya nesneyi araç/duyularla inceleyip fark edilen özellikleri kaydetme.",
          "connection": "Yıl boyunca uzay, kuvvet-enerji ve vücudumuzdaki sistemler konularını farklı içeriklerle öğrendin; ortak bilimsel beceriler ise gözlem yapmak, kavramı tanımlamak, kanıtı açıklamak ve model kurmaktır."
        },
        {
          "term": "Çıkarım",
          "definition": "Gözlem ve kanıtlara dayanarak olası açıklama geliştirme.",
          "connection": "Gözlem, çıkarım ve sonuç birbiriyle ilişkili ama farklı düşünme adımlarıdır."
        },
        {
          "term": "Model",
          "definition": "Gerçek bir yapının veya sürecin seçilmiş özelliklerini gösteren sadeleştirilmiş temsil.",
          "connection": "Öz değerlendirmede yalnızca doğru cevaba değil, hangi kavramı daha iyi açıklayabildiğine, hangi modelinin işe yaradığına ve neyi yeniden araştırman gerektiğine bak."
        },
        {
          "term": "Öz değerlendirme",
          "definition": "Kendi öğrenme sürecindeki güçlü yanları ve geliştirilmesi gereken noktaları inceleme.",
          "connection": "Öz değerlendirmede yalnızca doğru cevaba değil, hangi kavramı daha iyi açıklayabildiğine, hangi modelinin işe yaradığına ve neyi yeniden araştırman gerektiğine bak."
        },
        {
          "term": "Kanıtlı açıklama",
          "definition": "İddiasını gözlem, ölçüm veya güvenilir kaynakla destekleyen bilimsel anlatım.",
          "connection": "Bir iddiayı gözlem, ölçüm ya da güvenilir kaynakla desteklemek; sonuç ile tahmini ayırır ve başkasının açıklamayı yeniden değerlendirmesine olanak verir."
        }
      ],
      points: ["Kavramı örnek ve modelle ilişkilendir.", "Açıklamanı kanıt ve güvenilir kaynakla destekle.", "Modelinin sınırını fark edip öğrenme sürecini gözden geçir."],
      terms: ['model', 'kanıt', 'açıklama', 'öz değerlendirme'],
      tasks: ['Üç üniteden birer temel kavram seç.', 'Bir model veya şema ile kavramlar arasındaki bağlantıyı göster.', 'Öğrenme portföyüne güçlü yanını ve yeni sorunu yaz.'],
      quiz: { prompt: 'Bir fen modeli kullanılırken hangi yaklaşım bilimsel düşünmeyi destekler?', options: ['Modelin gösterdiği özellikleri ve sınırlılıklarını birlikte açıklamak', 'Modeli gerçek sistemin her ayrıntısını gösteriyor saymak', 'Kanıtla uyuşmasa da ilk fikri değiştirmemek', 'Modeldeki etiketleri açıklama yapmadan ezberlemek'], answer: 0, explanation: 'Modeller yararlıdır; ancak gerçek sistemi basitleştirdikleri için güçlü ve sınırlı yönleri değerlendirilmelidir.', hint: 'Bir modelin neyi gösterdiği kadar neyi göstermediğini de belirt.'},
      activity: { title: 'Fen öğrenme portföyü', format: 'Üç üniteli öz değerlendirme', prompt: 'Uzay, kuvvet–enerji ve vücudumuzdaki sistemler ünitelerinden birer kavram seç. Her kavrama günlük yaşamdan bir örnek, onu gösteren bir model fikri ve öğrendiğin bilgiyi doğrulayabileceğin bir kaynak ekle; yıl boyunca geliştirdiğin bir beceriyi de belirt.', placeholder: 'Uzay… Enerji… Sistemler… Geliştirdiğim beceri…', minChars: 35, criteria: ['Üç üniteden kavram seç.', 'Her kavramı örnek ve modelle ilişkilendir.', 'Kaynak veya kanıt ile öz değerlendirme ekle.'], hint: 'Kısa ama somut örnekler seç; her iddianın hangi bilgiye dayandığını belirt.' },
    },
  ];

  window.SCIENCE_CONTENT = { units, weeks };
})();
