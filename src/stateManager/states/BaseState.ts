import { Scene } from '@babylonjs/core';
import { AdvancedDynamicTexture, HolographicButton } from 'babylonjs-gui';
import StateInterface from './StateInterface';

abstract class BaseState implements StateInterface {
    protected _scene: Scene;
    protected _gui: AdvancedDynamicTexture;
    protected _buttons: HolographicButton[] = [];

    abstract init(): Promise<void>;
    abstract update(deltaTime: number): void;

    public dispose(): void {
        this._buttons.forEach(button => button.dispose());
        this._buttons = [];
    }
}
export default BaseState;