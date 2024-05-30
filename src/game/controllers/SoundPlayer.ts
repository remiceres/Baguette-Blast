import { Scene, Sound, AbstractMesh, InstancedMesh, Vector3, Engine } from '@babylonjs/core';
import data from '../../../public/assets/sounds/sounds.json';
import Game from '../../game/Game';

export class SoundPlayer {
    private _id: string;
    private _mesh: AbstractMesh;
    private _sound: Sound;

    private _curentTime: number = 0;

    public constructor(name: string, scene: Scene, mesh?: AbstractMesh, addInList: boolean = true) {
        this._sound = new Sound(name, data[name].file, scene, null);
        this._sound.spatialSound = data[name].spatialized;
        this._sound.setVolume(data[name].volume);
        // init sound
        if (mesh !== null) {
            this._mesh = mesh;
            this._sound.attachToMesh(this._mesh);
        }
        Engine.audioEngine.audioContext?.resume();
        if(addInList) {
            Game.instance.sound = this;
        }
    }

    public attachToInstancedMesh(instancedMesh: InstancedMesh) {
        this._sound.attachToMesh(instancedMesh);
    }

    public setPosition(position: Vector3) {
        this._sound.setPosition(position);
    }

    public setAutoplay(bool: boolean) {
        this._sound.autoplay = bool;
    }

    public setVolume(volume: number, time?: number) {
        if (time !== undefined) {
            this._sound.setVolume(volume, time);
        } else {
            this._sound.setVolume(volume);
        }
    }

    public enableLoop() {
        this._sound.loop = true;
    }

    public play(ignoreIsPlaying: boolean = false): void {
        if (this._sound.isPaused) {
            this._sound.setPlaybackRate(1);
            this._sound.play(0, this._curentTime);
        } else if (ignoreIsPlaying) {
            this._sound.play();
        } else if (!this._sound.isPlaying) {
            this._sound.play();
        }
        console.log(this._sound);
    }

    public setPitch(rate: number) {
        this._sound.setPlaybackRate(rate);
    }

    public pause(): void {
        this._sound.pause();
        this._curentTime = this._sound.currentTime;
    }

    public setLoop(bool: boolean): void {
        this._sound.loop = bool;
    }

    public stopAndDispose(): void {
        if (this._mesh !== undefined) {
            this._sound.detachFromMesh();
        }
        this._sound.stop();
        this._sound.dispose();
        // update Game.sounds
        const index = Game.instance.sound.indexOf(this);
        if (index !== -1) {
            Game.instance.sound.splice(index, 1);
        }
    }

    public getVolume(): number {
        return this._sound.getVolume();
    }

    public playWithRepeater(second: number) {
        setInterval(() => {
            this._sound.play();
        }, second * 1000);
    }

    public getName(): string {
        return this._id;
    }

    public isPlaying(): boolean {
        return this._sound.isPlaying;
    }
}