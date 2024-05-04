import IBehaviour from '../../behaviors/IBehaviour';
import BalloonModel from './BalloonModel';
import { Vector3 } from '@babylonjs/core';

class SilverBalloonModel extends BalloonModel {
    constructor(
        position: Vector3 = new Vector3(0, 0, 0), health: number = 100, score: number = 10, behaviour: IBehaviour[]
    ) {
        // Silver color could be defined here
        super(position, health, score, behaviour);
    }
}

export default SilverBalloonModel;