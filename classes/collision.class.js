/**
 * Represents a collision object.
 */
class Collision {
  /**
   * Checks for collisions with enemies and collectible items.
   *
   * - Calls {@link collisionEnemys} to handle enemy collisions.
   * - Calls {@link collisionItems} with `"coins"` to handle coin pickups and update the coin status bar.
   * - Calls {@link collisionItems} with `"bottles"` to handle bottle pickups and update the bottle status bar.
   */
  checkCollisions() {
    this.collisionEnemys();
    this.collisionItems("coins", this.statusBarCoins);
    this.collisionItems("bottles", this.statusBarBottles);
  }

  /**
   * Checks if any thrown bottle collides with the end boss.
   *
   * - Iterates over all throwable objects (bottles).
   * - If a collision is detected via {@link canBossHit}:
   *   - Resets and (optionally) plays the punch audio.
   *   - Marks the bottle as having hit (`hasHit = true`).
   *   - Plays a splash animation at the bottle's Y position.
   *   - Removes the bottle after 80 ms.
   *   - Updates the end boss status via {@link updateEndbossStatus}.
   *   - If the end boss's energy reaches 0, sets `isDead` to true.
   */
  checkBottleHit() {
    this.throwableObjects.forEach((bottle, index) => {
      if (this.canBossHit(bottle)) {
        resetAudio(AUDIO_PUNCH);
        bottle.hasHit = true;
        bottle.splashAnimation(bottle.y);

        if (soundOn) AUDIO_PUNCH.play();

        setTimeout(() => {
          this.throwableObjects.splice(index, 1);
        }, 80);
        this.updateEndbossStatus();
        if (this.endboss.energy === 0) this.endboss.isDead = true;
      }
    });
  }

  /**
   * Updates the end boss's energy status after being hit.
   *
   * - Reduces the end boss's energy by 25.
   * - Updates the end boss status bar with the new energy percentage.
   * - Resets the `lastHit` timestamp to the current time.
   */
  updateEndbossStatus() {
    this.endboss.energy -= 20;
    this.statusBarEnboss.setPercentage(this.endboss.energy);
    this.endboss.lastHit = new Date().getTime();
  }

  /**
   * Handles collisions between the character and collectible items (coins or bottles).
   *
   * - Iterates over all items of the given type in the current level.
   * - If the character collides with an item:
   *   - Calls {@link Character#hitItem} to update the character's inventory.
   *   - Updates the given status bar with the new item percentage.
   *   - Removes the item from the level using {@link removeItem}.
   *   - Plays a corresponding sound effect (bottle or coin) if sound is enabled.
   *
   * @param {"bottles" | "coins"} itemType - The type of item to check collisions for.
   * @param {object} statusBar - The status bar instance that displays the collected item count.
   */
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

