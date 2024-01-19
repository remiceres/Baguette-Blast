import { EnemyModel } from '../models/EnemyModel';
import { EnemyBehavior } from './EnemyBehavior';

/**
 * Implements walking behavior for enemies.
 * Controls the horizontal movement of enemies, making them move left and right within a defined range.
 */
class WalkingBehavior implements EnemyBehavior {
    private _movingRight: boolean = true;
    private _maxDistance: number = 10; // Maximum distance to the right
    private _minDistance: number = -10; // Minimum distance to the left

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

        model.setPosition(currentPosition);
    }
}

export { WalkingBehavior };
