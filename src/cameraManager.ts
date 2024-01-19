import { ArcRotateCamera, Scene, Vector3 } from '@babylonjs/core';

/**
 * CameraManager is a singleton class responsible for managing cameras in a Babylon.js scene.
 */
class CameraManager {
    private static _instance: CameraManager = new CameraManager();
    private _scene: Scene;
    private _arcRotateCamera: ArcRotateCamera;

    // Private constructor to enforce singleton pattern
    private constructor() {}

    /**
     * Retrieves the singleton instance of CameraManager.
     * @returns {CameraManager} The singleton instance of the CameraManager.
     */
    public static getInstance(): CameraManager {
        return CameraManager._instance;
    }

    /**
     * Sets the scene for which the camera is to be managed.
     * @param {Scene} scene - The Babylon.js scene.
     */
    public setScene(scene: Scene): void {
        this._scene = scene;
    }

    /**
     * Creates and initializes an ArcRotateCamera for the scene.
     */
    public createCamera(): void {
        this._arcRotateCamera = new ArcRotateCamera(
            'Camera',
            Math.PI / 2,
            Math.PI / 2,
            10,
            Vector3.Zero(),
            this._scene
        );
        // Attach the camera controls to the canvas
        this._arcRotateCamera.attachControl(this._scene.getEngine().getRenderingCanvas(), true);
    }

    /**
     * Gets the ArcRotateCamera managed by this CameraManager.
     * @returns {ArcRotateCamera} The ArcRotateCamera instance.
     */
    public get arcRotateCamera(): ArcRotateCamera {
        return this._arcRotateCamera;
    }
}

export default CameraManager;
