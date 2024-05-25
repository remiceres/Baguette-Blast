import { AbstractMesh } from '@babylonjs/core';
import Game from '../../game/Game';
import EnemyController from './EnemyController';

class PigeonController extends EnemyController {
    public createHitbox(): AbstractMesh {
        return Game.instance.assetManager.createHitbox(this._view.mesh, 'polySurface71', this._model.hitboxPadding);
    }
}

export default PigeonController;
