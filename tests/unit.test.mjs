/**
 * Whiteboard Pro AI — Unit & Regression Test Suite
 * Validates canvas engine, tools manager, license system, and 3D shapes.
 */

import assert from 'node:assert/strict';
import {
  projectPointToSegment,
  projectPointToArc,
  rotatePoint,
  calculateDistance,
  calculateAngle,
  getSelHandles,
  checkHandleHit
} from '../src/canvas-engine.js';

import {
  WHITEBOARD_TOOLS,
  PRESET_COLORS,
  PRESET_STROKE_WIDTHS,
  getCursorForTool,
  ToolsManager
} from '../src/tools-manager.js';

import {
  computeLicenseHash,
  OFFLINE_GRACE_PERIOD_MS,
  HEARTBEAT_INTERVAL_MS
} from '../src/license_manager.js';

import {
  SHAPES_3D_METADATA
} from '../data/shapes3d_engine.js';

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}:`, err.message);
    failed++;
  }
}

console.log('=== [1] Testing Canvas Engine Mathematics ===');

test('projectPointToSegment projects orthogonally onto line', () => {
  const proj = projectPointToSegment(50, 20, 0, 0, 100, 0);
  assert.equal(proj.x, 50);
  assert.equal(proj.y, 0);
});

test('projectPointToSegment clamps to endpoints', () => {
  const projLeft = projectPointToSegment(-20, 10, 0, 0, 100, 0);
  assert.equal(projLeft.x, 0);
  assert.equal(projLeft.y, 0);

  const projRight = projectPointToSegment(150, 10, 0, 0, 100, 0);
  assert.equal(projRight.x, 100);
  assert.equal(projRight.y, 0);
});

test('calculateDistance and calculateAngle computation', () => {
  const d = calculateDistance({ x: 0, y: 0 }, { x: 30, y: 40 });
  assert.equal(d, 50);

  const angle = calculateAngle({ x: 0, y: 0 }, { x: 10, y: 0 });
  assert.equal(angle, 0);
});

test('rotatePoint rotates 90 degrees around origin', () => {
  const rotated = rotatePoint(10, 0, 0, 0, Math.PI / 2);
  assert.ok(Math.abs(rotated.x) < 1e-6);
  assert.ok(Math.abs(rotated.y - 10) < 1e-6);
});

test('Selection gizmo handles calculation', () => {
  const s = { x: 10, y: 20, w: 100, h: 200, img: {} };
  const handles = getSelHandles(s);
  assert.equal(handles.length, 4);
  assert.equal(handles[0].name, 'tl');
  assert.equal(handles[0].x, 10);
  assert.equal(handles[0].y, 20);
  assert.equal(handles[3].name, 'br');
  assert.equal(handles[3].x, 110);
  assert.equal(handles[3].y, 220);

  const hit = checkHandleHit(11, 21, s, 14);
  assert.equal(hit, 'tl');

  const miss = checkHandleHit(500, 500, s, 14);
  assert.equal(miss, null);
});

console.log('\n=== [2] Testing Tools Manager State & Presets ===');

test('Whiteboard tools registry contains core tools', () => {
  assert.ok(WHITEBOARD_TOOLS.pen);
  assert.ok(WHITEBOARD_TOOLS.eraser);
  assert.ok(WHITEBOARD_TOOLS.select);
  assert.ok(WHITEBOARD_TOOLS.pan);
  assert.ok(WHITEBOARD_TOOLS.line);
  assert.ok(WHITEBOARD_TOOLS.arrow);
  assert.ok(WHITEBOARD_TOOLS.circle);
  assert.ok(WHITEBOARD_TOOLS.triangle);
});

test('Cursor mapping reflects active tool', () => {
  assert.equal(getCursorForTool('pan', {}), 'grab');
  assert.equal(getCursorForTool('pan', { isPanning: true }), 'grabbing');
  assert.equal(getCursorForTool('select', {}), 'default');
  assert.equal(getCursorForTool('select', { handleHover: true }), 'move');
  assert.equal(getCursorForTool('eraser', {}), 'none');
  assert.equal(getCursorForTool('pen', {}), 'crosshair');
});

test('ToolsManager manages tool switching and stroke limits', () => {
  const tm = new ToolsManager({ tool: 'pen', strokeWidth: 3, eraserWidth: 28 });
  assert.equal(tm.getTool(), 'pen');

  let notified = false;
  tm.subscribe((evt) => {
    if (evt.type === 'tool') notified = true;
  });

  tm.setTool('brush');
  assert.equal(tm.getTool(), 'brush');
  assert.ok(notified);

  tm.setStrokeWidth(12);
  assert.equal(tm.getCurrentWidth(), 12);

  // Switch to eraser and set eraser-specific width
  tm.setTool('eraser');
  tm.setStrokeWidth(50);
  assert.equal(tm.getCurrentWidth(), 50);

  // Switch back to brush and verify pen stroke width is preserved
  tm.setTool('brush');
  assert.equal(tm.getCurrentWidth(), 12);
});

console.log('\n=== [3] Testing License & Security Constants ===');

test('License constants are strictly configured', () => {
  assert.equal(HEARTBEAT_INTERVAL_MS, 6 * 60 * 60 * 1000);
  assert.ok(OFFLINE_GRACE_PERIOD_MS >= 7 * 24 * 60 * 60 * 1000); // at least 7 days
});

test('computeLicenseHash produces deterministic hash with device fingerprint', () => {
  const key = 'WB-1234-5678-ABCD';
  const hw = 'HW-TEST-MACHINE-ID-999';
  const hash1 = computeLicenseHash(key, hw);
  const hash2 = computeLicenseHash(key, hw);
  assert.equal(typeof hash1, 'string');
  assert.ok(hash1.length > 10);
  assert.equal(hash1, hash2);

  const hashOtherHw = computeLicenseHash(key, 'OTHER-DEVICE');
  assert.notEqual(hash1, hashOtherHw);
});

console.log('\n=== [4] Testing 3D Shapes Metadata ===');

test('3D shapes engine contains required volumetric shapes', () => {
  assert.ok(SHAPES_3D_METADATA['shapes3d.cube']);
  assert.ok(SHAPES_3D_METADATA['shapes3d.cylinder']);
  assert.ok(SHAPES_3D_METADATA['shapes3d.sphere']);
  assert.ok(SHAPES_3D_METADATA['shapes3d.cone']);

  const cube = SHAPES_3D_METADATA['shapes3d.cube'];
  assert.ok(cube.nameAr);
  assert.ok(cube.defaultProps);
  assert.ok(cube.defaultProps.yaw !== undefined);
  assert.ok(cube.defaultProps.pitch !== undefined);
});

console.log(`\n========================================`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log(`========================================`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('All tests passed cleanly!\n');
}
