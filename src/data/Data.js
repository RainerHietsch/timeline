export const Data = {
    // DEBUG
    freeCosts: true,
    freeFactories: true,

    // GAME
    updateInterval: 16,
    growthPowerMultiplier: 1.2,

    // LEADERS
    ageGainPerHour: 12,

    // MILITARY
    military: {
        infantry: {
            cost: [
                {id: 'manpower', name: 'Manpower', amount: 5}
            ],
        }
    },

    // MINE
    res_max: 2,
    resIds: ['iron', 'copper', 'tin', 'coal', 'gold', 'uranium'],
    resFactor: {
        'iron': 1,
        'copper': 2,
        'tin': 3,
        'coal': 4,
        'gold': 5,
        'uranium': 6
    }
}