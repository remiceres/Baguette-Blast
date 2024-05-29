import { WeaponData, WeaponType } from '../game/models/LevelData';
import GunController from './controllers/GunController';
import HandController from './controllers/HandController';
import WeaponController from './controllers/WeaponController';
import GunModel from './models/GunModel';
import HandModel from './models/HandModel';
import BallGunView from './views/BallGunView';
import HandView from './views/HandView';
import LaserGunView from './views/LaserGunView';

class WeaponFactory {
    /////////////////
    // Constructor //
    /////////////////

    // Private constructor to prevent instantiation
    private constructor() {}

    /////////////
    // Publics //
    /////////////

    public static createWeapon(weaponData: WeaponData): WeaponController {
        switch (weaponData.type) {
            case WeaponType.Hand:
                return WeaponFactory._createHand(weaponData);
            case WeaponType.Gun:
            case WeaponType.GatlingGun:
                return WeaponFactory._createLaserGun(weaponData);
            default:
                throw new Error(`Unsupported weapon type: ${weaponData.type}`);
        }
    }

    //////////////
    // Privates //
    //////////////

    private static _createHand(weaponData: WeaponData) {
        // Extract data
        const projectileType = weaponData.projectile;
        const force = weaponData.force;
        const durability = weaponData.durability;
        const cooldownSecond = weaponData.cooldown;

        // Create model/view
        const model = new HandModel(projectileType, force, durability, cooldownSecond);
        const view = new HandView();

        return new HandController(view, model);
    }

    private static _createLaserGun(weaponData: WeaponData) {
        // Extract data
        const projectileType = weaponData.projectile;
        const force = weaponData.force;
        const durability = weaponData.durability;
        const cooldownSecond = weaponData.cooldown;

        console.log('cooldownSecond :', cooldownSecond);

        // Create model/view
        let view;
        let model;

        switch (weaponData.type) {
            case WeaponType.Gun:
                view = new BallGunView();
                model = new GunModel(projectileType, force, durability, cooldownSecond);
                break;
            case WeaponType.GatlingGun:
                view = new LaserGunView();
                model = new GunModel(projectileType, force, durability, cooldownSecond);
                break;
        }

        return new GunController(view, model);
    }
}

export { WeaponFactory };
