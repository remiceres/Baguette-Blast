// GameLevelsConfig.ts

// Define a type for the enemy to ensure consistency
type EnemyType = {
    name: string;
    points: number;
    quantity: number;
};

// Define a type for the level configuration
type LevelConfig = {
    level: number;
    weapon: string;
    timeLimit: number;
    enemies: EnemyType[];
    notes: string;
};

// Define the game levels configuration
const gameLevels: LevelConfig[] = [
    {
        level: 1,
        weapon: 'Air Pistol',
        timeLimit: 180, // Time in seconds
        enemies: [
            { name: 'Copper Balloon', points: 5, quantity: 20 },
            { name: 'Walking Enemy', points: 10, quantity: 10 },
        ],
        notes: 'Introduction to aiming and shooting mechanics.'
    },
    {
        level: 2,
        weapon: 'Recurve Bow',
        timeLimit: 240,
        enemies: [
            { name: 'Silver Balloon', points: 10, quantity: 15 },
            { name: 'Flying Enemy', points: 20, quantity: 15 },
        ],
        notes: 'Increased difficulty in aiming; moving targets.'
    },
    {
        level: 3,
        weapon: 'Javelin',
        timeLimit: 300,
        enemies: [
            { name: 'Gold Balloon', points: 30, quantity: 10 },
            { name: 'Walking Enemy', points: 15, quantity: 20 },
        ],
        notes: 'Precision is key; varying target speeds.'
    },
    {
        level: 4,
        weapon: 'Boomerang',
        timeLimit: 360,
        enemies: [
            { name: 'Flying Enemy', points: 25, quantity: 20 },
            { name: 'Silver Balloon', points: 10, quantity: 10 },
            { name: 'Copper Balloon', points: 5, quantity: 10 },
        ],
        notes: 'Curved paths; challenge in hitting distant targets.'
    },
    {
        level: 5,
        weapon: 'Dart',
        timeLimit: 420,
        enemies: [
            { name: 'Gold Balloon', points: 35, quantity: 15 },
            { name: 'Flying Enemy', points: 20, quantity: 25 },
            { name: 'Walking Enemy', points: 40, quantity: 10 },
        ],
        notes: 'Highest precision and skill required; mixed target types.'
    }
];

// Export the game levels configuration
export default gameLevels;
