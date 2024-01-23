import { HemisphericLight, Mesh, MeshBuilder, Scene, Vector3 } from '@babylonjs/core';
import InteractionManager from '../../InteractionManager';
import StateInterface from './IState';
import StateManager from '../StateManager';

/**
 * Represents the menu state of the application, handling the initialization,
 * animation, and disposal of the scene's menu elements.
 */
class MenuState implements StateInterface {
    private _scene: Scene;
    private _light1: HemisphericLight;
    private _sphere: Mesh;
    private _cubelevel1: Mesh;
    private _cubelevel2: Mesh;
    private _elapsedTime = 0; // Class-level variable to track elapsed time

    /**
     * Initializes the menu state with the given scene.
     * @param {Scene} scene - The Babylon.js scene where the menu will be set up.
     * @returns {Promise<void>} A promise that resolves when initialization is complete.
     */
    public async init(scene: Scene): Promise<void> {
        this._scene = scene;
        this._light1 = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
        this._sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene);

        // Setup the interactive cubes
        this._setupInteractiveCubes(scene);

        return Promise.resolve();
    }

    /**
     * Sets up the interactive cubes in the scene.
     * @param {Scene} scene - The Babylon.js scene.
     */
    private _setupInteractiveCubes(scene: Scene): void {
        this._cubelevel1 = MeshBuilder.CreateBox('cubelevel1', { size: 1 }, scene);
        this._cubelevel1.position = new Vector3(-2, 0, 0);
        InteractionManager.setupMeshInteraction(scene, this._cubelevel1, () => {
            StateManager.getInstance().changeState('LevelTest1');
        });

        this._cubelevel2 = MeshBuilder.CreateBox('cubelevel2', { size: 1 }, scene);
        this._cubelevel2.position = new Vector3(2, 0, 0);
        InteractionManager.setupMeshInteraction(scene, this._cubelevel2, () => {
            StateManager.getInstance().changeState('LevelTest2');
        });
    }

    /**
     * Disposes of resources used by the menu state.
     */
    public dispose(): void {
        this._light1.dispose();
        this._sphere.dispose();
        this._cubelevel1.dispose();
        this._cubelevel2.dispose();
    }

    /**
     * Animates the menu state elements based on the elapsed time.
     * @param {number} deltaTime - The time in seconds since the last frame.
     */
    public animate(deltaTime: number): void {
        this._elapsedTime += deltaTime;
        const scale = 0.5 + Math.abs(Math.sin(this._elapsedTime)) * 0.5;
        this._sphere.scaling = new Vector3(scale, scale, scale);
    }
}

export default MenuState;
