import { Color3, Scene, Vector3 } from '@babylonjs/core';
import { FlyingBehavior } from '../../enemy/models/Flying/FlyingBehavior';
import { SeekingBehavior } from '../../enemy/models/Seeking/SeekingBehavior';
import { WalkingBehavior } from '../../enemy/models/Walking/WalkingBehavior';
import { EnemyView } from '../../enemy/views/EnemyView';
import { EnemyController } from '../../enemy/controllers/EnemyController';
import { EnemyFactory } from '../../enemy/EnemyFactory';

export class EnemyInitializer {
    static createEnemies(scene: Scene, playerPosition: Vector3) {
        // Flying enemy setup
        const flyingEnemyModel = EnemyFactory.createEnemy(
            'flying',
            new Vector3(0, 10, 0),
            1,
            100,
            new FlyingBehavior(playerPosition) // use playerModel
        );
        const flyingEnemyView = new EnemyView(flyingEnemyModel, scene, Color3.Blue()); // use scene
        const flyingEnemyController = new EnemyController(flyingEnemyModel, flyingEnemyView); // local variable

        // Seeking enemy setup
        const seekingEnemyModel = EnemyFactory.createEnemy(
            'flying',
            new Vector3(0, 0, 0),
            0.5,
            100,
            new SeekingBehavior(flyingEnemyModel) // use flyingEnemyModel
        );
        const seekingEnemyView = new EnemyView(seekingEnemyModel, scene, Color3.Green()); // use scene
        const seekingEnemyController = new EnemyController(seekingEnemyModel, seekingEnemyView); // local variable

        // Walking enemy setup
        const walkingEnemyModel = EnemyFactory.createEnemy(
            'walking',
            new Vector3(0, 0, 0),
            3,
            100,
            new WalkingBehavior(playerPosition) // use playerModel
        );
        const walkingEnemyView = new EnemyView(walkingEnemyModel, scene, Color3.Red()); // use scene
        const walkingEnemyController = new EnemyController(walkingEnemyModel, walkingEnemyView); // local variable

        return {
            flyingEnemyController,
            seekingEnemyController,
            walkingEnemyController
        };
    }
}
