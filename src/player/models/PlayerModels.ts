import WeaponInterface from '../../weapon/WeaponIInterface';

class PlayerModel {
    private _weaponLeft: WeaponInterface;
    private _weaponRight: WeaponInterface;
    private _health: number;

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

    set health(health: number) {
        this._health = health;
    }

    get health(): number {
        return this._health;
    }

    update(deltaTime: number): void {
        deltaTime;
    }
}

export default PlayerModel;
