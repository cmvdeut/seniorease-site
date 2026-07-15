/* Minimal service worker — required for Chrome "Add to Home screen" / install. */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Network-first: do not cache pages (site content stays up to date).
  event.respondWith(fetch(event.request));
});
