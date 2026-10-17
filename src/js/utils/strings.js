export function normalizeStr(str) {
    return String(str).toLowerCase()
        .replace(/\([^)]*\)/g, ' ')
        .replace(/\[[^\]]*\]/g, ' ')
        .replace(/\b(official|video|audio|hd|hq|remaster(ed)?|lyrics?|clip|music|4k|mv|feat|ft)\b/gi, ' ')
        .replace(/[^a-zа-яё0-9\s]/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

export function cleanArtistName(name) {
    return String(name)
        .replace(/\s*-\s*topic$/i, '')
        .replace(/vevo$/i, '')
        .replace(/\s*official(\s+(music|video|channel|artist|audio))?$/i, '')
        .replace(/\s+records?$/i, '')
        .replace(/\s+music$/i, '')
        .trim();
}

export function extractArtistFromTitle(title) {
    if (!title) return null;
    const clean = String(title).replace(/\([^)]*\)/g, '').replace(/\[[^\]]*\]/g, '').trim();
    const match = clean.match(/^(.{2,60}?)\s*[-–—]\s+/);
    if (!match) return null;
    const candidate = match[1].trim()
        .replace(/\b(official|video|audio|hd|hq|lyrics?|mv|4k|clip)\b/gi, '')
        .replace(/\s+/g, ' ').trim();
    return candidate.length >= 2 ? candidate : null;
}
