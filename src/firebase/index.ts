'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

/**
 * Initializes the Firebase SDKs with high-fidelity production configuration.
 * Prioritizes explicit configuration to ensure the Studio Proxy connects correctly.
 */
export function initializeFirebase() {
  let app: FirebaseApp;

  if (!getApps().length) {
    // Force use of the explicit config for AFTER PATENT project
    try {
      app = initializeApp(firebaseConfig);
    } catch (e) {
      console.warn("Standard initialization failed, attempting fallback...", e);
      app = initializeApp();
    }
  } else {
    app = getApp();
  }

  return {
    firebaseApp: app,
    auth: getAuth(app),
    firestore: getFirestore(app)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
