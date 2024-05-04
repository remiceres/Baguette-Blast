import { AbstractMesh, Vector3 } from '@babylonjs/core';
import IBehaviour from './IBehaviour';

class MoveAtoB implements IBehaviour {
    private _positionA: Vector3;
    private _positionB: Vector3;
    private _speed: number;
    private _distance: number;

    constructor(distance: number, positionA: Vector3, positionB: Vector3, speed: number) {
        this._positionA = positionA;
        this._positionB = positionB;
        this._speed = speed;
        this._distance = distance;
    }

    getForceVector(deltaTime: number, mesh: AbstractMesh, currentForce: Vector3): Vector3 {
        currentForce;
        // Go to A then to B then to A then to B
        // If the mesh has no target, set the target to A
        if (!mesh.metadata.target) {
            mesh.metadata.target = this._positionA;
        }

        // If the mesh is close to the target, change the target
        if (mesh.position.subtract(mesh.metadata.target).length() < this._distance) {
            if (mesh.metadata.target.equals(this._positionA)) {
                mesh.metadata.target = this._positionB;
            } else {
                mesh.metadata.target = this._positionA;
            }
        }

        // Calculate the direction to the target
        const direction = mesh.metadata.target.subtract(mesh.position);
        direction.normalize();

        // Calculate the force vector proportional to the distance to the target (close = slow, far = fast)
        const distance = mesh.position.subtract(mesh.metadata.target).length();
        const force = direction.scale(this._speed * (distance / 100));
        return force;
    }
}
export default MoveAtoB;
