import { Vector3, Color3 } from '@babylonjs/core';
import BaseEnemyModel from './BaseEnemyModel';
import IBehaviour from '../../behaviors/IBehaviour';

class BalloonModel extends BaseEnemyModel {
    private _color: Color3;

    constructor(
        position: Vector3 = new Vector3(0, 0, 0), 
        health: number = 100, 
        color: Color3 = new Color3(1, 0, 0), 
        score: number = 1,
        behaviour?: IBehaviour[]
    ) {
        super(position, health, score, behaviour);
        this._color = color;
    }

    get color(): Color3 {
        return this._color;
    }

    set color(value: Color3) {
        this._color = value;
    }

    update(deltaTime: number): void {
        super.update(deltaTime); 
    }
}

export default BalloonModel;
