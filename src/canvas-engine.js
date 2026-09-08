/**
 * ══════════════════════════════════════════════════════════════
 * CANVAS ENGINE (Whiteboard Pro AI) — ES MODULE
 * ══════════════════════════════════════════════════════════════
 * Core drawing engine and geometric transformations:
 * - High-performance quadratic Bézier curve stroke smoothing
 * - Pressure-adaptive stylus & velocity-sensitive brush dynamics
 * - Geometric shape renderers (lines, arrows, rects, circles, triangles, polygons)
 * - Geometric vector transformations (projections, rotations, snapping)
 * - Math instrument geometric snapping (rulers, set-squares, protractors)
 * - Selection marquee & transformation handles geometry
 * - Dynamic laser trail rendering with particle physics
 * - Canvas background, Cartesian coordinate axes, and multi-grid systems
 */

export const CANVAS_DEFAULT_WIDTH = 1920;
export const CANVAS_DEFAULT_HEIGHT = 1080;

/**
 * Normalizes touch, mouse, and pointer events to extract client coordinates and pressure.
 */
export function normEv(e) {
  if (!e) return { clientX: 0, clientY: 0 };
  if (e.touches && e.touches.length) return e.touches[0];
  if (e.changedTouches && e.changedTouches.length) return e.changedTouches[0];
  return e;
}

/**
 * Translates client/screen coordinates to internal 1920x1080 canvas coordinate space,
 * taking into account bounding rect, scale, and pen pressure.
 */
export function getCanvasPointerPos(e, cRect, WW = CANVAS_DEFAULT_WIDTH, WH = CANVAS_DEFAULT_HEIGHT) {
  const ev = normEv(e);
  const rl = cRect ? cRect.left : 0;
  const rt = cRect ? cRect.top : 0;
  const rw = cRect && cRect.width ? cRect.width : WW;
  const rh = cRect && cRect.height ? cRect.height : WH;

  let p = 0.5;
  if (ev.pointerType === 'pen') {
    p = ev.pressure > 0 ? ev.pressure : 0.3;
  } else if (ev.pressure !== undefined && ev.pressure > 0) {
    p = ev.pressure;
  }

  return {
    x: (ev.clientX - rl) * (WW / rw),
    y: (ev.clientY - rt) * (WH / rh),
    p
  };
}

/**
 * Renders smoothed multi-point strokes using quadratic Bézier curves with variable widths.
 */
