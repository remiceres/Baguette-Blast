import { EnemyModel } from '../EnemyModel';
import { EnemyBehavior } from '../EnemyBehavior';

/**
 * Implements flying behavior for enemies.
 * Controls the vertical movement of enemies, making them ascend and descend within a defined range.
 */
class FlyingBehavior implements EnemyBehavior {
    private _ascending: boolean = true;
    private _maxHeight: number = 10; // Maximum altitude
    private _minHeight: number = 5; // Minimum altitude

    /**
     * Animates the enemy model with flying behavior.
     * @param {EnemyModel} model - The enemy model to animate.
     * @param {number} deltaTime - The time in seconds since the last update.
     */
    public animate(model: EnemyModel, deltaTime: number): void {
        const currentPosition = model.getPosition();
        const speed = model.getSpeed();

        // Adjust the y-position based on ascending or descending status
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

        model.setPosition(currentPosition);
    }
}

export { FlyingBehavior };
