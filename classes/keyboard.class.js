class Keyboard {
  constructor() {
    this.keyboardReady = true;
    this.W = false;
    this.A = false;
    this.D = false;
    this.SPACE = false;
    this.IDLE = false;
    this.LONG_IDLE = false;

    this.idleTimeout = null;
    this.longIdleTimeout = null;

    window.addEventListener("keydown", (e) => this.handleKey(e, true));
    window.addEventListener("keyup", (e) => this.handleKey(e, false));
    this.setKey(this.D, true);
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
      this.IDLE = false;
      this.LONG_IDLE = false;

      clearTimeout(this.idleTimeout);
      clearTimeout(this.longIdleTimeout);

      this.idleTimeout = setTimeout(() => {
        this.IDLE = true;
      }, 100);

      this.longIdleTimeout = setTimeout(() => {
        this.LONG_IDLE = true;
      }, 3000);
    }
  }
}
