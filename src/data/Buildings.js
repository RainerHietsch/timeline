export const Buildings = [
    {
        id: "stonequarry",
        name: "Stone Quarry",
        cat: "basic resource",
        cost: [
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
                absolute: true
            }
        ],
        desc: "Produces Stone",
        req: ['stonetools']
    },
    {
        id: "loggingcamp",
        name: "Logging Camp",
        cat: "basic resource",
        cost: [
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
                absolute: true
            }
        ],
        desc: "Produces Wood",
        req: ['stonetools']
    },
    {
        id: "farm",
        name: "Farm",
        cat: "basic resource",
        cost: [
            {id: 'stone', name: 'Stone', amount: 5},
            {id: 'wood', name: 'Wood', amount: 5},
        ],
        costMultiplier: 3,
        consumes: [],
        produces: [
            {
                id: "growth",
                name: "Growth",
                rate: 0.25,
                absolute: true
            },
            {
                id: "manpower",
                name: "Manpower",
                rate: 0.1,
                absolute: true
            }
        ],
        desc: "",
        req: ['irrigation'],
    },
    {
        id: "hut",
        name: "Basic Hut",
        cat: "population",
        cost: [
            {id: 'stone', name: 'Stone', amount: 20},
            {id: 'wood', name: 'Wood', amount: 30},
        ],
        costMultiplier: 2,
        req: ['masonry'],
        consumes: [],
        produces: [],
        increases: [{id: 'manpower', amount: 5}],
        desc: "Stores Stuff",
    },
    {
        id: "storage",
        name: "Storage",
        cat: "storage",
        cost: [
            {id: 'stone', name: 'Stone', amount: 10},
            {id: 'wood', name: 'Wood', amount: 20},
        ],
        costMultiplier: 2,
        req: ['masonry'],
        consumes: [],
        produces: [],
        desc: "Stores Stuff",
    }
]