/**
 * Represents a game level with enemies, clouds, background layers, and collectibles.
 */
class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  level_end_x = 2900;

  /**
   * Creates a new Level instance.
   *
   * @param {Array<Enemy>} enemies - The enemies present in the level.
   * @param {Array<Cloud>} clouds - The clouds used for parallax/background effects.
   * @param {Array<BackgroundObject>} backgroundObjects - The layered background images.
   * @param {Array<Coin>} coins - The collectible coins in the level.
   * @param {Array<Bottle>} bottles - The collectible bottles in the level.
   */
  constructor(enemies, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
