import { AbstractMesh, Vector3 } from '@babylonjs/core';
import BaseEnemyView from '../../enemy/views/BaseEnemyView';
import ProjectileView from '../views/ProjectileView';

class ProjectileController implements ICollider {
    private _view: ProjectileView;

    constructor(view: ProjectileView) {
        this._view = view;
    }

    collidesWith(other: ICollider): boolean {
        return other instanceof BaseEnemyView;
    }

    onCollision(other: ICollider): void {
        if (other instanceof BaseEnemyView) {
            console.log('Projectile hit an enemy');
            this.dispose();
            other.dispose();
        }
    }

    public fired(origin: Vector3, direction: Vector3, force: number): void {
        const instance = this._view.mesh.createInstance('projectile_instance');
        instance.position = origin.clone();

        // Save force in the instance
        instance.metadata = { force: force };

        // Orient the instance to face the direction of the projectile.
        instance.lookAt(origin.add(direction));
    }

    // Return the projectiles
    public getProjectiles(): AbstractMesh[] {
        return this._view.mesh.instances;
    }

    public update(deltaTime: number): void {
        for (const instance of this._view.mesh.instances) {
            // Move the instance forward.
            instance.position.addInPlace(instance.forward.scale(instance.metadata.force * deltaTime));
        }
        deltaTime;
    }

    public dispose(): void {
        this._view.dispose();
    }
}
export default ProjectileController;