import Game from '../../game/Game';
import BaseState from './BaseState';
import CustomUI from '../../UI/CustomUI';
import State from '../EnumState';

class LevelSelectState extends BaseState {

    public async init(): Promise<void> {
        this._scene = Game.instance.scene;
        this._setupCamera();
        this._setupGUI();
        return Promise.resolve();
    }

    private _setupCamera(): void {
        // const camera = Game.instance.cameraManager.playerCamera;
        // camera.position = new Vector3(-1.5, 3, 4);
        // camera.setTarget(new Vector3(-1.5, 3, 5));
    }

    private _setupGUI(): void {
        if (!this._scene) {
            console.error('Scene not initialized');
            return;
        }

        const panel = CustomUI.addPanel(3, 3);

        // Level 1 to 6 + Home
        CustomUI.addButton('Level 4', State.Level4, panel);
        CustomUI.addButton('Level 5', State.Level5, panel);
        CustomUI.addButton('Level 6', State.Level6, panel);
        CustomUI.addButton('Level 1', State.Level1, panel);
        CustomUI.addButton('Level 2', State.Level2, panel);
        CustomUI.addButton('Level 3', State.Level3, panel);
        CustomUI.addButton('Home', State.Home, panel);

    }

    public update(deltaTime: number): void { deltaTime; }
}

export default LevelSelectState;