import { Vector3, Color3 } from '@babylonjs/core';
import EnemyModel from './EnemyModel';
import IBehavior from '../behaviors/IBehavior';

class BalloonModel extends EnemyModel {
    private _behavior?: IBehavior;
    private _color: Color3;

    constructor(
        position: Vector3 = new Vector3(0, 0, 0), 
        health: number = 100, 
        color: Color3 = new Color3(1, 0, 0), 
        score: number = 1) {
        super(position, health, score);
        this._color = color;
    }

    get color(): Color3 {
        return this._color;
    }

    set color(value: Color3) {
        this._color = value;
    }

    set behavior(behavior: IBehavior) {
        this._behavior = behavior;
        if (behavior.setModel) {
            behavior.setModel(this); // Ensure the behavior has a reference to the model
        }
    }

    update(deltaTime: number): void {
        super.update(deltaTime); // Call the base update method if necessary

        // Specific update logic for the balloon
        this._behavior?.update(deltaTime);
    }

    // Balloon-specific methods can be added here
}

export default BalloonModel;
