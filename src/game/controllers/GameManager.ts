import Game from '../Game';
import EnemyController from '../../enemy/controllers/EnemyController';
import State from '../../stateManager/EnumState';

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
        this.resetChrono();
    }

    public resetChrono(): void {
        this._chrono = 0;
        this._isGameOver = false;
    }

    public update(deltaTime: number, playerHealth: number, enemies: EnemyController[]): void {
        if (this._isGameOver) return;
        
        this._chrono += deltaTime;
        if (this._chrono >= this._gameDuration || playerHealth <= 0 ) {
            this._endGame('loose');
        } else if (enemies.length === 0) {
            this._endGame('win');
        }
    }

    private _endGame(condition): void {
        if (condition === 'win') {
            console.log('You win!');
        } else {
            console.log('You lose!');
        }
        Game.instance.stateManager.changeState(State.SelectLevel);
        this._isGameOver = true;
    }
}
export default GameManager;