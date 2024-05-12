import { TransformNode, Vector3 } from '@babylonjs/core';
import { GUI3DManager, HolographicButton, PlanePanel } from 'babylonjs-gui';
import Game from '../../game/Game';
import State from '../EnumState';
import BaseState from './BaseState';

class PanelState extends BaseState {
    private _rows: number;
    private _cols: number;
    private _states: State[];
    private _names: string[];

    constructor(rows: number, cols: number, states: State[], names: string[]) {
        super();
        this._rows = rows;
        this._cols = cols;
        this._states = states;
        this._names = names;
    }

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
        panel.columns = this._cols;

        const anchor = new TransformNode('');
        manager.addControl(panel);
        panel.linkToTransformNode(anchor);
        panel.position.set(-1.35, 3, 11.5);
        panel.blockLayout = true;

        for (let i = 0; i < this._rows * this._cols; i++) {
            this._addButton(this._names[i], this._states[i], panel);
        }
        panel.blockLayout = false;
    }

    private _addButton(name: string, state: State, panel: PlanePanel): HolographicButton {
        const button = new HolographicButton('orientation');
        panel.addControl(button);
        this._buttons.push(button);
        button.text = name;
        button.onPointerClickObservable.add(() => Game.instance.stateManager.changeState(state));
        return button;
    }

    public update(deltaTime: number): void { deltaTime; }
}

export default PanelState;