const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'icon.svg');

async function generateIcons() {
  try {
    // Проверяем наличие SVG файла
    if (!fs.existsSync(svgPath)) {
      console.error('❌ Файл icon.svg не найден в директории public/');
      process.exit(1);
    }

    console.log('🎨 Генерация иконок PWA...');

    // Генерируем icon-192.png
    await sharp(svgPath)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'icon-192.png'));

    console.log('✅ Создан icon-192.png (192x192)');

    // Генерируем icon-512.png
    await sharp(svgPath)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'icon-512.png'));

    console.log('✅ Создан icon-512.png (512x512)');

    console.log('🎉 Все иконки успешно сгенерированы!');
  } catch (error) {
    console.error('❌ Ошибка при генерации иконок:', error);
    process.exit(1);
  }
}

generateIcons();





