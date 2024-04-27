import { AssetsManager, MeshAssetTask, PointLight, Scene, Vector3 } from '@babylonjs/core';
import Game from './Game';

class AssetsLoader {
    private readonly _scene: Scene = Game.instance.scene;
    private readonly _dictLights: Map<string, PointLight> = new Map();
    private readonly _dictModels: Map<string, MeshAssetTask> = new Map();

    private static readonly _modelPath = 'models/';
    private static readonly _modelExtension = '.obj';

    async initialize(): Promise<void> {
        try {
            this._initializeLights();
            await this._initializeModels();
            this._hideColliderMeshes();
        } catch (error) {
            console.error('Failed to initialize assets:', error);
            throw error;
        }
    }

    private _initializeLights(): void {
        const lightPositions = [
            new Vector3(-6, 7, -9),
            new Vector3(13, 7, 1),
            new Vector3(61, 7, 6.7),
            new Vector3(61, 7, -14.6),
            new Vector3(129, 7, -14.6),
            new Vector3(129, 7, 6.7),
            new Vector3(145, 7, 16.1),
            new Vector3(128, 7, 44),
            new Vector3(92, 7, 44),
            new Vector3(75, 7, -49),
            new Vector3(140.5, 7, -49),
        ];
        lightPositions.forEach((position, index) => {
            const light = new PointLight(`light${index}`, position, this._scene);
            this._dictLights.set(`light${index}`, light);
        });
    }

    private async _initializeModels(): Promise<void> {
        const assetManager = new AssetsManager(this._scene);
        const modelNames = ['Scene', 'BonusTime', 'BonusHourglass', 'BonusScore'];

        modelNames.forEach((name) => {
            const task = assetManager.addMeshTask(
                name.toLowerCase(),
                '',
                AssetsLoader._modelPath,
                `${name}${AssetsLoader._modelExtension}`
            );
            task.onSuccess = (task) => this._handleMeshLoaded(task, name === 'Scene');
            task.onError = (task, message, exception) => console.error(`Failed to load ${name}: ${message}`, exception);
            this._dictModels.set(name.toLowerCase(), task);
        });

        return new Promise((resolve, reject) => {
            assetManager.onFinish = () => resolve();
            assetManager.onTaskError = (task) => reject(new Error(`Failed loading ${task.name}`));
            assetManager.load();
        });
    }

    private _handleMeshLoaded(task: MeshAssetTask, isScene: boolean): void {
        task.loadedMeshes.forEach((mesh) => {
            // Fix material issues
            if (mesh.material) {
                mesh.material.forceDepthWrite = true;
            }

            // Hide the mesh if it's not the scene
            mesh.isVisible = isScene;
        });
    }

    private _hideColliderMeshes(): void {
        this._scene.meshes.forEach((mesh) => {
            if (mesh.name.toLowerCase().includes('collider')) {
                mesh.isVisible = false;
            }
        });
    }

    public get dictLights(): Map<string, PointLight> {
        return this._dictLights;
    }

    public get dictModels(): Map<string, MeshAssetTask> {
        return this._dictModels;
    }
}

export default AssetsLoader;
