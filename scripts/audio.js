let AUDIO_HOME = new Audio("./assets/audio/flamenco-loop.mp3");
let AUDIO_GAME = new Audio("./assets/audio/guitar-spanish.mp3");

AUDIO_HOME.loop = true;
AUDIO_GAME.loop = true;

function playHomeAudio() {
  AUDIO_HOME.play();
}

function playNextAudio(currentAudio, nextAudio) {
  currentAudio.pause();
  nextAudio.play();
}
