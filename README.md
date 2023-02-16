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
