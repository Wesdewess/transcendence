import { DebugPanel } from "./support/debugpanel";
export class Joystick {
    /**
     * Creates a joystick object for one player
     * @param joystickNumber The number of the first joystick (starts at 0)
     * @param numOfButtons The number of buttons needed by your game
     * @param debug true for in browser gamepad info
     */
    constructor(joystickNumber, numOfButtons, debug) {
        this.DEBUG = false;
        // BUT1 and BUT2 are the indexes of the redirect function. 
        // When both are pressed, redirect to homepage
        this.BUT1 = 8;
        this.BUT2 = 9;
        // FIELDS
        this.joystickNumber = 0;
        this.numberOfBUttons = 0;
        this.buttonEvents = [];
        this.axes = [];
        this.joystickNumber = joystickNumber;
        this.numberOfBUttons = numOfButtons;
        this.DEBUG = debug;
        for (let i = 0; i < this.numberOfBUttons; i++) {
            this.buttonEvents.push('joystick' + this.JoystickNumber + 'button' + (i));
        }
        if (this.DEBUG) {
            this.debugPanel = new DebugPanel(this, this.numberOfBUttons);
        }
    }
    // PROPERTIES
    // Axes as booleans
    get Left() { return (this.axes[0] == -1); }
    get Right() { return (this.axes[0] == 1); }
    get Up() { return (this.axes[1] == -1); }
    get Down() { return (this.axes[1] == 1); }
    // Axes as direction
    // values are -1, 0, 1 because arcade sticks are digital
    get Y() { return Math.round(this.axes[1]); }
    get X() { return Math.round(this.axes[0]); }
    // Joystick identifier
    get JoystickNumber() { return this.joystickNumber; }
    get ButtonEvents() { return this.buttonEvents; }
    // Current gamepad
    get Gamepad() { return this.gamepad; }
    set Gamepad(gamepad) { this.gamepad = gamepad; }
    // previous gamepad
    get PreviousGamepad() { return this.previousGamepad; }
    set PreviousGamepad(previousGamepad) { this.previousGamepad = previousGamepad; }
    update() {
        let gamepad = navigator.getGamepads()[this.gamepad.index];
        if (gamepad) {
            this.readGamepad(gamepad);
        }
    }
    readGamepad(gamepad) {
        for (let index = 0; index < this.numberOfBUttons; index++) {
            if (this.buttonPressed(gamepad.buttons[index]) && !this.buttonPressed(this.previousGamepad.buttons[index])) {
                document.dispatchEvent(new Event(this.buttonEvents[index]));
            }
            if (this.buttonPressed(gamepad.buttons[this.BUT1]) &&
                this.buttonPressed(gamepad.buttons[this.BUT2]) &&
                (!this.buttonPressed(this.previousGamepad.buttons[this.BUT1]) || !this.buttonPressed(this.previousGamepad.buttons[this.BUT2]))) {
                document.dispatchEvent(new Event('redirect'));
            }
        }
        // gamepad has 4 axes, first is x, second is y
        // an axe returns a float, only int is needed
        this.axes[0] = Math.round(gamepad.axes[0]);
        this.axes[1] = Math.round(gamepad.axes[1]);
        if (this.DEBUG) {
            // update the axes (x and y)
            this.debugPanel.Axes[0] = this.axes[0];
            this.debugPanel.Axes[1] = this.axes[1];
            this.debugPanel.update();
        }
        this.previousGamepad = gamepad;
    }
    /**
     * Helper function to filter some bad input
     * @param b
     */
    buttonPressed(b) {
        if (typeof (b) == "object") {
            return b.pressed;
        }
        return b == 1.0;
    }
    destroy() {
        if (this.DEBUG)
            this.debugPanel.remove();
    }
}
