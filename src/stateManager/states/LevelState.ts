import { Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import IBehaviour from '../../behaviors/IBehaviour';
// import Gravity from '../../behaviors/Gravity';
import AttractEnemy from '../../behaviors/AttractEnemy';
import Gravity from '../../behaviors/Gravity';
import EnemyFactory from '../../enemy/EnemyFactory';
import EnemyController from '../../enemy/controllers/EnemyController';
import Game from '../../game/Game';
import GameManager from '../../game/controllers/GameManager';
import { LevelData } from '../../game/models/LevelData';
import Buttons from '../../menu/buttons';
import PlayerController from '../../player/controllers/PlayerController';
// import ProjectileController from '../../projectile/controllers/ProjectileController';
// import ProjectileView from '../../projectile/views/ProjectileView';
import { WeaponFactory } from '../../weapon/WeaponFactory';
import State from '../EnumState';
import StateInterface from './StateInterface';
import { SoundPlayer } from '../../game/controllers/SoundPlayer';

class LevelState implements StateInterface {
    public static _enemiesController: EnemyController[] = [];

    private _levelNumber: number;
    private _levelData?: LevelData;
    // private _collisionManager: CollisionManager;
    private _playerController: PlayerController;
    private _cubeMenu: Mesh;
    private _score: number;
    private _currentWaveIndex: number = 0;

    constructor(levelNumber: number) {
        this._setLevelNumber(levelNumber);
        this._returnLevelByNumber(levelNumber)
            .then((levelData) => {
                // Use the level data here
                this._levelData = levelData;
            })
            .catch((error) => {
                // Handle errors here
                console.error('Cannot load level data:', error);
            });
        // this._collisionManager = new CollisionManager();
    }

    private _returnLevelByNumber(levelNumber: number): Promise<LevelData> {
        const url = `../../levels/level${levelNumber}.json`;
        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch level ${levelNumber}: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Assuming LevelData is an interface representing your JSON data structure
                return data as LevelData;
            })
            .catch((error) => {
                console.error('Error loading level data:', error);
                throw error;
            });
    }

    private _setLevelNumber(levelNumber: number): void {
        if (levelNumber <= 0) {
            throw new Error('Please set a positive number as the level number.');
        }
        this._levelNumber = levelNumber;
    }

    private _initInterface(): void {
        this._cubeMenu = MeshBuilder.CreateBox('cubeMenu', { size: 1 }, Game.instance.scene);
        const playerPosition = new Vector3(
            this._levelData?.player?.position.x,
            this._levelData?.player?.position.y,
            this._levelData?.player?.position.z
        );
        this._cubeMenu.position = playerPosition.add(new Vector3(0, 0, 5));
        Buttons.clickable(Game.instance.scene, this._cubeMenu, () => {
            Game.instance.stateManager.changeState(State.SelectLevel);
        });
    }

    private _initPlayerController(): void {
        Game.instance.player.reset();
        Game.instance.player.health = this._levelData?.player?.health || 100;
        Game.instance.player.teleport(
            new Vector3(
                this._levelData?.player?.position.x,
                this._levelData?.player?.position.y,
                this._levelData?.player?.position.z
            )
        );

        // TODO : Add behavior in json file /////////////////////////////////////////////////
        const behaviors: IBehaviour[] = [];
        behaviors.push(new Gravity(25));
        behaviors.push(new AttractEnemy(LevelState._enemiesController, 5, 10));
        // behaviors.push(new MoveAtoB(1, new Vector3(0, 0, 0), new Vector3(0, 0, 10), 5));
        //////////////////////////////////////////////////////////////////////////////////////

        // const projectile = new ProjectileController(new ProjectileView(), new ProjectileModel(), behaviors);

        const weaponDataLeft = this._levelData.player.left_hand;
        if (weaponDataLeft) {
            const weaponController = WeaponFactory.createWeapon(weaponDataLeft);
            Game.instance.player.giveWeapon('left', weaponController);
        }

        const weaponDataRight = this._levelData.player.right_hand;
        if (weaponDataRight) {
            const weaponController = WeaponFactory.createWeapon(weaponDataRight);
            Game.instance.player.giveWeapon('right', weaponController);
        }

    }

    public async init(): Promise<void> {
        try {
            GameManager.getInstance(this._levelData?.game?.time || 30).resetChrono();
            this._initInterface();
            this._initializeLevelData();
            const levelMusic = new SoundPlayer('music_levels_'+this._levelNumber, Game.instance.scene, null, true);
            levelMusic.play(true);
        } catch (error) {
            console.error('Error during game initialization:', error);
        }
    }

    private _initializeLevelData(): void {
        if (this._levelData?.player) {
            this._initPlayerController();
            Game.instance.collisionManager.addCollider(Game.instance.player);
        }

        // Init score
        this._score = 0;

        // Initialize enemies wave
        this._initWave();
    }

    private _initWave(): void {
        if (this._levelData?.waves && this._levelData.waves.length > this._currentWaveIndex) {
            const currentWave = this._levelData.waves[this._currentWaveIndex];

            // Clear existing enemies from the previous wave
            LevelState._enemiesController.forEach((enemyController) => {
                Game.instance.collisionManager.removeCollider(enemyController);
                enemyController.dispose(); // Assuming destroy cleans up properly
            });
            LevelState._enemiesController = []; // Reset the enemies controller list

            // Create and add new enemies for the current wave
            LevelState._enemiesController.push(...currentWave.enemies.map((enemy) => EnemyFactory.createEnemy(enemy)));
            // this._enemiesController.forEach((enemyController) => {
            //     Game.instance.collisionManager.addCollider(enemyController);
            // });

            // Update the global count of enemies left
            // Game.instance.enemiesLeft = this._enemiesController.length;
            // console.log('Enemies left:', Game.instance.enemiesLeft);
        } else {
            console.log('No more waves found or wave index out of bounds.');
        }
    }

    private _advanceToNextWave(): void {
        if (this._currentWaveIndex < this._levelData.waves.length - 1) {
            this._currentWaveIndex++;
            this._initWave();
        } else {
            console.log('No more waves to advance to.');
            this.dispose();
        }
    }

    public dispose(): void {
        this._cubeMenu.dispose();
        LevelState._enemiesController.forEach((enemy) => enemy.dispose());
        LevelState._enemiesController = [];
        Game.instance.player.dispose();
        const themeMusic = new SoundPlayer('music_theme', Game.instance.scene, null, true);
        themeMusic.play(true);
        Game.instance.player.dispose();
    }

    public update(deltaTime: number): void {
        // Assuming playerController has a method to get current health
        const playerHealth = Game.instance.player.health;

        GameManager.getInstance().update(deltaTime, playerHealth, LevelState._enemiesController);

        // Update enemies
        LevelState._enemiesController.forEach((enemyController) => {
            enemyController.update(deltaTime);
        });

        // Update player
        Game.instance.player.update(deltaTime);

        // let elimination = null;
        // Check for collisions
        // elimination = this._collisionManager.checkForCollisions(Game.instance.player.weaponRight);
        // if (elimination) {
        //     // Remove the enemy from the list
        //     const index = this._enemiesController.indexOf(elimination);
        //     if (index > -1) {
        //         this._score += this._enemiesController[index].score;
        //         Game.score = this._score;
        //         this._enemiesController.splice(index, 1);
        //     }
        //     elimination.dispose();
        // }
        Game.instance.collisionManager.update();

        // Check if all enemies are dead
        // if (Game.instance.enemiesLeft === 0) {
        // this._advanceToNextWave();
        // }
    }
}

export default LevelState;
