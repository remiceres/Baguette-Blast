import WeaponController from '../../weapon/controllers/WeaponController';

class PlayerModel {
    private _weaponLeft: WeaponController;
    private _weaponRight: WeaponController;
    private _health: number;

    set weaponLeft(weapon: WeaponController) {
        this._weaponLeft = weapon;
    }

    get weaponLeft(): WeaponController {
        return this._weaponLeft;
    }

    set weaponRight(weapon: WeaponController) {
        this._weaponRight = weapon;
    }

    get weaponRight(): WeaponController {
        return this._weaponRight;
    }

    set health(health: number) {
        this._health = health;
    }

    get health(): number {
        return this._health;
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        if (this._weaponLeft) {
            this._weaponLeft.dispose();
        }

        if (this._weaponRight) {
            this._weaponRight.dispose();
        }
    }
}

export default PlayerModel;
