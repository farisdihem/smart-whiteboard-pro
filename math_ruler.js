({'math.ruler': {
      type: 'math.ruler',
      category: 'math',
      name: 'Ruler',
      schemaVersion: 1,
      defaultProps: { color: 'rgba(234, 179, 8, 0.15)', rotation: 0, visualScale: 1, drawWithRuler: false },
      defaultSize: { w: 320, h: 50 },
      renderSVG: (props, w, h, el) => {
        const color = escapeXml(props.color || 'rgba(234, 179, 8, 0.15)');
        const svgW = Math.max(120, w);
        const svgH = Math.max(40, h);
        let ticks = '';
        const padding = 15;
        const availableW = svgW - padding * 2;
        // 1cm = 30px, 1mm = 3px
        const totalMM = Math.floor(availableW / 3);
        for (let i = 0; i <= totalMM; i++) {
          const x = padding + i * 3;
          let hT = 5;
          let strokeW = 0.5;
          const isCm = (i % 10 === 0);
          const isHalfCm = (i % 5 === 0 && !isCm);
          
          if (isCm) {
            hT = 14;
            strokeW = 1.25;
            ticks += `<text x="${x}" y="${svgH - 8}" fill="#1e293b" font-size="9.5" font-weight="bold" font-family="sans-serif" text-anchor="middle">${i / 10}</text>`;
          } else if (isHalfCm) {
            hT = 9;
            strokeW = 1.0;
          }
          ticks += `<line x1="${x}" y1="0" x2="${x}" y2="${hT}" stroke="#334155" stroke-width="${strokeW}"/>`;
        }

        const isSelected = el && el.classList.contains('selected');
        let handles = ''; if (isSelected) { // Left handle: blue circle with white center handles += `<circle cx="15" cy="${svgH / 2}" r="12" fill="#3b82f6" stroke="#ffffff" stroke-width="2.5" style="cursor:ew-resize;" /> <circle cx="15" cy="${svgH / 2}" r="4" fill="#ffffff" />`; // Right handle: blue circle with white center handles += `<circle cx="${svgW - 15}" cy="${svgH / 2}" r="12" fill="#3b82f6" stroke="#ffffff" stroke-width="2.5" style="cursor:ew-resize;" /> <circle cx="${svgW - 15}" cy="${svgH / 2}" r="4" fill="#ffffff" />`; // Top rotation stem & handle handles += `<line x1="${svgW / 2}" y1="0" x2="${svgW / 2}" y2="-20" stroke="#10b981" stroke-width="1.5" stroke-dasharray="2,2" /> <circle cx="${svgW / 2}" cy="-20" r="12" fill="#10b981" stroke="#ffffff" stroke-width="2.5" style="cursor:grab;" /> <!-- rotate icon path --> <path d="M ${svgW / 2 - 4} -22 A 4 4 0 1 1 ${svgW / 2 - 3} -17" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" /> <polygon points="${svgW / 2 - 5},-17 ${svgW / 2 - 2},-17 ${svgW / 2 - 4},-14" fill="#ffffff" />`; } const drawActiveIndicator = props.drawWithRuler ? ` <rect x="${svgW / 2 - 40}" y="${svgH - 24}" width="80" height="13" rx="4" fill="#ef4444" /> <text x="${svgW / 2}" y="${svgH - 14}" fill="#ffffff" font-size="8" font-weight="bold" font-family="sans-serif" text-anchor="middle">Item Item</text> ` :'';

        return `<svg width="100%" height="100%" viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;">
          <rect x="0" y="0" width="${svgW}" height="${svgH}" rx="4" fill="${color}" stroke="#64748b" stroke-width="1.5"/>
          ${ticks}
          ${drawActiveIndicator}
          ${handles}
          <text x="${svgW - 25}" y="${svgH - 8}" fill="#64748b" font-size="9" font-weight="bold" font-family="sans-serif">cm</text> </svg>`; } }, 'math.angle': { type: 'math.angle', category: 'math', name: 'Item Item Item', schemaVersion: 1, defaultProps: { color: '#ef4444', visualScale: 1, p1: { x: 50, y: 250 }, p2: { x: 150, y: 250 }, p3: { x: 150, y: 150 } }, defaultSize: { w: 300, h: 300 }, renderSVG: (props, w, h, el) => { const color = escapeXml(props.color || '#ef4444'); const p1 = props.p1 || { x: 50, y: 250 }; const p2 = props.p2 || { x: 150, y: 250 }; const p3 = props.p3 || { x: 150, y: 150 }; const dx1 = p1.x - p2.x; const dy1 = p1.y - p2.y; const dx2 = p3.x - p2.x; const dy2 = p3.y - p2.y; const len1 = Math.hypot(dx1, dy1) || 1; const len2 = Math.hypot(dx2, dy2) || 1; let angleRad = Math.acos((dx1 * dx2 + dy1 * dy2) / (len1 * len2)); let angleDeg = angleRad * (180 / Math.PI); if (isNaN(angleDeg)) angleDeg = 0; let startAng = Math.atan2(dy1, dx1); let endAng = Math.atan2(dy2, dx2); let diff = endAng - startAng; while (diff < -Math.PI) diff += Math.PI * 2; while (diff > Math.PI) diff -= Math.PI * 2; endAng = startAng + diff; const sweepFlag = diff > 0 ? 1 : 0; const rArc = 35; const xStart = p2.x + rArc * Math.cos(startAng); const yStart = p2.y + rArc * Math.sin(startAng); const xEnd = p2.x + rArc * Math.cos(endAng); const yEnd = p2.y + rArc * Math.sin(endAng); let arcPath = ''; if (angleDeg > 1 && angleDeg < 359) { arcPath = `<path d="M ${xStart} ${yStart} A ${rArc} ${rArc} 0 0 ${sweepFlag} ${xEnd} ${yEnd}" fill="none" stroke="${color}" stroke-width="2.5" stroke-opacity="0.75"/>`;
        }
        
        const isSelected = el && el.classList.contains('selected');
        let handles = '';
        if (isSelected) {
          handles = `
            <circle cx="${p1.x}" cy="${p1.y}" r="12" fill="#ef4444" stroke="#ffffff" stroke-width="2.5" style="cursor:pointer;"/>
            <circle cx="${p1.x}" cy="${p1.y}" r="3" fill="#ffffff"/>
            <text x="${p1.x}" y="${p1.y - 16}" fill="#ef4444" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">A</text>
            
            <circle cx="${p2.x}" cy="${p2.y}" r="12" fill="#3b82f6" stroke="#ffffff" stroke-width="2.5" style="cursor:pointer;"/>
            <circle cx="${p2.x}" cy="${p2.y}" r="3" fill="#ffffff"/>
            <text x="${p2.x}" y="${p2.y - 16}" fill="#3b82f6" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">B</text>
            
            <circle cx="${p3.x}" cy="${p3.y}" r="12" fill="#10b981" stroke="#ffffff" stroke-width="2.5" style="cursor:pointer;"/>
            <circle cx="${p3.x}" cy="${p3.y}" r="3" fill="#ffffff"/>
            <text x="${p3.x}" y="${p3.y - 16}" fill="#10b981" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">C</text>
          `;
        } else {
          handles = `
            <circle cx="${p1.x}" cy="${p1.y}" r="4" fill="${color}"/>
            <text x="${p1.x}" y="${p1.y - 10}" fill="${color}" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">A</text>
            
            <circle cx="${p2.x}" cy="${p2.y}" r="5" fill="${color}"/>
            <text x="${p2.x}" y="${p2.y - 10}" fill="${color}" font-size="11" font-weight="bold" font-family="sans-serif" text-anchor="middle">B</text>
            
            <circle cx="${p3.x}" cy="${p3.y}" r="4" fill="${color}"/>
            <text x="${p3.x}" y="${p3.y - 10}" fill="${color}" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">C</text>
          `;
        }
        
        const labelAng = startAng + diff / 2;
        const lx = p2.x + (rArc + 25) * Math.cos(labelAng);
        const ly = p2.y + (rArc + 25) * Math.sin(labelAng) + 3;
        
        return `<svg width="100%" height="100%" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;">
          <line x1="${p2.x}" y1="${p2.y}" x2="${p1.x}" y2="${p1.y}" stroke="${color}" stroke-width="2.5"/>
          <line x1="${p2.x}" y1="${p2.y}" x2="${p3.x}" y2="${p3.y}" stroke="${color}" stroke-width="2.5"/>
          ${arcPath}
          <g transform="translate(${lx}, ${ly})">
            <rect x="-35" y="-10" width="70" height="15" rx="3" fill="#1e293b" fill-opacity="0.8"/>
            <text x="0" y="1" fill="#ffffff" font-size="9.5" font-weight="bold" font-family="sans-serif" text-anchor="middle">ABC = ${angleDeg.toFixed(1)}°</text>
          </g>
          ${handles}
        </svg>`;
      }
    };
  }
}