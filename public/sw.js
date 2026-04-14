/* GovCompass service worker.
 *
 * Strategy:
 *   - Precache a small app shell (home, offline fallback, favicon, manifest)
 *   - Navigations (HTML pages): network-first, fall back to cache, then
 *     fall back to /offline.html if neither is available
 *   - Same-origin static assets (/_astro, /fonts, images, icons): cache-first
 *   - Everything else (GA4, cross-origin): passthrough (network only)
 *
 * Bump CACHE_VERSION on any change to this file or the precache list.
 * The "new version available" banner in BaseLayout handles the update flow.
 */

const CACHE_VERSION = "v1";
const STATIC_CACHE = `govcompass-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `govcompass-runtime-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "/",
  "/offline.html",
  "/favicon.svg",
  "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== STATIC_CACHE && k !== RUNTIME_CACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_astro/") ||
    url.pathname.startsWith("/fonts/") ||
    url.pathname.startsWith("/images/") ||
    url.pathname.startsWith("/og/") ||
    url.pathname === "/favicon.svg" ||
    url.pathname === "/apple-touch-icon.png" ||
    url.pathname === "/icon-192.png" ||
    url.pathname === "/icon-512.png" ||
    url.pathname === "/manifest.webmanifest"
  );
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Only handle same-origin requests; let cross-origin (GA4, fonts, etc.) pass through.
  if (url.origin !== self.location.origin) return;

  // Never intercept the admin area or the service worker itself.
  if (url.pathname.startsWith("/admin") || url.pathname === "/sw.js") return;

  // Navigations: network-first, cache fallback, offline fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match("/offline.html")),
        ),
    );
    return;
  }

  // Static assets: cache-first.
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
            }
            return response;
          }),
      ),
    );
  }
});
