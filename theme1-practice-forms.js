(() => {
  const field = (id, label, type = "textarea", extra = {}) => ({ id, label, type, ...extra });
  const text = (id, label, rows = 3) => field(id, label, "textarea", { rows });
  const select = (id, label, options) => field(id, label, "select", { options });
  const radio = (id, label, options) => field(id, label, "radio", { options });
  const checkboxes = (id, label, options) => field(id, label, "checkboxes", { options });
  const sort = (id, label, categories, items, expectedAssignments = null, extra = {}) => field(id, label, "sort", { categories, items, ...(expectedAssignments ? { expectedAssignments } : {}), ...extra });
  // extra may hold sourceUrl/sourceLinkLabel for learners and sourceTranscript/answerKey for grounded checking.
  const q = (id, prompt, fields, extra = {}) => ({ id, prompt, fields, ...extra });
  const opts = (...labels) => labels.map(label => ({ value: label, label }));
  const yesNo = opts("Evet", "Hayır", "Kararsızım");
  const df = opts("Doğru", "Yanlış");

  window.THEME1_FORMS = {
    "marti-a01": [
      q("stop-1", "Birinci numaralı durakta dur. Bundan sonra ne olacağını tahmin et ve metindeki ipucunu göster.", [text("prediction", "Tahminim ve metindeki ipucum")], { sourceStage: "pause1" }),
      q("stop-2", "İkinci numaralı durakta tahminini güncelle. Yeni tahminine hangi ayrıntı yol açtı?", [text("prediction", "Güncel tahminim ve dayanağım")], { sourceStage: "pause2" }),
      q("after-reading", "Öyküyü bitirince iki tahminini olayların sonucuyla karşılaştır. Tahminlerinden birini değiştirmen gerekse hangisi olurdu?", [text("comparison", "Karşılaştırmam ve kısa öz değerlendirmem")], { sourceStage: "full" })
    ],
    "marti-a02": [
      q("word-context-match", "Eşleştirme: Dört kelime kartını öyküdeki anlam ipucuyla buluştur. Her kutuda bir kelime olmalı.", [
        sort("word-context", "Sözcükleri anlam ipuçlarıyla eşleştir", [
          { id: "freedom", icon: "🕊️", label: "Kendi kararını verebilme", description: "Jonathan kendisi olmayı ve uçmayı öğrenebilmeyi istiyor." },
          { id: "limits", icon: "📈", label: "Alıştığın düzeyin ötesine geçmeye çalışma", description: "Daha hızlı uçmayı öğrenmek için dikkatle çalışıp denemelerini geliştiriyor." },
          { id: "unusual", icon: "🌟", label: "Alışılmıştan farklı olma", description: "Diğer martılar düşmekten utanırken Jonathan denemeye devam ediyor." },
          { id: "passion", icon: "❤️", label: "Bir şeyi çok severek, güçlü istekle yapma", description: "Uçmak Jonathan için yiyecek aramaktan daha önemli." }
        ], [
          { id: "word-free", label: "özgür" },
          { id: "word-limits", label: "sınırlarını zorlamak" },
          { id: "word-unusual", label: "sıra dışı" },
          { id: "word-passion", label: "tutku" }
        ], {
          "word-free": "freedom", "word-limits": "limits", "word-unusual": "unusual", "word-passion": "passion"
        }, {
          instructions: "Önce kelime kartını oku; sonra kutudaki kısa anlamı ve öykü ipucunu karşılaştır. Kelimeyi en uygun kutuya sürükle ya da karta, ardından kutuya dokun.",
          guide: ["Kelimeyi oku", "Anlam ipucunu incele", "Uyan kutuya taşı"]
        })
      ], { sourceStage: "full", responseType: "matching", rubric: "Dört kelimenin hepsini kontrol et. Eşleşme yanlışsa kelime kartını ve yeniden düşünmesi gereken anlam ipucunu belirt; doğru eşleşmeyi doğrudan söyleme." }),
      q("dictionary-meanings", "Sözlük kontrolü: Her kelime için sözlükteki anlama en yakın seçeneği işaretle.", [
        select("free", "özgür", opts("Serbest; kendi kararını verebilen", "Alışılmışın dışında, farklı", "Bir şeye karşı güçlü sevgi ve istek")),
        select("limits", "sınırlarını zorlamak", opts("Beceri sınırını aşmak için çaba göstermek", "Bir gruba katılmak", "Bir işi çok sevmek")),
        select("unusual", "sıra dışı", opts("Alışılmışın dışında, farklı", "Serbest; kendi kararını verebilen", "Bir işi tekrar etmek")),
        select("passion", "tutku", opts("Bir şeye karşı güçlü sevgi ve istek", "Yiyecek bulma gereksinimi", "Alışılmış bir davranış"))
      ], {
        sourceStage: "full",
        answerKey: {
          free: "Serbest; kendi kararını verebilen",
          limits: "Beceri sınırını aşmak için çaba göstermek",
          unusual: "Alışılmışın dışında, farklı",
          passion: "Bir şeye karşı güçlü sevgi ve istek"
        },
        rubric: "Dört seçimi de değerlendirme ölçütlerine göre kontrol et. Yanlış seçim varsa kelimenin sözlük anlamına yeniden bakmasını söyle; doğru seçeneği öğrenci adına yazma."
      }),
      q("word-relationships", "Dört kelimeyi iki çift hâlinde düşün. İki çift seç; her çiftte kelimeler arasındaki bağı adlandır ve Jonathan'ın öyküsündeki amacına nasıl bağlandığını açıkla.", [
        text("pair-one", "Birinci kelime çifti ve aralarındaki bağ", 2),
        text("pair-two", "İkinci kelime çifti ve aralarındaki bağ", 2),
        text("selection-reason", "Bu kelimeler Jonathan'ın amacını nasıl anlatıyor?", 3)
      ], { sourceStage: "full" })
    ],
    "marti-a03": [
      q("evidence-1", "İki kanıt seç: Jonathan'ın yiyecek bulmaktan başka bir amacı olduğunu gösteren davranışları işaretle. Sonra birini öyküden bir ayrıntıyla destekle.", [
        checkboxes("behaviors", "Jonathan'ın öğrenme isteğini gösteren iki davranış", opts(
          "Yiyecek aramak yerine uçuş hareketlerini tekrar tekrar denemesi",
          "Hız ve süzülme üzerinde çalışıp becerisini geliştirmesi",
          "Balıkçı teknelerinin çevresinde yiyecek araması",
          "Ailesinin isteğiyle bir süre diğer martılar gibi davranması",
          "Annesinin ve babasının öğüdünü dinlemesi"
        )),
        text("evidence", "Seçtiğim davranışlardan biri için öyküdeki ipucu", 2)
      ], {
        sourceStage: "full",
        answerKey: { behaviors: ["Yiyecek aramak yerine uçuş hareketlerini tekrar tekrar denemesi", "Hız ve süzülme üzerinde çalışıp becerisini geliştirmesi"] },
        rubric: "Tam iki davranış seçilmesini ve en az birinin öyküden ayrıntıyla desteklenmesini kontrol et. Eksik ya da ilgisiz seçimi belirt; doğru kartların hangileri olduğunu söyleme."
      }),
      q("evidence-2", "Bir uçuş denemesi başarısız olunca Jonathan yeni bir yol aradı. Hangi seçeneği denedi?", [
        radio("change", "Yöntemindeki değişiklik", opts(
          "Kanatlarını gövdesine yaklaştırıp yalnızca kanat uçlarını kullanarak dalış yapmak",
          "Uçuş denemelerini bırakıp yalnızca yiyecek aramak",
          "Sürünün alışılmış uçuş yoluna dönmek"
        )),
        text("evidence", "Seçimini destekleyen metin ayrıntısı", 2)
      ], { sourceStage: "full", answerKey: { change: "Kanatlarını gövdesine yaklaştırıp yalnızca kanat uçlarını kullanarak dalış yapmak" }, rubric: "Seçilen yöntemi ve metin ayrıntısını kontrol et. Yanlışsa yeni yöntemin anlatıldığı bölüme geri yönlendir; doğru seçeneği doğrudan verme." }),
      q("evidence-3", "Jonathan ve ailesi uçuş konusunda aynı şeyi mi istiyor? Önce Jonathan'ın önceliğini seç, sonra iki bakış arasındaki farkı açıkla.", [
        radio("priority", "Jonathan için öncelikli olan", opts("Uçmayı öğrenmek", "Yalnızca yiyecek bulmak", "Sürünün alışkanlıklarını değiştirmemek")),
        text("difference", "Ailesinin kaygısı ile Jonathan'ın isteği arasındaki fark", 3)
      ], { sourceStage: "full", answerKey: { priority: "Uçmayı öğrenmek" }, rubric: "Öncelik seçimini ve aile kaygısıyla karşılaştırmasını ayrı ayrı değerlendir. Yanıt eksikse hangi bakış açısını açıklamadığını söyle; karşılaştırmayı öğrenci yerine yapma." }),
      q("evidence-4", "Olayları sonuçlarıyla eşleştir. Sonra bu zincirde Jonathan'ın hedefine en çok yardım eden olayı seç.", [
        sort("events-and-results", "Olay → sonuç eşleştirmesi", [
          { id: "returns-to-flight", icon: "↩️", label: "Yiyecek aramayı anlamsız bulup yeniden uçuş çalışmasına döner", description: "Avlanmayı denedikten sonra asıl öğrenmek istediği şeye geri döner." },
          { id: "finds-technique", icon: "💡", label: "Kısa kanat uçlarının yeni bir yöntem olabileceğini fark eder", description: "Hız denemelerinde kontrolünü kaybettikten sonra çözüm arar." },
          { id: "controls-dive", icon: "🪽", label: "Dalıştan çıkarak yüksek hızda kontrollü uçar", description: "Kanat uçlarını kullanarak yaptığı yeni denemenin sonucu budur." }
        ], [
          { id: "event-1", label: "Yiyecek aramak için bir süre diğer martılar gibi davranır." },
          { id: "event-2", label: "Hız denemelerinde kontrolünü kaybeder." },
          { id: "event-3", label: "Kanat uçlarını kullanıp yeni bir dalış dener." }
        ], {
          "event-1": "returns-to-flight", "event-2": "finds-technique", "event-3": "controls-dive"
        }, {
          instructions: "Önce olay kartını, sonra sonuç kutusundaki açıklamayı oku. Olayın ardından ne değiştiğini düşün ve eşleştir.",
          guide: ["Olayı oku", "Ardından ne olduğunu düşün", "Sonucuyla eşleştir"]
        }),
        select("goal-event", "Hangi olay onun öğrenme hedefine en çok yardım etti?", opts("Yiyecek aramayı denemesi", "Kısa kanat tekniğini bulması", "Sürünün alışılmış yolunu izlemesi")),
        text("goal-effect", "Seçtiğin olayın hedefine nasıl yardım ettiğini açıkla", 2)
      ], { sourceStage: "full", responseType: "matching", rubric: "Üç olay-sonuç eşleşmesini, seçilen olayı ve neden-sonuç açıklamasını ayrı ayrı kontrol et. Eksik ya da yanlış kısmı ve bakması gereken ipucunu belirt; doğru eşleşmeyi veya tam açıklamayı verme." }),
      q("evidence-5", "Jonathan'ın sürüden ayrı çalışması onun öğrenme biçimini nasıl etkiler? Metinden bir dayanak bul ve çıkarımını açıkla.", [text("answer", "Çıkarımım ve metinden kanıt", 3)], { sourceStage: "full" })
    ],
    "marti-a04": [
      q("story-map", "Olay kartlarını serim, düğüm ve çözüm bölümleriyle eşleştir. Kutuların açıklamalarını kullan.", [
        sort("plot-stages", "Olay örgüsü haritası", [
          { id: "serim", icon: "🌅", label: "Serim · başlangıç", description: "Kişi, ortam ve başlangıçtaki amaç tanıtılır." },
          { id: "dugum", icon: "🪢", label: "Düğüm · güçlük ve denemeler", description: "Sorun belirginleşir; kişi çözüm ararken dener." },
          { id: "cozum", icon: "🌈", label: "Çözüm · sonuç", description: "Sorunun nasıl sonuçlandığı ve kişide ne değiştiği görülür." }
        ], [
          { id: "plot-1", label: "Jonathan yiyecekten çok uçmayı öğrenmek ister." },
          { id: "plot-2", label: "Ailesi onun uçuş çalışmaları için kaygılanır." },
          { id: "plot-3", label: "Hız denemelerinde kontrolünü kaybedip düşer." },
          { id: "plot-4", label: "Başarısız denemelerden sonra yeni bir uçuş tekniği arar." },
          { id: "plot-5", label: "Kısa kanat uçlarını kullanarak dalıştan kontrollü çıkar." },
          { id: "plot-6", label: "Uçmanın yeni şeyler öğrenme ve özgür olma yolu olduğunu düşünür." }
        ], {
          "plot-1": "serim", "plot-2": "serim", "plot-3": "dugum", "plot-4": "dugum", "plot-5": "cozum", "plot-6": "cozum"
        }, {
          instructions: "Karttaki olayın öykünün hangi bölümünde yaşandığını düşün. Her kutuya iki olay kartı yerleştir.",
          guide: ["Olayı oku", "Başlangıç–güçlük–sonuç sırasını düşün", "Uygun bölüme taşı"]
        })
      ], { sourceStage: "full", responseType: "matching", rubric: "Her bölüm için iki kartı kontrol et. Yanlışsa kartın adını ve olay akışındaki ipucunu belirt; doğru bölümü doğrudan söyleme." }),
      q("serim", "SERİM: Kişiyi, ortamı ve başlangıçtaki amacı kısa ve tutarlı biçimde tanıt.", [text("answer", "Serim özeti", 4)], { sourceStage: "full" }),
      q("dugum", "DÜĞÜM: Amaca ulaşırken yaşanan temel güçlüğü ve önemli bir denemeyi anlat.", [text("answer", "Düğüm özeti", 4)], { sourceStage: "full" }),
      q("cozum", "ÇÖZÜM: Öykünün sonunda Jonathan’ın durumunda nelerin değiştiğini açıkla.", [text("answer", "Çözüm özeti", 4)], { sourceStage: "full" }),
      q("coherence-1", "Sence önemli olaylar birbirini hazırlıyor mu? Önce kararını seç, sonra öyküden bir örnek ver.", [
        radio("decision", "Olayların akışı", opts("Evet, çoğunlukla", "Kısmen", "Daha fazla bağlantı gerekirdi")),
        text("example", "Kararını destekleyen bir olay örneği", 2)
      ], { sourceStage: "full" }),
      q("coherence-2", "Bir olaydan sonraki olaya giden nedeni bul. Kartları neden-sonuç sırasına yerleştir ve zinciri bir cümleyle açıkla.", [
        sort("cause-effect", "Neden → sonuç kartları", [
          { id: "practice", icon: "🪽", label: "Uçuş çalışmalarına geri döner", description: "Yiyecek arama denemesinden sonra öğrenmek istediği şeye yönelir." },
          { id: "finds-technique", icon: "💡", label: "Yeni bir uçuş tekniği arar", description: "Başarısız hız denemeleri onu başka bir yol düşünmeye götürür." },
          { id: "controls-dive", icon: "🌊", label: "Dalıştan kontrollü çıkar", description: "Yeni kanat hareketi yüksek hızını denetlemesine yardım eder." }
        ], [
          { id: "cause-1", label: "Yiyecek aramak için bir süre diğer martılar gibi davranır ama bunu anlamsız bulur." },
          { id: "cause-2", label: "Hız denemelerinde kontrolünü kaybedip suya düşer." },
          { id: "cause-3", label: "Kısa kanat uçlarını kullanarak yeni bir dalış dener." }
        ], { "cause-1": "practice", "cause-2": "finds-technique", "cause-3": "controls-dive" }, {
          instructions: "Her neden kartının ardından hangi sonuç geldiğini bul. Kartı, onu en iyi tamamlayan sonuç kutusuna taşı.",
          guide: ["Nedeni oku", "Sonraki olayı hatırla", "Nedenle sonucu eşleştir"]
        }),
        text("chain", "Eşleştirdiğin neden-sonuç zincirini kendi sözlerinle anlat.", 2)
      ], { sourceStage: "full", responseType: "matching", rubric: "Üç neden-sonuç eşleşmesini ve öğrencinin yazdığı zinciri kontrol et. Hatalı eşleşmeyi belirt, doğru sonucu söylemeden metindeki sonraki olayı düşünmesine yardım et." }),
      q("coherence-3", "Olay akışını değerlendir. En çok hangi noktaya dikkat ettin?", [
        select("focus", "Değerlendirme odağın", opts("Kişi ve amacı", "Olayların sırası", "Neden-sonuç bağlantısı")),
        radio("judgment", "Bu açıdan öykü nasıl ilerliyor?", opts("Tutarlı", "Kısmen tutarlı", "Geliştirilebilir")),
        text("reason", "Kararının gerekçesi ve öyküden örnek", 3)
      ], { sourceStage: "full" })
    ],
    "marti-a05": [
      q("problem", "Jonathan'ın karşılaştığı zorluklardan birini seç. Sonra bu durumun onu nasıl etkilediğini kısaca açıkla.", [
        select("challenge", "Hangi güçlüğü ele alıyorsun?", opts("Aç kalma ve yiyecek arama baskısı", "Uçuş denemelerinde başarısız olma", "Ailesinin kaygısı ile kendi isteğinin farklı olması")),
        text("effect", "Bu güçlük Jonathan'ı nasıl etkiliyor?", 2)
      ], { sourceStage: "full", rubric: "Seçilen güçlüğü öyküdeki durumla karşılaştır ve açıklamanın etkisini kontrol et. Yanlış/eksikse ilgili olayı işaret et, yanıtı öğrenci yerine yazma." }),
      q("viewpoint-match", "Kısa düşünceleri kimin bakış açısıyla söylendiğine göre eşleştir.", [
        sort("perspectives", "Jonathan mı, ailesi mi?", [
          { id: "jonathan", icon: "🪽", label: "Jonathan'ın bakış açısı", description: "Uçmayı öğrenmek ve yeni denemeler yapmak onun için önemli." },
          { id: "family", icon: "🏠", label: "Ailesinin bakış açısı", description: "Onun sağlığı, yiyecek bulması ve yaklaşan kış için kaygılanıyorlar." }
        ], [
          { id: "thought-1", label: "Havada ne yapıp yapamayacağımı öğrenmek istiyorum." },
          { id: "thought-2", label: "Kış geliyor; yiyecek bulmayı öğrenmen gerek." },
          { id: "thought-3", label: "Aç kalmak umurumda değil; uçmayı öğrenmek istiyorum." },
          { id: "thought-4", label: "Uçma çabası güzel ama önce yiyecek bulmalısın." }
        ], { "thought-1": "jonathan", "thought-2": "family", "thought-3": "jonathan", "thought-4": "family" }, {
          instructions: "Her düşünceyi oku. Düşünce uçmayı öğrenme isteğini mi, yoksa ailenin güvenlik ve yiyecek kaygısını mı anlatıyor? Uygun kutuya taşı.",
          guide: ["Düşünceyi oku", "Kimin ne istediğini düşün", "Bakış açısıyla eşleştir"]
        })
      ], { sourceStage: "full", responseType: "matching", rubric: "Dört düşünce kartını iki bakış açısına göre değerlendir. Yanlış kart varsa hangi sözün/isteğin ipucu olduğunu belirt; doğru kişiyi doğrudan söyleme." }),
      q("viewpoint-conclusions", "İki farklı bakış açısından sonuç çıkar. Her sonuca öyküden bir dayanak ekle.", [
        text("jonathan-inference", "Jonathan'ın bakış açısından çıkarım", 2),
        text("family-inference", "Ailesinin bakış açısından farklı çıkarım", 2),
        text("evidence", "Çıkarımlarını destekleyen öykü ayrıntısı", 3)
      ], { sourceStage: "full" })
    ],
    "marti-a06": [
      q("problem", "Jonathan’ın çevresinden yeterli destek alamadığı durumu kısaca özetle.", [text("answer", "Sorunun özeti", 2)], { sourceStage: "full" }),
      ...[1, 2, 3].map(number => q(`solution-${number}`, `${number}. çözüm önerini açıkla. Öneri uygulanabilir ve diğerlerinden farklı olsun.`, [text("answer", `Öneri ${number} ve neden işe yarayabileceği`, 3)], { sourceStage: "full" })),
      q("choose", "Üç önerini karşılaştır. En uygulanabilir olanı seç ve nedenini açıkla.", [
        select("solution", "Seçtiğim öneri", opts("1. öneri", "2. öneri", "3. öneri")),
        text("reason", "Bu öneri neden uygun? Kim, ne zaman, nasıl destek olabilir?", 3)
      ], { sourceStage: "full" })
    ],
    "marti-a07": [
      q("sort-behaviors", "Sekiz davranış kartını iki gruba sürükle. Her grupta dört kart bulunmalı.", [
        sort("behaviors", "Davranış kartları", [
          { id: "daily", label: "Uçuşu günlük gereksinimler (özellikle yiyecek) için kullanma" },
          { id: "learning", label: "Uçuşu öğrenme ve deneme alanı olarak görme" }
        ], [
          { id: "behavior-1", label: "Bir balıkçı teknesini izleyip yiyeceğe ulaşmaya çalışmak" },
          { id: "behavior-2", label: "Yiyecek aramıyorken belirli bir manevrayı tekrar etmek" },
          { id: "behavior-3", label: "Sürünün alışılmış rotasını izleyerek kıyıya dönmek" },
          { id: "behavior-4", label: "Hızını denetlemek için kanat açısını değiştirmek" },
          { id: "behavior-5", label: "Günün çoğunu balıkçı teknesinin çevresinde yiyecek arayarak geçirmek" },
          { id: "behavior-6", label: "Düşüşün nedenini inceleyip yeni bir yöntem denemek" },
          { id: "behavior-7", label: "Uçuşu yalnızca karın doyurmanın aracı saymak" },
          { id: "behavior-8", label: "Bir sonraki gün için öğrenilecek bir uçuş hareketi seçmek" }
        ], {
          "behavior-1": "daily", "behavior-2": "learning", "behavior-3": "daily", "behavior-4": "learning",
          "behavior-5": "daily", "behavior-6": "learning", "behavior-7": "daily", "behavior-8": "learning"
        })
      ], { sourceStage: "full", responseType: "matching", rubric: "Sekiz kartın tamamını değerlendir; her grupta dört kart olmalı. Yiyecek aramak günlük gereksinim, amaçlı tekrar/teknik denemesi öğrenme grubudur. Yanlış kartı göster ama doğru grubu doğrudan söyleme." }),
      q("group-check", "İki grubu ayıran ölçütü kendi sözlerinle açıkla.", [text("criterion", "Sınıflandırma ölçütüm", 2)], { sourceStage: "full" })
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
      q("sort-examples", "Noktalı virgül dedektifi: Kutulardaki açıklamaları oku, sonra dokuz cümleyi uygun kutuya taşı.", [
        sort("semicolon-examples", "Noktalı virgül burada hangi işi yapıyor?", [
          { id: "use-1", icon: "📋", label: "Virgüllü iki listeyi ayırır", description: "İki ayrı liste vardır; her listede sözcükler virgülle sıralanır. Örnek: kalem, defter; elma, su." },
          { id: "use-2", icon: "🔗", label: "Bağlantılı iki cümleyi ayırır", description: "Anlamca bağlı iki kısa cümle vardır; virgüllü liste yoktur. Örnek: Zil çaldı; ders başladı." },
          { id: "use-3", icon: "🧩", label: "İçinde virgüllü liste olan iki cümleyi ayırır", description: "İki cümlenin içinde de virgülle sıralanan kişiler ya da şeyler vardır. Örnek: Ece, Mert ve Can geldi; Duru, Alp ve Nehir görev aldı." }
        ], [
          { id: "example-1", label: "Atölyede resim, seramik, ebru; sahnede müzik, şiir ve dans çalışmaları vardı." },
          { id: "example-2", label: "Kamp çantasına harita, pusula, yağmurluk; mutfak kutusuna tabak, bardak, kaşık kondu." },
          { id: "example-3", label: "Araştırma için dergi, kitap, ansiklopedi; sunum için grafik, fotoğraf ve çizelge hazırlandı." },
          { id: "example-4", label: "Zil çaldı; öğrenciler sınıfa geçti." },
          { id: "example-5", label: "Önce kaynakları taradık; sonra kısa notlar aldık." },
          { id: "example-6", label: "Güneş doğdu; yürüyüş ekibi yola çıktı." },
          { id: "example-7", label: "Okul korosunda Ece, Mert ve Can şarkı söyledi; sahne ekibinde Duru, Alp ve Nehir dekorları yerleştirdi." },
          { id: "example-8", label: "Sabah yazar, ressam ve müzisyenler geldi; öğleden sonra sporcular, öğretmenler ve öğrenciler atölyeye katıldı." },
          { id: "example-9", label: "Sınıfımızda Defne, Asya ve Doruk afiş hazırladı; okul korosunda Ece, Mert ve Can prova yaptı." }
        ], {
          "example-1": "use-1", "example-2": "use-1", "example-3": "use-1",
          "example-4": "use-2", "example-5": "use-2", "example-6": "use-2",
          "example-7": "use-3", "example-8": "use-3", "example-9": "use-3"
        }, {
          instructions: "Her kartta noktalı virgülün soluna ve sağına bak. İki tarafta ne olduğunu bul, sonra kartı açıklaması uyan kutuya sürükle. Dokunmatik ekranda karta, ardından kutuya dokun.",
          guide: ["Cümleyi oku", "; işaretinin iki yanına bak", "Uyan açıklamaya taşı"]
        })
      ], { responseType: "matching", rubric: "Dokuz örneği üç kullanım grubuna göre denetle; her grupta üç örnek bulunmalı. Yanlış kartların adını ve cümlede bakması gereken ipucunu belirt, doğru kutuyu doğrudan söyleme." }),
      q("punctuation-puzzle", "Noktalama bulmacası: Boşluğa hangi işaret gelmeli? ‘Çantama kalem, defter, kitap ___ atıştırmalık kutusuna elma, su, sandviç koydum.’", [
        radio("mark", "Doğru işareti seç", opts("Virgül (,)", "Noktalı virgül (;)", "Nokta (.)")),
        text("clue", "İpucu: İşaretin iki yanında neler sıralanmış? Seçimini kısaca açıkla.", 2)
      ], { responseLabel: "İşareti seç · gerekçeni yaz", rubric: "Seçilen işaretin iki ayrı, kendi içinde virgüllü listeyi ayırıp ayırmadığını ve açıklamanın bu yapıya uyup uymadığını kontrol et. Yanlışsa doğru işareti söyleme; cümlenin iki tarafındaki listelere yeniden bakmasını iste." }),
      q("write-your-own", "Şimdi kendi örneğini kur! İki farklı grup seç. Her grupta en az iki öğeyi virgülle sırala; iki grubu anlamlı tek bir cümlede noktalı virgülle ayır. Önce alanları doldur, sonra cümleni yaz.", [
        select("topic", "Hangi iki grubu kullanacaksın?", opts("Okul çantası ve beslenme çantası", "Atölye ve sahne etkinlikleri", "Sunum araçları ve sergi ürünleri", "Kendi seçtiğim iki grup")),
        text("first-group", "1. grup: En az iki öğe yaz; aralarına virgül koy.", 2),
        text("second-group", "2. grup: En az iki öğe yaz; aralarına virgül koy.", 2),
        text("sentence", "İki grubu tek ve anlamlı bir cümlede birleştir.", 3)
      ], {
        responseLabel: "Planla ve kendi cümleni yaz",
        diagram: {
          title: "Cümle kurma şeması",
          left: "1. grup: sözcük, sözcük, sözcük",
          connector: ";",
          right: "2. grup: sözcük, sözcük, sözcük",
          note: "Her grubun içinde virgül, iki grubun arasında noktalı virgül kullan."
        },
        rubric: "Kendi örneğini oluşturup oluşturmadığını kontrol et: iki ayrı grupta en az ikişer öge bulunmalı, grup içindeki ögeler virgülle ayrılmalı, gruplar arasında noktalı virgül olmalı ve cümle anlamlı olmalı. Eksik ölçütü söyle; öğrenci yerine örnek cümle yazma."
      })
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
      q("word-context", "Önce metinden en az iki kelime için anlam ipucu bul. Bu ipucuna göre tahminini yaz; ‘dağarcık’ gösterilen metinde yoksa PDF'teki ilgili bölümü kontrol et.", [
        text("context-clues", "Kelime → metin ipucu → tahminim", 4)
      ], {
        sourceKey: "gencligin",
        rubric: "En az iki kelime için metin bağlamından gerçek bir ipucu ve makul tahmin ara. Sağlanan okuma metninde ara bölümler kısaltılmış olabilir; görünmeyen bir sözcüğün metinde geçtiğini iddia etme, öğrenciye PDF'teki etkinlik/ilgili satırı kontrol etmesini söyle."
      }),
      q("word-meaning-match", "Şimdi dört kelime kartını sözlük anlamına en yakın açıklamayla eşleştir.", [
        sort("vocabulary", "Kelime–anlam eşleştirmesi", [
          { id: "disappointment", label: "Beklenen sonuca ulaşamama; düş kırıklığı", description: "Umut edilen şey gerçekleşmediğinde yaşanan sonuç." },
          { id: "care", label: "Özen ve dikkat", description: "Bir işi dikkatlice ve özen göstererek yapma." },
          { id: "knowledge", label: "Kişinin bildiği sözcük ve bilgilerin birikimi", description: "Bir kişinin bildiklerini ve kullandığı kelimeleri kapsayan birikim." },
          { id: "indifference", label: "Önemsememe, aldırış etmeme", description: "Bir durumu ya da sonucu dikkate almama." }
        ], [
          { id: "word-husran", label: "hüsran" },
          { id: "word-ihtimam", label: "ihtimam" },
          { id: "word-dagarcik", label: "dağarcık" },
          { id: "word-umursamazlik", label: "umursamazlık" }
        ], {
          "word-husran": "disappointment", "word-ihtimam": "care", "word-dagarcik": "knowledge", "word-umursamazlik": "indifference"
        }, {
          instructions: "Sözlük anlamını karşılaştır: kelimenin taşıdığı duygu, davranış ya da birikimi tanımlayan kutuyu bul.",
          guide: ["Kelimeyi oku", "Tahminini anımsa", "Uyan sözlük açıklamasına taşı"]
        })
      ], { sourceKey: "gencligin", responseType: "matching", rubric: "Dört eşleştirmeyi denetle. Yanlış kartın adını söyle ve sözlükteki açıklamanın hangi sözcükleriyle karşılaştırması gerektiğini belirt; doğru eşleşmeyi öğrenci adına verme." })
    ],
    "genclik-a02": [
      q("methods-sort", "Dört örnek cümleyi baskın düşünceyi geliştirme yoluyla eşleştir; sonra bir yöntemin anlatıma katkısını açıkla.", [
        sort("methods", "Örnek cümleler", [
          { id: "testimony", label: "Tanık gösterme" },
          { id: "analogy", label: "Benzetme" },
          { id: "example", label: "Örneklendirme" },
          { id: "comparison", label: "Karşılaştırma" }
        ], [
          { id: "method-1", label: "Bir eğitim araştırmacısının görüşü, düzenli okumanın düşünme becerilerini beslediğini vurguluyor." },
          { id: "method-2", label: "Bir hedefe emek vermek, her gün sulanan bir fidanı büyütmeye benzer." },
          { id: "method-3", label: "Bir öğrenci kitap okuyarak, enstrüman öğrenerek veya takım çalışmasına katılarak kendini geliştirebilir." },
          { id: "method-4", label: "Plansız çalışma dağınık ilerler; küçük hedeflere ayrılan çalışma daha kolay izlenir." }
        ], { "method-1": "testimony", "method-2": "analogy", "method-3": "example", "method-4": "comparison" })
      ], { responseType: "matching", rubric: "Her örneğin baskın düşünceyi geliştirme yolunu kontrol et. İlk örnekteki araştırmacı görüşünün bu çalışma için kurgusal örnek olduğunu unutma. Yanlış eşleştirmeleri göster; doğru etiketleri söylemeden ilgili cümledeki ipucuna yönlendir." }),
      q("methods-summary", "Düşünceyi geliştirme yollarından ikisini seç. Bir düşünceyi daha anlaşılır veya inandırıcı kılmak için nasıl kullanıldıklarını karşılaştır.", [
        select("first-method", "Birinci yöntem", opts("Tanık gösterme", "Benzetme", "Örneklendirme", "Karşılaştırma")),
        select("second-method", "İkinci yöntem", opts("Tanık gösterme", "Benzetme", "Örneklendirme", "Karşılaştırma")),
        text("contribution", "İki yöntemin anlatıma katkısı", 3)
      ])
    ],

    "genclik-a03": [
      q("interpret-1", "Denemede “ömrünün ilkbaharı” sözü insan yaşamının hangi dönemini anlatıyor?", [
        radio("meaning", "En uygun açıklama", opts("İnsanların gençlik dönemi", "İhtiyarlık dönemi", "Yalnızca hava olaylarının yaşandığı mevsim"))
      ], { sourceKey: "gencligin", answerKey: { meaning: "İnsanların gençlik dönemi" }, rubric: "Seçimi metindeki “insanların genç olduklarını anlatmak için” ifadesiyle karşılaştır. Yanlışsa ilgili cümleye geri yönlendir; doğru seçeneği doğrudan verme." }),
      q("interpret-2", "Yazarın Heraklit'in nehir benzetmesine verdiği açıklama hangi düşünceyi destekliyor?", [
        select("message", "Nehir imgesinin iletisi", opts("Zaman akar ve geçen an geri getirilemez", "İnsan aynı anı istediği zaman yeniden yaşayabilir", "Zaman yalnızca yaşlılıkta ilerlemeye başlar"))
      ], { sourceKey: "gencligin", answerKey: { message: "Zaman akar ve geçen an geri getirilemez" }, rubric: "Seçimi metindeki nehir suyunun akıp uzaklaşması ve onu geri getirmenin mümkün olmaması açıklamasıyla karşılaştır. Yanlışsa metin ipucunu göster; doğru seçeneği yazma." }),
      q("interpret-3", "Şeftali ağacının çiçekten olgun meyveye geçişi, gençlik ve sonraki yaşlar arasındaki hangi bağı kuruyor?", [
        radio("connection", "Yazarın düşüncesine en yakın seçenek", opts("Olgun yaşlarda alınan sonuçlar, gençlikteki dikkatli hazırlığın ürünü olabilir", "İnsan yaşlandıkça bütün güzelliklerini kaybeder", "Başarı için gençlikte hazırlanmaya gerek yoktur")),
        text("evidence", "Seçimini destekleyen metin ipucu", 2)
      ], { sourceKey: "gencligin", answerKey: { connection: "Olgun yaşlarda alınan sonuçlar, gençlikteki dikkatli hazırlığın ürünü olabilir" }, rubric: "Seçimi ve denemedeki çiçeklenme, hazırlık, ihtimam ve meyve bağını kullanan kanıtı değerlendir. Eksikse hangi bağı açıklaması gerektiğini belirt; tam yanıtı öğrenci yerine verme." }),
      q("interpret-4", "Dört imgeyi denemede desteklediği düşünceyle eşleştir.", [
        sort("images-and-ideas", "İmge → düşünce eşleştirmesi", [
          { id: "youth", label: "Gençlik bir gelişme ve hazırlanma dönemidir", description: "Yazar insanların gençliğini tabiatın ilkbaharına benzetir." },
          { id: "unfulfilled", label: "Yetenekleri kullanmadan yalnız görünüşte kalmak düş kırıklığı doğurabilir", description: "Yalnız çiçek açıp meyve vermeme örneğiyle açıklanır." },
          { id: "preparation", label: "Sonraki sonuçlar önceki özenli hazırlığa dayanabilir", description: "Olgun şeftaliler, daha önceki çiçeklenme ve bakımla ilişkilendirilir." },
          { id: "time", label: "Geçen zaman geri getirilemez", description: "Nehirden akan su, zamanın akışına benzetilir." }
        ], [
          { id: "image-1", label: "“Ömrünün ilkbaharı” sözü" },
          { id: "image-2", label: "Çiçek açıp meyve vermeyen ağaç" },
          { id: "image-3", label: "İlkbahardaki özenin ardından olgunlaşan şeftaliler" },
          { id: "image-4", label: "İçinden akan suya iki kez girilemeyen nehir" }
        ], {
          "image-1": "youth", "image-2": "unfulfilled", "image-3": "preparation", "image-4": "time"
        }, {
          instructions: "İmgeyi oku ve denemede neyi anlattığını düşün. Her kutuya onu en iyi açıklayan bir kart yerleştir.",
          guide: ["İmgeyi oku", "Denemedeki açıklamayı anımsa", "Anlamıyla eşleştir"]
        })
      ], { sourceKey: "gencligin", responseType: "matching", rubric: "Dört imge-düşünce eşleşmesini denetle. Yanlış kartın hangi imge olduğunu ve yeniden okuması gereken açıklama bölümünü belirt; doğru kutuyu söyleme." }),
      q("interpret-5", "Denemenin gençlikte hazırlanma düşüncesini kendi yaşamınla ilişkilendir. Gelecekteki bir amacın için bugün atabileceğin bir adımı seç ve nedenini yaz.", [text("answer", "Adımım, amacıma katkısı ve gerekçem", 3)], { sourceKey: "gencligin" })
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
      q("ellipsis-sort", "Dört örneği üç noktanın işlevleriyle eşleştir. Kartı sürükle ya da karta ve hedef gruba sırayla tıkla.", [
        sort("ellipsis", "Diyalog ve cümle kartları", [
          { id: "unfinished-answer", label: "Yanıtın tamamlanmadığını / eksik bırakıldığını gösterme" },
          { id: "call-emphasis", label: "Seslenme veya vurguyu güçlendirme" },
          { id: "unfinished-narration", label: "Anlatımı sürdürmeden bırakma" }
        ], [
          { id: "ellipsis-1", label: "— Bu kararı sen mi verdin? — Ben…" },
          { id: "ellipsis-2", label: "Duru!.. Bir dakika, seni bekliyoruz!" },
          { id: "ellipsis-3", label: "Yolun sonunda kapı açıldı ve karşısında…" },
          { id: "ellipsis-4", label: "— Kiminle konuşmak istiyorsun? — Öğretmenimle…" }
        ], {
          "ellipsis-1": "unfinished-answer", "ellipsis-2": "call-emphasis",
          "ellipsis-3": "unfinished-narration", "ellipsis-4": "unfinished-answer"
        })
      ], { responseType: "matching", rubric: "Diyalogda tamamlanmayan yanıtı, seslenme/vurguyu ve sürdürülen anlatımı ayırt et. Yanlış kartı belirt, doğru işlevi doğrudan verme; noktalama işaretinin bulunduğu yere yeniden bakmasını iste." }),
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
      q("semicolon-sort", "Üç cümleyi oku. Noktalı virgülün yaptığı işe uyan açıklamanın altına taşı.", [
        sort("examples", "Noktalı virgülün görevi", [
          { id: "use-1", icon: "📋", label: "Virgüllü iki listeyi ayırır", description: "İki ayrı virgüllü sözcük grubu vardır." },
          { id: "use-2", icon: "🔗", label: "Bağlantılı iki cümleyi ayırır", description: "Anlamca bağlı iki cümle yan yana gelir." },
          { id: "use-3", icon: "🧩", label: "İçinde virgüllü liste olan iki cümleyi ayırır", description: "İki cümlenin içinde virgülle sıralanan kişiler ya da şeyler bulunur." }
        ], [
          { id: "semicolon-1", label: "Kulüplerde resim, drama, ebru; okul etkinliğinde müzik, şiir ve tiyatro çalışmaları vardı." },
          { id: "semicolon-2", label: "Sabah araştırdık, kaynakları seçtik; öğleden sonra notları düzenleyip paylaştık." },
          { id: "semicolon-3", label: "Doğa gözlem ekibinden Lara, Deniz ve Ozan fotoğrafları seçti; okul takımından Ece, Can ve Mira çizelgeleri düzenledi." }
        ], { "semicolon-1": "use-1", "semicolon-2": "use-2", "semicolon-3": "use-3" }, {
          instructions: "Her cümlede noktalı virgülün iki yanına bak. Cümlede sözcük listesi mi, bağlantılı işler mi var? Uyan açıklamanın altına taşı.",
          guide: ["Cümleyi oku", "; işaretinin iki yanına bak", "Uyan açıklamaya taşı"]
        })
      ], { responseType: "matching", rubric: "Noktalı virgülün cümle içindeki görevini kontrol et. Cümledeki virgül gruplarına ve iki tarafta neler bulunduğuna bak. Yanlış eşleştirme varsa kartın adını söyle; doğru işlevi doğrudan açıklama." }),
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
      q("fact-sort", "Ali Kuşçu’nun yaşamına ilişkin sekiz bilgiyi giriş, gelişme ve sonuç bölümlerine sürükleyerek yerleştir.", [
        sort("facts", "Dinleme notu kartları", [
          { id: "intro", label: "Giriş" },
          { id: "development", label: "Gelişme" },
          { id: "conclusion", label: "Sonuç" }
        ], [
          { id: "fact-1", label: "Ailesi Semerkant’taki bilim çevreleriyle ilişkiliydi." },
          { id: "fact-2", label: "Uluğ Bey ve çevresindeki bilim insanlarından eğitim aldı." },
          { id: "fact-3", label: "Gözlemevi çalışmalarında sorumluluk üstlendi." },
          { id: "fact-4", label: "Uluğ Bey’in ölümünden sonra Semerkant’tan ayrıldı." },
          { id: "fact-5", label: "Hac yolculuğu sırasında Tebriz’e uğradı." },
          { id: "fact-6", label: "Fatih Sultan Mehmet’in daveti üzerine İstanbul’a geldi." },
          { id: "fact-7", label: "Ayasofya Medresesi’nde görev aldı ve farklı alanlarda eserler yazdı." },
          { id: "fact-8", label: "Fatih Camisi için güneş saati hazırladı." }
        ], {
          "fact-1": "intro", "fact-2": "development", "fact-3": "development", "fact-4": "development",
          "fact-5": "development", "fact-6": "development", "fact-7": "conclusion", "fact-8": "conclusion"
        })
      ], { sourceMode: "qr", responseType: "matching", rubric: "Dinleme kaynağındaki kronolojik akışı ve giriş-gelişme-sonuç düzenini kontrol et. QR kaydının dökümü yok; kartın kaynağa göre kesin yerini doğrulayamadığında bunu açıkça belirt, bilgi uydurma. Yanlış kartları göster ama doğru bölümlerini söyleme." }),
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
      ], { sourceMode: "qr", sourceUrl: window.THEME1_QR_SOURCES.aliKuscu, sourceLinkLabel: "Ali Kuşçu dinleme kaydı", sourceLinkType: "audio", sourceNotesUrl: "docs/video-analysis/ali-kuscu-gemini-analysis.md" }),
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
