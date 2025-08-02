class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  ctx;
  canvas;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(
      this.character["img"],
      this.character["x"],
      this.character["y"],
      this.character["width"],
      this.character["height"]
    );

    this.enemies.forEach((emeny) => {
      this.ctx.drawImage(
        emeny["img"],
        emeny["x"],
        emeny["y"],
        emeny["width"],
        emeny["height"]
      );
    });

    // draw() wird immer wieder aufgerufen.
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}
