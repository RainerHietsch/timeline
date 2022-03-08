export const Tech = [
    {
        id: 'fire',
        name: 'Fire',
        desc: 'The discovery that started it all',
        era: 'Stone Age',
        cat: 'Science',
        cost: [
            {id: 'food', name: 'Food', amount: 1},
            {id: 'stone', name: 'Stone', amount: 1},
            {id: 'wood', name: 'Wood', amount: 1},
        ],
        req: ['nothing'],
        produces: [
            {
                id: "science",
                name: "Science",
                rate: 1,
                type: "a"
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
            {id: 'science', name: 'Science', amount: 20},
        ],
        req: ['fire'],
    },
    {
        id: 'construction',
        name: 'Construction',
        desc: 'Allows the construction of basic buildings',
        era: 'Stone Age',
        cat: 'Buildings',
        cost: [
            {id: 'science', name: 'Science', amount: 50},
        ],
        req: ['stonetools'],
    },
]