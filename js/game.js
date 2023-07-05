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
function toggleMute() {
    if (themeSound.volume > 0) {
        themeSound.volume = 0;
        muteButton.src = '../img/move-button/icons8-lautlos-50.png';
    } else {
        themeSound.volume = 0.5;
        muteButton.src = '../img/move-button/icons8-hohe-lautstärke-50.png';
    }
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
        keyboard.SPACE = true;
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
        keyboard.SPACE = false;
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
    const restartButton = document.querySelector('#restart-button');

    canvas.classList.add('d-none');
    lostScreen.classList.remove('d-none');
    restartButton.classList.remove('d-none');
}

function init() {
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
    });

    // Start Button
    document.getElementById('start-button').addEventListener('click', function() {
        initLevel();
        gameStarted = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        world = new World(canvas, keyboard);
        hidePlayButton();
        themeSound.play();
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
    handleButtonTouchStart(jumpButton, 'SPACE');
    handleButtonTouchStart(throwBottle, 'D');

    handleButtonMouseDown(leftButton, 'LEFT');
    handleButtonMouseDown(rightButton, 'RIGHT');
    handleButtonMouseDown(jumpButton, 'SPACE');
    handleButtonMouseDown(throwBottle, 'D');

    // Weitere Initialisierungen und Event-Listener...
}
