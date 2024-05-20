import { AbstractMesh, Color3, MeshBuilder, Scene, StandardMaterial } from '@babylonjs/core';
import Game from '../../game/Game';
import BaseEnemyModel from '../models/BaseEnemyModel';
import BaseEnemyView from './BaseEnemyView';

class EnemyView extends BaseEnemyView {
    private _model: BaseEnemyModel;

    constructor(scene: Scene, model: BaseEnemyModel) {
        super();
        this._model = model;
    }

    onKill(): void {}

    protected _createMesh(): AbstractMesh {
        const mesh = MeshBuilder.CreateBox('enemyMesh', { size: 1 }, Game.instance.scene);
        const material = new StandardMaterial('enemyMaterial', Game.instance.scene);
        material.diffuseColor = new Color3(1, 0, 0); // Red color for the enemy
        mesh.material = material;

        return mesh;
    }

    public update(): void {
        // Update the mesh to reflect the model's current state
        if (this.mesh) {
            this.mesh.position = this._model.position;
        }
    }
}

export default EnemyView;
