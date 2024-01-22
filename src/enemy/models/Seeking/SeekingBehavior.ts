import { EnemyModel } from '../EnemyModel';
import { EnemyBehavior } from '../EnemyBehavior';

/**
 * Implements seeking behavior for enemies.
 * This behavior makes the enemy move towards a specified target.
 */
class SeekingBehavior implements EnemyBehavior {
    private _target: EnemyModel;

    /**
     * Constructs a SeekingBehavior with a specified target.
     * @param {EnemyModel} target - The target enemy model that this behavior will seek.
     */
    constructor(target: EnemyModel) {
        this._target = target;
    }

    /**
     * Animates the enemy model with seeking behavior towards the target.
     * @param {EnemyModel} model - The enemy model to animate.
     * @param {number} deltaTime - The time in seconds since the last update.
     */
    public animate(model: EnemyModel, deltaTime: number): void {
        const targetPosition = this._target.getPosition();
        const position = model.getPosition();
        const speed = model.getSpeed();

        // Calculate the desired velocity towards the target
        const desiredVelocity = targetPosition.subtract(position).normalize().scale(speed);

        // Compute the steering force required to adjust the enemy's current velocity towards the desired velocity
        const steering = desiredVelocity.subtract(model.getVelocity());

        // Update the enemy's velocity and position based on the steering force
        model.setVelocity(model.getVelocity().add(steering));
        model.setPosition(position.add(model.getVelocity().scale(deltaTime)));
    }
}

export { SeekingBehavior };
