/* ═══════════════════════════════════════════════════════════════════════════
   MATHEMATICS & GEOMETRY TOOLS SUITE (أدوات الرياضيات والهندسة التفاعلية الفائقة)
   High-Precision Skeuomorphic 3D Vectors, Soft Puffy Illumination & Dynamic Geometry
   ═══════════════════════════════════════════════════════════════════════════ */

function esc(val) {
  if (val === undefined || val === null) return '';
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getBaseDefs(prefix, color = '#3b82f6') {
  const safeId = prefix.replace(/[^a-zA-Z0-9_-]/g, '');
  return `
    <defs>
      <linearGradient id="acrylic-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
        <stop offset="30%" stop-color="${color}" stop-opacity="0.35" />
        <stop offset="100%" stop-color="${color}" stop-opacity="0.55" />
      </linearGradient>
      <linearGradient id="metal-silver-${safeId}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#e2e8f0" />
        <stop offset="25%" stop-color="#ffffff" />
        <stop offset="50%" stop-color="#94a3b8" />
        <stop offset="75%" stop-color="#cbd5e1" />
        <stop offset="100%" stop-color="#64748b" />
      </linearGradient>
      <linearGradient id="metal-gold-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="50%" stop-color="#eab308" />
        <stop offset="100%" stop-color="#854d0e" />
      </linearGradient>
      <radialGradient id="soft-glow-${safeId}" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
        <stop offset="60%" stop-color="${color}" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95" />
      </radialGradient>
      <radialGradient id="sphere-3d-${safeId}" cx="32%" cy="28%" r="68%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="35%" stop-color="${color}" />
        <stop offset="85%" stop-color="#1e1b4b" />
        <stop offset="100%" stop-color="#09090b" />
      </radialGradient>
      <filter id="soft-shadow-${safeId}" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#0f172a" flood-opacity="0.3" />
      </filter>
      <filter id="glass-blur-${safeId}">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
      </filter>
    </defs>
  `;
}

export const MATH_TOOLS_REGISTRY = {
  // ──────────────────────────────────────────────
  // 1. الحساب والأعداد (Arithmetic & Numbers)
  // ──────────────────────────────────────────────
  'math.calc-scientific': {
    type: 'math.calc-scientific',
    category: 'math',
    name: 'آلة حاسبة علمية (Scientific Calculator)',
    schemaVersion: 1,
    defaultProps: { expression: 'sin(45°) + √(16)', result: '4.7071', mode: 'DEG', color: '#1e293b' },
    defaultSize: { w: 260, h: 320 },
    renderSVG: (props, w, h) => {
      const defs = getBaseDefs('calc-sci', '#3b82f6');
      return `<svg width="100%" height="100%" viewBox="0 0 260 320" xmlns="http://www.w3.org/2000/svg" style="overflow:visible;">
        ${defs}
        <g filter="url(#soft-shadow-calc-sci)">
          <!-- Body -->
          <rect x="10" y="10" width="240" height="300" rx="18" fill="#1e293b" stroke="#334155" stroke-width="2"/>
          <rect x="12" y="12" width="236" height="296" rx="16" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.15"/>
          <!-- LCD Display -->
          <rect x="25" y="25" width="210" height="65" rx="8" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
          <text x="35" y="42" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold">${esc(props.mode || 'DEG')} | MATH PRO</text>
          <text x="225" y="58" fill="#94a3b8" font-size="13" font-family="monospace" text-anchor="end">${esc(props.expression || '0')}</text>
          <text x="225" y="82" fill="#4ade80" font-size="18" font-family="monospace" font-weight="bold" text-anchor="end">${esc(props.result || '0')}</text>
          <!-- Keypad Grid -->
          <!-- Row 1: Sci buttons -->
          <g fill="#334155" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">
            <rect x="25" y="100" width="38" height="24" rx="5" fill="#475569"/><text x="44" y="116" fill="#f8fafc">sin</text>
            <rect x="68" y="100" width="38" height="24" rx="5" fill="#475569"/><text x="87" y="116" fill="#f8fafc">cos</text>
            <rect x="111" y="100" width="38" height="24" rx="5" fill="#475569"/><text x="130" y="116" fill="#f8fafc">tan</text>
            <rect x="154" y="100" width="38" height="24" rx="5" fill="#475569"/><text x="173" y="116" fill="#f8fafc">√</text>
            <rect x="197" y="100" width="38" height="24" rx="5" fill="#dc2626"/><text x="216" y="116" fill="#ffffff">DEL</text>
          </g>
          <!-- Row 2: Sci buttons 2 -->
          <g fill="#334155" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">
            <rect x="25" y="130" width="38" height="24" rx="5" fill="#475569"/><text x="44" y="146" fill="#f8fafc">ln</text>
            <rect x="68" y="130" width="38" height="24" rx="5" fill="#475569"/><text x="87" y="146" fill="#f8fafc">log</text>
            <rect x="111" y="130" width="38" height="24" rx="5" fill="#475569"/><text x="130" y="146" fill="#f8fafc">x²</text>
            <rect x="154" y="130" width="38" height="24" rx="5" fill="#475569"/><text x="173" y="146" fill="#f8fafc">xʸ</text>
            <rect x="197" y="130" width="38" height="24" rx="5" fill="#dc2626"/><text x="216" y="146" fill="#ffffff">AC</text>
          </g>
          <!-- Numeric Pad -->
          <g font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">
            <!-- 7 8 9 / -->
            <rect x="25" y="162" width="48" height="30" rx="6" fill="#1e293b" stroke="#475569"/><text x="49" y="182" fill="#ffffff">7</text>
            <rect x="78" y="162" width="48" height="30" rx="6" fill="#1e293b" stroke="#475569"/><text x="102" y="182" fill="#ffffff">8</text>
            <rect x="131" y="162" width="48" height="30" rx="6" fill="#1e293b" stroke="#475569"/><text x="155" y="182" fill="#ffffff">9</text>
            <rect x="187" y="162" width="48" height="30" rx="6" fill="#0284c7"/><text x="211" y="182" fill="#ffffff">÷</text>
            <!-- 4 5 6 * -->
            <rect x="25" y="198" width="48" height="30" rx="6" fill="#1e293b" stroke="#475569"/><text x="49" y="218" fill="#ffffff">4</text>
            <rect x="78" y="198" width="48" height="30" rx="6" fill="#1e293b" stroke="#475569"/><text x="102" y="218" fill="#ffffff">5</text>
            <rect x="131" y="198" width="48" height="30" rx="6" fill="#1e293b" stroke="#475569"/><text x="155" y="218" fill="#ffffff">6</text>
            <rect x="187" y="198" width="48" height="30" rx="6" fill="#0284c7"/><text x="211" y="218" fill="#ffffff">×</text>
            <!-- 1 2 3 - -->
            <rect x="25" y="234" width="48" height="30" rx="6" fill="#1e293b" stroke="#475569"/><text x="49" y="254" fill="#ffffff">1</text>
            <rect x="78" y="234" width="48" height="30" rx="6" fill="#1e293b" stroke="#475569"/><text x="102" y="254" fill="#ffffff">2</text>
            <rect x="131" y="234" width="48" height="30" rx="6" fill="#1e293b" stroke="#475569"/><text x="155" y="254" fill="#ffffff">3</text>
            <rect x="187" y="234" width="48" height="30" rx="6" fill="#0284c7"/><text x="211" y="254" fill="#ffffff">−</text>
            <!-- 0 . = + -->
            <rect x="25" y="270" width="48" height="30" rx="6" fill="#1e293b" stroke="#475569"/><text x="49" y="290" fill="#ffffff">0</text>
            <rect x="78" y="270" width="48" height="30" rx="6" fill="#1e293b" stroke="#475569"/><text x="102" y="290" fill="#ffffff">.</text>
            <rect x="131" y="270" width="48" height="30" rx="6" fill="#16a34a"/><text x="155" y="290" fill="#ffffff">=</text>
            <rect x="187" y="270" width="48" height="30" rx="6" fill="#0284c7"/><text x="211" y="290" fill="#ffffff">+</text>
          </g>
        </g>
      </svg>`;
    }
  },

  'math.fractions-visualizer': {
    type: 'math.fractions-visualizer',
    category: 'math',
    name: 'الكسور التفاعلية الملونة (Interactive Fractions)',
    schemaVersion: 1,
    defaultProps: { numerator: 3, denominator: 4, shape: 'circle', color: '#3b82f6' },
    defaultSize: { w: 240, h: 200 },
    renderSVG: (props, w, h) => {
      const n = Math.max(1, Math.min(props.numerator || 3, props.denominator || 4));
      const d = Math.max(1, props.denominator || 4);
      const color = props.color || '#3b82f6';
      const defs = getBaseDefs('frac', color);
      
      let slices = '';
      const cx = 80, cy = 100, r = 60;
      for (let i = 0; i < d; i++) {
        const a1 = (i * 2 * Math.PI) / d - Math.PI / 2;
        const a2 = ((i + 1) * 2 * Math.PI) / d - Math.PI / 2;
        const x1 = cx + r * Math.cos(a1);
        const y1 = cy + r * Math.sin(a1);
        const x2 = cx + r * Math.cos(a2);
        const y2 = cy + r * Math.sin(a2);
        const isFilled = i < n;
        slices += `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z" fill="${isFilled ? color : '#f1f5f9'}" stroke="#334155" stroke-width="1.5" opacity="${isFilled ? '0.9' : '0.4'}"/>`;
      }

      return `<svg width="100%" height="100%" viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#soft-shadow-frac)">
          <rect x="5" y="5" width="230" height="190" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <!-- Pie Slices -->
          <g>${slices}</g>
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#1e293b" stroke-width="2"/>
          <!-- Fraction display -->
          <rect x="155" y="45" width="65" height="110" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
          <text x="187" y="80" fill="${color}" font-size="28" font-family="sans-serif" font-weight="bold" text-anchor="middle">${n}</text>
          <line x1="165" y1="95" x2="210" y2="95" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
          <text x="187" y="135" fill="#1e293b" font-size="28" font-family="sans-serif" font-weight="bold" text-anchor="middle">${d}</text>
          <text x="187" y="150" fill="#64748b" font-size="10" font-family="sans-serif" text-anchor="middle">≈ ${(n/d).toFixed(2)}</text>
        </g>
      </svg>`;
    }
  },

  'math.number-line': {
    type: 'math.number-line',
    category: 'math',
    name: 'خط الأعداد التفاعلي (Interactive Number Line)',
    schemaVersion: 1,
    defaultProps: { min: -5, max: 5, step: 1, markedValue: 2.5, color: '#3b82f6' },
    defaultSize: { w: 320, h: 90 },
    renderSVG: (props, w, h) => {
      const min = props.min !== undefined ? props.min : -5;
      const max = props.max !== undefined ? props.max : 5;
      const val = props.markedValue !== undefined ? props.markedValue : 2.5;
      const defs = getBaseDefs('num-line', '#3b82f6');
      const startX = 35, endX = 285, lineY = 45;
      const range = max - min || 1;
      
      let ticks = '';
      for (let i = min; i <= max; i++) {
        const tx = startX + ((i - min) / range) * (endX - startX);
        ticks += `
          <line x1="${tx}" y1="${lineY - 8}" x2="${tx}" y2="${lineY + 8}" stroke="#1e293b" stroke-width="1.5"/>
          <text x="${tx}" y="${lineY + 22}" fill="#334155" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">${i}</text>
        `;
      }

      const markX = startX + ((val - min) / range) * (endX - startX);

      return `<svg width="100%" height="100%" viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#soft-shadow-num-line)">
          <rect x="5" y="5" width="310" height="80" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <!-- Axis Line & Arrows -->
          <line x1="20" y1="${lineY}" x2="300" y2="${lineY}" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round"/>
          <polygon points="18,${lineY} 26,${lineY - 5} 26,${lineY + 5}" fill="#1e293b"/>
          <polygon points="302,${lineY} 294,${lineY - 5} 294,${lineY + 5}" fill="#1e293b"/>
          <!-- Ticks -->
          ${ticks}
          <!-- Marked Value Point -->
          <circle cx="${markX}" cy="${lineY}" r="7" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
          <rect x="${markX - 18}" y="12" width="36" height="18" rx="4" fill="#ef4444"/>
          <text x="${markX}" y="25" fill="#ffffff" font-size="11" font-weight="bold" font-family="sans-serif" text-anchor="middle">${val}</text>
        </g>
      </svg>`;
    }
  },

  // ──────────────────────────────────────────────
  // 2. الجبر والدوال (Algebra & Functions)
  // ──────────────────────────────────────────────
  'math.function-grapher': {
    type: 'math.function-grapher',
    category: 'math',
    name: 'راسم الدوال البياني (Function Curve Grapher)',
    schemaVersion: 1,
    defaultProps: { formula: 'f(x) = x² - 2x - 1', funcType: 'quadratic', a: 1, b: -2, c: -1, color: '#3b82f6' },
    defaultSize: { w: 280, h: 220 },
    renderSVG: (props, w, h) => {
      const defs = getBaseDefs('func-graph', props.color || '#3b82f6');
      const cx = 140, cy = 110, scale = 18;
      
      let pathD = '';
      for (let px = -6; px <= 6; px += 0.2) {
        // y = a*x^2 + b*x + c
        const a = props.a !== undefined ? props.a : 1;
        const b = props.b !== undefined ? props.b : -2;
        const c = props.c !== undefined ? props.c : -1;
        const py = a * px * px + b * px + c;
        const svgX = cx + px * scale;
        const svgY = cy - py * scale;
        if (px === -6) pathD += `M ${svgX} ${svgY}`;
        else pathD += ` L ${svgX} ${svgY}`;
      }

      return `<svg width="100%" height="100%" viewBox="0 0 280 220" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#soft-shadow-func-graph)">
          <!-- Container & Grid -->
          <rect x="10" y="10" width="260" height="200" rx="14" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
          <!-- Grid Lines -->
          <pattern id="grid-func" width="18" height="18" patternUnits="userSpaceOnUse">
            <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#1e293b" stroke-width="0.8"/>
          </pattern>
          <rect x="12" y="12" width="256" height="196" fill="url(#grid-func)"/>
          <!-- Axes X and Y -->
          <line x1="15" y1="${cy}" x2="265" y2="${cy}" stroke="#64748b" stroke-width="1.5"/>
          <line x1="${cx}" y1="15" x2="${cx}" y2="205" stroke="#64748b" stroke-width="1.5"/>
          <polygon points="265,${cy} 257,${cy - 4} 257,${cy + 4}" fill="#64748b"/>
          <polygon points="${cx},15 ${cx - 4},23 ${cx + 4},23}" fill="#64748b"/>
          <text x="255" y="${cy - 8}" fill="#94a3b8" font-size="11" font-family="sans-serif">x</text>
          <text x="${cx + 8}" y="26" fill="#94a3b8" font-size="11" font-family="sans-serif">y</text>
          <!-- Function Curve Clip -->
          <clipPath id="clip-graph">
            <rect x="12" y="12" width="256" height="196" rx="10"/>
          </clipPath>
          <path d="${pathD}" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" clip-path="url(#clip-graph)"/>
          <!-- Equation Badge -->
          <rect x="20" y="20" width="130" height="24" rx="6" fill="#1e293b" fill-opacity="0.9" stroke="#475569"/>
          <text x="85" y="36" fill="#f8fafc" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">${esc(props.formula || 'f(x) = x² - 2x - 1')}</text>
        </g>
      </svg>`;
    }
  },

  // ──────────────────────────────────────────────
  // 3. الهندسة المستوية والإنشاءات (Geometry & Compass)
  // ──────────────────────────────────────────────
  'math.ruler-acrylic': {
    type: 'math.ruler-acrylic',
    category: 'math',
    name: 'مسطرة أكريليك شفافة هندسية (Transparent Drafting Acrylic Ruler)',
    schemaVersion: 1,
    defaultProps: { lengthCm: 15, color: '#0284c7', rotation: 0 },
    defaultSize: { w: 340, h: 75 },
    renderSVG: (props, w, h) => {
      const defs = getBaseDefs('ruler-acr', props.color || '#0284c7');
      const len = props.lengthCm || 15;
      const pxPerCm = 18;
      let graduations = '';
      
      for (let cm = 0; cm <= len; cm++) {
        const gx = 25 + cm * pxPerCm;
        graduations += `<line x1="${gx}" y1="8" x2="${gx}" y2="28" stroke="#0f172a" stroke-width="1.2"/>`;
        graduations += `<text x="${gx}" y="42" fill="#0f172a" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">${cm}</text>`;
        if (cm < len) {
          for (let mm = 1; mm < 10; mm++) {
            const mx = gx + mm * (pxPerCm / 10);
            const my2 = mm === 5 ? 20 : 14;
            graduations += `<line x1="${mx}" y1="8" x2="${mx}" y2="${my2}" stroke="#334155" stroke-width="0.8"/>`;
          }
        }
      }

      return `<svg width="100%" height="100%" viewBox="0 0 340 75" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#soft-shadow-ruler-acr)">
          <!-- Transparent Tinted Acrylic Base with Beveled Edge -->
          <rect x="10" y="6" width="320" height="60" rx="8" fill="url(#acrylic-ruler-acr)" stroke="#38bdf8" stroke-width="1.6"/>
          <!-- Top Chamfer Specular Edge Highlight -->
          <line x1="12" y1="8" x2="328" y2="8" stroke="#ffffff" stroke-width="2" opacity="0.95"/>
          <line x1="14" y1="64" x2="326" y2="64" stroke="#0284c7" stroke-width="1" opacity="0.4"/>
          <!-- Internal Etched Engineering Curves & Symbols (from reference photo) -->
          <path d="M 40 50 Q 80 28 130 52 T 220 48" fill="none" stroke="#0284c7" stroke-width="0.9" opacity="0.35" stroke-dasharray="3,2"/>
          <path d="M 70 56 Q 110 32 160 54" fill="none" stroke="#0284c7" stroke-width="0.7" opacity="0.25"/>
          <text x="240" y="54" fill="#0284c7" font-size="8" font-family="monospace" opacity="0.5">f(x)=sin(x)</text>
          <!-- Metric Scale -->
          ${graduations}
          <text x="315" y="42" fill="#0369a1" font-size="9" font-family="sans-serif" font-weight="bold">cm</text>
        </g>
      </svg>`;
    }
  },

  'math.compass-metallic': {
    type: 'math.compass-metallic',
    category: 'math',
    name: 'فرجار الدقة والواقعية الهندسية (Precision 3D Master Compass)',
    schemaVersion: 1,
    defaultProps: { radiusCm: 3.7, angleDeg: 45, color: '#3b82f6' },
    defaultSize: { w: 260, h: 320 },
    renderSVG: (props, w, h) => {
      const angle = props.angleDeg || 45;
      const rad = (angle * Math.PI) / 360;
      const legLen = 175;
      const cx = 130, topY = 46;
      const radiusCm = props.radiusCm || 3.7;

      const leftTipX = cx - legLen * Math.sin(rad);
      const leftTipY = topY + legLen * Math.cos(rad);
      const rightTipX = cx + legLen * Math.sin(rad);
      const rightTipY = topY + legLen * Math.cos(rad);

      // Unique SVG ID prefix
      const id = 'real-comp-' + Math.floor(Math.random() * 100000);

      // Spindle (horizontal threaded rod) geometry
      const spinDist = legLen * 0.44;
      const slX = cx - spinDist * Math.sin(rad);
      const slY = topY + spinDist * Math.cos(rad);
      const srX = cx + spinDist * Math.sin(rad);
      const srY = topY + spinDist * Math.cos(rad);

      return `<svg width="100%" height="100%" viewBox="0 0 260 320" xmlns="http://www.w3.org/2000/svg" style="overflow:visible;">
        <defs>
          <!-- Satin Steel Gradient -->
          <linearGradient id="metal-satin-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#94a3b8"/>
            <stop offset="22%" stop-color="#f1f5f9"/>
            <stop offset="48%" stop-color="#ffffff"/>
            <stop offset="74%" stop-color="#cbd5e1"/>
            <stop offset="100%" stop-color="#64748b"/>
          </linearGradient>

          <!-- Deep Navy Blue Casing Gradient -->
          <linearGradient id="navy-head-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2563eb"/>
            <stop offset="20%" stop-color="#1e3a8a"/>
            <stop offset="65%" stop-color="#172554"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>

          <!-- Blue Grip Top Handle Gradient -->
          <linearGradient id="blue-grip-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1e40af"/>
            <stop offset="35%" stop-color="#3b82f6"/>
            <stop offset="65%" stop-color="#60a5fa"/>
            <stop offset="100%" stop-color="#1d4ed8"/>
          </linearGradient>

          <!-- Knurled Wheel Gradient -->
          <linearGradient id="wheel-knurl-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="30%" stop-color="#64748b"/>
            <stop offset="50%" stop-color="#94a3b8"/>
            <stop offset="70%" stop-color="#475569"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>

          <!-- Polished Silver Oval Rivet -->
          <radialGradient id="silver-rivet-${id}" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="45%" stop-color="#cbd5e1"/>
            <stop offset="80%" stop-color="#64748b"/>
            <stop offset="100%" stop-color="#334155"/>
          </radialGradient>

          <!-- Soft Studio Shadow -->
          <filter id="soft-cast-shadow-${id}" x="-30%" y="-20%" width="160%" height="150%">
            <feDropShadow dx="8" dy="14" stdDeviation="8" flood-color="#0f172a" flood-opacity="0.32"/>
            <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.18"/>
          </filter>
        </defs>

        <!-- ══════ PERSPECTIVE CAST SHADOW ON PAPER (FROM PHOTO) ══════ -->
        <g opacity="0.4">
          <!-- Left needle tip shadow -->
          <ellipse cx="${leftTipX + 16}" cy="${leftTipY + 12}" rx="18" ry="6" fill="#0f172a" filter="blur(5px)"/>
          <!-- Leg shadows on graph paper -->
          <line x1="${leftTipX + 16}" y1="${leftTipY + 12}" x2="${cx + 20}" y2="${topY + 18}" stroke="#0f172a" stroke-width="12" stroke-linecap="round" filter="blur(7px)"/>
          <line x1="${rightTipX + 16}" y1="${rightTipY + 12}" x2="${cx + 20}" y2="${topY + 18}" stroke="#0f172a" stroke-width="12" stroke-linecap="round" filter="blur(7px)"/>
          <!-- Spindle shadow -->
          <line x1="${slX + 14}" y1="${slY + 12}" x2="${srX + 14}" y2="${srY + 12}" stroke="#0f172a" stroke-width="7" filter="blur(4px)"/>
        </g>

        <!-- ══════ DRAFTING TRACE & ANNOTATIONS (AS SEEN IN USER IMAGE) ══════ -->
        <!-- Center Pivot Dot on Paper -->
        <circle cx="${leftTipX}" cy="${leftTipY}" r="3.5" fill="#0f172a"/>
        <circle cx="${leftTipX}" cy="${leftTipY}" r="7" fill="none" stroke="#0f172a" stroke-width="1" opacity="0.4"/>

        <!-- Drawn Circle Arc Trace -->
        <path d="M ${leftTipX - 45} ${leftTipY - 50} A ${legLen * Math.sin(rad) * 2} ${legLen * Math.sin(rad) * 2} 0 0 1 ${rightTipX + 25} ${rightTipY + 45}" 
              fill="none" stroke="#0f172a" stroke-width="1.8" opacity="0.85"/>

        <!-- Radius Dimension Line: from needle to pencil lead -->
        <line x1="${leftTipX}" y1="${leftTipY}" x2="${rightTipX}" y2="${rightTipY}" stroke="#0f172a" stroke-width="1.2" opacity="0.8"/>

        <!-- Radius Measurement Text: "R = 3.7 cm" -->
        <text x="${(leftTipX + rightTipX) / 2}" y="${(leftTipY + rightTipY) / 2 + 18}" 
              fill="#0f172a" font-size="13" font-family="'Comic Sans MS', 'Caveat', sans-serif" font-weight="bold" text-anchor="middle">R = ${esc(radiusCm)} cm</text>

        <!-- Angle Arc & Label: "45°" -->
        <path d="M ${leftTipX - 10} ${leftTipY - 32} Q ${leftTipX} ${leftTipY - 36} ${leftTipX + 18} ${leftTipY - 30}" 
              fill="none" stroke="#0f172a" stroke-width="1.2" opacity="0.85"/>
        <text x="${leftTipX + 4}" y="${leftTipY - 42}" fill="#0f172a" font-size="12" font-family="'Comic Sans MS', 'Caveat', sans-serif" font-weight="bold" text-anchor="middle">${angle}°</text>

        <!-- Pencil Lead Blue Highlight Dot (Interactive cursor position) -->
        <circle cx="${rightTipX}" cy="${rightTipY}" r="4.5" fill="#3b82f6" opacity="0.9"/>
        <circle cx="${rightTipX}" cy="${rightTipY}" r="8" fill="none" stroke="#3b82f6" stroke-width="1.6" opacity="0.6"/>

        <!-- ══════ THE PHYSICAL 3D COMPASS BODY ══════ -->
        <g filter="url(#soft-cast-shadow-${id})">

          <!-- 1. HORIZONTAL THREADED ROD (SPINDLE) & KNURLED WHEEL -->
          <!-- Threaded Spindle Rod across legs -->
          <line x1="${slX - 14}" y1="${slY}" x2="${srX + 14}" y2="${srY}" stroke="#475569" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="${slX - 14}" y1="${slY - 0.5}" x2="${srX + 14}" y2="${srY - 0.5}" stroke="#e2e8f0" stroke-width="1" stroke-linecap="round" opacity="0.85"/>

          <!-- Central Knurled Adjustment Wheel -->
          <ellipse cx="${cx}" cy="${slY}" rx="4.5" ry="12" fill="url(#wheel-knurl-${id})" stroke="#0f172a" stroke-width="1"/>
          <line x1="${cx - 1.5}" y1="${slY - 10}" x2="${cx - 1.5}" y2="${slY + 10}" stroke="#ffffff" stroke-width="0.8" opacity="0.7"/>
          <line x1="${cx + 1.5}" y1="${slY - 10}" x2="${cx + 1.5}" y2="${slY + 10}" stroke="#0f172a" stroke-width="0.8"/>

          <!-- 2. LEFT SATIN CHROME ARM (NEEDLE ARM) -->
          <!-- Main Leg Beam -->
          <line x1="${cx - 4}" y1="${topY + 14}" x2="${leftTipX}" y2="${leftTipY - 24}" 
                stroke="url(#metal-satin-${id})" stroke-width="9" stroke-linecap="round"/>
          <line x1="${cx - 6}" y1="${topY + 14}" x2="${leftTipX - 2}" y2="${leftTipY - 24}" 
                stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.9"/>

          <!-- Longitudinal Recessed Slot on Left Arm -->
          <line x1="${cx - 16}" y1="${topY + 50}" x2="${leftTipX + 14}" y2="${leftTipY - 50}" 
                stroke="#334155" stroke-width="2.2" stroke-linecap="round" opacity="0.7"/>
          <line x1="${cx - 16}" y1="${topY + 50}" x2="${leftTipX + 14}" y2="${leftTipY - 50}" 
                stroke="#ffffff" stroke-width="0.7" opacity="0.6"/>

          <!-- Left Lower Clamp Screw Knob (As in photo) -->
          <ellipse cx="${leftTipX + 4}" cy="${leftTipY - 36}" rx="4" ry="6" fill="url(#metal-satin-${id})" stroke="#334155" stroke-width="0.8"/>
          <circle cx="${leftTipX + 4}" cy="${leftTipY - 36}" r="1.5" fill="#1e293b"/>

          <!-- Lower Needle Collar & Sharp Black Needle -->
          <rect x="${leftTipX - 4}" y="${leftTipY - 24}" width="8" height="8" rx="1.5" fill="url(#metal-satin-${id})" stroke="#334155" stroke-width="0.8"/>
          <polygon points="${leftTipX - 2.5},${leftTipY - 16} ${leftTipX + 2.5},${leftTipY - 16} ${leftTipX},${leftTipY}" fill="#0f172a"/>
          <polygon points="${leftTipX - 0.8},${leftTipY - 16} ${leftTipX + 0.8},${leftTipY - 16} ${leftTipX},${leftTipY}" fill="#94a3b8" opacity="0.7"/>

          <!-- 3. RIGHT SATIN CHROME ARM (LEAD / PENCIL ARM) -->
          <!-- Main Leg Beam -->
          <line x1="${cx + 4}" y1="${topY + 14}" x2="${rightTipX}" y2="${rightTipY - 24}" 
                stroke="url(#metal-satin-${id})" stroke-width="9" stroke-linecap="round"/>
          <line x1="${cx + 2}" y1="${topY + 14}" x2="${rightTipX - 2}" y2="${rightTipY - 24}" 
                stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.9"/>

          <!-- Longitudinal Recessed Slot on Right Arm -->
          <line x1="${cx + 16}" y1="${topY + 50}" x2="${rightTipX - 14}" y2="${rightTipY - 50}" 
                stroke="#334155" stroke-width="2.2" stroke-linecap="round" opacity="0.7"/>

          <!-- Right Side Adjusting Wing-Nut Screw (Signature photo feature) -->
          <g transform="translate(${rightTipX - 8}, ${rightTipY - 55})">
            <rect x="10" y="-6" width="7" height="12" rx="2" fill="url(#metal-satin-${id})" stroke="#334155" stroke-width="0.8"/>
            <line x1="12" y1="-4" x2="12" y2="4" stroke="#ffffff" stroke-width="0.7" opacity="0.8"/>
            <line x1="15" y1="-4" x2="15" y2="4" stroke="#0f172a" stroke-width="0.7"/>
          </g>

          <!-- Right Lower Circular Joint & Clamp -->
          <circle cx="${rightTipX}" cy="${rightTipY - 20}" r="6" fill="url(#metal-satin-${id})" stroke="#334155" stroke-width="1"/>
          <circle cx="${rightTipX}" cy="${rightTipY - 20}" r="2.5" fill="#1e293b"/>
          <!-- Spiral clamp groove -->
          <path d="M ${rightTipX - 2.5} ${rightTipY - 20} A 2.5 2.5 0 0 1 ${rightTipX + 2} ${rightTipY - 22}" fill="none" stroke="#475569" stroke-width="1"/>

          <!-- Sharpened Graphite Lead Tip -->
          <polygon points="${rightTipX - 2.8},${rightTipY - 14} ${rightTipX + 2.8},${rightTipY - 14} ${rightTipX},${rightTipY}" fill="#0f172a"/>
          <polygon points="${rightTipX - 1},${rightTipY - 14} ${rightTipX + 1},${rightTipY - 14} ${rightTipX},${rightTipY}" fill="#64748b" opacity="0.8"/>

          <!-- 4. TOP ERGONOMIC DEEP NAVY BLUE HEAD & BLUE GRIP (FROM PHOTO) -->
          <!-- Deep Navy Blue Plastic Shell / Head Casing -->
          <path d="
            M ${cx - 14} ${topY + 16}
            L ${cx - 9} ${topY - 8}
            Q ${cx} ${topY - 16} ${cx + 9} ${topY - 8}
            L ${cx + 14} ${topY + 16}
            Q ${cx} ${topY + 12} ${cx - 14} ${topY + 16}
            Z
          " fill="url(#navy-head-${id})" stroke="#0f172a" stroke-width="1.2"/>

          <!-- Left Specular Edge Highlight on Navy Shell -->
          <path d="M ${cx - 12} ${topY + 12} L ${cx - 8} ${topY - 6}" stroke="#93c5fd" stroke-width="1.4" stroke-linecap="round" opacity="0.85"/>

          <!-- Polished Silver Oval Cartridge / Rivet on Casing -->
          <ellipse cx="${cx}" cy="${topY + 2}" rx="5.5" ry="3.5" fill="url(#silver-rivet-${id})" stroke="#334155" stroke-width="0.8"/>
          <ellipse cx="${cx - 1}" cy="${topY + 1}" rx="3" ry="1.5" fill="#ffffff" opacity="0.9"/>

          <!-- Spindle Neck Connector -->
          <rect x="${cx - 3}" y="${topY - 24}" width="6" height="10" rx="1.5" fill="#1e3a8a" stroke="#0f172a" stroke-width="0.8"/>

          <!-- Top Blue Cylindrical Ergonomic Grip -->
          <rect x="${cx - 5.5}" y="${topY - 42}" width="11" height="20" rx="2.5" fill="url(#blue-grip-${id})" stroke="#1e3a8a" stroke-width="0.8"/>
          <line x1="${cx - 3}" y1="${topY - 40}" x2="${cx - 3}" y2="${topY - 24}" stroke="#bfdbfe" stroke-width="1.2" opacity="0.9"/>
          <line x1="${cx - 5.5}" y1="${topY - 34}" x2="${cx + 5.5}" y2="${topY - 34}" stroke="#0f172a" stroke-width="0.8" opacity="0.7"/>
          <line x1="${cx - 5.5}" y1="${topY - 28}" x2="${cx + 5.5}" y2="${topY - 28}" stroke="#0f172a" stroke-width="0.8" opacity="0.7"/>
        </g>
      </svg>`;
    }
  },

  'math.protractor-pastel': {
    type: 'math.protractor-pastel',
    category: 'math',
    name: 'منقلة ملونة باستيل (Tri-Color Pastel Protractor)',
    schemaVersion: 1,
    defaultProps: { activeAngle: 45, color: '#8b5cf6' },
    defaultSize: { w: 260, h: 145 },
    renderSVG: (props, w, h) => {
      const defs = getBaseDefs('prot-pastel', '#8b5cf6');
      const cx = 130, cy = 130, r = 110, innerR = 40;
      const angle = props.activeAngle || 45;
      const rad = (angle * Math.PI) / 180;
      const ax = cx + (r - 10) * Math.cos(Math.PI - rad);
      const ay = cy - (r - 10) * Math.sin(rad);

      return `<svg width="100%" height="100%" viewBox="0 0 260 145" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#soft-shadow-prot-pastel)">
          <!-- Acrylic Half Disc -->
          <path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z" fill="#ffffff" fill-opacity="0.9" stroke="#cbd5e1" stroke-width="1.5"/>
          <!-- Pastel Bands (0-60 Purple, 60-120 Green, 120-180 Orange) -->
          <path d="M ${cx} ${cy} L ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx - r/2} ${cy - r*0.866} Z" fill="#f3e8ff" opacity="0.6"/>
          <path d="M ${cx} ${cy} L ${cx - r/2} ${cy - r*0.866} A ${r} ${r} 0 0 1 ${cx + r/2} ${cy - r*0.866} Z" fill="#dcfce7" opacity="0.6"/>
          <path d="M ${cx} ${cy} L ${cx + r/2} ${cy - r*0.866} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z" fill="#ffedd5" opacity="0.6"/>
          <!-- Center cutout hole -->
          <path d="M ${cx - innerR} ${cy} A ${innerR} ${innerR} 0 0 1 ${cx + innerR} ${cy} Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
          <circle cx="${cx}" cy="${cy}" r="3" fill="#ef4444"/>
          <!-- Active Target Angle Line -->
          <line x1="${cx}" y1="${cy}" x2="${ax}" y2="${ay}" stroke="#ef4444" stroke-width="2"/>
          <text x="${cx}" y="65" fill="#ef4444" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">${angle}°</text>
        </g>
      </svg>`;
    }
  },

  // ──────────────────────────────────────────────
  // 4. الإحصاء والاحتمالات (Statistics & Probability)
  // ──────────────────────────────────────────────
  'math.dice-3d': {
    type: 'math.dice-3d',
    category: 'math',
    name: 'نرد ثلاثي الأبعاد تفاعلي (3D Interactive Dice)',
    schemaVersion: 1,
    defaultProps: { value: 6, color: '#dc2626' },
    defaultSize: { w: 140, h: 140 },
    renderSVG: (props, w, h) => {
      const defs = getBaseDefs('dice-3d', props.color || '#dc2626');
      return `<svg width="100%" height="100%" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#soft-shadow-dice-3d)">
          <!-- Top Face -->
          <polygon points="70,18 115,40 70,62 25,40" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
          <!-- Left Face -->
          <polygon points="25,40 70,62 70,118 25,95" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5"/>
          <!-- Right Face -->
          <polygon points="70,62 115,40 115,95 70,118" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5"/>
          <!-- Top Face Pips (Red 1 or Dots) -->
          <circle cx="70" cy="40" r="7" fill="#dc2626"/>
          <!-- Left Face Pips -->
          <circle cx="45" cy="65" r="4.5" fill="#1e293b"/>
          <circle cx="50" cy="85" r="4.5" fill="#1e293b"/>
          <!-- Right Face Pips -->
          <circle cx="95" cy="65" r="4.5" fill="#1e293b"/>
          <circle cx="90" cy="85" r="4.5" fill="#1e293b"/>
          <circle cx="92" cy="75" r="4.5" fill="#1e293b"/>
        </g>
      </svg>`;
    }
  },

  'math.spinner-wheel': {
    type: 'math.spinner-wheel',
    category: 'math',
    name: 'عجلة الاحتمالات والقرعة (Probability Spinner Wheel)',
    schemaVersion: 1,
    defaultProps: { segments: ['أزرق', 'أحمر', 'أخضر', 'أصفر', 'بنفسجي', 'برتقالي'], color: '#3b82f6' },
    defaultSize: { w: 200, h: 220 },
    renderSVG: (props, w, h) => {
      const defs = getBaseDefs('spinner', '#3b82f6');
      const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ea580c'];
      const cx = 100, cy = 110, r = 85;
      const count = 6;
      let paths = '';

      for (let i = 0; i < count; i++) {
        const a1 = (i * 2 * Math.PI) / count;
        const a2 = ((i + 1) * 2 * Math.PI) / count;
        const x1 = cx + r * Math.cos(a1);
        const y1 = cy + r * Math.sin(a1);
        const x2 = cx + r * Math.cos(a2);
        const y2 = cy + r * Math.sin(a2);
        paths += `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z" fill="${colors[i]}" stroke="#ffffff" stroke-width="2"/>`;
      }

      return `<svg width="100%" height="100%" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#soft-shadow-spinner)">
          <!-- Outer Wheel Rim -->
          <circle cx="${cx}" cy="${cy}" r="${r + 4}" fill="#1e293b" stroke="#475569" stroke-width="2"/>
          <g>${paths}</g>
          <!-- Center Pin -->
          <circle cx="${cx}" cy="${cy}" r="16" fill="url(#metal-gold-spinner)" stroke="#78350f" stroke-width="1.5"/>
          <circle cx="${cx}" cy="${cy}" r="6" fill="#0f172a"/>
          <!-- Top Arrow Indicator -->
          <polygon points="${cx},${cy - r - 10} ${cx - 10},${cy - r + 12} ${cx + 10},${cy - r + 12}" fill="#dc2626" stroke="#ffffff" stroke-width="1.5"/>
        </g>
      </svg>`;
    }
  },

  // ──────────────────────────────────────────────
  // 5. المثلثات والمتجهات (Trigonometry & Vectors)
  // ──────────────────────────────────────────────
  'math.trig-circle': {
    type: 'math.trig-circle',
    category: 'math',
    name: 'الدائرة المثلثية التفاعلية (Trigonometric Unit Circle)',
    schemaVersion: 1,
    defaultProps: { angleDeg: 30, color: '#3b82f6' },
    defaultSize: { w: 240, h: 240 },
    renderSVG: (props, w, h) => {
      const defs = getBaseDefs('trig-circ', '#3b82f6');
      const cx = 120, cy = 120, r = 85;
      const angle = props.angleDeg || 30;
      const rad = (angle * Math.PI) / 180;
      const px = cx + r * Math.cos(rad);
      const py = cy - r * Math.sin(rad);

      return `<svg width="100%" height="100%" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#soft-shadow-trig-circ)">
          <rect x="10" y="10" width="220" height="220" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          <!-- Unit Circle -->
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
          <!-- Axes -->
          <line x1="20" y1="${cy}" x2="220" y2="${cy}" stroke="#1e293b" stroke-width="1.5"/>
          <line x1="${cx}" y1="20" x2="${cx}" y2="220" stroke="#1e293b" stroke-width="1.5"/>
          <text x="215" y="${cy - 6}" fill="#64748b" font-size="10" font-weight="bold">cos</text>
          <text x="${cx + 6}" y="30" fill="#64748b" font-size="10" font-weight="bold">sin</text>
          <!-- Projections: cos & sin lines -->
          <line x1="${px}" y1="${py}" x2="${px}" y2="${cy}" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,2"/>
          <line x1="${px}" y1="${py}" x2="${cx}" y2="${py}" stroke="#10b981" stroke-width="2" stroke-dasharray="3,2"/>
          <!-- Hypotenuse Vector -->
          <line x1="${cx}" y1="${cy}" x2="${px}" y2="${py}" stroke="#3b82f6" stroke-width="2.5"/>
          <circle cx="${px}" cy="${py}" r="5" fill="#3b82f6" stroke="#ffffff" stroke-width="1.5"/>
          <!-- Angle Arc -->
          <path d="M ${cx + 25} ${cy} A 25 25 0 0 0 ${cx + 25 * Math.cos(rad)} ${cy - 25 * Math.sin(rad)}" fill="none" stroke="#f59e0b" stroke-width="2"/>
          <text x="${cx + 32}" y="${cy - 8}" fill="#f59e0b" font-size="10" font-weight="bold">${angle}°</text>
        </g>
      </svg>`;
    }
  }
};
