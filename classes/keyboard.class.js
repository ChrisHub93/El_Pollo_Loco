/**
 * Represents the keyboard input handler for the game.
 * Tracks key states for controlling the character and other actions.
 */
class Keyboard {
  keyboardReady = true;
  W = false;
  A = false;
  D = false;
  B = false;
  IDLE = false;
  LONG_IDLE = false;

  idleTimeout = null;
  longIdleTimeout = null;

  touchButtons = [
    "touchBtnUp",
    "touchBtnLeft",
    "touchBtnRight",
    "touchBtnThrow",
  ];

  /**
   * Initializes a new instance of the Keyboard class.
   * Sets up default key states, idle timers, and event listeners for keyboard and touch input.
   */
  constructor() {
    window.addEventListener("keydown", (e) => this.handleKey(e, true));
    window.addEventListener("keyup", (e) => this.handleKey(e, false));

    this.touchButtons.forEach((id) => {
      const btn = document.getElementById(id);
      if (!btn) return;

      btn.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault();
          this.handleKey(e, true);
        },
        { passive: false }
      );

      btn.addEventListener("touchend", (e) => {
        e.preventDefault();
        this.handleKey(e, false);
      });
    });

    this.setIdle(this.D, true);
  }

  /**
   * Handles key or touch input and updates the corresponding key state.
   *
   * @param {KeyboardEvent|TouchEvent} e - The event triggered by keyboard or touch input.
   * @param {boolean} isPressed - True if the key or touch is pressed, false if released.
   */
  handleKey(e, isPressed) {
    const key = e.key;

    if (key === "w" || key === "W" || e.target.id === "touchBtnUp")
      this.setIdle("W", isPressed);

    if (key === "a" || key === "A" || e.target.id === "touchBtnLeft")
      this.setIdle("A", isPressed);

    if (key === "d" || key === "D" || e.target.id === "touchBtnRight")
      this.setIdle("D", isPressed);

    if (key === "b" || key === "B" || e.target.id === "touchBtnThrow")
      this.setIdle("B", isPressed);
  }

  /**
   * Updates the state of a key and manages idle timers.
   *
   * @param {"W" | "A" | "D" | "B"} key - The key to update.
   * @param {boolean} isPressed - True if the key is pressed, false if released.
   */
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
