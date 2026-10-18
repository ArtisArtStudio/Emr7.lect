(() => {
  const W = 960, H = 540;
  const C = { ink: 0x14253d, blue: 0x5ba8ff, mint: 0x8be0c1, gold: 0xffd477, coral: 0xff7f79, white: 0xf7fbff };

  class StoryArcade extends Phaser.Scene {
    constructor(opts) { super({ key: 'StoryArcade' }); this.opts = opts; this.state = { ...(opts.saved || {}) }; }
    preload() {
      if (this.opts.image) this.load.image('storyBackdrop', this.opts.image);
    }
    create() {
      this.cameras.main.setBackgroundColor('#14253d');
      if (this.textures.exists('storyBackdrop')) this.add.image(W / 2, H / 2, 'storyBackdrop').setDisplaySize(W, H).setAlpha(.23);
      this.add.rectangle(W / 2, H / 2, W, H, C.ink, .72);
      this.add.rectangle(W / 2, 90, W - 48, 1, C.white, .18);
      this.add.text(34, 24, this.opts.game.title.toLocaleUpperCase('tr-TR'), { fontFamily: 'system-ui, sans-serif', fontSize: '25px', fontStyle: 'bold', color: '#ffffff' });
      this.add.text(36, 59, this.opts.game.intro, { fontFamily: 'system-ui, sans-serif', fontSize: '14px', color: '#d8e6f7', wordWrap: { width: 850 } });
      this.status = this.add.text(36, 502, '', { fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: '#cbdcf2', wordWrap: { width: 600 } });
      this.scoreText = this.add.text(920, 30, '', { fontFamily: 'system-ui, sans-serif', fontSize: '16px', fontStyle: 'bold', color: '#a6f0d0' }).setOrigin(1, 0);
      this.installDragHandlers();
      this.draw();
    }
    installDragHandlers() {
      if (this._dragStart) this.input.off('dragstart', this._dragStart);
      if (this._dragMove) this.input.off('drag', this._dragMove);
      if (this._dragEnd) this.input.off('dragend', this._dragEnd);
      this._dragStart = (_pointer, obj) => { if (obj && obj.getData && obj.getData('dragId') !== undefined) { obj.setDepth(20); obj.setStrokeStyle(3, C.gold, 1); } };
      this._dragMove = (_pointer, obj, x, y) => {
        if (obj === this.flightBird) { obj.x = Phaser.Math.Clamp(x, 70, 880); obj.y = Phaser.Math.Clamp(y, 150, 390); this.state.y = obj.y; return; }
        if (obj && obj.getData && obj.getData('dragId') !== undefined) { obj.setPosition(x, y); obj.getData('iconObj')?.setPosition(x - obj.getData('cardW') / 2 + 14, y); obj.getData('labelObj')?.setPosition(x - obj.getData('cardW') / 2 + 48, y); }
      };
      this._dragEnd = (_pointer, obj, dropped) => {
        if (!obj) return;
        if (obj === this.flightBird) { this.state.y = obj.y; this.save(); return; }
        const handler = obj.getData && obj.getData('dropHandler');
        if (handler) handler(obj.getData('dragId'), obj.x, obj.y, obj, dropped);
        if (obj.active) { obj.setStrokeStyle(2, 0x8cb5e5, .85); obj.getData('iconObj')?.setPosition(obj.x - obj.getData('cardW') / 2 + 14, obj.y); obj.getData('labelObj')?.setPosition(obj.x - obj.getData('cardW') / 2 + 48, obj.y); }
      };
      this.input.on('dragstart', this._dragStart); this.input.on('drag', this._dragMove); this.input.on('dragend', this._dragEnd);
    }
    refresh() { this.children.removeAll(true); this.create(); }
    save() { this.opts.onSave({ ...this.state }); }
    say(text, color = '#e7efff') { this.status.setText(text).setColor(color); }
    panel(x, y, w, h, fill = 0x243a57, alpha = .94, stroke = 0x536f92) {
      const p = this.add.rectangle(x, y, w, h, fill, alpha).setStrokeStyle(1, stroke, .85); p.setDepth(1); return p;
    }
    button(x, y, w, h, text, callback, color = 0x3478d4) {
      const r = this.add.rectangle(x, y, w, h, color, 1).setStrokeStyle(1, 0xffffff, .35).setDepth(8).setInteractive({ useHandCursor: true });
      const t = this.add.text(x, y, text, { fontFamily: 'system-ui, sans-serif', fontSize: '16px', fontStyle: 'bold', color: '#fff', align: 'center', wordWrap: { width: w - 20 } }).setOrigin(.5).setDepth(9);
      r.on('pointerover', () => r.setFillStyle(0x4b91eb)); r.on('pointerout', () => r.setFillStyle(color)); r.on('pointerdown', callback);
      return { rect: r, text: t };
    }
    makeCard(x, y, w, h, label, id, onDrop, icon = '✦', tint = 0x263f60) {
      const r = this.add.rectangle(x, y, w, h, tint, .98).setStrokeStyle(2, 0x8cb5e5, .85).setDepth(5).setInteractive({ useHandCursor: true });
      const i = this.add.text(x - w / 2 + 14, y, icon, { fontSize: '25px' }).setOrigin(0, .5).setDepth(6);
      const t = this.add.text(x - w / 2 + 48, y, label, { fontFamily: 'system-ui, sans-serif', fontSize: '14px', fontStyle: 'bold', color: '#fff', wordWrap: { width: w - 61 } }).setOrigin(0, .5).setDepth(6);
      r.setData('dragId', id); r.setData('startX', x); r.setData('startY', y); r.setData('dropHandler', onDrop); r.setData('iconObj', i); r.setData('labelObj', t); r.setData('cardW', w);
      this.input.setDraggable(r);
      return r;
    }
    dimCard(card, alpha) { card.setAlpha(alpha); card.getData('iconObj')?.setAlpha(alpha); card.getData('labelObj')?.setAlpha(alpha); }
    heading(text, x = W / 2, y = 116) { this.add.text(x, y, text, { fontFamily: 'system-ui, sans-serif', fontSize: '17px', fontStyle: 'bold', color: '#ffffff' }).setOrigin(.5); }
    draw() {
      const type = this.opts.game.type;
      if (type === 'flight') this.drawFlight();
      else if (type === 'garden') this.drawGarden();
      else if (type === 'sky') this.drawSky();
      else if (type === 'journey') this.drawJourney();
      else if (type === 'assembly') this.drawAssembly();
      else if (type === 'connect') this.drawConnect();
      else if (type === 'conversation' || type === 'crossroads') this.drawBranch();
    }
    drawFlight() {
      const g = this.opts.game, gate = this.state.gate || 0;
      const sky = this.add.graphics().setDepth(2); sky.fillStyle(0x8acdf0, .16); sky.fillEllipse(480, 305, 880, 240); sky.fillStyle(0x2e8db4, .38); sky.fillRect(40, 410, 880, 44);
      for (let i = 0; i < 7; i++) this.add.text(110 + i * 120, 170 + (i % 2) * 46, '☁', { fontSize: '34px', color: '#e7f4ff' }).setAlpha(.55);
      this.add.text(70, 426, 'DENİZ', { fontSize: '12px', color: '#d9f6ff', fontStyle: 'bold' });
      this.flightBird = this.add.text(112, Number(this.state.y || 290), '🕊️', { fontSize: '46px' }).setOrigin(.5).setDepth(10).setInteractive({ draggable: true, useHandCursor: true }); this.input.setDraggable(this.flightBird);
      const gateX = [330, 535, 740], gateY = [235, 335, 205];
      for (let i = gate; i < 3; i++) { this.add.circle(gateX[i], gateY[i], 42, 0x8be0c1, .08).setStrokeStyle(5, i === gate ? C.gold : C.mint, .9).setDepth(4); this.add.circle(gateX[i], gateY[i], 6, C.gold, .9).setDepth(5); }
      this.flightX = 112; this.flightGateX = gateX[gate] || gateX[2]; this.flightGateY = gateY[gate] || gateY[2]; this.flightActive = false;
      if (gate < g.gates.length) {
        const data = g.gates[gate]; this.panel(480, 134, 730, 58, 0x193453, .93); this.add.text(480, 134, `UÇUŞ ${gate + 1}/3 · ${data.name}   |   ${data.cue}`, { fontSize: '15px', color: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: 690 } }).setOrigin(.5);
        this.flightBtn = this.button(820, 466, 210, 50, gate === 0 && !this.state.started ? 'UÇUŞA BAŞLA' : 'SONRAKİ GEÇİŞ', () => { this.flightActive = true; this.state.started = true; this.say('Kuşu sürükleyerek halkadan geçir; hedefe yaklaş.'); this.save(); }, 0x238a76);
        this.say('Kuşu dikey yönde sürükle. Hedef halkaya yaklaşınca uçuşu başlat.');
      } else this.finishMessage(`Uçuş tamamlandı · ${this.state.hits || 0}/3 hedef`);
      this.scoreText.setText(`HEDEF ${Math.min(gate + 1, 3)}/3  ·  ✓ ${this.state.hits || 0}`);
    }
    update(_time, delta) {
      if (this.opts.game.type !== 'flight' || !this.flightActive || !this.flightBird) return;
      this.flightBird.x += delta * .14;
      if (this.flightBird.x >= this.flightGateX) {
        this.flightActive = false; const hit = Math.abs(this.flightBird.y - this.flightGateY) <= 55;
        if (hit) this.state.hits = (this.state.hits || 0) + 1;
        this.state.gate = (this.state.gate || 0) + 1;
        if (this.state.gate >= this.opts.game.gates.length) this.state.result = this.state.hits || 0;
        this.state.y = this.flightBird.y; this.save();
        if (Number.isInteger(this.state.result)) { this.say(`Uçuş bitti! ${this.state.result}/3 kapıdan geçtin.`, '#a6f0d0'); this.finishMessage(`Uçuş tamamlandı · ${this.state.result}/3 hedef`); }
        else { this.say(hit ? 'Halkadan geçtin! Kuşu yeni hedefe göre ayarla.' : 'Halkayı kaçırdın. Yeni kapıda yüksekliği yeniden ayarla.', hit ? '#a6f0d0' : '#ffd477'); this.refresh(); }
      }
    }
    drawGarden() {
      const g = this.opts.game, slots = this.state.slots || Array(4).fill(null), bedY = 260;
      if (Number.isInteger(this.state.result)) { this.heading('BAHÇE GÖREVİ TAMAMLANDI', W / 2, 180); this.finishMessage(`Bahçeyi tamamladın · ${this.state.result}/4 aşama`); this.scoreText.setText(`${this.state.result}/4`); return; }
      this.heading('BAHÇEYİ ÇİÇEKTEN MEYVEYE BÜYÜT', W / 2, 128);
      const soil = this.add.graphics().setDepth(2); soil.fillStyle(0x385b48, .55); soil.fillRoundedRect(48, 195, 864, 132, 24);
      const labels = ['İlkbahar', 'Gelişim', 'Emek', 'Olgunluk'];
      for (let i = 0; i < 4; i++) { const x = 155 + i * 215; this.add.circle(x, bedY, 42, 0x162d48, .92).setStrokeStyle(3, C.mint, .9).setDepth(3); this.add.text(x, bedY - 8, labels[i], { fontSize: '13px', color: '#e6fff1', fontStyle: 'bold' }).setOrigin(.5).setDepth(4); if (Number.isInteger(slots[i])) this.add.text(x, bedY + 35, g.icons[slots[i]], { fontSize: '31px' }).setOrigin(.5).setDepth(7); }
      const icons = ['🌸', '🌿', '🪴', '🍑'];
      this.heading('AŞAMA KARTLARINI SÜRÜKLE', W / 2, 354);
      const positions = [[170, 432], [380, 432], [590, 432], [800, 432]];
      g.display.forEach((id, idx) => { const x = positions[idx][0], y = positions[idx][1], card = this.makeCard(x, y, 190, 64, g.items[id], id, (item, dx, dy, obj) => { if (Number.isInteger(this.state.result)) { obj.setPosition(obj.getData('startX'), obj.getData('startY')); return; } const slot = Phaser.Math.Clamp(Math.round((dx - 155) / 215), 0, 3); if (dy > 175 && dy < 342) { const a = this.state.slots || Array(4).fill(null); for (let j = 0; j < 4; j++) if (a[j] === item) a[j] = null; a[slot] = item; this.state.slots = a; this.state.positions = null; this.save(); this.refresh(); } else { obj.setPosition(obj.getData('startX'), obj.getData('startY')); } }, icons[id]); if (Number.isInteger(slots.indexOf(id))) { const where = slots.indexOf(id); if (where >= 0) this.dimCard(card, .6); } });
      this.button(804, 508, 200, 44, 'BAHÇEYİ DEĞERLENDİR', () => this.checkOrder(g.solution, 4, 'Bahçe tamamlandı'), 0x477d58);
      this.scoreText.setText(`${slots.filter(Number.isInteger).length}/4 AŞAMA`);
      this.say('Kartı bırakınca uygun aşamaya yerleşir. Yanlış yeri değiştirmek için kartı yeniden sürükle.');
    }
    drawJourney() {
      const g = this.opts.game, slots = this.state.slots || Array(4).fill(null);
      if (Number.isInteger(this.state.result)) { this.heading('YOLCULUK TAMAMLANDI', W / 2, 180); this.finishMessage(`Hatice Nine’nin yolculuğu · ${this.state.result}/4 durak`); this.scoreText.setText(`${this.state.result}/4`); return; }
      this.heading('HATİCE NİNE’NİN YOL HARİTASI', W / 2, 132);
      const map = this.add.graphics().setDepth(2); map.lineStyle(8, 0x9ec8aa, .65); map.beginPath(); map.moveTo(120, 260); map.lineTo(360, 223); map.lineTo(600, 274); map.lineTo(840, 230); map.strokePath();
      const stopX = [120, 360, 600, 840];
      g.stops.forEach((lab, i) => { this.add.circle(stopX[i], 250 + (i % 2 ? -27 : 18), 31, 0x213e58, 1).setStrokeStyle(4, i === 3 ? C.coral : C.gold, 1).setDepth(3); this.add.text(stopX[i], 250 + (i % 2 ? -27 : 18), `${i + 1}`, { fontSize: '18px', color: '#fff', fontStyle: 'bold' }).setOrigin(.5).setDepth(4); this.add.text(stopX[i], 300 + (i % 2 ? -27 : 18), lab, { fontSize: '12px', color: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: 165 } }).setOrigin(.5).setDepth(4); if (Number.isInteger(slots[i])) this.add.text(stopX[i], 350, '✓', { fontSize: '20px', color: '#a6f0d0' }).setOrigin(.5).setDepth(5); });
      this.heading('OLAY KARTLARINI YOL DURAKLARINA TAŞI', W / 2, 394);
      const xs = [170, 380, 590, 800]; g.display.forEach((id, j) => { const card = this.makeCard(xs[j], 463, 190, 65, g.events[id], id, (item, dx, dy, obj) => { if (Number.isInteger(this.state.result)) { obj.setPosition(obj.getData('startX'), obj.getData('startY')); return; } if (dy < 350 && dy > 180) { const slot = Phaser.Math.Clamp(Math.round((dx - 120) / 240), 0, 3), a = this.state.slots || Array(4).fill(null); for (let k = 0; k < 4; k++) if (a[k] === item) a[k] = null; a[slot] = item; this.state.slots = a; this.save(); this.refresh(); } else obj.setPosition(obj.getData('startX'), obj.getData('startY')); }, '📍'); if (slots.includes(id)) this.dimCard(card, .58); });
      this.button(817, 520, 205, 38, 'ROTAYI TAMAMLA', () => this.checkOrder(g.solution, 4, 'Yolculuk tamamlandı'), 0x8a5d49); this.scoreText.setText(`${slots.filter(Number.isInteger).length}/4 DURAK`);
    }
    drawSky() {
      const stars = this.opts.game.stars, missed = this.state.missed || [], done = Number.isInteger(this.state.result);
      this.heading('HARİTADA OLMAYAN CİSMİ BUL', W / 2, 132);
      const sky = this.add.graphics().setDepth(2); sky.fillStyle(0x101d45, .72); sky.fillRoundedRect(55, 158, 850, 305, 24);
      for (let i = 0; i < 90; i++) { const x = 68 + ((i * 137) % 820), y = 169 + ((i * 79) % 274); this.add.circle(x, y, i % 9 === 0 ? 2 : 1, 0xffffff, .3 + (i % 4) * .12).setDepth(3); }
      stars.forEach((o, i) => { const x = 85 + o.x * 8.5, y = 165 + o.y * 3.2; const glow = this.add.circle(x, y, o.comet ? 21 : 14, o.comet ? 0xffd477 : 0xcbdcff, o.comet ? .25 : .08).setDepth(4); const core = this.add.text(x, y, o.comet ? '☄' : '✦', { fontSize: o.comet ? '28px' : '20px', color: o.comet ? '#ffdf8a' : '#ecf3ff' }).setOrigin(.5).setDepth(5).setInteractive({ useHandCursor: true }); core.on('pointerdown', () => { if (done) return; if (o.comet) { this.state.result = 1; this.state.message = 'Kuyruklu yıldızı buldun!'; this.save(); this.say('Keşif! Kaoru gibi gözlemini doğruladın ve haber verdin.', '#a6f0d0'); this.finishMessage('YENİ CİSİM BULUNDU · GÖZLEMEVİNE BİLDİR'); } else { this.state.missed = [...new Set([...(this.state.missed || []), i])]; this.state.tries = (this.state.tries || 0) + 1; this.save(); glow.setFillStyle(0x7483a1, .18); core.setAlpha(.36); this.say('Bu yıldız haritada kayıtlı. Gökyüzünü karşılaştırmaya devam et.', '#ffd477'); } }); if (missed.includes(i)) { core.setAlpha(.3); glow.setAlpha(.03); } });
      this.scoreText.setText(`${this.state.tries || 0} GÖZLEM`); this.say(done ? 'Keşif tamamlandı.' : 'Parlayan her nokta yeni değildir—haritadaki yıldızları karşılaştır.');
    }
    drawAssembly() {
      const g = this.opts.game, placed = this.state.placed || Array(3).fill(null);
      if (Number.isInteger(this.state.result)) { this.heading('KAĞNI SAHNEYE HAZIR', W / 2, 180); this.finishMessage(`Sahne tamamlandı · ${this.state.result}/3 doğru parça`); this.scoreText.setText(`${this.state.result}/3`); return; }
      this.heading('KAĞNIYI SAHNEYE HAZIRLA', W / 2, 130);
      const art = this.add.graphics().setDepth(2); art.fillStyle(0x755138, .85); art.fillRoundedRect(350, 181, 260, 80, 15); art.fillStyle(0x202c3b, 1); art.fillCircle(388, 273, 24); art.fillCircle(570, 273, 24); art.lineStyle(8, 0x96704b, .95); art.lineBetween(388, 273, 570, 273);
      this.add.text(480, 213, 'KAĞNI', { fontSize: '18px', fontStyle: 'bold', color: '#fff2d0' }).setOrigin(.5).setDepth(4);
      const zonePos = [[220, 220], [480, 330], [740, 220]];
      g.zones.forEach((label, i) => { const [x, y] = zonePos[i]; const z = this.add.rectangle(x, y, 206, 82, 0x223d59, .9).setStrokeStyle(2, C.mint, .8).setDepth(3); z.setInteractive({ dropZone: true }); this.add.text(x, y - 13, label, { fontSize: '14px', color: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: 180 } }).setOrigin(.5).setDepth(5); if (Number.isInteger(placed[i])) this.add.text(x, y + 19, `${g.parts[placed[i]].icon} ${g.parts[placed[i]].text}`, { fontSize: '13px', color: '#ffd477', align: 'center', wordWrap: { width: 190 } }).setOrigin(.5).setDepth(5); });
      const pos = [[190, 424], [390, 424], [590, 424], [790, 424]];
      g.parts.forEach((p, i) => { const card = this.makeCard(pos[i][0], pos[i][1], 180, 62, p.text, i, (id, x, y, obj) => { if (Number.isInteger(this.state.result)) { obj.setPosition(obj.getData('startX'), obj.getData('startY')); return; } const z = zonePos.findIndex(([zx, zy]) => Math.abs(x - zx) < 110 && Math.abs(y - zy) < 55); if (z >= 0) { const a = this.state.placed || Array(3).fill(null); for (let k = 0; k < 3; k++) if (a[k] === id) a[k] = null; a[z] = id; this.state.placed = a; this.save(); this.refresh(); } else obj.setPosition(obj.getData('startX'), obj.getData('startY')); }, p.icon); if (placed.includes(i)) this.dimCard(card, .6); });
      this.button(822, 514, 190, 42, 'SAHNEYİ ÇALIŞTIR', () => { if (g.zones.some((_, i) => !Number.isInteger(placed[i]))) { this.say('Önce kağnının üç yuvasını da doldur.'); return; } this.state.result = g.zones.reduce((n, _, i) => n + (g.parts[placed[i]]?.zone === i ? 1 : 0), 0); this.save(); this.refresh(); }, 0x8a5d49);
      this.scoreText.setText(`${placed.filter(Number.isInteger).length}/3 YUVA`); this.say('Her parçayı doğru sahneye sürükle. Bir yuvadaki parçayı değiştirerek tekrar dene.');
    }
    drawConnect() {
      const g = this.opts.game, matches = this.state.matches || {};
      this.heading('SAHNELERİ DUYGULARLA BAĞLA', W / 2, 132); this.lineGraphics = this.add.graphics().setDepth(3);
      const ys = [220, 330, 440];
      g.left.forEach((label, i) => { const r = this.add.rectangle(240, ys[i], 335, 65, 0x294360, .96).setStrokeStyle(2, 0x78a6d9, .8).setDepth(4); this.add.text(100, ys[i], `🎬  ${label}`, { fontSize: '15px', color: '#fff', wordWrap: { width: 285 } }).setOrigin(0, .5).setDepth(5); r.setInteractive({ useHandCursor: true }).on('pointerdown', () => { if (Number.isInteger(this.state.result) || this.state.matches?.[i] !== undefined) return; this.state.pick = i; this.say('Şimdi sağdaki uygun duygu balonuna dokun.'); }); });
      g.right.forEach((label, i) => { const r = this.add.rectangle(720, ys[i], 335, 65, 0x31455f, .96).setStrokeStyle(2, 0xe5b974, .85).setDepth(4); this.add.text(580, ys[i], `💬  ${label}`, { fontSize: '15px', color: '#fff', wordWrap: { width: 285 } }).setOrigin(0, .5).setDepth(5); r.setInteractive({ useHandCursor: true }).on('pointerdown', () => { if (Number.isInteger(this.state.result) || Object.values(this.state.matches || {}).includes(i)) return; if (!Number.isInteger(this.state.pick)) { this.say('Önce soldaki sahneyi seç.'); return; } const l = this.state.pick; if (g.pairs[l] === i) { this.state.matches = { ...(this.state.matches || {}), [l]: i }; this.state.pick = null; this.say('Doğru bağlantı! Bir sahne daha tamamlandı.', '#a6f0d0'); if (Object.keys(this.state.matches).length === g.left.length) this.state.result = g.left.length; this.save(); this.refresh(); } else { this.state.pick = null; this.say('Bu bağlantı uyuşmadı. Metindeki duygu değişimini düşün.', '#ffd477'); } }); });
      Object.entries(matches).forEach(([l, r]) => { const y1 = ys[+l], y2 = ys[r]; this.lineGraphics.lineStyle(4, C.mint, .95); this.lineGraphics.beginPath(); this.lineGraphics.moveTo(408, y1); this.lineGraphics.bezierCurveTo(500, y1, 460, y2, 552, y2); this.lineGraphics.strokePath(); });
      this.scoreText.setText(`${Object.keys(matches).length}/${g.left.length} BAĞLANTI`); this.say('Dokunarak uçları birleştir; çizgiler doğru bağlantıda kalır.'); if (Number.isInteger(this.state.result)) this.finishMessage('DUYGU KÖPRÜSÜ TAMAMLANDI');
    }
    drawBranch() {
      const g = this.opts.game, idx = this.state.round || 0, completed = Number.isInteger(this.state.result);
      if (completed) { this.finishMessage(`${g.title} · ${this.state.result}/${g.scenes.length} seçim`); this.scoreText.setText('GÖREV TAMAMLANDI'); return; }
      const scene = g.scenes[Math.min(idx, g.scenes.length - 1)];
      this.panel(480, 190, 820, 112, 0x233b59, .97, 0x7392b4);
      this.add.text(480, 190, `SAHNE ${idx + 1}/${g.scenes.length}\n${scene.scene}`, { fontSize: '19px', fontStyle: 'bold', color: '#fff', align: 'center', wordWrap: { width: 750 }, lineSpacing: 8 }).setOrigin(.5);
      const answers = this.state.answers || [];
      if (this.state.showOutcome) {
        const selected = answers[idx], outcome = scene.reactions ? scene.reactions[selected] : scene.outcomes[selected];
        this.panel(480, 330, 720, 82, selected === scene.correct ? 0x245844 : 0x574b32, .97, selected === scene.correct ? C.mint : C.gold);
        this.add.text(480, 330, outcome, { fontSize: '17px', color: '#fff', align: 'center', wordWrap: { width: 660 } }).setOrigin(.5);
        this.button(770, 445, 220, 50, idx === g.scenes.length - 1 ? 'SONUCU GÖR' : 'SONRAKİ SAHNE', () => { this.state.showOutcome = false; this.state.round = idx + 1; if (this.state.round >= g.scenes.length) this.state.result = answers.reduce((n, a, j) => n + (a === g.scenes[j].correct ? 1 : 0), 0); this.save(); this.refresh(); }, 0x337f70);
      } else {
        const choices = scene.bubbles || scene.choices, y0 = choices.length === 3 ? 370 : 390;
        choices.forEach((choice, i) => { const y = y0 + i * 64; this.button(480, y, 740, 52, `${g.type === 'conversation' ? '💬  ' : '↗  '}${choice}`, () => { this.state.answers = [...(this.state.answers || [])]; this.state.answers[idx] = i; this.state.showOutcome = true; this.save(); this.refresh(); }, i === 0 ? 0x2d6e60 : 0x3a5270); });
      }
      this.scoreText.setText(`SIRA ${idx + 1}/${g.scenes.length}`); this.say(g.type === 'conversation' ? 'Seçimin, karakterin tepkisini değiştirir.' : 'Her karar yolun sonucunu değiştirir.');
    }
    checkOrder(solution, max, label) {
      if (Number.isInteger(this.state.result)) return;
      const slots = this.state.slots || [];
      if (slots.length < max || Array.from({ length: max }, (_, i) => slots[i]).some(x => !Number.isInteger(x))) { this.say('Önce bütün aşama duraklarını doldur.'); return; }
      this.state.result = slots.reduce((n, item, i) => n + (item === solution[i] ? 1 : 0), 0); this.save(); this.refresh();
    }
    finishMessage(text) {
      this.panel(480, 472, 720, 56, 0x20533f, .98, C.mint);
      this.add.text(480, 472, `✦  ${text}`, { fontSize: '18px', fontStyle: 'bold', color: '#d9ffed' }).setOrigin(.5);
      this.say('İlerlemen bu hafta için kaydedildi.');
    }
  }

  window.startArcadeGame = function (opts) {
    if (!window.Phaser) throw new Error('Phaser oyun kütüphanesi yüklenemedi.');
    const game = new Phaser.Game({
      type: Phaser.AUTO, width: W, height: H, parent: opts.parent,
      backgroundColor: '#14253d', transparent: false,
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: W, height: H },
      render: { antialias: true, roundPixels: false, powerPreference: 'high-performance' },
      input: { activePointers: 3 }, audio: { noAudio: true },
      scene: [new StoryArcade(opts)]
    });
    return game;
  };
})();
