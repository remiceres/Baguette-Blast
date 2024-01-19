import { Vector3 } from '@babylonjs/core';
import { EnemyModel } from '../models/EnemyModel';
import { EnemyBehavior } from './EnemyBehavior';

class FlyingBehavior implements EnemyBehavior {
    private ascending: boolean = true;
    private maxHeight: number = 10; // Maximum altitude
    private minHeight: number = 5; // Minimum altitude

    public execute(model: EnemyModel, deltaTime: number): void {
        let currentPosition = model.getPosition();
        let speed = model.getSpeed();

        if (this.ascending) {
            currentPosition.y += speed * deltaTime;
            if (currentPosition.y >= this.maxHeight) {
                this.ascending = false;
            }
        } else {
            currentPosition.y -= speed * deltaTime;
            if (currentPosition.y <= this.minHeight) {
                this.ascending = true;
            }
        }

        model.setPosition(currentPosition);
    }
}

export { FlyingBehavior };
