import BaseBonusModel from './BaseBonusModel';

class TimeBonusModel extends BaseBonusModel {
    private _duration: number;

    /////////////////
    // Constructor //
    /////////////////

    constructor(duration: number) {
        super();
        this._duration = duration;
    }

    //////////////
    // Accessor //
    //////////////

    public get duration(): number {
        return this._duration;
    }
}

export default TimeBonusModel;
