class Bottle extends MoveableObject {
  static itemCount = 0;
  y = 330;
  height = 120;
  width = 120;

  offset = {
    top: 35,
    left: 35,
    right: 35,
    bottom: 35,
  };

  IMAGE_BOTTLE = ["../assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

  constructor() {
    super().loadImage(this.IMAGE_BOTTLE[0]);
  

    this.calculatePlacement(300, 420, 70);
  }
}
