let canvas;
let world;
let keyboard;
let gameStopped = false;
let intervalIds = [];
let devTools = false;

window.addEventListener("resize", toggleRotationHint);

/**
 * Initializes the main index/game setup.
 * Sets up keyboard input, hides the start screen, shows the game canvas,
 * initializes the first level, creates the game world, starts background audio,
 * and sets the mute icon state.
 */
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
  //checkFullscreenCondition();
}

/**
 * Toggles fullscreen mode for the game.
 *
 * @param {string} method - "enter" to activate fullscreen, "exit" to leave fullscreen.
 */
function fullscreen(method) {
  if (method === "enter") {
    let fullscreenRef = document.getElementById("fullscreen");
    enterFullscreen(fullscreenRef);
  } else if (method === "exit") {
    exitFullscreen();
  }
}

/**
 * Requests fullscreen mode for a given HTML element.
 *
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) element.requestFullscreen();
  else if (element.msRequestFullscreen) element.msRequestFullscreen();
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
}

/**
 * Exits fullscreen mode if the browser is currently in fullscreen.
 */
function exitFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}

/**
 * Checks the fullscreen condition based on the window size and toggles fullscreen mode.
 * If the window's height and width are below the defined maximums, it enters fullscreen.
 * If the window exceeds the maximums while in fullscreen, it exits fullscreen.
 */
function checkFullscreenCondition() {
  const maxHeight = 480;
  const maxWidth = 720;

  if (window.innerHeight <= maxHeight && window.innerWidth <= maxWidth) {
    if (!document.fullscreenElement) fullscreen("enter");
  } else if (document.fullscreenElement) fullscreen("exit");
}

/**
 * Toggles the visibility of the "turnYourDevice" hint element
 * based on the current viewport width.
 *
 * - Shows the hint when the viewport width is 768px or smaller.
 * - Hides the hint when the viewport width is larger than 768px.
 *
 * @function toggleVideo
 * @returns {void}
 */
function toggleRotationHint() {
  let hint = document.getElementById("rotateHint");
  if (window.innerWidth <= 768) {
    hint.style.display = "flex";
    gameStopped = true;
  }
  if (window.innerWidth > 768) {
    hint.style.display = "none";
  }
}

/**
 * Toggles the game state between stopped and running.
 * When stopped, keyboard input is disabled.
 * When resumed, keyboard input is enabled and the game world is redrawn.
 */
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

/**
 * Restarts the game by clearing all intervals, hiding end/win screens,
 * showing the game canvas, resetting audio, and reinitializing the game.
 */
function restartGame() {
  clearAllIntervalls();
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("won-screen").style.display = "none";
  canvas.style.display = "block";
  resetEndScreenAudio();
  initIndex();
}

/**
 * Clear all intervalls
 */
function clearAllIntervalls() {
  for (let index = 0; index < 999999; index++) window.clearInterval(index);
}

/**
 * Resets the static item counters for all game objects.
 * This ensures that item placement calculations start fresh for a new level or game.
 */
function resetItemCounts() {
  Coin.itemCount = 0;
  Bottle.itemCount = 0;
  Chicken.itemCount = 0;
  ChickenSmall.itemCount = 0;
  Cloud.itemCount = 0;
}
