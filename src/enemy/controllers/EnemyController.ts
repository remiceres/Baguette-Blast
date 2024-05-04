import { Vector3 } from '@babylonjs/core';
import BaseBonusController from '../../bonus/controllers/BaseBonusController';
import ProjectileController from '../../projectile/controllers/ProjectileController';
import BaseEnemyModel from '../models/BaseEnemyModel';
import BaseEnemyView from '../views/BaseEnemyView';

class EnemyController implements ICollider {
    private _model: BaseEnemyModel;
    private _view: BaseEnemyView;
    private _bonusController: BaseBonusController;

    constructor(model: BaseEnemyModel, view: BaseEnemyView) {
        this._model = model;
        this._view = view;
    }

    collidesWith(other: ICollider): boolean {
        if (other instanceof ProjectileController) {
            console.log('collidesWith');
            return true;
        }
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onCollision(other: ICollider): void {
        return;
    }

    dispose(): void {
        this._view.onKill();
        this.view.dispose();
        if (this._bonusController) {
            this._bonusController.dispose();
        }
    }

    update(deltaTime: number): void {
        this._model.update(deltaTime);
        this._view.update();

        // Appliquer un damping initial pour simuler la friction et l'air résistance
        const dampingFactor = 0.98;
        this._model.movementVector.scaleInPlace(dampingFactor);

        // Accumuler les forces de tous les comportements
        for (const behaviour of this._model.behaviours) {
            const force = behaviour.getForceVector(deltaTime, this._view._mesh, this._model.movementVector);
            this._model.movementVector.addInPlace(force);
        }

        // Limiter le vecteur de vitesse à la vitesse maximale
        if (this._model.movementVector.length() > this._model.maxSpeed) {
            this._model.movementVector.normalize().scaleInPlace(this._model.maxSpeed);
        }

        // Mettre à jour la position du maillage
        this._view._mesh.position.addInPlace(this._model.movementVector.scale(deltaTime));
    }

    public get model(): BaseEnemyModel {
        return this._model;
    }

    public get view(): BaseEnemyView {
        return this._view;
    }

    public get score(): number {
        return this._model.score;
    }

    public set score(value: number) {
        this._model.score = value;
    }

    public get position(): Vector3 {
        return this._model.position;
    }

    public set bonusController(controller: BaseBonusController) {
        this._bonusController = controller;
        // set the bonus view for the enemy view
        this._view.bonusView = controller.view;
    }
}

export default EnemyController;
