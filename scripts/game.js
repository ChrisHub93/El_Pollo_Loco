let canvas;
let world;
let keyboard = new Keyboard();

function initIndex() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My Character is", world["character"]);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 87) keyboard.W = true;
  if (e.keyCode == 65) keyboard.A = true;  
  if (e.keyCode == 68) keyboard.D = true;  
  if (e.keyCode == 32) keyboard.SPACE = true; 
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 87) keyboard.W = false;
  if (e.keyCode == 65) keyboard.A = false;  
  if (e.keyCode == 68) keyboard.D = false;  
  if (e.keyCode == 32) keyboard.SPACE = false;
});

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
