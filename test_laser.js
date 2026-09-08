const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const newLaser = `  /* ══════ LASER TRAIL RENDER ══════ */
  function renderLaser() {
    dfx.clearRect(0, 0, WW, WH);
    const now = Date.now();
    const LASER_LIFETIME = 800;
    laserPoints = laserPoints.filter((pt) => now - pt.time < LASER_LIFETIME);

    if (laserPoints.length > 0) {
      dfx.save();
      dfx.lineCap = 'round';
      dfx.lineJoin = 'round';

      let r = 239, g = 68, b = 68; // Default Red
      if (S.color && S.color !== '#1e1e1e' && S.color !== '#000000') {
        const hex = S.color.replace('#', '');
        if (hex.length === 6) {
          r = parseInt(hex.substring(0, 2), 16);
          g = parseInt(hex.substring(2, 4), 16);
          b = parseInt(hex.substring(4, 6), 16);
        }
      }

      if (laserPoints.length > 1) {
        for (let i = 1; i < laserPoints.length; i++) {
          const p0 = i > 1 ? laserPoints[i - 2] : laserPoints[0];
          const p1 = laserPoints[i - 1];
          const p2 = laserPoints[i];
          
          const age = now - p2.time;
          const alpha = Math.max(0, 1 - age / LASER_LIFETIME);
          const widthMult = Math.sin((alpha * Math.PI) / 2);
          
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          const prevMidX = (p0.x + p1.x) / 2;
          const prevMidY = (p0.y + p1.y) / 2;

          // Outer Glow
          dfx.beginPath();
          dfx.moveTo(prevMidX, prevMidY);
          dfx.quadraticCurveTo(p1.x, p1.y, midX, midY);
          dfx.strokeStyle = \`rgba(\${r}, \${g}, \${b}, \${alpha * 0.5})\`;
          dfx.lineWidth = 14 * widthMult;
          dfx.stroke();

          // Inner Core
          dfx.beginPath();
          dfx.moveTo(prevMidX, prevMidY);
          dfx.quadraticCurveTo(p1.x, p1.y, midX, midY);
          dfx.strokeStyle = \`rgba(255, 255, 255, \${alpha * 0.9})\`;
          dfx.lineWidth = 4 * widthMult;
          dfx.stroke();
          
          if (i === laserPoints.length - 1) {
            dfx.beginPath();
            dfx.moveTo(midX, midY);
            dfx.lineTo(p2.x, p2.y);
            dfx.strokeStyle = \`rgba(\${r}, \${g}, \${b}, \${alpha * 0.5})\`;
            dfx.lineWidth = 14 * widthMult;
            dfx.stroke();
            
            dfx.beginPath();
            dfx.moveTo(midX, midY);
            dfx.lineTo(p2.x, p2.y);
            dfx.strokeStyle = \`rgba(255, 255, 255, \${alpha * 0.9})\`;
            dfx.lineWidth = 4 * widthMult;
            dfx.stroke();
          }
        }
      }

      const tip = laserPoints[laserPoints.length - 1];
      const tipAge = now - tip.time;
      const tipAlpha = Math.max(0, 1 - tipAge / LASER_LIFETIME);

      if (tipAlpha > 0) {
        dfx.beginPath();
        dfx.arc(tip.x, tip.y, 12, 0, Math.PI * 2);
        dfx.fillStyle = \`rgba(\${r}, \${g}, \${b}, \${tipAlpha * 0.3})\`;
        dfx.fill();
        
        dfx.beginPath();
        dfx.arc(tip.x, tip.y, 6, 0, Math.PI * 2);
        dfx.fillStyle = \`rgba(\${r}, \${g}, \${b}, \${tipAlpha * 0.8})\`;
        dfx.fill();

        dfx.beginPath();
        dfx.arc(tip.x, tip.y, 2.5, 0, Math.PI * 2);
        dfx.fillStyle = \`rgba(255, 255, 255, \${tipAlpha})\`;
        dfx.fill();
      }

      dfx.restore();
      needsRender = true;
      laserTimer = requestAnimationFrame(renderLaser);
    } else {
      laserTimer = null;
      needsRender = true;
    }
  }`;

code = code.replace(/\/\* ══════ LASER TRAIL RENDER ══════ \*\/\s*function renderLaser\(\) \{[\s\S]*?laserTimer = null;\s*needsRender = true;\s*\}\s*\}/, newLaser);

fs.writeFileSync('app.js', code);
console.log('Laser code replaced!');
