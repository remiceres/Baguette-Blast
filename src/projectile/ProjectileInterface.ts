import { Vector3 } from '@babylonjs/core';

interface ProjectileInterface {
    fire(origin: Vector3, direction: Vector3, force: number): void;
    update(deltaTime: number): void;
    dispose(): void;
}

export default ProjectileInterface;
