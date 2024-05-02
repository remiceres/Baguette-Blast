import { AbstractMesh, Vector3 } from '@babylonjs/core';
import ProjectileController from '../../projectile/controllers/ProjectileController';
import WeaponModel from '../models/WeaponModel';
import WeaponView from '../views/WeaponView';
import WeaponInterface from '../WeaponIInterface';

abstract class WeaponController implements WeaponInterface {
    protected _model: WeaponModel;
    protected _view: WeaponView;

    constructor(model: WeaponModel, view: WeaponView) {
        this._model = model;
        this._view = view;
    }

    public set projectile(projectile: ProjectileController) {
        this._model.projectile = projectile;
    }

    public getProjectiles(): AbstractMesh[] {
        return this._model.projectile.getProjectiles();
    }

    public fire(): void {
        if (!this._model.isGrabed) {
            return;
        }

        // Check cooldown
        if (this._model.timeSinceLastShot < this._model.cooldownSecond) {
            return;
        }

        // Check durability
        if (this._model.durability == 0) {
            return;
        }

        // Fire
        this._model.timeSinceLastShot = 0;
        this._model.durability--;
        const position = this._model.parent.getAbsolutePosition();

        // Eloigne du joueur
        const initialForceVector = this._getInitialForce();
        this._model.projectile.createNewInstance(position, initialForceVector);
    }

    protected abstract _getInitialForce(): Vector3;

    public grab(hand: AbstractMesh): void {
        this._model.isGrabed = true;
        this._model.parent = hand;
        this._view.mesh.parent = hand;
    }

    public throw(): void {
        this._model.isGrabed = false;
        this._view.mesh.parent = null;
    }

    public update(deltaTime: number): void {
        this._model.timeSinceLastShot += deltaTime;

        this._view.update(deltaTime);

        // Update projectile if grap
        if (this._model.isGrabed) {
            // TODO: To move out of the condition to avoid freeze
            this._model.projectile.update(deltaTime);
        }
    }

    public dispose(): void {
        this._model.projectile.dispose();
        this._view.mesh.dispose();
    }
}
export default WeaponController;