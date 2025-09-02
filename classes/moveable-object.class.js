/**
 * Represents a movable object that can be rendered in the game world.
 */
class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  energyEndboss = 100;
  lastHit = 0;
  coins = 0;
  bottles = 0;
  character = "moveableObject";
  isDead = false;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Applies gravity to the object by updating its vertical position and speed.
   *
   * The object's `y` position is decreased by `speedY` and `speedY` is reduced
   * by `acceleration` every frame, simulating falling motion.
   * Gravity is only applied if the object is above the ground or moving upwards,
   * and the game is not stopped.
   */
  applyGravity() {
    setInterval(() => {
      if ((this.isAboveGround() || this.speedY > 0) && !gameStopped) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   *
   * - Always returns `true` for throwable objects.
   * - For other objects, returns `true` if `y` is less than the ground level (147).
   *
   * @returns {boolean} `true` if the object is above the ground, `false` otherwise
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) return true;
    else return this.y < 147;
  }

  /**
   * Checks if this object is colliding with another object.
   *
   * @param {object} mO - The other object to check collision against.
   *                       Must have properties: x, y, width, height, offset (with top, right, bottom, left).
   * @returns {boolean} True if this object is colliding with the other object, false otherwise.
   */
  isColliding(mO) {
    return (
      this.x + this.width - this.offset.right > mO.x + mO.offset.left &&
      this.y + this.height - this.offset.bottom > mO.y + mO.offset.top &&
      this.x + this.offset.left < mO.x + mO.width - mO.offset.right &&
      this.y + this.offset.top < mO.y + mO.height - mO.offset.bottom
    );
  }

  /**
   * Reduces the character's energy by 20 when hit by an enemy.
   * If energy drops below 0, it is clamped to 0.
   * Updates the `lastHit` timestamp if the character is still alive.
   */
  hitEnemy() {
    this.energy -= 20;
    if (this.energy <= 0) this.energy = 0;
    else this.lastHit = new Date().getTime();
  }

  /**
   * Increases the character's item count (bottles or coins) by 20.
   * Caps the item count at 100.
   *
   * @param {"bottles" | "coins"} itemType - The type of item to increment.
   */
  hitItem(item) {
    this[item] += 20;
    if (this[item] >= 100) this[item] = 100;
  }

  /**
   * Reduces a character's status value (e.g., bottles or coins) by a given amount.
   * Ensures the value does not drop below 0.
   *
   * @param {"bottles" | "coins"} item - The type of item/status to reduce.
   * @param {number} amount - The amount to reduce the status by.
   */
  reduceStatus(item, status) {
    this[item] -= status;
    if (this[item] < 0) this[item] = 0;
  }

  /**
   * Checks if the character is currently in a "hurt" state.
   * A character is considered hurt if less than 1 second has passed since the last hit.
   *
   * @returns {boolean} True if the character is hurt, false otherwise.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Checks if the character's energy has reached 0 or less.
   * If so, sets the character's `isDead` property to true.
   */
  checkLiveStatus() {
    if (this.energy <= 0) this.isDead = true;
  }

  /**
   * Plays an animation by cycling through a given array of image paths.
   * Updates the object's current image based on `currentImage` index.
   *
   * @param {string[]} images - Array of image paths to cycle through for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the character to the right by its current speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the character to the right by its current speed if game ist not stopped.
   */
  moveLeft() {
    if (!gameStopped) this.x -= this.speed;
  }

  /**
   * Makes the character jump by setting its vertical speed and position.
   * @param {number} height - The initial upward speed of the jump.
   */
  jump(height) {
    this.speedY = height;
    this.y = 147;
  }

  /**
   * Calculates and sets the X position for an object with spacing and randomness.
   * Each object gets a slightly randomized X position based on its order.
   *
   * @param {number} start - The starting X coordinate for placement.
   * @param {number} space - The base spacing between consecutive objects.
   * @param {number} randomness - The maximum random offset added or subtracted from the base position.
   */
  calculatePlacementX(start, space, randomness) {
    const startX = start;
    const spacing = space;
    const randomOffset = Math.random() * (randomness * 2) - randomness;

    this.x = startX + this.constructor.itemCount * spacing + randomOffset;
    this.constructor.itemCount++;
  }

  /**
   * Generates a random integer between 50 and 150 (inclusive).
   *
   * @returns {number} A random number between 50 and 150.
   */
  randomNumber50to150() {
    return Math.floor(Math.random() * (150 - 50 + 1)) + 50;
  }
}
