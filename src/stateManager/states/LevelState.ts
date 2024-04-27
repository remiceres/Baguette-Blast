import level1 from '../../../public/levels/level1.json';
import StateInterface from './StateInterface';

// Define interfaces for the JSON structure
interface Item {
    item: string;
    durability: number;
    power: number;
}

interface Player {
    left_hand: Item;
}

interface LevelData {
    player: Player;
}

class LevelState implements StateInterface {
    private _levelNumber: number;
    private _levelData?: LevelData;

    constructor(levelNumber: number) {
        if (levelNumber <= 0) {
            throw new Error('Please set a positive number as the level number.');
        }
        this._levelNumber = levelNumber;
    }

    public async init(): Promise<void> {
        console.log(`Initializing level ${this._levelNumber}...`);

        // Dynamically load the level JSON based on _levelNumber
        const levels = [level1]; // Ajouter d'autres niveaux si nécessaire
        this._levelData = levels[this._levelNumber - 1];

        // Log the loaded data
        console.log(`Level data loaded: ${JSON.stringify(this._levelData)}`);

        // Example of accessing specific data
        if (this._levelData && this._levelData.player) {
            console.log(`Player's left hand item: ${this._levelData.player.left_hand.item}`);
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
    }
}

export default LevelState;
