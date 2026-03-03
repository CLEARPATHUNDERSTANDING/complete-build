'use client';

import { useEffect } from 'react';

/**
 * Client component to handle Service Worker registration for PWA functionality.
 */
export function PWARegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
      const handleLoad = () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('SW registered:', registration.scope);
          },
          (err) => {
            console.error('SW registration failed:', err);
          }
        );
      };

      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return null;
}
