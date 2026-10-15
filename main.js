// ===== Данные (пока оставляем ваш статический массив) =====
const videoObj = {
    1: 'Source/1.mp4', 2: 'Source/2.mp4', 3 : 'Source/3.mp4', 4 : 'Source/4.mp4', 5 : 'Source/5.mp4', 6 : 'Source/6.mp4', 7 : 'Source/7.mp4', 8 : 'Source/8.mp4', 9 : 'Source/9.mp4',
    10 : 'Source/10.mp4', 11 : 'Source/11.mp4', 12 : 'Source/12.mp4', 13 : 'Source/13.mp4', 14 : 'Source/14.mp4', 15 : 'Source/15.mp4', 16 : 'Source/16.mp4', 17 : 'Source/17.webm',
    18 : 'Source/18.mp4', 19 : 'Source/19.mp4', 20 : 'Source/20.mp4', 21 : 'Source/21.mp4', 22 : 'Source/22.mp4', 23 : 'Source/23.mp4', 24 : 'Source/24.mp4', 25 : 'Source/25.mp4',
    26 : 'Source/26.mp4', 27 : 'Source/27.mp4', 28 : 'Source/28.mp4', 29 : 'Source/29.mp4', 30: 'Source/30.mp4'
};

const songs = {
    //1
    'Алла Пугачёва и Владимир Кузьмин — Ветер': 0,
    'Павел Смеян и Татьяна Воронина - Ветер перемен': 1,
    'Татьяна Дасковская - Прекрасное далеко': 0,
    'Смеян Павел и Татьяна Воронина — Непогода': 0,
    //2
    'Marilyn Manson - Tourniquet': 0,
    'French Affair - Do what you like': 0,
    'Bon Jovi - Its My Life': 1,
    'Marilyn Manson - Treats Of Romanse': 0,
    //3
    'The Verve - Bitter Sweet Symphony': 0,
    'Мэри Джей Блайдж - Love is all we need': 0,
    'Celine Dion - Treat Her Like A Lady': 0,
    'Celine Dion - My Heart Will Go On': 1,
    //4
    'Валерий Меладзе и Виа Гра - Океан и три реки': 1,
    'Варвара - Сердце не плачь': 0,
    'Блестящие - Апельсиновый рай': 0,
    'Валерий Меладзе и Виа Гра - Притяженья больше нет': 0,
    //5
    'Дискотека Авария - Если хочешь остаться': 0,
    'Челси - Самая любимая': 1,
    'Челси - Я не умру без твоей любви': 0,
    'Корни - Ты узнаешь её': 0,
    //6
    'Green Day - The Sainsts are coming': 0,
    'Mustafa Sandal - All My Life': 0,
    'Pussy Cat Dolls - Stick With You': 0,
    'Nelly Furtado - Say It Right': 1,
    //7
    'Большой детский хор ЦТ и ВР - Погоня': 0,
    'Обыкновенное чудо - Прощальная песня': 0,
    'Борис Кузнецов & Лев Полосин & Хор МВО - Кап Кап Кап': 1,
    'Валерий Золотухин - Разговор о счастье': 0,
    //8
    'Michael Jackson - They Don’t Care About Us': 1,
    'The Prodigy - Breathe': 0,
    'Michael Jackson - Billie Jean': 0,
    'No Mercy - Where do you go': 0,
    //9
    'Уолт дисней - Чип и Дейл спешат на помощь': 0,
    'Уолт дисней - Спящая красавица': 0,
    'Уолт дисней - Команда Гуфи': 0,
    'Уолт дисней - Утинные истории': 1,
    //10
    'Уолт Дисней - Король Лев': 0,
    'Уолт дисней - Черный плащ': 1,
    'Мулан - Ты-боец': 0,
    'Уолт дисней - Русалочка': 0,
    //11
    'Рада Рай - Незаменимая': 0,
    'Монеточка - Переживу': 0,
    'Клава Кока - Покинула Чат': 1,
    'Анет Сай - Слезы': 0,
    //12
    'Винтаж - Дыши': 0,
    'ЛСП - Безумие': 0,
    'Саша Чест - Семь слов': 0,
    'Mozgi - Вылюби': 1,
    //13
    '8701 - U Remind Me': 0,
    'Ozzy Osbourne - "Dreamer"': 1,
    'Invincible - You Rock My World': 0,
    'Ozzy Osbourne - I Just Want You': 0,
    //14
    'Kaskade - Angel on my Shoulder': 0,
    'The Highwomen - Highwomen': 0,
    'Ariana Grande, Miley Cyrus, Lana Del Rey - Don’t Call Me Angel': 1,
    'Blackpink - Kill This Love': 0,
    //15
    'Би-2 и Ария - А Мы не Ангелы, Парень': 1,
    'Джаро - Ангелы': 0,
    'FIM - Ангелы': 0,
    'Би-2 - Легион': 0,
    //16
    'Анна Герман - Надежда': 0,
    'Анна Герман - Останься': 0,
    'Анна Герман - Когда цвели сады': 0,
    'Анна Герман - Мы эхо': 1,
    //17
    'Эпидемия - Смерти нет': 0,
    'Ария - Осколок льда': 0,
    'Эпидемия - Всадник из льда': 1,
    'Арктида - Помни': 0,
    //18
    'Fun Mode - Больно': 0,
    'Fun Mode - Наш мир': 1,
    'Эпидемия - Выбор Есть': 0,
    'Эпидемия - Придумай светлый мир': 0,
    //19
    'Drake - Black to Black': 0,
    'Little Mix - Black Magic': 0,
    'Fetty Wap - My Way': 0,
    'OMI - Cheerleader': 1,
    //20
    'Наталія Бучинська - Перемога': 1,
    'Нина Ургант - Нам нужна одна победа': 0,
    'Ярослава - Ніч яка місячна': 0,
    'Наталія Бучинська - Свято': 0,
    //21
    'М. Боярский, В. Смехов, В. Смирнитский, И. Старыгин - Баллада о дружбе': 0,
    'М. Боярский, В. Смехов, В. Смирнитский, И. Старыгин - Песня мушкетеров': 1,
    'М. Боярский, В. Смехов, В. Смирнитский, И. Старыгин - "Когда твой друг в крови..."': 0,
    'М. Боярский - Пуркуа Па': 0,
    //22
    'Земляне - Путь домой': 0,
    'Кино - Нам с тобой': 0,
    'Земляне - Трава у дома': 1,
    'Машина времени - Нажми кнопку получишь результат': 0,
    //23
    'Муслим Магомаев - Луч солнца золотого': 1,
    'Олег Анофриев - Ничего на свете лучше нет': 0,
    'Бременские музыканты - Баюшки-баю': 0,
    'Бременские музыканты - Песня Принцессы и Трубадура': 0,
    //24
    'Влад Яма - Ягодка': 0,
    'ХАБИБ - Дискотека': 0,
    'ХАБИБ - Ягодка малинка': 1,
    'ХАБИБ - Крошится в хлам': 0,
    //25
    'Dua Lipa - Levitating': 0,
    'Billie Eilish - Happier Than Ever': 0,
    'Billie Eilish - Lost Cause': 1,
    'Dua Lipa - New Rules': 0,
    //26
    'Imani - You Will Never Know': 0,
    'KAROL G, Mariah Angeliq - EL MAKINON': 0,
    'No Doubt - Don’t Speak': 0,
    'Tiësto & Karol G - Do not Be Shy': 1,
    //27
    'Vengaboys - We Like to Party': 0,
    'Peter Andre - Mysterious Girl': 1,
    'Peter Andre - Gimme Little Sign': 0,
    'Rednex - Cotton Eye Joe': 0,
    //28
    'The Cranberries - Animal Instinct': 0,
    'Alan Walker - All Falls Down': 0,
    'Sandra - Johnny Wanna Live': 1,
    'Sandra - Stop For A Minute': 0,
    //29
    'Здравствуй песня - Синий, синий иней': 1,
    'Eruption - One Way Ticket': 0,
    'Здравствуй песня - Синее небо': 0,
    'Здравствуй песня - Синяя птица': 0,
    //30
    'MONATIK - Кобра': 0,
    'MONATIK - То, от чего без ума': 0,
    'MONATIK - Кружит': 1,
    'MONATIK - Улыбаясь': 0
};

