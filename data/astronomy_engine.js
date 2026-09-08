/* ═══════════════════════════════════════════════════════════════════════════
   INTERACTIVE ASTRONOMY & SKY MAP ENGINE
   Scientifically accurate astronomical engine for interactive whiteboards.
   ═══════════════════════════════════════════════════════════════════════════ */

/* 1. REAL ASTRONOMICAL DATASETS & PARAMETERS */

export const SOLAR_SYSTEM_DATA = {
  sun: {
    id: 'sun',
    name_en: 'The Sun',
    name: 'The Sun',
    type: 'Yellow Dwarf Star (G2V)',
    diameter_km: 1392700,
    mass_kg: '1.989 × 10³⁰ kg',
    dist_au: 0,
    dist_km: '0 km',
    orbital_period: '225-250 Million Years (Galactic Year)',
    rotation_period: '25.38 Days (at equator)',
    temp_c: '5,500 °C (Surface) / 15,000,000 °C (Core)',
    gravity_m_s2: 274.0,
    moons: 0,
    atmosphere: '92.1% Hydrogen, 7.8% Helium',
    color: '#f59e0b',
    glowColor: '#fef08a',
    fact: 'The Sun accounts for approximately 99.86% of the total mass of the entire Solar System.'
  },
  mercury: {
    id: 'mercury',
    name_en: 'Mercury',
    name: 'Mercury',
    type: 'Terrestrial Rocky Planet',
    diameter_km: 4879,
    mass_kg: '3.301 × 10²³ kg',
    dist_au: 0.387,
    dist_km: '57.9 Million km',
    orbital_period: '87.97 Days',
    rotation_period: '58.65 Days',
    eccentricity: 0.2056,
    temp_c: '-180 °C to +430 °C',
    gravity_m_s2: 3.7,
    moons: 0,
    atmosphere: 'Trace Exosphere (Oxygen, Sodium, Hydrogen)',
    color: '#a3a3a3',
    fact: 'Smallest planet in the Solar System and closest to the Sun, experiencing the highest diurnal temperature variation.'
  },
  venus: {
    id: 'venus',
    name_en: 'Venus',
    name: 'Venus',
    type: 'Terrestrial Planet (Earth\'s Twin)',
    diameter_km: 12104,
    mass_kg: '4.867 × 10²⁴ kg',
    dist_au: 0.723,
    dist_km: '108.2 Million km',
    orbital_period: '224.7 Days',
    rotation_period: '243 Days (Retrograde Rotation)',
    eccentricity: 0.0067,
    temp_c: '+462 °C (Hottest Planet)',
    gravity_m_s2: 8.87,
    moons: 0,
    atmosphere: '96.5% CO₂, 3.5% Nitrogen (Runaway Greenhouse Effect)',
    color: '#fef08a',
    fact: 'The hottest planet in the Solar System due to dense greenhouse gases, spinning in the opposite direction of most planets.'
  },
  earth: {
    id: 'earth',
    name_en: 'Earth',
    name: 'Earth',
    type: 'Terrestrial Planet (Goldilocks Zone)',
    diameter_km: 12742,
    mass_kg: '5.972 × 10²⁴ kg',
    dist_au: 1.000,
    dist_km: '149.6 Million km',
    orbital_period: '365.25 Days',
    rotation_period: '23.93 Hours',
    eccentricity: 0.0167,
    temp_c: '-89 °C to +58 °C (Mean 15 °C)',
    gravity_m_s2: 9.81,
    moons: 1,
    atmosphere: '78.08% Nitrogen, 20.95% Oxygen, 0.93% Argon',
    color: '#38bdf8',
    fact: 'The only known celestial body harboring active life and liquid surface oceans, shielded by a strong magnetic field.'
  },
  mars: {
    id: 'mars',
    name_en: 'Mars',
    name: 'Mars',
    type: 'Terrestrial Planet (The Red Planet)',
    diameter_km: 6779,
    mass_kg: '6.417 × 10²³ kg',
    dist_au: 1.524,
    dist_km: '227.9 Million km',
    orbital_period: '686.98 Days (1.88 Years)',
    rotation_period: '24.62 Hours',
    eccentricity: 0.0934,
    temp_c: '-125 °C to +20 °C',
    gravity_m_s2: 3.71,
    moons: 2,
    atmosphere: '95.3% CO₂, 2.7% Nitrogen, 1.6% Argon',
    color: '#ef4444',
    fact: 'Hosts Olympus Mons (21.9 km high), the tallest volcano in the Solar System, and has two moons: Phobos and Deimos.'
  },
  jupiter: {
    id: 'jupiter',
    name_en: 'Jupiter',
    name: 'Jupiter',
    type: 'Gas Giant',
    diameter_km: 139822,
    mass_kg: '1.898 × 10²⁷ kg (318× Earth)',
    dist_au: 5.204,
    dist_km: '778.5 Million km',
    orbital_period: '4332.59 Days (11.86 Years)',
    rotation_period: '9.93 Hours (Fastest Rotation)',
    eccentricity: 0.0489,
    temp_c: '-110 °C',
    gravity_m_s2: 24.79,
    moons: 95,
    atmosphere: '89.8% Hydrogen, 10.2% Helium',
    color: '#f59e0b',
    fact: 'The largest planet in the Solar System, characterized by the Great Red Spot—a persistent anticyclonic storm larger than Earth.'
  },
  saturn: {
    id: 'saturn',
    name_en: 'Saturn',
    name: 'Saturn',
    type: 'Ringed Gas Giant',
    diameter_km: 116460,
    mass_kg: '5.683 × 10²⁶ kg (95× Earth)',
    dist_au: 9.582,
    dist_km: '1,434 Million km',
    orbital_period: '10759.22 Days (29.46 Years)',
    rotation_period: '10.7 Hours',
    eccentricity: 0.0565,
    temp_c: '-140 °C',
    gravity_m_s2: 10.44,
    moons: 146,
    atmosphere: '96.3% Hydrogen, 3.2% Helium',
    color: '#fde047',
    hasRings: true,
    fact: 'Has the most extensive and majestic ring system made of ice and rock particles, with an overall density lower than water.'
  },
  uranus: {
    id: 'uranus',
    name_en: 'Uranus',
    name: 'Uranus',
    type: 'Ice Giant',
    diameter_km: 50724,
    mass_kg: '8.681 × 10²⁵ kg',
    dist_au: 19.20,
    dist_km: '2,871 Million km',
    orbital_period: '30687 Days (84.01 Years)',
    rotation_period: '17.24 Hours (Axial Tilt 97.8°)',
    eccentricity: 0.0463,
    temp_c: '-195 °C to -224 °C (Coldest Planet)',
    gravity_m_s2: 8.69,
    moons: 28,
    atmosphere: '82.5% Hydrogen, 15.2% Helium, 2.3% Methane',
    color: '#22d3ee',
    hasRings: true,
    fact: 'Rotates on its side with an extreme axial tilt of 97.8 degrees, causing each pole to face the Sun continuously for 42 years.'
  },
  neptune: {
    id: 'neptune',
    name_en: 'Neptune',
    name: 'Neptune',
    type: 'Deep Blue Ice Giant',
    diameter_km: 49244,
    mass_kg: '1.024 × 10²⁶ kg',
    dist_au: 30.05,
    dist_km: '4,495 Million km',
    orbital_period: '60190 Days (164.8 Years)',
    rotation_period: '16.11 Hours',
    eccentricity: 0.0095,
    temp_c: '-200 °C',
    gravity_m_s2: 11.15,
    moons: 16,
    atmosphere: '80% Hydrogen, 19% Helium, 1.5% Methane',
    color: '#3b82f6',
    hasRings: true,
    fact: 'The most distant major planet in the Solar System, with the fiercest supersonic winds exceeding 2,100 km/h.'
  },
  pluto: {
    id: 'pluto',
    name_en: 'Pluto',
    name: 'Pluto',
    type: 'Dwarf Planet (Kuiper Belt)',
    diameter_km: 2376,
    mass_kg: '1.303 × 10²² kg',
    dist_au: 39.48,
    dist_km: '5,906 Million km',
    orbital_period: '90560 Days (248 Years)',
    rotation_period: '6.39 Days',
    eccentricity: 0.2488,
    temp_c: '-229 °C',
    gravity_m_s2: 0.62,
    moons: 5,
    atmosphere: 'Nitrogen, Methane, Carbon Monoxide',
    color: '#cbd5e1',
    fact: 'Reclassified as a dwarf planet in 2006 by the IAU due to its orbital location within the icy trans-Neptunian Kuiper belt.'
  }
};

