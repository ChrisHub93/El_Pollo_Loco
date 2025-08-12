class Chicken extends MoveableObject {
  static itemCount = 0; // static, gehört zur classe selbst und nicht nur dem einzelnen Objekt
  y = 365;
  height = 60;
  width = 80;

  IMAGE_WALKING = [
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage(this.IMAGE_WALKING[0]);
    this.loadImages(this.IMAGE_WALKING);

    this.calculatePlacement(350, 400, 60);
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    
    setInterval(() => {
     this.playAnimation(this.IMAGE_WALKING);
    }, 130);
  }
}
