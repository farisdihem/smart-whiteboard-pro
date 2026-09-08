/* ══════════════════════════════════════════
   GEOGRAPHY MAP ENGINE
   Powered by Authentic GeoJSON / TopoJSON Datasets
   ══════════════════════════════════════════ */

import { ALGERIA_58_WILAYAS_GEOJSON, WORLD_COUNTRIES_50M_GEOJSON } from './geography_geojson_data.js';
import { GEOGRAPHY_METADATA, calculateHaversineDistance, calculateBearing } from './geography_metadata.js';

export { ALGERIA_58_WILAYAS_GEOJSON, WORLD_COUNTRIES_50M_GEOJSON, GEOGRAPHY_METADATA, calculateHaversineDistance, calculateBearing };

/* ══════════════════════════════════════════
   1. CURRICULUM METADATA FOR GEOGRAPHY
   ══════════════════════════════════════════ */
export const GEOGRAPHY_CURRICULUM_METADATA = {
  subject: "Geography & Social Studies",
  curriculum: "Standard Curriculum",
  level: "Middle & High School",
  lessons: [
    "Physical Characteristics (Location, Area, Topography)",
    "Climate & Hydrographic Network",
    "Administrative Divisions & Population",
    "Geographic & Astronomical Coordinates",
    "Continents, Oceans, and World Borders"
  ]
};

/* ══════════════════════════════════════════
   2. PHYSICAL GEOGRAPHY DATA (ALGERIA)
   ══════════════════════════════════════════ */
export const ALGERIA_PHYSICAL_DATA = {
  mountains: [
    { name: "سلسلة الأطلس التلي (Tell Atlas)", name_en: "Tell Atlas Range", name_fr: "Atlas Tellien", type: "Mountain Range", path: "M 150,75 C 300,50 500,80 720,110 L 710,135 C 490,105 290,75 140,100 Z", color: "#15803d" },
    { name: "منطقة الهضاب العليا (High Plateaus)", name_en: "High Plateaus Region", name_fr: "Hauts Plateaux", type: "Steppe Region", path: "M 140,100 C 290,75 490,105 710,135 L 690,180 C 470,145 270,115 130,140 Z", color: "#d97706" },
    { name: "سلسلة الأطلس الصحراوي (Saharan Atlas)", name_en: "Saharan Atlas Range", name_fr: "Atlas Saharien", type: "Mountain Range", path: "M 130,140 C 270,115 470,145 690,180 L 670,225 C 450,185 250,155 120,180 Z", color: "#b45309" },
    { name: "الصحراء الكبرى (Grand Sahara)", name_en: "Grand Sahara Desert", name_fr: "Grand Sahara", type: "Desert", path: "M 120,180 C 250,155 450,185 670,225 L 650,680 L 80,660 Z", color: "#eab308" }
  ],
  peaks: [
    { name: "Mount Tahat Atakor (Hoggar)", alt: "2,918 m", lat: 23.29, lng: 5.53, x: 495, y: 550 },
    { name: "Mount Chelia (Aurès)", alt: "2,328 m", lat: 35.32, lng: 6.63, x: 535, y: 155 },
    { name: "Lalla Khedidja (Djurdjura)", alt: "2,308 m", lat: 36.45, lng: 4.23, x: 435, y: 110 }
  ],
  rivers: [
    { name: "Chelif River (700 km)", path: "M 280,150 Q 320,120 400,105 T 440,95", color: "#0284c7" },
    { name: "Soummam River", path: "M 450,115 Q 470,105 490,92", color: "#0284c7" },
    { name: "Rhumel River", path: "M 520,135 Q 540,120 560,105", color: "#0284c7" },
    { name: "Seybouse River", path: "M 580,120 Q 600,105 615,90", color: "#0284c7" },
    { name: "Medjerda River", path: "M 610,130 Q 630,125 650,115", color: "#0284c7" },
    { name: "Saoura River", path: "M 190,260 Q 180,340 160,420", color: "#0284c7" }
  ],
  chotts: [
    { name: "Chott Melrhir (-40 m)", x: 530, y: 200, rx: 35, ry: 15, color: "#38bdf8" },
    { name: "Chott el Hodna", x: 440, y: 165, rx: 25, ry: 10, color: "#38bdf8" },
    { name: "Chott ech Chergui", x: 260, y: 160, rx: 30, ry: 12, color: "#38bdf8" }
  ]
};

/* ══════════════════════════════════════════
   3. CLIMATE ZONES DATA (ALGERIA)
   ══════════════════════════════════════════ */
