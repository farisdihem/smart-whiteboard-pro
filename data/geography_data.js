/* ══════════════════════════════════════════
   GEOGRAPHY ENGINE DATA - ALGERIA & WORLD MAPS
   Externalized Data Module with Polygon Geometry Coordinates
   ══════════════════════════════════════════ */

import { GEOGRAPHY_METADATA, projectLatLng } from './geography_metadata.js';

export { GEOGRAPHY_METADATA, projectLatLng };

/**
 * 58 Algerian Wilayas with Exact Centroids, Regions, Codes, Areas, and Boundary Polygon Path Geometries
 */
export const ALGERIA_WILAYAS_LIST = [
  { id: 1, name: 'Adrar', name_fr: 'Adrar', code: '01', region: 'South', lat: 27.87, lng: -0.29, area: '258,038 km²', geometry: 'M 180,220 L 250,220 L 240,290 L 170,280 Z' },
  { id: 2, name: 'Chlef', name_fr: 'Chlef', code: '02', region: 'North', lat: 36.16, lng: 1.33, area: '4,791 km²', geometry: 'M 255,80 L 270,80 L 268,90 L 253,90 Z' },
  { id: 3, name: 'Laghouat', name_fr: 'Laghouat', code: '03', region: 'High Plateaus', lat: 33.80, lng: 2.86, area: '25,052 km²', geometry: 'M 280,120 L 310,120 L 305,145 L 275,140 Z' },
  { id: 4, name: 'Oum El Bouaghi', name_fr: 'Oum El Bouaghi', code: '04', region: 'High Plateaus', lat: 35.87, lng: 7.11, area: '6,188 km²', geometry: 'M 390,82 L 410,82 L 408,92 L 388,92 Z' },
  { id: 5, name: 'Batna', name_fr: 'Batna', code: '05', region: 'High Plateaus', lat: 35.55, lng: 6.17, area: '12,192 km²', geometry: 'M 370,88 L 395,88 L 392,102 L 368,102 Z' },
  { id: 6, name: 'Béjaïa', name_fr: 'Béjaïa', code: '06', region: 'North', lat: 36.75, lng: 5.05, area: '3,268 km²', geometry: 'M 345,70 L 360,70 L 358,78 L 343,78 Z' },
  { id: 7, name: 'Biskra', name_fr: 'Biskra', code: '07', region: 'South', lat: 34.85, lng: 5.73, area: '20,986 km²', geometry: 'M 360,100 L 390,100 L 385,125 L 355,120 Z' },
  { id: 8, name: 'Béchar', name_fr: 'Béchar', code: '08', region: 'South', lat: 31.62, lng: -2.22, area: '162,200 km²', geometry: 'M 140,140 L 190,140 L 180,200 L 130,195 Z' },
  { id: 9, name: 'Blida', name_fr: 'Blida', code: '09', region: 'North', lat: 36.47, lng: 2.83, area: '1,575 km²', geometry: 'M 295,74 L 308,74 L 306,81 L 293,81 Z' },
  { id: 10, name: 'Bouira', name_fr: 'Bouira', code: '10', region: 'North', lat: 36.37, lng: 3.90, area: '4,439 km²', geometry: 'M 320,76 L 338,76 L 335,85 L 318,85 Z' },
  { id: 11, name: 'Tamanrasset', name_fr: 'Tamanrasset', code: '11', region: 'South', lat: 22.78, lng: 5.52, area: '550,608 km²', geometry: 'M 300,340 L 420,340 L 400,450 L 280,440 Z' },
  { id: 12, name: 'Tébessa', name_fr: 'Tébessa', code: '12', region: 'High Plateaus', lat: 35.40, lng: 8.12, area: '14,227 km²', geometry: 'M 410,88 L 435,88 L 432,110 L 408,108 Z' },
  { id: 13, name: 'Tlemcen', name_fr: 'Tlemcen', code: '13', region: 'North', lat: 34.88, lng: -1.31, area: '9,061 km²', geometry: 'M 185,95 L 210,95 L 208,110 L 183,110 Z' },
  { id: 14, name: 'Tiaret', name_fr: 'Tiaret', code: '14', region: 'High Plateaus', lat: 35.37, lng: 1.32, area: '20,673 km²', geometry: 'M 250,92 L 280,92 L 275,112 L 245,110 Z' },
  { id: 15, name: 'Tizi Ouzou', name_fr: 'Tizi Ouzou', code: '15', region: 'North', lat: 36.71, lng: 4.04, area: '2,958 km²', geometry: 'M 322,68 L 338,68 L 336,75 L 320,75 Z' },
  { id: 16, name: 'Algiers (Capital)', name_fr: 'Alger', code: '16', region: 'North', lat: 36.75, lng: 3.05, area: '1,190 km²', geometry: 'M 300,68 L 312,68 L 310,74 L 298,74 Z' },
  { id: 17, name: 'Djelfa', name_fr: 'Djelfa', code: '17', region: 'High Plateaus', lat: 34.67, lng: 3.25, area: '32,256 km²', geometry: 'M 290,105 L 330,105 L 325,135 L 285,130 Z' },
  { id: 18, name: 'Jijel', name_fr: 'Jijel', code: '18', region: 'North', lat: 36.82, lng: 5.76, area: '2,577 km²', geometry: 'M 360,68 L 378,68 L 376,75 L 358,75 Z' },
  { id: 19, name: 'Sétif', name_fr: 'Sétif', code: '19', region: 'High Plateaus', lat: 36.19, lng: 5.41, area: '6,504 km²', geometry: 'M 350,78 L 372,78 L 369,88 L 347,88 Z' },
  { id: 20, name: 'Saïda', name_fr: 'Saïda', code: '20', region: 'High Plateaus', lat: 34.83, lng: 0.15, area: '6,764 km²', geometry: 'M 220,100 L 242,100 L 239,112 L 217,112 Z' },
  { id: 21, name: 'Skikda', name_fr: 'Skikda', code: '21', region: 'North', lat: 36.87, lng: 6.90, area: '4,026 km²', geometry: 'M 388,66 L 405,66 L 403,75 L 386,75 Z' },
  { id: 22, name: 'Sidi Bel Abbès', name_fr: 'Sidi Bel Abbès', code: '22', region: 'North', lat: 35.19, lng: -0.63, area: '9,096 km²', geometry: 'M 200,92 L 222,92 L 220,105 L 198,105 Z' },
  { id: 23, name: 'Annaba', name_fr: 'Annaba', code: '23', region: 'North', lat: 36.90, lng: 7.76, area: '1,439 km²', geometry: 'M 408,65 L 422,65 L 420,72 L 406,72 Z' },
  { id: 24, name: 'Guelma', name_fr: 'Guelma', code: '24', region: 'North', lat: 36.46, lng: 7.43, area: '4,101 km²', geometry: 'M 398,74 L 416,74 L 414,83 L 396,83 Z' },
  { id: 25, name: 'Constantine', name_fr: 'Constantine', code: '25', region: 'North', lat: 36.36, lng: 6.61, area: '2,187 km²', geometry: 'M 380,75 L 396,75 L 394,82 L 378,82 Z' },
  { id: 26, name: 'Médéa', name_fr: 'Médéa', code: '26', region: 'North', lat: 36.26, lng: 2.75, area: '8,866 km²', geometry: 'M 288,80 L 310,80 L 307,95 L 285,95 Z' },
  { id: 27, name: 'Mostaganem', name_fr: 'Mostaganem', code: '27', region: 'North', lat: 35.93, lng: 0.09, area: '2,175 km²', geometry: 'M 220,82 L 236,82 L 234,90 L 218,90 Z' },
  { id: 28, name: "M'Sila", name_fr: "M'Sila", code: '28', region: 'High Plateaus', lat: 35.70, lng: 4.54, area: '18,718 km²', geometry: 'M 325,88 L 358,88 L 354,110 L 321,110 Z' },
  { id: 29, name: 'Mascara', name_fr: 'Mascara', code: '29', region: 'North', lat: 35.40, lng: 0.14, area: '5,941 km²', geometry: 'M 222,90 L 242,90 L 240,102 L 220,102 Z' },
  { id: 30, name: 'Ouargla', name_fr: 'Ouargla', code: '30', region: 'South', lat: 31.95, lng: 5.32, area: '211,980 km²', geometry: 'M 340,140 L 420,140 L 410,210 L 330,200 Z' },
  { id: 31, name: 'Oran', name_fr: 'Oran', code: '31', region: 'North', lat: 35.69, lng: -0.63, area: '2,121 km²', geometry: 'M 202,82 L 218,82 L 216,90 L 200,90 Z' },
  { id: 32, name: 'El Bayadh', name_fr: 'El Bayadh', code: '32', region: 'High Plateaus', lat: 33.68, lng: 1.01, area: '78,870 km²', geometry: 'M 230,120 L 275,120 L 268,160 L 222,155 Z' },
  { id: 33, name: 'Illizi', name_fr: 'Illizi', code: '33', region: 'South', lat: 26.48, lng: 8.48, area: '285,000 km²', geometry: 'M 410,240 L 490,240 L 475,340 L 395,330 Z' },
  { id: 34, name: 'Bordj Bou Arréridj', name_fr: 'Bordj Bou Arréridj', code: '34', region: 'High Plateaus', lat: 36.07, lng: 4.76, area: '4,110 km²', geometry: 'M 335,78 L 352,78 L 350,86 L 333,86 Z' },
  { id: 35, name: 'Boumerdès', name_fr: 'Boumerdès', code: '35', region: 'North', lat: 36.75, lng: 3.47, area: '1,356 km²', geometry: 'M 310,68 L 322,68 L 320,74 L 308,74 Z' },
  { id: 36, name: 'El Tarf', name_fr: 'El Tarf', code: '36', region: 'North', lat: 36.76, lng: 8.31, area: '3,339 km²', geometry: 'M 422,65 L 438,65 L 435,74 L 420,74 Z' },
  { id: 37, name: 'Tindouf', name_fr: 'Tindouf', code: '37', region: 'South', lat: 27.67, lng: -8.14, area: '159,000 km²', geometry: 'M 40,210 L 120,210 L 110,290 L 30,280 Z' },
  { id: 38, name: 'Tissemsilt', name_fr: 'Tissemsilt', code: '38', region: 'High Plateaus', lat: 35.60, lng: 1.81, area: '3,152 km²', geometry: 'M 260,88 L 278,88 L 276,96 L 258,96 Z' },
  { id: 39, name: 'El Oued', name_fr: 'El Oued', code: '39', region: 'South', lat: 33.36, lng: 6.86, area: '54,573 km²', geometry: 'M 380,120 L 430,120 L 422,160 L 372,155 Z' },
  { id: 40, name: 'Khenchela', name_fr: 'Khenchela', code: '40', region: 'High Plateaus', lat: 35.43, lng: 7.14, area: '9,811 km²', geometry: 'M 390,92 L 415,92 L 412,105 L 388,105 Z' },
  { id: 41, name: 'Souk Ahras', name_fr: 'Souk Ahras', code: '41', region: 'North', lat: 36.28, lng: 7.95, area: '4,541 km²', geometry: 'M 412,74 L 432,74 L 429,85 L 409,85 Z' },
  { id: 42, name: 'Tipaza', name_fr: 'Tipaza', code: '42', region: 'North', lat: 36.59, lng: 2.44, area: '1,606 km²', geometry: 'M 282,72 L 296,72 L 294,79 L 280,79 Z' },
  { id: 43, name: 'Mila', name_fr: 'Mila', code: '43', region: 'North', lat: 36.45, lng: 6.26, area: '3,407 km²', geometry: 'M 372,72 L 388,72 L 386,81 L 370,81 Z' },
  { id: 44, name: 'Aïn Defla', name_fr: 'Aïn Defla', code: '44', region: 'North', lat: 36.26, lng: 1.96, area: '4,891 km²', geometry: 'M 268,80 L 285,80 L 283,90 L 266,90 Z' },
  { id: 45, name: 'Naâma', name_fr: 'Naâma', code: '45', region: 'High Plateaus', lat: 33.26, lng: -0.31, area: '29,950 km²', geometry: 'M 195,120 L 230,120 L 225,150 L 190,145 Z' },
  { id: 46, name: 'Aïn Témouchent', name_fr: 'Aïn Témouchent', code: '46', region: 'North', lat: 35.30, lng: -1.14, area: '2,376 km²', geometry: 'M 188,88 L 204,88 L 202,96 L 186,96 Z' },
  { id: 47, name: 'Ghardaïa', name_fr: 'Ghardaïa', code: '47', region: 'South', lat: 32.49, lng: 3.67, area: '86,105 km²', geometry: 'M 290,140 L 340,140 L 332,185 L 282,180 Z' },
  { id: 48, name: 'Relizane', name_fr: 'Relizane', code: '48', region: 'North', lat: 35.74, lng: 0.55, area: '4,870 km²', geometry: 'M 235,84 L 253,84 L 251,93 L 233,93 Z' },
  { id: 49, name: 'Timimoun', name_fr: 'Timimoun', code: '49', region: 'South', lat: 29.25, lng: 0.23, area: '65,203 km²', geometry: 'M 200,190 L 260,190 L 250,240 L 190,235 Z' },
  { id: 50, name: 'Bordj Badji Mokhtar', name_fr: 'Bordj Badji Mokhtar', code: '50', region: 'South', lat: 21.33, lng: 0.95, area: '120,000 km²', geometry: 'M 180,380 L 280,380 L 265,470 L 165,460 Z' },
  { id: 51, name: 'Ouled Djellal', name_fr: 'Ouled Djellal', code: '51', region: 'South', lat: 34.42, lng: 5.07, area: '11,410 km²', geometry: 'M 340,108 L 368,108 L 364,124 L 336,124 Z' },
  { id: 52, name: 'Béni Abbès', name_fr: 'Béni Abbès', code: '52', region: 'South', lat: 30.13, lng: -2.16, area: '101,350 km²', geometry: 'M 130,180 L 190,180 L 180,240 L 120,235 Z' },
  { id: 53, name: 'In Salah', name_fr: 'In Salah', code: '53', region: 'South', lat: 27.20, lng: 2.48, area: '131,220 km²', geometry: 'M 250,240 L 330,240 L 320,310 L 240,305 Z' },
  { id: 54, name: 'In Guezzam', name_fr: 'In Guezzam', code: '54', region: 'South', lat: 19.57, lng: 5.77, area: '88,126 km²', geometry: 'M 310,430 L 390,430 L 380,490 L 300,485 Z' },
  { id: 55, name: 'Touggourt', name_fr: 'Touggourt', code: '55', region: 'South', lat: 33.10, lng: 6.06, area: '15,910 km²', geometry: 'M 360,130 L 390,130 L 385,152 L 355,150 Z' },
  { id: 56, name: 'Djanet', name_fr: 'Djanet', code: '56', region: 'South', lat: 24.55, lng: 9.48, area: '86,185 km²', geometry: 'M 420,310 L 490,310 L 480,380 L 410,375 Z' },
  { id: 57, name: "El M'Ghair", name_fr: "El M'Ghair", code: '57', region: 'South', lat: 33.95, lng: 5.92, area: '8,835 km²', geometry: 'M 360,112 L 385,112 L 382,128 L 357,128 Z' },
  { id: 58, name: 'El Meniaa', name_fr: 'El Meniaa', code: '58', region: 'South', lat: 30.58, lng: 2.88, area: '62,215 km²', geometry: 'M 270,170 L 325,170 L 318,215 L 263,210 Z' }
];

