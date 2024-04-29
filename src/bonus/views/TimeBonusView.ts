import { Scene } from '@babylonjs/core';
import Game from '../../game/Game';
import BaseBonusView from './BaseBonusView';

class TimeBonusView extends BaseBonusView {
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
