class CollisionManager {
    private _colliders: ICollider[];

    constructor() {
        this._colliders = [];
    }

    addCollider(collider) {
        this._colliders.push(collider);
    }

    removeCollider(collider) {
        const index = this._colliders.indexOf(collider);
        if (index > -1) {
            this._colliders.splice(index, 1);
        }
    }

    checkCollisions() {
        const collidersSnapshot = [...this._colliders]; // Crée une copie de la liste des colliders
        for (let i = 0; i < collidersSnapshot.length; i++) {
            for (let j = 0; j < collidersSnapshot.length; j++) {
                if (i !== j && collidersSnapshot[i].collidesWith(collidersSnapshot[j])) {
                    collidersSnapshot[i].onCollision(collidersSnapshot[j]);
                }
            }
        }
    }

    get colliders() {
        return this._colliders;
    }

    set colliders(colliders) {
        this._colliders = colliders;
    }
}
export default CollisionManager;
