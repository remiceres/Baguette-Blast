import { WeaponController } from '../../weapon/controllers/WeaponController';
import { WeaponModel } from '../../weapon/models/WeaponModel';
import { WeaponView } from '../../weapon/views/WeaponView';

export class WeaponInitializer {
    static initializeWeapon(hand): WeaponController
    {
        const weaponModel = new WeaponModel(hand);
        const weaponView = new WeaponView(); // use scene
        const weaponController = new WeaponController(weaponModel, weaponView); // local variable

        // Removed redundant initialization
        return weaponController;
    }
}