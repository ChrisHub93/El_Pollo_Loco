class Character extends MoveableObject {
  height = 280;
  y = 147;
  x = 2800; //!!!! Nur zum TEST Zeile muss wieder gelöscht werden!!!!!!
  speed = 10;
  isOnEndbossPosition = false;
  IMAGE_WALKING = [
    "../assets/img/2_character_pepe/2_walk/W-21.png",
    "../assets/img/2_character_pepe/2_walk/W-22.png",
    "../assets/img/2_character_pepe/2_walk/W-23.png",
    "../assets/img/2_character_pepe/2_walk/W-24.png",
    "../assets/img/2_character_pepe/2_walk/W-25.png",
    "../assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "../assets/img/2_character_pepe/3_jump/J-31.png",
    "../assets/img/2_character_pepe/3_jump/J-32.png",
    "../assets/img/2_character_pepe/3_jump/J-33.png",
    "../assets/img/2_character_pepe/3_jump/J-34.png",
    "../assets/img/2_character_pepe/3_jump/J-35.png",
    "../assets/img/2_character_pepe/3_jump/J-36.png",
    "../assets/img/2_character_pepe/3_jump/J-37.png",
    "../assets/img/2_character_pepe/3_jump/J-38.png",
    "../assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "../assets/img/2_character_pepe/4_hurt/H-41.png",
    "../assets/img/2_character_pepe/4_hurt/H-42.png",
    "../assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "../assets/img/2_character_pepe/5_dead/D-51.png",
    "../assets/img/2_character_pepe/5_dead/D-52.png",
    "../assets/img/2_character_pepe/5_dead/D-53.png",
    "../assets/img/2_character_pepe/5_dead/D-54.png",
    "../assets/img/2_character_pepe/5_dead/D-55.png",
    "../assets/img/2_character_pepe/5_dead/D-56.png",
    "../assets/img/2_character_pepe/5_dead/D-57.png",
  ];

  world;

  // Offset für die Collision, damit nicht am Kasten direkt die Kollision ist, sonder am Charakter
  offset = {
    top: 120,
    left: 30,
    right: 40,
    bottom: 10,
  };

  constructor() {
    super().loadImage("../assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGE_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveCharacter();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimationsCharacter();
    }, 160);
  }

  moveCharacter() {
    // sound pause()
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.canJump()) this.jump(30);
    this.world["camera_x"] = -this.x + 100;
  }

  playAnimationsCharacter() {
    if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
    else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
    else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
    else if (this.canAnimate()) this.playAnimation(this.IMAGE_WALKING);
  }

  canMoveRight() {
    return (
      this.world["keyboard"]["D"] &&
      this.x < this.world["level"]["level_end_x"] &&
      this.world.keyboard.keyboardReady
    );
  }

  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    // walking sound play()
  }

  canMoveLeft() {
    return (
      this.world["keyboard"]["A"] &&
      this.x > 0 &&
      this.world.keyboard.keyboardReady
    );
  }

  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    // walking sound play()
  }

  canJump() {
    return (
      this.world["keyboard"]["W"] &&
      !this.isAboveGround() &&
      this.world.keyboard.keyboardReady
    );
  }

  canAnimate() {
    return (
      this.world["keyboard"]["D"] ||
      (this.world["keyboard"]["A"] && this.world.keyboard.keyboardReady)
    );
  }
}
