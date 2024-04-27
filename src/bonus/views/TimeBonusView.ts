import { Color3, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';
import BonusView from './BonusView';
import Game from '../../Game';

class TimeBonusView extends BonusView {
    constructor(scene: Scene) {
        super(scene);
        this.createMesh();
    }

    createMesh(): void {
        // Retrieve the BonusTime mesh from the asset manager
        const meshBonus = Game.instance.assetManager.dictModels.get('BonusScore');
        if (!meshBonus) {
            console.error('Failed to load the bonus asset!');
            return;
        }
    
        // Create an instance of the BonusTime mesh
        this._mesh = meshBonus.createInstance('bonusMesh');
        this._mesh.isVisible = true;
        this._mesh.position = Vector3.Zero();

        // Scale the mesh and rotate it
        this._mesh.scaling = new Vector3(0.5, 0.5, 0.5);
        this._mesh.rotation = new Vector3(Math.PI / 2, 0, 0);
    
        // Set the material properties for the mesh
        const material = new StandardMaterial('bonusMaterial', Game.instance.scene);
        material.diffuseColor = new Color3(1, 1, 1); // Set the color to white
        this._mesh.material = material;
    } 
}
export default TimeBonusView;