import { supabaseAdmin } from './supabase';
import type { StormglassResponse } from '@/types/tide';

export interface TideRecord {
  id?: number;
  fetched_at: string; // ISO string
  raw_data: StormglassResponse; // Полные данные от API
  created_at?: string;
}

/**
 * Сохраняет данные о приливах в базу данных
 */
export async function saveTideDataToDB(response: StormglassResponse): Promise<void> {
  try {
    if (!supabaseAdmin) {
      throw new Error('Supabase client is not initialized. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.');
    }

    const record: Omit<TideRecord, 'id' | 'created_at'> = {
      fetched_at: new Date().toISOString(),
      raw_data: response,
    };

    const { error } = await supabaseAdmin
      .from('tide_data')
      .insert(record);

    if (error) {
      console.error('Error saving tide data to DB:', error);
      throw error;
    }

    console.log('Tide data saved to database successfully');
  } catch (error) {
    console.error('Error in saveTideDataToDB:', error);
    throw error;
  }
}

/**
 * Получает последнюю запись о приливах из базы данных
 */
export async function getLatestTideDataFromDB(): Promise<StormglassResponse | null> {
  try {
    if (!supabaseAdmin) {
      console.warn('Supabase client is not initialized. Returning null.');
      return null;
    }

    const { data, error } = await supabaseAdmin
      .from('tide_data')
      .select('raw_data, fetched_at')
      .order('fetched_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      // Если записи нет, это не ошибка
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error fetching tide data from DB:', error);
      throw error;
    }

    if (!data || !data.raw_data) {
      return null;
    }

    return data.raw_data as StormglassResponse;
  } catch (error) {
    console.error('Error in getLatestTideDataFromDB:', error);
    return null;
  }
}

/**
 * Получает время последнего запроса к API из базы данных
 */
export async function getLastFetchTime(): Promise<Date | null> {
  try {
    if (!supabaseAdmin) {
      console.warn('Supabase client is not initialized. Returning null.');
      return null;
    }

    const { data, error } = await supabaseAdmin
      .from('tide_data')
      .select('fetched_at')
      .order('fetched_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error fetching last fetch time:', error);
      return null;
    }

    if (!data || !data.fetched_at) {
      return null;
    }

    return new Date(data.fetched_at);
  } catch (error) {
    console.error('Error in getLastFetchTime:', error);
    return null;
  }
}

