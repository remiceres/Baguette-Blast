import BonusController from '../../bonus/controllers/BonusController';
import BallProjectile from '../../projectile/BallProjectile';
import BaseEnemyModel from '../models/BaseEnemyModel';
import BaseEnemyView from '../views/BaseEnemyView';

class EnemyController implements ICollider{
    private _model: BaseEnemyModel; 
    private _view: BaseEnemyView; 
    private _bonusController: BonusController;

    constructor(model: BaseEnemyModel, view: BaseEnemyView) {
        this._model = model;
        this._view = view;

        // Example of setting up event listeners
        this.setupEventListeners();
    }
    collidesWith(other: ICollider): boolean {
        if (other instanceof BallProjectile) {
            console.log('collidesWith');
            return true;
        }
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onCollision(other: ICollider): void {
        return;
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

    public get model(): BaseEnemyModel {
        return this._model;
    }

    public get view(): BaseEnemyView {
        return this._view;
    }

    public get score(): number {
        return this._model.score;
    }

    public set score(value: number) {
        this._model.score = value;
    }

    public set bonusController(controller: BonusController) {
        this._bonusController = controller;
        // set the bonus view for the enemy view
        this._view.bonusView = controller.view;
    }

    // Additional methods to handle other interactions
}

export default EnemyController;