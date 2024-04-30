import { MeshBuilder, Vector3 } from '@babylonjs/core';
import AbstractWeapon from './AbstractWeapon';

class Gun extends AbstractWeapon {
    protected _durability: number = 10;
    protected _force: number;

    constructor(projectile, force) {
        super(projectile);
        this._force = force;
    }

    protected _calculateThrowParameters() {
        return {
            direction: this._parent.forward,
            force: this._force,
        };
    }

    protected _loadMesh() {
        const mesh = MeshBuilder.CreateBox('gun', { size: 0.5 });
        mesh.scaling = new Vector3(0.1, 0.1, 0.5);
        return mesh;
    }

    public update(deltaTime) {
        super.update(deltaTime);
    }

    public dispose() {
        this.mesh.dispose();
    }
}

export default Gun;