/* 2. CONSTELLATIONS & STAR CATALOG DATA */

export const CONSTELLATIONS_CATALOG = [
  {
    id: 'ursa-major',
    name: 'Ursa Major (Big Dipper)',
    name_en: 'Ursa Major',
    stars: [
      { name: 'Dubhe (Alpha)', name_en: 'Dubhe (Alpha)', mag: 1.79, ra: 11.06, dec: 61.75, color: '#fef08a' },
      { name: 'Merak (Beta)', name_en: 'Merak (Beta)', mag: 2.37, ra: 11.03, dec: 56.38, color: '#ffffff' },
      { name: 'Phecda (Gamma)', name_en: 'Phecda (Gamma)', mag: 2.44, ra: 11.90, dec: 53.69, color: '#ffffff' },
      { name: 'Megrez (Delta)', name_en: 'Megrez (Delta)', mag: 3.31, ra: 12.25, dec: 57.03, color: '#ffffff' },
      { name: 'Alioth (Epsilon)', name_en: 'Alioth (Epsilon)', mag: 1.77, ra: 12.90, dec: 55.96, color: '#38bdf8' },
      { name: 'Mizar (Zeta)', name_en: 'Mizar (Zeta)', mag: 2.23, ra: 13.40, dec: 54.92, color: '#ffffff' },
      { name: 'Alkaid (Eta)', name_en: 'Alkaid (Eta)', mag: 1.86, ra: 13.79, dec: 49.31, color: '#60a5fa' }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]]
  },
  {
    id: 'ursa-minor',
    name: 'Ursa Minor (Little Dipper)',
    name_en: 'Ursa Minor',
    stars: [
      { name: 'Polaris (North Star)', name_en: 'Polaris (North Star)', mag: 1.98, ra: 2.53, dec: 89.26, color: '#fef08a' },
      { name: 'Yildun (Delta)', name_en: 'Yildun (Delta)', mag: 4.35, ra: 17.53, dec: 86.58, color: '#ffffff' },
      { name: 'Epsilon UMi', name_en: 'Epsilon UMi', mag: 4.21, ra: 16.76, dec: 82.03, color: '#38bdf8' },
      { name: 'Zeta UMi', name_en: 'Zeta UMi', mag: 4.29, ra: 15.73, dec: 77.79, color: '#ffffff' },
      { name: 'Eta UMi', name_en: 'Eta UMi', mag: 4.95, ra: 16.29, dec: 75.75, color: '#ffffff' },
      { name: 'Pherkad (Gamma)', name_en: 'Pherkad (Gamma)', mag: 3.05, ra: 15.35, dec: 71.83, color: '#ffffff' },
      { name: 'Kochab (Beta)', name_en: 'Kochab (Beta)', mag: 2.08, ra: 14.85, dec: 74.15, color: '#f97316' }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]]
  },
  {
    id: 'orion',
    name: 'Orion (The Hunter)',
    name_en: 'Orion',
    stars: [
      { name: 'Betelgeuse (Red Supergiant)', name_en: 'Betelgeuse', mag: 0.50, ra: 5.92, dec: 7.41, color: '#ef4444' },
      { name: 'Rigel (Blue Supergiant)', name_en: 'Rigel', mag: 0.12, ra: 5.24, dec: -8.20, color: '#38bdf8' },
      { name: 'Bellatrix (Gamma)', name_en: 'Bellatrix', mag: 1.64, ra: 5.42, dec: 6.35, color: '#60a5fa' },
      { name: 'Saiph (Kappa)', name_en: 'Saiph', mag: 2.07, ra: 5.79, dec: -9.67, color: '#38bdf8' },
      { name: 'Alnitak (Belt)', name_en: 'Alnitak', mag: 1.74, ra: 5.68, dec: -1.94, color: '#38bdf8' },
      { name: 'Alnilam (Belt)', name_en: 'Alnilam', mag: 1.69, ra: 5.60, dec: -1.20, color: '#38bdf8' },
      { name: 'Mintaka (Belt)', name_en: 'Mintaka', mag: 2.25, ra: 5.53, dec: -0.30, color: '#38bdf8' }
    ],
    lines: [[0, 2], [2, 6], [6, 5], [5, 4], [4, 0], [6, 1], [4, 3], [1, 3]]
  },
  {
    id: 'cassiopeia',
    name: 'Cassiopeia (The Queen)',
    name_en: 'Cassiopeia',
    stars: [
      { name: 'Caph (Beta)', name_en: 'Caph', mag: 2.28, ra: 0.15, dec: 59.15, color: '#fef08a' },
      { name: 'Schedar (Alpha)', name_en: 'Schedar', mag: 2.24, ra: 0.68, dec: 56.54, color: '#f97316' },
      { name: 'Gamma Cas', name_en: 'Gamma Cas', mag: 2.15, ra: 0.94, dec: 60.72, color: '#38bdf8' },
      { name: 'Ruchbah (Delta)', name_en: 'Ruchbah', mag: 2.68, ra: 1.43, dec: 60.23, color: '#ffffff' },
      { name: 'Segin (Epsilon)', name_en: 'Segin', mag: 3.35, ra: 1.91, dec: 63.67, color: '#ffffff' }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]]
  },
  {
    id: 'scorpius',
    name: 'Scorpius (The Scorpion)',
    name_en: 'Scorpius',
    stars: [
      { name: 'Antares (Red Supergiant)', name_en: 'Antares', mag: 0.96, ra: 16.49, dec: -26.43, color: '#ef4444' },
      { name: 'Dschubba (Delta)', name_en: 'Dschubba', mag: 2.29, ra: 16.00, dec: -22.62, color: '#38bdf8' },
      { name: 'Acrab (Beta)', name_en: 'Acrab', mag: 2.56, ra: 16.09, dec: -19.80, color: '#ffffff' },
      { name: 'Larawag (Epsilon)', name_en: 'Larawag', mag: 2.99, ra: 16.84, dec: -38.05, color: '#ffffff' },
      { name: 'Shaula (Lambda)', name_en: 'Shaula', mag: 1.62, ra: 17.56, dec: -37.10, color: '#38bdf8' }
    ],
    lines: [[2, 1], [1, 0], [0, 3], [3, 4]]
  }
];

