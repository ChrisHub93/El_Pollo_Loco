class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) { // Throwable should always fall
      return true;
    } else {
      return this.y < 147;
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

  hit() {
    this.energy -= 5;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
    timePassed = timePassed / 1000; // Difference in s
    return timePassed < 1;
  }

  isDead() {
    return this.energy == 0;
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
