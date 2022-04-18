export const Buildings = [
    {
        id: "stonequarry",
        name: "Stone Quarry",
        cat: "basic resource",
        cost: [
            {id: 'stone', name: 'Stone', amount: 7},
            {id: 'wood', name: 'Wood', amount: 10},
        ],
        costMultiplier: 1.3,
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
            {id: 'stone', name: 'Stone', amount: 10},
            {id: 'wood', name: 'Wood', amount: 17},
        ],
        costMultiplier: 1.3,
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
            {id: 'stone', name: 'Stone', amount: 12},
            {id: 'wood', name: 'Wood', amount: 12},
        ],
        land: 0.25,
        costMultiplier: 1.3,
        consumes: [],
        produces: [
            {
                id: "growth",
                name: "Growth",
                rate: 1,
                absolute: true
            },
            {
                id: "manpower",
                name: "Manpower",
                rate: 0.5,
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
            {id: 'stone', name: 'Stone', amount: 8},
            {id: 'wood', name: 'Wood', amount: 12},
        ],
        costMultiplier: 1.3,
        req: ['masonry'],
        consumes: [],
        produces: [],
        increases: [{id: 'manpower', amount: 5}],
        desc: "A place to live is the first step for growing your civilisation.",
    },
    {
        id: "storage",
        name: "Storage",
        cat: "storage",
        cost: [
            {id: 'stone', name: 'Stone', amount: 8},
            {id: 'wood', name: 'Wood', amount: 7},
        ],
        costMultiplier: 1.3,
        req: ['masonry'],
        consumes: [],
        produces: [],
        desc: "A simple store that increases Wood and Stone storage.",
    },
    {
        id: "library",
        name: "Library",
        cat: "storage",
        cost: [
            {id: 'stone', name: 'Stone', amount: 15},
            {id: 'wood', name: 'Wood', amount: 13},
        ],
        costMultiplier: 1.3,
        req: ['writing'],
        consumes: [],
        produces: [],
        increases: [{id: 'science', amount: 5}],
        desc: "Preserve your discoveries for the generations to come",
    },
    {
        id: "oracle",
        name: "Oracle",
        cat: "production",
        cost: [
            {id: 'stone', name: 'Stone', amount: 23},
            {id: 'wood', name: 'Wood', amount: 20},
        ],
        costMultiplier: 1.3,
        req: ['writing'],
        consumes: [],
        produces: [{
            id: "science",
            name: "Science",
            rate: 2,
            absolute: true
        }],
        desc: "Produces 2 Science/s",
    },
    {
        id: "cavepaintings",
        name: "Cave Paintings",
        cat: ["production","storage"],
        cost: [
            {id: 'stone', name: 'Stone', amount: 25},
            {id: 'wood', name: 'Wood', amount: 20},
        ],
        costMultiplier: 1.3,
        req: ['pigments'],
        consumes: [],
        produces: [{
            id: "influence",
            name: "Influence",
            rate: 2,
            absolute: true
        }],
        desc: "Produces 2 Influence/s",
    }
]