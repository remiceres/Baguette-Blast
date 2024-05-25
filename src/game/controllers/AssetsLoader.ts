import {
    AbstractMesh,
    AssetsManager,
    InstancedMesh,
    Mesh,
    MeshBuilder,
    Scene,
    TransformNode,
    Vector3,
} from '@babylonjs/core';
import { Inspector } from '@babylonjs/inspector';
import WallController from '../../wall/controllers/WallController';
import WallModel from '../../wall/models/WallModel';
import WallView from '../../wall/view/WallView';
import Game from '../Game';

class AssetsLoader {
    // Scene
    private readonly _scene: Scene;

    // Dictionaries of meshes
    private readonly _dictModels: Map<string, Mesh>;

    // Instance counters
    private _instancesCounters: Map<string, number>;

    // Constants
    private readonly _modelPathRepertory = 'models/'; // from public folder
    private readonly _modelNames = [
        ['Scene', '.obj'],
        ['BonusTime', '.obj'],
        ['BonusHourglass', '.obj'],
        ['BonusScore', '.obj'],
        ['BallonBronze', '.obj'],
        ['BallonSilver', '.obj'],
        ['BallonGold', '.obj'],
        ['Bullet', '.obj'],
        ['Laser', '.obj'],
        ['FlyingPigeon', '.glb'],
    ];

    /////////////////
    // Constructor //
    /////////////////

    public constructor() {
        this._scene = Game.instance.scene;
        this._dictModels = new Map();
        this._instancesCounters = new Map();
        Inspector.Show(this._scene, {});
    }

    public async initialize(): Promise<void> {
        await this._loadAssets();
        this._generateColliders();
    }

    private async _loadAssets(): Promise<void> {
        // Create an asset manager to handle the loading of the models
        const assetManager = new AssetsManager(this._scene);

        // For each model, define a task to load it
        this._modelNames.forEach(([name, extension]) => {
            // Define the task to load the mesh
            const task = assetManager.addMeshTask(name, '', this._modelPathRepertory, `${name}${extension}`);

            // Define the callback for when the mesh is loaded successfully
            task.onSuccess = (task) => {
                this._postProcessMesh(name, task.loadedMeshes[0] as Mesh);
            };

            // Define the callback for when the mesh fails to load
            task.onError = (task, message, exception) => console.error(`Failed to load ${name}: ${message}`, exception);
        });

        // Start the asset manager loading the models
        return new Promise((resolve, reject) => {
            assetManager.onFinish = () => resolve();
            assetManager.onTaskError = (task) => reject(new Error(`Failed loading ${task.name}`));
            assetManager.load();
        });
    }

    private _postProcessMesh(name: string, mesh: Mesh): void {
        // Re-scale bonus meshes
        if (name.startsWith('Bonus')) {
            mesh.scaling.scaleInPlace(0.5);
        }

        // Re-scale bullet mesh
        if (name === 'Bullet') {
            mesh.scaling.scaleInPlace(0.05);
        }

        // Re-scale laser mesh
        if (name === 'Laser') {
            mesh.scaling.scaleInPlace(0.1);
        }

        // Re-scale flying pigeon mesh
        if (name === 'FlyingPigeon') {
            mesh.scaling.scaleInPlace(10);
        }

        // Hide all meshes except the scene
        if (name !== 'Scene') {
            mesh.setAbsolutePosition(new Vector3(0, -20, 0));
            mesh.setEnabled(false);
        }

        // Add the mesh to the mesh dictionary
        this._dictModels.set(name, mesh);
    }

    private _generateColliders(): void {
        Game.instance.scene.meshes.forEach((mesh) => {
            if (mesh.name.toLowerCase().includes('collider')) {
                mesh.isVisible = false;

                const wallController = new WallController(new WallView(), new WallModel(mesh));
                Game.instance.collisionManager.addCollider(wallController);
            }
        });
    }

