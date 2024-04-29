import { MeshBuilder, StandardMaterial, Color3, Scene } from '@babylonjs/core';
import BaseEnemyView  from './BaseEnemyView';
import BaseEnemyModel from '../models/BaseEnemyModel';

class EnemyView extends BaseEnemyView {
    private _model: BaseEnemyModel;

    constructor(scene: Scene, model: BaseEnemyModel) {
        super(scene);
        this._model = model;
        this.createMesh();
    }

    createMesh(): void {
        this._mesh = MeshBuilder.CreateBox('enemyMesh', { size: 1 }, this._scene);
        const material = new StandardMaterial('enemyMaterial', this._scene);
        material.diffuseColor = new Color3(1, 0, 0); // Red color for the enemy
        this._mesh.material = material;
    }

    public update(): void {
        // Update the mesh to reflect the model's current state
        if (this._mesh) {
            this._mesh.position = this._model.position; // Update position
            // Additional updates, such as changing colors or animations, can go here
        }
    }
}

export default EnemyView;