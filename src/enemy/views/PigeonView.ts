import { AbstractMesh, Color3, MeshBuilder, StandardMaterial } from '@babylonjs/core';
import Game from '../../game/Game';
import BalloonView from './BalloonView';

class PigeonView extends BalloonView {
    constructor() {
        super();
    }

    protected _createMesh(): AbstractMesh {
        const mesh = MeshBuilder.CreateBox('enemyMesh', { size: 1 }, Game.instance.scene);
        const material = new StandardMaterial('enemyMaterial', Game.instance.scene);
        material.diffuseColor = new Color3(1, 0, 0);
        mesh.material = material;

        return mesh;
    }
}
export default PigeonView;
