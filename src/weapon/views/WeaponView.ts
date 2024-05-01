import { AbstractMesh, MeshBuilder, Vector3 } from '@babylonjs/core';

abstract class WeaponView {
    private _mesh: AbstractMesh;

    constructor() {
        this._mesh = this._loadMesh();
    }

    protected _loadMesh() {
        const mesh = MeshBuilder.CreateBox('weapon', { size: 0.5 });
        mesh.scaling = new Vector3(0.1, 0.1, 0.5);
        return mesh;
    }

    public get mesh() {
        return this._mesh;
    }

    public set mesh(mesh: AbstractMesh) {
        this._mesh = mesh;
    }

    public update(deltaTime) {
        deltaTime;
    }

    public dispose() {
        this._mesh.dispose();
    }
}
export default WeaponView;