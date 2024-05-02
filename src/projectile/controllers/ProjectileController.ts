import { AbstractMesh, Vector3 } from '@babylonjs/core';
import IBehaviour from '../../behaviors/IBehaviour';
import BaseEnemyView from '../../enemy/views/BaseEnemyView';
import ProjectileView from '../views/ProjectileView';

class ProjectileController implements ICollider {
    private _view: ProjectileView;

    private _behaviors: IBehaviour[];

    private _maxSpeed: number = 60;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(view: ProjectileView, Behaviors: IBehaviour[]) {
        this._view = view;
        this._behaviors = [];
        this._behaviors = Behaviors;
    }

    //////////////
    // Collider //
    //////////////

    public collidesWith(other: ICollider): boolean {
        return other instanceof BaseEnemyView;
    }

    public onCollision(other: ICollider): void {
        if (other instanceof BaseEnemyView) {
            console.log('Projectile hit an enemy');
            this.dispose();
            other.dispose();
        }
    }

    /////////////
    // Methods //
    /////////////

    public createNewInstance(origin: Vector3, initialForce: Vector3): void {
        // Create a new instance of the projectile and set its position and direction.
        const instance = this._view.mesh.createInstance('projectile_instance');
        instance.position = origin.clone();

        // Save the speed vector in the instance metadata
        instance.metadata = { speedVector: initialForce };
    }

    /////////////////////
    // Getters/Setters //
    /////////////////////

    public getProjectiles(): AbstractMesh[] {
        return this._view.mesh.instances;
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        for (const instance of this._view.mesh.instances) {
            let speedVector = instance.metadata.speedVector.clone();

            // Accumulate the forces from all behaviors
            for (const behavior of this._behaviors) {
                speedVector = speedVector.add(behavior.getForceVector(deltaTime, instance, speedVector));
            }

            // Limit the speed vector to the maximum speed
            if (speedVector.length() > this._maxSpeed) {
                speedVector.normalize().scaleInPlace(this._maxSpeed);
            }

            // Update the metadata
            instance.metadata.speedVector = speedVector;

            // Update the position of the projectile
            instance.position.addInPlace(speedVector.scale(deltaTime));
        }
    }

    public dispose(): void {
        this._view.dispose();
    }
}
export default ProjectileController;
