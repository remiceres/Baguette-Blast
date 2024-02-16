import { AbstractMesh, Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';
import Game from '../../Game';

export class WeaponView {
    private _scene: Scene;
    private _discMesh: Mesh;

    constructor() {
        this._scene = Game.instance.scene;
        // Create a sphere
        this._discMesh = MeshBuilder.CreateSphere('disc', { diameter: 0.5 }, this._scene);
    }

    public updateParent(anchor: AbstractMesh): void {
        this._discMesh.parent = anchor;
    }

    public updateRotation(rotation: Vector3): void {
        this._discMesh.rotation = rotation;
    }

    public onFire(): void {
        // Visual changes when the weapon is fired
        if (this._discMesh.material) {
            (this._discMesh.material as StandardMaterial).diffuseColor = new Color3(1, 1, 0);
        }
    }

    public dispose(): void {
        this._discMesh.dispose();
    }    
}