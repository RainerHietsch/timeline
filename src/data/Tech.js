import * as MineFunctions from "../functions/MineFunctions";

export const Tech = [
    {
        id: 'fire',
        name: 'Fire',
        desc: 'The discovery that started it all',
        era: 'Stone Age',
        cat: 'Science',
        cost: [
            {id: 'stone', name: 'Stone', amount: 5},
            {id: 'wood', name: 'Wood', amount: 5},
        ],
        req: ['nothing'],
        produces: [
            {
                id: "science",
                name: "Science",
                rate: 10,
                absolute: true
            }
        ],
    },
    {
        id: 'stonetools',
        name: 'Stone Tools',
        desc: 'Work Work',
        era: 'Stone Age',
        cat: 'Productivity',
        cost: [
            {id: 'science', name: 'Science', amount: 25},
        ],
        req: ['fire'],
    },
    {
        id: 'pigments',
        name: 'Pigments',
        desc: 'A first step into Art & Culture',
        era: 'Stone Age',
        cat: 'Culture',
        cost: [
            {id: 'science', name: 'Science', amount: 25},
        ],
        req: ['fire'],
        produces: [
            {
                id: "influence",
                name: "Influence",
                rate: 1,
                absolute: true
            }
        ],
        onFinish: (state) => {
            state.knownResources.push('influence');
        }
    },
    {
        id: 'masonry',
        name: 'Masonry',
        desc: 'Allows the construction of basic buildings',
        era: 'Stone Age',
        cat: 'Buildings',
        cost: [
            {id: 'science', name: 'Science', amount: 35},
        ],
        req: ['stonetools'],
    },
    {
        id: 'wheel',
        name: 'Wheel',
        desc: 'A round thing that makes life easier',
        era: 'Stone Age',
        cat: 'Buildings',
        cost: [
            {id: 'science', name: 'Science', amount: 35},
        ],
        req: ['masonry'],
    },
    {
        id: 'weapons',
        name: 'Simple Spears',
        desc: 'Unlocks Military',
        era: 'Stone Age',
        cat: 'Military',
        cost: [
            {id: 'science', name: 'Science', amount: 45},
        ],
        req: ['irrigation'],
    },
    {
        id: 'writing',
        name: 'Writing',
        desc: 'The key to preserving knowledge',
        era: 'Stone Age',
        cat: 'Technology',
        cost: [
            {id: 'science', name: 'Science', amount: 45},
        ],
        req: ['pigments'],
    },
    {
        id: 'irrigation',
        name: 'Irrigation',
        desc: 'Feeding the masses',
        era: 'Stone Age',
        cat: 'Growth',
        cost: [
            {id: 'science', name: 'Science', amount: 35},
        ],
        req: ['masonry'],
        onFinish: (state) => {
            state.knownResources.push('manpower');
        }
    },
    {
        id: 'scouting',
        name: 'Scouting',
        desc: 'Unlocks new lands',
        era: 'Stone Age',
        cat: 'Growth',
        cost: [
            {id: 'science', name: 'Science', amount: 45},
        ],
        req: ['weapons','pigments'],
    },
    {
        id: 'tribalculture',
        name: 'Tribal Culture',
        desc: 'Unlocks the Leader Mechanic',
        era: 'Stone Age',
        cat: 'Mechanics',
        cost: [
            {id: 'science', name: 'Science', amount: 45},
        ],
        req: ['writing'],
    },
    {
        id: 'improvedtools',
        name: 'Improved Tools',
        desc: 'Increases Stone & Wood gathering efficiency',
        era: 'Stone Age',
        cat: 'Production',
        cost: [
            {id: 'science', name: 'Science', amount: 45},
        ],
        req: ['stonetools'],
        produces: [
            {
                id: "wood",
                name: "Wood",
                rate: 5,
                absolute: false
            },
            {
                id: "stone",
                name: "Stone",
                rate: 5,
                absolute: false
            }
        ],
    },
    {
        id: 'sharpspears',
        name: 'Sharper Spears',
        desc: 'Adds +1 to Infantries\' minimum damage',
        era: 'Stone Age',
        cat: 'Military',
        cost: [
            {id: 'science', name: 'Science', amount: 45},
        ],
        req: ['weapons'],
        onFinish: (state) => {
            state.military.infantry.minAttack += 1;
        }
    },
    {
        id: 'furclothing',
        name: 'Fur Clothing',
        desc: 'Adds +5 to Infantries\' hit points',
        era: 'Stone Age',
        cat: 'Military',
        cost: [
            {id: 'science', name: 'Science', amount: 45},
        ],
        req: ['weapons'],
        onFinish: (state) => {
            state.military.infantry.maxHp += 5;
        }
    },
    {
        id: 'warriorculture',
        name: 'Warrior Culture',
        desc: 'Infantry units are build 5 seconds faster',
        era: 'Stone Age',
        cat: 'Military',
        cost: [
            {id: 'science', name: 'Science', amount: 45},
        ],
        req: ['weapons'],
        onFinish: (state) => {
            state.military.infantry.secondsToBuild -= 5;
        }
    },
    {
        id: 'architecture',
        name: 'Architecture',
        desc: 'Unlocks the first Monument choice',
        era: 'Stone Age',
        cat: 'Buildings',
        cost: [
            {id: 'science', name: 'Science', amount: 50},
        ],
        req: ['scouting','wheel','tribalculture']
    },
    {
        id: 'mining',
        name: 'Mining',
        desc: 'Dig for treasure!',
        era: 'Classical Age',
        cat: 'Economy',
        cost: [
            {id: 'science', name: 'Science', amount: 45},
        ],
        req: [],
        onFinish: (state) => {
            state.knownResources.push('iron');
            for(let i=0;i<7;i++){
                const known = i % 7 < 2;
                MineFunctions.generateDeposit(state, known);
            }
        }
    },
    {
        id: 'ironaxes',
        name: 'Iron Axes',
        desc: 'Improves Wood production efficiency',
        era: 'Classical Age',
        cat: 'Economy',
        cost: [
            {id: 'science', name: 'Science', amount: 45},
        ],
        req: ['mining'],
        produces: [
            {
                id: "wood",
                name: "Wood",
                rate: 10,
                absolute: false
            }
        ],
    },
    {
        id: 'ironpickaxes',
        name: 'Iron Pickaxes',
        desc: 'Improves Stone production efficiency',
        era: 'Classical Age',
        cat: 'Economy',
        cost: [
            {id: 'science', name: 'Science', amount: 45},
        ],
        req: ['mining'],
        produces: [
            {
                id: "stone",
                name: "Stone",
                rate: 10,
                absolute: false
            }
        ],
    },
    {
        id: 'manufacturing',
        name: 'Manufacturing',
        desc: 'Lets you combine resources to create new ones. Comes with a free crafting table.',
        era: 'Classical Age',
        cat: 'Economy',
        cost: [
            {id: 'science', name: 'Science', amount: 45},
        ],
        req: ['mining'],
        produces: []
    },
    {
        id: 'ironswords',
        name: 'Iron Swords',
        desc: 'Lets you produce Iron Swords to improve your Infantry',
        era: 'Classical Age',
        cat: 'Economy',
        cost: [
            {id: 'science', name: 'Science', amount: 45},
        ],
        req: ['manufacturing'],
        produces: [],
        onFinish: (state) => {
            state.blueprints.push({
                id: "ironsword",
                name: 'Iron Sword',
                input: [{
                    id: 'iron',
                    amount: 35
                }],
                output: [{
                    id: 'iron sword',
                    amount: 1
                }],
                secondsToProduce: 10
            });
        }
    },
    {
        id: 'infupgradeironswords',
        name: 'Upgrade Infantry',
        desc: 'Costs 1 Iron Sword per Infantry. Gives +2 Max Damage.',
        era: 'Classical Age',
        cat: 'Economy',
        cost: [
            {
                id: 'iron sword',
                name: 'Iron Sword',
                dynamicCost: true,
                amount: (state) => {
                    return state.military.infantry.count;
                }
            }
        ],
        req: ['ironswords'],
        produces: [],
        onFinish: (state) => {
            state.military.infantry.maxAttack += 2;
        }
    },
    {
        id: 'currency',
        name: 'Currency',
        desc: 'Make money!',
        era: 'Classical Age',
        cat: 'Economy',
        cost: [
            {id: 'science', name: 'Science', amount: 10},
        ],
        req: ['manufacturing'],
        produces: []
    },
    {
        id: 'market',
        name: 'Market',
        desc: 'Exchange goods!',
        era: 'Classical Age',
        cat: 'Economy',
        cost: [
            {id: 'science', name: 'Science', amount: 10},
        ],
        req: ['currency'],
        produces: []
    }
]