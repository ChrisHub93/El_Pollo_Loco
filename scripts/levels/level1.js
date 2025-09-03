let level1;

/**
 * Initializes the first level of the game.
 *
 * This function:
 * 1. Resets the collectible item counts.
 * 2. Creates a new Level instance (`level1`) with:
 *    - Multiple enemies (Chickens, Small Chickens, Endboss).
 *    - Clouds with different images.
 *    - Background layers repeated across several positions.
 *    - Coins and bottles as collectible items.
 */
function initLevelOne() {
  resetItemCounts();

  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new Endboss(),
    ],
    [
      new Cloud("./assets/img/5_background/layers/4_clouds/1.png"),
      new Cloud("./assets/img/5_background/layers/4_clouds/2.png"),
      new Cloud("./assets/img/5_background/layers/4_clouds/1.png"),
      new Cloud("./assets/img/5_background/layers/4_clouds/2.png"),
      new Cloud("./assets/img/5_background/layers/4_clouds/1.png"),
      new Cloud("./assets/img/5_background/layers/4_clouds/2.png"),
      new Cloud("./assets/img/5_background/layers/4_clouds/1.png"),
      new Cloud("./assets/img/5_background/layers/4_clouds/2.png"),
    ],
    // prettier-ignore
    [
            new BackgroundObject("./assets/img/5_background/layers/air.png", -720),
            new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", -720),
            new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", -720),
            new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", -720),
        
            new BackgroundObject("./assets/img/5_background/layers/air.png", 0),
            new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 0),
            new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 0),
            new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 0),
            new BackgroundObject("./assets/img/5_background/layers/air.png", 720),
            new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 720),
            new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 720),
            new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 720),
            
            new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 720*2),
            new BackgroundObject("./assets/img/5_background/layers/air.png", 720*2),
            new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 720*2),
            new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 720*2),
            new BackgroundObject("./assets/img/5_background/layers/air.png", 720*3),
            new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 720*3),
            new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 720*3),
            new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 720*3),
    
            new BackgroundObject("./assets/img/5_background/layers/air.png", 720*3),
            new BackgroundObject("./assets/img/5_background/layers/3_third_layer/2.png", 720*3),
            new BackgroundObject("./assets/img/5_background/layers/2_second_layer/2.png", 720*3),
            new BackgroundObject("./assets/img/5_background/layers/1_first_layer/2.png", 720*3),
            new BackgroundObject("./assets/img/5_background/layers/air.png", 720*4),
            new BackgroundObject("./assets/img/5_background/layers/3_third_layer/1.png", 720*4),
            new BackgroundObject("./assets/img/5_background/layers/2_second_layer/1.png", 720*4),
            new BackgroundObject("./assets/img/5_background/layers/1_first_layer/1.png", 720*4),
    
          ],
    [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()],
    [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()],
    [new Hint("./assets/img/10_hints/hint_jump.png", 50), new Hint("./assets/img/10_hints/hint_throw.png", 3200),]
  );
}
