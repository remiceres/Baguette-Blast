import BaseBonusModel from './BaseBonusModel';

class ScoreBonus extends BaseBonusModel {
    constructor(value: number = 200) {
        super(value);
    }

    update(deltaTime: number): void {
        deltaTime;
    }
}

export default ScoreBonus;