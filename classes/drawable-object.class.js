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
    ctx.drawImage(
      this["img"],
      this["x"],
      this["y"],
      this["width"],
      this["height"]
    );
  }

  drawFrame(ctx) {
    // Wird nur bei den Classen Character, Chicken, oder Endboss ausgeführt.
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this["x"], this["y"], this["width"], this["height"]);
      ctx.stroke();
      ctx.beginPath();
    }
  }
}
