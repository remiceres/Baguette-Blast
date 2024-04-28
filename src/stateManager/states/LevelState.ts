import { Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import level1 from '../../../public/levels/level1.json';
import EnemyFactory from '../../enemy/EnemyFactory';
import EnemyController from '../../enemy/controllers/EnemyController';
import { LevelData } from '../../game/LevelData';
import StateInterface from './StateInterface';
import Game from '../../Game';
import State from '../EnumState';
import Buttons from '../../menu/buttons';
import PlayerController from '../../player/controllers/PlayerController';
import BallProjectile from '../../projectile/BallProjectile';
import GunBall from '../../weapon/GunBall';
import PlayerModel from '../../player/models/PlayerModels';
import PlayerView from '../../player/views/PlayerViews';
import CollisionManager from './CollisionManager';

const levelData: LevelData = level1 as LevelData;

class LevelState implements StateInterface {
    private _levelNumber: number;
    private _levelData?: LevelData;
    private _collisionManager: CollisionManager;

    private _playerController: PlayerController;
    private _enemiesController: EnemyController[] = [];
    private _cubeMenu: Mesh;

    constructor(levelNumber: number) {
        if (levelNumber <= 0) {
            throw new Error('Please set a positive number as the level number.');
        }
        this._levelNumber = levelNumber;
    }

    private _initInterface(): void {
        this._cubeMenu = MeshBuilder.CreateBox('cubeMenu', { size: 1 }, Game.instance.scene);
        this._cubeMenu.position = new Vector3(0, 1, 0);
        Buttons.clickable(Game.instance.scene, this._cubeMenu, () => {
            Game.instance.stateManager.changeState(State.MenuHome);
        });
    }

    private _initPlayerController(): void {
        this._playerController = new PlayerController(new PlayerModel, new PlayerView);

        const projectile = new BallProjectile();
        const weapon = new GunBall(projectile);

        this._playerController.setWeapon('right', weapon);
    }

    public async init(): Promise<void> {
        this._initInterface();
        this._initPlayerController();
        this._collisionManager = new CollisionManager();

        console.log(`Initializing level ${this._levelNumber}...`);
    
        // Assuming level data is already validated to match LevelData interface
        this._levelData = levelData;
    
        if (this._levelData && this._levelData.player) {
            console.log(`Player's left hand item: ${this._levelData.player.left_hand.item}`);
            this._initPlayerController();
        }
    
        if (this._levelData && this._levelData.enemies) {
            this._enemiesController = this._levelData.enemies.map(enemy => EnemyFactory.createEnemy(enemy));
            this._enemiesController.forEach((enemyController) => {
                this._collisionManager.addCollider(enemyController);
            });
        } else {
            console.log('No enemies found in the level data.');
        }
    }    

    public set levelNumber(levelNumber: number) {
        if (levelNumber <= 0) {
            throw new Error('Please set a positive number as the level number.');
        }
        this._levelNumber = levelNumber;
    }

    public dispose(): void {
        this._cubeMenu.dispose();
        this._enemiesController.forEach(enemy => enemy.dispose());
    }

    public update(deltaTime: number): void {
        // Update enemies
        this._enemiesController.forEach((ennemyControllers) => {
            ennemyControllers.update(deltaTime);
        });

        // Update player
        this._playerController.update(deltaTime);

        // Check for collisions
        this._collisionManager.checkForCollisions(this._playerController.weaponRight);
    }
}

export default LevelState;
