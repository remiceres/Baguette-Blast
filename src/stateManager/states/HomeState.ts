import Game from '../../game/Game';
import BaseState from './BaseState';
import CustomUI from '../../UI/CustomUI';
import State from '../EnumState';
import { Vector3 } from '@babylonjs/core';

class HomeState extends BaseState {

    public async init(): Promise<void> {
        this._scene = Game.instance.scene;
        this._setupCamera();
        this._setupGUI();
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

        const panel = CustomUI.addPanel(1, 3);

        CustomUI.createTextZone(['Baguette Blast'], new Vector3(1.5, 4.8, 11.5), 2, 1);

        CustomUI.addButton('Select Level', State.SelectLevel, panel);
        CustomUI.addButton('Settings', State.Settings, panel);
        CustomUI.addButton('Credit', State.Credit, panel);
    }

    public update(deltaTime: number): void { deltaTime; }
}

export default HomeState;
