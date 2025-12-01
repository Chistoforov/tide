'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
          
          // Проверяем обновления каждые 60 секунд
          setInterval(() => {
            registration.update();
          }, 60000);

          // Обработчик обновления service worker
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Новый service worker установлен, перезагружаем страницу
                  window.location.reload();
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  return null;
}

// Функция для очистки кэша PWA
export async function clearPWACache(): Promise<void> {
  if (typeof window !== 'undefined' && 'caches' in window) {
    try {
      // Очищаем все кэши
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );

      // Отправляем сообщение service worker для очистки его кэшей (если он активен)
      const controller = navigator.serviceWorker.controller;
      if ('serviceWorker' in navigator && controller) {
        const messageChannel = new MessageChannel();
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            // Если нет ответа в течение 2 секунд, считаем успешным (кэши уже очищены)
            resolve();
          }, 2000);

          messageChannel.port1.onmessage = (event) => {
            clearTimeout(timeout);
            if (event.data.success) {
              resolve();
            } else {
              reject(new Error('Failed to clear cache'));
            }
          };
          
          controller.postMessage(
            { type: 'CLEAR_CACHE' },
            [messageChannel.port2]
          );
        });
      }
    } catch (error) {
      console.error('Error clearing PWA cache:', error);
      throw error;
    }
  }
}

// Функция для принудительного обновления service worker
export async function updateServiceWorker(): Promise<void> {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.update();
      
      // Если есть обновление, перезагружаем страницу
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating service worker:', error);
      throw error;
    }
  }
}


