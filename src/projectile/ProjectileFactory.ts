import { Vector3 } from '@babylonjs/core';
import { ProjectileType } from '../game/models/LevelData';
import BallController from './controllers/BallController';
import LaserController from './controllers/LaserController';
import BallModel from './models/BallModels';
import LaserModel from './models/LaserModel';
import BallView from './views/BallView';
import LaserView from './views/LaserView';
import EggView from './views/EggView';
import EggController from './controllers/EggController';
import EggModel from './models/EggModel';
import BoomerangController from './controllers/BoomerangController';
import BoomerangView from './views/BoomerangView';
import BoomerangModel from './models/BoomerangModel';

class ProjectileFactory {
    /////////////////
    // Constructor //
    /////////////////

    private constructor() {
        // Private constructor to prevent instantiation
    }

    /////////////
    // Publics //
    /////////////

    public static createProjectile(
        type: ProjectileType,
        initialPosition: Vector3,
        initialSpeedVector: Vector3,
        initialOrientation: Vector3
    ): BallController | LaserController {
        switch (type) {
            case ProjectileType.Ball:
                return ProjectileFactory._createBall(initialPosition, initialSpeedVector, initialOrientation);
            case ProjectileType.Laser:
                return ProjectileFactory._createLaser(initialPosition, initialSpeedVector, initialOrientation);
            case ProjectileType.Egg:
                return ProjectileFactory._createEgg(initialPosition, initialSpeedVector, initialOrientation);
            case ProjectileType.Boomerang:
                return ProjectileFactory._createBoomerang(initialPosition, initialSpeedVector, initialOrientation);
            default:
                throw new Error(`Projectile type ${type} is not supported`);
        }
    }

    //////////////
    // Privates //
    //////////////

    private static _createBall(
        initialPosition: Vector3,
        initialSpeedVector: Vector3,
        initialOrientation: Vector3
    ): BallController {
        return new BallController(
            new BallView(),
            new BallModel(initialPosition, initialOrientation, initialSpeedVector)
        );
    }

    private static _createLaser(
        initialPosition: Vector3,
        initialSpeedVector: Vector3,
        initialOrientation: Vector3
    ): LaserController {
        return new LaserController(
            new LaserView(),
            new LaserModel(initialPosition, initialOrientation, initialSpeedVector)
        );
    }

    private static _createEgg(
        initialPosition: Vector3,
        initialSpeedVector: Vector3,
        initialOrientation: Vector3
    ): EggController {
        return new EggController(
            new EggView(),
            new EggModel(initialPosition, initialOrientation, initialSpeedVector)
        );
    }

    private static _createBoomerang(
        initialPosition: Vector3,
        initialSpeedVector: Vector3,
        initialOrientation: Vector3
    ): BoomerangController {
        return new BoomerangController(
            new BoomerangView(),
            new BoomerangModel(initialPosition, initialOrientation, initialSpeedVector)
        );
    }
    
}

export { ProjectileFactory, ProjectileType };
