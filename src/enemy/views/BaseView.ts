import { Mesh, Scene } from '@babylonjs/core';

abstract class BaseView {
    public _mesh: Mesh;
    protected _scene: Scene;

    constructor(scene: Scene) {
        this._scene = scene;
    }

    abstract createMesh(): void;

    public update(): void {
        // Provide a default update implementation or leave abstract to enforce subclass implementation
    }

    public dispose(): void {
        if (this._mesh) {
            this._mesh.dispose();
        }
    }
}

export { BaseView };