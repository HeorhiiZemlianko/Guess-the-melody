// api/proxy.js
export default async function handler(req, res) {
    const { endpoint, ...params } = req.query;
    const YOUTUBE_API_KEY = 'AIzaSyB5E0IsEF6y7KPmlOOeFipStb3u-jiXmBs'; // Вставьте сюда ваш ключ
    const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

    // Собираем URL для запроса к YouTube API
    const queryParams = new URLSearchParams({
        ...params,
        key: YOUTUBE_API_KEY,
    });

    const url = `${YOUTUBE_API_BASE}/${endpoint}?${queryParams}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Разрешаем CORS для вашего домена GitHub Pages
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch from YouTube API' });
    }
}
