/**
 * Represents a bottle object that can be rendered in the game world.
 * Inherits movement behavior from {@link MoveableObject}.
 */
class Bottle extends MoveableObject {
  /**
   * @type {number} - Tracks how many bottles exist in the game.
   * @static
   */
  static itemCount = 0;

  /**
   * @type {number} - The Y position where the bottle is rendered.
   */
  y = 330;

  /**
   * @type {number} - The height of the bottle in pixels.
   */
  height = 120;

  /**
   * @type {number} - The width of the bottle in pixels.
   */
  width = 120;

  /**
   * The hitbox offset values for collision detection.
   * @type {{top: number, left: number, right: number, bottom: number}}
   */
  offset = {
    top: 35,
    left: 35,
    right: 35,
    bottom: 35,
  };

  /**
   * 
   * @type {string[]} - Path(s) to the bottle image(s).
   */
  IMAGE_BOTTLE = ["./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

  /**
   * Creates a new bottle object and places it randomly within the given parameters.
   * Loads the bottle image and sets its initial X position.
   */
  constructor() {
    super().loadImage(this.IMAGE_BOTTLE[0]);
    this.calculatePlacementX(300, 420, 70);
  }
}

