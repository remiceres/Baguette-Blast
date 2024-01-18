import { EnemyModel } from "../models/EnemyModel";

interface EnemyBehavior {
    execute(model: EnemyModel, deltaTime: number): void;
}

export { EnemyBehavior };
