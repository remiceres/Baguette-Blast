import { GUI3DManager, HolographicButton, PlanePanel } from 'babylonjs-gui';
import State from '../stateManager/EnumState';
import Game from '../game/Game';
import { AdvancedDynamicTexture } from '@babylonjs/gui';
import { DynamicTexture, Mesh, 
    MeshBuilder, StandardMaterial, Texture, TransformNode, Vector3 } from '@babylonjs/core';

class CustomUI {
    public static buttons: HolographicButton[] = [];
    public static textZones: DynamicTexture[] = [];
    public static planes: Mesh[] = [];
    public static panelCenter: Vector3 = new Vector3(-0.5, 3.6, 11.5);
    public static panelTextTopRight: Vector3 = new Vector3(1.5, 4.8, 11.5);
    public static panelTextCenter: Vector3 = new Vector3(this.panelCenter._x, 4.2, 11.5);

    public static addButton(
        name: string, state: State, panel: PlanePanel, isAlone: boolean = false
    ): HolographicButton {
        const button = new HolographicButton('orientation');
        panel.addControl(button);
        this.buttons.push(button);
        button.text = name;

        // If alone, move the button to the bottom left
        if (isAlone) {
            button.position = new Vector3(0.5, 0.5, 0);
        }
    
        if (button.mesh) {
            button.mesh.scaling.x = 1.2; 
            button.mesh.scaling.y = 0.8; 
        }
    
        button.onPointerClickObservable.add(() => {
            // Dispose of the buttons
            for (const button of this.buttons) {
                button.dispose();
            }
            for (const textZone of this.textZones) {
                textZone.dispose();
            }
            for (const plane of this.planes) {
                plane.dispose();
            }
            Game.instance.stateManager.changeState(state);
        });
        return button;
    }    

    public static createImageZone(
        position: Vector3, width: number, height: number, imageUrl: string
    ): void {
        const plane = MeshBuilder.CreatePlane('imagePlane', { width, height }, Game.instance.scene);
        plane.position = position;
        const material = new StandardMaterial('imageMat', Game.instance.scene);
        const imageTexture = new Texture(imageUrl, Game.instance.scene, true, false);
        material.diffuseTexture = imageTexture;
        plane.material = material;
        this.planes.push(plane);
    }

    public static addPanel(rows: number = 1, columns: number = 3): PlanePanel {
        const manager = new GUI3DManager(Game.instance.scene);
        const panel = new PlanePanel();
        panel.margin = 0.2;
        panel.rows = rows;
        panel.columns = columns;

        const anchor = new TransformNode('');
        manager.addControl(panel);
        panel.linkToTransformNode(anchor);
        panel.position.set(this.panelCenter.x, this.panelCenter.y, this.panelCenter.z);
        panel.blockLayout = true;
        // panel.blockLayout = false;

        if (rows === 1 && columns === 1) {
            panel.position.set(this.panelCenter.x, this.panelCenter.y -1, this.panelCenter.z);
        }
        return panel;
    }

    // Take a string and return a list of strings that fit in the width
    public static async addTextPanel(text: string): Promise<AdvancedDynamicTexture> {
        const scene = Game.instance.scene;
        const box = MeshBuilder.CreateBox('box', {height: 9, width: 16, depth: 0.1}, scene);
        box.scaling = new Vector3(0.4, 0.4, 0.4);
        box.position = new Vector3(-0.5, 3.6, 11.5);
    
        const url = 'assets/frames/text-panel/Frame 1.json';
        const uiTexture = AdvancedDynamicTexture.CreateForMesh(box, 2048, 1024, false);
    
        try {
            await uiTexture.parseFromURLAsync(url);
            const material = new StandardMaterial('mat', Game.instance.scene);
            material.diffuseTexture = uiTexture;
    
            const button_home = uiTexture.getControlByName('btn1-bjs');
            if (button_home) {
                button_home.onPointerClickObservable.add(() => {
                    // Dispose and change state
                    uiTexture.dispose();
                    Game.instance.stateManager.changeState(State.Home);
                });
            }
    
            const button_settings = uiTexture.getControlByName('btn2-bjs');
            if (button_settings) {
                button_settings.onPointerClickObservable.add(() => {
                    // Dispose and change state
                    uiTexture.dispose();
                    Game.instance.stateManager.changeState(State.Settings);
                });
            }
    
            const retrievedTextBlock = uiTexture.getControlByName('home-txt') as unknown as BABYLON.GUI.TextBlock;
            if (retrievedTextBlock) {
                retrievedTextBlock.text = text;
                // // Font is Press Start 2P
                // retrievedTextBlock.fontFamily = 'Press Start 2P';
                // // Bold
                // retrievedTextBlock.fontWeight = 'bold';
                // // Fs 38
                // retrievedTextBlock.fontSize = '38px';
            }
        } catch (error) {
            console.error('Error loading UI texture:', error);
        }
        return uiTexture;
    }    

    // eslint-disable-next-line max-len
    // Image https://pixabay.com/fr/illustrations/la-t%C3%A9l%C3%A9-t%C3%A9l%C3%A9vision-t%C3%A9l%C3%A9viser-vid%C3%A9o-8760958/
    public static async addPanelTest(): Promise<void> {
        const scene = Game.instance.scene;
        // Create a simple box
        const box = MeshBuilder.CreateBox('box', {height: 9, width: 16, depth: 0.1}, scene);
        // Scale it to the right size
        box.scaling = new Vector3(0.4, 0.4, 0.4);
        box.position = new Vector3(-0.5, 3.6, 11.5); // Position it wherever needed

        const url = 'assets/frames/test.json';
        const uiTexture = AdvancedDynamicTexture.CreateForMesh(
            box,
            2048,
            1024,
            false
        );
        uiTexture.background = 'transparent';
        uiTexture
            .parseFromURLAsync(url)
            .then(() => {
                const material = new StandardMaterial('mat', Game.instance.scene);
                material.diffuseTexture = uiTexture;
                // this._grabElement();
                // Find the controll "hello-bjs" from scene
                const button = uiTexture.getControlByName('hello-bjs');
                button.onPointerClickObservable.add(() => {
                    // Level 1
                    Game.instance.stateManager.changeState(State.Level1);
                });
                // Find the text "line-txt" from scene
                const retrievedTextBlock = uiTexture.getControlByName('line-txt') as unknown as BABYLON.GUI.TextBlock;
                if (retrievedTextBlock) {
                    retrievedTextBlock.text = `test
                    test
                    test
                    test`;
                }
            });
    }
}
export default CustomUI;