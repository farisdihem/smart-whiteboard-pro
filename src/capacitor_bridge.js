/**
 * ══════════════════════════════════════════════════════════════
 * CAPACITOR NATIVE BRIDGE (Android wrapper compatibility layer)
 * ══════════════════════════════════════════════════════════════
 * Whiteboard Pro AI runs unmodified as a normal web app on desktop
 * (Tauri) and in the browser. When packaged for Android via
 * Capacitor, a handful of browser behaviors don't work the same way
 * inside a WebView — most importantly, clicking an <a download> link
 * (used for PNG/PDF/video export) does not reliably save a file on
 * Android's scoped storage. This module detects the native runtime
 * and provides a save/share path that actually works on-device,
 * while staying a complete no-op everywhere else (desktop/web/Tauri
 * keep using the original <a download> flow untouched).
 */

let capacitorCore = null;
let capacitorFs = null;
let capacitorShare = null;
let capacitorApp = null;
let capacitorSplash = null;

function isNativePlatform() {
  try {
    return Boolean(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  } catch (e) {
    return false;
  }
}

/**
 * Lazily loads the Capacitor plugin modules. They are only imported when
 * actually running inside the native Android shell so desktop/web builds
 * never pay for (or bundle-depend on) native-only code paths at runtime.
 */
async function loadNativeModules() {
  if (!isNativePlatform()) return false;
  if (capacitorFs && capacitorShare) return true;
  try {
    const [core, fs, share] = await Promise.all([
      import('@capacitor/core'),
      import('@capacitor/filesystem'),
      import('@capacitor/share')
    ]);
    capacitorCore = core;
    capacitorFs = fs;
    capacitorShare = share;
    return true;
  } catch (e) {
    console.warn('Capacitor native modules unavailable:', e);
    return false;
  }
}

function base64FromDataUrl(dataUrl) {
  const idx = dataUrl.indexOf(',');
  return idx >= 0 ? dataUrl.substring(idx + 1) : dataUrl;
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(base64FromDataUrl(String(reader.result)));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Saves a data: URL (PNG image, PDF, or recorded video) to the app's cache
 * directory then opens the native Share sheet so the teacher can store it
 * in Files/Drive/WhatsApp/etc. or "Save to device". Returns true if the
 * native path handled the export; false means the caller should fall back
 * to the regular <a download> click.
 */
export async function saveOrShareDataUrl(dataUrl, filename, dialogTitle) {
  const ready = await loadNativeModules();
  if (!ready) return false;

  try {
    const { Filesystem, Directory } = capacitorFs;
    const { Share } = capacitorShare;
    const base64Data = base64FromDataUrl(dataUrl);

    const writeResult = await Filesystem.writeFile({
      path: filename,
      data: base64Data,
      directory: Directory.Cache,
      recursive: true
    });

    await Share.share({
      title: dialogTitle || filename,
      url: writeResult.uri,
      dialogTitle: dialogTitle || 'حفظ / مشاركة الملف'
    });
    return true;
  } catch (e) {
    console.warn('Native save/share failed, no fallback triggered:', e);
    return true; // Avoid double-triggering a web download after a native failure/cancel.
  }
}

/**
 * Same as saveOrShareDataUrl but takes a Blob directly (used for recorded
 * lesson videos, which are produced as a MediaRecorder Blob rather than a
 * data: URL). Returns true if the native path handled the export.
 */
export async function saveOrShareBlob(blob, filename, dialogTitle) {
  const ready = await loadNativeModules();
  if (!ready) return false;

  try {
    const { Filesystem, Directory } = capacitorFs;
    const { Share } = capacitorShare;
    const base64Data = await blobToBase64(blob);

    const writeResult = await Filesystem.writeFile({
      path: filename,
      data: base64Data,
      directory: Directory.Cache,
      recursive: true
    });

    await Share.share({
      title: dialogTitle || filename,
      url: writeResult.uri,
      dialogTitle: dialogTitle || 'حفظ / مشاركة الملف'
    });
    return true;
  } catch (e) {
    console.warn('Native save/share failed, no fallback triggered:', e);
    return true;
  }
}

/**
 * Keeps the Android status bar color in sync with the app's light/dark
 * theme so the native chrome never looks mismatched against the canvas.
 * Safe to call on every theme toggle; it is a no-op outside native Android.
 */
export async function syncNativeStatusBar(theme) {
  if (!isNativePlatform()) return;
  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    const isDark = theme === 'dark';
    await StatusBar.setBackgroundColor({ color: isDark ? '#0f172a' : '#ffffff' });
    await StatusBar.setStyle({ style: isDark ? Style.Dark : Style.Light });
  } catch (e) {
    console.warn('StatusBar sync warning:', e);
  }
}

/**
 * Initializes native-only chrome: hides the splash screen once the app is
 * interactive, and maps the Android hardware back button to closing any
 * open dropdown/panel first, exiting the app otherwise (the SPA has no
 * client-side router/history to "go back" through).
 */
export async function initNativeShell(currentTheme) {
  if (!isNativePlatform()) return;

  try {
    const [{ SplashScreen }, { App }] = await Promise.all([
      import('@capacitor/splash-screen'),
      import('@capacitor/app')
    ]);
    capacitorSplash = SplashScreen;
    capacitorApp = App;

    syncNativeStatusBar(currentTheme || 'light');

    setTimeout(() => {
      try { SplashScreen.hide(); } catch (e) {}
    }, 300);

    App.addListener('backButton', ({ canGoBack }) => {
      const openPanel = document.querySelector(
        '#context-menu:not(.hidden), .dropdown-menu:not(.hidden), #eduPropertyPanel:not(.hidden), [id$="-dropdown"]:not(.hidden)'
      );
      if (openPanel) {
        openPanel.classList.add('hidden');
        return;
      }
      if (canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });
  } catch (e) {
    console.warn('Native shell init warning:', e);
  }
}

export { isNativePlatform };
