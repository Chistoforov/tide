import React from 'react';
import { TideIcon } from './TideIcon';
import type { TideData } from '@/types/tide';

interface TideStatusCardProps {
  tideState: TideData | null;
  onRefresh: () => void;
  onClearCache?: () => void;
  loading: boolean;
  error?: string | null;
}

export const TideStatusCard: React.FC<TideStatusCardProps> = ({
  tideState,
  onRefresh,
  onClearCache,
  loading,
  error,
}) => {
  // Если есть ошибка и нет данных, показываем только ошибку
  if (error && !tideState) {
    return (
      <div className="bg-red-100 text-red-800 rounded-3xl volumetric-card p-8 md:p-12 max-w-md w-full mx-auto border-4 border-red-200">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 volumetric-text">Ой!</h2>
            <p className="text-lg font-medium opacity-90">{error}</p>
          </div>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-bold cartoon-button disabled:opacity-50"
          >
            {loading ? 'Загрузка...' : 'Попробовать снова'}
          </button>
        </div>
      </div>
    );
  }

  // Если нет данных и нет ошибки, показываем пустое состояние
  if (!tideState) {
    return null;
  }

  const { currentState, currentStateStart, nextExtreme, lastUpdated } = tideState;
  const isHigh = currentState === 'high';

  // Вычисляем, сколько времени прошло с начала текущего состояния
  const getHoursSinceStart = (): number | null => {
    if (!currentStateStart) return null;
    const now = new Date();
    const startTime = new Date(currentStateStart.timestamp * 1000);
    const diffMs = now.getTime() - startTime.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours;
  };

  // Получаем текст статуса в зависимости от времени с начала состояния
  const getStatusText = (): string => {
    const hoursSinceStart = getHoursSinceStart();
    
    if (isHigh) {
      // Для прилива
      if (hoursSinceStart === null || hoursSinceStart < 4) {
        return 'Пока еще можно играть';
      } else {
        return 'Нельзя играть';
      }
    } else {
      // Для отлива
      if (hoursSinceStart === null || hoursSinceStart < 2) {
        return 'Скоро можно играть!';
      } else {
        return 'Можно играть!';
      }
    }
  };

  // Получаем цвет фона в зависимости от текста статуса
  const getBackgroundColor = (): string => {
    const statusText = getStatusText();
    
    switch (statusText) {
      case 'Нельзя играть':
        // Синий цвет - вода высокая, играть нельзя
        return 'bg-blue-400 border-blue-300';
      case 'Можно играть!':
        // Желтый цвет - отлив, можно играть
        return 'bg-yellow-400 border-yellow-300';
      case 'Пока еще можно играть':
        // Оранжевый цвет - переходный период при приливе, еще можно играть
        return 'bg-orange-400 border-orange-300';
      case 'Скоро можно играть!':
        // Оранжевый цвет - отлив только начался, скоро можно будет играть
        return 'bg-orange-400 border-orange-300';
      default:
        // Fallback на синий
        return 'bg-blue-400 border-blue-300';
    }
  };

  // Вычисляем время до следующего события
  const getTimeUntilNext = () => {
    const now = new Date();
    const nextTime = new Date(nextExtreme.timestamp * 1000);
    const diffMs = nextTime.getTime() - now.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const remainingMinutes = diffMinutes % 60;

    if (diffMs < 0) {
      return 'уже начался';
    } else if (diffMinutes < 1) {
      return 'начнется сейчас';
    } else if (diffMinutes < 60) {
      return `через ${diffMinutes} ${diffMinutes === 1 ? 'минуту' : diffMinutes < 5 ? 'минуты' : 'минут'}`;
    } else {
      const hoursText = diffHours === 1 ? 'час' : diffHours < 5 ? 'часа' : 'часов';
      const minutesText = remainingMinutes === 0
        ? ''
        : ` ${remainingMinutes} ${remainingMinutes === 1 ? 'минуту' : remainingMinutes < 5 ? 'минуты' : 'минут'}`;
      return `через ${diffHours} ${hoursText}${minutesText}`;
    }
  };

  if (error) {
    return (
      <div className="bg-red-100 text-red-800 rounded-3xl volumetric-card p-8 md:p-12 max-w-md w-full mx-auto border-4 border-red-200">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 volumetric-text">Ой!</h2>
            <p className="text-lg font-medium opacity-90">{error}</p>
          </div>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-bold cartoon-button disabled:opacity-50"
          >
            {loading ? 'Загрузка...' : 'Попробовать снова'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        ${getBackgroundColor()}
        text-white rounded-[2rem] volumetric-card p-8 md:p-10 max-w-md w-full mx-auto transition-all duration-500 border-8
      `}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Status Text */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-2 volumetric-text tracking-wide">
            {isHigh ? 'ПРИЛИВ' : 'ОТЛИВ'}
          </h1>
          <p className="text-xl md:text-2xl font-semibold opacity-90">
            {getStatusText()}
          </p>
          {currentStateStart && (
            <p className="text-sm font-medium opacity-80 mt-2">
              Начался: {currentStateStart.time}
            </p>
          )}
        </div>

        {/* Next Extreme Info */}
        <div className="bg-white bg-opacity-20 rounded-2xl p-6 w-full backdrop-blur-sm border-2 border-white border-opacity-30">
          <p className="text-sm font-medium opacity-90 mb-2 uppercase tracking-wider">
            {nextExtreme.type === 'High' ? 'Пик прилива' : 'Пик отлива'}
          </p>
          <div className="flex items-baseline justify-center space-x-2 mb-2">
            <span className="text-4xl font-bold volumetric-text">{nextExtreme.time}</span>
          </div>
          <p className="text-lg font-bold text-center bg-white bg-opacity-30 rounded-full py-1 px-4 inline-block mx-auto">
            {getTimeUntilNext()}
          </p>
          <p className="text-sm font-medium opacity-80 mt-3 text-center">
            Высота волны: {nextExtreme.height}м
          </p>
        </div>

        {/* Last Updated */}
        <p className="text-xs font-medium opacity-70">Обновлено: {lastUpdated}</p>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="bg-white text-blue-500 hover:bg-blue-50 px-8 py-3 rounded-full text-lg font-bold cartoon-button disabled:opacity-50 w-full"
        >
          {loading ? 'Загрузка...' : 'Обновить'}
        </button>

        {/* Clear Cache Button */}
        {onClearCache && (
          <button
            onClick={onClearCache}
            className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 px-6 py-2 rounded-full text-sm font-medium cartoon-button border-2 border-white border-opacity-50 w-full"
            title="Очистить кэш PWA и перезагрузить приложение"
          >
            🗑️ Сбросить кэш
          </button>
        )}
      </div>
    </div>
  );
};


