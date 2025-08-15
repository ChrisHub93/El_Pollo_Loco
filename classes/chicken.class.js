class Chicken extends MoveableObject {
  static itemCount = 0; // static, gehört zur classe selbst und nicht nur dem einzelnen Objekt
  y = 365;
  height = 60;
  width = 80;
  isDead = false;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  IMAGE_WALKING = [
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD = [
    "../assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    "../assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    "../assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    "../assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    "../assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    "../assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];

  constructor() {
    super().loadImage(this.IMAGE_WALKING[0]);
    this.loadImages(this.IMAGE_WALKING);
    this.loadImages(this.IMAGE_DEAD);

    this.calculatePlacement(350, 400, 60);
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    if (!this.isDead) {
      setInterval(() => {
        this.moveLeft();
      }, 1000 / 60);

      setInterval(() => {
        this.playAnimation(this.IMAGE_WALKING);
      }, 130);
    }
  }

  onHit() {
    setInterval(() => {
      this.playAnimation(this.IMAGE_DEAD);
    }, 100);
  }
}
