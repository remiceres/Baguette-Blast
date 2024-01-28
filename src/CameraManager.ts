import { ArcRotateCamera, Scene, Vector3 } from '@babylonjs/core';

class CameraManager {
    private _scene: Scene;
    private _arcRotateCamera: ArcRotateCamera;

    public constructor(scene: Scene) {
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
            -10,
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
