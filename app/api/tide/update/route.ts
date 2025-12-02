import { NextRequest, NextResponse } from 'next/server';
import { fetchTideData } from '@/lib/stormglass-api';
import { saveTideDataToDB } from '@/lib/tide-db';
import { saveTideDataToCache } from '@/lib/tide-cache';
import { transformTideData } from '@/lib/tide-utils';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Endpoint для обновления данных о приливах
 * ЕДИНСТВЕННОЕ место, где вызывается внешний API Stormglass
 * Предназначен ТОЛЬКО для вызова из cron job (настроен в vercel.json)
 * Защищен секретным ключом через query параметр или header
 * 
 * ВАЖНО: Этот endpoint НЕ должен вызываться при загрузке/обновлении приложения
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  console.log('[Tide Update] Request received at', new Date().toISOString());
  
  try {
    // Проверка авторизации для cron-задач
    // Vercel Cron передает заголовок 'x-vercel-cron' или можно использовать секретный ключ
    const authHeader = request.headers.get('authorization');
    const cronHeader = request.headers.get('x-vercel-cron');
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const expectedSecret = process.env.CRON_SECRET;

    // Проверка авторизации
    let isAuthorized = false;

    // Если установлен CRON_SECRET, проверяем авторизацию через секрет
    if (expectedSecret) {
      // Проверяем заголовок Authorization (Bearer token)
      if (authHeader && authHeader === `Bearer ${expectedSecret}`) {
        isAuthorized = true;
      }
      // Проверяем query параметр secret
      else if (secret && secret === expectedSecret) {
        isAuthorized = true;
      }
      // Если секрет установлен, но не передан - требуем авторизацию
      // (но разрешаем x-vercel-cron заголовок от Vercel)
    }

    // Vercel Cron всегда передает заголовок x-vercel-cron
    if (cronHeader) {
      isAuthorized = true;
    }

    // Если требуется авторизация, но она не пройдена
    if (expectedSecret && !isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized. Provide CRON_SECRET via ?secret=... or Authorization header, or ensure x-vercel-cron header is present.' },
        { status: 401 }
      );
    }

    const apiKey = process.env.STORMGLASS_API_KEY;
    const lat = parseFloat(process.env.BEACH_LATITUDE || '38.6978');
    const lng = parseFloat(process.env.BEACH_LONGITUDE || '-9.4203');

    console.log('[Tide Update] Configuration:', {
      hasApiKey: !!apiKey,
      lat,
      lng,
    });

    if (!apiKey || apiKey === 'your_api_key_here') {
      console.error('[Tide Update] STORMGLASS_API_KEY is not configured');
      return NextResponse.json(
        { error: 'STORMGLASS_API_KEY is not configured' },
        { status: 500 }
      );
    }

    // Получаем данные из API Stormglass
    // Запрашиваем данные за 24 часа назад, чтобы получить прошлые экстремумы
    // и +2 дня вперед для будущих экстремумов
    const now = new Date();
    const startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 часа назад
    const endDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // +2 дня вперед

    console.log('[Tide Update] Fetching data from Stormglass API...', {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    });

    const response = await fetchTideData({
      lat,
      lng,
      key: apiKey,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    });

    console.log('[Tide Update] Data fetched successfully, saving to database...');

    // Сохраняем сырые данные в базу данных
    await saveTideDataToDB(response);
    
    console.log('[Tide Update] Data saved to database successfully');

    // Также сохраняем обработанные данные в файловый кэш для fallback
    try {
      const currentTime = new Date();
      const tideData = transformTideData(response, currentTime);
      tideData.lastApiFetch = currentTime.toISOString();
      await saveTideDataToCache(tideData);
    } catch (cacheError) {
      // Не критично, если не удалось сохранить в кэш
      console.warn('Failed to save to file cache:', cacheError);
    }

    const duration = Date.now() - startTime;
    console.log(`[Tide Update] Completed successfully in ${duration}ms`);
    
    return NextResponse.json({
      success: true,
      message: 'Tide data saved to database successfully',
      fetchedAt: new Date().toISOString(),
      duration: `${duration}ms`,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[Tide Update] Error after ${duration}ms:`, error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update tide cache',
      },
      { status: 500 }
    );
  }
}

