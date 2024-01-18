import { EnemyModel } from './models/EnemyModel';
import { FlyingEnemyModel } from './models/FlyingEnemyModel'; // Adjust the path as necessary
import { WalkingEnemyModel } from './models/WalkingEnemyModel'; // Adjust the path as necessary
import { Vector3 } from '@babylonjs/core';

class EnemyFactory {
    static createEnemy(type: string, position: Vector3, speed: number, health: number): EnemyModel {
        switch (type.toLowerCase()) {
            case 'flying':
                return new FlyingEnemyModel(position, speed, health);
            case 'walking':
                return new WalkingEnemyModel(position, speed, health);
            default:
                throw new Error('Unknown enemy type');
        }
    }
}

export { EnemyFactory };
