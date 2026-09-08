/* ═══════════════════════════════════════════════════════════════════════════
   NATURAL SCIENCES & CHEMISTRY & BIOLOGY TOOLS SUITE (أدوات العلوم الطبيعية والكيمياء والجيولوجيا)
   Volumetric 3D Skeuomorphic Laboratory Glassware, DNA Helices, Organs & Chemical Models
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

function getSciDefs(prefix, color = '#10b981') {
  const safeId = prefix.replace(/[^a-zA-Z0-9_-]/g, '');
  return `
    <defs>
      <linearGradient id="glass-chem-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
        <stop offset="35%" stop-color="#e0f2fe" stop-opacity="0.3" />
        <stop offset="85%" stop-color="#38bdf8" stop-opacity="0.4" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.75" />
      </linearGradient>
      <linearGradient id="liquid-chem-${safeId}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.75" />
        <stop offset="100%" stop-color="${color}" stop-opacity="0.95" />
      </linearGradient>
      <radialGradient id="sphere-sci-${safeId}" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="40%" stop-color="${color}" />
        <stop offset="85%" stop-color="#064e3b" />
        <stop offset="100%" stop-color="#022c22" />
      </radialGradient>
      <filter id="sci-shadow-${safeId}" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#0f172a" flood-opacity="0.3" />
      </filter>
    </defs>
  `;
}

export const SCIENCE_TOOLS_REGISTRY = {
  // ──────────────────────────────────────────────
  // 1. الكيمياء والمخابر (Chemistry & Laboratory)
  // ──────────────────────────────────────────────
  'chemistry.bunsen-burner-pro': {
    type: 'chemistry.bunsen-burner-pro',
    category: 'chemistry',
    name: 'موقد بنسن التفاعلي المتقدم (Bunsen Burner Pro)',
    schemaVersion: 1,
    defaultProps: { flameType: 'roaring-blue', gasValveOpen: true, airHolePct: 80 },
    defaultSize: { w: 180, h: 260 },
    renderSVG: (props, w, h) => {
      const defs = getSciDefs('bunsen', '#ef4444');
      const isBlue = props.flameType !== 'luminous-yellow';

      return `<svg width="100%" height="100%" viewBox="0 0 180 260" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#sci-shadow-bunsen)">
          <!-- Heavy Cast Iron Base -->
          <ellipse cx="90" cy="235" rx="65" ry="16" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
          <ellipse cx="90" cy="230" rx="55" ry="12" fill="#334155"/>
          
          <!-- Brass Gas Intake Tubing & Collar -->
          <rect x="135" y="215" width="35" height="12" rx="3" fill="#ca8a04" stroke="#854d0e" stroke-width="1"/>
          
          <!-- Stainless Steel Barrel -->
          <rect x="80" y="90" width="20" height="135" rx="3" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
          <line x1="82" y1="92" x2="82" y2="223" stroke="#ffffff" stroke-width="1.5" opacity="0.8"/>
          
          <!-- Adjustable Air Hole Collar -->
          <rect x="77" y="185" width="26" height="22" rx="4" fill="#ca8a04" stroke="#713f12" stroke-width="1.5"/>
          <ellipse cx="90" cy="196" rx="4" ry="6" fill="#0f172a"/>

          <!-- 3D Volumetric Flame (Blue/Roaring with inner cone) -->
          <g>
            ${isBlue ? `
              <!-- Outer Pale Blue Flame Cone -->
              <path d="M 90 15 Q 120 50 100 90 L 80 90 Q 60 50 90 15 Z" fill="#60a5fa" opacity="0.75"/>
              <!-- Inner Hottest Roaring Cone -->
              <path d="M 90 40 Q 105 65 96 90 L 84 90 Q 75 65 90 40 Z" fill="#38bdf8" opacity="0.95"/>
              <path d="M 90 55 Q 98 75 93 90 L 87 90 Q 82 75 90 55 Z" fill="#ffffff" opacity="0.9"/>
            ` : `
              <!-- Luminous Yellow Safety Flame -->
              <path d="M 90 10 Q 125 45 100 90 L 80 90 Q 55 45 90 10 Z" fill="#facc15" opacity="0.85"/>
              <path d="M 90 35 Q 105 60 95 90 L 85 90 Q 75 60 90 35 Z" fill="#ea580c" opacity="0.7"/>
            `}
          </g>
          <text x="90" y="252" fill="#94a3b8" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">موقد بنسن (Bunsen Burner)</text>
        </g>
      </svg>`;
    }
  },

  'chemistry.periodic-table-card': {
    type: 'chemistry.periodic-table-card',
    category: 'chemistry',
    name: 'بطاقة العنصر الكيميائي التفاعلية (Chemical Element Card)',
    schemaVersion: 1,
    defaultProps: { symbol: 'Fe', nameAr: 'حديد', nameEn: 'Iron', z: 26, mass: '55.845', state: 'صلب', group: 'فلز انتقالي', color: '#3b82f6' },
    defaultSize: { w: 180, h: 220 },
    renderSVG: (props, w, h) => {
      const color = props.color || '#3b82f6';
      const defs = getSciDefs('elem-card', color);

      return `<svg width="100%" height="100%" viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#sci-shadow-elem-card)">
          <rect x="8" y="8" width="164" height="204" rx="14" fill="#ffffff" stroke="${color}" stroke-width="2.5"/>
          <!-- Top Element Header Bar -->
          <rect x="8" y="8" width="164" height="38" rx="12" fill="${color}"/>
          <text x="22" y="32" fill="#ffffff" font-size="16" font-family="sans-serif" font-weight="bold">${esc(props.z || '26')}</text>
          <text x="158" y="32" fill="#ffffff" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="end">${esc(props.mass || '55.845')}</text>
          
          <!-- Element Big Symbol -->
          <text x="90" y="115" fill="#0f172a" font-size="52" font-family="sans-serif" font-weight="bold" text-anchor="middle">${esc(props.symbol || 'Fe')}</text>
          
          <!-- Names -->
          <text x="90" y="145" fill="#1e293b" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">${esc(props.nameAr || 'حديد')}</text>
          <text x="90" y="165" fill="#64748b" font-size="12" font-family="sans-serif" text-anchor="middle">${esc(props.nameEn || 'Iron')}</text>
          
          <!-- Category Pill -->
          <rect x="25" y="180" width="130" height="22" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
          <text x="90" y="195" fill="#334155" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">${esc(props.group || 'فلز انتقالي')}</text>
        </g>
      </svg>`;
    }
  },

  // ──────────────────────────────────────────────
  // 2. الأحياء والخلية (Biology & 3D DNA & Anatomy)
  // ──────────────────────────────────────────────
  'biology.dna-helix-3d': {
    type: 'biology.dna-helix-3d',
    category: 'biology',
    name: 'حلزون الحمض النووي ثلاثي الأبعاد (3D DNA Double Helix)',
    schemaVersion: 1,
    defaultProps: { basePairsCount: 6, color: '#3b82f6' },
    defaultSize: { w: 220, h: 280 },
    renderSVG: (props, w, h) => {
      const defs = getSciDefs('dna-3d', '#3b82f6');
      let rungs = '';
      const startY = 30, stepY = 32, count = 7;

      for (let i = 0; i < count; i++) {
        const y = startY + i * stepY;
        const phase = (i * Math.PI) / 3;
        const x1 = 110 + 65 * Math.sin(phase);
        const x2 = 110 - 65 * Math.sin(phase);
        const depth = Math.cos(phase);
        const rungColor1 = i % 2 === 0 ? '#ef4444' : '#10b981'; // A-T or G-C
        const rungColor2 = i % 2 === 0 ? '#3b82f6' : '#f59e0b';

        rungs += `
          <!-- Rung Base Pair -->
          <line x1="${x1}" y1="${y}" x2="110" y2="${y}" stroke="${rungColor1}" stroke-width="4" stroke-linecap="round"/>
          <line x1="110" y1="${y}" x2="${x2}" y2="${y}" stroke="${rungColor2}" stroke-width="4" stroke-linecap="round"/>
          <!-- Hydrogen Bond Dots -->
          <circle cx="110" cy="${y}" r="3" fill="#ffffff" stroke="#0f172a" stroke-width="1"/>
          <!-- Sugar-Phosphate Nodes -->
          <circle cx="${x1}" cy="${y}" r="${depth > 0 ? 8 : 6}" fill="#0284c7" stroke="#ffffff" stroke-width="1.5"/>
          <circle cx="${x2}" cy="${y}" r="${depth < 0 ? 8 : 6}" fill="#9333ea" stroke="#ffffff" stroke-width="1.5"/>
        `;
      }

      return `<svg width="100%" height="100%" viewBox="0 0 220 280" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#sci-shadow-dna-3d)">
          <rect x="8" y="8" width="204" height="264" rx="14" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
          <g>${rungs}</g>
          <!-- Base Pair Legend -->
          <g transform="translate(18, 245)" font-size="9" font-family="sans-serif" font-weight="bold">
            <rect x="0" y="0" width="10" height="10" rx="2" fill="#ef4444"/><text x="14" y="9" fill="#f8fafc">A</text>
            <rect x="45" y="0" width="10" height="10" rx="2" fill="#3b82f6"/><text x="59" y="9" fill="#f8fafc">T</text>
            <rect x="90" y="0" width="10" height="10" rx="2" fill="#10b981"/><text x="104" y="9" fill="#f8fafc">C</text>
            <rect x="135" y="0" width="10" height="10" rx="2" fill="#f59e0b"/><text x="149" y="9" fill="#f8fafc">G</text>
          </g>
        </g>
      </svg>`;
    }
  },

  'biology.human-brain-3d': {
    type: 'biology.human-brain-3d',
    category: 'biology',
    name: 'الدماغ البشري ثلاثي الأبعاد (3D Human Brain Anatomy)',
    schemaVersion: 1,
    defaultProps: { showLobes: true, color: '#ec4899' },
    defaultSize: { w: 260, h: 220 },
    renderSVG: (props, w, h) => {
      const defs = getSciDefs('brain-3d', '#ec4899');
      return `<svg width="100%" height="100%" viewBox="0 0 260 220" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g filter="url(#sci-shadow-brain-3d)">
          <!-- Brain Silhouette & Lobes -->
          <!-- Frontal Lobe (Pink/Rose) -->
          <path d="M 60 110 C 50 60 90 35 140 35 C 150 70 120 110 60 110 Z" fill="#f472b6" stroke="#db2777" stroke-width="2"/>
          <!-- Parietal Lobe (Blue) -->
          <path d="M 140 35 C 190 35 210 70 210 110 C 160 110 150 70 140 35 Z" fill="#60a5fa" stroke="#2563eb" stroke-width="2"/>
          <!-- Occipital Lobe (Green) -->
          <path d="M 210 110 C 220 140 195 165 170 165 C 165 130 185 110 210 110 Z" fill="#4ade80" stroke="#16a34a" stroke-width="2"/>
          <!-- Temporal Lobe (Yellow/Orange) -->
          <path d="M 60 110 C 120 110 135 150 110 165 C 65 165 50 135 60 110 Z" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
          <!-- Cerebellum (المخيخ - Purple) -->
          <path d="M 170 165 C 190 165 195 195 160 195 C 145 195 150 175 170 165 Z" fill="#c084fc" stroke="#9333ea" stroke-width="2"/>
          <!-- Brain Stem (جذع الدماغ) -->
          <path d="M 130 165 L 145 165 L 140 210 L 125 210 Z" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/>

          <!-- Brain Sulci & Gyri (folds) -->
          <path d="M 80 60 Q 100 80 120 60 M 90 90 Q 110 100 130 85 M 150 65 Q 170 85 190 70" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.6"/>

          <!-- Labels -->
          <rect x="15" y="10" width="70" height="18" rx="4" fill="#f43f5e"/><text x="50" y="23" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">الفص الجبهي</text>
          <rect x="175" y="10" width="70" height="18" rx="4" fill="#3b82f6"/><text x="210" y="23" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">الفص الجداري</text>
          <rect x="175" y="185" width="70" height="18" rx="4" fill="#9333ea"/><text x="210" y="198" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">المخيخ</text>
        </g>
      </svg>`;
    }
  }
};
