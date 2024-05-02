import IBehaviour from '../../behaviors/IBehaviour';
import BalloonModel from './BalloonModel';
import { Vector3, Color3 } from '@babylonjs/core';

class CopperBalloonModel extends BalloonModel {
    constructor(
        position: Vector3 = new Vector3(0, 0, 0), health: number = 100, score: number = 1, behaviour: IBehaviour[]
    ) {
        // Copper color could be defined here, e.g., as a reddish-brown
        super(position, health, new Color3(0.72, 0.45, 0.20), score, behaviour);
    }
}

export default CopperBalloonModel;