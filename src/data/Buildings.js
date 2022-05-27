import {getResource} from "../functions/HelperFunctions";

export const Buildings = [
    {
        id: "stonequarry",
        name: "Stone Quarry",
        group: 'resources',
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
        group: 'resources',
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
        group: 'population',
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
        group: 'population',
        cat: "population",
        cost: [
            {id: 'stone', name: 'Stone', amount: 8},
            {id: 'wood', name: 'Wood', amount: 12},
        ],
        costMultiplier: 1.3,
        req: ['irrigation'],
        consumes: [],
        produces: [],
        onFinish: (state) => {
            getResource('manpower', state).max += 5;
        },
        desc: "A place to live is the first step for growing your civilisation.",
    },
    {
        id: "storage",
        name: "Storage",
        group: 'storage',
        cat: "storage",
        cost: [
            {id: 'stone', name: 'Stone', amount: 8},
            {id: 'wood', name: 'Wood', amount: 7},
        ],
        costMultiplier: 1.3,
        req: ['masonry'],
        consumes: [],
        produces: [],
        onFinish: (state) => {
            getResource('wood', state).max += 50;
            getResource('stone', state).max += 50;
        },
        desc: "A simple store that increases Wood and Stone storage.",

    },
    {
        id: "library",
        name: "Library",
        group: 'science',
        cat: "science",
        cost: [
            {id: 'stone', name: 'Stone', amount: 15},
            {id: 'wood', name: 'Wood', amount: 13},
        ],
        costMultiplier: 1.3,
        req: ['writing'],
        consumes: [],
        produces: [],
        onFinish: (state) => {
            getResource('science', state).max += 5;
        },
        desc: "Preserve your discoveries for the generations to come",
    },
    {
        id: "oracle",
        name: "Oracle",
        group: 'science',
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
        group: 'culture',
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
        onFinish: (state) => {
            const res = getResource('influence', state);
            res.max += 5;
        },
        desc: "Produces 2 Influence/s",
    }
]