import { Vector3 } from '@babylonjs/core';
import { WeaponModel } from '../models/WeaponModel';
import { WeaponView } from '../views/WeaponView';

export class WeaponController {
    private _model: WeaponModel;
    private _view: WeaponView;

    constructor(model: WeaponModel, view: WeaponView) {
        this._model = model;
        this._view = view;
        this._view.updateParent(this._model.getAnchor());
    }

    public fire(direction: Vector3): void {
        direction;
        console.log('WeaponController.fire');
        // this._model.throw();
        // this._model.setVelocity(direction.scale(2)); // Set the speed of the disc
        // // After 5 seconds, the weapon will be disposed
        // this._model.setDisposeTime(5);
    
        // this._view.onFire();
    }
    

    public update(deltaTime: number): void {
        deltaTime;
        // this._model.update(deltaTime);

        // if (this._model.isThrown()) {
        //     this._view.updatePosition(this._model.getPosition());
        // }
    
        // if (this._model.shouldDispose()) {
        //     this._view.dispose();
        // }
    
        // // Sync the view with the model
        // this._view.updatePosition(this._model.getPosition());
        // this._view.updateRotation(this._model.getRotation());
        // this._model.update(deltaTime);
    }

    public dispose(): void {
        this._view.dispose();
    }
}
