/**
 * Скрипт для проверки состояния базы данных и cron-задач
 * 
 * Использование:
 *   node scripts/check-db.js
 * 
 * Проверяет:
 * 1. Подключение к Supabase
 * 2. Наличие записей в таблице tide_data
 * 3. Время последнего обновления
 * 4. Может вызвать endpoint обновления вручную
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

async function checkDatabase() {
  console.log('🔍 Проверка состояния базы данных...\n');

  // Проверка переменных окружения
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Ошибка: Переменные окружения не настроены!');
    console.error('   Нужны: NEXT_PUBLIC_SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY');
    console.error('   Убедитесь, что файл .env.local существует и содержит эти переменные');
    process.exit(1);
  }

  console.log('✅ Переменные окружения найдены');
  console.log(`   Supabase URL: ${supabaseUrl.substring(0, 30)}...`);

  // Создание клиента
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    // Проверка подключения и получение всех записей
    console.log('\n📊 Проверка таблицы tide_data...');
    
    const { data, error, count } = await supabase
      .from('tide_data')
      .select('id, fetched_at, created_at', { count: 'exact' })
      .order('fetched_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('❌ Ошибка при запросе к базе данных:');
      console.error('   Код:', error.code);
      console.error('   Сообщение:', error.message);
      console.error('   Детали:', error.details);
      
      if (error.code === '42P01') {
        console.error('\n💡 Таблица tide_data не существует!');
        console.error('   Нужно выполнить миграцию:');
        console.error('   - Откройте Supabase Dashboard');
        console.error('   - Перейдите в SQL Editor');
        console.error('   - Выполните SQL из файла supabase/migrations/001_create_tide_data_table.sql');
      }
      
      process.exit(1);
    }

    console.log(`\n📈 Всего записей в базе: ${count || 0}`);

    if (!data || data.length === 0) {
      console.log('\n⚠️  В базе данных нет записей!');
      console.log('\n💡 Возможные причины:');
      console.log('   1. Cron-задачи еще не отработали');
      console.log('   2. Cron-задачи не настроены в Vercel');
      console.log('   3. Endpoint /api/tide/update возвращает ошибку');
      console.log('   4. Проблемы с подключением к Stormglass API');
      console.log('\n🔧 Что делать:');
      console.log('   1. Проверьте настройки cron в Vercel Dashboard → Settings → Cron Jobs');
      console.log('   2. Проверьте логи выполнения cron в Vercel');
      console.log('   3. Вызовите endpoint вручную: node scripts/test-update-endpoint.js');
      console.log('   4. Проверьте переменные окружения STORMGLASS_API_KEY');
    } else {
      console.log('\n✅ Найдены записи:');
      console.log('\nПоследние 10 записей:');
      console.log('─'.repeat(80));
      
      data.forEach((record, index) => {
        const fetchedAt = new Date(record.fetched_at);
        const createdAt = new Date(record.created_at);
        const now = new Date();
        const ageHours = Math.round((now - fetchedAt) / (1000 * 60 * 60));
        
        console.log(`\n${index + 1}. ID: ${record.id}`);
        console.log(`   Время получения: ${fetchedAt.toISOString()}`);
        console.log(`   Время создания: ${createdAt.toISOString()}`);
        console.log(`   Возраст данных: ${ageHours} часов назад`);
        
        if (index === 0) {
          if (ageHours > 7) {
            console.log(`   ⚠️  Данные устарели (больше 6 часов)!`);
          } else {
            console.log(`   ✅ Данные актуальны`);
          }
        }
      });
      
      console.log('\n' + '─'.repeat(80));
      
      const lastFetch = new Date(data[0].fetched_at);
      const now = new Date();
      const hoursSinceLastFetch = (now - lastFetch) / (1000 * 60 * 60);
      
      console.log(`\n⏰ Последнее обновление: ${hoursSinceLastFetch.toFixed(1)} часов назад`);
      
      if (hoursSinceLastFetch > 7) {
        console.log('   ⚠️  Cron должен был обновить данные!');
        console.log('   Проверьте логи cron в Vercel Dashboard');
      }
    }

    // Проверка структуры таблицы
    console.log('\n🔍 Проверка структуры таблицы...');
    const { data: sampleData } = await supabase
      .from('tide_data')
      .select('raw_data')
      .limit(1)
      .single();

    if (sampleData && sampleData.raw_data) {
      console.log('✅ Структура таблицы корректна (raw_data содержит данные)');
    } else if (data && data.length > 0) {
      console.log('⚠️  Структура таблицы может быть некорректна (raw_data пуст)');
    }

  } catch (error) {
    console.error('\n❌ Неожиданная ошибка:');
    console.error(error);
    process.exit(1);
  }
}

// Запуск проверки
checkDatabase()
  .then(() => {
    console.log('\n✅ Проверка завершена');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Ошибка при проверке:');
    console.error(error);
    process.exit(1);
  });

