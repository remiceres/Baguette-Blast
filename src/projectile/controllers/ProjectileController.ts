import IBehaviour from '../../behaviors/IBehaviour';
import EnemyController from '../../enemy/controllers/EnemyController';
import PlayerController from '../../player/controllers/PlayerController';
import WallController from '../../wall/controllers/WallController';
import ProjectileModel from '../models/ProjectileModel';
import ProjectileView from '../views/ProjectileView';

class ProjectileController implements ICollider {
    // MVC
    private _view: ProjectileView;
    private _model: ProjectileModel;

    // Behaviors
    private _behaviors: IBehaviour[];

    // Time of life
    private _timeOfLife: number;

    private _isDisposed: boolean = false;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(view: ProjectileView, model: ProjectileModel, Behaviors: IBehaviour[]) {
        // MVC
        this._view = view;
        this._model = model;

        // Behaviors
        this._behaviors = Behaviors;

        // Time of life
        this._timeOfLife = 0;
    }

    //////////////
    // Collider //
    //////////////

    public collidesWith(other: ICollider): boolean {
        // Check if the projectile collides with an enemy
        if (other instanceof EnemyController) {
            if (other.view._mesh.intersectsMesh(this._view.mesh)) {
                return true;
            }
        }

        // Check if the projectile collides with the player
        else if (other instanceof PlayerController) {
            if (other.headHitbox.intersectsMesh(this._view.mesh)) {
                return true;
            } else if (other.bodyHitbox.intersectsMesh(this._view.mesh)) {
                return true;
            }
        }

        // Check if the projectile collides colliders
        else if (other instanceof WallController) {
            if (other.hitbox.intersectsMesh(this._view.mesh)) {
                return true;
            }
        }

        // Otherwise, return false
        return false;
    }

    public onCollision(): void {
        this.dispose();
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        // Increment the time of life
        this._timeOfLife += deltaTime;

        // Update the position of the projectile
        this._updatePosition(deltaTime);

        // Check disposal conditions
        this._checkDisposalConditions();
    }

    private _checkDisposalConditions(): void {
        // if the projectile is under the ground, dispose
        if (this._model.position.y < -1) {
            this.dispose();
        }

        // if time of life is over, dispose
        else if (this._timeOfLife > this._model.maxTimeOfLife) {
            this.dispose();
        }
    }

    private _updatePosition(deltaTime: number): void {
        const dampingFactor = 0.99;
        this._model.speedVector.scaleInPlace(dampingFactor);

        // Accumulate the forces from all behaviors
        for (const behavior of this._behaviors) {
            const force = behavior.getForceVector(deltaTime, this._view.mesh, this._model.speedVector);
            this._model.speedVector.addInPlace(force);
        }

        // Limit the speed vector to the maximum speed
        if (this._model.speedVector.length() > this._model.maxSpeed) {
            this._model.speedVector.normalize().scaleInPlace(this._model.maxSpeed);
        }

        // Update the position of the mesh
        this._model.position.addInPlace(this._model.speedVector.scale(deltaTime));
        this._view.mesh.position = this._model.position;
    }

    //////////////
    // Accessor //
    //////////////

    public get isDisposed(): boolean {
        return this._isDisposed;
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        this._isDisposed = true;
        this._view.dispose();
    }
}
export default ProjectileController;
