import { Vector3 } from '@babylonjs/core';
import BonusController from '../../bonus/controllers/BonusController';
import ScoreBonus from '../../bonus/models/ScoreBonusModel';
import BonusView from '../../bonus/views/BonusView';
import FloatingBehavior from '../../enemy/behaviors/FloatingBehavior';
import EnemyController from '../../enemy/controllers/EnemyController';
import CopperBalloonModel from '../../enemy/models/CopperBalloonModel';
import EnemyModel from '../../enemy/models/EnemyModel';
import SilverBalloonModel from '../../enemy/models/SilverBalloonModel';
import BalloonView from '../../enemy/views/BalloonView';
import EnemyView from '../../enemy/views/EnemyView';
import Game from '../../Game';
import { EnemyData } from '../../game/LevelData';


class EnemyInitializer {
    public static initEnemies(enemyData: EnemyData[]): EnemyController[] {
        const controllers: EnemyController[] = [];

        enemyData.forEach((enemy) => {
            // Generate a random position
            const position = new Vector3(enemy.position.x, enemy.position.y, enemy.position.z);

            // Initialize the enemy based on its type
            let controller;
            switch (enemy.type) {
                case 'copper':
                    controller = this._createCopperBalloon(position, enemy.health);
                    break;
                case 'silver':
                    controller = this._createSilverBalloon(position, enemy.health);
                    break;
                case 'Walking Enemy':
                    controller = this._createEnemy(position, enemy.health);
                    break;
            }
            controllers.push(controller);
        });
        return controllers;
    }

    private static _createEnemy(position: Vector3, health: number): EnemyController {
        const model = new EnemyModel(position, health);
        const view = new EnemyView(Game.instance.scene, model);
        const controller = new EnemyController(model, view);
        return controller;
    }

    // private static _createBalloon(
    //     position: Vector3,
    //     health: number,
    //     color: Color3 = new Color3(1, 0, 0)
    // ): EnemyController {
    //     const model = new BalloonModel(position, health, color); // Use CopperBalloonModel for copper balloons
    //     const view = new BalloonView(Game.instance.scene, model);
    //     const controller = new EnemyController(model, view);
    //     return controller;
    // }

    private static _createCopperBalloon(position: Vector3, health: number): EnemyController {
        const model = new CopperBalloonModel(position, health);
        const view = new BalloonView(Game.instance.scene, model);

        // Initialize and assign the FloatingBehavior
        const floatingBehavior = new FloatingBehavior(0.5, 2);
        model.behavior = floatingBehavior; // This automatically calls setModel within the behavior

        const controller = new EnemyController(model, view);
        controller.bonusController = new BonusController(new ScoreBonus(), new BonusView(Game.instance.scene));
        return controller;
    }

    private static _createSilverBalloon(position: Vector3, health: number): EnemyController {
        const model = new SilverBalloonModel(position, health);
        const view = new BalloonView(Game.instance.scene, model);

        // Initialize and assign the FloatingBehavior
        const floatingBehavior = new FloatingBehavior(0.5, 2);
        model.behavior = floatingBehavior; // This automatically calls setModel within the behavior

        const controller = new EnemyController(model, view);
        return controller;
    }
}

export default EnemyInitializer;
