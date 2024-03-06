import { AbstractMesh, Vector3 } from '@babylonjs/core';
import { WeaponModel } from '../models/WeaponModel';
import { WeaponView } from '../views/WeaponView';

export class WeaponController {
    private _model: WeaponModel;
    private _view: WeaponView;

    private _positions: Vector3[] = [];
    private _rotations: Vector3[] = [];
    private _speeds: Vector3[] = [];
    private _maxHistory: number = 10;

    constructor(model: WeaponModel, view: WeaponView) {
        this._model = model;
        this._view = view;
    }

    public fire(): void {
        this._model.throw();
    }

    public update(deltaTime: number): void {
        deltaTime;

        if (this._model.isGrabbed()) {
            this._view.updatePosition(this._model.getPosition());
            this._updateHistory();
        } else if (this._model.isThrown()) {
            this._model.setPosition(this._model.getPosition().add(this._calculateSpeed()));
            this._view.updatePosition(this._model.getPosition());
        }

        console.log(this._calculateSpeed());
    }

    private _updateHistory(): void {
        this._positions.push(this._model.parent.getAbsolutePosition());
        this._rotations.push(this._model.parent.rotation.clone());
        this._speeds.push(this._calculateSpeed());

        if (this._positions.length > this._maxHistory) {
            this._positions.shift();
            this._rotations.shift();
            this._speeds.shift();
        }
    }

    private _calculateSpeed(): Vector3 {
        const speed = Vector3.Zero();
        if (this._positions.length > 1) {
            const actualPosition = this._model.getPosition();
            const lastPosition = this._positions[this._positions.length - 1];
            speed.copyFrom(actualPosition).subtractInPlace(lastPosition);
        }
        return speed;
    }

    public dispose(): void {
        this._view.dispose();
    }

    public grab(anchor: AbstractMesh): void {
        this._model.parent = anchor;
        this._view.setParent(this._model.parent);

        this._model.setPosition(Vector3.Zero());
        this._model.grab();
    }
}
