import { Scene } from '@babylonjs/core';
import State from './EnumState';
import LevelTest1State from './states/LevelTest1State';
import LevelTest2State from './states/LevelTest2State';
import MenuState from './states/MenuState';
import StateInterface from './states/StateInterface';

/**
 * Manages the different states of the application, such as menu, game levels, etc.
 */
class StateManager {
    private _states: Map<State, StateInterface>;
    private _currentState: StateInterface | null = null;

    /**
     * Initializes the state manager with the given scene and initial state.
     * @param {Scene} scene - The Babylon.js scene for the level.
     * @param {State} initialState - The initial state of the application.
     */
    public constructor(scene: Scene, initialState: State) {
        this._states = new Map<State, StateInterface>([
            [State.Menu, new MenuState()],
            [State.LevelTest1, new LevelTest1State()],
            [State.LevelTest2, new LevelTest2State()],
        ]);
        this._currentState = this._states.get(initialState);
        this._currentState.init();
    }

    /**
     * Gets the current active state.
     * @returns {StateInterface | null} The currently active state.
     */
    public get currentState(): StateInterface | null {
        return this._currentState;
    }

    /**
     * Changes the current state to the given state.
     * @param {State} State - The state to change to.
     */
    public changeState(State: State): void {
        if (this._currentState) {
            this._currentState.dispose();
        }

        this._currentState = this._states.get(State);
        this._currentState.init();
    }
}

export default StateManager;
