import { EnemyModel } from '../models/EnemyModel';
import { EnemyView } from '../views/EnemyView';

/**
 * Controller class for managing the behavior and presentation of an enemy.
 * It links the enemy model and view, updating them appropriately.
 */
class EnemyController {
    private _model: EnemyModel;
    private _view: EnemyView;

    /**
     * Constructs an EnemyController with a specified model and view.
     * @param {EnemyModel} model - The model representing the enemy's data and logic.
     * @param {EnemyView} view - The view representing the enemy's visual representation.
     */
    constructor(model: EnemyModel, view: EnemyView) {
        this._model = model;
        this._view = view;
    }

    /**
     * Updates the enemy's state and refreshes its view.
     * @param {number} deltaTime - The time in seconds since the last update.
     */
    public animate(deltaTime: number): void {
        // Update model state based on game logic
        this._model.update(deltaTime);

        // Update view to reflect model state
        this._view.update();
    }

    /**
     * Disposes of the resources used by the controller, primarily the view.
     */
    public dispose(): void {
        this._view.dispose();
    }

    // Additional methods to respond to various game events, user inputs, etc. can be added here
}

export { EnemyController };
