-- Скрипт для отключения RLS на таблице tide_data
-- Выполните этот SQL в Supabase Dashboard → SQL Editor

-- Отключаем RLS для таблицы tide_data
-- Это необходимо, чтобы service role key мог читать данные
ALTER TABLE tide_data DISABLE ROW LEVEL SECURITY;

-- Проверяем, что RLS отключен
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'tide_data';

-- Если нужно включить RLS обратно (не рекомендуется для этой таблицы):
-- ALTER TABLE tide_data ENABLE ROW LEVEL SECURITY;

