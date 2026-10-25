#!/usr/bin/env node
/* Matematik alanı: GeoGebra yerleşimi ve statik soru görselleri denetimi.
   Ağ gerektirmez; dosyaları okuyup kuralları doğrular. */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const ggb = read('matematik-geogebra.js');
const local = read('matematik-yerel-sahne.js');
const demo = read('matematik-geogebra-demo.html');
const notices = read('THIRD-PARTY-NOTICES.md');
const analysis = read('docs/MATEMATIK-KITAP-ANALIZI.md');

// 1. Dosyalar ve dış bağımlılık sınırı
['matematik-geogebra.js', 'matematik-yerel-sahne.js', 'matematik-geogebra-demo.html'].forEach((file) => {
  assert.ok(fs.existsSync(path.join(root, file)), `${file} bulunamadı.`);
});

const externalHosts = [...`${ggb}\n${local}\n${demo}`.matchAll(/https?:\/\/([^/"'\s]+)/g)].map((match) => match[1]);
externalHosts.forEach((host) => {
  assert.ok(/geogebra\.org$/.test(host) || host === 'www.w3.org',
    `Beklenmeyen dış adres: ${host}. Matematik sahneleri yalnız GeoGebra'ya bağlanır (www.w3.org SVG ad alanıdır).`);
});
assert.ok(!/youtube\.com|youtu\.be/.test(`${ggb}\n${demo}`), 'Matematik sahnelerinde YouTube bağlantısı olmamalı.');
assert.ok(!/localhost|127\.0\.0\.1/.test(`${ggb}\n${local}\n${demo}`), 'Yerel adres kullanılmamalı.');

// 2. Yükleyici davranışı: doğrulama, yeniden deneme, yedek yol
assert.ok(/getObjectNumber/.test(ggb), 'Yükleyici nesne sayısını doğrulamalı.');
assert.ok(/RETRY_DELAYS\s*=\s*\[0,\s*300,\s*900,\s*2000\]/.test(ggb), 'Komutlar için kademeli yeniden deneme tanımlı olmalı.');
assert.ok(/'empty-construction'/.test(ggb), 'Boş kurulum ayrı bir hata olarak raporlanmalı.');
assert.ok(/onFallback/.test(ggb), 'Başarısızlıkta yedek sahne çağrılmalı.');
assert.ok(/ShowAxes\(true\)/.test(ggb) && /ShowGrid\(true\)/.test(ggb), 'Eksen ve ızgara açık olmalı.');
assert.ok(/is-loading/.test(ggb), 'Yükleme sırasında iskelet durumu işaretlenmeli.');
assert.ok(/language:\s*'tr'/.test(ggb), 'Arayüz dili Türkçe olmalı.');
assert.ok(/showToolBar:\s*false/.test(ggb) && /showAlgebraInput:\s*false/.test(ggb), 'Araç çubuğu ve cebir girişi kapalı olmalı.');

// 3. Yerel yedek sahneler
assert.ok(/window\.MATEMATIK_SAHNE\s*=\s*Object\.freeze/.test(local), 'Yerel sahne modülü dışa açılmalı.');
assert.ok(/ortadikme\(/.test(local) && /yansima\(/.test(local), 'Orta dikme ve yansıma sahneleri bulunmalı.');
assert.ok(/role:\s*'slider'/.test(local), 'Sürüklenebilir noktalar erişilebilir olmalı.');
assert.ok(/keydown/.test(local), 'Klavye ile taşıma desteklenmeli.');
assert.ok(/yansima\(host/.test(local) && /xmin: -5/.test(local), 'Yerel yansıma sahnesi de görüntüyü pencere içinde tutmalı.');
assert.ok(/stroke-dasharray': '4 4'/.test(local), 'Yerel sahnede köşe–görüntü bağlantı çizgileri olmalı.');
assert.ok(/local-scene/.test(local), 'Yerel sahne kendi sınıfıyla işaretlenmeli.');

// 4. Statik soru görseli: orta dikme çizilmemeli, P eşit uzaklıkta, Q değil
const figure = demo.slice(demo.indexOf('<figure>'), demo.indexOf('</figure>'));
assert.ok(figure.length > 200, 'Statik soru görseli bulunamadı.');
assert.ok(!/stroke-dasharray/.test(figure), 'Soru görselinde orta dikme (kesikli çizgi) olmamalı; cevabı verir.');

const point = (label) => {
  const match = figure.match(new RegExp(`<circle cx="(\\d+)" cy="(\\d+)"[^>]*\\/><text[^>]*>${label}</text>`));
  assert.ok(match, `${label} noktası bulunamadı.`);
  return { x: Number(match[1]), y: Number(match[2]) };
};
const A = point('A');
const B = point('B');
const P = point('P');
const Q = point('Q');
const distance = (u, v) => Math.hypot(u.x - v.x, u.y - v.y);
assert.ok(Math.abs(distance(P, A) - distance(P, B)) < 0.5, 'P, A ve B noktalarına eşit uzaklıkta olmalı.');
assert.ok(Math.abs(distance(Q, A) - distance(Q, B)) > 5, 'Q eşit uzaklıkta olmamalı; yoksa soru ayırt etmez.');
assert.ok(Math.hypot(P.x - (A.x + B.x) / 2, P.y - (A.y + B.y) / 2) > 10, 'P orta noktaya denk gelmemeli; cevabı ele verir.');

// 5. Yerleşim ve düğme davranışı
assert.ok(!/\.ggb-stage\s+svg/.test(demo), 'GeoGebra SVG içeriğine boyut kuralı uygulanmamalı; çizim alanını eziyor.');
assert.ok(/\.local-scene\s+svg/.test(demo), 'Boyut kuralı yerel sahneye kapsanmalı.');
assert.ok(/height:clamp\(420px,68vh,720px\)/.test(demo), 'Sahne kutusu ekran yüksekliğine göre ölçeklenmeli.');
assert.ok(/\.ggb-stage\{width:100%;height:100%\}/.test(demo), 'Applet kapsayıcısı kutuyu tam doldurmalı.');
assert.ok(/height:\s*520/.test(demo), 'Applet yedek yüksekliği 520 px olmalı.');
assert.ok(/ggb-host:fullscreen/.test(demo), 'Tam ekran durumu için stil tanımlı olmalı.');
assert.ok(/data-fullscreen="bisectorHost"/.test(demo) && /data-fullscreen="reflectHost"/.test(demo), 'Her sahnede tam ekran düğmesi olmalı.');
assert.ok(/requestFullscreen/.test(demo), 'Tam ekran düğmesi tarayıcı API\'sini kullanmalı.');
assert.ok(/fitToStage/.test(ggb) && /api\.setSize/.test(ggb), 'Applet kutu ölçüsüne oturtulmalı (setSize).');
assert.ok(/watchSize/.test(ggb) && /ResizeObserver/.test(ggb), 'Ekran döndürme/yeniden boyutlandırma izlenmeli.');
assert.ok(/BRANDING_SELECTOR/.test(ggb) && /hideBranding/.test(ggb), 'Appletin alt şeridi kaldırılmalı.');
assert.ok(/data-branding-hidden/.test(ggb), 'Kaldırılan şerit işaretlenmeli.');
assert.ok(/canvas/.test(ggb) && /graphicsView/.test(ggb), 'Şerit temizliği çizim alanına dokunmamalı.');
assert.ok(/showFullscreenButton:\s*true/.test(ggb), 'GeoGebra tam ekran düğmesi açık olmalı.');
assert.ok(/allowStyleBar:\s*false/.test(ggb), 'Stil çubuğu kapalı olmalı.');
const credits = (demo.match(/Geogebra® — geogebra\.org/g) || []).length;
assert.ok(credits >= 2, 'Alt şerit kaldırıldığı için her sahnede atıf satırı bulunmalı.');
assert.ok(/d = PerpendicularBisector\(A, B\)/.test(demo), 'Orta dikme sahne kurulurken oluşturulmalı.');
assert.ok(/m = Line\(\(0, -6\), \(0, 6\)\)/.test(demo), 'Yansıma sahnesinde ayna doğrusu açıkça çizilmeli.');
assert.ok(/p2 = Reflect\(p, m\)/.test(demo), 'Yansıma açık ayna doğrusuna göre kurulmalı.');
assert.ok(!/api\.evalCommand\(`\$\{scene\.hidden\}/.test(demo), 'Düğme yeni nesne üretmemeli; yalnız görünürlük değiştirmeli.');
assert.ok(/setVisible\(scene\.hidden, true\)/.test(demo), 'Düğme görünürlüğü açmalı.');
assert.ok(/bounds:\s*\[-5, 8, -2, 7\]/.test(demo), 'Yansıma penceresi görüntüyü içine alacak kadar geniş olmalı.');

// 6. Sahne tekrarı ve soru metni tutarlılığı
assert.ok(/A ve B noktalarına eşit uzaklıkta olan nokta/.test(demo), 'Soru metni kazanımla uyumlu olmalı.');
assert.ok(/Yerel sahne/.test(demo) || /yerel sahne/.test(demo), 'Yedek sahne kullanıcıya duyurulmalı.');

// 7. Lisans ve atıf
assert.ok(/GeoGebra/i.test(notices), 'THIRD-PARTY-NOTICES.md GeoGebra atfını içermeli.');
assert.ok(/geogebra\.org/.test(notices), 'Atıf geogebra.org bağlantısı vermeli.');
assert.ok(/GeoGebra/.test(analysis), 'Analiz dokümanı GeoGebra sözleşmesini anlatmalı.');

console.log('Matematik denetimi geçti: GeoGebra yükleyicisi doğrulanıyor (nesne sayısı + yeniden deneme), sahne açılamazsa yerel SVG devreye giriyor, statik soru görselinde orta dikme yok ve P–Q ayrımı doğru.');