    ///////////////
    // Factories //
    ///////////////

    public getBonusTimeInstance(): InstancedMesh {
        return this._createInstance('BonusTime');
    }

    public getBonusHourglassInstance(): InstancedMesh {
        return this._createInstance('BonusHourglass');
    }

    public getBonusScoreInstance(): InstancedMesh {
        return this._createInstance('BonusScore');
    }

    public getBalloonBronzeInstance(): InstancedMesh {
        return this._createInstance('BallonBronze');
    }

    public getBalloonSilverInstance(): InstancedMesh {
        return this._createInstance('BallonSilver');
    }

    public getBalloonGoldInstance(): InstancedMesh {
        return this._createInstance('BallonGold');
    }

    public getBulletInstance(): InstancedMesh {
        return this._createInstance('Bullet');
    }

    public getLaserInstance(): InstancedMesh {
        return this._createInstance('Laser');
    }

    public getFlyingPigeonInstance(): InstancedMesh {
        return this._createInstance('FlyingPigeon');
    }

    /////////////////
    // Hitbox API //
    /////////////////

    public createHitbox(rootMesh: AbstractMesh, partName: string, padding: number): AbstractMesh {
        // Function to find the first mesh that matches the partName
        const findMeshByNamePart = (mesh: AbstractMesh, namePart: string): AbstractMesh => {
            if (mesh.name.includes(namePart)) {
                return mesh;
            }
            for (const child of mesh.getChildMeshes()) {
                const result = findMeshByNamePart(child, namePart);
                if (result) {
                    return result;
                }
            }
            throw new Error('No mesh found matching the name part: ' + namePart);
        };

        // Find the first matching mesh
        const mesh = findMeshByNamePart(rootMesh, partName);

        // Get the bounding box of the found mesh
        const boundingBox = mesh.getBoundingInfo().boundingBox;

        // Create a box mesh to represent the hitbox
        const hitbox = MeshBuilder.CreateBox(
            'hitbox-' + mesh.name,
            {
                width: boundingBox.maximum.x - boundingBox.minimum.x - padding,
                height: boundingBox.maximum.y - boundingBox.minimum.y - padding,
                depth: boundingBox.maximum.z - boundingBox.minimum.z - padding,
            },
            Game.instance.scene
        );
        hitbox.position = boundingBox.center;
        hitbox.parent = mesh;
        hitbox.showBoundingBox = true;
        hitbox.isVisible = false;

        return hitbox;
    }

    /////////////////
    // Private API //
    /////////////////

    private _createInstance(meshName: string): InstancedMesh {
        const mesh = this._dictModels.get(meshName);

        // Build the instance name
        const count = this._getInstancesCount(meshName);
        const instanceName = `${meshName}_${count}`;

        // Create the instance
        return this._createInstanceRecursive(mesh, instanceName);
    }

    private _createInstanceRecursive(mesh, newInstanceName: string): InstancedMesh {
        let newInstance = null;

        if (mesh instanceof Mesh) {
            newInstance = mesh.createInstance(newInstanceName);
        } else if (mesh instanceof TransformNode) {
            newInstance = mesh.clone(newInstanceName, null, true);
            newInstance.animations = mesh.animations;
        } else {
            console.error('Unsupported mesh type');
            return;
        }

        mesh.getChildren().forEach((child) => {
            // Recursively create instances for the children
            const childInstance = this._createInstanceRecursive(child, `${newInstanceName}_${child.name}`);
            childInstance.parent = newInstance;
        });

        return newInstance;
    }

    private _getInstancesCount(name: string): number {
        if (!this._instancesCounters.has(name)) {
            // Initialize the counter if it does not exist
            this._instancesCounters.set(name, 0);
        } else {
            // Increment the counter if it already exists
            this._instancesCounters.set(name, this._instancesCounters.get(name) + 1);
        }

        return this._instancesCounters.get(name);
    }
}

export default AssetsLoader;
