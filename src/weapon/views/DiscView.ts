// DiscView.ts
import { Mesh, Scene, MeshBuilder, StandardMaterial, Color3 } from '@babylonjs/core';
import { DiscModel } from '../models/DiscModel';

export class DiscView {
    private _model: DiscModel;
    private _mesh: Mesh;

    constructor(model: DiscModel, scene: Scene) {
        this._model = model;
        this._mesh = MeshBuilder.CreateDisc('disc', {radius: 1, tessellation: 32}, scene);
        this._setupDiscAppearance();
    }

    private _setupDiscAppearance() {
        const material = new StandardMaterial('discMaterial', this._mesh.getScene());
        material.diffuseColor = new Color3(1, 0, 0); // Red color
        this._mesh.material = material;
    }

    public get mesh(): Mesh {
        return this._mesh;
    }

    // Additional methods to update or animate the disc's appearance
}
