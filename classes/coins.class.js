class Coin extends MoveableObject {
  static itemCount = 0; // static, gehört zur classe selbst und nicht nur dem einzelnen Objekt
  y = 280;
  height = 120;
  width = 120;
  
  offset = {
    top: 35,
    left: 35,
    right: 35,
    bottom: 35,
  };

  IMAGE_COINS = [
    "../assets/img/8_coin/coin_1.png",
    "../assets/img/8_coin/coin_2.png",
  ];

  constructor() {
    super().loadImage(this.IMAGE_COINS[0]);
    this.loadImages(this.IMAGE_COINS);

    this.calculatePlacement(400, 500, 50);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGE_COINS);
    }, 200);
  }
}
