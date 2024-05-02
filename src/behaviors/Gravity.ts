import { Vector3 } from '@babylonjs/core';
import IBehaviour from './IBehaviour';

class Gravity implements IBehaviour {
    private _gravity: number;

    constructor(gravity: number) {
        this._gravity = gravity;
    }

    public getForceVector(deltaTime: number): Vector3 {
        return new Vector3(0, -this._gravity * deltaTime, 0);
    }
}

export default Gravity;