  /**
   * Handles collisions between the character and enemies.
   *
   * - Iterates over all enemies in the current level.
   * - Skips enemies that are already dead.
   * - If the character collides with an enemy:
   *   - If the collision comes from above, the enemy is stomped using {@link resolveEnemyStomp}.
   *   - Otherwise, if the character has not just been hit, applies damage with {@link characterGetsHurt}.
   */
  collisionEnemys() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead) return;

      if (this.character.isColliding(enemy)) {
        if (this.isFromAbove(enemy)) this.resolveEnemyStomp(enemy);
        else if (!this.onHit) this.characterGetsHurt(enemy);
      }
    });
  }

  /**
   * Checks if the given bottle can hit the endboss.
   *
   * - A bottle can only hit if it has not already hit something (`hasHit === false`).
   * - Additionally, a collision with the endboss must be detected via {@link Endboss#bottleIsColliding}.
   *
   * @param {object} bottle - The thrown bottle object to check for collision.
   * @returns {boolean} - `true` if the bottle can hit the endboss, otherwise `false`.
   */
  canBossHit(bottle) {
    return !bottle.hasHit && this.endboss.bottleIsColliding(bottle);
  }

  /**
   * Removes a collected item from the level by filtering it out.
   *
   * @param {string} collected - The type of item collection (e.g., `"coins"`, `"bottles"`).
   * @param {number} xCoord - The x-coordinate of the item to remove.
   */
  removeItem(collected, xCoord) {
    this.level[collected] = this.level[collected].filter(
      (item) => item.x !== xCoord
    );
  }

  /**
   * Checks if the character collides with an enemy from above.
   *
   * - Special case: If the enemy is an {@link Endboss}, this will always return `false`.
   * - Otherwise, it compares the character’s bottom edge with the enemy’s top edge
   *   while ensuring the character is moving downward (`speedY < 0`).
   *
   * @param {object} enemy - The enemy object to check against (can be any enemy, including Endboss).
   * @returns {boolean} `true` if the character approaches the enemy from above, otherwise `false`.
   */
  isFromAbove(enemy) {
    if (enemy instanceof Endboss) return false;

    const charBottom =
      this.character.y + this.character.height - this.character.offset.bottom;
    const enemyTop = enemy.y + enemy.offset.top;

    return (
      charBottom >= enemyTop &&
      charBottom <= enemy.y + enemy.height - enemy.offset.bottom &&
      this.character.speedY < 0
    );
  }

  /**
   * Resolves the event when the character stomps on an enemy from above.
   *
   * - Plays the enemy hit audio (resets and optionally plays if sound is enabled).
   * - Triggers the enemy’s {@link Enemy#onHit} behavior.
   * - Makes the character bounce upwards (`jump(15)`).
   * - Removes the enemy from the level after a short delay (400ms).
   *
   * @param {object} enemy - The enemy object that was stomped (e.g., a standard enemy or Endboss).
   */
  resolveEnemyStomp(enemy) {
    resetAudio(AUDIO_HIT_ENEMY);
    enemy.onHit();
    this.character.jump(15);
    if (soundOn) AUDIO_HIT_ENEMY.play();

    setTimeout(() => {
      this.removeItem("enemies", enemy.x);
    }, 400);
  }

  /**
   * Handles the event when the character gets hurt by an enemy.
   *
   * - Resets and optionally plays the hit sound.
   * - Sets the `onHit` flag to prevent multiple simultaneous hits.
   * - Reduces the character's energy and updates the health status bar.
   * - Pushes the character backward depending on the enemy's position.
   *
   * @param {object} enemy - The enemy object that damages the character (e.g., a standard enemy or Endboss).
   */
  characterGetsHurt(enemy) {
    resetAudio(AUDIO_HIT);
    this.onHit = true;
    this.character.hitEnemy();
    this.statusBarHealth.setPercentage(this.character.energy);
    this.characterPushBack(enemy);
    if (soundOn) AUDIO_HIT.play();
  }

  /**
   * Pushes the character backward when getting hit by an enemy.
   *
   * - Temporarily disables keyboard input to prevent movement during pushback.
   * - Applies a stronger push if the enemy is the Endboss.
   * - Initiates a small jump while being pushed back.
   * - Automatically resets pushback state after a short delay.
   *
   * @param {object} enemy - The enemy object that caused the pushback (e.g., standard enemy or Endboss).
   */
  characterPushBack(enemy) {
    if (this.character.x < 0) {
      this.resetPushbackState();
      return;
    }
    keyboard.keyboardReady = false;
    if (this.pushBackInterval) clearInterval(this.pushBackInterval);

    this.pushBackInterval = setInterval(() => {
      if (enemy.character === "endboss") this.character.x -= 8;
      else this.character.x -= 4;
    }, 10);

    this.character.jump(15);
    setTimeout(() => this.resetPushbackState(), 700);
  }

  /**
   * Resets all pushback states after the character has been hit.
   *
   * - Stops any ongoing pushback interval.
   * - Re-enables keyboard input.
   * - Resets the onHit flag to allow normal character actions.
   */
  resetPushbackState() {
    clearInterval(this.pushBackInterval);
    this.pushBackInterval = null;
    keyboard.keyboardReady = true;
    this.onHit = false;
  }
}
