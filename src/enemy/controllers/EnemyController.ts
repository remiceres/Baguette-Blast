import { MeshBuilder, Vector3 } from '@babylonjs/core';
import BaseBonusController from '../../bonus/controllers/BaseBonusController';
import BaseEnemyModel from '../models/BaseEnemyModel';
import BaseEnemyView from '../views/BaseEnemyView';
import Game from '../../game/Game';

class EnemyController implements ICollider {
    private _model: BaseEnemyModel;
    private _view: BaseEnemyView;
    private _bonusController: BaseBonusController;

    constructor(model: BaseEnemyModel, view: BaseEnemyView) {
        this._model = model;
        this._view = view;
        this.createHitbox();
    }

    collidesWith(other: ICollider): boolean {
        other;
        return false;
    }

    onCollision(other: ICollider): void {
        other;
    }

    createHitbox(): void {
        // Get the bounding box of the mesh
        const boundingBox = this._view._mesh.getBoundingInfo().boundingBox;
        // Create a box mesh to represent the hitbox
        const hitbox = MeshBuilder.CreateBox(
            'hitbox', 
            { 
                width: boundingBox.maximum.x - boundingBox.minimum.x - 0.1, 
                height: boundingBox.maximum.y - boundingBox.minimum.y - 0.1, 
                depth: boundingBox.maximum.z - boundingBox.minimum.z - 0.1 
            }, 
            Game.instance.scene
        );
        hitbox.showBoundingBox = true;
        // Position the hitbox at the center of the bounding box
        hitbox.position = boundingBox.center;
        hitbox.parent = this._view._mesh;

        // Make it invisible
        hitbox.isVisible = false;

        this._model.hitbox = hitbox;
    }

    dispose(): void {
        this._view.onKill();
        this.view.dispose();
        this._model.dispose();
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
