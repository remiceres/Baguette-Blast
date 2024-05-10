import { Vector3 } from '@babylonjs/core';
import IBehaviour from '../../behaviors/IBehaviour';
import BalloonModel from './BalloonModel';

class PigeonModel extends BalloonModel {
    _behaviours: IBehaviour[] = [];

    constructor(position: Vector3 = new Vector3(0, 0, 0), health: number = 100, score: number = 10) {
        // Silver color could be defined here
        super(position, health, score);
        this._behaviours.push();
    }
}

export default PigeonModel;
