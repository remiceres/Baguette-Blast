
import WeaponInterface from '../../weapon/WeaponIInterface';

class PlayerModel {
    private _weaponLeft: WeaponInterface;
    private _weaponRight: WeaponInterface;

    constructor() {
    }

    set weaponLeft(weapon: WeaponInterface) {
        this._weaponLeft = weapon;
    }

    get weaponLeft(): WeaponInterface {
        return this._weaponLeft;
    }

    set weaponRight(weapon: WeaponInterface) {
        this._weaponRight = weapon;
    }

    get weaponRight(): WeaponInterface {
        return this._weaponRight;
    }

    update(deltaTime: number): void {
        deltaTime;
    }
}

export default PlayerModel;