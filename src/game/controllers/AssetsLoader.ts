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
        ['FlyingPigeonBoss', '.glb'],
        ['BallGun', '.glb'],
        ['BallGatling', '.glb'],
        ['Egg', '.obj'],
        ['Boomerang', '.obj'],
        ['Baguette', '.obj'],
        ['Disc', '.obj'],
    ];

    /////////////////
    // Constructor //
    /////////////////

    public constructor() {
        this._scene = Game.instance.scene;
        this._dictModels = new Map();
        this._instancesCounters = new Map();
    }

    public async initialize(): Promise<void> {
        await this._loadAssets();
        this._generateColliders();
        this._disableBackFaceCulling();
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
            mesh.scaling.scaleInPlace(0.7);
        }

        // Re-scale silver balloon mesh
        if (name === 'BallonSilver') {
            mesh.scaling.scaleInPlace(0.5);
        }

        // Re-scale gold balloon mesh
        if (name === 'BallonGold') {
            mesh.scaling.scaleInPlace(0.3);
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
            mesh.scaling.scaleInPlace(15);
        }

        // Re-scale flying pigeon mesh
        if (name === 'FlyingPigeonBoss') {
            mesh.scaling.scaleInPlace(90);
        }

        // Re-scale flying pigeon mesh
        if (name === 'Egg') {
            mesh.scaling.scaleInPlace(0.2);
        }

        // Re-scale boomerang mesh
        if (name === 'Boomerang') {
            mesh.scaling.scaleInPlace(0.05);
        }

        // Re-scale baguette mesh
        if (name === 'Baguette') {
            mesh.scaling.scaleInPlace(2);
        }

        // Re-scale ball gun mesh
        if (name === 'BallGun') {
            mesh.scaling.scaleInPlace(0.2);
        }

        // Re-scale ball gatling mesh
        if (name === 'BallGatling') {
            mesh.scaling.scaleInPlace(0.2);
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

    private _disableBackFaceCulling(): void {
        const searchNames = ['Material'];

        // Get all material with a name contain a substring of in an array searchNames
        const materials = this._scene.materials.filter((material) =>
            searchNames.some((name) => material.name.toLowerCase().includes(name.toLowerCase()))
        );

        // Active back face culling for all materials
        materials.forEach((material) => {
            material.backFaceCulling = false;
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

    public getFlyingPigeonBossInstance(): InstancedMesh {
        return this._createInstance('FlyingPigeonBoss');
    }

    public getBallGunInstance(): InstancedMesh {
        return this._createInstance('BallGun');
    }

    public getBallGatlingInstance(): InstancedMesh {
        return this._createInstance('BallGatling');
    }

    public getEggInstance(): InstancedMesh {
        return this._createInstance('Egg');
    }

    public getBoomerangInstance(): InstancedMesh {
        return this._createInstance('Boomerang');
    }

    public getJavelinInstance(): InstancedMesh {
        return this._createInstance('Baguette');
    }

    public getDiscInstance(): InstancedMesh {
        return this._createInstance('Disc');
    }

    /////////////////
    // Hitbox API //
    /////////////////

    public createHitbox(rootMesh: AbstractMesh, partName: string, padding: number): AbstractMesh {
        // Function to find the first mesh that matches the partName
        const findMeshByNamePart = (mesh, namePart: string): AbstractMesh => {
            if (mesh.name.includes(namePart)) {
                return mesh;
            }

            // Using a traditional for loop to be able to return immediately when the mesh is found
            const childMeshes = mesh.getChildMeshes();
            for (let i = 0; i < childMeshes.length; i++) {
                const result = findMeshByNamePart(childMeshes[i], namePart);
                if (result) {
                    return result;
                }
            }

            return null;
        };

        // Find the first matching mesh
        const mesh = findMeshByNamePart(rootMesh, partName);

        if (!mesh) {
            throw new Error('No mesh found with the name part: ' + partName + ' in the root mesh ' + rootMesh.name);
        }

        // Get the bounding box of the found mesh
        const boundingBox = mesh.getBoundingInfo().boundingBox;

        // Create a box mesh to represent the hitbox
        const hitbox = MeshBuilder.CreateBox(
            'hitbox-' + mesh.name,
            {
                width: boundingBox.maximum.x - boundingBox.minimum.x + padding,
                height: boundingBox.maximum.y - boundingBox.minimum.y + padding,
                depth: boundingBox.maximum.z - boundingBox.minimum.z + padding,
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
