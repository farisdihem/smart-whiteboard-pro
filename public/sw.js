const CACHE = "whiteboard-cache-v2";
const offlineFallbackPage = "index.html";

self.addEventListener("install", function (event) {
  console.log("[PWA Builder] Install Event processing");
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.log("[PWA Builder] Cached offline page during install");
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/app.js',
        '/manifest.json',
        '/icon-192.png',
        '/icon-512.png'
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(function (error) {
      console.log("[PWA Builder] Network request Failed. Serving offline page " + error);
      return caches.open(CACHE).then(function (cache) {
        return cache.match(event.request).then(function (matching) {
          if (!matching || matching.status === 404) {
            return cache.match(offlineFallbackPage);
          }
          return matching;
        });
      });
    })
  );
});
