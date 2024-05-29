import { AbstractMesh } from '@babylonjs/core';
import BaseBonusController from '../../bonus/controllers/BaseBonusController';
import Game from '../../game/Game';
import EnemyController from './EnemyController';
import BalloonModel from '../models/BalloonModel';
import BalloonView from '../views/BalloonView';

class BalloonController extends EnemyController {
    protected _model: BalloonModel;
    protected _view: BalloonView;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(model: BalloonModel, view: BalloonView) {
        super(model, view);
    }

    public createHitbox(): AbstractMesh {
        return Game.instance.assetManager.createHitbox(this._view.mesh, 'Ballon', this._model.hitboxPadding);
    }

    ///////////
    // Bonus //
    ///////////

    public set bonus(bonusController: BaseBonusController) {

        if (this._model.bonusController) {
            this._model.bonusController.dispose();
        }

        this._model.bonusController = bonusController;
        bonusController.attachTo(this._view.mesh, this._model.bonusOffsetY);
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        super.update(deltaTime);

        // Clear bonus if it's already collected
        if (this._model.bonusController && this._model.bonusController.isActivate) {
            this._model.bonusController = null;
        }

        // Update bonus
        if (this._model.bonusController) {
            this._model.bonusController.update(deltaTime);
        }
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        super.dispose();
        if (this._model.bonusController) {
            this._model.bonusController.activate();
            this._model.bonusController.dispose();
        }
    }
}

export default BalloonController;
