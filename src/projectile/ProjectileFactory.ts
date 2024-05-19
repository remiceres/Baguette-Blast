import { Vector3 } from '@babylonjs/core';
import BallController from './controllers/BallController';
import LaserController from './controllers/LaserController';
import BallModel from './models/BallModels';
import LaserModel from './models/LaserModel';
import BallView from './views/BallView';
import LaserView from './views/LaserView';

enum ProjectileType {
    Ball = 'ball',
    Laser = 'laser',
}

interface ProjectileProperties {
    initialPosition: Vector3;
    initialSpeedVector: Vector3;
    initialOrientation: Vector3;
}

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

    public static createProjectile(type: ProjectileType, properties: ProjectileProperties): BallController {
        switch (type) {
            case ProjectileType.Ball:
                return ProjectileFactory._createBall(properties);
            case ProjectileType.Laser:
                return ProjectileFactory._createLaser(type, properties);
            default:
                throw new Error(`Projectile type ${type} is not supported`);
        }
    }

    //////////////
    // Privates //
    //////////////

    private static _createBall(properties: ProjectileProperties): BallController {
        return new BallController(
            new BallView(),
            new BallModel(properties.initialPosition, properties.initialOrientation, properties.initialSpeedVector)
        );
    }

    private static _createLaser(type: ProjectileType, properties: ProjectileProperties): LaserController {
        return new LaserController(
            new LaserView(),
            new LaserModel(properties.initialPosition, properties.initialOrientation, properties.initialSpeedVector)
        );
    }
}

export { ProjectileFactory, ProjectileType };
