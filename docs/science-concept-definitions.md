# Fen Bilimleri kavram tanımları — yazım ve eşleştirme standardı

Bu dosya, haftalık konu anlatımının altındaki **kavram şeridi** kartlarının nasıl yazıldığını ve
kavramın metinle nasıl eşleştirildiğini kayıt altına alır. Metinlerin kendisi
[`science-term-notes.js`](../science-term-notes.js) içindedir; bu dosya yalnızca kuralı anlatır.

## 1. Kart yapısı

Her kart **tanım + tek örnek** olmak üzere iki cümle taşır:

> **Kinetik enerji** — Kinetik enerji, hareket eden cismin sahip olduğu enerjidir; kütleyle doğru
> orantılı, hızın karesi oranında artar. Aynı hızda ilerleyen dolu bir el arabası, boş olanından çok
> daha fazla kinetik enerji taşır.

- Metin 90 karakterden kısa olamaz; tek cümlelik kart yazılmaz (test bunu zorunlu tutar).
- Tanım cümlesi kavramın adıyla başlar ve ölçü birimini/sınırını verir.
- Örnek cümlesi günlük yaşamdan, gözlenebilir ve 7. sınıf düzeyinde olmalıdır.
- Örnek **haftalar arasında ve aynı hafta içinde tekrar etmez**; 146 kartın 146'sı farklı metindir.

## 2. Yazım kuralları

- Ders kitabına, sayfaya ya da kaynağa atıf yapılmaz; metin konuyu doğrudan anlatır.
- Doğru cevap, sınav sorusu veya etkinlik yanıtı kartta verilmez.
- Sayısal değerler doğrulanmış olmalıdır: örneğin 2 kg × 9,8 N/kg × 3 m ≈ 59 J, Proxima Centauri
  4,24 ışık yılı, Güneş–galaksi merkezi ≈ 26.000 ışık yılı.
- Anatomi kartlarında organ adı ve görevi verilir; uygun olmayan ayrıntıya girilmez.
- Türkçe imla: kesme işaretiyle ayrılan özel ad (`Dünya’da`, `Ay’a`), birim kısaltmaları parantez
  içinde (`joule (J)`, `metre/saniye (m/s)`).

## 3. Eşleştirme mantığı (`science.js` → `conceptContext`)

1. **Önce sözlük:** `window.SCIENCE_TERM_NOTES[hafta][kavram]` varsa kart bu metni gösterir.
   Bugün 15 haftanın 146 kavramının tamamı sözlükte tanımlıdır; bu yol her zaman kullanılır.
2. **Sonra anlatı:** sözlükte karşılık yoksa konu anlatımı taranır. Eşleşme:
   - Türkçe harf katlaması (`ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u`, tipografik tırnaklar ve tireler),
   - **tam kelime sınırı** — böylece `iş` kavramı *değiştiren*, `kan` kavramı *kanıt* içinde eşleşmez,
   - cümlecik bölme — metin önce `.!?`, sonra `;` ve `:` üzerinden parçalanır, böylece aynı cümlede
     geçen iki kavram aynı metni paylaşmaz.
3. **Son çare:** hiçbiri bulunamazsa haftanın odak cümlesi gösterilir; test bu durumun oluşmadığını
   doğrular (odak metni hiçbir karta düşmemelidir).

## 4. Testler (`scripts/check-science.js`)

- Her haftanın her kavramı için sözlükte tanım var mı, 90 karakteri geçiyor mu, en az iki cümle mi,
  odak cümlesine eşit değil mi, Türkçe karakter içeriyor mu?
- Aynı hafta içinde iki kart aynı metni gösteriyor mu? Sözlükte şeritte olmayan fazla kavram var mı?
- Hafta 6, 7 ve 8 render edilir; kart metinleri sözlükle birebir karşılaştırılır.
- `iş` kartının “İş, uygulanan kuvvet…” ile başladığı ve “değiştiren” sözcüğünü içermediği doğrulanır.

## 5. Yeni kavram eklerken

1. `science-content.js` içindeki haftanın `terms` dizisine kavramı ekle ve kavramı konu anlatımında
   geçir (test bunu şart koşar).
2. `science-term-notes.js` içinde aynı haftaya tanım + örnek yaz. Başka haftalarda aynı örneği
   kullanma.
3. `index.html` içindeki `science-term-notes.js?v=` sürümünü artır.
4. `node scripts/check-science.js` ve `python3 scripts/check-static.py` çalıştır.
