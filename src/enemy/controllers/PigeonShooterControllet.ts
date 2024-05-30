import { ProjectileFactory, ProjectileType } from '../../projectile/ProjectileFactory';
import ProjectileController from '../../projectile/controllers/ProjectileController';
import PigeonModel from '../models/PigeonModel';
import PigeonView from '../views/PigeonView';
import PigeonController from './PigeonControllers';

class ShooterPigeonController extends PigeonController {
    private _fireCooldown: number = 2; // Cooldown time in seconds
    private _timeSinceLastFire: number = 0;

    private _projectiles: ProjectileController[] = [];

    public constructor(model: PigeonModel, view: PigeonView) {
        super(model, view);
    }

    public update(deltaTime: number): void {
        super.update(deltaTime);

        this._timeSinceLastFire += deltaTime;

        if (this._timeSinceLastFire >= this._fireCooldown) {
            this._fireProjectile();
            this._timeSinceLastFire = 0;
        }
        // Update projectiles
        this._projectiles.forEach((projectile) => {
            projectile.update(deltaTime);
        });
    }

    private _fireProjectile() {
        const initialPosition = this._model.position.clone();
        initialPosition.y -= 0.7;
        // Create instance
        this._projectiles.push(ProjectileFactory.createProjectile(
            ProjectileType.Ball, 
            initialPosition, 
            this._view.mesh.forward.clone().normalize().scaleInPlace(2), 
            this._view.mesh.rotation.clone())
        );
    }
}

export default ShooterPigeonController;
