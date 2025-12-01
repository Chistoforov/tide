import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Создаем клиент только если переменные окружения доступны
// При сборке, если переменные не установлены, создаем клиент с пустыми строками
// Ошибка будет выброшена при реальном использовании в runtime
function createSupabaseAdmin(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseServiceKey) {
    // При сборке не выбрасываем ошибку, чтобы не ломать build
    // В runtime ошибка будет выброшена при попытке использования
    if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
      // В production на сервере это критично
      console.warn('Missing Supabase environment variables. Some features may not work.');
    }
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Используем service role key для серверных операций (запись в БД)
// Может быть null, если переменные окружения не установлены
export const supabaseAdmin: SupabaseClient | null = createSupabaseAdmin();

