import { CONFIG } from '../config.js';
import { itunesCache, ITUNES_CACHE_MAX } from '../state.js';

export async function fetchArtistFromItunes(trackTitle) {
    if (!trackTitle) return null;
    const cleanQuery = String(trackTitle)
        .replace(/\([^)]*\)/g, ' ').replace(/\[[^\]]*\]/g, ' ')
        .replace(/\b(official|video|audio|hd|hq|lyrics?|remaster(ed)?|clip|music|4k|mv|feat|ft)\b/gi, ' ')
        .replace(/\s+/g, ' ').trim();
    if (cleanQuery.length < 3) return null;
    const cacheKey = cleanQuery.toLowerCase();
    if (itunesCache.has(cacheKey)) return itunesCache.get(cacheKey);

    const url = `${CONFIG.PROXY_URL}?api=itunes&term=${encodeURIComponent(cleanQuery)}&media=music&entity=song&limit=5`;
    let artist = null;
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (response.ok) {
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const normalizedQuery = cleanQuery.toLowerCase();
                let bestMatch = null; let bestScore = 0;
                for (const result of data.results) {
                    const trackName = (result.trackName || '').toLowerCase();
                    const artistName = result.artistName || '';
                    const qWords = normalizedQuery.split(' ').filter(w => w.length >= 3);
                    const tWords = trackName.split(' ').filter(w => w.length >= 3);
                    const matches = qWords.filter(qw => tWords.some(tw => tw.includes(qw) || qw.includes(tw))).length;
                    const score = qWords.length > 0 ? matches / qWords.length : 0;
                    if (score > bestScore && artistName) { bestScore = score; bestMatch = artistName; }
                }
                artist = (bestMatch && bestScore >= 0.4) ? bestMatch : (data.results[0]?.artistName || null);
            }
        }
    } catch (e) { artist = null; }
    if (itunesCache.size >= ITUNES_CACHE_MAX) itunesCache.delete(itunesCache.keys().next().value);
    itunesCache.set(cacheKey, artist);
    return artist;
}
