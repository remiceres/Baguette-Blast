import { AbstractMesh, Vector3 } from '@babylonjs/core';

interface ProjectileInterface {
    fired(origin: Vector3, direction: Vector3, force: number): void;
    update(deltaTime: number): void;
    dispose(): void;
    getProjectiles(): AbstractMesh[];
}

export default ProjectileInterface;
