import Game from '../../game/Game';
import State from '../EnumState';
import BaseState from './BaseState';
import CustomUI from '../../UI/CustomUI';
import { Vector3 } from '@babylonjs/core';

class DialogueState extends BaseState {
    private _text: string;
    private _backState: State;

    constructor(text: string, backState: State) {
        super();
        this._text = text;
        this._backState = backState;
    }

    public async init(): Promise<void> {
        this._scene = Game.instance.scene;
        this._setupCamera();
        this._setupGUI();
        return Promise.resolve();
    }

    private _setupCamera(): void {
        const camera = Game.instance.cameraManager.playerCamera;
        camera.position = new Vector3(CustomUI.panelCenter.x, CustomUI.panelCenter.y, 4);
        camera.setTarget(new Vector3(CustomUI.panelCenter.x, CustomUI.panelCenter.y, 5));
    }

    private _setupGUI(): void {
        if (!this._scene) {
            console.error('Scene not initialized');
            return;
        }

        const panel = CustomUI.addPanel(1, 1);
        CustomUI.createTextZone([this._text], CustomUI.panelTextTopRight, 2, 1);
        CustomUI.addButton('Back', this._backState, panel);
    }

    public update(deltaTime: number): void { deltaTime; }
}

export default DialogueState;
