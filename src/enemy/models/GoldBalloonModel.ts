import { Vector3 } from '@babylonjs/core';
import MoveAtoB from '../../behaviors/MoveAtoB';
import { EnemyData } from '../../game/models/LevelData';
import BalloonModel from './BalloonModel';

class GoldBalloonModel extends BalloonModel {
    constructor(
        position: Vector3 = new Vector3(0, 0, 0),
        health: number = 100,
        score: number = 10,
        enemyData: EnemyData
    ) {
        // Silver color could be defined here

        const behaviors = [];
        behaviors.push(
            new MoveAtoB(
                0.1,
                position,
                new Vector3(
                    enemyData.position.x,
                    enemyData.position.y + enemyData.behavior.range,
                    enemyData.position.z
                ),
                enemyData.behavior.speed
            )
        );
        super(position, health, score, behaviors);
    }
}

export default GoldBalloonModel;
