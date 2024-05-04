import { Vector3 } from '@babylonjs/core';
import MoveAtoB from '../behaviors/MoveAtoB';
import BaseBonusController from '../bonus/controllers/BaseBonusController';
import ScoreBonus from '../bonus/models/ScoreBonusModel';
import ScoreBonusView from '../bonus/views/ScoreBonusView';
import TimeBonusView from '../bonus/views/TimeBonusView';
import Game from '../game/Game';
import { EnemyData } from '../game/models/LevelData';
import EnemyController from './controllers/EnemyController';
import BalloonModel from './models/BalloonModel';
import CopperBalloonModel from './models/CopperBalloonModel';
import SilverBalloonModel from './models/SilverBalloonModel';
import BalloonView from './views/BalloonView';
import CopperBalloonView from './views/CopperBalloonView';
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

        const behaviours = [
            new MoveAtoB(
                0.1,
                position,
                new Vector3(
                    enemyData.position.x,
                    enemyData.position.y + enemyData.behavior.range,
                    enemyData.position.z
                ),
                enemyData.behavior.speed
            ),
        ];
        const model = this._createModel(enemyData.type, position, enemyData.health, enemyData.score, behaviours);
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
        behaviours
    ): BalloonModel {
        switch (type) {
            case EnemyType.Copper:
                return new CopperBalloonModel(position, health, score, behaviours);
            case EnemyType.Silver:
                return new SilverBalloonModel(position, health, score, behaviours);
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
            default:
                throw new Error(`Unsupported enemy type: ${type}`);
        }
    }

    // Replace any with a base class for bonuses
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static _assignBonus(controller: EnemyController, bonusData: any) {
        switch (bonusData.type) {
            case BonusType.Score:
                // eslint-disable-next-line max-len
                controller.bonusController = new BaseBonusController(
                    new ScoreBonus(),
                    new ScoreBonusView(Game.instance.scene)
                );
                break;
            case BonusType.Time:
                // eslint-disable-next-line max-len
                controller.bonusController = new BaseBonusController(
                    new ScoreBonus(),
                    new TimeBonusView(Game.instance.scene)
                );
                break;
            default:
                throw new Error(`Unsupported behavior type: ${bonusData.type}`);
                break;
        }
    }
}

export default EnemyFactory;
