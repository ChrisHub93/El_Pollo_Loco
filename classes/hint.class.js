/**
 * Represents a cloud object that can be rendered in the game world.
 * Inherits movement behavior from {@link MoveableObject}.
 */
class Hint extends MoveableObject {
  width = 80;
  height = 80;
  x = 50;
  y = 330;

  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
  }
}