export function drawSmoothedStroke(ctxToDraw, pts, toolType, options = {}) {
  if (!ctxToDraw || !pts || pts.length === 0) return;

  const color = options.color || '#1e1e1e';
  const highlighterColor = options.highlighterColor || '#facc15';
  const highlighterOpacity = options.highlighterOpacity || 0.35;
  const brushOpacity = options.brushOpacity || 0.7;

  ctxToDraw.save();
  ctxToDraw.imageSmoothingEnabled = true;
  ctxToDraw.imageSmoothingQuality = 'high';
  ctxToDraw.lineCap = (toolType === 'highlighter' || toolType === 'sharp_pen') ? 'square' : 'round';
  ctxToDraw.lineJoin = (toolType === 'sharp_pen') ? 'miter' : 'round';

  if (toolType === 'eraser') {
    ctxToDraw.globalCompositeOperation = 'destination-out';
    ctxToDraw.strokeStyle = 'rgba(0,0,0,1)';
    ctxToDraw.globalAlpha = 1.0;
  } else if (toolType === 'highlighter') {
    ctxToDraw.globalCompositeOperation = 'multiply';
    ctxToDraw.strokeStyle = highlighterColor;
    ctxToDraw.globalAlpha = Math.min(highlighterOpacity, 0.45);
  } else if (toolType === 'brush') {
    ctxToDraw.globalCompositeOperation = 'source-over';
    ctxToDraw.strokeStyle = color;
    ctxToDraw.globalAlpha = brushOpacity;
  } else {
    ctxToDraw.globalCompositeOperation = 'source-over';
    ctxToDraw.strokeStyle = color;
    ctxToDraw.globalAlpha = 1.0;
  }

  if (pts.length === 1) {
    const p = pts[0];
    ctxToDraw.beginPath();
    if (toolType === 'sharp_pen') {
      ctxToDraw.rect(p.x - p.w / 2, p.y - p.w / 2, p.w, p.w);
      ctxToDraw.fillStyle = (toolType === 'eraser') ? 'rgba(0,0,0,1)' : color;
      ctxToDraw.fill();
    } else {
      ctxToDraw.lineWidth = p.w;
      ctxToDraw.lineCap = 'round';
      ctxToDraw.strokeStyle = (toolType === 'eraser') ? 'rgba(0,0,0,1)' : color;
      ctxToDraw.moveTo(p.x, p.y);
      ctxToDraw.lineTo(p.x + 0.05, p.y + 0.05);
      ctxToDraw.stroke();
    }
  } else if (pts.length === 2) {
    const p0 = pts[0];
    const p1 = pts[1];
    ctxToDraw.beginPath();
    ctxToDraw.lineWidth = (p0.w + p1.w) / 2;
    ctxToDraw.moveTo(p0.x, p0.y);
    ctxToDraw.lineTo(p1.x, p1.y);
    ctxToDraw.stroke();
  } else {
    for (let i = 1; i < pts.length - 1; i++) {
      const p0 = pts[i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];

      const mid1 = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
      const mid2 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

      ctxToDraw.beginPath();
      ctxToDraw.lineWidth = p1.w;
      ctxToDraw.moveTo(mid1.x, mid1.y);
      ctxToDraw.quadraticCurveTo(p1.x, p1.y, mid2.x, mid2.y);
      ctxToDraw.stroke();
    }

    const first = pts[0];
    const second = pts[1];
    const midStart = { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 };
    ctxToDraw.beginPath();
    ctxToDraw.lineWidth = first.w;
    ctxToDraw.moveTo(first.x, first.y);
    ctxToDraw.lineTo(midStart.x, midStart.y);
    ctxToDraw.stroke();

    const last = pts[pts.length - 1];
    const prevLast = pts[pts.length - 2];
    const midEnd = { x: (prevLast.x + last.x) / 2, y: (prevLast.y + last.y) / 2 };
    ctxToDraw.beginPath();
    ctxToDraw.lineWidth = last.w;
    ctxToDraw.moveTo(midEnd.x, midEnd.y);
    ctxToDraw.lineTo(last.x, last.y);
    ctxToDraw.stroke();
  }

  ctxToDraw.restore();
}

/**
 * High-performance Active Stroke Renderer:
 * Maintains an offscreen cache of committed/stable curve segments for freehand strokes
 * and re-renders only the active trailing tail (last ~8 points) on pointermove.
 * Transforms per-event drawing complexity from O(n²) to O(1) for arbitrarily long strokes.
 */
export class ActiveStrokeRenderer {
  constructor(tailLength = 8) {
    this.tailLength = tailLength;
    this.bufferCanvas = null;
    this.bufferCtx = null;
    this.committedIndex = 0;
    this.hasInitialCap = false;
    this.currentDpr = 1;
  }

