export default async function handler(req, res) {
    // 1. CORS-заголовки для всех ответов
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // 2. Preflight
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    // 3. Определяем, какой API проксировать
    const { api, ...params } = req.query;
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
        const queryParams = new URLSearchParams({
            ...params,
            key: YOUTUBE_API_KEY,
        });
        url = `${YOUTUBE_API_BASE}/${params.endpoint}?${queryParams}`;
        // Убираем endpoint из queryParams, чтобы не дублировался
        queryParams.delete('endpoint');
        url = `${YOUTUBE_API_BASE}/${params.endpoint}?${queryParams}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ error: 'Failed to fetch from external API' });
    }
}
