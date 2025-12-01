import { NextRequest, NextResponse } from 'next/server';
import { fetchTideData } from '@/lib/stormglass-api';
import { saveTideDataToDB } from '@/lib/tide-db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Endpoint для обновления кеша данных о приливах
 * Предназначен для вызова из cron job
 * Можно защитить секретным ключом через query параметр или header
 */
export async function GET(request: NextRequest) {
  try {
    // Проверка авторизации для cron-задач
    // Vercel Cron передает заголовок 'x-vercel-cron' или можно использовать секретный ключ
    const authHeader = request.headers.get('authorization');
    const cronSecret = request.headers.get('x-vercel-cron');
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const expectedSecret = process.env.CRON_SECRET;

    // Если установлен CRON_SECRET, проверяем авторизацию
    if (expectedSecret) {
      // Проверяем заголовок Authorization (Bearer token)
      if (authHeader && authHeader === `Bearer ${expectedSecret}`) {
        // OK
      }
      // Проверяем query параметр secret
      else if (secret && secret === expectedSecret) {
        // OK
      }
      // Проверяем заголовок от Vercel Cron (если не установлен секрет, разрешаем)
      else if (!cronSecret) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
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

    // Сохраняем сырые данные в базу данных
    await saveTideDataToDB(response);

    return NextResponse.json({
      success: true,
      message: 'Tide data saved to database successfully',
      fetchedAt: new Date().toISOString(),
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

