const CACHE_NAME = 'seniorease-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/demo/',
  '/demo/index.html',
  '/demo/style.css',
  '/demo/app-zxing.js',
  '/demo/lib/jspdf.umd.min.js',
  '/demo/lib/zxing.min.js',
  '/demo/manifest.webmanifest',
  '/privacy.html',
  '/hulp.html',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/screenshots/Screenshot_1.png',
  '/screenshots/Screenshot_2.png',
  '/screenshots/Screenshot_3.png',
  '/screenshots/Screenshot_4.png',
  '/screenshots/Screenshot_5.png'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache geopend');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Oude cache verwijderd:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(function() {
        if (event.request.url.includes('/demo')) {
          return caches.match('/demo/index.html');
        }
        return caches.match('/index.html');
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request).then(function(networkResponse) {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          var responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });

          return networkResponse;
        });
      })
  );
});
