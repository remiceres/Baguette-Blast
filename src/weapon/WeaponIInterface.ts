import { AbstractMesh } from '@babylonjs/core';

interface WeaponInterface {
    fire(): void;
    grab(hand: AbstractMesh): void;
    throw(): void;
    update(deltaTime: number): void;
    dispose(): void;
}

export default WeaponInterface;
