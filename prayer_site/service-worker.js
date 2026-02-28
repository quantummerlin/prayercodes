// Prayer Codes PWA Service Worker v2.0
// Optimised for offline-first with network-first for HTML

const CACHE_NAME = 'prayer-codes-v4';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/404.html',
  '/css/style.css',
  '/js/app.js',
  '/manifest.json',
  '/images/nebula-bg.jpeg',
  '/images/stars.png',
  '/images/twinkling.png',
  '/images/sacred-geometry.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Audio cached on demand (large file)
const LAZY_CACHE = [
  '/audio/creation-frequency.mp3'
];

// Install: pre-cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: stale-while-revalidate for most assets, cache-first for images/audio
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;

  // HTML pages: network-first (so updates are immediate)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Audio files: cache-first (large, rarely changes)
  if (url.pathname.match(/\.(mp3|wav|ogg)$/)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Images: cache-first
  if (url.pathname.match(/\.(png|jpg|jpeg|svg|webp|gif)$/)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // CSS/JS: stale-while-revalidate
  if (url.pathname.match(/\.(css|js)$/)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Everything else: network-first
  event.respondWith(networkFirst(request));
});

// Strategy: Cache-first (for images, audio)
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

// Strategy: Network-first (for HTML)
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return offlinePage();
  }
}

// Strategy: Stale-while-revalidate (for CSS/JS)
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const networkFetch = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);

  return cached || await networkFetch || new Response('Offline', { status: 503 });
}

// Minimal offline page
function offlinePage() {
  return new Response(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Prayer Codes — Offline</title>
      <style>
        body {
          font-family: 'Cinzel', Georgia, serif;
          background: #050210;
          color: #D4AF37;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
          padding: 2rem;
        }
        h1 { font-size: 1.5rem; margin-bottom: 1rem; }
        p { color: #9080B0; font-family: 'Lato', sans-serif; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div>
        <h1>Prayer Codes</h1>
        <p>You are currently offline.<br>Please reconnect to continue your prayer journey.</p>
        <p style="margin-top: 1.5rem; font-style: italic; color: #D4AF37;">
          "Be still, and know that I am God." — Psalm 46:10
        </p>
      </div>
    </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' },
    status: 200
  });
}
