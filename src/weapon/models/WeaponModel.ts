import { AbstractMesh, Vector3 } from '@babylonjs/core';

export class WeaponModel {
    private _position: Vector3;
    private _rotation: Vector3;
    private _isThrown: boolean;
    private _velocity: Vector3;
    private _disposeTime: number;
    private _anchor: AbstractMesh;

    constructor(anchor: AbstractMesh) {
        this._anchor = anchor;
        this._rotation = new Vector3(0, 0, 0);
        this._isThrown = false;
    }

    public setPosition(position: Vector3): void {
        this._position = position;
    }

    public getPosition(): Vector3 {
        return this._position;
    }

    public setRotation(rotation: Vector3): void {
        this._rotation = rotation;
    }

    public getRotation(): Vector3 {
        return this._rotation;
    }

    public throw(): void {
        this._isThrown = true;
    }

    public isThrown(): boolean {
        return this._isThrown;
    }

    public setVelocity(velocity: Vector3): void {
        this._velocity = velocity;
    }

    public getVelocity(): Vector3 {
        return this._velocity;
    }

    public setDisposeTime(disposeTime: number): void {
        this._disposeTime = disposeTime;
    }

    public getDisposeTime(): number {
        return this._disposeTime;
    }

    public getAnchor(): AbstractMesh {
        return this._anchor;
    }

    public update(deltaTime: number): void {
        if (this._isThrown) {
            this._position.addInPlace(this._velocity.scale(deltaTime));
            this._disposeTime -= deltaTime;
        }
    }
    
    public shouldDispose(): boolean {
        return this._disposeTime <= 0;
    }
}