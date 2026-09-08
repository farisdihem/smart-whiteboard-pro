# CLAUDE.md - Whiteboard Pro AI Handover Guide

## 1. Project Overview
Interactive educational whiteboard for physics, chemistry, biology, mathematics, and geography in Arabic/French. It renders volumetric 3D SVG apparatuses, shapes, and diagrams with dynamic, interactive property controls and canvas drawing.

## 2. Key Commands
```bash
# Install dependencies
npm install

# Run local development server (Port 3000)
npm run dev

# Run production build and type/syntax check
npm run build

# Run unit tests and regression suite
npm test

# Run build & syntax validation
npm run build
```

## 3. Core Architecture & Conventions

### Unified propSchema Definition
Every tool in `EDU_REGISTRY` (`app.js`) MUST define a `propSchema` array.
> **CRITICAL RULE**: The identifier field MUST be named `id` (e.g., `{ id: 'voltage', ... }`), **NEVER** `key`. Using `key` breaks UI generation in `showEduPropertyPanel` and reading in `commitPropertyChanges`.

Supported field types:
- `number`: `{ id: 'mass', type: 'number', label: 'الكتلة (kg)', min: 0.1, max: 100, step: 0.1, default: 1 }`
- `text`: `{ id: 'label', type: 'text', label: 'التسمية', default: 'محلول' }`
- `select`: `{ id: 'state', type: 'select', label: 'الحالة', options: [{ val: 'open', label: 'مفتوحة' }, { val: 'closed', label: 'مغلقة' }] }`
- `slider`: `{ id: 'amplitude', type: 'slider', label: 'السعة', min: 0, max: 100, step: 1, default: 25 }`
- `toggle` / `boolean`: `{ id: 'isOn', type: 'toggle', label: 'تشغيل', default: true }`
- `color`: `{ id: 'liquidColor', type: 'color', label: 'لون السائل', default: '#38bdf8' }`

### Property Panel Sync
1. `showEduPropertyPanel(el)` iterates over `def.propSchema` and renders inputs with class `.generic-prop-input` and attribute `data-prop-id="${field.id}"`.
2. `commitPropertyChanges()` reads `.generic-prop-input`, extracts `data-prop-id`, updates `el.dataset.eduProps`, and calls `renderSVG(newProps, w, h)`.
3. `renderSVG(props, w, h)` must reactively consume all `props` and re-render the corresponding visual attributes (values, colors, scales, states).

## 4. Strict Quality Standard (Playwright Diff Verification)
A tool is considered **DONE / COMPLETED** ONLY IF it passes a strict automated Playwright diff test:
1. Tool is spawned on canvas from toolbar button.
2. Property panel is opened via select tool.
3. An input value is programmatically changed (e.g. text input, slider, toggle).
4. `commitPropertyChanges()` triggers re-render.
5. The inner SVG markup **MUST show an actual character/attribute diff** comparing before and after values.
DOM presence alone is NOT sufficient.

## 5. Visual Standards (Soft Puffy 3D / Volumetric SVG)
- Use linear and radial gradients (`cx="35%" cy="30%" r="65%"`) for volumetric lighting.
- Include drop shadow filters (`feDropShadow`) and specular highlights (`opacity="0.6 - 0.8"`).
- All labels must support Arabic text (RTL) with high contrast.
- Ensure filter and gradient IDs inside SVGs are prefixed/isolated to prevent cross-element collisions on the whiteboard canvas.
