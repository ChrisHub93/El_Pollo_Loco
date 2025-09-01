/**
 * Represents a status-bar object that can be rendered in the game world.
 * Inherits movement behavior from {@link DrawableObject}.
 */
class StatusBar extends DrawableObject {
  IMAGES_HEALTH = [
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  IMAGES_COIN = [
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  IMAGES_BOTTLE = [
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  IMAGES_ENDBOSS = [
    "./assets/img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "./assets/img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "./assets/img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "./assets/img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "./assets/img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "./assets/img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];
  percentage = 0;
  images;

  /**
   * Creates a new StatusBar object with a set of images, position, and initial percentage.
   *
   * @param {number} x - The x-coordinate of the status bar on the canvas.
   * @param {number} y - The y-coordinate of the status bar on the canvas.
   * @param {string} imagesKey - The key to access the array of images for the status bar animation.
   * @param {number} percentage - The initial fill percentage of the status bar (0-100).
   */
  constructor(x, y, imagesKey, percentage) {
    super();
    this.images = this[imagesKey];
    this.loadImages(this.images);
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 60;
    this.setPercentage(percentage);
  }

  /**
   * Updates the status bar's fill percentage and sets the corresponding image.
   *
   * @param {number} percentage - The new fill percentage (0-100) of the status bar.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the image index corresponding to the current percentage.
   *
   * @returns {number} - The index of the image to display for the current percentage (0-5).
   */
  resolveImageIndex() {
    if (this.percentage == 100) return 5;
    else if (this.percentage >= 80) return 4;
    else if (this.percentage >= 60) return 3;
    else if (this.percentage >= 40) return 2;
    else if (this.percentage >= 20) return 1;
    else return 0;
  }
}
