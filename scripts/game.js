let canvas;
let world;
let keyboard;
let gameStopped = false;
let intervalIds = [];
let i = 1;

function initIndex() {
  gameStopped = false;
  keyboard = new Keyboard();
  document.getElementById("start-screen").style.display = "none";
  canvas = document.getElementById("canvas");
  initLevelOne();
  document.getElementById("canvas-wrapper").style.display = "block";
  world = new World(canvas);
  playNextAudio(AUDIO_HOME, AUDIO_GAME);
}

function fullscreen(method) {
  if (method === "enter") {
    let fullscreenRef = document.getElementById("fullscreen");
    enterFullscreen(fullscreenRef);
  } else if (method === "exit") exitFullscreen();
}

function enterFullscreen(element) {
  if (element.requestFullscreen) element.requestFullscreen();
  else if (element.msRequestFullscreen) element.msRequestFullscreen();
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
}

function exitFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}

function stopGame() {
  if (!gameStopped) {
    gameStopped = true;
    keyboard.keyboardReady = false;
  } else {
    gameStopped = false;
    keyboard.keyboardReady = true;
    world.draw();
  }
}

function restartGame() {
  clearAllIntervalls();
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("won-screen").style.display = "none";
  canvas.style.display = "block";
  resetEndScreenAudio();
  initIndex();
}

function clearAllIntervalls() {
  for (let index = 0; index < 999999; index++) window.clearInterval(index);
}

function resetItemCounts() {
  Coin.itemCount = 0;
  Bottle.itemCount = 0;
  Chicken.itemCount = 0;
  ChickenSmall.itemCount = 0;
  Cloud.itemCount = 0;
}

function resetEndScreenAudio() {
  AUDIO_LOST.pause();
  AUDIO_WIN.pause();
  AUDIO_LOST.currentTime = 0;
  AUDIO_WIN.currentTime = 0;
  AUDIO_GAME.currentTime = 0;
}
