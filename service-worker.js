self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("ronda-cache").then((cache) =>
      cache.addAll([
        "/",
        "/index.html",
        "/js/vue.js",
        "/js/main.js",
        "/css/bootstrap.css",
        "/css/main.css",
        "/icons/icon-192.png"
      ])
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
