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
                rate: 1,
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
    }
]