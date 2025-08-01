import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { APP_CONFIG } from '../config/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: APP_CONFIG.FIREBASE_CONFIG.apiKey,
  authDomain: APP_CONFIG.FIREBASE_CONFIG.authDomain,
  projectId: APP_CONFIG.FIREBASE_CONFIG.projectId,
  storageBucket: APP_CONFIG.FIREBASE_CONFIG.storageBucket,
  messagingSenderId: APP_CONFIG.FIREBASE_CONFIG.messagingSenderId,
  appId: APP_CONFIG.FIREBASE_CONFIG.appId
};

// Initialize Firebase only if config is available
let app: any = null;
let db: any = null;

try {
  // Check if Firebase configuration is properly set
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('Firebase initialized successfully');
  } else {
    console.warn('Firebase configuration missing. Using fallback data only.');
    console.log('To enable Firebase, add your configuration to src/config/app.ts');
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  console.log('Falling back to static data');
}

export { db };
export default app;