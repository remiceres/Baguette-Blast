import { AbstractMesh, Vector3 } from '@babylonjs/core';
import ProjectileInterface from '../projectile/ProjectileInterface';
import WeaponInterface from './WeaponIInterface';

abstract class AbstractBallProjector implements WeaponInterface {
    protected _force: number = 10;

    protected _durability: number;

    protected mesh: AbstractMesh;

    private _projectile: ProjectileInterface;
    protected _prarent: AbstractMesh;

    protected _cooldownSecond = 1;
    private _timeSinceLastShot;

    private _isGraped: boolean;

    constructor(projectile: ProjectileInterface) {
        this._projectile = projectile;
        this._timeSinceLastShot = this._cooldownSecond;
        this.mesh = this._loadMesh();
    }

    public fire(): void {
        if (!this._isGraped) {
            return;
        }

        // check cooldown
        if (this._timeSinceLastShot < this._cooldownSecond) {
            return;
        }

        // check durability
        if (this._durability == 0) {
            return;
        }

        // fire
        this._timeSinceLastShot = 0;
        this._durability--;
        console.log(this._durability);
        const position = this._prarent.getAbsolutePosition();

        // eloigne du joueur
        const { direction, force } = this._calculateThrowParameters();
        this._projectile.fire(position, direction, force);
    }

    protected abstract _calculateThrowParameters(): { direction: Vector3; force: number };

    protected abstract _loadMesh(): AbstractMesh;

    public grap(hand: AbstractMesh): void {
        this._isGraped = true;
        this._prarent = hand;
        this.mesh.parent = hand;
    }

    public throw(): void {
        this._isGraped = false;
        this.mesh.parent = null;
    }

    public update(deltaTime: number): void {
        this._timeSinceLastShot += deltaTime;

        // check durability
        if (this._durability == 0) {
            // this.dispose();
            console.log('weapon is broken');
        }

        // update projectile if grap
        if (this._isGraped) {
            this._projectile.update(deltaTime);
        }
    }

    public dispose(): void {
        this._projectile.dispose();
        this.mesh.dispose();

    }
}

export default AbstractBallProjector;
