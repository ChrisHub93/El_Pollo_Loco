/**
 * Represents a throwable object that can be rendered in the game world.
 * Inherits movement behavior from {@link MoveableObject}.
 */
class ThrowableObject extends MoveableObject {
  speedY = 30;
  speedX = 20;
  rotationInterval = null;
  hasHit = false;

  IMAGES_BOTTLE_ROTATION = [
    "./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates a new ThrowableObject (bottle) at the specified coordinates.
   *
   * Loads the bottle image, rotation frames, and splash animation frames.
   * Initializes position and dimensions, then starts the throw animation.
   *
   * @param {number} x - The initial x-coordinate of the bottle.
   * @param {number} y - The initial y-coordinate of the bottle.
   */
  constructor(x, y) {
    super().loadImage(
      "./assets/img/7_statusbars/3_icons/icon_salsa_bottle.png"
    );
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 90;
    this.throw();
  }

  /**
   * Starts the bottle's throw animation.
   *
   * - Applies gravity to the bottle.
   * - Moves the bottle forward horizontally at a constant speed.
   * - Plays the rotation animation frames.
   * - Plays the throw sound if sound is enabled.
   * - Checks if the bottle hits the ground and triggers the splash animation at y = 370.
   */
  throw() {
    this.applyGravity();

    this.rotationInterval = setInterval(() => {
      this.x += 10;
      this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
      if (soundOn) AUDIO_THROW.play();

      if (this.groundHit()) {
        this.splashAnimation(370);
      }
    }, 25);
  }

  /**
   * Checks if the bottle has hit the ground.
   *
   * @returns {boolean} True if the bottle hits the ground, otherwise false.
   */
  groundHit() {
    return this.y >= 300;
  }

  /**
   * Plays the splash animation when the bottle hits the ground or an enemy.
   * Stops the rotation animation if it is active.
   *
   * @param {number} y - The y-coordinate where the splash animation should occur.
   */
  splashAnimation(y) {
    this.y = y;
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);

    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
      this.rotationInterval = null;
    }
  }
}
