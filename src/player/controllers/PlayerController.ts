import { AbstractMesh, Vector3 } from '@babylonjs/core';
import Game from '../../game/Game';
import InputManager from '../../inputs/InputManager';
import WeaponInterface from '../../weapon/WeaponIInterface';
import PlayerModel from '../models/PlayerModels';
import PlayerView from '../views/PlayerViews';
import WeaponController from '../../weapon/controllers/WeaponController';
import EnemyController from '../../enemy/controllers/EnemyController';

class PlayerController implements ICollider{
    private _model: PlayerModel;
    private _view: PlayerView;

    private _inputManager: InputManager;
    private _leftHand: AbstractMesh;
    private _rightHand: AbstractMesh;

    constructor(model: PlayerModel, view: PlayerView) {
        this._model = model;
        this._view = view;

        this._inputManager = Game.instance.inputManager;
        this._leftHand = Game.instance.inputManager.leftAnchor;
        this._rightHand = Game.instance.inputManager.rightAnchor;
    }

    collidesWith(other: ICollider): boolean {
        if (other instanceof EnemyController) {
            if (other.model.hitbox.intersectsMesh(this._view._playerMesh)) {
                console.log('Player hit by enemy');
                return true;
            }
        }
        return false;
    }

    onCollision(other: ICollider): void {
        // console.log('onCollision');
        if (other instanceof EnemyController) {
            console.log('Player hit by enemy');
            this._model.health -= 1;
            console.log('Player health:', this._model.health);
            Game.instance.inputManager.vibrateController('left', 0.5, 0.5, 100);
        }
        return;
    }

    // TODO: Redondance avec les if a voir si on peut pas faire autrement
    setWeapon(hand: 'left' | 'right', weapon: WeaponController): void {
        if (hand === 'left') {
            this._model.weaponLeft = weapon;
            this._model.weaponLeft.grab(this._leftHand);
        } else {
            this._model.weaponRight = weapon;
            this._model.weaponRight.grab(this._rightHand);
        }
    }

    get view(): PlayerView {
        return this._view;
    }

    get weaponLeft(): WeaponInterface {
        return this._model.weaponLeft;
    }

    get weaponRight(): WeaponInterface {
        return this._model.weaponRight;
    }

    get health(): number {
        return this._model.health;
    }

    set health(health: number) {
        this._model.health = health;
    }

    set position(position: Vector3) {
        this._view.position = position;
    }

    get position(): Vector3 {
        return this._view.position;
    }

    public update(deltaTime: number): void {
        deltaTime;

        this._fireWeapon();

        
        if (this._model.weaponLeft) {
            this._model.weaponLeft.update(deltaTime);
        }
        
        if (this._model.weaponRight) {
            this._model.weaponRight.update(deltaTime);
        }
    }

    private _fireWeapon(): void {
        // Fire weapon on right hand
        if (this._inputManager.rightPrimary.pressed && this._model.weaponRight) {
            this._model.weaponRight.fire();
        }
        // Fire weapon on left hand
        if (this._inputManager.leftPrimary.pressed && this._model.weaponLeft) {
            this._model.weaponLeft.fire();
        }
    }

    public dispose(): void {
        this._view.dispose();
    }
}

export default PlayerController;
