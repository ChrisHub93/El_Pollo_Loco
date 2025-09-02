/**
 * Base class for all objects that can be drawn on the canvas.
 * Handles image loading, position, size, and animation.
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  /**
   * Loads an image from the specified path and assigns it to the object.
   *
   * @param {string} path - The file path or URL of the image to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads images from the specified path and assigns it to the object.
   *
   * @param {array} path - The file path or URL of the image to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object on the given canvas context.
   * If the image is not loaded yet, it will catch the error and log a warning.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
  draw(ctx) {
    try {
      ctx.drawImage(
        this["img"],
        this["x"],
        this["y"],
        this["width"],
        this["height"]
      );
    } catch (error) {
      console.warn("Error loading Image", error);
      console.log("Could not load image", this.img.src);
    }
  }

  /**
   * Draws a blue frame around the object for development/debugging purposes.
   * Only works for instances of Character, Chicken, Endboss, or Coin.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
  devToolDrawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof Coin
    ) {
      ctx.lineWidth = 5;
      ctx.strokeStyle = "blue";
      ctx.rect(this["x"], this["y"], this["width"], this["height"]);
      ctx.stroke();
      ctx.beginPath();
    }
  }

  /**
   * Draws a red hitbox-frame around the object for development/debugging purposes.
   * Only works for instances of Character, Chicken, Endboss, or Coin.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
  devToolDrawHitbox(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof ChickenSmall ||
      this instanceof Endboss ||
      this instanceof Bottle ||
      this instanceof Coin
    ) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "red";

      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
      ctx.beginPath();
    }
  }

  /**
   * Displays the game over screen by hiding the game canvas and showing
   * the end screen overlay. Also plays the game over audio and transitions
   * to the "lost" audio track.
   */
  showGameOverScreen() {
    document.getElementById("canvas-wrapper").style.display = "none";
    document.getElementById("end-screen").style.display = "flex";
    AUDIO_GAME.play();
    playNextAudio(AUDIO_GAME, AUDIO_LOST);
  }

  /**
   * Displays the you won screen by hiding the game canvas and showing
   * the end screen overlay. Also plays the you win audio and transitions
   * to the "lwin" audio track.
   */
  showYouWonScreen() {
    document.getElementById("canvas-wrapper").style.display = "none";
    document.getElementById("won-screen").style.display = "flex";
    playNextAudio(AUDIO_ENDBOSS, AUDIO_WIN);
  }
}
