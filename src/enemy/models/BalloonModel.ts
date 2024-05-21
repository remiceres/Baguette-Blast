import Floating from '../../behaviors/Floating';
import IBehaviour from '../../behaviors/IBehaviour';
import BaseEnemyModel from './BaseEnemyModel';

class BalloonModel extends BaseEnemyModel {
    // Default behavior
    private _defaultBehavior: IBehaviour = new Floating();

    /////////////////
    // Constructor //
    /////////////////

    public constructor(
        position,
        health,
        score,
        behavior: IBehaviour[],
        maxSpeed = 20,
        dampingFactor = 0.98,
        hitboxPadding = 0.1
    ) {
        super(position, health, score, behavior, maxSpeed, dampingFactor, hitboxPadding);
        this.addBehavior(this._defaultBehavior);
    }
}

export default BalloonModel;
