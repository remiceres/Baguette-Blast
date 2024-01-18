import { EnemyBehavior } from './controllers/EnemyBehavior';
// import { FlyingBehavior } from './controllers/FlyingBehavior';
// import { SeekingBehavior } from './controllers/SeekingBehavior';
// import { WalkingBehavior } from './controllers/WalkingBehavior';
import { EnemyModel } from './models/EnemyModel';
import { FlyingEnemyModel } from './models/FlyingEnemyModel'; // Adjust the path as necessary
import { WalkingEnemyModel } from './models/WalkingEnemyModel'; // Adjust the path as necessary
import { Vector3 } from '@babylonjs/core';

class EnemyFactory {
    static createEnemy(type: string, position: Vector3, speed: number, health: number, behavior: EnemyBehavior): EnemyModel {
        switch (type.toLowerCase()) {
            case 'flying':
                return new FlyingEnemyModel(position, speed, health, behavior);
            case 'walking':
                return new WalkingEnemyModel(position, speed, health, behavior);
            default:
                throw new Error('Unknown enemy type');
        }
    }
}

export { EnemyFactory };

