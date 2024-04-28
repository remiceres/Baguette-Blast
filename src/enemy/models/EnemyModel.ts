import { Vector3 } from '@babylonjs/core';

class EnemyModel {
    private _position: Vector3;
    private _health: number;

    constructor(position: Vector3 = new Vector3(0, 0, 0), health: number = 100) {
        this._position = position;
        //this.position._z = -this.position._z;
        this._health = health;
    }

    get position(): Vector3 {
        return this._position;
    }

    set position(value: Vector3) {
        this._position = value;
    }

    get health(): number {
        return this._health;
    }

    set health(value: number) {
        this._health = value;
    }

    update(deltaTime: number): void {
        deltaTime;
        // console.log(this.position);
        // Base update logic (if any)
    }

    // Additional enemy-specific methods can be added here
}

export default EnemyModel;