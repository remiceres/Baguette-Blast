import { Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import Game from '../../Game';
import Buttons from '../../menu/buttons';
import State from '../EnumState';
import StateInterface from './StateInterface';
import PlayerController from '../../player/controllers/PlayerController';
import PlayerView from '../../player/views/PlayerViews';
import PlayerModel from '../../player/models/PlayerModels';
import GunBall from '../../weapon/GunBall';
import BallProjectile from '../../projectile/BallProjectile';

class LevelTest1State implements StateInterface {
    private _cubeMenu: Mesh;

    private _playerController: PlayerController;

    public async init(): Promise<void> {
        this._initInterface();
        this._initPlayerController();
        return Promise.resolve();
    }

    private _initInterface(): void {
        this._cubeMenu = MeshBuilder.CreateBox('cubeMenu', { size: 1 }, Game.instance.scene);
        this._cubeMenu.position = new Vector3(0, 1, 0);
        Buttons.clickable(Game.instance.scene, this._cubeMenu, () => {
            Game.instance.stateManager.changeState(State.MenuHome);
        });
    }

    private _initPlayerController(): void {
        this._playerController = new PlayerController(new PlayerModel, new PlayerView);

        const projectile = new BallProjectile();
        const weapon = new GunBall(projectile);

        this._playerController.setWeapon('right', weapon);
    }
        
    update(deltaTime: number): void {
        this._playerController.update(deltaTime);
        deltaTime;
    }

    dispose(): void {
        this._cubeMenu.dispose();
        this._playerController.dispose();
    }
}

export default LevelTest1State;
