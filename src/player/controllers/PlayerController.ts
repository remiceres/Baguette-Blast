import { AbstractMesh, Vector3 } from '@babylonjs/core';
import PlayerModel from '../models/PlayerModel';
import PlayerView from '../views/PlayerView';
import InputManager from '../../inputs/InputManager';
import Game from '../../Game';
import { WeaponController } from '../../weapon/controllers/WeaponController';
import { WeaponInitializer } from '../../stateManager/states/WeaponInitializer';


class PlayerController {
    private _model: PlayerModel;
    private _view: PlayerView;
    private _inputManager: InputManager;
    private _leftHand: AbstractMesh;
    private _rightHand: AbstractMesh;
    private _weaponController: WeaponController;

    constructor(model: PlayerModel, view: PlayerView) {
        this._model = model;
        this._view = view;
        this._inputManager = Game.instance.inputManager;
        this._leftHand = Game.instance.inputManager.leftAnchor;
        this._rightHand = Game.instance.inputManager.rightAnchor;
    }

    public initWeapon(hand: 'left'|'right'): void {
        this._weaponController = WeaponInitializer.initializeWeapon(hand === 'left' ? this._leftHand : this._rightHand);
    }

    public get position(): Vector3 {
        return this._model.position;
    }

    public update(deltaTime: number): void {
        // Update player state based on input
        this._weaponController.update(deltaTime);
        deltaTime;

        // // Catch fire weapon input
        if (this._inputManager.rightPrimary.pressed) {
            this._weaponController.fire();
        }
    }

    public dispose(): void {
        // Dispose view and other resources
        this._view.dispose();       
    }

    // Additional methods for input handling can be added here
}

export default PlayerController;