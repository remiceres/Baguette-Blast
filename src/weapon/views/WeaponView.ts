import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';

export class WeaponView {
    private _scene: Scene;
    private _discMesh: Mesh;

    constructor(scene: Scene) {
        this._scene = scene;
        this._discMesh = this._createDiscMesh();
    }

    private _createDiscMesh(): Mesh {
        // Create vertical disc mesh
        const disc = MeshBuilder.CreateDisc('disc', { radius: 1, tessellation: 32 }, this._scene);

        return disc;
    }

    public updatePosition(position: Vector3): void {
        this._discMesh.position = position;
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