import { ProjectileType } from '../projectile/ProjectileFactory';
import GunController from './controllers/GunController';
import HandController from './controllers/HandController';
import WeaponController from './controllers/WeaponController';
import GunModel from './models/GunModel';
import HandModel from './models/HandModel';
import BallGatlingView from './views/BallGatlingView';
import BallGunView from './views/BallGunView';
import HandView from './views/HandView';
import LaserGatlingView from './views/LaserGatlingView';
import LaserGunView from './views/LaserGunView';

enum weaponType {
    hand,
    ballGun,
    laserGun,
    ballGatlingGun,
    laserGatlingGun,
}

interface WeaponProperties {
    durability: number;
}

class WeaponFactory {
    /////////////////
    // Constructor //
    /////////////////

    private constructor() {
        //  Private constructor to prevent instantiation
    }

    /////////////
    // Publics //
    /////////////

    public static createWeapon(type: weaponType, properties: WeaponProperties): WeaponController {
        switch (type) {
            case weaponType.hand:
                return WeaponFactory._createHand(properties.durability);
            case weaponType.ballGun:
                return WeaponFactory._createBallGun(properties.durability);
            case weaponType.laserGun:
                return WeaponFactory._createLaserGun(properties.durability);
            case weaponType.ballGatlingGun:
                return WeaponFactory._createBallGatlingGun(properties.durability);
            case weaponType.laserGatlingGun:
                return WeaponFactory._createLaserGatlingGun(properties.durability);
            default:
                throw new Error(`Weapon type ${type} is not supported`);
        }
    }

    //////////////
    // Privates //
    //////////////

    private static _createHand(durability: number) {
        return new HandController(new HandView(), new HandModel(ProjectileType.Ball, 10, durability, 1));
    }

    private static _createBallGun(durability: number) {
        return new GunController(new BallGunView(), new GunModel(ProjectileType.Ball, 60, durability, 1));
    }

    private static _createLaserGun(durability: number) {
        return new GunController(new LaserGunView(), new GunModel(ProjectileType.Laser, 60, durability, 1));
    }

    private static _createLaserGatlingGun(durability: number) {
        return new GunController(new LaserGatlingView(), new GunModel(ProjectileType.Ball, 60, durability, 0.1));
    }

    private static _createBallGatlingGun(durability: number) {
        return new GunController(new BallGatlingView(), new GunModel(ProjectileType.Laser, 60, durability, 0.1));
    }
}

export { WeaponFactory, weaponType };
