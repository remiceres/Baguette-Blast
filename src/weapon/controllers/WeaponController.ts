import { AbstractMesh, Vector3 } from '@babylonjs/core';
import { WeaponModel } from '../models/WeaponModel';
import { WeaponView } from '../views/WeaponView';

export class WeaponController {
    private _model: WeaponModel;
    private _view: WeaponView;

    constructor(model: WeaponModel, view: WeaponView) {
        this._model = model;
        this._view = view;
    }

    public fire(): void {

    }

    public update(deltaTime: number): void {
        deltaTime;
        this._view.updatePosition(this._model.getPosition());
    }

    public dispose(): void {
        this._view.dispose();
    }

    public grab(anchor: AbstractMesh): void {
        this._view.setParent(anchor);
        this._model.setPosition(Vector3.Zero());
        this._model.grab();

    }
}
