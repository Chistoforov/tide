/**
 * Скрипт для тестирования API endpoint /api/tide
 * Симулирует запрос, который делает приложение
 * 
 * Использование:
 *   node scripts/test-api-endpoint.js
 * 
 * Или для тестирования на production:
 *   API_URL=https://your-app.vercel.app node scripts/test-api-endpoint.js
 */

// Попытка загрузить dotenv, если он установлен
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  // dotenv не установлен, используем переменные окружения напрямую
}

const apiUrl = process.env.API_URL || 'http://localhost:3000';

async function testApiEndpoint() {
  console.log('🔍 Тестирование API endpoint /api/tide...\n');
  console.log(`📍 URL: ${apiUrl}/api/tide\n`);

  try {
    const response = await fetch(`${apiUrl}/api/tide`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`📊 Статус ответа: ${response.status} ${response.statusText}\n`);

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Ошибка API:');
      console.error(JSON.stringify(data, null, 2));
      
      if (data.error) {
        console.error(`\n💡 Сообщение об ошибке: ${data.error}`);
      }
      
      process.exit(1);
    }

    console.log('✅ API вернул успешный ответ!\n');
    console.log('📦 Данные:');
    console.log(JSON.stringify(data, null, 2));

    // Проверка структуры данных
    console.log('\n🔍 Проверка структуры данных...');
    
    const requiredFields = ['currentState', 'nextExtreme', 'lastUpdated'];
    const missingFields = requiredFields.filter(field => !(field in data));
    
    if (missingFields.length > 0) {
      console.error(`❌ Отсутствуют обязательные поля: ${missingFields.join(', ')}`);
      process.exit(1);
    }

    console.log('✅ Все обязательные поля присутствуют');
    console.log(`   - currentState: ${data.currentState}`);
    console.log(`   - nextExtreme: ${data.nextExtreme?.type} в ${data.nextExtreme?.time}`);
    console.log(`   - lastUpdated: ${data.lastUpdated}`);
    
    if (data.currentStateStart) {
      console.log(`   - currentStateStart: ${data.currentStateStart.type} в ${data.currentStateStart.time}`);
    }

    console.log('\n✅ Все проверки пройдены! API работает корректно.');

  } catch (error) {
    console.error('\n❌ Ошибка при запросе к API:');
    console.error(error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Не удалось подключиться к серверу.');
      console.error('   Убедитесь, что сервер запущен:');
      console.error('   - Для локального тестирования: npm run dev');
      console.error('   - Для production: проверьте URL в переменной API_URL');
    }
    
    process.exit(1);
  }
}

// Запуск теста
testApiEndpoint()
  .then(() => {
    console.log('\n✅ Тестирование завершено');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Ошибка при тестировании:');
    console.error(error);
    process.exit(1);
  });




