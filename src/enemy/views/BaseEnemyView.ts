import { Mesh, Scene, Vector3 } from '@babylonjs/core';
import BaseBonusView from '../../bonus/views/BaseBonusView';

abstract class BaseEnemyView {
    public _mesh: Mesh;
    protected _scene: Scene;
    protected _bonusView: BaseBonusView;

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

    public set bonusView(bonusView: BaseBonusView) {
        this._bonusView = bonusView;
        // Add bonus mesh to the enemy mesh, on top of the enemy mesh
        this._bonusView.mesh.parent = this._mesh;
        this._bonusView.mesh.position.y = 1;
        // Smaller
        this._bonusView.mesh.scaling = new Vector3(0.5, 0.5, 0.5);
    }
}

export default BaseEnemyView;