class Cloud extends MoveableObject {
  static itemCount = 0;
  y = 20;
  width = 500;
  height = 250;

  constructor(imagePath) {
    super().loadImage(imagePath);

    this.calculatePlacementX(200, 600, 60);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