/* 3. MOON PHASES DATASET */

export const MOON_PHASES_DATA = [
  { id: 'new_moon', name: 'New Moon', name_en: 'New Moon', age_days: 0.0, percent: 0, desc: 'The Moon is positioned between Earth and the Sun; the illuminated side faces away from Earth.' },
  { id: 'waxing_crescent', name: 'Waxing Crescent', name_en: 'Waxing Crescent', age_days: 3.7, percent: 25, desc: 'A growing silver sliver visible in the western sky right after sunset.' },
  { id: 'first_quarter', name: 'First Quarter', name_en: 'First Quarter', age_days: 7.4, percent: 50, desc: 'Half of the illuminated moon is visible from Earth (90-degree angle from the Sun).' },
  { id: 'waxing_gibbous', name: 'Waxing Gibbous', name_en: 'Waxing Gibbous', age_days: 11.1, percent: 75, desc: 'More than half of the visible disk is illuminated and expanding toward full phase.' },
  { id: 'full_moon', name: 'Full Moon', name_en: 'Full Moon', age_days: 14.8, percent: 100, desc: 'Earth is between the Sun and Moon; the entire lunar disk reflects sunlight.' },
  { id: 'waning_gibbous', name: 'Waning Gibbous', name_en: 'Waning Gibbous', age_days: 18.5, percent: 75, desc: 'The illuminated portion begins shrinking gradually after full phase.' },
  { id: 'third_quarter', name: 'Third / Last Quarter', name_en: 'Third Quarter', age_days: 22.1, percent: 50, desc: 'The opposing half of the lunar surface is illuminated as the cycle concludes.' },
  { id: 'waning_crescent', name: 'Waning Crescent', name_en: 'Waning Crescent', age_days: 25.8, percent: 25, desc: 'A slender illuminated crescent visible in the eastern sky just before sunrise.' }
];

/* ══════════════════════════════════════════
   4. RENDER HELPER: SKY MAP & CELESTIAL SPHERE
   ══════════════════════════════════════════ */

