import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';
import { EnemyModel } from '../models/EnemyModel';

/**
 * Represents the visual aspect of an enemy in the scene.
 */
class EnemyView {
    private _model: EnemyModel;
    private _scene: Scene;
    private _color: Color3;
    private _mesh: Mesh;

    /**
     * Constructs the EnemyView with a given model, scene, and color.
     * @param {EnemyModel} model - The model representing the enemy's logic and state.
     * @param {Scene} scene - The Babylon.js scene to which the enemy will be added.
     * @param {Color3} color - The color of the enemy.
     */
    constructor(model: EnemyModel, scene: Scene, color: Color3) {
        this._model = model;
        this._scene = scene;
        this._color = color;

        this._createMesh();
    }

    /**
     * Creates the mesh representing the enemy.
     */
    private _createMesh(): void {
        this._mesh = MeshBuilder.CreateSphere('enemyMesh', { diameter: 2 }, this._scene);
        this._mesh.position = new Vector3(0, 0, 0);

        this._mesh.material = new StandardMaterial('enemyMaterial', this._scene);
        (this._mesh.material as StandardMaterial).diffuseColor = this._color;
    }

    /**
     * Updates the enemy's view to reflect the current state of the model.
     */
    public update(): void {
        this._mesh.position = this._model.getPosition();
        // Additional updates based on the model's state can be added here
    }

    /**
     * Disposes of the mesh and any other resources used by the view.
     */
    public dispose(): void {
        this._mesh.dispose();
    }
}

export { EnemyView };
