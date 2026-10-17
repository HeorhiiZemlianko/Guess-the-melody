/*
 * Guess-the-melody — интерактивная музыкальная викторина.
 * Copyright (C) 2026 Heorhii Zemlianko
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

export default async function handler(req, res) {
    // 1. CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    // 2. Ключ берём из переменных окружения
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    if (!YOUTUBE_API_KEY) {
        console.error('YOUTUBE_API_KEY is not set');
        return res.status(500).json({ error: 'Server misconfigured: missing API key' });
    }

    const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
    const ITUNES_API_BASE = 'https://itunes.apple.com';

    const { api, endpoint, ...params } = req.query;
    let url;

    if (api === 'itunes') {
        const queryParams = new URLSearchParams(params);
        url = `${ITUNES_API_BASE}/search?${queryParams}`;
    } else {
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

        if (data.error) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ error: 'Failed to fetch from external API' });
    }
}
