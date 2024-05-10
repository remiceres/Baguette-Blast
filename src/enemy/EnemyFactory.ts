import { Vector3 } from '@babylonjs/core';
import BaseBonusController from '../bonus/controllers/BaseBonusController';
import ScoreBonus from '../bonus/models/ScoreBonusModel';
import ScoreBonusView from '../bonus/views/ScoreBonusView';
import TimeBonusView from '../bonus/views/TimeBonusView';
import { BonusData, EnemyData } from '../game/models/LevelData';
import EnemyController from './controllers/EnemyController';
import BalloonModel from './models/BalloonModel';
import CopperBalloonModel from './models/CopperBalloonModel';
import GoldBalloonModel from './models/GoldBalloonModel';
import PigeonModel from './models/PigeonModel';
import SilverBalloonModel from './models/SilverBalloonModel';
import BalloonView from './views/BalloonView';
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
        const view = this._createView(enemyData.type, model);
        const controller = new EnemyController(model, view);

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
    ): BalloonModel {
        switch (type) {
            case EnemyType.Copper:
                return new CopperBalloonModel(position, health, score, enemyData);
            case EnemyType.Silver:
                return new SilverBalloonModel(position, health, score, enemyData);
            case EnemyType.Gold:
                return new GoldBalloonModel(position, health, score, enemyData);
            case EnemyType.Pigeon:
                return new PigeonModel(position, health, score);
            default:
                throw new Error(`Unsupported enemy type: ${type}`);
        }
    }

    private static _createView(type: string, model: BalloonModel): BalloonView {
        switch (type) {
            case EnemyType.Copper:
                return new CopperBalloonView(model);
            case EnemyType.Silver:
                return new SilverBalloonView(model);
            case EnemyType.Gold:
                return new GoldBalloonView(model);
            case EnemyType.Pigeon:
                return new PigeonView(model);
            default:
                throw new Error(`Unsupported enemy type: ${type}`);
        }
    }

    // Replace any with a base class for bonuses
    private static _assignBonus(controller: EnemyController, bonusData: BonusData) {
        switch (bonusData.type) {
            case BonusType.Score:
                controller.bonusController = new BaseBonusController(new ScoreBonus(), new ScoreBonusView());
                break;
            case BonusType.Time:
                controller.bonusController = new BaseBonusController(new ScoreBonus(), new TimeBonusView());
                break;
            default:
                throw new Error(`Unsupported behavior type: ${bonusData.type}`);
                break;
        }
    }
}

export default EnemyFactory;
