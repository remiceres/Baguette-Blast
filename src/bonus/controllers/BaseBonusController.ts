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
        console.log(this.model._value);
    }

    update(deltaTime: number): void {
        this.model.update(deltaTime);
        this.view.update();
    }
}

export default BaseBonusController;