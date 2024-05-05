import { AbstractMesh, Scene } from '@babylonjs/core';
import BaseBonusView from '../../bonus/views/BaseBonusView';

abstract class BaseEnemyView {
    public _mesh: AbstractMesh;
    protected _scene: Scene;
    protected _bonusView: BaseBonusView;

    constructor(scene: Scene) {
        this._scene = scene;
    }

    abstract createMesh(): void;

    abstract onKill(): void;

    public update(): void {}

    public dispose(): void {
        if (this._mesh) {
            this._mesh.dispose();
        }
    }

    public set bonusView(bonusView: BaseBonusView) {
        this._bonusView = bonusView;
        // Add bonus mesh to the enemy mesh, on top of the enemy mesh
        this._bonusView.mesh.parent = this._mesh;
        this._bonusView.mesh.position.y = 1;
    }
}

export default BaseEnemyView;
