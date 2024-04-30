import { Mesh, MeshBuilder } from '@babylonjs/core';
import Game from '../../game/Game';

class ProjectileView {
    private _mesh: Mesh;

    constructor() {
        this._init();
    }

    private _init(): void {
        this._mesh = MeshBuilder.CreateSphere('ball_ref', { diameter: 0.25 }, Game.instance.scene);
        this._mesh.isVisible = false;
        this._mesh.isPickable = false;
    }

    public get mesh(): Mesh {
        return this._mesh;
    }

    public set mesh(mesh: Mesh) {
        this._mesh = mesh;
    }

    public dispose(): void {
        this._mesh.dispose();
    }
}
export default ProjectileView;