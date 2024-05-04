import { MeshBuilder, StandardMaterial, Vector3, ParticleSystem, Texture } from '@babylonjs/core';
import BaseEnemyView from './BaseEnemyView';
import BalloonModel from '../models/BalloonModel';
import Game from '../../game/Game';

class BalloonView extends BaseEnemyView {
    private _model: BalloonModel;

    constructor(model: BalloonModel) {
        super(Game.instance.scene);
        this._model = model;
        this.createMesh();
    }

    onKill(): void {
        // Create a particle system
        const particleSystem = new ParticleSystem('particles', 1000, this._scene); 
        
        // Texture of each particle
        particleSystem.particleTexture = new Texture('assets/textures/patricles/particle.png', Game.instance.scene);
        
        // Where the particles come from
        particleSystem.emitter = this._mesh.position; // the starting location
    
        // Colors of all particles
        // particleSystem.color1 = new Color4(1, 0.1, 0.1, 1); // vibrant red
        // particleSystem.color2 = new Color4(1, 0.6, 0.1, 1); // vibrant orange
        // particleSystem.colorDead = new Color4(0, 0, 0, 0); // fades to transparent
    
        // Size of each particle
        particleSystem.minSize = 0.02;
        particleSystem.maxSize = 0.2;
    
        // Life time of each particle (in seconds)
        particleSystem.minLifeTime = 0.1;
        particleSystem.maxLifeTime = 0.3;
    
        // Emission rate
        particleSystem.emitRate = 1000;
    
        // Blend mode for an explosive visual effect
        particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
    
        // Set the gravity of all particles
        particleSystem.gravity = new Vector3(0, -9.81, 0);
    
        // Direction of each particle after it has been emitted
        // Emit in all directions by defining a wide range in both negative and positive directions
        particleSystem.direction1 = new Vector3(-7, -7, -7);
        particleSystem.direction2 = new Vector3(7, 7, 7);
    
        // Angular speed, in radians
        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI;
    
        // Speed
        particleSystem.minEmitPower = 2;
        particleSystem.maxEmitPower = 4;
        particleSystem.updateSpeed = 0.01;
    
        // Start the particle system
        particleSystem.start();
    
        // Stop the particle system after 0.5 seconds to reduce the duration of the explosion
        setTimeout(() => {
            particleSystem.stop();
        }, 500);
    
        // Optionally dispose the mesh
        this._mesh.dispose();

        Game.instance.audioManager.playSoundEffect('explosion');
    }    

    createMesh(): void {
        this._mesh = MeshBuilder.CreateSphere('balloonMesh', { diameter: 1 }, this._scene);
        const material = new StandardMaterial('balloonMaterial', this._scene);
        material.diffuseColor = this._model.color; // Use color from the model
        this._mesh.material = material;
        this._mesh.position = this._model.position; // Use position from the model
        this._mesh.metadata = {};
    }
}

export default BalloonView;