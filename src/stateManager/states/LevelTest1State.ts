import { HemisphericLight, Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import Game from '../../Game';
import Buttons from '../../menu/buttons';
import Player from '../../player/Player';
import BallProjectile from '../../projectile/BallProjectile';
import AbstractBallProjector from '../../weapon/AbstractBallProjector';
// import HandBall from '../../weapon/HandBall';
import State from '../EnumState';
import StateInterface from './StateInterface';
import EnemyInitializer from './EnemyInitializer';
import { BaseView } from '../../enemy/views/BaseView';
// import EnemyView from '../../enemy/views/EnemyView';
import GunBall from '../../weapon/GunBall';
import EnemyController from '../../enemy/controllers/EnemyController';

/**
 * Represents the first level test state of the application, handling the initialization,
 * disposal, and animation of the scene's level test elements, including enemies.
 */
class LevelTest1State implements StateInterface {
    private _cubeMenu: Mesh;

    private _light1: HemisphericLight;

    private _player: Player;

    private _ball: AbstractBallProjector;

    private _enemyInitializer: EnemyInitializer;

    // Arrays to store models and views
    private _controllers: EnemyController[] = [];

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
        this._ball = new GunBall(new BallProjectile());
        this._player.grapWeapon('right', this._ball);

        this._enemyInitializer = new EnemyInitializer(Game.instance.scene);

        // Create an enemy
        const enemyController = this._enemyInitializer.createEnemy(new Vector3(2, 0, 0), 100);

        // Create a copper balloon
        const copperBalloonController = this._enemyInitializer.createCopperBalloon(new Vector3(-2, 3, 0), 100);

        // Create a silver balloon
        const silverBalloonController = this._enemyInitializer.createSilverBalloon(new Vector3(0, 3, 2), 100);

        this._controllers.push(enemyController);
        this._controllers.push(copperBalloonController);
        this._controllers.push(silverBalloonController);

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

    private _checkForCollisions(): void {
        // this._views.forEach(view => {
        this._controllers.forEach(controller => {
            if (controller.view instanceof BaseView) {
                this._ball.getProjectiles().forEach(projectile => {
                    if (projectile.intersectsMesh(controller.view._mesh, true)) {
                        // Notify the EnemyController about the collision
                        // view.controller.notifyCollision(projectile);
                        console.log('Collision detected');
                        // Dirty hack to remove the projectile and the enemy
                        // TODO: Remove the projectile and the enemy properly
                        // To do so I think we need a class that handles the collision
                        controller.dispose();
                        // Remove the controller from the array
                        const index = this._controllers.indexOf(controller);
                        if (index > -1) {
                            this._controllers.splice(index, 1);
                        }
                        
                        projectile.dispose();
                    }
                });
            }
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

        // // Update all models
        // this._models.forEach(model => {
        //     model.update(deltaTime);
        // });

        // Update all controllers
        this._controllers.forEach(controller => {
            controller.update(deltaTime);
        });

        // Check for collisions
        this._ball.update(deltaTime); // Assuming this updates the projectile's position
        this._checkForCollisions();

        // // Update views
        // this._views.forEach(view => {
        //     view.update();
        // });
    }
}

export default LevelTest1State;
