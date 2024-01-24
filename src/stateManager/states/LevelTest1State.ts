import { Color3, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3 } from '@babylonjs/core';
import Game from '../../Game';
import InteractionManager from '../../InteractionManager';
import { EnemyFactory } from '../../enemy/EnemyFactory';
import { EnemyController } from '../../enemy/controllers/EnemyController';
import { FlyingBehavior } from '../../enemy/models/Flying/FlyingBehavior';
import { SeekingBehavior } from '../../enemy/models/Seeking/SeekingBehavior';
import { WalkingBehavior } from '../../enemy/models/Walking/WalkingBehavior';
import { EnemyView } from '../../enemy/views/EnemyView';
import InputManager from '../../player/controllers/InputManager';
import PlayerController from '../../player/controllers/PlayerController';
import PlayerModel from '../../player/models/PlayerModel';
import PlayerView from '../../player/views/PlayerView';
import State from '../EnumState';
import StateInterface from './IState';

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
        this._initializePlayer();
        this._createEnemies();

        return Promise.resolve();
    }

    /**
     * Sets up the interactive menu cube in the scene.
     */
    private _setupMenuCube(): void {
        this._cubeMenu = MeshBuilder.CreateBox('cubeMenu', { size: 1 }, this._scene);
        this._cubeMenu.position = new Vector3(0, -2, 0);
        InteractionManager.setupMeshInteraction(this._scene, this._cubeMenu, () => {
            Game.instance.stateManager.changeState(State.Menu);
        });
    }

    /**
     * Initializes the player with its model, view, and controller.
     */
    private _initializePlayer(): void {
        this._playerModel = new PlayerModel();
        this._playerView = new PlayerView(this._scene, this._playerModel); // Pass the PlayerModel here
        this._playerController = new PlayerController(this._playerModel, this._playerView);
        this._inputManager = new InputManager(this._playerModel, this._scene);
    }

    /**
     * Creates and initializes enemies with their respective behaviors and views.
     */
    private _createEnemies(): void {
        // Flying enemy setup
        const flyingEnemyModel = EnemyFactory.createEnemy(
            'flying',
            new Vector3(0, 10, 0),
            1,
            100,
            new FlyingBehavior(this._playerModel)
        );
        const flyingEnemyView = new EnemyView(flyingEnemyModel, this._scene, Color3.Blue());
        this._flyingEnemyController = new EnemyController(flyingEnemyModel, flyingEnemyView);

        // Seeking enemy setup
        const seekingEnemyModel = EnemyFactory.createEnemy(
            'flying',
            new Vector3(0, 0, 0),
            0.5,
            100,
            new SeekingBehavior(flyingEnemyModel)
        );
        const seekingEnemyView = new EnemyView(seekingEnemyModel, this._scene, Color3.Green());
        this._seekingEnemyController = new EnemyController(seekingEnemyModel, seekingEnemyView);

        // Walking enemy setup
        const walkingEnemyModel = EnemyFactory.createEnemy(
            'walking',
            new Vector3(0, 0, 0),
            3,
            100,
            new WalkingBehavior(this._playerModel)
        );
        const walkingEnemyView = new EnemyView(walkingEnemyModel, this._scene, Color3.Red());
        this._walkingEnemyController = new EnemyController(walkingEnemyModel, walkingEnemyView);
    }

    /**
     * Disposes of resources used by the level test state, including enemies.
     */
    public dispose(): void {
        this._light1.dispose();
        this._cubeMenu.dispose();
        this._flyingEnemyController.dispose();
        this._seekingEnemyController.dispose();
        this._walkingEnemyController.dispose();
        this._playerController.dispose();
        this._playerView.dispose();
    }

    /**
     * Animates the level test state elements, including enemies, based on deltaTime.
     * @param {number} deltaTime - The time in seconds since the last frame.
     */
    public animate(deltaTime: number): void {
        this._flyingEnemyController.animate(deltaTime);
        this._seekingEnemyController.animate(deltaTime);
        this._walkingEnemyController.animate(deltaTime);
        this._inputManager.update(deltaTime); // Updating the input manager
        // this._playerView.update(); // Updating the player view to reflect any changes
    }
}

export default LevelTest1State;
