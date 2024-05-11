import IBehaviour from '../../behaviors/IBehaviour';
import EnemyController from '../../enemy/controllers/EnemyController';
import PlayerController from '../../player/controllers/PlayerController';
import ProjectileModel from '../models/ProjectileModel';
import ProjectileView from '../views/ProjectileView';

class ProjectileController implements ICollider {

    // MVC
    private _view: ProjectileView;
    private _model: ProjectileModel;

    // Behaviors
    private _behaviors: IBehaviour[];

    /////////////////
    // Constructor //
    /////////////////

    public constructor(view: ProjectileView, model: ProjectileModel, Behaviors: IBehaviour[]) {
        // MVC
        this._view = view;
        this._model = model;

        // Behaviors
        this._behaviors = Behaviors;
    }

    //////////////
    // Collider //
    //////////////

    public collidesWith(other: ICollider): boolean {

        // Check if the projectile collides with an enemy
        if (other instanceof EnemyController) {
            if (other.view._mesh.intersectsMesh(this.view.mesh)) {
                return true;
            }
        }

        // Check if the projectile collides with the player
        else if (other instanceof PlayerController) {
            if (other.headHitbox.intersectsMesh(this.view.mesh)) {
                return true;
            }
            else if (other.bodyHitbox.intersectsMesh(this.view.mesh)) {
                return true;
            }
        }
            

        // Otherwise, return false
        return false;
    }

    public onCollision(other: ICollider): void {
        // Dispose of the projectile and the enemy
        if (other instanceof EnemyController) {
            other.dispose();
            // this.dispose();
        }
    }

    /////////////
    // Methods //
    /////////////


    /////////////////////
    // Getters/Setters //
    /////////////////////

    public get view(): ProjectileView {
        return this._view;
    }

    public set view(view: ProjectileView) {
        this._view = view;
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        const dampingFactor = 1;
        // instance.metadata.speedVector.scaleInPlace(dampingFactor);
        this._model.speedVector.scaleInPlace(dampingFactor);

        // Accumuler les forces de tous les comportements
        for (const behavior of this._behaviors) {
            const force = behavior.getForceVector(deltaTime, this.view.mesh, this._model.speedVector);
            this._model.speedVector.addInPlace(force);
        }

        // Limiter le vecteur de vitesse à la vitesse maximale
        if (this._model.speedVector.length() > this._model.maxSpeed) {
            this._model.speedVector.normalize().scaleInPlace(this._model.maxSpeed);
        }

        // Mettre à jour la position du maillage
        this._model.position.addInPlace(this._model.speedVector.scale(deltaTime));
        this._view.mesh.position = this._model.position;
    }

    public dispose(): void {
        this._view.dispose();
    }
}
export default ProjectileController;
