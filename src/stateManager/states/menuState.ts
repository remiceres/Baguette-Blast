import { HemisphericLight, Mesh, MeshBuilder, Scene, Vector3 } from '@babylonjs/core';
import InteractionManager from '../../interactionManager';
import StateInterface from '../stateInterface';
import StateManager from '../stateManager';

/**
 * Represents the menu state of the application, handling the initialization,
 * animation, and disposal of the scene's menu elements.
 */
class MenuState implements StateInterface {
    private _scene: Scene;
    private light1: HemisphericLight;
    private sphere: Mesh;
    private cubelevel1: Mesh;
    private cubelevel2: Mesh;
    private elapsedTime = 0; // Class-level variable to track elapsed time

    /**
     * Initializes the menu state with the given scene.
     * @param {Scene} scene - The Babylon.js scene where the menu will be set up.
     * @returns {Promise<void>} A promise that resolves when initialization is complete.
     */
    public async init(scene: Scene): Promise<void> {
        this._scene = scene;
        this.light1 = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
        this.sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene);

        // Setup the interactive cubes
        this.setupInteractiveCubes(scene);

        return Promise.resolve();
    }

    /**
     * Sets up the interactive cubes in the scene.
     * @param {Scene} scene - The Babylon.js scene.
     */
    private setupInteractiveCubes(scene: Scene): void {
        this.cubelevel1 = MeshBuilder.CreateBox('cubelevel1', { size: 1 }, scene);
        this.cubelevel1.position = new Vector3(-2, 0, 0);
        InteractionManager.setupMeshInteraction(scene, this.cubelevel1, () => {
            StateManager.getInstance().changeState('LevelTest1');
        });

        this.cubelevel2 = MeshBuilder.CreateBox('cubelevel2', { size: 1 }, scene);
        this.cubelevel2.position = new Vector3(2, 0, 0);
        InteractionManager.setupMeshInteraction(scene, this.cubelevel2, () => {
            StateManager.getInstance().changeState('LevelTest2');
        });
    }

    /**
     * Disposes of resources used by the menu state.
     */
    public dispose(): void {
        this.light1.dispose();
        this.sphere.dispose();
        this.cubelevel1.dispose();
        this.cubelevel2.dispose();
    }

    /**
     * Animates the menu state elements based on the elapsed time.
     * @param {number} deltaTime - The time in seconds since the last frame.
     */
    public animate(deltaTime: number): void {
        this.elapsedTime += deltaTime;
        const scale = 0.5 + Math.abs(Math.sin(this.elapsedTime)) * 0.5;
        this.sphere.scaling = new Vector3(scale, scale, scale);
    }
}

export default MenuState;
