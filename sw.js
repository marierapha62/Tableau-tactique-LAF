const CACHE_NAME = 'tactique-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo-192.png',
  './logo-512.png'
];

// Installation et mise en cache des fichiers pour le mode hors-ligne
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Lecture des fichiers depuis le cache pour une vitesse maximale
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});