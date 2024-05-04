import { AbstractMesh, Mesh, Quaternion, Vector3 } from '@babylonjs/core';
import Game from '../game/Game';
import IBehaviour from './IBehaviour';

class AvoidRectangle implements IBehaviour {
    private _meshes: Mesh[];
    private _power: number;
    private _influenceDistance: number;

    constructor(power: number, influenceDistance: number) {
        const box = Game.instance.scene.getMeshByName('mesh_mm10') as Mesh;
        this._meshes = [box];
        this._power = power;
        this._influenceDistance = influenceDistance;
    }

    public getForceVector(deltaTime: number, mesh: AbstractMesh): Vector3 {
        const force = new Vector3(0, 0, 0);

        for (const obstacle of this._meshes) {
            const closestPoint = this._getClosestPointOnObstacle(mesh.position, obstacle);
            const distance = Vector3.Distance(mesh.position, closestPoint);

            if (distance < this._influenceDistance) {
                const direction = mesh.position.subtract(closestPoint).normalize();
                const angleOffset = Math.PI / 8; // Angle plus petit pour moins de déviation
                const rotationAxis = Vector3.Up(); // Axe vertical pour la rotation
                // Créer le quaternion de rotation
                const quaternion = Quaternion.RotationAxis(rotationAxis, angleOffset);
                direction.rotateByQuaternionToRef(quaternion, direction);

                const lateralAttenuationFactor = 0.5; // Réduire de 50% la force latérale
                direction.x *= lateralAttenuationFactor; // Appliquer l'atténuation seulement sur l'axe horizontal
                direction.z *= lateralAttenuationFactor; // Appliquer l'atténuation seulement sur l'axe horizontal

                const magnitude = (this._influenceDistance - distance) / this._influenceDistance;
                const repulsionForce = direction.scale(this._power * magnitude);
                force.addInPlace(repulsionForce);
            }
        }

        return force;
    }

    private _getClosestPointOnObstacle(position: Vector3, obstacle: Mesh): Vector3 {
        const boundingBox = obstacle.getBoundingInfo().boundingBox;
        const obstaclePosition = obstacle.getAbsolutePosition();

        return new Vector3(
            Math.max(
                Math.min(position.x, obstaclePosition.x + boundingBox.maximum.x),
                obstaclePosition.x + boundingBox.minimum.x
            ),
            Math.max(
                Math.min(position.y, obstaclePosition.y + boundingBox.maximum.y),
                obstaclePosition.y + boundingBox.minimum.y
            ),
            Math.max(
                Math.min(position.z, obstaclePosition.z + boundingBox.maximum.z),
                obstaclePosition.z + boundingBox.minimum.z
            )
        );
    }
}

export default AvoidRectangle;
