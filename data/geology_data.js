/* ══════════════════════════════════════════
   GEOLOGY ENGINE DATA & SCHEMAS
   Tectonic Plates, Subduction Systems, Volcanism & Stratigraphy
   ══════════════════════════════════════════ */

export const GEOLOGY_TECTONIC_PRESETS = {
  subduction_zone: {
    id: 'subduction_zone',
    title_ar: 'Subduction Zone',
    title_fr: 'Zone de subduction',
    title_en: 'Subduction Zone',
    defaultVelocity: 5, // cm/year
    defaultAngle: 45, // degrees
    defaultTemp: 1100, // °C
    oceanicThickness: 10, // km
    continentalThickness: 35, // km
    oceanicAge: '150 Million Years',
    continentalAge: '200 Million Years',
    ridgeAge: '2 Million Years',
    features: [
      { type: 'ridge', name: 'Mid-Ocean Ridge', x: 60, age: '2 Ma' },
      { type: 'trench', name: 'Oceanic Trench', x: 230, depth: '8,000 m' },
      { type: 'prism', name: 'Accretionary Prism', x: 255 },
      { type: 'magma_chamber', name: 'Magma Chamber', x: 380, depth: '25 km' },
      { type: 'granodiorite', name: 'Granodiorite Intrusion', x: 420 },
      { type: 'volcano', name: 'Andesitic Volcano', x: 380, height: '2,500 m' }
    ]
  }
};

export const TECTONIC_PLATES_LIST = [
  { id: 'african', name: 'African Plate', type: 'continental', speed: '2.1 cm/year' },
  { id: 'eurasian', name: 'Eurasian Plate', type: 'continental', speed: '1.5 cm/year' },
  { id: 'pacific', name: 'Pacific Plate', type: 'oceanic', speed: '8.0 cm/year' },
  { id: 'nazca', name: 'Nazca Plate', type: 'oceanic', speed: '7.5 cm/year' },
  { id: 'south_american', name: 'South American Plate', type: 'continental', speed: '2.5 cm/year' }
];

export const VOLCANO_TYPES = [
  { id: 'andesite', name: 'Andesitic Volcano (Explosive)', color: '#ef4444', viscosity: 'High' },
  { id: 'basalt', name: 'Effusive Shield Volcano (Basaltic)', color: '#ea580c', viscosity: 'Low' },
  { id: 'composite', name: 'Composite Stratovolcano', color: '#dc2626', viscosity: 'Medium' }
];

export const GEOLOGICAL_LAYERS_LIST = [
  { id: 'crust_oceanic', name: 'Oceanic Crust (Basaltic)', color: '#818cf8', stroke: '#4338ca' },
  { id: 'crust_continental', name: 'Continental Crust (Granitic)', color: '#fca5a5', stroke: '#b91c1c' },
  { id: 'lithosphere_mantle', name: 'Lithospheric Mantle (Upper)', color: '#fed7aa', stroke: '#c2410c' },
  { id: 'asthenosphere', name: 'Asthenosphere (Ductile Mantle)', color: '#86efac', stroke: '#15803d' },
  { id: 'sedimentary', name: 'Sedimentary Strata', color: '#fef08a', stroke: '#a16207' }
];
