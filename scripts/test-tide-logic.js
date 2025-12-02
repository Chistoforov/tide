/**
 * Тест логики: проверяем, что происходит, если мы находимся прямо после пика прилива
 */

const { parseISO } = require('date-fns');

// Данные из базы
const extremes = [
  { time: '2025-12-01T17:22:00+00:00', type: 'low', height: -1.09 },
  { time: '2025-12-01T23:38:00+00:00', type: 'high', height: 1.08 },
  { time: '2025-12-02T05:45:00+00:00', type: 'low', height: -1.06 },
  { time: '2025-12-02T11:59:00+00:00', type: 'high', height: 1.25 }, // ПИК ПРИЛИВА
  { time: '2025-12-02T18:12:00+00:00', type: 'low', height: -1.23 }, // ПИК ОТЛИВА
];

// Симулируем разные моменты времени
const testTimes = [
  '2025-12-02T11:58:00+00:00', // За 1 минуту ДО пика прилива
  '2025-12-02T11:59:00+00:00', // Точно в момент пика прилива
  '2025-12-02T12:00:00+00:00', // Через 1 минуту ПОСЛЕ пика прилива (должен быть отлив)
  '2025-12-02T12:18:00+00:00', // Через 19 минут после пика
  '2025-12-02T14:00:00+00:00', // Через 2 часа 1 минуту после пика (отлив длится 2ч 1мин)
  '2025-12-02T15:00:00+00:00', // Через 3 часа после пика
];

console.log('🧪 ТЕСТИРОВАНИЕ ЛОГИКИ ОПРЕДЕЛЕНИЯ СОСТОЯНИЯ ПРИЛИВА\n');
console.log('═'.repeat(80));

testTimes.forEach((testTimeStr) => {
  const testTime = parseISO(testTimeStr);
  
  // Логика из getCurrentTideState
  const pastExtremes = extremes.filter((extreme) => {
    const extremeTime = parseISO(extreme.time);
    return extremeTime <= testTime;
  });
  
  let currentState;
  if (pastExtremes.length === 0) {
    const firstValid = extremes.find((extreme) => {
      const extremeTime = parseISO(extreme.time);
      return !isNaN(extremeTime.getTime());
    });
    currentState = firstValid?.type === 'high' ? 'low' : 'high';
  } else {
    const lastExtreme = pastExtremes[pastExtremes.length - 1];
    // После пика прилива (high) сразу начинается отлив (low)
    // После пика отлива (low) сразу начинается прилив (high)
    currentState = lastExtreme.type === 'high' ? 'low' : 'high';
  }
  
  // Логика из getCurrentStateStart (обновленная)
  const pastExtremesForStart = extremes.filter((extreme) => {
    const extremeTime = parseISO(extreme.time);
    return extremeTime <= testTime; // Изменено: <= вместо <
  });
  
  const targetType = currentState === 'high' ? 'low' : 'high';
  let stateStart = null;
  for (let i = pastExtremesForStart.length - 1; i >= 0; i--) {
    if (pastExtremesForStart[i].type === targetType) {
      stateStart = pastExtremesForStart[i];
      break;
    }
  }
  
  // Следующий экстремум
  const futureExtremes = extremes.filter((extreme) => {
    const extremeTime = parseISO(extreme.time);
    return extremeTime > testTime;
  });
  const nextExtreme = futureExtremes[0];
  
  console.log(`\n⏰ Время: ${testTimeStr}`);
  console.log(`   Текущее состояние: ${currentState === 'high' ? '🔼 ПРИЛИВ' : '🔽 ОТЛИВ'}`);
  
  if (pastExtremes.length > 0) {
    const lastExtreme = pastExtremes[pastExtremes.length - 1];
    console.log(`   Последний прошедший экстремум: ${lastExtreme.type.toUpperCase()} в ${lastExtreme.time} (${lastExtreme.type === 'high' ? 'пик прилива' : 'пик отлива'})`);
  }
  
  if (stateStart) {
    const startTime = parseISO(stateStart.time);
    const diffMs = testTime.getTime() - startTime.getTime();
    const diffHours = (diffMs / (1000 * 60 * 60)).toFixed(2);
    console.log(`   Начало текущего состояния: ${stateStart.type.toUpperCase()} в ${stateStart.time}`);
    console.log(`   Время с начала: ${diffHours} часов`);
  }
  
  if (nextExtreme) {
    const nextTime = parseISO(nextExtreme.time);
    const diffMs = nextTime.getTime() - testTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    console.log(`   Следующий экстремум: ${nextExtreme.type.toUpperCase()} в ${nextExtreme.time} (через ${diffHours}ч ${diffMinutes}мин)`);
  }
  
  console.log('─'.repeat(80));
});

console.log('\n📝 ВЫВОД:');
console.log('После пика прилива (HIGH) в 11:59 сразу начинается ОТЛИВ.');
console.log('В 12:00 (через 1 минуту) уже должен быть отлив.');
console.log('В 14:00 (через 2 часа 1 минуту) отлив длится 2 часа 1 минуту.\n');

