import BalloonModel from './BalloonModel';
import { Vector3, Color3 } from '@babylonjs/core';

class CopperBalloonModel extends BalloonModel {
    constructor(position: Vector3 = new Vector3(0, 0, 0), health: number = 100) {
        // Silver color could be defined here
        super(position, health, new Color3(0.95, 0.95, 1.0));
    }

    // Here, you could add any CopperBalloon-specific methods or properties
}

export default CopperBalloonModel;