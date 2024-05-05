import Game from '../../game/Game';
import BaseBonusView from './BaseBonusView';

class ScoreBonusView extends BaseBonusView {
    public constructor() {
        super();
        this.createMesh();
    }

    createMesh(): void {
        // Create an instance of the BonusScore mesh
        this._mesh = Game.instance.assetManager.getBonusScoreMesh();
        this._mesh.setEnabled(true);
    }
}
export default ScoreBonusView;