export function renderSkyMapSVG(props = {}, width = 600, height = 550) {
  const mode = props.mode || 'named';
  const showConstellationLines = props.showConstellationLines !== false;
  const showGrid = props.showGrid !== false;
  const showEcliptic = props.showEcliptic !== false;
  const observerLat = props.observerLat || 38.9;

  const cx = 300, cy = 260, r = 210;

  let constellationSvg = '';
  let starsSvg = '';
  let quizLabels = '';

  CONSTELLATIONS_CATALOG.forEach((constellation, idx) => {
    const points = constellation.stars.map(s => {
      const rad = ((90 - s.dec) / 90) * r * 1.8;
      const angle = (s.ra * 15 - 90) * (Math.PI / 180);
      const x = cx + rad * Math.cos(angle);
      const y = cy + rad * Math.sin(angle);
      return { ...s, x, y };
    });

    if (showConstellationLines) {
      constellation.lines.forEach(([i, j]) => {
        if (points[i] && points[j]) {
          constellationSvg += `<line x1="${points[i].x.toFixed(1)}" y1="${points[i].y.toFixed(1)}" x2="${points[j].x.toFixed(1)}" y2="${points[j].y.toFixed(1)}" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="3 2" opacity="0.8"/>`;
        }
      });
    }

    points.forEach(p => {
      const starR = Math.max(2, (4 - p.mag) * 1.5);
      starsSvg += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${starR.toFixed(1)}" fill="${p.color}" stroke="#ffffff" stroke-width="0.5"/>`;
      if (mode === 'named') {
        starsSvg += `<text x="${(p.x + 6).toFixed(1)}" y="${(p.y + 3).toFixed(1)}" fill="#e2e8f0" font-size="9.5" font-family="sans-serif">${p.name || p.name_en}</text>`;
      }
    });

    if (mode === 'named' && points[0]) {
      const cLabelX = points[0].x;
      const cLabelY = points[0].y - 12;
      constellationSvg += `<text x="${cLabelX.toFixed(1)}" y="${cLabelY.toFixed(1)}" fill="#fbbf24" font-size="11" font-weight="bold" font-family="sans-serif" text-anchor="middle">${constellation.name || constellation.name_en}</text>`;
    } else if (mode === 'quiz') {
      const cLabelX = points[0].x;
      const cLabelY = points[0].y - 10;
      quizLabels += `<g class="quiz-item" cursor="pointer" data-target="${constellation.name || constellation.name_en}">
        <rect x="${(cLabelX - 25).toFixed(1)}" y="${(cLabelY - 12).toFixed(1)}" width="50" height="18" rx="4" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1"/>
        <text x="${cLabelX.toFixed(1)}" y="${(cLabelY + 1).toFixed(1)}" fill="#60a5fa" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">? [${idx + 1}]</text>
      </g>`;
    }
  });

  let eclipticSvg = '';
  if (showEcliptic) {
    eclipticSvg = `<path d="M ${cx - r * 0.9} ${cy + 30} Q ${cx} ${cy - r * 0.4} ${cx + r * 0.9} ${cy + 30}" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="${cx - 90}" y="${cy - 40}" fill="#f59e0b" font-size="10.5" font-weight="bold" font-family="sans-serif">Ecliptic Plane (Sun Path)</text>`;
  }

  let gridSvg = '';
  if (showGrid) {
    gridSvg = `
      <circle cx="${cx}" cy="${cy}" r="${(r * 0.33).toFixed(1)}" fill="none" stroke="#475569" stroke-width="0.8" stroke-dasharray="2 2"/>
      <circle cx="${cx}" cy="${cy}" r="${(r * 0.66).toFixed(1)}" fill="none" stroke="#475569" stroke-width="0.8" stroke-dasharray="2 2"/>
      <line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="#475569" stroke-width="0.8"/>
      <line x1="${cx}" y1="${cy - r}" x2="${cx}" y2="${cy + r}" stroke="#475569" stroke-width="0.8"/>
    `;
  }

  return `<svg width="100%" height="100%" viewBox="0 0 600 550" xmlns="http://www.w3.org/2000/svg" style="background:#090d16; border-radius:16px;" dir="ltr">
    <defs>
      <radialGradient id="skyGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="70%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#020617"/>
      </radialGradient>
    </defs>

    <rect width="600" height="550" rx="16" fill="url(#skyGrad)"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#0f172a" stroke="#3b82f6" stroke-width="3"/>

    ${gridSvg}
    ${eclipticSvg}
    ${constellationSvg}
    ${starsSvg}
    ${quizLabels}

    <text x="${cx}" y="${cy - r - 10}" fill="#ef4444" font-size="13" font-weight="bold" font-family="sans-serif" text-anchor="middle">North (N)</text>
    <text x="${cx}" y="${cy + r + 22}" fill="#38bdf8" font-size="13" font-weight="bold" font-family="sans-serif" text-anchor="middle">South (S)</text>
    <text x="${cx - r - 15}" y="${cy + 5}" fill="#38bdf8" font-size="13" font-weight="bold" font-family="sans-serif" text-anchor="end">East (E)</text>
    <text x="${cx + r + 15}" y="${cy + 5}" fill="#38bdf8" font-size="13" font-weight="bold" font-family="sans-serif" text-anchor="start">West (W)</text>

    <g transform="translate(20, 500)">
      <rect width="320" height="36" rx="8" fill="#1e293b" fill-opacity="0.9" stroke="#334155"/>
      <text x="160" y="22" fill="#f8fafc" font-size="11" font-weight="bold" font-family="sans-serif" text-anchor="middle">
        Celestial Sky Dome Map - Lat ${observerLat}° N
      </text>
    </g>
  </svg>`;
}

/* ══════════════════════════════════════════
   5. RENDER HELPER: SOLAR SYSTEM ENGINE
   ══════════════════════════════════════════ */

export function renderSolarSystemSVG(props = {}, width = 600, height = 550) {
  const mode = props.mode || 'named';
  const showOrbits = props.showOrbits !== false;
  const selectedPlanet = props.selectedPlanet || null;

  const cx = 300, cy = 270;
  const planetsList = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

  const distancesLog = [45, 70, 100, 130, 180, 220, 250, 275];
  const planetRadii = [4, 6, 7, 5, 16, 13, 10, 9];

  let orbitsSvg = '';
  let planetsSvg = '';

  planetsList.forEach((key, idx) => {
    const data = SOLAR_SYSTEM_DATA[key];
    const rOrbit = distancesLog[idx];
    const angle = (idx * 45 + 20) * (Math.PI / 180);
    const px = cx + rOrbit * Math.cos(angle);
    const py = cy + rOrbit * Math.sin(angle) * 0.6;

    if (showOrbits) {
      orbitsSvg += `<ellipse cx="${cx}" cy="${cy}" rx="${rOrbit}" ry="${rOrbit * 0.6}" fill="none" stroke="#334155" stroke-width="1" stroke-dasharray="4 2"/>`;
    }

    const isSelected = selectedPlanet === key;
    const pRadius = planetRadii[idx];

    let ringOverlay = '';
    if (data.hasRings) {
      ringOverlay = `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${(pRadius * 2.2).toFixed(1)}" ry="${(pRadius * 0.8).toFixed(1)}" fill="none" stroke="${data.color}" stroke-width="2.5" opacity="0.8"/>`;
    }

    planetsSvg += `
      ${ringOverlay}
      <circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${pRadius}" fill="${data.color}" stroke="${isSelected ? '#ffffff' : '#0f172a'}" stroke-width="${isSelected ? '2.5' : '1'}"/>
    `;

    const showLabels = props.showLabels !== false;
    if (mode === 'named' || (showLabels && mode !== 'quiz' && mode !== 'blank')) {
      planetsSvg += `<text x="${px.toFixed(1)}" y="${(py + pRadius + 14).toFixed(1)}" fill="#f1f5f9" font-size="10.5" font-weight="bold" font-family="sans-serif" text-anchor="middle">${data.name || data.name_en}</text>`;
    } else if (mode === 'quiz') {
      planetsSvg += `
        <g class="quiz-item" cursor="pointer" data-target="${data.name || data.name_en}">
          <rect x="${(px - 15).toFixed(1)}" y="${(py + pRadius + 4).toFixed(1)}" width="30" height="14" rx="3" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6" stroke-width="1"/>
          <text x="${px.toFixed(1)}" y="${(py + pRadius + 14).toFixed(1)}" fill="#60a5fa" font-size="9" font-weight="bold" font-family="sans-serif" text-anchor="middle">?</text>
        </g>
      `;
    }
  });

  const beltSvg = `<ellipse cx="${cx}" cy="${cy}" rx="155" ry="93" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="1 8" opacity="0.6"/>
  <text x="${cx - 120}" y="${cy - 75}" fill="#f59e0b" font-size="9.5" font-family="sans-serif">Asteroid Belt</text>`;

  return `<svg width="100%" height="100%" viewBox="0 0 600 550" xmlns="http://www.w3.org/2000/svg" style="background:#020617; border-radius:16px;" dir="ltr">
    <defs>
      <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fef08a"/>
        <stop offset="40%" stop-color="#f59e0b"/>
        <stop offset="100%" stop-color="#b45309" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="600" height="550" rx="16" fill="#020617"/>

    ${orbitsSvg}
    ${beltSvg}

    <circle cx="${cx}" cy="${cy}" r="32" fill="url(#sunGlow)"/>
    <circle cx="${cx}" cy="${cy}" r="22" fill="#f59e0b" stroke="#fef08a" stroke-width="2"/>
    ${mode === 'named' ? `<text x="${cx}" y="${cy + 5}" fill="#0f172a" font-size="11" font-weight="bold" font-family="sans-serif" text-anchor="middle">Sun</text>` : ''}

    ${planetsSvg}

    <g transform="translate(20, 20)">
      <rect width="320" height="32" rx="8" fill="#0f172a" fill-opacity="0.9" stroke="#1e293b"/>
      <text x="160" y="20" fill="#f8fafc" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">
        Solar System & Planetary Orbits
      </text>
    </g>
  </svg>`;
}

