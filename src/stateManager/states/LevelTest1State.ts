import { HemisphericLight, Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import Game from '../../Game';
import Buttons from '../../menu/buttons';
import Player from '../../player/Player';
import BallProjectile from '../../projectile/BallProjectile';
import BallProjector from '../../weapon/BallProjector';
import HandBall from '../../weapon/HandBall';
import State from '../EnumState';
import StateInterface from './StateInterface';
import EnemyInitializer from './EnemyInitializer';
import EnemyModel from '../../enemy/models/EnemyModel';
import { BaseView } from '../../enemy/views/BaseView';

/**
 * Represents the first level test state of the application, handling the initialization,
 * disposal, and animation of the scene's level test elements, including enemies.
 */
class LevelTest1State implements StateInterface {
    private _cubeMenu: Mesh;

    private _light1: HemisphericLight;

    private _player: Player;

    private _ball: BallProjector;

    private _enemyInitializer: EnemyInitializer;

    // Arrays to store models and views
    private _models: EnemyModel[] = [];
    private _views: BaseView[] = [];
    
    /**
     * Initializes the level test state with the given scene.
     * @returns {Promise<void>} A promise that resolves when initialization is complete.
     */
    public async init(): Promise<void> {
        this._setupMenuCube();

        // Initialize light
        this._light1 = new HemisphericLight('light1', new Vector3(1, 1, 0), Game.instance.scene);

        // Initialize player components
        this._player = new Player();
        this._ball = new HandBall(new BallProjectile());
        this._player.grapWeapon('right', this._ball);

        this._enemyInitializer = new EnemyInitializer(Game.instance.scene);

        // Create an enemy
        const enemy = this._enemyInitializer.createEnemy(new Vector3(2, 0, 0), 100);
        this._models.push(enemy.model);
        this._views.push(enemy.view);

        // Create a copper balloon
        const balloon = this._enemyInitializer.createCopperBalloon(new Vector3(-2, 3, 0), 100);
        this._models.push(balloon.model);
        this._views.push(balloon.view);

        // Create a silver balloon
        const silverBalloon = this._enemyInitializer.createSilverBalloon(new Vector3(0, 3, 2), 100);
        this._models.push(silverBalloon.model);
        this._views.push(silverBalloon.view);

        return Promise.resolve();
    }

    /**
     * Sets up the interactive menu cube in the scene.
     */
    private _setupMenuCube(): void {
        this._cubeMenu = MeshBuilder.CreateBox('cubeMenu', { size: 1 }, Game.instance.scene);
        this._cubeMenu.position = new Vector3(0, -2, 0);
        Buttons.clickable(Game.instance.scene, this._cubeMenu, () => {
            Game.instance.stateManager.changeState(State.Menu);
        });
    }

    /**
     * Disposes of resources used by the level test state, including enemies.
     */
    public dispose(): void {
        // Dispose menu cube
        this._cubeMenu.dispose();

        // Dispose of player components
        this._player.dispose();

        // Dispose of weapon
        this._ball.dispose();

        // Dispose light
        this._light1.dispose();
    }

    /**
     * Animates the level test state elements, including enemies, based on deltaTime.
     * @param {number} deltaTime - The time in seconds since the last frame.
     */
    public animate(deltaTime: number): void {
        // Update player
        this._player.update(deltaTime);

        // Update weapon
        this._ball.update(deltaTime);

        // Update all models
        this._models.forEach(model => {
            model.update(deltaTime);
        });

        // Optionally, if your views also need updating
        this._views.forEach(view => {
            // Assuming views have an update method, or remove this if not necessary
            view.update();
        });
    }
}

export default LevelTest1State;
