import Game from '../../game/Game';
import CustomUI from '../../UI/CustomUI';
import State from '../EnumState';
import BaseState from './BaseState';

class LevelSelectState extends BaseState {
    public async init(): Promise<void> {
        this._scene = Game.instance.scene;
        this._setupGUI();
        return Promise.resolve();
    }

    private _setupGUI(): void {
        if (!this._scene) {
            console.error('Scene not initialized');
            return;
        }

        const panel = CustomUI.addPanel(3, 3);

        panel.position.y = 3.5;
        panel.position.x = -1;

        // Level 1 to 6 + Home
        // Example of using addButton with images:
        const panelimg = CustomUI.changePanel('lvlselect');
        CustomUI.addButton('Level 4', State.Dialogue4, panel, panelimg);
        CustomUI.addButton('Level 5', State.Dialogue5, panel, panelimg);
        CustomUI.addButton('Level 6', State.Dialogue6, panel, panelimg);
        CustomUI.addButton('Level 1', State.Dialogue1, panel, panelimg);
        CustomUI.addButton('Level 2', State.Dialogue2, panel, panelimg);
        CustomUI.addButton('Level 3', State.Dialogue3, panel, panelimg);
        CustomUI.addButton('Home', State.Home, panel, panelimg);
    }

    public update(deltaTime: number): void {
        deltaTime;
    }

    public dispose(): void {}
}

export default LevelSelectState;
