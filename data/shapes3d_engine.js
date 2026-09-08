/* ═══════════════════════════════════════════════════════════════════════════
   3D SHAPES & GEOMETRIC SOLIDS ENGINE (السبورة الذكية ثلاثية الأبعاد)
   High-precision vector 3D projection, depth-sorting, shading & educational formulas
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * 3D Vector & Matrix utilities
 */
function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function rotateX(point, rad) {
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos
  };
}

function rotateY(point, rad) {
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x * cos + point.z * sin,
    y: point.y,
    z: -point.x * sin + point.z * cos
  };
}

function rotateZ(point, rad) {
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
    z: point.z
  };
}

function project3D(point, yawDeg, pitchDeg, rollDeg = 0, scale = 1, cx = 150, cy = 150) {
  let p = { x: point.x * scale, y: point.y * scale, z: point.z * scale };
  p = rotateY(p, degToRad(yawDeg));
  p = rotateX(p, degToRad(pitchDeg));
  if (rollDeg) p = rotateZ(p, degToRad(rollDeg));

  // Isometric / Weak perspective projection
  const fov = 600;
  const distance = 400;
  const factor = fov / (distance + p.z * 0.5);

  return {
    x2d: cx + p.x * factor * 0.75,
    y2d: cy + p.y * factor * 0.75,
    depth: p.z,
    raw3d: p
  };
}

function calculateFaceNormal(p0, p1, p2) {
  const v1 = { x: p1.x - p0.x, y: p1.y - p0.y, z: p1.z - p0.z };
  const v2 = { x: p2.x - p0.x, y: p2.y - p0.y, z: p2.z - p0.z };
  const nx = v1.y * v2.z - v1.z * v2.y;
  const ny = v1.z * v2.x - v1.x * v2.z;
  const nz = v1.x * v2.y - v1.y * v2.x;
  const len = Math.hypot(nx, ny, nz) || 1;
  return { x: nx / len, y: ny / len, z: nz / len };
}

export function rotateNormal(n, yawDeg, pitchDeg, rollDeg = 0) {
  let rot = rotateY(n, degToRad(yawDeg));
  rot = rotateX(rot, degToRad(pitchDeg));
  if (rollDeg) rot = rotateZ(rot, degToRad(rollDeg));
  return rot;
}

