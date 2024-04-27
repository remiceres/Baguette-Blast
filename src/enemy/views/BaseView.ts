import { Mesh, Scene, Vector3 } from '@babylonjs/core';
import BonusView from '../../bonus/views/BonusView';

abstract class BaseView {
    public _mesh: Mesh;
    protected _scene: Scene;
    protected _bonusView: BonusView;

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

    public set bonusView(bonusView: BonusView) {
        this._bonusView = bonusView;
        // Add bonus mesh to the enemy mesh, on top of the enemy mesh
        this._bonusView.mesh.parent = this._mesh;
        this._bonusView.mesh.position.y = 1;
        // Smaller
        this._bonusView.mesh.scaling = new Vector3(0.5, 0.5, 0.5);
    }
}

export { BaseView };