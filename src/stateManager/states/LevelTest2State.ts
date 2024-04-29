/* eslint-disable linebreak-style */
import { Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import { Inspector } from '@babylonjs/inspector';
import Game from '../../game/Game';
import Buttons from '../../menu/buttons';
import State from '../EnumState';
import StateInterface from './StateInterface';
import MusicManager from '../../game/controllers/MusicManager';

/**
 * Represents the second level test state of the application.
 * It handles the initialization, disposal, and animation of the scene's level test elements.
 */
class LevelTest2State implements StateInterface {
    private _cubeMenu: Mesh;
    musicManager: MusicManager;

    /**
     * Initializes the level test state with the given scene.
     * @param {Scene} scene - The Babylon.js scene where the level elements will be set up.
     * @returns {Promise<void>} A promise that resolves when initialization is complete.
     */
    public async init(): Promise<void> {
        this.musicManager = new MusicManager();
        await this.initMusic();
        Inspector.Show(Game.instance.scene, {});

        this._initInterface();

        return Promise.resolve();
    }

    private _initInterface(): void {
        this._cubeMenu = MeshBuilder.CreateBox('cubeMenu', { size: 1 }, Game.instance.scene);
        this._cubeMenu.position = new Vector3(0, 1, 0);
        Buttons.clickable(Game.instance.scene, this._cubeMenu, () => {
            Game.instance.stateManager.changeState(State.MenuHome);
        });
    }

    async initMusic() {
        await this.musicManager.loadTrack('/musics/theme.mp3');
        this.musicManager.play();
    }

    /**
     * Disposes of resources used by the level test state.
     */
    public dispose(): void {
        this._cubeMenu.dispose();
        Inspector.Hide();
    }

    private _isRightControllerVisible: boolean = true;
    private _secondaryButtonPressed: boolean = false;

    /**
     * Animates the level test state elements. (Empty implementation if no animation is required)
     */
    public update(deltaTime: number): void {
        // Empty implementation if no animation is required
        deltaTime;

        // Vibrate if push right primary
        if (Game.instance.inputManager.rightPrimary.pressed) {
            Game.instance.inputManager.vibrateController('both', 0.5, 100, 5);
        }

        // Toogle right controller visibility if push right secondary
        if (Game.instance.inputManager.rightSecondary.pressed && !this._secondaryButtonPressed) {
            this._isRightControllerVisible = !this._isRightControllerVisible;
            Game.instance.inputManager.setControllerVisibility(this._isRightControllerVisible, 'right');

            this._secondaryButtonPressed = true;
        }

        if (!Game.instance.inputManager.rightSecondary.pressed) {
            this._secondaryButtonPressed = false;
        }

        // Update music manager
        this.musicManager.update();
    }
}

export default LevelTest2State;