/* ══════════════════════════════════════════
   6. RENDER HELPER: SEASONS & DAY/NIGHT
   ══════════════════════════════════════════ */

export function renderSeasonsDayNightSVG(props = {}, width = 600, height = 550) {
  const mode = props.mode || 'named';
  const rawSeason = props.season || 'summer';
  const currentSeason = rawSeason.includes('spring') ? 'spring' : (rawSeason.includes('autumn') ? 'autumn' : (rawSeason.includes('winter') ? 'winter' : 'summer'));

  const cx = 300, cy = 260;

  const positions = {
    summer: { x: 130, y: 260, label: 'Summer Solstice (June 21)', desc: 'Longest day in Northern Hemisphere (Sun perpendicular to Tropic of Cancer 23.5° N)' },
    autumn: { x: 300, y: 130, label: 'Autumnal Equinox (Sept 23)', desc: 'Equal day and night globally (Sun perpendicular to Equator 0°)' },
    winter: { x: 470, y: 260, label: 'Winter Solstice (Dec 21)', desc: 'Shortest day in Northern Hemisphere (Sun perpendicular to Tropic of Capricorn 23.5° S)' },
    spring: { x: 300, y: 390, label: 'Vernal Equinox (March 21)', desc: 'Equal day and night globally, beginning of Spring (Sun over Equator 0°)' }
  };

  let earthPositionsSvg = '';

  Object.keys(positions).forEach(key => {
    const pos = positions[key];
    const isCurrent = currentSeason === key;
    const rE = 24;

    const tiltAngle = -23.44 * (Math.PI / 180);
    const tx1 = pos.x - 32 * Math.sin(tiltAngle);
    const ty1 = pos.y - 32 * Math.cos(tiltAngle);
    const tx2 = pos.x + 32 * Math.sin(tiltAngle);
    const ty2 = pos.y + 32 * Math.cos(tiltAngle);

    const angleToSun = Math.atan2(cy - pos.y, cx - pos.x);

    earthPositionsSvg += `
      <g opacity="${isCurrent ? '1' : '0.6'}">
        <circle cx="${pos.x}" cy="${pos.y}" r="${rE}" fill="#38bdf8" stroke="${isCurrent ? '#f59e0b' : '#0284c7'}" stroke-width="${isCurrent ? '3' : '1.5'}"/>
        
        <path d="M ${pos.x + rE * Math.cos(angleToSun + Math.PI/2)} ${pos.y + rE * Math.sin(angleToSun + Math.PI/2)} A ${rE} ${rE} 0 0 1 ${pos.x + rE * Math.cos(angleToSun - Math.PI/2)} ${pos.y + rE * Math.sin(angleToSun - Math.PI/2)} Z" fill="#0f172a" opacity="0.6"/>

        <line x1="${tx1.toFixed(1)}" y1="${ty1.toFixed(1)}" x2="${tx2.toFixed(1)}" y2="${tx2.toFixed(1)}" stroke="#ef4444" stroke-width="2"/>
        <text x="${tx1.toFixed(1)}" y="${(ty1 - 4).toFixed(1)}" fill="#ef4444" font-size="9" font-weight="bold" text-anchor="middle">N</text>
      </g>
    `;

    if (mode === 'named') {
      earthPositionsSvg += `
        <text x="${pos.x}" y="${(pos.y + rE + 16).toFixed(1)}" fill="${isCurrent ? '#f59e0b' : '#cbd5e1'}" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">${pos.label}</text>
      `;
    }
  });

  const activePos = positions[currentSeason];

  return `<svg width="100%" height="100%" viewBox="0 0 600 550" xmlns="http://www.w3.org/2000/svg" style="background:#090d16; border-radius:16px;" dir="ltr">
    <ellipse cx="${cx}" cy="${cy}" rx="170" ry="130" fill="none" stroke="#334155" stroke-width="2" stroke-dasharray="6 4"/>

    <circle cx="${cx}" cy="${cy}" r="35" fill="#f59e0b" stroke="#fef08a" stroke-width="3"/>
    <text x="${cx}" y="${cy + 5}" fill="#0f172a" font-size="12" font-weight="bold" text-anchor="middle">Sun</text>

    ${earthPositionsSvg}

    <g transform="translate(20, 485)">
      <rect width="560" height="45" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="280" y="20" fill="#f59e0b" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">
        ${activePos.label} - Earth Axial Tilt: 23.44°
      </text>
      <text x="280" y="36" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">
        ${activePos.desc}
      </text>
    </g>
  </svg>`;
}

/* ══════════════════════════════════════════
   7. RENDER HELPER: MOON PHASES ENGINE
   ══════════════════════════════════════════ */

