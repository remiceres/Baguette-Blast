import { AbstractMesh } from '@babylonjs/core';

interface WeaponInterface {
    getProjectiles(): AbstractMesh[];
    fire(): void;
    grap(hand: AbstractMesh): void;
    throw(): void;
    update(deltaTime: number): void;
    dispose(): void;
}

export default WeaponInterface;
