import { AssetsManager, HemisphericLight, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';
import Game from '../../Game';
import LoadAssets from '../../LoadAssets';
import Buttons from '../../menu/buttons';
import State from '../EnumState';
import StateInterface from './StateInterface';

/**
 * Represents the second level test state of the application.
 * It handles the initialization, disposal, and animation of the scene's level test elements.
 */
class LevelTest2State implements StateInterface {
    private _scene: Scene;
    private _light1: HemisphericLight;
    private _cubeMenu: Mesh;
    private _assetManager: AssetsManager;
    private _material: StandardMaterial;
    private _mesh: Mesh;

    /**
     * Initializes the level test state with the given scene.
     * @param {Scene} scene - The Babylon.js scene where the level elements will be set up.
     * @returns {Promise<void>} A promise that resolves when initialization is complete.
     */
    public async init(): Promise<void> {
        this._assetManager = new AssetsManager(Game.instance.scene);

        LoadAssets.initLight(Game.instance.scene);
        LoadAssets.initModels(Game.instance.scene, this._assetManager);
        LoadAssets._dictLights.get('light1');
        LoadAssets._dictModels.get('Game.instance.scene');

        this._cubeMenu = MeshBuilder.CreateBox('cubeMenu', { size: 1 }, Game.instance.scene);
        this._cubeMenu.position = new Vector3(0, -2, 0);
        Buttons.clickable(Game.instance.scene, this._cubeMenu, () => {
            Game.instance.stateManager.changeState(State.Menu);
        });

        return Promise.resolve();
    }

    /**
     * Disposes of resources used by the level test state.
     */
    public dispose(): void {
        this._light1.dispose();
        this._cubeMenu.dispose();
    }

    private _isRightControllerVisible: boolean = true;
    private _secondaryButtonPressed: boolean = false;

    /**
     * Animates the level test state elements. (Empty implementation if no animation is required)
     */
    public animate(deltaTime: number): void {
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
    }
}

export default LevelTest2State;
