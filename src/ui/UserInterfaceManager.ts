/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable linebreak-style */
import { DynamicTexture, MeshBuilder, StandardMaterial, Color3, Axis } from '@babylonjs/core';
import Game from '../game/Game';

class UserInterfaceManager {
    private _canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this.addTextToCameraView(Game.instance.scene, Game.instance.cameraManager.playerCamera, 'Blablablabla');
    }

    private addTextToCameraView(scene, camera, text): void {
        const defaultFont = '16px Arial';
        const defaultColor = '#ffffff';
        const defaultBackgroundColor = 'transparent';
    
        // Merge options with defaults
        const font = defaultFont;
        const color = defaultColor;
        const backgroundColor = defaultBackgroundColor;
    
        // Create a dynamic texture
        const dynamicTexture = new DynamicTexture('DynamicTexture', 512, scene, true);
        const textureContext = dynamicTexture.getContext();
    
        // Set background color
        textureContext.fillStyle = backgroundColor;
        textureContext.fillRect(0, 0, dynamicTexture.getSize().width, dynamicTexture.getSize().height);
    
        // Set text properties
        textureContext.font = font;
        textureContext.fillStyle = color;
    
        // Measure text size
        const textSize = textureContext.measureText(text);
        const textWidth = textSize.width;
        const textHeight = parseInt(font, 10); // Approximation of text height
    
        // Calculate position for text (centered)
        const posX = (dynamicTexture.getSize().width - textWidth) / 2;
        const posY = (dynamicTexture.getSize().height - textHeight) / 2;
    
        // Draw text on the dynamic texture
        textureContext.fillText(text, posX, posY);
    
        // Create a plane with the dynamic texture
        const plane = MeshBuilder.CreatePlane('TextPlane', { width: textWidth / 50, height: textHeight / 50 }, scene);
        plane.material = new StandardMaterial('TextPlaneMaterial', scene);
        plane.material.diffuseTexture = dynamicTexture;
        plane.material.specularColor = new Color3(0, 0, 0);
        plane.material.emissiveColor = new Color3(1, 1, 1);
    
        // Position the plane in front of the camera
        plane.position = camera.position.add(
            camera.getDirection(Axis.Z).scale(2)); // Adjust scale factor as needed
    
        // Make the plane always face the camera
        scene.registerBeforeRender(function () {
            plane.lookAt(camera.position);
        });
    }
}

export default UserInterfaceManager;