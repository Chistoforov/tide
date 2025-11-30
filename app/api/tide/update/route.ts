import { NextRequest, NextResponse } from 'next/server';
import { fetchTideData } from '@/lib/stormglass-api';
import { transformTideData } from '@/lib/tide-utils';
import { saveTideDataToCache } from '@/lib/tide-cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Endpoint для обновления кеша данных о приливах
 * Предназначен для вызова из cron job
 * Можно защитить секретным ключом через query параметр или header
 */
export async function GET(request: NextRequest) {
  try {
    // Опциональная защита через секретный ключ
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const expectedSecret = process.env.CRON_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const apiKey = process.env.STORMGLASS_API_KEY;
    const lat = parseFloat(process.env.BEACH_LATITUDE || '38.6978');
    const lng = parseFloat(process.env.BEACH_LONGITUDE || '-9.4203');

    if (!apiKey || apiKey === 'your_api_key_here') {
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
    await saveTideDataToCache(tideData);

    return NextResponse.json({
      success: true,
      message: 'Tide data cached successfully',
      data: tideData,
    });
  } catch (error) {
    console.error('Error updating tide cache:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update tide cache',
      },
      { status: 500 }
    );
  }
}

