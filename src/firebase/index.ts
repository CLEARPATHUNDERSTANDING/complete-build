'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

/**
 * Initializes the Firebase SDKs with robust environment fallback.
 * Prioritizes explicit configuration in development/Studio environments.
 */
export function initializeFirebase() {
  if (!getApps().length) {
    let firebaseApp;
    try {
      // In development or if explicitly configured, use the provided config object.
      // This is the most reliable way to ensure the Studio Proxy connects to your project.
      firebaseApp = initializeApp(firebaseConfig);
    } catch (e) {
      // Robust fallback for production hosting environments
      firebaseApp = initializeApp();
    }

    return getSdks(firebaseApp);
  }

  // If already initialized, return the SDKs with the already initialized App instance
  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
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
