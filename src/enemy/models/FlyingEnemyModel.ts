import { FlyingBehavior } from '../controllers/FlyingBehavior';
import { EnemyModel } from './EnemyModel';
import { Vector3 } from '@babylonjs/core';

class FlyingEnemyModel extends EnemyModel {
    private altitude: number;

    constructor(initialPosition: Vector3, initialSpeed: number, initialHealth: number) {
        super(initialPosition, initialSpeed, initialHealth, new FlyingBehavior());
        this.altitude = 10;
    }

    // Override the update method if flying enemy has specific behavior
    public update(deltaTime: number): void {
        super.update(deltaTime);
        // Implement flying-specific logic here, like adjusting altitude
    }

    // Getters and setters for altitude
    public getAltitude(): number {
        return this.altitude;
    }

    public setAltitude(newAltitude: number): void {
        this.altitude = newAltitude;
    }

    // Additional flying-specific methods can be added here
}

export { FlyingEnemyModel };
