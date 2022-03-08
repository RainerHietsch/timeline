export const Buildings = [
    {
        id: "stonequarry",
        name: "Stone Quarry",
        cat: "basic resource",
        cost: [
            {id: 'food', name: 'Food', amount: 5},
            {id: 'stone', name: 'Stone', amount: 5},
            {id: 'wood', name: 'Wood', amount: 5},
        ],
        costMultiplier: 1,
        consumes: [],
        produces: [
            {
                id: "stone",
                name: "Stone",
                rate: 2,
                type: "a"
            }
        ],
        desc: "Produces Stone",
        req: []
    },
    {
        id: "loggingcamp",
        name: "Logging Camp",
        cat: "basic resource",
        cost: [
            {id: 'food', name: 'Food', amount: 5},
            {id: 'stone', name: 'Stone', amount: 5},
            {id: 'wood', name: 'Wood', amount: 5},
        ],
        costMultiplier: 2,
        consumes: [],
        produces: [
            {
                id: "wood",
                name: "Wood",
                rate: 2,
                type: "a"
            }
        ],
        desc: "Produces Wood",
        req: []
    },
    {
        id: "farm",
        name: "Farm",
        cat: "basic resource",
        cost: [
            {id: 'food', name: 'Food', amount: 5},
            {id: 'stone', name: 'Stone', amount: 5},
            {id: 'wood', name: 'Wood', amount: 5},
        ],
        costMultiplier: 3,
        consumes: [],
        produces: [
            {
                id: "food",
                name: "Food",
                rate: 2,
                type: "a"
            }
        ],
        desc: "Produces Food",
        req: [],
    },
    {
        id: "storage",
        name: "Storage",
        cat: "storage",
        cost: [
            {id: 'stone', name: 'Stone', amount: 10},
            {id: 'wood', name: 'Wood', amount: 20},
        ],
        req: ['construction'],
        consumes: [],
        produces: [],
        desc: "Stores Stuff",
    }
]