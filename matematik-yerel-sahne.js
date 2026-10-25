/* Yerel matematik sahneleri — ağ gerektirmeyen, sürüklenebilir SVG çizimleri.
   GeoGebra açılamadığında aynı kazanımı boş ekran bırakmadan sürdürmek için kullanılır. */
(() => {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const UNIT = 44;
  const PAD = 18;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const round = (value) => Math.round(value * 100) / 100;

  function node(name, attrs, text) {
    const element = document.createElementNS(NS, name);
    if (attrs) Object.keys(attrs).forEach((key) => element.setAttribute(key, String(attrs[key])));
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function frame(bounds) {
    const cols = Math.round((bounds.xmax - bounds.xmin) * UNIT) + PAD * 2;
    const rows = Math.round((bounds.ymax - bounds.ymin) * UNIT) + PAD * 2;
    return {
      width: cols,
      height: rows,
      px: (x) => PAD + (x - bounds.xmin) * UNIT,
      py: (y) => PAD + (bounds.ymax - y) * UNIT,
      toWorld: (clientX, clientY, rect) => {
        const scale = rect.width ? cols / rect.width : 1;
        return {
          x: (clientX - rect.left) * scale / UNIT + bounds.xmin - PAD / UNIT,
          y: bounds.ymax - ((clientY - rect.top) * scale / UNIT - PAD / UNIT),
        };
      },
    };
  }

  function drawGrid(group, bounds, f) {
    for (let x = bounds.xmin; x <= bounds.xmax; x += 1) {
      group.appendChild(node('line', {
        x1: f.px(x), y1: f.py(bounds.ymax), x2: f.px(x), y2: f.py(bounds.ymin),
        stroke: x === 0 ? '#c3ccdb' : '#e9eef6', 'stroke-width': x === 0 ? 1.6 : 1,
      }));
    }
    for (let y = bounds.ymin; y <= bounds.ymax; y += 1) {
      group.appendChild(node('line', {
        x1: f.px(bounds.xmin), y1: f.py(y), x2: f.px(bounds.xmax), y2: f.py(y),
        stroke: y === 0 ? '#c3ccdb' : '#e9eef6', 'stroke-width': y === 0 ? 1.6 : 1,
      }));
    }
  }

  function dragHandle(group, f, point, label, colour, onChange, axisLock) {
    const hit = node('circle', {
      cx: f.px(point.x), cy: f.py(point.y), r: 17, fill: 'transparent',
      style: 'cursor:grab;touch-action:none', tabindex: '0', role: 'slider',
      'aria-label': `${label} noktası. Sürükleyerek taşı, ok tuşlarıyla yön ver.`,
      'aria-valuetext': `${round(point.x)}, ${round(point.y)}`,
    });
    const dot = node('circle', { cx: f.px(point.x), cy: f.py(point.y), r: 6, fill: colour });
    const caption = node('text', {
      x: f.px(point.x) + 11, y: f.py(point.y) - 9, 'font-size': 15, 'font-weight': 700, fill: colour,
    }, label);

    const place = () => {
      [hit, dot].forEach((element) => {
        element.setAttribute('cx', f.px(point.x));
        element.setAttribute('cy', f.py(point.y));
      });
      caption.setAttribute('x', f.px(point.x) + 11);
      caption.setAttribute('y', f.py(point.y) - 9);
      hit.setAttribute('aria-valuetext', `${round(point.x)}, ${round(point.y)}`);
    };

    let dragging = false;
    hit.addEventListener('pointerdown', (event) => {
      dragging = true;
      hit.style.cursor = 'grabbing';
      if (hit.setPointerCapture) hit.setPointerCapture(event.pointerId);
    });
    hit.addEventListener('pointerup', () => { dragging = false; hit.style.cursor = 'grab'; });
    hit.addEventListener('pointercancel', () => { dragging = false; hit.style.cursor = 'grab'; });
    hit.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      const svg = hit.ownerSVGElement;
      if (!svg) return;
      const world = f.toWorld(event.clientX, event.clientY, svg.getBoundingClientRect());
      if (axisLock !== 'y') point.x = round(clamp(world.x, -2.6, 8.6));
      if (axisLock !== 'x') point.y = round(clamp(world.y, -1.6, 7.6));
      place();
      onChange();
    });
    hit.addEventListener('keydown', (event) => {
      const step = event.shiftKey ? 1 : 0.5;
      const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] };
      if (!moves[event.key]) return;
      event.preventDefault();
      if (axisLock !== 'y') point.x = round(clamp(point.x + moves[event.key][0], -2.6, 8.6));
      if (axisLock !== 'x') point.y = round(clamp(point.y + moves[event.key][1], -1.6, 7.6));
      place();
      onChange();
    });

    group.appendChild(hit);
    group.appendChild(dot);
    group.appendChild(caption);
    return { place, hit };
  }

  function lineBetween(f, a, b, colour, dashed) {
    return node('line', {
      x1: f.px(a.x), y1: f.py(a.y), x2: f.px(b.x), y2: f.py(b.y),
      stroke: colour, 'stroke-width': 2.4, 'stroke-linecap': 'round',
      'stroke-dasharray': dashed ? '8 6' : 'none',
    });
  }

  // A ve B'den eşit uzaklıktaki noktaların doğrusu (orta dikme), dikdörtgen çerçeveye kırpılır.
  function bisectorSegment(a, b, bounds) {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const span = Math.hypot(dx, dy);
    if (span < 1e-6) return null;
    const ux = -dy / span;
    const uy = dx / span;
    const inside = (point) => point.x >= bounds.xmin - 1e-6 && point.x <= bounds.xmax + 1e-6
      && point.y >= bounds.ymin - 1e-6 && point.y <= bounds.ymax + 1e-6;
    const candidates = [];
    if (Math.abs(ux) > 1e-6) {
      [bounds.xmin, bounds.xmax].forEach((x) => {
        const t = (x - mx) / ux;
        candidates.push({ t, point: { x, y: my + uy * t } });
      });
    }
    if (Math.abs(uy) > 1e-6) {
      [bounds.ymin, bounds.ymax].forEach((y) => {
        const t = (y - my) / uy;
        candidates.push({ t, point: { x: mx + ux * t, y } });
      });
    }
    const valid = candidates.filter((item) => inside(item.point));
    if (valid.length < 2) return null;
    valid.sort((left, right) => left.t - right.t);
    return [valid[0].point, valid[valid.length - 1].point];
  }

  const scenes = {
    // Orta dikme: A ve B sürüklenir, inşa düğmeyle açılır.
    ortadikme(host, options = {}) {
      const bounds = { xmin: -2, xmax: 8, ymin: -1, ymax: 7 };
      const f = frame(bounds);
      const state = { A: { x: 1, y: 1 }, B: { x: 5, y: 3 }, showBisector: false };
      const svg = node('svg', {
        viewBox: `0 0 ${f.width} ${f.height}`, role: 'img',
        'aria-label': 'A ve B noktaları, aralarındaki doğru ve isteğe bağlı orta dikme',
      });
      const grid = node('g');
      const draw = node('g');
      svg.appendChild(grid);
      svg.appendChild(draw);
      drawGrid(grid, bounds, f);

      const segment = lineBetween(f, state.A, state.B, '#102238');
      const bisector = lineBetween(f, { x: 0, y: 0 }, { x: 0, y: 0 }, '#7056c9', true);
      const midpoint = node('circle', { cx: 0, cy: 0, r: 4, fill: '#7056c9', 'fill-opacity': '.85' });
      draw.appendChild(bisector);
      draw.appendChild(segment);
      draw.appendChild(midpoint);

      const redraw = () => {
        segment.setAttribute('x1', f.px(state.A.x));
        segment.setAttribute('y1', f.py(state.A.y));
        segment.setAttribute('x2', f.px(state.B.x));
        segment.setAttribute('y2', f.py(state.B.y));
        midpoint.setAttribute('cx', f.px((state.A.x + state.B.x) / 2));
        midpoint.setAttribute('cy', f.py((state.A.y + state.B.y) / 2));
        const cut = bisectorSegment(state.A, state.B, bounds);
        if (cut) {
          bisector.setAttribute('x1', f.px(cut[0].x));
          bisector.setAttribute('y1', f.py(cut[0].y));
          bisector.setAttribute('x2', f.px(cut[1].x));
          bisector.setAttribute('y2', f.py(cut[1].y));
        }
        bisector.setAttribute('visibility', state.showBisector && cut ? 'visible' : 'hidden');
        if (typeof options.onChange === 'function') options.onChange({ ...state });
      };

      const handleA = dragHandle(draw, f, state.A, 'A', '#102238', () => { redraw(); handleA.place(); });
      const handleB = dragHandle(draw, f, state.B, 'B', '#102238', () => { redraw(); handleB.place(); });

      host.appendChild(svg);
      redraw();

      return {
        state,
        setBisector(value) { state.showBisector = Boolean(value); redraw(); },
        reset() { state.A = { x: 1, y: 1 }; state.B = { x: 5, y: 3 }; state.showBisector = false; handleA.place(); handleB.place(); redraw(); },
      };
    },

    // Yansıma: üçgen ve ayna doğrusu sürüklenir.
    yansima(host, options = {}) {
      const bounds = { xmin: -2, xmax: 8, ymin: -1, ymax: 7 };
      const f = frame(bounds);
      const state = { A: { x: 1, y: 1 }, B: { x: 4, y: 1 }, C: { x: 1, y: 3 }, mirrorX: 0, showImage: false };
      const svg = node('svg', {
        viewBox: `0 0 ${f.width} ${f.height}`, role: 'img',
        'aria-label': 'Üçgen, ayna doğrusu ve isteğe bağlı yansıma görüntüsü',
      });
      const grid = node('g');
      const draw = node('g');
      svg.appendChild(grid);
      svg.appendChild(draw);
      drawGrid(grid, bounds, f);

      const mirror = node('line', { stroke: '#b42318', 'stroke-width': 2.4, 'stroke-dasharray': '9 6' });
      const shape = node('polygon', { fill: '#7056c9', 'fill-opacity': '.18', stroke: '#7056c9', 'stroke-width': 2.4 });
      const image = node('polygon', { fill: '#b42318', 'fill-opacity': '.12', stroke: '#b42318', 'stroke-width': 2.4 });
      draw.appendChild(image);
      draw.appendChild(shape);
      draw.appendChild(mirror);

      const points = () => [state.A, state.B, state.C];
      const polygonPoints = (list) => list.map((p) => `${f.px(p.x)},${f.py(p.y)}`).join(' ');

      const redraw = () => {
        shape.setAttribute('points', polygonPoints(points()));
        image.setAttribute('points', polygonPoints(points().map((p) => ({ x: 2 * state.mirrorX - p.x, y: p.y }))));
        image.setAttribute('visibility', state.showImage ? 'visible' : 'hidden');
        mirror.setAttribute('x1', f.px(state.mirrorX));
        mirror.setAttribute('x2', f.px(state.mirrorX));
        mirror.setAttribute('y1', f.py(bounds.ymax));
        mirror.setAttribute('y2', f.py(bounds.ymin));
        if (typeof options.onChange === 'function') options.onChange({ ...state });
      };

      const handleA = dragHandle(draw, f, state.A, 'A', '#7056c9', () => { redraw(); handleA.place(); });
      const handleB = dragHandle(draw, f, state.B, 'B', '#7056c9', () => { redraw(); handleB.place(); });
      const handleC = dragHandle(draw, f, state.C, 'C', '#7056c9', () => { redraw(); handleC.place(); });
      const mirrorPoint = { get x() { return state.mirrorX; }, set x(value) { state.mirrorX = value; }, y: 6.4 };
      const mirrorHandle = dragHandle(draw, f, mirrorPoint, 'ayna', '#b42318', () => { redraw(); mirrorHandle.place(); }, 'x');

      host.appendChild(svg);
      redraw();

      return {
        state,
        setImage(value) { state.showImage = Boolean(value); redraw(); },
        reset() {
          state.A = { x: 1, y: 1 }; state.B = { x: 4, y: 1 }; state.C = { x: 1, y: 3 };
          state.mirrorX = 0; state.showImage = false;
          [handleA, handleB, handleC, mirrorHandle].forEach((handle) => handle.place());
          redraw();
        },
      };
    },
  };

  function mount(host, type, options) {
    if (!host) return null;
    const factory = scenes[type];
    if (!factory) throw new Error(`bilinmeyen sahne: ${type}`);
    host.innerHTML = '';
    host.dataset.localScene = type;
    return factory(host, options || {});
  }

  window.MATEMATIK_SAHNE = Object.freeze({ mount, scenes: Object.keys(scenes) });
})();
