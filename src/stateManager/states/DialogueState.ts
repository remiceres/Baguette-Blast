import { Color3, TransformNode, Vector3 } from '@babylonjs/core';
import { GUI3DManager, HolographicButton, PlanePanel } from 'babylonjs-gui';
import Game from '../../game/Game';
import State from '../EnumState';
import BaseState from './BaseState';

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
        panel.columns = 1;  // Single column for a simple vertical layout

        const anchor = new TransformNode('');
        manager.addControl(panel);
        panel.linkToTransformNode(anchor);
        panel.position.set(-1.35, 3, 11.5);
        panel.blockLayout = true;

        this._addText(this._text, panel);
        this._addButton('Back', this._backState, panel);

        panel.blockLayout = false;
    }

    private _addButton(name: string, state: State, panel: PlanePanel): HolographicButton {
        const button = new HolographicButton('button');
        panel.addControl(button);
        this._buttons.push(button);
        button.text = name;
        button.onPointerClickObservable.add(() => Game.instance.stateManager.changeState(state));
        return button;
    }

    private _addText(text: string, panel: PlanePanel): void {
        const textButton = new HolographicButton('textLabel');
        panel.addControl(textButton);
        this._buttons.push(textButton);  
    
        textButton.text = text;
        // textButton.fontSize = 24;  // Set as per your design needs
        // textButton.color =  'white ';
        // textButton.isEnabled = false;  // Make it non-interactive
        textButton.backMaterial.albedoColor = Color3.FromHexString( '#00000000 '); 
    }

    public update(deltaTime: number): void { deltaTime; }
}

export default DialogueState;
