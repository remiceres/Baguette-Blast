import { Mesh } from '@babylonjs/core';

class WallModel {
    private _hitbox: Mesh;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(hitbox: Mesh) {
        this._hitbox = hitbox;
    }

    ///////////////
    // Accessors //
    ///////////////

    public get hitbox(): Mesh {
        return this._hitbox;
    }
}

export default WallModel;
