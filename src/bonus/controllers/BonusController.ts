import BonusModel from '../models/BonusModel';
import BonusView from '../views/BonusView';

class BonusController {
    public model: BonusModel;
    public view: BonusView;

    constructor(model: BonusModel, view: BonusView) {
        this.model = model;
        this.view = view;
    }

    dispose(): void {
        this.view.dispose();
        console.log(this.model._value);
    }

    update(deltaTime: number): void {
        this.model.update(deltaTime);
        this.view.update();
    }
}

export default BonusController;