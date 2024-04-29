import { AbstractMesh, Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import Game from '../Game';
import ProjectileInterface from './ProjectileInterface';
import BaseEnemyView from '../enemy/views/BaseEnemyView';

class BallProjectile implements ProjectileInterface, ICollider {
    public _mesh: Mesh;

    private _instanceCount = 0;

    constructor() {
        this._mesh = MeshBuilder.CreateSphere('ball_ref', { diameter: 0.25 }, Game.instance.scene);
        this._mesh.isVisible = false;
        this._mesh.isPickable = false;
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

    public fire(origin: Vector3, direction: Vector3, force: number): void {
        const instance = this._mesh.createInstance('ball ' + this._instanceCount);
        instance.position = origin.clone();

        // Save force in the instance
        instance.metadata = { force: force };

        // Orient the instance to face the direction of the projectile.
        instance.lookAt(origin.add(direction));
    }

    // getProjectiles return the mesh
    public getProjectiles(): AbstractMesh[] {
        return this._mesh.instances;
    }

    public update(deltaTime: number): void {
        for (const instance of this._mesh.instances) {
            // Move the instance forward.
            instance.position.addInPlace(instance.forward.scale(instance.metadata.force * deltaTime));
        }
        deltaTime;
    }

    public dispose(): void {
        this._mesh.dispose();
    }
}

export default BallProjectile;
