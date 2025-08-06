class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level["backgroundObjects"]);
    this.addObjectsToMap(this.level["clouds"]);
    this.addObjectsToMap(this.level["enemies"]);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    // Dadurch wird draw() immer wieder aufgerufen ->
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(object) {
    object.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mO) {
    // Speiegeln des Characters
    if (mO.otherDirection) {
      this.ctx.save(); // der aktuelle status wird gespeichert (wie ein Screenshot)
      this.ctx.translate(mO["width"], 0); // Ursprung des Kontexts nach rechts verschieben (um Breite des Objekts)
      this.ctx.scale(-1, 1); // Horizontale Spiegelung (Spiegelung an der y-Achse)
      mO.x = mO.x * -1; // Die X-Koordinate wird angepasst, da nach dem Spiegeln negative Koordinaten nötig sind
    }
    this.ctx.drawImage(mO["img"], mO["x"], mO["y"], mO["width"], mO["height"]);

    this.ctx.beginPath();
    this.ctx.lineWidth = "5";
    this.ctx.strokeStyle = "blue";
    this.ctx.rect(mO["x"], mO["y"], mO["width"], mO["height"]);
    this.ctx.stroke();

    if (mO.otherDirection) {
      this.ctx.restore();
      mO.x = mO.x * -1;
    }
  }
}
