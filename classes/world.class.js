class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBarHealth = new StatusBar(0, "IMAGES_HEALTH", 100);
  statusBarCoins = new StatusBar(45, "IMAGES_COIN", 0);
  statusBarBottles = new StatusBar(95, "IMAGES_BOTTLE", 0);

  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  // Übergebe alles von der Klasse "World" um funktionen aus World auch in der Klasse "Character"
  // anwenden zu können.
  setWorld() {
    this.character.world = this;
  }

  // Überprüft, ob der Charakter mit einem Gegner kollidiert.
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowableObjects();
    }, 10);
  }

  checkCollisions() {
    this.collisionEnemys();
    this.collisionItems("coins", this.statusBarCoins);
    this.collisionItems("bottles", this.statusBarBottles);
  }

  collisionEnemys() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        let fromAbove =
          this.character.y + this.character.height >= enemy.y &&
          this.character.y + this.character.height <= enemy.y + enemy.height &&
          this.character.speedY < 0;
      
        if (fromAbove) {          
          this.removeItem("enemies", enemy.x);
          this.character.jump(15); // Rückstoß nach oben
        } else {
          this.character.hitEnemy();
          this.statusBarHealth.setPercentage(this.character.energy);
        }
      }
    });
  }

  collisionItems(itemType, statusBar) {
    this.level[itemType].forEach((item) => {
      if (this.character.isColliding(item)) {
        this.character.hitItem(itemType);
        statusBar.setPercentage(this.character[itemType]);
        this.removeItem(itemType, item.x);
      }
    });
  }

  removeItem(collected, xCoord) {
    this.level[collected] = this.level[collected].filter(
      (item) => item.x !== xCoord
    );
  }

  checkThrowableObjects() {
    if (this.canBottleBeThrown()) this.throwBottles();
  }

  canBottleBeThrown() {
    return this.keyboard.SPACE === true && this.statusBarBottles.percentage > 0;
  }

  throwBottles() {
    let bottle = new ThrowableObject(
      this.character.x + 100,
      this.character.y + 100
    );
    this.throwableObjects.push(bottle);
    this.character.throwItem("bottles");
    this.statusBarBottles.setPercentage(this.character.bottles);
  }

  // Alles, was gerendert werden soll und wird in einer endlosschleife aktualisiert.
  // Wie oft, hängt von der Performance der Grafikkarte ab.
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.backgroundObjects();

    this.hudElements();

    this.levelObjects();

    // Dadurch wird draw() immer wieder aufgerufen ->
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  backgroundObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level["backgroundObjects"]);
    this.addObjectsToMap(this.level["clouds"]);
    this.ctx.translate(-this.camera_x, 0);
  }

  hudElements() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
    this.ctx.translate(this.camera_x, 0);
  }

  levelObjects() {
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level["enemies"]);
    this.addObjectsToMap(this.level["coins"]);
    this.addObjectsToMap(this.level["bottles"]);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
  }

  addObjectsToMap(object) {
    object.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mO) {
    // Speiegeln des Characters
    if (mO.otherDirection) {
      this.flipImage(mO);
    }
    mO.draw(this.ctx);
    mO.drawFrame(this.ctx);
    mO.drawHitbox(this.ctx);
    if (mO.otherDirection) {
      this.flipImageBack(mO);
    }
  }

  flipImage(mO) {
    this.ctx.save(); // der aktuelle status wird gespeichert (wie ein Screenshot)
    this.ctx.translate(mO["width"], 0); // Ursprung des Kontexts nach rechts verschieben (um Breite des Objekts)
    this.ctx.scale(-1, 1); // Horizontale Spiegelung (Spiegelung an der y-Achse)
    mO.x = mO.x * -1; // Die X-Koordinate wird angepasst, da nach dem Spiegeln negative Koordinaten nötig sind
  }

  flipImageBack(mO) {
    this.ctx.restore();
    mO.x = mO.x * -1;
  }
}
