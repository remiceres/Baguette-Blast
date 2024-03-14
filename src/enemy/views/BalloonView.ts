import { MeshBuilder, StandardMaterial, Scene } from '@babylonjs/core';
import { BaseView } from './BaseView';
import BalloonModel from '../models/BalloonModel';

class BalloonView extends BaseView {
    private _model: BalloonModel;

    constructor(scene: Scene, model: BalloonModel) {
        super(scene);
        this._model = model;
        this.createMesh();
    }

    createMesh(): void {
        this._mesh = MeshBuilder.CreateSphere('balloonMesh', { diameter: 1 }, this._scene);
        const material = new StandardMaterial('balloonMaterial', this._scene);
        material.diffuseColor = this._model.color; // Use color from the model
        this._mesh.material = material;
        this._mesh.position = this._model.position; // Use position from the model
    }
}

export default BalloonView;