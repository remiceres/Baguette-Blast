import { AbstractMesh } from '@babylonjs/core';
import WeaponInterface from '../../weapon/WeaponIInterface';
import PlayerModel from '../models/PlayerModels';
import PlayerView from '../views/PlayerViews';
import Game from '../../Game';
import InputManager from '../../inputs/InputManager';

class PlayerController {

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

    // TODO: Redondance avec les if a voir si on peut pas faire autrement
    setWeapon(hand: 'left' | 'right', weapon: WeaponInterface): void {
        if (hand === 'left') {
            this._model.weaponLeft = weapon;
            this._model.weaponLeft.grap(this._leftHand);
        } else {
            this._model.weaponRight = weapon;
            this._model.weaponRight.grap(this._rightHand);
        }
    }


    public update(deltaTime: number): void {
        // console.log(Game.instance.cameraManager.playerCamera.position);
        // console.log(this._view._playerMesh.position);
        
        deltaTime;

        this._fireWeapon();
    }

    private _fireWeapon(): void {
        // Fire weapon on right hand
        if (this._inputManager.rightPrimary.pressed && this._model.weaponRight) {
            console.log(this._inputManager.rightPrimary.pressed);
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