  init(width = CANVAS_DEFAULT_WIDTH, height = CANVAS_DEFAULT_HEIGHT, dpr = 1) {
    this.currentDpr = dpr;
    if (!this.bufferCanvas) {
      this.bufferCanvas = document.createElement('canvas');
    }
    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);
    if (this.bufferCanvas.width !== targetW || this.bufferCanvas.height !== targetH) {
      this.bufferCanvas.width = targetW;
      this.bufferCanvas.height = targetH;
    }
    this.bufferCtx = this.bufferCanvas.getContext('2d');
    if (this.bufferCtx) {
      this.bufferCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.bufferCtx.clearRect(0, 0, width, height);
      this.bufferCtx.imageSmoothingEnabled = true;
      this.bufferCtx.imageSmoothingQuality = 'high';
    }
    this.committedIndex = 0;
    this.hasInitialCap = false;
  }

  reset() {
    if (this.bufferCtx && this.bufferCanvas) {
      this.bufferCtx.save();
      this.bufferCtx.setTransform(1, 0, 0, 1, 0, 0);
      this.bufferCtx.clearRect(0, 0, this.bufferCanvas.width, this.bufferCanvas.height);
      this.bufferCtx.restore();
    }
    this.committedIndex = 0;
    this.hasInitialCap = false;
  }

  render(targetCtx, pts, toolType, options = {}, WW = CANVAS_DEFAULT_WIDTH, WH = CANVAS_DEFAULT_HEIGHT, dpr = 1) {
    if (!targetCtx || !pts || pts.length === 0) return;

    // Direct path for short initial strokes under the tail threshold
    if (pts.length < this.tailLength) {
      targetCtx.clearRect(0, 0, WW, WH);
      drawSmoothedStroke(targetCtx, pts, toolType, options);
      return;
    }

    if (!this.bufferCanvas || !this.bufferCtx || this.currentDpr !== dpr) {
      this.init(WW, WH, dpr);
    }

    const bCtx = this.bufferCtx;
    const color = options.color || '#1e1e1e';
    const highlighterColor = options.highlighterColor || '#facc15';

    const setupContext = (c) => {
      c.imageSmoothingEnabled = true;
      c.imageSmoothingQuality = 'high';
      c.lineCap = (toolType === 'highlighter' || toolType === 'sharp_pen') ? 'square' : 'round';
      c.lineJoin = (toolType === 'sharp_pen') ? 'miter' : 'round';
      c.globalCompositeOperation = 'source-over';
      c.strokeStyle = (toolType === 'highlighter') ? highlighterColor : color;
      c.globalAlpha = 1.0;
    };

    // 1. Commit newly stabilized segments onto the offscreen buffer canvas
    setupContext(bCtx);

    if (!this.hasInitialCap && pts.length >= 2) {
      const p0 = pts[0];
      const p1 = pts[1];
      const midStart = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
      bCtx.beginPath();
      bCtx.lineWidth = p0.w;
      bCtx.moveTo(p0.x, p0.y);
      bCtx.lineTo(midStart.x, midStart.y);
      bCtx.stroke();
      this.hasInitialCap = true;
      this.committedIndex = 1;
    }

    const commitLimit = pts.length - this.tailLength;
    while (this.committedIndex <= commitLimit) {
      const i = this.committedIndex;
      const p0 = pts[i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const mid1 = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
      const mid2 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

      bCtx.beginPath();
      bCtx.lineWidth = p1.w;
      bCtx.moveTo(mid1.x, mid1.y);
      bCtx.quadraticCurveTo(p1.x, p1.y, mid2.x, mid2.y);
      bCtx.stroke();

      this.committedIndex++;
    }

    // 2. Clear target draft canvas in logical space
    targetCtx.clearRect(0, 0, WW, WH);

    // 3. Fast blit of the committed buffer onto target context
    targetCtx.save();
    targetCtx.globalCompositeOperation = 'source-over';
    targetCtx.globalAlpha = 1.0;
    targetCtx.drawImage(this.bufferCanvas, 0, 0, WW, WH);
    targetCtx.restore();

    // 4. Render only the active trailing segments on target context
    targetCtx.save();
    setupContext(targetCtx);

    for (let i = this.committedIndex; i < pts.length - 1; i++) {
      const p0 = pts[i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const mid1 = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
      const mid2 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

      targetCtx.beginPath();
      targetCtx.lineWidth = p1.w;
      targetCtx.moveTo(mid1.x, mid1.y);
      targetCtx.quadraticCurveTo(p1.x, p1.y, mid2.x, mid2.y);
      targetCtx.stroke();
    }

    // Trailing cap to the current pointer position
    if (pts.length >= 2) {
      const last = pts[pts.length - 1];
      const prevLast = pts[pts.length - 2];
      const midEnd = { x: (prevLast.x + last.x) / 2, y: (prevLast.y + last.y) / 2 };

      targetCtx.beginPath();
      targetCtx.lineWidth = last.w;
      targetCtx.moveTo(midEnd.x, midEnd.y);
      targetCtx.lineTo(last.x, last.y);
      targetCtx.stroke();
    }

    targetCtx.restore();
  }
}

export const activeStrokeRenderer = new ActiveStrokeRenderer(8);

/**
 * Geometric shape rendering on canvas: line, arrow, circle, rect, triangle, polygon, star.
 */
export function drawShape(ctx, toolType, startX, startY, endX, endY, options = {}) {
  if (!ctx) return;

  const color = options.color || '#1e1e1e';
  const strokeWidth = options.strokeWidth || 3;
  const fillColor = options.fillColor || null;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = strokeWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  if (fillColor) ctx.fillStyle = fillColor;

  ctx.beginPath();

  if (toolType === 'line') {
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
  } else if (toolType === 'arrow') {
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    const angle = Math.atan2(endY - startY, endX - startX);
    const headLen = Math.max(15, strokeWidth * 4);
    ctx.lineTo(endX - headLen * Math.cos(angle - Math.PI / 6), endY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - headLen * Math.cos(angle + Math.PI / 6), endY - headLen * Math.sin(angle + Math.PI / 6));
  } else if (toolType === 'circle') {
    const r = Math.hypot(endX - startX, endY - startY);
    ctx.arc(startX, startY, r, 0, Math.PI * 2);
  } else if (toolType === 'triangle') {
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineTo(startX - (endX - startX), endY);
    ctx.closePath();
  } else if (toolType === 'rect') {
    const rx = Math.min(startX, endX);
    const ry = Math.min(startY, endY);
    const rw = Math.abs(endX - startX);
    const rh = Math.abs(endY - startY);
    ctx.rect(rx, ry, rw, rh);
  } else if (toolType === 'ellipse') {
    const rx = Math.abs(endX - startX);
    const ry = Math.abs(endY - startY);
    ctx.ellipse(startX, startY, Math.max(1, rx), Math.max(1, ry), 0, 0, Math.PI * 2);
  } else if (toolType === 'star') {
    const outerRadius = Math.hypot(endX - startX, endY - startY);
    const innerRadius = outerRadius * 0.45;
    const numPoints = 5;
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / numPoints;

    ctx.moveTo(startX, startY - outerRadius);
    for (let i = 0; i < numPoints; i++) {
      let x = startX + Math.cos(rot) * outerRadius;
      let y = startY + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = startX + Math.cos(rot) * innerRadius;
      y = startY + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.closePath();
  }

  if (fillColor) ctx.fill();
  ctx.stroke();
  ctx.restore();
}

/**
 * ══════ GEOMETRIC VECTOR MATHEMATICS & PROJECTIONS ══════
 */

/**
 * Projects point (px, py) perpendicularly onto line segment [A, B] and clamps within endpoints.
 */
export function projectPointToSegment(px, py, ax, ay, bx, by) {
  const abx = bx - ax;
  const aby = by - ay;
  const lenSq = abx * abx + aby * aby;
  if (lenSq === 0) return { x: ax, y: ay };
  let t = ((px - ax) * abx + (py - ay) * aby) / lenSq;
  t = Math.max(0, Math.min(1, t));
  return { x: ax + t * abx, y: ay + t * aby };
}

/**
 * Projects point (px, py) onto a circular arc centered at (cx, cy) with given radius.
 */
export function projectPointToArc(px, py, cx, cy, radius) {
  const dx = px - cx;
  const dy = py - cy;
  let angle = Math.atan2(dy, dx);
  if (angle > 0) {
    angle = dx < 0 ? -Math.PI : 0;
  }
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle)
  };
}

