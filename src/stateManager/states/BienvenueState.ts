import { TargetCamera, Vector3 } from '@babylonjs/core';
import Game from '../../game/Game';
import CustomUI from '../../UI/CustomUI';
import State from '../EnumState';
import BaseState from './BaseState';

class BienvenueState extends BaseState {
    private _camera: TargetCamera;

    public async init(): Promise<void> {
        this._scene = Game.instance.scene;
        this._setupGUI();
        this._setupEnvironment();
        this._setupCamera();
        return Promise.resolve();
    }

    private _setupEnvironment(): void {
        const environment = Game.instance.environmentControllers;
        environment.cycleDuration = 1800;
        // Randon between [0 - 0.25] and [0.75 - 1] to have a day each time
        environment.pourcentageOfDay = Math.random() < 0.5 ? Math.random() * 0.25 : Math.random() * 0.25 + 0.75;
    }

    private _setupGUI(): void {
        if (!this._scene) {
            console.error('Scene not initialized');
            return;
        }

        const panel = CustomUI.addPanel(1, 1);
        const panelimg = CustomUI.changePanel('bienvenue');

        if (Game.instance.supportedVR) {
            CustomUI.addButton('Let s Gooo!', State.Home, panel, panelimg, true);
        } else {
            CustomUI.addButton('Let s Gooo!', State.NoVr, panel, panelimg, true);
        }
    }

    private _setupCamera(): void {
        this._camera = Game.instance.cameraManager.playerCamera;
        this._camera.position = new Vector3(-0.74, 3.6, 5.22);
        this._camera.setTarget(new Vector3(-0.74, 3.59, 7.45));
        this._camera.detachControl();
    }

    public update(deltaTime: number): void {
        deltaTime;
    }

    public dispose(): void {
        this._camera.attachControl();
    }
}

export default BienvenueState;
