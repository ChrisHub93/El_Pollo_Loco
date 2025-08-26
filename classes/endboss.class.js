class Endboss extends MoveableObject {
  height = 400;
  width = 250;
  y = 50;
  isOnPlace = false;
  steps = 0;
  character = "endboss";

  offset = {
    top: 60,
    left: 60,
    right: 35,
    bottom: 60,
  };

  IMAGES_WALK = [
    "../assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "../assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "../assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "../assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "../assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "../assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "../assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "../assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "../assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "../assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "../assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "../assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "../assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "../assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "../assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "../assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "../assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "../assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "../assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "../assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "../assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "../assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "../assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "../assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "../assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "../assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3450;
  }

  animateStartFrequency() {
    this.startInterval = setInterval(() => {
      this.startFrequence();
    }, 80);
  }

  startFrequence() {
    this.playAnimation(this.IMAGES_WALK);
    if (this.x > 3249) this.x -= 10;
    else if (this.x <= 3249) {
      this.isOnPlace = true;
      this.animate();
    }
  }

  stopAllIntervals() {
    clearInterval(this.startInterval);
    clearInterval(this.playAnimationsCharacterInterval);
    clearInterval(this.moveForwardInterval);
    clearInterval(this.stepInterval);
  }

  animate() {
    this.stopAllIntervals();
    this.animation();
    if (this.isDead) return;

    this.moveForwardInterval = setInterval(() => {
      this.moveForward();
    }, 3000);
  }

  animation() {
    this.playAnimationsCharacterInterval = setInterval(() => {
      if (this.isDead) this.playAnimation(this.IMAGES_DEAD);
      else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
      else this.playAnimation(this.IMAGES_ATTACK);
    }, 160);
  }

  moveForward() {
    clearInterval(this.playAnimationsCharacterInterval);
    this.steps = 0;

    this.stepInterval = setInterval(() => {
      if (this.isHurt()) {
        this.stopAllIntervals();
        this.animate();
        return;
      }
      this.walk();
      if (this.steps >= 12) {
        clearInterval(this.stepInterval);
        this.animation();
      }
    }, 80);
  }

  walk() {
    this.playAnimation(this.IMAGES_WALK);
    this.x -= 10;
    this.steps++;
  }

  bottleIsColliding(mO) {
    return (
      this.x + this.width - this.offset.right > mO.x + mO.offset.left &&
      this.y + this.height - this.offset.bottom > mO.y + mO.offset.top &&
      this.x + this.offset.left < mO.x + mO.width - mO.offset.right &&
      this.y + this.offset.top < mO.y + mO.height - mO.offset.bottom
    );
  }
}
