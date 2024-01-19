import { HemisphericLight, Mesh, MeshBuilder, Scene, Vector3 } from '@babylonjs/core';
import InteractionManager from '../../interactionManager';
import StateInterface from '../stateInterface';
import StateManager from '../stateManager';

/**
 * Represents the second level test state of the application.
 * It handles the initialization, disposal, and animation of the scene's level test elements.
 */
class LevelTest2State implements StateInterface {
    private _scene: Scene;
    private light1: HemisphericLight;
    private cubeMenu: Mesh;

    /**
     * Initializes the level test state with the given scene.
     * @param {Scene} scene - The Babylon.js scene where the level elements will be set up.
     * @returns {Promise<void>} A promise that resolves when initialization is complete.
     */
    public async init(scene: Scene): Promise<void> {
        this._scene = scene;
        this.light1 = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);

        this.cubeMenu = MeshBuilder.CreateBox('cubeMenu', { size: 1 }, scene);
        this.cubeMenu.position = new Vector3(0, -2, 0);
        InteractionManager.setupMeshInteraction(scene, this.cubeMenu, () => {
            StateManager.getInstance().changeState('Menu');
        });

        return Promise.resolve();
    }

    /**
     * Disposes of resources used by the level test state.
     */
    public dispose(): void {
        this.light1.dispose();
        this.cubeMenu.dispose();
    }

    /**
     * Animates the level test state elements. (Empty implementation if no animation is required)
     */
    public animate(): void {}
}

export default LevelTest2State;
