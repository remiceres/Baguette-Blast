import { AbstractMesh, Vector3 } from '@babylonjs/core';

export class WeaponModel {

    private _position: Vector3;
    private _rotation: Vector3;

    private _isThrown: boolean;
    private _isGrabbed: boolean;

    private _parent: AbstractMesh;

    constructor() {
        this._isThrown = false;
    }

    public set parent(parent: AbstractMesh) {
        this._parent = parent;
    }

    public get parent(): AbstractMesh {
        return this._parent;
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
        this._isGrabbed = false;
    }

    public isThrown(): boolean {
        return this._isThrown;
    }

    public grab(): void {
        this._isThrown = false;
        this._isGrabbed = true;
    }

    public isGrabbed(): boolean {
        return this._isGrabbed;
    }

    public update(deltaTime: number): void {
        deltaTime;
    }

}
