/**
 * Represents a chicken object that can be rendered in the game world.
 * Inherits movement behavior from {@link MoveableObject}.
 */
class Chicken extends MoveableObject {
  static itemCount = 0;
  y = 345;
  height = 80;
  width = 80;
  character = "chicken";

  offset = {
    top: -5,
    left: 5,
    right: 5,
    bottom: 10,
  };

  IMAGE_WALKING = [
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD = [
    "./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];

  /**
   * Creates a new chicken object.
   *
   * - Loads the walking and dead images.
   * - Randomly calculates the initial X position within the given parameters.
   * - Assigns a random movement speed between 0.15 and 0.40.
   * - Starts the animation cycle.
   */
  constructor() {
    super().loadImage(this.IMAGE_WALKING[0]);
    this.loadImages(this.IMAGE_WALKING);
    this.loadImages(this.IMAGE_DEAD);

    this.calculatePlacementX(500, 600, 60);
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * Animates the small chicken.
   *
   * - If the chicken is not dead:
   *   - Moves left continuously at ~60 FPS (`1000 / 60 ms`).
   *   - Cycles through walking animations every 130 ms.
   */
  animate() {
    if (!this.isDead) {
      this.moveInterval = setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);

      this.walkInterval = setInterval(() => {
        this.playAnimation(this.IMAGE_WALKING);
      }, 130);
    }
  }

   /**
   * Handles the behavior when the chicken is hit.
   *
   * - Sets the `isDead` flag to true.
   * - Clears the movement and walking intervals.
   * - Starts a new interval that plays the dead animation every 100 ms.
   */
  onHit() {
    this.isDead = true;
    clearInterval(this.moveInterval);
    clearInterval(this.walkInterval);

    setInterval(() => {
      this.playAnimation(this.IMAGE_DEAD);
    }, 100);
  }
}
