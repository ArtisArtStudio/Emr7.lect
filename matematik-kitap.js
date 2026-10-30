/* Matematik — kitabın kendi akışı.
   Her hafta MEB 7. sınıf ders kitabındaki sırayı izler:
   NELER BİLİYORUZ? → BAŞLAYALIM → ÖĞRENELİM (BİLGİ KUTUSU) → DÜŞÜN-TARTIŞ-AÇIKLA →
   KATIL-UYGULA-KEŞFET → UYGULAYALIM → PROBLEM → NELER ÖĞRENDİK? → TEMA ÖLÇME → PERFORMANS GÖREVİ.
   Bağlamlar kitaptaki gerçek durumlardan uyarlanmıştır (Deringöz, Seyahat Ederken Tasarruf Et,
   Yasemin'in adımı, Zehra Teyze'nin sirke şişeleri, Anıtkabir görünümleri…). */
(() => {
  'use strict';

  /* Dördüncü argüman isteğe bağlı şekildir: her soru kendi görselini taşır. */
  const q = (prompt, hint, thinking, figure) => ({ prompt, hint: hint || '', thinking: thinking || '', ...(figure ? { figure } : {}) });
  const step = (title, body) => ({ title, body });

  const STAGE = {
    warmup: 'NELER BİLİYORUZ?',
    start: 'BAŞLAYALIM',
    learn: 'ÖĞRENELİM',
    discuss: 'DÜŞÜN-TARTIŞ-AÇIKLA',
    explore: 'KATIL-UYGULA-KEŞFET',
    problem: 'PROBLEM',
  };

  const weeks = {};

  Object.assign(weeks, {
    /* ------------------------------------------------------------------ 1 */
    1: {
      pages: '12–24',
      bookTopic: 'Tam Sayılar',
      stages: [
        {
          kind: 'warmup',
          title: 'Seyahat Ederken Tasarruf Et!',
          context: [
            'Emre ve ailesi Ankara’ya gidecek. İki seçenekleri var: otomobil ya da yüksek hızlı tren.',
            '**Otomobil:** mesafe $450$ km, benzinin litre fiyatı $58{,}50$ TL, $100$ km’de tüketilen yakıt $6$ L, otoyol ücreti $250$ TL.',
            '**Tren:** bir yolcu (ekonomi) $780$ TL; $7$–$12$ yaş arası $\\%50$, öğretmen $\\%15$, personel $\\%20$ indirim.',
          ],
          questions: [
            q('$450$ km yolda kaç litre yakıt tüketilir?',
              '$100$ km’de $6$ L tüketiliyorsa $450$ km kaç $100$ km eder?',
              '$450 \\div 100 = 4{,}5$; $4{,}5 \\cdot 6 = 27$ L.'),
            q('Otomobille gidişin toplam maliyeti kaç TL’dir?',
              'Yakıt parası ile otoyol ücretini topla.',
              '$27 \\cdot 58{,}50 = 1579{,}5$ TL yakıt; $1579{,}5 + 250 = 1829{,}5$ TL.'),
            q('Emre $11$ yaşında, annesi öğretmen, babası TCDD personeli. Trenle gidiş kaç TL tutar?',
              'İndirimler sırayla uygulanır; önce yaş indirimi.',
              'Emre: $780 \\cdot \\%50 = 390$ TL. Anne: $780 \\cdot \\%85 = 663$ TL. Baba: $780 \\cdot \\%80 = 624$ TL. Toplam $1677$ TL.'),
            q('İki seçeneği karşılaştır: aile için hangisi daha ekonomik?',
              'Bulduğun iki tutarı yan yana yaz.',
              '$1829{,}5 - 1677 = 152{,}5$ TL. Tren, aile için $152{,}5$ TL daha ekonomiktir.'),
          ],
        },
        {
          kind: 'start',
          title: 'Sıfırı nerede, hangi anlamda kullanıyoruz?',
          context: [
            'Aşağıdaki altı durumu incele. Her birinde $0$ yazılıyor ama aynı şeyi anlatmıyor: kasadaki para, hava sıcaklığı, deniz seviyesi, takvim yılı, sınav puanı ve doğum anındaki yaş.',
          ],
          questions: [
            q('Bu altı durumdan hangilerinde $0$ “hiç yok, tükendi” anlamındadır?',
              'Sayılan şey gerçekten bittiyse sıfır yokluktur.',
              'Kasadaki para $0$ TL ve sınav puanı $0$ yokluktur: para kalmamıştır, puan alınmamıştır.'),
            q('Hangilerinde $0$ yalnızca “ölçmeye buradan başlıyoruz” anlamındadır?',
              'Sıfırın altında da o durumun anlamlı olup olmadığına bak.',
              'Deniz seviyesi, hava sıcaklığı ve takvim yılı böyledir: $0$’ın altına inilebilir, yani $0$ “yokluk” değil, seçilmiş bir başlangıçtır.'),
            q('Kendi çevrenden iki örnek yaz: birinde sıfır yokluk, diğerinde başlangıç noktası olsun. Gerekçesini de yaz.',
              'Yokluk için sayılan bir şeyin bitmesi, başlangıç için ölçmenin sıfırdan başlaması gerekir.',
              'Örnek: “Sürahide su $0$ L kaldı” yokluktur; “asansör zemin katı $0$” ise başlangıç noktasıdır.'),
          ],
        },
        {
          kind: 'learn',
          title: 'Doğal sayılar, tam sayılar ve sıfırın anlamları',
          checks: [
            q('$-7$ ile $+3$ arasında kaç tam sayı vardır?',
              'Sayı doğrusunda aradaki sayıları yaz.',
              '$-6, -5, -4, -3, -2, -1, 0, 1, 2$: $9$ tam sayı.'),
            q('Sıfırın işareti var mıdır?',
              'Sıfır sayı doğrusunda nerede durur?',
              'Yoktur; sıfır ne pozitif ne negatiftir, başlangıç noktasıdır.'),
          ],
          blocks: [
            {
              heading: 'Doğal sayılar',
              paragraphs: [
                'Sayarken kullandığımız $0, 1, 2, 3, \\ldots$ sayılarına **doğal sayılar** denir. Sıfırdan başlayıp sonsuza kadar giden bu dizide hiçbir negatif sayı yoktur.',
                'Sıfırı saymadan başlarsak $1, 2, 3, \\ldots$ elde edilir; bunlara **sayma sayıları** denir. Yani sıfır doğal sayıdır ama sayma sayısı değildir: saymaya bir nesneyle başlarız, “hiç nesne” durumunu ayrıca sıfırla yazarız.',
                'Doğal sayılarla toplama ve çıkarma yapılırken bir sınır ortaya çıkar: $5 - 8$ işleminin doğal sayı sonucu yoktur. Soğukluk, borç ve derinlik gibi durumları yazabilmek için sıfırın soluna da sayı koymak gerekir.',
              ],
              figure: { type: 'sayi-kumeleri', options: {} },
            },
            {
              heading: 'Tam sayılar ve yön',
              paragraphs: [
                'Doğal sayılara negatif sayıların eklenmesiyle **tam sayılar** elde edilir: $\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots$. Pozitif tam sayılar, sıfır ve negatif tam sayılar bu kümenin parçalarıdır.',
                'Bir sayının önüne konan **$+$** işareti sıfırın sağında, **$-$** işareti sıfırın solunda olduğunu söyler. Önünde işareti yazılmayan sayı pozitiftir; ancak sıfırın işareti yoktur.',
                'ASELSAN’ın geliştirdiği otonom su altı aracı **Deringöz** deniz seviyesinin $5$ m altında çalışıyor, araştırma ekibi ise deniz yüzeyinin $5$ m üstünde. Deniz seviyesini $0$ kabul edersek Deringöz $-5$, ekip $+5$ ile gösterilir; iki değer de sahne doğrusunda işaretlidir.',
              ],
              scene: {
                type: 'sayi-dogrusu',
                params: [{ name: 'a', label: 'Sayı (a)', min: -7, max: 7, step: 1, value: -5 }],
              },
            },
            {
              heading: 'Sıfırın farklı anlamları',
              paragraphs: [
                '**1. Yokluk anlamı.** Sayılan bir şey tamamen bittiyse sıfır yokluğu anlatır: kasada $0$ TL kaldı, sepette $0$ elma var, pil bitti ($\\%0$). Burada sıfırın altına inilemez; “eksi iki elma” diye bir şey yoktur.',
                '**2. Başlangıç noktası anlamı.** Ölçmeye sıfırdan başlanıyorsa ve sıfırın altındaki değerler de anlamlıysa sıfır bir başlangıç noktasıdır: hava sıcaklığı $0\\,^{\\circ}\\mathrm{C}$ (altında $-5\\,^{\\circ}\\mathrm{C}$ olabilir), deniz seviyesi $0$ m (altında derinlik vardır), takvimde yıl $0$ (öncesi de vardır).',
                '**3. Seçilmiş başlangıç.** Bazen sıfırı biz seçeriz: bir apartmanın zemin katı $0$, bir ülkenin başkenti “$0$ km” noktası, bir maçın başlangıç dakikası. Bu sıfır evrensel değil, anlaşmayla belirlenmiş bir başlangıçtır.',
                '**Gruplama.** Doğal başlangıcı olan büyüklükler: uzunluk, kütle, alan, hacim, para miktarı, geçen süre. Doğal başlangıcı olmayan, sıfırı seçilmiş büyüklükler: sıcaklık (santigrat ölçeğinde), takvim yılı, deniz seviyesine göre yükseklik, bir yerleşimin başlangıç noktasına göre uzaklık.',
                'Bu yüzden “$0$ derece” ile “$0$ TL” aynı şeyi anlatmaz: birincisinde hava soğuktur ama sıcaklık vardır, ikincisinde para gerçekten yoktur.',
              ],
            },
            {
              heading: 'Sayı doğrusu ve sıralama',
              paragraphs: [
                'Sayı doğrusunda sıfır tam ortada, başlangıç noktası olarak durur. Sağa gidildikçe sayılar büyür, sola gidildikçe küçülür; bu yüzden $-7 < -3$’tür ve ikisi de sıfırın solundadır.',
                'İki sayıyı karşılaştırırken yalnızca sıfıra uzaklıklarına bakmak yetmez: $-7$ sıfıra daha uzaktır ama daha küçüktür. Soldaki her zaman daha küçüktür.',
              ],
              scene: {
                type: 'iki-sayi',
                params: [
                  { name: 'a', label: '1. sayı (a)', min: -7, max: 7, step: 1, value: -7 },
                  { name: 'b', label: '2. sayı (b)', min: -7, max: 7, step: 1, value: -3 },
                ],
              },
            },
            {
              heading: 'Gerçek yaşamda okuma',
              paragraphs: [
                'Ocak ayında bazı illerin beklenen en yüksek sıcaklıkları: Kars $-9\\,^{\\circ}\\mathrm{C}$, Hakkâri $-4\\,^{\\circ}\\mathrm{C}$, Ankara $0\\,^{\\circ}\\mathrm{C}$, Afyon $+4\\,^{\\circ}\\mathrm{C}$, Antalya $+12\\,^{\\circ}\\mathrm{C}$.',
                'En soğuk il Kars’tır çünkü $-9$ en küçük sayıdır. Bina katlarında zemin kat $0$, otopark negatif, üst katlar pozitiftir. Banka bakiyesinde borç negatif, alacak pozitiftir.',
                'Dalgıçlar ve madenciler için derinlik negatif sayıyla izlenir; deniz seviyesinden aşağı indikçe basınç artar, bu yüzden güvenli dalış sınırları vardır.',
              ],
            },
          ],
          boxes: [
            { title: 'Doğal sayılar', body: 'Sayarken kullandığımız 0, 1, 2, 3, … sayıları. Sıfır doğal sayıdır ama sayma sayısı değildir.' },
            { title: 'Tam sayılar', body: 'Pozitif tam sayılar, sıfır ve negatif tam sayıların birleşimi: …, −3, −2, −1, 0, 1, 2, 3, …' },
            { title: 'Sıfırın anlamları', body: '**Yokluk:** $0$ TL, $0$ elma (altına inilemez). **Başlangıç noktası:** $0$ °C, deniz seviyesi $0$ m (altına inilebilir). **Seçilmiş başlangıç:** zemin kat $0$, başkent “$0$ km”. **Gruplama:** uzunluk, kütle, süre ve paranın doğal başlangıcı vardır; sıcaklık, deniz seviyesi ve takvim yılının yoktur.' },
            { title: 'İşaret', body: 'Sıfırın sağındaki sayılar pozitif (+), solundaki sayılar negatiftir (−). Sıfırın işareti yoktur.' },
            { title: 'Sıralama', body: 'Sayı doğrusunda soldaki sayı küçük, sağdaki sayı büyüktür: −9 < −4 < 0 < 4 < 12.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Sıfırın anlamı ve sayı doğrusu',
          items: [
            q('Bir çekirge sayı doğrusunda $-5$ noktasından başlayıp eşit uzunlukta $6$ sıçrayışla $+7$ noktasına ulaşıyor. Her sıçrayış kaç birimdir?',
              'İki nokta arasındaki uzaklığı sıçrayış sayısına böl.',
              '$-5$ ile $+7$ arası $12$ birimdir; $12 \\div 6 = 2$ birim her sıçrayış.'),
            Object.assign(q('Zemin kat $0$ kabul edilen bir apartmanda otopark $2$ kat altta, sığınak otoparkın $1$ kat üstünde. Sığınak kaçıncı kattadır?',
              'Otopark $-2$ ise bir kat üstü hangi sayıdır? Sığınak kutusunu sürükleyip deneyebilirsin.',
              'Otopark $-2$, sığınak $-2 + 1 = -1$ (yani $1$ kat bodrum).'),
            { scene: { type: 'kat-yerlestir', params: [{ name: 'kat', label: 'Sığınağın katı', min: -4, max: 3, step: 1, value: 1 }] } }),
            q('“$-9$, $-4$’ten küçüktür.” Bu cümleyi sayı doğrusunu kullanmadan nasıl açıklarsın?',
              'Sıfıra uzaklığı düşün: hangisi sıfırdan daha uzak?',
              '$-9$ sıfırdan $9$ birim, $-4$ ise $4$ birim uzaktır. Negatif sayıda uzaklık büyüdükçe değer küçülür, yani $-9 < -4$.'),
          ],
        },
        {
          kind: 'explore',
          title: 'Toplayarak sıfıra ulaşılır mı?',
          materials: 'Aşağıdaki toplama sahnesi, kalem, kâğıt',
          intro: [
            'Üç kart seçiyorsun; her kartta $-5$ ile $+5$ arasında bir sayı var. Kartları sırayla sayı doğrusunda yürüyerek topluyorsun. Sıfırda başlıyorsun.',
          ],
          steps: [
            q('Sahnedeki üç kartla toplam kaç oluyor? Sayı doğrusunda hangi noktada duruyorsun?',
              'Kartları sırayla ekle; her adımda kaldığın noktayı yaz.',
              '$3 + (-3) + 2 = 2$; sayı doğrusunda $+2$ noktasında durulur.'),
            q('Toplamı sıfır yapmak için üçüncü kartı kaç yapmalısın?',
              'İlk iki kartın toplamı sıfırsa üçüncü kart da sıfır olmalı.',
              'İlk iki kart $3 + (-3) = 0$ olduğu için üçüncü kart $0$ olmalı; yoksa toplam sıfırdan farklı olur.'),
            q('Hiç negatif kart olmadan toplam sıfır olabilir mi? Neden?',
              'Pozitif sayıların toplamı hangi işareti verir?',
              'Olamaz; pozitif sayıların toplamı pozitiftir. Sıfıra ulaşmak için her pozitif karta karşılık ters işaretli bir kart gerekir.'),
          ],
          scene: {
            type: 'sifir-toplama',
            params: [
              { name: 's1', label: '1. kart', min: -5, max: 5, step: 1, value: 3 },
              { name: 's2', label: '2. kart', min: -5, max: 5, step: 1, value: -3 },
              { name: 's3', label: '3. kart', min: -5, max: 5, step: 1, value: 2 },
            ],
          },
        },
        {
          kind: 'practice',
          title: 'Uygulayalım: sayı doğrusu ve sıralama',
          intro: [
            'Uygulayalım: aşağıdaki alıştırmaları defterinde çöz, sonra cevabını ve gerekçeni yaz.',
          ],
          questions: [
            q('$-8, 3, 0, -2$ sayılarını küçükten büyüğe sırala.',
              'Sayı doğrusunda solda olan daha küçüktür.',
              '$-8 < -2 < 0 < 3$.'),
            q('$+5$ sayısının ters (zıt) sayısı kaçtır? Sayı doğrusunda ikisi arasındaki uzaklık kaç birimdir?',
              'Ters sayı, sıfıra göre simetriktir.',
              'Ters sayı $-5$; aralarındaki uzaklık $10$ birim.'),
            q('Deniz seviyesinden $250$ m yükseklik $+250$, $80$ m derinlik $-80$ ile gösteriliyor. $+250$ ile $-80$ arasındaki fark kaç metredir?',
              'Yükseklik ve derinlik zıt yönlerde ölçülür.',
              '$250 - (-80) = 330$ m.'),
          ],
        },
        {
          kind: 'problem',
          title: 'Apartmanın katları',
          context: [
            'Zemin katın $0$ kabul edildiği bir apartmanda: otopark zeminin $2$ kat altındadır; sığınağın $3$ kat üstünde Asya oturur; Demir’in $3$ kat altında Elif oturur; otoparkın $1$ kat üstünde sığınak vardır; Asya’nın $2$ kat üstünde Demir, Elif’in $4$ kat üstünde boş bir daire vardır.',
          ],
          steps: [
            step('Anla', 'Her kişi ve yer için zemin kata göre yön belirleyeceğiz; aşağı negatif, yukarı pozitif.'),
            step('Planla', 'Otoparktan başla, verilenleri sırayla uygula.'),
            step('Çöz', 'Otopark $-2$ → sığınak $-2 + 1 = -1$ → Asya $-1 + 3 = +2$ → Demir $2 + 2 = +4$ → Elif $4 - 3 = +1$ → boş daire $1 + 4 = +5$.'),
            step('Kontrol', 'Otoparktan ($-2$) boş daireye ($+5$) kaç kat çıkılır? $5 - (-2) = 7$ kat.'),
          ],
          result: 'Otopark $-2$, sığınak $-1$, Elif $+1$, Asya $+2$, Demir $+4$, boş daire $+5$; otoparktan boş daireye $7$ kat çıkılır.',
        },
      ],
    },

    /* ------------------------------------------------------------------ 2 */
    2: {
      pages: '25–40',
      bookTopic: 'Rasyonel Sayılar · Mutlak Değer',
      stages: [
        {
          kind: 'warmup',
          title: 'Aradaki Sayılar',
          context: [
            'Yasemin, $0$ ile $1$ arasındaki mesafeyi eşit adımlarla yürüyor. Ardışık tam sayılar arası $1$ metre kabul ediliyor.',
          ],
          questions: [
            q('Yasemin’in bir adımı bir tam sayıya karşılık gelir mi? Neden?',
              '$0$ ile $1$ arasında başka tam sayı var mı?',
              'Gelmez. $0$ ile $1$ arasında tam sayı yoktur; adım uzunluğu $0$ ile $1$ arasında bir rasyonel sayıdır.'),
            q('Aynı mesafeyi $4$ eşit adımda yürürse bir adımı kaç metre olur?',
              'Bütün mesafe $1$ m ise $4$ eşit parçaya böl.',
              '$1 \\div 4 = \\frac{1}{4}$ m.'),
            q('Yasemin’in adımı $\\frac{3}{8}$ m ise $3$ adımda kaç metre yol alır?',
              'Bir adımı $3$ ile çarp.',
              '$3 \\cdot \\frac{3}{8} = \\frac{9}{8} = 1\\frac{1}{8}$ m.'),
          ],
        },
        {
          kind: 'start',
          title: 'Su Sayaçları',
          context: [
            'Bir “Su İzleme Etkinliği”nde üç öğrenciye eşit su kullanım hakkı tanımlanıyor. Hafta sonunda: Beyza’nın göstergesinde $6$ eş bölmeden $3$’ü, Yağmur’un $4$ bölmeden $2$’si, Berat’ın $2$ bölmeden $1$’i dolu.',
          ],
          questions: [
            q('Üç öğrencinin tükettiği su miktarını kesirle yaz.',
              'Dolu bölme sayısını toplam bölme sayısına böl.',
              'Beyza $\\frac{3}{6}$, Yağmur $\\frac{2}{4}$, Berat $\\frac{1}{2}$.'),
            q('Bu kesirler aynı büyüklüğü mü gösterir? Nasıl anlarsın?',
              'Hepsini sadeleştir.',
              '$\\frac{3}{6} = \\frac{2}{4} = \\frac{1}{2}$; üç öğrenci de aynı miktarda su tüketmiştir.'),
          ],
        },
        {
          kind: 'learn',
          title: 'Rasyonel sayılar ve mutlak değer',
          checks: [
            q('$\\left|-\\frac{3}{4}\\right|$ kaçtır?',
              'Mutlak değer uzaklıktır.',
              '$\\frac{3}{4}$; uzaklık her zaman pozitiftir.'),
            q('$-\\frac{2}{5}$ ile $\\frac{1}{3}$ arasında hangisi büyüktür?',
              'Paydaları eşitleyip karşılaştır.',
              '$\\frac{1}{3}$ büyüktür; $-\\frac{6}{15} < \\frac{5}{15}$.'),
          ],
          blocks: [
            {
              heading: 'Rasyonel sayı nedir?',
              paragraphs: [
                '$a$ bir tam sayı, $b$ sıfırdan farklı bir tam sayı olmak üzere $\\frac{a}{b}$ biçiminde yazılabilen sayılara **rasyonel sayı** denir.',
                'Paydası sıfır olamaz. $\\frac{8}{0}$ ifadesi tanımsızdır: “$0$ ile hangi sayı çarpılırsa $8$ olur?” sorusunun cevabı yoktur.',
                'Sıfırdan büyük rasyonel sayılar pozitif, sıfırdan küçükler negatiftir. Paydası $1$ olan rasyonel sayılar tam sayıdır: $\\frac{5}{1} = 5$.',
              ],
              figure: { type: 'pay-payda', options: { num: 3, den: 4, mark: 'all' } },
            },
            {
              heading: 'Denk kesirler ve en sade hâl',
              paragraphs: [
                '$\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6} = \\frac{4}{8}$: payı ve paydayı aynı sayıyla çarpmak değeri değiştirmez. Bu kesirler **denk kesirlerdir** ve sayı doğrusunda aynı noktaya karşılık gelir.',
                'Pay ile payda aralarında asal olana kadar bölünerek kesrin **en sade hâli** bulunur: $\\frac{12}{18} = \\frac{2}{3}$.',
              ],
            },
            {
              heading: 'Sayı doğrusunda gösterme',
              paragraphs: [
                'Önce işaret belirlenir; sonra sayının hangi iki ardışık tam sayı arasında olduğu bulunur. Ardışık tam sayılar arası payda kadar eş parçaya ayrılır ve tam kısımdan başlanarak pay kadar ilerlenir.',
                'Örnek: $-\\frac{13}{5}$. $-\\frac{13}{5} = -2\\frac{3}{5}$, yani $-3$ ile $-2$ arasında; aralık $5$ parçaya bölünür, $-2$’den $3$ parça sola gidilir.',
              ],
              scene: {
                type: 'kesir-dogru',
                params: [
                  { name: 'tam', label: 'Tam kısım', min: -3, max: 3, step: 1, value: -2 },
                  { name: 'pay', label: 'Pay', min: 0, max: 9, step: 1, value: 3 },
                  { name: 'payda', label: 'Payda', min: 2, max: 8, step: 1, value: 5 },
                ],
              },
            },
            {
              heading: 'Mutlak değer: sıfıra uzaklık',
              paragraphs: [
                'Bir sayının mutlak değeri, sayı doğrusunda sıfıra olan uzaklığıdır. Uzaklık negatif olamaz: $|-9| = 9$, $|9| = 9$, $|0| = 0$.',
                'Ters işaretli iki sayının mutlak değeri eşittir: $|-a| = |a|$. $|x| = 9$ denkleminin iki çözümü vardır: $x = 9$ ve $x = -9$.',
                'Nerede kullanılır? Hedeften sapma, borsadaki günlük değişim, sıcaklık farkı gibi “ne kadar” sorusunun cevabı mutlak değerdir.',
              ],
            },
          ],
          boxes: [
            { title: 'Rasyonel sayı', body: '$\\frac{a}{b}$, $b \\ne 0$. Payda sıfır olamaz; $\\frac{8}{0}$ tanımsızdır.' },
            { title: 'Eksi işaretinin yeri', body: '$\\frac{-9}{3} = \\frac{9}{-3} = -\\frac{9}{3} = -3$: işaret payda da payda da olabilir, kesrin önünde de yazılabilir.' },
            { title: 'Mutlak değer', body: '|a|, a’nın sıfıra uzaklığıdır; |a| ≥ 0 ve |-a| = |a|.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Mutlak değer neyi ölçer?',
          items: [
            q('$\\frac{8}{0}$ neden tanımsızdır? Bölmenin anlamını kullanarak açıkla.',
              'Bölme, “çarpma ile geri alma”dır: $\\frac{8}{0} = x$ ise $0 \\cdot x = 8$ olmalı.',
              '$0$ ile çarpılan her sayının sonucu $0$’dır; $8$ elde edilemez. Bu yüzden ifade tanımsızdır.'),
            q('Bir sayı doğrusunda $0$ noktasına dik bir ayna var. $2$ noktasındaki salyangozun görüntüsü hangi sayıda oluşur?',
              'Ayna sıfırda ise görüntü sıfıra göre simetriktir.',
              '$-2$ noktasında. Uzaklık korunur, yön ters döner.'),
            q('$|x| = 9$ eşitliğini sağlayan kaç tam sayı vardır?',
              'Sıfıra uzaklığı $9$ olan kaç nokta var?',
              'İki tanedir: $9$ ve $-9$.'),
          ],
        },
        {
          kind: 'explore',
          title: 'Eksi işareti nereye yazılmalı?',
          materials: 'Hesap makinesi, kalem',
          intro: [
            'Defterinde aynı sayının üç farklı yazımı var: $\\frac{-9}{3}$, $\\frac{9}{-3}$ ve $-\\frac{9}{3}$. Hangisinin doğru olduğunu düşünüyorsun?',
          ],
          steps: [
            q('Üç yazımın benzerliği ve farkı nedir?',
              'Her birini hesapla.',
              'Üçü de $-3$’tür; farkları yalnızca eksi işaretinin yeridir.'),
            q('$\\frac{-8}{4}$, $\\frac{8}{-4}$ ve $-\\frac{8}{4}$ ifadelerinin değerleri kaçtır?',
              'Bölmeyi yap, işareti ayrı düşün.',
              'Üçü de $-2$’dir.'),
            q('Bir kesrin değerini değiştirmeden eksi işaretini kaç farklı yere yazabilirsin?',
              'Pay, payda ve kesir çizgisinin önü.',
              'Üç yer: pay, payda veya kesrin önü. İkisinde birden yazılırsa işaret pozitif olur.'),
          ],
          scene: {
            type: 'kesir-isaret',
            params: [
              { name: 'pay', label: 'Pay', min: 1, max: 9, step: 1, value: 8 },
              { name: 'payda', label: 'Payda', min: 2, max: 9, step: 1, value: 4 },
              { name: 'yer', label: 'Eksi işaretinin yeri', min: 0, max: 2, step: 1, value: 0 },
            ],
          },
        },
        {
          kind: 'practice',
          title: 'Uygulayalım: rasyonel sayı ve mutlak değer',
          intro: [
            'Uygulayalım: aşağıdaki alıştırmaları defterinde çöz, sonra cevabını ve gerekçeni yaz.',
          ],
          questions: [
            Object.assign(q('$-\\frac{3}{5}$, $\\frac{2}{5}$ ve $0$ sayılarını sayı doğrusunda göster; mutlak değerlerini yaz.',
            'Mutlak değer sıfıra uzaklıktır. İşareti sürükleyerek önce $-\\frac{3}{5}$, sonra $\\frac{2}{5}$ noktasına götür.',
              '$\\left|-\\frac{3}{5}\\right| = \\frac{3}{5}$, $\\left|\\frac{2}{5}\\right| = \\frac{2}{5}$, $|0| = 0$.'),
            {
              scene: {
                type: 'kesir-dogru',
                params: [
                  { name: 'tam', label: 'Tam kısım', min: -3, max: 3, step: 1, value: 0 },
                  { name: 'pay', label: 'Pay', min: 0, max: 9, step: 1, value: 0 },
                  { name: 'payda', label: 'Payda', min: 2, max: 8, step: 1, value: 5 },
                ],
              },
            }),
            q('$|x| = 6$ eşitliğini sağlayan $x$ değerleri hangileridir?',
              'Sıfıra uzaklığı $6$ olan iki nokta vardır.',
              '$x = 6$ veya $x = -6$.'),
            Object.assign(q('$-\\frac{7}{4}$ sayısını sayı doğrusunda göster: hangi iki tam sayı arasında kalır?',
              'Kesri tam sayılı kesre çevir, sonra işareti sürükle.',
              '$-\\frac{7}{4} = -1\\frac{3}{4}$, yani $-2$ ile $-1$ arasında.'),
            {
              scene: {
                type: 'kesir-dogru',
                params: [
                  { name: 'tam', label: 'Tam kısım', min: -3, max: 3, step: 1, value: -1 },
                  { name: 'pay', label: 'Pay', min: 0, max: 9, step: 1, value: 3 },
                  { name: 'payda', label: 'Payda', min: 2, max: 8, step: 1, value: 4 },
                ],
              },
            }),
          ],
        },
        {
          kind: 'problem',
          title: 'Alışveriş merkezinde katlar',
          context: [
            'Bir alışveriş merkezinin zemin katı $0$ kabul ediliyor. Otopark $3$ kat altta, sinema $4$ kat üstte, yemek alanı $2$ kat üsttedir. Bir kişi otoparktan sinemaya çıkıyor.',
          ],
          steps: [
            step('Anla', 'Otopark $-3$, sinema $+4$.'),
            step('Planla', 'İki konum arasındaki farkı bulmak için çıkarma yap.'),
            step('Çöz', '$4 - (-3) = 4 + 3 = 7$ kat.'),
            step('Kontrol', '$-3$’ten $0$’a $3$ kat, $0$’dan $4$’e $4$ kat: toplam $7$ kat.'),
          ],
          result: 'Otopark $-3$, sinema $+4$; arada $7$ kat vardır.',
        },
      ],
      performance: {
        title: 'Sıfırın farklı anlamları',
        context: [
          'Sıfırın günlük hayatta hangi farklı anlamlarda kullanıldığını araştır ve bir poster hazırla.',
        ],
        tasks: [
          'En az beş farklı kullanım bul (ölçme, yokluk, başlangıç, skor, sıcaklık…).',
          'Her kullanım için “sıfır burada ne anlatıyor?” sorusunu bir cümleyle yanıtla.',
          'Doğal başlangıç noktası olan ve olmayan büyüklükleri iki gruba ayır.',
          'Posterde en az bir sayı doğrusu ve bir tablo kullan.',
        ],
        criteria: [
          'Beş farklı anlamın doğru sınıflandırılması',
          'Doğal başlangıç noktası açıklaması',
          'Görsel düzen ve okunabilirlik',
        ],
      },
    },

    /* ------------------------------------------------------------------ 3 */
    3: {
      pages: '41–61',
      bookTopic: 'Farklı Temsiller · Karşılaştırma ve Sıralama',
      stages: [
        {
          kind: 'warmup',
          title: 'Market rafındaki sayılar',
          context: [
            'Ürün etiketlerinde kesirli değerler var: kutu süt $\\frac{1}{5}$ L, kurşun kalem $\\frac{92}{15}$ g, madenî para kalınlığı $\\frac{1}{4}$ cm, el sabunu $\\frac{185}{2}$ g, küçük su şişesi $\\frac{1}{3}$ L.',
          ],
          questions: [
            q('$\\frac{1}{5}$ L kaç litredir? Ondalık olarak yaz.',
              'Payı paydaya böl.',
              '$1 \\div 5 = 0{,}2$ L.',
              { type: 'birim-merdiven', options: {  } }),
            q('$\\frac{1}{3}$ L neden $0{,}3$ L değildir?',
              '$1 \\div 3$ bölmesinde kalan bitiyor mu?',
              '$1 \\div 3 = 0{,}333\\ldots$; devirli ondalık gösterimdir, $0{,}3$ ile eşit değildir.'),
            q('$\\frac{92}{15}$ g kaç gramdır?',
              '$92 \\div 15$ işlemini yap.',
              '$92 \\div 15 = 6{,}1333\\ldots$ g; devirli ondalık gösterim.'),
          ],
        },
        {
          kind: 'start',
          title: '0,999… sayısı 1’e eşit mi?',
          context: [
            'Bir tartışma sorusu: $0{,}9999\\ldots$ (dokuzlar sonsuza kadar devam ediyor) sayısı $1$’e eşit midir, yoksa $1$’den küçük müdür? İki arkadaşın farklı cevapları var.',
          ],
          questions: [
            q('Sen hangi görüşe katılıyorsun? Gerekçeni yaz.',
              '$\\frac{1}{3} = 0{,}333\\ldots$ eşitliğini $3$ ile çarpmayı dene.',
              '$\\frac{1}{3} = 0{,}333\\ldots$ ise $3 \\cdot \\frac{1}{3} = 0{,}999\\ldots$ olur. Sol taraf $1$ olduğu için $0{,}999\\ldots = 1$’dir.'),
            q('$0{,}999\\ldots$ sayısını $\\frac{a}{b}$ biçiminde yaz.',
              'Devirli ondalığı kesre çevirme kuralını kullan.',
              '$x = 0{,}999\\ldots$ ise $10x = 9{,}999\\ldots$; çıkarınca $9x = 9$, yani $x = 1$.'),
          ],
        },
        {
          kind: 'learn',
          title: 'Ondalık gösterim, karşılaştırma ve sıralama',
          checks: [
            q('$0{,}7$ ile $0{,}68$ arasında hangisi büyüktür?',
              'Ondalık kısımları aynı basamağa tamamla.',
              '$0{,}70 > 0{,}68$ olduğu için $0{,}7$ büyüktür.'),
            q('$\\frac{3}{8}$ ondalık gösterimi kaçtır?',
              'Payı paydaya böl.',
              '$0{,}375$.'),
          ],
          blocks: [
            {
              heading: 'Sonlu ve devirli ondalık',
              paragraphs: [
                'Bir rasyonel sayı en sade hâlde yazıldığında paydasında yalnızca $2$ ve $5$ asal çarpanları varsa **sonlu ondalık** gösterimi vardır: $\\frac{3}{4} = 0{,}75$.',
                'Paydasında $2$ veya $5$ dışında asal çarpan varsa gösterim **devirlidir**: $\\frac{1}{3} = 0{,}\\overline{3}$, $\\frac{5}{11} = 0{,}\\overline{45}$.',
                'Her rasyonel sayının mutlaka bir ondalık gösterimi vardır; ancak her ondalık gösterim rasyonel değildir ($\\sqrt{2}$ gibi).',
              ],
            },
            {
              heading: 'Devirli ondalığı kesre çevirme',
              paragraphs: [
                'Paya virgülden sonraki tüm sayı yazılır, devretmeyen kısım çıkarılır. Paydaya devreden basamak sayısı kadar $9$, devretmeyen basamak sayısı kadar $0$ yazılır.',
                'Örnek: $0{,}\\overline{36} = \\frac{36}{99} = \\frac{4}{11}$; $2{,}0\\overline{2} = \\frac{202 - 20}{90} = \\frac{182}{90}$.',
              ],
            },
            {
              heading: 'Karşılaştırma stratejileri',
              paragraphs: [
                'Rasyonel sayılar karşılaştırılırken şu yollar kullanılır: sayı doğrusundaki yer, paydaları eşitleme, ondalık gösterime çevirme, $0$’a ve $\\frac{1}{2}$’ye yakınlık.',
                'Negatif sayılarda dikkat: $\\left|-0{,}75\\right| > \\left|-0{,}5\\right|$ olduğu için $-0{,}75 < -0{,}5$. Sayı doğrusunda daha soldaki daha küçüktür.',
                'Herhangi iki rasyonel sayı arasında en az bir rasyonel sayı vardır: $\\frac{1}{3}$ ile $\\frac{3}{4}$ arasında $\\frac{13}{24}$ bulunur (paydalar $24$’te eşitlenir).',
              ],
              figure: { type: 'sayi-dogrusu', options: { from: -3, to: 3, mark: -1 } },
            },
          ],
          boxes: [
            { title: 'Sonlu ondalık', body: 'En sade hâlde paydasında yalnızca 2 ve 5 çarpanı bulunan kesirler sonlu ondalıktır.' },
            { title: 'Devirli ondalık', body: 'Paydasında 2 ve 5 dışında asal çarpan olan kesirler devirli ondalık gösterimle yazılır.' },
            { title: 'İki sayı arasında', body: 'a < b ise a ile b arasında her zaman bir rasyonel sayı vardır: (a + b) / 2.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Kesirleri karşılaştırma',
          items: [
            q('$\\frac{3}{8}$ ile $0{,}4$ sayılarından hangisi büyüktür?',
              'Birini diğerinin türüne çevir.',
              '$\\frac{3}{8} = 0{,}375 < 0{,}4$; yani $0{,}4$ büyüktür.'),
            q('$-0{,}75$, $-0{,}6$, $-0{,}5$ sayılarını küçükten büyüğe sırala.',
              'Hepsini yüzdeye çevir: $-75\\%$, $-60\\%$, $-50\\%$.',
              '$-0{,}75 < -0{,}6 < -0{,}5$.'),
            q('$-1$ ile $0$ arasında kaç rasyonel sayı vardır?',
              'İki sayı arasında her zaman başka bir sayı bulunabilir mi?',
              'Sonsuz sayıda. Örneğin $-\\frac{1}{2}$, $-\\frac{1}{4}$, $-\\frac{3}{4}$… her seferinde yeni bir orta nokta bulunur.'),
          ],
        },
        {
          kind: 'explore',
          title: 'Gezegenlerin yüzey sıcaklıkları',
          materials: 'Sayı doğrusu, renkli kalemler',
          intro: [
            'Güneş sistemindeki gezegenlerin yüzey sıcaklıkları veriliyor. Negatif sıcaklıklar da var; hepsini aynı sayı doğrusuna yerleştireceğiz.',
          ],
          steps: [
            q('Negatif sıcaklıkta “daha soğuk” hangi yöndedir?',
              'Sıfırın soluna bak.',
              'Sıfırın soluna gidildikçe sayı küçülür, yani hava soğur.'),
            q('$-120\\,^{\\circ}\\mathrm{C}$ ile $-60\\,^{\\circ}\\mathrm{C}$ arasındaki fark kaç derecedir?',
              'Büyükten küçüğü çıkar.',
              '$-60 - (-120) = 60\\,^{\\circ}\\mathrm{C}$.'),
            q('Sıcaklığı $+15\\,^{\\circ}\\mathrm{C}$ olan bir gezegen ile sıcaklığı $-120\\,^{\\circ}\\mathrm{C}$ olan bir gezegen arasındaki fark kaç derecedir?',
              'İkisinin farkını mutlak değerle düşün.',
              '$15 - (-120) = 135\\,^{\\circ}\\mathrm{C}$.'),
          ],
          scene: {
            type: 'sicaklik',
            params: [
              { name: 't1', label: 'A gezegeni (°C)', min: -150, max: 0, step: 10, value: -120 },
              { name: 't2', label: 'B gezegeni (°C)', min: -150, max: 0, step: 10, value: -60 },
              { name: 't3', label: 'C gezegeni (°C)', min: 0, max: 50, step: 5, value: 15 },
            ],
          },
        },
        {
          kind: 'practice',
          title: 'Uygulayalım: ondalık gösterim ve sıralama',
          intro: [
            'Uygulayalım: aşağıdaki alıştırmaları defterinde çöz, sonra cevabını ve gerekçeni yaz.',
          ],
          questions: [
            q('$\\frac{7}{8}$, $0{,}85$ ve $\\frac{4}{5}$ sayılarını büyükten küçüğe sırala.',
              'Hepsini ondalık gösterime çevir.',
              '$\\frac{7}{8} = 0{,}875$, $\\frac{4}{5} = 0{,}8$; sıralama $0{,}875 > 0{,}85 > 0{,}8$.'),
            q('$0{,}4\\overline{5}$ devirli ondalık sayısını rasyonel sayı olarak yaz.',
              'Paya tüm sayı eksi devretmeyen kısım, paydaya devreden kadar $9$ yazılır.',
              '$\\frac{45 - 4}{90} = \\frac{41}{90}$.'),
            q('$2{,}7$ ile $2{,}70$ aynı sayı mıdır? Açıkla.',
              'Sondaki sıfırın değeri var mı?',
              'Aynıdır; ondalık kısımdaki son sıfır sayının değerini değiştirmez.'),
          ],
        },
        {
          kind: 'problem',
          title: 'Serbest atış yarışması',
          context: [
            'Bir basketbol takımında üç öğrenci serbest atış çalışıyor. Birincisi atışlarının $\\frac{7}{10}$’unu, ikincisi $\\frac{11}{15}$’ini, üçüncüsü $\\frac{3}{5}$’ini sayıya çeviriyor.',
          ],
          steps: [
            step('Anla', 'Üç kesri karşılaştırmamız gerekiyor; paydalar farklı.'),
            step('Planla', 'Paydaları EKOK olan $30$’da eşitle.'),
            step('Çöz', '$\\frac{7}{10} = \\frac{21}{30}$, $\\frac{11}{15} = \\frac{22}{30}$, $\\frac{3}{5} = \\frac{18}{30}$. Sıralama: $\\frac{3}{5} < \\frac{7}{10} < \\frac{11}{15}$.'),
            step('Kontrol', 'Ondalık karşılıkları: $0{,}6 < 0{,}700 < 0{,}733$; sıralama doğru.'),
          ],
          result: 'En başarılı öğrenci ikincisidir; başarı sırası $\\frac{3}{5} < \\frac{7}{10} < \\frac{11}{15}$.',
        },
      ],
    },

    /* ------------------------------------------------------------------ 4 */
    4: {
      pages: '62–75',
      bookTopic: 'Tam Sayılarla İşlemler ve Problem Çözme',
      stages: [
        {
          kind: 'warmup',
          title: 'Enerji giderlerindeki değişim',
          context: [
            'Gençtürk ailesi enerji giderlerini karşılaştırıyor. Bir ay önceki fatura $640$ TL, bu ay $580$ TL. Ayrıca ek bir ısıtıcı aldıkları bir haftada fatura $75$ TL artıyor.',
          ],
          questions: [
            q('Bu ayın giderindeki değişimi tam sayıyla ifade et.',
              'Yeni tutardan eski tutarı çıkar.',
              '$580 - 640 = -60$ TL (tasarruf, yani $60$ TL azalma).'),
            q('Ek ısıtıcının kullanıldığı haftadaki değişimi tam sayıyla yaz.',
              'Artış pozitif işaretle gösterilir.',
              '$+75$ TL.'),
            q('İki değişimin toplamı giderde ne yapar?',
              '$(-60) + (+75)$ işlemini yap.',
              '$(-60) + 75 = +15$ TL; gider toplamda $15$ TL artmıştır.'),
          ],
        },
        {
          kind: 'start',
          title: 'İki bölümlü oyun',
          context: [
            'İki bölümlü bir bilgi yarışmasında doğru cevap puan kazandırıyor, yanlış cevap puan kaybettiriyor. Bölüm puanları toplanarak oyun sonu puanı hesaplanıyor. Örnek durumlar: $(+7) + (+6) = +13$; $(-2) + (-4) = -6$; $(-5) + (-5) = -10$; $(+7) + (-4) = +3$.',
          ],
          questions: [
            q('$(+7) + (-4)$ işlemini sayı doğrusunda nasıl gösterirsin?',
              '$+7$’den başla, $-4$ kadar sola git.',
              '$+7$’den $4$ birim sola: $+3$.'),
            q('$(-6) + (+8)$ kaçtır?',
              'Zıt işaretli sayılarda mutlak değerler farkı alınır, büyük olanın işareti yazılır.',
              '$(-6) + 8 = +2$.'),
            q('Hangi öğrencinin oyun sonu puanı en yüksektir? Neye göre karar veriyorsun?',
              'Pozitif puanlar büyüklük sırasına göre karşılaştırılır.',
              'Puanı en büyük olan öğrenci birincidir; $-10 < -6 < +3 < +13$.'),
          ],
        },
        {
          kind: 'learn',
          title: 'Dört işlem ve işaret kuralları',
          checks: [
            q('$(-5) + (+8)$ kaçtır?',
              'Zıt işaretlilerde fark alınır, büyük sayının işareti yazılır.',
              '$+3$.'),
            q('$(-4) \\cdot (-6)$ kaçtır?',
              'Aynı işaretli iki sayının çarpımı?',
              '$+24$.'),
          ],
          blocks: [
            {
              heading: 'Toplama',
              paragraphs: [
                'Aynı işaretli iki sayı toplanırken mutlak değerler toplanır, ortak işaret yazılır: $(-7) + (-4) = -11$.',
                'Zıt işaretli iki sayı toplanırken mutlak değerlerin farkı alınır, mutlak değeri büyük olanın işareti yazılır: $(+7) + (-4) = +3$.',
                'Toplamada değişme ve birleşme özellikleri vardır; etkisiz eleman $0$’dır.',
              ],
              scene: {
                type: 'isaret-kurali',
                params: [
                  { name: 'a', label: 'Birinci sayı', min: -9, max: 9, step: 1, value: -7 },
                  { name: 'b', label: 'İkinci sayı', min: -9, max: 9, step: 1, value: -4 },
                ],
              },
            },
            {
              heading: 'Çıkarma',
              paragraphs: [
                'Çıkarma, çıkan sayının ters işaretlisini toplamaktır: $(-9) - (-4) = (-9) + (+4) = -5$.',
                'Çıkarma işleminde “eksi” işareti ile sayının işareti karıştırılmamalıdır. $5 - 4$ ile $5 - (-4)$ farklıdır: $1$ ve $9$.',
              ],
            },
            {
              heading: 'Çarpma ve bölme',
              paragraphs: [
                'Aynı işaretli iki sayının çarpımı ve bölümü pozitif, zıt işaretli iki sayının çarpımı ve bölümü negatiftir.',
                '$(+3) \\cdot (+4) = +12$, $(-3) \\cdot (+4) = -12$, $(-3) \\cdot (-4) = +12$.',
                'Çarpma, tekrarlı toplamanın kısa yoludur: $(-4) \\cdot 3 = (-4) + (-4) + (-4) = -12$.',
              ],
            },
          ],
          boxes: [
            { title: 'İşaret kuralı', body: '(+)·(+)=+ · (−)·(−)=+ · (+)·(−)=− · (−)·(+)=−. Bölmede de aynı kural geçerlidir.' },
            { title: 'Çıkarma', body: 'a − b = a + (−b). Çıkarma, ters işaretliyi toplamaktır.' },
            { title: 'Etkisiz eleman', body: 'Toplamada 0, çarpmada 1 etkisiz elemandır; 0 ile çarpım her zaman 0’dır.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'İşaret kuralı nereden geliyor?',
          items: [
            q('$(-3) \\cdot (+5) \\cdot (-2)$ çarpımının işaretini işlem yapmadan nasıl bulursun?',
              'Kaç tane negatif çarpan var?',
              'İki negatif çarpan vardır; çift sayıda negatif çarpan çarpımı pozitif yapar: $+30$.'),
            q('$5 - (-4)$ ile $5 - 4$ arasındaki farkı sayı doğrusunda açıkla.',
              'Çıkarma, ters işaretliyi toplamaktır.',
              '$5 - (-4) = 9$, $5 - 4 = 1$. İlkinde $4$ birim sağa, ikincisinde $4$ birim sola gidilir.'),
            q('Bir sayıyı $(-1)$ ile çarpmak ne yapar?',
              'Sayı doğrusunda sıfıra göre simetri.',
              'İşaretini değiştirir: $7 \\to -7$, $-3 \\to 3$.'),
          ],
        },
        {
          kind: 'explore',
          title: 'Sayma pullarıyla toplama',
          materials: 'Kırmızı ve mavi pul (veya fasulye), kâğıt',
          intro: [
            'Bir kırmızı pul $+1$, bir mavi pul $-1$ gösterir. Bir kırmızı ile bir mavi pul yan yana gelince birbirini götürür (sıfır çifti).',
          ],
          steps: [
            q('$4$ kırmızı ve $6$ mavi pul yan yana konuyor. Kaç sıfır çifti oluşur, geriye ne kalır?',
              'Her kırmızı-mavi eşleşmesi bir çift.',
              '$4$ çift oluşur, $2$ mavi pul artar: sonuç $-2$.'),
            q('Pul sayılarını değiştirmeden toplamı nasıl bulursun?',
              'Toplam = (kırmızı) − (mavi).',
              '$4 - 6 = -2$; aynı sonuç.'),
            q('Sonucu $0$ yapmak için kaç pul eklemelisin?',
              'Eksik olan pulların tersini ekle.',
              '$2$ kırmızı pul eklersen toplam $0$ olur.'),
          ],
          scene: {
            type: 'sayma-pullari',
            params: [
              { name: 'p', label: 'Pozitif pul (+)', min: 0, max: 6, step: 1, value: 4 },
              { name: 'n', label: 'Negatif pul (−)', min: 0, max: 6, step: 1, value: 6 },
            ],
          },
        },
        {
          kind: 'practice',
          title: 'Uygulayalım: tam sayılarla dört işlem',
          intro: [
            'Uygulayalım: aşağıdaki alıştırmaları defterinde çöz, sonra cevabını ve gerekçeni yaz.',
          ],
          questions: [
            q('$(-12) + 7 - (-5)$ işlemini yap.',
              'Çıkarmayı, ters işaretliyi toplamaya çevir.',
              '$-12 + 7 + 5 = 0$.'),
            q('$(-48) \\div 6$ ve $(-6) \\cdot (-7)$ işlemlerini yap.',
              'Bölme ve çarpmada işaret kuralını uygula.',
              '$(-48) \\div 6 = -8$; $(-6) \\cdot (-7) = 42$.'),
            Object.assign(q('Bir asansör $4.$ kattan $3$ kat aşağı iniyor, sonra $5$ kat yukarı çıkıyor. Hangi kattadır?',
            'Aşağı inmek çıkarmadır. Kutuyu sürükleyerek katı yerleştir.',
              '$4 - 3 + 5 = 6.$ kat.'),
            {
              scene: {
                type: 'asansor-kat',
                params: [
                  { name: 'kat', label: 'Asansörün katı', min: -3, max: 6, step: 1, value: 4 },
                ],
              },
            }),
          ],
        },
        {
          kind: 'problem',
          title: 'Saat dilimleri',
          context: [
            'Ülkelerin saatleri UTC’ye göre belirlenir; ileride olanlar $+$, geride olanlar $-$ ile gösterilir. İstanbul UTC+3’tedir. Çetin Bey aynı gün Vancouver’da (UTC−8) ve Brezilya’da (UTC−3) çevrim içi toplantılara katılacak.',
          ],
          steps: [
            step('Anla', 'İstanbul ile Vancouver arasındaki fark $3 - (-8) = 11$ saattir.'),
            step('Planla', 'İstanbul saatinden farkı çıkararak diğer şehirdeki saati bul.'),
            step('Çöz', 'İstanbul’da saat $20{:}00$ ise Vancouver’da $20 - 11 = 09{:}00$, Brezilya’da $20 - 6 = 14{:}00$.'),
            step('Kontrol', 'Vancouver İstanbul’dan $11$ saat geride, Brezilya $6$ saat geride; toplantı saatleri mantıklı.'),
          ],
          result: 'Saat farkı negatif sayılarla ifade edilir; İstanbul–Vancouver arası $11$, İstanbul–Brezilya arası $6$ saattir.',
        },
      ],
    },

    /* ------------------------------------------------------------------ 5 */
    5: {
      pages: '76–95',
      bookTopic: 'Rasyonel Sayılarla İşlemler ve Problem Çözme',
      stages: [
        {
          kind: 'warmup',
          title: 'Maden ocağındaki asansör',
          context: [
            'Bir maden ocağında yer altı asansörünün tünel duvarlarına her $4$ metrede bir işaret lambası yerleştirilmiştir. Yer seviyesine lamba konmamıştır.',
          ],
          questions: [
            q('Yer seviyesinin $12$ m altındaki lamba kaçıncı lambadır?',
              'Her $4$ metrede bir lamba var; $-12$ kaç $4$’lük adım eder?',
              '$12 \\div 4 = 3$; üçüncü lamba.'),
            q('Üçüncü lamba ile yedinci lamba arasındaki uzaklık kaç metredir?',
              'Aradaki lamba sayısına değil, konum farkına bak.',
              'Konumlar $-12$ ve $-28$; fark $16$ m.'),
            q('Bir madenci $-20$ m’den $+8$ m’ye çıkarsa kaç metre yol alır?',
              'İki konum arasındaki farkı bul.',
              '$8 - (-20) = 28$ m.'),
          ],
        },
        {
          kind: 'start',
          title: 'Denizaltı ve mikroplastik',
          context: [
            'Bir denizaltı, plastik atıkları gözlemlemek için deniz seviyesinin $\\frac{3}{4}$ km altına iniyor, sonra $\\frac{1}{8}$ km yukarı çıkıyor.',
          ],
          questions: [
            q('Denizaltının son konumunu ifade eden işlemi yaz.',
              'Aşağı negatif, yukarı pozitif.',
              '$\\left(-\\frac{3}{4}\\right) + \\left(+\\frac{1}{8}\\right)$.'),
            q('Sonucu bul.',
              'Paydaları $8$’de eşitle.',
              '$-\\frac{6}{8} + \\frac{1}{8} = -\\frac{5}{8}$ km.'),
            q('Denizaltı başlangıca göre kaç km daha derindedir?',
              'Sonuç negatifse aşağıdadır.',
              '$\\frac{5}{8}$ km derindedir.'),
          ],
        },
        {
          kind: 'learn',
          title: 'Rasyonel sayılarda toplama, çıkarma ve çarpma',
          checks: [
            q('$\\frac{1}{2} + \\frac{1}{3}$ kaçtır?',
              'Paydaları $6$’da eşitle.',
              '$\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.'),
            q('$\\frac{2}{3} \\cdot \\frac{9}{4}$ kaçtır?',
              'Çarpmadan önce sadeleştir.',
              '$\\frac{3}{2}$.'),
          ],
          blocks: [
            {
              heading: 'Payda eşitleme',
              paragraphs: [
                'Rasyonel sayılarda toplama ve çıkarma için paydalar eşit olmalıdır. Paydalar eşit değilse genişletme veya sadeleştirme yapılır.',
                'Örnek: $\\frac{3}{8} + \\frac{1}{6}$. EKOK $(8, 6) = 24$; $\\frac{9}{24} + \\frac{4}{24} = \\frac{13}{24}$.',
                'Paydalar eşitken yalnızca paylar toplanır: $\\frac{2}{7} + \\frac{3}{7} = \\frac{5}{7}$.',
              ],
              figure: { type: 'ekok', options: {} },
            },
            {
              heading: 'Tam sayılı kesirler',
              paragraphs: [
                'Tam sayılı kesirlerde iki yol vardır: tam kısımlar ayrı, kesirler ayrı toplanır; ya da bileşik kesre çevrilip işlem yapılır.',
                '$2\\frac{1}{3} + 1\\frac{1}{6} = 3 + \\frac{2}{6} + \\frac{1}{6} = 3\\frac{1}{2}$.',
              ],
            },
            {
              heading: 'Özellikler ve çarpma',
              paragraphs: [
                'Toplamada değişme ve birleşme özellikleri vardır; etkisiz eleman $0$, bir sayının toplama işlemine göre tersi işaret değiştirmiş hâlidir: $\\frac{3}{5}$ ile $-\\frac{3}{5}$.',
                'Çarpmada paylar çarpılıp paya, paydalar çarpılıp paydaya yazılır. İşaret, tam sayılardaki kuralla bulunur.',
                '$\\frac{2}{3} \\cdot \\frac{9}{4} = \\frac{18}{12} = \\frac{3}{2}$. Sadeleştirme çarpmadan önce yapılırsa işlem kolaylaşır.',
              ],
            },
          ],
          boxes: [
            { title: 'Payda eşitleme', body: 'a/b ± c/d için paydalar EKOK’ta eşitlenir; yalnız paylar toplanır veya çıkarılır.' },
            { title: 'Ters eleman', body: 'Toplamada ters: a/b ↔ −a/b. Çarpmada ters: a/b ↔ b/a (çarpımları 1).' },
            { title: 'Çarpma', body: '(a/b)·(c/d) = (a·c)/(b·d); işaret kuralı tam sayılarla aynıdır.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Payda eşitleme neden gerekli?',
          items: [
            q('$\\frac{1}{2} + \\frac{1}{3}$ işleminde bir öğrenci $\\frac{2}{5}$ buluyor. Hata nerede?',
              'Paydalar eşit mi?',
              'Paydalar eşitlenmeden paylar toplanmış. Doğrusu: $\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.'),
            q('$\\frac{3}{4} - \\frac{5}{4}$ sonucu neden negatiftir?',
              'Paylar arasındaki farka ve işarete bak.',
              '$\\frac{3 - 5}{4} = -\\frac{2}{4} = -\\frac{1}{2}$; çıkan büyük olduğu için sonuç negatiftir.'),
            q('Bir köstebek dakikada $\\frac{5}{2}$ metre derine iniyor. $4$ dakika sonra konumu nedir?',
              'Hız ile süreyi çarp, aşağı yönü negatif al.',
              '$4 \\cdot \\left(-\\frac{5}{2}\\right) = -10$ m.'),
          ],
        },
        {
          kind: 'explore',
          title: 'Payda eşitleme şeritleri',
          materials: 'Kesir şeritleri, makas, renkli kalem',
          intro: [
            'Bir bütünü $2$’ye, diğerini $3$’e bölen iki şerit al. İkisinde de aynı uzunlukta parçalar elde etmek için şeritleri kaç eş parçaya ayırman gerekir?',
          ],
          steps: [
            q('$\\frac{1}{2}$ ve $\\frac{1}{3}$ şeritlerini aynı çizgiye getirdiğinde toplam kaç parça görünür?',
              'İki paydanın ortak katı.',
              '$6$ eş parça görünür: $\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.'),
            q('$\\frac{1}{2} + \\frac{1}{4}$ için kaç parçaya bölmen gerekir?',
              'EKOK $(2, 4) = 4$.',
              '$4$ parça: $\\frac{2}{4} + \\frac{1}{4} = \\frac{3}{4}$.'),
            q('Paydaları eşitlemeden toplamanın neden yanlış olduğunu şeritle göster.',
              '$\\frac{1}{2}$ ve $\\frac{1}{3}$’ün parça büyüklükleri aynı mı?',
              'Parça büyüklükleri farklı olduğu için sayılamazlar; eşitlenince aynı büyüklükte parçalar elde edilir.'),
          ],
          scene: {
            type: 'kesir-toplam',
            params: [
              { name: 'a', label: 'Birinci kesrin payı', min: 0, max: 2, step: 1, value: 1 },
              { name: 'c', label: 'İkinci kesrin payı', min: 0, max: 3, step: 1, value: 1 },
            ],
          },
        },
        {
          kind: 'practice',
          title: 'Uygulayalım: rasyonel sayılarla işlemler',
          intro: [
            'Uygulayalım: aşağıdaki alıştırmaları defterinde çöz, sonra cevabını ve gerekçeni yaz.',
          ],
          questions: [
            q('$\\frac{5}{6} - \\frac{1}{3}$ işlemini yap.',
              'Paydaları $6$\'da eşitle.',
              '$\\frac{5}{6} - \\frac{2}{6} = \\frac{3}{6} = \\frac{1}{2}$.'),
            q('$\\left(-\\frac{2}{3}\\right) \\cdot \\frac{9}{4}$ işlemini yap.',
              'Sadeleştirerek çarp.',
              '$-\\frac{2 \\cdot 9}{3 \\cdot 4} = -\\frac{3}{2}$.'),
            q('$1\\frac{2}{5}$ tam sayılı kesrini bileşik kesre çevir.',
              'Tam kısmı paydayla çarpıp payı ekle.',
              '$\\frac{1 \\cdot 5 + 2}{5} = \\frac{7}{5}$.'),
          ],
        },
        {
          kind: 'problem',
          title: 'Derin dondurucudaki sarmalar',
          context: [
            'Şükran Hanım yaprak sarmalarının bir bölümünü servis edip kalanını $+12\\,^{\\circ}\\mathrm{C}$ sıcaklıktaki derin dondurucuya koyuyor. Sarmalar her $10$ dakikada $3\\,^{\\circ}\\mathrm{C}$ soğuyor. $1{,}5$ saat sonra sıcaklık kaç derece olur?',
          ],
          steps: [
            step('Anla', 'Sıcaklık düştüğü için değişim negatiftir: her $10$ dakikada $-3\\,^{\\circ}\\mathrm{C}$.'),
            step('Planla', '$1{,}5$ saat kaç $10$ dakika eder, bul.'),
            step('Çöz', '$1{,}5 \\cdot 60 = 90$ dakika; $90 \\div 10 = 9$ aralık. Toplam değişim $9 \\cdot (-3) = -27\\,^{\\circ}\\mathrm{C}$. Son sıcaklık $12 - 27 = -15\\,^{\\circ}\\mathrm{C}$.'),
            step('Kontrol', 'Sonuç negatif olmalı: derin dondurucu sıfırın altındadır. Evet.'),
          ],
          result: '$1{,}5$ saat sonra sıcaklık $-15\\,^{\\circ}\\mathrm{C}$ olur.',
        },
      ],
    },
  });

  Object.assign(weeks, {
    /* ------------------------------------------------------------------ 6 */
    6: {
      pages: '96–116',
      bookTopic: 'Çarpma · Bölme · Üslü İfade · Çok Adımlı İşlemler',
      stages: [
        {
          kind: 'warmup',
          title: 'Bakteri sayısı',
          context: [
            'Laboratuvarda incelenen bir bakteri her $30$ dakikada bir bölünerek sayısını iki katına çıkarıyor. Başlangıçta ortamda $1$ bakteri var.',
          ],
          questions: [
            q('$1$ saat sonra kaç bakteri olur?',
              '$1$ saatte kaç $30$ dakika var?',
              '$2$ kez bölünür: $1 \\to 2 \\to 4$. $1$ saat sonra $4$ bakteri.'),
            q('$3$ saat sonra kaç bakteri olur?',
              '$3$ saat $= 6$ tane $30$ dakika.',
              '$2^6 = 64$ bakteri.'),
            q('Bu değişimi üslü ifadeyle yaz.',
              'Tekrarlı çarpımın kısa yolu üslü ifadedir.',
              '$2^6$ (taban $2$, kuvvet $6$).'),
          ],
        },
        {
          kind: 'start',
          title: 'Zıplayan top',
          context: [
            'Bir top her yere çarptığında bir önceki yüksekliğinin $\\frac{2}{3}$’ü kadar yükseliyor. Top $81$ cm yükseklikten bırakılıyor.',
          ],
          questions: [
            q('Birinci çarpmadan sonra top kaç cm yükselir?',
              '$81$’in $\\frac{2}{3}$’ünü al.',
              '$81 \\cdot \\frac{2}{3} = 54$ cm.'),
            q('İkinci çarpmadan sonra kaç cm yükselir?',
              'Yeni yüksekliğin yine $\\frac{2}{3}$’ünü al.',
              '$54 \\cdot \\frac{2}{3} = 36$ cm.'),
            q('Üçüncü yüksekliği tek işlemle nasıl bulursun?',
              'Üç kez $\\frac{2}{3}$ ile çarpmak demek, $\\left(\\frac{2}{3}\\right)^3$ ile çarpmaktır.',
              '$81 \\cdot \\left(\\frac{2}{3}\\right)^3 = 81 \\cdot \\frac{8}{27} = 24$ cm.'),
          ],
        },
        {
          kind: 'learn',
          title: 'Bölme, üslü ifade ve işlem sırası',
          checks: [
            q('$4^3$ kaçtır?',
              'Taban üç kez çarpılır.',
              '$4 \\cdot 4 \\cdot 4 = 64$.'),
            q('$\\frac{3}{4} \\div \\frac{9}{8}$ kaçtır?',
              'İkinci kesri ters çevirip çarp.',
              '$\\frac{3}{4} \\cdot \\frac{8}{9} = \\frac{2}{3}$.'),
          ],
          blocks: [
            {
              heading: 'Kesirlerde bölme',
              paragraphs: [
                'Bir kesri diğerine bölmek, ikinci kesrin tersiyle çarpmaktır: $\\frac{2}{3} \\div \\frac{4}{9} = \\frac{2}{3} \\cdot \\frac{9}{4} = \\frac{3}{2}$.',
                'Bölmede değişme özelliği yoktur: $\\frac{2}{3} \\div \\frac{4}{9} \\ne \\frac{4}{9} \\div \\frac{2}{3}$.',
                'Gerçek yaşamda “kaç tane sığar” sorusu bölmedir: $6$ litre sirke $\\frac{1}{2}$ litrelik şişelere $6 \\div \\frac{1}{2} = 12$ şişeye dolar.',
              ],
              figure: { type: 'bolum-parca', options: {} },
            },
            {
              heading: 'Üslü ifadeler',
              paragraphs: [
                'Bir sayının kendisiyle tekrarlı çarpımı **üslü ifade** ile gösterilir: $5^4 = 5 \\cdot 5 \\cdot 5 \\cdot 5 = 625$.',
                'Taban tekrarlı çarpılan sayı, kuvvet kaç kez çarpıldığıdır. $\\left(\\frac{2}{3}\\right)^5 = \\frac{32}{243}$.',
                'Parantezin yeri sonucu değiştirir: $(-3)^2 = 9$ ama $-3^2 = -9$. Birincide eksi de kare alınır, ikincide yalnız $3$’ün karesi alınıp önüne eksi konur.',
              ],
            },
            {
              heading: 'Çok adımlı işlemlerde sıra',
              paragraphs: [
                'İşlem sırası: $1)$ parantez içi, $2)$ üslü ifadeler, $3)$ çarpma veya bölme, $4)$ toplama veya çıkarma. Aynı öncelikte soldan sağa ilerlenir.',
                'Aynı önceliğe sahip işlemler soldan sağa yapılır: $18 \\div 3 \\cdot 2 = 6 \\cdot 2 = 12$ (önce $3 \\cdot 2$ yapılırsa $3$ bulunur, bu yanlıştır).',
              ],
            },
          ],
          boxes: [
            { title: 'Bölme', body: 'a/b ÷ c/d = a/b · d/c. İkinci kesir ters çevrilip çarpılır.' },
            { title: 'Üslü ifade', body: 'a^n: a taban, n kuvvet. (−3)² = 9, −3² = −9.' },
            { title: 'İşlem sırası', body: '1) Parantez içi · 2) üslü ifade · 3) çarpma/bölme · 4) toplama/çıkarma. Aynı öncelikte soldan sağa: $3 + 2 \\cdot 5 = 13$, $(3 + 2) \\cdot 5 = 25$.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Parantez ve işlem sırası',
          items: [
            q('$(-3)^2$ ile $-3^2$ arasındaki fark nedir?',
              'Parantez neyi kapsıyor?',
              '$(-3)^2 = (-3)(-3) = 9$; $-3^2 = -(3 \\cdot 3) = -9$.'),
            q('$18 \\div 3 \\cdot 2$ işleminde önce çarpmayı yapan öğrenci $3$, doğru yapan $12$ bulur. Neden?',
              'Aynı öncelikteki işlemler hangi yönde yapılır?',
              'Çarpma ve bölme aynı önceliktedir; soldan sağa yapılır. $18 \\div 3 = 6$, $6 \\cdot 2 = 12$.'),
            q('$6$ litre sirke $\\frac{3}{4}$ litrelik şişelere doldurulursa kaç şişe gerekir?',
              'Bölme işlemini ters çevir-çarp ile yap.',
              '$6 \\div \\frac{3}{4} = 6 \\cdot \\frac{4}{3} = 8$ şişe.'),
          ],
        },
        {
          kind: 'explore',
          title: 'Şişenin ne kadarı kullanıldı?',
          materials: 'Aşağıdaki alan modeli, kalem, kâğıt',
          intro: [
            'Bir şişenin $\\frac{3}{4}$’ü sirke dolu. Bu sirkenin $\\frac{2}{3}$’ü yemekte kullanılıyor.',
            'Kullanılan sirke bütün şişenin kaçta kaçıdır? Alan modelinde satır birinci kesri, sütun ikinci kesri gösterir.',
          ],
          steps: [
            q('Kullanılan sirke bütün şişenin kaçta kaçıdır? Boyanan kareleri say.',
              'Kaç satır, kaç sütun var? Toplam kaç eş kare oluşuyor?',
              '$\\frac{2}{3} \\cdot \\frac{3}{4} = \\frac{6}{12} = \\frac{1}{2}$.'),
            q('Şişede kalan sirke bütünün kaçta kaçıdır?',
              'Bütün $1$; kullanılanı çıkar.',
              'Kalan sirke $1 - \\frac{1}{2} = \\frac{1}{2}$, yani şişenin yarısı.'),
            q('Aynı modelde $\\frac{2}{3} \\div \\frac{3}{4}$ kaçtır? Model bunu nasıl gösterir?',
              'Bölmede ikinci kesir ters çevrilip çarpılır.',
              '$\\frac{2}{3} \\cdot \\frac{4}{3} = \\frac{8}{9}$; boyalı alanın ikinci kesirlik parçalara ayrılması bu bölümü verir.'),
          ],
          scene: {
            type: 'kesir-carpim',
            params: [
              { name: 'n1', label: 'Sirke payı', min: 1, max: 4, step: 1, value: 2 },
              { name: 'd1', label: 'Sirke paydası', min: 2, max: 5, step: 1, value: 3 },
              { name: 'n2', label: 'Şişe payı', min: 1, max: 4, step: 1, value: 3 },
              { name: 'd2', label: 'Şişe paydası', min: 2, max: 5, step: 1, value: 4 },
            ],
          },
        },
        {
          kind: 'practice',
          title: 'Uygulayalım: bölme, üslü ifade, işlem sırası',
          intro: [
            'Uygulayalım: aşağıdaki alıştırmaları defterinde çöz, sonra cevabını ve gerekçeni yaz.',
          ],
          questions: [
            q('$\\frac{5}{8} \\div \\frac{15}{16}$ işlemini yap.',
              'İkinci kesri ters çevirip çarp.',
              '$\\frac{5}{8} \\cdot \\frac{16}{15} = \\frac{2}{3}$.'),
            q('$2^5$ ve $(-4)^2$ ifadelerinin değerini yaz.',
              'Taban kaç kez çarpılıyor?',
              '$2^5 = 32$; $(-4)^2 = 16$.'),
            q('$3 + 2 \\cdot (5^2 - 20)$ işlemini yap.',
              'Önce üslü ifade, sonra parantez, sonra çarpma, en son toplama.',
              '$5^2 = 25$; $25 - 20 = 5$; $2 \\cdot 5 = 10$; $3 + 10 = 13$.'),
          ],
        },
        {
          kind: 'problem',
          title: 'Halının ne kadarı süpürüldü?',
          context: [
            'Çiğdem Hanım’ın salonuna serdiği halı, salonun kenarlarından belirli boşluklar bırakılarak yerleştirilmiştir. Robot süpürge yalnızca halıyı süpürüyor ve halının $\\frac{3}{5}$’ini süpürüyor.',
          ],
          steps: [
            step('Anla', 'Süpürülen alan, halının alanının $\\frac{3}{5}$’idir.'),
            step('Planla', 'Halının alanını kenar uzunluklarından bul, sonra $\\frac{3}{5}$ ile çarp.'),
            step('Çöz', 'Salon $6$ m × $4$ m, halı her kenardan $0{,}5$ m içeride ise halı $5$ m × $3$ m $= 15$ m². Süpürülen alan $15 \\cdot \\frac{3}{5} = 9$ m².'),
            step('Kontrol', 'Süpürülen alan halıdan küçük, salonun alanından da küçük: $9 < 15 < 24$. Doğru.'),
          ],
          result: 'Süpürülen alan $9$ m²’dir; kalan $6$ m²’lik kısım süpürülmemiştir.',
        },
      ],
      exam: {
        title: '1. tema ölçme ve değerlendirme',
        note: 'Bu hafta 1. temanın ölçme sorularını çözüyoruz: tam sayılar, rasyonel sayılar, farklı temsiller, karşılaştırma ve dört işlem birlikte sorulur.',
        items: [
          q('Bir doğa fotoğrafçısı laleyi $90$ cm’den odaklıyor. Rüzgârda çiçek ileri geri $4{,}5$ cm sallanıyor. Fotoğrafın net olduğu uzaklık aralığını yaz.',
            'Aralık, odak uzaklığından sapma kadar aşağı ve yukarı gider.',
            '$90 - 4{,}5 = 85{,}5$ cm ile $90 + 4{,}5 = 94{,}5$ cm arası, yani $85{,}5$–$94{,}5$ cm.'),
          q('Bir lastiğin basıncı $\\frac{111}{50}$ bar, diğerininki $\\frac{43}{20}$ bar. Hangisi daha yüksektir? Payda eşitleyerek açıkla.',
            'Paydaları $100$’de eşitle.',
            '$\\frac{222}{100}$ ve $\\frac{215}{100}$; birincisi büyüktür.'),
          q('Ön yüzü arka yüzünden büyük olan karta arka yüze yazılabilecek en büyük tam sayı, arka yüzü ön yüzünden büyük olan karta ön yüze yazılabilecek en küçük tam sayı yazılıyor. Bu iki sayının çarpımının işareti ne olur?',
            'Sınır değerlerin işaretine bak; “en büyük” ve “en küçük” ifadeleri yön belirtir.',
            'Birinci sayı ön yüzün bir eksiği, ikinci sayı arka yüzün bir fazlasıdır; çarpımın işareti iki sınır değerin işaretine bağlıdır.'),
        ],
      },
    },

    /* ------------------------------------------------------------------ 7 */
    7: {
      pages: '96–116',
      bookTopic: '1. Tema tekrarı · Çok adımlı işlemler',
      stages: [
        {
          kind: 'warmup',
          title: 'Hangi işlem önce?',
          context: [
            '$2 + 3 \\cdot 4$ işlemini iki öğrenci farklı sonuçla bitiriyor: biri $20$, diğeri $14$.',
          ],
          questions: [
            q('Hangi sonuç doğrudur? Neden?',
              'Çarpma toplamadan önce mi sonra mı yapılır?',
              '$14$. Önce $3 \\cdot 4 = 12$, sonra $2 + 12 = 14$.'),
            q('$20$ sonucuna nasıl ulaşılmıştır?',
              'Hangi işlem önce yapılmış?',
              'Parantez yokken önce toplama yapılmış: $(2 + 3) \\cdot 4 = 20$.'),
          ],
        },
        {
          kind: 'start',
          title: 'Sınav öncesi hata listesi',
          context: [
            'Bir öğrenci deneme sınavındaki hatalarını listeliyor: “payda eşitlemeden topladım”, “eksi işaretini dağıtmadım”, “bölmede ters çevirmeyi unuttum”, “(–3)² ile –3²’yi karıştırdım”.',
          ],
          questions: [
            q('Bu listeden hangi üç maddeyi ilk sıraya alırdın?',
              'Hangi hatalar en çok puan kaybettirir?',
              'Payda eşitleme, işaret dağıtma ve bölmede ters çevirme; üçü de işlem hatalarının çoğunu oluşturur.'),
            q('Her madde için bir örnek yaz.',
              'Hatalı ve doğru hâli yan yana yaz.',
              'Örneğin $\\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6}$ (yanlış: $\\frac{2}{5}$); $(-9) - (-4) = -5$; $\\frac{2}{3} \\div \\frac{4}{9} = \\frac{3}{2}$.'),
          ],
        },
        {
          kind: 'learn',
          title: 'Tema tekrarı: kural kartları',
          checks: [
            q('$12 - 4 \\cdot 2 + 6 \\div 3$ kaçtır?',
              'Önce çarpma ve bölme, soldan sağa.',
              '$12 - 8 + 2 = 6$.'),
            q('$(-2)^3$ ile $-2^3$ arasındaki fark nedir?',
              'Parantez kapsamına dikkat et; tek kuvvette işaret değişir mi?',
              'İkisi de $-8$’dir; fark yalnız çift kuvvette ortaya çıkar.'),
          ],
          blocks: [
            {
              heading: 'Sayı kümeleri ve işaretler',
              paragraphs: [
                'Doğal sayılar $0, 1, 2, \\ldots$; tam sayılar negatifleri de içerir; rasyonel sayılar $\\frac{a}{b}$ ($b \\ne 0$) biçiminde yazılabilir.',
                'Toplamada aynı işaretli sayılar toplanır, zıt işaretlilerde fark alınır. Çıkarma, ters işaretliyi toplamadır.',
                'Çarpma ve bölmede işaret kuralı: aynı işaret $+$, zıt işaret $-$',
              ],
            },
            {
              heading: 'Kesirlerde dört işlem',
              paragraphs: [
                'Toplama–çıkarmada payda eşitlenir; çarpmada paylar ve paydalar ayrı çarpılır; bölmede ikinci kesir ters çevrilip çarpılır.',
                'Devirli ondalık kesre çevrilirken paya tüm sayı eksi devretmeyen kısım, paydaya devreden kadar $9$ ve devretmeyen kadar $0$ yazılır.',
              ],
            },
            {
              heading: 'İşlem sırası',
              paragraphs: [
                'Üslü ifadeler → parantezler → çarpma/bölme → toplama/çıkarma. Aynı öncelikte soldan sağa.',
                'Örnek: $-3^2 + (8 - 3) \\cdot 2 = -9 + 5 \\cdot 2 = -9 + 10 = 1$.',
              ],
            },
          ],
          boxes: [
            { title: 'Sınav ipucu', body: '1. sınav 5 Kasım 2026. Tema ölçme soruları; sayı kümeleri, mutlak değer, sıralama ve dört işlem üzerine kurulur.' },
            { title: 'Sık yapılan hata', body: 'Payda eşitlemeden pay toplamak; çıkarmada eksi işaretini dağıtmamak; bölmede ters çevirmeyi atlamak.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Sınav hatalarını ayıklama',
          items: [
            q('$(-9) - (-4)$ işleminde en sık yapılan hata nedir?',
              'Çıkarma, ters işaretliyi toplamadır.',
              '$(-9) + (+4) = -5$; öğrenciler $-9 - 4 = -13$ yazar.'),
            q('$\\frac{1}{2} + \\frac{1}{3}$ için yazılan $\\frac{2}{5}$ neden yanlıştır?',
              'Payda eşitlenmeli.',
              'Parça büyüklükleri eşit değil; doğrusu $\\frac{5}{6}$’dır.'),
          ],
        },
        {
          kind: 'explore',
          title: 'Hata avı',
          materials: 'Aşağıdaki işaret kuralı sahnesi, kalem, kâğıt',
          intro: [
            'Sahnedeki iki sayı $a$ ve $b$. Sürgüleri oynat; işaretleri değiştikçe toplamın ve çarpımın işaretini izle.',
            'Aşağıdaki üç çözümde birer hata var. Hatayı bul, doğrusunu yaz.',
          ],
          steps: [
            q('Sahnedeki $a$ ve $b$ için $a + b$ kaçtır?',
              'Zıt işaretli sayılarda büyükten küçük çıkarılır, sonuç büyüğün işaretini alır.',
              '$(-3) + 5 = 2$.'),
            q('Bir öğrenci $a \\cdot b = 15$ yazdı. Hatası nerede? Doğrusunu yaz.',
              'İşaretler aynı mı, zıt mı?',
              'Hata işarette: $(-3) \\cdot 5 = -15$; işaretler zıt olduğu için çarpım negatiftir.'),
            q('Aynı öğrenci $(-15) \\div 5$ için $3$ yazdı. Doğrusu kaçtır?',
              'Bölmede de işaret kuralı çarpmayla aynıdır.',
              '$(-15) \\div 5 = -3$.'),
          ],
          scene: {
            type: 'isaret-kurali',
            params: [
              { name: 'a', label: 'Birinci sayı', min: -6, max: 6, step: 1, value: -3 },
              { name: 'b', label: 'İkinci sayı', min: -6, max: 6, step: 1, value: 5 },
            ],
          },
        },
        {
          kind: 'practice',
          title: 'Uygulayalım: tema ölçme alıştırmaları',
          intro: [
            'Uygulayalım: aşağıdaki alıştırmaları defterinde çöz, sonra cevabını ve gerekçeni yaz.',
          ],
          questions: [
            q('$\\left(-\\frac{3}{4}\\right) \\div \\left(-\\frac{9}{8}\\right)$ işlemini yap.',
              'Ters çevir, çarp; işaret kuralını unutma.',
              '$\\frac{3}{4} \\cdot \\frac{8}{9} = \\frac{2}{3}$.'),
            q('$|-7| + (-7)$ işlemini yap.',
              'Mutlak değer pozitiftir.',
              '$7 + (-7) = 0$.'),
            q('$0{,}25$ sayısını kesir olarak yaz ve $\\frac{1}{3}$ ile karşılaştır.',
              '$0{,}25 = \\frac{1}{4}$; paydaları eşitle.',
              '$\\frac{1}{4} < \\frac{1}{3}$.'),
          ],
        },
        {
          kind: 'problem',
          title: 'Tema ölçme: kart sorusu',
          context: [
            'Ön yüzü sarı, arka yüzü pembe iki kart var. Birinci kartın ön yüzündeki sayı arka yüzündekinden büyük, ikinci kartın arka yüzündeki sayı ön yüzündekinden küçüktür. Birinci kartın arka yüzüne yazılabilecek en büyük tam sayı ile ikinci kartın ön yüzüne yazılabilecek en küçük tam sayı çarpılacak.',
          ],
          steps: [
            step('Anla', '“En büyük” ve “en küçük” sınırları, verilen sayıya en yakın tam sayıyı arar.'),
            step('Planla', 'Her kart için eşitsizliği yaz, sınır değeri bul.'),
            step('Çöz', 'Birinci kart için arka yüz ön yüzden küçük olmalı; en büyük tam sayı ön yüzün bir eksiğidir. İkinci kart için ön yüz arka yüzden büyük olmalı; en küçük tam sayı arka yüzün bir fazlasıdır.'),
            step('Kontrol', 'Bulduğun iki değeri eşitsizliklerde yerine koy; sınırı aşmadığını gör.'),
          ],
          result: 'Sınır değerler bulunup işaret kuralıyla çarpılır; sonucun işareti iki sayının işaretine bağlıdır.',
        },
      ],
    },

    /* ------------------------------------------------------------------ 8 */
    8: {
      pages: '117–124',
      bookTopic: 'Cisimlerin Farklı Yönlerden Görünümleri',
      stages: [
        {
          kind: 'warmup',
          title: 'Aynı yapı, beş yönden',
          context: [
            'Eş küplerle kurulmuş bir yapı aynı anda beş yönden incelenebilir: ön, arka, sağ, sol ve üst. Her yönden bakıldığında yapının yalnız bir yüzü görünür; arkada kalan küpler siluete girmez.',
            'Yandaki yapı üç sıra derinliğinde kurulmuş. Önce küpleri tek tek say, sonra aynı yapıya değişik yönlerden bak.',
          ],
          questions: [
            q('Yandaki yapıda kaç eş küp vardır?',
              'Sütunları arkadan öne doğru tek tek topla; her sütunun yüksekliği ayrı ayrı sayılır.',
              'Sütun yükseklikleri 3, 2, 1, 2, 1, 1, 1, 1 ve 1: toplam 13 küp.',
              { type: 'kup-yapi', options: { heights: [[3, 2, 1], [2, 1, 1], [1, 1, 1]], note: 'Üç sıra derinlik; sütunları topla.' } }),
            q('Aynı yapı önden bakıldığında kaç kare dolu görünür?',
              'Önden bakınca derinlik kaybolur; her sütunun en yüksek küpü görünür.',
              'Sütunların en yüksekleri 3, 2 ve 1: siluet 6 dolu karedir.',
              { type: 'kup-yapi', options: { heights: [[3, 2, 1], [2, 1, 1], [1, 1, 1]], views: 'front', note: 'Önden bakış.' } }),
          ],
        },
        {
          kind: 'start',
          title: 'Görünümler neyi saklar?',
          context: [
            'Önden bakıldığında en ve yükseklik görünür, boy (derinlik) saklanır. Üstten bakıldığında yükseklik saklanır, taban görünür.',
            'Sağdan ve soldan bakış birbirinin aynasıdır: siluetin biçimi aynı kalır, yalnız sağ–sol yer değiştirir.',
          ],
          questions: [
            q('Yandaki yapı üstten bakıldığında kaç dolu kare görünür?',
              'Üstten bakınca tabanı oku: yüksekliği sıfırdan büyük her hücre dolu karedir.',
              'Taban 3 × 3 ve dokuz hücrede de küp var: 9 dolu kare.',
              { type: 'kup-yapi', options: { heights: [[2, 3, 1], [1, 1, 2], [1, 2, 1]], views: 'top', note: 'Üstten bakış.' } }),
            q('Yandaki yapının sağdan ve soldan görünümleri neden aynı silueti verir?',
              'Sağdan ve soldan bakış birbirinin aynasıdır; kare sayısı değişmez, yerleri değişir.',
              'Sağ görünüm ile sol görünüm ayna görüntüsüdür. Sıraların en yüksekleri 2 ve 2 olduğu için iki görünümde de 4 kare görünür.',
              { type: 'kup-yapi', options: { heights: [[2, 1, 1], [1, 2, 1]], views: 'side', note: 'Sağdan bakış.' } }),
          ],
        },
        {
          kind: 'learn',
          title: 'Ön, arka, sağ, sol, üst ve alt görünüm',
          checks: [
            q('Yandaki yapının arka görünümü ön görünümünden nasıl ayrılır?',
              'Arkadan bakınca yapının sol tarafı sağda görünür; kare sayısı aynı kalır.',
              'Arka görünüm ön görünümün ayna görüntüsüdür: kare sayısı aynı, sağ–sol yer değişmiş.',
              { type: 'kup-yapi', options: { heights: [[2, 1, 1], [1, 2, 1]], views: 'front', note: 'Önden bakış: sütunlar 2, 2.' } }),
            q('Yandaki ön, yan ve üst görünümler aynı yapıya ait olabilir mi?',
              'Üç görünümdeki kare sayılarını ve sütun yüksekliklerini karşılaştır.',
              'Olabilir: ön görünüm 3, yan görünüm 3, üst görünüm 4 kare. Taban 2 × 2 ve arkadaki sütun 2 yüksekliğinde olduğunda üç görünüm birlikte tutarlıdır.',
              { type: 'gorunum-tablo', options: { front: [[1, 1], [1, 0]], side: [[1, 1], [1, 0]], top: [[1, 1], [1, 1]] } }),
            q('Yandaki yapıya üstten bakıldığında kaç dolu kare sayılır?',
              'Tabanı oku: boş hücre beyaz kalır.',
              'Taban 2 × 3; beş hücrede küp var: 5 dolu kare.',
              { type: 'kup-yapi', options: { heights: [[3, 1], [1, 2]], views: 'top', note: 'Üstten bakış.' } }),
            q('Yandaki yapının ön ve arka görünümleri birbirinin aynası mıdır?',
              'Ön görünümde soldaki yüksek sütun, arkadan bakınca sağda görünür.',
              'Aynasıdır: ön görünümün sağ–sol tersi arka görünümdür, kare sayısı değişmez.',
              { type: 'kup-yapi', options: { heights: [[1, 2, 1], [2, 1, 2]], views: 'front', note: 'Önden bakış.' } }),
          ],
          blocks: [
            {
              heading: 'Ön ve arka görünüm: dikey doğruya göre simetri',
              paragraphs: [
                'Önden bakıldığında her sütunun en yüksek küpü görünür; derinlik saklanır. Arkadan bakıldığında aynı sütunlar görünür ama yapının solu sağda kalır.',
                'Bu yüzden ön görünüm ile arka görünüm birbirinin ayna görüntüsüdür: kare sayısı aynıdır, yerleşim dikey bir doğruya göre ters döner.',
              ],
              figure: { type: 'kup-yapi', options: { heights: [[2, 1], [1, 2]], views: 'front', note: 'Önden bakış: soldaki sütun 2, sağdaki 1.' } },
            },
            {
              heading: 'Sağ ve sol görünüm: dikey doğruya göre simetri',
              paragraphs: [
                'Sağdan bakıldığında sıraların en yüksek küpü görünür; en (genişlik) saklanır. Soldan bakıldığında aynı sıralar ters sırayla görünür.',
                'Sağ ve sol görünüm de dikey bir doğruya göre simetriktir. Bu iki görünüm birlikte yapının derinliği boyunca yüksekliklerini verir.',
              ],
              figure: { type: 'kup-yapi', options: { heights: [[2, 1], [1, 2]], views: 'side', note: 'Sağdan bakış: iki sıra, yükseklikler 2 ve 2.' } },
            },
            {
              heading: 'Üst ve alt görünüm: yatay doğruya göre simetri',
              paragraphs: [
                'Üstten bakıldığında yükseklik saklanır; tabanda küp bulunan her hücre dolu kare olarak görünür. Alttan bakıldığında da aynı taban görünür ama **satırların sırası ters döner**: önden bakışta en önde duran sıra, alttan bakışta en arkada kalır.',
                'Bu yüzden alt görünüm, üst görünümün **satırları ters çevrilmiş** hâlidir; iki görünüm yatay bir doğruya göre simetriktir. Kare sayısı aynıdır, diziliş aynı değildir: üst görünümü olduğu gibi alta çizmek yanlış olur.',
              ],
              figure: { type: 'gorunum-tablo', options: { front: [[1, 0, 0], [1, 1, 1]], side: [[1, 0], [1, 1]], top: [[1, 1, 0], [1, 1, 1]], alt: [[1, 1, 1], [1, 1, 0]], note: 'Üstün satırlarını ters çevir: alt görünüm çıkar.' } },
            },
            {
              heading: 'Simetri: dikey ve yatay doğru',
              paragraphs: [
                'Eş küplerle oluşturulan yapıların ön–arka ve sol–sağ görünümleri dikey bir doğruya göre, üst–alt görünümleri ise yatay bir doğruya göre simetriktir. Arkaya geçerken sütunlar, alta geçerken satırlar tersine döner.',
                'Bu yüzden altı görünümü tek tek çizmek yerine üç görünüm (ön, sağ, üst) yeterlidir; öteki üçü bunların aynasıdır. Aynayı doğru yönde çevirmek gerekir: alta geçerken üst görünümün satırlarını ters çevir, sağ–solu değiştirme.',
              ],
              figure: { type: 'gorunum-simetri', options: {} },
            },
          ],
          boxes: [
            { title: 'Ön ve arka görünüm', body: 'Dikey doğruya göre simetrik; kare sayısı aynı, sağ–sol yer değişir.' },
            { title: 'Sağ ve sol görünüm', body: 'Dikey doğruya göre simetrik; sıraların en yüksek küpleri görünür.' },
            { title: 'Üst ve alt görünüm', body: 'Yatay doğruya göre simetrik; tabandaki dolu hücreler kare olur. Alttan görünüm, üstten görünümün satırları ters çevrilmiş hâlidir; olduğu gibi kopyalanmaz.' },
            { title: 'Simetri', body: 'Ön–arka ve sol–sağ dikey doğruya, üst–alt yatay doğruya göre simetriktir.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Görünüm aynıysa yapı aynı mıdır?',
          items: [
            q('Ön ve arka görünümü aynı olan bir yapıda hangi sütunlar eşit yükseklikte olmak zorundadır?',
              'Ayna simetrisinde soldaki sütun sağdakine karşılık gelir.',
              'Soldan sağa sıralanış ters döndüğünde aynı siluet elde edildiği için karşılıklı sütunlar eşit yükseklikte olmalıdır.',
              { type: 'kup-yapi', options: { heights: [[2, 2], [1, 1]], views: 'front', note: 'Önden bakış: iki sütun eşit.' } }),
            q('Aynı üç görünümü veren iki farklı yapı kurulabilir mi? Bir örnekle açıkla.',
              'Görünümler yalnız silueti verir; arkada kalan küplerin yerini kesinleştirmez.',
              'Kurulabilir: görünümler en çok yüksekliği verir, arkadaki küplerin kaç tane olduğunu vermez. Bu yüzden en az küp sorusunda en küçük çözüm aranır.',
              { type: 'gorunum-tablo', options: { front: [[1, 1, 0], [1, 1, 1]], side: [[1, 1], [1, 1]], top: [[1, 1, 1], [1, 1, 0]] } }),
          ],
        },
        {
          kind: 'explore',
          title: 'Sürgüyle prizmayı büyüt, görünümleri karşılaştır',
          intro: [
            'Sahnede sürgüyle geçilen beş ayrı yapı var. Sürgü şekli değiştirdikçe soldaki 3B çizim ve sağdaki altı görünüm aynı anda güncellenir.',
            'Aşağıdaki görevde her yapı için ön, arka, sağ, sol ve üst görünümde kaçar küp göründüğünü yazacaksın. Bu bir hazırlık çalışması: görünümler hazır olduğu için sayarak ilerleyebilirsin.',
          ],
          materials: 'Sürgüyle çalışan 3B sahne, altı görünüm paneli, kareli kâğıt',
          steps: [
            q('Sahnede en $4$, boy $3$, yükseklik $2$ birim olan prizma duruyor. Ön görünümünde kaç kare vardır?',
              'Ön görünüm en ile yüksekliğin çarpımıdır; boy bu görünümde görünmez.',
              'Ön görünüm $4 \\times 2 = 8$ karedir.'),
            q('Sürgüleri en $3$, boy $2$, yükseklik $4$ yap. Üst görünümde kaç kare sayılır?',
              'Üst görünüm en ile boyun çarpımıdır; yükseklik bu görünümde kaybolur.',
              'Üst görünüm $3 \\times 2 = 6$ karedir.'),
          ],
          scene: {
            type: 'gorunum-kur',
            params: [
              { name: 'en', label: 'En (birim)', min: 1, max: 5, step: 1, value: 4 },
              { name: 'boy', label: 'Boy (birim)', min: 1, max: 4, step: 1, value: 3 },
              { name: 'yuk', label: 'Yükseklik (kat)', min: 1, max: 4, step: 1, value: 2 },
            ],
          },
          atolye: [
            {
              id: 'm8-e1',
              type: 'sayim',
              title: 'Hazırlık: beş yapı, altı yön',
              intro: 'Sürgüyle yapıyı seç. Sağdaki paneller görünümleri hazır veriyor; her yapı için beş yönün kaçar küp gösterdiğini yaz.',
              scene: {
                type: 'yapi-gorunum',
                values: { set: 1 },
                params: [
                  { name: 'sekil', label: 'Şekil (1–5)', min: 1, max: 5, step: 1, value: 1 },
                ],
              },
              set: 1,
              shapes: 5,
              views: ['on', 'arka', 'sag', 'sol', 'ust'],
            },
          ],
        },
        {
          kind: 'practice',
          title: 'Uygulayalım: görünümleri say, çiz, eşleştir',
          intro: [
            'Aşağıdaki görevler sırayla ilerler: görünümler gizliyken sayma, 3B döndürülebilir yapılarda sayma, 5 × 5 kareye çizme, verilen görünümlerden en az küpü bulma, eşleştirme, numaralı küplerle doğru–yanlış ve 3 × 3 görünümler için en az küp.',
            'Görevlerde cevap anahtarı gösterilmez; her denetim yalnız hangi yönün hatalı olduğunu söyler.',
          ],
          questions: [
            q('Ön, sağ ve üstten 3 × 3 dolu kare görünen yapıyı en az küple ikinci kez, ilk çözümden farklı bir yerleşimle kur. Kaç küp gerekir, üç kuleyi hangi hücrelere koyarsın?',
              'İlk çözümde kuleler köşegen üzerindeydi; şimdi kuleleri başka bir köşegene yerleştir, kalan altı hücreye birer küp koy.',
              'Yine 15 küp gerekir: üç kule üç ayrı satır ve sütunda durur (örneğin sağ üst, orta ve sol alt). Kalan altı hücreye birer küp gelince ön, sağ ve üst görünüm 3 × 3 dolu olur.',
              { type: 'gorunum-tablo', options: { front: [[1, 1, 1], [1, 1, 1], [1, 1, 1]], side: [[1, 1, 1], [1, 1, 1], [1, 1, 1]], top: [[1, 1, 1], [1, 1, 1], [1, 1, 1]] } }),
            q('Dört katlı yapının en üstteki küpünü alıp yandaki boş hücreye koyarsan önden görünüm nasıl değişir?',
              'Önden görünüm sütunların en yüksek küpünü gösterir; yüksekliği azalan sütuna bak.',
              'Kule 4\'ten 3\'e iner, yeni yerleştirilen sütun 1\'den 2\'ye çıkar. Ön görünümde sol sütun bir kare kısalır, sağdaki sütun bir kare uzar.',
              { type: 'kup-yapi', options: { heights: [[4, 1], [1, 1]], views: 'front', note: 'Dört katlı yapı; önden bakış.' } }),
            q('Yandaki yapının soldan görünümü sağdan görünümünden hangi bakımdan ayrılır?',
              'Sağdan ve soldan bakışta sıraların sırası ters döner; kare sayısı değişmez.',
              'Kare sayısı aynıdır, yerleşim aynadır: soldan bakışta arkadaki yüksek sıra solda, sağdan bakışta sağda görünür.',
              { type: 'kup-yapi', options: { heights: [[2, 2, 1], [1, 1, 1]], views: 'side', note: 'Sağdan bakış.' } }),
          ],
          atolye: [
            {
              id: 'm8-e2',
              type: 'sayim',
              title: 'Görünümler gizli: beş yeni yapı',
              intro: 'Bu kez görünüm panelleri verilmiyor; yalnız 3B yapı görünüyor. Her yapı için üç cevap hakkın var. Hatalı denemeden sonra hangi yönlerin yanlış olduğu söylenir, doğru sayı söylenmez.',
              scene: {
                type: 'yapi-kapali',
                values: { set: 2 },
                params: [
                  { name: 'sekil', label: 'Şekil (1–5)', min: 1, max: 5, step: 1, value: 1 },
                ],
              },
              set: 2,
              shapes: 5,
              views: ['on', 'arka', 'sag', 'sol', 'ust'],
              attempts: 3,
              ai: true,
            },
            {
              id: 'm8-e9',
              type: 'sayim',
              title: '3B döndür: beş yeni yapı',
              intro: 'Bu kez cismi döndürebilirsin: parmağınla (ya da fareyle) çevir, görünüm düğmelerini dene. Beş yapının hiçbiri öncekilere benzemiyor; her biri için beş yönün kaçar küp gösterdiğini yaz.',
              scene: {
                type: 'kup-dondur',
                params: [
                  { name: 'sekil', label: 'Yapı (1–5)', min: 1, max: 5, step: 1, value: 1 },
                ],
              },
              geoScene: {
                type: 'kup-dondur',
                params: [
                  { name: 'sekil', label: 'Yapı (1–5)', min: 1, max: 5, step: 1, value: 1 },
                ],
              },
              set: 3,
              shapes: 5,
              views: ['on', 'arka', 'sag', 'sol', 'ust'],
            },
            {
              id: 'm8-e3',
              type: 'cizim',
              title: '5 × 5 kareye çiz: ön, arka ve üst görünüm',
              intro: 'Cismi incele; ön, arka ve üst görünümü ayrı 5 × 5 kareye çiz. Kareleri fareyle tarayarak boyayabilirsin.',
              scene: {
                type: 'yapi-kapali',
                values: { set: 1 },
                params: [
                  { name: 'sekil', label: 'Şekil (1–5)', min: 1, max: 5, step: 1, value: 4 },
                ],
              },
              set: 1,
              sekil: 4,
              views: ['on', 'arka', 'ust'],
            },
            {
              id: 'm8-e4',
              type: 'cizim',
              title: 'Başka bir yapı: ön, arka ve üst görünüm',
              intro: 'Bu yapı daha basamaklı. Aynı biçimde ön, arka ve üst görünümü 5 × 5 kareye çiz.',
              scene: {
                type: 'yapi-kapali',
                values: { set: 1 },
                params: [
                  { name: 'sekil', label: 'Şekil (1–5)', min: 1, max: 5, step: 1, value: 5 },
                ],
              },
              set: 1,
              sekil: 5,
              views: ['on', 'arka', 'ust'],
            },
            {
              id: 'm8-e6',
              type: 'eslestirme',
              title: 'Hangi görünümler hangi yapıya ait?',
              intro: 'Dört yapı ve üç seçenek var. Her seçenek üç görünümden oluşuyor; seçenekleri yapılarla eşleştir. Seçeneklerin hiçbirine uymayan yapıyı da işaretle.',
              shapes: ['A', 'B', 'C', 'D'],
              options: [1, 2, 3],
              answer: { 1: 'A', 2: 'B', 3: 'D' },
              unmatched: 'C',
            },
            {
              id: 'm8-e7',
              type: 'dogru-yanlis',
              title: 'Numaralı küplerle doğru–yanlış',
              intro: 'Dört katlı yapıdaki küpler numaralanmış. Aşağıdaki dört cümleyi okuyup doğru ya da yanlış işaretle.',
              scene: { type: 'numarali-yapi', params: [{ name: 'kati', label: 'Kat sayısı', min: 4, max: 4, step: 1, value: 4 }] },
              statements: [
                { text: '3 numaralı küpü 5 numaralı küpün üstüne alırsan üstten görünüm değişmez.', answer: 'D' },
                { text: '2 numaralı küp çıkarılırsa önden görünüm değişir.', answer: 'D' },
                { text: '5 numaralı küp çıkarılırsa üstten görünüm değişmez.', answer: 'Y' },
                { text: '7 numaralı küp çıkarılırsa önden görünüm değişir.', answer: 'Y' },
              ],
            },
            {
              id: 'm8-e8',
              type: 'enaz',
              title: '3 × 3 görünümler için en az küp',
              intro: 'Önden, sağdan ve üstten 3 × 3 dolu kare görünen bir yapı isteniyor. Bu görünümleri elde etmek için en az kaç küp gerekir? Aşağıdaki 3B alanda küpleri kendin ekleyerek de deneyebilirsin.',
              scene: { type: 'gorunum-verilen', params: [{ name: 'grup', label: 'Görünüm grubu', min: 1, max: 2, step: 1, value: 2 }] },
              answer: 15,
              grids: [],
              lock: false,
              /* Öğrenci küpleri kendisi ekleyip görünümlerin dolduğunu görebilsin. */
              builder: true,
            },
          ],
        },
        {
          kind: 'problem',
          title: 'Görünümden yapıyı kur: en az kaç küp?',
          context: [
            'Bir yapının ön, sağ ve üst görünümü veriliyor. Aynı görünümleri veren pek çok yapı kurulabilir; sorulan, bunlardan en az küp kullananıdır.',
            'Ön görünümde sütun yükseklikleri 3, 2 ve 2; sağ görünümde 3 ve 2; üst görünümde beş dolu kare var.',
          ],
          steps: [
            step('Anla', 'Verilenler üç görünüm; istenen en az küp sayısı. Her sütunun yüksekliği ön ve sağ görünümün izin verdiği en küçük değer olmalı.'),
            step('Planla', 'Üst görünümdeki dolu hücreleri taban olarak al. Her hücrenin yüksekliği, o sütunun ön görünümdeki yüksekliği ile sağ görünümdeki yüksekliğinden küçük ya da eşit olmalı.'),
            step('Çöz', 'Hücreler soldan sağa 2, 3, 2, 3, 3, 2 ve 3 yüksekliklerini alır: toplam 18 değil, sağ görünümün izin verdiği en küçük değerlerle 9 küp. Yükseklikler 3, 1, 2 ve 1, 2 olarak yerleşince üç görünüm de tutar.'),
            step('Kontrol', 'Kurulan yapıya tekrar bak: önden 3–2–2, sağdan 3–2, üstten beş dolu kare görünüyor mu? Küp sayısı 9; bir küp daha eksiltince bir sütun yüksekliğini kaybediyor.'),
          ],
          result: 'Görünümleri sağlayan en az küp sayısı 9; 3B çözüm öğretmen şifresiyle açılır.',
          atolye: [
            {
              id: 'm8-e5',
              type: 'enaz',
              title: 'Verilen görünümlerden en az küp',
              intro: 'Ön, sağ ve üst görünümü incele; en az kaç küp gerektiğini yaz. Arkadan, soldan ve alttan görünümü 5 × 5 kareye çiz. Alt görünüm üst görünümün aynısı değildir: üst görünümün satırlarını ters çevirince alt görünüm çıkar. Çözümün 3B gösterimi şifreyle açılır.',
              scene: { type: 'gorunum-verilen', params: [{ name: 'grup', label: 'Görünüm grubu', min: 1, max: 2, step: 1, value: 1 }] },
              yapi: [[3, 1, 2], [1, 2, 0]],
              answer: 9,
              grids: ['arka', 'sol', 'alt'],
              solution: { type: 'yapi-cozum', params: [{ name: 'goster', label: 'Çözüm (1 = açık)', min: 1, max: 2, step: 1, value: 1 }] },
            },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ 9 */
    9: {
      pages: '125–133',
      bookTopic: 'Açınım ve Yüzey Alanı',
      stages: [
        {
          kind: 'warmup',
          title: 'Kutuları tanıyalım',
          context: [
            'Günlük hayatta kullandığımız birçok kutu prizma biçimindedir. Üç prizmayı yüzlerinin biçiminden ayırt ederiz: **küp** (altı yüzü de eş kare), **kare prizma** (alt ve üst tabanı kare, yan yüzleri dikdörtgen), **dikdörtgenler prizması** (bütün yüzleri dikdörtgen).',
            'Üçünde de $6$ yüz, $12$ ayrıt ve $8$ köşe vardır; değişen yalnız yüzlerin biçimidir.',
          ],
          questions: [
            q('Yandaki üç cismin adını yaz. Hangisinin bütün yüzleri eş karedir?',
              'Yüzlerin biçimine bak: kaç yüzü kare?',
              'Soldan sağa: küp, kare prizma, dikdörtgenler prizması. Bütün yüzleri eş kare olan küptür.',
              { type: 'cisimler-uc', options: { adlar: false } }),
            q('Yandaki üç kutunun her biri hangi prizmaya benzer?',
              'Kutuların yüzlerini karşılaştır: hangisinde her yüz eş, hangisinde taban kare?',
              'Şeker küpü küpe benzer: bütün yüzleri eş karedir. Peçete kutusu ile tuğla dikdörtgenler prizmasına benzer: yüzleri dikdörtgendir. Tabanı kare, yanları dikdörtgen olan kutu ise kare prizmadır; süt kutusu böyledir.',
              { type: 'gunluk-esya', options: {} }),
            q('Yandaki prizmada karşılıklı yüzler neden aynı renge boyanmış?',
              'Ön yüzün tam karşısında hangi yüz var?',
              'Karşılıklı yüzler eş ve paraleldir; aynı renk bu eşliği gösterir: ön–arka mor, sol–sağ yeşil, üst–alt amber.',
              { type: 'acilim-renk', options: { tur: 'dikdortgen' } }),
          ],
        },
        {
          kind: 'start',
          title: 'Beş açınım: hangisi kutu olur?',
          context: [
            'Bir cismin yüzeyinin tek düzlemde açılmış hâline **açınım** denir. Açınımın kapanması için altı yüzün de ayrı ayrı durması gerekir: katlanınca hiçbir yüz üst üste binmemelidir.',
            'Aşağıdaki beş cümleyi tek tek oku. Her cümlenin yanındaki açınıma bak, cümlenin **doğru** mu **yanlış** mı olduğuna karar ver ve gerekçeni yaz.',
          ],
          questions: [
            q('“1. açınım katlanınca kutu kapanır.” Bu cümle doğru mu, yanlış mı? Gerekçeni yaz.',
              'İki kapak da ön yüzün üstünde ve altında; katlanınca nereye gelirler?',
              'Doğru. Kapaklar ön yüzün üstünde ve altında; katlanınca biri üst, öteki alt taban olur, hiçbir yüz çakışmaz.',
              { type: 'acilim-bes', options: { secili: 1 } }),
            q('“2. açınım katlanınca kutu kapanır.” Bu cümle doğru mu, yanlış mı? Gerekçeni yaz.',
              'Bir kapak ön yüzün üstünde, öteki arka yüzün altında; ikisi de boş tabanlara denk gelir mi?',
              'Doğru. Bir kapak üst taban, öteki alt taban olur; yüzler karşılıklı oturur, çakışma olmaz.',
              { type: 'acilim-bes', options: { secili: 2 } }),
            q('“3. açınımı katlayınca bir yüz açıkta kalır.” Bu cümle doğru mu, yanlış mı? Gerekçeni yaz.',
              'Kapaklar ön ve sol yüzün altında; katlanınca hangi tabanlar kapanır?',
              'Yanlış. İki kapak üst ve alt tabanı kapatır; altı yüz de yerine oturur, açıkta yüz kalmaz.',
              { type: 'acilim-bes', options: { secili: 3 } }),
            q('“4. açınımda iki kapak katlanınca üst üste biner.” Bu cümle doğru mu, yanlış mı? Gerekçeni yaz.',
              'İki kapak da gövdenin üstünde duruyor; katlanınca aynı yere mi gelirler?',
              'Doğru. İki kapak da üst tarafta olduğu için ikisi de üst tabana gelir; alt taban boş kalır, kutu kapanmaz.',
              { type: 'acilim-bes', options: { secili: 4 } }),
            q('“5. açınımın altı yüzü de birbirinden ayrı durur.” Bu cümle doğru mu, yanlış mı? Gerekçeni yaz.',
              'Kapaklardan biri ön yüzün altında, öteki sağ yüzün üstünde; ikisi aynı yere mi gelir?',
              'Doğru. Kapaklar farklı kenarlardan bağlanmış; katlanınca biri alt, öteki üst taban olur. Altı yüz ayrı ayrı durur.',
              { type: 'acilim-bes', options: { secili: 5 } }),
          ],
        },
        {
          kind: 'learn',
          title: 'Açınım ve prizmanın yüzey alanı',
          checks: [
            q('Taban ayrıtı $3$, yüksekliği $4$ cm olan kare prizmanın yüzey alanı kaç cm²’dir?',
              'İki taban kare ($3^2$), dört yan yüz dikdörtgen ($3 \\cdot 4$). Hepsini topla.',
              '$2 \\cdot 9 + 4 \\cdot 12 = 18 + 48 = 66\\ \\mathrm{cm}^2$.',
              { type: 'olculu-cisim', options: { tur: 'kare', a: 3, b: 3, c: 4, birim: 'cm' } }),
            q('Ayrıtı $5$ cm olan küpün yüzey alanı kaç cm²’dir?',
              'Küpün altı yüzü de eş kare; bir yüzün alanını $6$ ile çarp.',
              '$6 \\cdot 25 = 150\\ \\mathrm{cm}^2$.',
              { type: 'olculu-cisim', options: { tur: 'kup', a: 5, birim: 'cm' } }),
            q('ABCDEFGH prizmasında $AB = 6$, $BC = 5$, $AE = 4$ cm. $A(ABCD) + A(EFGH)$ kaç cm²’dir?',
              'ABCD ve EFGH karşılıklı iki tabandır; alanları $a \\cdot c$ kadardır.',
              '$A(ABCD) = 6 \\cdot 5 = 30$, $A(EFGH) = 30$; toplam $60\\ \\mathrm{cm}^2$.',
              { type: 'acilim-harfli', options: { a: 6, b: 4, c: 5 } }),
            q('Kare prizmanın açınımında iki kare parça yan yana mı gelir, karşılıklı mı? Neden?',
              'Kare parçalar hangi iki yüzü oluşturur: tabanlar mı, yan yüzler mi?',
              'Karşılıklı gelirler: kare parçalar alt ve üst tabanı oluşturur. Tabanlar hiçbir zaman komşu olamaz, arada dört yan yüz vardır.',
              { type: 'acilim-renk', options: { tur: 'kare' } }),
          ],
          blocks: [
            {
              heading: 'Dikdörtgenler prizması ve renkli yüzleri',
              paragraphs: [
                'Dikdörtgenler prizmasının altı yüzü de dikdörtgendir. Karşılıklı yüzler eş ve paraleldir; bu yüzden onları aynı renge boyamak işimizi kolaylaştırır: ön ile arka mor, sol ile sağ yeşil, üst ile alt amber.',
                'Açınımda bu renkler korunur. Renkleri izleyerek hangi parçanın hangi yüze gideceğini kestirebiliriz; aynı renkten ikişer parça, toplam altı parça vardır.',
                'Aynı cismin birden çok açınımı olur; katlanınca hepsi aynı kutuyu verir, yalnız kâğıdın biçimi değişir.',
              ],
              figure: { type: 'acilim-renk', options: { tur: 'dikdortgen' } },
            },
            {
              heading: 'Aynı cismin birden çok açınımı',
              paragraphs: [
                'Küpün tam $11$ farklı açınımı vardır. Yandaki on bir çizimin hepsi katlanınca küp olur; hiçbiri diğerinin döndürülmüş ya da çevrilmiş kopyası değildir.',
                'Kare prizmanın ve dikdörtgenler prizmasının açınımları daha çoktur, çünkü dört yan yüz ve iki kapak farklı ölçülerde olabilir. Yine de kural aynıdır: gövde dört yan yüzden oluşur, kapaklar gövdenin uygun kenarlarına eklenir.',
                'Her çizim açınım değildir. Kapak yanlış kenara eklenirse iki yüz katlanınca üst üste biner, bir taban boşta kalır ve kutu kapanmaz.',
              ],
              figure: { type: 'acilim-onbir', options: {} },
            },
            {
              heading: 'Prizmanın yüzey alanı',
              paragraphs: [
                'Prizmanın köşeleri harflerle adlandırılır: alt taban $ABCD$, üst taban $EFGH$. Aynı harf sırası karşılıklı köşeleri gösterir; $E$, $A$’nın tam üstünde durur, $F$ de $B$’nin.',
                'Ayrıtlar üç uzunlukla anlatılır: $AB = a$, $BC = c$, $AE = b$. Karşılıklı ayrıtlar eşittir; $EF = AB = a$, $FG = BC = c$, $BF = AE = b$ olur.',
                'Yüzey alanını yüz yüz toplayalım. İki taban: $A(ABCD) + A(EFGH) = a \\cdot c + a \\cdot c = 2ac$. Ön ve arka yüz: $A(ABFE) + A(DCGH) = a \\cdot b + a \\cdot b = 2ab$. Yan yüzler: $A(BCGF) + A(ADHE) = b \\cdot c + b \\cdot c = 2bc$.',
                'Hepsinin toplamı $A = 2(ab + ac + bc)$ olur. Tabanı kare olan prizmada $a = c$ yazılırsa $A = 2a^2 + 4ab$; bütün yüzler eş kare olursa ($a = b = c$) $A = 6a^2$ bulunur.',
              ],
              figure: { type: 'acilim-harfli', options: { a: 6, b: 4, c: 5 } },
            },
          ],
          boxes: [
            { title: 'Dikdörtgenler prizması ve renkli yüzleri', body: 'Altı yüz de dikdörtgen; karşılıklı yüzler eş ve paralel. Aynı renk eş yüzleri gösterir: ön–arka, sol–sağ, üst–alt. Açınımda renkler korunur.' },
            { title: 'Aynı cismin birden çok açınımı', body: 'Küpün 11 farklı açınımı vardır; hepsi katlanınca küp olur. Kapak yanlış kenara eklenirse iki yüz çakışır, bir taban boşta kalır ve kutu kapanmaz.' },
            { title: 'Prizmanın yüzey alanı', body: 'Alt taban ABCD, üst taban EFGH; ayrıtlar a = AB, c = BC, b = AE. Yüzey alanı A = 2(ab + ac + bc). Kare prizmada 2a² + 4ab, küpte 6a².' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Üç çocuk tartışıyor',
          context: [
            'Elif: “Kare prizma da bir dikdörtgenler prizmasıdır; kare, kenarları eş dikdörtgendir.”',
            'Mert: “Hayır, kare prizmanın tabanı kare; dikdörtgenler prizmasında kare yüz olamaz.”',
            'Zeynep: “Küp de bir dikdörtgenler prizmasıdır, hatta kare prizmadır.”',
          ],
          items: [
            q('Üç arkadaşın tartışmasında kim haklı? Gerekçeni yaz.',
              'Karenin tanımına bak: dört açısı da dik ve kenarları eşit olan dörtgen hangi dörtgenin özel hâlidir?',
              'Elif ve Zeynep haklı. Kare, dikdörtgenin özel bir hâlidir (kenarları eşit); bu yüzden kare prizma da küp de birer dikdörtgenler prizmasıdır. Mert’in “kare yüz olamaz” sözü yanlıştır.'),
            q('Kare prizmanın yüzey alanı $2a^2 + 4ab$, küpünki $6a^2$. İkinci bağıntı birinciden nasıl çıkar? Hangi arkadaşı destekler?',
              'Kare prizma bağıntısında $a = b$ yaz: ne bulursun?',
              '$2a^2 + 4a^2 = 6a^2$; yani küp, kare prizmanın $a = b$ olan özel hâlidir. Bu, Zeynep’i destekler.'),
            q('Küp, kare prizma ve dikdörtgenler prizması için “her … bir …dır” cümlelerini kur. Hangisi hangisinin içinde yer alır?',
              'En geniş küme hangisi: bütün yüzleri dikdörtgen olanlar mı, tabanı kare olanlar mı?',
              'En geniş küme dikdörtgenler prizmasıdır. Kare prizma onun içinde, küp de kare prizmanın içinde yer alır: her küp bir kare prizmadır, her kare prizma bir dikdörtgenler prizmasıdır. Tersi doğru değildir.'),
          ],
        },
        {
          kind: 'explore',
          title: 'Açınımı katla',
          intro: [
            'Sahnedeki sürgü açınımı üç boyutta katlar: $0$ düz açınım, $1$ kapalı kutudur.',
            'Radyo düğmeleriyle cismi değiştir; üç prizmanın açınımlarını karşılaştır. Sorular sahnedeki çizimle ilgilidir.',
          ],
          materials: 'Yalnız ekranda çalışılır: açınım sahnesi',
          steps: [
            q('Sürgüyü yavaşça $1$’e çek. Kutu kapanırken hangi yüzler karşılıklı geliyor?',
              'Aynı renkten iki yüz karşılıklı gelir; rengi izle.',
              'Aynı renkli yüzler karşılıklı gelir: mor yüzler ön–arka, yeşiller sol–sağ, amberler üst–alt. Katlanma bitince $6$ yüz, $12$ ayrıt, $8$ köşe sayılır.'),
            q('Küpü seç, sonra kare prizmayı seç. Parça sayısı değişiyor mu, parçaların biçimi değişiyor mu?',
              'Her iki açınımda da kaç parça var? Kare prizmada hangi parçalar kare?',
              'Parça sayısı ikisinde de $6$. Küpte altı parça da eş kare; kare prizmada iki amber parça kare, dört gövde parçası dikdörtgen olur.'),
            q('Dikdörtgenler prizmasını seç. Açınımda kaç farklı ölçüde parça var?',
              'Aynı renkli parçalar eş midir? Kaç renk var?',
              'Üç farklı ölçü vardır; her ölçüden ikişer parça, toplam altı parça. Aynı renkli parçalar eştir.'),
          ],
          scene: {
            type: 'acilim-katla',
            title: 'Açınımı katla',
            hint: 'Sürgüyü sağa çekerek açınımı katla; radyo düğmesiyle cismi değiştir.',
            params: [
              { name: 'tur', label: 'Cisim', min: 1, max: 3, step: 1, value: 3 },
              { name: 'kat', label: 'Açınım → kutu', min: 0, max: 1, step: 0.05, value: 0 },
            ],
          },
        },
        {
          kind: 'practice',
          title: 'Uygulayalım: yüzey alanı hesapları',
          intro: [
            'Aşağıdaki alıştırmaları defterinde çöz; cevabını ve gerekçeni yaz. Şekiller soruda verilenleri gösteriyor.',
          ],
          questions: [
            q('Hangisi daha çok kâğıt ister: taban ayrıtı $3$, yüksekliği $5$ cm olan kare prizma mı, ayrıtı $4$ cm olan küp mü?',
              'İki yüzey alanını ayrı ayrı hesapla: $2a^2 + 4ab$ ve $6a^2$.',
              'Kare prizma: $2 \\cdot 9 + 4 \\cdot 15 = 78\\ \\mathrm{cm}^2$. Küp: $6 \\cdot 16 = 96\\ \\mathrm{cm}^2$. Küp daha çok kâğıt ister.',
              { type: 'ikili-olcu', options: {} }),
            q('Ayrıtları $6$, $4$ ve $3$ cm olan dikdörtgenler prizmasının yüzey alanını bul.',
              '$A = 2(ab + ac + bc)$; yüz alanları $24$, $18$, $12$.',
              '$2 \\cdot (24 + 18 + 12) = 108\\ \\mathrm{cm}^2$.',
              { type: 'olculu-cisim', options: { tur: 'dikdortgen', a: 6, b: 4, c: 3, birim: 'cm' } }),
            q('Taban ayrıtı $5$, yüksekliği $8$ cm olan kare prizmanın yüzey alanını bul.',
              'İki taban kare, dört yan yüz dikdörtgen: $2a^2 + 4ab$.',
              '$2 \\cdot 25 + 4 \\cdot 5 \\cdot 8 = 50 + 160 = 210\\ \\mathrm{cm}^2$.',
              { type: 'olculu-cisim', options: { tur: 'kare', a: 5, b: 5, c: 8, birim: 'cm' } }),
            q('Yüzey alanı $96$ cm² olan küpün bir ayrıtı kaç cm’dir?',
              'Önce bir yüzün alanını bul: $96 \\div 6$; sonra karekök al.',
              '$16\\ \\mathrm{cm}^2$; $\\sqrt{16} = 4$ cm.',
              { type: 'olculu-cisim', options: { tur: 'kup', a: 4, gizli: true, birim: 'cm', ustYazi: 'yüzey alanı 96 cm²' } }),
            q('Hediye kutusunun ayrıtları $20$, $25$ ve $30$ cm. Mor boyalı iki yüzün (ön ve arka) toplam alanı kaç cm²’dir?',
              'Ön yüz $20 \\times 30$; arkada eşi var.',
              '$20 \\cdot 30 = 600$; iki yüz $1200\\ \\mathrm{cm}^2$.',
              { type: 'hediye-paketi', options: { vurgu: 'on' } }),
            q('Aynı kutuda amber boyalı üst ve alt yüzlerin toplam alanı kaç cm²’dir?',
              'Üst yüz $20 \\times 25$; alt yüz onun eşi.',
              '$20 \\cdot 25 = 500$; iki yüz $1000\\ \\mathrm{cm}^2$.',
              { type: 'hediye-paketi', options: { vurgu: 'ust' } }),
            q('Aynı kutunun yeşil yan yüzlerinin toplam alanı kaç cm²’dir?',
              'Yan yüz $25 \\times 30$; iki yan yüz var.',
              '$25 \\cdot 30 = 750$; iki yüz $1500\\ \\mathrm{cm}^2$.',
              { type: 'hediye-paketi', options: { vurgu: 'yan' } }),
          ],
        },
        {
          kind: 'problem',
          title: 'Hediye paketi',
          context: [
            'Bir kutu hediye paketi yapılacak. Kutunun ayrıtları $20$, $25$ ve $30$ cm’dir. Kâğıt kutunun altı yüzünü de kaplayacak; artan kâğıt hesaba katılmayacak.',
            'Kutunun yüzey alanı, gereken kâğıdın en az miktarıdır.',
          ],
          steps: [
            step('Anla', 'Kutu dikdörtgenler prizması; altı yüzü var. Kâğıt miktarı yüzey alanı kadardır.'),
            step('Planla', 'Karşılıklı yüzleri eş çiftler hâlinde grupla: $20 \\cdot 25$, $20 \\cdot 30$, $25 \\cdot 30$.'),
            step('Çöz', 'Yüz çiftlerinin alanları $500$, $600$, $750$ birimkaredir. Toplam $2 \\cdot (500 + 600 + 750) = 3700\\ \\mathrm{cm}^2$.'),
            step('Kontrol', 'Toplam, en büyük yüzün iki katından büyük olmalı: $2 \\cdot 750 = 1500 < 3700$. Doğru.'),
          ],
          figure: { type: 'hediye-paketi', options: {} },
          result: 'Kutuyu kaplamak için en az $3700\\ \\mathrm{cm}^2$ kâğıt gerekir.',
        },
      ],
    },

    /* ------------------------------------------------------------------ 10 */
    10: {
      pages: '134–143',
      bookTopic: 'Hacim: Eş Nesneler ve Hacim Bağıntısı',
      stages: [
        {
          kind: 'warmup',
          title: 'Makarna sayarak kapasite',
          context: [
            'Alper iki farklı kavanozu makarnayla doldurup “ikisi de aynı sayıda makarna aldı, yani hacimleri eşit” diyor.',
            'Bir kavanoza iri makarna, diğerine ince makarna konmuş.',
          ],
          questions: [
            Object.assign(q('Alper’in çıkarımı doğru mudur?',
              'Makarnalar aynı büyüklükte mi?',
              'Değildir; farklı büyüklükteki nesnelerle sayılan miktarlar karşılaştırılamaz.'), {
              figure: { type: 'hacim', options: { cols: 3, rows: 2, layers: 2 } },
            }),
            Object.assign(q('Kapasiteyi karşılaştırmak için ne yapmalı?',
              'Aynı büyüklükte birim kullan.',
              'Aynı büyüklükteki eş birim küplerle doldurup saymak gerekir.'), {
              figure: { type: 'birim-kup', options: {} },
            }),
            Object.assign(q('Yandaki prizmada kaç birim küp var?',
              'Her katmanda $3 \\cdot 2 = 6$ küp var; iki katman.',
              '$12$ birim küp.'), {
              figure: { type: 'hacim', options: { cols: 3, rows: 2, layers: 2 } },
            }),
          ],
        },
        {
          kind: 'start',
          title: 'Ahşap denge oyunu',
          context: [
            'Ali ve Filiz farklı kutularda satılan aynı ahşap denge oyununu almış. Parçaların ayrıt uzunlukları $3$, $4$ ve $12$ birim; kutular farklı ama parçalar aynı.',
          ],
          questions: [
            Object.assign(q('Bir parçanın hacmi kaç birimküptür?',
              '$V = a \\cdot b \\cdot c$; ayrıtlar $3$, $4$, $12$.',
              '$3 \\cdot 4 \\cdot 12 = 144$ birimküp.'), {
              figure: { type: 'prizma', options: { a: 3, b: 4, c: 12 } },
            }),
            Object.assign(q('Kutulardan biri diğerinden büyükse parça sayısı aynı olabilir mi?',
              'Kutu hacmi ile parça hacmi ilişkisi.',
              'Olabilir; büyük kutuda boşluk veya farklı sayıda parça bulunabilir.'), {
              figure: { type: 'hacim', options: { cols: 4, rows: 2, layers: 2 } },
            }),
            Object.assign(q('Yandaki kutuda kaç birim küp var?',
              'Katman katman say: her katman $4 \\cdot 2 = 8$ küp.',
              '$8 \\cdot 2 = 16$ birim küp.'), {
              figure: { type: 'hacim', options: { cols: 4, rows: 2, layers: 2 } },
            }),
          ],
        },
        {
          kind: 'learn',
          title: 'Birim küpten hacim bağıntısına',
          checks: [
            q('Hacmi $72\\ \\mathrm{cm}^3$, taban alanı $9\\ \\mathrm{cm}^2$ olan prizmanın yüksekliği kaç cm’dir?',
              'Hacmi taban alanına böl.',
              '$8$ cm.',
              { type: 'prizma', options: { a: 3, b: 3, c: 8 } }),
            q('Ayrıtı $4$ cm olan küpün hacmi kaç cm³’tür?',
              'Hacim bağıntısında üç ayrıt da eşittir.',
              '$64\\ \\mathrm{cm}^3$.',
              { type: 'kup-ayrit', options: { edge: 4, unit: 'cm' } }),
            q('Bir prizmanın hacmi $36\\ \\mathrm{cm}^3$, taban alanı $12\\ \\mathrm{cm}^2$ ise kaç katman vardır?',
              'Hacmi taban alanına böl; her katman taban alanı kadar hacim taşır.',
              '$36 \\div 12 = 3$ katman.',
              { type: 'prizma', options: { a: 4, b: 3, c: 3 } }),
          ],
          blocks: [
            {
              heading: 'Hacim: taban alanı × yükseklik',
              paragraphs: [
                'Bir cismin hacmi, içine kaç eş birim sığdığı ile ölçülür. Aynı büyüklükteki eş küplerle doldurulduğunda sayılan küp sayısı hacmi verir.',
                'Dikdörtgenler prizmasında $V = a \\cdot b \\cdot c$; kare prizmada $V = a^2 \\cdot h$, küpte $V = a^3$. Sahnede her birim küp ayrı ayrı çizilir, ön sıradakiler numaralanır.',
              ],
              scene: {
                type: 'hacim',
                params: [
                  { name: 'a', label: 'Taban uzunluğu', min: 1, max: 4, step: 1, value: 3 },
                  { name: 'b', label: 'Taban genişliği', min: 1, max: 4, step: 1, value: 2 },
                  { name: 'h', label: 'Katman sayısı', min: 1, max: 4, step: 1, value: 2 },
                ],
              },
            },
            {
              heading: 'Birim: birimküp mü birimkare mi?',
              paragraphs: [
                'Hacim **birimküp** ile ölçülür ($\\mathrm{cm}^3$, $\\mathrm{dm}^3$, $\\mathrm{m}^3$); yüzey alanı **birimkare** ile ($\\mathrm{cm}^2$).',
                'Hacim “içine ne kadar sığar”, yüzey alanı “dışını kaplamak için ne kadar gerekir” sorusunun cevabıdır. Ayrıtı $3$ cm olan küpün hacmi $27\\ \\mathrm{cm}^3$, yüzey alanı $54\\ \\mathrm{cm}^2$’dir.',
              ],
              figure: { type: 'birim-kup', options: {} },
            },
            {
              heading: 'Katman: her katman taban kadar',
              paragraphs: [
                'Her katmanda $a \\cdot b$ küp vardır; $c$ kat varsa toplam $a \\cdot b \\cdot c$ küp olur.',
                'Katman sayısı bir artınca hacim taban alanı kadar artar; taban değişmezse katman sayısı ile hacim doğru orantılıdır.',
              ],
              figure: { type: 'katman', options: { cols: 3, rows: 2, layers: 3 } },
            },
          ],
          boxes: [
            { title: 'Hacim', body: 'V = a · b · c (taban alanı × yükseklik). Küp: V = a³.' },
            { title: 'Birim', body: 'Hacim birimküp (cm³, dm³, m³); yüzey alanı birimkare (cm²).' },
            { title: 'Katman', body: 'Her katman a·b küp taşır; c kat varsa V = a·b·c.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Hacim ile yüzey alanı farkı',
          items: [
            Object.assign(q('Bir prizmanın yüksekliği iki katına çıkarılırsa hacmi ne olur?',
              'Hacim bağıntısında yükseklik çarpan olarak bulunur.',
              'Hacim de iki katına çıkar: $V = a \\cdot b \\cdot c$.'), {
              figure: { type: 'prizma-cift', options: { a: 3, b: 2, h: 2 } },
            }),
            Object.assign(q('Hacmi $60$ birimküp, taban alanı $15$ birimkare olan prizmanın yüksekliği kaç birimdir?',
              'Hacmi taban alanına böl.',
              '$60 \\div 15 = 4$ birim.'), {
              figure: { type: 'hacim', options: { cols: 5, rows: 3, layers: 1 } },
            }),
            Object.assign(q('Aynı hacme sahip iki farklı prizma olabilir mi?',
              'Farklı ayrıtlar aynı çarpımı verebilir: $2 \\cdot 3 \\cdot 4$ ve $1 \\cdot 6 \\cdot 4$.',
              'Olabilir; ikisi de $24$ birimküp.'), {
              figure: { type: 'prizma', options: { a: 2, b: 3, c: 4 } },
            }),
            Object.assign(q('Yandaki cismin hacmi kaç birimküptür?',
              'Kesilen parçayı düş: bütün blok eksi kesik.',
              'Küpleri tek tek sayarak doğrula; bütün blok ile kesilen parça arasındaki fark hacmi verir.'), {
              figure: { type: 'bilesik-cizim', options: { a: 3, b: 3, h: 2, k: 1 } },
            }),
          ],
        },
        {
          kind: 'explore',
          title: 'Bileşik cisim: kesilen parçayı çıkar',
          intro: [
            'Sahnedeki cisim, büyük bir bloktan köşedeki parçanın kesilmesiyle oluşuyor. Her soru kendi kesitini gösteriyor: önce blokları say, sonra çıkar.',
            'Kesikli turuncu çerçeve, kesilen parçanın yerini gösterir.',
          ],
          materials: 'Aşağıdaki bileşik cisim sahnesi, eş küpler, kareli kâğıt',
          steps: [
            Object.assign(q('İlk cisimde bütün blok kaç birimküp?',
              'Bütün blok $4 \\cdot 3 \\cdot 2$.',
              '$24$ birimküp.'), {
              figure: { type: 'bilesik-cizim', options: { a: 4, b: 3, h: 2, k: 2 } },
            }),
            Object.assign(q('İlk cisimde kesilen parça kaç birimküp?',
              'Kesik $2$ genişlik, $2$ derinlik, $2$ yükseklik.',
              '$2 \\cdot 2 \\cdot 2 = 8$ birimküp.'), {
              figure: { type: 'bilesik-cizim', options: { a: 4, b: 3, h: 2, k: 2 } },
            }),
            Object.assign(q('İlk cismin hacmi kaç birimküp?',
              'Bütün bloktan kesilen parçayı çıkar.',
              '$24 - 8 = 16$ birimküp.'), {
              figure: { type: 'bilesik-cizim', options: { a: 4, b: 3, h: 2, k: 2 } },
            }),
            Object.assign(q('İkinci cisimde kesik daha küçük: hacmi kaç birimküp?',
              'Bütün blok $3 \\cdot 4 \\cdot 3 = 36$; kesik $1 \\cdot 3 \\cdot 3 = 9$.',
              '$36 - 9 = 27$ birimküp.'), {
              figure: { type: 'bilesik-cizim', options: { a: 3, b: 4, h: 3, k: 1 } },
            }),
            q('Sahnedeki cismin hacmi kaç birimküp?',
              'Önce bütün bloğu, sonra kesilen parçayı hesapla; ikisini çıkar.',
              'Sahnedeki genişlik, derinlik ve yükseklik değerleriyle aynı hesabı yap.'),
          ],
          scene: {
              type: 'bilesik-hacim',
              params: [
                  { name: 'a', label: 'Genişlik', min: 3, max: 4, step: 1, value: 4 },
                  { name: 'b', label: 'Derinlik', min: 2, max: 4, step: 1, value: 3 },
                  { name: 'h', label: 'Yükseklik', min: 1, max: 3, step: 1, value: 2 },
                  { name: 'k', label: 'Kesilen parça', min: 1, max: 2, step: 1, value: 2 },
                ],
            },
        },
        {
          kind: 'practice',
          title: 'Uygulayalım: hacim hesapları',
          intro: [
            'Uygulayalım: aşağıdaki alıştırmaları defterinde çöz, sonra cevabını ve gerekçeni yaz.',
          ],
          questions: [
            Object.assign(q('Ayrıtları $8$, $5$ ve $4$ birim olan prizmanın hacmini bul.',
              '$V = a \\cdot b \\cdot c$.',
              '$8 \\cdot 5 \\cdot 4 = 160$ birimküp.'), {
              figure: { type: 'prizma', options: { a: 8, b: 5, c: 4 } },
            }),
            Object.assign(q('Hacmi $120$ birimküp, taban alanı $24$ birimkare olan prizmanın yüksekliği kaç birimdir?',
              'Hacmi taban alanına böl.',
              '$120 \\div 24 = 5$ birim.'), {
              figure: { type: 'hacim', options: { cols: 6, rows: 4, layers: 1 } },
            }),
            Object.assign(q('Bir küpün hacmi $125$ birimküp ise bir ayrıtı kaç birimdir?',
              'Hangi sayının küpü $125$?',
              '$5$ birim.'), {
              figure: { type: 'kup-ayrit', options: { edge: 5, unit: 'br' } },
            }),
            Object.assign(q('$18$ eş küpün tamamıyla kaç farklı prizma kurulur?',
              '$18$’in çarpan üçlülerini ara.',
              '$1 \\times 1 \\times 18$, $1 \\times 2 \\times 9$, $1 \\times 3 \\times 6$, $2 \\times 3 \\times 3$: dört prizma.'), {
              figure: { type: 'prizma', options: { a: 2, b: 3, c: 3 } },
            }),
          ],
        },
        {
          kind: 'problem',
          title: 'Cam kap ve özdeş kutular',
          context: [
            'Dikdörtgenler prizması biçimindeki cam bir kap, önce dikdörtgenler prizması biçimindeki özdeş kutularla, sonra küp biçimindeki özdeş kutularla boşluk kalmayacak biçimde dolduruluyor.',
            'Kap $12 \\times 8 \\times 6$ birim; küp kutuların ayrıtı $2$ birim.',
          ],
          steps: [
            step('Anla', 'Kap hacmi, kutu hacminin tam katı olmalı.'),
            step('Planla', 'Kap hacmini hesapla, kutu hacmine böl.'),
            step('Çöz', 'Kap $12 \\cdot 8 \\cdot 6 = 576$ birimküp. Kutu $2 \\cdot 2 \\cdot 2 = 8$ birimküp ise $576 \\div 8 = 72$ kutu gerekir.'),
            step('Kontrol', '$72 \\cdot 8 = 576$; boşluk kalmıyor.'),
          ],
          figure: { type: 'hacim', options: { cols: 4, rows: 3, layers: 2 } },
          result: '$72$ küp kutu gerekir; kalan hacim $0$.',
        },
      ],
    },

    /* ------------------------------------------------------------------ 11 */
    11: {
      pages: '144–156',
      bookTopic: 'Hacim Ölçme Birimleri · Prizma Problemleri',
      stages: [
        {
          kind: 'warmup',
          title: 'Hangi birim daha uygun?',
          context: [
            'Elif ve Metin sokakta bir inşaat alanı görüyor. Elif “Şu beton mikserinde tonlarca beton var.” diyor; Metin markette ise içecekler litre ile satılıyor.',
            'Aynı büyüklük farklı birimlerle anlatılabilir; uygun birim seçmek sayıyı okunur kılar.',
          ],
          questions: [
            Object.assign(q('Beton miktarı için hangi birim uygundur?',
              'Çok büyük hacimler.',
              'Metreküp ($\\mathrm{m}^3$).'), {
              figure: { type: 'hacim', options: { cols: 4, rows: 4, layers: 3 } },
            }),
            Object.assign(q('Yandaki şişe $1{,}5$ L alıyor. Bu kaç santimetreküptür?',
              '$1$ L $= 1\\ \\mathrm{dm}^3 = 1000\\ \\mathrm{cm}^3$.',
              '$1{,}5 \\cdot 1000 = 1500\\ \\mathrm{cm}^3$.'), {
              figure: { type: 'litre-kup', options: {} },
            }),
            Object.assign(q('Kenarı $1$ dm olan küp biçimindeki kap kaç litre alır?',
              '$1\\ \\mathrm{dm}^3 = 1$ L.',
              '$1$ litre.'), {
              figure: { type: 'kup-ayrit', options: { edge: 1, unit: 'dm' } },
            }),
          ],
        },
        {
          kind: 'start',
          title: 'Kargo kamyonu',
          context: [
            'Kasasının ayrıtları $3$ m, $2$ m ve $2$ m olan bir kargo kamyonu var. Kolilerin her ayrıtı $1$ m, küçük kutuların her ayrıtı $1$ dm.',
          ],
          questions: [
            Object.assign(q('Yandaki kasa $1$ m ayrıtlı kolilerle tam doldurulursa kaç koli sığar?',
              'Her birim küp bir koli: katman katman say.',
              'Kasa $3 \\cdot 2 \\cdot 2 = 12$ birimküp; $12$ koli sığar.'), {
              figure: { type: 'hacim', options: { cols: 3, rows: 2, layers: 2 } },
            }),
            Object.assign(q('Aynı kasaya ayrıtı $1$ dm olan kaç kutu sığar?',
              '$1\\ \\mathrm{m}^3 = 1000\\ \\mathrm{dm}^3$; kasa $12\\ \\mathrm{m}^3$.',
              '$12 \\cdot 1000 = 12\\,000$ kutu.'), {
              figure: { type: 'birim-merdiven', options: {} },
            }),
            Object.assign(q('Ayrıtları $3$ m, $2$ m ve $2$ m olan kasanın hacmi kaç metreküptür?',
              'Dikdörtgenler prizmasında hacim = taban alanı × yükseklik.',
              '$3 \\cdot 2 \\cdot 2 = 12\\ \\mathrm{m}^3$.'), {
              figure: { type: 'prizma', options: { a: 3, b: 2, c: 2, note: 'Ayrıtlar 3 m, 2 m, 2 m.' } },
            }),
          ],
        },
        {
          kind: 'learn',
          title: 'Hacim ve sıvı ölçme birimleri',
          checks: [
            q('$2\\ \\mathrm{m}^3$ kaç litredir?',
              '$1\\ \\mathrm{m}^3 = 1000$ L.',
              '$2000$ L.',
              { type: 'birim-merdiven', options: {} }),
            q('$450$ mL kaç cm³’tür?',
              '$1$ mL $= 1\\ \\mathrm{cm}^3$.',
              '$450\\ \\mathrm{cm}^3$.',
              { type: 'litre-kup', options: {  } }),
            q('Bir yığının sütun yükseklikleri soldan sağa $3$, $1$, $2$ ise önden görünümü nasıldır?',
              'Her sütun kendi yüksekliğinde görünür.',
              'Basamaklı bir siluet: solda $3$, ortada $1$, sağda $2$ kare yüksekliğinde.',
              { type: 'gorunum-uc', options: { heights: [[3, 1, 2]] } }),
          ],
          blocks: [
            {
              heading: 'Geçiş: birimler arasında',
              paragraphs: [
                'Hacim ölçüleri her basamakta $1000$ ile çarpılır veya bölünür: $1\\ \\mathrm{m}^3 = 1000\\ \\mathrm{dm}^3$, $1\\ \\mathrm{dm}^3 = 1000\\ \\mathrm{cm}^3$, $1\\ \\mathrm{cm}^3 = 1000\\ \\mathrm{mm}^3$.',
                'Sıvı ölçüleri: $1$ L $= 1000$ mL; $1$ cL $= 10$ mL; $1$ dL $= 100$ mL.',
              ],
              figure: { type: 'birim-merdiven', options: {} },
            },
            {
              heading: 'Eşlik: 1 dm³ = 1 L',
              paragraphs: [
                '$1\\ \\mathrm{dm}^3 = 1$ L, $1\\ \\mathrm{cm}^3 = 1$ mL, $1\\ \\mathrm{m}^3 = 1000$ L.',
                'Bir akvaryumun hacmini dm$^3$ olarak bulursan aynı zamanda litre cinsinden kapasitesini bulmuş olursun: $5 \\cdot 4 \\cdot 3 = 60\\ \\mathrm{dm}^3 = 60$ L.',
              ],
              figure: { type: 'litre-kup', options: {} },
            },
            {
              heading: 'Düzgün olmayan cisim: parçalara ayır',
              paragraphs: [
                'Dereceli kaba su konur, cisim batırılır; yükselen su miktarı cismin hacmidir. Örneğin su seviyesi $120$ mL’den $145$ mL’ye çıktıysa taşın hacmi $25$ mL $= 25\\ \\mathrm{cm}^3$’tür.',
                'Düzgün olmayan katı cisimlerde hacim, cismi prizmalara ayırıp küpleri sayarak da bulunur. Sahnede sütunların yüksekliği eşit değildir; her sütundaki küp sayısı ayrı ayrı toplanır.',
              ],
              scene: {
                type: 'duzensiz-yigin',
                params: [
                  { name: 'desen', label: 'Yapı', min: 1, max: 4, step: 1, value: 3 },
                  { name: 'h', label: 'En yüksek sütun', min: 1, max: 3, step: 1, value: 2 },
                ],
              },
            },
          ],
          boxes: [
            { title: 'Geçiş', body: 'm³ → dm³ → cm³ her adımda ×1000.' },
            { title: 'Eşlik', body: '1 dm³ = 1 L · 1 cm³ = 1 mL · 1 m³ = 1000 L.' },
            { title: 'Düzgün olmayan cisim', body: 'Hacim = son su seviyesi − ilk su seviyesi.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Birim seçimi ve büyüklük',
          items: [
            Object.assign(q('$3{,}5\\ \\mathrm{dm}^3$ kaç santimetreküptür?',
              '$1\\ \\mathrm{dm}^3 = 1000\\ \\mathrm{cm}^3$.',
              '$3500\\ \\mathrm{cm}^3$.'), {
              figure: { type: 'litre-kup', options: {} },
            }),
            Object.assign(q('Taban alanı $40\\ \\mathrm{cm}^2$, hacmi $360\\ \\mathrm{cm}^3$ olan kabın yüksekliği kaç santimetredir?',
              'Hacmi taban alanına böl.',
              '$360 \\div 40 = 9$ cm.'), {
              figure: { type: 'hacim', options: { cols: 5, rows: 4, layers: 2 } },
            }),
            Object.assign(q('Bir litrelik şişe kaç santimetreküp su alır?',
              '$1$ L $= 1\\ \\mathrm{dm}^3$.',
              '$1000\\ \\mathrm{cm}^3$.'), {
              figure: { type: 'litre-kup', options: {} },
            }),
            Object.assign(q('Ayrıtı $2$ dm olan küp kaç litre alır?',
              'Önce dm³ cinsinden hacmi bul: $2^3$.',
              '$8\\ \\mathrm{dm}^3 = 8$ L.'), {
              figure: { type: 'kup-ayrit', options: { edge: 2, unit: 'dm' } },
            }),
          ],
        },
        {
          kind: 'explore',
          title: 'Desimetreküpten litreye',
          intro: [
            'Her soru kendi küpünü gösteriyor. Kenar uzunluğu şekilde yazılı; önce dm³ cinsinden hacmi bul, sonra litreye çevir.',
            'Sarı küçük küp $1\\ \\mathrm{dm}^3 = 1$ L ölçü birimidir.',
          ],
          materials: 'Aşağıdaki küp sahnesi, 1 litrelik ölçü kabı, cetvel',
          steps: [
            Object.assign(q('Ayrıtı $3$ dm olan küpün hacmi kaç desimetreküptür?',
              'Küpte $V = a^3$; ayrıt $3$ dm.',
              '$3^3 = 27\\ \\mathrm{dm}^3$.'), {
              figure: { type: 'kup-ayrit', options: { edge: 3, unit: 'dm' } },
            }),
            Object.assign(q('Aynı küp kaç litre alır?',
              '$1\\ \\mathrm{dm}^3 = 1$ L.',
              '$27$ L.'), {
              figure: { type: 'kup-ayrit', options: { edge: 3, unit: 'dm' } },
            }),
            Object.assign(q('Ayrıtı $2$ dm olan küp kaç litre alır?',
              '$V = 2^3 = 8\\ \\mathrm{dm}^3$; sonra litreye çevir.',
              '$8$ L.'), {
              figure: { type: 'kup-ayrit', options: { edge: 2, unit: 'dm' } },
            }),
            Object.assign(q('Ayrıtı $4$ dm olan küpün hacmi kaç santimetreküptür?',
              'Önce dm³ bul: $4^3$; sonra $1000$ ile çarp.',
              '$64\\ \\mathrm{dm}^3 = 64\\,000\\ \\mathrm{cm}^3$.'), {
              figure: { type: 'kup-ayrit', options: { edge: 4, unit: 'dm' } },
            }),
            q('Sahnedeki küpün hacmi kaç litre?',
              'Ayrıtı sürgüyle değiştir; önce dm³, sonra litre.',
              'Ayrıt $s$ ise hacim $s^3\\ \\mathrm{dm}^3$ ve aynı sayıda litredir.',
              { type: 'litre-kup', options: {  } }),
          ],
          scene: {
              type: 'birim-donusum',
              params: [
                  { name: 's', label: 'Ayrıt (dm)', min: 1, max: 6, step: 1, value: 2 },
                ],
            },
        },
        {
          kind: 'practice',
          title: 'Uygulayalım: birim dönüşümü ve prizma problemleri',
          intro: [
            'Uygulayalım: aşağıdaki alıştırmaları defterinde çöz, sonra cevabını ve gerekçeni yaz.',
          ],
          questions: [
            Object.assign(q('$2\\ \\mathrm{m}^3$ kaç litredir?',
              '$1\\ \\mathrm{m}^3 = 1000$ L.',
              '$2000$ L.'), {
              figure: { type: 'hacim', options: { cols: 4, rows: 5, layers: 5 } },
            }),
            Object.assign(q('$450$ mL kaç santimetreküptür?',
              '$1$ mL $= 1\\ \\mathrm{cm}^3$.',
              '$450\\ \\mathrm{cm}^3$.'), {
              figure: { type: 'litre-kup', options: {} },
            }),
            Object.assign(q('Ayrıtları $5$, $4$ ve $3$ dm olan akvaryum kaç litre su alır?',
              'Önce dm³: $5 \\cdot 4 \\cdot 3$; sonra litre.',
              '$60\\ \\mathrm{dm}^3 = 60$ L.'), {
              figure: { type: 'prizma', options: { a: 5, b: 4, c: 3 } },
            }),
            Object.assign(q('Hacmi $2$ L olan şişe kaç mililitre alır?',
              '$1$ L $= 1000$ mL.',
              '$2000$ mL.'), {
              figure: { type: 'litre-kup', options: {} },
            }),
          ],
        },
        {
          kind: 'problem',
          title: 'Olimpik havuz kaç litre?',
          context: [
            'Bir olimpik yüzme havuzunun ayrıtları $50$ m, $25$ m ve $2$ m. Havuz tamamen doldurulacak.',
            'Su faturası metreküp üzerinden hesaplanıyor; havuzun kaç litre aldığı da soruluyor.',
          ],
          steps: [
            step('Anla', 'Havuz bir dikdörtgenler prizması; hacim $a \\cdot b \\cdot c$.'),
            step('Planla', 'Önce metreküp, sonra litre. $1\\ \\mathrm{m}^3 = 1000$ L.'),
            step('Çöz', '$50 \\cdot 25 \\cdot 2 = 2500\\ \\mathrm{m}^3$; $2500 \\cdot 1000 = 2\\,500\\,000$ L.'),
            step('Kontrol', 'Havuz $2$ m derin; $2500$ m³ suyun kütlesi $2500$ tondur, büyüklük tutarlı.'),
          ],
          figure: { type: 'hacim', options: { cols: 5, rows: 3, layers: 2 } },
          result: 'Havuz $2500\\ \\mathrm{m}^3$, yani $2\\,500\\,000$ L su alır.',
        },
      ],
      performance: {
        title: 'Farklı ülkelerde ve geçmişte kullanılan hacim birimleri',
        context: [
          'Okka, kile, galon, varil gibi birimleri araştır. Bugün kullandığımız litre ve metreküp ile karşılaştır.',
        ],
        tasks: [
          'Üç farklı ülkeden veya dönemden birer birim seç ve bugünkü karşılığını yaz.',
          'Her birimin hangi işte kullanıldığını belirt (tahıl, sıvı, yakıt…).',
          'Bir tablo ile birimleri litreye çevirerek karşılaştır.',
          'Kısa bir sunum hazırla; kaynaklarını listele.',
        ],
        criteria: [
          'Birimlerin doğru çevrilmesi',
          'Kullanım bağlamının açıklanması',
          'Tablo ve sunum düzeni',
        ],
      },
    },
  });

  Object.assign(weeks, {
    /* ------------------------------------------------------------------ 12 */
    12: {
      pages: '157–175',
      bookTopic: 'Veri: Ortanca · Aritmetik Ortalama · Açıklık',
      stages: [
        {
          kind: 'warmup',
          title: 'Sıra numarası ile ortanca',
          context: [
            'Bir sınıfta $26$ öğrenci var. Öğrenciler boy sırasına dizildiğinde ortada kalan iki öğrencinin boyu $148$ cm ve $150$ cm.',
            'Yandaki şekilde yedi öğrencinin boyu sıralı gösteriliyor; ortadaki değer işaretli.',
          ],
          questions: [
            Object.assign(q('$26$ öğrenci sıraya dizildiğinde ortada kaç öğrenci kalır?',
              'Çift sayıda veride ortada iki değer bulunur.',
              'İki öğrenci: $13.$ ve $14.$ sıradaki.'), {
              figure: { type: 'veri-nokta', options: { values: [142, 145, 147, 148, 150, 152, 155], max: 160, unit: 'cm' } },
            }),
            Object.assign(q('Yandaki yedi boydan ortanca değer kaç santimetredir?',
              'Sıralı listede tam ortadaki (4.) değeri oku.',
              'Ortanca $148$ cm.'), {
              figure: { type: 'veri-nokta', options: { values: [142, 145, 147, 148, 150, 152, 155], max: 160, unit: 'cm' } },
            }),
            Object.assign(q('Boylar $148$ ve $150$ olan iki orta öğrencinin ortancası kaçtır?',
              'Ortadaki iki değerin aritmetik ortalaması alınır.',
              '$(148 + 150) \\div 2 = 149$ cm.'), {
              figure: { type: 'veri-nokta', options: { values: [148, 150], max: 160, unit: 'cm' } },
            }),
          ],
        },
        {
          kind: 'start',
          title: 'Alperen Şengün’ün istatistikleri',
          context: [
            'Bir basketbolcunun oynadığı $7$ maçtaki asist sayıları: $5, 3, 8, 4, 9, 3, 5$. Ribaunt sayıları ise $9, 11, 7, 10, 12, 8, 13$.',
          ],
          questions: [
            Object.assign(q('Yandaki asist verisinin ortancası kaçtır?',
              'Önce küçükten büyüğe sırala: $3, 3, 4, 5, 5, 8, 9$.',
              'Ortadaki $5$.'), {
              figure: { type: 'veri-nokta', options: { values: [5, 3, 8, 4, 9, 3, 5], max: 10, unit: 'asist' } },
            }),
            Object.assign(q('Yandaki ribaunt verisinin aritmetik ortalaması kaçtır?',
              'Toplamı veri sayısına böl: toplam $70$, veri $7$.',
              '$70 \\div 7 = 10$.'), {
              figure: { type: 'veri-nokta', options: { values: [9, 11, 7, 10, 12, 8, 13], max: 14, unit: 'ribaunt' } },
            }),
            Object.assign(q('İki seriden hangisinde açıklık daha büyüktür?',
              'Açıklık = en büyük − en küçük; ikisini ayrı ayrı hesapla.',
              'Asist $9-3 = 6$, ribaunt $13-7 = 6$: açıklıklar eşit.'), {
              figure: { type: 'veri-nokta', options: { values: [9, 11, 7, 10, 12, 8, 13], max: 14, unit: 'ribaunt' } },
            }),
          ],
        },
        {
          kind: 'learn',
          title: 'Merkezî eğilim ve yayılım ölçüleri',
          checks: [
            q('$4, 8, 6, 10$ verisinin ortalaması ve ortancası kaçtır?',
              'Önce sırala.',
              'Ortalama $7$, ortanca $(6+8)\\div2 = 7$.',
              { type: 'veri-nokta', options: { values: [4, 8, 6, 10], max: 12, unit: 'puan' } }),
            q('Açıklığı $12$ olan veri grubunun en küçük değeri $5$ ise en büyük değeri kaçtır?',
              'Açıklık = en büyük − en küçük.',
              '$17$.',
              { type: 'veri-nokta', options: { values: [5, 12, 17], max: 20, unit: 'puan', mark: 'range' } }),
          ],
          blocks: [
            {
              heading: 'Aritmetik ortalama',
              paragraphs: [
                'Aritmetik ortalama, verilerin toplamının veri sayısına bölümüdür: $\\bar{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}$.',
                'Aritmetik ortalama, toplamı eşit paylaştırma anlamı taşır. $4$ öğrencinin puanı $60, 70, 80, 90$ ise ortalama $75$’tir ve dört öğrenciye eşit dağıtıldığında her biri $75$ alır.',
                'Uç değerler ortalamayı kendine doğru çeker: bir veri çok büyükse ortalama artar.',
              ],
              scene: {
                type: 'ortalama',
                params: [
                  { name: 'a', label: '1. puan', min: 0, max: 100, step: 10, value: 60 },
                  { name: 'b', label: '2. puan', min: 0, max: 100, step: 10, value: 70 },
                  { name: 'c', label: '3. puan', min: 0, max: 100, step: 10, value: 80 },
                  { name: 'd', label: '4. puan', min: 0, max: 100, step: 10, value: 90 },
                ],
              },
            },
            {
              heading: 'Ortanca (medyan)',
              paragraphs: [
                'Veriler küçükten büyüğe sıralandığında tam ortada kalan değere **ortanca** denir.',
                'Veri sayısı tek ise ortadaki değer, çift ise ortadaki iki değerin aritmetik ortalaması ortancadır.',
                'Ortanca, uç değerlerden etkilenmez. Bu yüzden “tipik” değeri göstermek için çoğu zaman ortanca tercih edilir.',
              ],
              figure: { type: 'veri-nokta', options: { values: [12, 14, 15, 16, 43], max: 48, unit: 'puan', note: 'Sıralı beş veri: ortadaki 15.' } },
            },
            {
              heading: 'Açıklık',
              paragraphs: [
                'Açıklık, en büyük veri ile en küçük veri arasındaki farktır: açıklık $= x_{en\\ b\\ddot{u}y\\ddot{u}k} - x_{en\\ k\\ddot{u}\\varsigma\\ddot{u}k}$.',
                'Açıklık, verilerin ne kadar yayıldığını gösterir. Açıklığın küçük olması verilerin birbirine yakın olduğu anlamına gelir.',
              ],
              figure: { type: 'veri-nokta', options: { values: [5, 9, 14, 18, 23], max: 25, unit: 'puan', mark: 'range' } },
            },
          ],
          boxes: [
            { title: 'Ortalama', body: 'Verilerin toplamı ÷ veri sayısı. Uç değerlerden etkilenir.' },
            { title: 'Ortanca', body: 'Sıralı veride ortadaki değer; çift veride ortadaki ikisinin ortalaması. Uç değerlerden etkilenmez.' },
            { title: 'Açıklık', body: 'En büyük − en küçük. Verinin yayılımını gösterir.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Ortalama mı ortanca mı?',
          items: [
            Object.assign(q('$12, 14, 15, 16, 43$ verisinde ortalama mı ortanca mı veriyi daha iyi temsil eder?',
              '$43$ gibi bir uç değer hangi ölçüyü kaydırır?',
              'Ortanca ($15$). Ortalama $20$’ye çıkar ama verilerin çoğu $12$–$16$ aralığında.'), {
              figure: { type: 'veri-nokta', options: { values: [12, 14, 15, 16, 43], max: 48, unit: 'puan' } },
            }),
            Object.assign(q('Bir veri grubuna ortalamadan büyük yeni bir veri eklenirse ortalama nasıl değişir?',
              'Toplam artar, veri sayısı da artar; eklenen değer eski ortalamadan büyük.',
              'Ortalama artar; yeni değer ortalamayı kendine doğru çeker.'), {
              figure: { type: 'veri-nokta', options: { values: [4, 6, 8, 20], max: 22, unit: 'puan' } },
            }),
            Object.assign(q('Açıklığı $0$ olan bir veri grubu nasıldır?',
              'En büyük = en küçük olursa ne olur?',
              'Bütün veriler eşittir; örneğin $7, 7, 7, 7$.'), {
              figure: { type: 'veri-nokta', options: { values: [7, 7, 7, 7], max: 12, unit: 'puan' } },
            }),
            Object.assign(q('Yandaki iki gruptan hangisinin açıklığı büyüktür?',
              'Her grubun en büyük ve en küçük değerini bul; farklarını karşılaştır.',
              'Soldaki grup $2$–$9$ aralığında (açıklık $7$), sağdaki $4$–$6$ aralığında (açıklık $2$). Soldaki büyük.'), {
              figure: { type: 'veri-nokta', options: { values: [2, 4, 7, 9, 5, 6, 4, 5], max: 12, unit: 'puan' } },
            }),
          ],
        },
        {
          kind: 'explore',
          title: 'Ekran süreleri: ortanca ve açıklık',
          intro: [
            'Beş öğrencinin günlük ekran kullanım süresi (saat) ölçülüyor. Sahne verileri küçükten büyüğe sıralıyor ve ortadaki değeri işaretliyor.',
            'Her soru kendi veri kümesini gösteriyor; sayılar soruyla aynı.',
          ],
          materials: 'Aşağıdaki sıralama sahnesi, kareli kâğıt, hesap makinesi',
          steps: [
            Object.assign(q('Beş verinin ortalaması kaç saattir?',
              'Toplamı veri sayısına böl: toplam $21$, veri $5$.',
              '$21 \\div 5 = 4{,}2$ saat.'), {
              figure: { type: 'veri-nokta', options: { values: [2, 4, 5, 6, 4], max: 8, unit: 'saat' } },
            }),
            Object.assign(q('Aynı veride ortanca kaç saattir?',
              'Sıralı beş veride tam ortadaki (3.) değer.',
              'Sıralı: $2, 4, 4, 5, 6$; ortanca $4$ saat.'), {
              figure: { type: 'veri-nokta', options: { values: [2, 4, 4, 5, 6], max: 8, unit: 'saat' } },
            }),
            Object.assign(q('Aynı veride açıklık kaç saattir?',
              'En büyük $6$, en küçük $2$.',
              '$6 - 2 = 4$ saat.'), {
              figure: { type: 'veri-nokta', options: { values: [2, 4, 4, 5, 6], max: 8, unit: 'saat', mark: 'range' } },
            }),
            Object.assign(q('Dokuz öğrencinin verisi $2, 3, 3, 4, 5, 6, 6, 7, 12$ olsaydı ortalama mı ortanca mı uç değerden daha çok etkilenirdi?',
              'Toplamı ve ortadaki değeri ayrı ayrı düşün.',
              'Ortalama $48 \\div 9 \\approx 5{,}3$; ortanca $5$. $12$ uç değeri ortalamayı yukarı çeker, ortancayı etkilemez.'), {
              figure: { type: 'veri-nokta', options: { values: [2, 3, 3, 4, 5, 6, 6, 7, 12], max: 13, unit: 'puan' } },
            }),
            q('Sahnedeki beş verinin ortancasını ve açıklığını bul.',
              'Sürgüleri değiştir; sahne sıralıyor ve ortadaki değeri işaretliyor.',
              'Sahnedeki sıralı listenin ortası ortancadır; en büyük ile en küçük farkı açıklıktır.'),
          ],
          scene: {
              type: 'sirala-ortanca',
              params: [
                  { name: 'v1', label: '1. veri', min: 0, max: 12, step: 1, value: 4 },
                  { name: 'v2', label: '2. veri', min: 0, max: 12, step: 1, value: 9 },
                  { name: 'v3', label: '3. veri', min: 0, max: 12, step: 1, value: 6 },
                  { name: 'v4', label: '4. veri', min: 0, max: 12, step: 1, value: 2 },
                  { name: 'v5', label: '5. veri', min: 0, max: 12, step: 1, value: 7 },
                ],
            },
        },
        {
          kind: 'practice',
          title: 'Uygulayalım: ortalama, ortanca, açıklık',
          intro: [
            'Uygulayalım: aşağıdaki alıştırmaları defterinde çöz, sonra cevabını ve gerekçeni yaz.',
          ],
          questions: [
            Object.assign(q('$15, 12, 18, 20, 15$ verisinin ortalamasını, ortancasını ve açıklığını bul.',
              'Önce sırala: $12, 15, 15, 18, 20$.',
              'Ortalama $80 \\div 5 = 16$; ortanca $15$; açıklık $20 - 12 = 8$.'), {
              figure: { type: 'veri-nokta', options: { values: [15, 12, 18, 20, 15], max: 22, unit: 'puan' } },
            }),
            Object.assign(q('Ortalaması $14$ olan $5$ verinin toplamı kaçtır?',
              'Ortalama = toplam ÷ veri sayısı.',
              '$5 \\cdot 14 = 70$.'), {
              figure: { type: 'veri-nokta', options: { values: [10, 12, 14, 16, 18], max: 20, unit: 'puan' } },
            }),
            Object.assign(q('$8, 10, 10, 12, 15$ verisine $40$ eklenirse ortalama ve ortanca nasıl değişir?',
              'Uç değerin iki ölçüye etkisini karşılaştır.',
              'Ortalama $11$’den $15{,}83$’e çıkar; ortanca $10$’dan $10{,}5$’e. Ortalama çok, ortanca az etkilenir.'), {
              figure: { type: 'veri-nokta', options: { values: [8, 10, 10, 12, 15, 40], max: 42, unit: 'puan' } },
            }),
            Object.assign(q('Yandaki veride ortanca kaçtır?',
              'Sıralı listede ortadaki iki değerin ortalamasını al.',
              'Ortadaki $11$ ve $13$: ortanca $12$.'), {
              figure: { type: 'veri-nokta', options: { values: [7, 9, 11, 13, 15, 20], max: 22, unit: 'puan' } },
            }),
          ],
        },
        {
          kind: 'problem',
          title: 'TÜİK nüfus verisi',
          context: [
            'Bir araştırmacı, beş ilin nüfusunu (bin kişi) inceliyor: $2600, 1800, 1500, 900, 5600$.',
            'Yandaki şekilde bu beş değer sayı doğrusunda işaretli.',
          ],
          steps: [
            step('Anla', 'Ortalama ve ortanca istendiğinde önce sıralama gerekir.'),
            step('Planla', 'Sırala → ortadaki değeri al → toplamı veri sayısına böl.'),
            step('Çöz', 'Sıralı: $900, 1500, 1800, 2600, 5600$. Ortanca $1800$. Ortalama $12\\,400 \\div 5 = 2480$.'),
            step('Kontrol', 'Ortalama ortancadan büyük; $5600$ uç değeri ortalamayı yukarı çekmiş.'),
          ],
          figure: { type: 'veri-nokta', options: { values: [900, 1500, 1800, 2600, 5600], max: 6000, unit: 'bin kişi' } },
          result: 'Ortanca $1800$ bin, ortalama $2480$ bin kişi; uç değer ortalamayı yukarı çekiyor.',
        },
      ],
      performance: {
        title: 'İklim verilerini yorumlama',
        context: [
          'Bir ilin yıllık ortalama sıcaklık ve yağış verilerinden yararlanarak iklim özelliklerini yorumla.',
        ],
        tasks: [
          'Seçtiğin ilin son beş yıla ait aylık ortalama sıcaklık verisini tabloya geçir.',
          'Veriyi sütun veya çizgi grafiğine dönüştür; eksenleri adlandır.',
          'Ortalama, ortanca ve açıklığı hesapla.',
          'Grafikten çıkardığın üç sonucu kısa bir metinle yaz.',
        ],
        criteria: [
          'Grafiğin eksenlerinin doğru adlandırılması',
          'Ortalama, ortanca ve açıklığın doğru hesaplanması',
          'Yorumun veriye dayanması',
        ],
      },
    },

    /* ------------------------------------------------------------------ 13 */
    13: {
      pages: '176–200',
      bookTopic: 'Veri Analizi: Grafikler · Ortalama Mutlak Sapma · Karşılaştırma',
      stages: [
        {
          kind: 'warmup',
          title: 'Araç yakıt tüketimi',
          context: [
            'Bir aracın $100$ km’de tükettiği yakıt, $8$ ölçümde şöyle kaydediliyor (L): $6{,}2; 6{,}8; 7{,}1; 6{,}5; 13{,}4; 6{,}9; 7{,}0; 6{,}6$.',
          ],
          questions: [
            Object.assign(q('Sekiz ölçümün ortalaması kaç litredir?',
              'Toplamı $8$’e böl: toplam $60{,}5$.',
              '$60{,}5 \\div 8 \\approx 7{,}56$ L.'), {
              figure: { type: 'veri-nokta', options: { values: [6.2, 6.8, 7.1, 6.5, 13.4, 6.9, 7.0, 6.6], max: 14, unit: 'L' } },
            }),
            Object.assign(q('$13{,}4$ değeri neden şüpheli?',
              'Diğer ölçümlerle karşılaştır.',
              'Diğerleri $6$–$7$ aralığında; bu değer iki katına yakın. Ölçüm hatası olabilir.'), {
              figure: { type: 'veri-nokta', options: { values: [6.2, 6.8, 7.1, 6.5, 13.4, 6.9, 7.0, 6.6], max: 14, unit: 'L' } },
            }),
            Object.assign(q('$13{,}4$ çıkarılırsa yeni ortalama kaç litre olur?',
              'Yeni toplam $47{,}1$, veri sayısı $7$.',
              '$47{,}1 \\div 7 \\approx 6{,}73$ L.'), {
              figure: { type: 'veri-nokta', options: { values: [6.2, 6.8, 7.1, 6.5, 6.9, 7.0, 6.6], max: 14, unit: 'L' } },
            }),
          ],
        },
        {
          kind: 'start',
          title: 'Uzun atlama dereceleri',
          context: [
            'Bir sporcunun altı atlayışı (m): $5{,}80; 5{,}95; 6{,}10; 5{,}70; 6{,}05; 5{,}90$.',
          ],
          questions: [
            Object.assign(q('Altı atlayışın ortancası kaç metredir?',
              'Sırala; ortadaki iki değerin ortalamasını al.',
              '$(5{,}90 + 5{,}95) \\div 2 = 5{,}925$ m.'), {
              figure: { type: 'veri-nokta', options: { values: [5.80, 5.95, 6.10, 5.70, 6.05, 5.90], max: 6.2, unit: 'm' } },
            }),
            Object.assign(q('Açıklık kaç metredir?',
              'En büyük $6{,}10$, en küçük $5{,}70$.',
              '$6{,}10 - 5{,}70 = 0{,}40$ m.'), {
              figure: { type: 'veri-nokta', options: { values: [5.80, 5.95, 6.10, 5.70, 6.05, 5.90], max: 6.2, unit: 'm', mark: 'range' } },
            }),
            Object.assign(q('Sporcunun dereceleri istikrarlı mı?',
              'Açıklık küçükse atlayışlar birbirine yakın.',
              'Açıklık $40$ cm; altı atlayış birbirine yakın, istikrarlı sayılır.'), {
              figure: { type: 'veri-nokta', options: { values: [5.80, 5.95, 6.10, 5.70, 6.05, 5.90], max: 6.2, unit: 'm' } },
            }),
          ],
        },
        {
          kind: 'learn',
          title: 'Grafik türleri ve ortalama mutlak sapma',
          checks: [
            q('Daire grafiğinde $\\%25$’lik dilimin merkez açısı kaç derecedir?',
              '$360$’ın dörtte biri.',
              '$90^\\circ$.',
              { type: 'daire-dilim', options: { percent: 25, solve: false } }),
            q('Ortalaması $10$ olan $8, 10, 12$ verisinde ortalama mutlak sapma kaçtır?',
              'Farkların mutlak değerlerinin ortalaması.',
              '$(2+0+2) \\div 3 \\approx 0{,}67$.',
              { type: 'sapma', options: {  } }),
          ],
          blocks: [
            {
              heading: 'Sütun, çizgi ve daire grafiği',
              paragraphs: [
                '**Sütun grafiği** kategorileri karşılaştırır; sütun yüksekliği sıklığı gösterir ve dikey eksen sıfırdan başlar.',
                '**Çizgi grafiği** zaman içindeki değişimi gösterir; noktalar çizgiyle birleştirilir.',
                '**Daire grafiği** bir bütünün parçalarını gösterir; her dilimin merkez açısı $360^\\circ$’lik tam açının o payı kadardır.',
              ],
              scene: {
                type: 'ortalama',
                params: [
                  { name: 'a', label: '1. puan', min: 0, max: 100, step: 10, value: 60 },
                  { name: 'b', label: '2. puan', min: 0, max: 100, step: 10, value: 70 },
                  { name: 'c', label: '3. puan', min: 0, max: 100, step: 10, value: 80 },
                  { name: 'd', label: '4. puan', min: 0, max: 100, step: 10, value: 90 },
                ],
              },
            },
            {
              heading: 'Daire grafiğinde açı hesabı',
              paragraphs: [
                'Bir dilimin merkez açısı $= 360^\\circ \\times \\frac{\\text{dilimin değeri}}{\\text{toplam}}$.',
                'Örneğin bir gölde su yüzeyi alanı $\\%44$ azalmışsa bu, daire grafiğinde $360 \\cdot 0{,}44 = 158{,}4^\\circ$’lik bir dilimdir.',
              ],
              figure: { type: 'daire-dilim', options: { percent: 44, solve: true } },
            },
            {
              heading: 'Ortalama mutlak sapma',
              paragraphs: [
                'Her verinin ortalamadan ne kadar uzaklaştığını gösteren ölçüdür. Adımlar: ortalamayı bul → her verinin ortalamadan farkının mutlak değerini al → bu değerlerin ortalamasını bul.',
                'Ortalama mutlak sapma küçükse veriler ortalamaya yakın, yani daha tutarlıdır.',
              ],
              figure: { type: 'sapma', options: {} },
            },
          ],
          boxes: [
            { title: 'Grafik seçimi', body: 'Karşılaştırma → sütun · Değişim → çizgi · Bütünün parçaları → daire.' },
            { title: 'Daire grafiği', body: 'Merkez açı = 360° × (parça ÷ toplam).' },
            { title: 'Ortalama mutlak sapma', body: '(Σ|veri − ortalama|) ÷ veri sayısı.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Grafik türü ve yorum',
          items: [
            Object.assign(q('$6$ saatlik bir günde sıcaklıklar $12, 15, 18, 21, 19, 14$ °C ise hangi grafik türü uygundur?',
              'Zaman içinde değişim mi, kategori karşılaştırması mı?',
              'Çizgi grafiği: saatler boyunca değişim gösterilir. Sütun grafiği kategorileri karşılaştırır.'), {
              figure: { type: 'sutun-grafik', options: { values: [12, 15, 18, 21, 19, 14], names: ["12:00","13:00","14:00","15:00","16:00","17:00"] } },
            }),
            Object.assign(q('Daire grafiğinde bir dilim $90^\\circ$ ise bütünün kaçta kaçıdır?',
              '$360^\\circ$ tamamıdır.',
              '$90/360 = 1/4$’ü.'), {
              figure: { type: 'daire-dilim', options: { percent: 25, solve: false } },
            }),
            Object.assign(q('Yandaki daire grafiğinde $\\%30$’luk dilimin merkez açısı kaç derecedir?',
              '$360 \\cdot 0{,}30$.',
              '$108^\\circ$.'), {
              figure: { type: 'daire-dilim', options: { percent: 30, solve: false } },
            }),
            Object.assign(q('Ortalama mutlak sapması $0{,}4$ olan grup mu, $2{,}1$ olan grup mu daha tutarlıdır?',
              'Küçük sapma verilerin ortalamaya yakın olduğunu gösterir.',
              '$0{,}4$ olan grup: veriler ortalamaya daha yakın, dolayısıyla daha tutarlı.'), {
              figure: { type: 'sapma', options: {} },
            }),
          ],
        },
        {
          kind: 'explore',
          title: 'Aynı veri, iki grafik: eksen yanıltır mı?',
          intro: [
            'Her soru kendi grafiğini gösteriyor. Sütunların yüksekliğini eksendeki birimlerle karşılaştır.',
            'Sahnedeki “eksen” sürgüsü dikey eksenin sıfırdan mı yoksa $2$’den mi başladığını belirler.',
          ],
          materials: 'Aşağıdaki grafik sahnesi, kareli kâğıt, cetvel',
          steps: [
            Object.assign(q('Yandaki grafikte eksen sıfırdan başlıyor. En yüksek sütun kaç birimdir?',
              'Sütunun tepesini soldaki eksenden oku.',
              'En yüksek sütun $6$ birim.'), {
              figure: { type: 'sutun-grafik', options: { values: [5, 3, 6], names: ["1. grup","2. grup","3. grup"] } },
            }),
            Object.assign(q('Eksen $2$’den başladığında aynı veride $6$ ile $3$ arasındaki fark nasıl görünür?',
              'Kırpılan eksende $3$ birimlik fark, çizimde neredeyse iki katına çıkar.',
              'Fark olduğundan çok daha büyük görünür; oysa veri değişmedi.'), {
              figure: { type: 'sutun-grafik', options: { values: [5, 3, 6], names: ["1. grup","2. grup","3. grup"] } },
            }),
            Object.assign(q('Üç grubun ortalaması kaçtır?',
              'Toplam $5 + 3 + 6 = 14$; veri sayısı $3$.',
              '$14 \\div 3 \\approx 4{,}67$.'), {
              figure: { type: 'sutun-grafik', options: { values: [5, 3, 6], names: ["1. grup","2. grup","3. grup"] } },
            }),
            Object.assign(q('Hangi ölçü uç değerden daha az etkilenir?',
              'Uç değer sıralamada nereye düşer?',
              'Ortanca: yalnız sıralı veride ortadaki değere bakıldığı için uç değerden etkilenmez.'), {
              figure: { type: 'veri-nokta', options: { values: [3, 5, 6, 7, 40], max: 42, unit: 'puan' } },
            }),
            q('Sahnedeki grafikte eksen sürgüsünü değiştir: hangi ölçek yanıltıcı?',
              'İki ölçekte sütun yüksekliklerinin oranını karşılaştır.',
              'Eksen kırpıldığında sütunlar arasındaki fark abartılır; sıfırdan başlayan eksen doğru okunur.'),
          ],
          scene: {
              type: 'veri-grafik',
              params: [
                  { name: 'a', label: '1. grup', min: 1, max: 8, step: 1, value: 5 },
                  { name: 'b', label: '2. grup', min: 1, max: 8, step: 1, value: 3 },
                  { name: 'c', label: '3. grup', min: 1, max: 8, step: 1, value: 6 },
                  { name: 'eksen', label: 'Eksen: 1 sıfırdan, 0 kırpılmış', min: 0, max: 1, step: 1, value: 0 },
                ],
            },
        },
        {
          kind: 'practice',
          title: 'Uygulayalım: grafik ve sapma',
          intro: [
            'Uygulayalım: aşağıdaki alıştırmaları defterinde çöz, sonra cevabını ve gerekçeni yaz.',
          ],
          questions: [
            Object.assign(q('$120$ kişilik bir grupta $30$ kişi futbolu seçti. Daire grafiğindeki dilimin merkez açısı kaç derecedir?',
              '$360 \\cdot \\frac{30}{120}$; pay $\\%25$.',
              '$360 \\cdot 0{,}25 = 90^\\circ$.'), {
              figure: { type: 'daire-dilim', options: { percent: 25, solve: false } },
            }),
            Object.assign(q('$4, 6, 8$ verisinin ortalamasını ve ortalama mutlak sapmasını bul.',
              'Ortalama $6$; her verinin farkını al: $2$, $0$, $2$.',
              'Ortalama $6$; ortalama mutlak sapma $(2 + 0 + 2) \\div 3 \\approx 0{,}67$.'), {
              figure: { type: 'veri-nokta', options: { values: [4, 6, 8], max: 10, unit: 'puan' } },
            }),
            Object.assign(q('Yandaki sütun grafiğinin ekseni sıfırdan başlamazsa ne tür bir yanıltma olur?',
              'Küçük farklar nasıl görünür?',
              'Küçük farklar büyük görünür; karşılaştırma yanıltıcı olur.'), {
              figure: { type: 'sutun-grafik', options: { values: [5, 3, 6], names: ["1. grup","2. grup","3. grup"] } },
            }),
            Object.assign(q('$10, 12, 14, 16, 18$ verisinin ortalaması ve ortanca değeri kaçtır?',
              'Toplamı böl; ortadaki veriyi oku.',
              'Ortalama $70 \\div 5 = 14$; ortanca $14$.'), {
              figure: { type: 'veri-nokta', options: { values: [10, 12, 14, 16, 18], max: 20, unit: 'puan' } },
            }),
          ],
        },
        {
          kind: 'problem',
          title: '“Su içmek zararlı!” haberi',
          context: [
            'Bir haberde “Su içenlerin $\\%60$’ı hastalanmıştır.” deniyor. Araştırmanın ayrıntısı verilmiyor.',
            'Yandaki daire grafiği haberin sunduğu oranı gösteriyor; merkez açısını sen hesapla.',
          ],
          steps: [
            step('Anla', 'Yüzde bilgisi tek başına neden-sonuç göstermez.'),
            step('Planla', 'Karşılaştırma grubu var mı, örneklem kaç kişi, ölçüm nasıl yapılmış? Sor.'),
            step('Çöz', 'Toplumun tamamı da su içiyor. Su içmeyenlerle karşılaştırma yapılmadıysa yüzde anlamsızdır. Daire grafiğinde $\\%60$ dilimi $360 \\cdot 0{,}6 = 216^\\circ$’dir.'),
            step('Kontrol', 'Sonuç, örneklem ve karşılaştırma grubu bilgisi olmadan genellenemez.'),
          ],
          figure: { type: 'daire-dilim', options: { percent: 60, solve: false } },
          result: 'Haber, karşılaştırma grubu ve örneklem bilgisi olmadan bir sonuç göstermez; $\\%60$ dilimi $216^\\circ$’dir.',
        },
      ],
      performance: {
        title: 'Beslenme etiketlerini karşılaştırma',
        context: [
          'İki farklı gıda ürününün besin etiketindeki değerleri karşılaştırarak bir öneri hazırla.',
        ],
        tasks: [
          'İki ürünün 100 gramındaki enerji, şeker ve protein değerlerini tabloya yaz.',
          'Her iki ürün için ortalama ve açıklığı hesapla.',
          'İki ürünü ortalama mutlak sapma ile karşılaştır; hangisi daha tutarlı?',
          'Hangi ürünü neden önerdiğini üç cümleyle açıkla.',
        ],
        criteria: [
          'Tabloların eksiksiz doldurulması',
          'Ölçülerin doğru hesaplanması',
          'Önerinin veriye dayanması',
        ],
      },
    },

    /* ------------------------------------------------------------------ 14 */
    14: {
      pages: '201–210',
      bookTopic: 'Yansıma ve Simetri',
      stages: [
        {
          kind: 'warmup',
          title: 'Yatay ve dikey simetri',
          context: [
            'Kareli kâğıda çizilmiş bir şekil, yatay veya dikey bir doğruya göre simetrik olabilir. Şeklin her noktasının doğruya uzaklığı, görüntüsünün uzaklığına eşittir.',
          ],
          questions: [
            q('Bir şekil yatay bir doğruya göre yansıtılırsa ne değişir?',
              'Yukarı-aşağı konum.',
              'Şekil aşağı-yukarı ters döner; sağ-sol konumu korunur.',
              { type: 'koordinat-duzlem', options: { points: [[2, 4, 'A']], lines: [{ kind: 'horizontal', at: 2, label: 'y = 2' }], xmin: -1, xmax: 5, ymin: -1, ymax: 6 } }),
            q('Dikey doğruya göre yansımada ne değişir?',
              'Sağ-sol konum.',
              'Şekil sağ-sol ters döner; yükseklik korunur.',
              { type: 'koordinat-duzlem', options: { points: [[2, 3, 'A']], lines: [{ kind: 'vertical', at: 3, label: 'x = 3' }], xmin: -1, xmax: 6, ymin: -1, ymax: 5 } }),
            q('Yansımada şeklin boyutu değişir mi?',
              'Uzaklıklar korunur mu?',
              'Değişmez; şekil ile görüntüsü eştir.',
              { type: 'yonelim', options: {} }),
          ],
        },
        {
          kind: 'start',
          title: 'Harflerde, sayılarda ve logolarda simetri',
          context: [
            'Bazı harfler dikey doğruya göre simetriktir: $A, H, M, O, T, U, V, W, X, Y$. Bazıları yatay doğruya göre: $B, C, D, E, H, I, K, O, X$.',
          ],
          questions: [
            q('$H$ harfi kaç simetri doğrusuna sahiptir?',
              'Yatay ve dikey doğruyu dene.',
              'İki: biri yatay, biri dikey.',
              { type: 'harf-simetri', options: { letter: 'H' } }),
            q('$F$ harfi neden simetrik değildir?',
              'Hangi doğruyu denersen dene karşı taraf boş kalıyor mu?',
              'Katlanınca iki parça üst üste gelmez; hiçbir simetri doğrusu yoktur.',
              { type: 'harf-simetri', options: { letter: 'F' } }),
            q('Doğada ve sanatta simetriye iki örnek ver.',
              'Yaprak, kelebek, halı motifi…',
              'Kelebek kanatları dikey doğruya göre; halı motifleri hem yatay hem dikey doğruya göre simetrik olabilir.',
              { type: 'simetri-dogrusu', options: {} }),
          ],
        },
        {
          kind: 'learn',
          title: 'Simetri doğrusu ve yansıma',
          checks: [
            q('$B(4, 1)$ noktasının $x$ eksenine göre görüntüsü nedir?',
              '$(x, y) \\to (x, -y)$.',
              '$(4, -1)$.',
              { type: 'koordinat-duzlem', options: { points: [[4, 1, 'B']], xmin: -1, xmax: 6, ymin: -3, ymax: 4, note: 'B noktası ve x ekseni; görüntüsü nerede?' } }),
            q('Karenin kaç simetri doğrusu vardır?',
              'İki kenar ortası, iki köşegen.',
              '$4$.',
              { type: 'duzgun-cokgen', options: { sides: 4 } }),
            q('Düzgün beşgenin kaç simetri doğrusu vardır?',
              'Her köşeden geçen bir doğru dene; karşı kenarı ortalıyor mu?',
              '$5$ simetri doğrusu vardır.',
              { type: 'duzgun-cokgen', options: { sides: 5 } }),
            q('Dikdörtgenin köşegeni neden simetri doğrusu değildir?',
              'Köşegene göre katlandığında kenarlar üst üste gelir mi?',
              'Köşegen boyunca katlanınca kısa ve uzun kenarlar çakışmaz; görüntü şeklin üstüne oturmaz.',
              { type: 'koordinat-duzlem', options: { segments: [[1, 1, 5, 1], [5, 1, 5, 3], [5, 3, 1, 3], [1, 3, 1, 1], [1, 1, 5, 3]], xmin: 0, xmax: 6, ymin: 0, ymax: 4, note: 'Dikdörtgen ve köşegeni: katlayınca çakışır mı?' } }),
          ],
          blocks: [
            {
              heading: 'Simetri aynası ve asetat kâğıdı',
              paragraphs: [
                'Bir şeklin simetri doğrusunu bulmak için şeklin üzerine asetat kâğıdı koyup katlanır; iki parça üst üste geliyorsa katlama çizgisi simetri doğrusudur.',
                'Simetri aynası, aynı yöntemin araçla yapılmış hâlidir: ayna şeklin yarısına yerleştirilir, aynadaki görüntü şekli tamamlıyorsa ayna doğrusu bir simetri doğrusudur.',
              ],
              figure: { type: 'simetri-dogrusu', options: {} },
            },
            {
              heading: 'Yansımanın özellikleri',
              paragraphs: [
                'Simetri doğrusu, karşılıklı noktaları birleştiren parçaları **dik ortalar**. Yani her nokta ile görüntüsü aynı uzaklıkta ve birleştiren doğru simetri doğrusuna diktir.',
                'Şekil ile görüntüsü **eştir**: kenar uzunlukları ve açı ölçüleri korunur, yalnız yönelim ters döner.',
                'Koordinatlarda $x$ eksenine göre yansımada $(x, y) \\to (x, -y)$; $y$ eksenine göre $(x, y) \\to (-x, y)$; $x = k$ doğrusuna göre $(x, y) \\to (2k - x, y)$ olur.',
              ],
              figure: { type: 'yansima', options: {} },
            },
            {
              heading: 'Gizlenmiş simetri doğrusu',
              paragraphs: [
                'Çoğu şekilde simetri doğrusu görünmez; şekil tamamlanmamış ya da motif tekrarıyla oluşmuş olabilir.',
                'Halı ve kilim motiflerinde tekrar eden desenler, eksik parçayı tamamlayarak gizli simetri doğrularını ortaya çıkarır.',
              ],
            },
            {
              heading: 'Koordinat ve simetri doğrusu sayısı',
              paragraphs: [
                'Bir şeklin simetri doğrusu sayısı, şekli kendine eşleyen ayna doğrularının sayısıdır: karede $4$, dikdörtgende $2$, eşkenar üçgende $3$, düzgün beşgende $5$.',
                'Sahnede ayna doğrusunu $15°$ adımlarla çevir. Görüntü şeklin üstüne oturduğunda o açı bir simetri doğrusudur; şekli değiştirip doğru sayısını yeniden bul.',
              ],
              scene: {
                type: 'simetri-dogru',
                params: [
                  { name: 'sekiz', label: 'Şekil', min: 1, max: 4, step: 1, value: 1 },
                  { name: 'aci', label: 'Ayna doğrusu (derece)', min: 0, max: 180, step: 15, value: 0 },
                ],
              },
            },
          ],
          boxes: [
            { title: 'Tanım', body: 'Simetri doğrusu, karşılıklı noktaları birleştiren parçaları dik ortalar.' },
            { title: 'Eşlik', body: 'Şekil ile görüntüsü eştir; uzunluklar ve açılar korunur, yönelim ters döner.' },
            { title: 'Koordinat', body: 'x = k doğrusuna göre: (x, y) → (2k − x, y).' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Yansımada ne korunur?',
          items: [
            q('$A(3, 2)$ noktasının $x = 1$ doğrusuna göre görüntüsü hangi noktadır?',
              '$2k - x$ kuralını uygula.',
              '$(2 \\cdot 1 - 3, 2) = (-1, 2)$.',
              { type: 'koordinat-duzlem', options: { points: [[3, 2, 'A']], lines: [{ kind: 'vertical', at: 1, label: 'x = 1' }], xmin: -2, xmax: 5, ymin: -1, ymax: 4 } }),
            q('Bir üçgenin yansımasında açı ölçüleri değişir mi?',
              'Eşlik neyi korur?',
              'Değişmez; açılar ve kenar uzunlukları korunur.',
              { type: 'yonelim', options: {} }),
            q('Bir şeklin birden fazla simetri doğrusu olabilir mi?',
              'Kare ve eşkenar üçgeni düşün.',
              'Olabilir; karede $4$, eşkenar üçgende $3$ simetri doğrusu vardır.',
              { type: 'duzgun-cokgen', options: { sides: 3 } }),
          ],
        },
        {
          kind: 'explore',
          title: 'Halı ve kilim motifleri',
          materials: 'Kareli kâğıt, renkli kalemler',
          intro: [
            'Anadolu kilimlerinde motifler bir simetri doğrusuna göre tekrar eder. Kareli kâğıda bir motifin yarısını çiz, diğer yarısını tamamla.',
          ],
          steps: [
            q('Motifin eksik yarısını çizerken hangi noktaları kullandın?',
              'Her noktanın doğruya uzaklığı eşit olmalı.',
              'Karşılıklı noktalar doğruya dik ve eşit uzaklıkta olacak biçimde taşınır.'),
            q('Motifin kaç simetri doğrusu var?',
              'Yatay, dikey ve çapraz doğruları dene.',
              'Motifin türüne göre değişir; çoğu kilim motifinde $2$ veya $4$ simetri doğrusu bulunur.'),
            q('Simetriği bozan tek bir kare ekle; neden bozulduğunu açıkla.',
              'Katlayınca üst üste gelmiyor mu?',
              'Eşi olmayan kare, katlamada karşılıksız kalır; simetri doğrusu artık geçerli değildir.'),
          ],
          scene: {
            type: 'yansima',
            params: [{ name: 'k', label: 'Ayna doğrusu (x = k)', min: -1, max: 2, step: 1, value: 1 }],
          },
        },
        {
          kind: 'practice',
          title: 'Uygulayalım: yansıma çizimleri',
          intro: [
            'Uygulayalım: aşağıdaki alıştırmaları defterinde çöz, sonra cevabını ve gerekçeni yaz.',
          ],
          questions: [
            q('$A(3, 4)$ noktasının $x$ eksenine ve $y$ eksenine göre görüntülerini yaz.',
              '$x$ ekseni: $(x, -y)$; $y$ ekseni: $(-x, y)$.',
              '$x$ eksenine göre $(3, -4)$; $y$ eksenine göre $(-3, 4)$.',
              { type: 'koordinat-duzlem', options: { points: [[3, 4, 'A']], xmin: -4, xmax: 4, ymin: -4, ymax: 5 } }),
            q('$K(-2, 1)$ noktasının $x = 2$ doğrusuna göre görüntüsü nedir?',
              '$(2k - x, y)$.',
              '$(2 \\cdot 2 - (-2), 1) = (6, 1)$.',
              { type: 'koordinat-duzlem', options: { points: [[-2, 1, 'K']], lines: [{ kind: 'vertical', at: 2, label: 'x = 2' }], xmin: -3, xmax: 7, ymin: -1, ymax: 3 } }),
            q('Bir şeklin yansımasında kenar uzunluğu $7$ cm ise görüntüsünde kaç cm olur?',
              'Yansıma eşlik dönüşümüdür.',
              '$7$ cm; uzunluklar korunur.',
              { type: 'yonelim', options: {} }),
          ],
        },
        {
          kind: 'problem',
          title: 'Gizlenmiş bir simetri doğrusu var mı?',
          context: [
            'Bir kurumun logosunda bir şekil parçası silinmiş. Logonun simetrik olduğu biliniyor.',
          ],
          steps: [
            step('Anla', 'Simetri doğrusu, karşılıklı noktaları dik ortalar.'),
            step('Planla', 'Var olan nokta çiftlerini birleştir, her parçanın orta noktasını bul.'),
            step('Çöz', 'Orta noktalar aynı doğru üzerinde toplanıyorsa simetri doğrusu bu doğrudur. Örneğin $A(1,4)$ ile $A\'(5,4)$ için doğru $x = 3$’tür.'),
            step('Kontrol', 'Bulduğun doğruya göre bir nokta seç, görüntüsü şekilde var mı diye bak.'),
          ],
          result: 'Simetri doğrusu, eşleşen nokta çiftlerinin orta noktalarından geçen doğrudur.',
        },
      ],
      performance: {
        title: 'Bayraklarda yansıma',
        context: [
          'Ülke bayraklarını incele: hangileri yatay, hangileri dikey doğruya göre simetrik?',
        ],
        tasks: [
          'Üç ülke bayrağı seç ve simetri doğrularını çiz.',
          'Yatay ve dikey doğruya göre simetrik olan bir bayrak bul.',
          'Bir bayrağın yarısını kareli kâğıda çizip diğer yarısını tamamla.',
          'Bulgularını tablo ve kısa bir sunumla paylaş.',
        ],
        criteria: [
          'Simetri doğrularının doğru çizilmesi',
          'Yansımanın nokta nokta gösterilmesi',
          'Tablo ve sunum düzeni',
        ],
      },
    },

    /* ------------------------------------------------------------------ 15 */
    15: {
      pages: '211–217',
      bookTopic: 'Orta Dikme ve Açıortay',
      stages: [
        {
          kind: 'warmup',
          title: 'Eşit uzaklıktaki noktalar',
          context: [
            'İki direk arasına bir sokak lambası yerleştirilecek. Lamba, iki direğe eşit uzaklıkta olacak.',
          ],
          questions: [
            q('Lamba nereye konmalıdır?',
              'İki noktaya eşit uzaklıktaki noktalar hangi doğru üzerindedir?',
              'Direkleri birleştiren parçanın orta dikmesi üzerine.',
              { type: 'koordinat-duzlem', options: { points: [[1, 2, 'A'], [5, 2, 'B']], segments: [[1, 2, 5, 2, 'AB']], xmin: -1, xmax: 7, ymin: -1, ymax: 5, note: 'Lamba iki direğe eşit uzaklıkta olacak.' } }),
            q('Kaç farklı konum mümkündür?',
              'Bir doğru üzerindeki noktalar.',
              'Sonsuz; orta dikme doğrusunun her noktası eşit uzaklıktadır.',
              { type: 'koordinat-duzlem', options: { points: [[1, 2, 'A'], [5, 2, 'B']], segments: [[1, 2, 5, 2, 'AB']], xmin: -1, xmax: 7, ymin: -1, ymax: 5, note: 'Eşit uzaklıktaki noktalar kaç tanedir?' } }),
          ],
        },
        {
          kind: 'start',
          title: 'Pergel ve ölçüsüz cetvel',
          context: [
            'Elinizde yalnızca pergel ve ölçüsüz bir cetvel var. Bir doğru parçasının orta noktasını bulmanız isteniyor.',
          ],
          questions: [
            q('Pergeli neden iki kez farklı merkezlerde kullanırız?',
              'Her yay bir dairedir; iki dairenin kesişimi?',
              'İki eşit yarıçaplı dairenin kesişim noktaları uçlara eşit uzaklıktadır; orta dikme bu noktalardan geçer.',
              { type: 'insa', options: {} }),
            q('Orta dikme çizildiğinde ne bulunmuş olur?',
              'Doğru parçasını hangi noktada keser?',
              'Parçanın orta noktasında dik keser; parça iki eş parçaya ayrılır.',
              { type: 'ortadikme', options: {} }),
          ],
        },
        {
          kind: 'learn',
          title: 'Orta dikme ve açıortay',
          checks: [
            q('Açıortay üzerindeki bir noktanın kenarlara uzaklığı neden eşittir?',
              'Oluşan iki dik üçgeni karşılaştır.',
              'Eş açı ve ortak kenar sayesinde dik uzaklıklar eşittir.',
              { type: 'aciortay', options: {} }),
            q('$|PA| = |PB|$ olan $P$ noktası hangi doğru üzerindedir?',
              'Uçlara eşit uzaklık.',
              '$AB$ doğru parçasının orta dikmesi üzerinde.',
              { type: 'ortadikme', options: {} }),
          ],
          blocks: [
            {
              heading: 'Orta dikme',
              paragraphs: [
                'Bir doğru parçasının orta noktasından geçen ve ona dik olan doğruya **orta dikme** denir.',
                'Orta dikme üzerindeki her nokta, parçanın uç noktalarına eşit uzaklıktadır. Tersi de doğrudur: uçlara eşit uzaklıktaki her nokta orta dikme üzerindedir.',
                'Pergel–cetvel inşası: pergel $A$ ve $B$ merkezli, yarıçapı $|AB|$’nin yarısından büyük eş yaylar çizilir; yayların kesiştiği iki noktayı birleştiren doğru orta dikmedir.',
              ],
              figure: { type: 'insa', options: {} },
            },
            {
              heading: 'Açıortay',
              paragraphs: [
                'Bir açıyı iki eş açıya bölen ışına **açıortay** denir.',
                'Açıortay üzerindeki her nokta, açının kenarlarına eşit uzaklıktadır.',
                'İnşa: açının köşesine pergel konur, kenarları kesen bir yay çizilir; kesişim noktalarından eş yarıçaplı yaylar çizilip kesişim köşeye birleştirilir.',
              ],
              scene: {
                type: 'aciortay',
                params: [{ name: 'aci', label: 'Açı ölçüsü (°)', min: 30, max: 150, step: 10, value: 80 }],
              },
            },
            {
              heading: 'Üçgende özel doğrular',
              paragraphs: [
                'Bir üçgenin kenar orta dikmeleri tek bir noktada kesişir; bu nokta üçgenin köşelerine eşit uzaklıktadır ve çevrel çemberin merkezidir.',
                'Bir daire diliminin simetri doğrusu, dilimin merkez açısının açıortayıdır.',
              ],
              figure: { type: 'aciortay', options: {} },
            },
          ],
          boxes: [
            { title: 'Orta dikme', body: 'Parçayı orta noktadan dik keser; üzerindeki her nokta uçlara eşit uzaklıktadır.' },
            { title: 'Açıortay', body: 'Açıyı iki eş açıya böler; üzerindeki her nokta kenarlara eşit uzaklıktadır.' },
            { title: 'İnşa', body: 'Yalnız pergel ve ölçüsüz cetvel kullanılır; eş yarıçaplı yayların kesişimi belirleyicidir.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Orta dikme ve eşit uzaklık',
          items: [
            q('$|PA| = |PB|$ olan bir $P$ noktası nerededir?',
              'Uçlara eşit uzaklık.',
              '$AB$’nin orta dikmesi üzerinde.',
              { type: 'ortadikme', options: {} }),
            q('Açıortay üzerindeki bir noktanın kenarlara uzaklığı neden eşittir?',
              'İki dik üçgen oluşur; eş açı ve ortak kenar.',
              'Açıortay, dik üçgenlerde eş açı ve ortak kenar sağlar; karşılık gelen dik uzaklıklar eşittir.',
              { type: 'aciortay', options: {} }),
            q('Bir daire diliminin simetri doğrusu neresidir?',
              'Dilimi ikiye katla.',
              'Merkez açının açıortayı.',
              { type: 'daire-dilim', options: { percent: 30, solve: false } }),
          ],
        },
        {
          kind: 'explore',
          title: 'Pergelle orta dikme çiz',
          materials: 'Pergel, ölçüsüz cetvel, kalem',
          intro: [
            'Sahnede $A$ ve $B$ noktaları veriliyor. Yalnız pergel ve ölçüsüz cetvelle bu parçanın orta dikmesini oluştur.',
            'Sürgülerle noktaları oynat; orta dikme her durumda parçayı dik kesiyor mu?',
          ],
          steps: [
            q('Yayların yarıçapı neden $|AB|$’nin yarısından büyük olmalı?',
              'Küçük yarıçapta yaylar kesişir mi?',
              'Küçük yarıçapta yaylar kesişmez; kesişim için yarıçap $|AB|/2$’den büyük olmalıdır.'),
            q('Orta dikme parçayı hangi noktada kesiyor?',
              'Cetvelle ölç.',
              'Tam orta noktada, dik olarak.'),
            q('Orta dikme üzerinde bir $P$ noktası işaretle; $|PA|$ ile $|PB|$’yi ölç.',
              'İki uzaklık eşit çıkmalı.',
              'Eşittir; bu, orta dikmenin tanımının doğrudan sonucudur.'),
          ],
          scene: {
            type: 'ortadikme',
            params: [
              { name: 'ax', label: 'A noktası (x)', min: 0, max: 4, step: 1, value: 2 },
              { name: 'by', label: 'B noktası (y)', min: 1, max: 5, step: 1, value: 4 },
            ],
          },
        },
        {
          kind: 'practice',
          title: 'Uygulayalım: orta dikme ve açıortay inşası',
          intro: [
            'Uygulayalım: aşağıdaki alıştırmaları defterinde çöz, sonra cevabını ve gerekçeni yaz.',
          ],
          questions: [
            q('$A(1, 2)$ ve $B(5, 2)$ noktalarına eşit uzaklıktaki noktalar hangi doğru üzerindedir?',
              'Orta dikme doğrusunu bul.',
              '$x = 3$ doğrusu üzerindedir.',
              { type: 'koordinat-duzlem', options: { points: [[1, 2, 'A'], [5, 2, 'B']], segments: [[1, 2, 5, 2, 'AB']], xmin: -1, xmax: 7, ymin: -1, ymax: 5 } }),
            q('Ölçüsü $70^\\circ$ olan bir açının açıortayı açıyı kaç derecelik iki açıya böler?',
              'Açıortay açıyı ikiye böler.',
              '$35^\\circ$ ve $35^\\circ$.',
              { type: 'aciortay', options: {} }),
            q('Orta dikme üzerinde bir $P$ noktası seçildiğinde neden $|PA| = |PB|$ olur?',
              'Tanımı hatırla.',
              'Orta dikmedeki her nokta uçlara eşit uzaklıktadır; bu, tanımın doğrudan sonucudur.',
              { type: 'ortadikme', options: {} }),
          ],
        },
        {
          kind: 'problem',
          title: 'Tema ölçme: altı üçgen',
          context: [
            'Altı üçgen veriliyor: $ABC$ çeşitkenar dik, $DEF$ ikizkenar, $GHI$ dar açılı çeşitkenar, $JKL$ geniş açılı, $MNO$ eşkenar. Her biri için simetri doğruları ve açıortaylar incelenecek.',
          ],
          steps: [
            step('Anla', 'Simetri doğrusu sayısı, üçgenin kenar ve açı eşliğine bağlıdır.'),
            step('Planla', 'Önce üçgen türünü belirle, sonra simetri doğrusu ve açıortay sayısını yaz.'),
            step('Çöz', 'Eşkenar üçgende $3$ simetri doğrusu ve $3$ eş açıortay; ikizkenarda $1$ simetri doğrusu (tepe açısının açıortayı aynı zamanda tabana ait orta dikmedir); çeşitkenarda hiç simetri doğrusu yoktur.'),
            step('Kontrol', 'Her simetri doğrusu, karşılıklı noktaları birleştiren parçayı dik ortalar mı? Katlayarak doğrula.'),
          ],
          result: 'Eşkenar $3$, ikizkenar $1$, çeşitkenar $0$ simetri doğrusu; açıortaylar her üçgende köşelere karşılık gelir.',
        },
      ],
      exam: {
        title: '4. tema ölçme ve değerlendirme',
        note: 'Yansıma, simetri doğrusu, orta dikme ve açıortay birlikte sorulur.',
        items: [
          q('$A(2, 5)$ noktasının önce $y$ eksenine, sonra $x = 3$ doğrusuna göre görüntüsünü bul.',
            '$y$ ekseni için $x$ işaret değiştirir; $x = k$ için $2k - x$ kuralı kullanılır.',
            '$y$ eksenine göre $(-2, 5)$; $x = 3$ doğrusuna göre $(2 \\cdot 3 - 2, 5) = (4, 5)$.',
            { type: 'koordinat-duzlem', options: { points: [[2, 5, 'A']], lines: [{ kind: 'vertical', at: 3, label: 'x = 3' }], xmin: -4, xmax: 7, ymin: 0, ymax: 6 } }),
          q('Bir üçgen yansıtıldığında kenar uzunlukları ve açıları değişir mi? Yönelimi ne olur?',
            'Yansıma bir eşlik dönüşümüdür.',
            'Uzunluklar ve açılar korunur, şekil ile görüntüsü eştir; yönelim ters döner.',
            { type: 'yonelim', options: {} }),
          q('Bir noktanın iki uca uzaklığı eşitse hangi doğru üzerindedir? Bu bilgi hangi sorularda işe yarar?',
            'Uçlara eşit uzaklık.',
            'Uçları birleştiren parçanın orta dikmesi üzerindedir; eşit uzaklık verilen inşa sorularında kullanılır.',
            { type: 'ortadikme', options: {} }),
          q('Bir daire diliminin simetri doğrusu neresidir?',
            'Dilimi ikiye katla.',
            'Merkez açının açıortayı.',
            { type: 'daire-dilim', options: { percent: 40, solve: false } }),
        ],
      },
    },
  });

  window.MATEMATIK_KITAP = Object.freeze({ weeks, STAGE });
})();
