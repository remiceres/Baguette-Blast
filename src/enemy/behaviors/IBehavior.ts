import BaseEnemyModel from '../models/BaseEnemyModel';

interface IBehavior {
    setModel(model: BaseEnemyModel): void;
    update(deltaTime: number): void;
}

export default IBehavior;