export function renderMoonPhasesSVG(props = {}, width = 600, height = 550) {
  const selectedPhaseIdx = props.phaseIndex !== undefined ? props.phaseIndex : (props.activePhaseIndex !== undefined ? props.activePhaseIndex : 4);
  const mode = props.mode || 'named';
  const phaseData = MOON_PHASES_DATA[selectedPhaseIdx] || MOON_PHASES_DATA[0];

  const cx = 300, cy = 195;
  const rOrbit = 120;
  let phasesOrbitSvg = '';

  MOON_PHASES_DATA.forEach((item, idx) => {
    const angle = (idx * 45 - 180) * (Math.PI / 180);
    const mx = cx + rOrbit * Math.cos(angle);
    const my = cy + rOrbit * Math.sin(angle);

    const isSelected = selectedPhaseIdx === idx;

    phasesOrbitSvg += `
      <g transform="translate(${mx.toFixed(1)}, ${my.toFixed(1)})" opacity="${isSelected ? '1' : '0.7'}" cursor="pointer" class="moon-phase-node" data-phase-idx="${idx}">
        <circle cx="0" cy="0" r="14" fill="#64748b" stroke="${isSelected ? '#f59e0b' : '#334155'}" stroke-width="${isSelected ? '3' : '1'}"/>
        <path d="M 0 -14 A 14 14 0 0 1 0 14 Z" fill="#f8fafc"/>
        <circle cx="0" cy="0" r="14" fill="none" stroke="#1e293b" stroke-width="1"/>
      </g>
    `;

    if (mode === 'named') {
      phasesOrbitSvg += `<text x="${mx.toFixed(1)}" y="${(my + 26).toFixed(1)}" fill="${isSelected ? '#f59e0b' : '#cbd5e1'}" font-size="9" font-weight="bold" font-family="sans-serif" text-anchor="middle">${item.name || item.name_en}</text>`;
    }
  });

  const earthSvg = `
    <circle cx="${cx}" cy="${cy}" r="28" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
    <path d="M ${cx} ${cy - 28} A 28 28 0 0 1 ${cx} ${cy + 28} Z" fill="#0f172a" opacity="0.5"/>
    <text x="${cx}" y="${cy + 4}" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Earth</text>
  `;

  const sunRaysSvg = `
    <g transform="translate(520, ${cy})">
      <rect x="-20" y="-80" width="40" height="160" rx="8" fill="#f59e0b" opacity="0.2"/>
      <text x="0" y="5" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Sunlight</text>
      <line x1="-30" y1="-50" x2="-80" y2="-50" stroke="#f59e0b" stroke-width="2"/>
      <line x1="-30" y1="0" x2="-80" y2="0" stroke="#f59e0b" stroke-width="2"/>
      <line x1="-30" y1="50" x2="-80" y2="50" stroke="#f59e0b" stroke-width="2"/>
    </g>
  `;

  const moonDiscR = 40;
  const viewCx = 140, viewCy = 445;

  let observerMoonDisk = `<circle cx="${viewCx}" cy="${viewCy}" r="${moonDiscR}" fill="#1e293b" stroke="#cbd5e1" stroke-width="2"/>`;

  if (phaseData.percent > 0) {
    if (phaseData.percent === 100) {
      observerMoonDisk += `<circle cx="${viewCx}" cy="${viewCy}" r="${moonDiscR}" fill="#f8fafc"/>`;
    } else {
      const k = (phaseData.percent / 100) * 2 - 1;
      observerMoonDisk += `<path d="M ${viewCx} ${viewCy - moonDiscR} A ${moonDiscR} ${moonDiscR} 0 0 1 ${viewCx} ${viewCy + moonDiscR} A ${Math.abs(k * moonDiscR)} ${moonDiscR} 0 0 ${k > 0 ? 1 : 0} ${viewCx} ${viewCy - moonDiscR} Z" fill="#f8fafc"/>`;
    }
  }

  return `<svg width="100%" height="100%" viewBox="0 0 600 550" xmlns="http://www.w3.org/2000/svg" style="background:#020617; border-radius:16px;" dir="ltr">
    <circle cx="${cx}" cy="${cy}" r="${rOrbit}" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="4 2"/>

    ${earthSvg}
    ${phasesOrbitSvg}
    ${sunRaysSvg}

    <g transform="translate(20, 360)">
      <rect width="560" height="170" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
      <text x="20" y="25" fill="#38bdf8" font-size="11.5" font-weight="bold" font-family="sans-serif">Earth Observer Perspective:</text>
      
      ${observerMoonDisk}

      <text x="210" y="55" fill="#f59e0b" font-size="16" font-weight="bold" font-family="sans-serif">${phaseData.name || phaseData.name_en}</text>
      <text x="210" y="80" fill="#cbd5e1" font-size="11.5" font-family="sans-serif">Lunar Age: ${phaseData.age_days} Days | Illumination: ${phaseData.percent}%</text>
      <text x="210" y="105" fill="#94a3b8" font-size="10.5" font-family="sans-serif">${phaseData.desc}</text>
    </g>
  </svg>`;
}

/* ══════════════════════════════════════════
   8. RENDER HELPER: ECLIPSES ENGINE
   ══════════════════════════════════════════ */

