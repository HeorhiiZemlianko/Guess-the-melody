import { CONFIG } from '../config.js';
import { state } from '../state.js';

export async function fetchPlaylistTracks() {
    let sourceArray = CONFIG.PLAYLISTS;
    if (state.mode.key === 'thematic' && CONFIG.THEMES[state.theme]) {
        sourceArray = CONFIG.THEMES[state.theme];
    }

    // 1. Выбираем 3 случайных плейлиста (или меньше, если их всего 1–2)
    const playlistsToTry = [...sourceArray]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    const allTracks = [];

    // 2. Параллельно запрашиваем треки из выбранных плейлистов
    const requests = playlistsToTry.map(async (playlistId) => {
        try {
            const url = `${CONFIG.PROXY_URL}?endpoint=playlistItems&part=snippet&playlistId=${playlistId}&maxResults=15`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.items) {
                return data.items.map(item => ({
                    title: item.snippet.title,
                    videoId: item.snippet.resourceId.videoId,
                    channel: item.snippet.videoOwnerChannelTitle || item.snippet.channelTitle
                })).filter(t => t.videoId);
            }
        } catch (error) {
            console.error('Ошибка загрузки плейлиста:', playlistId, error);
        }
        return [];
    });

    const results = await Promise.all(requests);
    results.forEach(tracks => allTracks.push(...tracks));

    // 3. Убираем дубликаты по videoId и перемешиваем
    const uniqueTracks = Array.from(
        new Map(allTracks.map(t => [t.videoId, t])).values()
    );

    return uniqueTracks.sort(() => 0.5 - Math.random());
}

const RANDOM_QUERIES = {
    rock: ['rock classic', 'rock hits', 'indie rock', 'alternative rock', 'hard rock'],
    pop: ['pop hits', 'top pop', 'pop music', 'dance pop', 'synth pop'],
    retro: ['80s hits', '90s hits', 'retro music', 'classic hits', 'oldies']
};

export async function fetchRandomSearchTracks(theme = 'pop') {
    const queries = RANDOM_QUERIES[theme] || RANDOM_QUERIES.pop;
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];

    try {
        const url = `${CONFIG.PROXY_URL}?endpoint=search&part=snippet&type=video&videoCategoryId=10&q=${encodeURIComponent(randomQuery)}&maxResults=20&order=relevance`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.items || data.items.length === 0) return [];

        return data.items.map(item => ({
            title: item.snippet.title,
            videoId: item.id.videoId,
            channel: item.snippet.channelTitle
        })).filter(t => t.videoId);
    } catch (error) {
        console.error('Ошибка поиска треков:', error);
        return [];
    }
}
