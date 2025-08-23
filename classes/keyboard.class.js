class Keyboard {
  constructor() {
    this.keyboardReady = true;
    this.W = false;
    this.A = false;
    this.D = false;
    this.SPACE = false;
    this.IDLE = false;
    this.LONG_IDLE = false;
    this.pressed = false;

    this.idleTimeout = null;
    this.longIdleTimeout = null;

    // Event Listener direkt in der Klasse binden
    window.addEventListener("keydown", (e) => this.handleKey(e, true));
    window.addEventListener("keyup", (e) => this.handleKey(e, false));
  }

  handleKey(e, isPressed) {
    if (e.keyCode == 87) this.setKey("W", isPressed);
    if (e.keyCode == 65) this.setKey("A", isPressed);
    if (e.keyCode == 68) this.setKey("D", isPressed);
    if (e.keyCode === 32) this.setKey("SPACE", isPressed);
  }

  setKey(key, isPressed) {
    this[key] = isPressed;

    if (isPressed) {
      this.pressed = true;
      this.IDLE = false;
      this.LONG_IDLE = false;

      clearTimeout(this.idleTimeout);
      clearTimeout(this.longIdleTimeout);

      this.idleTimeout = setTimeout(() => {
        this.IDLE = true;
      }, 1000);

      this.longIdleTimeout = setTimeout(() => {
        this.LONG_IDLE = true;
      }, 5000);
    } else {
      if (!this.W && !this.A && !this.D && !this.SPACE) {
        this.pressed = false;

        clearTimeout(this.idleTimeout);
        clearTimeout(this.longIdleTimeout);

        this.idleTimeout = setTimeout(() => {
          this.IDLE = true;
        }, 1000);

        this.longIdleTimeout = setTimeout(() => {
          this.LONG_IDLE = true;
        }, 5000);
      }
    }
  }
}
