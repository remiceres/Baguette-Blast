import { HemisphericLight, Mesh, MeshBuilder, Scene, Vector3 } from '@babylonjs/core';
import Game from '../../Game';
import Buttons from '../../menu/buttons';
import { EnemyController } from '../../enemy/controllers/EnemyController';
import InputManager from '../../player/controllers/InputManager';
import PlayerController from '../../player/controllers/PlayerController';
import PlayerModel from '../../player/models/PlayerModel';
import PlayerView from '../../player/views/PlayerView';
import State from '../EnumState';
import StateInterface from './IState';
import { PlayerInitializer } from './PlayerInitializer';
import { EnemyInitializer } from './EnemyInitializer';

/**
 * Represents the first level test state of the application, handling the initialization,
 * disposal, and animation of the scene's level test elements, including enemies.
 */
class LevelTest1State implements StateInterface {
    private _scene: Scene;
    private _light1: HemisphericLight;
    private _cubeMenu: Mesh;

    private _flyingEnemyController: EnemyController;
    private _walkingEnemyController: EnemyController;
    private _seekingEnemyController: EnemyController;

    private _playerModel: PlayerModel;
    private _playerView: PlayerView;
    private _playerController: PlayerController;
    private _inputManager: InputManager;

    /**
     * Initializes the level test state with the given scene.
     * @param {Scene} scene - The Babylon.js scene for the level.
     * @returns {Promise<void>} A promise that resolves when initialization is complete.
     */
    public async init(scene: Scene): Promise<void> {
        this._scene = scene;
        this._light1 = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);

        this._setupMenuCube();

        // Initialize player components
        const { playerModel, playerController, inputManager } = PlayerInitializer.initializePlayer(scene);
        this._playerController = playerController;
        this._inputManager = inputManager;

        // Initialize enemies
        const enemies = EnemyInitializer.createEnemies(scene, playerModel);
        this._flyingEnemyController = enemies.flyingEnemyController;
        this._seekingEnemyController = enemies.seekingEnemyController;
        this._walkingEnemyController = enemies.walkingEnemyController;

        return Promise.resolve();
    }


    /**
     * Sets up the interactive menu cube in the scene.
     */
    private _setupMenuCube(): void {
        this._cubeMenu = MeshBuilder.CreateBox('cubeMenu', { size: 1 }, this._scene);
        this._cubeMenu.position = new Vector3(0, -2, 0);
        Buttons.clickable(this._scene, this._cubeMenu, () => {
            Game.instance.stateManager.changeState(State.Menu);
        });
    }

    /**
     * Disposes of resources used by the level test state, including enemies.
     */
    public dispose(): void {
        // Dispose of light and menu cube
        this._light1.dispose();
        this._cubeMenu.dispose();

        // Dispose of enemy controllers
        this._flyingEnemyController?.dispose();
        this._seekingEnemyController?.dispose();
        this._walkingEnemyController?.dispose();

        // Dispose of player components
        this._playerController?.dispose();
        // Note: If PlayerView and InputManager are disposed in PlayerController, they don't need to be disposed here
    }


    /**
     * Animates the level test state elements, including enemies, based on deltaTime.
     * @param {number} deltaTime - The time in seconds since the last frame.
     */
    public animate(deltaTime: number): void {
        // Update enemy controllers
        this._flyingEnemyController?.animate(deltaTime);
        this._seekingEnemyController?.animate(deltaTime);
        this._walkingEnemyController?.animate(deltaTime);

        // Update input manager and player controller
        this._inputManager?.update(deltaTime);
        this._playerController?.update(deltaTime); // If playerController has an update method
    }
}

export default LevelTest1State;
