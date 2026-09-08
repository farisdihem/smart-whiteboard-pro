import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, initializeFirestore, setLogLevel } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json' with { type: 'json' };

let fbApp = null;
export let firestoreDb = null;

try {
  setLogLevel('silent');
  fbApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const dbId = (firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)')
    ? firebaseConfig.firestoreDatabaseId
    : undefined;

  try {
    firestoreDb = initializeFirestore(fbApp, {
      experimentalForceLongPolling: true,
      ignoreUndefinedProperties: true
    }, dbId);
  } catch (initErr) {
    firestoreDb = dbId ? getFirestore(fbApp, dbId) : getFirestore(fbApp);
  }
} catch (e) {
  console.warn('Firebase module initialization warning:', e);
}
