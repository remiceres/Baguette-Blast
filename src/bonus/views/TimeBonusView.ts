import { Scene } from '@babylonjs/core';
import Game from '../../Game';
import BonusView from './BonusView';

class TimeBonusView extends BonusView {
    constructor(scene: Scene) {
        super(scene);
        this.createMesh();
    }

    createMesh(): void {
        // Create an instance of the BonusScore mesh
        this._mesh = Game.instance.assetManager.getBonusTimeMesh();
    }
}
export default TimeBonusView;
