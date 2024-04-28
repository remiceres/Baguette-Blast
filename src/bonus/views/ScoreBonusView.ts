import { Color3, Scene, StandardMaterial } from '@babylonjs/core';
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

        // Set the material properties for the mesh
        const material = new StandardMaterial('bonusMaterial', Game.instance.scene);
        material.diffuseColor = new Color3(1, 0, 0); // Set the color to white
        this._mesh.material = material;
    }
}
export default ScoreBonusView;
