/* 7. sınıf matematik — 1. dönem haftalık konu anlatımları (özgün metin).
   Yazım kuralı: $...$ arası matematik dizgiyle gösterilir (bkz. matematik-math.js).
   Kaynak: MEB 7. sınıf matematik ders kitabı (2026) kapsamı; metin, örnek ve sorular özgün.
   Öğrenci metninde kitap/sayfa atfı yoktur. */
(() => {
  'use strict';

  const THEMES = [
    { id: 'sayilar', no: 1, title: 'Sayılar ve Nicelikler', short: 'Sayılar', pages: '12–116' },
    { id: 'geometri', no: 2, title: 'Geometrik Nicelikler', short: 'Geometri', pages: '117–158' },
    { id: 'veri', no: 3, title: 'İstatistiksel Araştırma Süreci', short: 'Veri', pages: '159–200' },
    { id: 'donusum', no: 4, title: 'Dönüşüm', short: 'Dönüşüm', pages: '201–217' },
  ];

  // figure: şekil anahtarı (matematik-figure.js) — sorunun yanında çizilir.
  const check = (prompt, options, correct, hint, explain, figure) => ({ prompt, options, correct, hint, explain, figure: figure || null });
  // visual: terim kartındaki küçük şekil; where: terimin nerede karşımıza çıktığı.
  const term = (word, definition, visual, where, visualOptions) => ({
    word, definition,
    visual: visual || null,
    visualOptions: visualOptions || null,
    where: where || '',
  });
  const example = (title, steps, answer) => ({ title, steps, answer });

  const week = (data) => ({
    id: data.id,
    date: data.date,
    theme: data.theme,
    topic: data.topic,
    pages: data.pages,
    summary: data.summary,
    examples: data.examples,
    points: data.points,
    terms: data.terms,
    checks: data.checks,
    // Sahneler dizi hâlinde: bir haftada birden çok etkileşim olabilir.
    scenes: (data.scenes || (data.scene ? [data.scene] : [])).map((scene) => ({ ...scene })),
  });

  const WEEKS = [
    week({
      id: 1,
      date: '14–18 Eyl',
      theme: 'sayilar',
      topic: 'Tam sayılar: yön, sıralama ve ters sayı',
      pages: '12–24',
      summary: [
        'Sayı doğrusu bir cetvel gibi düşünülebilir: her noktaya bir sayı karşılık gelir, sağa gidildikçe sayılar büyür, sola gidildikçe küçülür. Sıfırın sağındaki sayılara **pozitif tam sayılar** $\\left(1, 2, 3, \\ldots\\right)$, solundakilere **negatif tam sayılar** $\\left(-1, -2, -3, \\ldots\\right)$ denir. Sıfır ne pozitif ne negatiftir; yönü olmayan başlangıç noktasıdır. Böylece sayma sayılarına sıfırı ve negatifleri ekleyerek **tam sayılar** kümesini elde ederiz: $\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots$',
        'Her tam sayının sıfıra göre bir simetriği vardır. $-5$ ile $5$ sayı doğrusunda sıfırdan eşit uzaklıktadır; bu iki sayıya birbirinin **tersi** denir ve toplamları her zaman sıfırdır: $-5 + 5 = 0$. Bir sayının tersini bulmak için önündeki işareti değiştirmek yeterlidir. Sıfır kendi tersidir, çünkü $-0 = 0$ olur.',
        'Eksi işaretinin iki ayrı görevi vardır ve karışıklığın büyük kısmı buradan doğar. Birincisi **yön bildirir**: $-4$ ifadesi “sıfırın dört birim solundaki sayı” demektir. İkincisi **işlem bildirir**: $9 - 4$ ifadesinde “dört çıkar” anlamına gelir. Bu yüzden ifadeyi önce sözel okumak gerekir. “$-4$ sayısı” ile “$4$ çıkar” aynı şey değildir; birincisi bir konumu, ikincisi bir eylemi anlatır.',
        'Sıralamada sayı doğrusu tek ölçüttür. $-8$ sayısı $-2$’nin solunda olduğu için $-8 < -2$ olur; buna karşılık mutlak büyüklük olarak $8$ daha büyüktür. Negatif sayılarda “büyük rakam küçük sayı” tuzağı buradan gelir: $|-8| > |-2|$ olmasına rağmen $-8 < -2$. Günlük hayatta bu, hava sıcaklığında ($-8\\,^{\\circ}\\mathrm{C}$ daha soğuk), banka hesabında ($-150$ lira daha büyük borç) ve asansör katlarında ($-2$ kat, $3$. katın altında) aynı biçimde karşımıza çıkar.',
        'Bu hafta çalışırken sırayı şöyle kur: boş bir kâğıda $-10$ ile $10$ arasını kapsayan bir sayı doğrusu çiz, günlük hayattan üç örnek bul ve her biri için iki cümle yaz — “Sıfırı ne kabul ettim?” ve “Negatif yön hangi taraf?”. Bu iki cümle, ilerleyen haftalarda işlem yaparken işaret hatalarını baştan engeller.',
      ],
      examples: [
        example('Sıralama', [
          '$-7, 3, -1, 0, -12$ sayılarını küçükten büyüğe sıralayalım.',
          'Negatifleri kendi aralarında düşünelim: $-12$, sıfırın en solunda olduğu için en küçüktür; ardından $-7$ ve $-1$ gelir.',
          'Sıfır negatiflerden büyük, pozitiflerden küçüktür.',
          'Son olarak $3$ en büyüktür.',
        ], '$-12 < -7 < -1 < 0 < 3$'),
        example('Asansör', [
          'Bir kişi $4$. katta. Önce $6$ kat aşağı iniyor, sonra $3$ kat yukarı çıkıyor.',
          'Aşağı inmeyi negatif, yukarı çıkmayı pozitif yönle gösterelim.',
          'Konum: $4 - 6 + 3$',
          '$4 - 6 = -2$, sonra $-2 + 3 = 1$.',
        ], '$1$. kat'),
      ],
      points: [
        'Tam sayılar: $\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots$; sıfır ne pozitif ne negatiftir.',
        'Sayı doğrusunda sağa gidildikçe sayı büyür, sola gidildikçe küçülür.',
        'Bir sayının tersi işaret değiştirilerek bulunur; toplamları sıfırdır.',
        'Negatif sayılarda mutlak büyüklük arttıkça sayı küçülür: $-8 < -2$.',
      ],
      terms: [
        term('Tam sayı', 'Kesirli kısmı olmayan; sıfırı ve negatifleri de içeren sayılar kümesinin elemanı.', 'sayi-kumeleri', 'Sıcaklık, asansör katı, deniz seviyesi gibi durumlarda'),
        term('Ters (zıt) sayı', 'Sayı doğrusunda sıfıra göre simetrik olan, toplamı sıfır eden iki sayıdan her biri.', 'ters-sayi', 'Çıkarma işlemini toplamaya çevirirken'),
        term('Sayı doğrusu', 'Sayıların büyüklük sırasına göre yerleştirildiği, sıfırın başlangıç kabul edildiği doğru.', 'sayi-dogrusu', 'Karşılaştırma ve sıralamada'),
      ],
      scenes: [
        {
          type: 'sayi-dogrusu',
          title: 'Sayı doğrusunda konum ve ters sayı',
          hint: 'Sürgüyü kaydır ya da pembe noktayı sürükle: $a$ ve $-a$ sıfıra göre simetrik kalır.',
          params: [{ name: 'a', label: 'Sayı (a)', min: -7, max: 7, step: 1, value: 3 }],
        },
      ],
      checks: [
        check(
          'Bir binanın asansörü bodrum katlarını negatif sayıyla gösteriyor. $-7$ ve $-3$. katların arasında kalan katlar hangileridir?',
          ['$-6$, $-5$, $-4$', '$-8$, $-9$, $-10$', '$-2$, $-1$, $0$'],
          0,
          '$-7$’den başlayıp sağa doğru say: bir adım sağa $=-6$…',
          '$-7$ ile $-3$ arasında $-6$, $-5$ ve $-4$ katları vardır; uçlar aranmadığı için $-7$ ve $-3$ yazılmaz.', 'sayi-dogrusu',
        ),
        check(
          'Sabah sıcaklık $-8\\,^{\\circ}\\mathrm{C}$, öğlen $-2\\,^{\\circ}\\mathrm{C}$ ölçüldü. Hangisi doğrudur?',
          ['Öğlen daha soğuktu; $-2 < -8$', 'İkisi eşittir', 'Sabah daha soğuktu; $-8 < -2$'],
          2,
          'Negatif sayılarda sayı doğrusunda daha solda olan daha küçüktür.',
          '$-8$, $-2$’nin solundadır; bu yüzden $-8 < -2$ ve sabah hava daha soğuktur.',
        ),
      ],
    }),

    week({
      id: 2,
      date: '21–25 Eyl',
      theme: 'sayilar',
      topic: 'Rasyonel sayılar ve mutlak değer',
      pages: '25–40',
      summary: [
        'Bir bütünü eş parçalara böldüğümüzde ortaya çıkan miktarları tam sayılarla yazamayız. Bu boşluğu **rasyonel sayılar** doldurur: $a$ ve $b$ tam sayı, $b \\ne 0$ olmak üzere $\\frac{a}{b}$ biçiminde yazılabilen her sayı rasyoneldir. Payda sıfır olamaz, çünkü bir bütünü sıfır parçaya bölmek tanımsızdır. Tam sayılar da rasyoneldir: $5 = \\frac{5}{1}$ ve $-3 = \\frac{-3}{1}$.',
        'Aynı sayı birçok biçimde yazılabilir. $\\frac{3}{4}$, $0{,}75$, $\\%75$ ve $\\frac{75}{100}$ aynı büyüklüğü anlatır; çünkü kesir çizgisi aslında bir bölme işaretidir ve $\\frac{3}{4} = 3 \\div 4 = 0{,}75$ olur. Negatif rasyonel sayılarda eksi işareti paya, paydaya ya da kesir çizgisinin önüne yazılabilir: $-\\frac{3}{4} = \\frac{-3}{4} = \\frac{3}{-4}$. Karışıklığı önlemek için işareti kesir çizgisinin önünde tutmak en güvenli alışkanlıktır.',
        '**Mutlak değer**, bir sayının sayı doğrusunda sıfıra olan uzaklığıdır. Uzaklık negatif olamayacağı için mutlak değer hiçbir zaman negatif değildir: $|-6| = 6$, $|6| = 6$, $|0| = 0$. Bu tanım iki önemli sonuç doğurur. Birincisi, birbirinin tersi olan sayıların mutlak değerleri eşittir: $|-9| = |9|$. İkincisi, mutlak değeri verilen bir sayı iki farklı değer alabilir: $|x| = 5$ ise $x = 5$ ya da $x = -5$ olur.',
        'Rasyonel sayıları karşılaştırırken üç araç kullanılır: ortak paydaya getirme, ondalığa çevirme ve sayı doğrusundaki konum. $\\frac{2}{3}$ ile $\\frac{3}{5}$ karşılaştırmasında payda $15$’te eşitlenir: $\\frac{10}{15} > \\frac{9}{15}$, yani $\\frac{2}{3} > \\frac{3}{5}$. Negatiflerde yön tersine döner: $-\\frac{1}{2}$ ile $-\\frac{3}{4}$ arasında $-\\frac{3}{4} = -0{,}75$ daha solda olduğu için $-\\frac{3}{4} < -\\frac{1}{2}$.',
        'Mutlak değeri günlük hayatta “ne kadar fark” sorusunun cevabı olarak düşünebilirsin: hedefe $4$ adım kala olmak ile hedefi $4$ adım geçmiş olmak, hedeften aynı uzaklıktadır. Bu hafta bir “uzaklık defteri” tut: sol sütuna sayıyı, sağ sütununa sıfıra uzaklığını yaz. On satır sonunda “mutlak değeri aynı olan iki sayı arasında nasıl bir ilişki var?” sorusuna kendi cümlelerinle cevap ver.',
      ],
      examples: [
        example('Karşılaştırma', [
          '$\\frac{3}{8}$ ile $0{,}4$ sayılarını karşılaştıralım.',
          'Kesri ondalığa çevirelim: $\\frac{3}{8} = 3 \\div 8 = 0{,}375$.',
          '$0{,}4 = 0{,}400$ olduğundan basamakları hizalayarak karşılaştırırız.',
          '$0{,}400 > 0{,}375$ olduğu için $0{,}4 > \\frac{3}{8}$.',
        ], '$0{,}4 > \\frac{3}{8}$'),
        example('Mutlak değer denklemi', [
          '$|x| = 9$ eşitliğini sağlayan sayıları bulalım.',
          'Mutlak değer, sıfıra uzaklık demektir; sıfıra $9$ birim uzaklıkta iki nokta vardır.',
          'Sağdaki nokta $9$, soldaki nokta $-9$’dur.',
          'Kontrol: $|9| = 9$ ve $|-9| = 9$.',
        ], '$x = 9$ veya $x = -9$'),
      ],
      points: [
        '$\\frac{a}{b}$ biçiminde yazılabilen sayılar rasyoneldir; $b \\ne 0$ olmalıdır.',
        'Kesir, ondalık ve yüzde aynı büyüklüğün farklı gösterimleridir.',
        'Mutlak değer sıfıra uzaklıktır; sonucu hiçbir zaman negatif olmaz.',
        '$|x| = a$ ise $x = a$ ya da $x = -a$ olabilir.',
        'Negatif rasyonel sayılarda büyüklük sırası tersine döner.',
      ],
      terms: [
        term('Rasyonel sayı', 'İki tam sayının oranı biçiminde yazılabilen sayı; payda sıfırdan farklı olmalıdır.', 'pay-payda', 'Kesir, ondalık ve yüzde gösterimlerinde'),
        term('Mutlak değer', 'Sayının sıfıra olan uzaklığı; $|a|$ biçiminde gösterilir ve negatif olamaz.', 'mutlak-deger', 'Uzaklık ve fark hesaplarında'),
        term('Sadeleştirme', 'Pay ve paydayı aynı sıfırdan farklı sayıya bölerek kesri en basit biçime getirme.', 'sadelestirme', 'Sonucu en sade biçimde yazarken'),
      ],
      scenes: [
        {
          type: 'mutlak-deger',
          title: 'Mutlak değer: sıfıra uzaklık',
          hint: 'Sayıyı değiştir; uzaklığın her zaman pozitif kaldığını gör.',
          params: [{ name: 'a', label: 'Sayı (a)', min: -9, max: 9, step: 1, value: -6 }],
        },
      ],
      checks: [
        check(
          'Bir fırının sıcaklığı hedef değerden $9\\,^{\\circ}\\mathrm{C}$ sapıyor ve sapma $|x| = 9$ ile gösteriliyor. $x$ hangi değerleri alabilir?',
          ['Yalnız $9$', '$9$ ve $-9$', 'Yalnız $-9$'],
          1,
          'Sıfıra uzaklığı $9$ olan kaç sayı vardır? Sayı doğrusunda iki yönü düşün.',
          '$|x| = 9$ ise $x$ sıfırdan $9$ birim uzaktadır: hem $9$ hem $-9$ olabilir.',
        ),
        check(
          'Bir derin dondurucu $-\\frac{2}{5}\\ ^{\\circ}\\mathrm{C}$, diğeri $-\\frac{4}{5}\\ ^{\\circ}\\mathrm{C}$ sıcaklıkta. Hangisi daha soğuktur?',
          ['$-\\frac{4}{5}\\ ^{\\circ}\\mathrm{C}$ olan', '$-\\frac{2}{5}\\ ^{\\circ}\\mathrm{C}$ olan', 'İkisi eşittir'],
          0,
          'Negatif kesirlerde payda eşitse payı büyük olan daha küçüktür.',
          '$\\frac{4}{5} > \\frac{2}{5}$ olduğu için $-\\frac{4}{5} < -\\frac{2}{5}$; daha soğuk olan $-\\frac{4}{5}$’tir.',
        ),
      ],
    }),

    week({
      id: 3,
      date: '28 Eyl–2 Eki',
      theme: 'sayilar',
      topic: 'Farklı temsiller, karşılaştırma ve sıralama',
      pages: '41–61',
      summary: [
        'Aynı miktarı anlatmanın birden çok yolu vardır: bir kutunun yarısı $\\frac{1}{2}$, $0{,}5$ ya da $\\%50$ olarak yazılabilir. Bunlar farklı bilgiler değil, aynı bilginin farklı dilleridir. Hangi dili seçeceğimiz yapacağımız işleme bağlıdır: karşılaştırmada ondalık, oran hesaplarında kesir, indirim ve zam problemlerinde yüzde daha kullanışlıdır. Bu üç dil arasında hızlı geçiş yapabilmek, işlem güvenliğinin temelidir.',
        'Kesri ondalığa çevirmek için payı paydaya böleriz: $\\frac{7}{8} = 7 \\div 8 = 0{,}875$. Paydası $10$, $100$, $1000$ gibi sayılara genişletilebilen kesirler sonlu ondalık verir: $\\frac{3}{5} = \\frac{6}{10} = 0{,}6$. Ancak her kesir sonlu ondalık değildir. $\\frac{1}{3} = 0{,}333\\ldots$ ve $\\frac{2}{9} = 0{,}222\\ldots$ bölmelerinde bir basamak sonsuza kadar tekrar eder. Bu sayılara **devirli ondalık sayı** denir ve $0{,}\\overline{3}$ biçiminde yazılır; devirli ondalık sayılar da rasyoneldir.',
        'Karşılaştırmada en güvenli yöntem sayıları aynı biçime getirmektir. İki yol öne çıkar. Birinicisi **ondalık karşılaştırma**: $\\frac{5}{8} = 0{,}625$ ve $\\%60 = 0{,}6$ olduğu için $\\frac{5}{8} > \\%60$. İkincisi **ortak payda**: $\\frac{5}{6}$ ile $\\frac{7}{9}$ için paydaları $18$’de eşitlersek $\\frac{15}{18}$ ve $\\frac{14}{18}$ elde ederiz; $\\frac{5}{6}$ daha büyüktür. Payda büyüdükçe çarpma işlemi ağırlaşacağı için pratikte ondalığa çevirmek çoğu zaman daha hızlıdır.',
        'Sıralamada negatif sayılar yön değiştirir. Kolay bir yol vardır: sayıları önce işaretsiz düşünüp büyükten küçüğe sırala, sonra negatiflerde sırayı ters çevir. $-\\frac{1}{2}$, $-\\frac{3}{4}$ ve $-0{,}6$ sayılarını ele alalım. Ondalık karşılıkları $-0{,}5$, $-0{,}75$ ve $-0{,}6$’dır. İşaretsiz düşününce sıra $0{,}75 > 0{,}6 > 0{,}5$ olur; negatiflerde bu sıra tersine döner: $-0{,}5 > -0{,}6 > -0{,}75$.',
        'Rasyonel sayıların bir özelliği daha vardır: iki farklı rasyonel sayı arasında her zaman başka bir rasyonel sayı bulunur. $\\frac{1}{4}$ ile $\\frac{1}{2}$ arasındaki $\\frac{3}{8}$ bunun örneğidir; ortalamayı alarak $\\frac{1}{4} + \\frac{1}{2} = \\frac{3}{4}$, yarısı $\\frac{3}{8}$ bulunur. Bu yüzden rasyonel sayılar sayı doğrusunda boşluksuz görünür; tam sayılarda ise ardışık iki sayı arasında başka bir tam sayı yoktur.',
      ],
      examples: [
        example('Üç gösterimi sıralama', [
          '$\\frac{5}{8}$, $\\%60$ ve $0{,}55$ sayılarını küçükten büyüğe sıralayalım.',
          'Hepsini ondalığa çevirelim: $\\frac{5}{8} = 0{,}625$, $\\%60 = 0{,}60$, $0{,}55$ zaten ondalıktır.',
          'Ondalık kısmı hizalayalım: $0{,}55 < 0{,}60 < 0{,}625$.',
          'Aynı sırayı özgün gösterimlerle yazalım.',
        ], '$0{,}55 < \\%60 < \\frac{5}{8}$'),
        example('Negatif sıralama', [
          '$-\\frac{7}{10}$, $-\\frac{2}{3}$ ve $-0{,}65$ sayılarını sıralayalım.',
          'Ondalığa çevirelim: $-0{,}7$, $-0{,}\\overline{6} \\approx -0{,}667$, $-0{,}65$.',
          'İşaretsiz düşününce $0{,}7 > 0{,}667 > 0{,}65$; negatiflerde sıra tersine döner.',
        ], '$-\\frac{7}{10} < -\\frac{2}{3} < -0{,}65$'),
      ],
      points: [
        'Kesir, ondalık ve yüzde aynı büyüklüğün farklı gösterimleridir.',
        'Kesri ondalığa çevirmek için payı paydaya böl.',
        'Bölme sonsuza kadar tekrar ediyorsa sayı devirli ondalıktır ve yine rasyoneldir.',
        'Karşılaştırmada iki güvenli yol: ondalığa çevirmek veya ortak paydaya getirmek.',
        'Negatif sayılarda büyüklük sırası tersine döner.',
      ],
      terms: [
        term('Pay', 'Kesir çizgisinin **üstündeki** sayı. Bütünden kaç eş parça alındığını söyler.', 'kesir-serit', '$\\frac{3}{4}$ kesrinde pay $3$’tür', { total: 4, shaded: 3 }),
        term('Payda', 'Kesir çizgisinin **altındaki** sayı. Bütünün kaç eş parçaya ayrıldığını söyler.', 'bolum-parca', '$\\frac{3}{4}$ kesrinde payda $4$’tür'),
        term('Kesir çizgisi', 'Pay ile paydayı ayıran yatay çizgi; aynı zamanda bölme anlamı taşır: $\\frac{3}{4} = 3 \\div 4$.', 'pay-payda', 'Kesri bölmeye çevirirken', { num: 3, den: 4, mark: 'line' }),
        term('Devirli ondalık sayı', 'Ondalık açılımında bir basamak veya basamak grubu sonsuza kadar tekrar eden sayı.', 'devirli', '$\\frac{1}{3} = 0{,}\\overline{3}$ gibi'),
      ],
      scenes: [
        {
          type: 'kesir-serit',
          title: 'Kesir şeridi: pay ve payda',
          hint: 'Pay ve payda sürgülerini değiştir; boyalı parça sayısı paya eşit kalır.',
          params: [
            { name: 'd', label: 'Payda (kaç eş parça)', min: 2, max: 10, step: 1, value: 4 },
            { name: 'n', label: 'Pay (kaç parça boyandı)', min: 0, max: 10, step: 1, value: 3 },
          ],
        },
      ],
      checks: [
        check(
          'Üç öğrencinin hedefe göre puan farkı $-0{,}75$, $-0{,}6$ ve $-0{,}5$ olarak yazıldı. Küçükten büyüğe doğru sıralama hangisidir?',
          ['$-0{,}5 < -0{,}6 < -0{,}75$', '$-0{,}6 < -0{,}75 < -0{,}5$', '$-0{,}75 < -0{,}6 < -0{,}5$'],
          2,
          'Hepsini yüzdeye çevir: $-75\\%$, $-60\\%$, $-50\\%$.',
          'Negatif sayılarda mutlak değeri büyük olan daha küçüktür: $-0{,}75 < -0{,}6 < -0{,}5$.',
        ),
        check(
          'Bir pastacı $\\frac{1}{3}$ kg şekeri dijital teraziye koyuyor. Bu kesrin ondalık gösterimi için hangisi doğrudur?',
          ['$0{,}3$ tam olarak eşittir', '$0{,}333\\ldots$ biçiminde devirlidir', 'Ondalık gösterimi yoktur'],
          1,
          '$1 \\div 3$ bölmesini yap: kalan hiç bitmiyor mu?',
          '$1 \\div 3 = 0{,}333\\ldots$ devirli ondalık sayıdır; $0{,}3$ ile eşit değildir.',
        ),
      ],
    }),

    week({
      id: 4,
      date: '5–9 Eki',
      theme: 'sayilar',
      topic: 'Tam sayılarla toplama, çıkarma, çarpma ve bölme',
      pages: '62–75',
      summary: [
        'Tam sayılarla toplama, sayı doğrusunda yürümeye benzer: pozitif sayı sağa, negatif sayı sola gidiştir. $\\left(+5\\right) + \\left(+3\\right)$ işlemi sıfırdan $5$ birim sağa, sonra $3$ birim daha sağa gitmek demektir; sonuç $+8$ olur. $\\left(-5\\right) + \\left(-3\\right)$ ise sola $5$, ardından $3$ birim daha gitmektir; sonuç $-8$’dir. **İşaretler aynıysa** sayılar toplanır ve ortak işaret korunur.',
        'İşaretler farklı olduğunda zıt yönlere gidildiği için bir miktar diğerini götürür. $\\left(+7\\right) + \\left(-4\\right)$ işleminde $7$ birim sağa, sonra $4$ birim sola gidilir; $3$ birim sağda kalınır, sonuç $+3$. Kural olarak **mutlak değerlerin farkı** alınır ve **büyük mutlak değerin işareti** yazılır. $7$ ile $4$’ün farkı $3$’tür ve mutlak değeri büyük olan $+7$ olduğu için sonuç pozitiftir.',
        'Çıkarma ayrı bir kural gerektirmez: **çıkarmak, tersini eklemektir**. $a - b = a + \\left(-b\\right)$ olduğundan $\\left(+3\\right) - \\left(+8\\right) = \\left(+3\\right) + \\left(-8\\right) = -5$ bulunur. Aynı biçimde $\\left(-6\\right) - \\left(-2\\right) = \\left(-6\\right) + \\left(+2\\right) = -4$ olur. Bu dönüşüm “eksi eksiyi artı yapar” gibi ezber bir cümleye değil, çıkarmanın tanımına dayanır ve her durumda çalışır.',
        'Çarpma ve bölmede işaret kuralı sadedir: **aynı işaretli** iki sayının çarpımı ve bölümü pozitif, **farklı işaretli** iki sayının çarpımı ve bölümü negatiftir. Örnekler: $\\left(+4\\right)\\cdot\\left(-5\\right) = -20$, $\\left(-4\\right)\\cdot\\left(-5\\right) = +20$, $\\left(-12\\right) \\div \\left(+3\\right) = -4$. Sıfırla çarpma sonucu sıfır yapar; sıfıra bölme tanımsızdır. Üç veya daha fazla çarpan varsa eksi işaretlerini ikişer ikişer saymak pratik bir yol sağlar.',
        'En sık yapılan hata, toplama ile çarpmayı karıştırmaktır: $\\left(-3\\right) + \\left(-3\\right) = -6$ iken $\\left(-3\\right)\\cdot\\left(-3\\right) = +9$ olur. Bu hafta her işlemde iki soruyu sesli sor: “Hangi yöne gidiyorum?” ve “Ne kadar gidiyorum?” Birincisi işareti, ikincisi büyüklüğü verir; kural ezberlemek zorunda kalmazsın.',
        'Tam sayılarla işlem yaparken işareti bir “yön” olarak düşünmek hatayı azaltır. $+$ yön değiştirmez, $-$ yönü tersine çevirir. Bu yüzden $\\left(-9\\right) - \\left(-4\\right)$ ifadesini “$-9$’dan $-4$’ü çıkar” diye değil, “$-9$’a $+4$ ekle” diye okumak güvenlidir ve sonuç $-5$ olur. İşlemleri parantezle yazmak, iki eksi işaretinin yan yana gelip birbirini götürmesini görünür kılar.',
      ],
      examples: [
        example('Çıkarmayı eklemeye çevirme', [
          '$\\left(-9\\right) - \\left(-4\\right)$ işlemini yapalım.',
          'Çıkarmak, tersini eklemektir: $\\left(-9\\right) + \\left(+4\\right)$.',
          'Mutlak değerler $9$ ve $4$; farkı $5$.',
          'Mutlak değeri büyük olan $-9$ olduğu için sonuç negatiftir.',
        ], '$-5$'),
        example('Üç çarpanlı işlem', [
          '$\\left(-3\\right)\\cdot\\left(+5\\right)\\cdot\\left(-2\\right)$ işlemini yapalım.',
          'Önce $\\left(-3\\right)\\cdot\\left(+5\\right) = -15$.',
          'Sonra $\\left(-15\\right)\\cdot\\left(-2\\right) = +30$.',
          'İki eksi işareti birbirini götürdü; sonuç pozitif.',
        ], '$+30$'),
      ],
      points: [
        'İşaretler aynı: sayıları topla, ortak işareti yaz.',
        'İşaretler farklı: mutlak değer farkını al, büyük mutlak değerin işaretini yaz.',
        'Çıkarma, tersini eklemektir: $a - b = a + \\left(-b\\right)$.',
        'Aynı işaretli iki sayının çarpımı ve bölümü pozitif, farklı işaretlilerinki negatiftir.',
        'Sıfıra bölme tanımsızdır.',
      ],
      terms: [
        term('Toplanan', 'Toplama işleminde bir araya getirilen sayılardan her biri.', 'toplama', 'Toplama ve çıkarma problemlerinde'),
        term('İşaret kuralı', 'Çarpma ve bölmede sonucun işaretini belirleyen kural: aynı işaretler çarpımı pozitif yapar.', 'isaret-kurali', 'Çok adımlı işlemlerde'),
        term('Ters eleman', 'Bir sayıyla toplandığında sıfır veren sayı; örneğin $-9$’un ters elemanı $+9$.', 'ters-sayi', 'Çıkarmayı eklemeye çevirirken'),
      ],
      scenes: [
        {
          type: 'sayma-pullari',
          title: 'Pullarla tam sayı toplama',
          hint: 'Pul sayılarını değiştir; bir (+) ve bir (−) pulun birbirini götürdüğünü gör.',
          params: [
            { name: 'p', label: 'Pozitif pul (+)', min: 0, max: 6, step: 1, value: 4 },
            { name: 'n', label: 'Negatif pul (−)', min: 0, max: 6, step: 1, value: 6 },
          ],
        },
      ],
      checks: [
        check(
          'Bir dalgıç deniz yüzeyinin $9$ m altında, yani $-9$ m konumunda. $4$ m yukarı çıkıyor. Yeni konumu kaç metredir?',
          ['$-13$ m', '$-5$ m', '$+5$ m'],
          1,
          'Yukarı çıkmak sayı doğrusunda sağa gitmektir: $(-9) + (+4)$.',
          '$(-9) + 4 = -5$; dalgıç hâlâ $5$ m derinliktedir.',
        ),
        check(
          'Bir kart oyununda üç turda sırasıyla $-3$, $+5$ ve $-2$ puan alındı. Toplam puan kaçtır?',
          ['$+30$', '$-30$', '$+10$'],
          0,
          'İki negatif çarpanın çarpımı pozitiftir; hangi sayılar çarpılıyor?',
          '$(-3) \\cdot (+5) \\cdot (-2) = (-15) \\cdot (-2) = +30$.',
        ),
      ],
    }),

    week({
      id: 5,
      date: '12–16 Eki',
      theme: 'sayilar',
      topic: 'Problem çözme, rasyonel sayılarla toplama ve çıkarma',
      pages: '76–95',
      summary: [
        'Problem çözmenin ilk adımı işlem yapmak değil, problemi anlamaktır. Verilenler, istenen ve aralarındaki ilişki yazılmadan işleme geçildiğinde işaret hataları kaçınılmaz olur. Dört adım izlemek güvenlidir: **problemi kendi cümlelerinle yaz, planı belirle, işlemi yap, sonucu kontrol et**. Sıcaklık, borç–alacak, kat–asansör ve deniz seviyesi problemlerinde sonucun işareti, “neyi pozitif kabul ettim” sorusunun cevabına bağlıdır.',
        'Rasyonel sayılarla toplama ve çıkarmada temel koşul **paydaların eşit** olmasıdır. Paydalar farklıysa kesirler, paydaların en küçük ortak katına (EKOK) genişletilir: $\\frac{2}{3} + \\frac{1}{4}$ işleminde $3$ ve $4$’ün EKOK’u $12$ olduğu için $\\frac{8}{12} + \\frac{3}{12} = \\frac{11}{12}$ bulunur. Paydaları doğrudan çarpmak da doğru sonuç verir; ancak sayılar büyür ve sadeleştirme ihtiyacı artar.',
        'Tam sayılı kesirlerle çalışırken iki yol vardır. Birincisi bileşik kesre çevirmek: $1\\frac{1}{2} + 2\\frac{1}{3} = \\frac{3}{2} + \\frac{7}{3} = \\frac{9}{6} + \\frac{14}{6} = \\frac{23}{6} = 3\\frac{5}{6}$. İkincisi tam ve kesirli kısmı ayrı işlemek: tamlar $1 + 2 = 3$, kesirler $\\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6}$, sonuç yine $3\\frac{5}{6}$. İkinci yol zihinden işlemde daha hızlıdır.',
        'Çıkarmada **eksilen ile çıkanın yeri** karıştırılmamalıdır; sıra değişirse sonucun işareti de değişir. Negatif rasyonel sayılarla çalışırken bütün sayıları aynı biçime getirmek ve işaretleri parantez içinde tutmak hata riskini azaltır. Sonucu her zaman sadeleştir; sadeleştirme sonucu değiştirmez, yalnız gösterimini basitleştirir.',
        'Sonucu kontrol etmenin en hızlı yolu tahmindir: $\\frac{3}{4} + \\frac{1}{8}$ toplamı $1$’e yakın olmalıdır, çünkü ikisi de $1$’den küçük ve biri diğerine yakın değil. Tahmin ile sonuç uyuşmuyorsa payda eşitlemede ya da sadeleştirmede hata vardır. Bu alışkanlık sınavda zaman kazandırır.',
        'Rasyonel sayılarda toplama ve çıkarmada üç adım vardır: paydaları eşitle, payları işaretleriyle topla, sonucu sadeleştir. Payda eşitlenirken yalnız payda değişmez; pay da aynı çarpanla çarpılır. $\\frac{2}{3} + \\frac{1}{4}$ işleminde EKOK $12$’dir; $\\frac{8}{12} + \\frac{3}{12} = \\frac{11}{12}$ olur. Sonucun $\\frac{1}{2}$ ile $1$ arasında kalması beklenir; $\\frac{11}{12}$ bu tahminle uyumludur.',
      ],
      examples: [
        example('Payda eşitleme', [
          '$\\frac{3}{8} + \\frac{1}{6}$ işlemini yapalım.',
          '$8$ ve $6$’nın EKOK’u $24$’tür.',
          '$\\frac{3}{8} = \\frac{9}{24}$ ve $\\frac{1}{6} = \\frac{4}{24}$.',
          '$\\frac{9}{24} + \\frac{4}{24} = \\frac{13}{24}$; $13$ ile $24$ aralarında asal olduğu için sadeleşmez.',
        ], '$\\frac{13}{24}$'),
        example('Deniz seviyesi', [
          'Bir dalgıç deniz seviyesinden $12$ m aşağıda, sonra $7$ m daha aşağı iniyor. Derinliği bulalım.',
          'Deniz seviyesini $0$ kabul edelim; aşağı yön negatiftir.',
          'Konum: $\\left(-12\\right) + \\left(-7\\right)$',
          'İşaretler aynı olduğu için mutlak değerler toplanır ve sonuç negatif olur.',
        ], '$-19$ m (deniz seviyesinin $19$ m altı)'),
      ],
      points: [
        'Önce problemi anla, sonra planla, en son işlem yap ve sonucu kontrol et.',
        'Rasyonel sayılarda toplama–çıkarma için paydalar eşitlenir.',
        'EKOK kullanmak sayıları küçük tutar.',
        'Tam sayılı kesirlerde tam ve kesirli kısımlar ayrı işlenebilir.',
        'Çıkarmada eksilen ile çıkanın sırası sonucu değiştirir.',
      ],
      terms: [
        term('Pay', 'Kesir çizgisinin üstündeki sayı; alınan parça sayısı.', 'kesir-serit', 'Toplama–çıkarmada paylar işaretleriyle toplanır', { total: 4, shaded: 3 }),
        term('Payda', 'Kesir çizgisinin altındaki sayı; bütünün bölündüğü eş parça sayısı.', 'bolum-parca', 'Toplama–çıkarmada payda eşitlenir, kendisi değişmez', { num: 3, den: 4, mark: 'den' }),
        term('En küçük ortak kat (EKOK)', 'Verilen paydaların hepsine tam bölünebilen en küçük pozitif sayı.', 'ekok', 'Payda eşitlerken'),
        term('Tam sayılı kesir', 'Bir tam sayı ile bir basit kesrin birlikte yazıldığı gösterim.', 'tam-sayili', '$2\\frac{1}{3}$ biçiminde'),
      ],
      scenes: [
        {
          type: 'kesir-toplam',
          title: 'Payda eşitleme: 2 ve 3 → 6',
          hint: 'Payları değiştir; iki kesrin altı eş parçalı şeritte nasıl birleştiğini gör.',
          params: [
            { name: 'a', label: 'Birinci kesrin payı', min: 0, max: 2, step: 1, value: 1 },
            { name: 'c', label: 'İkinci kesrin payı', min: 0, max: 3, step: 1, value: 1 },
          ],
        },
      ],
      checks: [
        check(
          'Bir bahçenin $\\frac{3}{8}$’ine domates, $\\frac{1}{6}$’sına biber ekildi. Ekili alan bahçenin kaçta kaçıdır?',
          ['$\\frac{13}{24}$', '$\\frac{4}{14}$', '$\\frac{9}{24}$'],
          0,
          'Paydaları $24$’te eşitle: $\\frac{9}{24}$ ve $\\frac{4}{24}$.',
          '$\\frac{9}{24} + \\frac{4}{24} = \\frac{13}{24}$; paydalar eşitlenmeden pay toplanmaz.',
        ),
        check(
          'Bir haritada deniz seviyesinin $15$ m altındaki bir mağara girişi için hangi tam sayı kullanılır?',
          ['$+15$', '$0$', '$-15$'],
          2,
          'Aşağı yön negatif işaretle gösterilir.',
          'Deniz seviyesi $0$ kabul edilirse $15$ m aşağısı $-15$ ile gösterilir.',
        ),
      ],
    }),

    week({
      id: 6,
      date: '19–23 Eki',
      theme: 'sayilar',
      topic: 'Çarpma, bölme ve çok adımlı işlemler',
      pages: '96–111',
      summary: [
        'Rasyonel sayılarda çarpma, toplamadan daha kolaydır: payda eşitlemeye gerek yoktur. Paylar çarpılıp paya, paydalar çarpılıp paydaya yazılır: $\\frac{2}{3}\\cdot\\frac{4}{5} = \\frac{8}{15}$. Çarpmadan **önce sadeleştirmek** işi küçültür: $\\frac{6}{7}\\cdot\\frac{14}{9}$ çarpımında $6$ ile $9$ üçe, $7$ ile $14$ yediye bölünerek sonuç doğrudan $\\frac{4}{3}$ bulunur. İşaret kuralı tam sayılardakiyle aynıdır: iki negatif çarpan pozitif, tek negatif çarpan negatif sonuç verir.',
        'Bölmede iki farklı ifadeyi ayırt etmek gerekir: “bir sayıyı kesre bölmek” ve “bir kesri sayıya bölmek”. Kural, bölmeyi çarpmaya çevirmektir: **birinci kesir aynen kalır, bölme işareti çarpmaya döner, ikinci kesrin payı ile paydası yer değiştirir**. $\\frac{3}{4} \\div \\frac{2}{5} = \\frac{3}{4}\\cdot\\frac{5}{2} = \\frac{15}{8}$. Bu kuralın nedeni basittir: $\\frac{2}{5}$ ile çarpmak bir bütünü $5$’e bölüp $2$’sini almak, bölmek ise tersini yapmaktır. Bölen sıfır olamaz.',
        'Çok adımlı işlemlerde sıra önemlidir: **önce parantez içi, sonra üslü ifadeler, ardından çarpma–bölme (soldan sağa), en son toplama–çıkarma (soldan sağa)**. $3 + 2\\cdot\\left(5 - 1\\right)^2$ işleminde sırasıyla parantez $\\left(4\\right)$, üs $\\left(16\\right)$, çarpma $\\left(32\\right)$ ve toplama $\\left(35\\right)$ yapılır. Aynı öncelikteki işlemler soldan sağa yürütülür; bu yüzden $20 \\div 5\\cdot 2$ ifadesi $8$’dir, çünkü bölme önce gelir.',
        'Kesir çizgisi görünmez bir parantez gibidir: $\\frac{2 + 3}{4 + 1}$ ifadesinde pay ve payda ayrı ayrı hesaplanır. Uzun ifadelerde her adımı yazmak, zihinden atlanan adımın hatasını önler. Sonucu tahminle karşılaştırmak güçlü bir kontroldür: $\\frac{3}{4}\\cdot\\frac{2}{5}$ çarpımı $1$’den küçük olmalıdır, çünkü iki çarpan da $1$’den küçüktür.',
        'Dağılma özelliği çok adımlı işlemlerde işi kısaltır: $\\frac{1}{2}\\cdot\\left(\\frac{3}{5} + \\frac{1}{5}\\right)$ ifadesinde önce parantez içi $\\frac{4}{5}$ bulunup $\\frac{1}{2}$ ile çarpılabilir ya da $\\frac{1}{2}$ her terime dağıtılabilir. İki yol da aynı sonucu verir: $\\frac{2}{5}$. Hangi yolun daha az işlem gerektirdiğine bakmak, pratik düşünmenin parçasıdır.',
        'Çarpma ve bölmede işaret kuralı toplama–çıkarmadan farklıdır: aynı işaretli iki sayının çarpımı pozitif, zıt işaretli iki sayının çarpımı negatiftir. Bölmede de kural aynıdır, çünkü bölme çarpmaya çevrilebilir: $\\frac{a}{b} = a\\cdot\\frac{1}{b}$. Kesirlerde çarpımda payda eşitlemek gerekmez; paylar çarpılır, paydalar çarpılır. Bu yüzden $\\frac{2}{3}\\cdot\\frac{3}{4} = \\frac{6}{12} = \\frac{1}{2}$ işlemi payda eşitlemeden yapılır.',
      ],
      examples: [
        example('Bölmeyi çarpmaya çevirme', [
          '$\\frac{2}{3} \\div \\frac{4}{9}$ işlemini yapalım.',
          'İkinci kesri ters çevirip çarpalım: $\\frac{2}{3}\\cdot\\frac{9}{4}$.',
          'Sadeleştirelim: $9$ ile $3$ üçe bölünür, $\\frac{2}{1}\\cdot\\frac{3}{4}$.',
          '$\\frac{2 \\cdot 3}{1 \\cdot 4} = \\frac{6}{4} = \\frac{3}{2}$.',
        ], '$\\frac{3}{2}$'),
        example('İşlem sırası', [
          '$3 + 2\\cdot\\left(5 - 1\\right)^2$ işlemini adım adım yapalım.',
          'Parantez: $5 - 1 = 4$.',
          'Üs: $4^2 = 16$.',
          'Çarpma: $2 \\cdot 16 = 32$.',
          'Toplama: $3 + 32 = 35$.',
        ], '$35$'),
      ],
      points: [
        'Çarpmada paylar çarpılır paya, paydalar çarpılır paydaya yazılır.',
        'Çarpmadan önce sadeleştirmek sayıları küçük tutar.',
        'Bölmede ikinci kesir ters çevrilip çarpılır.',
        'İşlem sırası: parantez → üs → çarpma/bölme → toplama/çıkarma.',
        'Kesir çizgisi pay ve payda için görünmez parantez işlevi görür.',
      ],
      terms: [
        term('Pay', 'Kesir çizgisinin üstündeki sayı; çarpma ve bölmede pay ile işlem yapılır.', 'kesir-serit', 'Çarpma ve bölmede', { total: 4, shaded: 3 }),
        term('Payda', 'Kesir çizgisinin altındaki sayı; çarpmada paydalar da çarpılır.', 'bolum-parca', 'Çarpma ve bölmede', { num: 3, den: 4, mark: 'den' }),
        term('Ters kesir', 'Bir kesrin payı ile paydasının yer değiştirmesiyle elde edilen kesir; çarpımı $1$ eder.', 'kesir-carpim', 'Bölmeyi çarpmaya çevirirken'),
        term('İşlem önceliği', 'Birden fazla işlem içeren ifadelerde önce parantez, sonra çarpma–bölme, en son toplama–çıkarma yapılır.', 'islem-onceligi', 'Çok adımlı sorularda'),
      ],
      scenes: [
        {
          type: 'kesir-carpim',
          title: 'Kesirlerde çarpma: alan modeli',
          hint: 'Pay ve paydaları değiştir; kesişen boyalı kare sayısı çarpımı verir.',
          params: [
            { name: 'n1', label: 'Birinci kesrin payı', min: 1, max: 4, step: 1, value: 2 },
            { name: 'd1', label: 'Birinci kesrin paydası', min: 2, max: 5, step: 1, value: 3 },
            { name: 'n2', label: 'İkinci kesrin payı', min: 1, max: 4, step: 1, value: 3 },
            { name: 'd2', label: 'İkinci kesrin paydası', min: 2, max: 5, step: 1, value: 4 },
          ],
        },
      ],
      checks: [
        check(
          'Bir şişede $\\frac{2}{3}$ litre meyve suyu var. Her bardak $\\frac{4}{9}$ litre alıyor. Şişe kaç bardak doldurur?',
          ['$\\frac{8}{27}$', '$\\frac{3}{2}$', '$\\frac{2}{3}$'],
          1,
          'Bölmeyi, ikinci kesrin tersiyle çarpma olarak yaz.',
          '$\\frac{2}{3} \\div \\frac{4}{9} = \\frac{2}{3} \\cdot \\frac{9}{4} = \\frac{18}{12} = \\frac{3}{2}$ bardak.',
        ),
        check(
          'Bir oyun uygulaması puanı şöyle hesaplıyor: $18$ puanı $3$’e böl, çıkan sonucu $2$ ile çarp. Uygulamanın verdiği puan kaçtır?',
          ['$3$', '$27$', '$12$'],
          2,
          'Bölme ve çarpma aynı önceliktedir; soldan sağa uygulanır.',
          '$18 \\div 3 = 6$, sonra $6 \\cdot 2 = 12$. Önce çarpmak işlem sırasını bozar.',
        ),
      ],
    }),

    week({
      id: 7,
      date: '26–30 Eki',
      theme: 'sayilar',
      topic: '1. tema ölçme ve 5 Kasım sınavına hazırlık',
      pages: '112–116',
      summary: [
        'Bu hafta yeni bir konu eklenmiyor; ilk altı haftanın tamamı tekrar edilip sınava hazırlık yapılıyor. Tekrar, konuları baştan okumak değildir; **hangi soru tipinde hata yaptığını bulup o hatayı kapatmaktır**. Bu yüzden önce kısa bir tanı çalışması yap: her alt başlıktan birer soru çöz ve yanlışlarını “işaret hatası”, “payda eşitleme”, “işlem sırası”, “soru okuma” başlıklarına ayır.',
        'Sık yapılan hatalar bellidir. Birincisi negatif sayılarda sıralamayı tersine çevirmeyi unutmak: $-\\frac{7}{10} < -\\frac{2}{3}$ olmasına rağmen işaretsiz düşünüp tersini yazmak. İkincisi çıkarmayı eklemeye çevirirken işareti kaçırmak: $\\left(-9\\right) - \\left(-4\\right)$ işlemini $-13$ bulmak. Üçüncüsü paydaları eşitlemeden payları toplamak: $\\frac{1}{2} + \\frac{1}{3}$ için $\\frac{2}{5}$ yazmak. Dördüncüsü işlem sırasını atlamak: $2 + 3\\cdot 4$ ifadesini $20$ bulmak. Beşincisi problemde hangi yönü pozitif kabul ettiğini yazmamak.',
        'Sınavda süre yönetimi de bir beceridir. Önce kısa ve tanıdık soruları çöz, uzun problemleri sona bırak. Her sorudan sonra birkaç saniye kontrol et: işaret mantıklı mı, büyüklük tahminle uyuşuyor mu? Örneğin iki pozitif kesrin toplamı, toplananlardan birinden küçük çıkamaz. Boş bırakmak yerine mantıklı bir tahmin yazmak, düşünceni görünür kılar ve kısmi değerlendirme şansı verir.',
        'Bu haftanın ürünü kişisel bir hata listesi olsun. Her hata için tek satır yaz: hata türü, doğru yöntem, bir örnek. Örneğin “payda eşitlemeden topladım → önce EKOK al → $\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$”. Sınavdan önce yalnız bu listeyi okumak, tüm konuyu baştan okumaktan daha etkilidir.',
        'Sınav öncesi son gün yeni konu öğrenilmez; var olan bilgi düzenlenir. Bunun için iki kısa çalışma yeterlidir: kendi hata listeni bir kez oku ve her madde için bir örnek çöz; ardından karışık on soruluk bir seti süre tutarak çöz. Süre tutmak, soru başına ne kadar zaman harcadığını gösterir ve sınav günü hangi soruyu sona bırakacağını önceden belirlemeni sağlar.',
      ],
      examples: [
        example('Hata düzeltme', [
          'Bir öğrenci $\\frac{1}{2} + \\frac{1}{3} = \\frac{2}{5}$ yazdı. Hatayı bulalım.',
          'Hata: paydalar eşitlenmeden paylar toplanmış.',
          'Doğru yol: $2$ ve $3$’ün EKOK’u $6$.',
          '$\\frac{1}{2} = \\frac{3}{6}$ ve $\\frac{1}{3} = \\frac{2}{6}$.',
          '$\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.',
        ], '$\\frac{5}{6}$'),
        example('İşaret ve sıralama', [
          '$-\\frac{3}{5}$ ile $-\\frac{2}{3}$ sayılarını sıralayalım.',
          'Ondalığa çevirelim: $-0{,}6$ ve $-0{,}\\overline{6} \\approx -0{,}667$.',
          'İşaretsiz düşününce $0{,}667 > 0{,}6$; negatiflerde sıra tersine döner.',
        ], '$-\\frac{2}{3} < -\\frac{3}{5}$'),
      ],
      points: [
        'Tekrar, hata türlerini kapatmaktır; baştan sona okumak değildir.',
        'Negatif sayılarda büyüklük sırası tersine döner.',
        'Çıkarmayı eklemeye çevirirken işareti parantezle takip et.',
        'Rasyonel sayılarda toplama–çıkarma için payda eşitlenir.',
        'Şüpheli sonuçta büyüklük tahmini yap; tahminle uyuşmayan sonuç hatalıdır.',
      ],
      terms: [
        term('Tanı çalışması', 'Hangi konuda eksik olduğunu bulmak için yapılan kısa, karışık soru seti.', 'islem-onceligi', 'Sınav öncesi tekrar planında'),
        term('Hata listesi', 'Yapılan hataların türü, doğru yöntemi ve örneğiyle yazıldığı kişisel liste.', 'sadelestirme', 'Sınavdan önce son tekrarda'),
        term('Süre yönetimi', 'Sınavda kolay soruları öne alıp zor sorulara yeterli zaman bırakma planı.', null, 'Sınav sırasında'),
      ],
      scenes: [
        {
          type: 'isaret-kurali',
          title: 'İşaret kuralı: toplam ve çarpım',
          hint: 'İki sayıyı değiştir; toplamın ve çarpımın işaretinin nasıl değiştiğini karşılaştır.',
          params: [
            { name: 'a', label: 'Birinci sayı (a)', min: -6, max: 6, step: 1, value: -4 },
            { name: 'b', label: 'İkinci sayı (b)', min: -6, max: 6, step: 1, value: 3 },
          ],
        },
      ],
      checks: [
        check(
          'Bir öğrenci $(-9) - (-4)$ işlemini $-13$ olarak yazdı. Hata nerede?',
          ['$-4$’ün işaretini değiştirmeden çıkarmış', 'Sonucu yanlış basamakta yazmış', 'Toplamayı çarpmaya çevirmiş'],
          0,
          'Çıkarma, ikinci sayının tersini eklemektir.',
          '$(-9) - (-4) = (-9) + (+4) = -5$; öğrenci $-4$’ü $-4$ olarak bırakıp $-9 - 4$ yapmış.',
        ),
        check(
          'Bir pizza $8$ eşit dilime ayrıldı ve $3$ dilimi yendi. Kalan pizza bütünün kaçta kaçıdır?',
          ['$\\frac{3}{8}$', '$\\frac{5}{8}$', '$\\frac{5}{3}$'],
          1,
          'Kalan dilim sayısını toplam dilim sayısına böl.',
          '$8 - 3 = 5$ dilim kaldı; bu, bütünün $\\frac{5}{8}$’idir.',
        ),
      ],
    }),

    week({
      id: 8,
      date: '2–6 Kas',
      theme: 'geometri',
      topic: 'Cisimlerin farklı yönlerden görünümleri',
      pages: '117–124',
      summary: [
        'Bir cismi tek açıdan görmek biçimi hakkında yeterli bilgi vermez. Bir kutuyu önden, yandan ve üstten görürüz; her bakış farklı bilgi taşır. Dikdörtgenler prizmasının üç temel görünümü vardır: **ön görünüm**, **yan görünüm** ve **üst görünüm**. Bu üç görünüm birlikte cismi büyük ölçüde belirler; ancak her zaman tek başına yeterli değildir, çünkü farklı cisimler aynı görünümü verebilir.',
        'Prizmanın temel elemanları yüz, ayrıt ve köşedir. Dikdörtgenler prizmasında $6$ yüz, $12$ ayrıt ve $8$ köşe bulunur. Bu sayılar ezberlenmeden de bulunabilir: her yüzün $4$ ayrıtı vardır ve her ayrıt iki yüze ait olduğu için $6\\cdot 4 \\div 2 = 12$ ayrıt elde edilir. Küp, bütün yüzleri eş kare olan özel bir dikdörtgenler prizmasıdır; $6$ yüzünün alanı da eşittir.',
        'Eş küplerle kurulmuş yapılarda görünüm ile küp sayısı birlikte düşünülmelidir. Önden bakıldığında görünen kare sayısı, o yöndeki **en yüksek sütunun** yüksekliğini verir. Üstten bakış taban alanındaki küp sayısını gösterir; arkada kalan küpler üstten görünür ama önden bakışta gizlenebilir. Bu yüzden bir yapının küp sayısını bulurken üç görünümü birlikte kullanmak, gizli küpleri fark etmeyi sağlar.',
        'Görünümlerde ölçü eşleşmeleri önemlidir: ön görünüm genişlik ve yükseklik, yan görünüm derinlik ve yükseklik, üst görünüm genişlik ve derinlik verir. Bu üç çift, üç boyutun (genişlik, yükseklik, derinlik) ikili eşleşmeleridir. İlişkiyi fark etmek, ilerleyen haftalarda yüzey alanı ve hacim bağıntılarının temelini kurar.',
        'Uygulamada bu hafta **3B görünüm** kullanılıyor: prizmayı sürükleyerek döndürebilir, yüksekliği değiştirerek görünümlerin nasıl değiştiğini izleyebilirsin. Döndürme sırasında üç yüzün aynı anda görünmesi, üç görünümün neden birlikte gerektiğini somutlaştırır.',
      ],
      examples: [
        example('Ayrıt sayısı', [
          'Bir dikdörtgenler prizmasının ayrıt sayısını hesaplayalım.',
          'Prizmada $6$ yüz vardır ve her yüz dikdörtgendir, yani $4$ ayrıtı vardır.',
          'Her ayrıt iki yüzün ortak kenarıdır; bu yüzden iki kez sayılır.',
          '$6\\cdot 4 = 24$, $24 \\div 2 = 12$.',
        ], '$12$ ayrıt'),
        example('Gizli küp', [
          'Önden $3$ kare genişlik, $2$ kare yükseklik görünen bir yapı düşünelim.',
          'Önden görünüm en yüksek sütunun $2$ küp olduğunu söyler; toplam küp sayısını söylemez.',
          'Üstten görünüm tabanda $3$ kare olduğunu gösteriyorsa arkadaki sütun $1$ küp olabilir.',
          'Toplam küp sayısı $3 + 3 = 6$ değil, $3 + 2 = 5$ olabilir; kesin sayı için üç görünüm birlikte gerekir.',
        ], 'Kesin sayı ancak üç görünüm birlikte okunursa bulunur.'),
      ],
      points: [
        'Dikdörtgenler prizmasında $6$ yüz, $12$ ayrıt, $8$ köşe vardır.',
        'Ön, yan ve üst görünüm birlikte cismin biçimini belirler.',
        'Önden görünen kare sayısı, o yöndeki en yüksek sütunu verir.',
        'Üstten görünüm taban alanını, yan görünüm derinliği gösterir.',
        'Küp, bütün yüzleri eş kare olan özel bir prizmadır.',
      ],
      terms: [
        term('Ayrıt', 'İki yüzün kesiştiği doğru parçası. Prizmada $12$ ayrıt vardır.', 'ayrit', 'Ayrıt, yüz ve köşe sayarken'),
        term('Ön / yan / üst görünüm', 'Cisme önden, yandan ve üstten bakıldığında görülen iki boyutlu görüntü.', 'gorunum', 'Görünüm sorularında'),
        term('Eş küp', 'Kenar uzunluğu aynı olan, birim hacim olarak kullanılabilen küp.', 'birim-kup', 'Küplerle kurulan yapılarda'),
      ],
      scenes: [
        {
          type: 'uc-gorunum',
          title: 'Üç yönden görünüm: ön, yan, üst',
          hint: 'Genişlik, derinlik ve yüksekliği değiştir; üç görünümdeki kare sayısı birlikte değişir.',
          params: [
            { name: 'a', label: 'Genişlik (ön görünüm)', min: 1, max: 4, step: 1, value: 3 },
            { name: 'b', label: 'Derinlik (yan görünüm)', min: 1, max: 3, step: 1, value: 2 },
            { name: 'h', label: 'Yükseklik', min: 1, max: 3, step: 1, value: 2 },
          ],
        },
      ],
      checks: [
        check(
          'Bir hediye kutusunun bütün ayrıtlarına şerit çekilecek. Dikdörtgenler prizması biçimindeki kutuda toplam ayrıt sayısı kaçtır?',
          ['$6$', '$8$', '$12$'],
          2,
          '$6$ yüzün her birinde $4$ ayrıt vardır; her ayrıt kaç yüze aittir?',
          '$6 \\cdot 4 = 24$, her ayrıt iki yüze ait olduğu için $24 \\div 2 = 12$ ayrıt vardır.', 'prizma',
        ),
        check(
          'Eş küplerle kurulan bir yapı önden bakıldığında $3$ kare genişliğinde, $2$ kare yüksekliğinde görünüyor. Bu görünümden kesinlikle çıkan sonuç hangisidir?',
          ['Yapıda $6$ küp vardır', 'En yüksek sütun $2$ küptür', 'Yapıda $3$ küp vardır'],
          1,
          'Önden görünen yükseklik, o yöndeki en yüksek sütunu verir.',
          'Önden $2$ kare yükseklik görünüyorsa en yüksek sütun $2$ küptür; toplam küp sayısı derinliğe bağlıdır.',
        ),
      ],
    }),

    week({
      id: 9,
      date: '9–13 Kas',
      theme: 'geometri',
      topic: 'Dikdörtgenler prizmasının açınımı ve yüzey alanı',
      pages: '125–133',
      summary: [
        'Bir kutuyu ayrıtları boyunca kesip açtığında elde ettiğin düz şekle **açınım** denir. Açınım, cismin yüzeyini tek bir düzlemde gösterdiği için yüzey alanı hesabının en somut aracıdır. Dikdörtgenler prizmasının açınımında $6$ dikdörtgen bulunur; karşılıklı yüzler eş olduğu için üç farklı boyutta dikdörtgen çifti vardır.',
        'Kenar uzunlukları $a$, $b$ ve $c$ olan bir dikdörtgenler prizmasının yüzey alanı $2\\left(ab + ac + bc\\right)$ bağıntısıyla bulunur. Buradaki üç çarpım, üç farklı yüz çiftinin alanıdır; $2$ çarpanı her yüzün karşıtının aynı alana sahip olmasından gelir. Küp için $a = b = c$ olduğundan bağıntı $6a^2$ biçimini alır. Yüzey alanının birimi santimetrekare, metrekare gibi **kare birimlerdir**.',
        'Yüzey alanı sorularında en sık yapılan hata, bütün yüzleri aynı kabul etmektir. $5$ cm, $3$ cm ve $2$ cm boyutlu bir prizmada yüzey alanı $2\\left(5\\cdot 3 + 5\\cdot 2 + 3\\cdot 2\\right) = 2\\left(15 + 10 + 6\\right) = 62\\ \\mathrm{cm}^2$ olur. Yalnız bir yüzün alanını hesaplayıp $6$ ile çarpmak yanlış sonuç verir; çünkü yüzler eş değildir.',
        'Günlük hayatta yüzey alanı “ne kadar malzeme gerekir” sorusunun cevabıdır: kutuyu kaplamak için gereken karton, duvarları boyamak için gereken boya miktarı, havuzun iç yüzeyini kaplamak için gereken fayans. Bu problemlerde bazı yüzlerin sayılmadığına dikkat et: kapaksız bir kutuda üst yüz hesaba katılmaz. Soruyu okurken “hangi yüzeyler gerçekten var?” sorusunu sormak fazla malzeme hesabını önler.',
        'Uygulamada prizmayı döndürerek açınımın nasıl katlandığını izleyebilir, boyutları değiştirerek yüzey alanının hangi yüz çiftinden ne kadar etkilendiğini görebilirsin. Üç boyuttan birini büyütmek, yüzey alanını iki yüz çifti üzerinden artırır; bu gözlem bağıntıyı ezber olmaktan çıkarır.',
      ],
      examples: [
        example('Yüzey alanı', [
          '$2$ cm, $3$ cm ve $4$ cm ayrıtlı prizmanın yüzey alanını bulalım.',
          'Üç farklı yüz çiftinin alanı: $2\\cdot 3 = 6$, $2\\cdot 4 = 8$, $3\\cdot 4 = 12$.',
          'Toplam: $6 + 8 + 12 = 26$. Her yüzün karşıtı olduğu için $2$ ile çarpalım.',
          '$2 \\cdot 26 = 52$.',
        ], '$52\\ \\mathrm{cm}^2$'),
        example('Küpten ayrıt bulma', [
          'Yüzey alanı $150\\ \\mathrm{cm}^2$ olan küpün bir ayrıtını bulalım.',
          'Küpte yüzey alanı $6a^2$’dir.',
          '$6a^2 = 150$ ise $a^2 = 25$.',
          'Kareköklü çözüm: $a = 5$.',
        ], '$5$ cm'),
      ],
      points: [
        'Açınım, cismin yüzeyini düzlemde gösterir; prizmada $6$ dikdörtgen vardır.',
        'Yüzey alanı: $2\\left(ab + ac + bc\\right)$; küpte $6a^2$.',
        'Yüzey alanının birimi kare birimdir ($\\mathrm{cm}^2$, $\\mathrm{m}^2$).',
        'Kapaksız veya tabansız cisimlerde eksik yüzeyler hesaba katılmaz.',
        'Tüm yüzleri eş kabul etmek en sık yapılan hatadır.',
      ],
      terms: [
        term('Açınım', 'Cismin yüzeylerinin bir düzlemde açılmış hâli; prizmada $6$ dikdörtgen.', 'acim-cizim', 'Yüzey alanı hesabının öncesinde'),
        term('Yüzey alanı', 'Cismin bütün yüzeylerinin alanları toplamı: $2\\left(ab+ac+bc\\right)$.', 'yuzey-alani', 'Kutu kaplama, boya, fayans sorularında'),
        term('Kare birim', 'Kenarı bir birim olan karenin alanına dayanan alan ölçü birimi ($\\mathrm{cm}^2$).', 'kare-birim', 'Bütün alan sonuçlarında'),
      ],
      scenes: [
        {
          type: 'acim',
          title: 'Açınım ve yüzey alanı',
          hint: 'Boyutları değiştir; altı yüzün toplam alanı kendiliğinden hesaplanır.',
          params: [
            { name: 'a', label: 'Genişlik', min: 1, max: 5, step: 1, value: 4 },
            { name: 'b', label: 'Derinlik', min: 1, max: 5, step: 1, value: 3 },
            { name: 'h', label: 'Yükseklik', min: 1, max: 5, step: 1, value: 2 },
          ],
        },
      ],
      checks: [
        check(
          'Ayrıtları $2$ cm, $3$ cm ve $4$ cm olan prizma biçimindeki bir kutu tamamen kaplanacak. Kaç cm² kâğıt gerekir?',
          ['$24$', '$46$', '$52$'],
          2,
          'Üç farklı yüzün alanını topla, sonra $2$ ile çarp.',
          '$2 \\cdot (2 \\cdot 3 + 2 \\cdot 4 + 3 \\cdot 4) = 2 \\cdot (6 + 8 + 12) = 52$ cm².', 'prizma',
        ),
        check(
          'Yüzey alanı $150\\ \\mathrm{cm}^2$ olan bir küp şeker kutusunun bir ayrıtı kaç cm’dir?',
          ['$5$', '$6$', '$25$'],
          0,
          'Küpün $6$ eş yüzü vardır; bir yüzün alanını bul, sonra karekök al.',
          'Bir yüz $150 \\div 6 = 25$ cm²; ayrıt $\\sqrt{25} = 5$ cm’dir.',
        ),
      ],
    }),

    week({
      id: 10,
      date: '23–27 Kas',
      theme: 'geometri',
      topic: 'Hacim: eş nesnelerle yorumlama ve hacim bağıntısı',
      pages: '134–143',
      summary: [
        'Hacim, bir cismin uzayda kapladığı yerdir. Hacmi ölçmenin en somut yolu **birim küp** kullanmaktır: kenarı $1$ birim olan küpün hacmi $1$ birimküptür. Bir kutunun içine kaç birim küp yerleştirilebiliyorsa hacmi o sayı kadardır. Bu yöntem, bağıntıyı ezberlemeden önce anlamayı sağlar.',
        'Dikdörtgenler prizmasının hacmi üç boyutun çarpımıdır: $V = a\\cdot b\\cdot c$. Bunu katman mantığıyla açıklayabiliriz: tabana bir sıra birim küp dizdiğinde taban alanı kadar ($a\\cdot b$) küp olur; bu katmandan $c$ kat üst üste konduğunda $a\\cdot b\\cdot c$ küp elde edilir. Bu yüzden hacim “taban alanı $\\times$ yükseklik” olarak da yazılır. Küpte $a = b = c$ olduğundan $V = a^3$ olur.',
        'Hacim ölçüsünde birim seçimi önemlidir: santimetreküp ($\\mathrm{cm}^3$), desimetreküp ($\\mathrm{dm}^3$) ve metreküp ($\\mathrm{m}^3$). Boyutlar aynı birime çevrilmeden çarpılırsa sonuç yanlış birimde çıkar. $40$ cm, $30$ cm ve $20$ cm boyutlu bir kutunun hacmi $24.000\\ \\mathrm{cm}^3$’tür; bu da $24\\ \\mathrm{dm}^3$ ya da $0{,}024\\ \\mathrm{m}^3$ demektir.',
        'Hacim ile kapasite sık karıştırılır. **Kapasite**, bir kabın içine sığan sıvı miktarıdır ve litre ile ölçülür. $1\\ \\mathrm{dm}^3 = 1\\ \\mathrm{L}$ ve $1\\ \\mathrm{cm}^3 = 1\\ \\mathrm{mL}$ eşitliği iki kavramı birbirine bağlar; bu yüzden “$2$ litrelik şişe” aslında $2\\ \\mathrm{dm}^3$ hacminde bir kaptır.',
        'Hacim hesabını kontrol etmenin pratik yolu tahmindir: $20 \\times 15 \\times 10$ boyutlu bir kutu için önce zihinden “yaklaşık $300 \\times 10 = 3000$” diye düşün, sonra ayrıntılı işlemi yap. İki sonuç birbirine yakın değilse birim ya da çarpma hatası vardır.',
        'Hacim sorularında en sık yapılan hata birim karışıklığıdır. Boyutlardan biri metre, diğeri santimetre verilmişse önce aynı birime çevirmek gerekir; aksi hâlde sonuç anlamsız bir sayı olur. İkinci sık hata, hacim yerine yüzey alanı bağıntısını kullanmaktır. Hızlı ayrım şudur: “içine ne kadar sığar” sorusu hacim, “dışını kaplamak için ne kadar gerekir” sorusu yüzey alanıdır.',
      ],
      examples: [
        example('Hacim', [
          '$5$ cm, $4$ cm ve $3$ cm ayrıtlı prizmanın hacmini bulalım.',
          'Bağıntı: $V = a\\cdot b\\cdot c$.',
          '$V = 5\\cdot 4\\cdot 3$.',
          'Önce $5\\cdot 4 = 20$, sonra $20\\cdot 3 = 60$.',
        ], '$60\\ \\mathrm{cm}^3$'),
        example('Kapasiteye çevirme', [
          '$20$ cm, $15$ cm ve $10$ cm boyutlu bir kabın kaç litre aldığını bulalım.',
          'Hacim: $20\\cdot 15\\cdot 10 = 3000\\ \\mathrm{cm}^3$.',
          '$1\\ \\mathrm{dm}^3 = 1000\\ \\mathrm{cm}^3$ ve $1\\ \\mathrm{dm}^3 = 1\\ \\mathrm{L}$.',
          '$3000 \\div 1000 = 3$.',
        ], '$3$ L'),
      ],
      points: [
        'Hacim, cismin uzayda kapladığı yerdir; birim küple ölçülür.',
        'Dikdörtgenler prizmasında $V = a\\cdot b\\cdot c$.',
        'Hacim, taban alanı $\\times$ yükseklik olarak da hesaplanır.',
        'Küpte $V = a^3$.',
        '$1\\ \\mathrm{dm}^3 = 1\\ \\mathrm{L}$ ve $1\\ \\mathrm{cm}^3 = 1\\ \\mathrm{mL}$.',
      ],
      terms: [
        term('Hacim', 'Bir cismin uzayda kapladığı yerin ölçüsü; $V = a\\cdot b\\cdot c$.', 'hacim', 'Depo, akvaryum, kutu sorularında'),
        term('Birim küp', 'Kenar uzunluğu $1$ birim olan, hacim ölçmede kullanılan küp.', 'birim-kup', 'Katman mantığını kurarken'),
        term('Kapasite', 'Bir kabın içine sığabilecek sıvı miktarı; litre ile ölçülür.', 'litre-kup', '$1\\ \\mathrm{dm}^3 = 1\\ \\mathrm{L}$ dönüşümünde'),
      ],
      scenes: [
        {
          type: 'hacim',
          title: 'Hacim: katmanlar hâlinde birim küpler',
          hint: 'Taban boyutlarını ve katman sayısını değiştir; her katman taban alanı kadar küp taşır.',
          params: [
            { name: 'a', label: 'Taban uzunluğu', min: 1, max: 4, step: 1, value: 3 },
            { name: 'b', label: 'Taban genişliği', min: 1, max: 4, step: 1, value: 2 },
            { name: 'h', label: 'Katman sayısı', min: 1, max: 4, step: 1, value: 2 },
          ],
        },
      ],
      checks: [
        check(
          '$5$ cm, $4$ cm ve $3$ cm ayrıtlı bir kutu tamamen doldurulacak. Kutunun hacmi kaç $\\mathrm{cm}^3$’tür?',
          ['$12$', '$60$', '$94$'],
          1,
          'Hacim $=$ taban alanı $\\times$ yükseklik.',
          '$5 \\cdot 4 \\cdot 3 = 60$ cm³; $12$ yalnızca ayrıt toplamı, $94$ ise yüzey alanıdır.', 'hacim',
        ),
        check(
          'Bir ayrıtı $3$ cm olan küp biçimindeki zar için hangisi doğrudur?',
          ['Hacim $27\\ \\mathrm{cm}^3$, yüzey alanı $54\\ \\mathrm{cm}^2$', 'Hacim $54\\ \\mathrm{cm}^3$, yüzey alanı $27\\ \\mathrm{cm}^2$', 'İkisi de $27$'],
          0,
          'Hacim $a^3$, yüzey alanı $6a^2$; ikisi farklı büyüklüklerdir.',
          '$3^3 = 27$ cm³ ve $6 \\cdot 3^2 = 54$ cm²; hacim ile yüzey alanı karıştırılmamalıdır.',
        ),
      ],
    }),

    week({
      id: 11,
      date: '30 Kas–4 Ara',
      theme: 'geometri',
      topic: 'Hacim ölçme birimleri ve prizma problemleri',
      pages: '144–156',
      summary: [
        'Hacim ölçme birimleri onluk sistemin küpüyle büyür: her adımda $10$ değil **$1000$** kat fark vardır. Nedeni, hacmin üç boyutlu bir ölçü olmasıdır; bir kenar $10$ katına çıktığında hacim $10\\cdot 10\\cdot 10 = 1000$ katına çıkar. Bu yüzden $1\\ \\mathrm{m}^3 = 1000\\ \\mathrm{dm}^3$, $1\\ \\mathrm{dm}^3 = 1000\\ \\mathrm{cm}^3$ ve $1\\ \\mathrm{cm}^3 = 1000\\ \\mathrm{mm}^3$ olur. Büyük birimden küçüğe çevirirken $1000$ ile çarpar, küçükten büyüğe çevirirken $1000$’e böleriz.',
        'Sıvı ölçme birimleriyle ilişki bu tabloyu daha kullanışlı hâle getirir: $1\\ \\mathrm{dm}^3 = 1\\ \\mathrm{L}$ ve $1\\ \\mathrm{cm}^3 = 1\\ \\mathrm{mL}$. Bu eşitlik sayesinde “$2{,}5$ litrelik sürahi” ifadesini hacim diliyle $2{,}5\\ \\mathrm{dm}^3$ ya da $2500\\ \\mathrm{cm}^3$ olarak yazabiliriz. $200$ mL’lik bir bardak, $200\\ \\mathrm{cm}^3$ hacminde bir kaptır.',
        'Prizma problemlerinde iki soru tipi öne çıkar: verilen boyutlardan hacmi bulmak ve verilen hacimden bir boyutu bulmak. İkincisinde bağıntıyı tersine kullanırız: $V = a\\cdot b\\cdot c$ ise $c = \\frac{V}{a\\cdot b}$ olur. Hacmi $120\\ \\mathrm{cm}^3$, taban boyutları $5$ cm ve $4$ cm olan prizmanın yüksekliği $\\frac{120}{20} = 6$ cm’dir. Burada dikkat edilecek nokta, hacim biriminin diğer boyutlarla uyumlu olmasıdır.',
        'Gerçek yaşam problemleri çoğu zaman birkaç adım ister: akvaryumun kaç litre su aldığını bulmak, deponun dolma süresini hesaplamak, kutunun içine kaç küçük kutu sığacağını belirlemek. Bu problemlerde önce bütün ölçüleri aynı birime çevir, sonra hacmi hesapla, en son istenen birime dönüştür. Sonucun büyüklüğünü tahminle karşılaştırmak, birim hatasını yakalamanın en hızlı yoludur.',
        'Bir kabın içine küçük kutular yerleştirilecekse yalnız hacimleri bölmek her zaman yetmez; kutuların boyutlarının da uyması gerekir. Örneğin $10\\times 5\\times 4$ bir kutuya $2\\times 2\\times 2$ küpler ancak bir sırada $5$, $2$, $2$ adet olacak biçimde yerleşir; hacim oranı üst sınırı verir, gerçek sayı daha küçük olabilir. Bu ayrım, hacim bilgisinin gerçek hayatta nasıl kullanıldığını gösterir.',
      ],
      examples: [
        example('Birim dönüşümü', [
          '$3{,}5\\ \\mathrm{dm}^3$ kaç $\\mathrm{cm}^3$’tür?',
          '$1\\ \\mathrm{dm}^3 = 1000\\ \\mathrm{cm}^3$.',
          'Büyük birimden küçüğe iniyoruz; $1000$ ile çarpalım.',
          '$3{,}5 \\cdot 1000 = 3500$.',
        ], '$3500\\ \\mathrm{cm}^3$'),
        example('Boyut bulma', [
          'Taban alanı $40\\ \\mathrm{cm}^2$, hacmi $360\\ \\mathrm{cm}^3$ olan prizmanın yüksekliğini bulalım.',
          '$V = \\text{taban alanı} \\cdot h$.',
          '$360 = 40 \\cdot h$.',
          '$h = 360 \\div 40 = 9$.',
        ], '$9$ cm'),
      ],
      points: [
        'Hacim birimleri arasında her adımda $1000$ kat fark vardır.',
        'Büyük birimden küçüğe çevirirken $1000$ ile çarp.',
        '$1\\ \\mathrm{dm}^3 = 1\\ \\mathrm{L}$ ve $1\\ \\mathrm{cm}^3 = 1\\ \\mathrm{mL}$.',
        'Verilen hacimden boyut bulmak için $c = \\frac{V}{a\\cdot b}$ kullanılır.',
        'İşlemden önce bütün ölçüler aynı birime çevrilmelidir.',
      ],
      terms: [
        term('Birim dönüşümü', 'Bir ölçüyü farklı bir birimle ifade etme; hacimde her adım $1000$ kattır.', 'birim-merdiven', '$\\mathrm{dm}^3 \\leftrightarrow \\mathrm{cm}^3$ çevrimlerinde'),
        term('Desimetreküp', 'Kenarı $1$ desimetre olan küpün hacmi; $1$ litreye eşittir.', 'litre-kup', 'Kapasite–hacim ilişkisinde'),
        term('Mililitre', 'Litrenin binde biri; $1\\ \\mathrm{cm}^3$ hacme eşittir.', 'olcek-kap', 'İlaç ve içecek etiketlerinde'),
      ],
      scenes: [
        {
          type: 'birim-donusum',
          title: 'Desimetreküp, litre ve santimetreküp',
          hint: 'Ayrıtı değiştir; hacmin dm³, litre ve cm³ karşılığı birlikte görünür.',
          params: [{ name: 's', label: 'Ayrıt (dm)', min: 1, max: 6, step: 1, value: 2 }],
        },
      ],
      checks: [
        check(
          'Bir süt kutusunun üzerinde $3{,}5\\ \\mathrm{dm}^3$ yazıyor. Bu kaç $\\mathrm{cm}^3$’tür?',
          ['$350$', '$3500$', '$35\\,000$'],
          1,
          '$1$ dm $= 10$ cm olduğuna göre hacimde geçiş çarpanı kaçtır?',
          '$1$ dm³ $= 1000$ cm³; $3{,}5 \\cdot 1000 = 3500$ cm³.', 'hacim',
        ),
        check(
          'Taban alanı $40\\ \\mathrm{cm}^2$ olan bir kutunun hacmi $360\\ \\mathrm{cm}^3$’tür. Kutunun yüksekliği kaç cm’dir?',
          ['$9$', '$90$', '$6$'],
          0,
          'Hacmi taban alanına böl.',
          '$360 \\div 40 = 9$ cm; hacim $=$ taban alanı $\\times$ yükseklik bağıntısı kullanılır.', 'prizma',
        ),
      ],
    }),

    week({
      id: 12,
      date: '7–11 Ara',
      theme: 'veri',
      topic: 'Ortanca, aritmetik ortalama, açıklık ve veri türleri',
      pages: '157–175',
      summary: [
        'Bir soruya cevap vermek için toplanan her bilgi **veridir**; ancak veriler aynı türden değildir. “En sevdiğin mevsim” sorusuna verilen cevaplar **kategorik (nitel)** veridir; bu veriler sayıyla değil gruplarla ifade edilir. “Bir haftada kaç saat ders çalışıyorsun” sorusuna verilen cevaplar **nicel** veridir; sayılabilir ya da ölçülebilir. Nicel veriler ikiye ayrılır: kişi sayısı gibi sayılarak bulunanlar **kesikli**, boy uzunluğu gibi ölçümle bulunanlar **süreklidir**.',
        'Veri türünü bilmek hangi grafiğin kullanılacağını belirler. Kategorik veriler için sıklık tablosu, sütun grafiği ve daire grafiği uygundur. Nicel veriler için sütun grafiği, çizgi grafiği ya da histogram kullanılabilir. Sürekli bir veriyi (boy, ağırlık, sıcaklık) aralıklara bölmeden göstermek zordur. Kategorik veride **ortalama hesaplamak anlamsızdır**; bu ayrım veri okuma becerisinin temelidir.',
        'Veri toplama sürecinde üç soru sorulur: kime soracağım, kaç kişiye soracağım, cevapları nasıl kaydedeceğim. Yanıtların kimden geldiği önemlidir; yalnız bir sınıfa sorulan soru bütün okul hakkında genelleme yapmaya yetmez. Bu duruma **örneklemin sınırlılığı** denir. Ayrıca sorunun yönlendirici olmaması gerekir: “Sence de kitap okumak en iyi alışkanlık değil mi?” sorusu cevabı yönlendirir; “Boş zamanında en çok ne yapıyorsun?” sorusu daha tarafsızdır.',
        'Bu hafta ayrıca ikinci temanın ölçme ve değerlendirme bölümü tamamlanıyor. Geometri temasının üç büyük fikri geri geliyor: görünümler, açınım–yüzey alanı ve hacim. Bu üç fikrin ortak noktası, iki boyutlu gösterimlerden üç boyutlu bilgi çıkarmaktır. Ölçme sorularında birim tutarlılığını ve “hangi yüzeyler hesaba katılıyor?” sorusunu yeniden kontrol etmek, hataların büyük kısmını eler.',
        'Ölçme sorularında sık kullanılan iki kontrol vardır: birim kontrolü ve büyüklük kontrolü. Yüzey alanı $\\mathrm{cm}^2$, hacim $\\mathrm{cm}^3$ ile yazılır; ikisini karıştırmak en yaygın hatadır. Büyüklük kontrolünde ise $\\mathrm{cm}^3$ cinsinden bir hacmin $\\mathrm{dm}^3$ cinsinden karşılığından $1000$ kat büyük olduğu hatırlanır.',
      ],
      examples: [
        example('Veri türü', [
          'Bir sınıfta üç soru soruluyor: “Hangi mevsimi seviyorsun?”, “Kaç kardeşsin?”, “Boyun kaç cm?”',
          'Mevsim cevapları grup adıdır: kategorik veri.',
          'Kardeş sayısı sayılarak bulunur: nicel ve kesikli veri.',
          'Boy ölçümle bulunur ve ara değerler alabilir: nicel ve sürekli veri.',
        ], 'Kategorik · nicel-kesikli · nicel-sürekli'),
        example('Ortalama neden anlamsız', [
          '“En sevdiğin mevsim” cevapları: kış, yaz, yaz, ilkbahar.',
          'Bu cevaplar gruplara aittir; toplanıp bölünemez.',
          'Anlamlı özet, en çok tekrar eden gruptur.',
          'En çok tekrar eden grup yazdır (tepe değer).',
        ], 'Kategorik veride ortalama değil, sıklık ve tepe değer kullanılır.'),
      ],
      points: [
        'Veri kategorik (gruplarla) ya da nicel (sayıyla) olabilir.',
        'Nicel veri kesikli veya sürekli olabilir.',
        'Kategorik veride ortalama hesaplanmaz.',
        'Veri toplarken kim, kaç kişi ve nasıl kaydedileceği belirlenir.',
        'Yönlendirici sorular veriyi bozar; tarafsız soru kökleri kullanılır.',
      ],
      terms: [
        term('Aritmetik ortalama', 'Verilerin toplamının veri sayısına bölümü; toplamı eşit paylaştırma anlamı taşır.', 'ortalama-ok', '“Tipik değer” sorulduğunda, uç değer yoksa'),
        term('Ortanca (medyan)', 'Sıralanmış veride ortada kalan değer; çift sayıda veride ortadaki iki değerin ortalaması.', 'ortanca-ok', 'Uç değer varken tipik değeri anlatırken'),
        term('Açıklık', 'En büyük değer ile en küçük değer arasındaki fark: $x_{\\max} - x_{\\min}$.', 'aciklik-ok', 'Verinin yayılımını anlatırken'),
        term('Kategorik veri', 'Gruplara veya sınıflara ayrılarak ifade edilen, sayılmayan veri.', 'kategori', '“En sevdiğin mevsim” gibi sorularda'),
      ],
      scenes: [
        {
          type: 'sirala-ortanca',
          title: 'Beş veriyi sırala: ortanca ve açıklık',
          hint: 'Verileri değiştir; sıralama, ortadaki değer ve açıklık birlikte güncellenir.',
          params: [
            { name: 'v1', label: '1. veri', min: 0, max: 12, step: 1, value: 4 },
            { name: 'v2', label: '2. veri', min: 0, max: 12, step: 1, value: 9 },
            { name: 'v3', label: '3. veri', min: 0, max: 12, step: 1, value: 6 },
            { name: 'v4', label: '4. veri', min: 0, max: 12, step: 1, value: 2 },
            { name: 'v5', label: '5. veri', min: 0, max: 12, step: 1, value: 7 },
          ],
        },
      ],
      checks: [
        check(
          'Bir kütüphane “En çok hangi tür kitap okursun?” diye soruyor. Alınan cevaplar hangi veri türündedir?',
          ['Nicel, sürekli', 'Nicel, kesikli', 'Kategorik'],
          2,
          'Cevaplar sayı mı, grup adı mı?',
          'Cevaplar “macera, şiir, bilim” gibi gruplara ayrılır; bu kategorik veridir.', 'sutun-grafik',
        ),
        check(
          'Bir öğrenci spor alışkanlığını araştırıyor. Hangi soru yönlendirici **değildir**?',
          ['“Sence de spor yapmak en iyi alışkanlık değil mi?”', '“Boş zamanında en çok ne yapıyorsun?”', '“Sporun yararlı olduğunu kabul ediyor musun?”'],
          1,
          'Yönlendirici soru, istenen cevabı sorusunun içinde taşır.',
          '“Boş zamanında en çok ne yapıyorsun?” açık uçludur; diğer iki soru cevabı önceden ima eder.',
        ),
      ],
    }),

    week({
      id: 13,
      date: '14–18 Ara',
      theme: 'veri',
      topic: 'Veri grafikleri, ortalama mutlak sapma ve veri yorumlama',
      pages: '176–200',
      summary: [
        'İstatistiksel araştırma dört adımda yürür: **araştırma sorusunu belirleme, veri toplama, veriyi analiz edip görselleştirme, sonucu yorumlayıp karar verme**. Adımlar sıralıdır ve her biri bir öncekine dayanır. Soru net değilse toplanan veri işe yaramaz; veri uygun toplanmamışsa grafik yanıltıcı olur; grafik doğru okunmazsa karar hatalı çıkar.',
        'İyi bir araştırma sorusu **ölçülebilir, sınırları belli ve cevaplanabilir** olmalıdır. “Spor iyi midir?” sorusu ölçülemez; “7. sınıf öğrencileri haftada kaç saat spor yapıyor?” sorusu ölçülebilir. Soru belirlenirken kim, ne zaman ve hangi aralıkta sorulacağı da tanımlanır; böylece veri toplama aşamasında kararsızlık yaşanmaz.',
        'Veri toplandıktan sonra özetlenir: ortalama, ortanca, tepe değer ve açıklık. **Ortalama**, verilerin toplamının veri sayısına bölümüdür; $\\bar{x} = \\frac{x_1 + x_2 + \\ldots + x_n}{n}$. **Ortanca**, sıralanmış veride ortada kalan değerdir. **Tepe değer**, en çok tekrar eden değerdir. **Açıklık**, en büyük ile en küçük değer arasındaki farktır: $\\text{açıklık} = x_{\\max} - x_{\\min}$.',
        'Bu ölçülerin her biri farklı bir şey anlatır ve biri diğerinin yerini tutmaz. Uç değerler (çok büyük ya da çok küçük bir gözlem) ortalamayı güçlü biçimde etkiler, ortancayı ise daha az etkiler. Örneğin $5, 7, 7, 9, 22$ verisinde ortalama $10$, ortanca $7$’dir; $22$ değeri ortalamayı yukarı çekmiştir. Bu yüzden “tipik değer” anlatılırken hangi ölçünün kullanıldığı belirtilmelidir.',
        'Görselleştirmede grafiğin türü ve ölçeği sonucu değiştirebilir. Dikey eksen sıfırdan başlamıyorsa küçük farklar büyük görünür; bu, yanıltıcı grafiğin en yaygın biçimidir. Daire grafiğinde dilimler toplamı bütünü vermelidir. Yorum yaparken “veri neyi destekliyor, neyi desteklemiyor” ayrımını yapmak gerekir: yirmi kişilik bir gruptan elde edilen sonuç bütün ülke için geçerli sayılamaz. İyi bir rapor; soruyu, yöntemi, bulguları ve sınırlılığı birlikte yazar.',
      ],
      examples: [
        example('Özet ölçüler', [
          '$5, 7, 7, 9, 22$ verisinin ortalamasını, ortancasını ve açıklığını bulalım.',
          'Toplam: $5 + 7 + 7 + 9 + 22 = 50$; veri sayısı $5$; ortalama $\\frac{50}{5} = 10$.',
          'Sıralı veride ortadaki değer üçüncü terimdir: $7$.',
          'Açıklık: $22 - 5 = 17$.',
        ], 'Ortalama $10$, ortanca $7$, açıklık $17$'),
        example('Uç değerin etkisi', [
          'Aynı veriye $40$ değeri eklendiğinde ortalamayı inceleyelim.',
          'Yeni toplam: $50 + 40 = 90$; veri sayısı $6$.',
          'Yeni ortalama: $\\frac{90}{6} = 15$.',
          'Sıralı veride ortanca $\\frac{7 + 9}{2} = 8$ olur; ortanca daha az değişti.',
        ], 'Ortalama $5$ birim arttı, ortanca $1$ birim arttı.'),
      ],
      points: [
        'Dört adım: soru → veri toplama → analiz ve görselleştirme → yorum ve karar.',
        'Araştırma sorusu ölçülebilir ve sınırları belli olmalıdır.',
        'Ortalama, ortanca, tepe değer ve açıklık veriyi farklı yönlerden özetler.',
        'Uç değerler ortalamayı güçlü, ortancayı daha az etkiler.',
        'Dikey ekseni sıfırdan başlamayan grafikler yanıltıcıdır.',
      ],
      terms: [
        term('Ortalama mutlak sapma', 'Her verinin ortalamadan mutlak uzaklığının ortalaması; verinin tutarlılığını gösterir.', 'sapma', 'İki grubu karşılaştırırken'),
        term('Tepe değer', 'Veri kümesinde en çok tekrar eden değer.', 'tepe', 'Kategorik veride'),
        term('Daire grafiği', 'Bir bütünün parçalarını merkez açılarla gösteren grafik; merkez açı $360^\\circ \\times$ (parça ÷ toplam).', 'daire-dilim', 'Yüzdelerle verilen bütün–parça ilişkilerinde'),
      ],
      scenes: [
        {
          type: 'veri-grafik',
          title: 'Grafik ölçeği: eksen sıfırdan başlamazsa',
          hint: 'Eksen sürgüsünü 0 yap: aynı veri, çok daha büyük farkmış gibi görünür.',
          params: [
            { name: 'a', label: '1. grup', min: 1, max: 8, step: 1, value: 5 },
            { name: 'b', label: '2. grup', min: 1, max: 8, step: 1, value: 3 },
            { name: 'c', label: '3. grup', min: 1, max: 8, step: 1, value: 6 },
            { name: 'eksen', label: 'Eksen: 1 sıfırdan, 0 kırpılmış', min: 0, max: 1, step: 1, value: 0 },
          ],
        },
      ],
      checks: [
        check(
          'Bir öğrenci beş gün boyunca $5, 7, 7, 9, 22$ dakika kitap okudu. Ortalama ile ortanca için hangisi doğrudur?',
          ['Ortalama $7$, ortanca $10$', 'Ortalama $10$, ortanca $7$', 'İkisi de $10$'],
          1,
          'Toplamı $5$’e böl; sıralı listede tam ortadaki değere bak.',
          'Toplam $50$, ortalama $50 \\div 5 = 10$; sıralı listede ortadaki değer $7$’dir.', 'sutun-grafik',
        ),
        check(
          'Bir araştırmada yalnız bir sınıfa soru sorulup tüm okul hakkında sonuç çıkarılıyor. Temel sorun nedir?',
          ['Grafik türü yanlış', 'Açıklık çok küçük', 'Örneklem sınırlı, genelleme yapılamaz'],
          2,
          'Tek sınıf tüm okulu temsil eder mi?',
          'Örneklem yalnız bir sınıftır; tüm okul için genelleme yapılamaz.',
        ),
      ],
    }),

    week({
      id: 14,
      date: '21–25 Ara',
      theme: 'donusum',
      topic: 'Yansıma dönüşümü',
      pages: '201–210',
      summary: [
        'Bir şekli hareket ettirdiğimizde biçimi değişmiyor, yalnızca konumu ya da yönü değişiyorsa buna **dönüşüm** denir. Yansıma bunların en tanıdık olanıdır: bir şeklin bir doğruya göre aynadaki görüntüsüdür. Bu doğruya **simetri doğrusu** (ayna doğrusu) denir. Yansımada şeklin her noktası ayna doğrusuna dik olacak biçimde karşı tarafa taşınır ve ayna doğrusuna olan uzaklığı korunur.',
        'Yansımanın en önemli özelliği biçimi değiştirmemesidir: kenar uzunlukları ve açı ölçüleri aynı kalır. Değişen tek şey **yönelimdir**: sağa bakan bir okun yansıması sola bakar. Bu yüzden yansımayı kopyalamakla karıştırmamak gerekir; kopya aynı yönelimi korur, yansıma tersine çevirir.',
        'Koordinat düzleminde kurallar sadedir. $x$ eksenine göre yansımada $\\left(x, y\\right)$ noktası $\\left(x, -y\\right)$ olur; çünkü yukarı–aşağı yön değişir, sağ–sol aynı kalır. $y$ eksenine göre yansımada $\\left(x, y\\right)$ noktası $\\left(-x, y\\right)$ olur. Orijine göre yansımada iki işaret de değişir: $\\left(-x, -y\\right)$. Bu kuralları ezberlemek yerine noktanın aynaya olan uzaklığını düşünmek hatırlamayı kolaylaştırır.',
        'Çizim yaparken güvenli yol şudur: her köşeden ayna doğrusuna dik bir çizgi indir, uzunluğu ölç, aynı uzunluğu karşı tarafa taşı, köşeyi işaretle; sonra köşeleri birleştir. Bu yöntem, koordinat kuralını unuttuğunda bile doğru sonucu verir. Kontrol için iki şeklin karşılıklı kenarlarının eşit olup olmadığına bak; eşit değilse bir köşeyi yanlış taşımışsındır.',
        'Yansıma günlük yaşamda ve tasarımda sık kullanılır: aynalar, vitrin düzenlemeleri, halı ve çini desenleri, harflerin simetrisi, logolar. Bir şeklin kaç simetri doğrusu olduğunu bulmak da bir yansıma sorusudur. Karede $4$, eşkenar üçgende $3$, dikdörtgende $2$ simetri doğrusu vardır; dairede sonsuzdur. “Simetrik görünüyor” demek için şeklin ayna doğrusu boyunca katlandığında üst üste gelmesi gerekir.',
        'Yansıma sorularında işlem sırası önemlidir: doğru ayna doğrusu belirlenmeli, sonra her köşe ayrı ayrı taşınmalıdır. Bir noktayı yanlış taşımak bütün şekli bozar. Kontrol için iki şeklin alanlarının eşit olduğuna bak; alanlar farklıysa bir köşe kaymıştır. Ayrıca yansıma sonrası şeklin ayna doğrusunu kesmediğini, tamamen karşı tarafta kaldığını doğrula.',
      ],
      examples: [
        example('Nokta yansıması', [
          '$\\left(3, -2\\right)$ noktasının $y$ eksenine göre yansımasını bulalım.',
          '$y$ ekseni dikey doğrudur; yansımada sağ–sol yer değiştirir.',
          'Bu yüzden $x$ işareti değişir, $y$ aynı kalır.',
          '$\\left(3, -2\\right) \\rightarrow \\left(-3, -2\\right)$',
        ], '$\\left(-3, -2\\right)$'),
        example('Üçgenin yansıması', [
          'Köşeleri $A\\left(1,1\\right)$, $B\\left(4,1\\right)$, $C\\left(1,3\\right)$ olan üçgeni $y$ eksenine göre yansıtalım.',
          'Her köşe için $x$ işaretini değiştirelim.',
          '$A\'\\left(-1,1\\right)$, $B\'\\left(-4,1\\right)$, $C\'\\left(-1,3\\right)$.',
          'Köşeleri birleştirdiğimizde üçgenin eşi elde edilir; kenar uzunlukları aynıdır.',
        ], '$A\'\\left(-1,1\\right)$, $B\'\\left(-4,1\\right)$, $C\'\\left(-1,3\\right)$'),
      ],
      points: [
        'Yansıma, bir doğruya göre aynadaki görüntüdür; doğruya simetri doğrusu denir.',
        'Yansımada uzunluklar ve açılar korunur; yönelim tersine döner.',
        '$x$ eksenine göre: $\\left(x, y\\right) \\rightarrow \\left(x, -y\\right)$.',
        '$y$ eksenine göre: $\\left(x, y\\right) \\rightarrow \\left(-x, y\\right)$.',
        'Karede $4$, eşkenar üçgende $3$, dikdörtgende $2$ simetri doğrusu vardır.',
      ],
      terms: [
        term('Dönüşüm', 'Şeklin konumunu ya da yönünü değiştiren, biçimini koruyan işlem.', 'yansima', 'Yansıma, öteleme, döndürme'),
        term('Simetri doğrusu', 'Şeklin katlandığında kendisiyle çakışmasını sağlayan doğru; ayna doğrusu.', 'simetri-dogrusu', 'Yansıma sorularında'),
        term('Yönelim', 'Şeklin köşelerinin saat yönünde ya da tersine sıralanma özelliği.', 'yonelim', 'Yansımada tersine döner'),
      ],
      scenes: [
        {
          type: 'yansima',
          title: 'Yansıma: ayna doğrusu ve görüntü',
          hint: 'Ayna doğrusunu sürgüyle ya da sürükleyerek kaydır; uzaklıkların korunduğunu gör.',
          params: [{ name: 'k', label: 'Ayna doğrusu (x = k)', min: -1, max: 2, step: 1, value: 0 }],
        },
      ],
      checks: [
        check(
          'Bir park krokisinde ağaç $A(3, -2)$ noktasında. Yürüyüş yolu $y$ ekseni boyunca uzanıyor. Ağacın yolun diğer yanındaki görüntüsü hangi noktadadır?',
          ['$(-3, -2)$', '$(3, 2)$', '$(-3, 2)$'],
          0,
          '$y$ eksenine göre yansımada hangi koordinat işaret değiştirir?',
          '$y$ ekseni ayna olduğunda apsis işaret değiştirir, ordinat aynı kalır: $(-3, -2)$.', 'yansima',
        ),
        check(
          'Bir şekil ayna doğrusuna göre yansıtılıyor. Bu dönüşümde aşağıdakilerden hangisi değişir?',
          ['Kenar uzunlukları', 'Açı ölçüleri', 'Yönelimi'],
          2,
          'Yansımada uzunluk ve açılar korunur; şeklin sağ-sol yönü ters döner.',
          'Yansımada uzunluk ve açı değişmez, yönelim ters döner; bu yüzden cevap yönelimidir.',
        ),
      ],
    }),

    week({
      id: 15,
      date: '28–31 Ara',
      theme: 'donusum',
      topic: 'Orta dikme ve açıortay inşası, dönem tekrarı',
      pages: '211–217',
      summary: [
        'Bir doğru parçasının orta noktasından geçen ve ona dik olan doğruya **orta dikme** denir. Orta dikmenin en önemli özelliği, üzerindeki her noktanın parçanın iki ucuna **eşit uzaklıkta** olmasıdır. Bu özellik sayesinde orta dikme, “iki noktaya eşit uzaklıkta olan noktaların yeri” olarak da tanımlanır. İki şehre eşit uzaklıkta bir tesis kurmak istendiğinde tam olarak bu doğru kullanılır.',
        'Orta dikme pergel ve cetvel ile inşa edilir. Pergelin iğnesi $A$ noktasına konur, yarıçapı $AB$’nin yarısından **büyük** seçilir ve iki yay çizilir. Aynı işlem $B$ noktasından tekrarlanır. Yayların kesiştiği iki noktayı birleştiren doğru, $AB$’nin orta dikmesidir. Bu inşada cetvel yalnızca doğru çizmek için kullanılır; uzunluk ölçülmez, yani sonuç ölçmeye değil geometrik bir ilişkiye dayanır.',
        '**Açıortay**, bir açıyı iki eş açıya bölen ışındır. Açıortay üzerindeki her nokta, açının kollarına eşit uzaklıktadır. Açıortay da pergel-cetvel ile çizilebilir: açının köşesine pergelin iğnesi konur, kolları kesen bir yay çizilir; bu iki kesişim noktasından eşit yarıçaplarla yeni yaylar çizilip kesişim köşeye birleştirilir.',
        'Dönemin son haftasında dört temayı birbirine bağlayan bir bakış yapmak yararlıdır: sayılar teması işlem güvenliğini, geometri teması iki boyuttan üç boyuta geçişi, veri teması bilgiyi yorumlamayı, dönüşüm teması ise şekillerin korunan özelliklerini kurdu. Bu beceriler bağımsız değildir: bir hacim probleminde birim dönüşümü, yüzey hesabı, tablo okuma ve desen (yansıma) aynı soruda bir arada bulunabilir.',
        'İnşa çalışmalarında sonucu ölçerek değil, özellikle doğrula: orta dikme için iki uca uzaklığı, açıortay için iki açının eşitliğini kontrol et. Bu doğrulama, çizimin rastlantıyla değil kuralla oluştuğunu gösterir.',
        'İnşa sorularında cetvelle ölçerek çizmek pratik görünür ama geometrik olarak zayıftır; çünkü ölçüm hatası sonucu bozar ve kuralın neden doğru olduğunu göstermez. Pergel-cetvel inşası ise yalnız tanımlara dayanır. İnşadan sonra özellik kontrolü yapmak, yani iki uca uzaklığın eşitliğini ya da iki açının eşitliğini doğrulamak, çizimin gerçekten kurala uyduğunu kanıtlar.',
      ],
      examples: [
        example('Orta dikmenin özelliği', [
          '$A$ ve $B$ noktalarına eşit uzaklıkta bir $P$ noktası arıyoruz.',
          'Eşit uzaklıktaki bütün noktalar $AB$’nin orta dikmesi üzerindedir.',
          'Orta noktayı bulup $AB$’ye dik doğruyu çizersek aradığımız nokta bu doğru üzerinde olur.',
          'Doğru üzerinde seçilen her nokta için $|PA| = |PB|$ sağlanır.',
        ], 'Nokta, $AB$’nin orta dikmesi üzerindedir.'),
        example('Açıortayın özelliği', [
          'Bir açının kollarına eşit uzaklıkta bir nokta veriliyor.',
          'Bu nokta açının içinde ve kollara eşit uzaklıkta ise açıortay üzerindedir.',
          'Açıortay açıyı iki eş açıya böldüğü için kollarına uzaklıklar da eşit olur.',
          'Bu özellik üçgende iç merkezin bulunmasında kullanılır.',
        ], 'Nokta, açının açıortayı üzerindedir.'),
      ],
      points: [
        'Orta dikme, doğru parçasını iki eş parçaya böler ve parçaya diktir.',
        'Orta dikme üzerindeki her nokta, uçlara eşit uzaklıktadır.',
        'Orta dikme ve açıortay pergel-cetvel ile ölçü yapılmadan inşa edilir.',
        'Açıortay, açıyı iki eş açıya böler; kollara eşit uzaklıktadır.',
        'Dört tema birbirini besler; sorular genellikle birden fazla beceri ister.',
      ],
      terms: [
        term('Orta dikme', 'Bir doğru parçasının orta noktasından geçen ve parçaya dik olan doğru.', 'ortadikme', 'İki noktaya eşit uzaklıkta yer ararken'),
        term('Açıortay', 'Bir açıyı iki eş açıya bölen ışın; üzerindeki noktalar kollara eşit uzaklıktadır.', 'aciortay', 'Üçgende iç merkezi bulurken'),
        term('İnşa', 'Yalnız pergel ve cetvel kullanılarak yapılan geometrik çizim.', 'insa', 'Ölçmeden çizim yaparken'),
      ],
      scenes: [
        {
          type: 'ortadikme',
          title: 'Orta dikme: eşit uzaklıktaki noktalar',
          hint: 'A ve B’yi değiştir; orta dikme ve $|PA| = |PB|$ eşitliği birlikte güncellenir.',
          params: [
            { name: 'ax', label: 'A noktası (x)', min: 0, max: 4, step: 1, value: 1 },
            { name: 'by', label: 'B noktası (y)', min: 1, max: 5, step: 1, value: 3 },
          ],
        },
        {
          type: 'aciortay',
          title: 'Açıortay: iki eş açı',
          hint: 'Açı ölçüsünü değiştir; açıortayın açıyı iki eş parçaya böldüğünü gör.',
          params: [{ name: 'aci', label: 'Açı ölçüsü (°)', min: 30, max: 150, step: 10, value: 80 }],
        },
      ],
      checks: [
        check(
          'İki köy $A$ ve $B$ noktalarında. İki köye de eşit uzaklıkta bir su kuyusu kazılacak. Kuyunun yeri nerede olmalıdır?',
          ['$AB$’nin orta dikmesi üzerinde', 'Yalnız $AB$’nin tam orta noktasında', '$AB$’ye paralel bir doğru üzerinde'],
          0,
          'İki noktaya eşit uzaklıktaki noktaların geometrik yerini düşün.',
          'Orta dikme üzerindeki her nokta $A$ ve $B$’ye eşit uzaklıktadır; bu noktalar bir doğru oluşturur.', 'ortadikme',
        ),
        check(
          'Bir bahçenin köşesinde iki çit birleşiyor. Fıskiye iki çite eşit uzaklıkta olacak. Fıskiye hangi doğru üzerinde olmalıdır?',
          ['Çitlerden birine paralel bir doğru üzerinde', 'Köşeden çıkan ve bir çite dik olan doğru üzerinde', 'Köşeden çıkan açıortay üzerinde'],
          2,
          'İki kola eşit uzaklıktaki noktalar hangi doğruyu oluşturur?',
          'Açıortay üzerindeki noktalar iki kola eşit uzaklıktadır; açıyı da iki eş açıya böler.', 'aciortay',
        ),
      ],
    }),

  ];

  window.MATEMATIK_CONTENT = Object.freeze({ themes: THEMES, weeks: WEEKS });
})();
