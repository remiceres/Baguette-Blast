import { MeshBuilder, Vector3 } from '@babylonjs/core';
import WeaponView from './WeaponView';

class HandView extends WeaponView {
    constructor() {
        super();
    }

    _loadMesh() {
        const mesh = MeshBuilder.CreateBox('weapon', { size: 1.5 });
        mesh.scaling = new Vector3(0.1, 0.1, 0.5);
        return mesh;
    }
}
export default HandView;