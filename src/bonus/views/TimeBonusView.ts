import { Color3, Scene, StandardMaterial } from '@babylonjs/core';
import Game from '../../Game';
import BonusView from './BonusView';

class TimeBonusView extends BonusView {
    constructor(scene: Scene) {
        super(scene);
        this.createMesh();
    }

    createMesh(): void {
        console.log('Creating TimeBonusMesh mesh');

        // Create an instance of the BonusScore mesh
        this._mesh = Game.instance.assetManager.getBonusTimeMesh();

        // Set the material properties for the mesh
        const material = new StandardMaterial('bonusMaterial', Game.instance.scene);
        material.diffuseColor = new Color3(0, 0, 1); // Set the color to white
        this._mesh.material = material;
    }
}
export default TimeBonusView;
