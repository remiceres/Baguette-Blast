import { Vector3 } from '@babylonjs/core';
import ProjectileController from './ProjectileController';
import Game from '../../game/Game';
import BoomerangView from '../views/BoomerangView';
import BoomerangModel from '../models/BoomerangModel';

class BoomerangController extends ProjectileController {
    private _initialDirection: Vector3;
    private _returnTarget: Vector3;
    private _timeElapsed: number;
    private _maxFlightTime: number; // The time it takes to reach the furthest point before returning

    constructor(view: BoomerangView, model: BoomerangModel) {
        super(view, model);
        this._initialDirection = view.mesh.forward.clone().normalize().scaleInPlace(4);
        this._timeElapsed = 0;
        this._maxFlightTime = 2; // For example, 2 seconds to reach the furthest point
        this._returnTarget = Math.random() > 0.5 ? 
            Game.instance.player.positionHead.clone() : Game.instance.player.positionBody.clone();
    }

    public update(deltaTime: number): void {
        super.update(deltaTime);
        this._timeElapsed += deltaTime;
        
        if (this._timeElapsed <= this._maxFlightTime) {
            // Going straight
            // const progress = this._timeElapsed / this._maxFlightTime;
            this._view.mesh.position.addInPlace(this._initialDirection.scale(deltaTime));
        } else {
            // Returning with a bit of a curve
            const returnProgress = (this._timeElapsed - this._maxFlightTime) / this._maxFlightTime;
            const curveFactor = Math.sin(returnProgress * Math.PI); // Sinusoidal curve

            // Interpolate between the furthest point and the return target
            const furthestPoint = this._initialDirection.scale(this._maxFlightTime);
            const directionToTarget = this._returnTarget.subtract(furthestPoint).normalize();

            // Apply the curve
            const currentDirection = Vector3.Lerp(this._initialDirection, directionToTarget, curveFactor);
            this._view.mesh.position.addInPlace(currentDirection.scale(deltaTime));
        }
    }
}

export default BoomerangController;