export const ALGERIA_CLIMATE_ZONES = [
  { name: "المناخ المتوسطي (Mediterranean Climate)", code: "mediterranean", color: "#22c55e", opacity: 0.35, yMin: 40, yMax: 115 },
  { name: "المناخ شبه الجاف (Semi-Arid Climate)", code: "semi_arid", color: "#f59e0b", opacity: 0.3, yMin: 115, yMax: 210 },
  { name: "المناخ الصحراوي (Saharan Arid Climate)", code: "saharan", color: "#eab308", opacity: 0.25, yMin: 210, yMax: 680 }
];

/* ══════════════════════════════════════════
   4. CITIES DATA (ALGERIA)
   ══════════════════════════════════════════ */
export const ALGERIA_MAJOR_CITIES = [
  { name: "Algiers (Capital)", isCapital: true, lat: 36.75, lng: 3.05, x: 405, y: 92 },
  { name: "Oran", isCapital: false, lat: 35.69, lng: -0.63, x: 242, y: 132 },
  { name: "Constantine", isCapital: false, lat: 36.36, lng: 6.61, x: 532, y: 112 },
  { name: "Annaba", isCapital: false, lat: 36.90, lng: 7.76, x: 585, y: 88 },
  { name: "Setif", isCapital: false, lat: 36.19, lng: 5.41, x: 480, y: 122 },
  { name: "Ouargla", isCapital: false, lat: 31.95, lng: 5.32, x: 480, y: 285 },
  { name: "Tamanrasset", isCapital: false, lat: 22.78, lng: 5.52, x: 495, y: 560 },
  { name: "Bechar", isCapital: false, lat: 31.62, lng: -2.22, x: 195, y: 288 },
  { name: "Ghardaia", isCapital: false, lat: 32.49, lng: 3.67, x: 420, y: 265 },
  { name: "Tindouf", isCapital: false, lat: 27.67, lng: -8.14, x: 50, y: 410 },
  { name: "Djanet", isCapital: false, lat: 24.55, lng: 9.48, x: 670, y: 510 },
  { name: "Adrar", isCapital: false, lat: 27.87, lng: -0.29, x: 285, y: 405 }
];

/* ══════════════════════════════════════════
   5. NEIGHBORING COUNTRIES & SEAS (ALGERIA)
   ══════════════════════════════════════════ */
export const ALGERIA_NEIGHBORS = [
  { name: "Mediterranean Sea", labelX: 400, labelY: 45, isSea: true },
  { name: "Tunisia", labelX: 630, labelY: 145 },
  { name: "Libya", labelX: 680, labelY: 330 },
  { name: "Niger", labelX: 620, labelY: 640 },
  { name: "Mali", labelX: 300, labelY: 660 },
  { name: "Mauritania", labelX: 60, labelY: 580 },
  { name: "Western Sahara", labelX: 30, labelY: 480 },
  { name: "Morocco", labelX: 110, labelY: 220 }
];

/* ══════════════════════════════════════════
   1.B ALGERIA MAP PALETTES & PRESETS
   ══════════════════════════════════════════ */
export const ALGERIA_POLITICAL_PALETTE = [
  '#dbeafe',
  '#dcfce7',
  '#fef3c7',
  '#ffedd5',
  '#f3e8ff',
  '#ccfbf1',
  '#ffe4e6',
  '#e0e7ff',
  '#ecfccb',
  '#cffafe'
];

export const ALGERIA_PHYSICAL_REGION_COLORS = {
  'north': '#bbf7d0',
  'high_plateaus': '#fef08a',
  'sahara': '#fed7aa',
  'North': '#bbf7d0',
  'High Plateaus': '#fef08a',
  'Grand Sahara': '#fed7aa'
};

