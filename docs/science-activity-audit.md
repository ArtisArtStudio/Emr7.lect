# Fen Bilimleri Etkinlik Denetimi · 1. Dönem (1.–15. hafta)

Bu denetim, 15 haftalık Fen Bilimleri etkinlik setini yapı, dil ve zorluk dengesi açısından tarar. Amaç yalnızca "etkinlik var mı" sorusunu değil, "aynı etkinlik öğrenciye tekrar tekrar aynı biçimde mi sunuluyor" sorusunu yanıtlamaktır.

## 1. Yapısal sonuçlar

| Ölçüt | Beklenen | Sonuç |
| --- | --- | --- |
| Haftalık etkinlik sayısı | 10–15 | 15 / 15 hafta |
| Bölüm düzeni | 4 + 4 + 6 + görsel sorular | 15 / 15 hafta |
| Yedi etkileşim türü | match, fill, tf, sort, order, choice, text | 15 / 15 hafta |
| Görsel soru | Haftada 1–2 | 15 haftada 1 (15 görsel soru, 30 alt soru) |
| Yazma görevi | Haftada 2+ | 12 haftada 2, ilk 2 haftada 3 |
| Yazma uzunluğu | 180–260 karakter | 180–260 aralığında |
| Ölçüt sayısı (yazma) | ≥ 3 | 3 / 3 her yazma görevinde |
| Toplam etkinlik | — | **225** (210 konu etkinliği + 15 görsel soru) |

Doğrulama betiği: `node scripts/check-science.js` (yapı, tür dağılımı, cevap anahtarı sızması, görsel anahtarları ve 225 toplam sayısı).

## 2. Bu turda düzeltilen bulgular

| # | Bulgu | Etki | Yapılan düzeltme |
| --- | --- | --- | --- |
| 1 | Çoktan seçmeli 90 sorunun 60'ında doğru seçenek **hep ilk sırada** | Öğrenci içeriği okumadan "A" diyerek yüksek başarı elde edebilirdi | Seçenek sıraları kimlik tabanlı tohumla karıştırıldı; doğru seçenek dağılımı 12/21/29/28 oldu |
| 2 | 50 etkinlik başlığı haftalar arasında birebir tekrar ediyordu ("Altı kavramı tanımıyla eşleştir" 16 kez) | Haftalık listede ilerleme hissi zayıflıyordu | Her başlık konuya özel hâle getirildi (ör. "Kan bağışı kavramlarını eşleştir"); tekrar eden başlık sayısı 0 |
| 3 | Aynı soru kökü iki farklı etkinlikte geçiyordu ("Nefronun görevi nedir?") | Görsel soru, çoktan seçmeli etkinliğin tekrarı gibi okunuyordu | Görsel soru kökü görselin kanıtına bağlandı ("Görseldeki sistemde kanı süzme işini yapan organ hangisidir?") |
| 4 | Görsel sorular için ayrı bir tür yoktu | Görsel, konu anlatımında süs olarak kalıyordu | `visual` türü eklendi: illüstrasyon + etiket okuma + iki soru, yerel kontrol |

## 3. Doğrulanan kalite ölçütleri

- **Cevap anahtarı sızması yok:** Soru köklerinde doğru seçeneğin metni geçmiyor (`0` bulgu). Eşleştirme, sıralama ve sınıflandırmada doğru yanıt ekranda gösterilmiyor; geri bildirim yalnızca durum + ipucu veriyor.
- **Boşluk doldurma:** Her boşluğun kendi cevap listesi var, aynı cevap iki boşlukta kullanılmıyor, input'larda ipucu/placeholder yok.
- **Eşleştirme:** Her kavramın tam bir karşılığı var; kullanılmayan tek çeldirici tanım bilinçli olarak bırakıldı.
- **Sınıflandırma:** Her kategoride en az 2 kart var; kartlar iki gruba dengeli dağılıyor.
- **Doğru–yanlış:** 90 yargının 47'si doğru, 43'ü yanlış; hiçbir etkinlikte tek yönlü yığılma yok.
- **Görseller:** 15 görsel sorunun tamamı konu anlatımındaki doğrulanmış illüstrasyonlardan seçildi; dosya ve responsive varyantları mevcut (`0` eksik), anahtarlar `CONCEPT_IMAGES` ile aynı.
- **Dil:** Etkinlik metinlerinde kitap, sayfa numarası veya ders kitabı göndermesi yok.

## 4. Zorluk dengesi

Her hafta aynı bilişsel sırayla ilerliyor:

1. **Tanıma** — kavram–tanım eşleştirme, boşluk doldurma
2. **Ayırt etme** — doğru–yanlış, iki gruba sınıflandırma
3. **Uygulama** — çoktan seçmeli hesap/yorum soruları, sıralama
4. **Üretme** — kısa metin yazma (koçluklu)
5. **Okuma + yorum** — görsel soru (etiket okuma, görselden çıkarım)

Bu sıra haftalar arasında sabit olduğu için öğrenci her hafta aynı çalışma ritmini biliyor; içerik ve örnekler haftaya özel.

## 5. Açık kalan işler

- Haftalık görsel soru sayısı 1. İkinci bir görsel eklenirse haftalık yük 16'ya çıkacağı için, ikinci görsel ancak bir etkinlik başka haftaya taşınırsa eklenebilir.
- Yazma görevlerinin değerlendirmesi Groq anahtarına bağlı; anahtar yoksa yerel uzunluk kontrolü devreye giriyor.
- 2. dönem etkinlik setleri henüz yazılmadı.
