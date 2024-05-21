import { Vector3 } from '@babylonjs/core';
import IBehaviour from './IBehaviour';

class Floating implements IBehaviour {
    private _force: number;
    private _oscillationTime: number;
    private _phaseOffset: number;

    public constructor(force: number = 0.08, oscillationFreq: number = 400) {
        this._force = force;
        this._oscillationTime = oscillationFreq;
        // Random phase offset between 0 and 2π to avoid all enemies oscillating in sync
        this._phaseOffset = Math.random() * 2 * Math.PI;
    }

    public getForceVector(): Vector3 {
        const currentTime = Date.now();
        const oscillation = Math.sin(currentTime / this._oscillationTime + this._phaseOffset) * this._force;
        return new Vector3(0, oscillation, 0);
    }
}

export default Floating;
