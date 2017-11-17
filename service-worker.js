var cacheName = 'u4bi-pwa';
var filesToCache = [
  './index.html',
  './index.js',
  './style.css',
  './assets/logo.png'
];

self.addEventListener('install', function(e) {
    console.log('service worker install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate',  event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, {ignoreSearch:true}).then(response => {
            return response || fetch(event.request);
        })
    );
});
