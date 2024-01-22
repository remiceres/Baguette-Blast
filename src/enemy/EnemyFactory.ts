import { Vector3 } from '@babylonjs/core';
import { EnemyBehavior } from './models/EnemyBehavior';
import { EnemyModel } from './models/EnemyModel';
import { FlyingEnemyModel } from './models/Flying/FlyingEnemyModel';
import { WalkingEnemyModel } from './models/Walking/WalkingEnemyModel';

/**
 * Factory class for creating enemy objects.
 * Supports different types of enemies like 'flying' and 'walking'.
 */
class EnemyFactory {
    /**
     * Creates an enemy model based on the specified type.
     *
     * @param {string} type - The type of the enemy to create ('flying', 'walking', etc.).
     * @param {Vector3} position - The initial position of the enemy.
     * @param {number} speed - The movement speed of the enemy.
     * @param {number} health - The health of the enemy.
     * @param {EnemyBehavior} behavior - The behavior strategy for the enemy.
     * @returns {EnemyModel} An instance of the specified enemy model.
     * @throws {Error} Throws an error if the enemy type is not supported.
     */
    static createEnemy(
        type: string,
        position: Vector3,
        speed: number,
        health: number,
        behavior: EnemyBehavior
    ): EnemyModel {
        switch (type.toLowerCase()) {
            case 'flying':
                return new FlyingEnemyModel(position, speed, health, behavior);
            case 'walking':
                return new WalkingEnemyModel(position, speed, health, behavior);
            default:
                throw new Error(`Enemy type ${type} is not supported`);
        }
    }
}

export { EnemyFactory };
