import { ProjectileType, WeaponData, WeaponType } from '../game/models/LevelData';
import BoomerangView from '../projectile/views/BoomerangView';
import BoomerangLauncherController from './controllers/BoomerangLauncherController';
import GunController from './controllers/GunController';
import HandController from './controllers/HandController';
import WeaponController from './controllers/WeaponController';
import BoomerangLauncherModel from './models/BoomerangLauncherModel';
import GunModel from './models/GunModel';
import HandModel from './models/HandModel';
import BallGunView from './views/BallGunView';
import BoomerangLauncherView from './views/BoomerangLauncherView';
import HandView from './views/HandView';
import LaserGatlingView from './views/LaserGatlingView';
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
            case WeaponType.BoomerangLauncher:
                return WeaponFactory._createBoomerangLauncher(weaponData);
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

    private static _createBoomerangLauncher(weaponData: WeaponData) {
        // Extract data
        const projectileType = weaponData.projectile;
        const force = weaponData.force;
        const durability = weaponData.durability;
        const cooldownSecond = weaponData.cooldown;

        // Create model/view
        const model = new BoomerangLauncherModel(projectileType, force, durability, cooldownSecond);
        const view = new BoomerangLauncherView();

        return new BoomerangLauncherController(view, model);
    }

    private static _createLaserGun(weaponData: WeaponData) {
        // Extract data
        const projectileType = weaponData.projectile;
        const force = weaponData.force;
        const durability = weaponData.durability;
        const cooldownSecond = weaponData.cooldown;

        // Create model/view
        let view;
        let model;

        switch (weaponData.type) {
            case WeaponType.Gun:
                switch (weaponData.projectile) {
                    case ProjectileType.Ball:
                        view = new BallGunView();
                        break;
                    case ProjectileType.Laser:
                        view = new LaserGunView();
                        break;
                    case ProjectileType.Boomerang:
                        view = new BoomerangView();
                        break;
                    default:
                        throw new Error(`Unsupported projectile type: ${weaponData.projectile}`);
                }
                model = new GunModel(projectileType, force, durability, cooldownSecond);
                break;

            case WeaponType.GatlingGun:
                switch (weaponData.projectile) {
                    case ProjectileType.Ball:
                        view = new LaserGatlingView();
                        break;
                    case ProjectileType.Laser:
                        view = new LaserGatlingView();
                        break;
                    default:
                        throw new Error(`Unsupported projectile type: ${weaponData.projectile}`);
                }
                model = new GunModel(projectileType, force, durability, cooldownSecond);
                break;

            case WeaponType.Hand:
                switch (weaponData.projectile) {
                    case ProjectileType.Ball:
                        view = new HandView();
                        break;
                    case ProjectileType.Laser:
                        view = new HandView();
                        break;
                    default:
                        throw new Error(`Unsupported projectile type: ${weaponData.projectile}`);
                }

                model = new HandModel(projectileType, force, durability, cooldownSecond);
                break;
        }

        return new GunController(view, model);
    }
}

export { WeaponFactory };
