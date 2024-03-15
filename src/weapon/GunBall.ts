import { MeshBuilder, Vector3 } from '@babylonjs/core';
import AbstractBallProjector from './AbstractBallProjector';

class GunBall extends AbstractBallProjector {

    protected _durability: number = 10;

    constructor(projectile) {
        super(projectile);
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

export default GunBall;
