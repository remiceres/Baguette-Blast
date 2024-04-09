import { Scene, Vector3, Color3 } from '@babylonjs/core';
import CopperBalloonModel from '../../enemy/models/CopperBalloonModel';
import BalloonView from '../../enemy/views/BalloonView';
import BalloonModel from '../../enemy/models/BalloonModel';
import EnemyModel from '../../enemy/models/EnemyModel';
import EnemyView from '../../enemy/views/EnemyView';
import FloatingBehavior from '../../enemy/behaviors/FloatingBehavior';
import SilverBalloonModel from '../../enemy/models/SilverBalloonModel';
import EnemyController from '../../enemy/controllers/EnemyController';
import BonusController from '../../bonus/controllers/BonusController';
import ScoreBonus from '../../bonus/models/ScoreBonusModel';
import BonusView from '../../bonus/views/BonusView';

class EnemyInitializer {
    private _scene: Scene;

    constructor(scene: Scene) {
        this._scene = scene;
    }

    initEnemies(currentLevelConfig): EnemyController[]{
        const controllers: EnemyController[] = [];
        currentLevelConfig.enemies.forEach((enemy) => {
            for (let i = 0; i < enemy.quantity; i++) {
                // Generate a random position
                const position = new Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);

                // Initialize the enemy based on its type
                let controller;
                switch (enemy.name) {
                    case 'Copper Balloon':
                        controller = this.createCopperBalloon(position, enemy.points);
                        break;
                    case 'Silver Balloon':
                        controller = this.createSilverBalloon(position, enemy.points);
                        break;
                    case 'Walking Enemy':
                        controller = this.createEnemy(position, enemy.points);
                        break;
                    // Add cases for other enemy types as needed
                }
                if (controller) {
                    controllers.push(controller);
                }
            }
        });
        return controllers;
    }

    createEnemy(position: Vector3, health: number): EnemyController {
        const model = new EnemyModel(position, health);
        const view = new EnemyView(this._scene, model);
        const controller = new EnemyController(model, view);
        return controller;
    }

    createBalloon(position: Vector3, health: number, color: Color3 = new Color3(1, 0, 0)): EnemyController {
        const model = new BalloonModel(position, health, color); // Use CopperBalloonModel for copper balloons
        const view = new BalloonView(this._scene, model);
        const controller = new EnemyController(model, view);
        return controller;
    }

    createCopperBalloon(position: Vector3, health: number): EnemyController {
        const model = new CopperBalloonModel(position, health);
        const view = new BalloonView(this._scene, model);

        // Initialize and assign the FloatingBehavior
        const floatingBehavior = new FloatingBehavior(0.5, 2);
        model.behavior = floatingBehavior; // This automatically calls setModel within the behavior

        const controller = new EnemyController(model, view);
        controller.bonusController = new BonusController(
            new ScoreBonus(), new BonusView(this._scene)
        ); // Assign a bonus controller to the enemy
        return controller;
    }

    createSilverBalloon(position: Vector3, health: number): EnemyController {
        const model = new SilverBalloonModel(position, health);
        const view = new BalloonView(this._scene, model);

        // Initialize and assign the FloatingBehavior
        const floatingBehavior = new FloatingBehavior(0.5, 2);
        model.behavior = floatingBehavior; // This automatically calls setModel within the behavior

        const controller = new EnemyController(model, view);
        return controller;
    }

    // Additional methods to create other types of enemies can be added here
}

export default EnemyInitializer;