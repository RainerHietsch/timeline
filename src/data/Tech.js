export const Tech = [
    {
        id: 'fire',
        name: 'Fire',
        desc: 'The discovery that started it all',
        era: 'Stone Age',
        cat: 'Science',
        cost: [
            {id: 'stone', name: 'Stone', amount: 1},
            {id: 'wood', name: 'Wood', amount: 1},
        ],
        req: ['nothing'],
        produces: [
            {
                id: "science",
                name: "Science",
                rate: 0.25,
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
            {id: 'science', name: 'Science', amount: 5},
        ],
        req: ['fire'],
    },
    {
        id: 'masonry',
        name: 'Masonry',
        desc: 'Allows the construction of basic buildings',
        era: 'Stone Age',
        cat: 'Buildings',
        cost: [
            {id: 'science', name: 'Science', amount: 5},
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
            {id: 'science', name: 'Science', amount: 5},
        ],
        req: ['masonry'],
    },
    {
        id: 'warfare',
        name: 'Warfare',
        desc: 'Unlocks Military',
        era: 'Stone Age',
        cat: 'Military',
        cost: [
            {id: 'science', name: 'Science', amount: 5},
        ],
        req: ['stonetools'],
    },
    {
        id: 'pigments',
        name: 'Pigments',
        desc: 'A first step into Art & Culture',
        era: 'Stone Age',
        cat: 'Culture',
        cost: [
            {id: 'science', name: 'Science', amount: 5},
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
        id: 'writing',
        name: 'Writing',
        desc: 'The key to preserving knowledge',
        era: 'Stone Age',
        cat: 'Technology',
        cost: [
            {id: 'science', name: 'Science', amount: 5},
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
            {id: 'science', name: 'Science', amount: 5},
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
            {id: 'science', name: 'Science', amount: 5},
        ],
        req: ['warfare','pigments'],
    }
]