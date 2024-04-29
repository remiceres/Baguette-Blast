import EnemyController from '../../enemy/controllers/EnemyController';
import BaseEnemyView from '../../enemy/views/BaseEnemyView';

class CollisionManager {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _colliders: any[];

    constructor() {
        this._colliders = [];
    }

    addCollider(collider) {
        this._colliders.push(collider);
    }

    removeCollider(collider) {
        this._colliders = this._colliders.filter(c => c !== collider);
    }

    checkCollisions() {
        for (let i = 0; i < this._colliders.length; i++) {
            for (let j = i + 1; j < this._colliders.length; j++) {
                if (this._colliders[i].collidesWith(this._colliders[j])) {
                    this._colliders[i].onCollision(this._colliders[j]);
                    this._colliders[j].onCollision(this._colliders[i]);
                }
            }
        }
    }

    // Temporary method to check for collisions between the ball and the enemies
    checkForCollisions(ball): EnemyController | null{
        let collided = null;
        // this._views.forEach(view => {
        this._colliders.forEach((controller) => {
            if (controller.view instanceof BaseEnemyView) {
                ball.getProjectiles().forEach((projectile) => {
                    if (projectile.intersectsMesh(controller.view._mesh, true)) {
                        // Notify the EnemyController about the collision
                        // view.controller.notifyCollision(projectile);
                        // console.log('Collision detected');
                        // Dirty hack to remove the projectile and the enemy
                        // TODO: Remove the projectile and the enemy properly
                        // To do so I think we need a class that handles the collision
                        // controller.dispose();
                        // Remove the controller from the array
                        const index = this._colliders.indexOf(controller);
                        if (index > -1) {
                            this._colliders.splice(index, 1);
                        }

                        projectile.dispose();
                        // Return the collided enemy
                        collided = controller;
                    }
                });
            }
        });
        return collided;
    }
}

export default CollisionManager;