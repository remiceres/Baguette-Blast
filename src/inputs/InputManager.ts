/**
 * The InputManager class provides access to the state of the input devices.
 */
abstract class InputManager {
    private _leftTrigger: { pressed: boolean; value: number };
    private _rightTrigger: { pressed: boolean; value: number };

    private _leftGrip: { pressed: boolean; value: number };
    private _rightGrip: { pressed: boolean; value: number };

    private _leftPrimary: { pressed: boolean };
    private _rightPrimary: { pressed: boolean };

    private _leftSecondary: { pressed: boolean };
    private _rightSecondary: { pressed: boolean };

    private _leftThumbstick: { pressed: boolean; x: number; y: number };
    private _rightThumbstick: { pressed: boolean; x: number; y: number };

    /**
     * Initializes a new instance of the InputManager class.
     */
    public constructor() {
        this._leftTrigger = { pressed: false, value: 0 };
        this._rightTrigger = { pressed: false, value: 0 };

        this._leftGrip = { pressed: false, value: 0 };
        this._rightGrip = { pressed: false, value: 0 };

        this._leftPrimary = { pressed: false };
        this._rightPrimary = { pressed: false };

        this._leftSecondary = { pressed: false };
        this._rightSecondary = { pressed: false };

        this._leftThumbstick = { pressed: false, x: 0, y: 0 };
        this._rightThumbstick = { pressed: false, x: 0, y: 0 };
    }

    /**
     * Sets the state of the trigger button for the given hand.
     * @param hand The hand the trigger belongs to.
     * @param pressed The state of the trigger button.
     * @param value The value of the trigger button.
     */
    protected setTrigger(hand: string, pressed: boolean, value: number): void {
        if (hand === 'left') {
            this._leftTrigger = { pressed, value };
        } else {
            this._rightTrigger = { pressed, value };
        }
    }

    /**
     * Sets the state of the grip button for the given hand.
     * @param hand The hand the grip belongs to.
     * @param pressed The state of the grip button.
     * @param value The value of the grip button.
     */
    protected setGrip(hand: string, pressed: boolean, value: number): void {
        if (hand === 'left') {
            this._leftGrip = { pressed, value };
        } else {
            this._rightGrip = { pressed, value };
        }
    }

    /**
     * Sets the state of the primary button for the given hand.
     * @param hand The hand the primary button belongs to.
     * @param pressed The state of the primary button.
     */
    protected setPrimary(hand: string, pressed: boolean): void {
        if (hand === 'left') {
            this._leftPrimary = { pressed };
        } else {
            this._rightPrimary = { pressed };
        }
    }

    /**
     * Sets the state of the secondary button for the given hand.
     * @param hand The hand the secondary button belongs to.
     * @param pressed The state of the secondary button.
     */
    protected setSecondary(hand: string, pressed: boolean): void {
        if (hand === 'left') {
            this._leftSecondary = { pressed };
        } else {
            this._rightSecondary = { pressed };
        }
    }

    /**
     * Sets the state of the thumbstick for the given hand.
     * @param hand The hand the thumbstick belongs to.
     * @param pressed The state of the thumbstick.
     * @param x The x value of the thumbstick.
     * @param y The y value of the thumbstick.
     */
    protected setThumbstick(hand: string, pressed: boolean, x: number, y: number): void {
        if (hand === 'left') {
            this._leftThumbstick = { pressed, x, y };
        } else {
            this._rightThumbstick = { pressed, x, y };
        }
    }

    // Getters

    public get leftTrigger(): { pressed: boolean; value: number } {
        return this._leftTrigger;
    }

    public get rightTrigger(): { pressed: boolean; value: number } {
        return this._rightTrigger;
    }

    public get leftGrip(): { pressed: boolean; value: number } {
        return this._leftGrip;
    }

    public get rightGrip(): { pressed: boolean; value: number } {
        return this._rightGrip;
    }

    public get leftPrimary(): { pressed: boolean } {
        return this._leftPrimary;
    }

    public get rightPrimary(): { pressed: boolean } {
        return this._rightPrimary;
    }

    public get leftSecondary(): { pressed: boolean } {
        return this._leftSecondary;
    }

    public get rightSecondary(): { pressed: boolean } {
        return this._rightSecondary;
    }

    public get leftThumbstick(): { pressed: boolean; x: number; y: number } {
        return this._leftThumbstick;
    }

    public get rightThumbstick(): { pressed: boolean; x: number; y: number } {
        return this._rightThumbstick;
    }

    /**
     * Hide or show the controllers and laser.
     * @param visible True to show the controllers and laser, false to hide them.
     * @param controllerSide The side of the controller to hide.
     */
    public abstract setControllerVisibility(visible: boolean, controllerSide: 'left' | 'right' | 'both'): void;

    /**
     * Vibrate the controllers.
     * @param handedness witch controller to vibrate
     * @param intensity intensity of the vibration
     * @param duration duration of the vibration
     * @param timeout time before the vibration
     */
    public abstract vibrateController(
        handedness: 'left' | 'right' | 'both',
        intensity: number,
        duration: number,
        timeout: number
    ): void;
}

export default InputManager;
