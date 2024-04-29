class BaseBonusModel {
    public _value: number;

    constructor(value = 100) {
        this._value = value;
    }

    update(deltaTime) {
        deltaTime;
    }
}

export default BaseBonusModel;