export function renderEclipsesSVG(props = {}, width = 600, height = 550) {
  const eclipseType = props.eclipseType || 'solar';
  const isSolar = eclipseType.includes('solar');

  return `<svg width="100%" height="100%" viewBox="0 0 600 550" xmlns="http://www.w3.org/2000/svg" style="background:#020617; border-radius:16px;" dir="ltr">
    <defs>
      <linearGradient id="umbraGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0f172a" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#020617" stop-opacity="1"/>
      </linearGradient>
      <linearGradient id="penumbraGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#020617" stop-opacity="0.1"/>
      </linearGradient>
    </defs>

    <g transform="translate(20, 20)">
      <rect width="320" height="35" rx="8" fill="#0f172a" stroke="#1e293b"/>
      <text x="160" y="22" fill="#f59e0b" font-size="13" font-weight="bold" font-family="sans-serif" text-anchor="middle">
        ${isSolar ? 'Solar Eclipse Geometry' : 'Lunar Eclipse Geometry'}
      </text>
    </g>

    <g transform="translate(0, 50)">
      <circle cx="80" cy="180" r="45" fill="#f59e0b" stroke="#fef08a" stroke-width="3"/>
      <text x="80" y="185" fill="#0f172a" font-size="12" font-weight="bold" text-anchor="middle">Sun</text>

      ${isSolar ? `
        <circle cx="300" cy="180" r="14" fill="#64748b" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="300" y="155" fill="#cbd5e1" font-size="10.5" font-weight="bold" text-anchor="middle">Moon</text>

        <circle cx="480" cy="180" r="32" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
        <text x="480" y="185" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Earth</text>

        <polygon points="300,166 480,172 480,188 300,194" fill="url(#umbraGrad)"/>
        <polygon points="300,166 480,130 480,230 300,194" fill="url(#penumbraGrad)"/>

        <text x="400" y="183" fill="#ef4444" font-size="9.5" font-weight="bold">Umbra</text>
        <text x="400" y="150" fill="#f59e0b" font-size="9.5" font-weight="bold">Penumbra</text>
      ` : `
        <circle cx="280" cy="180" r="32" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
        <text x="280" y="185" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Earth</text>

        <circle cx="480" cy="180" r="14" fill="#991b1b" stroke="#ef4444" stroke-width="2"/>
        <text x="480" y="155" fill="#fca5a5" font-size="10.5" font-weight="bold" text-anchor="middle">Moon (Total Eclipse)</text>

        <polygon points="280,148 550,165 550,195 280,212" fill="url(#umbraGrad)"/>
        <polygon points="280,148 550,120 550,240 280,212" fill="url(#penumbraGrad)"/>

        <text x="360" y="183" fill="#ef4444" font-size="9.5" font-weight="bold">Earth Shadow Cone</text>
      `}
    </g>

    <g transform="translate(20, 340)">
      <rect width="560" height="180" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
      <text x="20" y="30" fill="#38bdf8" font-size="12" font-weight="bold" font-family="sans-serif">View from Earth:</text>

      <g transform="translate(480, 105)">
        ${isSolar ? `
          <circle cx="0" cy="0" r="40" fill="#f59e0b"/>
          <circle cx="0" cy="0" r="39" fill="#020617"/>
          <circle cx="0" cy="0" r="42" fill="none" stroke="#fef08a" stroke-width="2" opacity="0.8"/>
          <text x="0" y="60" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Total Eclipse (Solar Corona)</text>
        ` : `
          <circle cx="0" cy="0" r="40" fill="#7f1d1d" stroke="#ef4444" stroke-width="2"/>
          <text x="0" y="60" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">Total Eclipse (Blood Moon)</text>
        `}
      </g>

      <g transform="translate(20, 40)" font-family="sans-serif" font-size="11" fill="#cbd5e1">
        <text x="0" y="20" font-weight="bold" fill="#f59e0b">${isSolar ? 'Solar Eclipse Principles:' : 'Lunar Eclipse Principles:'}</text>
        <text x="0" y="42">${isSolar ? '• Moon directly aligns between Sun and Earth.' : '• Earth directly aligns between Sun and Moon.'}</text>
        <text x="0" y="64">${isSolar ? '• Occurs exclusively during the New Moon phase.' : '• Occurs exclusively during the Full Moon phase.'}</text>
        <text x="0" y="86">${isSolar ? '• Totality lasts for only a few minutes in narrow path.' : '• Lunar totality can last for over 1.5 hours globally.'}</text>
      </g>
    </g>
  </svg>`;
}

/* ══════════════════════════════════════════
   9. RENDER HELPER: CONSTELLATIONS CATALOG
   ══════════════════════════════════════════ */

export function renderConstellationsSVG(props = {}, width = 600, height = 550) {
  const selectedConstIdx = props.constellationIndex !== undefined ? props.constellationIndex : 2;
  const mode = props.mode || 'named';
  const data = CONSTELLATIONS_CATALOG[selectedConstIdx] || CONSTELLATIONS_CATALOG[0];

  const cx = 300, cy = 250;

  let starsSvg = '';
  let linesSvg = '';

  const xs = data.stars.map(s => s.ra);
  const ys = data.stars.map(s => s.dec);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);

  const points = data.stars.map(s => {
    const px = cx + ((s.ra - (minX + maxX) / 2) * 60);
    const py = cy - ((s.dec - (minY + maxY) / 2) * 18);
    return { ...s, px, py };
  });

  data.lines.forEach(([i, j]) => {
    if (points[i] && points[j]) {
      linesSvg += `<line x1="${points[i].px.toFixed(1)}" y1="${points[i].py.toFixed(1)}" x2="${points[j].px.toFixed(1)}" y2="${points[j].py.toFixed(1)}" stroke="#38bdf8" stroke-width="2" opacity="0.8"/>`;
    }
  });

  points.forEach(p => {
    const rStar = Math.max(3, (4 - p.mag) * 2.5);
    starsSvg += `<circle cx="${p.px.toFixed(1)}" cy="${p.py.toFixed(1)}" r="${rStar.toFixed(1)}" fill="${p.color}" stroke="#ffffff" stroke-width="1"/>`;
    if (mode === 'named') {
      starsSvg += `<text x="${(p.px + 8).toFixed(1)}" y="${(p.py + 4).toFixed(1)}" fill="#f1f5f9" font-size="11" font-weight="bold" font-family="sans-serif">${p.name || p.name_en}</text>`;
    }
  });

  return `<svg width="100%" height="100%" viewBox="0 0 600 550" xmlns="http://www.w3.org/2000/svg" style="background:#020617; border-radius:16px;" dir="ltr">
    <g transform="translate(20, 20)">
      <rect width="360" height="36" rx="8" fill="#0f172a" stroke="#1e293b"/>
      <text x="180" y="23" fill="#f59e0b" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">
        Constellation: ${data.name || data.name_en}
      </text>
    </g>

    <g>
      ${linesSvg}
      ${starsSvg}
    </g>

    <g transform="translate(20, 420)">
      <rect width="560" height="110" rx="10" fill="#0f172a" stroke="#1e293b"/>
      <text x="20" y="25" fill="#38bdf8" font-size="11" font-weight="bold" font-family="sans-serif">Major Stars & Visual Magnitude:</text>
      
      <g transform="translate(20, 45)" font-size="10" font-family="sans-serif" fill="#cbd5e1">
        ${data.stars.slice(0, 4).map((s, idx) => `
          <text x="${idx * 135}" y="15" font-weight="bold" fill="#f59e0b">• ${s.name || s.name_en}</text>
          <text x="${idx * 135}" y="32">Mag: ${s.mag} | Color: ${s.color}</text>
        `).join('')}
      </g>
    </g>
  </svg>`;
}

/* ══════════════════════════════════════════
   10. RENDER HELPER: CELESTIAL COMPASS
   ══════════════════════════════════════════ */

