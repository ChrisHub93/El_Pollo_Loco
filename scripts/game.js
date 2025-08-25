let canvas;
let world;
let keyboard = new Keyboard();
let gameStopped = false;

function initIndex() {
  canvas = document.getElementById("canvas");
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
  if (!gameStopped)  {
    gameStopped = true;
    // Stop moveableObjects moving
  }
  else {
    gameStopped = false;
    world.draw();
  }
}