const keys = Object.keys(songs);
const keysInVideo = Object.keys(videoObj);
const answers = [7, 11, 12, 17, 24, 27, 29, 36, 38, 43, 48, 50, 55, 57, 64, 67, 70, 76, 77, 82, 87, 89, 95, 99, 104, 106, 111, 113, 119];

// ===== Состояние игры =====
const state = {
    videoIndex: 0,
    high: 4,
    index: 1,
    guessedSongs: 0,
    timer: null,
    timeLeft: 30
};

// ===== DOM-элементы =====
const viewContent = document.querySelector('#viewContent');
const buttonsBlock = document.querySelector('#ButtonsBlock');
const scoreValue = document.querySelector('#scoreValue');
const timerValue = document.querySelector('#timerValue');
const progressFill = document.querySelector('#progressFill');
const finalScreen = document.querySelector('#finalScreen');
const finalScore = document.querySelector('#finalScore');

// ===== Утилиты =====
const createButton = (text, className) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.className = className;
    return btn;
};

// ===== Инициализация =====
function init() {
    addStartButton();
    // Создаём кнопки ответов заранее, но скрываем их
    for (let i = 0; i < 4; i++) {
        const btn = createButton(keys[i], 'Buttons');
        btn.style.display = 'none';
        buttonsBlock.appendChild(btn);
    }
}

