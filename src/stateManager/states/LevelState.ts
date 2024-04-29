import { Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import level1 from '../../../public/levels/level1.json';
import EnemyFactory from '../../enemy/EnemyFactory';
import EnemyController from '../../enemy/controllers/EnemyController';
import { LevelData } from '../../game/models/LevelData';
import StateInterface from './StateInterface';
import Game from '../../game/Game';
import State from '../EnumState';
import Buttons from '../../menu/buttons';
import PlayerController from '../../player/controllers/PlayerController';
import BallProjectile from '../../projectile/BallProjectile';
import GunBall from '../../weapon/GunBall';
import PlayerModel from '../../player/models/PlayerModels';
import PlayerView from '../../player/views/PlayerViews';
import CollisionManager from '../../game/controllers/CollisionManager';
import GameManager from '../../game/controllers/GameManager';
import MusicManager from '../../game/controllers/MusicManager';

const levelData: LevelData = level1 as LevelData;

class LevelState implements StateInterface {
    private _levelNumber: number;
    private _levelData?: LevelData;
    private _collisionManager: CollisionManager;
    private _playerController: PlayerController;
    private _enemiesController: EnemyController[] = [];
    private _cubeMenu: Mesh;
    private _score: number;
    private _game: Game;
    musicManager: MusicManager;

    constructor(levelNumber: number) {
        this._setLevelNumber(levelNumber);
        this._collisionManager = new CollisionManager();
    }

    private _setLevelNumber(levelNumber: number): void {
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

    private _initPlayerController(levelData): void {
        this._playerController = new PlayerController(new PlayerModel(), new PlayerView());
        this._playerController.health = levelData?.player?.health || 100;
        this._playerController.position = new Vector3(
            levelData?.player?.position.x, 
            levelData?.player?.position.y, 
            levelData?.player?.position.z);

        const projectile = new BallProjectile();
        console.log(levelData?.player);
        const weapon = new GunBall(projectile, levelData?.player?.left_hand?.power || 10);

        this._playerController.setWeapon('right', weapon);
    }

    async initMusic() {
        await this.musicManager.loadTrack('/musics/theme.mp3');
        // this.musicManager.play();
    }

    public async init(): Promise<void> {
        this.musicManager = new MusicManager();
        this.initMusic();
        // Assuming level data is already validated to match LevelData interface
        this._levelData = levelData;  // Make sure levelData is correctly initialized
        GameManager.getInstance(this._levelData?.game?.time || 30).resetChrono();
        this._initInterface();
        this._initializeLevelData();
    }    

    private _initializeLevelData(): void {
        if (this._levelData?.player) {
            this._initPlayerController(this._levelData); 
        }

        // Init score
        this._score = 0;

        if (this._levelData?.enemies) {
            this._enemiesController = this._levelData.enemies.map(enemy => EnemyFactory.createEnemy(enemy));
            this._enemiesController.forEach(enemyController => {
                this._collisionManager.addCollider(enemyController);
            });
        } else {
            console.log('No enemies found in the level data.');
        }
    }

    public dispose(): void {
        this._cubeMenu.dispose();
        this._enemiesController.forEach(enemy => enemy.dispose());
        this._enemiesController = [];  
        this._playerController.weaponRight.getProjectiles().forEach(projectile => projectile.dispose());
        this._playerController.dispose();
    }

    public update(deltaTime: number): void {
        // Assuming playerController has a method to get current health
        const playerHealth = this._playerController.health;

        GameManager.getInstance().update(deltaTime, playerHealth, this._enemiesController);
        
        // Update enemies
        this._enemiesController.forEach(enemyController => {
            enemyController.update(deltaTime);
        });

        // Update player
        this._playerController.update(deltaTime);

        let elimination = null;
        // Check for collisions
        elimination = this._collisionManager.checkForCollisions(this._playerController.weaponRight);
        if (elimination) {
            // Remove the enemy from the list
            const index = this._enemiesController.indexOf(elimination);
            if (index > -1) {
                this._score += this._enemiesController[index].score;
                Game.score = this._score;
                this._enemiesController.splice(index, 1);
            }
            elimination.dispose();
        }
    }
}

export default LevelState;