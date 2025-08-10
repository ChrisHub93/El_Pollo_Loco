class ThrowableObject extends MoveableObject {
  speedY = 30;
  speedX = 20;

  constructor(x, y) {
    super().loadImage(
      "../assets/img/7_statusbars/3_icons/icon_salsa_bottle.png"
    );
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 60;
    this.throw(); // Zum testen!
  }

  throw() {
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
