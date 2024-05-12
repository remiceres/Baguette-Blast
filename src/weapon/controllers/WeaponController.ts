import { AbstractMesh, Vector3 } from '@babylonjs/core';
import ProjectileController from '../../projectile/controllers/ProjectileController';
import WeaponModel from '../models/WeaponModel';
import WeaponView from '../views/WeaponView';
import WeaponInterface from '../WeaponIInterface';
import ProjectileView from '../../projectile/views/ProjectileView';
import ProjectileModel from '../../projectile/models/ProjectileModel';
import IBehaviour from '../../behaviors/IBehaviour';
import Gravity from '../../behaviors/Gravity';
import Game from '../../game/Game';

abstract class WeaponController implements WeaponInterface {
    protected _model: WeaponModel;
    protected _view: WeaponView;
    private _behaviours: IBehaviour[] = [];
    private _projectiles: ProjectileController[] = [];

    constructor(model: WeaponModel, view: WeaponView) {
        this._model = model;
        this._view = view;
    }

    public set projectile(projectile: ProjectileController) {
        this._model.projectile = projectile;
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
        const position = this._model.parent.getAbsolutePosition().clone();

        // Eloigne du joueur
        const speedVector = this._getInitialForce();

        this._behaviours = [];
        this._behaviours.push(new Gravity(25));

        // Create a new projectile
        const projectileModel = new ProjectileModel(position, speedVector);
        const projectileView = new ProjectileView();
        const projectileController = new ProjectileController(projectileView, projectileModel, this._behaviours);
        
        // Add to projectile list
        this._projectiles.push(projectileController);

        // Add to collider
        Game.instance.collisionManager.addCollider(projectileController);
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

        // Clear disposed projectiles
        this._projectiles = this._projectiles.filter((projectile) => {
            return !projectile.isDisposed;
        });

        this._model.timeSinceLastShot += deltaTime;

        this._view.update(deltaTime);

        // Update projectile if grap
        if (this._model.isGrabed) {
            this._projectiles.forEach((projectile) => {
                projectile.update(deltaTime);
            });
        }
    }

    public dispose(): void {
        this._model.projectile.dispose();
        this._view.mesh.dispose();
    }
}
export default WeaponController;
