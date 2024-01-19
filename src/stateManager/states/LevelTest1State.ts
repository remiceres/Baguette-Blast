import { Color3, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3 } from '@babylonjs/core';
import InteractionManager from '../../InteractionManager';
import { EnemyFactory } from '../../enemy/EnemyFactory';
import { EnemyController } from '../../enemy/controllers/EnemyController';
import { FlyingBehavior } from '../../enemy/controllers/FlyingBehavior';
import { SeekingBehavior } from '../../enemy/controllers/SeekingBehavior';
import { WalkingBehavior } from '../../enemy/controllers/WalkingBehavior';
import { EnemyView } from '../../enemy/views/EnemyView';
import StateInterface from '../StateInterface';
import StateManager from '../StateManager';

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

    /**
     * Initializes the level test state with the given scene and sets up enemies.
     * @param {Scene} scene - The Babylon.js scene for the level.
     * @returns {Promise<void>} A promise that resolves when initialization is complete.
     */
    public async init(scene: Scene): Promise<void> {
        this._scene = scene;
        this._light1 = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);

        this._setupMenuCube();
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
            StateManager.getInstance().changeState('Menu');
        });
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
            new FlyingBehavior()
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
            new WalkingBehavior()
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
    }

    /**
     * Animates the level test state elements, including enemies, based on deltaTime.
     * @param {number} deltaTime - The time in seconds since the last frame.
     */
    public animate(deltaTime: number): void {
        this._flyingEnemyController.animate(deltaTime);
        this._seekingEnemyController.animate(deltaTime);
        this._walkingEnemyController.animate(deltaTime);
    }
}

export default LevelTest1State;
