// Service Worker for caching alumni images from Cloudinary
const CACHE_NAME = 'mais-alumni-images-v1';
const CACHE_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

// URLs to cache (will be updated when we migrate to Cloudinary)
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com';
const LOCAL_ALUMNI_PATTERNS = [
  '/alumni/webp/',
  '/alumni/jpg/',
  '/news/'
];

// Install event - setup cache
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker for alumni image caching');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Cache opened:', CACHE_NAME);
      // Cache will be populated on-demand as images are requested
      return Promise.resolve();
    })
  );
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old versions of our cache
          if (cacheName.startsWith('mais-alumni-images-') && cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Function to check if request should be cached
function shouldCacheRequest(request) {
  const url = new URL(request.url);
  
  // Cache Cloudinary images
  if (url.hostname.includes('cloudinary.com')) {
    return true;
  }
  
  // Cache local alumni and news images
  return LOCAL_ALUMNI_PATTERNS.some(pattern => 
    url.pathname.includes(pattern) && 
    (url.pathname.endsWith('.jpg') || 
     url.pathname.endsWith('.webp') || 
     url.pathname.endsWith('.png'))
  );
}

// Function to check if cached response is still fresh
function isCacheFresh(response) {
  if (!response) return false;
  
  const cachedTime = response.headers.get('sw-cached-time');
  if (!cachedTime) return false;
  
  const now = Date.now();
  const cacheAge = now - parseInt(cachedTime);
  
  return cacheAge < CACHE_EXPIRY;
}

// Function to add cache timestamp to response
function addCacheTimestamp(response) {
  const responseClone = response.clone();
  const headers = new Headers(responseClone.headers);
  headers.set('sw-cached-time', Date.now().toString());
  
  return new Response(responseClone.body, {
    status: responseClone.status,
    statusText: responseClone.statusText,
    headers: headers
  });
}

// Fetch event - implement cache-first strategy for images
self.addEventListener('fetch', (event) => {
  // Only handle GET requests for images
  if (event.request.method !== 'GET' || !shouldCacheRequest(event.request)) {
    return;
  }
  
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        
        // If we have a fresh cached response, return it
        if (cachedResponse && isCacheFresh(cachedResponse)) {
          console.log('[SW] Serving from cache:', event.request.url);
          return cachedResponse;
        }
        
        // Otherwise, fetch from network
        console.log('[SW] Fetching from network:', event.request.url);
        return fetch(event.request).then((networkResponse) => {
          
          // Only cache successful responses
          if (networkResponse.status === 200) {
            // Add timestamp and cache the response
            const responseToCache = addCacheTimestamp(networkResponse);
            cache.put(event.request, responseToCache.clone());
            console.log('[SW] Cached new image:', event.request.url);
          }
          
          return networkResponse;
          
        }).catch((error) => {
          console.log('[SW] Network fetch failed:', event.request.url, error);
          
          // Return stale cache if network fails
          if (cachedResponse) {
            console.log('[SW] Serving stale cache due to network error:', event.request.url);
            return cachedResponse;
          }
          
          // If no cache and network failed, throw error
          throw error;
        });
      });
    })
  );
});

// Handle cache management messages from main thread
self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'CLEAR_CACHE':
      event.waitUntil(
        caches.delete(CACHE_NAME).then(() => {
          console.log('[SW] Cache cleared');
          event.ports[0].postMessage({ success: true });
        })
      );
      break;
      
    case 'GET_CACHE_INFO':
      event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
          return cache.keys();
        }).then((keys) => {
          event.ports[0].postMessage({ 
            cacheSize: keys.length,
            cacheName: CACHE_NAME
          });
        })
      );
      break;
      
    case 'PRELOAD_IMAGES':
      if (data.urls) {
        event.waitUntil(
          caches.open(CACHE_NAME).then((cache) => {
            const promises = data.urls.map((url) => {
              return fetch(url).then((response) => {
                if (response.status === 200) {
                  const responseToCache = addCacheTimestamp(response);
                  return cache.put(url, responseToCache);
                }
              }).catch((error) => {
                console.log('[SW] Preload failed for:', url, error);
              });
            });
            return Promise.all(promises);
          }).then(() => {
            console.log('[SW] Preloaded', data.urls.length, 'images');
            event.ports[0].postMessage({ success: true });
          })
        );
      }
      break;
  }
});
