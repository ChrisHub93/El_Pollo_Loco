/**
 * Represents a background object that can be rendered in the game world.
 * Inherits movement behavior from {@link MoveableObject}.
 */
class BackgroundObject extends MoveableObject {
  width = 720;
  height = 480;

  /**
   *  Creates a new background object.
   * 
   * @param {string} imagePath - The path of the image
   * @param {number} x - - X-coordinate where the image should be rendered
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
