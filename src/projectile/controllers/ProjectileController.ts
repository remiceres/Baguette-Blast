import IBehaviour from '../../behaviors/IBehaviour';
import EnemyController from '../../enemy/controllers/EnemyController';
import ProjectileModel from '../models/ProjectileModel';
import ProjectileView from '../views/ProjectileView';

class ProjectileController implements ICollider {
    private _view: ProjectileView;
    private _model: ProjectileModel;
    private _behaviors: IBehaviour[];

    /////////////////
    // Constructor //
    /////////////////

    public constructor(view: ProjectileView, model: ProjectileModel, Behaviors: IBehaviour[]) {
        this._view = view;
        this._model = model;
        this.view.mesh.position = this._model.position;
        this._behaviors = [];
        this._behaviors = Behaviors;
    }

    //////////////
    // Collider //
    //////////////

    public collidesWith(other: ICollider): boolean {
        // console.log('Projectile collides with', other, this);
        if (other instanceof EnemyController) {
            // console.log('Other', other);
            // Check if the projectile is colliding with an enemy
            if (other.view._mesh.intersectsMesh(this.view.mesh)) {
                return true;
            }
        }
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
