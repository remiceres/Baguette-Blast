import State from './EnumState';
import LevelState from './states/LevelState';
import MenuHomeState from './states/MenuState';
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
    public constructor(initialState: State) {
        this._states = new Map<State, StateInterface>([
            [State.MenuHome, new MenuHomeState()],
            [State.Level1, new LevelState(1)],
            [State.Level2, new LevelState(2)],
            [State.Level3, new LevelState(3)],
            [State.Level4, new LevelState(4)],
            [State.Level5, new LevelState(5)],
            [State.Level6, new LevelState(6)],
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
