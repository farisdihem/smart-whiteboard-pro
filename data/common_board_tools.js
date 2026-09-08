/* ═══════════════════════════════════════════════════════════════════════════
   COMMON WHITEBOARD & CLASSROOM INTERACTIVE TOOLS SUITE
   Timers, Stopwatches, 3D Coin Flip, Randomizer, Cartesian Grid & Smart Tools
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

export const COMMON_BOARD_TOOLS_REGISTRY = {
  'board.visual-timer': {
    type: 'board.visual-timer',
    category: 'general',
    name: 'مؤقت بصري دائري (Visual Classroom Timer)',
    schemaVersion: 1,
    defaultProps: { totalMinutes: 15, remainingMinutes: 10, color: '#ef4444' },
    defaultSize: { w: 200, h: 220 },
    renderSVG: (props, w, h) => {
      const tot = props.totalMinutes || 15;
      const rem = props.remainingMinutes !== undefined ? props.remainingMinutes : 10;
      const pct = Math.max(0, Math.min(1, rem / tot));
      const cx = 100, cy = 100, r = 75;
      const angle = pct * 2 * Math.PI - Math.PI / 2;
      const x2 = cx + r * Math.cos(angle);
      const y2 = cy + r * Math.sin(angle);
      const largeArc = pct > 0.5 ? 1 : 0;

      return `<svg width="100%" height="100%" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="timer-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="4" stdDeviation="4" flood-color="#0f172a" flood-opacity="0.3" />
          </filter>
        </defs>
        <g filter="url(#timer-shadow)">
          <!-- Outer Clock Casing -->
          <circle cx="${cx}" cy="${cy}" r="${r + 10}" fill="#1e293b" stroke="#475569" stroke-width="3"/>
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
          
          <!-- Visual Remaining Time Pie Wedge -->
          <path d="M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z" fill="#ef4444" opacity="0.85"/>
          
          <!-- Clock Ticks -->
          <circle cx="${cx}" cy="${cy}" r="6" fill="#0f172a"/>
          
          <!-- Remaining Minutes Digital Pill -->
          <rect x="50" y="185" width="100" height="28" rx="8" fill="#0f172a" stroke="#334155"/>
          <text x="${cx}" y="204" fill="#38bdf8" font-size="14" font-family="monospace" font-weight="bold" text-anchor="middle">${rem}:00 min</text>
        </g>
      </svg>`;
    }
  },

  'board.coin-flipper': {
    type: 'board.coin-flipper',
    category: 'general',
    name: 'قطعة نقود ثلاثية الأبعاد (3D Coin Flipper)',
    schemaVersion: 1,
    defaultProps: { side: 'heads', value: '100 دج', color: '#eab308' },
    defaultSize: { w: 160, h: 160 },
    renderSVG: (props, w, h) => {
      const isHeads = props.side !== 'tails';
      return `<svg width="100%" height="100%" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="coin-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="35%" stop-color="#eab308" />
            <stop offset="85%" stop-color="#ca8a04" />
            <stop offset="100%" stop-color="#854d0e" />
          </linearGradient>
          <filter id="coin-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#0f172a" flood-opacity="0.35" />
          </filter>
        </defs>
        <g filter="url(#coin-shadow)">
          <!-- Coin Rim 3D Edge -->
          <circle cx="80" cy="80" r="65" fill="#713f12"/>
          <circle cx="80" cy="78" r="63" fill="url(#coin-gold)" stroke="#fef08a" stroke-width="2"/>
          <!-- Inner Relief Ring -->
          <circle cx="80" cy="78" r="50" fill="none" stroke="#713f12" stroke-width="1.5" stroke-dasharray="4,2"/>
          <!-- Embossed Face -->
          <text x="80" y="75" fill="#713f12" font-size="22" font-family="sans-serif" font-weight="bold" text-anchor="middle">${isHeads ? '100' : 'وجه'}</text>
          <text x="80" y="96" fill="#713f12" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">${isHeads ? 'دينار جزائري' : 'طرة'}</text>
        </g>
      </svg>`;
    }
  },

  'board.cartesian-grid-pro': {
    type: 'board.cartesian-grid-pro',
    category: 'general',
    name: 'معلم متعامد ومتجانس احترافي (Cartesian Grid Pro)',
    schemaVersion: 1,
    defaultProps: { xMin: -6, xMax: 6, yMin: -4, yMax: 4, step: 1, color: '#3b82f6' },
    defaultSize: { w: 300, h: 220 },
    renderSVG: (props, w, h) => {
      const cx = 150, cy = 110, stepPx = 20;
      let gridLines = '';
      for (let x = 10; x <= 290; x += stepPx) {
        gridLines += `<line x1="${x}" y1="10" x2="${x}" y2="210" stroke="#334155" stroke-width="0.8" stroke-dasharray="2,2"/>`;
      }
      for (let y = 10; y <= 210; y += stepPx) {
        gridLines += `<line x1="10" y1="${y}" x2="290" y2="${y}" stroke="#334155" stroke-width="0.8" stroke-dasharray="2,2"/>`;
      }

      return `<svg width="100%" height="100%" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="grid-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.25" />
          </filter>
        </defs>
        <g filter="url(#grid-shadow)">
          <rect x="6" y="6" width="288" height="208" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
          <g>${gridLines}</g>
          <!-- Major Axes X and Y -->
          <line x1="15" y1="${cy}" x2="285" y2="${cy}" stroke="#38bdf8" stroke-width="2"/>
          <polygon points="288,${cy} 280,${cy - 4} 280,${cy + 4}" fill="#38bdf8"/>
          <line x1="${cx}" y1="205" x2="${cx}" y2="15" stroke="#38bdf8" stroke-width="2"/>
          <polygon points="${cx},12 ${cx - 4},20 ${cx + 4},20" fill="#38bdf8"/>
          <!-- Origin O (0,0) -->
          <text x="${cx - 10}" y="${cy + 14}" fill="#94a3b8" font-size="11" font-weight="bold">O</text>
          <!-- Vector Basis (i, j) -->
          <line x1="${cx}" y1="${cy}" x2="${cx + stepPx}" y2="${cy}" stroke="#ef4444" stroke-width="3"/>
          <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - stepPx}" stroke="#10b981" stroke-width="3"/>
          <text x="${cx + stepPx/2}" y="${cy - 4}" fill="#ef4444" font-size="10" font-weight="bold">i⃗</text>
          <text x="${cx + 6}" y="${cy - stepPx/2}" fill="#10b981" font-size="10" font-weight="bold">j⃗</text>
        </g>
      </svg>`;
    }
  }
};
