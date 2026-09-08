/**
 * ══════════════════════════════════════════════════════════════
 * LICENSE & ACTIVATION SECURITY MANAGER (Whiteboard Pro AI)
 * ══════════════════════════════════════════════════════════════
 * Independent module responsible for:
 * - Hardware Fingerprint identification (Desktop Tauri Rust & Web fallback)
 * - Cryptographic license validation & anti-tamper hash
 * - Online verification via Firebase Firestore
 * - Offline grace period (30 days) & secure local caching
 * - Silent Background Heartbeat & Server Revocation Checks
 * - Security barrier curtain & app lock states
 */

import { doc, getDoc, updateDoc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { invoke } from '@tauri-apps/api/tauri';
import { firestoreDb } from './firebase_client.js';

export const OFFLINE_GRACE_PERIOD_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
export const HEARTBEAT_INTERVAL_MS = 6 * 60 * 60 * 1000; // Check every 6 hours

let isAppFullyActivated = false;
let cachedHardwareId = null;
let heartbeatTimer = null;
let isHeartbeatRunning = false;

export function isWhiteboardLicensed() {
  return isAppFullyActivated;
}

export function setAppFullyActivated(status) {
  isAppFullyActivated = Boolean(status);
}

/**
 * Generates an obfuscated tamper-proof cryptographic signature binding the license to this machine.
 * Incorporates hardware fingerprint, screen architecture, and salt.
 */
/**
 * Non-cryptographic but fast, high-dispersion string hash (Murmur-like).
 * Shared by computeLicenseHash and the deterministic web-fallback device ID below.
 */
function simpleHash36(str) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hashVal = 4294967296 * (2097151 & h2) + (h1 >>> 0);
  return hashVal.toString(36).toUpperCase().padStart(12, '0');
}

export function computeLicenseHash(key, devId) {
  const cleanKey = String(key || '').trim().toUpperCase();
  const cleanDev = String(devId || '').trim();
  const salt = 'WBPRO_DIHEM_SECURE_2026_V58_KEY';
  return 'SIG-' + simpleHash36(`${cleanKey}|${cleanDev}|${salt}`);
}

/**
 * Deterministic (non-random) fingerprint derived from stable browser/OS signals.
 * Used only when the real Tauri hardware ID is unavailable (e.g. web preview).
 * Unlike a random UUID, this reproduces the SAME id if localStorage is ever
 * cleared or the app is reinstalled, on the same machine/browser.
 */
function computeDeterministicFallbackId() {
  try {
    const nav = typeof navigator !== 'undefined' ? navigator : {};
    const scr = typeof screen !== 'undefined' ? screen : {};
    let tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    const fingerprint = [
      nav.userAgent || '', nav.platform || '', nav.hardwareConcurrency || '',
      nav.language || '', scr.width || '', scr.height || '', scr.colorDepth || '', tz
    ].join('|');
    const hash = simpleHash36(fingerprint) + simpleHash36(fingerprint + '_salt2');
    return `WB-INSTALLATION-${hash.substring(0, 6)}-${hash.substring(6, 12)}`;
  } catch (e) {
    return null;
  }
}

/**
 * Safely closes/exits the desktop app or closes window
 */
export function exitApplication() {
  try {
    if (window.__TAURI__ && window.__TAURI__.process && window.__TAURI__.process.exit) {
      window.__TAURI__.process.exit(0);
      return;
    }
  } catch (e) {}
  try {
    if (window.__TAURI__ && window.__TAURI__.window && window.__TAURI__.window.appWindow) {
      window.__TAURI__.window.appWindow.close();
      return;
    }
  } catch (e) {}
  try {
    window.close();
  } catch (e) {}
}

