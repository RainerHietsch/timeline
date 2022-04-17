export const getBuildingCount = (state, id) => {
    const buildingStats = state.buildings.filter(building => building.id === id);
    if (buildingStats.length === 0) return 0;
    else if(buildingStats.length > 1) console.warn('Too many buildings of '+buildingStats.id)
    else if (buildingStats.length === 1) return buildingStats[0].count;
}