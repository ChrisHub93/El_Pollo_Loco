class MoveableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 147;
  }

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

  // character.isColloding(chicken);
  // isColliding(mO) {
  //   return (
  //     this.x + this.width > mO.x &&
  //     this.y + this.height > mO.y &&
  //     this.x < mO.x + mO.width &&
  //     this.y < mO.y + mO.height
  //   );
  // }

  // isColliding function aus Video 12->
  isColliding(mO) {
    return (
      this.x + this.width - this.offset.right > mO.x + mO.offset.left &&
      this.y + this.height - this.offset.bottom > mO.y + mO.offset.top &&
      this.x + this.offset.left < mO.x + mO.width - mO.offset.right &&
      this.y + this.offset.top < mO.y + mO.height - mO.offset.bottom
    );
  }

  // kommt in collidable-object.class.js ->
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}
