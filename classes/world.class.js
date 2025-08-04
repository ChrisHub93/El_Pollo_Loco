class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgroundObjects = [
    new BackgroundObject("../assets/img/5_background/layers/air.png", 0),
    new BackgroundObject(
      "../assets/img/5_background/layers/3_third_layer/1.png",
      0
    ),
    new BackgroundObject(
      "../assets/img/5_background/layers/2_second_layer/1.png",
      0
    ),
    new BackgroundObject(
      "../assets/img/5_background/layers/1_first_layer/1.png",
      0
    ),
  ];
  ctx;
  canvas;
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld(){
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);

    // Dadurch draw() wird immer wieder aufgerufen ->
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
    if (mO.otherDirection){
        this.ctx.save(); // der aktuelle status wird gespeichert
        this.ctx.translate(mO.width, 0); // Die breite des Bildes nach rechts oder links verschieben
        this.ctx.scale(-1, 1); // wird gespiegelt (auch die x Coordinate)
        mO.x = mO.x * -1 // X Coordinate wird wieder richtig gemacht
    }
    this.ctx.drawImage(mO["img"], mO["x"], mO["y"], mO["width"], mO["height"]);
    if (mO.otherDirection){
        mO.x = mO.x * -1
        this.ctx.restore();
    }
  }
}
