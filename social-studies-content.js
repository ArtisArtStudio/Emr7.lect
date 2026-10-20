/* Original lesson summaries, short self-checks and transfer tasks based on the 2026 MEB Social Studies 7 book. */
(() => {
  'use strict';

  const check = (prompt, options, correct, explanation, hint) => ({ prompt, options, correct, explanation, hint });
  const lesson = (summary, points, terms, transfer, extras = {}) => ({ summary, points, terms, transfer, ...extras });
  const textField = (id, label, placeholder, minChars = 12, kind = 'textarea') => ({ id, label, placeholder, minChars, kind });
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
      'Empati, başka bir kişinin duygusunu ve bakış açısını anlamaya çalışmaktır; onunla aynı fikirde olmak zorunlu değildir. Ben dili, kişiyi suçlamak yerine kendi duygunu, durumu ve ihtiyacını anlatır. Farklı düşüncelere saygılı yanıt vermek güvenli iletişimi destekler.',
      ['Duyguyu fark etmek için durumdaki ipuçlarına bak.', 'Ben dili: durum + duygu + ihtiyaç/istek.', 'Kişiyi etiketlemek yerine davranışı tarif et.'],
      ['empati', 'ben dili', 'saygı'],
      { title: 'Bir durumu empatiyle yeniden kur', format: 'Senaryo · duygu çıkarımı · cümle dönüştürme', scenario: 'Bir arkadaşın grup konuşmasında fikrini paylaşamıyor; diğerleri onun yerine karar veriyor.', prompt: 'Arkadaşının ne hissedebileceğini düşün. Duyguyu varsayım olarak ifade et ve katılımını destekleyecek ben diliyle bir cümle yaz.', fields: [['Duygu tahminim ve ipucu', '“... hissediyor olabilir; çünkü ...”'], ['Ben diliyle destek cümlem', 'Duygu, durum ve ihtiyacı yargılamadan anlat.']], hint: 'Duygu tahminini kesin bilgi gibi sunma; cümlende suçlama kullanma.' }
    ),
    4: lesson(
      'Anlaşmazlıklar, kişilerin ihtiyaçları veya önerileri farklı olduğunda ortaya çıkabilir. Çözüm için önce tarafları dinlemek, sorunu açıkça belirlemek, birkaç seçenek üretmek ve adil olanı birlikte seçmek gerekir. Uzlaşma, herkesin her isteğinin gerçekleşmesi değil, üzerinde anlaşılabilir bir yol bulunmasıdır.',
      ['Sorunu kişiden ayır; neyin anlaşmazlık olduğunu adlandır.', 'Her tarafın görüşünü dinle ve açıklayıcı soru sor.', 'Çözüm seçeneklerini adalet ve uygulanabilirlik açısından değerlendir.'],
      ['anlaşmazlık', 'uzlaşma', 'adil çözüm'],
      { title: 'Tahminden uzlaşmaya', format: 'Durum çözümleme · olumlu/olumsuz davranış · uzlaşma', scenario: 'Bir çalışma grubunda iki kişi görev paylaşımı konusunda anlaşamıyor; diğer üyeler de henüz görüş bildirmedi.', prompt: 'Olası iki devam yolu düşün: biri çatışmayı artırabilir, diğeri çözüm sağlayabilir. Yapıcı seçeneği geliştiren ortak bir adım öner.', fields: [['İki olası davranış ve sonucu', 'Bir engelleyici davranışı ve bir yapıcı davranışı yaz.'], ['Uzlaşma adımımız', 'Herkesin görüşünü içeren uygulanabilir bir çözüm öner.']], hint: 'Her iki tarafın ihtiyacını da çözümünde gözet.' }
    ),
    5: lesson(
      'Fırsat eşitliği, herkesin öğrenme ve toplumsal yaşama katılabilmesi için gerekli desteğe ve erişime sahip olmasıdır. Bazen sorun kişiden değil, çevredeki engelden veya etkinliğin düzenlenişinden kaynaklanır. Fikir üretirken ilgili bireylerin görüşünü almak önemlidir.',
      ['Eşit katılım için engeli fark et ve adını koy.', 'Öneriyi kişinin değil, ortamın/düzenlemenin değişmesine yönelt.', 'Farklı fikirleri biriktirip geliştirmek yeni çözümler doğurabilir.'],
      ['fırsat eşitliği', 'erişim', 'katılım'],
      { title: 'Fikir üret, sonra seç', format: 'Beyin yazımı · fikir geliştirme · seçim', prompt: 'Okulda veya mahallede katılımı zorlaştıran bir durumu seç. Birbirinden farklı çözümler düşün ve en uygulanabilir ilk adımı belirle.', fields: [['Sorun ve üç fikir', 'Fiziksel çevre, bilgiye erişim veya etkinlik düzeni üzerine düşün.'], ['Seçtiğim ilk adım', 'Kimlerin görüşü alınmalı, kim ne yapabilir?']], hint: 'Çözümün ilgili kişilerin bağımsız ve güvenli katılımını nasıl desteklediğini açıkla.' }
    ),
    6: lesson(
      'Erişilebilir bir çevre, farklı gereksinimleri olan kişilerin mekâna, bilgiye ve etkinliklere ulaşmasını kolaylaştırır. Merdiven, anlaşılır olmayan yönlendirme veya yalnızca tek iletişim biçiminin kullanılması katılımı sınırlayabilir. Düzenlemeyi planlarken kimlerin yararlanacağını ve uygulamanın gerçekten işe yarayıp yaramadığını düşünmek gerekir.',
      ['Engeli ortamda veya süreçte ara.', 'Düzenlemeyi belirli bir ihtiyaca bağla.', 'Sonucu, kimin daha rahat katılabildiğine bakarak değerlendir.'],
      ['erişilebilirlik', 'engel', 'düzenleme'],
      { title: 'Engeli ve düzenlemeyi eşleştir', format: 'Sorun–çözüm · etki değerlendirmesi', prompt: 'Bir okul etkinliğini herkes için daha erişilebilir kılacak bir düzenleme tasarla. Sorun ile çözüm arasında açık bağ kur.', fields: [['Engel ve etkilenen katılım', 'Mekân, iletişim veya etkinlikteki bir engeli tarif et.'], ['Düzenleme ve beklenen etki', 'Kim neyi değiştirebilir; kimler nasıl yararlanır?']], hint: 'Önerini varsayıma değil, gözlenebilir bir ihtiyaca dayandır.' }
    ),
    7: lesson(
      'Küçük bir proje, belirli bir ihtiyaca yönelik ulaşılabilir bir hedefle başlar. Taslakta kimlerin yararlanacağı, hangi adımların atılacağı, görevlerin kimde olduğu ve gereken malzemeler yer alır. Kontrol listesi, fikrin uygulanabilir ve kapsayıcı olup olmadığını gözden geçirmeye yardım eder.',
      ['Hedefi açık ve yapılabilir biçimde yaz.', 'Sorumluları, ilk adımı ve gerekli kaynakları belirle.', 'Uygulama sonrasında katkıyı nasıl değerlendireceğini düşün.'],
      ['proje hedefi', 'görev paylaşımı', 'kontrol listesi'],
      { title: 'Proje taslağını gözden geçir', format: 'Proje planı · görev · değerlendirme', prompt: 'Fırsat eşitliğini destekleyecek küçük bir proje fikri seç ve başlamadan önce uygulanabilirliğini sınayacak bir ölçüt belirle.', fields: [['Projemin hedefi ve ilk adımı', 'Hangi ihtiyaca cevap veriyor; ilk olarak ne yapılacak?'], ['Görev ve başarı ölçütü', 'Kim katkı sunacak; olumlu değişimi nasıl fark edeceğiz?']], hint: 'Ölçütü gözlenebilir bir değişime bağla.' }
    ),
    8: lesson(
      'Millî mesele, toplumun bağımsızlığı, güvenliği, ortak değerleri veya geleceğiyle ilgili geniş kesimleri ilgilendiren bir konudur. Böyle dönemlerde dayanışma ve sorumluluk duygusu ortak hareket etmeyi sağlayabilir. Kelime bulutu, konuya ilişkin farklı düşünceleri görünür kılmanın bir yoludur.',
      ['Ortak meseleleri yalnızca tek kişinin bakış açısından değerlendirme.', 'Dayanışma, insanların ve kurumların katkılarını birleştirebilir.', 'Kavramları örnekle ilişkilendir.'],
      ['millî mesele', 'ortak değer', 'dayanışma'],
      { title: 'Ortak değerler için kelime bulutu', format: 'Kelime bulutu · kavram açıklama', prompt: 'Toplumu ortak bir amaç etrafında buluşturan kavramları seç. Her sözcüğün hangi davranış veya sorumluluğa karşılık geldiğini açıkla.', fields: [['Kelime bulutum', 'En az üç farklı kavramı virgülle ayır.'], ['Bir kavram ve örneği', 'Bu değer günlük yaşamda hangi davranışla görünür?']], hint: 'Sözcükleri tekrarlamak yerine her birinin anlamını düşün.' }
    ),
    9: lesson(
      'Ulusal bayramlar ve anma günleri, toplumun geçmişteki önemli olayları birlikte hatırlamasına imkân verir. Bayrak ve ortak törenler farklı kuşaklar arasında aidiyet ve ortak hafıza oluşturabilir. Bu günlerin anlamı, törenin biçiminden çok hangi değeri ve olayı hatırlattığıyla ilişkilidir.',
      ['Bir bayramın kutlama, bir anma gününün hatırlama yönünü ayırt et.', 'Ortak sembollerin anlamını tarihî bağlamıyla düşün.', 'Farklı kişilerin bu günlere yüklediği anlamı dinle.'],
      ['ulusal bayram', 'anma günü', 'ortak hafıza'],
      { title: 'Bir günü anlatan slogan ve gerekçe', format: 'Beyin fırtınası · slogan · kısa açıklama', prompt: 'Bir ulusal günün veya anma gününün ortak hafızadaki yerini anlatan özgün bir slogan tasarla; sloganın neyi hatırlattığını açıkla.', fields: [['Sloganım', 'Kısa, saygılı ve anlaşılır olsun.'], ['Sloganın anlamı', 'Hatırlattığı olay/değer ve toplumsal katkısı…']], hint: 'Sloganın hangi ortak değeri yansıttığını belirt.' }
    ),
    10: lesson(
      'Millî Mücadele, bağımsızlık hedefi çevresinde farklı kesimlerin katkı sunduğu bir dönemdir. Bir tarihî metin, görsel veya harita olayları ve insanların tutumlarını farklı yönlerden gösterebilir. Kaynaktaki kanıtı kendi yorumundan ayırmak, daha dikkatli çıkarım yapmayı sağlar.',
      ['Ortak amaç ve dayanışma örneklerini kaynakta ara.', 'Bir olayı gösteren kanıtı kaynağın türüyle birlikte not et.', 'Çıkarımının hangi kanıta dayandığını açıkla.'],
      ['Millî Mücadele', 'bağımsızlık', 'kanıt'],
      { title: 'Kaynak notu: kanıttan çıkarıma', format: 'Tarihî kaynak inceleme · kanıt–yorum tablosu', prompt: 'Kitaptan veya öğretmenin verdiği kaynaktan bir örnek seç. Kaynağın gösterdiği bilgiyi ve bundan çıkardığın sonucu ayrı yaz.', fields: [['Kaynak ve doğrudan kanıt', 'Metin, görsel veya haritada neyi gözlemledin?'], ['Çıkarımım ve dayanağı', 'Bu gözlem ortak amaç/dayanışma hakkında ne düşündürüyor?']], hint: 'Kanıtı kaynağın içinde gördüğün bilgiyle sınırla.' }
    ),
    11: lesson(
      'Toplumsal dayanışma afet, bilim, sanat ve spor gibi farklı alanlarda görülebilir. Bir başarı veya yardım çalışmasının arkasında bireyler, kurumlar ve ortak emek bulunabilir. Örnekleri karşılaştırırken katkı sunanları ve oluşan toplumsal yararı birlikte incele.',
      ['Farklı alanlardaki örneklerin ortak yönünü ara.', 'Katkının kimlerden geldiğini belirt.', 'Sonuçları kanıt veya güvenilir bilgiyle ilişkilendir.'],
      ['toplumsal katkı', 'ortak çaba', 'güvenilir kaynak'],
      { title: 'İki dayanışma örneğini karşılaştır', format: 'Karşılaştırma tablosu · ortak katkı', prompt: 'Kitapta ele alınan alanlardan veya güvenilir bir sınıf kaynağından iki örnek seç. Katkı biçimlerini ve toplumsal yararı aynı ölçütle karşılaştır.', fields: [['İki örnek ve katkı sunanlar', 'Örneklerin kaynağını da not et.'], ['Ortak yön / farklılık', 'Hangi katkı toplum için neyi değiştirdi?']], hint: 'İki örneğe de aynı karşılaştırma ölçütünü uygula.' }
    ),
    12: lesson(
      'Birlikte Yaşamak öğrenme alanı iletişim, fırsat eşitliği ve millî meseleler konularını bir araya getirir. Bu başlıkların ortak noktasında başkalarını gözetme, sorumluluk alma ve birlikte çözüm üretme bulunur. Kavram haritası, bu bağlantıları örneklerle göstermeye yardım eder.',
      ['İletişim, katılım ve dayanışmayı ayrı kavramlar olarak tanı.', 'Her kavram için kısa bir yaşam örneği bul.', 'Kavramlar arasındaki bağı oklarla ve açıklamalarla göster.'],
      ['iletişim', 'fırsat eşitliği', 'dayanışma'],
      { title: 'Kavram haritamı tamamla', format: 'Kavram haritası · öz değerlendirme', prompt: 'Üç konu başlığını günlük yaşamdan örneklerle birbirine bağla. Haritandaki bir bağlantıyı iki cümleyle açıkla.', fields: [['Üç kavram ve örnekleri', 'Her öğrenme alanından en az bir kavram seç.'], ['Bağlantı ve öz değerlendirme', 'Ortak değer nedir; tekrar etmek istediğin konu hangisi?']], hint: 'Bir kavramı diğerine bağlayan davranışı veya değeri yaz.' }
    ),
    13: lesson(
      'Küreselleşme, farklı ülkelerdeki insanların ve toplumların iletişim, ulaşım, ticaret ve kültür yoluyla daha fazla etkileşim kurmasıdır. Günlük hayatta kullanılan bir ürün veya paylaşılan bir haber, başka yerlerle bağlantı içerebilir. Kendi tanımını sözlükteki tanımla karşılaştırmak kavramı netleştirir.',
      ['Örneklerden kavramın ortak yönünü çıkar.', 'Kendi tanımını önce yaz, sonra sözlük tanımıyla karşılaştır.', 'Benzerlik ve farkları gerekçelendir.'],
      ['küreselleşme', 'etkileşim', 'bağlantı'],
      { title: 'Kendi tanımımı sözlükle karşılaştırıyorum', format: 'Görsel inceleme · tanım · karşılaştırma', prompt: 'Ulaşım, iletişim veya kültürden bir görsel/örnek seç. Küreselleşmeyi kendi sözlerinle tanımla ve tanımını sözlükteki açıklamayla karşılaştır.', fields: [['Kendi tanımım ve örneğim', 'Örnekte hangi uzak bağlantı kuruluyor?'], ['Benzerlik ve fark', 'Sözlük tanımıyla ortak ve farklı yön…']], hint: 'Tanımı yalnızca bir teknolojiye indirgeme; ülkeler/toplumlar arasındaki etkileşimi düşün.' }
    ),
    14: lesson(
      'Küresel bağlantılar bilgiye, ürüne ve kültürel içeriğe ulaşmayı hızlandırabilir. Aynı bağlantılar yanlış bilginin, hastalıkların veya ekonomik etkilerin geniş alanlara yayılmasını da kolaylaştırabilir. Sonuçlar kişilere ve gruplara göre değişebilir; bu nedenle hem katkı hem güçlük değerlendirilmelidir.',
      ['Bir bağlantının olumlu ve zorlayıcı sonuçlarını ayrı düşün.', 'Etkilenen grupları belirt.', 'Günlük örnekten daha genel bir sonuca geçerken kanıt kullan.'],
      ['küresel bağlantı', 'olumlu etki', 'risk'],
      { title: 'Etki terazisi: kim kazanır, kim etkilenir?', format: 'Beyin fırtınası · çok yönlü etki analizi', prompt: 'Bir küresel bağlantı örneği seç ve farklı kişiler üzerindeki olumlu/olumsuz etkilerini aynı tabloda değerlendir.', fields: [['Örnek ve iki farklı etki', 'Kim için kolaylık, kim için güçlük olabilir?'], ['Daha bilinçli davranış', 'Olumsuz etkiyi azaltacak uygulanabilir bir adım…']], hint: 'Tek bir olayın herkes için aynı sonucu doğurmayabileceğini düşün.' }
    ),
    15: lesson(
      'Ürün, bilgi ve kültürel içeriklerin ülkeler arasında dolaşması fırsatlar kadar sorumluluklar da doğurur. Bir tercihin üreticilere, tüketicilere veya çevreye etkisi olabilir. Bilinçli karar verirken kaynağı, kullanım koşullarını ve farklı tarafların yararını göz önünde bulundur.',
      ['Ürünün veya bilginin nereden geldiğini araştır.', 'Etkileri yalnızca kendi deneyiminle sınırlama.', 'Tercihinin sonuçlarını gerekçeyle açıkla.'],
      ['ticaret', 'kültürel etkileşim', 'sorumlu tercih'],
      { title: 'Bir ürünün yolunu ve etkisini izle', format: 'Etki tablosu · tüketici sorumluluğu', prompt: 'Günlük kullandığın bir ürün veya dijital içeriğin başka yerlerle bağlantısını araştır. Bu bağlantının yararını ve dikkat edilmesi gereken yönünü yaz.', fields: [['Ürün/içerik ve bağlantısı', 'Nerede üretilmiş, paylaşılmış veya kimlerce kullanılmış?'], ['Katkı ve sorumluluk', 'Tercih ederken hangi bilgiye bakmalıyız?']], hint: 'Kaynağı doğrulanmış bilgiyle, tahmini bilgiyi birbirinden ayır.' }
    ),
    16: lesson(
      'Bölgesel sorunlar çoğunlukla belirli bir çevreyi veya komşu bölgeleri etkiler; küresel sorunların etkisi çok sayıda ülkeye ve topluluğa yayılabilir. Bir sorunun ölçeğini anlamak için nerede başladığına değil, kimleri ve hangi alanları etkilediğine de bakılır. Sorunun kapsamı çözüm için gereken iş birliğini belirler.',
      ['Etkilenen alan ve toplulukları belirle.', 'Bir sorunun sınır aşan yönünü ara.', 'Sorun ölçeği ile çözüm ortaklarını ilişkilendir.'],
      ['bölgesel sorun', 'küresel sorun', 'etki alanı'],
      { title: 'Sorunları etki alanına göre sınıflandır', format: 'Sınıflandırma tablosu · etki ölçeği', prompt: 'İki sorunu etki alanı, etkilenen topluluklar ve çözüm için gereken ortaklar bakımından karşılaştır.', fields: [['Sorunlar ve etki alanları', 'Bir örnek bölgesel, biri küresel olsun.'], ['İş birliği neden gerekir?', 'Sorun hangi sınırları veya grupları aşıyor?']], hint: 'Yerel bir olayın da daha geniş bir etkisi olup olmadığını sorgula.' }
    ),
    17: lesson(
      'Bölgesel ve küresel sorunlar farklı kişi ve kurumların birlikte çalışmasını gerektirebilir. Bireyler günlük seçimleriyle, yerel kurumlar hizmetleriyle, ülkeler ise iş birliği ve diplomasiyle katkı sağlayabilir. Çözüm planı, sorundan başlayıp eylem ve beklenen sonuca uzanır.',
      ['Sorunun nedenini ve etkilenenleri belirt.', 'Görev alabilecek tarafları ayır.', 'Eylem ile beklenen sonuç arasında bağ kur.'],
      ['paydaş', 'iş birliği', 'çözüm planı'],
      { title: 'Sorundan ortak eyleme kavram haritası', format: 'Kavram haritası · çözüm planı', prompt: 'Seçtiğin bir bölgesel veya küresel sorun için etkilenenleri, iş birliği yapacak tarafları ve beklenen sonucu gösteren bir harita kur.', fields: [['Sorun, etkilenenler ve paydaşlar', 'Birey/kurum/ülke örneklerini ayır.'], ['Ortak eylem ve sonuç', 'Başarıyı gösteren bir işaret belirle.']], hint: 'Çözüm önerisinin hangi paydaşın sorumluluğunda olduğunu yaz.' }
    ),
    18: lesson(
      'Türkiye, bölgesel ve küresel sorunlarda diplomasi, insani yardım ve uluslararası iş birliği gibi yollarla rol alabilir. Bir katkıyı değerlendirirken hangi ihtiyaca cevap verdiğini ve kimlerle yürütüldüğünü incelemek gerekir. Somut örneği öğretmenin verdiği veya kitapta gösterilen kaynaktan seç.',
      ['Katkının hedeflediği ihtiyacı tanımla.', 'Türkiye’nin rolünü bir örnek veya kaynakla destekle.', 'Beklenen sonucu ve iş birliği taraflarını belirt.'],
      ['diplomasi', 'insani yardım', 'uluslararası iş birliği'],
      { title: 'Katkıdan beklenen sonuca', format: 'Çözüm planı · öz değerlendirme', prompt: 'Kitapta veya öğretmenin verdiği güvenilir kaynakta bulunan bir Türkiye katkısı örneğini amaç, eylem ve sonuç bakımından özetle.', fields: [['Kaynak ve ele alınan ihtiyaç', 'Örneğin hangi soruna cevap verdiğini yaz.'], ['Katkı ve beklenen sonuç', 'İş birliğinin neden önemli olduğunu açıkla.']], hint: 'Kaynakta yer almayan ülke/kurum ayrıntılarını ekleme.' }
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
