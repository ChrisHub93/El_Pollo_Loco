class Coin extends MoveableObject {
  static coinCount = 0; // static, gehört zur classe selbst und nicht nur dem einzelnen Objekt
  y = 350;
  height = 120;
  width = 120;

  IMAGE_COINS = [
    "../assets/img/8_coin/coin_1.png",
    "../assets/img/8_coin/coin_2.png",
  ];

  constructor() {
    super().loadImage(this.IMAGE_COINS[0]);
    this.loadImages(this.IMAGE_COINS);

    this.calculatePlacement();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGE_COINS);
    }, 200);
  }

  calculatePlacement() {
    const startX = 400; // Startposition
    const spacing = 500; // Basisabstand
    const randomOffset = Math.random() * 100 - 50; // Zufall von -50px bis +50px

    this.x = startX + Coin.coinCount * spacing + randomOffset;
    Coin.coinCount++;
  }
}
