import BalloonModel from './BalloonModel';
import { Vector3, Color3 } from '@babylonjs/core';

class CopperBalloonModel extends BalloonModel {
    constructor(position: Vector3 = new Vector3(0, 0, 0), health: number = 100) {
        // Copper color could be defined here, e.g., as a reddish-brown
        super(position, health, new Color3(0.72, 0.45, 0.20));
    }

    // Here, you could add any CopperBalloon-specific methods or properties
}

export default CopperBalloonModel;