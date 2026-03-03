
'use client';

import { useEffect } from 'react';

/**
 * Client component to handle Service Worker registration for PWA functionality.
 */
export function PWARegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
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

      // Register on mount
      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
      }
    }
  }, []);

  return null;
}
