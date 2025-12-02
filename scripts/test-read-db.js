/**
 * Скрипт для тестирования чтения данных из базы данных
 * Использует те же функции, что и API endpoint /api/tide
 * 
 * Использование:
 *   node scripts/test-read-db.js
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

async function testReadDatabase() {
  console.log('🔍 Тестирование чтения данных из базы данных...\n');

  // Проверка переменных окружения
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Ошибка: Переменные окружения не настроены!');
    console.error('   Нужны: NEXT_PUBLIC_SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  console.log('✅ Переменные окружения найдены');
  console.log(`   Supabase URL: ${supabaseUrl.substring(0, 30)}...\n`);

  // Создание клиента (как в lib/supabase.ts)
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    console.log('📊 Тест 1: Проверка подключения...');
    const { data: testData, error: testError } = await supabase
      .from('tide_data')
      .select('id')
      .limit(1);

    if (testError) {
      console.error('❌ Ошибка подключения:', testError);
      if (testError.code === '42P01') {
        console.error('   Таблица tide_data не существует!');
      } else if (testError.code === '42501') {
        console.error('   Ошибка доступа! Возможно, включен RLS.');
        console.error('   Выполните SQL из scripts/fix-rls.sql в Supabase Dashboard');
      }
      process.exit(1);
    }
    console.log('✅ Подключение успешно\n');

    console.log('📊 Тест 2: Получение последней записи (как в getLatestTideDataFromDB)...');
    const { data, error } = await supabase
      .from('tide_data')
      .select('raw_data, fetched_at')
      .order('fetched_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('❌ Ошибка при чтении данных:');
      console.error('   Код:', error.code);
      console.error('   Сообщение:', error.message);
      console.error('   Детали:', error.details);
      console.error('   Подсказка:', error.hint);
      process.exit(1);
    }

    if (!data || !data.raw_data) {
      console.log('⚠️  Данные не найдены в базе данных');
      console.log('   Это означает, что либо:');
      console.log('   1. Записи еще не были созданы');
      console.log('   2. raw_data пуст или null');
      console.log('\n💡 Решение:');
      console.log('   Запустите обновление: node scripts/test-update-endpoint.js');
      process.exit(1);
    }

    console.log('✅ Данные успешно прочитаны!');
    console.log(`   Время получения: ${data.fetched_at}`);
    console.log(`   Тип raw_data: ${typeof data.raw_data}`);
    
    if (data.raw_data && typeof data.raw_data === 'object') {
      const rawData = data.raw_data;
      if (rawData.data && Array.isArray(rawData.data)) {
        console.log(`   Количество экстремумов: ${rawData.data.length}`);
        if (rawData.data.length > 0) {
          console.log(`   Первый экстремум: ${rawData.data[0].time} (${rawData.data[0].type})`);
          console.log(`   Последний экстремум: ${rawData.data[rawData.data.length - 1].time} (${rawData.data[rawData.data.length - 1].type})`);
        }
      }
    }

    console.log('\n✅ Все тесты пройдены успешно!');
    console.log('   API endpoint /api/tide должен работать корректно');

  } catch (error) {
    console.error('\n❌ Неожиданная ошибка:');
    console.error(error);
    process.exit(1);
  }
}

// Запуск теста
testReadDatabase()
  .then(() => {
    console.log('\n✅ Тестирование завершено');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Ошибка при тестировании:');
    console.error(error);
    process.exit(1);
  });

