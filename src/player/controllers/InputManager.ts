import { Scene } from '@babylonjs/core';
import PlayerModel from '../models/PlayerModel';
import PCPlayerController from './PCPlayerController';
import VRPlayerController from './VRPlayerController';

class InputManager {
    private _playerModel: PlayerModel;
    private _playerController: IPlayerController;
    private _scene: Scene;

    constructor(playerModel: PlayerModel, scene: Scene) {
        this._scene = scene;
        this._playerModel = playerModel;
        this._initializeController();
    }

    private _initializeController(): void {
        if (this._isVRPlatform()) {
            this._playerController = new VRPlayerController(this._playerModel, this._scene);
        } else {
            this._playerController = new PCPlayerController(this._playerModel, this._scene);
        }
    }

    private _isVRPlatform(): boolean {
        // Implement logic to determine if the platform is VR
        // This might involve checking for VR hardware connectivity, settings, etc.
        return false; // Placeholder
    }

    public update(deltaTime: number): void {
        if (this._playerController) {
            this._playerController.update(deltaTime);
        }
    }    

    dispose() {
        throw new Error('Method not implemented.');
    }
    // Additional methods to handle specific input events can be added here
}

export default InputManager;