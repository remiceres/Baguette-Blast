import { Vector3 } from '@babylonjs/core';

class ProjectileModel {
    // Constants
    private readonly _maxSpeed: number = 60;
    private readonly _maxTimeOfLife: number = 10;

    private _speedVector: Vector3;
    private _position: Vector3;

    /////////////////
    // Constructor //
    /////////////////

    constructor(position: Vector3, speedVector: Vector3) {
        this._speedVector = speedVector;
        this._position = position;
    }

    //////////////
    // Accessor //
    //////////////

    public get speedVector(): Vector3 {
        return this._speedVector;
    }

    public set speedVector(speedVector: Vector3) {
        this._speedVector = speedVector;
    }

    public get position(): Vector3 {
        return this._position;
    }

    public set position(position: Vector3) {
        this._position = position;
    }

    public get maxSpeed(): number {
        return this._maxSpeed;
    }

    public get maxTimeOfLife(): number {
        return this._maxTimeOfLife;
    }
}
export default ProjectileModel;
