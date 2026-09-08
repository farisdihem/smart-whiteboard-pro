# 🚀 3D Volumetric Components Engine & Comprehensive Reference Guide
> **Project**: Smart Whiteboard (السبورة الذكية - الجزائر)
> **Target Audience**: AI Agents & Engineering Team Working on the Codebase
> **File Scope**: `app.js`, `data/shapes3d_engine.js`, and all 3D subject components.

---

## 📌 Executive Architectural Overview

This document provides an exhaustive, line-by-level architectural guide for the **3D Volumetric System** in the Smart Whiteboard application. It explains how **3D Geometric Shapes in Mathematics (`shapes3d.*`)** and **3D Biological Organelles & Structures (`biology.*`)**, as well as Chemistry and Geography, are rendered, projected, lighted, and animated.

---

## 🧮 1. The 3D Mathematics Engine (`data/shapes3d_engine.js`)

The application includes a standalone **Vector 3D Projection Engine** in `data/shapes3d_engine.js`. It does not rely on heavy external WebGL frameworks (like Three.js), ensuring lightweight, instant SVG rendering with 100% vector scalability for high-resolution displays and interactive whiteboards.

### 📐 Core Mathematical Operations & Projection Pipeline

1. **3D Rotation Matrix Calculation**:
   Vertices are stored as 3D coordinate objects `{x, y, z}` centered at `(0, 0, 0)`. Rotation around Yaw (Y-axis), Pitch (X-axis), and Roll (Z-axis) is performed using standard Euler rotation matrices:
   ```javascript
   function rotateX(p, rad) {
     return { x: p.x, y: p.y * Math.cos(rad) - p.z * Math.sin(rad), z: p.y * Math.sin(rad) + p.z * Math.cos(rad) };
   }
   function rotateY(p, rad) {
     return { x: p.x * Math.cos(rad) + p.z * Math.sin(rad), y: p.y, z: -p.x * Math.sin(rad) + p.z * Math.cos(rad) };
   }
   function rotateZ(p, rad) {
     return { x: p.x * Math.cos(rad) - p.y * Math.sin(rad), y: p.x * Math.sin(rad) + p.y * Math.cos(rad), z: p.z };
   }
   ```

2. **Perspective & Isometric Projection (`project3D`)**:
   Converts 3D coordinates `(x, y, z)` into 2D canvas screen coordinates `(x2d, y2d)` with depth factors:
   ```javascript
   function project3D(point, yawDeg, pitchDeg, rollDeg = 0, scale = 1, cx = 150, cy = 150) {
     let p = { x: point.x * scale, y: point.y * scale, z: point.z * scale };
     p = rotateY(p, degToRad(yawDeg));
     p = rotateX(p, degToRad(pitchDeg));
     if (rollDeg) p = rotateZ(p, degToRad(rollDeg));

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
   ```

3. **Directional Lighting & Shading Model (`computeLighting`)**:
   Simulates a virtual light source positioned at vector direction $\vec{L} = (0.45, -0.65, 0.61)$. Face normals $\vec{N}$ are computed using the cross product of two adjacent edge vectors. The dot product $\vec{N} \cdot \vec{L}$ determines surface illumination:
   ```javascript
   function computeLighting(normal3d, baseColor) {
     const dot = normal3d.x * LIGHT_DIR.x + normal3d.y * LIGHT_DIR.y + normal3d.z * LIGHT_DIR.z;
     const brightness = dot * 40; // Adjusts brightness by -40% to +45%
     return adjustColorBrightness(baseColor, brightness);
   }
   ```

