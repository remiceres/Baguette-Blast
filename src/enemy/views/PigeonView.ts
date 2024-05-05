import { Color3, MeshBuilder, StandardMaterial } from '@babylonjs/core';
import BalloonModel from '../models/BalloonModel';
import BalloonView from './BalloonView';

class PigeonView extends BalloonView {
    private _model: BalloonModel;
    
    constructor(model: BalloonModel) {
        super();
        this._model = model;
        this.createMesh();
    }

    createMesh(): void {
        this._mesh = MeshBuilder.CreateBox('enemyMesh', { size: 1 }, this._scene);
        const material = new StandardMaterial('enemyMaterial', this._scene);
        material.diffuseColor = new Color3(1, 0, 0); // Red color for the enemy
        this._mesh.material = material;

        this._mesh.metadata = {};
    }
}
export default PigeonView;