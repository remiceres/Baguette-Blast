import { Mesh, Vector3 } from '@babylonjs/core';
import IBehaviour from '../../behaviors/IBehaviour';

class BaseEnemyModel {
    private _position: Vector3;
    private _health: number;
    private _score: number;
    private _movementVector: Vector3 = new Vector3(0, 0, 0);
    private _maxSpeed: number = 20;
    private _hitbox: Mesh;
    protected _behaviours: IBehaviour[] = [];

    constructor(
        position: Vector3 = new Vector3(0, 0, 0),
        health: number = 100,
        score: number = 1,
    ) {
        this._position = position;
        this._health = health;
        this._score = score;
    }

    // Getters
    get position(): Vector3 {
        return this._position;
    }

    get health(): number {
        return this._health;
    }

    get score(): number {
        return this._score;
    }

    get movementVector(): Vector3 {
        return this._movementVector;
    }

    get maxSpeed(): number {
        return this._maxSpeed;
    }

    get hitbox(): Mesh {
        return this._hitbox;
    }

    get behaviours(): IBehaviour[] {
        return this._behaviours;
    }

    // Setters
    set position(value: Vector3) {
        this._position = value;
    }

    set health(value: number) {
        this._health = value;
    }

    set score(value: number) {
        this._score = value;
    }

    set movementVector(value: Vector3) {
        this._movementVector = value;
    }

    set maxSpeed(value: number) {
        this._maxSpeed = value;
    }

    set hitbox(hitbox: Mesh) {
        this._hitbox = hitbox;
    }

    update(deltaTime: number): void {
        deltaTime;
        // console.log(this.position);
        // Base update logic (if any)
    }

    dispose(): void {
        // if behaviours have a dispose method, call it
        this._behaviours = [];
    }
}

export default BaseEnemyModel;
