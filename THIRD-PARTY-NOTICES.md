# Third-party notices

## Phaser 3.90.0

`assets/phaser.min.js` is distributed with Phaser 3.90.0 from <https://github.com/phaserjs/phaser> under the MIT License.

The MIT License (MIT)

Copyright (c) 2024 Richard Davey, Phaser Studio Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## GeoGebra (matematik alanı) — yalnız üç boyutlu cisimler

Matematik alanındaki üç boyutlu beş sahne (prizma, hacim, birim küp, üç görünüm, açınım)
GeoGebra web uygulamasıyla açılır. Applet, GeoGebra'nın resmî yükleyicisiyle
<https://www.geogebra.org/apps/deployggb.js> adresinden **yalnız o sahne ekranda
göründüğünde** yüklenir; sayfa açılışında dış istek yapılmaz. Bu depoda yazılmış bağımsız
SVG motoru (`matematik-sahne.js`, `matematik-figure.js`) silinmedi: ağ yoksa, CDN
engelliyse ya da nesneler kurulamazsa **yedek** olarak aynı sahneyi çizer; o motorlar
üçüncü taraf kod içermez ve çevrimdışı çalışır.

- **Kapsam:** Bu site ücretsiz bir aile çalışma alanıdır; kullanım **ticari değildir**
  (oğul ve birkaç arkadaşı). GeoGebra'nın ücretsiz, ticari olmayan kullanım koşulları
  (<https://www.geogebra.org/license>) bu kapsam içindedir.
- **Atıf:** Her GeoGebra sahnesinin altında “GeoGebra® — geogebra.org · ticari olmayan
  kullanım, atıf ile.” satırı görünür.
- **Yedek:** GeoGebra yüklenemezse (çevrimdışı, ağ engeli, okul filtresi) ya da nesneleri
  oluşturamazsa aynı sahne yerel SVG ile çizilir ve durum satırında sebep yazılır.
  Kullanıcı sahne içindeki düğmeyle GeoGebra'yı kapatıp yerel çizime geçebilir; tercih
  tarayıcıda saklanır.
- **Tam ekran yok:** Applet gömülü kutuda açılır (`showFullscreenButton:false`), araç
  çubuğu, menü, cebir girişi ve stil çubuğu kapalıdır.

GeoGebra® GeoGebra GmbH’nin tescilli markasıdır.
