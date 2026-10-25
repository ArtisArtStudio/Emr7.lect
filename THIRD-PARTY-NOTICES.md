# Third-party notices

## Phaser 3.90.0

`assets/phaser.min.js` is distributed with Phaser 3.90.0 from <https://github.com/phaserjs/phaser> under the MIT License.

The MIT License (MIT)

Copyright (c) 2024 Richard Davey, Phaser Studio Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## GeoGebra (matematik alanı) — artık kullanılmıyor

Matematik sahnelerinin ilk sürümü GeoGebra web uygulamalarını
<https://www.geogebra.org/apps/deployggb.js> adresinden yüklüyordu. Sahne gerçek
cihazlarda yalnız eksen gösterdiği için bu yol tamamen kaldırıldı; sitenin hiçbir
sayfası GeoGebra servisine bağlanmıyor ve depoda GeoGebra kodu bulunmuyor.

GeoGebra® GeoGebra GmbH’nin tescilli markasıdır. Geçmiş sürümlerde yalnız ücretsiz,
ticari olmayan kullanım koşullarıyla (<https://www.geogebra.org/license>) kullanıldı;
bu atıf tarihsel kayıt için korunmuştur.

Yerine, bu depoda yazılmış bağımsız bir SVG sahne motoru (`matematik-sahne.js`) ve
şekil motoru (`matematik-figure.js`) kullanılıyor; ikisi de üçüncü taraf kod
içermez ve çevrimdışı çalışır.
