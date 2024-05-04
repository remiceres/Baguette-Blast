/* eslint-disable max-len */
import { AssetsManager, Mesh, MeshAssetTask, Scene } from '@babylonjs/core';
import Game from '../Game';

class AssetsLoader {
    private readonly _scene: Scene = Game.instance.scene;
    private readonly _dictModels: Map<string, Mesh> = new Map(); // Changed from AbstractMesh to Mesh

    private static readonly _modelPath = 'models/';
    private static readonly _modelExtension = '.obj';

    async initialize(): Promise<void> {
        try {
            await this._initializeModels();
            this._hideColliderMeshes();
        } catch (error) {
            console.error('Failed to initialize assets:', error);
            throw error;
        }
    }

    private async _initializeModels(): Promise<void> {
        const assetManager = new AssetsManager(this._scene);
        const modelNames = ['Scene', 'BonusTime', 'BonusHourglass', 'BonusScore', 'BallonBronze', 'BallonSilver', 'BallonGold'];

        modelNames.forEach((name) => {
            const task = assetManager.addMeshTask(
                name.toLowerCase(),
                '',
                AssetsLoader._modelPath,
                `${name}${AssetsLoader._modelExtension}`
            );
            task.onSuccess = (task) => {
                this._handleMeshLoaded(task, name === 'Scene');
                this._dictModels.set(name, task.loadedMeshes[0]);
            };
            task.onError = (task, message, exception) => console.error(`Failed to load ${name}: ${message}`, exception);
        });

        return new Promise((resolve, reject) => {
            assetManager.onFinish = () => resolve();
            assetManager.onTaskError = (task) => reject(new Error(`Failed loading ${task.name}`));
            assetManager.load();
        });
    }

    private _handleMeshLoaded(task: MeshAssetTask, isScene: boolean): void {
        task.loadedMeshes.forEach((mesh) => {
            if (mesh instanceof Mesh) {
                // Additional check
                // Fix material issues
                if (mesh.material) {
                    mesh.material.forceDepthWrite = true;
                }
            }
        });
        if (!isScene) {
            task.loadedMeshes[0].setEnabled(false);
        }
    }

    private _hideColliderMeshes(): void {
        this._scene.meshes.forEach((mesh) => {
            if (mesh.name.toLowerCase().includes('collider')) {
                mesh.isVisible = false;
            }
        });
    }

    public get dictModels(): Map<string, Mesh> {
        // Changed type here
        return this._dictModels;
    }

    private _bonusTimeCount: number = 0;
    public getBonusTimeMesh(): Mesh {
        const mesh = this._dictModels.get('BonusTime').clone(`bonusTime${this._bonusTimeCount}`);
        mesh.isVisible = true;
        this._bonusTimeCount++;
        return mesh;
    }

    private _bonusHourglassCount: number = 0;
    public getBonusHourglassMesh(): Mesh {
        const mesh = this._dictModels.get('BonusHourglass').clone(`bonusHourglass${this._bonusHourglassCount}`);
        mesh.isVisible = true;
        this._bonusHourglassCount++;
        return mesh;
    }

    private _bonusScoreCount: number = 0;
    public getBonusScoreMesh(): Mesh {
        const mesh = this._dictModels.get('BonusScore').clone(`bonusScore${this._bonusScoreCount}`);
        mesh.isVisible = true;
        this._bonusScoreCount++;
        return mesh;
    }

    private _ballonBronzeCount: number = 0;
    public getBallonBronzeMesh(): Mesh {
        const mesh = this._dictModels.get('BallonBronze').clone(`ballonBronze${this._ballonBronzeCount}`);
        mesh.isVisible = true;
        this._ballonBronzeCount++;
        return mesh;
    }

    private _ballonSilverCount: number = 0;
    public getBallonSilverMesh(): Mesh {
        const mesh = this._dictModels.get('BallonSilver').clone(`ballonSilver${this._ballonSilverCount}`);
        mesh.isVisible = true;
        this._ballonSilverCount++;
        return mesh;
    }

    private _ballonGoldCount: number = 0;
    public getBallonGoldMesh(): Mesh {
        const mesh = this._dictModels.get('BallonGold').clone(`ballonGold${this._ballonGoldCount}`);
        mesh.isVisible = true;
        this._ballonGoldCount++;
        return mesh;
    }
}

export default AssetsLoader;
