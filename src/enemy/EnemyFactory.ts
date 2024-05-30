import { Vector3 } from '@babylonjs/core';
import BehaviourFactory from '../behaviors/BehaviourFactory';
import BonusFactory from '../bonus/BonusFactory';
import { EnemyData, EnemyType } from '../game/models/LevelData';
import BalloonController from './controllers/BalloonControllers';
import EnemyController from './controllers/EnemyController';
import PigeonController from './controllers/PigeonControllers';
import BalloonModel from './models/BalloonModel';
import PigeonModel from './models/PigeonModel';
import CopperBalloonView from './views/CopperBalloonView';
import GoldBalloonView from './views/GoldBalloonView';
import PigeonView from './views/PigeonView';
import SilverBalloonView from './views/SilverBalloonView';
import ShooterPigeonController from './controllers/PigeonShooterControllet';

class EnemyFactory {
    /////////////////
    // Constructor //
    /////////////////

    // Private constructor to prevent instantiation
    private constructor() {}

    /////////////
    // Publics //
    /////////////

    public static createEnemy(enemyData: EnemyData): EnemyController {
        switch (enemyData.type) {
            case EnemyType.Copper:
            case EnemyType.Silver:
            case EnemyType.Gold:
                return EnemyFactory._createBalloon(enemyData);
            case EnemyType.Pigeon:
                return EnemyFactory._createPigeon(enemyData);
            case EnemyType.PigeonShooter:
                return EnemyFactory._createPigeon(enemyData, true);
            default:
                throw new Error(`Unsupported enemy type: ${enemyData.type}`);
        }
    }

    //////////////
    // Privates //
    //////////////

    private static _createBalloon(enemyData: EnemyData): BalloonController {
        // Extract data
        const position = new Vector3(enemyData.position.x, enemyData.position.y, enemyData.position.z);
        const health = enemyData.health;
        const score = enemyData.score;

        const behaviours = [];
        for (const behaviourData of enemyData.behaviours) {
            const behaviour = BehaviourFactory.createBehaviour(behaviourData);
            behaviours.push(behaviour);
        }

        // Create model/view
        const model = new BalloonModel(position, health, score, behaviours);
        let view;

        switch (enemyData.type) {
            case EnemyType.Copper:
                view = new CopperBalloonView();
                break;
            case EnemyType.Silver:
                view = new SilverBalloonView();
                break;
            case EnemyType.Gold:
                view = new GoldBalloonView();
                break;
        }

        // Create controller
        const controller = new BalloonController(model, view);
        controller.bonus = BonusFactory.createBonus(enemyData.bonus);

        return controller;
    }

    private static _createPigeon(enemyData: EnemyData, shooter: boolean = false): PigeonController {
        // Extract data
        const position = new Vector3(enemyData.position.x, enemyData.position.y, enemyData.position.z);
        const health = enemyData.health;
        const score = enemyData.score;

        const behaviours = [];
        for (const behaviourData of enemyData.behaviours) {
            const behaviour = BehaviourFactory.createBehaviour(behaviourData);
            behaviours.push(behaviour);
        }

        // Create model/view
        const model = new PigeonModel(position, health, score, behaviours);
        const view = new PigeonView();
        const controller = shooter ? new ShooterPigeonController(model, view) : new PigeonController(model, view);

        return controller;
    }
}

export default EnemyFactory;
