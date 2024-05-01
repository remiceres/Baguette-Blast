import { Vector3 } from '@babylonjs/core';
import BehaviorsInterface from './BehaviorsInterface';

class GravityBehaviors implements BehaviorsInterface {
    private _gravity: number;

    constructor(gravity: number) {
        this._gravity = gravity;
    }

    public updateAccelerationVector(): Vector3 {
        return new Vector3(0, -this._gravity, 0);
    }
}

export default GravityBehaviors;
