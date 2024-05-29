import { Scene } from '@babylonjs/core';
import { AdvancedDynamicTexture } from 'babylonjs-gui';
import StateInterface from './StateInterface';

abstract class BaseState implements StateInterface {
    protected _scene: Scene;
    protected _gui: AdvancedDynamicTexture;

    abstract init(): Promise<void>;
    abstract update(deltaTime: number): void;
    abstract dispose(): void;
}
export default BaseState;
