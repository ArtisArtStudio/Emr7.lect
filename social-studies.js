/*
 * 7. sınıf Sosyal Bilgiler için özgün, kitap temelli haftalık çalışma rotası.
 * Etkinlik biçimleri MEB 2026 ders kitabında görülen örneklerden esinlenir;
 * ders kitabındaki metin, soru veya görseller kopyalanmaz.
 */
(() => {
  'use strict';

  const STORAGE_KEY = 'emr7lect.socialStudies.v1';
  const EBA_URL = 'https://eba.gov.tr/dersler/detay/17-sosyal-bilgiler?duzey=Ortaokul&okulTuru=6&sinif=15&genelMudurluk=33&ders=17&program=1131&kazanimlar=310150';
  const MEBI_URL = 'https://mebi.eba.gov.tr/student/section/upper-subjects/bee82e4d-de71-4a3e-0884-08ddc2afb3ce';
  const PROVIDERS = ['eba', 'tonguc', 'mebi'];

  const UNITS = [
    { id: 'together', label: '1. Öğrenme Alanı', title: 'Birlikte Yaşamak', pages: '12–58' },
    { id: 'world', label: '2. Öğrenme Alanı', title: 'Evimiz Dünya', pages: '68–83' },
    { id: 'heritage', label: '3. Öğrenme Alanı', title: 'Ortak Mirasımız', pages: '86–155' },
    { id: 'review', label: 'Yıl sonu', title: 'Tekrar ve paylaşım', pages: '12–155' },
  ];
  const UNIT_BY_ID = new Map(UNITS.map((unit) => [unit.id, unit]));

  const response = (id, label, placeholder, kind = 'textarea', minChars = kind === 'text' ? 3 : 10) => ({
    id, label, placeholder, kind, minChars,
  });
  const wordField = (id, label, placeholder) => ({ id, label, placeholder, kind: 'words' });
  const checklistField = (id, label, options) => ({ id, label, kind: 'checklist', options });
  const activity = (sourceStyle, title, prompt, fields, hint = '') => ({ sourceStyle, title, prompt, fields, hint });
  const week = (id, date, unitId, topic, focus, tasks, activityData) => {
    const unit = UNIT_BY_ID.get(unitId);
    const source = unitId === 'review'
      ? 'Önceki üç öğrenme alanından seçilen konular; yıl sonu tekrar önerisi.'
      : `MEB 7. Sınıf Sosyal Bilgiler Ders Kitabı, 1. Kitap (2026), ${unit.label}, “${unit.title}”, s. ${unit.pages}.`;
    return { id, date, unitId, unit: unit.title, unitLabel: unit.label, topic, focus, tasks, activity: activityData, source };
  };

  // Her satır ayrı haftadır: konu, tarih ve ilerleme başka haftayla birleştirilmez.
  // Takvim mevcut uygulamadaki 2026–2027 haftalık tarihleriyle aynı tutulmuştur.
  const WEEKS = [
    week(1, '14–18 Eyl', 'together', 'Gruplarda ve sosyal hayatta iletişimin önemi', 'Etkili iletişimin grup yaşamına katkısını açıkla; iletişimi etkileyen etmenleri günlük örnekler, gözlemler ve kaynak araştırmasıyla incele.', [
      'Ders kitabındaki iletişim bölümünü ve haftanın özgün konu anlatımını oku.',
      'Sohbet, trafik metni ve dört örnek olaydaki iletişim davranışlarını inceleyip gözlem/merak listesi oluştur.',
      'Ben dili, empati, farklılıklara saygı, etkin dinleme, beden dili ve sen dilinin etkisi için kaynak notları hazırla.',
    ], activity('Yapboz parçaları', 'Birlikte yaşama yapbozu', 'Her parçaya farklı bir birlikte yaşama davranışı için kendi çevrenden kısa bir örnek yaz.', [
      response('respect', 'Saygı parçası', 'Örn. farklı bir görüşü dinlemek…', 'text'),
      response('help', 'Yardımlaşma parçası', 'Örn. ortak bir işi paylaşmak…', 'text'),
      response('responsibility', 'Sorumluluk parçası', 'Örn. gruptaki görevini tamamlamak…', 'text'),
      response('difference', 'Farklılıklara saygı parçası', 'Örn. herkesin katılımını gözetmek…', 'text'),
    ], 'Kitapta birlikte yaşama unsurları yapboz parçalarına örneklerle yerleştiriliyor.')),

    week(2, '21–25 Eyl', 'together', 'İletişim süreci ve iletişim türleri', 'Sözlü, yazılı ve sözsüz iletişim yollarını ayırt et; amaca, ortama ve kişilere uygun yolu seçip geri bildirimle anlamayı kontrol et.', [
      'Ders kitabındaki iletişim ve iletişim türleri bölümünü, ayrıca haftanın özgün açıklayıcı metnini oku.',
      'Günlük yaşam örneklerinde sözlü, yazılı ve sözsüz iletişim yollarını sınıflandır; seçimlerini kontrol et.',
      'Bir grup durumunda uygun iletişim yollarını birlikte kullanıp anlaşıldığını nasıl doğrulayacağını planla.',
    ], activity('Örnek olay inceleme', 'Dinle, anla, yanıtla', 'Aşağıdaki durum için kişinin duygusunu ve iletişimi sürdürecek bir yanıtı düşün.', [
      response('feeling', 'Olaydaki kişi ne hissediyor olabilir?', 'Bir ipucunu da belirt…'),
      response('response', 'Nasıl bir yanıt onu dinlediğini gösterir?', 'Kısa ve saygılı bir cümle yaz…'),
      response('question', 'Anlamayı kolaylaştıracak açık soru', '“Seni doğru anladıysam…” diye başlayabilirsin…'),
    ], 'Kitaptaki iletişim ve empati örnek olaylarından esinlenen özgün bir durum çalışması.')),

    week(3, '28 Eyl–2 Eki', 'together', 'Empati, ben dili ve farklılıklara saygı', 'Duyguyu suçlamadan anlatan ben dili cümleleri kur; farklı düşüncelere saygılı yaklaş.', [
      'Empati örneğini oku; gözlemlediğin davranış ile duyguya ilişkin tahminini birbirinden ayır.',
      'İfade kartlarını ben dili, suçlayıcı sen dili ve saygılı soru/öneri olarak sınıflandır.',
      'Suçlayıcı bir cümleyi ben diliyle yeniden yaz ve empatiyle aynı fikirde olmanın farkını açıkla.',
    ], activity('Cümle dönüştürme', 'Ben diliyle yeniden kur', 'Suçlayıcı ifadeleri duygu ve ihtiyacı anlatan, saygılı ben dili cümlelerine dönüştür.', [
      response('rewrite1', 'Durum 1 için yeni cümle', 'Bir davranışı tarif et; kişiliği yargılama…'),
      response('rewrite2', 'Durum 2 için yeni cümle', 'Duygunu ve beklentini açıkla…'),
    ], 'Kitapta ben dili örnekleri ve iletişim durumları üzerinde duruluyor.')),

    week(4, '5–9 Eki', 'together', 'Gruplarda anlaşmazlıkları yapıcı çözme', 'Ortak bir çözüm ararken dinleme, sıra alma ve uzlaşma yollarını kullan.', [
      'Yarım bırakılmış grup durumunda iki olası devam yolu ve sonuçlarını tahmin et.',
      'Davranış kartlarını yapıcı veya gerilimi artıran biçimde sınıflandır; seçtiğin birini gerekçelendir.',
      'Tarafların ihtiyaçlarını gözeten, adil ve uygulanabilir bir ortak çözüm tasarla.',
    ], activity('Kontrol listesi', 'Yapıcı iletişim kontrolü', 'Bir grup kararını vermeden önce aşağıdaki iletişim adımlarını uygula.', [
      checklistField('steps', 'Tamamladığın adımlar', [
        { id: 'listen', label: 'Her kişinin görüşünü sözünü kesmeden dinledim.' },
        { id: 'clarify', label: 'Anlamadığım yerde açıklayıcı soru sordum.' },
        { id: 'options', label: 'Birden fazla çözüm seçeneği düşündüm.' },
        { id: 'fair', label: 'Kararın herkes için adil olup olmadığını kontrol ettim.' },
      ]),
      response('reflection', 'En işe yarayan adım hangisiydi?', 'Nedenini kısaca yaz…', 'textarea', 8),
    ], 'Kitabın iletişim becerileri ve günlük yaşam örnekleriyle uyumlu öz kontrol.')),

    week(5, '12–16 Eki', 'together', 'Özel gereksinimli bireyler için fırsat eşitliği', 'Erişimi zorlaştıran engelleri fark et ve eşit katılımı destekleyen fikirler üret.', [
      'Fırsat eşitliğini anlatan özgün durumu oku; engelin kişiden mi, çevre/süreçten mi kaynaklandığını incele.',
      'Kartları çevresel engel veya katılımı destekleyen düzenleme olarak sınıflandır.',
      'Beyin yazımıyla üç fikir üret; birini ilgili kişilerin görüşü ve ilk deneme adımıyla geliştir.',
    ], activity('Beyin yazımı', 'Fırsat eşitliği için fikir üret', 'Özel gereksinimli bireylerin okul ve toplum etkinliklerine eşit katılımı için birbirinden farklı fikirler yaz.', [
      response('idea1', 'Fikir 1', 'Mekân, iletişim veya etkinlik düzeniyle ilgili…', 'textarea', 8),
      response('idea2', 'Fikir 2', 'Bir arkadaşının fikrini geliştir…', 'textarea', 8),
      response('idea3', 'Fikir 3', 'Uygulanması kolay bir öneri ekle…', 'textarea', 8),
    ], 'Kitaptaki “Fırsat Eşitliği İçin Fikir Üretiyoruz” beyin yazımı biçiminden esinlenir.')),

    week(6, '19–23 Eki', 'together', 'Erişilebilir çevre ve eşit katılım', 'Fırsat eşitliğinin yalnızca niyetle değil, erişilebilir düzenlemelerle desteklendiğini açıkla.', [
      'Fiziksel erişim, bilgiye erişim ve iletişim/katılım düzenlemelerini eşleştir.',
      'Okul sergisi örneğinde katılımı artıracak düzenlemeleri seç ve birini gerekçelendir.',
      'Okul veya mahalleden bir alanı kontrol listesiyle inceleyip geliştirilecek bir nokta öner.',
    ], activity('Sorun–çözüm tablosu', 'Engeli ve çözümü eşleştir', 'Bir çevresel engeli, çözüm fikrini ve çözümün sağlayacağı katkıyı eşleştir.', [
      response('barrier', 'Gözlenen veya düşünülen engel', 'Örn. bilgiye erişim, fiziksel ortam…', 'textarea', 8),
      response('solution', 'Eşit katılım için düzenleme', 'Kim, neyi değiştirebilir?', 'textarea', 8),
      response('benefit', 'Beklenen katkı', 'Bu düzenleme katılımı nasıl artırır?', 'textarea', 8),
    ], 'Kitaptaki fırsat eşitliği ve proje hazırlığı etkinliklerine dayalı özgün tablo.')),

    week(7, '26–30 Eki', 'together', 'Engelsiz yaşam için küçük bir proje', 'Fırsat eşitliğini destekleyen bir fikri hedef, görev ve kontrol adımlarıyla planla.', [
      'Eşit katılımla ilgili bir ihtiyacı gözlem veya görüşe dayandırarak tanımla.',
      'Proje hedefini, ilk adımı, sorumluları ve beklenen değişimi planla.',
      'Proje adımlarını planla/uygula/gözden geçir olarak sırala ve taslağı kontrol et.',
    ], activity('Proje taslağı ve kontrol listesi', 'Engelsiz yaşam proje kartı', 'Okulda ya da mahallede erişimi ve katılımı artıracak küçük, uygulanabilir bir proje taslağı hazırla.', [
      response('need', 'İhtiyaç / hedef', 'Hangi katılım engelini azaltmak istiyorsun?', 'textarea', 8),
      response('action', 'Yapılacak iş ve sorumlular', 'İlk adımı ve kimlerin katkı sunacağını yaz…', 'textarea', 8),
      checklistField('review', 'Taslağını kontrol et', [
        { id: 'inclusive', label: 'Önerim ilgili kişilerin görüşünü gözetiyor.' },
        { id: 'feasible', label: 'Önerim uygulanabilir bir ilk adım içeriyor.' },
        { id: 'safe', label: 'Önerim güvenli ve saygılı bir uygulama içeriyor.' },
      ]),
    ], 'Kitaptaki Engelsiz Yaşam proje taslağı ve kontrol listesi biçiminden esinlenir.')),

    week(8, '2–6 Kas', 'together', 'Millî mesele ve ortak değerler', 'Toplumun tamamını ilgilendiren konularda ortak değer, dayanışma ve sorumluluğun anlamını açıkla.', [
      'Ortak değerler üzerine en az üç sözcüklü kelime bulutu oluştur ve birini günlük örnekle açıkla.',
      'Değer kavramlarını somut günlük katkı davranışlarından ayır.',
      'Verilen ortak yaşam durumlarından birini seçip farklı ve sorumlu katkı fikirleri üret.',
    ], activity('Kelime bulutu', 'Ortak değerler kelime bulutu', 'Millî meselelerde toplumu bir arada tutan kavramları düşün; en az üç anahtar sözcük ekle.', [
      wordField('words', 'Anahtar sözcükler', 'Örn. dayanışma, sorumluluk, bağımsızlık…'),
      response('meaning', 'Seçtiğin bir sözcüğün önemi', 'Bu sözcük birlik ve beraberliğe nasıl katkı sağlar?', 'textarea', 8),
    ], 'Kitapta millî birlik ve beraberlik için kelime bulutu etkinliği kullanılıyor.')),

    week(9, '9–13 Kas', 'together', 'Millî günler, bayrak ve ortak hafıza', 'Ulusal bayramların ve anma günlerinin toplumdaki ortak anlamını gerekçelendir.', [
      'Ulusal bayram ve anma günü kartlarını sınıflandır; bir tarihin anlamını kaynaktan doğrula.',
      'Bayrağın ortak sembol olarak anlamı üzerine tahminlerini yaz ve güvenilir kaynakla kontrol et.',
      'Ortak hafıza örneğine özgün slogan ve gerekçe yaz; farklı katılım biçimlerini değerlendir.',
    ], activity('Beyin fırtınası', 'Ortak günler neden önemlidir?', 'Bayram, anma ve ortak sembollerin toplumsal birlik duygusuna katkısı hakkında fikir üret.', [
      response('idea1', 'İlk düşüncem', 'Bir toplumsal katkı yaz…', 'textarea', 8),
      response('idea2', 'Başka bir bakış açısı', 'Bir kişinin ya da grubun deneyimini düşün…', 'textarea', 8),
      response('reason', 'Gerekçem', 'Düşünceni bir örnekle açıkla…', 'textarea', 8),
    ], 'Kitaptaki ulusal bayramlar ve bayrakla ilgili beyin fırtınası biçiminden esinlenir.')),

    week(10, '23–27 Kas', 'together', 'Millî Mücadele’de birlik ve dayanışma', 'Tarihî kaynaklardan hareketle ortak amaç ve dayanışmanın mücadeleye katkısını çıkar.', [
      'Özgün Millî Mücadele açıklamasını oku; tarihî bilgi ile çıkarımı ayır.',
      'Katkı kartlarını maddi destek, ulaşım/haberleşme veya örgütlenme olarak sınıflandır.',
      'Ders kitabındaki bir tarihî kaynağı kanıt/çıkarım tablosuyla incele.',
    ], activity('Kaynak inceleme ve tablo', 'Kanıttan çıkarıma', 'Bir tarihî kaynak ya da sınıf notundan hareketle kanıtı ve bu kanıttan çıkardığın sonucu tabloya yaz.', [
      response('source', 'İncelediğim kaynak', 'Kaynağın türü ve konusu…', 'text'),
      response('evidence', 'Kaynakta gördüğüm kanıt', 'Bir olay, davranış veya bilgi…', 'textarea', 8),
      response('inference', 'Bu kanıttan çıkardığım sonuç', 'Birlik ya da dayanışma hakkında…', 'textarea', 8),
    ], 'Kitaptaki yazılı/görsel/dijital kaynağı inceleyip tablo doldurma biçiminden esinlenir.')),

    week(11, '30 Kas–4 Ara', 'together', 'Millî konularda toplumsal dayanışma', 'Afet, bilim, sanat ve spor örneklerinde ortak çaba ile toplumsal katkı arasındaki ilişkiyi karşılaştır.', [
      'Afet, bilim/sağlık, kültür/sanat ve spor alanlarından dört örneği aynı ölçütle karşılaştır.',
      'Katkı kartlarını en çok ilişkili olduğu toplumsal alana göre sınıflandır.',
      'Ders kitabı veya onaylı kaynaktan örnek seçip kısa dayanışma raporu hazırla.',
    ], activity('Karşılaştırma tablosu', 'Farklı alanlarda ortak çaba', 'İki farklı toplumsal örneği katkı ve ortak yarar bakımından karşılaştır.', [
      response('example1', 'Örnek 1 ve katkı', 'Bir afet, bilim, sanat ya da spor örneği…', 'textarea', 8),
      response('example2', 'Örnek 2 ve katkı', 'Başka bir alandan örnek…', 'textarea', 8),
      response('compare', 'Ortak yön / fark', 'İki örneğin toplumsal katkısını karşılaştır…', 'textarea', 8),
    ], 'Kitaptaki farklı alanlardan millî mesele örneklerini inceleme yaklaşımına dayanır.')),

    week(12, '7–11 Ara', 'together', 'Birlikte Yaşamak · öğrenme alanı tekrarı', 'İletişim, fırsat eşitliği ve millî meseleler arasında bağlantı kur; öğrenmeni öz değerlendir.', [
      'İletişim, fırsat eşitliği ve dayanışma kartlarını ilgili konu başlığıyla eşleştir.',
      'Tekrar sorularında çoktan seçmeli ve çoklu seçim yanıtlarını kontrol et.',
      'Açıklamalı kavram haritası ve öz değerlendirmeyle sonraki çalışma adımını belirle.',
    ], activity('Kavram haritası', 'Birlikte yaşama kavram haritası', 'Üç konu başlığını örneklerle birbirine bağlayan kısa bir kavram haritası taslağı oluştur.', [
      response('communication', 'İletişim → birlikte yaşama', 'İletişim hangi davranışla güçlenir?', 'textarea', 8),
      response('equality', 'Fırsat eşitliği → katılım', 'Eşit katılımı hangi düzenleme destekler?', 'textarea', 8),
      response('solidarity', 'Millî mesele → dayanışma', 'Ortak sorumluluğa bir örnek…', 'textarea', 8),
      response('connection', 'Üç başlık arasındaki bağ', 'Ortak nokta nedir?', 'textarea', 8),
    ], 'Kitaptaki öğrenme alanı özetleri ve kavram çalışmalarıyla uyumlu tekrar.')),

    week(13, '14–18 Ara', 'world', 'Küreselleşme ve günlük yaşam', 'Küreselleşmenin insan ve toplum hayatındaki etkilerini günlük örneklerle fark et.', [
      'Günlük hayatta farklı yerlerle bağlantı kurduğun üç örnek belirle.',
      'Bu örneklerden birinin iletişim, tüketim veya kültürle bağını açıkla.',
      'Küreselleşme konusuna ait üç anahtar sözcük seç.',
    ], activity('Kelime bulutu', 'Dünyayı birbirine bağlayan sözcükler', 'Küreselleşme ve günlük yaşam ilişkisini anlatan en az üç anahtar sözcük ekle.', [
      wordField('words', 'Anahtar sözcükler', 'Örn. iletişim, ticaret, kültür…'),
      response('example', 'Bir günlük yaşam örneği', 'Bu örnekte uzak yerler nasıl bağlantı kuruyor?', 'textarea', 8),
    ], 'Kitapta üniteye girişte anahtar sözcüklerden kelime bulutu oluşturma örneği görülüyor.')),

    week(14, '21–25 Ara', 'world', 'Küreselleşmenin insan ve toplum hayatına etkileri', 'Küresel bağlantıların günlük yaşamdaki olumlu ve zorlayıcı etkilerini örneklerle tartış.', [
      'Küresel bir bağlantının hayatını kolaylaştırdığı bir örnek düşün.',
      'Aynı bağlantının oluşturabileceği bir güçlüğü de belirle.',
      'Örneklerini bir gerekçeyle aileden biriyle paylaş.',
    ], activity('Beyin fırtınası', 'Etkileri birlikte düşün', 'Küreselleşmenin farklı gruplar üzerindeki etkileri için artı ve dikkat edilmesi gereken yönleri üret.', [
      response('positive', 'Olumlu etkiye örnek', 'Kim, hangi açıdan yarar görüyor?', 'textarea', 8),
      response('challenge', 'Zorlayıcı etkiye örnek', 'Kim, hangi güçlükle karşılaşabilir?', 'textarea', 8),
      response('idea', 'Daha bilinçli davranmak için öneri', 'Önerini bir gerekçeyle açıkla…', 'textarea', 8),
    ], 'Kitaptaki küreselleşme konusu etrafında fikir üretme biçiminden esinlenir.')),

    week(15, '28–31 Ara', 'world', 'Küresel bağlantılar: fırsatlar ve sorumluluklar', 'Bilgi, ürün ve kültürel içerik dolaşımının farklı sonuçlarını kanıt ve örnekle değerlendir.', [
      'Bir ürün, haber veya kültürel içeriğin farklı ülkelerle bağlantısını araştır.',
      'Bu bağlantının kimlere nasıl katkı sağladığını belirle.',
      'Daha adil ve bilinçli bir tercih için bir öneri yaz.',
    ], activity('Etki tablosu', 'Bir bağlantının farklı sonuçları', 'Seçtiğin bir günlük yaşam örneğinin farklı gruplar ve alanlar üzerindeki etkisini tabloya dönüştür.', [
      response('example', 'İncelediğim örnek', 'Ürün, iletişim aracı, bilgi veya kültür…', 'text'),
      response('benefit', 'Olası katkı', 'Kimler, hangi açıdan yararlanıyor?', 'textarea', 8),
      response('responsibility', 'Dikkat edilmesi gereken yön', 'Adil, güvenli ya da bilinçli kullanım için…', 'textarea', 8),
    ], 'Kitaptaki insan ve toplum hayatına etkileri inceleme yaklaşımına dayalı özgün tablo.')),

    week(16, '4–8 Oca', 'world', 'Bölgesel ve küresel sorunları ayırt etme', 'Bir sorunun etki alanını, ilgili toplulukları ve çözüm için gereken iş birliğini belirle.', [
      'Bir bölgesel sorun ve bir küresel sorun örneği seç.',
      'Her birinden etkilenen kişi veya grupları belirle.',
      'Sorunların sınırları aşan yönünü bir cümleyle açıkla.',
    ], activity('Sınıflandırma tablosu', 'Sorun nerede başlıyor, kimi etkiliyor?', 'Seçtiğin örnekleri etki alanı ve iş birliği ihtiyacı bakımından karşılaştır.', [
      response('regional', 'Bölgesel sorun örneği ve etki alanı', 'Yakın çevre/komşu bölgeler ölçeğini düşün…', 'textarea', 8),
      response('global', 'Küresel sorun örneği ve etki alanı', 'Birçok ülkeyi etkileyen yönü belirt…', 'textarea', 8),
      response('cooperation', 'Neden iş birliği gerekir?', 'Sorun tek bir yerde çözülür mü?', 'textarea', 8),
    ], 'Kitaptaki bölgesel/küresel sorunları kaynaklardan inceleme ve tabloya aktarma biçiminden esinlenir.')),

    week(17, '11–15 Oca', 'world', 'Bölgesel ve küresel sorunlara ortak çözümler', 'Çözüm önerilerinde birey, kurum ve ülkelerin sorumluluklarını ilişkilendir.', [
      'Seçtiğin bir bölgesel ya da küresel sorun için güvenilir bir bilgi kaynağı incele.',
      'Sorunla mücadele edebilecek iki paydaşı belirle.',
      'Bireysel bir adım ile ortak bir adımı ayırt et.',
    ], activity('Kavram haritası', 'Sorundan iş birliğine', 'Sorun, etkilenenler, ortak çalışma ve beklenen sonuç arasındaki bağlantıları kur.', [
      response('problem', 'Sorun ve etkilenenler', 'Sorun kimleri, nasıl etkiliyor?', 'textarea', 8),
      response('partners', 'Birlikte çalışabilecek taraflar', 'Birey, kurum, yerel yönetim veya ülke…', 'textarea', 8),
      response('action', 'Ortak eylem', 'İş birliğiyle hangi adım atılabilir?', 'textarea', 8),
      response('result', 'Beklenen sonuç', 'Başarı nasıl anlaşılır?', 'textarea', 8),
    ], 'Kitaptaki kavram haritası ve bölgesel/küresel sorunları ilişkilendirme çalışmalarıyla uyumludur.')),

    week(18, '18–22 Oca', 'world', 'Türkiye’nin bölgesel ve küresel sorunlardaki rolü', 'Diplomasi, insani yardım ve uluslararası iş birliği örneklerinde Türkiye’nin katkısını değerlendir.', [
      'Kitapta ya da öğretmenin verdiği kaynakta Türkiye’nin bir katkı örneğini incele.',
      'Katkının hangi ihtiyaca veya soruna karşılık geldiğini belirle.',
      'Evimiz Dünya öğrenme alanını kısa bir öz değerlendirmeyle tamamla.',
    ], activity('Çözüm planı ve öz değerlendirme', 'Katkıdan sonuca', 'Bir sorun ve Türkiye’nin katkı örneği üzerinden amaç, eylem ve beklenen sonucu açıkla.', [
      response('need', 'Ele alınan ihtiyaç', 'Bölgesel ya da küresel sorun…', 'textarea', 8),
      response('contribution', 'Katkı / iş birliği örneği', 'Diplomasi, yardım veya ortak çalışma…', 'textarea', 8),
      response('result', 'Beklenen sonuç ve gerekçem', 'Bu katkı neden önemlidir?', 'textarea', 8),
    ], 'Kitaptaki Türkiye’nin rolünü değerlendirme ve açık uçlu sorulara yanıt verme biçiminden esinlenir.')),

    week(19, '8–12 Şub', 'heritage', 'Malazgirt sonrası Anadolu ve Türk beylikleri', 'Haritalardan yararlanarak Anadolu’nun siyasi yapısındaki değişimi ve beyliklerin katkısını açıkla.', [
      'Kitaptaki Malazgirt öncesi ve sonrası haritaları karşılaştır.',
      'Haritada değişen siyasi yapıya dair iki gözlem yaz.',
      'Türk beyliklerinin Anadolu’daki yerleşime katkısına bir örnek bul.',
    ], activity('Harita inceleme', 'Haritadan değişimi oku', 'Haritada gördüğün bilgiyi, değişimi ve bundan çıkardığın sonucu ayrı ayrı kaydet.', [
      response('observation', 'Haritada gördüğüm değişim', 'Bölge, yerleşim veya siyasi yapı…', 'textarea', 8),
      response('evidence', 'Gözlemimi destekleyen işaret', 'Harita başlığı, sınır veya lejant…', 'textarea', 8),
      response('inference', 'Beyliklerin katkısına ilişkin çıkarım', 'Harita ve metin bilgilerini ilişkilendir…', 'textarea', 8),
    ], 'Kitaptaki Malazgirt öncesi/sonrası harita inceleme etkinliğinin özgün uyarlamasıdır.')),

    week(20, '15–19 Şub', 'heritage', 'Osmanlı Beyliği’nin kuruluş yeri ve GZFT', 'Kuruluş konumunun güçlü/zayıf yönlerini, fırsat ve tehditlerini coğrafi kanıtla değerlendir.', [
      'Kitaptaki Anadolu beylikleri haritasında Osmanlı Beyliği’nin konumunu bul.',
      'Konumun sağlayabileceği iki olanağı ve bir güçlüğü düşün.',
      'GZFT notlarını haritadaki bir gözlemle destekle.',
    ], activity('GZFT analizi', 'Konumun güçlü ve zayıf yönleri', 'Osmanlı Beyliği’nin kuruluş yeriyle ilgili dört GZFT başlığını kendi harita gözlemlerine dayanarak doldur.', [
      response('strength', 'Güçlü yön', 'Konumun sağladığı bir avantaj…', 'textarea', 8),
      response('weakness', 'Zayıf yön', 'Küçük bir beylik olmanın getirdiği bir sınırlılık…', 'textarea', 8),
      response('opportunity', 'Fırsat', 'Çevredeki gelişmelerden yararlanma olanağı…', 'textarea', 8),
      response('threat', 'Tehdit', 'Beyliği zorlayabilecek bir durum…', 'textarea', 8),
    ], 'Kitapta Osmanlı Beyliği’nin konumu için GZFT formu doldurma etkinliği yer alıyor.')),

    week(21, '22–26 Şub', 'heritage', 'Osmanlı’nın büyüme politikaları', 'Gaza, fetih, iskân ve istimalet kavramlarını örneklerle ilişkilendir; tek nedenli açıklamadan kaçın.', [
      'Kitaptaki anahtar kavramların anlamlarını sözlük veya ders notundan kontrol et.',
      'Bir büyüme politikasını kitapta verilen bir örnekle eşleştir.',
      'Politikaların etkisini kısa bir gerekçeyle açıkla.',
    ], activity('Kavram kartları ve ilişki tablosu', 'Kavramdan tarihî etkiye', 'Her kavram için kitaptaki örneği ve bu politikanın devletin gelişimine sağlayabileceği katkıyı not et.', [
      response('concepts', 'Kavram – kitap örneği – olası katkı', 'Gaza, fetih, iskân veya istimalet kavramlarından en az ikisini ele al…', 'textarea', 14),
      response('evidence', 'Kullandığım kanıt', 'Kitap haritası, metni veya ders notundan…', 'textarea', 8),
    ], 'Kitaptaki anahtar kavramlar ve farklı dönemleri metin/harita üzerinden inceleme biçiminden esinlenir.')),

    week(22, '1–5 Mar', 'heritage', 'Osman Bey’den Orhan Bey’e: ilk genişleme', 'Kuruluş dönemindeki gelişmeleri zaman sırasıyla düzenle; coğrafya ve teşkilatlanma bağını kur.', [
      'Osman Bey ve Orhan Bey dönemlerine ait kitaptaki bilgileri gözden geçir.',
      'En az üç gelişmeyi tarih sırasına koy.',
      'Bir gelişmenin büyümeye katkısını bir cümleyle açıkla.',
    ], activity('Zaman çizelgesi', 'İlk gelişmeleri sırala', 'Kitapta karşılaştığın olayları kronolojik sıraya koy ve aralarındaki bağı açıkla.', [
      response('timeline', 'En az üç gelişme ve sıraları', '1) …  2) …  3) …', 'textarea', 14),
      response('turningPoint', 'Önemli bulduğum gelişme', 'Bu gelişmeyi neden dönüm noktası seçtin?', 'textarea', 8),
    ], 'Kitaptaki dönemlere ait metin ve haritaları inceleme görevinden hareketle hazırlanmıştır.')),

    week(23, '15–19 Mar', 'heritage', 'Balkanlarda genişleme ve devletin güçlenmesi', 'Orhan Bey ve I. Murad dönemlerinden örneklerle fetih, teşkilatlanma ve siyasi gelişmeleri ilişkilendir.', [
      'Kitaptaki ilgili dönem metninden önemli bilgileri seç.',
      'Bir harita ya da metin kanıtını dönem bilgisiyle eşleştir.',
      'Fetihlerin yanı sıra idari ve ekonomik gelişmeleri de göz önüne al.',
    ], activity('Kaynak inceleme tablosu', 'Dönem bilgisini kanıtla destekle', 'Bir dönem metni veya harita işareti seç; ne gösterdiğini ve hangi çıkarımı desteklediğini yaz.', [
      response('source', 'İncelediğim kaynak / dönem', 'Metin, harita veya görsel…', 'text'),
      response('evidence', 'Kaynakta gördüğüm bilgi', 'Bir gelişme ya da konum…', 'textarea', 8),
      response('inference', 'Büyümeye katkısı', 'Siyasi, askerî, idari ya da ekonomik açıdan…', 'textarea', 8),
    ], 'Kitaptaki harita ve metinleri kanıta dayalı yorumlama etkinliklerinden esinlenir.')),

    week(24, '22–26 Mar', 'heritage', 'İstanbul’un fethi: nedenler ve hazırlıklar', 'Fetih kararını, hazırlıkları ve sonuçları neden–sonuç ilişkisi içinde açıkla.', [
      'Kitaptaki fetih nedenleri ile hazırlıklar bölümünü oku.',
      'Bir nedeni, buna karşılık gelen hazırlıkla eşleştir.',
      'Fetih sonrasında meydana gelen bir değişimi belirt.',
    ], activity('Neden–sonuç tablosu', 'Bir hedefe yönelik hazırlıklar', 'İstanbul’un fethine ilişkin neden, hazırlık ve sonuçları birbiriyle bağlantılı şekilde kaydet.', [
      response('reason', 'Fetih nedenlerinden biri', 'Siyasi, ekonomik veya stratejik bir gerekçe…', 'textarea', 8),
      response('preparation', 'Bu nedenle yapılan hazırlık', 'Hazırlık, seçtiğin nedenle nasıl ilişkili?', 'textarea', 8),
      response('result', 'Bir sonuç ve etkisi', 'Siyasi, askerî ya da ekonomik bir değişim…', 'textarea', 8),
    ], 'Kitaptaki İstanbul’un fethi nedenleri ve hazırlıkları hakkındaki metin/harita çalışmalarına dayanır.')),

    week(25, '29 Mar–2 Nis', 'heritage', 'Yavuz Sultan Selim ve Kanuni dönemlerinde genişleme', 'Harita, ticaret yolları ve siyasi gelişmelerden yararlanarak Osmanlı’nın geniş coğrafyadaki konumunu yorumla.', [
      'Kitaptaki Yavuz Sultan Selim ve Kanuni Sultan Süleyman dönemlerini karşılaştır.',
      'Bir harita üzerinde yön, bölge veya ticaret yolu bilgisini göster.',
      'Geniş coğrafyanın siyasi ya da ekonomik etkisini açıkla.',
    ], activity('Harita ve karşılaştırma tablosu', 'Coğrafya, ticaret ve güç', 'İki dönemden seçtiğin gelişmeleri coğrafi konum ve olası etkileri bakımından karşılaştır.', [
      response('selim', 'Yavuz Sultan Selim dönemi', 'Bir genişleme veya ticaret bağlantısı…', 'textarea', 8),
      response('suleyman', 'Kanuni Sultan Süleyman dönemi', 'Bir genişleme veya deniz/ticaret bağlantısı…', 'textarea', 8),
      response('compare', 'Ortak yön / fark', 'Harita veya metinden dayanak ekle…', 'textarea', 8),
    ], 'Kitaptaki dönem haritaları, politikalar ve kaynak yorumlama biçimlerinden esinlenir.')),

    week(26, '5–9 Nis', 'heritage', 'Büyük deniz seyahatleri ve Osmanlı ekonomisi', 'Harita ve metinlerden yararlanarak deniz yollarındaki değişimin ticaret güzergâhları ve Osmanlı ekonomisi üzerindeki etkisini değerlendir.', [
      'Kitaptaki büyük deniz seyahatleri bölümünü ve ilgili harita/görseli incele.',
      'Değişen güzergâhların hangi ticaret bağlantılarını etkilediğini not et.',
      'Osmanlı ekonomisine etkisi hakkındaki çıkarımını bir kaynak ipucuyla destekle.',
    ], activity('Harita inceleme ve neden–sonuç tablosu', 'Deniz yollarındaki değişimin etkisi', 'Kaynakta gösterilen güzergâh değişimini ticaretle ilişkilendir; ekonomik etki hakkındaki görüşünü bir kanıt ve gerekçeyle açıkla.', [
      response('route', 'Haritada fark ettiğim güzergâh değişimi', 'Bir rota, liman veya bağlantı…', 'textarea', 8),
      response('trade', 'Ticaret üzerindeki olası sonuç', 'Kaynağa dayanarak ne değişmiş olabilir?', 'textarea', 8),
      response('ottoman', 'Osmanlı ekonomisine etkisi', 'Kitaptaki soru/kanıttan hareketle çıkarımını gerekçelendir…', 'textarea', 8),
    ], 'Kitabın büyük deniz seyahatlerinin Osmanlı ekonomisine etkisini kaynak bilgisiyle değerlendirme sorusundan esinlenir.')),

    week(27, '12–16 Nis', 'heritage', 'Rönesans ve Osmanlı Devleti’ne yansımaları', 'Avrupa’daki bilimsel ve teknik gelişmelerle Osmanlı’daki yenilik arayışı arasındaki ilişkiyi açıkla.', [
      'Kitaptaki Rönesans ve Osmanlı üzerindeki etkiler bölümünü oku.',
      'Bilim, teknik veya sanat alanından bir değişim seç.',
      'Seçtiğin değişim hakkında bir soru üretip kendi cümlenle yanıtla.',
    ], activity('Soru–cevap', 'Rönesans bağlantısını açıkla', 'Konuya ilişkin bir soru yaz; cevabında Avrupa’daki değişim ile Osmanlı’daki karşılığı arasında bağlantı kur.', [
      response('question', 'Hazırladığım soru', 'Bir neden, etki veya karşılaştırma sorusu…', 'textarea', 8),
      response('answer', 'Kendi cümlelerimle yanıt', 'Kitaptaki bilgiden bir dayanak kullan…', 'textarea', 14),
    ], 'Kitapta Rönesans’ın Osmanlı üzerindeki etkileri için soru hazırlayıp cevaplama örneği var.')),

    week(28, '19–23 Nis', 'heritage', 'Reform: Avrupa’da düşünce ve inanç alanındaki değişim', 'Reform hareketlerinin neden ve sonuçlarını Avrupa ve Osmanlı üzerindeki etkileriyle ilişkilendir.', [
      'Kitaptaki Reform nedenlerini ve gelişmelerini gözden geçir.',
      'Avrupa’daki sonuçlardan biriyle Osmanlı üzerindeki etkiler hakkındaki bilgiyi karşılaştır.',
      'Bir sonucu zaman, neden ve etkisiyle kısa bir haber taslağında anlat.',
    ], activity('Kısa haber metni', 'Reform dönemini haberleştir', 'Reform dönemindeki bir gelişmeyi, zamanını, nedenini ve dikkat çekici sonucunu içeren özgün bir haber taslağıyla anlat.', [
      response('headline', 'Kısa başlık', 'Haberi özetleyen bir başlık…', 'text'),
      response('event', 'Ne zaman ve ne oldu?', 'Olayı kendi cümlelerinle anlat…', 'textarea', 8),
      response('effect', 'Avrupa / Osmanlı açısından etkisi', 'En az bir sonucu kaynak bilgisiyle ilişkilendir…', 'textarea', 8),
    ], 'Kitaptaki Reform’un Avrupa’daki etkilerini haber metniyle anlatma etkinliğinden esinlenir.')),

    week(29, '26–30 Nis', 'heritage', 'Aydınlanma Çağı: akıl, bilim ve sonuçları', 'Aydınlanma düşüncesindeki akıl, gözlem ve deney vurgusunu sonuçlarıyla ilişkilendir.', [
      'Kitaptaki Aydınlanma Çağı açıklamasını oku.',
      'Dönemin düşünce anlayışını gösteren üç kavram seç.',
      'Bilimsel düşüncenin daha sonraki gelişmelere nasıl zemin hazırladığını açıkla.',
    ], activity('Neden–sonuç tablosu', 'Düşünceden toplumsal değişime', 'Aydınlanma Çağı’nın nedenlerini ve sonuçlarını kitaptaki bilgilerle ilişkilendir.', [
      response('causes', 'Ortaya çıkış koşulları', 'Akıl, gözlem, deney veya önceki düşünsel gelişmeler…', 'textarea', 8),
      response('results', 'Düşünce ve toplumdaki sonuçlar', 'Bilim, özgürlük, yönetim ya da teknoloji…', 'textarea', 8),
      response('legacy', 'Sonraki gelişmelere etkisi', 'Bir bağlantıyı neden–sonuçla açıkla…', 'textarea', 8),
    ], 'Kitaptaki Aydınlanma Çağı için neden ve sonuçları tabloyla tamamlama örneğine dayanır.')),

    week(30, '3–7 May', 'heritage', 'Sanayi İnkılabı ve üretim biçimindeki değişim', 'Makineleşmenin üretim, şehirleşme, çalışma hayatı ve Osmanlı ekonomisi üzerindeki etkilerini açıkla.', [
      'Kitaptaki Sanayi İnkılabı bölümünü oku.',
      'El üretimi ile makineleşmiş üretim arasında en az iki fark belirle.',
      'Bu dönüşümün toplumsal veya ekonomik bir sonucunu açıkla.',
    ], activity('Neden–sonuç tablosu ve anahtar sözcükler', 'Üretimde dönüşüm', 'Makineleşmenin üretimden topluma uzanan etkilerini neden ve sonuçlarıyla düzenle.', [
      response('innovation', 'Teknik değişim', 'Üretimde ne değişti?', 'textarea', 8),
      response('production', 'Üretime etkisi', 'Miktar, maliyet veya iş düzeni…', 'textarea', 8),
      response('society', 'Topluma / Osmanlı’ya etkisi', 'Kentleşme, çalışma hayatı veya yerli üretim…', 'textarea', 8),
    ], 'Kitapta Sanayi İnkılabı için neden–sonuç ve boşluk tamamlama etkinlikleri görülüyor.')),

    week(31, '10–14 May', 'heritage', 'Değişen dünya karşısında Osmanlı yenilikleri', 'Osmanlı Devleti’nin yenilik arayışlarını dönemin gelişmeleri ve karşılaşılan ihtiyaçlarla ilişkilendir.', [
      'Kitabın “Osmanlı Devleti’nin uygulamaya koyduğu yenilikler” bölümünü oku.',
      'Yeniliklerden birini alanı ve amacıyla birlikte not et.',
      'Değişen dünya koşullarının bu yenilik ihtiyacını nasıl etkilediğini açıkla.',
    ], activity('Karşılaştırma tablosu', 'İhtiyaç, yenilik ve amaç', 'Kitapta verilen bir yenilik örneğini, ortaya çıkış ihtiyacı ve hedeflediği değişimle eşleştir.', [
      response('need', 'Dönemin ihtiyacı', 'Askerî, teknik, eğitim veya yönetim alanından…', 'textarea', 8),
      response('innovation', 'Uygulanan yenilik', 'Kitapta gördüğün örnek…', 'textarea', 8),
      response('purpose', 'Amaç ve beklenen etki', 'Yenilik hangi soruna yanıt vermeyi hedefledi?', 'textarea', 8),
    ], 'Kitaptaki yenilikleri neden ve sonuçlarıyla yorumlama hedefiyle uyumludur.')),

    week(32, '20–21 May', 'heritage', 'Osmanlı yeniliklerini neden ve sonuçlarıyla yorumlama', 'Bir yeniliğin amacını, uygulama alanını ve sonucunu kaynak bilgisiyle değerlendir.', [
      'Önceki haftada seçtiğin yenilik örneğini yeniden incele.',
      'Beklenen etki ile kitaptaki sonucu birbirinden ayır.',
      'Yeniliğin kalıcılığını etkileyebilecek bir koşul düşün.',
    ], activity('Kaynak analizi ve neden–sonuç tablosu', 'Yeniliğin etkisini değerlendir', 'Kitap metni veya görselinden kanıt seç; yeniliğin amacı ve sonucu hakkında ölçülü bir çıkarım yap.', [
      response('source', 'Kaynakta seçtiğim kanıt', 'Metin, tablo veya görseldeki bilgi…', 'textarea', 8),
      response('intended', 'Hedeflenen değişim', 'Yenilikle neyin değişmesi amaçlanmış?', 'textarea', 8),
      response('outcome', 'Sonuç ve değerlendirmem', 'Başarıyı etkileyen bir neden ekle…', 'textarea', 8),
    ], 'Kitaptaki kaynak inceleme ve yeniliklerin neden/sonuçlarını yorumlama yaklaşımından esinlenir.')),

    week(33, '24–28 May', 'heritage', 'Osmanlı kültür ve medeniyetinden izler', 'Eğitim, hukuk, sanat ve gündelik yaşama ilişkin kültürel unsurları kavramlarla ifade et.', [
      'Kitabın “Osmanlı Kültür ve Medeniyeti” bölümünden bir alt başlık seç.',
      'Seçtiğin başlığa ait üç anahtar kavram çıkar.',
      'Bir kültürel unsurun toplumsal yaşamdaki işlevini açıkla.',
    ], activity('Kelime bulutu', 'Kültür ve medeniyet sözcükleri', 'Kitaptaki bölümden seçtiğin kavramlarla bir kelime bulutu oluştur; ardından bir kavramı açıkla.', [
      wordField('words', 'Anahtar sözcükler', 'Örn. eğitim, hukuk, sanat, mimari…'),
      response('meaning', 'Seçtiğim kavramın anlamı / işlevi', 'Kitaptaki örnekle ilişkilendir…', 'textarea', 8),
    ], 'Kitapta öğrenme alanı başlıklarında ve önceki konularda kelime bulutu biçimi kullanılıyor.')),

    week(34, '31 May–4 Haz', 'heritage', 'Kültürel miras için araştırma raporu', 'Güvenilir kaynaklardan bilgi topla; sorunu, kanıtı ve sonucu anlaşılır biçimde sun.', [
      'Osmanlı kültür ve medeniyetinden merak ettiğin bir konu belirle.',
      'Kitap veya öğretmenin önerdiği güvenilir bir kaynakta kanıt ara.',
      'Bilgiyi kendi cümlelerinle kısa bir rapor hâline getir.',
    ], activity('Soru kartı ve araştırma raporu', 'Küçük araştırma raporum', 'Merak ettiğin bir kültür/medeniyet unsuruna soru üret; kaynağını ve ulaştığın sonucu kaydet.', [
      response('question', 'Araştırma sorum', 'Dar, anlaşılır ve araştırılabilir bir soru…', 'textarea', 8),
      response('source', 'Kullandığım kaynak', 'Kitap, ders notu veya öğretmen önerisi…', 'text'),
      response('evidence', 'Kaynakta bulduğum bilgi', 'Kendi cümlelerinle kısa not…', 'textarea', 8),
      response('conclusion', 'Sonucum', 'Soruma verdiğim yanıt…', 'textarea', 8),
    ], 'Kitaptaki soru kartları hazırlama ve araştırma raporu oluşturma etkinliklerinden esinlenir.')),

    week(35, '7–11 Haz', 'heritage', 'Ortak Mirasımız · öğrenme alanı tekrarı', 'Anadolu’daki tarihî değişim, Osmanlı politikaları, yenilikler ve kültürel miras arasında bağ kur.', [
      'Üç ana konu başlığından birer kavram seç.',
      'Seçtiğin kavramlar arasında tarihî bir bağlantı kur.',
      'Öz değerlendirmede güçlü olduğun ve tekrar etmek istediğin bir noktayı belirt.',
    ], activity('Kavram haritası ve öz değerlendirme', 'Ortak Mirasımızı ilişkilendir', 'Öğrenme alanının üç konu başlığını birer örnekle bağlayan bir harita taslağı hazırla.', [
      response('policies', 'Büyüme politikaları', 'Bir politika ve örneği…', 'textarea', 8),
      response('innovations', 'Yenilikler', 'Bir ihtiyaç ve yenilik bağlantısı…', 'textarea', 8),
      response('culture', 'Kültür ve medeniyet', 'Bir kültürel unsur ve işlevi…', 'textarea', 8),
      response('reflection', 'Öz değerlendirmem', 'Güçlü yönüm ve tekrar edeceğim konu…', 'textarea', 8),
    ], 'Kitaptaki öğrenme alanı özeti ve kendimi değerlendiriyorum bölümüyle uyumlu tekrar.')),

    week(36, '14–18 Haz', 'review', 'Yıl sonu · üç öğrenme alanını karşılaştırma', 'Birlikte Yaşamak, Evimiz Dünya ve Ortak Mirasımız konularından öğrendiklerini anahtar kavramlarla hatırla.', [
      'Her öğrenme alanından bir kavram ve bir örnek seç.',
      'Bir kavramı günümüz yaşamıyla ilişkilendir.',
      'Tekrar etmen gereken konuyu not et.',
    ], activity('Karşılaştırmalı kavram haritası', 'Üç alan, üç bağlantı', 'Her öğrenme alanından seçtiğin kavramları toplumsal yaşam, dünya ve tarih bağlantılarıyla eşleştir.', [
      response('together', 'Birlikte Yaşamak', 'Kavram + günlük yaşam örneği…', 'textarea', 8),
      response('world', 'Evimiz Dünya', 'Kavram + güncel bağlantı…', 'textarea', 8),
      response('heritage', 'Ortak Mirasımız', 'Kavram + tarihî örnek…', 'textarea', 8),
      response('link', 'Ortak düşünce', 'Bu üç alanı birleştiren değer veya beceri…', 'textarea', 8),
    ], 'Kitabın üç öğrenme alanının kavram ve özet çalışmalarından esinlenen yıl sonu tekrarı.')),

    week(37, '21–25 Haz', 'review', 'Yıl sonu · öğrenme paylaşımı', 'Yıl boyunca öğrendiğin bir konuyu kısa, kanıta dayalı ve anlaşılır bir ürünle paylaş.', [
      'Paylaşacağın konuyu seç ve ana mesajını bir cümleyle belirle.',
      'Ürününe bir örnek, kaynak veya görsel gözlem ekle.',
      'Çalışmanı aileden biriyle paylaş ve geri bildirim al.',
    ], activity('Mini sergi / sunum kontrol listesi', 'Öğrenmemi paylaşıyorum', 'Seçtiğin konuyu kısa bir afiş, sözlü anlatım veya not kartıyla paylaşmaya hazırla.', [
      response('title', 'Ürün başlığı', 'Konuya uygun kısa başlık…', 'text'),
      response('message', 'Ana mesaj ve kanıt', 'Bir bilgi veya örnekle destekle…', 'textarea', 12),
      checklistField('checks', 'Paylaşmadan önce kontrol et', [
        { id: 'clear', label: 'Ana mesajım açık ve anlaşılır.' },
        { id: 'evidence', label: 'En az bir örnek veya kaynak kullandım.' },
        { id: 'respect', label: 'Farklı görüşlere saygılı bir dil kullandım.' },
      ]),
    ], 'Kitaptaki araştırma raporu, ürün oluşturma ve paylaşma adımlarından esinlenir.')),
  ];

  const LESSON_CONTENT = window.SOCIAL_STUDIES_CONTENT || { lessons: {}, checks: {} };

  function makeChoiceField(question, index) {
    const options = question.options.map((label, optionIndex) => ({
      id: `option-${optionIndex + 1}`,
      label,
    }));
    return {
      id: `self-check-${index + 1}`,
      label: question.prompt,
      kind: 'choice',
      options,
      answer: options[question.correct]?.id || '',
      explanation: question.explanation || '',
      hint: question.hint || '',
    };
  }

  function transferFields(transfer) {
    return (Array.isArray(transfer.fields) ? transfer.fields : []).map((field, index) => response(
      `transfer-${index + 1}`,
      field[0],
      field[1],
      'textarea',
      8,
    ));
  }

  for (const item of WEEKS) {
    const content = LESSON_CONTENT.lessons?.[item.id] || {};
    const quiz = LESSON_CONTENT.checks?.[item.id] || [];
    const customActivities = LESSON_CONTENT.activities?.[item.id];
    item.summary = content.summary || item.focus;
    item.summaryTitle = content.summaryTitle || (item.id >= 3 && item.id <= 12 ? `${item.topic} · konu anlatımı` : 'Haftanın konu özeti');
    item.summaryPoints = Array.isArray(content.points) ? content.points : [];
    item.keyTerms = Array.isArray(content.terms) ? content.terms : [];
    item.flowDescription = content.flowDescription || (item.id >= 3 && item.id <= 12 && Array.isArray(customActivities)
      ? `Konu anlatımını oku; ardından ${customActivities.map((activityItem) => activityItem.title).join(' → ')} etkinliklerini sırayla tamamla.`
      : 'Kısa sınama, kitaba dayalı özgün çalışma ve konuya özel uygulama adımlarını sırayla tamamla.');
    const transfer = content.transfer || {};
    const bookActivity = { ...item.activity, id: 'book' };
    if (Array.isArray(customActivities) && customActivities.length) {
      item.activities = customActivities.map((activityItem) => ({
        ...activityItem,
        fields: Array.isArray(activityItem.fields)
          ? activityItem.fields
          : (Array.isArray(activityItem.questions) ? activityItem.questions.flatMap((questionItem) => questionItem.fields || []) : []),
      }));
    } else {
      item.activities = [
        {
          id: 'self-check',
          sourceStyle: 'Seçmeli sorular · anında öz değerlendirme',
          title: 'Kısa sınama: konuyu anladım mı?',
          prompt: 'Her soruda en uygun seçeneği işaretle ve “Kontrol et” düğmesiyle geri bildirim al.',
          fields: quiz.map(makeChoiceField),
          hint: 'Yanlış seçimde ipucunu oku; konu özetine dönüp yeniden dene.',
        },
        bookActivity,
        {
          id: 'apply',
          sourceStyle: transfer.format || 'Uygulama · kısa yanıt · öz değerlendirme',
          title: transfer.title || 'Öğrendiklerimi uyguluyorum',
          prompt: transfer.prompt || `${item.topic} konusunu bir örnekle açıkla.`,
          scenario: transfer.scenario || '',
          fields: transferFields(transfer),
          hint: transfer.hint || 'Yanıtını konu özeti ve kullandığın kaynakla karşılaştır.',
        },
      ];
    }
  }

  const WEEK_BY_ID = new Map(WEEKS.map((item) => [item.id, item]));

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[char]);
  }

  function renderSourceText(value) {
    return String(value ?? '').split(/\n\s*\n/).map((paragraph) => {
      const safe = escapeHTML(paragraph).replace(/\n/g, '<br>');
      return safe ? `<p>${safe}</p>` : '';
    }).filter(Boolean).join('');
  }

  function emptyProgress() {
    return { version: 3, selectedWeek: 1, weeks: {} };
  }

  function isRecord(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  }

  function normalizeProgress(input) {
    const source = isRecord(input) ? input : {};
    const rawWeeks = isRecord(source.weeks) ? source.weeks : {};
    const normalizedWeeks = {};
    for (const item of WEEKS) {
      const saved = isRecord(rawWeeks[String(item.id)]) ? rawWeeks[String(item.id)] : {};
      const rawResponses = isRecord(saved.responses) ? saved.responses : {};
      const rawChoiceChecks = isRecord(saved.choiceChecks) ? saved.choiceChecks : {};
      const activityIds = new Set(item.activities.map((activityItem) => activityItem.id));
      const cleanResponses = {};
      const choiceChecks = {};
      const legacyResponses = isRecord(saved.legacyResponses) ? { ...saved.legacyResponses } : {};
      const legacyChoiceChecks = isRecord(saved.legacyChoiceChecks) ? { ...saved.legacyChoiceChecks } : {};
      const hasNestedResponse = Object.values(rawResponses).some((values) => isRecord(values));
      for (const [activityId, values] of Object.entries(rawResponses)) {
        if (activityIds.has(activityId)) continue;
        legacyResponses[activityId] = values;
      }
      for (const [activityId, checks] of Object.entries(rawChoiceChecks)) {
        if (!activityIds.has(activityId)) legacyChoiceChecks[activityId] = checks;
      }
      // Older single-activity backups stored fields directly instead of nesting them under an activity ID.
      if (!hasNestedResponse && Object.keys(rawResponses).length && !activityIds.has('book')) {
        legacyResponses.book = { ...rawResponses };
        if (Object.keys(rawChoiceChecks).length && !Object.keys(rawChoiceChecks).some((activityId) => activityIds.has(activityId))) {
          legacyChoiceChecks.book = { ...rawChoiceChecks };
        }
      }
      for (const activityItem of item.activities) {
        const nestedResponses = isRecord(rawResponses[activityItem.id]);
        // v1 backups stored the single activity's fields directly in responses.
        const sourceResponses = nestedResponses
          ? rawResponses[activityItem.id]
          : activityItem.id === 'book' ? rawResponses : {};
        const rawChecksForActivity = isRecord(rawChoiceChecks[activityItem.id])
          ? rawChoiceChecks[activityItem.id]
          : {};
        cleanResponses[activityItem.id] = {};
        choiceChecks[activityItem.id] = {};
        for (const field of activityItem.fields) {
          const value = sourceResponses[field.id];
          if (field.kind === 'checklist') {
            const checks = isRecord(value) ? value : {};
            cleanResponses[activityItem.id][field.id] = Object.fromEntries(
              field.options.map((option) => [option.id, checks[option.id] === true]),
            );
          } else if (field.kind === 'choice') {
            const allowed = field.options.some((option) => option.id === value);
            cleanResponses[activityItem.id][field.id] = allowed ? value : '';
            choiceChecks[activityItem.id][field.id] = rawChecksForActivity[field.id] === true;
          } else if (field.kind === 'multi') {
            const allowed = new Set(field.options.map((option) => option.id));
            const selected = Array.isArray(value) ? new Set(value.filter((optionId) => allowed.has(optionId))) : new Set();
            cleanResponses[activityItem.id][field.id] = field.options.filter((option) => selected.has(option.id)).map((option) => option.id);
            choiceChecks[activityItem.id][field.id] = rawChecksForActivity[field.id] === true;
          } else if (field.kind === 'sort') {
            const assignments = isRecord(value) ? value : {};
            const allowed = new Set(field.categories.map((category) => category.id));
            cleanResponses[activityItem.id][field.id] = Object.fromEntries(
              field.items.map((sortItem) => [sortItem.id, allowed.has(assignments[sortItem.id]) ? assignments[sortItem.id] : '']),
            );
            choiceChecks[activityItem.id][field.id] = rawChecksForActivity[field.id] === true;
          } else {
            cleanResponses[activityItem.id][field.id] = typeof value === 'string' ? value.slice(0, 5000) : '';
          }
        }
      }
      const rawPlatforms = isRecord(saved.platforms) ? saved.platforms : {};
      normalizedWeeks[String(item.id)] = {
        tasks: item.tasks.map((_, index) => Array.isArray(saved.tasks) && saved.tasks[index] === true),
        responses: cleanResponses,
        choiceChecks,
        legacyResponses,
        legacyChoiceChecks,
        platforms: Object.fromEntries(PROVIDERS.map((provider) => [provider, rawPlatforms[provider] === true])),
      };
    }
    const selectedWeek = Number(source.selectedWeek);
    return {
      version: 3,
      selectedWeek: WEEK_BY_ID.has(selectedWeek) ? selectedWeek : 1,
      weeks: normalizedWeeks,
    };
  }

  function loadProgress() {
    try {
      const stored = window.localStorage?.getItem(STORAGE_KEY);
      return stored ? normalizeProgress(JSON.parse(stored)) : emptyProgress();
    } catch (_error) {
      return emptyProgress();
    }
  }

  let progress = loadProgress();
  let initialized = false;

  function ensureWeekProgress(weekId) {
    const key = String(weekId);
    if (!progress.weeks[key]) {
      const item = WEEK_BY_ID.get(Number(weekId));
      progress.weeks[key] = {
        tasks: item ? item.tasks.map(() => false) : [],
        responses: item ? Object.fromEntries(item.activities.map((activityItem) => [activityItem.id, {}])) : {},
        choiceChecks: item ? Object.fromEntries(item.activities.map((activityItem) => [activityItem.id, {}])) : {},
        legacyResponses: {},
        legacyChoiceChecks: {},
        platforms: Object.fromEntries(PROVIDERS.map((provider) => [provider, false])),
      };
    }
    return progress.weeks[key];
  }

  function persist() {
    try {
      window.localStorage?.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (_error) {
      // The current page still remains usable when storage is unavailable or full.
    }
  }

  function wordCount(value) {
    return [...new Set(String(value || '').split(/[,،;\n]+/).map((word) => word.trim()).filter(Boolean))].length;
  }

  function responsesFor(saved, activityItem) {
    if (!isRecord(saved?.responses)) return {};
    if (isRecord(saved.responses[activityItem.id])) return saved.responses[activityItem.id];
    // Accept an un-normalized v1 record passed directly to the public completion helper.
    return activityItem.id === 'book' ? saved.responses : {};
  }

  function isFieldAnswerCorrect(field, value) {
    if (field.kind === 'choice') return value === field.answer;
    if (field.kind === 'multi') {
      if (!Array.isArray(value) || !Array.isArray(field.answer)) return false;
      const actual = new Set(value);
      const expected = new Set(field.answer);
      return actual.size === expected.size && [...expected].every((optionId) => actual.has(optionId));
    }
    if (field.kind === 'sort') {
      if (!isRecord(value) || !field.items?.length || !isRecord(field.expectedAssignments)) return false;
      const validCategories = new Set(field.categories.map((category) => category.id));
      return field.items.every((sortItem) => validCategories.has(value[sortItem.id])
        && value[sortItem.id] === field.expectedAssignments[sortItem.id]);
    }
    return false;
  }

  function isActivityComplete(item, saved, onlyActivity = null) {
    if (!item || !saved) return false;
    const activityItems = onlyActivity ? [onlyActivity] : item.activities;
    if (!Array.isArray(activityItems) || !activityItems.length) return false;
    return activityItems.every((activityItem) => {
      const responses = responsesFor(saved, activityItem);
      const checkedChoices = isRecord(saved.choiceChecks?.[activityItem.id]) ? saved.choiceChecks[activityItem.id] : {};
      return activityItem.fields.length > 0 && activityItem.fields.every((field) => {
        const value = responses[field.id];
        if (field.kind === 'checklist') {
          return field.options.every((option) => value && value[option.id] === true);
        }
        if (field.kind === 'words') return wordCount(value) >= 3;
        if (['choice', 'multi', 'sort'].includes(field.kind)) {
          return isFieldAnswerCorrect(field, value) && checkedChoices[field.id] === true;
        }
        return typeof value === 'string' && value.trim().length >= field.minChars;
      });
    });
  }

  function isWeekComplete(item, saved = progress.weeks[String(item?.id)]) {
    if (!item || !saved || !Array.isArray(saved.tasks)) return false;
    return item.tasks.every((_, index) => saved.tasks[index] === true) && isActivityComplete(item, saved);
  }

  function getProviderLinks(item) {
    return {
      eba: EBA_URL,
      tonguc: `https://www.youtube.com/results?search_query=${encodeURIComponent(`Tonguç 7. sınıf Sosyal Bilgiler ${item.topic}`)}`,
      mebi: MEBI_URL,
    };
  }

  function choiceFeedbackHTML(field, value, isChecked) {
    if (!isChecked) return '';
    const correct = isFieldAnswerCorrect(field, value);
    return `<div class="social-choice-feedback${correct ? ' is-correct' : ' is-retry'}" role="status" aria-live="polite"><b>${correct ? 'Doğru!' : 'Bir daha düşün.'}</b> ${escapeHTML(correct ? field.explanation : field.hint)}</div>`;
  }

  function sortFieldHTML(item, activityItem, field, saved, fieldIndex, showQuestionNumber) {
    const rawAssignments = responsesFor(saved, activityItem)[field.id];
    const assignments = isRecord(rawAssignments) ? rawAssignments : {};
    const categories = Array.isArray(field.categories) ? field.categories : [];
    const items = Array.isArray(field.items) ? field.items : [];
    const validCategories = new Set(categories.map((category) => category.id));
    const isPlaced = (sortItem) => validCategories.has(assignments[sortItem.id]);
    const widgetId = `social-sort-${item.id}-${activityItem.id}-${field.id}`;
    const card = (sortItem) => `<button type="button" class="social-sort-card" draggable="true" data-social-sort-item="${escapeHTML(sortItem.id)}" aria-pressed="false">${escapeHTML(sortItem.label)}</button>`;
    const bankCards = items.filter((sortItem) => !isPlaced(sortItem)).map(card).join('');
    const bankTargetId = `${widgetId}-target-bank`;
    const bankHTML = `<section class="social-sort-bank-wrap" aria-labelledby="${widgetId}-bank-heading"><h4 id="${widgetId}-bank-heading">Kartlar <span class="social-sort-count">${items.filter((sortItem) => !isPlaced(sortItem)).length} kaldı</span></h4><div class="social-sort-dropzone social-sort-bank" id="${bankTargetId}" data-social-sort-target="bank" role="group" tabindex="0" aria-keyshortcuts="Enter Space" aria-roledescription="kart bırakma alanı" aria-label="Taşınmamış kartlar alanı; seçili kartı buraya geri taşımak için Enter veya Boşluk tuşuna bas">${bankCards || '<span class="social-sort-placeholder">Bütün kartlar gruplara yerleştirildi</span>'}</div></section>`;
    const categoriesHTML = categories.map((category, index) => {
      const inside = items.filter((sortItem) => assignments[sortItem.id] === category.id).map(card).join('');
      const description = category.description ? `<p class="social-sort-category-description">${escapeHTML(category.description)}</p>` : '';
      const icon = category.icon || ['🟦', '🟨', '🟩', '🟪'][index % 4];
      const headingId = `${widgetId}-category-heading-${index}`;
      const targetId = `${widgetId}-target-${category.id}`;
      const accessibleLabel = `${category.label}${category.description ? `. ${category.description}` : ''}`;
      return `<section class="social-sort-category" data-category-tone="${index % 4}"><div class="social-sort-category-heading"><span aria-hidden="true">${escapeHTML(icon)}</span><div><h4 id="${headingId}">${escapeHTML(category.label)}</h4>${description}</div></div><div class="social-sort-dropzone" id="${targetId}" data-social-sort-target="${escapeHTML(category.id)}" role="group" tabindex="0" aria-keyshortcuts="Enter Space" aria-roledescription="kart bırakma alanı" aria-labelledby="${headingId}" aria-label="${escapeHTML(accessibleLabel)}. Seçili kartı buraya taşımak için Enter veya Boşluk tuşuna bas">${inside || '<span class="social-sort-placeholder">Kartı buraya bırak veya seçili kartı buraya taşı</span>'}</div></section>`;
    }).join('');
    const assignedCount = items.filter(isPlaced).length;
    const checked = saved.choiceChecks?.[activityItem.id]?.[field.id] === true;
    const instructionsId = `${widgetId}-instructions`;
    const guide = Array.isArray(field.guide) && field.guide.length
      ? `<div class="social-sort-guide" role="note"><b>Mini şema</b><ol>${field.guide.map((step) => `<li>${escapeHTML(step)}</li>`).join('')}</ol></div>`
      : '';
    return `<fieldset class="social-sort-field"><legend>${showQuestionNumber ? `<span class="social-question-no">Soru ${fieldIndex + 1}</span>` : ''}${escapeHTML(field.label)}</legend><p class="social-sort-instructions" id="${instructionsId}">${escapeHTML(field.instructions || 'Kartı sürükle; dokunmatik ekranda karta, sonra hedefe dokun. Klavyede kartı Enter/Boşluk ile seç ve hedef gruba odaklanıp Enter/Boşluk ile yerleştir.')}</p>${guide}<div class="social-sort-widget" id="${widgetId}" data-social-sort-widget="true" data-social-week="${item.id}" data-social-activity="${escapeHTML(activityItem.id)}" data-social-field="${escapeHTML(field.id)}" data-assignments="${escapeHTML(JSON.stringify(assignments))}" aria-describedby="${instructionsId}">${bankHTML}<div class="social-sort-categories">${categoriesHTML}</div><p class="social-sort-status" data-social-sort-status role="status" aria-live="polite">${assignedCount} / ${items.length} kart yerleştirildi</p></div><button type="button" class="social-choice-check" data-social-check-choice="${escapeHTML(field.id)}" data-social-kind="sort" data-social-activity="${escapeHTML(activityItem.id)}" data-social-week="${item.id}">Eşleştirmemi kontrol et</button><div class="social-choice-feedback-slot" id="social-choice-feedback-${item.id}-${activityItem.id}-${field.id}">${choiceFeedbackHTML(field, assignments, checked)}</div></fieldset>`;
  }

  function fieldHTML(item, activityItem, field, saved, fieldIndex, showQuestionNumber = true) {
    const responses = responsesFor(saved, activityItem);
    const value = responses[field.id];
    const fieldId = `social-field-${item.id}-${activityItem.id}-${field.id}`;
    const activityData = `data-social-activity="${escapeHTML(activityItem.id)}"`;
    if (field.kind === 'sort') return sortFieldHTML(item, activityItem, field, saved, fieldIndex, showQuestionNumber);
    if (field.kind === 'choice' || field.kind === 'multi') {
      const checked = saved.choiceChecks?.[activityItem.id]?.[field.id] === true;
      const isMulti = field.kind === 'multi';
      const selected = Array.isArray(value) ? value : [];
      const options = field.options.map((option) => `<label class="social-choice-option"><input type="${isMulti ? 'checkbox' : 'radio'}" name="social-${isMulti ? 'multi' : 'choice'}-${item.id}-${activityItem.id}-${field.id}" data-social-response="${escapeHTML(field.id)}" ${isMulti ? `data-social-multi="${escapeHTML(field.id)}" data-social-option="${escapeHTML(option.id)}"` : ''} ${activityData} data-social-week="${item.id}" value="${escapeHTML(option.id)}" ${isMulti ? (selected.includes(option.id) ? 'checked' : '') : (value === option.id ? 'checked' : '')}><span>${escapeHTML(option.label)}</span></label>`).join('');
      const checkLabel = isMulti ? 'Seçimlerimi kontrol et' : 'Seçimimi kontrol et';
      return `<fieldset class="social-choice-question"><legend>${showQuestionNumber ? `<span class="social-question-no">Soru ${fieldIndex + 1}</span>` : ''}${escapeHTML(field.label)}</legend><div class="social-choice-options">${options}</div><button type="button" class="social-choice-check" data-social-check-choice="${escapeHTML(field.id)}" data-social-kind="${field.kind}" ${activityData} data-social-week="${item.id}">${checkLabel}</button><div class="social-choice-feedback-slot" id="social-choice-feedback-${item.id}-${activityItem.id}-${field.id}">${choiceFeedbackHTML(field, value, checked)}</div></fieldset>`;
    }
    if (field.kind === 'checklist') {
      const checks = value || {};
      return `<fieldset class="social-checklist-field"><legend>${escapeHTML(field.label)}</legend><div class="social-checklist-options">${field.options.map((option) => `<label class="social-check-option"><input type="checkbox" data-social-check="${escapeHTML(field.id)}" ${activityData} data-social-option="${escapeHTML(option.id)}" data-social-week="${item.id}" ${checks[option.id] ? 'checked' : ''}><span>${escapeHTML(option.label)}</span></label>`).join('')}</div></fieldset>`;
    }
    if (field.kind === 'words') {
      const terms = String(value || '').split(/[,،;\n]+/).map((term) => term.trim()).filter(Boolean);
      return `<div class="social-field"><label for="${fieldId}">${escapeHTML(field.label)}</label><input id="${fieldId}" type="text" data-social-response="${escapeHTML(field.id)}" ${activityData} data-social-week="${item.id}" value="${escapeHTML(value || '')}" placeholder="${escapeHTML(field.placeholder)}" autocomplete="off"><div class="social-word-preview" id="social-word-preview-${item.id}-${activityItem.id}-${escapeHTML(field.id)}" aria-live="polite">${terms.map((term) => `<span>${escapeHTML(term)}</span>`).join('')}</div><small>En az üç farklı sözcük yaz; sözcükleri virgülle ayır.</small></div>`;
    }
    if (field.kind === 'text') {
      return `<div class="social-field"><label for="${fieldId}">${escapeHTML(field.label)}</label><input id="${fieldId}" type="text" data-social-response="${escapeHTML(field.id)}" ${activityData} data-social-week="${item.id}" value="${escapeHTML(value || '')}" placeholder="${escapeHTML(field.placeholder)}" autocomplete="off"></div>`;
    }
    return `<div class="social-field"><label for="${fieldId}">${escapeHTML(field.label)}</label><textarea id="${fieldId}" data-social-response="${escapeHTML(field.id)}" ${activityData} data-social-week="${item.id}" rows="3" placeholder="${escapeHTML(field.placeholder)}">${escapeHTML(value || '')}</textarea></div>`;
  }

  function renderWeekList() {
    const list = document.getElementById('socialWeekList');
    if (!list) return;
    list.innerHTML = UNITS.map((unit) => {
      const items = WEEKS.filter((item) => item.unitId === unit.id);
      const completeCount = items.filter((item) => isWeekComplete(item)).length;
      return `<details class="social-unit-group" data-unit="${escapeHTML(unit.id)}" ${items.some((item) => item.id === progress.selectedWeek) ? 'open' : ''}><summary><span><b>${escapeHTML(unit.label)}</b><strong>${escapeHTML(unit.title)}</strong></span><small class="social-unit-count">${completeCount}/${items.length}</small></summary><div class="social-week-buttons">${items.map((item) => {
        const complete = isWeekComplete(item);
        const active = item.id === progress.selectedWeek;
        return `<button type="button" class="social-week-button${active ? ' is-current' : ''}${complete ? ' is-complete' : ''}" data-social-select="${item.id}" ${active ? 'aria-current="page"' : ''}><span class="social-week-no">${item.id}.</span><span class="social-week-meta"><span class="social-week-date">${escapeHTML(item.date)} 2026–2027</span><span class="social-week-topic">${escapeHTML(item.topic)}</span></span><span class="social-week-status" id="social-week-status-${item.id}" aria-label="${complete ? 'Hafta tamamlandı' : 'Hafta tamamlanmadı'}">${complete ? '✓' : ''}</span></button>`;
      }).join('')}</div></details>`;
    }).join('');
  }

  let activeActivityWeekId = null;
  let activeActivityIndex = 0;

  function renderActivityFlow(item, saved) {
    if (activeActivityWeekId !== item.id) {
      activeActivityWeekId = item.id;
      activeActivityIndex = 0;
    }
    const activities = item.activities;
    activeActivityIndex = Math.max(0, Math.min(activeActivityIndex, activities.length - 1));
    const activeActivity = activities[activeActivityIndex];
    const completeCount = activities.filter((activityItem) => isActivityComplete(item, saved, activityItem)).length;
    const currentComplete = isActivityComplete(item, saved, activeActivity);
    const currentStatus = currentComplete ? 'Tamamlandı' : 'Devam ediyor';
    const sourceTextHTML = activeActivity.sourceText
      ? `<section class="social-reading-source" aria-label="${escapeHTML(activeActivity.sourceTitle || 'Özgün kaynak metin')}"><div class="social-reading-heading"><span>ÖZGÜN METİN</span><h5>${escapeHTML(activeActivity.sourceTitle || 'Kaynak metin')}</h5>${activeActivity.sourceLabel ? `<small>${escapeHTML(activeActivity.sourceLabel)}</small>` : ''}</div><div class="social-reading-text">${renderSourceText(activeActivity.sourceText)}</div></section>`
      : '';
    const dialogueHTML = Array.isArray(activeActivity.dialogue) && activeActivity.dialogue.length
      ? `<section class="social-dialogue" aria-label="Örnek cep telefonu sohbeti"><div class="social-reading-heading"><span>SOHBET</span><h5>${escapeHTML(activeActivity.sourceTitle || 'Özgün örnek sohbet')}</h5>${activeActivity.sourceLabel ? `<small>${escapeHTML(activeActivity.sourceLabel)}</small>` : ''}</div><ol>${activeActivity.dialogue.map((message) => `<li><b>${escapeHTML(message.speaker)}</b><span>${escapeHTML(message.text)}</span></li>`).join('')}</ol></section>`
      : '';
    const caseStudiesHTML = Array.isArray(activeActivity.caseStudies) && activeActivity.caseStudies.length
      ? `<section class="social-case-study-list" aria-label="Örnek durumlar">${activeActivity.caseStudies.map((caseStudy, index) => `<article class="social-case-study"><span>${escapeHTML(caseStudy.title || `Örnek durum ${index + 1}`)}</span><p>${escapeHTML(caseStudy.text)}</p></article>`).join('')}</section>`
      : '';
    const providerLinks = getProviderLinks(item);
    const providerLabels = { eba: 'EBA Sosyal Bilgiler', tonguc: 'Tonguç konu araması', mebi: 'MEBİ öğrenci bölümü' };
    const sourceProvidersHTML = Array.isArray(activeActivity.sourceProviders)
      ? activeActivity.sourceProviders.filter((provider) => PROVIDERS.includes(provider) && providerLinks[provider]).map((provider) => `<a class="social-source-provider-link" href="${escapeHTML(providerLinks[provider])}" target="_blank" rel="noopener noreferrer">${escapeHTML(providerLabels[provider] || provider)} ↗</a>`).join('')
      : '';
    const questionHTML = Array.isArray(activeActivity.questions) && activeActivity.questions.length
      ? `<div class="social-question-list">${activeActivity.questions.map((questionItem, questionIndex) => `<section class="social-question-card"><div class="social-question-heading"><span class="social-question-number">${questionIndex + 1}</span><p>${escapeHTML(questionItem.prompt)}</p></div><div class="social-activity-fields">${(questionItem.fields || []).map((field, fieldIndex) => fieldHTML(item, activeActivity, field, saved, fieldIndex, false)).join('')}</div></section>`).join('')}</div>`
      : `<div class="social-activity-fields">${activeActivity.fields.map((field, index) => fieldHTML(item, activeActivity, field, saved, index)).join('')}</div>`;
    return `<section class="card social-practice-flow" aria-labelledby="socialPracticeTitle">
      <div class="social-practice-heading"><div><div class="tag">OKU · İNCELE · UYGULA</div><h3 id="socialPracticeTitle">Bu haftanın etkinlikleri</h3><p>${escapeHTML(item.flowDescription)}</p></div><strong class="social-practice-count" id="socialActivityCompleteCount">${completeCount}/${activities.length} etkinlik tamamlandı</strong></div>
      <div class="social-practice-progress" id="socialActivityProgress" role="progressbar" aria-label="Haftalık etkinliklerin tamamlanma durumu" aria-valuemin="0" aria-valuemax="${activities.length}" aria-valuenow="${completeCount}"><span id="socialActivityProgressBar" style="width:${Math.round((completeCount / activities.length) * 100)}%"></span></div>
      <nav class="social-practice-track" aria-label="Bu haftanın etkinlik adımları">${activities.map((activityItem, index) => {
        const complete = isActivityComplete(item, saved, activityItem);
        const active = index === activeActivityIndex;
        const stepDetail = activityItem.count || (Array.isArray(activityItem.questions) ? `${activityItem.questions.length} soru` : `${activityItem.fields.length} yanıt alanı`);
        return `<button type="button" class="social-practice-step${active ? ' is-current' : ''}${complete ? ' is-complete' : ''}" data-social-activity-select="${index}" aria-label="Etkinlik ${index + 1}: ${escapeHTML(activityItem.title)}${complete ? ', tamamlandı' : ''}" ${active ? 'aria-current="step"' : ''}><span class="social-practice-step-no">${index + 1}</span><span class="social-practice-step-copy"><b>${escapeHTML(activityItem.title)}</b><small>${escapeHTML(stepDetail)}</small></span><span class="social-practice-step-status" id="social-activity-step-status-${item.id}-${activityItem.id}" aria-label="${complete ? 'Tamamlandı' : 'Devam ediyor'}">${complete ? '✓' : ''}</span></button>`;
      }).join('')}</nav>
      <article class="social-activity-step" id="socialActivityStep" aria-labelledby="socialActivityTitle-${item.id}">
        <header class="social-activity-heading"><div><div class="social-activity-kicker">ETKİNLİK ${activeActivityIndex + 1} / ${activities.length}</div><h4 id="socialActivityTitle-${item.id}" tabindex="-1">${escapeHTML(activeActivity.title)}</h4><p>${escapeHTML(activeActivity.prompt)}</p></div><span class="social-activity-state${currentComplete ? ' is-done' : ''}" id="socialActivityState-${item.id}" role="status" aria-live="polite">${currentStatus}</span></header>
        ${activeActivity.scenario ? `<blockquote class="social-case-stem"><b>Örnek durum</b><span>${escapeHTML(activeActivity.scenario)}</span></blockquote>` : ''}
        <p class="social-style-note"><b>Etkinlik biçimi:</b> ${escapeHTML(activeActivity.format || activeActivity.sourceStyle)}${activeActivity.hint ? `<span>${escapeHTML(activeActivity.hint)}</span>` : ''}</p>
        ${(activeActivity.format || activeActivity.count || activeActivity.sourceLabel) ? `<div class="social-activity-meta">${activeActivity.count ? `<span>${escapeHTML(activeActivity.count)}</span>` : ''}<span>Kitap bağlamı: ${escapeHTML(item.source)}</span>${activeActivity.sourceLabel ? `<span>${escapeHTML(activeActivity.sourceLabel)}</span>` : ''}</div>` : ''}
        ${sourceTextHTML}${dialogueHTML}${caseStudiesHTML}${sourceProvidersHTML ? `<div class="social-research-links" aria-label="Araştırma için bağlantılar">${sourceProvidersHTML}</div>` : ''}${questionHTML}
        <p class="social-answer-note">Açık yanıtlar otomatik puanlanmaz; seçimli sorular için geri bildirim alabilirsin. Yanıtlarını konu anlatımı, ders kitabı veya öğretmeninin yönlendirmesiyle karşılaştır.</p>
        <div class="social-activity-controls"><button type="button" class="social-activity-nav" data-social-activity-move="-1" ${activeActivityIndex === 0 ? 'disabled' : ''}>← Önceki etkinlik</button><span>${activeActivityIndex + 1} / ${activities.length}</span><button type="button" class="social-activity-nav" data-social-activity-move="1" ${activeActivityIndex === activities.length - 1 ? 'disabled' : ''}>Sonraki etkinlik →</button></div>
      </article>
    </section>`;
  }

  function renderSelectedWeek() {
    const prompt = document.getElementById('socialWeekPrompt');
    const content = document.getElementById('socialWeekContent');
    const item = WEEK_BY_ID.get(progress.selectedWeek);
    if (!content || !prompt) return;
    if (!item) {
      prompt.hidden = false;
      content.hidden = true;
      return;
    }
    prompt.hidden = true;
    content.hidden = false;
    const saved = ensureWeekProgress(item.id);
    const links = getProviderLinks(item);
    const done = isWeekComplete(item, saved);
    const dateLabel = `${item.date} 2026–2027 · ${item.id}. hafta`;
    content.innerHTML = `
      <header class="social-week-heading card">
        <div><div class="social-eyebrow">${escapeHTML(item.unitLabel)} · ${escapeHTML(item.unit)}</div><p class="social-date">${escapeHTML(dateLabel)}</p><h2 id="socialWeekTitle" tabindex="-1">${escapeHTML(item.topic)}</h2><p class="social-focus">${escapeHTML(item.focus)}</p></div>
        <button class="social-print print" type="button" data-social-print>Yazdır / PDF</button>
      </header>
      <section class="card social-topic-summary" aria-labelledby="socialSummaryTitle">
        <div class="social-summary-heading"><div><div class="tag">KONU ANLATIMI</div><h3 id="socialSummaryTitle">${escapeHTML(item.summaryTitle)}</h3></div></div>
        <div class="social-summary-text">${renderSourceText(item.summary)}</div>
        <div class="social-summary-bottom"><div><h4>Hatırlamam gerekenler</h4><ul class="social-summary-points">${item.summaryPoints.map((point) => `<li>${escapeHTML(point)}</li>`).join('')}</ul></div><div class="social-key-terms"><h4>Anahtar kavramlar</h4><div>${item.keyTerms.map((term) => `<span>${escapeHTML(term)}</span>`).join('')}</div></div></div>
      </section>
      ${renderActivityFlow(item, saved)}
      <div class="social-grid-two">
        <section class="card social-focus-card"><div class="tag">BU HAFTANIN ODAĞI</div><p>${escapeHTML(item.focus)}</p><small>${escapeHTML(item.source)}</small></section>
        <section class="card social-mini-plan"><h3>Öğrenci için mini plan</h3><p>Görevleri tamamladıkça işaretle. Yanıtlar bu tarayıcıda saklanır.</p><div class="social-task-list">${item.tasks.map((task, index) => `<label class="social-task"><input type="checkbox" data-social-task="${index}" data-social-week="${item.id}" ${saved.tasks[index] ? 'checked' : ''}><span>${escapeHTML(task)}</span></label>`).join('')}</div></section>
      </div>
      <section class="card social-schedule" aria-labelledby="socialScheduleTitle"><div class="social-card-heading"><div><h3 id="socialScheduleTitle">Haftalık çalışma çizelgesi</h3><p>Haftalar tarih, konu ve ilerleme takibinde ayrı kalır. Uygulamadaki mini plan ve tüm etkinlikler tamamlanınca ilk kutu otomatik işaretlenir; EBA, Tonguç ve MEBİ çalışmalarını bitirince ilgili kutuyu sen işaretle.</p></div></div><div class="social-table-wrap"><table class="social-study-table"><caption class="visually-hidden">${item.id}. hafta için Sosyal Bilgiler çalışma çizelgesi</caption><thead><tr><th scope="col">Uygulamadaki çalışmalar</th><th scope="col">EBA</th><th scope="col">Tonguç</th><th scope="col">MEBİ</th></tr></thead><tbody><tr>
        <td><label class="social-provider-check"><input type="checkbox" data-social-our="true" data-social-week="${item.id}" disabled ${done ? 'checked' : ''}><span>Mini plan ve tüm etkinlikler</span></label><span class="social-auto-status${done ? ' is-done' : ''}" id="social-our-status-${item.id}" role="status" aria-live="polite">${done ? 'Tamamlandı · otomatik' : 'Mini planı ve tüm etkinlikleri tamamla.'}</span></td>
        <td><a class="social-provider-link" href="${escapeHTML(links.eba)}" target="_blank" rel="noopener noreferrer">EBA Sosyal Bilgiler ↗</a><small class="social-provider-note">7. sınıf Sosyal Bilgiler ders alanı.</small><label class="social-provider-check"><input type="checkbox" data-social-provider="eba" data-social-week="${item.id}" ${saved.platforms.eba ? 'checked' : ''}><span>EBA çalışmam bitti</span></label></td>
        <td><a class="social-provider-link" href="${escapeHTML(links.tonguc)}" target="_blank" rel="noopener noreferrer">Tonguç konu araması ↗</a><small class="social-provider-note">${escapeHTML(item.topic)} için YouTube araması</small><label class="social-provider-check"><input type="checkbox" data-social-provider="tonguc" data-social-week="${item.id}" ${saved.platforms.tonguc ? 'checked' : ''}><span>Tonguç çalışmam bitti</span></label></td>
        <td><a class="social-provider-link" href="${escapeHTML(links.mebi)}" target="_blank" rel="noopener noreferrer">MEBİ çalışmaları ↗</a><small class="social-provider-note">MEBİ Sosyal Bilgiler öğrenci bölümü.</small><label class="social-provider-check"><input type="checkbox" data-social-provider="mebi" data-social-week="${item.id}" ${saved.platforms.mebi ? 'checked' : ''}><span>MEBİ çalışmam bitti</span></label></td>
      </tr></tbody></table></div></section>
      <p class="social-plan-source">${escapeHTML(item.source)} Haftalık dağılım ev çalışması için öneridir; sınıfta işlenen sıra ve öğretmen planı önceliklidir. Etkinlik yönergeleri özgündür; kitaptaki soru ve metinler kopyalanmamıştır.</p>`;
  }

  function refreshProgressUI() {
    const completed = WEEKS.filter((item) => isWeekComplete(item)).length;
    const bar = document.getElementById('socialProgressBar');
    const track = document.getElementById('socialProgressTrack');
    const count = document.getElementById('socialProgressCount');
    if (bar) bar.style.width = `${Math.round((completed / WEEKS.length) * 100)}%`;
    if (track) track.setAttribute('aria-valuenow', String(completed));
    if (count) count.textContent = `${completed} / ${WEEKS.length} hafta tamamlandı`;

    for (const item of WEEKS) {
      const complete = isWeekComplete(item);
      const status = document.getElementById(`social-week-status-${item.id}`);
      if (status) {
        status.textContent = complete ? '✓' : '';
        status.setAttribute('aria-label', complete ? 'Hafta tamamlandı' : 'Hafta tamamlanmadı');
      }
      const button = document.querySelector(`#socialWeekList [data-social-select="${item.id}"]`);
      button?.classList.toggle('is-complete', complete);
      const groupCount = document.querySelector(`.social-unit-group[data-unit="${item.unitId}"] .social-unit-count`);
      if (groupCount) {
        const members = WEEKS.filter((entry) => entry.unitId === item.unitId);
        groupCount.textContent = `${members.filter((entry) => isWeekComplete(entry)).length}/${members.length}`;
      }
    }

    const selected = WEEK_BY_ID.get(progress.selectedWeek);
    if (!selected) return;
    const saved = ensureWeekProgress(selected.id);
    const complete = isWeekComplete(selected, saved);
    const checkbox = document.querySelector(`[data-social-our="true"][data-social-week="${selected.id}"]`);
    const scheduleStatus = document.getElementById(`social-our-status-${selected.id}`);
    if (checkbox) checkbox.checked = complete;
    if (scheduleStatus) {
      scheduleStatus.textContent = complete ? 'Tamamlandı · otomatik' : 'Mini planı ve tüm etkinlikleri tamamla.';
      scheduleStatus.classList.toggle('is-done', complete);
    }

    const activities = selected.activities;
    const completeActivities = activities.filter((activityItem) => isActivityComplete(selected, saved, activityItem)).length;
    const progressMeter = document.getElementById('socialActivityProgress');
    const progressMeterBar = document.getElementById('socialActivityProgressBar');
    const completeCount = document.getElementById('socialActivityCompleteCount');
    if (progressMeter) progressMeter.setAttribute('aria-valuenow', String(completeActivities));
    if (progressMeterBar) progressMeterBar.style.width = `${Math.round((completeActivities / activities.length) * 100)}%`;
    if (completeCount) completeCount.textContent = `${completeActivities}/${activities.length} etkinlik tamamlandı`;

    const currentActivity = activities[activeActivityIndex] || activities[0];
    const currentComplete = isActivityComplete(selected, saved, currentActivity);
    const activityStatus = document.getElementById(`socialActivityState-${selected.id}`);
    if (activityStatus) {
      activityStatus.textContent = currentComplete ? 'Tamamlandı' : 'Devam ediyor';
      activityStatus.classList.toggle('is-done', currentComplete);
    }
    activities.forEach((activityItem, index) => {
      const activityComplete = isActivityComplete(selected, saved, activityItem);
      const button = document.querySelector(`#socialWeekContent [data-social-activity-select="${index}"]`);
      if (button) {
        button.classList.toggle('is-current', index === activeActivityIndex);
        button.classList.toggle('is-complete', activityComplete);
        if (index === activeActivityIndex) button.setAttribute('aria-current', 'step');
        else button.removeAttribute('aria-current');
      }
      const stepStatus = document.getElementById(`social-activity-step-status-${selected.id}-${activityItem.id}`);
      if (stepStatus) {
        stepStatus.textContent = activityComplete ? '✓' : '';
        stepStatus.setAttribute('aria-label', activityComplete ? 'Tamamlandı' : 'Devam ediyor');
      }
    });
  }

  function updateWordPreview(input) {
    const weekId = Number(input.dataset.socialWeek);
    const activityId = input.dataset.socialActivity;
    const fieldId = input.dataset.socialResponse;
    const preview = document.getElementById(`social-word-preview-${weekId}-${activityId}-${fieldId}`);
    if (!preview) return;
    const words = [...new Set(String(input.value || '').split(/[,،;\n]+/).map((word) => word.trim()).filter(Boolean))];
    preview.innerHTML = words.map((word) => `<span>${escapeHTML(word)}</span>`).join('');
  }

  let selectedSocialSortCard = null;

  function socialSortContext(widget) {
    if (!widget) return null;
    const weekId = Number(widget.dataset.socialWeek);
    const item = WEEK_BY_ID.get(weekId);
    const activityItem = item?.activities.find((candidate) => candidate.id === widget.dataset.socialActivity);
    const field = activityItem?.fields.find((candidate) => candidate.id === widget.dataset.socialField);
    return item && activityItem && field?.kind === 'sort'
      ? { widget, weekId, item, activityItem, field }
      : null;
  }

  function moveSocialSortCard(widget, itemId, targetId) {
    const context = socialSortContext(widget);
    if (!context || !context.field.items.some((sortItem) => sortItem.id === itemId)) return false;
    const targetIsBank = targetId === 'bank';
    if (!targetIsBank && !context.field.categories.some((category) => category.id === targetId)) return false;
    const saved = ensureWeekProgress(context.weekId);
    const previous = saved.responses[context.activityItem.id][context.field.id];
    const assignments = isRecord(previous) ? { ...previous } : {};
    if (targetIsBank) delete assignments[itemId];
    else assignments[itemId] = targetId;
    saved.responses[context.activityItem.id][context.field.id] = assignments;
    delete saved.choiceChecks[context.activityItem.id][context.field.id];
    selectedSocialSortCard = null;
    persist();
    renderSelectedWeek();
    refreshProgressUI();
    const focusId = `social-sort-${context.weekId}-${context.activityItem.id}-${context.field.id}-target-${targetIsBank ? 'bank' : targetId}`;
    document.getElementById(focusId)?.focus({ preventScroll: true });
    return true;
  }

  function bindEvents() {
    if (initialized) return;
    const root = document.getElementById('socialWorkspace');
    if (!root) return;
    initialized = true;

    root.addEventListener('click', (event) => {
      const selectButton = event.target.closest('[data-social-select]');
      if (selectButton) {
        const nextWeek = Number(selectButton.dataset.socialSelect);
        if (!WEEK_BY_ID.has(nextWeek)) return;
        progress.selectedWeek = nextWeek;
        activeActivityWeekId = nextWeek;
        activeActivityIndex = 0;
        persist();
        render();
        document.getElementById('socialWeekTitle')?.focus({ preventScroll: true });
        return;
      }

      const activitySelect = event.target.closest('[data-social-activity-select]');
      if (activitySelect) {
        const selected = WEEK_BY_ID.get(progress.selectedWeek);
        const nextIndex = Number(activitySelect.dataset.socialActivitySelect);
        if (!selected || !Number.isInteger(nextIndex) || nextIndex < 0 || nextIndex >= selected.activities.length) return;
        activeActivityWeekId = selected.id;
        activeActivityIndex = nextIndex;
        renderSelectedWeek();
        refreshProgressUI();
        document.getElementById(`socialActivityTitle-${selected.id}`)?.focus({ preventScroll: true });
        return;
      }

      const moveButton = event.target.closest('[data-social-activity-move]');
      if (moveButton) {
        const selected = WEEK_BY_ID.get(progress.selectedWeek);
        const nextIndex = activeActivityIndex + Number(moveButton.dataset.socialActivityMove);
        if (!selected || !Number.isInteger(nextIndex) || nextIndex < 0 || nextIndex >= selected.activities.length) return;
        activeActivityWeekId = selected.id;
        activeActivityIndex = nextIndex;
        renderSelectedWeek();
        refreshProgressUI();
        document.getElementById(`socialActivityTitle-${selected.id}`)?.focus({ preventScroll: true });
        return;
      }

      const checkButton = event.target.closest('[data-social-check-choice]');
      if (checkButton) {
        const weekId = Number(checkButton.dataset.socialWeek);
        const item = WEEK_BY_ID.get(weekId);
        const activityItem = item?.activities.find((candidate) => candidate.id === checkButton.dataset.socialActivity);
        const field = activityItem?.fields.find((candidate) => candidate.id === checkButton.dataset.socialCheckChoice);
        if (!item || !activityItem || !field || !['choice', 'multi', 'sort'].includes(field.kind)) return;
        const saved = ensureWeekProgress(weekId);
        const value = responsesFor(saved, activityItem)[field.id];
        const feedback = document.getElementById(`social-choice-feedback-${item.id}-${activityItem.id}-${field.id}`);
        const hasResponse = field.kind === 'choice'
          ? field.options.some((option) => option.id === value)
          : field.kind === 'multi'
            ? Array.isArray(value) && value.length > 0
            : isRecord(value) && field.items.every((sortItem) => field.categories.some((category) => category.id === value[sortItem.id]));
        if (!hasResponse) {
          const reminder = field.kind === 'sort'
            ? 'Önce tüm kartları bir gruba yerleştir.'
            : field.kind === 'multi' ? 'Önce en az bir seçenek işaretle.' : 'Önce bir seçenek işaretle.';
          if (feedback) feedback.innerHTML = `<div class="social-choice-feedback is-reminder" role="status" aria-live="polite">${escapeHTML(reminder)}</div>`;
          return;
        }
        saved.choiceChecks[activityItem.id][field.id] = true;
        persist();
        if (feedback) feedback.innerHTML = choiceFeedbackHTML(field, value, true);
        refreshProgressUI();
        return;
      }

      const sortCard = event.target.closest('[data-social-sort-item]');
      if (sortCard) {
        const widget = sortCard.closest('[data-social-sort-widget]');
        const context = socialSortContext(widget);
        if (!context) return;
        const itemId = sortCard.dataset.socialSortItem;
        const sameCard = selectedSocialSortCard
          && selectedSocialSortCard.weekId === context.weekId
          && selectedSocialSortCard.activityId === context.activityItem.id
          && selectedSocialSortCard.fieldId === context.field.id
          && selectedSocialSortCard.itemId === itemId;
        selectedSocialSortCard = sameCard ? null : {
          weekId: context.weekId,
          activityId: context.activityItem.id,
          fieldId: context.field.id,
          itemId,
        };
        root.querySelectorAll('[data-social-sort-item]').forEach((card) => {
          const active = selectedSocialSortCard?.itemId === card.dataset.socialSortItem;
          card.classList.toggle('is-selected', active);
          card.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        const status = widget.querySelector('[data-social-sort-status]');
        if (status) {
          const sortItem = context.field.items.find((candidate) => candidate.id === itemId);
          status.textContent = sameCard ? 'Kart seçimi kaldırıldı.' : `“${sortItem?.label || 'Kart'}” seçildi. Şimdi bir hedef grubu seç veya kartı sürükle.`;
        }
        return;
      }

      const sortTarget = event.target.closest('[data-social-sort-target]');
      if (sortTarget) {
        const widget = sortTarget.closest('[data-social-sort-widget]');
        const context = socialSortContext(widget);
        const matchesSelection = context && selectedSocialSortCard
          && selectedSocialSortCard.weekId === context.weekId
          && selectedSocialSortCard.activityId === context.activityItem.id
          && selectedSocialSortCard.fieldId === context.field.id;
        if (matchesSelection) moveSocialSortCard(widget, selectedSocialSortCard.itemId, sortTarget.dataset.socialSortTarget);
        else {
          const status = widget?.querySelector('[data-social-sort-status]');
          if (status) status.textContent = 'Önce bir kart seç, sonra hedef gruba tıkla.';
        }
        return;
      }

      if (event.target.closest('[data-social-print]')) window.print();
    });

    root.addEventListener('dragstart', (event) => {
      const card = event.target.closest('[data-social-sort-item]');
      if (!card) return;
      const widget = card.closest('[data-social-sort-widget]');
      const context = socialSortContext(widget);
      if (!context) return;
      selectedSocialSortCard = {
        weekId: context.weekId,
        activityId: context.activityItem.id,
        fieldId: context.field.id,
        itemId: card.dataset.socialSortItem,
      };
      if (event.dataTransfer) {
        event.dataTransfer.setData('text/plain', card.dataset.socialSortItem);
        event.dataTransfer.effectAllowed = 'move';
      }
      card.classList.add('is-dragging');
    });

    root.addEventListener('dragend', (event) => {
      const card = event.target.closest('[data-social-sort-item]');
      card?.classList.remove('is-dragging');
    });

    root.addEventListener('dragover', (event) => {
      const target = event.target.closest('[data-social-sort-target]');
      if (!target) return;
      event.preventDefault();
      target.classList.add('drag-over');
      if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    });

    root.addEventListener('dragleave', (event) => {
      const target = event.target.closest('[data-social-sort-target]');
      if (!target || (event.relatedTarget && target.contains(event.relatedTarget))) return;
      target.classList.remove('drag-over');
    });

    root.addEventListener('drop', (event) => {
      const target = event.target.closest('[data-social-sort-target]');
      if (!target) return;
      event.preventDefault();
      target.classList.remove('drag-over');
      const widget = target.closest('[data-social-sort-widget]');
      const itemId = event.dataTransfer?.getData('text/plain') || selectedSocialSortCard?.itemId;
      if (itemId) moveSocialSortCard(widget, itemId, target.dataset.socialSortTarget);
    });

    root.addEventListener('keydown', (event) => {
      const target = event.target.closest('[data-social-sort-target]');
      if (!target || !['Enter', ' ', 'Spacebar'].includes(event.key)) return;
      event.preventDefault();
      const widget = target.closest('[data-social-sort-widget]');
      const context = socialSortContext(widget);
      const matchesSelection = context && selectedSocialSortCard
        && selectedSocialSortCard.weekId === context.weekId
        && selectedSocialSortCard.activityId === context.activityItem.id
        && selectedSocialSortCard.fieldId === context.field.id;
      if (matchesSelection) moveSocialSortCard(widget, selectedSocialSortCard.itemId, target.dataset.socialSortTarget);
      else {
        const status = widget?.querySelector('[data-social-sort-status]');
        if (status) status.textContent = 'Önce bir kart seç, sonra hedef gruba odaklanıp Enter veya Boşluk tuşuna bas.';
      }
    });

    root.addEventListener('input', (event) => {
      const input = event.target.closest('[data-social-response]');
      if (!input || input.type === 'radio' || input.type === 'checkbox') return;
      const weekId = Number(input.dataset.socialWeek);
      const item = WEEK_BY_ID.get(weekId);
      const activityItem = item?.activities.find((candidate) => candidate.id === input.dataset.socialActivity);
      const field = activityItem?.fields.find((candidate) => candidate.id === input.dataset.socialResponse);
      if (!item || !activityItem || !field || ['choice', 'multi', 'sort', 'checklist'].includes(field.kind)) return;
      const saved = ensureWeekProgress(weekId);
      saved.responses[activityItem.id][field.id] = input.value;
      persist();
      if (field.kind === 'words') updateWordPreview(input);
      refreshProgressUI();
    });

    root.addEventListener('change', (event) => {
      const input = event.target;
      const weekId = Number(input.dataset.socialWeek);
      const item = WEEK_BY_ID.get(weekId);
      if (!item) return;
      const saved = ensureWeekProgress(weekId);
      if (input.dataset.socialMulti && input.type === 'checkbox') {
        const activityItem = item.activities.find((candidate) => candidate.id === input.dataset.socialActivity);
        const field = activityItem?.fields.find((candidate) => candidate.id === input.dataset.socialMulti);
        if (!activityItem || !field || field.kind !== 'multi' || !field.options.some((option) => option.id === input.dataset.socialOption)) return;
        const selected = new Set(Array.isArray(saved.responses[activityItem.id][field.id]) ? saved.responses[activityItem.id][field.id] : []);
        if (input.checked) selected.add(input.dataset.socialOption);
        else selected.delete(input.dataset.socialOption);
        saved.responses[activityItem.id][field.id] = field.options.filter((option) => selected.has(option.id)).map((option) => option.id);
        delete saved.choiceChecks[activityItem.id][field.id];
        const feedback = document.getElementById(`social-choice-feedback-${item.id}-${activityItem.id}-${field.id}`);
        if (feedback) feedback.innerHTML = '';
      } else if (input.dataset.socialResponse && input.type === 'radio') {
        const activityItem = item.activities.find((candidate) => candidate.id === input.dataset.socialActivity);
        const field = activityItem?.fields.find((candidate) => candidate.id === input.dataset.socialResponse);
        if (!activityItem || !field || field.kind !== 'choice' || !field.options.some((option) => option.id === input.value)) return;
        saved.responses[activityItem.id][field.id] = input.value;
        delete saved.choiceChecks[activityItem.id][field.id];
        const feedback = document.getElementById(`social-choice-feedback-${item.id}-${activityItem.id}-${field.id}`);
        if (feedback) feedback.innerHTML = '';
      } else if (input.dataset.socialTask !== undefined) {
        const index = Number(input.dataset.socialTask);
        if (!Number.isInteger(index) || index < 0 || index >= item.tasks.length) return;
        saved.tasks[index] = input.checked;
      } else if (input.dataset.socialCheck) {
        const activityItem = item.activities.find((candidate) => candidate.id === input.dataset.socialActivity);
        const field = activityItem?.fields.find((candidate) => candidate.id === input.dataset.socialCheck);
        if (!field || field.kind !== 'checklist' || !field.options.some((option) => option.id === input.dataset.socialOption)) return;
        if (!saved.responses[activityItem.id][field.id]) {
          saved.responses[activityItem.id][field.id] = Object.fromEntries(field.options.map((option) => [option.id, false]));
        }
        saved.responses[activityItem.id][field.id][input.dataset.socialOption] = input.checked;
      } else if (input.dataset.socialProvider && PROVIDERS.includes(input.dataset.socialProvider)) {
        saved.platforms[input.dataset.socialProvider] = input.checked;
      } else {
        return;
      }
      persist();
      refreshProgressUI();
    });

    render();
  }

  function render() {
    bindEvents();
    renderWeekList();
    renderSelectedWeek();
    refreshProgressUI();
  }

  function exportProgress() {
    return JSON.parse(JSON.stringify(progress));
  }

  function importProgress(value) {
    progress = normalizeProgress(value);
    persist();
    render();
  }

  function resetProgress() {
    progress = emptyProgress();
    persist();
    render();
  }

  window.SOCIAL_STUDIES = {
    weeks: WEEKS,
    units: UNITS,
    render,
    exportProgress,
    importProgress,
    resetProgress,
    getProviderLinks,
    isActivityComplete,
    isWeekComplete,
    normalizeProgress,
  };
})();
