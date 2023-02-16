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
<p>A demo implementation of this game can be viewed again at this link:<a href="https:https://heorhiizemlianko.github.io/Guess-the-melody/"> <b>Play Game</b> </a></p>

## Schematic representation of the HTML structure
```
html
├── head
│   ├── meta
│   ├── title
│   └── link
└── body
    ├── div.container
        ├── img
        ├── img
        ├── img
        └── img
```

## Schematic representation of the CSS structure
```
css
├── body
├── .container
├── .container img
├── .container:hover img: ntn-child(4)
├── .container:hover img: ntn-child(3)
├── .container:hover img: ntn-child(2)
└── .container:hover img: ntn-child(1)
```

## Code from the project
- HTML
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>3D Layer Image Hover Effect</title>
	<link rel="stylesheet" type="text/css" href="3dimaje.css">
</head>
<body>
	<div class="container">
		<img src="05_Navigation_Menu.jpg">
		<img src="05_Navigation_Menu.jpg">
		<img src="05_Navigation_Menu.jpg">
		<img src="05_Navigation_Menu.jpg">
	</div>
</body>
</html>
```
- CSS
```css
body{
	margin: 0;
	padding: 0;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
}
.container{
	position: relative;
	width: 250px;
	height: 415px;
	background: rgba(0,0,0,0.1);
	transform: rotate(-30deg) skew(25deg);
	transition: 0.5s;
}
.container img{
	position: absolute;
	width: 100%;
	transition: 0.5s;
}
.container:hover img:nth-child(4){
	transform: translate(120px, -120px);
	opacity: 1;
}
.container:hover img:nth-child(3){
	transform: translate(90px, -90px);
	opacity: .8;
}
.container:hover img:nth-child(2){
	transform: translate(60px, -60px);
	opacity: .6;
}
.container:hover img:nth-child(1){
	transform: translate(30px, -30px);
	opacity: .4;
}
```
