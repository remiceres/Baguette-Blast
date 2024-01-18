import { EnemyModel } from '../models/EnemyModel';
import { EnemyView } from '../views/EnemyView';

class EnemyController {
    private model: EnemyModel;
    private view: EnemyView;

    constructor(model: EnemyModel, view: EnemyView) {
        this.model = model;
        this.view = view;
    }

    public update(deltaTime: number): void {
        // Update model state
        this.model.update(deltaTime);

        // Update view to reflect model state
        this.view.update();
    }

    // Additional methods to respond to various game events, user inputs, etc.
}

export { EnemyController };
