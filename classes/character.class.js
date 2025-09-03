/**
 * Represents a character object that can be rendered in the game world.
 * Inherits movement behavior from {@link MoveableObject}.
 */
class Character extends MoveableObject {
  height = 280;
  y = 147;
  x = 2800;
  speed = 10;
  isOnEndbossPosition = false;
  world;

  IMAGE_WALKING = [
    "./assets/img/2_character_pepe/2_walk/W-21.png",
    "./assets/img/2_character_pepe/2_walk/W-22.png",
    "./assets/img/2_character_pepe/2_walk/W-23.png",
    "./assets/img/2_character_pepe/2_walk/W-24.png",
    "./assets/img/2_character_pepe/2_walk/W-25.png",
    "./assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "./assets/img/2_character_pepe/3_jump/J-31.png",
    "./assets/img/2_character_pepe/3_jump/J-32.png",
    "./assets/img/2_character_pepe/3_jump/J-33.png",
    "./assets/img/2_character_pepe/3_jump/J-34.png",
    "./assets/img/2_character_pepe/3_jump/J-35.png",
    "./assets/img/2_character_pepe/3_jump/J-36.png",
    "./assets/img/2_character_pepe/3_jump/J-37.png",
    "./assets/img/2_character_pepe/3_jump/J-38.png",
    "./assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "./assets/img/2_character_pepe/4_hurt/H-41.png",
    "./assets/img/2_character_pepe/4_hurt/H-42.png",
    "./assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "./assets/img/2_character_pepe/5_dead/D-51.png",
    "./assets/img/2_character_pepe/5_dead/D-52.png",
    "./assets/img/2_character_pepe/5_dead/D-53.png",
    "./assets/img/2_character_pepe/5_dead/D-54.png",
    "./assets/img/2_character_pepe/5_dead/D-55.png",
    "./assets/img/2_character_pepe/5_dead/D-56.png",
    "./assets/img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_IDLE = [
    "./assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "./assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  offset = {
    top: 120,
    left: 30,
    right: 40,
    bottom: 15,
  };

  /**
   *  Creates a new character object.
   */
  constructor() {
    super().loadImage("./assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGE_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * Animates the character by updating its movement and animations at regular intervals.
   * Also checks whether the character is alive or dead.
   *
   * @remarks
   * - Movement is updated at 60 FPS (`1000/60 ms`).
   * - Character animations and live status checks are updated every 160 ms.
   */
  animate() {
    setInterval(() => {
      this.moveCharacter();
    }, 1000 / 60);

    setInterval(() => {
      this.checkLiveStatus();
      this.playAnimationsCharacter();
    }, 160);
  }

  /**
   * Checks if the character can execute movements and performs them if possible.
   *
   * - Moves the character right if `canMoveRight()` returns true.
   * - Moves the character left if `canMoveLeft()` returns true.
   * - Makes the character jump if `canJump()` returns true, and handles jump sounds.
   * - Updates the camera position in the world relative to the character's X position.
   *
   */
  moveCharacter() {
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.canJump()) {
      this.jump(30);
      AUDIO_STEP.pause();
      if (soundOn) AUDIO_JUMP.play();
    }
    this.world["camera_x"] = -this.x + 100;
  }

  /**
   * Checks the current state of the character and executes the appropriate animation.
   *
   * The function handles the following states:
   * - Dead: calls {@link gameOver()}.
   * - Hurt: plays the hurt animation (`IMAGES_HURT`).
   * - Jumping / above ground: plays the jumping animation (`IMAGES_JUMPING`).
   * - Walking: plays the walking animation (`IMAGE_WALKING`) if the character can animate.
   * - Idle: plays the long idle (`IMAGES_LONG_IDLE`) or normal idle (`IMAGES_IDLE`) animations based on keyboard input.
   *
   */
  playAnimationsCharacter() {
    if (this.isDead) this.gameOver();
    else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
    else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
    else if (this.canAnimate()) this.playAnimation(this.IMAGE_WALKING);
    else if (keyboard.LONG_IDLE) this.playAnimation(this.IMAGES_LONG_IDLE);
    else if (keyboard.IDLE) this.playAnimation(this.IMAGES_IDLE);
  }

  /**
   * Checks whether the character can move to the right.
   *
   * The character can move right if:
   * - The "D" key is pressed.
   * - The character's X position is less than the level's end X coordinate.
   * - The keyboard is ready to accept input.
   *
   * @returns {boolean} True if the character can move right, otherwise false.
   */
  canMoveRight() {
    return (
      keyboard["D"] &&
      this.x < this.world["level"]["level_end_x"] &&
      keyboard.keyboardReady
    );
  }

  /**
   * Moves the character to the right.
   *
   * - Calls the parent class's {@link MoveableObject.moveRight} method.
   * - Sets `otherDirection` to false to ensure correct image loading.
   * - Plays the walking sound if sound is enabled.
   *
   */
  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    if (soundOn) AUDIO_STEP.play();
  }

  /**
   * Checks whether the character can move to the left.
   *
   * The character can move left if:
   * - The "A" key is pressed.
   * - The character's X position is more than 0.
   * - The keyboard is ready to accept input.
   *
   * @returns {boolean} True if the character can move left, otherwise false.
   */
  canMoveLeft() {
    return keyboard["A"] && this.x > 0 && keyboard.keyboardReady;
  }

  /**
   * Moves the character to the left.
   *
   * - Calls the parent class's {@link MoveableObject.moveLeft} method.
   * - Sets `otherDirection` to false to ensure correct image loading.
   * - Plays the walking sound if sound is enabled.
   *
   */
  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    if (soundOn) AUDIO_STEP.play();
  }

  /**
   * Checks whether the character can jump.
   *
   * The character can jump if:
   * - The "W" key is pressed.
   * - The character is above ground.
   * - The keyboard is ready to accept input.
   *
   * @returns {boolean} True if the character can jump, otherwise false.
   */
  canJump() {
    return keyboard["W"] && !this.isAboveGround() && keyboard.keyboardReady;
  }

  /**
   * Checks whether the character can animate.
   *
   * The character can animate if:
   * - The "D" or "A" key is pressed.
   * - The keyboard is ready to accept input.
   *
   * @returns {boolean} True if the character can animate, otherwise false.
   */
  canAnimate() {
    return (keyboard["D"] || keyboard["A"]) && keyboard.keyboardReady;
  }

 /**
 * Plays the death animation for the character and triggers the game over sequence.
 *
 * - Plays the dead animation (`IMAGES_DEAD`).
 * - After 300 ms, sets `gameStopped` to true and displays the game over screen.
 */
  gameOver() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      gameStopped = true;
      this.showGameOverScreen();
    }, 300);
  }
}
