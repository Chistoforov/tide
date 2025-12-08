/**
 * Скрипт для просмотра последних записей о приливах и отливах из базы данных
 * 
 * Использование:
 *   node scripts/check-latest-tides.js [количество_записей]
 *   По умолчанию показывает последние 10 записей
 */

// Попытка загрузить dotenv, если он установлен
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  // dotenv не установлен, используем переменные окружения напрямую
}

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function checkLatestTides() {
  const limit = parseInt(process.argv[2]) || 10;
  
  console.log(`🔍 Получение последних ${limit} записей о приливах и отливах...\n`);

  // Проверка переменных окружения
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Ошибка: Переменные окружения не настроены!');
    console.error('   Нужны: NEXT_PUBLIC_SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  console.log('✅ Переменные окружения найдены');
  console.log(`   Supabase URL: ${supabaseUrl.substring(0, 30)}...\n`);

  // Создание клиента
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    // Получаем последние записи
    const { data, error } = await supabase
      .from('tide_data')
      .select('id, fetched_at, raw_data, created_at')
      .order('fetched_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('❌ Ошибка при чтении данных:');
      console.error('   Код:', error.code);
      console.error('   Сообщение:', error.message);
      console.error('   Детали:', error.details);
      console.error('   Подсказка:', error.hint);
      process.exit(1);
    }

    if (!data || data.length === 0) {
      console.log('⚠️  Данные не найдены в базе данных');
      console.log('   Это означает, что записи еще не были созданы');
      console.log('\n💡 Решение:');
      console.log('   Запустите обновление: node scripts/test-update-endpoint.js');
      process.exit(0);
    }

    console.log(`✅ Найдено записей: ${data.length}\n`);
    console.log('═'.repeat(80));

    // Выводим информацию о каждой записи
    data.forEach((record, index) => {
      console.log(`\n📊 ЗАПИСЬ #${index + 1} (ID: ${record.id})`);
      console.log('─'.repeat(80));
      console.log(`🕐 Время получения данных (fetched_at): ${record.fetched_at}`);
      console.log(`📅 Время создания записи (created_at):  ${record.created_at}`);
      
      if (record.raw_data) {
        const rawData = record.raw_data;
        
        // Метаданные
        if (rawData.meta) {
          console.log('\n📋 МЕТАДАННЫЕ:');
          console.log(`   Координаты: ${rawData.meta.lat}, ${rawData.meta.lng}`);
          console.log(`   Период данных: ${rawData.meta.start} → ${rawData.meta.end}`);
          console.log(`   Стоимость запроса: ${rawData.meta.cost}`);
          console.log(`   Дневная квота: ${rawData.meta.dailyQuota}`);
          console.log(`   Количество запросов: ${rawData.meta.requestCount}`);
        }
        
        // Данные о приливах и отливах
        if (rawData.data && Array.isArray(rawData.data)) {
          console.log(`\n🌊 ЭКСТРЕМУМЫ ПРИЛИВОВ И ОТЛИВОВ (всего: ${rawData.data.length}):`);
          
          rawData.data.forEach((extreme, idx) => {
            const type = extreme.type === 'high' ? '⬆️  ПРИЛИВ' : '⬇️  ОТЛИВ';
            const height = extreme.height !== undefined ? `${extreme.height.toFixed(2)} м` : 'N/A';
            console.log(`   ${idx + 1}. ${type} - ${extreme.time} (высота: ${height})`);
          });
          
          // Статистика
          const highTides = rawData.data.filter(e => e.type === 'high');
          const lowTides = rawData.data.filter(e => e.type === 'low');
          console.log(`\n📈 СТАТИСТИКА:`);
          console.log(`   Приливы: ${highTides.length}`);
          console.log(`   Отливы: ${lowTides.length}`);
          
          if (highTides.length > 0) {
            const highHeights = highTides.map(e => e.height).filter(h => h !== undefined);
            if (highHeights.length > 0) {
              const maxHigh = Math.max(...highHeights);
              const minHigh = Math.min(...highHeights);
              console.log(`   Максимальная высота прилива: ${maxHigh.toFixed(2)} м`);
              console.log(`   Минимальная высота прилива: ${minHigh.toFixed(2)} м`);
            }
          }
          
          if (lowTides.length > 0) {
            const lowHeights = lowTides.map(e => e.height).filter(h => h !== undefined);
            if (lowHeights.length > 0) {
              const maxLow = Math.max(...lowHeights);
              const minLow = Math.min(...lowHeights);
              console.log(`   Максимальная высота отлива: ${maxLow.toFixed(2)} м`);
              console.log(`   Минимальная высота отлива: ${minLow.toFixed(2)} м`);
            }
          }
        } else {
          console.log('\n⚠️  Данные о приливах отсутствуют или имеют неверный формат');
        }
      } else {
        console.log('\n⚠️  raw_data отсутствует или пуст');
      }
      
      console.log('─'.repeat(80));
    });

    console.log('\n✅ Просмотр завершен\n');

  } catch (error) {
    console.error('\n❌ Неожиданная ошибка:');
    console.error(error);
    process.exit(1);
  }
}

// Запуск
checkLatestTides()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Ошибка при выполнении:');
    console.error(error);
    process.exit(1);
  });



