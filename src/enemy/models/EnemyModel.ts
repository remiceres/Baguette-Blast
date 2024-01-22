import { Vector3 } from '@babylonjs/core';
import { EnemyBehavior } from './EnemyBehavior';

/**
 * Abstract class representing the data model for an enemy, including position, speed, health, and behavior.
 */
abstract class EnemyModel {
    private _position: Vector3;
    private _speed: number;
    private _health: number;
    private _behavior: EnemyBehavior;
    private _velocity: Vector3;

    /**
     * Constructs an EnemyModel with initial properties and behavior.
     * @param {Vector3} initialPosition - The initial position of the enemy.
     * @param {number} initialSpeed - The movement speed of the enemy.
     * @param {number} initialHealth - The initial health of the enemy.
     * @param {EnemyBehavior} behavior - The behavior of the enemy.
     * @param {Vector3} [velocity=Vector3(0, 5, 0)] - The initial velocity of the enemy.
     */
    constructor(
        initialPosition: Vector3,
        initialSpeed: number,
        initialHealth: number,
        behavior: EnemyBehavior,
        velocity: Vector3 = new Vector3(0, 5, 0)
    ) {
        this._position = initialPosition;
        this._speed = initialSpeed;
        this._health = initialHealth;
        this._behavior = behavior;
        this._velocity = velocity;
    }

    /**
     * Abstract method for updating the enemy's state, e.g., position, health.
     * This should be implemented by subclasses to define specific update behaviors.
     * @param {number} deltaTime - The time in seconds since the last update.
     */
    public update(deltaTime: number): void {
        this._behavior.animate(this, deltaTime);
    }

    // Getters and setters

    public getPosition(): Vector3 {
        return this._position;
    }

    public setPosition(newPosition: Vector3): void {
        this._position = newPosition;
    }

    public getSpeed(): number {
        return this._speed;
    }

    public setSpeed(newSpeed: number): void {
        this._speed = newSpeed;
    }

    public getHealth(): number {
        return this._health;
    }

    public setHealth(newHealth: number): void {
        this._health = newHealth;
    }

    public getVelocity(): Vector3 {
        return this._velocity;
    }

    public setVelocity(newVelocity: Vector3): void {
        this._velocity = newVelocity;
    }

    // Additional methods for enemy-specific logic can be added here
}

export { EnemyModel };
