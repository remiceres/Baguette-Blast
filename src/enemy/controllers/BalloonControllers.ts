import { AbstractMesh } from '@babylonjs/core';
import Game from '../../game/Game';
import EnemyController from './EnemyController';

class BalloonController extends EnemyController {
    public createHitbox(): AbstractMesh {
        return Game.instance.assetManager.createHitbox(this._view.mesh, 'BallonSilver_0', this._model.hitboxPadding);
    }
}

export default BalloonController;
