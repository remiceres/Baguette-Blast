import Game from '../../Game';
import AmbiantLight from './AmbiantLight';
import Shadows from './Shadows';
import Sky from './Sky';
import Sun from './Sun';

class EnvironementControllers {
    private _scene = Game.instance.scene;

    // Day-night cycle
    private _cycleDuration: number = 60;
    private _timeElapsed: number = 0;

    // Sun
    private _sun: Sun;
    private _sunUpdate: boolean = true;

    // Shadow
    private _shadowsManager: Shadows;
    private _enableShadows: boolean = true;

    // Sky
    private _sky: Sky;
    private _skyUpdate: boolean = true;

    // Ambiant light
    private _ambiantLight: AmbiantLight;
    private _ambiantLightUpdate: boolean = true;

    /////////////////
    // Constructor //
    /////////////////

    constructor() {
        this._sun = new Sun();
        this._shadowsManager = new Shadows(this._sun.sunLight);
        this._sky = new Sky();
        this._ambiantLight = new AmbiantLight();
    }

    ////////////////
    // Public API //
    ////////////////

    public sunUpdate(value: boolean): void {
        this._sunUpdate = value;
    }

    public enableShadows(value: boolean): void {
        this._enableShadows = value;

        // if shadows are enabled, create a new shadow manager
        if (this._enableShadows) {
            this._shadowsManager = new Shadows(this._sun.sunLight);
        }
        // if shadows are disabled, remove the shadow manager
        else {
            this._shadowsManager.dispose();
        }
    }

    public update(deltaTime: number): void {
        this._timeElapsed += deltaTime;
        const dayProgress = (this._timeElapsed % this._cycleDuration) / this._cycleDuration;

        // Sun update
        if (this._sunUpdate) {
            this._sun.update(dayProgress);
        }

        // Shadow is updated automatically

        // Sky update
        if (this._skyUpdate) {
            this._sky.update(this._sun.height);
        }

        // Ambiant light update
        if (this._ambiantLightUpdate) {
            this._ambiantLight.update(this._sun.height);
        }
    }
}

export default EnvironementControllers;
