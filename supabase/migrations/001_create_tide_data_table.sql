-- Создание таблицы для хранения данных о приливах
CREATE TABLE IF NOT EXISTS tide_data (
  id BIGSERIAL PRIMARY KEY,
  fetched_at TIMESTAMPTZ NOT NULL,
  raw_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Создание индекса для быстрого поиска последней записи
CREATE INDEX IF NOT EXISTS idx_tide_data_fetched_at ON tide_data(fetched_at DESC);

-- Отключаем RLS для этой таблицы, так как доступ осуществляется через service role key
-- Service role key обходит RLS, но лучше явно отключить для избежания проблем
ALTER TABLE tide_data DISABLE ROW LEVEL SECURITY;

-- Комментарии к таблице и колонкам
COMMENT ON TABLE tide_data IS 'Таблица для хранения данных о приливах, полученных от Stormglass API';
COMMENT ON COLUMN tide_data.fetched_at IS 'Время получения данных от API';
COMMENT ON COLUMN tide_data.raw_data IS 'Полные данные от Stormglass API в формате JSON';
COMMENT ON COLUMN tide_data.created_at IS 'Время создания записи в базе данных';