/**
 * Rotates a 2D point around an arbitrary center point by angle in radians.
 */
export function rotatePoint(px, py, cx, cy, angleRad) {
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);
  const dx = px - cx;
  const dy = py - cy;
  return {
    x: cx + (dx * cos - dy * sin),
    y: cy + (dx * sin + dy * cos)
  };
}

/**
 * Calculates Euclidean distance between two points.
 */
export function calculateDistance(p1, p2) {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

/**
 * Calculates angle in radians from point p1 to point p2.
 */
export function calculateAngle(p1, p2) {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

/**
 * Snaps a pointer coordinate to educational math instruments (Ruler, Set-square, Protractor).
 */
export function snapToPointerToMathInstrument(el, pos, getPropsFn) {
  if (!el || !pos) return { x: pos.x, y: pos.y, distance: Infinity };

  const left = parseFloat(el.style.left) || 0;
  const top = parseFloat(el.style.top) || 0;
  const w = el.offsetWidth || parseFloat(el.style.width) || 300;
  const h = el.offsetHeight || parseFloat(el.style.height) || 300;
  const type = el.dataset.eduType;
  const props = typeof getPropsFn === 'function' ? getPropsFn(el) : {};
  const rotationDeg = props.rotation || 0;
  const rotationRad = rotationDeg * (Math.PI / 180);

  const cx_world = left + w / 2;
  const cy_world = top + h / 2;
  const dx = pos.x - cx_world;
  const dy = pos.y - cy_world;
  const radNeg = -rotationRad;
  const rx = dx * Math.cos(radNeg) - dy * Math.sin(radNeg);
  const ry = dx * Math.sin(radNeg) + dy * Math.cos(radNeg);
  const lx = rx + w / 2;
  const ly = ry + h / 2;

  let bestLocalSnap = { x: lx, y: ly };
  let minDist = Infinity;

  if (type === 'math.ruler') {
    const padding = 15;
    const clampedX = Math.max(padding, Math.min(w - padding, lx));
    bestLocalSnap = { x: clampedX, y: 0 };
    minDist = Math.abs(ly - 0);
  } else if (type === 'math.set-square') {
    const x0 = 15, y0 = h - 15;
    const x1 = w - 15, y1 = h - 15;
    const x2 = 15, y2 = 15;

    const segments = [];
    if (props.drawPerpendicular) {
      segments.push({ a: { x: x0, y: y0 }, b: { x: x2, y: y2 } });
    } else {
      segments.push({ a: { x: x0, y: y0 }, b: { x: x1, y: y1 } });
      segments.push({ a: { x: x0, y: y0 }, b: { x: x2, y: y2 } });
      segments.push({ a: { x: x1, y: y1 }, b: { x: x2, y: y2 } });
    }

    for (const seg of segments) {
      const proj = projectPointToSegment(lx, ly, seg.a.x, seg.a.y, seg.b.x, seg.b.y);
      const d = Math.hypot(lx - proj.x, ly - proj.y);
      if (d < minDist) {
        minDist = d;
        bestLocalSnap = proj;
      }
    }
  } else if (type === 'math.protractor') {
    const cx = w / 2;
    const cy = h - 20;
    const R = Math.min(cx - 15, cy - 15);

    const candidates = [];
    candidates.push(projectPointToSegment(lx, ly, cx - R, cy, cx + R, cy));
    candidates.push(projectPointToArc(lx, ly, cx, cy, R));

    if (props.measureAngle !== undefined) {
      const baseSide = props.baseSide || 'left';
      const mRad = (props.measureAngle * Math.PI) / 180;
      const rxArm = baseSide === 'right' ? (cx + R * Math.cos(mRad)) : (cx - R * Math.cos(mRad));
      const ryArm = cy - R * Math.sin(mRad);
      candidates.push(projectPointToSegment(lx, ly, cx, cy, rxArm, ryArm));
    }

    for (const cand of candidates) {
      const d = Math.hypot(lx - cand.x, ly - cand.y);
      if (d < minDist) {
        minDist = d;
        bestLocalSnap = cand;
      }
    }
  }

  const offX = bestLocalSnap.x - w / 2;
  const offY = bestLocalSnap.y - h / 2;
  const worldSnappedX = cx_world + (offX * Math.cos(rotationRad) - offY * Math.sin(rotationRad));
  const worldSnappedY = cy_world + (offX * Math.sin(rotationRad) + offY * Math.cos(rotationRad));

  const worldDist = Math.hypot(pos.x - worldSnappedX, pos.y - worldSnappedY);
  return { x: worldSnappedX, y: worldSnappedY, distance: worldDist };
}

/**
 * ══════ SELECTION & TRANSFORM HANDLES GEOMETRY ══════
 */

export function getSelHandles(s) {
  if (!s) return [];
  return [
    { name: 'tl', x: s.x, y: s.y },
    { name: 'tr', x: s.x + s.w, y: s.y },
    { name: 'bl', x: s.x, y: s.y + s.h },
    { name: 'br', x: s.x + s.w, y: s.y + s.h }
  ];
}

export function checkHandleHit(px, py, s, radius = 14) {
  if (!s || !s.img) return null;
  const handles = getSelHandles(s);
  for (const h of handles) {
    if (Math.hypot(px - h.x, py - h.y) <= radius) return h.name;
  }
  return null;
}

export function drawSelectionGizmo(dfx, sel, WW = CANVAS_DEFAULT_WIDTH, WH = CANVAS_DEFAULT_HEIGHT) {
  if (!dfx) return;
  dfx.clearRect(0, 0, WW, WH);
  if (!sel) return;

  if (sel.img) {
    dfx.imageSmoothingEnabled = true;
    dfx.imageSmoothingQuality = 'high';
    dfx.drawImage(sel.img, sel.x, sel.y, sel.w, sel.h);
  }

  dfx.setLineDash([6, 4]);
  dfx.strokeStyle = '#3b82f6';
  dfx.lineWidth = 2;
  dfx.strokeRect(sel.x, sel.y, sel.w, sel.h);
  dfx.setLineDash([]);

  if (sel.img) {
    const handles = getSelHandles(sel);
    handles.forEach((h) => {
      dfx.beginPath();
      dfx.arc(h.x, h.y, 7, 0, Math.PI * 2);
      dfx.fillStyle = '#ffffff';
      dfx.shadowColor = 'rgba(0,0,0,0.3)';
      dfx.shadowBlur = 4;
      dfx.fill();
      dfx.strokeStyle = '#2563eb';
      dfx.lineWidth = 2.5;
      dfx.stroke();
      dfx.shadowBlur = 0;
    });
  }
}

/**
 * ══════ LASER TRAIL RENDER & PARTICLE PHYSICS ══════
 */

export function updateAndRenderLaser(dfx, laserPoints, laserParticles, now, WW = CANVAS_DEFAULT_WIDTH, WH = CANVAS_DEFAULT_HEIGHT, colorHex = '#ef4444') {
  if (!dfx) return;
  dfx.clearRect(0, 0, WW, WH);

  const LASER_LIFETIME = 800;

  // 1. Spawn particles around the tip
  if (laserPoints.length > 0) {
    const tip = laserPoints[laserPoints.length - 1];
    if (now - tip.time < 100) {
      for (let i = 0; i < 2; i++) {
        laserParticles.push({
          x: tip.x + (Math.random() - 0.5) * 12,
          y: tip.y + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          time: now,
          life: 300 + Math.random() * 400,
          size: 1 + Math.random() * 3
        });
      }
    }
  }

  if (laserPoints.length > 0 || laserParticles.length > 0) {
    dfx.save();
    dfx.lineCap = 'round';
    dfx.lineJoin = 'round';

    let r = 239, g = 68, b = 68;
    if (colorHex && colorHex !== '#1e1e1e' && colorHex !== '#000000') {
      const hex = colorHex.replace('#', '');
      if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      }
    }

    // 1. Draw smooth trail
    if (laserPoints.length > 1) {
      dfx.beginPath();
      let p0 = laserPoints[0];
      dfx.moveTo(p0.x, p0.y);
      for (let i = 1; i < laserPoints.length; i++) {
        const p = laserPoints[i];
        const midX = (p0.x + p.x) / 2;
        const midY = (p0.y + p.y) / 2;
        dfx.quadraticCurveTo(p0.x, p0.y, midX, midY);
        p0 = p;
      }
      dfx.lineTo(p0.x, p0.y);

      const age = now - laserPoints[laserPoints.length - 1].time;
      const trailAlpha = Math.max(0, 1 - age / LASER_LIFETIME);

      dfx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${trailAlpha * 0.4})`;
      dfx.lineWidth = 12;
      dfx.stroke();

      dfx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${trailAlpha * 0.8})`;
      dfx.lineWidth = 4;
      dfx.stroke();
    }

    // 2. Draw Particles
    for (const p of laserParticles) {
      const pAge = now - p.time;
      const pAlpha = Math.max(0, 1 - pAge / p.life);
      p.x += p.vx;
      p.y += p.vy;

      dfx.beginPath();
      dfx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      dfx.fillStyle = `rgba(${r}, ${g}, ${b}, ${pAlpha})`;
      dfx.fill();
    }

    // 3. Draw Tip
    if (laserPoints.length > 0) {
      const tip = laserPoints[laserPoints.length - 1];
      const tipAge = now - tip.time;
      const tipAlpha = Math.max(0, 1 - tipAge / LASER_LIFETIME);

      if (tipAlpha > 0) {
        // Outer glow
        dfx.beginPath();
        dfx.arc(tip.x, tip.y, 14, 0, Math.PI * 2);
        dfx.fillStyle = `rgba(${r}, ${g}, ${b}, ${tipAlpha * 0.25})`;
        dfx.fill();

        // Inner core
        dfx.beginPath();
        dfx.arc(tip.x, tip.y, 6, 0, Math.PI * 2);
        dfx.fillStyle = `rgba(${r}, ${g}, ${b}, ${tipAlpha * 0.8})`;
        dfx.fill();

        // White center
        dfx.beginPath();
        dfx.arc(tip.x, tip.y, 2.5, 0, Math.PI * 2);
        dfx.fillStyle = `rgba(255, 255, 255, ${tipAlpha})`;
        dfx.fill();
      }
    }

    dfx.restore();
  }
}

