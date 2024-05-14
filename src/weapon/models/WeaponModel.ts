import { AbstractMesh } from '@babylonjs/core';
import ProjectileController from '../../projectile/controllers/ProjectileController';

abstract class WeaponModel {

    // Constants
    private _projectile: ProjectileController;
    private _durability: number = 100;
    private _cooldownSecond : number = 1;
    
    // Internal
    protected _parent: AbstractMesh;
    private _timeSinceLastShot : number = 0;
    private _isGrabed: boolean;


    constructor() {
    }

    // Getters
    public get projectile() {
        return this._projectile;
    }

    public get isGrabed() {
        return this._isGrabed;
    }

    public get timeSinceLastShot() {
        return this._timeSinceLastShot;
    }

    public get cooldownSecond() {
        return this._cooldownSecond;
    }

    public get durability() {
        return this._durability;
    }

    public get parent() {
        return this._parent;
    }

    // Setters
    public set projectile(projectile: ProjectileController) {
        this._projectile = projectile;
    }

    public set isGrabed(isGrabed: boolean) {
        this._isGrabed = isGrabed;
    }

    public set timeSinceLastShot(timeSinceLastShot: number) {
        this._timeSinceLastShot = timeSinceLastShot;
    }

    public set cooldownSecond(cooldownSecond: number) {
        this._cooldownSecond = cooldownSecond;
    }

    public set durability(durability: number) {
        this._durability = durability;
    }

    public set parent(parent: AbstractMesh) {
        this._parent = parent;
    }
}
export default WeaponModel;