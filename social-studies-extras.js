/*
 * Sosyal Bilgiler ek katmanı — haftalık ek okuma metinleri, kitaptaki etkinlik
 * teknikleriyle kurulmuş ek çalışmalar ve 9–15. haftalar için konu anlatımı ekleri.
 *
 * Kaynak: MEB 7. sınıf Sosyal Bilgiler ders kitabı (2026). Kitabın metinleri, soruları
 * ve görselleri kopyalanmaz; buradaki metinler özgün olarak yazılmıştır. Etkinlik
 * biçimleri kitapta görülen tekniklerden (balık kılçığı, GZFT, sınıflama, tanılayıcı
 * dallanmış ağaç, kelime bulutu, zaman şeridi) esinlenir.
 *
 * Akış: ana konu anlatımı → (varsa) ek okuma → kitaptaki teknikle çalışma → yazma.
 * Ek çalışmalar mevcut etkinliklerin ardına, aynı kart biçimiyle eklenir.
 */
(function () {
  "use strict";

  const t = (id, label, placeholder) => ({ id, label, placeholder, kind: "text", minChars: 3 });
  const a = (id, label, placeholder) => ({ id, label, placeholder, kind: "textarea", minChars: 10 });
  const w = (id, label, placeholder) => ({ id, label, placeholder, kind: "words", minChars: 3 });
  const ch = (id, label, options, answer, explanation, hint) => ({
    id,
    label,
    kind: "choice",
    options: options.map((option, index) => ({ id: `o${index + 1}`, label: option })),
    answer: `o${answer + 1}`,
    explanation,
    hint,
  });
  const cl = (id, label, options) => ({
    id,
    label,
    kind: "checklist",
    options: options.map((option, index) => ({ id: `c${index + 1}`, label: option })),
  });
  const so = (id, label, categories, items, expected, instructions) => ({
    id,
    label,
    kind: "sort",
    categories: categories.map((category, index) => ({ id: `k${index + 1}`, label: category })),
    items: items.map((item, index) => ({ id: `i${index + 1}`, label: item })),
    expectedAssignments: Object.fromEntries(
      expected.map((categoryIndex, itemIndex) => [`i${itemIndex + 1}`, `k${categoryIndex + 1}`]),
    ),
    instructions,
  });
  const read = (id, title, source, prompt, body, questions, hint) => ({
    id,
    sourceStyle: "Ek okuma · özgün metin · soru-cevap",
    format: "Ek okuma · özgün metin",
    title,
    prompt,
    sourceTitle: title,
    sourceLabel: "Özgün metin · ders kitabının ilgili bölümünden esinlenmiştir",
    sourceText: body,
    hint,
    questions,
  });
  const drill = (id, style, title, prompt, fields, hint) => ({
    id,
    sourceStyle: style,
    format: style,
    title,
    prompt,
    fields,
    hint,
  });

  window.SOCIAL_EXTRAS = {
    note:
      "Ek çalışmalar ana konu anlatımının ardından aynı etkinlik akışında açılır. Cevaplar bu tarayıcıda saklanır; doğru cevap gösterilmez.",
    weeks: {
      1: {
        activities: [
          read(
            "x1-w1-sinifin-sesi",
            "Ek okuma: Sınıfın sesi",
            "s. 12–29",
            "Metni oku; ardından gelen üç soruyu yanıtla. Arkadaşının davranışını değil, iletişimin nasıl koptuğunu incele.",
            "7/E sınıfında grup çalışması vardı. Dört kişilik grup, afişin başlığını tartışıyordu. Elif, “Bence başlık çok uzun, kısaltalım.” dedi. Mert hemen güldü: “Sen zaten hiçbir şeyi beğenmiyorsun, hep aynı şeyi söylüyorsun.” Elif sustu. Grup bir süre daha konuştu ama Elif artık fikrini söylemedi; afişte onun önerisi de yer almadı. Çalışma sonunda öğretmen, afişin bir bölümünün boş kaldığını fark etti ve nedenini sordu. Mert, “Elif hiçbir şey söylemedi ki.” dedi. Elif ise, “Söylediğimde gülüyorsun, ben de susuyorum.” diye yanıtladı. Öğretmen, “Bir fikri beğenmemek başka, fikri söyleyeni küçümsemek başkadır.” dedi. Sonra gruba bir kural verdi: önce söyleneni tekrar edip anladığını göstermek, sonra itiraz etmek. Bir sonraki derste aynı grup afişi bitirdi; Elif’in kısa başlığı seçildi, Mert’in eklediği görsel düzenleme de korundu.",
            [
              {
                id: "elifsizlik",
                prompt: "Elif’in susmasına yol açan asıl davranış hangisiydi?",
                fields: [
                  ch(
                    "elifsizlik-secim",
                    "Metne göre seç",
                    [
                      "Elif’in fikrini yeterince açıklamaması",
                      "Mert’in fikri değil, fikri söyleyeni küçümsemesi",
                      "Öğretmenin gruba kural vermesi",
                      "Afişin başlığının uzun olması",
                    ],
                    1,
                    "Metinde sorun, önerinin içeriği değil; öneriyi söyleyenin alay edilmesidir.",
                    "Kim, neyi eleştirdi: düşünceyi mi, kişiyi mi?",
                  ),
                ],
              },
              {
                id: "elifsizlik-cozum",
                prompt: "Mert’in cümlesini ben diliyle yeniden yaz.",
                fields: [
                  a(
                    "elifsizlik-ben-dili",
                    "Ben dili cümlesi",
                    "Örn. “Başlığı kısaltma önerini duydum; ben afişte uzun başlığı daha açıklayıcı buluyorum.”",
                  ),
                ],
              },
              {
                id: "elifsizlik-dinleme",
                prompt: "Öğretmenin verdiği kural etkin dinlemenin hangi göstergesini içeriyor?",
                fields: [
                  t("elifsizlik-gosterge", "Tek sözcük ya da kısa ifade", "Örn. söyleneni tekrar etmek…"),
                ],
              },
            ],
            "Metindeki olay sırasını izle: öneri → alay → susma → sonuç.",
          ),
          drill(
            "x2-w1-iletisim-sort",
            "Sınıflandırma · kart eşleştirme",
            "İletişimi güçlendiren ve zayıflatan davranışlar",
            "Kartları oku ve ait olduğu gruba taşı. Kararsız kaldığında “karşı taraf kendini duyulmuş hissediyor mu?” sorusunu sor.",
            [
              so(
                "iletisim-sort",
                "Davranışları grupla",
                ["İletişimi güçlendirir", "İletişimi zayıflatır"],
                [
                  "Karşıdakinin sözünü kesmeden dinlemek",
                  "Göz teması kurup başını sallayarak takip ettiğini göstermek",
                  "Anlamadığı yerde açık soru sormak",
                  "Konuşurken telefonla ilgilenmek",
                  "Öğüt verir gibi konuşup karşıdakini dinlememek",
                  "Alaycı bir tonla ‘şaka yaptım’ demek",
                ],
                [0, 0, 0, 1, 1, 1],
                "Kartı sürükle; dokunmatik ekranda önce karta sonra gruba dokun. Klavyede kartı Enter ile seç, grup başlığına odaklanıp Enter ile bırak.",
              ),
            ],
            "Her kart için tek bir ölçüt kullan: davranış karşıdakine duyulduğunu hissettiriyor mu?",
          ),
        ],
      },
      2: {
        activities: [
          read(
            "x1-w2-ayni-cumle",
            "Ek okuma: Aynı cümlenin iki hâli",
            "s. 19–28",
            "İki cümleyi karşılaştır. Sonra kendi yaşadığın bir durum için ben dili cümlesi kur.",
            "Kerem, odasını toplamadığı için annesiyle tartıştı. Annesi kapıyı açıp, “Sen hep böylesin, hiçbir işini bitirmiyorsun!” dedi. Kerem yatağa oturdu ve sustu; içinden “Zaten ne yapsam yetmiyor.” diye düşündü. Ertesi akşam babası farklı bir cümleyle geldi: “Yerdeki kitaplara basınca düşeceğim diye korkuyorum; kitapları rafa kaldırır mısın?” Kerem bu kez itiraz etmedi. On dakika sonra odası toplanmıştı. Annesi şaşırdı: “Ben aynı şeyi söylüyordum.” Babası, “Sen kişiyi anlatıyordun, ben durumu anlattım.” dedi. İkisi de aynı isteği dile getirmişti; ama biri suçlama, diğeri duygu ve ihtiyaç içeriyordu. Kerem sonradan, “Birinci cümlede kendimi kötü hissediyorum, ikincisinde ne yapacağımı biliyorum.” dedi.",
            [
              {
                id: "cumle-fark",
                prompt: "İki cümle arasındaki temel fark nedir?",
                fields: [
                  ch(
                    "cumle-fark-secim",
                    "Metne göre seç",
                    [
                      "Birinci cümle daha kısa olduğu için",
                      "Birinci cümle kişiyi suçluyor, ikincisi durumu ve ihtiyacı anlatıyor",
                      "İkinci cümleyi baba söylediği için",
                      "İkinci cümlede istek olmadığı için",
                    ],
                    1,
                    "Sen dili kişiyi etiketler; ben dili davranışı, duyguyu ve ihtiyacı anlatır.",
                    "Cümlelerde ‘sen’ mi, ‘ben’ mi öne çıkıyor?",
                  ),
                ],
              },
              {
                id: "cumle-yeniden",
                prompt: "Kerem’in kendi kardeşine söyleyeceği bir cümleyi ben diliyle kur.",
                fields: [
                  a("cumle-ben", "Ben dili cümlesi", "Durumu, duygunu ve isteğini ayrı ayrı yaz…"),
                ],
              },
            ],
            "Ben dili kalıbı: “(Durum) olduğunda (duygu) hissediyorum, çünkü (ihtiyaç).”",
          ),
          drill(
            "x2-w2-dil-sort",
            "Sınıflandırma · kart eşleştirme",
            "Ben dili, sen dili ve empati",
            "Her cümleyi baskın özelliğine göre grupla. Bir cümle hem eleştiri hem istek içerebilir; baskın olanı seç.",
            [
              so(
                "dil-sort",
                "Cümleyi grupla",
                ["Ben dili", "Sen dili", "Empati"],
                [
                  "“Konuşurken sözümü kestiğinde kendimi görmezden gelinmiş hissediyorum.”",
                  "“Yine her şeyi sen bozuyorsun.”",
                  "“Seni doğru anladıysam, bu işi tek başına yapmak istemiyorsun.”",
                  "“Hep böyle düşüncesizsin.”",
                  "“Bu kadar yorgunken nasıl davrandığını tahmin edebiliyorum.”",
                  "“Konuyu değiştirdiğinde anlatmak istediğim şey yarım kalıyor.”",
                ],
                [0, 1, 2, 1, 2, 0],
                "Kartı sürükle; dokunmatik ekranda önce karta sonra gruba dokun. Klavyede Enter ile seç, grup başlığına odaklanıp Enter ile bırak.",
              ),
            ],
            "Sen dili kişiliği etiketler; ben dili davranışı anlatır; empati karşı tarafın bakışını dile getirir.",
          ),
        ],
      },
      3: {
        activities: [
          read(
            "x1-w3-kapidaki-esik",
            "Ek okuma: Kapıdaki eşik",
            "s. 30–39",
            "Metni oku. Engelin kişiden mi, düzenden mi kaynaklandığını belirle; sonra bir çözüm yaz.",
            "Okulun resim sergisi çok katlı binanın ikinci katında açılacaktı. Tekerlekli sandalye kullanan Deniz, sergiye katılmak istediğini söyledi. Öğretmen sevindi, ancak Deniz sınıfa girdiğinde sergi salonunun kapısında iki basamak olduğunu gördü. Bir arkadaşı, “Merak etme, seni kucaklayarak çıkarırız.” dedi. Deniz, “Bu çözüm değil; sergiye herkes girebilmeli.” diye yanıtladı. Sınıf önce afiş hazırladı, sonra öğretmen okul yönetimine başvurdu. Yönetim, sergiyi zemin kattaki salona taşıdı ve basamakların yanına taşınabilir rampa yerleştirdi. Açılış günü sergiye yalnızca Deniz değil, bebek arabasıyla gelen veliler ve baston kullanan komşular da girdi. Öğretmen, “Sorun Deniz’in gelmesi değildi; salonun herkesi hesaba katmamasıydı.” dedi. Deniz, “Rampa bir kişi için değil, hepimiz için.” diye ekledi.",
            [
              {
                id: "esik-kaynak",
                prompt: "Metindeki asıl engel neydi?",
                fields: [
                  ch(
                    "esik-kaynak-secim",
                    "Metne göre seç",
                    [
                      "Deniz’in sergiye ilgi duymaması",
                      "Sergi salonunun herkesi hesaba katmayan düzeni",
                      "Arkadaşının yardım önermesi",
                      "Afişin zemin katta hazırlanması",
                    ],
                    1,
                    "Engel kişide değil, katılımı zorlaştıran düzendedir; bu yüzden çözüm düzeni değiştirmektir.",
                    "Sorun kimsede değilse nerede?",
                  ),
                ],
              },
              {
                id: "esik-cozum",
                prompt: "Okulunda katılımı zorlaştıran bir düzeni ve çözümünü yaz.",
                fields: [
                  a("esik-engel", "Gözlediğin engel", "Hangi alan, hangi düzenleme?"),
                  a("esik-oneri", "Çözüm önerin", "Kim, neyi değiştirebilir?"),
                ],
              },
            ],
            "Engeli tanımlarken kişiyi değil, ortamı ve süreci anlat.",
          ),
          drill(
            "x2-w3-engel-sort",
            "Tanılayıcı test · kendini sına",
            "Tanılayıcı test: engel mi, düzenleme mi?",
            "Üç soruyu yanıtla. Her soruda engelin kişiden mi, çevreden mi kaynaklandığını sor.",
            [
              ch(
                "engel-tani-1",
                "Dersliğe yalnızca merdivenle çıkılabiliyorsa tekerlekli sandalye kullanan öğrenci için asıl engel nedir?",
                ["Öğrencinin isteksizliği", "Dersliğe erişimin yalnızca merdivenle sağlanması", "Dersin zorunlu olması", "Sınıfın kalabalık olması"],
                1,
                "Engel kişide değil, katılımı zorlaştıran çevresel düzendedir; çözüm de düzeni değiştirmektir.",
                "Sorun kimsede değilse nerede?",
              ),
              ch(
                "engel-tani-2",
                "Aşağıdakilerden hangisi bir erişilebilirlik düzenlemesidir?",
                ["Duyuruyu yalnızca panoya asmak", "Sınav süresini ihtiyaca göre planlamak", "Etkinliği dar koridorda yapmak", "Bilgiyi yalnızca sözlü vermek"],
                1,
                "Düzenleme, katılımı kolaylaştıran somut bir değişikliktir; niyet tek başına yetmez.",
                "Somut değişiklik hangisi?",
              ),
              ch(
                "engel-tani-3",
                "Bir etkinliği herkes için erişilebilir planlamak isteyen öğrenci önce ne yapmalıdır?",
                ["Katılımcıların ihtiyaçlarını ve alanın koşullarını belirlemek", "Etkinliği iptal etmek", "Yalnızca davetiye hazırlamak", "Katılımı gönüllülere bırakmak"],
                0,
                "Erişilebilir plan, katılımcı ihtiyaçları ve mekân koşulları bilinmeden kurulamaz.",
                "Plan yapmadan önce neyi bilmen gerekir?",
              ),
            ],
            "Engel çoğu zaman kişide değil, düzende ve planda aranır.",
          ),
        ],
      },
      4: {
        activities: [
          read(
            "x1-w4-mahallenin-defteri",
            "Ek okuma: Mahallenin defteri",
            "s. 37–50",
            "Bir projenin hangi adımlarla kurulduğunu izle. Sonunda kendi projen için bir hedef cümlesi yaz.",
            "Sınıf, “Mahallemizde erişilebilirlik” konulu bir proje başlattı. Önce gözlem yaptılar: kaldırımlarda çukur, market girişinde basamak, parkta dar geçiş vardı. Sonra görüşme yaptılar; mahallede yaşayan iki kişi, kaldırımdaki çukur yüzünden markete gidemediğini söyledi. Grup, hedefi tek cümleyle yazdı: “Üç ayda, okul çevresindeki iki sokağın kaldırımını güvenli hâle getirmek.” Ardından iş bölümü yapıldı: biri fotoğraf çekti, biri belediye dilekçesi yazdı, biri öğretmenle görüşme planladı. İkinci hafta dilekçe teslim edildi. Üçüncü hafta belediyeden yanıt geldi: bir sokağın kaldırımı onarılacaktı. Proje defterinde şu not vardı: “Hedefimiz tamamlanmadı ama ilk adım atıldı; ikinci sokak için yeniden başvuru yapacağız.” Öğretmen, “Projenin başarısı yalnızca sonuçla ölçülmez; ölçülebilir hedef, görev paylaşımı ve izleme de başarıdır.” dedi.",
            [
              {
                id: "proje-hedef",
                prompt: "Projenin hedefi hangi özelliği taşıdığı için güçlü?",
                fields: [
                  ch(
                    "proje-hedef-secim",
                    "Metne göre seç",
                    [
                      "Çok genel bir istek olarak yazıldığı için",
                      "Süre, yer ve ölçülebilir sonuç içerdiği için",
                      "Yalnızca öğretmenin kararı olduğu için",
                      "Sonuç alınmadan kapatıldığı için",
                    ],
                    1,
                    "Süre, yer ve ölçülebilir sonuç içeren hedef izlenebilir; bu yüzden güçlüdür.",
                    "Hedefte tarih, yer ve ölçü var mı?",
                  ),
                ],
              },
              {
                id: "proje-benim",
                prompt: "Kendi projen için bir hedef cümlesi yaz.",
                fields: [
                  t("proje-hedef-cumle", "Hedef cümlesi", "Örn. “Kasım sonuna kadar okul bahçesinde 10 kişilik oturma alanı oluşturmak.”"),
                  a("proje-olcut", "Hedefini nasıl ölçeceksin?", "Hangi kanıt başarıyı gösterir?"),
                ],
              },
            ],
            "Hedef cümlesinde süre + yer + ölçülebilir sonuç bulunsun.",
          ),
          drill(
            "x2-w4-plan-sort",
            "Sınıflandırma · zaman şeridi",
            "Proje adımlarını aşamalarına yerleştir",
            "Kartları proje döngüsünün aşamasına taşı. Her aşamada hangi işin yapıldığını düşün.",
            [
              so(
                "plan-sort",
                "Adımı aşamasına taşı",
                ["Planla", "Uygula", "Değerlendir"],
                [
                  "İhtiyacı gözlemle belirlemek",
                  "Ölçülebilir hedef yazmak",
                  "Görevleri paylaşmak",
                  "Dilekçeyi teslim etmek",
                  "Fotoğraf ve kanıt toplamak",
                  "Sonucu hedefle karşılaştırmak",
                ],
                [0, 0, 0, 1, 1, 2],
                "Kartı sürükle; dokunmatik ekranda önce karta sonra gruba dokun. Klavyede Enter ile seç, grup başlığına odaklanıp Enter ile bırak.",
              ),
            ],
            "Planlama karar, uygulama eylem, değerlendirme karşılaştırmadır.",
          ),
        ],
      },
      5: {
        activities: [
          read(
            "x1-w5-bir-mektup",
            "Ek okuma: Bir mektup, bir mühür",
            "s. 40–55",
            "Metni oku. Dayanışmanın nasıl örgütlendiğini belirle; sonra bugünkü bir dayanışma örneğiyle karşılaştır.",
            "Kurtuluş Savaşı yıllarında cepheye giden askerlerin ihtiyaçları için köylerden yardım toplanıyordu. Bir köyde öğretmen, mektebin sobasını söndürmeden çocuklara bir mektup okudu: “Elimizde ne varsa paylaşacağız; kimse tek başına değil.” Defterine not düşen çocuklardan biri, evde annesine, “Biz de bir şey verebilir miyiz?” diye sordu. Annesi, kışa sakladığı çuvaldan bir ölçek buğday ayırdı. Komşu, kağnısıyla taşımayı üstlendi. Bir başkası, askere çorap ördü. Köyün defterine verilenler tek tek yazıldı; kimse miktarını bağırmadı, kimse kimseyi zorlamadı. Yıllar sonra o defter, bir müzede sergilendi. Ziyaretçilerden biri, “Bu kadar az şeyle ne yapılabilir ki?” diye sordu. Rehber, “Tek tek azdı; ama aynı gün, aynı amaç için verildiğinde cepheyi ayakta tuttu.” dedi.",
            [
              {
                id: "mektup-orgut",
                prompt: "Metinde dayanışmayı mümkün kılan nedir?",
                fields: [
                  ch(
                    "mektup-orgut-secim",
                    "Metne göre seç",
                    [
                      "Herkesin aynı miktarda yardım vermesi",
                      "Yardımın ortak bir amaç ve düzen içinde toplanması",
                      "Yardımın gizli tutulması",
                      "Yalnızca öğretmenin çaba göstermesi",
                    ],
                    1,
                    "Dayanışmayı büyüten şey miktar değil, ortak amaç ve düzenli örgütlenmedir.",
                    "Miktar mı, düzen mi belirleyici?",
                  ),
                ],
              },
              {
                id: "mektup-bugun",
                prompt: "Bugün bir dayanışma örneği yaz ve metindeki örnekle bir benzerlik, bir fark göster.",
                fields: [
                  a("mektup-ornek", "Günümüzden örnek", "Afet, spor, eğitim, mahalle çalışması…"),
                  t("mektup-benzerlik", "Bir benzerlik", "Ortak amaç, gönüllülük, örgütlenme…"),
                  t("mektup-fark", "Bir fark", "Araç, ölçek, iletişim biçimi…"),
                ],
              },
            ],
            "Karşılaştırma yaparken iki olayı aynı ölçütle ele al: amaç, katılım, örgütlenme.",
          ),
          drill(
            "x2-w5-gun-sort",
            "Sınıflandırma · kart eşleştirme",
            "Ulusal bayram mı, anma günü mü?",
            "Tarihleri türüne göre grupla. Kutlama ile anmanın duygusal ve toplumsal işlevi farklıdır.",
            [
              so(
                "gun-sort",
                "Tarihi grupla",
                ["Ulusal bayram", "Anma günü"],
                ["29 Ekim Cumhuriyet Bayramı", "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı", "19 Mayıs Atatürk’ü Anma, Gençlik ve Spor Bayramı", "18 Mart Şehitleri Anma Günü", "10 Kasım Atatürk’ü Anma Günü", "15 Temmuz Demokrasi ve Millî Birlik Günü"],
                [0, 0, 0, 1, 1, 1],
                "Kartı sürükle; dokunmatik ekranda önce karta sonra gruba dokun. Klavyede Enter ile seç, grup başlığına odaklanıp Enter ile bırak.",
              ),
            ],
            "Bayram kutlanır, anma günü hatırlanır ve saygıyla anılır; 19 Mayıs adında hem anma hem bayram vardır.",
          ),
        ],
      },
      6: {
        activities: [
          read(
            "x1-w6-tisortun-yolculugu",
            "Ek okuma: Bir tişörtün yolculuğu",
            "s. 58–67",
            "Metni oku. Küreselleşmenin olumlu ve olumsuz yönlerini aynı örnek üzerinden ayır.",
            "Bir mağazada 199 liraya satılan tişörtün etiketinde “Pamuk: Hindistan, Dokuma: Bangladeş, Tasarım: İtalya, Satış: Türkiye” yazıyordu. Ayşe bu etiketi okuduğunda şaşırdı. Pamuk, Hindistan’da toplandı; iplik Bangladeş’te dokundu; kumaş gemilerle taşındı; tasarım İtalya’da yapıldı; tişört Türkiye’de satıldı. Bir ürünün bu yolculuğu, ülkelerin birbirine ne kadar bağlı olduğunu gösteriyordu. Ancak Ayşe başka bir şey daha fark etti: Tişört ucuzdu, ama üretim sürecinde çalışanların koşullarını bilmiyordu. Taşıma sırasında ne kadar yakıt kullanıldığını da. Öğretmeni, “Küreselleşme bir kapı açar; bu kapıdan geçerken neye dikkat edeceğine sen karar verirsin.” dedi. Ayşe o gün iki soru yazdı defterine: “Bu ürün kime ne kazandırıyor?” ve “Bu ürünün bedeli çevreye ne?”",
            [
              {
                id: "tisort-etki",
                prompt: "Metne göre küreselleşmenin en belirgin etkisi hangisidir?",
                fields: [
                  ch(
                    "tisort-etki-secim",
                    "Metne göre seç",
                    [
                      "Ürünlerin tek bir ülkede üretilmesi",
                      "Üretim aşamalarının farklı ülkelere dağılması",
                      "Ticaretin azalması",
                      "Tasarımın önemsizleşmesi",
                    ],
                    1,
                    "Küreselleşmede üretim zinciri ülkelere dağılır; bu da karşılıklı bağımlılık yaratır.",
                    "Etikette kaç ülke adı var?",
                  ),
                ],
              },
              {
                id: "tisort-soru",
                prompt: "Ayşe’nin yazdığı iki soruya kendi yanıtını ver.",
                fields: [
                  a("tisort-kazanc", "Kime ne kazandırıyor?", "Üretici, taşıyıcı, satıcı, tüketici…"),
                  a("tisort-cevre", "Çevreye bedeli ne?", "Taşıma, su, atık, ambalaj…"),
                ],
              },
            ],
            "Aynı üründe hem fırsatı hem maliyeti görmeye çalış; tek yönlü yargıdan kaçın.",
          ),
          drill(
            "x2-w6-etki-sort",
            "Sınıflandırma · kart eşleştirme",
            "Küreselleşmenin olumlu ve olumsuz etkileri",
            "Kartları iki gruba yerleştir. Bir durumun iki yönü olabileceğini unutma; kartın baskın etkisini seç.",
            [
              so(
                "etki-sort",
                "Etkiyi grupla",
                ["Olumlu etki", "Olumsuz etki"],
                [
                  "Bilgiye saniyeler içinde ulaşabilmek",
                  "Farklı kültürlerin ürünlerini tanımak",
                  "Uzaktaki aileyle görüntülü görüşmek",
                  "Yerel dilde bozulmaların artması",
                  "Hızlı yayılan salgın hastalıklar",
                  "Aşırı tüketim alışkanlığının yaygınlaşması",
                ],
                [0, 0, 0, 1, 1, 1],
                "Kartı sürükle; dokunmatik ekranda önce karta sonra gruba dokun. Klavyede Enter ile seç, grup başlığına odaklanıp Enter ile bırak.",
              ),
            ],
            "Etkiyi değerlendirirken kime, nerede, ne kadar sürede etki ettiğini sor.",
          ),
        ],
      },
      7: {
        activities: [
          read(
            "x1-w7-uc-ulke",
            "Ek okuma: Üç ülke, tek nehir",
            "s. 68–79",
            "Metni oku. Sorunun neden bölgesel olduğunu ve çözüm için kimlerin bir araya gelmesi gerektiğini belirle.",
            "Bir nehir, üç ülkenin topraklarından geçiyordu. Nehrin kaynağında baraj yapılınca aşağıdaki iki ülkenin tarlaları susuz kaldı. İlk yıl kuraklık, ikinci yıl göç başladı. Ülkeler önce birbirini suçladı: “Su bizim toprağımızdan doğuyor.”, “Ama bizim tarlamızı suluyordu.” Sorun sınırların içinde çözülemedi, çünkü nehir sınır tanımıyordu. Sonunda üç ülkenin tarım ve çevre uzmanları bir araya geldi. Yapılan ölçümlerde suyun yarısının sulama kanallarındaki kayıplardan gittiği görüldü. Anlaşma basit bir ilkeye dayandı: suyu kimse tek başına yönetmeyecek, ölçümler ortak olacaktı. İlk yıl kayıplar azaldı, ikinci yıl tarlalar yeniden sulandı. Bir uzman, “Sorun suyun azlığı değildi; bilginin ve kararın paylaşılmamasıydı.” dedi.",
            [
              {
                id: "nehir-olcek",
                prompt: "Bu sorun neden bölgesel bir sorundur?",
                fields: [
                  ch(
                    "nehir-olcek-secim",
                    "Metne göre seç",
                    [
                      "Yalnızca bir ülkenin sınırları içinde kaldığı için",
                      "Birden fazla ülkeyi etkilediği ve sınır aştığı için",
                      "Yalnızca tarımı ilgilendirdiği için",
                      "Çözümü tek bir uzmanın kararıyla bulunduğu için",
                    ],
                    1,
                    "Birden fazla ülkeyi etkileyen ve sınır aşan sorunlar bölgeseldir; çözüm de ortak yönetim gerektirir.",
                    "Etkilenen kaç ülke var?",
                  ),
                ],
              },
              {
                id: "nehir-cozum",
                prompt: "Sorunun çözümünde hangi iki adım belirleyici oldu? Kısa yaz.",
                fields: [
                  a("nehir-adim", "İki adım", "Ölçüm, ortak karar, veri paylaşımı…"),
                ],
              },
            ],
            "Bir sorunun ölçeğini belirlerken “kimler etkileniyor?” ve “karar kimin elinde?” sorularını sor.",
          ),
          drill(
            "x2-w7-olcek-sort",
            "Sınıflandırma · kart eşleştirme",
            "Bölgesel mi, küresel mi?",
            "Sorunları etki alanına göre grupla. Kesin sınır yoksa en geniş etki alanını seç.",
            [
              so(
                "olcek-sort",
                "Sorunu grupla",
                ["Bölgesel sorun", "Küresel sorun"],
                [
                  "Bir nehir havzasındaki su paylaşımı",
                  "Komşu iki ülke arasındaki sınır ticareti anlaşmazlığı",
                  "Akdeniz’deki plastik kirliliği",
                  "İklim değişikliği",
                  "Salgın hastalıkların yayılması",
                  "Göç hareketlerinin küresel etkisi",
                ],
                [0, 0, 1, 1, 1, 1],
                "Kartı sürükle; dokunmatik ekranda önce karta sonra gruba dokun. Klavyede Enter ile seç, grup başlığına odaklanıp Enter ile bırak.",
              ),
            ],
            "Akdeniz kirliliği birden fazla ülkeyi ilgilendirdiği ve deniz ortak olduğu için küresel ölçekte ele alınır.",
          ),
        ],
      },
      8: {
        activities: [
          read(
            "x1-w8-iyilik-gemisi",
            "Ek okuma: İyilik gemisi",
            "s. 79–83",
            "Metni oku. Yardımın hangi aşamalardan geçtiğini belirle; sonra birey, kurum ve ülke rollerini ayır.",
            "Bir limanda, yardım malzemesi taşıyan gemi hazırlanıyordu. Gemiye yüklenen kolilerin üzerinde tek bir kelime yazıyordu: “Umut”. Ancak iş yalnızca koli taşımak değildi. Önce ihtiyaç listesi hazırlandı: hangi bölgede ne eksik? Sonra malzemeler toplandı, sınıflandırıldı ve taşıma planı yapıldı. Gemiye yüklenirken bozulabilecek gıdalar öne, dayanıklı malzemeler arkaya kondu. Yolculuk sırasında gemi ekibi, teslim edilecek kurumla sürekli iletişimdeydi. Limana varınca indirme işini yerel ekip üstlendi; böylece yardım, yerel bilgiyle dağıtıldı. Bir gazeteci, “Bu yardımı kim yaptı?” diye sordu. Koordinatör, “Bir okulda toplanan kalemler, bir fabrikanın ürettiği battaniyeler, bir devletin ulaştırdığı gemi ve limanda çalışan yerel ekip… Hepsi.” dedi.",
            [
              {
                id: "gemi-asama",
                prompt: "Metne göre yardımın işe yaramasını sağlayan temel özellik hangisidir?",
                fields: [
                  ch(
                    "gemi-asama-secim",
                    "Metne göre seç",
                    [
                      "Yardımın tek bir kurum tarafından yapılması",
                      "İhtiyaç tespiti, planlama ve yerel iş birliğiyle yürütülmesi",
                      "Yardımın en kısa sürede dağıtılması",
                      "Yardımın medyada duyurulması",
                    ],
                    1,
                    "Yardım; ihtiyaç tespiti, planlama ve yerel iş birliğiyle anlamlı hâle gelir.",
                    "Nerede başlıyor, kim tamamlıyor?",
                  ),
                ],
              },
              {
                id: "gemi-roller",
                prompt: "Birey, kurum ve ülke rollerine birer örnek yaz.",
                fields: [
                  t("gemi-birey", "Birey", "Örn. kalem toplamak…"),
                  t("gemi-kurum", "Kurum", "Örn. battaniye üretmek…"),
                  t("gemi-ulke", "Ülke", "Örn. ulaşımı sağlamak…"),
                ],
              },
            ],
            "Rolleri karıştırma: birey katkı, kurum üretim/düzenleme, ülke ulaştırma ve diplomasi.",
          ),
          drill(
            "x2-w8-sorumluluk-sort",
            "Sınıflandırma · kart eşleştirme",
            "Kim, hangi sorumluluğu taşır?",
            "Kartları sorumluluk düzeyine göre grupla. Bir iş birden fazla düzeyi ilgilendirebilir; kartın en yakın sahibini seç.",
            [
              so(
                "sorumluluk-sort",
                "Sorumluluğu grupla",
                ["Birey", "Kurum", "Ülke"],
                [
                  "Geri dönüşümü günlük alışkanlık hâline getirmek",
                  "Doğru bilgiyi kaynağından kontrol etmek",
                  "Yardım kampanyası düzenlemek",
                  "Afet koordinasyon merkezi kurmak",
                  "Uluslararası insani yardım anlaşması imzalamak",
                  "Barış görüşmelerinde arabuluculuk yapmak",
                ],
                [0, 0, 1, 1, 2, 2],
                "Kartı sürükle; dokunmatik ekranda önce karta sonra gruba dokun. Klavyede Enter ile seç, grup başlığına odaklanıp Enter ile bırak.",
              ),
            ],
            "Sorumluluğu belirlerken karar verme yetkisine bak: birey mi, kurum mu, devlet mi?",
          ),
        ],
      },
      9: {
        summaryExtra:
          "Anadolu’nun siyasi yapısı Malazgirt Savaşı’ndan (1071) sonra hızla değişti. Bizans’ın denetimi zayıflarken Türkmen beylikleri Anadolu’nun farklı bölgelerine yerleşti; böylece Anadolu’nun Türkleşmesi ve İslamlaşması süreci başladı. XIII. yüzyılda Moğol baskısıyla Anadolu’ya gelen kalabalık Türkmen toplulukları, uç bölgelerde yeni beyliklerin doğmasına zemin hazırladı. Bu beyliklerden biri olan Osmanlı Beyliği, Söğüt ve çevresinde kuruldu. Kurulduğu yerin üç yanı dağlarla çevriliydi; bu durum savunmayı kolaylaştırıyor, ancak genişlemeyi sınırlıyordu. Beyliğin Bizans sınırında bulunması, gazâ anlayışıyla hareket eden grupları kendine çekti ve güç toplamasını sağladı. Bu hafta haritadan yer seçiminin sonuçlarını okuyacak, kuruluş yerinin güçlü ve zayıf yönlerini GZFT ile değerlendireceksin.",
        activities: [
          read(
            "x1-w9-uc-kapi",
            "Ek okuma: Üç kapı, bir karar",
            "s. 86–92",
            "Metni oku. Bir yerleşim yerinin savunma ve büyüme açısından nasıl değerlendirildiğini izle.",
            "Bir bey, yeni yerleşeceği yeri seçmek için üç aday belirledi. Birincisi dağların arasında, geçit vermeyen bir vadiydi: savunması kolaydı ama ticaret yolu uzaktı. İkincisi düz ovada, iki nehrin birleştiği yerdeydi: toprak verimliydi, ancak her yönden saldırıya açıktı. Üçüncüsü ise bir tepenin eteğinde, geçit veren bir yolun başındaydı: hem ticaret kervanları geçiyordu hem de tepeye çekilmek mümkündü. Bey, adamlarına sordu: “Hangisini seçelim?” Yaşlı bir danışman, “Savunma için dağ, geçim için ova, ikisi birden için geçit gerekir.” dedi. Bey üçüncüyü seçti. Yıllar sonra aynı yerleşim, kervanların uğradığı bir pazar hâline geldi; ancak savunma için tepeye bir gözetleme kulesi yapılması gerekti. Bey, bu kararı verirken hangi bilgiye dayandığını defterine yazdı: “Yer seçimi, yalnızca bugünü değil yarını da düşünmeyi gerektirir.”",
            [
              {
                id: "kapi-secim",
                prompt: "Beyin üçüncü yeri seçmesinin gerekçesi neydi?",
                fields: [
                  ch(
                    "kapi-secim-choice",
                    "Metne göre seç",
                    [
                      "Yalnızca savunması kolay olduğu için",
                      "Yalnızca toprağı verimli olduğu için",
                      "Hem ticaret yolu hem savunma imkânı sunduğu için",
                      "En kalabalık yer olduğu için",
                    ],
                    2,
                    "Üçüncü yer, iki farklı ihtiyacı (geçim ve güvenlik) birlikte karşılayabildiği için seçildi.",
                    "Seçilen yerde hangi iki özellik bir arada?",
                  ),
                ],
              },
              {
                id: "kapi-gzft",
                prompt: "Kuruluş yeri için GZFT yap: güçlü yön, zayıf yön, fırsat ve tehdit yaz.",
                fields: [
                  t("kapi-guclu", "Güçlü yön", "Savunma, su, toprak…"),
                  t("kapi-zayif", "Zayıf yön", "Ulaşım, alan darlığı…"),
                  t("kapi-firsat", "Fırsat", "Ticaret yolu, müttefik, göç…"),
                  t("kapi-tehdit", "Tehdit", "Komşu güçler, iklim, salgın…"),
                ],
              },
            ],
            "GZFT’de iç koşullar güçlü/zayıf, dış koşullar fırsat/tehdit olarak yazılır.",
          ),
          drill(
            "x2-w9-beylik-sort",
            "Sınıflandırma · kart eşleştirme",
            "Anadolu’nun değişen yapısı",
            "Kartları “değişime yol açan gelişme” ve “değişimin sonucu” olarak grupla.",
            [
              so(
                "beylik-sort",
                "Kartı grupla",
                ["Değişime yol açan gelişme", "Değişimin sonucu"],
                [
                  "Malazgirt Savaşı’nın kazanılması",
                  "Moğol baskısıyla Türkmenlerin Anadolu’ya gelmesi",
                  "Uç bölgelerde beyliklerin kurulması",
                  "Anadolu’nun Türkleşmesi ve İslamlaşması",
                  "Bizans’ın Anadolu’daki denetiminin zayıflaması",
                  "Osmanlı Beyliği’nin Söğüt çevresinde doğması",
                ],
                [0, 0, 1, 0, 1, 1],
                "Kartı sürükle; dokunmatik ekranda önce karta sonra gruba dokun. Klavyede Enter ile seç, grup başlığına odaklanıp Enter ile bırak.",
              ),
            ],
            "Neden ile sonucu ayırırken “hangisi diğerinden önce oldu?” sorusunu sor.",
          ),
        ],
      },
      10: {
        summaryExtra:
          "Osmanlı Beyliği kısa sürede büyüdü; bu büyümenin arkasında birbirini tamamlayan politikalar vardı. Gazâ anlayışı, savaşan grupları beyliğin çevresinde topladı. Fetih, ele geçirilen yerlerin kalıcı olmasını sağladı. İskân politikasıyla konargöçer topluluklar fethedilen bölgelere yerleştirildi; böylece hem üretim hem güvenlik güçlendi. İstimâlet ise yerli halkın dinine, diline ve geleneklerine karışmamak, vergide adaletli davranmak anlamına geliyordu. Bu politika, fethedilen yerlerde direnci azalttı ve yönetimin benimsenmesini kolaylaştırdı. Osman Bey’den Orhan Bey’e geçişte Bursa’nın alınması, başkentin taşınması ve ilk düzenli ordunun kurulması gibi adımlar devletin kurumsallaşmasını hızlandırdı. Bu hafta politikaları birbirinden ayıracak, hangi politikanın hangi soruna yanıt verdiğini karşılaştıracaksın.",
        activities: [
          read(
            "x1-w10-iskan",
            "Ek okuma: İskân edilen köy",
            "s. 93–102",
            "Metni oku. İskân kararının hangi sorunlara yanıt olarak alındığını ve hangi yeni sorunları doğurduğunu ayır.",
            "Fethedilen bir bölgede köy boşalmıştı: savaş sırasında pek çok kişi dağlara ya da başka şehirlere gitmişti. Yeni yönetim bir karar aldı: çevredeki konargöçer ailelerden bir kısmı buraya yerleştirilecekti. Her aileye tarla, tohum ve hayvan verildi; ilk yıl vergi alınmadı. Böylece köy yeniden ekilip biçilmeye başladı, yol güzergâhı güvenli hâle geldi. Ancak sorunlar da oldu: yeni gelenlerle eski sakinler arasında su paylaşımı yüzünden tartışma çıktı, bazı aileler yerleşmeye direndi. Yönetim, su kuyularını birlikte kullanma ve anlaşmazlıklar için köyde bir temsilci bulundurma yoluyla sorunları çözmeye çalıştı. Bir görevli deftere şöyle yazdı: “Bir yeri boş bırakmak, orayı kaybetmenin en sessiz yoludur.”",
            [
              {
                id: "iskan-neden",
                prompt: "Metinde iskân politikasının çözmeye çalıştığı temel sorun neydi?",
                fields: [
                  ch(
                    "iskan-neden-secim",
                    "Metne göre seç",
                    [
                      "Yeni fetihler için ordu kurmak",
                      "Boşalan yerlerin yeniden üretime ve güvenliğe kazandırılması",
                      "Vergilerin artırılması",
                      "Konargöçerlerin tamamen yerleşik olması",
                    ],
                    1,
                    "İskân, boşalan bölgeleri üretim ve güvenlik açısından yeniden işler hâle getirmeyi amaçlar.",
                    "Köy boşalınca ne kaybediliyor?",
                  ),
                ],
              },
              {
                id: "iskan-yan",
                prompt: "İskânın doğurduğu iki sorunu ve bir çözümü yaz.",
                fields: [
                  t("iskan-sorun1", "Birinci sorun", "Su, barınma, uyum…"),
                  t("iskan-sorun2", "İkinci sorun", "Direniş, anlaşmazlık…"),
                  a("iskan-cozum", "Çözüm", "Yönetim ne yaptı, sen ne önerirsin?"),
                ],
              },
            ],
            "Bir politikanın hem çözdüğü hem doğurduğu sorunları birlikte yaz.",
          ),
          drill(
            "x2-w10-politika-sort",
            "Sınıflandırma · kart eşleştirme",
            "Hangi politika, hangi soruna yanıt?",
            "Kartları dört politikayla eşleştir. Kartta anlatılan davranışın hangi amaca hizmet ettiğini belirle.",
            [
              so(
                "politika-sort",
                "Kartı politikayla eşleştir",
                ["Gazâ", "Fetih", "İskân", "İstimâlet"],
                [
                  "Bizans sınırında savaşan grupların beyliğe katılması",
                  "Konargöçer ailelerin yeni bölgeye yerleştirilmesi",
                  "Yerli halkın inancına ve diline karışılmaması",
                  "Bir kalenin alınıp bölgenin Osmanlı topraklarına katılması",
                  "Fethedilen yerde ilk yıl vergi alınmaması",
                  "Boş köye tohum ve hayvan verilerek üretimin başlatılması",
                  "Yeni alınan yerin kalıcı olarak yönetilmesi",
                  "Farklı inançtaki halkın kendi mahallesinde yaşamasına izin verilmesi",
                ],
                [0, 2, 3, 1, 3, 2, 1, 3],
                "Kartı sürükle; dokunmatik ekranda önce karta sonra gruba dokun. Klavyede Enter ile seç, grup başlığına odaklanıp Enter ile bırak.",
              ),
            ],
            "İskân yerleştirme, istimâlet yönetme, fetih kazanma, gazâ ise mücadele anlayışıdır.",
          ),
        ],
      },
      11: {
        summaryExtra:
          "Balkanlarda ilerleyen Osmanlı Devleti, aldığı yerleri yalnızca askerî güçle değil, yerleştirme ve yönetim düzeniyle elinde tuttu. İstanbul’un fethi bu birikimin doruk noktasıdır. Fethin siyasi nedeni Bizans’ın Osmanlı toprakları ortasında kalması ve Avrupa’dan gelecek yardımlara üs olması; ekonomik nedeni İstanbul’un ticaret yollarının kavşağında bulunması; dinî nedeni ise Hz. Muhammed’in hadisinde müjdelenen komutan olma arzusuydu. II. Mehmed fetih için Rumeli Hisarı’nı yaptırdı, büyük toplar döktürdü, donanmayı güçlendirdi ve Haliç’e giremeyen gemileri karadan yürüterek surların savunma düzenini bozdu. 29 Mayıs 1453’te şehir alındı; Orta Çağ kapandı, Yeni Çağ başladı. Bu hafta nedenleri sınıflandıracak, hazırlıkların hangi nedene yanıt verdiğini göstereceksin.",
        activities: [
          read(
            "x1-w11-sur-dibi",
            "Ek okuma: Sur dibinde bir sabah",
            "s. 96–109",
            "Metni oku. Hazırlıkların hangi savunma unsurunu hedef aldığını belirle.",
            "Kuşatmanın kırkıncı günüydü. Surların önünde bir mühendis, çizdiği plana bakıyordu: “Duvarı yıkmak için daha büyük top gerek.” dedi. Bir başkası, “Şehre denizden yardım geliyor; o yol kesilmeden kuşatma bitmez.” diye ekledi. Üçüncü bir kişi ise Haliç’e bakan zinciri işaret etti: “Şu zincir kırılmazsa gemiler içeri giremez.” Sabaha karşı karar verildi: gemiler karadan yürütülecek, surların en zayıf noktasına top yerleştirilecek ve şehre giden deniz yolu denetlenecekti. Uygulama günler sürdü; her adım bir öncekinin eksik bıraktığını tamamladı. Şehir alındığında, savunmayı yürüten komutanlardan biri şöyle dedi: “Bizi yenen top değildi; hazırlığın bizden önce başlamasıydı.”",
            [
              {
                id: "sur-hedef",
                prompt: "Metinde anlatılan hazırlıklar neyi hedeflemiştir?",
                fields: [
                  ch(
                    "sur-hedef-secim",
                    "Metne göre seç",
                    [
                      "Şehrin ticaretini artırmayı",
                      "Surları, deniz yardımını ve Haliç savunmasını aşmayı",
                      "Yeni bir başkent kurmayı",
                      "Donanmayı küçültmeyi",
                    ],
                    1,
                    "Hazırlıklar, savunmanın üç ayağını (surlar, deniz yardımı, Haliç) aşmaya yöneliktir.",
                    "Üç ayrı savunma unsuru sayılıyor mu?",
                  ),
                ],
              },
              {
                id: "sur-hazirlik",
                prompt: "Bir hazırlık seç ve hangi nedene yanıt verdiğini yaz.",
                fields: [
                  t("sur-secilen", "Seçtiğim hazırlık", "Rumeli Hisarı, büyük toplar, karadan yürütme…"),
                  a("sur-gerekce", "Hangi nedene yanıt veriyor?", "Siyasi, ekonomik ya da askerî gerekçe…"),
                ],
              },
            ],
            "Hazırlık ile neden arasında “çünkü” bağı kur; süsleme değil gerekçe yaz.",
          ),
          drill(
            "x2-w11-neden-sort",
            "Sınıflandırma · kart eşleştirme",
            "Fethin nedenlerini ayır",
            "Nedenleri siyasi, ekonomik ve dinî olarak grupla.",
            [
              so(
                "neden-sort",
                "Nedeni grupla",
                ["Siyasi neden", "Ekonomik neden", "Dinî neden"],
                [
                  "Bizans’ın Osmanlı toprakları arasında kalması",
                  "Bizans’ın Avrupa’dan yardım almasına açık olması",
                  "İstanbul’un ticaret yollarının kavşağında olması",
                  "Şehrin gümrük ve vergi gelirlerinin önemi",
                  "Hadiste müjdelenen komutan olma isteği",
                  "Şehrin dinî merkez olarak önemi",
                ],
                [0, 0, 1, 1, 2, 2],
                "Kartı sürükle; dokunmatik ekranda önce karta sonra gruba dokun. Klavyede Enter ile seç, grup başlığına odaklanıp Enter ile bırak.",
              ),
            ],
            "Bir neden birden fazla başlığa yakın görünse de en güçlü olduğu başlığı seç.",
          ),
        ],
      },
      12: {
        summaryExtra:
          "Yavuz Sultan Selim’in Mısır Seferi (1516–1517) Memlük Devleti’ne son verdi; Suriye, Filistin, Mısır ve Hicaz Osmanlı topraklarına katıldı. Bu seferle devlet, Kızıldeniz ve Hint Okyanusu’na açılan ticaret yollarına yaklaştı. Kanuni döneminde Akdeniz’de deniz gücü arttı; Preveze Deniz Zaferi (1538) Osmanlı’yı Akdeniz’in en güçlü donanması hâline getirdi. Aynı yıllarda Avrupa’da büyük deniz seyahatleri başladı. Portekiz ve İspanya, Ümit Burnu ve Amerika kıtası üzerinden yeni ticaret yolları kurdu. Bu seyahatlerin bir sonucu sömürgeciliktir: işgal edilen topraklarda yerli halkın kaynakları zorla alındı, nüfus azaldı, kültürler baskı altına alındı. Ticaret yollarının Atlas Okyanusu’na kayması Osmanlı’nın Akdeniz limanlarından elde ettiği geliri azalttı. Bu hafta deniz gücünün neden ekonomik bir mesele olduğunu ve sömürgeciliğin kimler için ne anlama geldiğini karşılaştıracaksın.",
        activities: [
          read(
            "x1-w12-baharat",
            "Ek okuma: Baharat yolu değişince",
            "s. 103–116",
            "Metni oku. Aynı olayı üç ayrı gözle değerlendir: liman tüccarı, denizci ve yerli halk.",
            "Bir liman kentinde tüccar, yıllardır baharatı kervanlarla getirip satıyordu. Bir gün gelen malların fiyatı düştü: artık baharat, deniz yoluyla, çok daha ucuza geliyordu. Tüccar sevindi mi, üzüldü mü, bilemedi; çünkü kendi deposundaki mal değer kaybetti ama müşteri arttı. Aynı hafta limana yeni bir gemi yanaştı. Gemici, “Artık her şey denizden gelecek.” dedi. Ancak geminin geldiği yerlerde başka bir şey oluyordu: yeni topraklarda kurulan kolonilerde yerli halkın tarlaları el değiştiriyor, madenler zorla çıkarılıyordu. Bir gün gemici, limanda yaşlı bir tüccara sordu: “Bu yeni düzen kime yarıyor?” Tüccar, “Bana yaramıyor artık; ama malı alan tüketiciye yarıyor. Bedeli ise denizaşırı topraklarda yaşayanlar ödüyor.” dedi.",
            [
              {
                id: "baharat-goz",
                prompt: "Metne göre ticaret yollarının değişmesinden en çok kim etkilendi?",
                fields: [
                  ch(
                    "baharat-goz-secim",
                    "Metne göre seç",
                    [
                      "Yalnızca tüccarlar",
                      "Tüccar, tüketici ve sömürülen topraklarda yaşayanlar farklı biçimlerde",
                      "Yalnızca denizciler",
                      "Yalnızca devlet yöneticileri",
                    ],
                    1,
                    "Aynı olay farklı grupları farklı biçimlerde etkiler; kazanç ve bedel aynı kişilerde toplanmaz.",
                    "Metinde kaç farklı kişi konuşuyor?",
                  ),
                ],
              },
              {
                id: "baharat-somurge",
                prompt: "Sömürgeciliğin yerli halk için sonuçlarını iki maddeyle yaz.",
                fields: [
                  a("baharat-yerli", "Yerli halk için iki sonuç", "Toprak, nüfus, kültür, dil…"),
                ],
              },
            ],
            "Ekonomik bir değişimi değerlendirirken kazananı ve bedeli ödeyeni ayrı ayrı yaz.",
          ),
          drill(
            "x2-w12-somurge-sort",
            "Sınıflandırma · kart eşleştirme",
            "Sömürgeciliğin üç yüzü",
            "Kartları etkilenen gruba göre ayır. Aynı sonuç farklı gruplar için farklı anlam taşır.",
            [
              so(
                "somurge-sort",
                "Sonucu grupla",
                ["Yerli halk", "Avrupalı denizci ve tüccar", "Osmanlı ekonomisi"],
                [
                  "Toprakların el değiştirmesi",
                  "Nüfusun azalması ve kültürlerin baskı altına alınması",
                  "Yeni ticaret yollarından kazanç sağlanması",
                  "Denizaşırı topraklarda koloni kurulması",
                  "Akdeniz limanlarından gelen gelirin azalması",
                  "Baharat ticaretinin yön değiştirmesiyle gümrük gelirinin düşmesi",
                ],
                [0, 0, 1, 1, 2, 2],
                "Kartı sürükle; dokunmatik ekranda önce karta sonra gruba dokun. Klavyede Enter ile seç, grup başlığına odaklanıp Enter ile bırak.",
              ),
            ],
            "Sonucu yazarken “kime göre?” sorusunu mutlaka belirt.",
          ),
        ],
      },
      13: {
        summaryExtra:
          "Avrupa’da XV. yüzyıldan itibaren bilim, sanat ve düşünce alanında köklü bir değişim yaşandı. Rönesans, Antik Yunan ve Roma kaynaklarına dönerek insanı ve doğayı gözleme dayalı biçimde yeniden ele aldı; matbaanın yaygınlaşması bilginin dolaşımını hızlandırdı. Bu dönemde yetişen sanatçı ve bilim insanları, Osmanlı coğrafyasındaki bilgi birikiminden de yararlandı. Reform, Katolik Kilisesi’nin uygulamalarına yönelik eleştirilerle başladı; mezhep ayrılıkları ve uzun savaşlar doğurdu. Osmanlı Devleti, farklı inanç gruplarını bir arada tutan yönetim anlayışıyla bu süreçten etkilenen topluluklara kapı açtı. Aydınlanma Çağı’nda akıl, gözlem ve deney öne çıktı; bilimsel yöntem güçlendi ve bireyin hakları tartışılmaya başlandı. Bu fikirler daha sonra Fransız İhtilali’nin zeminini hazırladı. Bu hafta üç akımı neden ve sonuçlarıyla ayıracaksın.",
        activities: [
          read(
            "x1-w13-matbaa",
            "Ek okuma: Matbaanın sesi",
            "s. 117–122",
            "Metni oku. Bir buluşun düşünce hayatını nasıl değiştirdiğini izle.",
            "Bir atölyede, harfler tek tek diziliyordu. Usta, dizdiği sayfayı baskı makinesine verdi; birkaç saat içinde aynı metnin yüzlerce kopyası çıktı. Eskiden bir kitabı çoğaltmak aylar alıyordu; şimdi günler yetiyordu. İlk yıllarda basılan kitaplar çoğunlukla dinî metinlerdi. Sonra haritalar, tıp kitapları, hukuk metinleri geldi. Bir öğrenci, aynı kitabı arkadaşıyla aynı hafta okuyabildi; öğretmeni, “Artık bilgi bir kişinin odasında kalmıyor.” dedi. Ancak her yenilik gibi bunun da direnci oldu: elle kitap yazanlar işlerini kaybetti, bazı çevreler basılan fikirleri tehlikeli buldu. Yıllar sonra bir tarihçi, matbaanın etkisini tek cümleyle özetledi: “Aynı kitabı binlerce kişinin okuması, aynı soruyu binlerce kişinin sorması demekti.”",
            [
              {
                id: "matbaa-etki",
                prompt: "Metne göre matbaanın en önemli etkisi nedir?",
                fields: [
                  ch(
                    "matbaa-etki-secim",
                    "Metne göre seç",
                    [
                      "Kitapların daha süslü olması",
                      "Bilginin hızla çoğalıp geniş kitlelere ulaşması",
                      "Elle yazmanın yasaklanması",
                      "Kâğıt üretiminin azalması",
                    ],
                    1,
                    "Matbaa, bilginin çoğaltılma maliyetini düşürerek dolaşımını hızlandırdı.",
                    "Kaç kopya, ne kadar sürede çıkıyor?",
                  ),
                ],
              },
              {
                id: "matbaa-direnc",
                prompt: "Bir yeniliğe neden direnç gösterilir? Metinden bir örnek ve kendi gerekçeni yaz.",
                fields: [
                  t("matbaa-ornek", "Metindeki direnç", "Kim, neden karşı çıktı?"),
                  a("matbaa-gerekce", "Senin gerekçen", "Kayıp, alışkanlık, korku, denetim…"),
                ],
              },
            ],
            "Yeniliğin kazandırdığı ile kaybettirdiği şeyi aynı paragrafta karşılaştır.",
          ),
          drill(
            "x2-w13-akim-sort",
            "Sınıflandırma · kart eşleştirme",
            "Rönesans, Reform ve Aydınlanma",
            "Kartları ait olduğu akımla eşleştir. Akımların hangi alanda öne çıktığına dikkat et.",
            [
              so(
                "akim-sort",
                "Kartı akımla eşleştir",
                ["Rönesans", "Reform", "Aydınlanma"],
                [
                  "Antik kaynaklara dönüş ve sanatta gözlem",
                  "Katolik Kilisesi uygulamalarına yönelik eleştiri",
                  "Akıl, gözlem ve deneyin öne çıkması",
                  "Matbaanın bilgi dolaşımını hızlandırması",
                  "Mezhep ayrılıkları ve din savaşları",
                  "Bireyin haklarının tartışılması",
                ],
                [0, 1, 2, 0, 1, 2],
                "Kartı sürükle; dokunmatik ekranda önce karta sonra gruba dokun. Klavyede Enter ile seç, grup başlığına odaklanıp Enter ile bırak.",
              ),
            ],
            "Sanat ve gözlem Rönesans’a, inanç tartışması Reform’a, akıl ve bilim Aydınlanma’ya bağlanır.",
          ),
        ],
      },
      14: {
        summaryExtra:
          "Sanayi İnkılabı, XVIII. yüzyılda İngiltere’de başladı; buhar gücüyle çalışan makineler üretimi fabrikalara taşıdı. Seri ve ucuz üretim, el tezgâhlarına dayalı üretimi zayıflattı; şehirlere göç arttı, işçi sınıfı doğdu. Osmanlı Devleti bu değişimi yakalamak için sanayi mektepleri açtı, fabrikalar kurdu; ancak sermaye, teknoloji, nitelikli iş gücü ve ulaşım yetersizliği nedeniyle beklenen sonucu alamadı. Aynı yüzyılda Fransız İhtilali (1789), özgürlük, eşitlik ve milliyetçilik fikirlerini yaydı; bu fikirler Osmanlı’da Tanzimat ve Meşrutiyet gibi yeniliklere zemin hazırladı. Lale Devri (1718–1730) ise yeniliklerin kültürel yüzünü gösterir: matbaa, çiçek aşısı, itfaiye düzeni, kütüphaneler ve saray çevresinde sanat hamiliği. Bu hafta yenilikleri alanlarına göre ayıracak, amaç ile sonuç arasındaki farkı değerlendireceksin.",
        activities: [
          read(
            "x1-w14-lale-devri",
            "Ek okuma: Lale Devri’nde bir akşam",
            "s. 122–135",
            "Metni oku. Yeniliklerin hangi alanlarda görüldüğünü ve halkın günlük hayatına nasıl yansıdığını belirle.",
            "Akşamüstü, bir konağın bahçesinde sohbet vardı. Konuklardan biri, “Bu yıl lale soğanları için bahçeye yeni bir düzen yaptırdım.” dedi. Bir diğeri, “Ben daha çok matbaayı merak ediyorum; kitabı birkaç günde çoğaltıyorlar.” Üçüncü konuk ise tulumbacılardan söz etti: “Yangında ilk kez düzenli bir ekip gidiyor; her mahallede tulumba var.” Çocuklardan biri, “Çiçek aşısı gerçekten işe yarıyor mu?” diye sordu; hekim, “Çiçek hastalığından korunmak için uygulanıyor, giderek yaygınlaşıyor.” dedi. Sohbet ilerledikçe herkes kendi merakını anlattı: şiir, minyatür, bahçe düzeni, kütüphane. Ancak yaşlı bir konuk, “Bu güzellikler saray çevresinde kalırsa halk ne kazanır?” diye sordu. Soru yanıtsız kaldı ve sohbet orada durdu.",
            [
              {
                id: "lale-alan",
                prompt: "Metinde anlatılan yenilikler hangi alanlarda görülmektedir?",
                fields: [
                  ch(
                    "lale-alan-secim",
                    "Metne göre seç",
                    [
                      "Yalnızca askerî alanda",
                      "Basım, sağlık, şehir güvenliği ve sanat alanlarında",
                      "Yalnızca tarım alanında",
                      "Yalnızca hukuk alanında",
                    ],
                    1,
                    "Metinde matbaa (basım), çiçek aşısı (sağlık), tulumbacılar (güvenlik) ve sanat alanları birlikte görülüyor.",
                    "Kaç farklı konu konuşuluyor?",
                  ),
                ],
              },
              {
                id: "lale-soru",
                prompt: "Yaşlı konuğun sorusuna kendi yanıtını yaz.",
                fields: [
                  a("lale-yanit", "Yenilik halka nasıl ulaşır?", "Eğitim, vakıf, kütüphane, şehir hizmetleri…"),
                ],
              },
            ],
            "Yenilikleri alanlarına ayırırken örnek ile alanı birebir eşleştir.",
          ),
          drill(
            "x2-w14-yenilik-sort",
            "Sınıflandırma · kart eşleştirme",
            "Osmanlı yeniliklerini alanlarına yerleştir",
            "Kartları dört alana taşı. Her kartın hangi ihtiyaca yanıt verdiğini düşün.",
            [
              so(
                "yenilik-sort",
                "Yeniliği alanına taşı",
                ["Askerî", "Eğitim", "Hukuk", "Ekonomi"],
                [
                  "Nizam-ı Cedid Ordusu’nun kurulması",
                  "Yeniçeri Ocağı’nın kaldırılması",
                  "Sanayi mekteplerinin açılması",
                  "Mekteb-i Mülkiye’nin açılması",
                  "Tanzimat Fermanı’nın ilan edilmesi",
                  "Mecelle’nin hazırlanması",
                  "Fabrika kurulması",
                  "Kâğıt ve dokuma üretiminin desteklenmesi",
                ],
                [0, 0, 1, 1, 2, 2, 3, 3],
                "Kartı sürükle; dokunmatik ekranda önce karta sonra gruba dokun. Klavyede Enter ile seç, grup başlığına odaklanıp Enter ile bırak.",
              ),
            ],
            "Okul eğitime, ordu askerî alana, ferman-kanun hukuka, fabrika ekonomiye bağlanır.",
          ),
        ],
      },
      15: {
        summaryExtra:
          "Osmanlı kültür ve medeniyeti, yönetimden gündelik hayata kadar geniş bir alanı kapsar. Yönetimde padişahın yetkileri kanunname ve örfle sınırlandırılmış, Divan-ı Hümâyun kararların görüşüldüğü kurum olmuştur. Bugünkü Bakanlar Kurulu’na benzer işlevi olan bu kurum, Tanzimat sonrasında nazırlıklara dönüşmüştür. Eğitimde sıbyan mektepleri ve medreselerin yanında Enderun, devlet görevlilerini yetiştirmiştir. Hukukta şer’î ve örfî hukuk birlikte uygulanmış; Mecelle ile hukuk kuralları maddeler hâline getirilmiştir. Sanatta hat, tezhip, minyatür ve çini öne çıkmıştır. Vakıf kültürü ise toplumsal dayanışmanın kurumsal yüzüdür: cami, medrese, darüşşifa, imaret, çeşme ve kütüphaneler vakıflarla yaşatılmıştır. Ahilik ve lonca teşkilatı mesleki eğitimi, kalite denetimini ve meslek ahlakını üstlenmiştir. Bu hafta kurumları günümüzdeki karşılıklarıyla eşleştireceksin.",
        activities: [
          read(
            "x1-w15-vakif",
            "Ek okuma: Vakfın defteri",
            "s. 136–154",
            "Metni oku. Vakfın hangi hizmetleri üstlendiğini ve bu hizmetin sürekliliğini neyin sağladığını belirle.",
            "Bir mahallede vakıf defteri tutuluyordu. Defterin ilk sayfasında şu cümle vardı: “Bu çeşme, mahalle halkı içindir; din, dil, cinsiyet ayrımı gözetilmez.” İkinci sayfada bir imaretin günlük yemek listesi, üçüncü sayfada darüşşifada çalışan hekimlerin adları yazılıydı. Defteri tutan görevli her ay harcamayı kaydeder, geliri kira ve bağışlardan sağlardı. Bir gün yeni bir mahalle sakini geldi: “Bu çeşmeden ben de su alabilir miyim?” Görevli güldü: “Defterin ilk sayfasını oku.” Yıllar içinde mahalle değişti, insanlar taşındı; ama çeşme akmaya, imaret çalışmaya devam etti. Bir tarihçi, sonradan şöyle yazdı: “Vakıf, iyiliği bir kişinin hevesine değil, bir kurumun düzenine bağlayan buluştur; bu yüzden yüzyıllar boyunca sürdü.”",
            [
              {
                id: "vakif-sure",
                prompt: "Vakıf hizmetlerinin yüzyıllar boyunca sürmesini sağlayan nedir?",
                fields: [
                  ch(
                    "vakif-sure-secim",
                    "Metne göre seç",
                    [
                      "Hizmetin tek bir kişi tarafından yürütülmesi",
                      "Gelir, kayıt ve denetim düzeniyle kurumsallaşması",
                      "Mahalle nüfusunun hiç değişmemesi",
                      "Hizmetin yalnızca bir gruba verilmesi",
                    ],
                    1,
                    "Vakıf; gelir kaynağı, kayıt ve denetim düzeniyle kurumsallaştığı için süreklilik kazanır.",
                    "Defter ne işe yarıyor?",
                  ),
                ],
              },
              {
                id: "vakif-bugun",
                prompt: "Vakıf hizmetlerinden birini seç ve bugünkü karşılığını yaz.",
                fields: [
                  t("vakif-hizmet", "Seçtiğim hizmet", "Çeşme, imaret, darüşşifa, kütüphane…"),
                  a("vakif-karsilik", "Bugünkü karşılığı", "Belediye, hastane, dernek, okul…"),
                ],
              },
            ],
            "Kurumsallaşmayı üç ölçütle kontrol et: gelir, kayıt, denetim.",
          ),
          drill(
            "x2-w15-kurum-sort",
            "Sınıflandırma · kart eşleştirme",
            "Osmanlı kurumlarını alanlarına yerleştir",
            "Kartları yönetim, eğitim, hukuk ve sanat alanlarına taşı.",
            [
              so(
                "kurum-sort",
                "Kurumu alanına taşı",
                ["Yönetim", "Eğitim", "Hukuk", "Sanat"],
                [
                  "Divan-ı Hümâyun",
                  "Enderun mektebi",
                  "Mecelle",
                  "Tezhip ve minyatür",
                  "Şer’î ve örfî hukukun birlikte uygulanması",
                  "Sıbyan mektepleri ve medreseler",
                  "Hat sanatının resmî belgelerde kullanılması",
                  "Kadıların davaları karara bağlaması",
                ],
                [0, 1, 2, 3, 2, 1, 3, 2],
                "Kartı sürükle; dokunmatik ekranda önce karta sonra gruba dokun. Klavyede Enter ile seç, grup başlığına odaklanıp Enter ile bırak.",
              ),
            ],
            "Divan yönetir, medrese öğretir, kadı-mecelle yargılar, hat-tezhip süsler.",
          ),
        ],
      },
    },
  };

  // ---------------------------------------------------------------------------
  // Kitabın ders işleme şablonundaki tekniklerle ikinci ek çalışma dalgası.
  // Her haftaya, konuya uygun iki ayrı teknik eklenir; aynı bilgi tekrar edilmez.
  // ---------------------------------------------------------------------------
  const fishbone = (id, title, prompt, groups, hint) => drill(
    id,
    "Balık kılçığı · neden çözümleme",
    title,
    prompt,
    groups.map((group, index) => a(`${id}-neden${index + 1}`, group[0], group[1])),
    hint,
  );
  const swot = (id, title, prompt, quads, hint) => drill(
    id,
    "GZFT · güçlü yön, zayıf yön, fırsat, tehdit",
    title,
    prompt,
    quads.map((quad, index) => a(`${id}-${["g", "z", "f", "t"][index]}`, quad[0], quad[1])),
    hint,
  );
  const tree = (id, title, prompt, nodes, hint) => drill(
    id,
    "Tanılayıcı dallanmış ağaç · karar düğümleri",
    title,
    prompt,
    nodes.map((node, index) => ch(`${id}-dugum${index + 1}`, node[0], node[1], node[2], node[3], node[4])),
    hint,
  );
  const timeline = (id, title, prompt, columns, rows, order, instructions, hint) => drill(
    id,
    "Zaman şeridi · sıralama",
    title,
    prompt,
    [so(`${id}-serit`, "Kartları dönemlere yerleştir", columns, rows, order, instructions)],
    hint,
  );
  const cloud = (id, title, prompt, label, placeholder, hint) => drill(
    id,
    "Kelime bulutu · kavram çağrışımı",
    title,
    prompt,
    [w(`${id}-bulut`, label, placeholder)],
    hint,
  );
  const puzzle = (id, title, prompt, clues, hint) => drill(
    id,
    "Bulmaca · kavram yerleştirme",
    title,
    prompt,
    clues.map((clue, index) => t(`${id}-kutu${index + 1}`, `${index + 1}. ${clue[0]}`, clue[1])),
    hint,
  );
  const concept = (id, title, prompt, nodes, hint) => drill(
    id,
    "Kavram haritası · ilişkilendirme",
    title,
    prompt,
    nodes.map((node, index) => a(`${id}-dugum${index + 1}`, node[0], node[1])),
    hint,
  );
  const diag = (id, title, prompt, items, hint) => drill(
    id,
    "Tanılayıcı test · kendini sına",
    title,
    prompt,
    items.map((item, index) => ch(`${id}-soru${index + 1}`, item[0], item[1], item[2], item[3], item[4])),
    hint,
  );

  const add = (weekId, ...activities) => window.SOCIAL_EXTRAS.weeks[weekId].activities.push(...activities);

  add(
    1,
    fishbone(
      "x3-w1-kazanan-neden",
      "Balık kılçığı: karar neden çıkmadı?",
      "Bir grup çalışmasında karar alınamamasının nedenlerini dört başlıkta çözümle. Her başlığa en az bir neden yaz; nedenleri kişilerin özelliklerine değil, sürece bağla.",
      [
        ["Konuşan kişiler", "Kim, ne kadar söz aldı; kimin sözü kesildi?"],
        ["Mesaj", "Öneriler açık ve ölçülebilir miydi?"],
        ["Ortam", "Süre, gürültü ve oturma düzeni kararı etkiledi mi?"],
        ["Süreç", "Sıra, geri bildirim ve karar kuralı belli miydi?"],
      ],
      "Nedenleri kişilik yerine gözlenebilir davranışla yaz: “Mert hep konuşuyor” değil, “söz sırası belirlenmemişti”.",
    ),
    tree(
      "x4-w1-arac-secimi",
      "Dallanmış ağaç: hangi iletişim yolunu seçeyim?",
      "Üç düğümü sırayla yanıtla. Her düğümde durumu oku, en uygun iletişim yolunu seç ve gerekçesini açıklamayla karşılaştır.",
      [
        [
          "Düğüm 1 · Yanlış anlaşılma riski yüksek, karşı tarafın yüz ifadesini görmen gerekiyor.",
          ["Kısa bir mesaj yazmak", "Yüz yüze görüşmek", "Sosyal medyada paylaşmak", "Sessiz kalmak"],
          1,
          "Yüz ifadesi ve ses tonu ancak yüz yüze görüşmede okunur; yazılı kanal bu bilgiyi taşımaz.",
          "Beden dili gerekiyor mu?",
        ],
        [
          "Düğüm 2 · Karşı taraf başka şehirde ve kararın yazılı kalması gerekiyor.",
          ["Sözlü haber göndermek", "Yazılı mesaj veya e-posta", "Hiç haber vermemek", "Telefonla bir cümle söylemek"],
          1,
          "Kalıcı ve kanıtlanabilir kayıt gerektiğinde yazılı iletişim seçilir.",
          "Kaydın kalması gerekiyor mu?",
        ],
        [
          "Düğüm 3 · Sınıfta herkesin katılması gereken bir karar alınacak.",
          ["Tek kişinin karar vermesi", "Sıra ve süre kuralı olan bir tartışma", "Kararı ertelemek", "Konuyu değiştirmek"],
          1,
          "Ortak kararlar, sıra ve süresi belirlenmiş tartışmayla alınır; aksi hâlde sesi güçlü olan karar verir.",
          "Herkesin sözü nasıl garanti edilir?",
        ],
      ],
      "Düğümleri sırayla çöz: gereksinim (beden dili, kayıt, katılım) hangi yolu işaret ediyor?",
    ),
  );

  add(
    2,
    tree(
      "x3-w2-catisma-agaci",
      "Dallanmış ağaç: çatışmayı hangi adımla çözerim?",
      "Üç düğümde çatışma anını canlandır. Her adımda seçimini yap; açıklamayla karşılaştırıp kendi sıranı gözden geçir.",
      [
        [
          "Düğüm 1 · Arkadaşın sözünü bitirmeden itiraz ettin, ortam gerildi.",
          [
            "Savunmaya geçip haklı olduğunu kanıtlamak",
            "Önce onun ne söylediğini kendi cümlelerinle tekrar etmek",
            "Konuyu değiştirmek",
            "Ortamdan uzaklaşmak",
          ],
          1,
          "Etkin dinlemenin ilk adımı, karşı tarafın söylediğini doğru anladığını göstermektir.",
          "Anladığını göstermeden tartışma biter mi?",
        ],
        [
          "Düğüm 2 · Karşı taraf senin fikrini beğenmedi.",
          [
            "“Sen beni hiç anlamıyorsun.”",
            "“Önerimi beğenmediğini duydum; benim için önemli olan …”",
            "Sessizce küsme",
            "Başkalarına şikâyet etme",
          ],
          1,
          "Ben dili, duyguyu ve ihtiyacı suçlama olmadan anlatır.",
          "Cümlede suçlama var mı?",
        ],
        [
          "Düğüm 3 · İki öneri de işe yarayabilir.",
          [
            "Birini seçip diğerini silmek",
            "İki önerinin güçlü yönlerini birleştiren üçüncü bir yol aramak",
            "Kararı öğretmene bırakmak",
            "Kararı erteleyip konuyu kapatmak",
          ],
          1,
          "Uzlaşma, tarafların ihtiyacını karşılayan yeni bir çözüm üretmektir.",
          "İki ihtiyaç birlikte karşılanabilir mi?",
        ],
      ],
      "Sıra: anladığını göster → duygunu ben diliyle anlat → ortak çözüm ara.",
    ),
    concept(
      "x4-w2-duygu-haritasi",
      "Kavram haritası: duygu, ihtiyaç, istek",
      "Yaşadığın bir anlaşmazlığı seç. Duygu, ihtiyaç ve istek düğümlerini doldur; sonra bu üçünden bir ben dili cümlesi kur.",
      [
        ["Duygu", "Örn. hayal kırıklığı, kırgınlık, kaygı…"],
        ["İhtiyaç", "Örn. dinlenmek, görüşümün dikkate alınması…"],
        ["İstek (somut)", "Örn. sözüm bitmeden itiraz edilmemesi…"],
        ["Kurduğun ben dili cümlesi", "Duygu + ihtiyaç + istek sırasıyla…"],
      ],
      "Ben dili kalıbı: “…… olduğunda …… hissediyorum, çünkü …… ihtiyacım var; …… yapmanı istiyorum.”",
    ),
  );

  add(
    3,
    swot(
      "x3-w3-erisim-gzft",
      "GZFT: okulun erişilebilirliği",
      "Okulunun ortak alanlarını düşün. Güçlü yön, zayıf yön, fırsat ve tehdit kutularını doldur; her kutuya en az bir gözlem yaz.",
      [
        ["Güçlü yön", "Hâlihazırda erişimi kolaylaştıran özellikler"],
        ["Zayıf yön", "Katılımı zorlaştıran engeller"],
        ["Fırsat", "Kısa sürede iyileştirilebilecek imkânlar"],
        ["Tehdit", "İyileştirme yapılmazsa doğacak sorunlar"],
      ],
      "Gözlem ile tahmini ayır: gördüğünü yaz, duyduğunu değil.",
    ),
    puzzle(
      "x4-w3-erisim-bulmaca",
      "Bulmaca: erişilebilirlik kavramları",
      "Beş tanımı okuyup karşılık gelen kavramı yaz. Kavramları tahmin ederken tanımdaki ipucu sözcüklere dikkat et.",
      [
        ["Tekerlekli sandalyeyle geçişi sağlayan eğimli yol", "Örn. rampa"],
        ["Görme engellilerin parmakla okuduğu yazı", "Örn. kabartma yazı"],
        ["İşitme engellilerin kullandığı görsel dil", "Örn. işaret dili"],
        ["Görüntüyü sözle anlatan sesli anlatım", "Örn. sesli betimleme"],
        ["Yaya yolunun yol seviyesinden yüksek olması", "Örn. kaldırım"],
      ],
      "Tanımdaki işlevi bul: hangi engeli kaldırıyor?",
    ),
  );

  add(
    4,
    concept(
      "x3-w4-proje-dongusu",
      "Kavram haritası: proje döngüsü",
      "Erişilebilirlik veya dayanışma konulu küçük bir proje tasarla. Dört düğümü doldur; her düğüm bir sonrakine bağlansın.",
      [
        ["Hedef", "Kimin hangi sorunu, ne kadar azalacak?"],
        ["Adımlar", "Sırayla yapılacak üç iş"],
        ["Ölçüt", "Başarıyı nasıl ölçeceksin?"],
        ["Paydaş ve destek", "Kimden destek isteyeceksin?"],
      ],
      "Hedefi ölçülebilir yaz: “farkındalık artsın” yerine “20 öğrenciyle atölye yapılsın”.",
    ),
    cloud(
      "x4-w4-ortak-degerler-bulutu",
      "Kelime bulutu: bizi birleştiren değerler",
      "Millî meselelerde toplumu bir arada tutan değerleri düşün. En az altı kavramı virgülle ayırarak yaz; sonra en güçlü bulduğun kavramı gerekçelendir.",
      "Değerler (virgülle ayır)",
      "Örn. dayanışma, adalet, vatanseverlik, dürüstlük…",
      "Bulutunda yalnızca değer adı olsun; örnek ya da kişi adı yazma.",
    ),
  );

  add(
    5,
    timeline(
      "x3-w5-milli-mucadele-seridi",
      "Zaman şeridi: Millî Mücadele dönemleri",
      "Kartları dönemlere yerleştir. Yerleştirirken olayın niteliğine bak: karar mı, çatışma mı, sonuç mu?",
      ["Hazırlık dönemi", "Cephe dönemi", "Sonuç dönemi"],
      [
        "Amasya Genelgesi",
        "Sivas Kongresi",
        "Sakarya Savaşı",
        "Büyük Taarruz",
        "Mudanya Ateşkesi",
        "Lozan Antlaşması",
      ],
      [0, 0, 1, 1, 2, 2],
      "Kartı seç, dönemi işaretle; her kart tek döneme aittir.",
      "Karar metinleri hazırlık, çatışmalar cephe, antlaşmalar sonuç dönemine aittir.",
    ),
    fishbone(
      "x4-w5-dayanisma-neden",
      "Balık kılçığı: dayanışmayı zayıflatan nedenler",
      "Bir toplulukta dayanışmanın zayıflamasına yol açan nedenleri dört başlıkta çözümle. Ardından bir önlem öner.",
      [
        ["Bilgi", "İhtiyaç duyulan bilgi paylaşılmıyor mu?"],
        ["İletişim", "Kim, kiminle konuşmuyor?"],
        ["Güven", "Söz tutulmaması güveni zedeliyor mu?"],
        ["Katılım", "Kim süreç dışında kalıyor?"],
      ],
      "Nedenleri somutlaştır; “insanlar duyarsız” gibi genel ifadelerden kaçın.",
    ),
  );

  add(
    6,
    swot(
      "x3-w6-kuresellesme-gzft",
      "GZFT: küreselleşmenin dört yüzü",
      "Küreselleşmeyi kendi yaşamın üzerinden değerlendir. Dört kutuya birer örnek yaz; örneklerin günlük hayattan olsun.",
      [
        ["Güçlü yön", "Sana sağladığı kolaylık"],
        ["Zayıf yön", "Seni zorlayan yönü"],
        ["Fırsat", "Doğru kullanılırsa açacağı imkân"],
        ["Tehdit", "Denetlenmezse doğuracağı risk"],
      ],
      "Her kutuya bir ürün, bir alışkanlık ya da bir hizmet adı ekle.",
    ),
    diag(
      "x4-w6-kuresellesme-tani",
      "Tanılayıcı test: kavramları ayırt et",
      "Üç soruyu yanıtla. Yanlış yanıtta ipucunu oku ve konu özetindeki ilgili bölüme dön.",
      [
        [
          "Bir ürünün ham maddesinin bir ülkede işlenip başka ülkede satılması neyi gösterir?",
          ["Üretimin yerelleştiğini", "Üretim sürecinin küresel biçimde bölündüğünü", "Ticaretin azaldığını", "Ulaşımın önemsizleştiğini"],
          1,
          "Üretim aşamalarının ülkelere dağılması küresel iş bölümünün göstergesidir.",
          "Üretim tek yerde mi yapılıyor?",
        ],
        [
          "Yerel bir ürünün dünya pazarına açılması hangi başlıkta değerlendirilir?",
          ["Kültürel yozlaşma", "Küreselleşmenin sağladığı pazar imkânı", "Göçün nedeni", "Sanayisizleşme"],
          1,
          "Küresel pazar, yerel üreticiye erişim imkânı da sunar; sonuç kullanım biçimine bağlıdır.",
          "İmkân mı, risk mi?",
        ],
        [
          "Küreselleşmenin olumsuz etkilerini azaltmada en etkili yaklaşım hangisidir?",
          ["Tüm yabancı ürünleri yasaklamak", "Yerel üretimi ve kültürel aktarımı desteklemek", "İnterneti kapatmak", "Yalnızca ithal ürün kullanmak"],
          1,
          "Yerel üretim ve kültürel aktarım, küresel akışlar içinde kimliği korumanın sürdürülebilir yoludur.",
          "Yasak mı, destek mi?",
        ],
      ],
      "Kavramları örnek üzerinden ayırt et: üretim, pazar, kültür.",
    ),
  );

  add(
    7,
    fishbone(
      "x3-w7-sorun-neden",
      "Balık kılçığı: küresel bir sorunun nedenleri",
      "Su kıtlığı ya da iklim değişikliği gibi bir sorunu seç. Nedenleri dört başlıkta çözümle ve her başlığa bir kanıt yaz.",
      [
        ["Doğal etkenler", "İklim, kuraklık, su döngüsü…"],
        ["İnsan etkinlikleri", "Tüketim, sanayi, tarım…"],
        ["Yönetim", "Planlama, denetim, altyapı…"],
        ["Toplumsal etkenler", "Farkındalık, eğitim, yoksulluk…"],
      ],
      "Kanıt olarak sayı, gözlem ya da belge adı ver; genel ifadeyle yetinme.",
    ),
    diag(
      "x4-w7-olcek-tani",
      "Tanılayıcı test: sorunun ölçeğini belirle",
      "Üç soruyu yanıtla. Her soruda sorunun kaç topluluğu ve hangi alanı etkilediğini düşün.",
      [
        [
          "Bir nehrin kirliliğinin iki komşu ülkeyi etkilemesi hangi ölçekte bir sorundur?",
          ["Yerel", "Bölgesel", "Küresel", "Bireysel"],
          1,
          "İki ya da birkaç komşu ülkeyi ilgilendiren sorunlar bölgeseldir; küresel sorun dünya genelini kapsar.",
          "Kaç ülke etkileniyor?",
        ],
        [
          "İklim değişikliğinin tüm kıtalarda etkili olması hangi ölçeği gösterir?",
          ["Mahalle ölçeği", "Ülke ölçeği", "Küresel ölçek", "Okul ölçeği"],
          2,
          "Tüm kıtaları etkileyen sorunlar küresel ölçektedir.",
          "Etki nereye kadar uzanıyor?",
        ],
        [
          "Bir sorunun çözümünde bireye düşen görev hangisidir?",
          ["Antlaşma imzalamak", "Günlük tüketim ve katılım tercihlerini sorumlu yapmak", "Sınırları değiştirmek", "Uluslararası mahkeme kurmak"],
          1,
          "Birey antlaşma yapamaz; ancak tüketim, geri dönüşüm ve katılım yoluyla katkı sağlar.",
          "Bireyin elindeki imkân ne?",
        ],
      ],
      "Ölçeği belirlerken etkilenen alanı ve topluluk sayısını ölçüt al.",
    ),
  );

  add(
    8,
    puzzle(
      "x3-w8-kurum-bulmaca",
      "Bulmaca: uluslararası kuruluşlar",
      "Tanımları okuyup kuruluşun kısa adını yaz. Kuruluşları görev alanlarıyla eşleştir.",
      [
        ["Barış ve güvenliği korumak için kurulan dünya örgütü", "Örn. BM"],
        ["Çocuk hakları ve çocuk sağlığı alanında çalışan fon", "Örn. UNICEF"],
        ["Eğitim, bilim ve kültür alanında çalışan örgüt", "Örn. UNESCO"],
        ["Üye ülkelerin ortak savunmasını öngören ittifak", "Örn. NATO"],
        ["Silahlı çatışma ve afetlerde yardım yapan topluluk", "Örn. Kızılay"],
      ],
      "Kısaltmayı değil görevi düşün; görev, adı hatırlatır.",
    ),
    tree(
      "x4-w8-kurum-secimi",
      "Dallanmış ağaç: hangi kurum devreye girer?",
      "Üç durum okuyacaksın. Her durumda en uygun kuruluşu seç; gerekçeni açıklamayla karşılaştır.",
      [
        [
          "Düğüm 1 · Deprem sonrası barınma ve gıda yardımı gerekiyor.",
          ["UNESCO", "Kızılay", "NATO", "Dünya Ticaret Örgütü"],
          1,
          "Afet yardımı, ulusal ve uluslararası yardım kuruluşlarının görev alanıdır.",
          "Yardım mı, eğitim mi?",
        ],
        [
          "Düğüm 2 · Savaştan etkilenen bölgede okulların yeniden açılması isteniyor.",
          ["UNICEF", "Dünya Bankası", "NATO", "Uluslararası Denizcilik Örgütü"],
          0,
          "Çocuk hakları ve eğitime erişim UNICEF’in çalışma alanındadır.",
          "Çocuk ve eğitim hangi kurumun odağında?",
        ],
        [
          "Düğüm 3 · İki ülke arasındaki anlaşmazlık görüşmelerle çözülecek.",
          ["Birleşmiş Milletler", "Kızılay", "UNESCO", "Dünya Sağlık Örgütü"],
          0,
          "Devletler arası görüşme ve arabuluculuk BM’nin barış ve güvenlik görevidir.",
          "Devletler arası mı, bireyler arası mı?",
        ],
      ],
      "Görev alanını belirle: yardım, çocuk, barış, kültür, sağlık.",
    ),
  );
  add(
    9,
    fishbone(
      "x3-w9-beylikten-devlete",
      "Balık kılçığı: beylikten devlete geçişi hazırlayan nedenler",
      "Küçük bir beyliğin devlete dönüşmesini sağlayan nedenleri dört başlıkta çözümle. Her başlığa bir gelişme yaz.",
      [
        ["Siyasi nedenler", "Merkezî otorite, komşu ilişkileri, antlaşmalar…"],
        ["Askerî nedenler", "Düzenli ordu, kale ve savunma, ganimet düzeni…"],
        ["Ekonomik nedenler", "Tarım, ticaret yolu, vergi düzeni…"],
        ["Toplumsal nedenler", "Göç, yerleşim, hoşgörü politikası…"],
      ],
      "Her nedeni bir sonuçla eşleştir: “…… olduğu için …… güçlendi.”",
    ),
    timeline(
      "x4-w9-kurulus-seridi",
      "Zaman şeridi: kuruluştan fetihe",
      "Kartları dönemlere yerleştir. Yerleştirirken olayın devletin büyümesindeki işlevini düşün.",
      ["Beylik dönemi", "Devletleşme dönemi", "Fetih ve bunalım dönemi"],
      [
        "Söğüt çevresinde yerleşme",
        "Bursa’nın alınması",
        "Edirne’nin başkent olması",
        "Kosova Savaşı",
        "Ankara Savaşı",
        "İstanbul’un fethi",
      ],
      [0, 1, 1, 1, 2, 2],
      "Kartı seç, dönemi işaretle; her kart tek döneme aittir.",
      "Başkent değişiklikleri büyümeyi, savaşlar ise dönüm noktalarını gösterir.",
    ),
  );

  add(
    10,
    fishbone(
      "x3-w10-fetih-neden",
      "Balık kılçığı: bir fetih kararının nedenleri",
      "Bir fetih kararını düşün. Kararın nedenlerini dört başlıkta çözümle; her başlığa bir gerekçe yaz.",
      [
        ["Siyasi nedenler", "Otorite, meşruiyet, komşuluk ilişkileri…"],
        ["Askerî nedenler", "Savunma hattı, stratejik geçit, ordu düzeni…"],
        ["Ekonomik nedenler", "Ticaret yolu, vergi, üretim…"],
        ["Toplumsal nedenler", "Göç, yerleşim, güvenlik…"],
      ],
      "Nedenleri kararın alındığı dönemin koşullarıyla açıkla; bugünün ölçütlerini geriye taşıma.",
    ),
    concept(
      "x4-w10-politika-haritasi",
      "Kavram haritası: dört büyüme politikası",
      "Gaza, fetih, iskân ve istimalet kavramlarını kendi cümlelerinle tanımla; her birine bir uygulama örneği ekle.",
      [
        ["Gaza", "Tanım ve bir örnek"],
        ["Fetih", "Tanım ve bir örnek"],
        ["İskân", "Tanım ve bir örnek"],
        ["İstimalet", "Tanım ve bir örnek"],
      ],
      "Tanımı tek cümlede ver, örneği yer ve dönem belirterek yaz.",
    ),
  );

  add(
    11,
    timeline(
      "x3-w11-fetih-asamalari",
      "Zaman şeridi: fethin hazırlık ve sonuç aşamaları",
      "Kartları aşamalara yerleştir. Hazırlık, kuşatma ve sonuç ayrımını olayın niteliğine göre yap.",
      ["Hazırlık", "Kuşatma", "Sonuç"],
      [
        "Boğaz’a hisar yapılması",
        "Büyük topların dökülmesi",
        "Surların top ateşiyle dövülmesi",
        "Gemilerin karadan yürütülmesi",
        "Şehrin teslim alınması",
        "Şehrin başkent yapılması",
      ],
      [0, 0, 1, 1, 2, 2],
      "Kartı seç, aşamayı işaretle; her kart tek aşamaya aittir.",
      "Hazırlık kararları önceden, kuşatma hamleleri sırasında, sonuçlar alındıktan sonra olur.",
    ),
    diag(
      "x4-w11-fetih-tani",
      "Tanılayıcı test: neden, sonuç ve kanıt",
      "Üç soruyu yanıtla. Her soruda neden ile sonucu ayırmaya dikkat et.",
      [
        [
          "Fethin ardından şehrin başkent yapılması hangi başlıkta değerlendirilir?",
          ["Neden", "Sonuç", "Varsayım", "Kanıt"],
          1,
          "Başkent değişikliği fethin ardından alınan bir karardır; sonuçtur.",
          "Önce mi, sonra mı oldu?",
        ],
        [
          "Bir olayın “nedeni” sayılabilecek ifade hangisidir?",
          ["Savaşın kazanılması", "Geçidin denetiminin gerekliliği", "Antlaşmanın imzalanması", "Sınırın genişlemesi"],
          1,
          "Neden, olaydan önce var olan gereklilik veya koşuldur.",
          "Olaydan önce var olan hangisi?",
        ],
        [
          "Tarihsel bir yargıyı desteklerken en güçlü dayanak hangisidir?",
          ["Bir arkadaşın anlatımı", "Döneme ait belge ve kitabe", "İnternetteki kısa video", "Roman kahramanının sözü"],
          1,
          "Döneme ait belge ve kitabe birincil kaynaktır; yorum ve anlatım ikincildir.",
          "Birincil kaynak hangisi?",
        ],
      ],
      "Neden → olay → sonuç zincirini kur; kanıtı bu zincire yerleştir.",
    ),
  );

  add(
    12,
    fishbone(
      "x3-w12-somurge-neden",
      "Balık kılçığı: sömürgeciliği besleyen nedenler",
      "Büyük deniz seyahatlerinin ardından sömürgeciliğin yaygınlaşmasının nedenlerini dört başlıkta çözümle.",
      [
        ["Ekonomik nedenler", "Yeni pazar, ham madde, baharat yolu…"],
        ["Teknolojik nedenler", "Gemi, pusula, haritacılık…"],
        ["Siyasi nedenler", "Güç yarışı, prestij, donanma…"],
        ["Toplumsal nedenler", "Göç, yerleşim, misyon faaliyetleri…"],
      ],
      "Her başlıkta nedenin kimin çıkarına olduğunu da belirt.",
    ),
    concept(
      "x4-w12-ticaret-zinciri",
      "Kavram haritası: deniz yolları → ticaret → ekonomi",
      "Deniz yollarının değişmesinin Osmanlı ekonomisine etkisini üç düğümde açıkla; her düğümü bir öncekiyle ilişkilendir.",
      [
        ["Deniz yollarının değişmesi", "Hangi güzergâh öne çıktı?"],
        ["Ticaret ve gelirlerdeki değişim", "Hangi kalemler azaldı, hangileri arttı?"],
        ["Osmanlı’nın tepkisi", "Üretim, gümrük ya da yatırım kararı…"],
      ],
      "Zinciri nedensellikle kur: “…… olduğu için …… değişti, bu da …… sonucunu doğurdu.”",
    ),
  );

  add(
    13,
    concept(
      "x3-w13-uc-dalga",
      "Kavram haritası: değişimin üç dalgası",
      "Rönesans, Reform ve Aydınlanma’yı üç düğümde ele al. Her düğümde bir neden ve bir sonuç yaz.",
      [
        ["Rönesans", "Neden ve sonuç"],
        ["Reform", "Neden ve sonuç"],
        ["Aydınlanma", "Neden ve sonuç"],
        ["Osmanlı’ya yansıma", "Bir örnek"],
      ],
      "Neden ile sonucu ayrı cümlelerde yaz; birbirine karıştırma.",
    ),
    diag(
      "x4-w13-degisim-tani",
      "Tanılayıcı test: değişimi okuyan üç soru",
      "Üç soruyu yanıtla. Yanlış yanıtta ipucunu izle ve konu anlatımındaki ilgili bölüme dön.",
      [
        [
          "Matbaanın yaygınlaşması hangi değişimi hızlandırdı?",
          ["Bilginin daha geniş kesimlere ulaşmasını", "Tarımsal üretimin azalmasını", "Deniz ticaretinin bitmesini", "Şehirlerin küçülmesini"],
          0,
          "Matbaa, bilginin çoğaltılmasını ve yayılmasını hızlandırdı; okuryazarlık arttı.",
          "Bilgi kimlere ulaştı?",
        ],
        [
          "Reform hareketlerinin ortaya çıkışında etkili olan gelişme hangisidir?",
          ["Kilisenin uygulamalarına yönelik eleştiriler", "Sanayi üretiminin artması", "Coğrafi keşiflerin sona ermesi", "Matbaanın yasaklanması"],
          0,
          "Reform, dinî kurumun uygulamalarına yönelik eleştiriler ve metinlerin okunmasıyla gelişti.",
          "Eleştiri neye yönelikti?",
        ],
        [
          "Aydınlanma düşüncesinin siyasi etkisi hangisidir?",
          ["Yönetimde akıl ve hukukun öne çıkması", "Toprak sahipliğinin kaldırılması", "Ticaretin yasaklanması", "Orduların küçülmesi"],
          0,
          "Aydınlanma; akıl, eşitlik ve hukuk düşüncelerini yönetim tartışmalarına taşıdı.",
          "Akıl ve hukuk hangi alanı etkiler?",
        ],
      ],
      "Her soruda değişimin hangi alanda olduğunu belirle: bilgi, inanç, yönetim.",
    ),
  );

  add(
    14,
    tree(
      "x3-w14-yenilik-alani",
      "Dallanmış ağaç: yenilik hangi alana ait?",
      "Üç yenilik okuyacaksın. Her birinin ait olduğu alanı seç; gerekçeni açıklamayla karşılaştır.",
      [
        [
          "Düğüm 1 · Nizam-ı Cedid adıyla yeni bir ordunun kurulması",
          ["Askerî alan", "Eğitim alanı", "Ekonomik alan", "Kültürel alan"],
          0,
          "Yeni ordu kurulması doğrudan askerî alandaki yeniliktir; hazinesi ayrı olsa da amacı savunmadır.",
          "Yeniliğin amacı ne?",
        ],
        [
          "Düğüm 2 · İlk Türk matbaasının kurulması",
          ["Askerî alan", "Kültürel alan", "Hukuk alanı", "Tarım alanı"],
          1,
          "Matbaa, bilginin çoğaltılmasını sağlayan kültürel ve teknolojik bir yeniliktir.",
          "Bilgi nasıl çoğalır?",
        ],
        [
          "Düğüm 3 · Yeniçeri Ocağı’nın kaldırılması",
          ["Ekonomik alan", "Askerî alan", "Kültürel alan", "Sağlık alanı"],
          1,
          "Ocağın kaldırılması, ordunun yeniden düzenlenmesine yönelik askerî bir adımdır.",
          "Hangi kurum kaldırıldı?",
        ],
      ],
      "Alanı belirlerken yeniliğin hangi kurumu ve hangi sorunu hedef aldığına bak.",
    ),
    timeline(
      "x4-w14-yenilik-sirasi",
      "Zaman şeridi: yeniliklerin dönemleri",
      "Kartları dönemlere yerleştir. Yerleştirirken yeniliğin hangi padişah döneminde yapıldığını düşün.",
      ["Lale Devri", "III. Selim dönemi", "II. Mahmud dönemi"],
      [
        "Matbaanın kurulması",
        "İtfaiye ocağının oluşturulması",
        "Nizam-ı Cedid ordusu",
        "İrad-ı Cedid hazinesi",
        "Yeniçeri Ocağı’nın kaldırılması",
        "Divan yerine nazırlıkların kurulması",
      ],
      [0, 0, 1, 1, 2, 2],
      "Kartı seç, dönemi işaretle; her kart tek döneme aittir.",
      "Lale Devri’nde kültürel, III. Selim ve II. Mahmud dönemlerinde askerî-yönetimsel yenilikler öne çıkar.",
    ),
  );

  add(
    15,
    puzzle(
      "x3-w15-divan-bulmaca",
      "Bulmaca: divan ve devlet görevlileri",
      "Tanımları okuyup görevi yaz. Görevleri günümüzdeki karşılıklarıyla birlikte düşün.",
      [
        ["Padişah adına devlet işlerinin görüşüldüğü kurul", "Örn. Divan-ı Hümayun"],
        ["Divanın başkanı, padişahın vekili", "Örn. sadrazam"],
        ["Askerî ve adalet işlerini yürüten divan üyesi", "Örn. kazasker"],
        ["Mali işlerden sorumlu divan üyesi", "Örn. defterdar"],
        ["Yazışma ve tapu kayıtlarını tutan divan üyesi", "Örn. nişancı"],
        ["Din ve eğitim işlerinde en yetkili görevli", "Örn. şeyhülislam"],
      ],
      "Görev adı, işin adıyla bağlantılıdır: mal → maliye, yazı → nişan.",
    ),
    concept(
      "x4-w15-vakif-ahi",
      "Kavram haritası: vakıf ve ahi kültürü",
      "Vakıf ve ahi teşkilatını iki düğümde açıkla; üçüncü düğümde günümüzdeki karşılıklarını yaz.",
      [
        ["Vakfın toplumsal işlevi", "Hangi hizmeti sürekli hâle getirir?"],
        ["Ahi teşkilatının işlevi", "Üretim, eğitim ve denetim nasıl yapılır?"],
        ["Bugünkü karşılıkları", "Vakıf, dernek, meslek odası, kooperatif…"],
      ],
      "Her işlevi somut bir hizmetle örneklendir: su, yol, okul, aşevi, kalite denetimi.",
    ),
  );

})();
