import Game from '../../game/Game';
import BalloonModel from '../models/BalloonModel';
import BalloonView from './BalloonView';

class SilverBalloonView extends BalloonView {
    private _model: BalloonModel;
    
    constructor(model: BalloonModel) {
        super();
        this._model = model;
        this.createMesh();
    }

    createMesh(): void {
        this._mesh = Game.instance.assetManager.getBallonSilverMesh();
        this._mesh.setEnabled(true);
        this._mesh.position = this._model.position;
        this._mesh.metadata = {};
    }
}
export default SilverBalloonView;