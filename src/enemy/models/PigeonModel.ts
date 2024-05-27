import { Vector3 } from '@babylonjs/core';
import BaseEnemyModel from './BaseEnemyModel';

class PigeonModel extends BaseEnemyModel {
    private _offsetHeadRotation: number;
    private _headRotationSpeed: number;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(position: Vector3, health: number, score: number) {
        super(position, health, score, []);
        this._offsetHeadRotation = this._generateOffsetHeadRotation();
        this._headRotationSpeed = 1;
    }

    private _generateOffsetHeadRotation(): number {
        return (Math.random() * Math.PI) / 2 - Math.PI / 4;
    }

    //////////////
    // Accessor //
    //////////////

    public get offsetHeadRotation(): number {
        return this._offsetHeadRotation;
    }

    public get headRotationSpeed(): number {
        return this._headRotationSpeed;
    }
}

export default PigeonModel;
