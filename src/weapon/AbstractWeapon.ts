import { AbstractMesh, Vector3 } from '@babylonjs/core';
import ProjectileInterface from '../projectile/ProjectileInterface';
import WeaponInterface from './WeaponIInterface';

abstract class AbstractWeapon implements WeaponInterface {
    protected _durability: number;

    protected mesh: AbstractMesh;

    private _projectile: ProjectileInterface;
    protected _parent: AbstractMesh;

    protected _cooldownSecond = 1;
    private _timeSinceLastShot;

    private _isGrabed: boolean;

    constructor(projectile: ProjectileInterface) {
        this._projectile = projectile;
        this._timeSinceLastShot = this._cooldownSecond;
        this.mesh = this._loadMesh();
    }

    public getProjectiles(): AbstractMesh[] {
        return this._projectile.getProjectiles();
    }

    public fire(): void {
        if (!this._isGrabed) {
            console.log('weapon is not grabed');
            return;
        }

        // Check cooldown
        if (this._timeSinceLastShot < this._cooldownSecond) {
            console.log('cooldown');
            return;
        }

        // Check durability
        if (this._durability == 0) {
            console.log('weapon is broken');
            return;
        }

        // Fire
        this._timeSinceLastShot = 0;
        this._durability--;
        const position = this._parent.getAbsolutePosition();

        // Eloigne du joueur
        const { direction, force } = this._calculateThrowParameters();
        this._projectile.createNewInstance(position, direction, force);
    }

    protected abstract _calculateThrowParameters(): { direction: Vector3; force: number };

    protected abstract _loadMesh(): AbstractMesh;

    public grab(hand: AbstractMesh): void {
        this._isGrabed = true;
        this._parent = hand;
        this.mesh.parent = hand;
    }

    public throw(): void {
        this._isGrabed = false;
        this.mesh.parent = null;
    }

    public update(deltaTime: number): void {
        this._timeSinceLastShot += deltaTime;

        // Update projectile if grap
        if (this._isGrabed) {
            // TODO: To move out of the condition to avoid freeze
            this._projectile.update(deltaTime);
        }
    }

    public dispose(): void {
        this._projectile.dispose();
        this.mesh.dispose();
    }
}

export default AbstractWeapon;
