/**
 * Represents a endboss object that can be rendered in the game world.
 * Inherits movement behavior from {@link MoveableObject}.
 */
class Endboss extends MoveableObject {
  height = 400;
  width = 250;
  y = 50;
  isOnPlace = false;
  steps = 0;
  character = "endboss";

  offset = {
    top: 60,
    left: 60,
    right: 35,
    bottom: 60,
  };

  IMAGES_WALK = [
    "./assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "./assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "./assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "./assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "./assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "./assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "./assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "./assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "./assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "./assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates a new endboss object.
   *
   * - Loads the walking, alert, attack, hurt and dead images.
   * - Initial X position within the given parameters.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3450;
  }

  /**
   * Animates the start frequency.
   *
   * - Calls `startFrequence()` every 80 ms.
   * - Stores the interval ID in `startInterval` so it can be cleared later.
   */
  animateStartFrequency() {
    this.startInterval = setInterval(() => {
      this.startFrequence();
    }, 80);
  }

  /**
   * Executes the start frequency animation and handles initial movement.
   *
   * - Plays the walking animation (`IMAGES_WALK`).
   * - If the X position is greater than `3249`, moves the character left by 10 pixels.
   * - Once the character reaches position `3249` or below:
   *   - Sets `isOnPlace` to true.
   *   - Starts the regular animation cycle by calling {@link animate}.
   */
  startFrequence() {
    this.playAnimation(this.IMAGES_WALK);
    if (this.x > 3249) this.x -= 10;
    else if (this.x <= 3249) {
      this.isOnPlace = true;
      this.animate();
    }
  }

  /**
   * Stops all intervalls.
   */
  stopAllIntervals() {
    clearInterval(this.startInterval);
    clearInterval(this.playAnimationsCharacterInterval);
    clearInterval(this.moveForwardInterval);
    clearInterval(this.stepInterval);
  }

  /**
   * Starts the main animation cycle for the character.
   *
   * - Stops all running intervals via {@link stopAllIntervals}.
   * - Runs the base animation logic via {@link animation}.
   * - Aborts if the character is dead or if the game is stopped.
   * - Otherwise, repeatedly moves the character forward every 3000 ms.
   *
   * @returns {void} This function does not return a value.
   */
  animate() {
    this.stopAllIntervals();
    this.animation();
    if (this.isDead) return;
    if (gameStopped) return;

    // Startet kontinuierliches Vorwärtslaufen
    this.moveForward();
  }

  /**
   * Runs the main animation loop for the character.
   *
   * - Executes every 160 ms.
   * - If the character is dead: triggers {@link gameOver}.
   * - If the character is hurt: plays the hurt animation (`IMAGES_HURT`).
   * - Otherwise: plays the attack animation (`IMAGES_ATTACK`).
   *
   * Stores the interval ID in `playAnimationsCharacterInterval` for later cleanup.
   */
  animation() {
    this.playAnimationsCharacterInterval = setInterval(() => {
      if (this.isDead) this.gameOver();
      else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
      else this.playAnimation(this.IMAGES_ATTACK);
    }, 160);
  }

  /**
   * Moves the character forward in a walking sequence.
   *
   * - Aborts immediately if the game is stopped.
   * - Clears the current animation interval and resets the step counter.
   * - Starts a step interval (every 80 ms) that:
   *   - Aborts if the game is stopped.
   *   - If the character is hurt: stops all intervals, restarts animation, and cancels the walk.
   *   - Otherwise: performs walking steps via {@link walk}.
   *   - After 12 steps: clears the step interval and resumes the main animation cycle via {@link animation}.
   */
  moveForward() {
    if (gameStopped) return;
    clearInterval(this.stepInterval);

    this.stepInterval = setInterval(() => {
      if (gameStopped) return;
      if (this.isHurt()) return;

      this.walk();
      this.steps++;
    }, 80);
  }

  /**
   * Executes a single walking step for the end boss.
   *
   * - Plays the walking animation (`IMAGES_WALK`).
   * - Moves the end boss 10 pixels to the left by decreasing `x`.
   * - Increments the internal step counter (`steps`).
   */
  walk() {
    this.playAnimation(this.IMAGES_WALK);
    this.x -= 20;
    this.steps++;
  }

  /**
   * Checks if a movable object (e.g., a bottle) is colliding with the end boss.
   *
   * - Compares the positions and sizes of both objects, taking offsets into account.
   *
   * @param {object} mO - The movable object to check collision against. Should have `x`, `y`, `width`, `height`, and `offset` properties.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  bottleIsColliding(mO) {
    return (
      this.x + this.width - this.offset.right > mO.x + mO.offset.left &&
      this.y + this.height - this.offset.bottom > mO.y + mO.offset.top &&
      this.x + this.offset.left < mO.x + mO.width - mO.offset.right &&
      this.y + this.offset.top < mO.y + mO.height - mO.offset.bottom
    );
  }

  /**
   * Plays the death animation for the endboss and triggers the game over sequence.
   *
   * - Plays the dead animation (`IMAGES_DEAD`).
   * - After 500 ms, sets `gameStopped` to true and displays the you won screen.
   */
  gameOver() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      gameStopped = true;
      this.showYouWonScreen();
    }, 500);
  }
}
