import { Axis, Mesh, MeshBuilder, Scene, Space, Vector3 } from '@babylonjs/core';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Rectangle } from '@babylonjs/gui/2D/controls/rectangle';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';

export default class DebugConsole {
    private _log: string;

    private _plane: Mesh;
    private _debugPanel: TextBlock;
    private _scene: Scene;

    constructor(scene: Scene) {
        this._scene = scene;
        this._log = '';
        this._initializeDebugPanel();
    }

    private _initializeDebugPanel(): void {
        // Création du plan pour le panneau de débogage
        this._plane = MeshBuilder.CreatePlane('debugPanel', { width: 1, height: 0.25 }, this._scene);
        this._plane.isVisible = false;

        // Configuration de la texture avancée
        const advancedTexture = AdvancedDynamicTexture.CreateForMesh(this._plane, 1024, 256, true);

        // Configuration du rectangle du panneau de débogage
        const debugPanel = new Rectangle('debugPanel');
        debugPanel.width = 0.5;
        debugPanel.height = '200px';
        debugPanel.color = 'white';
        debugPanel.thickness = 4;
        debugPanel.background = 'black';
        debugPanel.alpha = 0.5;
        debugPanel.isHitTestVisible = false;
        advancedTexture.addControl(debugPanel);

        // Configuration du TextBlock pour l'affichage des informations
        this._debugPanel = new TextBlock();
        this._debugPanel.color = 'white';
        this._debugPanel.fontSize = 24;
        debugPanel.addControl(this._debugPanel);
    }

    public update(fps: string): void {
        this._debugPanel.text = `Debug Info\n${fps}\n\n${this._log}`;

        // Mise à jour de la position du panneau de débogage
        const camera = this._scene.activeCamera;
        const cameraPosition = camera.position;
        const forward = new Vector3(0, -0.2, 1);
        this._plane.position = cameraPosition.add(camera.getDirection(forward).scale(2));

        // Rotation du panneau pour faire face à la caméra
        this._plane.lookAt(cameraPosition);
        this._plane.rotate(Axis.Y, Math.PI, Space.LOCAL);
    }

    public toggleDebug(): void {
        this._plane.isVisible = !this._plane.isVisible;
    }

    public log(message: string): void {
        this._log += message + '\n';
    }
}
