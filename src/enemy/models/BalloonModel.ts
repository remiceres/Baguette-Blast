import { Vector3, Color3 } from '@babylonjs/core';
import BaseEnemyModel from './BaseEnemyModel';
import IBehaviour from '../../behaviors/IBehaviour';

class BalloonModel extends BaseEnemyModel {
    private _color: Color3;

    constructor(
        position: Vector3 = new Vector3(0, 0, 0), 
        health: number = 100,
        score: number = 1,
        behaviour?: IBehaviour[]
    ) {
        super(position, health, score, behaviour);
    }

    update(deltaTime: number): void {
        super.update(deltaTime); 
    }
}

export default BalloonModel;
