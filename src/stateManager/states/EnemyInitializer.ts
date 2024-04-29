import { Vector3 } from '@babylonjs/core';
import FloatingBehavior from '../../enemy/behaviors/FloatingBehavior';
import EnemyController from '../../enemy/controllers/EnemyController';
import BalloonModel from '../../enemy/models/BalloonModel';
import CopperBalloonModel from '../../enemy/models/CopperBalloonModel';
import SilverBalloonModel from '../../enemy/models/SilverBalloonModel';
import BalloonView from '../../enemy/views/BalloonView';
import Game from '../../game/Game';
import { EnemyData } from '../../game/LevelData';

enum EnemyType {
    Copper = 'copper',
    Silver = 'silver',
    Gold = 'gold',
}

class EnemyInitializer {
    public static initEnemies(enemyData: EnemyData[]): EnemyController[] {
        return enemyData.map((enemy) => this._createEnemy(enemy));
    }

    private static _createEnemy(enemy: EnemyData): EnemyController {
        const position = new Vector3(enemy.position.x, enemy.position.y, enemy.position.z);
        switch (enemy.type) {
            case EnemyType.Copper:
                return this._createBalloon(new CopperBalloonModel(position, enemy.health));
            case EnemyType.Silver:
                return this._createBalloon(new SilverBalloonModel(position, enemy.health));
            // More types can be added here
            default:
                throw new Error(`Unsupported enemy type: ${enemy.type}`);
        }
    }

    private static _createBalloon(model: BalloonModel): EnemyController {
        const view = new BalloonView(Game.instance.scene, model);
        const floatingBehavior = new FloatingBehavior(0.5, 2);
        model.behavior = floatingBehavior;

        const controller = new EnemyController(model, view);
        // if (model instanceof CopperBalloonModel) {
        //     controller.bonusController = new BonusController(new ScoreBonus(), new BonusView(Game.instance.scene));
        // }

        return controller;
    }
}
export default EnemyInitializer;
