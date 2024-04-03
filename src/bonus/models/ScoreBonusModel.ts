import Bonus from './BonusModel';

class ScoreBonus extends Bonus {
    constructor(value: number = 200) {
        super(value);
    }

    update(deltaTime: number): void {
        deltaTime;
    }
}

export default ScoreBonus;