import { Vector3 } from '@babylonjs/core';

class PlayerModel {
    position: Vector3;
    health: number;
    onPositionChanged: (newPosition: Vector3) => void;

    constructor() {
        this.position = new Vector3(0, 0, 5); // Initial position
        this.health = 100; // Initial health
    }

    // Update the player's position
    public updatePosition(newPosition: Vector3): void {
        this.position = newPosition;
        this.onPositionChanged?.(this.position);
    }

    // Method to modify player's health
    takeDamage(amount: number): void {
        this.health -= amount;
        if (this.health < 0) this.health = 0;
    }

    // Additional methods related to player state can be added here
}

export default PlayerModel;