import { AbstractMesh, Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import Game from '../Game';
import WeaponInterface from './WeaponIInterface';

class Ball implements WeaponInterface {
    private _mesh: Mesh;

    private _parent: AbstractMesh;

    constructor() {
        this._mesh = MeshBuilder.CreateSphere('ball_ref', { diameter: 0.25 }, Game.instance.scene);
    }

    fire(): void {
        const instance = this._mesh.createInstance('ball');
        instance.position = this._mesh.getAbsolutePosition();

        // temporary : Lifetime of the ball instance is 3 seconds
        setTimeout(() => {
            instance.dispose();
        }, 3000);
    }

    grap(hand: AbstractMesh): void {
        this._mesh.setParent(hand);
        this._mesh.position = Vector3.Zero();
    }

    throw(): void {
        this._mesh.setParent(null);
    }

    update(deltaTime: number): void {
        deltaTime;
    }

    dispose(): void {
        this._mesh.dispose();
    }
}

export default Ball;
