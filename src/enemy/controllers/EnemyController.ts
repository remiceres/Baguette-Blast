import BonusController from '../../bonus/controllers/BonusController';
import EnemyModel from '../models/EnemyModel';
import { BaseView } from '../views/BaseView';

class EnemyController {
    private _model: EnemyModel; // This could be any model that extends EnemyModel, including CopperBalloonModel
    private _view: BaseView; // Corresponding view for the model
    private _bonusController: BonusController;

    constructor(model: EnemyModel, view: BaseView) {
        this._model = model;
        this._view = view;

        // Example of setting up event listeners
        this.setupEventListeners();
    }

    setupEventListeners(): void {
        // Listen for user inputs or other events
        // This is highly dependent on your game's framework and setup
        // For example: document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleKeyDown(event: KeyboardEvent): void {
        // Update model based on user input
        // Example: Move the balloon or change its state
        switch (event.key) {
            case 'ArrowUp':
                this._model.position.y += 1;
                break;
            // Handle other keys or commands
        }

        // Update the view to reflect the model's new state
        this._view.update(); // Assuming your view has an update method to redraw itself
    }

    dispose(): void {
        this.view.dispose(); // Assuming the view has a dispose method
        if (this._bonusController) {
            this._bonusController.dispose();
        }
    }

    update(deltaTime: number): void {
        this._model.update(deltaTime);
        this._view.update();
    }

    public get model(): EnemyModel {
        return this._model;
    }

    public get view(): BaseView {
        return this._view;
    }

    public set bonusController(controller: BonusController) {
        this._bonusController = controller;
        // set the bonus view for the enemy view
        this._view.bonusView = controller.view;
    }

    // Additional methods to handle other interactions
}

export default EnemyController;