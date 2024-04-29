import BaseEnemyModel from '../models/BaseEnemyModel';
import IBehavior from './IBehavior';

class FloatingBehavior implements IBehavior {
    private _model: BaseEnemyModel;
    private _amplitude: number;
    private _speed: number;
    private _initialHeight: number;
    private _phase: number = 0;

    constructor(amplitude: number = 0.5, speed: number = 1) {
        this._amplitude = amplitude;
        this._speed = speed;
    }

    setModel(model: BaseEnemyModel): void {
        this._model = model;
        this._initialHeight = model.position.y;
    }

    update(deltaTime: number): void {
        this._phase += deltaTime * this._speed;
        const heightOffset = Math.sin(this._phase) * this._amplitude;
        this._model.position.y = this._initialHeight + heightOffset;
    }
}

export default FloatingBehavior;