import { InstancedMesh } from '@babylonjs/core';

abstract class BaseBonusView {
    protected _mesh: InstancedMesh;

    constructor() {}

    createMesh(): void {}

    public dispose(): void {
        this._mesh.dispose();
    }

    public update(): void {}

    public get mesh(): InstancedMesh {
        return this._mesh;
    }
}

export default BaseBonusView;
