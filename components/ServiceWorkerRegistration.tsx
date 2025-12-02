'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
          
          // Проверяем обновления при загрузке страницы
          registration.update();
          
          // Проверяем обновления каждые 5 минут
          setInterval(() => {
            registration.update();
          }, 5 * 60 * 1000);

          // Обработчик обновления service worker
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // Новый service worker установлен, перезагружаем страницу
                    console.log('New service worker installed, reloading...');
                    window.location.reload();
                  } else {
                    // Первая установка
                    console.log('Service worker installed for the first time');
                  }
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


