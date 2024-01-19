import { Vector3 } from '@babylonjs/core';
import { EnemyBehavior } from '../controllers/EnemyBehavior';
import { EnemyModel } from './EnemyModel';

/**
 * Represents a walking enemy model, extending the basic enemy model with walking-specific properties.
 */
class WalkingEnemyModel extends EnemyModel {
    private _groundLevel: number;

    /**
     * Constructs a WalkingEnemyModel with initial properties, behavior, and ground level.
     * @param {Vector3} initialPosition - The initial position of the walking enemy.
     * @param {number} initialSpeed - The movement speed of the walking enemy.
     * @param {number} initialHealth - The initial health of the walking enemy.
     * @param {EnemyBehavior} behavior - The behavior of the walking enemy.
     */
    constructor(initialPosition: Vector3, initialSpeed: number, initialHealth: number, behavior: EnemyBehavior) {
        super(initialPosition, initialSpeed, initialHealth, behavior);
        this._groundLevel = 0; // Default ground level, can be adjusted as needed
    }

    /**
     * Updates the walking enemy's state. Overrides the base update method with walking-specific behavior.
     * @param {number} deltaTime - The time in seconds since the last update.
     */
    public update(deltaTime: number): void {
        super.update(deltaTime);
        // Implement walking-specific logic here, like adjusting position on the ground
    }

    // Getters and setters for groundLevel

    /**
     * Gets the current ground level of the walking enemy.
     * @returns {number} The current ground level.
     */
    public getGroundLevel(): number {
        return this._groundLevel;
    }

    /**
     * Sets a new ground level for the walking enemy.
     * @param {number} newGroundLevel - The new ground level to be set.
     */
    public setGroundLevel(newGroundLevel: number): void {
        this._groundLevel = newGroundLevel;
    }

    // Additional walking-specific methods can be added here
}

export { WalkingEnemyModel };
