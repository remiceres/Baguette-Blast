import { AbstractMesh } from '@babylonjs/core';
import Game from '../../game/Game';
import BalloonView from './BalloonView';

class SilverBalloonView extends BalloonView {
    constructor() {
        super();
    }

    protected _createMesh(): AbstractMesh {
        return Game.instance.assetManager.getBalloonSilverInstance();
    }
}
export default SilverBalloonView;
