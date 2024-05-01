import { Vector3 } from '@babylonjs/core';
import EnemyController from '../enemy/controllers/EnemyController';
import BehaviorsInterface from './BehaviorsInterface';

class AttractEnemy implements BehaviorsInterface {
    private _enemies: EnemyController[];
    private _detectionRadius: number;
    private _force: number;

    constructor(enemies: EnemyController[], detectionRadius: number, force: number) {
        this._enemies = enemies;
        this._detectionRadius = detectionRadius;
        this._force = force;
    }

    public updateAccelerationVector(): Vector3 {
        let acceleration = Vector3.Zero();

        for (const enemy of this._enemies) {
            console.log('AttractEnemy');
            const distance = enemy.position.subtract(enemy.position).length();

            // if the enemy is close enough
            if (distance < this._detectionRadius) {
                // calculate the direction to the enemy
                const direction = enemy.position.subtract(enemy.position).normalize();

                // calculate the force to apply in function of the distance and the force
                const force = direction.scale(this._force / distance);
                acceleration = acceleration.add(force);
            }
        }

        return acceleration;
    }
}

export default AttractEnemy;
