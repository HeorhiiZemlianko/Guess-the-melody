import { CONFIG } from '../config.js';
import { state } from '../state.js';

export async function fetchPlaylistTracks() {
    let attempts = 0;
    const maxAttempts = 5;

    let sourceArray = CONFIG.PLAYLISTS;
    if (state.mode.key === 'thematic' && CONFIG.THEMES[state.theme]) {
        sourceArray = CONFIG.THEMES[state.theme];
    }

    while (attempts < maxAttempts) {
        attempts++;
        try {
            const randomPlaylistId = sourceArray[Math.floor(Math.random() * sourceArray.length)];
            const url = `${CONFIG.PROXY_URL}?endpoint=playlistItems&part=snippet&playlistId=${randomPlaylistId}&maxResults=30`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.items && data.items.length >= 4) {
                return data.items.map(item => ({
                    title: item.snippet.title,
                    videoId: item.snippet.resourceId.videoId,
                    channel: item.snippet.videoOwnerChannelTitle || item.snippet.channelTitle
                })).filter(t => t.videoId);
            }
        } catch (error) { console.error('Ошибка загрузки:', error); }
    }
    return [];
}
