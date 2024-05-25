import { AbstractMesh, Vector3 } from '@babylonjs/core';
import { AnimationName } from '../../game/controllers/AnimationController';
import Game from '../../game/Game';
import BaseEnemyView from './BaseEnemyView';

class PigeonView extends BaseEnemyView {
    constructor() {
        super();
    }

    protected _createMesh(): AbstractMesh {
        const mesh = Game.instance.assetManager.getFlyingPigeonInstance();

        Game.instance.animationManager.playAnimation(mesh, AnimationName.pigeonQueue);
        Game.instance.animationManager.playAnimation(mesh, AnimationName.pigeonLeftWing);
        Game.instance.animationManager.playAnimation(mesh, AnimationName.pigeonRightWing);

        Game.instance.scene.beginAnimation(mesh, 0, 100, true, 1);

        return mesh;
    }

    protected _killAnimation(): void {}

    public update(): void {
        this.mesh.lookAt(Game.instance.player.positionHead);
        this.mesh.rotate(Vector3.Up(), Math.PI);
    }
}
export default PigeonView;
