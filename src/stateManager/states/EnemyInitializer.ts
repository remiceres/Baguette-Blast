import { Scene, Vector3, Color3 } from '@babylonjs/core';
import CopperBalloonModel from '../../enemy/models/CopperBalloonModel';
import BalloonView from '../../enemy/views/BalloonView';
import BalloonModel from '../../enemy/models/BalloonModel';
import EnemyModel from '../../enemy/models/EnemyModel';
import EnemyView from '../../enemy/views/EnemyView';
import FloatingBehavior from '../../enemy/behaviors/FloatingBehavior';
import SilverBalloonModel from '../../enemy/models/SilverBalloonModel';

class EnemyInitializer {
    private _scene: Scene;

    constructor(scene: Scene) {
        this._scene = scene;
    }

    createEnemy(position: Vector3, health: number): { model: EnemyModel, view: EnemyView } {
        const model = new EnemyModel(position, health);
        const view = new EnemyView(this._scene, model);
        return { model, view };
    }

    createBalloon(position: Vector3, health: number, color: Color3 = new Color3(1, 0, 0)): { 
        model: BalloonModel, view: BalloonView } {
        const model = new BalloonModel(position, health, color); // Use CopperBalloonModel for copper balloons
        const view = new BalloonView(this._scene, model);
        return { model, view };
    }

    createCopperBalloon(position: Vector3, health: number): { model: CopperBalloonModel, view: BalloonView } {
        const model = new CopperBalloonModel(position, health);
        const view = new BalloonView(this._scene, model);

        // Initialize and assign the FloatingBehavior
        const floatingBehavior = new FloatingBehavior(0.5, 2);
        model.behavior = floatingBehavior; // This automatically calls setModel within the behavior

        return { model, view };
    }

    createSilverBalloon(position: Vector3, health: number): { model: SilverBalloonModel, view: BalloonView } {
        const model = new SilverBalloonModel(position, health);
        const view = new BalloonView(this._scene, model);

        // Initialize and assign the FloatingBehavior
        const floatingBehavior = new FloatingBehavior(0.5, 2);
        model.behavior = floatingBehavior; // This automatically calls setModel within the behavior

        return { model, view };
    }

    // Additional methods to create other types of enemies can be added here
}

export default EnemyInitializer;