import { Weapon } from './Weapon';

export class DiscModel implements Weapon {
    private _damage: number;
    private _speed: number;
    private _range: number;
    // other attributes

    constructor(damage: number, speed: number, range: number) {
        this._damage = damage;
        this._speed = speed;
        this._range = range;
        // Initialize other attributes
    }

    useWeapon(): void {
        // Logic for using the disc, like setting its trajectory
    }

    // Additional methods and properties specific to the Disc
}
