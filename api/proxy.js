export default async function handler(req, res) {
    // 1. Устанавливаем CORS-заголовки для ВСЕХ ответов (включая ошибки)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // 2. Обрабатываем предварительный запрос OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    // 3. Основная логика
    const { api, endpoint, ...params } = req.query;
    const YOUTUBE_API_KEY = 'AIzaSyB5E0IsEF6y7KPmlOOeFipStb3u-jiXmBs';
    const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
    const ITUNES_API_BASE = 'https://itunes.apple.com';

    let url;

    if (api === 'itunes') {
        // iTunes Search API — ключ не нужен
        const queryParams = new URLSearchParams(params);
        url = `${ITUNES_API_BASE}/search?${queryParams}`;
    } else {
        // По умолчанию — YouTube Data API
        // Проверяем, что endpoint передан
        if (!endpoint) {
            return res.status(400).json({ error: 'Missing endpoint parameter' });
        }
        const queryParams = new URLSearchParams({
            ...params,
            key: YOUTUBE_API_KEY,
        });
        url = `${YOUTUBE_API_BASE}/${endpoint}?${queryParams}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Если YouTube вернул ошибку, передаем её статус
        if (data.error) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        // Важно: заголовки CORS уже установлены в начале, поэтому браузер прочитает ошибку
        return res.status(500).json({ error: 'Failed to fetch from external API' });
    }
}
