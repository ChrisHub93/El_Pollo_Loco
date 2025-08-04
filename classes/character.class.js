class Character extends MoveableObject {
  height = 280;
  y = 155;
  speed = 10;
  IMAGE_WALKING = [
    "../assets/img/2_character_pepe/2_walk/W-21.png",
    "../assets/img/2_character_pepe/2_walk/W-22.png",
    "../assets/img/2_character_pepe/2_walk/W-23.png",
    "../assets/img/2_character_pepe/2_walk/W-24.png",
    "../assets/img/2_character_pepe/2_walk/W-25.png",
    "../assets/img/2_character_pepe/2_walk/W-26.png",
  ];
  world;

  constructor() {
    super().loadImage("../assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGE_WALKING);

    this.animate();
  }

  animate() {
    setInterval(() => {
        if (this.world.keyboard.RIGHT) {
            this.x += this.speed;
        }
        if (this.world.keyboard.LEFT) {
            this.x -= this.speed;
        }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % this.IMAGE_WALKING.length;
        let path = this.IMAGE_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 100);
  }

  jump() {}
}
