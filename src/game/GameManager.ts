// GameManager.ts
import Game from '../Game';
import EnemyController from '../enemy/controllers/EnemyController';
import State from '../stateManager/EnumState';

class GameManager {
    private static _instance: GameManager;
    private _chrono: number = 0;
    private _gameDuration: number;
    private _isGameOver: boolean = false;

    private constructor(gameDuration: number) {
        this._gameDuration = gameDuration;
    }

    public static getInstance(gameDuration?: number): GameManager {
        if (!GameManager._instance && gameDuration === undefined) {
            throw new Error('GameManager instance is not initialized and no game duration provided.');
        }
        if (!GameManager._instance) {
            GameManager._instance = new GameManager(gameDuration);
        } else if (gameDuration !== undefined) {
            GameManager._instance.setGameDuration(gameDuration);
        }
        return GameManager._instance;
    }

    public setGameDuration(gameDuration: number): void {
        this._gameDuration = gameDuration;
        this.resetChrono();  // Optionally reset chrono when game duration is set
    }

    public resetChrono(): void {
        this._chrono = 0;
        this._isGameOver = false;
    }

    public update(deltaTime: number): void {
        if (this._isGameOver) return;

        this._chrono += deltaTime;
        console.log(`Chrono: ${this._chrono}`);
        if (this._chrono >= this._gameDuration) {
            this._endGame();
        }
    }

    public checkGameOver(enemies: EnemyController[]): void {
        if (this._isGameOver) return;

        if (enemies.length === 0) {
            this._endGame();
        }
    }

    private _endGame(): void {
        console.log('Game over');
        this._isGameOver = true;
        Game.instance.stateManager.changeState(State.MenuHome);
    }
}


export default GameManager;
