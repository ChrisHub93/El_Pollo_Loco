let AUDIO_HOME = new Audio("./assets/audio/flamenco-loop.mp3");
let AUDIO_GAME = new Audio("./assets/audio/guitar-spanish.mp3");
let AUDIO_HIT = new Audio("./assets/audio/boing.mp3");
let AUDIO_THROW = new Audio("./assets/audio/throw.mp3");
let AUDIO_ROTATE = new Audio("./assets/audio/rotate.mp3");
let AUDIO_STEP = new Audio("./assets/audio/step.mp3");
let AUDIO_LOST = new Audio("./assets/audio/you-lost.mp3");
let AUDIO_WIN = new Audio("./assets/audio/you-win.mp3");

AUDIO_HOME.loop = true;
AUDIO_GAME.loop = true;
AUDIO_GAME.volume = 0.5;

function playHomeAudio() {
  AUDIO_HOME.play();
}

function playNextAudio(currentAudio, nextAudio) {
  currentAudio.pause();
  nextAudio.play();
}
