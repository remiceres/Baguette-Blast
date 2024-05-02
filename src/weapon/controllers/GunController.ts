import { Vector3 } from '@babylonjs/core';
import ProjectileController from '../../projectile/controllers/ProjectileController';
import GunModel from '../models/GunModel';
import GunView from '../views/GunView';
import WeaponController from './WeaponController';

class GunController extends WeaponController {
    protected _model: GunModel;
    protected _view: GunView;

    constructor(model: GunModel, view: GunView) {
        super(model, view);
        this._model = model;
        this._view = view;
    }

    // TODO: Make it abstract in WeaponController
    protected _getInitialForce(): Vector3 {
        return this._model.parent.forward.normalize().scale(this._model.force);
    }

    public get projectile() {
        return this._model.projectile;
    }

    public set projectile(projectile: ProjectileController) {
        this._model.projectile = projectile;
    }
}
export default GunController;
