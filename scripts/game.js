let canvas;
let world;
let keyboard;
let gameStopped = false;
let intervalIds = [];
let devTools = false;

window.addEventListener("load", checkFullscreenCondition);
window.addEventListener("resize", checkFullscreenCondition);

function initIndex() {
  gameStopped = false;
  keyboard = new Keyboard();
  document.getElementById("start-screen").style.display = "none";
  canvas = document.getElementById("canvas");
  initLevelOne();
  document.getElementById("canvas-wrapper").style.display = "block";
  world = new World(canvas);
  playNextAudio(AUDIO_HOME, AUDIO_GAME);
  setMuteIcon();
}

function fullscreen(method) {
  if (method === "enter") {
    let fullscreenRef = document.getElementById("fullscreen");
    enterFullscreen(fullscreenRef);
  } else if (method === "exit") {
    exitFullscreen();
  }
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

function checkFullscreenCondition() {
  const maxHeight = 480;
  const maxWidth = 720;

  if (window.innerHeight <= maxHeight && window.innerWidth <= maxWidth) {
    if (!document.fullscreenElement) {
      fullscreen("enter");
    }
  } else {
    if (document.fullscreenElement) {
      fullscreen("exit");
    }
  }
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
