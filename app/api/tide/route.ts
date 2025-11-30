import { NextRequest, NextResponse } from 'next/server';
import { fetchTideData } from '@/lib/stormglass-api';
import { transformTideData } from '@/lib/tide-utils';
import { getCachedTideData, saveTideDataToCache } from '@/lib/tide-cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const force = searchParams.get('force') === 'true';
  
  try {

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
      console.error('STORMGLASS_API_KEY is not configured');
      return NextResponse.json(
        { error: 'STORMGLASS_API_KEY не настроен. Пожалуйста, добавьте ваш API ключ в переменные окружения.' },
        { status: 500 }
      );
    }

    // Логируем начало запроса (без ключа для безопасности)
    console.log(`Fetching tide data for lat: ${lat}, lng: ${lng}, API key present: ${!!apiKey}`);

    // Получаем данные из API Stormglass
    // Запрашиваем данные за 24 часа назад, чтобы получить прошлые экстремумы
    // и +2 дня вперед для будущих экстремумов
    const now = new Date();
    const startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 часа назад
    const endDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // +2 дня вперед

    let response;
    try {
      response = await fetchTideData({
        lat,
        lng,
        key: apiKey,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      });
      console.log('Successfully fetched data from Stormglass API');
    } catch (apiError) {
      console.error('Stormglass API error details:', {
        message: apiError instanceof Error ? apiError.message : String(apiError),
        apiKeyLength: apiKey?.length || 0,
        apiKeyPrefix: apiKey?.substring(0, 10) || 'N/A',
      });
      throw apiError;
    }

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
      try {
        const cachedData = await getCachedTideData();
        if (cachedData) {
          console.log('Returning cached data as fallback');
          return NextResponse.json(cachedData);
        }
      } catch (cacheError) {
        console.error('Error reading cache as fallback:', cacheError);
      }
    }
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Не удалось загрузить данные о приливах';
    
    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}


