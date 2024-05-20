import { AbstractMesh } from '@babylonjs/core';
import Game from '../../game/Game';
import BalloonModel from '../models/BalloonModel';
import BalloonView from './BalloonView';

class CopperBalloonView extends BalloonView {
    private _model: BalloonModel;

    constructor(model: BalloonModel) {
        super();
        this._model = model;
    }

    protected _createMesh(): AbstractMesh {
        const mesh = Game.instance.assetManager.getBalloonBronzeInstance();
        mesh.setEnabled(true);
        // mesh.position = this._model.position;

        return mesh;
    }
}
export default CopperBalloonView;
