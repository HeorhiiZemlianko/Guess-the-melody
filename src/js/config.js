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

export const DIFFICULTIES = {
    easy:     { key: 'easy',     name: 'Лёгкий',   optionsCount: 4, duration: 60, totalRounds: 10, hardcore: false, multiplier: 1    },
    medium:   { key: 'medium',   name: 'Средний',  optionsCount: 4, duration: 30, totalRounds: 15, hardcore: false, multiplier: 1.25 },
    hard:     { key: 'hard',     name: 'Сложный',  optionsCount: 6, duration: 15, totalRounds: 20, hardcore: false, multiplier: 1.5  },
    hardcore: { key: 'hardcore', name: 'Хардкор',  optionsCount: 0, duration: 60, totalRounds: 10, hardcore: true,  multiplier: 2    }
};

// Сложности специально для режима Блиц
export const BLITZ_DIFFICULTIES = {
    easy: {
        key: 'easy',
        name: 'Лёгкий',
        optionsCount: 4,
        blitzTime: 60,
        blitzBonus: 5,
        blitzPenalty: 3,
        multiplier: 1
    },
    medium: {
        key: 'medium',
        name: 'Средний',
        optionsCount: 4,
        blitzTime: 60,
        blitzBonus: 3,
        blitzPenalty: 4,
        multiplier: 1.25
    },
    hard: {
        key: 'hard',
        name: 'Сложный',
        optionsCount: 6,
        blitzTime: 45,
        blitzBonus: 3,
        blitzPenalty: 5,
        multiplier: 1.5
    }
};

export const GAME_MODES = {
    classic:  { key: 'classic',  name: 'Классический' },
    blitz:    { key: 'blitz',    name: 'Блиц' },
    survival: { key: 'survival', name: 'Выживание' },
    duel:     { key: 'duel',     name: 'Дуэль' },
    thematic: { key: 'thematic', name: 'Тематический' }
};

export const HINT_COSTS = { remove2: 100, artist: 150, time: 75, skip: 200 };

export const CONFIG = {
    PROXY_URL: 'https://guessthemelody.vercel.app/api/proxy',
    START_TIME: 15,
    HIGH_SCORE_KEY: 'musicBattleHighScore_v1',
    PLAYLISTS: [
        'PL45_r-J4SdAFM0PbG6QeqVpLu975CK9Ip', 'PL0GvsLQil0MmYC96KEs_7dTNsLm1PS6JX', 'PLd5lauRj72uJdKMqnZK6gqQRdr5nGlHlg', 'PLGBuKfnErZlAdX8X5LC9ODeHaxoxTuV2z',
        'PLn4GvABOzCQursVQ7qMU9CkNaKz4RgrVM', 'PLplXQ2cg9B_qrCVd1J_iId5SvP8Kf_BfS', 'PLa2a9FJY91_0x1s4eq6mf9b91m3Pahv0G', 'PLLRIXAxtV8zwSNxHwvdMVsxshybCCyuRT',
        'PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU', 'PLDIoUOhQQPlWc-Kd6TCjTRIl0Z6fSQV0X', 'PLK8eO9itnhzfKFSQJ28kExpwZAv7TdvnA', 'PLvMVt4c68EeXRV2R1fdieei9HwpuUKXKL',
        'PLpxuOeEi0yCQtge9JUBOH--_yqg-jUm4h', 'PL4sJ8-_X2ESCrsyPWS8sUyU6z1Ssv6a9V', 'PLmXxqSJJq-yXrCPGIT2gn8b34JjOrl4Xf', 'PLG5FRq89_oJ40pbXEQ2AxA5rYu7hefUor',
        'PLMZxug3Hi7FaQ4HE-NEt9qpG2lvABRiwf', 'PLGBuKfnErZlBUh0KAYO3MvJ0bGqVZkhuG', 'PLw-VjHDlEOgtH-Ce-dJzPOtIm5xTVC4t2', 'PL9WAfiI0yDE-EQjgQ3eoD_WKP-FvwuwoW',
        'PL2hGGKKbxvqKJltSpqWA-IsKrZjJGkN0f', 'PL4fGSI1pDJn4E_HoW5HB-w5vFPkYfo3dB', 'PL-X-RdKBc6bZn4ikgv6ePzT5huW9Skp22', 'PLUU0HxYhx6SYAXu61BOGo8RmmHU38DThS',
        'PLw7pKYWfLkB7BE3_vJDhREZMX9ygFE89D', 'PLXAfqIM-LFu5zBMsv-wK4h6-OfLtSyBYG', 'PLNgxbIxenTkPp6etGScybfrECfbXm2ZUz', 'PLxD4o4XAOgl8Hx3AKFLb9st5TKs2oVMRv',
    ],
    THEMES: {
        rock: ['PLVQ7g3e6O27cH8KG9mktLWH8zcqiwTntP', 'PLGBuKfnErZlAdX8X5LC9ODeHaxoxTuV2z', 'PL6Lt9p1lIRZ311J9ZHuzkR5A3xesae2pk','PL9faRedFTjILdTd-x9I8Tr8Gf_EsqNJHd', 'PLFPDSa9XlTPDiUr-fwfDodSzAeY5F90mD', 'PLWUuMxUJvnuKDF9DncRGZPKssW0G7uyLi', 'PL58q25FsnmT9OeZZphRa0Ab_H1iLlgyB4', 'PL6Lt9p1lIRZ3m2X1Ur8ykG1XRGPFsTsbD'],
        pop:  ['PLa2a9FJY91_0x1s4eq6mf9b91m3Pahv0G', 'PLplXQ2cg9B_qrCVd1J_iId5SvP8Kf_BfS', 'PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG','PLcirGkCPmbmFeQ1sm4wFciF03D_EroIfr', 'PLmXxqSJJq-yXrCPGIT2gn8b34JjOrl4Xf', 'PL3-sRm8xAzY9gpXTMGVHJWy_FMD67NBed', 'PLWxeHRAhDczu5iQNJ_YAXbFpU7MVIbnh0', 'PLun_CS7whKh41vE528IS7DpqnQ7U1fan6', 'PL9WAfiI0yDE-EQjgQ3eoD_WKP-FvwuwoW', 'PLQdn7YisXz3PS9dJjn3H35ohAkXleMoVM'],
        retro:['PLwNv9Hhd8gZjNoQdpd2kBa3fwXNeJjzDX', 'PLTRHNF4SwluwOKMpuKTUqAT3nStpYaNXo', 'PLo3LXdjE00ijKvAX0fR2j5wUKW7Iu7rM-','PLXAfqIM-LFu5zBMsv-wK4h6-OfLtSyBYG', 'PLEXox2R2RxZKyTTlt3kxvtJbI_Cw1K1IX', 'PLMZxug3Hi7FaImYvoXxfzJFa0Y7iTsqOZ', 'PLw-VjHDlEOgtH-Ce-dJzPOtIm5xTVC4t2', 'PLGBuKfnErZlCkRRgt06em8nbXvcV5Sae7']
    }
};
