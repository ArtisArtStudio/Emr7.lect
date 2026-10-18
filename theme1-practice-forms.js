(() => {
  const field = (id, label, type = "textarea", extra = {}) => ({ id, label, type, ...extra });
  const text = (id, label, rows = 3) => field(id, label, "textarea", { rows });
  const select = (id, label, options) => field(id, label, "select", { options });
  const radio = (id, label, options) => field(id, label, "radio", { options });
  const q = (id, prompt, fields, extra = {}) => ({ id, prompt, fields, ...extra });
  const opts = (...labels) => labels.map(label => ({ value: label, label }));
  const yesNo = opts("Evet", "Hayır", "Kararsızım");
  const df = opts("Doğru", "Yanlış");
  const semicolonUses = opts(
    "Virgülle ayrılmış tür veya takımları gruplama",
    "Virgüllerle sıralanmış bağlı cümleleri ayırma",
    "Ögeleri arasında virgül bulunan sıralı cümleleri ayırma"
  );

  window.THEME1_FORMS = {
    "marti-a01": [
      q("stop-1", "Birinci numaralı durakta dur. Bundan sonra ne olacağını tahmin et ve metindeki ipucunu göster.", [text("prediction", "Tahminim ve metindeki ipucum")], { sourceStage: "pause1" }),
      q("stop-2", "İkinci numaralı durakta tahminini güncelle. Yeni tahminine hangi ayrıntı yol açtı?", [text("prediction", "Güncel tahminim ve dayanağım")], { sourceStage: "pause2" }),
      q("after-reading", "Öyküyü bitirince iki tahminini olayların sonucuyla karşılaştır. Tahminlerinden birini değiştirmen gerekse hangisi olurdu?", [text("comparison", "Karşılaştırmam ve kısa öz değerlendirmem")], { sourceStage: "full" })
    ],
    "marti-a02": [
      ...["özgür", "sınırlarını zorlamak", "sıra dışı", "tutku"].map((word, index) => q(
        `word-${index + 1}`,
        `“${word}” sözcüğünü anahtar söz varlığı çalışmana alıp almayacağına karar ver. Kararını öyküdeki kullanımına dayandır.`,
        [
          radio("key-word", "Bu sözcüğü anahtar söz varlığına seçiyor musun?", yesNo),
          text("context-meaning", "Metindeki anlamı: Bu öyküde ne anlatıyor?", 2),
          text("dictionary-meaning", "Sözlük anlamı: Kaynaktan doğruladığın anlam", 2),
          text("associations", "Çağrıştırdığı kelimeler (en az iki)", 2)
        ],
        { sourceStage: "full" }
      )),
      q("word-relationships", "Dört sözcük arasında anlam bağı kur. İki sözcük çifti seç; her çiftte ilişkinin benzerlik, amaç, neden-sonuç ya da çağrışım olup olmadığını belirt.", [
        text("pair-one", "Birinci sözcük çifti ve aralarındaki ilişki", 2),
        text("pair-two", "İkinci sözcük çifti ve aralarındaki ilişki", 2),
        text("selection-reason", "Seçtiğin anahtar sözcüklerin öykünün ana düşüncesini nasıl desteklediği", 3)
      ], { sourceStage: "full" })
    ],
    "marti-a03": [
      q("evidence-1", "Jonathan’ın sıradan uçuşların ötesine geçmek istediğini gösteren iki davranışı bul.", [text("answer", "İki davranış ve metindeki dayanak", 3)], { sourceStage: "full" }),
      q("evidence-2", "Bir denemesi başarısız olduğunda Jonathan yöntemini nasıl değiştirdi?", [text("answer", "Yanıtım ve olaydan kanıt", 3)], { sourceStage: "full" }),
      q("evidence-3", "Ailesinin kaygısının kaynağı ile Jonathan’ın önceliği arasındaki farkı açıkla.", [text("answer", "İki bakış açısı ve metinden dayanak", 3)], { sourceStage: "full" }),
      q("evidence-4", "Hangi olay Jonathan’ın uçuş hedefini daha belirgin hâle getirir? Olayın etkisini açıkla.", [text("answer", "Olay ve etkisi", 3)], { sourceStage: "full" }),
      q("evidence-5", "Sürüden uzak kalması Jonathan’ın öğrenme biçimini nasıl etkiler? Metinden kanıtla.", [text("answer", "Çıkarımım ve metinden kanıt", 3)], { sourceStage: "full" })
    ],
    "marti-a04": [
      q("serim", "SERİM: Kişiyi, ortamı ve başlangıçtaki amacı kısa ve tutarlı biçimde tanıt.", [text("answer", "Serim özeti", 4)], { sourceStage: "full" }),
      q("dugum", "DÜĞÜM: Amaca ulaşırken yaşanan temel güçlüğü ve önemli bir denemeyi anlat.", [text("answer", "Düğüm özeti", 4)], { sourceStage: "full" }),
      q("cozum", "ÇÖZÜM: Öykünün sonunda Jonathan’ın durumunda nelerin değiştiğini açıkla.", [text("answer", "Çözüm özeti", 4)], { sourceStage: "full" }),
      q("coherence-1", "Önemli olaylar birbirini hazırlıyor mu? Bir örnek ver.", [text("answer", "Değerlendirmem ve örnek", 3)], { sourceStage: "full" }),
      q("coherence-2", "Bir olayın sonucu sonraki bir olaya neden oluyor mu? Metinden bir neden-sonuç zinciri kur.", [text("answer", "Neden → sonuç → sonraki olay", 3)], { sourceStage: "full" }),
      q("coherence-3", "Kişi, zaman veya olay akışında tutarlı ya da geliştirilmesi gerektiğini düşündüğün bir yeri gerekçelendir.", [text("answer", "Değerlendirmem ve gerekçem", 3)], { sourceStage: "full" })
    ],
    "marti-a05": [
      q("problem", "Jonathan’ın yaşadığı zorluğu (aç kalma, canının yanması ya da sürüden ayrı görülme gibi) bir cümleyle tanımla.", [text("answer", "Jonathan’ın temel problemi", 2)], { sourceStage: "full" }),
      q("jonathan-view", "Jonathan’ın bakış açısından çıkarılabilecek bir sonucu, metinden dayanakla açıkla.", [text("answer", "Çıkarım ve dayanak", 3)], { sourceStage: "full" }),
      q("relative-view", "Onu seven bir yakının bakış açısından çıkarılabilecek farklı bir sonucu yaz.", [text("answer", "Farklı bakış açısı ve gerekçesi", 3)], { sourceStage: "full" })
    ],
    "marti-a06": [
      q("problem", "Jonathan’ın çevresinden yeterli destek alamadığı durumu kısaca özetle.", [text("answer", "Sorunun özeti", 2)], { sourceStage: "full" }),
      ...[1, 2, 3].map(number => q(`solution-${number}`, `${number}. çözüm önerini açıkla. Öneri uygulanabilir ve diğerlerinden farklı olsun.`, [text("answer", `Öneri ${number} ve neden işe yarayabileceği`, 3)], { sourceStage: "full" })),
      q("choose", "Üç önerinden en uygulanabilirini seç. Neden bu çözüm diğerlerinden daha uygun?", [text("answer", "Seçimim ve gerekçem", 3)], { sourceStage: "full" })
    ],
    "marti-a07": [
      ...[
        "Bir balıkçı teknesini izleyip yiyeceğe ulaşmaya çalışmak",
        "Yiyecek aramıyorken belirli bir manevrayı tekrar etmek",
        "Sürünün alışılmış rotasını izleyerek kıyıya dönmek",
        "Hızını denetlemek için kanat açısını değiştirmek",
        "Günün çoğunu balıkçı teknesinin çevresinde yiyecek arayarak geçirmek",
        "Düşüşün nedenini inceleyip yeni bir yöntem denemek",
        "Uçuşu yalnızca karın doyurmanın aracı saymak",
        "Bir sonraki gün için öğrenilecek bir uçuş hareketi seçmek"
      ].map((behavior, index) => q(
        `sort-${index + 1}`,
        behavior,
        [select("group", "Bu davranışı hangi gruba yerleştirirsin?", opts(
          "Uçuşu günlük gereksinim (yiyecek) için kullanma",
          "Uçuşu öğrenme ve deneme alanı olarak görme"
        ))],
        { sourceStage: "full", responseType: "matching" }
      )),
      q("group-check", "Her grupta dört davranış bulunduğunu kontrol et. Sınıflandırma ölçütünü kendi sözlerinle açıkla.", [text("criterion", "İki grubu ayıran ölçüt", 2)], { sourceStage: "full" })
    ],
    "marti-a08": [
      q("topic", "Kitaptaki QR içeriği ‘Hayat Büyük Bir Okuldur’ videosunu izledikten sonra konusunu tek cümleyle yaz.", [text("answer", "Videonun konusu", 2)], { sourceMode: "qr" }),
      q("keywords", "Videodan beş anahtar kelime seç. Her birinin ana düşünceyle bağını kısa notla belirt.", [
        ...[1, 2, 3, 4, 5].map(number => text(`word-${number}`, `Anahtar kelime ${number} ve ana düşünceyle bağı`, 2))
      ], { sourceMode: "qr" }),
      q("relationship", "Seçtiğin iki kelimenin birbiriyle ve videonun ana düşüncesiyle ilişkisini açıkla.", [text("answer", "İki kelime, aralarındaki ilişki ve dayanağım", 3)], { sourceMode: "qr" })
    ],
    "marti-a09": [
      ...[
        "Başlık, içeriğin ana düşüncesini yansıtıyor mu?",
        "Öğrenme örnekleri konuyu anlamak için yeterli mi; hangi tür bir örnek eklenebilirdi?",
        "Örneklerin sırası izleyenin ilgisini ve anlamasını destekliyor mu?"
      ].map((prompt, index) => q(`criterion-${index + 1}`, prompt, [
        radio("decision", "Kararın", opts("Evet", "Kısmen", "Hayır")),
        text("evidence", "Kararını gerekçelendiren gördüğün/duyduğun ayrıntı", 2)
      ], { sourceMode: "qr" }))
    ],
    "marti-a10": [
      q("experiences", "Biri eğlenceli, biri başkasına örnek olabilecek iki öğrenme deneyimini not et.", [
        text("fun-experience", "Eğlenceli deneyim: ne zaman, ne öğrendin, ne yaptın, sonuç ne oldu?", 4),
        text("useful-experience", "Başkalarına örnek olabilecek deneyim: ne zaman, ne öğrendin, ne yaptın, sonuç ne oldu?", 4)
      ]),
      q("purpose", "Konuşmak için bir deneyim seç. Amacın dinleyiciyi eğlendirmek mi, yol göstermek mi? Konuşma türünü belirt.", [
        radio("experience", "Hangi deneyimi seçiyorsun?", opts("Eğlenceli deneyim", "Başkalarına yol gösterecek deneyim")),
        radio("purpose", "Konuşmanın baskın amacı", opts("Eğlendirmek", "Bilgilendirmek / yol göstermek")),
        text("reason", "Seçimimin ve konuşma türümün gerekçesi", 2)
      ]),
      q("speech-plan", "Yaklaşık bir dakikalık konuşmanı hazırla. Hangi ayrıntıyı özellikle vurgulayacağını belirt.", [
        text("opening", "Başlangıç: dinleyicinin ilgisini nasıl çekersin?", 2),
        text("main", "Deneyim ve önemli ayrıntılar", 4),
        text("emphasis", "Özellikle vurgulayacağım ayrıntı ve kapanış", 3)
      ])
    ],
    "marti-a11": [
      ...[
        "Atölyede resim, seramik, ebru; sahnede müzik, şiir ve dans çalışmaları vardı.",
        "Kamp çantasına harita, pusula, yağmurluk; mutfak kutusuna tabak, bardak, kaşık kondu.",
        "Araştırma için dergi, kitap, ansiklopedi; sunum için grafik, fotoğraf ve çizelge hazırlandı.",
        "Zil çaldı, öğrenciler sınıfa geçti; öğretmen yoklamayı aldı, dersi başlattı.",
        "Kütüphanede kaynakları taradık, not aldık; eve dönünce planı gözden geçirip düzenledik.",
        "Önce soruyu okudum, anahtar sözcükleri çizdim; sonra kanıtı buldum, cevabımı yazdım.",
        "Öğrencilerden Nehir, Mert, Ela; afişleri zamanında hazırladılar.",
        "Antrenörler Arda, Defne, Selin; çalışma takvimini birlikte düzenlediler.",
        "Doğa gözlem ekibinden Ege, Lara, Can; fotoğrafları ve notları sınıfa sundular."
      ].map((sentence, index) => q(
        `example-${index + 1}`,
        sentence,
        [select("function", "Noktalı virgülün burada gösterilen işlevi", semicolonUses)],
        { responseType: "matching" }
      )),
      ...[
        ["lists", "Virgülle ayrılmış sözcük grupları"],
        ["sentences", "Virgüllerle sıralanmış bağlı cümleler"],
        ["subjects", "Ögeleri arasında virgül bulunan sıralı cümleler"]
      ].map(([id, label]) => q(`rule-${id}`, `Bu kullanım için kuralı ve yeni bir örneği yaz: ${label.toLowerCase()}.`, [
        text("rule", "Kuralı kendi sözlerinle", 2),
        text("example", "Yeni örnek cümlem", 2)
      ]))
    ],
    "marti-a12": [
      q("email-purpose", "E-postanın konusunu ve yanıtının amacını belirle.", [text("answer", "Konu ve yanıt amacım", 2)]),
      q("email-plan", "Yöneticinin yanıtında uygulanabilir bir çözüm ve gerekçe olmalı. Ne önereceğini planla.", [
        text("solution", "Çözüm: ne zaman, ne kadar süreyle, nasıl düzenlenir?", 3),
        text("reason", "Gerekçem ve uymayı beklediğim kurallar", 2)
      ]),
      q("email-write", "Ada’ya uygun selamlama, hitap ve kapanış içeren tam bir yanıt e-postası yaz.", [text("answer", "Yanıt e-postam", 7)])
    ],

    "genclik-a01": [
      ...["hüsran", "ihtimam", "dağarcık", "umursamazlık"].map((word, index) => q(`word-${index + 1}`, `“${word}” kelimesinin anlamını metindeki bağlamdan tahmin et; sonra sözlükten doğrula.`, [
        text("context-clue", "Kelimenin geçtiği cümle/bağlamdan aldığım ipucu", 2),
        text("guess", "Metindeki anlam tahminim", 2),
        text("dictionary", "Sözlük anlamı ve tahminimle karşılaştırmam", 2)
      ], { sourceKey: "gencligin" }))
    ],
    "genclik-a02": [
      ...[
        ["Bir eğitim araştırmacısının görüşü, düzenli okumanın düşünme becerilerini beslediğini vurguluyor.", "Tanık gösterme"],
        ["Bir hedefe emek vermek, her gün sulanan bir fidanı büyütmeye benzer.", "Benzetme"],
        ["Bir öğrenci kitap okuyarak, enstrüman öğrenerek veya takım çalışmasına katılarak kendini geliştirebilir.", "Örneklendirme"],
        ["Plansız çalışma dağınık ilerler; küçük hedeflere ayrılan çalışma daha kolay izlenir.", "Karşılaştırma"]
      ].map(([sentence, expected], index) => q(`method-${index + 1}`, sentence, [
        select("method", "Baskın düşünceyi geliştirme yolu", opts("Tanık gösterme", "Benzetme", "Örneklendirme", "Karşılaştırma")),
        text("contribution", "Bu yol, anlatılan düşünceyi nasıl güçlendiriyor?", 2)
      ], { expected, responseType: "matching" })),
      q("methods-summary", "Düşünceyi geliştirme yollarından ikisini seç. Bir düşünceyi daha anlaşılır veya inandırıcı kılmak için nasıl kullanıldıklarını karşılaştır.", [text("answer", "İki yol ve anlatıma katkılarının karşılaştırması", 3)])
    ],
    "genclik-a03": [
      ...[
        "Metinde ilkbahar imgesi insan yaşamının hangi dönemini anlatmak için kullanılıyor?",
        "Nehir benzetmesi zaman hakkında hangi düşünceyi destekliyor?",
        "Yazar, gençlikte edinilen alışkanlıkların ileriki yaşlara etkisini nasıl kuruyor?",
        "Bahçıvan ve meyve imgesindeki sorumluluğu iki farklı kişi açısından açıkla.",
        "Kendi yaşamında geleceğe hazırlık için bugün atabileceğin bir adımı gerekçelendir."
      ].map((prompt, index) => q(`interpret-${index + 1}`, prompt, [text("answer", "Yanıtım ve denemeden dayanağım", 3)], { sourceKey: "gencligin" }))
    ],
    "genclik-a04": [
      q("visual-link", "Kitaptaki ‘Bir İyilik Hikâyesi’ videosunu izleyip fotoğraflara bak. Bir fotoğrafla videodaki bir an arasında nasıl anlam bağı kurdun?", [
        text("photo", "Seçtiğim fotoğraftaki ayrıntı", 2),
        text("video", "Videoda ilişkilendirdiğim an", 2),
        text("link", "İki kaynağın kurduğu anlam bağı", 3)
      ], { sourceMode: "qr" }),
      q("shared-message", "Fotoğrafları çeken kişiyle video hazırlayanların ortak iletisi ne olabilir? Bir görsel/video ayrıntısıyla gerekçelendir.", [text("answer", "Ortak ileti ve dayanağım", 3)], { sourceMode: "qr" })
    ],
    "genclik-a05": [
      ...[
        "Ara sıra kısa bir mola vermek dikkatimizi tazeleyebilir.",
        "Elif, arkadaşıyla doğru-dürüst konuşup sorunu çözdü.",
        "Yeni kavramları tekrar tekrar gözden geçirdi.",
        "Çoluk-çocuk hep birlikte kitaplık için kutu taşıdı.",
        "Takım arkadaşları omuz omuza çalıştı.",
        "Planını günden güne geliştirdi.",
        "Öğrenciler irili ufaklı yaprakları sınıflandırdı.",
        "Çantamızı baştan başa gözden geçirip eksikleri tamamladık.",
        "Arada sırada değil, düzenli olarak notlarını yeniledi.",
        "Gönüllüler proje boyunca el-ele çalıştı."
      ].map((sentence, index) => q(`sentence-${index + 1}`, sentence, [
        radio("judgment", "Cümledeki ikilemenin yazımı", df),
        text("correction", "Yanlışsa ikilemenin doğru yazımını yaz; doğruysa ‘düzeltme gerekmiyor’ de.", 2)
      ]))
    ],
    "genclik-a06": [
      ...[
        "— Bu kararı sen mi verdin? — Ben…",
        "Duru!.. Bir dakika, seni bekliyoruz!",
        "Yolun sonunda kapı açıldı ve karşısında…",
        "— Kiminle konuşmak istiyorsun? — Öğretmenimle…"
      ].map((example, index) => q(`function-${index + 1}`, example, [select("function", "Üç noktanın bu örnekteki işlevi", opts(
        "Yanıtın tamamlanmadığını / eksik bırakıldığını gösterme",
        "Seslenme veya vurguyu güçlendirme",
        "Anlatımı sürdürmeden bırakma"
      ))], { responseType: "matching" })),
      q("new-examples", "Üç noktanın iki farklı işlevine uygun iki yeni cümle yaz; her cümlenin hangi işlevi gösterdiğini belirt.", [
        text("example-one", "Yeni cümle 1 ve işlevi", 2),
        text("example-two", "Yeni cümle 2 ve işlevi", 2)
      ])
    ],
    "genclik-a07": [
      ...["Akran 1", "Akran 2", "Akran 3", "Yetişkin 1", "Yetişkin 2", "Yetişkin 3"].map((person, index) => q(`interview-${index + 1}`, `${person} ile görüş: önümüzdeki beş yıl için hedefi ve hedefe yönelik çalışmaları neler?`, [
        text("goal", "Hedefi", 2),
        text("actions", "Hedefe yönelik çalışmaları", 2)
      ])),
      q("comparison", "Görüşme notlarına dayanarak gençler ve yetişkinler arasındaki benzerlikleri/farklılıkları karşılaştır.", [
        text("similarities", "İki benzerlik", 3),
        text("differences", "İki farklılık", 3),
        select("display", "Bilgiyi hangi görselle sunacaksın?", opts("Karşılaştırma tablosu", "Şema", "Grafik + kısa açıklama"))
      ]),
      q("presentation", "Görüşme sonuçlarını sun. Ana düşünceni ve kullanacağın görsel/şemayı planla.", [
        text("main-idea", "Sunumun ana düşüncesi", 2),
        text("evidence", "Kullanacağım iki görüşme bulgusu", 3),
        text("visual", "Kullanacağım görsel/şema ve nasıl açıklayacağım", 2)
      ])
    ],
    "genclik-a08": [
      ...["Öğrenme hedefi belirleme", "Düzenli çalışma alışkanlığı", "Merak edip soru sorma", "Zamanı planlama", "Geri bildirimden yararlanma"].map((criterion, index) => q(`criterion-${index + 1}`, `Bu ölçütü değerlendir: ${criterion}. Son iki yıldan somut bir örnek ver.`, [
        radio("rating", "Kendimi nasıl değerlendiriyorum?", opts("Gelişti", "Kısmen gelişti", "Üzerinde çalışıyorum")),
        text("evidence", "Son iki yıldan örneğim ve ulaştığım sonuç", 3)
      ])),
      q("reflection", "Beş ölçütünü birlikte değerlendir. Güçlü yanlarından ve geliştirmek istediğin bir adımdan söz et.", [text("answer", "Öz değerlendirme yazım", 5)])
    ],
    "cause-effect-a01": [
      q("starting-cause", "Kısa metinde değişimi başlatan neden nedir?", [text("answer", "Başlangıç nedeni", 2)], { sourceMode: "activity" }),
      q("outcome-1", "İlk sonuç ne oldu ve sonraki adımı nasıl etkiledi?", [text("answer", "İlk sonuç → sonraki adıma etkisi", 2)], { sourceMode: "activity" }),
      q("outcome-2", "İkinci sonuç ne oldu? Zincirin devamını açıkla.", [text("answer", "İkinci sonuç → zincirin devamı", 2)], { sourceMode: "activity" }),
      q("outcome-3", "Sonuç zincirinin sonunda ne değişti?", [text("answer", "Üçüncü sonuç", 2)], { sourceMode: "activity" }),
      q("connectors", "Metindeki iki neden-sonuç bağlantı ifadesini bul.", [text("answer", "İki ifade ve cümledeki görevleri", 2)], { sourceMode: "activity" }),
      q("summary", "Zinciri neden ve sonuçların sırasını koruyarak üç cümleyle özetle.", [text("answer", "Üç cümlelik özet", 4)], { sourceMode: "activity" })
    ],

    "sport-a01": [
      ...[1, 2, 3, 4, 5, 6].map(number => q(`vocabulary-${number}`, `Söyleşiden anlamını bilmediğin ${number}. kelimeyi seç.`, [
        text("context", "Duyduğum/gördüğüm bağlam veya kısa ifade", 2),
        text("guess", "Bağlamdan anlam tahminim", 2),
        text("verified", "Kaynak/sözlükle doğruladığım anlam", 2)
      ], { sourceMode: "qr" }))
    ],
    "sport-a02": [
      ...[
        "Sporcunun hedefini sürdürmesine yardım eden bir alışkanlık neydi?",
        "Karşılaştığı bir engel çalışma planını nasıl değiştirmiş olabilir?",
        "Söyleşide başarıyı açıklayan hangi düşünce sende karşılık buldu?",
        "İçeriği hazırlayanlar izleyicinin hangi konuda düşünmesini istiyor olabilir?",
        "Söyleşiden aklında kalan bir anı seç; sende oluşturduğu düşünceyi açıkla."
      ].map((prompt, index) => q(`listen-${index + 1}`, prompt, [text("answer", "Yanıtım ve videodan duyduğum/gördüğüm dayanak", 3)], { sourceMode: "qr" }))
    ],
    "sport-a03": [
      q("emotion", "Anlatılan bir anıda sporcunun hissediyor olabileceği duyguyu belirle. İki söz, davranış, yüz ifadesi veya ses tonu kanıtı ekle.", [
        select("emotion", "Seçtiğim duygu", opts("Heyecan", "Kararlılık", "Kaygı", "Gurur", "Sevinç", "Üzüntü", "Başka bir duygu")),
        text("evidence-one", "Birinci kanıt", 2),
        text("evidence-two", "İkinci kanıt", 2),
        text("reason", "Kanıtların bu duyguyu nasıl desteklediği", 2)
      ], { sourceMode: "qr" }),
      ...[1, 2, 3, 4].map(number => q(`trait-${number}`, `Söyleşiden ${number}. bir kanıt seç ve bundan çıkarılabilecek kişilik özelliğini açıkla.`, [
        text("evidence", "Söz, davranış veya ses/görüntü kanıtı", 2),
        text("trait", "Çıkarılabilecek kişilik özelliği", 2),
        text("reason", "Kanıt ile özellik arasındaki bağlantı", 2)
      ], { sourceMode: "qr" }))
    ],
    "sport-a04": [
      ...[
        "Ekrandaki soru yazıları, konuşmanın hangi konuya yöneldiğini gösterebilir.",
        "Konuşmacının yüz ifadesi ve ses tonu duyguya ilişkin ipucu taşıyabilir.",
        "Bir bölümde yazı görünmesi, ses ve görüntünün anlam katkısını ortadan kaldırır.",
        "Yazı, ses ve görüntü aynı mesajı destekleyecek biçimde birlikte kullanılabilir."
      ].map((statement, index) => q(`judgment-${index + 1}`, statement, [
        radio("judgment", "Yargı", df),
        text("evidence", "Videodan bu yargıyı destekleyen ya da düzelten örnek", 2)
      ], { sourceMode: "qr" }))
    ],
    "sport-a05": [
      ...[
        "Hedefler",
        "Günlük çalışmalar",
        "Karşılaştığı sorumluluklar",
        "Başarıyı değerlendirme biçimi"
      ].map((dimension, index) => q(`dimension-${index + 1}`, `Sporcunun millî takıma katılmadan önceki ve sonraki dönemini şu boyutta karşılaştır: ${dimension.toLowerCase()}.`, [
        text("before", "Millî takıma katılmadan önce", 2),
        text("after", "Millî takıma katıldıktan sonra", 2),
        text("evidence", "Söyleşiden dayanak", 2)
      ], { sourceMode: "qr" })),
      q("similarities-differences", "Dört boyutu gözden geçirip iki benzerlik ve iki farklılık çıkar.", [
        text("similarities", "İki benzerlik", 3),
        text("differences", "İki farklılık", 3)
      ], { sourceMode: "qr" })
    ],
    "sport-a06": [
      q("important-information", "Söyleşide özet için gerekli bilgileri seç; gereksiz ayrıntılardan ayır.", [
        text("important", "Önemli bulduğum bilgiler", 4),
        text("less-important", "Özete almayacağım ayrıntı ve neden", 2)
      ], { sourceMode: "qr" }),
      q("summary", "Söyleşinin akışını koruyarak 4–5 cümlelik kısa bir özet yaz.", [text("answer", "Özetim", 6)], { sourceMode: "qr" })
    ],
    "sport-a07": [
      q("poem-1", "PDF s. 47’deki birinci şiirde bulduğun söz sanatını yaz. Hangi anlamı güçlendiriyor?", [
        text("device", "Söz sanatı ve şiirdeki örneği", 2),
        text("effect", "Anlama katkısı", 2)
      ], { sourceMode: "book" }),
      q("poem-2", "PDF s. 47’deki ikinci şiirde bulduğun söz sanatını ve anlam katkısını açıkla.", [
        text("device", "Söz sanatı ve şiirdeki örneği", 2),
        text("effect", "Anlama katkısı", 2)
      ], { sourceMode: "book" }),
      q("structure", "İkinci şiirin dize ve kıta düzenini incele.", [
        text("lines", "Dize sayısı ve dize düzeni", 2),
        text("stanzas", "Kıta sayısı ve düzeni", 2)
      ], { sourceMode: "book" }),
      q("meter", "İkinci şiirde iki dizedeki hece sayısını say. Dize sonlarındaki ortak sesleri de belirle.", [
        text("line-one", "Birinci dize ve hece sayısı", 2),
        text("line-two", "İkinci dize ve hece sayısı", 2),
        text("sound", "Ortak sesler / uyak", 2)
      ], { sourceMode: "book" }),
      q("harmony", "Hece sayısı ve ses tekrarlarının şiirin ahengine nasıl katkı sağladığını açıkla.", [text("answer", "Ahenk değerlendirmem", 3)], { sourceMode: "book" }),
      q("extra-poem", "İstersen uygulamadaki ‘Ağaç ve Sen’ serbest okuma şiirinde de aynı incelemeyi yap.", [text("answer", "Serbest çalışma notum", 3)], { sourceMode: "none" })
    ],
    "sport-a08": [
      q("barrier", "Okulda veya mahallede özel gereksinimli bireylerin karşılaşabileceği bir engel seç ve tanımla.", [text("answer", "Sorunun tanımı ve gözlemim", 3)]),
      q("causes-effects", "Seçtiğin engelin iki olası nedenini ve günlük yaşama iki etkisini yaz.", [
        text("causes", "İki olası neden", 3),
        text("effects", "Günlük yaşama iki etkisi", 3)
      ]),
      ...[1, 2, 3].map(number => q(`solution-${number}`, `${number}. çözüm önerini yaz. Kimin ne yapacağını da belirt.`, [text("answer", `Öneri ${number} ve uygulama adımı`, 3)])),
      q("choose-solution", "En uygulanabilir çözümü seç ve nedenini açıkla.", [
        select("solution", "Seçtiğim çözüm", opts("Öneri 1", "Öneri 2", "Öneri 3")),
        text("reason", "Neden uygulanabilir? Kim, ne zaman, nasıl destek olabilir?", 3)
      ]),
      q("speech", "Bir dakikalık hazırlıklı konuşmanı planla; sorunu, kanıtı, çözümü ve çağrını sırala.", [
        text("opening", "Başlangıç: dikkat çekici giriş ve sorun", 3),
        text("body", "Neden/etki ve önerdiğim çözüm", 4),
        text("closing", "Çağrı ve kapanış", 2)
      ])
    ],
    "sport-a09": [
      ...[
        "Okulda Ece, Mert ve Can şiir; Duru, Alp ve Nehir sunum hazırladı.",
        "Sabah araştırdık, kaynakları seçtik; öğleden sonra notları düzenleyip paylaştık.",
        "Doğa gözlem ekibinden Lara, Deniz, Ozan; fotoğrafları ve çizelgeleri sergilediler."
      ].map((example, index) => q(`function-${index + 1}`, example, [select("use", "Noktalı virgülün kullanım işlevi", semicolonUses)], { responseType: "matching" })),
      ...[
        ["lists", "Virgülle ayrılmış kişi/tür adlarını iki grupta ayırma"],
        ["sentences", "Virgüllerle sıralanmış bağlı cümleleri ayırma"],
        ["subjects", "İçinde virgül bulunan sıralı cümleleri ayırma"]
      ].map(([id, description]) => q(`new-example-${id}`, `Bu işleve uygun özgün bir noktalı virgüllü cümle yaz: ${description}.`, [text("answer", "Yeni cümlem ve kullandığım işlev", 2)]))
    ],
    "sport-a10": [
      q("serim", "GİRİŞ: Arkadaşını kısaca tanıt ve gelecekte başarılı olabileceği meslek/alanı belirt.", [text("answer", "Giriş paragrafım", 4)]),
      q("dugum", "GELİŞME: Gözlem veya deneyimlerinden en az iki kanıtla meslek tahminini destekle.", [text("answer", "Gelişme paragrafım ve iki kanıt", 5)]),
      q("cozum", "SONUÇ: Arkadaşının bu alanda başarılı olabileceğine dair net bir yargı yaz.", [text("answer", "Sonuç paragrafım", 4)])
    ],

    "adiny-a01": [
      ...[
        "Kaoru’nun gökyüzüne ilgisini sürdürdüğünü gösteren iki seçim nedir?",
        "Kendi teleskopunu yapabilmek için hangi bilgi ve malzemeleri bir araya getirdi?",
        "Minoru Honda’nın tavsiyesi Kaoru’nun gözlem biçiminde neyi değiştirdi?",
        "İş ve gözlemi birlikte sürdürmesi onun planlılığı hakkında ne düşündürüyor?",
        "Öykünün sonunda değişen bir durumu ve bunun nedenini açıkla."
      ].map((prompt, index) => q(`story-${index + 1}`, prompt, [text("answer", "Yanıtım ve öyküden dayanağım", 3)], { sourceKey: "adini" }))
    ],
    "adiny-a02": [
      ...[1, 2, 3, 4].map(number => q(`evidence-${number}`, `${number}. davranış kanıtını seç. Bu davranış hangi kişilik özelliğini gösteriyor?`, [
        text("evidence", "Davranış / öyküden kanıt", 2),
        text("trait", "Kişilik özelliği", 2),
        text("reason", "Kanıtın bu özelliği destekleme nedeni", 2)
      ], { sourceKey: "adini" }))
    ],
    "adiny-a03": [
      ...[
        "Başlangıçtaki amaçları",
        "Karşılaştıkları engeller",
        "Engellere verdikleri tepkiler",
        "Öğrenme ve çalışma yöntemleri"
      ].map((dimension, index) => q(`compare-${index + 1}`, `Kaoru ile Yiğit Caner Aydın’ı karşılaştır: ${dimension.toLowerCase()}.`, [
        text("kaoru", "Kaoru: öyküden kanıt", 2),
        text("athlete", "Yiğit Caner Aydın: söyleşiden kanıt/not", 2),
        text("comparison", "Benzerlik veya farklılık", 2)
      ], { sourceKeys: ["adini"], sourceNote: "Kaoru öyküsü aşağıda verilmiştir. Yiğit Caner Aydın söyleşisi kitaptaki QR videodadır; uygulamada video dökümü yoktur. Söyleşiye ait ayrıntı uydurma, öğrencinin kendi notunu kullan." })),
      q("synthesis", "Kaoru öyküsü ile Yiğit Caner Aydın söyleşisini birlikte değerlendir. İki benzerlik ve iki farklılık yaz.", [
        text("similarities", "İki benzerlik", 3),
        text("differences", "İki farklılık", 3)
      ], { sourceKeys: ["adini"], sourceNote: "Kaoru öyküsü aşağıda verilmiştir. Yiğit Caner Aydın söyleşisi kitaptaki QR videodadır; uygulamada video dökümü yoktur. Söyleşiye ait ayrıntı uydurma, öğrencinin kendi notunu kullan." })
    ],
    "adiny-a04": [
      ...[
        ["serim", "Serim bölümü ölçütü"],
        ["dugum", "Düğüm bölümü ölçütü"],
        ["cozum", "Çözüm bölümü ölçütü"],
        ["connections", "Bölümler arası bağlantı ölçütü"]
      ].map(([id, label]) => q(`criterion-${id}`, `İyi bir öyküde bulunması gereken bir ölçüt yaz: ${label.toLowerCase()}.`, [text("criterion", "Ölçütüm", 2)], { sourceKey: "adini" })),
      q("evaluation", "Kaoru öyküsünü oluşturduğun ölçütlere göre değerlendir. Bir güçlü yön veya geliştirilebilecek noktaya metinden örnek ver.", [text("answer", "Değerlendirmem ve öyküden örnek", 4)], { sourceKey: "adini" })
    ],
    "adiny-a05": [
      ...[
        "Ali Kuşçu’nun doğduğu şehir",
        "Ailesinin ‘Kuşçu’ adını almasıyla ilişkili meslek",
        "Uluğ Bey’den aldığı bilim alanları",
        "Tamamlanmasına katkı verdiği astronomi tablosunun adı",
        "Uluğ Bey’in ölümünden sonra hac yolculuğunda uğradığı şehir",
        "Uzun Hasan’ın ona önerdiği diplomatik görev",
        "Fatih Camisi için yaptığı zaman ölçme aracı"
      ].map((item, index) => q(`note-${index + 1}`, `${index + 1}. dinleme notu: ${item}.`, [field("answer", "Dinlediğim bilgi", "text")], { sourceMode: "qr" }))
    ],
    "adiny-a06": [
      ...[
        "Ailesi Semerkant’taki bilim çevreleriyle ilişkiliydi.",
        "Uluğ Bey ve çevresindeki bilim insanlarından eğitim aldı.",
        "Gözlemevi çalışmalarında sorumluluk üstlendi.",
        "Uluğ Bey’in ölümünden sonra Semerkant’tan ayrıldı.",
        "Hac yolculuğu sırasında Tebriz’e uğradı.",
        "Fatih Sultan Mehmet’in daveti üzerine İstanbul’a geldi.",
        "Ayasofya Medresesi’nde görev aldı ve farklı alanlarda eserler yazdı.",
        "Fatih Camisi için güneş saati hazırladı."
      ].map((fact, index) => q(`stage-${index + 1}`, fact, [select("section", "Bu bilgi anlatının hangi bölümüne aittir?", opts("Giriş", "Gelişme", "Sonuç"))], { sourceMode: "qr", responseType: "matching" })),
      q("coherence", "Bilgilerin hangi sırayla ilerlemesi, anlatımın tutarlılığını nasıl sağlıyor?", [text("answer", "Sıralama ve tutarlılık açıklamam", 3)], { sourceMode: "qr" })
    ],
    "adiny-a07": [
      q("position", "Tartışmada savunacağın görüşü seç.", [radio("view", "Görüşüm", opts(
        "Başarıyı başlatan en güçlü etken merak ve gözlem becerisidir.",
        "Başarıyı kalıcı kılan en güçlü etken eğitim ve düzenli çalışmadır."
      ))]),
      q("claim", "Günlük yaşamdan bir örnek ve güvenilir bir kaynaktan destekle savını geliştir. Karşı görüşteki doğru noktayı da adilce özetle.", [
        text("claim", "Savım", 2),
        text("daily-evidence", "Günlük yaşamdan örnek", 3),
        text("source", "Güvenilir kaynağım / doğruladığım bilgi", 3),
        text("counterpoint", "Karşı görüşteki doğru nokta ve saygılı yanıtım", 4)
      ])
    ],
    "adiny-a08": [
      q("request", "Okulda ayda bir gökyüzü gözlem akşamı düzenlenmesi için okul yönetiminden ne isteyeceksin?", [text("answer", "İstek veya önerim", 2)]),
      q("reasons", "Önerinin gerekçelerini belirt.", [text("answer", "İki veya daha fazla gerekçem", 3)]),
      q("objection", "Yönetimin dile getirebileceği olası bir çekinceyi düşün ve yanıtla.", [text("answer", "Olası çekince ve yanıtım", 3)]),
      q("benefit", "Öneri gerçekleşirse öğrencilere/okula sağlayacağı faydaları açıkla.", [text("answer", "Beklediğim faydalar", 3)]),
      q("paragraph", "Planını selamlama ve kapanış içeren ikna edici bir paragrafa dönüştür.", [text("answer", "İkna paragrafım", 7)])
    ],
    "adiny-workshop": [
      ...[
        "Ailenizi hafta sonu bilim şenliğine katılmaya ikna edin.",
        "Öğretmeninizi sınıfta ayda bir öğrenci kitap/araştırma tanıtımı saati ayırmaya ikna edin."
      ].map((situation, index) => q(`situation-${index + 1}`, situation, [
        text("request", "Öneri / istek", 2),
        text("reason", "Gerekçe", 3),
        text("objection", "Olası itiraz ve yanıt", 3),
        text("benefit", "Beklenen fayda", 3),
        text("draft", "İkna taslağım", 5)
      ])),
      q("review", "İki taslağını gözden geçir. Öneri, gerekçe, itiraza yanıt ve fayda açık mı? Hangi değişikliği yaptın?", [text("answer", "Gözden geçirme notum", 3)])
    ],
    "adiny-production": [
      ...[
        ["An", "Bir hedefi ilk kez ciddiye aldığın an"],
        ["Plan", "Küçük adımları takvime dönüştürdüğün dönem"],
        ["Engel", "Bir engelle karşılaşıp yöntemini değiştirdiğin an"],
        ["Sonuç", "Sonucu değerlendirip yeni hedef belirlediğin bölüm"]
      ].map(([id, label]) => q(`story-${id.toLowerCase()}`, `${label}. Bu aşamayı öyküde nasıl göstereceksin?`, [text("draft", "Olay / taslak", 4)])),
      q("story-review", "Dört aşamayı tutarlı bir öyküde birleştir. Zaman ve neden-sonuç bağlantılarını gözden geçir.", [text("story", "Öyküm", 9)])
    ],
    "adiny-speaking": [
      q("situation", "Bir dakikalık konuşman için iki durumdan birini seç.", [radio("choice", "Seçimim", opts(
        "Kendi uzun vadeli hedefim için izlediğim yol ve motivasyonum",
        "Grup projesini planlama, görev dağılımı ve arkadaşları motive etme"
      ))]),
      q("plan", "Amacını, konuşma süreni ve örneklerini belirle; bir dakikalık konuşmanı planla.", [
        text("purpose", "Amacım ve dinleyicim", 2),
        text("examples", "Kullanacağım örnekler", 3),
        text("emphasis", "Vurgu, ses/beden dili ve kapanış", 3)
      ])
    ],
    "adiny-review": [
      q("review-1", "1. Ece çalışma biçiminde hangi değişikliği yaptı? Metinden bir ayrıntıyla açıkla.", [text("answer", "Yanıtım ve metin dayanağı", 3)], { sourceMode: "activity" }),
      q("review-2", "2. Metnin ana düşüncesini seç.", [radio("choice", "Yanıtım", opts(
        "A) Son güne bırakmak işleri kolaylaştırır.",
        "B) Planı gözden geçirmek çalışmayı daha düzenli kılabilir.",
        "C) Kaynak düzenlemek sunumla ilişkisizdir.",
        "D) Prova yapmak zaman kaybıdır."
      ))], { sourceMode: "activity" }),
      q("review-3", "3. ‘İşlerini küçük parçalara ayırdı’ ifadesi nasıl bir çalışma yöntemini anlatıyor?", [select("meaning", "En uygun açıklama", opts(
        "Bir işi daha küçük ve yönetilebilir adımlara bölmek",
        "Yapılacak işleri arkadaşlarına dağıtmak",
        "Bütün işleri aynı anda bitirmeye çalışmak"
      ))], { sourceMode: "activity" }),
      q("review-4", "4. Kitabındaki Ali Kuşçu dinleme içeriğinden zaman sırasını gösteren bir bilgi, önemli bir buluş ve ana mesajı not et.", [
        text("timeline", "Zaman sırasını gösteren bilgi", 2),
        text("achievement", "Önemli buluş / çalışması", 2),
        text("message", "Ana mesaj", 2)
      ], { sourceMode: "qr" }),
      q("review-5", "5. ‘Planlı çalışmanın öğrenmeye katkısı’ üzerine örnek ve gerekçe içeren kısa bir konuşma planla.", [
        text("claim", "Ana düşüncem", 2),
        text("example", "Örneğim", 3),
        text("reason", "Gerekçem ve kapanış", 3)
      ], { sourceMode: "activity" }),
      q("review-6", "6. Metindeki bir neden-sonuç zincirini kullanarak planlı çalışmanın yararı üzerine kısa bir paragraf yaz.", [text("answer", "Paragrafım", 5)], { sourceMode: "activity" }),
      q("review-7", "7. Noktalı virgülün üç farklı kullanımını seç ve her biri için özgün bir cümle yaz.", [
        ...[
          ["lists", "Virgülle ayrılmış grupları ayırma"],
          ["sentences", "Bağlı cümleleri ayırma"],
          ["subjects", "Ögeleri virgüllü sıralı cümleleri ayırma"]
        ].map(([id, label]) => text(id, `${label}: yeni cümlen`, 2))
      ], { sourceMode: "none" }),
      q("review-8", "8. Başlangıcı kullanarak düğüm ve çözüm bölümlerini tutarlı biçimde tamamla: ‘Bilim kulübünün sunum günü yaklaşırken, kullandığımız düzenek çalışmayı bıraktı…’", [
        text("dugum", "DÜĞÜM: sorun ve gelişen olay", 4),
        text("cozum", "ÇÖZÜM: sorun nasıl giderildi?", 4)
      ], { sourceMode: "none" })
    ]
  };
})();
