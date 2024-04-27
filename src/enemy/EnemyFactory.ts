import { Vector3 } from '@babylonjs/core';
import { BehaviorData, EnemyData } from '../game/LevelData';
import EnemyController from './controllers/EnemyController';
import BalloonView from './views/BalloonView';
import Game from '../Game';
import BalloonModel from './models/BalloonModel';
import CopperBalloonModel from './models/CopperBalloonModel';
import SilverBalloonModel from './models/SilverBalloonModel';
import FloatingBehavior from './behaviors/FloatingBehavior';
import BonusController from '../bonus/controllers/BonusController';
import ScoreBonus from '../bonus/models/ScoreBonusModel';
import BonusView from '../bonus/views/BonusView';

enum BonusType {
    Speed = 'speed',
    Score = 'score'
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
        const model = this._createModel(enemyData.type, position, enemyData.health);
        const view = new BalloonView(Game.instance.scene, model);
        const controller = new EnemyController(model, view);

        this._assignBehavior(model, enemyData.behavior);
        this._assignBonus(controller, enemyData.bonus);

        return controller;
    }

    private static _createModel(type: string, position: Vector3, health: number): BalloonModel {
        switch (type) {
            case EnemyType.Copper:
                return new CopperBalloonModel(position, health);
            case EnemyType.Silver:
                return new SilverBalloonModel(position, health);
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
        if (bonusData && bonusData.type === BonusType.Score) {
            controller.bonusController = new BonusController(new ScoreBonus(), new BonusView(Game.instance.scene));
        }
    }
}

export default EnemyFactory;
