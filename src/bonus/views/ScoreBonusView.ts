import { Scene } from '@babylonjs/core';
import Game from '../../Game';
import BonusView from './BonusView';

class ScoreBonusView extends BonusView {
    constructor(scene: Scene) {
        super(scene);
        this.createMesh();
    }

    createMesh(): void {
        console.log('Creating ScoreBonus mesh');

        // Create an instance of the BonusScore mesh
        this._mesh = Game.instance.assetManager.getBonusScoreMesh();
    }
}
export default ScoreBonusView;
