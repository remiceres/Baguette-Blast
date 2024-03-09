import { Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import Game from '../Game';
import ProjectileInterface from './ProjectileInterface';

class BallProjectile implements ProjectileInterface {
    private _mesh: Mesh;

    private _instanceCount = 0;

    constructor() {
        this._mesh = MeshBuilder.CreateSphere('ball_ref', { diameter: 0.25 }, Game.instance.scene);
        this._mesh.isVisible = false;
        this._mesh.isPickable = false;
    }

    public fire(origin: Vector3, direction: Vector3): void {
        const instance = this._mesh.createInstance('ball ' + this._instanceCount);
        instance.position = origin.clone();

        // Orient the instance to face the direction of the projectile.
        instance.lookAt(origin.add(direction));
    }

    public update(deltaTime: number): void {
        for (const instance of this._mesh.instances) {
            // Move the instance forward.
            instance.position.addInPlace(instance.forward.scale(0.1));
        }
        deltaTime;
    }

    public dispose(): void {
        this._mesh.dispose();
    }
}

export default BallProjectile;
