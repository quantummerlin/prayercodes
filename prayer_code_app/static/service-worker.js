// Prayer Codes Service Worker

const CACHE_NAME = 'prayer-codes-v2';
const urlsToCache = [
  '/',
  '/how-it-works',
  '/scripture',
  '/amplify',
  '/static/css/style.css',
  '/static/images/prayer-icon.svg',
  '/static/images/prayer-icon.png',
  '/static/images/stars.png',
  '/static/images/twinkling.png',
  '/static/audio/creation-frequency.wav',
  '/static/icons/copy.svg',
  '/static/icons/facebook.svg',
  '/static/icons/twitter.svg'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});