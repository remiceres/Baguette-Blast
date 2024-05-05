import BaseBonusModel from './BaseBonusModel';

class TimeBonusModel extends BaseBonusModel {
    constructor(value: number = 20) {
        super(value);
    }

    update(deltaTime: number): void {
        deltaTime;
    }
}

export default TimeBonusModel;