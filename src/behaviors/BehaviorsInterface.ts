import { AbstractMesh, Vector3 } from '@babylonjs/core';

interface BehaviorsInterface {
    getForceVector(deltaTime: number, mesh: AbstractMesh, currentForce: Vector3): Vector3;
}

export default BehaviorsInterface;
