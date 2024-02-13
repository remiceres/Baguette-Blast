import { MeshBuilder, Scene, Mesh, Color3, StandardMaterial } from '@babylonjs/core';
import PlayerModel from '../models/PlayerModel';
import Game from '../../Game';

class PlayerView {
    private _playerMesh: Mesh;
    private _scene: Scene;
    private _model: PlayerModel;

    constructor(model: PlayerModel) {
        this._model = model;
        this._initializePlayerMesh();
        this._scene = Game.instance.scene;

        model.onPositionChanged = (newPosition) => {
            this._playerMesh.position = newPosition;
        };
    }

    private _initializePlayerMesh(): void {
        // Create a simple box to represent the player
        this._playerMesh = MeshBuilder.CreateBox('player', { size: 1 }, this._scene);
        this._playerMesh.parent = Game.instance.cameraManager.playerCamera;

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
