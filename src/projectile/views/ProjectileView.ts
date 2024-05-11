import { InstancedMesh } from '@babylonjs/core';
import Game from '../../game/Game';

class ProjectileView {
    private _mesh: InstancedMesh;

    constructor() {
        this._init();
        this._mesh = Game.instance.assetManager.getBulletInstance();
    }

    private _init(): void {
    }

    public get mesh(): InstancedMesh {
        return this._mesh;
    }

    public set mesh(mesh: InstancedMesh) {
        this._mesh = mesh;
    }

    public dispose(): void {
        this._mesh.dispose();
    }

    public update(): void {
    }
}
export default ProjectileView;