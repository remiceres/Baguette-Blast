import { Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import Game from '../../Game';
import Buttons from '../../menu/buttons';
import State from '../EnumState';
import StateInterface from './StateInterface';

class LevelTest1State implements StateInterface {
    private _cubeMenu: Mesh;

    public async init(): Promise<void> {
        this._initInterface();

        return Promise.resolve();
    }

    private _initInterface(): void {
        this._cubeMenu = MeshBuilder.CreateBox('cubeMenu', { size: 1 }, Game.instance.scene);
        this._cubeMenu.position = new Vector3(0, 1, 0);
        Buttons.clickable(Game.instance.scene, this._cubeMenu, () => {
            Game.instance.stateManager.changeState(State.MenuHome);
        });
    }

    dispose(): void {
        this._cubeMenu.dispose();
    }

    animate(deltaTime: number): void {
        deltaTime;
    }
}

export default LevelTest1State;
