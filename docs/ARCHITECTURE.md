# Whiteboard Pro AI Architecture & Rendering Patterns

## 1. Unified Property Architecture (`propSchema`)

Every interactive educational apparatus is registered in `EDU_REGISTRY` with a declarative `propSchema`.
The property panel (`showEduPropertyPanel`) automatically binds inputs to element dataset properties via `.generic-prop-input` and updates the component via `commitPropertyChanges()`.

> **Golden Rule**: Every field object in `propSchema` MUST specify `id` as its property key. Never use `key`.

### Registration & Schema Pattern Example:
```javascript
'physics.ammeter': {
  type: 'physics.ammeter',
  category: 'physics',
  name: 'مقياس أمبيرمتر (A)',
  schemaVersion: 1,
  defaultProps: { reading: 2.5, maxScale: 5, label: 'A', color: '#0284c7' },
  defaultSize: { w: 160, h: 160 },
  propSchema: [
    { id: 'reading', type: 'number', label: 'الشدة (A)', min: 0, max: 20, step: 0.1, default: 2.5 },
    { id: 'label', type: 'text', label: 'التسمية', default: 'A' },
    { id: 'color', type: 'color', label: 'لون الهيكل', default: '#0284c7' }
  ],
  renderSVG: (props, w, h) => {
    const reading = Number(props.reading) || 0;
    const label = escapeXml(props.label || 'A');
    const color = escapeXml(props.color || '#0284c7');
    // Calculate dynamic needle angle
    const angle = -45 + (reading / 5) * 90;
    return `<svg width="100%" height="100%" viewBox="0 0 160 160">
      <circle cx="80" cy="80" r="70" fill="#f8fafc" stroke="${color}" stroke-width="4"/>
      <line x1="80" y1="80" x2="80" y2="25" stroke="#ef4444" stroke-width="3"
            transform="rotate(${angle} 80 80)" stroke-linecap="round"/>
      <text x="80" y="115" text-anchor="middle" font-weight="bold" fill="#0f172a">${label}: ${reading} A</text>
    </svg>`;
  }
}
```

---

## 2. Rendering Patterns: Volumetric Gradient vs Solid Fill

### Pattern A: Soft Puffy 3D / Volumetric Studio Light (Gradient Pattern)
Used for realistic lab glassware, cells, organs, and volumetric apparatuses. Employs multi-stop radial/linear gradients, specular highlights, and drop shadows.

```javascript
// Volumetric 3D Beaker Pattern with liquid & specular highlights
renderSVG: (props, w, h) => {
  const color = escapeXml(props.color || '#0284c7');
  const lColor = escapeXml(props.liquidColor || '#38bdf8');
  const label = escapeXml(props.label || 'محلول');
  const uid = 'beaker_' + Math.random().toString(36).substr(2, 5); // unique gradient IDs

  return `<svg width="100%" height="100%" viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="liq_${uid}" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
        <stop offset="35%" stop-color="${lColor}"/>
        <stop offset="100%" stop-color="${color}"/>
      </radialGradient>
      <filter id="shadow_${uid}"><feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.25"/></filter>
    </defs>
    <!-- Liquid Body -->
    <rect x="25" y="60" width="90" height="90" rx="10" fill="url(#liq_${uid})" filter="url(#shadow_${uid})"/>
    <!-- Glass Outline -->
    <path d="M 20 20 L 20 150 A 10 10 0 0 0 30 160 L 110 160 A 10 10 0 0 0 120 150 L 120 20"
          fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
    <!-- Specular Highlight Curve -->
    <path d="M 28 35 L 28 140" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.75"/>
    <text x="70" y="110" font-weight="bold" font-size="12" fill="#ffffff" text-anchor="middle">${label}</text>
  </svg>`;
}
```

### Pattern B: Crisp High-Contrast Technical Schema (Solid Fill Pattern)
Used for circuit schematics, vector indicators, vectors, and optical diagrams requiring pure mathematical contrast.

```javascript
// High-Contrast Technical Resistor / Vector Pattern
renderSVG: (props, w, h) => {
  const val = Number(props.value) || 10;
  const label = escapeXml(props.label || 'R');
  const color = escapeXml(props.color || '#334155');

  return `<svg width="100%" height="100%" viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg">
    <!-- Lead wires -->
    <line x1="10" y1="30" x2="40" y2="30" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    <line x1="120" y1="30" x2="150" y2="30" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    <!-- Resistor Body -->
    <rect x="40" y="15" width="80" height="30" rx="4" fill="#f8fafc" stroke="${color}" stroke-width="3"/>
    <!-- Label & Value -->
    <text x="80" y="34" font-weight="bold" font-size="12" fill="${color}" text-anchor="middle">${label} = ${val} Ω</text>
  </svg>`;
}
```
