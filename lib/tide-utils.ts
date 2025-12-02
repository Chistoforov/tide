import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import ru from 'date-fns/locale/ru';
import type { TideData, TideExtreme, TideState, StormglassResponse } from '@/types/tide';

const TIMEZONE = 'Europe/Lisbon';

/**
 * Определяет текущее состояние прилива на основе данных Stormglass
 * 
 * Логика: 
 * - Если последний экстремум был "high" (пик прилива), то после него сразу начинается отлив
 * - Если последний экстремум был "low" (пик отлива), то после него сразу начинается прилив
 * 
 * ВАЖНО: После пика прилива сразу начинается отлив (без переходного периода).
 * Если пик прилива был в 11:59, то в 12:00 уже будет отлив.
 */
export function getCurrentTideState(
  extremes: StormglassResponse['data'],
  currentTime: Date
): TideState {
  if (extremes.length === 0) return 'high';

  // Находим последнее экстремальное значение до текущего времени (включая текущий момент)
  const pastExtremes = extremes.filter((extreme) => {
    if (!extreme.time) return false;
    try {
      const extremeTime = parseISO(extreme.time);
      if (isNaN(extremeTime.getTime())) return false;
      return extremeTime <= currentTime;
    } catch {
      return false;
    }
  });

  if (pastExtremes.length === 0) {
    // Если нет прошлых экстремумов, смотрим на первый валидный
    const firstValid = extremes.find((extreme) => {
      if (!extreme.time) return false;
      try {
        const extremeTime = parseISO(extreme.time);
        return !isNaN(extremeTime.getTime());
      } catch {
        return false;
      }
    });
    // Если первый экстремум - high, значит мы до него (прилив идет вверх)
    // Если первый экстремум - low, значит мы до него (отлив идет вниз)
    return firstValid?.type === 'high' ? 'low' : 'high';
  }

  const lastExtreme = pastExtremes[pastExtremes.length - 1];
  
  // Стандартная логика: если последний экстремум был high (пик прилива), сейчас отлив (вода идет вниз)
  // Если последний экстремум был low (пик отлива), сейчас прилив (вода идет вверх)
  return lastExtreme.type === 'high' ? 'low' : 'high';
}

/**
 * Находит последний экстремум, который начал текущее состояние
 * Если сейчас прилив (high), то он начался после последнего пика отлива (low)
 * Если сейчас отлив (low), то он начался после последнего пика прилива (high)
 */
export function getCurrentStateStart(
  extremes: StormglassResponse['data'],
  currentTime: Date,
  currentState: TideState
): TideExtreme | null {
  if (extremes.length === 0) return null;

  // Находим последнее экстремальное значение до текущего времени (включая текущий момент)
  const pastExtremes = extremes.filter((extreme) => {
    if (!extreme.time) return false;
    try {
      const extremeTime = parseISO(extreme.time);
      if (isNaN(extremeTime.getTime())) return false;
      return extremeTime <= currentTime; // Изменено: <= вместо <
    } catch {
      return false;
    }
  });

  if (pastExtremes.length === 0) return null;

  // Если сейчас прилив (high), ищем последний пик отлива (low)
  // Если сейчас отлив (low), ищем последний пик прилива (high)
  const targetType = currentState === 'high' ? 'low' : 'high';
  
  // Ищем последний экстремум нужного типа
  for (let i = pastExtremes.length - 1; i >= 0; i--) {
    if (pastExtremes[i].type === targetType) {
      const extreme = pastExtremes[i];
      if (!extreme.time) return null;

      let extremeTime: Date;
      try {
        extremeTime = parseISO(extreme.time);
        if (isNaN(extremeTime.getTime())) return null;
      } catch {
        return null;
      }

      return {
        type: extreme.type === 'high' ? 'High' : 'Low',
        time: formatInTimeZone(
          extremeTime,
          TIMEZONE,
          'HH:mm, d MMM',
          { locale: ru }
        ),
        height: extreme.height.toFixed(1),
        timestamp: Math.floor(extremeTime.getTime() / 1000),
      };
    }
  }

  return null;
}

/**
 * Находит следующий экстремум прилива из данных Stormglass
 */
export function getNextExtreme(
  extremes: StormglassResponse['data'],
  currentTime: Date
): TideExtreme | null {
  const futureExtremes = extremes.filter((extreme) => {
    if (!extreme.time) return false;
    try {
      const extremeTime = parseISO(extreme.time);
      if (isNaN(extremeTime.getTime())) return false;
      return extremeTime > currentTime;
    } catch {
      return false;
    }
  });

  if (futureExtremes.length === 0) return null;

  const next = futureExtremes[0];
  if (!next.time) return null;

  let nextTime: Date;
  try {
    nextTime = parseISO(next.time);
    if (isNaN(nextTime.getTime())) return null;
  } catch {
    return null;
  }

  return {
    type: next.type === 'high' ? 'High' : 'Low',
    time: formatInTimeZone(
      nextTime,
      TIMEZONE,
      'HH:mm, d MMM',
      { locale: ru }
    ),
    height: next.height.toFixed(1),
    timestamp: Math.floor(nextTime.getTime() / 1000),
  };
}

/**
 * Преобразует ответ API Stormglass в формат приложения
 * @param response - Ответ от Stormglass API
 * @param currentTime - Текущее время для расчета прогноза (по умолчанию - сейчас)
 */
export function transformTideData(response: StormglassResponse, currentTime: Date = new Date()): TideData {
  const currentState = getCurrentTideState(response.data, currentTime);
  const currentStateStart = getCurrentStateStart(response.data, currentTime, currentState);
  const nextExtreme = getNextExtreme(response.data, currentTime);

  // Если следующего экстремума нет, используем последний как fallback
  const fallbackExtreme: TideExtreme = {
    type: 'High',
    time: format(currentTime, 'HH:mm, d MMM', { locale: ru }),
    height: '0.0',
    timestamp: Math.floor(currentTime.getTime() / 1000),
  };

  return {
    currentState,
    currentStateStart,
    nextExtreme: nextExtreme || fallbackExtreme,
    lastUpdated: format(currentTime, 'dd.MM.yyyy HH:mm', { locale: ru }),
  };
}

