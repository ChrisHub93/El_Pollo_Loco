class World extends Collision {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  camera_x = 0;
  statusBarHealth = new StatusBar(30, 0, "IMAGES_HEALTH", 100);
  statusBarCoins = new StatusBar(30, 45, "IMAGES_COIN", 0);
  statusBarBottles = new StatusBar(30, 95, "IMAGES_BOTTLE", 0);
  statusBarEnboss = new StatusBar(470, 6, "IMAGES_ENDBOSS", 100);
  endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
  onHit = false;
  throwableObjects = [];

  constructor(canvas) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.setWorld();
    this.run();
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
    if (!gameStopped) {
      requestAnimationFrame(function () {
        self.draw();
      });
    }
   
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
    }, 10);
    setInterval(() => {
      this.checkThrowableObjects();
      this.checkBottleHit();
    }, 80);
  }

  characterEndbossPosition() {
    if (this.characterOnBossPosition()) {
      this.character.isOnEndbossPosition = true;
      keyboard.keyboardReady = false;
      this.endboss.animateStartFrequency();
    }
    if (this.endboss.isOnPlace) keyboard.keyboardReady = true;
  }

  characterOnBossPosition() {
    return (
      this.character.x >= 2900 && this.character.isOnEndbossPosition == false
    );
  }

  removeItem(collected, xCoord) {
    this.level[collected] = this.level[collected].filter(
      (item) => item.x !== xCoord
    );
  }

  checkThrowableObjects() {
    if (this.canBottleBeThrown()) {
      this.throwBottles();
      keyboard.B = false;
    }
  }

  canBottleBeThrown() {
    return (
      keyboard.B === true &&
      this.statusBarBottles.percentage > 0 &&
      keyboard.keyboardReady
    );
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
    //mO.devToolDrawFrame(this.ctx);
    //mO.devToolDrawHitbox(this.ctx);
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
