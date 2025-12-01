import { promises as fs } from 'fs';
import path from 'path';
import type { TideData } from '@/types/tide';

const CACHE_DIR = path.join(process.cwd(), 'data');
const CACHE_FILE = path.join(CACHE_DIR, 'tide-cache.json');

interface CachedTideData {
  data: TideData;
  cachedAt: string; // ISO string
}

/**
 * Получает кешированные данные о приливах
 * @returns Кешированные данные или null, если кеша нет
 */
export async function getCachedTideData(): Promise<TideData | null> {
  try {
    const fileContent = await fs.readFile(CACHE_FILE, 'utf-8');
    const cached: CachedTideData = JSON.parse(fileContent);
    
    // Проверяем, что данные не слишком старые (старше 24 часов)
    const cachedAt = new Date(cached.cachedAt);
    const now = new Date();
    const hoursSinceCache = (now.getTime() - cachedAt.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceCache > 24) {
      // Кеш устарел, возвращаем null
      return null;
    }
    
    return cached.data;
  } catch (error) {
    // Файл не существует или ошибка чтения
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    console.error('Error reading tide cache:', error);
    return null;
  }
}

/**
 * Сохраняет данные о приливах в кеш
 */
export async function saveTideDataToCache(data: TideData): Promise<void> {
  try {
    // Создаем директорию, если её нет
    await fs.mkdir(CACHE_DIR, { recursive: true });
    
    const cached: CachedTideData = {
      data,
      cachedAt: new Date().toISOString(),
    };
    
    await fs.writeFile(CACHE_FILE, JSON.stringify(cached, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving tide cache:', error);
    throw error;
  }
}


