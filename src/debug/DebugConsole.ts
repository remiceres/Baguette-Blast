import { Axis, Mesh, MeshBuilder, Scene, Space, Vector3 } from '@babylonjs/core';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Rectangle } from '@babylonjs/gui/2D/controls/rectangle';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';

/**
 * Class representing a debug console within a Babylon.js scene.
 * It creates a panel in the 3D scene for displaying debug information.
 */
export default class DebugConsole {
    private _log: string;
    private _plane: Mesh;
    private _debugPanel: TextBlock;
    private _scene: Scene;

    /**
     * Constructor for the DebugConsole class.
     * @param {Scene} scene - The Babylon.js scene where the debug console will be displayed.
     */
    constructor(scene: Scene) {
        this._scene = scene;
        this._log = '';
        this._initializeDebugPanel();
    }

    /**
     * Initializes the debug panel in the 3D scene.
     * This involves creating a plane to serve as the panel and setting up the text display.
     */
    private _initializeDebugPanel(): void {
        // Create a plane for the debug panel
        this._plane = MeshBuilder.CreatePlane('debugPanel', { width: 1, height: 0.25 }, this._scene);
        this._plane.isVisible = true;

        // Setting up the advanced texture
        const advancedTexture = AdvancedDynamicTexture.CreateForMesh(this._plane, 1024, 256, true);

        // Configuring the debug panel's rectangle
        const debugPanel = new Rectangle('debugPanel');
        debugPanel.width = 0.5;
        debugPanel.height = '200px';
        debugPanel.color = 'white';
        debugPanel.thickness = 4;
        debugPanel.background = 'black';
        debugPanel.alpha = 0.5;
        debugPanel.isHitTestVisible = false;
        advancedTexture.addControl(debugPanel);

        // Configuring the TextBlock for displaying information
        this._debugPanel = new TextBlock();
        this._debugPanel.color = 'white';
        this._debugPanel.fontSize = 24;
        debugPanel.addControl(this._debugPanel);
    }

    /**
     * Updates the debug panel with new information.
     * @param {string} fps - The current frames per second to display.
     */
    public update(fps: string): void {
        this._debugPanel.text = `Debug Info\n${fps}\n\n${this._log}`;

        // Update the position of the debug panel
        const camera = this._scene.activeCamera;
        const cameraPosition = camera.position;
        const forward = new Vector3(0, -0.2, 1);
        this._plane.position = cameraPosition.add(camera.getDirection(forward).scale(2));

        // Rotate the panel to face the camera
        this._plane.lookAt(cameraPosition);
        this._plane.rotate(Axis.Y, Math.PI, Space.LOCAL);
    }

    /**
     * Toggles the visibility of the debug panel.
     */
    public toggleDebug(): void {
        this._plane.isVisible = !this._plane.isVisible;
    }

    /**
     * Logs a message to the debug panel.
     * @param {string} message - The message to log.
     */
    public log(message: string): void {
        this._log = message + '\n';
    }
}
