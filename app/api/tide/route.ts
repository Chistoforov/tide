import { NextRequest, NextResponse } from 'next/server';
import { transformTideData } from '@/lib/tide-utils';
import { getLatestTideDataFromDB, getLastFetchTime } from '@/lib/tide-db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Получаем последние данные из базы данных
    const response = await getLatestTideDataFromDB();

    if (!response) {
      return NextResponse.json(
        { error: 'Данные о приливах отсутствуют в базе. Пожалуйста, дождитесь следующего обновления через cron.' },
        { status: 404 }
      );
    }

    // Получаем время последнего запроса к API
    const lastFetchTime = await getLastFetchTime();

    // Вычисляем прогноз на основе текущего времени
    // Используем текущее время для расчета, а не время сохранения данных
    const currentTime = new Date();
    const tideData = transformTideData(response, currentTime);

    // Добавляем информацию о времени последнего обновления из API
    if (lastFetchTime) {
      tideData.lastApiFetch = lastFetchTime.toISOString();
    }

    return NextResponse.json(tideData);
  } catch (error) {
    console.error('Error fetching tide data from DB:', error);
    
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


