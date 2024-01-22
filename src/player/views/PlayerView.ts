import { MeshBuilder, Scene, Vector3, Mesh, Color3, StandardMaterial } from '@babylonjs/core';
import PlayerModel from '../models/PlayerModel';

class PlayerView {
    private _playerMesh: Mesh;
    private _scene: Scene;
    private _model: PlayerModel;

    constructor(scene: Scene, model: PlayerModel) {
        this._scene = scene;
        this._model = model;
        this._initializePlayerMesh();

        model.onPositionChanged = (newPosition) => {
            this._playerMesh.position = newPosition;
        };
    }

    private _initializePlayerMesh(): void {
        // Create a simple box to represent the player
        this._playerMesh = MeshBuilder.CreateBox('player', { size: 1 }, this._scene);
        this._playerMesh.position = new Vector3(0, 0, 5); // Position the player slightly away from the camera

        // Applying a basic color to the player mesh
        const material = new StandardMaterial('playerMaterial', this._scene);
        material.diffuseColor = new Color3(1, 0, 0); // Red color
        this._playerMesh.material = material;
    }

    public dispose(): void {
        if (this._playerMesh) {
            this._playerMesh.dispose();
        }
        // Additional cleanup as needed
    }
    // Additional methods to update player's view (like animations) can be added here
}

export default PlayerView;
