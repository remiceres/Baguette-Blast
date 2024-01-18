import { WalkingBehavior } from '../controllers/WalkingBehavior';
import { EnemyModel } from './EnemyModel';
import { Vector3 } from '@babylonjs/core';

class WalkingEnemyModel extends EnemyModel {
    private groundLevel: number;

    constructor(initialPosition: Vector3, initialSpeed: number, initialHealth: number) {
        super(initialPosition, initialSpeed, initialHealth, new WalkingBehavior());
        this.groundLevel = 0;
    }

    // Override the update method if walking enemy has specific behavior
    public update(deltaTime: number): void {
        super.update(deltaTime);
        // Implement walking-specific logic here, like adjusting position on the ground
    }

    // Getters and setters for groundLevel
    public getGroundLevel(): number {
        return this.groundLevel;
    }

    public setGroundLevel(newGroundLevel: number): void {
        this.groundLevel = newGroundLevel;
    }

    // Additional walking-specific methods can be added here
}

export { WalkingEnemyModel };
