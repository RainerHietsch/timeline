export const Data = {
    freeCosts: true,
    updateInterval: 250,
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
    res_max: 200,
    resIds: ['Iron', 'Copper', 'Tin', 'Coal', 'Gold', 'Uranium'],
    resFactor: {
        'Iron': 1,
        'Copper': 2,
        'Tin': 3,
        'Coal': 4,
        'Gold': 5,
        'Uranium': 6
    }
}