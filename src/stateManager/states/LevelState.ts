import level1 from '../../../public/levels/level1.json';
import EnemyController from '../../enemy/controllers/EnemyController';
import { LevelData } from '../../game/LevelData';
import EnemyInitializer from './EnemyInitializer';
import StateInterface from './StateInterface';

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

        // Dynamically load the level JSON based on _levelNumber
        const levels = [level1];
        this._levelData = levels[this._levelNumber - 1];

        // Accessing specific data
        if (this._levelData && this._levelData.player) {
            console.log(`Player's left hand item: ${this._levelData.player.left_hand.item}`);
        }

        // Initialize the ennemies
        if (this._levelData && this._levelData.enemies) {
            this._enemiesController = EnemyInitializer.initEnemies(this._levelData.enemies);
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

    public update(deltaTime: number): void {
        deltaTime;
    }
}

export default LevelState;