function adjustColorBrightness(hex, percent) {
  let num = parseInt(hex.replace('#', ''), 16);
  if (isNaN(num)) num = 0x3b82f6;
  let r = (num >> 16) + Math.round(255 * (percent / 100));
  let g = ((num >> 8) & 0x00FF) + Math.round(255 * (percent / 100));
  let b = (num & 0x0000FF) + Math.round(255 * (percent / 100));
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

const LIGHT_DIR = { x: 0.45, y: -0.65, z: 0.61 };
const lenL = Math.hypot(LIGHT_DIR.x, LIGHT_DIR.y, LIGHT_DIR.z);
LIGHT_DIR.x /= lenL;
LIGHT_DIR.y /= lenL;
LIGHT_DIR.z /= lenL;

function computeLighting(normal3d, baseColor) {
  const dot = normal3d.x * LIGHT_DIR.x + normal3d.y * LIGHT_DIR.y + normal3d.z * LIGHT_DIR.z;
  // Map dot (-1 to 1) to brightness percentage (-40% to +45%)
  const brightness = dot * 40;
  return adjustColorBrightness(baseColor, brightness);
}

function escapeXml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, (m) => {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return m;
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   3D SHAPES PRESETS & METADATA
   ═══════════════════════════════════════════════════════════════════════════ */

export const SHAPES_3D_METADATA = {
  'shapes3d.cube': {
    nameAr: 'مكعب 3D',
    nameEn: '3D Cube',
    category: 'polyhedra',
    icon: 'box',
    defaultProps: {
      a: 10,
      unit: 'cm',
      yaw: 35,
      pitch: -25,
      color: '#3b82f6',
      opacity: 0.9,
      renderMode: 'shaded-wireframe',
      showLabels: true,
      showFormulas: true,
      showHiddenLines: true
    }
  },
  'shapes3d.cuboid': {
    nameAr: 'متوازي مستطيلات 3D',
    nameEn: '3D Cuboid / Prism',
    category: 'polyhedra',
    icon: 'package',
    defaultProps: {
      l: 14,
      w: 8,
      h: 10,
      unit: 'cm',
      yaw: 35,
      pitch: -25,
      color: '#0ea5e9',
      opacity: 0.9,
      renderMode: 'shaded-wireframe',
      showLabels: true,
      showFormulas: true,
      showHiddenLines: true
    }
  },
  'shapes3d.cylinder': {
    nameAr: 'أسطوانة 3D',
    nameEn: '3D Cylinder',
    category: 'curved',
    icon: 'cylinder',
    defaultProps: {
      r: 6,
      h: 12,
      unit: 'cm',
      yaw: 25,
      pitch: -20,
      color: '#10b981',
      opacity: 0.9,
      renderMode: 'shaded-wireframe',
      showLabels: true,
      showFormulas: true,
      showHiddenLines: true
    }
  },
  'shapes3d.cone': {
    nameAr: 'مخروط 3D',
    nameEn: '3D Cone',
    category: 'curved',
    icon: 'cone',
    defaultProps: {
      r: 6,
      h: 12,
      unit: 'cm',
      yaw: 20,
      pitch: -15,
      color: '#f59e0b',
      opacity: 0.9,
      renderMode: 'shaded-wireframe',
      showLabels: true,
      showFormulas: true,
      showHiddenLines: true
    }
  },
  'shapes3d.sphere': {
    nameAr: 'كرة 3D',
    nameEn: '3D Sphere',
    category: 'curved',
    icon: 'globe-2',
    defaultProps: {
      r: 8,
      unit: 'cm',
      yaw: 30,
      pitch: -20,
      color: '#8b5cf6',
      opacity: 0.95,
      renderMode: 'shaded-wireframe',
      showLabels: true,
      showFormulas: true,
      showHiddenLines: true
    }
  },
  'shapes3d.pyramid': {
    nameAr: 'هرم رباعي 3D',
    nameEn: '3D Square Pyramid',
    category: 'polyhedra',
    icon: 'pyramid',
    defaultProps: {
      a: 10,
      h: 12,
      unit: 'cm',
      yaw: 35,
      pitch: -20,
      color: '#ec4899',
      opacity: 0.9,
      renderMode: 'shaded-wireframe',
      showLabels: true,
      showFormulas: true,
      showHiddenLines: true
    }
  },
  'shapes3d.triangular-prism': {
    nameAr: 'منشور ثلاثي 3D',
    nameEn: '3D Triangular Prism',
    category: 'polyhedra',
    icon: 'triangle',
    defaultProps: {
      b: 10,
      h: 9,
      l: 14,
      unit: 'cm',
      yaw: 40,
      pitch: -20,
      color: '#14b8a6',
      opacity: 0.9,
      renderMode: 'shaded-wireframe',
      showLabels: true,
      showFormulas: true,
      showHiddenLines: true
    }
  },
  'shapes3d.capsule': {
    nameAr: 'كبسولة 3D',
    nameEn: '3D Capsule',
    category: 'curved',
    icon: 'pill',
    defaultProps: {
      r: 5,
      l: 10,
      unit: 'cm',
      yaw: 30,
      pitch: -20,
      color: '#f43f5e',
      opacity: 0.9,
      renderMode: 'shaded-wireframe',
      showLabels: true,
      showFormulas: true,
      showHiddenLines: true
    }
  },
  'shapes3d.hemisphere': {
    nameAr: 'نصف كرة 3D',
    nameEn: '3D Hemisphere',
    category: 'curved',
    icon: 'circle-dot',
    defaultProps: {
      r: 8,
      unit: 'cm',
      yaw: 30,
      pitch: -25,
      color: '#6366f1',
      opacity: 0.9,
      renderMode: 'shaded-wireframe',
      showLabels: true,
      showFormulas: true,
      showHiddenLines: true
    }
  },
  'shapes3d.torus': {
    nameAr: 'طارة 3D (حلقة)',
    nameEn: '3D Torus',
    category: 'curved',
    icon: 'disc',
    defaultProps: {
      R: 9,
      r: 3,
      unit: 'cm',
      yaw: 35,
      pitch: -35,
      color: '#eab308',
      opacity: 0.9,
      renderMode: 'shaded-wireframe',
      showLabels: true,
      showFormulas: true,
      showHiddenLines: true
    }
  },
  'shapes3d.tetrahedron': {
    nameAr: 'رباعي الوجوه 3D',
    nameEn: '3D Tetrahedron',
    category: 'polyhedra',
    icon: 'layers',
    defaultProps: {
      a: 10,
      unit: 'cm',
      yaw: 30,
      pitch: -20,
      color: '#a855f7',
      opacity: 0.9,
      renderMode: 'shaded-wireframe',
      showLabels: true,
      showFormulas: true,
      showHiddenLines: true
    }
  }
};

/* ═══════════════════════════════════════════════════════════════════════════
   RENDERER 1: 3D CUBE (مكعب ثلاثي الأبعاد)
   ═══════════════════════════════════════════════════════════════════════════ */

export function render3DCubeSVG(props, w = 280, h = 280) {
  const a = parseFloat(props.a) || 10;
  const unit = escapeXml(props.unit || 'cm');
  const yaw = parseFloat(props.yaw !== undefined ? props.yaw : (props.rotY !== undefined ? props.rotY : 35));
  const pitch = parseFloat(props.pitch !== undefined ? props.pitch : (props.rotX !== undefined ? props.rotX : -25));
  const roll = parseFloat(props.roll !== undefined ? props.roll : (props.rotZ !== undefined ? props.rotZ : 0));
  const color = escapeXml(props.color || '#3b82f6');
  const opacity = Math.max(0.1, Math.min(1.0, parseFloat(props.opacity !== undefined ? props.opacity : 0.9)));
  const mode = props.renderMode || 'shaded-wireframe';
  const showLabels = props.showLabels !== false;
  const showFormulas = props.showFormulas !== false;
  const showHidden = props.showHiddenLines !== false;

  const svgW = Math.max(200, w);
  const svgH = Math.max(200, h);
  const cx = svgW / 2;
  const cy = showFormulas ? svgH * 0.44 : svgH / 2;
  const scale3d = (Math.min(svgW, svgH) * 0.28) / (a || 10);

  const s = a * scale3d;
  const half = s / 2;

  // 8 vertices of a cube centered at origin
  const rawVertices = [
    { x: -half, y: -half, z: -half }, // 0: Top Front Left
    { x:  half, y: -half, z: -half }, // 1: Top Front Right
    { x:  half, y:  half, z: -half }, // 2: Bottom Front Right
    { x: -half, y:  half, z: -half }, // 3: Bottom Front Left
    { x: -half, y: -half, z:  half }, // 4: Top Back Left
    { x:  half, y: -half, z:  half }, // 5: Top Back Right
    { x:  half, y:  half, z:  half }, // 6: Bottom Back Right
    { x: -half, y:  half, z:  half }  // 7: Bottom Back Left
  ];

  const proj = rawVertices.map(v => project3D(v, yaw, pitch, roll, 1, cx, cy));

  // 6 Faces defined with vertex indices (CCW from outside)
  const faces = [
    { idx: [0, 1, 2, 3], name: 'Front', normal: calculateFaceNormal(rawVertices[0], rawVertices[1], rawVertices[2]) },
    { idx: [5, 4, 7, 6], name: 'Back', normal: calculateFaceNormal(rawVertices[5], rawVertices[4], rawVertices[7]) },
    { idx: [4, 5, 1, 0], name: 'Top', normal: calculateFaceNormal(rawVertices[4], rawVertices[5], rawVertices[1]) },
    { idx: [3, 2, 6, 7], name: 'Bottom', normal: calculateFaceNormal(rawVertices[3], rawVertices[2], rawVertices[6]) },
    { idx: [4, 0, 3, 7], name: 'Left', normal: calculateFaceNormal(rawVertices[4], rawVertices[0], rawVertices[3]) },
    { idx: [1, 5, 6, 2], name: 'Right', normal: calculateFaceNormal(rawVertices[1], rawVertices[5], rawVertices[6]) }
  ];

  // Rotate normals to camera space to determine visibility and lighting
  faces.forEach(f => {
    let rotN = rotateNormal(f.normal, yaw, pitch, roll);
    f.rotNormal = rotN;
    f.isVisible = rotN.z < 0; // facing towards camera (Z is depth away)
    f.avgZ = f.idx.reduce((sum, i) => sum + proj[i].depth, 0) / 4;
    f.shadeColor = computeLighting(rotN, color);
  });

  // Sort faces from back to front
  const sortedFaces = [...faces].sort((a, b) => b.avgZ - a.avgZ);

  // Hidden back edges
  let hiddenEdgesSvg = '';
  if (showHidden && mode !== 'shaded') {
    const allEdges = [
      [0,1],[1,2],[2,3],[3,0], // front
      [4,5],[5,6],[6,7],[7,4], // back
      [0,4],[1,5],[2,6],[3,7]  // connectors
    ];
    allEdges.forEach(([i1, i2]) => {
      // If both adjacent faces are hidden, this edge is hidden
      const adjFaces = faces.filter(f => f.idx.includes(i1) && f.idx.includes(i2));
      const isHiddenEdge = adjFaces.length > 0 && adjFaces.every(f => !f.isVisible);
      if (isHiddenEdge) {
        hiddenEdgesSvg += `<line x1="${proj[i1].x2d}" y1="${proj[i1].y2d}" x2="${proj[i2].x2d}" y2="${proj[i2].y2d}" stroke="${color}" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.65" />`;
      }
    });
  }

  // Render visible faces
  let facesSvg = '';
  sortedFaces.forEach(f => {
    if (!f.isVisible && mode === 'shaded') return;
    const pts = f.idx.map(i => `${proj[i].x2d},${proj[i].y2d}`).join(' ');
    const fillColor = mode === 'wireframe' ? 'none' : f.shadeColor;
    const fillOp = mode === 'wireframe' ? '0' : opacity;
    const strokeColor = (mode === 'shaded') ? f.shadeColor : '#1e293b';
    const strokeW = mode === 'wireframe' ? '2' : '1.5';

    if (f.isVisible || mode === 'wireframe') {
      facesSvg += `<polygon points="${pts}" fill="${fillColor}" fill-opacity="${fillOp}" stroke="${strokeColor}" stroke-width="${strokeW}" stroke-linejoin="round" />`;
    }
  });

  // Calculate math properties
  const volume = Math.round(Math.pow(a, 3) * 100) / 100;
  const area = Math.round(6 * Math.pow(a, 2) * 100) / 100;

  // Edge label
  let edgeLabelSvg = '';
  if (showLabels) {
    const pA = proj[0];
    const pB = proj[1];
    const midX = (pA.x2d + pB.x2d) / 2;
    const midY = (pA.y2d + pB.y2d) / 2 - 8;
    edgeLabelSvg = `
      <g>
        <rect x="${midX - 22}" y="${midY - 10}" width="44" height="16" rx="4" fill="#ffffff" fill-opacity="0.9" stroke="#cbd5e1" stroke-width="1" />
        <text x="${midX}" y="${midY + 2}" fill="#1e293b" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">a = ${a} ${unit}</text>
      </g>
    `;
  }

  // Formulas panel footer
  let formulasSvg = '';
  if (showFormulas) {
    formulasSvg = `
      <g transform="translate(10, ${svgH - 58})">
        <rect width="${svgW - 20}" height="50" rx="10" fill="#f8fafc" fill-opacity="0.95" stroke="#e2e8f0" stroke-width="1.5" />
        <text x="${svgW - 32}" y="20" text-anchor="start" fill="#1e293b" font-size="11" font-weight="bold" font-family="sans-serif">المكعب (Cube):</text>
        <text x="12" y="20" fill="#2563eb" font-size="10.5" font-weight="bold" font-family="sans-serif" text-anchor="end">الحجم: V = a³ = ${volume} ${unit}³</text>
        <text x="${svgW - 32}" y="38" text-anchor="start" fill="#64748b" font-size="10" font-family="sans-serif">المساحة الكلية: A = 6a² = ${area} ${unit}²</text>
        <text x="12" y="38" fill="#64748b" font-size="9.5" font-family="sans-serif" text-anchor="end">الزاوية: ${Math.round(yaw)}° / ${Math.round(pitch)}°</text>
      </g>
    `;
  }

  return `
    <svg width="100%" height="100%" viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;" dir="rtl">
      ${hiddenEdgesSvg}
      ${facesSvg}
      ${edgeLabelSvg}
      ${formulasSvg}
    </svg>
  `;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDERER 2: 3D CUBOID / RECTANGULAR PRISM (متوازي مستطيلات)
   ═══════════════════════════════════════════════════════════════════════════ */

export function render3DCuboidSVG(props, w = 300, h = 280) {
  const l = parseFloat(props.l) || 14;
  const widthDim = parseFloat(props.w) || 8;
  const heightDim = parseFloat(props.h) || 10;
  const unit = escapeXml(props.unit || 'cm');
  const yaw = parseFloat(props.yaw !== undefined ? props.yaw : (props.rotY !== undefined ? props.rotY : 35));
  const pitch = parseFloat(props.pitch !== undefined ? props.pitch : (props.rotX !== undefined ? props.rotX : -25));
  const roll = parseFloat(props.roll !== undefined ? props.roll : (props.rotZ !== undefined ? props.rotZ : 0));
  const color = escapeXml(props.color || '#0ea5e9');
  const opacity = Math.max(0.1, Math.min(1.0, parseFloat(props.opacity !== undefined ? props.opacity : 0.9)));
  const mode = props.renderMode || 'shaded-wireframe';
  const showLabels = props.showLabels !== false;
  const showFormulas = props.showFormulas !== false;
  const showHidden = props.showHiddenLines !== false;

  const svgW = Math.max(220, w);
  const svgH = Math.max(200, h);
  const cx = svgW / 2;
  const cy = showFormulas ? svgH * 0.44 : svgH / 2;
  const maxDim = Math.max(l, widthDim, heightDim) || 14;
  const scale3d = (Math.min(svgW, svgH) * 0.32) / maxDim;

  const halfL = (l * scale3d) / 2;
  const halfH = (heightDim * scale3d) / 2;
  const halfW = (widthDim * scale3d) / 2;

  const rawVertices = [
    { x: -halfL, y: -halfH, z: -halfW }, // 0
    { x:  halfL, y: -halfH, z: -halfW }, // 1
    { x:  halfL, y:  halfH, z: -halfW }, // 2
    { x: -halfL, y:  halfH, z: -halfW }, // 3
    { x: -halfL, y: -halfH, z:  halfW }, // 4
    { x:  halfL, y: -halfH, z:  halfW }, // 5
    { x:  halfL, y:  halfH, z:  halfW }, // 6
    { x: -halfL, y:  halfH, z:  halfW }  // 7
  ];

  const proj = rawVertices.map(v => project3D(v, yaw, pitch, roll, 1, cx, cy));

  const faces = [
    { idx: [0, 1, 2, 3], normal: calculateFaceNormal(rawVertices[0], rawVertices[1], rawVertices[2]) },
    { idx: [5, 4, 7, 6], normal: calculateFaceNormal(rawVertices[5], rawVertices[4], rawVertices[7]) },
    { idx: [4, 5, 1, 0], normal: calculateFaceNormal(rawVertices[4], rawVertices[5], rawVertices[1]) },
    { idx: [3, 2, 6, 7], normal: calculateFaceNormal(rawVertices[3], rawVertices[2], rawVertices[6]) },
    { idx: [4, 0, 3, 7], normal: calculateFaceNormal(rawVertices[4], rawVertices[0], rawVertices[3]) },
    { idx: [1, 5, 6, 2], normal: calculateFaceNormal(rawVertices[1], rawVertices[5], rawVertices[6]) }
  ];

  faces.forEach(f => {
    let rotN = rotateNormal(f.normal, yaw, pitch, roll);
    f.rotNormal = rotN;
    f.isVisible = rotN.z < 0;
    f.avgZ = f.idx.reduce((sum, i) => sum + proj[i].depth, 0) / 4;
    f.shadeColor = computeLighting(rotN, color);
  });

  const sortedFaces = [...faces].sort((a, b) => b.avgZ - a.avgZ);

  let hiddenEdgesSvg = '';
  if (showHidden && mode !== 'shaded') {
    const allEdges = [
      [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]
    ];
    allEdges.forEach(([i1, i2]) => {
      const adjFaces = faces.filter(f => f.idx.includes(i1) && f.idx.includes(i2));
      const isHiddenEdge = adjFaces.length > 0 && adjFaces.every(f => !f.isVisible);
      if (isHiddenEdge) {
        hiddenEdgesSvg += `<line x1="${proj[i1].x2d}" y1="${proj[i1].y2d}" x2="${proj[i2].x2d}" y2="${proj[i2].y2d}" stroke="${color}" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.65" />`;
      }
    });
  }

  let facesSvg = '';
  sortedFaces.forEach(f => {
    if (!f.isVisible && mode === 'shaded') return;
    const pts = f.idx.map(i => `${proj[i].x2d},${proj[i].y2d}`).join(' ');
    const fillColor = mode === 'wireframe' ? 'none' : f.shadeColor;
    const fillOp = mode === 'wireframe' ? '0' : opacity;
    const strokeColor = (mode === 'shaded') ? f.shadeColor : '#1e293b';

    if (f.isVisible || mode === 'wireframe') {
      facesSvg += `<polygon points="${pts}" fill="${fillColor}" fill-opacity="${fillOp}" stroke="${strokeColor}" stroke-width="1.5" stroke-linejoin="round" />`;
    }
  });

  const volume = Math.round(l * widthDim * heightDim * 100) / 100;
  const area = Math.round(2 * (l * widthDim + l * heightDim + widthDim * heightDim) * 100) / 100;

  let labelsSvg = '';
  if (showLabels) {
    const p0 = proj[0];
    const p1 = proj[1];
    const p2 = proj[2];
    const p5 = proj[5];
    // Length (L)
    const midL_x = (p0.x2d + p1.x2d) / 2;
    const midL_y = (p0.y2d + p1.y2d) / 2 - 8;
    // Height (H)
    const midH_x = (p1.x2d + p2.x2d) / 2 + 18;
    const midH_y = (p1.y2d + p2.y2d) / 2;
    // Width (W)
    const midW_x = (p1.x2d + p5.x2d) / 2 + 15;
    const midW_y = (p1.y2d + p5.y2d) / 2 - 8;

    labelsSvg = `
      <g>
        <rect x="${midL_x - 22}" y="${midL_y - 9}" width="44" height="15" rx="3" fill="#ffffff" fill-opacity="0.9" stroke="#cbd5e1" stroke-width="1" />
        <text x="${midL_x}" y="${midL_y + 2}" fill="#0369a1" font-size="9.5" font-weight="bold" text-anchor="middle">L = ${l} ${unit}</text>

        <rect x="${midH_x - 18}" y="${midH_y - 9}" width="36" height="15" rx="3" fill="#ffffff" fill-opacity="0.9" stroke="#cbd5e1" stroke-width="1" />
        <text x="${midH_x}" y="${midH_y + 2}" fill="#0284c7" font-size="9.5" font-weight="bold" text-anchor="middle">H = ${heightDim}</text>

        <rect x="${midW_x - 18}" y="${midW_y - 9}" width="36" height="15" rx="3" fill="#ffffff" fill-opacity="0.9" stroke="#cbd5e1" stroke-width="1" />
        <text x="${midW_x}" y="${midW_y + 2}" fill="#0ea5e9" font-size="9.5" font-weight="bold" text-anchor="middle">W = ${widthDim}</text>
      </g>
    `;
  }

  let formulasSvg = '';
  if (showFormulas) {
    formulasSvg = `
      <g transform="translate(10, ${svgH - 58})">
        <rect width="${svgW - 20}" height="50" rx="10" fill="#f8fafc" fill-opacity="0.95" stroke="#e2e8f0" stroke-width="1.5" />
        <text x="${svgW - 32}" y="20" text-anchor="start" fill="#1e293b" font-size="11" font-weight="bold" font-family="sans-serif">متوازي المستطيلات (Cuboid):</text>
        <text x="12" y="20" fill="#0284c7" font-size="10.5" font-weight="bold" font-family="sans-serif" text-anchor="end">الحجم: V = L × W × H = ${volume} ${unit}³</text>
        <text x="${svgW - 32}" y="38" text-anchor="start" fill="#64748b" font-size="10" font-family="sans-serif">المساحة: A = 2(LW + LH + WH) = ${area} ${unit}²</text>
        <text x="12" y="38" fill="#64748b" font-size="9.5" font-family="sans-serif" text-anchor="end">L: ${l} | W: ${widthDim} | H: ${heightDim} ${unit}</text>
      </g>
    `;
  }

  return `
    <svg width="100%" height="100%" viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;" dir="rtl">
      ${hiddenEdgesSvg}
      ${facesSvg}
      ${labelsSvg}
      ${formulasSvg}
    </svg>
  `;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDERER 3: 3D CYLINDER (أسطوانة دورانية ثلاثية الأبعاد)
   ═══════════════════════════════════════════════════════════════════════════ */

export function render3DCylinderSVG(props, w = 280, h = 280) {
  const r = parseFloat(props.r) || 6;
  const heightDim = parseFloat(props.h) || 12;
  const unit = escapeXml(props.unit || 'cm');
  const yaw = parseFloat(props.yaw !== undefined ? props.yaw : (props.rotY !== undefined ? props.rotY : 25));
  const pitch = parseFloat(props.pitch !== undefined ? props.pitch : (props.rotX !== undefined ? props.rotX : -20));
  const roll = parseFloat(props.roll !== undefined ? props.roll : (props.rotZ !== undefined ? props.rotZ : 0));
  const color = escapeXml(props.color || '#10b981');
  const opacity = Math.max(0.1, Math.min(1.0, parseFloat(props.opacity !== undefined ? props.opacity : 0.9)));
  const mode = props.renderMode || 'shaded-wireframe';
  const showLabels = props.showLabels !== false;
  const showFormulas = props.showFormulas !== false;
  const showHidden = props.showHiddenLines !== false;

  const svgW = Math.max(200, w);
  const svgH = Math.max(200, h);
  const cx = svgW / 2;
  const cy = showFormulas ? svgH * 0.44 : svgH / 2;
  const scale3d = (Math.min(svgW, svgH) * 0.32) / (Math.max(r * 2, heightDim) || 12);

  const radiusPx = r * scale3d;
  const halfH = (heightDim * scale3d) / 2;

  // Approximate top and bottom ellipses using 32 points
  const numPts = 36;
  const topPoints = [];
  const btmPoints = [];

  for (let i = 0; i < numPts; i++) {
    const theta = (i * 2 * Math.PI) / numPts;
    const x = radiusPx * Math.cos(theta);
    const z = radiusPx * Math.sin(theta);
    topPoints.push(project3D({ x, y: -halfH, z }, yaw, pitch, roll, 1, cx, cy));
    btmPoints.push(project3D({ x, y:  halfH, z }, yaw, pitch, roll, 1, cx, cy));
  }

  // Find lateral silhouette extrema
  let minTopIdx = 0, maxTopIdx = 0;
  for (let i = 1; i < numPts; i++) {
    if (topPoints[i].x2d < topPoints[minTopIdx].x2d) minTopIdx = i;
    if (topPoints[i].x2d > topPoints[maxTopIdx].x2d) maxTopIdx = i;
  }

  const topPath = topPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x2d} ${p.y2d}`).join(' ') + ' Z';
  const btmPath = btmPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x2d} ${p.y2d}`).join(' ') + ' Z';

  // Front half of bottom ellipse vs back half (dashed)
  const btmFrontPoints = [];
  const btmBackPoints = [];
  btmPoints.forEach(p => {
    if (p.depth < 0) btmFrontPoints.push(p);
    else btmBackPoints.push(p);
  });

  const pTopLeft = topPoints[minTopIdx];
  const pTopRight = topPoints[maxTopIdx];
  const pBtmLeft = btmPoints[minTopIdx];
  const pBtmRight = btmPoints[maxTopIdx];

  // Cylinder lateral body path
  // Sweep from left to right along top, then down to bottom right, along bottom front, up to top left
  const lateralPath = `M ${pTopLeft.x2d} ${pTopLeft.y2d} L ${pTopRight.x2d} ${pTopRight.y2d} L ${pBtmRight.x2d} ${pBtmRight.y2d} L ${pBtmLeft.x2d} ${pBtmLeft.y2d} Z`;

  const topCenter = project3D({ x: 0, y: -halfH, z: 0 }, yaw, pitch, roll, 1, cx, cy);
  const btmCenter = project3D({ x: 0, y:  halfH, z: 0 }, yaw, pitch, roll, 1, cx, cy);

  const topColor = adjustColorBrightness(color, 25);
  const bodyColor = color;
  const darkerBody = adjustColorBrightness(color, -25);

  const gradId = `cyl-grad-${Math.floor(Math.random() * 100000)}`;

  let cylinderSvg = `
    <defs>
      <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${darkerBody}" />
        <stop offset="35%" stop-color="${adjustColorBrightness(color, 15)}" />
        <stop offset="70%" stop-color="${color}" />
        <stop offset="100%" stop-color="${darkerBody}" />
      </linearGradient>
    </defs>
  `;

  // Hidden back curve of base
  if (showHidden && mode !== 'shaded') {
    cylinderSvg += `<path d="${btmPath}" fill="none" stroke="${color}" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.6" />`;
    cylinderSvg += `<line x1="${topCenter.x2d}" y1="${topCenter.y2d}" x2="${btmCenter.x2d}" y2="${btmCenter.y2d}" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />`;
  }

  // Shaded body
  if (mode !== 'wireframe') {
    cylinderSvg += `<path d="${lateralPath}" fill="url(#${gradId})" fill-opacity="${opacity}" stroke="none" />`;
    cylinderSvg += `<path d="${btmPath}" fill="${darkerBody}" fill-opacity="${opacity}" stroke="none" />`;
  }

  // Lateral silhouette strokes
  cylinderSvg += `<line x1="${pTopLeft.x2d}" y1="${pTopLeft.y2d}" x2="${pBtmLeft.x2d}" y2="${pBtmLeft.y2d}" stroke="#1e293b" stroke-width="1.5" />`;
  cylinderSvg += `<line x1="${pTopRight.x2d}" y1="${pTopRight.y2d}" x2="${pBtmRight.x2d}" y2="${pBtmRight.y2d}" stroke="#1e293b" stroke-width="1.5" />`;

  // Visible bottom front curve
  cylinderSvg += `<path d="M ${pBtmLeft.x2d} ${pBtmLeft.y2d} Q ${btmCenter.x2d} ${btmCenter.y2d + (pBtmLeft.y2d - topCenter.y2d) * 0.25} ${pBtmRight.x2d} ${pBtmRight.y2d}" fill="none" stroke="#1e293b" stroke-width="1.5" />`;

  // Top Base Face
  cylinderSvg += `<path d="${topPath}" fill="${mode === 'wireframe' ? 'none' : topColor}" fill-opacity="${opacity}" stroke="#1e293b" stroke-width="1.5" />`;

  // Radius line on top base
  if (showLabels) {
    const pEdge = topPoints[0];
    cylinderSvg += `
      <line x1="${topCenter.x2d}" y1="${topCenter.y2d}" x2="${pEdge.x2d}" y2="${pEdge.y2d}" stroke="#ef4444" stroke-width="1.5" />
      <circle cx="${topCenter.x2d}" cy="${topCenter.y2d}" r="2.5" fill="#ef4444" />
      <text x="${(topCenter.x2d + pEdge.x2d) / 2}" y="${(topCenter.y2d + pEdge.y2d) / 2 - 5}" fill="#dc2626" font-size="9" font-weight="bold" text-anchor="middle">r = ${r} ${unit}</text>
      
      <!-- Height dimension line -->
      <line x1="${pTopRight.x2d + 12}" y1="${pTopRight.y2d}" x2="${pBtmRight.x2d + 12}" y2="${pBtmRight.y2d}" stroke="#059669" stroke-width="1.5" />
      <line x1="${pTopRight.x2d + 8}" y1="${pTopRight.y2d}" x2="${pTopRight.x2d + 16}" y2="${pTopRight.y2d}" stroke="#059669" stroke-width="1.5" />
      <line x1="${pBtmRight.x2d + 8}" y1="${pBtmRight.y2d}" x2="${pBtmRight.x2d + 16}" y2="${pBtmRight.y2d}" stroke="#059669" stroke-width="1.5" />
      <text x="${pTopRight.x2d + 20}" y="${(pTopRight.y2d + pBtmRight.y2d) / 2 + 3}" fill="#059669" font-size="9.5" font-weight="bold">h = ${heightDim}</text>
    `;
  }

  const volume = Math.round(Math.PI * Math.pow(r, 2) * heightDim * 100) / 100;
  const area = Math.round(2 * Math.PI * r * (r + heightDim) * 100) / 100;

  let formulasSvg = '';
  if (showFormulas) {
    formulasSvg = `
      <g transform="translate(10, ${svgH - 58})">
        <rect width="${svgW - 20}" height="50" rx="10" fill="#f8fafc" fill-opacity="0.95" stroke="#e2e8f0" stroke-width="1.5" />
        <text x="${svgW - 32}" y="20" text-anchor="start" fill="#1e293b" font-size="11" font-weight="bold" font-family="sans-serif">الأسطوانة (Cylinder):</text>
        <text x="12" y="20" fill="#059669" font-size="10.5" font-weight="bold" font-family="sans-serif" text-anchor="end">الحجم: V = πr²h = ${volume} ${unit}³</text>
        <text x="${svgW - 32}" y="38" text-anchor="start" fill="#64748b" font-size="10" font-family="sans-serif">المساحة: A = 2πr(r + h) = ${area} ${unit}²</text>
        <text x="12" y="38" fill="#64748b" font-size="9.5" font-family="sans-serif" text-anchor="end">نصف القطر: ${r} | الارتفاع: ${heightDim} ${unit}</text>
      </g>
    `;
  }

  return `
    <svg width="100%" height="100%" viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;" dir="rtl">
      ${cylinderSvg}
      ${formulasSvg}
    </svg>
  `;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDERER 4: 3D CONE (مخروط دوراني)
   ═══════════════════════════════════════════════════════════════════════════ */

export function render3DConeSVG(props, w = 280, h = 280) {
  const r = parseFloat(props.r) || 6;
  const heightDim = parseFloat(props.h) || 12;
  const unit = escapeXml(props.unit || 'cm');
  const yaw = parseFloat(props.yaw !== undefined ? props.yaw : (props.rotY !== undefined ? props.rotY : 20));
  const pitch = parseFloat(props.pitch !== undefined ? props.pitch : (props.rotX !== undefined ? props.rotX : -15));
  const roll = parseFloat(props.roll !== undefined ? props.roll : (props.rotZ !== undefined ? props.rotZ : 0));
  const color = escapeXml(props.color || '#f59e0b');
  const opacity = Math.max(0.1, Math.min(1.0, parseFloat(props.opacity !== undefined ? props.opacity : 0.9)));
  const mode = props.renderMode || 'shaded-wireframe';
  const showLabels = props.showLabels !== false;
  const showFormulas = props.showFormulas !== false;
  const showHidden = props.showHiddenLines !== false;

  const svgW = Math.max(200, w);
  const svgH = Math.max(200, h);
  const cx = svgW / 2;
  const cy = showFormulas ? svgH * 0.44 : svgH / 2;
  const scale3d = (Math.min(svgW, svgH) * 0.32) / (Math.max(r * 2, heightDim) || 12);

  const radiusPx = r * scale3d;
  const halfH = (heightDim * scale3d) / 2;

  const numPts = 36;
  const btmPoints = [];
  for (let i = 0; i < numPts; i++) {
    const theta = (i * 2 * Math.PI) / numPts;
    const x = radiusPx * Math.cos(theta);
    const z = radiusPx * Math.sin(theta);
    btmPoints.push(project3D({ x, y: halfH, z }, yaw, pitch, roll, 1, cx, cy));
  }

  const apex = project3D({ x: 0, y: -halfH, z: 0 }, yaw, pitch, roll, 1, cx, cy);
  const btmCenter = project3D({ x: 0, y: halfH, z: 0 }, yaw, pitch, roll, 1, cx, cy);

  let minIdx = 0, maxIdx = 0;
  for (let i = 1; i < numPts; i++) {
    if (btmPoints[i].x2d < btmPoints[minIdx].x2d) minIdx = i;
    if (btmPoints[i].x2d > btmPoints[maxIdx].x2d) maxIdx = i;
  }

  const pBtmLeft = btmPoints[minIdx];
  const pBtmRight = btmPoints[maxIdx];
  const btmPath = btmPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x2d} ${p.y2d}`).join(' ') + ' Z';
  const coneBodyPath = `M ${apex.x2d} ${apex.y2d} L ${pBtmRight.x2d} ${pBtmRight.y2d} L ${pBtmLeft.x2d} ${pBtmLeft.y2d} Z`;

  const gradId = `cone-grad-${Math.floor(Math.random() * 100000)}`;
  const darkerBody = adjustColorBrightness(color, -30);

  let coneSvg = `
    <defs>
      <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${darkerBody}" />
        <stop offset="40%" stop-color="${adjustColorBrightness(color, 20)}" />
        <stop offset="80%" stop-color="${color}" />
        <stop offset="100%" stop-color="${darkerBody}" />
      </linearGradient>
    </defs>
  `;

  // Hidden dashed lines
  if (showHidden && mode !== 'shaded') {
    coneSvg += `<path d="${btmPath}" fill="none" stroke="${color}" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.6" />`;
    coneSvg += `<line x1="${apex.x2d}" y1="${apex.y2d}" x2="${btmCenter.x2d}" y2="${btmCenter.y2d}" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" />`;
    coneSvg += `<line x1="${btmCenter.x2d}" y1="${btmCenter.y2d}" x2="${pBtmRight.x2d}" y2="${pBtmRight.y2d}" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3" />`;
  }

  if (mode !== 'wireframe') {
    coneSvg += `<path d="${coneBodyPath}" fill="url(#${gradId})" fill-opacity="${opacity}" stroke="none" />`;
    coneSvg += `<path d="M ${pBtmLeft.x2d} ${pBtmLeft.y2d} Q ${btmCenter.x2d} ${btmCenter.y2d + (pBtmLeft.y2d - apex.y2d) * 0.25} ${pBtmRight.x2d} ${pBtmRight.y2d} Z" fill="${color}" fill-opacity="${opacity}" stroke="none" />`;
  }

  // Visible silhouette
  coneSvg += `<line x1="${apex.x2d}" y1="${apex.y2d}" x2="${pBtmLeft.x2d}" y2="${pBtmLeft.y2d}" stroke="#1e293b" stroke-width="1.5" />`;
  coneSvg += `<line x1="${apex.x2d}" y1="${apex.y2d}" x2="${pBtmRight.x2d}" y2="${pBtmRight.y2d}" stroke="#1e293b" stroke-width="1.5" />`;
  coneSvg += `<path d="M ${pBtmLeft.x2d} ${pBtmLeft.y2d} Q ${btmCenter.x2d} ${btmCenter.y2d + (pBtmLeft.y2d - apex.y2d) * 0.25} ${pBtmRight.x2d} ${pBtmRight.y2d}" fill="none" stroke="#1e293b" stroke-width="1.5" />`;

  const slantHeight = Math.round(Math.hypot(r, heightDim) * 100) / 100;
  const volume = Math.round((1/3) * Math.PI * Math.pow(r, 2) * heightDim * 100) / 100;
  const area = Math.round(Math.PI * r * (r + slantHeight) * 100) / 100;

  if (showLabels) {
    coneSvg += `
      <circle cx="${apex.x2d}" cy="${apex.y2d}" r="3" fill="#1e293b" />
      <circle cx="${btmCenter.x2d}" cy="${btmCenter.y2d}" r="2.5" fill="#ef4444" />
      <text x="${(btmCenter.x2d + pBtmRight.x2d) / 2}" y="${btmCenter.y2d - 4}" fill="#dc2626" font-size="9" font-weight="bold" text-anchor="middle">r = ${r}</text>
      <text x="${apex.x2d - 12}" y="${(apex.y2d + btmCenter.y2d) / 2}" fill="#0284c7" font-size="9.5" font-weight="bold">h = ${heightDim}</text>
      <text x="${(apex.x2d + pBtmLeft.x2d) / 2 - 14}" y="${(apex.y2d + pBtmLeft.y2d) / 2 - 5}" fill="#d97706" font-size="9" font-weight="bold">s = ${slantHeight}</text>
    `;
  }

  let formulasSvg = '';
  if (showFormulas) {
    formulasSvg = `
      <g transform="translate(10, ${svgH - 58})">
        <rect width="${svgW - 20}" height="50" rx="10" fill="#f8fafc" fill-opacity="0.95" stroke="#e2e8f0" stroke-width="1.5" />
        <text x="${svgW - 32}" y="20" text-anchor="start" fill="#1e293b" font-size="11" font-weight="bold" font-family="sans-serif">المخروط (Cone):</text>
        <text x="12" y="20" fill="#d97706" font-size="10.5" font-weight="bold" font-family="sans-serif" text-anchor="end">الحجم: V = ⅓πr²h = ${volume} ${unit}³</text>
        <text x="${svgW - 32}" y="38" text-anchor="start" fill="#64748b" font-size="10" font-family="sans-serif">المساحة: A = πr(r + s) = ${area} ${unit}² (s = ${slantHeight})</text>
        <text x="12" y="38" fill="#64748b" font-size="9.5" font-family="sans-serif" text-anchor="end">r: ${r} | h: ${heightDim} ${unit}</text>
      </g>
    `;
  }

  return `
    <svg width="100%" height="100%" viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;" dir="rtl">
      ${coneSvg}
      ${formulasSvg}
    </svg>
  `;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDERER 5: 3D SPHERE (كرة ثلاثية الأبعاد)
   ═══════════════════════════════════════════════════════════════════════════ */

export function render3DSphereSVG(props, w = 280, h = 280) {
  const r = parseFloat(props.r) || 8;
  const unit = escapeXml(props.unit || 'cm');
  const yaw = parseFloat(props.yaw !== undefined ? props.yaw : (props.rotY !== undefined ? props.rotY : 30));
  const pitch = parseFloat(props.pitch !== undefined ? props.pitch : (props.rotX !== undefined ? props.rotX : -20));
  const roll = parseFloat(props.roll !== undefined ? props.roll : (props.rotZ !== undefined ? props.rotZ : 0));
  const color = escapeXml(props.color || '#8b5cf6');
  const opacity = Math.max(0.1, Math.min(1.0, parseFloat(props.opacity !== undefined ? props.opacity : 0.95)));
  const mode = props.renderMode || 'shaded-wireframe';
  const showLabels = props.showLabels !== false;
  const showFormulas = props.showFormulas !== false;
  const showHidden = props.showHiddenLines !== false;

  const svgW = Math.max(200, w);
  const svgH = Math.max(200, h);
  const cx = svgW / 2;
  const cy = showFormulas ? svgH * 0.44 : svgH / 2;
  const scale3d = (Math.min(svgW, svgH) * 0.35) / (r || 8);
  const radiusPx = r * scale3d;

  const gradId = `sphere-grad-${Math.floor(Math.random() * 100000)}`;
  const lightColor = adjustColorBrightness(color, 65);
  const shadowColor = adjustColorBrightness(color, -55);

  // Equator ellipse points
  const numPts = 36;
  const eqPoints = [];
  const meridianPoints = [];

  for (let i = 0; i < numPts; i++) {
    const theta = (i * 2 * Math.PI) / numPts;
    // Equator (horizontal ring on XZ)
    const eqX = radiusPx * Math.cos(theta);
    const eqZ = radiusPx * Math.sin(theta);
    eqPoints.push(project3D({ x: eqX, y: 0, z: eqZ }, yaw, pitch, roll, 1, cx, cy));

    // Prime Meridian (vertical ring on YZ)
    const mY = radiusPx * Math.cos(theta);
    const mZ = radiusPx * Math.sin(theta);
    meridianPoints.push(project3D({ x: 0, y: mY, z: mZ }, yaw, pitch, roll, 1, cx, cy));
  }

  const eqPath = eqPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x2d} ${p.y2d}`).join(' ') + ' Z';
  const meridianPath = meridianPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x2d} ${p.y2d}`).join(' ') + ' Z';

  let sphereSvg = `
    <defs>
      <radialGradient id="${gradId}" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="${lightColor}" />
        <stop offset="45%" stop-color="${color}" />
        <stop offset="85%" stop-color="${shadowColor}" />
        <stop offset="100%" stop-color="#0f172a" />
      </radialGradient>
    </defs>
  `;

  // Sphere base circle
  if (mode !== 'wireframe') {
    sphereSvg += `<circle cx="${cx}" cy="${cy}" r="${radiusPx}" fill="url(#${gradId})" fill-opacity="${opacity}" stroke="#1e293b" stroke-width="1.5" />`;
  } else {
    sphereSvg += `<circle cx="${cx}" cy="${cy}" r="${radiusPx}" fill="none" stroke="#1e293b" stroke-width="2" />`;
  }

  // Equator Great Circle
  sphereSvg += `<path d="${eqPath}" fill="none" stroke="${mode === 'wireframe' ? color : '#ffffff'}" stroke-width="1.2" stroke-dasharray="${showHidden ? '4,3' : 'none'}" opacity="0.75" />`;

  // Prime Meridian
  sphereSvg += `<path d="${meridianPath}" fill="none" stroke="${mode === 'wireframe' ? color : '#ffffff'}" stroke-width="1.2" stroke-dasharray="${showHidden ? '4,3' : 'none'}" opacity="0.65" />`;

  // Center and Radius
  const centerP = project3D({ x: 0, y: 0, z: 0 }, yaw, pitch, roll, 1, cx, cy);
  const radiusEndP = project3D({ x: radiusPx, y: 0, z: 0 }, yaw, pitch, roll, 1, cx, cy);

  if (showLabels) {
    sphereSvg += `
      <line x1="${centerP.x2d}" y1="${centerP.y2d}" x2="${radiusEndP.x2d}" y2="${radiusEndP.y2d}" stroke="#ef4444" stroke-width="1.8" />
      <circle cx="${centerP.x2d}" cy="${centerP.y2d}" r="3" fill="#ef4444" />
      <circle cx="${radiusEndP.x2d}" cy="${radiusEndP.y2d}" r="2.5" fill="#ef4444" />
      <text x="${(centerP.x2d + radiusEndP.x2d) / 2}" y="${(centerP.y2d + radiusEndP.y2d) / 2 - 6}" fill="#dc2626" font-size="9.5" font-weight="bold" text-anchor="middle">r = ${r} ${unit}</text>
    `;
  }

  const volume = Math.round((4/3) * Math.PI * Math.pow(r, 3) * 100) / 100;
  const area = Math.round(4 * Math.PI * Math.pow(r, 2) * 100) / 100;

  let formulasSvg = '';
  if (showFormulas) {
    formulasSvg = `
      <g transform="translate(10, ${svgH - 58})">
        <rect width="${svgW - 20}" height="50" rx="10" fill="#f8fafc" fill-opacity="0.95" stroke="#e2e8f0" stroke-width="1.5" />
        <text x="${svgW - 32}" y="20" text-anchor="start" fill="#1e293b" font-size="11" font-weight="bold" font-family="sans-serif">الكرة (Sphere):</text>
        <text x="12" y="20" fill="#7c3aed" font-size="10.5" font-weight="bold" font-family="sans-serif" text-anchor="end">الحجم: V = ⁴⁄₃πr³ = ${volume} ${unit}³</text>
        <text x="${svgW - 32}" y="38" text-anchor="start" fill="#64748b" font-size="10" font-family="sans-serif">مساحة السطح: A = 4πr² = ${area} ${unit}²</text>
        <text x="12" y="38" fill="#64748b" font-size="9.5" font-family="sans-serif" text-anchor="end">نصف القطر: ${r} ${unit}</text>
      </g>
    `;
  }

  return `
    <svg width="100%" height="100%" viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;" dir="rtl">
      ${sphereSvg}
      ${formulasSvg}
    </svg>
  `;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDERER 6: 3D SQUARE PYRAMID (هرم رباعي منتظم)
   ═══════════════════════════════════════════════════════════════════════════ */

export function render3DPyramidSVG(props, w = 280, h = 280) {
  const a = parseFloat(props.a) || 10;
  const heightDim = parseFloat(props.h) || 12;
  const unit = escapeXml(props.unit || 'cm');
  const yaw = parseFloat(props.yaw !== undefined ? props.yaw : (props.rotY !== undefined ? props.rotY : 35));
  const pitch = parseFloat(props.pitch !== undefined ? props.pitch : (props.rotX !== undefined ? props.rotX : -20));
  const roll = parseFloat(props.roll !== undefined ? props.roll : (props.rotZ !== undefined ? props.rotZ : 0));
  const color = escapeXml(props.color || '#ec4899');
  const opacity = Math.max(0.1, Math.min(1.0, parseFloat(props.opacity !== undefined ? props.opacity : 0.9)));
  const mode = props.renderMode || 'shaded-wireframe';
  const showLabels = props.showLabels !== false;
  const showFormulas = props.showFormulas !== false;
  const showHidden = props.showHiddenLines !== false;

  const svgW = Math.max(200, w);
  const svgH = Math.max(200, h);
  const cx = svgW / 2;
  const cy = showFormulas ? svgH * 0.44 : svgH / 2;
  const scale3d = (Math.min(svgW, svgH) * 0.32) / (Math.max(a, heightDim) || 12);

  const half = (a * scale3d) / 2;
  const halfH = (heightDim * scale3d) / 2;

  // 5 Vertices: Base 0..3 and Apex 4
  const rawVertices = [
    { x: -half, y:  halfH, z: -half }, // 0: Front Left
    { x:  half, y:  halfH, z: -half }, // 1: Front Right
    { x:  half, y:  halfH, z:  half }, // 2: Back Right
    { x: -half, y:  halfH, z:  half }, // 3: Back Left
    { x:     0, y: -halfH, z:     0 }  // 4: Apex
  ];

  const proj = rawVertices.map(v => project3D(v, yaw, pitch, roll, 1, cx, cy));

  const faces = [
    { idx: [0, 1, 4], normal: calculateFaceNormal(rawVertices[0], rawVertices[1], rawVertices[4]) },
    { idx: [1, 2, 4], normal: calculateFaceNormal(rawVertices[1], rawVertices[2], rawVertices[4]) },
    { idx: [2, 3, 4], normal: calculateFaceNormal(rawVertices[2], rawVertices[3], rawVertices[4]) },
    { idx: [3, 0, 4], normal: calculateFaceNormal(rawVertices[3], rawVertices[0], rawVertices[4]) },
    { idx: [3, 2, 1, 0], normal: calculateFaceNormal(rawVertices[3], rawVertices[2], rawVertices[1]) } // Base
  ];

  faces.forEach(f => {
    let rotN = rotateNormal(f.normal, yaw, pitch, roll);
    f.rotNormal = rotN;
    f.isVisible = rotN.z < 0;
    f.avgZ = f.idx.reduce((sum, i) => sum + proj[i].depth, 0) / f.idx.length;
    f.shadeColor = computeLighting(rotN, color);
  });

  const sortedFaces = [...faces].sort((a, b) => b.avgZ - a.avgZ);

  let hiddenEdgesSvg = '';
  if (showHidden && mode !== 'shaded') {
    const allEdges = [
      [0,1],[1,2],[2,3],[3,0],[0,4],[1,4],[2,4],[3,4]
    ];
    allEdges.forEach(([i1, i2]) => {
      const adjFaces = faces.filter(f => f.idx.includes(i1) && f.idx.includes(i2));
      const isHiddenEdge = adjFaces.length > 0 && adjFaces.every(f => !f.isVisible);
      if (isHiddenEdge) {
        hiddenEdgesSvg += `<line x1="${proj[i1].x2d}" y1="${proj[i1].y2d}" x2="${proj[i2].x2d}" y2="${proj[i2].y2d}" stroke="${color}" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.65" />`;
      }
    });
  }

  let facesSvg = '';
  sortedFaces.forEach(f => {
    if (!f.isVisible && mode === 'shaded') return;
    const pts = f.idx.map(i => `${proj[i].x2d},${proj[i].y2d}`).join(' ');
    const fillColor = mode === 'wireframe' ? 'none' : f.shadeColor;
    const fillOp = mode === 'wireframe' ? '0' : opacity;
    const strokeColor = (mode === 'shaded') ? f.shadeColor : '#1e293b';

    if (f.isVisible || mode === 'wireframe') {
      facesSvg += `<polygon points="${pts}" fill="${fillColor}" fill-opacity="${fillOp}" stroke="${strokeColor}" stroke-width="1.5" stroke-linejoin="round" />`;
    }
  });

  const slantHeight = Math.round(Math.hypot(heightDim, a / 2) * 100) / 100;
  const volume = Math.round((1/3) * Math.pow(a, 2) * heightDim * 100) / 100;
  const area = Math.round((Math.pow(a, 2) + 2 * a * slantHeight) * 100) / 100;

  let labelsSvg = '';
  if (showLabels) {
    const p0 = proj[0];
    const p1 = proj[1];
    const p4 = proj[4];
    labelsSvg = `
      <g>
        <rect x="${(p0.x2d + p1.x2d) / 2 - 20}" y="${(p0.y2d + p1.y2d) / 2 + 6}" width="40" height="15" rx="3" fill="#ffffff" fill-opacity="0.9" stroke="#cbd5e1" stroke-width="1" />
        <text x="${(p0.x2d + p1.x2d) / 2}" y="${(p0.y2d + p1.y2d) / 2 + 17}" fill="#be185d" font-size="9.5" font-weight="bold" text-anchor="middle">a = ${a} ${unit}</text>
        <circle cx="${p4.x2d}" cy="${p4.y2d}" r="3" fill="#1e293b" />
        <text x="${p4.x2d}" y="${p4.y2d - 7}" fill="#1e293b" font-size="9.5" font-weight="bold" text-anchor="middle">الرأس S</text>
      </g>
    `;
  }

  let formulasSvg = '';
  if (showFormulas) {
    formulasSvg = `
      <g transform="translate(10, ${svgH - 58})">
        <rect width="${svgW - 20}" height="50" rx="10" fill="#f8fafc" fill-opacity="0.95" stroke="#e2e8f0" stroke-width="1.5" />
        <text x="${svgW - 32}" y="20" text-anchor="start" fill="#1e293b" font-size="11" font-weight="bold" font-family="sans-serif">الهرم الرباعي (Pyramid):</text>
        <text x="12" y="20" fill="#db2777" font-size="10.5" font-weight="bold" font-family="sans-serif" text-anchor="end">الحجم: V = ⅓a²h = ${volume} ${unit}³</text>
        <text x="${svgW - 32}" y="38" text-anchor="start" fill="#64748b" font-size="10" font-family="sans-serif">المساحة: A = a² + 2as = ${area} ${unit}² (s = ${slantHeight})</text>
        <text x="12" y="38" fill="#64748b" font-size="9.5" font-family="sans-serif" text-anchor="end">a: ${a} | h: ${heightDim} ${unit}</text>
      </g>
    `;
  }

  return `
    <svg width="100%" height="100%" viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;" dir="rtl">
      ${hiddenEdgesSvg}
      ${facesSvg}
      ${labelsSvg}
      ${formulasSvg}
    </svg>
  `;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDERER 7: 3D TRIANGULAR PRISM (منشور ثلاثي القائم)
   ═══════════════════════════════════════════════════════════════════════════ */

export function render3DTriangularPrismSVG(props, w = 300, h = 280) {
  const b = parseFloat(props.b) || 10;
  const heightTri = parseFloat(props.h) || 9;
  const l = parseFloat(props.l) || 14;
  const unit = escapeXml(props.unit || 'cm');
  const yaw = parseFloat(props.yaw !== undefined ? props.yaw : (props.rotY !== undefined ? props.rotY : 40));
  const pitch = parseFloat(props.pitch !== undefined ? props.pitch : (props.rotX !== undefined ? props.rotX : -20));
  const roll = parseFloat(props.roll !== undefined ? props.roll : (props.rotZ !== undefined ? props.rotZ : 0));
  const color = escapeXml(props.color || '#14b8a6');
  const opacity = Math.max(0.1, Math.min(1.0, parseFloat(props.opacity !== undefined ? props.opacity : 0.9)));
  const mode = props.renderMode || 'shaded-wireframe';
  const showLabels = props.showLabels !== false;
  const showFormulas = props.showFormulas !== false;
  const showHidden = props.showHiddenLines !== false;

  const svgW = Math.max(220, w);
  const svgH = Math.max(200, h);
  const cx = svgW / 2;
  const cy = showFormulas ? svgH * 0.44 : svgH / 2;
  const scale3d = (Math.min(svgW, svgH) * 0.32) / (Math.max(b, heightTri, l) || 14);

  const halfB = (b * scale3d) / 2;
  const halfH = (heightTri * scale3d) / 2;
  const halfL = (l * scale3d) / 2;

  // 6 Vertices: Front Triangle (0, 1, 2) and Back Triangle (3, 4, 5)
  const rawVertices = [
    { x: -halfB, y:  halfH, z: -halfL }, // 0: Front Left Base
    { x:  halfB, y:  halfH, z: -halfL }, // 1: Front Right Base
    { x:      0, y: -halfH, z: -halfL }, // 2: Front Top Apex
    { x: -halfB, y:  halfH, z:  halfL }, // 3: Back Left Base
    { x:  halfB, y:  halfH, z:  halfL }, // 4: Back Right Base
    { x:      0, y: -halfH, z:  halfL }  // 5: Back Top Apex
  ];

  const proj = rawVertices.map(v => project3D(v, yaw, pitch, roll, 1, cx, cy));

  const faces = [
    { idx: [0, 1, 2], normal: calculateFaceNormal(rawVertices[0], rawVertices[1], rawVertices[2]) }, // Front Triangle
    { idx: [4, 3, 5], normal: calculateFaceNormal(rawVertices[4], rawVertices[3], rawVertices[5]) }, // Back Triangle
    { idx: [0, 3, 4, 1], normal: calculateFaceNormal(rawVertices[0], rawVertices[3], rawVertices[4]) }, // Bottom Rectangle
    { idx: [1, 4, 5, 2], normal: calculateFaceNormal(rawVertices[1], rawVertices[4], rawVertices[5]) }, // Right Inclined
    { idx: [3, 0, 2, 5], normal: calculateFaceNormal(rawVertices[3], rawVertices[0], rawVertices[2]) }  // Left Inclined
  ];

  faces.forEach(f => {
    let rotN = rotateNormal(f.normal, yaw, pitch, roll);
    f.rotNormal = rotN;
    f.isVisible = rotN.z < 0;
    f.avgZ = f.idx.reduce((sum, i) => sum + proj[i].depth, 0) / f.idx.length;
    f.shadeColor = computeLighting(rotN, color);
  });

  const sortedFaces = [...faces].sort((a, b) => b.avgZ - a.avgZ);

  let hiddenEdgesSvg = '';
  if (showHidden && mode !== 'shaded') {
    const allEdges = [
      [0,1],[1,2],[2,0],[3,4],[4,5],[5,3],[0,3],[1,4],[2,5]
    ];
    allEdges.forEach(([i1, i2]) => {
      const adjFaces = faces.filter(f => f.idx.includes(i1) && f.idx.includes(i2));
      const isHiddenEdge = adjFaces.length > 0 && adjFaces.every(f => !f.isVisible);
      if (isHiddenEdge) {
        hiddenEdgesSvg += `<line x1="${proj[i1].x2d}" y1="${proj[i1].y2d}" x2="${proj[i2].x2d}" y2="${proj[i2].y2d}" stroke="${color}" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.65" />`;
      }
    });
  }

  let facesSvg = '';
  sortedFaces.forEach(f => {
    if (!f.isVisible && mode === 'shaded') return;
    const pts = f.idx.map(i => `${proj[i].x2d},${proj[i].y2d}`).join(' ');
    const fillColor = mode === 'wireframe' ? 'none' : f.shadeColor;
    const fillOp = mode === 'wireframe' ? '0' : opacity;
    const strokeColor = (mode === 'shaded') ? f.shadeColor : '#1e293b';

    if (f.isVisible || mode === 'wireframe') {
      facesSvg += `<polygon points="${pts}" fill="${fillColor}" fill-opacity="${fillOp}" stroke="${strokeColor}" stroke-width="1.5" stroke-linejoin="round" />`;
    }
  });

  const baseArea = (1/2) * b * heightTri;
  const volume = Math.round(baseArea * l * 100) / 100;

  let formulasSvg = '';
  if (showFormulas) {
    formulasSvg = `
      <g transform="translate(10, ${svgH - 58})">
        <rect width="${svgW - 20}" height="50" rx="10" fill="#f8fafc" fill-opacity="0.95" stroke="#e2e8f0" stroke-width="1.5" />
        <text x="${svgW - 32}" y="20" text-anchor="start" fill="#1e293b" font-size="11" font-weight="bold" font-family="sans-serif">المنشور الثلاثي (Triangular Prism):</text>
        <text x="12" y="20" fill="#0d9488" font-size="10.5" font-weight="bold" font-family="sans-serif" text-anchor="end">الحجم: V = S_base × L = ${volume} ${unit}³</text>
        <text x="${svgW - 32}" y="38" text-anchor="start" fill="#64748b" font-size="10" font-family="sans-serif">مساحة القاعدة: S = ½(b×h) = ${baseArea} ${unit}²</text>
        <text x="12" y="38" fill="#64748b" font-size="9.5" font-family="sans-serif" text-anchor="end">القاعدة: ${b} | الارتفاع: ${heightTri} | الطول: ${l} ${unit}</text>
      </g>
    `;
  }

  return `
    <svg width="100%" height="100%" viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;" dir="rtl">
      ${hiddenEdgesSvg}
      ${facesSvg}
      ${formulasSvg}
    </svg>
  `;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDERER 8: 3D CAPSULE (كبسولة هندسية)
   ═══════════════════════════════════════════════════════════════════════════ */

export function render3DCapsuleSVG(props, w = 280, h = 280) {
  const r = parseFloat(props.r) || 5;
  const l = parseFloat(props.l) || 10;
  const unit = escapeXml(props.unit || 'cm');
  const yaw = parseFloat(props.yaw !== undefined ? props.yaw : (props.rotY !== undefined ? props.rotY : 30));
  const pitch = parseFloat(props.pitch !== undefined ? props.pitch : (props.rotX !== undefined ? props.rotX : -20));
  const roll = parseFloat(props.roll !== undefined ? props.roll : (props.rotZ !== undefined ? props.rotZ : 0));
  const color = escapeXml(props.color || '#f43f5e');
  const opacity = Math.max(0.1, Math.min(1.0, parseFloat(props.opacity !== undefined ? props.opacity : 0.9)));
  const mode = props.renderMode || 'shaded-wireframe';
  const showLabels = props.showLabels !== false;
  const showFormulas = props.showFormulas !== false;

  const svgW = Math.max(200, w);
  const svgH = Math.max(200, h);
  const cx = svgW / 2;
  const cy = showFormulas ? svgH * 0.44 : svgH / 2;
  const scale3d = (Math.min(svgW, svgH) * 0.35) / ((l + r * 2) || 20);

  const radiusPx = r * scale3d;
  const halfL = (l * scale3d) / 2;

  const p1 = project3D({ x: -halfL, y: 0, z: 0 }, yaw, pitch, roll, 1, cx, cy);
  const p2 = project3D({ x:  halfL, y: 0, z: 0 }, yaw, pitch, roll, 1, cx, cy);

  const angleRad = Math.atan2(p2.y2d - p1.y2d, p2.x2d - p1.x2d);
  const angleDeg = (angleRad * 180) / Math.PI;
  const dist = Math.hypot(p2.x2d - p1.x2d, p2.y2d - p1.y2d);

  const gradId = `capsule-grad-${Math.floor(Math.random() * 100000)}`;
  const lightColor = adjustColorBrightness(color, 40);
  const darkColor = adjustColorBrightness(color, -40);

  const volume = Math.round((Math.PI * Math.pow(r, 2) * l + (4/3) * Math.PI * Math.pow(r, 3)) * 100) / 100;
  const area = Math.round((2 * Math.PI * r * l + 4 * Math.PI * Math.pow(r, 2)) * 100) / 100;

  let capsuleSvg = `
    <defs>
      <linearGradient id="${gradId}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${lightColor}" />
        <stop offset="50%" stop-color="${color}" />
        <stop offset="100%" stop-color="${darkColor}" />
      </linearGradient>
    </defs>
    <g transform="translate(${p1.x2d}, ${p1.y2d}) rotate(${angleDeg})">
      <!-- Cylindrical Body + Caps -->
      <rect x="0" y="${-radiusPx}" width="${dist}" height="${radiusPx * 2}" rx="${radiusPx}" fill="url(#${gradId})" fill-opacity="${opacity}" stroke="#1e293b" stroke-width="1.5" />
      <line x1="0" y1="${-radiusPx}" x2="0" y2="${radiusPx}" stroke="#ffffff" stroke-width="1" stroke-dasharray="3,3" opacity="0.7" />
      <line x1="${dist}" y1="${-radiusPx}" x2="${dist}" y2="${radiusPx}" stroke="#ffffff" stroke-width="1" stroke-dasharray="3,3" opacity="0.7" />
    </g>
  `;

  let formulasSvg = '';
  if (showFormulas) {
    formulasSvg = `
      <g transform="translate(10, ${svgH - 58})">
        <rect width="${svgW - 20}" height="50" rx="10" fill="#f8fafc" fill-opacity="0.95" stroke="#e2e8f0" stroke-width="1.5" />
        <text x="${svgW - 32}" y="20" text-anchor="start" fill="#1e293b" font-size="11" font-weight="bold" font-family="sans-serif">الكبسولة (Capsule):</text>
        <text x="12" y="20" fill="#e11d48" font-size="10.5" font-weight="bold" font-family="sans-serif" text-anchor="end">الحجم: V = πr²L + ⁴⁄₃πr³ = ${volume} ${unit}³</text>
        <text x="${svgW - 32}" y="38" text-anchor="start" fill="#64748b" font-size="10" font-family="sans-serif">المساحة: A = 2πrL + 4πr² = ${area} ${unit}²</text>
        <text x="12" y="38" fill="#64748b" font-size="9.5" font-family="sans-serif" text-anchor="end">r: ${r} | L: ${l} ${unit}</text>
      </g>
    `;
  }

  return `
    <svg width="100%" height="100%" viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;" dir="rtl">
      ${capsuleSvg}
      ${formulasSvg}
    </svg>
  `;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDERER 9: 3D HEMISPHERE (نصف كرة)
   ═══════════════════════════════════════════════════════════════════════════ */

export function render3DHemisphereSVG(props, w = 280, h = 280) {
  const r = parseFloat(props.r) || 8;
  const unit = escapeXml(props.unit || 'cm');
  const yaw = parseFloat(props.yaw !== undefined ? props.yaw : (props.rotY !== undefined ? props.rotY : 30));
  const pitch = parseFloat(props.pitch !== undefined ? props.pitch : (props.rotX !== undefined ? props.rotX : -25));
  const roll = parseFloat(props.roll !== undefined ? props.roll : (props.rotZ !== undefined ? props.rotZ : 0));
  const color = escapeXml(props.color || '#6366f1');
  const opacity = Math.max(0.1, Math.min(1.0, parseFloat(props.opacity !== undefined ? props.opacity : 0.9)));
  const mode = props.renderMode || 'shaded-wireframe';
  const showLabels = props.showLabels !== false;
  const showFormulas = props.showFormulas !== false;

  const svgW = Math.max(200, w);
  const svgH = Math.max(200, h);
  const cx = svgW / 2;
  const cy = showFormulas ? svgH * 0.44 : svgH / 2;
  const scale3d = (Math.min(svgW, svgH) * 0.35) / (r || 8);
  const radiusPx = r * scale3d;

  const gradId = `hemi-grad-${Math.floor(Math.random() * 100000)}`;
  const lightColor = adjustColorBrightness(color, 45);
  const darkColor = adjustColorBrightness(color, -40);

  const numPts = 36;
  const basePoints = [];
  for (let i = 0; i < numPts; i++) {
    const theta = (i * 2 * Math.PI) / numPts;
    const x = radiusPx * Math.cos(theta);
    const z = radiusPx * Math.sin(theta);
    basePoints.push(project3D({ x, y: 0, z }, yaw, pitch, roll, 1, cx, cy));
  }
  const basePath = basePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x2d} ${p.y2d}`).join(' ') + ' Z';

  const volume = Math.round((2/3) * Math.PI * Math.pow(r, 3) * 100) / 100;
  const area = Math.round(3 * Math.PI * Math.pow(r, 2) * 100) / 100;

  let hemiSvg = `
    <defs>
      <radialGradient id="${gradId}" cx="40%" cy="30%" r="65%">
        <stop offset="0%" stop-color="${lightColor}" />
        <stop offset="60%" stop-color="${color}" />
        <stop offset="100%" stop-color="${darkColor}" />
      </radialGradient>
    </defs>
    <!-- Dome -->
    <path d="M ${cx - radiusPx} ${cy} A ${radiusPx} ${radiusPx} 0 0 1 ${cx + radiusPx} ${cy} Z" fill="url(#${gradId})" fill-opacity="${opacity}" stroke="#1e293b" stroke-width="1.5" />
    <!-- Circular Flat Base -->
    <path d="${basePath}" fill="${adjustColorBrightness(color, 15)}" fill-opacity="${opacity}" stroke="#1e293b" stroke-width="1.5" />
  `;

  let formulasSvg = '';
  if (showFormulas) {
    formulasSvg = `
      <g transform="translate(10, ${svgH - 58})">
        <rect width="${svgW - 20}" height="50" rx="10" fill="#f8fafc" fill-opacity="0.95" stroke="#e2e8f0" stroke-width="1.5" />
        <text x="${svgW - 32}" y="20" text-anchor="start" fill="#1e293b" font-size="11" font-weight="bold" font-family="sans-serif">نصف الكرة (Hemisphere):</text>
        <text x="12" y="20" fill="#4f46e5" font-size="10.5" font-weight="bold" font-family="sans-serif" text-anchor="end">الحجم: V = ⅔πr³ = ${volume} ${unit}³</text>
        <text x="${svgW - 32}" y="38" text-anchor="start" fill="#64748b" font-size="10" font-family="sans-serif">المساحة الكلية: A = 3πr² = ${area} ${unit}²</text>
        <text x="12" y="38" fill="#64748b" font-size="9.5" font-family="sans-serif" text-anchor="end">r: ${r} ${unit}</text>
      </g>
    `;
  }

  return `
    <svg width="100%" height="100%" viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;" dir="rtl">
      ${hemiSvg}
      ${formulasSvg}
    </svg>
  `;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDERER 10: 3D TORUS (طارة حلقية ثلاثية الأبعاد)
   ═══════════════════════════════════════════════════════════════════════════ */

export function render3DTorusSVG(props, w = 280, h = 280) {
  const R = parseFloat(props.R) || 9;
  const r = parseFloat(props.r) || 3;
  const unit = escapeXml(props.unit || 'cm');
  const yaw = parseFloat(props.yaw !== undefined ? props.yaw : (props.rotY !== undefined ? props.rotY : 35));
  const pitch = parseFloat(props.pitch !== undefined ? props.pitch : (props.rotX !== undefined ? props.rotX : -35));
  const roll = parseFloat(props.roll !== undefined ? props.roll : (props.rotZ !== undefined ? props.rotZ : 0));
  const color = escapeXml(props.color || '#eab308');
  const opacity = Math.max(0.1, Math.min(1.0, parseFloat(props.opacity !== undefined ? props.opacity : 0.9)));
  const mode = props.renderMode || 'shaded-wireframe';
  const showFormulas = props.showFormulas !== false;

  const svgW = Math.max(200, w);
  const svgH = Math.max(200, h);
  const cx = svgW / 2;
  const cy = showFormulas ? svgH * 0.44 : svgH / 2;
  const scale3d = (Math.min(svgW, svgH) * 0.35) / ((R + r) || 12);

  const bigR = R * scale3d;
  const smallR = r * scale3d;

  const gradId = `torus-grad-${Math.floor(Math.random() * 100000)}`;
  const lightColor = adjustColorBrightness(color, 45);
  const darkColor = adjustColorBrightness(color, -40);

  const volume = Math.round(2 * Math.pow(Math.PI, 2) * R * Math.pow(r, 2) * 100) / 100;
  const area = Math.round(4 * Math.pow(Math.PI, 2) * R * r * 100) / 100;

  // Approximate Torus using outer ellipse and inner hole ellipse with 3D perspective
  const torusSvg = `
    <defs>
      <radialGradient id="${gradId}" cx="45%" cy="35%" r="60%">
        <stop offset="0%" stop-color="${lightColor}" />
        <stop offset="50%" stop-color="${color}" />
        <stop offset="100%" stop-color="${darkColor}" />
      </radialGradient>
    </defs>
    <!-- Outer Torus Ring -->
    <ellipse cx="${cx}" cy="${cy}" rx="${bigR + smallR}" ry="${(bigR + smallR) * 0.6}" fill="url(#${gradId})" fill-opacity="${opacity}" stroke="#1e293b" stroke-width="1.5" />
    <!-- Inner Hole (Cutout) -->
    <ellipse cx="${cx}" cy="${cy}" rx="${Math.max(5, bigR - smallR)}" ry="${Math.max(3, (bigR - smallR) * 0.6)}" fill="#f8fafc" stroke="#1e293b" stroke-width="1.5" />
  `;

  let formulasSvg = '';
  if (showFormulas) {
    formulasSvg = `
      <g transform="translate(10, ${svgH - 58})">
        <rect width="${svgW - 20}" height="50" rx="10" fill="#f8fafc" fill-opacity="0.95" stroke="#e2e8f0" stroke-width="1.5" />
        <text x="${svgW - 32}" y="20" text-anchor="start" fill="#1e293b" font-size="11" font-weight="bold" font-family="sans-serif">الطارة الحلقية (Torus):</text>
        <text x="12" y="20" fill="#ca8a04" font-size="10.5" font-weight="bold" font-family="sans-serif" text-anchor="end">الحجم: V = 2π²Rr² = ${volume} ${unit}³</text>
        <text x="${svgW - 32}" y="38" text-anchor="start" fill="#64748b" font-size="10" font-family="sans-serif">المساحة: A = 4π²Rr = ${area} ${unit}²</text>
        <text x="12" y="38" fill="#64748b" font-size="9.5" font-family="sans-serif" text-anchor="end">R: ${R} | r: ${r} ${unit}</text>
      </g>
    `;
  }

  return `
    <svg width="100%" height="100%" viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;" dir="rtl">
      ${torusSvg}
      ${formulasSvg}
    </svg>
  `;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDERER 11: 3D TETRAHEDRON (رباعي الوجوه المنتظم)
   ═══════════════════════════════════════════════════════════════════════════ */

export function render3DTetrahedronSVG(props, w = 280, h = 280) {
  const a = parseFloat(props.a) || 10;
  const unit = escapeXml(props.unit || 'cm');
  const yaw = parseFloat(props.yaw !== undefined ? props.yaw : (props.rotY !== undefined ? props.rotY : 30));
  const pitch = parseFloat(props.pitch !== undefined ? props.pitch : (props.rotX !== undefined ? props.rotX : -20));
  const roll = parseFloat(props.roll !== undefined ? props.roll : (props.rotZ !== undefined ? props.rotZ : 0));
  const color = escapeXml(props.color || '#a855f7');
  const opacity = Math.max(0.1, Math.min(1.0, parseFloat(props.opacity !== undefined ? props.opacity : 0.9)));
  const mode = props.renderMode || 'shaded-wireframe';
  const showLabels = props.showLabels !== false;
  const showFormulas = props.showFormulas !== false;
  const showHidden = props.showHiddenLines !== false;

  const svgW = Math.max(200, w);
  const svgH = Math.max(200, h);
  const cx = svgW / 2;
  const cy = showFormulas ? svgH * 0.44 : svgH / 2;
  const scale3d = (Math.min(svgW, svgH) * 0.35) / (a || 10);

  const s = a * scale3d;
  const rawVertices = [
    { x:  s / Math.sqrt(3), y:  s / (2 * Math.sqrt(6)), z:  0 },
    { x: -s / (2 * Math.sqrt(3)), y:  s / (2 * Math.sqrt(6)), z:  s / 2 },
    { x: -s / (2 * Math.sqrt(3)), y:  s / (2 * Math.sqrt(6)), z: -s / 2 },
    { x:  0, y: -s * Math.sqrt(3/8), z:  0 }
  ];

  const proj = rawVertices.map(v => project3D(v, yaw, pitch, roll, 1, cx, cy));

  const faces = [
    { idx: [0, 1, 3], normal: calculateFaceNormal(rawVertices[0], rawVertices[1], rawVertices[3]) },
    { idx: [1, 2, 3], normal: calculateFaceNormal(rawVertices[1], rawVertices[2], rawVertices[3]) },
    { idx: [2, 0, 3], normal: calculateFaceNormal(rawVertices[2], rawVertices[0], rawVertices[3]) },
    { idx: [2, 1, 0], normal: calculateFaceNormal(rawVertices[2], rawVertices[1], rawVertices[0]) } // Base
  ];

  faces.forEach(f => {
    let rotN = rotateNormal(f.normal, yaw, pitch, roll);
    f.rotNormal = rotN;
    f.isVisible = rotN.z < 0;
    f.avgZ = f.idx.reduce((sum, i) => sum + proj[i].depth, 0) / 3;
    f.shadeColor = computeLighting(rotN, color);
  });

  const sortedFaces = [...faces].sort((a, b) => b.avgZ - a.avgZ);

  let hiddenEdgesSvg = '';
  if (showHidden && mode !== 'shaded') {
    const allEdges = [[0,1],[1,2],[2,0],[0,3],[1,3],[2,3]];
    allEdges.forEach(([i1, i2]) => {
      const adjFaces = faces.filter(f => f.idx.includes(i1) && f.idx.includes(i2));
      const isHiddenEdge = adjFaces.length > 0 && adjFaces.every(f => !f.isVisible);
      if (isHiddenEdge) {
        hiddenEdgesSvg += `<line x1="${proj[i1].x2d}" y1="${proj[i1].y2d}" x2="${proj[i2].x2d}" y2="${proj[i2].y2d}" stroke="${color}" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.65" />`;
      }
    });
  }

  let facesSvg = '';
  sortedFaces.forEach(f => {
    if (!f.isVisible && mode === 'shaded') return;
    const pts = f.idx.map(i => `${proj[i].x2d},${proj[i].y2d}`).join(' ');
    const fillColor = mode === 'wireframe' ? 'none' : f.shadeColor;
    const fillOp = mode === 'wireframe' ? '0' : opacity;
    const strokeColor = (mode === 'shaded') ? f.shadeColor : '#1e293b';

    if (f.isVisible || mode === 'wireframe') {
      facesSvg += `<polygon points="${pts}" fill="${fillColor}" fill-opacity="${fillOp}" stroke="${strokeColor}" stroke-width="1.5" stroke-linejoin="round" />`;
    }
  });

  const volume = Math.round((Math.pow(a, 3) / (6 * Math.SQRT2)) * 100) / 100;
  const area = Math.round(Math.sqrt(3) * Math.pow(a, 2) * 100) / 100;

  let formulasSvg = '';
  if (showFormulas) {
    formulasSvg = `
      <g transform="translate(10, ${svgH - 58})">
        <rect width="${svgW - 20}" height="50" rx="10" fill="#f8fafc" fill-opacity="0.95" stroke="#e2e8f0" stroke-width="1.5" />
        <text x="${svgW - 32}" y="20" text-anchor="start" fill="#1e293b" font-size="11" font-weight="bold" font-family="sans-serif">رباعي الوجوه (Tetrahedron):</text>
        <text x="12" y="20" fill="#9333ea" font-size="10.5" font-weight="bold" font-family="sans-serif" text-anchor="end">الحجم: V = a³/(6√2) = ${volume} ${unit}³</text>
        <text x="${svgW - 32}" y="38" text-anchor="start" fill="#64748b" font-size="10" font-family="sans-serif">المساحة: A = √3 a² = ${area} ${unit}²</text>
        <text x="12" y="38" fill="#64748b" font-size="9.5" font-family="sans-serif" text-anchor="end">طول الحرف a = ${a} ${unit}</text>
      </g>
    `;
  }

  return `
    <svg width="100%" height="100%" viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;" dir="rtl">
      ${hiddenEdgesSvg}
      ${facesSvg}
      ${formulasSvg}
    </svg>
  `;
}

