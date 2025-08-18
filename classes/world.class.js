class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBarHealth = new StatusBar(30, 0, "IMAGES_HEALTH", 100);
  statusBarCoins = new StatusBar(30, 45, "IMAGES_COIN", 0);
  statusBarBottles = new StatusBar(30, 95, "IMAGES_BOTTLE", 0);
  statusBarEnboss = new StatusBar(470, 6, "IMAGES_ENDBOSS", 100);
  endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);

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
      this.characterEndbossPosition();
    }, 20);
    setInterval(() => {
      this.checkThrowableObjects();
      this.checkBottleHit();
    }, 80);
  }

  checkBottleHit() {
    this.throwableObjects.forEach((bottle, index) => {
      if (this.canBossHit(bottle)) {
        bottle.hasHit = true;
        bottle.splashAnimation(bottle.y);

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

  characterEndbossPosition() {
    if (this.characterOnPosition()) {
      this.character.isOnEndbossPosition = true;
      console.log("Ziel erreicht");
      this.keyboard.keyboardReady = false;
      this.startEnbossAnimation();
      if (this.endboss.isOnPlace) this.keyboard.keyboardReady = true;       
      // statusleiste enboss anzeigen
      // endboss soll von rechts nach links ins bild walken
      // endboss
    }
  }

  startEnbossAnimation() {    
    this.endboss.animateStartFrequency();
  }

  characterOnPosition() {
    return (
      this.character.x >= 2900 && this.character.isOnEndbossPosition == false
    );
  }

  checkCollisions() {
    this.collisionEnemys();
    this.collisionItems("coins", this.statusBarCoins);
    this.collisionItems("bottles", this.statusBarBottles);
  }

  collisionEnemys() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead) return;

      if (this.character.isColliding(enemy)) {
        if (this.isFromAbove(enemy)) this.resolveEnemyStomp(enemy);
        else this.characterGetsHurt();
      }
    });
  }

  isFromAbove(enemy) {
    return (
      this.character.y + this.character.height >= enemy.y &&
      this.character.y + this.character.height <= enemy.y + enemy.height &&
      this.character.speedY < 0
    );
  }

  resolveEnemyStomp(enemy) {
    enemy.onHit();
    this.character.jump(15);

    setTimeout(() => {
      this.removeItem("enemies", enemy.x);
    }, 400);
  }

  characterGetsHurt() {
    this.character.hitEnemy();
    this.statusBarHealth.setPercentage(this.character.energy);
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
    if (this.canBottleBeThrown()) {
      this.throwBottles();
      this.keyboard.SPACE = false;
    }
  }

  canBottleBeThrown() {
    return this.keyboard.SPACE === true && this.statusBarBottles.percentage > 0 && this.world.keyboard.keyboardReady;
  }

  throwBottles() {
    let bottle = new ThrowableObject(
      this.character.x + 100,
      this.character.y + 100
    );
    this.throwableObjects.push(bottle);
    this.character.reduceStatus("bottles", 20); // movable-object. bottles wird verrringert
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
    if (this.endboss.isOnPlace) this.addToMap(this.statusBarEnboss);
    this.ctx.translate(this.camera_x, 0);
  }

  levelObjects() {
    this.addObjectsToMap(this.level["enemies"]);
    this.addObjectsToMap(this.level["coins"]);
    this.addObjectsToMap(this.level["bottles"]);
    this.addObjectsToMap(this.throwableObjects);
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
    //mO.drawFrame(this.ctx);
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
