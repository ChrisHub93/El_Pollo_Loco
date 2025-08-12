class Coin extends MoveableObject {
  y = 365;
  height = 60;
  width = 80;

  IMAGE_COINS = [
    "../assets/img/8_coin/coin_1.png",
    "../assets/img/8_coin/coin_2.png",
  ];

  constructor() {
    super().loadImage(this.IMAGE_COINS[0]);
    this.loadImages(this.IMAGE_COINS);

    this.x = 200 + Math.random() * 500;
    animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGE_COINS);
    }, 130);
  }
}
