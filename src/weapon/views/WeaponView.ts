import { AbstractMesh, Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import Game from '../../Game';

/**
 * Represents a view for a weapon in the game.
 */
export class WeaponView {
    private _discMesh: Mesh;

    constructor() {
        this._discMesh = MeshBuilder.CreateSphere('disc', { diameter: 0.25 }, Game.instance.scene);
    }

    /**
     * Updates the position of the weapon view.
     * @param position - The new position of the weapon.
     */
    public updatePosition(position: Vector3): void {
        this._discMesh.position = position;
    }

    /**
     * Updates the rotation of the weapon view.
     * @param rotation - The new rotation of the weapon.
     */
    public updateRotation(rotation: Vector3): void {
        this._discMesh.rotation = rotation;
    }

    /**
     * Disposes the weapon view and releases any associated resources.
     */
    public dispose(): void {
        this._discMesh.dispose();
    }

    public setParent(parent: AbstractMesh): void {
        this._discMesh.setParent(parent);
    }
}
