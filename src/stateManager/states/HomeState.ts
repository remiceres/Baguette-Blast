import Game from '../../game/Game';
import CustomUI from '../../UI/CustomUI';
import State from '../EnumState';
import BaseState from './BaseState';

class HomeState extends BaseState {
    public async init(): Promise<void> {
        this._scene = Game.instance.scene;
        this._setupGUI();
        this._initAudio();
    }

    private _initAudio(): void {
        Game.instance.mainTheme.play();
    }

    private _setupGUI(): void {
        if (!this._scene) {
            console.error('Scene not initialized');
            return;
        }

        const panel = CustomUI.addPanel(1, 3);
        panel.position.y = 3;
        panel.position.x = -1;
        const panelimg = CustomUI.changePanel('home');

        CustomUI.addButton('Select Level', State.SelectLevel, panel, panelimg);
        CustomUI.addButton('Settings', State.Settings, panel, panelimg);
        CustomUI.addButton('Credit', State.Credit, panel, panelimg);
    }

    public update(deltaTime: number): void {
        deltaTime;
    }

    public dispose(): void {}
}

export default HomeState;
