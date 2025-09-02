let soundOn = false;
let doSoundcheck = true;
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
let AUDIO_CURRENT_SONG;

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

/**
 * Plays or pauses the home screen audio depending on the sound state.
 * Updates the mute button icon accordingly.
 */
function playHomeAudio() {
  AUDIO_CURRENT_SONG = AUDIO_HOME;
  const muteBtnRef = document.getElementById("start-button-mute");
  if (soundOn) {
    muteBtnRef.style.backgroundImage = 'url("./assets/icons/mute_off.png")';
    AUDIO_HOME.play();
  } else {
    muteBtnRef.style.backgroundImage = 'url("./assets/icons/mute.png")';
    AUDIO_HOME.pause();
  }
  doSoundcheck = false;
}

/**
 * Pauses the current audio and plays the next audio if sound is on.
 * Also updates the global AUDIO_CURRENT_SONG reference.
 *
 * @param {HTMLAudioElement} currentAudio - The audio that should be paused.
 * @param {HTMLAudioElement} nextAudio - The audio that should be played next.
 */
function playNextAudio(currentAudio, nextAudio) {
  AUDIO_CURRENT_SONG = nextAudio;
  currentAudio.pause();
  if (soundOn) nextAudio.play();
}

/**
 * Toggles the mute state of the game.
 * If sound is off, it turns it on and plays the current audio.
 * If sound is on, it pauses the current audio.
 * Updates the mute icon accordingly.
 */
function switchMute() {
  if (!soundOn) {
    soundOn = true;
    AUDIO_CURRENT_SONG.play();
  } else {
    soundOn = false;
    AUDIO_CURRENT_SONG.pause();
  }
  localStorage.setItem("soundOn", JSON.stringify(soundOn));
  setMuteIcon();
}

/**
 * Updates the mute button icon based on the current sound state.
 * Shows the "mute" icon when sound is off and "mute_off" icon when sound is on.
 */
function setMuteIcon() {
  const muteIconRef = document.getElementById("touchBtnMute");
  if (soundOn)
    muteIconRef.style.backgroundImage = 'url("./assets/icons/mute.png")';
  else muteIconRef.style.backgroundImage = 'url("./assets/icons/mute_off.png")';
}

/**
 * Stops all end-screen and game audio and resets their playback position to the beginning.
 */
function resetEndScreenAudio() {
  AUDIO_LOST.pause();
  AUDIO_WIN.pause();
  AUDIO_LOST.currentTime = 0;
  AUDIO_WIN.currentTime = 0;
  AUDIO_GAME.currentTime = 0;
}

/**
 * Resets the given audio track to the beginning without pausing or playing it.
 * @param {HTMLAudioElement} audio - The audio element to reset.
 */
function resetAudio(audio) {
  audio.currentTime = 0;
}

function soundCheckLocalStorage() {
  const savedSound = localStorage.getItem("soundOn");
  if (savedSound == null) soundOn = false;
  else soundOn = JSON.parse(savedSound);
}
