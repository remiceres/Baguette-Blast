import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';
import Game from '../../game/Game';
import Buttons from '../../menu/buttons';
import State from '../EnumState';
import StateInterface from './StateInterface';

/**
 * Represents the menu state of the application, handling the initialization,
 * animation, and disposal of the scene's menu elements.
 */
class MenuState implements StateInterface {
    private _sphere: Mesh;
    private _cubelevel1: Mesh;
    private _cubelevel2: Mesh;
    private _cubelevel3: Mesh;
    private _elapsedTime = 0; // Class-level variable to track elapsed time

    /**
     * Initializes the menu state with the given scene.
     * @param {Scene} scene - The Babylon.js scene where the menu will be set up.
     * @returns {Promise<void>} A promise that resolves when initialization is complete.
     */
    public async init(): Promise<void> {
        this._sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, Game.instance.scene);

        // Setup the interactive cubes
        this._setupInteractiveCubes(Game.instance.scene);

        return Promise.resolve();
    }

    /**
     * Sets up the interactive cubes in the scene.
     * @param {Scene} scene - The Babylon.js scene.
     */
    private _setupInteractiveCubes(scene: Scene): void {
        this._cubelevel1 = MeshBuilder.CreateBox('cubelevel1', { size: 1 }, scene);
        this._cubelevel1.position = new Vector3(-2, 1, 0);
        const material = new StandardMaterial('cubeMaterial', scene);
        material.diffuseColor = new Color3(1, 0, 0);
        this._cubelevel1.material = material;
        Buttons.clickable(scene, this._cubelevel1, () => {
            Game.instance.stateManager.changeState(State.test1);
        });

        this._cubelevel2 = MeshBuilder.CreateBox('cubelevel2', { size: 1 }, scene);
        this._cubelevel2.position = new Vector3(2, 1, 0);
        const material2 = new StandardMaterial('cubeMaterial2', scene);
        material2.diffuseColor = new Color3(0, 1, 0);
        this._cubelevel2.material = material2;
        Buttons.clickable(scene, this._cubelevel2, () => {
            Game.instance.stateManager.changeState(State.test2);
        });

        this._cubelevel3 = MeshBuilder.CreateBox('cubelevel3', { size: 1 }, scene);
        this._cubelevel3.position = new Vector3(0, 1, 2);
        const material3 = new StandardMaterial('cubeMaterial3', scene);
        material3.diffuseColor = new Color3(0, 0, 1);
        this._cubelevel3.material = material3;
        Buttons.clickable(scene, this._cubelevel3, () => {
            Game.instance.stateManager.changeState(State.Level);
        });
    }

    /**
     * Disposes of resources used by the menu state.
     */
    public dispose(): void {
        this._sphere.dispose();
        this._cubelevel1.dispose();
        this._cubelevel2.dispose();
        this._cubelevel3.dispose();
    }

    /**
     * Animates the menu state elements based on the elapsed time.
     * @param {number} deltaTime - The time in seconds since the last frame.
     */
    public update(deltaTime: number): void {
        this._elapsedTime += deltaTime;
        const scale = 0.5 + Math.abs(Math.sin(this._elapsedTime)) * 0.5;
        this._sphere.scaling = new Vector3(scale, scale, scale);
    }
}

export default MenuState;
