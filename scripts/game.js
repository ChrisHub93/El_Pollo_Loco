let canvas;
let world;
let keyboard;
let gameStopped = false;
let devTools = false;
let doSoundcheck = true;
let fullscreen = false;

window.addEventListener("resize", toggleRotationHint);

/**
 * Initializes the main index/game setup.
 * Sets up keyboard input, hides the start screen, shows the game canvas,
 * initializes the first level, creates the game world, starts background audio,
 * and sets the mute icon state.
 */
function startGame() {
  if (doSoundcheck) soundCheckLocalStorage();
  gameStopped = false;
  keyboard = new Keyboard();
  document.getElementById("start-screen").style.display = "none";
  canvas = document.getElementById("canvas");
  initLevelOne();
  document.getElementById("canvas-wrapper").style.display = "block";
  document.getElementById("mobile-buttons").style.display = "block";
  world = new World(canvas);
  playNextAudio(AUDIO_HOME, AUDIO_GAME);
  setMuteIcon();
  loopSounds();
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
  if (window.innerWidth <= 657) {
    hint.style.display = "flex";
    gameStopped = true;
  }
  if (window.innerWidth > 657) {
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
  resetGame();
  startGame();
}

/**
 * Resets the game state by clearing all intervals, hiding end/win screens,
 * showing the main game canvas, and resetting any end-screen audio.
 */
function resetGame() {
  clearAllIntervalls();
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("won-screen").style.display = "none";
  canvas.style.display = "block";
  resetEndScreenAudio();
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

/**
 * Returns the game to the home/start screen.
 * Resets the game state and hides any end or win screens.
 * Displays the start screen.
 */
function backToHome() {
  resetGame();
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("won-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "flex";
}

/**
 * Hides the start screen and displays the impressum screen.
 */
function openImpressum() {
  document.getElementById("impressum").style.display = "flex";
  document.getElementById("start-screen").style.display = "none";
}

/**
 * Hides the impressum screen and displays the start screen.
 */
function leaveImpressum() {
  document.getElementById("impressum").style.display = "none";
  document.getElementById("start-screen").style.display = "flex";
}


/**
 * Opens the game in fullscreen mode using the relative container.
 *
 * @function getFullScreen
 * @returns {void}
 */
function getFullScreen() {
  let divRef = document.getElementById("fullscreen");
  if (!fullscreen) openFullscreen(divRef);
  else if (fullscreen) closeFullscreen(divRef)
}

/**
 * Requests fullscreen mode for a given element.
 * Handles compatibility for different browsers (standard, Safari, IE11).
 *
 * @function openFullscreen
 * @param {HTMLElement} elem - The DOM element to display in fullscreen.
 * @returns {void}
 */
function openFullscreen(elem) {
  fullscreen = true;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen(elem) {
  fullscreen = false;
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}
