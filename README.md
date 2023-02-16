<h1 align="center">Guess the melody</h1>

<h3 align="center">This program implements a simple concept of the famous and very common game - Guess the melody. This game can be played at this link: <a href="https://heorhiizemlianko.github.io/Guess-the-melody/">Game</a>
</h3>
<p align="center">
  <img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103" >
</p>
<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" title="html" width="50" height="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" title="css" width="50" height="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" title="js" width="50" height="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-line.svg" title="photoshop" width="50" height="50"/>
</p>

## The goal of the work
The main goal of this project is to develop a game that you can play with a company or yourself and guess the tunes, relax or escape from reality.
There are currently 30 songs in this version of the game. In the future, it is planned to expand the number of audio records.

## Task statement
<p>A simple experiment with <b>css & html & JScript</b> and test your knowledge of music and songs.</p>
<p>A demo implementation of this game can be viewed again at this link:<a href="https://heorhiizemlianko.github.io/Guess-the-melody/"> <b>Play Game</b> </a></p>


## Schematic representation of the HTML structure
```
html
├── head
│   ├── meta
│   ├── title
│   ├── link
│   ├── link
│   └── link
├── body
│   └── div.wrapper
│   	├── div#viewContent
│   	│   └── p#counter
│   	└── div#ButtonsBlock
└── script
```

## Schematic representation of the CSS structure
```
css
├── *
├── body
├── source
├── .video
├── .blur
├── .wrapper
├── .startButton
├── .Buttons
├── .Buttons:first-child
├── .Buttons:hover 
├── #ButtonsBlock
├── #controlButton
├── .falseAnswer
├── .trueAnswer
└── #counter
```

## Schematic representation of the JS structure
```
Javascript
├── addStartButton()
├── addControlButton()
├── isShow(element, prop)
├── addMelodyButton(text)
├── installButton()
├── removeButton(name)
├── itemDone(e)
├── checkAnswer(target)
├── toggleIcon(controlButton, videoElement)
├── togglePlayVideo(videoElement) 
├── removeBlur()
├── addListener() 
├── addNextSongs()
├── audioChange()
├── removeClass()
├── removeElements()
├── changeCounter()
├── makeVideoElement()
├── changeVideo() 
└── makeVideoElement() 
```

## Code from the project
- HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Music Battle</title>
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <link rel="stylesheet" href="Styles.css">
</head>
<body>
<div class="wrapper">
  <div id="viewContent">
      <p id="counter"></p>
  </div>
    <div id="ButtonsBlock"></div>
</div>
<script src="main.js" type="text/javascript"></script>
</body>
</html>
```
- CSS
```css
* {
    padding: 0;
    margin: 0;
}

body {
    background-color: #000;
}

source, .video  {
    width: 100%;
    height: 75%;
    position: absolute;
    
    ........
    
    #controlButton:hover {
    border-radius: 10px;
}

.falseAnswer {
    background: red;
}

.trueAnswer {
    background: lawngreen;
    color: darkgreen;
}

#counter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 60px;
    color: whitesmoke;
}
```
- JavaScript
```JavaScript
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

......

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

.....

function changeVideo() {
    function remove() {
        document.querySelector('.video').remove();
    }
    remove();
    VideoIndex += 1;
}

.....

//видео материал
const videoObj = {
    1 : 'Source/1.mp4',
    2 : 'Source/2.mp4',
    3 : 'Source/3.mp4',
    4 : 'Source/4.mp4',
          .....
    28 : 'Source/28.mp4',
    29 : 'Source/29.mp4',
    30 : 'Source/30.mp4'
};

.....

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

.......

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
```
