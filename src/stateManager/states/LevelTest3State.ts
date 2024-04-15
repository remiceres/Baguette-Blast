import StateInterface from './StateInterface';

class LevelState implements StateInterface {
    private _levelNumber: number;
    private _levelData: unknown;

    constructor() {
        this._levelNumber = 0;
        this._levelData = null;
    }

    public async init(): Promise<void> {
        if (this._levelNumber <= 0) {
            throw new Error(
                'Level number not set or invalid. Please set a valid level number before initializing the state.'
            );
        }

        console.log(`Initializing level ${this._levelNumber}...`);

        try {
            // Load level data
            this._levelData = await this._loadLevelData(this._levelNumber);
        } catch (error) {
            // Handle potential errors in loading data (e.g., network issues, file not found)
            console.error('Failed to load level data:', error);
            throw new Error(`Failed to initialize level ${this._levelNumber}: ${error.message}`);
        }
    }

    public set levelNumber(levelNumber: number) {
        if (levelNumber <= 0) {
            throw new Error('Please set a positive number as the level number.');
        }
        this._levelNumber = levelNumber;
    }

    private async _loadLevelData(levelNumber: number): Promise<unknown> {
        // Changed return type to 'any'
        console.log(`Loading level data for level ${levelNumber}...`);

        try {
            const response = await fetch(`./levels/level${levelNumber}.json`);
            if (!response.ok) {
                // Ensure that the fetch was successful
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error loading level data:', error);
            throw error; // Re-throw the error to be handled by the caller
        }
    }

    public dispose(): void {}

    public animate(deltaTime: number): void {
        deltaTime;
    }
}

export default LevelState;
