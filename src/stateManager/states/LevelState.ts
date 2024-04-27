import level1 from '../../../public/levels/level1.json';
import EnemyFactory from '../../enemy/EnemyFactory';
import EnemyController from '../../enemy/controllers/EnemyController';
import { LevelData } from '../../game/LevelData';
import StateInterface from './StateInterface';

const levelData: LevelData = level1 as LevelData;

class LevelState implements StateInterface {
    private _levelNumber: number;
    private _levelData?: LevelData;

    private _enemiesController: EnemyController[] = [];

    constructor(levelNumber: number) {
        if (levelNumber <= 0) {
            throw new Error('Please set a positive number as the level number.');
        }
        this._levelNumber = levelNumber;
    }

    public async init(): Promise<void> {
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

    public dispose(): void {}

    public animate(deltaTime: number): void {
        deltaTime;
        this._enemiesController.forEach(enemy => enemy.update(deltaTime));
    }
}

export default LevelState;
