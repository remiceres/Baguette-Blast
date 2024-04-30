import { AbstractMesh, Color3, Mesh, MeshBuilder, StandardMaterial } from '@babylonjs/core';
import Game from '../game/Game';
import InputManager from '../inputs/InputManager';
import WeaponInterface from '../weapon/WeaponIInterface';

class Player {
    private _playerMesh: Mesh;

    private _inputManager: InputManager;

    private _leftHand: AbstractMesh;
    private _weaponLeft: WeaponInterface;

    private _rightHand: AbstractMesh;
    private _weaponRight: WeaponInterface;

    ///////////////////
    // Initilisation //
    ///////////////////

    constructor() {
        this._inputManager = Game.instance.inputManager;
        this._leftHand = Game.instance.inputManager.leftAnchor;
        this._rightHand = Game.instance.inputManager.rightAnchor;
        this._initializePlayerMesh();
    }

    private _initializePlayerMesh(): void {
        // Create a simple box to represent the player
        this._playerMesh = MeshBuilder.CreateBox('player', { size: 1 }, Game.instance.scene);
        this._playerMesh.parent = Game.instance.cameraManager.playerCamera;

        // Applying a basic color to the player mesh
        const material = new StandardMaterial('playerMaterial', Game.instance.scene);
        material.diffuseColor = new Color3(1, 0, 0); // Red color
        this._playerMesh.material = material;
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        deltaTime;

        this._fireWeapon();
    }

    private _fireWeapon(): void {
        // Fire weapon on right hand
        if (this._inputManager.rightPrimary.pressed && this._weaponRight) {
            this._weaponRight.fire();
        }
        // Fire weapon on left hand
        if (this._inputManager.leftPrimary.pressed && this._weaponLeft) {
            this._weaponLeft.fire();
        }
    }

    ///////////////
    // Functions //
    ///////////////

    public grabWeapon(hand: 'left' | 'right', weapon: WeaponInterface): void {
        if (hand === 'left') {
            this._weaponLeft = weapon;
            this._weaponLeft.grab(this._leftHand);
        } else {
            this._weaponRight = weapon;
            this._weaponRight.grab(this._rightHand);
        }
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        this._playerMesh.dispose();
    }
}

export default Player;
