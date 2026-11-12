/* Din Kültürü ve Ahlak Bilgisi · 7. sınıf 1. ünite
   Kaynak: MEB Din Öğretimi Genel Müdürlüğü, 7. sınıf DKAB açık uçlu çalışma
   soruları (1. ünite: Melek ve Ahiret İnancı, Nâs suresi).
   Sorular kaynaktaki sırası ve metniyle verilir; cevaplar yalnızca şifreyle
   açılır. Cevap metinleri kaynaktaki "Örnek Cevap" bölümlerinden alınmıştır. */
(() => {
  'use strict';

  const QUESTIONS = [
    {
      no: 1,
      heading: 'Varlıklar âleminin grupları',
      outcome: 'DKAB.7.1.1 · Melekleri sınıflandırabilme',
      skill: 'KB2.5 Sınıflandırma',
      stem: [
        'Varlıklar âleminde duyu organlarıyla veya teknolojik araçlarla doğrudan algılanıp gözlemlenebilen birçok varlık bulunmaktadır. Bu varlıklar, sahip oldukları özelliklerle evrendeki hassas ölçü ve düzenin birer göstergesi olarak yer almaktadır.',
        'Bununla birlikte duyu organlarının ve aklın sınırlarını aşan, varlığı ancak Allah’ın (cc) vahyi ve peygamberlerin bildirmesiyle öğrenilen gayb alanına ait varlıklar da bulunmaktadır. Duyular ötesi bu alanda, insani ve bedeni ihtiyaçlardan uzak, Allah’a (cc) eksiksiz itaat eden varlıkların yanı sıra irade sahibi kılınan varlıklar da yer almaktadır.',
      ],
      ask: 'Metne göre varlıklar âlemi hangi gruplara ayrılmaktadır? Bu grupları adlandırarak her birini ikişer örnekle açıklayınız.',
      tasks: [
        { id: 'a', label: '1. grup: adı, özelliği ve iki örnek', rows: 3 },
        { id: 'b', label: '2. grup: adı, özelliği ve iki örnek', rows: 3 },
      ],
      keyPoints: [
        'İki grup: görülebilen (duyularla/teknolojiyle algılanan) varlıklar ve görülemeyen (gayb alanına ait) varlıklar.',
        'Görülebilenlere insan, hayvan, bitki, gök cisimleri gibi en az iki örnek.',
        'Görülemeyenlere melek, cin, şeytan gibi en az iki örnek; bilginin vahiy ve peygamberle geldiği.',
      ],
      answer: {
        blocks: [
          { t: 'p', text: 'Varlıklar âlemi iki gruba ayrılır:' },
          {
            t: 'ul',
            items: [
              'Görülebilen varlıklar: Duyu organlarıyla veya teknolojik araçlarla algılanıp gözlemlenebilen varlıklardır. İnsan, hayvan, gök cisimleri vb. örnek verilebilir.',
              'Görülemeyen (gayb alanına ait) varlıklar: Duyu organlarıyla ve teknolojiyle doğrudan algılanamayan, varlıkları vahiy ve peygamberlerin bildirmesiyle öğrenilen varlıklardır. Melek, cin, şeytan örnek verilebilir.',
            ],
          },
        ],
      },
    },
    {
      no: 2,
      heading: 'Melekler ile insanların ayrıldığı yönler',
      outcome: 'DKAB.7.1.1 · Melekleri sınıflandırabilme',
      skill: 'KB2.5 Sınıflandırma',
      stem: ['Melekler ve insanlar arasındaki özellikleri karşılaştırmak amacıyla aşağıda bazı ayetler verilmiştir.'],
      notes: [
        { text: '“Onlar, Rahmân’ın kulları olan melekleri de dişi saydılar. Onların yaratılışına şahit mi oldular? Onların (yalan) şahitlikleri yazılacak ve sorgulanacaklardır.”', source: 'Zuhruf suresi 19. ayet' },
        { text: '“Sizleri (erkekli-dişili) eşler halinde yarattık.”', source: 'Nebe suresi 8. ayet' },
        { text: '“… Allah’ın kendilerine verdiği emirlere karşı gelmeyen ve kendilerine emredilen şeyi yapan melekler vardır.”', source: 'Tahrim suresi 6. ayet' },
        { text: '“De ki: ‘Hak, Rabbinizdendir. Artık dileyen iman etsin, dileyen inkâr etsin. …’”', source: 'Kehf suresi 29. ayet' },
      ],
      ask: 'Bu ayetlere göre melekler ile insanları birbirinden ayıran iki özellik nedir? Yazınız.',
      tasks: [{ id: 'a', label: '1. özellik ve ayetle gerekçesi', rows: 3 }, { id: 'b', label: '2. özellik ve ayetle gerekçesi', rows: 3 }],
      keyPoints: [
        'Meleklerin cinsiyeti yoktur; insanlar erkek ve dişi eşler hâlinde yaratılmıştır.',
        'Meleklerin özgür iradesi yoktur, emirlere eksiksiz itaat ederler; insanlar seçme ve inanma/inkâr etme özgürlüğüne sahiptir.',
      ],
      answer: {
        blocks: [
          {
            t: 'ul',
            items: [
              'Meleklerin erkeklik veya dişilik gibi cinsiyetleri yoktur; insanlar ise erkek ve dişi çiftler hâlinde yaratılmışlardır.',
              'Meleklerin özgür iradeleri olmayıp Allah’ın (cc) emirlerine eksiksiz itaat ederler; insanlar ise kendi tercihleriyle iman veya inkâr etme özgürlüğüne sahiptirler.',
            ],
          },
        ],
      },
    },
    {
      no: 3,
      heading: 'Melekleri insanlardan ayıran üç özellik',
      outcome: 'DKAB.7.1.1 · Melekleri sınıflandırabilme',
      skill: 'KB2.5 Sınıflandırma',
      stem: [
        'Hz. İbrahim, cömertliğiyle tanınan ve misafirlerine ikramda bulunmayı seven bir peygamberdi. Bir gün Allah’ın (cc) elçileri, O’nun emrini yerine getirmek ve bir müjde vermek üzere insan kılığına bürünerek Hz. İbrahim’i ziyaret ettiler.',
        'Bu olay Kur’an-ı Kerim’de şu şekilde anlatılmaktadır:',
      ],
      notes: [
        {
          text: '“Andolsun, elçilerimiz (melekler), İbrahim’e müjde getirip ‘Selâm sana!’ dediler. O, ‘Size de selâm’ dedi ve kızartılmış bir buzağı getirmekte gecikmedi. Ellerini yemeğe uzatmadıklarını görünce, onları yadırgadı ve onlardan dolayı içinde bir korku duydu. Dediler ki: ‘Korkma ...’”',
          source: 'Hud suresi 69 ve 70. ayetler',
        },
      ],
      ask: 'Bu metinden hareketle melekleri insanlardan ayıran üç özelliği yazınız.',
      tasks: [{ id: 'a', label: 'Üç özellik ve metindeki kanıtı', rows: 4 }],
      keyPoints: [
        'Yeme, içme gibi biyolojik ihtiyaçlarının olmaması (ikram edilen yemeğe el uzatmamaları).',
        'Allah’ın izniyle insan suretine girebilmeleri.',
        'Yalnızca Allah’ın emirleri doğrultusunda hareket etmeleri (elçilik görevini eksiksiz yerine getirmeleri).',
      ],
      answer: {
        blocks: [
          {
            t: 'ul',
            items: [
              'Yeme ve içme ihtiyaçlarının olmaması: İnsanlar biyolojik yapıları gereği yemeye ve içmeye muhtaçken melekler acıkmaz, yemez ve içmezler.',
              'İnsan suretine girebilmeleri: İnsanlar başka bir surete bürünemezken melekler Allah’ın (cc) izniyle insan kılığında görünebilirler.',
              'Allah’ın (cc) emirleriyle hareket etmeleri: İnsanlar hür iradeye sahipken melekler Allah’ın (cc) emirlerini ve elçilik görevlerini eksiksiz yerine getirirler.',
            ],
          },
        ],
      },
    },
    {
      no: 4,
      heading: 'Metindeki melekler ve görevleri',
      outcome: 'DKAB.7.1.1 · Melekleri sınıflandırabilme',
      skill: 'KB2.5 Sınıflandırma',
      stem: [
        'Hasan, vefat eden bir komşusunun ailesine dedesiyle birlikte taziye ziyaretinde bulunur. Eve döndüklerinde dedesi ona şöyle der:',
      ],
      notes: [
        {
          text: '“Oğlum, insanoğlu dünyada sürekli bir koşuşturma içindedir. Bu telaş, ona bazı sorumluluklarını zaman zaman unutturur. Hâlbuki dünyaya geldiğimiz andan itibaren sağımızda ve solumuzda duran değerli yazıcılar her adımımızı kaydeder. Ömrümüz bittiğinde ölüm meleği emaneti teslim alır. Ardından kabir hayatı başlar. Burada görevli melekler bizi sorguya çekerler. Allah’ın (cc) belirlediği vakit geldiğinde ise görevli bir melek sûra üfler ve dünya hayatı sona erer. İkinci sûra üflemenin ardından insanlar hesap vermek üzere yeniden diriltilerek Allah’ın (cc) huzurunda toplanır.”',
        },
      ],
      ask: 'Metinde geçen melekleri görevleriyle birlikte belirleyerek tabloyu tamamlayınız.',
      tables: [
        {
          caption: 'Numara · Melek ismi · Görevleri',
          columns: ['Melek ismi', 'Görevleri'],
          rows: [
            { label: 'I.', fields: ['a', 'b'] },
            { label: 'II.', fields: ['c', 'd'] },
            { label: 'III.', fields: ['e', 'f'] },
            { label: 'IV.', fields: ['g', 'h'] },
          ],
        },
      ],
      tasks: [
        { id: 'a', label: 'I. melek ismi', short: true },
        { id: 'b', label: 'I. görevi', short: true },
        { id: 'c', label: 'II. melek ismi', short: true },
        { id: 'd', label: 'II. görevi', short: true },
        { id: 'e', label: 'III. melek ismi', short: true },
        { id: 'f', label: 'III. görevi', short: true },
        { id: 'g', label: 'IV. melek ismi', short: true },
        { id: 'h', label: 'IV. görevi', short: true },
      ],
      keyPoints: [
        'I. Kiramen Kâtibin (değerli yazıcılar): insanın sağında ve solunda bulunup iyilik ve kötülükleri kaydederler.',
        'II. Azrail (ölüm meleği): ölüm vakti gelen insanların canını alır.',
        'III. Münker ve Nekir: kabir hayatında insanları sorguya çekerler.',
        'IV. İsrafil: kıyametin kopması ve yeniden diriliş için sûra üfler.',
      ],
      answer: {
        blocks: [
          {
            t: 'table',
            columns: ['Numara', 'Melek ismi', 'Görevleri'],
            rows: [
              ['I.', 'Kiramen Kâtibin (Değerli Yazıcılar)', 'İnsanın sağında ve solunda bulunarak yaptığı iyilik ve kötülükleri kaydederler.'],
              ['II.', 'Azrail (Ölüm Meleği)', 'Ölüm vakti gelen insanların canını alır.'],
              ['III.', 'Münker ve Nekir', 'Kabir hayatında insanları sorguya çekerler.'],
              ['IV.', 'İsrafil', 'Kıyametin kopması ve insanların yeniden diriltilmesi için sûra üflemekle görevlidir.'],
            ],
          },
        ],
      },
    },
    {
      no: 5,
      heading: 'Melek kartlarını gruplandırma',
      outcome: 'DKAB.7.1.1 · Melekleri sınıflandırabilme',
      skill: 'KB2.5 Sınıflandırma',
      stem: ['Zeynep, meleklerin görevleriyle ilgili hazırladığı kartlara şu bilgileri yazar:'],
      cards: [
        { title: '1. Kart', text: 'Allah’ın (cc) mesajlarını peygamberlere ulaştırır.' },
        { title: '2. Kart', text: 'Tabiat olayları ve rızıklar ile ilgili görevleri yerine getirir.' },
        { title: '3. Kart', text: 'İnsanların iyi ve kötü davranışlarını kaydeder.' },
        { title: '4. Kart', text: 'Ölüm vakti gelenlerin canını almakla görevlidir.' },
        { title: '5. Kart', text: 'Kıyametin kopması ve yeniden diriliş için sûra üfler.' },
        { title: '6. Kart', text: 'Vefat eden insanları sorguya çekmekle görevli olan meleklerdir.' },
      ],
      ask: 'a) Kartlarda verilen meleklerin görevlerini inceleyiniz. Bu görevleri meleklerin özelliklerine göre gruplandırarak kart numaralarını aşağıdaki tabloya yazınız. b) Kartlarda verilen görevlerin hangi meleklere ait olduğunu belirleyerek aşağıdaki tabloya yazınız.',
      tables: [
        {
          caption: 'a) Görev grupları',
          columns: ['Melekler', 'Kart numarası'],
          rows: [{ label: 'Dört Büyük Melek', fields: ['a'] }, { label: 'Diğer Görevli Melekler', fields: ['b'] }],
        },
        {
          caption: 'b) Kartlardaki melekler',
          columns: ['Kart', 'Melek adı'],
          rows: [
            { label: '1', fields: ['c'] },
            { label: '2', fields: ['d'] },
            { label: '3', fields: ['e'] },
            { label: '4', fields: ['f'] },
            { label: '5', fields: ['g'] },
            { label: '6', fields: ['h'] },
          ],
        },
      ],
      tasks: [
        { id: 'a', label: 'a) Dört Büyük Melek — kart numaraları', short: true },
        { id: 'b', label: 'a) Diğer Görevli Melekler — kart numaraları', short: true },
        { id: 'c', label: 'b) 1. kart', short: true },
        { id: 'd', label: 'b) 2. kart', short: true },
        { id: 'e', label: 'b) 3. kart', short: true },
        { id: 'f', label: 'b) 4. kart', short: true },
        { id: 'g', label: 'b) 5. kart', short: true },
        { id: 'h', label: 'b) 6. kart', short: true },
      ],
      keyPoints: [
        'Dört Büyük Melek: 1, 2, 4, 5. Diğer görevli melekler: 3, 6.',
        '1 Cebrail, 2 Mikâil, 3 Kiramen Kâtibin, 4 Azrail, 5 İsrafil, 6 Münker ve Nekir.',
      ],
      answer: {
        blocks: [
          {
            t: 'table',
            columns: ['Melekler', 'Kart Numarası'],
            rows: [
              ['Dört Büyük Melek', '1, 2, 4, 5'],
              ['Diğer Görevli Melekler', '3, 6'],
            ],
          },
          {
            t: 'table',
            columns: ['Kart', 'Melek Adı'],
            rows: [
              ['1', 'Cebrail'],
              ['2', 'Mikâil'],
              ['3', 'Kiramen Kâtibin'],
              ['4', 'Azrail'],
              ['5', 'İsrafil'],
              ['6', 'Münker ve Nekir'],
            ],
          },
        ],
      },
    },
    {
      no: 6,
      heading: 'Ahiret hayatının aşamaları (Zümer)',
      outcome: 'DKAB.7.1.2 · Ahiret hayatının aşamalarını çözümleyebilme',
      skill: 'KB2.4 Çözümleme',
      stem: [],
      notes: [
        {
          text: '“Sûr’a üflenir ve Allah’ın dilediği kimseler dışında göklerdeki herkes ve yerdeki herkes ölür. (I) Sonra ona bir daha üflenir, bir de bakarsın onlar kalkmış bekliyorlar. (II) Yeryüzü Rabbinin nuruyla aydınlanır. (III) Kitap ortaya konur. (IV) Peygamberler ve şahitler getirilir ve haksızlığa uğratılmaksızın aralarında adaletle hüküm verilir.” (V)',
          source: 'Zümer suresi 68 ve 69. ayetler',
        },
      ],
      ask: 'Bu ayetlerdeki numaralandırılmış ifadeler ahiret hayatıyla ilgili hangi kavramlara karşılık gelir? Yazınız.',
      tasks: [
        { id: 'a', label: 'I.', short: true },
        { id: 'b', label: 'II.', short: true },
        { id: 'c', label: 'III.', short: true },
        { id: 'd', label: 'IV.', short: true },
        { id: 'e', label: 'V.', short: true },
      ],
      keyPoints: ['I. Kıyamet', 'II. Baas', 'III. Haşir', 'IV. Amel defteri', 'V. Mizan'],
      answer: {
        blocks: [
          {
            t: 'table',
            columns: ['Numara', 'Kavram'],
            rows: [
              ['I.', 'Kıyamet'],
              ['II.', 'Baas'],
              ['III.', 'Haşir'],
              ['IV.', 'Amel defteri'],
              ['V.', 'Mizan'],
            ],
          },
        ],
      },
    },
    {
      no: 7,
      heading: 'Ahiret aşamalarını metinden çözümleme',
      outcome: 'DKAB.7.1.2 · Ahiret hayatının aşamalarını çözümleyebilme',
      skill: 'KB2.4 Çözümleme',
      stem: ['Selim, bir akşam babasıyla sohbet ederken konu ahiret inancına gelir. Babası, Selim’e ahiret hayatıyla ilgili şunları anlatır:'],
      notes: [
        {
          text: '“Bak Selim, her insanın doğumla başlayıp ölümle biten sınırlı bir vakti vardır. Bu vakit, bizim toprağa tohum ekme mevsimimizdir. Ne ekersek vakti gelince onu biçeriz. Bir gün gelecek büyük bir sesle dünyadaki tüm yaşam bir anda duracak. Ardından ikinci bir ses yankılanacak ve toprak altındaki tohumların filizlenmesi gibi bütün insanlar yeniden dirilerek ayağa kalkacak. O gün herkes, hesap vermek üzere büyük bir meydanda bir araya getirilecek. Kimsenin yaptıklarını gizleyemeyeceği o gün, insanların dünyada yaptıkları iyilik ve kötülüklerin yazıldığı kayıtlar kendilerine sunulacak. Ardından yapılanlar, ilahi adalet terazisinde tartılarak değerlendirilecek. İnanıp iyi ve güzel davranışlarda bulunanlar sonsuz mutluluk ve esenlik yurduna kavuşurken kötülükte ısrar edenler ise yaptıklarının karşılığı olan cezayla karşılaşacak.”',
        },
      ],
      ask: 'a) Metindeki ahiret hayatının aşamalarını yansıtan ifadeleri belirleyiniz. Bu ifadeleri ve karşılık geldikleri kavramları örnekteki gibi ilgili alanlara yazınız. b) Metindeki “tohum ekme mevsimi” ve “ilahi adalet terazisi” benzetmelerine karşılık gelen kavramlar arasındaki ilişkiyi açıklayınız.',
      tables: [
        {
          caption: 'a) Ahiret hayatının aşamaları',
          columns: ['Metindeki açıklama', 'Karşılık gelen kavram'],
          rows: [
            { label: '1.', fixed: ['Doğumla başlayıp ölümle biten sınırlı bir vakit', 'Ömür / Dünya hayatı'] },
            { label: '2.', fields: ['a', 'b'] },
            { label: '3.', fields: ['c', 'd'] },
            { label: '4.', fields: ['e', 'f'] },
            { label: '5.', fields: ['g', 'h'] },
            { label: '6.', fields: ['i', 'j'] },
            { label: '7.', fields: ['k', 'l'] },
          ],
        },
      ],
      tasks: [
        { id: 'a', label: 'a) 2. açıklama', rows: 1 },
        { id: 'b', label: 'a) 2. kavram', rows: 1 },
        { id: 'c', label: 'a) 3. açıklama', rows: 1 },
        { id: 'd', label: 'a) 3. kavram', rows: 1 },
        { id: 'e', label: 'a) 4. açıklama', rows: 1 },
        { id: 'f', label: 'a) 4. kavram', rows: 1 },
        { id: 'g', label: 'a) 5. açıklama', rows: 1 },
        { id: 'h', label: 'a) 5. kavram', rows: 1 },
        { id: 'i', label: 'a) 6. açıklama', rows: 1 },
        { id: 'j', label: 'a) 6. kavram', rows: 1 },
        { id: 'k', label: 'a) 7. açıklama', rows: 1 },
        { id: 'l', label: 'a) 7. kavram', rows: 1 },
        { id: 'm', label: 'b) İki benzetme arasındaki ilişki', rows: 4 },
      ],
      keyPoints: [
        '2. Dünyadaki tüm yaşamın büyük bir sesle son bulması → Kıyamet.',
        '3. İnsanların yeniden ayağa kalkması / diriltilmesi → Baas.',
        '4. İnsanların hesap vermek üzere büyük bir meydanda toplanması → Mahşer / Haşir.',
        '5. İyilik ve kötülüklerin yazıldığı kayıtlar → Amel defteri.',
        '6. Yapılanların değerlendirildiği ilahi adalet terazisi → Mizan.',
        '7. Sonsuz mutluluk ve esenlik yurdu → Cennet.',
        'b) Tohum ekme = dünya hayatı/ömür, terazi = mizan; dünyadaki davranışlarla ahiretteki karşılık arasında neden-sonuç ve sorumluluk ilişkisi vardır.',
      ],
      answer: {
        blocks: [
          {
            t: 'table',
            columns: ['Metindeki Açıklama', 'Karşılık Gelen Kavram'],
            rows: [
              ['1. Doğumla başlayıp ölümle biten sınırlı bir vakit', 'Ömür / Dünya hayatı'],
              ['2. Dünyadaki tüm yaşamın büyük bir sesle son bulması', 'Kıyamet'],
              ['3. İnsanların yeniden ayağa kalkması / diriltilmesi', 'Baas'],
              ['4. İnsanların hesap vermek üzere büyük bir meydanda toplanması', 'Mahşer / Haşir'],
              ['5. İyilik ve kötülüklerin yazıldığı kayıtlar', 'Amel defteri'],
              ['6. Yapılanların değerlendirildiği ilahi adalet terazisi', 'Mizan'],
              ['7. Sonsuz mutluluk ve esenlik yurdu', 'Cennet'],
            ],
          },
          {
            t: 'p',
            text: 'b) “Tohum ekme mevsimi” benzetmesi insanın dünya hayatını ve ömrünü ifade etmektedir. İnsan, ömrü boyunca yaptığı her davranışla adeta bir tohum eker ve bu davranışların sonuçları ahiret hayatında karşısına çıkar. “İlahi adalet terazisi” ise insanların dünyada yaptıkları iyilik ve kötülüklerin değerlendirildiği mizanı ifade eder. Bu nedenle insanın dünya hayatında yaptığı tercihler ve davranışlar ile ahiretteki değerlendirilmesi arasında neden-sonuç ilişkisi vardır. İnsan, kendisine verilen ömrü nasıl değerlendirirse ahiretteki hesabı da buna göre şekillenir. Bu durum, insanın dünya hayatındaki davranışlarından sorumlu olduğunu ve ömrünü bilinçli bir şekilde değerlendirmesi gerektiğini gösterir.',
          },
        ],
      },
    },
    {
      no: 8,
      heading: 'Dünyadaki davranışlar ve ahiretteki karşılığı',
      outcome: 'DKAB.7.1.2 · Ahiret hayatının aşamalarını çözümleyebilme',
      skill: 'KB2.4 Çözümleme',
      stem: [],
      notes: [
        {
          text: '“Onlar, Rablerinin rızasına ermek için sabreden, namazı dosdoğru kılan, kendilerine verdiğimiz rızıklardan gizli olarak ve açıktan Allah için harcayan ve kötülüğü iyilikle ortadan kaldıranlardır. İşte bunlar için dünya yurdunun iyi sonucu vardır. Bu sonuç da Adn cennetleridir. Atalarından, eşlerinden ve çocuklarından iyi olanlarla beraber oraya girerler. Melekler de her bir kapıdan yanlarına girerler (ve şöyle derler): ‘Sabretmenize karşılık selam sizlere. Dünya yurdunun sonucu (olan cennet) ne güzeldir!’”',
          source: 'Rad suresi 22-24. ayetler',
        },
        { text: '“Akıllı kişi, kendini hesaba çeken ve ölümden sonrası için çalışandır...”', source: 'Tirmizî, “Sıfatü’l-Kıyâme”, 25' },
      ],
      ask: 'Verilen ayetler ve hadisi dikkate alarak insanın dünyadaki davranışları ile ahirette göreceği karşılık arasındaki ilişkiyi açıklayınız.',
      tasks: [{ id: 'a', label: 'Yanıtın', rows: 5 }],
      keyPoints: [
        'Rad suresindeki davranışlar: sabır, namazı dosdoğru kılmak, gizli-açık Allah yolunda harcamak, kötülüğü iyilikle savmak.',
        'Hadisteki sorumluluk bilinci: kendini hesaba çekmek, ölümden sonrası için hazırlık yapmak.',
        'Bu davranışlarla Adn cennetleri/ebedî mutluluk arasında neden-sonuç ilişkisi kurulmalı.',
      ],
      answer: {
        blocks: [
          {
            t: 'p',
            text: 'Dünya hayatı ile ahiret hayatı arasında bir neden-sonuç ilişkisi vardır. Çünkü insanın ahiretteki durumu, dünyadaki inanç ve davranışlarına göre şekillenir. Rad suresinde belirtildiği gibi dünyada sabreden, namaz kılan, Allah (cc) yolunda harcayan ve kötülüğe iyilikle karşılık veren müminler, ahirette Adn cennetleriyle müjdelenmiştir. Hadis-i şerifte ise “akıllı kişi”, kendisini hesaba çeken ve ahiret hayatı için hazırlık yapan kimse olarak tanımlanmıştır. İnsan dünyada ne ekerse ahirette onu biçer; Allah’ın (cc) adaleti sayesinde hiçbir güzel eylem karşılıksız kalmaz.',
          },
        ],
      },
    },
    {
      no: 9,
      heading: 'Melek ve ahiret inancının insana kazandırdıkları',
      outcome: 'DKAB.7.1.3 · Analitik düşünebilme',
      skill: 'DAB4. Tefekkür (DAB4.4 Dinî Konularda Analitik Düşünme)',
      stem: ['Erdem ve Yusuf, melek ve ahiret inancının insan hayatına etkileri konusunda şöyle düşünmektedir:'],
      notes: [
        {
          text: 'Erdem: İnsan, yalnız kaldığında kendisini kimsenin görmediğini düşünebilir. Ancak yaptıklarının melekler tarafından kaydedildiğine inanması, böyle durumlarda vereceği kararları yeniden gözden geçirmesini sağlayabilir.',
        },
        {
          text: 'Yusuf: İnsan bazen yaptığı iyiliklerin karşılığını göremeyebilir veya haksızlığa uğrayabilir. Dünyada yapılanların ahirette karşılıksız kalmayacağına ve insanların yaptıklarından hesaba çekileceğine inanmak, böyle durumları değerlendirirken farklı düşünmesini sağlayabilir.',
        },
      ],
      ask: 'Metinden hareketle melek ve ahiret inancının insana kazandırdığı değerleri ve bunların günlük hayattaki davranışlara yansımalarını açıklayınız.',
      tasks: [{ id: 'a', label: 'Yanıtın', rows: 5 }],
      keyPoints: [
        'Melek inancı: davranışların kaydedildiği bilinci, yalnızken bile kötülükten sakınma, dürüstlük, özdenetim.',
        'Ahiret inancı: adalet duygusu, umut, sabır; iyiliklerin karşılıksız kalmayacağı bilinci.',
        'Her ikisinin günlük hayattaki davranışa yansıması örnekle gösterilmeli.',
      ],
      answer: {
        blocks: [
          {
            t: 'p',
            text: 'Melek inancı: İnsanın davranışlarını kontrol etmesine katkı sağlar. Yalnız kaldığında bile yaptıklarının kaydedildiğini bilen insan, kötülüklerden sakınmaya ve dürüst davranmaya özen gösterir.',
          },
          {
            t: 'p',
            text: 'Ahiret inancı: İnsana adalet duygusu, umut ve sabır kazandırır. Yapılan iyiliklerin karşılıksız kalmayacağını ve haksızlıkların hesabının sorulacağını bilen insan, zorluklara karşı sabreder ve iyilik yapmaya devam eder.',
          },
        ],
      },
    },
    {
      no: 10,
      heading: 'Sınav kâğıdı olayında inanç ve davranış',
      outcome: 'DKAB.7.1.3 · Analitik düşünebilme',
      skill: 'DAB4. Tefekkür (DAB4.4 Dinî Konularda Analitik Düşünme)',
      stem: [
        'Bir sınavın sonunda öğretmen, öğrencilerden kâğıtlarını sıralarının üzerine bırakmalarını ister. Öğretmen kısa süreliğine sınıftan ayrıldığında Can, Zeynep’e yanlış yazdığı bir cevabı değiştirebileceğini ve bunu kimsenin görmeyeceğini söyler. Zeynep, davranışlarının kaydedildiğine ve yaptıklarından ölümden sonra sorumlu olacağına inandığı için cevabını değiştirmez. Can, “Öğretmen görmüyorsa ne sakıncası var?” deyince Zeynep, doğru davranmanın insanların görüp görmemesine bağlı olmadığını söyler.',
      ],
      ask: 'Metinde işaret edilen inanç unsurlarını belirleyerek bu inançların insanın davranışlarına etkisini açıklayınız.',
      tasks: [{ id: 'a', label: 'İnanç unsurları ve davranışa etkisi', rows: 5 }],
      keyPoints: [
        'Metinde melek inancı (davranışların kaydedilmesi) ve ahiret inancı (sorumluluk, hesap) vurgulanır.',
        'Bu inançların etkisi: yalnızken de doğru davranma, dürüstlük, sorumluluk bilinci, yanlıştan kaçınma.',
      ],
      answer: {
        blocks: [
          {
            t: 'p',
            text: 'Metinde melek ve ahiret inancı vurgulanmaktadır. Meleklerin davranışları kaydettiğine inanmak, insanın yalnızken de davranışlarına dikkat etmesini sağlar. Ahirette yaptıklarından sorumlu olacağını bilmek ise insanın dürüst davranmasına ve yanlış davranışlardan kaçınmasına katkıda bulunur.',
          },
        ],
      },
    },
    {
      no: 11,
      heading: 'Tüccarın helallik arayışı',
      outcome: 'DKAB.7.1.3 · Analitik düşünebilme',
      skill: 'DAB4. Tefekkür (DAB4.4 Dinî Konularda Analitik Düşünme)',
      stem: [
        'Eski zamanlarda Müslüman bir tüccar, İslam’ın henüz pek bilinmediği bir liman şehrinde kumaş dükkânı açar. Bir gün kendisi dükkânda yokken çalışanı, değeri beş gümüş olan bir kumaşı müşteriye on gümüşe satarak fazla kâr elde eder. Tüccar durumu öğrenince, “Bunu nasıl yaparsın? O insanın bize hakkı geçti!” diyerek dükkânı kapatır ve çalışanıyla birlikte müşteriyi aramaya başlar. Müşteri bulunduktan sonra tüccar durumu açıklayarak fazla parayı iade eder, özür dileyip helallik ister.',
        'Tüccarın bu çabasına tanık olan komşu dükkân sahibi, şaşkınlıkla yanına gelerek şöyle der: “Müşteri farkında bile değildi, parayı kendi rızasıyla ödemişti. Üstelik alt tarafı beş gümüş için dükkânını kapatıp çarşı pazar adam aradın. Kendini bu kadar zahmete sokmaya değer miydi?”',
        'Tüccar komşusuna şu cevabı verir: “Ben bir Müslüman’ım. Bizim inancımıza göre insan tek başınayken bile onun her anını kaydeden görevliler vardır. Ayrıca her eylemin şaşmaz bir adalet terazisinde tartılacağı büyük bir hesap gününe inanırız. Bu yüzden kimse görmese de kul hakkıyla o güne çıkmaktan korkarım.”',
      ],
      ask: 'a) Tüccarın fazla parayı iade etme çabasını metinde geçen inanç unsurlarıyla ilişkilendirerek açıklayınız. b) Metinden hareketle melek ve ahiret inancının insana kazandırdığı iki ahlaki değeri yazınız ve bu değerleri metne dayanarak gerekçelendiriniz.',
      tasks: [
        { id: 'a', label: 'a) İnanç unsurlarıyla ilişkisi', rows: 4 },
        { id: 'b', label: 'b) İki ahlaki değer ve gerekçesi', rows: 4 },
      ],
      keyPoints: [
        'a) Davranışların meleklerce kaydedilmesi + ahirette hesap ve ilahi adalet terazisi; kul hakkı bilinci.',
        'b) Dürüstlük, adalet, sorumluluk, kul hakkına saygı gibi en az iki değer; her biri metindeki olayla gerekçelendirilmeli.',
      ],
      answer: {
        blocks: [
          {
            t: 'p',
            text: 'a) Tüccar, kimse kendisini görmese bile yaptığı davranışların melekler tarafından kaydedildiğine ve ahirette bütün davranışlarının değerlendirileceğine inanmaktadır. Bu nedenle müşteriden haksız yere fazla para almayı doğru bulmamış, hakkın kendisine ait olmadığını düşünerek parayı iade etmiş ve müşteriden helallik istemiştir. Böylece melek ve ahiret inancının, insanın yalnızken bile davranışlarına dikkat etmesini ve kul hakkından kaçınmasını sağladığı görülmektedir.',
          },
          {
            t: 'p',
            text: 'b) Melek ve ahiret inancı insana dürüstlük, adalet, sorumluluk ve kul hakkına saygı gibi ahlaki değerler kazandırabilir. Metindeki tüccar, kendisini kimsenin görmediği bir durumda bile fazla parayı müşteriden alıkoymamıştır. Bu inanç onun dürüst ve adil davranmasını, müşterinin hakkını gözetmesini ve haksız kazançtan kaçınmasını sağlamıştır. Böylece inanç, yalnızca kişinin düşüncesinde kalmamış, günlük hayattaki davranışına yansımıştır.',
          },
        ],
      },
    },
    {
      no: 12,
      heading: 'Ayetlerden değer çıkarma',
      outcome: 'DKAB.7.1.3 · Analitik düşünebilme',
      skill: 'DAB4. Tefekkür (DAB4.4 Dinî Konularda Analitik Düşünme)',
      stem: ['Melek veya ahiret inancıyla ilgili ayetler:'],
      notes: [
        { text: 'I. “Artık kim zerre ağırlığınca bir hayır işlerse onun mükâfatını görecektir.”', source: 'Zilzal suresi 7. ayet' },
        { text: 'II. “İnsanı önünden ve ardından takip eden melekler vardır. Allah’ın emriyle onu korurlar...”', source: 'Rad suresi 11. ayet' },
        { text: 'III. “Andolsun ki sizi biraz korku ve açlıkla, bir de mallar, canlar ve ürünlerden eksilterek deneriz. Sabredenleri müjdele.”', source: 'Bakara suresi 155. ayet' },
        { text: 'IV. “Halbuki üzerinizde muhakkak bekçiler, değerli yazıcılar vardır. Onlar yapmakta olduklarınızı bilirler.”', source: 'İnfitar suresi 10-12. ayetler' },
        { text: 'V. “Sizi boşuna yarattığımızı ve bize tekrar döndürülmeyeceğinizi mi sandınız?”', source: 'Müminun suresi 115. ayet' },
      ],
      ask: 'Bu ayetlerden hareketle melek ve ahiret inancının insana kazandırdığı temel değerleri belirleyiniz. Bu değerlerin neden ve nasıl kazanıldığını ayetlerdeki ifadelere dayanarak açıklayınız.',
      tables: [
        {
          caption: 'Ayet · Temel değer · Açıklama',
          columns: ['Temel değer', 'Açıklama'],
          rows: [
            { label: 'I.', fields: ['a', 'b'] },
            { label: 'II.', fields: ['c', 'd'] },
            { label: 'III.', fields: ['e', 'f'] },
            { label: 'IV.', fields: ['g', 'h'] },
            { label: 'V.', fields: ['i', 'j'] },
          ],
        },
      ],
      tasks: [
        { id: 'a', label: 'I. değer', short: true },
        { id: 'b', label: 'I. açıklama', rows: 2 },
        { id: 'c', label: 'II. değer', short: true },
        { id: 'd', label: 'II. açıklama', rows: 2 },
        { id: 'e', label: 'III. değer', short: true },
        { id: 'f', label: 'III. açıklama', rows: 2 },
        { id: 'g', label: 'IV. değer', short: true },
        { id: 'h', label: 'IV. açıklama', rows: 2 },
        { id: 'i', label: 'V. değer', short: true },
        { id: 'j', label: 'V. açıklama', rows: 2 },
      ],
      keyPoints: [
        'I. Adalet / iyilikseverlik: en küçük hayrın bile karşılığı görülecek.',
        'II. Güven duygusu, iç huzur: insanı koruyan melekler vardır.',
        'III. Sabır, dayanıklılık: imtihanlara sabredenler müjdelenmiştir.',
        'IV. Özdenetim: değerli yazıcılar her davranışı kaydeder.',
        'V. Sorumluluk, hayatı anlamlandırma: insan başıboş yaratılmadı, hesap verecek.',
      ],
      answer: {
        blocks: [
          {
            t: 'table',
            columns: ['Ayet', 'Temel Değer', 'Açıklama'],
            rows: [
              ['I.', 'Adalet, iyilikseverlik', 'Ayette zerre ağırlığınca yapılan en küçük bir hayrın bile mükâfatının görüleceği belirtilmektedir. Ahirette ilahi adaletin şaşmayacağına ve hiçbir güzel davranışın karşılıksız kalmayacağına inanan bir insan, küçük ya da büyük ayrımı yapmadan her zaman iyilik yapmaya yönelir.'],
              ['II.', 'Güven duygusu, iç huzur', 'Ayette insanı önünden ve arkasından takip eden, Allah’ın (cc) emriyle onu koruyan meleklerin varlığı bildirilmektedir. Yalnız olmadığını ve her an ilahi bir gözetim altında olduğunu bilen insan, hayatın tehlikeleri karşısında çaresizlik hissetmek yerine Allah’a (cc) güvenerek huzur bulur.'],
              ['III.', 'Sabır, dayanıklılık', 'Ayette insanın korku, açlık, mal ve can kaybı gibi durumlarla imtihan edileceği ve bu durumlarda sabredenlerin müjdelendiği ifade edilmektedir. Dünya hayatının geçici bir deneme yeri olduğunu ve asıl karşılığın ahirette verileceğini bilen insan, başına gelen felaket ve zorluklar karşısında isyan etmez, metanet göstererek sabreder.'],
              ['IV.', 'Özdenetim (davranışlarını kontrol etme)', 'Ayette insanın yaptığı her şeyi bilen ve kaydeden değerli yazıcı meleklerin bulunduğu belirtilmektedir. Kimsenin kendisini görmediği durumlarda bile her anının kayıt altına alındığının bilincinde olan bir birey, gizli ve açık her hâlinde dürüst davranır.'],
              ['V.', 'Sorumluluk, hayatı anlamlandırma', 'Ayette insanın başıboş ve anlamsız yere yaratılmadığı, hesaba çekilmek üzere tekrar Allah’a (cc) döndürüleceği hatırlatılmaktadır. Yaratılışın bir amacı olduğunu ve ölümden sonra yaptıklarının hesabını vereceğini kavrayan insan her anını bilinçli ve faydalı davranışlarla değerlendirmeye gayret eder.'],
            ],
          },
        ],
      },
    },
    {
      no: 13,
      heading: 'Nâs suresinin günlük hayata yansıması',
      outcome: 'DKAB.7.1.4 · Nâs suresini ve anlamını yorumlayabilme',
      skill: 'KB2.14 Yorumlama',
      stem: ['Elif, Nâs suresinin anlamını inceledikten sonra öğrenme günlüğüne şu notları yazar:'],
      notes: [
        {
          text: 'Nâs Suresinin Anlamı: “De ki: Cinlerden ve insanlardan; insanların kalplerine vesvese veren sinsi vesvesecinin kötülüğünden, insanların Rabbine, insanların Melik’ine, insanların İlah’ına sığınırım.”',
        },
        {
          text: 'Bu sureden öğrendiklerim: “Bazen dışarıdan hiçbir ses gelmese de zihnimde beni huzursuz eden düşünceler belirebiliyor. İçimdeki küçük bir şüphe ya da vesvese büyüyerek beni doğru bildiğim bir işten veya güzel bir davranıştan alıkoyabiliyor. Üstelik insan sadece kendi iç sesinden değil, çevresindeki kişilerin olumsuz yönlendirmelerinden de etkilenebiliyor. Böyle anlarda beni yaratan, her şeyin sahibi ve koruyucusu olan Allah’a (cc) sığınmanın bana güç ve iç huzuru vereceğini anladım.”',
        },
      ],
      ask: 'Metinden hareketle Nâs suresindeki mesajların günlük hayatınızda size yol gösterebileceği iki farklı durumu örneklerle açıklayınız.',
      tasks: [{ id: 'a', label: '1. durum ve örnek', rows: 3 }, { id: 'b', label: '2. durum ve örnek', rows: 3 }],
      keyPoints: [
        'Zihinden gelen olumsuz düşünceler/şüpheler karşısında Allah’a sığınmak.',
        'Çevreden gelen kötü yönlendirmeleri fark edip doğru davranışta kalmak.',
        'İki farklı durum ve bunlarla sure mesajı arasında açık ilişki kurulmalı.',
      ],
      answer: {
        blocks: [
          {
            t: 'p',
            text: '1. Durum (Olumsuz çevre ile karşılaşıldığında): Arkadaşları yanlış bir davranışa yönlendirmeye çalıştığında bu yönlendirmenin insanlardan gelebilecek bir vesvese olduğunu fark edip Allah’a (cc) sığınmak ve doğru olanı yapmak.',
          },
          {
            t: 'p',
            text: '2. Durum (Korku, kaygı ve zihinsel şüphe anlarında): Korku, kaygı veya doğru davranıştan uzaklaştıran kötü düşünceler yaşandığında; zihne gelen vesveselerden kurtulmak için Nâs suresini okuyarak Allah’a (cc) sığınmak ve güven hissetmek.',
          },
        ],
      },
    },
    {
      no: 14,
      heading: 'Nâs suresinin okunuşunda boşluk doldurma',
      outcome: 'DKAB.7.1.4 · Nâs suresini ve anlamını yorumlayabilme',
      skill: 'KB2.14 Yorumlama',
      stem: ['Verilen kelimeleri kullanarak Nâs suresinin okunuşundaki boşlukları tamamlayınız.'],
      words: ['ilâhinnâs', 'sudûrinnâs', 'birabbinnâs', 'vennâs', 'melikinnâs', 'ḫannâs'],
      lines: [
        { text: '1. Ḳul eûẕü ………', field: 'a' },
        { text: '2. ………', field: 'b' },
        { text: '3. ………', field: 'c' },
        { text: '4. Min şerril vesvâsil ………', field: 'd' },
        { text: '5. Elleẕî yüvesvisü fî ………', field: 'e' },
        { text: '6. Minel cinneti ………', field: 'f' },
      ],
      ask: 'Verilen kelimeleri kullanarak Nâs suresinin okunuşundaki boşlukları tamamlayınız.',
      tasks: [
        { id: 'a', label: '1. boşluk', short: true },
        { id: 'b', label: '2. boşluk', short: true },
        { id: 'c', label: '3. boşluk', short: true },
        { id: 'd', label: '4. boşluk', short: true },
        { id: 'e', label: '5. boşluk', short: true },
        { id: 'f', label: '6. boşluk', short: true },
      ],
      keyPoints: [
        '1: birabbinnâs · 2: Melikinnâs · 3: İlâhinnâs · 4: ḫannâs · 5: sudûrinnâs · 6: vennâs.',
      ],
      answer: {
        blocks: [
          { t: 'p', text: 'Bismillâhirraḥmânirraḥîm' },
          {
            t: 'ul',
            items: [
              '1. Ḳul eûẕü birabbinnâs',
              '2. Melikinnâs',
              '3. İlâhinnâs',
              '4. Min şerril vesvâsil ḫannâs',
              '5. Elleẕî yüvesvisü fî sudûrinnâs',
              '6. Minel cinneti vennâs',
            ],
          },
        ],
      },
    },
    {
      no: 15,
      heading: 'Cephedeki askerin mektubu ve Nâs suresi',
      outcome: 'DKAB.7.1.4 · Nâs suresini ve anlamını yorumlayabilme',
      skill: 'KB2.14 Yorumlama',
      stem: ['Millî Mücadele sırasında bir askerin annesine yazdığı mektuptan bir kesit şöyledir:'],
      notes: [
        {
          text: '“Ana, düşman uçaklarından siperlerimizin üzerine ‘Ordunuz dağıldı, artık çaresiz kaldınız, teslim olun!’ yazılı kâğıtlar atılıyor. Bazen içimizden bir ses de ‘Savaşı kaybettik, buradan kurtuluş yok!’ diye fısıldıyor. Böyle anlarda arkadaşlarımızla birlikte Nâs suresinin şu ayetlerini okuyoruz: ‘De ki: Cinlerden ve insanlardan; insanların kalplerine vesvese veren sinsi vesvesecinin kötülüğünden, insanların Rabbine, insanların Melik’ine, insanların İlah’ına sığınırım.’”',
        },
      ],
      ask: 'a) Nâs suresinin mesajından hareketle, günlük hayatta ümitsizliğe kapıldığınız bir durumda sergileyebileceğiniz tutumu bir örnekle açıklayınız. b) Nâs suresinin anlamından hareketle, surenin cephedeki askere verdiği temel mesajı anlamını değiştirmeyecek şekilde kendi cümlelerinizle özetleyiniz.',
      tasks: [{ id: 'a', label: 'a) Ümitsizlik anında tutum ve örnek', rows: 4 }, { id: 'b', label: 'b) Askere verilen temel mesaj', rows: 3 }],
      keyPoints: [
        'a) Gerçekçi bir ümitsizlik/vesvese durumu; olumsuz düşünceye teslim olmamak, Allah’a sığınmak, çabayı sürdürmek.',
        'b) Vesvese ve korkuya karşı Allah’a sığınma; Allah’ın Rab, Melik ve İlah olduğuna güvenme; ümitsizliğe kapılmama.',
      ],
      answer: {
        blocks: [
          {
            t: 'p',
            text: 'a) Bir sınavdan önce “Kesinlikle başarısız olacağım, hiçbir şeyi yapamayacağım.” diye düşünerek ümitsizliğe kapılabilirim. Böyle bir durumda bu olumsuz düşüncelere teslim olmak yerine Allah’a (cc) sığınır, çalışmaya devam eder ve elimden geleni yapmaya yönelirim. Çünkü Nâs suresi, insanı ümitsizliğe ve kötülüğe sürükleyen vesveselere karşı Allah’a (cc) sığınmayı öğretmektedir.',
          },
          {
            t: 'p',
            text: 'b) Nâs suresi askere şu mesajı vermektedir: Hem düşman uçaklarından atılan teslim olun çağrıları hem de zihninde beliren kaygı ve korkular, insanı ümitsizliğe düşürmeyi hedefleyen birer tuzaktır. İnsan en çaresiz ve zor anlarında bile korkuya ve ümitsizliğe kapılmamalıdır. Çünkü insanların gerçek sahibi, yöneticisi ve koruyucusu olan Yüce Allah vardır.',
          },
        ],
      },
    },
  ];

  window.DIN_EXAM = Object.freeze({
    id: 'dkab-7-1',
    title: '1. ünite çalışma soruları',
    subtitle: 'Melek ve ahiret inancı · Nâs suresi',
    source: 'MEB Din Öğretimi Genel Müdürlüğü · 7. sınıf DKAB açık uçlu çalışma soruları (1. ünite)',
    grade: '7. sınıf · Din Kültürü ve Ahlak Bilgisi',
    questions: QUESTIONS,
  });

  if (typeof module !== 'undefined' && module.exports) module.exports = { QUESTIONS };
})();
