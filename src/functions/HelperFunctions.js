import _ from 'lodash';
import {Data} from "../data/Data";

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

export const getResource = (id, state) => {
    return state.resources.filter((res) => {return res.id === id})[0];
}

export const getLongestTime = (state, costs) => {
    let longestTime = 0;
    let never = false;
    _.forEach(costs, (cost) => {
       const res = getResource(cost.id, state);
       if(cost.amount > res.max) never = true;
       const secondsNeeded = _.ceil((cost.amount-res.count)/res.production.perSecond);
        if (secondsNeeded > longestTime) longestTime = secondsNeeded;
    });
    return never ? -1 : longestTime;
}

export const getFactorForResource = (resourceId) => {
    return (-0.15 * Math.pow(Data.resFactor[resourceId], 2)) + 10;
}

export const showLS = () => {
    let _lsTotal = 0,
        _xLen, _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
            continue;
        }
        _xLen = ((localStorage[_x].length + _x.length) * 2);
        _lsTotal += _xLen;
        console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
    }
    console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
}

export const advanceAge = (currentAge) => {
    switch (currentAge) {
        case "Stone Age": return "Classical Age";
        default: return "ERROR";
    }
}