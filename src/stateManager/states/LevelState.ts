import { Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import level1 from '../../../public/levels/level1.json';
import EnemyFactory from '../../enemy/EnemyFactory';
import EnemyController from '../../enemy/controllers/EnemyController';
import { LevelData } from '../../game/LevelData';
import StateInterface from './StateInterface';
import Game from '../../Game';
import State from '../EnumState';
import Buttons from '../../menu/buttons';

const levelData: LevelData = level1 as LevelData;

class LevelState implements StateInterface {
    private _levelNumber: number;
    private _levelData?: LevelData;

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

    public async init(): Promise<void> {
        this._initInterface();

        console.log(`Initializing level ${this._levelNumber}...`);
    
        // Assuming level data is already validated to match LevelData interface
        this._levelData = levelData;
    
        if (this._levelData && this._levelData.player) {
            console.log(`Player's left hand item: ${this._levelData.player.left_hand.item}`);
        }
    
        if (this._levelData && this._levelData.enemies) {
            this._enemiesController = this._levelData.enemies.map(enemy => EnemyFactory.createEnemy(enemy));
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
        deltaTime;
        this._enemiesController.forEach(enemy => enemy.update(deltaTime));
    }
}

export default LevelState;
