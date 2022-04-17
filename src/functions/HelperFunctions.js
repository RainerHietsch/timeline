export const getBuildingCount = (state, id) => {
    const buildingStats = state.buildings.filter(building => building.id === id);
    if (buildingStats.length === 0) return 0;
    else if(buildingStats.length > 1) console.warn('Too many buildings of '+buildingStats.id)
    else if (buildingStats.length === 1) return buildingStats[0].count;
}

export const getMilitaryPower = (state) => {
    return ((state.military.infantry.minAttack+state.military.infantry.maxAttack)/2 + state.military.infantry.maxHp/2 + state.military.infantry.armour)*state.military.infantry.count;
}

export const regenLeaderInfluenceCost = (state) => {
    return state.leaderMinInfluenceCost * state.leaderInfluenceCostMulti
}