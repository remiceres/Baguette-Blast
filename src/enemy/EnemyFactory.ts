import { Vector3 } from '@babylonjs/core';
import BaseBonusController from '../bonus/controllers/BaseBonusController';
import ScoreBonus from '../bonus/models/ScoreBonusModel';
import ScoreBonusView from '../bonus/views/ScoreBonusView';
import TimeBonusView from '../bonus/views/TimeBonusView';
import { BonusData, EnemyData } from '../game/models/LevelData';
import BalloonController from './controllers/BalloonControllers';
import EnemyController from './controllers/EnemyController';
import PigeonController from './controllers/PigeonControllers';
import BalloonModel from './models/BalloonModel';
import BaseEnemyModel from './models/BaseEnemyModel';
import PigeonModel from './models/PigeonModel';
import BaseEnemyView from './views/BaseEnemyView';
import CopperBalloonView from './views/CopperBalloonView';
import GoldBalloonView from './views/GoldBalloonView';
import PigeonView from './views/PigeonView';
import SilverBalloonView from './views/SilverBalloonView';

enum BonusType {
    Speed = 'speed',
    Score = 'score',
    Time = 'time',
}

enum EnemyType {
    Copper = 'copper',
    Silver = 'silver',
    Gold = 'gold',
    Pigeon = 'pigeon',
}

class EnemyFactory {
    public static createEnemy(enemyData: EnemyData): EnemyController {
        const position = new Vector3(enemyData.position.x, enemyData.position.y, enemyData.position.z);
        // TODO: Change the score attribution?
        // const behaviours = [
        //     new MoveAtoB(1,
        //     new Vector3(0, 4, 5),
        //     new Vector3(34, 1, 5), 1),
        //     new AvoidColliders(3, 2)
        // ];
        const model = this._createModel(enemyData.type, position, enemyData.health, enemyData.score, enemyData);
        const view = this._createView(enemyData.type);

        let controller = undefined;

        if (enemyData.type === EnemyType.Pigeon) {
            controller = new PigeonController(model, view);
        } else {
            controller = new BalloonController(model, view);
        }

        // this._assignBehavior(model, enemyData.behavior);
        this._assignBonus(controller, enemyData.bonus);

        return controller;
    }

    private static _createModel(
        type: string,
        position: Vector3,
        health: number,
        score: number,
        enemyData
    ): BaseEnemyModel {
        switch (type) {
            case EnemyType.Copper:
                return new BalloonModel(position, health, score, enemyData);
            case EnemyType.Silver:
                return new BalloonModel(position, health, score, enemyData);
            case EnemyType.Gold:
                return new BalloonModel(position, health, score, enemyData);
            case EnemyType.Pigeon:
                return new PigeonModel(position, health, score);
            default:
                throw new Error(`Unsupported enemy type: ${type}`);
        }
    }

    private static _createView(type: string): BaseEnemyView {
        switch (type) {
            case EnemyType.Copper:
                return new CopperBalloonView();
            case EnemyType.Silver:
                return new SilverBalloonView();
            case EnemyType.Gold:
                return new GoldBalloonView();
            case EnemyType.Pigeon:
                return new PigeonView();
            default:
                throw new Error(`Unsupported enemy type: ${type}`);
        }
    }

    // Replace any with a base class for bonuses
    private static _assignBonus(controller: EnemyController, bonusData: BonusData) {
        switch (bonusData.type) {
            case BonusType.Score:
                controller.attachBonus = new BaseBonusController(new ScoreBonus(10), new ScoreBonusView());
                break;
            case BonusType.Time:
                controller.attachBonus = new BaseBonusController(new ScoreBonus(10), new TimeBonusView());
                break;
            default:
                console.log(`Unsupported behavior type: ${bonusData.type}`);
                // throw new Error(`Unsupported behavior type: ${bonusData.type}`);
                break;
        }
    }
}

export default EnemyFactory;
