import { Vector3 } from '@babylonjs/core';
import { EnemyBehavior } from '../controllers/EnemyBehavior';
import { EnemyModel } from './EnemyModel';

/**
 * Represents a flying enemy model, extending the basic enemy model with flying-specific properties.
 */
class FlyingEnemyModel extends EnemyModel {
    private _altitude: number;

    /**
     * Constructs a FlyingEnemyModel with initial properties, behavior, and altitude.
     * @param {Vector3} initialPosition - The initial position of the flying enemy.
     * @param {number} initialSpeed - The movement speed of the flying enemy.
     * @param {number} initialHealth - The initial health of the flying enemy.
     * @param {EnemyBehavior} behavior - The behavior of the flying enemy.
     */
    constructor(initialPosition: Vector3, initialSpeed: number, initialHealth: number, behavior: EnemyBehavior) {
        super(initialPosition, initialSpeed, initialHealth, behavior);
        this._altitude = 10; // Default altitude, can be adjusted as needed
    }

    /**
     * Updates the flying enemy's state. Overrides the base update method with flying-specific behavior.
     * @param {number} deltaTime - The time in seconds since the last update.
     */
    public update(deltaTime: number): void {
        super.update(deltaTime);
        // Implement flying-specific logic here, like adjusting altitude
    }

    // Getters and setters for altitude

    /**
     * Gets the current altitude of the flying enemy.
     * @returns {number} The current altitude.
     */
    public getAltitude(): number {
        return this._altitude;
    }

    /**
     * Sets a new altitude for the flying enemy.
     * @param {number} newAltitude - The new altitude to be set.
     */
    public setAltitude(newAltitude: number): void {
        this._altitude = newAltitude;
    }

    // Additional flying-specific methods can be added here
}

export { FlyingEnemyModel };
