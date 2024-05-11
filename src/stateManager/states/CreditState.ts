import { TransformNode, Vector3 } from '@babylonjs/core';
import { GUI3DManager, HolographicButton, PlanePanel } from 'babylonjs-gui';
import Game from '../../game/Game';
import State from '../EnumState';
import BaseState from './BaseState';

class CreditState extends BaseState {

    public async init(): Promise<void> {
        this._scene = Game.instance.scene;
        this._setupCamera();
        this._setupGUI();
        return Promise.resolve();
    }

    private _setupCamera(): void {
        const camera = Game.instance.cameraManager.playerCamera;
        camera.position = new Vector3(-1.5, 3, 4);
        camera.setTarget(new Vector3(-1.5, 3, 5));
    }

    private _setupGUI(): void {
        if (!this._scene) {
            console.error('Scene not initialized');
            return;
        }

        const manager = new GUI3DManager(this._scene);
        const panel = new PlanePanel();
        panel.margin = 0.2;
        panel.columns = 3;

        const anchor = new TransformNode('');
        manager.addControl(panel);
        panel.linkToTransformNode(anchor);
        panel.position.set(-1.35, 3, 11.5);
        panel.blockLayout = true;

        this._addText('Thanks to...', panel);
        this._addText('...', panel);
        this._addButton('Back', State.Home, panel);
    }

    private _addButton(name: string, state: State, panel: PlanePanel): HolographicButton {
        const button = new HolographicButton('orientation');
        panel.addControl(button);
        this._buttons.push(button);
        button.text = name;
        button.onPointerClickObservable.add(() => Game.instance.stateManager.changeState(state));
        return button;
    }

    private _addText(name: string, panel: PlanePanel): HolographicButton {
        const button = new HolographicButton('orientation');
        panel.addControl(button);
        this._buttons.push(button);
        button.text = name;
        return button;
    }

    public update(deltaTime: number): void { deltaTime; }
}

export default CreditState;