function addStartButton() {
    let startButton = document.createElement('button'),
        textInBut = document.createTextNode('Start the Game!');
    startButton.appendChild(textInBut);
    startButton.className = 'startButton';
    wrapper.insertBefore(startButton, buttonsBlock); //(element, nextSibling)
    buttonsBlock.style.display = 'none';
}

function addControlButton() {
    let button = document.createElement('button');
    button.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    wrapper.insertBefore(button, buttonsBlock);
    button.setAttribute('id', 'controlButton');
}

function isShow(element, prop) {
    element.style.display = prop;
}

function addMelodyButton(text) {
    let Button = document.createElement("button"),
        textNodeName = document.createTextNode(text);
    Button.appendChild(textNodeName);
    buttonsBlock.appendChild(Button);
    Button.className = 'Buttons';
    Button.style.display = 'none';
}

function installButton() {
    for(let i = 0; i < 4; i++) {
        addMelodyButton(keys[i]);
    }
}

function removeButton(name) {
    wrapper.removeChild(name);
}

function itemDone(e) {
    let target;
    target = e.target;
    if (target.classList.contains('Buttons')) {
        checkAnswer(target);
        removeBlur();
        removeElements();
        setTimeout(stop, 1500);
        setTimeout(removeClass, 2000);
        setTimeout(addNextSongs, 2000);
        setTimeout(makeVideoElement, 2000);
        setTimeout(changeVideo, 500);
    }
}

function checkAnswer(target) {
    if (target.classList.contains('Buttons'))
    {
        let key = target.innerHTML;
        if (songs[key] !== 0) {
        target.classList.add("trueAnswer");
            guessedSongs += 1;
    } else {
        target.classList.add("falseAnswer");
        //buttons[n].classList.add("trueAnswer");
        }
    }
}

function toggleIcon(controlButton, videoElement) {
    videoElement.paused ? controlButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>' : controlButton.innerHTML = '<i class="fas fa-pause"></i>';
}

function togglePlayVideo(videoElement) {
    videoElement.paused ? videoElement.play() : videoElement.pause();
}

function  removeBlur() {
    document.querySelector('.blur').classList.remove('blur');
    console.log('wasCalled');
}

function addListener() {
    let controlButton = document.querySelector('#controlButton');
        controlButton.addEventListener('click', () => {
            let videoElement = document.querySelector('.video');
            togglePlayVideo(videoElement);
        toggleIcon(controlButton,videoElement );
    }, false);
}

function addNextSongs() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = keys[high];
        high += 1;
    }
    audioChange();
}

function audioChange() {
    n = answers[index];
    index += 1;
}

function removeClass() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('trueAnswer', 'falseAnswer');
    }
}

function removeElements() {
    //Количество всего строк вариантов выбора ответов
    if (high === 120) {
        for (let i = 0; i < buttons.length; i++) {
            isShow(buttons[i],'none');
        }
        let b = document.querySelector('#controlButton');
        isShow(b, 'none');
        changeCounter();
    }
}

function changeCounter() {
    elCounter.textContent = 'Guessed melody:' + guessedSongs;
}

function makeVideoElement() {
    let video = document.createElement('video'),
        source = document.createElement("source"),
        key = videoObj[keysInVideo[VideoIndex]];
    source.setAttribute('src', key);
    video.setAttribute('autoplay', '');
    video.classList.add('video', 'blur');
    video.appendChild(source);
    viewContent.appendChild(video);
}

function changeVideo() {
    function remove() {
        document.querySelector('.video').remove();
    }
    remove();
    VideoIndex += 1;
}

changeBG = () => {
  wrapper.style.background = 'black'
};
//видео материал
const videoObj = {
    1 : 'Source/1.mp4',
    2 : 'Source/2.mp4',
    3 : 'Source/3.mp4',
    4 : 'Source/4.mp4',
    5 : 'Source/5.mp4',
    6 : 'Source/6.mp4',
    7 : 'Source/7.mp4',
    8 : 'Source/8.mp4',
    9 : 'Source/9.mp4',
    10 : 'Source/10.mp4',
    11 : 'Source/11.mp4',
    12 : 'Source/12.mp4',
    13 : 'Source/13.mp4',
    14 : 'Source/14.mp4',
    15 : 'Source/15.mp4',
    16 : 'Source/16.mp4',
    17 : 'Source/17.webm',
    18 : 'Source/18.mp4',
    19 : 'Source/19.mp4',
    20 : 'Source/20.mp4',
    21 : 'Source/21.mp4',
    22 : 'Source/22.mp4',
    23 : 'Source/23.mp4',
    24 : 'Source/24.mp4',
    25 : 'Source/25.mp4',
    26 : 'Source/26.mp4',
    27 : 'Source/27.mp4',
    28 : 'Source/28.mp4',
    29 : 'Source/29.mp4',
    30 : 'Source/30.mp4'
};
//варианты ответов к клипам и песням
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
//проверка и соотношение верных ответов
const keys = Object.keys(songs),
      keysInVideo = Object.keys(videoObj),
      answers = [7, 11, 12, 17, 24, 27, 29, 36, 38, 43, 48, 50, 55, 57, 64, 67, 70, 76, 77, 82, 87, 89, 95, 99, 104, 106, 111, 113, 119],
      elCounter = document.querySelector('#counter');
//переменная ответа, количество вариантов ответа
var n = 7,
    VideoIndex = 0,
    high = 4,
    index = 1,
    guessedSongs = 0;

const wrapper = document.querySelector('.wrapper'),
      buttonsBlock = document.querySelector('#ButtonsBlock'),
      viewContent = document.querySelector('#viewContent');
    addStartButton();
    installButton();
const startButton = document.querySelector('.startButton'),
      buttons = document.querySelectorAll('.Buttons');

buttonsBlock.addEventListener('click', (e) => {
    itemDone(e);
}, false);

startButton.addEventListener('click', () => {
    removeButton(startButton);
    changeBG();
    addControlButton();
    addListener();
    makeVideoElement();
    isShow(buttonsBlock,'block');
    for (let i = 0; i < buttons.length; i++) {
        isShow(buttons[i],'block');
    }
}, false);