4. **Depth-Sorting Algorithm (Painter's Algorithm)**:
   Polygons (faces) are sorted by average Z-depth prior to rendering. Faces farther from the camera (smaller $Z$) are drawn first, and closer faces (larger $Z$) are drawn over them, guaranteeing correct occlusion without 3D z-buffer artifacts.

---

### 🎲 Supported 3D Mathematical Shapes (`shapes3d.*`)

| Tool Identifier | Arabic Name | Geometry Description | Educational Props & Formulas |
| :--- | :--- | :--- | :--- |
| `shapes3d.cube` | مكعب 3D | 8 vertices, 6 square faces | Side $a$, Volume $V = a^3$, Surface Area $A = 6a^2$ |
| `shapes3d.cuboid` | متوازي مستطيلات 3D | 8 vertices, 6 rectangular faces | $L, W, H$, $V = L \cdot W \cdot H$ |
| `shapes3d.cylinder` | أسطوانة 3D | Elliptical top/bottom caps + curved body | Radius $r$, Height $h$, $V = \pi r^2 h$ |
| `shapes3d.cone` | مخروط 3D | Elliptical base + apex vertex | $r, h$, Slant height $s = \sqrt{r^2+h^2}$, $V = \frac{1}{3}\pi r^2 h$ |
| `shapes3d.sphere` | كرة 3D | Radial gradient shading + equator rings | Radius $r$, $V = \frac{4}{3}\pi r^3$, $A = 4\pi r^2$ |
| `shapes3d.pyramid` | هرم رباعي 3D | Square base + 4 triangular faces | Base $a$, Height $h$, $V = \frac{1}{3}a^2 h$ |
| `shapes3d.triangular-prism` | منشور ثلاثي 3D | 2 triangular bases + 3 rectangles | Base $b$, Height $h$, Length $l$, $V = \frac{1}{2} b h l$ |
| `shapes3d.capsule` | كبسولة 3D | Cylinder with 2 hemispherical caps | $r, h$, $V = \pi r^2 h + \frac{4}{3}\pi r^3$ |
| `shapes3d.hemisphere` | نصف كرة 3D | Circular base + dome | $r$, $V = \frac{2}{3}\pi r^3$ |
| `shapes3d.torus` | طارة حلقية 3D | Major radius $R$, Minor radius $r$ | $V = 2\pi^2 R r^2$ |
| `shapes3d.tetrahedron` | رباعي الوجوه 3D | 4 equilateral triangular faces | Edge $a$, $V = \frac{a^3}{6\sqrt{2}}$ |

---

## 🧬 2. 3D Biological Organelles & Systems (`biology.*`)

Biology components are rendered using realistic volumetric SVG constructs, radial gradients, drop shadows, and organelle layer hierarchy.

### 🔬 Detailed Anatomical & Ultrastructural Components

#### 1. `biology.cell-animal-detailed` (بنية الخلية الحيوانية ثلاثية الأبعاد)
- **Plasma Membrane**: Flexible, semi-permeable double-line border with a micro-dashed phospholipid bilayer highlight (`#fb7185`).
- **Cytoplasm Matrix**: Radial gradient background (`#fff1f2` $\rightarrow$ `#fecdd3`) providing depth perception.
- **Nucleus**: Spherical 3D ball with radial gradient (`anim-nuc-grad`), nuclear pores (`feGaussianBlur` glow), chromatin threads, and a deep purple nucleolus.
- **Mitochondria**: Double-membrane elongated ovals with folded inner cristae (`#f97316`) and ATP synthase particles.
- **Endoplasmic Reticulum (RER)**: Folded cisternae network studded with dark ribosome spheres (`#1e293b`).
- **Golgi Apparatus**: Stacked curved cisternae secreting transport vesicles.

```javascript
// Excerpt from biology.cell-animal-detailed in app.js
'biology.cell-animal-detailed': {
  type: 'biology.cell-animal-detailed',
  category: 'biology',
  name: 'بنية الخلية الحيوانية (Animal Cell Ultrastructure)',
  defaultProps: { showLabels: true, color: '#f43f5e', selectedOrganelle: 'all' },
  defaultSize: { w: 340, h: 340 },
  renderSVG: (props, w, h) => {
    // Generates 3D radial cytoplasm, RER with ribosomes, 3D nucleus, Golgi & Cristae
  }
}
```

#### 2. `biology.cell-plant-detailed` (بنية الخلية النباتية ثلاثية الأبعاد)
- **Rigid Cell Wall (الجدار الخلوي)**: Multi-layered hexagonal/polyhedral green boundary with plasmodesmata channels.
- **Central Vacuole (الفجوة العصارية العصاربة الكبرى)**: Large translucent blue 3D volume (`#0ea5e9` with opacity gradients) storing cell sap.
- **Chloroplasts (البلاستيدات الخضراء)**: Double-membraned ellipsoids containing grana stacks (thylakoids) rendered as stacked green coins.

#### 3. `biology.dna-structure` (تركيب الحمض النووي 3D - DNA Double Helix)
- **Ribbon Backbones**: Antiparallel sugar-phosphate ribbons rendered with gradient shading (`#3b82f6` and `#ec4899`).
- **Nitrogenous Base Pairs**: Color-coded 3D cylindrical rungs representing Adenine (Red), Thymine (Green), Cytosine (Yellow), and Guanine (Blue) with hydrogen bonds.

#### 4. `biology.mitochondria-detailed` (الميتوكندريا وتوليد الطاقة 3D)
- **Outer & Inner Membranes**: Smooth outer envelope surrounding folded cristae projections.
- **Matrix & ATP Synthase**: Matrix gel gradient containing matrix ribosomes, mtDNA loops, and ATP Synthase complexes synthesizing ATP molecules.

#### 5. `biology.human-heart-detailed` (القلب البشري ثلاثي الأبعاد)
- **4 Chambers**: Right Atrium, Right Ventricle, Left Atrium, and Left Ventricle color-coded by oxygenation level (Deoxygenated Blue `#1e3a8a`, Oxygenated Red `#dc2626`).
- **Major Vessels & Valves**: Aorta arc, Pulmonary Artery, Vena Cava, and Tricuspid/Bicuspid valves with directional blood flow arrows.

---

## 🛠️ 3. Full Implementation Code Examples

### 📐 Math 3D Component Integration in `app.js`
```javascript
'shapes3d.cube': {
  type: 'shapes3d.cube',
  category: 'shapes3d',
  name: 'مكعب 3D (Cube)',
  schemaVersion: 1,
  defaultProps: { ...SHAPES_3D_METADATA['shapes3d.cube'].defaultProps },
  defaultSize: { ...SHAPES_3D_METADATA['shapes3d.cube'].defaultSize },
  renderSVG: (props, w, h) => render3DShapeSVG('shapes3d.cube', props, w, h)
}
```

### 📏 Math Tool 3D: `math.compass` (الفرجار)
```javascript
'math.compass': {
  type: 'math.compass',
  category: 'math',
  name: 'Compass (فرجار ثلاثي الأبعاد)',
  schemaVersion: 1,
  defaultProps: { color: '#3b82f6', visualScale: 1, radius: 110, rotation: 30, drawMode: false },
  defaultSize: { w: 320, h: 320 },
  renderSVG: (props, w, h) => {
    const color = escapeXml(props.color || '#3b82f6');
    const safeColorId = color.replace(/[^a-zA-Z0-9]/g, '');
    const r = props.radius !== undefined ? props.radius : 110;
    const rotDeg = props.rotation !== undefined ? props.rotation : 30;
    const phi = rotDeg * (Math.PI / 180);
    const cx = w / 2;
    const cy = h / 2;
    const nx = cx;
    const ny = cy;
    const px = cx + r * Math.cos(phi);
    const py = cy + r * Math.sin(phi);
    const halfR = r / 2;
    const hLeg = 160;
    const hJoint = Math.sqrt(Math.max(20, hLeg * hLeg - halfR * halfR));
    const mx = cx + halfR * Math.cos(phi);
    const my = cy + halfR * Math.sin(phi);
    const jx = mx - hJoint * Math.sin(phi);
    const jy = my + hJoint * Math.cos(phi);
    const radCm = (r / 30).toFixed(1);

    return `<svg width="100%" height="100%" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;">
      <defs>
        <filter id="shadow-3d-${safeColorId}" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3.5" flood-color="#000000" flood-opacity="0.25"/>
        </filter>
        <linearGradient id="metal-leg-3d-${safeColorId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#cbd5e1"/>
          <stop offset="40%" stop-color="#f1f5f9"/>
          <stop offset="70%" stop-color="#64748b"/>
          <stop offset="100%" stop-color="#334155"/>
        </linearGradient>
        <linearGradient id="pencil-leg-3d-${safeColorId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#93c5fd"/>
          <stop offset="50%" stop-color="${color}"/>
          <stop offset="100%" stop-color="#1e3a8a"/>
        </linearGradient>
        <radialGradient id="joint-hinge-3d-${safeColorId}" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#94a3b8"/>
          <stop offset="50%" stop-color="#334155"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </radialGradient>
      </defs>
      
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="5,5" opacity="0.45" filter="url(#shadow-3d-${safeColorId})"/>
      <line x1="${nx}" y1="${ny}" x2="${jx}" y2="${jy}" stroke="url(#metal-leg-3d-${safeColorId})" stroke-width="9" stroke-linecap="round" filter="url(#shadow-3d-${safeColorId})"/>
      <polygon points="${nx - 4},${ny - 2} ${nx + 4},${ny - 2} ${nx},${ny + 12}" fill="#0f172a" filter="url(#shadow-3d-${safeColorId})"/>
      <line x1="${px}" y1="${py}" x2="${jx}" y2="${jy}" stroke="url(#pencil-leg-3d-${safeColorId})" stroke-width="9" stroke-linecap="round" filter="url(#shadow-3d-${safeColorId})"/>
      <circle cx="${jx}" cy="${jy}" r="14" fill="url(#joint-hinge-3d-${safeColorId})" stroke="#0f172a" stroke-width="2" filter="url(#shadow-3d-${safeColorId})"/>
      
      <g transform="translate(${jx}, ${jy + 28})" filter="url(#shadow-3d-${safeColorId})">
        <rect x="-42" y="-10" width="84" height="20" rx="10" fill="#0f172a" fill-opacity="0.9"/>
        <text x="0" y="4" fill="#ffffff" font-size="10.5" font-weight="bold" font-family="sans-serif" text-anchor="middle">R = ${radCm} cm</text>
      </g>
    </svg>`;
  }
}
```

---

## 🔑 Critical Guidelines for Future AI Extensions
1. **Never hardcode static filter/gradient IDs**: Always derive IDs using `safeColorId = color.replace(/[^a-zA-Z0-9]/g, '')` or random component UUIDs. Duplicate IDs break SVG rendering in Vite/Cloud Run.
2. **Preserve Arabic Localization**: All labels must use explicit RTL Arabic terms aligned with the Algerian educational curriculum (المنهاج الجزائري).
3. **Verify Build Compatibility**: Always test code changes using `npm run build` to ensure there are no unescaped quotes or string literal errors in `app.js`.