export function renderCelestialCompassSVG(props = {}, width = 600, height = 550) {
  const azimuth = props.azimuth !== undefined ? props.azimuth : 45;
  const altitude = props.altitude !== undefined ? props.altitude : 60;

  const cx = 300, cy = 250, r = 160;

  return `<svg width="100%" height="100%" viewBox="0 0 600 550" xmlns="http://www.w3.org/2000/svg" style="background:#090d16; border-radius:16px;" dir="ltr">
    <g transform="translate(20, 20)">
      <rect width="380" height="35" rx="8" fill="#0f172a" stroke="#1e293b"/>
      <text x="190" y="22" fill="#38bdf8" font-size="13" font-weight="bold" font-family="sans-serif" text-anchor="middle">
        Celestial Compass & Horizontal Coordinates
      </text>
    </g>

    <ellipse cx="${cx}" cy="${cy + 60}" rx="${r}" ry="${r * 0.4}" fill="#1e293b" fill-opacity="0.5" stroke="#38bdf8" stroke-width="2"/>
    <path d="M ${cx - r} ${cy + 60} A ${r} ${r} 0 0 1 ${cx + r} ${cy + 60}" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 2"/>

    <line x1="${cx}" y1="${cy - 120}" x2="${cx}" y2="${cy + 120}" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 3"/>
    <circle cx="${cx}" cy="${cy - 120}" r="5" fill="#ef4444"/>
    <text x="${cx}" y="${cy - 130}" fill="#ef4444" font-size="11.5" font-weight="bold" text-anchor="middle">Zenith (90°)</text>

    <text x="${cx}" y="${cy + 60 - r * 0.4 - 8}" fill="#ef4444" font-size="13" font-weight="bold" text-anchor="middle">North (N)</text>
    <text x="${cx}" y="${cy + 60 + r * 0.4 + 18}" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">South (S)</text>
    <text x="${cx - r - 15}" y="${cy + 65}" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="end">East (E)</text>
    <text x="${cx + r + 15}" y="${cy + 65}" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="start">West (W)</text>

    <g>
      <circle cx="${cx + 80}" cy="${cy - 40}" r="8" fill="#f59e0b" stroke="#fef08a" stroke-width="2"/>
      <line x1="${cx}" y1="${cy + 60}" x2="${cx + 80}" y2="${cy - 40}" stroke="#f59e0b" stroke-width="2"/>
      <text x="${cx + 95}" y="${cy - 40}" fill="#f59e0b" font-size="11" font-weight="bold" font-family="sans-serif">Target Object</text>
    </g>

    <g transform="translate(20, 450)">
      <rect width="560" height="80" rx="10" fill="#0f172a" stroke="#1e293b"/>
      <text x="280" y="25" fill="#f59e0b" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">
        Current Coordinates:
      </text>
      <text x="280" y="52" fill="#cbd5e1" font-size="12" font-family="sans-serif" text-anchor="middle">
        Azimuth: ${azimuth}° | Altitude: ${altitude}°
      </text>
    </g>
  </svg>`;
}

/* ══════════════════════════════════════════
   11. RENDER HELPER: ASTROPHYSICS INFO CARD
   ══════════════════════════════════════════ */

export function renderAstrophysicsInfoCardSVG(props = {}, width = 600, height = 550) {
  const bodyKey = props.bodyKey || props.bodyId || 'earth';
  const data = SOLAR_SYSTEM_DATA[bodyKey] || SOLAR_SYSTEM_DATA.earth;

  return `<svg width="100%" height="100%" viewBox="0 0 600 550" xmlns="http://www.w3.org/2000/svg" style="background:#090d16; border-radius:16px;" dir="ltr">
    <rect width="600" height="550" rx="16" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>

    <rect width="600" height="70" rx="16" fill="#1e293b"/>
    <circle cx="50" cy="35" r="22" fill="${data.color}" stroke="#ffffff" stroke-width="2"/>
    <text x="90" y="32" fill="#f8fafc" font-size="18" font-weight="bold" font-family="sans-serif">${data.name_en || data.name}</text>
    <text x="90" y="52" fill="#38bdf8" font-size="12" font-family="sans-serif">Classification: ${data.type}</text>

    <g transform="translate(30, 95)" font-family="sans-serif">
      <rect x="0" y="0" width="250" height="55" rx="8" fill="#1e293b" stroke="#334155"/>
      <text x="15" y="22" fill="#94a3b8" font-size="10.5">Equatorial Diameter:</text>
      <text x="15" y="42" fill="#f59e0b" font-size="13" font-weight="bold">${data.diameter_km.toLocaleString()} km</text>

      <rect x="280" y="0" width="250" height="55" rx="8" fill="#1e293b" stroke="#334155"/>
      <text x="295" y="22" fill="#94a3b8" font-size="10.5">Approximate Mass:</text>
      <text x="295" y="42" fill="#38bdf8" font-size="13" font-weight="bold">${data.mass_kg}</text>

      <rect x="0" y="70" width="250" height="55" rx="8" fill="#1e293b" stroke="#334155"/>
      <text x="15" y="22" fill="#94a3b8" font-size="10.5">Distance from Sun:</text>
      <text x="15" y="42" fill="#f8fafc" font-size="13" font-weight="bold">${data.dist_au} AU (${data.dist_km})</text>

      <rect x="280" y="70" width="250" height="55" rx="8" fill="#1e293b" stroke="#334155"/>
      <text x="295" y="22" fill="#94a3b8" font-size="10.5">Orbital Period:</text>
      <text x="295" y="42" fill="#f8fafc" font-size="13" font-weight="bold">${data.orbital_period}</text>

      <rect x="0" y="140" width="250" height="55" rx="8" fill="#1e293b" stroke="#334155"/>
      <text x="15" y="22" fill="#94a3b8" font-size="10.5">Mean Temperature:</text>
      <text x="15" y="42" fill="#ef4444" font-size="13" font-weight="bold">${data.temp_c}</text>

      <rect x="280" y="140" width="250" height="55" rx="8" fill="#1e293b" stroke="#334155"/>
      <text x="295" y="22" fill="#94a3b8" font-size="10.5">Surface Gravity:</text>
      <text x="295" y="42" fill="#f8fafc" font-size="13" font-weight="bold">${data.gravity_m_s2} m/s²</text>
    </g>

    <g transform="translate(30, 310)" font-family="sans-serif">
      <rect x="0" y="0" width="530" height="60" rx="8" fill="#1e293b" stroke="#334155"/>
      <text x="15" y="22" fill="#38bdf8" font-size="11" font-weight="bold">Atmosphere & Moons:</text>
      <text x="15" y="42" fill="#cbd5e1" font-size="11">${data.atmosphere} | Natural Satellites: ${data.moons}</text>
    </g>

    <g transform="translate(30, 390)" font-family="sans-serif">
      <rect x="0" y="0" width="530" height="120" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="15" y="30" fill="#f59e0b" font-size="13" font-weight="bold">Astrophysics Insight for ${data.name_en || data.name}:</text>
      <text x="15" y="60" fill="#f8fafc" font-size="12">${data.fact}</text>
    </g>
  </svg>`;
}
