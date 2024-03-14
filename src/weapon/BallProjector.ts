import { AbstractMesh, Vector3 } from '@babylonjs/core';
import ProjectileInterface from '../projectile/ProjectileInterface';
import WeaponInterface from './WeaponIInterface';

abstract class BallProjector implements WeaponInterface {
    private _projectile: ProjectileInterface;
    protected _prarent: AbstractMesh;

    private _cooldownSecond = 1;
    private _timeSinceLastShot;

    private _isGraped: boolean;

    constructor(projectile: ProjectileInterface) {
        this._projectile = projectile;
        this._timeSinceLastShot = this._cooldownSecond;
    }

    public fire(): void {
        if (!this._isGraped) {
            return;
        }

        // check cooldown
        if (this._timeSinceLastShot < this._cooldownSecond) {
            return;
        }

        // fire
        this._timeSinceLastShot = 0;
        const position = this._prarent.getAbsolutePosition();
        // eloigne du joueur
        const { direction, force } = this._calculateThrowParameters();
        this._projectile.fire(position, direction, force);
    }

    protected abstract _calculateThrowParameters(): { direction: Vector3; force: number };

    public grap(hand: AbstractMesh): void {
        this._isGraped = true;
        this._prarent = hand;
    }

    public throw(): void {
        this._isGraped = false;
    }

    public update(deltaTime: number): void {
        this._timeSinceLastShot += deltaTime;

        if (this._isGraped) {
            this._projectile.update(deltaTime);
        }
    }

    public dispose(): void {
        this._projectile.dispose();
    }
}

export default BallProjector;
