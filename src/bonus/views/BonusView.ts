import { Color3, InstancedMesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';


class BonusView {
    protected _mesh: InstancedMesh;
    private _scene: Scene;

    constructor(scene: Scene) {
        this._scene = scene;
        this.createMesh();
    }

    createMesh(): void {
        this._mesh = MeshBuilder.CreateBox('bonusMesh', { size: 1 }, this._scene).createInstance('bonusMesh');
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

    public get mesh(): InstancedMesh {
        return this._mesh;
    }
}

export default BonusView;