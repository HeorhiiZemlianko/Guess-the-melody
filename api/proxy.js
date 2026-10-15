// api/proxy.js
export default async function handler(req, res) {
    // 1. Устанавливаем CORS-заголовки для ВСЕХ ответов
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // 2. Обрабатываем предварительный запрос OPTIONS
    if (req.method === 'OPTIONS') {
        // Отвечаем 204 (No Content) — это стандартный ответ для preflight
        return res.status(204).end();
    }

    // 3. Вся остальная логика для основного GET-запроса
    const { endpoint, ...params } = req.query;
    const YOUTUBE_API_KEY = 'AIzaSyB5E0IsEF6y7KPmlOOeFipStb3u-jiXmBs';
    const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

    const queryParams = new URLSearchParams({
        ...params,
        key: YOUTUBE_API_KEY,
    });

    const url = `${YOUTUBE_API_BASE}/${endpoint}?${queryParams}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch from YouTube API' });
    }
}
