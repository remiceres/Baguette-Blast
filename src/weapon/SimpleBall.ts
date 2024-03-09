import { AbstractMesh } from '@babylonjs/core';
import ProjectileInterface from '../projectile/ProjectileInterface';
import WeaponInterface from './WeaponIInterface';

class SimpleBall implements WeaponInterface {
    private _projectile: ProjectileInterface;
    private _prarent: AbstractMesh;

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
        const direction = this._prarent.forward;
        this._projectile.fire(position, direction);
    }

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

export default SimpleBall;
