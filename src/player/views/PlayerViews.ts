import { Color3, Mesh, MeshBuilder, StandardMaterial } from '@babylonjs/core';
import Game from '../../Game';

class PlayerView {
    public _playerMesh: Mesh;

    constructor() {
        this._initializePlayerMesh();
    }

    private _initializePlayerMesh(): void {
        // Create a simple box to represent the player
        this._playerMesh = MeshBuilder.CreateBox('player', { size: 1 }, Game.instance.scene);
        this._playerMesh.parent = Game.instance.cameraManager.playerCamera;

        // Applying a basic color to the player mesh
        const material = new StandardMaterial('playerMaterial', Game.instance.scene);
        material.diffuseColor = new Color3(1, 0, 0); // Red color
        this._playerMesh.material = material;
    }

    public dispose(): void {
        this._playerMesh.dispose();
    }
}

export default PlayerView;
