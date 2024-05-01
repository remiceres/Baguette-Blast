import { AbstractMesh, Vector3 } from '@babylonjs/core';
import BaseEnemyView from '../../enemy/views/BaseEnemyView';
import BehaviorsInterface from '../../behaviors/BehaviorsInterface';
import ProjectileView from '../views/ProjectileView';

class ProjectileController implements ICollider {
    private _view: ProjectileView;

    private _behaviors: BehaviorsInterface[];

    /////////////////
    // Constructor //
    /////////////////

    public constructor(view: ProjectileView, Behaviors: BehaviorsInterface[]) {
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

    public createNewInstance(origin: Vector3, direction: Vector3, speed: number): void {
        // Create a new instance of the projectile and set its position and direction.
        const instance = this._view.mesh.createInstance('projectile_instance');
        instance.position = origin.clone();
        instance.lookAt(origin.add(direction));

        // Save the speed vector in the instance metadata
        instance.metadata = { speedVector: direction.scale(speed) };
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
            // Initialize an acceleration vector to zero
            let accelerationVector = Vector3.Zero();

            // Accumulate the acceleration vectors of all behaviors
            for (const behavior of this._behaviors) {
                accelerationVector = accelerationVector.add(behavior.updateAccelerationVector());
            }

            // Calculate the new speedVector and position of the instance
            const speedVector = instance.metadata.speedVector.add(accelerationVector.scale(deltaTime));
            
            // Calculate the position vector
            const positionVector = speedVector.scale(deltaTime);
            
            // Move the instance
            instance.position.addInPlace(positionVector);
            
            // Save the speedVector vector in the instance metadata
            instance.metadata.speedVector = speedVector;
        }
    }

    public dispose(): void {
        this._view.dispose();
    }
}
export default ProjectileController;
