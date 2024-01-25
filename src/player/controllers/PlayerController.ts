import { Vector3 } from '@babylonjs/core';
import PlayerModel from '../models/PlayerModel';
import PlayerView from '../views/PlayerView';

class PlayerController {
    private _model: PlayerModel;
    private _view: PlayerView;

    constructor(model: PlayerModel, view: PlayerView) {
        this._model = model;
        this._view = view;

        // Setup input handling here (keyboard/mouse, VR controllers, etc.)
    }

    public update(deltaTime: number): void {
        // Update player state based on input

        // For example, change the player's position
        // This is where you would add logic based on inputs
        const newPosition = new Vector3(
            this._model.position.x, 
            this._model.position.y, 
            this._model.position.z + 0.1 * deltaTime
        );

        this._model.updatePosition(newPosition);
    }

    public dispose(): void {
        // TODO: Dispose model?
        // Dispose view and other resources
        this._view.dispose();       
    }

    // Additional methods for input handling can be added here
}

export default PlayerController;