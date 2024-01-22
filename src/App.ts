import { Engine, Scene } from '@babylonjs/core';
import '@babylonjs/inspector';
import CameraManager from './CameraManager';
import StateManager from './stateManager/StateManager';
import XRHandler from './XRHandler';

/**
 * The main application class for initializing and running the Babylon.js scene.
 * It sets up the canvas, engine, camera, state manager, and rendering loop.
 */
class App {
    private _engine: Engine;
    private _lastTime: number; // Tracks the time of the last frame

    /**
     * Constructs the App class and initializes the scene.
     */
    constructor() {
        const canvas = this._initCanvas();
        this._engine = new Engine(canvas, true);
        const scene = new Scene(this._engine);

        // this._initInspector(scene);
        this._initXR(scene);
        this._initializeCamera(scene);
        this._initializeStateManager(scene);

        this._lastTime = window.performance.now();
        window.addEventListener('resize', () => this._engine.resize());
        this._engine.runRenderLoop(() => this._renderLoop(scene, StateManager.getInstance()));

        document.addEventListener('visibilitychange', () => this._handleVisibilityChange());
    }

    /**
     * Handles browser visibility change events to maintain accurate timing.
     */
    private _handleVisibilityChange(): void {
        if (document.visibilityState === 'visible') {
            // Reset the last recorded time when the tab becomes visible
            this._lastTime = window.performance.now();
        }
    }

    /**
     * Renders the scene at each frame.
     * @param {Scene} scene - The Babylon.js scene.
     * @param {StateManager} stateManager - The state manager of the application.
     */
    private _renderLoop(scene: Scene, stateManager: StateManager): void {
        const currentTime = window.performance.now();
        const deltaTime = (currentTime - this._lastTime) / 1000.0;
        this._lastTime = currentTime;

        // Check if the tab is visible before updating
        if (document.visibilityState === 'visible') {
            stateManager.currentState.animate(deltaTime);
            scene.render();
        }
    }

    /**
     * Initializes the canvas element for the Babylon.js scene.
     * @returns {HTMLCanvasElement} The created canvas element.
     */
    private _initCanvas(): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.id = 'gameCanvas';
        document.body.appendChild(canvas);
        return canvas;
    }

    /**
     * Initializes the WebXR experience.
     * @param {Scene} scene - The Babylon.js scene.
     */
    private async _initXR(scene : Scene): Promise<void> {
        const xr = XRHandler.getInstance();
        await xr.initXRAsync(scene);
    }

    /**
     * Sets up key listener for the Babylon.js Inspector.
     * @param {Scene} scene - The Babylon.js scene.
     */
    private _initInspector(scene: Scene): void {
        window.addEventListener('keydown', (ev) => {
            if (ev.altKey && ev.key === 'i') {
                scene.debugLayer.isVisible() ? scene.debugLayer.hide() : scene.debugLayer.show();
            }
        });
    }

    /**
     * Initializes the camera and attaches it to the scene.
     * @param {Scene} scene - The Babylon.js scene.
     */
    private _initializeCamera(scene: Scene): void {
        const camera = CameraManager.getInstance();
        camera.setScene(scene);
        camera.createCamera();
    }

    /**
     * Initializes the state manager and sets the initial state.
     * @param {Scene} scene - The Babylon.js scene.
     */
    private _initializeStateManager(scene: Scene): void {
        const stateManager = StateManager.getInstance();
        stateManager.scene = scene;
        stateManager.changeState('Menu');
    }
}

new App();