export const SHAPES_3D_COLOR_PRESETS = [
  '#3b82f6', '#0284c7', '#0d9488', '#16a34a',
  '#ea580c', '#e11d48', '#9333ea', '#475569'
];

/**
 * Universal 3D Shape SVG Renderer Dispatcher
 */
export function render3DShapeSVG(type, props = {}, w = 300, h = 280) {
  const cleanType = String(type).replace(/^shapes3d\./, '').replace(/^shape_3d_/, '').replace(/-/g, '_');
  switch (cleanType) {
    case 'cube':
      return render3DCubeSVG(props, w, h);
    case 'cuboid':
      return render3DCuboidSVG(props, w, h);
    case 'cylinder':
      return render3DCylinderSVG(props, w, h);
    case 'cone':
      return render3DConeSVG(props, w, h);
    case 'sphere':
      return render3DSphereSVG(props, w, h);
    case 'pyramid':
      return render3DPyramidSVG(props, w, h);
    case 'triangular_prism':
    case 'triangularprism':
      return render3DTriangularPrismSVG(props, w, h);
    case 'capsule':
      return render3DCapsuleSVG(props, w, h);
    case 'hemisphere':
      return render3DHemisphereSVG(props, w, h);
    case 'torus':
      return render3DTorusSVG(props, w, h);
    case 'tetrahedron':
      return render3DTetrahedronSVG(props, w, h);
    default:
      return render3DCubeSVG(props, w, h);
  }
}
