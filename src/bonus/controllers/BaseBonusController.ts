import BaseBonusModel from '../models/BaseBonusModel';
import BaseBonusView from '../views/BaseBonusView';

class BaseBonusController {
    public model: BaseBonusModel;
    public view: BaseBonusView;

    constructor(model: BaseBonusModel, view: BaseBonusView) {
        this.model = model;
        this.view = view;
    }

    dispose(): void {
        this.view.dispose();
    }

    update(deltaTime: number): void {
        // Slowly rotate the bonus
        this.view.mesh.rotation.y += deltaTime;
    }
}

export default BaseBonusController;
