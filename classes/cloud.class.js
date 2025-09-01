/**
 * Represents a cloud object that can be rendered in the game world.
 * Inherits movement behavior from {@link MoveableObject}.
 */
class Cloud extends MoveableObject {
  static itemCount = 0;
  y = 20;
  width = 500;
  height = 250;

  /**
   * Creates a new cloud object.
   *
   * - Loads the cloud image
   * - Randomly calculates the initial X position within the given parameters.
   * - Starts the animation cycle.
   */
  constructor(imagePath) {
    super().loadImage(imagePath);

    this.calculatePlacementX(200, 600, 60);
    this.animate();
  }

  /**
   * Animates the cloud.
   *
   * - Moves left continuously at ~60 FPS (`1000 / 60 ms`).
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
