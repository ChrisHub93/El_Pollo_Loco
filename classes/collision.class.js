class Collision {
  checkCollisions() {
    this.collisionEnemys();
    this.collisionItems("coins", this.statusBarCoins);
    this.collisionItems("bottles", this.statusBarBottles);
  }

  checkBottleHit() {
    this.throwableObjects.forEach((bottle, index) => {
      if (this.canBossHit(bottle)) {
        AUDIO_PUNCH.currentTime = 0;
        bottle.hasHit = true;
        bottle.splashAnimation(bottle.y);
        if (soundOn) AUDIO_PUNCH.play();

        setTimeout(() => {
          this.throwableObjects.splice(index, 1); // Flasche verschwindet
        }, 80);
        this.endboss.energy -= 25;
        this.statusBarEnboss.setPercentage(this.endboss.energy);
        this.endboss.lastHit = new Date().getTime();
        if (this.endboss.energy === 0) {
          this.endboss.isDead = true;
        }
      }
    });
  }

  canBossHit(bottle) {
    return !bottle.hasHit && this.endboss.bottleIsColliding(bottle);
  }

  collisionEnemys() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead) return;

      if (this.character.isColliding(enemy)) {
        if (this.isFromAbove(enemy)) this.resolveEnemyStomp(enemy);
        else if (!this.onHit) this.characterGetsHurt(enemy);
      }
    });
  }

  isFromAbove(enemy) {
    if (enemy instanceof Endboss) return false;

    const charBottom =
      this.character.y + this.character.height - this.character.offset.bottom;
    const enemyTop = enemy.y + enemy.offset.top;

    return (
      charBottom >= enemyTop &&
      charBottom <= enemy.y + enemy.height - enemy.offset.bottom &&
      this.character.speedY < 0 // bei dir: fallen = speedY < 0
    );
  }

  resolveEnemyStomp(enemy) {
    AUDIO_HIT_ENEMY.currentTime = 0;
    enemy.onHit();
    this.character.jump(15);
    if (soundOn) AUDIO_HIT_ENEMY.play();

    setTimeout(() => {
      this.removeItem("enemies", enemy.x);
    }, 400);
  }

  characterGetsHurt(enemy) {
    AUDIO_HIT.currentTime = 0;
    this.onHit = true;
    this.character.hitEnemy();
    this.statusBarHealth.setPercentage(this.character.energy);
    this.characterPushBack(enemy);
    if (soundOn) AUDIO_HIT.play();
  }

  characterPushBack(enemy) {
    if (this.character.x < 0) {
      this.resetPushbackState();
      return;
    }
    keyboard.keyboardReady = false;

    if (this.pushBackInterval) clearInterval(this.pushBackInterval);

    this.pushBackInterval = setInterval(() => {
      if (enemy.character == "endboss") this.character.x -= 8;
      else this.character.x -= 4;
    }, 10);

    this.character.jump(15);

    setTimeout(() => this.resetPushbackState(), 700);
  }

  resetPushbackState() {
    clearInterval(this.pushBackInterval);
    this.pushBackInterval = null;
    keyboard.keyboardReady = true;
    this.onHit = false;
  }

  collisionItems(itemType, statusBar) {
    this.level[itemType].forEach((item) => {
      if (this.character.isColliding(item)) {
        this.character.hitItem(itemType);
        statusBar.setPercentage(this.character[itemType]);
        this.removeItem(itemType, item.x);
        if (itemType === "bottles" && soundOn) AUDIO_BOTTLE_HIT.play();
        if (itemType === "coins" && soundOn) AUDIO_COIN_HIT.play();
      }
    });
  }
}
