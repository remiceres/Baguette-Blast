// DiscController.ts
import { Scene, Vector3 } from '@babylonjs/core';
import { DiscModel } from '../models/DiscModel';
import { DiscView } from '../views/DiscView';

export class DiscController {
    private _model: DiscModel;
    private _view: DiscView;
    private _scene: Scene;
    private _velocity: Vector3;

    constructor(model: DiscModel, view: DiscView, scene: Scene) {
        this._model = model;
        this._view = view;
        this._scene = scene;
        this._velocity = new Vector3(0, 0, 0); // Initial velocity
        // Further initialization
    }

    public throwDisc(direction: Vector3, speed: number): void {
        this._velocity = direction.normalize().scale(speed);
        // Additional logic for throwing the disc
    }

    public update(deltaTime: number): void {
        this._view.mesh.position.addInPlace(this._velocity.scale(deltaTime));
        // Additional update logic, e.g., checking for collisions
    }
}
