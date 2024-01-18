import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, Color3 } from '@babylonjs/core';
import { EnemyFactory } from './enemy/EnemyFactory';
import { EnemyView } from './enemy/views/EnemyView';
import { EnemyController } from './enemy/controllers/EnemyController';

class App {
    private scene: Scene; // Declare scene as a class property
    private flyingEnemyController: EnemyController;
    private walkingEnemyController: EnemyController;

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
            this.walkingEnemyController.update(deltaTime);

            scene.render();
        });

        // Create enemies
        this.createEnemies();

    }

    private createEnemies(): void {
        // Create flying enemy
        const flyingEnemyModel = EnemyFactory.createEnemy('flying', new Vector3(0, 10, 0), 1, 100);
        const flyingEnemyView = new EnemyView(flyingEnemyModel, this.scene, Color3.Blue());
        this.flyingEnemyController = new EnemyController(flyingEnemyModel, flyingEnemyView);

        // Create walking enemy
        const walkingEnemyModel = EnemyFactory.createEnemy('walking', new Vector3(0, 0, 0), 3, 100);
        const walkingEnemyView = new EnemyView(walkingEnemyModel, this.scene, Color3.Red());
        this.walkingEnemyController = new EnemyController(walkingEnemyModel, walkingEnemyView);

        // Additional logic to place and animate enemies goes here
    }
}
new App();
