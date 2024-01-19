import { Scene } from '@babylonjs/core';
import StateInterface from './StateInterface';
import LevelTest1State from './states/LevelTest1State';
import LevelTest2State from './states/LevelTest2State';
import MenuState from './states/MenuState';

/**
 * Manages the different states of the application, such as menu, game levels, etc.
 * Implements the Singleton pattern to ensure only one instance manages the application states.
 */
class StateManager {
    private static _instance: StateManager = new StateManager();

    private _scene: Scene;
    private _states: { [key: string]: StateInterface } = {
        Menu: new MenuState(),
        LevelTest1: new LevelTest1State(),
        LevelTest2: new LevelTest2State(),
    };
    private _currentState: StateInterface | null = null;

    /**
     * Private constructor for singleton pattern.
     */
    private constructor() {}

    /**
     * Retrieves the singleton instance of the StateManager.
     * @returns {StateManager} The singleton instance.
     */
    public static getInstance(): StateManager {
        return StateManager._instance;
    }

    /**
     * Sets the scene for state management.
     * @param {Scene} scene - The Babylon.js scene.
     */
    public set scene(scene: Scene) {
        this._scene = scene;
    }

    /**
     * Gets the current active state.
     * @returns {StateInterface | null} The currently active state.
     */
    public get currentState(): StateInterface | null {
        return this._currentState;
    }

    /**
     * Changes the current state of the application.
     * @param {string} name - The name of the state to switch to.
     * @throws Will throw an error if the state does not exist.
     */
    public changeState(name: string): void {
        if (!this._states[name]) {
            throw new Error(`State ${name} does not exist`);
        }

        if (this._currentState) {
            this._currentState.dispose();
        }

        this._currentState = this._states[name];
        this._currentState.init(this._scene);
    }
}

export default StateManager;
