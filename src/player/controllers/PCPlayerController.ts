import { ActionManager, ExecuteCodeAction, Scene, Vector3 } from '@babylonjs/core';
import PlayerModel from '../models/PlayerModel';

class PCPlayerController {
    private _model: PlayerModel;
    private _scene: Scene;
    private _movementSpeed: number;

    constructor(model: PlayerModel, scene: Scene, movementSpeed: number = 3) {
        this._model = model;
        this._scene = scene;
        this._movementSpeed = movementSpeed;

        this._setupKeyboardControls();
    }

    private _setupKeyboardControls(): void {
        // Ensure the scene has an action manager
        if (!this._scene.actionManager) {
            this._scene.actionManager = new ActionManager(this._scene);
        }

        // Mapping keys to movement directions
        const inputMap: { [key: string]: boolean } = {};
        this._scene.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
                console.log('Key Down: ' + evt.sourceEvent.key); // Add this line
                inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
            })
        );
        this._scene.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
                inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
            })
        );

        // Update model position based on input
        this._scene.onBeforeRenderObservable.add(() => {
            const deltaPosition = Vector3.Zero();
            if (inputMap['z'] || inputMap['ArrowUp']) {
                console.log('Moving forward'); // Add this line
                deltaPosition.z += this._movementSpeed;
            }
            if (inputMap['s'] || inputMap['ArrowDown']) {
                deltaPosition.z -= this._movementSpeed;
            }
            if (inputMap['q'] || inputMap['ArrowLeft']) {
                deltaPosition.x -= this._movementSpeed;
            }
            if (inputMap['d'] || inputMap['ArrowRight']) {
                deltaPosition.x += this._movementSpeed;
            }

            this._model.updatePosition(
                this._model.position.add(
                    deltaPosition.scale(
                        // Inside onBeforeRenderObservable callback
                        this._scene.getEngine().getDeltaTime() * 0.001
                    )
                )
            );
        });
    }

    public update(deltaTime: number): void {
        deltaTime; // Unused
        // Additional update logic if needed
    }

    // Add additional PC-specific methods here
}

export default PCPlayerController;
