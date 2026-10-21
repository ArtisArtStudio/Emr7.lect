/*
 * Fen Bilimleri kavram sözlüğü.
 *
 * Her haftanın kavram şeridindeki her kart, burada o kavrama ayrılmış tanımı ve
 * kendine özgü bir örneği gösterir. Amaç, konu anlatımında aynı cümlede geçen iki
 * kavramın aynı metni paylaşmasını ve cümle içinde rastgele eşleşen kelimelerin
 * ("iş" ↔ "değiştiren") yanlış karta bağlanmasını önlemektir.
 *
 * Kural: tanım + örnek. Örnekler haftalar arasında ve aynı hafta içinde
 * tekrarlanmaz; her örnek 7. sınıf düzeyinde, günlük yaşamdan ve ölçülebilir olmalıdır.
 */
(() => {
  'use strict';

  const notes = {
    1: {
      'uzay araştırması': 'Uzay araştırması, gök cisimlerini ve uzay ortamını merak sorusu, gözlem, ölçüm ve kanıt sırasıyla inceleyen bilimsel çalışmadır. Bir göktaşının yörüngesini aylarca teleskopla izleyip kaydetmek böyle bir çalışmadır.',
      'gözlem': 'Gözlem, bir olayın duyu organları ya da ölçüm aletleriyle doğrudan kaydedilmesidir; yorum katmaz. Görüntüde kıyı çizgisinin eski yerinden kaymış olması bir gözlemdir.',
      'veri': 'Veri, gözlem ve ölçümlerin sayı, görüntü ya da kayıt biçimindeki hâlidir. Bir uydunun her gün kaydettiği yüzey sıcaklığı değerleri bir veri dizisi oluşturur.',
      'kanıt': 'Kanıt, bir açıklamayı desteklemek için kullanılan güvenilir veridir. Aynı gölün beş yıl arayla çekilen görüntüleri, alanının küçüldüğü açıklamasını destekleyen kanıttır.',
      'yapay uydu': 'Yapay uydu, bir gök cisminin çevresinde belirli yörüngede görev yapmak üzere insan eliyle üretilip uzaya gönderilen araçtır. İMECE görüntü toplar, Türksat 6A sinyal iletir; ikisi de yapay uydudur.',
      'haberleşme': 'Haberleşme, bilginin bir kaynaktan alıcıya iletilmesidir; uydular bu iletimi kıtalar arası uzaklığa taşır. Dağların ardındaki bir köye televizyon yayınının ulaşması uydu üzerinden haberleşmeyle sağlanır.',
      'gözlem uydusu': 'Gözlem uydusu, yeryüzünden görüntü ve ölçüm toplayarak tarım, orman, afet ve haritalama çalışmalarına veri sağlar. Sel sonrası hasar tespiti Göktürk görüntüleriyle yapılır.'
    },
    2: {
      'uzay sondası': 'Uzay sondası, içinde insan bulunmayan, uzak gök cisimlerine gönderilip verisini Dünya’ya ileten robottur. Mars yüzeyinde kaya örneği toplayan araçlar bu tür bir sondadır.',
      'uzay istasyonu': 'Uzay istasyonu, astronotların aylarca yaşayıp deney yapabildiği, Dünya çevresinde yörüngede dönen büyük laboratuvardır. Uluslararası Uzay İstasyonu’nda mikro yer çekiminde bitki yetiştirme deneyleri yapılır.',
      'roket': 'Roket, yakıtını yakıp gazı geriye püskürterek ilerleyen ve uzay aracını yörüngeye taşıyan araçtır. Fırlatma anında roketin kütlesinin büyük bölümü yakıttır.',
      'teleskop': 'Teleskop, gök cisimlerinden gelen ışığı toplayıp odaklayarak görüntüyü büyüten optik araçtır; gücü açıklığına bağlıdır. Basit bir teleskopla Jüpiter’in dört büyük uydusu ayırt edilebilir.',
      'gözlemevi': 'Gözlemevi, teleskopların yerleştirildiği; yüksek, kuru, karanlık ve bulutsuz yerlere kurulan gözlem binasıdır. TÜBİTAK Ulusal Gözlemevi, Antalya Saklıkent’te yaklaşık 2500 metre yüksekliktedir.',
      'atmosfer': 'Atmosfer, bir gök cismini çevreleyen gaz tabakasıdır; Dünya’da ışığı dağıttığı için gök cisimlerinin görüntüsünü bulanıklaştırır. Bu yüzden yıldızlar Yer’den bakıldığında titreşiyor gibi görünür.',
      'ışık kirliliği': 'Işık kirliliği, gereksiz ya da yanlış yönlendirilmiş yapay ışığın gökyüzünü aydınlatıp gözlemi zorlaştırmasıdır. Bahçe duvarı yerine gökyüzünü aydınlatan bir projektör bu kirliliği artırır.'
    },
    3: {
      'uydu verisi': 'Uydu verisi, uydunun algılayıcılarıyla topladığı görüntü ve ölçümlerdir. Aynı tarlanın iki ayrı haftadaki uydu verisi karşılaştırılarak sulama ihtiyacı belirlenir.',
      'görüntüleme': 'Görüntüleme, bir bölgenin ya da organın içini görünür hâle getiren yöntemlerin ortak adıdır; MR, tomografi ve ultrason bu amaçla kullanılır. Dizdeki bağ zedelenmesinin yerini MR görüntülemesiyle görmek mümkündür.',
      'iletişim': 'İletişim, taraflar arasında bilgi alışverişidir; uydular sinyali alıp güçlendirerek uzak noktalar arasında bu alışverişi sağlar. Kırsal bir okulun uzaktan ders alabilmesi uydu iletişimiyle mümkün olur.',
      'teknoloji aktarımı': 'Teknoloji aktarımı, uzay araştırmalarında geliştirilen bilgi ve malzemenin günlük kullanıma geçmesidir. Isı yalıtımlı battaniyeler ve hafızalı köpük bu aktarımın bilinen örnekleridir.',
      'uzay kirliliği': 'Uzay kirliliği, işlevini yitirmiş uydu, roket kademesi ve kırıntıların yörüngede birikmesidir. Bir çarpışma sonrası dağılan binlerce parça bu birikimi hızla artırır.',
      'yörünge': 'Yörünge, bir cismin başka bir cisim çevresinde izlediği düzenli yoldur. Alçak yörüngedeki uydu yeryüzüne yakın olduğu için daha ayrıntılı görüntü alır ama Dünya çevresini daha hızlı dolanır.',
      'çarpışma riski': 'Çarpışma riski, yörüngedeki cisimlerin saniyede birkaç kilometre hızla birbirine çarpma olasılığıdır. Fındık büyüklüğündeki bir parça bile bu hızda bir uydunun panelini delecek enerjiye sahiptir.',
      'görev sonu planı': 'Görev sonu planı, bir uzay aracının işi bittiğinde nereye gideceğinin önceden tasarlanmasıdır. Yakıtı bitmek üzere olan uydunun daha alçak yörüngeye indirilip atmosferde yakılması bu planın örneğidir.'
    },
    4: {
      'ışık kirliliği': 'Işık kirliliği, yukarı yönelen yapay ışığın atmosferde saçılarak gökyüzünün doğal karanlığını bozmasıdır. Şehir merkezinde çıplak gözle sayılan yıldız sayısı, aynı gecede kırsalda sayılanın çok altındadır.',
      'yapay ışık': 'Yapay ışık, insanların ürettiği aydınlatma kaynaklarından çıkan ışıktır; doğru yönlendirilmediğinde gökyüzü gözlemini bozar. Sokak lambasının ışığını yola değil yukarıya vermesi bu sorunun tipik nedenidir.',
      'gökyüzü gözlemi': 'Gökyüzü gözlemi, gök cisimlerini çıplak gözle ya da araçla izleyip kayıt almaktır; karanlık, açık ve ışıktan uzak bir yer gerektirir. Ay’ın evrelerini her akşam aynı saatte çizerek izlemek basit bir gökyüzü gözlemidir.',
      'aydınlatma': 'Aydınlatma, bir yeri görünür kılmak için ışık kullanmaktır; aşağı yönlü, başlıklı ve zaman ayarlı lambalar gökyüzünü korur. Apartman merdiveninde sensörlü lamba kullanmak hem enerji tasarrufu hem de doğru aydınlatmadır.',
      'bulutsu': 'Bulutsu, gaz ve tozdan oluşan geniş buluttur; yıldızların doğduğu ya da öldükten sonra geride bıraktığı maddedir. Orion Bulutsusu, içinde yeni yıldızların oluştuğu bilinen bir gaz-toz bulutudur.',
      'kütle çekimi': 'Kütle çekimi, kütlesi olan cisimlerin birbirini çekmesidir; bulutsudaki yoğun bölgeleri çökerten kuvvet de budur. Bir yıldızın çekirdeği yakıtını tükettiğinde kütle çekimi içe doğru baskın gelir.',
      'önyıldız': 'Önyıldız, çöken bulutsu maddesinin merkezinde ısınmaya başlamış ama henüz kendi ışığını üretmeyen genç toptur. Önyıldızın çevresinde kalan disk, gezegenlerin doğduğu hammaddeyi taşır.',
      'yıldız oluşumu': 'Yıldız oluşumu, bulutsunun kütle çekimiyle çökmesi, merkezin ısınması ve önyıldızdan yıldıza geçiş sürecidir. Aynı bulutsudan doğan yıldızlar farklı kütlelerde olabilir; kütle, yıldızın sonunu belirler.',
      'kırmızı dev': 'Kırmızı dev, yakıtı azalan küçük kütleli bir yıldızın dış katmanlarının genişleyip soğumasıyla oluşan büyük ve kızıl evredir. Güneş’in milyarlarca yıl sonra bu evreye geçeceği öngörülür.',
      'beyaz cüce': 'Beyaz cüce, kırmızı devin dış katmanlarını atmasından sonra kalan, Dünya boyutunda ama çok yoğun sıcak çekirdektir. Bir beyaz cüceden alınan çay kaşığı kadar madde tonlarca ağırlıkta olur.',
      'süpernova': 'Süpernova, büyük kütleli bir yıldızın çekirdeği çökerken şiddetle patlamasıdır; maddenin büyük bölümü uzaya dağılır. Patlamada dağılan madde, sonraki yıldızların ve gezegenlerin yapısına katılır.',
      'nötron yıldızı': 'Nötron yıldızı, süpernova sonrası geriye kalan aşırı yoğun çekirdektir; kütlesi Güneş’e yakın olsa da çapı bir şehir kadar olabilir. Hızlı dönen nötron yıldızları düzenli aralıklarla radyo dalgası yayar.',
      'kara delik': 'Kara delik, çekiminin ışığın bile kaçamayacağı kadar güçlü olduğu bölgedir; süpernova sonrası yeterince büyük kütle kalırsa oluşur. Kara deliğin kendisi görünmez; varlığı ancak çevresindeki maddenin hareketinden anlaşılır.'
    },
    5: {
      'yıldız': 'Yıldız, kendi ışığını üreten çok sıcak gazdan oluşan gök cismidir; rengi yüzey sıcaklığını gösterir. Mavi-beyaz bir yıldızın yüzeyi kırmızı bir yıldızdan belirgin biçimde daha sıcaktır.',
      'takımyıldız': 'Takımyıldız, gökyüzünde belirli bir örüntü oluşturan yıldız topluluğudur; bu yıldızlar gerçekte birbirinin komşusu değildir. Büyük Ayı’nın kepçe biçimi bu örüntülerden biridir.',
      'ışık yılı': 'Işık yılı, ışığın bir yılda aldığı yoldur ve yaklaşık 9,5 trilyon kilometreye karşılık gelir; bir uzaklık birimidir. Güneş’e en yakın yıldız Proxima Centauri 4,24 ışık yılı uzaktadır.',
      'gözlem': 'Gözlem, bir gök cisminin parlaklık, renk ve konum gibi doğrudan kaydedilebilen özelliklerini ölçmektir. Aynı yıldızın parlaklığını birkaç gece üst üste not etmek bu özelliklerin izlenmesini sağlar.',
      'gök cismi': 'Gök cismi, uzayda bulunan gezegen, yıldız, doğal uydu ve kuyruklu yıldız gibi doğal cisimlerin ortak adıdır. Ay bir gök cismidir; yörüngedeki yapay uydu ise insan yapımıdır.',
      'galaksi': 'Galaksi, milyarlarca yıldız, gaz, toz ve kara deliğin kütle çekimiyle bir arada tuttuğu dev sistemdir. Samanyolu da bir galaksidir ve Güneş bu galaksinin içinde yer alır.',
      'Samanyolu': 'Samanyolu, Güneş’in de içinde bulunduğu sarmal kollu galaksidir; Güneş merkezinden yaklaşık 26.000 ışık yılı uzaktadır. Karanlık bir gecede gökyüzünü boydan boya kesen süt görünümü, bu galaksinin diskinin içinden bakışımızdır.',
      'evren': 'Evren, bütün galaksileri, yıldızları, gaz-toz bulutlarını ve boşluğu kapsayan bütünlüktür; uzay bunun yalnızca bir parçasıdır. Ölçek gezegenden yıldıza, galaksiye ve evrene doğru büyür.',
      'uzay teknolojisi': 'Uzay teknolojisi, uzaya ulaşmak ve orada çalışmak için geliştirilen roket, uydu ve teleskop gibi araç ve yöntemlerin bütünüdür. Bu teknolojilerin bir bölümü sonradan günlük yaşama aktarılır.',
      'yıldız yaşam döngüsü': 'Yıldız yaşam döngüsü, bulutsudan doğan yıldızın olgunlaşıp kütlesine göre farklı biçimde sona ermesine kadar geçen evrelerdir. Küçük kütleli yıldız beyaz cüceye, büyük kütleli yıldız süpernovaya varır.',
      'kanıt': 'Kanıt, bir açıklamayı destekleyen ölçüm ve kayıtlardır. Bir yıldızın tayfındaki çizgiler, yüzeyinde hangi elementlerin bulunduğunu gösteren kanıttır.'
    },
    6: {
      'kuvvet': 'Kuvvet, bir cismin hareketini, yönünü ya da biçimini değiştiren itme veya çekmedir; birimi newtondur (N). Ağır alışveriş arabasını tek başına itemeyen birinin arkadaşından yardım istemesi, uygulanan kuvvetin büyüklüğünü artırır.',
      'yer değiştirme': 'Yer değiştirme, cismin ilk konumundan son konumuna doğru ölçülen uzaklık ve yöndür; alınan yoldan farklıdır. Oval pistte bir tur atan koşucu çok yol alır ama yer değiştirmesi sıfırdır.',
      'fiziksel iş': 'Fiziksel iş, kuvvetin cismi kendi doğrultusunda yer değiştirmesiyle yapılır; kuvvet uygulanıp yol alınmıyorsa iş sıfırdır. Kucağında çanta taşıyarak düz yolda yürüyen biri, çantaya yukarı yönlü kuvvet uygular ama bu kuvvet yatay yola dik olduğu için çanta üzerinde iş yapmaz.',
      'doğrultu': 'Doğrultu, bir kuvvetin etki ettiği düz çizginin yönüdür; aynı büyüklükteki iki kuvvet farklı doğrultuda uygulanırsa sonuçları farklı olur. Bir kutuyu yatayda itmek onu kaydırırken, aynı büyüklükteki düşey kuvvet yalnızca yere daha çok bastırır.',
      'kuvvet yönü': 'Kuvvet yönü, kuvvetin hangi tarafa doğru etki ettiğidir; yön değişince hareketin yönü de değişir. Topa sağdan vuran oyuncu onu sola gönderir; aynı vuruş gücüyle soldan vurulduğunda top ters yöne gider.',
      'yer değiştirme yönü': 'Yer değiştirme yönü, cismin ilk konumundan son konumuna çizilen doğrunun yönüdür; iş hesaplanırken kuvvetin bu yönle örtüşmesi gerekir. Halatı kendine doğru çekerek kızağı getiren çocukta kuvvet ile yer değiştirme aynı yöndedir.',
      'iş': 'İş, uygulanan kuvvet ile cismin kuvvet doğrultusunda aldığı yolun çarpımıdır; birimi joule’dür (J). Market arabasını 3 metre itmek iş yaparken, duvarı itip yerinden oynatamamak iş sayılmaz.',
      'karşılaştırma': 'Karşılaştırma, iki durumu aynı ölçüte göre yan yana değerlendirmektir; ölçüt aynı değilse sonuç yanıltıcı olur. Aynı çuvalın 1 metre yerine 3 metre yükseğe çıkarılmasında işin üç kat olması, ölçütün yol olduğunu gösterir.'
    },
    7: {
      'enerji': 'Enerji, bir sistemin iş yapabilme yeteneğidir; joule (J) ile ölçülür, biçim değiştirebilir ama yoktan var edilemez. Dolu bir pil, hiçbir cihaz çalışmazken bile içinde enerji depolar.',
      'kinetik enerji': 'Kinetik enerji, hareket eden cismin sahip olduğu enerjidir; kütleyle doğru orantılı, hızın karesi oranında artar. Aynı hızda ilerleyen dolu bir el arabası, boş olanından çok daha fazla kinetik enerji taşır.',
      'kütle': 'Kütle, bir cisimdeki madde miktarıdır; kilogram (kg) ile ölçülür ve bulunduğu yere göre değişmez. Terazide 2 kg gelen demir blok Ay’a götürüldüğünde yine 2 kg’dır; değişen yalnızca ağırlığıdır.',
      'hız': 'Hız, birim zamanda alınan yoldur; metre/saniye (m/s) ile ifade edilir ve yönü de önemlidir. Hızı iki katına çıkan bir aracın kinetik enerjisi dört katına çıkar; bu yüzden yüksek hızda fren mesafesi belirgin biçimde uzar.',
      'potansiyel enerji': 'Potansiyel enerji, cismin konumu ya da biçimi nedeniyle depoladığı enerjidir; serbest kaldığında kinetik enerjiye dönüşebilir. Vinçle üçüncü kata kaldırılan bir malzeme, indirilirken bu depolanmış enerjiyi açığa çıkarır.',
      'çekim': 'Kütle çekimi, kütlesi olan cisimlerin birbirini çekmesidir; Dünya’da bir cismi aşağı çeken kuvvet olarak hissedilir ve büyüklüğü kilogram başına yaklaşık 9,8 newtondur. Uzaya gönderilen bir aracın yakıtının büyük bölümü bu çekimi yenmek için harcanır.',
      'yükseklik': 'Yükseklik, seçilen bir referans noktaya göre düşey uzaklıktır; çekim potansiyel enerjisi yükseklikle doğru orantılı artar. Aynı sırt çantasını birinci kata çıkarmak, üçüncü kata çıkarmaktan daha az enerji gerektirir.',
      'esneklik': 'Esneklik, bir cismin kuvvet kaldırıldığında eski biçimine dönme özelliğidir; gerilen ya da sıkıştırılan esnek cisimler potansiyel enerji depolar. Sonuna kadar gerilmiş bir sapan, bırakıldığı anda bu enerjiyi taşa hareket olarak aktarır.'
    },
    8: {
      'enerji dönüşümü': 'Enerji dönüşümü, enerjinin bir biçimden başka bir biçime geçmesidir. Bir bisikletli pedal çevirdiğinde kaslarındaki kimyasal enerji hareket enerjisine, yokuş çıkarken bu enerji çekim potansiyel enerjisine dönüşür; inişte ise potansiyel enerji yeniden kinetik enerjiye geçer.',
      'kinetik enerji': 'Kinetik enerji, hareket hâlindeki cismin enerjisidir; dönüşümler boyunca sürekli el değiştirir. Kaykay parkındaki rampanın en alt noktasında kaykaycının kinetik enerjisi en yüksektir.',
      'çekim potansiyel enerjisi': 'Çekim potansiyel enerjisi, cismin yerden yüksekliği nedeniyle depoladığı enerjidir; kütle, yer çekimi ivmesi ve yüksekliğin çarpımıyla hesaplanır. 2 kg’lık bir top 3 metre yükseklikte yaklaşık 59 J enerji depolar.',
      'salıncak': 'Salıncak, enerjinin sürekli el değiştirdiği bir düzenektir: en yüksek noktada potansiyel, en alt noktada kinetik enerji en büyüktür. Salınım her seferinde biraz alçalır; kaybolan mekanik enerji hava direnci ve sürtünmeyle ısıya dönüşür.',
      'enerjinin korunumu': 'Enerjinin korunumu, enerjinin yoktan var olmadığı ve yok olmadığı, yalnızca biçim değiştirdiği ilkesidir. Bir sarkaçta azalan mekanik enerji, ortama verilen ısı ve ses enerjisi kadardır.',
      'sürtünme': 'Sürtünme, iki yüzey arasında harekete zıt yönde etki eden kuvvettir; mekanik enerjinin bir bölümünü ısıya dönüştürür. Kışın buzlu yolda ayakkabıya takılan çivi, sürtünmeyi artırarak kaymayı önler.',
      'ısı enerjisi': 'Isı enerjisi, sıcaklık farkı nedeniyle bir cisimden diğerine geçen enerjidir; sürtünme onu sürekli üretir. Fren yapan bisikletin diskine dokunulamayacak kadar ısınması bu dönüşümün sonucudur.',
      'ses enerjisi': 'Ses enerjisi, titreşen bir kaynağın ortama aktardığı enerjidir. Çekicle vurulan metalin çıkardığı ses, çarpma enerjisinin bir bölümünün havaya ses olarak yayılmasıdır.',
      'iş': 'İş, enerji aktarımının ölçüsüdür; bir cisme iş yapıldığında ona enerji aktarılır. Yokuş yukarı itilen bir el arabasına iş yapılır ve bu enerji çekim potansiyel enerjisi olarak depolanır.',
      'potansiyel enerji': 'Potansiyel enerji, depolanmış enerjinin genel adıdır; çekim ve esneklik olmak üzere iki biçimde bulunur. Gerilmiş bir yay ile yüksekte duran bir top aynı adı taşısa da enerjiyi farklı biçimlerde depolar.'
    },
    9: {
      'sindirim': 'Sindirim, besinlerin vücudun kullanabileceği kadar küçük moleküllere parçalanmasıdır; ağızda başlar. Bir lokma ekmeğin nişastası ağızda, proteini midede, yağı ince bağırsakta parçalanır.',
      'besin': 'Besin, vücudun enerji, yapı ve onarım için kullandığı maddedir; karbonhidrat, protein, yağ, vitamin, mineral ve su olarak gruplanır. Kahvaltıdaki yumurta protein, ekmek ise karbonhidrat sağlar.',
      'sindirim kanalı': 'Sindirim kanalı, ağızdan anüse kadar besinin geçtiği boru biçimli yoldur; karaciğer ve pankreas bu yola salgı veren yardımcı organlardır. Kanal boyunca besin sırayla fiziksel ve kimyasal işleme uğrar.',
      'organ': 'Organ, birden çok dokunun belirli bir görevi yapmak üzere bir araya gelmesiyle oluşan yapıdır. Mide, karaciğer ve böbrek birer organdır; her biri farklı dokulardan kurulmuştur.',
      'yutak': 'Yutak, ağız ile yemek borusu arasındaki kaslı geçiş yoludur; lokmayı yemek borusuna yönlendirir. Yutkunma sırasında soluk borusunun kapağı kapanır, böylece lokma soluk yoluna kaçmaz.',
      'yemek borusu': 'Yemek borusu, yutağı mideye bağlayan ve kasılma hareketleriyle besini ileten borudur; sindirim burada yapılmaz. Baş aşağı durulsa bile bu kasılmalar lokmayı mideye doğru ilerletir.',
      'mide': 'Mide, besini kasılmalarla karıştıran ve asitli ortamında protein sindirimini başlatan organdır. Mide duvarındaki kalın mukus tabakası, asidin kendi dokusunu eritmesini engeller.',
      'ince bağırsak': 'İnce bağırsak, sindirimin tamamlandığı ve besinlerin büyük bölümünün emildiği organdır; iç yüzeyi villus denilen kıvrımlarla genişletilmiştir. Yaklaşık 6 metre uzunluğundaki bu organ karın boşluğunda kıvrılarak yerleşir.',
      'kalın bağırsak': 'Kalın bağırsak, ince bağırsaktan kalan artıktan su ve tuzu emerek dışkıyı oluşturan organdır. Yeterli su içilmediğinde buradaki emilim artar ve dışkı sertleşir.'
    },
    10: {
      'fiziksel sindirim': 'Fiziksel sindirim, besini küçük parçalara ayırarak yüzey alanını artırır; kimyasal yapıyı değiştirmez. Dişlerle çiğnemek ve mide kaslarının çalkalaması bu türdendir.',
      'kimyasal sindirim': 'Kimyasal sindirim, enzimlerin besin moleküllerindeki bağları kopararak onları yapı taşlarına ayırmasıdır. Nişastanın glikoza, proteinin amino asitlere ayrılması kimyasal sindirimdir.',
      'enzim': 'Enzim, sindirimi hızlandıran ama kendisi değişmeden çıkan salgı maddesidir; her enzim belirli bir besin grubuna etki eder. Tükürükteki amilaz nişastayı parçalar ama proteine etki etmez.',
      'emilim': 'Emilim, sindirilmiş besinlerin bağırsak yüzeyinden kana ya da lenfe geçmesidir. İnce bağırsaktaki villuslar yüzey alanını artırarak emilimi hızlandırır.',
      'dengeli beslenme': 'Dengeli beslenme, enerji ve yapı gereksinimini karşılayacak besin gruplarının yeterli ve çeşitli alınmasıdır. Her öğünde sebze, tahıl ve protein bulundurmak bu dengenin günlük örneğidir.',
      'hijyen': 'Hijyen, hastalıklardan korunmak için temizlik kurallarına uymaktır; sindirim sağlığının ilk adımıdır. Yemekten önce elleri sabunla yıkamak bu kuralların en basitidir.',
      'sindirim sağlığı': 'Sindirim sağlığı, sindirim organlarının işlevini bozacak etkenlerden uzak durmaktır; düzenli öğün, lifli besin ve yeterli su koruyucudur. Çok yağlı ve acele yenen öğünler mide yanmasına yol açabilir.',
      'alışkanlık': 'Alışkanlık, tekrarlandıkça otomatikleşen davranıştır; sağlık davranışları küçük günlük tekrarlarla yerleşir. Her sabah kahvaltı etmeyi sürdüren bir öğrenci için bu artık bir alışkanlık olur.'
    },
    11: {
      'kalp': 'Kalp, kasılıp gevşeyerek kanı damarlara pompalayan kaslı organdır ve dört odacıktan oluşur. Sol karıncığın kas tabakası, kanı tüm vücuda ittiği için daha kalındır.',
      'kan': 'Kan, hücrelere besin ve oksijen taşıyan, atıkları uzaklaştıran sıvı dokudur; plazma, alyuvar, akyuvar ve trombosit içerir. Bir yetişkinin vücudunda yaklaşık 5 litre kan bulunur.',
      'atardamar': 'Atardamar, kanı kalpten vücuda ya da akciğerlere taşıyan damardır; duvarı kalın ve esnektir. Bileğe iki parmakla bastırınca nabız olarak hissedilen damar atardamardır.',
      'toplardamar': 'Toplardamar, kanı vücuttan kalbe geri getiren damardır; duvarı daha ince, içinde kapakçıklar bulunur. Uzun süre ayakta duran kişide kanın bacakta birikmesini bu kapakçıklar ve kas hareketleri önler.',
      'kılcal damar': 'Kılcal damar, atardamar ile toplardamar arasında uzanan, duvarı tek kat hücreli en ince damardır; madde alışverişi burada olur. Parmak ucunun iğneyle hafifçe kanatılabilmesi kılcalların bu inceliğindendir.',
      'küçük kan dolaşımı': 'Küçük kan dolaşımı, kanın kalbin sağ karıncığından akciğerlere gidip oksijenlenerek sol kulakçığa dönmesidir. Bu döngüde kan akciğerde oksijen alır, karbondioksit verir.',
      'büyük kan dolaşımı': 'Büyük kan dolaşımı, temiz kanın sol karıncıktan tüm vücuda dağılıp kirli kan olarak sağ kulakçığa dönmesidir. Kılcal damarlarda kana verilen oksijen dokulara geçer, dokulardan alınan karbondioksit kana aktarılır.',
      'akciğer': 'Akciğer, göğüs boşluğunda yer alan ve kanın oksijenlenmesini sağlayan süngerimsi organdır; gaz alışverişi alveollerde olur. Alveollerin toplam yüzeyi yaklaşık yarım tenis kortu büyüklüğündedir.',
      'kan akışı': 'Kan akışı, kanın damarlar içinde kalpten vücuda ve geriye doğru sürekli hareketidir. Egzersiz sırasında kaslar daha çok oksijen istediği için kalbin atış hızı artar.'
    },
    12: {
      'kan bağışı': 'Kan bağışı, sağlıklı bir kişiden tedavi amacıyla kan alınmasıdır; kan laboratuvarda üretilemediği için tek kaynak budur. Bir ameliyatta gereken kan, önceden yapılan bağışlardan sağlanır.',
      'gönüllülük': 'Gönüllülük, karşılık beklemeden isteyerek yapılan yardımdır. Kan bağış merkezine kendi isteğiyle gidip bağış yapan kişi bunu gönüllü olarak yapar.',
      'toplumsal dayanışma': 'Toplumsal dayanışma, bireylerin ortak bir ihtiyaç için birbirini desteklemesidir. Afet sonrası kan stokunun bağışlarla tamamlanması bu dayanışmanın örneğidir.',
      'kan bileşenleri': 'Kan bileşenleri plazma, alyuvar, akyuvar ve trombositlerdir; her biri ayrı işlev görür. Bağışlanan kan ayrıştırılarak trombosit bir hastaya, plazma başka bir hastaya verilebilir.',
      'dolaşım sağlığı': 'Dolaşım sağlığı, kalp ve damarların işlevini korumak için risk etkenlerinden uzak durmaktır; hareketsizlik, aşırı tuz ve sigara riski artırır. Her gün düzenli yürüyüş yapmak bu sağlığı destekler.',
      'hareket': 'Hareket, kasları çalıştıran her türlü etkinliktir; kalbin atışını hızlandırıp damar sağlığını korur. Asansör yerine merdiven kullanmak günlük harekete bir örnektir.',
      'dinlenme': 'Dinlenme, vücudun harcadığı enerjiyi geri kazandığı, kalp atışının yavaşladığı dönemdir; uyku bunun en temel biçimidir. Düzenli uyuyan bir öğrencinin ders sırasında dikkati daha uzun süre toplanır.',
      'güvenilir kaynak': 'Güvenilir kaynak, bilgiyi uzman ya da kurum denetiminden geçmiş biçimde sunan kaynaktır. Sağlık bilgisi için sağlık kurumlarının yayınlarını, sosyal medyadaki kulaktan dolma önerilere tercih etmek gerekir.'
    },
    13: {
      'soluk borusu': 'Soluk borusu, gırtlaktan sonra havayı akciğerlere taşıyan, kıkırdak halkalarla desteklenmiş borudur. Kıkırdak halkalar borunun soluk alırken kapanmasını engeller.',
      'bronş': 'Bronş, soluk borusunun akciğerlerde ikiye ayrılarak oluşturduğu dallanan hava yoludur; uçları alveollerde sonlanır. Astımda bronşların daralması soluk almayı zorlaştırır.',
      'akciğer': 'Akciğer, gaz alışverişinin yapıldığı süngerimsi organdır; milyonlarca alveol yüzey alanını genişletir. Sigara bu alveollerin esnekliğini bozarak alışverişi güçleştirir.',
      'gaz alışverişi': 'Gaz alışverişi, oksijenin alveolden kana, karbondioksitin kandan alveole geçmesidir; difüzyonla gerçekleşir. Alveol duvarının tek kat hücreli inceliği bu geçişi kolaylaştırır.',
      'diyafram': 'Diyafram, göğüs boşluğunun altında bulunan, kasılıp düzleşerek akciğerlere hava çeken kubbeli kastır. Kasıldığında göğüs hacmi artar, basınç düşer ve hava içeri girer.',
      'soluk alma': 'Soluk alma, diyafram ve kaburgalar arası kasların kasılmasıyla göğüs hacminin artıp havanın akciğerlere dolmasıdır; aktif bir süreçtir. Merdiven çıkarken soluğun hızlanması bu kasların daha çok çalışmasındandır.',
      'soluk verme': 'Soluk verme, kasların gevşemesiyle göğüs hacminin küçülüp havanın dışarı çıkmasıdır; büyük ölçüde pasif gerçekleşir. Konuşurken dışarı verilen hava akışı sesin oluşmasını sağlar.',
      'oksijen': 'Oksijen, hücrelerin enerji üretmek için kullandığı gazdır; kanda büyük ölçüde alyuvarlardaki hemoglobinle taşınır. Yüksek rakımda hava inceldiği için aynı miktar oksijeni almak zorlaşır.',
      'karbondioksit': 'Karbondioksit, hücrelerde enerji üretimi sırasında oluşan ve solukla dışarı atılan atık gazdır. Kalabalık ve havalandırılmayan bir odada uyku hâlinin artması bu gazın birikmesiyle ilişkilidir.',
      'solunum sağlığı': 'Solunum sağlığı, soluk yollarını ve akciğerleri koruyucu davranışların bütünüdür; sigaradan uzak durmak, temiz hava ve düzenli spor bunun parçasıdır. Kışın kapalı alanları sık havalandırmak da bu sağlığı korur.',
      'havalandırma': 'Havalandırma, kapalı bir ortamdaki havayı tazelemektir; biriken karbondioksiti ve mikropları azaltır. Ders arasında pencereyi birkaç dakika açmak sınıf havasını yeniler.',
      'temiz hava': 'Temiz hava, zararlı gaz ve toz oranı düşük, oksijeni bol havadır; solunum sağlığının temel koşuludur. Yoğun trafikte yürümek yerine sakin bir parkta yürümek daha temiz hava solumayı sağlar.',
      'zararlı madde': 'Zararlı madde, solunduğunda ya da yutulduğunda vücuda zarar veren maddedir; tütün dumanındaki katran ve karbonmonoksit bunlara örnektir. Bu maddeler yalnızca içen kişiye değil, dumanı soluyan herkese ulaşır.'
    },
    14: {
      'bağımlılık': 'Bağımlılık, bir maddenin kullanımının denetiminin yitirilmesi ve olumsuz sonuçlara karşın sürdürülmesidir. Nikotin bağımlılığı, bırakmak isteyen kişide yoksunluk belirtileriyle kendini gösterir.',
      'solunum sağlığı': 'Solunum sağlığı, akciğerleri bağımlılık yapıcı maddelerin ve kirli havanın zararından korumaktır. Sigara içmeyen birinin dumanlı ortamda uzun süre kalması da akciğerlerini etkiler.',
      'dolaşım sağlığı': 'Dolaşım sağlığı, kalp ve damarların zarar görmeden çalışmasıdır; nikotin damarları daraltıp kan basıncını yükselterek bu sağlığı bozar. Sigarayı bırakan kişide damar işlevi kısa sürede belirgin biçimde iyileşir.',
      'destek': 'Destek, bağımlılıktan kurtulmak isteyen kişiye aile, okul ve sağlık kurumunun verdiği yardımdır. Bir arkadaşının sigarayı bırakma kararını yargılamadan dinlemek bu desteğin örneğidir.',
      'böbrek': 'Böbrek, kanı süzerek üre ve fazla iyonları idrarla uzaklaştıran fasulye biçimli organdır; karın boşluğunun arka duvarında iki tanedir. Böbrekler ayrıca kan basıncını ve sıvı dengesini düzenler.',
      'üreter': 'Üreter, böbrekte oluşan idrarı idrar kesesine taşıyan ince kanaldır; her böbrekten bir tane çıkar. İdrar bu kanalda kasılmalarla ilerler, yer çekimiyle akmak zorunda değildir.',
      'idrar kesesi': 'İdrar kesesi, idrarı bir süre depolayan, genişleyebilen kastan yapılmış torbadır. Doldukça genişlemesi, sık sık tuvalete gitmeden idrarın birikmesini sağlar.',
      'üretra': 'Üretra, idrarı idrar kesesinden vücut dışına taşıyan son kanaldır. İdrar kesesi boşalırken kapak kası gevşer ve idrar bu kanaldan atılır.',
      'süzülme': 'Süzülme, kanın böbrekteki nefronlarda basınçla küçük moleküllerine ayrıldığı aşamadır; hücreler ve büyük proteinler kanda kalır. Süzülen sıvıdan su ve yararlı maddeler daha sonra geri emilir.',
      'idrar': 'İdrar, süzülme ve geri emilimden sonra geriye kalan su, üre ve fazla iyonlardan oluşan atık sıvıdır. Rengi ve miktarı gün içinde alınan sıvıya göre değişir.',
      'atık madde': 'Atık madde, hücrelerdeki yaşamsal tepkimeler sonunda oluşan ve atılması gereken maddedir; üre, karbondioksit ve fazla su bunlara örnektir. Bu maddelerin birikmesi hücrelerin çalışmasını bozar.',
      'iç denge': 'İç denge, vücudun sıcaklık, su ve madde düzeylerini geri bildirimle sabit tutmasıdır. Sıcak havada terlemeyle su kaybeden kişide susamanın artması bu dengeyi koruyan bir tepkidir.'
    },
    15: {
      'böbrek sağlığı': 'Böbrek sağlığı, süzme işlevini korumak için yeterli su içmek, tuzu sınırlamak ve ilaçları doktor önerisiyle kullanmaktır. Yetersiz su alımı idrarı yoğunlaştırarak taş oluşumu riskini artırır.',
      'hijyen': 'Hijyen, beden ve çevre temizliğiyle hastalıklardan korunmadır; boşaltım yollarının sağlığı için de temel koşuldur. İç çamaşırını her gün değiştirmek bu kuralların günlük uygulamasıdır.',
      'dengeli beslenme': 'Dengeli beslenme, dört sistemin birlikte sağlıklı çalışması için gereken besin çeşitliliğidir. Aşırı tuz, kan basıncını yükselterek böbrekleri ve kalbi birlikte yorar.',
      'sağlık kaynağı': 'Sağlık kaynağı, sağlıkla ilgili bilginin güvenilir biçimde alındığı yer ya da kişidir; hekim, sağlık kurumu yayınları ve resmî rehberler bunlara örnektir. İnternetteki bir ürün reklamını sağlık kaynağı saymamak gerekir.',
      'sistem': 'Sistem, birlikte çalışan organların ortak bir görevi yerine getirmek üzere oluşturduğu bütündür. Sindirim, dolaşım, solunum ve boşaltım sistemleri birbirinin çıktısını kullanır.',
      'madde alışverişi': 'Madde alışverişi, kan ile hücreler arasında besin, oksijen ve atıkların karşılıklı geçişidir; kılcal damarlarda gerçekleşir. Çalışan bir kasta oksijen kandan dokuya geçerken karbondioksit dokudan kana aktarılır.',
      'hücre': 'Hücre, canlılığın en küçük yapı ve görev birimidir; besin ve oksijen alıp atık verir. Bir kas kasıldığında çok sayıda kas hücresi birlikte çalıştığı için oksijen ihtiyacı artar.',
      'atık madde': 'Atık madde, hücrelerde oluşup vücuttan uzaklaştırılması gereken maddedir; böbrekler üreyi, akciğerler karbondioksiti atar. Böbrekleri yetersiz çalışan birinde ürenin kanda birikmesi dolaşım ve sinir sistemini birlikte etkiler.',
      'bilim tarihi': 'Bilim tarihi, bilimsel bilginin hangi gözlem, ölçüm ve tartışmalarla bugünkü hâline geldiğini izleyen alandır. Kanın sürekli dolaştığının ancak ölçüm ve deneylerle gösterilmesi bu sürecin örneğidir.',
      'kanıt': 'Kanıt, bir iddiayı destekleyen ölçüm, gözlem ya da deney sonucudur; yıl boyunca üç ünitede aynı yolla üretilir. Bir modelin öngördüğü sonucun ölçümle sınanması, o modelin kanıtla desteklenmesi demektir.',
      'gözlem': 'Gözlem, duyu ya da ölçüm aletiyle doğrudan kaydedilen bilgidir; sistemlerin işleyişini anlamanın ilk adımıdır. Nabız ve soluk sayısını saymak vücudun çalışmasına ilişkin bir gözlemdir.',
      'bilimsel model': 'Bilimsel model, karmaşık bir gerçeği anlamak için kurulan, sınanabilir ve gerektiğinde düzeltilebilen temsildir. Sindirim sisteminin şeması gerçeğin kendisi değil, işleyişi anlatan bir modeldir.',
      'model': 'Model, gerçeği belli ölçüde temsil eden yapı ya da benzetmedir; her modelin bir sınırı vardır. Balonla akciğerin şişmesini göstermek işe yarar ama gerçek akciğer dokusunu temsil etmez.',
      'açıklama': 'Açıklama, bir gözlemi neden-sonuç ilişkisiyle anlatan, kanıtla desteklenen ifadedir. Kalp atışının egzersizde hızlanması, kasların daha çok oksijen istemesiyle açıklanır.',
      'öz değerlendirme': 'Öz değerlendirme, kişinin kendi öğrenmesini ölçütlere göre gözden geçirmesidir. Yıl boyunca tutulan hata listesini inceleyip en çok zorlanılan konuyu belirlemek bunun örneğidir.'
    }
  };

  window.SCIENCE_TERM_NOTES = notes;
})();
