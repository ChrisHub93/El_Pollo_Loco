let soundOn = false;
let AUDIO_HOME = new Audio("./assets/audio/flamenco-loop.mp3");
let AUDIO_GAME = new Audio("./assets/audio/guitar-spanish.mp3");
let AUDIO_HIT = new Audio("./assets/audio/boing.mp3");
let AUDIO_THROW = new Audio("./assets/audio/throw.mp3");
let AUDIO_ROTATE = new Audio("./assets/audio/rotate.mp3");
let AUDIO_STEP = new Audio("./assets/audio/step.mp3");
let AUDIO_LOST = new Audio("./assets/audio/you-lost.mp3");
let AUDIO_WIN = new Audio("./assets/audio/you-win.mp3");
let AUDIO_BOTTLE_HIT = new Audio("./assets/audio/bootleHit.mp3");
let AUDIO_COIN_HIT = new Audio("./assets/audio/coinHit.mp3");
let AUDIO_PUNCH = new Audio("./assets/audio/punch.mp3");
let AUDIO_JUMP = new Audio("./assets/audio/jump.mp3");
let AUDIO_HIT_ENEMY = new Audio("./assets/audio/hitEnemy.mp3");
let AUDIO_ENDBOSS = new Audio("./assets/audio/endbossSound.mp3");

AUDIO_HOME.loop = true;
AUDIO_GAME.loop = true;
AUDIO_ENDBOSS.loop = true;
AUDIO_WIN.loop = false;

AUDIO_HOME.volume = 0.4;
AUDIO_GAME.volume = 0.4;
AUDIO_JUMP.volume = 0.5;
AUDIO_COIN_HIT.volume = 0.3;
AUDIO_JUMP.volume = 0.5;
AUDIO_BOTTLE_HIT.volume = 0.2;
AUDIO_HIT_ENEMY.volume = 0.3;
AUDIO_THROW.volume = 0.3;
AUDIO_PUNCH.volume = 0.5;
AUDIO_ENDBOSS.volume = 0.3;

function playHomeAudio() {
  if (soundOn) AUDIO_HOME.play();
  else AUDIO_HOME.pause();
}

function playNextAudio(currentAudio, nextAudio) {
  currentAudio.pause();
  nextAudio.play();
}

function switchMute() {
  if (!soundOn) soundOn = true;
  else soundOn = false;
}
