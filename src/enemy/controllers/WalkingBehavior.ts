import { EnemyModel } from '../models/EnemyModel';
import { EnemyBehavior } from './EnemyBehavior';

class WalkingBehavior implements EnemyBehavior {
    private movingRight: boolean = true;
    private maxDistance: number = 10; // Maximum distance to the right
    private minDistance: number = -10; // Minimum distance to the left

    public execute(model: EnemyModel, deltaTime: number): void {
        let currentPosition = model.getPosition();
        let speed = model.getSpeed();

        if (this.movingRight) {
            currentPosition.x += speed * deltaTime;
            if (currentPosition.x >= this.maxDistance) {
                this.movingRight = false;
            }
        } else {
            currentPosition.x -= speed * deltaTime;
            if (currentPosition.x <= this.minDistance) {
                this.movingRight = true;
            }
        }

        model.setPosition(currentPosition);
    }
}

export { WalkingBehavior };
