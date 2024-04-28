// import BallProjectile from '../../projectile/BallProjectile';
// import GunBall from '../../weapon/GunBall';
import AbstractBallProjector from '../../weapon/AbstractBallProjector';
import PlayerController from '../../player/controllers/PlayerController';
import PlayerModel from '../../player/models/PlayerModels';
import PlayerView from '../../player/views/PlayerViews';

class EnemyInitializer {

    private _playerController: PlayerController;

    private _ball: AbstractBallProjector;

    constructor() {
    }

    initPlayer(currentLevelConfig): PlayerController{
        this._playerController = new PlayerController(new PlayerModel, new PlayerView);

        switch (currentLevelConfig.weapon) {
            case 'Air Pistol':
                // this._ball = new GunBall(new BallProjectile(10));
                break;
            // Add cases for other weapons as needed
        }
        this._playerController.setWeapon('right', this._ball);

        return this._playerController;
    }
}
export default EnemyInitializer;