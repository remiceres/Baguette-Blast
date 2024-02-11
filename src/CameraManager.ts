import { ArcRotateCamera, Camera, Scene, Vector3 } from '@babylonjs/core';
import Game from './Game';
import InputManager from './inputs/InputManager';

/**
 * Manages the cameras within a BabylonJS Scene, including switching
 * between different camera modes such as PC, VR, and Debug modes.
 */
class CameraManager {
    private _scene: Scene;
    private _vrIsEnabled: boolean;
    private _inputManager: InputManager;
    private _currentCamera: ArcRotateCamera;
    private _pcCamera: ArcRotateCamera;
    private _debugCamera: ArcRotateCamera;
    private _debugModeEnabled: boolean = false;
    private _continuePressed: boolean = false;

    /**
     * Initializes the camera manager with scene and VR mode settings.
     * Sets up PC and Debug cameras.
     *
     * @param {Scene} scene - The BabylonJS scene.
     * @param {boolean} vrIsEnabled - Flag to indicate if VR is enabled.
     */
    public constructor(scene: Scene, vrIsEnabled: boolean) {
        this._scene = scene;
        this._vrIsEnabled = vrIsEnabled;

        this._pcCamera = new ArcRotateCamera('pcCamera', Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), scene);
        this._pcCamera.attachControl();
        this._currentCamera = this._pcCamera;

        this._debugCamera = new ArcRotateCamera('debugCamera', Math.PI / 3, Math.PI / 3, 14, Vector3.Zero(), scene);
        this._scene.activeCamera = this._currentCamera;
    }

    /**
     * Switches the active camera to the specified camera.
     * Detaches controls from the current camera and attaches them to the new one.
     *
     * @param {ArcRotateCamera} newCamera - The camera to switch to.
     */
    private _switchCamera(newCamera: ArcRotateCamera): void {
        this._currentCamera.detachControl();
        this._currentCamera = newCamera;
        this._currentCamera.attachControl();
        this._scene.activeCamera = this._currentCamera;
    }

    /**
     * Updates the camera manager state, handling camera switching based on input.
     * If VR is not enabled, listens for a specific input to toggle debug mode.
     */
    public update(): void {
        if (this._vrIsEnabled) {
            return;
        }

        const secondaryPressed = Game.instance.inputManager.leftSecondary.pressed;
        if (secondaryPressed && !this._continuePressed) {
            this._continuePressed = true;
            this._debugModeEnabled = !this._debugModeEnabled;
            this._switchCamera(this._debugModeEnabled ? this._debugCamera : this._pcCamera);
        } else if (!secondaryPressed) {
            this._continuePressed = false;
        }
    }

    /**
     * Gets the active camera, which is the VR camera if VR is enabled, or the PC camera otherwise (no debug camera).
     * @returns {Camera} The active camera, no debug camera.
     */
    public get playerCamera(): Camera {
        return this._vrIsEnabled ? this._scene.activeCamera : this._pcCamera;
    }
}

export default CameraManager;
