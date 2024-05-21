import { Vector3 } from '@babylonjs/core';
import BaseEnemyModel from './BaseEnemyModel';

class PigeonModel extends BaseEnemyModel {
    /////////////////
    // Constructor //
    /////////////////

    public constructor(position: Vector3, health: number, score: number) {
        super(position, health, score, []);
    }
}

export default PigeonModel;
