import { Vector3 } from '@babylonjs/core';
import ProjectileController from './ProjectileController';
import DiscView from '../views/DiscView';
import DiscModel from '../models/DiscModel';

class DiscController extends ProjectileController {
    private _timeElapsed: number;
    private _lateralTimeElapsed: number;
    private _direction: Vector3;
    private _lateralDirection: number;

    constructor(view: DiscView, model: DiscModel) {
        super(view, model);
        this._timeElapsed = 0;
        this._lateralTimeElapsed = 0;
        this._direction = new Vector3(0, 0, 1); // Assuming forward direction is along the Z axis
        this._lateralDirection = 1; // Start by moving right
    }

    public update(deltaTime: number): void {
        super.update(deltaTime);
        this._timeElapsed += deltaTime;
        this._lateralTimeElapsed += deltaTime;

        // Move forward
        const forwardMovement = this._direction.scale(deltaTime);
        this._view.mesh.position.addInPlace(forwardMovement);

        // Shift left or right every 2 seconds
        const lateralShiftInterval = 2000; // Change direction every 2 seconds
        if (this._lateralTimeElapsed >= lateralShiftInterval) {
            this._lateralTimeElapsed = 0;
            this._lateralDirection *= -1; // Toggle direction
        }
        const lateralMovement = new Vector3(this._lateralDirection * 0.5 * deltaTime, 0, 0); 
        this._view.mesh.position.addInPlace(lateralMovement);
    }
}

export default DiscController;