/**
 * ══════ BACKGROUND, CARTESIAN AXES & MULTI-GRID RENDERING ══════
 */

export function drawCanvasBackground(bgx, width, height, options = {}) {
  if (!bgx) return;

  const theme = options.theme || 'light';
  const gridType = options.gridType || 'squares';
  const showAxes = Boolean(options.showAxes);
  const cachedBgImg = options.cachedBgImg || null;

  bgx.fillStyle = theme === 'dark' ? '#0f172a' : '#ffffff';
  bgx.fillRect(0, 0, width, height);

  if (cachedBgImg && cachedBgImg.complete && cachedBgImg.naturalWidth !== 0) {
    bgx.drawImage(cachedBgImg, 0, 0, width, height);
  }

  if (gridType !== 'none') {
    bgx.save();
    bgx.strokeStyle = theme === 'dark' ? '#1e3a5f' : '#e2e8f0';
    bgx.lineWidth = theme === 'dark' ? 0.75 : 1;
    bgx.globalAlpha = theme === 'dark' ? 0.6 : 0.8;

    if (gridType === 'squares') {
      bgx.beginPath();
      for (let x = 0; x <= width; x += 40) {
        bgx.moveTo(x + 0.5, 0);
        bgx.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += 40) {
        bgx.moveTo(0, y + 0.5);
        bgx.lineTo(width, y + 0.5);
      }
      bgx.stroke();
    } else if (gridType === 'lines') {
      bgx.beginPath();
      for (let y = 0; y <= height; y += 36) {
        bgx.moveTo(0, y + 0.5);
        bgx.lineTo(width, y + 0.5);
      }
      bgx.stroke();
    } else if (gridType === 'isometric') {
      bgx.beginPath();
      const step = 40;
      for (let x = -height; x <= width + height; x += step) {
        bgx.moveTo(x, 0);
        bgx.lineTo(x + height * 0.577, height);
        bgx.moveTo(x, 0);
        bgx.lineTo(x - height * 0.577, height);
      }
      bgx.stroke();
    }
    bgx.restore();
  }

  if (showAxes) {
    bgx.save();
    bgx.strokeStyle = theme === 'dark' ? '#38bdf8' : '#3b82f6';
    bgx.lineWidth = 2;
    bgx.beginPath();
    bgx.moveTo(width / 2, 0);
    bgx.lineTo(width / 2, height);
    bgx.moveTo(0, height / 2);
    bgx.lineTo(width, height / 2);
    bgx.stroke();

    bgx.strokeStyle = theme === 'dark' ? '#64748b' : '#94a3b8';
    bgx.lineWidth = 1;
    bgx.beginPath();
    for (let tx = width / 2; tx < width; tx += 40) {
      bgx.moveTo(tx, height / 2 - 5);
      bgx.lineTo(tx, height / 2 + 5);
    }
    for (let tx2 = width / 2; tx2 > 0; tx2 -= 40) {
      bgx.moveTo(tx2, height / 2 - 5);
      bgx.lineTo(tx2, height / 2 + 5);
    }
    for (let ty = height / 2; ty < height; ty += 40) {
      bgx.moveTo(width / 2 - 5, ty);
      bgx.lineTo(width / 2 + 5, ty);
    }
    for (let ty2 = height / 2; ty2 > 0; ty2 -= 40) {
      bgx.moveTo(width / 2 - 5, ty2);
      bgx.lineTo(width / 2 + 5, ty2);
    }
    bgx.stroke();
    bgx.restore();
  }
}