/* Natural Regions of Algeria */
export const ALGERIA_REGIONS = [
  { id: 'tell', name: 'Northern Region (Tell Atlas)', color: '#16a34a', bgOpacity: 0.25 },
  { id: 'high_plateaus', name: 'High Plateaus Region', color: '#d97706', bgOpacity: 0.22 },
  { id: 'saharan_atlas', name: 'Saharan Atlas', color: '#b45309', bgOpacity: 0.3 },
  { id: 'sahara', name: 'Grand Sahara Desert', color: '#eab308', bgOpacity: 0.18 }
];

/* Major Rivers / Hydrography in Algeria */
export const ALGERIA_RIVERS = [
  { name: 'Chelif River', length: '700 km', color: '#0284c7', path: 'M 180,105 Q 220,100 260,110 T 320,108' },
  { name: 'Soummam River', length: '200 km', color: '#0284c7', path: 'M 350,95 Q 370,100 390,92' },
  { name: 'Macta River', length: '140 km', color: '#0284c7', path: 'M 140,115 Q 160,120 170,110' },
  { name: 'Mellègue River', length: '130 km', color: '#0284c7', path: 'M 440,115 Q 460,125 470,110' },
  { name: 'Saoura River', length: '180 km', color: '#0284c7', path: 'M 110,210 Q 120,240 100,280' }
];

