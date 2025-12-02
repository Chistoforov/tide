// Service Worker для PWA
const CACHE_NAME = 'tide-tracker-v4'; // Обновлено: network-first стратегия для HTML
const urlsToCache = [
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  // Принудительно активируем новый service worker
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Удаляем все старые кэши
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Берем контроль над всеми страницами
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // НЕ кэшируем API запросы - всегда делаем свежий запрос
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // Для HTML страниц используем network-first стратегию (сначала сеть, потом кэш)
  // Это гарантирует, что пользователь всегда получает актуальную версию
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept')?.includes('text/html'))) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Если запрос успешен, обновляем кэш
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Если сеть недоступна, используем кэш
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Для остальных статических ресурсов используем cache-first
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        // Кэшируем успешные ответы
        if (fetchResponse.ok) {
          const responseClone = fetchResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return fetchResponse;
      });
    })
  );
});

// Обработчик сообщений для очистки кэша и принудительного обновления
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        // Отправляем подтверждение обратно
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ success: true });
        }
      })
    );
  }
  
  // Обработка принудительного обновления
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});


