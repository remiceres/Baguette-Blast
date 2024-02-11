import { Engine, Scene, WebXRDefaultExperience, WebXRSessionManager } from '@babylonjs/core';
import CameraManager from './CameraManager';
import DebugConsole from './debug/DebugConsole';
import InputManager from './inputs/InputManager';
import KeyboardInput from './inputs/KeyboardInput';
import QuestInput from './inputs/QuestInput';
import State from './stateManager/EnumState';
import StateManager from './stateManager/StateManager';

/**
 * The Game class is the central class of the application.
 * It encapsulates the main components such as the engine, scene, input management,
 * camera management, state management, and XR support.
 * It is responsible for initializing these components and managing the game loop.
 */
class Game {
    private static _instance: Game;

    // The Babylon.js engine used for rendering.
    private _engine: Engine;

    // The Babylon.js scene where all the objects are rendered.
    private _scene: Scene;

    // The XR experience for VR support.
    private _xr: WebXRDefaultExperience;

    // Indicates if VR is supported on the current device.
    private _supportedVR: boolean;

    // Manages the different states of the game, like menu, playing, etc.
    private _stateManager: StateManager;

    // Manages the camera and its settings.
    private _cameraManager: CameraManager;

    // Manages input from different sources like keyboard or VR controllers.
    private _inputManager: InputManager;

    // A console for displaying debug information.
    private _debugConsole: DebugConsole;

    /**
     * The constructor is private to ensure the Game class is a singleton.
     * It initializes the engine, scene, state manager, input systems, and other necessary components.
     * @param canvas The HTML canvas element to render the game on.
     */
    private constructor(canvas: HTMLCanvasElement) {
        this._engine = new Engine(canvas, true);
        window.addEventListener('resize', () => this._engine.resize());
        this._scene = new Scene(this._engine);

        this._initializeXR(this._scene).then(() => {
            this._cameraManager = new CameraManager(this._scene, this._supportedVR);
            this._inputManager = this._supportedVR
                ? new QuestInput(this._xr, this._scene)
                : new KeyboardInput(this._scene);
            this._stateManager = new StateManager(this._scene, State.Menu);
            this._debugConsole = new DebugConsole(this._scene);

            this._render();
        });
    }

    /**
     * Initializes the Game instance. It follows the singleton pattern.
     * @param canvas The HTML canvas element.
     * @returns The Game instance.
     */
    public static init(canvas: HTMLCanvasElement): Game {
        if (!Game._instance) {
            Game._instance = new Game(canvas);
        }
        return Game._instance;
    }

    /**
     * Provides access to the singleton instance of the Game.
     * @returns The Game instance.
     * @throws Error if the Game instance is not initialized.
     */
    public static get instance(): Game {
        if (!Game._instance) {
            throw new Error('Game instance not initialized. Call Game.init() first.');
        }
        return Game._instance;
    }

    /**
     * Initializes the XR experience for VR support.
     * @param scene The Babylon.js scene.
     * @returns A promise that resolves when the XR experience is initialized.
     */
    private async _initializeXR(scene: Scene): Promise<void> {
        this._supportedVR = await WebXRSessionManager.IsSessionSupportedAsync('immersive-vr');

        if (this._supportedVR) {
            this._xr = await scene.createDefaultXRExperienceAsync({});
        }
    }

    /**
     * Renders the scene and manages the game loop.
     */
    private _render(): void {
        let lastTime = window.performance.now();

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                lastTime = window.performance.now();
            }
        });

        this._engine.runRenderLoop(() => {
            const currentTime = window.performance.now();
            const deltaTime = (currentTime - lastTime) / 1000.0;
            lastTime = currentTime;

            if (document.visibilityState === 'visible') {
                this._stateManager.currentState.animate(deltaTime);
                this._debugConsole.update(this._engine.getFps().toFixed() + ' fps');
                this._cameraManager.update();
                this._scene.render();
            }
        });
    }

    // Getters for various components of the game for easy access.

    public get stateManager(): StateManager {
        return this._stateManager;
    }

    public get debugConsole(): DebugConsole {
        return this._debugConsole;
    }

    public get inputManager(): InputManager {
        return this._inputManager;
    }

    public get cameraManager(): CameraManager {
        return this._cameraManager;
    }
}

export default Game;
