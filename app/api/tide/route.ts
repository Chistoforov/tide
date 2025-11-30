import { NextRequest, NextResponse } from 'next/server';
import { fetchTideData } from '@/lib/stormglass-api';
import { transformTideData } from '@/lib/tide-utils';
import { getCachedTideData, saveTideDataToCache } from '@/lib/tide-cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

    // Если не принудительное обновление, пытаемся получить данные из кеша
    if (!force) {
      const cachedData = await getCachedTideData();
      if (cachedData) {
        return NextResponse.json(cachedData);
      }
    }

    // Если кеша нет или принудительное обновление, делаем запрос к API
    const apiKey = process.env.STORMGLASS_API_KEY;
    const lat = parseFloat(process.env.BEACH_LATITUDE || '38.6978');
    const lng = parseFloat(process.env.BEACH_LONGITUDE || '-9.4203');

    if (!apiKey || apiKey === 'your_api_key_here') {
      return NextResponse.json(
        { error: 'STORMGLASS_API_KEY is not configured. Пожалуйста, добавьте ваш API ключ в .env.local' },
        { status: 500 }
      );
    }

    // Получаем данные из API Stormglass
    // Запрашиваем данные за 24 часа назад, чтобы получить прошлые экстремумы
    // и +2 дня вперед для будущих экстремумов
    const now = new Date();
    const startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 часа назад
    const endDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // +2 дня вперед

    const response = await fetchTideData({
      lat,
      lng,
      key: apiKey,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    });

    // Преобразуем в формат приложения
    const tideData = transformTideData(response);

    // Сохраняем в кеш
    try {
      await saveTideDataToCache(tideData);
    } catch (cacheError) {
      console.error('Error saving to cache:', cacheError);
      // Продолжаем выполнение, даже если не удалось сохранить в кеш
    }

    return NextResponse.json(tideData);
  } catch (error) {
    console.error('Error fetching tide data:', error);
    
    // Если ошибка при запросе к API, пытаемся вернуть кеш как fallback
    if (!force) {
      const cachedData = await getCachedTideData();
      if (cachedData) {
        return NextResponse.json(cachedData);
      }
    }
    
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch tide data',
      },
      { status: 500 }
    );
  }
}


