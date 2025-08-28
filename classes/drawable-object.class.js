class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  loadImage(path) {
    this.img = new Image(); //this.img = document.getElementById('image') <img id="image" src>
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

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

  drawFrame(ctx) {
    // Wird nur bei den Classen Character, Chicken, oder Endboss ausgeführt.
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

  drawHitbox(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof ChickenSmall ||
      this instanceof Endboss ||
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

  showGameOverScreen(){
    document.getElementById("canvas-wrapper").style.display = "none";
    document.getElementById("end-screen").style.display = "flex";
  }

  showYouWonScreen(){
    document.getElementById("canvas-wrapper").style.display = "none";
    document.getElementById("won-screen").style.display = "flex";
  }
}
