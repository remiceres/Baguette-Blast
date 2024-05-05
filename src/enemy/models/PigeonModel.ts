// import IBehaviour from '../../behaviors/IBehaviour';
import IBehaviour from '../../behaviors/IBehaviour';
import MoveAtoB from '../../behaviors/MoveAtoB';
import { EnemyData } from '../../game/models/LevelData';
import BalloonModel from './BalloonModel';
import { Vector3 } from '@babylonjs/core';

class PigeonModel extends BalloonModel {

    _behaviours: IBehaviour[] = [];

    constructor(
        position: Vector3 = new Vector3(0, 0, 0), 
        health: number = 100, 
        score: number = 10, 
        enemyData : EnemyData, 
        playerPosition: Vector3
    ) {
        // Silver color could be defined here
        super(position, health, score);
        this._behaviours.push(
            new MoveAtoB(
                0.1,
                position,
                new Vector3(
                    playerPosition.x,
                    playerPosition.y,
                    playerPosition.z
                ),
                enemyData.behavior.speed
            ),
        );
    }
}

export default PigeonModel;