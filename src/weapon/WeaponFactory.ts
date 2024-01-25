// WeaponFactory.ts
import { DiscModel } from './models/DiscModel';
// import { GunModel } from './GunModel'; // Assuming a similar structure for Gun
import { Weapon } from './models/Weapon';

export class WeaponFactory {
    createWeapon(type: string): Weapon {
        switch (type) {
            case 'disc':
                return new DiscModel(10, 10, 10);
            // case 'gun':
            //     return new GunModel(/* parameters */);
            default:
                throw new Error('Unknown weapon type');
        }
    }
}
