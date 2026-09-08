/* ══════════════════════════════════════════
   BIOLOGY & CELL ENGINE DATA & SCHEMAS
   Eukaryotic & Prokaryotic Cells, Organelles & DNA Structures
   ══════════════════════════════════════════ */

export const ANIMAL_CELL_ORGANELLES = [
  { id: 'membrane', name: 'Plasma Membrane', name_en: 'Plasma Membrane', name_fr: 'Membrane plasmique', color: '#60a5fa', visible: true },
  { id: 'cytoplasm', name: 'Cytoplasm', name_en: 'Cytoplasm', name_fr: 'Cytoplasme', color: '#e0f2fe', visible: true },
  { id: 'nucleus', name: 'Nucleus', name_en: 'Nucleus', name_fr: 'Noyau', color: '#8b5cf6', visible: true },
  { id: 'nucleolus', name: 'Nucleolus', name_en: 'Nucleolus', name_fr: 'Nucléole', color: '#581c87', visible: true },
  { id: 'mitochondria', name: 'Mitochondria (Powerhouse)', name_en: 'Mitochondria', name_fr: 'Mitochondrie', color: '#f97316', visible: true },
  { id: 'ribosomes', name: 'Free Ribosomes', name_en: 'Free Ribosomes', name_fr: 'Ribosomes', color: '#374151', visible: true },
  { id: 'rough_er', name: 'Rough Endoplasmic Reticulum', name_en: 'Rough Endoplasmic Reticulum', name_fr: 'RE rugueux', color: '#3b82f6', visible: true },
  { id: 'smooth_er', name: 'Smooth Endoplasmic Reticulum', name_en: 'Smooth Endoplasmic Reticulum', name_fr: 'RE lisse', color: '#06b6d4', visible: true },
  { id: 'golgi', name: 'Golgi Apparatus', name_en: 'Golgi Apparatus', name_fr: 'Appareil de Golgi', color: '#f43f5e', visible: true },
  { id: 'lysosome', name: 'Lysosome', name_en: 'Lysosome', name_fr: 'Lysosome', color: '#eab308', visible: true },
  { id: 'centrosome', name: 'Centrosome (Centriole)', name_en: 'Centrosome', name_fr: 'Centrosome', color: '#10b981', visible: true },
  { id: 'vacuole', name: 'Secretory Vesicles', name_en: 'Secretory Vesicles', name_fr: 'Vésicules d\'sécrétion', color: '#a855f7', visible: true }
];

export const PLANT_CELL_ORGANELLES = [
  { id: 'wall', name: 'Cell Wall (Cellulose)', name_en: 'Cell Wall', name_fr: 'Paroi cellulaire', color: '#16a34a', visible: true },
  { id: 'membrane', name: 'Plasma Membrane', name_en: 'Plasma Membrane', name_fr: 'Membrane plasmique', color: '#4ade80', visible: true },
  { id: 'cytoplasm', name: 'Cytoplasm', name_en: 'Cytoplasm', name_fr: 'Cytoplasme', color: '#f0fdf4', visible: true },
  { id: 'nucleus', name: 'Nucleus', name_en: 'Nucleus', name_fr: 'Noyau', color: '#8b5cf6', visible: true },
  { id: 'nucleolus', name: 'Nucleolus', name_en: 'Nucleolus', name_fr: 'Nucléole', color: '#581c87', visible: true },
  { id: 'chloroplast', name: 'Chloroplasts (Plastids)', name_en: 'Chloroplasts', name_fr: 'Chloroplaste', color: '#15803d', visible: true },
  { id: 'large_vacuole', name: 'Central Vacuole', name_en: 'Central Vacuole', name_fr: 'Grande vacuole', color: '#38bdf8', visible: true },
  { id: 'mitochondria', name: 'Mitochondria', name_en: 'Mitochondria', name_fr: 'Mitochondrie', color: '#f97316', visible: true },
  { id: 'ribosomes', name: 'Ribosomes', name_en: 'Ribosomes', name_fr: 'Ribosomes', color: '#374151', visible: true },
  { id: 'rough_er', name: 'Rough Endoplasmic Reticulum', name_en: 'Rough Endoplasmic Reticulum', name_fr: 'RE rugueux', color: '#3b82f6', visible: true },
  { id: 'smooth_er', name: 'Smooth Endoplasmic Reticulum', name_en: 'Smooth Endoplasmic Reticulum', name_fr: 'RE lisse', color: '#06b6d4', visible: true },
  { id: 'golgi', name: 'Golgi Apparatus', name_en: 'Golgi Apparatus', name_fr: 'Appareil de Golgi', color: '#f43f5e', visible: true }
];

export const BACTERIAL_CELL_ORGANELLES = [
  { id: 'capsule', name: 'Bacterial Capsule', name_en: 'Bacterial Capsule', name_fr: 'Capsule', color: '#3b82f6', visible: true },
  { id: 'wall', name: 'Bacterial Cell Wall', name_en: 'Bacterial Cell Wall', name_fr: 'Paroi bactérienne', color: '#eab308', visible: true },
  { id: 'membrane', name: 'Plasma Membrane', name_en: 'Plasma Membrane', name_fr: 'Membrane plasmique', color: '#10b981', visible: true },
  { id: 'cytoplasm', name: 'Cytoplasm', name_en: 'Cytoplasm', name_fr: 'Cytoplasme', color: '#fef3c7', visible: true },
  { id: 'nucleoid', name: 'Nucleoid (Circular DNA)', name_en: 'Nucleoid', name_fr: 'Nucléoïde (ADN)', color: '#a855f7', visible: true },
  { id: 'plasmid', name: 'Plasmid DNA', name_en: 'Plasmid DNA', name_fr: 'Plasmide', color: '#ec4899', visible: true },
  { id: 'ribosomes', name: 'Free Ribosomes', name_en: 'Free Ribosomes', name_fr: 'Ribosomes', color: '#374151', visible: true },
  { id: 'flagellum', name: 'Flagellum', name_en: 'Flagellum', name_fr: 'Flagelle', color: '#64748b', visible: true },
  { id: 'pili', name: 'Pili / Fimbriae', name_en: 'Pili / Fimbriae', name_fr: 'Pili', color: '#94a3b8', visible: true }
];

export const DNA_BASE_PAIRS = [
  { pair: 'A-T', base1: 'Adenine (A)', base2: 'Thymine (T)', color1: '#ef4444', color2: '#3b82f6' },
  { pair: 'T-A', base1: 'Thymine (T)', base2: 'Adenine (A)', color1: '#3b82f6', color2: '#ef4444' },
  { pair: 'C-G', base1: 'Cytosine (C)', base2: 'Guanine (G)', color1: '#10b981', color2: '#f59e0b' },
  { pair: 'G-C', base1: 'Guanine (G)', base2: 'Cytosine (C)', color1: '#f59e0b', color2: '#10b981' }
];