/* Natural Resources & Energy Fields */
export const ALGERIA_RESOURCES = [
  { name: 'Hassi Messaoud', type: 'Petroleum (Oil)', icon: 'droplet', color: '#1e293b', x: 370, y: 220 },
  { name: "Hassi R'Mel", type: 'Natural Gas', icon: 'flame', color: '#dc2626', x: 260, y: 175 },
  { name: 'Ouenza', type: 'Iron Ore Mine', icon: 'pickaxe', color: '#475569', x: 460, y: 110 },
  { name: 'Djebel Onk', type: 'Phosphate Mine', icon: 'layers', color: '#16a34a', x: 450, y: 135 },
  { name: 'Amesmessa', type: 'Gold & Minerals', icon: 'sparkles', color: '#eab308', x: 330, y: 440 }
];

/* Climate Zones of Algeria */
export const ALGERIA_CLIMATES = [
  { name: 'Mediterranean Climate (Northern)', color: '#22c55e', opacity: 0.35, yMin: 0, yMax: 115 },
  { name: 'Semi-Arid Climate (Continental / Steppe)', color: '#f59e0b', opacity: 0.3, yMin: 115, yMax: 180 },
  { name: 'Saharan Arid Climate (Hot & Dry)', color: '#eab308', opacity: 0.22, yMin: 180, yMax: 500 }
];

