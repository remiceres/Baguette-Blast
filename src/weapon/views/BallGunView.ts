import { AbstractMesh, Vector3 } from '@babylonjs/core';
import Game from '../../game/Game';
import GunView from './LaserGunView';

class BallGunView extends GunView {
    /////////////////
    // Constructor //
    /////////////////

    constructor() {
        super();
    }

    protected _createMesh(): AbstractMesh {
        const mesh = Game.instance.assetManager.getBallGunInstance();
        mesh.position = new Vector3(0, 0, 0.5);
        mesh.rotate(Vector3.Up(), -Math.PI / 2);

        return mesh;

        // const mesh = MeshBuilder.CreateBox('ball_gun', { size: 1 }, Game.instance.scene);
        // mesh.scaling = new Vector3(0.1, 0.1, 0.5);
        // return mesh;
    }
}
export default BallGunView;
