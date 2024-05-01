import WeaponModel from './WeaponModel';

class GunModel extends WeaponModel{
    private _force: number;

    constructor(force: number) {
        super();
        this._force = force;
    }

    public get force() {
        return this._force;
    }
    
    public set force(value: number) {
        this._force = value;
    }
}
export default GunModel;