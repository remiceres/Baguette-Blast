import { AbstractMesh, Vector3 } from '@babylonjs/core';
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

    public getForceVector(deltaTime: number, mesh: AbstractMesh): Vector3 {
        let nearestEnemy: EnemyController | null = null;
        let minDistance = Infinity;

        // Find the nearest enemy within the detection radius
        for (const enemy of this._enemies) {
            const distance = enemy.position.subtract(mesh.position).length();

            if (distance < this._detectionRadius && distance < minDistance) {
                minDistance = distance;
                nearestEnemy = enemy;
            }
        }

        // If a nearest enemy is found, apply the force towards it
        if (nearestEnemy) {
            const direction = nearestEnemy.position.subtract(mesh.position).normalize();
            return direction.scale(this._force * deltaTime);
        }

        // Return zero vector if no enemy is found within detection radius
        return Vector3.Zero();
    }
}

export default AttractEnemy;