/* World Continents Data */
export const WORLD_CONTINENTS = [
  { id: 'africa', name: 'Africa', color: '#f59e0b', path: 'M 240,140 Q 290,140 310,210 T 270,310 T 220,220 Z' },
  { id: 'asia', name: 'Asia', color: '#ef4444', path: 'M 310,80 Q 420,60 480,120 T 420,220 T 310,130 Z' },
  { id: 'europe', name: 'Europe', color: '#3b82f6', path: 'M 250,70 Q 300,60 320,110 T 260,110 Z' },
  { id: 'north_america', name: 'North America', color: '#10b981', path: 'M 70,60 Q 160,50 180,130 T 90,160 Z' },
  { id: 'south_america', name: 'South America', color: '#8b5cf6', path: 'M 130,170 Q 180,180 170,290 T 120,260 Z' },
  { id: 'australia', name: 'Oceania / Australia', color: '#ec4899', path: 'M 420,230 Q 490,230 480,290 T 410,280 Z' },
  { id: 'antarctica', name: 'Antarctica', color: '#94a3b8', path: 'M 50,330 L 530,330 L 530,360 L 50,360 Z' }
];

/* Key Latitude and Longitude Lines */
export const WORLD_GRID_LINES = [
  { name: 'Equator (0°)', latitude: 0, y: 180, color: '#ef4444', dash: '4,4' },
  { name: 'Tropic of Cancer (23.5° N)', latitude: 23.5, y: 130, color: '#f59e0b', dash: '3,3' },
  { name: 'Tropic of Capricorn (23.5° S)', latitude: -23.5, y: 230, color: '#f59e0b', dash: '3,3' },
  { name: 'Arctic Circle (66.5° N)', latitude: 66.5, y: 60, color: '#0284c7', dash: '2,2' },
  { name: 'Antarctic Circle (66.5° S)', latitude: -66.5, y: -300, color: '#0284c7', dash: '2,2' },
  { name: 'Prime Meridian (0°)', longitude: 0, x: 270, color: '#3b82f6', dash: '4,4' }
];

