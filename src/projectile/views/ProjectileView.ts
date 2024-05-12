import { InstancedMesh } from '@babylonjs/core';
import Game from '../../game/Game';

class ProjectileView {
    private _mesh: InstancedMesh;

    /////////////////
    // Constructor //
    /////////////////

    constructor() {
        this._mesh = Game.instance.assetManager.getBulletInstance();
    }

    //////////////
    // Accessor //
    //////////////

    public get mesh(): InstancedMesh {
        return this._mesh;
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        this._mesh.dispose();
    }
}
export default ProjectileView;
