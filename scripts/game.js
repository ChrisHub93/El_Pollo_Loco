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
  canvas.style.display = "block";
  world = new World(canvas);
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
  canvas.style.display = "block";
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
}
