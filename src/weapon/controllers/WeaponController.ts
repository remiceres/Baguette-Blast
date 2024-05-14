import { AbstractMesh, Vector3 } from '@babylonjs/core';
import IBehaviour from '../../behaviors/IBehaviour';
import BallController from '../../projectile/controllers/BallController';
import ProjectileController from '../../projectile/controllers/ProjectileController';
import BallModel from '../../projectile/models/BallModels';
import BallView from '../../projectile/views/BallView';
import WeaponModel from '../models/WeaponModel';
import WeaponView from '../views/WeaponView';
import WeaponInterface from '../WeaponIInterface';

abstract class WeaponController implements WeaponInterface {
    // MVC
    protected _model: WeaponModel;
    protected _view: WeaponView;

    // Projectile behaviours
    private _behaviours: IBehaviour[];
    private _projectiles: ProjectileController[];

    /////////////////
    // Constructor //
    /////////////////

    public constructor(model: WeaponModel, view: WeaponView) {
        // MVC
        this._model = model;
        this._view = view;

        // Projectile list
        this._projectiles = [];

        // Behaviors list
        this._behaviours = [];
    }

    //////////
    // Fire //
    //////////

    public fire(): void {
        // Check if the weapon can fire
        if (!this._canFire()) {
            return;
        }

        // Reset the time since last shot and decrease durability
        this._model.timeSinceLastShot = 0;
        this._model.durability--;

        // Get the position and speed vector
        const position = this._model.parent.getAbsolutePosition().clone();
        const speedVector = this._getInitialForce();
        const orientation = this._getInitialForce().normalize();

        // Create a new projectile
        const projectile = new BallController(new BallView(), new BallModel(position, orientation, speedVector));

        // Add to projectile list
        this._projectiles.push(projectile);
        console.log(this._projectiles.length);
    }

    private _canFire(): boolean {

        return (
            this._model.isGrabed &&
            this._model.timeSinceLastShot > this._model.cooldownSecond &&
            this._model.durability > 0
        );
    }

    /**
     * Get the initial force of the projectile
     *
     * @returns The initial force of the projectile
     */
    protected abstract _getInitialForce(): Vector3;

    /**
     * Build a new projectile
     *
     * @param position initial position of the projectile
     * @param speedVector initial speed vector of the projectile
     */
    // protected abstract _buildProjectile(position: Vector3, speedVector: Vector3): ProjectileController;

    ////////////////////
    // Grab and throw //
    ////////////////////

    public grab(hand: AbstractMesh): void {
        this._model.isGrabed = true;
        this._model.parent = hand;
        this._view.mesh.parent = hand;
    }

    public throw(): void {
        this._model.isGrabed = false;
        this._view.mesh.parent = null;
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        // Update time since last shot
        this._model.timeSinceLastShot += deltaTime;

        // Clear disposed projectiles
        this._projectiles = this._projectiles.filter((projectile) => {
            return !projectile.isDisposed;
        });

        // Update projectiles
        this._projectiles.forEach((projectile) => {
            projectile.update(deltaTime);
        });

        // Update the weapon view
        this._view.update(deltaTime);
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        this._view.mesh.dispose();
    }
}
export default WeaponController;
