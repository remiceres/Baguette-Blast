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

interface EnemyData {
    type: string;
    health: number;
    position: {
        x: number;
        y: number;
        z: number;
    };
}

export { LevelData, EnemyData, ItemData };