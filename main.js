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
    //???????????????????? ?????????? ?????????? ?????????????????? ???????????? ??????????????
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
//?????????? ????????????????
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
//???????????????? ?????????????? ?? ???????????? ?? ????????????
const songs = {
    //1
    '???????? ???????????????? ?? ???????????????? ?????????????? ??? ??????????': 0,
    '?????????? ?????????? ?? ?????????????? ???????????????? - ?????????? ??????????????': 1,
    '?????????????? ???????????????????? - ???????????????????? ????????????': 0,
    '?????????? ?????????? ?? ?????????????? ???????????????? ??? ????????????????': 0,
    //2
    'Marilyn Manson - Tourniquet': 0,
    'French Affair - Do what you like': 0,
    'Bon Jovi - Its My Life': 1,
    'Marilyn Manson - Treats Of Romanse': 0,
    //3
    'The Verve - Bitter Sweet Symphony': 0,
    '???????? ???????? ???????????? - Love is all we need': 0,
    'Celine Dion - Treat Her Like A Lady': 0,
    'Celine Dion - My Heart Will Go On': 1,
    //4
    '?????????????? ?????????????? ?? ?????? ?????? - ?????????? ?? ?????? ????????': 1,
    '?????????????? - ???????????? ???? ??????????': 0,
    '?????????????????? - ???????????????????????? ??????': 0,
    '?????????????? ?????????????? ?? ?????? ?????? - ???????????????????? ???????????? ??????': 0,
    //5
    '?????????????????? ???????????? - ???????? ???????????? ????????????????': 0,
    '?????????? - ?????????? ??????????????': 1,
    '?????????? - ?? ???? ???????? ?????? ?????????? ??????????': 0,
    '?????????? - ???? ?????????????? ????': 0,
    //6
    'Green Day - The Sainsts are coming': 0,
    'Mustafa Sandal - All My Life': 0,
    'Pussy Cat Dolls - Stick With You': 0,
    'Nelly Furtado - Say It Right': 1,
    //7
    '?????????????? ?????????????? ?????? ???? ?? ???? - ????????????': 0,
    '???????????????????????? ???????? - ???????????????????? ??????????': 0,
    '?????????? ???????????????? & ?????? ?????????????? & ?????? ?????? - ?????? ?????? ??????': 1,
    '?????????????? ?????????????????? - ???????????????? ?? ??????????????': 0,
    //8
    'Michael Jackson - They Don???t Care About Us': 1,
    'The Prodigy - Breathe': 0,
    'Michael Jackson - Billie Jean': 0,
    'No Mercy - Where do you go': 0,
    //9
    '???????? ???????????? - ?????? ?? ???????? ???????????? ???? ????????????': 0,
    '???????? ???????????? - ???????????? ??????????????????': 0,
    '???????? ???????????? - ?????????????? ????????': 0,
    '???????? ???????????? - ?????????????? ??????????????': 1,
    //10
    '???????? ???????????? - ???????????? ??????': 0,
    '???????? ???????????? - ???????????? ????????': 1,
    '?????????? - ????-????????': 0,
    '???????? ???????????? - ??????????????????': 0,
    //11
    '???????? ?????? - ??????????????????????': 0,
    '?????????????????? - ????????????????': 0,
    '?????????? ???????? - ???????????????? ??????': 1,
    '???????? ?????? - ??????????': 0,
    //12
    '???????????? - ????????': 0,
    '?????? - ??????????????': 0,
    '???????? ???????? - ???????? ????????': 0,
    'Mozgi - ????????????': 1,
    //13
    '8701 - U Remind Me': 0,
    'Ozzy Osbourne - "Dreamer"': 1,
    'Invincible - You Rock My World': 0,
    'Ozzy Osbourne - I Just Want You': 0,
    //14
    'Kaskade - Angel on my Shoulder': 0,
    'The Highwomen - Highwomen': 0,
    'Ariana Grande, Miley Cyrus, Lana Del Rey - Don???t Call Me Angel': 1,
    'Blackpink - Kill This Love': 0,
    //15
    '????-2 ?? ???????? - ?? ???? ???? ????????????, ????????????': 1,
    '?????????? - ????????????': 0,
    'FIM - ????????????': 0,
    '????-2 - ????????????': 0,
    //16
    '???????? ???????????? - ??????????????': 0,
    '???????? ???????????? - ????????????????': 0,
    '???????? ???????????? - ?????????? ?????????? ????????': 0,
    '???????? ???????????? - ???? ??????': 1,
    //17
    '???????????????? - ???????????? ??????': 0,
    '???????? - ?????????????? ????????': 0,
    '???????????????? - ?????????????? ???? ????????': 1,
    '?????????????? - ??????????': 0,
    //18
    'Fun Mode - ????????????': 0,
    'Fun Mode - ?????? ??????': 1,
    '???????????????? - ?????????? ????????': 0,
    '???????????????? - ???????????????? ?????????????? ??????': 0,
    //19
    'Drake - Black to Black': 0,
    'Little Mix - Black Magic': 0,
    'Fetty Wap - My Way': 0,
    'OMI - Cheerleader': 1,
    //20
    '?????????????? ?????????????????? - ????????????????': 1,
    '???????? ???????????? - ?????? ?????????? ???????? ????????????': 0,
    '???????????????? - ?????? ?????? ??????????????': 0,
    '?????????????? ?????????????????? - ??????????': 0,
    //21
    '??. ????????????????, ??. ????????????, ??. ??????????????????????, ??. ???????????????? - ?????????????? ?? ????????????': 0,
    '??. ????????????????, ??. ????????????, ??. ??????????????????????, ??. ???????????????? - ?????????? ????????????????????': 1,
    '??. ????????????????, ??. ????????????, ??. ??????????????????????, ??. ???????????????? - "?????????? ???????? ???????? ?? ??????????..."': 0,
    '??. ???????????????? - ???????????? ????': 0,
    //22
    '?????????????? - ???????? ??????????': 0,
    '???????? - ?????? ?? ??????????': 0,
    '?????????????? - ?????????? ?? ????????': 1,
    '???????????? ?????????????? - ?????????? ???????????? ???????????????? ??????????????????': 0,
    //23
    '???????????? ???????????????? - ?????? ???????????? ????????????????': 1,
    '???????? ???????????????? - ???????????? ???? ?????????? ?????????? ??????': 0,
    '???????????????????? ?????????????????? - ????????????-??????': 0,
    '???????????????????? ?????????????????? - ?????????? ?????????????????? ?? ??????????????????': 0,
    //24
    '???????? ?????? - ????????????': 0,
    '?????????? - ??????????????????': 0,
    '?????????? - ???????????? ??????????????': 1,
    '?????????? - ???????????????? ?? ????????': 0,
    //25
    'Dua Lipa - Levitating': 0,
    'Billie Eilish - Happier Than Ever': 0,
    'Billie Eilish - Lost Cause': 1,
    'Dua Lipa - New Rules': 0,
    //26
    'Imani - You Will Never Know': 0,
    'KAROL G, Mariah Angeliq - EL MAKINON': 0,
    'No Doubt - Don???t Speak': 0,
    'Ti??sto & Karol G - Do not Be Shy': 1,
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
    '???????????????????? ?????????? - ??????????, ?????????? ????????': 1,
    'Eruption - One Way Ticket': 0,
    '???????????????????? ?????????? - ?????????? ????????': 0,
    '???????????????????? ?????????? - ?????????? ??????????': 0,
    //30
    'MONATIK - ??????????': 0,
    'MONATIK - ????, ???? ???????? ?????? ??????': 0,
    'MONATIK - ????????????': 1,
    'MONATIK - ????????????????': 0
};
//???????????????? ?? ?????????????????????? ???????????? ??????????????
const keys = Object.keys(songs),
      keysInVideo = Object.keys(videoObj),
      answers = [7, 11, 12, 17, 24, 27, 29, 36, 38, 43, 48, 50, 55, 57, 64, 67, 70, 76, 77, 82, 87, 89, 95, 99, 104, 106, 111, 113, 119],
      elCounter = document.querySelector('#counter');
//???????????????????? ????????????, ???????????????????? ?????????????????? ????????????
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


