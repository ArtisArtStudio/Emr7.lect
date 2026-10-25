/* Original lesson summaries, short self-checks and transfer tasks based on the 2026 MEB Social Studies 7 book. */
(() => {
  'use strict';

  const check = (prompt, options, correct, explanation, hint) => ({ prompt, options, correct, explanation, hint });
  const lesson = (summary, points, terms, transfer, extras = {}) => ({ summary, points, terms, transfer, ...extras });
  const textField = (id, label, placeholder, minChars = 12, kind = 'textarea') => ({ id, label, placeholder, minChars, kind });
  const wordField = (id, label, placeholder) => ({ id, label, placeholder, kind: 'words' });
  const checklistField = (id, label, options) => ({ id, label, kind: 'checklist', options });
  const question = (id, prompt, fields) => ({ id, prompt, fields });
  const communicationChoice = (id, answer, explanation, hint) => ({
    id,
    label: 'İletişim türünü seç.',
    kind: 'choice',
    options: [
      { id: 'spoken', label: 'Sözlü iletişim' },
      { id: 'written', label: 'Yazılı iletişim' },
      { id: 'nonverbal', label: 'Sözsüz iletişim' },
    ],
    answer,
    explanation,
    hint,
  });
  const choiceField = (id, label, options, answer, explanation, hint) => ({
    id, label, kind: 'choice', options, answer, explanation, hint,
  });
  const multiChoiceField = (id, label, options, answer, explanation, hint) => ({
    id, label, kind: 'multi', options, answer, explanation, hint,
  });
  const sortField = (id, label, categories, items, expectedAssignments, extras = {}) => ({
    id,
    label,
    kind: 'sort',
    categories,
    items,
    expectedAssignments,
    instructions: 'Kartı sürükleyip uygun alana bırak. Sürükleyemiyorsan karta dokunup hedef gruba tıkla; klavyede Enter/Boşluk ile kartı seç, hedef alanda Enter/Boşluk ile yerleştir. Yerleştirmeyi kontrol edip gerekirse kartı yeniden taşı.',
    guide: ['Karttaki davranışı oku', 'Ölçütleri karşılaştır', 'Uygun gruba yerleştir'],
    ...extras,
  });

  const lessons = {
    1: lesson(
      'İnsanlar ailede, sınıfta, takımda ve başka gruplarda ortak işler yaparken birbirleriyle iletişim kurar. İletişim, yalnızca konuşanın söz söylemesi değildir: iletinin anlaşılması, dinleyenin ne anladığını göstermesi ve gerekirse açıklama yapılması da sürecin parçasıdır. Bu nedenle dikkatle dinlemek, uygun sorular sormak ve düşünceyi açık, saygılı biçimde ifade etmek önem taşır.\n\nEtkili iletişim grup üyelerinin görevleri paylaşmasına, ortak karar vermesine ve sorunları büyümeden ele almasına yardım eder. Herkesin aynı düşünmesi gerekmez; farklı görüşlerin güvenle dile getirilebilmesi gruba yeni fikirler kazandırır. İletinin açıklığı, sözcük ve ses tonu, yüz ifadesi ve beden duruşu, dinleyenin dikkati, ortamın koşulları, seçilen iletişim aracı ve geri bildirim iletişimi etkileyebilir. Bu unsurları fark etmek yanlış anlamayı azaltır ve birlikte yaşamayı güçlendirir.',
      ['İletişim, iletinin karşılıklı anlaşılmasını ve gerektiğinde açıklığa kavuşturulmasını da kapsar.', 'Açık anlatım, dikkatli dinleme, saygı ve geri bildirim ortak çalışmayı destekler.', 'Söz, beden dili, ortam ve kullanılan araç iletinin nasıl anlaşılacağını etkileyebilir.'],
      ['grup', 'iletişim', 'etkili iletişim', 'geri bildirim'],
      { title: 'Birlikte yaşamadan bir örnek', format: 'Örnek olay · davranış ve gerekçe', prompt: 'Aile, sınıf veya takım yaşamından kısa bir durum seç. Bir davranışın gruba nasıl katkı sağladığını açıkla.', fields: [['Durum / örneğim', 'Kimler vardı, ne oldu?'], ['Katkı ve gerekçem', 'Hangi davranış birlikte yaşamayı kolaylaştırdı?']], hint: 'Davranışı ve sonucunu birbirine bağla.' },
      { summaryTitle: 'Konu anlatımı · iletişim neden önemlidir?', flowDescription: 'Özgün okuma → sohbet ve trafik dilini inceleme → örnek olaylardan soru üretme → kaynak araştırması.' }
    ),
    2: lesson(
      'İletişim, insanların duygu, düşünce, bilgi ve ihtiyaçlarını birbirlerine aktarıp anlam kurdukları bir süreçtir. Bir mesajın anlaşılmasında mesajı gönderen, mesajı alan, kullanılan kanal ve koşulların yanı sıra karşı tarafın verdiği geri bildirim de rol oynar. Aynı cümle, ses tonu veya ortam değiştiğinde farklı yorumlanabilir; yazılı mesajlarda ise yüz ifadesi ve ses tonu görünmediği için açıklık özellikle önemlidir.\n\nİletişim farklı yollarla gerçekleşebilir. Sözlü iletişimde kişiler yüz yüze, telefonla ya da sesli bir duyuru aracılığıyla konuşur. Yazılı iletişim; not, mektup, duyuru veya dijital mesaj gibi yazıyla kurulur. Sözsüz iletişimde yüz ifadesi, jest, duruş ve uygun bağlamda kullanılan işaretler anlam taşır. Günlük bir konuşmada bu yollar çoğu zaman birlikte kullanılır: kişi konuşurken ses tonundan ve beden dilinden de ipucu verir.\n\nHer yolun güçlü ve sınırlı yanları vardır. Konuşma hızlı soru sormayı sağlar ancak gürültülü ortamda duyulmayabilir; yazı bilgiyi tekrar okumaya imkân verir ama kısa bir mesajın tonu belirsiz kalabilir. Sözsüz işaretler konuşmayı destekler, fakat tek başına ayrıntılı bilgi vermeyebilir ve farklı yorumlanabilir. Bu yüzden iletişim biçimini amaca, kişilere, ortama ve erişilebilirliğe göre seçmek; ardından mesajın doğru anlaşılıp anlaşılmadığını kontrol etmek gerekir.',
      ['Sözlü, yazılı ve sözsüz iletişim farklı aktarım yollarıdır; günlük yaşamda birlikte kullanılabilir.', 'İletişim biçimini amaca, kişilere, ortama ve erişilebilirliğe göre seç.', 'Geri bildirim, iletinin doğru anlaşılıp anlaşılmadığını görmeye yardım eder.'],
      ['iletişim', 'sözlü iletişim', 'yazılı iletişim', 'sözsüz iletişim', 'kanal', 'geri bildirim'],
      { title: 'Bir iletişim yolunu seç ve gerekçelendir', format: 'Durum çözümleme · tür seçimi · gerekçe', prompt: 'Bir grup çalışmasında saat değişikliğini herkese duyurman gerekiyor. Hangi iletişim yollarını birlikte kullanacağını ve anlaşıldığını nasıl kontrol edeceğini açıkla.', fields: [['Seçtiğim yollar ve mesajım', 'Sözlü, yazılı veya sözsüz yollardan hangileri?'], ['Geri bildirim ve gerekçem', 'Herkesin anladığını nasıl anlarsın?']], hint: 'Amacı, alıcıları ve yanlış anlaşılma riskini birlikte düşün.' },
      { summaryTitle: 'Konu anlatımı · iletişim süreci ve türleri', flowDescription: 'Açıklayıcı okuma → iletişim türlerini sınıflandırma → aynı iletiyi farklı yollarla kurma → uygun kanalı gerekçelendirme.' }
    ),
    3: lesson(
      'Empati, başka bir kişinin duygu ve bakış açısını anlamaya çalışmaktır; onunla aynı fikirde olmayı gerektirmez. Bir olayda ne gördüğümüz ile karşı tarafın ne hissettiğini düşündüğümüzü ayırmak önemlidir: duyguya ilişkin yorumumuzu kesin gerçek gibi değil, soru sorarak doğrulanabilecek bir tahmin olarak ifade ederiz.\n\nBen dili, yaşanan durumu ve kendi duygu ya da ihtiyacımızı kişiyi suçlamadan anlatmaya yardım eder. Örneğin “Sözüm kesilince düşüncemi tamamlayamadığımı hissediyorum; bitirmeme izin verir misin?” cümlesi davranışı, duyguyu ve isteği birlikte belirtir. “Sen hep…” diye başlayan etiketleyici sözler ise karşı tarafın savunmaya geçmesine yol açabilir.\n\nFarklı düşünce ve özelliklere saygı göstermek; dikkatle dinlemek, açık soru sormak ve herkesin katılmasına alan açmakla görünür olur. Saygı, her öneriyi kabul etmek değildir. Görüş ayrılığı olduğunda da kişiyi küçümsemeden gerekçe sunabilir, ortak bir çözüm arayabiliriz.',
      ['Duyguyu fark etmek için durumdaki ipuçlarına bak.', 'Ben dili: durum + duygu + ihtiyaç/istek.', 'Kişiyi etiketlemek yerine davranışı tarif et.'],
      ['empati', 'ben dili', 'saygı'],
      { title: 'Bir durumu empatiyle yeniden kur', format: 'Senaryo · duygu çıkarımı · cümle dönüştürme', scenario: 'Bir arkadaşın grup konuşmasında fikrini paylaşamıyor; diğerleri onun yerine karar veriyor.', prompt: 'Arkadaşının ne hissedebileceğini düşün. Duyguyu varsayım olarak ifade et ve katılımını destekleyecek ben diliyle bir cümle yaz.', fields: [['Duygu tahminim ve ipucu', '“... hissediyor olabilir; çünkü ...”'], ['Ben diliyle destek cümlem', 'Duygu, durum ve ihtiyacı yargılamadan anlat.']], hint: 'Duygu tahminini kesin bilgi gibi sunma; cümlende suçlama kullanma.' }
    ),
    4: lesson(
      'Anlaşmazlıklar çoğu zaman kişilerin amacı, ihtiyacı ya da önerisi farklı olduğunda ortaya çıkar. Sorunu kişilikle özdeşleştirmeden adlandırmak (“Görevlerin kimde olduğu net değil”) konuşmayı “Sen sorun çıkarıyorsun” gibi suçlayıcı bir yola sürüklememeye yardım eder. Her kişinin neye ihtiyaç duyduğunu dikkatle dinlemek, çözümün başlangıcıdır.\n\nYapıcı çözüm sürecinde taraflar kendi görüşünü açıklar, anlamadıkları noktaları sorar ve birkaç seçenek üretir. Seçenekleri adalet, güvenlik, uygulanabilirlik ve herkesin katılma olanağı bakımından karşılaştırırlar. Bir çözüm, tarafların her isteğini bütünüyle karşılamayabilir; yine de gerekçesi açıklanmış, üzerinde uzlaşılmış ve gerektiğinde yeniden gözden geçirilebilir olmalıdır.\n\nSöz kesmek, alay etmek veya kararı tek başına vermek anlaşmazlığı büyütebilir. Sıra ile konuşmak, duyulanı özetlemek ve ortak bir ölçüt belirlemek ise görüş ayrılığını birlikte düşünme fırsatına dönüştürebilir.',
      ['Sorunu kişiden ayır; neyin anlaşmazlık olduğunu adlandır.', 'Her tarafın görüşünü dinle ve açıklayıcı soru sor.', 'Çözüm seçeneklerini adalet ve uygulanabilirlik açısından değerlendir.'],
      ['anlaşmazlık', 'uzlaşma', 'adil çözüm'],
      { title: 'Tahminden uzlaşmaya', format: 'Durum çözümleme · olumlu/olumsuz davranış · uzlaşma', scenario: 'Bir çalışma grubunda iki kişi görev paylaşımı konusunda anlaşamıyor; diğer üyeler de henüz görüş bildirmedi.', prompt: 'Olası iki devam yolu düşün: biri çatışmayı artırabilir, diğeri çözüm sağlayabilir. Yapıcı seçeneği geliştiren ortak bir adım öner.', fields: [['İki olası davranış ve sonucu', 'Bir engelleyici davranışı ve bir yapıcı davranışı yaz.'], ['Uzlaşma adımımız', 'Herkesin görüşünü içeren uygulanabilir bir çözüm öner.']], hint: 'Her iki tarafın ihtiyacını da çözümünde gözet.' }
    ),
    5: lesson(
      'Fırsat eşitliği, herkesin öğrenme, kendini geliştirme ve toplumsal yaşama katılma olanağına sahip olmasını hedefler. Herkese aynı şeyi vermek her durumda eşit katılım sağlamayabilir; kimi zaman bilgiye, mekâna ya da etkinliğe erişmek için farklı düzenleme ve destek gerekir. Bu nedenle önce neyin katılımı zorlaştırdığını, sonra hangi değişikliğin işe yarayacağını belirlemek gerekir.\n\nGüçlük, kişinin bir özelliğinden çok merdiven, anlaşılmayan duyuru, tek seçenekli etkinlik planı veya destek alınamayan bir süreçten kaynaklanabilir. Engeli tarif ederken kişiyi sorun gibi göstermemek; ortamı ve uygulamayı incelemek önemlidir. Öneriler, ilgili bireylerin görüşü alınarak ve güvenlik ile bağımsız katılım gözetilerek geliştirilmelidir.\n\nBeyin yazımı ve beyin fırtınası, farklı fikirleri önce yargılamadan biriktirmeye; sonra uygulanabilirlik ve beklenen yarar bakımından karşılaştırmaya yardım eder. Küçük bir erişim düzenlemesi bile daha fazla kişinin ortak etkinliğe katılmasını sağlayabilir.',
      ['Eşit katılım için engeli fark et ve adını koy.', 'Öneriyi kişinin değil, ortamın/düzenlemenin değişmesine yönelt.', 'Farklı fikirleri biriktirip geliştirmek yeni çözümler doğurabilir.'],
      ['fırsat eşitliği', 'erişim', 'katılım'],
      { title: 'Fikir üret, sonra seç', format: 'Beyin yazımı · fikir geliştirme · seçim', prompt: 'Okulda veya mahallede katılımı zorlaştıran bir durumu seç. Birbirinden farklı çözümler düşün ve en uygulanabilir ilk adımı belirle.', fields: [['Sorun ve üç fikir', 'Fiziksel çevre, bilgiye erişim veya etkinlik düzeni üzerine düşün.'], ['Seçtiğim ilk adım', 'Kimlerin görüşü alınmalı, kim ne yapabilir?']], hint: 'Çözümün ilgili kişilerin bağımsız ve güvenli katılımını nasıl desteklediğini açıkla.' }
    ),
    6: lesson(
      'Erişilebilirlik, farklı kişilerin bir mekâna ulaşabilmesi kadar bilgiyi anlayabilmesi, etkinliğe katılabilmesi ve gerektiğinde destek isteyebilmesiyle de ilgilidir. Fiziksel erişimde basamaksız giriş ve uygun geçiş alanı; bilgiye erişimde okunabilir, anlaşılır duyuru; iletişimde birden fazla anlatım yolu yardımcı olabilir. Hangi düzenlemenin gerektiği, karşılaşılan engele ve kişilerin kendi görüşlerine bağlıdır.\n\nBir düzenleme önerirken “Herkes için neyi değiştirebiliriz?” diye sormak, sorumluluğu kişiye yüklemekten kaçınmayı sağlar. Örneğin okul gezisi planında ulaşım, giriş yolu, dinlenme alanı, bilginin önceden paylaşılması ve etkinlik sırasında yardım alınabilecek kişi birlikte düşünülmelidir. Tek bir çözüm her duruma yetmeyebilir.\n\nErişilebilirliği değerlendirmek için düzenlemenin kimlerin katılımını kolaylaştırdığını, hangi adımın hâlâ güç olduğunu ve kullanıcıların ne önerdiğini gözlemek gerekir. Geri bildirimle düzenlemeyi değiştirmek, eşit katılımın sürekliliğini destekler.',
      ['Engeli ortamda veya süreçte ara.', 'Düzenlemeyi belirli bir ihtiyaca bağla.', 'Sonucu, kimin daha rahat katılabildiğine bakarak değerlendir.'],
      ['erişilebilirlik', 'engel', 'düzenleme'],
      { title: 'Engeli ve düzenlemeyi eşleştir', format: 'Sorun–çözüm · etki değerlendirmesi', prompt: 'Bir okul etkinliğini herkes için daha erişilebilir kılacak bir düzenleme tasarla. Sorun ile çözüm arasında açık bağ kur.', fields: [['Engel ve etkilenen katılım', 'Mekân, iletişim veya etkinlikteki bir engeli tarif et.'], ['Düzenleme ve beklenen etki', 'Kim neyi değiştirebilir; kimler nasıl yararlanır?']], hint: 'Önerini varsayıma değil, gözlenebilir bir ihtiyaca dayandır.' }
    ),
    7: lesson(
      'Eşit katılımı destekleyen küçük bir proje, gözlenen bir ihtiyaç ve ilgili kişilerin görüşleriyle başlar. “Herkes katılsın” gibi geniş bir dilek yerine, hangi engelin azaltılacağını ve değişikliğin kimlere nasıl yarar sağlayacağını açık bir hedefle belirtmek gerekir. Proje taslağı, hedefi küçük ve yapılabilir adımlara böler.\n\nİyi bir planda sorumlular, gerekli malzemeler veya izinler, zamanlama ve ilk uygulanabilir adım yer alır. Projeyi tek kişinin deneyimine göre tasarlamak yerine yararlanacak kişilerle konuşmak, farklı gereksinimleri ve olası riskleri fark etmeye yardım eder. Bir deneme uygulaması, büyük bir değişikliğe geçmeden önce öneriyi sınamayı sağlar.\n\nKontrol listesi; önerinin kapsayıcı, güvenli, uygulanabilir ve gözden geçirilebilir olup olmadığını kontrol eder. Başarıyı da yalnızca tamamlanan işle saymak yerine katılımın kolaylaşıp kolaylaşmadığına ve alınan geri bildirime bakarak değerlendirmek gerekir.',
      ['Hedefi açık ve yapılabilir biçimde yaz.', 'Sorumluları, ilk adımı ve gerekli kaynakları belirle.', 'Uygulama sonrasında katkıyı nasıl değerlendireceğini düşün.'],
      ['proje hedefi', 'görev paylaşımı', 'kontrol listesi'],
      { title: 'Proje taslağını gözden geçir', format: 'Proje planı · görev · değerlendirme', prompt: 'Fırsat eşitliğini destekleyecek küçük bir proje fikri seç ve başlamadan önce uygulanabilirliğini sınayacak bir ölçüt belirle.', fields: [['Projemin hedefi ve ilk adımı', 'Hangi ihtiyaca cevap veriyor; ilk olarak ne yapılacak?'], ['Görev ve başarı ölçütü', 'Kim katkı sunacak; olumlu değişimi nasıl fark edeceğiz?']], hint: 'Ölçütü gözlenebilir bir değişime bağla.' }
    ),
    8: lesson(
      'Millî mesele, toplumun ortak yaşamını, bağımsızlığını, güvenliğini, ortak değerlerini veya geleceğini ilgilendiren geniş kapsamlı bir konudur. Böyle konular yalnızca devlet kurumlarının değil, farklı toplulukların ve bireylerin de sorumluluklarını gündeme getirebilir. Herkesin aynı görüşte olması beklenmez; farklı düşüncelerin saygıyla tartışılması ve ortak yararı gözeten kararların açıklanması önemlidir.\n\nDayanışma, kişilerin, kurumların ve toplulukların imkânlarını ortak bir ihtiyaç için birleştirmesidir. Bu katkı bilgi paylaşmak, görev üstlenmek, destek sağlamak veya çözüm önerisi geliştirmek biçiminde olabilir. Bir katkıyı değerlendirirken kimin ne yaptığını, ihtiyacın ne olduğunu ve sonucun kimlere yarar sağladığını ayırt etmek gerekir.\n\nKelime bulutu, konuya ilişkin kavramları görünür kılar; ancak sözcükleri yalnızca sıralamak yerine her birini bir davranış veya örnekle açıklamak anlamı derinleştirir. Bilgi paylaşırken de güvenilir kaynak ve sorumlu dil kullanmak gerekir.',
      ['Ortak meseleleri yalnızca tek kişinin bakış açısından değerlendirme.', 'Dayanışma, insanların ve kurumların katkılarını birleştirebilir.', 'Kavramları örnekle ilişkilendir.'],
      ['millî mesele', 'ortak değer', 'dayanışma'],
      { title: 'Ortak değerler için kelime bulutu', format: 'Kelime bulutu · kavram açıklama', prompt: 'Toplumu ortak bir amaç etrafında buluşturan kavramları seç. Her sözcüğün hangi davranış veya sorumluluğa karşılık geldiğini açıkla.', fields: [['Kelime bulutum', 'En az üç farklı kavramı virgülle ayır.'], ['Bir kavram ve örneği', 'Bu değer günlük yaşamda hangi davranışla görünür?']], hint: 'Sözcükleri tekrarlamak yerine her birinin anlamını düşün.' }
    ),
    9: lesson(
      'Ulusal bayramlar ve anma günleri, tarihimizdeki önemli olay ve değerleri topluca hatırlamak için fırsat oluşturur. Bayramlarda kutlama ve geleceğe dönük ortak sevinç öne çıkabilir; anma günlerinde geçmişte yaşanan olayları hatırlama ve anlamını düşünme ağırlık kazanır. Bir günün tarihini, adını ve anlamını güvenilir ders kaynağından doğrulamak bu ayrımı daha iyi kurmaya yardım eder.\n\nBayrak, ortak bir sembol olarak kamusal alanlarda ve törenlerde yer alır. İnsanların bu sembolle kurduğu kişisel bağlar farklı olabilir; bu nedenle sembollerin tarihî ve toplumsal anlamını saygılı bir dille ele almak gerekir. Törenlere katılma biçimleri de kişilerin koşullarına göre değişebilir.\n\nOrtak hafıza, yalnızca aynı törene katılmaktan ibaret değildir. Olayı hangi kaynakların anlattığını incelemek, farklı kuşakların deneyimlerini dinlemek ve günün hatırlattığı değerleri bugünkü sorumluluklarla ilişkilendirmek de ortak hatırlama sürecinin parçasıdır.',
      ['Bir bayramın kutlama, bir anma gününün hatırlama yönünü ayırt et.', 'Ortak sembollerin anlamını tarihî bağlamıyla düşün.', 'Farklı kişilerin bu günlere yüklediği anlamı dinle.'],
      ['ulusal bayram', 'anma günü', 'ortak hafıza'],
      { title: 'Bir günü anlatan slogan ve gerekçe', format: 'Beyin fırtınası · slogan · kısa açıklama', prompt: 'Bir ulusal günün veya anma gününün ortak hafızadaki yerini anlatan özgün bir slogan tasarla; sloganın neyi hatırlattığını açıkla.', fields: [['Sloganım', 'Kısa, saygılı ve anlaşılır olsun.'], ['Sloganın anlamı', 'Hatırlattığı olay/değer ve toplumsal katkısı…']], hint: 'Sloganın hangi ortak değeri yansıttığını belirt.' }
    ),
    10: lesson(
      'Millî Mücadele, bağımsızlık hedefi çevresinde Anadolu’nun farklı yerlerindeki insanların ve kurumların çeşitli katkılar sunduğu tarihî bir dönemdir. Katkılar yalnızca cephede verilen mücadeleden ibaret değildir; haberleşme, ihtiyaçları karşılama, ulaşım, yerel örgütlenme ve kaynak paylaşımı da ortak çabanın parçalarıdır. 1921’de yayımlanan Tekâlif-i Milliye emirleri, ordunun ihtiyaçlarının karşılanması için halktan belirli kaynak ve malzemelerin sağlanmasını istemiştir. Bu tür bir bilgiyi tarihî bağlamıyla incelemek önemlidir.\n\nDers kitabındaki yazılı kaynak, görsel, harita veya tablo farklı türde kanıtlar sunabilir. Kaynağın doğrudan gösterdiği bilgi ile bizim o bilgiden çıkardığımız sonucu ayrı yazmak, yorumun ölçülü kalmasına yardım eder. Bir belgeyi incelerken kim tarafından, ne zaman ve hangi amaçla üretildiğini de sorgulayabiliriz.\n\nDayanışma örneğini açıklarken “hangi ortak ihtiyaç vardı, kimler nasıl katkı sundu ve bu katkı neyi kolaylaştırdı?” sorularını kullan. Böylece tarihî kanıt ile ortak amaç arasındaki bağı daha açık kurarsın.',
      ['Ortak amaç ve dayanışma örneklerini kaynakta ara.', 'Bir olayı gösteren kanıtı kaynağın türüyle birlikte not et.', 'Çıkarımının hangi kanıta dayandığını açıkla.'],
      ['Millî Mücadele', 'bağımsızlık', 'kanıt'],
      { title: 'Kaynak notu: kanıttan çıkarıma', format: 'Tarihî kaynak inceleme · kanıt–yorum tablosu', prompt: 'Kitaptan veya öğretmenin verdiği kaynaktan bir örnek seç. Kaynağın gösterdiği bilgiyi ve bundan çıkardığın sonucu ayrı yaz.', fields: [['Kaynak ve doğrudan kanıt', 'Metin, görsel veya haritada neyi gözlemledin?'], ['Çıkarımım ve dayanağı', 'Bu gözlem ortak amaç/dayanışma hakkında ne düşündürüyor?']], hint: 'Kanıtı kaynağın içinde gördüğün bilgiyle sınırla.' }
    ),
    11: lesson(
      'Toplumsal dayanışma; afetlere hazırlık ve yardım, bilimsel çalışmalar, kültür-sanat üretimi veya spor etkinlikleri gibi farklı alanlarda görülebilir. Bu alanların ihtiyaçları birbirinden farklı olsa da birçok çalışma ortak emek, güvenilir bilgi ve görev paylaşımı gerektirir. Bireylerin katkısı kadar okul, yerel kurum, sivil toplum veya uzman ekiplerin rolü de incelenebilir.\n\nİki örneği karşılaştırırken aynı ölçütleri kullan: hangi ihtiyaç ele alınıyor, kimler görev üstleniyor, hangi kaynak veya bilgi kullanılıyor ve toplum için beklenen yarar nedir? Bir örneğin görünür olması, katkının yalnızca tek bir kişiye ait olduğu anlamına gelmez. İş birliğinin arka planını araştırmak daha dengeli bir değerlendirme sunar.\n\nGüncel bir örneği raporlarken tarih ve kaynağı kaydet, doğrulanmış bilgi ile kendi yorumunu ayır ve kişilerin katkısını abartmadan anlat. Böylece dayanışmanın farklı biçimlerini kanıta dayalı olarak karşılaştırabilirsin.',
      ['Farklı alanlardaki örneklerin ortak yönünü ara.', 'Katkının kimlerden geldiğini belirt.', 'Sonuçları kanıt veya güvenilir bilgiyle ilişkilendir.'],
      ['toplumsal katkı', 'ortak çaba', 'güvenilir kaynak'],
      { title: 'İki dayanışma örneğini karşılaştır', format: 'Karşılaştırma tablosu · ortak katkı', prompt: 'Kitapta ele alınan alanlardan veya güvenilir bir sınıf kaynağından iki örnek seç. Katkı biçimlerini ve toplumsal yararı aynı ölçütle karşılaştır.', fields: [['İki örnek ve katkı sunanlar', 'Örneklerin kaynağını da not et.'], ['Ortak yön / farklılık', 'Hangi katkı toplum için neyi değiştirdi?']], hint: 'İki örneğe de aynı karşılaştırma ölçütünü uygula.' }
    ),
    12: lesson(
      'Birlikte Yaşamak öğrenme alanında iletişim, farklılıklar, fırsat eşitliği, erişilebilirlik ve millî meselelerde dayanışma gibi başlıklar ele alınır. Bu konuların her biri farklı bilgi ve beceriler gerektirir; hepsini tek kavramda eritmek yerine benzerliklerini ve ayrımlarını göstermek gerekir. İletişim, görüşleri duyurup ortak karar almayı kolaylaştırabilir; erişilebilir düzenlemeler daha fazla kişinin katılımını destekleyebilir; dayanışma ise ortak ihtiyaçlara yönelik görev paylaşımını görünür kılabilir.\n\nÖğrenme alanını tekrar ederken bir kavramı tanımla, onu örnekle açıkla ve kullandığın bilginin kaynağını belirt. Kavram haritasındaki oklar yalnızca sözcükleri bağlamasın; “nasıl etkiler?” veya “hangi durumda?” gibi kısa açıklamalar da içersin.\n\nÖz değerlendirme, doğru-yanlış sayısından ibaret değildir. Hangi başlıkta kanıt kullanabildiğini, nerede daha fazla örneğe ihtiyaç duyduğunu ve günlük yaşamda hangi davranışı uygulamak istediğini belirlemek sonraki öğrenme adımını planlamaya yardım eder.',
      ['İletişim, katılım ve dayanışmayı ayrı kavramlar olarak tanı.', 'Her kavram için kısa bir yaşam örneği bul.', 'Kavramlar arasındaki bağı oklarla ve açıklamalarla göster.'],
      ['iletişim', 'fırsat eşitliği', 'dayanışma'],
      { title: 'Kavram haritamı tamamla', format: 'Kavram haritası · öz değerlendirme', prompt: 'Üç konu başlığını günlük yaşamdan örneklerle birbirine bağla. Haritandaki bir bağlantıyı iki cümleyle açıkla.', fields: [['Üç kavram ve örnekleri', 'Her öğrenme alanından en az bir kavram seç.'], ['Bağlantı ve öz değerlendirme', 'Ortak değer nedir; tekrar etmek istediğin konu hangisi?']], hint: 'Bir kavramı diğerine bağlayan davranışı veya değeri yaz.' }
    ),
    13: lesson(
      'Küreselleşme, dünyanın ekonomik, kültürel ve siyasi olarak birbirine daha bağlı hâle gelmesidir. Bu bağlılık tek bir olayla değil, uzun bir süreçte oluşur: ulaşım araçlarının hızlanması, iletişim teknolojilerinin yaygınlaşması ve ülkeler arası ticaretin artması bu süreci hızlandırdı. Günlük hayatta kullandığın bir telefonun tasarımı bir ülkede, parçaları başka ülkelerde, montajı yine başka bir ülkede yapılabilir. Ürünün etiketinde tek bir ülke adı görsen de arkasında çok sayıda ülkenin emeği ve birbirine bağlı bir üretim zinciri vardır.\n\nKüreselleşmenin en görünür olduğu alanlardan biri ulaşımdır. Geçmişte aylar süren yolculuklar bugün saatler içinde tamamlanabiliyor; yük taşıma kapasitesi arttı, uçak ve hızlı tren hatları yaygınlaştı. Türkiye’nin üzerinde bulunduğu Orta Koridor, Asya ile Avrupa arasında demir yolu ve kara yolu bağlantısı kuran bir güzergâhtır. Bu koridor, ülkeler arasında ticaretin yanı sıra turizm ve kültürel ilişkileri de canlandırır; bir ülkenin coğrafi konumu, küresel bağlantılardaki yerini doğrudan etkiler.\n\nİletişim alanında yaşanan değişim de benzer bir etki yaptı. Genel ağ ve mobil cihazlar sayesinde bilgiye ulaşmak kolaylaştı, görüntülü görüşmeler uzaktaki insanlarla yüz yüze görüşmeye yakın bir iletişim sağladı. Elektronik ticaret, evden çıkmadan alışveriş yapmayı ve dünyanın başka yerlerindeki ürünlere ulaşmayı mümkün kıldı. Aynı hız, yanlış bilginin de kısa sürede yayılmasına yol açabilir; bu nedenle bilgiyi paylaşmadan önce kaynağını kontrol etmek gerekir.\n\nKültür alanında küreselleşme, ürünlerin ve alışkanlıkların ülkeler arasında dolaşması demektir. Yurt dışından ithal edilen kahve çekirdekleri Türkiye’de kavrulup işlenerek kendine özgü bir içme kültürüne dönüşmüş, bu kültür zamanla dünya pazarlarında da tanınmıştır. Benzer biçimde yemekler, müzikler, diziler ve spor karşılaşmaları sınırları aşar. Bu dolaşım yeni tatlar ve bakış açıları kazandırırken yerel kültürlerin zayıflaması riskini de gündeme getirir.\n\nSağlık ve çevre, küresel bağlantının en çok hissedildiği iki alandır. 2020 yılında Çin’de ortaya çıkan COVID-19 salgını kısa sürede bütün dünyaya yayıldı; ülkeler okulları kapattı, uzaktan eğitime geçti, sokağa çıkma kısıtlamaları uyguladı. Aynı dönemde aşı ve tıbbi cihaz geliştirme çalışmaları da ülkeler arasında ortak yürütüldü. Türkiye’nin iş birliği kurumlarından TİKA, Senegal’in Touba kentinde bir halk sağlığı merkezinin acil servisini tıbbi ekipmanla donatarak yılda binlerce kişiye hizmet verilmesine katkı sağladı. Çevre sorunları da benzer: bir ülkedeki ormansızlaşma veya sanayi atığı, atmosfer ve su döngüsü yoluyla başka ülkeleri etkiler.\n\nBu nedenle küreselleşmeyi tek yönlü bir iyileşme ya da tek yönlü bir kayıp olarak görmek yanıltıcıdır. Aynı bağlantı bir kişi için ucuz ürün ve hızlı bilgi, bir başkası için işini kaybetme veya kültürel baskı anlamına gelebilir. Değerlendirme yaparken hangi alandan, hangi gruplardan ve hangi kanıttan söz ettiğini belirtmek gerekir.',
      ['Küreselleşme; ulaşım, iletişim, ticaret ve kültür bağlarıyla toplumları birbirine yaklaştıran bir süreçtir.', 'Bu sürecin etkisi ulaşım, iletişim, kültür, sağlık, ekonomi ve çevre gibi alanlarda ayrı ayrı görülür.', 'Orta Koridor gibi güzergâhlar, bir ülkenin coğrafi konumunun küresel bağlantılardaki yerini gösterir.', 'TİKA ve benzeri kurumların yurt dışındaki sağlık ve eğitim projeleri küresel iş birliğine örnektir.'],
      ['küreselleşme', 'Orta Koridor', 'iletişim', 'küresel iş birliği'],
      { summaryTitle: 'Küreselleşme nedir, hangi alanlarda görülür?', title: 'Kendi tanımımı sözlükle karşılaştırıyorum', format: 'Görsel inceleme · tanım · karşılaştırma', prompt: 'Ulaşım, iletişim veya kültürden bir görsel/örnek seç. Küreselleşmeyi kendi sözlerinle tanımla ve tanımını sözlükteki açıklamayla karşılaştır.', fields: [['Kendi tanımım ve örneğim', 'Örnekte hangi uzak bağlantı kuruluyor?'], ['Benzerlik ve fark', 'Sözlük tanımıyla ortak ve farklı yön…']], hint: 'Tanımı yalnızca bir teknolojiye indirgeme; ülkeler/toplumlar arasındaki etkileşimi düşün.' }
    ),
    14: lesson(
      'Küresel bağlantıların etkisi herkes için aynı değildir. Elektronik ticaret bir tüketici için daha çok çeşit ve daha uygun fiyat demekken, aynı mahalledeki küçük bir esnaf için müşteri kaybı anlamına gelebilir. Bu nedenle “küreselleşme iyi mi kötü mü?” sorusu yerine “kim için, hangi alanda, hangi kanıtla?” sorusu daha verimli bir başlangıçtır. Bir bağlantının olumlu ve zorlayıcı yönlerini aynı tabloda göstermek, tek yönlü yorumdan korur.\n\nFırsatlar tarafında bilgiye erişim öne çıkar. Uzaktan eğitim, çevrim içi kütüphaneler ve açık ders kaynakları, bulunduğu yerde okul ya da öğretmen bulamayan öğrencilere ulaşabilir. Salgın döneminde derslerin kesintisiz sürmesini sağlayan da bu altyapıydı. Ticaret ve turizm gelirleri yeni iş alanları doğurur; tıbbi bilgi ve ilaç üretimi ülkeler arasında paylaşıldığında salgınlarla mücadele hızlanır. Kültürel içerik dolaşımı ise farklı yaşam biçimlerini tanımayı, yeni bir dil öğrenmeyi ve sanatsal üretimi kolaylaştırır.\n\nZorlayıcı yönler de aynı bağlantılardan doğar. Hızlı bilgi akışı yanlış bilgiyi de hızlandırır; doğrulanmamış bir iddia saatler içinde binlerce kişiye ulaşabilir. Küresel rekabet, yerel üreticinin ve küçük işletmenin ürününü pazarda tutmasını zorlaştırabilir. Tek tip tüketim alışkanlıkları yerel dilin, el sanatlarının ve mutfağın geri plana itilmesine yol açabilir. Uzun mesafeli taşımacılık ve hızlı tüketim çevre üzerindeki baskıyı artırır; atık ve karbon salımı sınır tanımaz. Dijital becerisi veya internet erişimi olmayan kişiler ise bu olanakların dışında kalabilir.\n\nEtkilenen grupları ayırmak, değerlendirmeyi somutlaştırır. Bir ürünün yolculuğunu izlerken üretici, taşıyıcı, satıcı, tüketici ve atık toplayıcı gibi farklı tarafların ne kazandığını, ne kaybettiğini ayrı ayrı yazmak gerekir. Öğrenci, çalışan, yaşlı, engelli ya da küçük esnaf aynı değişimden farklı biçimde etkilenebilir. Bu ayrım yapılmadan kurulan bir cümle, kanıtı olmayan bir genelleme olarak kalır.\n\nOlumsuz etkileri azaltmak için bireysel ve ortak adımlar birlikte düşünülebilir. Birey, paylaşmadan önce kaynağı kontrol ederek, yerel üreticiyi destekleyerek ve gereksiz tüketimden kaçınarak katkı sunabilir. Okul, yerel yönetim ve sivil toplum kuruluşları ise bilgilendirme, dijital beceri eğitimi ve erişilebilirlik düzenlemeleriyle bu çabayı güçlendirebilir. Etkinin yönünü tartışırken önce örneği, sonra etkilenen grubu, en sonunda kendi yorumunu yazmak dengeli bir açıklama sağlar.',
      ['Aynı küresel bağlantı farklı gruplar için farklı sonuçlar doğurabilir; değerlendirmede etkilenen grup belirtilir.', 'Bilgiye erişim, uzaktan eğitim ve tıbbi bilgi paylaşımı küreselleşmenin fırsat yönünü gösterir.', 'Yanlış bilginin hızla yayılması, yerel üreticinin zorlanması ve çevre baskısı zorlayıcı yönlerdir.', 'Bir etkinin yönünü yazarken örnek, etkilenen grup ve kanıt birlikte verilir.'],
      ['fırsat', 'risk', 'dijital bölünme', 'yerel üretici'],
      { summaryTitle: 'Küresel bağlantılar: kim için fırsat, kim için risk?', title: 'Etki terazisi: kim kazanır, kim etkilenir?', format: 'Beyin fırtınası · çok yönlü etki analizi', prompt: 'Bir küresel bağlantı örneği seç ve farklı kişiler üzerindeki olumlu/olumsuz etkilerini aynı tabloda değerlendir.', fields: [['Örnek ve iki farklı etki', 'Kim için kolaylık, kim için güçlük olabilir?'], ['Daha bilinçli davranış', 'Olumsuz etkiyi azaltacak uygulanabilir bir adım…']], hint: 'Tek bir olayın herkes için aynı sonucu doğurmayabileceğini düşün.' }
    ),
    15: lesson(
      'Bir ürünün yolculuğu, tasarım aşamasında başlar. Hammadde bir ülkede çıkarılır, parçalar başka ülkelerde üretilir, montaj farklı bir yerde yapılır, ürün gemilerle ve kamyonlarla taşınır, mağazada ya da çevrim içi satışta tüketiciye ulaşır; kullanım sonrasında ise atık olarak yeniden bir yerlere gider. Bu zincirin her halkasında farklı ülkelerden insanlar, kurumlar ve kurallar vardır. Ürünün etiketindeki “menşe” bilgisi yalnızca bir ülke adı verir; zincirin tamamını göstermez.\n\nBilgi de benzer bir yoldan geçer ama çok daha hızlıdır. Bir haber, bir fotoğraf ya da bir video saatler içinde dünyanın öbür ucuna ulaşabilir. Bu hız, bilgiye erişimi kolaylaştırırken doğrulama sorumluluğunu da artırır. Bir iddiayı değerlendirirken kaynağın kim olduğuna, bilginin ne zaman üretildiğine, başka güvenilir kaynaklarda karşılığı olup olmadığına ve fotoğrafın gerçekten o olayı gösterip göstermediğine bakılır. Bağlamından koparılmış bir görüntü, doğru olsa bile yanlış bir sonuca götürebilir.\n\nKültürel içerikler de ülkeler arasında dolaşır: filmler, diziler, müzikler, yemek tarifleri ve spor karşılaşmaları. Bu dolaşım, farklı kültürleri tanımayı ve yeni biçimlerin doğmasını sağlar; ancak yalnızca güçlü ülkelerin içerikleri yaygınlaşırsa tek yönlü bir akış ortaya çıkar. Yerel kültürü korumak, kapıları kapatmak değildir; kendi dilini, sanatını ve mutfağını üretmeye devam ederek bu akışa katılmaktır.\n\nSorumluluk zincirin her halkasında bulunur. Tüketici, satın aldığı ürünün nerede ve hangi koşullarda üretildiğine, dayanıklılığına ve gerçekten gereksinim olup olmadığına bakabilir. Üretici, sürecin şeffaf olmasını sağlayabilir. Devletler, çalışma koşulları ve çevre koruması için kurallar koyar; uluslararası kuruluşlar bu kuralların uygulanmasını izler. Dijital ortamda ise sorumluluk, paylaşılan içeriğin etkisini öngörmeyi de kapsar.\n\nBir tercihin sonuçlarını değerlendirmek için zinciri somut bir örnek üzerinde izlemek gerekir. Mevsimi dışında satılan bir meyve, uzun bir taşıma yolculuğundan geçmiş olabilir; hızlı tüketilen bir giysi ise kısa sürede atığa dönüşür. Bu tür bir inceleme, “bilinçli tüketici” olmanın yalnızca fiyat karşılaştırmak olmadığını, üretim ve atık aşamalarını da görmeyi gerektirdiğini gösterir.',
      ['Bir ürünün yolculuğu tasarım, hammadde, üretim, taşıma, satış ve atık aşamalarından oluşan bir zincirdir.', 'Bilginin hızlı dolaşımı, kaynak ve bağlam kontrolünü zorunlu kılar.', 'Kültürel akışı dengelemek, kapıları kapatmak değil kendi üretimini sürdürmektir.', 'Tüketici, üretici, devlet ve uluslararası kuruluşların sorumlulukları birbirinden farklıdır.'],
      ['üretim zinciri', 'dezenformasyon', 'kültürel etkileşim', 'sorumlu tercih'],
      { summaryTitle: 'Ürünün ve bilginin yolculuğu: sorumluluk kimde?', title: 'Bir ürünün yolunu ve etkisini izle', format: 'Etki tablosu · tüketici sorumluluğu', prompt: 'Günlük kullandığın bir ürün veya dijital içeriğin başka yerlerle bağlantısını araştır. Bu bağlantının yararını ve dikkat edilmesi gereken yönünü yaz.', fields: [['Ürün/içerik ve bağlantısı', 'Nerede üretilmiş, paylaşılmış veya kimlerce kullanılmış?'], ['Katkı ve sorumluluk', 'Tercih ederken hangi bilgiye bakmalıyız?']], hint: 'Kaynağı doğrulanmış bilgiyle, tahmini bilgiyi birbirinden ayır.' }
    ),
    16: lesson(
      'Bir sorunun bölgesel mi küresel mi olduğunu anlamak için yalnızca nerede başladığına değil, kimleri ve hangi alanları etkilediğine bakmak gerekir. Bölgesel sorunlar çoğunlukla belirli bir çevreyi veya komşu ülkeleri etkiler. Ortak bir nehirdeki kirlilik, Akdeniz çevresinde yaşanan orman yangınları, komşu ülkeler arasındaki bir anlaşmazlık ve bu nedenle yerinden edilen insanların komşu ülkelere geçmesi bölgesel ölçekte ele alınır.\n\nKüresel sorunlar ise çok sayıda ülkeyi ve topluluğu aynı anda etkiler; tek bir ülkenin kendi sınırları içinde çözmesi mümkün değildir. İklim krizi, salgın hastalıklar, gıda güvenliği, okyanuslardaki plastik kirliliği, terör ve siber güvenlik bu ölçekte değerlendirilir. Bu sorunların ortak özelliği, nedenlerinin ve sonuçlarının sınır tanımaması, çözümünün de çok sayıda ülkenin ortak çalışmasını gerektirmesidir.\n\nİki ölçek arasındaki sınır her zaman keskin değildir; bölgesel bir sorun hızla küresel hâle gelebilir. Karadeniz’e kıyısı olan iki ülke arasındaki savaş, tahıl sevkiyatını durdurduğunda yalnızca bölgeyi değil, buğday ithal eden Afrika ve Asya ülkelerini de etkiledi; gıda fiyatları dünya genelinde yükseldi. Benzer biçimde bir ülkede ortaya çıkan salgın, ulaşım ağları sayesinde haftalar içinde bütün kıtalara yayıldı. Bu örnekler, ölçeği belirlerken etkilenenlerin sayısına ve sorunun sınır aşıp aşmadığına bakmayı gerektirir.\n\nÖlçeği belirlemek için birkaç ölçüt birlikte kullanılabilir: sorun kaç ülkeyi ve kaç kişiyi etkiliyor, ne kadar sürüyor, etkisi sınırların ötesine geçiyor mu, çözüm için kaç paydaşın bir araya gelmesi gerekiyor? Bu ölçütlerden yalnızca birine bakmak yanıltıcı olabilir. Yerel görünen bir sorun, kısa sürede büyüyerek çok sayıda ülkeyi etkileyebilir; tersine, çok ülkede görülen bir sorunun kaynağı tek bir bölgede olabilir.\n\nÖlçek, çözüm için gereken iş birliğinin düzeyini de belirler. Bölgesel bir sorunda komşu ülkelerin ortak komisyonları, yerel yönetimler ve sivil toplum kuruluşları yeterli olabilir. Küresel bir sorunda ise uluslararası anlaşmalar, ortak fonlar ve uluslararası kuruluşların izleme mekanizmaları gerekir. Öğrenci olarak bir sorunu sınıflandırırken etkilenen alanı, etkilenen toplulukları ve çözüm ortaklarını aynı tabloda göstermek, konuyu tek bir cümleye sıkıştırmaktan daha açıklayıcıdır.',
      ['Ölçeği belirlerken sorunun kaç ülkeyi ve kişiyi etkilediğine, süresine ve sınır aşıp aşmadığına bakılır.', 'Bölgesel sorunlar komşu ülkeleri, küresel sorunlar çok sayıda ülkeyi birlikte etkiler.', 'Bölgesel bir sorun hızla küreselleşebilir; tahıl krizi bunun örneğidir.', 'Sorunun ölçeği, çözüm için gereken iş birliğinin düzeyini belirler.'],
      ['bölgesel sorun', 'küresel sorun', 'etki alanı', 'gıda güvenliği'],
      { summaryTitle: 'Bölgesel ve küresel sorunları ölçekle ayırt etme', title: 'Sorunları etki alanına göre sınıflandır', format: 'Sınıflandırma tablosu · etki ölçeği', prompt: 'İki sorunu etki alanı, etkilenen topluluklar ve çözüm için gereken ortaklar bakımından karşılaştır.', fields: [['Sorunlar ve etki alanları', 'Bir örnek bölgesel, biri küresel olsun.'], ['İş birliği neden gerekir?', 'Sorun hangi sınırları veya grupları aşıyor?']], hint: 'Yerel bir olayın da daha geniş bir etkisi olup olmadığını sorgula.' }
    ),
    17: lesson(
      'Bölgesel ve küresel sorunlar, tek bir kişinin ya da tek bir kurumun çabasıyla çözülemez; farklı ölçeklerde katkı gerekir. Birey, günlük seçimleriyle (atığı azaltmak, suyu tasarruflu kullanmak, doğrulanmamış bilgiyi paylaşmamak) katkı sunar. Okul ve yerel yönetim, hizmet ve düzenlemeleriyle bu çabayı görünür kılar. Sivil toplum kuruluşları, kamuoyu oluşturur ve sahada çalışır. Devletler diplomasi, yardım ve mevzuatla; uluslararası kuruluşlar ise ortak standartlar ve izleme mekanizmalarıyla süreci yürütür.\n\nAnlamlı bir çözüm planı belirli bir sırayı izler: sorunun tanımı, sorunu gösteren kanıt, etkilenenler, görev alabilecek paydaşlar, yapılacak eylem, beklenen sonuç ve sonucu ölçecek gösterge. Bu sıra atlandığında öneriler genel dilekler olarak kalır. “Çevreyi korumalıyız” bir dilektir; “okulda kâğıt kullanımını ayda yüzde on azaltmak için sınıflara ölçüm kutusu koymak ve her ay sonucu panoya yazmak” ise ölçülebilir bir eylemdir.\n\nPaydaşları ayırmak, sorumluluğun kimde olduğunu görmeyi sağlar. Bir sorunun nedeni sanayiyse, çözümün bir kısmı işletmelerin ve denetleyici kurumların sorumluluğundadır; nedeni tüketim alışkanlığıysa bireylerin tercihleri belirleyici olur. Tek bir tarafa bütün yükü yüklemek gerçekçi değildir. Aynı sorunun farklı ülkelerde farklı paydaşlarla çözülmesi de mümkündür; bu nedenle plan yerel koşullara göre uyarlanır.\n\nİş birliği kendiliğinden oluşmaz; ortak bir sorun tanımı, güven, kaynak ve izleme gerektirir. Ülkelerin çıkarları farklı olduğunda anlaşma uzun görüşmeler sonucunda doğar. 2022 yılında Karadeniz’deki tahıl sevkiyatının yeniden başlaması için Türkiye’nin arabuluculuğunda varılan anlaşma, taraflar arasında güven oluşturmanın ve sevkiyatı denetleyecek ortak bir mekanizma kurmanın somut bir örneğidir. Anlaşmanın uygulanması, gemilerin denetimi ve sevkiyatın sürekliliği ayrı ayrı izlenmiştir.\n\nÖğrenci olarak bir soruna çözüm önerirken hem karamsarlığa hem de aşırı iyimserliğe düşmemek gerekir. Tek bir ağaç dikmenin iklim krizini çözmeyeceği doğrudur; ancak “benim yapacağım bir şey yok” demek de sorumluluğu görmezden gelmektir. Gerçekçi yaklaşım, kendi ölçeğinde yapabileceğini yapmak, daha büyük ölçekte kimlerin sorumlu olduğunu bilmek ve çözümün hangi göstergelerle izleneceğini sormaktır.',
      ['Çözüm planı sorun, kanıt, etkilenenler, paydaşlar, eylem, beklenen sonuç ve gösterge sırasını izler.', 'Birey, kurum, devlet ve uluslararası kuruluşlar farklı ölçeklerde katkı sunar.', 'İş birliği ortak sorun tanımı, güven ve izleme mekanizması gerektirir.', 'Öneriyi ölçülebilir bir eyleme ve göstergeye bağlamak dilek cümlesinden ayırır.'],
      ['paydaş', 'iş birliği', 'çözüm planı', 'gösterge'],
      { summaryTitle: 'Sorundan ortak eyleme: paydaşlar ve çözüm planı', title: 'Sorundan ortak eyleme kavram haritası', format: 'Kavram haritası · çözüm planı', prompt: 'Seçtiğin bir bölgesel veya küresel sorun için etkilenenleri, iş birliği yapacak tarafları ve beklenen sonucu gösteren bir harita kur.', fields: [['Sorun, etkilenenler ve paydaşlar', 'Birey/kurum/ülke örneklerini ayır.'], ['Ortak eylem ve sonuç', 'Başarıyı gösteren bir işaret belirle.']], hint: 'Çözüm önerisinin hangi paydaşın sorumluluğunda olduğunu yaz.' }
    ),
    18: lesson(
      'Türkiye, coğrafi konumu nedeniyle Asya, Avrupa ve Afrika arasında bir köprü oluşturur; bu konum ülkeye ticaret, ulaşım ve diplomasi açısından önemli olanaklar sağlar. Aynı konum, çevresindeki savaş, göç ve afetlerin etkilerini doğrudan hissetmesi anlamına da gelir. Türkiye’nin bölgesel ve küresel sorunlardaki rolü bu nedenle hem katkı sunma hem de etkilenme boyutuyla birlikte değerlendirilmelidir.\n\nİnsani yardım, Türkiye’nin en görünür katkı alanlarından biridir. Ülke, dünyada en çok mülteciye ev sahipliği yapan ülkeler arasında yer alır; savaş ve afet nedeniyle ülkesinden ayrılan milyonlarca kişiye barınma, eğitim ve sağlık hizmeti sunulmuştur. Yurt dışında ise Türk İşbirliği ve Koordinasyon Ajansı (TİKA) aracılığıyla okul, hastane, su kuyusu ve mesleki eğitim merkezi gibi projeler yürütülür. Senegal’deki bir halk sağlığı merkezinin donatılması bu tür projelere örnektir. Afet durumlarında arama kurtarma ekipleri ve yardım malzemeleri de hızla bölgeye gönderilir.\n\nArabuluculuk ve diplomasi, sorunların çözümünde farklı bir katkı yoludur. Türkiye, komşu ülkeler arasındaki anlaşmazlıklarda görüşme zemini hazırlamış, 2022’de Karadeniz’deki tahıl sevkiyatı için tarafların bir araya gelmesine aracılık etmiştir. Bu tür katkılar askerî ya da mali yardımdan farklıdır: amaç, tarafları konuşmaya ve ortak bir mekanizma kurmaya yöneltmektir. Diplomatik başarının ölçütü, imzalanan anlaşmanın uygulanıp uygulanmadığı ve sahada neyi değiştirdiğidir.\n\nKültürel ve eğitim alanındaki iş birlikleri de bu rolün parçasıdır. Yurt dışında açılan okullar, kültür merkezleri ve değişim programları, ortak tarihî mirasa sahip topluluklarla bağları güçlendirir; öğrenci ve öğretmen değişimi karşılıklı anlayışı artırır. Çevre alanında ise Türkiye’nin uluslararası iklim anlaşmalarına taraf olması ve yenilenebilir enerji yatırımları, küresel sorunlara ortak çözüm arayışına katılım olarak okunabilir.\n\nBir katkıyı değerlendirirken dört soru sorulabilir: hangi ihtiyaca yanıt verildi, hangi eylemle yanıt verildi, kimlerle birlikte yürütüldü ve ortaya hangi sonuç çıktı? Bu sorular kanıt ister; bu nedenle örnek, güvenilir kaynaktan seçilmelidir. Abartılı ya da kaynaksız ifadeler konuyu güçlendirmez, tersine güvenilirliğini azaltır. Öğrenci olarak senin katkın ise önce bilgiyi doğru öğrenmek, sonra bulunduğun yerde düzenlenen yardım ve dayanışma çalışmalarına katılmaktır.',
      ['Türkiye’nin rolü insani yardım, diplomasi, arabuluculuk, kültürel iş birliği ve çevre alanlarında görülür.', 'Bir katkıyı değerlendirmek için ihtiyaç, eylem, paydaşlar ve sonuç birlikte incelenir.', 'TİKA, Kızılay, AFAD gibi kurumlar yurt içinde ve yurt dışında farklı görevler yürütür.', 'Değerlendirme güvenilir kaynağa dayanmalı; abartılı ve kaynaksız ifadeden kaçınılmalıdır.'],
      ['insani yardım', 'diplomasi', 'arabuluculuk', 'uluslararası iş birliği'],
      { summaryTitle: 'Bölgesel ve küresel sorunlarda Türkiye’nin rolü', title: 'Katkıdan beklenen sonuca', format: 'Çözüm planı · öz değerlendirme', prompt: 'Kitapta veya öğretmenin verdiği güvenilir kaynakta bulunan bir Türkiye katkısı örneğini amaç, eylem ve sonuç bakımından özetle.', fields: [['Kaynak ve ele alınan ihtiyaç', 'Örneğin hangi soruna cevap verdiğini yaz.'], ['Katkı ve beklenen sonuç', 'İş birliğinin neden önemli olduğunu açıkla.']], hint: 'Kaynakta yer almayan ülke/kurum ayrıntılarını ekleme.' }
    ),
    19: lesson(
      'Malazgirt Savaşı sonrasında Anadolu’daki siyasi yapı değişti ve farklı bölgelerde Türk beylikleri kuruldu. Haritalar, bu değişimin nerede gerçekleştiğini görmeye yardımcı olur; metinler ise beyliklerin yerleşme ve kültürel yaşamdaki katkılarını açıklar. Harita bilgisiyle çıkarımı birbirinden ayır.',
      ['Önceki ve sonraki haritadaki değişen alanları gözle.', 'Lejant ve harita başlığını kullan.', 'Beyliklerin katkısını coğrafi kanıtla ilişkilendir.'],
      ['Malazgirt', 'Türk beylikleri', 'harita kanıtı'],
      { title: 'Haritayı oku, çıkarımını kanıtla', format: 'İki haritayı karşılaştırma · kanıt notu', prompt: 'Malazgirt öncesi ve sonrası haritaları karşılaştır. İki gözlem seç ve bunlardan birini beyliklerin katkısıyla ilişkilendir.', fields: [['İki harita gözlemim', 'Sınır, yerleşim veya bölge değişikliği…'], ['Çıkarım ve dayanağı', 'Harita/metin hangi sonucu destekliyor?']], hint: 'Haritanın gösterdiğiyle kendi yorumunu ayrı cümlelerde yaz.' }
    ),
    20: lesson(
      'Osmanlı Beyliği’nin kurulduğu bölgenin coğrafi konumu gelişme olanaklarını ve karşılaşabileceği güçlükleri etkiledi. GZFT; güçlü ve zayıf yönleri, fırsatları ve tehditleri farklı başlıklarda düşünmeye yarar. Haritadan görülebilen bilgiyi, tarihî çıkarımdan ayrı tut.',
      ['Güçlü/zayıf yönler beylikle ilgili iç koşulları anlatır.', 'Fırsat/tehditler çevredeki koşullarla ilgilidir.', 'Her maddeyi harita veya metinden bir gerekçeyle destekle.'],
      ['GZFT', 'coğrafi konum', 'fırsat ve tehdit'],
      { title: 'GZFT’yi gerekçeyle doldur', format: 'Harita temelli GZFT · kısa sav', prompt: 'Osmanlı Beyliği’nin kuruluş yerini haritada incele. Dört GZFT başlığına birer olası madde ekle ve en önemli gördüğünü gerekçelendir.', fields: [['Dört başlığa notlar', 'Her başlık için kısa, farklı bir ifade yaz.'], ['En belirleyici madde ve kanıt', 'Konum/harita özelliği seç ve nedenini açıkla.']], hint: 'Bir maddenin hangi başlığa ait olduğunu iç/dış koşul ayrımıyla kontrol et.' }
    ),
    21: lesson(
      'Osmanlı Devleti’nin büyümesi yalnızca savaşlarla açıklanamaz. Gaza/fetih, iskân, istimalet, coğrafi konum ve dönemlere göre izlenen farklı politikalar birlikte incelenmelidir. Bir kavramı tarihî örneği ve olası etkisiyle eşleştirmek daha dengeli bir açıklama sağlar.',
      ['Anahtar kavramların anlamını güvenilir kaynakta kontrol et.', 'Politika ile tarihî örnek arasında ilişki kur.', 'Birden fazla etkenin birlikte rol oynayabileceğini unutma.'],
      ['fetih', 'iskân', 'istimalet'],
      { title: 'Politika–örnek–etki kartları', format: 'Kavram eşleştirme · ilişki tablosu', prompt: 'Kitapta geçen iki büyüme politikasını seç. Her biri için bir örnek ve devletin gelişimine olası katkı yaz.', fields: [['İki kavram ve örnekleri', 'Kaynakta gördüğün ifadeyi kendi cümlenle aktar.'], ['Olası etkiler ve karşılaştırma', 'Hangi açıklama tek bir nedene indirgemiyor?']], hint: 'Terimleri birbirine karıştırmadan sözlük/kaynak anlamıyla karşılaştır.' }
    ),
    22: lesson(
      'Osman Bey döneminde beylik Söğüt ve çevresinde kuruldu; Orhan Bey döneminde Bursa’nın alınması ve başka yerleşimlerin katılmasıyla büyüme sürdü. İdari ve askerî teşkilatlanma da gelişimin parçasıydı. Zaman çizelgesi olayların sırasını ve birbirine etkisini görmeyi sağlar.',
      ['Olayları kronolojik sıraya koy.', 'Yer ve gelişme arasındaki bağlantıyı belirt.', 'Bir dönüm noktasını seçip nedenini açıkla.'],
      ['Osman Bey', 'Orhan Bey', 'kronoloji'],
      { title: 'İlk genişlemenin zaman çizelgesi', format: 'Zaman çizelgesi · dönüm noktası', prompt: 'Osman ve Orhan Bey dönemlerinden üç gelişmeyi sırala. Bir gelişmenin sonraki adıma nasıl zemin hazırladığını açıkla.', fields: [['Üç gelişme ve sıraları', 'Tarih veya dönem bilgisi ekle.'], ['Dönüm noktası ve bağlantı', 'Seçimini coğrafya/teşkilatlanma bilgisiyle gerekçelendir.']], hint: 'Önce sıralamayı, sonra neden-sonuç bağını kontrol et.' }
    ),
    23: lesson(
      'Orhan Bey döneminde Marmara çevresinde büyüme ve Rumeli’ye geçiş başladı; I. Murad döneminde Balkanlardaki ilerleme sürdü. Edirne’nin başkent olması ve idari gelişmeler devletin Rumeli’deki varlığını güçlendirdi. Haritaları dönem bilgisiyle birlikte okumak gerekir.',
      ['Orhan Bey ve I. Murad dönemlerini ayır.', 'Bursa, Edirne, Marmara ve Balkanlar arasındaki konumu incele.', 'Fetihlerle birlikte teşkilatlanma ve siyasi gelişmeleri de değerlendir.'],
      ['Rumeli', 'Edirne', 'teşkilatlanma'],
      { title: 'Dönem ve kanıt tablosu', format: 'Harita/metin kaynağı · karşılaştırma tablosu', prompt: 'İki dönemden birer gelişme seç. Kaynakta ne gördüğünü, hangi döneme ait olduğunu ve büyümeye katkısını not et.', fields: [['Dönem, gelişme ve kaynak', 'Harita işareti veya metin bilgisi…'], ['Katkı ve karşılaştırma', 'İdari/siyasi/coğrafi sonuçlardan birini açıkla.']], hint: 'Dönemleri karıştırmamak için her notun yanına kişi/dönem adını yaz.' }
    ),
    24: lesson(
      'İstanbul’un fethi, şehrin konumu ve Osmanlı’nın siyasi hedefleriyle bağlantılıydı. Kuşatma öncesi hazırlıklar ve farklı askerî yöntemler sonuca katkı sağladı. Fethin sonuçlarını Türk tarihi ve dünya tarihi bakımından ayrı başlıklarda incelemek neden-sonuç ilişkisini görünür kılar.',
      ['Neden, hazırlık ve sonuçları birbirinden ayır.', 'Her hazırlığın hangi ihtiyaca cevap verdiğini düşün.', 'Sonuçları farklı bakış açılarıyla sınıflandır.'],
      ['kuşatma', 'hazırlık', 'sonuç'],
      { title: 'Manşet ve neden–sonuç', format: 'Sonuçları sınıflandırma · gazete manşeti', prompt: 'Fethin bir sonucunu seç. Bu sonucu hangi nedenle önemli bulduğunu açıkla ve tarihî gelişmeyi anlatan özgün bir manşet oluştur.', fields: [['Sonuç ve tarihî dayanak', 'Türk tarihi veya dünya tarihi açısından…'], ['Manşet ve gerekçesi', 'Kısa, doğru ve kaynakla uyumlu olsun.']], hint: 'Bir sonucu başka sonuçla karıştırmadığını kontrol et; başlıkta kaynağın söylemediği ayrıntıyı ekleme.' }
    ),
    25: lesson(
      'Yavuz Sultan Selim döneminde Osmanlı’nın doğu ve güney yönündeki etkisi arttı; Kanuni Sultan Süleyman döneminde Avrupa, Asya ve Afrika’daki geniş coğrafya ve deniz yolları önem kazandı. Haritalar yönleri ve bölgeleri görmeye yardım eder. Siyasi ve ekonomik etkiler ayrı ayrı düşünülebilir.',
      ['Dönemleri ve genişleme yönlerini karşılaştır.', 'Ticaret yollarının konumunu haritada izle.', 'Coğrafi genişlemenin tek bir sonucu olmadığını düşün.'],
      ['Yavuz Sultan Selim', 'Kanuni Sultan Süleyman', 'ticaret yolları'],
      { title: 'Dönemleri harita ve ölçütle karşılaştır', format: 'Harita · dönem karşılaştırması', prompt: 'İki hükümdar döneminden birer gelişme seç. Yön, ticaret veya siyasi etki ölçütlerinden biriyle karşılaştır.', fields: [['Yavuz döneminden kanıt', 'Bölge/yön ve metin veya harita notu…'], ['Kanuni dönemi ve ortak yön/fark', 'Aynı ölçüte göre kısa karşılaştırma…']], hint: 'Karşılaştırmada aynı ölçütü iki dönem için de kullan.' }
    ),
    26: lesson(
      'Büyük deniz seyahatleri dünya ticaret yollarının değişmesine yol açtı. Bu değişimin Osmanlı ekonomisine etkisini değerlendirirken harita, ticaret güzergâhları ve metindeki açıklamalar birlikte ele alınmalıdır. Çıkarımını bir kaynak ipucuyla destekle.',
      ['Deniz ve kara güzergâhlarını haritada izle.', 'Ticaret bağlantısının kimleri etkilediğini belirle.', 'Ekonomik etki hakkındaki yorumunu kanıtla gerekçelendir.'],
      ['deniz seyahatleri', 'ticaret yolu', 'ekonomik etki'],
      { title: 'Güzergâh değişimini kanıtla yorumla', format: 'Harita inceleme · neden-sonuç', prompt: 'Kaynakta gösterilen güzergâh değişimini ticaretle ilişkilendir. Osmanlı ekonomisine etki hakkındaki görüşünü kanıt ve gerekçeyle açıkla.', fields: [['Haritada gözlemlediğim değişim', 'Bir rota, liman veya ticaret bağlantısı…'], ['Ekonomik çıkarımım ve kanıtım', 'Kitaptaki metin/haritadan hangi ipucunu kullandın?']], hint: 'Etkilerin yönünü ezberden değil, kaynakta verilen ipuçlarından çıkar.' }
    ),
    27: lesson(
      'Rönesans döneminde Avrupa’da bilim, sanat ve düşünce alanlarında yenilikler öne çıktı. İnsan aklı, gözlem ve araştırma daha fazla önem kazandı. Osmanlı Devleti de Avrupa’daki bilimsel ve teknik gelişmeleri izleyerek bazı alanlarda yenilik ihtiyacını değerlendirdi.',
      ['Bilim, sanat ve düşünce alanlarını ayrı örneklerle tanı.', 'Gelişmenin Osmanlı’daki yenilik arayışıyla bağlantısını kur.', 'Bir soru üretip kanıta dayalı yanıtla.'],
      ['Rönesans', 'gözlem', 'yenilik'],
      { title: 'Rönesans hakkında soru kartı', format: 'Soru üretme · kendi yanıtını kanıtlama', prompt: 'Rönesans’ın bilim, düşünce veya sanat üzerindeki etkisine ilişkin bir soru yaz. Cevabını Avrupa’daki değişim ve Osmanlı’daki karşılıkla ilişkilendir.', fields: [['Sorumu yazıyorum', 'Neden, etki veya karşılaştırma sorusu…'], ['Yanıtım ve kaynak dayanağı', 'Bilgiyi kendi cümlenle açıkla.']], hint: 'Sorunun cevabını doğrudan başlıkta vermek yerine bir ilişki kur.' }
    ),
    28: lesson(
      'Reform, Avrupa’da kilisenin bazı uygulamalarına yönelik eleştiriler ve dinî yenilenme arayışlarıyla gelişti. Matbaa, düşüncelerin yayılması ve Rönesans’ın sorgulayıcı ortamı bu süreci etkiledi. Avrupa’daki sonuçlarıyla Osmanlı topraklarındaki farklı dinî toplulukların durumu aynı değildi.',
      ['Nedenleri ve sonuçları ayrı sınıflandır.', 'Düşüncelerin yayılmasında iletişim araçlarının rolünü düşün.', 'Avrupa’daki sonuçlarla Osmanlı bağlamını karşılaştırırken kaynağa dayan.'],
      ['Reform', 'matbaa', 'dinî özgürlük'],
      { title: 'Reform’u haberleştir ve karşılaştır', format: 'Kısa haber metni · neden-sonuç', prompt: 'Reform dönemindeki bir gelişmeyi haber biçiminde anlat. Zamanı, nedeni ve dikkat çekici sonucu belirt; Osmanlı bağlamındaki bilgiyi ayrı bir notta karşılaştır.', fields: [['Özgün başlık ve olay', 'Ne oldu, nerede ve yaklaşık hangi dönemde?'], ['Neden, sonuç ve karşılaştırma', 'Avrupa sonucu ile Osmanlı bilgisini kaynakla ayır.']], hint: 'Haberin yorumunu kaynakta doğrulanabilen bilgiden ayır.' }
    ),
    29: lesson(
      'Aydınlanma düşüncesi doğru bilgiye akıl, gözlem ve deneyle ulaşmayı savundu. Bilimsel yöntem farklı alanlarda gelişmeleri destekledi; özgürlük ve eşitlik gibi fikirler siyasal değişimlere de zemin hazırladı. Bu gelişmelerin Osmanlı’daki yenilik ihtiyacına etkisi ayrıca incelenebilir.',
      ['Akıl, gözlem ve deneyin bilgi üretimindeki yerini açıkla.', 'Düşünsel gelişmeleri toplumsal ve siyasal sonuçlardan ayır.', 'Bir neden-sonuç bağlantısını tabloyla göster.'],
      ['Aydınlanma', 'bilimsel yöntem', 'özgürlük'],
      { title: 'Aydınlanma neden-sonuç tablosu', format: 'Kaynak tablosu · neden ve sonuç', prompt: 'Kitap metninden iki neden ve iki sonucu belirle. Bilimsel düşünceyle toplumsal değişim arasındaki bir bağlantıyı açıklayıcı cümleyle yaz.', fields: [['Nedenler ve kaynak ipuçları', 'Akıl, gözlem, deney veya düşünsel ortam…'], ['Sonuçlar ve bağlantı', 'Bilim, siyaset veya Osmanlı yenilikleri…']], hint: 'Her sonucu metindeki bir nedene bağlayabildiğini kontrol et.' }
    ),
    30: lesson(
      'Sanayi İnkılabı ile makine kullanımı üretimi atölyelerden fabrikalara taşıdı. Üretimin miktarı ve maliyeti, şehirlerin büyümesi ve çalışma hayatı değişti; yeni ham madde ve pazar arayışları da güçlendi. Osmanlı ekonomisi, Avrupa’daki seri üretim ve ucuz ürünlerden etkilendi.',
      ['Teknik yeniliği üretim biçimindeki değişimle bağla.', 'Şehirleşme ve çalışma hayatındaki sonuçları düşün.', 'Osmanlı ekonomisi üzerindeki etkiyi kaynakla açıkla.'],
      ['makineleşme', 'fabrika', 'işçi sınıfı'],
      { title: 'Üretimden topluma etki zinciri', format: 'Boşluk/etki tablosu · neden-sonuç', prompt: 'Makineleşmeden başlayan bir neden-sonuç zinciri kur. Üretim, şehir yaşamı ve Osmanlı ekonomisi boyutlarından en az ikisini ilişkilendir.', fields: [['Teknik değişim → üretim', 'El üretimi ile fabrika üretimini karşılaştır.'], ['Toplumsal/ekonomik sonuç', 'Şehirleşme, çalışma hayatı veya Osmanlı üretimi…']], hint: 'Zincirde neden ile sonucu art arda değil, “bu nedenle” bağıyla açıkla.' }
    ),
    31: lesson(
      'Osmanlı Devleti, değişen askerî ve teknik koşullar karşısında çeşitli yenilikler uyguladı. Bir yeniliği anlamak için hangi ihtiyaca cevap verdiğini, hangi alanda uygulandığını ve hedeflenen değişimi incelemek gerekir. Yeniliklerin etkisi kaynak ve dönemin koşullarıyla değerlendirilmelidir.',
      ['Yeniliğin adını ve uygulama alanını kaydet.', 'İhtiyaç ile hedeflenen değişim arasında bağ kur.', 'Bir uygulamanın sınırlarını da göz önünde bulundur.'],
      ['yenilik', 'ıslahat', 'uygulama alanı'],
      { title: 'İhtiyaç–yenilik–amaç tablosu', format: 'Karşılaştırma tablosu · kaynak notu', prompt: 'Kitaptaki Osmanlı yeniliklerinden birini seç. Ortaya çıkış ihtiyacını, uygulama alanını ve hedefini birbiriyle eşleştir.', fields: [['İhtiyaç ve kaynak kanıtı', 'Askerî, teknik, eğitim veya yönetim alanı…'], ['Yenilik, hedef ve olası sonuç', 'Kaynakta ne amaçlanmış; ne değişmiş olabilir?']], hint: 'Beklenen etkiyi gerçekleşmiş sonuç gibi yazma; ikisini ayır.' }
    ),
    32: lesson(
      'Bir tarihî yeniliği değerlendirirken kaynakta görülen kanıt, uygulamanın amacı ve sonuçları ayrı tutulmalıdır. Beklenen değişim her zaman bütünüyle gerçekleşmeyebilir. Bu nedenle başarının koşullarını ve sınırlılıklarını da düşünmek gerekir.',
      ['Metin, görsel veya tablodan somut kanıt seç.', 'Amaçlanan sonuç ile görülen sonucu ayırt et.', 'Değerlendirmeyi ölçülü ve kaynakla uyumlu yaz.'],
      ['kaynak analizi', 'amaç', 'sonuç'],
      { title: 'Bir yenilik için kanıt ve değerlendirme', format: 'Kaynak inceleme · değerlendirme tablosu', prompt: 'Kitaptaki bir yenilik örneğini kaynak kanıtıyla açıkla. Hedeflenen değişim ile kaynakta anlatılan sonucu karşılaştır.', fields: [['Kaynakta gördüğüm bilgi', 'Metin, tablo veya görseldeki gözlem…'], ['Amaç, sonuç ve değerlendirmem', 'Başarıyı/sınırlılığı etkileyen bir koşul…']], hint: 'Kaynağın açıkça söylediğiyle kendi yorumunu farklı cümlelerde yaz.' }
    ),
    33: lesson(
      'Osmanlı kültür ve medeniyeti eğitim, hukuk, mimari, sanat ve günlük yaşam gibi farklı alanlardan oluşur. Bir kültürel unsurun hangi ihtiyaca cevap verdiği veya toplumda nasıl bir işlev gördüğü araştırılabilir. Kavramları örneklerle açıklamak ezberden daha anlamlıdır.',
      ['Kültürel unsuru ait olduğu alanla eşleştir.', 'Kavramın toplumdaki işlevini bir örnekle açıkla.', 'Yazılı ve görsel kaynakları birlikte değerlendirebilirsin.'],
      ['kültür', 'medeniyet', 'işlev'],
      { title: 'Kültür kavramları ve işlevi', format: 'Kelime bulutu · kavram açıklama', prompt: 'Eğitim, hukuk, sanat, mimari veya gündelik yaşamdan bir alt başlık seç. Anahtar kavramları derle ve birinin işlevini açıkla.', fields: [['Kavram bulutum', 'Bölümden en az üç anahtar sözcük yaz.'], ['Bir unsurun anlamı ve işlevi', 'Kaynakta gördüğün örnekle ilişkilendir.']], hint: 'Kavramın hangi alanla ilgili olduğunu ve toplumda ne yaptığını belirt.' }
    ),
    34: lesson(
      'Kısa bir araştırma raporu, açık bir soruyla başlar. Kitap, ders notu veya öğretmenin önerdiği güvenilir kaynaklardan seçilen kanıt, sorunun yanıtını desteklemelidir. Bilgiyi kendi cümlelerinle özetleyip kaynağı belirtmek araştırma dürüstlüğünün parçasıdır.',
      ['Dar ve araştırılabilir bir soru belirle.', 'Kaynak türünü ve kullanacağın kanıtı not et.', 'Sonucu kanıtla ilişkilendir ve kendi cümlenle yaz.'],
      ['araştırma sorusu', 'kaynak', 'kanıt'],
      { title: 'Dört parçalı kısa araştırma raporu', format: 'Soru kartı · kaynak · kanıt · sonuç', prompt: 'Ortak Mirasımız içinden merak ettiğin bir konu seç. Sorunu, kaynağını, bulduğun bilgiyi ve sonucunu kısa bir rapor taslağında birleştir.', fields: [['Araştırma sorum ve kaynağım', 'Soru dar, kaynak adı/türü belli olsun.'], ['Kanıt ve sonucum', 'Bilgiyi kendi cümlenle yaz; soruyu yanıtla.']], hint: 'Sonucunun kaynakta bulduğun bilgiyle gerçekten desteklenip desteklenmediğini kontrol et.' }
    ),
    35: lesson(
      'Ortak Mirasımız; Anadolu’daki siyasi değişimleri, Osmanlı’nın büyüme politikalarını, yenilikleri ve kültür/medeniyet unsurlarını bir araya getirir. Konular arasındaki zaman ve neden-sonuç ilişkileri öğrenme alanını bütün olarak görmeye yardım eder. Öz değerlendirmede güçlü olduğun ve tekrar etmek istediğin noktayı seç.',
      ['Politika, yenilik ve kültür başlıklarını ayırt et.', 'Bir başlıktan diğerine uzanan tarihî bağlantı kur.', 'Harita, metin veya kavramlardan kanıt kullan.'],
      ['politika', 'yenilik', 'kültürel miras'],
      { title: 'Üç başlıklı kavram haritası', format: 'Kavram haritası · öz değerlendirme', prompt: 'Büyüme politikaları, yenilikler ve kültür/medeniyetten birer örnek seç. Bunları tarihî bir bağlantıyla birleştir.', fields: [['Üç örnek ve kaynakları', 'Her konu başlığından bir kavram…'], ['Bağlantı ve tekrar planım', 'Ortak tarihî bağ nedir; hangi konuyu yeniden çalışacağım?']], hint: 'Benzer başlıkları değil, aralarındaki ilişkiyi göster.' }
    ),
    36: lesson(
      'Yıl sonu tekrarında Birlikte Yaşamak, Evimiz Dünya ve Ortak Mirasımız öğrenme alanlarından seçilen kavramlar karşılaştırılır. Birlikte yaşam becerileri, dünyadaki bağlantılar ve tarihî miras farklı konular olsa da kanıt kullanma ve sorumluluk alma gibi ortak becerilerle ilişkilidir.',
      ['Her alandan bir kavram ve örnek seç.', 'Benzerlik kadar farklılığı da açıkla.', 'Tekrar edeceğin konuyu belirle.'],
      ['iletişim', 'küresel bağlantı', 'tarihî miras'],
      { title: 'Üç alanı aynı ölçütle karşılaştır', format: 'Karşılaştırma · kavram haritası', prompt: 'Üç öğrenme alanından seçtiğin örnekleri sorumluluk, değişim veya iş birliği ölçütlerinden biriyle karşılaştır.', fields: [['Üç kavram ve örnekleri', 'Her öğrenme alanından bir tane…'], ['Ortak beceri ve farklılık', 'Bir ortaklık ve bir farkı açıkla.']], hint: 'Örnekleri aynı ölçüt üzerinden karşılaştır.' }
    ),
    37: lesson(
      'Yıl sonu paylaşımında seçtiğin konunun ana düşüncesini kısa ve anlaşılır biçimde anlatırsın. Bir kanıt, örnek veya görsel gözlem mesajını destekler. Paylaşım öncesi kaynağı, ifadelerin açıklığını ve dinleyiciye uygun dili kontrol et.',
      ['Tek bir ana mesaj seç.', 'Mesajı örnek veya kanıtla destekle.', 'Ürünü paylaşmadan önce anlaşılır ve saygılı olduğunu gözden geçir.'],
      ['ana mesaj', 'kanıt', 'öz değerlendirme'],
      { title: 'Öğrenmemi paylaşmaya hazırlık', format: 'Mini sunum · ürün kontrol listesi', prompt: 'Yıl boyunca öğrendiğin bir Sosyal Bilgiler konusunu afiş, sözlü anlatım veya not kartıyla paylaş. Önce taslağını planla.', fields: [['Başlık ve ana mesajım', 'Konuya uygun, tek cümlelik ileti…'], ['Kanıt, kaynak ve öz kontrol', 'Örnek ekle; anlaşılır ve doğru olduğunu gözden geçir.']], hint: 'Paylaşımında kaynağı belirt ve kitaptan uzun bir metni aynen aktarma.' }
    ),
  };

  const activities = {
    1: [
      {
        id: 'communication-importance',
        title: 'Gruplarda ve sosyal hayatta iletişimin önemini oku',
        sourceStyle: 'Özgün bilgilendirici metin · ana düşünce ve etkenleri belirleme',
        format: 'Okuma · metinden bilgi bulma · açıklama',
        count: '1 konu metni · 3 düşünme sorusu',
        sourceTitle: 'Özgün konu anlatımı',
        sourceLabel: 'Uygulama için özgün metin',
        prompt: 'Metni bölüm bölüm oku. Ardından iletişimin grup yaşamına katkısını ve iletişimi etkileyen etmenleri metinden yararlanarak açıkla.',
        hint: 'Kendi cümlelerini kullan; bir etmeni yalnızca adlandırmak yerine iletişimi nasıl etkileyebileceğini de belirt.',
        sourceText: 'Bir sınıf, spor takımı ya da mahalle çalışması gibi gruplarda insanlar ortak bir amaç için bir araya gelir; fakat herkesin bilgisi, düşüncesi ve ihtiyacı aynı olmayabilir. İletişim, bir kişinin söz söylemesiyle bitmez. Önemli olan, iletinin anlaşılması, karşı tarafın ne anladığının görülmesi ve gerekirse açıklama yapılmasıdır. Bu nedenle konuşmak kadar dikkatle dinlemek, uygun zamanda soru sormak ve yanıt vermek de iletişimin parçasıdır.\n\nEtkili iletişim görevlerin paylaşılmasına, ortak kararların alınmasına ve sorunların büyümeden ele alınmasına yardım eder. Bir grup üyesi düşüncesini açıkça ve saygılı bir dille söylediğinde başkaları da katkı sunabilir. Üyeler birbirine söz hakkı tanıdığında farklı görüşler duyulur; açıklayıcı sorular yanlış anlamaları azaltır. Böylece kişiler kendilerini grubun parçası hisseder, ortak işte sorumluluk alır ve gerektiğinde birbirine destek olur.\n\nİletişimin nasıl sonuçlanacağını birden çok etmen etkiler: iletinin açık ve amaca uygun olması, konuşanın seçtiği sözcükler ve ses tonu, dinleyenin dikkatini vermesi ve hemen yargıya varmaması, yüz ifadesi ve beden duruşu, ortamın gürültülü olup olmaması, kullanılan araç ve karşılıklı geri bildirim. Örneğin kalabalık bir yerde fısıltıyla verilen yönerge duyulmayabilir; yazılı mesajda ses tonu görünmediği için kısa bir ifade farklı yorumlanabilir. İletişim kopukluğu görevlerin karışmasına veya kırgınlığa yol açabilir. Kişiler birbirini anlamaya çalışıp “Doğru mu anladım?” diye kontrol ettiğinde ise grupta güven ve iş birliği gelişir.',
        questions: [
          question('group-contribution', 'Metne göre etkili iletişim, grup üyelerinin birlikte yaptığı işlere nasıl katkı sağlar? İki katkıyı açıkla.', [
            textField('contributions', 'Yanıtın', 'Örneğin görev paylaşımı, ortak karar, sorun çözme veya gruba ait hissetme…', 18),
          ]),
          question('communication-factors', 'Metinde iletişimi etkileyen hangi etmenler sıralanıyor? En az dört etmeni listele ve bunlardan birinin etkisini açıkla.', [
            textField('factors', 'İletişimi etkileyen etmenler', 'Etmenleri virgül veya madde işaretleriyle sırala…', 25),
            textField('factor-effect', 'Bir etmenin olası etkisi', 'Bu etmen olumlu ya da olumsuz olarak neyi değiştirebilir?', 18),
          ]),
          question('communication-is-reciprocal', '“İletişim, bir kişinin söz söylemesiyle bitmez.” düşüncesini metinden bir ayrıntıyla açıkla.', [
            textField('reciprocal-explanation', 'Açıklamam ve metinden dayanağım', 'Dinleme, geri bildirim veya anlamayı kontrol etmeyle ilişkilendir…', 18),
          ]),
        ],
      },
      {
        id: 'phone-conversation',
        title: 'Cep telefonu sohbetindeki mesajları incele',
        sourceStyle: 'Özgün dijital sohbet · anlamı kontrol etme · mesajı iyileştirme',
        format: 'Sohbet çözümleme · 3 açık uçlu soru',
        count: '1 telefon sohbeti · 3 soru',
        sourceTitle: 'Özgün örnek sohbet',
        sourceLabel: 'Aşağıdaki konuşma bu etkinlik için yazılmıştır',
        prompt: 'Sohbeti okuyup mesajların nasıl anlaşıldığını incele. Yazılı mesajda eksik kalabilecek bilgileri ve yanlış anlamayı azaltan ifadeleri belirle.',
        hint: 'Sohbetten kanıt göster; kişileri suçlamak yerine mesajın açıklığına ve verilen yanıta odaklan.',
        dialogue: [
          { speaker: 'Zeynep', text: 'Grup sunumunun giriş kısmını bitirdim.' },
          { speaker: 'Kerem', text: 'Güzel.' },
          { speaker: 'Zeynep', text: 'Sonuç bölümündeki iki öneriyi sen ekleyebilir misin?' },
          { speaker: 'Kerem', text: 'Tamamdır.' },
          { speaker: 'Zeynep', text: 'Dosyayı bu akşam 19.00’da paylaşacağım. Senin bölümün o saate kadar yetişir mi?' },
          { speaker: 'Kerem', text: 'Ben “tamamdır” yazınca bütün sunumu bitirdiğimi mi düşündün? Ben yalnızca mesajını gördüğümü belirtmiştim.' },
          { speaker: 'Zeynep', text: 'Haklısın, ne zaman yetiştirebileceğini açıkça sormalıydım. Taslağı 18.30’da gönderirsen birlikte gözden geçirebiliriz.' },
          { speaker: 'Kerem', text: 'Uygun. Taslağı 18.30’da gönderiyorum.' },
        ],
        questions: [
          question('chat-meaning', 'Sohbette hangi kısa yanıt farklı biçimlerde anlaşılabiliyor? İki kişinin bu yanıtı nasıl yorumladığını yaz.', [
            textField('ambiguous-message', 'Mesaj ve iki yorum', 'Sohbetten ilgili kısa mesajı ve iki farklı anlamı belirt…', 18),
          ]),
          question('chat-repair', 'Zeynep’in daha sonraki mesajı yanlış anlaşılmayı azaltmak için hangi bilgileri açıklıyor?', [
            textField('clarifying-details', 'Açıklayıcı bilgiler', 'Görev, zaman, beklenen adım veya birlikte gözden geçirme…', 18),
          ]),
          question('chat-rewrite', 'Sen bu grup çalışmasında olsaydın, işi ve teslim zamanını netleştiren kısa ve saygılı bir mesaj nasıl yazardın?', [
            textField('clear-message', 'Kendi mesajım', 'İsteğini açıkça belirt ve karşı tarafın durumunu sormaya yer bırak…', 16),
          ]),
        ],
      },
      {
        id: 'traffic-communication',
        title: 'Trafikte iletişim dilini oku ve yorumla',
        sourceStyle: 'Özgün bilgilendirici metin · metinden çıkarım · 3 soru',
        format: 'Günlük yaşam metni · yorumlama',
        count: '1 trafik metni · 3 soru',
        sourceTitle: 'Özgün bilgilendirici metin',
        sourceLabel: 'Uygulama için özgün metin',
        prompt: 'Trafikte iletişimin yalnızca konuşmadan oluşmadığını düşünerek metni oku. Verilen örnekleri ve güvenli, saygılı iletişim dilini sorularla incele.',
        hint: 'Trafik işaret ve kurallarının herkes için anlaşılır olmasına, mesajın zamanında verilmesine dikkat et.',
        sourceText: 'Trafik; sürücülerin, yolcuların, yayaların ve bisiklet kullananların aynı alanı paylaştığı bir ortamdır. Burada iletişim, insanların güvenli biçimde hareket etmesine yardımcı olur. Trafik ışıkları, yol çizgileri ve levhalar yazı ya da simgelerle bilgi verir; dönüş sinyali ve trafik görevlisinin el işareti de sözcük kullanılmadan mesaj iletebilir. Sürücünün kurallara uygun ve zamanında sinyal vermesi, çevresindekilerin ne yapacağını öngörmesini kolaylaştırır.\n\nTrafikte saygılı iletişim, kuralları izlemekle ve başkalarının hareket alanını gözetmekle başlar. Gereksiz korna, öfkeli bağırma veya ani ve öngörülemez davranışlar dikkati dağıtabilir; diğer kişilerin mesajı doğru anlamasını zorlaştırabilir. Bir yaya geçidinde bekleyen kişiye zaman tanımak, bisikletliyi sıkıştırmamak ve yön değişikliğini uygun biçimde bildirmek ortak güvenliği destekler. Bir işaretin anlamı belirsizse tahminle hareket etmek yerine güvenli davranıp kurallara uymak gerekir. Trafikte açık, sakin ve zamanında verilen mesajlar herkesin aynı durumu daha iyi değerlendirmesine yardım eder.',
        questions: [
          question('traffic-signals', 'Metinde sözcük kullanılmadan bilgi veren hangi trafik iletişimi örnekleri var? İki örnek yaz.', [
            textField('nonverbal-traffic', 'Sözsüz iletişim örnekleri', 'İşaret, sinyal, çizgi veya jest örneklerini metinden bul…', 12),
          ]),
          question('traffic-language', '“Önüne baksana!” gibi öfkeli bir çıkış yerine aynı güvenlik uyarısını daha açık ve saygılı bir dille nasıl söyleyebilirsin?', [
            textField('respectful-warning', 'Uygun uyarı cümlem', 'Kısa, sakin ve anlaşılır bir cümle kur…', 10, 'text'),
          ]),
          question('traffic-importance', 'Trafikte bir mesajın zamanında ve anlaşılır olması neden önemlidir? Metinden bir gerekçe ve kendi örneğini yaz.', [
            textField('traffic-reason', 'Gerekçem ve örneğim', 'Güvenlik, hareketi öngörme veya dikkati korumayla ilişkilendir…', 18),
          ]),
        ],
      },
      {
        id: 'four-communication-cases',
        title: 'Dört örnek durumu gözlemle ve merak ettiklerini yaz',
        sourceStyle: 'Dört özgün örnek olay · gözlem ve merak listesi',
        format: 'Örnek olay inceleme · gözlem / merak tablosu',
        count: '4 örnek durum · 2 liste',
        sourceTitle: 'Özgün örnek durumlar',
        sourceLabel: 'Dört kısa durumu birlikte incele',
        prompt: 'Her duruma bakarken yalnızca ne olduğunu değil, mesajın nasıl verildiğini ve nasıl karşılandığını da gözle. Ardından gözlemlerini ve merak ettiklerini iki ayrı listede topla.',
        hint: 'Bir gözlem, metinde görülen bir ayrıntıdır. Merak ettiğin şey ise araştırılabilecek yeni bir sorudur.',
        caseStudies: [
          { title: '1. Sınıf projesi', text: 'Eylül, proje planını anlatırken Arda birkaç kez sözünü kesip görevi kendi istediği biçimde dağıtır. Eylül konuşmayı bırakır; diğer grup üyeleri de henüz görüşlerini söylememiştir.' },
          { title: '2. Grup mesajı', text: 'Bir öğrenci sınıf grubuna “Bunu ben hallederim.” diye yazar. Kimin hangi bölümü hazırlayacağı ve çalışmanın ne zamana kadar tamamlanacağı belirtilmediği için iki arkadaşı farklı işler yapmaya başlar.' },
          { title: '3. Mahalle toplantısı', text: 'Park temizliği hakkında farklı bir öneri sunulunca toplantıyı yöneten kişi konuşanı sonuna kadar dinler, duyduğunu kendi sözleriyle özetler ve diğer katılımcılara da görüşlerini sorar.' },
          { title: '4. Kulüp duyurusu', text: 'Bir kulübün toplantı saati yalnızca koridorda sözlü olarak bir kez duyurulur. O sırada okulda olmayan bazı öğrenciler haberi alamaz; kulüp danışmanı daha sonra panoya yazılı duyuru da asar.' },
        ],
        questions: [
          question('observations', 'Dört örnekten gözlemlediğin iletişim davranışlarını listele. En az üç somut ayrıntı yaz.', [
            textField('observation-list', 'Gözlemlerim', 'Kim ne yaptı, mesaj nasıl verildi veya nasıl karşılandı?', 22),
          ]),
          question('wonders', 'Bu durumlar sende hangi merakları uyandırdı? Cevabını araştırmak isteyeceğin en az üç noktayı listele.', [
            textField('wonder-list', 'Merak ettiklerim', '“Neden…?”, “Nasıl…?” veya “Hangi durumda…?” diye başlayabilirsin.', 22),
          ]),
        ],
      },
      {
        id: 'learner-generated-questions',
        title: 'Etkili iletişim hakkında kendi sorularını oluştur',
        sourceStyle: 'Öğrenci tarafından soru üretme · önceki gözlem listesinden hareket etme',
        format: 'Soru oluşturma · araştırmaya hazırlık',
        count: '3 özgün araştırma sorusu',
        sourceLabel: 'Önceki etkinlikteki gözlem ve merak listeni kullan',
        prompt: 'Bir önceki etkinlikte yazdığın gözlem ve meraklara dön. Etkili iletişimin önemiyle ilgili, cevabı hazır verilmeyen ve araştırılabilecek sorular oluştur.',
        hint: 'Sorularını “neden”, “nasıl” veya “hangi durumda” ile başlatabilir; aynı şeyi üç kez sormamaya çalışabilirsin.',
        questions: [
          question('own-question-one', 'İlk araştırma sorunu yaz.', [textField('student-question-1', 'Sorum 1', 'Neden…? Nasıl…? Hangi durumda…?', 8, 'text')]),
          question('own-question-two', 'İkinci araştırma sorunu yaz.', [textField('student-question-2', 'Sorum 2', 'Farklı bir gözlem veya merakından yola çık…', 8, 'text')]),
          question('own-question-three', 'Üçüncü araştırma sorunu yaz.', [textField('student-question-3', 'Sorum 3', 'İletişimin gruba etkisini araştırmaya aç…', 8, 'text')]),
        ],
      },
      {
        id: 'communication-source-research',
        title: 'Kaynaklardan araştır ve bulgularını kaydet',
        sourceStyle: 'Yazılı · görsel · dijital kaynak inceleme · araştırma notu',
        format: 'Kaynak araştırması · yapılandırılmış bulgu alanı',
        count: '3 kaynak türü · 6 iletişim başlığı · 1 sonuç',
        sourceLabel: 'Ders kitabı, EBA/MEBİ ve öğretmeninin onayladığı kaynaklar',
        sourceProviders: ['eba', 'mebi'],
        prompt: 'Ben dili, empati, farklılıklara saygı, etkin dinleme, beden dili ve sen dilinin etkisi hakkında yazılı, görsel ve dijital kaynakları incele. Kaynağın adını/türünü ve bulduğun bilgiyi kaydet; bilgileri kendi cümlelerinle özetle.',
        hint: 'Bir bilgiyi doğrudan kopyalama. Kaynak türünü ve adını yaz; bulgunu kendi sözlerinle ifade et. EBA veya MEBİ’deki ilgili ders materyalini ya da öğretmeninin onayladığı başka bir kaynağı kullanabilirsin.',
        questions: [
          question('research-source-record', 'Araştırmanda kullandığın kaynakları kaydet. Her kaynak için başlık/ad, sayfa veya erişim bilgisi ve öğrendiğin bir noktayı yaz.', [
            textField('written-source', 'Yazılı kaynak', 'Kitabın / metnin adı, sayfa ve bulduğum bilgi…', 14),
            textField('visual-source', 'Görsel kaynak', 'Görselin / şemanın adı veya nerede bulunduğu ve gösterdiği bilgi…', 14),
            textField('digital-source', 'Dijital kaynak', 'Kurum / içerik başlığı, bağlantı veya erişim tarihi ve bulgu…', 14),
          ]),
          question('research-ben-language', 'Ben dili araştırmanda nasıl tanımlanıyor? Bir günlük yaşam cümlesinde nasıl kullanılabileceğini yaz.', [
            textField('ben-language-note', 'Ben dili bulgum', 'Durum, duygu ve isteği suçlamadan ifade etme üzerine…', 14),
          ]),
          question('research-empathy', 'Empati kurmanın iletişimdeki rolü hakkında ne öğrendin?', [
            textField('empathy-note', 'Empati bulgum', 'Aynı fikirde olmak ile karşı tarafı anlamaya çalışmayı ayır…', 14),
          ]),
          question('research-differences', 'Farklı düşünce ve özelliklere saygı göstermek grupta iletişimi nasıl etkileyebilir?', [
            textField('differences-note', 'Farklılıklara saygı bulgum', 'Katılım, güven veya görüşlerin duyulmasıyla bağlantı kur…', 14),
          ]),
          question('research-active-listening', 'Etkin dinleme sırasında gözlenebilecek iki davranışı ve bunların olası katkısını yaz.', [
            textField('active-listening-note', 'Etkin dinleme bulgum', 'Söz kesmeden dinleme, anladığını kontrol etme veya açıklayıcı soru…', 14),
          ]),
          question('research-body-language', 'Beden dili hangi ipuçlarını taşıyabilir? Bu ipuçlarının yanlış yorumlanmaması için neye dikkat edilir?', [
            textField('body-language-note', 'Beden dili bulgum', 'Yüz ifadesi, jest, duruş veya bağlam…', 14),
          ]),
          question('research-you-language', 'Sen diliyle kurulan suçlayıcı bir söz karşı tarafta nasıl bir etki oluşturabilir? Daha yapıcı bir ifade için ne değiştirilebilir?', [
            textField('you-language-note', 'Sen dilinin etkisi', 'Savunmaya geçme, konuşmanın kesilmesi veya duyguyu/isteği açıkça söyleme…', 14),
          ]),
          question('research-synthesis', 'Araştırma bulgularına dayanarak etkili iletişimin grup yaşamındaki önemini iki cümleyle özetle.', [
            textField('research-conclusion', 'Araştırma sonucum', 'En az iki bulgu arasında bağlantı kur…', 24),
          ]),
        ],
      },
    ],
    2: [
      {
        id: 'communication-process-and-types',
        title: 'İletişim sürecini ve iletişim türlerini kavra',
        sourceStyle: 'Uzun özgün açıklayıcı metin · metinle düşünme',
        format: 'Konu okuması · süreç / tür / özellik karşılaştırması',
        count: '1 açıklayıcı metin · 3 düşünme sorusu',
        sourceTitle: 'Özgün konu anlatımı',
        sourceLabel: 'İletişim süreci ve türlerine giriş',
        prompt: 'Önce açıklayıcı metni oku. Ardından iletişim sürecinin ögelerini, sözlü-yazılı-sözsüz yolların özelliklerini ve her yolun sınırlılıklarını örneklerle düşün.',
        hint: 'Bir iletişim biçimini her durumda en iyi kabul etme; amaca, ortama ve kişilere göre değerlendir.',
        sourceText: 'İletişim, insanların duygu, düşünce, bilgi ve ihtiyaçlarını birbirlerine aktarıp anlam kurdukları bir süreçtir. Bu süreçte bir kişi ya da grup iletiyi hazırlar; ileti başka bir kişiye veya gruba bir kanal aracılığıyla ulaşır. İletiyi alan kişi onu kendi bilgisi ve içinde bulunduğu koşullarla yorumlar. Verdiği yanıt ya da davranış, iletinin anlaşılıp anlaşılmadığına dair geri bildirim sağlar. Gürültü, dikkatin dağılması, belirsiz sözcükler veya paylaşılan bilginin eksik olması bu akışı etkileyebilir.\n\nİletişim farklı yollarla gerçekleşebilir. Sözlü iletişimde kişiler yüz yüze, telefonla ya da sesli bir duyuru aracılığıyla konuşur. Yazılı iletişim; not, mektup, duyuru veya dijital mesaj gibi yazıyla kurulur. Sözsüz iletişimde yüz ifadesi, jest, duruş ve uygun bağlamda kullanılan işaretler anlam taşır. Günlük bir yüz yüze konuşmada bu yollar çoğu zaman birlikte kullanılır: kişi konuşurken ses tonu ve beden dili de ipucu verir.\n\nHer yolun güçlü ve sınırlı yanları vardır. Konuşma hızlı soru sormayı sağlar ancak gürültülü ortamda duyulmayabilir; yazı bilgiyi tekrar okumaya imkân verir ama kısa bir mesajın tonu belirsiz kalabilir. Sözsüz işaretler konuşmayı destekler; yine de tek başına ayrıntılı bilgi vermeyebilir ve farklı yorumlanabilir. Bu yüzden iletişim biçimini amaca, kişilere, ortama ve erişilebilirliğe göre seçmek; ardından mesajın doğru anlaşılıp anlaşılmadığını kontrol etmek gerekir.',
        questions: [
          question('communication-elements', 'Metinde bir iletinin karşı tarafa ulaşmasını ve anlaşılmasını sağlayan hangi ögelerden söz ediliyor? En az üç ögeyi, aralarındaki bağla açıkla.', [
            textField('communication-elements-note', 'Süreç ögeleri', 'İletiyi hazırlayan, ileti, alan kişi, kanal, geri bildirim veya ortam…', 22),
          ]),
          question('feedback-role', 'Geri bildirim, iletinin anlaşılıp anlaşılmadığını görmeye nasıl yardım eder?', [
            textField('feedback-explanation', 'Açıklamam ve örneğim', 'Bir yanıt, soru veya davranış örneğiyle açıkla…', 18),
          ]),
          question('types-compare', 'Metindeki üç iletişim yolundan ikisini seç. Her biri için bir güçlü yön ve bir sınırlılık yaz.', [
            textField('types-strength-limits', 'Karşılaştırmam', 'Sözlü / yazılı / sözsüz yolları amaç ve ortamla ilişkilendir…', 22),
          ]),
        ],
      },
      {
        id: 'classify-communication-types',
        title: 'Örneklerdeki iletişim türünü belirle',
        sourceStyle: 'Örnekleri sınıflandırma · seçim ve gerekçelendirme',
        format: 'Sınıflandırma · 6 özgün günlük yaşam örneği',
        count: '6 örnek · sözlü / yazılı / sözsüz',
        sourceLabel: 'Özgün örnekler; türleri iletiyi aktarma yoluna göre sınıflandır',
        prompt: 'Her örnekte iletinin hangi yolla aktarıldığını seç. Kararsız kaldığında iletinin kendisine değil, örnekte kullanılan araca ve görülebilen davranışa bak.',
        hint: 'Bir olay birden fazla yolu içerebilir; bu etkinlikte her örnekte özellikle belirtilen aktarım biçimini seç.',
        questions: [
          question('type-example-1', 'Sınıf temsilcisi toplantıda söz alıp önerisini arkadaşlarına anlatıyor.', [communicationChoice('type-choice-1', 'spoken', 'Öneri konuşma yoluyla aktarılıyor.', 'Örnekte iletinin hangi yolla verildiğini ayırt et.')]),
          question('type-example-2', 'Bir öğrenci öğretmenine defterinde kısa bir not bırakıyor.', [communicationChoice('type-choice-2', 'written', 'Bilgi yazılı bir notla iletiliyor.', 'Örnekte kullanılan iletişim aracını düşün.')]),
          question('type-example-3', 'Bir dinleyici, arkadaşının sözünü kesmeden başını sallayarak onu izlediğini gösteriyor.', [communicationChoice('type-choice-3', 'nonverbal', 'Dinleyici, söz kullanmadan beden hareketiyle geri bildirim veriyor.', 'İletinin konuşma veya yazı olmadan nasıl aktarıldığına bak.')]),
          question('type-example-4', 'Okul panosuna gezi tarihi ve izin bilgilerini içeren bir duyuru asılıyor.', [communicationChoice('type-choice-4', 'written', 'Tarih ve bilgiler yazıyla duyuruluyor.', 'Mesajın panodaki hangi biçimde sunulduğunu düşün.')]),
          question('type-example-5', 'Takım antrenmanında oyuncu, arkadaşına eliyle bekle işareti veriyor.', [communicationChoice('type-choice-5', 'nonverbal', 'Oyuncu, hareketle ve sözcük kullanmadan işaret veriyor.', 'İşaretin bir sözcük veya yazı olup olmadığını düşün.')]),
          question('type-example-6', 'Bir öğrenci telefonla arkadaşını arayıp proje görevini sesli biçimde açıklıyor.', [communicationChoice('type-choice-6', 'spoken', 'Görev bilgisi sesli konuşmayla aktarılıyor.', 'Telefonun bu örnekte hangi iletiyi taşıdığına bak.')]),
        ],
      },
      {
        id: 'same-message-three-ways',
        title: 'Aynı amacı farklı iletişim yollarıyla anlat',
        sourceStyle: 'Uygulamalı üretim · sözlü, yazılı ve sözsüz iletiyi karşılaştırma',
        format: 'Bir durum · üç farklı ifade biçimi · değerlendirme',
        count: '3 ileti taslağı · 1 karşılaştırma',
        sourceLabel: 'Özgün grup çalışması durumu',
        prompt: 'Aşağıdaki durumda aynı amacı farklı yollarla nasıl ileteceğini yaz. Sözsüz ifadenin, gereken ayrıntıyı tek başına aktarıp aktaramayacağını da değerlendir.',
        hint: 'Sözlü ve yazılı örneklerinde ana bilgiyi açık ver; sözsüz ipuçlarını mesajı destekleyen işaretler olarak düşün.',
        scenario: 'Proje grubunun çalışma saati değişti. Bütün üyelerin yeni saati öğrenmesi ve gelemeyecek olanların bunu bildirebilmesi gerekiyor.',
        questions: [
          question('spoken-version', 'Bu değişikliği bir grup arkadaşına sözlü olarak nasıl söylersin?', [
            textField('spoken-message', 'Sözlü ileti örneğim', 'Yeni saati, kimleri ilgilendirdiğini ve yanıt beklentini belirt…', 16),
          ]),
          question('written-version', 'Aynı bilgiyi sınıf grubuna yazılı mesaj olarak nasıl gönderirsin?', [
            textField('written-message', 'Yazılı ileti örneğim', 'Tarih/saat ve yanıt vermesi gereken kişileri açıkça yaz…', 16),
          ]),
          question('nonverbal-version', 'Yüz yüze konuşurken hangi sözsüz ipuçları iletini destekleyebilir? Bu ipuçları yeni saati tek başına anlatmaya yeter mi?', [
            textField('nonverbal-message', 'Sözsüz ipuçları ve sınırı', 'Yüz ifadesi, duruş, dikkat veya el işareti gibi örnekleri değerlendir…', 18),
          ]),
          question('message-comparison', 'Üç yolun aynı amaca hizmet ettiğini nasıl kontrol eder ve yanlış anlamayı nasıl azaltırsın?', [
            textField('message-check', 'Karşılaştırmam', 'Geri bildirim veya bilgiyi tekrar doğrulama adımı ekle…', 18),
          ]),
        ],
      },
      {
        id: 'choose-communication-channel',
        title: 'Amaca ve kişilere uygun iletişim yolunu seç',
        sourceStyle: 'Örnek olay · iletişim türü seçimi · gerekçeli çözüm',
        format: '3 kısa senaryo · kanal seçimi ve geri bildirim',
        count: '3 durum · 6 açıklamalı yanıt',
        sourceLabel: 'Özgün sınıf ve grup yaşamı senaryoları',
        prompt: 'Her durum için kimlerin bilgiye ulaşması gerektiğini, hangi iletişim yollarını birlikte kullanabileceğini ve anlaşıldığını nasıl kontrol edeceğini düşün.',
        hint: 'Tek bir yolun herkese ve her amaca uygun olduğunu varsayma; erişim, zaman, gizlilik ve ayrıntı ihtiyacını da değerlendir.',
        caseStudies: [
          { title: '1. Saat değişikliği', text: 'Sınıf kulübünün toplantı saati değişti. Bazı öğrenciler o gün okulda değil; birkaç kişi de ilk duyuruyu duymamış olabilir.' },
          { title: '2. Grup çalışmasına katılım', text: 'Bir grup üyesi hastalık nedeniyle yüz yüze toplantıya gelemiyor. Grubun kararları ve görevleri onun da takip edebilmesi gerekiyor.' },
          { title: '3. Kısa ve acil yönerge', text: 'Beden eğitimi etkinliğinde öğretmen, hareket başlamadan önce bütün öğrencilerin durmasını ve kendisine bakmasını istiyor.' },
        ],
        questions: [
          question('channel-case-one', 'Saat değişikliği için hangi iki iletişim yolunu birlikte kullanır, duyurunun ulaştığını nasıl kontrol edersin?', [
            textField('channel-one-choice', 'Yol seçimi ve gerekçem', 'Yazılı duyuru, yüz yüze bilgilendirme veya başka bir uygun yol…', 18),
            textField('channel-one-feedback', 'Ulaştığını kontrol etme', 'Kimlerin gördüğünü/anladığını nasıl doğrularsın?', 12),
          ]),
          question('channel-case-two', 'Toplantıya katılamayan grup üyesinin bilgiye ve kararlara ulaşması için nasıl bir plan kurarsın?', [
            textField('channel-two-choice', 'İletişim planım', 'Kararları paylaşma, soru sorma ve yanıt verme yolunu açıkla…', 18),
            textField('channel-two-access', 'Katılımı gözeten adım', 'Üyenin görüşünün nasıl duyulacağını belirt…', 12),
          ]),
          question('channel-case-three', 'Hareket başlamadan önce verilen kısa yönergede hangi iletişim yolları birlikte kullanılabilir? Güvenli olmasını nasıl sağlarsın?', [
            textField('channel-three-choice', 'Uygun yollar ve nedenim', 'Sesli yönerge, görünür işaret veya başka bir destek…', 18),
            textField('channel-three-safety', 'Güvenlik kontrolüm', 'Herkesin yönergeyi fark ettiğini nasıl doğrularsın?', 12),
          ]),
        ],
      },
    ],
    3: [
      {
        id: 'perspective-reading',
        title: 'Durumu oku, bakış açılarını ayır',
        sourceStyle: 'Özgün durum metni · gözlem · duygu çıkarımı',
        format: 'Önce gözlem, sonra empati ve iletişim tercihi',
        count: '1 örnek durum · 3 düşünme sorusu',
        sourceTitle: 'Grup çalışmasında söz hakkı',
        sourceLabel: 'Etkinlik için hazırlanmış özgün sınıf durumu',
        prompt: 'Metindeki gözlemlenebilir davranışları, karakterlerin olası duygularından ayır. Birinin bakış açısını anlamaya çalışırken kesin yargı yerine açık soru kullan.',
        hint: 'Empati, karşı tarafla aynı fikirde olmak değil; onun ne düşündüğünü ve hissettiğini anlamaya çalışmaktır.',
        sourceText: 'Bir sınıf ekibi, okul bahçesindeki bitkiler için küçük bir tanıtım panosu hazırlamaktadır. Ece, panoda farklı bitkilerin yetişme koşullarını karşılaştırmayı önerir. Kerem hemen kendi fikrini anlatmaya başlar; Ece iki kez söz almak ister ama konuşma başka konuya geçer. Grup, taslağı bitirmeden görevleri paylaşır. Toplantı sonunda Ece, hazırladığı notların kullanılmadığını fark eder ve sessizleşir.\n\nBu kısa durum, Ece’nin ne hissettiğini kesin olarak söylemez. Sessizleşmesi gözlenebilir bir davranıştır; “üzgün olabilir” ya da “fikrinin dikkate alınmadığını düşünüyor olabilir” ise kontrol edilmesi gereken yorumlardır. Empatik bir grup üyesi, Ece adına karar vermek yerine ona söz verir ve ne düşündüğünü sorar.\n\nGörüş ayrılığı olduğunda da kişiler birbirini suçlamadan konuşabilir. “Sen zaten dinlemiyorsun” demek yerine, kendi yaşantısını ve ihtiyacını anlatmak; diğer kişinin de yanıt vermesine alan açar.',
        questions: [
          question('observable-details', 'Metinde doğrudan görülen iki davranış nedir? Yorumlarını gözlemden ayrı yaz.', [textField('details', 'Gözlemlerim', 'Kim ne yaptı veya ne söyledi?', 16)]),
          question('possible-feeling', 'Ece’nin ne hissediyor olabileceğini düşün. Bu tahmini hangi ipucuna dayandırdığını ve nasıl doğrulayabileceğini yaz.', [textField('feeling-and-clue', 'Duygu tahminim ve sorum', 'Kesin yargı kurmadan bir ipucu ve açık soru belirt…', 18)]),
          question('empathetic-response', 'Ece’nin görüşünü anlamak için hangi yanıt daha uygundur?', [choiceField('response-choice', 'Uygun yanıtı seç.', [
            { id: 'ask', label: '“Ece, senin önerinde önemli olan noktayı biraz daha anlatır mısın?”' },
            { id: 'decide', label: '“Ece adına ben karar vereyim; böylece hızlanırız.”' },
            { id: 'blame', label: '“Sen de daha önce söyleseydin.”' },
          ], 'ask', 'Açık soru, Ece’ye kendi düşüncesini anlatma olanağı verir.', 'Karşı tarafın yerine karar vermeyen ve onu suçlamayan seçeneği ara.')]),
        ],
      },
      {
        id: 'language-sort',
        title: 'Ben dili, suçlayıcı söz ve saygılı soruyu sınıflandır',
        sourceStyle: 'Sürükle-bırak · iletişim dilini sınıflandırma · gerekçelendirme',
        format: 'Sınıflandırma · dokunma ve klavyeyle de taşınabilir kartlar',
        count: '6 ifade · 3 iletişim biçimi',
        sourceLabel: 'Kitaptaki ben dili ve farklı görüşleri dinleme hedefleri',
        prompt: 'Her ifadeyi nasıl bir iletişim yolu kullandığına göre uygun gruba yerleştir. Sonra seçtiğin bir ifadeyi daha yapıcı hâle getirmek için neyi değiştireceğini yaz.',
        hint: 'Ben dili yaşanan durumu, duyguyu ve isteği anlatır. Kişiyi etiketleyen “sen dili” suçlayıcı olabilir; saygılı sorular ise karşı tarafa açıklama alanı açar.',
        fields: [
          sortField('language-groups', 'İfadeleri uygun gruba taşı', [
            { id: 'i-language', label: 'Ben dili', icon: '💬', description: 'Durumu, duyguyu veya ihtiyacı kişiyi suçlamadan anlatır.' },
            { id: 'blaming-you', label: 'Suçlayıcı sen dili', icon: '⚠️', description: 'Kişiyi etiketler veya genelleyerek yargılar.' },
            { id: 'respectful', label: 'Saygılı soru / ortak öneri', icon: '🤝', description: 'Diğer kişinin düşüncesini anlamaya veya çözüm aramaya alan açar.' },
          ], [
            { id: 'i-one', label: 'Sözüm kesilince düşüncemi tamamlayamadığımı hissediyorum; bitirmeme izin verir misin?' },
            { id: 'i-two', label: 'Grup planı değişince kaygılandım; yeni görevleri birlikte netleştirebilir miyiz?' },
            { id: 'you-one', label: 'Sen zaten kimseyi dinlemiyorsun.' },
            { id: 'you-two', label: 'Her zamanki gibi her şeyi karıştırdın.' },
            { id: 'ask-one', label: 'Bu öneride senin için önemli olan noktayı anlatır mısın?' },
            { id: 'ask-two', label: 'İstersen iki görüşü de dikkate alan başka bir seçenek arayalım.' },
          ], {
            'i-one': 'i-language', 'i-two': 'i-language',
            'you-one': 'blaming-you', 'you-two': 'blaming-you',
            'ask-one': 'respectful', 'ask-two': 'respectful',
          }),
          textField('language-reason', 'Bir ifadeyi nasıl geliştirirdin?', 'İfade kişiyi etiketliyorsa durumu, duyguyu ve isteği kullan…', 16),
        ],
      },
      {
        id: 'rewrite-and-reflect',
        title: 'Suçlayıcı ifadeyi ben diliyle yeniden kur',
        sourceStyle: 'Cümle dönüştürme · çoklu seçim · kısa öz değerlendirme',
        format: 'Örnek cümleler üzerinde uygulama',
        count: '2 cümle dönüşümü · 1 çoklu seçim · 1 yansıtma',
        prompt: 'Aşağıdaki örnekleri kendi sözlerinle daha yapıcı hâle getir. Cümlende yaşanan durumu, duygunu veya ihtiyacını belirt; karşı tarafın yanıtına da yer bırak.',
        hint: 'Ben dili hazır kalıptan ibaret değildir. Önemli olan durumu doğru anlatmak ve kişiyi suçlamadan isteğini açıklamaktır.',
        questions: [
          question('rewrite-one', '“Sen hiç söz vermiyorsun, grup çalışmasını bozuyorsun.” ifadesini ben diliyle yeniden yaz.', [textField('sentence-one', 'Yeni cümlem', 'Durumu, duygunu ve isteğini yargılamadan anlat…', 18)]),
          question('rewrite-two', 'Bir arkadaşın farklı bir öneri sunduğunda saygılı biçimde nasıl yanıt verebilirsin?', [textField('sentence-two', 'Yanıtım', 'Görüşünü belirt ve arkadaşının fikrine açık bir soru ekle…', 18)]),
          question('i-language-parts', 'Ben dili cümlesi kurarken yararlı olan parçaları seç.', [multiChoiceField('parts', 'Uygun parçaların tümünü işaretle.', [
            { id: 'situation', label: 'Yaşanan durumu kişiyi etiketlemeden belirtmek' },
            { id: 'feeling', label: 'Kendi duygu veya ihtiyacını açıklamak' },
            { id: 'request', label: 'Uygulanabilir bir istek ya da soru eklemek' },
            { id: 'label', label: 'Karşı tarafa kişilik etiketi koymak' },
            { id: 'threat', label: 'İstediğim olmazsa tehdit etmek' },
          ], ['situation', 'feeling', 'request'], 'Durumu, duyguyu/ihtiyacı ve açık isteği birlikte düşün.', 'Kişiyi suçlamadan yaşanan olayı ve kendi ihtiyacını anlatan parçaları seç.')]),
          question('reflection', 'Empati kurmak ile karşı tarafla aynı fikirde olmak arasındaki fark nedir?', [textField('difference', 'Kendi açıklamam', 'Anlamaya çalışma ve görüşe katılma arasındaki farkı açıkla…', 16)]),
        ],
      },
    ],
    4: [
      {
        id: 'pause-and-predict',
        title: 'Durumu oku, devamını tahmin et',
        sourceStyle: 'Özgün “arkası yarın” durumu · tahmin · çoktan seçmeli karar',
        format: 'Durumu sürdürme · olası sonuçları gerekçelendirme',
        count: '1 yarım bırakılmış durum · 2 soru',
        sourceTitle: 'Görev paylaşımında anlaşmazlık',
        sourceLabel: 'Özgün grup çalışması örneği',
        prompt: 'Durumu okuduktan sonra iki farklı devam yolu tahmin et: biri anlaşmazlığı büyütebilir, diğeri çözüm arayışını başlatabilir. Metindeki ipuçlarına dayan.',
        hint: 'Tahminini kesin sonuç gibi yazma; her olasılığın hangi davranıştan doğabileceğini açıkla.',
        sourceText: 'Bir okul kulübü, dönem sonunda küçük bir sergi hazırlayacaktır. Deniz, herkesin bir ürün seçip tanıtmasını önerir; Baran ise işleri daha hızlı bitirmek için görevleri kendisi dağıtmak ister. İkisi de kendi önerisinin neden önemli olduğunu anlatır, fakat birbirlerinin sözünü kesmeye başlar. Diğer üyeler henüz konuşmamıştır. Kulüp danışmanı, tartışmayı durdurup gruba şu soruyu sorar: “Bu sergide hepimizin katkı sunabilmesi için nasıl bir yol izleyebiliriz?”\n\nBurada durumun devamı henüz belli değildir. Grup, danışmanın sorusundan sonra üyelerin ihtiyaçlarını dinleyebilir, farklı görev seçenekleri üretebilir ve ortak ölçüt belirleyebilir. Ya da üyelerden biri diğerinin kişiliğini suçlayabilir ve kalan kişiler karara katılmadan uzaklaşabilir. Hangi yolun seçileceğini, grubun dinleme ve karar alma biçimi belirleyecektir.',
        questions: [
          question('predict-two-paths', 'Durum için iki olası devam yolu yaz. Her birinin gruba nasıl bir sonuç getirebileceğini belirt.', [textField('paths', 'Tahminlerim ve sonuçları', 'Bir yapıcı, bir de işi zorlaştıran davranış düşün…', 24)]),
          question('first-step', 'Danışmanın sorusundan sonra atılabilecek en yapıcı ilk adım hangisidir?', [choiceField('first-step-choice', 'Bir seçenek belirle.', [
            { id: 'listen', label: 'Her üyeye söz verip önerilerin hangi ihtiyaca cevap verdiğini dinlemek' },
            { id: 'vote-now', label: 'Nedenini konuşmadan en hızlı öneriyi oylamak' },
            { id: 'assign', label: 'Görevleri yalnızca danışmanın belirlemesi' },
          ], 'listen', 'Önce herkesin ihtiyacını duymak seçenek üretmeyi ve adil karar vermeyi kolaylaştırır.', 'Ortak çözümden önce kimlerin görüşünün duyulması gerektiğini düşün.')]),
        ],
      },
      {
        id: 'behavior-sort',
        title: 'Yapıcı ve çatışmayı artıran davranışları ayır',
        sourceStyle: 'Sürükle-bırak · davranışları sınıflandırma',
        format: 'Davranış inceleme · sonuçla ilişkilendirme',
        count: '8 davranış · 2 grup',
        prompt: 'Kartları anlaşmazlıkta çözüm arayışını destekleyen veya iletişimi zorlaştıran davranışlara göre sınıflandır.',
        hint: 'Bir davranışın niyetinden çok, tarafların görüşünü duyma ve ortak karar verme olanağına etkisini değerlendir.',
        fields: [
          sortField('conflict-behaviors', 'Davranışları uygun gruba yerleştir', [
            { id: 'constructive', label: 'Çözümü destekler', icon: '🌿', description: 'Dinleme, açıklama ve adil seçenekler üretmeyi sağlar.' },
            { id: 'escalates', label: 'Gerilimi artırabilir', icon: '⚡', description: 'Kişiyi hedef alır veya katılımı sınırlar.' },
          ], [
            { id: 'listen-turn', label: 'Her kişinin sözünü tamamlamasını beklemek' },
            { id: 'clarify-needs', label: '“Bu görevde senin için önemli olan ne?” diye sormak' },
            { id: 'shared-criteria', label: 'Seçenekleri adalet ve uygulanabilirlikle karşılaştırmak' },
            { id: 'summarize', label: 'Duyduğunu kendi sözleriyle özetleyip doğrulamak' },
            { id: 'interrupt', label: 'Karşı taraf anlatırken tekrar tekrar sözünü kesmek' },
            { id: 'label', label: '“Sen bencil birisin” diyerek kişiyi etiketlemek' },
            { id: 'decide-alone', label: 'Grubun görüşünü almadan kararı tek başına vermek' },
            { id: 'mock', label: 'Bir öneriyle alay edip konuşanı susturmak' },
          ], {
            'listen-turn': 'constructive', 'clarify-needs': 'constructive',
            'shared-criteria': 'constructive', 'summarize': 'constructive',
            interrupt: 'escalates', label: 'escalates', 'decide-alone': 'escalates', mock: 'escalates',
          }),
          textField('behavior-reason', 'Seçtiğin bir davranışın etkisini açıkla.', 'Bu davranış katılımı veya çözüm bulmayı nasıl etkiliyor?', 16),
        ],
      },
      {
        id: 'shared-solution',
        title: 'İki tarafı gözeten çözüm tasarla',
        sourceStyle: 'İhtiyaç belirleme · adil çözüm · çoklu seçim',
        format: 'Örnek olaydan ortak karar planına',
        count: '2 açık yanıt · 1 çoklu seçim',
        prompt: 'Bir anlaşmazlığı çözerken tarafların kişisel özelliklerine değil, ihtiyaçlarına ve üzerinde çalışılan soruna odaklan.',
        scenario: 'Bir grup sunumunda iki öğrenci aynı bölümü hazırlamak istiyor; başka bir bölüm henüz kimseye verilmemiş. Süre sınırlı, ancak grup üyeleri de sunumda yer almak istiyor.',
        hint: 'Uzlaşma, herkesin her isteğinin aynen gerçekleşmesi değil; gerekçesi açıklanmış ve üzerinde anlaşılmış uygulanabilir bir yol bulmaktır.',
        questions: [
          question('needs', 'İki öğrencinin ve grubun hangi ihtiyaçları olabilir? Her biri için bir örnek yaz.', [textField('needs-note', 'İhtiyaçlar', 'Öğrenme, ilgi, zaman veya katılım ihtiyacını düşün…', 16)]),
          question('fair-criteria', 'Çözüm seçeneklerini değerlendirirken hangi ölçütler yardımcı olur?', [multiChoiceField('criteria', 'Uygun ölçütlerin tümünü seç.', [
            { id: 'fair', label: 'Görevlerin adil ve açık paylaşılması' },
            { id: 'feasible', label: 'Sürenin ve yapılacak işin gerçekçi olması' },
            { id: 'voice', label: 'Grup üyelerinin görüşünün alınması' },
            { id: 'winner', label: 'Bir kişinin diğerlerini dinlemeden kazanması' },
          ], ['fair', 'feasible', 'voice'], 'Adil, uygulanabilir ve katılıma açık ölçütler birlikte düşünülmelidir.', 'Tek bir kişinin istediğini yapmak yerine grup kararını değerlendiren ölçütleri ara.')]),
          question('solution', 'Üzerinde anlaşılabilecek bir görev paylaşımı öner. Neden adil ve uygulanabilir olduğunu açıkla.', [textField('solution-plan', 'Ortak çözümüm', 'Görev, süre ve üyelerin katılımını belirt…', 20)]),
        ],
      },
    ],
    5: [
      {
        id: 'equality-reading',
        title: 'Fırsat eşitliğini örnek üzerinden incele',
        sourceStyle: 'Özgün açıklayıcı durum · ilke seçimi · çoklu seçim',
        format: 'Kısa okuma · çevresel engel ve düzenleme',
        count: '1 durum · 3 soru',
        sourceTitle: 'Bilim kulübünün sergi hazırlığı',
        sourceLabel: 'Erişim ve katılım üzerine özgün örnek',
        prompt: 'Durumdaki güçlüğün nereden kaynaklanabileceğini ve hangi düzenlemelerin fırsat eşitliğini destekleyeceğini düşün. Kişiyi değil, çevreyi ve süreci incele.',
        hint: 'Herkese aynı biçimde davranmak her zaman eşit katılım sağlamaz. İlgili kişilere neyin işe yaradığını sormak iyi bir başlangıçtır.',
        sourceText: 'Okulun bilim kulübü, dönem sonunda koridorda bir sergi düzenleyecektir. Duyuru yalnızca küçük puntolu bir afişte yer alır ve stantların arasında dar geçişler kalır. Kulüp üyeleri, bir öğrencinin sergiye katılmakta zorlanabileceğini fark edince onun yerine karar vermek yerine görüşünü sorar. Öğrenci; geçişlerin genişletilmesini, etkinlik saatinin önceden paylaşılmasını ve deney yönergelerinin hem yazılı hem sözlü anlatılmasını önerir. Grup, önerileri öğretmeniyle birlikte değerlendirip hangi düzenlemeleri yapabileceğini planlar.\n\nBu örnekte amaç, herkesin aynı görevi aynı yolla yapmasını istemek değildir. Amaç, farklı kişilerin etkinliğe güvenli ve anlamlı biçimde katılabileceği yollar oluşturmaktır. Engeli kişinin kendisine yüklemek yerine geçiş alanı, bilgi biçimi ve etkinlik planı gibi değiştirilebilir koşullara bakılır.\n\nDüzenleme seçerken ilgili kişilerin görüşü, güvenlik, uygulanabilirlik ve bağımsız katılım birlikte düşünülür. Sonrasında geri bildirim alınarak yapılan değişikliğin gerçekten işe yarayıp yaramadığı kontrol edilir.',
        questions: [
          question('equal-opportunity', 'Örnekte fırsat eşitliğini en iyi anlatan yaklaşım hangisidir?', [choiceField('principle', 'Uygun yaklaşımı seç.', [
            { id: 'change-environment', label: 'Katılımı zorlaştıran çevre ve bilgi düzenini inceleyip ilgili kişinin görüşüyle değiştirmek' },
            { id: 'exclude', label: 'Etkinliği zor bulan öğrenciyi sergiden uzak tutmak' },
            { id: 'same-route', label: 'Herkesten aynı geçiş yolunu kullanmasını istemek' },
          ], 'change-environment', 'Düzenlemeyi engelin bulunduğu ortam veya süreçte aramak katılımı destekler.', 'Kişiyi sorun gibi göstermeyen ve katılım koşullarını iyileştiren yaklaşımı seç.')]),
          question('barrier-and-support', 'Örnekteki iki katılım engelini ve bunlara karşılık gelen birer düzenlemeyi eşleştirerek yaz.', [textField('barrier-support-note', 'Engel ve düzenlemeler', 'Duyuru, geçiş alanı veya yönerge örneklerini kullan…', 20)]),
          question('planning-checks', 'Bir etkinlik planlanırken hangi noktalar kontrol edilmelidir?', [multiChoiceField('planning-checklist', 'Uygun kontrollerin tümünü işaretle.', [
            { id: 'route', label: 'Etkinlik alanına ulaşım ve geçişler' },
            { id: 'information', label: 'Bilginin anlaşılır ve zamanında paylaşılması' },
            { id: 'participant-voice', label: 'Katılımcıların kendi görüşünü sorma' },
            { id: 'assume', label: 'Kişinin neye ihtiyacı olduğunu ona sormadan varsayma' },
          ], ['route', 'information', 'participant-voice'], 'Erişim, anlaşılır bilgi ve katılımcı görüşü bir arada değerlendirilir.', 'Kişinin yerine karar vermek yerine erişim koşullarını ve görüş alma adımını seç.')]),
        ],
      },
      {
        id: 'access-barrier-sort',
        title: 'Çevresel engel ve katılımı destekleyen düzenlemeyi ayır',
        sourceStyle: 'Sürükle-bırak · durumları sınıflandırma',
        format: 'Engel / destekleyici düzenleme · gerekçeli sınıflandırma',
        count: '8 durum · 2 grup',
        prompt: 'Kartları, katılımı zorlaştıran çevresel koşullara veya eşit katılımı kolaylaştıran düzenlemelere göre yerleştir.',
        hint: 'Düzenlemeler, kişinin yerine karar vermek değil; erişim koşullarını ve katılım seçeneğini geliştirmektir.',
        fields: [
          sortField('access-groups', 'Durumları uygun gruba taşı', [
            { id: 'barrier', label: 'Katılımı zorlaştıran engel', icon: '🚧', description: 'Ortam veya süreç değiştirilebilir bir güçlük yaratır.' },
            { id: 'support', label: 'Katılımı destekleyen düzenleme', icon: '♿', description: 'Erişimi, bilgiyi veya seçme olanağını geliştirir.' },
          ], [
            { id: 'stairs-only', label: 'Toplantı alanına yalnızca basamaklı merdivenle ulaşılabilmesi' },
            { id: 'tiny-print', label: 'Önemli duyurunun yalnızca küçük ve soluk yazıyla paylaşılması' },
            { id: 'single-format', label: 'Etkinlik yönergesinin tek bir biçimde verilmesi' },
            { id: 'narrow-route', label: 'Stantlar arasında geçiş için yeterli alan bırakılmaması' },
            { id: 'step-free', label: 'Etkinliğe basamaksız ve güvenli bir giriş yolu sağlanması' },
            { id: 'clear-notice', label: 'Saat ve yer bilgisinin önceden, okunaklı biçimde duyurulması' },
            { id: 'multiple-ways', label: 'Yönergenin yazılı ve sözlü olarak anlaşılır biçimde sunulması' },
            { id: 'ask-participants', label: 'Düzenleme öncesinde katılımcılara neyin işe yarayacağını sormak' },
          ], {
            'stairs-only': 'barrier', 'tiny-print': 'barrier', 'single-format': 'barrier', 'narrow-route': 'barrier',
            'step-free': 'support', 'clear-notice': 'support', 'multiple-ways': 'support', 'ask-participants': 'support',
          }),
          textField('support-reason', 'Seçtiğin düzenleme hangi katılımı kolaylaştırır?', 'Düzenlemenin hangi engeli azalttığını açıkla…', 16),
        ],
      },
      {
        id: 'brainwriting',
        title: 'Fırsat eşitliği için fikir üret ve geliştir',
        sourceStyle: 'Beyin yazımı · fikir geliştirme · uygulanabilir ilk adım',
        format: 'Sorun belirleme · bağımsız fikir · geliştirme',
        count: '1 ihtiyaç · 3 fikir · 1 ilk adım',
        prompt: 'Okul, mahalle veya ortak bir etkinlikte katılımı zorlaştıran bir durumu seç. Önce farklı fikirler üret; sonra bir fikri ilgili kişilerin görüşüyle geliştir.',
        hint: 'Kitaptaki beyin yazımı biçiminden esinlenerek fikirleri önce biriktir, sonra uygunluk ve olası yarara göre karşılaştır.',
        questions: [
          question('need', 'Hangi katılım ihtiyacını ele alıyorsun? Sorunu kişiye değil, değiştirilebilir koşula bağla.', [textField('selected-need', 'İhtiyaç / engel', 'Bilgi, mekân, iletişim veya etkinlik düzeni…', 16)]),
          question('ideas', 'Birbirinden farklı üç çözüm fikri yaz.', [
            textField('idea-one', 'Fikir 1', 'İlk aklına gelen uygulanabilir değişiklik…', 8),
            textField('idea-two', 'Fikir 2', 'Başka bir yol veya bilgi biçimi…', 8),
            textField('idea-three', 'Fikir 3', 'İlgili katılımcının görüşünü de düşün…', 8),
          ]),
          question('first-step', 'Hangi fikri ilk denemek istersin? Kimin görüşünü alır ve işe yaradığını nasıl anlarsın?', [textField('trial-plan', 'İlk deneme planım', 'Katılımcı, sorumlu kişi ve gözlenebilir sonuç…', 18)]),
        ],
      },
    ],
    6: [
      {
        id: 'accessibility-match',
        title: 'Düzenlemeyi erişim türüyle eşleştir',
        sourceStyle: 'Sürükle-bırak · erişilebilirlik eşleştirmesi',
        format: 'Eşleştirme · fiziksel erişim / bilgi / iletişim',
        count: '9 düzenleme · 3 erişim alanı',
        prompt: 'Her düzenlemeyi en çok desteklediği erişim alanına taşı. Bir düzenlemenin birden fazla yararı olabileceğini unutma; burada baskın katkıyı sınıflandırıyoruz.',
        hint: 'Erişilebilirlik mekân, bilgi, iletişim ve etkinliğe katılma yollarının birlikte düşünülmesini gerektirir.',
        fields: [
          sortField('accessibility-types', 'Düzenlemeleri ilgili alana taşı', [
            { id: 'physical', label: 'Fiziksel erişim', icon: '🛤️', description: 'Mekâna ulaşma ve alanda güvenli hareket etme.' },
            { id: 'information', label: 'Bilgiye erişim', icon: '📖', description: 'Yönerge, saat ve içeriği önceden anlayabilme.' },
            { id: 'communication', label: 'İletişim ve etkinliğe katılım', icon: '🗣️', description: 'Bilgi paylaşma, görüş bildirme ve destek alma yolu.' },
          ], [
            { id: 'ramp', label: 'Etkinlik alanına basamaksız bir giriş yolu düzenlemek' },
            { id: 'wide-aisle', label: 'Stantlar arasında yeterli genişlikte geçiş bırakmak' },
            { id: 'seating', label: 'Uzun etkinlikte dinlenme ve oturma alanı sağlamak' },
            { id: 'advance-map', label: 'Etkinlik yeri ve saatini önceden okunaklı biçimde paylaşmak' },
            { id: 'plain-steps', label: 'Yönergeyi kısa, açık ve adım adım yazmak' },
            { id: 'large-contrast', label: 'Duyuruda okunaklı yazı ve yeterli renk karşıtlığı kullanmak' },
            { id: 'questions', label: 'Katılımcıların soru sorması ve destek istemesi için zaman ayırmak' },
            { id: 'multiple-channels', label: 'Önemli bilgiyi yazılı ve sözlü yollardan duyurmak' },
            { id: 'choice-of-role', label: 'Etkinliğe katkı sunmak için birden fazla görev seçeneği vermek' },
          ], {
            ramp: 'physical', 'wide-aisle': 'physical', seating: 'physical',
            'advance-map': 'information', 'plain-steps': 'information', 'large-contrast': 'information',
            questions: 'communication', 'multiple-channels': 'communication', 'choice-of-role': 'communication',
          }),
        ],
      },
      {
        id: 'event-access-review',
        title: 'Okul etkinliği planını herkes için gözden geçir',
        sourceStyle: 'Örnek olay · çoklu seçim · iyileştirme önerisi',
        format: 'Etkinlik erişimi ve geri bildirim planı',
        count: '1 örnek durum · 2 soru',
        prompt: 'Etkinlik planında yalnızca davetiyeyi değil, alana ulaşmayı, bilgiyi önceden almayı, etkinlikte görev seçmeyi ve geri bildirim vermeyi de düşün.',
        scenario: 'Okulda bir bilim sergisi yapılacak. Sergi salonu ikinci kattadır; saat bilgisi son gün sınıf grubunda paylaşılmıştır. Öğrenciler ürünlerini tanıtırken yalnızca ayakta sunum yapabilecekleri düşünülmüştür. Planlama ekibi bu koşulları, katılımcıların görüşünü almadan önce fark eder.',
        hint: 'Bir erişim düzenlemesinin işe yarayıp yaramadığını, yararlanacak kişilerden geri bildirim alarak değerlendirmek gerekir.',
        questions: [
          question('event-checklist', 'Sergi öncesi hangi düzenlemeler katılımı artırabilir?', [multiChoiceField('event-supports', 'Uygun adımların tümünü seç.', [
            { id: 'route', label: 'Etkinlik alanına ulaşım seçeneğini kontrol etmek ve gerekirse uygun alan planlamak' },
            { id: 'advance-info', label: 'Yer ve saat bilgisini önceden, birden fazla anlaşılır yolla paylaşmak' },
            { id: 'role-options', label: 'Ürün tanıtımı için farklı görev ve sunum seçenekleri sunmak' },
            { id: 'ask', label: 'Katılımcılara hangi düzenlemenin işlerine yaradığını sormak' },
            { id: 'assume', label: 'Hiç kimseye sormadan tüm ihtiyaçları bildiğini varsaymak' },
          ], ['route', 'advance-info', 'role-options', 'ask'], 'Fiziksel erişim, önceden bilgi, seçenek ve geri bildirim bir arada planlanmalıdır.', 'Katılımcıların görüşünü dışlamayan ve erişimi artıran adımları seç.')]),
          question('event-improvement', 'Planı iyileştirmek için atılacak bir adımı ve bu adımın işe yaradığını nasıl kontrol edeceğini yaz.', [textField('improvement', 'Düzenleme ve kontrolüm', 'Kiminle görüşülecek, ne değişecek, hangi geri bildirim alınacak?', 20)]),
        ],
      },
      {
        id: 'access-audit',
        title: 'Bir çevreyi erişilebilirlik açısından kontrol et',
        sourceStyle: 'Gözlem kontrol listesi · kısa değerlendirme',
        format: 'Mekân, bilgi, iletişim ve katılımı birlikte inceleme',
        count: '5 kontrol · 1 geliştirme önerisi',
        prompt: 'Okulda veya mahallede bildiğin bir ortak alanı düşün. Uygun olmayan bir durumu kişisel bilgi paylaşmadan genel biçimde değerlendir; gözlemleyemediğin noktaları “henüz kontrol etmedim” diye not edebilirsin.',
        hint: 'Bu kontrol listesi alanı puanlamak için değil, daha kapsayıcı hâle getirilebilecek noktaları fark etmek içindir.',
        fields: [
          checklistField('audit-points', 'Gözlemlediğin veya kontrol ettiğin başlıkları işaretle', [
            { id: 'route', label: 'Alana ulaşım ve içeride hareket etme yolu düşünülmüş.' },
            { id: 'signs', label: 'Yönlendirme ve temel bilgiler anlaşılır biçimde bulunabiliyor.' },
            { id: 'communication', label: 'Soru sorma veya destek isteme yolu belli.' },
            { id: 'participation', label: 'Etkinlikte katkı sunmak için farklı seçenekler var.' },
            { id: 'feedback', label: 'Kullanıcıların önerisini iletebileceği bir yol bulunuyor.' },
          ]),
          textField('audit-proposal', 'Geliştirilebilecek bir nokta ve önerin', 'Kişiyi değil, değiştirilebilecek ortam veya süreci belirt…', 18),
        ],
      },
    ],
    7: [
      {
        id: 'project-draft',
        title: 'Eşit katılım için küçük proje taslağı hazırla',
        sourceStyle: 'Proje taslağı · hedef · görev ve değerlendirme',
        format: 'İhtiyaçtan uygulanabilir ilk adıma',
        count: '1 proje kartı · 5 planlama alanı',
        prompt: 'Okul veya mahallede fırsat eşitliğini destekleyen küçük bir proje düşün. Taslağını, mümkünse fikrinden etkilenecek kişilerin görüşünü alarak tamamla.',
        hint: 'Küçük, güvenli ve izin gereklilikleri düşünülmüş bir ilk adım seç. Önerini tek başına uygulamadan önce sorumlu bir yetişkine danış.',
        fields: [
          textField('project-need', 'İhtiyaç ve dayanağın', 'Hangi katılım engelini gözlemledin veya kimden duydun?', 18),
          textField('project-goal', 'Açık proje hedefi', 'Kimlerin hangi etkinliğe nasıl katılımını kolaylaştıracaksın?', 18),
          textField('project-action', 'İlk uygulanabilir adım', 'Önce kiminle konuşulacak; ne değiştirilecek?', 18),
          textField('project-roles', 'Katılımcılar ve sorumluluklar', 'İlgili kişi, grup, öğretmen veya kurumun rolü…', 18),
          textField('project-measure', 'Beklenen değişim ve kontrol', 'Hangi geri bildirim ya da gözlem önerinin işe yaradığını gösterir?', 18),
        ],
      },
      {
        id: 'project-cycle-sort',
        title: 'Proje adımlarını planla, uygula, gözden geçir',
        sourceStyle: 'Sürükle-bırak · proje döngüsünü aşamalara ayırma',
        format: 'Proje taslağı ve kontrol listesiyle ilişkilendirme',
        count: '6 adım · 3 aşama',
        prompt: 'Her proje adımını planlama, uygulama veya değerlendirme aşamasına yerleştir. Bir projenin geri bildirimden sonra yeniden planlanabileceğini unutma.',
        hint: 'Kitaptaki proje taslağı ve kontrol listesi yaklaşımını, ihtiyaçtan değerlendirmeye uzanan adımlarla uygula.',
        fields: [
          sortField('project-stages', 'Adımları proje aşamalarına yerleştir', [
            { id: 'plan', label: 'Planla', icon: '📝', description: 'İhtiyacı, hedefi, kişileri ve ilk adımı belirle.' },
            { id: 'do', label: 'Uygula', icon: '🛠️', description: 'İzinleri ve görevleri gözeterek küçük adımı dene.' },
            { id: 'review', label: 'Gözden geçir', icon: '🔎', description: 'Geri bildirim al, sonucu değerlendir ve gerekirse düzelt.' },
          ], [
            { id: 'ask-need', label: 'İlgili kişilere hangi değişikliğin yararlı olacağını sormak' },
            { id: 'set-goal', label: 'İhtiyaç ve gözleme dayalı bir hedef yazmak' },
            { id: 'assign-roles', label: 'Sorumluları, zamanı ve gerekli desteği belirlemek' },
            { id: 'try-step', label: 'Güvenli ve izinli ilk adımı küçük ölçekte denemek' },
            { id: 'get-feedback', label: 'Katılımcılardan uygulama sonrasında geri bildirim almak' },
            { id: 'revise', label: 'Geri bildirime göre taslağı veya uygulamayı yenilemek' },
          ], {
            'ask-need': 'plan', 'set-goal': 'plan', 'assign-roles': 'plan',
            'try-step': 'do', 'get-feedback': 'review', revise: 'review',
          }),
        ],
      },
      {
        id: 'project-review',
        title: 'Proje taslağını kontrol listesiyle gözden geçir',
        sourceStyle: 'Proje kontrol listesi · ölçüt ve öz değerlendirme',
        format: 'Uygulanabilirlik · katılımcı görüşü · etki kontrolü',
        count: '5 kontrol · 1 kısa açıklama',
        prompt: 'Taslağını uygulamaya geçmeden önce her ölçütü gözden geçir. Henüz karşılamadığın ölçüt varsa, bunu bir geliştirme adımı olarak yaz.',
        hint: 'Proje, yararlanacak kişilerin görüşü alınmadan onların adına kesinleştirilmemelidir.',
        fields: [
          checklistField('project-checks', 'Taslağımda bulunan özellikleri işaretle', [
            { id: 'need', label: 'Proje belirli bir ihtiyaca veya gözleme dayanıyor.' },
            { id: 'voice', label: 'İlgili kişilerin görüşünü alma adımı var.' },
            { id: 'feasible', label: 'Hedef küçük ve uygulanabilir bir adıma ayrılmış.' },
            { id: 'safe', label: 'Güvenlik, izin ve sorumlu yetişkin desteği düşünülmüş.' },
            { id: 'measure', label: 'Sonucu gözlem veya geri bildirimle değerlendirebilirim.' },
          ]),
          textField('next-improvement', 'Geliştirmem gereken bir adım', 'Kontrol listesinde henüz tamamlanmayan bir maddeyi açıkla…', 12),
        ],
      },
    ],
    8: [
      {
        id: 'word-cloud-values',
        title: 'Ortak değerler için kelime bulutu oluştur',
        sourceStyle: 'Kelime bulutu · kavram açıklama · kısa seçim',
        format: 'Anahtar sözcüklerden örneğe',
        count: 'En az 3 anahtar sözcük · 2 düşünme sorusu',
        prompt: 'Toplumun ortak yaşamı ve ortak meseleleri için önemli olduğunu düşündüğün sözcükleri seç. Sonra bir kavramı günlük yaşamdan bir davranışla ilişkilendir.',
        hint: 'Sözcükleri tekrar etme; her birinin ortak yaşamda hangi davranışa veya sorumluluğa karşılık geldiğini düşün.',
        fields: [
          wordField('word-cloud', 'Kelime bulutu sözcükleri', 'Örn. sorumluluk, dayanışma, güven…'),
          textField('value-example', 'Bir sözcük ve günlük örneği', 'Seçtiğin değerin hangi davranışta görüldüğünü açıkla…', 16),
          choiceField('shared-purpose', 'Ortak bir konuda katkıyı değerlendirirken hangi soru yardımcı olur?', [
            { id: 'who-need', label: 'Hangi ortak ihtiyaç var ve kimler nasıl katkı sunabilir?' },
            { id: 'one-person', label: 'Bu konuda yalnızca tek bir kişi mi önemlidir?' },
            { id: 'same-view', label: 'Herkesin aynı fikirde olması nasıl sağlanır?' },
          ], 'who-need', 'Ortak ihtiyaç ve farklı katkıları birlikte incelemek daha dengeli bir değerlendirme sağlar.', 'Sorumluluk ve iş birliğini görünür kılan soruyu ara.'),
        ],
      },
      {
        id: 'value-action-sort',
        title: 'Ortak değer ile günlük katkıyı ilişkilendir',
        sourceStyle: 'Sürükle-bırak · kavram ve davranışı sınıflandırma',
        format: 'Kavramı örneğe bağlama · eşleştirmeli sınıflandırma',
        count: '8 kart · 2 grup',
        prompt: 'Kartları toplumsal yaşamda ortak değerleri anlatan kavramlar veya bu değerleri günlük yaşamda gösteren davranışlar olarak ayır.',
        hint: 'Bir değer soyut bir ilke olabilir; davranış ise bu ilkenin belirli bir durumda nasıl uygulandığını gösterir.',
        fields: [
          sortField('value-actions', 'Kavram ve davranış kartlarını ayır', [
            { id: 'values', label: 'Ortak değer / ilke', icon: '💠', description: 'Birlikte yaşamı yönlendiren genel kavram.' },
            { id: 'actions', label: 'Günlük katkı / davranış', icon: '🙌', description: 'Değerin somut bir durumda nasıl uygulandığı.' },
          ], [
            { id: 'respect', label: 'Karşılıklı saygı' },
            { id: 'responsibility', label: 'Ortak sorumluluk' },
            { id: 'solidarity', label: 'Dayanışma' },
            { id: 'listen', label: 'Ortak karar öncesi farklı görüşleri dinlemek' },
            { id: 'share-task', label: 'Ortak bir ihtiyaca göre görev paylaşmak' },
            { id: 'share-info', label: 'Doğrulanmış bilgiyi ilgili kişilerle paylaşmak' },
            { id: 'trust', label: 'Güven' },
            { id: 'participation', label: 'Bir etkinliğe katılımı artırmak için farklı görev seçenekleri sunmak' },
          ], {
            respect: 'values', responsibility: 'values', solidarity: 'values', trust: 'values',
            listen: 'actions', 'share-task': 'actions', 'share-info': 'actions', participation: 'actions',
          }),
        ],
      },
      {
        id: 'shared-issue-brainstorm',
        title: 'Ortak mesele için sorumlu katkı fikirleri üret',
        sourceStyle: 'Beyin fırtınası · örnek olay · ortak katkı',
        format: 'Bir durum seç · fikir üret · ilk adımı gerekçelendir',
        count: '3 özgün durum · 3 fikir alanı',
        prompt: 'Aşağıdaki günlük yaşam durumlarından birini seç veya benzer bir örnek düşün. Farklı kişilerin ve kurumların güvenli, sorumlu biçimde neler yapabileceğini yaz.',
        hint: 'Millî meseleleri tek bir bakış açısına indirgeme; ortak ihtiyaç, güvenilir bilgi ve farklı katkı yollarını birlikte düşün.',
        caseStudies: [
          { title: '1. Bilgi paylaşımı', text: 'Bir mahalle etkinliğinin tarihi değişmiş; bazı kişiler eski duyuruya göre gelmeyi planlıyor.' },
          { title: '2. Ortak alan', text: 'Yoğun kullanılan bir parkta bakım ve erişimle ilgili farklı öneriler toplanıyor.' },
          { title: '3. Acil durum hazırlığı', text: 'Bir sınıf, olası bir acil durumda buluşma yeri ve haberleşme yolunu önceden belirlemek istiyor.' },
        ],
        questions: [
          question('choose-issue', 'Seçtiğin durumdaki ortak ihtiyacı ve etkilenen kişileri belirt.', [textField('issue-and-people', 'İhtiyaç ve kişiler', 'Kimin hangi bilgiye veya desteğe ihtiyacı var?', 16)]),
          question('brainstorm-ideas', 'Bu ihtiyaca yönelik üç farklı katkı fikri üret.', [
            textField('contribution-one', 'Fikir 1', 'Bireysel bir adım…', 8),
            textField('contribution-two', 'Fikir 2', 'Birlikte yapılabilecek bir adım…', 8),
            textField('contribution-three', 'Fikir 3', 'Kurum veya okulun katkısı…', 8),
          ]),
          question('responsible-first-step', 'İlk olarak hangi adımı seçersin ve bilgiyi nasıl doğrularsın?', [textField('first-step-and-source', 'İlk adım ve kaynak', 'Sorumluyu, güvenilir bilgi yolunu ve gerekçeyi belirt…', 16)]),
        ],
      },
    ],
    9: [
      {
        id: 'national-days-sort',
        title: 'Ulusal bayram ve anma günlerini sınıflandır',
        sourceStyle: 'Sürükle-bırak · tarih kartlarını sınıflandırma',
        format: 'Takvim çalışması · kutlama ve anma ayrımı',
        count: '5 tarih kartı · 2 kategori',
        prompt: 'Tarih kartlarını ulusal bayram veya anma günü olarak sınıflandır. Günlerin adını ve anlamını ders kitabı ya da güvenilir resmî kaynakla kontrol et.',
        hint: 'Tarih bilgisini ve günün hangi olayı hatırlattığını birlikte düşün; emin olmadığın bilgiyi kaynağa danış.',
        fields: [
          sortField('national-day-types', 'Günleri ilgili kategoriye taşı', [
            { id: 'national-holiday', label: 'Ulusal bayram', icon: '🎉', description: 'Kutlama ve ortak değerlerin hatırlandığı resmî gün.' },
            { id: 'commemoration', label: 'Anma günü', icon: '🕯️', description: 'Geçmişteki kişi veya olayların anlamının hatırlandığı gün.' },
          ], [
            { id: 'april-23', label: '23 Nisan — Ulusal Egemenlik ve Çocuk Bayramı' },
            { id: 'may-19', label: '19 Mayıs — Atatürk’ü Anma, Gençlik ve Spor Bayramı' },
            { id: 'august-30', label: '30 Ağustos — Zafer Bayramı' },
            { id: 'october-29', label: '29 Ekim — Cumhuriyet Bayramı' },
            { id: 'november-10', label: '10 Kasım — Atatürk’ü anma günü' },
          ], {
            'april-23': 'national-holiday', 'may-19': 'national-holiday', 'august-30': 'national-holiday',
            'october-29': 'national-holiday', 'november-10': 'commemoration',
          }),
          textField('date-source-note', 'Bir tarih için kaynak ve anlam notu', 'Kaynağın adını ve günün neyi hatırlattığını yaz…', 12),
        ],
      },
      {
        id: 'flag-brainstorm',
        title: 'Bayrak ve ortak hafıza üzerine düşün',
        sourceStyle: 'Beyin fırtınası · sembol inceleme · kaynak kontrolü',
        format: 'Ön bilgi · kaynakla doğrulama · farklı deneyimlere saygı',
        count: '2 açık yanıt · 1 seçim',
        prompt: 'Bayrağın kamusal alanlarda ve törenlerde kullanılmasının hangi ortak anlamları taşıyabileceğini düşün. Önce tahminini yaz, sonra tarihî ve resmî bilgileri kaynaktan kontrol et.',
        hint: 'Bir sembolün ortak anlamı ile kişilerin kişisel deneyimleri farklı olabilir; kesin ve tek bir duygu varsayma.',
        fields: [
          textField('flag-meaning', 'Bayrak hangi ortak değerleri veya hatırlatmaları taşıyabilir?', 'Birden fazla olasılık yaz; kesin yargı kurma…', 18),
          choiceField('source-check', 'Bayrağın anlamını araştırırken en güvenilir yaklaşım hangisidir?', [
            { id: 'verify', label: 'Tarihî ve resmî bilgileri ders kitabı veya güvenilir kurum kaynağıyla kontrol etmek' },
            { id: 'assume', label: 'Bir kişinin yorumunu herkesin aynı düşündüğünün kanıtı saymak' },
            { id: 'guess', label: 'Kaynağa bakmadan yalnızca tahminle karar vermek' },
          ], 'verify', 'Kaynağı kontrol etmek, bilgi ile kişisel yorumu ayırmaya yardım eder.', 'Sembolün tarihî bilgisini kişisel yorumdan ayıran seçeneği ara.'),
          textField('flag-question', 'Kaynakta hangi soruya yanıt ararsın?', 'Tarih, kullanım biçimi veya ortak hafıza üzerine bir soru yaz…', 10),
        ],
      },
      {
        id: 'shared-memory-story',
        title: 'Ortak hafızayı bir etkinlik örneğiyle yorumla',
        sourceStyle: 'Özgün kısa durum · anlam çıkarımı · slogan ve gerekçe',
        format: 'Birlikte hatırlama · katılım seçenekleri · yansıtma',
        count: '1 durum · 3 düşünme sorusu',
        sourceTitle: 'Okulda tarih panosu',
        sourceLabel: 'Özgün ortak hafıza örneği',
        prompt: 'Durumun hangi tarihî bilgileri paylaştığını, katılımcılara nasıl söz hakkı verdiğini ve ortak hafızayı nasıl destekleyebileceğini değerlendir.',
        hint: 'Sloganını özgün ve saygılı kur. Bir günün anlamını yalnızca tören biçimiyle değil, hatırlattığı olay ve değerle açıkla.',
        sourceText: 'Bir sınıf, ulusal bayramlar ve anma günleri için küçük bir tarih panosu hazırlamaktadır. Öğrenciler her kartta günün adını, tarihini, hangi olay veya değerin hatırlandığını ve bilgiyi aldıkları kaynağı belirtir. Bazı öğrenciler kısa yazı yazar; bazıları çizim veya sözlü sunumla katkı verir. Öğretmen, tarihlerin doğruluğunu ders kitabıyla kontrol etmelerini ve farklı kişilerin bu günleri nasıl deneyimleyebileceğini saygılı biçimde düşünmelerini ister.\n\nPano, ortak bilgiyi paylaşırken katılım için birden fazla yol sunar. Öğrencilerden biri “Herkes aynı şekilde kutlamalıdır” demek yerine, “Bu günün hangi ortak değerini hatırlamak istiyoruz ve bilgiyi nasıl doğru aktarırız?” sorusunu önerir. Böylece etkinlik hem kaynak kontrolü hem de farklı katılım biçimleri üzerine düşünme fırsatı olur.',
        questions: [
          question('shared-event', 'Panodaki çalışmada bilgiyi güvenilir kılan ve farklı katılım yolları sunan iki özelliği yaz.', [textField('features', 'İki özellik', 'Kaynak kontrolü, görev seçeneği veya bilgi biçimi…', 16)]),
          question('memory-slogan', 'Ortak hafızanın önemini anlatan kısa, özgün bir slogan ve gerekçesini yaz.', [
            textField('slogan', 'Sloganım', 'Kısa ve saygılı bir cümle…', 6, 'text'),
            textField('slogan-reason', 'Gerekçem', 'Hangi olayı veya değeri hatırlatıyor?', 12),
          ]),
          question('respectful-participation', 'Farklı katılım biçimlerine saygı göstermek ortak etkinliği nasıl etkiler?', [textField('participation-reflection', 'Yansıtma yanıtım', 'Katılım, kaynak, saygı veya ortak hafıza arasında bağ kur…', 16)]),
        ],
      },
    ],
    10: [
      {
        id: 'national-struggle-reading',
        title: 'Millî Mücadele anlatımını kanıt ve amaç açısından oku',
        sourceStyle: 'Özgün açıklayıcı metin · çoktan seçmeli · kanıt sorusu',
        format: 'Tarihî bağlam · ortak amaç · kaynak okuma',
        count: '1 özgün okuma · 3 soru',
        sourceTitle: 'Ortak amaç ve farklı katkılar',
        sourceLabel: 'Kitap sayfa 43–47’deki tarihî dayanışma ve kaynak çalışmalarıyla uyumlu özgün özet',
        prompt: 'Özgün açıklayıcı metni oku. Tarihsel bilgiyi, ortak ihtiyacı ve farklı katkıları belirle; metnin doğrudan söylediği bilgiyle kendi çıkarımını ayır.',
        hint: 'Bu açıklama birincil tarihî belge değildir; kaynak incelemesinde kitabındaki belge, görsel veya tabloyu ayrıca kullan.',
        sourceText: 'Millî Mücadele döneminde bağımsızlık hedefi, ülkenin farklı yerlerinde yaşayan insanların ve kurumların çeşitli yollarla katkı sunmasını gerektirdi. Yerel örgütlenmeler ve toplantılar, ihtiyaçların paylaşılmasına ve ortak hareketin düzenlenmesine yardımcı oldu. Ulaşım, haberleşme ve kaynakların ihtiyaç duyulan yerlere ulaştırılması da bu çabanın önemli parçalarıydı.\n\n1921’de yayımlanan Tekâlif-i Milliye emirleriyle ordunun ihtiyaçlarını karşılamak üzere halktan belirli kaynak ve malzemelerin belirlenen usullerle sağlanması istendi. Bu tarihî uygulamayı değerlendirirken, dönemin koşullarını ve emrin amacını birlikte düşünmek gerekir. İnsanların katkıları aynı biçimde veya aynı ölçüde olmayabilir; kaynak, kimin ne yaptığını ve hangi ortak ihtiyaca yanıt verildiğini araştırmaya yardım eder.\n\nBir tarihî metin, görsel ya da tabloyu incelerken kaynağın türünü ve tarihini not et. Kaynakta doğrudan gördüğün bilgi kanıttır; bu bilgiden hareketle kurduğun “dayanışma ortak amaca katkı sağladı” gibi sonuç ise çıkarımdır. Çıkarımını kanıtla ilişkilendir.',
        questions: [
          question('tekalif-purpose', 'Metne göre Tekâlif-i Milliye emirleriyle hangi amaç gözetilmiştir?', [choiceField('purpose-choice', 'Uygun yanıtı seç.', [
            { id: 'army-needs', label: 'Ordunun ihtiyaçlarını karşılamak için belirli kaynak ve malzemeleri sağlamak' },
            { id: 'trade', label: 'Ülkeler arası ticaret kurallarını belirlemek' },
            { id: 'school', label: 'Okullardaki ders saatlerini yeniden düzenlemek' },
          ], 'army-needs', 'Metin, emirlerin ordunun ihtiyaçlarını karşılamaya yönelik olduğunu söylüyor.', 'Yanıtını açıklayıcı metindeki ortak ihtiyaç ifadesiyle karşılaştır.')]),
          question('evidence-and-inference', 'Metindeki doğrudan bilgiden bir kanıt yaz ve bu kanıttan çıkardığın sonucu ayrı cümlede açıkla.', [textField('evidence-inference-note', 'Kanıtım ve çıkarımım', 'Önce metindeki bilgi; sonra kendi sonucunu yaz…', 20)]),
          question('contribution-types', 'Metnin anlattığı katkı alanlarından iki tanesini ve neden yararlı olduklarını belirt.', [textField('contributions', 'Katkılar ve ortak amaç', 'Örn. haberleşme, ulaşım, kaynak paylaşımı veya örgütlenme…', 18)]),
        ],
      },
      {
        id: 'solidarity-contributions-sort',
        title: 'Dayanışma örneklerini katkı türüne göre sınıflandır',
        sourceStyle: 'Sürükle-bırak · tarihî katkı kartlarını sınıflandırma',
        format: 'Kaynak çalışmasına hazırlık · katkı türleri',
        count: '9 katkı örneği · 3 grup',
        prompt: 'Kartları baskın katkı türüne göre yerleştir. Bazı gerçek tarihî çalışmalar birden fazla katkı içerebilir; burada verilen cümlede öne çıkan yönü sınıflandır.',
        hint: 'Tarihî örneği ders kitabındaki kaynakla kontrol et; kartlar özgün çalışma cümleleridir, doğrudan belge alıntısı değildir.',
        fields: [
          sortField('contribution-types', 'Katkıları ilgili gruba taşı', [
            { id: 'material', label: 'Maddi destek / kaynak', icon: '📦', description: 'İhtiyaç duyulan malzeme veya kaynağı sağlama.' },
            { id: 'logistics', label: 'Ulaşım / haberleşme', icon: '🛤️', description: 'Bilgi, insan veya malzemeyi ulaştırma.' },
            { id: 'organization', label: 'Örgütlenme / ortak çalışma', icon: '🤝', description: 'İhtiyacı belirleme ve görevleri birlikte düzenleme.' },
          ], [
            { id: 'clothing', label: 'Ordu için gereken giysi ve malzemeyi belirlenen usulle toplamak' },
            { id: 'supplies', label: 'İhtiyaç duyulan araç ve gereçleri ortak kullanım için sağlamak' },
            { id: 'food', label: 'Yolculuk sırasında kullanılacak yiyecek ve temel malzemeyi hazırlamak' },
            { id: 'messages', label: 'Bir yerden başka bir yere ihtiyaç ve haber bilgisi ulaştırmak' },
            { id: 'transport', label: 'Gerekli malzemenin güvenli biçimde taşınmasına yardım etmek' },
            { id: 'route', label: 'Yol ve teslim noktası bilgisini ilgili kişilerle paylaşmak' },
            { id: 'meeting', label: 'Toplantıda hangi ihtiyacın önce karşılanacağını birlikte belirlemek' },
            { id: 'roles', label: 'İşleri ve görev alacak kişileri ortak bir listeyle düzenlemek' },
            { id: 'coordinate', label: 'Farklı katkıların aynı amaca hizmet etmesi için eşgüdüm kurmak' },
          ], {
            clothing: 'material', supplies: 'material', food: 'material',
            messages: 'logistics', transport: 'logistics', route: 'logistics',
            meeting: 'organization', roles: 'organization', coordinate: 'organization',
          }),
        ],
      },
      {
        id: 'historical-source-table',
        title: 'Ders kitabındaki kaynağı kanıt tablosuyla incele',
        sourceStyle: 'Tarihî kaynak inceleme · kanıt / çıkarım tablosu',
        format: 'Kaynak türünü belirt · kanıtı kaydet · çıkarımı gerekçelendir',
        count: '1 kaynak kartı · 4 inceleme alanı',
        sourceLabel: 'Ders kitabındaki Millî Mücadele kaynaklarından birini seç',
        prompt: 'Kitaptaki yazılı metin, görsel, harita veya tabloyu seç. Doğrudan kaynağın gösterdiği bilgiyi, kendi yorumundan ayrı kaydet.',
        hint: 'Bu alanlar kaynak incelemesine yardımcı olur; kaynak metnini uzun uzun kopyalamak yerine kendi sözlerinle not al.',
        fields: [
          textField('source-type', 'Kaynağın adı, türü ve sayfası', 'Metin/görsel/tablo, başlık ve kitap sayfası…', 10),
          textField('source-observation', 'Kaynakta doğrudan gördüğüm bilgi', 'Bir ayrıntı, tarih, davranış veya gösterge…', 16),
          textField('historical-inference', 'Kanıta dayalı çıkarımım', 'Bu bilgi ortak amaç veya dayanışma hakkında ne düşündürüyor?', 18),
          textField('source-question', 'Kaynağın yanıtlamadığı bir soru', 'Daha fazla bilgi için neyi araştırmak gerekir?', 12),
        ],
      },
    ],
    11: [
      {
        id: 'solidarity-case-comparison',
        title: 'Farklı alanlardaki ortak çabaları karşılaştır',
        sourceStyle: 'Dört özgün örnek olay · karşılaştırma · ortak yön çıkarımı',
        format: 'Afet, bilim, kültür ve spor örnekleri',
        count: '4 kısa durum · 2 karşılaştırma sorusu',
        prompt: 'Dört örnek olayı incele. Her durumda hangi ihtiyaç bulunduğunu, kimlerin katkı sunduğunu ve topluma beklenen yararı belirle; örnekleri aynı ölçütle karşılaştır.',
        hint: 'Örneklerde adı geçmeyen kişi veya kurumlar hakkında kesin bilgi ekleme; verilen durumla sınırlı kal.',
        caseStudies: [
          { title: '1. Afet hazırlığı', text: 'Bir mahalle ekibi, olası sel riski için güvenli toplanma yerlerini belirler ve acil durumda hangi bilginin kimlere iletileceğini planlar.' },
          { title: '2. Bilim ve sağlık', text: 'Bir araştırma grubu su örneklerini inceler, sonuçları uzmanlarla doğrular ve anlaşılır bir bilgilendirme notu hazırlar.' },
          { title: '3. Kültür ve sanat', text: 'Öğrenciler, ailelerinden dinledikleri yerel yaşam öykülerini izin alarak kaydeder ve kaynak bilgisiyle küçük bir sergi oluşturur.' },
          { title: '4. Spor', text: 'Bir takım, antrenman görevlerini paylaşır; oyuncular ve antrenörler yeni katılanların da etkinliğe katılabileceği bir düzen kurar.' },
        ],
        questions: [
          question('compare-contributions', 'İki örnek seç. Her birinde kimlerin hangi katkıyı sunduğunu ve ortak yararı karşılaştır.', [textField('two-examples', 'Karşılaştırmam', 'İki örneği aynı ölçütlerle yaz…', 22)]),
          question('common-principle', 'Dört örneğin ortak yönünü en iyi açıklayan düşünce hangisidir?', [choiceField('common-principle-choice', 'Bir seçenek seç.', [
            { id: 'shared-work', label: 'Farklı amaçlar için de bilgi, görev paylaşımı ve ortak emek gerekebilir.' },
            { id: 'same-task', label: 'Her alandaki kişilerin aynı görevi yapması gerekir.' },
            { id: 'single-person', label: 'Toplumsal katkı her zaman yalnızca bir kişinin başarısıdır.' },
          ], 'shared-work', 'Farklı alanlarda yapılan işler değişse de iş birliği ve sorumluluk ortak olabilir.', 'Örneklerin farklı ihtiyaçlarını koruyup ortak katkıyı açıklayan seçeneği seç.')]),
        ],
      },
      {
        id: 'contribution-domain-sort',
        title: 'Katkı örneklerini toplumsal alana göre sınıflandır',
        sourceStyle: 'Sürükle-bırak · afet, bilim, kültür, spor eşleştirmesi',
        format: 'Kaynak incelemesine hazırlık · alanları ayırt etme',
        count: '8 katkı kartı · 4 alan',
        prompt: 'Her özgün katkı örneğini en çok ilişkili olduğu alana taşı. Bir katkının başka alanlara da yarar sağlayabileceğini göz önünde bulundur.',
        hint: 'Sınıflandırırken örnekte öne çıkan amaç ve etkinliğe bak; gerçek yaşamda farklı alanlar birbirini destekleyebilir.',
        fields: [
          sortField('contribution-domains', 'Örnekleri ilgili alana taşı', [
            { id: 'disaster', label: 'Afet hazırlığı ve yardım', icon: '🧭' },
            { id: 'science', label: 'Bilim ve sağlık', icon: '🔬' },
            { id: 'culture', label: 'Kültür ve sanat', icon: '🎨' },
            { id: 'sports', label: 'Spor', icon: '🏅' },
          ], [
            { id: 'safe-meeting', label: 'Güvenli toplanma noktası ve haberleşme planı oluşturmak' },
            { id: 'needs-record', label: 'Afet sonrası malzeme ihtiyacını kaydedip uygun desteği eşleştirmek' },
            { id: 'water-test', label: 'Su örneklerini ölçerek doğrulanmış bulguları paylaşmak' },
            { id: 'health-note', label: 'Uzmanların güvenilir korunma bilgisini anlaşılır biçimde hazırlaması' },
            { id: 'story-exhibit', label: 'Yerel yaşam öykülerini izinle kaydedip kaynaklı sergi hazırlamak' },
            { id: 'music-event', label: 'Farklı yaş gruplarının katılabildiği bir müzik etkinliği düzenlemek' },
            { id: 'team-roles', label: 'Antrenman ve takım görevlerini üyeler arasında paylaşmak' },
            { id: 'fair-play', label: 'Yeni katılanlar için güvenli ve adil spor etkinliği seçeneği sunmak' },
          ], {
            'safe-meeting': 'disaster', 'needs-record': 'disaster',
            'water-test': 'science', 'health-note': 'science',
            'story-exhibit': 'culture', 'music-event': 'culture',
            'team-roles': 'sports', 'fair-play': 'sports',
          }),
        ],
      },
      {
        id: 'solidarity-mini-report',
        title: 'Güvenilir kaynaktan dayanışma örneği için mini rapor yaz',
        sourceStyle: 'Araştırma · kaynak kaydı · kısa rapor',
        format: 'Ders kitabı veya öğretmen onaylı kaynakla çalışma',
        count: '1 kaynak · 4 rapor alanı',
        sourceLabel: 'Ders kitabı, EBA/MEBİ veya öğretmeninin onayladığı kaynak',
        sourceProviders: ['eba', 'mebi'],
        prompt: 'Toplumsal katkı veya dayanışmayla ilgili kitapta ya da öğretmeninin onayladığı kaynakta geçen bir örnek seç. Kaynağı kaydet; bilgiyi kendi cümlelerinle özetle ve katkının toplumsal önemini değerlendir.',
        hint: 'Güncel haber arıyorsan kaynağın tarihini ve kurumunu kontrol et. Kaynakta bulunmayan ayrıntıları ekleme; bilgiyi doğrudan kopyalamak yerine özetle.',
        questions: [
          question('report-source', 'Kaynağın adını, türünü ve tarihini veya sayfasını yaz.', [textField('source-record', 'Kaynak kaydım', 'Kurum/yazar, başlık, tarih veya sayfa…', 12)]),
          question('report-example', 'Örnekte hangi ortak ihtiyaç veya amaç ele alınıyor?', [textField('shared-need', 'İhtiyaç ve amaç', 'Kaynağın verdiği bilgiyle açıkla…', 14)]),
          question('report-contribution', 'Kimler hangi katkıyı sunuyor? Kaynaktan bir kanıt belirt.', [textField('contribution-evidence', 'Katkı ve kanıt', 'Kendi sözlerinle bir bilgi ve dayanağını yaz…', 16)]),
          question('report-reflection', 'Bu örnekte dayanışmanın topluma katkısı nedir?', [textField('social-benefit', 'Kısa değerlendirmem', 'Ortak yararı veya öğrenilen noktayı açıkla…', 16)]),
        ],
      },
    ],
    12: [
      {
        id: 'unit-concept-sort',
        title: 'Birlikte Yaşamak kavramlarını başlıklarına göre eşleştir',
        sourceStyle: 'Sürükle-bırak · üç konuyu kavramlarla eşleştirme',
        format: 'İletişim · fırsat eşitliği · millî konularda dayanışma',
        count: '9 kavram / örnek kartı · 3 konu başlığı',
        prompt: 'Kartları en çok ilişkili olduğu konu başlığına yerleştir. Konular arasında bağlantı kurulabilse de her kart için baskın ilişkiyi seç.',
        hint: 'İletişim, fırsat eşitliği ve dayanışmayı birbirine karıştırmadan tanı; sonra ortak yönlerini açıklayabilirsin.',
        fields: [
          sortField('unit-concepts', 'Kartları ilgili konu başlığına taşı', [
            { id: 'communication', label: 'İletişim ve farklılıklara saygı', icon: '💬' },
            { id: 'equality', label: 'Fırsat eşitliği ve erişilebilirlik', icon: '♿' },
            { id: 'solidarity', label: 'Millî meseleler ve dayanışma', icon: '🤝' },
          ], [
            { id: 'feedback', label: 'İletinin anlaşılıp anlaşılmadığını geri bildirimle kontrol etmek' },
            { id: 'i-language', label: 'Duygu ve isteği kişiyi suçlamadan ifade etmek' },
            { id: 'active-listening', label: 'Karşı tarafın sözünü kesmeden dinleyip açık soru sormak' },
            { id: 'accessible-route', label: 'Ortak etkinlik alanına ulaşmayı kolaylaştıran güvenli yol sağlamak' },
            { id: 'multiple-format', label: 'Duyuruyu anlaşılır ve birden fazla yolla paylaşmak' },
            { id: 'participation-choice', label: 'Etkinliğe katkı sunmak için farklı görev seçenekleri hazırlamak' },
            { id: 'shared-need', label: 'Toplumun ortak ihtiyacını belirleyip bilgiye dayalı katkı sunmak' },
            { id: 'source-evidence', label: 'Tarihî kaynaktaki kanıtı kendi yorumundan ayırmak' },
            { id: 'collective-work', label: 'Ortak amaç için görevleri ve kaynakları birlikte düzenlemek' },
          ], {
            feedback: 'communication', 'i-language': 'communication', 'active-listening': 'communication',
            'accessible-route': 'equality', 'multiple-format': 'equality', 'participation-choice': 'equality',
            'shared-need': 'solidarity', 'source-evidence': 'solidarity', 'collective-work': 'solidarity',
          }),
        ],
      },
      {
        id: 'unit-review-quiz',
        title: 'Öğrenme alanı tekrar sorularını çöz',
        sourceStyle: 'Çoktan seçmeli · çoklu seçim · anında geri bildirim',
        format: 'İletişim, fırsat eşitliği ve dayanışma tekrar turu',
        count: '3 seçimli soru · açıklamalı kontrol',
        prompt: 'Her soruda en uygun yanıtı ya da doğru seçeneklerin tümünü işaretle. “Seçimimi kontrol et” düğmesiyle geri bildirimi gör; gerekirse yeniden dene.',
        hint: 'Yanıtını konu anlatımına, ders kitabındaki kaynağa ve soruda verilen ipuçlarına göre değerlendir.',
        fields: [
          choiceField('empathy-review', 'Empati kurarken hangi yaklaşım uygundur?', [
            { id: 'open-question', label: 'Karşı tarafın ne düşündüğünü açık bir soruyla anlamaya çalışmak' },
            { id: 'assume-feeling', label: 'Onun adına ne hissettiğini kesin biçimde söylemek' },
            { id: 'agree-always', label: 'Empati kurmak için her görüşe katılmak' },
          ], 'open-question', 'Empati, karşı tarafın bakış açısını anlamaya çalışmaktır; açık soru tahmini kontrol etmeye yardım eder.', 'Kesin yargı kurmayan ve anlamaya çalışan seçeneği ara.'),
          multiChoiceField('access-review', 'Bir okul etkinliğinde eşit katılımı hangi uygulamalar destekler?', [
            { id: 'consult', label: 'Katılımcılara hangi düzenlemenin yararlı olacağını sormak' },
            { id: 'clear-info', label: 'Saat, yer ve yönergeyi anlaşılır biçimde önceden paylaşmak' },
            { id: 'different-roles', label: 'Katkı için birden fazla görev seçeneği sunmak' },
            { id: 'exclude', label: 'Katılması zor görünen kişileri etkinlikten çıkarmak' },
          ], ['consult', 'clear-info', 'different-roles'], 'Görüş almak, anlaşılır bilgi ve farklı katılım yolları fırsat eşitliğini destekler.', 'Katılımcının yerine karar vermeyen ve erişim olanağını artıranları seç.'),
          choiceField('source-review', 'Tarihî kaynak çalışmasında kanıt ile çıkarım nasıl ayrılır?', [
            { id: 'separate', label: 'Kaynağın doğrudan gösterdiğini kanıt; bundan vardığım sonucu çıkarım olarak yazarım.' },
            { id: 'combine', label: 'Kendi yorumumu kaynağın doğrudan söylediği bilgiyle aynı kabul ederim.' },
            { id: 'ignore', label: 'Kaynak türünü ve tarihini önemsemeden yalnızca tahmin yazarım.' },
          ], 'separate', 'Kaynakta gözlenen bilgi ile yorum ayrı yazıldığında çıkarım denetlenebilir olur.', 'Kaynağın kendisi ile kendi yorumunu ayıran yanıtı seç.'),
        ],
      },
      {
        id: 'unit-concept-map',
        title: 'Üç konu başlığı arasında açıklamalı bağlantı kur',
        sourceStyle: 'Kavram haritası · örnek · bağlantı cümlesi',
        format: 'Konu tekrarından günlük yaşama aktarım',
        count: '3 kavram · 1 ortak bağlantı · 1 örnek',
        prompt: 'Her konu başlığından bir kavram seç. Kavramları oklarla bağlarken “nasıl yardımcı olur?” veya “hangi durumda?” gibi kısa açıklamalar yaz.',
        hint: 'Üç başlığı tek bir sözcüğe indirgeme; önce ayrımlarını açıkla, sonra aralarındaki bağı göster.',
        questions: [
          question('concept-communication', 'İletişim ve farklılıklara saygıyla ilgili bir kavram ve günlük örnek yaz.', [textField('communication-example', 'Kavram ve örneğim', 'Kavram → davranış → etkisi…', 16)]),
          question('concept-equality', 'Fırsat eşitliği veya erişilebilirlikle ilgili bir kavram ve düzenleme örneği yaz.', [textField('equality-example', 'Kavram ve örneğim', 'İhtiyaç → düzenleme → katılım…', 16)]),
          question('concept-solidarity', 'Millî meselelerde dayanışmayla ilgili bir kavram ve katkı örneği yaz.', [textField('solidarity-example', 'Kavram ve örneğim', 'Ortak ihtiyaç → katkı → beklenen yarar…', 16)]),
          question('concept-connection', 'Bu konular arasındaki ortak beceriyi açıklayan bir bağlantı cümlesi kur.', [textField('shared-connection', 'Bağlantı cümlem', 'Örnek veya gerekçeyle ilişkilendir…', 18)]),
        ],
      },
      {
        id: 'unit-self-review',
        title: 'Öz değerlendirme yap ve sonraki adımını belirle',
        sourceStyle: 'Öz değerlendirme · kontrol listesi · öğrenme hedefi',
        format: 'Kendimi değerlendiriyorum · yeni bir hedef seçiyorum',
        count: '5 değerlendirme maddesi · 1 sonraki adım',
        prompt: 'Bu öğrenme alanındaki çalışmalarını düşün. Kontrol listesi, doğru-yanlış puanı değil; hangi becerileri kullandığını ve hangi konuda daha fazla örneğe ihtiyaç duyduğunu belirlemek içindir.',
        hint: 'Henüz yapamadığın bir adımı da dürüstçe belirt; öz değerlendirme sonraki çalışmanı planlamaya yardım eder.',
        fields: [
          checklistField('self-review-checks', 'Yaptığım çalışmaları işaretle', [
            { id: 'communication', label: 'Bir görüş ayrılığında dinleme ve saygılı ifade kullanabildim.' },
            { id: 'equality', label: 'Katılımı zorlaştıran çevresel bir engeli fark edebildim.' },
            { id: 'source', label: 'Kaynakta gördüğüm bilgi ile çıkarımımı ayırabildim.' },
            { id: 'evidence', label: 'Bir önerimi örnek veya gerekçeyle destekleyebildim.' },
            { id: 'reflection', label: 'Tekrar etmek istediğim bir konu belirleyebildim.' },
          ]),
          textField('next-learning-step', 'Sonraki çalışma adımım', 'Hangi konuya, kaynağa veya beceriye yeniden döneceksin?', 14),
        ],
      },
    ],
    13: [
      {
        id: 'global-word-cloud',
        title: 'Günlük yaşamdan küreselleşme kelime bulutu oluştur',
        sourceStyle: 'Kelime bulutu · görsel/örnekten kavram çıkarma',
        format: 'Beyin fırtınası · günlük yaşam bağlantısı',
        count: 'En az 3 anahtar sözcük · 1 açıklayıcı örnek',
        prompt: 'Ulaşım, iletişim, ticaret veya kültürden günlük yaşamında gördüğün bağlantıları düşün. Sözcük bulutunu kendi örneğinle açıkla.',
        hint: 'Bir sözcüğü yalnızca yazmakla kalma; farklı yerlerdeki insanların nasıl etkileştiğini örneğinle göster.',
        fields: [
          wordField('global-terms', 'Küreselleşmeyi anlatan anahtar sözcükler', 'Örn. iletişim, paylaşım, ulaşım…'),
          textField('daily-connection', 'Günlük yaşamımdan bağlantı örneği', 'Hangi kişiler veya yerler bu örnekte birbirine bağlanıyor?', 12),
        ],
      },
      {
        id: 'globalization-definition',
        title: 'Kendi tanımını örnek ve sözlük açıklamasıyla karşılaştır',
        sourceStyle: 'Görsel/örnek inceleme · tanım · karşılaştırma',
        format: 'Kavram çalışması · benzerlik ve fark',
        count: '3 kısa açık uçlu soru',
        prompt: 'Bir görsel veya günlük yaşam örneğinden hareketle önce kendi tanımını oluştur; ardından sözlükteki açıklamayla ortak ve farklı yönlerini karşılaştır.',
        hint: 'Tanımı yalnızca internet veya telefon kullanımına indirgeme; ülkeler ve toplumlar arasındaki farklı bağlantıları düşün.',
        questions: [
          question('global-example', 'Ulaşım, iletişim, ürün veya kültürle ilgili bir örnek seç. Örnekte hangi uzak bağlantı kuruluyor?', [
            textField('selected-example', 'Seçtiğim örnek ve bağlantı', 'Örneğin hangi kişi, yer veya toplulukları ilişkilendirdiğini yaz…', 14),
          ]),
          question('own-globalization-definition', 'Küreselleşmeyi kendi sözlerinle nasıl tanımlarsın?', [
            textField('own-definition', 'Kendi tanımım', 'Farklı yerlerdeki insanlar/toplumlar arasında hangi bağlar artıyor?', 18),
          ]),
          question('dictionary-comparison', 'Kendi tanımın ile sözlük açıklamasını hangi yönden benzer, hangi yönden farklı buldun?', [
            textField('definition-comparison', 'Benzerlik ve fark', 'İki tanımı aynı ölçüte göre karşılaştır…', 18),
          ]),
        ],
      },
      {
        id: 'global-connection-sort',
        title: 'Küresel bağlantı örneklerini başlıklarına göre sınıflandır',
        sourceStyle: 'Sürükle-bırak · iletişim, ticaret ve kültür bağlantıları',
        format: 'Görsel/örnek sınıflandırma · kavram eşleştirme',
        count: '6 örnek kartı · 3 bağlantı başlığı',
        prompt: 'Her örneği en baskın bağlantı türüne yerleştir. Bir örneğin birden fazla yönü olabileceğini, burada ise en belirgin yönü seçtiğini unutma.',
        hint: 'İnsanlar arası iletişimi; ürünlerin üretim ve dolaşımından; kültür ve bilginin paylaşılmasından ayır.',
        fields: [
          sortField('global-links', 'Örnekleri en uygun bağlantı türüne taşı', [
            { id: 'communication', label: 'İletişim ve ulaşım', icon: '🌐' },
            { id: 'trade', label: 'Üretim ve ticaret', icon: '📦' },
            { id: 'culture', label: 'Kültür ve bilgi paylaşımı', icon: '🎭' },
          ], [
            { id: 'video-call', label: 'Farklı ülkelerdeki iki kişinin görüntülü görüşmesi' },
            { id: 'online-report', label: 'Başka bir ülkede yayımlanan habere çevrim içi erişme' },
            { id: 'product-label', label: 'Bir ürünün etiketindeki üretim yeri bilgisini inceleme' },
            { id: 'parts-route', label: 'Bir eşyanın parçalarının farklı yerlerde üretilmesi' },
            { id: 'music-share', label: 'Farklı ülkelerden müziklerin dinleyicilerle paylaşılması' },
            { id: 'recipe-share', label: 'Başka bir toplumun yemek tarifinin öğrenilip paylaşılması' },
          ], {
            'video-call': 'communication', 'online-report': 'communication',
            'product-label': 'trade', 'parts-route': 'trade',
            'music-share': 'culture', 'recipe-share': 'culture',
          }),
          textField('connection-reflection', 'Sınıflandırmamdan çıkardığım sonuç', 'Bu bağlantı türlerinden ikisi günlük yaşamda nasıl kesişebilir?', 14),
        ],
      },
    ],
    14: [
      {
        id: 'global-impact-cases',
        title: 'Küresel bağlantıların farklı kişiler üzerindeki etkilerini incele',
        sourceStyle: 'Örnek olay inceleme · çok yönlü etki analizi',
        format: 'Beyin fırtınası · farklı bakış açıları',
        count: '3 özgün durum · 3 değerlendirme sorusu',
        prompt: 'Her örnekte olası katkıların ve güçlüklerin kimler için ortaya çıkabileceğini düşün. Aynı bağlantının herkesi aynı biçimde etkilemesi gerekmez.',
        hint: 'Bir kişi veya grubu “herkes” diye genelleme; yarar ve güçlüğü örnekteki koşullarla açıkla.',
        caseStudies: [
          { title: 'Uzaktaki sınıflarla buluşma', text: 'Bir sınıf, başka bir ülkedeki yaşıtlarıyla çevrim içi ortak bir sunum hazırlıyor. Öğrenciler farklı kaynaklara erişiyor; ancak bağlantı hızı ve ekran süresi herkes için aynı olmayabiliyor.' },
          { title: 'Farklı yerlerde üretilen bir ürün', text: 'Bir eşyanın parçaları birden fazla yerde hazırlanıp başka bir yerde birleştiriliyor. Ürün daha geniş bir pazara ulaşıyor; üretimde yaşanabilecek bir aksama teslimi de etkileyebiliyor.' },
          { title: 'Çevrim içi satış ve mahalle dükkânı', text: 'Bir küçük işletme çevrim içi satışla yeni müşterilere ulaşmaya çalışıyor. Aynı alanda büyük satıcılarla rekabet etmesi ve teslimat koşullarını düzenlemesi gerekebiliyor.' },
        ],
        questions: [
          question('impact-beneficiaries', 'Seçtiğin durumda hangi kişi veya gruplar bir katkıdan yararlanabilir? Neden?', [
            textField('beneficiaries', 'Yararlanabilecekler ve gerekçem', 'Örnekteki belirli bir kişiyi/grubu ve katkıyı belirt…', 16),
          ]),
          question('impact-challenges', 'Aynı durumda hangi güçlükler ortaya çıkabilir ve kimleri etkileyebilir?', [
            textField('affected-groups', 'Güçlük ve etkilenenler', 'Bir koşulu ve bundan etkilenebilecek grubu açıkla…', 16),
          ]),
          question('impact-balance', 'Yarar ve güçlüğü birlikte düşününce daha dengeli bir değerlendirme nasıl yapılabilir?', [
            textField('balanced-view', 'Dengeli değerlendirmem', 'İki yönü de örnekteki kanıta bağla…', 18),
          ]),
        ],
      },
      {
        id: 'global-impact-sort',
        title: 'Etki kartlarını katkı, güçlük ve koşula göre grupla',
        sourceStyle: 'Sürükle-bırak · olumlu/olumsuz ve değişebilen etkiler',
        format: 'Etkilenen grupları ayırt etme · sınıflandırma',
        count: '6 etki kartı · 3 değerlendirme başlığı',
        prompt: 'Kartlarda açıklanan etkiyi en uygun başlığa yerleştir. “Koşula göre değişir” başlığında farklı grupların farklı sonuçlar yaşayabileceğini düşün.',
        hint: 'Bir bağlantı herkese aynı yararı sağlamayabilir; kartta açıkça anlatılan sonucu esas al.',
        fields: [
          sortField('impact-cards', 'Etki kartlarını uygun başlığa taşı', [
            { id: 'benefit', label: 'Katkı sağlayabilir', icon: '＋' },
            { id: 'challenge', label: 'Güçlük oluşturabilir', icon: '!' },
            { id: 'depends', label: 'Koşula göre değişebilir', icon: '↔' },
          ], [
            { id: 'distant-contact', label: 'Uzakta yaşayan aile üyeleri görüntülü görüşmeyle haberleşebiliyor.' },
            { id: 'online-learning', label: 'Öğrenci, farklı yerlerde hazırlanmış öğrenme içeriğine ulaşabiliyor.' },
            { id: 'false-news', label: 'Doğrulanmamış bir paylaşım kısa sürede çok sayıda kişiye ulaşabiliyor.' },
            { id: 'supply-delay', label: 'Üretimdeki bir aksama, farklı ülkelerdeki ürün teslimlerini geciktirebiliyor.' },
            { id: 'small-business', label: 'Küçük işletme yeni müşterilere ulaşırken daha geniş rekabetle karşılaşıyor.' },
            { id: 'cultural-content', label: 'Küresel içerikler yeni kültürleri tanıtırken yerel üretimin görünürlüğünü de etkileyebiliyor.' },
          ], {
            'distant-contact': 'benefit', 'online-learning': 'benefit', 'false-news': 'challenge',
            'supply-delay': 'challenge', 'small-business': 'depends', 'cultural-content': 'depends',
          }),
        ],
      },
      {
        id: 'impact-balance-table',
        title: 'Bir bağlantının etkilerini karşılaştırma tablosuna aktar',
        sourceStyle: 'Etki tablosu · yarar, güçlük ve bilinçli adım',
        format: 'Karşılaştırma · öneri geliştirme',
        count: '4 yanıt alanı',
        prompt: 'Kendi seçtiğin bir küresel bağlantıyı örnek al; farklı kişiler üzerindeki etkisini ve olumsuz yönleri azaltabilecek bir davranışı tablo mantığıyla açıkla.',
        hint: 'Örnek, etkilenen kişi/grup ve önerin arasında açık bir bağ kur.',
        fields: [
          textField('chosen-connection', 'İncelediğim bağlantı ve örnek', 'Bir ürün, haber, iletişim veya kültür örneği…', 12),
          textField('positive-impact', 'Olası katkı ve yararlananlar', 'Kim, bu bağlantıdan nasıl yararlanıyor?', 14),
          textField('negative-impact', 'Olası güçlük ve etkilenenler', 'Kime, hangi koşulda güçlük oluşturabilir?', 14),
          textField('responsible-action', 'Daha bilinçli bir davranış', 'Güçlüğü azaltmak için uygulanabilir bir adım…', 14),
        ],
      },
    ],
    15: [
      {
        id: 'trace-global-connection',
        title: 'Bir ürünün veya dijital içeriğin bağlantı yolunu izle',
        sourceStyle: 'Kaynak inceleme · bilgi/ürün/kültür bağlantısını izleme',
        format: 'Güvenilir kaynak · doğrulanmış bilgi ve çıkarım',
        count: '3 kaynak odaklı soru',
        prompt: 'Günlük kullandığın bir ürünü veya eriştiğin bir içeriği seç. Etiket, kurum sayfası, ders kitabı ya da öğretmenin onayladığı başka bir kaynakta gerçekten gördüğün bilgiyi kendi tahmininden ayır.',
        hint: 'Kaynakta bulunmayan üretim yeri, kişi veya kurum ayrıntılarını uydurma; kaynağın adını not et.',
        questions: [
          question('trace-source', 'İncelediğin ürün/içerik nedir ve hangi kaynağı kullandın?', [
            textField('item-and-source', 'Örnek ve kaynak kaydım', 'Ürün/içerik, kaynak adı ve bulduğun bilgi…', 14),
          ]),
          question('trace-evidence', 'Kaynak hangi farklı yerler veya topluluklar arasında bağlantı gösteriyor?', [
            textField('verified-route', 'Doğrulanmış bağlantı', 'Yalnızca kaynakta gördüğün yer/kişi/üretim/paylaşım bilgisini yaz…', 14),
          ]),
          question('trace-impact', 'Bu bağlantının katkısı ve dikkat edilmesi gereken yönü ne olabilir?', [
            textField('trace-effect', 'Etki ve sorumluluk', 'Üretici, tüketici, çevre veya içerik sahibi açısından değerlendir…', 16),
          ]),
        ],
      },
      {
        id: 'source-claim-sort',
        title: 'Bilgi iddialarını kaynak kanıtına göre sınıflandır',
        sourceStyle: 'Sürükle-bırak · kaynak/iddia ayrımı',
        format: 'Kaynak değerlendirme · doğrulama alışkanlığı',
        count: '6 bilgi kartı · 2 kaynak başlığı',
        prompt: 'Kartları verilen bilgiye göre ayır: kaynakta görülen dayanak mı var, yoksa iddia için ek doğrulama mı gerekiyor?',
        hint: 'Bir reklam cümlesi veya çok paylaşılmış ileti tek başına kanıt sayılmaz; tarih, kurum ve doğrudan bilgi aramayı unutma.',
        fields: [
          sortField('source-claims', 'Kartları kanıt durumuna göre yerleştir', [
            { id: 'evidence', label: 'Kaynakta dayanak gösteriliyor', icon: '✓' },
            { id: 'verify', label: 'Ek doğrulama gerekiyor', icon: '?' },
          ], [
            { id: 'book-date', label: 'Ders kitabında başlık, yazar/kurum ve basım yılı birlikte verilmiş.' },
            { id: 'product-label', label: 'Ürünün kendi etiketinde üretim yeri bilgisi açıkça yazıyor.' },
            { id: 'report-source', label: 'Kurum raporu, iddiasını dayandığı veri ve tarih ile gösteriyor.' },
            { id: 'viral-number', label: 'Kaynağı belirtilmeyen bir paylaşım kesin bir sayı öne sürüyor.' },
            { id: 'ad-superlative', label: 'Reklam bir ürünü kanıt göstermeden “her açıdan en iyi” diye tanıtıyor.' },
            { id: 'anonymous-message', label: 'Kim tarafından yazıldığı belli olmayan ileti, bir ülke hakkında genelleme yapıyor.' },
          ], {
            'book-date': 'evidence', 'product-label': 'evidence', 'report-source': 'evidence',
            'viral-number': 'verify', 'ad-superlative': 'verify', 'anonymous-message': 'verify',
          }),
        ],
      },
      {
        id: 'responsible-global-choice',
        title: 'Daha bilinçli bir seçim için kontrol listesi kullan',
        sourceStyle: 'Örnek olay · sorumlu tercih · kontrol listesi',
        format: 'Karar verme · kaynak ve etki değerlendirme',
        count: '3 kontrol maddesi · 2 açık yanıt',
        prompt: 'Bir ürün alma veya dijital içeriği paylaşma kararı öncesi kaynağı, olası etkileri ve sorumlulukları birlikte düşün.',
        hint: 'Bir kararın yalnızca sana sağladığı kolaylığı değil, başka kişileri ve çevreyi nasıl etkileyebileceğini de sorgula.',
        scenario: 'Bir arkadaşın, üretim yeri veya içerik kaynağı hakkında bilgi vermeyen bir paylaşımı “kesin doğru” diyerek gruba gönderiyor. Sen bu bilgiye dayanarak bir ürün seçmeyi ya da içeriği başkalarına aktarmayı düşünüyorsun.',
        fields: [
          checklistField('responsible-checks', 'Karar vermeden önce tamamladığım kontroller', [
            { id: 'source', label: 'Bilgiyi güvenilir ve tarihi belli bir kaynakta ararım.' },
            { id: 'impact', label: 'Tercihin kimleri ve hangi alanları etkileyebileceğini düşünürüm.' },
            { id: 'share', label: 'Doğrulamadan kesin bilgi diye yaymam; kişisel bilgileri korurum.' },
          ]),
          textField('decision', 'Bu durumda atacağım ilk adım', 'Bilgiyi nasıl doğrular veya kararımı nasıl gözden geçiririm?', 14),
          textField('decision-reason', 'Gerekçem ve sorumluluk bağlantısı', 'Bu adım neden daha bilinçli bir tercih olur?', 16),
        ],
      },
    ],
    16: [
      {
        id: 'problem-scale-sort',
        title: 'Sorunları etki alanlarına göre sınıflandır',
        sourceStyle: 'Sürükle-bırak · bölgesel/küresel etki ölçeği',
        format: 'Etki alanı · etkilenen topluluklar',
        count: '6 sorun kartı · 2 ölçek',
        prompt: 'Bir sorunun nerede başladığından çok kimleri ve hangi alanları etkilediğine bakarak kartı bölgesel veya küresel gruba yerleştir.',
        hint: 'Bölgesel sorun çevre/komşu bölgelerle sınırlı olabilir; küresel sorunun etkisi çok sayıda ülke ve topluluğa yayılır.',
        fields: [
          sortField('problem-scales', 'Sorun kartlarını etki ölçeğine göre taşı', [
            { id: 'regional', label: 'Bölgesel ölçekte etkiler', icon: '📍' },
            { id: 'global', label: 'Küresel ölçekte etkiler', icon: '🌍' },
          ], [
            { id: 'river-basin', label: 'Bir akarsudaki kirlilik, aynı havzadaki birkaç ili etkiliyor.' },
            { id: 'nearby-smoke', label: 'Bir orman yangınının dumanı aynı bölgedeki yakın yerleşimlere ulaşıyor.' },
            { id: 'shared-water', label: 'Komşu ülkelerin ortak su havzasında kuraklık yaşanıyor.' },
            { id: 'world-climate', label: 'İklim değişikliğinin etkileri farklı kıta ve ülkelerde görülüyor.' },
            { id: 'ocean-plastic', label: 'Denizlerdeki plastik atıklar akıntılarla farklı ülke kıyılarına taşınıyor.' },
            { id: 'global-outbreak', label: 'Bir bulaşıcı hastalık salgını birden fazla kıtadaki toplumları etkiliyor.' },
          ], {
            'river-basin': 'regional', 'nearby-smoke': 'regional', 'shared-water': 'regional',
            'world-climate': 'global', 'ocean-plastic': 'global', 'global-outbreak': 'global',
          }),
        ],
      },
      {
        id: 'compare-problem-scales',
        title: 'Bölgesel ve küresel bir sorunu aynı ölçütlerle karşılaştır',
        sourceStyle: 'Sınıflandırma tablosu · etki alanı ve iş birliği',
        format: 'Örnek seçme · etkilenenler · ortak çözüm',
        count: '3 karşılaştırma sorusu',
        prompt: 'Bir bölgesel ve bir küresel sorun örneğini seç. Etkilenen toplulukları ve çözüm için gereken ortaklıkları aynı ölçütlerle incele.',
        hint: 'Sorunları yalnızca adlarıyla değil, etki alanı ve çözüm için gereken iş birliğiyle karşılaştır.',
        questions: [
          question('regional-problem', 'Bir bölgesel sorun örneği ver. Etki alanını ve etkilenen toplulukları belirt.', [
            textField('regional-example', 'Bölgesel örnek ve etkilenenler', 'Yakın çevre/komşu bölgeler ölçeğinde bir örnek…', 16),
          ]),
          question('global-problem', 'Bir küresel sorun örneği ver. Neden birden fazla ülkeyi etkiliyor?', [
            textField('global-example', 'Küresel örnek ve kapsamı', 'Etki alanının birçok ülke/topluluğa yayıldığını açıkla…', 16),
          ]),
          question('compare-cooperation', 'Bu iki sorun için çözüm ortakları veya iş birliği neden farklılaşabilir?', [
            textField('scale-cooperation', 'İş birliği karşılaştırmam', 'Sorunun etki alanı, ortakları nasıl etkiler?', 18),
          ]),
        ],
      },
      {
        id: 'problem-impact-map',
        title: 'Sorun ve etkilenenler için açıklamalı etki haritası kur',
        sourceStyle: 'Etki haritası · neden, kapsam ve paydaş',
        format: 'Kavram haritası · kanıta dayalı çıkarım',
        count: '4 bağlantılı alan',
        prompt: 'Seçtiğin bir sorun için başlangıç/neden, etki alanı, etkilenenler ve çözümde rol alabilecek ortaklar arasındaki bağı yaz.',
        hint: 'Okların yerine kısa açıklama ekle: kim, hangi etkene bağlı olarak, nasıl etkileniyor?',
        fields: [
          textField('map-problem', 'Sorun ve dayanağım', 'Kaynakta veya örnekte açıkça verilen bilgi…', 14),
          textField('map-scope', 'Etki alanı', 'Hangi yerleri/toplulukları etkiliyor?', 12),
          textField('map-affected', 'Etkilenen kişiler veya çevre', 'Doğrudan ve dolaylı etkilenenleri ayır…', 12),
          textField('map-partners', 'İş birliği yapabilecek taraflar', 'Sorunun kapsamına uygun ortaklar…', 14),
        ],
      },
    ],
    17: [
      {
        id: 'stakeholder-sort',
        title: 'Sorunlara katkı sunabilecek paydaşları görevlerine göre eşleştir',
        sourceStyle: 'Sürükle-bırak · birey, kurum ve ülkelerin rolleri',
        format: 'Paydaş sınıflandırma · sorumluluk ölçekleri',
        count: '8 katkı kartı · 3 paydaş grubu',
        prompt: 'Her katkıyı en uygun sorumluluk ölçeğine yerleştir. Bir sorun için farklı grupların birlikte çalışabileceğini unutma.',
        hint: 'Bireylerin günlük davranışını yerel kurumların hizmetinden, ülkeler arası iş birliğinden ayır.',
        fields: [
          sortField('stakeholder-roles', 'Katkı kartlarını paydaş grubuna taşı', [
            { id: 'individual', label: 'Bireyler ve topluluklar', icon: '👥' },
            { id: 'institutions', label: 'Yerel kurumlar ve kuruluşlar', icon: '🏫' },
            { id: 'countries', label: 'Ülkeler ve uluslararası iş birliği', icon: '🤝' },
          ], [
            { id: 'home-water', label: 'Evde su kullanımını azaltıp tasarruf alışkanlığını paylaşmak' },
            { id: 'verified-info', label: 'Bir bilgiyi doğruladıktan sonra çevresine duyurmak' },
            { id: 'municipal-service', label: 'Belediyenin atık toplama ve geri dönüşüm hizmeti düzenlemesi' },
            { id: 'school-awareness', label: 'Okulun yerel çevre sorunları için bilgilendirme çalışması yapması' },
            { id: 'local-support', label: 'Yerel kuruluşların ihtiyaç sahiplerine destek noktası oluşturması' },
            { id: 'shared-water-agreement', label: 'Ülkelerin ortak su kaynakları için görüşüp bilgi paylaşması' },
            { id: 'international-coordination', label: 'Ülkelerin afet hazırlığı ve müdahale bilgisini birlikte geliştirmesi' },
            { id: 'joint-research', label: 'Farklı ülkelerdeki uzmanların ortak araştırma yürütmesi' },
          ], {
            'home-water': 'individual', 'verified-info': 'individual',
            'municipal-service': 'institutions', 'school-awareness': 'institutions', 'local-support': 'institutions',
            'shared-water-agreement': 'countries', 'international-coordination': 'countries', 'joint-research': 'countries',
          }),
          textField('stakeholder-reason', 'Bir paydaş seçimini gerekçelendir', 'Bu katkı neden o grubun sorumluluk ölçeğine uygun?', 14),
        ],
      },
      {
        id: 'shared-action-map',
        title: 'Sorundan ortak eyleme açıklamalı kavram haritası oluştur',
        sourceStyle: 'Kavram haritası · sorun, paydaş, eylem ve sonuç',
        format: 'Çözüm haritası · bireysel ve ortak katkı',
        count: '3 bağlantılı soru',
        prompt: 'Bir bölgesel veya küresel sorun seçip etkilenenler, çözüm ortakları, ortak eylem ve beklenen sonuç arasında bağ kur.',
        hint: 'Her adımda sorumlu kişi/kurumu ve başarının anlaşılacağı bir işareti belirt.',
        questions: [
          question('map-problem-and-affected', 'Sorun nedir ve kimleri nasıl etkiliyor?', [
            textField('problem-and-affected', 'Sorun ve etkilenenler', 'Bir kaynak veya örnekten yararlan…', 16),
          ]),
          question('map-partners-and-roles', 'Kimler birlikte çalışabilir? Her paydaşın katkısı ne olur?', [
            textField('partners-and-roles', 'Paydaşlar ve görevleri', 'Birey, kurum ve/veya ülke rollerini ayır…', 16),
          ]),
          question('map-action-and-result', 'Ortak eylem ve beklenen sonucu nasıl gözlemlersin?', [
            textField('action-and-indicator', 'Eylem ve başarı işareti', 'Uygulanabilir adım ve ölçülebilir belirti…', 18),
          ]),
        ],
      },
      {
        id: 'solution-plan-review',
        title: 'Ortak çözüm planını ve sorumlulukları gözden geçir',
        sourceStyle: 'Çözüm planı · görev paylaşımı · kontrol listesi',
        format: 'Uygulanabilir öneri · öz değerlendirme',
        count: '4 planlama kontrolü · 1 öneri',
        prompt: 'Seçtiğin sorun için küçük ve uygulanabilir bir ilk adım belirle. Önerini paydaş, kaynak, güvenilir bilgi ve beklenen sonuç bakımından denetle.',
        hint: 'Çözümün etkisini yalnızca dilek olarak bırakma; kimin hangi ilk adımı ne zaman atacağını düşün.',
        scenario: 'Bir mahalledeki su kaynağıyla ilgili farklı ve doğrulanmamış paylaşımlar dolaşıyor. Öğrenci grubu sorunu büyütmeden güvenilir bilgiye ulaşmak ve uygun kuruma iletmek istiyor.',
        fields: [
          textField('first-solution-step', 'İlk ortak adımımız', 'Bilgi toplama, ilgili kuruma danışma veya güvenli bir farkındalık çalışması…', 14),
          checklistField('solution-plan-checks', 'Planımı gözden geçir', [
            { id: 'reliable', label: 'Bilgiyi güvenilir bir kaynak veya yetkili kurumla denetliyorum.' },
            { id: 'roles', label: 'Katkı sunacak kişilerin/kurumların görevini belirtiyorum.' },
            { id: 'feasible', label: 'Önerdiğim adım güvenli ve uygulanabilir.' },
            { id: 'indicator', label: 'İlerlemenin nasıl fark edileceğini yazıyorum.' },
          ]),
          textField('plan-indicator', 'Beklenen değişim / ilerleme işareti', 'Hangi gözlenebilir bilgi, planın işe yarayıp yaramadığını gösterir?', 14),
        ],
      },
    ],
    18: [
      {
        id: 'neighbor-map-source',
        title: 'Harita ve güvenilir kaynaktan komşularla iş birliğini araştır',
        sourceStyle: 'Harita inceleme · kaynak kaydı · kültürel iş birliği',
        format: 'Sınır komşuları · kültür ve ortak çalışma örnekleri',
        count: '3 kaynaklı yanıt',
        prompt: 'Ders kitabındaki haritayı veya öğretmeninin onayladığı bir kaynağı kullan. Bir komşu ülke ve Türkiye ile yürütülen kültürel/insani/teknik iş birliği örneği bul; kaynağın göstermediği ayrıntıları ekleme.',
        hint: 'Örneğin kaynağını ve hangi ihtiyaca karşılık geldiğini yaz; haritadaki konum bilgisiyle iş birliği örneğini birbirine karıştırma.',
        sourceProviders: ['eba', 'mebi'],
        questions: [
          question('neighbor-map-observation', 'Haritada seçtiğin komşu ülkeyi ve haritadan gözlediğin konum bilgisini yaz.', [
            textField('neighbor-and-map', 'Komşu ülke ve harita gözlemim', 'Ders kitabı/öğretmen kaynağındaki haritadan hareket et…', 12),
          ]),
          question('neighbor-cooperation-source', 'Kaynakta hangi kültürel, insani veya teknik iş birliği örneği veriliyor?', [
            textField('cooperation-and-source', 'İş birliği örneği ve kaynak', 'Kurum/yazar, kaynak adı ve örnekte görülen bilgi…', 16),
          ]),
          question('neighbor-cooperation-meaning', 'Bu çalışma hangi ihtiyaca cevap verebilir ve beklenen ortak yarar nedir?', [
            textField('cooperation-need', 'İhtiyaç ve ortak yarar', 'Kaynağa dayanarak amacını kendi sözlerinle açıkla…', 18),
          ]),
        ],
      },
      {
        id: 'turkey-role-sort',
        title: 'Katkı örneklerini iş birliği türlerine göre sınıflandır',
        sourceStyle: 'Sürükle-bırak · diplomasi, yardım ve ortak çalışma',
        format: 'Türkiye’nin rolü · amaç ve eylem türü',
        count: '8 örnek kartı · 4 iş birliği türü',
        prompt: 'Her genel katkı örneğini en baskın çalışma türüne yerleştir. Kartlar örnek durumdur; gerçek bir olay iddiası içermez.',
        hint: 'Kartın amacına bak: görüşme/müzakere, acil ihtiyaç desteği, kültürel paylaşım veya uzmanlık-bilgi alışverişi.',
        fields: [
          sortField('turkey-roles', 'Katkı örneklerini iş birliği türüne taşı', [
            { id: 'diplomacy', label: 'Diplomasi ve görüşme', icon: '🕊' },
            { id: 'humanitarian', label: 'İnsani yardım', icon: '🧰' },
            { id: 'cultural', label: 'Kültürel iş birliği', icon: '🎨' },
            { id: 'technical', label: 'Teknik/bilimsel ortak çalışma', icon: '🔬' },
          ], [
            { id: 'dialogue', label: 'Ülke temsilcilerinin ortak bir sorun için görüşüp uzlaşma araması' },
            { id: 'relief', label: 'Afetten etkilenenlere barınma ve temel ihtiyaç desteği ulaştırılması' },
            { id: 'rescue-team', label: 'Afet bölgesinde arama-kurtarma ekiplerinin görev paylaşması' },
            { id: 'festival', label: 'Farklı toplumların sanatçılarını buluşturan ortak kültür etkinliği düzenlenmesi' },
            { id: 'language', label: 'Öğrenciler için karşılıklı dil ve kültür tanıtım programı hazırlanması' },
            { id: 'water-data', label: 'Uzmanların ortak su havzası ölçümlerini paylaşması' },
            { id: 'health-research', label: 'Araştırmacıların sağlık verilerini etik kurallarla birlikte incelemesi' },
            { id: 'agreement', label: 'Ülkelerin ortak bir konuda resmi görüşme ve anlaşma yürütmesi' },
          ], {
            dialogue: 'diplomacy', relief: 'humanitarian', 'rescue-team': 'humanitarian',
            festival: 'cultural', language: 'cultural', 'water-data': 'technical',
            'health-research': 'technical', agreement: 'diplomacy',
          }),
        ],
      },
      {
        id: 'turkey-contribution-report',
        title: 'Türkiye’nin katkısını kaynağa dayalı kısa raporla değerlendir',
        sourceStyle: 'Kaynak inceleme · Türkiye’nin rolü · amaç ve sonuç',
        format: 'Kısa rapor · kaynak, ihtiyaç, katkı ve beklenen sonuç',
        count: '4 rapor alanı',
        prompt: 'Ders kitabı veya öğretmenin onayladığı güvenilir kaynakta geçen bir örneği seç. İhtiyacı, Türkiye’nin katkısını, iş birliği taraflarını ve beklenen sonucu kendi cümlelerinle kaydet.',
        hint: 'Örneğin gerçekleştiğini ve ayrıntılarını kaynaktan doğrula; katkıyı tek başına gerçekleşmiş gibi göstermeden diğer ortakları da belirt.',
        sourceProviders: ['eba', 'mebi'],
        questions: [
          question('report-source', 'Kaynağın adını ve örneğin ele aldığı ihtiyacı yaz.', [
            textField('report-source-and-need', 'Kaynak ve ihtiyaç', 'Kurum/yazar, tarih/sayfa ve ele alınan sorun…', 16),
          ]),
          question('report-contribution', 'Kaynakta Türkiye’nin hangi katkısı ve hangi ortakların rolü açıklanıyor?', [
            textField('report-roles', 'Katkı ve iş birliği tarafları', 'Yardım, diplomasi, kültür veya ortak çalışma…', 16),
          ]),
          question('report-outcome', 'Bu katkı hangi ortak yarara veya beklenen sonuca hizmet edebilir?', [
            textField('report-outcome', 'Beklenen sonuç ve gerekçem', 'Kaynakta verilen bilgi ile kendi çıkarımını ayır…', 18),
          ]),
        ],
      },
    ],
  };

  const checks = {
    1: [
      check('Bir grupta birlikte yaşamayı en çok hangi davranış destekler?', ['Farklı görüşü dinleyip görev paylaşmak', 'Görevi yalnızca başkasına bırakmak', 'Kararları hiç konuşmadan almak'], 0, 'Saygılı dinleme ve ortak sorumluluk grup yaşamını güçlendirir.', 'Grubun üyelerinin birlikte yapabildiği davranışı düşün.'),
      check('Üstlendiğin sorumluluğu yerine getirmek neyi gösterir?', ['Gruba karşı sorumluluk aldığını', 'Başkalarının fikrine katılmak zorunda olduğunu', 'Her işi tek başına yapmak gerektiğini'], 0, 'Sorumluluk, üstlendiğin görevi takip edip tamamlamaktır.', 'Sorumluluk ile herkesin aynı düşünmesi aynı şey değildir.')
    ],
    2: [
      check('Aktif dinlediğini göstermek için ne yapabilirsin?', ['Sözünü kesip kendi örneğini anlatmak', 'Duyduğunu kısaca özetleyip doğru anlayıp anlamadığını sormak', 'Konuşurken başka işle ilgilenmek'], 1, 'Özetleyip doğrulamak, karşı tarafı anlamaya çalıştığını gösterir.', 'Yanıt vermeden önce duyduğunu kontrol et.'),
      check('Bir arkadaşının ne düşündüğünü anlamaya en çok hangi soru yardım eder?', ['“Neden hep böyle yapıyorsun?”', '“Sence bu durumda ne önemli?”', '“Benim dediğimi kabul ediyor musun?”'], 1, 'Açık soru, karşı tarafın düşüncesini anlatmasına alan tanır.', 'Evet-hayır yanıtı gerektirmeyen ve yargılamayan soruyu seç.')
    ],
    3: [
      check('Ben diliyle kurulan cümlenin özelliği nedir?', ['Kişiyi suçlamadan duygu ve ihtiyacı anlatması', 'Karşı tarafın kişiliğine etiket koyması', 'Anlaşmazlığı büyütmek için emir vermesi'], 0, 'Ben dili durumu ve kendi duygunu anlatır; kişiyi yargılamaz.', 'Cümlenin kişiyi mi, yaşanan durumu ve duygunu mu anlattığına bak.'),
      check('Empati kurmak ne demektir?', ['Her konuda aynı fikirde olmak', 'Başka birinin bakış açısını anlamaya çalışmak', 'Birinin yerine karar vermek'], 1, 'Empati, aynı fikirde olmayı gerektirmeden başkasının bakışını anlamaya çalışmaktır.', 'Empatide anlamaya çalışma ile onaylamayı ayır.')
    ],
    4: [
      check('Bir anlaşmazlığı çözmeye başlarken önce ne yapmak uygundur?', ['Tarafların ihtiyaç ve görüşlerini dinlemek', 'Bir kişiyi suçlu ilan etmek', 'İlk öneriyi tartışmadan kabul etmek'], 0, 'Tarafları dinlemek sorunun ve ihtiyaçların anlaşılmasını sağlar.', 'Çözüm öncesi sorunu ve tarafları anlamaya dön.'),
      check('Uzlaşma için hangi seçenek daha uygundur?', ['Yalnızca bir tarafın istediği olur', 'Birden fazla seçenek adalet ve uygulanabilirlik açısından değerlendirilir', 'Sorun konuşulmadan ertelenir'], 1, 'Uzlaşma, üzerinde anlaşılabilir ve uygulanabilir bir çözüm aramaktır.', 'Her iki tarafın ihtiyacını gözeten yolu seç.')
    ],
    5: [
      check('Fırsat eşitliğini destekleyen yaklaşım hangisidir?', ['Herkese aynı şeyi verip gereksinimleri görmezden gelmek', 'Katılımı zorlaştıran engeli belirleyip uygun desteği sağlamak', 'Etkinliğe katılımı yalnızca hızlı olanlarla sınırlamak'], 1, 'Eşit katılım için ihtiyaca göre erişilebilir düzenleme gerekebilir.', 'Engeli ve katılım olanağını birlikte düşün.'),
      check('Beyin yazımı sırasında fikirleri geliştirmek için ne yapılır?', ['Fikirler yazılır, paylaşılır ve yeni önerilerle geliştirilir', 'İlk fikir seçilip diğerleri dinlenmez', 'Yalnızca öğretmen öneri sunar'], 0, 'Beyin yazımı, farklı fikirleri sırayla üretip geliştirmeye yardım eder.', 'Bu tekniğin çoklu fikir üretme amacını hatırla.')
    ],
    6: [
      check('Bir binada yönlendirme yazılarının okunamaması hangi tür engel olabilir?', ['Bilgiye/iletişime erişim engeli', 'Tarihî kaynak', 'Siyasi sınır'], 0, 'Anlaşılır yönlendirme bilgiye ve mekâna erişimi etkiler.', 'Engelin kişinin katılımını hangi açıdan sınırladığına bak.'),
      check('Erişilebilir düzenleme önerisi nasıl seçilmelidir?', ['Kullanıcıların ihtiyaç ve görüşleri incelenerek', 'Yalnızca en ucuz görünen seçeneğe göre', 'Katılımı etkilenen kişilere sormadan'], 0, 'İlgili kişilerin deneyimi, uygun düzenlemenin belirlenmesine yardım eder.', 'Çözümden doğrudan yararlanacak kişilerin görüşünü düşün.')
    ],
    7: [
      check('Bir proje taslağında hangi bilgi mutlaka açık olmalıdır?', ['Hedef, görevler ve ilk uygulama adımı', 'Yalnızca proje adı', 'Kimsenin üstlenmeyeceği görevler'], 0, 'Hedef, görev ve adımlar projenin uygulanmasını planlamaya yardım eder.', 'Projeyi başlatacak kişi ve ilk adımı düşün.'),
      check('Kontrol listesi en çok ne işe yarar?', ['Taslağın ölçütlere uyup uymadığını gözden geçirmeye', 'Projeyi değerlendirmeden bitmiş saymaya', 'Fikir üretmeyi engellemeye'], 0, 'Kontrol listesi eksik veya gözden geçirilmesi gereken adımları fark ettirir.', 'Kontrol listesi bir özdenetim aracıdır.')
    ],
    8: [
      check('Millî mesele olarak düşünülebilecek konu hangisidir?', ['Toplumun bağımsızlığı ve ortak geleceğini ilgilendiren konu', 'Yalnızca tek kişinin günlük tercihi', 'Bir grubun ortak yaşamla ilgisi olmayan oyunu'], 0, 'Millî meseleler toplumun geniş kesimlerini ve ortak değerleri ilgilendirir.', 'Konunun kimleri ve hangi ortak değeri ilgilendirdiğini düşün.'),
      check('Dayanışmanın ortak yaşama katkısı nedir?', ['Katkıları birleştirip ortak ihtiyaca yanıt vermek', 'Bütün görevleri tek kişiye bırakmak', 'Farklı katkıları görmezden gelmek'], 0, 'Dayanışma, birey ve kurumların katkılarını ortak amaçta buluşturabilir.', 'Ortak amaç için yapılan yardımlaşmayı düşün.')
    ],
    9: [
      check('Anma günlerinin ortak hafızadaki işlevi nedir?', ['Önemli olayları ve değerleri birlikte hatırlatmak', 'Geçmişteki olayları değiştirmek', 'Toplumdaki bütün görüşleri aynı yapmak'], 0, 'Anma günleri ortak geçmiş ve değerlerin hatırlanmasına katkı sağlar.', 'Günün hangi olayı hatırlattığını düşün.'),
      check('Bir bayramın toplumsal anlamını açıklarken neye bakmak gerekir?', ['Tarihine ve temsil ettiği değere', 'Yalnızca kullanılan süslemelere', 'Sadece kişisel tatil planına'], 0, 'Ortak tören ve semboller tarihî olay ve değerlerle anlam kazanır.', 'Sembolün hangi ortak olayı temsil ettiğini hatırla.')
    ],
    10: [
      check('Tarihî kaynakla çalışırken “kanıt” neyi ifade eder?', ['Kaynakta doğrudan görülen bilgi veya ayrıntıyı', 'Kaynağa eklediğimiz her tahmini', 'Kaynağın vermediği bir sonucu'], 0, 'Kanıt kaynağın sunduğu bilgi; çıkarım ise bu bilgiden hareketle ulaştığımız yorumdur.', 'Gözlem ile yorum arasındaki ayrımı düşün.'),
      check('Millî Mücadele’de dayanışmayı açıklamak için en uygun yaklaşım hangisidir?', ['Ortak amaç ve farklı katkıları kaynak örneğiyle ilişkilendirmek', 'Dönemi tek kişinin çabasıyla açıklamak', 'Kanıt aramadan sonuç yazmak'], 0, 'Dönemi kaynaklara dayalı, birden fazla katkıyı gözeten açıklama daha dengelidir.', 'Ortak amaca katkı sunanları ve kanıtı düşün.')
    ],
    11: [
      check('Toplumsal dayanışmaya örnek olabilecek durum hangisidir?', ['Afet sonrası kurum ve vatandaşların koordineli destek vermesi', 'Ortak ihtiyacı kimsenin önemsememesi', 'Bir başarının bütün katkılarını tek kişiye bağlamak'], 0, 'Dayanışma farklı kişi ve kurumların ortak ihtiyaç için çalışmasını içerir.', 'Birlikte yürütülen katkıyı seç.'),
      check('İki toplumsal örneği karşılaştırırken ne yapmak gerekir?', ['Aynı ölçüte göre katkı ve sonucu incelemek', 'Farklı ölçütleri karıştırmak', 'Kaynağın türünü önemsememek'], 0, 'Aynı ölçüt, örneklerin ortak ve farklı yönlerini görmeyi kolaylaştırır.', 'Her iki örneğe aynı soruyu yönelt.')
    ],
    12: [
      check('Fırsat eşitliği ile iletişimi birleştiren davranış hangisidir?', ['Etkinlik düzenlerken katılımcıların ihtiyaçlarını dinlemek', 'Başkalarının görüşünü almadan karar vermek', 'Bir kişinin sözünü sürekli kesmek'], 0, 'Dinlemek ve katılımı gözetmek iki konu arasında bağ kurar.', 'İletişim ve katılımın ortak olduğu noktayı ara.'),
      check('Birlikte Yaşamak alanının üç ana başlığı hangileridir?', ['İletişim, fırsat eşitliği ve millî meseleler', 'Küreselleşme, üretim ve astronomi', 'Harita, iklim ve nüfus'], 0, 'Öğrenme alanı bu üç konu başlığını bir arada ele alır.', 'Hafta planındaki üç ana bölümü hatırla.')
    ],
    13: [
      check('Küreselleşmeyi en iyi anlatan ifade hangisidir?', ['Toplumlar arasında iletişim, ulaşım, ticaret ve kültür bağlarının artması', 'Bütün ülkelerin aynı özelliklere sahip olması', 'İnsanların yalnızca kendi çevreleriyle iletişim kurması'], 0, 'Küreselleşme, toplumlar arasındaki bağlantıların ve etkileşimin artmasıdır.', 'Farklı yerler arasındaki bağları düşün.'),
      check('Bir ürünün başka ülkelerde üretilip farklı yerlerde kullanılması neyi gösterir?', ['Ülkeler arası ekonomik bağlantıyı', 'Bir bölgenin tamamen bağımsız olduğunu', 'Kültürel etkileşimin sona erdiğini'], 0, 'Üretim ve tüketim ağları ülkeler arasında bağlantı oluşturabilir.', 'Ürünün üretim yeriyle kullanıldığı yeri karşılaştır.')
    ],
    14: [
      check('Küresel bağlantıların etkisi hakkında doğru yaklaşım hangisidir?', ['Aynı bağlantı farklı grupları farklı biçimde etkileyebilir', 'Her bağlantı herkese aynı yararı sağlar', 'Teknolojik gelişmelerin hiçbir güçlüğü olamaz'], 0, 'Sonuçlar kişilere, koşullara ve gruplara göre değişebilir.', 'Farklı kişilerin aynı olaydan nasıl etkilenebileceğini düşün.'),
      check('Bir küresel etkinin olumsuz yönünü değerlendirirken ne yapılmalıdır?', ['Etkilenen grubu ve bunu gösteren örneği belirlemek', 'Yalnızca olumlu yönleri yazmak', 'Kanıt yerine söylenti kullanmak'], 0, 'Etkiyi örnek ve kaynakla ilişkilendirmek daha dengeli değerlendirme sağlar.', 'Kim etkileniyor ve hangi bilgi bunu gösteriyor?')
    ],
    15: [
      check('Küresel bir ürünü bilinçli değerlendirirken hangisi önemlidir?', ['Kaynağı ve farklı taraflar üzerindeki etkileri incelemek', 'Ürünün nereden geldiğini hiç düşünmemek', 'Her reklamı doğrulanmış bilgi saymak'], 0, 'Kaynak ve sonuçları incelemek sorumlu tercihi destekler.', 'Üretici, tüketici ve çevre üzerindeki etkileri düşün.'),
      check('Kültürel içeriğin ülkeler arasında yayılması neye örnek olabilir?', ['Toplumlar arası etkileşime', 'Harita lejantına', 'Yalnızca yerel yönetime'], 0, 'Kültürel içeriklerin paylaşılması toplumlar arasında etkileşim oluşturur.', 'Bilgi, ürün ve kültür dolaşımını gözden geçir.')
    ],
    16: [
      check('Birçok ülkeyi etkileyen ve ortak çalışma gerektiren sorun hangi ölçekte olabilir?', ['Küresel', 'Yalnızca bireysel', 'Sadece sınıf içi'], 0, 'Birçok ülkeyi etkileyen sorun küresel ölçekte değerlendirilir.', 'Sorunun etki alanının kaç ülkeye/topluluğa yayıldığına bak.'),
      check('Bölgesel ve küresel sorunları sınıflandırırken neye bakılır?', ['Etkilenen alan ve toplulukların kapsamına', 'Sorunun adının uzunluğuna', 'Yalnızca olayın gerçekleştiği güne'], 0, 'Etki alanı ve ilgili topluluklar sorun ölçeğini anlamaya yardım eder.', 'Sorunun kimi ve hangi bölgeleri etkilediğini düşün.')
    ],
    17: [
      check('Ortak çözüm planında hangi sıra anlamlıdır?', ['Sorun → paydaşlar → eylem → beklenen sonuç', 'Sonuç → rastgele görev → sorun', 'Yalnızca başlık → tamamlandı'], 0, 'Plan, sorunu ve sorumluları belirleyip eylem ile sonuca bağlar.', 'Eylemden önce sorunu ve birlikte çalışacakları belirle.'),
      check('Bir küresel soruna kimler katkı sunabilir?', ['Bireyler, kurumlar ve ülkeler farklı ölçekte katkı sunabilir', 'Yalnızca tek bir öğrenci', 'Hiçbir topluluk veya kurum'], 0, 'Sorunun niteliğine göre farklı paydaşlar iş birliği yapabilir.', 'Farklı sorumluluk düzeylerini ayır.')
    ],
    18: [
      check('Türkiye’nin bölgesel/küresel katkısını değerlendirirken neyi sormalıyız?', ['Hangi ihtiyaca, hangi eylemle ve kimlerle yanıt verildiğini', 'Yalnızca katkının adını', 'Kaynağın doğruluğunu hiç incelememeyi'], 0, 'Amaç, eylem ve iş birliği katkının rolünü açıklar.', 'Örneğin hangi soruna cevap verdiğini belirle.'),
      check('Diplomasi hangi tür bir katkıyla ilgilidir?', ['Ülkeler arasında görüşme ve iş birliği yürütmek', 'Haritadaki uzaklıkları ölçmek', 'Ürünleri fabrikada üretmek'], 0, 'Diplomasi ülkeler arası iletişim ve ortak çözüm arayışlarını kapsar.', 'Ülkelerin sorunları birlikte ele alma yolunu düşün.')
    ],
    19: [
      check('Malazgirt sonrası Anadolu haritalarında neyi araştırmak uygundur?', ['Siyasi yapıdaki ve beyliklerin yerleşimindeki değişimi', 'Yalnızca bugünkü il sınırlarını', 'Sanayi üretim miktarını'], 0, 'Önce-sonra haritaları dönemin siyasi/coğrafi değişimini gösterir.', 'Harita başlığı ile tarihini birlikte oku.'),
      check('Haritadan çıkarım yaparken önce neye dayanmalısın?', ['Lejant, sınır ve gösterilen yerleşimlere', 'Kaynakta bulunmayan ayrıntıya', 'Bugünkü bilgiyi geçmişe aynen aktarmaya'], 0, 'Harita işaretleri ve lejant gözlemin temelini oluşturur.', 'Önce haritada doğrudan görüleni belirt.')
    ],
    20: [
      check('GZFT’de “güçlü yön” ve “zayıf yön” hangi koşullarla ilgilidir?', ['Beyliğin kendi özellikleriyle', 'Yalnızca gelecekteki dış fırsatlarla', 'Sadece başka devletlerin kararlarıyla'], 0, 'Güçlü/zayıf yönler iç koşulları; fırsat/tehditler çevresel koşulları anlatır.', 'İç ve dış koşul ayrımını hatırla.'),
      check('GZFT maddesini daha sağlam yapmak için ne eklersin?', ['Harita veya metinden dayanak', 'Kaynağı olmayan kesin iddia', 'İlgisiz bir kavram'], 0, 'GZFT değerlendirmesi coğrafi veya metinsel kanıtla gerekçelendirilmelidir.', 'Maddenin hangi gözleme dayandığını göster.')
    ],
    21: [
      check('Osmanlı’nın büyümesini açıklarken hangi yaklaşım daha dengelidir?', ['Coğrafya, politikalar ve farklı dönemleri birlikte incelemek', 'Büyümeyi tek bir nedene bağlamak', 'Haritaları ve metinleri hiç kullanmamak'], 0, 'Büyüme farklı politika ve koşulların birlikte değerlendirilmesini gerektirir.', 'Tek bir açıklamayla yetinmemeye çalış.'),
      check('İskân kavramı tarihî bağlamda en çok neyle ilgilidir?', ['Yerleşim ve nüfusun bir bölgeye yerleştirilmesiyle', 'Bir kaynakta başlık seçmekle', 'Deniz yolunu haritada ölçmekle'], 0, 'İskân, yerleşme/yerleştirme uygulamalarıyla ilgilidir.', 'Kavramı sözlük veya kitap tanımıyla doğrula.')
    ],
    22: [
      check('Osman Bey dönemi için kaynakta hangi coğrafi başlangıç öne çıkar?', ['Söğüt ve çevresi', 'Kuzey Afrika kıyıları', 'İstanbul’un fethi'], 0, 'Kitap, Osman Bey dönemini Söğüt ve çevresiyle ilişkilendirir.', 'İlk kuruluş yerini harita ve metinde ara.'),
      check('Zaman çizelgesi en çok hangi beceriyi destekler?', ['Olayları sıraya koyup aralarındaki bağı görmeyi', 'Kavramları alfabetik sıralamayı', 'Kaynak türünü gizlemeyi'], 0, 'Zaman çizelgesi kronoloji ve gelişmeler arasındaki ilişkiyi gösterir.', 'Olayların hangi sırayla gerçekleştiğini düşün.')
    ],
    23: [
      check('Orhan Bey ve I. Murad dönemlerini incelerken hangi başlıkları birlikte ele almak gerekir?', ['Fetih, idari gelişme ve coğrafi yayılma', 'Yalnızca saray sanatını', 'Sanayi fabrikalarını'], 0, 'Dönemlerde siyasi/askerî gelişmelerin yanında teşkilatlanma da önemlidir.', 'Haritadaki genişlemeyle yönetim gelişmelerini birlikte düşün.'),
      check('Bir harita işareti tarihî çıkarımda nasıl kullanılmalıdır?', ['Gördüğün bilgiyi yazıp desteklediği çıkarımı açıklayarak', 'İşarete bakmadan sonuç yazarak', 'Haritadaki her ayrıntıyı kesin bilgi sayarak'], 0, 'Gözlem ve çıkarımı ayırmak kanıta dayalı yorum sağlar.', 'Önce ne gördüğünü, sonra ne anladığını yaz.')
    ],
    24: [
      check('Neden–sonuç çalışmasında hazırlıklar hangi soruya yanıt verir?', ['Belirli bir hedefe ulaşmak için ne yapıldığına', 'Bir olayın neden hiç gerçekleşmediğine', 'Bir kaynağın kim tarafından basıldığına'], 0, 'Hazırlıklar, hedefe yönelik atılan adımlardır.', 'Neden, hazırlık ve sonucu ayrı kutulara koy.'),
      check('İstanbul’un fethinin sonuçlarını incelerken hangi yaklaşım uygundur?', ['Türk tarihi ve dünya tarihi sonuçlarını ayrı değerlendirmek', 'Bütün sonuçları tek başlıkta karıştırmak', 'Yalnızca bir manşet yazıp kanıt kullanmamak'], 0, 'Farklı bakış başlıkları sonuçları düzenlemeye yardım eder.', 'Sonucun hangi ölçekte ele alındığını belirt.')
    ],
    25: [
      check('Yavuz Sultan Selim dönemindeki genişleme kaynakta hangi yönlerle ilişkilendirilir?', ['Doğu ve güney yönü, Mısır ve ticaret yolları', 'Yalnızca kuzeybatı Anadolu', 'Sanayi fabrikalarının kuruluşu'], 0, 'Metinde doğu-güney yönündeki gelişmeler ve ticaret yolları öne çıkar.', 'Dönem ve yön bilgisini harita üzerinde kontrol et.'),
      check('Kanuni dönemini karşılaştırırken hangi ölçüt kullanılabilir?', ['Coğrafi genişlik ve deniz/ticaret yollarındaki etkinlik', 'Yalnızca günümüz nüfus sayısı', 'Konuyla ilgisiz bir kültür kavramı'], 0, 'Harita ve dönem metinleri coğrafi ve ekonomik ölçütlerle karşılaştırılabilir.', 'İki dönem için aynı ölçütü kullan.')
    ],
    26: [
      check('Büyük deniz seyahatleri neden ticaret yolları açısından önemlidir?', ['Deniz güzergâhları ve bağlantılar değişebilir', 'Bütün ticaret yolları aynı kalır', 'Haritalar ekonomik ilişki gösteremez'], 0, 'Yeni güzergâhlar ticaret bağlantılarını ve ekonomik ilişkileri etkileyebilir.', 'Haritada eski ve yeni bağlantıları karşılaştır.'),
      check('Osmanlı ekonomisine etki hakkında çıkarım yaparken en iyi dayanak hangisidir?', ['Kitaptaki harita/metin ipucunu yorumla ilişkilendirmek', 'Bir neden göstermeden kesin hüküm vermek', 'Bugünün ticaret haritasını geçmişe kopyalamak'], 0, 'Tarihî ekonomik etki kaynakta görülen bilgiyle gerekçelendirilmelidir.', 'Görüşünü destekleyen somut ipucunu seç.')
    ],
    27: [
      check('Rönesans döneminde öne çıkan gelişmeler hangi alanlarla ilgilidir?', ['Bilim, sanat ve düşünce', 'Yalnızca günümüz ulaşımı', 'Sadece nüfus sayımı'], 0, 'Rönesans bilim, sanat ve düşünce alanlarında değişimle ilişkilidir.', 'Öğrenme özetindeki üç alana bak.'),
      check('Kitapta Rönesans’ın Osmanlı’ya etkisi en çok hangi bağlamda ele alınır?', ['Avrupa’daki bilimsel/teknik gelişmelerin Osmanlı yenilik arayışına etkisi', 'Osmanlı’da küreselleşmenin başlaması', 'Bölgesel sorunların çözümü'], 0, 'Metin, Avrupa’daki değişimi Osmanlı’daki yenilik ihtiyacıyla ilişkilendirir.', 'Bilim ve teknik gelişme ile yenilik arayışı arasındaki bağı düşün.')
    ],
    28: [
      check('Reform hareketlerini başlatan nedenlere örnek hangisidir?', ['Kilise uygulamalarına yönelik eleştiriler ve yenilenme isteği', 'Sanayi fabrikalarında işçi sayısının artması', 'Anadolu’daki beyliklerin kurulması'], 0, 'Reform, Avrupa’daki dinî uygulama ve yenilenme tartışmalarıyla ilgilidir.', 'Dönemin dinî ve düşünsel koşullarını hatırla.'),
      check('Avrupa’daki Reform sonuçlarını Osmanlı bağlamıyla karşılaştırırken ne yapmalısın?', ['İki yerin koşullarını ayrı kaynak bilgisiyle incelemek', 'Sonuçların her yerde aynı olduğunu varsaymak', 'Osmanlı’daki farklılıkları atlamak'], 0, 'Kaynak, Avrupa ile Osmanlı’daki koşulların aynı olmadığını vurgular.', 'Toplum ve yönetim koşullarını ayrı ayrı değerlendir.')
    ],
    29: [
      check('Aydınlanma düşüncesinde bilgiye ulaşmada hangi yol öne çıkar?', ['Akıl, gözlem ve deney', 'Yalnızca söylenti', 'Sadece geleneksel bir alışkanlık'], 0, 'Aydınlanma doğru bilgi için akıl ve bilimsel yönteme önem verir.', 'Öğrenme özetindeki temel kavramları kullan.'),
      check('Aydınlanma’nın sonuçlarını incelerken hangi bağlantı anlamlıdır?', ['Bilimsel gelişmeler ile sonraki toplumsal/siyasal değişimler', 'Harita lejantı ile hava durumu', 'Sadece bireysel alışveriş'], 0, 'Bilimsel ve düşünsel değişimler daha sonraki toplumsal gelişmeleri etkileyebilir.', 'Neden-sonuç zincirini kaynaktaki sırayla kur.')
    ],
    30: [
      check('Sanayi İnkılabı üretimde hangi değişimi hızlandırdı?', ['El emeğine dayalı atölyelerden makine kullanılan fabrikalara geçişi', 'Fabrikaların kapanıp yalnızca el üretimine dönülmesini', 'Ticaretin tamamen sona ermesini'], 0, 'Makineler ve fabrikalar üretim biçimini dönüştürdü.', 'Teknik yeniliği üretim yeri ve miktarıyla ilişkilendir.'),
      check('Sanayileşmenin toplumsal sonuçlarından biri hangisidir?', ['Şehirleşme ve işçi sınıfının ortaya çıkması', 'Dünya ticaretinin tamamen bitmesi', 'Küresel ulaşımın ortadan kalkması'], 0, 'Fabrikalar şehirleşme ve yeni çalışma koşullarıyla bağlantılıdır.', 'Üretim değişince insanların nerede ve nasıl çalıştığını düşün.')
    ],
    31: [
      check('Bir Osmanlı yeniliğini incelerken ilk hangi soruyu sormalısın?', ['Hangi ihtiyaca cevap vermeyi amaçladı?', 'Günümüzde aynı adı taşıyan kurum nedir?', 'Kaynak başlığı kaç kelimeden oluşuyor?'], 0, 'Yeniliğin ortaya çıktığı ihtiyaç, amacını anlamaya yardım eder.', 'İhtiyaç–yenilik–amaç sırasını izle.'),
      check('Beklenen etki ile gerçekleşen sonucu neden ayırırız?', ['Bir yeniliğin amacı her zaman bütünüyle gerçekleşmeyebilir', 'İkisi her durumda aynı şeydir', 'Sonuçlar kaynakla ilişkilendirilemez'], 0, 'Amaç ve sonuç farklı olabilir; değerlendirme kaynakla yapılmalıdır.', 'Metnin neyi amaç, neyi sonuç olarak anlattığını ayır.')
    ],
    32: [
      check('Kaynak incelemesinde kanıt nasıl kullanılır?', ['Bir çıkarımı metin/görseldeki bilgiyle desteklemek', 'Kaynakta olmayan bilgiyi kesinleştirmek', 'Yalnızca kendi görüşünü yazmak'], 0, 'Kanıt, değerlendirmeyi kaynak bilgisine bağlar.', 'Kaynağın gösterdiği ayrıntıyı belirt.'),
      check('Bir yeniliğin değerlendirmesinde hangi karşılaştırma önemlidir?', ['Hedeflenen değişim ile anlatılan sonuç', 'Farklı dönemlerin tarihlerini karıştırmak', 'Konuyla ilgisiz iki kavram'], 0, 'Amaç ve sonuç karşılaştırması yeniliğin etkisini değerlendirmeye yardım eder.', 'Hedef ile gerçekleşen etkiyi ayrı yaz.')
    ],
    33: [
      check('Kültür ve medeniyet konusunu incelerken hangi örnek kullanılabilir?', ['Eğitim, hukuk, sanat veya gündelik yaşamdan bir unsur', 'Yalnızca bugünkü hava durumu', 'Haritadaki ölçek çizgisi'], 0, 'Bu öğrenme alanı farklı kültürel ve toplumsal unsurları kapsar.', 'Konunun eğitim, hukuk, sanat veya yaşama bağını düşün.'),
      check('Bir kültürel unsurun işlevini açıklamak için ne sorarsın?', ['Toplum yaşamında neye katkı sağlıyor?', 'Kaç harfli?', 'Hangi günlerde ders var?'], 0, 'İşlev, unsurun toplumsal yaşamdaki rolünü açıklar.', 'Örneğin kimlere ve nasıl katkı verdiğini düşün.')
    ],
    34: [
      check('Kısa araştırma raporunda hangi sıra uygundur?', ['Araştırma sorusu, kaynak, kanıt ve sonuç', 'Sonuç, rastgele bilgi, sorusuz kaynak', 'Başlık ve kaynaksız kesin yargı'], 0, 'Soru ile kaynak/kanıt arasında bağ kuran sıra raporu anlaşılır kılar.', 'Sonucun soruya cevap verip vermediğini kontrol et.'),
      check('Araştırmada başka bir kaynaktan alınan bilgiyi nasıl kullanmalısın?', ['Kaynağı belirtip bilgiyi kendi cümlelerinle özetleyerek', 'Metni kaynak göstermeden aynen alarak', 'Kaynağın güvenilirliğini hiç sorgulamadan'], 0, 'Kaynağı belirtmek ve kendi cümlenle yazmak araştırma sorumluluğudur.', 'Kaynak ve kendi yorumunu ayır.')
    ],
    35: [
      check('Ortak Mirasımız tekrarı hangi üç geniş başlık arasında bağ kurar?', ['Politikalar, yenilikler, kültür ve medeniyet', 'Yalnızca iletişim, gruplar ve empati', 'Küreselleşme, iklim ve nüfus'], 0, 'Üçüncü öğrenme alanı bu tarihî başlıkları birleştirir.', 'Üçüncü öğrenme alanının ana konu başlıklarını hatırla.'),
      check('Tarihî bir bağlantıyı daha ikna edici yapmak için ne kullanırsın?', ['Zaman/harita/kaynak kanıtı', 'Konudan bağımsız tahmin', 'Kaynakta bulunmayan alıntı'], 0, 'Kanıt, konu başlıkları arasındaki ilişkiyi destekler.', 'Harita veya metinden bir dayanak seç.')
    ],
    36: [
      check('Üç öğrenme alanında da kullanılabilecek ortak beceri hangisidir?', ['Kaynağı inceleyip gerekçeli çıkarım yapmak', 'Her konuyu aynı olay saymak', 'Bilgiyi kanıtsız aktarmak'], 0, 'Kaynak kullanma ve gerekçe sunma farklı ders konularında da işe yarar.', 'Ortak becerilerden birini seç.'),
      check('Üç alanı karşılaştırırken nasıl çalışmalısın?', ['Aynı ölçütü her alandaki örneğe uygulamak', 'Bir alana çok, diğerlerine hiç bakmamak', 'Konuları tarih sırasına göre değil rastgele yazmak'], 0, 'Ortak ölçüt, benzerlikleri ve farklılıkları görmeyi sağlar.', 'Her alan için aynı soruyu sor.')
    ],
    37: [
      check('Bir sunumun ana mesajı nasıl desteklenir?', ['Örnek veya güvenilir kaynak kanıtıyla', 'Birbiriyle ilgisiz çok sayıda ayrıntıyla', 'Kaynağı gizleyerek'], 0, 'Kanıt veya örnek, ana mesajın anlaşılmasına yardım eder.', 'Mesajın hangi örnekle desteklendiğini göster.'),
      check('Bir ürünü paylaşmadan önce neyi kontrol etmelisin?', ['Açıklık, kaynak ve saygılı dil', 'Yalnızca rengini', 'Kaynağın gereksiz olduğunu'], 0, 'Anlaşılır ve kaynaklı bir ürün paylaşım için daha uygundur.', 'Ürünün hedeflediği dinleyici ve kaynağı gözden geçir.')
    ]
  };

  window.SOCIAL_STUDIES_CONTENT = Object.freeze({ lessons, checks, activities });
})();
