import { EnemyModel } from '../EnemyModel';
import { EnemyBehavior } from '../EnemyBehavior';
import PlayerModel from '../../../player/models/PlayerModel';
// import { Vector3 } from '@babylonjs/core';

/**
 * Implements walking and seeking behavior for enemies.
 * Controls the horizontal movement of enemies, making them move left and right within a defined range,
 * and also moves them towards a specified target player.
 */
class WalkingBehavior implements EnemyBehavior {
    private _movingRight: boolean = true;
    private _maxDistance: number = 10; // Maximum distance to the right
    private _minDistance: number = -10; // Minimum distance to the left
    private _targetPosition: PlayerModel; // The player to seek

    /**
     * Constructs a WalkingSeekingBehavior with a specified target.
     * @param {PlayerModel} target - The target enemy model that this behavior will seek.
     */
    constructor(targetPosition: PlayerModel) {
        this._targetPosition = targetPosition;
    }

    /**
     * Animates the enemy model with walking behavior.
     * @param {EnemyModel} model - The enemy model to animate.
     * @param {number} deltaTime - The time in seconds since the last update.
     */
    public animate(model: EnemyModel, deltaTime: number): void {
        const currentPosition = model.getPosition();
        const speed = model.getSpeed();

        // Adjust the x-position based on moving right or left
        if (this._movingRight) {
            currentPosition.x += speed * deltaTime;
            if (currentPosition.x >= this._maxDistance) {
                this._movingRight = false; // Switch to moving left
            }
        } else {
            currentPosition.x -= speed * deltaTime;
            if (currentPosition.x <= this._minDistance) {
                this._movingRight = true; // Switch to moving right
            }
        }

        // Vertical or depth movement towards the target
        const verticalOrDepthSpeed = speed / 2; // Adjust speed for seeking behavior
        // const desiredVelocityZ = this._targetPosition.z - currentPosition.z;
        const desiredVelocityZ = this._targetPosition.position.z - currentPosition.z;
        currentPosition.z += Math.sign(desiredVelocityZ) * verticalOrDepthSpeed * deltaTime;

        model.setPosition(currentPosition);
    }
}

export { WalkingBehavior };
