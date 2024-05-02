import IBehaviour from '../../behaviors/IBehaviour';
import BalloonModel from './BalloonModel';
import { Vector3, Color3 } from '@babylonjs/core';

class CopperBalloonModel extends BalloonModel {
    constructor(
        position: Vector3 = new Vector3(0, 0, 0), health: number = 100, score: number = 10, behaviour: IBehaviour[]
    ) {
        // Silver color could be defined here
        super(position, health, new Color3(0.95, 0.95, 1.0), score, behaviour);
    }
}

export default CopperBalloonModel;