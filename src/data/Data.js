export const Data = {
    freeCosts: true,
    freeFactories: true,

    updateInterval: 16,
    growthPowerMultiplier: 1.2,

    // Leaders
    ageGainPerHour: 12,

    // Military
    military: {
        infantry: {
            cost: [
                {id: 'manpower', name: 'Manpower', amount: 5}
            ],
        }
    },

    // Mine
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