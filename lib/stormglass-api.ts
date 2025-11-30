import type { StormglassResponse } from '@/types/tide';

const API_BASE_URL = 'https://api.stormglass.io/v2/tide/extremes/point';

export interface FetchTideDataParams {
  lat: number;
  lng: number;
  key: string;
  start?: string;
  end?: string;
}

/**
 * Получает данные о приливах из Stormglass API
 */
export async function fetchTideData(
  params: FetchTideDataParams
): Promise<StormglassResponse> {
  const { lat, lng, key, start, end } = params;

  // Если start и end не указаны, используем текущее время и +2 дня
  const now = new Date();
  const defaultStart = start || now.toISOString();
  const defaultEnd = end || new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();

  const url = new URL(API_BASE_URL);
  url.searchParams.set('lat', lat.toString());
  url.searchParams.set('lng', lng.toString());
  url.searchParams.set('start', defaultStart);
  url.searchParams.set('end', defaultEnd);

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': key,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Stormglass API error: ${response.status}`;
    
    try {
      const errorData = JSON.parse(errorText);
      // Stormglass может возвращать ошибки в разных форматах
      if (errorData.errors && Array.isArray(errorData.errors)) {
        errorMessage = errorData.errors[0]?.msg || errorData.errors[0]?.message || errorMessage;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      } else if (typeof errorData === 'string') {
        errorMessage = errorData;
      }
    } catch {
      // Если не удалось распарсить JSON, используем текст как есть
      if (errorText) {
        errorMessage = `${errorMessage} - ${errorText}`;
      }
    }
    
    // Добавляем более информативное сообщение для различных ошибок
    if (response.status === 402) {
      errorMessage = `Ошибка API ключа Stormglass (402): Проблема с подпиской или лимитом запросов. Проверьте ваш API ключ на https://stormglass.io/ или обновите подписку.`;
    } else if (response.status === 403) {
      errorMessage = `Доступ запрещен (403). Проверьте правильность API ключа. ${errorMessage}`;
    } else if (response.status === 401) {
      errorMessage = `Неавторизован (401). API ключ недействителен или отсутствует. Проверьте настройки переменных окружения.`;
    }
    
    throw new Error(errorMessage);
  }

  const data: StormglassResponse = await response.json();

  return data;
}

