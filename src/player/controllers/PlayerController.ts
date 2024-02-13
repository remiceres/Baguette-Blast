import { Vector3 } from '@babylonjs/core';
import PlayerModel from '../models/PlayerModel';
import PlayerView from '../views/PlayerView';
import InputManager from '../../inputs/InputManager';
import Game from '../../Game';


class PlayerController {
    private _model: PlayerModel;
    private _view: PlayerView;
    private _inputManager: InputManager;

    constructor(model: PlayerModel, view: PlayerView) {
        this._model = model;
        this._view = view;
        this._inputManager = Game.instance.inputManager;
    }

    public get position(): Vector3 {
        return this._model.position;
    }

    public fireWeapon(): void {
        // On space press or click, print "Pew pew!"
        console.log('Pew pew!');
    }

    public update(deltaTime: number): void {
        // Update player state based on input
        deltaTime;

        // Catch fire weapon input
        if (this._inputManager.rightGrip.pressed) {
            this.fireWeapon();
        }
    }

    public dispose(): void {
        // TODO: Dispose model?
        // Dispose view and other resources
        this._view.dispose();       
    }

    // Additional methods for input handling can be added here
}

export default PlayerController;