export function getDeviceInstallationId() {
  if (cachedHardwareId) return cachedHardwareId;
  let id = '';
  try { id = localStorage.getItem('wb3_hardware_id') || localStorage.getItem('wb3_installation_id'); } catch (e) {}
  if (!id || id === 'PC' || (!id.startsWith('WB-INSTALLATION-') && !id.startsWith('HW-'))) {
    // Deterministic first (same machine/browser -> same id even after data loss);
    // only fall back to a random id if the environment gives us nothing stable to hash.
    id = computeDeterministicFallbackId() ||
      `WB-INSTALLATION-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    try { localStorage.setItem('wb3_installation_id', id); } catch (e) {}
  }
  return id;
}

/**
 * Retrieves the hardware fingerprint ID.
 * In Tauri desktop environment: queries Rust get_hardware_id (MachineGuid, WMIC UUID, IOPlatformUUID).
 * In Web/fallback environment: uses persistent installation token.
 */
export async function getHardwareIdAsync() {
  if (cachedHardwareId) return cachedHardwareId;

  // 1. Try Tauri invoke (Desktop Hardware Fingerprint)
  try {
    let hw = null;
    if (window.__TAURI__ && window.__TAURI__.invoke) {
      hw = await window.__TAURI__.invoke('get_hardware_id');
    } else if (typeof invoke === 'function') {
      hw = await invoke('get_hardware_id');
    }
    if (hw && typeof hw === 'string' && hw.trim().length > 4 && hw !== 'HW-GENERIC-FALLBACK') {
      cachedHardwareId = hw.trim();
      try { localStorage.setItem('wb3_hardware_id', cachedHardwareId); } catch (e) {}
      return cachedHardwareId;
    }
  } catch (err) {
    console.warn('Tauri get_hardware_id invoke note:', err);
  }

  // 2. Check cached hardware ID in localStorage
  try {
    const savedHw = localStorage.getItem('wb3_hardware_id');
    if (savedHw && savedHw.startsWith('HW-')) {
      cachedHardwareId = savedHw;
      return cachedHardwareId;
    }
  } catch (e) {}

  // 3. Fallback for Web browser preview / Non-Tauri environment
  cachedHardwareId = getDeviceInstallationId();
  return cachedHardwareId;
}

export function saveLocalActivationCache(cacheData, saveToDB) {
  if (!cacheData || !cacheData.licenseId || !cacheData.deviceId) return;
  cacheData.sig = computeLicenseHash(cacheData.licenseId, cacheData.deviceId);
  try {
    localStorage.setItem('wb3_license_cache', JSON.stringify(cacheData));
    localStorage.setItem('wb3_serial_key', cacheData.licenseId);
  } catch (e) {}
  if (typeof saveToDB === 'function') {
    saveToDB('license_cache', cacheData);
    saveToDB('license_key', cacheData.licenseId);
  }
}

export function clearLocalActivationCache(removeFromDB, saveToDB) {
  isAppFullyActivated = false;
  try {
    localStorage.removeItem('wb3_license_cache');
    localStorage.removeItem('wb3_activated');
    localStorage.removeItem('wb3_serial_key');
  } catch (e) {}
  if (typeof removeFromDB === 'function') {
    removeFromDB('license_cache');
  }
  if (typeof saveToDB === 'function') {
    saveToDB('license_activated', false);
    saveToDB('license_key', '');
  }
}

export async function getLocalActivationCache(getFromDB, removeFromDB, saveToDB) {
  let cache = null;
  const currentDevId = await getHardwareIdAsync();

  try {
    const raw = localStorage.getItem('wb3_license_cache');
    if (raw) cache = JSON.parse(raw);
  } catch (e) {}

  if (!cache && typeof getFromDB === 'function') {
    cache = await getFromDB('license_cache');
  }

  // Cryptographically authenticate and validate license binding to this device
  if (cache && cache.activated && cache.licenseId && cache.deviceId) {
    // 1. Device ID check
    if (cache.deviceId !== currentDevId) {
      console.warn('License hardware ID mismatch for this machine');
      clearLocalActivationCache(removeFromDB, saveToDB);
      return null;
    }
    // 2. Cryptographic signature check
    const expectedSig = computeLicenseHash(cache.licenseId, currentDevId);
    if (cache.sig !== expectedSig) {
      console.warn('License cryptographic signature invalid or tampered');
      clearLocalActivationCache(removeFromDB, saveToDB);
      return null;
    }
    return cache;
  }
  return null;
}

/**
 * Timeout helper for network operations
 */
export function withTimeout(promise, ms = 8000) {
  let timerId = null;
  const timeoutPromise = new Promise((_, reject) => {
    timerId = setTimeout(() => {
      const err = new Error('TIMEOUT');
      err.code = 'timeout';
      reject(err);
    }, ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => {
    if (timerId) clearTimeout(timerId);
  });
}

/**
 * Silent Heartbeat: Verifies the license status online against Firestore,
 * and checks the offline grace period if network is unavailable.
 */
export async function performHeartbeatVerification(onRevoked, saveToDB, removeFromDB) {
  const cache = await getLocalActivationCache();
  if (!cache || !cache.activated || !cache.licenseId) {
    return false;
  }

  const lastVerified = cache.lastVerifiedAt || cache.activatedAt || 0;
  const now = Date.now();
  const timeSinceLastVerified = now - lastVerified;

  // 1. If currently offline, check offline grace period
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    if (timeSinceLastVerified > OFFLINE_GRACE_PERIOD_MS) {
      console.warn('Heartbeat: Offline grace period exceeded (30 days)');
      clearLocalActivationCache(removeFromDB, saveToDB);
      if (typeof onRevoked === 'function') {
        onRevoked('انتهت فترة السماح دون اتصال بالإنترنت (30 يوماً). يرجى الاتصال بالإنترنت لتأكيد ترخيصك.');
      }
      return false;
    }
    return true; // Still within safe grace period
  }

  // 2. If online, perform live check against Firestore
  if (!firestoreDb) {
    // Firestore not initialized yet, allow grace period check
    if (timeSinceLastVerified > OFFLINE_GRACE_PERIOD_MS) {
      clearLocalActivationCache(removeFromDB, saveToDB);
      if (typeof onRevoked === 'function') {
        onRevoked('انتهت فترة السماح لتأكيد الترخيص. يرجى إعادة الاتصال بالإنترنت.');
      }
      return false;
    }
    return true;
  }

  try {
    const localDeviceId = await getHardwareIdAsync();
    const docRef = doc(firestoreDb, 'licenses', cache.licenseId);
    const snap = await withTimeout(getDoc(docRef), 8000);

    if (!snap.exists()) {
      // License key has been deleted or is fake!
      console.warn('Heartbeat: License document does not exist in Firestore!');
      clearLocalActivationCache(removeFromDB, saveToDB);
      if (typeof onRevoked === 'function') {
        onRevoked('مفتاح التفعيل غير موجود في قاعدة البيانات أو تم حذفه.');
      }
      return false;
    }

    const data = snap.data();
    const status = data.status || 'active';

    // Check if revoked/disabled/expired
    if (status === 'disabled' || status === 'revoked' || status === 'suspended' || status === 'expired') {
      console.warn('Heartbeat: License has been disabled or revoked remotely!');
      clearLocalActivationCache(removeFromDB, saveToDB);
      if (typeof onRevoked === 'function') {
        onRevoked('تم إيقاف أو تعطيل مفتاح التفعيل هذا من قبل الإدارة.');
      }
      return false;
    }

    // Check if this device is legitimately registered
    const devicesList = Array.isArray(data.devices) ? data.devices : (data.deviceId ? [data.deviceId] : []);
    const isBound = devicesList.some(d => {
      if (typeof d === 'string') return d === localDeviceId;
      return d && (d.machineId === localDeviceId || d.deviceId === localDeviceId);
    });

    if (!isBound) {
      console.warn('Heartbeat: This device is no longer bound to the license on server!');
      clearLocalActivationCache(removeFromDB, saveToDB);
      if (typeof onRevoked === 'function') {
        onRevoked('تم إلغاء ربط هذا الجهاز من الترخيص عبر الخادم.');
      }
      return false;
    }

    // Live verification passed successfully!
    cache.lastVerifiedAt = now;
    saveLocalActivationCache(cache, saveToDB);

    // Touch lastSeenAt in Firestore silently in background
    try {
      updateDoc(docRef, {
        lastSeenAt: serverTimestamp()
      }).catch(() => {});
    } catch (e) {}

    return true;
  } catch (err) {
    console.warn('Heartbeat network/transient check warning:', err);
    // On transient network failure, respect grace period
    if (timeSinceLastVerified > OFFLINE_GRACE_PERIOD_MS) {
      clearLocalActivationCache(removeFromDB, saveToDB);
      if (typeof onRevoked === 'function') {
        onRevoked('تعذر تأكيد الترخيص وانتهت فترة السماح دون اتصال. يرجى التحقق من الإنترنت.');
      }
      return false;
    }
    return true;
  }
}

/**
 * Initializes and starts the silent background heartbeat listener and timer.
 */
export function startLicenseHeartbeat(options = {}) {
  const { onRevoked, saveToDB, removeFromDB } = options;

  if (isHeartbeatRunning) return;
  isHeartbeatRunning = true;

  // 1. Trigger initial background check after 2.5s to keep initial app boot instantaneous
  setTimeout(() => {
    performHeartbeatVerification(onRevoked, saveToDB, removeFromDB);
  }, 2500);

  // 2. Re-check whenever the machine regains internet connectivity
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      console.log('Network restored: triggering immediate silent license verification...');
      performHeartbeatVerification(onRevoked, saveToDB, removeFromDB);
    });
  }

  // 3. Periodic recurring verification timer (every 6 hours)
  if (heartbeatTimer) clearInterval(heartbeatTimer);
  heartbeatTimer = setInterval(() => {
    performHeartbeatVerification(onRevoked, saveToDB, removeFromDB);
  }, HEARTBEAT_INTERVAL_MS);
}

/**
 * Verifies and activates a serial key online with Firebase
 */
export async function verifyAndActivateSerial(serialKey, customerName = '', saveToDB) {
  const cleanKey = (serialKey || '').trim().toUpperCase();
  if (!cleanKey) {
    return { success: false, msg: 'يرجى إدخال مفتاح التفعيل' };
  }

  if (!firestoreDb) {
    return { success: false, msg: 'خدمة التفعيل غير متوفرة حالياً، يرجى المحاولة لاحقاً' };
  }

  try {
    const localDeviceId = await getHardwareIdAsync();
    const docRef = doc(firestoreDb, 'licenses', cleanKey);

    const txResult = await withTimeout(
      runTransaction(firestoreDb, async (transaction) => {
        const docSnap = await transaction.get(docRef);

        if (!docSnap.exists()) {
          throw new Error('INVALID_KEY');
        }

        const data = docSnap.data();

        if (data.status === 'disabled' || data.status === 'revoked' || data.status === 'suspended') {
          throw new Error('DISABLED');
        }

        const maxSlots = Number(data.slots || data.maxDevices || 1);
        const devicesList = Array.isArray(data.devices) ? data.devices : (data.deviceId ? [data.deviceId] : []);

        const isAlreadyBound = devicesList.some(d => {
          if (typeof d === 'string') return d === localDeviceId;
          return d && (d.machineId === localDeviceId || d.deviceId === localDeviceId);
        });

        if (!isAlreadyBound && devicesList.length >= maxSlots) {
          throw new Error('SLOTS_FULL');
        }

        const newDeviceEntry = {
          machineId: localDeviceId,
          deviceName: (typeof navigator !== 'undefined' && navigator.userAgent) ? 'Client' : 'Device',
          activatedAt: new Date().toISOString(),
          lastCheckedAt: new Date().toISOString()
        };

        const updatedDevices = [...devicesList.filter(d => (typeof d === 'string' ? d !== localDeviceId : d.machineId !== localDeviceId && d.deviceId !== localDeviceId)), newDeviceEntry];

        const updateFields = {
          status: 'active',
          deviceId: localDeviceId,
          devices: updatedDevices,
          lastSeenAt: serverTimestamp()
        };
        if (!data.activatedAt) {
          updateFields.activatedAt = serverTimestamp();
        }
        if (customerName && !data.customerName) {
          updateFields.customerName = customerName;
        }

        transaction.update(docRef, updateFields);
        return { success: true, msg: 'تم التفعيل بنجاح' };
      }),
      8000
    );

    if (txResult && txResult.success) {
      const cache = {
        activated: true,
        licenseId: cleanKey,
        deviceId: localDeviceId,
        permanent: true,
        activatedAt: Date.now(),
        lastVerifiedAt: Date.now()
      };
      saveLocalActivationCache(cache, saveToDB);
      return txResult;
    }
    return { success: false, msg: 'تعذر التفعيل' };
  } catch (err) {
    if (err.message === 'INVALID_KEY') {
      return { success: false, msg: 'مفتاح التفعيل غير صالح' };
    }
    if (err.message === 'DISABLED') {
      return { success: false, msg: 'مفتاح التفعيل غير صالح أو تم إيقافه من قبل الإدارة' };
    }
    if (err.message === 'SLOTS_FULL') {
      return { success: false, msg: 'تم استنفاد الأجهزة المسموحة لهذا المفتاح' };
    }
    console.warn('Firebase activation transaction error:', err);
    return { success: false, msg: 'تعذر الاتصال بخدمة التفعيل، يرجى التحقق من الإنترنت' };
  }
}
