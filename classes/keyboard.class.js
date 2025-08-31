class Keyboard {
  constructor() {
    this.keyboardReady = true;
    this.W = false;
    this.A = false;
    this.D = false;
    this.B = false;
    this.IDLE = false;
    this.LONG_IDLE = false;

    this.idleTimeout = null;
    this.longIdleTimeout = null;

    window.addEventListener("keydown", (e) => this.handleKey(e, true));
    window.addEventListener("keyup", (e) => this.handleKey(e, false));
    window.addEventListener("touchstart", (e) => this.handleKey(e, true));
    window.addEventListener("touchend", (e) => this.handleKey(e, false));
    this.setKey(this.D, true);
  }

  handleKey(e, isPressed) {
    if (e.keyCode == 87 || e.target.id === "touchBtnUp") this.setIdle("W", isPressed);
    if (e.keyCode == 65 || e.target.id === "touchBtnLeft" ) this.setIdle("A", isPressed);
    if (e.keyCode == 68 || e.target.id === "touchBtnRight") this.setIdle("D", isPressed);
    if (e.keyCode === 66 || e.target.id === "touchBtnThrow") this.setIdle("B", isPressed);
  }

  setIdle(key, isPressed) {
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
      }, 4000);
    }
  }
}
