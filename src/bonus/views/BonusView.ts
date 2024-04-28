import { Mesh, Scene } from '@babylonjs/core';

abstract class BonusView {
    protected _mesh: Mesh;
    private _scene: Scene;

    constructor(scene: Scene) {
        this._scene = scene;
        this.createMesh();
    }

    createMesh(): void {}

    public dispose(): void {
        if (this._mesh) {
            this._mesh.dispose();
        }
    }

    public update(): void {}

    public get mesh(): Mesh {
        return this._mesh;
    }
}

export default BonusView;
