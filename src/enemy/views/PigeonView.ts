import { AbstractMesh, Color3, MeshBuilder, StandardMaterial } from '@babylonjs/core';
import Game from '../../game/Game';
import BalloonModel from '../models/BalloonModel';
import BalloonView from './BalloonView';

class PigeonView extends BalloonView {
    private _model: BalloonModel;
    
    constructor(model: BalloonModel) {
        super();
        this._model = model;
    }

    protected _createMesh(): AbstractMesh {
        const mesh = MeshBuilder.CreateBox('enemyMesh', { size: 1 }, Game.instance.scene);
        const material = new StandardMaterial('enemyMaterial', Game.instance.scene);
        material.diffuseColor = new Color3(1, 0, 0); 
        mesh.material = material;
        // mesh.position = this._model.position;

        return mesh;

    }
}
export default PigeonView;