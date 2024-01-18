import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, Color3 } from '@babylonjs/core';
import { EnemyFactory } from './enemy/EnemyFactory';
import { EnemyView } from './enemy/views/EnemyView';
import { EnemyController } from './enemy/controllers/EnemyController';
import { FlyingBehavior } from './enemy/controllers/FlyingBehavior';
import { WalkingBehavior } from './enemy/controllers/WalkingBehavior';
import { EnemyModel } from './enemy/models/EnemyModel';
import { SeekingBehavior } from './enemy/controllers/SeekingBehavior';

class App {
    private scene: Scene; // Declare scene as a class property
    private flyingEnemyController: EnemyController;
    private walkingEnemyController: EnemyController;
    private seekingEnemyController: EnemyController;
    // Not really MVC
    private flyingEnemyModel: EnemyModel; // Keep reference to the flying enemy model


    constructor() {
        // create the canvas html element and attach it to the webpage
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.id = 'gameCanvas';
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        const engine = new Engine(canvas, true);
        const scene = new Scene(engine);

        const camera: ArcRotateCamera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 100, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        const light1: HemisphericLight = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);

        // hide/show the Inspector
        window.addEventListener('keydown', (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.key === 'i') {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            const deltaTime = engine.getDeltaTime() / 1000.0; // Convert to seconds

            this.flyingEnemyController.update(deltaTime);
            this.seekingEnemyController.update(deltaTime);
            this.walkingEnemyController.update(deltaTime);
        
            scene.render();
        });

        // Create enemies
        this.createEnemies();

    }

    private createEnemies(): void {
        // Keep reference to the flying enemy model
        this.flyingEnemyModel = EnemyFactory.createEnemy('flying', new Vector3(0, 10, 0), 1, 100, new FlyingBehavior());
        const flyingEnemyView = new EnemyView(this.flyingEnemyModel, this.scene, Color3.Blue());
        this.flyingEnemyController = new EnemyController(this.flyingEnemyModel, flyingEnemyView);

        // Create seeking enemy
        const seekingEnemyModel = EnemyFactory.createEnemy('flying', new Vector3(0, 0, 0), 5, 100, new SeekingBehavior(this.flyingEnemyModel));
        const seekingEnemyView = new EnemyView(seekingEnemyModel, this.scene, Color3.Green()); // Choose a color for seeking enemy
        this.seekingEnemyController = new EnemyController(seekingEnemyModel, seekingEnemyView);

        // Create walking enemy
        const walkingEnemyModel = EnemyFactory.createEnemy('walking', new Vector3(0, 0, 0), 3, 100, new WalkingBehavior());
        const walkingEnemyView = new EnemyView(walkingEnemyModel, this.scene, Color3.Red());
        this.walkingEnemyController = new EnemyController(walkingEnemyModel, walkingEnemyView);

        // Additional logic to place and animate enemies goes here
    }
}
new App();
