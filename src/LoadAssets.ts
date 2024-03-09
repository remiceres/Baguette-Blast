import { HemisphericLight, Scene, Vector3, AssetsManager, MeshAssetTask } from '@babylonjs/core';

/* eslint-disable linebreak-style */
class LoadAssets {

    public static _dictLights = new Map<string, HemisphericLight>();
    public static _dictModels = new Map<string, MeshAssetTask>();

    public static async initLight(scene : Scene): Promise<void> {
        LoadAssets._dictLights.set('light1', new HemisphericLight('light1', new Vector3(1, 1, 0), scene));

        return Promise.resolve();
    }

    public static async initModels(scene : Scene, assetManager : AssetsManager): Promise<void> {
        const meshSceneTask = assetManager.addMeshTask('scene', '', '', 'Scene.obj', '');
        
        LoadAssets._dictModels.set('scene', meshSceneTask);

        assetManager.load();
        return Promise.resolve();
    }
}

export default LoadAssets;