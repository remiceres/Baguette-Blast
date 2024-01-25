import { Scene } from '@babylonjs/core';
import PlayerController from '../../player/controllers/PlayerController';
import PlayerModel from '../../player/models/PlayerModel';
import PlayerView from '../../player/views/PlayerView';
import InputManager from '../../player/controllers/InputManager'; // Correct the import path for InputManager

export class PlayerInitializer {
    static initializePlayer(scene: Scene): 
    { 
        playerModel: PlayerModel, 
        playerController: PlayerController, 
        inputManager: InputManager 
    } {
        const playerModel = new PlayerModel();
        const playerView = new PlayerView(scene, playerModel); // use scene
        const playerController = new PlayerController(playerModel, playerView); // local variable
        const inputManager = new InputManager(playerModel, scene); // local variable

        // Removed redundant initialization

        return { playerModel, playerController, inputManager };
    }
}
