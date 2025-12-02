'use client';

import React, { useState, useEffect } from 'react';
import { TideStatusCard } from '@/components/TideStatusCard';
import { DogCharacter } from '@/components/DogCharacter';
import { clearPWACache, updateServiceWorker } from '@/lib/pwa-utils';
import type { TideData } from '@/types/tide';

export default function Home() {
  const [tideState, setTideState] = useState<TideData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTideData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Загружаем данные из БД/кэша (НЕ вызывает внешний API Stormglass)
      // Внешний API вызывается ТОЛЬКО по крону через /api/tide/update
      console.log('[Client] Fetching tide data from /api/tide...');
      const response = await fetch('/api/tide', {
        cache: 'no-store', // Отключаем кэш браузера
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      console.log('[Client] Response status:', response.status, response.statusText);
      console.log('[Client] Response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[Client] API returned error:', errorData);
        throw new Error(errorData.error || 'Failed to fetch tide data');
      }

      const data: TideData = await response.json();
      console.log('[Client] Received data:', {
        hasData: !!data,
        currentState: data?.currentState,
        hasNextExtreme: !!data?.nextExtreme,
        error: (data as any)?.error,
      });

      // Проверяем, не вернул ли API ошибку в теле ответа (даже при статусе 200)
      if ((data as any)?.error) {
        console.error('[Client] Error in response body:', (data as any).error);
        throw new Error((data as any).error);
      }

      setTideState(data);
      console.log('[Client] Tide state updated successfully');
    } catch (err) {
      console.error('[Client] Error fetching tide data:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Не удалось загрузить данные о приливах'
      );
    } finally {
      setLoading(false);
    }
  };

  // Загружаем данные при монтировании (читаем из БД/кэша, НЕ вызываем внешний API)
  useEffect(() => {
    fetchTideData();
  }, []);

  // Обработчик для кнопки обновления (перечитывает из БД/кэша, НЕ вызывает внешний API)
  const handleRefresh = () => {
    fetchTideData();
  };

  // Обработчик для сброса кэша PWA
  const handleClearCache = async () => {
    try {
      await clearPWACache();
      await updateServiceWorker();
      // Перезагружаем страницу после очистки кэша
      window.location.reload();
    } catch (err) {
      console.error('Error clearing cache:', err);
      alert('Ошибка при очистке кэша. Попробуйте перезагрузить страницу вручную.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-yellow-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-yellow-200 rounded-full opacity-40 blur-3xl"></div>
      </div>

      <div className="max-w-6xl w-full z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">

        {/* Left Side: Title, Location, and Dog Character */}
        <div className="flex flex-col items-center">
          <div className="mb-4 md:mb-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white volumetric-text drop-shadow-lg mb-2">
              Tide Tracker
            </h1>
            <div className="bg-white bg-opacity-30 rounded-full px-6 py-2 backdrop-blur-sm inline-block">
              <p className="text-sky-900 font-bold text-lg">
                📍 Carcavelos Beach
              </p>
            </div>
          </div>
          {/* Dog Character */}
          {loading && !tideState && !error ? (
            <div className="flex flex-col items-center space-y-4">
              <DogCharacter tideData={null} />
              <p className="text-white text-xl font-bold drop-shadow-lg">Ищем собачку...</p>
            </div>
          ) : (
            <DogCharacter tideData={tideState} />
          )}
        </div>

        {/* Right Side: Status Card */}
        <div className="w-full max-w-md">
          {loading && !tideState && !error ? (
            <div className="bg-white bg-opacity-40 text-sky-900 rounded-[2rem] shadow-xl p-8 md:p-12 w-full mx-auto volumetric-card border-4 border-white">
              <div className="flex flex-col items-center space-y-6">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-500"></div>
                <p className="text-xl font-bold">Загрузка данных...</p>
              </div>
            </div>
          ) : (
            <TideStatusCard
              tideState={tideState}
              onRefresh={handleRefresh}
              onClearCache={handleClearCache}
              loading={loading}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
}


