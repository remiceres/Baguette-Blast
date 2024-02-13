import PlayerController from '../../player/controllers/PlayerController';
import PlayerModel from '../../player/models/PlayerModel';
import PlayerView from '../../player/views/PlayerView';

export class PlayerInitializer {
    static initializePlayer(): PlayerController
    {
        const playerModel = new PlayerModel();
        const playerView = new PlayerView(playerModel); // use scene
        const playerController = new PlayerController(playerModel, playerView); // local variable

        // Removed redundant initialization
        return playerController;
    }
}