import { Vector3 } from '@babylonjs/core';
import { BehaviorData, EnemyData } from '../game/models/LevelData';
import EnemyController from './controllers/EnemyController';
import BalloonView from './views/BalloonView';
import Game from '../game/Game';
import BalloonModel from './models/BalloonModel';
import CopperBalloonModel from './models/CopperBalloonModel';
import SilverBalloonModel from './models/SilverBalloonModel';
import FloatingBehavior from './behaviors/FloatingBehavior';
import BaseBonusController from '../bonus/controllers/BaseBonusController';
import ScoreBonus from '../bonus/models/ScoreBonusModel';
import ScoreBonusView from '../bonus/views/ScoreBonusView';
import TimeBonusView from '../bonus/views/TimeBonusView';

enum BonusType {
    Speed = 'speed',
    Score = 'score',
    Time = 'time'
}

enum EnemyType {
    Copper = 'copper',
    Silver = 'silver',
    Gold = 'gold'
}

enum BehaviorType {
    Floating = 'floating'
}

class EnemyFactory {
    public static createEnemy(enemyData: EnemyData): EnemyController {
        const position = new Vector3(enemyData.position.x, enemyData.position.y, enemyData.position.z);
        const model = this._createModel(enemyData.type, position, enemyData.health, enemyData.score);
        const view = new BalloonView(Game.instance.scene, model);
        const controller = new EnemyController(model, view);

        this._assignBehavior(model, enemyData.behavior);
        this._assignBonus(controller, enemyData.bonus);

        return controller;
    }

    private static _createModel(type: string, position: Vector3, health: number, score: number): BalloonModel {
        switch (type) {
            case EnemyType.Copper:
                return new CopperBalloonModel(position, health, score);
            case EnemyType.Silver:
                return new SilverBalloonModel(position, health, score);
            default:
                throw new Error(`Unsupported enemy type: ${type}`);
        }
    }

    private static _assignBehavior(model: BalloonModel, behavior: BehaviorData) {
        switch (behavior.type) {
            case BehaviorType.Floating:
                model.behavior = new FloatingBehavior(behavior.range, behavior.speed);
                break;
            default:
                throw new Error(`Unsupported behavior type: ${behavior.type}`);
        }
    }

    // Replace any with a base class for bonuses
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static _assignBonus(controller: EnemyController, bonusData: any) {
        switch (bonusData.type) {
            case BonusType.Score:
                // eslint-disable-next-line max-len
                controller.bonusController = new BaseBonusController(new ScoreBonus(), new ScoreBonusView(Game.instance.scene));
                break;
            case BonusType.Time:
                // eslint-disable-next-line max-len
                controller.bonusController = new BaseBonusController(new ScoreBonus(), new TimeBonusView(Game.instance.scene));
                break;
            default:
                throw new Error(`Unsupported behavior type: ${bonusData.type}`);
                break;
        }
    }
}

export default EnemyFactory;
