import { AbstractMesh } from '@babylonjs/core';
import BaseBonusView from '../../bonus/views/BaseBonusView';

abstract class BaseEnemyView {
    private _mesh: AbstractMesh;

    // Bonus view
    private _bonusView: BaseBonusView;

    /////////////////
    // Constructor //
    /////////////////

    public constructor() {
        this._mesh = this._createMesh();
    }

    /**
     * Create the mesh of the projectile
     *
     * @returns The mesh of the projectile
     */
    protected abstract _createMesh(): AbstractMesh;

    //////////////
    // Accessor //
    //////////////

    public get mesh(): AbstractMesh {
        return this._mesh;
    }

    public set bonusView(bonusView: BaseBonusView) {
        this._bonusView = bonusView;
        this._bonusView.mesh.parent = this._mesh;
        this._bonusView.mesh.position.y = 1;
    }

    ////////////
    // Update //
    ////////////

    public abstract update(deltaTime: number): void;

    /////////////
    // Dispose //
    /////////////

    protected abstract _killAnimation(): void;

    public dispose(): void {
        this._killAnimation();
        this._mesh.dispose();
    }
}

export default BaseEnemyView;