function addStartButton() {
    const startBtn = createButton('Начать игру', 'startButton');
    viewContent.appendChild(startBtn);
    startBtn.addEventListener('click', startGame);
}

function startGame() {
    document.querySelector('.startButton')?.remove();
    addControlButton();
    makeVideoElement();
    showButtons();
    startTimer();
}

function showButtons() {
    // Показываем кнопки
    buttonsBlock.style.display = 'grid';
    document.querySelectorAll('.Buttons').forEach(btn => btn.style.display = 'block');
}

// ===== Управление видео =====
function addControlButton() {
    const btn = createButton('', '');
    btn.id = 'controlButton';
    btn.innerHTML = '<i class="fa fa-play"></i>';
    viewContent.appendChild(btn);
    btn.addEventListener('click', () => togglePlay(btn));
}

function makeVideoElement() {
    const existingVideo = viewContent.querySelector('video');
    if (existingVideo) existingVideo.remove();

    const video = document.createElement('video');
    const source = document.createElement('source');
    // Проверяем, есть ли еще видео
    if (state.videoIndex < keysInVideo.length) {
        const key = videoObj[keysInVideo[state.videoIndex]];
        source.setAttribute('src', key);
    } else {
        // Если видео закончились, завершаем игру
        endGame();
        return;
    }
    
    video.setAttribute('autoplay', '');
    video.classList.add('video');
    video.appendChild(source);
    viewContent.appendChild(video);
}

function togglePlay(btn) {
    const video = viewContent.querySelector('video');
    if (!video) return;
    if (video.paused) {
        video.play();
        btn.innerHTML = '<i class="fa fa-pause"></i>';
    } else {
        video.pause();
        btn.innerHTML = '<i class="fa fa-play"></i>';
    }
}

// ===== Таймер =====
function startTimer() {
    state.timeLeft = 30;
    timerValue.textContent = state.timeLeft;
    updateProgress();
    clearInterval(state.timer);
    state.timer = setInterval(() => {
        state.timeLeft--;
        timerValue.textContent = state.timeLeft;
        updateProgress();
        if (state.timeLeft <= 0) {
            clearInterval(state.timer);
            timeOut();
        }
    }, 1000);
}

function updateProgress() {
    const percent = (state.timeLeft / 30) * 100;
    progressFill.style.width = `${percent}%`;
}

function timeOut() {
    // Показываем правильный ответ
    document.querySelectorAll('.Buttons').forEach(btn => {
        if (songs[btn.textContent] === 1) {
            btn.classList.add('trueAnswer');
        }
    });
    // Через 1.5 секунды переходим к следующему раунду
    setTimeout(nextRound, 1500);
}

// ===== Игровой раунд =====
buttonsBlock.addEventListener('click', (e) => {
    if (!e.target.classList.contains('Buttons')) return;
    const target = e.target;
    const key = target.textContent;
    clearInterval(state.timer);

    if (songs[key] === 1) {
        target.classList.add('trueAnswer');
        state.guessedSongs++;
        scoreValue.textContent = state.guessedSongs;
    } else {
        target.classList.add('falseAnswer');
        // Показываем правильный ответ
        document.querySelectorAll('.Buttons').forEach(btn => {
            if (songs[btn.textContent] === 1) btn.classList.add('trueAnswer');
        });
    }
    // Через 1.5 секунды переходим к следующему раунду
    setTimeout(nextRound, 1500);
});

function nextRound() {
    // Сброс классов
    document.querySelectorAll('.Buttons').forEach(btn => {
        btn.classList.remove('trueAnswer', 'falseAnswer');
    });

    // Проверка на конец игры
    if (state.high >= keys.length) {
        endGame();
        return;
    }

    // Обновляем кнопки
    const buttons = document.querySelectorAll('.Buttons');
    buttons.forEach((btn, i) => {
        // Проверяем, не вышли ли мы за пределы массива
        if (state.high + i < keys.length) {
            btn.textContent = keys[state.high + i];
        }
    });
    state.high += 4;

    // Меняем видео
    state.videoIndex++;
    makeVideoElement();
    startTimer();
}

function endGame() {
    clearInterval(state.timer);
    finalScore.textContent = state.guessedSongs;
    finalScreen.classList.remove('hidden');
    document.querySelector('#restartButton').addEventListener('click', () => location.reload());
}

// ===== Запуск =====
init();
