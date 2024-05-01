import { Vector3 } from '@babylonjs/core';
import WeaponController from '../controllers/WeaponController';
import HandModel from '../models/HandModel';
import HandView from '../views/HandView';

class HandController extends WeaponController {
    protected _model: HandModel;
    protected _view: HandView;
    
    constructor(model: HandModel, view: HandView) {
        super(model, view);
    }

    protected _calculateThrowParameters(): { direction: Vector3; force: number } {
        let direction = new Vector3(0, 0, 0);
        let force = 0;

        if (this._model.lastPosition && this._model.actualPosition) {
            direction = this._model.actualPosition.subtract(this._model.lastPosition).normalize();
            force =
                (this._model.actualPosition.subtract(this._model.lastPosition).length() * 1000) /
                (Date.now() - this._model.lastPositionTime);
        }

        return { direction, force };
    }

    public update(deltaTime: number): void {
        super.update(deltaTime);

        // Save position all 100ms
        if (this._model.timeSinceLastSave > 0.1) {
            this._savePosition(this._model.parent.getAbsolutePosition());
            this._model.timeSinceLastSave = 0;
        }
        this._model.timeSinceLastSave += deltaTime;
    }

    private _savePosition(position: Vector3): void {
        this._model.lastPosition = this._model.actualPosition;
        this._model.lastPositionTime = Date.now();
        this._model.actualPosition = position.clone();
    }

    public get projectile() {
        return this._model.projectile;
    }

    public set projectile(projectile) {
        this._model.projectile = projectile;
    }
}
export default HandController;