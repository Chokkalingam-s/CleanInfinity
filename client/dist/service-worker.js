const CACHE_NAME = "dynamic-cache";
const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000;
const CLEANUP_INTERVAL = 30 * 60 * 1000;

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(() => {
      console.log("Service worker installed and cache opened.");
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    cleanupOldCaches(),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        const cachedTime = cachedResponse.headers.get("sw-cache-time");
        if (cachedTime && Date.now() - cachedTime > CACHE_EXPIRY_TIME) {
          return fetchAndUpdateCache(event.request);
        }
        return cachedResponse;
      }
      return fetchAndUpdateCache(event.request);
    }),
  );
});

async function fetchAndUpdateCache(request) {
  try {
    const response = await fetch(request);
    const clonedResponse = response.clone();

    const cache = await caches.open(CACHE_NAME);
    cache.put(request, clonedResponse);
    const headers = new Headers(response.headers);
    headers.set("sw-cache-time", Date.now().toString());
    const cachedResponseWithTime = new Response(response.body, { headers });

    return cachedResponseWithTime;
  } catch (error) {
    console.log("Error fetching and updating cache:", error);
    return caches.match(request);
  }
}

async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  cacheNames.forEach(async (cacheName) => {
    if (cacheName !== CACHE_NAME) {
      await caches.delete(cacheName);
      console.log(`Deleted old cache: ${cacheName}`);
    }
  });
}

setInterval(() => {
  cleanupOldCaches();
}, CLEANUP_INTERVAL);
