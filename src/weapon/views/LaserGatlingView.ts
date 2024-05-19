import { AbstractMesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import GunView from './LaserGunView';

class LaserGatlingView extends GunView {
    /////////////////
    // Constructor //
    /////////////////

    constructor() {
        super();
    }

    protected _createMesh(): AbstractMesh {
        const mesh = MeshBuilder.CreateBox('laser_gatling', { size: 2 });
        mesh.scaling = new Vector3(0.1, 0.1, 0.5);
        return mesh;
    }
}

export default LaserGatlingView;
