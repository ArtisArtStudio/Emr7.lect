/* Matematik — kitabın kendi akışı.
   Her hafta MEB 7. sınıf ders kitabındaki sırayı izler:
   NELER BİLİYORUZ? → BAŞLAYALIM → ÖĞRENELİM (BİLGİ KUTUSU) → DÜŞÜN-TARTIŞ-AÇIKLA →
   KATIL-UYGULA-KEŞFET → UYGULAYALIM → PROBLEM → NELER ÖĞRENDİK? → TEMA ÖLÇME → PERFORMANS GÖREVİ.
   Bağlamlar kitaptaki gerçek durumlardan uyarlanmıştır (Deringöz, Seyahat Ederken Tasarruf Et,
   Yasemin'in adımı, Zehra Teyze'nin sirke şişeleri, Anıtkabir görünümleri…). */
(() => {
  'use strict';

  const q = (prompt, hint, thinking) => ({ prompt, hint: hint || '', thinking: thinking || '' });
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
          title: 'Her Sıfır (0) Aynı Başlangıcı mı Gösterir?',
          context: [
            'Gözde Öğretmen, “Sıfırın olmadığı bir sayı sistemi şu an bize çok uzak gelebilir; oysa tarihte sıfır en son kullanılmaya başlayan rakamdır.” diyerek derse başlar ve günlük hayattan örnekler ister.',
            'Öğrenciler şu örnekleri verir: telefonun şarjı $\\%0$, hava sıcaklığı $0\\,^{\\circ}\\mathrm{C}$, kart bakiyesi $0$ TL, deniz seviyesi $0$ m, maç skoru $0$–$0$.',
          ],
          questions: [
            q('Bu örneklerin hangilerinde sıfır “yokluk”, hangilerinde “başlangıç noktası” anlamındadır?',
              'Yokluk: sayılan bir şey kalmadığında. Başlangıç: ölçmenin sıfırdan başladığı durumda.',
              'Bakiye $0$ TL ve skor $0$–$0$ yokluk; deniz seviyesi ve $0\\,^{\\circ}\\mathrm{C}$ ise başlangıç noktasıdır. Telefon şarjı $\\%0$ yokluk sayılabilir.'),
            q('Hangi büyüklüklerin doğal başlangıç noktası vardır?',
              'Sıfırı “hiç yok” anlamında kullanabildiğin büyüklükleri düşün.',
              'Uzunluk, kütle, alan, hacim ve zamanın doğal başlangıcı vardır (hiç yok = $0$). Sıcaklığın doğal bir başlangıcı yoktur; $0\\,^{\\circ}\\mathrm{C}$ “sıcaklık yok” demek değildir.'),
          ],
        },
        {
          kind: 'learn',
          title: 'Tam sayılar: yön, sıfır ve sayı doğrusu',
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
              heading: 'Doğal sayılar neden yetmez?',
              paragraphs: [
                'Gerçek yaşamda bazı durumları yalnızca doğal sayılarla anlatamayız: deniz seviyesinin altı, borç, hava sıcaklığının sıfırın altına düşmesi. Bu durumlarda **yön** belirtmemiz gerekir.',
                'ASELSAN’ın geliştirdiği otonom su altı aracı **Deringöz** deniz seviyesinin $8$ m altında çalışıyor, araştırma ekibi ise deniz yüzeyinin $10$ m üstünde. Deniz seviyesini $0$ kabul edersek Deringöz $-8$, ekip $+10$ ile gösterilir.',
                'Bir sayının önüne konan **$+$** işareti sıfırın sağında, **$-$** işareti sıfırın solunda olduğunu söyler. Önünde işaret yazılmayan sayı pozitif kabul edilir.',
              ],
              scene: {
                type: 'sayi-dogrusu',
                params: [{ name: 'a', label: 'Sayı (a)', min: -7, max: 7, step: 1, value: 3 }],
              },
            },
            {
              heading: 'Sıfırın yeri',
              paragraphs: [
                'Sıfır ne pozitif ne negatif tam sayıdır; işareti yoktur. Sayı doğrusunda tam ortada, **başlangıç noktası** olarak durur.',
                'Tam sayılar; pozitif tam sayılar, sıfır ve negatif tam sayıların birleşiminden oluşur: $\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots$',
                'Sayı doğrusunda sağa gidildikçe sayılar büyür, sola gidildikçe küçülür. Bu yüzden $-7 < -3$’tür: $-7$ daha soldadır.',
              ],
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
            { title: 'Tam sayı', body: 'Pozitif tam sayılar, sıfır ve negatif tam sayıların birleşimidir. $\\mathbb{Z} = \\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}$' },
            { title: 'İşaret', body: 'Sıfırın sağındaki sayılar pozitif ($+$), solundaki sayılar negatiftir ($-$). Sıfırın işareti yoktur.' },
            { title: 'Sıralama', body: 'Sayı doğrusunda soldaki sayı küçük, sağdaki sayı büyüktür: $-9 < -4 < 0 < 4 < 12$.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Sıfırın anlamı ve sayı doğrusu',
          items: [
            q('Bir çekirge sayı doğrusunda $-5$ noktasından başlayıp eşit uzunlukta $6$ sıçrayışla $+7$ noktasına ulaşıyor. Her sıçrayış kaç birimdir?',
              'İki nokta arasındaki uzaklığı sıçrayış sayısına böl.',
              '$-5$ ile $+7$ arası $12$ birimdir; $12 \\div 6 = 2$ birim her sıçrayış.'),
            q('Zemin kat $0$ kabul edilen bir apartmanda otopark $2$ kat altta, sığınak otoparkın $1$ kat üstünde. Sığınak kaçıncı kattadır?',
              'Otopark $-2$ ise bir kat üstü hangi sayıdır?',
              'Otopark $-2$, sığınak $-2 + 1 = -1$ (yani $1$ kat bodrum).'),
            q('“$-9$, $-4$’ten küçüktür.” Bu cümleyi sayı doğrusunu kullanmadan nasıl açıklarsın?',
              'Sıfıra uzaklığı düşün: hangisi sıfırdan daha uzak?',
              '$-9$ sıfırdan $9$ birim, $-4$ ise $4$ birim uzaktır. Negatif sayıda uzaklık büyüdükçe değer küçülür, yani $-9 < -4$.'),
          ],
        },
        {
          kind: 'explore',
          title: 'Toplayarak sıfıra ulaşmak her zaman mümkün mü?',
          materials: 'Sayı doğrusu (aşağıdaki sahne), kalem, kâğıt',
          intro: [
            'Aykut, üzerinde $0, 1, 2, 3, 4$ yazan kartlarla bir oyun kuruyor: her turda istediği kartları seçip topluyor, istediği kadar toplama yapıyor.',
          ],
          steps: [
            q('Yalnız bu kartlarla toplama yaparak sıfıra ulaşabilir misin? Neden?',
              'Kartlarda negatif sayı var mı?',
              'Hayır. Bu kartlarla yapılan her toplama pozitif sonuç verir; sıfıra ulaşmak için negatif sayılar gerekir.'),
            q('Sıfıra ulaşabilmek için karta hangi sayıyı eklemelisin?',
              'Bir sayı ile tersini toplarsan ne olur?',
              'Her sayının ters işaretlisini eklemek gerekir: $3 + (-3) = 0$.'),
          ],
          scene: {
            type: 'sayi-dogrusu',
            params: [{ name: 'a', label: 'Kartın değeri', min: -7, max: 7, step: 1, value: 3 }],
          },
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
                type: 'kesir-serit',
                params: [
                  { name: 'd', label: 'Payda (kaç eş parça)', min: 2, max: 10, step: 1, value: 5 },
                  { name: 'n', label: 'Pay (kaç parça)', min: 0, max: 10, step: 1, value: 3 },
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
            'İpek, $\\frac{-9}{3}$, $\\frac{9}{-3}$ ve $-\\frac{9}{3}$ yazımlarını görünce kafası karışıyor. Öğretmen bu üç ifadeyi tahtaya yazıp sınıfa soruyor.',
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
            type: 'kesir-serit',
            params: [
              { name: 'd', label: 'Payda', min: 2, max: 8, step: 1, value: 4 },
              { name: 'n', label: 'Pay', min: 0, max: 8, step: 1, value: 2 },
            ],
          },
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
              '$1 \\div 5 = 0{,}2$ L.'),
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
            'İlknur Öğretmen sınıfa “$0{,}9999\\ldots$ devirli ondalık gösterimi $1$’e eşit midir?” diye soruyor. Sena “$1$’den küçüktür” diyor, Mete “$1$’e eşittir” diyor.',
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
            type: 'sayi-dogrusu',
            params: [{ name: 'a', label: 'Sıcaklık', min: -7, max: 7, step: 1, value: -4 }],
          },
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
            'Deniz Öğretmen, iki bölümden oluşan bir oyun oynatıyor. Doğru cevap puan kazandırıyor, yanlış cevap puan kaybettiriyor. Öğrencilerin bölüm puanları toplanarak oyun sonu puanı hesaplanıyor. Örnek puanlar: $(+7) + (+6) = +13$; $(-2) + (-4) = -6$; $(-5) + (-5) = -10$; $(+7) + (-4) = +3$.',
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
                  { name: 'a', label: 'Birinci sayı', min: -6, max: 6, step: 1, value: -4 },
                  { name: 'b', label: 'İkinci sayı', min: -6, max: 6, step: 1, value: 3 },
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
              scene: {
                type: 'kesir-toplam',
                params: [
                  { name: 'a', label: 'Birinci kesrin payı', min: 0, max: 2, step: 1, value: 1 },
                  { name: 'c', label: 'İkinci kesrin payı', min: 0, max: 3, step: 1, value: 1 },
                ],
              },
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
              { name: 'c', label: 'İkinci kesrin payı', min: 0, max: 3, step: 1, value: 2 },
            ],
          },
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
              scene: {
                type: 'kesir-carpim',
                params: [
                  { name: 'n1', label: 'Birinci kesrin payı', min: 1, max: 4, step: 1, value: 2 },
                  { name: 'd1', label: 'Birinci kesrin paydası', min: 2, max: 5, step: 1, value: 3 },
                  { name: 'n2', label: 'İkinci kesrin payı', min: 1, max: 4, step: 1, value: 3 },
                  { name: 'd2', label: 'İkinci kesrin paydası', min: 2, max: 5, step: 1, value: 4 },
                ],
              },
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
                'İşlem sırası: $1)$ üslü ifadeler, $2)$ parantez içi, $3)$ çarpma veya bölme, $4)$ toplama veya çıkarma.',
                'Aynı önceliğe sahip işlemler soldan sağa yapılır: $18 \\div 3 \\cdot 2 = 6 \\cdot 2 = 12$ (önce $3 \\cdot 2$ yapılırsa $3$ bulunur, bu yanlıştır).',
              ],
            },
          ],
          boxes: [
            { title: 'Bölme', body: 'a/b ÷ c/d = a/b · d/c. İkinci kesir ters çevrilip çarpılır.' },
            { title: 'Üslü ifade', body: 'a^n: a taban, n kuvvet. (−3)² = 9, −3² = −9.' },
            { title: 'İşlem sırası', body: 'Üslü → parantez → çarpma/bölme → toplama/çıkarma; aynı öncelikte soldan sağa.' },
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
          title: 'Sirke şişeleri',
          materials: 'Ölçü kabı, cetvel, kâğıt',
          intro: [
            'Zehra Teyze $6$ litre sirkeyi farklı hacimlerdeki şişelere dolduruyor. Amacı en az şişeyi kullanmak.',
          ],
          steps: [
            q('$\\frac{1}{2}$ litrelik şişe kullanırsa kaç şişe gerekir?',
              '$6 \\div \\frac{1}{2}$.',
              '$12$ şişe.'),
            q('$\\frac{3}{4}$ litrelik şişe kullanırsa kaç şişe gerekir?',
              '$6 \\div \\frac{3}{4} = 6 \\cdot \\frac{4}{3}$.',
              '$8$ şişe.'),
            q('$\\frac{2}{3}$ litrelik şişe kullanırsa kaç şişe gerekir?',
              '$6 \\div \\frac{2}{3} = 6 \\cdot \\frac{3}{2}$.',
              '$9$ şişe. En az şişe $\\frac{3}{4}$ litrelik seçenekte kullanılır.'),
          ],
          scene: {
            type: 'kesir-carpim',
            params: [
              { name: 'n1', label: 'Sirke (litre)', min: 1, max: 4, step: 1, value: 2 },
              { name: 'd1', label: '—', min: 2, max: 5, step: 1, value: 3 },
              { name: 'n2', label: 'Şişe payı', min: 1, max: 4, step: 1, value: 3 },
              { name: 'd2', label: 'Şişe paydası', min: 2, max: 5, step: 1, value: 4 },
            ],
          },
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
          materials: 'Kalem, kâğıt',
          intro: ['Aşağıdaki çözümlerde birer hata var. Hatayı bul, doğrusunu yaz.'],
          steps: [
            q('$\\left(-\\frac{3}{4}\\right) + \\frac{1}{2} = -\\frac{1}{4}$ çözümünde hata var mı?',
              'Paydaları $4$’te eşitle.',
              'Doğrudur: $-\\frac{3}{4} + \\frac{2}{4} = -\\frac{1}{4}$.'),
            q('$2 + 3 \\cdot 4 = 20$ çözümünde hata nerede?',
              'İşlem sırası.',
              'Çarpma önce yapılmalı: $2 + 12 = 14$.'),
            q('$\\frac{1}{2} \\div \\frac{3}{4} = \\frac{3}{8}$ çözümünde hata nerede?',
              'Bölmede ters çevrilip çarpılır.',
              'Doğrusu $\\frac{1}{2} \\cdot \\frac{4}{3} = \\frac{2}{3}$.'),
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
          title: 'Aynı yapı, farklı açılar',
          context: [
            'Anıtkabir’in farklı yönlerden çekilmiş fotoğrafları veriliyor. Aynı yapı, bakış yönüne göre farklı görünüyor.',
          ],
          questions: [
            q('Bir cismi tek açıdan görmek biçimi hakkında yeterli bilgi verir mi?',
              'Aynı görünümü veren iki farklı cisim düşün.',
              'Vermez. Farklı cisimler aynı önden görünümü verebilir.'),
            q('Bir yapıyı tanımlamak için hangi üç görünüm birlikte kullanılır?',
              'Ön, yan ve üst.',
              'Ön görünüm, yan görünüm ve üst görünüm.'),
          ],
        },
        {
          kind: 'start',
          title: 'Eş küplerle yapı',
          context: [
            'Sınıfta eş küplerle bir yapı oluşturuluyor. Yapıya farklı yönlerden bakılıp kaç kare göründüğü tabloya yazılıyor.',
          ],
          questions: [
            q('Önden bakıldığında görünen kare sayısı neyi verir?',
              'Görünen her kare bir sütunun yüksekliğini gösterir.',
              'O yöndeki en yüksek sütunun yüksekliğini ve kaç sütun olduğunu verir.'),
            q('Arkada kalan küpler önden görünür mü?',
              'Öndeki küp arkadakini kapatır mı?',
              'Görünmez; bu yüzden toplam küp sayısı tek görünümden bulunamaz.'),
          ],
        },
        {
          kind: 'learn',
          title: 'Ön, yan ve üst görünüm',
          checks: [
            q('Ayrıtları $3$, $4$ ve $5$ cm olan prizmanın kaç ayrıtı vardır?',
              'Ayrıt sayısı ölçülerden bağımsızdır.',
              '$12$ ayrıt.'),
            q('Önden $4$ kare genişlik görünen yapıda en az kaç sütun vardır?',
              'Her görünen kare bir sütunun tepesidir.',
              'En az $4$ sütun.'),
          ],
          blocks: [
            {
              heading: 'Üç görünüm',
              paragraphs: [
                'Bir cisme önden bakıldığında **ön görünüm**, yandan bakıldığında **yan görünüm**, üstten bakıldığında **üst görünüm** elde edilir.',
                'Ön görünüm genişlik ve yükseklik, yan görünüm derinlik ve yükseklik, üst görünüm genişlik ve derinlik bilgisini verir.',
              ],
              scene: {
                type: 'prizma3b',
                params: [
                  { name: 'a', label: 'Genişlik', min: 1, max: 6, step: 1, value: 4 },
                  { name: 'b', label: 'Derinlik', min: 1, max: 5, step: 1, value: 2 },
                  { name: 'h', label: 'Yükseklik', min: 1, max: 5, step: 1, value: 3 },
                ],
              },
            },
            {
              heading: 'Prizmanın elemanları',
              paragraphs: [
                'Dikdörtgenler prizmasında $6$ yüz, $12$ ayrıt, $8$ köşe vardır. Her yüzün $4$ ayrıtı vardır ve her ayrıt iki yüze ait olduğu için $6 \\cdot 4 \\div 2 = 12$ ayrıt bulunur.',
                'Küp, bütün yüzleri eş kare olan özel bir dikdörtgenler prizmasıdır.',
              ],
            },
            {
              heading: 'Gizli küpler',
              paragraphs: [
                'Eş küplerle yapılmış bir yapıda önden görünen kare sayısı en yüksek sütunu verir, toplam küp sayısını vermez.',
                'Üstten görünüm tabandaki küp sayısını gösterir; arkada kalan küpler üstten görünür ama önden bakışta gizlenebilir. En az ve en çok küp sayısı soruları üç görünüm birlikte okunarak çözülür.',
              ],
            },
          ],
          boxes: [
            { title: 'Prizma', body: '6 yüz · 12 ayrıt · 8 köşe. Karşılıklı yüzler eşittir.' },
            { title: 'Görünüm eşleşmesi', body: 'Ön: genişlik + yükseklik · Yan: derinlik + yükseklik · Üst: genişlik + derinlik.' },
            { title: 'Gizli küp', body: 'Toplam küp sayısı için üç görünüm birlikte gerekir; tek görünüm yeterli değildir.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Görünümler neyi saklar?',
          items: [
            q('Önden $3$ kare genişlik ve $2$ kare yükseklik görünen bir yapı için hangisi kesinlikle doğrudur?',
              'Toplam küp sayısı görünümden bulunabilir mi?',
              'En yüksek sütun $2$ küptür; toplam küp sayısı bilinemez.'),
            q('Üstten görünümü ve önden görünümü aynı olan iki farklı yapı olabilir mi?',
              'Derinlik bilgisi eksikse?',
              'Olabilir; iki görünüm derinlikteki farklılıkları her zaman göstermez.'),
          ],
        },
        {
          kind: 'explore',
          title: 'Küplerle yapı oluştur',
          materials: 'Eş küpler (veya kareli kâğıt), Ek 1 yön kâğıdı',
          intro: [
            'Elindeki eş küplerle yan yana ve üst üste yapılar kur; her yönden bakıp kareleri say.',
          ],
          steps: [
            q('$4$ küple önden $3$ kare genişlik görünecek bir yapı kur. Kaç farklı yapı olabilir?',
              'Bir sütunu $2$ katlı yapabilirsin.',
              'Birden çok çözüm var; önemli olan önden görünümün $3$ kare olması.'),
            q('Önden, sağdan ve üstten görünümleri aynı olan en az kaç küplük yapı vardır?',
              'Bir küpün üç görünümü de tek karedir.',
              'En az $1$ küp; ama $3$ görünümü aynı olan daha büyük yapılar da vardır.'),
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
          kind: 'problem',
          title: 'En az kaç küp?',
          context: [
            'Önden, sağdan ve üstten görünümleri aynı olan bir yapı var. Bu yapı en az kaç eş küple oluşturulabilir?',
          ],
          steps: [
            step('Anla', 'Üç görünüm aynıysa yapı her yönden aynı silueti veriyor.'),
            step('Planla', 'En az küp için görünümdeki her kareyi tek küple karşılamaya çalış.'),
            step('Çöz', 'Görünümde $n$ kare varsa en az $n$ küp gerekir; bazı kareler aynı küple karşılanabilir.'),
            step('Kontrol', 'Eklediğin her küp yeni bir kare oluşturuyor mu? Oluşturmuyorsa gereksizdir.'),
          ],
          result: 'Görünümlerdeki kareleri karşılaştırarak en az küp sayısı bulunur; gizli küpler yalnız gerekli olduğunda eklenir.',
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
          title: 'Kutuyu açalım',
          context: [
            'Parfüm kutusu, çikolata kutusu, ilaç kutusu… Hepsi dikdörtgenler prizması biçiminde. Bir küp kutunun ayrıtlarından kesilerek açıldığında hangi şekil ortaya çıkar?',
          ],
          questions: [
            q('Bir küpün açınımında kaç kare bulunur?',
              'Küpün kaç yüzü var?',
              '$6$ yüz olduğu için $6$ kare.'),
            q('Açınımı katladığında hangi yüzler karşılıklı gelir?',
              'Açınımda bir kare atlayan yüzler karşılıklıdır.',
              'Arada bir yüz bulunan iki yüz karşılıklı gelir.'),
            q('Aynı küpün kaç farklı açınımı vardır?',
              'Küpün $11$ farklı açınımı olduğu bilinir.',
              'Küpün $11$ farklı yüzey açınımı vardır.'),
          ],
        },
        {
          kind: 'start',
          title: 'Kutuyu kaplamak',
          context: [
            'Bir kutu hediye kâğıdıyla kaplanacak. Kaç cm² kâğıt gerektiğini bulmak için kutunun tüm yüzeyini hesaplamak gerekir.',
          ],
          questions: [
            q('Kutunun kaç yüzü vardır ve hangileri eşittir?',
              'Karşılıklı yüzler.',
              '$6$ yüz; karşılıklı yüzler eş, üç farklı boyutta yüz çifti var.'),
            q('Ayrıtları $2$, $3$, $4$ cm olan kutunun yüzey alanı kaç cm²’dir?',
              '$2 \\cdot (ab + ac + bc)$.',
              '$2 \\cdot (6 + 8 + 12) = 52$ cm².'),
          ],
        },
        {
          kind: 'learn',
          title: 'Açınım ve yüzey alanı bağıntıları',
          checks: [
            q('Ayrıtı $5$ cm olan küpün yüzey alanı kaç cm²’dir?',
              'Küpün altı yüzü de eş kare; bir yüzün alanını $6$ ile çarp.',
              '$6 \\cdot 25 = 150\\ \\mathrm{cm}^2$.'),
            q('Kare prizmada taban ayrıtı $3$, yükseklik $4$ cm ise yüzey alanı kaç cm²’dir?',
              '$2a^2 + 4ab$.',
              '$18 + 48 = 66\\ \\mathrm{cm}^2$.'),
          ],
          blocks: [
            {
              heading: 'Açınım',
              paragraphs: [
                'Bir cismin yüzeylerinin düzleme açılmış hâline **açınım** denir. Açınımda her parça bir yüze karşılık gelir.',
                'Dikdörtgenler prizmasının açınımında $6$ dikdörtgen, kare prizmada $2$ kare ve $4$ dikdörtgen, küpte $6$ kare bulunur.',
                'Her açınım kapalı cisim oluşturmaz: bazı çizimlerde yüzler üst üste biner veya boşluk kalır.',
              ],
              scene: {
                type: 'acim',
                params: [
                  { name: 'a', label: 'Genişlik', min: 1, max: 5, step: 1, value: 4 },
                  { name: 'b', label: 'Derinlik', min: 1, max: 5, step: 1, value: 3 },
                  { name: 'h', label: 'Yükseklik', min: 1, max: 5, step: 1, value: 2 },
                ],
              },
            },
            {
              heading: 'Yüzey alanı bağıntıları',
              paragraphs: [
                'Dikdörtgenler prizması: $A = 2 \\cdot (a \\cdot b + a \\cdot c + b \\cdot c)$',
                'Kare prizma (taban ayrıtı $a$, yükseklik $b$): $A = 2a^2 + 4ab$',
                'Küp (ayrıt $a$): $A = 6a^2$',
              ],
              figure: { type: 'prizma', options: { a: 4, b: 3, c: 2 } },
            },
            {
              heading: 'Ters problemler',
              paragraphs: [
                'Yüzey alanı verilen bir küpün ayrıtı, önce bir yüzün alanı bulunup karekök alınarak bulunur: $150 \\div 6 = 25$, $\\sqrt{25} = 5$ cm.',
                'Kare prizmada taban ayrıtı ve yükseklik verilip yüzey alanı; ya da yüzey alanı verilip yükseklik istenebilir.',
              ],
            },
          ],
          boxes: [
            { title: 'Prizma yüzey alanı', body: 'A = 2(ab + ac + bc). Karşılıklı yüzler eş olduğu için üç yüzün alanı toplanıp ikiyle çarpılır.' },
            { title: 'Küp', body: 'A = 6a². Yüzey alanı verilirse a = √(A/6).' },
            { title: 'Kare prizma', body: 'A = 2a² + 4ab.' },
          ],
        },
        {
          kind: 'discuss',
          title: 'Açınım ve yüzey alanı ilişkisi',
          items: [
            q('Yüzey alanı $54\\ \\mathrm{cm}^2$ olan küpün ayrıtı kaç cm’dir?',
              'Önce bir yüzün alanını bul.',
              '$54 \\div 6 = 9$; $\\sqrt{9} = 3$ cm.'),
            q('Bir prizmanın yüksekliği iki katına çıkarılırsa yüzey alanı iki katına çıkar mı?',
              'Taban alanları değişmez, yan yüzler değişir.',
              'Tam iki katına çıkmaz; tabanlar aynı kalır, yalnız yan yüzler büyür.'),
          ],
        },
        {
          kind: 'explore',
          title: 'Kendi açınımını çiz',
          materials: 'Kareli kâğıt, makas, küp kutu',
          intro: ['Bir kutu seç, ayrıtlarından kes ve açınımını kareli kâğıda çiz. Çizdiğin açınımı katlayarak kutuya dönüşüyor mu, kontrol et.'],
          steps: [
            q('Açınımda hangi yüzler karşılıklıdır?',
              'Açınımda bir yüz atlayan parçalar karşılıklıdır.',
              'Arada bir parça bulunan iki yüz karşılıklı gelir; aynı sembolle işaretleyebilirsin.'),
            q('Açınımı kapattığında yüzler çakışıyor mu?',
              'Fazla parça varsa üst üste biner.',
              'Çakışma varsa açınım hatalıdır; bir yüzün yeri yanlıştır.'),
            q('Kare prizma ile küpün açınımı arasındaki fark nedir?',
              'Küpte bütün yüzler kare.',
              'Kare prizmada $2$ kare ve $4$ dikdörtgen, küpte $6$ kare vardır.'),
          ],
          scene: {
            type: 'acim',
            params: [
              { name: 'a', label: 'Genişlik', min: 1, max: 5, step: 1, value: 3 },
              { name: 'b', label: 'Derinlik', min: 1, max: 5, step: 1, value: 3 },
              { name: 'h', label: 'Yükseklik', min: 1, max: 5, step: 1, value: 4 },
            ],
          },
        },
        {
          kind: 'problem',
          title: 'Marangozun sandığı',
          context: [
            'Bir marangozun atölyesinde numaralandırılmış dikdörtgen tahta bloklar var. Bu tahtalarla dikdörtgenler prizması biçiminde bir sandık yapacak.',
          ],
          steps: [
            step('Anla', 'Sandığın $6$ yüzü olacak; karşılıklı yüzler eş olmalı.'),
            step('Planla', 'Tahtaları üç eş çift olacak biçimde grupla.'),
            step('Çöz', 'Her çiftin alanını hesapla, topla. Örneğin $40 \\times 30$, $40 \\times 20$, $30 \\times 20$ cm yüzler: $2 \\cdot (1200 + 800 + 600) = 5200\\ \\mathrm{cm}^2$.'),
            step('Kontrol', 'Toplam alan, en büyük yüzün alanının iki katından büyük olmalı.'),
          ],
          result: 'Yüzey alanı $5200\\ \\mathrm{cm}^2$ (malzeme kalınlığı hesaba katılmadan).',
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
            'Alper iki kutudaki makarnaları tek tek sayıyor: ilk kutuda $594$ çubuk makarna, ikinci kutuda $495$ fiyonk makarna var. “İlk kutunun kapasitesi daha fazladır.” diyor.',
          ],
          questions: [
            q('Alper’in çıkarımı doğru mudur?',
              'Makarnalar aynı büyüklükte mi?',
              'Değildir; farklı nesnelerle sayılan miktarlar karşılaştırılamaz. Aynı büyüklükte eş nesne kullanılmalıdır.'),
            q('Kapasiteyi karşılaştırmak için ne yapmalı?',
              'Aynı büyüklükte birim kullan.',
              'Aynı büyüklükte eş nesnelerle (birim küp, bilye) doldurup saymak gerekir.'),
          ],
        },
        {
          kind: 'start',
          title: 'Ahşap denge oyunu',
          context: [
            'Ali ve Filiz farklı kutularda satılan aynı ahşap denge oyununu almış. Parçaların ayrıt uzunlukları $3$, $4$ ve $12$ cm. Kutular farklı ama parçalar aynı.',
          ],
          questions: [
            q('Bir parçanın hacmi kaç cm³’tür?',
              '$3 \\cdot 4 \\cdot 12$.',
              '$144\\ \\mathrm{cm}^3$.'),
            q('Kutulardan biri diğerinden büyükse parça sayısı aynı olabilir mi?',
              'Kutu hacmi ile parça hacmi ilişkisi.',
              'Olabilir; kutu büyükse içinde boşluk veya farklı sayıda parça olabilir. Kapasite karşılaştırması için parça hacmi ve sayısı birlikte gerekir.'),
          ],
        },
        {
          kind: 'learn',
          title: 'Birim küpten hacim bağıntısına',
          checks: [
            q('Hacmi $72\\ \\mathrm{cm}^3$, taban alanı $9\\ \\mathrm{cm}^2$ olan prizmanın yüksekliği kaç cm’dir?',
              'Hacmi taban alanına böl.',
              '$8$ cm.'),
            q('Ayrıtı $4$ cm olan küpün hacmi kaç cm³’tür?',
              'Hacim bağıntısında üç ayrıt da eşittir.',
              '$64\\ \\mathrm{cm}^3$.'),
          ],
          blocks: [
            {
              heading: 'Hacmi eş nesnelerle yorumlama',
              paragraphs: [
                'Bir cismin hacmi, içine kaç eş birim sığdığı ile ölçülür. Aynı büyüklükteki eş küplerle doldurulduğunda sayılan küp sayısı hacmi verir.',
                'Bir prizma boşluksuz olarak $a \\cdot b \\cdot c$ tane birim küp alıyorsa hacmi $a \\cdot b \\cdot c$ birimküptür.',
              ],
            },
            {
              heading: 'Hacim bağıntısı',
              paragraphs: [
                'Dikdörtgenler prizmasının hacmi taban alanı ile yüksekliğin çarpımıdır: $V = a \\cdot b \\cdot c$.',
                'Kare prizmada $V = a^2 \\cdot h$, küpte $V = a^3$ olur.',
                'Katman düşüncesi: her katmanda $a \\cdot b$ küp vardır; $c$ kat varsa toplam $a \\cdot b \\cdot c$ küp.',
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
              heading: 'Hacim–yüzey alanı ayrımı',
              paragraphs: [
                'Hacim “içine ne kadar sığar”, yüzey alanı “dışını kaplamak için ne kadar gerekir” sorusunun cevabıdır. Birimleri farklıdır: $\\mathrm{cm}^3$ ve $\\mathrm{cm}^2$.',
                'Ayrıtı $3$ cm olan küpün hacmi $27\\ \\mathrm{cm}^3$, yüzey alanı $54\\ \\mathrm{cm}^2$’dir.',
              ],
              figure: { type: 'prizma', options: { a: 5, b: 3, c: 2 } },
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
            q('Bir prizmanın yüksekliği iki katına çıkarılırsa hacmi ne olur?',
              'Hacim bağıntısında yükseklik nerede?',
              'Hacim de iki katına çıkar; $V = a \\cdot b \\cdot c$ olduğu için $c$ iki katı olunca $V$ iki katı olur.'),
            q('Hacmi $60\\ \\mathrm{cm}^3$, taban alanı $15\\ \\mathrm{cm}^2$ olan prizmanın yüksekliği kaç cm’dir?',
              'Hacmi taban alanına böl.',
              '$60 \\div 15 = 4$ cm.'),
            q('Aynı hacme sahip iki farklı prizma olabilir mi?',
              'Farklı $a$, $b$, $c$ değerleri aynı çarpımı verebilir.',
              'Olabilir; $2 \\cdot 3 \\cdot 4$ ve $1 \\cdot 6 \\cdot 4$ ikisi de $24$ birimküptür.'),
          ],
        },
        {
          kind: 'explore',
          title: '18 eş küple kaç prizma?',
          materials: '18 eş küp, kareli kâğıt',
          intro: ['$18$ eş küpün tamamını kullanarak dikdörtgenler prizması oluştur.'],
          steps: [
            q('Kaç farklı prizma elde edebilirsin?',
              '$18$’in çarpan üçlülerini ara.',
              '$1 \\times 1 \\times 18$, $1 \\times 2 \\times 9$, $1 \\times 3 \\times 6$, $2 \\times 3 \\times 3$: dört farklı prizma.'),
            q('Hangi prizmanın yüzey alanı en küçüktür?',
              'En “küp gibi” olan prizma en küçük yüzey alanını verir.',
              '$2 \\times 3 \\times 3$ prizması: $2 \\cdot (6 + 6 + 9) = 42$ birimkare.'),
          ],
          scene: {
            type: 'prizma3b',
            params: [
              { name: 'a', label: 'Genişlik', min: 1, max: 6, step: 1, value: 2 },
              { name: 'b', label: 'Derinlik', min: 1, max: 5, step: 1, value: 3 },
              { name: 'h', label: 'Yükseklik', min: 1, max: 5, step: 1, value: 3 },
            ],
          },
        },
        {
          kind: 'problem',
          title: 'Cam kap ve özdeş kutular',
          context: [
            'Dikdörtgenler prizması biçimindeki cam bir kap, önce dikdörtgenler prizması biçimindeki özdeş kutularla, sonra küp biçimindeki özdeş kutularla boşluk kalmayacak biçimde dolduruluyor.',
          ],
          steps: [
            step('Anla', 'Kap hacmi, kutu hacminin tam katı olmalı.'),
            step('Planla', 'Kap hacmini hesapla, kutu hacmine böl.'),
            step('Çöz', 'Kap $12 \\times 8 \\times 6 = 576$ birimküp. Kutu $2 \\times 2 \\times 2 = 8$ birimküp ise $576 \\div 8 = 72$ kutu gerekir.'),
            step('Kontrol', '$72 \\cdot 8 = 576$; boşluk kalmıyor.'),
          ],
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
          ],
          questions: [
            q('Beton miktarı için hangi birim uygundur?',
              'Çok büyük hacimler.',
              'Metreküp ($\\mathrm{m}^3$).'),
            q('Bir su şişesi için hangi birim uygundur?',
              'Sıvı ölçüsü.',
              'Litre (L) veya mililitre (mL).'),
            q('Aynı büyüklüğü farklı birimlerle yazmak mümkün müdür?',
              'Birimler arasında çevirme vardır.',
              'Evet; $1$ L $= 1$ dm$^3$ $= 1000$ cm$^3$ $= 1000$ mL.'),
          ],
        },
        {
          kind: 'start',
          title: 'Kargo kamyonu',
          context: [
            'Kasasının ayrıtları $3$ m, $2$ m ve $2$ m olan bir kargo kamyonu var. Kolilerin her ayrıtı $1$ m, küçük kutuların her ayrıtı $1$ dm.',
          ],
          questions: [
            q('Kamyon kasası tam doldurulursa kaç koli sığar?',
              'Kasa hacmi $\\div$ koli hacmi.',
              '$3 \\cdot 2 \\cdot 2 = 12\\ \\mathrm{m}^3$; her koli $1\\ \\mathrm{m}^3$; $12$ koli.'),
            q('Aynı kasaya $1$ dm ayrıtlı kaç kutu sığar?',
              '$1\\ \\mathrm{m}^3 = 1000\\ \\mathrm{dm}^3$.',
              '$12\\,000$ kutu.'),
          ],
        },
        {
          kind: 'learn',
          title: 'Hacim ve sıvı ölçme birimleri',
          checks: [
            q('$2\\ \\mathrm{m}^3$ kaç litredir?',
              '$1\\ \\mathrm{m}^3 = 1000$ L.',
              '$2000$ L.'),
            q('$450$ mL kaç cm³’tür?',
              '$1$ mL $= 1\\ \\mathrm{cm}^3$.',
              '$450\\ \\mathrm{cm}^3$.'),
          ],
          blocks: [
            {
              heading: 'Birimler arası geçiş',
              paragraphs: [
                'Hacim ölçüleri her basamakta $1000$ ile çarpılır veya bölünür: $1\\ \\mathrm{m}^3 = 1000\\ \\mathrm{dm}^3$, $1\\ \\mathrm{dm}^3 = 1000\\ \\mathrm{cm}^3$, $1\\ \\mathrm{cm}^3 = 1000\\ \\mathrm{mm}^3$.',
                'Sıvı ölçüleri: $1$ L $= 1000$ mL; $1$ cL $= 10$ mL; $1$ dL $= 100$ mL.',
              ],
              scene: {
                type: 'birim-donusum',
                params: [{ name: 's', label: 'Ayrıt (dm)', min: 1, max: 6, step: 1, value: 2 }],
              },
            },
            {
              heading: 'Hacim ve sıvı ölçüsü ilişkisi',
              paragraphs: [
                '$1\\ \\mathrm{dm}^3 = 1$ L, $1\\ \\mathrm{cm}^3 = 1$ mL, $1\\ \\mathrm{m}^3 = 1000$ L.',
                'Bu yüzden bir akvaryumun hacmini dm$^3$ olarak bulursan aynı zamanda litre cinsinden kapasitesini bulmuş olursun: $5 \\cdot 4 \\cdot 3 = 60\\ \\mathrm{dm}^3 = 60$ L.',
              ],
            },
            {
              heading: 'Düzgün olmayan cisimlerin hacmi',
              paragraphs: [
                'Dereceli kaba su konur, cisim batırılır; yükselen su miktarı cismin hacmidir.',
                'Örneğin su seviyesi $120$ mL’den $145$ mL’ye çıktıysa taşın hacmi $25$ mL $= 25\\ \\mathrm{cm}^3$’tür.',
              ],
              figure: { type: 'hacim', options: { cols: 3, rows: 2, layers: 2 } },
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
            q('$3{,}5\\ \\mathrm{dm}^3$ kaç cm³’tür?',
              '$1\\ \\mathrm{dm}^3 = 1000\\ \\mathrm{cm}^3$.',
              '$3500\\ \\mathrm{cm}^3$.'),
            q('Taban alanı $40\\ \\mathrm{cm}^2$, hacmi $360\\ \\mathrm{cm}^3$ olan kabın yüksekliği kaç cm’dir?',
              'Hacmi taban alanına böl.',
              '$360 \\div 40 = 9$ cm.'),
            q('Bir litrelik şişe kaç cm³ su alır?',
              '$1$ L $= 1$ dm$^3$.',
              '$1000\\ \\mathrm{cm}^3$.'),
          ],
        },
        {
          kind: 'explore',
          title: 'Dereceli kapla hacim ölç',
          materials: 'Dereceli silindir, su, taş veya silgi',
          intro: ['Kabın ilk su seviyesini oku, cismi batır, yeni seviyeyi oku.'],
          steps: [
            q('Su seviyesi $80$ mL’den $112$ mL’ye çıktıysa cismin hacmi kaç cm³’tür?',
              'Farkı al.',
              '$32$ mL $= 32\\ \\mathrm{cm}^3$.'),
            q('Aynı cismi iki kez batırırsan seviye ne olur?',
              'Hacimler toplanır.',
              '$80 + 2 \\cdot 32 = 144$ mL.'),
            q('Ölçüm hatasını azaltmak için ne yapmalısın?',
              'Göz hizası ve ölçek okuma.',
              'Dereceli kabı düz zemine koy, göz hizasında oku, en küçük bölmeyi dikkate al.'),
          ],
          scene: {
            type: 'birim-donusum',
            params: [{ name: 's', label: 'Ayrıt (dm)', min: 1, max: 6, step: 1, value: 3 }],
          },
        },
        {
          kind: 'problem',
          title: 'Olimpik havuz kaç litre?',
          context: [
            'Olimpik bir yüzme havuzu dikdörtgenler prizması biçiminde ve ölçüleri $50$ m, $25$ m, $2$ m.',
          ],
          steps: [
            step('Anla', 'Havuzun hacmi $\\mathrm{m}^3$ olarak bulunacak, sonra litreye çevrilecek.'),
            step('Planla', '$V = a \\cdot b \\cdot c$; $1\\ \\mathrm{m}^3 = 1000$ L.'),
            step('Çöz', '$50 \\cdot 25 \\cdot 2 = 2500\\ \\mathrm{m}^3 = 2\\,500\\,000$ L.'),
            step('Kontrol', 'Bir litre $1$ dm$^3$ olduğuna göre $2500$ m³ $= 2{,}5$ milyon litre; ölçek mantıklı.'),
          ],
          result: 'Havuz $2500\\ \\mathrm{m}^3$, yani $2\\,500\\,000$ litredir.',
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
            'Bir sınıfta $26$ öğrenci var. Öğrenciler boy sırasına dizildiğinde ortada kalan iki öğrencinin boyu $148$ cm ve $150$ cm ölçülüyor.',
          ],
          questions: [
            q('$26$ öğrenci sıraya dizildiğinde ortada kaç öğrenci kalır?',
              'Çift sayıda veride ortada iki değer bulunur.',
              'İki öğrenci: $13.$ ve $14.$ sıradaki.'),
            q('Ortanca değer kaç cm’dir?',
              'Ortadaki iki değerin aritmetik ortalaması alınır.',
              '$(148 + 150) \\div 2 = 149$ cm.'),
            q('Veri sayısı tek olsaydı ortanca nasıl bulunurdu?',
              'Tam ortadaki değer.',
              'Doğrudan ortadaki değer alınırdı; örneğin $25$ veride $13.$ değer.'),
          ],
        },
        {
          kind: 'start',
          title: 'Alperen Şengün’ün istatistikleri',
          context: [
            'Bir basketbolcunun oynadığı $7$ maçtaki asist sayıları: $5, 3, 8, 4, 9, 3, 5$. Ribaunt sayıları ise $9, 11, 7, 10, 12, 8, 13$.',
          ],
          questions: [
            q('Asist sayılarının ortancası kaçtır?',
              'Önce küçükten büyüğe sırala.',
              '$3, 3, 4, 5, 5, 8, 9$ → ortadaki $5$.'),
            q('Ribaunt sayılarının aritmetik ortalaması kaçtır?',
              'Toplamı veri sayısına böl.',
              '$(9+11+7+10+12+8+13) \\div 7 = 70 \\div 7 = 10$.'),
            q('Hangi seride açıklık daha büyüktür?',
              'Açıklık = en büyük − en küçük.',
              'Asist $9-3 = 6$; ribaunt $13-7 = 6$. İkisi eşit.'),
          ],
        },
        {
          kind: 'learn',
          title: 'Merkezî eğilim ve yayılım ölçüleri',
          checks: [
            q('$4, 8, 6, 10$ verisinin ortalaması ve ortancası kaçtır?',
              'Önce sırala.',
              'Ortalama $7$, ortanca $(6+8)\\div2 = 7$.'),
            q('Açıklığı $12$ olan veri grubunun en küçük değeri $5$ ise en büyük değeri kaçtır?',
              'Açıklık = en büyük − en küçük.',
              '$17$.'),
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
                  { name: 'a', label: '1. değer', min: 1, max: 9, step: 1, value: 4 },
                  { name: 'b', label: '2. değer', min: 1, max: 9, step: 1, value: 7 },
                  { name: 'c', label: '3. değer', min: 1, max: 9, step: 1, value: 9 },
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
            },
            {
              heading: 'Açıklık',
              paragraphs: [
                'Açıklık, en büyük veri ile en küçük veri arasındaki farktır: açıklık $= x_{en\\ b\\ddot{u}y\\ddot{u}k} - x_{en\\ k\\ddot{u}\\varsigma\\ddot{u}k}$.',
                'Açıklık, verilerin ne kadar yayıldığını gösterir. Açıklığın küçük olması verilerin birbirine yakın olduğu anlamına gelir.',
              ],
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
            q('$12, 14, 15, 16, 43$ verisinde ortalama mı ortanca mı veriyi daha iyi temsil eder?',
              '$43$ gibi bir uç değer hangi ölçüyü kaydırır?',
              'Ortanca ($15$). Ortalama $20$’ye çıkar ama verilerin çoğu $12$–$16$ aralığındadır.'),
            q('Bir veri grubuna, ortalamadan büyük yeni bir veri eklenirse ortalama nasıl değişir?',
              'Toplam artar, veri sayısı da artar.',
              'Ortalama artar; eklenen veri eski ortalamadan büyük olduğu için yeni ortalama yukarı çekilir.'),
            q('Açıklığı $0$ olan bir veri grubu nasıldır?',
              'En büyük = en küçük olursa?',
              'Bütün veriler eşittir.'),
          ],
        },
        {
          kind: 'explore',
          title: 'Ekran kullanım süreleri',
          materials: 'Kâğıt, kalem, tablo',
          intro: [
            'Bir sınıfta $9$ öğrencinin günlük ekran kullanım süreleri (saat) soruluyor: $2, 3, 3, 4, 5, 6, 6, 7, 12$.',
          ],
          steps: [
            q('Ortalama, ortanca ve açıklığı hesapla.',
              'Önce sırala; sonra üç ölçüyü ayrı ayrı bul.',
              'Toplam $48$, ortalama $48 \\div 9 \\approx 5{,}3$ saat; ortanca $5$; açıklık $12-2 = 10$.'),
            q('$12$ saatlik değer veriden çıkarılırsa ortalama ve ortanca nasıl değişir?',
              'Yeni toplam ve yeni veri sayısı.',
              'Toplam $36$, $8$ veri: ortalama $4{,}5$; ortanca $(3+4) \\div 2 = 3{,}5$. İkisi de düşer.'),
            q('Sınıfın ekran süresini hangi ölçü daha iyi anlatır? Neden?',
              'Uç değer var mı?',
              'Ortanca; $12$ saatlik uç değer ortalamayı yukarı çekiyor.'),
          ],
          scene: {
            type: 'veri-grafik',
            params: [
              { name: 'a', label: '1. grup', min: 1, max: 8, step: 1, value: 4 },
              { name: 'b', label: '2. grup', min: 1, max: 8, step: 1, value: 6 },
              { name: 'c', label: '3. grup', min: 1, max: 8, step: 1, value: 8 },
            ],
          },
        },
        {
          kind: 'problem',
          title: 'TÜİK nüfus verisi',
          context: [
            'Bir araştırmacı, beş ilin nüfusunu (bin kişi) inceliyor: $2600, 1800, 1500, 900, 5600$.',
          ],
          steps: [
            step('Anla', 'Ortalama ve ortanca istendiğinde önce sıralama gerekir.'),
            step('Planla', 'Sırala → ortadaki değeri al → toplamı veri sayısına böl.'),
            step('Çöz', 'Sıralı: $900, 1500, 1800, 2600, 5600$. Ortanca $1800$. Ortalama $(900+1500+1800+2600+5600) \\div 5 = 12\\,400 \\div 5 = 2480$.'),
            step('Kontrol', 'Ortalama ortancadan büyük; $5600$ uç değeri ortalamayı yukarı çekmiş. Beklenen durum.'),
          ],
          result: 'Ortanca $1800$ bin, ortalama $2480$ bin kişi. Uç değer ortalamayı etkiler, ortancayı etkilemez.',
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
            q('Ortalama tüketim kaç litredir?',
              'Toplamı $8$’e böl.',
              'Toplam $60{,}5$; ortalama $\\approx 7{,}56$ L.'),
            q('$13{,}4$ değeri neden şüpheli?',
              'Diğer değerlerle karşılaştır.',
              'Diğerleri $6$–$7$ aralığındayken bu değer iki katına yakın; ölçüm hatası olabilir.'),
            q('Bu değer çıkarılırsa ortalama kaç olur?',
              'Yeni toplam ve veri sayısı.',
              '$47{,}1 \\div 7 \\approx 6{,}73$ L.'),
          ],
        },
        {
          kind: 'start',
          title: 'Uzun atlama dereceleri',
          context: [
            'Bir sporcunun altı atlayışı (m): $5{,}80; 5{,}95; 6{,}10; 5{,}70; 6{,}05; 5{,}90$.',
          ],
          questions: [
            q('Ortanca derece kaç metredir?',
              'Sırala, ortadaki iki değerin ortalamasını al.',
              'Sıralı: $5{,}70; 5{,}80; 5{,}90; 5{,}95; 6{,}05; 6{,}10$ → $(5{,}90+5{,}95)\\div2 = 5{,}925$ m.'),
            q('Açıklık kaç metredir?',
              'En büyük − en küçük.',
              '$6{,}10 - 5{,}70 = 0{,}40$ m.'),
            q('Sporcunun dereceleri istikrarlı mı?',
              'Açıklık küçükse?',
              'Açıklık $40$ cm; altı atlayış birbirine yakın, istikrarlı sayılır.'),
          ],
        },
        {
          kind: 'learn',
          title: 'Grafik türleri ve ortalama mutlak sapma',
          checks: [
            q('Daire grafiğinde $\\%25$’lik dilimin merkez açısı kaç derecedir?',
              '$360$’ın dörtte biri.',
              '$90^\\circ$.'),
            q('Ortalaması $10$ olan $8, 10, 12$ verisinde ortalama mutlak sapma kaçtır?',
              'Farkların mutlak değerlerinin ortalaması.',
              '$(2+0+2) \\div 3 \\approx 0{,}67$.'),
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
                type: 'veri-grafik',
                params: [
                  { name: 'a', label: '1. grup', min: 1, max: 8, step: 1, value: 5 },
                  { name: 'b', label: '2. grup', min: 1, max: 8, step: 1, value: 3 },
                  { name: 'c', label: '3. grup', min: 1, max: 8, step: 1, value: 7 },
                ],
              },
            },
            {
              heading: 'Daire grafiğinde açı hesabı',
              paragraphs: [
                'Bir dilimin merkez açısı $= 360^\\circ \\times \\frac{\\text{dilimin değeri}}{\\text{toplam}}$.',
                'Örneğin bir gölde su yüzeyi alanı $\\%44$ azalmışsa bu, daire grafiğinde $360 \\cdot 0{,}44 = 158{,}4^\\circ$’lik bir dilimdir.',
              ],
            },
            {
              heading: 'Ortalama mutlak sapma',
              paragraphs: [
                'Her verinin ortalamadan ne kadar uzaklaştığını gösteren ölçüdür. Adımlar: ortalamayı bul → her verinin ortalamadan farkının mutlak değerini al → bu değerlerin ortalamasını bul.',
                'Ortalama mutlak sapma küçükse veriler ortalamaya yakın, yani daha tutarlıdır.',
              ],
              figure: { type: 'sutun-grafik', options: { values: [4, 6, 5, 7], names: ['A', 'B', 'C', 'D'] } },
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
            q('$6$ saatlik bir günde sıcaklıklar $12, 15, 18, 21$ °C ise hangi grafik türü uygundur?',
              'Zaman içinde değişim mi, karşılaştırma mı?',
              'Çizgi grafiği; zaman içindeki değişim gösterilir.'),
            q('Daire grafiğinde bir dilim $90^\\circ$ ise bütünün kaçta kaçıdır?',
              '$360^\\circ$ tamamı.',
              '$\\frac{1}{4}$’ü.'),
            q('Ortalama mutlak sapması $0{,}4$ olan grup mu, $2{,}1$ olan grup mu daha tutarlıdır?',
              'Küçük sapma ne demek?',
              '$0{,}4$ olan; veriler ortalamaya daha yakın.'),
          ],
        },
        {
          kind: 'explore',
          title: 'İki takımı karşılaştır',
          materials: 'Kâğıt, kalem, hesap makinesi',
          intro: [
            'Voleybolda Selma ve Yasemin’in beş maçtaki sayıları: Selma $12, 14, 10, 16, 13$; Yasemin $8, 20, 6, 22, 14$.',
          ],
          steps: [
            q('İki oyuncunun ortalamasını hesapla.',
              'Topla, $5$’e böl.',
              'Selma: $65 \\div 5 = 13$. Yasemin: $70 \\div 5 = 14$.'),
            q('Ortalama mutlak sapmalarını bul.',
              'Önce her farkı, sonra ortalamasını.',
              'Selma: $|1|+|1|+|3|+|3|+|0| = 8$, sapma $1{,}6$. Yasemin: $6+6+8+8+0 = 28$, sapma $5{,}6$.'),
            q('Hangi oyuncu daha istikrarlıdır? Sonucu bir cümleyle açıkla.',
              'Ortalama yakın, sapma farklı.',
              'Selma; ortalaması biraz düşük ama sapması çok küçük, yani her maç benzer sayı üretiyor.'),
          ],
          scene: {
            type: 'ortalama',
            params: [
              { name: 'a', label: '1. değer', min: 1, max: 9, step: 1, value: 3 },
              { name: 'b', label: '2. değer', min: 1, max: 9, step: 1, value: 6 },
              { name: 'c', label: '3. değer', min: 1, max: 9, step: 1, value: 9 },
            ],
          },
        },
        {
          kind: 'problem',
          title: '“Su içmek zararlı!” haberi',
          context: [
            'Bir haberde “Su içenlerin $\\%60$’ı hastalanmıştır.” deniyor. Araştırmanın ayrıntısı verilmiyor.',
          ],
          steps: [
            step('Anla', 'Yüzde bilgisi tek başına neden-sonuç göstermez.'),
            step('Planla', 'Karşılaştırma grubu var mı, örneklem kaç kişi, ölçüm nasıl yapılmış? Sor.'),
            step('Çöz', 'Toplumun tamamı da su içiyor. Su içmeyenlerle karşılaştırma yapılmadıysa yüzde anlamsızdır. Ayrıca daire grafiğinde $\\%60$ dilimi $360 \\cdot 0{,}6 = 216^\\circ$’dir; ama bu oran yalnızca seçilen gruba aittir.'),
            step('Kontrol', 'Sonuç, örneklem ve karşılaştırma grubu bilgisi olmadan genellenemez.'),
          ],
          result: 'Grafik ve yüzdeler, kaynağı ve karşılaştırma grubu bilinmeden yorumlanmamalıdır.',
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
              'Şekil aşağı-yukarı ters döner; sağ-sol konumu korunur.'),
            q('Dikey doğruya göre yansımada ne değişir?',
              'Sağ-sol konum.',
              'Şekil sağ-sol ters döner; yükseklik korunur.'),
            q('Yansımada şeklin boyutu değişir mi?',
              'Uzaklıklar korunur mu?',
              'Değişmez; şekil ile görüntüsü eştir.'),
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
              'İki: biri yatay, biri dikey.'),
            q('$F$ harfi neden simetrik değildir?',
              'Hangi doğruyu denersen dene karşı taraf boş kalıyor mu?',
              'Katlanınca iki parça üst üste gelmez; hiçbir simetri doğrusu yoktur.'),
            q('Doğada ve sanatta simetriye iki örnek ver.',
              'Yaprak, kelebek, halı motifi…',
              'Kelebek kanatları dikey doğruya göre; halı motifleri hem yatay hem dikey doğruya göre simetrik olabilir.'),
          ],
        },
        {
          kind: 'learn',
          title: 'Simetri doğrusu ve yansıma',
          checks: [
            q('$B(4, 1)$ noktasının $x$ eksenine göre görüntüsü nedir?',
              '$(x, y) \\to (x, -y)$.',
              '$(4, -1)$.'),
            q('Karenin kaç simetri doğrusu vardır?',
              'İki kenar ortası, iki köşegen.',
              '$4$.'),
          ],
          blocks: [
            {
              heading: 'Simetri aynası ve asetat kâğıdı',
              paragraphs: [
                'Bir şeklin simetri doğrusunu bulmak için şeklin üzerine asetat kâğıdı koyup katlanır; iki parça üst üste geliyorsa katlama çizgisi simetri doğrusudur.',
                'Simetri aynası, aynı yöntemin araçla yapılmış hâlidir: ayna şeklin yarısına yerleştirilir, aynadaki görüntü şekli tamamlıyorsa ayna doğrusu bir simetri doğrusudur.',
              ],
              scene: {
                type: 'yansima',
                params: [{ name: 'k', label: 'Ayna doğrusu (x = k)', min: -3, max: 3, step: 1, value: 0 }],
              },
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
              '$(2 \\cdot 1 - 3, 2) = (-1, 2)$.'),
            q('Bir üçgenin yansımasında açı ölçüleri değişir mi?',
              'Eşlik neyi korur?',
              'Değişmez; açılar ve kenar uzunlukları korunur.'),
            q('Bir şeklin birden fazla simetri doğrusu olabilir mi?',
              'Kare ve eşkenar üçgeni düşün.',
              'Olabilir; karede $4$, eşkenar üçgende $3$ simetri doğrusu vardır.'),
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
            params: [{ name: 'k', label: 'Ayna doğrusu (x = k)', min: -3, max: 3, step: 1, value: 1 }],
          },
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
              'Direkleri birleştiren parçanın orta dikmesi üzerine.'),
            q('Kaç farklı konum mümkündür?',
              'Bir doğru üzerindeki noktalar.',
              'Sonsuz; orta dikme doğrusunun her noktası eşit uzaklıktadır.'),
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
              'İki eşit yarıçaplı dairenin kesişim noktaları uçlara eşit uzaklıktadır; orta dikme bu noktalardan geçer.'),
            q('Orta dikme çizildiğinde ne bulunmuş olur?',
              'Doğru parçasını hangi noktada keser?',
              'Parçanın orta noktasında dik keser; parça iki eş parçaya ayrılır.'),
          ],
        },
        {
          kind: 'learn',
          title: 'Orta dikme ve açıortay',
          checks: [
            q('Açıortay üzerindeki bir noktanın kenarlara uzaklığı neden eşittir?',
              'Oluşan iki dik üçgeni karşılaştır.',
              'Eş açı ve ortak kenar sayesinde dik uzaklıklar eşittir.'),
            q('$|PA| = |PB|$ olan $P$ noktası hangi doğru üzerindedir?',
              'Uçlara eşit uzaklık.',
              '$AB$ doğru parçasının orta dikmesi üzerinde.'),
          ],
          blocks: [
            {
              heading: 'Orta dikme',
              paragraphs: [
                'Bir doğru parçasının orta noktasından geçen ve ona dik olan doğruya **orta dikme** denir.',
                'Orta dikme üzerindeki her nokta, parçanın uç noktalarına eşit uzaklıktadır. Tersi de doğrudur: uçlara eşit uzaklıktaki her nokta orta dikme üzerindedir.',
                'Pergel–cetvel inşası: pergel $A$ ve $B$ merkezli, yarıçapı $|AB|$’nin yarısından büyük eş yaylar çizilir; yayların kesiştiği iki noktayı birleştiren doğru orta dikmedir.',
              ],
              scene: {
                type: 'ortadikme',
                params: [
                  { name: 'ax', label: 'A noktası (x)', min: 0, max: 4, step: 1, value: 1 },
                  { name: 'by', label: 'B noktası (y)', min: 1, max: 5, step: 1, value: 3 },
                ],
              },
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
              '$AB$’nin orta dikmesi üzerinde.'),
            q('Açıortay üzerindeki bir noktanın kenarlara uzaklığı neden eşittir?',
              'İki dik üçgen oluşur; eş açı ve ortak kenar.',
              'Açıortay, dik üçgenlerde eş açı ve ortak kenar sağlar; karşılık gelen dik uzaklıklar eşittir.'),
            q('Bir daire diliminin simetri doğrusu neresidir?',
              'Dilimi ikiye katla.',
              'Merkez açının açıortayı.'),
          ],
        },
        {
          kind: 'explore',
          title: 'Pergelle orta dikme çiz',
          materials: 'Pergel, ölçüsüz cetvel, kalem',
          intro: [
            'Kâğıda $6$ cm’lik bir $AB$ parçası çiz. Yalnız pergel ve cetvel kullanarak orta dikmesini oluştur.',
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
            '$y$ eksenine göre $(-2, 5)$; $x = 3$ doğrusuna göre $(2 \\cdot 3 - 2, 5) = (4, 5)$.'),
          q('Bir üçgen yansıtıldığında kenar uzunlukları ve açıları değişir mi? Yönelimi ne olur?',
            'Yansıma bir eşlik dönüşümüdür.',
            'Uzunluklar ve açılar korunur, şekil ile görüntüsü eştir; yönelim ters döner.'),
          q('Bir noktanın iki uca uzaklığı eşitse hangi doğru üzerindedir? Bu bilgi hangi sorularda işe yarar?',
            'Uçlara eşit uzaklık.',
            'Uçları birleştiren parçanın orta dikmesi üzerindedir; eşit uzaklık verilen inşa sorularında kullanılır.'),
          q('Bir daire diliminin simetri doğrusu neresidir?',
            'Dilimi ikiye katla.',
            'Merkez açının açıortayı.'),
        ],
      },
    },
  });

  window.MATEMATIK_KITAP = Object.freeze({ weeks, STAGE });
})();
