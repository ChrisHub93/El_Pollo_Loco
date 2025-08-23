class Chicken extends MoveableObject {
  static itemCount = 0; // static, gehört zur classe selbst und nicht nur dem einzelnen Objekt
  y = 360;
  height = 60;
  width = 80;
  isDead = false;
  character = "chicken";

  offset = {
    top: -5,
    left: 5,
    right: 5,
    bottom: 10,
  };

  IMAGE_WALKING = [
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD = [
    "../assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];

  constructor() {
    super().loadImage(this.IMAGE_WALKING[0]);
    this.loadImages(this.IMAGE_WALKING);
    this.loadImages(this.IMAGE_DEAD);

    this.calculatePlacementX(500, 600, 60);
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }
  animate() {
    if (!this.isDead) {
      this.moveInterval = setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);

      this.walkInterval = setInterval(() => {
        this.playAnimation(this.IMAGE_WALKING);
      }, 130);
    }
  }

  onHit() {
    this.isDead = true;
    clearInterval(this.moveInterval);
    clearInterval(this.walkInterval);

    setInterval(() => {
      this.playAnimation(this.IMAGE_DEAD);
    }, 100);
  }
}
