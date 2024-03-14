import { Vector3 } from '@babylonjs/core';
import ProjectileInterface from '../projectile/ProjectileInterface';
import BallProjector from './BallProjector';

class HandBall extends BallProjector {
    private _lastPosition: Vector3;
    private _actualPosition: Vector3;

    constructor(projectile: ProjectileInterface) {
        super(projectile);
    }

    protected _calculateThrowParameters(): { direction: Vector3; force: number } {
        let direction = new Vector3(0, 0, 0);
        let force = 0;

        if (this._lastPosition && this._actualPosition) {
            direction = this._actualPosition.subtract(this._lastPosition).normalize();
            force = this._actualPosition.subtract(this._lastPosition).length() * 10;
        }

        return { direction, force };
    }

    private _timeSinceLastSave = 0;

    public update(deltaTime: number): void {
        super.update(deltaTime);

        // save position all 100ms
        if (this._timeSinceLastSave > 0.1) {
            this._savePosition(this._prarent.getAbsolutePosition());
            this._timeSinceLastSave = 0;
        }
        this._timeSinceLastSave += deltaTime;
    }

    private _savePosition(position: Vector3): void {
        this._lastPosition = this._actualPosition;
        this._actualPosition = position.clone();
    }
}

export default HandBall;
