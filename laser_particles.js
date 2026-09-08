const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const newLaser = `  /* ══════ LASER TRAIL RENDER ══════ */
  let laserParticles = [];
  function renderLaser() {
    dfx.clearRect(0, 0, WW, WH);
    const now = Date.now();
    const LASER_LIFETIME = 800;
    laserPoints = laserPoints.filter((pt) => now - pt.time < LASER_LIFETIME);
    laserParticles = laserParticles.filter((p) => now - p.time < p.life);

    // Spawn particles around the tip
    if (laserPoints.length > 0) {
      const tip = laserPoints[laserPoints.length - 1];
      if (now - tip.time < 100) { // Only spawn if actively moving/recent
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
      if (S.color && S.color !== '#1e1e1e' && S.color !== '#000000') {
        const hex = S.color.replace('#', '');
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

        // Compute alpha based on newest point
        const age = now - laserPoints[laserPoints.length - 1].time;
        const trailAlpha = Math.max(0, 1 - age / LASER_LIFETIME);

        dfx.strokeStyle = \`rgba(\${r}, \${g}, \${b}, \${trailAlpha * 0.4})\`;
        dfx.lineWidth = 12;
        dfx.stroke();

        dfx.strokeStyle = \`rgba(\${r}, \${g}, \${b}, \${trailAlpha * 0.8})\`;
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
        dfx.fillStyle = \`rgba(\${r}, \${g}, \${b}, \${pAlpha})\`;
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
          dfx.fillStyle = \`rgba(\${r}, \${g}, \${b}, \${tipAlpha * 0.25})\`;
          dfx.fill();
          
          // Inner core
          dfx.beginPath();
          dfx.arc(tip.x, tip.y, 6, 0, Math.PI * 2);
          dfx.fillStyle = \`rgba(\${r}, \${g}, \${b}, \${tipAlpha * 0.8})\`;
          dfx.fill();

          // White center
          dfx.beginPath();
          dfx.arc(tip.x, tip.y, 2.5, 0, Math.PI * 2);
          dfx.fillStyle = \`rgba(255, 255, 255, \${tipAlpha})\`;
          dfx.fill();
        }
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
