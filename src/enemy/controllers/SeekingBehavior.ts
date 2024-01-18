import { Vector3 } from "@babylonjs/core";
import { EnemyBehavior } from "./EnemyBehavior";
import { EnemyModel } from "../models/EnemyModel";

class SeekingBehavior implements EnemyBehavior {
    private target: EnemyModel;

    constructor(target: EnemyModel) {
        this.target = target;
    }

    public execute(model: EnemyModel, deltaTime: number): void {
        let targetPosition = this.target.getPosition();
        let position = model.getPosition();
        let speed = model.getSpeed();
        let desiredVelocity = targetPosition.subtract(position).normalize().scale(speed);
        let steering = desiredVelocity.subtract(model.getVelocity());

        model.setVelocity(model.getVelocity().add(steering));
        model.setPosition(position.add(model.getVelocity().scale(deltaTime)));
    }
}

export { SeekingBehavior };
