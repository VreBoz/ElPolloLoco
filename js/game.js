// Variablen
let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let gameStarted = false;

// Audio
let themeSound = new Audio('../audio/game-theme.mp3');
themeSound.volume = 0.5;

// Elemente
let playButton;
let muteButton;
let leftButton;
let rightButton;
let jumpButton;
let throwBottle;

// Funktionen

// Bereitstellen des Codes, wenn das Dokument geladen wurde
document.addEventListener('DOMContentLoaded', (event) => {
    // Referenz auf das turn-device-Element
    let turnDeviceElement = document.querySelector('#turn-device');

    // Funktion zum Überprüfen der Bildschirmausrichtung und der Breite
    function checkOrientation() {
        // Wenn die Ausrichtung Querformat ist und die Breite größer oder gleich 720px ist
        if (window.screen.orientation.type.includes('landscape') && window.innerWidth >= 620) {
            turnDeviceElement.style.display = 'none';
        } else {
            turnDeviceElement.style.display = 'flex';
        }
    }

    // Überprüfen der Bildschirmausrichtung und der Breite, wenn das Fenster geladen oder die Größe geändert wird
    window.addEventListener('load', checkOrientation);
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
});

function fullscreen() {
    const element = document.documentElement; // Änderung hier
  
    if (element) {
      enterFullscreen(element);
    }
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
}

function toggleFullscreen() {
    const canvas = document.getElementById("game-container");

    if (document.fullscreenElement) {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    } else {
        // Enter fullscreen
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        }
    }
}
  
  


function expandHowToPlay() {
    const howToPlay = document.getElementById('how-to-play');
    howToPlay.classList.add('expanded');
    howToPlay.innerHTML = `
        <button id="close-button" onclick="closeHowToPlay(event)">X</button>
        <h3>How to Play !</h3>
        <ol>
            <li>Goal: Your objective is to defeat the Endboss.</li>
            <li>Enemies: You will encounter Chickens as your enemies.</li>
            <li>Defeating Enemies: Jump on the Chickens to defeat them.</li>
            <li>Collecting Items: Gather coins and bottles to earn points and enhance your defense.</li>
            <li>Attacking the Endboss: Once you have enough bottles, you can attack the Endboss.</li>
            <li>Endboss Battle: Throw bottles at the Endboss to reduce its health.</li>
            <li>Watch Your Health: Avoid getting hit by the Chickens, as it will decrease your health.</li>
            <li>Repeat and Win: Keep repeating the process until you defeat the Endboss.</li>
        </ol>`;
}

function closeHowToPlay(event) {
    event.stopPropagation();
    const howToPlay = document.getElementById('how-to-play');
    howToPlay.classList.remove('expanded');
    howToPlay.innerHTML = `<h3 onclick="expandHowToPlay()">How to Play !</h3>`;
}

function toggleGameInstructions(isVisible) {
    const howToPlay = document.getElementById('how-to-play');
    const introduction = document.querySelector('.introduction');
    
    if (isVisible) {
        howToPlay.style.display = 'block';
        introduction.style.display = 'block';
    } else {
        howToPlay.style.display = 'none';
        introduction.style.display = 'none';
    }
}

function toggleMute() {
    if (themeSound.volume > 0) {
        themeSound.volume = 0;
        muteButton.style.backgroundImage = "url('../img/move-button/icons8-lautlos-50.png')";
    } else {
        themeSound.volume = 0.5;
        muteButton.style.backgroundImage = "url('../img/move-button/icons8-hohe-lautstärke-50.png')";
    }
    muteButton.style.backgroundSize = 'cover';
}

function handleKeyDown(e) {
    if (e.keyCode === 39) {
        keyboard.RIGHT = true;
    } else if (e.keyCode === 37) {
        keyboard.LEFT = true;
    } else if (e.keyCode === 38) {
        keyboard.UP = true;
    } else if (e.keyCode === 40) {
        keyboard.DOWN = true;
    } else if (e.keyCode === 32) {
        keyboard.UP = true;
    } else if (e.keyCode === 68) {
        keyboard.D = true;
    }
}

function handleKeyUp(e) {
    if (e.keyCode === 39) {
        keyboard.RIGHT = false;
    } else if (e.keyCode === 37) {
        keyboard.LEFT = false;
    } else if (e.keyCode === 38) {
        keyboard.UP = false;
    } else if (e.keyCode === 40) {
        keyboard.DOWN = false;
    } else if (e.keyCode === 32) {
        keyboard.UP = false;
    } else if (e.keyCode === 68) {
        keyboard.D = false;
    }
}

function handleButtonTouchStart(button, key) {
    button.addEventListener('touchstart', () => { keyboard[key] = true; });
    button.addEventListener('touchend', () => { keyboard[key] = false; });
}

function handleButtonMouseDown(button, key) {
    button.addEventListener('mousedown', () => { keyboard[key] = true; });
    button.addEventListener('mouseup', () => { keyboard[key] = false; });
}

function hidePlayButton() {
    playButton.style.display = 'none';
    document.getElementById('start-button').style.display = 'none';
}

function lostOutroscreen() {
    const canvas = document.getElementById('canvas');
    const lostScreen = document.getElementById('lost');
    const restartButton = document.querySelector('#restart-btn');

    canvas.classList.add('d-none');
    lostScreen.classList.remove('d-none');
    restartButton.classList.remove('d-none');
    stopGame();
}

function winOutroscreen() {
    const canvas = document.getElementById('canvas');
    const winScreen = document.getElementById('win');
    const restartButton = document.querySelector('#restart-btn');

    canvas.classList.add('d-none');
    winScreen.classList.remove('d-none');
    restartButton.classList.remove('d-none');
    stopGame();
}

// a function that reload the page when the restart button is clicked and add a eventlistener to the restart button

function restart() {
    window.location.reload();
}









function stopGame() {
    themeSound.pause();
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

// ...

// Button "End Game" hinzufügen


function init() {
    window.addEventListener('contextmenu', function (e) { 
        e.preventDefault(); 
      }, false);
    // Canvas
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Startbild
    let startImage = new Image();
    startImage.src = 'img/9_intro_outro_screens/start/startscreen_1.png';
    startImage.onload = function() {
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    }

    // Play Button
    playButton = document.getElementById('play-button');
    playButton.addEventListener('click', function() {
        initLevel();
        gameStarted = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        world = new World(canvas, keyboard);
        hidePlayButton();
        themeSound.play();
        toggleGameInstructions(false);
    });

    // Start Button
    document.getElementById('start-button').addEventListener('click', function() {
        initLevel();
        gameStarted = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        world = new World(canvas, keyboard);
        hidePlayButton();
        themeSound.play();
        toggleGameInstructions(false);  
    });

    // Mute Button
    muteButton = document.getElementById('mute-button');
    muteButton.addEventListener('click', toggleMute);

    // Tastatureingaben
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Button-Eingaben
    leftButton = document.getElementById('left-button');
    rightButton = document.getElementById('right-button');
    jumpButton = document.getElementById('jump-button');
    throwBottle = document.getElementById('throw-bottle');

    handleButtonTouchStart(leftButton, 'LEFT');
    handleButtonTouchStart(rightButton, 'RIGHT');
    handleButtonTouchStart(jumpButton, 'UP');
    handleButtonTouchStart(throwBottle, 'D');

    handleButtonMouseDown(leftButton, 'LEFT');
    handleButtonMouseDown(rightButton, 'RIGHT');
    handleButtonMouseDown(jumpButton, 'UP');
    handleButtonMouseDown(throwBottle, 'D');

    // Weitere Initialisierungen und Event-Listener...
}
