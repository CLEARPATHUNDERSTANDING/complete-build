/**
 * InsightFlow Core Service Worker
 * Handles basic caching for offline stability and "App-like" performance.
 */

const CACHE_NAME = 'insightflow-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.webmanifest',
  'https://public.codepenassets.com/css/normalize-5.0.0.min.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Use a Cache-First strategy for static assets, Network-First for others
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        // Fallback for failed fetches (offline)
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      });
    })
  );
});
