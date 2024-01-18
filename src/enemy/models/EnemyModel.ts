import { Vector3 } from '@babylonjs/core';
import { EnemyBehavior } from '../controllers/EnemyBehavior';

class EnemyModel {
    private position: Vector3;
    private speed: number;
    private health: number;
    private behavior: EnemyBehavior;

    constructor(initialPosition: Vector3, initialSpeed: number, initialHealth: number, behavior: EnemyBehavior) {
        this.position = initialPosition;
        this.speed = initialSpeed;
        this.health = initialHealth;
        this.behavior = behavior;
    }

    // Method to update the enemy's state, e.g., position, health
    public update(deltaTime: number): void {
        // Implement logic to update the enemy's position and other properties
        // For example: this.position.addInPlace(new Vector3(0, this.speed * deltaTime, 0));
        this.behavior.execute(this, deltaTime);
    }

    // Getters and setters for position, speed, and health
    public getPosition(): Vector3 {
        return this.position;
    }

    public setPosition(newPosition: Vector3): void {
        this.position = newPosition;
    }

    public getSpeed(): number {
        return this.speed;
    }

    public setSpeed(newSpeed: number): void {
        this.speed = newSpeed;
    }

    public getHealth(): number {
        return this.health;
    }

    public setHealth(newHealth: number): void {
        this.health = newHealth;
    }

    // Additional methods for enemy-specific logic can be added here
}

export { EnemyModel };