export const GEOGRAPHY_COLOR_PRESETS = [
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Green', hex: '#22c55e' },
  { name: 'Yellow', hex: '#eab308' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Purple', hex: '#a855f7' },
  { name: 'Brown', hex: '#854d0e' },
  { name: 'Gray', hex: '#64748b' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Transparent', hex: 'transparent' }
];

/* ══════════════════════════════════════════
   6. RENDER HELPER: ALGERIA MAPS
   ══════════════════════════════════════════ */
export function renderAlgeriaMapSVG(props = {}, width = 800, height = 700, mode = "political") {
  const showBorders = props.showBorders !== false;
  const showWilayaBorders = props.showWilayaBorders !== false && mode !== "blank_outline";
  const showWilayaNames = props.showWilayaNames !== false && !mode.startsWith("blank");
  const showCities = props.showCities !== false && !mode.startsWith("blank");
  const showTerrain = props.showTerrain === true || mode === "physical";
  const showRivers = props.showRivers === true || mode === "physical";
  const showClimate = props.showClimate === true || mode === "climate";
  const showNeighbors = props.showNeighbors !== false;

  const selWilayaCode = parseInt(props.selectedWilaya || "16", 10);
  const selectedWilayasList = Array.isArray(props.selectedWilayas) && props.selectedWilayas.length > 0 
    ? props.selectedWilayas 
    : [selWilayaCode];

  const customColorsMap = props.customColors || props.wilayaFills || {};
  const defaultFill = props.fillColor || props.mapColor || (mode.startsWith("blank") ? "#f8fafc" : "#f1f5f9");
  const strokeColor = props.strokeColor || "#334155";
  const outerStrokeColor = props.outerStrokeColor || "#0f172a";
  const strokeWidthMultiplier = parseFloat(props.strokeWidth !== undefined ? props.strokeWidth : 1.0) || 1.0;
  const fillOpacity = props.opacity !== undefined ? props.opacity : 1.0;
  const selectedColor = props.selectedColor || props.highlightColor || "#ef4444";
  const labelColor = props.labelColor || "#0f172a";
  const backgroundColor = props.backgroundColor || "#f8fafc";

  const layers = props.layers || {
    base: { visible: true, locked: false, opacity: 1 },
    borders: { visible: showBorders, locked: false, opacity: 1 },
    wilayas: { visible: showWilayaBorders, locked: false, opacity: 1 },
    cities: { visible: showCities, locked: false, opacity: 1 },
    rivers: { visible: showRivers, locked: false, opacity: 1 },
    terrain: { visible: showTerrain, locked: false, opacity: 1 },
    climate: { visible: showClimate, locked: false, opacity: 1 },
    labels: { visible: showWilayaNames, locked: false, opacity: 1 },
    annotations: { visible: true, locked: false, opacity: 1 }
  };

  const bgSvg = `<rect width="800" height="700" rx="16" fill="${backgroundColor}" stroke="#cbd5e1" stroke-width="2"/>`;

  const seaSvg = `<path d="M 0,0 L 800,0 L 800,105 Q 400,65 0,105 Z" fill="#e0f2fe" stroke="#7dd3fc" stroke-width="1.5"/>
  <text x="400" y="52" fill="#0284c7" font-size="13" font-weight="bold" font-family="sans-serif" text-anchor="middle">Mediterranean Sea</text>`;

  let neighborsSvg = "";
  if (showNeighbors) {
    neighborsSvg = ALGERIA_NEIGHBORS.map(n => {
      if (n.isSea) return "";
      return `<text x="${n.labelX}" y="${n.labelY}" fill="#475569" font-size="11" font-weight="bold" font-family="sans-serif" text-anchor="middle">${n.name_en || n.name}</text>`;
    }).join("");
  }

  let climateSvg = "";
  if (layers.climate && layers.climate.visible) {
    climateSvg = ALGERIA_CLIMATE_ZONES.map(cz =>
      `<rect x="40" y="${cz.yMin}" width="720" height="${cz.yMax - cz.yMin}" fill="${cz.color}" fill-opacity="${cz.opacity * (layers.climate.opacity || 1)}" stroke="${cz.color}" stroke-dasharray="4,4"/>
       <text x="740" y="${cz.yMin + 20}" fill="${cz.color}" font-size="10.5" font-weight="bold" font-family="sans-serif" text-anchor="end">${cz.name}</text>`
    ).join("");
  }

  let terrainSvg = "";
  if (layers.terrain && layers.terrain.visible) {
    terrainSvg = ALGERIA_PHYSICAL_DATA.mountains.map(m =>
      `<path d="${m.path}" fill="${m.color}" fill-opacity="0.35" stroke="${m.color}" stroke-width="1.5">
        <title>${m.name}</title>
       </path>
       <text x="400" y="${m.path.includes('100') ? 115 : m.path.includes('140') ? 160 : 200}" fill="${m.color}" font-size="11" font-weight="bold" font-family="sans-serif" text-anchor="middle">${m.name}</text>`
    ).join("");

    terrainSvg += ALGERIA_PHYSICAL_DATA.peaks.map(pk =>
      `<g transform="translate(${pk.x}, ${pk.y})">
        <polygon points="0,-8 7,5 -7,5" fill="#dc2626" stroke="#ffffff" stroke-width="1"/>
        <text y="14" fill="#1e293b" font-size="9.5" font-weight="bold" font-family="sans-serif" text-anchor="middle">${pk.name} (${pk.alt})</text>
       </g>`
    ).join("");

    terrainSvg += ALGERIA_PHYSICAL_DATA.chotts.map(ch =>
      `<g transform="translate(${ch.x}, ${ch.y})">
        <ellipse rx="${ch.rx}" ry="${ch.ry}" fill="${ch.color}" fill-opacity="0.4" stroke="#0284c7" stroke-dasharray="2,2"/>
        <text y="3" fill="#0369a1" font-size="9" font-weight="bold" font-family="sans-serif" text-anchor="middle">${ch.name}</text>
       </g>`
    ).join("");
  }

  let wilayaFillsSvg = "";
  if (layers.wilayas && layers.wilayas.visible) {
    wilayaFillsSvg = ALGERIA_58_WILAYAS_GEOJSON.map(w => {
      const isSel = selectedWilayasList.includes(w.code);
      const customFill = customColorsMap[w.code];

      let fillColor = defaultFill;
      if (customFill) {
        fillColor = customFill;
      } else if (isSel) {
        fillColor = selectedColor;
      } else if (mode === "political" || mode === "political_58") {
        fillColor = ALGERIA_POLITICAL_PALETTE[(w.code - 1) % ALGERIA_POLITICAL_PALETTE.length];
      } else if (mode === "physical") {
        fillColor = ALGERIA_PHYSICAL_REGION_COLORS[w.region] || defaultFill;
      }

      return `<path d="${w.path}" fill="${fillColor}" fill-opacity="${fillOpacity}" stroke="none" data-wilaya-code="${w.code}" cursor="pointer">
        <title>Province ${w.code} - ${w.name_en || w.name_fr || w.name}</title>
      </path>`;
    }).join("");
  }

  let internalBordersSvg = "";
  if (showWilayaBorders) {
    const internalStrokeWidth = 1.0 * strokeWidthMultiplier;
    internalBordersSvg = ALGERIA_58_WILAYAS_GEOJSON.map(w => {
      return `<path d="${w.path}" fill="none" stroke="${strokeColor}" stroke-width="${internalStrokeWidth}" stroke-linejoin="round" stroke-linecap="round" pointer-events="none"/>`;
    }).join("");
  }

  let externalBorderSvg = "";
  if (showBorders) {
    const borderStrokeWidth = 2.5 * strokeWidthMultiplier;
    externalBorderSvg = `<path d="${ALGERIA_58_WILAYAS_GEOJSON.map(w => w.path).join(' ')}" fill="none" stroke="${outerStrokeColor}" stroke-width="${borderStrokeWidth}" stroke-linejoin="round" stroke-linecap="round" pointer-events="none"/>`;
  }

  let riversSvg = "";
  if (layers.rivers && layers.rivers.visible) {
    riversSvg = ALGERIA_PHYSICAL_DATA.rivers.map(r =>
      `<path d="${r.path}" fill="none" stroke="${r.color}" stroke-width="2.5" stroke-linecap="round">
        <title>${r.name}</title>
       </path>`
    ).join("");
  }

  let labelsSvg = "";
  if (layers.labels && layers.labels.visible) {
    labelsSvg = ALGERIA_58_WILAYAS_GEOJSON.map(w => {
      const isSel = selectedWilayasList.includes(w.code);
      return `<g transform="translate(${w.projX}, ${w.projY})" pointer-events="none">
        <circle r="${isSel ? '4' : '2'}" fill="${isSel ? selectedColor : '#475569'}"/>
        <text y="-5" fill="${labelColor}" font-size="${isSel ? '11' : '8.5'}" font-weight="${isSel ? 'bold' : 'normal'}" font-family="sans-serif" text-anchor="middle" stroke="#ffffff" stroke-width="2.5" paint-order="stroke fill">${w.code < 10 ? '0' + w.code : w.code} - ${w.name_ar || w.name || w.name_fr}</text>
      </g>`;
    }).join("");
  }

  let citiesSvg = "";
  if (layers.cities && layers.cities.visible) {
    citiesSvg = ALGERIA_MAJOR_CITIES.map(c =>
      `<g transform="translate(${c.x}, ${c.y})" pointer-events="none">
        <circle r="${c.isCapital ? '6' : '3.5'}" fill="${c.isCapital ? '#dc2626' : '#2563eb'}" stroke="#ffffff" stroke-width="1.5"/>
        ${c.isCapital ? '<circle r="2" fill="#ffffff"/>' : ''}
        <text y="12" fill="#0f172a" font-size="${c.isCapital ? '10' : '8.5'}" font-weight="bold" font-family="sans-serif" text-anchor="middle" stroke="#ffffff" stroke-width="2" paint-order="stroke fill">${c.name_en || c.name}</text>
       </g>`
    ).join("");
  }

  let selectionHighlightsSvg = "";
  selectedWilayasList.forEach(code => {
    const wilaya = ALGERIA_58_WILAYAS_GEOJSON.find(w => w.code === code);
    if (wilaya) {
      selectionHighlightsSvg += `<path d="${wilaya.path}" fill="none" stroke="${selectedColor}" stroke-width="3.5" stroke-linejoin="round" pointer-events="none"/>`;
    }
  });

  const activeWilaya = ALGERIA_58_WILAYAS_GEOJSON.find(w => w.code === selWilayaCode) || ALGERIA_58_WILAYAS_GEOJSON[15];

  return `<svg width="100%" height="100%" viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;" dir="ltr">
    ${bgSvg}
    ${seaSvg}
    ${neighborsSvg}
    ${climateSvg}
    ${terrainSvg}
    ${wilayaFillsSvg}
    ${internalBordersSvg}
    ${externalBorderSvg}
    ${riversSvg}
    ${labelsSvg}
    ${citiesSvg}
    ${selectionHighlightsSvg}

    <g transform="translate(30, 620)">
      <rect width="280" height="60" rx="8" fill="#ffffff" fill-opacity="0.95" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="140" y="18" fill="${selectedColor}" font-size="11.5" font-weight="bold" font-family="sans-serif" text-anchor="middle">Province ${activeWilaya.code}: ${activeWilaya.name_en || activeWilaya.name_fr || activeWilaya.name}</text>
      <text x="140" y="34" fill="#475569" font-size="9.5" font-weight="bold" font-family="sans-serif" text-anchor="middle">Region: ${activeWilaya.region || 'North'} | Area: ${activeWilaya.area || 'N/A'}</text>
      <text x="140" y="48" fill="#64748b" font-size="8.5" font-family="sans-serif" text-anchor="middle">Coords: ${activeWilaya.lat}° N, ${activeWilaya.lng}° E</text>
    </g>

    <g transform="translate(740, 630)">
      <circle r="20" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
      <path d="M 740,614 L 745,630 L 740,626 L 735,630 Z" fill="#ef4444"/>
      <path d="M 740,646 L 745,630 L 740,626 L 735,630 Z" fill="#64748b"/>
      <text x="740" y="610" fill="#ef4444" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">N</text>
    </g>

    <g transform="translate(330, 650)">
      <rect x="0" y="0" width="100" height="6" fill="#1e293b"/>
      <rect x="50" y="0" width="50" height="6" fill="#ffffff" stroke="#1e293b" stroke-width="0.5"/>
      <text x="0" y="-4" fill="#334155" font-size="8.5" font-weight="bold" font-family="sans-serif">0</text>
      <text x="50" y="-4" fill="#334155" font-size="8.5" font-weight="bold" font-family="sans-serif">150 km</text>
      <text x="100" y="-4" fill="#334155" font-size="8.5" font-weight="bold" font-family="sans-serif">300 km</text>
    </g>
  </svg>`;
}

export const WORLD_COUNTRY_METADATA = {
  usa: {
    id: "840",
    name_en: "United States of America",
    name_ar: "خريطة الولايات المتحدة الأمريكية",
    continent: "north_america",
    viewBox: "70 80 300 200",
    capital: { name_en: "Washington, D.C.", name_ar: "واشنطن العاصمة", x: 300, y: 195 },
    cities: [
      { name_en: "New York", name_ar: "نيويورك", x: 312, y: 185 },
      { name_en: "Los Angeles", name_ar: "لوس أنجلوس", x: 105, y: 215 },
      { name_en: "Chicago", name_ar: "شيكاغو", x: 260, y: 180 },
      { name_en: "Houston", name_ar: "هيوستن", x: 230, y: 245 }
    ]
  },
  france: {
    id: "250",
    name_en: "France",
    name_ar: "خريطة فرنسا",
    continent: "europe",
    viewBox: "460 140 90 90",
    capital: { name_en: "Paris", name_ar: "باريس", x: 492, y: 172 },
    cities: [
      { name_en: "Marseille", name_ar: "مارسيليا", x: 502, y: 202 },
      { name_en: "Lyon", name_ar: "ليون", x: 498, y: 190 }
    ]
  },
  germany: {
    id: "276",
    name_en: "Germany",
    name_ar: "خريطة ألمانيا",
    continent: "europe",
    viewBox: "490 120 80 80",
    capital: { name_en: "Berlin", name_ar: "برلين", x: 532, y: 152 },
    cities: [
      { name_en: "Munich", name_ar: "ميونخ", x: 526, y: 172 },
      { name_en: "Frankfurt", name_ar: "فرانكفورت", x: 518, y: 165 }
    ]
  },
  uk: {
    id: "826",
    name_en: "United Kingdom",
    name_ar: "خريطة المملكة المتحدة",
    continent: "europe",
    viewBox: "455 105 75 80",
    capital: { name_en: "London", name_ar: "لندن", x: 490, y: 152 },
    cities: [
      { name_en: "Edinburgh", name_ar: "إدنبرة", x: 482, y: 128 },
      { name_en: "Manchester", name_ar: "مانشستر", x: 486, y: 142 }
    ]
  },
  italy: {
    id: "380",
    name_en: "Italy",
    name_ar: "خريطة إيطاليا",
    continent: "europe",
    viewBox: "490 160 80 80",
    capital: { name_en: "Rome", name_ar: "روما", x: 530, y: 196 },
    cities: [
      { name_en: "Milan", name_ar: "ميلانو", x: 518, y: 178 },
      { name_en: "Naples", name_ar: "ناپولي", x: 535, y: 202 }
    ]
  },
  spain: {
    id: "724",
    name_en: "Spain",
    name_ar: "خريطة إسبانيا",
    continent: "europe",
    viewBox: "430 170 95 85",
    capital: { name_en: "Madrid", name_ar: "مدريد", x: 472, y: 205 },
    cities: [
      { name_en: "Barcelona", name_ar: "برشلونة", x: 498, y: 200 },
      { name_en: "Seville", name_ar: "إشبيلية", x: 462, y: 222 }
    ]
  },
  china: {
    id: "156",
    name_en: "China",
    name_ar: "خريطة الصين",
    continent: "asia",
    viewBox: "670 130 200 160",
    capital: { name_en: "Beijing", name_ar: "بكين", x: 790, y: 180 },
    cities: [
      { name_en: "Shanghai", name_ar: "شانغهاي", x: 810, y: 215 },
      { name_en: "Guangzhou", name_ar: "قوانغتشو", x: 785, y: 242 }
    ]
  },
  japan: {
    id: "392",
    name_en: "Japan",
    name_ar: "خريطة اليابان",
    continent: "asia",
    viewBox: "810 165 90 100",
    capital: { name_en: "Tokyo", name_ar: "طوكيو", x: 860, y: 214 },
    cities: [
      { name_en: "Osaka", name_ar: "أوساكا", x: 848, y: 220 },
      { name_en: "Sapporo", name_ar: "سابورو", x: 865, y: 182 }
    ]
  },
  india: {
    id: "356",
    name_en: "India",
    name_ar: "خريطة الهند",
    continent: "asia",
    viewBox: "660 200 115 120",
    capital: { name_en: "New Delhi", name_ar: "نيودلهي", x: 705, y: 232 },
    cities: [
      { name_en: "Mumbai", name_ar: "بومباي / مومباي", x: 692, y: 265 },
      { name_en: "Kolkata", name_ar: "كلكتا", x: 745, y: 250 }
    ]
  },
  saudi: {
    id: "682",
    name_en: "Saudi Arabia",
    name_ar: "خريطة المملكة العربية السعودية",
    continent: "asia",
    viewBox: "575 210 95 85",
    capital: { name_en: "Riyadh", name_ar: "الرياض", x: 618, y: 252 },
    cities: [
      { name_en: "Jeddah", name_ar: "جدة", x: 595, y: 258 },
      { name_en: "Mecca", name_ar: "مكة المكرمة", x: 597, y: 260 },
      { name_en: "Medina", name_ar: "المدينة المنورة", x: 596, y: 248 }
    ]
  },
  palestine: {
    id: "275",
    name_en: "Palestine",
    name_ar: "خريطة فلسطين",
    continent: "asia",
    viewBox: "570 215 45 40",
    capital: { name_en: "Jerusalem", name_ar: "القدس الشريف", x: 584, y: 232 },
    cities: [
      { name_en: "Gaza", name_ar: "غزة", x: 580, y: 234 },
      { name_en: "Ramallah", name_ar: "رام الله", x: 584, y: 231 }
    ]
  },
  turkey: {
    id: "792",
    name_en: "Turkey",
    name_ar: "خريطة تركيا",
    continent: "asia",
    viewBox: "540 180 80 55",
    capital: { name_en: "Ankara", name_ar: "أنقرة", x: 580, y: 204 },
    cities: [
      { name_en: "Istanbul", name_ar: "إسطنبول", x: 562, y: 198 },
      { name_en: "Izmir", name_ar: "إزمير", x: 556, y: 206 }
    ]
  },
  egypt: {
    id: "818",
    name_en: "Egypt",
    name_ar: "خريطة مصر",
    continent: "africa",
    viewBox: "545 210 75 70",
    capital: { name_en: "Cairo", name_ar: "القاهرة", x: 578, y: 235 },
    cities: [
      { name_en: "Alexandria", name_ar: "الإسكندرية", x: 570, y: 228 },
      { name_en: "Luxor", name_ar: "الأقصر", x: 580, y: 252 }
    ]
  }
};

export const CONTINENT_NAMES = {
  world: "World Political Map (خريطة العالم السياسية)",
  africa: "خريطة قارة إفريقيا (Africa Map)",
  europe: "Europe Map (خريطة قارة أوروبا)",
  asia: "Asia Map (خريطة قارة آسيا)",
  north_america: "North America Map (خريطة أمريكا الشمالية)",
  south_america: "South America Map (خريطة أمريكا الجنوبية)",
  oceania: "Oceania Map (خريطة أوقيانوسيا)",
  antarctica: "Antarctica Map (خريطة القارة القطبية الجنوبية)",
  usa: "USA Map (خريطة الولايات المتحدة الأمريكية)",
  france: "France Map (خريطة فرنسا)",
  germany: "Germany Map (خريطة ألمانيا)",
  uk: "United Kingdom Map (خريطة المملكة المتحدة)",
  italy: "Italy Map (خريطة إيطاليا)",
  spain: "Spain Map (خريطة إسبانيا)",
  china: "China Map (خريطة الصين)",
  japan: "Japan Map (خريطة اليابان)",
  india: "India Map (خريطة الهند)",
  saudi: "Saudi Arabia Map (خريطة المملكة العربية السعودية)",
  palestine: "Palestine Map (خريطة فلسطين)",
  turkey: "Turkey Map (خريطة تركيا)",
  egypt: "Egypt Map (خريطة مصر)"
};

export const CONTINENT_ARABIC_NAMES = CONTINENT_NAMES;

/* ══════════════════════════════════════════
   7. RENDER HELPER: WORLD, CONTINENT & COUNTRY MAPS
   ══════════════════════════════════════════ */
export function renderWorldMapSVG(props = {}, width = 800, height = 550, continentFocus = "world", mode = "political") {
  const showGridLines = props.showGridLines !== false;
  const showCountryNames = props.showCountryNames !== false;
  const showCities = props.showCities !== false;
  const focusKey = (props.countryFocus || props.continentFocus || continentFocus || "world").toLowerCase();
  
  const countryMeta = WORLD_COUNTRY_METADATA[focusKey];
  
  let viewBox = "0 0 1000 550";
  if (countryMeta && countryMeta.viewBox) {
    viewBox = countryMeta.viewBox;
  } else if (focusKey === "europe") {
    viewBox = "420 100 220 170";
  } else if (focusKey === "asia") {
    viewBox = "560 80 340 280";
  } else if (focusKey === "north_america") {
    viewBox = "50 40 380 260";
  } else if (focusKey === "south_america") {
    viewBox = "120 220 220 280";
  } else if (focusKey === "africa") {
    viewBox = "420 180 260 280";
  } else if (focusKey === "oceania") {
    viewBox = "700 240 250 200";
  }

  const defaultFill = mode.startsWith("blank") ? "#ffffff" : "#f1f5f9";
  const defaultStroke = "#94a3b8";
  const highlightedFill = props.mapColor || props.highlightColor || "#3b82f6";

  const countries = WORLD_COUNTRIES_50M_GEOJSON.filter(c => {
    if (focusKey === "world" || !focusKey) return true;
    if (countryMeta) return true; // Show full region context around country
    return c.continent === focusKey;
  });

  const countryPathsSvg = countries.map(c => {
    let isTargetCountry = false;
    if (countryMeta) {
      isTargetCountry = c.id === countryMeta.id || c.name_en === countryMeta.name_en;
    } else if (focusKey !== "world") {
      isTargetCountry = c.continent === focusKey;
    }

    let fillColor = defaultFill;
    let strokeColor = defaultStroke;
    let strokeWidth = "0.75";

    if (isTargetCountry) {
      fillColor = mode.startsWith("blank") ? "#dbeafe" : highlightedFill;
      strokeColor = "#1e3a8a";
      strokeWidth = "1.25";
    } else if (countryMeta) {
      fillColor = "#f8fafc";
      strokeColor = "#cbd5e1";
      strokeWidth = "0.5";
    }

    return `<path d="${c.path}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linejoin="round">
      <title>${c.name_en || c.name}</title>
    </path>`;
  }).join("");

  let citiesSvg = "";
  if (showCities && countryMeta) {
    if (countryMeta.capital) {
      citiesSvg += `<g transform="translate(${countryMeta.capital.x}, ${countryMeta.capital.y})" pointer-events="none">
        <circle r="2.5" fill="#dc2626" stroke="#ffffff" stroke-width="0.8"/>
        <circle r="1" fill="#ffffff"/>
        <text y="-4" fill="#0f172a" font-size="3.5" font-weight="bold" font-family="sans-serif" text-anchor="middle" stroke="#ffffff" stroke-width="0.8" paint-order="stroke fill">★ ${countryMeta.capital.name_ar} (${countryMeta.capital.name_en})</text>
      </g>`;
    }
    if (Array.isArray(countryMeta.cities)) {
      citiesSvg += countryMeta.cities.map(ct => 
        `<g transform="translate(${ct.x}, ${ct.y})" pointer-events="none">
          <circle r="1.5" fill="#2563eb" stroke="#ffffff" stroke-width="0.5"/>
          <text y="5" fill="#1e293b" font-size="2.8" font-weight="bold" font-family="sans-serif" text-anchor="middle" stroke="#ffffff" stroke-width="0.6" paint-order="stroke fill">${ct.name_ar}</text>
        </g>`
      ).join("");
    }
  }

  let labelsSvg = "";
  if (showCountryNames) {
    if (countryMeta) {
      labelsSvg = `<text x="${countryMeta.capital ? countryMeta.capital.x : 500}" y="${countryMeta.capital ? countryMeta.capital.y - 12 : 250}" fill="#1e3a8a" font-size="5" font-weight="bold" font-family="sans-serif" text-anchor="middle" stroke="#ffffff" stroke-width="1" paint-order="stroke fill">${countryMeta.name_ar} - ${countryMeta.name_en}</text>`;
    } else {
      labelsSvg = countries.filter(c => c.projX && c.projY).map(c => 
        `<text x="${c.projX}" y="${c.projY}" fill="#334155" font-size="3.5" font-weight="bold" font-family="sans-serif" text-anchor="middle" stroke="#ffffff" stroke-width="0.8" paint-order="stroke fill">${c.name_en}</text>`
      ).join("");
    }
  }

  let gridLinesSvg = "";
  if (showGridLines) {
    gridLinesSvg = `
      <line x1="0" y1="320" x2="1000" y2="320" stroke="#ef4444" stroke-width="0.8" stroke-dasharray="3,2"/>
      <text x="10" y="316" fill="#ef4444" font-size="4" font-weight="bold" font-family="sans-serif">خط الاستواء (Equator 0°)</text>

      <line x1="0" y1="230" x2="1000" y2="230" stroke="#f59e0b" stroke-width="0.6" stroke-dasharray="2,2"/>
      <text x="10" y="226" fill="#f59e0b" font-size="3.5" font-weight="bold" font-family="sans-serif">Tropic of Cancer (23.5° N)</text>

      <line x1="500" y1="0" x2="500" y2="550" stroke="#2563eb" stroke-width="0.8" stroke-dasharray="3,2"/>
      <text x="504" y="15" fill="#2563eb" font-size="4" font-weight="bold" font-family="sans-serif">Prime Meridian (0°)</text>
    `;
  }

  const mapTitle = CONTINENT_NAMES[focusKey] || countryMeta?.name_ar || focusKey;

  // ViewBox bounds for card element scaling
  const [vbX, vbY, vbW, vbH] = viewBox.split(" ").map(Number);
  const titleX = vbX + vbW * 0.05;
  const titleY = vbY + vbH * 0.92;
  const titleW = vbW * 0.45;
  const titleH = vbH * 0.07;
  const fontTitleSize = Math.max(3, vbH * 0.035);

  return `<svg width="100%" height="100%" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible; display:block;" dir="ltr">
    <rect x="${vbX}" y="${vbY}" width="${vbW}" height="${vbH}" fill="#f0f9ff" stroke="#cbd5e1" stroke-width="1"/>
    
    ${gridLinesSvg}
    ${countryPathsSvg}
    ${citiesSvg}
    ${labelsSvg}

    <g transform="translate(${titleX}, ${titleY})">
      <rect width="${titleW}" height="${titleH}" rx="${vbH * 0.01}" fill="#ffffff" fill-opacity="0.92" stroke="#cbd5e1" stroke-width="0.5"/>
      <text x="${titleW / 2}" y="${titleH * 0.65}" fill="#0f172a" font-size="${fontTitleSize}" font-weight="bold" font-family="sans-serif" text-anchor="middle">
        ${mapTitle}
      </text>
    </g>
  </svg>`;
}
