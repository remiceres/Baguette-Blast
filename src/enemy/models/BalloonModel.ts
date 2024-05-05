import { Vector3 } from '@babylonjs/core';
import BaseEnemyModel from './BaseEnemyModel';

class BalloonModel extends BaseEnemyModel {

    constructor(
        position: Vector3 = new Vector3(0, 0, 0), 
        health: number = 100,
        score: number = 1,
    ) {
        super(position, health, score);
    }

    update(deltaTime: number): void {
        super.update(deltaTime); 
    }
}

export default BalloonModel;
