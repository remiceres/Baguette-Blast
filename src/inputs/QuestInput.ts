import { WebXRControllerComponent, WebXRDefaultExperience } from '@babylonjs/core';
import InputManager from './InputManager';

/**
 * Class representing the input system for the Oculus Quest controllers.
 * It sets up button listeners for each controller component.
 */
class QuestInput extends InputManager {
    private _xr: WebXRDefaultExperience;

    /**
     * Initializes a new instance of the QuestInput class.
     * @param xr The WebXRDefaultExperience object.
     */
    public constructor(xr: WebXRDefaultExperience) {
        super();
        this._xr = xr;
        this._initializeQuestInput();
    }

    /**
     * Initializes the input system for the Quest controllers.
     */
    private _initializeQuestInput(): void {
        // Add event listener for when a new controller is connected.
        this._xr.input.onControllerAddedObservable.add((controller) => {
            // Initialize motion controller components when available.
            controller.onMotionControllerInitObservable.add((motionController) => {
                // Retrieve component IDs for the motion controller.
                const [triggerId, gripId, thumbstickId, primaryId, secondaryId] = motionController.getComponentIds();
                const handedness = motionController.handedness;

                // Get each component of the motion controller.
                const trigger = motionController.getComponent(triggerId);
                const primary = motionController.getComponent(primaryId);
                const secondary = motionController.getComponent(secondaryId);
                const grip = motionController.getComponent(gripId);
                const thumbstick = motionController.getComponent(thumbstickId);

                // Set up button listeners for each component.
                this._setupButtonListeners(handedness, trigger, primary, secondary, grip, thumbstick);
            });
        });
    }

    /**
     * Sets up button listeners for the given controller components.
     * @param controller The controller handedness.
     * @param trigger The trigger component.
     * @param primary The primary button component.
     * @param secondary The secondary button component.
     * @param grip The grip component.
     */
    private _setupButtonListeners(
        controller: string,
        trigger: WebXRControllerComponent,
        primary: WebXRControllerComponent,
        secondary: WebXRControllerComponent,
        grip: WebXRControllerComponent,
        thumbstick: WebXRControllerComponent
    ): void {
        // Listener for the trigger button.
        trigger.onButtonStateChangedObservable.add((component) => {
            this.setTrigger(controller, component.pressed, component.value);
        });

        // Listener for the primary button.
        primary.onButtonStateChangedObservable.add((component) => {
            this.setPrimary(controller, component.pressed);
        });

        // Listener for the secondary button.
        secondary.onButtonStateChangedObservable.add((component) => {
            this.setSecondary(controller, component.pressed);
        });

        // Listener for the grip button.
        grip.onButtonStateChangedObservable.add((component) => {
            this.setGrip(controller, component.pressed, component.value);
        });

        // Listener for the thumbstick button.
        thumbstick.onButtonStateChangedObservable.add((component) => {
            this.setThumbstick(controller, component.pressed, component.axes.x, component.axes.y);
        });
    }
}

export default QuestInput;
