const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const oldLaser = `  /* ══════ LASER TRAIL RENDER ══════ */
  function renderLaser() {
    dfx.clearRect(0, 0, WW, WH);
    const now = Date.now();
    laserPoints = laserPoints.filter((pt) => now - pt.time < 1000);
    if (laserPoints.length > 0) {
      dfx.save();
      dfx.lineCap = 'round';
      dfx.lineJoin = 'round';
      // Draw trailing glowing lines
      for (let i = 1; i < laserPoints.length; i++) {
        const p1 = laserPoints[i - 1];
        const p2 = laserPoints[i];
        const age = now - p2.time;
        const alpha = Math.max(0, 1 - age / 1000);
        dfx.beginPath();
        dfx.moveTo(p1.x, p1.y);
        dfx.lineTo(p2.x, p2.y);
        dfx.strokeStyle = \`rgba(239, 68, 68, \${alpha})\`;
        dfx.lineWidth = 10 * alpha + 2;
        dfx.shadowColor = '#ef4444';
        dfx.shadowBlur = 14;
        dfx.stroke();
      }
      // Draw laser tip pointer dot (glowing red dot with white center)
      const tip = laserPoints[laserPoints.length - 1];
      const tipAge = now - tip.time;
      const tipAlpha = Math.max(0, 1 - tipAge / 1000);
      if (tipAlpha > 0) {
        dfx.beginPath();
        dfx.arc(tip.x, tip.y, 8, 0, Math.PI * 2);
        dfx.fillStyle = \`rgba(239, 68, 68, \${tipAlpha * 0.5})\`;
        dfx.shadowColor = '#ef4444';
        dfx.shadowBlur = 20;
        dfx.fill();
        dfx.beginPath();
        dfx.arc(tip.x, tip.y, 5, 0, Math.PI * 2);
        dfx.fillStyle = \`rgba(239, 68, 68, \${tipAlpha})\`;
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

code = code.replace(/\/\* ══════ LASER TRAIL RENDER ══════ \*\/\s*function renderLaser\(\) \{[\s\S]*?laserTimer = null;\s*needsRender = true;\s*\}\s*\}/, oldLaser);

fs.writeFileSync('app.js', code);
console.log('Laser code reverted!');
