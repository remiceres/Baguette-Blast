import { AbstractMesh, Vector3 } from '@babylonjs/core';
import BaseBonusController from '../../bonus/controllers/BaseBonusController';
import Game from '../../game/Game';
import BaseEnemyModel from '../models/BaseEnemyModel';
import BaseEnemyView from '../views/BaseEnemyView';

abstract class EnemyController implements ICollider {
    // MVC
    protected _model: BaseEnemyModel;
    protected _view: BaseEnemyView;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(model: BaseEnemyModel, view: BaseEnemyView) {
        // MVC
        this._model = model;
        this._view = view;

        // Initialize the hitbox
        this._model.hitbox = this.createHitbox();

        // Add to collider
        Game.instance.collisionManager.addCollider(this);
    }

    public abstract createHitbox(): AbstractMesh;

    //////////////
    // Collider //
    //////////////

    public collidesWith(): boolean {
        // No collision check in this class, all collision checks are done in the projectile controller 9
        return false;
    }

    public onCollision(): void {
        this.dispose();
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        // Update the position of the enemy
        this._updatePosition(deltaTime);

        // Update the view
        this._view.update(deltaTime);
    }

    private _updatePosition(deltaTime: number): void {
        // Apply initial damping to simulate friction and air resistance
        const dampingFactor = this._model.dampingFactor;
        this._model.speedVector.scaleInPlace(dampingFactor);

        // Accumulate the forces from all behaviors
        for (const behavior of this._model.behaviors) {
            const force = behavior.getForceVector(deltaTime, this._view.mesh, this._model.speedVector);
            this._model.speedVector.addInPlace(force);
        }

        // Limit the speed vector to the maximum speed
        if (this._model.speedVector.length() > this._model.maxSpeed) {
            this._model.speedVector.normalize().scaleInPlace(this._model.maxSpeed);
        }

        // Update the position of the mesh
        this._model.position.addInPlace(this._model.speedVector.scale(deltaTime));
        this._view.mesh.position = this._model.position;
    }

    //////////////
    // Accessor //
    //////////////

    public get hitbox(): AbstractMesh {
        return this._model.hitbox;
    }

    public get position(): Vector3 {
        return this._model.position;
    }

    ///////////
    // Bonus //
    ///////////

    public set attachBonus(controller: BaseBonusController) {
        this._model.bonusController = controller;
        this._view.bonusView = controller.view;
    }

    //////////////
    // Accessor //
    //////////////

    public dispose(): void {
        this._model.canBeDisposed = true;
        Game.instance.collisionManager.removeCollider(this);
        this._view.dispose();
        this._model.dispose();
    }
}

export default EnemyController;
