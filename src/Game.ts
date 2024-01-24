import { Engine, Scene, WebXRDefaultExperience, WebXRSessionManager } from '@babylonjs/core';
import CameraManager from './CameraManager';
import State from './stateManager/EnumState';
import StateManager from './stateManager/StateManager';

class Game {
    private static _instance: Game;

    private _engine: Engine;
    private _scene: Scene;

    private _supportedVR: boolean;

    private _stateManager: StateManager;

    // @todo I will refactor camera management later
    private _cameraManager: CameraManager;

    // @todo I will add controllerManager later

    // @todo I will add debugManager later
    
    /////////////////
    // Constructor //
    /////////////////

    private constructor(canvas: HTMLCanvasElement) {
        this._engine = this._initializeEngine(canvas);
        this._scene = new Scene(this._engine);
        this._stateManager = new StateManager(this._scene, State.Menu);

        this._initializeXR(this._scene);

        this._cameraManager = this._initializeCamera(this._scene);

        this._render(this._scene, this._stateManager);
    }

    public static init(canvas: HTMLCanvasElement): Game {
        if (!Game._instance) {
            Game._instance = new Game(canvas);
        }
        return Game._instance;
    }

    public static get instance(): Game {
        if (!Game._instance) {
            throw new Error('Game instance not initialized. Call Game.init() first.');
        }

        return Game._instance;
    }

    ////////////////
    // Initialize //
    ////////////////

    private _initializeEngine(canvas: HTMLCanvasElement): Engine {
        const engine = new Engine(canvas, true);
        window.addEventListener('resize', () => engine.resize());
        return engine;
    }

    private async _initializeXR(scene: Scene): Promise<WebXRDefaultExperience> | null {
        this._supportedVR = await WebXRSessionManager.IsSessionSupportedAsync('immersive-vr');

        if (!this._supportedVR) {
            return null;
        }

        return await scene.createDefaultXRExperienceAsync({});
    }

    private _initializeCamera(scene: Scene): CameraManager {
        const cameraManager = CameraManager.getInstance();
        cameraManager.setScene(scene);
        cameraManager.createCamera();
        return cameraManager;
    }

    /////////////
    // Getters //
    /////////////

    public get stateManager(): StateManager {
        return this._stateManager;
    }

    ////////////
    // Render //
    ////////////

    private _render(scene: Scene, stateManager: StateManager): void {
        let curentTime = window.performance.now();
        let lastTime = curentTime;
        let deltaTime = (curentTime - lastTime) / 1000.0;

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                lastTime = window.performance.now();
            }
        });

        this._engine.runRenderLoop(() => {
            curentTime = window.performance.now();
            deltaTime = (curentTime - lastTime) / 1000.0;
            lastTime = curentTime;

            if (document.visibilityState === 'visible') {
                stateManager.currentState.animate(deltaTime);
                scene.render();
            }
        });
    }
}

export default Game;
