import { Vector3 } from '@babylonjs/core';

class ProjectileModel {
    private _speedVector: Vector3;
    private _position: Vector3;
    private _maxSpeed: number = 60;

    constructor(position: Vector3 = new Vector3(0, 0, 0), speedVector: Vector3 = new Vector3(0, 0, 0)) {
        this._speedVector = speedVector;
        this._position = position;
    }

    // Getters
    public get speedVector(): Vector3 {
        return this._speedVector;
    }

    public get position(): Vector3 {
        return this._position;
    }

    public get maxSpeed(): number {
        return this._maxSpeed;
    }

    // Setters
    public set speedVector(speedVector: Vector3) {
        this._speedVector = speedVector;
    }

    public set position(position: Vector3) {
        this._position = position;
    }

    public set maxSpeed(maxSpeed: number) {
        this._maxSpeed = maxSpeed;
    }
}
export default ProjectileModel;