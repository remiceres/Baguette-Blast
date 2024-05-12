import { GUI3DManager, HolographicButton, PlanePanel } from 'babylonjs-gui';
import State from '../stateManager/EnumState';
import Game from '../game/Game';
import { DynamicTexture, Mesh, MeshBuilder, StandardMaterial, TransformNode, Vector3 } from '@babylonjs/core';

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

    public static createTextZone(text: string, position: Vector3, width: number, height: number): void {
        // Dynamic Texture for text
        const plane = MeshBuilder.CreatePlane('textPlane', { width: width, height: height }, Game.instance.scene);
        plane.position.set(position.x, position.y, position.z);
        const dynamicTexture = new DynamicTexture('DynamicTexture', 
            { width: 512, height: 256 }, Game.instance.scene, false);
        const material = new StandardMaterial('textMat', Game.instance.scene);
        material.diffuseTexture = dynamicTexture;
        plane.material = material;
        dynamicTexture.drawText(text, null, 200, 'bold 44px Arial', 'white', 'transparent', true);
        this.textZones.push(dynamicTexture);
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
    
}
export default CustomUI;