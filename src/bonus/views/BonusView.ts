import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';


class BonusView {
    private _mesh: Mesh;
    private _scene: Scene;

    constructor(scene: Scene) {
        this._scene = scene;
        this.createMesh();
    }

    createMesh(): void {
        this._mesh = MeshBuilder.CreateBox('bonusMesh', { size: 1 }, this._scene);
        this._mesh.position = Vector3.Zero();

        const material = new StandardMaterial('bonusMaterial', this._scene);
        material.diffuseColor = new Color3(0, 0, 1); // Blue
        this._mesh.material = material;
    }

    public dispose(): void {
        if (this._mesh) {
            this._mesh.dispose();
        }
    }

    public update(): void {
        // Provide a default update implementation or leave abstract to enforce subclass implementation
    }

    public get mesh(): Mesh {
        return this._mesh;
    }
}

export default BonusView;