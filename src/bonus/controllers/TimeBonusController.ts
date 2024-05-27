import TimeBonusModel from '../models/TimeBonusModel';
import TimeBonusView from '../views/TimeBonusView';
import BaseBonusController from './BaseBonusController';

class TimeBonusController extends BaseBonusController {
    // MVC
    protected _model: TimeBonusModel;
    protected _view: TimeBonusView;

    /////////////////
    // Constructor //
    /////////////////
    public constructor(model: TimeBonusModel, view: TimeBonusView) {
        super(model, view);
    }

    ////////////
    // Action //
    ////////////

    public activate(): void {
        super.activate();
        // Todo: Implement the action of the time bonus
        console.log('Time bonus activated');
    }
}

export default TimeBonusController;
