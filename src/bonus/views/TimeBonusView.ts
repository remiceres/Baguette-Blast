import Game from '../../game/Game';
import BaseBonusView from './BaseBonusView';

class TimeBonusView extends BaseBonusView {
    constructor() {
        super();
        this.createMesh();
    }

    createMesh(): void {
        // Create an instance of the BonusScore mesh
        this._mesh = Game.instance.assetManager.getBonusTimeInstance();
        this._mesh.setEnabled(true);
    }
}
export default TimeBonusView;
