import EnemyModel from '../models/EnemyModel';

interface IBehavior {
    setModel(model: EnemyModel): void;
    update(deltaTime: number): void;
}

export default IBehavior;