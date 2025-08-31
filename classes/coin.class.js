class Coin extends MoveableObject {
  static itemCount = 0;
  y = 150;
  height = 120;
  width = 120;

  offset = {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40,
  };

  IMAGE_COINS = [
    "./assets/img/8_coin/coin_1.png",
    "./assets/img/8_coin/coin_2.png",
  ];

  constructor() {
    super().loadImage(this.IMAGE_COINS[0]);
    this.loadImages(this.IMAGE_COINS);

    this.calculatePlacementX(400, 400, 50);
    this.y = this.randomNumber50to150();
    this.animate();
    
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGE_COINS);
    }, 200);
  }
}
