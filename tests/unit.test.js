const assert = require('assert');

// 1. Version Parsing & Comparison Functions
function parseAppVersion(vStr) { 
  if (!vStr || typeof vStr !== 'string') return [0, 0, 0, 0]; 
  const parts = vStr.replace(/^[^\d]*/, '').split('.').map(n => parseInt(n, 10) || 0); 
  while (parts.length < 4) parts.push(0); 
  return parts.slice(0, 4); 
} 

function compareAppVersions(v1, v2) { 
  const p1 = parseAppVersion(v1); 
  const p2 = parseAppVersion(v2); 
  for (let i = 0; i < 4; i++) { 
    if (p1[i] > p2[i]) return 1; 
    if (p1[i] < p2[i]) return -1; 
  } 
  return 0; 
} 

// 2. Serial Key Sanitization
function sanitizeSerialKey(raw) {
  if (!raw || typeof raw !== 'string') return '';
  return raw.trim().toUpperCase().replace(/\s+/g, '');
}

// Tests
console.log('--- RUNNING UNIT TESTS ---');

// Test 1: Version Parsing
assert.deepStrictEqual(parseAppVersion('5.6.2.0'), [5, 6, 2, 0]);
assert.deepStrictEqual(parseAppVersion('v5.6.2'), [5, 6, 2, 0]);
assert.deepStrictEqual(parseAppVersion(''), [0, 0, 0, 0]);
assert.deepStrictEqual(parseAppVersion(null), [0, 0, 0, 0]);
console.log('✔ Test 1 Passed: parseAppVersion');

// Test 2: Version Comparison
assert.strictEqual(compareAppVersions('5.6.3.0', '5.6.2.0'), 1);
assert.strictEqual(compareAppVersions('5.6.2.0', '5.6.2.0'), 0);
assert.strictEqual(compareAppVersions('5.6.1.9', '5.6.2.0'), -1);
assert.strictEqual(compareAppVersions('6.0.0.0', '5.6.2.0'), 1);
console.log('✔ Test 2 Passed: compareAppVersions');

// Test 3: Key Sanitization
assert.strictEqual(sanitizeSerialKey('  wbpro-1234-abcd-5678  '), 'WBPRO-1234-ABCD-5678');
assert.strictEqual(sanitizeSerialKey('wbpro 1234 abcd 5678'), 'WBPRO1234ABCD5678');
assert.strictEqual(sanitizeSerialKey(null), '');
console.log('✔ Test 3 Passed: sanitizeSerialKey');

console.log('ALL UNIT TESTS PASSED SUCCESSFULLY 🎉');
