import { Mesh, MeshBuilder, Scene, Color3, Vector3, StandardMaterial } from '@babylonjs/core';
import { EnemyModel } from '../models/EnemyModel';

class EnemyView {
    private model: EnemyModel;
    private scene: Scene;
    private color: Color3;
    private mesh: Mesh;

    constructor(model: EnemyModel, scene: Scene, color: Color3) {
        this.model = model;
        this.scene = scene;
        this.color = color;

        this.createMesh();
    }

    private createMesh(): void {
        // Creating a simple sphere to represent the enemy
        this.mesh = MeshBuilder.CreateSphere('enemyMesh', { diameter: 2 }, this.scene);
        this.mesh.position = new Vector3(0, 0, 0); // Initial position, can be modified based on model data

        // Setting the color of the mesh based on enemy type
        this.mesh.material = new StandardMaterial('enemyMaterial', this.scene);
        (this.mesh.material as StandardMaterial).diffuseColor = this.color;
    }

    // Update the view based on the model's state
    public update(): void {
        // Update the mesh position, rotation, etc., based on the model's state
        // Example: this.mesh.position = this.model.getPosition();
        this.mesh.position = this.model.getPosition();
    }
}

export { EnemyView };
