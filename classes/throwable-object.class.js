class ThrowableObject extends MoveableObject {
  speedY = 30;
  speedX = 20;
  rotationInterval = null;
  hasHit = false; 

  IMAGES_BOTTLE_ROTATION = [
    "./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage(
      "./assets/img/7_statusbars/3_icons/icon_salsa_bottle.png"
    );
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 90;
    this.throw();
  }

  throw() {
    this.applyGravity();
  
    this.rotationInterval = setInterval(() => {
      this.x += 10;
      this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
      AUDIO_THROW.play();
  
      if (this.groundHit()) {
        this.splashAnimation(370);
      }
    }, 25);
  }

  groundHit(){
    return this.y >= 300
  }
  
  splashAnimation(y) {
    this.y = y;
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
  
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
      this.rotationInterval = null;
    }
  }
  
}
