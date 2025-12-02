/**
 * Скрипт для тестирования endpoint обновления данных
 * 
 * Использование:
 *   node scripts/test-update-endpoint.js [URL]
 * 
 * Пример:
 *   node scripts/test-update-endpoint.js https://your-app.vercel.app
 * 
 * Если URL не указан, будет использован localhost:3000
 */

// Попытка загрузить dotenv, если он установлен
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  // dotenv не установлен, используем переменные окружения напрямую
}

const https = require('https');
const http = require('http');

const baseUrl = process.argv[2] || 'http://localhost:3000';
const cronSecret = process.env.CRON_SECRET;

async function testUpdateEndpoint() {
  console.log('🧪 Тестирование endpoint обновления данных...\n');
  console.log(`📍 URL: ${baseUrl}/api/tide/update`);

  // Формируем URL с секретом, если он есть
  let url = `${baseUrl}/api/tide/update`;
  if (cronSecret) {
    url += `?secret=${cronSecret}`;
    console.log('🔐 Используется CRON_SECRET из переменных окружения');
  } else {
    console.log('⚠️  CRON_SECRET не установлен (endpoint может требовать авторизацию)');
  }

  console.log('\n📡 Отправка запроса...\n');

  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Tide-Check-Script/1.0',
      },
    };

    // Добавляем заголовок Authorization, если есть секрет
    if (cronSecret) {
      options.headers['Authorization'] = `Bearer ${cronSecret}`;
    }

    const req = client.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`📊 Статус ответа: ${res.statusCode} ${res.statusMessage}`);
        console.log('\n📄 Тело ответа:');
        console.log('─'.repeat(80));

        try {
          const json = JSON.parse(data);
          console.log(JSON.stringify(json, null, 2));
          
          if (res.statusCode === 200 && json.success) {
            console.log('\n✅ Успешно! Данные должны быть сохранены в базу.');
            console.log(`   Время получения: ${json.fetchedAt}`);
            console.log('\n💡 Теперь запустите: node scripts/check-db.js');
            console.log('   чтобы проверить, что данные действительно сохранились');
          } else if (res.statusCode === 401) {
            console.log('\n❌ Ошибка авторизации!');
            console.log('   Проверьте, что CRON_SECRET установлен правильно');
            console.log('   или что endpoint не требует авторизации');
          } else {
            console.log('\n⚠️  Endpoint вернул ошибку');
            if (json.error) {
              console.log(`   Ошибка: ${json.error}`);
            }
          }
        } catch (e) {
          console.log(data);
          console.log('\n⚠️  Ответ не является валидным JSON');
        }

        console.log('─'.repeat(80));
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error('\n❌ Ошибка при запросе:');
      console.error(error.message);
      
      if (error.code === 'ECONNREFUSED') {
        console.error('\n💡 Сервер недоступен. Убедитесь, что:');
        console.error('   - Приложение запущено (npm run dev)');
        console.error('   - URL указан правильно');
      } else if (error.code === 'ENOTFOUND') {
        console.error('\n💡 Домен не найден. Проверьте правильность URL');
      }
      
      reject(error);
    });

    req.setTimeout(30000, () => {
      req.destroy();
      console.error('\n❌ Таймаут запроса (30 секунд)');
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

// Запуск теста
testUpdateEndpoint()
  .then(() => {
    console.log('\n✅ Тест завершен');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Тест завершился с ошибкой');
    process.exit(1);
  });

