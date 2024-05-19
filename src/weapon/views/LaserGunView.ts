import { AbstractMesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import Game from '../../game/Game';
import WeaponView from './WeaponView';

class LaserGunView extends WeaponView {
    /////////////////
    // Constructor //
    /////////////////

    constructor() {
        super();
    }

    protected _createMesh(): AbstractMesh {
        const mesh = MeshBuilder.CreateBox('laser_gun', { size: 1 }, Game.instance.scene);
        mesh.scaling = new Vector3(0.1, 0.1, 0.5);
        return mesh;
    }
}
export default LaserGunView;
