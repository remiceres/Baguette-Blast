import { Scene } from '@babylonjs/core';

class XRHandler {

    private static _instance: XRHandler;

    private _scene: Scene;

    private constructor() { }

    public static getInstance(): XRHandler {
        if (!XRHandler._instance) {
            XRHandler._instance = new XRHandler();
        }
        return XRHandler._instance;
    }

    public async initXRAsync(scene: Scene): Promise<void> {
        this._scene = scene;
        await this._scene.createDefaultXRExperienceAsync({
        });
    }


}

export default XRHandler;