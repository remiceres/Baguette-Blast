import { Vector3 } from '@babylonjs/core';
import BalloonModel from './BalloonModel';

class PigeonModel extends BalloonModel {
    constructor(position: Vector3 = new Vector3(0, 0, 0), health: number = 100, score: number = 10) {
        // Silver color could be defined here
        super(position, health, score, []);
    }
}

export default PigeonModel;
