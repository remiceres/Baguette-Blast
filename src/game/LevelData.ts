// Define interfaces for the JSON structure
interface ItemData {
    item: string;
    durability: number;
    power: number;
}

interface PlayerData {
    left_hand: ItemData;
}

interface LevelData {
    player: PlayerData;
    enemies: EnemyData[];
}

interface BonusData {
    type: string;
}

interface BehaviorData {
    type: string;
    range: number;
    speed: number;
}

interface EnemyData {
    type: string;
    health: number;
    position: {
        x: number;
        y: number;
        z: number;
    };
    bonus: BonusData; 
    behavior: BehaviorData;
}


export { LevelData, EnemyData, ItemData, BehaviorData };