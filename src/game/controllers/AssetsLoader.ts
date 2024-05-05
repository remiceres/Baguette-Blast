import { AssetsManager, InstancedMesh, Mesh, MeshAssetTask, Scene, Vector3 } from '@babylonjs/core';
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
        const modelNames = [
            'Scene',
            'BonusTime',
            'BonusHourglass',
            'BonusScore',
            'BallonBronze',
            'BallonSilver',
            'BallonGold',
        ];

        modelNames.forEach((name) => {
            const task = assetManager.addMeshTask(
                name.toLowerCase(),
                '',
                AssetsLoader._modelPath,
                `${name}${AssetsLoader._modelExtension}`
            );
            task.onSuccess = (task) => {
                this._handleMeshLoaded(task, name);
                if (task.loadedMeshes[0] instanceof Mesh) {
                    this._dictModels.set(name, task.loadedMeshes[0]);
                } else {
                    console.error(`Loaded mesh is not of type 'Mesh': ${name}`);
                }
            };
            task.onError = (task, message, exception) => console.error(`Failed to load ${name}: ${message}`, exception);
        });

        return new Promise((resolve, reject) => {
            assetManager.onFinish = () => resolve();
            assetManager.onTaskError = (task) => reject(new Error(`Failed loading ${task.name}`));
            assetManager.load();
        });
    }

    private _handleMeshLoaded(task: MeshAssetTask, name: string): void {
        // Fix bug with scene material
        task.loadedMeshes.forEach((mesh) => {
            if (mesh instanceof Mesh) {
                // Additional check

                // Fix material issues
                if (mesh.material) {
                    mesh.material.forceDepthWrite = true;
                }

                if (name.startsWith('Bonus')) {
                    mesh.scaling = new Vector3(0.5, 0.5, 0.5);
                }
            }
        });

        // Hide scene mesh
        if (name !== 'Scene') {
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
    public getBonusTimeMesh(): InstancedMesh {
        const instance = this._createInstanceRecursive(
            this._dictModels.get('BonusTime'),
            'bonusTime',
            this._bonusTimeCount
        );
        instance.isVisible = true;
        this._bonusTimeCount++;
        return instance;
    }

    private _bonusHourglassCount: number = 0;
    public getBonusHourglassMesh(): InstancedMesh {
        const instance = this._createInstanceRecursive(
            this._dictModels.get('BonusHourglass'),
            'bonusHourglass',
            this._bonusHourglassCount
        );
        instance.isVisible = true;
        this._bonusHourglassCount++;
        return instance;
    }

    private _bonusScoreCount: number = 0;
    public getBonusScoreMesh(): InstancedMesh {
        const instance = this._createInstanceRecursive(
            this._dictModels.get('BonusScore'),
            'bonusScore',
            this._bonusScoreCount
        );
        instance.isVisible = true;
        this._bonusScoreCount++;
        return instance;
    }

    private _ballonBronzeCount: number = 0;
    public getBalloonBronzeMesh(): InstancedMesh {
        const instance = this._createInstanceRecursive(
            this._dictModels.get('BallonBronze'),
            'ballonBronze',
            this._ballonBronzeCount
        );
        instance.isVisible = true;
        this._ballonBronzeCount++;
        return instance;
    }

    private _ballonSilverCount: number = 0;
    public getBalloonSilverMesh(): InstancedMesh {
        const instance = this._createInstanceRecursive(
            this._dictModels.get('BallonSilver'),
            'ballonSilver',
            this._ballonSilverCount
        );
        instance.isVisible = true;
        this._ballonSilverCount++;
        return instance;
    }

    private _ballonGoldCount: number = 0;
    public getBalloonGoldMesh(): InstancedMesh {
        const mesh = this._createInstanceRecursive(
            this._dictModels.get('BallonGold'),
            'ballonGold',
            this._ballonGoldCount
        );
        mesh.isVisible = true;
        this._ballonGoldCount++;
        return mesh;
    }

    private _createInstanceRecursive(mesh: Mesh, name: string, count: number, parent?: InstancedMesh): InstancedMesh {
        const instance = mesh.createInstance(`${name}${count}`);
        instance.isVisible = true;
        instance.parent = parent;
        mesh.getChildMeshes().forEach((child) => {
            if (child instanceof Mesh) {
                this._createInstanceRecursive(child, name + 'Child', count, instance);
            }
        });
        return instance;
    }
}

export default AssetsLoader;
