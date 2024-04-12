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
}

export default CollisionManager;