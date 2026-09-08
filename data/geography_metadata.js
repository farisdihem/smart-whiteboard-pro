/* ══════════════════════════════════════════
   GEOGRAPHY METADATA & PROJECTION SYSTEM
   Sourcing, Dataset Licensing & Map Coordinate Transformations
   ══════════════════════════════════════════ */

export const GEOGRAPHY_METADATA = {
  source: 'Natural Earth & GADM Open Vector Dataset',
  dataset_name: 'Algeria & World Administrative Boundaries Dataset',
  version: '3.6.1-PRECISION',
  license: 'Open Data Commons Open Database License (ODbL) / Creative Commons BY 4.0',
  date: '2026-08-15',
  authoritative_wilaya_count: 58,
  projection_default: 'equirectangular',
  bbox_algeria: {
    minLat: 18.96,
    maxLat: 37.09,
    minLng: -8.67,
    maxLng: 11.99
  }
};

/**
 * Projects Lat/Lng coordinates to normalized screen coordinates
 * @param {number} lat Latitude in degrees (-90 to +90)
 * @param {number} lng Longitude in degrees (-180 to +180)
 * @param {string} projection 'equirectangular' | 'mercator'
 * @param {object} bbox Bounding box object
 * @param {number} width Target viewport width
 * @param {number} height Target viewport height
 * @returns {{x: number, y: number}} Screen coordinates
 */
export function projectLatLng(lat, lng, projection = 'equirectangular', bbox = GEOGRAPHY_METADATA.bbox_algeria, width = 520, height = 520) {
  let normX = 0;
  let normY = 0;

  if (projection === 'mercator') {
    const minY = Math.log(Math.tan((45 + bbox.minLat / 2) * Math.PI / 180));
    const maxY = Math.log(Math.tan((45 + bbox.maxLat / 2) * Math.PI / 180));
    const py = Math.log(Math.tan((45 + lat / 2) * Math.PI / 180));

    normX = (lng - bbox.minLng) / (bbox.maxLng - bbox.minLng);
    normY = 1 - (py - minY) / (maxY - minY);
  } else {
    // Default: Equirectangular
    normX = (lng - bbox.minLng) / (bbox.maxLng - bbox.minLng);
    normY = 1 - (lat - bbox.minLat) / (bbox.maxLat - bbox.minLat);
  }

  // Clamp values to avoid out of bounds drawing
  normX = Math.max(0, Math.min(1, normX));
  normY = Math.max(0, Math.min(1, normY));

  return {
    x: Math.round(30 + normX * (width - 60)),
    y: Math.round(50 + normY * (height - 100))
  };
}

/**
 * Calculate Great Circle Distance (Haversine formula) in kilometers
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Calculate Initial Bearing in degrees
 */
export function calculateBearing(lat1, lon1, lat2, lon2) {
  const y = Math.sin((lon2 - lon1) * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180);
  const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
            Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos((lon2 - lon1) * Math.PI / 180);
  const brng = Math.atan2(y, x) * 180 / Math.PI;
  return Math.round((brng + 360) % 360);
}