/* World Climate Zones */
export const WORLD_CLIMATES = [
  { name: 'Equatorial & Tropical Zone', color: '#16a34a', opacity: 0.25, yMin: 155, yMax: 205 },
  { name: 'Subtropical & Arid Zone', color: '#eab308', opacity: 0.2, yMin: 105, yMax: 255 },
  { name: 'Temperate Zone (Mediterranean & Continental)', color: '#0284c7', opacity: 0.2, yMin: 55, yMax: 305 },
  { name: 'Polar Zone (Tundra & Ice Cap)', color: '#94a3b8', opacity: 0.3, yMin: 0, yMax: 360 }
];

/* Major Tectonic Plates & Ring of Fire */
export const TECTONIC_PLATES = [
  { name: 'African Plate', path: 'M 220,130 L 320,130 L 300,320 L 200,280 Z', color: '#b45309' },
  { name: 'Eurasian Plate', path: 'M 230,50 L 500,50 L 460,150 L 250,120 Z', color: '#0369a1' },
  { name: 'Pacific Plate (Ring of Fire)', path: 'M 10,80 L 100,100 L 90,260 L 10,280 Z', color: '#dc2626' },
  { name: 'North American Plate', path: 'M 50,40 L 220,40 L 180,160 L 80,160 Z', color: '#15803d' },
  { name: 'South American Plate', path: 'M 110,165 L 190,165 L 160,300 L 110,290 Z', color: '#6b21a8' }
];
