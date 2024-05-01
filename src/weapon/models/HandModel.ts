import { Vector3 } from '@babylonjs/core';
import WeaponModel from './WeaponModel';

class HandModel extends WeaponModel {
    private _force: number;

    private _lastPosition: Vector3;
    private _lastPositionTime: number;
    private _actualPosition: Vector3;
    private _timeSinceLastSave = 0;

    constructor(force: number) {
        super();
        this._force = force;
    }

    // Getters
    public get force() {
        return this._force;
    }

    public get lastPosition() {
        return this._lastPosition;
    }

    public get lastPositionTime() {
        return this._lastPositionTime;
    }

    public get actualPosition() {
        return this._actualPosition;
    }

    public get timeSinceLastSave() {
        return this._timeSinceLastSave;
    }
    
    // Setters
    public set force(value: number) {
        this._force = value;
    }

    public set lastPosition(value: Vector3) {
        this._lastPosition = value;
    }

    public set lastPositionTime(value: number) {
        this._lastPositionTime = value;
    }

    public set actualPosition(value: Vector3) {
        this._actualPosition = value;
    }

    public set timeSinceLastSave(value: number) {
        this._timeSinceLastSave = value;
    }
}
export default HandModel;