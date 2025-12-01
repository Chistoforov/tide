import { NextRequest, NextResponse } from 'next/server';
import { transformTideData } from '@/lib/tide-utils';
import { getLatestTideDataFromDB, getLastFetchTime } from '@/lib/tide-db';
import { getCachedTideData } from '@/lib/tide-cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Endpoint для получения данных о приливах из БД/кэша
 * НЕ вызывает внешний API Stormglass - только читает сохраненные данные
 * Внешний API вызывается ТОЛЬКО по крону через /api/tide/update
 */
export async function GET(request: NextRequest) {
  try {
    // Сначала пытаемся получить данные из базы данных
    let response = await getLatestTideDataFromDB();
    let lastFetchTime = response ? await getLastFetchTime() : null;

    // Если данных нет в БД, пытаемся получить из файлового кэша
    if (!response) {
      console.log('No data in DB, trying file cache...');
      const cachedData = await getCachedTideData();
      
      if (cachedData) {
        // Данные из кэша уже обработаны, но мы все равно пересчитываем на основе текущего времени
        // Однако для этого нужны сырые данные, поэтому используем кэш как есть
        // В идеале нужно хранить сырые данные в кэше, но для обратной совместимости
        // используем кэшированные данные
        console.log('Using cached data from file (may be slightly outdated)');
        return NextResponse.json(cachedData);
      }
      
      // Если и в кэше нет данных, возвращаем ошибку
      return NextResponse.json(
        { error: 'Данные о приливах отсутствуют. Пожалуйста, дождитесь следующего обновления через cron.' },
        { status: 404 }
      );
    }

    // ВАЖНО: Вычисляем прогноз на основе ТЕКУЩЕГО времени
    // Это позволяет получить актуальное состояние прилива даже если данные были сохранены ранее
    const currentTime = new Date();
    console.log(`[Tide API] Calculating tide state for current time: ${currentTime.toISOString()}`);
    const tideData = transformTideData(response, currentTime);
    console.log(`[Tide API] Current tide state: ${tideData.currentState}, next extreme: ${tideData.nextExtreme.type} at ${tideData.nextExtreme.time}`);

    // Добавляем информацию о времени последнего обновления из API
    if (lastFetchTime) {
      tideData.lastApiFetch = lastFetchTime.toISOString();
    }

    return NextResponse.json(tideData);
  } catch (error) {
    console.error('Error fetching tide data:', error);
    
    // В случае ошибки, пытаемся вернуть данные из кэша
    try {
      const cachedData = await getCachedTideData();
      if (cachedData) {
        console.log('Error occurred, but returning cached data as fallback');
        return NextResponse.json(cachedData);
      }
    } catch (cacheError) {
      console.error('Error fetching from cache:', cacheError);
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


