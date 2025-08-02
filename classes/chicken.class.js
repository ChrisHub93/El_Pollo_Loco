class Chicken extends MoveableObject {
  y = 365;
  height = 60;
  width = 80; 

  IMAGE_WALKING = [
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
  ]

  constructor() {
    super().loadImage(
      "../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGE_WALKING);
    

    this.x = 200 + Math.random() * 500;
    this.animate()
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGE_WALKING.length;
      let path = this.IMAGE_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 130);
  }
}
