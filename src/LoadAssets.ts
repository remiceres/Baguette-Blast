import { PointLight, Scene, Vector3, AssetsManager, MeshAssetTask } from '@babylonjs/core';

/* eslint-disable linebreak-style */
class LoadAssets {

    public static _dictLights = new Map<string, PointLight>();
    public static _dictModels = new Map<string, MeshAssetTask>();

    public static async initLight(scene : Scene): Promise<void> {
        LoadAssets._dictLights.set('light0', new PointLight('light0', new Vector3(-6,7,-9), scene));
        LoadAssets._dictLights.set('light1', new PointLight('light1', new Vector3(13.0,7,1), scene));
        LoadAssets._dictLights.set('light2', new PointLight('light2', new Vector3(61,7,6.7), scene));
        LoadAssets._dictLights.set('light3', new PointLight('light3', new Vector3(61,7,-14.6), scene));
        LoadAssets._dictLights.set('light4', new PointLight('light4', new Vector3(129,7,-14.6), scene));
        LoadAssets._dictLights.set('light5', new PointLight('light5', new Vector3(129,7,6.7), scene));
        LoadAssets._dictLights.set('light6', new PointLight('light6', new Vector3(145,7,16.1), scene));
        LoadAssets._dictLights.set('light7', new PointLight('light7', new Vector3(128,7,44), scene));
        LoadAssets._dictLights.set('light8', new PointLight('light8', new Vector3(92,7,44), scene));
        LoadAssets._dictLights.set('light9', new PointLight('light9', new Vector3(75,7,-49), scene));
        LoadAssets._dictLights.set('light10', new PointLight('light10', new Vector3(140.5,7,-49), scene));
        LoadAssets._dictLights.set('sun', new PointLight('sun', new Vector3(140.5,7,-49), scene));
        return Promise.resolve();
    }

    public static async initModels(scene : Scene, assetManager : AssetsManager): Promise<void> {
        const meshSceneTask = assetManager.addMeshTask('scene', '', '', 'Scene.obj', '');

        meshSceneTask.onSuccess = function (task) {
            task.loadedMeshes.forEach(function (loadedMesh) {
                const meshMaterial = loadedMesh.material;
                meshMaterial.forceDepthWrite = true;
            });
        };
        

        LoadAssets._dictModels.set('scene', meshSceneTask);

        assetManager.load();
        return Promise.resolve();
    }
}

export default LoadAssets;