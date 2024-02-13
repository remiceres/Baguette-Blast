import { EnemyModel } from '../EnemyModel';
import { EnemyBehavior } from '../EnemyBehavior';
import { Vector3 } from '@babylonjs/core';

/**
 * Implements flying behavior for enemies.
 * Controls the vertical movement of enemies, making them ascend and descend within a defined range,
 * and also moves them horizontally towards a specified target player.
 */
class FlyingBehavior implements EnemyBehavior {
    private _ascending: boolean = true;
    private _maxHeight: number = 10; // Maximum altitude
    private _minHeight: number = 5; // Minimum altitude
    private _targetPosition: Vector3; // The target player to seek

    /**
     * Constructs a FlyingBehavior with a specified target player.
     * @param {Vector3} targetPosition - The target player that this behavior will seek.
     */
    constructor(targetPosition: Vector3) {
        this._targetPosition = targetPosition;
    }

    /**
     * Animates the enemy model with flying behavior.
     * @param {EnemyModel} model - The enemy model to animate.
     * @param {number} deltaTime - The time in seconds since the last update.
     */
    public animate(model: EnemyModel, deltaTime: number): void {
        const currentPosition = model.getPosition();
        const speed = model.getSpeed();

        // Vertical movement (ascend and descend)
        if (this._ascending) {
            currentPosition.y += speed * deltaTime;
            if (currentPosition.y >= this._maxHeight) {
                this._ascending = false; // Switch to descending
            }
        } else {
            currentPosition.y -= speed * deltaTime;
            if (currentPosition.y <= this._minHeight) {
                this._ascending = true; // Switch to ascending
            }
        }

        // Horizontal movement towards the target
        const horizontalSpeed = speed / 2; // Adjust speed for horizontal movement
        const desiredVelocityX = this._targetPosition.x - currentPosition.x;
        const desiredVelocityZ = this._targetPosition.z - currentPosition.z;
        currentPosition.x += Math.sign(desiredVelocityX) * horizontalSpeed * deltaTime;
        currentPosition.z += Math.sign(desiredVelocityZ) * horizontalSpeed * deltaTime;

        model.setPosition(currentPosition);
    }
}

export { FlyingBehavior };
