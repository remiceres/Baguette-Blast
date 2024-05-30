import { AbstractMesh } from '@babylonjs/core';
import BaseBonusController from '../../bonus/controllers/BaseBonusController';
import { SoundPlayer } from '../../game/controllers/SoundPlayer';
import Game from '../../game/Game';
import BalloonModel from '../models/BalloonModel';
import BalloonView from '../views/BalloonView';
import EnemyController from './EnemyController';

class BalloonController extends EnemyController {
    protected _model: BalloonModel;
    protected _view: BalloonView;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(model: BalloonModel, view: BalloonView) {
        super(model, view);
        this._initAudio();
    }

    public createHitbox(): AbstractMesh {
        return Game.instance.assetManager.createHitbox(this._view.mesh, 'Ballon', this._model.hitboxPadding);
    }

    private _initAudio(): void {
        this._model.sound = new SoundPlayer('balloonPop', this._view.mesh, true);
    }

    //////////////
    // Collider //
    //////////////

    // @Override
    public onCollision(): void {
        if (this._model.bonusController) {
            this._model.bonusController.activate();
        }

        super.onCollision();
        this._model.sound.setAutoplay(true);
        this._model.sound.play();
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

    //////////////
    // Accessor //
    //////////////

    public get type(): string {
        return 'balloon';
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        super.dispose();
        if (this._model.bonusController) {
            this._model.bonusController.dispose();
        }
        this._model.sound.stopAndDispose();
    }
}

export default BalloonController;
