import { Color3, Mesh, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import EnemyFactory from '../../enemy/EnemyFactory';
import EnemyController from '../../enemy/controllers/EnemyController';
import Game from '../../game/Game';
import { LevelData } from '../../game/models/LevelData';
import Buttons from '../../menu/buttons';
import { WeaponFactory } from '../../weapon/WeaponFactory';
import State from '../EnumState';
import StateInterface from './StateInterface';
import { SoundPlayer } from '../../game/controllers/SoundPlayer';

class LevelState implements StateInterface {
    // Level data
    private _levelNumber: number;
    private _levelData: LevelData;

    // Interface
    private _cubeMenu: Mesh;

    // Enemies
    public static _enemiesController: EnemyController[] = [];

    // Wave
    private _currentWaveIndex: number = 0;

    // Score
    private _score: number;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(levelNumber: number) {
        this._construct(levelNumber);
    }

    private async _construct(levelNumber: number): Promise<void> {
        try {
            this._setLevelNumber(levelNumber);
            this._levelData = await this._fetchLevelData(levelNumber);
        } catch (error) {
            console.error('Cannot load level data:', error);
        }
    }

    private _setLevelNumber(levelNumber: number): void {
        if (levelNumber <= 0) {
            throw new Error('Please set a positive number as the level number.');
        }
        this._levelNumber = levelNumber;
    }

    private async _fetchLevelData(levelNumber: number): Promise<LevelData> {
        const url = `../../levels/level${levelNumber}.json`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch level ${levelNumber}: ${response.status}`);
            }
            const data = await response.json();
            return data as LevelData;
        } catch (error) {
            console.error('Error loading level data:', error);
            throw error;
        }
    }

    ////////////////////
    // Initialisation //
    ////////////////////

    // Override
    public async init(): Promise<void> {
        try {
            this._score = 0;
            this._initAudio();
            this._initInterface();
            this._initPlayer();
            this._advanceToNextWave();
        } catch (error) {
            console.error('Error during game initialization:', error);
        }
    }

    private _initInterface(): void {
        // Create button
        this._cubeMenu = this._createButtonMesh();

        // Set position
        this._cubeMenu.position = new Vector3(
            this._levelData.player.position.x,
            0.1,
            this._levelData.player.position.z - 5
        );

        // Attach click event
        Buttons.clickable(Game.instance.scene, this._cubeMenu, () => {
            Game.instance.stateManager.changeState(State.SelectLevel);
        });
    }

    private _createButtonMesh(): Mesh {
        // Create mesh
        const base = MeshBuilder.CreateBox('button', { width: 1, height: 0.1, depth: 1 }, Game.instance.scene);
        const button = MeshBuilder.CreateCylinder('button', { height: 0.1, diameter: 0.8 }, Game.instance.scene);
        button.position.y = 0.1;
        button.parent = base;

        // Create material
        const baseMaterial = new StandardMaterial('baseMaterial', Game.instance.scene);
        baseMaterial.diffuseColor = new Color3(0.2, 0.2, 0.2);
        base.material = baseMaterial;

        const buttonMaterial = new StandardMaterial('buttonMaterial', Game.instance.scene);
        buttonMaterial.diffuseColor = new Color3(0.8, 0, 0);
        button.material = buttonMaterial;

        return base;
    }

    private _initPlayer(): void {
        // Reset the player
        Game.instance.player.reset();
        Game.instance.player.health = this._levelData.player.health;

        // Teleport player to the starting position
        Game.instance.player.teleport(
            new Vector3(
                this._levelData?.player?.position.x,
                this._levelData?.player?.position.y,
                this._levelData?.player?.position.z
            )
        );

        // Add weapon left hand
        const weaponDataLeft = this._levelData.player.left_hand;
        if (weaponDataLeft) {
            const weaponController = WeaponFactory.createWeapon(weaponDataLeft);
            Game.instance.player.giveWeapon('left', weaponController);
        }

        // Add weapon right hand
        const weaponDataRight = this._levelData.player.right_hand;
        if (weaponDataRight) {
            const weaponController = WeaponFactory.createWeapon(weaponDataRight);
            Game.instance.player.giveWeapon('right', weaponController);
        }
    }

    private _initAudio(): void {
        const levelMusic = new SoundPlayer('music_levels_' + this._levelNumber, Game.instance.scene, null, true);
        levelMusic.play(true);
    }

    //////////
    // Wave //
    //////////

    private _advanceToNextWave(): void {
        if (this._currentWaveIndex < this._levelData.waves.length) {
            this._loadNextWave();
            this._currentWaveIndex++;
        } else {
            this._win();
        }
    }

    private _loadNextWave(): void {
        console.log('Loading wave', this._currentWaveIndex);
        // Reset enemies
        LevelState._enemiesController.forEach((enemy) => enemy.dispose());
        LevelState._enemiesController = [];

        // Reset score
        Game.score = this._score;

        // Create enemies
        const waveData = this._levelData.waves[this._currentWaveIndex];
        waveData.enemies.forEach((enemyData) => {
            const enemyController = EnemyFactory.createEnemy(enemyData);
            LevelState._enemiesController.push(enemyController);
        });
    }

    //////////////
    // Win/Lose //
    //////////////

    private _win(): void {
        console.log('You win!');
        Game.instance.stateManager.changeState(State.SelectLevel);
    }

    private _lose(): void {
        console.log('You lose!');
        Game.instance.stateManager.changeState(State.SelectLevel);
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        // Clear disposed enemies
        LevelState._enemiesController = LevelState._enemiesController.filter((enemy) => !enemy.canBeDisposed);

        // Advance to next wave if all enemies are dead
        if (LevelState._enemiesController.length === 0) {
            this._advanceToNextWave();
        }

        // Check if the game is over
        if (Game.instance.player.health <= 0) {
            this._lose();
        }

        // Update enemies
        LevelState._enemiesController.forEach((enemyController) => {
            enemyController.update(deltaTime);
        });

        // Update player
        Game.instance.player.update(deltaTime);

        // Update collision
        Game.instance.collisionManager.update();
    }

    /////////////
    // Dispose //
    /////////////

    // Override
    public dispose(): void {
        // Reset wave index
        this._currentWaveIndex = 0;

        // Dispose all enemies
        LevelState._enemiesController.forEach((enemy) => enemy.dispose());

        // Dispose interface
        this._cubeMenu.dispose();
    }
}

export default LevelState;
