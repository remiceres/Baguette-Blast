import { EnemyModel } from './EnemyModel';

/**
 * Interface for defining behavior of enemy entities.
 * Classes implementing this interface should provide specific animations and actions for enemies.
 */
interface EnemyBehavior {
    /**
     * Animate and update the state of the enemy model.
     * This method is responsible for defining how the enemy behaves or reacts over time.
     * @param {EnemyModel} model - The enemy model to animate and update.
     * @param {number} deltaTime - The time in seconds since the last update.
     */
    animate(model: EnemyModel, deltaTime: number): void;
}

export { EnemyBehavior };
