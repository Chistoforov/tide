/**
 * Скрипт для отладки логики расчета приливов
 * Показывает, как определяется текущее состояние на основе данных из БД
 */

try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {}

const { createClient } = require('@supabase/supabase-js');
const { parseISO } = require('date-fns');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function debugTideCalculation() {
  console.log('🔍 Отладка логики расчета приливов...\n');

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Переменные окружения не настроены!');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    // Получаем последнюю запись
    const { data, error } = await supabase
      .from('tide_data')
      .select('raw_data, fetched_at')
      .order('fetched_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data || !data.raw_data) {
      console.error('❌ Ошибка получения данных:', error);
      process.exit(1);
    }

    const extremes = data.raw_data.data;
    const currentTime = new Date(); // Текущее время

    console.log(`📅 Текущее время: ${currentTime.toISOString()}`);
    console.log(`📅 Текущее время (локальное): ${currentTime.toString()}\n`);

    console.log('🌊 Все экстремумы из базы данных:');
    console.log('─'.repeat(80));
    extremes.forEach((extreme, idx) => {
      const extremeTime = parseISO(extreme.time);
      const isPast = extremeTime < currentTime;
      const isFuture = extremeTime > currentTime;
      const diffMs = extremeTime.getTime() - currentTime.getTime();
      const diffHours = (diffMs / (1000 * 60 * 60)).toFixed(2);
      
      let status = '';
      if (isPast) status = '✅ ПРОШЕЛ';
      else if (isFuture) status = '⏳ БУДУЩИЙ';
      else status = '🔄 СЕЙЧАС';

      console.log(`${idx + 1}. ${extreme.type.toUpperCase().padEnd(4)} - ${extreme.time}`);
      console.log(`   Высота: ${extreme.height.toFixed(2)} м | ${status} | ${diffHours > 0 ? '+' : ''}${diffHours} ч`);
    });

    console.log('\n' + '─'.repeat(80));
    console.log('🔍 АНАЛИЗ ЛОГИКИ:\n');

    // Находим прошедшие экстремумы
    const pastExtremes = extremes.filter((extreme) => {
      const extremeTime = parseISO(extreme.time);
      return extremeTime < currentTime;
    });

    console.log(`📊 Прошедших экстремумов: ${pastExtremes.length}`);
    if (pastExtremes.length > 0) {
      const lastExtreme = pastExtremes[pastExtremes.length - 1];
      console.log(`   Последний прошедший: ${lastExtreme.type.toUpperCase()} в ${lastExtreme.time}`);
      console.log(`   Высота: ${lastExtreme.height.toFixed(2)} м`);
      
      // Определяем текущее состояние по логике кода
      const currentState = lastExtreme.type === 'high' ? 'low' : 'high';
      console.log(`\n   ЛОГИКА: После ${lastExtreme.type} (пик ${lastExtreme.type === 'high' ? 'прилива' : 'отлива'}) → сейчас ${currentState === 'high' ? 'ПРИЛИВ' : 'ОТЛИВ'}`);
    }

    // Находим будущие экстремумы
    const futureExtremes = extremes.filter((extreme) => {
      const extremeTime = parseISO(extreme.time);
      return extremeTime > currentTime;
    });

    console.log(`\n📊 Будущих экстремумов: ${futureExtremes.length}`);
    if (futureExtremes.length > 0) {
      const nextExtreme = futureExtremes[0];
      console.log(`   Следующий: ${nextExtreme.type.toUpperCase()} в ${nextExtreme.time}`);
      console.log(`   Высота: ${nextExtreme.height.toFixed(2)} м`);
      
      const nextTime = parseISO(nextExtreme.time);
      const diffMs = nextTime.getTime() - currentTime.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      console.log(`   Через: ${diffHours} ч ${diffMinutes} мин`);
    }

    // Проверяем логику определения начала состояния
    console.log('\n' + '─'.repeat(80));
    console.log('🔍 ОПРЕДЕЛЕНИЕ НАЧАЛА ТЕКУЩЕГО СОСТОЯНИЯ:\n');

    if (pastExtremes.length > 0) {
      const lastExtreme = pastExtremes[pastExtremes.length - 1];
      const currentState = lastExtreme.type === 'high' ? 'low' : 'high';
      
      // Ищем начало текущего состояния
      const targetType = currentState === 'high' ? 'low' : 'high';
      let stateStart = null;
      
      for (let i = pastExtremes.length - 1; i >= 0; i--) {
        if (pastExtremes[i].type === targetType) {
          stateStart = pastExtremes[i];
          break;
        }
      }

      if (stateStart) {
        console.log(`Текущее состояние: ${currentState === 'high' ? 'ПРИЛИВ' : 'ОТЛИВ'}`);
        console.log(`Начало состояния: ${stateStart.type.toUpperCase()} в ${stateStart.time}`);
        console.log(`Высота: ${stateStart.height.toFixed(2)} м`);
        
        const startTime = parseISO(stateStart.time);
        const diffMs = currentTime.getTime() - startTime.getTime();
        const diffHours = (diffMs / (1000 * 60 * 60)).toFixed(2);
        console.log(`Время с начала: ${diffHours} часов`);
      } else {
        console.log(`Текущее состояние: ${currentState === 'high' ? 'ПРИЛИВ' : 'ОТЛИВ'}`);
        console.log(`⚠️  Не найдено начало состояния (нет предыдущего экстремума типа ${targetType})`);
      }
    }

    console.log('\n' + '═'.repeat(80));
    console.log('✅ Анализ завершен\n');

  } catch (error) {
    console.error('\n❌ Ошибка:', error);
    process.exit(1);
  }
}

debugTideCalculation()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



