/**
 * Represents the game world.
 * Inherits collision detection capabilities from {@link Collision}.
 */
class World extends Collision {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  camera_x = 0;
  statusBarHealth = new StatusBar(30, 0, "IMAGES_HEALTH", 100);
  statusBarCoins = new StatusBar(30, 45, "IMAGES_COIN", 0);
  statusBarBottles = new StatusBar(30, 95, "IMAGES_BOTTLE", 0);
  statusBarEnboss = new StatusBar(470, 6, "IMAGES_ENDBOSS", 100);
  endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
  onHit = false;
  throwableObjects = [];
  throwableTimeout = false;

  /**
   * Creates a new instance of the game canvas manager.
   *
   * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
   */
  constructor(canvas) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Draws the entire game world on the canvas.
   *
   * This method clears the canvas, renders the background, HUD elements,
   * and all level objects. It continuously updates itself using
   * requestAnimationFrame for smooth animations.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.backgroundObjects();
    this.hudElements();
    this.levelObjects();

    // Dadurch wird draw() immer wieder aufgerufen ->
    let self = this;
    if (!gameStopped) {
      requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  /**
   * Assigns the current world instance to the character.
   *
   * This allows the character to access world properties and methods,
   * such as collision detection, item interactions, and level information.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the game loops for collision detection and throwable object handling.
   *
   * - Checks collisions between the character and enemies/items every 10ms.
   * - Checks interactions with throwable objects and bottle hits every 80ms.
   *
   * @returns {void}
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.characterEndbossPosition();
    }, 10);
    setInterval(() => {
      this.checkThrowableObjects();
      this.checkBottleHit();
    }, 80);
  }

  /**
   * Checks if the character has reached the Endboss position and triggers related events.
   *
   * - Plays the next audio track if the character reaches the Endboss.
   * - Sets `isOnEndbossPosition` on the character to true.
   * - Disables keyboard input while the Endboss animation starts.
   * - Starts the Endboss start frequency animation.
   * - Re-enables keyboard input once the Endboss is in position.
   *
   * @returns {void}
   */
  characterEndbossPosition() {
    if (this.characterOnBossPosition()) {
      playNextAudio(AUDIO_GAME, AUDIO_ENDBOSS);
      this.character.isOnEndbossPosition = true;
      keyboard.keyboardReady = false;
      this.endboss.animateStartFrequency();
    }
    if (this.endboss.isOnPlace) keyboard.keyboardReady = true;
  }

  /**
   * Checks if the character has reached the Endboss trigger position for the first time.
   *
   * - Returns `true` if the character's X position is past the trigger point
   *   and they were not already flagged as being in Endboss position.
   * - Returns `false` otherwise.
   *
   * @returns {boolean} True if the character just reached the Endboss position, false otherwise.
   */
  characterOnBossPosition() {
    return (
      this.character.x >= 2900 && this.character.isOnEndbossPosition == false
    );
  }

  /**
   * Checks if the character can throw a bottle and triggers the throw action.
   *
   * - Calls `canBottleBeThrown()` to determine if throwing is allowed.
   * - If true, calls `throwBottles()` to throw the bottle.
   * - Resets the `keyboard.B` flag to prevent repeated throws.
   * - Sets a throwable timeout for 0.5 secounds
   */
  checkThrowableObjects() {
    if (this.canBottleBeThrown()) {
      this.throwBottles();
      keyboard.B = false;
      setTimeout(() => {
        this.throwableTimeout = false;
      }, 600);
    }
  }

  /**
   * Determines if the character can throw a bottle.
   *
   * Conditions:
   * - The "B" key is pressed (`keyboard.B === true`).
   * - The character has at least one bottle (`statusBarBottles.percentage > 0`).
   * - Keyboard input is currently allowed (`keyboard.keyboardReady`).
   * - Throwable timeout is done.
   *
   * @returns {boolean} True if a bottle can be thrown, false otherwise.
   */
  canBottleBeThrown() {
    return (
      keyboard.B === true &&
      this.statusBarBottles.percentage > 0 &&
      keyboard.keyboardReady && !this.throwableTimeout
    );
  }

  /**
   * Throws a bottle from the character's current position.
   *
   * - Creates a new `ThrowableObject` at an offset from the character.
   * - Adds the bottle to the `throwableObjects` array.
   * - Reduces the character's bottle count by 20.
   * - Updates the status bar to reflect the remaining bottles.
   */
  throwBottles() {
    this.throwableTimeout = true;
    let bottle = new ThrowableObject(
      this.character.x + 100,
      this.character.y + 100
    );
    this.throwableObjects.push(bottle);
    this.character.reduceStatus("bottles", 20);
    this.statusBarBottles.setPercentage(this.character.bottles);
  }

  /**
   * Renders the background elements of the level.
   *
   * - Translates the canvas context by `camera_x` to simulate camera movement.
   * - Draws all objects in `backgroundObjects` and `clouds` arrays of the level.
   * - Resets the canvas translation after rendering.
   */
  backgroundObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level["backgroundObjects"]);
    this.addObjectsToMap(this.level["clouds"]);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Renders the HUD (Heads-Up Display) elements on the canvas.
   *
   * - Draws the character's health, coin count, and bottle count.
   * - Draws the Endboss status bar if the Endboss is present on the level.
   * - Translates the canvas context by `camera_x` for camera movement.
   */
  hudElements() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
    if (this.endboss.isOnPlace) this.addToMap(this.statusBarEnboss);
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * Renders all level objects on the canvas.
   *
   * - Draws enemies, coins, and bottles from the current level.
   * - Draws throwable objects (e.g., thrown bottles).
   * - Draws the main character.
   * - Resets the canvas translation after drawing to account for camera movement.
   */
  levelObjects() {
    this.addObjectsToMap(this.level["enemies"]);
    this.addObjectsToMap(this.level["coins"]);
    this.addObjectsToMap(this.level["bottles"]);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Adds multiple objects to the canvas map.
   *
   * Iterates over an array of drawable objects and renders each one using `addToMap`.
   *
   * @param {Array<Object>} objects - An array of objects to be drawn on the canvas.
   */
  addObjectsToMap(object) {
    object.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws a single object onto the canvas.
   *
   * Handles the object's orientation (mirroring) if `otherDirection` is true,
   * draws the object, and optionally renders debug frames if `devTools` is enabled.
   *
   * @param {Object} mO - The movable or drawable object to render.
   *                       Must have a `draw(ctx)` method and optional `otherDirection` boolean.
   */
  addToMap(mO) {
    if (mO.otherDirection) this.flipImage(mO);
    mO.draw(this.ctx);
    if (devTools) this.drawFrames(mO);
    if (mO.otherDirection) this.flipImageBack(mO);
  }

  /**
   * Draws debug frames for calibration and collision testing.
   *
   * Calls the object's development tool methods to draw its frame and hitbox on the canvas.
   *
   * @param {Object} mO - The object to render debug frames for.
   *                       Must have `devToolDrawFrame(ctx)` and `devToolDrawHitbox(ctx)` methods.
   */
  drawFrames(mO) {
    mO.devToolDrawFrame(this.ctx);
    mO.devToolDrawHitbox(this.ctx);
  }
  /**
   * Flips an object horizontally on the canvas.
   *
   * Saves the current canvas state, translates the context by the object's width,
   * scales the context horizontally to mirror the image, and adjusts the object's x-coordinate.
   *
   * @param {Object} mO - The object to flip. Must have a `width` property and `x` coordinate.
   */
  flipImage(mO) {
    this.ctx.save();
    this.ctx.translate(mO["width"], 0);
    this.ctx.scale(-1, 1);
    mO.x = mO.x * -1;
  }

  /**
   * Restores the canvas state after a horizontal flip and resets the object's x-coordinate.
   *
   * This should be called after `flipImage` to return the canvas to its original state
   * and undo the x-coordinate adjustment.
   *
   * @param {Object} mO - The object that was previously flipped. Must have an `x` property.
   */
  flipImageBack(mO) {
    this.ctx.restore();
    mO.x = mO.x * -1;
  }
}
