import { Vector3 } from '@babylonjs/core';
import GunModel from '../models/GunModel';
import GunView from '../views/LaserGunView';
import WeaponController from './WeaponController';

class GunController extends WeaponController {
    /////////////////
    // Constructor //
    /////////////////

    constructor(view: GunView, model: GunModel) {
        super(view, model);
    }

    //////////
    // Fire //
    //////////

    protected _getInitialForce(): Vector3 {
        return this._model.parent.forward.clone().normalize().scaleInPlace(this._model.force);
    }
}
export default GunController;
