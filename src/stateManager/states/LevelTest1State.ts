import { HemisphericLight, Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import Game from '../../Game';
import Buttons from '../../menu/buttons';
import Player from '../../player/Player';
import BallProjectile from '../../projectile/BallProjectile';
import AbstractBallProjector from '../../weapon/AbstractBallProjector';
// import HandBall from '../../weapon/HandBall';
import { BaseView } from '../../enemy/views/BaseView';
import State from '../EnumState';
import EnemyInitializer from './EnemyInitializer';
import StateInterface from './StateInterface';
// import EnemyView from '../../enemy/views/EnemyView';
import EnemyController from '../../enemy/controllers/EnemyController';
import gameLevels from '../../GameLevelConfig';
import GunBall from '../../weapon/GunBall';

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
        // Assuming you have a way to determine the current level number
        const currentLevelNumber = 1; // For demonstration, loading level 1
        const currentLevelConfig = gameLevels.find((level) => level.level === currentLevelNumber);

        this._setupMenuCube();

        // Initialize light
        this._light1 = new HemisphericLight('light1', new Vector3(1, 1, 0), Game.instance.scene);

        // Initialize player components
        this._player = new Player();
        // Based on the level, choose the appropriate weapon
        switch (currentLevelConfig.weapon) {
            case 'Air Pistol':
                this._ball = new GunBall(new BallProjectile());
                break;
            // Add cases for other weapons as needed
        }
        this._player.grabWeapon('right', this._ball);

        this._enemyInitializer = new EnemyInitializer(Game.instance.scene);

        // Dynamically create enemies based on the level configuration
        currentLevelConfig.enemies.forEach((enemy) => {
            for (let i = 0; i < enemy.quantity; i++) {
                // Generate a random position
                const position = new Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);

                // Initialize the enemy based on its type
                let controller;
                switch (enemy.name) {
                    case 'Copper Balloon':
                        controller = this._enemyInitializer.createCopperBalloon(position, enemy.points);
                        break;
                    case 'Silver Balloon':
                        controller = this._enemyInitializer.createSilverBalloon(position, enemy.points);
                        break;
                    case 'Walking Enemy':
                        controller = this._enemyInitializer.createEnemy(position, enemy.points);
                        break;
                    // Add cases for other enemy types as needed
                }
                if (controller) {
                    this._controllers.push(controller);
                }
            }
        });

        return Promise.resolve();
    }

    /**
     * Sets up the interactive menu cube in the scene.
     */
    private _setupMenuCube(): void {
        this._cubeMenu = MeshBuilder.CreateBox('cubeMenu', { size: 1 }, Game.instance.scene);
        this._cubeMenu.position = new Vector3(0, -2, 0);
        Buttons.clickable(Game.instance.scene, this._cubeMenu, () => {
            Game.instance.stateManager.changeState(State.MenuHome);
        });
    }

    private _checkForCollisions(): void {
        // this._views.forEach(view => {
        this._controllers.forEach((controller) => {
            if (controller.view instanceof BaseView) {
                this._ball.getProjectiles().forEach((projectile) => {
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

    private _rightSecondaryContinuePressed = false;

    private _toggleTimeSlow(): void {
        const primaryPressed: boolean = Game.instance.inputManager.rightSecondary.pressed;
        const isSlowPower = Game.instance.timeControl.isSlowPower();

        if (primaryPressed && !this._rightSecondaryContinuePressed) {
            isSlowPower ? Game.instance.timeControl.disableSlowPower() : Game.instance.timeControl.activeSlowPower(0.2);
        }

        this._rightSecondaryContinuePressed = primaryPressed;
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
        this._controllers.forEach((controller) => {
            controller.update(deltaTime);
        });

        // Check for collisions
        this._ball.update(deltaTime); // Assuming this updates the projectile's position
        this._checkForCollisions();

        this._toggleTimeSlow();

        // // Update views
        // this._views.forEach(view => {
        //     view.update();
        // });
    }
}

export default LevelTest1State;
