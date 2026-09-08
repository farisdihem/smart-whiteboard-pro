/* ═══════════════════════════════════════════════════════════════════════════
   PHYSICS TOOLS SUITE (أدوات الفيزياء والميكانيك والكهرباء والبصريات)
   High-Precision Skeuomorphic 3D Vectors, Soft Volumetric Lighting & Electrical Components
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

function getPhysDefs(prefix, color = '#3b82f6') {
  const safeId = prefix.replace(/[^a-zA-Z0-9_-]/g, '');
  return `
    <defs>
      <linearGradient id="metal-p-${safeId}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#94a3b8" />
        <stop offset="30%" stop-color="#ffffff" />
        <stop offset="70%" stop-color="#cbd5e1" />
        <stop offset="100%" stop-color="#475569" />
      </linearGradient>
      <linearGradient id="copper-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fed7aa" />
        <stop offset="50%" stop-color="#f97316" />
        <stop offset="100%" stop-color="#9a3412" />
      </linearGradient>
      <linearGradient id="glass-lens-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
        <stop offset="40%" stop-color="#38bdf8" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#0284c7" stop-opacity="0.45" />
      </linearGradient>
      <radialGradient id="flame-glow-${safeId}" cx="50%" cy="80%" r="70%">
        <stop offset="0%" stop-color="#60a5fa" />
        <stop offset="30%" stop-color="#fef08a" />
        <stop offset="70%" stop-color="#f97316" />
        <stop offset="100%" stop-color="#ef4444" />
      </radialGradient>
      <filter id="phys-shadow-${safeId}" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="4" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.25" />
      </filter>
    </defs>
  `;
}

export const PHYSICS_TOOLS_REGISTRY = {
  // ──────────────────────────────────────────────
  // 1. الدارات والكهرباء (Circuits & Electricity)
  // ──────────────────────────────────────────────
  'physics.circuit-builder': {
    type: 'physics.circuit-builder',
    category: 'physics',
    name: 'لوحة دارة كهربائية متكاملة (Interactive Circuit Board)',
    schemaVersion: 1,
    defaultProps: { voltage: 12, resistance: 100, current: 0.12, isClosed: true, lampOn: true },
    defaultSize: { w: 280, h: 200 },
    renderSVG: (props, w, h) => {
      const defs = getPhysDefs('circ-board', '#3b82f6');
      const isClosed = props.isClosed !== false;
      const v = props.voltage || 12;
      const r = props.resistance || 100;
      const i = (v / r).toFixed(2);

      return `<svg width="100%" height="100%" viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#phys-shadow-circ-board)">
          <!-- Breadboard Canvas -->
          <rect x="8" y="8" width="264" height="184" rx="14" fill="#0f172a" stroke="#334155" stroke-width="2"/>
          <!-- Copper Traces (Circuit Wires) -->
          <path d="M 40 50 L 240 50 L 240 150 L 40 150 Z" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          
          <!-- Battery (Left) -->
          <rect x="25" y="80" width="30" height="40" rx="4" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
          <rect x="35" y="74" width="10" height="6" rx="2" fill="#fbbf24"/>
          <text x="40" y="105" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">E = ${v}V</text>
          <text x="40" y="70" fill="#22c55e" font-size="14" font-weight="bold" text-anchor="middle">+</text>
          <text x="40" y="135" fill="#ef4444" font-size="16" font-weight="bold" text-anchor="middle">−</text>

          <!-- Switch (Top) -->
          <circle cx="120" cy="50" r="5" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.5"/>
          <circle cx="160" cy="50" r="5" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.5"/>
          <line x1="120" y1="50" x2="${isClosed ? '160' : '150'}" y2="${isClosed ? '50' : '30'}" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
          <text x="140" y="24" fill="#94a3b8" font-size="10" font-weight="bold" text-anchor="middle">قاطعة (K)</text>

          <!-- Resistor (Right) -->
          <rect x="225" y="85" width="30" height="30" rx="4" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>
          <text x="240" y="104" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">R=${r}Ω</text>

          <!-- Lamp (Bottom) -->
          <circle cx="140" cy="150" r="18" fill="${isClosed ? '#fef08a' : '#334155'}" stroke="#e2e8f0" stroke-width="2"/>
          <path d="M 128 138 L 152 162 M 128 162 L 152 138" stroke="${isClosed ? '#eab308' : '#64748b'}" stroke-width="2"/>
          ${isClosed ? '<circle cx="140" cy="150" r="26" fill="#facc15" opacity="0.3"/>' : ''}

          <!-- Live Multimeter Badge -->
          <rect x="90" y="82" width="100" height="36" rx="6" fill="#1e293b" stroke="#475569"/>
          <text x="140" y="97" fill="#38bdf8" font-size="10" font-family="monospace" text-anchor="middle">I = ${i} A</text>
          <text x="140" y="112" fill="#4ade80" font-size="10" font-family="monospace" text-anchor="middle">P = ${(v * i).toFixed(2)} W</text>
        </g>
      </svg>`;
    }
  },

  'physics.oscilloscope': {
    type: 'physics.oscilloscope',
    category: 'physics',
    name: 'راسم الاهتزاز المهبطي (Digital Oscilloscope)',
    schemaVersion: 1,
    defaultProps: { freqHz: 50, amplitudeV: 5, waveType: 'sine', color: '#10b981' },
    defaultSize: { w: 280, h: 220 },
    renderSVG: (props, w, h) => {
      const defs = getPhysDefs('oscillo', '#10b981');
      const amp = props.amplitudeV || 5;
      const freq = props.freqHz || 50;
      
      let waveD = '';
      const cx = 20, cy = 90;
      for (let x = 0; x <= 240; x += 3) {
        const y = cy - Math.sin((x / 240) * (freq / 10) * Math.PI * 2) * (amp * 5);
        if (x === 0) waveD += `M ${cx + x} ${y}`;
        else waveD += ` L ${cx + x} ${y}`;
      }

      return `<svg width="100%" height="100%" viewBox="0 0 280 220" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#phys-shadow-oscillo)">
          <rect x="8" y="8" width="264" height="204" rx="14" fill="#1e293b" stroke="#334155" stroke-width="2"/>
          <!-- Cathode CRT Screen -->
          <rect x="18" y="18" width="244" height="144" rx="8" fill="#022c22" stroke="#065f46" stroke-width="2"/>
          <!-- Oscilloscope Reticle Grid -->
          <pattern id="reticle" width="24.4" height="18" patternUnits="userSpaceOnUse">
            <path d="M 24.4 0 L 0 0 0 18" fill="none" stroke="#064e3b" stroke-width="0.7"/>
          </pattern>
          <rect x="20" y="20" width="240" height="140" fill="url(#reticle)"/>
          <!-- Active Oscillogram Glow Wave -->
          <path d="${waveD}" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round"/>
          <path d="${waveD}" fill="none" stroke="#a7f3d0" stroke-width="1" opacity="0.8"/>
          <!-- Channel Stats -->
          <text x="26" y="34" fill="#34d399" font-size="10" font-family="monospace" font-weight="bold">CH1: ${amp}V/div | f = ${freq}Hz</text>
          <!-- Lower Control Knobs -->
          <g fill="#475569" stroke="#64748b" stroke-width="1.5">
            <circle cx="50" cy="188" r="14" fill="url(#metal-p-oscillo)"/>
            <circle cx="110" cy="188" r="14" fill="url(#metal-p-oscillo)"/>
            <circle cx="170" cy="188" r="14" fill="url(#metal-p-oscillo)"/>
            <circle cx="230" cy="188" r="14" fill="url(#metal-p-oscillo)"/>
          </g>
          <text x="50" y="192" fill="#0f172a" font-size="8" font-weight="bold" text-anchor="middle">VOLT</text>
          <text x="110" y="192" fill="#0f172a" font-size="8" font-weight="bold" text-anchor="middle">TIME</text>
          <text x="170" y="192" fill="#0f172a" font-size="8" font-weight="bold" text-anchor="middle">TRIG</text>
          <text x="230" y="192" fill="#0f172a" font-size="8" font-weight="bold" text-anchor="middle">POS</text>
        </g>
      </svg>`;
    }
  },

  // ──────────────────────────────────────────────
  // 2. البصريات والعدسات (Optics & Lenses)
  // ──────────────────────────────────────────────
  'physics.optical-bench': {
    type: 'physics.optical-bench',
    category: 'physics',
    name: 'مقعد بصري وعدسات (Optical Bench & Ray Tracer)',
    schemaVersion: 1,
    defaultProps: { lensType: 'convex', focalLength: 60, objectDist: 120, objectHeight: 40 },
    defaultSize: { w: 320, h: 180 },
    renderSVG: (props, w, h) => {
      const defs = getPhysDefs('opt-bench', '#0284c7');
      const f = props.focalLength || 60;
      const do_ = props.objectDist || 120;
      const ho = props.objectHeight || 40;
      const lensX = 160, axisY = 90;
      const objX = lensX - do_;
      // Image distance: 1/di = 1/f - 1/do
      const di = (f * do_) / (do_ - f);
      const hi = - (di / do_) * ho;
      const imgX = lensX + di;

      return `<svg width="100%" height="100%" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#phys-shadow-opt-bench)">
          <!-- Optical Bench Rail -->
          <rect x="10" y="150" width="300" height="16" rx="3" fill="url(#metal-p-opt-bench)" stroke="#334155"/>
          <!-- Principal Optical Axis -->
          <line x1="15" y1="${axisY}" x2="305" y2="${axisY}" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3"/>
          
          <!-- Lens (Convex Glass) -->
          <path d="M 160 25 Q 172 90 160 155 Q 148 90 160 25 Z" fill="url(#glass-lens-opt-bench)" stroke="#0284c7" stroke-width="2"/>
          <line x1="160" y1="20" x2="160" y2="160" stroke="#0284c7" stroke-width="1" stroke-dasharray="2,2"/>

          <!-- Focal Points F and F' -->
          <circle cx="${lensX - f}" cy="${axisY}" r="3" fill="#ef4444"/>
          <text x="${lensX - f}" y="${axisY + 16}" fill="#ef4444" font-size="10" font-weight="bold" text-anchor="middle">F</text>
          <circle cx="${lensX + f}" cy="${axisY}" r="3" fill="#ef4444"/>
          <text x="${lensX + f}" y="${axisY + 16}" fill="#ef4444" font-size="10" font-weight="bold" text-anchor="middle">F'</text>

          <!-- Object Arrow (AB) -->
          <line x1="${objX}" y1="${axisY}" x2="${objX}" y2="${axisY - ho}" stroke="#22c55e" stroke-width="3"/>
          <polygon points="${objX},${axisY - ho - 6} ${objX - 4},${axisY - ho} ${objX + 4},${axisY - ho}" fill="#22c55e"/>
          <text x="${objX}" y="${axisY - ho - 10}" fill="#22c55e" font-size="10" font-weight="bold" text-anchor="middle">AB</text>

          <!-- Image Arrow (A'B') -->
          <line x1="${imgX}" y1="${axisY}" x2="${imgX}" y2="${axisY - hi}" stroke="#e11d48" stroke-width="2.5"/>
          <polygon points="${imgX},${axisY - hi + 6} ${imgX - 4},${axisY - hi} ${imgX + 4},${axisY - hi}" fill="#e11d48"/>
          <text x="${imgX}" y="${axisY - hi + 16}" fill="#e11d48" font-size="10" font-weight="bold" text-anchor="middle">A'B'</text>

          <!-- Ray 1: Parallel then through F' -->
          <line x1="${objX}" y1="${axisY - ho}" x2="${lensX}" y2="${axisY - ho}" stroke="#f59e0b" stroke-width="1.5"/>
          <line x1="${lensX}" y1="${axisY - ho}" x2="${imgX}" y2="${axisY - hi}" stroke="#f59e0b" stroke-width="1.5"/>

          <!-- Ray 2: Through Optical Center O -->
          <line x1="${objX}" y1="${axisY - ho}" x2="${imgX}" y2="${axisY - hi}" stroke="#3b82f6" stroke-width="1.5"/>
        </g>
      </svg>`;
    }
  },

  // ──────────────────────────────────────────────
  // 3. الميكانيك والمستوي المائل (Mechanics & Incline)
  // ──────────────────────────────────────────────
  'physics.inclined-plane-3d': {
    type: 'physics.inclined-plane-3d',
    category: 'physics',
    name: 'المستوي المائل والميكانيك (3D Inclined Plane & Forces)',
    schemaVersion: 1,
    defaultProps: { angleDeg: 30, massKg: 5, frictionCoeff: 0.2 },
    defaultSize: { w: 280, h: 200 },
    renderSVG: (props, w, h) => {
      const defs = getPhysDefs('incline-3d', '#3b82f6');
      const angle = props.angleDeg || 30;
      const rad = (angle * Math.PI) / 180;
      const bx = 30, by = 160, bw = 220;
      const topX = bx + bw * Math.cos(rad);
      const topY = by - bw * Math.sin(rad);
      const boxDist = bw * 0.55;
      const boxCx = bx + boxDist * Math.cos(rad);
      const boxCy = by - boxDist * Math.sin(rad);

      return `<svg width="100%" height="100%" viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#phys-shadow-incline-3d)">
          <!-- Ground Base -->
          <line x1="20" y1="160" x2="260" y2="160" stroke="#475569" stroke-width="2.5"/>
          <!-- Wooden/Aluminum Wedge -->
          <polygon points="${bx},${by} ${bx + bw},${by} ${topX},${topY}" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>
          <text x="${bx + 40}" y="${by - 6}" fill="#0f172a" font-size="11" font-weight="bold">${angle}°</text>
          
          <!-- Sliding Mass Block -->
          <g transform="translate(${boxCx}, ${boxCy}) rotate(${-angle})">
            <rect x="-20" y="-30" width="40" height="30" rx="3" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/>
            <text x="0" y="-12" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">m</text>
            <!-- Weight Vector (Straight Down) -->
            <line x1="0" y1="-15" x2="0" y2="35" stroke="#ef4444" stroke-width="2.5" transform="rotate(${angle}, 0, -15)"/>
            <polygon points="0,35 -4,28 4,28" fill="#ef4444" transform="rotate(${angle}, 0, -15)"/>
            <!-- Normal Reaction R -->
            <line x1="0" y1="-15" x2="0" y2="-50" stroke="#10b981" stroke-width="2.5"/>
            <polygon points="0,-50 -4,-43 4,-43" fill="#10b981"/>
            <!-- Friction force f -->
            <line x1="-15" y1="0" x2="25" y2="0" stroke="#f59e0b" stroke-width="2"/>
            <polygon points="25,0 18,-4 18,4" fill="#f59e0b"/>
          </g>
        </g>
      </svg>`;
    }
  }
};
